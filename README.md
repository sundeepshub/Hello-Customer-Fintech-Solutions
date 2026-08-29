# Hello Customer Fintech Solutions — Professional Loan Landing Page

**Group:** Sundeep's Hub  
**Loans business:** Hello Customer Fintech Solutions  
**Business email:** hellocustomerfirst@gmail.com

## GitHub Pages structure
Upload these files directly into the root of your `main` branch:

- `index.html`
- `style.css`
- `script.js`
- `privacy.html`
- `terms.html`

`google-apps-script.gs` is backend code and should be pasted into Google Apps Script, not served as the website.

GitHub Pages setting:
**Settings → Pages → Deploy from a branch → `main` → `/(root)`**

## Google Sheets backend
1. Create a Google Sheet.
2. Extensions → Apps Script.
3. Paste `google-apps-script.gs`.
4. If the script is bound to the Sheet, leave `SPREADSHEET_ID` blank. Otherwise enter the spreadsheet ID.
5. Run `setup()` once and approve permissions.
6. Deploy → New deployment → Web app.
7. Execute as: **Me**.
8. Who has access: **Anyone**.
9. Copy the Web App URL.
10. Open `script.js` and replace:

`const APPS_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';`

with your Web App URL.

## Sheets created
- **Loan Leads:** summary of each lead and internal workflow priority/score.
- **All Form Data:** every submitted field as Lead ID / Field / Value, so dynamic fields are not lost.
- **EMI Details:** one row per existing EMI.

## Customer email
After a successful submission, the customer receives a thank-you email at the email they entered. It asks them to send required documents to:

**hellocustomerfirst@gmail.com**

The internal business email also receives a detailed notification.

## WhatsApp
The website provides a customer-side WhatsApp button after submission. It opens WhatsApp with a prefilled enquiry message.

For automatic business-side WhatsApp notifications, configure the WhatsApp Cloud API values inside `CONFIG.WHATSAPP` in Apps Script. Never put an access token in `script.js` or GitHub.

## Pincode lookup
The website uses the India Post Pincode API endpoint to retrieve postal metadata from a 6-digit Indian pincode. It can fill post office, city/block, district and state. Street/house details must still be entered by the customer.

## Customer-facing priority
Internal lead priority is deliberately hidden from the customer. It is not a CIBIL score, credit score or approval decision.

## Photo placeholders
The page includes named placeholders:
- `IMG-01` — Sandeep / welcome photo
- `IMG-02` — Sandeep at desk / customer discussion
- `IMG-03` — Customer consultation
- `IMG-04` — Documentation / paperwork
- `IMG-05` — Business / professional meeting

Replace each placeholder with the corresponding approved photo while keeping the same ID/name for easy mapping.

## Testimonials
The page contains 30+ clearly labelled **illustrative website testimonial drafts** across personal loan, home loan, education loan, business loan, CIBIL and consolidation. Before publishing them as real customer testimonials, replace them with genuine reviews and appropriate customer permission.

## Important compliance note
The website is an enquiry/assistance interface. It must not represent the internal workflow score as a CIBIL/credit score or guarantee approval. Final eligibility, rates, fees, documentation and approval are decided by the respective lender.
