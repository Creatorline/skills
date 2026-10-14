---
name: creatorline-reshoot
description: "Re-films a viral TikTok or Instagram Reel, or a library video, with the brand's AI avatar: same hook, beats, cut rhythm, setting and sound, optionally with the person's product, app or new lines. Use for 'reshoot this trend', 'recreate this TikTok with my avatar', 'do this Reel with Mia'. Not for keeping the real footage: use creatorline-character-swap."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Reshoot a trend

Reshoot takes a video that already works (a trend, a format the person likes, their own past
hit) and films it again with the brand's avatar in the main role. The hook, the beats, the set,
the camera feel and the sound stay. It can also put the person's product in the avatar's hands
in place of the one in the video, and rewrite the lines that named the old product. The promise
to the person: paste a link, see the price before anything runs, get your own version of the
trend, and nothing posts without your yes.

Follow [references/house-rules.md](references/house-rules.md) for the session, consent, waiting,
showing and safety. This file adds what is particular to Reshoot.

## When to use

- "Reshoot this", "recreate this TikTok with my avatar", "do this trend with Mia", "my take on
  this Reel".
- "This video, but with my product": someone in the video holds, shows or uses a product.
- "This trend, but showing my app": a screen recording shown inside the new video.
- A trend the person found on Creatorline's Trends page.

## Not for

| The person wants | Use instead |
|---|---|
| The real footage kept (every move, cut and frame) with only the person replaced; two people swapped; a dance where every step must match | `creatorline-character-swap` |
| A new video in the trend's style, with their own script | `creatorline-talking-video` |
| The product as the hero, with no one on camera | `creatorline-product-video` |
| Several versions of one finished video (other avatars, products, hooks) | `creatorline-ad-variations` |
| A podcast or long YouTube video cut into shorts | `creatorline-long-to-shorts` |
| A photo or carousel trend | `creatorline-photos` |
| Captions, a hook headline, trims, music or text on the result | `creatorline-captions`, `creatorline-video-studio` |
| Posting or scheduling it | `creatorline-publish` |

## How Reshoot works, in short

1. It watches and listens to the source and plans a cut of the length you ask for: the hook
   first, the payoff last, the middle shortened, joins on a beat and between words.
2. It turns that cut into a storyboard where the main person (and a product being swapped)
   is a grey placeholder. Everything else stays as it is.
3. Only when a product is swapped in and someone speaks: it rewrites and records the lines.
4. It films the whole cut in one take with the avatar in the placeholder's place, in the
   source's own frame (a vertical source gives a vertical video).
5. Afterwards: a rewritten caption is added on top, and with `change_voice` on and the words
   unchanged, the speech is converted to the avatar's voice.

The source's picture never reaches the video model; its sound does, unless the words change.
Every step, and what each setting changes:
[references/how-reshoot-works.md](references/how-reshoot-works.md).

## What you need

| Item | Ask? | Default when not given |
|---|---|---|
| The source video | Hard gap: ask for the link | None |
| Brand and avatar | Never: orient (house-rules section 1) | The brand's default avatar |
| An avatar with a face | Never: the price call refuses without one | None: it is made in the app (house-rules section 9) |
| Their product photo | Only when they want their product in it | No swap |
| Length | Only when the source runs over 30 s | The source's own length, in whole seconds |
| Sharpness | Never | `720p`; `1080p` only when asked (more than twice the price) |
| What is heard | Only when you cannot tell: the voice depends on it | Craft, "Voice" decides `change_voice` |
| Direction | Never as a question | Empty: the same video with the avatar |
| Model | Never | The tool's default; see "Real faces" |

## The flow

1. **Activate and orient.** If `track_skill_activation` is in your tools, call it once with
   `skill_name: "creatorline-reshoot"`. Then house-rules section 1: `list_brands`, `get_brand`,
   the avatar (by name in `list_avatars` when the person names one), `get_credit_balance`.
   Call `get_avatar` on the avatar you will film with: a `voice_id` means it has a voice of
   its own, which `change_voice` needs.

