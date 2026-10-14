# The deliverable

What the person gets, part by part, and how each part is written: the layout, the beats, the
on-screen text, the caption and hashtags, the retention map, scripts for other speakers, parts
over 30 seconds, checking a script the person wrote, and the hand-off to filming.

## Contents

1. [The layout](#1-the-layout)
2. [Beats](#2-beats)
3. [On-screen text](#3-on-screen-text)
4. [The caption and hashtags](#4-the-caption-and-hashtags)
5. [The retention map](#5-the-retention-map)
6. [Other speakers](#6-other-speakers)
7. [Over 30 seconds](#7-over-30-seconds)
8. [Hooks only, caption only](#8-hooks-only-caption-only)
9. [Checking the person's script](#9-checking-the-persons-script)
10. [Handing it to filming](#10-handing-it-to-filming)
11. [A worked example](#11-a-worked-example)

## 1. The layout

One message, in this order. Write it in the person's language around the script; the lines,
texts and caption are in the brand's `language` unless the person asked for another.

```
**<Working title>**: <length> <genre> · <who says it> · <language>
Defaults: <what you decided that they can change, one line>

**Hooks** (the script opens with 1)
1. <Form> (recommended, <reason in a few words>)
   Says: "<line>"
   On screen: <text>
   First frame: <what we see>
2. <Form>
   Says: "<line>"
   On screen: <text>
3. ...

**Script**

**0-3 s · Hook**
Says: "<line>"
On screen: <text>
We see: <one picture>

**3-7 s · <block name>**
...

**Part 2** (only over 30 s with the avatar on camera, section 7)

**<n-m> s · <block name>**
...

**Caption**
<first line>
<one to three short lines>
<the ask>
#tag #tag #tag

**Retention map** (what keeps them watching)
| Time | What holds them |
|---|---|
| ... | ... |

What next?
1. <film it, in plain words: "Film it with Mia (I'll show the credits first)">
2. <next step>
3. <next step>
```

- No preamble before it and no summary after it; one line at most.
- No ids, no tool or skill names, no word counts (except when checking the person's script).
- The person may copy any part, so every part reads on its own.

## 2. Beats

- **Times** are whole seconds, start at 0, follow on with no gaps or overlaps, and add up
  exactly to the length. The hook is always 0-3 s.
- **A beat is 3 to 5 seconds** when the avatar films it; a longer block holds several beats.
- **Says:** the exact words in quotes, said aloud as written. Two speakers: a label per line
  ([section 6](#6-other-speakers)). No stage directions inside the quotes.
- **On screen:** the words, or "nothing" ([section 3](#3-on-screen-text)).
- **We see:** one picture in plain words: who, the one action, what is in frame. One main
  action per beat. The product is in frame from the beat's first second, label to the lens.
  No camera words (dolly, drone, slow motion, studio light) unless the person asked for a
  polished film: the default look is a phone in a real room. No split screen or text in this
  line: those are edits.
- Each block's name comes from the genre's map ([genres](genres.md)), so the person sees the
  shape: Hook, What it is, Payoff, Verdict.

## 3. On-screen text

Text is for the viewer with the sound off, and for the eye while the ear listens.

- **Size:** one or two lines of about 26 characters each. A few big words, never a sentence.
- **Where:** the hook text at the top in the first 3 seconds; labels for steps, items, "Myth"
  and "Fact" at the top or the middle; the call to action over the last beat. Never the bottom
  row: speech captions sit there (or in the middle when the video has a split screen).
- **How long:** its whole beat, and never under 2 seconds.
- **What:** something the viewer needs muted (the promise, the number, the step), not the
  spoken line word for word: captions do that.
- **Matching:** texts of one kind (all step labels, all item numbers) share one look and size.
- **Numbers as digits** on screen ("4 g sugar"), even when they are said as words.
- **Exact words come from the edit**, never from the filming brief: the texts are added in Video
  Studio after the take, where they are sharp and editable.
- Plain characters, the brand's language, no em dashes.

## 4. The caption and hashtags

**The shape:** a first line, one to three short lines, the ask, then the hashtags.

- **First line:** a second hook that adds something the video did not say. It shows before the
  "more" cut, so it works alone. Never the spoken hook word for word.
- **Body:** the takeaway in the words someone would search for: what it is, the problem it
  solves, the place or the routine. Product facts from the label or the approved list only.
- **The ask:** `brand_voice.call_to_action` when the brand has one. Otherwise one that fits the
  video: save it for later, the link in bio, the next part of a series. A question with a real
  answer is welcome ("Which one do you grab?"); "comment yes" is not.
- **Hashtags:** 3 to 5. One or two about the exact topic, one for the niche, the brand's own tag
  when its past captions use one. Nothing unrelated to the video. Shown to the person with `#`;
  passed to `create_post` later as bare words in `hashtags`.
- **Length,** hashtags included: TikTok and Instagram 2,200 characters, YouTube 5,000, Telegram
  1,024. A good short-form caption is far shorter.
- **YouTube:** when the brand posts there (`list_connections`), add a title: the hook as a plain
  statement, short. The publish skill puts it in the post's YouTube settings.
- **Voice:** the brand's tone, do's and don'ts. Emojis only when the brand's past captions use
  them. No em dashes.
- **Honesty:** the same claim floor as the lines. An avatar's caption never says "my honest
  review" and never reads as a real customer. AI disclosure is the post's `made_with_ai`
  setting, which the publish skill sets; it is not words in the caption.

## 5. The retention map

A short table of the devices the script really uses, with their times. It shows the person why
the script holds attention, so they can judge it and keep it when they edit.

| Device | What it is | Where it sits |
|---|---|---|
| Open loop | The hook's gap or question | Opens at 0 s, closes at the payoff |
| New picture | A cut, a new framing, the product moving, a new text | Every 3 to 4 seconds |
| Counter | "2 of 3", step and item numbers on screen | Each item or step |
| Turn | The "but", the fact, the twist | Half to three quarters of the way in |
| Held reveal | The named thing shown late | At the payoff |
| Callback | A late line returns to the hook's words | The ending |
| Loop | The last line runs into the first | The last second |
| Re-hook | A small new question | About 30 s into a 60-second script; the start of each part |

- Three to five rows for 15 and 30 seconds, up to seven for 60.
- Only devices that are in the script, each with its time. No scores, no grades, no
  predictions ("this will go viral").

## 6. Other speakers

**A narrator** (no face on camera, or a voice track for footage):

- One flowing sentence beats three clipped ones: a synthetic voice pauses at every full stop.
- Numbers written as they are said ("four grams", "twenty twenty-six").
- Feelings are marked only where they change, with the tags the Video Studio voiceover reads:
  `[excited]`, `[cheerfully]`, `[laughs]`, `[whispers]`, `[curious]`, `[sad]`, `[sighs]`,
  `[pauses]`. A performed tag (a laugh, a sigh, a pause) takes about a second: count it.
- The whole narration stays under 2,000 characters (one voiceover holds that much).
- "We see" becomes the picture list: one photo or clip per beat, changing every 3 to 4
  seconds. Say where each comes from when you know: the brand's library, a new photo, a ready
  hook clip for the opener.

**The person themself, on their own camera or recording their own voice:**

- Write it the way they talk. If you cannot tell, ask for one sentence they would say.
- Their own experience is theirs to tell, but never written for them: put
  "[your result, only if true]" where their number or story goes.
- Delivery cues in parentheses, sparingly: (to the lens), (hold it up), (pause).
- No part breaks; they film however they like.

**Two speakers:**

- On camera (a podcast clip, a street interview): label every line with the speaker's role,
  "Host:" and "Guest:", one speaker per beat. A second avatar for the other person is the
  filming skill's job.
- Voice only (a two-voice dialogue): label the lines "A:" and "B:", one turn per line.

## 7. Over 30 seconds

- With the avatar on camera, these scripts film with `creatorline-ai-host`: parts of 12 to 25
  seconds, one take each, in one set, joined in Video Studio. A cut at a complete thought
  keeps every join clean, and a flawed part is filmed again on its own.
- Mark each break as its own line, **Part 2**, **Part 3**, between two beats: one break in a
  45-second script, two in a 60-second one ([genres](genres.md), section 1). Never split a
  sentence.
- The last line before a break is a one-line bridge that opens a small loop ("And the second
  one is worse."). The first line after it pays that loop ("The second one:").
- Same place, same look across the parts: the parts are one continuous video, not scenes.
- A narrator's script or the person's own has no breaks.

## 8. Hooks only, caption only

- **Hooks only:** the layout's title line, then the hooks grouped by family as
  [hooks](hooks.md), section 5 says, the three to test first marked, then "What next?" (a
  script for the winner first).
- **Caption only:** the caption in its shape ([section 4](#4-the-caption-and-hashtags)), two
  other first lines to choose from, a YouTube title when the brand posts there, then "What
  next?" (the post itself is `creatorline-publish`).

## 9. Checking the person's script

When the person pastes a script and asks for a check, a fit or a fix:

1. Time it: count the spoken words against the length (video briefs, section 7) and put each
   line on the seconds it would take.
2. Find the single weakest point, checking in this order: a claim-floor problem; no hook in
   the first 3 seconds; a hook the body never pays; over or under the budget; no concrete
   takeaway; a spoken call to action as the ending; a beat that adds nothing; for a story, the
   story check ([genres](genres.md), section 10).
3. Show:

```
**What works:** <one line>
**Weakest point:** <one line; with the count when it is the budget: "62 words for 15 s, about 20 over">
**Fix 1, smallest change:** <their script with only that point changed>
**Fix 2, rewritten:** <your version, as beats in the script layout of section 1>
```

- Never one big rewrite they did not ask for: Fix 1 keeps their words.
- A claim-floor problem is fixed in both versions, with the reason in one line.
- Their beat order and words stay unless a rule breaks; say what changed and why.

## 10. Handing it to filming

When the person says "film it", follow the filming skill and carry the script into it:

| Part of the script | Where it goes |
|---|---|
| The spoken lines | The filming brief, in quotes, in order, with "use these lines as written" (video briefs, sections 2 and 3). The filming skill counts them again against its length |
| The beat times | Not sent: the server's writer times the shots itself (video briefs, section 1) |
| The length | The filming run's `duration`, in whole seconds |
| The part breaks | `creatorline-ai-host` films one part per break |
| Who says it | The avatar the filming skill uses (`avatar_id`), or a narrator's voice |
| "We see" | The brief's Idea and Setting lines, in plain words |
| The genre | The filming skill's template; "Filmed as" in [genres](genres.md) is the likely one |
| The on-screen texts | The edit after the take (`creatorline-video-studio`, or the format skill's own text step) |
| Speech captions | `creatorline-captions` |
| Narration | `creatorline-faceless-video`, or `creatorline-voiceover` for footage they have |
| New lines over a trending video | `creatorline-reshoot`: the new words go in quotes in its Direction |
| The caption, hashtags, YouTube title | `creatorline-publish`, once the video is made |

The filming skill runs its own intake (a product photo, for example) and shows the credits
before anything runs. Never start a paid run from this skill.

## 11. A worked example

The person: "Write a 15 second TikTok script for our Peanut Crunch bar. Label says 20 g protein,
4 g sugar." The brand's default avatar is Mia; `brand_voice.tone` is "friendly, matter of fact";
its call to action is "Link in bio".

```
**Peanut Crunch, the number that matters**: 15 s review · Mia on camera · English
Defaults: for TikTok and Reels, lines in your brand's voice. Say if you want any changed.

**Hooks** (the script opens with 1)
1. One missing piece (recommended, the label is the proof)
   Says: "One number here matters more than the protein."
   On screen: Not the protein
   First frame: Mia holds the bar to the lens, front of the wrapper showing.
2. The objection first
   Says: "You'll ask if low sugar means no crunch."
   On screen: Low sugar, still crunchy?
3. The situation
   Says: "Grabbing a bar between meetings? Flip it over first."
   On screen: Flip it over first

**Script**

**0-3 s · Hook**
Says: "One number here matters more than the protein."
On screen: Not the protein
We see: Mia holds the bar up, the front of the wrapper to the lens.

**3-7 s · What it is**
Says: "Everyone reads the front. Twenty grams of protein, sure. Now flip it."
On screen: 20 g protein
We see: She turns the bar from front to back.

**7-11 s · Payoff**
Says: "Four grams of sugar. That's the one to check."
On screen: 4 g sugar
We see: Her finger on the sugar line, label to the lens.

**11-15 s · Verdict**
Says: "And it still crunches. Yeah. This one's a keeper."
On screen: Peanut Crunch, link in bio
We see: She snaps the bar in half, the peanut pieces to the lens, a small nod.

**Caption**
The front says 20 g protein. Flip it over for the number that matters.
Peanut Crunch: 20 g protein, 4 g sugar.
Link in bio.
#proteinbar #highprotein #snackideas #peanutbutter

**Retention map** (what keeps them watching)
| Time | What holds them |
|---|---|
| 0 s | Open question: which number? Answered at 7 s |
| 3 s | The flip, front to back: a new picture |
| 7 s | Payoff: the sugar line on the label |
| 11 s | The snap: a second reveal, the inside of the bar |

What next?
1. Film it with Mia as a 15-second talking video (I'll show the credits first)
2. Two more hooks from other families, to test later
3. A 30-second version with the honest downside
```

**Why it works:** 38 spoken words for 15 seconds, each beat inside its band with the bar in
hand. The gap opens at 0 s and closes in the payoff beat, 7-11 s. Every claim is on the
label, shown on camera, or an opinion said now; nothing claims a past. All three hooks lead
into the same second beat, and hook 2 is paid by the snap at 11 s. The call to action is on
screen and in the caption, not spoken.
