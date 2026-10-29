# The try-on arc

The order of a try-on that works, the camera and hands that keep it clean, and how the item stays
the same from the first shot to the last. Write these into the video brief as plain staging; the
server's writer turns the brief into timed shots (video-briefs.md, section 1), so name what
happens and where the phone is, never seconds, lenses or light setups.

## Contents

1. [The eight beats](#1-the-eight-beats)
2. [Fitting the beats into shots](#2-fitting-the-beats-into-shots)
3. [Sections past 15 seconds](#3-sections-past-15-seconds)
4. [The change happens on the cut](#4-the-change-happens-on-the-cut)
5. [Camera: where the phone is](#5-camera-where-the-phone-is)
6. [Hands and hands-free details](#6-hands-and-hands-free-details)
7. [Keeping the item the same](#7-keeping-the-item-the-same)
8. [Voice on camera, voice over the detail](#8-voice-on-camera-voice-over-the-detail)
9. [Look and light](#9-look-and-light)
10. [Endings and optional devices](#10-endings-and-optional-devices)

## 1. The eight beats

The first section of every try-on follows this order. Each beat is caught already in motion: no
shot opens on someone standing and waiting.

| # | Beat | What the frame shows |
|---|---|---|
| 1 | Before | The avatar in a muted home outfit (a plain crew-neck tee and lounge pants), one plain kraft shopping bag with no logo held by a handle or standing on a surface. The item is not visible. The hand is already on the handle and the grin already breaking. |
| 2 | Wearing | On the cut: full body in the item, the one real peak of the video, and one natural twirl (a single turn, a half-beat hold showing the back, a settle facing front). The bag is gone. |
| 3 | Front pose | The whole fit read again, from a different distance. |
| 4 | Texture close | A close detail of the fabric, hands-free (section 6). |
| 5 | Turn | Side or back, with a glance over the shoulder. |
| 6 | Second detail | Another hands-free detail on a different part: the hem, a sleeve, the collar, hardware, a seam. |
| 7 | Style pose | A different room of the same home, one styled pose: an armchair, a window seat, a doorframe, mid-step, the stairs, a balcony. |
| 8 | Final look | Settled, ready to loop back to the start. |

The arc inside the section: beats 1-2 introduce, 3-6 develop, 7-8 land. Anything that can be
shown is shown: a beat that shows costs no words.

## 2. Fitting the beats into shots

The writer gives every shot at least 3 seconds, so eight beats never fit in 15 s. Keep their
order and fold them:

| Length | Shots | Beats, in order | Words spoken |
|---|---|---|---|
| Under 6 s | | No room for the change on a cut: a look in motion (SKILL.md) or the already-wearing variant | |
| 6-8 s | 2 | Before / Wearing with the twirl, held into the final look | 12-20 |
| 10 s | 3 | Before / Wearing with the twirl (the front pose folded in) / Final look | 12-20 |
| 12 s | 4 | Before / Wearing with the twirl / Texture close / Style pose into the final look | 20-28 |
| 15 s (default) | 5 | Before / Wearing with the twirl / Texture close / Turn / Style pose into the final look | 28-35 |
| 16 s and up | | The section above, then later sections (section 3) | per section |

- The Wearing beat and the style pose hold longest; the detail shot is the shortest. Say that in
  the brief ("the reveal is the longest shot, the detail the shortest"), never the seconds.
- The front pose and the second detail come back in the second section.
- Words are about 2 per second, below a talking video's: the beats are full of movement, and the
  detail shot carries voice-over (section 8).

## 3. Sections past 15 seconds

| Length | Sections | How it is filmed |
|---|---|---|
| 16-19 s | 2 of equal length, each at least 4 s | One take |
| 20-30 s | 2: 15 s, then the rest | One take |
| 31-45 s | 3: 15 s, 15 s, the rest | One take per section, joined in Video Studio |
| 46-60 s | 4 | One take per section, joined |
| Over 60 s | One per 15 s, the last at least 4 s | One take per section, joined |

Up to 30 s, write `Section 1:` and `Section 2:` into one brief: one take has no joins. Over 30 s,
each section is its own `generate_ugc_video` call with its own brief, joined in order with
`create_video` (worked-examples.md, section 4, shows the joining). A failed section is filmed
again on its own.

What each later section is:

| Section | Where | What happens |
|---|---|---|
| 2: home tour | It opens in the room the last section ended in, then moves through rooms not shown yet | The front pose at a new distance, the second hands-free detail, mid-step through a hallway, a settled look |
| 3: outdoors | All outside | The first shot is dry and sets the place; light rain from the second shot on (below) |
| 4: honest verdict | Back home, seated | Calmer; the first shot is a selfie talking head; only seated peaks (a hand to the chest, a slow breath) |
| 5 and on | Alternate rooms already seen, new rooms and outdoor spots | Any beats from section 1 except Before and the twirl |

- No Before beat, no bag and no twirl after section 1.
- Each later section opens mid-thought: no greeting, no opening sound, no naming the item again.
  It says more specific things in the same words, never faster.
- Copy the Wardrobe, Setting (adjusted only by room), Register and Accent lines word for word.

**Rain** shows on the surface only: droplets beading on the fabric, a light sheen, slight
darkening where drops land, wind moving the hem. Write "the fabric keeps its colour, print and
shape", so it never soaks through, turns see-through or loses its print. Her hair stays dry. She
stands clear of puddles and shop windows, so no reflection of her appears.

## 4. The change happens on the cut

- The cut between Before and Wearing performs the outfit change. Never write opening the bag,
  lifting the item out, dressing, zipping, buttoning up or pulling anything over the head.
- The bag and the Before outfit never come back after the first shot.
- **The bag:** one plain kraft shopping bag, no logo, no sticker, closed. Held by a handle, or
  standing on a clean surface that fits the room (marble, light wood, white lacquer, quartz),
  never a workbench, a garage, a folding table or a cluttered top. Its handles may match the
  item's colour. Never half-open.
- **The Before outfit** covers well: a plain crew-neck tee closed to the collarbone and lounge
  pants, never a tank top or camisole on its own. Shoes: plain socks. Jewelry: no jewelry.
  Write what is worn, never what is not.
- The same goes for any styling you add around the item (a top under a jacket, trousers under a
  coat): high coverage, closed to the collarbone, a crop top always with a layer.

## 5. Camera: where the phone is

**Neighbouring shots must differ** in where the phone is (in hand or propped), in distance
(close, middle, wide) and in what happens. Two shots that look alike melt into each other
instead of cutting. Use each distance at least once. A default that keeps the rule:

| Beat | Phone | Distance |
|---|---|---|
| Before | In hand (selfie) | Waist-up |
| Wearing | Propped | Full body |
| Texture close | In hand, pointed at the fabric | Close |
| Turn | Propped | Three-quarter |
| Style pose | Propped, in another room | Full body, wide |

- **The phone is the camera** and never appears in frame; a forearm at the edge of a selfie is
  fine. In a selfie never write "mirror selfie", "looking at her phone", "phone in her hand",
  "holding the phone up", "over the shoulder shot", "phone screen" or "reflection".
- **Propped shots:** "phone propped on the dresser at hip height, frame still". The frame is
  locked but the body moves: a weight shift, a pose change, a head turn, the lips moving. In a
  propped shot never write handheld, shake, drift, wobble, sway or "slight, subtle or natural
  movement": those words leak camera motion.
- **No mirrors and no reflections of any kind:** no bathroom or full-length mirror, no shop
  window, no glossy screen, no puddle. Reflections are where extra arms and second bodies appear.
  No mirror selfie, even when the phone is in hand. Name a plain wall instead.
- **Camera moves are off** unless the person asks: then at most one slow push-in or pull-back
  in a shot, or a quick shaky zoom on a selfie Before shot, never on every shot.

## 6. Hands and hands-free details

- **Two hands, one job each,** named in every shot; a hand with nothing to do is parked (on the
  hip, at the side, on the strap). In a selfie one hand IS the phone, so there is one free hand
  and at most one thing in it; anything two-handed needs the phone propped.
- Three jobs at once (hold the bag, wave, adjust the collar) grow a third arm. Rest a prop on a
  surface instead of holding it, and spread a multi-step action over several shots.
- **Details are hands-free:** no touching, brushing, pinching or a hand presenting the fabric.
  The texture shows through how it hangs, the light on it and the body breathing under it. Give
  each detail shot ONE passive cue, and the second detail a different one:

| Item | Passive cue |
|---|---|
| Knit | It catches the light as she breathes |
| Denim | The wash fades along the leg as she shifts her weight |
| Leather | The grain catches the light as she turns |
| A dress | The waist seam rises and settles with her breath |
| Linen | Soft creases at the elbow as the arm relaxes |
| Satin or silk | A flash of light runs along it on a slow turn |
| Wide-leg trousers | The leg swings as she shifts her weight |

## 7. Keeping the item the same

- **The wardrobe line** (SKILL.md, Craft) is written once and copied word for word into every
  brief: the look, every section, every take, a retry.
- Its colour, print, cut and details are identical in every shot it is worn. Turning with the
  body is fine; changing is not. It has exactly the buttons, pockets and hems the photo shows.
- It fits as cut: real-world fit, never slimmer, longer or tighter than the photo.
- **What it is known for lacking,** said positively, appears twice: in the wardrobe line and in
  the brief's closing line ("strapless neckline", "seamless", "a clean front with no zip"
  becomes "a clean, smooth front").
- **Closures** are named once by position ("a zip at the centre front", "three buttons at the
  left cuff") and that exact phrase is reused everywhere.
- **The tier,** luxury, premium or everyday, read from the item and its photo (never from a
  price you look up), sets how polished the room is.
- **One hero item:** nothing that looks like it anywhere (on a chair, in a closet, on someone
  passing). One state per prop per shot: the bag closed and held, or closed and standing.
- **Print and text:** a printed word or logo on the item renders only when it is big (a
  wordmark across the chest or back); small lettering comes out as gibberish. Any lettering you
  describe is made up, never another brand's. No readable text on anything else; the product's
  name appears on nothing else in the room.
- **Accessories by weight:** heavy (two hands, a little effort), bulky but light (two hands, no
  strain), light (one hand), tiny (pinched near the lens). Size is said against the body or the
  hand with a rough measure in cm ("sits at the hip, about 30 cm wide"), never against another
  object, which comes out too big. A pair is worn, or one per hand, never balanced on one palm.

## 8. Voice on camera, voice over the detail

- On-camera shots carry the lip-synced lines. The detail shots carry voice-over: the camera is
  on the fabric, the mouth out of frame, and the voice goes on. Put the wordiest phrase in the
  detail shot, where there are no lips to smudge.
- A detail shot that shows the mouth talking, or an on-camera shot with no words and no calm
  reason, gets rewritten.
- On the twirl, the words stop while her back is to the camera and pick up as she settles facing
  front.

## 9. Look and light

- Neutral daylight from one window, never golden hour or an amber glow.
- The look of a phone's front camera: everything in the room in focus, real skin texture, a
  little flatness in the bright parts. Never a film look, grain, lens flare, slow motion, a beauty
  filter or a fisheye, unless the person asked for a polished look (then the `Cinematic`
  template, video-briefs.md, section 5).
- The room fits the brand and the tier: a lived-in bedroom or hallway by default, the setting
  of the avatar's own image when it shows a home.

## 10. Endings and optional devices

- **No call to action** in the lines: it goes in the post caption.
- **The last section loops.** One section: the final look settles into the Before shot's
  framing, without the bag and the Before outfit, or ends mid-phrase. Several sections: end
  mid-phrase, the last words still being said as the clip ends.
- **An accidental start,** at most one, only when the Before shot is a selfie: the phone caught
  mid-drop, a pull back from the kraft paper's texture, or a light switched on. (A walk-in that
  ends with the phone set down is a move of the phone: not available, see below.) Describe what the frame does, name its sound in the Sound line, and
  let it settle into the Before beat within about 1.5 s.
- **A continuous pick-up or set-down of the phone** (propped turning into selfie without a cut)
  is not available: our writer turns any move of the phone into a cut. And nothing ever bridges
  the cut between Before and Wearing: it hides the change.
