/**
 * HELLO CUSTOMER FINTECH SOLUTIONS
 * Live Bank Loan ROI + Banking/Finance News JSON API
 *
 * Bind this Apps Script project to the Google Sheet used by the portal.
 * Run setupLoanRates() once, then deploy as a Web App:
 * Execute as: Me
 * Who has access: Anyone
 */

const ROI_CONFIG = Object.freeze({
  SHEET_NAME: 'Loan Rates',
  HEADERS: ['bank_id','bank_name','loan_type','roi_min','roi_max','benchmark','processing_fee','tenure_max_years'],
  CACHE_SECONDS: 600,
  MAX_NEWS: 20,
  FEEDS: [
    {source:'Reserve Bank of India — Press Releases', url:'https://rbi.org.in/pressreleases_rss.xml', filter:false},
    {source:'Reserve Bank of India — Notifications', url:'https://rbi.org.in/notifications_rss.xml', filter:false},
    {source:'Press Information Bureau — Government of India', url:'https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1', filter:true}
  ]
});

function doGet(e) {
  try {
    const payload = {
      status:'success',
      last_updated:Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Kolkata', "yyyy-MM-dd'T'HH:mm:ssXXX"),
      disclaimer:getDisclaimer_(),
      rates:getRates_(),
      news:getNews_()
    };
    return json_(payload);
  } catch (err) {
    console.error(err);
    return json_({
      status:'error',
      last_updated:new Date().toISOString(),
      disclaimer:getDisclaimer_(),
      rates:[],
      news:[],
      message:String(err && err.message ? err.message : err)
    });
  }
}

function setupLoanRates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Bind this Apps Script project to the Google Sheet first.');
  let sh = ss.getSheetByName(ROI_CONFIG.SHEET_NAME);
  if (!sh) sh = ss.insertSheet(ROI_CONFIG.SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(ROI_CONFIG.HEADERS);
  validateHeaders_(sh);
  if (sh.getLastRow() === 1) {
    const rows = [
      ['sbi','State Bank of India (SBI)','home_loan',8.50,9.75,'EBLR (Repo Linked)','0.35% + GST (Min ₹2000)',30],
      ['sbi','State Bank of India (SBI)','personal_loan',11.15,14.30,'2-Yr MCLR','1.50% + GST',7],
      ['sbi','State Bank of India (SBI)','car_loan',8.75,9.80,'1-Yr MCLR','Nil to 0.50% + GST',7],
      ['sbi','State Bank of India (SBI)','loan_against_property',10.10,11.35,'EBLR','1.00% + GST',15],
      ['hdfc','HDFC Bank','home_loan',8.70,9.80,'Policy Repo Linked','0.50% or ₹3000 + GST',30],
      ['hdfc','HDFC Bank','personal_loan',10.75,15.00,'Fixed / Floating','Up to ₹4999 + GST',6],
      ['hdfc','HDFC Bank','car_loan',8.85,10.25,'Fixed','0.50% of loan amount',7],
      ['hdfc','HDFC Bank','loan_against_property',9.50,11.25,'Repo Linked','1.00% + GST',15],
      ['icici','ICICI Bank','home_loan',8.75,9.85,'I-PRLR (Repo Linked)','0.50% + GST',30],
      ['icici','ICICI Bank','personal_loan',10.85,16.00,'Fixed','Up to 2.50% + GST',6],
      ['icici','ICICI Bank','car_loan',8.90,10.50,'Fixed','Up to ₹5000 + GST',7],
      ['icici','ICICI Bank','loan_against_property',9.75,11.50,'Repo Linked','1.00% + GST',15],
      ['axis','Axis Bank','home_loan',8.75,9.90,'Repo Linked','Up to 1.00% + GST',30],
      ['axis','Axis Bank','personal_loan',10.99,15.50,'Fixed','Up to 2.00% + GST',5],
      ['axis','Axis Bank','car_loan',9.00,10.75,'Fixed','Up to ₹4500 + GST',7],
      ['axis','Axis Bank','loan_against_property',10.00,11.75,'Repo Linked','1.00% + GST',15]
    ];
    sh.getRange(2,1,rows.length,ROI_CONFIG.HEADERS.length).setValues(rows);
  }
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, ROI_CONFIG.HEADERS.length);
}

function getRates_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('No active Google Sheet is available.');
  const sh = ss.getSheetByName(ROI_CONFIG.SHEET_NAME);
  if (!sh) throw new Error('Loan Rates sheet not found. Run setupLoanRates() once.');
  validateHeaders_(sh);

  const values = sh.getDataRange().getDisplayValues();
  if (values.length < 2) return [];
  const headers = values[0].map(x => String(x).trim().toLowerCase());

  return values.slice(1)
    .filter(row => row.some(v => String(v).trim() !== ''))
    .map(row => {
      const o={};
      headers.forEach((h,i) => o[h]=String(row[i] == null ? '' : row[i]).trim());
      return {
        bank_id:o.bank_id,
        bank_name:o.bank_name,
        loan_type:o.loan_type,
        roi_min:numberOrNull_(o.roi_min),
        roi_max:numberOrNull_(o.roi_max),
        benchmark:o.benchmark,
        processing_fee:o.processing_fee,
        tenure_max_years:numberOrNull_(o.tenure_max_years)
      };
    });
}

