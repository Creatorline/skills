# Montage: one free ffmpeg command as a workflow step

A `montage` node runs ONE ffmpeg command over named inputs and hands its one file to the next
step. Reach for it when the catalog steps do not make the edit: a split screen, a picture in
picture, a zoom and pan on a still, a transition between two takes, text that slides or fades,
a logo, a color look, music ducked under a voice, a speed change, a loop. The steps make the
media; Montage composes it.

## Contents

1. Node shape
2. Rules the validator holds you to
3. Writing the command
4. Recipes
5. Price, failures, reuse

## 1. Node shape

```jsonc
{
  "id": "m1",
  "kind": "montage",
  "inputs": [                              // 1 to 10, in order; each is a port taking ONE media
    { "name": "top", "type": "video" },    // type: video | image | audio
    { "name": "bottom", "type": "video" }
  ],
  "argv": ["ffmpeg", "-i", "{top}", "-i", "{bottom}", "...", "{output}"],
  "output": { "type": "video", "format": "mp4" }, // video: mp4|mov|webm, image: png|jpg, audio: mp3|wav|m4a
  "ratio": "9:16",                         // the output's aspect, written on the asset (default 9:16)
  "note": "Stacks the two takes top and bottom, keeps the first one's sound",
  "slotBindings": { "bottom": "<asset id>" } // optional: an input filled by a pinned asset
}
```

- An edge into it names the input: `{ "source": "n1", "target": "m1", "targetHandle": "top" }`.
  Omitted, the edge takes the first free input of the source's type.
- An `image` node, a step's output or a pinned asset fills an input; one of them per input.
- Its output port carries `output.type`: wire it into a step's slot, another Montage or publish.
- `note` is what the person reads on the canvas: one plain sentence, what it does, no flags.

## 2. Rules the validator holds you to

- `argv[0]` is `ffmpeg`; every token is one argument (there is no shell, so no quotes around a
  token and no `|`, `>` or `&&`).
- Media is reached by placeholder only: `{name}` for an input, `{output}` for the file it
  writes. Every input is read at least once, and `{output}` is written.
- Refused: a URL or a `scheme:` prefix (except ffmpeg's `expr:`), a file path other than
  `/dev/null`, the `movie=` / `amovie=` sources, a bare `-`, `-protocol_whitelist`, `-safe`
  other than 1.
- `@name` puts a Text node's words into a token (a hook a dynamic Text node wrote, into
  `drawtext`). The words go in as they are: keep `'`, `:` and `\` out of them, or ask the
  Text node for plain words.
- `validate_workflow` reports all of it with the node and token named. Fix every line, then
  run.

## 3. Writing the command

- The frame is 1080 x 1920, 9:16. Scale every visual input onto it
  (`scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920` to fill,
  `...=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2` to fit) and add `setsar=1`; even sizes only.
- Encode `-c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k
  -movflags +faststart`. The job is billed on how long ffmpeg runs, so `veryfast` matters.
- Map what you made: `-map "[v]"` for a filter output; `-map 0:a?` keeps a source's sound when
  it has one (the `?` keeps a silent input from failing the job).
- Two inputs of different lengths: `vstack`, `hstack` and `xstack` run to the LONGEST unless
  given `shortest=1`; `overlay` takes `shortest=1` too; or cut the output with `-t`.
- A still as video: `-loop 1 -t 5 -i {photo}` (image inputs are one frame otherwise).
- Generated sources are allowed: `-f lavfi -i color=c=black:s=1080x1920:d=5`,
  `-f lavfi -i anullsrc=r=44100:cl=stereo`.
- `xfade` and `concat` need inputs with the same size, frame rate and pixel format: normalize
  each with `scale`, `fps=30`, `format=yuv420p`, `setsar=1` first.
- Text: `drawtext=text='Your words':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=h*0.18:
  box=1:boxcolor=black@0.45:boxborderw=24`. Position and opacity take time expressions
  (`x='-text_w+min(t,0.6)/0.6*((w+text_w)/2)'` slides in over 0.6 s;
  `alpha='min(t/0.4,1)'` fades in).

## 4. Recipes

Each filter graph below is one `-filter_complex` token.

| Edit | Inputs | Filter graph (the core) |
|---|---|---|
| Split screen, top and bottom | `top`, `bottom` video | `[0:v]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960,setsar=1[a];[1:v]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960,setsar=1[b];[a][b]vstack=shortest=1[v]` |
| Side by side | `left`, `right` | the same at `540:1920`, then `hstack=shortest=1` |
| Picture in picture | `main`, `cam` video | `[1:v]scale=360:-2[p];[0:v][p]overlay=W-w-48:H-h-220` |
| Logo, top right | `main` video, `logo` image | `[1:v]scale=200:-1[l];[0:v][l]overlay=W-w-40:40` |
| Zoom in on a still (Ken Burns) | `photo` image, `-loop 1 -t 6` | `scale=2160:3840,zoompan=z='min(zoom+0.0015,1.3)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=180:s=1080x1920:fps=30` |
| Crossfade two takes | `a`, `b` video | normalize both, then `[a][b]xfade=transition=fade:duration=0.5:offset=<length of a minus 0.5>` (also `slideleft`, `wipeup`, `circleopen`, `dissolve`) |
| Blurred fill behind a wide clip | `main` video | `[0:v]split[b][f];[b]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30[bg];[f]scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2` |
| Music under a voice, ducked | `voice` video, `music` audio | `[1:a]volume=0.35[m];[m][0:a]sidechaincompress=threshold=0.05:ratio=8[d];[0:a][d]amix=inputs=2:duration=first[a]` |
| Green screen over a scene | `fg` video on green, `bg` video or image | `[0:v]chromakey=0x00ff00:0.15:0.08[k];[1:v][k]overlay[v]` |
| Speed ramp | `main` video | `[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]` (2x) |
| Color look | `main` video | `eq=contrast=1.08:saturation=1.15:gamma=0.97` |

A 2 x 2 grid of four videos: scale each to `540:960`, then

```
[a][b][c][d]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0:shortest=1[v]
```

## 5. Price, failures, reuse

- Billed after the run on what the job really cost: usually under 1 credit, a few for a long
  1080p render. The plan and `run_workflow` show 1 credit per Montage as the estimate.
- A command ffmpeg rejects comes back as `exec_error`, with no ffmpeg output to quote, and
  costs nothing. Check, in order: stream labels (`[0:v]`, the `[v]` you map), an input
  without the stream you map (a silent clip has no `0:a`; write `0:a?`), mismatched sizes or
  rates before `xfade` / `concat` / `vstack`, and a crop or pad window larger than the frame.
  Test the one step with `run_workflow` and `only_node_ids` before the whole workflow.
- An unchanged command on unchanged inputs is served again from the last run (a new `note` is
  not a change).
- What it cannot do: 3D, particles, motion tracking, letter by letter text animation. Say so
  and offer the closest edit above.
