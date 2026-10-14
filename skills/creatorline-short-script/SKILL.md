---
name: creatorline-short-script
description: "Writes the words of a short video, nothing filmed: hooks, a timed 10 to 60 second script (lines, on-screen text and visuals per beat) and a caption, in the brand's voice. Advice, reviews, commentary, true stories, explainers. Use for 'write hooks', 'a 30-second script', 'fix my script'. Not for filming it: use creatorline-talking-video. A finished video's caption: creatorline-publish."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Short-Form Script

You write the words of one short vertical video, and nothing else: three hook options to choose
from, a timed script where every beat has its line, its on-screen text and its picture, a
caption with hashtags, and a retention map that shows what keeps the viewer watching. Every
script is routed first to exactly one genre (advice, a product review, commentary, a true story,
true crime, an explainer) or to a UGC scene format, and written with that genre's proven hooks,
beats and rules, in the brand's voice, for whoever will say it (the avatar, a narrator, or the
person on their own camera), sized to its seconds and ready to film. Writing spends nothing, so
there is no price step: orient, route, ask only for a real gap, write, show it, then offer to
film it with the skill that fits.

Run the session by [the house rules](references/house-rules.md) and ask the way
[asking](references/asking.md) says. [Video briefs](references/video-briefs.md) holds the speech
budget per shot and how a script becomes a filming brief.

## When to use

- "Write me five hooks for...", "a 30-second script about...", "what should Mia say about...".
- A script for advice or tips, a product review, a hot take or a reaction, a true story, a
  true-crime short, an explainer or a myth-buster, a POV or a skit.
- A voiceover or narration script that someone records later, or that the person reads on their
  own camera.
- "Check my script", "make this fit 15 seconds", "punch up the hook".
- A caption and hashtags for an idea or a video not made yet.
- "Script first, then we film it": you write it here, the format skill films it.

## Not for

