# Calls

The exact arguments for every step of both routes. A paid call goes out first WITHOUT
`confirm` (the answer is the price), then again with the same arguments and `confirm: true`
after the person's yes. Ids below are placeholders: take them from the tools, never from the
person.

## Contents

1. [Limits and values](#1-limits-and-values)
2. [Route A: build the video with its hook](#2-route-a-build-the-video-with-its-hook)
3. [Route A: price and write the captions](#3-route-a-price-and-write-the-captions)
4. [Route A: proofread](#4-route-a-proofread)
5. [Route A: change the look or the place](#5-route-a-change-the-look-or-the-place)
6. [Route A: export](#6-route-a-export)
7. [Route B: one pass with hook-captions](#7-route-b-one-pass-with-hook-captions)
8. [Several videos at once](#8-several-videos-at-once)
9. [The plan and price message](#9-the-plan-and-price-message)

## 1. Limits and values

| Thing | Rule |
|---|---|
| Caption looks (`style`, `caption_style`) | `hormozi` (default), `tiktok`, `minimal`, `sticker`, `bold`, `karaoke` |
| Caption place (`position` on `write_captions` and `set_captions`) | `auto` (default), `top`, `middle`, `bottom` |
| Text looks (`look` on `add_text`) | `tiktokOutline` (default for new texts), `tiktokText`, `tiktokHighlight`, `tiktokTranslucent`, `snapchat`, `instagram` |
| Text sizes (`size`) | `s`, `m` (default), `l`, `xl` |
| Text rows (`position` on `add_text`) | `top`, `middle`, `bottom`. Not with `y`. |
| One text | Up to 300 characters; `\n` breaks a line |
| A new text left without times | 0 to 2.5 s |
| Video length for captions and export | Up to 180 s |
| Operations per `create_video` or `edit_video` call | 60 |
| `preview_video` | Up to 9 frames a call |
| Captions charge | Once per video. Hearing them again after a change is free. Refunded when nothing is said or the job fails; after a refund the next hearing is charged like the first. |
| Export charge | Every export. Refunded when it fails. |
| `hook_mode` (route B) | `auto` (default), `manual`, `off` |
| Route B hook | From 0 s for 2.5 s (less on a shorter video), small, at the top |

`get_video_guide` lists the same looks and limits live. If it disagrees with this table, it
wins.

## 2. Route A: build the video with its hook

Read `get_video_guide` once per conversation first. Every `add_*` operation takes an `id` you
choose, so later operations can name it.

**A hook line over the opening seconds** (the usual case):

```json
{
  "brand_id": "BRAND_ID",
  "title": "Fernly bottle review",
  "operations": [
    { "op": "add_clip", "asset_id": "VIDEO_ASSET_ID", "id": "main" },
    { "op": "add_text", "id": "hook", "text": "this bottle fits\nevery cup holder", "start": 0, "end": 3, "position": "top", "size": "l", "look": "tiktokOutline" }
  ]
}
```

**A title that stays the whole video** (list and POV formats): the same text with
`"over": "video"` in place of `start` and `end`. `over` cannot be combined with `start` or
`end`. Keep it to five words or fewer.

**A busy or bright opening**: `"look": "tiktokHighlight"` puts a solid plate behind each line,
which reads over anything.

**A ready-made opener before the video**, when its own first second is weak: find one with
`list_stock_clips` (`library: "hooks"`, `search` with a few words about the mood, such as
`shocked woman`), look at two or three with `preview_assets` (`stock_ids`), then:

```json
{ "op": "add_hook", "stock_id": "STOCK_ID", "text": "this bottle fits\nevery cup holder", "trim_end": 2.5 }
```

It puts the clip at the very start with the line over it for as long as it plays, and moves
everything else later. It changes the cut, so add it BEFORE `write_captions`. The line becomes
a text with an id the server picks (the `applied` note names it) in the default look and size
`m`: give it the brand's hook look and size with `update_text` on that id. Most stock hook
clips have no sound (`has_sound` says). The editing craft for openers lives in
`creatorline-video-studio`.

**A video that is already a Video Studio project**: `get_video` first, then `edit_video` with
`video_id` and only the `add_text` operation. If it already has a hook text, change it with
`update_text` and its `id` instead of adding a second one.

**Look** after every build or change:

```json
{ "video_id": "VIDEO_ID", "at": [0.5, 2], "show_safe_area": true }
```

The shaded bands are what the apps cover. In production a clip may be shown by its cover
frame (the answer's `note` says so): judge where things sit and whether the words read, not
the picture behind them.

## 3. Route A: price and write the captions

```json
{ "video_id": "VIDEO_ID", "style": "hormozi", "position": "auto" }
```

- Without `confirm`: `status: "needs_approval"`, `credits`, `credit_balance`, `summary`.
  Nothing is written or charged.
- With `confirm: true` after the yes: it answers at once with `captions.status: "writing"`.
  Read `get_video` about every 20 seconds until it is `ready` (about a minute).
- Already paid for on this video: the call without `confirm` starts at once, free. The same
  when only the look or the place changes on words that still fit: nothing is heard again.
- `clip_ids` captions only what is said in the named video clips: `"clip_ids": ["talk1",
  "talk3"]`. Use it to leave out a song's lyrics or a clip whose words should not show.
  `"clip_ids": []` is the whole video again. A photo clip cannot be named (nothing is said in
  it).
- Leave `style` out to keep the look the captions already have.

`captions.status` in `get_video`:

| Status | Means | Do |
|---|---|---|
| `writing` | Being heard now | Wait and read again |
| `ready` | Words are in `captions.lines` | Proofread (section 4) |
| `out_of_date` | The clips or voiceovers changed after they were heard | `write_captions` again (free), then proofread again |
| `not_written` | Captions were added but have no words | `write_captions` |
| `failed` | `captions.error` says why; refunded | Section "If it goes wrong" in SKILL.md |

## 4. Route A: proofread

`get_video` lists the lines: `{ index, start, end, text }`. Read them against what you know was
said: the script you wrote, the brand's name and products from `get_brand`, the names the
person gave you.

Fix every wrong line in one call, the highest `index` first:

```json
{
  "video_id": "VIDEO_ID",
  "operations": [
    { "op": "edit_caption", "index": 7, "text": "only 12 dollars" },
    { "op": "edit_caption", "index": 3, "text": "Fernly keeps it" }
  ]
}
```

- `index` is the line's number from `get_video`. The new words share the line's time evenly,
  so keep the same number of words and the highlight stays in step with the voice.
- The operations run in order, and every change regroups the lines AFTER it: a line that gains
  or loses a word can merge with or split from its neighbours, and their numbers move. Going
  from the highest `index` down keeps every number you read valid.
- The lines are grouped by the look (up to four words, five for `karaoke`, and a new line after
  a pause). After a change of look, read the lines again before using an `index`.
- Words show as written, so write the brand's name with its own capitals. `hormozi` puts
  everything in capitals by itself.
- Fix how a spoken word is written: a brand or product name, a person's name, a number, a
  foreign word. Never put words in that were not said, and never improve what was said. A word
  of a voiceover's `text` that the hearing missed WAS said (a voiceover reads its text exactly):
  put it back in the line where it is said (checking-captions.md, section 3).
- An empty `text` removes the line. Leave filler words ("um") unless the person asks.
- A later `write_captions` (after a cut, or the export hearing stale captions again) replaces
  these fixes. Proofread after the last change to the clips.

## 5. Route A: change the look or the place

Free, on a video whose captions exist:

```json
{ "video_id": "VIDEO_ID", "operations": [ { "op": "set_captions", "style": "tiktok", "position": "middle" } ] }
```

- `style`, `position`, or both. `position: "auto"` gives the place back to the layout.
- `remove_captions` takes them off. `write_captions` later starts them again; the video's one
  charge was already paid.
- The MP4 does not change until the next export, which is charged: quote it.

## 6. Route A: export

1. `get_video`: `ready_to_export` must be true and `warnings` empty. Captions that are
   `out_of_date` are heard again by the export itself, which drops your proofreading fixes:
   avoid it by running `write_captions` and proofreading first.
2. `export_video` with `video_id` (without `confirm` for the price, then `confirm: true`).
3. `get_video` every 10 to 30 seconds until `export.status` is `done`.
4. `export.url` downloads the MP4 (it expires); `export.asset_id` is the MP4 in the brand's
   library, for `create_post`. `studio_url` is the project in Creatorline.

Any edit after an export shows `up_to_date: false`: that version needs its own export, charged
again. The quote for an export the video already has says so.

## 7. Route B: one pass with hook-captions

One call makes a new MP4 with the captions and the hook burned in. The source stays as it was.

**Your own hook line:**

```json
{
  "tool": "hook-captions",
  "brand_id": "BRAND_ID",
  "prompt": "this bottle fits every cup holder",
  "inputs": { "source_video": "VIDEO_ASSET_ID" },
  "params": { "hook_mode": "manual", "caption_style": "hormozi" }
}
```

**A hook written from what is said** (`prompt` is not read in this mode, so leave it out):

```json
{
  "tool": "hook-captions",
  "brand_id": "BRAND_ID",
  "inputs": { "source_video": "https://www.tiktok.com/@brand/video/123" },
  "params": { "hook_mode": "auto", "caption_style": "tiktok" }
}
```

**Captions only**: `"hook_mode": "off"`, no `prompt`.

- `inputs.source_video` takes an asset id, a direct link to a video file, or a TikTok or
  Instagram post link (its video is imported for you). A web page link is refused before
  anything is charged.
- `list_models` shows this tool's prompt as not used. In `manual` mode it is the hook line all
  the same.
- No speech in the video: `manual` still burns the hook alone over the opening; `auto` and
  `off` fail (refunded), because there is nothing to caption and nothing to write a hook from.
- The frame is kept as it is: a wide video stays wide.
- After `confirm: true`, wait with `get_generation` and `wait_seconds: 45`. On `succeeded`,
  `output[0].asset_id` is the new MP4 and `output[0].url` its link.

## 8. Several videos at once

- Route B: one `create_generation` WITHOUT `confirm` per video, the same `caption_style` on
  all. Add up the `credits`, ask one yes for the total, then confirm each. Wait on each
  `generation_id` in turn and report each as it lands.
- Route A: one `create_video` per video (free), then `write_captions` and `export_video`
  WITHOUT `confirm` on each. One total, one yes. Write all the captions first, proofread each,
  then export each.
- A different hook line on each copy of one video (a hook test) is a batch of its own: see
  `creatorline-ad-variations`.

## 9. The plan and price message

After the free steps, one short message in plain words: no route letters, no tool names. The
look was asked in the intake when the brand had none (looks-and-placement.md, section 3); name
the one in use so the person can change it:

> Captions for "Fernly bottle review" (14 s), done in Video Studio so I can check the words
> before they are burned in:
> - Look: Hormozi, big caps with the spoken word in yellow (your brand's look).
> - Hook at the top for the first 3 s: "this bottle fits every cup holder". Say "no hook" to
>   skip it.
> - Captions N credits (once for this video) and the export N credits: T in all. You have M.
>
> Go ahead?

The one-pass version (route B):

> Captions and a hook burned onto "Fernly bottle review" in one quick pass, in your brand's
> Hormozi look, with a hook written from what is said. N credits; you have M. Go ahead?

Several videos: one line each with its price, then the total and one question.

When the person asked for a hook, give three lines with your pick first, and let a plain
"yes" mean the first:

> Hook (1 is my pick):
> 1. this bottle fits every cup holder
> 2. the cup holder test
> 3. the bottle that goes everywhere

A change of look or hook line after the quote does not change the price; a second export does.
