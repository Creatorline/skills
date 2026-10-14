# Monologue craft

What the avatar says and does in a talking video. The server's writer turns your brief into
shots, lines and camera work; this file is about the parts only you can give it: the aim, the
hook, the words and a few performance cues. The brief template, the speech budget and the
templates are in video-briefs.md: apply them, do not restate them in the brief.

## Contents

1. [Start from the viewer](#1-start-from-the-viewer)
2. [One idea, one takeaway](#2-one-idea-one-takeaway)
3. [The hook](#3-the-hook)
4. [Middle, payoff, ending](#4-middle-payoff-ending)
5. [Lines that sound said](#5-lines-that-sound-said)
6. [Word density by format](#6-word-density-by-format)
7. [The person's own lines](#7-the-persons-own-lines)
8. [A performance that looks alive](#8-a-performance-that-looks-alive)
9. [Staging that renders](#9-staging-that-renders)
10. [The claim floor, format by format](#10-the-claim-floor-format-by-format)
11. [Check before you quote](#11-check-before-you-quote)

## 1. Start from the viewer

Every talking video is the avatar trying to do one thing to the viewer. Pick the verb first and
write the whole clip toward it.

| Format | The avatar is trying to |
|---|---|
| Review or demo | show you it works, so you stop wondering |
| Hot take | get you to agree, or to argue |
| Storytime | keep you to the last line |
| Tips | hand you something you can use today |
| GRWM chat | keep you company while making one point |
| Reaction | make you want to see what the avatar saw |
| Street interview, podcast clip | land one answer you repeat to a friend |
| Day in the life | make you want the avatar's day, or one thing in it |
| Before and after | make the change feel earned |

A clip with no aim looks like someone reading a script. The aim goes into the brief's Idea line.

## 2. One idea, one takeaway

- One idea per clip. A second idea is the next video: offer it as a next step.
- Write the takeaway first: the actual tip, number, phrase, setting or demonstration, in full.
  "This app fixes it" is not a takeaway; what the app did is.
- Then write the hook that earns that takeaway.

## 3. The hook

The first three seconds decide whether the rest is seen. Open on the most specific moment of
the clip, already in motion.

| Pattern | What the first seconds show | Example line | Fits |
|---|---|---|---|
| Bold opinion | The take at full strength | "Your skincare routine has three steps too many." | Hot take, tips |
| Mid-thought | A sentence already under way, as if the camera caught the avatar talking | "...and that's the part nobody reads on the label." | Hot take, GRWM, review |
| Mechanism first | The product already doing its thing; the first word over it | (the pump clicks) "Two drops. That's the whole step." | Review |
| The problem | One relatable frustration, said fast | "If your coffee tastes burnt, it's not the beans." | Review, tips |
| Already reacting | The face mid-reaction, a beat, then the line | "No. Absolutely not." | Reaction |
| The question | The question, then straight into the answer | "What's one app you'd delete forever?" | Street interview, podcast clip |
| The promise | The count and what it fixes | "Three settings, and your food photos stop looking flat." | Tips |
| Interrupted task | The hands stop mid-task as the line lands | (stops stirring) "Nobody tells you this about cold brew." | GRWM, day in the life |
| POV | The viewer dropped into the situation | "POV: you show up to the interview a day early." | Storytime |

- The first word comes at once: no greeting, no "hi guys", no name, no logo, no walk into frame.
- Never open on a warm-up word: "So", "Okay", "Alright", "Um", "Like", "Wait", "Hey guys",
  "Let me tell you", "Stop scrolling", "Story time". The viewer leaves during warm-up. Later
  in a sentence they are fine.
- The hook and the rest are about the same thing, and a later line comes back to it.
- A question the clip answers beats a claim the clip cannot show.

## 4. Middle, payoff, ending

- **Middle.** Every beat adds something: a new fact, the product moves, the framing changes. A
  beat that only teases the hook again is dead time.
- **Payoff**, at half to three quarters of the way in: the answer to the hook, with something not
  said yet. It gets its own held shot.
- **Ending**, the last 2 to 3 seconds: a verdict on what was shown, the way the avatar would say it
  ("Yeah. That one stays."). No new fact, no "link in bio", no "follow for part two": the writer
  turns a spoken call to action into a verdict anyway. The call to action goes in the caption
  (`creatorline-publish`) or as on-screen text (`creatorline-video-studio`).
- A loop-friendly ending (the last line runs into the first) helps hot takes and reactions,
  never at the cost of a clear verdict.

## 5. Lines that sound said

- Contractions, short sentences, one thought per sentence.
- One stressed word per line at most.
- One bit of real-speech mess per clip: a restart ("It's... no, it's simpler than that."), a
  half-laugh. Perfect sentences sound read off a card.
- The avatar's own register: its `tone` and `bio` from `get_avatar`, the brand's do's and
  don'ts from `get_brand`. A don't is a hard rule.
- Leave out slogans, lines that would fit on the packaging, three-part "no" lists ("No sugar. No
  chalk. No guilt."), and filler the writer strips anyway ("literally", "game changer",
  "obsessed").
- Numbers the way they are said out loud.
- A pronunciation shown in a line is written the way it is said slowly ("comf... ter...
  bull"), never as a respelling, which is read as the plain word.
- Never put a token such as `@Object1` inside quoted speech: the avatar would say it. Name
  the thing.

## 6. Word density by format

Video briefs, section 7 gives the word band for each length. Where to aim inside it:

| Format | Aim | Why |
|---|---|---|
| Hot take, tips, review | The top of the band | Creators talk fast; silence loses the viewer |
| Storytime | The middle, with one held pause before the turn | The pause is the tension |
| GRWM, day in the life, before and after | About two words fewer per shot | The hands are busy |
| Reaction | The bottom of the band | The face is the content |
| Podcast clip, street interview | Split between the speakers, one speaker per shot | The lips stay in sync with one face at a time |

- A line of six words or fewer in a shot of four seconds or more leaves a gap the model fills
  with babble or a repeat. Lengthen the line or shorten the clip.
- Over the band: cut adjectives first, then a beat, then add seconds. Tell the person what you
  did: "I trimmed your second line to fit 12 seconds", or offer 15 seconds with its new price.

## 7. The person's own lines

- Quote them in the brief and add "use these lines as written". The writer keeps given words.
- Keep their order and their beats. If they gave beats, label each line with its beat.
- Count them against the length. Trim only with a word to the person, or lengthen and quote
  again.
- Change a line only for the claim floor or the house rules, and say what changed and why.
- In another language: the lines in that language, the rest of the brief in English, and a
  `Language:` line.
- A script longer than 30 seconds of speech is an episode: `creatorline-ai-host`.

## 8. A performance that looks alive

The writer directs the hands, eyes, posture and expression shot by shot. Give it the cues only
you know, in plain words, inside the Idea or Setting lines:

- **A task for the hands.** Stirring coffee, folding a sweater, doing mascara, turning the
  product in hand. Talking over a task looks real; standing still and talking looks
  recited. The strongest moment is the task stopping as the key line lands.
- **A target for the eyes.** "checks whether you're buying it", "glances at the bottle,
  then back to the lens". Eyes that leave and come back look alive; a fixed stare looks
  generated.
- **Energy, written as what shows.** By default the energy is natural and warm, with one real
  peak. High energy only when the person asks for it ("hyped", "energetic", "loud"). Calm for
  luxury, deadpan or quiet tones. Write "leans in, half-smile, voice drops", never "is
  excited".
- **A real smile reaches the eyes.** "Cheeks lift, eyes crinkle" beats "smiles".
- **One unguarded moment**: a small laugh, a restart, a shrug. Leave it out for deadpan or
  luxury.
- **Distance is a beat.** Leaning into the lens is a secret; leaning back is the verdict.

## 9. Staging that renders

- One main action per shot. A manipulation (opening, pouring, applying) costs a second of
  speech.
- In a selfie only one hand is free, and it holds one thing. Anything two-handed needs
  "phone propped on the counter".
- The product is in frame from the first second of its shot, label to camera, already open if
  it is used open. Things that enter the frame later drift from their photo.
- Never ask the avatar to count on its fingers: it renders wrong. A nod per item, or the
  voice alone.
- Name only props you supply (`objects`, `location`) or that the setting plainly holds. A named
  prop with no photo comes out drawn badly or floating.
- No split screen, picture-in-picture, captions or on-screen text in the brief: those are Video
  Studio jobs after the take.
- End at chest-up or wider. Close-ups of skin, teeth, food and hair show flaws.
- Other people in the scene: say who they are by role and clothing ("a barista in a green apron
  behind the counter"), or they can come out looking like the avatar.

## 10. The claim floor, format by format

The rule is in house-rules.md, section 7: the avatar is synthetic and has no past. How it lands
in each format:

| Format | Never | Write instead |
|---|---|---|
| Review | "I've used it every morning for a month." | "Two pumps on damp hair, and you're done." (shown on camera) |
| Review | "It cleared my breakouts." | "Two percent salicylic acid, right there on the label." |
| Storytime | "This is how I got my dream job." | "POV: you show up a day early..." (a POV, the second person, or a moment happening now) |
| Storytime | A story that ends "...and this cream fixed it." | The product, if any, used in the present, never the reason it ended well |
| Tips | "This supplement stops bloating." | Label facts and approved claims only, or a tip that needs no product |
| Before and after | A skin, body or weight result | A makeup look, an outfit, a desk, a room, changed on camera |
| Reaction | Reacting to a review, comment or DM nobody supplied | Reacting to something real the person supplies |
| Hot take | Naming a rival brand or a real person | "the big-name tub", "most apps" |
| Any | "As a dermatologist..." | An opinion, plainly an opinion |

Never present an avatar as a real customer, and never present the brand's video as an
independent review.

## 11. Check before you quote

- The aim (one verb) and the takeaway are in the brief.
- The hook is the most specific line, starts at once, and avoids the warm-up openers.
- Every promised item is written out in full.
- The words fit the seconds for this format.
- The ending is a verdict, with no call to action.
- The hands have a task, the eyes a target, and the energy is written as what shows.
- Every prop is supplied or obvious; one action per shot; no finger counting; no text or split
  screen.
- Nothing breaks the claim floor, and none of the brand's don'ts appear.
- `Language:` is there when the speech is not English; `Sound: voice and room sound only` is
  there when the voice step runs.
