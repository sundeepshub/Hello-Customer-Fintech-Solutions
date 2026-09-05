# Revision 20 — Navigation, Login Reliability, Forms & History

Implemented requirements 60–66.

- Removed the Public Site dropdown from authenticated portal navigation.
- Added direct Home and Loans navigation inside authenticated Admin/Executive/Connector sessions.
- Home remains inside the correct dashboard and does not end the Firebase session.
- Loan pages opened from the portal keep authenticated portal navigation with `?portal=1`.
- Ensured applicable My Leads, Assigned Queue, Add Lead and Profile options are present; permission rules still hide explicitly disabled features.
- Fixed false Invalid username/password caused by stale cached username-to-email mappings by re-resolving the username before failing.
- Improved browser Back/Forward and BFCache restoration so stale loading/menu state is cleared without logout.
- Applied consistent modern form styling across forms, including mobile responsive controls and focus states.
- Corrected common Executive/Connector/Enquiry spelling variants in user-facing files.
