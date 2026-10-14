# Worked examples

Full runs, from the person's first message to the result. Ids are shown as `<...>`: take them
from the tool answers, never ask for them, never show them. Every call that spends is first
made without `confirm` (the quote) and repeated with `confirm: true` after the yes. A call
whose input does not exist yet is priced with `estimate_generation_cost` instead.

## Contents

1. [A dress try-on (Route A, the default)](#1-a-dress-try-on-route-a-the-default)
2. [A sneaker reveal, 10 s](#2-a-sneaker-reveal-10-s)
3. [Earrings, a look in motion](#3-earrings-a-look-in-motion)
4. [A haul of three tops](#4-a-haul-of-three-tops)
5. [A trending jeans clip, Replace mode (Route B)](#5-a-trending-jeans-clip-replace-mode-route-b)
6. [The locked look](#6-the-locked-look)

## 1. A dress try-on (Route A, the default)

The person: "Make a fit check of Mia in our new linen dress, 15 seconds" with a link to the dress
photo.

A one-liner with the item and the length: decide everything, ask nothing but the price.

1. `import_asset` `{ url: "<photo link>", brand_id: "<brand>", title: "Sage linen midi dress" }`.
2. Wardrobe line: "sage green linen midi dress, square neckline, buttons down the front, ties at
   the back of the waist, hits mid-calf". Setting line: "a bright bedroom, neutral daylight from
   one window, a plain wall".
3. Quote the look (no `confirm`):

```
create_generation {
  tool: "photo-edit", brand_id: "<brand>", avatar_id: "<Mia>",
  inputs: { other_elements: ["<dress>"] },
  params: { aspect_ratio: "2:3", resolution: "2K" },
  count: 2,
  prompt: "@Avatar1 wearing the sage green linen midi dress from @Input1: square neckline, buttons down the front, ties at the back of the waist, hits mid-calf. Full body, feet in frame, weight on one leg, arms a little away from the sides so the cut shows, hands relaxed. A bright bedroom, neutral daylight from one window, a plain wall. Their own face and hair. The dress exactly as in @Input1, fitted as cut. Casual phone photo."
}
```

4. Quote the video: the call in step 7 without `confirm`. It takes the dress photo, not the
   look, so it can be quoted now.
5. The plan and the price, two short messages:

   > A 15 s try-on: Mia with a shopping bag in her lounge clothes, then on the cut in the dress
   > with a twirl, the linen up close, the tie at the back, and a pose in the living room. First
   > two quick photos of her in it, to check the look before filming.
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
  params: { ugc_style: "Auto", duration: 15, aspect_ratio: "9:16", resolution: "720p" },
  confirm: true,
  prompt: "Idea: a try-on. @Avatar1 shows how the Sage linen midi dress (@Object1) fits and moves, at home.
Register: natural.
Hook: @Avatar1 already holds a plain kraft shopping bag by its handle, a grin breaking, and says \"I waited two months for this dress to restock.\"
Beats: 1) Before: phone in her hand, waist-up, a plain grey crew-neck tee and lounge pants, the closed kraft bag held by one handle. 2) On the cut, the longest shot: phone propped on the dresser at hip height, full body in @Object1, one slow twirl, the skirt swinging, half a beat showing the back, settling front with a laugh; the bag is gone. 3) The shortest shot: phone in her hand, close on the waist, her free hand on her hip and off the fabric; the waist seam rises and settles with her breath; her voice goes on over it. 4) Phone propped, three-quarter from the back: the tie at the waist, a glance over her shoulder. 5) The living room, phone propped on a shelf, full body on the window seat, the hem falling; ending mid-phrase.
Wardrobe: from shot 2 on, @Avatar1 wears the sage green linen midi dress (@Object1): square neckline, buttons down the front, ties at the back of the waist, hits mid-calf. Fitted as cut, the same in every shot.
Hands: in shot 1 one hand is the phone and the other holds the bag; in shots 2 and 4 both hands are relaxed at her sides.
Setting: a bright bedroom, then the living room of the same home; neutral daylight from one window, a plain wall behind her.
Lines: \"I waited two months for this dress to restock.\" / \"Oh... look at it MOVE.\" / \"Linen, and it still feels soft at the waist.\" / \"The back ties right here.\" / \"Midi length, right at mid-calf...\"
Language: English, American accent.
Sound: voice and room sound only: the bag's paper rustle, a laugh on the twirl, bare feet on the wood floor."
}
```

   Had neither look shown the dress right, step 7 would not run: say what is off (the tie, the
   length) and offer one retry of the look before any video.
8. `get_generation` with `wait_seconds: 45` until done, one line between calls. Check the cover
   with `preview_assets`, then show the card (SKILL.md, Show the result) and ask the text
   question.

The lines are 33 words, inside the 28-35 band for 15 s; the wordiest line sits on the detail
shot, where her mouth is out of frame. The opening is the wait, the format's proven hook: the
persona has a past and its story is welcome (SKILL.md, The persona: fit, size and story). An
occasion ("This is the dress for every summer wedding.") works as well.

**GRWM variant:** `ugc_style: "GRWM"`, 15 s, the calm register (GRWM is one of its words), and
the already-wearing beats (shot-lists.md, section 10): talking to the phone while rolling the
sleeves; ties the waist tie; smooths the skirt and steps back; another room, verdict. Every
action is on the dress itself: a prop the person did not supply (a bag, sunglasses) reads as part
of what is sold. Keep the setting line with the propped phone and a plain wall: the GRWM template
drifts toward a mirror otherwise.

## 2. A sneaker reveal, 10 s

The person: "Do a quick 10 second reveal with Jack and our white sneakers."

1. The look photo first, as in example 1: full body, both feet on a plain light floor, `2:3`. It
   proves the shoes read on Jack and becomes the cover.
2. The reveal, three shots. The video call does not take the look: Jack's own image is the
   Before.

```
create_generation {
  tool: "ugc-video", brand_id: "<brand>", avatar_id: "<Jack>",
  inputs: { objects: ["<sneakers>"] },
  params: { ugc_style: "Before & after", duration: 10, aspect_ratio: "9:16", resolution: "720p" },
  prompt: "Idea: a shoe reveal. Before: @Avatar1 in plain grey socks in a sunny hallway, a kraft shopping bag in hand. After: @Avatar1 wearing the white leather sneakers (@Object1).
Register: natural.
Hook: the phone in his hand points down at the grey socks, the closed kraft bag hanging from his other hand, and he says \"Every outfit needs one pair like this.\"
Beats: 1) Before, as in the hook. 2) On the cut, the longest shot: phone propped low against the wall, full body in @Object1, both shoes in frame, a turn on the spot, settling with a grin; the bag is gone. 3) Phone still propped, three-quarter, one foot forward, ending mid-phrase.
Wardrobe: straight blue jeans and a grey crew-neck t-shirt in every shot; from the cut on, the white leather sneakers with a chunky cream sole (@Object1), the same in every shot.
Setting: a sunny hallway, light wood floor, neutral daylight, a plain wall.
Lines: about 16 words in all.
Language: English, American accent.
Sound: voice and room sound only: the bag's paper, sneakers squeaking once on the wood."
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
3. Each clip is two shots of the already-wearing beats (shot-lists.md, section 10): "propped,
   waist-up, already turning to the phone, hook line about the top; in hand, chest-up on the
   neckline, the knit catching the light as she breathes, verdict". The Before shot and the kraft
   bag belong to a single try-on, not to each clip of a haul.
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
   call it again with `confirm: true`. Read `get_video` until `captions.status` is `ready`. The
   captions are written from what is heard: read each line against the lines in the briefs, the
   item names spelled as the person spells them, numbers as digits, and fix a wrong word with
   `edit_video` (`edit_caption`). Nothing said: the captions credits come back. Then
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
  prompt: <the same brief, with the already-wearing beats>
}
```

- The look photo already wears the item, so there is no Before shot: use the already-wearing
  beats (shot-lists.md, section 10), with the same Wardrobe, Setting and Lines.

- `include_avatar: false` keeps the avatar's own image (in its own clothes) out, so the look
  photo is `@Avatar1` and it already wears the item. Keep `avatar_id`: the run is filed under
  that avatar.
- If the item photo shows a real face, leave `objects` out: the look photo carries the item.
- It is a new paid run: quote it and ask, as for any retry.
