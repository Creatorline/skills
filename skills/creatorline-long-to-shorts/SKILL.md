---
name: creatorline-long-to-shorts
description: "Cuts a long talking video (a podcast, interview, webinar, livestream or YouTube video) into up to ten vertical shorts, one per topic, each opening on its hook with a headline and captions. Use for 'turn my podcast into shorts', 'clip this YouTube video'. Not for one moment picked by time: use creatorline-video-studio. Already short: creatorline-captions."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Clips from long videos

You turn one long recording where people talk (a podcast episode, an interview, a webinar, a
livestream, a YouTube video) into a set of vertical shorts that are ready to post. Creatorline
listens to the whole recording, finds each distinct topic, and cuts one complete short per
topic: it opens on the line that introduces the topic, ends on its payoff, is framed 9:16 on
the person speaking, and carries a headline and word-timed captions. Then you write a post
caption for each short and put them in the review queue. The promise to the person: send one
link or file, see the price before anything runs, get up to ten shorts, and nothing posts
without their yes.

Run the session by [the house rules](references/house-rules.md) (orient, consent before
spending, waiting, the result card, failures, safety) and ask the way
[asking](references/asking.md) says. This file adds what is particular to cutting long videos.

## When to use

- "Turn my podcast into shorts", "clip this YouTube video", "make reels from my webinar",
  "the best moments of my livestream", "repurpose this episode for TikTok".
- A long video already in their Creatorline library: "cut my latest upload into clips".
- The same job every week for a new episode: run this skill again with the new link (the tool
  cannot be part of a workflow).

## Not for

| The person wants | Use instead |
|---|---|
| One moment they can point to by time ("12:30 to 13:15"), a few moments they list, or a best-of of several moments in one video | Video Studio: see "When Video Studio fits better" below, then `creatorline-video-studio` |
| Captions or a headline on a video that is already short | `creatorline-captions` |
| A trim, a call to action or music on one of the finished shorts | `creatorline-video-studio` |
| The avatar re-filming a moment of the video | `creatorline-reshoot` |
| The people in the video replaced by avatars | `creatorline-character-swap` |
| Hooks or a script written from the episode, nothing cut | `creatorline-short-script` |
| A week of content planned around the episode | `creatorline-content-calendar` |
| Scheduling details past the review queue | `creatorline-publish` |

## What the tool does

The tool is `short-clip`. Know these facts before you promise anything:

- **One run, many shorts.** One short per distinct topic, at most 10, never two on the same
  topic. Intros, outros, sponsor reads and small talk are skipped. Nobody sets the number or
  the length: the topics do.
- **Each short is 5 to 100 seconds**, most 20 to 90: as long as its topic needs to close. All
  fit TikTok, Reels and Shorts.
- **Complete on its own.** It starts on the sentence that opens the topic (the hook) and ends
  on its payoff, never mid-thought.
- **Vertical 9:16.** The crop follows the face of the person speaking; slides and screen
  shares are shown whole with bars instead of being cut.
