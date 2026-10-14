# Studio takes

An opt-in route for an episode filmed like a studio show: a set camera plan with a front, a
three-quarter and a close setup, cuts that change the angle, and a take prompt you write in
full. The default route (the server's writer, one phone in a real room) stays the default for
UGC; this route is for a person who asks for the show look, or for a host whose every line must
be filmed exactly as written with natural mouth movement.

## Contents

1. [When to use it](#1-when-to-use-it)
2. [What it needs](#2-what-it-needs)
3. [Building and running it](#3-building-and-running-it)
4. [The camera map](#4-the-camera-map)
5. [Cuts inside a part](#5-cuts-inside-a-part)
6. [Seams between parts](#6-seams-between-parts)
7. [The take prompt, block by block](#7-the-take-prompt-block-by-block)
8. [Shot labels](#8-shot-labels)
9. [Performance in a shot](#9-performance-in-a-shot)
10. [Voice, realism and pace](#10-voice-realism-and-pace)
11. [Inputs and tokens](#11-inputs-and-tokens)
12. [Self-check before the run](#12-self-check-before-the-run)
13. [Example: part 1](#13-example-part-1)

## 1. When to use it

| The person wants | Route |
|---|---|
| A host who feels like a creator, filmed on a phone (the default) | The writer route, SKILL.md |
| "A proper show", "a studio look", "different camera angles" | This route |
| Every word exactly as written, filmed with the host saying it | This route, or the voice-first route (host-continuity.md, section 8) |

On the writer route `create_generation` always rewrites the brief into the model's prompt and
films one phone: it never takes written camera setups. Here the prompt reaches the video model
exactly as you write it, through a workflow step with Enhance off. Nothing checks or improves
it on the way, so every rule below is yours to keep. The frame stays 9:16: Video Studio makes
vertical videos only.

## 2. What it needs

- A plan that holds workflows. When `create_workflow` or `run_workflow` refuses for the plan,
  pass on the server's words and link, and film on the writer route.
- One workflow per show, reused for every episode, since a plan may hold only a few.
- The same price per second of take as the writer route (the same model). The price comes
  from `run_workflow` without `confirm`, and goes into the one quote of SKILL.md, step 4.
- Everything else is as on the writer route: the set photo, voice match, Video Studio.

## 3. Building and running it

Read the creatorline-workflows skill's graph rules if it is installed; the shape here is
small:

```json
{
  "name": "Speak Up Sundays studio takes",
  "brand_id": "<brand>",
  "avatar_id": "<host>",
  "nodes": [
    {
      "id": "p1", "kind": "generation", "title": "Part 1", "stageId": "video-ref",
      "modelId": "bytedance-seedance-2-5-reference-to-video",
      "prompt": "<the take prompt, section 7>",
      "slotBindings": { "location": "<set photo asset id>" },
      "params": { "enhance": false, "duration": 20, "resolution": "720p", "aspect_ratio": "9:16", "generate_audio": true }
    }
  ],
  "edges": []
}
```

1. One `generation` step per part, ids `p1`, `p2`..., and one for a new sign-off. A product
   adds `"objects": "<product asset id>"` to `slotBindings`.
2. `validate_workflow`, then `create_workflow` (free).
3. Price: `run_workflow` `{workflow_id}` without `confirm` gives the whole episode's takes.
4. On the episode's yes: `run_workflow` `{workflow_id, only_node_ids: ["p1"], confirm: true}`
   once its unconfirmed price matches the quote line. Read `get_workflow_run` every 10 to 30 s.
5. Check part 1 (review.md, section 5, and section 11 below). Then the other steps in one
   run with `only_node_ids`.
6. Each step's output is a take in the library: assemble, voice match and caption it exactly as
   on the writer route.
7. The next episode: `get_workflow`, then `update_workflow` with the new prompts (`nodes` and
   `edges`). Replacing a graph is a one-way change: it needs its own yes.

No `ugc_style` (only the writer reads it) and no `change_voice` (it does nothing in a
workflow): voice match in Video Studio.

## 4. The camera map

Three setups, written once for the show and never redefined between parts:

| Setup | Viewpoint | Size and crop | For |
|---|---|---|---|
| Front | Straight on, eye level | Medium, waist-up | The hook, direct address, the verdict, the call to action |
| Three-quarter | About 40 degrees to one side (name it: the host's left or right), eye level | Medium close, chest-up | Explaining over several sentences |
| Near profile | About 70 degrees to the side, eye level | Close, head and shoulders | Reveals and emphasis |

Each setup, wherever it is written, names all of:

- the viewpoint, with the host's side and which cheek and shoulder are nearer the lens, and a
  rough angle from straight on;
- the height: eye level, a little above, a little below;
- one size: wide, medium-wide, medium, medium-close, close;
- the crop, by the body: waist-up, chest-up, head and shoulders;
- where the host sits in the frame and which side is open;
- locked off (the default) or one move with a reason (a slow push-in on the reveal).

"Another angle", "closer", "wider", "dynamic" or a lens name on their own are not a setup.

## 5. Cuts inside a part

- Every cut changes the size by at least one step AND the viewpoint. Medium to medium is never
  a cut, even from another angle.
- A seated host never shows lap or knees: never go wide or medium-wide just to change size.
- Cut where the story turns: a claim to its example, a question to its answer, a contrast, the
  next item, the payoff. The new setup begins as that phrase begins; anchor the cut on the exact
  words just before it.
- No quota of cuts, no longest shot, no A, B, C rotation for its own sake. A long single shot
  needs a performance reason.
- At most three speaking setups in one part. Cuts inside a take land roughly, not on an exact
  frame; a boundary that must be exact is a seam between parts.
- Never add a part only to get another camera change.

## 6. Seams between parts

The last setup of one part and the first setup of the next always differ: front to
three-quarter in part 1, then three-quarter to front in part 2, repeats three-quarter at the
seam. A cutaway or a card over the seam does not repair it. Rewrite the shot plan before the
run.

## 7. The take prompt, block by block

Always in this order:

1. **The references, first.** "@Image1 is the host: face, hair and body. @Image2 is the room."
   (No set photo: the host only. A reference clip: add what @Video1 shows.) Then: the image
   sets how the host looks, not a pose: the host shifts posture and gestures with what is said.
2. **Format and cuts.** One sentence naming the format ("A hosted explainer for a vertical
   video.") and one with the cuts ("One continuous shot." or "Exactly two hard cuts: three
   shots."). Say so when the front setup is not used. Then the continuity rules: the host keeps
   their place and the way they face, the chair stays put, the camera moves around the host, a
   turn of the body is not a camera change, and there is no digital zoom or punch-in.
3. **VOICE AND MANNER**, then the **REALISM LAYER** (section 10).
4. **The shots**, each a label (section 8) with its performance inside it and its share of the
   lines after it, cut where the meaning turns.
5. Nothing about captions, texts, cards or cutaways.
6. **Last**: the pacing note, the continuity reminder, then the exclusions in one sentence: no
   restarts, no on-screen text, captions, logos or watermarks, no extra people, no music or
   sound effects, no extra angles, no zoom in place of a cut, no change of identity, no camera
   gear in view.

## 8. Shot labels

One line per shot, then the host's words for that shot in quotes:

```
[SHOT 1 | FRONT, STRAIGHT ON, eye level | MEDIUM | WAIST-UP | host centred, a little room
above the head | LOCKED OFF | settled, eyes on the lens, a small lift of the brows on the
first stressed word]
"Three phrases that make you sound sure of yourself in any meeting."
```

- Number from 1 with no gaps. Write the full physical view in every label: never "camera A",
  "same as shot 1" or an id.
- The quoted lines, joined in order, are the part's lines exactly, once. No second copy of the
  dialogue anywhere in the prompt.
- A label says only what the camera records. Never captions, lower thirds, overlays, b-roll,
  split screens, picture in picture, on-screen text or room kept for a graphic: the model draws
  those words.
- Name the host's token in every shot.

## 9. Performance in a shot

- Tie each gesture to a short exact phrase. It rises, lands on the stressed word, and releases
  into a new relaxed position.
- Between accents the hands move somewhere new, the shoulders settle and the torso shifts.
- Size the movement to the energy of the line. Never a gesture on every word.
- Never ask the host to hold, or come back to, the pose in the reference image.
- Keep each action inside the crop: hands in medium shots, face, eyes and shoulders in close
  ones.
- The next shot continues the movement: no reset, no restarted sentence.

## 10. Voice, realism and pace

**VOICE AND MANNER.** One adult voice in the episode's language, close to the mic at arm's
length. Then one dominant (host-continuity.md, section 8, has the rules):

- **Weight**: speaks from the bottom of the range and keeps coming back to it; sentences end
  lower than they start, the last two words lowest; speed lives inside the phrase, and the last
  two or three words come apart and slow down; excitement goes into tempo and harder consonants,
  never into pitch; pitch steps down onto the two words the part turns on, and onto the last
  word; one word in each sentence steps up in volume, then back. To end: with a real reveal, a
  full stop and one audible breath before the reveal phrase, then the words after it lower,
  slower, quieter and exact; without one, breaths at the phrase ends and a clean falling stop.
- **Brightness**: give each of these one line: gender, language, vocal weight, timbre, where the
  resonance sits, distance from the mic, attitude (who is spoken to, wanting what), one pitch
  shape across a sentence, the rhythm's shape, what is stressed and what is run together, the
  volume range and what its contrast does, and one guardrail written as what to do.
- Voice match after the take replaces the voice's sound, not its delivery.
- With a voice track (`@Audio1`): the voice block says only that @Audio1 is the one voice and
  the host speaks its words, nothing about pitch, accent or timbre.

**REALISM LAYER**, word for word in every part of the episode: quiet breathing under the voice,
faint mouth sounds, blinks that ignore the rhythm of speech, a faint rustle of fabric and a soft
contact sound when the host moves, the head settling just after the last word; breaths and
stress follow the meaning; quiet room tone, early reflections from the nearest hard surface,
the warmth of a close mic; nothing polished, no broadcast sheen. Do not add more traits: a few
read as life, a catalogue reads as acting.

**PACING**: a conversational pace, the last word finished, a brief settle in room tone; no
long silent hold, no slowed delivery, no repeated words.

Duration as on the writer route (host-continuity.md, section 4): the words at the pace, plus
any held seconds, plus 0.4, rounded up.

## 11. Inputs and tokens

- With Enhance off, an input reaches the model only through its token, numbered per kind in
  slot order: the host in `characters` is `@Image1`, the set in `location` `@Image2`, a product
  in `objects` `@Image3`; a voice track `@Audio1`; a reference clip `@Video1`.
- Name each by its token and say its job. Never describe what an image already shows: not the
  host's face, hair, age or build, not the product's colour, material, logo, printed words or
  price.
- A product: a plain noun, its token and what is done with it ("@Image1 lifts @Image3, the
  serum, and turns it to the lens"), on the state arc of supplied-media.md, section 6.- On the first finished part, check the product is in the host's hands and has not replaced
  the host: that is what a token mix-up looks like.

## 12. Self-check before the run

For every part:

1. The quoted lines, joined, are the part's share of the script, complete, in order, once.
2. The first setup differs from the last setup of the part before.
3. Every cut inside changes the size by a step and the viewpoint.
4. Every input is named by the right token, and nothing an image shows is described.
5. The duration is inside the range `list_models` gives for the model.
6. No placeholder, id, part number, note to the person, or word about the graphics layer.
7. The fixed lines hold (house-rules.md, section 7): no real, named person, no minor, nothing
   illegal. No writer is there to catch a slip. The persona's own past is welcome.
8. The realism layer and the voice block are word for word the show's; the exclusions come
   last.

## 13. Example: part 1

`duration: 20`, the set in `location`, no product:

```
@Image1 is the host: face, hair and body. @Image2 is the room. The image sets how the host
looks, not a pose: she shifts her posture and gestures with what she says.
A hosted explainer for a vertical video. Exactly two hard cuts: three shots. She stays seated
at the desk facing the same way; the chair stays put; the camera moves around her; a turn of
her body is not a camera change; no digital zoom or punch-in.
VOICE AND MANNER: one adult woman's voice in English, close to the mic at arm's length. She
speaks from the bottom of her range and keeps coming back to it; sentences end lower than they
start, the last two words lowest; excitement goes into tempo and crisp consonants, never pitch.
REALISM LAYER: quiet breathing under the voice, faint mouth sounds, blinks that ignore the
rhythm of speech, a faint rustle of fabric when she moves, her head settling just after the
last word; quiet room tone, early reflections from the desk, the warmth of a close mic; nothing
polished.
[SHOT 1 | FRONT, STRAIGHT ON, eye level | MEDIUM | WAIST-UP | @Image1 centred at the desk |
LOCKED OFF | settled, eyes on the lens, brows lift on "sure of yourself"]
"Three phrases that make you sound sure of yourself in any meeting. Number one."
[SHOT 2 | THREE-QUARTER, about 40 degrees to her left, her right cheek and shoulder nearer
the lens, eye level | MEDIUM-CLOSE | CHEST-UP | @Image1 left of centre, open space on the right
| LOCKED OFF | on "My recommendation is" her right hand opens toward the lens, then settles on
the desk farther to the side]
"Swap 'I think maybe we could' for 'My recommendation is.' Same idea, but now it sounds like a
decision."
[SHOT 3 | FRONT, STRAIGHT ON, eye level | MEDIUM | WAIST-UP | @Image1 centred | LOCKED OFF |
a small nod on "once this week", a knowing look on "backwards"]
"Try it once this week. Phrase two is the one most people get backwards."
PACING: a conversational pace, the last word finished, a brief settle in room tone; no long
silent hold, no slowed delivery, no repeated words. She stays at the same desk in the same
room throughout. No restarts, no on-screen text, captions, logos or watermarks, no extra people,
no music or sound effects, no extra angles, no zoom in place of a cut, no change of identity,
no camera gear in view.
```

Part 1 ends on the front setup, so part 2 opens on the three-quarter or the near profile.
