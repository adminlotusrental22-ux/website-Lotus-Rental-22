# QA / QC — Lotus Rental 22
Checked 16 October 2026. Local preview: http://localhost:3001/

## Fixes and current prices
- Fixed the header Book a ride callback passing a click event as a scooter ID. Both the callback and the order entry point now reject invalid scooter selections.
- Confirmed the order dialog opens repeatedly and starts with a real scooter and nonzero rental amount.
- The Book button is now available in the mobile header too.
- Added native input handling so changing the pickup date immediately updates the return date.
- Dialogs use unique accessible labels, close cleanly and restore focus / page scrolling.
- Added an optional different return location to the order draft.
- Hero enhanced from the owner's 512×341 source to 1536×1024 using the built-in imagegen tool; the website uses a JPEG copy and the original and enhanced master are retained.

| Scooter | IDR per day |
| --- | ---: |
| Honda Beat 110 | 100,000 |
| Honda Scoopy 110 | 100,000 |
| Honda Vario 125 | 130,000 |
| Honda Vario 160 | 140,000 |
| Honda Stylo 160 | 140,000 |
| Yamaha Aerox | 140,000 |
| Yamaha NMAX Neo 155 | 150,000 |
| Honda PCX | 150,000 |

## Automated checks — passed
Run with `npm test`:
- 16 tests passed, zero failed.
- Click events and unknown IDs cannot become valid scooter selections.
- Current rates and three-day estimates for all eight models.
- Multi-unit pricing, delivery per scooter, and free self pickup.
- Invalid orders rejected.
- WITA scheduling, one-hour lead time and next-day / next-year rollover.
- Return dates across months, years and leap day.
- Invalid, past, closed-hour and too-soon pickup times.
- WhatsApp recipient, model names, rental dates, quantities, delivery fee, total, return location and Cash / QRIS wording.

TypeScript and production build passed.

## Browser checks — passed
- Desktop header order button: opened and closed three times; correct default Beat selection and Rp320,000 estimate (three days + one scooter delivery).
- Escape closes the dialog; closing restores keyboard focus to the header and restores page scrolling.
- All eight card booking buttons preselect their correct scooter and show the updated three-day estimate.
- Scooter details → booking carries the selected model.
- Category filters return 2 compact, 4 sport, 2 maxi, 8 all; descending price sort is correct.
- Required airport details and whitespace-only details are blocked before opening WhatsApp.
- NMAX + Vario 125 for seven days: Rp2,000,000 with two deliveries, Rp1,960,000 with self pickup.
- Removing Vario from that order recalculates NMAX to Rp1,050,000.
- Pickup date 30 January 2027 + seven days returns 6 February 2027.
- Header Book button visible and no page-wide horizontal overflow at 320, 390, 768, 1100 and 1440 px.
- Mobile order dialog fits the 390×844 viewport (390×832 dialog).
- FAQ and delivery accordions open.
- Internal anchor targets exist; no broken loaded images observed.
- Header / hero direct WhatsApp templates contain the expected fields and correct recipient.
- Garage map uses the owner's point, -8.5035334, 119.8878866.
- Guest photo ribbon animation runs and its position advances. No invented guest photos or quotes are displayed.
- No new browser console errors during this QA pass.

## Remaining work and scope
1. Add approved real guest images with faces already blurred, using `src/data/guestStories.ts`.
2. Publish the production build to the chosen hosting and connect the domain. This remains a local preview.

Booking is a request to the Lotus team through a WhatsApp draft. The team confirms real availability and the final total. No message was sent during QA; draft URL contents were checked with automated tests. Cash / QRIS is paid at handover, with no online payment processing added.


## Scooter image update QA — 16 October 2026
- All eight new catalogue photos loaded successfully in the live preview.
- Desktop 1440px and mobile 390px screenshots checked: white backgrounds, full mirrors/wheels, right-facing views, common ground alignment, compact models visually smaller than maxi. No horizontal mobile overflow.
- PCX displayed as Honda PCX 160 and Aerox as Yamaha Aerox 155 per owner references.
- Booking regression suite: 16 passed. TypeScript check and production build passed.
- Proof: design-preview/scooter-studio-desktop.jpg and scooter-studio-mobile.jpg.
- AI-assisted illustrations and approximate relative scales, not calibrated dimensions. Existing variant confirmation note remains.

