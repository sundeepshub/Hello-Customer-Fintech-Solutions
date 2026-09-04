# Revision 19 — UI Parity & Login Performance

- Home hero rebuilt to follow the approved modern visual reference.
- Consistent HelloCustomer wordmark, Start Enquiry and Login buttons across the app.
- Guest quick-access card integrated into the landing experience.
- Login pages redesigned with the same visual language.
- Portal cards/tables/forms/buttons receive the same rounded, modern design system.
- Mobile layouts refined for 1050px, 720px and 420px breakpoints.
- Page loading indicator changed from a blocking overlay to a compact non-blocking status pill.

## Login performance
- Firebase ID tokens now use the cached valid token rather than forcing a token refresh on every API call.
- Successful username → email resolution is cached in the browser for repeat logins.
- Apps Script is pre-warmed while the user is entering credentials using a lightweight `ping` action.
- The authenticated profile is cached briefly in session storage to avoid immediately re-fetching it after redirect to the dashboard.
- Access/profile helpers reuse recent session data where safe; all backend operations still validate the Firebase token and role.

Apps Script cold starts and network latency can still add some delay, but the avoidable duplicate round trips have been reduced.
