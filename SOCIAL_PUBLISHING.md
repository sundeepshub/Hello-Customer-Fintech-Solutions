# Social Publishing Configuration — Revision 13

## Facebook
The portal supports a Facebook Page publishing connector when the Admin configures:
- Facebook Page ID
- Page Access Token with the required Page publishing permission

Text/link posts use the Page feed endpoint. Image posts use the Page photos endpoint.

## Instagram
The portal supports image publishing to an Instagram Professional account when the Admin configures:
- Instagram Professional Account ID
- Meta access token with content-publishing access
- A publicly reachable image URL

Publishing uses the media-container step followed by media_publish.

## YouTube
The UI includes YouTube selection, but Revision 13 does not falsely report a YouTube upload as successful. A real YouTube upload requires Google OAuth and a video upload flow using the YouTube Data API. Add that OAuth/upload implementation before production use.

## ShareChat
The UI supports an official partner endpoint/token when such API access has been provided to the business. Revision 13 does not invent a public organic-posting API.

## Tracking
Every social campaign can create a URL such as:
guest-login.html?source=facebook&ref=EID-TC001

Referral ID format:
- Executive: EID-<Executive ID>
- Connector: CID-<Connector ID>
- Admin: AID-ADMIN

The mandatory Guest Access form records the source/referral and creates a CRM lead.