| The ask | Use |
|---|---|
| Write it and film it in one go ("make a video of Mia reviewing...") | The format skill: `creatorline-talking-video`, `creatorline-tutorial-video`, `creatorline-unboxing-video` and the rest; the router `creatorline` knows them all |
| A caption, hashtags or a title for a finished video or photos | `creatorline-publish` (it gives the words as text when that is all they want) |
| Hook text or speech captions burned onto an existing video | `creatorline-captions` |
| A week or two of posts | `creatorline-content-calendar` |
| An episode or a series longer than 60 seconds, its script included | `creatorline-ai-host` (it writes the episode's script first) |
| A long YouTube video of several minutes | Not a Creatorline format. Say so in one line; write it as plain text only if the person still wants it, with [the long-form maps](references/long-form.md) |

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| Brand | Only with several brands and no hint | The only brand |
| What it is about | Only when nothing is given AND `brand_voice.content_angles` is empty | One content angle, stated |
| Genre | Only when two genres truly fit and the person is there to answer: ONE question about the outcome ([router](references/router.md), section 4) | Routed from the ask; named in the defaults line with the genre it beat |
| What the genre needs | Only what is missing and changes the script ([router](references/router.md), section 5) | Inferred and stated |
| Proof (their numbers, a test, a confession) | Only when the person speaks as themselves | The avatar: a demo on camera, the product's facts; a narrator, named sources; the person's own number, a marked blank |
| Product facts, when a product is in it | Only when the product is named with no facts anywhere | What the person said, `brand_voice.positioning`, a page they paste |
| Who says it | No | The brand's default avatar on camera. A narrator when the brand has no avatar or the person says faceless or voiceover. The person themself when they say they will film or record it |
| Length | No | The length they name (any whole number of seconds up to 60), else the genre's default |
| Language | No | The brand's `language` for lines, text and caption; you talk in the person's language |
| Platforms | No | TikTok, Reels and Shorts at once (one 9:16 script fits all three) |
| Hook options | No | Three; five when the person wants more choice |

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once for this request
   with `skill_name: "creatorline-short-script"`.
2. **Orient** (house rules, section 1), without `get_credit_balance`: nothing here spends.
   - `list_brands` (several and no hint: ask which, by name), then `get_brand`. Read
     `language`, `default_avatar_id` and `brand_voice`:

     | Field | Use it for |
     |---|---|
     | `summary` | What the brand is: the ground every line stands on |
     | `tone`, `dos` | How every line and the caption sound |
     | `donts` | Hard rules: never in a line, a text or the caption |
     | `content_angles` | The topic when the person gave none; the angle of the hook |
     | `audience`, `customer_segments` | Who the hook calls out and whose words the lines use |
     | `positioning` | Product facts, the problem it solves, what sets it apart |
     | `call_to_action` | The on-screen text over the last beat and the caption's ask |
     | `format_notes` | House habits for every video (follow them) |

   - `get_avatar` on the speaker (the named one from `list_avatars`, or `default_avatar_id`):
     `archetype`, `bio`, `tone`, `gender`, `age`. The lines must sound like this person.
   - Optional, free, when they help: `list_connections` with the `brand_id` (YouTube means a
     title too); `list_posts` with the `brand_id`, `status: "published"` and `limit: 5` when
     `brand_voice` is thin. For a script about a video that exists: `list_assets`,
     `preview_assets`, or for a Video Studio project `list_videos` then `get_video` (its
     `voiceovers` text and `captions.lines` read as a transcript).
   - The connection cannot reach a workspace yet (only `get_plan_requirement` or
     `list_workspaces` in your tools): pass on what it says (house rules, section 8), then offer
     to write the script anyway, and say in the defaults line that the brand's voice was not
     read.
3. **Read the ask.** Pick the mode and the speaker:

   | Mode | When | You deliver |
   |---|---|---|
   | Full script | The default | Hooks, script, caption, retention map |
   | Hooks only | "write me 10 hooks" | Hooks grouped by type ([hooks](references/hooks.md), section 6) |
   | Caption only | "a caption for this" | Caption, hashtags, a YouTube title when it posts there |
   | Check my script | The person pasted a script | The weakest point and two fixes ([deliverable](references/deliverable.md), section 9) |

   How much the person gave decides how much you decide (asking.md, section 4): a one-liner is
   autopilot; a script or beat list is followed beat for beat in their words.
4. **Route it** ([router](references/router.md)): fill in the five fields, pass one genre's gate
   or pick a UGC scene format, and know which genre came closest and why it lost.
5. **Intake.** Usually none: a script is free to redo. Ask one message (at most 3 questions,
   numbered options, the recommended one first, the defaults line under them; the host's
   question tool when it has one) only for a hard gap above: the one outcome question when two
   genres fit, a missing artifact for commentary, the case facts for true crime, the person's
   own proof when they speak as themselves.

   > One thing first: should this tell the story of what happened, or explain how it works?
   > 1) Explain how it works (recommended) 2) Tell the story
   > Defaults: Mia on camera, 30 seconds, English, for TikTok and Reels.

6. **Research.** For real-world facts, use the person's sources or the host's read-only
   research tools. Name each source in your notes; tag anything unverified `[VERIFY]`.
7. **Write**, in this order (depth in the references):
   1. The facts and monetization policies first ([router](references/router.md), sections 7
      and 8): they win over anything below.
   2. The takeaway in one sentence: the actual tip, fact, number or verdict.
   3. The genre's map at the length ([genres](references/genres.md)), with its lane.
   4. The beats inside the blocks, each a spoken line, its on-screen text and its picture; a
      production cue only where a beat needs one ([deliverable](references/deliverable.md),
      section 3).
   5. Three hooks, each a different type of the genre (or family of the scene format), each
      paid by the same body ([hooks](references/hooks.md)).
   6. The caption and hashtags, then the retention map (deliverable, sections 5 and 6).
