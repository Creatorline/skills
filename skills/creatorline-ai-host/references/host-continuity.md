# Host continuity

How to film several parts that look and sound like one host in one place: the continuity kit,
the set, the part brief, the voice, the seams. The script and its parts come from
episode-formats.md; how the server's writer turns a brief into a take is video-briefs.md. For
the opt-in studio look with written camera setups, see studio-takes.md.

## Contents

1. [The continuity kit](#1-the-continuity-kit)
2. [Choosing the set](#2-choosing-the-set)
3. [Writing a set photo](#3-writing-a-set-photo)
4. [The part brief](#4-the-part-brief)
5. [Worked example: three parts and a sign-off](#5-worked-example-three-parts-and-a-sign-off)
6. [Wardrobe](#6-wardrobe)
7. [Seams](#7-seams)
8. [One voice across parts](#8-one-voice-across-parts)
9. [Two hosts](#9-two-hosts)
10. [A host from a real person's photo](#10-a-host-from-a-real-persons-photo)
11. [A stronger lock](#11-a-stronger-lock)

## 1. The continuity kit

Each part is its own render. What keeps them one show is what you send the same way every
time. Write the kit once (for a series, it lives in the bible) and paste it word for word.

| Item | Where it goes | Example |
|---|---|---|
| Host | `avatar_id`, the same in every part | Mia |
| Set | `inputs.location` = the set photo, named `@Location1`, plus one set sentence | "@Avatar1 sits at the light oak desk in @Location1." |
| Wardrobe | One sentence | "@Avatar1 wears exactly the outfit from her photo." |
| Camera | One sentence; only the opening size changes per part (section 7) | "Phone propped at eye level across the desk." |
| Light | One sentence | "Soft light from the left, the lamp on the shelf glowing." |
| Voice | One sentence (section 8) | "Speaks from the low end of her range and keeps coming back to it..." |
| Feel | One sentence | "Unpolished and alive: small breaths between phrases, blinks that ignore the rhythm of the words, a soft rustle when she moves, her head settling just after the last word; quiet room tone, a close phone mic." |
| Template | `params.ugc_style` | `"Talking head"` in every part |
| Frame | `params.aspect_ratio`, `params.resolution` | `"9:16"`, `"720p"` in every part, never mixed |
| Sound | One line | "Sound: voice and room sound only." |

- `Auto` lets the writer pick a format for each take, so parts can come out as different
  formats. Name the template. `Storytime` and `Podcast clip` carry music cues, and `Podcast
  clip` builds a two-microphone studio with a guest. `Talking head` suits a solo host.
- `Cinematic` only when the person asks for a polished film look, then in every part. It
  brings little dialogue, so a talking host with a studio look goes the studio-takes route.
- The Feel line is a few signs of life, not a list: more of them reads as acting. Never change
  it between parts.
- `1080p` costs about 2.5 times `720p` per second; if the person wants it, every part uses it.

## 2. Choosing the set

The set is asked in the intake of a first episode (SKILL.md, step 2). The kinds:

| Kind | What it is |
|---|---|
| A lived-in room (recommended) | A room that fits the niche, the wall behind the host full of things: a home office, a kitchen corner, an editing room |
| An armchair in a lounge | The host in one armchair, the room around them |
| A studio backdrop | A seamless backdrop shaped only by light, and a table |
| A plain painted wall | One wall, one colour |
| Their own room | A photo of a real room, nobody in it |
| The avatar photo's own background | No set photo: the takes build the room from the avatar's photo and the brief, so it can differ between parts. Offer it only when that photo shows a real room filling much of the frame; a portrait, a selfie or a tight crop needs a set |

**Candidates, then a pick.** A new set is made as four candidates in one call:
`generate_text_to_photo` `{brand_id, prompt, count: 4}`. No `avatar_id`:
this tool draws from words alone and refuses one. Its frame is 9:16 by default. Show all four
together (`preview_assets` with the four output asset ids, then one line each with a link) and
wait for the person to pick one, or to ask for more (a new priced call, with what they said
changed in the prompt). Never pick one yourself, not on silence and not on "just do it": the
set is the show's look for every episode.

**Their own room**: a photo link with nobody in it, brought in with `import_asset` (`url`,
`brand_id`, `title: "<Show> set"`). A photo attached in the chat cannot reach the connector:
they drop it on https://app.creatorline.io/assets, then you find it with `list_assets`.

**A running series**: its set photo, found with `list_assets` (`brand_id`, `file_type:
"image"`, `search` with words from its description), checked with `preview_assets`.

## 3. Writing a set photo

Describe only the room, and say that nobody is in it. A person in the set photo becomes the
host: in measured takes, a set with a stand-in person in it made the host's face match the
stand-in instead (face similarity about -0.05), while a named, empty set kept it as close as
two photos of the same person (0.81 to 0.91 against a same-person range of 0.76 to 0.82). Named
in the brief matters too: attached but never named, the room came out about half the time.
Studio backdrops kept the face slightly better (about 0.90) than rooms (0.81 to 0.85), and how
full the room was made no difference.

**By kind**:

- **A lived-in room**: the wall is busy all the way across, behind the head too. Things at
  three sizes: big (a shelving bay, a pin board, a tall plant), middle (boxes, binders, jars, a
  clock), small (pinned cards, little frames). Every prop on a named piece of furniture on a
  named side ("a stack of binders on the left end of the shelf"). An editing-room variant:
  desks, acoustic panels, dark monitors, a desk lamp.
- **A studio backdrop**: a pale sweep written as a colour ("dove grey, deepening to slate in
  the corners, curving down into the table"), or one pool of colour on near black. Never
  "white" or "bright": it blows out. Add a wide, sharp, empty tabletop across the lower third,
  warm mid-grey and matte, a little darker than a face.
- **An armchair in a lounge**: one freestanding armchair with visible arms, the room visible on
  both sides, one small low table no wider than the chair. No sofa: its back cuts through the
  host's head. Seen from a little farther back.
- **A plain painted wall**: a named colour, plaster texture, light falling off gently, and one
  architectural detail (a skirting board, or a corner), or the model builds a studio cove
  instead. On the studio-takes route, warn once that the side angles show only the host and
  the wall.

**Light and exposure, by leaving words out.**

- Never write bright, brightest, daylight, sunlit, flooding, or a visible window: a written
  window becomes a burnt-out patch that washes the wall. Asking to "keep highlight detail" made
  it worse, not better.
- Make the room read light through its materials (chalk plaster, birch, oatmeal linen, oyster,
  terracotta, walnut) and give it one dark anchor (a black chair, dark frames).
- One light sentence: "soft light from the left" for a room, "even light from the front left"
  for a studio.
- Everything sharp from the desk to the wall (about a 35 mm view at f/4). Never ask for a
  blurred background or for a clear patch of wall behind the head.

**Props and furniture.**

- Put in every prop the host may touch or lean toward: a desk microphone, a mug, a notebook.
  Takes show only the props the set photo shows; a prop named only in words is drawn badly (a
  microphone floating with no stand). The host leans toward a desk microphone, never holds it.
- A desk or table across the full width, filling the bottom quarter, and a chair with its back
  height stated. Without them an empty set's camera sinks to tabletop height (seen four times
  even with heights in centimetres). A studio backdrop has nothing to judge size by, so the
  table swells and the chair shrinks: name the chair and the table's width against it.
- Screens dark, no posters or packaging with words, no logos: printed words come out garbled.

**Colours against the outfit.** Look at the host's outfit in the avatar's photo, then pick
the chair's colour (first) and the wall's (second) so the outfit stands clear of both.

**Before filming**, look at the picked set with `preview_assets`: nobody in it, nothing
written, the camera at seated eye level. Whatever is wrong in the set is copied into every
part, one for one, so fix it here; a new set photo is a new quote.

Example (a lived-in room):

```
An empty home office corner for a talking-to-camera video, nobody in it, seen from a phone at
seated eye level. A light oak desk runs the full width across the bottom quarter, a closed
notebook on its left end and a small ceramic plant pot on its right. A charcoal desk chair
with a high back. Behind it, a sage green chalk-plaster wall: on the left a walnut shelving
bay with books, boxes and a dark ceramic vase; on the right a cork pin board with pinned
cards and a round clock. Soft light from the left, a warm lamp glowing on the shelf.
Everything in focus. Vertical frame.
```

## 4. The part brief

Plain sentences in this order (video-briefs.md, section 3, has each line's job):

```
Idea: An episode of <Show>, a <format> about <topic>, hosted by @Avatar1 talking straight
to the phone <like ...: the host's manner in a few words>. This stretch <opens on the hook and
gives item one | gives item two | gives item three and the verdict>.
Lines (use these lines as written): "<this part's exact words>"
Setting: <set sentence with @Location1>. <light sentence>
Wardrobe: <wardrobe sentence>
Camera: <camera sentence>, opening <waist-up | chest-up>.
Performance: <energy in a few words>; on "<short exact phrase>" <one gesture>.
Voice: <the kit's voice sentence>
Feel: <the kit's feel sentence>
Ending: <parts before the last: lands on the hand-off line, energy still up | last part: a calm
verdict and a held look to the phone, chest-up>
Language: <spoken language>
Sound: voice and room sound only.
```

The call, `generate_ugc_video`:

```json
{
  "brand_id": "<brand>",
  "avatar_id": "<host>",
  "prompt": "<the brief>",
  "inputs": { "location": "<set photo asset id>" },
  "params": { "ugc_style": "Talking head", "duration": 20, "aspect_ratio": "9:16", "resolution": "720p" }
}
```

**Duration.** `duration` = the larger of 4 and (60 × the part's words ÷ the pace + seconds
held on purpose + 0.4), rounded up. The pace is 150 words a minute unless the episode's pace is
set otherwise (episode-formats.md, section 4). Count only the spoken lines, and numbers and
short forms as they are said ("15%" is two words, "fifteen percent"). The 0.4 s covers the first sound and the close. Never add a second per
cut (the voice runs on through cuts), and never pad: given spare silence, the model slows the
delivery to fill it. Over 30: split the part at a complete thought.

**Performance.** One gesture per part is enough for the writer to build on:

- tie it to a short exact phrase from the lines; it rises, lands on the stressed word, and
  releases into a new relaxed position, not back to where it started;
- size it to the energy of the line; never a gesture on every word;
- only what the framing shows: hands in a waist-up opening, face and shoulders when closer;
- never ask the host to hold or return to the pose in their photo: the photo sets the look,
  not a pose. Later parts carry on from where the movement was.

**What never goes in a brief.**

- A description of the host's face, hair, age, build or skin: the avatar's image carries it,
  and words make the model redraw the face.
- The product's colour, material, logo, printed words or price: its photo carries the look
  (supplied-media.md, section 6).
- Cuts, lenses, timestamps or shot lists: the writer builds the shots inside each part.
- Captions, titles, cutaways, cards, split screens, on-screen text or room left for a
  graphic: all of it is added in Video Studio.
- Part numbers, ids, notes to the person or a call to action.

A part that shows the product adds `"objects": ["<product photo asset id>"]` to `inputs` and
names it `@Object1` with what the host does (supplied-media.md, section 6).

## 5. Worked example: three parts and a sign-off

The episode from episode-formats.md, section 9. The kit:

- Set: "@Avatar1 sits at the light oak desk in @Location1."
- Light: "Soft light from the left, the lamp on the shelf glowing."
- Wardrobe: "@Avatar1 wears exactly the outfit from her photo."
- Camera: "Phone propped at eye level across the desk."
- Voice: "Speaks from the low end of her range and keeps coming back to it; each sentence ends
  lower than it starts; energy goes into pace and crisp consonants, not pitch."
- Feel: as in section 1.

**Part 1** (`duration: 20`):

```
Idea: An episode of Speak Up Sundays, a countdown about sounding confident in meetings, hosted
by @Avatar1 talking straight to the phone like a calm, sharp coach. This stretch opens on the
hook and gives phrase one.
Lines (use these lines as written): "Three phrases that make you sound sure of yourself in any
meeting. Number one. Swap 'I think maybe we could' for 'My recommendation is.' Same idea, but
now it sounds like a decision. Try it once this week. Phrase two is the one most people get
backwards."
Setting: @Avatar1 sits at the light oak desk in @Location1. Soft light from the left, the lamp
on the shelf glowing.
Wardrobe: @Avatar1 wears exactly the outfit from her photo.
Camera: Phone propped at eye level across the desk, opening chest-up.
Performance: focused and warm; on "sounds like a decision" her right hand opens toward the
phone, then settles on the desk.
Voice: Speaks from the low end of her range and keeps coming back to it; each sentence ends
lower than it starts; energy goes into pace and crisp consonants, not pitch.
Feel: Unpolished and alive: small breaths between phrases, blinks that ignore the rhythm of the
words, a soft rustle when she moves, her head settling just after the last word; quiet room
tone, a close phone mic.
Ending: lands on the hand-off line with a small knowing look, energy still up.
Language: English.
Sound: voice and room sound only.
```

**Part 2** (`duration: 17`): the same brief with "This stretch gives phrase two", part 2's
lines, "opening waist-up", a gesture on "belongs in the room", and "Ending: lands on the
hand-off line, leaning in slightly."

**Part 3** (`duration: 19`): "This stretch gives phrase three and closes with a verdict", part
3's lines, "opening waist-up", a gesture on "usually owns it", and "Ending: a calm verdict and
a held look to the phone, chest-up."

**Sign-off** (`duration: 5`, filmed once for the series; 1 s of held smile counted in):

```
Idea: The closing line of the show Speak Up Sundays, used at the end of every episode.
@Avatar1 says it warmly to the phone and holds a small smile.
Lines (use these lines as written): "That's Speak Up Sundays. See you next Sunday."
Setting, Wardrobe, Voice, Feel: as above.
Camera: Phone propped at eye level across the desk, opening waist-up.
Ending: a held smile to the phone, chest-up.
Language: English.
Sound: voice and room sound only.
```

(Write "Setting, Wardrobe, Voice, Feel" out in full in the real brief.)

## 6. Wardrobe

- Never asked. Say it: "Mia wears the outfit from her photo, which keeps her looking the same
  in every part." The photo's own clothes are the safest way to keep the host the same.
- A show outfit the person asks for: warn once that clothes drawn from words can loosen the
  likeness, then name it plainly and the same way in every part ("a navy crew-neck sweater").
  Change the garment, not just its colour, when it should differ from the photo, and prefer
  crew necks: wide necks slide off a shoulder between parts.
- Never change the outfit between parts of one episode. A series may change it per season,
  not per episode.

## 7. Seams

A seam is where two parts meet. In the phone look it is a jump cut in the same room, and
viewers accept it. Make each seam a real change of size: the writer ends a part no tighter
than chest-up, so the next part opens one size wider ("opening waist-up"). The phone look has
one camera, so the size is the only thing that changes; a different angle at each seam is the
studio-takes route.

| At the seam | Fix |
|---|---|
| The same framing on both sides | The next part opens one size wider |
| A pause, or the host settling before speaking | Trim the silence from the caption times (assembly.md, section 5) |
| The same words twice | The hand-off ends one part; the next opens on new words |
| The face, hair or outfit shifts | Re-film the part that is off (review.md, section 12), or cover the seam with a cutaway from 1 s before to 1 or 2 s after |
| The room or light shifts | The same set photo and the same set and light sentences in every part |
| The energy drops | End parts on the bridge line with energy up, not on a settled verdict |

## 8. One voice across parts

Every take makes its own voice from the avatar's picture and the brief, so two parts can sound
like two people. Pick the route in the plan and state it.

| Route | When | How |
|---|---|---|
| Voice match (default) | The host has a `voice_id` (`get_avatar`) | Film the parts with their own sound, then re-voice each in Video Studio: `change_clip_voice` `{video_id, clip_id, voice_id}` (assembly.md, section 3). Words, timing and lips stay; the voice becomes the avatar's own. Needs one clear voice and no music in the take. |
| Voice match, chosen voice | The host has no `voice_id` | Pick one voice with `list_voices` (`search` with the host's gender, age and manner, such as `calm female 30s`) and match every part to it. Name it in the plan. Say once that the avatar can keep a voice of its own, set in the app (https://app.creatorline.io/avatars). Never use the brand's `voice_id` here: it belongs to the brand's default avatar. |
| Voice first | The words must be exact (a sponsor read, a legal line, a script the person wants word for word) | See below. |
| No match | The person drops the voice match from the quote | Keep parts few (2 or 3) and say once that the parts may sound slightly different. |

**The Voice line.** Voice match replaces the sound of the voice but keeps the take's pace,
stress and melody, so the brief's Voice line still shapes the delivery.

- Write what the voice does, physically: where in the range it sits, where it resonates, its
  tempo, how pitch moves across a sentence, which words carry stress, how loud. "Warm" or
  "confident" direct nothing.
- One dominant per host: weight and calm, or brightness and speed. Mixed, they average into an
  announcer.
- Statements, never conditions: "if excited, she speeds up" is ignored.
- Never take the voice from the host's looks, never give an accent unless asked, and never
  name a register ("upper", "light"): say where a sentence starts, where it comes back to,
  and which word is lowest.
- Weight: "Speaks from the low end of her range and keeps coming back to it; each sentence
  ends lower than it starts, the last two words lowest and slowest; energy goes into pace and
  crisp consonants, not pitch."
- Brightness: "Speaks forward in the mouth, quick inside each phrase, the stressed word
  stepped up, sentences finishing level; loud on the key word, quieter around it."

**Voice first**, part by part:

1. `generate_text_to_speech` `{brand_id, prompt: "<the part's exact lines>", params:
   {voice_id: "<host voice_id>"}}`. The `prompt` is read word for word.
   Always pass `voice_id`: left out, the line may be read in a voice that is not the host's.
2. Wait with `get_generation`; note the audio's `asset_id` and `duration_sec`.
3. The part: `generate_ugc_video` with `inputs: {location: ..., audio_urls: ["<audio asset id>"]}`,
   `duration` = the audio's seconds + 0.4, rounded up (at least 4), and in the brief "@Avatar1 says @Audio1"
   in place of the quoted lines. No Voice line: the audio is the only voice.
4. Film part 1 and check the lip sync before filming the rest.
5. No voice match afterwards: the voice is already the avatar's.

Each part then has two paid items (the voice line and the take): quote both.

## 9. Two hosts

- **Alternating parts** (recommended): host A films parts 1 and 3, host B part 2, each part
  with its own `avatar_id`, the same set photo and camera sentence. Voice match each part with
  its own host's `voice_id`. The hand-off names the other host ("Leo has the second one.").
- **Both in one frame**: add the second avatar's photo (`get_avatar` → `image_url`) to
  `inputs.characters`; the host goes in first by itself, so the brief names them `@Avatar1` and
  `@Avatar2`, says who sits where, and labels the lines "Mia:" and "Leo:". A take with two
  voices cannot be voice matched (a second voice comes out garbled), so keep such parts few
  and short.

## 10. A host from a real person's photo

Only the person themself, or someone who agreed (house-rules.md, section 7).

1. Bring the photo in (`import_asset`) and look at it (`preview_assets`): the eyes, nose and
   mouth must be clear. Tell the person what you saw in one line (a hand near the face is
   worth a mention; it adds no question). A video of the person is no substitute here: ask
   for a clear photo.
   - Clear and well framed: use it.
   - Clear but a weak start (a selfie, a tight crop, little room around the person): offer
     three choices in one message: make an avatar from it in the app (best for a series: a
     lasting face and voice), use it as it is with a set photo, or host with one of the
     brand's avatars. Wait for the answer.
   - Hidden, blurred or tiny: ask for a better photo, or offer an avatar. Never try to rescue a
     missing face with a paid run.
2. A real person's photo, with their consent, films on
   `model: "bytedance-seedance-2-0-reference-to-video"` (the default model is for AI faces),
   `include_avatar: false`, the photo in `inputs.characters` (video-briefs.md, section 12).
   One take holds 15 s, so every part stays at 15 s or less.
3. Never describe the person's face, age, build, ethnicity or hair in a brief: the words pull
   the face toward them (tidier, younger, flatter). Wardrobe, room and behaviour only.
4. Their clothes from the photo stay (say so); a change they ask for gets the one warning of
   section 6.
5. Their own voice: a recording of them, with their consent, becomes an avatar voice in the
   app. Otherwise voice match to a chosen voice, or keep the takes' own voices.

## 11. A stronger lock

When a part drifts from part 1 twice (face, outfit or room), part 1 itself can travel with the
next take: add its output to `inputs.source_video` and say what it is for: "@Avatar1 is the
same person, in the same outfit and room, as in @Video1". Every second of a reference video
adds about 0.6 of the take's per-second rate, so quote it, and use it for the parts that need
it, not as a default. The writer reads a reference video for pace and energy first, so the
gain is not certain: check the result as in review.md, section 5.
