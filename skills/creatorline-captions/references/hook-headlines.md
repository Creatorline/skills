# Hook headlines

The few words on screen in the first seconds that tell a scrolling viewer why to stay. They are
read with the sound off, in about a second, over a picture that is moving.

## Contents

1. [What the headline does](#1-what-the-headline-does)
2. [Seven patterns](#2-seven-patterns)
3. [Hooks by format](#3-hooks-by-format)
4. [Weak to strong](#4-weak-to-strong)
5. [Writing it from what is said](#5-writing-it-from-what-is-said)
6. [Words on screen and the claim floor](#6-words-on-screen-and-the-claim-floor)
7. [Size, lines and time](#7-size-lines-and-time)
8. [Testing hooks](#8-testing-hooks)

## 1. What the headline does

- The opening picture is the visual hook (what happens in the first second). The headline is
  the words over it. They work together: the line names what the picture starts.
- It makes one promise the video keeps: a reveal, an answer, a result shown, a list worked
  through. A promise the video does not keep loses the viewer and the next video's viewer too.
- It is not the first spoken line. Captions already show that. The headline frames it: the
  spoken line says "so I packed seven days into this", the headline says "a week in one
  carry-on".

## 2. Seven patterns

| Pattern | Shape | Example | Fits |
|---|---|---|---|
| Number | A count the video walks through | "3 desk upgrades for a small room" | Lists, tips, tutorials |
| Curiosity gap | Names a thing, holds back the answer | "the setting nobody changes" | Tips, app promos, explainers |
| Contrarian | Pushes against common advice | "stop folding your t-shirts" | Tips, tutorials, opinions |
| Pain point | Names the viewer's problem | "if your closet never closes" | Product videos, app promos |
| POV | Puts the viewer in the scene | "POV: the carry-on actually fits" | Lifestyle, try-on, unboxing |
| Question | A question the viewer wants answered | "is this serum worth it?" | Reviews, comparisons |
| Shown result | Points at what the video demonstrates | "watch the stain lift in one wipe" | Demos, only when it is on camera |

Front-load the word that carries it ("3", "stop", "POV", the product's category). The rest can
be small.

## 3. Hooks by format

| Format | Angle | Example |
|---|---|---|
| Review, talking to camera | A verdict or a test | "the cup holder test" |
| Unboxing | Anticipation | "opening the new drop" |
| Try-on, OOTD | One item, many ways, or an occasion | "1 shirt, 3 outfits" |
| Tutorial | The outcome and how little it takes | "the 10-second closet fold" |
| App or website promo | The problem the app removes | "the app that sorts receipts for you" |
| Storytime | An open loop | "the order that came back twice" |
| Faceless explainer | A surprising true fact | "the city that moved a whole church" |
| List | The count and the topic | "5 foods that keep for a month" |
| Green screen reaction | The thing reacted to | "this kitchen gadget is real" |
| A reshoot of a trend | The trend's own hook, in the brand's words | Keep the source's angle, change the words |

## 4. Weak to strong

| Weak | Why | Strong |
|---|---|---|
| "check out this amazing product!" | No promise, shouting, nothing specific | "this bottle fits every cup holder" |
| "my review of the X serum" | A label, not a reason | "is this serum worth it?" |
| "you won't believe what happens" | A promise with nothing in it | "watch the stain lift in one wipe" |
| "follow for more tips" | A sign-off, not an opener | "3 settings to change first" |
| "hi guys, today I'm going to show you" | Words that waste the first second | "a week in one carry-on" |
| "the best moisturizer in the world" | A claim nobody can back | "the moisturizer that sits under makeup" |
| A 14-word sentence | Unreadable in a second | Cut it to the 4 words that carry it |

## 5. Writing it from what is said

- You wrote the script (a talking video made in this conversation): take the headline from its
  promise, not from its first line.
- A video you did not make: the asset's `prompt` in `list_assets` often says what it is. On
  route A, the first `captions.lines` after captions are written show what is actually said:
  the hook can be added or changed after captions with no effect on them.
- No idea what is said and route B: `hook_mode: "auto"` writes the line from the speech, in the
  brand's voice. You cannot see the line it chose until the video is back.
- The person's own words for a hook always win; trim them only to fit (section 7), and say
  what you cut.

## 6. Words on screen and the claim floor

The house rules' claim floor (house-rules section 7) covers on-screen words exactly as it covers
speech. An avatar is a synthetic person with no history.

| Never on screen | Instead |
|---|---|
| "it cleared my skin", "I've used it for months" | What the label says, or a question |
| "dermatologist approved", "as a nurse" | Nothing about credentials |
| "10,000 sold", "rated 4.9" unless the person supplied it | What the product does |
| "guaranteed results", "lose 5 kg" | Nothing about health, money or guaranteed results |
| Another brand's name or product | Only the brand's own |
| "comment YES for the link" as the payoff | A call to action at the end, from `brand_voice.call_to_action` |

Superlatives as fact ("the best") are opinions at most; a question carries the same energy
without the claim.

## 7. Size, lines and time

| Size | About this many characters a line | Use |
|---|---|---|
| `xl` | 16 | 2 to 4 words |
| `l` | 20 | The usual hook: up to 8 words in two lines |
| `m` | 26 | A longer title kept on the whole video, or over a busy face |

- Two lines at most. Break them yourself with `\n` where you would pause when saying it, and
  keep the two lines about the same length.
- Plain letters, digits and basic punctuation. Video Studio draws emoji, but a one-pass hook's
  font may not: none there, and at most one in Video Studio when the brand's voice uses them.
- Hold it 2.5 s for up to 5 words and 3 to 3.5 s for 6 to 8. A title that stays the whole video
  (`over: "video"`) is five words or fewer.
- The same look and size for the brand's hooks every time (SKILL.md, "One look per brand").
- Route B sets its own size, place and time for the hook (small, top, first 2.5 s): only the
  words are yours.

## 8. Testing hooks

- The hook is the cheapest thing to test: the same video with two or three lines, each posted
  on its own, and the one that holds viewers wins.
- Change only the line between versions: the same look, size and time.
- Make the versions through `creatorline-ad-variations`, which prices them as one batch.
