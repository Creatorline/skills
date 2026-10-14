# Timeline rules

The mechanics of `create_video` and `edit_video`: how time is counted, what moves when
something changes, what you get when you leave a field out, and what each refusal means.
`get_video_guide` lists every operation with its fields; this file says how they behave
together.

## Contents

1. [Two clocks](#1-two-clocks)
2. [What moves when](#2-what-moves-when)
3. [What you get by default](#3-what-you-get-by-default)
4. [Ids and `over`](#4-ids-and-over)
5. [One call: all or nothing](#5-one-call-all-or-nothing)
6. [Media a video can use](#6-media-a-video-can-use)
7. [Two writers on one video](#7-two-writers-on-one-video)
8. [Work that runs in the background](#8-work-that-runs-in-the-background)
9. [Refusals and fixes](#9-refusals-and-fixes)
10. [Who sees a video, and deleting one](#10-who-sees-a-video-and-deleting-one)

## 1. Two clocks

| Field | Counts | Example |
|---|---|---|
| `trim_start`, `trim_end` | Seconds of the clip's own SOURCE file | A 12 s file shown from 2 s to 9 s: `trim_start: 2`, `trim_end: 9` |
| `start`, `end`, `at` | Seconds on the video's timeline | A text from 4 s to 6.5 s into the finished video |
| `duration` | A photo clip's or a layer's length | A photo shown for 2 s |

- "The wrong moment of the clip shows" almost always means a timeline second was used as a
  source second, or the other way round.
- A clip's length on the timeline is `(trim_end - trim_start) / speed`.
- Times are seconds to the hundredth. Read them from the answer (`clips[].start`, `end`,
  `trim_start`, `trim_end`, `source_duration`); never add them up yourself.
- A layer's `trim_start` is where in its own source it starts playing.

## 2. What moves when

| Change | Texts | Layers | Voiceovers | Captions |
|---|---|---|---|---|
| `add_clip` at the end | Stay | Stay | Stay | Out of date |
| `add_clip` with `index`, `add_hook`, `duplicate_clip` | What comes after moves later by the new clip's length | Same | Same | Out of date |
| `update_clip` with `speed` | Stretched over the clip; later ones move | Stay | Start over the same picture as before | Out of date |
| Trims, `remove_clip`, `split_clip`, `update_clip` with `index` | Stay at their times (kept inside the video) | Stay | Stay | Out of date |
| `replace_clip` | Stay (the clip keeps its length when the new media is long enough) | Stay | Stay | Out of date |
| Texts and layers added, changed or removed | | | | Unchanged |
| A voiceover added, moved or replaced | | | | Out of date |

After a trim, a removal or a reorder, re-anchor what belonged to a clip:
`{ "op": "update_text", "id": "<text>", "over": "<clip>" }`,
`{ "op": "update_layer", "id": "<layer>", "over": "<clip>" }`, and `move_voiceover` with a new
`start`. Then `preview_video` at those moments.

Captions are timed to the cut they were heard from and never move. When the cut or a voiceover
changes they show `captions.status: "out_of_date"`: `write_captions` again. Once a video has
paid for its captions this is free and starts without a yes; if the answer is a price, ask.
Turning a clip's sound on or off does not put them out of date.
The export also hears out-of-date captions again by itself, which drops any `edit_caption`
fixes, so write and correct them only when the cut is final.

## 3. What you get by default

| You add | When you leave fields out |
|---|---|
| `add_clip`, a video | The whole source, `speed` 1, its sound on, at the end. When every clip so far is muted, the new one is muted too |
| `add_clip`, a photo | Shown 3 s (`duration` 0.3 to 30) |
| `add_hook` | The clip goes FIRST; its line becomes a text over the whole hook, white with a dark edge, size `m`, centered, near the top. Everything already there moves later by its length. The text's id is in the `applied` note |
| `add_text` | 0 to 2.5 s (or exactly over a clip with `over`), look `tiktokOutline`, size `m`, centered, near the top. An `end` past the video is brought back to its end, with a note |
| `add_layer`, a stock green screen clip | Keyed (its green removed), heard; a full 9:16 clip fills the frame, any other is 0.6 wide in the middle |
| `add_layer`, a photo | 0.7 of the frame wide (0.5 when it is tall), centered, shown 3 s, no line, square corners |
| `add_layer`, another video | `kind: "video"`, shown as it is, 0.8 wide (0.5 when tall), at the bottom, silent, no line, square corners |
| `set_split_screen` (first time) | `place: "bottom"`, `share: "half"`, `sound: false` |
| `set_sound` | Plays from 0 s under the whole video |
| `write_captions` | Style `hormozi`, position `auto`: the bottom row, or the middle when a clip has a split screen or a card covers the bottom |
| `add_voiceover` | From 0 s, in the brand's voice |

Every add is the same each time: nothing copies the look of what was added before. Name a
`look` or `size` only when you want a different one.

## 4. Ids and `over`

- On an `add_*` operation, `id` is a name you choose: 1 to 32 letters, digits, `-` or `_`,
  unique across the video's clips, texts, layers and voiceovers. Readable ids ("hook", "c2",
  "title", "cta") make the next calls easy to write. Left out, you get one in the answer.
- Later operations in the same call can name what an earlier one added.
- `split_clip` and `duplicate_clip` make a new clip whose id you do not choose: read it in the
  `applied` note before naming it.
- On every other operation, `id` is the id of the thing to change, as `get_video` prints it.
- `over` takes a clip id, or `"video"` for the whole video. It sets both start and end, so it
  goes INSTEAD of `start` / `end` (a text) or `start` / `duration` (a layer).

## 5. One call: all or nothing

- The operations of one call are applied in order. If one cannot be done, NOTHING from that
  call is saved, and the answer names the operation (by its place in the list, counting from 0),
  the reason and what would be valid.
- Fix that one operation and send the whole list again. Never send only the rest.
- At most 60 operations per call. A bigger build goes in several calls: the clips first, then
  texts and layers. Each call is all or nothing by itself.
- A time that only runs past the video's end is not refused: it is brought back inside and
  the `note` says so. Read the notes.
- `create_video` makes a new video every time it is called. If a call timed out, look in
  `list_videos` before calling it again.

## 6. Media a video can use

| Source | Field | Notes |
|---|---|---|
| The brand's own files, and files shared across the workspace | `asset_id` | From `list_assets`, `import_asset` or a generation's output. Another brand's file reads as not found |
| The stock library | `stock_id` | From `list_stock_clips`: `hooks` (2.5 to 10 s, all vertical, mostly silent) and `green_screen` (all with sound). Never with `asset_id` in the same operation |
| An audio file | `asset_id` in `set_sound` only | Audio is never a clip or a layer |

- A file still uploading or being generated is refused until it is ready ("has no file yet").
- A video whose length cannot be read is refused: import it again with `import_asset`.
- A file on the person's device cannot travel through the chat: a public link to the file, or
  an upload on the app's assets page, then `list_assets`.
- `run_video_ai` works only on the brand's own files, never on a stock clip.

## 7. Two writers on one video

The project you edit is the one the studio opens. The person can watch it at `studio_url`
while you work, and each change you save appears there as you make it.

- Every save is checked against the version it was made from (`revision` in the answer). When
  someone else saved in between, the server makes your change again on the newest version, a
  few times.
- When it still cannot, the answer says the video "is being changed somewhere else right now,
  so nothing was saved". Read `get_video` and make the change again on what is there now. The
  ids you used may be gone: the refusal lists the ones that exist.
- When the person has unsaved changes in the studio, it asks them "Show new version" or "Keep
  mine". "Keep mine" keeps theirs and drops yours: read `get_video` before assuming your last
  change is there.
- So: read `get_video` before every new round of edits, before captions and before the
  export, and ask the person not to edit the same video while you do.

## 8. Work that runs in the background

| Work | Starts with | How it reports | How long |
|---|---|---|---|
| A voiceover | `add_voiceover` with `confirm: true` | The call waits for the take (`wait_seconds`, 30 by default, at most 45) and answers with its real `end`; still `generating`: read `get_video` again | Usually 5 to 30 s |
| Captions | `write_captions` with `confirm: true` | `captions.status` in `get_video`: `writing`, then `ready` (or `failed`) | About a minute |
| AI on a clip | `run_video_ai` with `confirm: true` | The clip shows `generating` in `get_video` and the result takes its place. A new clip from words shows only as a "Wait: ... being generated" line in `warnings` until it joins the end | Usually a few minutes |
| The export | `export_video` with `confirm: true` | `export.status`: `running`, then `done` (or `failed`) | One to a few minutes |

- `get_video` answers at once: read it every 10 to 30 s, with one short line to the person
  between reads. Reading it also puts any finished voiceover or AI result on the video.
- `ready_to_export` is true when the video has clips, is 180 s or shorter, and nothing is
  generating, being captioned or being exported.
- An export or a caption run still going after 15 minutes is marked failed ("It took too long
  and was stopped"). Say so plainly and ask before starting it again (a new export is charged
  again).
- After an export, any edit marks it `up_to_date: false`. That version needs its own export,
  charged again.
- A failed voiceover, caption run, AI run or export gives its credits back by itself.

## 9. Refusals and fixes

| The answer says | Fix |
|---|---|
| "Unknown operation ..." | Use a name from `get_video_guide` |
| "... does not take `x`. It takes: ..." | Drop the field, or use the operation that takes it |
| "... needs `asset_id` or `stock_id`" | Name the media |
| "Add a clip first" | `add_clip` before any text, layer, voiceover or caption |
| "`id` ... is already the id of a ..." | Pick another id, or leave `id` out |
| "No clip / text / layer ..." | Use an id from the list in the message |
| "`trim_end` is ... past the source's end" | At most `source_duration` |
| "A clip plays at least 0.3 s" | Widen the trim |
| "`duration` is how long a PHOTO shows" | A video is cut with `trim_start` / `trim_end` |
| "`trim_start` is for a video clip" | A photo takes only `duration` |
| "... is a sound, not a clip" | Audio goes in `set_sound` |
| "... is a video / photo, not a sound" | `set_sound` takes an audio file |
| "Nothing to cut at ..." | `at` inside a clip, at least 0.3 s from both of its ends |
| "Pass `over` or `start` / `end`, not both" | One way of timing |
| "Pass `position` ... or `y`, not both" | One way of placing |
| "`fill` covers the frame" | Leave `column`, `row` and `width` out with `fill` |
| "A green screen layer has no edge" | `border` and `corners` are for photos and `video` layers |
| "This video has no captions yet" | `write_captions` before `set_captions` or `edit_caption` |
| "The captions' words are not written yet" | Wait for `captions.status: "ready"` |
| "AI is still working on clip ..." | Wait for it in `get_video` |
| "... is a ready-made stock clip: AI works on the brand's own files" | Use one of the brand's clips |
| "Clip ... shows N s; ... needs at least 5 s" / "films at most 30 s" | Trim it longer, or split it and run each part |
| "Character Swap in `replace` mode takes no direction" | Leave `prompt` out, or use `transfer` |
| "`mode` is Character Swap's" | Leave `mode` out for any other action |
| "`prompt` is needed" | Say what happens, what changes or what the new clip shows |
| "`duration` is ...; ... makes N seconds" | Use a length from the message |
| "... is longer than one new take: pass `duration`" | A Reshoot of a long clip: pick one of the lengths it lists |
| "No avatar ... that this brand can use" | An avatar from `list_avatars` |
| "... this brand has no default one: pass `avatar_id`" | Ask which avatar, by name, from `list_avatars` |
| "`text` is N characters; one voiceover reads up to 2000" | Split it into several voiceovers |
| "`replace_id` keeps the voiceover where it is" | Leave `start` and `over` out; move it with `move_voiceover` |
| "Not yet: ..." on the export | Wait until `ready_to_export` is true |
| "The video is N s long; an export takes up to 180 s" | Trim or remove clips |
| "This video is being changed somewhere else right now" | Section 7 |

Refusals about the trial, the balance or the plan follow house rules, section 8.

## 10. Who sees a video, and deleting one

- A video made through the chat belongs to the person signed in, as one they made in the
  studio would. Signed in from an app, a member reaches their own videos and the shared ones;
  a teammate's private video reads as "No such video".
- `delete_video` takes a video out of the studio for good: nothing brings it back. Its clips,
  photos, sounds and exported MP4s stay in the library. Only on the person's explicit yes,
  naming the video.