2. **Bring the source into the library (free).** Import a link before anything else: the
   answer gives the length and the frame, which set `duration` and catch a bad source before
   any price.

   | The person gives | Do |
   |---|---|
   | A TikTok or Instagram post link (share links too) | `import_asset` with `url` and `brand_id`. Add a `title` only when they said what the trend is ("Trend: 3 desk snacks"). The answer has the asset `id`, `duration_sec` and `ratio`. The same post imported twice is the same file. |
   | A direct link to a video file | `import_asset` with that `url` and `brand_id`. |
   | A YouTube or Shorts link | Not importable. Ask for the same video's TikTok or Instagram link (creators often post on both), or for the file: dropped at https://app.creatorline.io/assets?activeBrand=BRAND_ID, then found with `list_assets`. |
   | A video already in Creatorline | `list_assets` with `brand_id`, `file_type: "video"` and `search`. Look at the likely ones with `preview_assets` and name the one you picked by its title. |
   | A photo or carousel post | Refused: it has no video. Offer `creatorline-photos`. |
   | "Find me a trend" | No tool lists trends. Point to Trends in the app: https://app.creatorline.io/trending?activeBrand=BRAND_ID (on plans that include it; not during the free trial). It leaves out videos Reshoot cannot re-film, and each trend links to its original post: they paste that link here, or press Reshoot right there. |

3. **Look at the source (free).** `preview_assets` with the asset id shows its cover frame and
   length. Judge it against "A good source" in Craft. Open your next message with one line
   on what you see: "One person talking to camera at a desk, 23 s, vertical: a good fit." The
   cover is one frame (and may not be ready right after an import), so state what you assume
   ("one main person throughout") instead of asking. If it breaks a rule, say which and offer
   the skill that fits.

4. **Ask only what is missing.** Nothing missing: skip to step 6 and put the defaults in the
   price message. Otherwise one message, at most three questions, each with numbered options
   (the recommended one first when there is one) ([references/asking.md](references/asking.md)).
   Pick from these:
   - **Their product**, when they asked for it in the video, or when the cover shows another
     brand's product in hand: a photo of theirs
     ([references/product-intake.md](references/product-intake.md)), or another source.
   - **Length**, only when the source runs over 30 s: 1) 15 s (recommended) 2) 30 s 3) your own.
   - **What is heard**, only when no product is swapped in and neither the person nor the
     post told you: 1) someone talking 2) a song or trending sound 3) talking over music.
     The answer sets `change_voice` (Craft, "Voice").

   Close with the defaults in one line: "Defaults: Mia, 18 s (the video's own length),
   standard sharpness, the video's own sound."

5. **Write the Direction** (`prompt`), or leave it out. Craft, "The Direction", says what goes
   in it. Whenever `objects` or `source_video` is attached, write one that says what each
   attachment is for: the server does not check this, and an unplaced attachment is wasted.

6. **Price it.** `create_generation` WITHOUT `confirm`:

   ```json
   {
     "tool": "reshoot",
     "brand_id": "BRAND_ID",
     "avatar_id": "AVATAR_ID",
     "prompt": "DIRECTION",
     "inputs": { "source": "SOURCE_ASSET_ID", "objects": ["PRODUCT_ASSET_ID"] },
     "params": { "duration": 18, "resolution": "720p", "change_voice": false }
   }
   ```

   - `avatar_id` only when it is not the brand's default avatar; `prompt` only when there is a
     Direction; `objects` and `source_video` only when something is attached.
   - Leave `model` out. Set `model: "reshoot-seedance-2-0"` only in the case under "Real
     faces".
   - From the `needs_approval` answer, one short message: what you will make, the credits,
     the balance, a yes question. For example: "Your version of this trend: Mia in the lead,
     18 s, vertical, the same beats and the video's own sound. N credits; you have M. Go
     ahead?" With `sufficient: false`, follow house-rules section 2 (shorter, or `720p`).

