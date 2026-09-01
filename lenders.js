/* Hello Customer — Master Lender Directory (Revision 9)
   Product-specific lender pools. Categories are intentionally separated: banks, RRBs,
   SFBs, HFCs and NBFC/finance companies are not presented as the same institution type.
   Verify current product availability, regulatory status and lender policy before publishing a specific offer.
*/
const HC_LENDERS = {
  publicSectorBanks: [
    'State Bank of India','Bank of Baroda','Bank of India','Bank of Maharashtra','Canara Bank',
    'Central Bank of India','Indian Bank','Indian Overseas Bank','Punjab National Bank','Punjab & Sind Bank','UCO Bank','Union Bank of India'
  ],
  privateBanks: [
    'Axis Bank','Bandhan Bank','CSB Bank','City Union Bank','DCB Bank','Dhanlaxmi Bank','Federal Bank',
    'HDFC Bank','ICICI Bank','IndusInd Bank','IDFC FIRST Bank','Jammu & Kashmir Bank','Karnataka Bank',
    'Karur Vysya Bank','Kotak Mahindra Bank','Nainital Bank','RBL Bank','South Indian Bank',
    'Tamilnad Mercantile Bank','YES Bank','IDBI Bank'
  ],
  smallFinanceBanks: [
    'AU Small Finance Bank','Capital Small Finance Bank','Equitas Small Finance Bank','ESAF Small Finance Bank',
    'Jana Small Finance Bank','Shivalik Small Finance Bank','Slice Small Finance Bank','Suryoday Small Finance Bank',
    'Ujjivan Small Finance Bank','Unity Small Finance Bank','Utkarsh Small Finance Bank'
  ],
  rrb: [
    'Andhra Pradesh Grameena Bank','Assam Gramin Bank','Arunachal Pradesh Rural Bank','Bihar Gramin Bank',
    'Chhattisgarh Gramin Bank','Gujarat Gramin Bank','Haryana Gramin Bank','Himachal Pradesh Gramin Bank',
    'Jammu & Kashmir Grameen Bank','Jharkhand Gramin Bank','Karnataka Grameena Bank','Kerala Grameena Bank',
    'Madhya Pradesh Gramin Bank','Maharashtra Gramin Bank','Manipur Rural Bank','Meghalaya Rural Bank',
    'Mizoram Rural Bank','Nagaland Rural Bank','Odisha Grameen Bank','Punjab Gramin Bank','Puducherry Grama Bank',
    'Rajasthan Gramin Bank','Tamil Nadu Grama Bank','Telangana Grameena Bank','Tripura Gramin Bank',
    'Uttar Pradesh Gramin Bank','Uttarakhand Gramin Bank','West Bengal Gramin Bank'
  ],
  localAreaBanks: ['Coastal Local Area Bank','Krishna Bhima Samruddhi Local Area Bank'],
  cooperative: ['State Co-operative Bank','District Central Co-operative Bank','Urban Co-operative Bank','Other Co-operative Bank'],
  hfc: [
    'Aadhar Housing Finance','Aditya Birla Housing Finance','Aptus Value Housing Finance India','ART Housing Finance',
    'Aavas Financiers','Altum Credo Home Finance','Anand Housing Finance','Bajaj Housing Finance','Can Fin Homes',
    'Cent Bank Home Finance','Centrum Housing Finance','Capri Global Housing Finance','Clix Housing Finance',
    'DMI Housing Finance','Easy Home Finance','GIC Housing Finance','Grihum Housing Finance',
    'Habitat Micro Build India Housing Finance','Hero Housing Finance','Home First Finance Company India',
    'Homeshree Housing Finance','Hinduja Housing Finance','ICICI Home Finance','IKF Home Finance',
    'IIFL Home Finance','India Home Loan','India Shelter Finance','ITI Housing Finance','JM Financial Home Loans',
    'KIFS Housing Finance','Khush Housing Finance','LIC Housing Finance','Manappuram Home Finance',
    'Mahindra Rural Housing Finance','Mamta Housing Finance','Manibhavnam Home Finance','MAS Rural Housing and Mortgage Finance',
    'Mentor Home Loans India','Motilal Oswal Home Finance','Muthoot Homefin','Muthoot Housing Finance',
    'Nido Home Finance','Nivara Home Finance','Orange City Housing Finance','Panthoibi Housing Finance',
    'PNB Housing Finance','Repco Home Finance','Roha Housing Finance','Saral Home Finance','Save Housing Finance',
    'Shubham Housing Development Finance','SMFG India Home Finance','Sundaram Home Finance','Supreme Housing Finance',
    'SITAARA Housing Finance','Star Housing Finance','Swagat Housing Finance','Tata Capital Housing Finance',
    'TruHome Finance','Vastu Housing Finance','VIVA Home Finance','West End Housing Finance','Wonder Home Finance',
    'Niwas Housing Finance','Swarna Pragati Housing Microfinance','Aviom India Housing Finance','Jothi Housing and Mortgage Finance',
    'Micro Green Housing Finance','Family Home Finance','Wood Home Finance','Nestavia Home Finance','Nanayasurabhi Affordable Housing Finance'
  ],
  personalFinance: [
    'Bajaj Finance','Tata Capital','Aditya Birla Finance','HDB Financial Services','Piramal Finance','L&T Finance',
    'Poonawalla Fincorp','Cholamandalam Investment & Finance','Shriram Finance','Hero FinCorp','Mahindra Finance',
    'TVS Credit','SMFG India Credit','DMI Finance','Fibe / EarlySalary','Five-Star Business Finance','IIFL Finance'
  ],
  businessFinance: [
    'Bajaj Finance','Tata Capital','Aditya Birla Finance','HDB Financial Services','Piramal Finance','L&T Finance',
    'Poonawalla Fincorp','Cholamandalam Investment & Finance','Shriram Finance','Mahindra Finance','TVS Credit',
    'SMFG India Credit','DMI Finance','UGRO Capital','Five-Star Business Finance','NeoGrowth','Kinara Capital',
    'Lendingkart','Aye Finance','IIFL Finance','Muthoot Finance','Manappuram Finance'
  ],
  vehicleFinance: [
    'Mahindra Finance','Shriram Finance','Cholamandalam Investment & Finance','Sundaram Finance','TVS Credit',
    'Bajaj Finance','HDB Financial Services','Hero FinCorp','L&T Finance','AU Small Finance Bank','Magma Finance / Magma HDI Finance',
    'Indostar Capital Finance','Manappuram Finance','Tata Motors Finance / applicable current entity'
  ],
  educationFinance: [
    'Avanse Financial Services','Auxilo Finserve','HDFC Credila / current operating entity','InCred Finance','Propelld','Eduvanz',
    'Tata Capital','Leap Finance / applicable lending partner','MPower Financing / applicable lending partner'
  ],
  goldFinance: [
    'Muthoot Finance','Manappuram Finance','IIFL Finance','Muthoot FinCorp','Bajaj Finance','Kosamattam Finance',
    'Fedfina / applicable gold-loan products','Rupeek / applicable lending partner'
  ],
  equipmentFinance: [
    'Tata Capital','Bajaj Finance','L&T Finance','Mahindra Finance','Cholamandalam Investment & Finance','Shriram Finance',
    'HDB Financial Services','UGRO Capital','Siemens Financial Services India','DLL Finance','De Lage Landen Financial Services India'
  ],
  commercialVehicleFinance: [
    'Mahindra Finance','Shriram Finance','Cholamandalam Investment & Finance','Sundaram Finance','Tata Motors Finance / applicable current entity',
    'L&T Finance','HDB Financial Services','TVS Credit','AU Small Finance Bank','Indostar Capital Finance'
  ],
  agricultureFinance: ['NABARD-supported lending channels','Regional Rural Banks','State Co-operative Banks','District Central Co-operative Banks','Agriculture-focused NBFCs / MFIs'],
  foreignBanks: [
    'AB Bank','American Express Banking Corporation','ANZ','Barclays Bank','Bank of America','Bank of Bahrain and Kuwait',
    'Bank of Ceylon','Bank of China','Bank of Nova Scotia','BNP Paribas','Citibank','Credit Agricole','CTBC Bank','DBS Bank India',
    'Deutsche Bank','Doha Bank','Emirates NBD','First Abu Dhabi Bank','FirstRand Bank','HSBC','ICBC','Industrial Bank of Korea',
    'JPMorgan Chase Bank','JSC VTB Bank','KEB Hana Bank','Kookmin Bank','Mashreqbank','Maybank','Mizuho Bank','MUFG Bank',
    'Qatar National Bank','Shinhan Bank','Société Générale','Standard Chartered Bank','Sumitomo Mitsui Banking Corporation',
    'United Overseas Bank','Woori Bank','UBS'
  ]
};

