# Edit styles

The edit style is how an episode's words and pictures sit on the host: which text look, how big,
where, which caption style, how cards and cutaways are framed, and how often something new
arrives. It is one choice per show, asked once and kept for every episode. These styles began as
motion-design profiles; here they are built from what Video Studio has, so each one is a set of
operation fields, not an animation.

## Contents

1. [Asking for the style](#1-asking-for-the-style)
2. [The styles at a glance](#2-the-styles-at-a-glance)
3. [Each style in Video Studio fields](#3-each-style-in-video-studio-fields)
4. [Auto](#4-auto)
5. [Their own direction](#5-their-own-direction)
6. [What no style can do here](#6-what-no-style-can-do-here)

## 1. Asking for the style

- Ask it in the intake of a first episode (a one-off or the start of a show), as one flat list:

  ```
  3. Edit style: 1) Auto, I pick from the topic (recommended) 2) Bold Editorial
     3) Funky Modular 4) Luminous Interface 5) Documentary Collage 6) Web Brutalism
     7) Minimal 8) Press 9) Editorial Overlay 10) Your own direction or a video to match
  ```

- With a question widget (2 to 4 options): Auto, the two styles that fit the topic best, and
  the free-text answer for any other name on the list. Put the full list in the line before
  the widget.
- A style already given (a name from the list, "like my last episode", a post to match) is
  used without asking again. A running series uses its bible's style.
- A reply that answers the other questions and skips this one has not picked Auto. Ask again
  in one line with the same list before anything is filmed. Only "you choose", "no
  questions", "just do it" or the like makes it Auto.
- "Your own direction": ask only for what is missing (a link to a video or post whose look
  they want, or a few words). Never re-ask what they already said about the look.
- Write the pick into the plan in one line ("Edit style: Minimal") and, for a show, into the
  bible.

## 2. The styles at a glance

| Style | Fits | Feels like | Density (section 3 of picture-plan.md) |
|---|---|---|---|
| Bold Editorial | Countdowns, strong opinions, tips | A magazine spread: one big statement, the layout off-centre | standard |
| Funky Modular | Lifestyle, playful how-tos, lists | Colour-coded blocks that answer each other | rich |
| Luminous Interface | Apps, tools, data, how a system works | Real screens with one signal colour, never a fake dashboard | standard |
| Documentary Collage | History, news, recaps with sources | Real documents and photos pinned around the host | standard |
| Web Brutalism | Hot takes, myth or fact, fast countdowns | Heavy type and hard cuts | rich |
| Minimal | Calm coaching, explainers, one idea | One thing on screen at a time, long holds | light |
| Press | Analysis, reports, comparisons | A printed page: one hard margin, captions under every figure | standard |
| Editorial Overlay | Opinion, commentary, a personal-brand host | The host owns the frame; few words, one accent | light |

## 3. Each style in Video Studio fields

Every text and layer field below is an `add_text` or `add_layer` field (assembly.md). Keep one
look per level of text (hook, labels, source lines) for the whole episode.

**Bold Editorial**
- Hook: `look: "tiktokText"`, `size: "xl"`, `align: "left"`, `position: "top"`. Labels:
  `size: "l"`, the same look and alignment.
- Cards: `width` 0.6, `column` left or right (never centred: the layout leans), `corners:
  "square"`, no border.
- A strong visual for a long beat: `set_split_screen` with `share: "two_thirds"`.
- Captions: `bold`. Cutaways 2.5 to 3.5 s, cut in on the phrase, never eased.

**Funky Modular**
- Labels: `look: "tiktokHighlight"`, `size: "m"`, alternating `align` left and right per part.
- Cards: `corners: "rounded"`, a coloured `border` per kind of thing (one `#RRGGBB` for
  products, another for places), taken from the brand's colours when known. Cards alternate
  `column` left and right, so blocks seem to answer each other.
- Captions: `sticker`. Cutaways 2 to 3 s.

**Luminous Interface**
- Real screenshots and screen recordings only, from the person (supplied-media.md). Cards
  `corners: "rounded"` with ONE signal colour as `border` for the whole episode.
- A recording that needs time: `set_split_screen` `place: "bottom"`, `share: "half"`,
  `sound: false`.
- Texts: `look: "tiktokOutline"`, `size: "m"`. Captions: `minimal`.
- Never generate a screen, a chart or a dashboard to stand in for a real one.

**Documentary Collage**
- Real documents, articles, photos and archive frames as cards: `border: "white"`, `corners:
  "square"`, `width` 0.5 to 0.7, placed in a different `column` each time.
- A source line under a card when the source is real and known: `look: "instagram"`,
  `size: "s"`, for the same stretch as the card ("The Times, 1969").
- Holds 3 to 4 s per document. Captions: `minimal`.
- Never invent a stamp, a date, a headline or a source name.

**Web Brutalism**
- Hook and labels: `look: "tiktokText"`, `size: "xl"`, few words, uppercase, `align:
  "left"`. One idea per text.
- Cards: `border: "black"`, `corners: "square"`, `width` 0.8 or more.
- Cutaways short, 1.5 to 2 s, hard on the word. Captions: `bold`.

**Minimal**
- The hook and at most one text per part: `look: "tiktokOutline"`, `size: "m"`, centred.
- Every text stays at least 2 s after it appears, longer for more words.
- Cards rare, `corners: "rounded"`, no border. Captions: `minimal`.

**Press**
- One margin: every text `align: "left"` at the same `x` (for example 0.08). Hook `size:
  "l"`, labels `size: "m"`, all `look: "tiktokText"`.
- Cards `border: "black"`, `corners: "square"`, each with a figure caption under it
  (`look: "instagram"`, `size: "s"`) saying what it shows.
- Never the same device twice in a row: a card, then a split screen, then a full-screen
  cutaway. Nothing ever sits over the host's face. Captions: `minimal`.

**Editorial Overlay**
- The host keeps the frame. Claims as short texts in `look: "instagram"`, `size: "m"`.
- One accent for the whole episode, marking one thing: a single card with a red `border`
  (`"#D62828"`), on the beat that matters most.
- Every part keeps a stretch of 3 s or more with nothing but the host and the captions.
- Captions: `minimal`.

## 4. Auto

Pick from the topic and say which in one line ("Edit style: Minimal, it suits a calm coaching
show."):

| Topic | Style |
|---|---|
| Tips, countdowns, mistakes | Bold Editorial |
| A lifestyle or playful topic | Funky Modular |
| An app, a tool, data, with real screens from the person | Luminous Interface |
| History, news, a recap, with real sources | Documentary Collage |
| A hot take, myth or fact | Web Brutalism |
| Calm coaching, one idea explained | Minimal |
| An analysis, a report, a comparison | Press |
| Commentary by a host with a strong personal brand | Editorial Overlay |

Without the material a style needs (real screens, real documents), take Minimal.

## 5. Their own direction

- From a link: bring a post in with `import_asset` and look at its cover with
  `preview_assets`. No tool watches a video, so say what you could see and ask for a word
  or two about the rest.
- Translate it into the fields above: the nearest text look, size and place, the caption
  style, the card edges, the cutaway rhythm. Say in one line what you matched and what you
  could not.
- A reference shows a look, never content: never copy its logo, its brand's colours as a
  brand, its words or its graphics.

## 6. What no style can do here

Video Studio texts and layers appear and disappear at a cut. There are no animated entrances
or exits, motion paths, masks, connectors, drawn annotations, counters that roll, per-word
reveals beyond captions, custom fonts or text colours, shapes or rules, tilted cards or glitch
effects. The timings of the original motion profiles (how many milliseconds a reveal takes)
do not apply. When the person asks for animated graphics, say so in one line and offer the
nearest style.