- **A headline and captions, burned in.** The headline (the short's topic in a few words) sits
  at the top for the first 2.5 seconds, and word-timed captions follow the speech in the look
  you pick. Neither can be edited or removed afterwards, so the caption look is chosen before
  the run.
- **The recording itself.** The original people and sound are kept. No avatar, no prompt, no
  model choice: it reads nothing you write, so it cannot be told which moments to pick.

How it chooses, frames and charges, in full:
[references/sources-and-framing.md](references/sources-and-framing.md).

## What you need

| Item | Ask? | Default when not given |
|---|---|---|
| The long video | Hard gap: ask for a YouTube link or a file, or find it in the library | None |
| Brand | Only with several brands and no hint | The only brand |
| Caption look | Never as its own question: name the default in the plan, the others in brackets | `hormozi` (say "bold, the spoken word in yellow") |
| How many shorts, how long | Never: the topics decide | Up to 10, 5 to 100 s each |
| Avatar, prompt, model, length, resolution | Never: the tool takes none of them | Not used |
| Post captions and accounts | Only when they want to post (step 11) | Written by you in the brand's voice |

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once for this request
   with `skill_name: "creatorline-long-to-shorts"`.

2. **Orient** (house rules, section 1): `list_brands`, `get_brand` (its `language` and
   `brand_voice` write the post captions later), `get_credit_balance`. Skip the avatar: this
   tool films nobody.

3. **Find the source.**

   | The person gives | Do |
   |---|---|
   | A YouTube link (`watch?v=`, `youtu.be/`, `/live/`) | Use it as `source_url`. Nothing to import. It must be public. If the quote refuses it, step 5 says what to do. |
   | "My latest video", "the interview", a title | `list_assets` with `brand_id`, `file_type: "video"` and `search` when they named it (newest first without it). Pick by title and `duration_sec`; name it by its title in the plan. |
   | A direct link to a video file | `import_asset` with `url`, `brand_id` and a `title` ("Episode 12, full"). Keep its `id` and `duration_sec`. Up to 100 MB. |
   | A file on their device, or attached in the chat | It cannot reach Creatorline from here. They drop it at https://app.creatorline.io/assets?activeBrand=BRAND_ID (up to 100 MB), then you find it with `list_assets`. |
   | A cloud-drive share page, or any page with a player on it | Not a file. Ask for a YouTube link or an upload. |
   | A file over 100 MB | 100 MB holds only a few minutes of 720p (often 5 to 15). Ask for a public YouTube link of it, or the part that matters as its own file. A long show can go in as several parts, each its own run. |
   | A TikTok, Reels or Shorts link, or any video under about 2 minutes | Already short: offer captions (`creatorline-captions`) or a trim (`creatorline-video-studio`). |

   Say what you will cut in one line: "Your 48-minute episode 'Pricing your first product'."
   Check the source against "A good source" (Craft) and say any red flag in the same line.

4. **Intake**, only when a hard gap is open (no video found). One message, per
   [asking](references/asking.md). Never ask how many shorts or how long: no one can set it.
   Look in the library first, so the question can offer what is there:

   > Happy to. Which recording?
   > 1. "Episode 12, full" (48 min) in your Creatorline library (recommended: the newest)
   > 2. A YouTube link: paste it here
   >
   > Defaults: up to 10 shorts, one per topic, bold captions with the spoken word in yellow.

5. **Plan and price.** `create_generation` WITHOUT `confirm`:

   ```json
   {
     "tool": "short-clip",
     "brand_id": "BRAND_ID",
     "source_url": "https://www.youtube.com/watch?v=VIDEO_ID",
     "params": { "caption_style": "hormozi" }
   }
   ```

   - For a library file, pass `"inputs": { "source_video": "ASSET_ID" }` instead of
     `source_url`. Never both: the call is refused.
   - Leave out `prompt`, `avatar_id`, `model`, `count` and `include_avatar`. The tool reads none
     of them.
   - **A link refused.** The answer is `Missing required input "source_video"` although you
     sent `source_url`: this connection does not take links for this tool right now. Nothing
     was charged. Never move the link into `inputs` (that is refused too). Ask for the file,
     then `list_assets` and quote again with `inputs.source_video`:
     "Links can't be used for this right now. Drop the video file on your Creatorline
     library page (up to 100 MB, so often just the part you want cut) and tell me when it is
     there." Link the words "library page" to the assets page from step 3.
   - The answer is `needs_approval` with `credits`, `credit_balance`, `sufficient` and
     `duration_sec`. `duration_sec` (and the seconds in `summary`) is the LENGTH OF THE
     SOURCE, which the price is based on, not the length of a short. No `duration_sec` means
     the length could not be read: the number is a placeholder, not the price. Bring the
     video in another way (`import_asset` reads the length, or a YouTube link) and ask again.
   - `credits` covers the first 3 shorts. Each short past the third adds about a seventh of
     it, charged during the run once the topics are found, so the full 10 come to about twice
     `credits`. Put the range in the price message, so the yes covers the most it can cost:

   > Cutting your 48-minute episode into shorts: one per topic, up to 10, each with a headline
   > and bold captions, the spoken word in yellow. Between N and about 2N credits: N covers
   > the first 3 shorts and each one past that adds about X. You have M. Go ahead?
   > (Other caption looks: native TikTok, minimal, sticker, heavy outline, karaoke.)

   N is `credits`, X is N divided by 7, M is `credit_balance`; round up.

   - `sufficient: false`: house rules, section 2. When the balance covers `credits` but not
     about twice it, say so: extra shorts are charged even past zero, and a balance below zero
     stops the next run until credits are added. Offer a shorter part of the recording.
   - A new caption look in their yes does not change the price: run with that look.
   - Several recordings at once: quote each one, add up the bases and the most each can come
     to, ask one yes, then start them one after another.

6. **Run.** On yes, the same call with `confirm: true`. Keep `credit_balance` from the
   `needs_approval` answer: it is the balance before the run, for the card.

7. **Wait and narrate.** `get_generation` with `wait_seconds: 45`, again until `status` is
   `succeeded` or `failed`. It downloads and hears the whole recording, then cuts, frames and
   captions each short, so it takes several minutes, longer for a long recording with many
   topics. One short line between calls, never the same twice: "Getting the video and
   listening to it." "Finding the topics worth a short." "Cutting and captioning the shorts."
   Past those, say how long it has been: "Still cutting, 6 minutes in."
   After the first wait, give the `studio_url` from the confirmed answer: the shorts land
   there one by one while the rest are cut. If the turn must end, say it is still cutting and
   to ask you again in about ten minutes; never start it a second time.

8. **Check** the shorts (below). Free.

9. **The real total.** Extra shorts are charged during the run, so `credits_charged` is not the
   whole bill. Call `get_credit_balance`: "Used" on the card is the balance before the run
   (step 6) minus the balance now. If something else ran in the workspace meanwhile, the
   difference is off: work it out from the quote instead (N, plus X per short past the third).

10. **Show** the result with the card, then **offer next steps** (both below).

11. **Post them**, when the person says yes to posting. The craft and the calls are in
    [references/posting-shorts.md](references/posting-shorts.md); in short:
    - `list_connections` with `brand_id`: the accounts that can post (`can_publish: true`).
      None: they connect one at https://app.creatorline.io/connections?activeBrand=BRAND_ID.
    - Write a caption, 3 to 5 hashtags and, for YouTube, a title for every short, in the
      brand's voice. Show them all in one numbered message and ask "Put these in your review
      queue?" (a caption is changed only in the app once the post exists).
    - On their OK, one `create_post` per short (`asset_ids` = that short alone). Free; nothing
      is public yet.
    - Sending them out is `publish_post`, one explicit yes naming the posts, the accounts and
      the time (house rules, section 2). `mode: "queue"` spreads them over the brand's posting
      slots; details in `creatorline-publish`.

## Craft

### A good source

| Works well | Works badly |
|---|---|
| Clear speech, one to three speakers, good microphones | Music, gameplay without talk, long silences, mostly b-roll: no transcript, or no topic to cut |
| Several subjects in one recording: an episode, a Q&A, an interview, a talk, a class | One long story on one subject: one or two shorts |
| A camera on each speaker, or one person near the middle | A wide shot of two people side by side: the vertical frame holds one face at a time, so the other is out of frame, and the crop can miss a quick exchange |
| Slides and screen shares | Fine: shown whole, with bars above and below |
| A sharp wide recording, 1080p or more | 720p looks soft in a short and lower looks blurry: the vertical crop keeps about a third of a wide picture's width |
| Several minutes to about an hour (a link); up to 100 MB as a file | Under about 2 minutes: nothing to choose between. Over about an hour: topics come only from roughly the first hour, yet every second is priced |
| The person's own recording, or one they have the rights to | Someone else's channel or show: never post it as theirs |

Tell the person what to expect in one line when it matters: "A video on many subjects gives
more shorts; one long story gives one or two."

### Picking the caption look (`caption_style`)

Pick from the brand's tone in `brand_voice`; when nothing points anywhere, keep the default.
Describe a look in words; never name the value to the person.

| Value | What it looks like | Fits |
|---|---|---|
| `hormozi` (default) | Big uppercase words, a thick black edge, the spoken word in yellow | Business, money, fitness, strong opinions, energetic talk |
| `tiktok` | The app's own caption: small white lowercase words, a thin edge | Lifestyle, creators who want it to look native |
| `minimal` | Lowercase words with only a shadow | Calm, premium, dark or moody footage |
| `sticker` | Black words in a heavy white edge | Bright, playful brands |
| `bold` | White lowercase words, a heavy black edge | Busy or bright footage, outdoor recordings |
| `karaoke` | The spoken word fills with gold as it is said | Stories, teaching, slower speakers |

If the person names a look the way the app does ("Hormozi", "Karaoke"), use that value.

### Safety for clipped content

- Clip only what the person made or has the rights to. A guest appears on their show by the
  show's own terms: that is their call, but never clip another creator's video to post as
  theirs.
- The shorts are real footage, only cut and captioned: post them with `made_with_ai: false`,
  unless the recording itself shows an avatar or other AI-made video (then `true`).
- The speaker is a real person, so a post caption never puts words in their mouth: no claim,
  result or credential they did not state on camera (house rules, section 7, Real people).

## When Video Studio fits better

| The person wants | Do |
|---|---|
| Several shorts, the best moments picked for them | This skill |
| One moment they can name by time, or a quote they can find the time of | Video Studio: the moment trimmed from the file, a headline, captions, export |
| Their own list of moments | Video Studio: one project per moment (or a best-of in one) |
| A moment without captions, or with their own words on screen | Video Studio: captions are optional there |
| Two people in one wide shot, both kept in view | Video Studio: the wide picture shown whole across the middle |
| One of the finished shorts trimmed, or a call to action added at its end | Video Studio on that short |

Video Studio needs the recording in the library as a file (a YouTube link cannot be imported),
and it crops a wide video at its center, where this tool follows the speaker's face. For one
moment of a long recording it usually costs less: captions and an export each have a small
fixed price, where this tool's price grows with the whole recording's length. The recipes, op
by op: [references/one-moment.md](references/one-moment.md).

## Check before you show it

`preview_assets` with the outputs' `asset_id`s (up to 8 per call, so 10 shorts take two calls).
Each picture is a short's first frame, with its headline at the top. Free.

- Read each headline: it names the short on the card. When one cannot be read, name it by its
  place and length ("Short 3, 0:48").
- The frame is vertical and the speaker's face is in it.
- Each short's `duration_sec` is between 5 and 100.
- Fewer shorts than they hoped is not a fault: say how many topics were found.
- You cannot hear the shorts. Ask them to watch for a mis-heard name in the captions: the
  captions are burned in, so a fix is that moment redone in Video Studio, where captions can
  be corrected line by line.

## If it goes wrong

| What happened | Likely cause | Fix |
|---|---|---|
| Refused at the quote: `Missing required input "source_video"`, though you sent `source_url` | Links are not taken for this tool on this connection right now | The file route (step 5). Never move the link into `inputs` |
| Refused: the link "goes in `source_url`" | A YouTube link was put in `inputs` | Pass it as `source_url` |
| Refused: "Pass either `source_url` or `inputs.source_video`, not both" | Both were sent | Keep one |
| Refused: a page link, not a file | A cloud-drive or other web page | An upload, or a YouTube link |
| Failed: `no-transcript` | No clear speech was heard: music, silence, noise, or speech too faint | A recording where people talk. For a very long upload, a shorter part |
| Failed: `no-clips-found` | Speech, but no topic that stands on its own (chit-chat, all intro, too short) | A longer or denser recording, or one moment by time in Video Studio |
| Failed: `all-clips-failed` | Every short failed while being cut | Say that the first charge came back but an extra-shorts charge, if there was one, did not. The same call once more (a new paid run: ask first); then another file of the same recording |
| Failed: `no-source-video`, or the video could not be read or downloaded | A private, members-only or age-restricted video, a removed one, or a link that is not YouTube | A public YouTube link, or an upload |
| Fewer shorts than hoped | One per distinct topic | Expected. More moments: Video Studio by time |
| A short starts or ends a little early or late | The cut follows sentences | Trim it in Video Studio (`creatorline-video-studio`) |
| Someone is out of the frame, or the crop sits on the listener | A wide two-person shot: one face fits at a time, chosen from still frames | Expected; a camera per speaker cuts better. Both in view: that moment in Video Studio ([one-moment.md](references/one-moment.md), section 5) |
| A wrong word in the captions | Mis-heard speech, burned in | That moment in Video Studio with `write_captions`, then `edit_caption` |
| The balance fell more than the first charge | Extra shorts are charged during the run | As quoted. Show the real total (step 9) |

A failed run is refunded (house rules, section 5). Never start the same paid run twice without
a yes, and change one thing per retry.

## Show the result

One line per short, then one set of links and one "What next?". Name every short by its
headline, never by an id:

```
**8 shorts from "Pricing your first product"**: vertical, 25 to 80 s each, a headline and
bold captions on every one.
1. [Why your first price is always too low](URL_1) · 0:48
2. [The question to ask before any discount](URL_2) · 1:12
3. [Raise prices without losing customers](URL_3) · 0:55
...
[Open them all in Creatorline](STUDIO_URL)
Used N credits. M left.

What next?
1. Write a caption for each and put them in your review queue.
2. Post one a day for the next 8 days, in your posting slots.
3. Add a "full episode on YouTube" line to the end of the best one.
```

`URL_n` is the `url` of each item in `output`, in the order listed; the length is its
`duration_sec` as minutes and seconds. `STUDIO_URL` is `studio_url` from `get_generation`.
Media links expire; the Creatorline link stays.

## Next steps to offer

Pick two or three that fit:

| Next step | How |
|---|---|
| A caption, hashtags and a YouTube title for each, into the review queue | Step 11 and [references/posting-shorts.md](references/posting-shorts.md) |
| Spread them over the coming days | `publish_post` with `mode: "queue"`, one per short, on an explicit yes (`creatorline-publish`) |
| A trim, an end line ("full episode on YouTube"), a call to action on one short | `creatorline-video-studio` |
| A cover image for the best short | `creatorline-cover-image` (set by hand in the platform's app; a post sent from Creatorline cannot carry one, and every short already opens on its headline) |
| The avatar re-filming the best moment as its own take | `creatorline-reshoot` with that short as the source (it films up to 30 s of it), when one person speaks in it: the avatar tells it as its own |
| Next week's episode | This skill again, with the new link |

## References

- [references/sources-and-framing.md](references/sources-and-framing.md): every way a recording
  comes in, how topics are chosen, how each short is framed and captioned, timing, how the
  price is built, and answers to the questions people ask.
- [references/one-moment.md](references/one-moment.md): Video Studio recipes for one moment by
  time, a list of moments, a best-of, and polishing a finished short.
- [references/posting-shorts.md](references/posting-shorts.md): captions, hashtags and YouTube
  titles per short, the posting calls, spreading them out, covers.
- Shared: [references/house-rules.md](references/house-rules.md),
  [references/asking.md](references/asking.md).
