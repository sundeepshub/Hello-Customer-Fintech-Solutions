# HelloCustomer Revision 10.1 — Additional Requirements Audit

Updated: 02-Sep-2026

## Completed
1. Top navigation groups Latest Offers, Loan Rates, Schemes, How We Help and Stories under **Explore** on the main/public navigation variants.
2. Government Schemes page now has categories, search, scheme cards, eligibility, benefits/subsidy summary, Do's/Don'ts, Know More and official-source links. Includes a MyScheme discovery entry because no static catalogue can safely claim to contain every changing Central/State/local scheme.
3. Loan Rates page now requires authenticated Telecaller/Connector/Admin access, respects Admin visibility, supports Loan Type + Lender selection, and displays a selected-lender summary with an indicative verified range or a clear 'not verified' note.
4. Removed the implementation/capacity/password-storage notice from Executive Signup UI.
5. Expanded Admin Dashboard and added `admin-settings.html` describing production prerequisites, user/lead/rate/scheme/security/reporting responsibilities and profile-photo storage.
6. Added `login.html` role-choice page and separate `admin-login.html`; Executive/Employee login remains separate.
7. Signup now requests a Firebase email-verification message after successful account creation and shows clearer Cloud Functions deployment errors instead of a raw 'Internal' message.
8. Password standards are enforced in Signup and Change Password: 12–64 chars, uppercase, lowercase, number, special character; current-password reauthentication; new password must differ; password-last-changed timestamp is written to the user's Firestore profile.
9. Profile pictures are stored in Firebase Storage at `profiles/{uid}/...` under Storage security rules. They are intentionally not stored in the public GitHub repository.
10. Password/Confirm Password UI now has Show/Hide buttons, rule checklist and match feedback.
11. Loan Rates are gated to Telecaller/Connector/Admin. Public access is denied.
12. Admin visibility settings are stored in `settings/features`: Loan Rates for Telecaller/Connector and Schemes for Public/Telecaller/Connector; Admin remains enabled.
13. Executive metadata can be represented in Google Sheets, but **plaintext/recoverable passwords are intentionally not stored in Google Sheets**. Firebase Authentication remains the credential store. This is a security correction to the requested design.
14. Primary and Alternative mobile numbers are limited to exactly 10 Indian mobile digits (starting 6–9) in the public enquiry UI and validation.
15. Primary and Alternative mobile numbers must be different in browser and Apps Script validation.
16. `Loan requirement focus` renamed to `Reason for Loan`.
17. If Reason for Loan is `General Loan Requirement` or `Other`, `Purpose / requirement` becomes mandatory.
18. Education Loan Study Country uses the comprehensive country list already maintained in `data/education-data.js`.
19. Course lists remain country-aware, include `Other`, and show a mandatory Other Course field when selected.
20. Email, PIN code, address and mobile validation were tightened in the enquiry flow; Apps Script retains server-side validation.
21. Selected checkboxes/radio controls now receive a visible selected-state colour.
22. Preferred meeting date is restricted to today or future dates in the UI and validated again in JavaScript.
23. When `Edit this section` is used on the Review step, the section retains Continue and now also receives a `Review Enquiry →` action to return directly to the review after validating the edit.

## Existing requirements retained
- Separate customer Thank You page after successful submission.
- Expanded Project Funds, Business Loan and Balance Transfer / Consolidation options.
- Loan-type hooks/content and image/video provisioning.
- Telecaller/Connector signup/login/dashboard/own-lead isolation and role-based CRM architecture.
- 100 Telecaller / 200 Connector backend capacity logic.
- Individual executive reporting spreadsheet provisioning helper in Google Apps Script.
- Student-specific Education Loan country/course/institution/qualification/family/guardian/document flow.
- Firestore and Storage access-control rules.

## Deployment-sensitive item
If signup still returns a service error, deploy the Cloud Functions in `/functions` and confirm Firebase Authentication + Firestore are enabled for project `hcfintechsolutions`. Static GitHub Pages cannot execute the trusted `registerExecutive` backend by itself.
