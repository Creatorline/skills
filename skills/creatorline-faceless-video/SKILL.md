---
name: creatorline-faceless-video
description: "Makes faceless short videos: a narrator's voice over AI pictures, moving scenes or stock clips, nobody on camera. Stories, history, explainers, top-N lists, motivation, scripted, voiced and captioned. Use for 'faceless video', 'narrated story', 'no face'. Not for the avatar on camera: use creatorline-talking-video. Product ads: creatorline-product-video."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Faceless Video

You turn a topic, a story or a script into a finished vertical faceless short: a narrator's
voice over pictures in one consistent art style, moving or still, with captions, exported from
an editable Video Studio project and ready for the review queue. Nobody appears on camera. The
promise to the person: one short intake, one price for the whole video, a look they pick before
anything moves, and a finished, captioned video at the end with the next step offered.

## When to use

- "Make a faceless video about...", "a narrated story", "a history short", "explain X in a
  video with a voiceover", "a top 5 list video", "a motivational video with stock footage and a
  voiceover", "a family-friendly animal video", "nobody on screen", "no face".
- A brand with no avatar of its own (`get_brand` has no `default_avatar_id`), and any brand when
  the person wants no face on camera. Do not judge by the brand's `kind`: most brands read
  `faceless-channel` there even when they have an avatar.
- The brand has an avatar but wants it off camera: its VOICE can still narrate. That keeps one
  recognizable voice across the channel.

## Not for

| They want | Use |
|---|---|
| The avatar talking on camera | `creatorline-talking-video` |
| A video that sells a product: the product on screen, a voice off screen | `creatorline-product-video` |
| A 30-120 s episode with the avatar as host | `creatorline-ai-host` |
| Only a script, hooks or ideas, nothing made | `creatorline-short-script` |
| Edits to a video that already exists | `creatorline-video-studio` |
| Narration over a video they already have, a voice track alone, or re-voicing a video | `creatorline-voiceover` |
| Captions on a finished video | `creatorline-captions` |
| Photos or a carousel, no video | `creatorline-photos` |
| Clips cut from a long video | `creatorline-long-to-shorts` |
| A trending video re-filmed | `creatorline-reshoot` |
| Content made FOR children (toddler learning, nursery songs, a kids' channel) | Nothing: Creatorline does not make child-directed content. Say so in one line and offer a family-friendly version for all ages ([formats.md](references/formats.md), section 9). |

## What you need

| Item | Hard gap or default |
|---|---|
| Topic, story or script | Hard gap. With none, offer three topics from `brand_voice.content_angles` (`get_brand`) as options. |
| Format | Infer it (story, history, explainer, top-N, motivational, family-friendly) and preselect it in a question only when unclear. |
| Look | The format's default look ([formats.md](references/formats.md), section 1; the looks are in [visual-style.md](references/visual-style.md), section 2). |
| Pictures | Moving scenes. Other choices: Still pictures (no motion, costs less), Stock footage. |
| Length | 30 s. Options 20, 45, 60. Over 60 s: say it takes longer and costs more. |
| Narrator | The brand's voice when `get_brand` has a `voice_id` (say its `voice_name`); else one voice from `list_voices` that fits the format. Name it in the defaults line. |
| Language | The brand's `language`, else the language the person writes in. |
| Captions | On, in the format's caption style. |
| Music | None, unless the person has a track in the library (`list_assets`, `file_type: "audio"`). There is no stock music. |
| Frame | 9:16, always. |

## The flow

Follow [house-rules.md](references/house-rules.md) for the session, consent, waiting and
delivery; these steps add what is particular to this format.

**0. Note the skill.** If `track_skill_activation` is in your tools, call it once for this new
request with `skill_name: "creatorline-faceless-video"`. Not again while you wait or fix things.
Never mention it.

**1. Orient** (once per conversation). `list_brands`, `get_brand` (voice, `language`,
`brand_voice`), `get_credit_balance` (a `free_trial: true` stops paid work: house rules,
section 8). Call `get_video_guide` once: it is free and carries the live voiceover, captions and
export prices you need in step 4.

**2. Intake: one message.** Ask only the gaps, at most three questions, with options and a
recommended one ([asking.md](references/asking.md)). Typical:

> Two quick picks:
> 1. Look: 1) Oil painting (recommended for history) 2) Paper collage 3) Realistic photos
> 2. Pictures: 1) Moving scenes (recommended) 2) Still pictures, no motion, costs less 3) Stock footage
>
> Defaults: 30 seconds, narrated by <voice name> in English, captions on.

