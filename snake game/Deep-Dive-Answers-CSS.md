# Deep-dive answers — CSS (Q89–Q151)

Part 2 of the interview set. Source: `style.css`.

Each answer has a recruiter-facing take, the browser mechanics, and a snippet from this 168-line sheet as it exists today. Pair with `index.html` (HUD, `.board-frame`, empty overlay, hint, footer) and `src/Game.ts` / `src/Board.ts` (canvas hex is **not** read from CSS).

Honest gaps up front: `--accent` matches `FOOD_COLOR` but canvas clear `#14161a` is not a token, so TS colors can drift; `*` box-sizing has no `::before`/`::after`; HUD flex does not wrap; Restart uses `:focus` **and** `:focus-visible` (mouse outlines); `.overlay { display: flex }` **requires** `.overlay[hidden] { display: none }` or `hidden` loses; `prefers-reduced-motion` only sets `transition: none` on the button — ticks still run; no light theme, no `color-scheme`, no print, no 44px touch target.

---

### Q89. Why custom properties on `:root` instead of hard-coded hex in each rule?

**Non-technical:** One place to change the look. Teal, charcoal, and grey stay in sync across the HUD, button, overlay, and footer.

**Technical:** Custom properties on `:root` (the document element) inherit to every rule that uses `var(--bg)` and friends. Changing `--accent` updates `.hud-value`, `.restart-btn:hover`, and the focus outline together. The alternative is copy-pasted hex in ten selectors — a palette tweak becomes a search-replace. `:root` vs `html` is the same element in HTML documents; `:root` is the conventional token host and has slightly higher specificity than `html`. Tokens do **not** reach the canvas: `Board.clear` and `HEAD_COLOR` / `BODY_COLOR` / `FOOD_COLOR` are TypeScript string literals. CSS variables are not a design-system file, a `:root.light` override, or a `color-mix` pipeline — they are a six-name map for the chrome around the bitmap.

```css
:root {
  --bg: #0c0d10;
  --panel: #17191d;
  --border: #2a2d33;
  --text: #e4e4e7;
  --muted: #8a8f98;
  --accent: #2dd4bf;
}
```

---

### Q90. Why names `--bg`, `--panel`, `--border`, `--text`, `--muted`, `--accent` rather than `--ink` / `--signal` like the portfolio?

**Non-technical:** These names describe this page: background, cards, lines, copy, quiet copy, highlight. They are not the portfolio’s ink/signal vocabulary.

**Technical:** Token names are an API. `--ink` / `--signal` / `--paper` in the portfolio encode a print-shop metaphor. This demo is a game chrome: `--bg` for `body`, `--panel` for HUD blocks and the button fill, `--border` for 1px lines, `--text` / `--muted` for contrast levels, `--accent` for score, hover, and focus. Reusing portfolio names would imply a shared sheet that does not exist — these folders do not import each other. Role names (`--accent`) are more portable than hue names (`--teal`): if food became amber you would still have an accent. Gap: `--muted` happens to equal `BODY_COLOR` (`#8a8f98`) but is never documented as “snake body,” so a CSS-only mute tweak would desync the canvas body without touching the HUD labels.

```css
:root {
  --bg: #0c0d10;
  --panel: #17191d;
  --border: #2a2d33;
  --text: #e4e4e7;
  --muted: #8a8f98;
  --accent: #2dd4bf;
}
```

---

### Q91. Why `#0c0d10` / `#17191d` / `#2dd4bf` — how did you pick this palette?

**Non-technical:** Near-black page, slightly lighter cards, teal highlight so score and food feel like the same “alive” color.

**Technical:** `#0c0d10` is a cool charcoal, not `#000` — crushed blacks hide the 1px `--border` (`#2a2d33`). `--panel` `#17191d` sits one step up so HUD blocks read as chips, not holes. `--text` `#e4e4e7` (zinc-200-ish) on that background is well above WCAG AA for normal text; `--muted` `#8a8f98` on `--bg` is closer to the AA edge for small 0.7–0.78rem labels — a reviewer can ask you to check contrast, not assume it. `#2dd4bf` is Tailwind `teal-400`: saturated enough to pop on charcoal, not neon. The canvas playfield is a **third** charcoal (`#14161a` in `Board.clear`) between `--bg` and `--panel`, so the board is a recessed well, not a second copy of the page. No OKLCH, no `color-mix`, no system `Canvas` / `CanvasText` — a fixed dark demo palette.

```css
:root {
  --bg: #0c0d10;
  --panel: #17191d;
  --border: #2a2d33;
  --text: #e4e4e7;
  --muted: #8a8f98;
  --accent: #2dd4bf;
}
```

---

### Q92. Why is `--accent` teal (`#2dd4bf`) matching `FOOD_COLOR` in Game.ts, while the canvas clear color `#14161a` is **not** a token?

**Non-technical:** The pellet on the board is meant to match the teal score. The playfield fill is a slightly different black that only the canvas painter knows.

**Technical:** `FOOD_COLOR = "#2dd4bf"` is a TypeScript constant used in `render()` via `board.drawCell`. `--accent: #2dd4bf` is a CSS custom property used by `.hud-value` and the Restart hover/focus. They match by **convention**, not by a shared source: canvas 2D `fillStyle` cannot read `getComputedStyle` unless you write that glue, and this project does not. `Board.clear` uses `#14161a` — not `--bg` (`#0c0d10`), not `--panel`. That is intentional visually (board ≠ page) and a maintenance trap: a “darken the UI” pass in CSS leaves a mismatched rectangle. `HEAD_COLOR` `#f5f5f4` is near `--text` `#e4e4e7` but not equal; `BODY_COLOR` `#8a8f98` **is** `--muted`. Interview line: chrome tokens and bitmap literals can drift; the honest fix is one palette module or `getComputedStyle(document.documentElement).getPropertyValue('--accent')` when constructing Game.

```css
:root {
  --accent: #2dd4bf;
}
```

```ts
const HEAD_COLOR = "#f5f5f4";
const BODY_COLOR = "#8a8f98";
const FOOD_COLOR = "#2dd4bf";
// Board.clear(): this.ctx.fillStyle = "#14161a";
```

---

### Q93. What happens if you change `--accent` in CSS but forget Game.ts `FOOD_COLOR` / `HEAD_COLOR` / `BODY_COLOR`?

**Non-technical:** The score and Restart hover change color. The food, head, and body on the board stay the old teal / off-white / grey.

**Technical:** CSS `var(--accent)` updates `.hud-value`, `.restart-btn:hover` border/color, and the 2px focus outline. Canvas pixels are set in `Game.render` with `HEAD_COLOR` / `BODY_COLOR` / `FOOD_COLOR` and in `Board.clear` with `#14161a`. Those strings are compile-time literals in `dist/Game.js` / `dist/Board.js`. Forgetting TS after a CSS retheme is the demo’s real color bug. Head and body are not even `--text` / `--muted` in CSS — only food is “supposed” to match `--accent`. A reviewer who changes `--accent` to amber in DevTools will see HUD amber and food still teal. Alternative: CSS `background` on a wrapper cannot paint snake cells; you must keep JS in the loop or draw food with a CSS overlay (worse).

```css
.hud-value {
  color: var(--accent);
}

.restart-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

---

### Q94. Why no light theme / `html.light` inversion?

**Non-technical:** The game is always a dark terminal. There is no sun/moon toggle and no “follow the OS.”

**Technical:** No `html.light` class, no `[data-theme]`, no `@media (prefers-color-scheme: light)` override of the six tokens. The portfolio next to this repo does invert; this sheet does not. A light page would need new token values **and** new canvas fills (`#14161a`, grid `rgba(255,255,255,0.05)`, head `#f5f5f4` on a light board would vanish). That is why a CSS-only `html.light` is insufficient here: the bitmap is a second theme. `prefers-color-scheme: light` users still get charcoal. Honest: interview demo, one look, skip the dual-palette tax. Cost: OS light mode plus forced-colors / high-contrast users get a page that ignores their preference; `color-scheme` is also missing (Q95).

