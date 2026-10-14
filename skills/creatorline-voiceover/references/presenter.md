# On-screen narrator

The person's video plays as it is, and their avatar sits in a card on one side, talking to the
viewer as its narrator: commentary on a product clip, a screen recording explained, a reaction
while the video runs. The avatar is the presenter: a consented, persistent identity of the
brand. Never a photo of a real person, a public figure or anyone else (house rules, section 7).

## Contents

1. [What you need](#1-what-you-need)
2. [Blocks and words](#2-blocks-and-words)
3. [Filming each block](#3-filming-each-block)
4. [The avatar's own voice](#4-the-avatars-own-voice)
5. [Placing the blocks](#5-placing-the-blocks)
6. [Price, run and checks](#6-price-run-and-checks)
7. [Captions](#7-captions)
8. [Show it](#8-show-it)
9. [If it goes wrong](#9-if-it-goes-wrong)

## 1. What you need

| Item | Ask? | Default |
|---|---|---|
| The base video | Hard gap | |
| The words | No | Written from what the base shows (`preview_video`), 31 to 35 words per full 10 s |
| A script the person gives | | It wins: used word for word, split only at sentence ends |
| The avatar and its voice | No | The brand's default avatar, its `voice_id` |
| The base's own sound | No | Off while the presenter talks; say so in the plan |

A given script that does not fit: give both numbers ("your script is 120 words; 30 seconds of
video holds 93 to 105") and ask whether to cover more or less of the video (trim it, or let the
presenter speak over only part of it). Never cut their words silently.

## 2. Blocks and words

- The base is covered in blocks of 10 seconds: base length divided by 10, rounded up. Block 1
  covers 0 to 10 s, block 2 10 to 20 s, and the last one what is left.
- A full block holds 31 to 35 words (3.1 to 3.5 a second). A shorter last block holds the same
  rate times its length: 4 s holds 12 to 14 words.
- A given script is split only at sentence ends, every word kept, in order.
- The last block is filmed at the shortest length that covers it (whole seconds, at least 4)
  and cut to its window in the edit. Never padded, never looped.
- One idea per block. The first block's opening words are the hook (writing for voice, section
  5).

## 3. Filming each block

One `create_generation` per block (quote without `confirm` first):

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand>",
  "prompt": "<brief>",
  "params": { "duration": 10, "aspect_ratio": "9:16", "ugc_style": "Talking head" }
}
```

The brief, in the video-briefs.md template and in positive words:

```
Idea: Mia talks straight into the phone's front camera, chest-up, in one continuous shot with
the phone propped and still. From the very first frame she is already mid-sentence.
Lines: "<the block's words>". Use these lines as written: every word once, at a brisk, steady
pace, then a calm, engaged look into the lens until the end.
Setting: a plain, evenly lit light-grey wall behind her.
Small head and shoulder movement only; her hands are out of frame.
Language: <spoken language>
Sound: voice and room sound only.
```

- Opening mid-sentence keeps the first frame from freezing while the voice starts.
- The plain wall reads cleanly inside the small card.
- `avatar_id` names another avatar than the brand's default.

## 4. The avatar's own voice

- The video model speaks in a voice of its own. Re-voice EVERY block with the avatar's voice:
  `create_generation`, tool `change-voice`, `inputs.video_url` the block's `asset_id`,
  `params.voice_id` the avatar's (calls.md, section 4). It keeps the words, their timing and the
  mouth, and swaps only the voice, so no lip sync pass is needed.
- Every block, not some: a narrator whose voice changes between blocks is the failure people
  hear first. The voice is locked as in fitting-takes.md, section 5.
- An avatar with no voice: skip the re-voice, and say the voice is the one the video was filmed
  with.

## 5. Placing the blocks

In the base's Video Studio project (for a library video, `create_video` with the base as its
clip first):

```json
{
  "video_id": "<video>",
  "operations": [
    { "op": "set_all_clips_sound", "sound": false },
    { "op": "add_layer", "asset_id": "<block 1, re-voiced>", "id": "p1", "kind": "video", "start": 0, "duration": 10, "column": "left", "row": "middle", "width": 0.35, "corners": "rounded", "border": "white", "sound": true },
    { "op": "add_layer", "asset_id": "<block 2, re-voiced>", "id": "p2", "kind": "video", "start": 10, "duration": 4.2, "column": "left", "row": "middle", "width": 0.35, "corners": "rounded", "border": "white", "sound": true }
  ]
}
```

- **A card, not a cut-out.** `kind: "video"` shows each block as filmed, in a framed card. Video
  Studio removes only pure green (#00FF00), a generated backdrop is rarely exactly that, and the
  free preview removes green more loosely than the export does, so a clean preview does not
  prove a clean export. Offer a cut-out only when the person asks for one: the brief's setting
  becomes "a flat, evenly lit, pure green (#00FF00) backdrop, no shadow on it", the layers take
  `kind: "green_screen"` (no `border` or `corners`), and the real check is the exported video.
  Green or ragged edges there: back to the card (`replace_layer` with the same file and
  `kind: "video"`).
- **Middle of the left side.** Not the bottom right: the apps' column of buttons covers the right
  side from 958 px down, and the bottom row of a layer sits in the 420 px band the apps cover.
- **Its sound on.** A `video` layer is silent unless `sound: true`.
- **The base's own sound off**, said in the plan: its speech and music are one track and cannot
  be separated. The person's own music file can go under the video (`set_sound`), but it is
  turned down only under voiceovers, not under a layer's voice: leave it out unless asked.
- **Look (free).** `preview_video` at one moment in each block, `show_safe_area: true`: the card
  is whole, inside the frame, clear of the shaded bands, and not over a face, the product or
  text in the base. Move it with `update_layer` (`column`, `row`, `width`).

## 6. Price, run and checks

1. Quote every paid step before anything runs: each block's `ugc-video` call without `confirm`,
   each re-voice with `estimate_generation_cost` (`tool: "change-voice"`; its file does not exist
   yet), and the export. One total, one yes.
2. Film the blocks; wait on each with `get_generation`. A failed block is filmed again alone, at
   most twice; the others stay.
3. Re-voice each block; wait the same way.
4. Place them (section 5), look, then export.

Before you show it:

- `get_video`: each layer starts and ends where its block does, and the video is as long as the
  base (layers never make it longer).
- Every block filmed and re-voiced; none missing, none in another voice.
- With a script the person gave: every sentence said, in order, nothing added. Captions do not
  hear layers, so this can only be checked on a scratch copy: a second project with the blocks
  as clips, `write_captions` (its one charge, quoted with the rest), compare the lines with the
  script, then `delete_video` on the copy. Offer it in the plan; without it, say the words were
  not checked.

## 7. Captions

`write_captions` hears clips and voiceovers, never layers: the presenter's words are not
captioned. Say so before the person expects them. Captions of the base's own speech still work.

## 8. Show it

```
**Narrated by Mia**: 32 s, Mia in a card on the left over your video, 4 parts, your video's
own sound off.
[Watch the video](<export.url>) · [Open in Video Studio](<studio_url>)
Used <N> credits. <M> left.
```

Say the voice, the number of parts, how much of the video she covers, where the card sits and
that the original sound is off.

## 9. If it goes wrong

| What happened | Fix |
|---|---|
| A block's words are cut or changed | Film that block again with fewer words, inside 31 to 35 per 10 s |
| The first frame holds still while the voice starts | The brief opens mid-sentence; film the block again |
| The voice changes between blocks | A block was not re-voiced, or with another `voice_id`: re-voice it |
| The card covers the product or a face | `update_layer`: another `row`, or a smaller `width` |
| A cut-out shows green edges | `replace_layer` with `kind: "video"`: the card |
| The base's sound is gone and the person wants it | Turn it back on (`update_clip` with `sound: true`); it then plays at full level under the presenter |
