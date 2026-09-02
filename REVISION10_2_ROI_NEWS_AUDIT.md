# Revision 10.2 — ROI + Banking News Integration Audit

Implemented:

1. Integrated the supplied lender-rate CSV into the live Google Sheet schema and packaged fallback data.
2. Reworked the Apps Script GET endpoint to return one combined JSON payload: `status`, `last_updated`, `disclaimer`, `rates`, `news`.
3. Preserved the existing POST lead/referral/CIBIL backend in `google-apps-script.gs`.
4. Added a `Loan Rates` sheet setup/seed routine using the supplied 16 lender/product rows.
5. Added server-side RSS parsing with `UrlFetchApp` + `XmlService`.
6. Uses official RBI Press Releases, RBI Notifications and PIB feeds; PIB results are finance-keyword filtered.
7. Added 10-minute Script Cache for RSS results.
8. Updated `loan-rates.html` to load live Sheet data, show ROI range, benchmark, processing fee, max tenure, lender, disclaimer and API timestamp.
9. Added banking/finance news cards with original-source links and attribution.
10. Retained Firebase role/feature access control for Loan Rates.
11. Added graceful API/error handling and static fallback rate data.
12. Added standalone `apps-script-roi-news/Code.gs`, `index.html`, template CSV and deployment README.

Required Sheet headers:
`bank_id,bank_name,loan_type,roi_min,roi_max,benchmark,processing_fee,tenure_max_years`

Rate-data note: the supplied lender-rate file is integrated as provided. The portal labels these figures indicative and instructs staff to verify current official lender schedules before quoting.