```css
:root {
  --bg: #0c0d10;
  --panel: #17191d;
  --text: #e4e4e7;
  --accent: #2dd4bf;
}
```

---

### Q95. Why no `color-scheme: dark` on `html`?

**Non-technical:** The page looks dark, but the browser’s own bits (scrollbar, form internals, DevTools-adjacent UA chrome) may still assume a light canvas.

**Technical:** `color-scheme: dark` on `html` (or `:root`) tells the engine this document is dark: native scrollbars, `input`/`button` UA styling, and the root `Canvas`/`CanvasText` system colors. Without it, some platforms keep a light scrollbar on a `#0c0d10` body. This page has no text fields, so the gap is mostly scrollbars and any UA button metrics on `.restart-btn` (already fully restyled). `color-scheme` does **not** replace `--bg` and does **not** set canvas `fillStyle`. Pairing `color-scheme: dark` with the existing tokens is a one-line win; omitting it is a demo shortcut, not a canvas constraint. `color-scheme: dark light` would advertise both and still need a light token set you do not have (Q94).

```css
:root {
  --bg: #0c0d10;
  --text: #e4e4e7;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

---

### Q96. Why `* { box-sizing: border-box; }` without `*::before, *::after`?

**Non-technical:** Width includes padding and border on real tags. Decorative CSS-only boxes are not included.

**Technical:** The universal selector matches elements, not pseudo-elements. `::before` / `::after` keep the initial `content-box` unless listed. This sheet has **no** generated content today — Restart has no icon `::before` — so the omission is invisible. The inherit pattern (`html { box-sizing: border-box }` + `*, *::before, *::after { box-sizing: inherit }`) is the usual interview upgrade: widgets can opt out, pseudos stay consistent. Cost of the current rule: any future `::before` with `width` + `padding` overflows its button. See Q97.

```css
* {
  box-sizing: border-box;
}
```

---

### Q97. What happens if the restart `::before` (there isn’t one) needed padding later?

**Non-technical:** An icon you add with CSS could stick out of the Restart button even though the button itself sizes correctly.

**Technical:** If you later add `.restart-btn::before { content: "↺"; padding: 4px; width: 1.2em; }`, that pseudo uses `content-box`. Padding adds **outside** the 1.2em, so the generated box is wider than the author intended and can overflow the 10px/18px padded button. `*` would not save you. Fix: add `*::before, *::after` to the box-sizing rule, or set `box-sizing: border-box` on that pseudo. Today there is no `::before` on Restart (or anywhere), so this is a hypothetical the question plants on purpose — answer with “no bug yet, incomplete reset.”

```css
* {
  box-sizing: border-box;
}

.restart-btn {
  padding: 10px 18px;
}
```

---

### Q98. Why no `margin: 0; padding: 0` on `*` when `body` sets `margin: 0`?

**Non-technical:** Only the page edge is stripped of the browser’s default gap. Headings and paragraphs still have their usual margins unless a class zeros them.

**Technical:** UA `body { margin: 8px }` would offset the flex-centered wrap; `body { margin: 0 }` removes that. A global `* { margin: 0; padding: 0 }` is a “classless reset” this sheet does not use. Instead, `.title`, `.hint`, and `.legend p` each set `margin: 0`. `h1` otherwise keeps a large UA top/bottom margin that would inflate `.wrap`’s `gap: 14px` (flex gap + collapsing is not the same as block collapsing — in a flex column, `h1` margin **does** add to gap). `.title { margin: 0 }` is therefore load-bearing (Q113). Lists are unused. This is a targeted reset: cheaper than a full reboot, easy to miss a new element. `padding: 24px` on `body` is the only page gutter.

```css
body {
  margin: 0;
  padding: 24px;
}

.title {
  margin: 0;
}

.hint {
  margin: 0;
}
```

---

### Q99. Why `html, body { height: 100%; }`?

**Non-technical:** The page is as tall as the window so the game can sit in the middle, not stuck at the top.

**Technical:** Percentage height resolves against the parent’s **specified** height. `html { height: 100% }` is 100% of the initial containing block (viewport). `body { height: 100% }` then fills `html`. That gives `body` a definite flex container height so `align-items: center` can vertically center `.wrap`. `height: 100%` on `body` alone without `html` often computes `auto` (html’s height is content-sized), and centering fails — content sticks to the top. Cost: a used height of 100% can interact badly with overflowing content (Q100, Q102). Alternative: `min-height: 100%` / `100dvh` on `body` only, still needing a positioned containing block for the flex centering.

```css
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

### Q100. What happens if you use `min-height: 100%` or `100dvh` instead?

**Non-technical:** The layout can grow taller than the phone screen instead of being locked to one screen-height box.

**Technical:** `min-height: 100%` on `html, body` (or `min-height: 100vh` / `100dvh` on `body`) lets the flex container grow with HUD + 528px canvas + hint + legend. `height: 100%` **caps** used height at the viewport; overflow is then a scroll/clip question (Q102). `100vh` on mobile includes the area behind the collapsing URL bar, so you get a jump or a clipped bottom; `100dvh` tracks the dynamic viewport and is the modern substitute. `100%` vs `100vh`: percentage follows the ICB; `vh` is a explicit viewport unit and does not need `html { height }`. For this demo, `height: 100%` is the classic “center in the window” trick; `min-height: 100dvh` plus `box-sizing` padding is the more honest mobile choice. `100svh` (small viewport) would avoid URL-bar overlap at the cost of unused space when chrome hides.

```css
html,
body {
  height: 100%;
}
```

---

### Q101. Why `body` is `display: flex; align-items: center; justify-content: center`?

**Non-technical:** The whole game — title, HUD, board, hint, footer — sits in the middle of the window like a cartridge, not a long article from the top.

**Technical:** `body` is a flex container with one flex item: `<main class="wrap">`. `justify-content: center` centers on the main axis (horizontal in `flex-direction: row`, the default). `align-items: center` centers on the cross axis (vertical). That is why a short desktop viewport looks poster-like. `place-content: center` / `place-items: center` on a grid `body` is equivalent. `text-align: center` would **not** center the block-level `.wrap`. Gap: the wrap is `width: 100%; max-width: 620px`, so horizontal centering is “center a 620px column,” not shrink-to-content. On a tall monitor there is equal leftover space above the title and below the legend. No `overflow-y: auto` here (Q102).

```css
body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
```

---

### Q102. What happens on a short mobile viewport — does the HUD + canvas overflow without `overflow-y: auto` on `body`?

**Non-technical:** On a short phone, the board plus HUD plus footer can be taller than the screen. You scroll the page; the game is not inside its own scrolling panel.

**Technical:** Canvas bitmap is 24×22×22 = **528×528** CSS pixels before shrinking. Plus title, HUD (~50px), hint, legend, `body` padding 24×2, `.wrap` gap 14×4. On a 667px-tall phone that can exceed `height: 100%`. Default `overflow` is `visible`; the viewport typically still scrolls (`html`/`body` overflow propagation). There is **no** `overflow-y: auto` on `body`, and no inner scroller on `.wrap`. You do not clip the canvas inside the frame except `overflow: hidden` for the overlay/radius (Q127). Risk: some browsers with `height: 100%` on both `html` and `body` make overflow awkward (scroll on `body` vs viewport, or a non-scrollable flex item). Safer: `min-height: 100dvh; height: auto; overflow-y: auto` on `body`, or `align-items: flex-start` when `wrap` is taller than the viewport (`overflow: safe` / media query). Keyboard `Space` also `preventDefault`s page scroll while the game is focused via `window` keydown — a short page that needs scroll fights pause.

