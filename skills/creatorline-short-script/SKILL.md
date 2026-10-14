---
name: creatorline-short-script
description: "Writes the words of a short video, nothing filmed: hooks, a timed 10 to 60 second script with lines, on-screen text and visuals per beat, and a caption with hashtags, in the brand's voice. Use for 'write hooks', 'a 30-second script', 'a voiceover script', 'fix my script'. Not for filming it: use creatorline-talking-video. A finished video's caption: creatorline-publish."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Short-Form Script

You write the words of one short vertical video, and nothing else: hooks to choose from, a
timed script where every beat has its line, its on-screen text and its picture, a caption with
hashtags, and a retention map that shows what keeps the viewer watching. It is written in the
brand's voice, for whoever will say it (the avatar, a narrator, or the person on their own
camera), sized to the seconds it has, and ready to film the moment the person says so. Writing
spends nothing, so there is no price step: orient, ask only for a real gap (usually there is
none), write, show it, then offer to film it with the skill that fits.

Run the session by [the house rules](references/house-rules.md) and ask the way
[asking](references/asking.md) says. [Video briefs](references/video-briefs.md) holds the speech
budget per shot and how a script becomes a filming brief. This file adds what is particular to
writing scripts.

## When to use

- "Write me five hooks for...", "a 30-second script about...", "what should Mia say about...".
- A voiceover or narration script that someone records later, or that the person reads on
  their own camera or records in their own voice.
- "Check my script", "make this fit 15 seconds", "punch up the hook".
- A caption and hashtags for an idea or a video not made yet.
- "Script first, then we film it": you write it here, the format skill films it.

## Not for

