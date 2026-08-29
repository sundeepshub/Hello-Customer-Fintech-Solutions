/* Hello Customer Fintech Solutions — GitHub Pages JS
   Set APPS_SCRIPT_URL to your deployed Google Apps Script Web App URL.
*/
const APPS_SCRIPT_URL = "";
const WHATSAPP_NUMBER = "919618321100";
const WHATSAPP_DEFAULT_MESSAGE = "Hi, I'd like to know more about loan options.";
const whatsappLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;

/* Wire every WhatsApp link on the page (footer + floating button) to WHATSAPP_NUMBER,
   so changing that one constant actually updates the whole site, as the README promises. */
function applyWhatsAppLinks(){
  document.querySelectorAll('a[data-whatsapp]').forEach(a => {
    a.href = whatsappLink(a.dataset.whatsappMsg || WHATSAPP_DEFAULT_MESSAGE);
  });
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => {
    a.href = whatsappLink(WHATSAPP_DEFAULT_MESSAGE);
  });
  const tel = document.querySelector('a[href^="tel:"]');
  if (tel) tel.href = "tel:+" + WHATSAPP_NUMBER;
}
applyWhatsAppLinks();

/* Floating WhatsApp button — matches the floating-contact-button pattern used
   elsewhere on the HelloCustomer site. Injected from JS so it stays in one
   place to maintain regardless of which HTML page includes this script. */
(function addFloatingWhatsApp(){
  const btn = document.createElement("a");
  btn.className = "float-whatsapp";
  btn.href = whatsappLink(WHATSAPP_DEFAULT_MESSAGE);
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.setAttribute("aria-label", "Chat on WhatsApp");
  btn.innerHTML = "💬";
  document.body.appendChild(btn);
})();

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(n)||0);

function emiCalc(){
  const P=Number($("#amount").value), annual=Number($("#rate").value), years=Number($("#tenure").value), r=annual/1200, n=years*12;
  const e=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  $("#amountOut").textContent=money(P);$("#rateOut").textContent=annual.toFixed(2)+"%";$("#tenureOut").textContent=years+(years===1?" Year":" Years");$("#emi").textContent=money(e);$("#principal").textContent=money(P);$("#interest").textContent=money(e*n-P);
}
["amount","rate","tenure"].forEach(id=>$("#"+id).addEventListener("input",emiCalc));emiCalc();

$("#menuBtn").addEventListener("click",()=>{const open=$("#navLinks").classList.toggle("open");$("#menuBtn").setAttribute("aria-expanded",open)});
$$("#navLinks a").forEach(a=>a.addEventListener("click",()=>$("#navLinks").classList.remove("open")));