```css
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
```

---

### Q103. Why `padding: 24px` on `body` in `px` not `rem`?

**Non-technical:** A fixed 24-pixel gutter so the board never kisses the screen edge. Zooming text does not grow that gutter as much as the type.

**Technical:** `px` padding does not scale with the user’s root font size. `rem` padding would grow when the UA font is 20px or 200% zoom, eating the 620px column and the 528px canvas sooner. For a canvas demo that already struggles at 320px (Q115), locking the gutter in px keeps more room for the bitmap. Cost: WCAG 1.4.4 Resize text — spacing that stays px while type is rem is a mixed scale (Q149). `padding: 1.5rem` (24px at 16px root) would be the “type-relative” choice. Logical equivalent `padding: 24px` vs `padding-block` / `padding-inline` — unused (Q150). The 24px also is the overlay’s inner padding, copied as a magic number, not a token.

```css
body {
  padding: 24px;
}

.overlay {
  padding: 24px;
}
```

---

### Q104. Why `font-family: "SFMono-Regular", "JetBrains Mono", Consolas, "Courier New", monospace` — and no `@font-face` / Google Fonts?

**Non-technical:** HUD and footer look like code. No font file is downloaded; the machine uses whatever mono it already has.

**Technical:** The stack is local-only: San Francisco Mono on Apple (`SFMono-Regular` is the PostScript family used in some stacks; `ui-monospace` / `"SF Mono"` are more reliable on current macOS), then JetBrains if installed (dev machines), then Consolas (Windows), Courier New, generic `monospace`. No `@font-face`, no Google Fonts, no `font-display` — zero webfont RTT, no FOUT/FOIT, no CLS from font swap. The legend’s `Deque<Position>` story matches the chrome. Cost: no guaranteed JetBrains; metrics differ (Q105). `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` would be a more honest system stack. Loading JetBrains from a CDN would make the demo look identical on a reviewer’s laptop and cost privacy/CSP/`file://` extra requests this project already struggles with for modules.

```css
body {
  font-family: "SFMono-Regular", "JetBrains Mono", Consolas, "Courier New", monospace;
}
```

---

### Q105. What happens on Windows vs macOS if JetBrains Mono is not installed?

**Non-technical:** Macs look like Terminal. Windows looks like Visual Studio / Consolas. The layout still works; letter widths change a bit.

**Technical:** If neither `SFMono-Regular` nor `JetBrains Mono` is installed, Windows hits `Consolas`; old Windows / some Linux hits `"Courier New"` or the generic `monospace` (often Courier-like, sometimes Liberation Mono). Mono advances differ: Consolas vs SF Mono vs Courier New change the width of `RESTART`, `Idle`, and the legend paragraph, which can push the no-wrap HUD (Q114–Q115) over the edge on a 320px screen. `font-size` in rem stays; `letter-spacing` on the title/button is em-relative so it scales with the chosen face’s em square. No `size-adjust` / `ascent-override`. Interview: system stacks are a feature (offline, `file://` CSS still applies) and a screenshot-diff liability.

```css
body {
  font-family: "SFMono-Regular", "JetBrains Mono", Consolas, "Courier New", monospace;
}
```

---

### Q106. Why a mono stack on a game UI rather than a sans-serif HUD?

**Non-technical:** It looks like a developer tool, not an arcade cabinet. The footer is talking about deques; the typeface agrees.

**Technical:** A game HUD often uses a rounded sans or pixel font. This page’s job in an interview is “TypeScript + Deque + Set,” so chrome is code-flavored. Mono makes `0` vs `Idle` and `Game Over` align in the HUD chips. Cost: `Game Over` (enum string with a space) is wider than `Running`; `min-width: 84px` helps but Status can still grow. Pixel-art `image-rendering` plus a sans HUD would split the metaphor; a webfont “arcade” face would fight the no-download choice (Q104). Accessible: mono at 0.7rem labels is small; a sans at the same px is often more readable. This is branding for the repo, not playability.

```css
body {
  font-family: "SFMono-Regular", "JetBrains Mono", Consolas, "Courier New", monospace;
}

.hud-label {
  font-size: 0.7rem;
}
```

---

### Q107. Why no `-webkit-font-smoothing`?

**Non-technical:** Text uses the OS default: slightly heavier on macOS, slightly thinner/aliased depending on Windows ClearType.

**Technical:** `-webkit-font-smoothing: antialiased` (and `moz-osx-font-smoothing: grayscale`) thins glyphs on macOS by using grayscale AA instead of subpixel. Many dark UIs add it so light-on-dark type does not look muddy. This sheet omits it: fewer non-standard properties, closer to system apps. On a dark `#0c0d10` background, default subpixel AA can show color fringing on non-retina Macs; on Windows the property is ignored. Not a layout bug. `text-rendering: geometricPrecision` is also absent. Honest: optional polish, not required for the deque story.

```css
body {
  color: var(--text);
  font-family: "SFMono-Regular", "JetBrains Mono", Consolas, "Courier New", monospace;
}
```

---

### Q108. Why `.wrap` is a column flex with `gap: 14px` and `max-width: 620px`?

**Non-technical:** Title, HUD, board, hint, and footer stack with even gaps. The column never gets wider than a comfortable reading/game width even on a 27-inch monitor.

**Technical:** `main.wrap` is `flex-direction: column` (default `row` would put the title beside the HUD). `gap: 14px` replaces margin collapsing — flex items do not collapse margins with each other, so `gap` is the right spacing primitive. `width: 100%` fills the padded body; `max-width: 620px` caps it. 620 is just above the 528px canvas plus 1px borders, with room for HUD chips. `align-items: center` (Q110) centers children that are narrower than 620px. Alternative: CSS grid `grid-template-rows` — overkill for five stacked pieces. `max-width: 528px` would clip the HUD’s three-up row sooner.

```css
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  max-width: 620px;
}
```

---

### Q109. What happens if `max-width` is `100%` or `80ch`?

**Non-technical:** `100%` lets the column grow with the window — the board stays 528px centered with huge side gutters, or the HUD stretches awkwardly. `80ch` sizes to eighty zeros of the mono font, which is not the canvas size.

**Technical:** `.wrap` already has `width: 100%`; `max-width: 100%` is a no-op relative to the padded body (minus 24px×2). The canvas `#board { max-width: 100% }` would then scale up only if the wrap exceeded 528px — which it would, on desktop, **but** the canvas bitmap is 528 CSS pixels and `height: auto` keeps the drawn size at 528 unless the containing block is **smaller**. A wider wrap does not upscale the canvas; you get empty `.wrap` space. HUD `width: 100%` **would** stretch to full viewport minus padding — chips far apart, `justify-content: center` still clusters them. `80ch` at Consolas ~0.6em average is ~ character-width × 80, often ~480–640px depending on the face — coincidentally near 620, but it tracks font not board. `max-width: min(620px, 100%)` is already the effect of `width: 100%; max-width: 620px`.

```css
.wrap {
  width: 100%;
  max-width: 620px;
}

#board {
  max-width: 100%;
  height: auto;
}
```

---

### Q110. Why `align-items: center` — does that shrink the HUD’s `width: 100%`?

**Non-technical:** The title and hint sit in the middle. The HUD and footer still try to be as wide as the column.

**Technical:** In a column flex container, `align-items: center` sets `align-self: center` on children, which sizes each item to its **max-content** unless the item has an explicit `width`/`align-self: stretch`. `.hud` and `.legend` set `width: 100%`, so they stretch to the wrap’s inner width (up to 620px) even with `align-items: center` — specified `width` wins over shrink-to-fit. `.title`, `.hint`, and `.board-frame` do **not** set `width: 100%`; they shrink to content (title text, hint line, canvas width). The frame is as wide as the canvas (capped by `max-width: 100%`). Removing `align-items: center` defaults to `stretch`: title and hint would become 620px wide (text still left/start in LTR unless `text-align`), which would left-align the `h1` against the column edge rather than centering the word “SNAKE.” HUD would look the same because of `width: 100%`.

