# Hello Customer Fintech Solutions — Revision 10 Complete Build

This package upgrades Revision 9 into a customer website + role-based executive CRM architecture.

## Public customer flow
Home → Loan information → Loan Rates & Eligibility → Government Schemes → Enquiry → Google Sheets → Lead ID → separate Thank You page.

## Executive flow
Signup → pending approval → Admin approval → username/password login → role dashboard → Add Lead / My Leads → Lead Details → stage/status/follow-up/activity → Profile.

Roles:
- Telecaller: maximum 100 accounts
- Connector: maximum 200 accounts
- Admin: full platform administration

Each executive can read only leads created by or assigned to that account. Admin can read/assign all leads.

## Main Revision 10 requirements implemented
- Separate `thank-you.html` after successful enquiry.
- Expanded Project Funds, Business Loan and Balance Transfer / Consolidation options.
- Loan hook/education sections with configurable image/video slots.
- `loan-rates.html` with source, last-updated date, eligibility and lender conditions.
- `government-schemes.html` with eligibility, benefits, Do/Don't and official-source links.
- Education Loan dynamic country → course → institution flow with Other fields.
- Student-specific family income instead of generic individual monthly income.
- Father/Guardian/co-borrower profile and occupation-specific questions.
- Student qualification/admission/cost/document checklist.
- Executive signup/login/reset-password/profile-photo flow.
- Backend-enforced username uniqueness and 100/200 role capacity.
- Admin approval and active/inactive controls.
- Executive ID assignment (`TC001...TC100`, `CN001...CN200`).
- Executive dashboard, My Leads, Add Lead, Lead Details and activity timeline.
- Lead ownership/isolation enforced by Firestore rules.
- Separate Google reporting spreadsheet provisioning helper for each executive.
- Optional Apps Script → Firebase public-lead bridge so public website enquiries can enter the CRM unassigned and be assigned by Admin.

## Security architecture
Passwords are NEVER stored in Google Sheets or GitHub files.

Use:
- Firebase Authentication — passwords/recovery
- Firestore — users, roles, CRM leads, activities
- Firebase Storage — profile photos
- Cloud Functions — secure signup capacity, username lookup, admin approval/status, public-lead ingestion
- Google Apps Script / Sheets — public enquiry capture, operational reporting, emails, optional individual executive reporting workbooks

## Firebase deployment
1. Create a Firebase project.
2. Enable Authentication → Email/Password.
3. Create Firestore database.
4. Enable Firebase Storage.
5. Create a Firebase Web App and copy its public web config into `firebase-config.js`.
6. Install Firebase CLI and log in.
7. From this project folder run:
   - `firebase use --add`
   - `cd functions && npm install && cd ..`
   - `firebase functions:secrets:set INGEST_SECRET`
   - `firebase deploy --only functions,firestore:rules,storage`
8. Copy the deployed HTTPS URL for `ingestPublicLead`.

## Create the first Admin
Create the admin user securely in Firebase Authentication, then create Firestore document:
`users/{ADMIN_UID}`

Recommended fields:
```json
{
  "uid": "ADMIN_UID",
  "username": "admin",
  "email": "your-admin-email",
  "fullName": "Administrator",
  "mobile": "",
  "role": "admin",
  "status": "active",
  "executiveId": "ADMIN"
}
```

The admin logs in through `executive-login.html`. For username login, also create a trusted `usernames/admin` document containing the admin UID and email, or use Firebase Console/Cloud Function tooling to seed it.

## Google Apps Script deployment
1. Open the Google Sheet used for website enquiries.
2. Extensions → Apps Script.
3. Paste `google-apps-script.gs`.
4. Run `setup()` once.
5. Deploy → Web App → Execute as Me → Anyone.
6. Keep the existing `/exec` URL in `script.js` and `cibil.js`.

The backend creates/uses:
- Loan Leads
- All Form Data
- EMI Details
- Referrals
- CIBIL Enquiries
- Executive Users

