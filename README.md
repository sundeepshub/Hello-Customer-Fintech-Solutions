# Hello Customer Fintech Solutions — Revision 4

## Website files
- `index.html` — main landing page, dynamic enquiry form, services, referral flow
- `offers.html` — separate Latest Offers library with loan-type sections and image-size placeholders
- `style.css` — responsive professional theme and Revision 4 UI
- `script.js` — dynamic form logic, validation, CIBIL issues, EMI manager, review/edit, referral UX
- `privacy.html` / `terms.html` — legal pages
- `google-apps-script.gs` — Google Sheets backend

## Revision 4 highlights
1. Salaried applicants do not see or submit the Current Account question.
2. Salaried applicants are not shown business-only proof choices such as GST returns, business registration or audited financials.
3. Supporting proof year/month is shown only when relevant.
4. Existing EMIs support selected count and `+ Add another EMI`, with a maximum of 50 entries.
5. Client-side validation includes datatype, required fields, ranges and boundary checks; server-side validation is also included.
6. CIBIL section appears before address/meeting. Selecting issue count creates Issue 1..Issue N with loan account type, explanation, current overdue, score, issue type and since-year/month.
7. Preferred meeting time appears only for Saturday/Sunday. Weekday meeting time is arranged by mutual understanding. Phone and WhatsApp remain available.
8. Final Review has section-level Edit controls.
9. Submission errors are clearer and no longer claim that the enquiry was received when it was not.
10. Latest Offers is a separate page with loan-specific sections and creative-size guidance.
11. Testimonials are explicitly treated as illustrative customer scenarios until genuine, permission-based reviews are supplied.
12. Business documentation/registration and CIBIL support are highlighted on the main page.
13. Referral form captures referred person, referrer, service category, requirement and private-finance collateral/non-collateral preference. Referral submissions do not send SMS/email; the screen shows a thank-you message.
14. Professional, restrained animation is used only for important CTAs.

## Apps Script deployment
1. Create/open the Google Sheet.
2. Extensions → Apps Script.
3. Paste `google-apps-script.gs`.
4. If bound to the Sheet, leave `SPREADSHEET_ID` blank.
5. Run `setup()` once.
6. Deploy → New deployment → Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Put the Web App `/exec` URL into `script.js` as `APPS_SCRIPT_URL`.
10. Redeploy after backend code changes.

The backend creates:
- Loan Leads
- All Form Data
- EMI Details
- Referrals

## Important
The internal lead priority/score is for internal workflow only. It is not a CIBIL score, credit score, sanction decision or approval guarantee.

Never collect or request OTPs, passwords, card PINs or net-banking credentials.


## Revision 6 updates
- CIBIL issue count now generates a dedicated concern field and explanation for every affected account.
- Mobile and alternative mobile inputs are digits-only with shared phone validation.
- Project Funds hides Loan requirement focus and shows project-type-specific banker-style questions.
- Hospital, real-estate, building-construction, warehouse/godown and Other project sections have tailored questions.
- Project photo upload slots change by project type (optional, max 2 MB each, JPG/PNG/WEBP). Uploaded images are saved to the Apps Script Google Drive folder `HelloCustomer Project Photos`.
- Separate loan pages are included for all 9 loan types, with a Loans dropdown menu.
- Referrals redirect to `referral-thankyou.html` after successful submission; the referrer email acknowledgement remains supported.
- After changing Apps Script code, run `setup()` and redeploy the Web App.

Revision 7 additions: dedicated home.html and referral.html pages; dynamic CIBIL issue add/remove; Project Funds loan-focus hiding; phone/pincode input sanitisation; 30+ real-world stories.


## Revision 9 — Product-specific lender directory
The project now includes `lenders.js`, a central lender master database. The enquiry form dynamically filters preferred lender categories and institutions by selected loan type. Individual loan pages also display their relevant lender categories. Banks, HFCs, NBFC/finance companies, RRBs and co-operative categories are kept separate.

The lender directory is intended for enquiry guidance, not a guarantee of product availability or approval. Product availability, regulatory status, lender names and policies can change. Verify current details before publishing specific offers. The Home Loan/HFC directory was cross-checked against National Housing Bank's 2026 HFC information.


# Revision 10 — End-to-End Role-Based Platform

## Customer flow
Home → loan information → rates/eligibility → enquiry → Google Sheets lead → separate `thank-you.html`.

## Revision 10 additions
- Separate thank-you page and redirect after successful loan enquiry.
- Expanded Business Loan, Project Funds and Balance Transfer/Consolidation purposes.
- Loan hook/education/media blocks on every loan page. Upload media into `assets/loans/` and `assets/videos/` using the filenames in `data/loan-data.js`.
- `loan-rates.html` + `data/rate-data.js` for source-verified ROI, fees, tenure, eligibility and conditions. No fabricated/current rates are hard-coded.
- `government-schemes.html` + `data/scheme-data.js`; scheme records must be re-verified before publishing.
- Education Loan: country dropdown, country-dependent course/institution selector with Other text entry, qualification, cost breakdown, family/co-borrower profile, guardian occupation logic, monthly-family-income logic for Students, and expanded student/guardian document checklist.
- Executive signup/login architecture for Telecallers (max 100) and Connectors (max 200), profile photo, password rules, individual dashboard, My Leads and profile pages.
- Firestore security rules enforce own-lead access; authentication/passwords are not stored in Google Sheets.
- Apps Script helper can create one separate Google reporting spreadsheet for each approved executive.

## Executive authentication setup (required before login works)
1. Create a Firebase project.
2. Enable Email/Password Authentication, Firestore and Storage.
3. Paste the Firebase Web App config into `firebase-config.js`.
4. Deploy `firestore.rules` in Firebase Console/CLI.
5. Create the first admin user securely in Firebase, then create `/users/{uid}` with `role: admin`, `status: active`.
6. New Telecaller/Connector signups are created with `status: pending`; activate only after review.
7. Set Firebase Storage rules so each authenticated user can write only under `profiles/{uid}/...` and approved readers can view required profile images.

## Important security notes
GitHub Pages is a static frontend. Do not place API secrets, admin credentials or passwords in HTML/JS. Firebase Web config is public by design; authorization must be enforced by Firestore/Storage rules. For production, implement admin-controlled custom claims or a trusted backend/Cloud Function for stronger role administration and server-side capacity enforcement.

## Executive reporting Sheets
Passwords are never copied to Sheets. After an executive is approved, administrators may use `createExecutiveReportingSpreadsheet()` or `provisionExecutiveReportingSheetsFromUsers()` in Apps Script to create a separate reporting workbook for that executive.
