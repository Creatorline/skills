# Host continuity

How to film several parts that look and sound like one host in one place: the continuity kit,
the set photo, the part brief, the voice, the seams. The script and its parts come from
episode-formats.md; how the server's writer turns a brief into a take is video-briefs.md.

## Contents

1. [The continuity kit](#1-the-continuity-kit)
2. [The set photo](#2-the-set-photo)
3. [Wardrobe](#3-wardrobe)
4. [The part brief](#4-the-part-brief)
5. [Worked example: three parts and a sign-off](#5-worked-example-three-parts-and-a-sign-off)
6. [One voice across parts](#6-one-voice-across-parts)
7. [Seams](#7-seams)
8. [Two hosts](#8-two-hosts)
9. [Checking the takes](#9-checking-the-takes)
10. [A host from a real person's photo](#10-a-host-from-a-real-persons-photo)

## 1. The continuity kit

Each part is its own render. What keeps them one show is what you send the same way every
time. Write the kit once (for a series, it lives in the bible) and paste it word for word.

| Item | Where it goes | Example |
|---|---|---|
| Host | `avatar_id`, the same in every part | Mia |
| Set | `inputs.location` = the set photo, named `@Location1`, plus one set sentence | "@Avatar1 sits at the light oak desk in @Location1." |
| Wardrobe | One sentence | "@Avatar1 wears exactly the outfit from her photo." |
| Camera | One sentence | "Phone propped at eye level across the desk." |
| Light | One sentence | "Soft light from the left, the lamp on the shelf glowing." |
| Template | `params.ugc_style` | `"Talking head"` in every part |
| Frame | `params.aspect_ratio`, `params.resolution` | `"9:16"`, `"720p"` in every part, never mixed |
| Sound | One line | "Sound: voice and room sound only." |

- `Auto` lets the writer pick a format for each take, so parts can come out as different
  formats. Name the template.
- `Storytime` and `Podcast clip` carry music cues, and `Podcast clip` builds a two-microphone
  studio with a guest. `Talking head` suits a solo host in every format of episode-formats.md.
- `Cinematic` only when the person asks for a polished film look, then in every part.
- `1080p` costs about 2.5 times `720p` per second; if the person wants it, every part uses it.

## 2. The set photo

One photo of the empty set, used as `location` in every part. It keeps the room, the light and
the props the same from part to part.

**Where it comes from**, in this order:

1. A running series: its set photo, found with `list_assets` (`brand_id`, `file_type:
   "image"`, `search` with words from its description), checked with `preview_assets`.
2. The person's own room: a photo link with nobody in it, brought in with `import_asset`
   (`url`, `brand_id`, `title: "<Show> set"`). It makes the show feel like theirs. A photo
   attached in the chat cannot reach the connector: they drop it on
   https://app.creatorline.io/assets, then you find it with `list_assets`.
3. A new one: `create_generation` `{tool: "text-to-photo", brand_id, prompt}`. No `avatar_id`:
   this tool draws from words alone and refuses one. Its frame is 9:16 by default.

**Writing a new set**:

```
An empty home office corner for a talking-to-camera video, nobody in it, seen from a phone at
seated eye level. A light oak desk runs across the lower third with a closed notebook and a
small ceramic plant pot on it. Behind it, a sage green plaster wall and a low walnut shelf with
a few books and a dark ceramic vase. Soft light from the left, a warm table lamp glowing on the
shelf. Calm, lived-in, tidy. Vertical frame.
```

- Describe only the room. The photo writer adds a person only when the brief asks for one.
- Put in every prop the host may touch or lean toward: a desk microphone, a mug, a notebook.
  Takes show only the props the set photo shows; a prop named only in words is drawn badly
  (a microphone floating with no stand). The host leans toward a desk microphone, never holds
  it.
- A desk or table across the lower third gives the host a place and keeps the camera at sitting
  height.
- Light through materials and colours (oak, linen, sage plaster, terracotta, walnut) with one
  dark accent. Words like "bright" or "sunlit", or a visible window, tend to wash the wall out.
- Screens dark, no posters or packaging with words, no logos: printed words come out garbled.
- Look at it with `preview_assets` before filming. A wrong set caught here costs one photo;
  caught after filming, it costs the episode.

## 3. Wardrobe

- Default: "@Avatar1 wears exactly the outfit from her photo." The photo's own clothes are the
  safest way to keep the host looking the same.
- A show outfit the person asks for: name it plainly and the same way in every part ("a navy
  crew-neck sweater over a white collar"). It is drawn from words each time, so small details
  can vary; keep it simple and say so once.
- Never change the outfit between parts of one episode. A series may change it per season, not
  per episode.

## 4. The part brief

Plain sentences in this order (video-briefs.md, section 3, has each line's job):

```
Idea: Part <n> of <N> of the episode "<title>" of <Show>. @Avatar1 hosts, talking straight to
the phone <like ...: the host's manner in a few words>. This part <opens the episode on the
hook and gives item one | gives item two | gives item three and the verdict>.
Lines (use these lines as written): "<this part's exact words>"
Setting: <set sentence with @Location1>. <light sentence>
Wardrobe: <wardrobe sentence>
Camera: <camera sentence>
Ending: <parts before the last: lands on the hand-off line, energy still up | last part: a calm
verdict and a held look to the phone, chest-up>
Language: <spoken language>
Sound: voice and room sound only.
```

The call:

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand>",
  "avatar_id": "<host>",
  "prompt": "<the brief>",
  "inputs": { "location": "<set photo asset id>" },
  "params": { "ugc_style": "Talking head", "duration": 20, "aspect_ratio": "9:16", "resolution": "720p" }
}
```

- A part that shows the product adds `"objects": ["<product photo asset id>"]` to `inputs`
  and names it `@Object1` in the brief: what the host does with it, which hand, label to the
  phone. Only the real product photo, never a stand-in.
- Never write cuts, lenses, timestamps or shot lists: the writer builds the shots inside each
  part. Never mention captions, titles or on-screen text: text is added in Video Studio.
- Never write a call to action into the lines; it goes on screen and in the caption.
- `duration` = the part's words / 2.5, rounded up, + 1, between 5 and 30.

## 5. Worked example: three parts and a sign-off

The episode from episode-formats.md, section 9. The kit:

- Set sentence: "@Avatar1 sits at the light oak desk in @Location1."
- Light: "Soft light from the left, the lamp on the shelf glowing."
- Wardrobe: "@Avatar1 wears exactly the outfit from her photo."
- Camera: "Phone propped at eye level across the desk."

**Part 1** (`duration: 20`):

```
Idea: Part 1 of 3 of the episode "3 phrases that make you sound confident" of Speak Up
Sundays. @Avatar1 hosts, talking straight to the phone like a calm, sharp coach. This part
opens the episode on the hook and gives phrase one.
Lines (use these lines as written): "Three phrases that make you sound sure of yourself in any
meeting. Number one. Swap 'I think maybe we could' for 'My recommendation is.' Same idea, but
now it sounds like a decision. Try it once this week. Phrase two is the one most people get
backwards."
Setting: @Avatar1 sits at the light oak desk in @Location1. Soft light from the left, the lamp
on the shelf glowing.
Wardrobe: @Avatar1 wears exactly the outfit from her photo.
Camera: Phone propped at eye level across the desk.
Ending: lands on the hand-off line with a small knowing look, energy still up.
Language: English.
Sound: voice and room sound only.
```

**Part 2** (`duration: 17`): the same brief with "Part 2 of 3", "This part gives phrase two",
part 2's lines, and "Ending: lands on the hand-off line, leaning in slightly."

**Part 3** (`duration: 20`): "Part 3 of 3", "This part gives phrase three and closes the
content with a verdict", part 3's lines, and "Ending: a calm verdict and a held look to the
phone, chest-up."

**Sign-off** (`duration: 5`, filmed once for the series):

```
Idea: The closing line of the show Speak Up Sundays, used at the end of every episode.
@Avatar1 says it warmly to the phone and holds a small smile.
Lines (use these lines as written): "That's Speak Up Sundays. See you next Sunday."
Setting: @Avatar1 sits at the light oak desk in @Location1. Soft light from the left, the lamp
on the shelf glowing.
Wardrobe: @Avatar1 wears exactly the outfit from her photo.
Camera: Phone propped at eye level across the desk.
Ending: a held smile to the phone, chest-up.
Language: English.
Sound: voice and room sound only.
```

## 6. One voice across parts

Every take makes its own voice from the avatar's picture and the brief, so two parts can sound
like two people. Pick the route in the plan and state it.

| Route | When | How |
|---|---|---|
| Voice match (default) | The host has a `voice_id` (`get_avatar`) | Film the parts with their own sound, then re-voice each part in Video Studio: `run_video_ai` `{video_id, action: "change_voice", clip_id, voice_id}` (assembly.md, section 3). Words, timing and lips stay; the voice becomes the avatar's own. Needs one clear voice and no music in the take, which the Sound line gives. |
| Voice match, chosen voice | The host has no `voice_id` | Pick one voice with `list_voices` (`search` with the host's gender, age and manner, such as `calm female 30s`) and match every part to it. Name it in the plan ("one voice for every part: <its name>, calm and clear"). Say once that the avatar can keep a voice of its own, set in the app (https://app.creatorline.io/avatars), and that the series should use the same one every episode. Never use the brand's `voice_id` here: it belongs to the brand's default avatar, another person. |
| Voice first | The words must be exact (a sponsor read, a legal line, a script the person wants word for word) | See below. |
| No match | The person drops the voice match from the price | Keep parts few (2 or 3) and say once that the parts may sound slightly different. |

**Voice first**, part by part:

1. `create_generation` `{tool: "text-to-speech", brand_id, prompt: "<the part's exact
   lines>", params: {voice_id: "<host voice_id>"}}`. The `prompt` is read word for word.
   Always pass `voice_id`: left out, the line is read in the brand's default avatar's voice,
   which is not the host's when another avatar hosts.
2. Wait with `get_generation`; note the audio's `asset_id` and `duration_sec`.
3. The part: `ugc-video` with `inputs: {location: ..., audio_urls: ["<audio asset id>"]}`,
   `duration` = the audio's seconds rounded up + 1, and in the brief "@Avatar1 says @Audio1"
   in place of the quoted lines.
4. Film part 1 and ask the person to watch the lip sync before filming the rest.
5. No voice match afterwards: the voice is already the avatar's.

Each part then has two paid items (the voice line and the take): quote both.

## 7. Seams

A seam is where two parts meet. In phone-native video it is a jump cut in the same room, and
viewers accept it. What they notice:

| At the seam | Fix |
|---|---|
| A pause, or the host settling before speaking | Trim the silence from the caption times (assembly.md, section 5) |
| The same words twice | The hand-off ends one part; the next opens on new words |
| The face, hair or outfit shifts | Re-film the part that is off, or cover the seam with a cutaway from 1 s before to 1 or 2 s after |
| The room or light shifts | The same set photo and the same set and light sentences in every part |
| The energy drops | End parts on the bridge line with energy up, not on a settled verdict |

## 8. Two hosts

- **Alternating parts** (recommended): host A films parts 1 and 3, host B part 2, each part
  with its own `avatar_id`, the same set photo and camera sentence. Voice match each part with
  its own host's `voice_id`. The hand-off names the other host ("Leo has the second one.").
- **Both in one frame**: add the second avatar's photo (`get_avatar` → `image_url`) to
  `inputs.characters`; the host goes in first by itself, so the brief names them `@Avatar1` and
  `@Avatar2`, says who sits where, and labels the lines "Mia:" and "Leo:". A take with two
  voices cannot be voice matched (a second voice comes out garbled), so keep such parts few and
  short.

## 9. Checking the takes

Before assembly, for every finished part:

- `preview_assets` with all part asset ids at once (up to 8): the cover frames side by side.
  Same face and hair, same outfit, the set from the set photo.
- `duration_sec` from `get_generation` against the planned `duration`.
- The words are checked later, from the captions (assembly.md, section 4).
- A new series: the person watches the pilot before the other parts are filmed.

Each part gets one verdict (house-rules.md, section 5). Re-film only the part that is off.

## 10. A host from a real person's photo

Only the person themself, or someone who agreed. The default model refuses real faces: follow
video-briefs.md, section 12. That model films at most 15 s per take, so every part stays at 15 s
or less.
