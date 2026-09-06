# Deep-dive answers — HTML (Q1–Q88)

Part 1 of the interview set. Source: `index.html`.

Interview prep for the vanilla TypeScript Snake demo. Pair with `style.css`, `src/main.ts`, `src/Board.ts`, and `src/Game.ts`. Recruiter language first, then mechanics, then a snippet from this repo as it exists today.

**Honest gaps in this part:** the overlay is not `hidden` in HTML (empty FOUC cover before JS); the canvas has no `width`/`height` attributes, no `aria-label`, no fallback, no `tabindex`; score/status have no `aria-live`; there is no skip link, SEO meta, favicon, or Open Graph; `type="module"` `src="dist/main.js"` fails on `file://` CORS; the HUD is hard-coded `0` / `Idle` in HTML.

---

## Lines 1–2 — `<!DOCTYPE html>` and `<html lang="en">`

### Q1. Why do you put `<!DOCTYPE html>` as the first line, before `<html>`?

**Non-technical:** That first line is a tiny note that tells the browser “treat this as a modern web page.” Visitors never see it. It has to sit at the very top so the rest of the file is not misread as an old 1990s document. If it were missing or buried later, spacing around the board and the centered layout could shift in small, ugly ways.

**Technical:** The HTML5 doctype must be the first token in the byte stream so the parser starts in the “initial” insertion mode and then “before html.” A comment, an XML declaration, or a premature `<html>` before it can trigger quirks mode. Putting it after `<html>` is ignored: the `html` element already exists. There is no HTML5 alternative that belongs later; the old XHTML FPI doctype is obsolete here. Keep it first so `document.compatMode === "CSS1Compat"`.

```html
<!DOCTYPE html>
<html lang="en">
```

### Q2. What happens if you remove the doctype?

**Non-technical:** The game would still open. A recruiter on current Chrome might not notice. On some engines you would get odd gaps under the canvas, slightly different button sizing, and a body that does not quite sit in the middle the way the CSS intends.

**Technical:** Without a doctype the browser uses quirks mode (`document.compatMode === "BackCompat"`). Replaced-element sizing, percentage heights, and the classic “inline replaced element sits on the text baseline” gap return. This sheet already sets `#board { display: block }`, which papers over the canvas baseline gap even in quirks, but `html, body { height: 100% }` and the flex-centered `body` can still compute differently. `box-sizing: border-box` on `*` is not a quirks-mode kill switch. There is no benefit to omitting the doctype on a 2026 demo. Alternative: always ship `<!DOCTYPE html>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
```

### Q3. What rendering mode does the browser fall into without it, and how would that show up on this page (canvas, overlay, flex-centered body)?

**Non-technical:** The browser would use an old compatibility mode meant for pages written before CSS2. On this screen you would most likely notice a sliver of space under the board, the overlay not quite covering the canvas corners, or the whole card not sitting dead-center on a tall monitor.

**Technical:** Blink, WebKit, and Gecko enter quirks (or almost-standards, depending on the exact preamble). Visible risks here: (1) `<canvas>` is a replaced element — without `display: block` it sits on the baseline and the `.board-frame` grows a few pixels, so `.overlay { inset: 0 }` covers a box that is taller than the bitmap; this CSS already forces block, so that particular gap is mitigated; (2) `body { display: flex; align-items: center; justify-content: center; }` plus `html, body { height: 100% }` is the layout that quirks historically broke with percentage heights; (3) `border-radius` + `overflow: hidden` on the frame still work — they are not quirks-gated. Check `document.compatMode`. Alternative: keep the HTML5 doctype so you never have to debug canvas vs overlay alignment in BackCompat.

```css
#board {
  display: block;
  max-width: 100%;
  height: auto;
}
```

### Q4. Why is it written `<!DOCTYPE html>` (uppercase) rather than `<!doctype html>`? Does HTML5 care?

**Non-technical:** It looks official in all caps because that is how textbooks and older specs printed it. The browser does not care. Lowercase would play the same game.

**Technical:** HTML5 doctype matching is case-insensitive. `<!DOCTYPE html>`, `<!doctype html>`, and mixed case all trigger standards mode. The uppercase form is a leftover from SGML-style documentation, not a parser requirement. XML/XHTML served as `application/xhtml+xml` is stricter, but this file is `text/html`. This repo uses uppercase; the portfolio in the same workspace uses lowercase — both are valid. Alternative: pick one and stay consistent. Do not put a public identifier after `html`; that can change the mode.

```html
<!DOCTYPE html>
```

### Q5. Why `lang="en"` on `<html>` and not on `<body>`?

**Non-technical:** Language belongs on the whole document so the tab title, the heading, the hint, and the footer are all known to be English. Putting it only on the body would leave the words in the browser tab without a language.

**Technical:** The language of a node is inherited from the nearest ancestor with `lang`. `<html lang="en">` covers `<head>` (`<title>Snake — Deque + Set Edition</title>`) and `<body>`. Screen readers pick a synthesizer from it; translation bars use it; `:lang()` and hyphenation would too. `lang` on `<body>` alone does not apply to `<title>` in the document’s accessibility tree. HUD strings written by TypeScript (`Idle`, `Running`, `Game Over`) inherit this same English. Alternative: `lang` on both is redundant; a nested `lang` on a single line is the right override (Q8).

```html
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Snake — Deque + Set Edition</title>
```

### Q6. What happens if you remove `lang` entirely?

**Non-technical:** Sighted players see the same page. Screen-reader users may hear worse pronunciation of short HUD words, and accessibility checkers flag a missing document language. Google Translate may guess.

**Technical:** WCAG 3.1.1 (Language of Page) fails at Level A without a valid `lang` on the document element. VoiceOver and NVDA fall back to the OS voice, which is usually fine for `Score` / `Restart` but can mis-stress `Deque` and `WASD`. Search engines still index a local demo; language detection is statistical. `hreflang` is unrelated (alternate URLs). Alternative: keep `lang="en"`. Do not use `xml:lang` unless you serve XHTML. This page has no other language tags.

```html
<html lang="en">
```

### Q7. How do screen readers use `lang` on a page whose visible copy is English but whose HUD strings (`Idle`, `Running`, `Game Over`) come from a TypeScript enum?

**Non-technical:** The reader assumes the whole page is English, including the live score and status that JavaScript later overwrites. Those status words are English, so the voice stays in English. If the enum later printed Hindi, the reader would still try to say it as English unless you marked that span.

**Technical:** Assistive tech maps document `lang` to a synthesizer. `updateHud()` writes `this.status` into `#status`. `GameStatus` is a string enum: `"Idle"`, `"Running"`, `"Paused"`, `"Game Over"` (space in the last value). Those are English tokens, so `lang="en"` is an honest match. The HTML seed text `Idle` is the same string the enum will put back on `reset()`. Nothing in the HUD sets `lang` per node. If you localized the enum, you would set `lang` on `#status` (or `html`) to match; leaving `lang="en"` while injecting another language fails WCAG 3.1.2. Alternative: keep English enum values as UI copy, or split display strings from the state machine.

```ts
export enum GameStatus {
  Idle = "Idle",
  Running = "Running",
  Paused = "Paused",
  GameOver = "Game Over",
}
```

### Q8. If you later add a Hindi hint line, would you change this attribute or override it locally?

**Non-technical:** Keep the page as English. Mark just the Hindi sentence as Hindi so a screen reader switches voices for that line and then comes back. Do not tell the browser the entire game is Hindi.

**Technical:** WCAG 3.1.2 (Language of Parts): wrap the extra line, e.g. `<p class="hint" lang="hi">…</p>`, and leave `<html lang="en">`. Changing the document language would mis-label the title, h1, HUD labels, Restart, overlay copy from `Game.reset()`, and the DSA footer. ISO 639-1 for Hindi is `hi`; `hi-IN` is optional. Alternative: a separate `index.hi.html` with `lang="hi"` if the whole demo were translated, including `Game.ts` overlay strings.

```html
<html lang="en">
<!-- later, locally — do not change html lang: -->
<!-- <p class="hint" lang="hi">तीर कुंजियाँ / WASD</p> -->
```

---

## Lines 3–5 — `<head>`, charset, viewport

### Q9. Why does charset belong in `<head>`, as early as possible?

**Non-technical:** Charset tells the browser how to decode the letters in the file. It has to be decided before the tab title and the rest of the page are read, or the long dash in the title can turn into garbage.

**Technical:** The HTML spec requires a character encoding declaration within the first 1024 bytes. Browsers start decoding immediately; a wrong guess can force a reparse. Putting `<meta charset="UTF-8" />` as the first child of `<head>` keeps it inside that budget. An HTTP `Content-Type: …; charset=utf-8` header is a stronger signal when a static server sends it (`python3 -m http.server` typically does). This repo has no `_headers` file, so the meta tag is the in-document fallback. Alternative: omit the meta only if every host you use is guaranteed to send UTF-8 — including `file://`, which has no HTTP header.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Q10. What happens if charset is missing, or placed after the title?

**Non-technical:** The tab might show a broken dash, and the middot in the hint might become a replacement character, until the browser guesses again. Chrome often guesses UTF-8, but that is luck, not a contract.

**Technical:** Missing charset: the browser uses the HTTP header, then a heuristic. If you open the file as `file://`, there is no header, so sniffing matters. After `<title>`: the title may already have been decoded with a fallback, then the parser reloads. This title contains U+2014 (`—`), which is the character most likely to mojibake. Alternative: keep charset first in `<head>`; never put it after a large block. This `<head>` is tiny, so even a late meta would still be inside 1024 bytes — early is still the rule you cite in interviews.

```html
<meta charset="UTF-8" />
<title>Snake — Deque + Set Edition</title>
```