"Just do it" or a full brief: ask nothing, decide, and say what you chose in the plan.

**3. Write the script (free).** Use [formats.md](references/formats.md): beats with a time, the
narration line and the picture for each. Research facts first for history and explainers (same
file, section 10). Pick the look's style line (one sentence, pasted word for word into every
picture brief, [visual-style.md](references/visual-style.md)) and the narrator voice
(`list_voices` with a `search` such as `deep storyteller`, only when the brand has no voice or
the person wants another). Stock footage: find a clip for each beat now
([narration-and-assembly.md](references/narration-and-assembly.md), section 9); a beat no clip
fits gets an AI picture, and only those beats go through steps 5 and 6.

**4. Price the whole video, one yes.** Quote every part before anything starts
([narration-and-assembly.md](references/narration-and-assembly.md), section 4):

- the opening picture: `create_generation` with `tool: "text-to-photo"`, `brand_id`, the
  opening brief and `count: 3`, WITHOUT `confirm`;
- one other picture the same way with `count` left out; the rest cost the same (Still pictures:
  `count: 2` per beat and `params: { resolution: "2K" }`);
- Moving scenes: `estimate_generation_cost` with `tool: "photo-to-video"` and
  `params: { duration: <seconds>, generate_audio: false }` for each scene length (section 3 of
  that file says how long);
- narration: `get_video_guide` `credits.voiceover` times the number of beats;
- captions and export: `credits.captions` and `credits.export`.

Then ONE message with the script and the price, so the person approves both at once:

> | # | Time | Narration | Picture |
> |---|---|---|---|
> | 1 | 0-3 s | "This lighthouse never went dark. Not once." | A lighthouse on black rocks in a storm |
>
> Oil-painting look, six moving scenes, narrated by <voice name>, captions on.
> - Pictures: <a> credits. Motion: <b>. Narration: <c>. Captions and export: <d>.
>
> Total <N> credits; you have <M>. Go ahead, or change any line first?

A changed line is free; a change that adds beats or seconds is quoted again. Short balance:
offer Still pictures, fewer beats or Stock footage.

**5. The opening picture.** On yes, call the same `create_generation` with `confirm: true`.
`get_generation` with `wait_seconds: 30` until `succeeded`. Show the three options as links,
one line each, and ask which look to keep (recommend one). This pause is a creative pick, not a
new price. Hands-off: pick the best yourself and say which. A different look is a new run: quote
it and ask.

**6. The other pictures.** Start every remaining picture with `confirm: true`, each brief with
the same style line, without waiting between them. Then `get_generation` with
`wait_seconds: 30` on each until done; a run past the workspace's parallel limit shows `queued`
and starts by itself. Look at them with `preview_assets` (up to 8 ids a call, free). A picture
that is off the look, shows letters, or puts a face where a figure should be anonymous gets one
fix: quote it, ask, redo ([visual-style.md](references/visual-style.md), section 10).

**7. Start the motion** (Moving scenes only). For each scene: `create_generation` with
`tool: "photo-to-video"`, `brand_id`, `inputs: { image_url: <the scene's picture asset_id> }`,
a motion brief (what moves, one camera move) and
`params: { duration: <the quoted seconds>, generate_audio: false }`, `confirm: true`. Do not wait
for them: they render while you build and narrate.

**8. Build the video (free).** `create_video` with `brand_id`, a `title`, and `operations`: one
`add_clip` per picture in beat order with your own ids (`s1`, `s2`, ...) and a first `duration`
from the script's times, then `{ "op": "set_all_clips_sound", "sound": false }`. Stock footage:
`add_clip` with `stock_id` instead (section 9 of the assembly file).

