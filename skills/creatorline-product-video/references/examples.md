# Worked examples

Complete calls for each path, with the brief, the price message and what follows. Ids are
placeholders: take them from `list_brands`, `list_assets`, `import_asset` and `get_generation`,
and never show them to the person. Every call below is first sent WITHOUT `confirm` (the price),
then again with the same arguments and `confirm: true` after the yes. The product names are made
up.

## Contents

1. [Path A: hands only, 8 s](#1-path-a-hands-only-8-s)
2. [Path A: the product alone](#2-path-a-the-product-alone)
3. [Path B: a still, then one take](#3-path-b-a-still-then-one-take)
4. [Path C: the avatar's hands in a car](#4-path-c-the-avatars-hands-in-a-car)
5. [One voice over a joined clip](#5-one-voice-over-a-joined-clip)
6. [Path D: 24 s under one voiceover](#6-path-d-24-s-under-one-voiceover)

## 1. Path A: hands only, 8 s

The person: "Make a video of my hair oil, no face, just hands." The photo is in their library;
a bathroom shelf photo is too.

Product card (written once, reused):

```
Product: Velra Rice Water Hair Oil
What it is: a light hair oil
How it is used: two presses of the pump into the palm, palms rubbed together, worked through the ends
Looks: clear glass bottle, matte black pump, pale gold oil, white label
Size: fits in one hand, about 13 cm tall
Label: "VELRA", "Rice Water Hair Oil", 50 ml
Claims: none given
```

Call:

```json
{
  "tool": "ugc-video",
  "model": "veo3-1-reference-to-video",
  "brand_id": "<brand id>",
  "include_avatar": false,
  "inputs": { "image_urls": ["<hair oil asset id>", "<bathroom shelf asset id>"] },
  "params": { "duration": 8 },
  "prompt": "Format: a phone video of a hair oil, hands only: only the bottle and a pair of hands are in frame. A woman's voice speaks off screen, warm and quick.\nProduct: Velra Rice Water Hair Oil (@Image1): clear glass bottle, matte black pump, pale gold oil, white label reading VELRA, fits in one hand, about 13 cm tall. Use: two presses of the pump into the palm, palms rubbed together.\nSetting: @Image2, a bathroom shelf by a frosted window, morning light, a wide-tooth comb and a rolled towel beside the bottle.\nShots: 1 first person: a hand takes the bottle off the shelf and presses the pump twice into the other palm. 2 medium, from behind: both hands work the oil through the ends of long dark hair.\nVoiceover, word for word: \"Two pumps, warmed in your palms. Then the ends only, never the roots. Rice water and oil, one bottle.\"\nEnding: the hands smoothing the ends, the bottle back on the shelf behind them, label to the camera.\nSound: voice and room sound only, with the pump's click and the soft rub of palms.\nLanguage: English."
}
```

Price message:

> An 8-second hands-only video: the bottle comes off the bathroom shelf, two pumps into the palm,
> then worked through the ends, seen from behind. Voiceover (a woman, warm): "Two pumps, warmed
> in your palms. Then the ends only, never the roots. Rice water and oil, one bottle."
> <N> credits; you have <M>. Go ahead?

## 2. Path A: the product alone

The person: "Just the candle, nobody in it, cosy evening vibe."

```json
{
  "tool": "ugc-video",
  "model": "veo3-1-reference-to-video",
  "brand_id": "<brand id>",
  "include_avatar": false,
  "inputs": { "image_urls": ["<candle asset id>"] },
  "params": { "duration": 8 },
  "prompt": "Format: a phone video of a candle: only the candle and the room are in frame, the phone held low and steady. A man's voice speaks off screen, low and calm.\nProduct: Fernmoor Fig & Cedar candle (@Image1): amber glass tumbler with a wooden wick and a black lid, fits in one palm, about 9 cm tall, label reading FERNMOOR.\nSetting: a living room in early evening, one floor lamp on, a throw blanket on the sofa behind, a stack of two books beside the candle. The side table holds only the candle, its lid and the books.\nShots: 1 medium: the candle already lit, the flame steady, the wooden wick crackling. 2 wide, on a cut: the whole room, the candle glowing on the side table.\nVoiceover, word for word: \"Fig and cedar. A wooden wick, so you hear it crackle. Lid off, lamp low, that's the whole evening.\"\nSound: voice and room sound only, with the wick's crackle.\nLanguage: English."
}
```

The lit flame stays one size in both shots: one state per shot (shot grammar, section 10).

## 3. Path B: a still, then one take

The person: "Animate my cold brew bottle, a pour over ice, with a voiceover." One unbroken take
fits a pour.

Step 1, the still (2 to choose from):

```json
{
  "tool": "photo-edit",
  "model": "gpt-image-v2-edit",
  "brand_id": "<brand id>",
  "include_avatar": false,
  "count": 2,
  "inputs": { "other_elements": ["<cold brew bottle asset id>"] },
  "params": { "aspect_ratio": "9:16" },
  "prompt": "A casual phone photo in morning window light: the cold brew concentrate bottle from the reference stands on a light wood kitchen counter, label to the camera, beside a tall glass full of ice and a small jug of milk. Shot from counter height, everything in focus, a tea towel at the edge of the frame."
}
```

Step 2, the motion. Price it together with step 1 by `estimate_generation_cost` with
`tool: "photo-to-video"` and `params: { "duration": 8 }`. Once the person picked a still, call it
without `confirm`: the same price goes straight on with `confirm: true`; a different one is asked
again.

```json
{
  "tool": "photo-to-video",
  "brand_id": "<brand id>",
  "inputs": { "image_url": "<the picked still's asset id>" },
  "params": { "duration": 8 },
  "prompt": "One continuous phone take from the start frame, the phone propped and still. A hand comes in from the right, lifts the bottle and pours a dark stream over the ice; the ice cracks and settles. The hand sets the bottle back, label to the camera, and the frame holds on the glass. A man's voice speaks off screen, easy and dry: \"Two fingers of this over ice, milk if you like. That's the whole recipe.\" Sound: voice and room sound only, with the pour and the ice cracking."
}
```

Price message (one yes for both):

> Two photos of the bottle on your kitchen counter by the ice, you pick one, then I bring it to
> life: an 8-second single take of a hand pouring it over ice. Voiceover (a man, easy and dry):
> "Two fingers of this over ice, milk if you like. That's the whole recipe."
> Photos: <N1> credits. Video: <N2> credits. <N> in all; you have <M>. Go ahead?

Notes:
- No `@` tokens in the motion brief: the still is wired in as the start frame.
- No `ugc_style` on `photo-to-video`: its models do not take one.
- For one take longer than 15 s, or `1080p`, add `"model": "bytedance-seedance-2-5-image-to-video"`
  (up to 30 s; its frame follows the still) and quote again.

## 4. Path C: the avatar's hands in a car

The person: "Use Mia's hands, show my phone mount in her car, no face." The avatar goes in by
itself; the brief keeps her face out of the frame.

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand id>",
  "avatar_id": "<Mia's avatar id>",
  "inputs": { "objects": ["<mount asset id>"], "location": ["<car interior asset id>"] },
  "params": { "duration": 10 },
  "prompt": "Format: a phone video in a parked car. The camera is a phone propped on the passenger seat, looking at the dashboard and @Avatar1's hands and forearms; her face stays above the top of the frame the whole time. Her voice is heard off screen, relaxed and dry.\nProduct: Clipwell vent mount (@Object1): a matte black magnetic disc about 6 cm wide on a short arm with a vent clip. Use: the clip slides onto the air vent, then a phone snaps onto the disc.\nSetting: @Location1, daylight through the windscreen, sunglasses on the dash, keys in the cupholder.\nShots: 1 @Avatar1's right hand holds @Object1 open-palm toward the camera. 2 her right hand slides the clip onto the vent. 3 close: a second phone in her hand snaps onto the disc; she lets go and it holds, screen dark.\nVoiceover, word for word: \"Clip it on the vent. Then the phone, right onto the magnet. Let go, and it stays put. That's the whole setup.\"\nSound: voice and room sound only, with the clip's snap.\nLanguage: English."
}
```

Check the cover with `preview_assets`: if her face shows, offer to keep it as a talking video or
take it again on path A.

## 5. One voice over a joined clip

A path A clip of 16 s is two takes joined, and the voice can change at the join. Re-voice it in
one voice after it succeeds. Price this step with the clip, under the same yes
(`estimate_generation_cost` with `tool: "change-voice"`). Once the clip exists, call it without
`confirm`; the same price goes on with `confirm: true`, a different one is asked again:

```json
{
  "tool": "change-voice",
  "brand_id": "<brand id>",
  "inputs": { "video_url": "<the clip's asset id>" },
  "params": { "voice_id": "<voice_id from get_brand>" }
}
```

No brand voice: pick one with `list_voices` (`search: "warm female narrator"`) and pass its id.
The result is a new video with its own `generation_id`: wait for it with `get_generation`, and
show only the re-voiced clip.

## 6. Path D: 24 s under one voiceover

Three path A clips of 8 s each (intro and use, the close mechanism, the result), filmed with
`"generate_audio": false` in `params` so only the voiceover speaks. Their briefs carry no
Voiceover and no Sound line. Price all of it first: the three clips (`create_generation` without
`confirm`, each), plus the voiceover and the export from `get_video_guide` `credits` (captions
too, if wanted). One yes for the total:

> A 24-second hands-only video in three parts: the serum on the counter and the first drops, a
> close look at the dropper, the bottle back in place. One voiceover over all of it, in your
> brand's voice: "<the 45 to 55 words>"
> Three clips: <N1> credits. Voiceover: <N2>. Export: <N3>. <N> in all; you have <M>. Go ahead?

When the clips are done, build the video (free):

```json
{
  "brand_id": "<brand id>",
  "title": "Glow C Serum, morning step",
  "operations": [
    { "op": "add_clip", "asset_id": "<clip 1>", "id": "c1" },
    { "op": "add_clip", "asset_id": "<clip 2>", "id": "c2" },
    { "op": "add_clip", "asset_id": "<clip 3>", "id": "c3" },
    { "op": "add_text", "text": "One step. Two drops.", "over": "c1", "position": "top", "size": "l" }
  ]
}
```

Then:

1. `add_voiceover` with `video_id`, `text` (the whole voiceover, word for word as quoted) and
   `over: "c1"`; then `confirm: true`, which the yes already covered. The brand's own voice is
   used unless you pass `voice_id`.
2. Read the voiceover's `end` in the answer. Trim the last clip to stop about 0.3 s after it:
   `edit_video` with `update_clip`, `id: "c3"` and `trim_end` = the voiceover's `end` + 0.3
   minus the clip's `start` (`trim_end` counts in the clip's own seconds). If `warnings` says the
   voiceover runs past the end of the video, shorten the words (`add_voiceover` with
   `replace_id`, quoted again) rather than cut a clip short.
3. `preview_video` to check the text and the frame (free).
4. Captions if wanted, last: `write_captions` with `position: "auto"` (`creatorline-captions`).
5. `export_video`, then `get_video` until `export.status` is `done`. `export.asset_id` is the
   finished video for `create_post`.

The editing craft (timing, texts, layers) is in `creatorline-video-studio`.
