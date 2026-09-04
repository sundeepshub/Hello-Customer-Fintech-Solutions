
(function(){
  const themes={
    navy:{label:'Navy & Gold',body:'#f5f7fa',surface:'#fff',ink:'#14253d',accent:'#c28b2c',accent2:'#183a60'},
    teal:{label:'Slate & Teal',body:'#f3f7f7',surface:'#fff',ink:'#20333b',accent:'#0b7d79',accent2:'#344b55'},
    indigo:{label:'Indigo & Pearl',body:'#f7f6fb',surface:'#fff',ink:'#24233d',accent:'#5a5bb7',accent2:'#34355f'}
  };
  function applyTheme(k){const x=themes[k]||themes.navy;document.documentElement.dataset.portalTheme=k;
    [['--portal-bg',x.body],['--portal-surface',x.surface],['--portal-ink',x.ink],['--portal-accent',x.accent],['--portal-accent-2',x.accent2]].forEach(v=>document.documentElement.style.setProperty(v[0],v[1]));
    localStorage.setItem('hcPortalTheme',k)}
  function themeSwitcher(){if(!document.body.classList.contains('portal-body')||document.getElementById('hcThemeSwitcher'))return;
    const host=document.createElement('div');host.id='hcThemeSwitcher';host.className='theme-switcher';host.innerHTML='<label>Theme <select aria-label="Portal theme">'+Object.entries(themes).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join('')+'</select></label>';
    document.body.appendChild(host);const s=host.querySelector('select');s.value=localStorage.getItem('hcPortalTheme')||'navy';s.onchange=()=>applyTheme(s.value)}
  function spinner(){return '<span class="btn-spinner" aria-hidden="true"></span>'}
  function setLoading(btn,on,label){if(!btn)return;if(on){if(!btn.dataset.originalHtml)btn.dataset.originalHtml=btn.innerHTML;btn.disabled=true;btn.classList.add('is-loading');btn.innerHTML=spinner()+(label||'Please wait…')}else{btn.disabled=false;btn.classList.remove('is-loading');if(btn.dataset.originalHtml){btn.innerHTML=btn.dataset.originalHtml;delete btn.dataset.originalHtml}}}
  function message(el,text,type='ok'){if(!el)return;el.textContent=text;el.className='auth-message '+type;el.hidden=false}
  window.HCUI={setLoading,message,applyTheme,themes};
  applyTheme(localStorage.getItem('hcPortalTheme')||'navy');document.addEventListener('DOMContentLoaded',themeSwitcher);
})();
