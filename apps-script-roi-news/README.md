# Live Bank ROI + Banking News Integration

This package is integrated into the Hello Customer portal and is also provided as a standalone Google Apps Script widget.

## Required Google Sheet tab
Create or use a tab named exactly `Loan Rates`.

Required headers, in any order but with these exact names:

`bank_id, bank_name, loan_type, roi_min, roi_max, benchmark, processing_fee, tenure_max_years`

Recommended `loan_type` values used by the UI:
- `home_loan`
- `personal_loan`
- `car_loan`
- `loan_against_property`

The included `loan-rates-template.csv` contains the supplied SBI, HDFC Bank, ICICI Bank and Axis Bank rows. These figures are treated as indicative source data and should be periodically checked against current official lender schedules.

## Google Apps Script deployment
1. Open the Google Sheet that receives the portal data.
2. Open **Extensions → Apps Script**.
3. If you are updating the existing Hello Customer Apps Script, use the root `google-apps-script.gs` from this project. It preserves lead/referral/CIBIL handling and adds the ROI + RSS GET API.
4. If you want only the standalone ROI/news API, use `apps-script-roi-news/Code.gs`.
5. Save the project.
6. Run `setup()` for the integrated backend, or `setupLoanRates()` for the standalone backend. Approve the requested Spreadsheet and external-request permissions.
7. Confirm the `Loan Rates` tab exists and contains the required headers/data.
8. Choose **Deploy → Manage deployments**. Edit the existing Web App deployment (recommended so the existing portal URL remains unchanged) or create a new Web App deployment.
9. Use **Execute as: Me** and **Who has access: Anyone** for the public JSON endpoint used by the browser widget.
10. Deploy the new version. The existing portal is already wired to the current Web App URL. If you deliberately create a different deployment URL, update `ROI_NEWS_API` in `loan-rates.html` and `API_URL` in `apps-script-roi-news/index.html`.

## JSON response
A successful GET returns:

```json
{
  "status": "success",
  "last_updated": "2026-09-02T22:30:00+05:30",
  "disclaimer": "...",
  "rates": [],
  "news": []
}
```

Each news object contains only `title`, `link`, `pubDate`, and `source`. Article bodies are not copied into the portal.

## RSS sources
The code uses official/public feeds:
- Reserve Bank of India — Press Releases: `https://rbi.org.in/pressreleases_rss.xml`
- Reserve Bank of India — Notifications: `https://rbi.org.in/notifications_rss.xml`
- Press Information Bureau, Government of India: `https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1`

PIB items are filtered server-side to banking/finance-related titles. RSS results are cached for 10 minutes to reduce latency and repeated fetches.

## Security / compliance behavior
- Loan Rates remain behind the existing Firebase role/feature gate in `loan-rates.html`.
- Only headline metadata and original-source links are displayed for news.
- The UI opens original articles in a new tab with source attribution.
- Rates are explicitly marked indicative and subject to current lender underwriting, documentation, credit/CIBIL profile and secured-loan conditions where applicable.
