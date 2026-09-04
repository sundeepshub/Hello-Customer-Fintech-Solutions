# Security Notes — Revision 13

## Front-end source visibility

This project is hosted as a browser application. HTML, CSS and JavaScript that the browser downloads can be inspected by the person using that browser. There is no reliable setting that can make client-side source code impossible to view, copy or download.

Revision 13 therefore uses the correct security boundary:

- Passwords stay in Firebase Authentication.
- Social-media access tokens are stored only in Google Apps Script Script Properties.
- Lead ownership, role checks, field masking and Admin privileges are enforced by the Apps Script backend.
- Social publishing never exposes provider access tokens to GitHub or browser JavaScript.
- The public webpage research tool blocks obvious local/private-network URLs.
- Client-side hiding is treated as presentation only; server-side authorization remains authoritative.

Minification/obfuscation can make source harder to read, but it is not a security boundary and is not represented as one in this project.
