# Other paths

The default path is one talking take with the person's real screenshots added on top as cards
in Video Studio. These are the other ways an app promo gets made, and when each one fits.

## Contents

1. [Re-film a trend as an app promo (Reshoot)](#1-re-film-a-trend-as-an-app-promo-reshoot)
2. [Why we never film a screen](#2-why-we-never-film-a-screen)
3. [No screenshots: the talking-only version](#3-no-screenshots-the-talking-only-version)
4. [What to ask for](#4-what-to-ask-for)
5. [Neighbouring skills](#5-neighbouring-skills)

## 1. Re-film a trend as an app promo (Reshoot)

**Fits when** a promo is already under way here and the person then brings a TikTok, Reels or
Shorts link to re-film for the app (a trend link that opens the request goes to
`creatorline-reshoot`): a "POV" or reaction trend, a talking trend. One main person on camera;
a crowd behind is fine, a second lead is not (`creatorline-reshoot` has the full guide to
picking a source).

**The call**, priced without `confirm` first, like every run:

```
create_generation
  tool: "reshoot"
  brand_id: <brand>
  inputs:
    source: "<the trend link, or its asset id>"
  prompt: "<the Direction: the new lines about the app, when the words should change>"
  params: { duration: <no longer than the trend video, at most 30> }
```

- Without new lines in the Direction, the trend's own words and sound stay and only the person
  changes. With new lines in quotes, the take says them.
- The app comes in through the edit, never through the take: the real screenshots as cards on
  the lines that name the app, the hook plate and the call to action as text (screen-layouts.md).
  Then the same build steps as the default path: `create_video`, captions, cards, texts,
  `export_video`.
- Do not pass a photo of a phone showing the app or a screen recording as an input: the take
  would film a screen, and a filmed screen comes out redrawn (section 2).
- When the trend had words laid over it and the lines were rewritten, the take comes back with
  its new on-screen text already burned in. Look at it with `preview_assets` before adding a
  hook plate, so the two do not stack.
- Set `duration` between 4 s and the trend video's length (at most 30): the take is billed on
  `duration`, not on how long the source turns out to be.

## 2. Why we never film a screen

The video model draws any website, app, phone screen, laptop, monitor or browser it is asked to
film, and drawn interface text comes out garbled and off-brand. So:

- the take never shows a screen, a phone or a laptop: the avatar talks with empty hands in a
  room with none (promo-scripts.md, section 10);
- every screen the viewer sees is the person's own screenshot, put on as a card;
- never generate, restyle, animate, upscale or invent a screen, and never use a stock mockup or
  a picture of another app.

## 3. No screenshots: the talking-only version

Ask once, in the intake message, with two options:

> 1. I'll send screenshots (recommended)
> 2. Make it without the site

The second, or fewer than 3 usable screenshots after you looked at them:

- The same take and the same three parts, with the app's name and one thing it does said
  plainly.
- The app's name as text over the line that names it, and the call to action at the end
  (screen-layouts.md, section 7).
- If they have a logo file, it can sit as a small card on the line that names the app.
- Say it plainly in the delivery card: "No app screens in this one." Screenshots can be added
  later in Video Studio at no cost for the edit, plus a new export.

This is the only question that may come up in the middle of the work. Never fill the gap with a
generated screen, a stock phone mockup, a web search or a picture of another app.

## 4. What to ask for

One ask, in the intake message, with the reason ("they become the cards that pop up as Mia
talks"):

- **6 to 10 screenshots,** at least 3, ideally the phone version of the site or the app, one per
  section: the home or top of the page with the logo and the menu, the product or the main
  features, the app at work (a dashboard, a search, an editor), reviews, specs, the price or the
  plans.
- **Demo data** on every screen: no real names, emails, messages or balances. No cookie banner
  or pop-up over it.
- **How to send them:** links to the image files themselves, or dropped at
  https://app.creatorline.io/assets (then say "done"). A share link from a cloud drive usually
  opens a page, not the file, and is refused.

We do not capture websites. Never ask the person to record their screen, and never ask for
their login.

## 5. Neighbouring skills

| The person has or wants | Skill |
|---|---|
| Their own promo video with a real person, and the avatar in it instead | `creatorline-character-swap` |
| A trend re-filmed exactly as it is, no app | `creatorline-reshoot` |
| A screen recording with a voice over it and no face | `creatorline-voiceover` |
| A physical product held or reviewed on camera, with no page shown | `creatorline-talking-video` |
| A how-to for a physical product or a technique, in labeled steps | `creatorline-tutorial-video` (steps inside an app stay here) |
| Only the script, an outline or a walkthrough plan | `creatorline-short-script` |
| The finished video posted | `creatorline-publish` |
