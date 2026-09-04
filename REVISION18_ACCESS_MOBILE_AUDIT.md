# Revision 18 — Protected Resources, Guest Visual, Navigation and Mobile

Implemented requirements 53–59.

- Loan Rates and Schemes are no longer shown in public navigation.
- Direct access to Loan Rates / Schemes requires a logged-in account.
- Admin always has access; Executive/Connector visibility and access require Admin-enabled per-user permissions.
- Removed the customer-facing phrase “Access not enabled”; denied resource access returns to the dashboard.
- Guest Access now includes a bundled professional image and still supports tracked-user custom branding overrides.
- Public navigation is rebuilt consistently on every public page: Home, Loans, Latest Offers, How We Help, CIBIL & Credit, Stories, FAQ, Refer Someone, Start Enquiry and Login/Logout.
- Login and Start Enquiry buttons use consistent classes, size and behavior.
- Mobile navigation now uses one menu button and reliable dropdown behavior; responsive form/cards/tables were tightened for small screens.
- Added an optional FastAPI Python backend scaffold. GitHub Pages cannot run Python directly, so it is intentionally not active until separately hosted.

- Tracked Guest links no longer use Loan Rates or Schemes as destinations; they use enquiry/offers/help destinations instead.
- Resource login preserves a safe return path, and the destination page re-checks the role/user permission after authentication.
