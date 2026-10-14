# Talking video formats

Each format the talking video covers, mapped to the `ugc_style` value the server's writer
follows. A named template is followed hard, so the right pick matters more than any wording in
the brief. Every example carries its full lines: you write them, count them against the band
(monologue-craft.md, section 6) and show them with the price.

## Contents

1. [Pick the format](#1-pick-the-format)
2. [Story mode with a product](#2-story-mode-with-a-product)
3. [Review, testimonial or demo](#3-review-testimonial-or-demo-product-ad)
4. [Hot take](#4-hot-take-talking-head)
5. [Storytime](#5-storytime-storytime)
6. [Tips](#6-tips-talking-head)
7. [GRWM chat](#7-grwm-chat-grwm)
8. [Reaction](#8-reaction-reaction)
9. [Street interview](#9-street-interview-street-interview)
10. [Podcast clip](#10-podcast-clip-podcast-clip)
11. [Day in the life](#11-day-in-the-life-day-in-the-life)
12. [Before and after](#12-before-and-after-before--after)
13. [When none fits](#13-when-none-fits)

## 1. Pick the format

The length is asked in the intake as 10 s, 15 s or 30 s; the "Recommended" column is the one you
mark. Shots follow the length: 10 s is 3 shots, 15 s is 4, 30 s is 8 in two sections
(story-mode.md, section 6).

| The person says | Format | `ugc_style` | Recommended | Words | Voice step |
|---|---|---|---|---|---|
| A video with the product, "UGC", no format named | Story mode | By shape (story-mode.md) | 15 s | Action-led | Yes |
| "review", "testimonial", "my honest take", "I've been using it for a month", "demo", "show how it works" | Review, testimonial or demo | `Product ad` (`Talking head` for a testimonial) | 15 s | Action-led (talk-led for a testimonial) | Yes |
| "hot take", "opinion", "unpopular opinion", "advice", "rant" | Hot take | `Talking head` | 10 s | Talk-led | Yes |
| "storytime", "tell the story of", "what happened when" | Storytime | `Storytime` | 15 s (30 s for a longer story) | Talk-led | With care |
| "3 tips", "mistakes", "things I wish I knew" | Tips | `Talking head` | 15 s | Talk-led | Yes |
| "GRWM", "get ready with me", talking while doing makeup, hair or an outfit | GRWM chat | `GRWM` | 15 s | Action-led | Yes |
| "react to", "reaction", "her face when" | Reaction | `Reaction` | 10 s | Action-led | Yes |
| "street interview", "stopped on the street", "asked strangers" | Street interview | `Street interview` | 10 s | Talk-led | Only with the question as on-screen text |
| "podcast clip", "two people talking", "host and guest" | Podcast clip | `Podcast clip` | 15 s | Talk-led | No |
| "day in the life", "vlog", "my morning" | Day in the life | `Day in the life` | 15 s | Action-led | With care |
| "before and after", "transformation", "makeover" of a look or a space | Before and after | `Before & after` | 10 s | Action-led | With care |

- **Voice step "With care"**: these templates lean on music (Storytime drops the music before
  the punchline, Day in the life rides trending audio, Before and after hits a beat drop). Write
  `Sound: voice and room sound only`, and tell the person in one line that the avatar's own
  voice can come out distorted if the take carries music anyway; offer to skip it.
- **Two formats fit**: pick the one whose hook the person's idea already has.
- **Nothing fits**: `Auto` lets the writer infer it from a clear brief (section 13).
- **`Cinematic`** is a polished film with dramatic light and little speech, not phone-shot:
  only on request. **`Keyframes`** rebuilds a video from its frames: to copy a video, use
  `creatorline-reshoot`.

## 2. Story mode with a product

**What it is.** One scenario with stakes and one turn; the product comes in at about 40 to 60 %
and does its job. With a product and no format named, it is one of the two picks beside a
testimonial (story-mode.md, section 1). Shapes, beats and rules: story-mode.md.

```
Idea: GRWM with stakes. @Avatar1 is getting ready for a job interview in twenty minutes; the
serum is the one step she refuses to skip. Delivery: the friendly next-door type, a little
rushed.
Hook: she is already mid-reach for her blazer as she says the first line.
Lines: "Twenty minutes to my interview and I'm doing skincare. Hear me out. One step stays,
whatever happens. Two drops, fingertips, pressed in, not rubbed. Blazer on. Okay. Ready." Use
these lines as written.
Product: Glow C Serum (@Object1), glass dropper bottle that fits in one palm, about 9 cm tall,
the dropper screws off the top. It stays in the open cabinet until the middle of the clip.
Shots: arm's-length selfie at the bathroom door; phone propped on the sink, wider, as she
unscrews the dropper; propped close on the drops landing on her fingertips; selfie tight for the
last line, blazer on.
Setting: a bright modern bathroom, neutral daylight from a side window.
Ending: she walks off in motion, a half-smile back at the lens.
Language: English.
Sound: voice and room sound only.
```

28 words, action-led band for 15 s (28-35). "Okay" is fine here: it is not the clip's first
word.

## 3. Review, testimonial or demo (`Product ad`)

**What it is.** The avatar's own take on the product. A demo holds it to camera, shows the one
thing it does, and gives a verdict. A testimonial tells the avatar's own story with it: how it
found it, how long it has used it, what changed, a verdict. Pick one skeleton (story-mode.md,
section 4); two to four spoken lines; the first carries the most specific thing (a result, a
duration, a detail the camera sees).

| Time (15 s) | Beat |
|---|---|
| 0-3 s | Hook: the problem in one line, or the product already doing its thing. The product is in hand |
| 3-7 s | What it is and how it is used: label to camera, one fact from the label |
| 7-11 s | Proof: the one demonstration, on camera |
| 11-15 s | Verdict at chest-up, the product in frame, label forward |

**The brief carries** the product card (staging.md, section 10), the skeleton, the one
demonstration or the avatar's own result, a label fact when it helps, and where it is used.

A testimonial runs the same four beats as talk: the hook (the result or the doubt), the problem
and how it found the product, how long and what changed, the verdict with the product in hand.

**Inputs.** The product photo in `objects` (`@Object1`); a photo of the person's own space in
`location`.

**Pitfalls.** Vague praise ("it's amazing") sells nothing: "three weeks in, the redness on my
chin is gone" is the line. A two-handed demo is a propped shot. A big printed logo can garble
(product-intake.md, section 5).

```
Idea: @Avatar1 finishes her makeup at her vanity and shows the last step with a setting spray.
Skeleton: problem, agitate, solve.
Hook: the first mist is already in the air as she says the first line.
Lines: "Makeup gone by lunch, look at your last step. This is a setting spray: three mists
from arm's length, an X, then a T, and you let it dry. Last step, done." Use these lines as
written.
Product: Fix Mist setting spray (@Object1), frosted bottle that fits in one palm, about 12 cm
tall, press-down pump top, "matte finish" printed on the front.
Shots: phone propped on the vanity, medium, mid-spray; propped close on the label; selfie tight
for the verdict, the bottle in hand.
Setting: her vanity, neutral daylight from a window on the left.
Ending: a calm verdict, bottle in hand, label to camera.
Language: English.
Sound: voice and room sound only.
```

32 words.

```
Idea: a testimonial. @Avatar1 has used the serum every morning for a month and tells what
changed. Skeleton: testimonial.
Hook: she taps her cheek on the first word, the bottle already in her other hand.
Lines: "A month ago this whole cheek was red by noon. My sister kept leaving this on my sink, so
I caved. Two drops every morning since. Now? I forget to check." Use these lines as written.
Product: Glow C Serum (@Object1), glass dropper bottle that fits in one palm, about 9 cm tall,
the dropper screws off the top.
Shots: arm's-length selfie at the bathroom sink, mid-tap; propped on the sink, medium, two drops
onto her fingertips; selfie tight for the verdict, the bottle in hand, label forward.
Setting: a bright modern bathroom, neutral daylight from a side window.
Ending: a small shrug and a held look, the bottle at chest height.
Language: English.
Sound: voice and room sound only.
```

31 words, talk-led band for 15 s (30-45).

## 4. Hot take (`Talking head`)

**What it is.** One bold opinion, the reason, a button line. Straight to the lens.

| Time (10 s) | Beat |
|---|---|
| 0-3 s | The take, already mid-sentence, at full strength |
| 3-7 s | The reason, with one concrete example |
| 7-10 s | The button: a short verdict and a held look |

**The brief carries** the take, the reason and the one example. With no topic from the person,
take one from the brand's `content_angles` and state it in the plan.

**Pitfalls.** Naming a rival brand or a real person: write "the big-name tub", "most apps". A
take about health or money never promises a cure or a guaranteed return.

```
Idea: @Avatar1 tells you most skincare routines are longer than they need to be.
Hook: she points at the lens on the first word.
Lines: "Your skincare routine has three steps too many. Cleanser, moisturizer, sunscreen.
That's the routine. Everything after that is a hobby, and hobbies are optional." Use these lines
as written.
Setting: kitchen counter, coffee in hand, neutral morning daylight.
Ending: a shrug and a small smile, a held look.
```

24 words, talk-led band for 10 s (22-30).

## 5. Storytime (`Storytime`)

**What it is.** A short story told like a secret: a build-up, one "but then" turn, a payoff.

| Time (15 s) | Beat |
|---|---|
| 0-3 s | A tease of the ending, mid-thought |
| 3-6 s | The setup: where, who, what was wanted |
| 6-9 s | The build |
| 9-12 s | The turn |
| 12-15 s | The payoff, and the reaction held |

At 30 seconds the writer builds two sections, the second starting mid-thought.

**Pitfalls.** The story may be the avatar's own ("the week I...", truth-and-safety.md, section
4), a POV ("POV: you..."), or a moment unfolding right now. Never about a real, named person or
brand. A product may be in the story, and what it did for the avatar over time is welcome. The
template leans on music (voice step: with care).

```
Idea: @Avatar1 tells a POV story: you show up to a job interview a day early, and it works out.
Hook: she leans in, already mid-thought, as the first word lands.
Lines: "POV: you show up to your dream job interview exactly one day early. The lobby's empty.
You're about to leave. Then the manager walks past, coffee in hand, and says she's got twenty
minutes free right now. Best mistake you'll ever make." Use these lines as written.
Setting: in her car, parked, neutral daylight, phone on the dashboard.
Ending: a held half-smile, then she reaches for the door.
```

42 words, talk-led band for 15 s (30-45).

## 6. Tips (`Talking head`)

**What it is.** A count of concrete tips, each said in full.

| Time (15 s) | Beat |
|---|---|
| 0-3 s | The promise: the count and what they fix |
| 3-6 s | Tip one |
| 6-9 s | Tip two |
| 9-12 s | Tip three |
| 12-15 s | The verdict |

**Pitfalls.** Never ask the avatar to count on its fingers: "a small nod on each tip". More than
three tips need more seconds, or the list goes on screen as Video Studio text. A how-to in
labeled steps with a product is `creatorline-tutorial-video`.

```
Idea: @Avatar1 gives three phone camera settings that make food photos look better.
Hook: she lowers the phone from a photo she just took as the first line lands.
Lines: "Three settings, and your food photos stop looking flat. One: turn on the grid and put
the plate on a line. Two: tap the plate, then drag the brightness down a little. Three: shoot by
the window, never under the kitchen light. That's it." Use these lines as written.
Setting: a cafe table by a window, a plate of pasta in front of her, neutral daylight.
Ending: a confident verdict, phone lowered.
```

44 words.

## 7. GRWM chat (`GRWM`)

**What it is.** Talking to camera while getting ready: makeup, hair or an outfit, the routine
between the lines. The topic can be anything; with stakes it becomes story mode's GRWM shape.

| Time (15 s) | Beat |
|---|---|
| 0-3 s | Mid-routine, the topic dropped mid-sentence |
| 3-7 s | A routine step and a line |
| 7-11 s | The next step and the point |
| 11-15 s | The finished look and the verdict |

**Inputs.** Products in `objects`, one per step at most.

**Pitfalls.** Busy hands cost words: action-led band. One action per shot, a propped phone for
two hands. Show the step; a result over time is told, not shown. A fit check or an outfit
shown off is `creatorline-try-on-video`.

```
Idea: @Avatar1 does her morning makeup and says a short routine is all most people need. She
starts bare-faced.
Hook: she is already pressing in moisturizer as she says the first line.
Lines: "Three products. That's the whole face. Moisturizer first, pressed in, not rubbed. Then
cream blush, tapped high, right where you smile. Mascara, two coats. Done. Out the door." Use
these lines as written.
Products: moisturizer (@Object1) pressed in with the fingertips; cream blush (@Object2) tapped
onto the cheeks; mascara to finish.
Setting: her bathroom vanity, neutral daylight, phone propped on the counter.
Ending: the finished look, then she turns toward the door in motion.
Sound: voice and room sound only.
```

28 words.

## 8. Reaction (`Reaction`)

**What it is.** The avatar reacts to something off screen: a big face, a few words, a deadpan or
explosive button.

| Time (10 s) | Beat |
|---|---|
| 0-3 s | Already mid-reaction; the first line after a held beat (up to 0.7 s) |
| 3-10 s | One punch-in on the peak, then the button line |

**After the take.** Show what the avatar reacts to above or beside it in Video Studio (a split
screen or a layer, `creatorline-video-studio`), from a clip the person supplies.

**Pitfalls.** Never react to a review, a comment, a DM or a screenshot nobody supplied. Fewer
words, more face.

```
Idea: @Avatar1 watches a clip of someone putting ketchup on pasta (the person's clip, shown
beside her afterwards in Video Studio). Delivery: deadpan, then a crack.
Hook: already staring at the phone, a held beat of silence, then the first line.
Lines: "No. Absolutely not. Ketchup. On pasta. Pasta deserves better than this, and so do you."
Use these lines as written.
Setting: her couch, evening lamp light, phone held at arm's length.
Ending: a slow head shake and a flat look to the lens.
```

15 words, action-led band for 10 s (12-20).

## 9. Street interview (`Street interview`)

**What it is.** The avatar stopped in public with a mic in frame: a quick question, a punchy
answer.

| Time (10 s) | Beat |
|---|---|
| 0-3 s | The question, or a bold answer as a cold open |
| 3-7 s | The answer |
| 7-10 s | The button line, a punch-in |

**Voice.** An interviewer asking out loud is a second voice: no voice step. For the avatar's own
voice, brief only the answer ("@Avatar1 answers a question we do not hear") and put the
question on screen afterwards as Video Studio text.

**Pitfalls.** The template brings its own public backdrop and mic. Passers-by stay a background
crowd; say so.

```
Idea: @Avatar1 is stopped on a busy shopping street and answers a question we do not hear:
which app she would delete forever.
Hook: she is already laughing at the question as the first word lands.
Lines: "Easy. The one that tells you your screen time. It shows up every Sunday just to judge
you. Delete. Gone. Next question." Use these lines as written.
Setting: a shopping street in the afternoon, neutral daylight, a mic held into frame from the
left, passers-by as a background crowd.
Ending: a shrug and a grin as she turns to walk on.
Sound: voice and room sound only.
```

22 words. Then put the question at the top of the video as Video Studio text.

## 10. Podcast clip (`Podcast clip`)

**What it is.** Two people at desk microphones: a question, a confident answer, a reaction, cut
on the punchline.

**Who.** The avatar plus a second avatar (its `image_url` from `get_avatar` in
`inputs.characters`, `@Avatar2`), or a guest described by role and clothing, the same words
each time (staging.md, section 8).

| Time (15 s) | Beat |
|---|---|
| 0-3 s | Cold open on the punchline |
| 3-7 s | The question |
| 7-11 s | The answer |
| 11-15 s | The other's reaction and the button |

**Voice.** Two voices: no voice step.

**Pitfalls.** The template brings the studio and the two microphones; both people stay seated,
each on their own side. A third person does not hold up at these seats.

```
Idea: a podcast clip about work messages at night. @Avatar1 is the host, on the left;
@Avatar2 the guest, on the right.
Hook: the guest, mid-sentence, already leaning into the mic.
Lines: Guest: "...and that's why nobody should answer after six." Host: "Nobody? Not even for
your boss?" Guest: "Especially for your boss. If it can wait till morning, it was never urgent."
Host: "Okay, that's going on a mug." Use these lines as written.
Ending: the host's slow nod, cut on the punchline.
```

34 words.

## 11. Day in the life (`Day in the life`)

**What it is.** Quick moments through a day, a casual line over each.

| Time (15 s) | Beat |
|---|---|
| 0-3 s | A moment already in progress, with the hook line |
| 3-6 s | Moment two, a new place |
| 6-9 s | Moment three |
| 9-12 s | Moment four |
| 12-15 s | A warm button |

**Pitfalls.** One action per moment, three or four places at most (the button can stay in the
last place). The outfit stays the same unless the brief says it changes. The template leans on
music (voice step: with care).

```
Idea: a slow Saturday with @Avatar1, four moments.
Moments and lines: 1) pouring coffee by the window: "Saturdays start slow: coffee first, phone
later."; 2) a flower market, picking tulips: "Then the flower market, because tulips, always
tulips."; 3) tying her shoes at the park gate: "A short run, no watch, no plan."; 4) on the
couch with a book: "And a book on the couch. That's the whole Saturday." Use these lines as
written.
Setting: neutral daylight, phone at arm's length, the same outfit all day.
Ending: she turns a page as the last word lands, in motion.
Sound: voice and room sound only.
```

32 words.

## 12. Before and after (`Before & after`)

**What it is.** A visible change that lands on a cut: the before, then the after.

**Changes.** A makeup look, a hairstyle, a desk setup, a room corner, a plated dish: something
changed on camera. A skin, body or hair result over weeks is welcome too: the before as its own
shot (or its own take, cut together in Video Studio), the after on the cut, the same face, light
and framing on both sides so the change is the only change. An outfit change (a glow-up, a fit
check) is `creatorline-try-on-video`.

| Time (10 s) | Beat |
|---|---|
| 0-3 s | The before, visible from the first frame, and the promise |
| 3-6 s | The one step that makes the change |
| 6-10 s | The after, revealed on the cut, and the reaction |

**Pitfalls.** A change inside one shot cannot render: it happens across the cut. The template
leans on a beat drop (voice step: with care).

```
Idea: @Avatar1 turns a messy desk corner into a clean work setup.
Hook: the tangle of cables visible from the first frame, her hand already lifting one.
Lines: "This desk, one fix. Every cable into one tray under the desk. And now? Yeah. That's the
one." Use these lines as written.
Change: every cable goes into a cable tray under the desk (@Object1).
After: the clean desk, revealed on the cut, neutral daylight.
Ending: she sits down in motion, looks around, and nods.
Sound: voice and room sound only.
```

18 words.

## 13. When none fits

- A clear brief on `Auto`: the writer picks the closest format and commits to it.
- A mix (a hot take that mentions a product): the main format's template, the product in
  `objects`, one line about it, entering as story-mode.md, section 7 says.
- Outside talking videos: the "Not for" table in SKILL.md.
