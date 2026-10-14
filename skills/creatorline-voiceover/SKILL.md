---
name: creatorline-voiceover
description: "Gives videos a voice: narration over a video, a voice line, a dialogue, a re-voice in the avatar's voice, a video in another language, or lip sync. Use for 'narrate this video', 'add a voiceover', 'use my avatar's voice', 'this video in Spanish', 'lip-sync this'. Not for the avatar on camera (creatorline-talking-video) or versions to compare (creatorline-ad-variations)."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Voiceover

This skill puts a voice on the person's content: narration written for the ear and timed to a
video's clips, a voice line or a two-voice conversation as an audio file, a video re-voiced in
their avatar's voice, the same video in another language, or a clip whose mouth follows new
audio. The avatar's saved voice is the default everywhere, so every post sounds like the same
person. Promise the person three things: words that fit the picture and the seconds, the voice
they expect, and a price they agreed to before anything runs.

## When to use

- "Narrate this video", "add a voiceover", "read this script over my clips".
- "Make it Mia's voice", "re-voice this with my avatar", "my videos all sound different".
- "This video in Spanish", "make a German version".
- "A voice line that says ...", "turn this script into audio".
- "A dialogue between a coach and a client", "two voices talking".
- "Lip-sync this clip to this audio", "make her mouth match the new words".

## Not for

| The person wants | Hand off to |
|---|---|
| Only the script; they record it themselves | `creatorline-short-script` |
| The avatar speaking on camera in a new video (exact lines included) | `creatorline-talking-video` |
| A whole narrated video with no face, from a topic | `creatorline-faceless-video` |
| A longer episode with the avatar as host | `creatorline-ai-host` |
| Word captions burned onto the video | `creatorline-captions` |
| Cuts, text, music, layers, export only | `creatorline-video-studio` |
| Two or more voice or language versions of one video, or versions to compare | `creatorline-ad-variations` |
| A new voice for an avatar, or a clone of a voice | The app: https://app.creatorline.io/avatars/new for a new avatar, the avatar's page at https://app.creatorline.io/avatars for an existing one |
| Music or sound effects made from words | Not available. Music is the person's own audio file under the video (`creatorline-video-studio`, `set_sound`). |

## Pick the route

| The person wants | Route | Tool | They get |
|---|---|---|---|
| A voice over a video (most requests) | **Voiceover** | `add_voiceover` on a Video Studio project | The video with the voice on its timeline |
| A voice line on its own | **Voice line** | `create_generation`, tool `text-to-speech` | An audio file |
| Two people talking | **Dialogue** | `create_generation`, tool `dialogue` | An audio file |
| The same words in another voice | **Re-voice** | `create_generation`, tool `change-voice`; for a clip inside a Video Studio project, `run_video_ai` with `action: "change_voice"` | The video, re-voiced |
| A face mouthing new audio | **Lip sync** | `create_generation`, tool `lipsync` | The video, mouth synced |
| Another language | **Language version** | Narration: new voiceovers in that language. A face speaking: a voice line, then a lip sync | The video in that language |

Whenever there is a video to narrate, take the Voiceover route, never a voice line laid under
the video: the words are read exactly as written, its answer gives the take's real length,
captions hear it, and it can be moved or re-taken in place. Tell the person what a route does
("Mia's voice reads it over your four clips"), never the tool or the engine behind it.

## What you need

| Route | Ask only if missing (hard gap) | Use without asking, and say so |
|---|---|---|
| Voiceover | Which video, when more than one could be meant | Words you write from the clips; the avatar's voice; the brand's `language`; starts at 0 s; the clips' own sound muted |
| Voice line | What it says, or what it is about | The avatar's voice; the brand's `language`; a natural, warm read |
| Dialogue | Who the two speakers are, and the topic | A in the avatar's voice, B a contrasting voice from `list_voices` named in the plan; about 20 s |
| Re-voice | Which video | The avatar's voice; the room sound left as it is |
| Lip sync | The video, and the audio or the words to say | A voice line you make first when only words are given |
| Language version | Which video, and which language | The same voice; on-screen text and captions change language too |

- The person's own script is used word for word. Trim only what cannot fit the seconds, and
  say what you cut.
- The clips' own sound stays on when the person asks, or when it is the point (a reaction, a
  sound that carries the joke).
