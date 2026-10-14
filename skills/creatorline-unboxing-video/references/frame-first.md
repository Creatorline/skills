# Frame first: four stills, then the video

A second way to make an unboxing: draw the four beats as stills first, check them, then film
the video from them. It is a storyboard before the shoot. It takes longer and spends more than
a brief alone (eight photo runs before the video), so it is never the default.

Use it when:

- the person gave a beat-by-beat plan and wants each beat exactly as described;
- two takes from a brief broke the arc the same way (the box opened inside a shot, the product
  showed up twice, the box came back after the reveal);
- the product is hard to stage in words (an unusual shape, a package with several parts).

## Contents

1. [How it works](#1-how-it-works)
2. [The four frames](#2-the-four-frames)
3. [Making a frame](#3-making-a-frame)
4. [The realism pass](#4-the-realism-pass)
5. [Check the frames](#5-check-the-frames)
6. [Film from the frames](#6-film-from-the-frames)
7. [Price it as one batch](#7-price-it-as-one-batch)

## 1. How it works

1. One 9:16 still per beat, made in order. From frame 2 on, each frame takes the kept frame
   before it as a reference, so the room, the light and the clothes carry over.
2. Each frame gets a realism pass, so the video model copies a phone photo and not a glossy
   render. The passed frame is the one kept and the one the next frame takes.
3. You look at the four kept frames (free) and fix any before filming.
4. `ugc-video` with the `Keyframes` template films one shot per frame, in order, opening each
   shot on its frame. Four frames need 12 to 15 s.

Strictly one at a time: wait for each run to finish before starting the next one, because each
needs the one before.

## 2. The four frames

| Frame | What it shows | Framing | Inputs (`other_elements`, in this order) |
|---|---|---|---|
| 1. Sealed | The sealed box on the table, the avatar's fingers at the tape mid-motion, a small box cutter beside it (plain box); no product anywhere | Waist-up, box and room | Their package photo (Case B) or nothing |
| 2. Reveal | The product coming up from box level toward the chest, held as its weight class says; the open box at the frame's edge; tissue at the flaps (plain box); the peak expression | Chest-up | Product, package photo (Case B), frame 1 |
| 3. Product focus | The product close to the lens; of the avatar only hands and part of the face; no box | Tight on the product | Product, frame 2 |
| 4. Satisfaction | Settled ownership, the product beside the avatar, the outfit and the room; no box | Three-quarter or wider | Product, frame 3 |

- Every frame is caught mid-event: a hand already moving, a laugh already breaking.
- Four different actions and four different distances, covering a close, a middle and a wide one.
- Frame 1 never shows the product. Frame 4 never shows the box.
- The box and surface rules are the same as for a brief (unboxing-craft.md, sections 3 to 7).

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
  `@Input2`, `@Input3` in the order passed: when one is left out (no package photo), the numbers
  after it shift down. Name each input's job in the brief.
- `count` stays 1: one frame per run.

Write the frame brief in this order: what each input is for; the setting and the light; the
outfit (the same words in all four frames); the product exactly as its photo; each hand's job;
the framing word and the moment caught mid-motion; "casual phone photo, everything in focus,
neutral daylight". Never describe the avatar's face, age or ethnicity: "@Avatar1" is enough.

Frame 2, plain box, a serum:

```
@Avatar1 at her light oak desk, the same room, light and outfit as @Input2 (the previous frame).
She has just lifted the serum from @Input1 out of the open brown box: the bottle exactly as in
@Input1, label to camera, in her right hand, rising from box level toward her chest. Her left
hand rests on the box, which sits open at the right edge of the frame with blush tissue at the
flaps. A sharp gasp, brows up, mouth open. Chest-up. Cream knit top. Neutral daylight from one
window, a plain wall behind her, everything in focus. Casual phone photo.
```

## 4. The realism pass

```
create_generation {
  tool: "photo-edit", brand_id,
  model: "bytedance-seedream-v4-5-edit",
  include_avatar: false,
  inputs: { other_elements: [<the frame>] },
  params: { image_size: "portrait_16_9" },
  prompt: "Keep @Input1 exactly: the framing, the layout, the face, the hands and the product stay where and as they are. Change only the surface: real skin with visible pores, real materials, flat daylight, a little phone-camera grain, everything in focus. The same text as now, nothing added."
}
```

- `include_avatar: false`: the frame already carries the face; a second face image would pull
  the edit away from the frame.
- Refused, or worse than the raw frame: keep the raw frame and go on. Never stall the batch on
  this step.

## 5. Check the frames

`preview_assets` with the four kept frames (free). Each must pass:

- one unit of the product, true to its photo (shape, colour, label);
- at most two hands, each doing one thing;
- the box only in frames 1 and 2, sealed in 1, open at the edge in 2; no product in frame 1;
- the avatar's own face, the same in every frame; the same room, light and outfit;
- no readable text except the product's own label; no mirror or glass behind her;
- four different distances.

A failed frame is made again before anything is filmed (a new paid run: ask), and so is every
frame after it, since each one was made from it.

## 6. Film from the frames

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand id>",
  "prompt": "<the brief>",
  "inputs": { "objects": ["<frame 1>", "<frame 2>", "<frame 3>", "<frame 4>"] },
  "params": { "ugc_style": "Keyframes", "duration": 15 }
}
```

- With `Keyframes`, every image besides the avatar is a frame, in order. Never add the product
  photo here: it would become a fifth frame.
- The brief is the same as for the brief-only route (SKILL.md, The brief), but each beat is
  written as change over time out of its frame: what moves, what is said, what is heard. A
  frame is a timing map, not a pose to copy: a sentence that could be the frame's caption gets
  rewritten as motion ("her hand rises with the bottle, the gasp breaks into a laugh").
- 15 s for the reveal weighting; 12 s gives every beat 3 s.

## 7. Price it as one batch

The frames do not exist yet, so price the batch before any of it runs:

1. Frame 1: `create_generation` without `confirm` (its inputs exist).
2. Frames 2 to 4, all four realism passes and the video: `estimate_generation_cost` with the
   same tool, model and params.
3. One message: the four stills with their passes, the video, the total, the balance, one yes.
4. On yes, run in order. Call each later step once more without `confirm` when its input exists:
   the same price, confirm it without asking again; a higher one, tell the person and ask.