**9. Narrate, beat by beat.** For every beat: `add_voiceover` with `video_id`, `text` (the
line, exactly as it should be said), `voice_id`, `over: "s<n>"`, `wait_seconds: 0`,
`confirm: true`. Keep each `voiceover_id`. Then `get_video` every 10-20 s until every voiceover
is `ready`. Fit the pictures to the lines in two `edit_video` calls: first each clip's length to
its line, then each voiceover back to its clip's start
([narration-and-assembly.md](references/narration-and-assembly.md), section 6). Read every time
from the answers; never add them up yourself.

**10. Put the motion in** (Moving scenes only). `get_generation` with `wait_seconds: 45` on
each motion run. Each finished one goes in with `edit_video`
`{ "op": "replace_clip", "id": "s<n>", "asset_id": <its output asset_id> }`: the clip keeps its
place and its length. If an `applied` note says the new media is shorter, or any voiceover no
longer starts on its clip, fix it (same file, section 7). A failed motion run keeps its still.

**11. Texts, then look.** A title of 3-6 words over the first scene, top; top-N labels; an
ending line over the last scene if the person wants a call to action. Then `preview_video` with
`show_safe_area: true` and fix what you see. Free; repeat until right.

**12. Captions.** `write_captions` with the format's `style` and `position: "auto"`,
`confirm: true`. `get_video` every 20 s until `captions.status` is `ready`. Read the lines; fix
names and numbers with `{ "op": "edit_caption", "index": <n>, "text": "..." }`.

**13. Export.** `get_video`: `ready_to_export` true and no `warnings`. `export_video` with
`confirm: true`, then `get_video` every 15 s until `export.status` is `done`.

**14. Show it** (below), then offer next steps.

Narrate the wait in one line between calls: "Painting the six scenes now." "Recording the
narration." "Bringing the scenes to life: the slowest part, a few minutes." "Writing the
captions." The whole run is often 8-15 minutes; say so when it starts. Runs that sit in
`queued` mean the workspace makes fewer at once: say it will take longer. If it will clearly run
past your turn, say what is left and what to ask ("ask me if it's done in five minutes"), then
pick it up from `get_video` and `get_generation`. Never start a run twice.

## Craft

The full know-how is in the references; these are the rules that make or break it.

- **Hook in the first 2-3 seconds.** A line of 8 words or fewer that states the surprising thing
  flat, over the strongest picture. No greeting, no "in this video", no title card first.
- **One idea per beat, escalating.** Every beat has a concrete thing (a number, a date, a place,
  a named object). Swap two middle beats: if nothing breaks, it is a list. Link them with "but",
  "so", "which meant".
- **The turn and the payoff.** At about two thirds, one line flips what the viewer assumed. The
  last line answers the hook and, at best, returns to its picture or number.
- **Speech budget.** About 2.3 words per second plus a breath between beats: 30 s holds 60-70
  words, a beat of 4-5 s holds 9-11. Lines are written for the ear, in the brand's language:
  short, few commas, contractions.
- **One look.** Pick the style line once and paste it word for word into every picture brief.
  Never mix looks inside one video.
- **Faceless means anonymous.** People appear from behind, in silhouette, far away, or as hands.
  Real people, historical figures included, are named in the narration only, never shown with a
  likeness. The server's picture writer knows the brand's avatar: describe every figure fully so
  none comes out looking like it.
- **No words inside pictures.** Models spell badly. Labels, numbers and titles go on as Video
  Studio text; describe signs and pages as plain or blank.
- **Keep it moving.** A new picture every 3-5 s in Moving scenes, every 1.5-3 s in Still pictures.
  The subject sits in the upper middle; the lower third is for captions.
- **Narration carries the sound.** Clips stay muted. A music track from the library is turned
  down by itself while the voice speaks; pick a calm instrumental.

## Check before you show it

- The facts: every number, date and name in the script came from a source you can link, or you
  told the person which ones to double check.
- The pictures share one look, show no letters, and no figure has a clear, recognizable face.
- The hook line is spoken in the first 3 seconds; the video runs within a few seconds of the
  length promised.
- `get_video`: no `warnings`, every voiceover `ready`, `captions.status` `ready`, each voiceover
  starting on its own clip.
