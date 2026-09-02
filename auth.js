(function(){
const cfg=window.HC_FIREBASE_CONFIG||{}; const ready=cfg.apiKey&&cfg.apiKey!=="REPLACE_ME";
function msg(t,ok=false){const e=document.getElementById('authMessage');if(e){e.textContent=t;e.className='auth-message '+(ok?'ok':'')}}
window.HCAuth={ready};
if(!ready){document.addEventListener('DOMContentLoaded',()=>msg('Authentication setup is not active yet. Add your Firebase web configuration in firebase-config.js.'));return}
firebase.initializeApp(cfg); const auth=firebase.auth(),db=firebase.firestore(),storage=firebase.storage();
HCAuth.auth=auth;HCAuth.db=db;HCAuth.storage=storage;
HCAuth.signup=async function(form){
 const role=form.role.value, email=form.email.value.trim(), username=form.username.value.trim().toLowerCase(), password=form.password.value;
 if(!['telecaller','connector'].includes(role))throw Error('Select Telecaller or Connector.');
 if(!/^[a-zA-Z0-9._-]{4,30}$/.test(username))throw Error('Username must be 4–30 characters using letters, numbers, dot, underscore or hyphen.');
 if(password.length<12||!/[A-Z]/.test(password)||!/[a-z]/.test(password)||!/[0-9]/.test(password)||!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password))throw Error('Use at least 12 characters with uppercase, lowercase, number and special character.');
 if(password!==form.confirmPassword.value)throw Error('Passwords do not match.');
 const existing=await db.collection('usernames').doc(username).get(); if(existing.exists)throw Error('That username is already in use.');
 const roleSnap=await db.collection('users').where('role','==',role).get(); const max=role==='telecaller'?100:200;if(roleSnap.size>=max)throw Error(`The ${role} account limit (${max}) has been reached.`);
 const cred=await auth.createUserWithEmailAndPassword(email,password); const uid=cred.user.uid;
 let photoURL=''; const file=form.profilePhoto.files[0]; if(file){if(file.size>3*1024*1024)throw Error('Profile photo must be 3 MB or less.');const ref=storage.ref(`profiles/${uid}/${Date.now()}-${file.name}`);await ref.put(file);photoURL=await ref.getDownloadURL();}
 await db.collection('users').doc(uid).set({uid,username,email,fullName:form.fullName.value.trim(),mobile:form.mobile.value.trim(),role,status:'pending',photoURL,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
 await db.collection('usernames').doc(username).set({uid}); await auth.signOut(); msg('Signup received. Your account is pending administrator activation.',true);
};
HCAuth.login=async function(form){
 const username=form.username.value.trim().toLowerCase(); const u=await db.collection('usernames').doc(username).get();if(!u.exists)throw Error('Invalid username or password.');const profile=await db.collection('users').doc(u.data().uid).get();if(!profile.exists)throw Error('Account profile not found.');
 const d=profile.data();await auth.signInWithEmailAndPassword(d.email,form.password.value);if(d.status!=='active'){await auth.signOut();throw Error('Your account is pending activation or inactive.');}location.href='executive-dashboard.html';
};
HCAuth.guard=async function(){return new Promise((resolve)=>auth.onAuthStateChanged(async user=>{if(!user){location.href='executive-login.html';return}const p=await db.collection('users').doc(user.uid).get();if(!p.exists||p.data().status!=='active'){await auth.signOut();location.href='executive-login.html';return}resolve({user,profile:p.data()});}));};
HCAuth.logout=()=>auth.signOut().then(()=>location.href='executive-login.html');
})();