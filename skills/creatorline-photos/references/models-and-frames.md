# Models and frames

The photo models the connector offers, the exact values each one takes, its slots, and what
changes the price. The person is never asked for a model: you pick it by what the frame needs
and say what the choice does ("this one renders words cleanly"), not its name. The schema of
the `generate_photo_edit` or `generate_text_to_photo` tool is the live truth; check it before
the first call.

## Contents

1. [Which model](#1-which-model)
2. [Exact values](#2-exact-values)
3. [Frames by destination](#3-frames-by-destination)
4. [Slots and how to name them](#4-slots-and-how-to-name-them)
5. [What changes the price](#5-what-changes-the-price)
6. [What the server does with the brief](#6-what-the-server-does-with-the-brief)

## 1. Which model

**`generate_photo_edit`** (the avatar, the person's products, any photo edit):

| `model` | Use it for | Trade-off |
|---|---|---|
| `nano-banana-pro-edit` (default: leave `model` out) | Every photo of the avatar; products; flat lays | Keeps the face best. No `9:16`. |
| `gpt-image-v2-edit` | A frame with readable words; a `9:16` frame with words; a product shot with nobody in it ([product modes](product-modes.md)) | Renders words and products well; softens skin a little; at `Medium` about the default's price on a vertical frame, more on a square one; no `4:5` |
| `gpt-image-v2-5-flare-edit` / `gpt-image-v2-5-sunburst-edit` | The same jobs, on the newer GPT Image (Sunburst slower, for finer detail) | Newer and less proven here than `gpt-image-v2-edit`; five qualities; no `4:5` |
| `bytedance-seedream-v4-5-edit` | A `9:16` frame without words; a cheaper set | Takes `image_size`, not `aspect_ratio` or `resolution`; about half the default; may hold the face a little less closely |
| `nano-banana-2-edit` | A styled frame: a cartoon, anime, clay or illustrated avatar ([shot types](shot-types.md), section 13) | No `4:5`; at `2K` it costs what the default does; not for photos |
| `nano-banana-2-1-edit` | A cheaper photo edit, a `9:16` frame without words | The newer Nano Banana 2; has `4:5` and `9:16`; less proven on the avatar's face than the default |

**`generate_text_to_photo`** (a picture from words alone, nobody and nothing real in it):

| `model` | Use it for |
|---|---|
| `nano-banana-2-text-to-image` (default: leave `model` out) | Views, food, rooms, textures, backgrounds |
| `nano-banana-pro` | The same, when the default's result looks flat |
| `gpt-image-v2-text-to-image` | A background or card with readable words and no photo input |
| `nano-banana-2-1-text-to-image` | The default's jobs, on the newer Nano Banana 2 |
| `gpt-image-v2-5-flare-text-to-image` / `gpt-image-v2-5-sunburst-text-to-image` | Words in a picture with no photo input, on the newer GPT Image |

## 2. Exact values

Spelled exactly as here; a value not listed is refused before anything is charged.

| `model` | `aspect_ratio` | `resolution` | Other |
|---|---|---|---|
| `nano-banana-pro-edit` | `auto` (default), `1:1`, `1:4`, `1:8`, `2:3`, `3:2`, `3:4`, `4:1`, `4:3`, `4:5` | `1K` (default), `2K`, `4K` | |
| `nano-banana-2-edit` | `Auto` (default), `1:1`, `1:4`, `4:1`, `1:8`, `8:1`, `2:3`, `3:2`, `3:4`, `4:3` | `1K` (default), `2K`, `4K` | |
| `gpt-image-v2-edit` | `auto`, `1:1`, `2:1`, `3:1`, `2:3`, `3:2`, `3:4`, `4:3`, `16:9`, `9:16` (default), `21:9` | `1K`, `2K` (default), `4K` | `quality`: `Low`, `Medium` (default), `High` |
| `gpt-image-v2-5-flare-edit`, `gpt-image-v2-5-sunburst-edit` | as `gpt-image-v2-edit` | `1K`, `2K` (default), `4K` | `quality`: `Low`, `Medium`, `High` (default), `XHigh`, `Max` (their `High` costs what GPT 2's `Medium` does) |
| `nano-banana-2-1-edit` | `Auto` (default), `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9` | `1K` (default), `2K`, `4K` | |
| `bytedance-seedream-v4-5-edit` | none | none | `image_size`: `square_hd`, `square`, `auto_2K` (default), `auto_4K`, `portrait_4_3`, `landscape_4_3`, `portrait_16_9`, `landscape_16_9` |
| `nano-banana-2-text-to-image` | `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16` (default), `16:9`, `21:9` | `1K` (default), `2K`, `4K` | |
| `nano-banana-pro` | `21:9`, `16:9`, `3:2`, `4:3`, `5:4`, `1:1`, `4:5`, `3:4`, `2:3`, `9:16` (default) | `1K` (default), `2K`, `4K` | |
| `gpt-image-v2-text-to-image` | as `gpt-image-v2-edit` | `2K` (default) | `quality` as above |
| `gpt-image-v2-5-flare-text-to-image`, `gpt-image-v2-5-sunburst-text-to-image` | as `gpt-image-v2-edit` | `2K` (default) | `quality` as the 2.5 edits |
| `nano-banana-2-1-text-to-image` | `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16` (default), `16:9`, `21:9` | `1K` (default), `2K`, `4K` | |

- Always pass `aspect_ratio` (or `image_size`) and `resolution: "2K"`: the defaults differ from
  model to model, and `auto` leaves the shape to the model.
- Never `4K` or `auto_4K` (house rule).
- Alternatives come from `count` (1 to 4) on the tool, never from a `params` key.
  Every model here also lists `num_images`: leave it out, the server sets it from `count`.
- `gpt-image-v2-*` (2.5 included) and Seedream offer no `4:5`. `3:4` is the one frame every model has
  (`portrait_4_3` on Seedream), which is why a set defaults to it.

## 3. Frames by destination

| Where it goes | Frame | Model |
|---|---|---|
| A carousel for Instagram and TikTok (default) | `3:4` | default; `gpt-image-v2-edit` for a word frame |
| Instagram only, every frame on the default model | `4:5` or `3:4` | default |
| A TikTok-only photo carousel that should fill the screen | `9:16` | Seedream `portrait_16_9`; `gpt-image-v2-edit` `9:16` for words |
| A story, or a still to animate with `generate_photo_to_video` | `9:16` | as above |
| One outfit photo, the whole body | `2:3` | default |
| A square grid post, a product tile | `1:1` | default; `gpt-image-v2-edit` when nobody is in it |
| A shop listing (studio shot) | `1:1` | `gpt-image-v2-edit` |
| A Pinterest pin | `2:3` | `gpt-image-v2-edit` with nobody in it; default with the avatar |
| A website, email or campaign banner | `16:9`, or `21:9` for a slim strip | `gpt-image-v2-edit`; `3:2` on the default with the avatar in it |
| An ad pack | `1:1`, `4:5` and `9:16` | `gpt-image-v2-edit` for `1:1` and `9:16`, default for `4:5` |

Every frame of one carousel shares one frame shape.

## 4. Slots and how to name them

`generate_photo_edit` models share three image slots. Every image goes to the model in one list, each
with its role. The writer looks at the first four (the avatar first), so with more inputs than
that, say in words what the later ones show.

| Slot | Holds | Name it in the brief |
|---|---|---|
| `characters` (up to 4) | The avatar's face, added first by itself; a second avatar's `image_url` after it | `@Avatar1`, `@Avatar2` |
| `location` | A photo of a real place | `@Location1` |
| `other_elements` | Products, garments, a style or pose reference, a photo to change | `@Input1`, `@Input2` (in file order) |

- `include_avatar: false` keeps the avatar out: product shots, flat lays, a locked look.
- With `include_avatar: false` and no image at all, the run becomes a words-only picture: use
  `generate_text_to_photo` for that instead.
- `generate_text_to_photo` has no slots. An `avatar_id` there is refused.

## 5. What changes the price

Never quote from this file: the `needs_approval` answer of the tool is the price.
To plan:

- Photos are priced per image: `count: 3` costs three images.
- The default model costs the same at `1K` and `2K`; `4K` doubles it.
- `gpt-image-v2-edit` at `Medium` and `2K` costs about the default's price on a vertical or wide
  frame and about half again on `1:1` and the near-square frames; `High` several times `Medium`;
  `Low` less, and it shows. The 2.5 models price the same way, their `High` as GPT 2's `Medium`.
- `nano-banana-2-1-*` costs about half the default at `1K` and less than it at `2K`.
- Seedream costs about half the default.
- `generate_text_to_photo`'s default costs about the same as the default edit at `2K`, half at `1K`.
- The prompt and the number of input photos do not change a photo's price.

## 6. What the server does with the brief

- Both tools always send the `prompt` to the server's writer, which turns it into the
  image prompt. There is no word-for-word mode here (only a workflow node with Enhance off has
  one: creatorline-workflows).
- On `generate_photo_edit` the writer sees the attached images, their roles and the avatar's
  persona, and writes an edit instruction that keeps the avatar's identity. It puts a person in only
  when the brief asks for one.
- It reads a product page link in the brief for facts, and never invents beyond it.
- It is not phone-locked: without "casual phone photo" and a cue or two it drifts toward a
  polished, shallow-focus look.
- A URL in an input slot must be the image file itself, never a web page (refused before any
  charge).
