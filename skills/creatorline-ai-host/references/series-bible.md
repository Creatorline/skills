# Series bible

What keeps a recurring show the same from episode to episode, where that record lives, and how
the next episode starts from it.

## Contents

1. [The bible](#1-the-bible)
2. [Rules that make a format hold](#2-rules-that-make-a-format-hold)
3. [Where the bible lives](#3-where-the-bible-lives)
4. [The next episode](#4-the-next-episode)
5. [Several episodes at once](#5-several-episodes-at-once)
6. [Changing the format](#6-changing-the-format)

## 1. The bible

Fill it after the first episode is approved, from what was actually made. The person reads it,
so write it in plain words: no ids, no `@` names, no field values. Keep it short enough to
paste.

```
Show: Speak Up Sundays. Short, calm coaching on sounding confident at work, one idea a week.
Host: Mia, in her own voice in every part.
Set: Mia at a light oak desk, sage green plaster wall, walnut shelf with a lamp.
  The set photo is in your library (search "sage green plaster wall oak desk").
Look: soft light from the left, phone propped at eye level, her outfit from her photo,
  talking-head style, vertical, standard sharpness.
Episode: about 60 s, countdown, 3 parts and the sign-off, the hook first, never the show name first.
Tag (text after the hook): "Speak Up Sundays · Ep. <n>"
Sign-off (the same clip every week): "That's Speak Up Sundays. See you next Sunday."
Call to action (text over the sign-off, and in the post): "New episode every Sunday"
Texts: words on a solid plate; big hook, medium labels "1. ...", small tag, all at the top.
Captions: big bold words, the spoken word in yellow.
Cutaways: hands, objects and rooms, no faces, about one every 12 s, silent.
Music: none.
Cover: Mia chest-up on the left, 3 to 4 words of the promise on the right.
Post: one line of the promise, "Ep. <n> of Speak Up Sundays", #speakupsundays #careertips #meetings
Episodes: 1 (last: "3 phrases that make you sound confident")
```

Each line maps back to a call: the set and look lines become each part's set, light, wardrobe
and camera sentences (host-continuity.md, section 1); "talking-head style, vertical, standard
sharpness" are `ugc_style: "Talking head"`, `9:16` and `720p`; the exact text look, sizes and
caption style are read off the last episode with `get_video`; the cover line is the brief for
creatorline-cover-image; the post line feeds creatorline-publish.

## 2. Rules that make a format hold

- **A promise a viewer can repeat.** "One confident-speaking idea a week, in a minute." Every
  episode delivers that and nothing else.
- **Hook first, every time.** The show's name never opens an episode. It comes after the hook,
  as the tag text.
- **The same parts in the same order**, with the same label pattern ("1. ...", "2. ...").
  Viewers learn the rhythm and stay for it.
- **The same closing words.** The sign-off is filmed once as its own short clip and reused at
  the end of every episode: identical, and no new take each week.
- **The same host kit.** Set photo, wardrobe, camera and light sentences, template, frame,
  voice. A change shows at once when episodes sit side by side on a profile.
- **The same looks.** Text look and sizes, caption style, cover layout.
- **Numbered episodes.** In the title, the tag and the post caption.
- **A steady day.** The posting rhythm is set with creatorline-publish or in the app's calendar.

## 3. Where the bible lives

- **In the chat**: give it as a short block after the first episode.
- **In the brand**: suggest the person adds ONE line about the show to the brand's Format
  notes in Creatorline (the Brand item in the left rail, card "Audience and format"), below
  what is already there. Format notes describe every format the brand uses and feed its post
  ideas, so the whole bible does not belong there. Write the line for them, for example:
  "Weekly show Speak Up Sundays: Mia at an oak desk by a sage green plaster wall, about 60 s, a
  countdown in 3 parts, ends on 'That's Speak Up Sundays. See you next Sunday.'" The set words
  in it are what `list_assets` searches for the set photo. Every later chat reads it from
  `get_brand` (`brand_voice.format_notes`), in any app. Only the person can write there; no
  tool does it.
- **In the work itself**: the episodes' Video Studio projects ("<Show> Ep. <n>: <topic>").
  `list_videos` finds them; `get_video` on the last one shows the texts' look and size, the
  caption style, and the clips, among them the sign-off clip's `asset_id`.
- **The set photo**: in the brand's library, found with `list_assets` (`brand_id`, `file_type:
  "image"`, `search` with the words in the bible) and confirmed with `preview_assets`.

## 4. The next episode

1. Orient as usual; read `brand_voice.format_notes` from `get_brand`. If the person pastes the
   bible, it wins.
2. `list_videos` for the brand; `get_video` on the highest episode number (the list is
   ordered by last change, not by episode). Take the episode number, the text looks and sizes,
   the caption style, the label pattern and the sign-off clip from it. Find the set photo with
   `list_assets` and check it with `preview_assets`.
3. Rebuild the kit from what you found: the set photo, and the set, light, wardrobe and camera
   sentences written from it the same way as before (host-continuity.md, section 1).
4. Ask only the topic (and anything the bible does not say). State the rest as defaults: "Same
   set, same look, Ep. 5, about 60 s."
5. Write the script in the series' format and parts; quote it the usual way. There is no new
   set photo and no new sign-off, so the episode costs less than the first.
6. Film all parts at once: the look was approved on the pilot of episode 1.
7. Assemble with the series' looks; the sign-off clip goes last. Update the episode count in
   the bible you show at the end.

Nothing found (no episodes, no set photo, no line in Format notes) and no bible pasted: treat
it as a first episode with a new set and a pilot, and say so.

## 5. Several episodes at once

- Write every script, then quote every item of every episode, one total, one yes
  (house-rules.md, section 2).
- Film episode by episode, so a problem in the first one is caught before the rest is spent.
- Assemble and export each as its own video.
- For a calendar of episodes among other posts, creatorline-content-calendar plans it and sends the
  episodes back here.

## 6. Changing the format

- A change the person asks for (a new set, a new outfit, a new segment) starts a new season:
  say so, make the change once, update the bible, keep everything else the same.
- When an episode does not fit the format (a special, a collaboration), make it, but keep the
  host kit, the looks and the sign-off so it still reads as the same show.
