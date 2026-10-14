# Formats

The six faceless formats, how a script for each is built, and the facts rule. Every format runs
on the same production steps (SKILL.md); what changes is the beat map, the narrator, the look
and the captions.

## Contents

1. [Choosing the format](#1-choosing-the-format)
2. [Lengths and beats](#2-lengths-and-beats)
3. [The beat sheet every format follows](#3-the-beat-sheet-every-format-follows)
4. [Story](#4-story)
5. [History](#5-history)
6. [Explainer](#6-explainer)
7. [Top-N list](#7-top-n-list)
8. [Motivational](#8-motivational)
9. [Family-friendly](#9-family-friendly)
10. [Facts and sources](#10-facts-and-sources)

## 1. Choosing the format

| The person says | Format | Default look | Narrator search (`list_voices`) | Caption `style` |
|---|---|---|---|---|
| a story, a legend, a myth, "what happened when", a twist | Story | Storybook watercolor (Oil painting for eerie stories) | `storyteller` | `karaoke` |
| a past event, a person, a place's past, "the history of" | History | Oil painting or Paper collage | `deep narrator` | `minimal` |
| how or why something works, "explain", a science or money idea | Explainer | Flat vector | `conversational` | `hormozi` |
| "top 5", "3 things", a ranking, a countdown | Top-N list | Realistic photos or Flat vector | `energetic` | `hormozi` |
| motivation, discipline, mindset, quotes, "stock footage with a voiceover" | Motivational | Stock footage or Silhouettes | `deep calm` | `bold` |
| "family friendly", "kids-safe", "all ages", "clean", a gentle fable or animal fact | Family-friendly | Toy 3D or Storybook watercolor | `warm friendly` | `sticker` |

Family-friendly means safe for a family to watch together, made for a general audience. It is
never content made FOR children (toddler learning, nursery songs, "for my kids' channel"):
Creatorline does not make child-directed content and marks every YouTube post as not made for
kids. When the person asks for that, say so in one line and offer the family-friendly version
(section 9).

The looks are in [visual-style.md](visual-style.md), section 2. When the brand has its own
voice (`get_brand` `voice_id`), it narrates every format unless the person asks for another.
Pick from `list_voices` by its own `name` and `description`; never invent what a voice sounds
like.

## 2. Lengths and beats

A beat is one narration line and the picture (or pictures) under it. Narration runs at about 2.3
words a second with a short breath between beats.

| Length | Beats | Words spoken | Good for |
|---|---|---|---|
| 20 s | 4-5 | 40-46 | One fact, one motivational idea |
| 30 s (default) | 6 | 60-70 | Most videos |
| 45 s | 8-9 | 95-105 | Stories, history, a top 5 |
| 60 s | 10-12 | 125-140 | A longer story, a two-part history |

- The hook beat is short: 2-3 seconds, 8 words or fewer.
- Other beats run 3-6 seconds: 7-14 words. A line that needs more becomes two beats.
- Over 60 seconds, say before the price that it takes longer and costs more, and suggest a
  two-part series instead. The Video Studio exports up to 180 seconds.

## 3. The beat sheet every format follows

1. **Hook (0-3 s).** The most surprising thing, stated flat and short. A fact, an outcome, a
   question whose answer is held back. No greeting, no "in this video", no "did you know" unless
   the fact after it is strong.
2. **Stakes.** Why it matters to this viewer, or what is at risk. One line.
3. **Build.** One idea per beat, each with something concrete: a number, a date, a place, a
   named object, a comparison. Each beat follows from the one before ("but", "so", "which
   meant"). Test: swap two build beats. If nothing breaks, you wrote a list, not a story.
4. **Turn (at about two thirds).** One line that flips what the viewer assumed. A recap is not
   a turn.
5. **Payoff (last beat).** Answers the hook. The best endings return to the hook's picture or
   number, now understood differently. Say it and stop.

- A call to action ("follow for part two") goes on screen as Video Studio text over the last
  scene, or in the post caption. Not in the narration.
- **A thread through the scenes** makes a video feel built, not listed: one object or process
  that is in every picture and changes as the story moves (a candle burning down, a map filling
  with marks, a jar filling up). The payoff resolves it. Give it the same words in every picture
  brief ([visual-style.md](visual-style.md), section 5).

## 4. Story

| | |
|---|---|
| Fits | Original short fiction, legends, myths, folk tales, a story the person wrote |
| Beat map, 30 s | 1 Hook: the moment of tension. 2 Who, where, what they want. 3 The obstacle. 4 It gets worse, or a clue appears. 5 The twist. 6 The ending that answers the hook. |
| Narrator | Measured and close, like telling it across a table. One `[whispers]` for a secret or one `[pauses]` before the twist, at most. |
| Pictures | The same main figure in every scene, always from behind or in silhouette, with the same described clothes. One place per two beats at most; a new place moves the story. |
| Watch for | A story from someone else's book, film or post: retell it only when it is public domain or the person wrote it; otherwise write an original story on the same idea. |

Example hook lines: "She opened the letter forty years too late." "The village had one rule:
never answer the third knock."

## 5. History

| | |
|---|---|
| Fits | A real event, place, invention, ship, building, a person's deeds |
| Beat map, 30 s | 1 Hook: the outcome or the number first. 2 The rewind: when and where, and what was at stake. 3 The cause. 4 The escalation, with a number. 5 The turn: what most people get wrong, or the consequence nobody expected. 6 Payoff: what it changed, echoing the hook. |
| Narrator | Warm, a little dry, confident. A wry aside is welcome; sarcasm about real victims is not. |
| Pictures | The period's clothes, tools and buildings. People are anonymous figures (section 10 of this file and visual-style.md section 4): a named king is a crowned figure from behind, never a portrait likeness. One map or object close-up every few beats keeps it varied. |
| Watch for | Research first (section 10). Dates and numbers spelled the way they should be read. Tragedies: plain and respectful, no gore in pictures. |

Example hook lines: "This lighthouse never went dark. Not once." "The war lasted thirty-eight
minutes."

## 6. Explainer

| | |
|---|---|
| Fits | How or why something works: science, the body, money, technology, everyday mysteries |
| Beat map, 30 s | 1 Hook: the question, or the fact that sounds wrong. 2 Stakes: where the viewer meets it ("every time you..."). 3 How it works, part one, with an everyday comparison. 4 Part two. 5 Turn: the part most people miss. 6 Payoff: the answer in one line, echoing the hook. |
| Narrator | Casual second person, quick, plain words. Deadpan humor works. |
| Pictures | Show the thing, not a diagram with words: arrows, highlights and labels go on as Video Studio text. Vary the device: the object, a close-up of the mechanism, a comparison scene, a map. |
| Watch for | Health, money and legal topics: explain, never advise; no promises of results (house rules, section 7). |

Example hook lines: "Your phone battery hates being full." "Planes don't fly the straight line.
On purpose."

## 7. Top-N list

| | |
|---|---|
| Fits | Rankings, countdowns, "3 things", "5 places", "4 mistakes" |
| Beat map, 30 s (3 items) | 1 Hook: the list's promise with its number. 2 Item 3: its name and one surprising concrete. 3 Item 2. 4 Item 1, the strongest, with the biggest surprise. 5 Payoff: one line on what they share, or the twist about number one. A top 5 needs 45 s. |
| Narrator | Brisk and upbeat. Each item gets the same sentence shape so the rhythm carries the list. |
| Pictures | One scene per item, plus the hook. Same look for every item. |
| On-screen text | A label over each item's scene, top row, the same `look` and `size` on every one (`"3. The Sahara"`, `tiktokHighlight`, `m`). |
| Watch for | Count down, best last. Never end on "and that's the list". Rankings of real products or companies: facts only, no claims you cannot source. |

Example hook lines: "Three places that still have no roads." "Five foods that never go bad."

## 8. Motivational

| | |
|---|---|
| Fits | Discipline, habits, mindset, comebacks, morning routines |
| Beat map, 30 s | 1 Hook: a hard truth in the second person. 2 A concrete everyday scene of the struggle. 3 The reframe. 4 One small action they can take today. 5 The long view: what it adds up to. 6 Payoff: a short line that lands, echoing the hook. |
| Narrator | Low, calm, unhurried. Space between beats; one `[pauses]` before the payoff. |
| Pictures | Stock footage (people training, walking, working, at the beach or in the city) or a Silhouettes look. Stock people are strangers filmed for stock: never present one as the narrator or a real customer. |
| Watch for | No quotes credited to famous people unless the person supplies a verified attribution: write original lines. No promises of money, health or results. |

Example hook lines: "Nobody is coming to save you. Good." "You don't need more time. You need
fewer exits."

## 9. Family-friendly

Videos for a general audience that nobody would skip past with a family in the room. Not
child-directed content (section 1).

| | |
|---|---|
| Fits | Animal facts, nature, "how does it work", gentle fables, kindness stories, told for all ages |
| Beat map, 30 s | 1 Hook: a surprising fact about something familiar, said plainly. 2 Show it happening. 3-4 Add one fact per beat, each building on the last. 5 Make the size or speed real with a comparison to an everyday thing ("heavier than a fridge"). 6 Payoff: come back to the hook's fact with what the viewer now knows. |
| Narrator | Warm, bright, unhurried. Excitement in the words, not in shouting. `[cheerfully]` or `[excited]` once at most. |
| Words | One idea per sentence, everyday words, small numbers said as words, no scary or sad turns, no unkind jokes. |
| Pictures | Animals, toys, friendly creatures, objects and places, or adults. Never a child in a picture, not even in the background. Bright, soft, round shapes; nothing scary, dangerous or gross. |
| Watch for | The caption and hashtags speak to everyone, never "for kids" or "for toddlers". Creatorline marks every YouTube post as not made for kids, which is only right for content that is not aimed at children. |

## 10. Facts and sources

For History, Explainer and any Top-N about the real world:

- **Research before you write.** With a web search tool: find the hook fact, three to five
  concrete facts the pictures can show, and the turn. Check every number, date and name in a
  second source. Keep two to four source links for the delivery.
- **No web tool:** use only well-known facts, round the numbers, and tell the person which lines
  to double check before posting.
- **Never invent** a quote, a date, a name, a number or an event. Where sources disagree, say so
  in the line ("most accounts say").
- **Real people** are named in the narration only. On screen they are anonymous figures: from
  behind, in silhouette, far away. This holds for historical figures too.
- **Copyright:** no song lyrics, no long passages from books, no retelling of a recent film or
  book scene by scene. Myths, folk tales and very old classics are free to retell.
- **Sensitive topics** (health, money, law, disasters): facts only, no advice, no promises, no
  graphic pictures (house rules, section 7).
