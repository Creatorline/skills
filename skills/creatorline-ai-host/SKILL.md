---
name: creatorline-ai-host
description: "Makes a 30 to 120 second episode hosted by the brand's AI avatar: script, takes in one set, cutaways, captions and export in Video Studio, plus a series bible so later episodes match. Use for an episode, a show, a weekly series, a one-minute explainer with a host. Not for one short clip: use creatorline-talking-video. No face: creatorline-faceless-video."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# AI host episodes

Turn a topic or a script into a finished 30 to 120 second vertical episode hosted by the
person's AI avatar. The host keeps the same face, set, outfit and voice from the first line to
the sign-off; cutaways, on-screen text and captions keep the picture moving. You deliver an
editable Video Studio project and its exported MP4, ready for the review queue. For a recurring
show you also hand over a series bible, so episode 12 looks like episode 1. The person gives a
topic; you write the script, show it with one price, film, assemble, check and deliver.

## When to use

- "Make an episode / a show / a weekly series with my avatar", "a 60-second explainer with Mia
  hosting", "a longer video, about a minute", "the next episode of Speak Up Sundays".
- Any avatar-hosted video longer than one take (over 30 s), or with several parts and cutaways.
- The script of an episode over 60 s, even when nothing is filmed yet.
- Changing one part of an episode made earlier (see "Fix one part later").

## Not for

| The ask | Use |
|---|---|
| One talking clip, 5 to 30 s, one take (a review, a hot take, a tip) | creatorline-talking-video |
| Narration with no face on camera | creatorline-faceless-video |
| The script of a video of 60 s or less, nothing filmed | creatorline-short-script. An episode script over 60 s stays here: write it (step 3) and stop before the quote. |
| A step-by-step product demo | creatorline-tutorial-video |
| Editing a video that exists, no new takes | creatorline-video-studio |
| Cutting a long recording into shorts | creatorline-long-to-shorts |
| Re-filming a viral video with the avatar | creatorline-reshoot |
| A week of mixed posts | creatorline-content-calendar (it can send episodes back here) |
| Over 3 minutes, or a wide 16:9 video | Not possible: Video Studio makes vertical 9:16 videos up to 180 s. Offer a 2-minute cut or a two-part episode. |

## What you need