### Q11. Why UTF-8 and not ISO-8859-1? Point to a character on this page that would break (`—` in the title, `&middot;`, `Deque&lt;Position&gt;`).

**Non-technical:** UTF-8 is the web’s default and can store every dash and symbol on this page. An old Western-European encoding cannot store the long dash in the tab title.

**Technical:** ISO-8859-1 (Latin-1) has no U+2014 em dash. The title `Snake — Deque + Set Edition` would break if the file were labeled Latin-1. `&middot;` is an HTML entity for U+00B7, which *does* exist in Latin-1, so that one would survive entity decoding even on a Latin-1 page. `Deque&lt;Position&gt;` is ASCII plus entities — also Latin-1-safe. The honest breakage is the em dash (and any future Hindi). Windows-1252 would “work” for the em dash by accident and still fail on other Unicode. Alternative: UTF-8 is non-negotiable.

```html
<title>Snake — Deque + Set Edition</title>
<p class="hint">Arrow keys / WASD to move &middot; Space to pause</p>
```

### Q12. Why the self-closing slash on `<meta charset="UTF-8" />` in an HTML5 document? What changes if you drop it?

**Non-technical:** The slash is a habit from XML and React. On a normal HTML page it does nothing. You could delete every `/>` on meta and link tags and the game would behave the same.

**Technical:** In HTML5, void elements (`meta`, `link`) ignore the trailing slash. The tokenizer treats `<meta charset="UTF-8" />` as `<meta charset="UTF-8">`. It matters only if you parse as XML (`application/xhtml+xml`). This file is served as HTML by `http.server` / `npx serve`. Alternative: drop the slashes for a stricter HTML5 look, or keep them for JSX muscle memory — neither is wrong here. Same story for the viewport meta and, if you added one, a favicon `<link>`.

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="style.css" />
```

### Q13. Why is there no `http-equiv="Content-Type"` meta tag?

**Non-technical:** That older tag was a second way to say “this file is UTF-8 HTML.” The short charset meta already says that, so the long form would be duplicate noise.

**Technical:** `<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">` is the HTML4-era equivalent. HTML5 prefers `<meta charset="UTF-8">`, which must still appear in the first 1024 bytes. Duplicating both is allowed but redundant. `http-equiv="refresh"` is a different, usually discouraged, feature. Alternative: use either the charset meta or a real `Content-Type` header; this page uses the charset meta and relies on the static host for MIME (`text/html` for the page, `text/javascript` or `application/javascript` for `dist/main.js` modules).

```html
<meta charset="UTF-8" />
```

### Q14. Why `width=device-width`? What happens on a phone if you remove it?

**Non-technical:** Phones used to pretend they were 980-pixel desktops and shrink the whole site. This line says “use the real phone width.” Without it the 528-pixel board looks like a stamp on a huge fake page that you pinch-zoom.

**Technical:** The layout viewport defaults to ~980px on many mobile browsers when the tag is absent. `body` is flex-centered in that wide viewport, then the visual viewport scales down, so the HUD, 528×528 bitmap, and footer are tiny. `width=device-width` sets the layout viewport to the screen width in CSS pixels (e.g. 360–430). Then `#board { max-width: 100% }` can actually shrink the canvas to the phone. Alternative: `width=500` would lock a fake width and fight the canvas max-width. Omit only if you want the old “desktop site” zoom.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Q15. Why `initial-scale=1.0`? What if you set it to `1.5` or omit it?

**Non-technical:** `1.0` means “start at actual size, not zoomed in or out.” `1.5` would start the game magnified so the board overflows. Omitting it usually still starts at 1 when `width=device-width` is set, but you should not rely on that.

**Technical:** `initial-scale` is the zoom at first layout. `1.5` makes one CSS pixel 1.5 visual pixels; the 528-pixel board plus 24px body padding will overflow a 390px-wide phone and force horizontal scroll or pinch-out. Omitting `initial-scale` with `width=device-width` typically computes scale 1, but iOS historically had quirks with rotation and shrink-to-fit. Alternative: keep `1.0`. Do not add `minimum-scale` / `maximum-scale` (Q16–Q17). This demo has no `viewport-fit=cover` (no notch-aware `env(safe-area-inset-*)`).

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Q16. Why did you not add `user-scalable=no` or `maximum-scale=1` on a canvas game where pinch-zoom might feel natural to suppress?

**Non-technical:** Some games lock pinch-zoom so a gesture does not enlarge the board. This demo does not. Players with low vision can still zoom the HUD and the canvas. There are also no swipe controls that a pinch would fight.

**Technical:** `user-scalable=no` and `maximum-scale=1` were common in early canvas/mobile games. This project is keyboard-first (arrows / WASD / Space, `window` `keydown`) with **no** touch D-pad, so pinch-zoom is not stealing a gesture. Locking zoom fails WCAG 1.4.4 (Resize Text) and is explicitly flagged on iOS accessibility. Alternative if you later add swipe-to-steer: handle touches on `.board-frame` with `touch-action: none` locally, rather than disabling zoom for the whole document. Honest gap: the game is still awkward on a phone because it is keyboard-only — but that is not a reason to trap zoom.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Q17. What accessibility problem does locking zoom create?

**Non-technical:** People who need larger text cannot enlarge the score, the overlay instructions, or the board. They are stuck at the author’s size. That is a hard fail for a public page and a bad look in an interview.

**Technical:** WCAG 1.4.4 requires text to resize to 200% without assistive tech. 1.4.10 (Reflow) expects content to work at 320 CSS pixels. `maximum-scale=1` / `user-scalable=no` block pinch-zoom and often browser text scaling. Overlay copy (`Press an arrow key or WASD to start.`) and the 0.75rem footer are already small; locking zoom makes them unusable. Some browsers now ignore `user-scalable=no`, so the attribute is both harmful and unreliable. Alternative: never lock zoom; use `max-width: 100%` on the canvas so layout still fits when the user zooms.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Q18. How does this meta tag interact with `#board { max-width: 100%; height: auto }` and a canvas bitmap of 528×528 CSS pixels?

**Non-technical:** On a laptop the board draws at 528 pixels square. On a phone the same picture shrinks to fit the screen width so you do not scroll sideways. The viewport tag is what makes “the screen width” mean the real phone, not a fake 980-pixel desktop.

**Technical:** `Board` sets `canvas.width = columns * cellSize` and `canvas.height = rows * cellSize` with `24 * 22 = 528`. That is the **bitmap** size (drawing buffer), not the CSS size. `#board { max-width: 100%; height: auto }` lets the layout box shrink below 528 CSS pixels while the bitmap stays 528×528; the browser scales the pixels (slightly soft, no `image-rendering: pixelated`). Without `width=device-width`, the layout viewport is ~980px, `max-width: 100%` never kicks in for a 528px canvas, and the phone shrinks the whole 980px page. Body padding (24px) plus `.wrap { max-width: 620px }` further constrain the frame. Alternative: set HTML `width="528" height="528"` so CSS `height: auto` has an intrinsic ratio before JS runs (Q51–Q53).

```css
#board {
  display: block;
  max-width: 100%;
  height: auto;
}
```

```ts
canvas.width = columns * cellSize;
canvas.height = rows * cellSize;
```

---

## Line 6 — `<title>`

### Q19. Why is the title `Snake — Deque + Set Edition` rather than just `Snake`?

**Non-technical:** The tab is the first thing a reviewer sees in a pile of browser tabs. “Snake” could be anyone’s toy. “Deque + Set Edition” says this is the data-structure demo, not a weekend clone.

**Technical:** `<title>` is document metadata: tab label, history, bookmarks, and default text if you ever added Open Graph (you did not — Q24). The visible `<h1>` is only `Snake` so the page is not shouting DSA at a player; the subtitle lives in the tab and the footer. Length is fine (under ~60 characters). Alternative: `Snake` alone is cleaner for a consumer game and worse for this interview artifact. `README.md` repeats the same story in prose.

```html
<title>Snake — Deque + Set Edition</title>
<h1 class="title">Snake</h1>
```

### Q20. Why put DSA (`Deque + Set`) in the tab title of a game — for you, for a reviewer, or for SEO?

**Non-technical:** It is for the reviewer sitting next to you, and for you when five localhost tabs are open. It is not for Google. This page has no description, no canonical, no sitemap, and is meant to be served from `localhost:8000`.

**Technical:** SEO would want a unique title plus `meta name="description"` and a stable URL. None of that is here (Q23–Q25). The string matches the README pitch and the footer (`Deque<Position>`, `Set<string>`). A recruiter scanning tabs during a live demo can find the right window. Alternative: keep a short player-facing title and put DSA only in the footer / README if you ever shipped this as a public game. For this repo, the tab title is intentional interview signaling.

```html
<title>Snake — Deque + Set Edition</title>
```

### Q21. Why an em dash (`—`) instead of a hyphen or `|`?

**Non-technical:** An em dash is the typographic “subtitle” mark. A hyphen looks like a broken word. A pipe looks like a terminal breadcrumb. The long dash reads as “Snake, the Deque + Set edition.”

**Technical:** U+2014 in UTF-8. It is the character Q11 uses as the Latin-1 breakage example. `|` is ASCII and safer under mis-declared encodings; `-` is also ASCII but reads as `Snake - Deque` (compound word). Some teams use `·` or `–` (en dash). Screen readers usually pause at an em dash, which is fine. Alternative: `|` if you want ASCII-only titles; keep `—` if charset is guaranteed UTF-8 (it is, via the early meta).

```html
<title>Snake — Deque + Set Edition</title>
```

### Q22. What happens if you remove `<title>`? What does the tab show?

**Non-technical:** The tab would show the filename or a generic “index.html” / URL, not the name of the game. Bookmarks and history become harder to scan. Accessibility checkers flag a missing title.