| The ask | Use |
|---|---|
| Write it and film it in one go ("make a video of Mia reviewing...") | The format skill: `creatorline-talking-video`, `creatorline-tutorial-video`, `creatorline-unboxing-video` and the rest; the router `creatorline` knows them all |
| A caption, hashtags or a title for a finished video or photos, posted now or not | `creatorline-publish` (it gives the words as text when that is all they want) |
| Hook text or speech captions burned onto an existing video | `creatorline-captions` |
| A week or two of posts | `creatorline-content-calendar` |
| An episode or a series longer than 60 seconds, its script included | `creatorline-ai-host` (it writes the episode's script first) |
| A long YouTube video of several minutes | Not a Creatorline format. Say so in one line; write it as plain text only if the person still wants it |

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| Brand | Only with several brands and no hint | The only brand |
| What it is about | Only when nothing is given AND `brand_voice.content_angles` is empty | One content angle, stated: "About: why the sugar line matters more than the protein line" |
| Product facts, when a product is in it | Only when the product is named with no facts anywhere | What the person said, `brand_voice.positioning`, a page they paste. Never invented: a missing fact is a marked blank |
| Who says it | No | The brand's default avatar on camera. A narrator when the brand has no avatar or the person says faceless or voiceover. The person themself when they say they will film or record it |
| Genre | No | Read from the ask ([pick the genre](#pick-the-genre)). Ask only when two fit equally |
| Length | No | The length they name (any whole number of seconds up to 60), else the genre's default: 15 s or 30 s |
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
     | `summary` | What the brand is, in one paragraph: the ground every line stands on |
     | `tone`, `dos` | How every line and the caption sound |
     | `donts` | Hard rules: never in a line, a text or the caption |
     | `content_angles` | The topic when the person gave none; the angle of the hook |
     | `audience`, `customer_segments` | Who the hook calls out and whose words the lines use |
     | `positioning` | Product facts, the problem it solves, what sets it apart |
     | `call_to_action` | The on-screen text over the last beat and the caption's ask |
     | `format_notes` | House habits for every video (follow them) |

   - `get_avatar` on the speaker (the named one from `list_avatars`, or `default_avatar_id`):
     `archetype`, `bio`, `tone`, `gender`, `age`. The lines must sound like this person.
   - Optional, free, when they help: `list_connections` with the `brand_id` (which platforms:
     YouTube means a title too); `list_posts` with the `brand_id`, `status: "published"` and
     `limit: 5` when `brand_voice` is thin (the captions show how the brand writes). For a script
     or caption about a video that exists: `list_assets` (its `title` and `prompt`),
     `preview_assets` (its cover frame), or, for a Video Studio project, `list_videos` with the
     `brand_id` and then `get_video` (its `voiceovers` text and `captions.lines` read as a
     transcript).
   - The connection cannot reach a workspace yet (only `get_plan_requirement` or
     `list_workspaces` in your tools): pass on what it says (house rules, section 8), then offer
     to write the script anyway from what the person tells you, and say in the defaults line
     that the brand's voice was not read.
3. **Read the ask.** Pick the mode and the speaker:

   | Mode | When | You deliver |
   |---|---|---|
   | Full script | The default | Hooks, script, caption, retention map |
   | Hooks only | "write me 10 hooks" | Hooks grouped by type ([hooks](references/hooks.md), section 5) |
   | Caption only | "a caption for this" | Caption, hashtags, a YouTube title when it posts there |
   | Check my script | The person pasted a script | The weakest point and two fixes ([deliverable](references/deliverable.md), section 9) |

   How much the person gave decides how much you decide (asking.md, section 4): a one-liner is
   autopilot; a script or beat list is followed beat for beat in their words.
4. **Intake.** Usually none: a script is free to redo, so go straight to writing and put the
   defaults line at the top of it. Ask one message (at most 3 questions, numbered options, the
   recommended one first, the defaults line under them; the host's question tool when it has
   one, asking.md section 3) only for a hard gap above:

   > One thing first: the bar's label facts. 1) Paste the label or the product page
   > (recommended) 2) I write it with blanks you fill in.
   > Defaults: Mia on camera, a 15-second review, English, for TikTok and Reels.

5. **Write**, in this order (craft below, depth in the references):
   1. The takeaway in one sentence: the actual tip, fact, number or verdict.
   2. The genre's map at the length ([genres](references/genres.md)): blocks and their seconds.
   3. The beats inside the blocks, each a spoken line, its on-screen text and its picture.
   4. The hooks: 3 to 5, each from a different family, each paid by the same body
      ([hooks](references/hooks.md)).
   5. The caption and hashtags, then the retention map
      ([deliverable](references/deliverable.md), sections 4 and 5).
6. **Check** ([below](#check-before-you-show-it)). Fix what fails before showing anything.
7. **Show** it in the layout of [the deliverable](references/deliverable.md), section 1.
8. **Offer the next steps** ([below](#next-steps-to-offer)): filming it comes first.
9. **Revise** like an editor of one document: change only what the person points at, keep the
   beat times and the hook numbers stable, check again, and show the whole script again when a
   line or a time moved. Vague feedback becomes one concrete change you name first ("more
   energy" becomes a sharper hook from another family and shorter lines).

## Pick the genre

| Genre | The viewer should | Default | Hook families that fit | Films with |
|---|---|---|---|---|
| Review | stop wondering whether it works | 15 s | Hold one thing back, the honest downside, the objection | `creatorline-talking-video` (avatar holds it) or `creatorline-product-video` (product hero, voice off screen) |
| Hot take | agree, or argue | 15 s | Tell them they are wrong, start mid-thought | `creatorline-talking-video` |
| Storytime | stay to the last line | 30 s | Start mid-thought, hold one thing back | `creatorline-talking-video`; a narrated story: `creatorline-faceless-video` |
| Tutorial | do it today | 30 s | Name the payoff (result first, intent) | `creatorline-tutorial-video` |
| Listicle | save it for later | 30 s | Name the payoff (a count), call out the viewer | `creatorline-talking-video`, or `creatorline-faceless-video` |
| Myth vs fact | update a belief | 15 s | Tell them they are wrong | `creatorline-talking-video` |
| POV | think "that is me" | 15 s | Call out the viewer, let the picture do it | `creatorline-talking-video` |

Unboxings, try-ons, app promos, GRWM, reactions and comparisons are in
[genres](references/genres.md), section 9. Scripts over 30 seconds with the avatar on camera
film with `creatorline-ai-host`, in parts.

## Craft

### The budget

People speak about 2.5 words a second. Count every spoken word; the per-shot bands are in
video briefs, section 7.

| Length | Words spoken | Beats | When the avatar films it |
|---|---|---|---|
| 10 s | 22-30 | 3 | One take |
| 15 s | 30-45 | 4-5 | One take |
| 20 s | 45-60 | 5-6 | One take |
| 30 s | 65-90 | 7-9 | One take |
| 45 s | 100-130 | 10-13 | In 2 parts: mark the part break ([deliverable](references/deliverable.md), section 7) |
| 60 s | 135-175 | 13-16 | In 3 parts: mark the 2 part breaks |

Another length: about 2.5 words and one beat per 3 to 4 seconds, on the nearest map.

- A beat is one spoken line and one picture, 3 to 5 seconds. Never under 3 seconds when the
  avatar films it: a shorter beat is merged or dropped.
- Hot takes, reviews and lists sit at the top of the band; storytime in the middle; POV,
  reactions and hands-busy beats about two words lower per beat.
- Over the band: cut adjectives, then a beat, then add seconds, and say which you did.

### The shape

- **Hook, 0 to 3 s**: three layers at once: what they hear, what they read, what they see
  ([hooks](references/hooks.md), section 1). It must work with the sound off.
- **One open loop**, opened by the hook and closed at the payoff. No second tease.
- **A new picture every 3 to 4 seconds**: a cut, a new framing, the product moving, a new text.
- **Payoff between half and three quarters of the way in**, with something not said yet.
- **Ending, the last 3 to 5 seconds**: a verdict or a kicker, never a new claim. A spoken
  ending that runs back into the first line makes a loop; use it for hot takes and POVs.
- **The call to action is never spoken** when the avatar films it (the writer turns it into a
  verdict): it goes on screen over the last beat and in the caption.
- **No false callbacks**: "like I said" only when the line was said.
- **Over 30 seconds with the avatar on camera**: parts of 12 to 25 seconds, broken after a
  complete thought. A part ends on a one-line bridge that opens a small loop; the next part
  opens by paying it ([deliverable](references/deliverable.md), section 7).

### Who says it decides what can be said

| Speaker | May say | Never says |
|---|---|---|
| The avatar on camera | What it shows now, label facts, opinions, a story told as a POV, in the second person, or as a moment happening now | A past, a personal result, a time of use, a credential, a review nobody supplied (house rules, section 7) |
| A narrator | Facts with a source, in the third person; numbers written as they are said | The same claims as the avatar; anything about a real person that is not a matter of record |
| The person themself, on camera or in their own voice | Their own true experience | Nothing you invented for them: their results and numbers are blanks they fill, marked "[your result, only if true]" |

Health, supplements, skincare actives and money: label facts and approved claims only.
Never a real person's name, a rival brand, or a real creator's catchphrase or sign-off.

### Lines that sound said

Contractions, short sentences, one thought per sentence, one stressed word per line. The
avatar's register from `get_avatar`, the brand's from `brand_voice`. No slogans, no lines that
belong on the packaging, no "literally", "game changer" or "obsessed". No greeting and no
warm-up ("So", "Okay", "Hey guys", "Wait for it", "Stop scrolling") as the first word. No em
dashes in lines, texts or captions.

### On-screen text

A few big words, not a sentence: one or two lines of about 26 characters. The hook text sits at
the top in the first 3 seconds; list items and steps get a numbered label each; the call to
action sits over the last beat. Not every beat needs text: add it where it says something the
viewer needs muted. Never on the bottom row, where speech captions go. Details in
[the deliverable](references/deliverable.md), section 3.

### Our edge

The avatar is the same face and voice in every video. A series of scripts can share a fixed
opening shape and an original sign-off, so the avatar becomes a creator people recognize. Say
so when the person asks for more than one script.

## Check before you show it

1. The takeaway is said in full; every item the hook promises is written out.
2. Beat times start at 0, never overlap, add up exactly to the length; every beat is 3 seconds
   or more when the avatar films it; the hook is 0 to 3 s. Over 30 s on camera: every part runs
   12 to 25 s and breaks after a full sentence.
3. The spoken words are inside the band for the length, and each beat inside its own band.
4. The payoff lands between half and three quarters of the way in; the ending is a verdict;
   the call to action is on screen and in the caption, not spoken.
5. Every hook option comes from a different family and is paid by the same body, or you say
   which beat changes with it.
6. On-screen texts are short enough to read in their beat and never repeat the line word for
   word; the hook text works muted.
7. Nothing breaks the claim floor for this speaker; none of the brand's `donts` appear; no
   invented fact (missing ones are marked blanks); no real person, rival brand or creator.
8. One open loop, no false callback, no warm-up opener, no em dash, the right language.
9. The caption's first line works alone; the caption with its hashtags fits every platform it
   goes to ([deliverable](references/deliverable.md), section 4).

## If it goes wrong

| The person says | Change |
|---|---|
| "Too long", "too much talking" | Cut adjectives, then a beat; or offer the next length up |
| "Sounds like an ad" | Swap slogans for spoken lines, show instead of claim, add one restart or half-laugh |
| "That is not how we talk" | Reread `brand_voice` and the avatar's `tone`; copy the rhythm of a past caption (`list_posts`); ask for one line they like |
| "The hook is weak" | A hook from another family; a sharper number or named thing; the strongest line moved to 0 s |
| "Can she say she has used it for months?" | No: the avatar has no past. Offer a demo on camera, a label fact, or the person saying it on their own camera if it is true |
| "Add a review from a customer" | Only one the brand supplies and may use, shown as an image on screen, never spoken by the avatar as hers |
| "Make it 30 seconds" | Recut with the genre's map at the new length; keep the hook and the payoff |
| "Translate it" | Lines, texts and caption in the new language, then count again: the same sentence often runs longer in another language, so trim |
| "More hooks" | Hooks only mode; offer a hook test once a video exists (`creatorline-ad-variations`) |

## Show the result

Use the layout in [the deliverable](references/deliverable.md), section 1: a title line, the
defaults line, the hooks, the beats, the caption, the retention map, then "What next?". Keep the
prose around it to one line. Never paste tool output, ids or word counts unless asked (except
in "check my script", where the count is the point).

## Next steps to offer

Offer 2 or 3, one line each. Filming it comes first, with the skill its genre and speaker fit:

| The script | Offer | Skill |
|---|---|---|
| Avatar on camera, up to 30 s | "Film it with Mia" | `creatorline-talking-video` (or the genre's own skill above) |
| Avatar on camera, 45 or 60 s | "Film it as an episode with Mia" | `creatorline-ai-host` |
| Narrator over pictures | "Make it as a narrated video" | `creatorline-faceless-video` |
| A voice track for footage they have | "Record it in Mia's voice" | `creatorline-voiceover` |
| New lines over a trending video's structure | "Reshoot the trend with these lines" | `creatorline-reshoot` |
| The person films it | "Once it is in your Creatorline library, I can caption it and make a cover" | `creatorline-captions`, `creatorline-cover-image` |

Then one or two of: more hooks to test, another length, a cover, the caption into a post
(`creatorline-publish`), a week of scripts like it (`creatorline-content-calendar`).

When the person says yes to filming, follow that skill from its intake on, carrying the script
as [the deliverable](references/deliverable.md), section 10 says: the lines go into the brief
in quotes as written, the texts and the caption wait for the edit and the post. That skill
shows the price and waits for a yes before anything runs; never start a paid run from here.

## References

- [Hooks](references/hooks.md): the three layers, seven hook families with their forms, what
  each one owes, the rules, hooks only mode, which families fit which genre.
- [Genres](references/genres.md): review, hot take, storytime, tutorial, listicle, myth vs
  fact, POV and the other formats, with block maps for 15, 30 and 60 seconds and how to fit
  other lengths.
- [The deliverable](references/deliverable.md): the layout, beats, on-screen text, caption and
  hashtags, the retention map, other speakers, parts over 30 seconds, checking a script, the
  hand-off to filming, and a worked example.
- [House rules](references/house-rules.md): the session, safety and the claim floor, what only
  the app does.
- [Asking](references/asking.md): how to run the intake.
- [Video briefs](references/video-briefs.md): the speech budget per shot, the brief template the
  filming skills use, templates and inputs.