```css
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 620px;
}

.hud {
  width: 100%;
}

.legend {
  width: 100%;
}
```

---

### Q111. Why `.title` is `1.4rem`, `letter-spacing: 0.08em`, `text-transform: uppercase`?

**Non-technical:** “SNAKE” is a compact label, slightly spaced, all caps — a game wordmark, not a blog H1.

**Technical:** `1.4rem` (~22px at 16px root) is smaller than the UA `h1` (~2em). `letter-spacing: 0.08em` tracks with font-size (em of the element). `text-transform: uppercase` is CSS, not HTML — the document text is `Snake`, screen readers generally speak the accessible name as authored (`Snake`) in most engines, while visual users see SNAKE. That split is usually what you want. `color: var(--text)` restates `body` color (redundant unless a parent muted it). No `font-variation-settings`. Tight size keeps vertical room for the 528px canvas (Q102). Alternative: a visually hidden full title matching the `<title>` tag (`Snake — Deque + Set Edition`) while the H1 stays short — not done; the H1 is just `Snake`.

```css
.title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
}
```

---

### Q112. Why `font-weight: 600` not `700`?

**Non-technical:** The title is semibold, not heavy. Score values in the HUD are the bold bits.

**Technical:** `600` is semibold; `700` is bold (and `.hud-value` uses `700`). Many system monos (SF Mono, Consolas) synthesize 600 as a fake bold or map it to the bold cut — you may not see a true 600 vs 700 distinction. JetBrains Mono has a real Semibold. `600` vs `700` on the title keeps hierarchy: wordmark < score. `font-weight: 500` would be lighter; `800` would shout. No `h1` size/weight reset elsewhere. If a face has only 400 and 700, 600 jumps to 700 (browser font matching), and title equals HUD values in weight — still fine.

```css
.title {
  font-weight: 600;
}

.hud-value {
  font-weight: 700;
}
```

---

### Q113. Why `margin: 0` on `.title` when there is no global heading reset?

**Non-technical:** Without it, “SNAKE” would sit in a large default heading gap and the stack would look sparse.

**Technical:** UA stylesheets give `h1` a substantial `margin-block` (often `0.67em`). `.wrap` is a flex column: item margins do **not** collapse with `gap`. You would get `h1` margin **plus** 14px gap above the HUD — a double space. `margin: 0` is the heading reset for the only `h1`. `.hint` and `.legend p` do the same for `p`. A global `h1, p { margin: 0 }` would be equivalent today. Forgetting this is a visible bug; it is not theoretical.

```css
.title {
  margin: 0;
  font-size: 1.4rem;
}
```

---

### Q114. Why `.hud` is `display: flex` with `justify-content: center` and **no** `flex-wrap`?

**Non-technical:** Score, Status, and Restart stay on one row, centered. They do not drop onto a second line on a narrow phone.

**Technical:** Default `flex-wrap: nowrap`. `justify-content: center` packs the three items in the middle of `width: 100%`. `align-items: center` vertically aligns chips (taller, padded) with the button. `gap: 16px` is the only spacer — no `margin-left: auto` on the button, so Restart is not pushed to the far right; it is a third cluster member. **No wrap** is the honest gap: at ~320px CSS width the row overflows (Q115) instead of stacking. `flex-wrap: wrap` plus a slightly smaller `gap` would be the mobile fix. `display: grid; grid-template-columns: 1fr 1fr auto` would keep a two-chip + button layout with equal chip columns.

```css
.hud {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  justify-content: center;
}
```

---

### Q115. What happens on a 320px screen with two blocks + Restart — overflow, wrap, or clip?

**Non-technical:** The three HUD pieces can stick out the sides of the phone. Nothing wraps. The board frame does not clip them (`overflow: hidden` is only on `.board-frame`).

**Technical:** Inner width ≈ 320 − 24px − 24px = **272px**. Two `.hud-block`s at `min-width: 84px` = 168px, plus `gap: 16px` × 2 = 32px, plus Restart (`padding: 10px 18px`, uppercase 0.8rem + `letter-spacing: 0.06em` ≈ 70–100px depending on face). Sum often **> 272px**. `nowrap` → overflow. Default `overflow: visible` on `.hud` / `.wrap` / `body` → content paints outside the column; you may get horizontal page scroll. No `min-width: 0` on flex children. Not clip (no `overflow: hidden` on HUD). Not wrap. Zoom 200% makes it worse. Fix: `flex-wrap: wrap`, shrink padding, or stack the button under the chips in a `@media (max-width: 380px)`. This is a real demo bug, not a trick question.

```css
.hud {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  justify-content: center;
}

.hud-block {
  min-width: 84px;
  padding: 8px 18px;
}
```

---

### Q116. Why `.hud-block` `min-width: 84px`?

**Non-technical:** Score `0` and Status `Idle` chips stay the same width so the row does not twitch when the score becomes `10` or status becomes `Running`.

**Technical:** Without `min-width`, a one-digit score chip is narrower than `Game Over` (the enum string written into `#status`). The centered flex row would shift Restart as the status string grows. 84px is an empirical floor for two-digit scores and `Idle`/`Paused`/`Running`; **`Game Over` is wider** than 84px plus padding — the Status chip still grows, so the anti-twitch is incomplete. `ch`-based `min-width: 9ch` would track the mono face. `grid-template-columns: repeat(2, minmax(84px, 1fr))` would equalize Score and Status even when one label is longer. Padding `8px 18px` plus 1px border is inside `border-box`.

```css
.hud-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 18px;
  min-width: 84px;
}
```

---

### Q117. Why label is `0.7rem` uppercase muted and value is `1.1rem` / `700` / `--accent`?

**Non-technical:** Tiny grey “SCORE” / “STATUS” captions sit above a bigger teal number and state.

**Technical:** Visual hierarchy: label is metadata (`0.7rem`, `letter-spacing: 0.1em`, `uppercase`, `--muted`); value is the live figure (`1.1rem`, `700`, `--accent`). 0.7rem ≈ 11.2px at 16px root — **below** the common 12–14px readability floor and WCAG’s “avoid tiny text” guidance; muted-on-charcoal contrast is the other risk (Q91). `text-transform` on the label is redundant with HTML already `Score`/`Status` capitalized, but it forces `SCORE` visually. Values are not tabular-nums (`font-variant-numeric: tabular-nums`) so `111` vs `0` can still shift width inside the chip despite `min-width`. Same `.hud-value` class on both `#score` and `#status` — status is not a number but shares the food color (Q118).

```css
.hud-label {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.hud-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
}
```

---

### Q118. Why Score and Status share the same `.hud-value` color as the food?

**Non-technical:** Teal means “live data”: the pellet, the score, and the status string all glow the same.

**Technical:** One class, one token: `color: var(--accent)` which is `#2dd4bf` = `FOOD_COLOR`. There is no `.hud-value--status` muted variant. `Game Over` in teal is a bit “success-colored” for a death state — a reviewer may want `--muted` or a red `--danger` token you do not have. Sharing the class keeps the CSS short and the HUD consistent. Idle vs Running is distinguished by **text**, not color. Canvas food still only matches if TS is not drifted (Q92–Q93). Alternative: `data-status` on `#status` with `[data-status="Game Over"] { color: … }` — Game would need to set it; today it only sets `textContent`.

```css
.hud-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
}
```

---

### Q119. Why `font-family: inherit` on the button?

**Non-technical:** Restart uses the same mono as the page. Native buttons often jump to a system sans.

