# Hello Customer Fintech Solutions — Revision 13

Revision 13 is a Salesforce-inspired CRM upgrade built on Firebase Authentication + Google Apps Script + Google Sheets.

## Implemented

1. Login backend/deployment errors are converted to a customer-safe message: “Please check with support for login issue.”
2. Removed the unnecessary executive-login explanatory sentence.
3. Admin and Executive/Connector sign-in buttons show progress/loading states.
4. “Save User Permissions” confirms that changes were saved and backend updated.
5. “Save Role Settings” confirms that changes were saved and backend updated.
6. Logout is available across Admin, Executive and Connector portal navigation.
7. Non-admin lead APIs return only leads created by or assigned to the signed-in user. Assigned Queue is stricter and contains only assigned leads.
8. Admin retains all-lead visibility.
9. Removed “Google Sheet live data” label from Loan Rates.
10. Removed “RSS” label from Banking Updates.
11–13. Added mandatory Guest Access for Loan Rates/Schemes, validated Full Name/Mobile/Email/Pincode/Loan Type/Urgency, Google Sheet storage, CRM lead creation and guest email acknowledgement.
14–16. Expanded Add Lead with profile-dependent fields, EMI capture, CIBIL/credit concerns, and separate follow-up date + Morning/Afternoon/Evening preference.
17. Primary save/login/publish/import/move/assign actions show loading states.
18. Added 3 portal themes: Navy & Gold, Slate & Teal, Indigo & Pearl.
19. Assigned Lead Queue now means Admin-assigned records only.
20. Admin can move batches of leads from one executive to another.
21. Loan Rates and Banking News load separately so lender rates can appear without waiting for RSS/news retrieval.
22–23. Added Social Publisher with Admin feature enable/disable, EID/CID/AID tracking links, source capture and CRM lead attribution.
24. Removed “Illustrative customer situation”; replaced supporting copy with a short common-scenario explanation.
25. Added SECURITY.md. Client-side source cannot be made impossible to inspect; security is enforced by backend authorization and keeping secrets server-side.
26. Shared navigation ensures a visible Login option on public pages.
27–28. Admin/Executive dashboards follow Salesforce-style patterns: metrics, pipeline/status views, assigned queues, ownership, permissions and marketing tools.
29. Added Application Ad Manager with templates, placements, media URL, image-size choice, text effects, CTA and enable/disable.
30. Added multi-platform Social Publisher and secure Admin Social API configuration. Facebook/Instagram connectors can publish once correctly authorised; YouTube/ShareChat are not falsely reported as configured without their required OAuth/partner access.
31. Added Admin-only Marketing Research Lab. It scans user-supplied public webpages for publicly displayed business phone/email/contact/social information and source context. It intentionally does not infer private personal behaviour, sensitive traits or hidden identity.

## New Google Sheet tabs created by setup()

- Guest Access
- Site Ads
- Social Posts

Existing:
- CRM Leads
- Executive Users
- Lead Activities
- Admin Settings
- User Permissions
- Bulk Lead Upload
- Loan Rates

## Deploy

1. Replace Apps Script Code.gs with `google-apps-script.gs`.
2. Run `setup()`.
3. Redeploy the Web App as a new version:
   - Execute as: Me
   - Who has access: Anyone
4. Use the deployment `/exec` URL in portal-config.js.
5. Upload the Revision 13 web files to GitHub Pages.

## Important
Social provider credentials belong only in Apps Script Script Properties through `social-config.html`, never GitHub or Google Sheets.