- Spoken words use the brand's `language` unless the person asks for another. You reply in
  the language the person writes in.

## The voice

- **The avatar's voice first.** `list_avatars` and `get_avatar` give `voice_id` (and
  `get_avatar` its `voice_name`); `get_brand` gives the default avatar's `voice_id`. Use the
  avatar the person named, else the brand's default avatar.
- **Always pass it.** `voice_id` on `add_voiceover` and `run_video_ai`; `params.voice_id` on
  `text-to-speech` and `change-voice`; both `params.voice_a` and `params.voice_b` on
  `dialogue`. Left out, a run can speak in a stock voice or another avatar's.
- **No voice on the avatar.** Say so once, offer two or three fitting voices from
  `list_voices` by name with a few words each, the best match first, and say the avatar gets
  a voice of its own on its page in the app.
- **`list_voices`.** `scope: "workspace"` (the default) is Creatorline's own ready set.
  `scope: "library"` searches a large public library and also takes `gender` and `language`
  (such as `es`); both take `search` ("calm male narrator", "young upbeat female"). The
  person cannot hear a voice in chat: describe it from its `description`. Never show an id.
- **One narrator, one voice.** Keep it across a video and across a series. Change the mood
  with the words and a feeling tag, not with another voice.
- **Real voices.** Only a voice the person owns or may use. Never a sound-alike of a
  celebrity, a public figure or anyone who has not agreed. Cloning happens in the app, with
  the speaker's consent.

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once with
   `skill_name: "creatorline-voiceover"`. Never while waiting or retrying.
2. **Orient** once per conversation ([house rules](references/house-rules.md), section 1):
   the brand, its `language` and `brand_voice`, the avatar and its `voice_id`, the balance.
3. **Find the media.**
   - A Video Studio video: `list_videos` with `brand_id`, then `get_video`.
   - A video in the library: `list_assets` with `brand_id`, `file_type: "video"`, `search`.
   - A link to a file, or a TikTok / Instagram post: `import_asset` with `url` and `brand_id`.
   - A file on their device: they drop it at https://app.creatorline.io/assets, then
     `list_assets` finds it.
   - Audio for a lip sync: `list_assets` with `file_type: "audio"`, or `import_asset`.
4. **Look.** For narration, `get_video` gives every clip's `start` and `end`, and
   `preview_video` (free) shows what each one shows. For a library video, `preview_assets`
   gives its cover and length. Say what you see in one line: "Four clips, 14 s: the bottle on
   a desk, a pour, a gym bag, the label up close."
5. **Intake.** Only the hard gaps above, in one message ([asking](references/asking.md)). No
   hard gap: ask nothing and go to step 6. When the video is unclear:

   > Which video should I narrate?
   > 1. Cold brew tips (14 s, edited today) (recommended)
   > 2. Gym bag unboxing (22 s)
   > 3. Another one: tell me its name
   >
   > Defaults: I write the words from the clips, in Mia's voice, in English.

6. **Write the words** (Craft below, and
   [writing for voice](references/writing-for-voice.md)).
7. **Plan and price.** Show the lines with where each one lands. Then call every paid tool of
   the job WITHOUT `confirm` (shapes in [calls](references/calls.md)), add the prices up, and
   ask once, in its own message:

   > Mia reads this over your four clips, then I make the finished video:
   > 0:00 "Three cold brew mistakes." 0:03 "One: hot water." ...
   > <N> credits; you have <M>. Go ahead, or change a line?

8. **Run** on yes: the same calls with `confirm: true`, in order.
9. **Wait and narrate.** `add_voiceover` waits for its own take: pass `wait_seconds: 45`. A
   generation: `get_generation` with `wait_seconds: 45`, again until `succeeded` or
   `failed`. Video Studio jobs (export, captions, `run_video_ai`): `get_video` every 10 to 20
   seconds. One short line between calls: "Recording Mia's read." "Putting her voice on the
   clip." "Making the finished video."
10. **Fit** (Voiceover route), **check** (below), then **show** and offer **next steps**.

### Voiceover: the route in short

1. A project to work on: the video's `video_id`, or `create_video` with `brand_id`, `title`
   and one `add_clip` per library video, in order (free).
