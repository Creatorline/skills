# Worked examples

Full runs, from the person's first message to the result. Ids are shown as `<...>`: take them
from the tool answers, never ask for them, never show them. Every call that spends is first
made without `confirm` (the quote) and repeated with `confirm: true` after the yes. A call
whose input does not exist yet is priced with `estimate_generation_cost` instead.

## Contents

1. [A dress fit check (Route A, the default)](#1-a-dress-fit-check-route-a-the-default)
2. [A sneaker reveal](#2-a-sneaker-reveal)
3. [Earrings, a look in motion](#3-earrings-a-look-in-motion)
4. [A haul of three tops](#4-a-haul-of-three-tops)
5. [A trending jeans clip, Replace mode (Route B)](#5-a-trending-jeans-clip-replace-mode-route-b)
6. [The locked look](#6-the-locked-look)

## 1. A dress fit check (Route A, the default)

The person: "Make a fit check of Mia in our new linen dress" with a link to the dress photo.

A one-liner with the item: decide everything, ask nothing but the price.

1. `import_asset` `{ url: "<photo link>", brand_id: "<brand>", title: "Sage linen midi dress" }`.
2. Wardrobe line: "sage green linen midi dress, square neckline, buttons down the front, ties at
   the back of the waist, hits mid-calf". Setting line: "bright bedroom, window light from the
   left".
3. Quote the look (no `confirm`):

```
create_generation {
  tool: "photo-edit", brand_id: "<brand>", avatar_id: "<Mia>",
  inputs: { other_elements: ["<dress>"] },
  params: { aspect_ratio: "2:3", resolution: "2K" },
  count: 2,
  prompt: "@Avatar1 wearing the sage green linen midi dress from @Input1: square neckline, buttons down the front, ties at the back of the waist, hits mid-calf. Full body, feet in frame, weight on one leg, arms a little away from the sides so the cut shows, hands relaxed. Bright bedroom, window light from the left. Their own face and hair. The dress exactly as in @Input1, fitted as cut. Casual phone photo."
}
```

4. Quote the video: the call in step 7 without `confirm`. It takes the dress photo, not the
   look, so it can be quoted now.
5. The plan and the price, two short messages:

   > A 12 s fit check: Mia steps back into view in the dress, a slow turn, the buttons, the tie
   > at the back, her verdict. First two quick photos of her in it, to check the look before
   > filming.
   >
   > Photos <A> credits, video <B>: <A+B> in all; you have <M>. Go ahead?

6. On yes: the look call with `confirm: true`; `get_generation` `{ generation_id, wait_seconds: 20 }`
   until done; `preview_assets` `{ asset_ids: ["<look 1>", "<look 2>"] }`. Look 1 has the tie at
   the back right: keep it for the cover. Tell the person in one line, with both links, that
   filming starts now.
7. The video with `confirm: true` (the yes already covered it):

```
create_generation {
  tool: "ugc-video", brand_id: "<brand>", avatar_id: "<Mia>",
  inputs: { objects: ["<dress>"] },
  params: { ugc_style: "Auto", duration: 12, aspect_ratio: "9:16", resolution: "720p" },
  confirm: true,
  prompt: "Idea: fit check. @Avatar1 shows how the Sage linen midi dress (@Object1) fits and moves, in a bright bedroom.
Hook: @Avatar1 steps back from the phone into full view, the hem still swinging, and says \"This is the dress for every summer wedding.\"
Beats: full body, one slow turn so the skirt swings; waist-up on the square neckline and the front buttons; a turn to show the tie at the back; settled three-quarter for the verdict.
Wardrobe: @Avatar1 wears the sage green linen midi dress (@Object1) in every shot: square neckline, buttons down the front, ties at the back of the waist, hits mid-calf. Fitted as cut.
Setting: bright bedroom, window light from the left, phone propped on the dresser at hip height facing @Avatar1.
Ending: a calm verdict, three-quarter, hands relaxed.
Language: English.
Sound: voice and room sound only."
}
```

   Had neither look shown the dress right, step 7 would not run: say what is off (the tie, the
   length) and offer one retry of the look before any video.
8. `get_generation` with `wait_seconds: 45` until done, one line between calls. Check the cover
   with `preview_assets`, then show the card (SKILL.md, Show the result).

**GRWM variant:** `ugc_style: "GRWM"`, 15 s, and `Beats:` "talking to the phone while rolling
the sleeves; ties the waist tie; smooths the skirt and steps back; full look, verdict". Every
action is on the dress itself: a prop the person did not supply (a bag, sunglasses) reads as part
of what is sold. Keep the setting line with the propped phone: the GRWM template drifts toward a
mirror otherwise.

## 2. A sneaker reveal

The person: "Do a reveal with Jack and our white sneakers."

1. The look photo first, as in example 1: full body, both feet on a plain light floor, `2:3`. It
   proves the shoes read on Jack and becomes the cover.
2. The reveal. The video call does not take the look: Jack's own image is the "before".

```
create_generation {
  tool: "ugc-video", brand_id: "<brand>", avatar_id: "<Jack>",
  inputs: { objects: ["<sneakers>"] },
  params: { ugc_style: "Before & after", duration: 10, aspect_ratio: "9:16", resolution: "720p" },
  prompt: "Idea: a shoe reveal. Before: @Avatar1 in grey socks in a sunny hallway. After: @Avatar1 wearing the white leather sneakers (@Object1).
Hook: @Avatar1 points down at the grey socks and says \"Every outfit needs one pair like this.\"
Beats: socks, pointing down; on the cut, @Avatar1 wears @Object1 and steps toward the phone, both shoes in frame; full body, one heel lifts, verdict.
Wardrobe: @Avatar1 wears the white leather sneakers with a chunky cream sole (@Object1) from the cut on, with straight blue jeans and a grey t-shirt in every shot.
Setting: sunny hallway, light wood floor, phone propped on the floor against the wall.
Ending: full body, a short verdict.
Language: English.
Sound: voice and room sound only."
}
```

3. Quote both calls, one yes for the total, then run the look, check it, and film.

## 3. Earrings, a look in motion

The person: "A short clip of Mia wearing our gold hoops, something loopable."

1. A 9:16 look photo, since it will be animated:

```
create_generation {
  tool: "photo-edit", brand_id: "<brand>", avatar_id: "<Mia>",
  model: "gpt-image-v2-edit",
  inputs: { other_elements: ["<hoops>"] },
  params: { aspect_ratio: "9:16", resolution: "2K" },
  prompt: "@Avatar1 wearing the gold hoop earrings from @Input1, chest-up, hair tucked behind the right ear, a plain cream knit top, by a bright window in a calm bedroom. Their own face and hair. The earrings exactly as in @Input1. Casual phone photo, natural light."
}
```

2. Animate it, one continuous take:

```
create_generation {
  tool: "photo-to-video", brand_id: "<brand>",
  inputs: { image_url: "<look>" },
  params: { duration: 6 },
  prompt: "She turns her head slowly toward the window so the right earring catches the light, then back to the lens with a small smile. Phone propped, frame locked."
}
```

Pricing: the look with `create_generation` without `confirm`; the animation with
`estimate_generation_cost` (`tool: "photo-to-video"`, `params: { duration: 6 }`), since the look
does not exist yet. One yes for the total. Once the look is kept, call the animation without
`confirm`: the same price, confirm it; a higher one, ask again. The brief says only what moves;
never a cut.

## 4. A haul of three tops

The person: "Haul try-on of our three new summer tops with Mia."

1. Bring in the three photos; one wardrobe line each.
2. Price the whole haul before any of it starts:
   - three looks (`photo-edit`, `count: 1` each) and three clips (`ugc-video`, `duration: 6`,
     the same setting line in all three so it reads as one session): `create_generation`
     without `confirm`, all six now, since the clips take the item photos;
   - the captions and the export: `get_video_guide` gives their credits (`credits.captions`,
     `credits.export`).
   One message: one line per item, the captions and the export, the total, one question.
3. Each clip's `Beats:` "waist-up, already turning to the phone, hook line about the top;
   chest-up on the neckline, verdict".
4. On yes, run the six; check each look before its clip, as in example 1.
5. Join them (free):

```
create_video {
  brand_id: "<brand>", title: "Summer tops haul",
  operations: [
    { op: "add_clip", asset_id: "<clip 1>", id: "t1" },
    { op: "add_clip", asset_id: "<clip 2>", id: "t2" },
    { op: "add_clip", asset_id: "<clip 3>", id: "t3" },
    { op: "add_text", text: "1. Cream knit tank", over: "t1", position: "top", look: "tiktokHighlight", size: "m" },
    { op: "add_text", text: "2. Striped linen shirt", over: "t2", position: "top", look: "tiktokHighlight", size: "m" },
    { op: "add_text", text: "3. Sage crop top", over: "t3", position: "top", look: "tiktokHighlight", size: "m" }
  ]
}
```

6. `preview_video` `{ video_id, show_safe_area: true }` (free) and fix what overlaps.
7. `write_captions` `{ video_id, position: "auto" }` without `confirm`; the same price as quoted,
   call it again with `confirm: true`. Read `get_video` until `captions.status` is `ready`. Then
   `export_video` `{ video_id }` the same way, and read `get_video` until `export.status` is
   `done`. `export.asset_id` is the finished MP4 for creatorline-publish.

Keep each label under about 26 characters so it stays on one line.

Each clip is its own take, so the voice can change a little from top to top. When one voice
matters, film the clips with `generate_audio: false` and a brief where @Avatar1 stays quiet
with a closed-mouth smile, then lay one voiceover over the joined video (`add_voiceover`,
creatorline-voiceover). Price it with the rest: `credits.voiceover` in `get_video_guide` is one
voiceover.

## 5. A trending jeans clip, Replace mode (Route B)

The person: "Use this TikTok of a woman trying on jeans, but with Mia in our jeans" with the link.

1. `import_asset` `{ url: "<tiktok link>", brand_id: "<brand>", title: "Jeans try-on trend" }`:
   `duration_sec` is 14.6. `preview_assets` on it: one main person, full body, turning. Good.
2. The jeans photo shows only the jeans: say that the top and the shoes stay as in the clip.
3. The quote, then the run on yes:

```
create_generation {
  tool: "character-swap", brand_id: "<brand>", avatar_id: "<Mia>",
  model: "character-swap-replace",
  inputs: { source_video: "<clip>", outfit: "<jeans>" },
  params: { duration: 14, resolution: "720p" }
}
```

4. The woman in the clip says a line: her voice would stay, and it is not ours to use. Mia has a
   `voice_id` in `get_avatar`, and the clip has no music: offer a re-voice after the swap, priced
   with it now (`estimate_generation_cost`, `tool: "change-voice"`, the clip in
   `inputs.video_url`). The other way: mute the clip in Video Studio and add a voiceover.
5. Wait with `get_generation` (`wait_seconds: 45`); say a swap often takes longer than a normal
   video.
6. The re-voice, once the swap succeeded:

```
create_generation {
  tool: "change-voice", brand_id: "<brand>", avatar_id: "<Mia>",
  inputs: { video_url: "<the swap's output asset_id>" },
  params: { voice_id: "<voice_id from get_avatar>" }
}
```

   Without `confirm` first: the same price as estimated, confirm it; a higher one, ask again.

Plan line to the person: "Mia takes her place in the clip, in your jeans; the moves and the
camera stay as they are. Then Mia's own voice replaces the spoken line."

## 6. The locked look

When the item drifts between shots, the avatar holds it instead of wearing it, or the item photo
shows a real model's face, film from the kept look photo instead of the avatar's own image:

```
create_generation {
  tool: "ugc-video", brand_id: "<brand>", avatar_id: "<Mia>",
  include_avatar: false,
  inputs: { characters: ["<kept look>"], objects: ["<dress>"] },
  params: { ugc_style: "Auto", duration: 12, aspect_ratio: "9:16", resolution: "720p" },
  prompt: <the same brief as before>
}
```

- `include_avatar: false` keeps the avatar's own image (in its own clothes) out, so the look
  photo is `@Avatar1` and it already wears the item. Keep `avatar_id`: the run is filed under
  that avatar.
- If the item photo shows a real face, leave `objects` out: the look photo carries the item.
- It is a new paid run: quote it and ask, as for any retry.
