# Hello Customer Fintech Solutions — Revision 11

## Architecture

Revision 11 removes the Firestore/Cloud Functions dependency from the CRM.

- **Firebase Authentication**: email/password credentials only.
- **Google Apps Script**: trusted portal API, role checks, Firebase ID-token verification, signup profile registration, admin operations, CRM access enforcement, ROI/news API and emails.
- **Google Sheets**: Executive Users, CRM Leads, Lead Activities, Admin Settings, Loan Rates, public enquiry sheets and reports.
- **Google Drive**: executive profile photos.
- **GitHub Pages**: front-end hosting.

Passwords are never stored in Google Sheets, Google Drive, GitHub or Apps Script. The `Executive Users` sheet stores only the credential-store label `Firebase Authentication`, the Firebase UID and audit metadata.

## First-time setup

1. In Firebase project `hcfintechsolutions`, enable **Authentication → Sign-in method → Email/Password**.
2. Create the first Admin user in **Authentication → Users** and copy the UID.
3. Open the master Google Sheet → **Extensions → Apps Script**.
4. Replace the Apps Script code with the root `google-apps-script.gs`.
5. Run `setup()` once and approve permissions. It creates/updates:
   - Loan Leads
   - All Form Data
   - EMI Details
   - Referrals
   - CIBIL Enquiries
   - Executive Users
   - CRM Leads
   - Lead Activities
   - Admin Settings
   - Loan Rates
6. In Apps Script, run this once with your real values:
   `setupAdminUser('yourAdminUsername','your-admin-email@example.com','Administrator Name','FIREBASE_AUTH_UID')`
7. Deploy Apps Script as **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Update the existing deployment so its URL stays the same.
8. Open `admin-login.html` and log in using the Admin username from step 6 and the password you created in Firebase Authentication.

## Executive signup

Telecaller/Connector signup:
1. Front end validates role, email, 10-digit mobile, username and strong password.
2. Firebase Authentication creates the credential.
3. Front end obtains a Firebase ID token.
4. Apps Script verifies the token with Firebase Identity Toolkit.
5. Apps Script writes the profile to `Executive Users` with status `pending`.
6. Optional profile photo is stored in Google Drive.
7. Apps Script sends a signup-received email.
8. Admin approves the user from Admin Dashboard.
9. Approval assigns `TC001...TC100` or `CN001...CN200` and creates a separate reporting Google Spreadsheet.
10. Activation email is sent.

## Password standard

12–64 characters with at least one uppercase letter, one lowercase letter, one number and one special character. Password change requires the current password and Firebase reauthentication. The new password must differ from the old password. Only the password-change timestamp is saved in Sheets.

## Access control

Every protected Apps Script action verifies the Firebase ID token and then checks `Executive Users`.

- Admin: all CRM leads and administration.
- Telecaller/Connector: only leads they created or that are assigned to their Firebase UID.
- Loan Rates: authenticated and role-visible only.
- Schemes: visibility controlled from `Admin Settings`.

Public website enquiries are mirrored into `CRM Leads` as unassigned leads and can be assigned from the Admin Dashboard.

## Profile photos

Profile images are stored in the Google Drive folder:
`HelloCustomer Executive Profile Photos`

The Executive Users sheet stores the Drive file ID and display URL.

## Loan rates & news

`Loan Rates` sheet headers:
`bank_id, bank_name, loan_type, roi_min, roi_max, benchmark, processing_fee, tenure_max_years`

The protected `ratesNews` action returns ROI data plus RSS headlines to authorised users.

## Important

Do not publish passwords, OTPs, Firebase service-account keys or private tokens in GitHub or Sheets.


## Revision 12
See `REVISION12_CRM_AUDIT.md` for signup success codes, Google Sheet bulk lead queue, per-user masking/permissions, expanded admin dashboard, professional portal UI, and the expanded lender-rate dataset.


## Revision 13
See `REVISION13_CRM_AUDIT.md`, `SECURITY.md`, and `SOCIAL_PUBLISHING.md`. This revision adds guest access, faster split Loan Rates/News loading, Salesforce-style CRM ownership/queues, lead reassignment, field masking, 3 professional themes, Social Publisher, application Ad Manager, and an Admin-only public webpage Marketing Research Lab.