**Technical:** WCAG 2.4.2 (Page Titled) fails at Level A. The HTML spec requires a title in `<head>` for a non-empty document. Browsers fall back to the last path segment (`index.html`), the full `file://` or `http://localhost:8000/` URL, or an empty tab. `document.title` would be `""` until JS set it (nothing here sets it). Overlay and h1 would still be visible. Alternative: keep a descriptive `<title>`; optionally sync `document.title` with score on game over — this demo does not.

```html
<title>Snake — Deque + Set Edition</title>
```

### Q23. Why no `meta name="description"` on a demo you might send as a link?

**Non-technical:** If you pasted this URL into Slack or a job portal, the unfurl would have no summary sentence. Search engines would guess from the footer. For a localhost demo that is usually fine; for GitHub Pages it looks unfinished.

**Technical:** `description` is not ranking magic; it is the default snippet when a crawler does not pick a better excerpt. This page is a static interview artifact served locally (`python3 -m http.server 8000`). There is no production host in this folder. Honest gap: if you send a public link, add one sentence (“Vanilla TypeScript Snake using a deque and a set — no framework.”). Alternative: skip it while the only URL is localhost, and add it the day you deploy.

```html
<title>Snake — Deque + Set Edition</title>
<link rel="stylesheet" href="style.css" />
```

### Q24. Why no `og:title`, `og:image`, `twitter:card`?

**Non-technical:** Chat apps would show a bare link instead of a card with the board screenshot and the DSA subtitle. That is a real gap if a reviewer opens your message on a phone.

**Technical:** Open Graph and Twitter tags are not in `index.html`. There is no `og:image` (and no PNG of the board in the folder). `og:title` would otherwise duplicate the `<title>`. This is an honest shipping gap for a shareable demo, not a functional gap for `localhost`. Alternative: one 1200×630 image of the Idle overlay plus `og:title` / `og:description` / `twitter:card` = `summary_large_image` if you host it. Do not invent tags that are not in the repo.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Snake — Deque + Set Edition</title>
  <link rel="stylesheet" href="style.css" />
</head>
```

### Q25. Why no `rel="canonical"`, `robots`, or favicon?

**Non-technical:** There is no “official URL” to point at, you are not asking Google to index localhost, and the tab uses the browser’s default empty icon. It looks like a local demo, which it is.

**Technical:** `rel="canonical"` needs a stable absolute URL; this folder has none. `meta name="robots"` is omitted, so the default is index/follow if a crawler ever saw it. No `favicon.ico`, no SVG `rel="icon"` — Chrome shows a generic document icon. Honest gap for a hosted demo; correct omission for a `file://`-broken, `http.server`-first artifact. Alternative: add a 32×32 snake-head favicon and a canonical the day the Pages/Netlify URL exists. Do not add `noindex` unless you deploy a staging copy you want hidden.

```html
<link rel="stylesheet" href="style.css" />
</head>
```

---

## Line 7 — stylesheet

### Q26. Why `href="style.css"` relative, not `/style.css`?

**Non-technical:** The CSS file sits next to the HTML file. A relative link means “look in the same folder.” A link that starts with `/` would look at the root of the whole domain, which breaks as soon as the game is not hosted at `/`.

**Technical:** `style.css` resolves against the HTML URL. On `http://localhost:8000/` it becomes `/style.css`. On `http://localhost:8000/snake%20game/` it becomes `/snake%20game/style.css`. A root-absolute `/style.css` would 404 on GitHub project Pages (`https://user.github.io/repo/style.css` vs `…/repo/snake%20game/style.css`) and on any nested folder. Alternative: `<base href="…">` is more fragile. Keep relative paths for `style.css` and `dist/main.js` together (Q409 in tooling).

```html
<link rel="stylesheet" href="style.css" />
```

### Q27. What happens if this file is opened from a nested path or GitHub Pages project URL?

**Non-technical:** As long as `index.html`, `style.css`, and `dist/` travel together, the page still skins and the script still loads. If you only uploaded `index.html`, you get an unstyled board and a 404 for JavaScript.

**Technical:** Relative URLs follow the document URL, including `%20` for the `snake game` folder name. GitHub Pages project sites live at `https://<user>.github.io/<repo>/`; if the game is a subfolder, you must upload that whole subtree. Root-absolute CSS would miss. `type="module"` still needs a real HTTP origin (Q84) — Pages is HTTPS, so modules work; `file://` does not. Spaces in the path are legal but ugly; renaming the folder would be cleaner. Alternative: put the game at the repo root or use a folder without spaces.

```html
<link rel="stylesheet" href="style.css" />
<script type="module" src="dist/main.js"></script>
```

### Q28. Why is CSS in the `<head>` and the script at the end of `<body>`?

**Non-technical:** Styles load before you see the page so you do not get a flash of unstyled HUD. The script waits until the score, canvas, and overlay exist in the document. That is the classic “CSS up top, JS at the bottom” teaching order.

**Technical:** A render-blocking `<link rel="stylesheet">` in `<head>` is what you want for a 168-line sheet: first paint is already the dark theme (`--bg: #0c0d10`). The module script is deferred by spec even in `<head>` (Q79–Q81), so placing it at the end is mostly convention and slightly later discovery. `main.ts` also waits for `DOMContentLoaded`, so the DOM contract (`#board`, `#score`, `#status`, `#overlay`, `#restart`) is satisfied either way. Alternative: module in `<head>` for earlier fetch; CSS stays in `<head>` either way. Do not put the stylesheet after the module if you care about first paint of `.overlay`.

```html
<link rel="stylesheet" href="style.css" />
</head>
<body>
  <main class="wrap">
  …
  <script type="module" src="dist/main.js"></script>
</body>
```

### Q29. What happens if you put the CSS `<link>` after the script?

**Non-technical:** For a moment you might see the browser’s default white page, black Times text, and an unstyled canvas, then the dark theme snaps in. On a fast machine it is a blink; on a slow one it looks broken.

**Technical:** Module scripts are deferred and run after document parse. A `<link>` after the script is still encountered during parse if it is before `</body>`, so it usually still loads before first paint — unless the parser’s preload scanner already prioritized the script. Worst case: FOUC of unstyled content, then CSSOM applies, then JS sets canvas 528×528 and overlay text. This sheet’s `.overlay { background: rgba(12, 13, 16, 0.82) }` is what makes the empty overlay *dark*; without CSS the overlay is an empty static div that does not cover the canvas (no `position: absolute`). Alternative: keep CSS in `<head>`. The empty-overlay FOUC (Q61) is a separate bug that CSS-in-head actually makes *more* visible.

```html
<link rel="stylesheet" href="style.css" />
```

### Q30. Why no `media="print"` stylesheet?

**Non-technical:** Nobody is printing a Snake game. Extra print CSS would be ceremony. If someone does print, they get the dark screen and the board as a bitmap.

**Technical:** There is no `@media print` in `style.css` either (Q147). A print sheet could hide `#board`, `.overlay`, and `.restart-btn` and keep the DSA footer — out of scope for a canvas demo. `media="print"` on the main `<link>` would hide styles on screen. Alternative: one small print block later if a reviewer asks; not worth a second request for 168 lines. Honest: print is unstyled-as-screen, dark ink-heavy, not optimized.

```html
<link rel="stylesheet" href="style.css" />
```

### Q31. Why no preload or `media="print" onload` trick — is a 168-line sheet too small to care?

**Non-technical:** That trick is for huge CSS files that block the first paint of a marketing site. This stylesheet is short. Preloading it would not change how the game feels.

**Technical:** `rel="preload" as="style"` plus `onload` (or the `media="print"` swap) is a pattern for late-discovered CSS. Here the sheet is render-blocking in `<head>` on purpose, ~168 lines, no `@import`, no webfonts (`@font-face` is absent; the stack is system mono). Preload would add markup without a measurable win. Alternative: keep the single blocking link. If you later add a large font file, preload *that*, not this sheet.

```html
<link rel="stylesheet" href="style.css" />
```

---

## Lines 9–11 — `<body>` and `<main>` / `<h1>`

### Q32. Why `<main class="wrap">` instead of a `<div>`?

**Non-technical:** `main` tells assistive tech “this is the actual game, not chrome.” There is no site header or nav here, so the whole column *is* the main content. A generic box would look the same to sighted players.

**Technical:** `<main>` is a landmark. Screen-reader rotor lists one Main. `.wrap` is the flex column (`max-width: 620px`, `align-items: center`) — the class is for CSS, the element is for semantics. There is no skip link (Q36), so the landmark is the cheap bypass. Spec: at most one visible `main`. Alternative: `<div class="wrap">` would not change layout; you would lose the landmark. `<article>` would imply a syndicable piece; the game is an app, not an article.

```html
<body>
  <main class="wrap">
    <h1 class="title">Snake</h1>
```

### Q33. What happens if there are two `<main>` elements?

**Non-technical:** Sighted layout could still work. Screen-reader users would hear two “main” landmarks and would not know which is the game. Validators would complain.

**Technical:** HTML allows multiple `main` elements only when the others are `hidden`. Two visible mains confuse landmark navigation and skip-to-content extensions. This page correctly has one `main.wrap` wrapping HUD, board, hint, and footer. The overlay is *inside* main, not a second main — good, because it is part of the game UI. Alternative: never add another `main`; use `<section>` or `<footer>` (already used) for subdivisions.

```html
<main class="wrap">
  …
  <footer class="legend">
```

### Q34. Why is the heading `Snake` when the title tag says `Snake — Deque + Set Edition`?

**Non-technical:** The page heading is what a player reads. “Snake” is enough. The tab and the footer carry the data-structure subtitle so the canvas is not crowded with jargon.

