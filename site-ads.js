
(function(){
  if(!window.HC_PORTAL_CONFIG?.appsScriptUrl)return;
  async function load(){try{const fd=new FormData();fd.set('action','publicAds');const r=await fetch(HC_PORTAL_CONFIG.appsScriptUrl,{method:'POST',body:fd,cache:'no-store'});const d=await r.json();(d.ads||[]).forEach(render)}catch(_){}}
  function render(a){const el=document.createElement('aside');el.className='hc-site-ad '+(a.textEffect||'').toLowerCase().replace(/\s+/g,'-');el.dataset.placement=a.placement||'top';let media='';if(a.mediaUrl){media=a.contentType==='Video'?`<video controls playsinline src="${esc(a.mediaUrl)}"></video>`:`<img src="${esc(a.mediaUrl)}" alt="">`}el.innerHTML=`${media}<div><strong>${esc(a.headline||'')}</strong><p>${esc(a.message||'')}</p>${a.ctaUrl?`<a class="btn primary small" href="${esc(a.ctaUrl)}">${esc(a.ctaText||'Know More')}</a>`:''}</div>`;
    if(a.placement==='bottom'){el.classList.add('ad-bottom');document.body.appendChild(el)}else if(a.placement==='dashboard'){const host=document.querySelector('.portal-main .container');host?.prepend(el)}else{document.body.insertBefore(el,document.body.firstChild)}
  }
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',load):load();
})();
