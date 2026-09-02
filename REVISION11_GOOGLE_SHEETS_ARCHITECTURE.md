# Revision 11 Acceptance Notes

Implemented:
- Firestore removed from active CRM/auth flow.
- Firebase Authentication retained for passwords.
- Apps Script verifies Firebase ID tokens server-side.
- Google Sheets is the source of truth for users, role/status, CRM leads, activities, feature settings and loan rates.
- Google Drive stores profile photos.
- Admin can approve/deactivate users, assign leads and set visibility.
- Telecallers limited to 100; Connectors limited to 200.
- Executive lead isolation is enforced in Apps Script by Firebase UID.
- Separate reporting spreadsheet is created on approval and synchronised for created/assigned leads.
- Signup and activation emails are sent by Apps Script.
- Passwords are intentionally not stored in Sheets.
- Public website leads are added to CRM Leads without Firestore.
- Loan Rates endpoint is protected; static fallback rate data is no longer loaded by the protected page.

Admin bootstrap:
Run `setupAdminUser(username,email,fullName,firebaseUid)` once after creating the Admin credential in Firebase Authentication.
