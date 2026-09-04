(function(){
  const path=(location.pathname.split('/').pop()||'home.html').toLowerCase();
  function overlay(){if(document.getElementById('hcPageLoader'))return;const d=document.createElement('div');d.id='hcPageLoader';d.className='page-loader';d.innerHTML='<div class="page-loader-card"><span class="page-loader-spinner"></span><b>Loading…</b><small>Please wait</small></div>';document.body.appendChild(d)}
  function hide(){document.getElementById('hcPageLoader')?.classList.add('done');setTimeout(()=>document.getElementById('hcPageLoader')?.remove(),220)}
  function show(label='Loading…'){overlay();const d=document.getElementById('hcPageLoader');d?.classList.remove('done');const b=d?.querySelector('b');if(b)b.textContent=label}
  function tooltips(){
    const tips={
      'Loan Rates':'Approximate lender reference ranges. Final pricing is decided by the lender.',
      'Assigned Queue':'Leads specifically assigned to your account by the administrator.',
      'My Leads':'Leads created by you or assigned to your account.',
      'Role Feature Access':'Default access applied to all users in a role unless an individual override is configured.',
      'Move / Reassign Leads':'Transfer ownership of assigned leads from one executive to another.',
      'Source':'Shows where the lead originated, such as website, guest campaign, Facebook or bulk upload.','Campaign':'Groups marketing activity so you can track its source and resulting enquiries.','Media Library':'Approved images and videos available to your account for campaigns and guest pages.','Social Connections':'Connect the social account you are authorised to publish from.','Access Policies':'Administrator rules for user, role, page, option, form, data and column access.','Idle Timeout':'Automatically signs users out after the configured period without activity.','Guest Page Image':'Image displayed to visitors who open your tracked guest link.'
    };
    document.querySelectorAll('[data-help]').forEach(el=>{if(el.querySelector('.help-tip'))return;const i=document.createElement('span');i.className='help-tip';i.tabIndex=0;i.textContent='?';i.setAttribute('data-tooltip',el.dataset.help);el.appendChild(i)});
    document.querySelectorAll('h2,h3,label').forEach(el=>{const txt=el.childNodes[0]?.textContent?.trim()||el.textContent.trim();const hit=Object.keys(tips).find(k=>txt.startsWith(k));if(hit&&!el.querySelector('.help-tip')){const i=document.createElement('span');i.className='help-tip';i.tabIndex=0;i.textContent='?';i.dataset.tooltip=tips[hit];el.appendChild(i)}});
  }
  async function idleSession(){
    if(!window.HCAuth?.auth)return;const u=await new Promise(res=>{const off=HCAuth.auth.onAuthStateChanged(x=>{off();res(x)})});if(!u)return;
    let minutes=5;try{const d=await HCAuth.api('getSessionSettings');minutes=Math.max(1,Math.min(480,Number(d.timeoutMinutes)||5))}catch(_){}
    let timer,warn,last=Date.now();const reset=()=>{last=Date.now();clearTimeout(timer);clearTimeout(warn);warn=setTimeout(()=>window.HCUI?.toast?.('Your session will close soon due to inactivity.','info',4500),Math.max(1000,(minutes*60-60)*1000));timer=setTimeout(()=>{window.HCUI?.toast?.('Session ended due to inactivity.','info',1800);setTimeout(()=>HCAuth.logout(),700)},minutes*60000)};
    ['pointerdown','keydown','scroll','touchstart'].forEach(ev=>document.addEventListener(ev,()=>{if(Date.now()-last>15000)reset()},{passive:true}));reset();
  }

  async function accessPolicies(){
    if(!window.HCAuth?.auth||!document.querySelector('.portal-nav'))return;
    const u=await new Promise(res=>{const off=HCAuth.auth.onAuthStateChanged(x=>{off();res(x)})});if(!u)return;
    document.querySelectorAll('a[href="login.html"],a[href="admin-login.html"],a[href="executive-login.html"]').forEach(a=>{if(a.closest('.portal-nav'))a.remove()});
    try{
      const d=await HCAuth.api('getAccessContext',{page:path}),pol=d.policies||[];
      const denied=(scope,key)=>pol.some(x=>x.scope===scope&&String(x.key||'').toLowerCase()===String(key||'').toLowerCase()&&x.allow===false);
      if(denied('page','access')||denied('page',path)){
        location.replace('executive-dashboard.html?notice=permission');return;
      }
      document.querySelectorAll('[data-policy-key]').forEach(el=>{const k=el.dataset.policyKey;if(denied('option',k)||denied('form',k)||denied('data',k))el.hidden=true});
      document.querySelectorAll('.portal-nav a[href]').forEach(a=>{const h=(a.getAttribute('href')||'').split('?')[0];if(pol.some(x=>x.scope==='page'&&x.allow===false&&(x.key===h||x.page===h)))a.hidden=true});
    }catch(_){}
  }


  function enhanceTables(){
    document.querySelectorAll('table').forEach(table=>{
      if(table.dataset.hcEnhanced==='1')return;table.dataset.hcEnhanced='1';
      const body=table.tBodies&&table.tBodies[0];if(!body)return;
      const wrap=table.closest('.rate-table-wrap')||table.parentElement;
      const rows=()=>[...body.rows];let page=1,pageSize=10,term='';
      const tools=document.createElement('div');tools.className='table-tools';tools.innerHTML='<label>Search <input class="table-search" placeholder="Search records"></label><label>Rows <select class="table-page-size"><option>10</option><option>25</option><option>50</option><option>100</option></select></label><span class="table-page-info"></span><button type="button" class="btn ghost small table-prev">Previous</button><button type="button" class="btn ghost small table-next">Next</button>';
      wrap.parentNode.insertBefore(tools,wrap);const search=tools.querySelector('.table-search'),size=tools.querySelector('.table-page-size'),info=tools.querySelector('.table-page-info'),prev=tools.querySelector('.table-prev'),next=tools.querySelector('.table-next');
      function apply(){const all=rows(),matched=all.filter(r=>!term||r.innerText.toLowerCase().includes(term));all.forEach(r=>r.hidden=true);const pages=Math.max(1,Math.ceil(matched.length/pageSize));page=Math.min(page,pages);matched.slice((page-1)*pageSize,page*pageSize).forEach(r=>r.hidden=false);info.textContent=`${matched.length} record${matched.length===1?'':'s'} · Page ${page}/${pages}`;prev.disabled=page<=1;next.disabled=page>=pages;}
      search.oninput=()=>{term=search.value.trim().toLowerCase();page=1;apply()};size.onchange=()=>{pageSize=Number(size.value)||10;page=1;apply()};prev.onclick=()=>{if(page>1){page--;apply()}};next.onclick=()=>{page++;apply()};
      table.querySelectorAll('thead th').forEach((th,idx)=>{if(th.dataset.noSort==='1')return;th.classList.add('sortable');th.title='Click to sort';let asc=true;th.onclick=()=>{const rr=rows();rr.sort((a,b)=>{const av=a.cells[idx]?.innerText.trim()||'',bv=b.cells[idx]?.innerText.trim()||'',an=Number(av.replace(/[^0-9.-]/g,'')),bn=Number(bv.replace(/[^0-9.-]/g,''));const cmp=(!isNaN(an)&&!isNaN(bn)&&av&&bv)?an-bn:av.localeCompare(bv,undefined,{numeric:true,sensitivity:'base'});return asc?cmp:-cmp});rr.forEach(r=>body.appendChild(r));asc=!asc;page=1;apply()}});apply();
    });
  }
  async function roleAndReminders(){
    if(!window.HCAuth?.auth||!document.querySelector('.portal-nav'))return;const u=await new Promise(res=>{const off=HCAuth.auth.onAuthStateChanged(x=>{off();res(x)})});if(!u)return;
    try{const p=(await HCAuth.api('getProfile')).profile,nav=document.querySelector('.portal-nav'),label=p.role==='admin'?'Admin Logged In':p.role==='connector'?'Connector IN':'Executive IN';let badge=document.getElementById('hcRoleState');if(!badge){badge=document.createElement('span');badge.id='hcRoleState';badge.className='login-state';nav.insertBefore(badge,nav.querySelector('#logout')||null)}badge.textContent=label;
      if(window.HCCRM){const leads=await HCCRM.myLeads(),today=new Date();today.setHours(23,59,59,999);const done=['Closed','Disbursed','Rejected','Not Interested'];const due=leads.filter(x=>{if(done.includes(x.status)||!x.nextFollowUp)return false;const d=new Date(String(x.nextFollowUp).split('|')[0].trim());return !isNaN(d)&&d<=today}).length;if(due){let r=document.getElementById('hcFollowReminder');if(!r){r=document.createElement('a');r.id='hcFollowReminder';r.className='follow-reminder';r.href='my-leads.html?followup=due';nav.insertBefore(r,nav.querySelector('#logout')||null)}r.textContent=`Follow-ups ${due}`;r.title='Follow-ups due today or earlier';}}
    }catch(_){ }
  }

  function navLoading(){document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download'))return;const h=a.getAttribute('href');if(!h||h.startsWith('#')||h.startsWith('javascript:')||h.startsWith('mailto:')||h.startsWith('tel:'))return;show('Opening page…')},true)}
  function noDuplicateExplore(){document.querySelectorAll('header nav').forEach(n=>{const ex=[...n.querySelectorAll('.nav-dropdown')].filter(d=>/^Explore\b/i.test(d.querySelector('.nav-drop-btn')?.textContent||''));ex.slice(1).forEach(x=>x.remove())})}
  document.addEventListener('DOMContentLoaded',()=>{overlay();tooltips();navLoading();noDuplicateExplore();enhanceTables();const mo=new MutationObserver(()=>enhanceTables());mo.observe(document.body,{childList:true,subtree:true});setTimeout(hide,180);setTimeout(idleSession,300);setTimeout(accessPolicies,350);setTimeout(roleAndReminders,450)});
  window.addEventListener('load',hide,{once:true});
  window.HCAppShell={show,hide};
})();