2. The clips' own sound off unless it should stay: `edit_video` with
   `{ "op": "set_all_clips_sound", "sound": false }` (free). Only a music bed set with
   `set_sound` is turned down under a voiceover by itself; a clip's own sound plays at full
   level and talks over the narration.
3. Words fitted to the windows `get_video` gives (Craft).
4. `add_voiceover` with `video_id`, `text`, `voice_id`, and `start` (seconds) or `over` (a
   clip id). One voiceover for the whole video by default; one per section only when a line
   must land on a clip that cannot move. Without `confirm` it answers with the price.
5. The confirmed answer gives the voiceover's `start` and `end`: its real length. Fit to it.
6. Captions, when wanted, once the voice is final (`creatorline-captions`). Then
   `export_video`, and `get_video` until `export.status` is `done`.

### Fitting the take

The take's length is known only once it is made. Fit in this order, and say what you did:

| The take | Fix | Paid? |
|---|---|---|
| Ends a little past the video, or past its clip | Give the visuals the time with `update_clip`: a longer `duration` on a photo clip, less trimmed off a video clip | Free (`edit_video`) |
| Starts in the wrong place | `move_voiceover` with `id` and `start` | Free (`edit_video`) |
| Far too long or too short for its window | Rewrite to the word budget, then `add_voiceover` with `replace_id` (no `start` or `over`) | A new take: quote it, ask |
| One word wrong or mispronounced | Respell it (writing for voice, section 3), then `replace_id` | A new take: quote it, ask |

A video ends where its clips end, so a take that runs past the last clip is cut off in the
export. `get_video` warns about it.

## Craft

The full method, with tables and examples, is in
[writing for voice](references/writing-for-voice.md). The essentials:

- **Budget the words.** People speak about 2.5 words a second. Fill 80 to 90 % of a window,
  never all of it: 5 s holds 10 to 11 words, 10 s 20 to 23, 15 s 30 to 34, 30 s 60 to 68.
  Each `[laughs]`, `[sighs]` or `[pauses]` takes about a second: two or three words fewer.
  Fit with words, never by speeding the voice up.
- **Hook in the first line.** The first two seconds carry the most specific thing in the
  video: a number, a result on screen, a bold opinion. No greeting, no "hey guys".
- **One line per clip.** Each line lands as its clip starts and adds what the picture cannot
  say: why it matters, how much, what happens next. Never describe what is plainly on screen.
- **Write it the way it is said.** Contractions, short sentences, one idea each. Numbers,
  prices, units and acronyms spelled as spoken ("twenty-nine dollars", "S P F fifty"). A
  brand name the voice may stumble on, spelled the way it sounds. A link is "link in bio".
- **Feeling tags** (`[excited]`, `[cheerfully]`, `[laughs]`, `[whispers]`, `[curious]`,
  `[sad]`, `[sighs]`, `[pauses]`): in square brackets, in English whatever the language,
  right before the words they color, at most one per sentence. `add_voiceover` and `dialogue`
  always perform them; `text-to-speech` does unless `params.model_id` is changed, and then
  reads them out loud.
- **The brand's voice.** Tone and do's from `brand_voice`; its don'ts are hard rules.
- **The claim floor** ([house rules](references/house-rules.md), section 7) holds for every
  word in the avatar's voice: no personal results, no history with the product, no
  credentials, facts from the label or the person only.
- **End on a verdict.** A call to action stays short and last, or goes in on-screen text and
  the post caption.
- **Another language** usually needs more syllables than English: write it fresh in that
  language to the same budget, never word for word.

## Check before you show it

- **Voiceover:** `status` is `ready`; `end` minus `start` is near your estimate; it ends
  before the video does; `warnings` in `get_video` say nothing about it; voiceovers do not
  overlap unless you meant them to. Captions written before are now `out_of_date`: write them
  again (free), or the export hears them again by itself.
- **Voice line, dialogue:** `succeeded`, with an `output` `url`. When `duration_sec` is
  there, it is near the word count divided by 2.5, plus about a second per performed tag. Far
  off means the words were not read as written: say so, and do not pay for the same call
  again.
