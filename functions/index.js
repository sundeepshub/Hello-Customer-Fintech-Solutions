const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const ingestSecret = defineSecret('INGEST_SECRET');

const ROLE_LIMITS = { telecaller: 100, connector: 200 };
const clean = v => String(v || '').trim();
const usernameOk = v => /^[a-zA-Z0-9._-]{4,30}$/.test(v);
const strongPassword = p => typeof p === 'string' && p.length >= 12 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);

async function callerProfile(req){
  if(!req.auth) throw new HttpsError('unauthenticated','Sign in required.');
  const snap = await db.collection('users').doc(req.auth.uid).get();
  if(!snap.exists) throw new HttpsError('permission-denied','Account profile not found.');
  return snap.data();
}
async function requireAdmin(req){
  const p = await callerProfile(req);
  if(p.status !== 'active' || p.role !== 'admin') throw new HttpsError('permission-denied','Administrator access required.');
  return p;
}

exports.registerExecutive = onCall(async req => {
  const role = clean(req.data?.role).toLowerCase();
  const fullName = clean(req.data?.fullName);
  const mobile = clean(req.data?.mobile).replace(/\D/g,'');
  const email = clean(req.data?.email).toLowerCase();
  const username = clean(req.data?.username).toLowerCase();
  const password = req.data?.password;
  if(!ROLE_LIMITS[role]) throw new HttpsError('invalid-argument','Select Telecaller or Connector.');
  if(fullName.length < 2 || fullName.length > 120) throw new HttpsError('invalid-argument','Enter a valid full name.');
  if(!/^[6-9]\d{9}$/.test(mobile)) throw new HttpsError('invalid-argument','Enter a valid 10-digit Indian mobile number.');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpsError('invalid-argument','Enter a valid email address.');
  if(!usernameOk(username)) throw new HttpsError('invalid-argument','Username must be 4–30 characters using letters, numbers, dot, underscore or hyphen.');
  if(!strongPassword(password)) throw new HttpsError('invalid-argument','Password must be at least 12 characters and include uppercase, lowercase, number and special character.');

  const unameRef = db.collection('usernames').doc(username);
  const capacityRef = db.collection('system').doc('capacity');
  let reserved = false;
  await db.runTransaction(async tx => {
    const [u,c] = await Promise.all([tx.get(unameRef),tx.get(capacityRef)]);
    if(u.exists) throw new HttpsError('already-exists','That username is already in use.');
    const count = Number(c.data()?.[role] || 0);
    if(count >= ROLE_LIMITS[role]) throw new HttpsError('resource-exhausted',`The ${role} account limit (${ROLE_LIMITS[role]}) has been reached.`);
    tx.set(unameRef,{reserved:true,role,createdAt:admin.firestore.FieldValue.serverTimestamp()});
    tx.set(capacityRef,{[role]:count+1},{merge:true});
    reserved = true;
  });

  let userRecord;
  try {
    userRecord = await admin.auth().createUser({email,password,displayName:fullName,disabled:false,emailVerified:false});
    await db.collection('users').doc(userRecord.uid).set({
      uid:userRecord.uid,username,email,fullName,mobile,role,status:'pending',executiveId:'',photoURL:'',
      createdAt:admin.firestore.FieldValue.serverTimestamp(),updatedAt:admin.firestore.FieldValue.serverTimestamp()
    });
    await unameRef.set({uid:userRecord.uid,email,role,reserved:false,createdAt:admin.firestore.FieldValue.serverTimestamp()});
    return {ok:true,uid:userRecord.uid,status:'pending'};
  } catch(err){
    if(userRecord?.uid){ try{ await admin.auth().deleteUser(userRecord.uid); }catch(_){} }
    if(reserved){
      await db.runTransaction(async tx=>{
        const c=await tx.get(capacityRef); const count=Number(c.data()?.[role]||1);
        tx.delete(unameRef); tx.set(capacityRef,{[role]:Math.max(0,count-1)},{merge:true});
      });
    }
    if(err instanceof HttpsError) throw err;
    if(err.code === 'auth/email-already-exists') throw new HttpsError('already-exists','An account already exists for this email address.');
    throw new HttpsError('internal','Account could not be created.');
  }
});

