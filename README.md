# Hello Customer Fintech Solutions — Loans Landing Page

## Branding
- Business: **Hello Customer Fintech Solutions**
- Group: **Sundeep's Hub**
- The page does NOT present Sundeep's Hub as the loan business. It is shown only as the parent/group reference.

## IMPORTANT: GitHub Pages upload
Upload these five website files to the **same directory** in your repository:
- index.html
- style.css
- script.js
- privacy.html
- terms.html

The Google Apps Script file is for Google Sheets setup and does not need to be hosted by GitHub Pages.

The previous "plain HTML" problem happens when `style.css` or `script.js` is missing, renamed, or placed in another folder. This package uses explicit relative paths:
`./style.css`
`./script.js`

## Google Sheets
1. Create a Google Sheet.
2. Extensions → Apps Script.
3. Paste `google-apps-script.gs`.
4. Save.
5. Run `setup()` once and authorize it.
6. Deploy → New deployment → Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Copy the Web App URL.
10. Open `script.js` and replace:
   `const APPS_SCRIPT_URL = "";`
   with your Web App URL.
11. Upload the updated `script.js` to GitHub.

## GitHub Pages
Settings → Pages → Deploy from branch → `main` → `/ (root)` → Save.

## WhatsApp
The page is configured for +91 96183 21100. Change `WHATSAPP_NUMBER` in script.js — it now actually drives every WhatsApp link on the page (footer link + the floating WhatsApp button), so this one edit is all you need.

## Privacy Policy & Terms
`privacy.html` and `terms.html` are **draft placeholders**, linked from the footer and the consent checkbox. They are not finished legal documents — every [bracketed] section needs your specific details (retention period, DSA/lender disclosures if applicable, contact details, etc.) before you advertise this page. Review with a legal/compliance advisor if you use one.

## A note on the submit button's "success" message
The form submits to Apps Script using `mode: "no-cors"` (required because Apps Script Web Apps don't return CORS headers). This means the page cannot actually read whether your Apps Script call succeeded — it will show "Thank you, submitted" as long as the network request didn't outright fail, even if `APPS_SCRIPT_URL` is misconfigured. **After deploying, test with one real submission and confirm the row actually appears in your Google Sheet** — don't rely on the on-page message alone.

## Lead scoring
The score is only an internal lead-priority mechanism:
- High
- Medium
- Standard

It is NOT a credit score, lender score, loan approval, eligibility guarantee, or promise of rate/amount/disbursal.

## Before advertising
Add your final Privacy Policy, Terms, applicable DSA/lender/channel-partner disclosures, and verify all product/lender claims.


## Email + WhatsApp submission flow

When the live form is submitted:
1. The lead is captured in the `Loan Leads` Google Sheet with every form field.
2. An internal notification email is sent to **hellocustomerfirst@gmail.com**.
3. A customer confirmation email is sent to the email address entered in the form.
4. The customer email asks the customer to send the required documents to **hellocustomerfirst@gmail.com** and quote the Lead ID.
5. The thank-you screen contains a **Send Details on WhatsApp** button with the submitted enquiry details prefilled.
6. Optional: Google Apps Script can automatically send the lead details through the Meta WhatsApp Cloud API if the API configuration is enabled.

### Important about WhatsApp
A normal `wa.me` link cannot silently send a WhatsApp message. The customer must press Send. If you want the business to receive the lead automatically without customer action, use the optional WhatsApp Cloud API configuration in `google-apps-script.gs`.

For automatic WhatsApp:
- Create/configure a Meta WhatsApp Business Cloud API setup.
- Put the Phone Number ID, permanent/access token and recipient number in Apps Script.
- Set `CONFIG.WHATSAPP.ENABLED = true`.
- Keep all tokens ONLY in Apps Script; never put them in GitHub `script.js`.

### Required customer email
Email is now a required field because the workflow promises a confirmation email and document-submission instructions.
