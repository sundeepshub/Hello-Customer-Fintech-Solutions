# Revision 21 — Admin, Marketing, Access & Tracking Upgrade

Implemented requirements 67–91.

- BGS naming replaces customer-facing Bulk Google Sheet wording.
- Username availability validation now gives a specific unique-username message.
- Premium Admin/form styling and a persistent Administrator navigation menu were added.
- Unassigned leads include blank/TBA assignment values and are surfaced with an Admin count/link.
- Last Login is displayed compactly with the raw timezone-bearing timestamp available as a tooltip.
- Access Control Centre now supports role and specific Executive/Connector account targeting with user lists and Allowed/Not Allowed decisions.
- Audience dropdowns include a broad reusable customer-category library.
- AI Marketing Studio includes Quick Context, expanded ideas/CTAs, local skills library, and Next Variation.
- Media Library remains a standalone Admin/portal area; Manage Guest Image was removed from Campaign & Tracking.
- Campaign Manager explains when campaign lists are empty and campaigns populate Social Publisher after save for that account.
- Secure short tracking links use a random code stored server-side and resolve through `s.html`.
- Social Integration Centre presents simple user connections while keeping application credentials an Admin task.
- Social Publisher disables platforms that are not connected, adds title suggestions, additional CTAs and Clear.
- Marketing Research Lab now accepts objective, criteria, focus and max-page inputs and returns structured public-source research.

Open-source research considered for the architecture included self-hosted short-link patterns such as Kutt/YOURLS/Shlink-style random codes, API-driven link creation and server-side resolution. No third-party package is bundled merely for branding; the application keeps a small custom implementation compatible with the current GitHub Pages + Apps Script architecture.
