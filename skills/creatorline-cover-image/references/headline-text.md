# Headline text

Read this only when a cover carries words. It says when the words go on, the rules that make
a headline read in a feed, the five looks, the letter shapes, and the two ways to put words on:
drawn into the image, or typed over it exactly.

## Contents

1. [When the cover carries words](#1-when-the-cover-carries-words)
2. [What makes a headline read](#2-what-makes-a-headline-read)
3. [The five looks](#3-the-five-looks)
4. [Letter shapes](#4-letter-shapes)
5. [Drawn into the image](#5-drawn-into-the-image)
6. [Typed over it, exactly](#6-typed-over-it-exactly)
7. [Before you show it](#7-before-you-show-it)

## 1. When the cover carries words

- **Clean by default.** With no word about text from the person, the cover is a clean picture
  with one quarter left free for a headline. Say so in the defaults line.
- **Drawn in** when the person asks for words, gives a headline, or picks a framework built on
  words (concepts, section 5). The image model draws them (section 5).
- **Typed** when the words must be exact (a name, a long or unusual word, letters with marks,
  a number with units) or the person wants to change them later: the clean cover, then the
  words typed over it (section 6).
- Delivered covers are one of three: **clean**, **ready for a headline** (clean, with the free
  quarter kept), or **with the headline drawn in**. Say which in the result card.

## 2. What makes a headline read

Six things together; drop one and the headline goes flat.

| Trait | Value |
|---|---|
| Letters | A heavy, condensed sans-serif, one weight |
| Case | ALL CAPS |
| Outline | Thick: 8 to 14 % of the capital letters' height, drawn OUTSIDE the letters, under the fill. An outline over the fill eats half of every letter |
| Shadow | Hard and dark, pushed downward, like a sticker |
| Colour | One punch colour per headline (white, a yellow to red fire gradient, acid lime); a second line may take one accent colour |
| Spacing | Tight: letters almost touching, lines stacked close (line height about 0.9) |

Placement:

- **2 to 4 words.** A headline, not a sentence.
- **Never on a face.** In a free quarter: beside the face, above it, or in a corner the frame
  leaves clear ([cover briefs](cover-briefs.md), section 5).
- **Large.** On 16:9, capital letters 12 to 18 % of the frame's height. On 9:16 and 4:5 that
  would run off the narrow width: make the longest word as wide as the margins allow, on two
  lines (usually capitals about a tenth of the height). When in doubt, bigger.
- **Margins.** Inside the frame with comfortable padding, never touching an edge; on 16:9 a
  bottom headline sits about 6 % above the bottom edge, away from the length badge in the
  bottom-right corner. On 9:16 never in the bottom quarter.

## 3. The five looks

What to write in the Text block for each. One look per cover, one per series.

| Look | Write in the brief | Best on |
|---|---|---|
| Bold white (the default) | heavy white condensed capital letters with a thick black outline drawn outside the letters and a hard dark drop shadow, like a sticker | any background |
| Fire | heavy condensed capital letters filled with a gradient from yellow (#FFE24B) through orange (#FF9A1F) to red (#FF2E2E) top to bottom, a thick near-black outline outside the letters, a warm orange glow and a hard dark drop shadow | dark, blue or purple backgrounds |
| Neon lime | heavy acid-lime (#D4FF3F) condensed capital letters with a thick near-black outline outside the letters, a soft lime glow and a hard dark drop shadow | dark backgrounds, tech and gaming |
| Clean glass | white bold sans-serif capital letters on a frosted, half-transparent dark rounded pill, with a soft wide shadow under the pill | calm or premium brands, busy backgrounds |
| Marker | heavy black condensed capital letters on bright lime (#D4FF3F) bands behind each line, like a highlighter, with a hard dark shadow under the bands | light backgrounds, playful brands |

- Two lines: one may take an accent ("I SPENT" in white over "100 DAYS" in lime).
- A number on its own line reads fastest.

## 4. Letter shapes

The image model takes a letter shape described in words; a typeface name is only a hint
("tall condensed capitals like Bebas Neue"). Pick by the brand's voice.

| Shape | Examples | Use |
|---|---|---|
| Heavy condensed (the default) | Anton, Bebas Neue, Oswald, Archivo Black | Any headline; takes the full thick outline |
| Bold workhorse | Montserrat Black, Poppins ExtraBold, Roboto Condensed Bold, Inter ExtraBold, Barlow Condensed ExtraBold | Modern, friendly or neutral brands |
| Soft serif | Playfair Display, Cormorant Garamond, DM Serif Display, Fraunces | Lifestyle, fashion, beauty, calm brands |
| Script | Sacramento | A small second line only, never the main word: a script fails the 120 px test |

- A serif or a script clogs under a thick outline: a thin one (3 to 6 % of the capital height)
  or none, with a soft drop shadow instead.
- Never a thin face for the main word.

## 5. Drawn into the image

The Text block, in [cover briefs](cover-briefs.md) section 3:

```
Text: One bold headline drawn into the image, reading exactly "<WORDS>", <the look's wording from section 3>, <where: the left third, upper middle, ...>, never over a face. It is the only text in the image; no watermark.
```

- The words in double quotes, in capitals, exactly as they must appear. Spell an unusual word
  the same way every time.
- On 9:16 and 16:9 the call is `gpt-image-v2-edit`, which draws words best; on 4:5 and 3:4 the
  default edit model (cover briefs, section 2).
- Check every letter (section 7). A wrong letter is a retake of the same brief, or the words
  typed instead (section 6).

## 6. Typed over it, exactly

Typed words are always spelled right and stay editable. The cover itself is made clean, with
the free quarter named in the Composition block.

- **On a video's cover frame (9:16).** The clean cover goes in front of the video in Video
  Studio ([using the cover](using-the-cover.md), section 3), and the words go over it in the
  same `create_video` or `edit_video` call:

  ```json
  { "op": "add_text", "text": "3 MISTAKES", "start": 0, "end": 2, "position": "top", "size": "xl", "look": "tiktokOutline" }
  ```

  The nearest typed looks: Bold white is `tiktokOutline`, Clean glass is `tiktokTranslucent`,
  Marker is `tiktokHighlight` (dark words on a white plate). Fire and Neon lime have no typed
  version. Typed words stay inside the apps' safe area by themselves, and held for 2 s they
  are the video's hook too.
- **Know the limit.** The biggest typed size (`xl`) is far smaller than a drawn headline: it
  reads as a hook line, not as a poster headline. When the headline must be both big and exact,
  draw it and check every letter, retaking if needed.
- **On a still (a carousel slide, a 9:16 or 4:5 image).** The app's slides page types words
  onto a photo and saves it as a picture, in vertical or square frames, not 16:9:
  https://app.creatorline.io/brands/<brand id>/generate/slides. Give it as a link named
  "Slides page", with the clean cover's name.
- **A 16:9 thumbnail** has no typed path here: draw the words in, or hand over the clean
  thumbnail for the person to add words in their own editor.
- A frame from `preview_video` is a picture for you to check, never a deliverable cover.

## 7. Before you show it

- The words, letter by letter, exactly as briefed, in that order, and nothing else written
  anywhere: no extra words, logos or watermarks.
- All caps, 2 to 4 words.
- The outline sits outside the letters; no letter is thinned or eaten by it.
- Not on a face; inside the frame's keep-clear band, off the edges.
- One punch colour (and at most one accent line).
- At about 120 px wide, the words still read.
