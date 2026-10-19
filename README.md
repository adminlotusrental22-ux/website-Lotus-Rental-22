# Lotus Rental 22 — final website

This folder is the working source of truth. Edit this project, not an extracted upload copy.

## Main folders
- `src/`: website, booking logic and EN / 中文 / ID translations.
- `public/assets/`: photos and logo used by the final website. Guest photos have faces and plates blurred.
- `tests/`: booking and translation checks.
- `docs/`: asset records, editing prompts and QA notes.
- `_archive/`: local-only originals, old exports, previews and unused files. Not part of the website or upload ZIP. Contains unblurred originals; keep private.
- `dist/`: generated production build; recreated by `npm run build`.
- `node_modules/`: installed dependencies; recreated by `npm ci`.

## Run and check
Requires Node.js 22.12+.

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
```

Default local address is http://localhost:3000. The existing preview may use port 3001.
No API key is needed. Bookings open a WhatsApp draft; availability is confirmed by the team.

## Where to edit
- Fleet, rates, contact, verification and FAQ: `src/data/businessData.ts`.
- Guest carousel photos: `src/data/guestStories.ts` and `public/assets/guests/`.
- Translations: `src/i18n/translations.ts`.
- Main layout: `src/App.tsx`, `src/components/` and `src/index.css`.

English is the default for new visitors; their language selection is remembered. Prices remain IDR and scheduling uses WITA. Product photos are illustrative; confirm exact colour/variant with the team.

## Manual GitHub upload
`lotus-github-upload.zip` is the final upload package. Extract it and upload its contents, not the ZIP file. It excludes `_archive`, original private photos, dependencies, build output and Git history. After future edits, regenerate the package so it matches this source.

## Additional languages
The compact header selector now includes ES (Español) and IT (Italiano), alongside EN, 中文 and ID. Spanish/Italian editorial and WhatsApp translations are maintained in src/i18n/europeanTranslations.ts. Booking dates use es-ES / it-IT. New visitors still default to English; selected language is remembered.

## Social previews
Small post covers below the guest gallery link to the owner-selected Instagram/TikTok posts. They are static, lazy-loaded local images: no autoplay, embeds, external scripts, passwords or live feed integration. Maintain links and covers in src/data/socialMedia.ts and public/assets/social/. One unavailable TikTok cover uses a platform fallback; replace its null cover when a verified cover becomes available.
