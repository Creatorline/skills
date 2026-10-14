# Voiceover lines

How to write the words the off-screen voice says in a product video. You write them, the person
sees them word for word with the price, and they go into the brief after "Voiceover, word for
word:". Keep the final text: the captions are checked against it.

## Contents

1. [Who speaks](#1-who-speaks)
2. [How many words](#2-how-many-words)
3. [The first second](#3-the-first-second)
4. [One phrase per moment](#4-one-phrase-per-moment)
5. [What the voice may say](#5-what-the-voice-may-say)
6. [Lines that work](#6-lines-that-work)
7. [Words to cut](#7-words-to-cut)
8. [Weak and strong](#8-weak-and-strong)
9. [Language, accent and names](#9-language-accent-and-names)

## 1. Who speaks

- A voice off screen, made by the video in the same pass as the picture: no separate narrator
  track by default. Its gender and manner come from the brand's default avatar (`get_avatar`:
  `gender`, `tone`) and from `brand_voice` in `get_brand`. Write it into the Format line: "a
  woman's voice with an American accent, warm and quick".
- The gender is settled once and stays the same in every take and every clip of the video, and
  matches any hands in frame.
- For the brand's own voice, or one voice over a clip made of joined takes, run `change-voice`
  on the finished clip with `params.voice_id` (SKILL.md, Voice options). Exact words over about
  45 s: path D's `add_voiceover`.
- The voice talks like a person beside you: second person ("two pumps, then your ends"), plain
  description of what the frame shows ("cap off, one press, done"), or its own first person.
- It speaks as the avatar, in its own voice (truth-and-safety.md, section 4): its tone, its
  opinions, its reactions to what the frame shows.

## 2. How many words

The picture carries half of a product video, so the voice leaves room for the product's own
sounds.

| Length | Words |
|---|---|
| Up to 10 s | 12-20 |
| 11-12 s | 20-28 |
| 13-15 s | 28-35 |
| 16 s and longer | The band of each take or clip, added up: 16 s on path A is two takes of 8 s, 24-40 words; 24 s is 36-60 |

Path B is one continuous take: count per beat as well (video-briefs.md, section 14). Over the
band: cut a sentence or lengthen the clip, and tell the person which.

## 3. The first second

- The first phrase lands within 0.4 s of the first frame. No silent start.
- It opens mid-thought, straight on a benefit, the mechanism or a sensory detail; also the
  problem in one breath, who it is for, or a number the label prints.
- Never: a greeting, "today I'm showing you", "so this is", "so", "okay so", "stop scrolling",
  "story time", "let me show you".
- The brand's name is rarely the best first word. Say it once, by the middle.
- The first words and the first frame are about the same thing: the frame shows what the voice
  says.

## 4. One phrase per moment

- Four phrases per take or clip, one for each moment (intro, use, second use, result), each
  about what its moment shows. Two moments sharing a shot still get a phrase each.
- No sentence, idea or near-copy said twice.
- Later takes and clips never re-introduce the product and never recap: they carry on.
- The answer to the opening comes about two thirds of the way in, with something not said yet.
- The last phrase is a verdict on what was shown: short, calm, nothing new. No spoken call to
  action: "link in bio" goes in the post caption or as Video Studio text.
- No bracketed sounds ("[laughs]", "[gasps]"): they are sounds a person on camera makes, and
  nobody is on camera.

## 5. What the voice may say

- **The avatar's own voice**: its opinions and reactions, strong ones included
  (truth-and-safety.md, section 4). Write them specific: a place, a sound, one detail.
- **Product facts** from the label, the page and the person: what it is, what it does ("the
  pump gives one measured dose"), numbers included. A label number is marked "from your label"
  in the words you show with the price, so a misread is caught.
- **An approved-claims list**, when the person gives one: each claim word for word, and nothing
  beyond it about the product (truth-and-safety.md, section 3). Words to avoid are a hard rule.
- A line that points at the frame carries something concrete the camera shows: a place on the
  body, a surface, a time of day, a sound. "Holds even on shag carpet", shown, beats "amazing
  suction"; "see how fast it sinks in" only when that shot shows it.
- No price or offer in the voice: it goes in the caption, where it can be changed.
- The legal line: no promise that it cures, treats or prevents a disease, or guarantees income
  or a return.
- Before you quote, check the lines against the person's must-say and never-say words, any
  approved list, and the brand's don'ts.

## 6. Lines that work

Patterns, each with an example. Every product fact in an example stands for one the label, the
page or the person gives; an opinion or a reaction is yours to write.

| Opening type | Example |
|---|---|
| The problem | "Cables everywhere? This one clicks to the desk edge." |
| The mechanism | "The pump stops at one dose. Every time." |
| A sensory detail | "Hear that? That's the seal." |
| Who it is for | "For the ones who forget water until 4 pm." |
| A label number | "Twenty grams of protein, and it shakes up in ten seconds." |
| A correction | "You're using too much. Two pumps. Ends only." |
| The moment | "The drive-through, but you made it at home." |
| A result | "One wipe, and the ring is gone." |
| A reaction | "It closes itself. Didn't expect that." |

Middle phrases name the use: "Cap off, scoop, shake." "Drops on the fingertip, then press."
Endings are a verdict: "That's the whole step." "Small, and it does the job." "Back on the
shelf, done."

## 7. Words to cut

These mark a line as written by a machine or as an ad:

obsessed (any form), you have to try, you need this, must-have, game changer, literally (as
filler), holy grail, amazing, incredible, unreal, so good, trust me, 10/10, 100%, changed my
life, hits different, "and honestly?", elevate, seamless, effortless, "hey guys", "let me show
you", "comment below", "link in bio" (spoken).

Swap a vague word for a concrete one: a place on the body, a surface, a time of day, a sound, a
label fact.

## 8. Weak and strong

As in section 6, every product fact in a strong line stands for one the label, the page or the
person gives.

| Weak | Strong | Why |
|---|---|---|
| "This serum is amazing, it changed my skin!" | "Two drops, pressed in. It sinks in before my coffee's done." | Vague praise says nothing; the use and one concrete detail do |
| "Okay so today I want to show you this candle." | "Fig and cedar, and the wick crackles." | Starts on the product's own detail in the first second |
| "You need this blender, trust me." | "Frozen fruit, thirty seconds, one button." | Concrete, and the frame shows each part |
| "I love this clip so much." | "The one I keep reaching for. It snaps shut with one finger." | An opinion lands with one detail the frame can show |

## 9. Language, accent and names

- Lines go in the brand's `language`, or the one the person asks for. The brief stays in English
  with "Language: <language>" (video-briefs.md, section 2).
- English takes the accent of the brand's `country`, American when none is set, written into the
  Format line.
- Write numbers the way they are said ("fifteen percent") so the voice reads them right.
- A brand or product name the voice may misread: you cannot hear the take, so ask the person to
  listen for it. If it comes out wrong, fix it in the edit (Video Studio: the clip's sound off,
  `add_voiceover` with the exact words) rather than paying for take after take. Spell a hard name
  the way it sounds in the `add_voiceover` text; captions take the real spelling.
- Captions print what was heard: compare `captions.lines` with your script and correct a
  misheard word with the `edit_caption` operation (`edit_video`), brand names spelled as in the
  script.
