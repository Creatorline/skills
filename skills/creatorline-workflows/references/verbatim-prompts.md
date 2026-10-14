# Verbatim prompts (Enhance off)

With `params.enhance: false` the prompt goes to the model exactly as written: no writer, no
persona, no template, no shot plan. Nothing fixes it on the way. Use this guide when you write
such a prompt yourself (a step that needs control the writer would undo, a port whose prompt
you complete), and to check a prompt the person brought. Their own words are never reworded
(SKILL.md, rule 1); section 1 is the one exception.

## Contents

1. [Their prompt: bind, never reword](#1-their-prompt-bind-never-reword)
2. [Order of a video prompt](#2-order-of-a-video-prompt)
3. [The avatar and other inputs](#3-the-avatar-and-other-inputs)
4. [Camera and look](#4-camera-and-look)
5. [Shots and timing](#5-shots-and-timing)
6. [Speech and sound](#6-speech-and-sound)
7. [Photo to video and text to video](#7-photo-to-video-and-text-to-video)
8. [Photo edits](#8-photo-edits)
9. [What never goes in](#9-what-never-goes-in)
10. [Weak and strong](#10-weak-and-strong)

## 1. Their prompt: bind, never reword

On a reference video model (`prompt.tokens_bind_inputs: true`) an input the prompt never names
is ignored. When the person's prompt says "the woman" or "the product" but no token, the only
change allowed is putting the token where they meant it ("@Image1", "@Image2"), and you say so
in one plain line: "Where your prompt says 'the woman', I added a tag so Mia's face is used;
every other word is yours." Every other word stays, typos included.

## 2. Order of a video prompt

Models weigh the first words most. Write, in this order:

1. **Who and what they do**, in the first sentence: "@Image1 picks up @Image2 from the
   counter and turns the label to the camera."
2. **Where**: the room or place, the time of day, the light that is there.
3. **Camera**: one move, or none.
4. **Sound and speech**: what is heard, and the exact lines.
5. **Look**: the capture style, in a few words.

Write actions, not moods: what the person does and how it shows ("laughs and shakes her
head", not "happy").

## 3. The avatar and other inputs

- Identity travels with the image. Never describe the avatar's face, hair or body: it fights
  the reference. Describe clothes only when they must differ from the image.
- Name every input by its token and say its job. With the avatar, a place in `location` and a
  product in `objects`, slot order makes them `@Image1`, `@Image2`, `@Image3`: "@Image1 holds
  @Image3 at chest height in the kitchen from @Image2". A voice track: "@Image1 says @Audio1".
- `@step2` for an upstream step's output, never a guessed positional token.
- A second person who is not an input: place them by role and clothing ("a friend in a red
  hoodie, off to the left"), or they may come out looking like the avatar.

## 4. Camera and look

- Phone-native by default: "handheld phone footage", "phone propped on the counter",
  "selfie angle", "natural window light", "a little camera shake". That is what reads as UGC.
- One camera move per shot: locked off, a slow push-in, a handheld drift, or a follow.
  Stacked moves jitter.
- Film language (dolly, crane, lens lengths, color grades, slow motion) only when the person
  asked for a polished look.

## 5. Shots and timing

- One continuous shot is the safest take. Say "one continuous shot, no cuts" when it is one.
- Several shots in one take: at least 3 seconds each, and no more shots than the seconds hold
  (2 to 3 in 8 to 10 s, 3 to 5 in 12 to 15 s). Number them or bracket the times
  ("[0-4s] ... [4-8s] ...") only when the timing matters, and make them add up to `duration`.
- Hook in the first 3 seconds: the most specific moment, already in motion. No greeting.
- Across separate steps that must match, say it: "same outfit and room as @step1", and wire
  that step into `source_video`.

## 6. Speech and sound

- Lines in quotes after an action: `She leans toward the phone and says: "okay, I get it now."`
- About 2.5 words a second: 22 to 30 words for 10 s. Fewer when she also handles a product.
- Lines in the spoken language; the rest of the prompt in English.
- Name the sound: "her voice up close, quiet room tone". When music or a re-voice comes later:
  "voice and room sound only".
- A take that a lipsync step will voice: still write the line she says (so her mouth moves
  with it) and set `generate_audio: false`; the lipsync step brings the voice.

## 7. Photo to video and text to video

- **Photo to video**: only what moves or changes (the action, the expression, hair or fabric
  in the wind, one camera move) and the sound. Never re-describe what the frame shows; it
  makes the take stiff. One continuous take: never ask for a cut.
- **Text to video**: one scene, fully: the subject, the place and light, the one action, one
  camera move, the sound. No avatar is possible here.

## 8. Photo edits

- Say what changes and what stays: "Put @Image1 in the wicker chair of @Image2. Keep the
  scene, the light and the grain exactly as they are."
- A person appears only when the prompt asks for one.
- Words that must read exactly go in a step on `gpt-image-v2-edit`, or later as Video Studio
  text or the caption.

## 9. What never goes in

- Negatives: models draw what you name. "a plain grey t-shirt", not "no logo";
  "label facing the camera", not "don't hide the label".
- Words a camera cannot see: "stunning", "viral", "masterpiece", "8K".
- A review, comment card, rating or screenshot drawn into the picture: generated text comes
  out garbled. It goes in as Video Studio text, or the person supplies it as an image.

Safety holds with Enhance off too (house-rules.md, section 7), and no writer is there to catch
a slip.

## 10. Weak and strong

Weak: "Beautiful cinematic video of a girl reviewing the serum, viral style, no logo."

Strong (reference video, avatar in `characters`, serum in `objects`, 10 s):

```
@Image1 stands at a bright bathroom sink in the morning and holds @Image2 up to a propped
phone, label facing the camera. She puts two drops on her fingertips and pats them onto her
cheek, then looks back at the lens. One continuous handheld shot, natural window light,
phone camera look. She says: "Two drops, before moisturizer. That's the whole trick." Her
voice up close, quiet room tone.
```
