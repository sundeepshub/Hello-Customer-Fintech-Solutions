(function(){
function bind(){
  document.querySelectorAll('.menu-btn').forEach(m=>{if(m.dataset.hcBound)return;m.dataset.hcBound='1';const n=document.getElementById(m.getAttribute('aria-controls')||'pageNav')||m.parentElement?.querySelector('nav');m.addEventListener('click',()=>{n?.classList.toggle('open');m.setAttribute('aria-expanded',n?.classList.contains('open')?'true':'false')})});
  document.querySelectorAll('.nav-dropdown').forEach(d=>{const b=d.querySelector('.nav-drop-btn');if(!b||b.dataset.hcBound)return;b.dataset.hcBound='1';b.addEventListener('click',e=>{e.preventDefault();document.querySelectorAll('.nav-dropdown.open').forEach(x=>{if(x!==d)x.classList.remove('open')});d.classList.toggle('open');b.setAttribute('aria-expanded',d.classList.contains('open')?'true':'false')})});
  document.addEventListener('click',e=>{if(!e.target.closest('.nav-dropdown'))document.querySelectorAll('.nav-dropdown.open').forEach(x=>x.classList.remove('open'))},{passive:true});
  addPublicLinksToPortal();
  addMissingPublicOptions();
  applyPortalPermissions();
}
function addPublicLinksToPortal(){
  document.querySelectorAll('nav.portal-nav').forEach(n=>{
    if(n.querySelector('[data-public-menu]'))return;
    const d=document.createElement('div');d.className='nav-dropdown';d.dataset.publicMenu='1';
    d.innerHTML='<button type="button" class="nav-drop-btn">Public Site ▾</button><div class="nav-dropdown-menu"><a href="home.html">Home</a><a href="personal-loan.html">Personal Loan</a><a href="home-loan.html">Home Loan</a><a href="business-loan.html">Business Loan</a><a href="lap-loan.html">Loan Against Property</a><a href="vehicle-loan.html">Vehicle Loan</a><a href="education-loan.html">Education Loan</a><a href="offers.html">Latest Offers</a><a href="how-we-help.html">How We Help</a><a href="cibil.html">CIBIL & Credit</a><a href="stories.html">Stories</a><a href="faq.html">FAQ</a><a href="referral.html">Refer Someone</a><a href="index.html#eligibility">Start Enquiry</a></div>';
    n.insertBefore(d,n.firstChild);
    const b=d.querySelector('.nav-drop-btn');b.addEventListener('click',e=>{e.preventDefault();d.classList.toggle('open')});
  });
}

function addMissingPublicOptions(){
  document.querySelectorAll('header nav:not(.portal-nav)').forEach(n=>{
    if(n.querySelector('a[href="referral.html"]'))return;
    const d=document.createElement('div');d.className='nav-dropdown';
    d.innerHTML='<button type="button" class="nav-drop-btn">Explore ▾</button><div class="nav-dropdown-menu"><a href="home.html">Home</a><a href="personal-loan.html">Personal Loan</a><a href="home-loan.html">Home Loan</a><a href="business-loan.html">Business Loan</a><a href="lap-loan.html">Loan Against Property</a><a href="vehicle-loan.html">Vehicle Loan</a><a href="education-loan.html">Education Loan</a><a href="offers.html">Latest Offers</a><a href="loan-rates.html">Loan Rates</a><a href="government-schemes.html">Schemes</a><a href="how-we-help.html">How We Help</a><a href="cibil.html">CIBIL & Credit</a><a href="stories.html">Stories</a><a href="faq.html">FAQ</a><a href="referral.html">Refer Someone</a><a href="index.html#eligibility">Start Enquiry</a><a href="login.html">Login</a></div>';
    n.insertBefore(d,n.firstChild);const b=d.querySelector('.nav-drop-btn');b.addEventListener('click',e=>{e.preventDefault();d.classList.toggle('open')});
  });
}

async function applyPortalPermissions(){
  if(!window.HCAuth?.ready||!HCAuth.auth)return;
  const u=HCAuth.auth.currentUser||await new Promise(res=>{const off=HCAuth.auth.onAuthStateChanged(x=>{off();res(x)})});if(!u)return;
  try{
    const profile=(await HCAuth.api('getProfile')).profile||{},p=profile.permissions||{};
    const map={'new-lead.html':'addLead','lead-queue.html':'queue','loan-rates.html':'loanRates','government-schemes.html':'schemes','executive-profile.html':'profile','executive-dashboard.html':'dashboard'};
    document.querySelectorAll('nav.portal-nav a').forEach(a=>{const file=(a.getAttribute('href')||'').split('?')[0].split('#')[0];const key=map[file];if(profile.role!=='admin'&&key&&p[key]===false)a.hidden=true});
  }catch(_){}
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',bind):bind();
})();