**Technical:** UA `button` { `font-family: system-ui` / `Arial` depending on the browser }. `inherit` pulls `body`’s stack so letter-spacing and uppercase match the HUD. `font-size: 0.8rem` is **not** inherit (body size is medium/16px); you set it explicitly so the button is smaller than `.hud-value`. `color` is also set (`var(--text)`), not inherit from a muted parent. Forgetting `font-family: inherit` is a classic “unstyled button in a mono UI” tell. `appearance` / `-webkit-appearance` is not reset beyond border/background — leftover UA padding is overridden by `padding: 10px 18px`.

```css
.restart-btn {
  font-family: inherit;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text);
  background: var(--panel);
  border: 1px solid var(--border);
}
```

---

### Q120. Why `cursor: pointer` and a 0.15s `transition` on border and color?

**Non-technical:** The mouse becomes a hand. Hover fades the border and label to teal instead of snapping.

**Technical:** Native buttons often keep `cursor: default`. `pointer` marks it clickable (the page has no other buttons). `transition: border-color 0.15s ease, color 0.15s ease` interpolates only those two properties — not `background`, not `transform`. 150ms is short enough to feel instant, long enough to see. `ease` is cubic-bezier(0.25, 0.1, 0.25, 1). Cost: this is the **only** CSS animation/transition in the project, and it is the only thing `prefers-reduced-motion` disables (Q144). `transition: all` would also tween `outline` on focus and is avoided. Keyboard users get the same transition if they tab and… actually hover transition does not run on focus; focus uses outline (Q122).

```css
.restart-btn {
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.restart-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

---

### Q121. Why hover only changes border/color, not `transform`?

**Non-technical:** The button does not jump or grow. It just tints teal.

**Technical:** No `transform: scale(1.02)`, no `translateY(-1px)`. Motion on a control next to a 110ms snake loop would compete for attention and is worse under vestibular sensitivity. Layout stays stable — no hover reflow. Fill stays `--panel` so the chip still matches `.hud-block`. A fill change to `--accent` with `--bg` text would be a stronger affordance and still avoid transform. `:active` is unstyled (no press-down). The reduced-motion media query would need to cancel transforms if you added them; today it only cancels this color transition (Q144).

```css
.restart-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

---

### Q122. Why both `:focus` **and** `:focus-visible`?

**Non-technical:** You tried to draw a teal ring for keyboard users, but you also hooked the older `:focus` state, so the ring is not keyboard-only.

**Technical:** `:focus-visible` is the modern “show a ring when the focus is visible” heuristic (keyboard, script, some a11y tools; typically **not** mouse click on buttons in Chromium/Firefox). `:focus` matches **any** focus, including mouse click on a `<button>`. Listing both with the same outline means `:focus-visible` is redundant — `:focus` already covers it. The usual pattern is **only** `:focus-visible`, or `:focus { outline: none }` + `:focus-visible { outline: … }` (the latter is backwards-compat for old browsers if you still hide `:focus`). This sheet’s grouping is the mouse-outline bug (Q123). `outline-offset: 2px` keeps the 2px teal ring off the 1px border.

```css
.restart-btn:focus-visible,
.restart-btn:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

---

### Q123. What happens for mouse users — do they see an outline on every click because `:focus` is included?

**Non-technical:** Yes. Click Restart with a mouse and a teal box appears around it until focus moves elsewhere.

**Technical:** A button is focusable. Mouse down focuses it → `:focus` matches → 2px `--accent` outline. Chromium would **not** match `:focus-visible` for that click, but you included `:focus`, so the ring still paints. It stays until you click the canvas (canvas is not focusable — no `tabindex` — so focus may remain on the button!) or tab away. That is why mouse users can see a persistent ring while playing if they used Restart. Fix: drop `:focus` and keep `:focus-visible` only. Safari historically lagged on `:focus-visible`; that is the charitable reason to keep `:focus`, and it is still the wrong combo without unsetting outline on mouse-only `:focus`.

```css
.restart-btn:focus-visible,
.restart-btn:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

---

### Q124. What happens if you `outline: none` with no replacement?

**Non-technical:** Keyboard users cannot tell when Restart is selected. Tabbing into the page looks like nothing is focused.

**Technical:** WCAG 2.4.7 Focus Visible (AA) fails if the only focusable control has `outline: none` and no other indicator (`box-shadow`, border change). `:focus { outline: none }` plus a hover-only border is a classic anti-pattern. This sheet does **not** do that — it over-paints outline (Q122). `outline: none` on `:focus` **with** `:focus-visible` styles is acceptable. Removing the whole focus block would fall back to the UA ring (often `auto` / `5px auto` blue), which is visible but off-brand. Never ship `outline: none` alone on a real control.

```css
.restart-btn:focus-visible,
.restart-btn:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

---

### Q125. Why no `:disabled` styles?

**Non-technical:** Restart is never greyed out. It always looks clickable.

**Technical:** HTML has no `disabled` on `#restart`. `Game.start()` runs on every click; while Running/Paused it does **not** `reset()` (orchestrator bug, not CSS). There is therefore no `:disabled` selector to fade `--muted`, set `cursor: not-allowed`, or `opacity`. If you later disable during Idle-only or during a tick, the UA dimming would apply without a custom rule — usually too faint on a dark `--panel`. Interview: missing `:disabled` is honest because JS never disables; adding styles without the attribute is dead CSS. `:disabled` must not rely on color alone (1.4.1).

```css
.restart-btn {
  color: var(--text);
  background: var(--panel);
  border: 1px solid var(--border);
  cursor: pointer;
}
```

---

### Q126. Is `padding: 10px 18px` a 44px touch target? What does WCAG 2.2 say?

**Non-technical:** The button is a small chip, fine for a mouse, short of the phone-thumb size Apple and WCAG’s enhanced target talk about.

**Technical:** Vertical padding 10+10 plus ~0.8rem line box (~13–16px) ≈ **33–36px** tall, not 44px. Horizontal is easier (18px + “RESTART” + 18px ≈ 90px+). WCAG **2.5.8 Target Size (Minimum)** is **24×24** CSS pixels (AA, 2.2) with exceptions for inline/spacing. This button likely **passes 2.5.8**. WCAG **2.5.5 Target Size (Enhanced)** is **44×44** (AAA). Apple HIG 44pt is the interview soundbite. There is no extra `min-height: 44px` / `min-width: 44px`. The HUD chips are also below 44px. This demo is keyboard-first (no swipe); a phone user is already underserved. Honest gap: **no 44px touch target**.

```css
.restart-btn {
  font-size: 0.8rem;
  padding: 10px 18px;
}
```

---

### Q127. Why `.board-frame { position: relative; overflow: hidden; border-radius: 8px }`?

**Non-technical:** The board is a rounded window. The pause/game-over message sits on top of the pixels, and the corners stay clipped.

**Technical:** `position: relative` is the containing block for `.overlay { position: absolute; inset: 0 }` (Q134). Without it, `absolute` overlay positions against the next positioned ancestor (likely `body`/initial CB) and covers the whole page. `overflow: hidden` clips the overlay and canvas to `border-radius: 8px` — otherwise a square canvas would poke out of the rounded border, or the overlay’s background would square-off the corners. `border: 1px solid var(--border)` draws the frame. `max-width: 100%` lets the frame shrink with `.wrap`. `overflow: hidden` does **not** clip the HUD. `isolation` / `z-index` is unused; overlay comes later in DOM so it paints above the canvas.

```css
.board-frame {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  line-height: 0;
  max-width: 100%;
}
```

---

### Q128. Why `line-height: 0` on the frame?

**Non-technical:** It kills a sliver of leftover text-line space that can appear under images and canvases.

**Technical:** Replaced elements (`img`, `canvas`) default to `display: inline` and sit on the text baseline. The line box is taller than the canvas by the descender gap (~3–5px). `line-height: 0` on the parent collapses that line box. `#board { display: block }` (Q130) already removes the baseline gap; `line-height: 0` is belt-and-suspenders. Together with `overflow: hidden`, it prevents a hairline of `--bg` between canvas and the 1px frame border. If you only had `line-height: 0` and left canvas `inline`, it would still work. See Q129 for removing **both**.

