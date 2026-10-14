# Cover briefs

How the concept becomes a call that draws the right cover: the call and the model per frame,
the brief's eleven blocks in their order, the identity lock, where things go in each frame,
splits and other mediums, examples, the check before you send, changing one thing, a 3D logo,
and reading a reference cover.

## Contents

1. [How the brief is used](#1-how-the-brief-is-used)
2. [The call](#2-the-call)
3. [The eleven blocks](#3-the-eleven-blocks)
4. [The identity lock](#4-the-identity-lock)
5. [Where things go in each frame](#5-where-things-go-in-each-frame)
6. [Split layouts](#6-split-layouts)
7. [Other mediums](#7-other-mediums)
8. [Examples](#8-examples)
9. [Before you send it](#9-before-you-send-it)
10. [Changing one thing](#10-changing-one-thing)
11. [A 3D logo](#11-a-3d-logo)
12. [A reference cover](#12-a-reference-cover)
13. [Special cases](#13-special-cases)

## 1. How the brief is used

`create_generation` hands your `prompt` to Creatorline's image writer, which turns it into the
instruction the image model gets ([video briefs](video-briefs.md), section 15). The writer
keeps the avatar's face from the avatar reference and adds the avatar's persona. It knows
nothing about covers: the poster look, the parts of the frame the apps hide, the headline. Say
those yourself, in the blocks below, one block per line.

- Write the brief in English. Words that appear in the image stay exactly as given, in their
  own language, in double quotes after "reading exactly".
- Name inputs plainly: `@Avatar1` for the avatar's face (it goes in by itself), `@Avatar2` for a
  second face in `characters`, `@Input1`, `@Input2` for images in `other_elements`, in the order
  you pass them.
- Fill every `<placeholder>` before you send. A brief with one left in is a broken brief.
- No camera brands, no names of real creators or styles named after them, no prompt syntax.
- The writer always rewrites the brief; there is no word-for-word mode. What you state
  plainly and once (the exact words, the side, the band) survives the rewrite best.

## 2. The call

```json
{
  "tool": "photo-edit",
  "model": "gpt-image-v2-edit",
  "brand_id": "<brand id>",
  "avatar_id": "<the avatar in the video>",
  "prompt": "<the brief>",
  "inputs": { "other_elements": ["<product photo asset id>"] },
  "params": { "aspect_ratio": "9:16", "resolution": "2K", "quality": "Medium" },
  "count": 1
}
```

| The cover | `tool` | `model` | `params` |
|---|---|---|---|
| TikTok, Reels, Shorts (`9:16`) or YouTube (`16:9`), with a person or a product photo | `photo-edit` | `gpt-image-v2-edit` | `aspect_ratio`, `resolution: "2K"`, `quality: "Medium"` |
| Instagram feed (`4:5`) or a carousel's first slide (`3:4`), with a person or a product photo | `photo-edit` | leave it out (`nano-banana-pro-edit`) | `aspect_ratio`, `resolution: "2K"` |
| Nobody and no image to work from, any frame | `text-to-photo` | `nano-banana-pro` | `aspect_ratio`, `resolution: "2K"` |

- **`count: 1`, always.** Each variant (an expression, a camera take, a concept) is its own
  brief and its own call. Never several takes of one brief: a retake is a retry (SKILL.md,
  step 11).
- **`2K`, never `4K`** (house rule).
- The default edit model holds a face best, but it has no `9:16` or `16:9`; that is why those
  frames go to `gpt-image-v2-edit`, which also draws words well. Never name a model to the
  person.
- `quality: "High"` costs about three and a half times `Medium`: only for a 3D logo (section
  11) or a fallback edit (section 10).
- `inputs.other_elements` holds only what the cover shows: the product first, then a logo.
  Read the slot keys and values from `list_models` (`tool: "photo-edit"`) if anything is
  refused; never guess a value.

## 3. The eleven blocks

Always in this order: the Frame block first, the Grade block last. One line each.

```
References: @Avatar1 = the face of the person; @Input1 = <the product>; @Input2 = <the logo>.
Frame: A bold, punchy <vertical TikTok cover | wide YouTube thumbnail | 4:5 Instagram cover | first slide of a photo carousel>: a poster-grade, photoreal, high-impact composite, not a muted film still; one unified frame, one continuous scene with no split and no diagonal divide, everything blending across the same shot. <9:16: Faces in the upper two-thirds.> Keep clear: <the frame's line from section 5>.
Scene: <exactly what the cover shows, taken from the video>.
Text: <A clean picture: no words, no labels, no readable interface text and no watermark anywhere. | the baked headline line from headline text, section 5>
Subjects: <the avatar line with the identity lock (section 4), the expression and the take line>. All faces are crisp and sharp, the anchors of the shot.
Key elements: <one signature prop or effect that explains the gap>.
Logo: The logo from @Input2, its exact shapes, colours, proportions and letters, <small, in the top-left corner>, away from every face.
Location: <place, time of day, weather and atmosphere>.
Composition: One hero on a power third, a clear order of sizes, depth, and strong separation between the subject and the background.
Background: A bold, saturated <colour> gradient in the subject's palette, with soft texture, a vignette and edges that fall off into shadow; one continuous background.
Lighting: A thumbnail lighting rig: a strong key light sculpting the face, a soft dreamy fill lifting the shadows with a slight glow, and a back light plus a hair light drawing a clean bright rim around the hair, shoulders and outline.
Grade: Vivid, bright and glossy, poster punch: deep blacks, crisp highlights, rich saturated colour, one cohesive image.
```

| Block | Notes |
|---|---|
| References | Only with two or more images: the first line numbers them and says what each is. The faces first, then the product, then the logo. Leave it out with the avatar alone |
| Frame | Names the destination, which sets the composition. "Poster-grade" is right for a cover even though the video is phone-shot. A split replaces the "one unified frame" sentence (section 6); another medium replaces the whole block (section 7) |
| Scene | The content to depict, exactly. The same outfit, place and product as the video, so the cover tells the truth about it |
| Text | The clean line by default. The baked line only when the person asked for words ([headline text](headline-text.md)) |
| Subjects | Large and dominant, filling about 40 to 60 % of the frame, chest-up or a medium close-up, in the foreground on a power third, cleanly separated from the background. Never a small figure in the lower third, never a random video still |
| Key elements | The most concrete noun of the topic, oversized and flying toward the camera. Leave the block out when it would repeat the subject, or when the concept has none |
| Logo | Only with a logo in the inputs. Away from faces |
| Location | Only when the concept needs a place (Landscape, Map, a Posed action somewhere). Left out, the background block carries the picture |
| Composition | The hierarchy: what the eye lands on first, second, third |
| Background | Blended, never divided. A colour field matched to the subject's palette by default; the video's own place, blurred, for a Posed action, a Product or a Landscape |
| Lighting | People in frame only. A coloured rim only when the person names a colour (below); the key and the fill never change colour |
| Grade | The punchy grade by default. A restrained one only when the person asks for calm, premium, muted or soft, or the brand's voice says so: "Clean, soft and natural: gentle contrast, true colours; the faces stay the sharpest things in the image." |

**Rim light colours**, only when the person names one: ice blue `#4DA6FF`, neon magenta
`#FF3DBE`, toxic lime `#C8FF2E`, amber gold `#FFB63D`, or pure white. Add to the Lighting
block: "The rim light is <name> (<hex>); the key and fill stay neutral."

## 4. The identity lock

Soft wording ("keep her face") drifts. Write the lock in full for every face:

```
@Avatar1, <chest-up | medium close-up>, large and dominant in the foreground on the <left | right> third. Identity lock: exactly the person in the avatar reference, a photographic match with the same bone structure, eye shape, nose, lips, jawline, skin tone, hairline and hair texture; not beautified, not blended with any other face, not restyled; recognisable at a glance. Wearing <the outfit from the video>. Expression: <wording from concepts, section 6>. <Take line from concepts, section 7.>
```

- A second avatar: the same lock for `@Avatar2`, with its own side and expression.
- Drift is random. When a take does not look like the avatar, the fix is the same brief once
  more, not a longer lock.

## 5. Where things go in each frame

**9:16 (TikTok, Reels, Shorts).** The apps lay their own buttons and text over a playing
video: about the top 13 % and the bottom 22 % of the frame, and a column on the right from the
middle down. Profile grids show the cover cut to about 3:4, an eighth off the top and the
bottom. Faces go in the upper two-thirds. One band survives all of it:

> Keep clear: the face and the words sit in the middle of the frame, below the top seventh,
> above the bottom quarter, and away from the right edge in the lower half.

**16:9 (YouTube thumbnail).** The length badge covers the bottom-right corner.

> Keep clear: the bottom-right corner stays plain, the words sit on the left half, the face on
> the right third, both well inside the edges.

**4:5 (Instagram feed) and 3:4 (a carousel's first slide).** The grid crops 4:5 to 3:4.

> Keep clear: the face and the words sit well inside the edges, in the middle of the frame.

## 6. Split layouts

Only when the person asked for one (concepts, section 8). Replace the Frame block's
"one unified frame ..." sentence with the split, and keep one grade for all of it:

- Halves: "A split frame of two clean halves, left and right, joined by a bold vertical seam:
  left shows <state 1>, right shows <state 2>. One grade across both."
- Panels: "Three vertical panels with clean, bold seams, each a complete small scene: <start>,
  <middle beat>, <end>. One grade across all three."
- Versus: add "each side lit like a fight poster, equal visual weight".
- No labels, words or numbers on or between panels, unless asked for.

On 9:16 the halves stack top and bottom instead, both inside the keep-clear band.

## 7. Other mediums

For the Graphic framework, or when the person wants collage, flat motion graphics, a
storybook look or paper cut-outs:

- Replace the Frame block with: "Reproduce this exact medium: <medium>, its materials, palette
  and rendering, clearly not a photograph."
- Drop the Lighting block and the glossy Grade; describe the medium's own light and colour in
  the Frame block.
- The avatar becomes a character of that medium that keeps its silhouette, outfit, colours
  and the features people know it by. Keep the identity lock's first sentence ("exactly the
  person in the avatar reference") and drop the photographic match.
- Generic medium words only: never a studio, a show, an artist or a brand.

## 8. Examples

**A talking video, "3 mistakes new runners make": Posed portrait, clean, 9:16, take 1.**

```
Frame: A bold, punchy vertical TikTok cover: a poster-grade, photoreal, high-impact composite, not a muted film still; one unified frame, one continuous scene with no split and no diagonal divide. Faces in the upper two-thirds. Keep clear: the face and the words sit in the middle of the frame, below the top seventh, above the bottom quarter, and away from the right edge in the lower half.
Scene: A runner caught at the moment she realises she has been doing it wrong, one running shoe held up beside her face.
Text: A clean picture: no words, no labels, no readable interface text and no watermark anywhere.
Subjects: @Avatar1, chest-up, large and dominant in the foreground on the right third, leaving the left third free. Identity lock: exactly the person in the avatar reference, a photographic match with the same bone structure, eye shape, nose, lips, jawline, skin tone, hairline and hair texture; not beautified, not blended with any other face, not restyled; recognisable at a glance. Wearing the grey running jacket from the video. Expression: a gasp, mouth open, eyes wide, eyebrows high. All faces are crisp and sharp, the anchors of the shot.
Key elements: The running shoe, oversized and tilted toward the camera.
Composition: One hero on a power third, a clear order of sizes, depth, and strong separation between the subject and the background.
Background: A bold, saturated red gradient in the subject's palette, with soft texture, a vignette and edges that fall off into shadow; one continuous background.
Lighting: A thumbnail lighting rig: a strong key light sculpting the face, a soft dreamy fill lifting the shadows with a slight glow, and a back light plus a hair light drawing a clean bright rim around the hair, shoulders and outline.
Grade: Vivid, bright and glossy, poster punch: deep blacks, crisp highlights, rich saturated colour, one cohesive image.
```

With `"aspect_ratio": "9:16"`. The free left third takes the headline later, if the person
wants one.

**A serum review: Product with Added text, baked "WORTH IT?", 9:16.** The serum photo is
`inputs.other_elements[0]`. Only the blocks that change from the example above:

```
References: @Avatar1 = the face of the person; @Input1 = the serum bottle.
Scene: She holds the serum from @Input1 toward the lens at chest height, label facing the camera, weighing whether it is worth it.
Text: One bold headline drawn into the image, reading exactly "WORTH IT?", heavy white condensed capital letters with a thick black outline drawn outside the letters and a hard dark drop shadow, across the upper middle of the frame, clear of her face. It is the only text in the image; no watermark.
Subjects: @Avatar1, chest-up, on the left third <identity lock as above>. Wearing the white robe from the video. Expression: one eyebrow raised high, head tilted, lips pressed to one side.
Key elements: The serum bottle, large in the foreground, label sharp and facing the camera.
Background: Her bright bathroom from the video, softly out of focus, with a vignette.
```

**A YouTube video, title "I tried the cheapest phone": Posed portrait with Added text, 16:9.**
The words add to the title: Text block "reading exactly "IT WORKS?" ... on the left half";
Subjects "head and shoulders, on the right third"; Key elements "a plain black smartphone,
oversized, held up beside her face" (never another brand's phone); the 16:9 Keep clear line;
`"aspect_ratio": "16:9"`.

## 9. Before you send it

Any "no" means fix the brief first.

- The tool and model fit the frame (section 2), with `resolution: "2K"` and `count: 1`.
- The Frame block is first and the Grade block is last.
- Every person in frame has the identity lock and the lighting rig.
- A reference cover is NOT among the inputs (section 12).
- No words were ordered: the clean Text line is there. Words were ordered: they are in double
  quotes after "reading exactly", and the line says it is the only text.
- Two or more images: the References line opens the brief.
- Every `<placeholder>` is filled.
- Variants of one concept differ only in the expression or take line.

## 10. Changing one thing

A change to a cover the person picked is a new paid run on that cover, quoted like any run.
The picked cover goes in `other_elements` as `@Input1`: a take made here (its `asset_id`), a
file from the library, or a file link the person sends.

- **One scope per run.** Name the one thing that changes and say everything else stays
  exactly as it is, pixel for pixel.
- **Each accepted result is the next run's input.** Chain edits; never start again from the
  first take.
- **Never redraw the whole cover for a small change** without saying so and asking.

| Scope | Call | The brief |
|---|---|---|
| The expression | `bytedance-seedream-v4-5-edit`, `avatar_id` passed (the avatar goes in as `@Avatar1`) | "Change ONLY the person's expression in @Input1 to: <wording>. They stay exactly the same person as @Avatar1. Keep the identity, face shape, hair, pose, body, clothes, logo, background, lighting rig and layout exactly as in @Input1, pixel for pixel." |
| The background, replaced | `bytedance-seedream-v4-5-edit`, `include_avatar: false` | "Replace ONLY the background of @Input1 with <new background>. Rebuild the light falling on the person so the new background's direction and colour read naturally on them. Everything else exactly as in @Input1." |
| The background, recoloured | `bytedance-seedream-v4-5-edit`, `include_avatar: false` | "Shift ONLY the background's colours in @Input1 to <colours>, keeping its shapes, blur and vignette. Everything else exactly as in @Input1." |
| The rim light, recoloured | `bytedance-seedream-v4-5-edit`, `include_avatar: false` | "Change ONLY the rim light around the hair and shoulders in @Input1 to <name> (<hex>). The key and fill light on the face stay exactly as they are. Everything else exactly as in @Input1." |
| The headline's words, look or place | `gpt-image-v2-edit`, `include_avatar: false`, `quality: "Medium"` | "Keep @Input1 exactly as it is, except: the headline now reads exactly "<WORDS>", same lettering, size and place. It is the only text in the image." |

- **Frames on the edit models.** `bytedance-seedream-v4-5-edit` takes `params.image_size`, not
  `aspect_ratio` or `resolution`: `portrait_16_9` for a 9:16 cover, `landscape_16_9` for 16:9,
  `portrait_4_3` for 3:4. It has no 4:5: a 4:5 cover is edited on the default model
  (`nano-banana-pro-edit`, `aspect_ratio: "4:5"`, `resolution: "2K"`), which keeps the frame.
  Never `auto_4K`. `gpt-image-v2-edit` has no 4:5 either: a 4:5 headline change also goes to
  the default model.
- **When the edit model fails or refuses** (refunded): the same edit once on
  `gpt-image-v2-edit`, same frame, `quality: "High"`, quoted. If that fails too, stop and say
  so; do not loop.
- After two stacked edits the face can drift. If it does, run the original brief again with
  the changes written into it.
- Turn vague feedback into one scope first and say it: "more punch" becomes the rim light in
  lime; "she looks bored" becomes shock.

## 11. A 3D logo

When the person wants their flat logo as a glossy object on the cover. One run first, then its
result goes in every cover call of the set as the logo input (the last image in
`other_elements`).

```json
{
  "tool": "photo-edit",
  "model": "gpt-image-v2-edit",
  "brand_id": "<brand id>",
  "include_avatar": false,
  "inputs": { "other_elements": ["<logo asset id>"] },
  "prompt": "Turn the flat logo in @Input1 into a premium 3D logo render: the exact logo shapes extruded into glossy volumes, every letter, proportion and brand colour kept exactly; soft studio reflections, subtle bevels, crisp edges; a clean dark neutral background with a soft contact shadow; centred with generous margins. It is the only thing in the image; no extra text, no watermark.",
  "params": { "aspect_ratio": "1:1", "resolution": "2K", "quality": "High" },
  "count": 1
}
```

Quote it with the covers as one batch. Check the letters of the 3D logo against the original
before it goes on any cover. A flat logo stays flat unless the person asks.

## 12. A reference cover

A cover the person likes (a link or a picture in the chat) is art direction, never an input.

1. **Ask once**, unless they already said "match" or "inspired by": "Match this reference
   (recommended): its style, layout and energy" or "Unique take: loose inspiration".
2. **Read it with your own eyes** into these fields. Never pass it to a tool.

| Field | What to write |
|---|---|
| brief | the concept in one sentence |
| pose | the subject's pose and action, described generically, never who they are |
| elements | the props and effects |
| location | the place, if any |
| composition | where things sit and how big |
| background | colour, texture, blur |
| split | yes or no |
| panels | how many, when split |
| people | 0 to 3 |
| expression | one of the eleven (concepts, section 6), or "other" |
| expression detail | one vivid sentence: eyes, brows, mouth, head angle |

3. **Match**: carry the fields into the blocks one by one; the person's own instructions
   override any field. The reference's pose goes to the avatar. Never add a person the
   person did not ask for, and never copy the reference's identity, logo or exact design.
   **Unique take**: keep only its energy and palette; pick the concept from the video.
4. A real person in the reference stays out unless the person sends that person's own photo,
   with their consent (house rules, section 7).

## 13. Special cases

- **Nobody and no image** (a scene, a place, a graphic): `text-to-photo`,
  `model: "nano-banana-pro"`, the frame's `aspect_ratio`, `resolution: "2K"`, and never
  `avatar_id` (it is refused). Drop the Subjects block and the identity lock.
- **A product and nobody**: `photo-edit` with `include_avatar: false` and the product in
  `other_elements`; no Subjects block.
- **Two avatars**: the second avatar's `image_url` from `get_avatar` in `inputs.characters`
  (use it at once: the link expires). The first avatar goes in by itself. Each gets its own
  lock, side and expression.
- **The person's own face** instead of the avatar: only when it is them, or they have the
  pictured person's permission (house rules, section 7). Their photo link in
  `inputs.characters` and `include_avatar: false`; the lock names that reference.
- **A logo**: the logo file in `other_elements` after the product. Small lettering in a logo can
  come out slightly wrong: check it. Skip it when the cover words already name the brand: the
  account name shows beside every post anyway.
- **A series**: write the first cover's brief, get a yes on the look, then reuse it word for
  word for every episode, changing only the words, the expression and the episode number
  ([concepts](concepts.md), section 10).