const cfg={
"Personal Loan":{title:"How much do you need and why?",html:`<div class="form-grid"><label>Approx. Loan Amount *<input name="loanAmount" type="number" min="1" required placeholder="e.g. 500000"></label><label>Purpose *<select name="purpose" required><option value="">Select</option><option>Medical / Emergency</option><option>Education</option><option>Wedding</option><option>Debt Consolidation</option><option>Home Renovation</option><option>Personal Expenses</option><option>Other</option></select></label></div>`},
"Home Loan":{title:"Tell us about the home requirement.",html:`<div class="form-grid"><label>Requirement *<select name="purpose" required><option value="">Select</option><option>Home Purchase</option><option>Construction</option><option>Home Extension / Renovation</option><option>Home Loan Balance Transfer</option></select></label><label>Approx. Property Value<input name="propertyValue" type="number" min="0" placeholder="₹"></label><label>Approx. Loan Amount *<input name="loanAmount" type="number" min="1" required placeholder="₹"></label><label>Property Location<input name="propertyLocation" placeholder="City / Area"></label></div>`},
"Business Loan":{title:"Tell us about your business funding requirement.",html:`<div class="form-grid"><label>Approx. Loan Amount *<input name="loanAmount" type="number" min="1" required placeholder="₹"></label><label>Business Type *<select name="businessType" required><option value="">Select</option><option>Proprietorship</option><option>Partnership</option><option>Private Limited</option><option>LLP</option><option>Other</option></select></label><label>Approx. Annual Turnover<input name="turnover" type="number" min="0" placeholder="₹"></label><label>Purpose *<select name="purpose" required><option value="">Select</option><option>Working Capital</option><option>Business Expansion</option><option>Equipment</option><option>Other</option></select></label></div>`},
"Loan Against Property":{title:"Tell us about the secured-loan requirement.",html:`<div class="form-grid"><label>Approx. Property Value *<input name="propertyValue" type="number" min="1" required placeholder="₹"></label><label>Approx. Loan Amount *<input name="loanAmount" type="number" min="1" required placeholder="₹"></label><label>Property Type *<select name="propertyType" required><option value="">Select</option><option>Residential</option><option>Commercial</option><option>Other</option></select></label><label>Purpose *<select name="purpose" required><option value="">Select</option><option>Business</option><option>Personal</option><option>Debt Consolidation</option><option>Other</option></select></label></div>`},
"Vehicle Loan":{title:"Tell us about the vehicle requirement.",html:`<div class="form-grid"><label>Vehicle Type *<select name="vehicleType" required><option value="">Select</option><option>New Car</option><option>Used Car</option><option>Two Wheeler</option><option>Commercial Vehicle</option><option>Other</option></select></label><label>Approx. Vehicle Price<input name="vehicleValue" type="number" min="0" placeholder="₹"></label><label>Approx. Loan Amount *<input name="loanAmount" type="number" min="1" required placeholder="₹"></label><label>New or Used *<select name="vehicleCondition" required><option value="">Select</option><option>New</option><option>Used</option></select></label></div>`},
"Education Loan":{title:"Tell us about the education requirement.",html:`<div class="form-grid"><label>Course / Program<input name="course" placeholder="e.g. MBA"></label><label>Study Location *<select name="studyLocation" required><option value="">Select</option><option>India</option><option>Abroad</option></select></label><label>Approx. Education Cost<input name="educationCost" type="number" min="0" placeholder="₹"></label><label>Approx. Loan Amount *<input name="loanAmount" type="number" min="1" required placeholder="₹"></label></div>`},
"Loan Balance Transfer":{title:"Tell us about your existing loan.",html:`<div class="form-grid"><label>Existing Loan Type *<select name="existingLoanType" required><option value="">Select</option><option>Personal Loan</option><option>Home Loan</option><option>Business Loan</option><option>Vehicle Loan</option><option>Loan Against Property</option><option>Other</option></select></label><label>Approx. Outstanding *<input name="outstanding" type="number" min="1" required placeholder="₹"></label><label>Current EMI<input name="currentEmi" type="number" min="0" placeholder="₹"></label><label>Approx. Current Interest Rate<input name="currentRate" type="number" min="0" max="100" step=".01" placeholder="%"></label></div>`},
"EMI Consolidation":{title:"Help us understand your existing obligations.",html:`<div class="form-grid"><label>Approx. Total Outstanding *<input name="outstanding" type="number" min="1" required placeholder="₹"></label><label>Total Monthly EMI *<input name="currentEmi" type="number" min="0" required placeholder="₹"></label><label>Number of Active Loans / Cards<input name="activeAccounts" type="number" min="1" placeholder="e.g. 3"></label><label>Approx. Loan Amount Needed<input name="loanAmount" type="number" min="0" placeholder="₹"></label></div>`}
};

const S={step:1,loan:"",a:{},score:0,priority:"Standard"};
function chooseLoan(type){
  S.loan=type;
  $$(".choice").forEach(x=>x.classList.toggle("selected",x.dataset.loan===type));
  $("#requirementTitle").textContent=cfg[type].title;$("#dynamicRequirement").innerHTML=cfg[type].html;
  go(2);
}
$$(".loan-tile,.choice").forEach(x=>x.addEventListener("click",()=>chooseLoan(x.dataset.loan)));

$$("[data-existing]").forEach(x=>x.addEventListener("click",()=>{$$("[data-existing]").forEach(b=>b.classList.remove("selected"));x.classList.add("selected");S.a.hasExistingLoans=x.dataset.existing;$("#existingFields").classList.toggle("hide",x.dataset.existing!=="Yes")}));
$('select[name="employment"]').addEventListener("change",e=>{$("#experienceWrap").classList.toggle("hide",e.target.value==="Self-employed / Business");$("#vintageWrap").classList.toggle("hide",e.target.value!=="Self-employed / Business")});

