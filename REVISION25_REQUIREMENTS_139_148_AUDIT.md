# Revision 25 — Requirements 139–148
139. My Leads uses a paged backend endpoint, 25-row default page, loading state and debounced search.
140. Column chooser defaults to Lead ID, Customer Name, Mobile Number, Loan Type, Stage and Status; additional lead columns can be selected and applied.
141. Insurance Guest uses one Basic Details flow with conditional questions by insurance type.
142–144. Access Control uses multi-page and multi-option checkboxes, user checkboxes and Enable/Disable/Mask/Unmask + Allow Edit metadata.
145. Admin navigation is grouped in the requested order: Home, Dashboard, Loans, Leads, Marketing, Resources, General Settings, Profile.
146. Add Lead includes pincode lookup/address population, existing EMI handling and add/remove credit-card controls.
147. Media capacity is raised beyond 200 images and 100 videos (configured response: 500 images / 200 videos). Content Library is Google Sheet-backed and seeds 150 rows for each of WhatsApp, Facebook, Instagram and ShareChat (600 rows).
148. Push flow selects platform and CTA, creates a tracked Guest link carrying user/ref/content attribution and passes the draft to Social Publisher. Actual direct publishing remains subject to each platform API, OAuth/account type, permissions and app review.
