# Cover briefs

How to turn the concept into a call that draws the right cover: the call, the brief line by
line, the word styles, where things go in each frame, worked examples, and how to change one
thing on a cover already made.

## Contents

1. [How the brief is used](#1-how-the-brief-is-used)
2. [The call](#2-the-call)
3. [The brief, line by line](#3-the-brief-line-by-line)
4. [Word styles](#4-word-styles)
5. [Where things go in each frame](#5-where-things-go-in-each-frame)
6. [Examples](#6-examples)
7. [Changing one thing](#7-changing-one-thing)
8. [Special cases](#8-special-cases)

## 1. How the brief is used

`create_generation` hands your `prompt` to Creatorline's image writer, which turns it into the
instruction the image model gets ([video briefs](video-briefs.md), section 15). The writer
keeps the avatar's face from the avatar reference, adds the avatar's persona, and builds what
the brief asks for. It knows nothing about covers: the parts of the frame the apps hide, the
headline, the contrast. Say those yourself, in plain sentences.

- Put the cover words in double quotes, in capitals as they must appear, after "reading
  exactly". Spell an unusual word the same way every time you write it.
- Say what is there, never "no X": "the headline is the only text in the image", "a plain red
  background" (video briefs, section 9).
- Name inputs plainly: "the avatar" for the face that goes in by itself, `@Input1`, `@Input2`
  for images in `other_elements`, in the order you pass them; `@Avatar2` for a second face in
  `characters`.
- Write the brief in English. The words on the cover stay in their own language.
- About 120 to 200 words: one line per item of the template below. No camera brands, no style
  names of real creators, no prompt syntax.
- The writer always rewrites the brief; `create_generation` has no word-for-word mode. What you
  state plainly and once (the exact words, the side, the band) survives the rewrite best.

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
  "count": 2
}
```

| Field | Value | Why |
|---|---|---|
| `tool` | `photo-edit` | Every picture of the avatar. With no person and no image to work from: `text-to-photo` (section 8) |
| `model` | `gpt-image-v2-edit` | Draws words best and has `9:16` and `16:9`. The tool's default model has neither. Never name it to the person |
| `aspect_ratio` | `9:16`, `16:9` or `3:4` | Where the cover goes (SKILL.md, "Pick the frame"). The model also takes `1:1` |
| `resolution` | `2K` | Sharp in every app. Never `4K`. `1K` costs about half, fine for a rough look |
| `quality` | `Medium` | `High` costs about three and a half times as much. Try it only after the words came out wrong twice |
| `count` | `2` | Two takes of one brief in one call, one quote. Up to 4 |
| `inputs.other_elements` | the product, a logo | Only what the cover shows. Leave it out otherwise |

Read the slot keys and values from `list_models` with `tool: "photo-edit"` once if anything is
refused; never guess a value.

## 3. The brief, line by line

```
Frame: A bold <vertical cover image for a TikTok video | wide YouTube thumbnail | first slide of a photo carousel>, poster-like, one continuous scene.
Person: The avatar, <chest-up | head and shoulders | waist-up>, large in the frame on the <left | right> third, <expression>, <looking into the lens | looking at the product>. Exactly the same face, hair, skin tone and age as the avatar reference. Wearing <the outfit from the video>.
Product: <She holds @Input1 toward the lens at chest height, label facing the camera.>
Words: Very large headline text reading exactly "<WORDS>", <word style>, <where>, clear of the face. The headline is the only text in the image.
Background: <a plain, saturated <colour> background that darkens toward the edges | <the place from the video>, softly out of focus>.
Light: Bright, flattering light on the face and a thin bright rim of light along the hair and shoulders.
Finish: Crisp, vivid, high contrast; the face and the words are the sharpest things in the image.
Keep clear: <the frame's line from section 5>
```

| Line | Notes |
|---|---|
| Frame | Name the destination: it sets the composition. "Poster-like" is right for a cover even though the video is phone-shot |
| Person | Big: the face is about half of a 9:16 cover, a third of a 16:9 one. Expression wording from [concepts](concepts.md), section 6. Same outfit as the video, so the cover tells the truth about it |
| Product | Only when the concept shows it. Skip the line otherwise |
| Words | The exact words, the style (section 4), the place (section 5). The headline is always the only text |
| Background | A colour field for Big face, Statement, Big number. The video's own place, blurred, for Frozen moment, Product close up, Setting hero. Pick a colour that is neither the skin nor the outfit |
| Light | A coloured rim only when the brand has a colour the person named |
| Finish | For a calm or premium brand: "clean, soft, natural colours; the face and the words are the sharpest things in the image" |
| Keep clear | Always. It keeps the face and the words out of what the apps cover |

## 4. Word styles

| Style | Write in the brief | Best on |
|---|---|---|
| Bold white (default) | heavy white capital letters in a condensed sans-serif, with a thick black outline and a hard dark drop shadow | any background |
| Yellow punch | heavy yellow capital letters with a thick black outline | blue, green, purple or dark backgrounds |
| Label band | heavy black capital letters on a solid white band, like a sticker | busy backgrounds, a blurred real place |
| Two-tone | heavy white capital letters with a thick black outline, the word "<KEY>" in bright <colour> | a number or one key word |
| Clean | white bold sans-serif in sentence case on a dark, half-transparent rounded box | calm or premium brands |

- One style per cover, and one per series.
- Two lines at most. A number on its own line reads fastest.
- Never a script or thin serif face for the headline: it disappears at thumbnail size.

## 5. Where things go in each frame

**9:16 (TikTok, Reels, Shorts).** TikTok and Reels lay their own buttons and text over a playing
video: about the top 13 % and the bottom 22 % of the frame, and a column on the right from the
middle down. Profile grids show the cover cut to about 3:4, which takes roughly an eighth off the
top and the bottom. One band survives both:

> Keep clear: the face and the words sit in the middle of the frame, below the top seventh,
> above the bottom quarter, and away from the right edge in the lower half.

- Face in the upper middle, words beside it or just above it. A number can sit at chest height.
- On TikTok's profile grid the view count sits at the bottom left of each tile.

**16:9 (YouTube thumbnail).**

> Keep clear: the bottom-right corner stays plain, the words sit on the left half, the face on
> the right third, both well inside the edges.

- The video length badge covers the bottom-right corner.
- Words a little larger than on a vertical cover: a 16:9 thumbnail is often seen very small.

**3:4 (the first slide of a carousel).**

> Keep clear: the face and the words sit well inside the edges, in the middle of the frame.

## 6. Examples

**A talking video, "3 mistakes new runners make" (Big face + Big number, 9:16).**

```json
{
  "tool": "photo-edit",
  "model": "gpt-image-v2-edit",
  "brand_id": "<brand id>",
  "avatar_id": "<Mia>",
  "prompt": "Frame: A bold vertical cover image for a TikTok video, poster-like, one continuous scene.\nPerson: The avatar, chest-up, large in the frame on the right third, eyes wide, eyebrows high, mouth open in a gasp, looking into the lens. Exactly the same face, hair, skin tone and age as the avatar reference. Wearing the grey running jacket from the video.\nWords: Very large headline text reading exactly \"3 MISTAKES\" on two lines, heavy white capital letters in a condensed sans-serif with a thick black outline and a hard dark drop shadow, on the left side in the upper middle of the frame, clear of her face. The headline is the only text in the image.\nBackground: A plain, saturated red background that darkens toward the edges.\nLight: Bright, flattering light on her face and a thin bright rim of light along her hair and shoulders.\nFinish: Crisp, vivid, high contrast; her face and the words are the sharpest things in the image.\nKeep clear: the face and the words sit in the middle of the frame, below the top seventh, above the bottom quarter, and away from the right edge in the lower half.",
  "params": { "aspect_ratio": "9:16", "resolution": "2K", "quality": "Medium" },
  "count": 2
}
```

**A serum review (Product close up + Open question, 9:16).** Brief, with the serum photo as
`inputs.other_elements[0]`:

```
Frame: A bold vertical cover image for an Instagram Reel, poster-like, one continuous scene.
Person: The avatar, chest-up, on the left third, lips pressed together and eyes narrowed in a sideways look at the bottle. Exactly the same face, hair, skin tone and age as the avatar reference. Wearing the white robe from the video.
Product: She holds @Input1 toward the lens at chest height, large in the foreground, label facing the camera.
Words: Very large headline text reading exactly "WORTH IT?", heavy yellow capital letters with a thick black outline, across the upper middle of the frame, clear of her face. The headline is the only text in the image.
Background: Her bright bathroom from the video, softly out of focus.
Light: Bright, flattering light on her face and the bottle, a thin bright rim of light along her hair.
Finish: Crisp, vivid, high contrast; her face, the bottle and the words are the sharpest things in the image.
Keep clear: the face, the bottle and the words sit in the middle of the frame, below the top seventh, above the bottom quarter, and away from the right edge in the lower half.
```

**A YouTube video, title "I tried the cheapest phone" (Open question, 16:9).** The words add to
the title instead of repeating it:

```
Frame: A bold wide YouTube thumbnail, poster-like, one continuous scene.
Person: The avatar, head and shoulders, on the right third, one eyebrow raised and a small half smile, looking into the lens, holding a plain black smartphone up beside her face. Exactly the same face, hair, skin tone and age as the avatar reference.
Words: Very large headline text reading exactly "IT WORKS?", heavy white capital letters with a thick black outline and a hard dark drop shadow, on the left half, clear of her face. The headline is the only text in the image.
Background: A plain, saturated blue background that darkens toward the edges.
Light: Bright, flattering light on her face and a thin bright rim of light along her hair and shoulders.
Finish: Crisp, vivid, high contrast; her face and the words are the sharpest things in the image.
Keep clear: the bottom-right corner stays plain, the words sit on the left half, the face on the right third, both well inside the edges.
```

With `"aspect_ratio": "16:9"`. The phone is a plain one: never another brand's product.

**A product with no person (Product close up, 9:16).** `"include_avatar": false`, the product
in `other_elements`, and no person in the brief:

```
Frame: A bold vertical cover image for a TikTok video, poster-like, one continuous scene.
Product: @Input1, large in the centre of the frame, standing upright, label facing the camera.
Words: Very large headline text reading exactly "FIRST LOOK", heavy black capital letters on a solid white band, across the upper middle of the frame. The headline is the only text in the image.
Background: A plain, saturated teal background that darkens toward the edges.
Light: Bright studio light on the product with a soft shadow under it.
Finish: Crisp, vivid, high contrast; the product and the words are the sharpest things in the image.
Keep clear: the product and the words sit in the middle of the frame, below the top seventh, above the bottom quarter.
```

## 7. Changing one thing

A fix to a cover the person likes is a new paid run on that cover. The cover goes in
`other_elements` as `@Input1`: a take made here (its `asset_id`), a file from the library
(`list_assets`), or a file link the person sends. The brief opens with the keep sentence, then
the change lines.

```json
{
  "tool": "photo-edit",
  "model": "gpt-image-v2-edit",
  "brand_id": "<brand id>",
  "include_avatar": false,
  "inputs": { "other_elements": ["<the picked cover's asset id>"] },
  "prompt": "Keep @Input1 exactly as it is: the person, the pose, the background, the colours and the layout, except for what follows. The headline now reads exactly \"2 MISTAKES\", same lettering, size and place. The headline is the only text in the image.",
  "params": { "aspect_ratio": "9:16", "resolution": "2K", "quality": "Medium" }
}
```

| Change | `include_avatar` | The change line says |
|---|---|---|
| The words | `false` | The headline now reads exactly "<WORDS>", same lettering, size and place. |
| The background colour | `false` | The background is now a plain, saturated <colour> background that darkens toward the edges. |
| The word colour or style | `false` | The headline's lettering is now <style>, same words, size and place. |
| Where the words sit | `false` | The headline now sits <place>, same words, lettering and size. |
| The expression | leave it out and pass `avatar_id`: the avatar goes in as `@Avatar1`, the face to keep | The person's expression is now <wording>. They stay exactly the same person as @Avatar1. |

- Up to two of the first four in one run, one line each. The expression is a run of its own.
- End every brief with "The headline is the only text in the image."
- Keep the same `aspect_ratio` as the cover, or the frame changes.
- Each run starts from the cover it is given. After two edits in a row the face can drift: if
  it does, run the original brief again with the changes written into it.

## 8. Special cases

- **No person and no image to work from** (a scene, a place, a statement on a background):
  `tool: "text-to-photo"`, `model: "gpt-image-v2-text-to-image"`, the same `params` and
  `count`, and never `avatar_id` (it is refused). The brief describes the whole scene.
- **Two avatars** (a This or that between two hosts): the second avatar's `image_url` from
  `get_avatar` in `inputs.characters`. The first avatar goes in by itself. Brief: "the avatar on
  the left, @Avatar2 on the right", with an expression each.
- **The person's own face** instead of the avatar: only when it is them, or they have the
  pictured person's permission (house rules, section 7). Their photo link in
  `inputs.characters` and `include_avatar: false`.
- **A logo**: the logo file in `other_elements` after the product. Brief: "the logo from
  @Input2, small, in the top-left corner, its shapes and colours unchanged." Small lettering in
  a logo can come out slightly wrong. Skip it when the cover words already name the brand: the
  account name shows beside every post anyway.
- **Someone else's cover they like** (a link or a picture in the chat): look at it if you can,
  and write its layout, colours and word style into the brief in your own words. Never pass it
  as an input, and never copy its face, logo or exact design. Their OWN cover to change is
  section 7.
- **A series**: write the first cover's brief, get a yes on the look, then reuse the brief word
  for word for every episode, changing only the words, the expression and the episode number
  ([concepts](concepts.md), section 8).
