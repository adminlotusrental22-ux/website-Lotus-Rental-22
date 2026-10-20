# Google Ads landing page audit

Date: 19 October 2026. Scope: current local website source and local checks; no public production URL or Google Ads account/creative was audited. This is a readiness assessment, not Google approval.

## Verdict

Do not declare the website fully compliant or launch-ready yet. The business information and booking flow provide a useful foundation. Resolve the disclosures below, then audit the published destination. These are observed gaps and recommendations; they do not establish that Google will reject an ad.

## Positive findings

- Business name, address, email, WhatsApp contact and hours are visible.
- Fleet prices and the Rp 20,000 delivery fee per unit are disclosed. Booking estimates distinguish rental and delivery and request final availability/price confirmation.
- Cash/QRIS at handover, no deposit, and document verification are described. Original passports remain with guests.
- The website provides substantive fleet, location, booking and route information. It is not only a redirect to social media.
- No Google advertising/analytics tags were found in the inspected source. Social previews use local thumbnails and outbound links rather than embedded social SDKs.
- Local verification: 31 tests passed, TypeScript passed, production build passed. These do not verify production availability or policy approval.

## Before advertising

1. **Explain verification data handling.** The FAQ requests passport/ID photos, flight confirmation and hotel booking through WhatsApp, but there is no accessible privacy notice explaining purpose, recipient, access, retention/deletion, and contact for requests. Document the actual business process; do not invent retention periods. No passport upload is implemented on the website. Google requires appropriate disclosure and security for collected information; moving the conversation to WhatsApp does not explain the business's handling of the documents.
2. **Disclose material rental conditions and charges.** Clarify what a rental day means, late returns, fuel, return collection, taxes/other applicable charges, cancellation/refunds, damage/theft responsibility and any insurance. State actual policies, including when a charge does not apply. The calculator currently includes rental plus delivery only. A named standalone Terms/Refund page is not universally mandated by the cited Ads policy; clear material information is the objective.
3. **Confirm accuracy and media rights.** Verify fleet variants/features match available units and that service promises can be fulfilled. Confirm commercial use rights for route photos and permission for identifiable guests in social covers. Blurring the guest carousel does not establish rights to all media. Do not use guest images as ad creatives without appropriate permission.
4. **Audit the published URL.** Verify HTTPS, successful page/assets loading, redirects, mobile booking, access from target countries and Google AdsBot crawlability. Localhost is not a usable public ad destination. Review the actual production deployment, not just this build.
5. **Review the campaign/account.** Ad copy, advertised prices, final URL and business identity must match the website. Advertiser verification and billing/account status remain outside this audit. When adding conversion tracking/remarketing, avoid sharing passport/name/contact data with Google and implement consent appropriate to the tracking and audience jurisdictions.

## Official policy references

- Destination requirements: https://support.google.com/adspolicy/answer/6368661?hl=en
- Data collection and use: https://support.google.com/adspolicy/answer/6020956?hl=en
- Misrepresentation: https://support.google.com/adspolicy/answer/6020955?hl=en
- Dishonest pricing practices: https://support.google.com/adspolicy/answer/15938375?hl=en

Google makes the final decision after reviewing the ad and destination. A successful technical build or attractive design does not guarantee approval.
