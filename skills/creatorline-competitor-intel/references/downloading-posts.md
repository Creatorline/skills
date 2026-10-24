# Downloading a social post's video

When the person wants the video FILE of a social post (TikTok, Instagram, YouTube, X,
Facebook, ...): to keep it, to study it frame by frame, or to edit it on their machine.

## Contents

- [1. Use Creatorline's own link first](#1-use-creatorlines-own-link-first)
- [2. Any other link: yt-dlp](#2-any-other-link-yt-dlp)
- [3. After the download](#3-after-the-download)

## 1. Use Creatorline's own link first

| The post | How to get the file |
|---|---|
| One the tools listed (`list_trending_posts`, `list_competitor_ads`) | `get_trend` or `get_competitor_ad` with its `id`: `media.download_url` / `download_url` is a direct MP4, our own copy. A carousel gives `media.slide_urls`. |
| Only to remake it with the avatar | No download: put the post's link in create_generation's video slot (Reshoot, Character Swap). The server takes TikTok and Instagram post links itself. |

## 2. Any other link: yt-dlp

A social link the tools do not hold, and the person wants the file: download it with
[yt-dlp](https://github.com/yt-dlp/yt-dlp), the open-source command-line downloader.

1. **Only where you can run commands** (a coding agent with a terminal: Claude Code, Codex
   CLI, Cursor). In a chat app with no terminal, say the post can be downloaded there with
   yt-dlp, give the command below, and offer `get_trend` for posts Trends holds.
2. **Ask before installing.** Say in one line what you will install and why ("I'll install
   yt-dlp, an open-source video downloader, to save this TikTok as an MP4"), and wait for the
   yes. The install is asked once; each download after it is one the person asked for.
3. **Install it** (one of these; check first with `yt-dlp --version`):

   ```bash
   python3 -m pip install -U yt-dlp
   ```

   ```bash
   brew install yt-dlp
   ```

   Joining a separate video and audio stream into one MP4 needs ffmpeg
   (`brew install ffmpeg`, or the system's package manager). Without it, use the single-file
   format in step 4.
4. **Download as MP4**, named by the post's id, into a folder the person picks (the current
   folder when they pick none):

   ```bash
   yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/b" --merge-output-format mp4 -o "%(extractor)s-%(id)s.%(ext)s" "URL"
   ```

   Without ffmpeg: `yt-dlp -f "b[ext=mp4]/b" -o "%(extractor)s-%(id)s.%(ext)s" "URL"`.
   A photo carousel: add `--write-thumbnail` or use the post's own app; yt-dlp saves
   videos.
5. **Say where it is**: the file name, its length and size, in one line.

Rules:

- **Only what the person may use.** A competitor's post is for study and for making the
  brand's own version, never to repost as it is (house rules, section 7). Say so once when
  the person asks to post a downloaded video.
- **Public posts only.** Never a login, a cookie file or a private account.
- **A failed download** (the post was removed, the platform blocks it): say so in one line;
  a post in Trends still has `get_trend`. Do not retry with other options more than once.

## 3. After the download

- To use the file in Creatorline (an edit in Video Studio, a reference for a generation), it
  has to be in the brand's library: the person drops it at https://app.creatorline.io/assets,
  then `list_assets` finds it. A link that serves the file (`download_url`) goes in directly
  with `import_asset`.
- To remake it with the avatar, the post's original link is enough (section 1).
