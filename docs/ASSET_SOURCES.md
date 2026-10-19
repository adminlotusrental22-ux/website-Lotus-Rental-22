# Image sources
Product images are downloaded as local assets; no generated motorcycle images are used.
These are illustrative catalogue images, not photographs of Lotus rental units.

- Honda BeAT, Scoopy, Vario 125, Stylo 160 and PCX: Astra Honda Motor public product catalogue, https://www.astra-honda.com/product and https://www.astra-honda.com/api/v1/product?category=5fcba57cca0f7f6b5560be99
- Honda Vario 160: https://www.astra-honda.com/product/vario-160 ; image https://ik.imagekit.io/zlt25mb52fx/uploads/product-draft/meta/thumbnail-vario160-400x300-tr-1-10012024-040050.png
- Yamaha Aerox: Yamaha Thailand, https://www.yamaha-motor.co.th/commuter/aerox-2022/overview ; image https://storagetym.blob.core.windows.net/www2021/images/product-2021/commuter/model-year-2022/aerox-2022/aerox_360_icon_blue/14.png
- Yamaha NMAX Neo (2025/2026 colour catalogue): Yamaha Indonesia, https://www.yamaha-motor.co.id/product/nmax-turbo/ ; image https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025111019202062H52051.png
- Hero: owner-supplied city / harbour sunset photograph, enhanced with the built-in imagegen tool to 1536x1024. Website asset: public/assets/labuan-bajo-city-sunset-enhanced.jpg. Original and master preserved under source-photos/hero/. See IMAGE_ENHANCEMENTS.md.
- Route photos: three photographs supplied by the owner, enhanced using the built-in imagegen tool. See IMAGE_ENHANCEMENTS.md for original files, output dimensions and prompts.

The existing Lotus crest is retained from the supplied source.






## Standardized scooter catalogue — 16 October 2026
Eight illustrative studio assets installed in public/assets/scooters/studio. Six owner uploads mapped to their requested models; existing Scoopy and NMAX Neo references also standardized. See SCOOTER_VISUALS.md for prompts, source/master paths, and relative scale treatment.

## Owner logo and contact update
Header and footer use the exact owner-uploaded PNG at public/assets/brand/lotus-rental22.png, preserving its square aspect ratio without AI reconstruction. Contact email updated to admin.lotusrental22@gmail.com.

## Garage photo
Owner garage image retouched with built-in imagegen. Natural exposure cleanup, preserved working garage character; see GARAGE_PHOTO.md for exact prompt and source/output paths. Installed above the map.

## Guest photographs
Seven owner-supplied handover photos, naturally enhanced using built-in imagegen with faces/vehicle plates blurred and overlay text removed. Website delivery: public/assets/guests/guest-1.jpg through guest-7.jpg. See GUEST_PHOTOS.md.

## Social highlights — 19 October 2026
Compact six-card row directly below the guest photo carousel. 145px-high mobile cards scroll horizontally; desktop covers capped at 190px. Links open the exact six owner-selected original posts in new tabs. No embeds, social SDKs, video elements or autoplay; five local 400px-max JPEG covers total 125,094 bytes, lazy-loaded. Sixth TikTok (7695616389188455687) returned unavailable thumbnail metadata after timeout/503 and empty metadata; deliberate branded fallback retains its original URL, without substituting unrelated imagery. Links can require platform login/availability. No OAuth/account access or automatic-feed sync is implied.

Profile URLs: https://www.instagram.com/lotus_rental22/ and https://www.tiktok.com/@rental_motorbajo. Instagram footer link corrected. Edit profiles/posts in src/data/socialMedia.ts. Covers sourced from the public Instagram embed page cover and TikTok oEmbed thumbnail for the selected posts, then locally resized/compressed. Original tracking query parameters omitted from post links. Firecrawl could not retrieve these domains; public embed/oEmbed metadata used instead. No third-party resources requested by this section before a visitor follows a link.

## TikTok replacement — 19 October 2026
Sixth card replaced with owner-selected https://www.tiktok.com/@rental_motorbajo/video/7695631504084307218. Cover retrieved from public webapp.video-detail metadata (oEmbed omitted thumbnail), resized to max 400px JPEG quality 80. Browser confirmed new URL, local cover and successful image load. All six cards now have original post covers. TypeScript/build passed.