| Need | Hard gap? | If not given |
|---|---|---|
| Topic or script | Yes. Ask once, with three topics from `brand_voice.content_angles` as options (none there: three from the brand's niche) | none |
| Host | Only when the brand has no avatar at all: it is made in the app (https://app.creatorline.io/avatars/new) | The brand's default avatar; an avatar the person names, found by name |
| Length | No | 60 s |
| Format | No | Picked from the topic (references/episode-formats.md) |
| One episode or a series | No | One episode; a series when they say series, show or weekly, or earlier episodes exist |
| Set | No | One that fits the niche, made once as a photo; a running series' own set; a photo of the person's own room when they offer one |
| Outfit | No | What the avatar wears in its photo |
| Voice | No | The avatar's own voice, matched across parts; an avatar with no voice of its own gets one voice from `list_voices` for every part |
| Cutaways | No | The brand's library first, then new scenes without people |
| Product | Only when the episode shows one | Its real photo (library or file link); never a made-up stand-in |
| Facts, numbers, news | Only when the topic needs them | The person's sources or the brand document; otherwise keep numbers out |
| Captions | No | The series' style, else `hormozi` (`minimal` for a calm brand) |
| Music | No | None (see "Sound") |
| Language | No | The brand's `language` |

## The flow

Follow the session in references/house-rules.md. The steps below are what this skill adds.

1. **Start and orient.** If `track_skill_activation` is in your tool list, call it once for
   this request with `skill_name: "creatorline-ai-host"` and never mention it. Then, skipping
   what this conversation already did: `list_brands`, `get_brand`, `get_avatar` on the host
   and `get_credit_balance` (house-rules.md, section 1). Look for a running series:
   - `get_brand` → `brand_voice.format_notes` may hold a line about the show;
   - `list_videos` with the `brand_id`: earlier episodes are titled "<Show> Ep. <n>: <topic>";
   - `get_video` on the highest episode number (the list is ordered by last change): its
     texts' `look` and `size`, the caption `style`, and the clips (the sign-off clip's
     `asset_id`).
   Call `get_video_guide` once (free): it lists every edit operation, and its `credits` price
   the captions and the export in step 4.

2. **Intake** (references/asking.md). One message, at most three questions, with the
   recommended option first. Usually: the topic, the length, and, only when unclear, a series
   or a single episode. For a running series ask only the topic. End with the defaults line:

   ```
   Happy to. Two quick picks:
   1. Topic: 1) 3 phrases that make you sound confident (recommended) 2) Why meetings run
      over 3) How to say no to your boss 4) Your own
   2. Length: 1) about 60 s (recommended) 2) 45 s 3) 90 s
   Defaults: Mia hosts at a desk set, 9:16, phone style, 3 parts and a sign-off, cutaways,
   her own voice throughout, captions, English.
   ```

3. **Write the script and cut it into parts** (Craft below, references/episode-formats.md).
   - Parts of 12 to 25 s, cut at complete thoughts. Each part's `duration` is its word count
     divided by 2.5, rounded up, plus 1, between 5 and 30.
   - Never set `duration` over 30 on one call: a longer run is joined from several takes on the
     server, out of your control, and one flaw re-films the whole thing.
   - Mark the cutaway moments: about one per 12 to 15 s of talk.
   - Write the continuity kit and every part's brief (references/host-continuity.md).
   - The person gave a script: keep their words and order. Over the word budget, say what you
     trimmed or offer a longer episode (asking.md, section 4).
   - The person wants to work on the words first (hook options, rewrites, nothing filmed yet):
     for 60 s or less, write them with creatorline-short-script, then come back here to film;
     for a longer episode, write them here and stop before the quote.

4. **Quote the whole episode** before anything starts. Price every item, none with `confirm`:

   | Item | Call |
   |---|---|
   | Set photo (new set only) | `create_generation` `{tool: "text-to-photo", brand_id, prompt}` |
   | Each part, and a new sign-off clip | `create_generation` `{tool: "ugc-video", brand_id, avatar_id, prompt, params: {ugc_style: "Talking head", duration, aspect_ratio: "9:16", resolution: "720p"}}` |
   | Each new cutaway | `create_generation` with `text-to-video`, `photo-to-video` or `text-to-photo` |
   | Voice match, one per new take | `estimate_generation_cost` `{tool: "change-voice"}` |
   | Captions and export | `get_video_guide` → `credits.captions`, `credits.export` |

   A part quoted before its set photo exists costs the same with it: a photo input does not
   change a take's price. An item whose required input does not exist yet (a new still to
   animate with `photo-to-video`) is priced with `estimate_generation_cost` and the same tool
   and `params`; the still is its own item. Add everything up and send ONE message: the
   title, length, host and set; the script part by part; the cutaways in one line; one line
   per item, the total, the balance, how long it takes, "Go ahead?" (example below). Short
   balance or free trial: house-rules.md, sections 2 and 8. A cheaper version of an episode:
   shorter, library cutaways or stills instead of new clips, no voice match.

5. **Film.** On yes:
   - New set: make the set photo first, wait for it, look at it with `preview_assets`. If it
     is off, say what you would change and ask before making another: a second photo was not
     in the quote.
   - A new set or a new host look (a first episode, one-off or series): film part 1 alone as
     the pilot (cutaways may run beside it). Show the pilot and the set in two lines with
     links and ask "Keep this host look and set for the rest?". Then film the other parts and
     the sign-off. A change asked for here: change one thing in the kit, quote what must be
     redone (the set photo, part 1), get a yes, go on. A running series whose look was
     approved before, or "just do it": film every part at once and say so.
   - Every paid call of the episode, here and in steps 6 and 7: call with the final arguments
     and no `confirm`. If the credits equal that item's line in the quote, call again with
     `confirm: true` without asking again. If they differ, stop and ask.
   - Every part takes `avatar_id` (the host) and `inputs: {location: "<set photo asset id>"}`;
     a part that shows the product adds `inputs.objects`.
   - Wait with `get_generation` `{generation_id, wait_seconds: 45}` on each running run, one
     short line between calls ("Part 2 of 3 is filming."). Runs over the workspace's limit
     stay `queued` and start on their own: say they are waiting for a free slot. A take runs
     several minutes; when the parts will clearly need more than about ten, say how far along
     it is and to ask "is my episode ready?" (house-rules.md, section 3). Never start a part
     twice: before re-filming, read it with `get_generation`.
   - Look at all finished parts together with `preview_assets` (cover frames): the same face,
     outfit and set. Give each a verdict (house-rules.md, section 5) before any new spend.