**Technical:** One `<h1>` keeps the outline trivial (no h2–h6). WCAG 2.4.6 wants headings that describe the topic; `Snake` does. The longer `<title>` is for tabs and reviewers (Q19–Q20). Duplicating the full string in the h1 would wrap on a 320px screen (`text-transform: uppercase` + `letter-spacing: 0.08em` already stretches it). Alternative: visually hide a longer h1 (`Snake, deque and set edition`) if you wanted AT and the title to match 1:1. Current split is intentional.

```html
<title>Snake — Deque + Set Edition</title>
…
<h1 class="title">Snake</h1>
```

### Q35. Why `<h1 class="title">` rather than styling `h1` directly?

**Non-technical:** The class is a CSS hook named after the role on the page, not after the tag. If you later add another heading, it does not automatically inherit the huge uppercase treatment.

**Technical:** `.title` sets `margin: 0`, `1.4rem`, `font-weight: 600`, tracking, and uppercase. A bare `h1 { }` selector would couple semantics to this one visual. There is only one h1 today, so the class is slightly defensive. Alternative: `h1 { }` is fine on a one-heading page; a class is better if the outline grows. Do not swap to `<p class="title">` — you would lose the heading.

```html
<h1 class="title">Snake</h1>
```

```css
.title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

### Q36. Why no skip link? Who is harmed on a page this short?

**Non-technical:** A skip link is a “jump to the game” shortcut for keyboard users who would otherwise tab through a long header. This page has almost nothing to skip: heading, two HUD blocks, Restart. Harm is low today.

**Technical:** WCAG 2.4.1 (Bypass Blocks) is usually met with landmarks (`main`) or a skip link. There is **no** skip link here. Tab order is: Restart (the only native control), then the browser chrome. The canvas is not in the tab order (`tabindex` absent — Q57). Keyboard players never need to tab to play because `window` listens for keydown. Who is harmed: anyone who later adds a long legend, links, or a settings form above the board. Honest gap for a fuller app; acceptable for this short demo if you say `main` is the bypass. Alternative: `<a class="skip" href="#board">Skip to board</a>` plus `tabindex="-1"` on the frame.

```html
<body>
  <main class="wrap">
    <h1 class="title">Snake</h1>
    <div class="hud">
```

---

## Lines 13–23 — HUD

### Q37. Why a wrapping `.hud` of `div`s rather than a `<ul>`, a `<dl>`, or a `<table>`?

**Non-technical:** Score, status, and Restart sit in a single toolbar row. It is not a list of links, not a dictionary page, and not a spreadsheet. Generic boxes keep the CSS simple.

**Technical:** `<ul>` would announce a list of three items including a button — odd. `<dl>` (`Score` / `0`, `Status` / `Idle`) is the best semantic alternative and would associate names with values. `<table>` is for tabular data, overkill, and hostile on mobile. The current `div.hud > div.hud-block > span` grouping is **visual only**: labels are not wired with `aria-labelledby` or `<label>`. Honest gap: a screen reader may not treat “Score” as the name of `0`. Alternative: `<dl>` or `aria-labelledby` pointing at each `.hud-label`. Layout stays flex either way.

```html
<div class="hud">
  <div class="hud-block">
    <span class="hud-label">Score</span>
    <span id="score" class="hud-value">0</span>
  </div>
```

### Q38. Why Score and Status are each `.hud-block` with a label span + value span, not a single `<p>`?

**Non-technical:** The small grey word sits above the big teal number. That stacked look is hard to do with one paragraph. Two spans let the label and the value have different sizes and colors.

**Technical:** `.hud-label` is `0.7rem` uppercase muted; `.hud-value` is `1.1rem` / `700` / `--accent`. JS writes only the value nodes (`scoreEl`, `statusEl`) so the labels never get wiped by `textContent`. A single `<p id="score">Score: 0</p>` would force `updateHud` to reconstruct the string and would lose the stacked CSS. Alternative: one paragraph plus a CSS `::before` for the label — more clever, worse for i18n. Current split is the right DOM for `getElementById` plus styling.

```html
<div class="hud-block">
  <span class="hud-label">Status</span>
  <span id="status" class="hud-value">Idle</span>
</div>
```

### Q39. Why `id="score"` and `id="status"` — who consumes those ids?

**Non-technical:** Those names are handles so the game script can find the number and the word and update them as you play. Nothing in the CSS needs the ids; the classes do the styling.

**Technical:** `main.ts` does `document.getElementById("score")` and `getElementById("status")` and passes the nodes into `Game`. `Game.updateHud()` sets `scoreEl.textContent` and `statusEl.textContent`. CSS uses `.hud-value`, not `#score`. Duplicate ids would make `getElementById` return the first only. Alternative: `data-role="score"` + `querySelector`; ids are the contract the throw message refers to (“Required DOM elements are missing from index.html”). No `aria-live` on these ids (Q43).

```ts
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
```

```ts
private updateHud(): void {
  this.config.scoreEl.textContent = String(this.score);
  this.config.statusEl.textContent = this.status;
}
```

### Q40. What happens if you rename `id="score"` but forget `getElementById("score")` in `main.ts`?

**Non-technical:** The page would look fine for a moment, then the game would not start. A developer would see an error in the console instead of a snake on the board.

**Technical:** `main()` null-checks all five nodes and `throw new Error("Required DOM elements are missing from index.html")`. The module runs after parse (plus `DOMContentLoaded`), so you get a blank/idle shell: HTML HUD still shows `0` / `Idle`, overlay still covers the canvas (no `hidden`), Restart does nothing. Strict TypeScript does not catch a string-id mismatch. Alternative: `document.querySelector("#score")` with the same throw, or a small `getRequired(id)` helper. Tests would catch this; this repo has none.

```ts
if (!canvas || !scoreEl || !statusEl || !overlayEl || !restartBtn) {
  throw new Error("Required DOM elements are missing from index.html");
}
```

### Q41. Why does the HTML start at `0` and `Idle` rather than empty spans?

**Non-technical:** Before JavaScript runs, the HUD already looks like a real game at rest: score zero, status Idle. Empty boxes would flicker “blank → 0 / Idle” when the script boots.

**Technical:** `Game.reset()` also sets `score = 0` and `status = GameStatus.Idle`, then `updateHud()` writes the same strings. The HTML seed matches the TypeScript initial state, so a successful boot does not change the HUD text (it may still rewrite the same characters). Empty spans would be a lie and a flash. Honest caveat: if JS never runs, `0` / `Idle` looks like a working idle game when the overlay is actually a dead empty cover (Q42, Q64). Alternative: `0` / `Idle` in HTML is still the right default; pair it with `hidden` on the overlay and a `<noscript>` warning.

```html
<span id="score" class="hud-value">0</span>
…
<span id="status" class="hud-value">Idle</span>
```

### Q42. What do users without JavaScript see, and is that honest?

**Non-technical:** They see the title, a score of 0, Idle, a Restart button that does nothing, a dark empty rectangle where the board should be, the keyboard hint, and the data-structure footer. It looks like a game that failed to wake up. That is only partly honest.

**Technical:** There is no `<noscript>`. CSS still applies, so `.overlay` is `position: absolute; inset: 0` with a dark translucent fill and **no** `hidden` attribute — it covers the canvas forever. The canvas has no fallback content (Q54) and no bitmap until `Board` runs. Restart is a real `<button>` with no listener. The HUD seed `0` / `Idle` implies a live state machine. Honest gap: add `<noscript>This game needs JavaScript.</noscript>` and `hidden` on the overlay so a no-JS user at least sees an empty canvas instead of a black pane. Alternative: a static SVG screenshot inside `<noscript>`.

```html
<canvas id="board"></canvas>
<div id="overlay" class="overlay"></div>
```

### Q43. Why is there no `aria-live="polite"` (or `assertive`) on the score or status?

**Non-technical:** Screen-reader users are not told when the score changes or when the game starts, pauses, or ends, unless they happen to land on those words again. Sighted players see the teal HUD update every bite.

**Technical:** This is a named gap. `#score` and `#status` are plain spans. `updateHud()` runs every tick (110ms) while Running, so a live region on score would spam. Status changes are rare (Idle → Running → Paused → Game Over) and **should** be announced. Overlay text is also not a live region; game-over copy is only visual. Alternative: `aria-live="polite"` on `#status` only; announce score on game over via the overlay and `role="status"`. Do not put `assertive` on the score. See Q44.

```html
<span id="score" class="hud-value">0</span>
<span id="status" class="hud-value">Idle</span>
```

### Q44. What happens for a screen-reader user when the score ticks every 110ms — would live regions even be usable?

**Non-technical:** If the score shouted every time you ate — or worse, every game tick — the voice would never stop. You could not hear the pause message or anything else. Live regions are the wrong tool for a number that can change many times a second.

**Technical:** `tickMs: 110` means `updateHud()` can fire about nine times a second while Running, even when the score did not change (it still writes `String(this.score)` every tick). `aria-live="polite"` typically announces only when text changes, so an unchanged `0` might be quiet — but each +10 would interrupt. `assertive` would be unusable. Food is +10 per eat, not per tick, so a polite region on score would fire per apple, which is still noisy. Alternative: live-announce status and overlay only; keep score visual; or announce “score 120” once on death (`setOverlay` already interpolates `score`). Honest: live regions are usable for status, not for a 110ms HUD write loop.

```ts
if (now - this.lastTick >= this.config.tickMs) {
  this.lastTick = now;
  this.tick();
}
```

### Q45. Why is Restart a `<button>` and not an `<a href="">`?

**Non-technical:** Restart is an action on this page, not a trip to another URL. A button is for “do something.” A link is for “go somewhere.” Using a link would also imply you could open it in a new tab, which makes no sense.