```css
.board-frame {
  overflow: hidden;
  line-height: 0;
}

#board {
  display: block;
}
```

---

### Q129. What extra gap appears under the canvas if you remove `line-height: 0` **and** `#board { display: block }`?

**Non-technical:** A thin empty strip shows under the grid, inside the rounded frame — the snake board looks like it is sitting on a shelf.

**Technical:** `canvas` reverts to inline replaced. The strut of the line box (from `line-height` normal ≈ 1.2 × font-size of `.board-frame`, which inherits body ~16px) extends below the baseline. Typical gap is ~4px, background showing `--bg` or the frame’s content box. That gap is **not** `border-spacing` and **not** canvas `height`. `vertical-align: bottom` on the canvas is a third fix. Interviewers love this because it looks like a “mystery margin.” Current code avoids it twice (Q128 + Q130). `overflow: hidden` might clip the gap **if** the frame shrink-wraps the line box incorrectly — do not rely on that; set `display: block`.

```css
.board-frame {
  line-height: 0;
}

#board {
  display: block;
  max-width: 100%;
  height: auto;
}
```

---

### Q130. Why `#board { display: block; max-width: 100%; height: auto; }`?

**Non-technical:** The canvas behaves like a responsive image: no inline gap, never wider than the phone, height follows width so it stays square.

**Technical:** `display: block` — baseline gap (Q129). `max-width: 100%` — containing block is `.board-frame` / `.wrap`; on viewports where 528px + borders > inner wrap, the canvas **shrinks in CSS pixels**. `height: auto` — for replaced elements with an intrinsic ratio (canvas width/height attributes set by `Board` to 528×528), auto height preserves **1:1**. The bitmap is still 528×528 backing-store pixels; CSS only scales the layout box. Do not set CSS `height: 528px` or the ratio breaks when width shrinks. No `width: 100%` — on a wide wrap the canvas stays 528px (intrinsic) rather than stretching up. That is why desktop does not upscale the board (Q109, Q131).

```css
#board {
  display: block;
  max-width: 100%;
  height: auto;
}
```

---

### Q131. What happens to the 528×528 bitmap when CSS shrinks it on a 360px phone — crisp or blurry?

**Non-technical:** The grid looks a bit soft. Cells that were 22 device-independent pixels are squeezed into fewer CSS pixels and the browser smooths them.

**Technical:** Inner width ≈ 360 − 48 = 312px. CSS layout box ≈ 312×312. Backing store remains **528×528** (no `devicePixelRatio` in `Board`). The engine downscales 528→312 with default bilinear filtering (`image-rendering: auto`). 22px cells become ~13 CSS px; 1px grid lines at `col * cellSize + 0.5` smear. On a 3× display, 312 CSS px = 936 device pixels, so you downscale 528 into 936 (upscale relative to device pixels after CSS shrink — still filtered). Result: **blurry**, not crisp pixel art. `Board` also never multiplies canvas.width by `dpr`, so even at full 528 CSS px on a 2× laptop the bitmap is 1× and upscaled — soft on Retina. CSS cannot fix DPR; JS must size the buffer. CSS **can** change the scaler (Q132).

```css
#board {
  display: block;
  max-width: 100%;
  height: auto;
}
```

---

### Q132. Why no `image-rendering: pixelated`?

**Non-technical:** Scaled cells stay slightly blurry instead of turning into hard squares.

**Technical:** `image-rendering: pixelated` (and the older `crisp-edges` / `optimizeSpeed`) nearest-neighbor scales the bitmap. For a 22px-cell snake with 1px **anti-aligned** grid (`+ 0.5` in `Board.drawGridLines`), pixelated scaling makes the grid look harsher and can drop lines. This board is not a 1-bit sprite sheet; it is filled rects. Pixelated helps retro 8×8 tiles more than 22px rounded-inset cells (`drawCell` inset 1). Omitting it prefers smoothness over chunky pixels. On DPR-mismatch (Q131) `pixelated` would still look blocky-wrong rather than sharp-correct. The real fix is `dpr` backing store + CSS size in CSS pixels, not `pixelated`.

```css
#board {
  display: block;
  max-width: 100%;
  height: auto;
}
```

---

### Q133. Why no `aspect-ratio: 1` on the frame — does `height: auto` on the canvas already preserve it?

**Non-technical:** The board stays square because the canvas itself is square, not because the frame was told “1 / 1.”

**Technical:** Intrinsic canvas dimensions 528×528 + `height: auto` + `max-width: 100%` preserve the ratio (HTML replaced-element mapping). `.board-frame` shrink-wraps that box (`align-items: center` on the wrap). `aspect-ratio: 1` on the frame would matter if the canvas were `width: 100%; height: 100%` of a fluid frame, or as a **placeholder before JS** sets `canvas.width` (Q53 in HTML: CLS — empty canvas has no intrinsic size in some browsers until attributes exist). Today HTML has **no** width/height attributes; before `Board`’s constructor the canvas may collapse and the overlay is `inset: 0` on a 0-height frame — FOUC. `aspect-ratio: 1` plus `width: 100%` on the frame would reserve a square and reduce layout jump. Honest gap: no `aspect-ratio`, rely on JS. After load, `height: auto` is enough.

```css
.board-frame {
  max-width: 100%;
}

#board {
  display: block;
  max-width: 100%;
  height: auto;
}
```

---

### Q134. Why `.overlay` is `position: absolute; inset: 0` rather than a sibling below the canvas?

**Non-technical:** Pause and game-over text sit **on** the board, dimming the snake, not in a strip under it.

**Technical:** `inset: 0` = `top/right/bottom/left: 0`. Combined with `.board-frame { position: relative }`, the overlay matches the canvas box. A block sibling below would push the hint down and would not cover pixels — you would see the dead snake un-dimmed. Canvas **cannot** have visible HTML children; the overlay must be a sibling (HTML Q59) **inside the same positioned frame**. `inset: 0` follows the frame as CSS scales the canvas. `width: 100%; height: 100%` is equivalent if the frame’s height is definite; `inset: 0` is shorter and works for absolute. `position: fixed` would cover the viewport including HUD — wrong.

```css
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: rgba(12, 13, 16, 0.82);
}
```

---

### Q135. Why `background: rgba(12, 13, 16, 0.82)` — hard-coded, not `color-mix` with `--bg`?

**Non-technical:** A dark glass over the board, a bit see-through so the last frame of the snake is still there.

**Technical:** `#0c0d10` is `--bg`; `rgba(12, 13, 16, 0.82)` is that rgb with 82% alpha. It is **not** `rgb(from var(--bg) r g b / 82%)` or `color-mix(in srgb, var(--bg) 82%, transparent)`. Changing `--bg` in `:root` leaves the overlay stuck on the old charcoal. `color-mix` is well-supported now; omitting it is the same class of drift as canvas `#14161a`. Alpha 0.82 keeps `drawCell` head/body faintly visible (game-over still shows the crash). `backdrop-filter: blur(4px)` is unused. 0.82 vs 1.0 is a product choice; 0.5 would be too weak for the white overlay text contrast — check `color: var(--text)` on 82% dark over mixed pixels.

```css
.overlay {
  background: rgba(12, 13, 16, 0.82);
  color: var(--text);
}
```

---

### Q136. Why `display: flex; align-items: center; justify-content: center; text-align: center`?

**Non-technical:** The pause / start / game-over sentence sits in the middle of the board, centered on both axes, and long lines wrap centered.

