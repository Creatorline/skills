# Narration and assembly

Writing the narration, timing the scenes, pricing the whole video, and building it in the Video
Studio so every picture changes exactly where its line does. Tool and field names are the
connector's; `get_video_guide` lists every operation and limit.

## Contents

1. [Writing narration lines](#1-writing-narration-lines)
2. [The narrator voice](#2-the-narrator-voice)
3. [How long each scene runs](#3-how-long-each-scene-runs)
4. [Pricing the whole video](#4-pricing-the-whole-video)
5. [Building the video](#5-building-the-video)
6. [Fitting the pictures to the lines](#6-fitting-the-pictures-to-the-lines)
7. [Putting the motion in, and realigning](#7-putting-the-motion-in-and-realigning)
8. [Still pictures](#8-still-pictures)
9. [Stock footage](#9-stock-footage)
10. [The in-studio route](#10-the-in-studio-route)
11. [Texts, music and reactions](#11-texts-music-and-reactions)
12. [Captions and export](#12-captions-and-export)
13. [Pitfalls](#13-pitfalls)

## 1. Writing narration lines

- One line per beat, one or two sentences: 7-14 words, the hook 8 or fewer.
- Write for the ear: short words, contractions, few commas. The voice stops briefly at each
  comma and full stop, so chopped sentences eat the beat's seconds; join them where it reads
  naturally.
- Write numbers and dates the way they should be read ("eighteen eighty-three", "about two
  hundred"). Spell a hard name the way it sounds; correct its spelling in the captions later with
  `edit_caption`.
- Never repeat the same run of five or more words in one script.
- Feelings are tags in the words: `[whispers]`, `[pauses]`, `[excited]`, `[cheerfully]`,
  `[curious]`, `[sad]`, `[sighs]`, `[laughs]` (`get_video_guide` `voiceover_feelings`). They stay
  in English whatever the language. One or two per video at most; each one adds time.
- `text` is the exact words to say, never a description of them. A voiceover reads in the
  language its words are written in: write the lines in the brand's `language` unless the person
  asked for another.
- One voiceover holds up to 2,000 characters; a beat's line is far below that.

## 2. The narrator voice

- Pass the same `voice_id` on every `add_voiceover` of the video. Left out, the voiceover uses the
  brand's own voice: its default avatar's, else the brand's, else a stock default.
- A brand whose avatar has its own voice: that voice narrates. The face never appears, the voice
  stays the channel's.
- Otherwise `list_voices` with a `search` from the format (formats.md, section 1). Choose by the
  voice's own `name` and `description`, name it in the defaults line, and swap it if the person
  asks. For a language the workspace voices do not cover, `scope: "library"` with `language`
  (such as `tr`).
- Never invent what a voice sounds like, and never make audition takes.

## 3. How long each scene runs

| What | Rule |
|---|---|
| A beat's length, estimated | Its words divided by 2.3, plus 0.3 s for a breath. Use it as the clip's first `duration`. |
| A scene's motion length (Moving scenes) | Its words divided by 2.3, plus 0.5 s, rounded up to a whole second; at least 4, at most 15. |
| A beat that comes out over about 6 s | Split it into two scenes with two pictures. |

The motion is made a little longer than the line on purpose: the clip is trimmed to the real
line later at no cost, and a take that is too short has to be slowed down.

## 4. Pricing the whole video

Quote every part without starting anything, add it up, and ask one yes (house rules, section 2).
For six beats in Moving scenes:

| Part | Call, without `confirm` | Count |
|---|---|---|
| Opening picture, three options | `create_generation` `{ tool: "text-to-photo", brand_id, prompt: <opening brief>, count: 3 }` | once |
| Other pictures | `create_generation` `{ tool: "text-to-photo", brand_id, prompt: <beat 2 brief> }`; the rest cost the same | times 5 |
| Motion | `estimate_generation_cost` `{ tool: "photo-to-video", params: { duration: <s>, generate_audio: false } }`, one call per distinct length | per scene |
| Narration | `get_video_guide` `credits.voiceover` | times 6 |
| Captions | `credits.captions` | once |
| Export | `credits.export` | once |

Still pictures: no motion line; every picture at `resolution: "2K"` (the opening's three
options too), and `count: 2` for each other beat. Stock footage: no picture or motion lines
unless some beats need AI pictures.

> A 30-second history short in an oil-painting look: six moving scenes, narrated by <voice
> name>, captions on.
> - Pictures (8, three of them options for the opening): <a> credits
> - Motion for six scenes: <b> credits
> - Narration, six lines: <c> credits
> - Captions and export: <d> credits
>
> Total <N> credits; you have <M>. Go ahead?

The yes covers exactly these parts. A redo, another look, an extra scene or a longer video is
quoted again before it runs.

## 5. Building the video

`create_video`, free, after the pictures are ready:

```json
{
  "brand_id": "<brand id>",
  "title": "The lighthouse that never went dark",
  "operations": [
    { "op": "add_clip", "asset_id": "<picture 1>", "id": "s1", "duration": 3 },
    { "op": "add_clip", "asset_id": "<picture 2>", "id": "s2", "duration": 5 },
    { "op": "add_clip", "asset_id": "<picture 3>", "id": "s3", "duration": 5 },
    { "op": "add_clip", "asset_id": "<picture 4>", "id": "s4", "duration": 5.5 },
    { "op": "add_clip", "asset_id": "<picture 5>", "id": "s5", "duration": 5 },
    { "op": "add_clip", "asset_id": "<picture 6>", "id": "s6", "duration": 5 },
    { "op": "set_all_clips_sound", "sound": false }
  ]
}
```

- `duration` is how long a PHOTO shows (0.3 to 30 s). A video clip takes `trim_start` /
  `trim_end` instead.
- Muting every clip now keeps the motion takes muted when they replace the pictures.
- Keep the video's `id` and `studio_url`. "Nothing is heard" in `warnings` is expected until the
  narration is on.

## 6. Fitting the pictures to the lines

1. **Every line, in beat order:** `add_voiceover` with `video_id`, `text`, `voice_id`,
   `over: "s1"` (then `s2`, ...), `wait_seconds: 0`, `confirm: true`. Keep each `voiceover_id`.
2. **Wait:** `get_video` every 10-20 s until every voiceover's `status` is `ready`. Each one now
   has its real `start` and `end`. A voiceover that failed is gone from `voiceovers` and was
   refunded: add that line again (it was in the yes).
3. **Edit one, lengths:** each clip as long as its line plus a breath:
   `duration = (end - start) + 0.3`; the last clip `+ 0.8` so the ending lands.

   ```json
   { "video_id": "<id>", "operations": [
     { "op": "update_clip", "id": "s1", "duration": 2.9 },
     { "op": "update_clip", "id": "s2", "duration": 4.6 },
     { "op": "update_clip", "id": "s6", "duration": 5.4 }
   ] }
   ```

4. **Edit two, starts:** voiceovers stay where they were put when clips change length, so move
   each to its clip's new `start`, read from edit one's answer (never added up by hand):

   ```json
   { "video_id": "<id>", "operations": [
     { "op": "move_voiceover", "id": "<voiceover 2>", "start": 2.9 },
     { "op": "move_voiceover", "id": "<voiceover 3>", "start": 7.5 }
   ] }
   ```

5. **Check:** every voiceover starts on its own clip, nothing runs past the end, no `warnings`.

A VIDEO clip (stock, the brand's footage) is fitted by trimming: `trim_end = trim_start +` the
length wanted, when its source is long enough. When it is not, slow it with `speed` (the length
it shows divided by the length wanted, not below 0.75), or give the beat a second clip.

## 7. Putting the motion in, and realigning

1. `get_generation` with `wait_seconds: 45` on each motion run until `succeeded`; its
   `output[0].asset_id` is the moving scene.
2. `edit_video` with one `replace_clip` per finished scene (several in one call is fine):
   `{ "op": "replace_clip", "id": "s3", "asset_id": "<moving scene 3>" }`. The clip keeps its place
   and its length when the take is long enough, and stays muted.
3. If an `applied` note says "The new media is shorter", that clip shrank and every later clip
   moved earlier while the voiceovers did not. Slow that clip back to its length with
   `update_clip` `speed` (take length divided by needed length, not below 0.75). A speed change
   shifts the later voiceovers too, so then compare each voiceover's `start` with its clip's
   `start` in the answer and `move_voiceover` every one that differs. Below 0.75, put the
   picture back instead (`replace_clip` with the picture's asset id, then its `duration`): it
   costs nothing.
4. A failed motion run is refunded. Keep the still for that scene, tell the person, and offer a
   redo (quote it).

## 8. Still pictures

- Stills only, at `resolution: "2K"`, a new still every 1.5 to 3 seconds: about two per beat.
  Photos do not zoom or pan in the editor; the cuts are the motion.
- One call per beat with `count: 2` gives two takes of the same moment: cut them back to back.
  When the beat needs a wide shot then a close detail, write two briefs instead.
- The opening's three options: the chosen one opens, another can be its second shot.
- Ids per still: `s1a`, `s1b`, `s2a`, ... Each beat's voiceover goes `over` its first still.
- Fitting: the beat's length (line plus 0.3 s) is split evenly between its stills with
  `update_clip` `duration`; then each voiceover moves to its beat's first still (section 6).

## 9. Stock footage

- Per beat: `list_stock_clips` with `library: "hooks"` and `search` (one to three plain words
  of what the beat shows, such as `walking park`, `gym`, `laptop`, `beach sunset`, `car`). Read
  `title`, `tags` and `duration`; look with `preview_assets` `stock_ids` (up to 8). Many hook
  clips are people reacting to the camera: for b-roll, pick the ones caught doing something.
- In `create_video`: `{ "op": "add_clip", "stock_id": "<id>", "id": "s1", "trim_end": 4 }`, then
  `set_all_clips_sound` false.
- Fit by trimming (section 6). A clip runs 2.5 to 10 s; a longer line takes two clips.
- Beats stock cannot show (an object, a place, a number) take an AI picture in the same video.
- Only the narration, captions and export spend credits on an all-stock video.

## 10. The in-studio route

For a person who wants to watch it being built in the studio, or a scene added to a video that is
already there. No `count`, no reference picture, and the run order matters:

1. `create_video` with `brand_id` and `title` and no operations: an empty project.
2. Quote the whole video before anything starts (section 4). One `run_video_ai`
   `generate_photo` call without `confirm` gives a picture's price; each costs the same. The
   animations cannot be quoted on clips that do not exist yet: price each length with
   `estimate_generation_cost` (`tool: "photo-to-video"`,
   `model: "bytedance-seedance-2-5-image-to-video"`, the model the studio animates with,
   `params: { duration }`). Add narration, captions and export; one yes for the total.
3. Pictures: `run_video_ai` with `action: "generate_photo"`, `prompt` (the picture brief),
   `include_avatar: false`, `confirm: true`. Each answer's `summary` names the clip id the
   photo will have, and each new photo joins the END of the video when it is ready, so they
   can land out of order. `get_video` every 20 s until no clip is `generating`, then put them
   in beat order with `update_clip` `index`. They come out 9:16.
4. Motion: `run_video_ai` with `action: "animate_photo"`, `clip_id`, `prompt` (the full motion
   prompt, visual-style.md section 8) and `duration` (5, 10, 15, 20 or 30). The photo becomes
   the whole new video in its place, so animate BEFORE narrating.
5. `get_video` every 20 s until no clip is `generating`; then narrate and fit by trimming
   (section 6), captions, export.

## 11. Texts, music and reactions

Add texts once the clips are final: texts stay at fixed times when clips are trimmed or replaced.

- **Title** over the first scene, 3 to 6 words:
  `{ "op": "add_text", "text": "The lighthouse that never went dark", "over": "s1", "position": "top", "size": "l" }`.
  About 26 characters fit a line at size `m`, fewer at `l`.
- **Top-N labels**, the same `look` and `size` on each:
  `{ "op": "add_text", "text": "3. The Sahara", "over": "s2", "position": "top", "look": "tiktokHighlight", "size": "m" }`.
- **A call to action**, never spoken: `{ "op": "add_text", "text": "Follow for part two", "over": "s6", "position": "middle" }`.
- **Music**, only from the brand's library: `list_assets` with `brand_id` and
  `file_type: "audio"`, then `{ "op": "set_sound", "asset_id": "<track>" }`. It plays under the whole
  video and drops to a quarter while the narration speaks. A calm instrumental, never a song with
  words.
- **One reaction**, for an explainer or top-N: `list_stock_clips` with `library: "green_screen"`
  and `search: "shocked cat"`, then
  `{ "op": "add_layer", "stock_id": "<id>", "over": "s4", "width": 0.45, "column": "right", "row": "middle", "sound": false }`.
  Layers are not kept out of the apps' covered bands for you: check with `preview_video`
  `show_safe_area: true`.

## 12. Captions and export

- `write_captions` with `video_id`, `style` (formats.md, section 1), `position: "auto"`,
  `confirm: true`, once the clips and voiceovers are final. It hears the narration (never the
  music) in about a minute: `get_video` every 20 s until `captions.status` is `ready`.
- Read `captions.lines` and fix a misheard name or number:
  `{ "op": "edit_caption", "index": 4, "text": "In 1883 the lamp went out" }`.
- Change the look or place later for free: `{ "op": "set_captions", "style": "karaoke" }`.
- Clips changed after captions: `captions.status` is `out_of_date`; `write_captions` again when
  the cut is final (free and needs no yes).
- `export_video` with `video_id` and `confirm: true` when `ready_to_export` is true and there are
  no `warnings`. `get_video` every 15 s until `export.status` is `done`. `export.asset_id` goes to
  `create_post`; `export.url` is the MP4 to watch. Any edit after it makes `up_to_date` false, and a
  new export is charged again.

## 13. Pitfalls

- The operations of one call are applied all together or not at all; an `add_text` or `add_layer`
  before the first clip refuses the whole call.
- Texts, layers and voiceovers do not follow trims, removals or reorders: put them back with
  `update_text` / `update_layer` `over` and `move_voiceover`, then look again.
- Read `get_video` before each round of edits: the person may have the studio open and be
  changing it too.
- A retried `create_video` can leave two videos: check `list_videos` first.
- `preview_video` often shows each clip by its cover picture (`exact: false`): judge placement,
  overlap and readability, not the motion.
- The person may not see preview pictures in their chat: share links instead.
- The export is refused while a voiceover is generating or captions are being written.
- Limits: 180 s per video, 60 operations per call, 300 characters per text.
