# Calls

The exact calls for every route of this skill. Every paid call is made twice: first WITHOUT
`confirm` (nothing starts, nothing is charged, the answer is `status: "needs_approval"` with
`credits` and `credit_balance`, plus `sufficient` on a generation), then, after the person's
yes, with the same arguments and `confirm: true`. Ids below are placeholders: read real ones from the tools,
never show them to the person.

## Contents

1. [Voiceover over a video](#1-voiceover-over-a-video)
2. [Voice line](#2-voice-line)
3. [Dialogue](#3-dialogue)
4. [Re-voice](#4-re-voice)
5. [Lip sync](#5-lip-sync)
6. [Language version](#6-language-version)
7. [Pricing a batch](#7-pricing-a-batch)
8. [Waiting](#8-waiting)
9. [Limits](#9-limits)

## 1. Voiceover over a video

**A project to narrate.** Use the video's `video_id` from `list_videos`. For library videos,
make a project (free):

```json
{
  "brand_id": "<brand>",
  "title": "3 cold brew mistakes",
  "clips": [
    { "asset_id": "<video 1>", "id": "c1", "sound": false },
    { "asset_id": "<video 2>", "id": "c2", "trim_start": 0.5, "trim_end": 4, "sound": false },
    { "asset_id": "<photo>", "id": "c3", "duration": 3 }
  ]
}
```

That is `create_video`. Read every clip's `start` and `end` from its answer; never guess a
time. `preview_video` (free) shows what each clip shows.

**The clips' own sound.** `sound: false` on a clip in `create_video` mutes it from the start;
on a project that exists, `edit_video_clips` with `set_all_clips_sound` and `sound: false`
mutes every clip, `update_clip` with `id` and `sound: false` mutes one. Only a music bed (`set_sound`, an audio
file from the library) is turned down to a quarter under a voiceover by itself; a clip's own
sound stays at full level.

**The voiceover** (`add_voiceover`):

```json
{
  "video_id": "<video>",
  "text": "Three cold brew mistakes. [pauses] One: hot water. It pulls the bitter out in minutes.",
  "voice_id": "<the avatar's voice_id>",
  "over": "c1",
  "wait_seconds": 45
}
```

- `text`: the exact words, up to 2000 characters, feeling tags allowed. It is read as
  written, in the language it is written in, and the tags are always performed.
- `voice_id`: always pass it. Left out, the brand's default avatar's voice is used (a stock
  voice when it has none), which is wrong when the video is another avatar's.
- `start` (seconds on the timeline, from 0 to just before the end) or `over` (a clip id: start
  where that clip starts). Never both. Neither: 0 s.
- `wait_seconds`: 0 to 45, default 30. A take usually comes back in 5 to 30 seconds.
- Without `confirm`: `needs_approval` with the price. With `confirm: true`: the answer has
  `voiceover_id`, `credits_charged` and the whole `video`, whose `voiceovers[]` gives each
  one's `start`, `end` and `status` (`ready` or `generating`).
- Still `generating` when the call returns: read `get_video` again in a few seconds.

**Several voiceovers.** One take reads the whole script at one price, so prefer one. Use
several only when lines must start on clips that cannot move (one per window,
fitting-takes.md, section 2), or the script is over 2000 characters: split it at paragraph ends
into as few parts as possible (about 1800 characters each) and place each part at the previous
one's `end`. Every take has the same `voice_id` and the same opening tag. Quote them all before
the first one runs.

**Changing one** (free unless it is a new take):

| Change | Call |
|---|---|
| Start it elsewhere | `edit_video_sound`: `{ "op": "move_voiceover", "id": "<voiceover>", "start": 2.5 }` |
| Take it off | `edit_video_sound`: `{ "op": "remove_voiceover", "id": "<voiceover>" }` |
| New words or another voice, same place | `add_voiceover` with `replace_id: "<voiceover>"`, new `text` and `voice_id`, no `start` or `over`. A paid take. The old take plays until the new one is in. |

**The export** (`export_video`), last, after captions if any:

```json
{ "video_id": "<video>" }
```

Without `confirm`: the price. With `confirm: true` it runs in the background: `get_video`
every 10 to 20 seconds until `export.status` is `done`. Then `export.url` is the MP4 to show
and `export.asset_id` goes to `create_post`. Refused while a voiceover or captions are still
being made (`ready_to_export` in `get_video` says when it can run). Every export is charged,
so export once, at the end.

## 2. Voice line

`generate_text_to_speech`:

```json
{
  "brand_id": "<brand>",
  "prompt": "Three things nobody tells you about cold brew. [curious] Ready?",
  "params": { "voice_id": "<the avatar's voice_id>" }
}
```

- `prompt` is the exact words to say, up to 2000 characters. Not a description of them.
- `params.voice_id`: always pass it. Left out, it is a stock voice.
- `params.model_id`: leave it out. The default, `eleven_v4`, performs feeling tags and speaks
  the language the words are written in; `eleven_v3` does too. `eleven_multilingual_v2` reads
  tags out loud: use it only when the person asks for it and the words carry no tags. A set
  pace is `params.speed` (0.7 to 1.2), on any engine but `eleven_v3`. Never use `speed` to make
  words fit a window: change the words (fitting-takes.md, section 4). All the lines of one job
  use the same `model_id`.
- The output is an audio file (`output[].url`, `asset_id`). It can go to a lip sync
  (`audio_url`), or under a Video Studio project (`set_sound`: plays from 0 s, is not
  captioned). Over a video, prefer a voiceover (section 1).
- When `duration_sec` comes back far from the word count divided by 2.5, the words were not
  read as written. Do not pay for the same call again; tell the person.

## 3. Dialogue

`generate_dialogue`:

```json
{
  "brand_id": "<brand>",
  "prompt": "A: Be honest. How many leg days did you skip this month?\nB: [laughs] Define skip.\nA: Two squats a day. That's it.",
  "params": {
    "voice_a": "<voice for A>",
    "voice_b": "<voice for B>",
    "stability": 0.5
  }
}
```

- Every turn on its own line, starting `A:` or `B:`. A line with no label is added to the
  turn above it (a first line with no label is A). 2000 characters at most across all turns,
  labels not counted.
- Pass BOTH voices, always, and make them different. Left out, a speaker gets a stock voice
  or the avatar's, so the two can sound alike, or the run fails.
- `stability`: `0` (most expressive, least predictable), `0.5` (natural, the default), `1`
  (steadiest, flattest).
- Feeling tags are always performed, inside any turn.
- The output is one audio file with both voices.

## 4. Re-voice

A library or generated video, `generate_change_voice`:

```json
{
  "brand_id": "<brand>",
  "inputs": { "video_url": "<video asset id>" },
  "params": { "voice_id": "<the avatar's voice_id>", "remove_background_noise": false }
}
```

- `inputs.video_url` takes an asset id, a direct video file link, or a TikTok / Instagram
  post link.
- `params.voice_id`: always pass it. Left out, it is a stock voice.
- `remove_background_noise: true` for a noisy room. Leave it `false` for a clean take.
- The words, their timing, the lip movement and the delivery stay; only the voice changes.
- Up to about five minutes of video. One price per run, whatever the length.

A clip inside a Video Studio project, `change_clip_voice` (the result takes the clip's place,
so the edit around it stays):

```json
{
  "video_id": "<video>",
  "clip_id": "<clip>",
  "voice_id": "<the avatar's voice_id>"
}
```

Confirmed, it answers at once; the clip shows `generating` in `get_video` until the new take
is in, and its sound is turned on. It re-voices the clip's whole source, not only the trimmed
part, and works on one of the brand's own clips, never a stock clip. `voice_id` left out is
the brand's default avatar's voice.

## 5. Lip sync

`generate_lipsync`:

```json
{
  "brand_id": "<brand>",
  "inputs": {
    "video_url": "<video asset id>",
    "audio_url": "<audio asset id>"
  }
}
```

- `video_url`: the face to sync: an asset id, a video file link, or a TikTok / Instagram post
  link. `audio_url`: a voice (an asset id from a voice line or `list_assets` with
  `file_type: "audio"`, or an audio file link). A voice, not music.
- Priced per second of the VIDEO: trim it to the part you need first (Video Studio, then
  export), and quote with the real video in `inputs`.
- The avatar is not added by itself: the face is whoever is in the video.
- The default model, `sync-3-lipsync`, takes no params. When the audio and the video differ
  in length and you need to choose what happens, name `"model": "sync-lipsync-v2-pro"` and set
  `params.sync_mode` (writing-for-voice.md, section 7, has what each one does):

```json
{
  "brand_id": "<brand>",
  "model": "sync-lipsync-v2-pro",
  "inputs": { "video_url": "<video asset id>", "audio_url": "<audio asset id>" },
  "params": { "sync_mode": "cut_off" }
}
```

`sync_mode` values: `cut_off` (the default), `loop`, `bounce`, `silence`, `remap`.

## 6. Language version

**A narrated video (no one speaks on camera).** In its Video Studio project:

1. The steps below change the project in place. If the original language has no up-to-date
   export (`export.up_to_date` in `get_video`) and the person wants to keep it as a file,
   quote an export of it first: its MP4 stays in the library.
2. `add_voiceover` with `replace_id` for each voiceover, the words written fresh in the new
   language, the same `voice_id`.
3. `edit_video_texts` with `update_text` for every on-screen text, in the new language.
4. Captions, if the video has them: `write_captions` again (free after the first time).
5. `export_video`.

**A video where a face speaks.**

1. The words of the original: from the conversation, from the person, or heard by captions
   (put it in a Video Studio project, `write_captions`, read `captions.lines`; captions are
   paid the first time, so quote them with the rest).
2. Write the new language's lines to the same seconds (the video's `duration_sec`).
3. Quote the voice line (`generate_text_to_speech`, no `confirm`) and the lip sync
   (`generate_lipsync` without `confirm`, with only `inputs.video_url`: the audio does not
   exist yet, so it answers with an estimate, and the price follows the video). One yes for
   the total.
4. Run the voice line; wait; read its `duration_sec` when given. Much longer than the video:
   rewrite shorter and ask before a second voice line.
5. `generate_lipsync` with `video_url` and the voice line's `asset_id` in
   `audio_url`, first without `confirm`: if the price is the one quoted, confirm; if not, ask.
6. Expect only the new voice in the result: music or room sound from the original is not
   kept. Put music back in Video Studio (`set_sound`).

For an avatar video made in Creatorline, filming it again in the new language
(`creatorline-talking-video`) often gives the most natural mouth. Offer it beside the lip
sync when the take is short.

## 7. Pricing a batch

- Quote every paid call of the job first, without `confirm`, then add them up and ask once.
- `add_voiceover`, `export_video`, `write_captions` and `change_clip_voice` answer with their
  price when called without `confirm`.
- A `generate_*` tool answers with its price without `confirm`. For a step whose input does not
  exist yet (a lip sync of audio you are about to make), call its tool without `confirm` with
  the inputs you have: it answers with an estimate (`estimate: true`).
- A voice take, a voice line and a dialogue are priced per run, not per word, up to their
  2000 characters; so is a re-voice. A lip sync is priced per second of its video.
- If a call's price at run time differs from the quote, ask again before confirming.
- `sufficient: false`: do not confirm. Offer less (one voiceover instead of three, a shorter
  clip to lip-sync).

## 8. Waiting

| Job | How to wait | Usually |
|---|---|---|
| `add_voiceover` | The call waits (`wait_seconds` up to 45); then `get_video` | 5 to 30 s |
| Voice line, dialogue | `get_generation` with `wait_seconds: 45` | Under a minute |
| Re-voice, lip sync | `get_generation` with `wait_seconds: 45`, again until done | One to a few minutes |
| `change_clip_voice` | `get_video` every 10 to 20 s | A few minutes |
| Captions, export | `get_video` every 10 to 20 s | About a minute; one to a few |

A run over the workspace's parallel limit stays `queued` and starts by itself: say it is
waiting for a free slot. Never start a job a second time, and never send a call again only
because its answer was lost: read `get_video` or `get_generation` first. A job whose status has
not changed for 20 minutes: stop waiting, tell the person what is still pending, and do not
start it again.

## 9. Limits

| Limit | Value |
|---|---|
| One voiceover, one voice line, one dialogue | 2000 characters |
| A Video Studio video | 180 s |
| `add_voiceover` `wait_seconds` | 0 to 45 (default 30) |
| `get_generation` `wait_seconds` | 0 to 45 (default 20) |
| Re-voice | about five minutes of video |
| `speed` (voice line, any engine but `eleven_v3`) | 0.7 to 1.2 |
| `stability` (dialogue) | 0, 0.5 or 1 |
| `sync_mode` (`sync-lipsync-v2-pro` only) | `cut_off`, `loop`, `bounce`, `silence`, `remap` |
| Audio file brought in by `import_asset` | 50 MB |
| One audio file of speech | 2000 characters: a longer script comes back as several files, in order |