6. **Assemble** (references/assembly.md has every operation list):
   1. `create_video` `{brand_id, title: "<Show> Ep. <n>: <topic>", operations}`: one `add_clip`
      per part, ids `p1`, `p2`..., then the sign-off clip.
   2. Voice match: `run_video_ai` `{video_id, action: "change_voice", clip_id, voice_id}` on
      every part, the same `voice_id` each time (Voice, below). Read `get_video` every 20 s
      until no clip is `generating`.
   3. `write_captions` `{video_id, style, position: "auto"}`; read `get_video` until
      `captions.status` is `ready`.
   4. Read `captions.lines` against the script. In ONE `edit_video`, trim the silence at the
      seams. Then `write_captions` again: free, no price step. Wait for `ready`. A split
      screen, if any, comes after this, cut at the new caption times (assembly.md, section 6).
   5. In one `edit_video`, add cutaways, cards and texts, timed from the caption lines.
   6. `preview_video`, once with `show_safe_area: true`. Fix with `edit_video`, look again.

7. **Review, then export.** Tick "Check before you show it". `get_video` must show
   `ready_to_export: true` and no `warnings`. Then `export_video` and read `get_video` every
   10 to 30 s until `export.status` is `done`.

8. **Deliver** (Show the result). `get_credit_balance` gives the "left" number. After the
   first episode of a series, add the series bible (references/series-bible.md).

The price message for step 4:

```
**Speak Up Sundays, Ep. 1: "3 phrases that make you sound confident"** (about 60 s)
Mia hosts at a home-office desk, phone style, 3 parts and a sign-off, 4 cutaways, captions.

1. (20 s) "Three phrases that make you sound sure of yourself in any meeting. ..."
2. (17 s) "Phrase two. Stop opening with 'Sorry, quick question.' ..."
3. (20 s) "Phrase three. When the room goes quiet, ..."
Sign-off (5 s): "That's Speak Up Sundays. See you next Sunday."
Cutaways: notebook closing, empty meeting room, wall clock, sticky note.

- Set photo: <a> credits
- 4 takes (3 parts and the sign-off): <b>
- 4 cutaways: <c>
- Voice match on 4 takes: <d>
- Captions <e>, export <f>
Total <N> credits. You have <M>. About 15 minutes; you see part 1 first. Go ahead?
```

### Fix one part later

1. `get_video` on the episode; find the part.
2. Quote the fix as one batch: the new take (the same brief with the one change), its voice
   match and a new export (every export is charged). One yes for the total.
3. Re-film the part. `edit_video` `[{op: "replace_clip", id: "p2", asset_id: "<new take>"}]`:
   same place, same length when the new take is long enough.
4. Voice match that clip, then `write_captions` again (free).
5. Re-time texts and cutaways that sat over it (`update_text`, `update_layer`), preview, and
   export again.

## Craft

### What makes a hosted episode work

- **One promise in the first 3 seconds, kept by the end.** Name the road ("three phrases",
  "the two fees and the one nobody checks") so the viewer knows how long they are in for.
- **The host is the constant, the picture is not.** Same face, set, outfit and voice. Something
  new on screen about every 12 to 15 s: a new part, a cutaway, a label.
- **Viewers decide again near 12 s, near 30 s and before the end.** Put a re-hook at each: a
  new part opening on its own small hook, a cutaway, a label.
- **Parts end on a hand-off** ("and the second one is worse") and the next part pays it.
- **The ending is a verdict, then the sign-off.** The call to action is on-screen text and post
  caption, never spoken.
- **Phone-native.** One phone in a real room. A jump cut where two parts meet is native to the
  format; a face that changes on that cut is not.
- **Hook first, show name second.** Never open on "Welcome to..." or the show's name.

### Length and parts

| Length | Words spoken (about) | Parts | Cutaways |
|---|---|---|---|
| 30 to 40 s | 70 to 95 | 2 | 2 to 3 |
| 45 s | 105 to 115 | 2 to 3 | 3 |
| 60 s | 140 to 150 | 3 + sign-off | 4 |
| 90 s | 210 to 225 | 4 + sign-off | 6 |
| 120 s | 280 to 300 | 5 + sign-off | 8 |

Cutaways are layers over the host, so the host keeps talking under them: they never take words
out of the budget. Speech budget per second: video-briefs.md, section 7.

### The continuity kit

Write it once, paste it word for word into every part (references/host-continuity.md):