## Logo/email QA
Owner crest verified loaded in header and footer at square aspect ratio. Mobile 390px and wider layout inspected. Footer email text and mailto destination both admin.lotusrental22@gmail.com. TypeScript and production build pass. Screenshots: design-preview/logo-mobile.jpg and logo-footer.jpg.

## Garage photo QA
Enhanced image inspected against source before installation. Desktop 1100px and mobile 390px verified: photo loaded, map remains usable, no mobile horizontal overflow. TypeScript and production build passed. Proof: design-preview/garage-desktop.jpg and garage-mobile.jpg.

## Guest photo carousel QA
Seven edited owner photos installed. Each master visually inspected: visible faces and plates anonymized; social captions/UI removed. Desktop 1440px and mobile 390px checked, no horizontal page overflow. Automatic animation confirmed running and transform advancing. All repeated images loaded; eager loading prevents blanks during CSS-transformed looping. Group photo gets a wider frame. TypeScript and production build passed. See GUEST_PHOTOS.md for prompts and file paths. Unedited originals remain outside public/.

## Map zoom update
Expanded map height to 320px desktop / 300px mobile. Added accessible bounded +/− zoom controls (levels 10–19) that update the Google embed zoom. Default level 13 shows airport and garage together. Added Google Maps driving-directions link from Komodo Airport to the exact garage coordinates so visitors can see current distance and travel time. Browser verified zoom changing 12→13 and zoom-out update; TypeScript/build pass. Proof: design-preview/garage-map-zoom.jpg.

## Compact map correction
Owner requested flatter map and closer default framing. Map height now 170px on desktop/mobile, default zoom 15, row gap 12px. Custom zoom buttons and airport directions retained. TypeScript and production build passed.

## Verification and address update
Added explicit photo-of-passport/ID, return flight and hotel booking verification statement to booking form, how-it-works and FAQ. Original passport remains with guest. Footer address now supplied Waemeta/Gorontalo address with postal code. TypeScript/build pass. GitHub push cancelled at owner request; manual upload archive provided separately without original private photos.

## Language selector QA
English / Bahasa Indonesia / Simplified Chinese header selector installed, persisted locally with English default. Editorial text, FAQ/verification, model descriptions, booking form/errors/dates, accessible labels and WhatsApp drafts localized. Prices stay IDR; WITA and proper names retained. 23 tests pass (16 booking, 7 localization); TypeScript and production build pass. Browser verified Chinese/Indonesian pages and booking dialogs, translated WA href, Chinese preference after reload, compact 320px+ mobile and desktop layout with no horizontal overflow. Language choice commits immediately; form/filter components keep stable identities. Manual upload ZIP refreshed.

## Final workspace cleanup
Legacy unused components and catalogue PNGs moved into local-only _archive. Original photos, old extracted upload copy, old redesign ZIP, processing script and design previews archived. Asset/process/QA records consolidated under docs. Removed unused sample testimonial dataset. Active source, final public assets, tests and configuration retained. 23 tests, TypeScript, production build and local asset-reference check pass. README documents the final structure. Upload ZIP regenerated without archive/private originals.

## Spanish / Italian update — 17 October 2026
Added ES and IT to compact selector, persisted language parsing, all existing editorial/accessibility translation keys, FAQ, scooter descriptions, direct/full-order WhatsApp drafts and localized booking date formats. English remains default. Automated checks include full dictionary coverage and order-value preservation. Browser visual verification could not complete because the in-app browser failed to load the local preview; HTTP loopback returned 200. No claim of new visual QA. Upload ZIP regenerated, including favicon assets.

## Flag language picker — 17 October 2026
Replaced compact language codes with local SVG flag artwork (UK/China/Indonesia/Spain/Italy). Selected flag is independent of Windows emoji rendering. Native select keeps readable language names, keyboard support and accessible label. Browser confirmed flag loads, Italian language switch and no horizontal overflow; restored English. 31 tests, TypeScript and build pass. Proof: docs/previews/header-flags.jpg.

## Social section QA — 19 October 2026
31 existing tests, TypeScript and production build pass. Browser verified 6 exact supplied post URLs, 5 successful local image loads, no social iframe, and 145px-high horizontally scrollable cards at 390px with no page overflow. Desktop and mobile visually inspected. Section sits after #trust and before FAQ. All editorial strings included in 5 languages. Screenshots: docs/previews/social-desktop.jpg and social-mobile.jpg. Last TikTok cover unavailable; explicit platform fallback is intentional. No claim that all six externally hosted videos are playable.
