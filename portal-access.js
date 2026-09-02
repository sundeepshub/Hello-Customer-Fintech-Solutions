(function(){
  async function currentContext(){
    if(!window.HCAuth||!HCAuth.ready)return {user:null,profile:null};
    return new Promise(resolve=>HCAuth.auth.onAuthStateChanged(async u=>{if(!u)return resolve({user:null,profile:null});try{const s=await HCAuth.db.collection('users').doc(u.uid).get();resolve({user:u,profile:s.exists?s.data():null})}catch(_){resolve({user:u,profile:null})}}));
  }
  async function featureSettings(){
    try{const s=await HCAuth.db.collection('settings').doc('features').get();return s.exists?s.data():{loanRates:{telecaller:true,connector:true,admin:true,public:false},schemes:{public:true,telecaller:true,connector:true,admin:true}}}catch(_){return {loanRates:{telecaller:true,connector:true,admin:true,public:false},schemes:{public:true,telecaller:true,connector:true,admin:true}}}
  }
  async function allow(feature){const [ctx,set]=await Promise.all([currentContext(),featureSettings()]);const role=ctx.profile?.role||'public';const cfg=set[feature]||{};return {allowed:role==='admin'?cfg.admin!==false:Boolean(cfg[role]),role,ctx,settings:set}}
  window.HCPortalAccess={currentContext,featureSettings,allow};
})();