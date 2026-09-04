# Hello Customer Fintech Solutions — Revision 12

## What changed

Revision 12 keeps Firebase Authentication for passwords and Google Apps Script + Google Sheets as the CRM/database.

### Signup
- Telecaller and Connector signup now allocates an Executive Code immediately (TC### / CN###).
- Successful signup redirects to `signup-success.html`.
- The success page displays the Executive Code, role, username and pending-admin-approval status.
- Passwords remain only in Firebase Authentication.

### Navigation and feature control
- Added `nav-shared.js` to keep public-site options reachable across pages.
- Internal portal navigation includes Dashboard, Lead Queue, My Leads, Add Lead, Loan Rates, Schemes and Profile as applicable.
- Admin can enable/disable key features by role.
- Admin can override permissions per individual executive/connector.

### CRM / Lead Queue
- CRM Leads now supports: Name, Phone, Email, Address, Salary, Designation, Pincode, Loan Type, Loan Amount, Status, Comments and tracking fields.
- Added `lead-queue.html`.
- Executive/Connector can update Status, Stage, Comments and click **Save & Next** to move to the next lead.
- Updates are written back to the master Google Sheet.
- Admin sees all CRM leads.

### Bulk Google Sheet intake
- `setup()` creates a `Bulk Lead Upload` sheet.
- Admin can paste/import rows using:
  Name, Phone Number, Email, Address, Salary, Designation, Pincode, Loan Type, Loan Amount, Status, Comments, Assigned Executive ID.
- Admin Dashboard can import pending rows into CRM.
- Admin can bulk-assign the next N unassigned leads to an active executive.

### Mask / unmask
- `setup()` creates a `User Permissions` sheet.
- Admin can control per executive:
  Mobile, Email, Address, Salary, Designation, Pincode, Loan Amount,
  Loan Rates, Schemes, Add Lead, Lead Queue and Export.
- Sensitive fields are masked server-side before being returned to a non-admin user.

### Admin dashboard
- Expanded metrics and lead tracking.
- User approval / activation / deactivation.
- Per-user permission configuration.
- Role-level feature configuration.
- Bulk lead import and bulk assignment.
- Executive performance/status tracking.

### Loan rates
- Expanded reference dataset from 16 rows to 138 lender/loan-type records.
- Added Home Loan, Personal Loan, Business Loan, Vehicle Loan, Education Loan,
  Loan Against Property, Home Loan BT + Top-up, Balance Transfer / Consolidation and Project Funds references.
- Added Source, Source Updated and Notes columns.
- Added stronger customer-facing disclaimer:
  rates are approximate references only and final pricing/approval belongs to the lender.
- Existing Google Sheets are NOT overwritten automatically. After updating Apps Script, run:
  `REFRESH_LOAN_RATES_2026()`

## Fix for "Invalid backend response"

That message means the website received HTML/non-JSON from the Apps Script URL. Most commonly:
1. the deployment is still an older version of the code;
2. Web App access is not `Anyone`; or
3. the website still points to an older `/exec` URL.

After replacing Code.gs:
1. Save.
2. Run `setup()`.
3. Run `REFRESH_LOAN_RATES_2026()`.
4. Deploy > Manage deployments > Edit.
5. Select **New version**.
6. Deployment type: Web app.
7. Execute as: **Me**.
8. Who has access: **Anyone**.
9. Deploy.
10. Use the resulting `/exec` URL in `portal-config.js`, `script.js`, `cibil.js`, `loan-rates.html` and the standalone ROI page.

Current configured Web App URL:
https://script.google.com/macros/s/AKfycbzBDOlSwHcrwKpPQuzez_Dw_QkWzOkn1c21_GTpPzr2BuXI-0dWWg_qBjMIuR8DEY5cdw/exec

## First admin
Username: `sandeepadmin`
Firebase email: `evergreenservices9@gmail.com`
Firebase UID: `Hb1oeFZQGJUNAcIxi2JtOxjEano2`

The password is never included in the project.