## Optional public-lead CRM mirror
To make public website enquiries appear automatically in Admin Dashboard:
1. Deploy Firebase Functions.
2. Put the deployed `ingestPublicLead` HTTPS URL in `CONFIG.FIREBASE_INGEST_URL` in `google-apps-script.gs`.
3. In Apps Script → Project Settings → Script Properties, add:
   - Key: `FIREBASE_INGEST_SECRET`
   - Value: the SAME value used by `firebase functions:secrets:set INGEST_SECRET`
4. Redeploy Apps Script.

Public leads then enter Firestore with no executive assignment. Admin assigns them from `admin-dashboard.html`.

## Individual executive Google reporting workbooks
The Apps Script includes:
- `createExecutiveReportingSpreadsheet(executiveId, fullName, role, email)`
- `provisionExecutiveReportingSheetsFromUsers()`

Populate `Executive Users` with active approved users and run the provisioning helper. It creates a separate Google spreadsheet for each executive. Passwords are never copied to these sheets.

## Loan media
Place images under `assets/loans/` and videos under `assets/videos/` according to `data/loan-data.js`.

## Rates
Edit `data/rate-data.js` only with official, source-verified lender information. Every record should include `updatedOn` and `source`.

## Government schemes
Edit `data/scheme-data.js`. Scheme windows/benefits can change, so keep official links and re-verification dates.

## Important limitation
The source code is complete, but a live secure login cannot work until your Firebase project config and deployment are supplied. Do not replace this with hard-coded usernames/passwords in JavaScript or Google Sheets.

## Firebase project now configured
The web client is configured for Firebase project `hcfintechsolutions` in `firebase-config.js` and `.firebaserc`.

### Remaining live deployment actions
These actions require access to the Firebase project/account and therefore must be run by an authorized project owner/operator:

1. Enable **Email/Password** under Firebase Authentication → Sign-in method.
2. Create the Firestore database and Cloud Storage bucket if they are not already created.
3. Install Firebase CLI and authenticate: `firebase login`.
4. From this project directory run: `firebase deploy --only firestore:rules,storage,functions`.
5. Set the public-lead ingest secret when Firebase CLI prompts for `INGEST_SECRET`. Keep that secret server-side only.
6. Create the first Admin using `scripts/bootstrap-admin.js` from a trusted machine with Firebase Admin credentials. Do not put the admin password or service-account JSON in GitHub.
7. Configure the Google Apps Script properties described in the Apps Script section so public website leads can be mirrored into Firestore.
8. Perform the production test: executive signup → admin approval → username login → create/view own lead → lead assignment → profile photo → password reset.

### First admin bootstrap
The repository includes `scripts/bootstrap-admin.js`. Run it only from a trusted admin machine. Example environment variables are documented inside the script. It creates/updates the Authentication user, `users/{uid}` profile, username lookup, and Admin custom claims.


## Revision 10.1 security/configuration notes
- In Firebase Authentication, enable Email/Password and configure the password policy to match the application: minimum 12 characters, require uppercase, lowercase, numeric and non-alphanumeric characters where your Firebase plan/console exposes those controls.
- The application also enforces 12–64 characters in Signup and Change Password UI.
- Do **not** store plaintext or recoverable passwords in Google Sheets, Google Drive or GitHub. Firebase Authentication is the credential store. Sheets may contain username, role, mobile, contact email, status and password-last-changed audit date only.
- Profile photos are stored in Firebase Storage under `profiles/{uid}/...`; this is preferred over a public GitHub assets folder.
- Loan Rates are gated to authenticated Telecaller/Connector/Admin roles and Admin visibility settings. Because this is a static GitHub Pages project, treat the data file as reference content, not a secret.
- After changing `firestore.rules` or `storage.rules`, redeploy them before testing.

## Revision 10.2 — Live ROI + Banking News
The Loan Rates module now reads lender slabs live from the `Loan Rates` Google Sheet through the existing Apps Script Web App. It also shows server-side RSS banking/finance updates from official RBI and PIB feeds. See `apps-script-roi-news/README.md` for the exact sheet headers and deployment steps.