function validateHeaders_(sh) {
  const width=Math.max(sh.getLastColumn(),ROI_CONFIG.HEADERS.length);
  const headers=sh.getRange(1,1,1,width).getDisplayValues()[0].map(x=>String(x).trim().toLowerCase());
  const missing=ROI_CONFIG.HEADERS.filter(h=>headers.indexOf(h)<0);
  if(missing.length) throw new Error('Missing required Loan Rates columns: '+missing.join(', '));
}

function getNews_() {
  const cache=CacheService.getScriptCache();
  const cached=cache.get('hc_banking_news_v1');
  if(cached){try{return JSON.parse(cached)}catch(_){}}

  const requests=ROI_CONFIG.FEEDS.map(feed=>({
    url:feed.url,
    method:'get',
    followRedirects:true,
    muteHttpExceptions:true,
    headers:{'User-Agent':'Mozilla/5.0 (compatible; HelloCustomerFintech/1.0)'}
  }));

  let responses=[];
  try{responses=UrlFetchApp.fetchAll(requests)}catch(err){console.error('RSS fetch error: '+err)}

  const financeKeywords=/\b(bank|banking|loan|credit|lending|finance|financial|fintech|nbfc|reserve bank|rbi|upi|payments?|digital rupee|currency|deposit|mortgage|msme|mudra|insurance|pension)\b/i;
  let items=[];

  responses.forEach((res,index)=>{
    const feed=ROI_CONFIG.FEEDS[index];
    if(!res || res.getResponseCode()<200 || res.getResponseCode()>=300)return;
    try{
      parseFeed_(res.getContentText(),feed.source).forEach(item=>{
        if(!feed.filter || financeKeywords.test(item.title))items.push(item);
      });
    }catch(err){console.error('RSS parse error for '+feed.source+': '+err)}
  });

  const seen={};
  items=items.filter(item=>{
    const key=String(item.link||item.title).toLowerCase();
    if(!key || seen[key] || !/^https?:\/\//i.test(item.link))return false;
    seen[key]=true;
    return true;
  }).sort((a,b)=>(Date.parse(b.pubDate)||0)-(Date.parse(a.pubDate)||0)).slice(0,ROI_CONFIG.MAX_NEWS);

  try{cache.put('hc_banking_news_v1',JSON.stringify(items),ROI_CONFIG.CACHE_SECONDS)}catch(_){}
  return items;
}

function parseFeed_(xmlText, source) {
  const root=XmlService.parse(xmlText).getRootElement();
  const name=String(root.getName()).toLowerCase();
  const out=[];

  if(name==='rss' || name==='rdf'){
    const channel=findChild_(root,'channel') || root;
    let items=findChildren_(channel,'item');
    if(!items.length && channel!==root)items=findChildren_(root,'item');
    items.forEach(item=>{
      const title=childText_(item,'title');
      const link=childText_(item,'link');
      const date=childText_(item,'pubDate') || childText_(item,'date');
      if(title && link)out.push({title:title,link:link,pubDate:normalizeDate_(date),source:source});
    });
  } else if(name==='feed'){
    findChildren_(root,'entry').forEach(entry=>{
      const title=childText_(entry,'title');
      const linkEls=findChildren_(entry,'link');
      let link='';
      for(let i=0;i<linkEls.length;i++){
        const href=linkEls[i].getAttribute('href');
        const rel=linkEls[i].getAttribute('rel');
        if(href && (!rel || rel.getValue()==='alternate')){link=href.getValue();break}
      }
      const date=childText_(entry,'published') || childText_(entry,'updated');
      if(title && link)out.push({title:title,link:link,pubDate:normalizeDate_(date),source:source});
    });
  }
  return out;
}

function findChild_(element,name) {
  const children=element.getChildren();
  const target=String(name).toLowerCase();
  for(let i=0;i<children.length;i++)if(String(children[i].getName()).toLowerCase()===target)return children[i];
  return null;
}
function findChildren_(element,name) {
  const target=String(name).toLowerCase();
  return element.getChildren().filter(c=>String(c.getName()).toLowerCase()===target);
}
function childText_(element,name) {
  const c=findChild_(element,name);
  return c?String(c.getText()||'').trim():'';
}
function normalizeDate_(value) {
  if(!value)return '';
  const d=new Date(value);
  return isNaN(d.getTime())?String(value):d.toISOString();
}
function numberOrNull_(value) {
  if(value==='' || value==null)return null;
  const n=Number(String(value).replace(/,/g,''));
  return isNaN(n)?null:n;
}
function getDisclaimer_() {
  return 'Interest-rate ranges, processing fees, benchmarks and tenures are indicative reference information only and may change at any time. Final rates, eligibility, fees, tenure and approval depend on the lender’s current policy, applicant income/profile, credit-bureau history including CIBIL where applicable, collateral/LTV for secured loans, documentation and underwriting. Verify the current official lender schedule before quoting or applying.';
}
function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
