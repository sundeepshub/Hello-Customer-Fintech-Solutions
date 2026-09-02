# Revision 10 — Completion Changelog

## Customer-side
- Separate thank-you page retained and verified.
- Education Loan student flow retained and expanded.
- Loan media/hook architecture retained.
- Loan Rates page now supports source links and includes initial source-verified records.
- Government Schemes catalog expanded and PM-Vidyalaxmi / PMAY-U 2.0 / PMFME information refreshed.

## Authentication / role security
- Replaced client-only capacity enforcement with Cloud Functions.
- Added trusted username reservation and lookup.
- Added backend limits: 100 Telecallers and 200 Connectors.
- Added secure Admin approval and activation/deactivation functions.
- Added automatic Executive IDs TC001..TC100 and CN001..CN200.
- Added Firestore and Storage rules.

## Executive CRM
- Added `crm.js`.
- Added `new-lead.html`.
- Added `lead-details.html`.
- Upgraded `executive-dashboard.html` with stage/status metrics and follow-ups.
- Upgraded `my-leads.html` with search/filter/open-lead flow.
- Upgraded `executive-profile.html` with profile edit and photo replacement.
- Added activity timeline and lead update workflow.
- Lead access includes both created-by and assigned-to ownership.

## Admin
- Upgraded `admin-dashboard.html` to approve pending executives, activate/deactivate accounts and assign unassigned public leads.

## Public enquiry → CRM bridge
- Added Firebase `ingestPublicLead` Cloud Function.
- Added optional Apps Script mirror call secured by a secret stored in Apps Script Script Properties.

## Google Sheets
- `setup()` now creates `Executive Users`.
- Separate executive-reporting workbook helper retained.

## Deployment files
- Added `firebase.json`.
- Added `storage.rules`.
- Added `functions/package.json`.
- Added `functions/index.js`.

## Validation performed
- External JavaScript syntax checked with Node.
- Inline page scripts syntax checked with Node.
- HTML files parsed successfully.

## Firebase project configuration — 2026-09-02
- Connected the client configuration to Firebase project `hcfintechsolutions`.
- Added `.firebaserc` so Firebase CLI defaults to `hcfintechsolutions`.
- Added `scripts/bootstrap-admin.js` for creating the first administrator securely from a trusted local environment.
- No service-account private key, admin password, ingest secret, or other server secret is stored in the project files.
