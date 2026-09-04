(() => {
  const endpoint = window.HC_APP_SCRIPT_URL || window.HC_APPS_SCRIPT_URL || '';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const post = async payload => {
    if (!endpoint) throw new Error('Offer service is not configured.');
    const r = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'}, body:JSON.stringify(payload)});
    const t = await r.text();
    const d = JSON.parse(t);
    if (!d.ok) throw new Error(d.error || 'Unable to load offers.');
    return d;
  };

  async function load() {
    try {
      const d = await post({action:'publicOfferLibrary'});
      (d.offers || []).forEach(x => {
        const card = document.getElementById(x.slotId);
        if (!card) return;
        if (x.enabled === false) {
          card.hidden = true;
          return;
        }
        const creative = card.querySelector('.offer-creative');
        if (creative && x.imageUrl) {
          creative.classList.remove('offer-placeholder');
          creative.innerHTML = `<img src="${esc(x.imageUrl)}" alt="${esc(x.loanType || 'Loan offer')} creative">`;
        }
        const h = card.querySelector('.offer-content h3');
        const p = card.querySelector('.offer-content p');
        const a = card.querySelector('.offer-content a');
        if (h && x.headline) h.textContent = x.headline;
        if (p && x.message) p.textContent = x.message;
        if (a && x.ctaText) a.textContent = x.ctaText;
        if (a && x.ctaUrl) a.href = x.ctaUrl;
      });
    } catch (e) {
      // Keep bundled, approved fallback creatives if the service is temporarily unavailable.
      console.warn('Offer Library:', e.message);
    }
  }
  document.addEventListener('DOMContentLoaded', load);
})();