8. **Check** ([below](#check-before-you-show-it)) against the genre's "Never" list, the false
   callback rule, the facts policy and the monetization policy. Fix what fails first.
9. **Show** it in the layout of [the deliverable](references/deliverable.md), section 1.
10. **Offer the next steps** ([below](#next-steps-to-offer)): filming it comes first.
11. **Revise** like an editor of one document: change only what the person points at, keep the
    beat times and the hook numbers stable, check again, and show the whole script again when a
    line or a time moved. Vague feedback becomes one concrete change you name first.

## Route the script

Fill in five fields: the **subject**, the **viewer promise**, the **narrative engine**, the
**evidence spine** and the **host stance**. The engine and the spine decide; the topic's nouns
only support. Then pass exactly one gate ([router](references/router.md), section 3):

| Genre | Gate, in short | The title promises | Default | Films with |
|---|---|---|---|---|
| Business and self-improvement | An outcome the viewer can act on, carried by advice, a framework or evidence | "what should I do to improve, earn, build" | 15 s (tips), 30 s (lists, steps) | `creatorline-talking-video`, `creatorline-tutorial-video` |
| Product and tech review | One product evaluated, tested, compared, ranked, demoed or taught through use; a verdict | "which should I buy", "I tested" | 15 s | `creatorline-talking-video`, `creatorline-product-video` |
| Commentary | A concrete artifact seen through an explicit stance | "what is wrong (or brilliant) about this" | 15 s (hot take), 30 s | `creatorline-talking-video` |
| Documentary story | Real, verified events or an arc, told through chronology and reveals | "what happened", "how did they rise or fall" | 30 s | `creatorline-faceless-video`, `creatorline-talking-video` |
| True crime | A specific case rebuilt from its record, with legal and ethical care | "how was this case solved" | 30 s (never under) | `creatorline-faceless-video` |
| Explainer | One how or why question, answered by a mechanism, a myth corrected, a demo or an analogy | "how or why does this work" | 15 s (myth vs fact), 30 s | `creatorline-talking-video`, `creatorline-faceless-video` |

No genre is the fallback, and genres are never blended. A scene rather than an argument (a POV,
an acted storytime or skit, GRWM, day in the life, unboxing, try-on, an app promo, new lines
over a trend) is a UGC scene format ([genres](references/genres.md), section 8). Two genres fit
and the person is there: ask one outcome question; they said to decide: infer it from the title
promise and the evidence.

## Craft

### The budget

Count every spoken word. The genre sets the pace ([genres](references/genres.md), section 1):
about 2.3 to 2.5 words a second for most, about 2.4 for stories and cases, faster for a review.
The avatar always stays inside the per-shot bands of video briefs, section 7; a narrator voice
at about 2.9 words a second at most.

| Length | Words spoken (at 2.5 a second) | Beats | When the avatar films it |
|---|---|---|---|
| 10 s | 22-30 | 3 | One take |
| 15 s | 30-45 | 4-5 | One take |
| 20 s | 45-60 | 5-6 | One take |
| 30 s | 65-90 | 7-9 | One take |
| 45 s | 100-130 | 10-13 | In 2 parts: mark the part break ([deliverable](references/deliverable.md), section 8) |
| 60 s | 135-175 | 13-16 | In 3 parts: mark the 2 part breaks |

- A beat is one spoken line and one picture, 3 to 5 seconds. Never under 3 seconds when the
  avatar films it: a shorter beat is merged or dropped.
- Over the band: cut adjectives, then a beat, then add seconds, and say which you did.

### The shape

- **The first line IS the hook**, 0 to 3 seconds, in three layers at once: what they hear, read
  and see ([hooks](references/hooks.md), section 1). The key thing is on screen within 2
  seconds, and the hook works with the sound off.
- **One loop**, opened at the top and paid near the end. No second tease; a bridge between parts
  is paid at once.
- **The arc folds** into hook, one mechanism or escalation, payoff, a one-line kicker, a hard
  stop. **A new picture every 3 to 4 seconds.**
- **The genre's payoff timing**: a review leads with its verdict and pays the catch late; a
  documentary holds its answer to 60 to 80 percent; an explainer turns at 60 to 85 percent.
- **No false callbacks**: "as I said", "remember" or "like I promised" only when that line
  exists in this script.

### Endings

- A verdict, a kicker or one sincere line, then stop. Never "thanks for watching" alone.
- At most one plain line about what is next (the next part, a follow), framed as a bit, a
  favor, or a named payoff coming, never a plea. When the avatar films it, that line is not
  spoken: it goes on screen over the last beat and in the caption.
- Nothing interrupts a running test, a reveal, a reaction cycle or a rising sequence: no ask,
  no plug, no "like and subscribe" in the middle.
- A loop-close (the last words run back into the first) suits hot takes and POVs.

### Who says it

| Speaker | Says | Keep in mind |
|---|---|---|
| The avatar on camera | A character in its own voice: its tone, opinions, reactions and humor, the product shown and demonstrated, stories told as its own or as a POV | Write it specific: one concrete moment beats a list. A line that points at something to SEE gets a beat that shows it |
| A narrator | The third person: the brand's facts and story; numbers written as they are said | A fact about the real world names its source ([router](references/router.md), section 7) |
| The person themself | Their own experience and proof, in their words | What you do not know of theirs (a number, a date) is a marked blank they fill: "[your result]" |

Health, supplements, skincare actives and money: never a promise that it cures, treats or
prevents a disease, or guarantees income or a return. A hedge ("not financial advice") gets a
beat of its own. An approved-claims list, when the person gives one, is kept word for word, and
their never-say words are a hard rule. A real person is named only as a matter of record in a documentary or a
true-crime script, never shown, never as an endorser. Never another brand by name, and never a
real creator's catchphrase, greeting, sign-off or running bit: invent the brand's own.

### Lines that sound said

Contractions, short sentences, one thought per sentence, one stressed word per line. The
avatar's register from `get_avatar`, the brand's from `brand_voice`. No slogans, no lines that
belong on the packaging, no "literally", "game changer" or "obsessed". No greeting and no
warm-up ("So", "Okay", "Hey guys", "Wait for it", "Stop scrolling", "In today's video") as the
first words. A verdict or a punch sentence gets its own line. No em dashes in lines, texts or
captions.

### On-screen text and cues

A few big words, not a sentence: one or two lines of about 26 characters. The hook text sits at
the top in the first 3 seconds; list items and steps get a numbered label each; the call to
action sits over the last beat. Add text only where the muted viewer needs it, never on the
bottom row. A cue in brackets (`[B-ROLL]`, `[CLIP]`, `[COUNTER]`...) on its own line marks what
the edit adds; only cues Creatorline can make ([deliverable](references/deliverable.md),
sections 3 and 4).

### Our edge

The avatar is the same face and voice in every video. A series of scripts can share a fixed
opening shape and an original sign-off, so the avatar becomes a creator people recognize. Say
so when the person asks for more than one script.

## Check before you show it

1. **Routing:** exactly one genre whose whole gate holds (or one scene format), the one it beat
   named in the defaults line; no blend.
2. **Facts:** no invented real-world event, statistic, quote, or real person's words or inner
   thoughts; every real-world fact sourced in your notes; anything unchecked tagged `[VERIFY]`
   under the script.
3. **Proof:** the genre's proof is there: a demo on camera, the person's own or a marked blank,
   a supplied artifact or footage, or named sources.
4. **Loops:** one loop, paid; every deferral and promise paid; no false callback.
5. **Runtime:** the words fit the length at the genre's pace; beat times start at 0, never
   overlap, add up exactly; every beat 3 seconds or more when the avatar films it; over 30 s on
   camera, parts of 12 to 25 s broken after a full sentence.
6. **Monetization:** no invented sponsor, plug or affiliate line; a requested one sits outside
   any test, reveal or rising sequence.
7. **The genre's "Never" list** ([genres](references/genres.md)) and, for true crime, its
   ethics, all kept.
8. **Hooks:** three, each a different type, each paid by the same body or with the beat that
   changes named.
9. **On-screen texts** short enough to read in their beat, never the line word for word; the
   hook text works muted.
10. **Safety** (house rules, section 7), and any approved list or never-say words;
    none of the brand's `donts`; no other brand, real creator or unrecorded real person; no
    warm-up opener, no em dash, the right language.
11. **The retention map** lists only devices in the script, with times; no grades.
12. **The caption's** first line works alone; caption and hashtags fit every platform it goes to.

## If it goes wrong

| The person says | Change |
|---|---|
| "Too long", "too much talking" | Cut adjectives, then a beat; or offer the next length up |
| "Sounds like an ad" | Swap slogans for spoken lines and one concrete moment, show instead of claim, add one restart or half-laugh |
| "That is not how we talk" | Reread `brand_voice` and the avatar's `tone`; copy the rhythm of a past caption (`list_posts`); ask for one line they like |
| "The hook is weak" | A hook of another type; a sharper number or a named thing; the strongest line moved to 0 s |
| "Add a review from a customer" | A real customer's review is one the brand supplies and may use, quoted as theirs, shown as an image or Video Studio text |
| "Make it sound like <a famous creator>" | Their markers stay theirs: take the energy and the pace, and invent the brand's own opener and sign-off |
| "Add our sponsor" or "plug the product" in a story or an explainer | After the payoff, never inside the reveal or the test ([router](references/router.md), section 8) |
| "Make it 30 seconds" | Recut with the genre's map at the new length; keep the hook and the payoff |
| "Translate it" | Lines, texts and caption in the new language, then count again: the same sentence often runs longer in another language, so trim |
| "More hooks" | Hooks only mode; offer a hook test once a video exists (`creatorline-ad-variations`) |

## Show the result

Use the layout in [the deliverable](references/deliverable.md), section 1: a title line with the
genre and lane, the defaults line, the hooks, the beats, the caption, the retention map, the
items to check, then "What next?". Keep the prose around it to one line. Never paste tool
output, ids or word counts unless asked (except in "check my script", where the count is the
point).

## Next steps to offer

Offer 2 or 3, one line each. Filming it comes first, with the skill its genre and speaker fit:

| The script | Offer | Skill |
|---|---|---|
| Avatar on camera, up to 30 s | "Film it with Mia" | `creatorline-talking-video` (or the format's own skill) |
| Avatar on camera, 45 or 60 s | "Film it as an episode with Mia" | `creatorline-ai-host` |
| Narrator over pictures (stories, cases, explainers) | "Make it as a narrated video" | `creatorline-faceless-video` |
| A voice track for footage they have | "Record it in Mia's voice" | `creatorline-voiceover` |
| New lines over a trending video's structure | "Reshoot the trend with these lines" | `creatorline-reshoot` |
| The person films it | "Once it is in your Creatorline library, I can caption it and make a cover" | `creatorline-captions`, `creatorline-cover-image` |

Then one or two of: more hooks to test, another length, a cover, the caption into a post
(`creatorline-publish`), a week of scripts like it (`creatorline-content-calendar`).

When the person says yes to filming, follow that skill from its intake on, carrying the script
as [the deliverable](references/deliverable.md), section 10 says. Resolve every `[VERIFY]` item
first. That skill shows the price and waits for a yes; never start a paid run from here.

## References

- [Router](references/router.md): two families, the five fields, the six gates, title-promise
  verbs, genre intake, proof by speaker, the facts and monetization policies, creators'
  markers, being called by another skill.
- [Genres](references/genres.md): the short-form rules, pace by genre, the six genres with
  their lanes, maps for 15, 30 and 60 seconds, register and "Never" lists, the UGC scene
  formats, the story check.
- [Hooks](references/hooks.md): the three layers, the hook types of every genre, the seven
  families for scene formats, the rules, writing the options, hooks only.
- [The deliverable](references/deliverable.md): the layout, beats, production cues, on-screen
  text, caption, the retention map, other speakers, parts over 30 seconds, checking a script,
  the hand-off to filming, a worked example.
- [Long-form maps](references/long-form.md): only for a plain-text script over 4 minutes.
- [House rules](references/house-rules.md), [asking](references/asking.md),
  [video briefs](references/video-briefs.md): shared.
