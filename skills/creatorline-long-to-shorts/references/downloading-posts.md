# Downloading a social post's video

What to do when a social link does not get into Creatorline, so a dead end never stops the
work. Creatorline's own way always comes first; downloading the video yourself is the
fallback.

## Contents

1. [Creatorline's own way first](#1-creatorlines-own-way-first)
2. [When it does not get in: yt-dlp](#2-when-it-does-not-get-in-yt-dlp)
3. [Bringing the file in](#3-bringing-the-file-in)

## 1. Creatorline's own way first

| The link | Creatorline's own way |
|---|---|
| A TikTok or Instagram post | `import_asset` with the link, or the link straight in a video slot of create_generation: the server takes the post's video itself. |
| A post or ad the competitor tools list | `get_trend` or `get_competitor_ad`: a direct MP4, Creatorline's own copy. |
| A public YouTube video, for clips | `source_url` on the short-clip run. |
| A direct link to a video file | `import_asset` with the link. |

Use the fallback below only when that way does not work.

## 2. When it does not get in: yt-dlp

**When:** the server refuses the link (a YouTube or Shorts link in a video slot, an X or
Facebook post, a page with a player on it, a post it cannot read), Creatorline's copy is gone
(`media_problem` on `get_trend` or `get_competitor_ad`), or the person wants the file itself.
Then download the video with [yt-dlp](https://github.com/yt-dlp/yt-dlp), the open-source
command-line downloader.

1. **Only where you can run commands** (a coding agent with a terminal, such as Claude Code,
   Codex CLI or Cursor). In a chat with no terminal, give the person the command in step 4 to
   run themselves, then section 3.
2. **Ask before installing.** Say in one line what you will install and why ("This link does
   not import, so I'll install yt-dlp, an open-source video downloader, to save it as an MP4"),
   and wait for the yes. The install is asked once; each download after it is one the person
   asked for.
3. **Install it** when `yt-dlp --version` finds none (one of these):

   ```bash
   python3 -m pip install -U yt-dlp
   ```

   ```bash
   brew install yt-dlp
   ```

   Joining a separate video and audio stream into one MP4 needs ffmpeg (`brew install ffmpeg`,
   or the system's package manager). Without it, use the single-file command in step 4.
4. **Download as MP4**, named by the post's id, into a folder the person picks (the current
   folder when they pick none):

   ```bash
   yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/b" --merge-output-format mp4 -o "%(extractor)s-%(id)s.%(ext)s" "URL"
   ```

   Without ffmpeg: `yt-dlp -f "b[ext=mp4]/b" -o "%(extractor)s-%(id)s.%(ext)s" "URL"`.
5. **Say where it is:** the file name, its length and its size, in one line.

Rules:

- **Public posts only.** Never a login, a cookie file or a private account.
- **Only what the person may use.** Someone else's post is for study and for the brand's own
  version (a Reshoot, a Character Swap), never reposted as it is (house rules, section 7).
- **One try.** A download that fails (the post was removed, the platform blocks it): say so in
  one line and ask for another link or the file. Do not try other options more than once.

## 3. Bringing the file in

A file on the person's machine cannot reach Creatorline through the tools. The person drops it
at https://app.creatorline.io/assets?activeBrand=BRAND_ID (up to 100 MB), then `list_assets`
with `brand_id` and `file_type: "video"` finds it, newest first, and the work goes on with its
`id`. Over 100 MB: cut the part that matters first, or ask for a shorter source.