**Technical:** There is no navigation target. `Game` listens for `click` and calls `start()`. An `<a href="">` would reload the page (full reset via navigation) and would be activatable with middle-click. `<a href="#">` would pollute history. `href=""` without JS is a refresh; the button without JS is a no-op (Q42). Alternative: a link that reloads is a valid no-JS restart, but it would fight the SPA-like `reset()` path and flash the empty overlay again. Keep `<button>`.

```html
<button id="restart" class="restart-btn" type="button">Restart</button>
```

```ts
config.restartBtn.addEventListener("click", () => this.start());
```

### Q46. Why `type="button"`? What happens if you omit `type` inside a form vs here, not inside a form?

**Non-technical:** This extra attribute says “this is a plain button, not a submit button.” There is no form on the page today, so omitting it would probably still work. If someone later wrapped the HUD in a form, a missing type could reload the page every click.

**Technical:** The HTML spec default for `<button>` is `type="submit"`, **even outside a form**. Outside a form, a submit button does nothing visible. Inside a `<form>`, click submits (GET the current URL by default), which remounts the document, drops the RAF loop, and looks like a random refresh. This markup correctly sets `type="button"`. Alternative: omit it while there is no form — interview answer is still “always set type.” Do not use `type="reset"` (that resets form fields, not Snake).

```html
<button id="restart" class="restart-btn" type="button">Restart</button>
```

### Q47. Why is there no `aria-label` on Restart? Is the visible text enough?

**Non-technical:** The button already says Restart. A screen reader will read that word. An extra hidden label would repeat it. That is enough for this control.

**Technical:** Accessible name from descendant text is `"Restart"`. `aria-label` would override that name; duplicating it is noise. You might add `aria-label="Restart game"` if the visible text were an icon only — it is not. CSS `text-transform: uppercase` does not change the accessible name (`Restart`, not `RESTART`). Honest: the confusing part is behavior, not naming — `start()` does not `reset()` while Running or Paused (Q48, Q308–Q310). Alternative: visible text is enough; fix the click handler rather than the label.

```html
<button id="restart" class="restart-btn" type="button">Restart</button>
```

### Q48. Why no `disabled` state while Idle vs Running vs Game Over?

**Non-technical:** The button is always clickable. During an idle start screen that is fine. During a live run, clicking Restart does not actually begin a new snake — it mainly restarts the animation loop. The button never looks off, so players cannot see that.

**Technical:** HTML never sets `disabled`. `Game.start()` only calls `reset()` when status is `Idle` or `GameOver`. While `Running` or `Paused`, Restart keeps the same snake and score and re-requests RAF. There are no `:disabled` styles in CSS (Q125). Honest gap: either disable Restart while Running, or make Restart always `reset()` then `start()`. Keyboard Space already pauses; the button label promises a full restart. Alternative: `restartBtn.disabled = this.status === GameStatus.Running` in `updateHud` — not implemented.

```ts
start(): void {
  if (this.status === GameStatus.GameOver || this.status === GameStatus.Idle) {
    this.reset();
  }
  this.status = GameStatus.Running;
```

### Q49. Why is the button in the HUD row rather than under the canvas?

**Non-technical:** Score, status, and Restart form one control strip above the board, like a tiny toolbar. You see the score and the reset in the same glance. Putting Restart under the canvas would bury it below a 528-pixel square.

**Technical:** `.hud` is a non-wrapping flex row (`justify-content: center`, gap 16px). On a 320px phone, two `.hud-block` (`min-width: 84px`) plus the button can overflow (Q115). Placement above the board keeps `window` keydown and the click target close in reading order. Under the canvas would still be inside `main` and would work; it would also sit next to `.hint`. Alternative: a second row for the button (`flex-wrap`) for small screens. Current choice is desktop-interview layout, not mobile ergonomics.

```html
<div class="hud">
  …
  <button id="restart" class="restart-btn" type="button">Restart</button>
</div>
```

---

## Lines 25–28 — board frame, canvas, overlay

### Q50. Why wrap the canvas in `.board-frame` instead of positioning the overlay on `body`?

**Non-technical:** The dark “press a key” message should sit on the board, not across the whole window. The frame is a picture frame: the canvas and the message share one rounded rectangle.

**Technical:** `.board-frame { position: relative; overflow: hidden; border-radius: 8px }` is the containing block for `.overlay { position: absolute; inset: 0 }`. Overlaying `body` would cover the HUD, hint, and footer and would not clip to the 8px radius. `line-height: 0` on the frame fights the inline-canvas baseline gap. Alternative: wrap only in a relative div (what we have) or use a `<dialog>` for pause/game-over — heavier, better AT. Do not position the overlay on `html`/`body`.

```html
<div class="board-frame">
  <canvas id="board"></canvas>
  <div id="overlay" class="overlay"></div>
</div>
```

### Q51. Why `<canvas id="board"></canvas>` with no `width` or `height` attributes?

**Non-technical:** The HTML does not say how big the board is. JavaScript later sets it to 528 by 528 pixels. Until that runs, the browser uses a small default rectangle, so the frame can jump in size when the game boots.

**Technical:** Missing attributes mean the canvas IDL defaults: **300×150**. `main.ts` passes `columns: 24, rows: 24, cellSize: 22` into `Board`, which assigns `canvas.width` / `canvas.height`. CSS `#board { max-width: 100%; height: auto }` scales whatever intrinsic size exists. Honest gap: put `width="528" height="528"` in HTML to reserve layout (and give `height: auto` a ratio) before JS. Attributes also document the bitmap size for readers of `index.html`. Alternative: CSS `aspect-ratio: 1` on the frame (not present — Q133).

```html
<canvas id="board"></canvas>
```

### Q52. Board.ts later sets `canvas.width = 24 * 22` (528). What is the difference between the HTML attribute, the DOM property, and CSS `max-width: 100%`?

**Non-technical:** Think of three knobs. The HTML width is the printed size on the tag. The JavaScript width is the actual grid paper the snake is drawn on. CSS max-width is how large that paper is allowed to look on a small screen. They are not the same knob.

**Technical:** The HTML `width`/`height` attributes initialize the drawing buffer and the default layout size. The DOM properties `canvas.width` / `canvas.height` are the bitmap in CSS pixels at 1×; assigning them **resets** the 2D context (clears the buffer, resets styles). CSS `max-width: 100%` only changes the **display** size; it does not change hit-testing coordinates in canvas space or `Board.drawCell` math. `rows` is also 24, so height is 528 too. No `devicePixelRatio` scaling — on a 2× display the bitmap is stretched (soft). Alternative: `canvas.width = 528 * dpr` plus CSS width 528px.

```ts
canvas.width = columns * cellSize;
canvas.height = rows * cellSize;
```

```css
#board {
  display: block;
  max-width: 100%;
  height: auto;
}
```

### Q53. What layout / CLS happens before `Board`’s constructor runs?

**Non-technical:** For a fraction of a second the board is a short, wide stub (the browser default), with a dark empty glass over it. Then it pops to a square. That pop is a layout shift. A reviewer watching a slow 3G throttle will see it.

**Technical:** Default canvas is 300×150. `.overlay` is `inset: 0` on that stub. Then `new Board(...)` sets 528×528, the frame grows, HUD/hint/footer move down (or the flex-centered column recenters). Cumulative Layout Shift is real here. `height: auto` without an HTML height cannot reserve 528px. Module download (plus `DOMContentLoaded`) is the delay — README’s `file://` failure never gets this far. Alternative: HTML `width="528" height="528"` and/or CSS `aspect-ratio: 1; width: min(528px, 100%)` on `.board-frame`. Honest gap, alongside the empty overlay FOUC.

```html
<canvas id="board"></canvas>
<div id="overlay" class="overlay"></div>
```

### Q54. Why no fallback content inside `<canvas>` for browsers without canvas?

**Non-technical:** Very old browsers would see nothing inside the board. Modern Chrome, Firefox, Safari, and Edge all support canvas, so players are fine. A sentence inside the tag would have been a polite backup.

**Technical:** Children of `<canvas>` are fallback: rendered only when the canvas API is unavailable (or for AT in some older mappings). This tag is empty. `Board` throws if `getContext("2d")` is null (“2D canvas context is not available in this browser”). That throw never helps a no-canvas UA that also failed to run the module. Honest gap. Alternative: `<canvas id="board">Snake requires a 2D canvas.</canvas>` — zero cost in supporting browsers. Do not put the overlay *inside* canvas (Q59).

```html
<canvas id="board"></canvas>
```

### Q55. Why no `role="img"` or `aria-label="Snake game board"`?

**Non-technical:** The board is a picture of the snake that screen readers cannot see. Without a name, the control is an unlabeled graphic. We never added that name. That is a real accessibility miss.

**Technical:** Named gap. An unlabeled `<canvas>` often maps to a generic graphic with an empty accessible name. `role="img"` plus `aria-label="Snake game board"` (or `aria-labelledby` pointing at the h1) would give a name. It would still not describe the snake’s cells each tick — that would need a parallel text board or live region. `role="application"` is sometimes used for games but suppresses extra AT keyboard handling; this demo listens on `window` anyway. Alternative: add the label now; it does not change the Deque story.

```html
<canvas id="board"></canvas>
```

### Q56. What does a screen reader announce when it lands on an empty canvas?

**Non-technical:** It depends on the reader, but you typically hear something like “empty” or “graphic” with no useful name, or the canvas is skipped entirely. You do not hear “snake board.”

**Technical:** With no accessible name, no `title`, no fallback text, and no `tabindex`, many ATs skip the canvas in the tab order (not focusable) and may still list it in the graphics/landmarks-unrelated browse order as an unlabeled canvas. VoiceOver often says “empty” or “dim image.” NVDA/Chrome may expose `canvas` with no name. The overlay is a separate `div` (also unlabeled, often empty in the accessibility tree until `textContent` is set). Alternative: `aria-label` on the canvas and `role="status"` on the overlay so browse mode finds both.

