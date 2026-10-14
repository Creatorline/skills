# Frame first: stills for every beat, then the video

Route C. Draw each beat of the try-on as a still, check them, then film the video from them. It
is a storyboard before the shoot: the strongest hold on the item, at the price of more runs and
more time. Never the default.

Use it when:

- the person gave a shot-by-shot plan and wants every shot exactly so;
- two Route A videos lost or changed the item the same way, and the locked look did not hold it;
- the item is hard to put on in words (layered pieces, an unusual cut).

## Contents

1. [How it works](#1-how-it-works)
2. [The frames](#2-the-frames)
3. [Making a frame](#3-making-a-frame)
4. [The realism pass](#4-the-realism-pass)
5. [Check the frames](#5-check-the-frames)
6. [Film from the frames](#6-film-from-the-frames)
7. [Price it as one batch](#7-price-it-as-one-batch)

## 1. How it works

1. One 9:16 still per shot, made in order. From frame 2 on, each frame takes the kept frame
   before it as a reference, so the home, the light and the avatar carry over.
2. Each frame gets a realism pass, so the video model copies a phone photo, not a glossy
   render. The passed frame is the one kept and the one the next frame takes.
3. You look at the kept frames (free) and fix any before filming.
4. `ugc-video` with the `Keyframes` template films one shot per frame, in order, opening each
   shot on its frame.

Strictly one at a time: each run needs the one before, so wait for it to finish.

## 2. The frames

Five frames for 15 s, four for 12 s (drop the Turn), following the arc (try-on-arc.md,
section 2):

| Frame | What it shows | Phone and distance | `other_elements`, in order |
|---|---|---|---|
| 1. Before | The muted home outfit, the closed kraft bag held by a handle, the grin breaking; no item | Selfie, waist-up | Nothing |
| 2. Wearing | Full body in the item, mid-twirl or just settling from it; the bag gone; the peak expression | Propped, full body | The item photos, top to bottom, then frame 1 |
| 3. Texture close | The fabric close, hands-free, one passive cue | In hand, close | The item photos, then frame 2 |
| 4. Turn | Side or back, a glance over the shoulder | Propped, three-quarter | The item photos, then frame 3 |
| 5. Style pose | Another room of the same home, one styled pose, settled | Propped, full body, wide | The item photos, then frame 4 |

- A kept look photo made at 9:16 (SKILL.md, Route A) can serve as frame 2 when it is full body.
- Every frame caught mid-motion; neighbouring frames differ in phone, distance and action.
- The item appears in no frame before 2; the bag and the Before outfit in no frame after 1.
- All the arc's rules hold: no mirror, hands named, one hero item (try-on-arc.md).

## 3. Making a frame

```
create_generation {
  tool: "photo-edit", brand_id, avatar_id (only when one was named),
  model: "gpt-image-v2-edit",
  inputs: { other_elements: [<inputs from the table, in order>] },
  params: { aspect_ratio: "9:16", resolution: "2K", quality: "High" },
  prompt: <frame brief>
}
```

- The avatar's face goes in by itself as `@Avatar1`. The `other_elements` are `@Input1`,
  `@Input2`, ... in the order passed. Name each input's job in the brief.
- `count` stays 1.

Write the frame brief in this order: what each input is for; the room and the light; the
wardrobe line (the same words in every frame from 2 on); "fitted as cut, exactly as in the item
photo"; each hand's job; the framing word (FULL BODY, THREE-QUARTER, WAIST-UP, CLOSE) and the
moment caught mid-motion; "casual phone photo, everything in focus, neutral daylight". Never
describe the avatar's face, age or ethnicity: "@Avatar1, the same person as in the previous
frame" is enough.

Frame 2, a linen dress:

```
@Avatar1 in the same bedroom and light as @Input2 (the previous frame; take only the room, the
light and the person from it), now wearing the dress from @Input1: sage green linen midi dress, square
neckline, buttons down the front, ties at the back of the waist, hits mid-calf. Fitted as cut,
exactly as in @Input1. FULL BODY, feet in frame, phone propped at hip height: she is just
settling from a twirl, the skirt still swinging, both hands relaxed at her sides, a laugh
breaking. Neutral daylight from one window, a plain wall behind her, everything in focus.
Casual phone photo.
```

## 4. The realism pass

```
create_generation {
  tool: "photo-edit", brand_id,
  model: "bytedance-seedream-v4-5-edit",
  include_avatar: false,
  inputs: { other_elements: [<the frame>] },
  params: { image_size: "portrait_16_9" },
  prompt: "Keep @Input1 exactly: the framing, the layout, the face, the hands and the clothes stay where and as they are. Change only the surface: real skin with visible pores, real fabric texture, flat daylight, a little phone-camera grain, everything in focus. The same text as now, nothing added."
}
```

- `include_avatar: false`: the frame already carries the face.
- Refused, or worse than the raw frame: keep the raw frame and go on.

## 5. Check the frames

`preview_assets` with every kept frame (free). Each must pass:

- the item true to its photo in every frame from 2 on: colour, length, neckline, closures,
  print; nothing invented, nothing missing;
- at most two hands, each with one job; hands off the fabric in the detail frame;
- no mirror, window or glossy surface showing her;
- the avatar's own face, the same in every frame;
- the bag and the Before outfit only in frame 1;
- neighbouring frames differ in phone, distance and action.

A failed frame is made again before anything is filmed (a new paid run: ask), and so is every
frame after it.

## 6. Film from the frames

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand id>",
  "prompt": "<the video brief>",
  "inputs": { "objects": ["<frame 1>", "<frame 2>", "<frame 3>", "<frame 4>", "<frame 5>"] },
  "params": { "ugc_style": "Keyframes", "duration": 15 }
}
```

- With `Keyframes`, every image besides the avatar is a frame, in order. Never add the item
  photo here: it would become one more frame.
- The video brief is the Route A brief (SKILL.md), with every beat written as change over time
  out of its frame: what moves, what is said, what is heard. A frame is a timing map, not a pose
  to copy: a sentence that could be the frame's caption gets rewritten as motion ("the hem is
  still swinging as she settles; her hands find her hips").
- Five frames need 15 s, four need 12 s.

## 7. Price it as one batch

1. Frame 1: `create_generation` without `confirm` (it needs no earlier frame).
2. The other frames, every realism pass and the video: `estimate_generation_cost` with the same
   tool, model and params.
3. One message: the stills with their passes, the video, the total, the balance, one yes.
4. On yes, run in order. Call each later step once more without `confirm` when its input exists:
   the same price, confirm it without asking again; a higher one, tell the person and ask.
