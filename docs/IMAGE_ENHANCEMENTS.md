# Route photographs — enhancement record

The three photographs supplied by the owner were enhanced with the built-in image generation/editing tool. No reference website screenshots were used as route photos. Originals are preserved for comparison. AI-assisted enhancement reconstructs fine detail, so it should not be treated as recovery of original camera detail.

| Supplied image | Destination | Website file | Enhanced master | Original |
| --- | --- | --- | --- | --- |
| 1 | Bukit Cinta | public/assets/routes/bukit-cinta.jpg | source-photos/routes/enhanced/bukit-cinta.png | source-photos/routes/originals/bukit-cinta.png |
| 2 | Golo Mori Coastal Highway | public/assets/routes/golo-mori.jpg | source-photos/routes/enhanced/golo-mori.png | source-photos/routes/originals/golo-mori.png |
| 3 | Gua Rangko | public/assets/routes/gua-rangko.jpg | source-photos/routes/enhanced/gua-rangko.png | source-photos/routes/originals/gua-rangko.png |

Master output dimensions: Bukit Cinta and Golo Mori 1672 × 941; Gua Rangko 1536 × 1024. Website JPEGs keep these dimensions at quality 90, approximately 470–575 kB each. The existing watermark in the Golo Mori image remains visible.

## Prompts used (built-in imagegen edit mode)

### Bukit Cinta
Edit target: the attached Bukit Cinta landscape photograph. Restore and upscale this exact photo to a clean high-resolution 16:9 photograph around 2048x1152 for a website route card. Conservative photographic restoration only: reduce compression artifacts, gently deblur and improve natural fine detail and edge clarity. Preserve the exact hill silhouettes, winding road, trails, coast, islands, sea, camera perspective, framing, golden dry grass, natural afternoon lighting, and every real feature. Do not invent paths, structures, vehicles, vegetation or new landscape details. Do not stylize, oversaturate, oversharpen or add text. This must remain recognizably the same documentary location/photo, not a reimagined scene.

### Golo Mori
Edit target: this supplied aerial photograph of Golo Mori Coastal Highway, Labuan Bajo. Improve photographic resolution and clarity for a website card, around 2048x1152 landscape 16:9. Conservative restoration: gentle denoising/decompression, correct mild softness, retain natural sharp detail and original colours. STRICT invariants: preserve all hill shapes, winding white road position, bay shorelines, pier, foreground conference building architecture and semicircular landscaped auditorium, perspective and composition exactly as photographed. Preserve the existing KOMPAS watermark in the same location, relative size and appearance. Do not remove, obscure or crop the watermark. Do not invent terrain, buildings, structures or features. No added text, no redesign, no creative reinterpretation, no aggressive sharpening or saturation.

### Gua Rangko
Edit target: the supplied photograph of Gua Rangko blue cave pool. Restore this exact documentary photo to a cleaner high-resolution 3:2 landscape photograph around 2048 pixels wide for a website route card. Gently reduce noise and compression artifacts, improve edge detail and clarity without artificial halos. STRICTLY preserve original cavern topology, every major stalactite and rock formation, foreground rocky ledges, pool shape, turquoise water, bright ceiling light opening, viewpoint, framing and original natural cave lighting. Keep dark areas naturally dark while recovering only subtle texture. Do not add or remove formations, rocks, water, people or objects. No new lights, text, dramatic recolouring or creative reinterpretation. This is photographic enhancement of the input, not generation of a different cave.


## Hero update — 16 October 2026
- Source: the owner's uploaded sunset city / harbour photograph.
- Original: source-photos/hero/originals/labuan-bajo-city-sunset.png (512×341).
- Enhanced master: source-photos/hero/enhanced/labuan-bajo-city-sunset.png (1536×1024).
- Website: public/assets/labuan-bajo-city-sunset-enhanced.jpg.
- Mode: built-in imagegen edit. The original is preserved; AI enhancement reconstructs fine detail.
- Prompt: Edit this exact supplied city/harbour sunset photograph of Labuan Bajo for a website hero. Conservative photographic enhancement to a higher-resolution approximately 1536x1024 landscape 3:2 image. Reduce blocky JPEG compression and mild blur; enhance edges and natural fine detail gently. Preserve the original viewpoint, framing, exact skyline/island silhouettes, coastline, building positions and architecture, pier, boat positions and shapes, foreground waterfront walkway and original pink-purple-orange sunset colours. Do not add, remove or relocate buildings, boats, islands, roads or other objects. Avoid extra contrast, oversaturation, invented details or aggressive sharpening. Do not change the scene or add text. Return a faithful high-resolution enhancement of the original photograph.