```html
<canvas id="board"></canvas>
<div id="overlay" class="overlay"></div>
```

### Q57. Why no `tabindex="0"` on the canvas? Keyboard handlers are on `window` — is that better or worse?

**Non-technical:** You can steer with arrows without clicking the board first. That feels better on a page that is only this game. It is worse if the same trick is used on a page that also has a text box or a URL field you are trying to edit.

**Technical:** `window.addEventListener("keydown", …)` in the `Game` constructor means focus can sit on Restart (or nowhere) and arrows still call `preventDefault` and queue a direction. `tabindex="0"` would put the canvas in tab order and would let you attach listeners to the canvas only when it is focused — standard for games embedded in docs. Better for this single-purpose demo (no extra tab stop, always-on controls). Worse for composition (Q58, Q440). Honest: neither a focus ring nor a roving tabindex exists. Alternative: `tabindex="0"` on `.board-frame` and ignore keys unless `document.activeElement` is the frame.

```ts
window.addEventListener("keydown", (event) => this.handleKeydown(event));
```

```html
<canvas id="board"></canvas>
```

### Q58. What happens if a user focuses a text field on another part of a future page — do arrow keys still steal input?

**Non-technical:** Yes. The game listens to the whole window. Arrow keys would still move the snake (and Space would pause) even if you were trying to move the caret in a comment box. That is acceptable only because this page has no text fields.

**Technical:** `handleKeydown` does not check `event.target`. For mapped keys it `preventDefault()`s, so a future `<input>` would lose arrow/caret behavior and Space would not type a space. Unmapped keys return early without `preventDefault`. Browser chrome (URL bar) is outside `window` page listeners — those keys are *not* stolen. Alternative: `if (event.target instanceof HTMLInputElement) return;` or listen only while the canvas is focused. Honest gap for reuse; fine for the current DOM.

```ts
const direction = KEY_TO_DIRECTION[event.key];
if (!direction) return;
event.preventDefault();
this.queuedDirection = direction;
```

### Q59. Why is the overlay a sibling of the canvas, not a child of `<canvas>` (canvas cannot have visible HTML children)?

**Non-technical:** The message has to sit on top of the picture as real text, not as pixels painted on the grid. If you stuffed that text inside the canvas tag, players would not see it in Chrome. It would only exist as a backup for ancient browsers.

**Technical:** Canvas descendants are fallback content, not a DOM overlay. HTML overlay needs a separate element stacked with CSS (`position: absolute` on a `position: relative` frame). `setOverlay` uses `textContent` and the `hidden` property on that sibling. Painting the string with `fillText` would lose selection, AT, and CSS. Alternative: sibling `div` (current), or `<dialog>`. Do not use canvas children for pause UI.

```html
<div class="board-frame">
  <canvas id="board"></canvas>
  <div id="overlay" class="overlay"></div>
</div>
```

### Q60. Why `<div id="overlay" class="overlay"></div>` with **no** `hidden` attribute in the HTML?

**Non-technical:** The cover starts visible and empty. CSS paints a dark glass over the board immediately. JavaScript is supposed to fill in the “press a key” sentence a moment later. If the script is slow or dead, you stare at a blank dark square.

**Technical:** Named gap. `.overlay { display: flex; … background: rgba(12, 13, 16, 0.82); }` applies as soon as CSS loads. The HTML `hidden` attribute is absent, so the UA `hidden { display: none }` rule never applies. `.overlay[hidden] { display: none }` in the stylesheet only wins **after** `Game.setOverlay` sets `overlayEl.hidden = true|false`. `reset()` shows the overlay (`visible: true`) with the start message — the Idle state wants a visible overlay, but it wants **text**. Alternative: `<div id="overlay" class="overlay" hidden>` plus the start message in HTML, or `hidden` plus `reset()` to show. Current markup is the FOUC bug.

```html
<canvas id="board"></canvas>
<div id="overlay" class="overlay"></div>
```

### Q61. What does the user see in the 100–300ms before `dist/main.js` runs — empty overlay covering the board (FOUC)?

**Non-technical:** Yes. A dark, empty pane the size of the default canvas (short and wide), then a pop to a square, then the start sentence appears. On a cached localhost load it is a blink. On a cold `dist/main.js` it is a flash of an unfinished game.

**Technical:** Parse order: CSS in head applies; body paints HUD (`0` / `Idle`), empty overlay on 300×150 canvas, hint, footer; then the module graph loads (`main.js` → `Game.js` → Board/Snake/Food/Deque/types); `DOMContentLoaded` runs `main()`; `Board` resizes to 528; `reset()` writes overlay text and sets `hidden = false` (already visible). That is FOUC of empty cover, plus CLS (Q53). FOUC here is not unstyled HTML — it is **styled empty overlay**. Alternative: `hidden` in HTML so first paint shows the (still default-sized) canvas grid-less bitmap, then JS sizes and shows the message.

```css
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  background: rgba(12, 13, 16, 0.82);
}
```

### Q62. Why not start with `hidden` and let `reset()` show it?

**Non-technical:** That would be the better first paint: you would see the board frame instead of a mute black glass, then the welcome text would fade in when the game boots. We did not do that. There is no deep reason beyond “JS will show it anyway.”

**Technical:** `setOverlay(message, visible)` already assigns `this.config.overlayEl.hidden = !visible`. `reset()` calls `setOverlay("Press an arrow key or WASD to start. Space pauses.", true)`. Starting with `hidden` in HTML would keep the overlay out of the accessibility tree and off-screen until that line runs. `.overlay[hidden] { display: none }` exists specifically to beat author `display: flex` (Q137–Q139). Honest gap: add `hidden` to the div. The Idle UX after boot would be identical. If JS fails, a hidden overlay plus fallback canvas text would be far kinder (Q64).

```ts
private setOverlay(message: string, visible: boolean): void {
  this.config.overlayEl.textContent = message;
  this.config.overlayEl.hidden = !visible;
}
```

### Q63. Why is the overlay’s first message not in the HTML (`Press an arrow key…`) but injected by `Game.reset()`?

**Non-technical:** One program owns the sentences: start, pause, game over. The HTML file does not try to keep a copy that could go stale. The downside is that until that program runs, the cover has nothing to say.

**Technical:** `reset()`, `pause()`, and `gameOver()` each pass a string into `setOverlay`. HTML duplication would drift from `Game.ts` (already a risk with the hint line — Q69). Empty HTML overlay means no-JS and pre-JS users get no instructions (Q61, Q64). Alternative: put the Idle sentence in HTML and let `reset()` overwrite it — first paint has copy even before JS, and `hidden` can still start true or false. Current design treats overlay copy as 100% JS-owned. `textContent` (not `innerHTML`) is the right API once JS runs.

```ts
this.setOverlay("Press an arrow key or WASD to start. Space pauses.", true);
```

### Q64. What happens if JS fails to load — overlay stays empty and covers the canvas forever?

**Non-technical:** Yes. The dark glass never lifts and never gets words. Restart does nothing. Score stays 0, status stays Idle, so it looks like a frozen start screen without the “press a key” hint. The footer still explains deques to nobody who can play.

**Technical:** Failure modes: `dist/main.js` 404 (Q86), `file://` CORS (Q84), thrown missing-DOM error (Q40), `getContext("2d")` throw, or a syntax error in any module of the graph. None of those set `hidden` on `#overlay`. CSS keeps `display: flex` and the opaque background. There is no `<noscript>` and no fallback canvas children. Alternative: `hidden` by default, `<noscript>` beside the frame, and a non-module explanation. This is the sharpest HTML honesty gap in Part 1.

```html
<div id="overlay" class="overlay"></div>
…
<script type="module" src="dist/main.js"></script>
```

### Q65. Why `id="overlay"` rather than only a class?

**Non-technical:** The script looks up one specific box by name. A class is a styling label that could apply to many boxes. The id is the unique hook.

**Technical:** `getElementById("overlay")` in `main.ts` is the consumer. `.overlay` in CSS is the presentation (absolute fill, flex centering, `[hidden]` override). You could `querySelector(".overlay")`, but ids are the same contract as `#board`, `#score`, `#status`, `#restart`. Duplicate `id="overlay"` would be invalid and would break the lookup. Alternative: `document.querySelector("[data-overlay]")`. Keep the id; add `hidden` and an accessible name (`role="status"` / `aria-live="polite"`) without renaming.

```ts
const overlayEl = document.getElementById("overlay");
```

```html
<div id="overlay" class="overlay"></div>
```

---

## Line 30 — hint

### Q66. Why is the control legend a `<p class="hint">` rather than a `<kbd>` list or `<ul>`?

**Non-technical:** It is one quiet sentence under the board: arrows or WASD to move, Space to pause. A bullet list would look like a manual. Keyboard-key tags would be more precise but heavier for a single line.

**Technical:** `<p class="hint">` is muted `0.78rem` with `margin: 0`. Semantic `<kbd>Arrow keys</kbd>` / `<kbd>WASD</kbd>` / `<kbd>Space</kbd>` would be more accurate (HTML for user input). A `<ul>` would announce a list of two items. Neither is wrong; the paragraph is the lightest. Restart is omitted (Q70). Alternative: a `<kbd>` line if you want the interview to show you know `<kbd>`; functionally identical. This copy can drift from `Game.ts` (Q69).

```html
<p class="hint">Arrow keys / WASD to move &middot; Space to pause</p>
```

### Q67. Why `&middot;` instead of a raw `·` or `|`?

