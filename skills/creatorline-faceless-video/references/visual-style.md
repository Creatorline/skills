# Visual style

How every picture in one video comes out in the same look, how to write picture and motion
briefs, how to keep the video faceless, and where stock and realistic footage fit.

## Contents

1. [One look for the whole video](#1-one-look-for-the-whole-video)
2. [Looks to offer](#2-looks-to-offer)
3. [The picture brief](#3-the-picture-brief)
4. [Keeping it faceless](#4-keeping-it-faceless)
5. [Recurring figures and the thread](#5-recurring-figures-and-the-thread)
6. [Words in pictures](#6-words-in-pictures)
7. [When the look drifts: the reference route](#7-when-the-look-drifts-the-reference-route)
8. [Motion briefs](#8-motion-briefs)
9. [Stock footage and realistic scenes](#9-stock-footage-and-realistic-scenes)
10. [Checking the pictures](#10-checking-the-pictures)

## 1. One look for the whole video

Consistency comes from two things, used together:

1. **The style line.** One sentence (25-50 words) naming the medium, the palette (two to four
   colors), the line and texture, the light and the finish. It goes into EVERY picture brief,
   word for word, as the first line. Never paraphrase it between pictures.
2. **The opening picture.** Made first with `count: 3`; the person picks one. That picture is
   the look everyone has agreed on. When later pictures drift from it, it becomes a reference
   (section 7).

The server's picture writer rewrites each brief into the final prompt, so a style named once
and vaguely gets lost. Named exactly and repeated, it holds. Illustrated looks end with "not a
photograph": the writer's own default is photoreal.

Never name a living artist, a studio, a film or a brand in a style line ("in the style of ...").
Describe what the look is made of instead.

## 2. Looks to offer

Offer two or three in the intake, the format's default first ([formats.md](formats.md), section
1). Tell the person what a look IS, in a few words; the style line is for the brief.

| Look | Tell the person | Fits | Style line (paste word for word) |
|---|---|---|---|
| Paper collage | Cut paper layers, handmade | History, explainer | Layered paper cut-out collage with torn edges and soft shadows between the layers, warm cream paper background, a limited palette of ochre, teal and brick red, flat even light, handmade texture, an illustration, not a photograph. |
| Storybook watercolor | Soft painted picture book | Story, family-friendly | Loose watercolor and fine ink illustration, soft washes that bleed at the edges, a warm muted palette of sage, rose and sand, visible paper grain, gentle diffused light, an illustration, not a photograph. |
| Oil painting | Old master painting, moody light | History, eerie stories | Classical oil painting with visible brush strokes, deep shadows and a warm low glow, an earthy palette of umber, gold and dark green, a quiet dramatic mood, a painting, not a photograph. |
| Flat vector | Clean modern illustration | Explainer, top-N | Flat vector illustration with clean bold outlines, solid flat fills of even color, simple rounded shapes, a palette of navy, coral and mustard on a plain light background, an illustration, not a photograph. |
| Clay miniature | Tiny handmade clay world | Explainer, family-friendly, story | Handmade clay miniature scene, soft sculpted shapes with fingerprint texture, tiny tabletop scale with shallow focus, a pastel palette, soft daylight, a stop-motion look, not a photograph. |
| Silhouettes | Black shapes on glowing skies | Motivational, story | Bold solid black silhouettes against a glowing gradient sky of orange and deep purple, minimal detail, wide empty space, a graphic poster look, not a photograph. |
| Toy 3D | Bright, round, toy-like | Family-friendly | Soft 3D toy-like render, chunky rounded shapes with soft edges, glossy pastel colors of mint, peach and sky blue, bright even light, a clean simple background, not a photograph. |
| Realistic photos | Real-looking photographs | Top-N, motivational, explainer about real places | Realistic documentary photograph, natural light, true-to-life color, slight film grain, eye-level framing, unretouched. |

**The person's own look.** They describe one: write a style line from it in the same shape. They
send an image of a look: bring it in with `import_asset` (a link to the file) or find it with
`list_assets` (uploaded in the app), write the style line from what it shows (never copy its
people, words or logos), and use the image as the reference from the first picture on (section 7).

## 3. The picture brief

One brief per picture, `create_generation` with `tool: "text-to-photo"` and `brand_id`. Never
pass `avatar_id` to `text-to-photo` (it is refused). The frame is 9:16 by default.

```
Style: <the style line, word for word>
Scene: <what this beat shows: the main subject and what is happening, caught mid-moment>
Place: <where and when: the setting, the weather, the time of day>
Framing: <wide | medium | close-up | from above | low angle>, a tall vertical frame, the main subject in the upper middle
People: <only when a figure appears: role, age, build, clothes, seen from behind or in silhouette>
Thread: <only when the video has one: the thread object and its state in this beat>
```

- 40-90 words. Describe what is there; never "no X" (video-briefs.md, section 9).
- Show what the line names: a line about the keeper's logbook has the logbook in the picture.
- Vary the framing from beat to beat: never the same framing twice in a row. A wide shot opens a
  new place; after that, go closer or change the angle.
- The opening picture is the most striking, most specific image of the video.
- The lower third of the frame is for captions and the apps' buttons: keep it calm.
- Still pictures are shown as they are: `params: { resolution: "2K" }`, which costs more
  per picture. Pictures that will move can stay at the default.

## 4. Keeping it faceless

- **People are anonymous.** From behind, in silhouette, far away, as hands at work, faces under a
  hat brim or turned toward the scene. Faces drift from picture to picture, and a real person
  must never be recognizable.
- **Real people, living or historical, never get a likeness.** Name them in the narration; show a
  figure in the right clothes, from behind or far away. No celebrities, no politicians, no one who
  has not agreed.
- **The avatar stays out.** The server's picture writer knows the brand's avatar and leans toward
  it when a brief asks for "a woman" or "a man". Describe every figure fully (age, build, hair,
  clothes) and keep them anonymous. Animals, objects and places are the safest subjects.
- **No children in any picture.** Family-friendly videos use animals, toys, friendly creatures or
  adults ([formats.md](formats.md), section 9).

## 5. Recurring figures and the thread

- **A recurring figure** gets a figure line, written once and pasted word for word wherever he
  appears: "the keeper: a tall old man in a long yellow oilskin coat and a grey wool cap, always
  seen from behind". Same words, same clothes, every time.
- **The thread** (formats.md, section 3) gets its own line with its state in each beat: "the brass
  lamp, burning bright" in beat 1, "the brass lamp, flickering low" in beat 4.
- When a figure must match closely, make his first picture a full-figure shot on a plain
  background, then use it as a second reference (section 7).

## 6. Words in pictures

- Image models misspell. Describe signs, pages, screens, labels and maps as plain or blank.
- Titles, numbers, labels and dates go on as Video Studio text (`add_text`), where they are exact.
- When a word must be inside a picture (a ship's name in a story), `model:
  "gpt-image-v2-text-to-image"` on `text-to-photo` writes words best and costs more. Check the
  spelling before using it.

## 7. When the look drifts: the reference route

Use the chosen opening picture as a style reference for a picture that came out off-look, or for
every picture when the person sent a style image:

```json
{
  "tool": "photo-edit",
  "brand_id": "<brand id>",
  "include_avatar": false,
  "inputs": { "other_elements": ["<the opening picture's asset id>"] },
  "params": { "aspect_ratio": "2:3" },
  "prompt": "A new scene in exactly the art style of the reference picture: the same medium, palette, lines and texture, a different scene. Style: <style line>. Scene: <...>. Framing: <...>."
}
```

- `include_avatar: false` every time: without it the brand's avatar is put into the picture.
- `photo-edit` has no 9:16 frame; `2:3` is the closest it offers. The clip fills the 9:16 frame
  by losing a little at the sides: keep the subject centered.
- A recurring figure's picture can go in as a second `other_elements` image; say in the brief
  which reference sets the style and which shows the figure.
- It costs more per picture than `text-to-photo`: quote it and ask.

## 8. Motion briefs

**`photo-to-video`** (`create_generation`, the default route). The server's writer turns your
brief into the motion prompt. Say only what MOVES:

```
Motion: <the one main movement: waves roll against the rocks, the lamp flickers, the figure walks slowly toward the door>
Camera: <locked | slow push-in | slow drift sideways>
Feel: slow and steady, one continuous shot, the figure keeps facing away from the camera
```

- One main movement and one camera move. Two of either reads as a mess.
- Never describe what the picture already shows, never ask for a cut, words on screen or speech.
- Small, natural motion suits illustrations best: water, smoke, light, cloth, leaves, birds far
  off, a slow walk away from the camera, a page turning.
- `inputs: { image_url: <the picture's asset id> }`, `params: { duration: <whole seconds, 4 to 15>,
  generate_audio: false }`. It films at 720p. An optional `end_image_url` makes the take land on a
  second picture; rarely needed.

**`run_video_ai` `animate_photo`** (the in-studio route). The prompt reaches the video model as
you write it, with no writer in between: write the same three parts in full sentences and add
"the picture's art style stays exactly the same". Its lengths are 5, 10, 15, 20 or 30 seconds,
and it runs on a higher-grade model that costs more per second.

## 9. Stock footage and realistic scenes

- **Stock hooks library** (`list_stock_clips` with `library: "hooks"` and a `search` of one to
  three plain words): short 9:16 clips of people in everyday places (training, walking, driving,
  an office, a park, a beach, a kitchen, a cafe), 2.5 to 10 seconds, mostly silent. Every search
  word must match; `matched: "some"` means the nearest were returned. Look with `preview_assets`
  (`stock_ids`). Free. These people are stock performers: never present one as the narrator, the
  brand or a real customer.
- **Green screen library** (`library: "green_screen"`): people and animals filmed on green, keyed
  out over your scene. One reaction (a shocked cat over a surprising fact) suits an explainer or a
  top-N. Skip clips of cartoon characters someone owns.
- Stock clips show people (green screen also has some animals). There are no clips of objects
  alone, empty landscapes or skylines, no music and no gameplay, and `run_video_ai` cannot
  change a stock clip. A beat stock cannot show gets an AI picture.
- **Realistic scenes without a picture first:** `create_generation` with `tool: "text-to-video"`,
  `brand_id`, a prompt that describes one scene fully (the subject, the place and light, the one
  action, one camera move), `params: { duration, generate_audio: false }`. For realistic b-roll
  where no recurring look matters (waves, a city at night, a forest path). There is no picture to
  approve before it is paid for, so it fits the Realistic photos look, not illustrated ones.
- **The brand's own footage:** `list_assets` with `brand_id`, `file_type: "video"` and a
  `search`, then `preview_assets`.

## 10. Checking the pictures

`preview_assets` takes up to 8 asset ids a call and is free. For each picture:

- the same look as the chosen opening picture;
- no letters or garbled writing;
- every figure anonymous, and nothing that looks like the brand's avatar;
- the subject in the upper middle, nothing important at the side edges;
- what the beat's line names is in the picture.

One fix per picture, and say what you changed. A redo is paid: quote it and ask. The person may
not see these previews in their chat: give them picture links (`url` from `get_generation`) when
they choose the opening picture or ask to see them.
