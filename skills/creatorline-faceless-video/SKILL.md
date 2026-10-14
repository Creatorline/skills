---
name: creatorline-faceless-video
description: "Makes finished faceless videos: a narrator over illustrated scenes, animated or as a frame-by-frame picture story, or over stock clips. Explainers, history, myths, stories, top-N lists, motivation. Use for 'faceless video', 'narrated explainer', 'picture story', 'no face'. Not for the avatar on camera: use creatorline-talking-video. Product ads: creatorline-product-video."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Faceless Video

You turn a topic, a story or a script into ONE finished vertical faceless video: one narrator's
voice over scenes in one consistent illustrated look, built from a fixed grid of 10-second
blocks, captioned, exported from an editable Video Studio project and ready for the review
queue. Nobody appears on camera. The promise to the person: they choose the look and the voice,
see one price for the whole video, review it at three points before the next stage spends, and
get a finished video with its cover and the next step offered.

## When to use

- The person asks for a finished narrated video AND says how: "a faceless video", "a narrated
  explainer", "a history short with a voiceover", "a picture story", "frame by frame",
  "storybook video", "a myth retold", "top 5 facts with narration", "motivational video with
  stock footage and a voiceover", "nobody on screen".
- A topic alone is not enough ("a video about the Roman roads"): with an avatar on the brand,
  that is a talking video; ask which, in one line, when it is unclear.
- Any brand where the person wants no face on camera. A brand's avatar can still be the
  NARRATOR: its voice keeps the channel recognizable while the face stays off screen.

## Not for