- **Re-voice:** the output runs as long as the source.
- **Lip sync:** `preview_assets` on the output; its length matches what you planned.
- You cannot hear the take. Tell the person what to listen for in one line ("the brand name
  at 0:04, and that the voice stays Mia's to the end") and offer the fix if it is off.

## If it goes wrong

A failed run is refunded ([house rules](references/house-rules.md), section 5). Change one
thing per retry and ask before each new paid run.

| What happened | Why | Fix |
|---|---|---|
| "`text` is N characters; one voiceover reads up to 2000" | The script is too long for one take | Split it into voiceovers placed one after another |
| "Add a clip first" | The video is empty | `add_clip` first |
| "`start` is ...; the video runs from 0 to ..." | `start` is outside the video | A start inside it, or `over` a clip |
| "Pass `over` or `start`, not both" | Both were given | Keep one |
| "`replace_id` keeps the voiceover where it is" | `start` or `over` came with `replace_id` | Leave them out; `move_voiceover` after |
| "... is still being generated" | A take is in progress | `get_video` until it is `ready` |
| "The voiceover could not be generated ..." | The take failed and was refunded | Once more; then another voice |
| The narration is hard to hear | A clip's own sound plays at full level | `set_all_clips_sound`, or `update_clip` with `sound: false` |
| Tags were spoken out loud | `params.model_id` named another engine | Leave `model_id` out |
| A word comes out wrong | A spelling the voice misreads | Respell it as it sounds, re-take |
| It is not the avatar's voice | `voice_id` was left out | Pass the avatar's `voice_id` |
| A voice line or dialogue says other words than yours | The words were not read as written | Tell the person; do not repeat the call. Over a video, take the Voiceover route |
| A dialogue fails ("Pick a voice for speaker B") or both speakers sound alike | `voice_b` missing, or both voices the same | Pass two different voices |
| The whole dialogue is in one voice | Lines did not start with `A:` / `B:` | One turn per line, each with its label |
| "The script is N characters ..." | Over 2000 characters | Shorten or split |
| A re-voice sounds garbled | Music or two voices under the speech | A clean take, or narrate it instead |
| `Unknown parameter "sync_mode"` | Only `sync-lipsync-v2-pro` takes it | Name that model, or drop the param |
| The lip sync smears or drifts | A small, turned or covered face; lengths far apart | A closer clip, trimmed to the audio's length |
| A run with a library voice fails | Some library voices cannot be used here | A voice from `scope: "workspace"` |
| "The voice catalog is unavailable right now" | The lookup is down | Try again shortly; the avatar's own voice needs no lookup |
| Free trial, short balance, plan limits | The workspace | [House rules](references/house-rules.md), section 8 |

## Show the result

The house delivery card, with "What next?" under it:

```
**Voiceover: 3 cold brew mistakes**: 14 s, Mia's voice, four lines over your four clips.
[Watch the video](<export.url>) · [Open in Video Studio](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Captions of the words she says
2. Your own music under her voice
3. Post it to the review queue
```

The other kinds, card line and links only:

```
**Voice line**: 4 s, Mia's voice, "Three things nobody tells you about cold brew."
[Listen](<output url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.
```

```
**Spanish version**: 12 s, Mia's voice in Spanish, lips synced to the new words.
[Watch the video](<output url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.
```

Media links expire; the Creatorline link stays.

## Next steps to offer

Pick the 2 or 3 that fit, one line each:

- **Captions** of the words now spoken (`creatorline-captions`).
- **A music bed** from their own audio file, turned down under the voice by itself
  (`creatorline-video-studio`).
- **Post it**: caption, accounts and time, into the review queue (`creatorline-publish`).
- **Another language** of the same video (this skill).
- **A version where the avatar says it on camera** (`creatorline-talking-video`).
- **More versions** with other hooks or voices, as a test (`creatorline-ad-variations`).

## References

- [references/calls.md](references/calls.md): the exact call for every route, the language
  version chain, batch pricing, waiting, limits.
- [references/writing-for-voice.md](references/writing-for-voice.md): word budgets, fitting a
  window, feeling tags, pronunciation, dialogue scripts, re-voice and lip sync, other
  languages, examples.
- [references/house-rules.md](references/house-rules.md): the session, consent, waiting,
  delivery, safety, what the server's refusals mean.
- [references/asking.md](references/asking.md): how to ask the intake in one message.
