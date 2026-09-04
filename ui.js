(function(){
  const themes={
    navy:{label:'Navy & Gold',body:'#f4f7fb',surface:'#ffffff',ink:'#12263f',muted:'#64748b',accent:'#b9872f',accent2:'#183a60',line:'#dce5ef'},
    teal:{label:'Slate & Teal',body:'#f1f7f7',surface:'#ffffff',ink:'#17323a',muted:'#60767b',accent:'#0b7d79',accent2:'#294f59',line:'#d7e6e5'},
    indigo:{label:'Indigo & Pearl',body:'#f7f6fb',surface:'#ffffff',ink:'#272547',muted:'#6f6b86',accent:'#5d5bc5',accent2:'#38366f',line:'#e1dff0'}
  };
  function applyTheme(k){
    const x=themes[k]||themes.navy;k=themes[k]?k:'navy';
    document.documentElement.dataset.portalTheme=k;
    const vars={'--portal-bg':x.body,'--portal-surface':x.surface,'--portal-ink':x.ink,'--portal-muted':x.muted,'--portal-accent':x.accent,'--portal-accent-2':x.accent2,'--portal-line':x.line};
    Object.entries(vars).forEach(([a,b])=>document.documentElement.style.setProperty(a,b));
    try{localStorage.setItem('hcPortalTheme',k)}catch(_){}
  }
  function themeSwitcher(){
    if(!document.body.classList.contains('portal-body')||document.getElementById('hcThemeSwitcher'))return;
    const host=document.createElement('div');host.id='hcThemeSwitcher';host.className='theme-switcher';host.setAttribute('data-tooltip','Choose your preferred professional portal theme.');
    host.innerHTML='<label><span>Theme</span><select aria-label="Portal theme">'+Object.entries(themes).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join('')+'</select></label>';
    document.body.appendChild(host);const s=host.querySelector('select');s.value=localStorage.getItem('hcPortalTheme')||'navy';s.onchange=()=>applyTheme(s.value);
  }
  function spinner(){return '<span class="btn-spinner" aria-hidden="true"></span>'}
  function setLoading(btn,on,label){if(!btn)return;if(on){if(!btn.dataset.originalHtml)btn.dataset.originalHtml=btn.innerHTML;btn.disabled=true;btn.classList.add('is-loading');btn.innerHTML=spinner()+(label||'Please wait…')}else{btn.disabled=false;btn.classList.remove('is-loading');if(btn.dataset.originalHtml){btn.innerHTML=btn.dataset.originalHtml;delete btn.dataset.originalHtml}}}
  function message(el,text,type='ok'){if(!el)return;el.textContent=text;el.className='auth-message '+type;el.hidden=false}
  function toast(text,type='info',ms=3500){let host=document.getElementById('hcToastHost');if(!host){host=document.createElement('div');host.id='hcToastHost';host.className='toast-host';document.body.appendChild(host)}const t=document.createElement('div');t.className='hc-toast '+type;t.textContent=text;host.appendChild(t);setTimeout(()=>t.remove(),ms)}
  window.HCUI={setLoading,message,applyTheme,themes,toast,spinner};
  applyTheme(localStorage.getItem('hcPortalTheme')||'navy');
  document.addEventListener('DOMContentLoaded',themeSwitcher);
})();
