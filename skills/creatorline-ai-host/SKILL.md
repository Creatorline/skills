---
name: creatorline-ai-host
description: "Makes a 30 to 120 second episode hosted by the brand's AI avatar: script, takes in one set, cutaways, captions, a cover and export in Video Studio, plus a series bible so later episodes match. Use for an episode, a show, a weekly series, a one-minute explainer with a host. Not for one short clip: use creatorline-talking-video. No face: creatorline-faceless-video."
license: MIT
metadata:
  author: creatorline
  version: "2.1"
---

# AI host episodes

Turn a topic or a script into a finished 30 to 120 second vertical episode hosted by the
person's AI avatar. The host keeps the same face, set, outfit and voice from the first line to
the sign-off; cutaways, on-screen text and captions keep the picture moving. You deliver an
editable Video Studio project, its exported MP4 and a cover, ready for the review queue. For a
recurring show you also hand over a series bible, so episode 12 looks like episode 1. The
person picks a topic, a set and a look; you write, quote once, film, assemble, check and
deliver, pausing only where their choice is needed.

## When to use

- "Make an episode / a show / a weekly series with my avatar", "a 60-second explainer with Mia
  hosting", "a longer video, about a minute", "the next episode of Speak Up Sundays".
- Any avatar-hosted video longer than one take (over 30 s), or with several parts and cutaways.
- The script of an episode over 60 s, even when nothing is filmed yet.
- Changing one part of an episode made earlier (assembly.md, section 12).

The CURRENT message must ask for an episode. An episode discussed earlier does not carry
over: if the person now wants only a sample take, a test line or a greeting from the host,
that is creatorline-talking-video, keeping the host and the script already agreed.

## Not for

| The ask | Use |
|---|---|
| One talking clip, 5 to 30 s, one take (a review, a hot take, a tip) | creatorline-talking-video |
| A given script read word for word in one steady frame, up to 3 minutes, no set or cutaways; a green screen presenter | creatorline-talking-head |
| Narration with no face on camera | creatorline-faceless-video |
| A product-first video with a voice off screen | creatorline-product-video |
| The script of a video of 60 s or less, nothing filmed | creatorline-short-script. An episode script over 60 s stays here: write it (step 3) and stop before the quote. |
| A step-by-step product demo | creatorline-tutorial-video |
| Editing a video that exists, no new takes | creatorline-video-studio |
| Posting a video that exists | creatorline-publish |
| Cutting a long recording into shorts | creatorline-long-to-shorts |
| Re-filming a viral video with the avatar | creatorline-reshoot |
| A week of mixed posts | creatorline-content-calendar (it can send episodes back here) |
| Over 3 minutes, or a wide 16:9 video | Not possible: Video Studio makes vertical 9:16 videos up to 180 s. Offer a 2-minute cut or a two-part episode. |

## What you need