HC_LENDERS.productMap = {
  'Personal Loan': {
    categories: { 'Public Sector Bank':'publicSectorBanks','Private Sector Bank':'privateBanks','Small Finance Bank':'smallFinanceBanks','NBFC / Finance Company':'personalFinance','Foreign Bank':'foreignBanks' }
  },
  'Home Loan': {
    categories: { 'Public Sector Bank':'publicSectorBanks','Private Sector Bank':'privateBanks','Small Finance Bank':'smallFinanceBanks','Housing Finance Company (HFC)':'hfc','NBFC / Finance Company':'personalFinance','Foreign Bank':'foreignBanks' }
  },
  'Home Loan Balance Transfer + Top-up': {
    categories: { 'Public Sector Bank':'publicSectorBanks','Private Sector Bank':'privateBanks','Housing Finance Company (HFC)':'hfc','NBFC / Finance Company':'personalFinance' }
  },
  'Business Loan': {
    categories: { 'Public Sector Bank':'publicSectorBanks','Private Sector Bank':'privateBanks','Small Finance Bank':'smallFinanceBanks','Regional Rural Bank':'rrb','Co-operative Bank':'cooperative','NBFC / Business Finance Company':'businessFinance','Foreign Bank':'foreignBanks' }
  },
  'Loan Against Property': {
    categories: { 'Public Sector Bank':'publicSectorBanks','Private Sector Bank':'privateBanks','Housing Finance Company (HFC)':'hfc','NBFC / Finance Company':'businessFinance','Foreign Bank':'foreignBanks' }
  },
  'Vehicle Loan': {
    categories: { 'Public Sector Bank':'publicSectorBanks','Private Sector Bank':'privateBanks','Small Finance Bank':'smallFinanceBanks','NBFC / Vehicle Finance Company':'vehicleFinance' }
  },
  'Education Loan': {
    categories: { 'Public Sector Bank':'publicSectorBanks','Private Sector Bank':'privateBanks','Small Finance Bank':'smallFinanceBanks','Regional Rural Bank':'rrb','Education Finance Company':'educationFinance','Foreign Bank':'foreignBanks' }
  },
  'Balance Transfer / Consolidation': {
    categories: { 'Public Sector Bank':'publicSectorBanks','Private Sector Bank':'privateBanks','NBFC / Finance Company':'personalFinance','Housing Finance Company (where applicable)':'hfc' }
  },
  'Project Funds': {
    categories: { 'Public Sector / Project Banking':'publicSectorBanks','Private / Corporate Banking':'privateBanks','NBFC / Project Finance':'businessFinance','Housing Finance Company (where applicable)':'hfc','Foreign Bank':'foreignBanks' }
  }
};

