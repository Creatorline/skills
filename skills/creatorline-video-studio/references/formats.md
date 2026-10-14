# Formats

Edits that work in the Video Studio, each as the operations to send. Every list goes in one
`create_video` (with `brand_id` and a `title`) or one `edit_video` (with `video_id`). Values in
angle brackets come from your own calls: asset ids from `list_assets` or `import_asset`, stock
ids from `list_stock_clips`, clip and text ids from the answer of the call before. The trims,
lengths and words are examples: a `trim_end` stays within the file's length (`duration_sec` in
`list_assets`, `duration` in `list_stock_clips`). After each build: read the answer,
`preview_video`, fix, then the finish (SKILL.md, steps 9 to 11).

## Contents

1. [Hook opener](#1-hook-opener)
2. [Tips or a list, with labels](#2-tips-or-a-list-with-labels)
3. [Photo reel with music](#3-photo-reel-with-music)
4. [Green screen reaction](#4-green-screen-reaction)
5. [Split screen](#5-split-screen)
6. [Before and after](#6-before-and-after)
7. [Comment reply](#7-comment-reply)
8. [Product card over a talking clip](#8-product-card-over-a-talking-clip)
9. [Narrated b-roll](#9-narrated-b-roll)
10. [Several takes into one video](#10-several-takes-into-one-video)
11. [A quick re-cut of one take](#11-a-quick-re-cut-of-one-take)
12. [Choosing a format](#12-choosing-a-format)

## 1. Hook opener

**When:** any video whose own first seconds are slow. A ready-made clip of a face reacting, with
the hook line over it, stops the scroll; the person's video follows.

```json
[
  { "op": "add_hook", "stock_id": "<hook>", "text": "You're using retinol wrong", "id": "hook", "trim_end": 2.5 },
  { "op": "add_clip", "asset_id": "<their video>", "id": "main", "trim_start": 0.4 }
]
```

- Find the hook with `list_stock_clips` (`library: "hooks"`, `search` for the mood: "shocked
  woman", "side eye", "pointing"). Its `duration` must be at least the `trim_end` you give.
- The hook line gets its own text id, written in the `applied` note. It starts at size `m`;
  a hook of four words or fewer reads better at `l` (`update_text` with that id and
  `"size": "l"`).
- Most stock hooks are silent; the person's video brings the sound.
- Then, with the times from the answer, a call to action over the last 2.5 s:
  `{ "op": "add_text", "text": "Link in bio", "start": <end - 2.5>, "end": <end>, "position": "middle" }`.

## 2. Tips or a list, with labels

**When:** a talking clip that counts things ("3 mistakes", "5 tools"). A title opens it and
each item gets a label while it is said.

First call:

```json
[
  { "op": "add_clip", "asset_id": "<talking take>", "id": "talk", "trim_start": 0.3 },
  { "op": "add_text", "id": "title", "text": "3 runner mistakes", "start": 0, "end": 2.5, "position": "top", "size": "l" }
]
```

To time the labels you need to know when each item is said. You cannot hear the clip, so
write the captions first (`write_captions`, priced and agreed with the export as one finish):
`captions.lines` in `get_video` is a transcript with times. A video pays for captions once, so
writing them again after later cuts is free. Then:

```json
[
  { "op": "add_text", "id": "tip1", "text": "1. Too fast, too soon", "start": <line start>, "end": <next item's start>, "position": "top" },
  { "op": "add_text", "id": "tip2", "text": "2. Same shoes forever", "start": <line start>, "end": <next item's start>, "position": "top" },
  { "op": "add_text", "id": "tip3", "text": "3. Skipping rest days", "start": <line start>, "end": <line end + 1>, "position": "top" }
]
```

- Leave `look` and `size` out of every label: they all get the same default look, so they
  match. Only the title is `l`.
- Labels on the top row; captions keep the bottom.
- Texts do not change the captions. A later trim does: `write_captions` again, free.

## 3. Photo reel with music

**When:** "turn these photos into a reel with my song". Photos show for a set time; music
carries it.

```json
[
  { "op": "add_clip", "asset_id": "<photo 1>", "id": "p1", "duration": 2 },
  { "op": "add_clip", "asset_id": "<photo 2>", "id": "p2", "duration": 1.5 },
  { "op": "add_clip", "asset_id": "<photo 3>", "id": "p3", "duration": 1.5 },
  { "op": "add_clip", "asset_id": "<photo 4>", "id": "p4", "duration": 2.5 },
  { "op": "add_text", "id": "title", "text": "Our weekend in Lisbon", "over": "p1", "position": "top", "size": "l" },
  { "op": "add_text", "id": "cta", "text": "Save this for later", "over": "p4", "position": "middle" },
  { "op": "set_sound", "asset_id": "<their audio file>" }
]
```

- A photo shows 0.3 to 30 s (3 s when `duration` is left out). 1.5 to 2.5 s per photo keeps it
  moving; the strongest photo goes first.
- `set_sound` takes an audio file of the brand's (`list_assets` with `file_type: "audio"`, or
  `import_asset`). There is no stock music.
- You cannot hear the song, so you cannot cut on its beat. Say so, and point them to the studio
  to nudge a photo's length by hand.
- Photos do not move. For motion, `run_video_ai` with `animate_photo` on the hero photo
  (priced). For a swipeable post instead of a video, a carousel: `creatorline-publish` posts
  the photos they have as one, `creatorline-photos` makes new ones.
- Nothing is said, so no captions.

## 4. Green screen reaction

**When:** reacting to a trend, a product or a headline. A person filmed on green stands in
front of the video; their green comes off by itself.

```json
[
  { "op": "add_clip", "asset_id": "<the video reacted to>", "id": "src", "trim_end": 12 },
  { "op": "add_layer", "stock_id": "<green screen clip>", "id": "me", "over": "src", "column": "left", "row": "bottom", "width": 0.6 },
  { "op": "add_text", "id": "top", "text": "Me reading the ingredients", "over": "src", "position": "top", "size": "l" }
]
```

- Find the person with `list_stock_clips` (`library: "green_screen"`, `search` for the
  feeling: "laughing", "confused", "side eye").
- `column: "left"` keeps them clear of the apps' buttons down the right side; `row: "bottom"`
  lets the frame's lower band cover only their body.
- Two sounds play at once: the video's and the reacting person's (a green screen layer is heard
  by default). Keep one: `{ "op": "update_clip", "id": "src", "sound": false }` or
  `{ "op": "update_layer", "id": "me", "sound": false }`.
- A layer lasts no longer than its own clip: the `note` says when it was shortened.
- A video reacted to must be the brand's own, imported with the person's right to use it.

## 5. Split screen

**When:** a talking clip on top and something to watch below (the product in use, a screen
recording, satisfying footage). Two pictures keep eyes on the screen.

```json
[
  { "op": "add_clip", "asset_id": "<talking take>", "id": "talk" },
  { "op": "set_split_screen", "id": "talk", "asset_id": "<second video>", "place": "bottom", "share": "half", "sound": false, "main_focus": { "x": 0.5, "y": 0.35 } }
]
```

- `share`: `third`, `half` or `two_thirds` of the frame's height for the second video.
- `main_focus` keeps the speaker's face in their half; `focus` does the same for the second
  picture. x and y run 0 to 1 from the left and the top; an optional `zoom` 1 to 3.
- A split screen belongs to one clip. Give each clip of the video the same second video and it
  plays on across the cuts.
- Captions in position `auto` (the default) move to the middle row, the seam, by themselves:
  keep labels on the top row.
- The split is top and bottom only. For "the avatar on the left, the product on the right",
  say so in one line and use top and bottom, or show the product as a card (format 8).
- There is no stock gameplay or b-roll: the second video comes from their library or a link.

## 6. Before and after

**When:** a visible change: a room, a setup, a look, an edit.

One after the other (photos shown here; for videos use `trim_start` / `trim_end` instead of
`duration`):

```json
[
  { "op": "add_clip", "asset_id": "<before>", "id": "before", "duration": 2 },
  { "op": "add_clip", "asset_id": "<after>", "id": "after", "duration": 3 },
  { "op": "add_text", "id": "t1", "text": "Before", "over": "before", "position": "top", "size": "xl" },
  { "op": "add_text", "id": "t2", "text": "After", "over": "after", "position": "top", "size": "xl" }
]
```

Stacked instead: `add_clip` the after with id `after`, then
`{ "op": "set_split_screen", "id": "after", "asset_id": "<before>", "place": "top", "share": "half" }`.

- The change lands on the cut: hold "before" shorter than "after".
- With an avatar, the two halves are two takes cut together here. A look or a setup can also
  change on camera inside one take.

## 7. Comment reply

**When:** answering a viewer's comment on camera. The comment shows first, then the answer.

```json
[
  { "op": "add_clip", "asset_id": "<talking answer>", "id": "talk", "trim_start": 0.3 },
  { "op": "add_layer", "asset_id": "<comment screenshot>", "id": "comment", "start": 0, "duration": 3, "column": "center", "row": "middle", "width": 0.8, "border": "white", "corners": "rounded" }
]
```

- A comment the person supplies goes in as its screenshot. Without one, write the comment as a
  text (`add_text`, look `tiktokHighlight`), never as a generated picture: generated words come
  out garbled. No real person's name or handle without their consent.
- A layer's `row: "top"` sits flush with the frame's top, under the apps' own top band: keep
  cards on the middle row and check with `show_safe_area`.

## 8. Product card over a talking clip

**When:** the avatar talks about a product and the viewer should see it up close for a
moment.

```json
[
  { "op": "add_layer", "asset_id": "<product photo>", "id": "product", "start": <when it is named>, "duration": 2.5, "column": "center", "row": "middle", "width": 0.45, "border": "white", "corners": "rounded" }
]
```

- Time it to the line that names the product: `captions.lines` once captions exist, else a
  guess you check with `preview_video` at that second.
- The face reads best in the upper middle: a card on the middle row, under half the frame wide,
  leaves it free.
- A `video` layer (a clip shown as it is, `kind: "video"`) works the same way for a product
  demo. It is silent unless you give it `sound: true`, so the speaker stays heard.

## 9. Narrated b-roll

**When:** a voice tells a story over footage: an explainer, a list, a faceless clip. Build the
picture first, then the voice, then fit the picture to the voice.

```json
[
  { "op": "add_clip", "asset_id": "<b-roll 1>", "id": "b1", "trim_end": 3 },
  { "op": "add_clip", "asset_id": "<b-roll 2>", "id": "b2", "trim_end": 3 },
  { "op": "add_clip", "asset_id": "<b-roll 3>", "id": "b3", "trim_end": 3 },
  { "op": "add_clip", "asset_id": "<b-roll 4>", "id": "b4", "trim_end": 3 },
  { "op": "set_all_clips_sound", "sound": false },
  { "op": "add_text", "id": "hook", "text": "Why Venice is sinking", "over": "b1", "position": "top", "size": "l" },
  { "op": "set_sound", "asset_id": "<music>" }
]
```

Then `add_voiceover` (priced, agreed) with `over: "b1"`; its answer gives the voice's real
`end`. Lengthen or shorten the last clips so the video ends about 0.3 s after the voice, look
again, then captions (`karaoke` suits narration) and the export.

- The music is turned down by itself while the voice speaks.
- Each b-roll clip 2 to 4 s; a new picture for each new sentence.
- Writing the narration itself: `creatorline-voiceover` and `creatorline-faceless-video`.

## 10. Several takes into one video

**When:** an episode, an unboxing or a tutorial filmed as several takes.

```json
[
  { "op": "add_clip", "asset_id": "<take 1>", "id": "t1", "trim_start": 0.4 },
  { "op": "add_clip", "asset_id": "<take 2>", "id": "t2", "trim_start": 0.4 },
  { "op": "add_clip", "asset_id": "<take 3>", "id": "t3", "trim_start": 0.4 },
  { "op": "add_text", "id": "title", "text": "Episode 3: desk setup", "start": 0, "end": 2.5, "position": "top", "size": "l" }
]
```

- Trim the settle at each take's start, so every join lands mid-energy.
- To cut a flub or a long pause inside a take: write captions first and find the gap between
  two lines. In one call, `split_clip` with `at` the gap's start and `split_clip` with `at` its
  end; the `applied` notes name the new clips. In the next call, `remove_clip` the middle one.
- After the cuts, re-anchor labels with `over`, then `write_captions` again (free).

## 11. A quick re-cut of one take

**When:** "cut the first 2 seconds", "make it faster", "end it sooner".

```json
[
  { "op": "update_clip", "id": "<clip>", "trim_start": 2, "trim_end": 11.5, "speed": 1.1 }
]
```

- `trim_start` and `trim_end` are seconds of the clip's own source: read the current ones and
  `source_duration` from `get_video` first.
- `speed` runs 0.5 to 2. 1.1 to 1.25 tightens a slow talker; the voice keeps its pitch. Texts
  over the clip stretch with it.
- Then a hook line and a call to action as in format 1.

## 12. Choosing a format

| The person wants | Format |
|---|---|
| "It starts slow", "make people stop scrolling" | 1, and trims (11) |
| A count of tips, tools, mistakes | 2 |
| Photos into a video | 3 |
| A reaction to something | 4 |
| Two things on screen at once | 5 |
| A change shown | 6 |
| An answer to a comment | 7 |
| The product seen up close while the avatar talks | 8 |
| A voice over footage | 9 |
| Several takes in one | 10 |
| One clip tightened | 11 |

Formats combine: a hook opener (1) in front of a list (2) with a product card (8) is one
call with all of their operations, the clips first.
