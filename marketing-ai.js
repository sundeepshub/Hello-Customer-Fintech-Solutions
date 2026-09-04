(function(){
 const hooks={
  'Personal Loan':['Need funds without guesswork?','A clearer personal-loan conversation starts here.','Planning a personal loan? Organise the requirement first.'],
  'Home Loan':['Your home-loan decision deserves a structured comparison.','Planning a home purchase? Start with the right questions.','Before choosing a home loan, understand the complete requirement.'],
  'Business Loan':['Funding should fit the business—not the other way around.','Working capital or expansion? Start with a structured funding discussion.','Turn business plans into a clear funding requirement.'],
  'Loan Against Property':['Your property may support a funding requirement—subject to lender assessment.','Explore secured funding with the right information first.'],
  'Education Loan':['Education funding starts with course, institution and family profile.','Planning studies in India or abroad? Organise the education-loan requirement.'],
  'Vehicle Loan':['Planning a vehicle purchase? Compare the requirement before choosing finance.'],
  'Balance Transfer / Consolidation':['Multiple EMIs? Review the obligations before considering consolidation.','A balance transfer should be evaluated beyond the headline rate.'],
  'Project Funds':['Project finance needs more than an amount—it needs a structured project story.']
 };
 const templates=[
  ['Lead Generation','Share your requirement through the secure enquiry link. We will review the details and explain the available next steps.'],
  ['Rate Awareness','Rates vary by lender, profile, bureau, income and documentation. Check approximate reference ranges and submit your requirement for a more relevant discussion.'],
  ['Document Readiness','Faster conversations start with better information. Keep your KYC, income and existing-loan details ready before discussing finance options.'],
  ['EMI Review','Existing EMIs can affect eligibility. Share all current obligations so the requirement can be reviewed more accurately.'],
  ['CIBIL Awareness','A credit score is one part of a lender decision. Account history, overdue reporting and repayment behaviour can also matter.'],
  ['Home Loan BT','Before transferring a home loan, compare rate, remaining tenure, charges, top-up need and total interest—not EMI alone.'],
  ['Business Funding','Business vintage, turnover, banking, GST/ITR and repayment capacity can influence available funding options.'],
  ['Education Funding','Course, institution, country, co-applicant income, collateral and admission status can influence education-loan options.'],
  ['Festival Campaign','This season, review your funding requirement early and keep the necessary documents ready.'],
  ['Referral','Know someone planning a loan? Share the secure enquiry link so they can submit the requirement directly.'],
  ['Follow-up','Still planning your loan? Update the requirement timeline and we can continue the discussion when it is relevant for you.'],
  ['Trust','No instant approval promises. We first understand the requirement, existing commitments and documents, then discuss possible lender options.']
 ];
 function localGenerate(o={}){const loan=o.loanType||'Personal Loan',platform=o.platform||'Social Media',tone=o.tone||'Professional',aud=o.audience||'Customers',objective=o.objective||'Lead Generation',language=o.language||'English';const hs=hooks[loan]||hooks['Personal Loan'];const h=hs[Math.abs((o.details||'').length)%hs.length];const base=(templates.find(x=>x[0]===objective)||templates[0])[1];const cta=o.cta||'Know More';const details=(o.details||'').trim();const hashtags=['#Loans','#Finance','#LoanSupport','#HelloCustomer'];const text=`${h}\n\n${base}${details?'\n\n'+details:''}\n\n${cta}: {{TRACKING_LINK}}\n\n${hashtags.join(' ')}`;const prompt=`Create a ${tone.toLowerCase()} ${platform} marketing post for ${loan}. Audience: ${audienceSafe(aud)}. Objective: ${objective}. Language: ${language}. Avoid guaranteed approval/rate claims. Include a clear CTA and use {{TRACKING_LINK}}.`;return{headline:h,text,prompt,hashtags:hashtags.join(' '),source:'Local marketing rules engine'}}
 function audienceSafe(x){return String(x||'Customers').replace(/[<>]/g,'')}
 window.HCMarketingAI={localGenerate,templates,hooks};
})();