function hcGetLenderOptions(loanType){
  const map=HC_LENDERS.productMap[loanType];
  if(!map)return [];
  return Object.entries(map.categories).map(([label,key])=>({label,key,items:HC_LENDERS[key]||[]}));
}
function hcRenderLenderSelectors(loanType, host){
  if(!host)return;
  const options=hcGetLenderOptions(loanType);
  host.innerHTML=`<div class="lender-choice-box"><h4>🏦 Preferred bank / lender</h4><p class="muted">If you have a preference, select it. Otherwise choose “No preference” and we can discuss suitable options based on the enquiry and lender eligibility.</p><div class="fields two"><label>Do you have a preferred lender? *<select name="preferredLenderChoice" id="preferredLenderChoice" required><option value="">Select</option><option>Yes</option><option>No — Please suggest suitable options</option></select></label><label id="preferredLenderCategoryWrap" class="hidden">Preferred lender category<select name="preferredLenderCategory" id="preferredLenderCategory"><option value="">Select category</option>${options.map(o=>`<option value="${esc(o.key)}">${esc(o.label)}</option>`).join('')}<option value="other">Other regulated lender</option></select></label><label id="preferredLenderWrap" class="full hidden">Preferred bank / finance company<select name="preferredLender" id="preferredLender"><option value="">Select lender</option></select></label><label id="preferredLenderOtherWrap" class="full hidden">Other lender name<input name="preferredLenderOther" maxlength="150" placeholder="Enter bank / finance company name"></label></div><p class="privacy-note">Lender availability, product suitability, eligibility, pricing, documentation and approval remain subject to the respective lender's current policy and applicable regulations.</p></div>`;
  const choice=host.querySelector('#preferredLenderChoice'),cat=host.querySelector('#preferredLenderCategory'),sel=host.querySelector('#preferredLender'),catWrap=host.querySelector('#preferredLenderCategoryWrap'),selWrap=host.querySelector('#preferredLenderWrap'),otherWrap=host.querySelector('#preferredLenderOtherWrap');
  choice.addEventListener('change',()=>{const yes=choice.value==='Yes';catWrap.classList.toggle('hidden',!yes);cat.required=yes;if(!yes){cat.value='';selWrap.classList.add('hidden');otherWrap.classList.add('hidden');sel.required=false}else{cat.dispatchEvent(new Event('change'))}});
  cat.addEventListener('change',()=>{const o=options.find(x=>x.key===cat.value);const isOther=cat.value==='other';otherWrap.classList.toggle('hidden',!isOther);selWrap.classList.toggle('hidden',!o||isOther);sel.required=!!o&&!isOther;sel.innerHTML=`<option value="">Select lender</option>${(o?.items||[]).map(x=>`<option>${esc(x)}</option>`).join('')}<option value="No preference within this category">No preference within this category</option>`;});
}
function hcRenderLenderDirectory(){document.querySelectorAll('[data-lender-loan]').forEach(host=>{const loan=host.dataset.lenderLoan;const opts=hcGetLenderOptions(loan);host.innerHTML=`<div class="lender-directory"><div class="eyebrow">Lender options</div><h2>Who may offer this type of finance?</h2><p>We can discuss suitable options across the lender categories below. Availability and eligibility vary by product, customer profile, location and lender policy.</p><div class="problem-grid">${opts.map(o=>`<article><h3>🏦 ${esc(o.label)}</h3><p>${o.items.length} listed options in our current directory.</p><details><summary>View lenders</summary><ul>${o.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details></article>`).join('')}</div><p class="privacy-note">Directory is for enquiry guidance and is not a guarantee that every listed institution currently offers this product to every customer.</p></div>`})}