- the same `avatar_id` in every part;
- the set photo in `inputs.location`, named `@Location1`, plus one set sentence;
- one wardrobe sentence ("@Avatar1 wears exactly the outfit from her photo");
- one camera sentence and one light sentence;
- `ugc_style: "Talking head"` in every part. Never `Auto` (it picks a format per take), and not
  `Storytime` or `Podcast clip` (they bring music cues and a studio guest set);
- the same `aspect_ratio` and `resolution` in every part;
- "Sound: voice and room sound only." Music in a take jumps at every seam and garbles the voice
  match.

### Voice

Every take makes its own voice, so two parts of one avatar can sound like two people. Voice
match is on by default: `run_video_ai` `change_voice` re-voices each part in one voice and
keeps the words, timing and lips. That voice is the host's `voice_id` from `get_avatar`; a host
with none gets one fitting voice from `list_voices`, named in the plan. It is a line in the
price; the person may drop it. When the words must be exact (a sponsor read, a legal line), use
the voice-first route in references/host-continuity.md.

### Cutaways

- **Where from**, in this order: the brand's library (`list_assets` with `brand_id` and
  `search`, then `preview_assets`); the person's links (`import_asset`); new footage:
  `text-to-video` (a scene: hands, objects, places, no faces), `photo-to-video` (a still
  brought to life), `text-to-photo` (a still, shown 2 to 3 s). The stock library holds hooks
  and green screen clips of other people and no b-roll: leave it out of a host episode.
- **How**: an `add_layer` over the host clip, always `sound: false`. Full screen with
  `fill: true` for vertical footage; a card (`width` about 0.6, `row: "middle"`, white
  `border`, `rounded` corners) for a photo, a screenshot or wide footage.
- **When**: 2 to 4 s each, starting on the word they show; none in the first 3 s or over the
  sign-off; together no more than about a third of the runtime. The host is the show.
- **Seams**: a cutaway from 1 s before to 1 or 2 s after a seam hides a small shift in the
  face or the room between two parts.

### On-screen text

- Hook line: top, size `l`, from 0 to about 3 s. Series tag ("Speak Up Sundays · Ep. 4"): top,
  size `s`, right after. Part labels: top, size `m`. Call to action: middle, over the sign-off.
- One `look` for every text of the series; a few words each (about 26 characters per line at
  size `m`).
- Nothing on the captions row (the bottom, or the middle when a clip has a split screen).

### Sound

No music bed by default. `set_sound` plays a track at its own level under the host's voice (it
is only turned down under voiceovers), so a normal music track buries the words. Use one only
when the person gives a quiet instrumental, and say that risk in one line.

### Series

A show holds when the same things come back every week: the promise, the host kit, the parts in
the same order with the same labels, the same sign-off words, the same looks. Film the sign-off
once as its own 5 s clip and reuse it in every episode. The bible and how to continue a series:
references/series-bible.md.

### Facts and claims

The host says only what the person gave, what the brand document holds, or what a source you
can name supports. Anything you cannot back stays out of the host's mouth and off the screen.
The avatar never claims a personal past (house-rules.md, section 7); a story is framed as an
example ("Say you're in a meeting...") or is about something real and checkable.

## Check before you show it

Before `export_video`, read `get_video`, look with `preview_video`, and tick every line:

1. **Promise**: the first 3 s are the host mid-sentence on the hook, with the hook text on
   screen; every item the hook promises is said (read `captions.lines`).
2. **Words**: the caption lines match the script. Fix a misheard word with `edit_caption`.
   Nothing breaks the claim floor or a brand don't.
3. **One host**: every part's cover frame shows the same face, hair, outfit and set
   (`preview_assets` on the parts).
4. **One voice**: the voice match ran on every part, or the person listened and is happy.
5. **Seams**: no gap over about half a second and no repeated words where parts meet; a seam
   where the face shifts is covered by a cutaway.
6. **Movement**: something changes about every 12 to 15 s, with one change near 12 s and one
   near 30 s.
7. **Cutaways**: sound off, starting on their words, none in the first 3 s or over the sign-off,
   no more than about a third of the runtime.
8. **Text**: one look per kind of text, a few words each, nothing on the captions row, nothing
   in the covered bands (`preview_video` with `show_safe_area: true`).
9. **Captions**: `status` is `ready`, in the series' style.
10. **Ending**: a verdict, then the sign-off; the call to action is text, not speech.
11. **Length**: within about 10 s of the target, under 180 s.
12. **Series**: tag, sign-off, looks and caption style match the bible.
13. **Ready**: `ready_to_export` is true and `warnings` is empty.

