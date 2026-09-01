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