7. **Run.** On yes, the same call with `confirm: true`.

8. **Wait and narrate.** `get_generation` with `wait_seconds: 45`, again and again until
   `status` is `succeeded` or `failed`. Reshoot reads and plans before it films, so it takes
   several minutes, longer for a 30 s take. One short line between calls, never the same
   twice: "Watching the video and planning the cut." "Building the storyboard." "Filming Mia
   in it now." "Still filming; long takes need a few more minutes." If the turn must end, say
   it is still filming and to ask you again in a few minutes. Never start it a second time.

9. **Check it, show it, offer next steps** (the sections below).

## Craft

### A good source

| Works | Breaks it |
|---|---|
| One main person on camera all the way through (a crowd behind is fine) | Two or more people sharing the lead (duets, interviews, couples): Character Swap |
| Few cuts, a steady or handheld phone camera | Heavy effects, fast transitions, animation, a screen with no person |
| A real person filmed with a camera | Smoking or vaping in frame |
| Vertical: the result keeps the source's frame | A horizontal video when they want a vertical post |
| A product handled on camera, when they want theirs swapped in | Swapping a product into a video that never shows one |
| 4 s to about a minute: the cut stays close to the original | Under 4 s (too short to film); a long video loses more in the cut |

What is said matters too: the avatar says it, or mouths it. The full pre-flight check:
[references/sources-and-trends.md](references/sources-and-trends.md).

### What stays and what changes

| | Plain reshoot | With their product (`objects`) |
|---|---|---|
| The main person | The avatar | The avatar |
| Set, camera feel, other people, cut rhythm | Kept | Kept |
| The product in hand | Kept, label and all | Theirs, from the photo, same grip and size |
| What is said | The video's own words | Lines that named the old product rewritten for theirs, at the same length; other lines word for word |
| Sound | The video's own track, music and voice | Speech in the cut: a new voice track, music dropped. No speech: the video's own track |
| On-screen text | Redrawn by the video model from the storyboard | The first caption rewritten and added clean near the top |

A plain reshoot keeps the old product in the avatar's hands. If it is another brand's, swap
theirs in or pick another source (house-rules section 7).

### Length (`duration`)

- Always set it, in whole seconds: 4 to 30 on the default, 4 to 15 on
  `reshoot-seedance-2-0`.
- A source of 30 s or less: its own length (`duration_sec` from the import, rounded). The price
  follows `duration`, and a shorter source comes out at its own length anyway, so a bigger
  number only costs more.
- A longer source: 15 s suits most trends; 30 s suits a story or a talky format. The shorter
  the cut, the more of the middle is left out.
- More seconds and `1080p` cost more. A first try at `720p` is the sensible default.

### Voice (`change_voice`)

Included in the Reshoot price. It speaks in the avatar's own voice (`voice_id` on
`get_avatar`); for an avatar without one it changes nothing.

| What is heard | Words change? | `change_voice` | Why |
|---|---|---|---|
| One person talking, no music under it | No | `true` | The avatar speaks in its own voice, not the original creator's |
| A song or trending sound the avatar mouths or moves to | No | `false` | The sound is the trend; re-voicing music garbles it |
| Talking over music | No | Do not run it as is | Re-voicing garbles the music; keeping it keeps a stranger's voice |
| Talking, with their product swapped in | Yes | `true` when the avatar has a voice | The new lines in the avatar's voice, not a stock voice |
| No speech at all | No | `false` | Nothing to re-voice |

- **Talking over music:** offer their product version (new lines in the avatar's voice; music
  can go back on in Video Studio), or another source. Keep the original track only when the
  video is the person's own or the speaker agreed.
- **Talking, and the avatar has no voice:** the original creator's voice would come out of
  the avatar's mouth. Give the avatar a voice first, in the app at
  https://app.creatorline.io/avatars?activeBrand=BRAND_ID, or pick a source with a song or no
  speech. Their own video, or one whose speaker agreed, is fine as it is.

