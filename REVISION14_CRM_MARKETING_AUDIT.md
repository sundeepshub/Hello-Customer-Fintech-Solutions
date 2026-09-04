# Hello Customer Fintech Solutions — Revision 14

Revision 14 builds on Revision 13 and keeps the architecture: Firebase Authentication for passwords, Google Apps Script as the API/security layer, Google Sheets as the CRM data store, and Google Drive for controlled marketing media.

## UX and navigation
- Duplicate Explore menus are prevented and a defensive duplicate cleanup runs before the page is shown.
- Every HTML page includes a loading overlay; internal navigation shows an "Opening page" loader.
- Portal pages show Logout rather than Login. Public pages also show Logout when the same browser session is already logged into the portal.
- Logout now clears portal/guest state and signs out through Firebase before returning to Login.
- Three portal themes are functional and persist per browser: Navy & Gold, Slate & Teal, and Indigo & Pearl.
- Context tooltips are added to key CRM, permissions, campaigns, media, source, social and session controls.
- Admin-configurable idle timeout defaults to 5 minutes.

## Guest / tracked campaign access
- A tracking-link visitor sees the Guest Access experience without normal navigation choices.
- Required fields: Full Name, Mobile, Email, Pincode, Loan Type, requirement timeline, CIBIL/Credit issue, and consent.
- CIBIL details become mandatory for Yes / Not sure.
- Guest submissions are validated in browser and again in Apps Script.
- Guest data is written to Guest Access and CRM Leads, an acknowledgement email is attempted, campaign lead count is incremented, and referral-based ownership is applied.
- Executive/Connector/Admin tracking IDs remain EID/CID/AID based.
- Executives and Connectors can select an authorised shared image or upload their own Guest-page image.

## Leads and CRM
- My Leads includes a Sourced from column (Source + Source Ref).
- Non-admin users can retrieve only records created by them or assigned to them; Assigned Queue returns only assigned records.
- Admin can see all CRM leads.
- Lead detail editing supports Stage, Status, Follow-up Date, Morning/Afternoon/Evening, Comments, Notes and activity timeline.
- Admin pipeline counts are clickable and open the corresponding filtered lead records.
- Move / Reassign includes all supported executive-role records. Reassignment removes the lead from the old reporting workbook and synchronises it to the new owner's reporting workbook.
- Individual assignment also resynchronises reporting ownership.

## Access control
- Role Feature Access remains available for Telecaller/Connector defaults.
- Individual user permissions remain available.
- Access Control Centre supports user, role, page, option, form, data and column policies.
- Core lead fields (Mobile, Email, Address, Salary, Designation, Pincode, Loan Amount) are masked server-side when denied.
- Page/option/form/data policies are also applied to portal UI visibility.

## Marketing AI
- AI Marketing Studio supports social post copy, headlines, CTA text and marketing prompts.
- A built-in local marketing rules engine works without an external AI key.
- Admin can optionally configure Gemini for richer generation; the application falls back to the local engine if unavailable.
- Social Publisher and Ad Manager include Auto Suggest workflows.

## Campaigns and Social Publisher
- Expanded marketing template library covers major loan, CIBIL, documentation, EMI, professional, MSME, NRI, working-capital, property, callback and rate-awareness situations.
- Campaign Manager tracks campaign source, owner and resulting Guest leads.
- Social Publisher generates tracked Guest links and supports approved Media Library assets.
- Users can connect their own supported social accounts from Social Connections.
- Meta and YouTube OAuth connection flows are implemented at the application level; actual platform publishing is still subject to the platform account type, app permissions/review, OAuth consent and platform API rules.
- Facebook Page publishing and Instagram Professional publishing use the configured/connected Meta account.
- YouTube upload supports a selected Media Library video after YouTube OAuth is configured.
- ShareChat remains an approved-partner endpoint integration because a generic public publishing API cannot be assumed.

## Social Connections
- Admin has application-level configuration and callback guidance.
- Executive/Connector/Admin have their own Connect / Login and Disconnect controls.
- Social Publisher also surfaces direct Connect / Login actions when an account is not yet connected.

## Media Library
- Admin library limits: up to 100 images and 30 active short videos.
- Video duration is validated to under 5 minutes; browser upload is capped at 30 MB for reliable Apps Script transport.
- Admin can edit sharing for every asset: allowed roles, specific UIDs, active state and Guest-page permission.
- Admin can delete media. Executives/Connectors see only assets shared to their role/account or owned by them.

## Advanced Ad Manager
- More templates and loan-business scenarios.
- Target pages, target roles, placement, content type, shared media, image size, text effect, CTA, schedule, priority, frequency cap, dismissible flag, status and enabled flag.
- Auto Suggest and preview.
- Edit, enable/disable, delete and version revert.
- Frontend ad renderer respects page/role targeting, schedule, priority, daily frequency cap and optional close button.

## Security note
Browser-delivered HTML/CSS/JavaScript cannot be made impossible to inspect or copy, especially on GitHub Pages. Revision 14 therefore protects security-sensitive operations at the backend: Firebase Authentication, Apps Script authorization, server-side record ownership checks, server-side field masking, and Script Properties for platform secrets/tokens. Never commit service-account files, passwords, OAuth client secrets or access tokens to GitHub.

## Deployment
1. Replace Apps Script Code.gs with `google-apps-script.gs` from this package.
2. Save and run `setup()` once. Approve required Google permissions.
3. Deploy / Manage deployments / Edit / New version / Web app.
4. Execute as: Me. Who has access: Anyone.
5. The current configured `/exec` URL in this package is:
   `https://script.google.com/macros/s/AKfycbx95Gm18F65uzfSDa5BNceoh9xDi7PeDj0RWgHS1QpY-aq3yHjmw_neF6c8OLk-0Sd9Gw/exec`
6. If Apps Script gives a different `/exec` URL, update `portal-config.js`, `script.js`, `cibil.js`, and `apps-script-roi-news/index.html` before publishing GitHub Pages.
7. Upload the Revision 14 web files to GitHub and wait for GitHub Pages deployment.

## Recommended validation order
Admin Login → Theme switch → Idle timeout → Role/User permissions → Access Control → Executive Login → My Leads → Assigned Queue → Lead update → Admin reassignment → Pipeline links → Guest tracking link → Guest image → Campaign Manager → Media Library sharing → AI Studio → Social Connections → Social Publisher → Ad Manager.
