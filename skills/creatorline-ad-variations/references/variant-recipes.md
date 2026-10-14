# Variant recipes

The exact calls for each row of the experiment matrix, how to price it, and what to watch for.

## Contents

1. [Before any recipe](#1-before-any-recipe)
2. [Pricing the set](#2-pricing-the-set)
3. [Hook line on screen](#3-hook-line-on-screen)
4. [Hook opener](#4-hook-opener)
5. [Hook plus captions in one pass](#5-hook-plus-captions-in-one-pass)
6. [End text](#6-end-text)
7. [Avatar](#7-avatar)
8. [Outfit](#8-outfit)
9. [Product](#9-product)
10. [New speech: lines or language](#10-new-speech-lines-or-language)
11. [Voice](#11-voice)
12. [Language, voiceover-led](#12-language-voiceover-led)
13. [Caption look](#13-caption-look)
14. [The same finishing on every version](#14-the-same-finishing-on-every-version)
15. [Getting the words of a video](#15-getting-the-words-of-a-video)
16. [Cutting a long source](#16-cutting-a-long-source)

## 1. Before any recipe

- `<source>` below is the winner's asset id, from `list_assets` or `import_asset`. A TikTok or
  Instagram post link also works in a generation's video slot; Video Studio needs an asset id,
  so import the link first.
- `<S>` is the source's `duration_sec`, rounded down: 4 to 30 for swaps and reshoots.
- The first time you use a tool in a conversation, read its slots and allowed values with
  `list_models` and `tool`. The keys below match today's catalog; the catalog wins if they differ.
- Leave `model` out unless the recipe names one.
- Every paid call: first without `confirm` (the quote), then the same arguments with
  `confirm: true` once the yes for the set is in.
- **Voices.** `change-voice`, `text-to-speech` and Reshoot's `change_voice` speak in the voice of
  `avatar_id` (else the brand's default avatar) when you pass no `voice_id`. Pass `voice_id` only
  for a different voice (`list_voices`). An avatar with no `voice_id` in `get_avatar` is read in
  a stock voice: say so before you plan speech rows for it.
- Every version starts from `<source>`. Never feed one version into another.

## 2. Pricing the set

| Row | How to get its price |
|---|---|
| Video Studio rows (hook line, opener, end text, caption look, voiceover language) | `get_video_guide`, `credits`: `export` per export, `captions` once per project that gets captions, `voiceover` per voiceover |
| `hook-captions`, `character-swap`, `reshoot`, `change-voice` on the source | `create_generation` with the exact arguments and no `confirm`: the `needs_approval` answer's `credits` |
| An avatar row's re-voice (section 7) | `estimate_generation_cost` with `tool: "change-voice"` and `inputs: {video_url: <source>}` |
| New speech (section 10) | `create_generation` without `confirm` for `text-to-speech` with the exact words, plus `estimate_generation_cost` with `tool: "lipsync"` and `inputs: {video_url: <source>}` (billed by the video's seconds) |

- Add every row up and ask one yes for the total, with the balance (`get_credit_balance`).
- Build the Video Studio rows after the yes. Their prices are fixed, so the yes covers
  `export_video`, `write_captions` and `add_voiceover` with `confirm: true` as quoted.
- A second step (a re-voice, a lip sync): call it once without `confirm` before you start it.
  Same price as quoted: go on. Higher: ask.

## 3. Hook line on screen

The same video with a new line over its first 3 seconds. The cheapest row: one export.

```
create_video {
  brand_id: <brand>,
  title: "glow-serum_H1_problem",
  operations: [
    { op: "add_clip", asset_id: <source>, id: "main" },
    { op: "add_text", id: "hook", text: "Your serum is wasted\nwithout this",
      start: 0, end: 3, position: "top", size: "l", look: "tiktokOutline" }
  ]
}
```

1. `preview_video` with `video_id`, `at: [0.5, 2.5]`, `show_safe_area: true`. The line must sit
   clear of the shaded bands and of any text already in the picture. Move it with `edit_video`
   (`update_text` with `position: "middle"`, or `y`).
2. `export_video` with `confirm: true`. Read `get_video` every 10 to 30 seconds until
   `export.status` is `"done"`.
3. The version is `export.asset_id`; its links are `export.url` and `studio_url`.

Use the same `position`, `size`, `look`, `start` and `end` on every hook row, so only the words
differ. Hook writing: [hook-variants.md](hook-variants.md).

## 4. Hook opener

A new first shot (a ready-made stock clip or the brand's own close-up) with the hook line over
it, then the original.

1. `list_stock_clips` with `library: "hooks"` and `search` (who and what: "surprised woman",
   "man kitchen"). Look at the best few with `preview_assets` and `stock_ids`.
2. Build:

```
create_video {
  brand_id: <brand>,
  title: "glow-serum_H4_opener",
  operations: [
    { op: "add_clip", asset_id: <source>, id: "main" },
    { op: "add_hook", stock_id: <stock id>, text: "Wait for the texture", trim_end: 2.5 }
  ]
}
```

- `add_hook` puts the opener first and lays the line over it for as long as it plays; the
  original starts that many seconds later.
- Keep the opener at 2 to 3 seconds: every second of it delays the first word.
- Check `has_sound`: a silent opener adds silence before the first word. The version is longer
  than the control by the opener: say so.
- The brand's own clip works too: `asset_id` instead of `stock_id`.

Then preview and export as in section 3.

## 5. Hook plus captions in one pass

One flat-priced run that burns a hook headline and word-timed captions onto the video. Only for a
source with no captions burned in yet.

```
create_generation {
  tool: "hook-captions", brand_id: <brand>,
  prompt: "Your serum is wasted without this",
  inputs: { source_video: <source> },
  params: { hook_mode: "manual", caption_style: "hormozi" }
}
```

- `hook_mode: "manual"` shows `prompt` word for word for the first 2.5 seconds. `"auto"` writes
  a hook from what is said; `"off"` shows none.
- For a fair test the control gets the same captions without a hook: the same call with
  `hook_mode: "off"` and no `prompt`, as its own row.
- No speech in the video: the hook shows as a title card. No speech and no hook: the run fails
  (refunded).
- The words cannot be corrected afterwards. When brand names or numbers must be exact, use Video
  Studio (sections 3 and 13).

## 6. End text

A different call to action over the last seconds. Same build as section 3: read the video's
`duration` from the `create_video` answer, then

```
edit_video { video_id: <video>, operations: [
  { op: "add_text", id: "cta", text: "Shop the link in bio",
    start: <duration - 2.5>, end: <duration>, position: "middle", size: "l", look: "tiktokOutline" }
] }
```

Same place, size and times on every row. A spoken call to action is a lines row (section 10).

## 7. Avatar

Another avatar in the same video: same moves, words, cuts, clothes and set.

```
create_generation {
  tool: "character-swap", brand_id: <brand>, avatar_id: <the version's avatar>,
  inputs: { source_video: <source> },
  params: { duration: <S>, resolution: "720p" }
}
```

- `model` left out is Transfer: the avatar takes the video's clothes and setting, so the person
  is the only change.
- Always set `duration` to `<S>`. Left out it is 15: the run is billed for 15 seconds whatever
  the video's length. The source is cut to its first `duration` seconds.
- No `prompt` for a plain swap.
- `resolution`: `480p` is cheaper and softer, `1080p` costs much more. Match the source; default
  `720p`.
- A second person in the video stays as they are. To replace both: `inputs.character` takes the
  second avatar's `image_url` from `get_avatar`; the version's avatar goes in first by itself.
- Never name the engine behind it. It is Character Swap, mode Transfer.

**Its voice.** The swap keeps the source's voice. To hear each avatar's own voice, re-voice the
swap's output as a second step, once it lands:

```
create_generation {
  tool: "change-voice", brand_id: <brand>, avatar_id: <the version's avatar>,
  inputs: { video_url: <the swap's output asset_id> }
}
```

- Do this on every avatar row or on none, so voice is not a second change.
- Only for one clear voice with no music under it, and only for an avatar with a voice of its
  own. Not on a two-avatar swap.
- Do not pass `params.change_voice: true` on the swap instead: that re-voice lands later as a
  separate creation that `get_generation` on the swap does not show.

## 8. Outfit

The same avatar in other clothes, everything else kept. For fashion and accessory brands.

```
create_generation {
  tool: "character-swap", model: "character-swap-replace", brand_id: <brand>,
  avatar_id: <the avatar already in the source>,
  inputs: { source_video: <source>, outfit: <garment photo> },
  params: { duration: <S> }
}
```

- Replace shows the avatar as its image shows it; with `inputs.outfit`, wearing that garment. It
  takes no `prompt`.
- Without `inputs.outfit` it dresses the avatar in its own image's clothes: that is a different
  test.
- When the person in the source is not this avatar, the person changes too. Say so, or run a
  plain Replace with no outfit as this test's control.
- The garment photo: the whole piece, on a plain background, front facing (product-intake.md).

## 9. Product

The same video filmed again with another product: same avatar, structure and beats.

```
create_generation {
  tool: "reshoot", brand_id: <brand>, avatar_id: <the avatar already in the source>,
  prompt: "<Direction>",
  inputs: { source: <source>, objects: [<product photo>] },
  params: { duration: <S>, change_voice: true }
}
```

Direction, in plain words:

```
The avatar presents the product in the attached photo instead of the serum in the video, at
the same moments and in the same way, label to the camera. Product: Glow C Serum, glass dropper
bottle that fits in one palm, 15% vitamin C printed on the label.
```

- Set `duration` to `<S>` (left out it is 10; the run is billed on it).
- Reshoot rewrites every spoken line and on-screen text that names the old product, to the same
  length. Lines that do not mention it stay word for word.
- `change_voice: true` (part of the Reshoot's own price) says the rewritten lines in the avatar's
  own voice; without it they are read in a stock voice. When lines change, the source's music may
  not carry over.
- The source must show the product being handled. Reshoot does not read links in the Direction:
  write the product facts in (product-intake.md).
- One main person in the source. Two leads, heavy effects or smoking break it.
- Reshoot films every frame again, so the picture is new even where nothing changed. Offer a
  plain Reshoot (no `objects`, no `prompt`, the same `duration` and `change_voice`) as this
  test's control, named `<base>_00_reshoot`.
- An avatar made from a real person's photo needs `model: "reshoot-seedance-2-0"` (up to 15 s).

## 10. New speech: lines or language

The same picture with new speech, lips matched. Two runs. Use it for a new offer, angle or spoken
call to action (L rows) and for another language (T rows). Reshoot cannot do this: it only
rewrites lines when the product changes.

1. Get the exact words (section 15).
2. Write the new script:
   - L rows: change only the line under test; keep the rest word for word.
   - T rows: translate for speech, not word for word.
   - Spoken, it must be no longer than the original: about 2.5 words per second
     (video-briefs.md, speech budget). The claim floor holds for every line.
3. The speech:

```
create_generation {
  tool: "text-to-speech", brand_id: <brand>, avatar_id: <the avatar in the source>,
  prompt: "<the new words>"
}
```

   The avatar's voice reads it (section 1). Leave `model_id` at its default: it reads the
   language the words are written in, and takes feeling tags such as `[excited]` or
   `[whispers]`.
4. `get_generation` until done. Compare the speech's `duration_sec` with the source's. Longer:
   shorten the words, or set `params.speed` (up to 1.2), and make the speech again (a new paid
   run: ask first).
5. The lip sync:

```
create_generation {
  tool: "lipsync", brand_id: <brand>,
  inputs: { video_url: <source>, audio_url: <the speech's asset_id> }
}
```

- One speaking face, turned to the camera most of the time. A small or covered face drifts.
- The result plays the new speech only: the source's music and room sound are gone. Put music
  back in Video Studio (`set_sound` with the brand's audio file, then an export) when the person
  has the track.
- When the original voice is not this avatar's (a real creator, another voice), the voice
  changes too. For a clean read, make a control the same way with the original words, named
  `<base>_00_revoiced`.
- Text burned into the picture stays in the old language. Caption a T row in its new language
  (section 13, or section 5 with `hook_mode: "off"`).
- A real person on camera: only with their permission (house-rules.md, section 7).

## 11. Voice

The same video, the same words and timing, another voice.

```
create_generation {
  tool: "change-voice", brand_id: <brand>,
  inputs: { video_url: <source> },
  params: { voice_id: <voice id> }
}
```

- Voices: `list_voices` with `search` ("warm female", "deep male narrator"); another avatar's
  `voice_id` from `get_avatar`; `scope: "library"` with `language` for a native speaker.
- `remove_background_noise: true` when the source is noisy.
- Only for one clear voice with no music under it. Music or two voices come out distorted: use
  section 10 with the music added back instead.

## 12. Language, voiceover-led

For a video whose speaker is not on camera (a product video, a narrated piece).

```
create_video {
  brand_id: <brand>, title: "glow-serum_T1_spanish",
  operations: [
    { op: "add_clip", asset_id: <source>, id: "main" },
    { op: "set_all_clips_sound", sound: false }
  ]
}
```

1. Music: `edit_video` with `{ op: "set_sound", asset_id: <music file> }` when the person has the
   track. Muting the clip mutes its music too.
2. `add_voiceover` with `video_id`, `text` (the narration, written in that language), `voice_id`
   (the brand's or avatar's, from `get_brand` or `get_avatar`), `start: 0`, `confirm: true`. It
   waits for the take; its `end` is the real length.
3. `write_captions` with `style` and `position: "auto"`, `confirm: true`. Read `get_video` until
   `captions.status` is `"ready"`; fix a wrong word with `edit_caption`.
4. Export as in section 3.

## 13. Caption look

The same video in each caption look, everything else equal. Needs a source with no captions
burned in. Captions are charged once per project, so make every look from ONE project:

```
create_video { brand_id: <brand>, title: "glow-serum_S_captions",
  operations: [ { op: "add_clip", asset_id: <source>, id: "main" } ] }
```

1. `write_captions` with `video_id`, the first look's `style`, `position: "auto"`,
   `confirm: true`.
2. `get_video` every few seconds until `captions.status` is `"ready"`. Read `captions.lines`; fix
   brand names and numbers with `edit_video` (`edit_caption` with `index` and `text`).
3. Export as in section 3 and note `export.asset_id`: that is the first version.
4. For each next look: `edit_video` with `{ op: "set_captions", style: <look> }` (free), export,
   note its `export.asset_id`. Every export stays in the library as its own file.

| `style` | Looks like |
|---|---|
| `hormozi` | Bold, the spoken word pops in yellow (the default) |
| `tiktok` | The app's own clean look |
| `minimal` | Plain words, no outline |
| `sticker` | White outline, sticker feel |
| `bold` | Heavy outline |
| `karaoke` | A colour sweep as each word is said |

The same position on every look. One-pass alternative: section 5 with `hook_mode: "off"` and each
`caption_style` (one flat run per look; the words cannot be corrected).

## 14. The same finishing on every version

When the change is made by a generation (avatar, outfit, product, speech, voice) and the versions
should carry a hook line or captions, finish every version AND the control the same way in Video
Studio: one project each with the same text, look, size and times, the same caption style and
position, then an export each. Price these rows with the set.

## 15. Getting the words of a video

Needed for speech rows and to keep new lines the same length.

1. The person's script: best. Ask once, inside the intake.
2. A Creatorline creation: its `prompt` in `list_assets` is the brief it was made from, not always
   the exact words. Use it for the idea, not for timing.
3. Otherwise: a Video Studio project with the source and `write_captions` (paid once; price it
   with the set). `captions.lines` in `get_video` is the transcript, with times. That project can
   also be the captioned control.

## 16. Cutting a long source

Swaps and reshoots take up to 30 seconds. For a longer winner:

```
create_video { brand_id: <brand>, title: "glow-serum_cut-30",
  operations: [ { op: "add_clip", asset_id: <source>, id: "main", trim_start: 4, trim_end: 34 } ] }
```

`trim_start` and `trim_end` are seconds of the source itself. Export it (one more paid row) and
use `export.asset_id` as `<source>` for every version, the control included, so all of them show
the same 30 seconds. When the first 30 seconds are the ones to keep, skip this: a swap cuts the
source to its `duration` by itself.
