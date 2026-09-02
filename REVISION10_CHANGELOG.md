# HelloCustomer Revision 10 — Change Log

## Customer-side changes
- Separate `thank-you.html`; successful loan submissions redirect with Lead ID.
- Expanded Business Loan, Project Funds and Balance Transfer / Consolidation choices.
- Added configurable hook, benefits, image and video blocks for every loan page.
- Added `loan-rates.html` for ROI/fees/tenure/eligibility/conditions, backed by `data/rate-data.js`.
- Added `government-schemes.html` for schemes/subsidies, eligibility, Do's/Don'ts and official-source links.

## Education Loan changes
- Study Country is now a dropdown with Other + text entry.
- Course is country-aware and includes Other + text entry.
- University / Institution is country-aware and includes Other + text entry.
- Added admission status, course-cost breakdown, scholarship and own contribution.
- Added qualification details, backlogs and entrance-exam details.
- Student selection changes the income label to Monthly Family Income.
- Added Father/Guardian/co-borrower profile and occupation-specific questions.
- Expanded student/guardian checklist: SSC/10th, Inter/12th, graduation, postgraduate, provisional/degree, entrance/rank, offer/fee structure, Aadhaar, PAN, Voter ID, passport, CIBIL if available, and co-borrower income/business proofs.
- Google Apps Script validation and Loan Leads summary updated for education-specific fields; All Form Data continues to store every submitted field.

## Executive / role-based flow
- `executive-signup.html`
- `executive-login.html`
- `forgot-password.html`
- `executive-dashboard.html`
- `my-leads.html`
- `executive-profile.html`
- `admin-dashboard.html`
- Firebase Authentication/Firestore/Storage integration scaffold.
- Telecaller capacity target: 100; Connector capacity target: 200.
- Password standard: minimum 12 chars, uppercase, lowercase, number, special character.
- Profile photo upload.
- Firestore rules restrict users to their own profile/leads (admin exception).
- Passwords are never stored in Google Sheets.
- Apps Script helper creates a separate reporting spreadsheet for each approved executive.

## Required deployment configuration
The executive login is intentionally disabled until `firebase-config.js` is populated and Firestore/Storage rules are deployed. This avoids shipping credentials or pretending authentication is secure when it is not configured.

`data/rate-data.js` intentionally contains no fabricated/current bank ROI values. Add only verified lender data with an Updated On date and source.
