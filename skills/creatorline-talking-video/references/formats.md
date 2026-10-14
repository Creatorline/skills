# Talking video formats

Each format the talking video covers, mapped to the `ugc_style` value the server's writer
follows. A named template is followed hard, so the right pick matters more than any wording in
the brief. Times are for the default length; scale them with the seconds, one beat per 3 to 4
seconds, every shot at least 3 seconds (video-briefs.md, section 6).

## Contents

1. [Pick the format](#1-pick-the-format)
2. [Review or demo](#2-review-or-demo-product-ad)
3. [Hot take](#3-hot-take-talking-head)
4. [Storytime](#4-storytime-storytime)
5. [Tips](#5-tips-talking-head)
6. [GRWM chat](#6-grwm-chat-grwm)
7. [Reaction](#7-reaction-reaction)
8. [Street interview](#8-street-interview-street-interview)
9. [Podcast clip](#9-podcast-clip-podcast-clip)
10. [Day in the life](#10-day-in-the-life-day-in-the-life)
11. [Before and after](#11-before-and-after-before--after)
12. [When none fits](#12-when-none-fits)

## 1. Pick the format

| The person says | Format | `ugc_style` | Default length | Shots | Voice step |
|---|---|---|---|---|---|
| "review", "show how it works", "talk about my product" | Review or demo | `Product ad` | 12 s (10-15) | 3-4 | Yes |
| "hot take", "opinion", "unpopular opinion", "advice", "rant" | Hot take | `Talking head` | 10 s (8-15) | 2-3 | Yes |
| "storytime", "tell the story of", "what happened when" | Storytime | `Storytime` | 20 s (15-30) | 5-6 | With care |
| "3 tips", "mistakes", "things I wish I knew" | Tips | `Talking head` | 15 s (12-20) | 4-5 | Yes |
| "GRWM", "get ready with me", talking while doing makeup, hair or an outfit | GRWM chat | `GRWM` | 15 s (12-20) | 4-5 | Yes |
| "react to", "reaction", "her face when" | Reaction | `Reaction` | 8 s (6-10) | 2 | Yes |
| "street interview", "stopped on the street", "asked strangers" | Street interview | `Street interview` | 10 s (8-12) | 3 | Only with the question as on-screen text |
| "podcast clip", "two people talking", "host and guest" | Podcast clip | `Podcast clip` | 15 s (12-20) | 4-5 | No |
| "day in the life", "vlog", "my morning" | Day in the life | `Day in the life` | 15 s (12-20) | 4-5 | With care |
| "before and after", "transformation", "makeover" of a look or a space | Before and after | `Before & after` | 10 s (8-12) | 2-3 | With care |

The shot counts keep every shot at 3 seconds or more at the default length.

- **Voice step "With care"**: these templates lean on music (Storytime drops the music before
  the punchline, Day in the life rides trending audio, Before and after hits a beat drop). Write
  `Sound: voice and room sound only`, and tell the person in one line that the avatar's own
  voice can come out distorted if the take carries music anyway; offer to skip it.
- **Two formats fit**: pick the one whose hook the person's idea already has.
- **Nothing fits**: `Auto` lets the writer infer it from a clear brief (section 12).
- **`Cinematic`** is a polished film with dramatic light and little speech, not phone-shot:
  only on request. **`Keyframes`** rebuilds a video from its frames: to copy a video, use
  `creatorline-reshoot`.

## 2. Review or demo (`Product ad`)

**What it is.** The avatar holds the person's product to camera, shows the one thing it does
and gives a verdict. A creator demo, never a testimonial.

**The viewer should** see the product do its thing and know how it is used.

| Time | Beat |
|---|---|
| 0-3 s | Hook: the problem in one line, or the product already doing its thing (a pump, a pour, a click). The product is already in hand |
| 3-6 s | What it is and how it is used: label to camera, one fact from the label |
| 6-9 s | Proof: the one demonstration, on camera |
| 9-12 s | Verdict at chest-up, the product in frame, label forward |

**The brief carries** the product card (product-intake.md), the one demonstration, the label
fact or approved claim, and where it is used.

**Inputs.** The product photo in `objects` (`@Object1`); a photo of the person's own space in
`location`.

**Pitfalls.** "I've used it for weeks" and "it cleared my skin" break the claim floor. A
two-handed demo needs "phone propped on the counter". A big printed logo can garble
(product-intake.md, section 5).

```
Idea: @Avatar1 finishes her makeup at her vanity with a setting spray and shows how she uses it.
Hook: "This is the last step, and it's the one people skip."
Takeaway: three sprays from arm's length, in an X and then a T, then let it dry.
Product: Fix Mist setting spray (@Object1), frosted bottle that fits in one palm, pump top,
"matte finish" printed on the front.
Setting: her vanity, morning light from a window on the left. She sprays with the phone propped
on the vanity.
Ending: a calm verdict, bottle in hand, label to camera.
Language: English.
Sound: voice and room sound only.
```

## 3. Hot take (`Talking head`)

**What it is.** One bold opinion, the reason, a button line. Straight to the lens.

**The viewer should** feel the urge to agree or to argue in the comments.

| Time | Beat |
|---|---|
| 0-3 s | The take, already mid-sentence, at full strength |
| 3-7 s | The reason, with one concrete example |
| 7-10 s | The button: a short verdict and a held look |

**The brief carries** the take, the reason and the one example. With no topic from the person,
take one from the brand's `content_angles` and state it in the plan.

**Pitfalls.** Naming a rival brand or a real person: write "the big-name tub", "most apps". A
take about health or money stays within label facts and approved claims.

```
Idea: @Avatar1 tells you most skincare routines are longer than they need to be.
Hook: "Your skincare routine has three steps too many."
Takeaway: cleanser, moisturizer, sunscreen; everything else is optional.
Setting: kitchen counter, coffee in hand, morning light.
Ending: a shrug and a small smile, a held look.
```

## 4. Storytime (`Storytime`)

**What it is.** A short story told like a secret: a build-up, one "but then" turn, a payoff.

**The viewer should** need to hear how it ends.

| Time | Beat |
|---|---|
| 0-3 s | A tease of the ending, mid-thought |
| 3-7 s | The setup: where, who, what was wanted |
| 7-12 s | The build |
| 12-16 s | The turn |
| 16-20 s | The payoff, and the reaction held |

Past 20 seconds the writer builds sections, each with its own small hook.

**The brief carries** the premise, the turn and the ending, in one or two sentences each.

**Pitfalls.** The avatar is synthetic and has no past, so it never tells a story as its own
history (house-rules.md, section 7). Tell it as a POV ("POV: you..."), in the second person
("You show up..."), or as a moment unfolding right now ("I'm in the parking lot and I just
realized..."). Never about a real person or brand. A product may be in the scene, used in the
present; it is never the reason the story ends well. The template leans on music (voice step:
with care).

```
Idea: @Avatar1 tells a POV story: you show up to a job interview a day early, and it works out.
Hook: "POV: you show up to your dream job interview exactly one day early."
Turn: the manager is there anyway, with twenty minutes free.
Ending: "Best mistake you'll ever make." Held half-smile.
Setting: in her car, parked, daylight, phone on the dashboard.
```

## 5. Tips (`Talking head`)

**What it is.** A count of concrete tips, each said in full.

**The viewer should** be able to use every tip without watching again.

| Time | Beat |
|---|---|
| 0-3 s | The promise: the count and what they fix |
| 3-6 s | Tip one |
| 6-9 s | Tip two |
| 9-12 s | Tip three |
| 12-15 s | The verdict |

**The brief carries** every tip written out. The writer delivers what the brief promises: "3
tips" with two written out comes back with an invented third.

**Pitfalls.** Never ask the avatar to count on its fingers (it renders wrong): "a small nod on
each tip". More than three tips need more seconds, or the list goes on screen as Video Studio
text.
A how-to in labeled steps with a product is `creatorline-tutorial-video`.

```
Idea: @Avatar1 gives three phone camera settings that make food photos look better.
Hook: "Three settings, and your food photos stop looking flat."
Tips: 1) turn on the grid and put the plate on a line; 2) tap the plate, then drag the
brightness down a little; 3) shoot by the window, never under the kitchen light.
Setting: a cafe table by a window, a plate of pasta in front of her.
Ending: a confident verdict, phone lowered.
```

## 6. GRWM chat (`GRWM`)

**What it is.** Talking to camera while getting ready: makeup, hair or an outfit, the routine
between the lines. The topic can be anything.

**The viewer should** stay for the topic and the finished look.

| Time | Beat |
|---|---|
| 0-3 s | Mid-routine, the topic dropped mid-sentence |
| 3-7 s | A routine step and a line |
| 7-11 s | The next step and the point |
| 11-15 s | The finished look and the verdict |

**The brief carries** the topic, the steps in order, and which product each step uses.

**Inputs.** Products in `objects`, one per step at most.

**Pitfalls.** Busy hands cost words: about two fewer per shot. One action per shot. Show the
step, never a result over time. A fit check or an outfit shown off is
`creatorline-try-on-video`.

```
Idea: @Avatar1 does her morning makeup and says a short routine is all most people need.
Hook: "Three products. That's the whole face."
Steps: moisturizer (@Object1) pressed in with the fingertips; cream blush (@Object2) tapped
onto the cheeks; mascara to finish.
Setting: her bathroom vanity, morning light, phone propped on the counter.
Ending: the finished look, a glance in the mirror, then back to the lens.
Sound: voice and room sound only.
```

## 7. Reaction (`Reaction`)

**What it is.** The avatar reacts to something off screen: a big face, a few words, a deadpan or
explosive button.

**The viewer should** want to see what the avatar saw.

| Time | Beat |
|---|---|
| 0-3 s | Already mid-reaction; the first line after a beat |
| 3-8 s | One punch-in on the peak, then the button line |

**The brief carries** what the avatar reacts to, described; its take on it; the energy.

**After the take.** Show what the avatar reacts to above or beside it in Video Studio (a split
screen or a layer, `creatorline-video-studio`), from a clip the person supplies.

**Pitfalls.** Never react to a review, a comment, a DM or a screenshot nobody supplied. Fewer
words, more face: aim low in the word band.

```
Idea: @Avatar1 watches a clip of someone putting ketchup on pasta (the person's clip, shown
beside her afterwards in Video Studio).
Hook: already staring at the phone, a beat of silence, then "No. Absolutely not."
Takeaway: her verdict, deadpan: pasta deserves better.
Setting: her couch, evening lamp light, phone held at arm's length.
Ending: a slow head shake and a flat look to the lens.
```

## 8. Street interview (`Street interview`)

**What it is.** The avatar stopped in public with a mic in frame: a quick question, a punchy
answer.

**The viewer should** want the answer.

| Time | Beat |
|---|---|
| 0-3 s | The question, or a bold answer as a cold open |
| 3-7 s | The answer |
| 7-10 s | The button line, a punch-in |

**The brief carries** the question, the answer and the place (a street, a market, a campus).

**Voice.** An interviewer asking out loud is a second voice: no voice step. For the avatar's own
voice, brief only the answer ("@Avatar1 answers a question we do not hear") and put the
question on screen afterwards as Video Studio text.

**Pitfalls.** The template brings its own public backdrop and mic. Passers-by stay a background
crowd; say so.

```
Idea: @Avatar1 is stopped on a busy shopping street and answers a question we do not hear:
which app she would delete forever.
Hook: "Easy. The one that tells me my screen time."
Takeaway: the answer and one reason, said with a laugh.
Setting: a shopping street in the afternoon, a mic held into frame from the left, passers-by
as a background crowd.
Ending: a shrug and a grin as she turns to walk on.
Sound: voice and room sound only.
```

Then put the question at the top of the video as Video Studio text.

## 9. Podcast clip (`Podcast clip`)

**What it is.** Two people at desk microphones: a question, a confident answer, a reaction, cut
on the punchline.

**Who.** The avatar plus a second avatar (its `image_url` from `get_avatar` in
`inputs.characters`, `@Avatar2`), or a guest described by role and clothing.

| Time | Beat |
|---|---|
| 0-3 s | Cold open on the punchline |
| 3-7 s | The question |
| 7-11 s | The answer |
| 11-15 s | The other's reaction and the button |

**The brief carries** who is host and who is guest, the question, the answer, each line with its
speaker.

**Voice.** Two voices: no voice step.

**Pitfalls.** The template brings the studio and the two microphones; both people stay seated.
A third person does not hold up.

```
Idea: a podcast clip about work messages at night. @Avatar1 is the host, @Avatar2 the guest.
Hook: Guest, mid-sentence: "...and that's why nobody should answer after six."
Lines: Host: "Nobody? Not even for your boss?" Guest: "Especially for your boss. If it can
wait till morning, it was never urgent." Use these lines as written.
Ending: the host's slow nod, cut on the punchline.
```

## 10. Day in the life (`Day in the life`)

**What it is.** Quick moments through a day, a casual line over each.

**The viewer should** want the avatar's day, or one thing in it.

| Time | Beat |
|---|---|
| 0-3 s | A moment already in progress, with the hook line |
| 3-6 s | Moment two, a new place |
| 6-9 s | Moment three |
| 9-12 s | Moment four |
| 12-15 s | A warm button |

**The brief carries** the moments in order (the place and the one action), the line at each, and
the product in one moment if there is one.

**Pitfalls.** One action per moment, three or four places at most (the button can stay in the
last place). The outfit stays the same unless the brief says it changes. The template leans on
music (voice step: with care).

```
Idea: a slow Saturday with @Avatar1, four moments.
Moments: 1) pouring coffee by the window: "Saturdays start slow."; 2) a flower market,
picking tulips: "Tulips, always tulips."; 3) tying her shoes at the park gate: "Short run, no
watch."; 4) on the couch with a book: "And that's the whole plan."
Setting: daylight, phone at arm's length, the same outfit all day.
Ending: a warm smile to the lens.
Sound: voice and room sound only.
```

## 11. Before and after (`Before & after`)

**What it is.** A visible change that lands on a cut: the before, then the after.

**Allowed changes.** A makeup look, a hairstyle, a desk setup, a room corner, a plated dish:
something changed on camera. Never a body, skin, weight or health result. An outfit change
(a glow-up, a fit check) is `creatorline-try-on-video`.

| Time | Beat |
|---|---|
| 0-3 s | The before, visible from the first frame, and the promise |
| 3-6 s | The one step that makes the change |
| 6-10 s | The after, revealed on the cut, and the reaction |

**The brief carries** the before, the after, the one thing that changes, and the products used
(`objects`).

**Pitfalls.** A change inside one shot cannot render: it happens across the cut. The template
leans on a beat drop (voice step: with care).

```
Idea: @Avatar1 turns a messy desk corner into a clean work setup.
Hook: the tangle of cables visible from the first frame: "This desk, one fix."
Change: every cable goes into a cable tray under the desk (@Object1).
After: the clean desk, revealed on the cut, warm lamp light.
Ending: she sits down, looks around, and nods: "Yeah. That's the one."
Sound: voice and room sound only.
```

## 12. When none fits

- A clear brief on `Auto`: the writer picks the closest format and commits to it.
- A mix (a hot take that mentions a product): the main format's template, the product in
  `objects`, one line about it.
- Outside talking videos: the "Not for" table in SKILL.md.