**Non-technical:** The dot is a visual separator between two short instructions. The entity `&middot;` is the same character, written in a way that survives even if someone saves the file with a clumsy encoding. A pipe would look more like code.

**Technical:** `&middot;` is U+00B7 MIDDLE DOT. It is ASCII-source-safe in the HTML file (the bytes are `& m i d d o t ;`). A raw `·` is also UTF-8-safe here because charset is UTF-8 (Q68). `|` is ASCII and louder. `&bull;` would be a heavier bullet. Screen readers may say “dot” or ignore it as punctuation. Alternative: raw `·` is fine; entity is defensive. Do not use a hyphen, which reads as “move-Space.”

```html
<p class="hint">Arrow keys / WASD to move &middot; Space to pause</p>
```

### Q68. What happens if you write `·` unescaped — is it UTF-8-safe here?

**Non-technical:** Yes. The page declares UTF-8 at the top, so a real middot character is safe. You would see the same dot. You would not see a question-mark diamond unless the file were saved as a different encoding than declared.

**Technical:** With `<meta charset="UTF-8" />` and a UTF-8 on-disk file, U+00B7 in the text node is correct. It is also in Latin-1, so even a mislabeled Latin-1 file might survive this one character (unlike the title em dash). Git and editors on this machine are UTF-8. Alternative: either form. Keep the entity if you want the `.html` file to stay ASCII-only besides the title’s em dash — today the title already requires UTF-8.

```html
<meta charset="UTF-8" />
…
<p class="hint">Arrow keys / WASD to move &middot; Space to pause</p>
```

### Q69. Why tell people about Arrow keys / WASD / Space in HTML when Game.ts is the source of truth — what if they drift?

**Non-technical:** The hint is a human cheat sheet. The real rules live in the TypeScript key map. If you added vim keys in code and forgot this line, players would never know. If you promised Space to pause and removed it in code, the hint would lie.

**Technical:** `KEY_TO_DIRECTION` maps arrows and `w/a/s/d` (both cases). Space is handled first in `handleKeydown` (pause / resume / `else start()`). The hint does not mention Restart, game-over keys, or that Space also starts from Idle. Drift is already mild: overlay says “Press an arrow key or WASD… Space pauses.” HTML hint omits “to start.” Alternative: generate the hint from the same map (overkill) or treat HTML as documentation you update in the same PR as `KEY_TO_DIRECTION`. Interview answer: acknowledge the duplication.

```html
<p class="hint">Arrow keys / WASD to move &middot; Space to pause</p>
```

```ts
const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: Direction.Up,
  /* … */
  w: Direction.Up,
  W: Direction.Up,
};
```

### Q70. Why no mention of the Restart button in the hint?

**Non-technical:** Restart is already visible in the toolbar. The hint is for keys you cannot see. Repeating “and click Restart” would waste the one quiet line under the board.

**Technical:** Overlay game-over text *does* mention restart: `Press restart or any direction key to try again.` Idle overlay does not. The hint stays movement + pause. Risk: `start()` on the button is not a full reset while Running (Q48), so advertising Restart as “new game” in the hint could overpromise. Alternative: add `· Restart button resets after game over` if testers miss the HUD control. Current omission is reasonable.

```html
<p class="hint">Arrow keys / WASD to move &middot; Space to pause</p>
```

```ts
this.setOverlay(`Game over — score ${this.score}. Press restart or any direction key to try again.`, true);
```

---

## Lines 32–39 — footer legend

### Q71. Why `<footer class="legend">` instead of `<aside>` or another `<section>`?

**Non-technical:** The data-structure blurb is end matter for the page, like a caption under the game. A footer is the right landmark for “that’s the end, here is extra context.” An aside would feel like a sidebar. Another section would want its own heading.

**Technical:** `<footer>` inside `<main>` is a sectioning footer for that `main`, not necessarily the document footer — still appropriate for a one-main page. `<aside>` is for tangentially related content; this paragraph is the interview thesis, not a pull quote. `<section>` without a heading is a weak outline. `.legend` is CSS (`border-top`, `width: 100%`). Alternative: `aside` with `aria-label="Implementation notes"` if you want it skippable as complementary. Footer is the better default.

```html
<footer class="legend">
  <p>
    Body is a <strong>Deque&lt;Position&gt;</strong> (doubly linked list):
```

### Q72. Why is this DSA explanation in the page, not only in `README.md`?

**Non-technical:** The reviewer may never open the README during a live demo. The footer is on the same screen as the snake. Players who do not care can ignore the small grey text. You are optimizing for the person evaluating you.

**Technical:** README duplicates the story (deque vs `Array.unshift`, `Set` vs scanning). The HTML footer is the always-on version: `Deque<Position>`, doubly linked list, O(1) push/pop, `Set<string>` occupancy, O(1) lookup. That is interview UX, not player UX. Cost: clutter on a 320px phone (Q77) and jargon for non-engineers. Alternative: README-only if this shipped as a toy; on-page if it is a portfolio piece. This repo chose on-page, matching the tab title (Q20).

```html
<footer class="legend">
  <p>
    Body is a <strong>Deque&lt;Position&gt;</strong> (doubly linked list): push a new head,
    pop the tail, both O(1). Collisions are checked against a
    <strong>Set&lt;string&gt;</strong> of occupied cells, O(1) per lookup instead of scanning
    the body.
  </p>
</footer>
```

### Q73. Why `<strong>Deque&lt;Position&gt;</strong>` with entities rather than a `<code>` tag?

**Non-technical:** The type name is bold so it pops in a grey paragraph. A code font would also have worked and would have looked more like actual TypeScript. Bold is a highlighter for the interviewer, not a compiler.

**Technical:** `&lt;` / `&gt;` are required if you are not using a text-level tag that still contains `<` in source (Q74). `<code>Deque&lt;Position&gt;</code>` is the better semantic choice (HTML for machine-readable fragments) and the page already uses a monospace body font, so `<code>` would barely change the look. `<strong>` means strong importance, which is defensible for the thesis words. Alternative: `<code>` inside the footer; keep entities either way. CSS `.legend strong { color: var(--text); }` would need a `code` sibling rule.

```html
<strong>Deque&lt;Position&gt;</strong>
<strong>Set&lt;string&gt;</strong>
```

### Q74. What happens if you write `Deque<Position>` unescaped in HTML?

**Non-technical:** The browser would think `<Position>` was a new HTML tag, hide that word as an unknown element, and scramble the sentence. You would see “Deque ” and then broken text, not the generic type.

**Technical:** In `text/html`, `<Position>` starts a tag. Unknown elements become `HTMLUnknownElement` in the DOM; their contents (if any) still exist, but a start tag with no end tag will eat following content until the parser recovers. `Deque<Position>` in source is a classic XSS-looking footgun even for static text. Entities or a CDATA-less `<code>` with escaped brackets are required. JSX muscle memory (`<Position>`) is exactly wrong in `.html`. Alternative: `&lt;Position&gt;` (current) or wrap in `<code>` with the same escapes.

```html
Body is a <strong>Deque&lt;Position&gt;</strong> (doubly linked list):
```

### Q75. Why claim “doubly linked list” and “O(1)” in the footer — is that for players or for the interviewer sitting next to you?

**Non-technical:** It is for the interviewer. A player needs “eat the square, don’t hit walls.” The footer is the pitch: we did not use a slow array shift; we used a deque and a set. You are supposed to be able to point at the board and say that sentence out loud.

**Technical:** `Deque<T>` is a doubly linked list with O(1) `pushFront` / `popBack` (snake move). Occupancy `Set<string>` is O(1) average `has`. The Big-O story vs V8 arrays for n ≤ 576 is something you should concede in Part 4 (Q175–Q176) — the footer does not. Complexity claims are not verifiable from HTML; they are documentation. Alternative: milder copy (“fast add/remove at both ends”) if this were player-facing. Keep the strong claim for the demo’s stated purpose.

```html
Body is a <strong>Deque&lt;Position&gt;</strong> (doubly linked list): push a new head,
pop the tail, both O(1).
```

### Q76. Why `Set&lt;string&gt;` of occupied cells rather than mentioning `cellKey`?

**Non-technical:** The footer stays at interview altitude: “a set of occupied cells.” It does not leak the `"x,y"` string format. That detail is for when you open `Snake.ts`.

**Technical:** `cellKey` is a module-private function `` `${pos.x},${pos.y}` ``. The HTML would rot if you changed the separator. `Set<string>` is the type you can defend without scrolling. Honest simplification: it is not `Set<Position>` because object identity would break (Q205). Alternative: mention `"x,y"` keys if you want the footer to pre-answer that follow-up. Current line matches README’s public story.

```html
<strong>Set&lt;string&gt;</strong> of occupied cells, O(1) per lookup instead of scanning
the body.
```

### Q77. Is this footer visible on a 320px phone without stealing the canvas?

**Non-technical:** Yes, it sits under the board in small grey type, full width of the column. It does not cover the canvas. On a very short phone screen the centered page may clip the top or bottom and you might have to scroll to read it — the board still shrinks to fit the width.

**Technical:** `.wrap { max-width: 620px; width: 100% }`, `.legend { width: 100% }`, canvas `max-width: 100%`. On 320px minus 48px body padding, the bitmap displays ~272px square; the footer is below, `0.75rem`, centered. It does not `position` over the frame. `body` is flex-centered with **no** `overflow-y: auto` (Q102): a 320×568 viewport can clip HUD+528-scaled board+hint+footer as a group. Stealing the canvas: no. Requiring scroll: maybe. Alternative: hide `.legend` below a breakpoint if you prioritized play over DSA on mobile. This demo is desktop-interview-first (Q429).

```css
.legend {
  margin-top: 4px;
  border-top: 1px solid var(--border);
  padding-top: 12px;
  width: 100%;
}
```