**Technical:** Flexbox centers the overlay’s **text node / anonymous box** (or a single text run) in the absolute box. `justify-content` + `align-items` center the flex item; `text-align: center` centers wrapped lines **inside** that item (`Game.setOverlay` sets `textContent`, no inner `<p>`). Without `text-align: center`, a wrapped “Game over — score …” would be a left-aligned block centered as a whole — ragged. `padding: 24px` keeps copy off the rounded corners. `line-height: 1.5` (set on `.overlay`) restores readable leading after the frame’s `line-height: 0` — **inheritance**: overlay is a child of `.board-frame`, so without its own `line-height: 1.5` the message would inherit `0` and collapse. That `1.5` is load-bearing.

```css
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  font-size: 0.95rem;
  line-height: 1.5;
}
```

---

### Q137. Why `.overlay[hidden] { display: none; }` when the HTML `hidden` attribute already maps to `display: none` in the UA stylesheet?

**Non-technical:** You restate “if it has hidden, do not show it,” because your own CSS already said “always flex this overlay.”

**Technical:** The UA rule is effectively `[hidden] { display: none !important }` in **some** browsers / the HTML spec allows `!important` in the **author** presentation hint… Practical cascade: the HTML spec’s *suggested* rendering is `[hidden] { display: none }`. **Author** `.overlay { display: flex }` (specificity 0,1,0) **beats** the UA `[hidden]` rule because **author origin > user-agent origin**, even when UA uses `!important`? Careful: if the UA uses `[hidden] { display: none !important }`, author normal `display: flex` **loses** to UA `!important`. Implementations differ historically; Chromium’s UA `[hidden] { display: none }` is **not** always `!important`, and the well-known bug is: **author `display` overrides `hidden`**. The HTML living standard now recommends authors who set `display` add `[hidden] { display: none !important }` or use `hidden` with an override. This project’s `.overlay[hidden] { display: none }` (0,2,0, author) restores hide when JS sets `overlayEl.hidden = true`. Without it, Idle/Pause/GameOver vs Running is broken if UA `hidden` loses (Q138–Q139). HTML starts **without** `hidden` (empty covering overlay until `reset()`).

```css
.overlay[hidden] {
  display: none;
}
```

---

### Q138. What happens if you set `.overlay { display: flex }` **without** the `[hidden]` override — does `hidden` lose to author `display`?

**Non-technical:** The dim layer can stay on the board even after the game starts. You would never see a clear snake.

**Technical:** Yes — in the common author-vs-UA case, `.overlay { display: flex }` wins over UA `[hidden] { display: none }`. `Game.setOverlay("", false)` sets `hidden = true`, the attribute is in the DOM, **but** computed `display` remains `flex`. The overlay still intercepts hits (`pointer-events` not none) and paints `rgba(..., 0.82)` over the canvas. Running state looks paused/dimmed with empty text. That is why the override exists. `hidden` also maps to `display: none` in the **user** origin only if you do not override it. `visibility: hidden` / `opacity: 0` would be a different API (`setOverlay` uses the `hidden` property). Always pair author `display` with `[hidden] { display: none }`.

```css
.overlay {
  display: flex;
}

.overlay[hidden] {
  display: none;
}
```

---

### Q139. Why is that override required specifically because you set `display: flex` on `.overlay`?

**Non-technical:** Flex is how you center the message. Flex is also what fights the browser’s hidden behavior. You need a second rule to say “flex, except when hidden.”

**Technical:** If `.overlay` did **not** set `display` (left `block` or UA default), `[hidden]` would apply `display: none` unopposed and you would **not** need the override — but then you would lose horizontal/vertical centering unless you used another centering method (`grid` on the frame, `place-items`, absolute + `translate(-50%,-50%)`). Any author `display` value (`flex`, `grid`, `block`) on a `[hidden]` element triggers the same fight. The override is required **because** you set `display: flex`, not because flex is special vs grid. Specificity 0,2,0 beats 0,1,0. Putting `!important` on `[hidden]` is the spec-recommended hammer; this sheet uses a normal declaration that is enough against `.overlay`. `display: none` in the override **does not** use `!important`; a later `.overlay { display: flex !important }` would break it again.

```css
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay[hidden] {
  display: none;
}
```

---

### Q140. Why not `opacity: 0; pointer-events: none` instead of `hidden` (would you still need `aria-hidden`)?

**Non-technical:** A transparent overlay would still be “there” for some tools. The `hidden` attribute means “not shown, not in the a11y tree” more honestly.

**Technical:** `hidden` (HTML) removes from rendering and typically from the accessibility tree. `opacity: 0` leaves the node visible to AT (unless `aria-hidden="true"` / `inert`) and still focusable if it contained a control (it does not). `pointer-events: none` lets clicks through to the canvas — canvas is not hit-testing for keys anyway (`window` keydown). Opacity would **not** need a `display` override; you would toggle a class. You **would** still want `aria-hidden="true"` when invisible because opacity-0 text can be read. `visibility: hidden` is not in the a11y tree in the same way as `display: none` in all engines — prefer `hidden`/`until-found`. JS already uses `overlayEl.hidden`; matching CSS to that API is the right glue. FOUC: overlay is **not** `hidden` in HTML, `display: flex` from first paint — empty glass until `reset()` (HTML Q60–Q64).

```css
.overlay {
  display: flex;
}

.overlay[hidden] {
  display: none;
}
```

---

### Q141. Why `.hint` is `0.78rem` muted with `margin: 0`?

**Non-technical:** The control legend is a quiet caption under the board, not another heading, and it does not add extra paragraph space on top of the 14px stack gap.

**Technical:** `p.hint` UA margin would add to `.wrap` gap (flex, no collapse) — `margin: 0` matches `.title`. `0.78rem` (~12.5px) is slightly larger than HUD labels (0.7rem) but still secondary. `--muted` on `--bg` is the contrast risk. No `<kbd>` styling — HTML is plain text with `&middot;`. `text-align` is inherited start; `.wrap` `align-items: center` centers the shrink-to-fit paragraph as a box, and a wrapping hint on a 320px screen remains left-aligned **inside** that box unless the box is full width. Hint has no `width: 100%` / `text-align: center` — on wrap, the block is as wide as the longest line and centered as a unit. Fine for one line; two lines may look slightly off-center.

```css
.hint {
  margin: 0;
  font-size: 0.78rem;
  color: var(--muted);
}
```

---

### Q142. Why `.legend` has `border-top` and `width: 100%`?

**Non-technical:** A hairline separates “how to play” from the interviewer footnote about Deque and Set. The line spans the column, not just the width of the sentence.

**Technical:** `border-top: 1px solid var(--border)` is a horizontal rule without a `<hr>`. `padding-top: 12px` plus `.wrap` `gap: 14px` plus `margin-top: 4px` is a bit of stacked spacing (4+14+12) — slightly fussy, not a bug. `width: 100%` so the rule is 620px (or full wrap), while `align-items: center` would otherwise shrink the footer to text max-content and shorten the line. `.legend p` is `text-align: center` so the paragraph still reads as a caption. On a 320px phone the footer **is** visible and uses vertical space (HTML Q77) — it can steal canvas room (Q102) but does not overlay the canvas.

```css
.legend {
  margin-top: 4px;
  border-top: 1px solid var(--border);
  padding-top: 12px;
  width: 100%;
}

.legend p {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--muted);
  text-align: center;
}
```

---

### Q143. Why `.legend strong` is recolored to `--text`?

**Non-technical:** **Deque&lt;Position&gt;** and **Set&lt;string&gt;** pop in off-white inside a grey paragraph so the data structures are the takeaway.

**Technical:** `strong` defaults to `font-weight: bold` and **inherits** `color: var(--muted)` from `.legend p`. Without the override, the DSA names would be bold muted — same grey, just heavier. `--text` restores contrast and hierarchy. HTML uses `<strong>` not `<code>`; there is no `font-family` change or `background` chip. `strong` is also an AT hint (importance), which matches “this is the interview sentence.” If you used `<code>`, you might add a panel chip; you did not.

