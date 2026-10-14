# Video briefs

How to write the `prompt` for a video run. Over MCP, our server's writer turns your `prompt` (the
brief) into the prompt the video model gets. Your job is the idea and the facts the writer cannot
know. Its job is the filmmaking. Do not do its job.

## Contents

1. [What the writer already does](#1-what-the-writer-already-does)
2. [What only you can give](#2-what-only-you-can-give)
3. [The brief template](#3-the-brief-template)
4. [Templates (`ugc_style`)](#4-templates-ugc_style)
5. [Phone style and Cinematic](#5-phone-style-and-cinematic)
6. [Length and shots](#6-length-and-shots)
7. [Speech budget](#7-speech-budget)
8. [Hook, payoff, ending](#8-hook-payoff-ending)
9. [Positives, not negatives](#9-positives-not-negatives)
10. [The claim floor in a brief](#10-the-claim-floor-in-a-brief)
11. [Inputs and how to name them](#11-inputs-and-how-to-name-them)
12. [Real faces and AI faces](#12-real-faces-and-ai-faces)
13. [Defaults and what costs more](#13-defaults-and-what-costs-more)
14. [Other video tools](#14-other-video-tools)
15. [Photo briefs](#15-photo-briefs)
16. [Weak brief, strong brief](#16-weak-brief-strong-brief)

## 1. What the writer already does

On `ugc-video` and `photo-to-video` the writer reads your brief, the avatar's persona (its name,
archetype, bio and tone) and the attached images, then writes a timed shot list. Over MCP that
first version is filmed with no review. It already:

- splits the clip into shots of 3 seconds or more and places the hook, the payoff and the ending;
- writes the spoken lines to fit each shot, in the avatar's persona;
- films it as one phone in a real room, unless the template is `Cinematic`;
- commits to the chosen `ugc_style` template;
- reads a product or landing page when its URL is in the brief, and uses only facts it finds;
- binds every attached image and clip to its role;
- applies the claim floor and turns negatives into positives.

So never send lenses, rigs, lighting setups, shot timestamps, `@Image` headers or a finished
model prompt: they fight the writer or get rewritten. `create_generation` has no word-for-word
mode. A prompt that must reach the model unchanged needs a workflow node with Enhance off
(the workflows skill).

## 2. What only you can give

| Put in the brief | Why |
|---|---|
| The idea in one or two sentences: what happens, and why someone keeps watching | Everything is built from it |
| The one concrete takeaway: the actual tip, number, phrase or thing shown | Without it the clip has a hook and nothing inside |
| Every item you promise: "3 tips" means the three tips themselves | The writer delivers the brief's promise; a missing item gets invented |
| Exact spoken lines in quotes, when the person has them, with "use these lines as written" | Given words are kept |
| The hook line, when the person has one | Otherwise the writer writes it |
| Product facts it cannot see: name, what it does, how it is used, approved claims (product-intake.md), or the product page URL | It never invents claims, so missing facts make a vague video |
| The setting when it matters: the room or place, the light, the time of day | Otherwise the persona and template pick one |
| Wardrobe when it matters | Otherwise the avatar's image decides |
| The spoken language when it is not English | The writer is not told the brand's language |
| "Voice and room sound only" when music is added later or `change_voice` is on | Music under the voice garbles a re-voice and clashes with added music |
| In a scene with other people: who they are, by role and clothing | Unplaced extras can come out looking like the avatar |

## 3. The brief template

Plain sentences, in this order. Skip any line you have nothing for. Most briefs are 40-150
words; a full script can be longer.

```
Idea: <what happens, for whom, in one or two sentences>
Hook: "<the first line>" or <what the first 3 seconds show>
Takeaway: <the one concrete thing the viewer gets>
Lines: "<exact words>" (only when given)
Product: <product card from product-intake.md>. Page: <url>
Setting: <place, light, time of day>
Ending: <the verdict or feeling to land on>
Language: <spoken language>
Sound: voice and room sound only (when music comes later)
```

Write the brief in English. Lines to be spoken go in the spoken language.

## 4. Templates (`ugc_style`)

Set `params.ugc_style` to one of these values, spelled exactly. `Auto` (the default) lets the
writer pick from the brief. A named template is followed hard, so pick one only when the format
is clear.

| Value | Fits | What the writer builds |
|---|---|---|
| `Auto` | An unclear format | The closest format, inferred |
| `Talking head` | Hot takes, tips, advice | Direct to camera, selfie angle, tighter each sentence |
| `Storytime` | A story with a build-up and a twist | Lean-in, a teased secret, the payoff held |
| `Podcast clip` | A two-speaker exchange, a hot take | A seated studio with two desk microphones, cuts between speakers |
| `GRWM` | Talking while doing makeup, hair or an outfit | Bathroom or vanity, the routine between lines |
| `Product ad` | A product review or demo | Product held to camera, label showing, one benefit shown |
| `Unboxing` | Opening a package, first look | Hands and product at medium framing, one slow reveal |
| `Street interview` | A question asked in public | Handheld, a mic in frame, quick question then answer |
| `Day in the life` | Moments through a day | Casual vlog beats |
| `Before & after` | A visible change | The change lands on a cut between two shots |
| `Reaction` | Reacting to something off screen | Chest-up face, one punch-in on the peak |
| `Cinematic` | A polished brand film or launch reveal | Dramatic light, slow moves, little dialogue |
| `Keyframes` | Rebuilding a video from its frames | Each supplied frame anchors a shot, in order; its on-screen text is kept |

- `Podcast clip` and `Street interview` bring their own set. Pick them only when that set is
  wanted.
- `Before & after` with an avatar is a look, setup or styling change shown on camera, never a body
  or skin result (section 10).
- `Keyframes`: pass the frames in order in one image slot (for example `objects`), besides the
  avatar.

## 5. Phone style and Cinematic

Every template except `Cinematic` is filmed as one phone in a real room: held or propped,
available light, jump cuts in the same place, a little imperfect. That is what makes UGC work.
Use `Cinematic` only when the person asks for a polished, filmic look. Never put film words in a
UGC brief (cinematic, dolly, drone, gimbal, studio lighting, slow motion, color grade): the writer
drops them, or they fight the template.

## 6. Length and shots

The default model films several shots inside one take and cuts between them. Every shot needs at
least 3 seconds; a shorter beat is merged or dropped.

| Length | Shots | Good for |
|---|---|---|
| 5-6 s | 1-2 | One reaction, a loop |
| 8-10 s | 2-3 | Quick takes, one product moment |
| 12-15 s | 3-5 | Reviews, tips, a short story |
| 20-30 s | 6-8 | Tutorials, storytime, two-part takes |
| over 30 s | sections | Episodes (the AI host skill) |

- Ask for no more beats than the seconds hold: about one beat per 3-4 seconds.
- Past 20 seconds the writer builds sections, each with its own small hook, joined by a spoken
  hand-off.
- One take holds up to 30 s on the default model and 15 s on Seedance 2.0. A longer clip is filmed
  as several takes and joined; each join is a fresh render where the face can drift a little.
  Prefer one take.
- `duration` is whole seconds. The default is 10.

## 7. Speech budget

People speak about 2.5 words per second. Lines that overrun get rushed or cut. Lines that
underrun leave silence that viewers scroll past.

| Clip | Words spoken |
|---|---|
| 5 s | 12-18 |
| 10 s | 22-30 |
| 15 s | 30-45 |
| 20 s | 45-60 |
| 30 s | 65-90 |

Per shot: 3 s holds 7-11 words, 4 s 9-14, 5 s 12-18, 6 s 14-21. A shot where the avatar also
handles the product loses about 2 words.

When the person's script is over budget, trim it or lengthen the clip, and tell them which.
Write lines as speech: contractions, short sentences. Skip filler the writer removes anyway
("literally", "game changer", "obsessed").

## 8. Hook, payoff, ending

- **Hook, 0-3 s.** The most specific moment of the clip: an event, a result shown, a number, a
  bold opinion, already mid-motion. No greeting, no intro, no logo.
- **Payoff, 50-75% of the way in.** The answer to the hook, with something not said yet.
- **Ending, the last 2-3 s.** A verdict on what was shown. No new claim, no call to action.
- A call to action ("link in bio", "follow for part 2") goes in the post caption or as Video
  Studio text, not in the spoken ending: the writer turns a spoken call to action into a verdict.
- Give the writer the hook and the takeaway. It builds the middle.

## 9. Positives, not negatives

Video models draw what you name, even after "no". Describe what is there.

| Instead of | Write |
|---|---|
| no logo on the shirt | a plain grey t-shirt |
| don't hide the label | label facing the camera |
| no smiling | a calm, straight face |
| no music | voice and room sound only |
| no messy background | a tidy white kitchen counter |

The one safe negative is a body part staying still: "her left hand stays on the counter".

## 10. The claim floor in a brief

The avatar is synthetic and has no past (house-rules.md, section 7). Never write a brief that
asks for a personal result.

| A brief that asks for | Rewrite as |
|---|---|
| "She says it cleared her acne in two weeks" | "She points to the salicylic acid on the label and says why it suits oily skin" |
| "He lost weight with it" | "He reads the protein per bar off the pack and eats one after a workout" |
| "A happy customer's review" | "A creator demo of how it is used" |
| "Before and after her skin" | "Before and after her makeup look, changed on camera" |

Numbers and comparisons only when printed on the label or on the approved claims list
(product-intake.md).

## 11. Inputs and how to name them

The avatar goes in by itself (`include_avatar` defaults to true). Other inputs go in `inputs` by
slot key, as an asset id or a direct file URL. The slots of the default `ugc-video` model:

| Slot | Holds | Name it in the brief |
|---|---|---|
| `characters` | the avatar (added first, by itself); a second person's image after it | `@Avatar1`, `@Avatar2` |
| `objects` | product photos, props | `@Object1`, `@Object2` |
| `location` | a photo of the place | `@Location1` |
| `source_video` | short clips to copy motion or pacing, a screen recording to show | `@Video1` |
| `audio_urls` | a voice track for the avatar to say | `@Audio1` |

- Numbers follow the order of the files inside each slot.
- Say what each input is for: "@Avatar1 holds @Object1 at chest height, label to camera." An
  unexplained input gets a guessed role.
- With `@Audio1`, write "@Avatar1 says @Audio1" and do not write the words out.
- Slot keys differ per model: read them from `list_models`. `veo3-1-reference-to-video` and
  `xai-grok-imagine-reference-to-video` take plain `image_urls` and never add the avatar.

## 12. Real faces and AI faces

| Who is on camera | Pass `model` |
|---|---|
| A Creatorline avatar (an AI face) | Nothing: the tool's default model (Seedance 2.5) |
| A real person's photo, with their consent | `bytedance-seedance-2-0-reference-to-video` on `ugc-video`, `reshoot-seedance-2-0` on `reshoot`; one take holds 15 s |

- The default model refuses real faces, also inside `source_video` clips. `ugc-video` has no
  automatic fallback, so choose Seedance 2.0 up front. Reshoot re-films a refused take on 2.0 by
  itself when the take is 15 s or shorter.
- To keep a real video and swap its people for avatars, use Character Swap, not a `source_video`
  reference.

## 13. Defaults and what costs more

| Param | Default | Change it when |
|---|---|---|
| `aspect_ratio` | `9:16` | The destination needs another frame |
| `duration` | `10` | The format needs it (section 6) |
| `resolution` | `720p` | The person wants it sharper: `1080p` costs about 2.5 times as much |
| `ugc_style` | `Auto` | The format is clear (section 4) |
| `generate_audio` | `true` (Seedance models) | The clip should be silent (b-roll under a voiceover) |
| `change_voice` | `false` | The avatar has a cloned voice, the clip has one speaker and no music. Charged on its own |

- Read each tool's default model and allowed values from `list_models`. Never guess a value.
- The price rises with more seconds, `1080p`, reference video seconds and `change_voice`. The
  `needs_approval` answer gives the exact number.
- For a first try keep it short and `720p`. Go longer or sharper once the idea works.

## 14. Other video tools

**`photo-to-video`** animates one image in one continuous take: never ask for a cut. The brief
says only what MOVES: the action, the expression, one camera move (locked, a slow push-in or a
slight handheld drift), and a spoken line if any. Never describe what the image already shows.
An optional end frame sets where the take lands. Speech per beat: 2 s 5-7 words, 3 s 7-10, 4 s
10-13, 5 s 12-17. For a precise look, get the still right with `photo-edit` first, then animate
it once.

**`text-to-video`** films from words alone, with no avatar and no image. Its writer does not build
a shot timeline, so describe one scene fully: the subject, the place and light, the one main
action, one camera move, the sound. Use it for b-roll and scenes without the avatar.

**`reshoot`** does not use the writer above: it plans its own cut from the source video. `prompt`
is an optional Direction; empty means the same video with the avatar. With `objects` or
`source_video` attached, say in words what each is for: "the avatar presents the product photo
instead of the cup in the video". Put new lines in quotes only when the words should change.

**`character-swap`** takes no brief. Transfer (`character-swap-transfer`) takes an optional
Direction: what the avatar wears instead of the video's outfit, what each `other_elements` image
is for. Replace (`character-swap-replace`) takes no prompt and refuses one.

**`motion-control`** takes no prompt. The moves come from the motion video.

## 15. Photo briefs

The same server writer turns `photo-edit` and `text-to-photo` briefs into image prompts.

- **A person appears only when the brief asks for one.** For a photo of the avatar on
  `photo-edit`, say so: "the avatar sitting at a cafe table, holding the product". A brief about a
  product, a place or food comes out with no one in it.
- **No person wanted:** pass `include_avatar: false` and mention no one.
- `text-to-photo` cannot show the avatar. Every picture of the avatar is `photo-edit`.
- The photo writer is not phone-locked. For a casual look say "casual phone photo, natural
  light". For a polished shot name the light and the surface: "soft window light, light oak table".
- Words inside an image come out best on `gpt-image-v2-edit`. Words that must be exact belong in
  Video Studio text or the post caption.

## 16. Weak brief, strong brief

Weak: "Make a cool cinematic video of Mia talking about our serum, make it go viral, no logo."
"Cinematic" fights the phone style, "viral" says nothing, "no logo" invites one, and there is no
takeaway and no fact.

Strong, with `ugc_style: "Product ad"`, `duration: 12` and the serum photo in `objects`:

```
Idea: @Avatar1 shows a vitamin C serum for dull skin at her bathroom sink in the morning.
Hook: "If I could keep one step of my routine, it's this one."
Takeaway: two drops on dry skin, before moisturizer, every morning.
Product: Glow C Serum (@Object1), 15% vitamin C printed on the label, glass dropper bottle that
fits in one palm.
Ending: a calm verdict, bottle in hand, label to camera.
Language: English.
```
