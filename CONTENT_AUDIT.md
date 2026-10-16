# Content audit — restored service information

The redesign keeps the following content from the original export and the owner's latest instructions:

| Information | Where it is shown |
| --- | --- |
| WhatsApp direct booking | Header, mobile hero, final booking callout, footer contact, bottom chat navigation |
| Zero security deposit; no passport held hostage | Intro benefit strip, FAQ and reservation form |
| Cash / QRIS at handover | Intro benefit strip, rental steps, payment FAQ, reservation form and footer |
| Komodo Airport / hotel delivery, Rp20,000 per scooter | Delivery section, airport FAQ and booking estimate |
| 2 helmets and phone mount | Intro benefits, fleet note, scooter details and equipment FAQ |
| Initial fuel | Equipment FAQ |
| Local assistance, 08:00–20:00 WITA | Intro benefits, garage, roadside support FAQ |
| After-hours handover by advance WhatsApp arrangement | Delivery and garage |
| Garage in Wae Mata | Dedicated garage section, pickup option, garage FAQ and footer |
| Correct Google Maps point (-8.5035334, 119.8878866) | Embedded map and the owner's provided place link |
| Free luggage storage and helmet fitting | Garage section and pickup FAQ |
| Customer handover carousel | Guest moments section, as an automatic, seamless photo-only ribbon; pauses on hover, keyboard focus or touch hold |
| Routes, scooter choices, rental steps, required documents | Retained in the catalogue, route guide, steps and FAQ; owner-supplied photos now show Golo Mori, Gua Rangko and Bukit Cinta |
| Planned car/tour/transfer services | Collapsed “More from Lotus · coming soon” footer item |

Current owner-supplied rates: Beat / Scoopy Rp100,000/day; Vario 125 Rp130,000/day; Vario 160 / Stylo 160 / Aerox Rp140,000/day; NMAX Neo / PCX Rp150,000/day. NMAX image comes from Yamaha Indonesia 2025/2026 Neo catalogue. See QA_REPORT.md for checks.

## Real guest photos and testimonials
The carousel is ready for real photographs. Until provided, it shows “Guest photos coming soon” cards with no invented guests, quotes or star ratings.

1. Put approved photographs with faces already blurred in `public/assets/guests/`.
2. Add entries to `src/data/guestStories.ts`: image URL, accessible image description and handover location.
3. The ribbon displays only photographs, without names, quotations, ratings or captions.
4. The carousel replaces the placeholder cards automatically when entries exist.

Faces must be blurred in the image file before publication. The component does not perform face detection or face blurring. This keeps the unblurred original out of the website.