function collect(){
  const active=$(`.flow-step[data-step="${S.step}"]`);
  active.querySelectorAll("input,select,textarea").forEach(el=>{if(el.name)S.a[el.name]=el.type==="checkbox"?el.checked:el.value});
}
function valid(){
  if(S.step===1&&!S.loan){$("#loanError").textContent="Please select a loan type.";return false}
  const active=$(`.flow-step[data-step="${S.step}"]`);
  for(const el of active.querySelectorAll("[required]"))if(!el.checkValidity()){el.reportValidity();return false}
  if(S.step===4&&!S.a.hasExistingLoans){alert("Please select Yes or No.");return false}
  return true
}
function go(n){
  S.step=n;
  $$(".flow-step").forEach(x=>x.classList.toggle("active",Number(x.dataset.step)===n));
  const pct=Math.round(n/6*100);$("#stepLabel").textContent=`Step ${n} of 6`;$("#progressPercent").textContent=pct+"%";$("#progressBar").style.width=pct+"%";
  $("#backBtn").style.visibility=n===1?"hidden":"visible";$("#nextBtn").style.display=n===6?"none":"inline-flex";
  if(n===6)result();
  $("#eligibility").scrollIntoView({behavior:"smooth",block:"start"});
}
$("#nextBtn").addEventListener("click",()=>{if(!valid())return;collect();go(S.step+1)});
$("#backBtn").addEventListener("click",()=>go(Math.max(1,S.step-1)));

function result(){
  collect();const a=S.a,income=+a.income||0,emi=+(a.existingEmi||a.currentEmi)||0,amount=+a.loanAmount||0;
  let score=0;if(["Salaried","Self-employed / Business","Professional"].includes(a.employment))score+=15;
  if(income>=50000)score+=20;else if(income>=25000)score+=12;else if(income>0)score+=5;
  if(emi===0)score+=15;else if(income&&emi/income<=.35)score+=18;else if(income&&emi/income<=.5)score+=10;
  if(amount>0)score+=10;if(["Home Loan","Loan Against Property"].includes(S.loan)&&(+a.propertyValue||0)>0)score+=15;
  if(S.loan==="Business Loan"&&(+a.turnover||0)>0)score+=10;if(S.a.hasExistingLoans==="No")score+=8;
  S.score=score;S.priority=score>=65?"High":score>=40?"Medium":"Standard";$("#leadPriority").textContent=S.priority;
  const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
  $("#resultSummary").innerHTML=[["Loan type",S.loan],["Approx. amount",money(amount)],["Employment",a.employment||"—"],["Monthly income",money(income)],["Existing EMI",money(emi)],["City",a.city||"—"]].map(x=>`<div><span>${esc(x[0])}</span><b>${esc(x[1])}</b></div>`).join("");
}
$("#eligibilityForm").addEventListener("submit",async e=>{
  e.preventDefault();collect();if(!valid())return;result();
  const payload={...S.a,loanType:S.loan,leadScore:S.score,leadPriority:S.priority,source:"Hello Customer Fintech Solutions - Loans Landing Page",timestamp:new Date().toISOString()};
  const btn=$("#submitLead");btn.disabled=true;btn.textContent="Submitting...";
  try{
    if(!APPS_SCRIPT_URL){console.log("Demo lead:",payload);$("#formStatus").textContent="Demo mode: configure APPS_SCRIPT_URL in script.js to save leads to Google Sheets.";btn.disabled=false;btn.textContent="Submit My Enquiry";return}
    await fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",body:new URLSearchParams(payload)});
    $("#formStatus").textContent="Thank you. Your enquiry has been submitted.";btn.textContent="Enquiry Submitted ✓";
  }catch(err){console.error(err);$("#formStatus").textContent="Unable to submit right now. Please try again.";btn.disabled=false;btn.textContent="Submit My Enquiry"}
});
$("#year").textContent=new Date().getFullYear();