```css
.legend p {
  color: var(--muted);
}

.legend strong {
  color: var(--text);
}
```

---

### Q144. Why is this the **only** reduced-motion rule in the whole project?

**Non-technical:** If you asked the OS to reduce motion, Restart stops fading on hover. The snake still runs.

**Technical:** The media query targets `.restart-btn { transition: none }` — the only CSS transition. There are no CSS `@keyframes`, no `scroll-behavior`, no `transform` hover. Canvas motion is **not** CSS: `requestAnimationFrame` + `tickMs: 110` in `Game`. `matchMedia('(prefers-reduced-motion: reduce)')` is never read in TypeScript. So the query is honest about CSS and **incomplete** as an a11y feature (Q145–Q146). One rule exists so a reviewer sees you know the media feature, but vestibular users still watch a 9-moves-per-second snake. Alternative: hide the query (honest zero) vs wire `tickMs` (honest help).

```css
@media (prefers-reduced-motion: reduce) {
  .restart-btn {
    transition: none;
  }
}
```

---

### Q145. What still moves for a vestibular-sensitive user (RAF loop, 110ms ticks, overlay appearing)?

**Non-technical:** The snake, the food jumps, pause glass popping in — all still happen. Only the button tint stops animating.

**Technical:** `Game.loop` schedules RAF while `Running`. Each tick (`110ms`) moves the head, maybe pops the tail, maybe respawns food (`drawCell` pop-in, no interpolation — discrete jumps every 110ms, which can still be hostile). Overlay toggle is instant `display` none↔flex — a flash of 82% dim, not a fade, but a sudden full-board change. Score text updates every eat. No CSS animation on overlay. `prefers-reduced-motion` does not pause RAF, does not `document.hidden`, does not slow `tickMs`. Interview line: reduced motion on the web is both CSS **and** JS; this project only did CSS, and only on a 150ms color tween nobody needs to reduce.

```css
@media (prefers-reduced-motion: reduce) {
  .restart-btn {
    transition: none;
  }
}
```

---

### Q146. Why not also expose a slower `tickMs` when this media query matches?

**Non-technical:** You could make the snake crawl or freeze when the user asked for less motion. You did not hook that up.

**Technical:** `window.matchMedia("(prefers-reduced-motion: reduce)")` in `main.ts` / `Game` could multiply `tickMs` (e.g. 110 → 320) or skip auto-run until a key. CSS cannot set the TS `tickMs` field. A CSS-only trick (`animation` on a dummy property JS reads) is a hack; don’t. `matchMedia.addEventListener("change", …)` would update live if the user toggles OS setting mid-game. Cost: “Snake at 3 fps” may feel broken unless the overlay explains it. Freeze (`pause()` while reduce is on) is more honest than a token `transition: none`. This is a listed demo gap — same family as no `aria-live` and no DPR.

```css
@media (prefers-reduced-motion: reduce) {
  .restart-btn {
    transition: none;
  }
}
```

---

### Q147. Why no `@media print` hiding the canvas or overlay?

**Non-technical:** Print/PDF would dump a dark rectangle, teal HUD, and maybe a dim overlay — a bad handout.

**Technical:** No `@media print`. Dark `background` on `body` eats toner; canvas prints as a bitmap (often blank or last frame depending on browser). Overlay if visible prints as a grey plate over the board. A print sheet would `body { background: #fff; color: #000 }`, ` #board, .overlay { display: none }`, and keep `.legend` (the DSA sentence is the thing worth printing). `media="print"` link is also absent in HTML. For a local demo nobody prints; it is still a completeness question. `color-adjust: exact` / `print-color-adjust` is unused — browsers may drop backgrounds anyway.

```css
body {
  background: var(--bg);
  color: var(--text);
}
```

---

### Q148. Why no container queries?

**Non-technical:** Layout reacts to the **window**, not to a nested box. There is no component that needs “when I am 300px wide, wrap the HUD.”

**Technical:** `@container` would let `.hud` wrap based on `.wrap` width even inside a weird parent. Here `.wrap` **is** essentially the viewport minus 48px, so a `@media (max-width: 400px)` is the same information. No repeating card component. Canvas scaling already uses `%` of the parent (`max-width: 100%`). Adding `container-type: inline-size` on `.wrap` plus `@container (max-width: 360px) { .hud { flex-wrap: wrap } }` would be a nicer HUD fix than viewport media if this main were later dropped into a dashboard column. Today: YAGNI, and the HUD overflow (Q115) is unsolved either way.

```css
.wrap {
  width: 100%;
  max-width: 620px;
}

.hud {
  display: flex;
  width: 100%;
}
```

---

### Q149. Why `px` for body padding (24px) and `rem` for type?

**Non-technical:** The gutter is a fixed picture-frame. The words scale if the user enlarges default font size.

**Technical:** Mixed units: `padding: 24px` / HUD `gap: 16px` / `min-width: 84px` / button `padding: 10px 18px` / overlay `padding: 24px` / radii `6px`/`8px` vs `font-size` in rem (`1.4`, `0.7`, `1.1`, `0.8`, `0.95`, `0.78`, `0.75`). Borders stay `1px` (hairlines). Mixing is common: type in rem for 1.4.4, chrome in px for a canvas that is itself pixel-sized (22px cells). Cost: 200% text zoom grows labels inside a still-84px chip and a still-nowrap HUD — overflow first. Radii in px do not scale with type (fine). A fully rem UI would grow gutters and starve the 528px board sooner. Honest: px padding + rem type is a compromise, not a token scale (`--space-3` is absent).

```css
body {
  padding: 24px;
}

.title {
  font-size: 1.4rem;
}

.hud-label {
  font-size: 0.7rem;
}

.hud-block {
  min-width: 84px;
  padding: 8px 18px;
}
```

---

### Q150. Why no CSS logical properties (`margin-inline`, `padding-block`)?

**Non-technical:** Everything is written for left-to-right, top-to-bottom English. A future Arabic UI would still pad “left/right” in physical terms, which happens to be OK for symmetric padding.

**Technical:** `padding: 24px` is already 4-sided — logical `padding: 24px` vs `padding-block`/`padding-inline` is a wash. `margin-top: 4px` on `.legend` would be `margin-block-start`. `border-top` → `border-block-start`. `letter-spacing` is physical. `text-align: center` is fine in both directions. `inset: 0` is logical-friendly already. `justify-content: center` does not depend on inline-start. The page is `lang="en"` with no RTL stylesheet. Logical properties would be a style-guide choice, not a bug fix. Canvas coordinates in TS are physical x/y anyway — CSS logical cannot flip the snake.

```css
.legend {
  margin-top: 4px;
  border-top: 1px solid var(--border);
  padding-top: 12px;
}
```

---

### Q151. Why this file is a single 168-line sheet rather than split?

**Non-technical:** One file, one `<link>`, the whole look. There is not enough CSS to justify a folder of partials.

**Technical:** 168 lines, no Sass/PostCSS, no CSS modules, no `@import` (each `@import` is extra CSSOM latency; this demo already pays seven JS module requests). Splitting `:root` / HUD / board would mean multiple round-trips or a bundler this repo refused (`tsc` only). Cascade is linear and grep-friendly for an interview walkthrough (questions are ordered by line number). Cost: no per-route code-splitting (there are no routes). A `:root` tokens file plus `game.css` would help the TS-color-drift story only if JS imported the same tokens — a split sheet alone does not. Keep one file until the chrome is a design system.

```css
:root {
  --bg: #0c0d10;
  --accent: #2dd4bf;
}

@media (prefers-reduced-motion: reduce) {
  .restart-btn {
    transition: none;
  }
}
```

---

End of Part 2 (Q89–Q151). Canvas hex lives in `src/Game.ts` and `src/Board.ts`; this sheet never reads it.
