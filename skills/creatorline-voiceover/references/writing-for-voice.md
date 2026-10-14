# Writing for voice

How to write words that a voice reads well, fit them to the seconds they have, and get a
re-voice, a dialogue or a lip sync right the first time. Every take is paid, so the work is
done on the page, before the call.

## Contents

1. [The word budget](#1-the-word-budget)
2. [Fitting a window](#2-fitting-a-window)
3. [Writing for the ear](#3-writing-for-the-ear)
4. [Feeling tags](#4-feeling-tags)
5. [Narration over clips](#5-narration-over-clips)
6. [Dialogue scripts](#6-dialogue-scripts)
7. [Re-voice and lip sync](#7-re-voice-and-lip-sync)
8. [Another language](#8-another-language)
9. [Weak and strong](#9-weak-and-strong)

## 1. The word budget

People speak about 2.5 words a second, about 15 characters a second counting spaces. Plan
to fill 80 to 90 % of a window: a line that fills all of it sounds rushed and runs over, a
line that fills half leaves silence people scroll past.

| Window | Words (English) | Characters (any language) |
|---|---|---|
| 2 s | 4 to 5 | 24 to 27 |
| 3 s | 6 to 7 | 36 to 40 |
| 5 s | 10 to 11 | 60 to 67 |
| 8 s | 16 to 18 | 96 to 108 |
| 10 s | 20 to 23 | 120 to 135 |
| 15 s | 30 to 34 | 180 to 200 |
| 20 s | 40 to 45 | 240 to 270 |
| 30 s | 60 to 68 | 360 to 400 |
| 60 s | 120 to 135 | 720 to 800 |

Adjust before you write:

- Each `[laughs]`, `[sighs]` or `[pauses]` is performed and takes about a second: two or
  three words fewer for each.
- Every full stop adds a short silence. A line of many short sentences takes the low end of
  the range.
- An excited or emotional read is slower: about 10 % fewer words.
- Never more than 3 words a second. Past it the read sounds rushed, whatever the voice.
- One voiceover holds 2000 characters, a little over two minutes.

## 2. Fitting a window

1. **Measure the window** from `get_video`: the `start` and `end` of the clip or clips the line
   covers. Keep about 0.3 s free at the end for a breath before the next line or the cut.
2. **Budget** with the table, then adjust (section 1).
3. **Write, count, cut.** Over budget: lose the weakest clause and keep the point. Under
   budget: add a fact the viewer can use (a number, a reason, what happens next). Padding
   words only make the read slower.
4. **After the take**, compare its `end` with the window:

| The take | Do |
|---|---|
| Inside the window | Done |
| Over by less than a second | Give the visuals the time: hold a photo clip longer, trim a video clip less (free) |
| Over by more, and the visuals cannot stretch | New words: old word count times window divided by measured length. A new take: quote it, ask |
| Short, leaving dead air | Shorten the visuals to the voice (free), or move the next line earlier |

5. The same words come back at about the same length, so a second take of them fixes
   nothing. Change the words, never the speed.

## 3. Writing for the ear

- **Front-load.** The first words carry the idea. A sentence holds 5 to 12 words and one
  thought.
- **Talk, do not write.** Contractions, "you", active verbs, everyday words. Read it in your
  head at speed: anything you stumble on, the voice will too.
- **Lists of three at most.** A fourth item is lost.
- **Questions rise** at the end; use one to pull the viewer in ("Know why?").
- **`...`** holds a short, trailing pause. A comma is a breath.
- **One word in capitals** usually gets the stress ("This is the ONE step"). Once per line at
  most.
- **No stage directions in words.** "(laughs)" or "*sigh*" are read aloud. Use the bracket
  tags (section 4).
- **No emoji, no hashtags, no links.** They are read oddly or not at all. A link is "link in
  bio", and it lives in the caption.

Spell everything the way it is said:

| On the page | In the script |
|---|---|
| $29.99 | twenty-nine ninety-nine |
| 3x faster | three times faster |
| SPF 50 | S P F fifty |
| 10% | ten percent |
| 2 tbsp | two tablespoons |
| 5km | five kilometers |
| 24/7 | all day, every day |
| e.g., etc. | for example, and more |
| A brand name the voice may misread | Spelled as it sounds, the same way every time |
| www.brand.com | link in bio |

When a word still comes out wrong, respell it by sound ("Ny-ah-SIN-ah-mide") and re-take.
Ask the person how their brand name is said if it could go two ways.

## 4. Feeling tags

These are the tags Video Studio offers. They are written into the words, in square brackets,
in English whatever the language, right before the words they color. They are not spoken
(except as the sound they name).

| Tag | Use it for | Example |
|---|---|---|
| `[excited]` | A reveal, a result shown, a hype hook | `[excited] It actually worked.` |
| `[cheerfully]` | A warm tip, a friendly opener | `[cheerfully] Here's the easy way.` |
| `[laughs]` | Right after a joke or a self-own | `I skipped it for a year. [laughs]` |
| `[whispers]` | A secret, an insider tip | `[whispers] Nobody tells you this.` |
| `[curious]` | A question or a tease | `[curious] Guess what's inside?` |
| `[sad]` | The problem before the fix | `[sad] Mine went bitter every time.` |
| `[sighs]` | Frustration, the before | `[sighs] Another flat cold brew.` |
| `[pauses]` | A beat before the payoff | `The secret? [pauses] Cold water.` |

- At most one per sentence; one to three in 15 seconds. A tag on every line flattens them all.
- `add_voiceover` and `dialogue` always perform them. A voice line does too, unless
  `params.model_id` names another engine: that one reads the tag out loud.
- The words carry the feeling first. A tag only sharpens a line that already has it.

## 5. Narration over clips

**When the person gave no words** (a one-liner like "narrate this"), write them yourself:
look at each clip with `preview_video`, take the topic from the person's ask or one of the
brand's `content_angles`, and write one line per clip. Show the lines with the price.

**The shape of a 10 to 30 second narration:**

| Part | Where | What it does |
|---|---|---|
| Hook | 0 to 2 s, over the strongest clip | The most specific claim, number or question. No greeting. |
| Middle | One line per clip | Each line adds what the picture cannot: why, how much, what changes |
| Payoff | 50 to 75 % of the way in | The answer to the hook, something not said yet |
| Ending | The last 2 to 3 s | A verdict or a one-line takeaway. A call to action, if any, short and last |

- A line lands as its clip starts. If the clip shows the product, the line names it then.
- Inside one voiceover, where a line falls is an estimate: its share of the characters times
  the take's real length. After the take, move the cuts to the voice (free). When a line must
  start exactly on a cut that cannot move, give it its own voiceover with `over` that clip.
- Do not narrate what is plain on screen ("here I am pouring coffee"). Say what it means
  ("cold water, twelve hours, no bitterness").
- One narrator voice for the whole video. Change the feeling with words and tags.
- The brand's `brand_voice` sets the tone; its don'ts are hard rules. Every claim is a fact
  from the label or the person (house rules, section 7).

**Example.** Four clips, 14 s (0 to 3.5, 3.5 to 7, 7 to 10.5, 10.5 to 14), one voiceover from
0 s. The budget is 28 to 31 words, less 2 for the pause; many short sentences put it at the
low end: 26 words. The fix ("cold water, coarse grind") lands at about 8 s, past half way.

```
Three cold brew mistakes. [pauses] One: hot water. Two: a fine grind.
Three: rushing it. Cold water, coarse grind, twelve hours in the fridge. Smooth every time.
```

## 6. Dialogue scripts

- **Who they are.** Decide A and B before writing: a coach and a client, a skeptic and a
  fan, a host and a guest. Give them voices that are easy to tell apart: a different gender,
  age or energy.
- **Short turns.** 3 to 12 words a turn. Real talk interrupts, agrees, pushes back. A one-word
  turn ("Wait." "No way.") gives the rhythm.
- **Budget.** Count all turns together. Each change of speaker adds a short gap, so take a
  word off per turn: 20 s is about 35 words in 6 to 8 turns.
- **Tags** work inside lines: `B: [laughs] Define skip.`
- **Format.** Each turn on its own line, starting `A:` or `B:`. A line with no label joins the
  turn above.
- **`stability`.** `0.5` for most. `0` for a lively, playful exchange (it can wander). `1` for
  an even, informational read.
- **What a dialogue file is for:** a podcast-style audio, a skit's sound, the voices of a
  faceless video. Under a Video Studio project it goes in with `set_sound` and plays from 0 s;
  captions do not hear it there. For a two-voice video with captions, use one voiceover per
  turn in each speaker's voice instead (each one a take: quote them all).
- **Two faces speaking it:** a lip sync syncs one face. Two avatars talking on camera is a
  talking video (`creatorline-talking-video`).

**Example**, about 20 s, 35 words in 7 turns:

```
A: Be honest. How many leg days did you skip this month?
B: [laughs] Define skip.
A: Two squats a day. That's it.
B: Two? That's nothing.
A: That's the point. Do them while the kettle boils.
B: [curious] And next month?
A: Three.
```

## 7. Re-voice and lip sync

**Re-voice** keeps the words, the timing, the lip movement and the delivery, and changes only
whose voice it is.

| Works well | Comes out badly |
|---|---|
| One clear speaker | Two or more people speaking: they all get one voice |
| Voice and room sound only | Music under the speech: garbled |
| A quiet room | Loud traffic, wind, a crowd (try `remove_background_noise: true`) |
| Up to about five minutes | Longer |

- For a series that sounds like a different person in every video, re-voice each one to the
  same `voice_id`.
- When a new take will be re-voiced, it should be made with voice and room sound only; music
  goes on afterwards in Video Studio.
- A real person on screen: re-voice only with their consent, and never give them the voice of
  another real person.

**Lip sync** moves the mouth in a video to a new voice track.

| The video | The audio |
|---|---|
| One face, visible most of the time, front or three-quarter | A clean voice, no music under it |
| Chest-up or closer, mouth uncovered | About as long as the video, within half a second |
| Little head turning, even light | Starting where the mouth should start moving |

- Shorter holds better: trim the video to the part you need before the lip sync. It is priced
  per second of the video too.
- The face is whoever is in the video. It syncs one face: pick footage with one speaker.
- Expect the result to carry only the new audio. Music or room sound from the original is not
  kept; add music back in Video Studio.
- When the lengths differ and cannot be matched, `sync-lipsync-v2-pro` lets you choose what
  happens:

| `sync_mode` | When audio and video differ in length |
|---|---|
| `cut_off` (default) | The result stops when the shorter one ends |
| `loop` | The shorter one repeats from its start to fill |
| `bounce` | The shorter one plays forward, then backward, to fill |
| `silence` | The audio is padded with silence to the video's length |
| `remap` | The video's timing is stretched or squeezed to the audio |

Match the lengths and the mode never matters; that gives the cleanest result.

## 8. Another language

- **Write it fresh in the language**, the way a native creator would say it, not word for
  word. Idioms do not translate; the point does.
- **Budget by characters**, about 15 a second (section 1). Most languages need more
  syllables than English for the same meaning: cut harder than you think.
- **The same voice.** The avatar's `voice_id` speaks the language the words are written in.
- **Tags stay in English** inside the new language's words.
- **Numbers, units and prices** as they are said in that language and market.
- **The brand name and product names** stay as they are, unless the brand uses a local name.
- On-screen texts and the post caption change language too.

## 9. Weak and strong

Weak: "Hey guys! So today I wanna talk about our amazing new cold brew which is literally a
game changer, check out www.brew.com for 20% off!!!"

A greeting where the hook should be, filler the voice speeds through, a link read aloud, a
discount the brand never gave, and no fact.

Strong, for 15 s in Mia's voice, from the label and the brand's own claims:

```
Your cold brew tastes bitter for one reason. It's not the beans, and it's not the grind.
[pauses] It's hot water. Cold water, twelve hours. That's the whole trick.
```

28 words and one pause: a hook that promises an answer, the answer at about 8 s (just past
half way), a verdict to end, nothing the label or the brand does not back. The offer goes in
the post caption, where the link lives too.
