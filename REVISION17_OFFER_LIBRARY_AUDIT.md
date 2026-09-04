# Revision 17 — Offer Library Creative Controls

Requirements 50–52 implemented.

## Approved bundled images
Three separately stored approved images are included under:
- assets/offer-library/IMG-03-customer-consultation.png
- assets/offer-library/IMG-04-documentation-paperwork.png
- assets/offer-library/IMG-05-business-professional-meeting.png

They are used as bundled fallback creatives for Personal Loan, Home Loan and Business Loan.

## Admin Offer Creative Manager
New admin-only page: `offer-creatives.html`.

For every Offer Library template, Admin can:
- upload a new image,
- select an image already stored in Media Library,
- enter/replace a hosted image URL,
- change headline/message/CTA,
- enable or disable the template.

Offer configuration is stored in the `Offer Library` sheet. Images uploaded from the manager use the existing Admin Media Library/Drive workflow.

## Creative placement guide
The customer-facing Offer Library no longer shows the Creative Placement Guide.
The guidance is retained only as an Admin note in:
- Offer Creative Manager
- Ad Manager

Run `setup()` after deployment to create/seed the Offer Library configuration without deleting existing records.
