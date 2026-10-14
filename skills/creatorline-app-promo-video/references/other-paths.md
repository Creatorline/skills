# Other paths

The default path is one talking take with the real screens added on top in Video Studio. These
are the other ways an app promo gets made, and when each one fits.

## Contents

1. [Re-film a trend as an app promo (Reshoot)](#1-re-film-a-trend-as-an-app-promo-reshoot)
2. [The phone-in-hand shot](#2-the-phone-in-hand-shot)
3. [No screens: the talking-only version](#3-no-screens-the-talking-only-version)
4. [What to ask for when there are no screens yet](#4-what-to-ask-for-when-there-are-no-screens-yet)
5. [Neighbouring skills](#5-neighbouring-skills)

## 1. Re-film a trend as an app promo (Reshoot)

**Fits when** a promo is already under way here and the person then brings a TikTok, Reels or Shorts link to re-film for the app (a trend link that opens the request goes to `creatorline-reshoot`): a
"POV" or reaction trend, a talking trend, a "look at my phone" moment. One main person on
camera; a crowd behind is fine, a second lead is not (`creatorline-reshoot` has the full guide
to picking a source).

**The call**, priced without `confirm` first, like every run:

```
create_generation
  tool: "reshoot"
  brand_id: <brand>
  inputs:
    source: "<the trend link, or its asset id>"
    source_video: ["<the screen recording's asset id>"]       (optional, up to 3)
    objects: ["<a photo of a phone showing the app>"]         (optional, see below)
  prompt: "<the Direction>"
  params: { duration: <no longer than the trend video, at most 30> }
```

**What changes and what stays.**
- Without `objects`, the trend's own words and sound stay and only the person changes. The app
  then comes in through the edit: the real screens over the phone moments, the app's name and
  the call to action as text.
- With an `objects` image, the take treats it as the product she presents instead of the one in
  the video, and rewrites the spoken lines about it. For an app, that image is a clean photo of
  a phone showing the app's home screen. This fits a trend that already shows something held
  up to the camera.
- `source_video` is footage to show inside the take: the screen recording.
- The Direction is required as soon as anything is attached. It says in plain words what each
  attached item is for, for example: "She presents the phone from the product photo instead
  of the skincare bottle; the lines are about Fernly, a budgeting app. When she turns the
  phone to the camera, its screen plays the screen recording."

**The screen in the take is redrawn.** The model films the phone and its screen itself, so
shapes and colours stay close but small text does not. Anything the viewer must read goes over
those moments in the edit, as a card or a cutaway (screen-layouts.md). Then the same build
steps as the default path: `create_video`, captions, screens, texts, `export_video`.

- When the trend had words laid over it and the lines were rewritten, the take comes back with
  its new on-screen text already burned in. Look at it with `preview_assets` before adding a
  hook text, so the two do not stack.
- Set `duration` between 4 s and the trend video's length (at most 30): the take is billed on
  `duration`, not on how long the source turns out to be.

## 2. The phone-in-hand shot

The talking take itself can hold a phone that plays the recording: pass the recording in the
take's `inputs` as `source_video: ["<recording asset id>"]` and say in the brief what it is
for: "@Avatar1 holds her phone up to the camera; its screen plays @Video1." The model redraws
the screen, so use it only for a short "look at this" moment where nothing has to be read, and
still put the real screens on top for the rest. Each second of reference video adds to the
price, so use a short recording of just that moment, at least 2 s (ask the person for one
when theirs is long).

## 3. No screens: the talking-only version

When the person cannot send screens and wants the video anyway:

- The same take and the same four beats, with the app's name and one feature said plainly.
- The app's name as text over the line that names it, and the call to action at the end
  (screen-layouts.md, section 8).
- If they have a logo file, it can sit as a small card on the line that names the app.
- Say it plainly in the delivery card: "No app screens in this one." Screens can be added later
  in Video Studio at no cost for the edit, plus a new export.

Never fill the gap with a generated screen, a stock phone mockup, or a picture of another app.

## 4. What to ask for when there are no screens yet

One ask, in the intake message, with the reason:

- 2 to 6 screenshots: the home screen with the app's name, the main feature in use, and the
  result it produces. From a phone when the app is a phone app; for a website, the phone
  version of the site reads better than the desktop one.
- Or a screen recording of the one flow worth showing, 10 to 30 seconds, up to 100 MB.
- Demo data on every screen: no real names, emails, messages or balances.
- How to send them: links to the files themselves, or dropped at
  https://app.creatorline.io/assets (then say "done"). A share link from a cloud drive usually
  opens a page, not the file, and is refused.

We do not capture websites, and we never ask for the person's login to their app.

## 5. Neighbouring skills

| The person has or wants | Skill |
|---|---|
| Their own promo video with a real person, and the avatar in it instead | `creatorline-character-swap` |
| A trend re-filmed exactly as it is, no app | `creatorline-reshoot` |
| A screen recording with a voice over it and no face | `creatorline-voiceover` |
| A how-to for a physical product or a technique, in labeled steps | `creatorline-tutorial-video` (steps inside an app stay here) |
| Only the script | `creatorline-short-script` |
| The finished video posted | `creatorline-publish` |
