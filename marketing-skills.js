(function(){
const audiences=['Salaried Employees','IT / Software Employees','Government Employees','Private-Sector Employees','Banking & Finance Employees','Doctors','CA / CS / Lawyers','Teachers & Professors','Defence Personnel','Railway Employees','Police Personnel','Self-Employed Professionals','Small Business Owners','MSME Owners','Traders & Retailers','Manufacturers','Distributors & Wholesalers','Start-up Founders','Women Entrepreneurs','First-time Home Buyers','Existing Home-loan Customers','Balance-transfer Customers','Property Owners','Landlords','NRI Customers','Returning NRIs','Students','Parents of Students','Study-Abroad Applicants','Vehicle Buyers','Commercial Vehicle Owners','Fleet Owners','Doctors Setting Up Clinics','Hospital Owners','Contractors','Builders & Developers','Real-estate Investors','Agriculture Allied Businesses','High CIBIL Customers','Customers with Low/Thin Credit History','Customers with Multiple EMIs','Credit-card Outstanding Customers','Debt-consolidation Prospects','Existing Bank Customers','Salary Account Customers','Business Banking Customers','New-to-Credit Customers','Young Professionals','Mid-career Professionals','Senior Professionals','Families','Newly Married Couples','Parents','Women Customers','Senior Citizens','Tier-1 City Customers','Tier-2 / Tier-3 Customers','Hyderabad Customers','Telangana Customers','Andhra Pradesh Customers','Referral Leads','Existing Customers','Past Enquiries','Warm Leads','Follow-up Due Leads','Document-ready Customers','Urgent Requirement Customers','1–3 Month Planners'];
const ctas=['Know More','Check Eligibility','Start Enquiry','Submit Enquiry','Request a Callback','Talk to a Loan Advisor','Compare Options','Explore Loan Options','Get a Requirement Review','Check Document Readiness','Review Existing EMIs','Discuss Balance Transfer','See Current Reference Rates','Get a Call Back Today','Schedule a Discussion','Share Your Requirement','Get Started','Explore More','Contact Us','Message Us','Call Now','WhatsApp Us','Apply for Assessment','Request Loan Guidance','Get a Free Requirement Review'];
const details=['Highlight document readiness and a simple next step.','Focus on EMI burden and responsible consolidation review.','Target customers planning within 30 days.','Explain that rates depend on profile and lender policy.','Use a trust-building message with no approval promises.','Focus on first-time home buyers and contribution planning.','Explain home-loan balance transfer plus top-up considerations.','Focus on business working capital and banking/turnover readiness.','Target self-employed professionals and practice expansion.','Create an education-loan message for study abroad applicants.','Create a referral message that is easy to forward.','Create a follow-up message for a warm lead who has not responded.','Focus on CIBIL awareness without claiming score repair.','Explain why complete EMI and liability disclosure matters.','Create a short festival-season funding awareness post.','Create a premium professional message for senior salaried customers.','Use Hyderabad/Telangana context without overpromising lender coverage.','Create a WhatsApp-friendly message under 500 characters.','Create an Instagram caption with hook, value, CTA and hashtags.','Create an image-generation prompt with Indian professional/family visual context.'];
const ideas=['Personal Loan — IT Employees','Home Loan — First Home','Home Loan BT + Top-up','Business Loan — Working Capital','MSME Expansion Funding','Doctor / Professional Loan','Loan Against Property — Business Need','Education Loan — Study Abroad','Vehicle Finance — New Purchase','Commercial Vehicle Funding','CIBIL Awareness','Document Readiness','Multiple EMI Review','Credit-card Consolidation','Referral Campaign','Warm Lead Follow-up','Festival Campaign','NRI Home Loan','Women Entrepreneur Funding','Startup Funding Readiness','Property Purchase Planning','Rate Awareness','Salary-account Customer','Existing Customer Cross-sell','Request a Callback','30-day Loan Planner','Self-employed Professional','Government Employee Personal Loan','Builder / Contractor Funding','Machinery Finance','Hospital / Clinic Expansion','Balance Transfer Savings Review'];
const titlePatterns=['{loan}: A Clearer Way to Start','Planning {loan}? Start with the Right Information','{loan} Support for {audience}','Before You Apply for {loan}','Your {loan} Requirement, Organised','Explore {loan} Options Responsibly','A Better {loan} Conversation Starts Here','{loan}: Documents, Eligibility & Next Steps','Need {loan}? Let’s Review the Requirement','{loan} Planning Made Simpler'];
window.HCMarketingSkills={audiences,ctas,details,ideas,titlePatterns};})();
;(function(){
 if(!window.HCMarketingSkills)return;
 const s=window.HCMarketingSkills;
 s.messageCategories=[
 'Loan Offers','Loan Awareness','Document Readiness','CIBIL & Credit Awareness','EMI Review','Balance Transfer',
 'Referral','Follow-up','Trust Building','Customer Education','Wishes','Festival Wishes','National Wishes',
 'Personal Wishes','Birthday Wishes','Anniversary Wishes','Family Wishes','Professional Wishes','Thank You',
 'Congratulations','New Job Wishes','Business Milestone','Seasonal Greetings','Financial Awareness','Safety Alert'
 ];
 s.mediaTypes=['Greeting Card','Image','Video','GIF','Banner','Story/Reel Creative','Carousel Creative'];
 s.imageSizes=[
 '1080×1080 — Square Post','1080×1350 — Portrait Post','1080×1920 — Story / Reel',
 '1200×628 — Landscape Ad','1200×675 — Video / YouTube','1920×600 — Website Hero Banner',
 '1600×500 — Wide Banner','1200×400 — Campaign Banner','600×400 — Offer Card',
 '400×300 — Compact Card','820×312 — Facebook Cover','1280×720 — YouTube Thumbnail',
 '1000×1000 — Greeting Card','1080×566 — LinkedIn Landscape'
 ];
 s.ctas=[...new Set([...(s.ctas||[]),
 'Check Eligibility','Start Enquiry','Request a Callback','Talk to a Loan Advisor','Explore Current Options',
 'Compare Loan Options','Review My EMIs','Check Balance Transfer','Get Document Checklist','Check Company Listing',
 'Ask for Details','Know More','Apply for Review','Book a Consultation','Share Requirement','Get a Quote',
 'Contact Me','Send WhatsApp Message','Call Now','Learn More','View Offers','Check Rates','Request Assessment'
 ])];
 s.ideas=[...new Set([...(s.ideas||[]),
 'Salary Day Loan Readiness','First-Time Borrower Guide','EMI Consolidation Check','Credit Card Outstanding Review',
 'Home Loan Co-applicant Benefits','Balance Transfer Savings Checklist','Festival Financial Planning',
 'National Day Financial Awareness','Birthday Financial Wellness Wish','Anniversary Family Protection Wish',
 'Women Entrepreneur Funding','Doctor Practice Expansion','MSME Working Capital','NRI Home Loan Readiness',
 'Self-employed Document Checklist','Improve Loan File Readiness','Avoid Multiple Loan Applications',
 'FOIR Awareness','CIBIL Report Basics','Employer Category Check','Property Document Readiness',
 'Home Loan EC Checklist','Loan Against Property Documents','Education Loan Co-applicant Guide',
 'Vehicle Loan Down-payment Planning','Business Vintage Readiness','Referral Thank You'
 ])];
})();