---

## Line 42 — module script

### Q78. Why `type="module"` instead of a classic script or `type="module"` plus a bundler?

**Non-technical:** The game is split into small TypeScript files that import each other. `type="module"` is the browser’s native way to understand `import` / `export`. There is no Webpack or Vite. You compile with `tsc` and the browser loads the files as a tiny constellation.

**Technical:** `package.json` has `"type": "module"` and `tsconfig` emits `ES2020` modules to `dist/`. `index.html` must match or `import { Game } from "./Game.js"` inside `dist/main.js` throws. A classic script cannot use static `import`. A bundler would concatenate to one file (helps `file://`, fewer round-trips — Q85, Q416) and would hide the module graph the demo wants to show. Alternative: IIFE bundle for zero-CORS local files; keep native modules for the OOP-split story. README documents the HTTP-server requirement.

```html
<script type="module" src="dist/main.js"></script>
```

```ts
import { Game } from "./Game.js";
```

### Q79. Why is there no `defer`? Do modules already defer?

**Non-technical:** Module scripts already wait until the HTML is parsed before they run, the same idea as `defer` on an old script tag. Adding `defer` would not change the game. Classic scripts without `defer` at the bottom of the body also wait, but for a different reason.

**Technical:** HTML spec: module scripts are deferred by default — fetched in parallel, run after document parse, in document order, before `DOMContentLoaded`. `defer` on `type="module"` is ignored (or redundant). `async` on a module would race and could run before the rest of the document, which would make `getElementById` fail unless you also check `readyState` (Q370). Alternative: omit `defer` (current, correct); never add `async` without a boot guard.

```html
<script type="module" src="dist/main.js"></script>
```

### Q80. Why is the script at the end of `<body>` if modules are deferred anyway?

**Non-technical:** Habit and readability: humans see “markup first, script last.” The browser would wait even if you put the module tag in the head. Putting it at the bottom does mean the browser discovers the file a little later.

**Technical:** Deferred/module scripts are fetched when the parser reaches the tag. In `<head>`, download starts earlier and overlaps the rest of parse — better on slow networks. At the end of `<body>`, discovery waits until HUD/canvas/footer are parsed (tiny document, so the win is small). `main.ts` also registers `DOMContentLoaded`, so runtime is after parse either way. Alternative: move to `<head>` for earlier fetch without changing behavior. Keep at the bottom if you want the HTML to read as a textbook page.

```html
  </main>

  <script type="module" src="dist/main.js"></script>
</body>
```

### Q81. What happens if you move this tag into `<head>` without `defer` — for a classic script vs a module?

**Non-technical:** A classic script in the head would freeze HTML parsing, and the script would fail because the canvas did not exist yet. A module in the head would still wait until the page finished parsing, then run — the game would work, and the file might even start downloading sooner.

**Technical:** Classic `<script src="dist/main.js">` in `<head>` without `defer`/`async` is parser-blocking. `getElementById("board")` would be null, `main()` on `DOMContentLoaded` would still run later if the listener registered — unless `main()` were called immediately. This file uses `DOMContentLoaded`, so even a blocking classic head script might *work* if it only registers the listener — but it would block CSS/HTML. Module in `<head>`: deferred, DOM exists, `DOMContentLoaded` may already be about to fire; the listener still runs in the normal defer pipeline (Q368). Alternative: module in head is fine; classic in head without defer is the footgun.

```html
<script type="module" src="dist/main.js"></script>
```

```ts
document.addEventListener("DOMContentLoaded", main);
```

### Q82. Why `src="dist/main.js"` and not `src/main.ts`?

**Non-technical:** Browsers do not run TypeScript. You compile to JavaScript in the `dist` folder and point the page at that output. Opening the `.ts` file in the browser would either download it as text or fail as a module.

**Technical:** `tsc` writes `dist/main.js` plus a graph of sibling modules. There is no sucrase, esm.sh, or in-browser transpile (Q397). `src/main.ts` contains TypeScript types (`HTMLCanvasElement | null`) that are syntax errors in JS. Import specifiers use `.js` extensions (`./Game.js`) because that is what the browser will request. Alternative: Vite `index.html` with `/src/main.ts` during dev — rejected here to keep “no bundler.” Reviewers must hit `dist/`, not `src/`.

```html
<script type="module" src="dist/main.js"></script>
```

```ts
function main(): void {
  const canvas = document.getElementById("board") as HTMLCanvasElement | null;
```

### Q83. What happens if `dist/main.js` is stale relative to `src/`?

**Non-technical:** You play yesterday’s game while reading today’s TypeScript. That is a classic demo fail: you change `tickMs` in `src/main.ts`, forget `npm run build`, and the reviewer still sees 110ms. The HTML tag cannot tell they drifted.

**Technical:** HTML always loads compiled JS. README admits `dist/` is committed “so this works immediately without a build step.” There is no hash, no `?v=`, no CI check. Source maps (`//# sourceMappingURL=main.js.map`) can make DevTools *look* like you are debugging `main.ts` while the runtime is stale — extra confusing. Alternative: `npm run watch` while developing, or do not commit `dist/` and always build. Honest gap (Q414).

```html
<script type="module" src="dist/main.js"></script>
```

```json
"scripts": {
  "build": "tsc",
  "watch": "tsc --watch"
}
```

### Q84. What happens if you open `index.html` as `file://` — which error, and why?

**Non-technical:** Double-clicking the HTML file fails. The browser treats local files as having a null origin and refuses to load the extra JavaScript pieces the game is split into. README already warns you to run a tiny local server instead.

**Technical:** ES modules on `file://` are CORS-restricted. Chrome’s origin is `"null"`. Typical console: `Access to script at 'file:///…/dist/main.js' from origin 'null' has been blocked by CORS policy` and/or follow-on failures loading `./Game.js`. The HTML, CSS, HUD, and empty overlay still paint (Q86-like). Classic non-module scripts often still run from `file://`; modules do not. Alternative: `python3 -m http.server 8000` or `npx serve .`, then `http://localhost:8000`. An IIFE bundle would avoid this. This is a documented, intentional tooling tradeoff.

```html
<script type="module" src="dist/main.js"></script>
```

```markdown
browsers will block it over a bare `file://` URL (CORS). Serve the folder locally instead
```

### Q85. Why not `importmap` or a single IIFE bundle?

**Non-technical:** An import map is for renaming packages (`"react"` → a CDN URL). This game only imports relative files like `./Game.js`, so a map would be empty ceremony. One bundled file would make double-click work, but it would hide the class-per-file story.

**Technical:** No bare specifiers, no `node_modules` at runtime, zero runtime dependencies. `importmap` adds nothing. An IIFE or concatenated ESM (esbuild `bundle: true`) would load one URL, work on `file://`, and still run `Game`. The demo’s OOP table (Deque, Snake, Food, Board, Game) is easier to show as separate network requests in DevTools (seven modules — Q415). Alternative: keep native modules + documented HTTP server (current); or bundle only for a “download and open” zip. No import map in `index.html`.

```html
<script type="module" src="dist/main.js"></script>
```

```ts
import { Game } from "./Game.js";
```

### Q86. What happens if `dist/main.js` 404s — which HTML still works?

**Non-technical:** The chrome of the page still works: title, heading, score 0, Idle, Restart (dead), hint, footer, dark theme. The board is a covered empty rectangle. It is a static poster of a game, not a game.

**Technical:** CSS `style.css` is independent. Overlay FOUC becomes permanent (Q64). `getElementById` never runs. No throw in *your* code — the browser logs a 404 / failed module load. Sibling modules are never requested. HTML that “works”: everything except canvas drawing, input, overlay text, and HUD updates. Alternative: a classic `nomodule` or inline boot message — not present (Q87). Check the Network tab for `dist/main.js`.

```html
<title>Snake — Deque + Set Edition</title>
<link rel="stylesheet" href="style.css" />
…
<span id="score" class="hud-value">0</span>
<span id="status" class="hud-value">Idle</span>
…
<script type="module" src="dist/main.js"></script>
```

### Q87. Why no `nomodule` fallback script?

**Non-technical:** `nomodule` is a spare script for ancient browsers that do not understand modules (old Internet Explorer). This demo targets current Chrome/Firefox/Safari for an interview. Supporting IE would mean a second compiled file you do not have.

**Technical:** `<script type="module">` is ignored by non-module UAs; `<script nomodule>` is ignored by module UAs. A fallback would need an ES5 IIFE build (`target: ES5` plus a bundler). `tsconfig` is `ES2020` + class fields + optional chaining — even a classic script of `dist/main.js` would fail on IE. Honest: no `nomodule`, no polyfills, no IE. Alternative: document “modern browsers only” in the README (implicit via `type="module"`). Do not add an empty `nomodule` tag.

```html
<script type="module" src="dist/main.js"></script>
```

### Q88. Why no `crossorigin` on the script?

**Non-technical:** That attribute is for loading scripts from another website and for richer error reports. This script is a relative file on the same origin as the HTML. You do not need it, and it would not fix `file://`.

**Technical:** `crossorigin` (anonymous / use-credentials) puts the request in CORS mode. Same-origin `dist/main.js` already gets full error stacks and does not need CORS. Cross-origin CDN scripts use it plus often SRI (`integrity`). Module scripts that *are* cross-origin default to CORS anyway. `file://` failures are origin `null`, not a missing `crossorigin` attribute. Alternative: omit it (current). Add it only if you moved `dist/` to another host. No `integrity` hash either — `dist/` changes with every `tsc`.

```html
<script type="module" src="dist/main.js"></script>
```

---

End of Part 1 (Q1–Q88). Continue with [Deep-Dive-Answers-CSS.md](./Deep-Dive-Answers-CSS.md) for Q89–Q151.