| They want | Use |
|---|---|
| The avatar talking on camera | `creatorline-talking-video` |
| A video that sells a product, the product on screen | `creatorline-product-video` |
| A 30-120 s episode with the avatar as host | `creatorline-ai-host` |
| Only a script, hooks or ideas, nothing made | `creatorline-short-script` |
| One clip or one picture, silent animation of a photo, no narration | `creatorline` (a one-off generation) |
| Edits to a video that already exists, or to their own footage | `creatorline-video-studio` |
| Narration over a video they already have, or a voice track alone | `creatorline-voiceover` |
| Captions on a finished video | `creatorline-captions` |
| Photos or a carousel | `creatorline-photos` |
| A trending video re-filmed | `creatorline-reshoot` |
| Content made FOR children (toddler learning, nursery songs, a kids' channel) | Nothing: Creatorline does not make child-directed content. Say so in one line and offer a family-friendly version for all ages ([formats.md](references/formats.md), section 10) |

## What you need

| Item | Asked or defaulted |
|---|---|
| Format | Asked first, alone, when missing: Explainer (recommended), History, Fairy tale and myth, or Story, Top-N, Motivational, Family-friendly |
| Look | Always asked, alone, right after the format (unless hands-off): the format's default first ([visual-style.md](references/visual-style.md), section 2). Stock footage is one of the options |
| Topic | Asked when missing: their own, a link, or "pick one for me" ([intake.md](references/intake.md), section 7) |
| Length | 1 min (6 blocks). Options 30 s, 2 min, 3 min. Fairy tale and myth: 2 min |
| Pictures | Animated. Option: Picture story (frame-by-frame stills). Stock footage needs neither |
| Captions | On, in the look's caption style |
| Cover | Yes |
| Mascot | Scenes only (asked for an Explainer or Top-N) |
| Voice | Always asked, last: the brand's own voice first, then matches from `list_voices` |
| Language | The brand's `language`, else the person's. Never asked |
| Frame | 9:16, always. Never asked |

## The flow

Follow [house-rules.md](references/house-rules.md) for consent, waiting and delivery; these
steps add what is particular to this format. [checks.md](references/checks.md) holds every gate.

**0. Note the skill.** If `track_skill_activation` is in your tools, call it once for this new
request with `skill_name: "creatorline-faceless-video"` (house-rules.md, section 10). Not again
while you wait or fix things.

**1. Orient** (once per conversation): `list_brands`, `get_brand` (its voice, `language`,
`brand_voice`), `get_credit_balance` (a `free_trial: true` stops paid work: house rules,
section 8), and `get_video_guide` once (free; it carries the voiceover, captions and export
prices).

**2. Intake, in rounds** ([intake.md](references/intake.md)). Interactive unless the person's
words say hands-off. The format alone; then the look alone; then at most 3 of topic, length,
pictures, captions, cover, mascot; the voice always last. Each round ends your turn. Nothing
but free reads runs until the intake is done. Hands-off: ask nothing, use the defaults, name
the voice in one line.

**3. Research and write the script (free).**

1. Research real-world facts first ([formats.md](references/formats.md), section 11).
2. Choose the thread object, then write the arc as N blocks of 10 seconds
   ([formats.md](references/formats.md), sections 2 and 3): each block one narration line of 20
   to 23 words, its arc role, its place, and (Animated, Stock footage) 5 shots of 2 seconds,
   each with a size, an angle and the assets it uses. Picture story: one continuous narration.
3. List the roster: figures (one line each), places with their second angles, props, the
   thread's prop ([visual-style.md](references/visual-style.md), section 4).
4. Run the script check and the rewrite pass ([checks.md](references/checks.md), sections 2
   and 3); fix only what they flag.

**4. Price the whole video, one yes.** Quote every part before anything starts
([narration-and-assembly.md](references/narration-and-assembly.md), section 4), then ONE message
with the script and the price, so both are approved at once. Always show every block:

> | Block | Narration | Shots | Place | Role |
> |---|---|---|---|---|
> | 1 | "This lighthouse never went dark. Not once, in a hundred and twelve winters of storms..." | wide, low: the tower in a storm · close: the lamp ... | The rock | Cold open |
>
> Thread: the keeper's logbook, filling page by page, closed on the last night.
> Editorial collage look, six blocks, thirty animated shots, narrated by <voice name>,
> captions on, a cover.
> - Pictures: <a> credits. Motion: <b>. Narration (with two retakes if needed): <c>.
>   Captions, export and cover: <d>.
>
> Total <N> credits at most; you have <M>. Go ahead, or change any line first?

A changed line is free; more blocks or another look are quoted again. Short balance: offer
Picture story (about a third to a half of Animated), fewer blocks, or Stock footage.

The yes covers each paid call of the quote at its quoted price, so those calls below take
`confirm: true`. A call that would cost more than its line in the quote, or one the quote did
not list, is asked first.

**5. The look reference and the roster** (not for Stock footage). On yes: the look reference
first (`text-to-photo`, `aspect_ratio: "2:3"`, [visual-style.md](references/visual-style.md),
section 3); `get_generation` with `wait_seconds: 30` until it is done. Then every roster picture
(`photo-edit`, `include_avatar: false`, the look reference attached, section 4), started one
after another without waiting, at most 6 at a time, then waited on.

**6. The pictures.** Animated: every shot picture
([visual-style.md](references/visual-style.md), section 6), started in waves the same way.
Stock footage: pick the stock shots instead (section 12 of the same file). Picture story: go
to step 7; its frames come after the narration. Look at them with `preview_assets` (8 ids a
call, free) against [visual-style.md](references/visual-style.md), section 13.

**Review stop 1 (interactive, Animated and Stock footage).** List the pictures as links, one
line per block (`Block 1: [shot 1](<url>) · [shot 2](<url>) ...`), say the look reference may
look odd because it is only a sample of the look, and ask: "Continue to the narration?" with
two options, Continue (recommended) and Stop here. End your turn. Hands-off runs skip this stop.

**7. Build and narrate.** Animated: the still cut from the shot pictures, 2 seconds each, all
muted (narration-and-assembly.md, section 5). Then `add_voiceover` per block at the block's
start, measure every take, retake what fails, and centre each line in its block (section 6).
Picture story: the placeholder cut and the one continuous narration (section 8, steps 1 to 3).
Stock footage: the stock cut (section 9), then the same narration steps.

**Review stop 2 (interactive only).** Each block's line with its measured length, and the
studio link to listen (`[Open in Creatorline](<studio_url>)`). Ask: "Continue to the motion?"
(Picture story: "Continue to the pictures?"; Stock footage: "Finish the video?", then skip
step 8 and stop 3). End your turn.

**8. The motion, or the frames.** Animated: one `photo-to-video` run per shot
([visual-style.md](references/visual-style.md), section 10), all started, then each put in with
`replace_clip` as it finishes (narration-and-assembly.md, section 7). Picture story: the caption
timeline, the frame slots, the frames in waves, then the assembly (section 8, steps 4 to 8).

**Review stop 3 (interactive only).** The cut, by the studio link and `preview_video` frames
(Picture story: the frames as links, a line per stretch of narration). Ask: "Finish the video?"
(captions, cover, export). End your turn.

**9. Texts, then look.** A title of 3 to 6 words over the first shot, top; top-N labels; a call
to action over the last shot if wanted (section 10). `preview_video` with
`show_safe_area: true`; fix what you see. Free; repeat until right.

**10. Captions.** `write_captions` with the look's `style`, `position: "auto"`,
`confirm: true`; `get_video` every 20 seconds until `ready`. Read every line against the script:
fix words with `edit_caption`, and catch a take that said the wrong line or paused (section 11).

**11. Export and cover.** The last look ([checks.md](references/checks.md), section 8), then
`export_video` with `confirm: true` and `get_video` every 15 seconds until `export.status` is
`done`. The cover, when chosen, from this run's look reference (section 12).

**12. Show it**, then offer next steps.

Narrate the waits in one line each: "Drawing the look and the cast." "Composing the thirty
shots." "Recording the narration." "Bringing the shots to life: the slowest part." "Writing
the captions." Say at the start that a whole run often takes 10 to 25 minutes. `queued` runs
wait for a free slot: say it will take longer. If it will clearly run past your turn, say what
is left and what to ask, then pick it up from `get_video` and `get_generation`. Never start a
run twice.

## Craft

The know-how is in the references; these are the rules that make or break it.

- **One look, two anchors, every call.** The 80-100 word style line first in every brief, and
  the look reference attached to every picture. Never mix looks. AI pictures are always
  illustrated: real-looking footage comes only from stock or the brand's own clips.
- **The grid.** 10-second blocks, one narration line each, 5 shots of 2 seconds. No shot over
  2.5 seconds: a longer hold reads as a slideshow. The video is exactly N x 10 seconds.
- **Every shot changes size AND angle** from the one before. A wide shot only opens a new place;
  at most 2 blocks in one place.
- **The thread.** One object in every block, changing in one direction, resolved in the payoff.
- **The cold open.** Block 1 opens on a sentence of 8 words or fewer: the surprising thing,
  flat. No greeting, no "in this video".
- **Lines of 20 to 23 words**, few stops, numbers in words, measured at 7.8 to 9.5 seconds and
  centred in their block. A line that does not fit is rewritten, never the video cut to it.
- **Build, turn, payoff.** Each block escalates; the turn (usually block N-1) changes what the
  viewer believed; the kicker returns to the hook's image or number.
- **Motion is choreography.** Things arrive one after another, land with a verb, one camera
  move per shot, at least one impact per block, moving from the first frame.
- **Faceless means anonymous.** Figures from behind, in silhouette, far away or as hands; real
  people named in the narration only; never a young person; the avatar never in a picture.
- **No words inside pictures.** Labels and numbers are Video Studio text; word beats become
  bars, circles, ribbons and symbols.
- **Narration carries the sound.** Clips stay muted; a library track sits under the voice, quiet.

## Check before you show it

The full list is [checks.md](references/checks.md), section 8. At least:

- the facts: every number, date and name has a source you can link, or the person was told
  which lines to check;
- one look across every shot, figures matching the roster, no letters, no recognizable face;
- the length is N x 10 seconds (Picture story: the narration's length), every block has its
  line, centred, one voice;
- `get_video`: no `warnings`, every voiceover `ready`, `captions.status` `ready`, captions
  spelled like the script;
- `preview_video` with `show_safe_area: true`: texts clear of the covered bands and the captions;
- `export.status` is `done` and `export.up_to_date` is true.

## If it goes wrong

| Problem | Fix |
|---|---|
| A picture drifts off the look | Redo it with the style line and the look reference, the palette line stated again; only that picture. A redo of a picture that succeeded is quoted first |
| A picture shows letters, or a recognizable face | Redo it with signs described as plain, the figure from behind or in silhouette |
| A figure looks like the brand's avatar | Check `include_avatar: false`; describe the figure fully; redo |
| A run fails | The retry ladder ([checks.md](references/checks.md), section 6): same call twice, then restaged, up to about 8 |
| A run is refused by the content check | Tell the person which shot; offer another picture for that beat |
| A shot cannot be made after the ladder | It drops out; its block becomes 4 shots of 2.5 seconds |
| The look reference cannot be made | Stop: nothing else runs without it. Offer another look |
| A line runs over 9.5 or under 7.2 seconds | Rewrite and retake it, at most 3 tries (narration-and-assembly.md, section 6) |
| A caption line shows another block's words | That take said the wrong line: retake it |
| A gap of 0.8 s or more inside a line | Rewrite it with fewer stops and retake |
| Picture story frames look like separate photos | Roster pictures were attached to variations: make them again as edits of the frame before |
| Frames play out of order | Re-add them by slot number, `f001` upward |
| `captions.status` is `out_of_date` | `write_captions` again when the cut is final (free) |
| Export refused | Read the reason and `warnings`: something is still generating. Wait, then export |
| A run sits unchanged for 20 minutes | Stop waiting; tell the person which part is stuck |
| `create_video` failed and you retry | Check `list_videos` first: a retry may have made two |

## Show the result

```
**The lighthouse that never went dark**: a 1-minute faceless history video, Editorial
collage look, six blocks, narrated by <voice name> in English, captions on.
[Watch the video](<export.url>) · [Open in Creatorline](<studio_url>) · [Cover](<cover url>)
Used <N> credits. <M> left.
Sources: [<source title>](<url>), [<source title>](<url>)

What next?
1. Post it: I'll write the caption and put it in your review queue.
2. Part two, same look and voice.
3. A carousel from the shots.
```

Name the length, the look, the narrator and language, and whether captions are on. Credits
used: the `credits_charged` of every run started, minus the failed ones (refunded). Credits
left: `get_credit_balance`, called once at the end. The MP4 link expires; the studio link does
not. Add the sources line for anything researched. Generation ids and other links are given
when asked. One line for anything that went differently ([checks.md](references/checks.md),
section 9).

## Next steps to offer

Pick the two or three that fit, one line each:

- **Post it**: caption and hashtags in the brand's voice, then `create_post` with
  `export.asset_id` and `made_with_ai: true` into the review queue (`creatorline-publish`).
- **Part two or a series**: same look reference, style line and voice; only the topic changes.
- **A carousel from the shots**: the pictures exist; `create_post` with 2-10 of their asset ids
  in order posts them as a carousel (`creatorline-publish`).
- **Another language**: new lines per block with `add_voiceover` `replace_id`, measured and
  centred, `write_captions` again (free) and a new export. Quote the voiceovers and the export
  first.
- **Make it weekly**: the same pipeline saved as a workflow (`creatorline-workflows`).
- **Edit by hand**: the studio link; or ask for changes (`creatorline-video-studio`).

## References

- [intake.md](references/intake.md): interactive or hands-off, the round order, looks named in
  the message, what is never asked, hands-off defaults, picking a topic, titles, a series.
- [formats.md](references/formats.md): the formats, the arc, block maps by length, tone, voice
  and caption per format, family-friendly, facts and sources.
- [visual-style.md](references/visual-style.md): the style line and look reference, the
  fourteen looks, the roster, shot pictures, shot variety, anonymity and safe staging, motion briefs,
  Picture story frames, stock footage, checking pictures.
- [narration-and-assembly.md](references/narration-and-assembly.md): the block grid, narration
  lines, the voice, pricing, building each mode, measuring and centring, captions, export,
  the cover, pitfalls.
- [checks.md](references/checks.md): the gates, the script check, the retry ladder, Picture
  story checks, the last look, saying what went differently.
- Shared: [house-rules.md](references/house-rules.md), [asking.md](references/asking.md),
  [video-briefs.md](references/video-briefs.md).