Say what you could not check: production previews may show a clip's cover frame instead of the
exact moment (`exact: false`), and you cannot hear the sound. When it matters, ask the person to
watch the `studio_url` before you export.

## If it goes wrong

| What you see | Why | Fix |
|---|---|---|
| A part shows a different face, hair or outfit | Each part is its own render | Same call once more; if it repeats, shorten the part or give it fewer actions. Cover the seam with a cutaway meanwhile. |
| The room or light changes between parts | No set photo, or the set words differ | The same set photo in `location`, the same set and light sentences |
| Parts sound like different people | Every take makes its own voice | Voice match every part (`run_video_ai`, `change_voice`, the same `voice_id` on each) |
| The voice match sounds garbled | Music or a second voice in the take | Re-film the part with "voice and room sound only" and the host alone |
| Lines reworded, cut or rushed | Too many words for the seconds | More seconds (words / 2.5 + 1); for exact words, the voice-first route |
| A prop appears from nowhere or floats | Takes show only props the set photo shows; one named in words is drawn badly | Put the prop in the set photo, or drop it from the brief |
| The music drowns the host | `set_sound` is not turned down under the clips' speech | `remove_sound`, or a quieter track from the person |
| Captions show `out_of_date` | The clips changed after captions | `write_captions` again (free), wait for `ready` |
| A text or cutaway sits on the wrong words after a trim | Texts, layers and voiceovers keep their times when clips change | Re-time from the new caption lines (`update_text`, `update_layer`), then preview |
| "Add a clip first" | A text or layer came before any clip in the call | Put the `add_clip` operations first |
| Export refused | Something is generating or captions are being written | `get_video` until nothing runs, then export |
| "being changed somewhere else, nothing was saved" | The person is editing the same video in the studio | `get_video`, redo the change; ask them to close the editor while you work |
| A second copy of the episode | `create_video` was sent twice | `list_videos` before retrying; remove a copy only with a yes (`delete_video`) |
| The episode runs over 180 s | Video Studio's limit | Cut a part, or make two episodes |
| A part refused for a real face | The default model takes AI faces only | video-briefs.md, section 12 |

A failed run is refunded automatically; a retry is a new paid run (house-rules.md, section 5).

## Show the result

While it runs, the pilot gets one line with its link and the set's, then the question:

```
Part 1 is ready: [watch it](<output url>) · [the set](<set photo url>). Keep this look for the rest?
```

The finished episode uses the card:

```
**Speak Up Sundays, Ep. 1: 3 phrases that make you sound confident**: a 59 s episode, Mia hosts at her desk, 3 parts and a sign-off, 4 cutaways, captions.
[Watch the episode](<export.url>) · [Open in Video Studio](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Make the cover for this episode
2. Put it in the review queue with a caption in your brand's voice
3. Cut a 15-second teaser from the opening
```

- The MP4 link expires; the Video Studio link stays.
- After the first episode of a series: the series bible as a short block in plain words, and
  one line: keep it, and add its one-line summary to the brand's Format notes in Creatorline
  (the Brand item in the left rail, card "Audience and format"), so any later chat finds the
  show (references/series-bible.md, section 3).
- Say plainly anything you could not check, and anything you changed from the plan.

## Next steps to offer

| Next | How |
|---|---|
| A cover in the series' layout | creatorline-cover-image |
| Post it | creatorline-publish: `create_post` with `export.asset_id` and `made_with_ai: true`; nothing goes public without their yes |
| A 15 s teaser of the opening | references/assembly.md, section 10 |
| The next episode, or a month of them | This skill again, or creatorline-content-calendar |
| Change one part, a text or the caption look | "Fix one part later", or creatorline-video-studio |

## References

- [references/episode-formats.md](references/episode-formats.md): formats, spine, hooks, hand-offs, a 60 s script in parts.
- [references/host-continuity.md](references/host-continuity.md): the kit, the set photo, part briefs, voice routes, two hosts.
- [references/assembly.md](references/assembly.md): Video Studio operation lists, trims, cutaways, texts, teaser, patches.
- [references/series-bible.md](references/series-bible.md): the bible, where it lives, the next episode.
- [references/house-rules.md](references/house-rules.md): the session, consent, waiting, results, failures, safety, app-only.
- [references/asking.md](references/asking.md): how to ask.
- [references/video-briefs.md](references/video-briefs.md): how a brief becomes a take, speech budget, inputs, real faces.
