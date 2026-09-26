# SignalDeck Marketing Site — Project Instructions

## Sitemap Rule (MANDATORY)

**Every page that is edited must have its `<lastmod>` date updated in `sitemap.xml` to today's date.**

This includes:
- The edited page itself
- Any index/landing pages that were modified (e.g. `blog/index.html` → update `https://sgnldk.com/blog/` entry)
- New pages being published for the first time (add a new `<url>` block)

Never ship a commit that edits HTML files without checking whether each edited file has a corresponding sitemap entry updated.

## Styles: precompiled Tailwind (MANDATORY)

The site no longer uses the Tailwind Play CDN or per-page `tailwind.config` scripts. Every page links the compiled stylesheet `assets/css/site.css` (relative path, e.g. `../assets/css/site.css`; `404.html` uses `/assets/css/site.css`). Theme overrides live only in `tailwind.config.js`.

- **New pages:** copy the `<link rel="stylesheet" href=".../assets/css/site.css">` line from a sibling page. Never add `cdn.tailwindcss.com` or an inline `tailwind.config`.
- **After editing any HTML** (or `yup.js`), run `npm install` once, then `npm run build:css` and commit `assets/css/site.css` with the change. Classes that aren't in the built CSS render unstyled.
- The `Build Tailwind CSS` GitHub Action also rebuilds and commits `site.css` on push as a safety net, but build locally so the commit you push already renders correctly.
- Only use complete, literal class names in HTML/JS (no string-concatenated class fragments), so the build can see them.

## SEO conventions

- Internal links use the directory form (`../mcp/`), never `.../index.html`.
- Visible FAQ text and `FAQPage` JSON-LD must match verbatim.
- Organization JSON-LD references `"@id": "https://sgnldk.com/#org"`.
- `feed.xml` drives Fedica auto-posting to X/Bluesky/LinkedIn: adding or re-dating an item posts to social, so only add items for genuinely new posts.
