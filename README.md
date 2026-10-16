# Lotus Rental 22
Responsive scooter catalogue for Labuan Bajo, redesigned from the supplied Google AI Studio export.

## Run locally
Requires Node.js 22.12+ (Node.js 24 recommended).
1. Run `npm ci`.
2. Run `npm run dev`.
3. Open `http://localhost:3000`.

No Gemini key is required. This is a client-side catalogue; reservations open a WhatsApp draft for the visitor to send. Availability is confirmed by the rental team.

## Checks and build
- `npm test` runs booking, pricing, date and WhatsApp regression tests. See `QA_REPORT.md` for browser QA results.
- `npm run build` creates the production website in `dist/`.
- `npx tsc --noEmit` checks TypeScript.

## Design
- Mobile: one compact header, short destination hero, two-column catalogue.
- Tablet: three-column catalogue. Desktop: four-column catalogue and full navigation.
- Category filters, price sorting, rupiah pricing, on-demand scooter details.
- Delivery details and FAQs expand when needed.
- Mobile bottom navigation reserves its own space.
- Booking supports multiple scooters, WITA pickup scheduling, rental duration, delivery fees, and a persistent estimated total.
- Keyboard-accessible native dialogs, focus restoration, Escape dismissal, reduced-motion support.

Photos are illustrative. Exact colour and variant must be confirmed with the business. The original export called one model “PCX 155”; the catalogue displays “Honda PCX” pending confirmation of the exact variant. Rates, contact details and rental terms are retained from the supplied export. The owner-confirmed garage location is displayed with its Google Maps pin. Sample customer quotes are not published; the handover carousel is ready for genuine guest photos and testimonials.

See `CONTENT_AUDIT.md` for restored service details and how to add blurred guest photos. See `ASSET_SOURCES.md` for image provenance and `design-preview/` for screenshots.





## Languages
Header selector supports English (default), Bahasa Indonesia and Simplified Chinese. Preference is stored in localStorage (`lotus-language`); blocked storage safely falls back to English. Editorial dictionaries are in src/i18n/translations.ts. React render localization keeps stable component wrappers and translates text/accessibility attributes without DOM mutation, leaving input values, model IDs, prices and addresses intact. Booking and direct WhatsApp drafts follow the selected language. No external translation service is used.
