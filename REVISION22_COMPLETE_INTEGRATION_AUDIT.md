# Hello Customer Fintech Solutions — Revision 22 Complete Integration Audit

Revision 22 completes requirements 92–134 on top of Revision 21.

## Login, UI and navigation
- Admin login wording cleaned so Administrator is not repeated as a duplicate heading.
- Guest wording changed to customer-friendly loan-enquiry language and the unnecessary portal-account statement removed.
- Executive dashboard typography/alignment and responsive portal styling improved.
- Portal theme switcher includes Default, Navy & Gold, Slate & Teal and Indigo & Pearl and persists the selected theme.
- Portal navigation remains permission-aware through Firebase session + Apps Script access context.

## Campaigns, social publishing and HC AI Engine
- Social Publisher now has Campaign & Tracking, displayed short link, copy controls, expanded message categories, expanded CTAs, media categories/sizes, on-page preview and connected-platform controls.
- Short tracking codes are seven characters and resolve through s.html without exposing the long tracking query in the posted link.
- HC AI Engine replaces user-facing internal engine terminology and supports meaningful numbered variations, preview and quick ideas.
- Social Integration Centre includes the recommended setup/connect/HC AI/publish/review flow.

## Creative Studio and Media Library
- New Creative Studio supports multiple social/banner canvas sizes, frames, alphabetic name validation, digit-blocked greeting text, fonts, colours, emojis, shapes, optional background image, PNG download and Media Library save.
- Media Library supports greeting cards, images, GIFs, videos and banners, preview/delete, role sharing, user-specific sharing and Guest-page permissions.
- When Telecaller/Executive or Connector sharing is selected, the corresponding account list is available for single/multiple user selection.

## Loan enquiry and CRM
- Public loan enquiry now has nine steps including a dedicated Credit Cards step after Existing EMIs.
- Credit-card capture includes issuer, limit, outstanding, EMI, payment bounce, overdue, notes and revolving/rotation status.
- Credit-card data is mirrored into CRM Leads and is available to lead analysis.
- Current-address proofs and income/vintage proofs were expanded.
- Home Loan / Home Loan Balance Transfer includes linked documents, EC, Gift Deed, Lease Agreement and related property-document options.
- Home Loan has conditional co-applicant fields.
- Executive Add Lead also captures credit-card obligations.
- Assigned Lead Queue uses paged server retrieval (25 records per request) and clearer Save & Next loading/error states.

## Employer Checker and Lead Analysis
- Employer Eligibility Checker is Admin-enabled by default and disabled for Executive/Connector until both role and user permission allow it.
- It searches the application-maintained lender/company reference library and clearly states that there is no universal public lender-approved employer list.
- Lead-level Calculate opens FOIR analysis at 50%, 60%, 65% and 70%, includes existing loan/card obligations and produces indicative EMI/loan-capacity scenarios plus profile next-step suggestions.
- Analysis is explicitly indicative and does not claim lender approval or guaranteed eligibility.

## Insurance
- Internal Insurance Guest Form supports Quick Submit and Detailed Submit.
- Insurance Leads workspace is permission-controlled.
- Insurance features are Admin-enabled by default and disabled for Executive/Connector until enabled by Admin at role + account level.

## Offer Creative / Research
- Removed the unwanted Offer Library upload/replace explanatory sentence.
- Money Mantri Tips added as responsible financial-awareness content.
- Marketing Research Lab expanded with objectives, criteria suggestions, checklist coverage, structured result presentation and Excel/Word/PDF-print export controls.

## Access-control model
- New feature keys: employerChecker, loanAnalysis, insuranceGuest, insuranceLeads, creativeStudio.
- Non-admin feature access requires the role-level feature to be enabled. Account-level permissions can further restrict access.
- Loan Rates and Schemes remain stricter: non-admin access requires role enablement plus explicit per-user opt-in.
- Admin always has access to administrative analysis/configuration features.

## Setup additions
Running setup() adds missing columns/sheets without deleting existing records:
- Employer Listings
- Insurance Leads
- CRM credit-card / monthly-income fields
- Media sharing metadata
- New User Permissions feature columns

## Validation
- External JavaScript syntax checked with Node.
- All inline HTML script blocks syntax checked with Node.
- Apps Script syntax checked by copying .gs source to JavaScript for parser validation.
- Current Apps Script deployment URL is retained throughout the package.
