# Voiceover lines

How to write the words the off-screen voice says in a product video. You write them, the person
sees them with the price, and they go into the brief after "Voiceover, word for word:".

## Contents

1. [Who speaks](#1-who-speaks)
2. [How many words](#2-how-many-words)
3. [The first second](#3-the-first-second)
4. [One chunk per shot](#4-one-chunk-per-shot)
5. [What the voice may say](#5-what-the-voice-may-say)
6. [Lines that work](#6-lines-that-work)
7. [Words to cut](#7-words-to-cut)
8. [Weak and strong](#8-weak-and-strong)
9. [Language and names](#9-language-and-names)

## 1. Who speaks

- A voice off screen. Its gender and manner come from the brand's default avatar (`get_avatar`:
  `gender`, `tone`) and from `brand_voice` in `get_brand`. Write it into the brief's Format line:
  "a woman's voice, warm and quick".
- The video makes the voice in the same pass. For the brand's own voice, or one voice over a clip
  made of joined takes, run `change-voice` on the finished clip with `params.voice_id` (SKILL.md,
  Voice options).
- The voice talks like a person beside you: second person ("two pumps, then your ends"), or plain
  description of what the frame shows ("cap off, one press, done").
- First person only for what happens on screen right now. Never a habit or a history: "every
  morning", "for months", "since I started" are personal claims a synthetic voice cannot make
  (house rules, section 7).

## 2. How many words

The picture carries half of a product video, so stay at the low end of the speech budget
(video-briefs.md, section 7). About 2.5 words a second is full speed; these leave room for the
product's own sounds.

| Length | Words |
|---|---|
| 5 s | 12-15 |
| 8 s | 16-20 |
| 10 s | 22-26 |
| 15-16 s | 30-38 |
| 24 s | 45-55 |

Path B is one continuous take: count per beat instead (video-briefs.md, section 14). Over
budget: cut a sentence or lengthen the clip, and tell the person which.

## 3. The first second

- The first word lands on the first frame. No silent start, no greeting, no "so", "okay",
  "today I'm showing you", "stop scrolling".
- Open on one of: the problem in one breath, the mechanism, a sensory detail, who it is for, or a
  number the label prints.
- The brand's name is rarely the best first word. Say it once, by the middle.
- The first words and the first frame are about the same thing: the frame shows what the voice
  says.

## 4. One chunk per shot

- Split the lines by shot. Each chunk talks about what its shot shows.
- No sentence or idea said twice.
- The answer to the opening comes about two thirds of the way in, with something not said yet.
- The last chunk is a verdict on what was shown: short, calm, nothing new. No spoken call to
  action: "link in bio" goes in the post caption or as Video Studio text.

## 5. What the voice may say

- What the label prints, what the page states, the person's approved claims word for word
  (product-intake.md, section 4).
- What the product does, in the present tense: "the pump gives one measured dose".
- What the frame shows: "see how fast it sinks in" only when that shot shows it.
- Opinions: "the best part is the smell" is an opinion, said as one.
- Never: a personal result, a before and after the clip does not show, a credential, a ranking,
  "clinically proven", "number one", a price or an offer (prices go in the caption, where they can
  be changed).
- Health, supplements, skincare actives, money: label facts and approved claims only.

## 6. Lines that work

Patterns, each with an example. Every fact in an example stands for one the label or the page
must actually give.

| Opening type | Example |
|---|---|
| The problem | "Cables everywhere? This one clicks to the desk edge." |
| The mechanism | "The pump stops at one dose. Every time." |
| A sensory detail | "Hear that? That's the seal." |
| Who it is for | "For the ones who forget water until 4 pm." |
| A label number | "Twenty grams of protein, and it shakes up in ten seconds." |
| A correction | "You're using too much. Two pumps. Ends only." |
| The moment | "The drive-through, but you made it at home." |

Middle chunks name the use: "Cap off, scoop, shake." "Drops on the fingertip, then press."
Endings are a verdict: "That's the whole step." "Small, and it does the job." "Back on the
shelf, done."

## 7. Words to cut

These mark a line as written by a machine or as an ad, and the writer removes most of them
anyway:

obsessed, game changer, literally (as filler), holy grail, must-have, you need this, trust me,
amazing, incredible, unreal, so good, 10/10, changed my life, hits different, elevate, seamless,
effortless, "hey guys", "let me show you", "comment below", "link in bio" (spoken).

Swap a vague word for a concrete one: a number from the label, a place on the body, a surface,
a time of day, a sound.

## 8. Weak and strong

As in section 6, every fact in a strong line stands for one the label or the page gives.

| Weak | Strong | Why |
|---|---|---|
| "This serum is amazing, it changed my skin!" | "Two drops, fingertip first. Fifteen percent vitamin C, right on the label." | A fact on the label and the use shown, no personal result |
| "Okay so today I want to show you this candle." | "Fig and cedar, and the wick crackles." | Starts on the product's own detail in the first second |
| "You need this blender, trust me." | "Frozen fruit, thirty seconds, one button." | Concrete, and the frame shows each part |
| "I've used this every day for a year." | "It lives on my desk. Clip, cable, done." | Present tense, what the frame shows |

## 9. Language and names

- Lines go in the brand's `language`, or the one the person asks for. The brief stays in English
  with "Language: <language>" (video-briefs.md, section 2).
- Write numbers the way they are said ("fifteen percent") so the voice reads them right.
- A brand or product name the voice may misread: you cannot hear the take, so ask the person to
  listen for it. If it comes out wrong, fix it in the edit (Video Studio: the clip's sound off,
  `add_voiceover` with the exact words) rather than paying for take after take. Spell a hard name
  the way it sounds in the `add_voiceover` text; captions take the real spelling.
- Captions print what was heard: correct a misheard word with the `edit_caption` operation
  (`edit_video`).