### Their product (`objects`)

- One clear photo of the product in `inputs.objects`. The first photo is the one described
  and placed as the product. Get it the product-intake way; never a stand-in.
- The source must handle a product on camera. Those moments are kept in the cut, and the new
  product takes the old one's place, size and grip. A similar shape looks right (a bottle for
  a bottle, not a bottle for a lipstick).
- Rewritten lines keep each sentence's job: a joke stays a joke, a claim stays a claim. A
  personal result in the source ("it cleared my skin") would be said about the new product,
  so set the claims in the Direction (claim floor, house-rules section 7).
- Turn `change_voice` on when the avatar has a voice, or the new lines are read in a stock
  voice.
- The music under the speech is dropped with the new voice track. Offer to add music
  afterwards in Video Studio (`set_sound` takes an audio file from the library).

### Showing an app, a site or footage (`source_video`)

- Up to 3 short clips in `inputs.source_video`: a screen recording of the app, product
  footage, b-roll. Real screens only (product-intake section 7). Keep each to a few seconds:
  their seconds add to the price.
- Say in the Direction where each one shows ("the phone she holds up plays the app
  recording"). The model is told about them only through the Direction.
- The model redraws what it is shown, so a screen will not be pixel-exact. When it must be
  exact, put the recording on a Video Studio layer or split screen afterwards
  (`creatorline-app-promo-video`).

### The Direction (`prompt`)

Empty means the same video with the avatar: often the best choice. Write one only to change or
protect something, in one to four plain sentences:

- what each attachment is for: "The product photo replaces the iced coffee she holds.";
- the moments that must survive the cut: "Keep the first sip and the final nod.";
- the claims allowed with a product: "New lines say only what the label says: 20 g protein,
  no added sugar.";
- where an app recording appears.

Leave out: links (never opened; write the facts in words), camera, lens and light (the plan
copies the video's own), how the avatar looks (that comes from the avatar), negatives ("no
logo": say what should be there), the old product's brand, and new lines to be spoken (the
words change only through a product photo). The avatar usually ends up dressed like the person
in the source; for exact clothes, use Character Swap's Replace mode with an outfit image.
Reshoot does not translate: the words stay in the source's language. Recipes and examples:
[references/direction-recipes.md](references/direction-recipes.md).

### Real faces

| The avatar | `model` |
|---|---|
| An AI face (the usual case) | Leave it out: the default films up to 30 s and reads the storyboard best |
| Made from a real person's photo (the person told you so), with that person's consent | `reshoot-seedance-2-0`: real faces are accepted, up to 15 s |

When the default refuses a take (a real face, a content check) and the take is 15 s or
shorter, it is filmed again once on the second model by itself, and the charge moves to that
model's price. Over 15 s, a refusal fails the run (refunded). So keep a take that may be
refused at 15 s or less.

### Safety for a reshoot

- A trend is a format, and re-filming a format with your own avatar is how trends work. Never
  reshoot another brand's ad to pass it off as yours.
- Never keep a stranger's speaking voice (see "Voice"). A song or a trending sound that anyone
  on the platform may use is fine.
- No minors on camera, no smoking, nothing sexual (house-rules section 7).

## Check before you show it

`preview_assets` with the output's `asset_id` shows you a frame. Check what you can and say what
you could not:

- the avatar is the one on screen (not the source's creator, no grey or clay-looking figure);
- their product is in hand, when swapped;
- the length matches the quote, and the frame is the shape they wanted;
- on-screen words are spelled right, and after a product swap no text still names the old
  product;
- the sound: tell them when the music was dropped (a product swap with speech).

You cannot watch the whole take: ask them to watch for lip sync and the product moments.

## If it goes wrong

| What happened | Likely cause | Fix |
|---|---|---|
| The price call says the avatar needs a face | The brand has no avatar with a face | Make one in the app: https://app.creatorline.io/avatars/new |
| The import is refused | A photo post, a private or deleted post, a web page, a file over 100 MB | Another link, or the file itself (step 2) |
| Failed after a refusal or a content check | A real face on a take over 15 s, smoking, a sensitive scene | 15 s or less, or `reshoot-seedance-2-0` for a real-face avatar, or another source |
| Failed for another reason | One of its steps did not finish | The same call once more; after a second failure, another source |
| A grey or clay-looking figure shows | The storyboard placeholder showed through | The same call once more; then a steadier source |
| The wrong person replaced, or two people with the avatar's face | The source has two leads | `creatorline-character-swap` |
| The product looks wrong | An unclear photo, or a very different shape from the old product | A cleaner photo; a source whose product is a similar size |
| Lines rushed, or a middle line missing | The new lines run longer than the seconds hold: they are sped up a little, then middle lines are dropped (never the first or last) | More seconds, or ask for shorter lines in the Direction |
| New lines in a voice that is not the avatar's | `change_voice` was off, or the avatar has no voice | `change_voice: true`; a voice for the avatar in the app |
| Garbled voice | `change_voice` on a track with music | The same call with `change_voice: false`, or another source |
| Shorter than asked | The source is shorter than `duration` | Next time, `duration` = the source's length |
| Horizontal | The source was horizontal | A vertical source |
| Misspelled words on screen, or text that names the old product | The video model redrew the source's text | Cover them in Video Studio (`add_text`, look `tiktokHighlight`) |
| No music | A product swap with speech | Video Studio `set_sound` with a music file |

Give every take one verdict before any new spend, and change one thing per retry
(house-rules section 5). A retry is a new paid run: quote it and ask.

## Show the result

Use the house-rules card. Name the trend by what it is, never by an id:

```
**Your version of the "3 desk snacks" trend**: 18 s, vertical, Mia in the lead,
same beats and sound, your protein bar in her hand.
[Watch the video](OUTPUT_URL) · [Open in Creatorline](STUDIO_URL)
Used N credits. M left.

What next?
1. Add word-timed captions and a hook line.
2. Make two more versions: another avatar, or another product.
3. Put it in your review queue for TikTok and Instagram.
```

`OUTPUT_URL` is `output[0].url` and `STUDIO_URL` is `studio_url` from `get_generation`. N is
`credits_charged` from the confirmed `create_generation`. M is `credit_balance` from
`get_credit_balance` read now: a take re-filmed on the second model moves the charge. The video
link expires; the Creatorline link stays.

## Next steps to offer

Pick two or three that fit what they asked for:

| Next step | Skill |
|---|---|
| Word-timed captions and a hook headline (check the result's own on-screen text first, so they do not overlap) | `creatorline-captions` |
| More versions: the same trend with other avatars or products, or the next trend | `creatorline-ad-variations` |
| Post it: caption and hashtags in the brand's voice, into the review queue, `made_with_ai: true` | `creatorline-publish` |
| A cover image for the post | `creatorline-cover-image` |
| Trim, music back under it, text, a split screen | `creatorline-video-studio` |
| Reshoot only one part of a longer video | The Video Studio route in [references/sources-and-trends.md](references/sources-and-trends.md) |

## References

- [references/how-reshoot-works.md](references/how-reshoot-works.md): every step of the run,
  what each setting changes, the fallback, and what the price is made of.
- [references/sources-and-trends.md](references/sources-and-trends.md): where sources come
  from, links that work, the pre-flight check, Reshoot versus the other tools, part of a
  video, several trends at once.
- [references/direction-recipes.md](references/direction-recipes.md): Direction recipes and
  weak versus strong examples.
- Shared: [references/house-rules.md](references/house-rules.md),
  [references/asking.md](references/asking.md),
  [references/product-intake.md](references/product-intake.md),
  [references/video-briefs.md](references/video-briefs.md) (only its Reshoot paragraph in
  section 14 applies: Reshoot does not use the brief writer, and its words change only through
  a product photo).