- `preview_video` with `show_safe_area: true`: titles and labels clear of the covered bands and
  of the captions row.
- The caption lines spell names and numbers right.
- `export.status` is `done` and `export.up_to_date` is true.

## If it goes wrong

| Problem | Fix |
|---|---|
| Pictures drift in look | Redo the odd one with the chosen opening picture as a reference ([visual-style.md](references/visual-style.md), section 7). Quote first. |
| A picture shows garbled letters | Redo it describing signs and pages as plain; or, if small, cover it with a Video Studio text. |
| A figure looks like the brand's avatar, or shows a clear face | Redo it with the figure from behind or in silhouette, fully described. |
| A motion run warps the scene or adds people | Keep the still for that beat (it costs nothing more), or redo with a smaller move and a locked camera. Ask before paying again. |
| A line runs longer than its scene | Lengthen the clip: a picture with `update_clip` `duration`, a moving scene with `update_clip` `speed` (not below 0.75). Then realign the voiceovers. |
| A line sounds wrong or mispronounces a name | `add_voiceover` with `replace_id` and the fixed words (a new paid take: ask). Spell a hard name as it sounds; correct the caption with `edit_caption`. |
| A warning says a voiceover runs past the video's end | Lengthen the last clip with `update_clip`. |
| A warning says nothing is heard | The voiceovers are missing or failed: read `get_video`, add them again. |
| `captions.status` is `out_of_date` | Clips changed after captions: `write_captions` again when the cut is final (free). |
| Export refused | Read the reason and `warnings`: something is still generating or captions are being written. Wait, then export. |
| A run failed | It was refunded. Say what failed in plain words, change one thing, quote the retry, ask. |
| A run stays `queued` | It waits for a free slot and starts by itself. Say so. |
| `create_video` failed and you retry | Check `list_videos` first: a retry that succeeded twice makes two videos. |

## Show the result

```
**The lighthouse that never went dark**: a 32-second faceless history short, oil-painting
look, six moving scenes, narrated by <voice name>, captions on.
[Watch the video](<export.url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.
Sources: [<source title>](<url>), [<source title>](<url>)

What next?
1. Post it: I'll write the caption and put it in your review queue.
2. A cover in the same painted look.
3. Part two, same look and voice.
```

Credits used: add up the `credits_charged` of every run you started, minus any run that failed
(those were refunded). Credits left: `get_credit_balance`, called once at the end (the Video
Studio answers do not carry the balance). The MP4 link expires; the studio link does not. Add
the sources line for history and explainers. Keep the rest for when they ask.

## Next steps to offer

Pick the two or three that fit, one line each:

- **Post it**: caption and hashtags in the brand's voice, then `create_post` with
  `export.asset_id` and `made_with_ai: true` into the review queue (`creatorline-publish`).
- **A cover**: a 9:16 cover in the same look with a few words on it (`creatorline-cover-image`).
- **A carousel from the pictures**: the stills already exist; `create_post` with 2-10 of their
  asset ids in order posts them as a carousel (`creatorline-publish`).
- **Part two or a series**: same style line, same voice, same format; only the topic changes.
- **Another language**: new lines with `add_voiceover` `replace_id` per beat, refit, then
  `write_captions` again (free on the same video) and a new export. Quote the voiceovers and the
  export first; the first MP4 stays in the library.
- **Edit by hand**: the person opens the studio link; or ask for changes (`creatorline-video-studio`).

## References

- [formats.md](references/formats.md): the six formats, beat maps, tone, voice, captions,
  facts and sources, family-friendly rules.
- [visual-style.md](references/visual-style.md): the looks, the style line, picture and motion
  briefs, anonymity, consistency fixes, stock and realistic footage.
- [narration-and-assembly.md](references/narration-and-assembly.md): narration lines, scene
  lengths, pricing calls, the Video Studio operations, fitting and realigning, Still pictures,
  Stock footage and the in-studio route, pitfalls.
- Shared: [house-rules.md](references/house-rules.md),
  [asking.md](references/asking.md), [video-briefs.md](references/video-briefs.md).