exports.resolveExecutiveLogin = onCall(async req => {
  const username = clean(req.data?.username).toLowerCase();
  if(!usernameOk(username)) throw new HttpsError('invalid-argument','Invalid username or password.');
  const snap = await db.collection('usernames').doc(username).get();
  if(!snap.exists || !snap.data().uid || snap.data().reserved) throw new HttpsError('not-found','Invalid username or password.');
  return {email:snap.data().email};
});

exports.approveExecutive = onCall(async req => {
  await requireAdmin(req);
  const uid = clean(req.data?.uid);
  const uref = db.collection('users').doc(uid);
  const counterRef = db.collection('system').doc('executiveIds');
  let result;
  await db.runTransaction(async tx=>{
    const [u,c]=await Promise.all([tx.get(uref),tx.get(counterRef)]);
    if(!u.exists) throw new HttpsError('not-found','Executive not found.');
    const d=u.data();
    if(!ROLE_LIMITS[d.role]) throw new HttpsError('failed-precondition','Only Telecaller or Connector accounts can be approved here.');
    let executiveId=d.executiveId;
    if(!executiveId){
      const key=d.role==='telecaller'?'tc':'cn';
      const next=Number(c.data()?.[key]||0)+1;
      if(next>ROLE_LIMITS[d.role]) throw new HttpsError('resource-exhausted','Executive ID capacity reached.');
      executiveId=(d.role==='telecaller'?'TC':'CN')+String(next).padStart(3,'0');
      tx.set(counterRef,{[key]:next},{merge:true});
    }
    tx.update(uref,{status:'active',executiveId,approvedAt:admin.firestore.FieldValue.serverTimestamp(),updatedAt:admin.firestore.FieldValue.serverTimestamp()});
    result={executiveId,role:d.role};
  });
  await admin.auth().setCustomUserClaims(uid,{role:result.role,active:true});
  return {ok:true,...result};
});

exports.setExecutiveStatus = onCall(async req => {
  await requireAdmin(req);
  const uid=clean(req.data?.uid), status=clean(req.data?.status).toLowerCase();
  if(!['active','inactive'].includes(status)) throw new HttpsError('invalid-argument','Status must be active or inactive.');
  const ref=db.collection('users').doc(uid), snap=await ref.get();
  if(!snap.exists) throw new HttpsError('not-found','Executive not found.');
  const d=snap.data(); if(d.role==='admin') throw new HttpsError('failed-precondition','Admin status must be managed separately.');
  await ref.update({status,updatedAt:admin.firestore.FieldValue.serverTimestamp()});
  await admin.auth().setCustomUserClaims(uid,{role:d.role,active:status==='active'});
  return {ok:true,status};
});

exports.ingestPublicLead = onRequest({secrets:[ingestSecret],cors:false}, async (req,res)=>{
  if(req.method!=='POST') return res.status(405).json({ok:false,error:'Method not allowed'});
  if(req.get('x-hc-ingest-secret') !== ingestSecret.value()) return res.status(401).json({ok:false,error:'Unauthorized'});
  const b=req.body||{}; const leadId=clean(b.leadId);
  if(!/^LN-[A-Z0-9-]{4,}$/.test(leadId)) return res.status(400).json({ok:false,error:'Invalid lead ID'});
  const payload={
    leadId,
    customerName:clean(b.customerName),mobile:clean(b.mobile),email:clean(b.email),loanType:clean(b.loanType),
    loanAmount:Number(b.loanAmount||0),employment:clean(b.employment),purpose:clean(b.purpose),
    stage:'Enquiry',status:'New',createdByUserId:'public',assignedToUserId:'',source:'Website',
    createdAt:admin.firestore.FieldValue.serverTimestamp(),updatedAt:admin.firestore.FieldValue.serverTimestamp()
  };
  await db.collection('leads').doc(leadId).set(payload,{merge:true});
  res.json({ok:true,leadId});
});
