# Revision 16 — Access, Lead Views & Profile Controls

Implemented requirements 46–49.

- Internal portal pages require an active authenticated session. Direct/copied internal links redirect to login.
- Role, page policy and per-user feature access are enforced by the shared authentication guard.
- Admin keeps full access.
- Loan Rates and Schemes keep the mandatory Guest-login flow for tracked marketing links.
- Admin My Leads now has My Leads / All Leads / Assigned Leads / Unassigned Leads views.
- Pipeline drill-down links open the All Leads monitoring scope.
- Executive Users now supports Nominee Name, Relationship, Mobile and Email.
- Nominee fields are optional by default and can be shown/hidden or made mandatory per Executive/Telecaller role and Connector role from Admin Settings.
- Backend validates nominee fields according to the Admin setting.

Run `setup()` after deploying the updated Apps Script to add the new columns/settings without disturbing existing records.
