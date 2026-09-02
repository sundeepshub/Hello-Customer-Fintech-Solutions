(function(){
  const cfg=window.HC_FIREBASE_CONFIG||{};
  const ready=Boolean(cfg.apiKey&&cfg.apiKey!=="REPLACE_ME"&&cfg.projectId&&cfg.projectId!=="REPLACE_ME");
  function msg(t,ok=false){const e=document.getElementById('authMessage');if(e){e.textContent=t;e.className='auth-message '+(ok?'ok':'')}}
  function friendly(err){
    const code=err?.code||'';
    if(code.includes('wrong-password')||code.includes('invalid-credential')||code.includes('user-not-found')||code.includes('not-found')) return 'Invalid username or password.';
    if(code.includes('too-many-requests')) return 'Too many attempts. Please wait and try again.'; if(code.includes('internal')) return 'Signup service is not fully deployed or configured. Please contact the administrator and quote: SIGNUP-SERVICE.'; if(code.includes('functions/unavailable')) return 'Signup service is temporarily unavailable. Please try again shortly.';
    return String(err?.message||'Something went wrong.').replace(/^Firebase:\s*/,'');
  }
  window.HCAuth={ready,friendly};
  if(!ready){document.addEventListener('DOMContentLoaded',()=>msg('Authentication setup is not active yet. Add your Firebase web configuration in firebase-config.js.'));return}
  if(!firebase.apps.length)firebase.initializeApp(cfg);
  const auth=firebase.auth(),db=firebase.firestore(),storage=firebase.storage(),functions=firebase.functions();
  Object.assign(HCAuth,{auth,db,storage,functions});

  HCAuth.signup=async function(form){
    const role=form.role.value,email=form.email.value.trim().toLowerCase(),username=form.username.value.trim().toLowerCase(),password=form.password.value;
    const fullName=form.fullName.value.trim(),mobile=form.mobile.value.replace(/\D/g,'');
    if(!['telecaller','connector'].includes(role))throw Error('Select Telecaller or Connector.');
    if(!/^[6-9]\d{9}$/.test(mobile))throw Error('Enter a valid 10-digit Indian mobile number.');
    if(!/^[a-zA-Z0-9._-]{4,30}$/.test(username))throw Error('Username must be 4–30 characters using letters, numbers, dot, underscore or hyphen.');
    if(password.length<12||password.length>64||!/[A-Z]/.test(password)||!/[a-z]/.test(password)||!/[0-9]/.test(password)||!/[^A-Za-z0-9]/.test(password))throw Error('Use 12–64 characters with uppercase, lowercase, number and special character.');
    if(password!==form.confirmPassword.value)throw Error('Passwords do not match.');
    const register=functions.httpsCallable('registerExecutive');
    await register({role,email,username,password,fullName,mobile});
    const cred=await auth.signInWithEmailAndPassword(email,password); const uid=cred.user.uid; try{await cred.user.sendEmailVerification({url:new URL('executive-login.html',location.href).href})}catch(_){/* account still created; email template/provider may need console configuration */}
    const file=form.profilePhoto.files[0];
    if(file){
      if(file.size>3*1024*1024)throw Error('Profile photo must be 3 MB or less.');
      if(!/^image\/(jpeg|png|webp)$/.test(file.type))throw Error('Profile photo must be JPG, PNG or WEBP.');
      const ref=storage.ref(`profiles/${uid}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`);await ref.put(file,{contentType:file.type});
      const photoURL=await ref.getDownloadURL(); await db.collection('users').doc(uid).update({photoURL,updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
    }
    await auth.signOut(); msg('Signup completed successfully. A verification message has been requested to your email. Your account will remain pending until administrator activation.',true);
  };

  HCAuth.login=async function(form){
    const username=form.username.value.trim().toLowerCase();
    const lookup=functions.httpsCallable('resolveExecutiveLogin');
    let email;
    try{const r=await lookup({username});email=r.data.email;}catch(e){throw Error('Invalid username or password.');}
    const cred=await auth.signInWithEmailAndPassword(email,form.password.value);
    const profile=await db.collection('users').doc(cred.user.uid).get();
    if(!profile.exists){await auth.signOut();throw Error('Account profile not found.');}
    const d=profile.data();
    if(d.status!=='active'){await auth.signOut();throw Error(d.status==='pending'?'Your account is pending administrator activation.':'Your account is inactive. Please contact the administrator.');}
    location.href=d.role==='admin'?'admin-dashboard.html':'executive-dashboard.html';
  };

  HCAuth.adminLogin=async function(form){
    const username=form.username.value.trim().toLowerCase(); const lookup=functions.httpsCallable('resolveExecutiveLogin'); let email;
    try{const r=await lookup({username});email=r.data.email;}catch(e){throw Error('Invalid admin username or password.');}
    const cred=await auth.signInWithEmailAndPassword(email,form.password.value); const snap=await db.collection('users').doc(cred.user.uid).get();
    if(!snap.exists||snap.data().role!=='admin'||snap.data().status!=='active'){await auth.signOut();throw Error('Administrator access is not authorised for this account.');}
    location.href='admin-dashboard.html';
  };
  HCAuth.changePassword=async function(currentPassword,newPassword,confirmPassword){
    const user=auth.currentUser;if(!user||!user.email)throw Error('Please sign in again.'); if(newPassword!==confirmPassword)throw Error('New passwords do not match.'); if(newPassword===currentPassword)throw Error('New password must be different from your current password.');
    if(newPassword.length<12||newPassword.length>64||!/[A-Z]/.test(newPassword)||!/[a-z]/.test(newPassword)||!/\d/.test(newPassword)||!/[^A-Za-z0-9]/.test(newPassword))throw Error('Use 12–64 characters with uppercase, lowercase, number and special character.');
    const c=firebase.auth.EmailAuthProvider.credential(user.email,currentPassword); await user.reauthenticateWithCredential(c); await user.updatePassword(newPassword); await db.collection('users').doc(user.uid).update({passwordLastChangedAt:firebase.firestore.FieldValue.serverTimestamp(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
  };
  HCAuth.guard=async function(options={}){return new Promise((resolve,reject)=>auth.onAuthStateChanged(async user=>{
    try{
      if(!user){location.href=options.adminOnly?'admin-login.html':'executive-login.html';return}
      const p=await db.collection('users').doc(user.uid).get();
      if(!p.exists||p.data().status!=='active'){await auth.signOut();location.href=options.adminOnly?'admin-login.html':'executive-login.html';return}
      const profile=p.data();
      if(options.adminOnly&&profile.role!=='admin'){location.href='executive-dashboard.html';return}
      resolve({user,profile});
    }catch(e){reject(e)}
  }))};
  HCAuth.logout=()=>auth.signOut().then(()=>location.href='executive-login.html');
  HCAuth.resetPassword=async email=>{await auth.sendPasswordResetEmail(email);};
  HCAuth.updateProfile=async({fullName,mobile,photoFile})=>{
    const user=auth.currentUser;if(!user)throw Error('Please sign in again.');
    const update={fullName:String(fullName||'').trim(),mobile:String(mobile||'').replace(/\D/g,''),updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
    if(!update.fullName)throw Error('Full name is required.'); if(!/^[6-9]\d{9}$/.test(update.mobile))throw Error('Enter a valid 10-digit Indian mobile number.');
    if(photoFile){if(photoFile.size>3*1024*1024)throw Error('Profile photo must be 3 MB or less.');if(!/^image\/(jpeg|png|webp)$/.test(photoFile.type))throw Error('Profile photo must be JPG, PNG or WEBP.');const ref=storage.ref(`profiles/${user.uid}/${Date.now()}-${photoFile.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`);await ref.put(photoFile,{contentType:photoFile.type});update.photoURL=await ref.getDownloadURL();}
    await db.collection('users').doc(user.uid).update(update);return update;
  };
})();