| Need | Hard gap? | If not given |
|---|---|---|
| Topic or script | Yes. Options from `brand_voice.content_angles` (none there: from the brand's niche). A given script is kept word for word | none |
| Host | Only when the brand has no avatar at all: made in the app (https://app.creatorline.io/avatars/new) | The brand's default avatar; an avatar the person names, found by name. A real person's photo: host-continuity.md, section 10 |
| Set | Asked on a first episode (host-continuity.md, section 2) | A running series' set; under "just do it", a lived-in room that fits the niche (still picked from candidates) |
| Edit style | Asked on a first episode (edit-styles.md, section 1) | A running series' style; under "just do it", Auto |
| Length | No | 60 s |
| Format | No | Picked from the topic (episode-formats.md, section 2) |
| One episode or a series | No | One episode; a series when they say series, show or weekly, or earlier episodes exist |
| Outfit | No, never asked | What the avatar wears in its photo, said as a statement |
| Voice | No | The avatar's own voice, matched across parts (host-continuity.md, section 8) |
| Files they give | Asked only when a file could go two ways | Each gets one route (supplied-media.md) |
| Pictures from the web | Asked in one line, only for real events or named subjects: ones the person may use (their own, licensed or public domain) | Generated pictures that read as illustration |
| Product | Only when the episode shows one | Its real photo; never a made-up stand-in |
| Facts, numbers, news | Only when the topic needs them | Checked sources; otherwise numbers stay out |
| Cover | No | One, quoted with the episode; the person may drop it |
| Music | No | None, said in the delivery. Required: the file comes before any spend |
| Language | No | The brand's `language` |

Never ask about wardrobe, accent, lens, light, aspect ratio, brand marks or how much the host
gestures: the defaults decide, and the person can change them.

## The flow

Follow the session in references/house-rules.md. The steps below are what this skill adds.
After the intake, keep going to delivery. Pause only for a missing hard gap, a real choice
(the set, the style), the price yes, or a checkpoint the person asked for.

1. **Start, orient, check the tools.** If `track_skill_activation` is in your tool list, call it
   once for this request with `skill_name: "creatorline-ai-host"` (house-rules.md, section 10).
   Then, skipping what this conversation already did: `list_brands`, `get_brand`, `get_avatar` on
   the host, `get_credit_balance` (house-rules.md, section 1). Confirm the tools the flow uses
   are in your list (review.md, section 2); one missing: say what cannot be done, stop. Call
   `get_video_guide` (its `credits` price captions and export) and `list_models` with
   `tool: "ugc-video"` (the take's duration range) once each; both are free. Look for a
   running series:
   - `get_brand` → `brand_voice.format_notes` may hold a line about the show;
   - `list_videos` with the `brand_id`: episodes are titled "<Show> Ep. <n>: <topic>";
   - `get_video` on the highest episode number (the list is ordered by last change).

2. **Intake** (references/asking.md). One message, at most three questions, the recommended
   option first. A first episode: the topic, the set and the edit style. A running series:
   only the topic. A file that could go two ways, or pictures from the web, takes the set's
   place; the set then falls to its default, stated. End with the defaults line:

   ```
   Happy to. Three quick picks:
   1. Topic: 1) 3 phrases that make you sound confident (recommended) 2) Why meetings run
      over 3) How to say no to your boss 4) Your own
   2. Set: 1) a lived-in home office (recommended) 2) an armchair in a lounge 3) a studio
      backdrop 4) a plain painted wall 5) a photo of your own room
   3. Edit style: 1) Auto, I pick from the topic (recommended) 2) Bold Editorial 3) Funky
      Modular 4) Luminous Interface 5) Documentary Collage 6) Web Brutalism 7) Minimal
      8) Press 9) Editorial Overlay 10) your own direction
   Defaults: about 60 s, Mia hosts in her own voice and the outfit from her photo, 9:16
   phone style, 3 parts and a sign-off, cutaways, captions, one cover, English.
   ```

   A reply that skips the style has not picked Auto: ask again in one line. A studio look
   ("a proper show", "camera angles") goes the studio-takes route (references/studio-takes.md).

3. **Write the script and cut it into parts** (references/episode-formats.md).
   - Check facts first; three hooks, keep the strongest; the whole script in the brand's voice.
   - Parts of 12 to 25 s at complete thoughts. `duration` = the words at 150 a minute, plus
     held seconds, plus 0.4, rounded up; at least 4, never over 30 on one call (a longer run
     is joined on the server, out of your control).
   - Write the continuity kit and every part's brief (references/host-continuity.md), then run
     the brief self-check (review.md, section 4).
   - A given script: keep its words and order. Over the budget, say what you trimmed or offer
     a longer episode (asking.md, section 4).
   - Words first, nothing filmed: 60 s or less with creatorline-short-script; longer, write
     them here and stop before the quote.

4. **Quote the whole episode** before anything starts. Price every item, none with `confirm`:

   | Item | Call |
   |---|---|
   | Set candidates (new set only) | `create_generation` `{tool: "text-to-photo", brand_id, prompt, count: 4}` |
   | Each part, and a new sign-off clip | `create_generation` `{tool: "ugc-video", brand_id, avatar_id, prompt, params: {ugc_style: "Talking head", duration, aspect_ratio: "9:16", resolution: "720p"}}` |
   | A product repair still, if needed | `create_generation` `{tool: "photo-edit", ...}` (supplied-media.md, section 6) |
   | Each new cutaway | `create_generation` with `text-to-video`, `photo-to-video` or `text-to-photo` |
   | The cover | `create_generation` `{tool: "photo-edit", model: "gpt-image-v2-edit", avatar_id, prompt, params: {aspect_ratio: "9:16", resolution: "2K", quality: "Medium"}}` |
   | Voice match, one per new take | `estimate_generation_cost` `{tool: "change-voice"}` |
   | Captions and export | `get_video_guide` → `credits.captions`, `credits.export` |

   A part quoted before its set exists costs the same with it: a photo input does not change a
   take's price. An item whose input does not exist yet is priced with
   `estimate_generation_cost` and the same arguments. On the studio-takes route the takes'
   line comes from `run_workflow` without `confirm` (studio-takes.md, section 3). Add
   everything up and send ONE message: title, length, host, set and style; the script part by
   part; the cutaways in one line; one line per item, the total, the balance, how long it
   takes, "Go ahead?" (example below). Short balance or free trial: house-rules.md, sections 2
   and 8. A cheaper episode: shorter, library cutaways or stills, no voice match, no cover.

5. **Film.** On yes:
   - Every paid call of the episode, here and in steps 6 and 7: the person's yes covers each
     item of the quote at its quoted price. Call with the final arguments and no `confirm` to
     read the price; when it matches that item's line, call again with `confirm: true`. When it
     differs, stop and ask the person.
   - New set: make the four candidates, show them together with a link each, and wait for the
     person to pick one (host-continuity.md, section 2). Never pick for them.
   - Part 1 first, with the hook. Every part takes `avatar_id` and `inputs: {location: "<set
     photo asset id>"}`; a part with the product adds `inputs.objects`. While part 1 films,
     make the cutaways and the cover, and write the picture plan (references/picture-plan.md).
     The cover's brief: the host chest-up on one side, three or four words of the hook's
     promise in big letters on the other, the top and bottom bands left clear, one take;
     creatorline-cover-image has the full craft. It is never a clip in the episode.
   - Part 1 done: check it (review.md, section 5). It passes: film the other parts and the
     sign-off at once, as quoted. It fails: review.md, section 12. A running series films
     every part at once.
   - Wait with `get_generation` `{generation_id, wait_seconds: 45}` on each running run, one
     short line between calls ("Part 2 of 3 is filming."). A lookup error is not a failed run:
     read again. Runs over the workspace's limit stay `queued` and start on their own: say so.
     Parts needing more than about ten minutes: say how far along it is and to ask "is my
     episode ready?" (house-rules.md, section 3). Never start a part twice.
   - All parts done: check each, then show them once together, one line and link each, as
     progress, not the delivery.

6. **Assemble** (references/assembly.md has every operation list):
   1. `create_video` `{brand_id, title: "<Show> Ep. <n>: <topic>", operations}`: one `add_clip`
      per part, ids `p1`, `p2`..., then the sign-off clip. Send the `studio_url` as a rough cut
      in one line and carry on.
   2. Voice match: `run_video_ai` `{video_id, action: "change_voice", clip_id, voice_id}` on
      every part, the same `voice_id` each time. Read `get_video` every 20 s until no clip is
      `generating`.
   3. `write_captions` `{video_id, style, position: "auto"}`, the style's caption style; read
      `get_video` until `captions.status` is `ready`.
   4. Read `captions.lines` against the script. In ONE `edit_video`, trim the silence at the
      seams. Then `write_captions` again: free, no price step. Wait for `ready`.
   5. In one `edit_video`, build the picture plan in the edit style (references/edit-styles.md),
      timed from the caption lines. Read it back against the plan.
   6. The frame review with `preview_video` (review.md, section 8). Fix, look again.

7. **Review, then export.** Tick "Check before you show it". Then `export_video` and read
   `get_video` every 10 to 30 s until `export.status` is `done`.

8. **Deliver** (Show the result). Read the cover once with `get_generation`
   `{generation_id, wait_seconds: 0}`: finished, look at it (`preview_assets`: the right
   host, the exact words, readable small) and include it; still running or failed, deliver
   without it and say so. `get_credit_balance` gives the "left" number. After the first
   episode of a series, add the series bible (references/series-bible.md).

The price message for step 4:

```
**Speak Up Sundays, Ep. 1: "3 phrases that make you sound confident"** (about 60 s)
Mia hosts at a home-office desk, phone style, Bold Editorial, 3 parts and a sign-off,
4 cutaways, captions, a cover.

1. (20 s) "Three phrases that make you sound sure of yourself in any meeting. ..."
2. (17 s) "Phrase two. Stop opening with 'Sorry, quick question.' ..."
3. (19 s) "Phrase three. When the room goes quiet, ..."
Sign-off (5 s): "That's Speak Up Sundays. See you next Sunday."
Cutaways: notebook closing, empty meeting room, wall clock, sticky note.

- 4 set options to pick from: <a> credits
- 4 takes (3 parts and the sign-off): <b>
- 4 cutaways: <c>
- Cover: <d>
- Voice match on 4 takes: <e>
- Captions <f>, export <g>
Total <N> credits. You have <M>. About 15 minutes; you pick the set first.
Go ahead?
```

**Changing it later**: find the project, read it first, re-film only the part asked for, put
it in place, re-time what sat over it, export again (assembly.md, section 12).

## Craft

- **One promise in the first 3 seconds, kept by the end.** Name the road ("three phrases",
  "the two fees and the one nobody checks") so the viewer knows how long they are in for.
- **Hook first, show name second.** Never open on "Welcome to..." or the show's name.
- **The host is the constant, the picture is not.** Same face, set, outfit and voice. Viewers
  decide again near 12 s, near 30 s and before the end: put a new part, a cutaway or a label at
  each.
- **Parts end on a hand-off** ("and the second one is worse") and the next part pays it.
- **The ending is a verdict, then the sign-off.** The call to action is on-screen text and post
  caption, never spoken.
- **Phone-native.** One phone in a real room. A jump cut where two parts meet is native to the
  format; a face that changes on that cut is not. Each part opens one size wider than the last
  one ended (host-continuity.md, section 7).
- **Let the references carry the look.** The avatar's image carries the face, the set photo the
  room, the product photo the product. The brief carries behaviour, words and voice; it never
  describes what an image already shows.
- **The strongest picture before text.** For each part, name the most specific thing it could
  show before settling for a label (picture-plan.md, section 4).
- **Measure, never guess.** Times come from `get_video` and the caption lines.
- **Facts are backed.** A fact about the world (a number, a headline, a date) comes from what
  the person gave, the brand document, or a source you name. The host speaks in its own voice,
  with its own opinions.
- **Sound.** No music unless the person supplies a quiet instrumental (supplied-media.md,
  section 8). Cutaways stay silent.

Length and parts at 150 words a minute:

| Length | Words spoken (about) | Parts | Cutaways |
|---|---|---|---|
| 30 to 40 s | 70 to 95 | 2 | 2 to 3 |
| 45 s | 105 to 115 | 2 to 3 | 3 |
| 60 s | 140 to 150 | 3 + sign-off | 4 |
| 90 s | 210 to 225 | 4 + sign-off | 6 |
| 120 s | 280 to 300 | 5 + sign-off | 8 |

Cutaways are layers over the host, so the host keeps talking under them: they never take words
out of the budget.

## Check before you show it

Before `export_video` (review.md has each gate in full):

1. **Promise**: the first 3 s are the host mid-sentence on the hook, with the hook text on
   screen; every item the hook promises is said.
2. **Words**: the caption lines match the script, every word once and in order. Fix a misheard
   word with `edit_caption`. Nothing crosses a fixed line (house-rules.md, section 7) or a
   brand don't.
3. **One host**: every part shows the same hair, face, outfit and set.
4. **One voice**: the voice match ran on every part, or the person listened and is happy.
5. **Seams**: a size change, no gap over about half a second, no repeated words.
6. **The plan**: every planned item is there, on its words, in the edit style, off the face,
   held long enough to read; nothing in the covered bands.
7. **Ending**: a verdict, then the sign-off; the call to action is text, not speech.
8. **Length**: what the measured cut gives, under 180 s; never padded or sped up.
9. **Series**: tag, sign-off, style and caption look match the bible.
10. **Ready**: `ready_to_export` is true, `warnings` is empty, captions are `ready`.
11. **Creative review**: the seven questions (review.md, section 10), one round.

Say what you could not check: production previews may show a clip's cover frame instead of the
exact moment (`exact: false`), and you cannot hear the sound. When it matters, ask the person to
watch the `studio_url` before you export.

## If it goes wrong

| What you see | Fix |
|---|---|
| A part shows a different face, hair or outfit | review.md, section 12; cover the seam with a cutaway meanwhile |
| The room or light changes between parts | The same set photo in `location`, the same set and light sentences |
| Parts sound like different people | Voice match every part with the same `voice_id` |
| Lines reworded, cut or rushed | More seconds (the duration rule); exact words: the voice-first route |
| A text or cutaway on the wrong words after a trim | Re-time from the new caption lines, then preview |
| Captions show `out_of_date` | `write_captions` again (free), wait for `ready` |
| A part failed | Refunded; run it once more on the same yes (review.md, section 12) |
| Anything else | review.md, section 15 |

## Show the result

The finished episode uses the card:

```
**Speak Up Sundays, Ep. 1: 3 phrases that make you sound confident**: a 58 s episode, Mia hosts at her desk, 3 parts and a sign-off, 4 cutaways, captions, Bold Editorial.
[Watch the episode](<export.url>) · [Open in Video Studio](<studio_url>) · [The cover](<cover url>)
Used <N> credits. <M> left.
No music bed (none was supplied). I could not hear the voice match; give it a listen.

What next?
1. Put it in the review queue with a caption in your brand's voice
2. Cut a 15-second teaser from the opening
3. Plan the next episode
```

- The MP4 and cover links expire; the Video Studio link stays and is the editable episode.
- Give the measured length, and plainly what you could not check, what you changed from the
  plan, which supplied files you set aside and why, and the cover's state if it is not there.
- After the first episode of a series: the series bible as a short block in plain words, and
  one line: keep it, and add its one-line summary to the brand's Format notes in Creatorline
  (the Brand item in the left rail, card "Audience and format"), so any later chat finds the
  show (references/series-bible.md, section 3).

## Next steps to offer

| Next | How |
|---|---|
| Post it | creatorline-publish: `create_post` with `export.asset_id` and `made_with_ai: true`; nothing goes public without their yes |
| A 15 s teaser of the opening | references/assembly.md, section 10 |
| The next episode, or a month of them | This skill again, or creatorline-content-calendar |
| Another cover, or a 16:9 one | creatorline-cover-image |
| Change one part, a text or the caption look | assembly.md, section 12, or creatorline-video-studio |

## References

- [references/episode-formats.md](references/episode-formats.md): formats, hooks, pace and parts, facts, a 60 s script, the script checkpoint.
- [references/host-continuity.md](references/host-continuity.md): the kit, the set, part briefs, wardrobe, seams, voice, two hosts, a real person's photo.
- [references/studio-takes.md](references/studio-takes.md): the opt-in studio look with a camera map and written take prompts.
- [references/picture-plan.md](references/picture-plan.md): who owns the picture, density, the cutaway pass, timing, placement.
- [references/edit-styles.md](references/edit-styles.md): the eight edit styles in Video Studio fields, Auto, their own direction.
- [references/supplied-media.md](references/supplied-media.md): routes for their files, the product in an episode, web pictures, music.
- [references/assembly.md](references/assembly.md): Video Studio operation lists, trims, cutaways, texts, teaser, patches, later changes.
- [references/review.md](references/review.md): every gate, repairs, retries, lost answers, the full failure table.
- [references/series-bible.md](references/series-bible.md): the bible, where it lives, the next episode.
- [references/house-rules.md](references/house-rules.md): the session, consent, waiting, results, failures, safety, app-only.
- [references/asking.md](references/asking.md): how to ask.
- [references/video-briefs.md](references/video-briefs.md): how a brief becomes a take, speech budget, inputs, real faces.
