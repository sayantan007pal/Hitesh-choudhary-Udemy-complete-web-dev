# Deep-dive answers — CSS (Q227–Q390)

Part 2 of the interview set. Source: `css/styles.css`.

Each answer has a recruiter-facing take, the browser mechanics, and a snippet from this sheet as it exists today. Pair with `index.html` (four `.skills-group`s, six `.hero-text` children, empty `#themeToggle`) and `js/main.js` (`is-waiting` is never added; `prefers-reduced-motion` is handled only in the ticker).

---

### Q227. Why a comment `/* RESET */` and two separate rules (`*, *::before, *::after` then `*`)?

**Non-technical:** The first block only changes how width is counted. The second strips the browser’s default spacing so every section starts from the same blank page.

**Technical:** `box-sizing` must apply to generated content (`::before` / `::after`) as well as real elements — the theme button’s sun/moon is a `::before`. Margin and padding do not need to be on pseudos because those properties on `::before`/`::after` are not inherited from a `*` padding reset in a useful way here; putting `margin: 0; padding: 0` on `*, *::before, *::after` would zero padding you later set on the theme `::before` if you added any. Splitting the rules is the common “box-sizing on everything, spacing only on real elements” pattern. A single combined rule would also work; this is readability, not a cascade trick. The comment is a section label in a 530-line sheet with no Sass partials.

```css
/* RESET */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}
```

---

### Q228. Why `box-sizing: border-box` on `*` **and** pseudo-elements?

**Non-technical:** Width means “the box you see,” including padding and border. Buttons and cards with padding do not overflow their grid cells.

**Technical:** Under `content-box` (the initial value), `width: 100%` plus `padding: 0.7rem` on form inputs and `padding: 1.5rem` on `.work-card` would make those boxes wider than the column. `border-box` includes padding and border in the specified width. Pseudos need the same: `.nav-bar-theme::before` is the only generated box that paints, but any future `::before` with padding would overflow without this. The universal selector does not match `::before`/`::after`; you must list them. Alternative: `html { box-sizing: border-box }` plus `*, *::before, *::after { box-sizing: inherit }` so a third-party widget can opt out with `box-sizing: content-box` on its root.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

---

### Q229. What happens if you omit `*::before, *::after` from the box-sizing rule?

**Non-technical:** Real elements stay predictable. Decorative bits created by CSS could spill out of their buttons.

**Technical:** Element boxes still use `border-box` from `*`. Pseudo-elements revert to `content-box`. Today the sun/moon `::before` has no width, padding, or border, so you would not see a bug. If you later added `padding` or a `border` on `.nav-bar-theme::before`, or a tooltip `::after` with `width: 100%`, that box would grow past the button. Skip-link, cards, and inputs would be fine. The safe fix is keeping both selectors, or the `inherit` pattern from Q228.

```css
.nav-bar-theme::before {
  content: "☀";
}
```

---

### Q230. What happens if you set `box-sizing` only on `html` and use `inherit`?

**Non-technical:** Same look, with an escape hatch if a plugin needs the old width math.

**Technical:** `html { box-sizing: border-box }` then `*, *::before, *::after { box-sizing: inherit }` is Andy Bell / “A Modern CSS Reset” style. Inheritance flows into every descendant unless a subtree sets `content-box`. This sheet hard-sets `border-box` on `*`, so a nested widget cannot opt out without another `*`-level override. For a single-author 530-line portfolio that is fine. The inherit pattern is the better default if you later embed a map or third-party form. Functionally identical on this page today.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

---

### Q231. Why `margin: 0; padding: 0` on `*`?

**Non-technical:** Browsers give headings, lists, and body their own gaps. Zeroing them lets this design own every space.

**Technical:** User-agent stylesheets give `h1`/`h2` large margins, `ul` padding-left for bullets, `body` an 8px margin, and `p` a 1em margin. Without the reset, `.work-sub { margin-top: -1rem }` would fight UA `h2` margin, `.tag-list` chips would sit inside leftover list padding, and the sticky header would not flush to the viewport. Cost: you must re-apply spacing (`h2 { margin-bottom: 1.5rem }`, `.contact-form label { margin-top: 0.75rem }`). `*` is a sledgehammer — it also zeros `input`/`button` padding, which this sheet then restores on `.btn` and form fields. A type-selector reset (`body, h1, h2, ul, p`) would be narrower.

```css
* {
  margin: 0;
  padding: 0;
}
```

---

### Q232. What happens if you remove the padding reset — which components on this page break first (lists, headings, form)?

**Non-technical:** The nav and skill chips would indent as if they were bullet lists. The form would look almost the same.

**Technical:** `ul` UA padding-left (typically 40px) returns first: `.nav-bar-menu`, `.tag-list`, and `.contact-social` all indent. Headings usually have margin more than padding, so they shift less from padding. Form controls keep UA padding (useful), so inputs would look slightly plumper until `.contact-form input` padding stacks on top. `body` 8px margin (from the margin reset still being present) is a different property — removing only padding leaves that 8px unless margin stays zero. The first visible break is nav/tags, not the form. Alternative: `ul { padding: 0 }` only on the lists you unstyle, instead of `*`.

```css
ul {
  list-style: none;
}

.nav-bar-menu {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
```

---

### Q233. Why not use a well-known reset (A modern CSS reset, normalize.css)?

**Non-technical:** A 530-line personal sheet does not need a dependency to look even. The risk is forgetting a few browser quirks.

**Technical:** This reset is two rules: border-box plus zero margin/padding. It does **not** include: `min-width: 0` on buttons (iOS), `img { height: auto }` beyond what we set per figure, `prefers-reduced-motion` from Andy Bell’s reset, `:focus-visible` (we add that later, incomplete — no `select`), or `hidden { display: none }`. `normalize.css` would preserve UA list bullets and link underlines; this design wants both gone globally. For a demo, rolling your own is honest. The gap a reviewer will name is missing reduced-motion in the reset, which neither this sheet nor a copied normalize would have added unless you chose a reset that includes it.

```css
/* RESET */
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

---

### Q234. Why didn’t you reset `min-width` on buttons/inputs (iOS)?

**Non-technical:** On a narrow iPhone, a flex row of buttons can refuse to shrink and overflow sideways.

**Technical:** Flex/grid items default to `min-width: auto`, which is the min-content size. iOS Safari is especially stubborn with `<button>` and `<input>` — they will not shrink below their intrinsic width. This page’s hero actions use `flex-wrap: wrap`, so overflow becomes a second row instead of a horizontal scroll — that hides the bug. `.contact-form button` is `justify-self: start` in a one-column grid, so it never needs to shrink. The nav has no wrap (Q317). A modern reset adds `button, input, select, textarea { min-width: 0 }` (or `min-inline-size: 0`). Honest gap: not done here; wrap is the safety net, not `min-width`.

```css
.hero-text-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}
```

---

### Q235. Why custom properties on `:root` instead of hard-coded hex in each rule?

**Non-technical:** One switch (light class) recolors the whole page. You are not hunting 40 hex codes.

**Technical:** `:root` is `html` with higher specificity than `html`. Tokens (`--ink`, `--paper`, `--signal`, type steps, `--max-w`) are read as `var(--ink)` on `body`, cards, links, and the header `color-mix`. `html.light` reassigns the same names; every consumer updates. Hard-coded `#10141f` on a new component would ignore the theme (Q249). Alternative: `@theme` in Tailwind v4, or `[data-theme="light"]` on `html`. There is no `prefers-color-scheme` override of these tokens (Q384). `color-mix` is used on the header, not at token level (Q246).

```css
:root {
  --ink: #10141f;
  --panel: #171c2a;
  --paper: #f3f1ea;
  --muted: #8a93a6;
  --signal: #e9a23b;
  --signal-dim: #c97d1e;
  --line: rgba(243, 241, 234, 0.12);
}
```

---

### Q236. Why names `--ink`, `--panel`, `--paper`, `--muted`, `--signal`, `--signal-dim`, `--line` rather than `--bg`, `--accent`?

**Non-technical:** The names describe roles in a print metaphor — ink, paper, a signal color — so light mode can swap ink and paper without renaming “background.”

**Technical:** Semantic tokens survive theme inversion: `body { background: var(--ink); color: var(--paper) }` stays correct when `--ink` becomes cream. `--bg` / `--text` would also work; `--ink`/`--paper` encode the swap more clearly. `--signal` is the accent (gold / orange); `--signal-dim` is hover. `--line` is hairline borders. `--panel` is raised surfaces (cards, ticker, inputs). `--muted` is secondary copy. A reviewer may still prefer `--color-bg` for design-system literacy. The important part is role names, not the poetry.

```css
body {
  background: var(--ink);
  color: var(--paper);
}
```

---

### Q237. Why `#10141f` / `#171c2a` / `#f3f1ea` / `#e9a23b` — how did you pick this palette?

**Non-technical:** Navy page, slightly lighter cards, cream type, gold accent — a terminal-meets-print look, not a default Bootstrap blue.

**Technical:** `#10141f` is a blue-black (not `#000`, which crushed shadows). `#171c2a` is ~4% lighter for `--panel` so cards separate without a hard shadow. `#f3f1ea` is warm off-white (not `#fff`) so gold `#e9a23b` does not vibrate. Signal is a saturated amber; light theme replaces it with `rgb(232, 85, 12)` because gold on cream fails contrast (Q250). These are hand-picked hexes, not a generated scale (no `oklch` lightness steps). Favicon SVG hard-codes the same dark hexes and does not follow `html.light`.

```css
:root {
  --ink: #10141f;
  --panel: #171c2a;
  --paper: #f3f1ea;
  --signal: #e9a23b;
}
```

---

### Q238. Why `--line` is `rgba(243, 241, 234, 0.12)` instead of a solid hex?

**Non-technical:** Borders are a faint etch of the cream ink, not a loud grey line.

**Technical:** 12% alpha of `--paper`’s RGB lets `--ink` show through, so the hairline tracks the theme’s paper color. In light mode it is reassigned to `rgba(16, 20, 31, 0.12)` — 12% of the dark “paper.” A solid `#2a3144` would not invert correctly unless you added a second token. `color-mix(in srgb, var(--paper) 12%, transparent)` would stay in sync if `--paper` changed; today’s rgba is a snapshot of the hex. Alpha borders also sit correctly on the translucent sticky header.

```css
:root {
  --line: rgba(243, 241, 234, 0.12);
}

html.light {
  --line: rgba(16, 20, 31, 0.12);
}
```

---

### Q239. What happens if you remove `--signal-dim` and the hover states that use it?

**Non-technical:** The gold “View work” / “Send message” buttons would not darken on hover. The lift animation would still run.

**Technical:** `--signal-dim` is referenced only in `.btn-primary:hover { background: var(--signal-dim) }`. Removing the token without removing the rule makes that declaration invalid (`background: var(--signal-dim)` is invalid if the variable is missing and there is no fallback). The button would keep `--signal` from `.btn-primary`. `.btn:hover { transform: translateY(-2px) }` is independent. Ghost buttons hover via `border-color: var(--signal)`, not `--signal-dim`. Light mode remaps `--signal-dim` to `#9a3412`. Alternative: `color-mix(in srgb, var(--signal) 80%, black)` and drop the extra token.

```css
.btn-primary:hover {
  background: var(--signal-dim);
}

html.light {
  --signal-dim: #9a3412;
}
```

---

### Q240. Why three font tokens `--font-display`, `--font-body`, `--font-mono` mapping to Space Grotesk, IBM Plex Sans, IBM Plex Mono?

**Non-technical:** Big names in a display face, paragraphs in a readable sans, nav/tags/ticker in monospace so it feels like a systems engineer’s site.

**Technical:** Loaded in `index.html` as Space Grotesk 500/700, IBM Plex Sans 400/500, IBM Plex Mono 400/500. `h1–h3` use `--font-display` at 700 (Space Grotesk 700 is loaded). `body` uses `--font-body`. Mono is applied to `.section-eyebrow`, `.nav-bar-menu`, `.tag-list li`, `.work-card-service`, `.btn`, ticker, form labels, contact social. Tokens let you swap families in one place. IBM Plex Sans 700 is **not** loaded — if a heading accidentally used `--font-body` at 700, the browser would synthesize bold. Fallbacks `sans-serif` / `monospace` cover font CDN failure (Q241).

```css
--font-display: "Space Grotesk", sans-serif;
--font-body: "IBM Plex Sans", sans-serif;
--font-mono: "IBM Plex Mono", monospace;
```

---

### Q241. Why quoted `"Space Grotesk"` plus `sans-serif` fallback — what happens if Google Fonts fails?

**Non-technical:** Headings still look like headings, just not the custom type. The layout does not collapse.

**Technical:** Unquoted `Space Grotesk` can be parsed as two identifiers; quotes are required because of the space. If `fonts.googleapis.com` is blocked, `@font-face` never applies and the UA uses generic `sans-serif` (or `monospace` for the third token) — typically Arial/Helvetica on macOS, which is wider than Space Grotesk, so the `h1` “Sayantan / Pal” may wrap earlier and the 42ch description measures against a different glyph width. `display=swap` in the HTML font URL already planned for FOUT. No `size-adjust` / `ascent-override` metric matching is set, so fallback will shift layout slightly.

```css
--font-display: "Space Grotesk", sans-serif;
```

---

### Q242. Why `--step-0` through `--step-3` with `clamp(min, preferred, max)` instead of `rem` only or `vw` only?

**Non-technical:** Type grows a little on a large monitor and never becomes tiny on a phone or gigantic on a TV.

**Technical:** A raw `vw` size is inaccessible when the user zooms (it can ignore text zoom in older behavior) and becomes huge on 4K. A raw `rem` is accessible but does not scale with viewport. `clamp(min, fluid, max)` floors and caps a `rem + vw` preferred value. `--step-0` is body; `--step-1` h3; `--step-2` h2; `--step-3` h1. Media queries at 600/900px do **not** retokenize type — clamp is the only type scale. User zoom still works because mins/maxes are `rem`. There is no `clamp` for spacing; section padding is a fixed `4rem 1.5rem`.

```css
--step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--step-1: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--step-2: clamp(1.75rem, 1.4rem + 1.5vw, 2.25rem);
--step-3: clamp(2.5rem, 1.9rem + 3vw, 4rem);
```

---

### Q243. Explain each argument of `clamp(2.5rem, 1.9rem + 3vw, 4rem)` — what happens at 320px vs 1440px?

**Non-technical:** The name stays at least a medium headline on a phone and stops growing once it hits a poster size.

**Technical:** `clamp(MIN, PREFERRED, MAX)`: MIN `2.5rem` (40px at 16px root), PREFERRED `1.9rem + 3vw`, MAX `4rem` (64px). At 320px: `1.9rem + 9.6px ≈ 40px`, equal to MIN, so 2.5rem. Preferred meets MAX when `1.9rem + 3vw = 4rem` → `3vw = 2.1rem` → viewport ≈ 1120px. At 1440px preferred is ~73.6px, so MAX 4rem wins. Between ~320px and ~1120px the h1 interpolates. Root font-size changes (user zoom, browser default 20px) scale both rem ends. `--step-3` is only used on `h1`.

```css
--step-3: clamp(2.5rem, 1.9rem + 3vw, 4rem);

h1 {
  font-size: var(--step-3);
}
```

---

### Q244. What happens if you replace clamp with a single `font-size: 4rem`?

**Non-technical:** On a 320px phone the two-line name would dominate the screen and likely overflow or feel like a poster.

**Technical:** 4rem is 64px at default root. Combined with `line-height: 1.1` and a `<br />` in “Sayantan / Pal”, the h1 block is ~140px tall before the description. Horizontal overflow is unlikely because two short words wrap via `<br />`, but the hero becomes top-heavy and the photo (`min(220px, 70%)`) looks small beside it. On desktop 4rem is exactly today’s cap, so 1440px would look unchanged. You would lose the fluid mid-range. `media` queries could step 2.5rem / 4rem, which is jumpy compared to clamp.

```css
h1 {
  font-size: var(--step-3);
}
```

---

### Q245. Why `--max-w: 1100px`? What happens if it is `100%` or `80ch`?

**Non-technical:** Sections stop stretching on a 27-inch monitor so lines stay readable. The nav is allowed to be full-bleed.

**Technical:** `section { max-width: var(--max-w); margin-inline: auto }` centers a 1100px column. `100%` would be the viewport minus padding — work cards in two columns would become very wide, and 42ch/50ch inner measures would sit in a sea of `--ink`. `80ch` would track the body font’s “0” width (~10px × 80 ≈ 800px with IBM Plex Sans) — tighter than 1100px, and it would change between themes only if the font changed, not if `--paper` changed. Nav and footer use `max-width: 100vw`, not `--max-w`, so they span the screen while content is capped. 1100px is a design choice for two 1fr work cards (~525px each plus gap).

```css
--max-w: 1100px;

section {
  max-width: var(--max-w);
  margin-inline: auto;
  padding: 4rem 1.5rem;
}
```

---

### Q246. Why are colors not using `oklch()` or `color-mix` at the token level (you use `color-mix` later on the header)?

**Non-technical:** The palette is a handful of hexes. Mixing is only used to make the sticky bar translucent.

**Technical:** Tokens are hex/rgb/rgba. `oklch` would make light-mode inversion a lightness flip (`L` 0.12 ↔ 0.95) with stable hue; this sheet instead hand-tunes light `--signal` to a different hue (orange vs gold). `color-mix` appears once: `background: color-mix(in srgb, var(--ink) 90%, transparent)` on `.site-header`, with **no** `@supports` fallback (Q311). Putting `color-mix` in `:root` for `--line` would avoid duplicated rgba, but older browsers would drop those tokens entirely. Hex tokens plus one progressive-enhancement mix is the conservative split — except the missing fallback makes the header mix not actually conservative.

```css
.site-header {
  background: color-mix(in srgb, var(--ink) 90%, transparent);
  backdrop-filter: blur(8px);
}
```

---

### Q247. Why invert by reassigning the same tokens rather than a second stylesheet or `[data-theme]`?

**Non-technical:** One class on `<html>` restyles the page. There is no second CSS file to cache or forget.

**Technical:** `html.light { --ink: …; --paper: …; }` overrides `:root` custom properties for the document. JS toggles `document.documentElement.classList.toggle("light")` and the head script adds `light` before paint if `localStorage.theme === "light"`. A second stylesheet (`light.css`) would duplicate rules and risk FOUC if loaded late. `[data-theme="light"]` is equivalent and slightly nicer for CSS (`html[data-theme="light"]`); this repo uses a class. There is no `dark` class — dark is the default `:root` values. No `prefers-color-scheme` media block mirrors these assignments (Q384).

```css
html.light {
  --ink: #f3f1ea;
  --panel: #e7e3d6;
  --paper: #10141f;
  --muted: #5c6578;
  --line: rgba(16, 20, 31, 0.12);
  --signal: rgb(232, 85, 12);
  --signal-dim: #9a3412;
}
```

---

### Q248. Why `--ink` becomes `#f3f1ea` and `--paper` becomes `#10141f` — what does “ink on paper” mean after inversion?

**Non-technical:** In the dark theme the “paper” is cream text on navy “ink.” In light theme those two buckets swap, so the same CSS still reads as background vs foreground.

**Technical:** `body { background: var(--ink); color: var(--paper) }` is written once. After inversion, ink is the cream page and paper is navy type — the metaphor is “the named roles swapped,” not “ink still means pigment.” `--panel` does not swap with ink; it becomes `#e7e3d6`, a darker cream card on the cream page. `--muted` is retuned rather than swapped. Skip-link uses `background: var(--signal); color: var(--ink)` — in light mode that is orange with cream type, which still works because `--ink` is now the light color (Q287). Components that treat `--ink` as “always dark” would break; none do, except the favicon which is not CSS.

```css
body {
  background: var(--ink);
  color: var(--paper);
}

html.light {
  --ink: #f3f1ea;
  --paper: #10141f;
}
```

---

### Q249. What happens if a component uses a hard-coded `#10141f` instead of `var(--ink)`?

**Non-technical:** That piece would stay navy in light mode — a dark island on a cream page.

**Technical:** Custom properties update; literals do not. This sheet is consistent for surfaces and type. Exceptions outside CSS: `assets/favicon.svg` hard-codes `#10141F` / `#F3F1EA` / `#E9A23B` and does not invert. Fall icons that are already branded (Cursor, Claude, VS Code) keep SVG fills; only `.fall-light` inverts. A future `box-shadow: 0 0 0 1px #10141f` would be a theme bug. Interview answer: tokens everywhere, and call out the favicon as the leftover literal.

```css
body {
  background: var(--ink);
  color: var(--paper);
}
```

---

### Q250. Why `--signal` becomes `rgb(232, 85, 12)` in light mode instead of keeping `#e9a23b`?

**Non-technical:** Gold on cream looks washed out. A deeper orange still reads as the same “accent” job.

**Technical:** `#e9a23b` on `#f3f1ea` is a yellow-on-cream pair — poor contrast for `.section-eyebrow`, `.nav-bar-menu-name-dim`, ticker text, and `.work-card-service`. `rgb(232, 85, 12)` is darker and redder so accent-as-text on cream passes more reasonably. Hover `--signal-dim: #9a3412` is darker still for `.btn-primary:hover`. Primary buttons use `background: var(--signal); color: var(--ink)` — light mode is orange button with cream label (`--ink` is cream). Keeping gold would mainly fail on **text** uses of `--signal`, not on the button fill. No WCAG numbers are documented in-repo (Q252).

```css
html.light {
  --signal: rgb(232, 85, 12);
  --signal-dim: #9a3412;
}
```

---

### Q251. Why `--muted` is `#5c6578` in light — contrast against `#10141f` vs dark-mode muted `#8a93a6` on `#10141f`?

**Non-technical:** Grey body copy needs to darken on a light page and stay lighter than cream on a dark page.

**Technical:** Dark: muted `#8a93a6` on background `--ink` `#10141f` (grey on navy). Muted is used as **text**, so contrast is against the **background** behind that text. Light: muted `#5c6578` on `--ink` `#f3f1ea` (slate on cream). Body/about/work copy sits on `--ink` (page) or `--panel` (cards). Dark: `#8a93a6` on `#10141f` or `#171c2a`. Light: `#5c6578` on `#f3f1ea` or `#e7e3d6`. `#8a93a6` on cream would fail contrast; that is why it is retuned. `--paper` (`#10141f` in light) is primary text, not muted. About paragraphs, `.work-card p`, `.contact-lead` all use muted.

```css
html.light {
  --muted: #5c6578;
}

.about-grid p {
  color: var(--muted);
}
```

---

### Q252. How would you check these pairs against WCAG contrast?

**Non-technical:** You run the foreground/background hexes through a checker and aim for 4.5:1 for body text, 3:1 for large type.

**Technical:** Use WebAIM Contrast Checker, Polypane, or Firefox Accessibility Inspector. Pairs to verify: `--paper` on `--ink` (body), `--muted` on `--ink` and on `--panel` (about, cards, labels), `--signal` on `--ink` (eyebrow, ticker — **text** accent), `--ink` on `--signal` (primary button and skip link). Recheck after `html.light` because `--signal` and `--muted` change. Large type (`h1` 2.5–4rem, weight 700) may pass AA at 3:1. I have not stored computed ratios in this repo — saying “I would measure muted-on-panel in both themes first” is the honest interview line. Gold `#e9a23b` as small text on navy is the dark-mode pair most likely to sit near the 4.5:1 line.

```css
.section-eyebrow {
  font-size: 0.85rem;
  color: var(--signal);
}
```

---

### Q253. Why is there no `color-scheme: light` / `dark` on `html`?

**Non-technical:** The page theme does not tell the browser how to paint native controls, scrollbars, or form autofill.

**Technical:** `color-scheme: dark` on `:root` and `color-scheme: light` on `html.light` would make scrollbars, `<input>` inner UI, and `prefers-color-scheme` for native widgets match the class. Without it, a dark page can still show a white scrollbar and a light date-picker. This sheet never sets `color-scheme`. Combined with no `prefers-color-scheme` media query, first visit is always dark tokens even if the OS is light (Q384). One-line fix: `:root { color-scheme: dark; }` and `html.light { color-scheme: light; }`.

```css
html {
  scroll-behavior: smooth;
}
```

---

### Q254. Why `scroll-behavior: smooth` on `html`?

**Non-technical:** Clicking About / Work / Skills / Contact or “View work” glides down instead of jumping.

**Technical:** Fragment navigation (`href="#about"`, `#work`, `#skills`, `#contact`, `#top`, skip link `#main`) uses CSS smooth scrolling on the scrolling root. It does not animate JS `scrollTo` unless JS also uses `behavior: "smooth"` — this repo has no scroll JS. `scroll-behavior` is inherited; putting it on `html` is the spec-recommended target for the viewport. Keyboard users and `prefers-reduced-motion` users still get the animation — **no** `@media (prefers-reduced-motion: reduce) { scroll-behavior: auto }` (Q256, Q383). Some browsers ignore smooth scroll for `prefers-reduced-motion` on their own; do not rely on that.

```css
html {
  scroll-behavior: smooth;
}
```

---

### Q255. What happens if you remove it — how do `#about` clicks behave?

**Non-technical:** The page jumps instantly to that section. Same destination, no glide.

**Technical:** Default `scroll-behavior: auto` is instant. Sticky header still overlays the target (there is no `scroll-margin-top` on `section` to offset the ~60px header — a separate gap that exists with or without smooth scroll). Skip link `#main`, logo `#top`, “View work” `#work`, and nav hashes all become jump links. Users who hate smooth scroll would prefer this. Reduced-motion users would also prefer this, which is why removing it globally is a blunt a11y fix; the precise fix is gating it behind `prefers-reduced-motion` (Q256) rather than deleting the nicety for everyone.

```css
html {
  scroll-behavior: smooth;
}
```

---

### Q256. What does smooth scrolling do for `prefers-reduced-motion` users? Is that a gap?

**Non-technical:** Yes. The OS “reduce motion” setting does not stop this page from sliding between sections.

**Technical:** CSS does not read `prefers-reduced-motion` anywhere. Smooth scroll, `@keyframes fall`, `.btn:hover { transform: translateY(-2px) }`, and the unused blink keyframes all still run. `js/main.js` **does** check `matchMedia('(prefers-reduced-motion: reduce)')`, but only to skip type/erase on the ticker — it still swaps lines every 3s. Honest gap: add

`@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } .fall-icon, .btn:hover { animation: none; transform: none; } }`.

That is the first CSS fix a reviewer will demand.

```css
html {
  scroll-behavior: smooth;
}

.btn:hover {
  transform: translateY(-2px);
}
```

---

### Q257. Why `background` and `color` on `body` use `var(--ink)` and `var(--paper)`?

**Non-technical:** The whole page canvas and default text follow the theme tokens, including the area beside the 1100px column.

**Technical:** `body` fills the viewport; `section` max-width does not paint the side gutters — those gutters are `body`’s `--ink`. Text `color` inherits into headings (unless overridden), paragraphs, and links (`a { color: inherit }`). `html` itself has no background; if the page overscrolls, some engines show `html`/`canvas` default white unless `body` or `html` is painted — setting both on `html` and `body` is sometimes used to avoid overscroll flash; here only `body` is set. Light mode swaps the two variables, so the assignment stays correct (Q248).

```css
body {
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-body);
}
```

---

### Q258. Why `font-size: var(--step-0)` on body rather than the browser default 16px?

**Non-technical:** Body copy is slightly fluid: about 16px on a phone, up to 18px on a wide screen.

**Technical:** `--step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` is 16–18px at a 16px root. Default UA `body` is `16px` (medium). Using the token keeps the type scale in one place and lets `rem` children (`0.75rem` nav, `0.85rem` eyebrow) resolve against the root, **not** against this body size — `rem` is root em. `em` on children would compound off 1.125rem at max. Headings use their own `--step-n` and ignore body size. If you omitted this, body would be 16px always and the clamp scale would only affect headings.

```css
body {
  font-size: var(--step-0);
  line-height: 1.6;
}
```

---

### Q259. Why `line-height: 1.6` — unitless? What happens with `line-height: 16px`?

**Non-technical:** Paragraphs get comfortable spacing that grows with the text. Headings use a tighter number so the name does not look double-spaced.

**Technical:** Unitless `1.6` is a multiplier of the element’s own font-size and **inherits as a factor**, not a computed px. Children with larger type still get 1.6× their size unless they override (`h1,h2,h3 { line-height: 1.1 }`). `line-height: 16px` would inherit **16px** to the h1 (4rem type on 16px line box) — catastrophic clipping. `line-height: 1.6rem` would also inherit a fixed used value. Unitless is the correct inheritance model. 1.6 is a bit loose for UI chrome; nav uses the heading/button `line-height: 1` on the theme button only.

```css
body {
  line-height: 1.6;
}

h1,
h2,
h3 {
  line-height: 1.1;
}
```

---

### Q260. Why `-webkit-font-smoothing: antialiased`? What happens on macOS vs Windows if you remove it?

**Non-technical:** On Macs the type looks a touch thinner and sharper on dark navy. Windows mostly ignores this.

**Technical:** macOS default subpixel antialiasing (`-webkit-font-smoothing: auto`) on light-on-dark can look heavy/blurry. `antialiased` forces grayscale smoothing, thinning glyphs — a common dark-UI trick. Light theme keeps the same declaration, so cream-page text is also grayscale-smoothed (slightly lighter than Mac default). Windows / non-WebKit: the property is ignored; ClearType is unchanged. Removing it: macOS dark theme looks a bit bolder. There is no `moz-osx-font-smoothing: grayscale` (Firefox macOS companion); only the WebKit prefix is set.

```css
body {
  -webkit-font-smoothing: antialiased;
}
```

---

### Q261. Why no `text-rendering` or `font-feature-settings`?

**Non-technical:** You did not turn on fancy ligatures or kerning experiments. The fonts render with browser defaults.

**Technical:** `text-rendering: optimizeLegibility` can enable kerning/ligatures at a small layout cost; `optimizeSpeed` disables them. IBM Plex / Space Grotesk defaults are already fine for a portfolio. `font-feature-settings: "ss01"` etc. would pick stylistic sets this design does not need. `font-kerning: normal` is default in modern engines. Honest: omitted for simplicity, not because they conflict. If headings looked uneven, `optimizeLegibility` on `h1,h2,h3` would be the first knob. `font-variant-numeric: tabular-nums` on the ticker could also be a later polish for the pipeline strings.

```css
h1,
h2,
h3 {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.01em;
}
```

---

### Q262. Why `img, svg { display: block; max-width: 100%; }`?

**Non-technical:** Pictures never stick out of their column, and they do not sit on a mysterious blank stripe.

**Technical:** Images are replaced inline elements; `display: block` removes the baseline gap (Q263). `max-width: 100%` constrains the 800×800 hero photo and any SVG to the parent. Height is not set here; `.hero-text-visual img` adds `height: auto` plus `aspect-ratio: 1`. Fall SVGs are `width: 1.5rem` with no height — `max-width: 100%` does not shrink them because 1.5rem is already small. `svg { display: block }` also applies to those icons. `max-width` on SVG can interact badly with some sprites; here it is harmless.

```css
img,
svg {
  display: block;
  max-width: 100%;
}
```

---

### Q263. What extra gap appears under images if you remove `display: block`?

**Non-technical:** A few pixels of leftover space under the portrait, like the photo is sitting on a text line.

**Technical:** Inline replaced elements sit on the text baseline. Descender space (~3–5px depending on `line-height`) shows the `body` background under the image — the classic “mystery gap.” `vertical-align: middle` also kills it; `block` is the usual reset. The hero `figure` would show a sliver of `--ink` between the photo’s bottom border and the ticker. Fall icons are `position: absolute`, so baseline gap would not matter for them.

```css
img,
svg {
  display: block;
}
```

---

### Q264. What happens if `max-width: 100%` is removed on a 800px-wide photo inside a narrow column?

**Non-technical:** On a phone the portrait could be 800px wide and force horizontal scrolling.

**Technical:** HTML `width="800"` is the layout hint; CSS `.hero-text-visual img { width: 100% }` still stretches/shrinks to the figure. The figure is `width: min(220px, 70%)` on small screens, so the img’s `width: 100%` already constrains it — **this particular photo would still be OK** because of the more specific rule. `max-width: 100%` is the global safety net for any future `<img>` without a wrapper width. Removing it is a latent overflow, not a current hero bug. Keep both: wrapper width + global max-width.

```css
.hero-text-visual {
  width: min(220px, 70%);
}

.hero-text-visual img {
  width: 100%;
  height: auto;
}
```

---

### Q265. Why `ul { list-style: none; }` globally rather than only on `.nav-bar-menu` and `.tag-list`?

**Non-technical:** No bullets anywhere — nav, chips, social links all look designed.

**Technical:** Global `ul { list-style: none }` also removes list markers for accessibility in some older Safari versions unless you restore `list-style` or set `role="list"` — VoiceOver historically dropped list semantics when `list-style: none` was applied. Modern VoiceOver is better; the advice is still to add `list-style-type: ""` or `role="list"` if you care. Scoping to `.nav-bar-menu, .tag-list, .contact-social` would leave a future prose `<ul>` with bullets (Q266). This demo has no bulleted content lists, so the global rule matches the current HTML.

```css
ul {
  list-style: none;
}
```

---

### Q266. What happens to a future content list that should show bullets?

**Non-technical:** You would write a list and get no bullets, then think HTML was broken.

**Technical:** The author must add `.prose ul { list-style: disc; padding-left: 1.25rem }` (padding was also zeroed by `*`). Until then, About copy cannot grow a “tools I use” bullet list without looking like stacked paragraphs. Screen-reader list semantics can also weaken when `list-style: none` is global (Q265). Interview take: global unstyled lists are a prototype shortcut; a real content site should unstyle only `.nav-bar-menu`, `.tag-list`, and `.contact-social`. That scoped reset is a five-line change if a blog post is added later.

```css
ul {
  list-style: none;
}

* {
  margin: 0;
  padding: 0;
}
```

---

### Q267. Why `a { color: inherit; text-decoration: none; }` globally?

**Non-technical:** Links look like the surrounding text until a component paints them. Nothing is underlined by default.

**Technical:** `color: inherit` lets nav items be `--paper` (from body) while `.nav-bar-menu-name-dim` and Contact are `--signal`. Social links then set `color: var(--muted)` / hover `--signal`. `text-decoration: none` removes the underline affordance site-wide (Q268). `:focus-visible` still draws a gold outline, so keyboard users get a cue. Primary/ghost buttons are links with button chrome. Visited state is not styled (`:visited` would be ignored for `color: inherit` in practice because inherit recomputes). Alternative: underline only `.contact-social a` and leave nav clean.

```css
a {
  color: inherit;
  text-decoration: none;
}
```

---

### Q268. What happens to visited/unvisited distinction and to underline affordance on social links?

**Non-technical:** You cannot tell which GitHub/LinkedIn/LeetCode links you have already opened, and they do not look like links until hover.

**Technical:** UA `:visited` purple is overridden by `color: inherit`. Hover on `.contact-social a:hover { color: var(--signal) }` is the only affordance besides cursor. WCAG 1.4.1 Color is a concern if hover is the only difference — keyboard focus outline compensates when tabbing. Mouse users on a touch laptop may never see hover. Restoring `text-decoration: underline` on `.contact-social a` would be the smallest fix without changing the nav. `a:visited { opacity: 0.8 }` is a weak extra cue if you insist on no underline.

```css
.contact-social a {
  color: var(--muted);
}

.contact-social a:hover {
  color: var(--signal);
}
```

---

### Q269. Why headings share `font-family: var(--font-display)`, `font-weight: 700`, `line-height: 1.1`, `letter-spacing: -0.01em`?

**Non-technical:** Every title uses the same tight display face so the page feels like one identity.

**Technical:** Shared rule for `h1,h2,h3` then size/margin per level. 700 maps to Space Grotesk 700 (loaded). `letter-spacing: -0.01em` slightly tightens display type. `line-height: 1.1` is aggressive for wrapped h1 with `<br />` (Q270). `h3` inside cards (“SelectPrism Platform Architecture”) inherits this display face, while `.skills-group h3` overrides family to mono uppercase. No `h4–h6` (Q272). If Google Fonts fails, `sans-serif` 700 is used (often synthetic or Arial Bold).

```css
h1,
h2,
h3 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.01em;
}
```

---

### Q270. What happens if `line-height: 1.1` causes descender clipping on `h1` with a `<br />`?

**Non-technical:** The tail of a “y” or the bottom of “Pal” could get clipped if a browser’s font metrics overflow the line box.

**Technical:** Space Grotesk 700 at `--step-3` with 1.1 line-height leaves little room for descenders. “Sayantan” / “Pal” has no descenders (P, a, l) — **this particular name is safe**. “Sayantan” has none; a future “Typography” headline could clip with `overflow: hidden` on a parent (none here). `.nav-bar-theme { max-height: 1.2em; overflow: hidden }` **does** clip the emoji, not the h1. Fix if needed: `h1 { line-height: 1.15; }` or `padding-bottom: 0.05em`. The `<br />` creates two line boxes, each 1.1em tall.

```css
h1,
h2,
h3 {
  line-height: 1.1;
}
```

---

### Q271. Why `h1` uses `--step-3`, `h2` `--step-2` with `margin-bottom: 1.5rem`, `h3` `--step-1` with `0.5rem`?

**Non-technical:** One page title is huge, section titles are large with space under them, card titles are smaller and sit close to the body copy.

**Technical:** Modular scale via clamp tokens. `h1` has no extra margin (eyebrow above has `margin-bottom: 0.75rem`; description has `margin-top: 1rem`). `h2`’s 1.5rem gap is what `.work-sub { margin-top: -1rem }` pulls against (Q362). `h3` 0.5rem sits above tag lists or card paragraphs. `.skills-group h3` keeps the 0.5rem and restyles color/family. There is only one `h1` (the name). Two `h2` work sections plus about, skills, contact.

```css
h1 {
  font-size: var(--step-3);
}

h2 {
  font-size: var(--step-2);
  margin-bottom: 1.5rem;
}

h3 {
  font-size: var(--step-1);
  margin-bottom: 0.5rem;
}
```

---

### Q272. Why no `h4–h6` rules?

**Non-technical:** The HTML never uses those tags, so styling them would be unused CSS.

**Technical:** Outline is `h1` (hero) → `h2` (section) → `h3` (skill group / card title). No `h4` exists in `index.html`. If someone pastes an `h4` in a card, it would be UA default (Times/serif, bold, ~1.33em in some browsers) — visibly broken next to Space Grotesk `h3`s. You could add `h4,h5,h6` to the shared display rule with `--step-0`. Honest: YAGNI for this HTML, fragile if content grows. A documenter adding a nested “Responsibilities” heading would hit this first.

```css
h1,
h2,
h3 {
  font-family: var(--font-display);
  font-weight: 700;
}
```

---

### Q273. Why `:focus-visible` on `a, button, input, textarea` and not `:focus`?

**Non-technical:** Keyboard users see a gold ring. Mouse users clicking “View work” do not keep a ring stuck on the button.

**Technical:** `:focus` matches mouse click, tap, and keyboard. `:focus-visible` matches the UA’s “focus should be obvious” heuristic — generally keyboard. Exception on this page: `.skip-link:focus` uses `:focus` on purpose so the first Tab always reveals it (Q285). `:focus-visible` is supported in all current evergreen browsers; IE11 would get no outline (this demo does not target IE). Missing `select` (Q277). Do not combine with `outline: none` on `:focus`.

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
}
```

---

### Q274. What happens if you use `:focus` instead — mouse users see outlines on every click?

**Non-technical:** Yes — every click on a nav link or button would flash the gold ring, which some designers hate.

**Technical:** `:focus` on `.btn` after a mouse click keeps the outline until blur. That is not an accessibility bug; it is extra chrome. `:focus-visible` is the modern compromise. Safari delayed `:focus-visible` relative to Chrome; it is fine in 2026. The skip link **must** stay `:focus` (or also match `:focus-visible`) to move on-screen; if it were only `:focus-visible` it would still work for Tab, which is how skip links are used.

```css
.skip-link:focus {
  left: 1rem;
  top: 1rem;
}
```

---

### Q275. Why `outline: 2px solid var(--signal)` and `outline-offset: 3px` instead of `outline: none` plus a box-shadow?

**Non-technical:** A gold halo sits a few pixels off the shape and does not eat into the button fill.

**Technical:** `outline` does not affect layout; `box-shadow` also does not. Offset `3px` avoids covering the 6px radius border. `outline` follows the border-box and can look square-ish on rounded buttons in some engines (recent browsers follow `border-radius` for outlines). A `box-shadow: 0 0 0 3px var(--signal)` is the usual workaround for older radius bugs. `outline` is easier to disable with `outline: none` accidentally; using it as the actual focus style is the right default. Contrast: `--signal` on `--ink` in dark mode; recheck in light (orange on cream around an orange button could be weak — offset helps by showing ink/paper between ring and fill).

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
}
```

---

### Q276. What happens if you `outline: none` with no replacement?

**Non-technical:** Keyboard users cannot see where they are. That is a fail.

**Technical:** WCAG 2.4.7 Focus Visible. Tabbing through nav, theme button, skip link, form fields, and socials would show only the browser’s weak remaining cues (or nothing if you also killed UA outline). Mouse users would be fine. Never `outline: none` without `:focus-visible { outline | box-shadow }`. This sheet does not remove outlines; it restyles them. Some component libraries still ship `outline: none` on `.btn:focus` — a reviewer may ask you to confirm you did not copy that. You did not.

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
}
```

---

### Q277. Why isn’t `select` included?

**Non-technical:** There is no dropdown on the page, so the selector list matches the HTML.

**Technical:** `:focus-visible` is listed for `a, button, input, textarea` — the focusable types in `index.html`. There is no `<select>`, `<summary>`, or `tabindex` on cards. A future country `<select>` would get the UA outline (not gold/offset). There is no `:focusable` selector; people list `a, button, input, select, textarea, [tabindex]`. Honest gap if the form grows. Matching the HTML today is fine; forgetting to extend the list when you add a control is the failure mode.

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
}
```

---

### Q278. Why every `section` gets `max-width: var(--max-w)`, `margin-inline: auto`, `padding: 4rem 1.5rem`?

**Non-technical:** Hero, about, skills, work, projects, and contact share one centered column and the same breathing room.

**Technical:** One element selector styles all six sections (hero, about, skills, two `.work`, contact). `margin-inline: auto` is the only logical property in the sheet (Q279, Q389). Horizontal `1.5rem` padding is the anti-edge gutter at 320px (Q281). Vertical `4rem` is overridden on `.hero` with the same 4rem then 5rem at 900px — hero padding stacks with section padding because `.hero { padding-top/bottom: 4rem }` is more specific for those longhands and replaces the vertical part of the shorthand… **Careful:** `.hero` sets `padding-top` and `padding-bottom` only, so `padding-left/right: 1.5rem` from `section` remain. `max-width` 1100px does not apply to header/footer.

```css
section {
  max-width: var(--max-w);
  margin-inline: auto;
  padding: 4rem 1.5rem;
}
```

---

### Q279. Why `margin-inline` instead of `margin-left` / `margin-right`?

**Non-technical:** The column stays centered if the page were ever right-to-left.

**Technical:** `margin-inline: auto` maps to left+right in `ltr` and right+left in `rtl`. `lang="en"` is LTR, so it is equivalent to `margin-left/right: auto`. It is the only logical property; padding still uses physical `padding: 4rem 1.5rem` and nav uses physical `left: -999px` (Q389). Using one logical property is slightly inconsistent, but it is the correct property for centering. `margin: 0 auto` would also center but would reset vertical margins (already 0 from reset).

```css
section {
  margin-inline: auto;
}
```

---

### Q280. What happens if a section needs full-bleed (the fall icons are outside section — good or accidental)?

**Non-technical:** The falling logos cover the whole window, including the side gutters, while text stays in the 1100px column. That is the right split.

**Technical:** `.fall` is a sibling of `header`/`main`/`footer`, `position: fixed; inset: 0`, so it is full viewport by construction — not a section. If you put a full-bleed band *inside* `main`, `section { max-width: 1100px }` would prevent it; you would need a breakout (`width: 100vw; margin-inline: calc(50% - 50vw)`) or move the band outside `section`. Accidental? The HTML author placed `.fall` outside `main` on purpose for stacking (`z-index: 0` vs `main { z-index: 1 }`). Good.

```css
.fall {
  position: fixed;
  inset: 0;
  z-index: 0;
}

section {
  max-width: var(--max-w);
  margin-inline: auto;
}
```

---

### Q281. Why `1.5rem` horizontal padding — what happens at 320px width?

**Non-technical:** Text does not kiss the screen edge on a small phone.

**Technical:** 320px − 24px − 24px = 272px content (~17rem). `42ch` description is ~42 × glyph width; at 16px IBM Plex that is ~336px, so `max-width: 42ch` is larger than 272px and the used width becomes 272px — the ch cap only bites on wider screens. Nav uses `padding: 20px` (not 1.5rem) so header gutter is 20px vs section 24px — a 4px mismatch (Q388). 1.5rem is a reasonable minimum; 1rem would still work; 0 would clip cards’ padding visually into the edge.

```css
section {
  padding: 4rem 1.5rem;
}
```

---

### Q282. Why `position: absolute; left: -999px` instead of `clip` / `clip-path` / visually-hidden class?

**Non-technical:** “Skip to content” is off-screen until you Tab, then it pops in at the top-left.

**Technical:** `-999px` (or `-9999px`) is the old “park it off-canvas” trick. It still takes layout in some engines, can cause overflow/scrollbars if a parent is not `overflow: hidden`, and can be announced oddly. The modern pattern is `.visually-hidden { clip-path: inset(50%); width: 1px; height: 1px; overflow: hidden; white-space: nowrap; position: absolute }`. `display: none` is worse (Q283). This page parks at `left: -999px; top: 0; z-index: 100`. Honest gap: not clip-path; 999px is also closer than 9999px — a very wide element could peek. The skip link is short (“Skip to content”), so it stays off-screen.

```css
.skip-link {
  position: absolute;
  left: -999px;
  top: 0;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: var(--signal);
  color: var(--ink);
}
```

---

### Q283. What happens if you use `display: none` until focus?

**Non-technical:** Keyboard users would never land on it. The skip link would not exist for Tab.

**Technical:** `display: none` (and `visibility: hidden`, or the `hidden` attribute) removes the element from the accessibility tree and from sequential focus navigation. `:focus` can never match an unfocusable node, so `.skip-link:focus { display: block }` is a classic trap that does not work — you cannot focus a `display: none` element in order to reveal it. Off-screen positioning (`left: -999px`) keeps it in tab order. `aria-hidden="true"` would be equally wrong. This is why clip-path / visually-hidden is the modern replacement, not `display` toggling.

```css
.skip-link:focus {
  left: 1rem;
  top: 1rem;
}
```

---

### Q284. Why `z-index: 100` vs header `50` and fall `0`?

**Non-technical:** When it appears, it must sit on top of the sticky nav and the falling icons, not under them.

**Technical:** Stacking: `.fall` 0, `main` 1, `.site-footer` 1, `.site-header` 50, `.skip-link` 100. Skip is a sibling before the header in the DOM; without a higher z-index, the sticky header (50) would cover the focused skip link at `top: 1rem`. 100 vs 50 is the whole point. Fall icons at 0 cannot cover it. No stacking context on `body` besides these positioned descendants. Inflating to 9999 is unnecessary here.

```css
.skip-link {
  z-index: 100;
}

.site-header {
  z-index: 50;
}

.fall {
  z-index: 0;
}
```

---

### Q285. Why `:focus` (not `:focus-visible`) to bring it on-screen at `left: 1rem; top: 1rem`?

**Non-technical:** The first Tab must always reveal the control, however the browser classifies that focus.

**Technical:** Skip links are only useful when focused from the keyboard; `:focus-visible` would also work in current browsers. `:focus` is the conservative choice so programatic `.focus()` and older heuristics still show it. Mouse users almost never click it (it is off-screen). Positioning `left: 1rem; top: 1rem` places it just below the top edge, overlapping the sticky header region — z-index 100 keeps it clickable. Padding and signal fill make a visible chip.

```css
.skip-link:focus {
  left: 1rem;
  top: 1rem;
}
```

---

### Q286. What happens if a keyboard user tabs away — does it go back to `-999px`?

**Non-technical:** Yes. It disappears again as soon as focus leaves.

**Technical:** `.skip-link:focus` is the only rule that sets `left: 1rem`. On blur, that rule no longer matches and `left` returns to `-999px` from `.skip-link`. No JS is involved. Tab order is skip → (fall SVGs are not focusable) → nav name link → About/Work/Skills/Contact → theme button → main. After skip, the next Tab is the name link; the skip chip slides away before you activate it unless you press Enter while it is focused. That is correct skip-link behavior.

```css
.skip-link {
  left: -999px;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
}
```

---

### Q287. Why background `var(--signal)` and color `var(--ink)` — contrast in both themes?

**Non-technical:** It looks like a highlighter sticker: gold (or orange) with dark-or-cream type depending on theme.

**Technical:** Dark: `#e9a23b` background, `#10141f` text — dark navy on gold, generally strong. Light: `rgb(232, 85, 12)` background, `--ink` `#f3f1ea` text — cream on deep orange, also intended to pass. If someone assumed `--ink` always means dark type, light mode would look wrong; here `--ink` is the page fill, so using it as text on a signal chip is “the other side of the paper/ink swap” and happens to work. Primary buttons use the same pair.

```css
.skip-link {
  background: var(--signal);
  color: var(--ink);
}
```

---

### Q288. Why `.fall` is `position: fixed; inset: 0; z-index: 0`?

**Non-technical:** The icons rain over the whole window and stay put while you scroll the résumé.

**Technical:** `fixed` + `inset: 0` = viewport-sized containing block for absolutely positioned `.fall-icon`s. `z-index: 0` puts the layer under `main` (1) and header (50). Icons therefore pass *behind* type and nav, which is the intended wallpaper effect. `fixed` means scrolling the page does not scroll the rain — they keep falling relative to the screen. If this were `absolute` on `body`, a tall page would require `.fall` to be as tall as the document or the rain would only cover the first viewport.

```css
.fall {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
```

---

### Q289. Why `overflow: hidden`?

**Non-technical:** You never get a scrollbar from an icon sitting just above or below the screen.

**Technical:** Icons start at `top: -3rem` and animate to `translateY(110vh)`. Without `overflow: hidden` on `.fall`, the overflow of a `fixed` box can still paint (fixed overflow is visible by default) and might extend the scrollable overflow of the document in some browsers. Clipping keeps the animation inside the viewport rectangle. It also clips horizontally if `--x` were `110%`. Combined with `pointer-events: none`, the layer is visually present and inert.

```css
.fall {
  overflow: hidden;
}
```

---

### Q290. Why `pointer-events: none`? What happens if you remove it — can you click nav through the icons?

**Non-technical:** Clicks pass through the rain onto the nav and buttons. Remove it and you would click an invisible SVG instead of “About.”

**Technical:** Six full-viewport- overlapping hit targets (SVGs are not `aria-hidden` in HTML either). Without `pointer-events: none`, the SVG boxes — even at opacity 0.45 and moving — intercept clicks/taps whenever they overlap the header or a button. `fixed` covering `inset: 0` makes the **container** the hit target too unless events are disabled on `.fall`. Disabling on the parent disables children. Keyboard: SVGs are not focusable by default, so tab order is OK either way. Always keep this.

```css
.fall {
  pointer-events: none;
}
```

---

### Q291. Why `main { position: relative; z-index: 1; }` — stacking context vs `.fall`?

**Non-technical:** All of the real content is lifted one layer above the wallpaper.

**Technical:** `z-index` only applies to positioned elements (and flex/grid items). `main` is `position: relative` so `z-index: 1` creates a stacking context above `.fall`’s 0. Header is a sibling with 50, so nav stays above main too (sticky over hero). Footer is *outside* `main` and gets its own `z-index: 1` (Q379). Without this, in-flow `main` paints as non-positioned content; a positioned `z-index: 0` sibling (`.fall`) can paint **on top** of that in-flow content depending on paint order — icons over type. The relative+1 pair is load-bearing.

```css
main {
  position: relative;
  z-index: 1;
}
```

---

### Q292. What happens if you remove `z-index` from `main`?

**Non-technical:** Falling logos could slide across the name, cards, and form — the wallpaper would win.

**Technical:** If you leave `position: relative` but drop `z-index`, `main` is positioned with `auto` (same stacking band as `.fall`’s 0). Tree order: `.fall` comes first, `header` next, `main` later — later siblings with auto often paint on top of earlier z-index 0, so it *might* still win. If you drop both `position` and `z-index`, `main` is in-flow non-positioned and `.fall` (positioned, z-index 0) paints after in-flow blocks in the stacking algorithm — icons over content. That is the failure mode. Keep `position: relative; z-index: 1`.

```css
main {
  position: relative;
  z-index: 1;
}
```

---

### Q293. Why `.fall-icon` is `position: absolute; left: var(--x); top: -3rem`?

**Non-technical:** Each logo is parked just above the screen at a horizontal percent set in HTML (`8%`, `22%`, …).

**Technical:** Absolute inside `.fall` (the fixed containing block). `--x` is an inline style on each SVG (`--x: 8%`, `22%`, `38%`, `54%`, `70%`, `86%`). `top: -3rem` hides the 1.5rem-wide icon above the clip edge before `translateY` starts (Q294). Horizontal position is physical `left`, not `inset-inline-start`. Animation then translates in Y; `left` stays constant so they fall straight down. If `--x` is missing, `left: var(--x)` is invalid at computed-value time and `left` falls back to `auto` (icon may stack at the origin). HTML currently always sets `--x`.

```css
.fall-icon {
  position: absolute;
  left: var(--x);
  top: -3rem;
  width: 1.5rem;
  animation: fall var(--t) var(--d) linear infinite;
}
```

---

### Q294. What happens if `top` is `0` instead of `-3rem`?

**Non-technical:** Each icon would pop into existence already on the screen, then fall. You would see a flash at the top edge.

**Technical:** Keyframes start at `translateY(0)` and `opacity: 0`, so at `top: 0` the icon is in-viewport but invisible, then fades in while moving down. That is acceptable. `-3rem` gives a runway so the 1.5rem graphic plus opacity ramp happen partly off-screen; combined with `overflow: hidden`, you never see a clipped half-icon stuck to `top: 0` if opacity were 1 at from. Opacity 0 at `from` already hides the flash; `-3rem` is extra polish.

```css
.fall-icon {
  top: -3rem;
}
```

---

### Q295. Why `width: 1.5rem` with no height (viewBox handles aspect)?

**Non-technical:** Every falling logo is the same small size. Taller or squarer sprites still look like icons, not banners.

**Technical:** SVG with only `width` and a `viewBox` computes height from the aspect ratio. Most sprites are `0 0 24 24` (square → 1.5rem × 1.5rem). VS Code is `viewBox="0 0 100 100"` — also square, same used size. If a symbol were 24×12, height would be 0.75rem. `height: auto` is implicit. Global `svg { max-width: 100% }` does not change 1.5rem. `display: block` removes inline gaps.

```css
.fall-icon {
  width: 1.5rem;
}
```

---

### Q296. Why `animation: fall var(--t) var(--d) linear infinite`?

**Non-technical:** Each icon falls at its own speed and start time, forever, in a straight un-eased drop.

**Technical:** Shorthand: name `fall`, duration `--t` (14s–18s inline), delay `--d` (0s–11s), timing `linear`, iteration `infinite`. Fill-mode is none (default). After one cycle the icon jumps back to `from` (off-screen, opacity 0) because there is no `forwards` and the `to` state is not kept between loops — with `infinite` it immediately restarts. Missing `--t`/`--d` (Q297). No `prefers-reduced-motion` disable (Q306). Six of these run at all times.

```css
.fall-icon {
  animation: fall var(--t) var(--d) linear infinite;
}
```

---

### Q297. What happens if `--t` or `--d` is invalid/missing?

**Non-technical:** That icon would not fall, or all icons would start together.

**Technical:** If `var(--t)` is invalid/missing, the `animation` shorthand is invalid at computed-value time (whole shorthand dropped unless a fallback is provided: `var(--t, 16s)`). No animation — icon sits at `top: -3rem`, clipped, invisible. If only `--d` is missing, same: shorthand invalid, no animation. HTML currently sets both on every SVG. A typo `--t: 14` without `s` is invalid and kills that icon’s animation. Fallback in CSS would make HTML optional.

```css
.fall-icon {
  animation: fall var(--t) var(--d) linear infinite;
}
```

---

### Q298. Why `linear` not `ease-in`?

**Non-technical:** Rain at constant speed feels like a ticker, not a bouncing ball.

**Technical:** `ease-in` would start slow and accelerate — more “physically dropped.” `linear` keeps `translateY` and the opacity hold at 12%/80% evenly spaced in time. Opacity is keyframed independently of easing; easing still affects when those percentage points are reached. `ease-in` would spend longer near the top (where opacity ramps 0→0.45), making icons linger in the header band. Linear is cheaper to reason about with staggered `--t` values (14s–18s). Neither timing function is meaningfully heavier on the GPU; the choice is visual, not performance.

```css
animation: fall var(--t) var(--d) linear infinite;
```

---

### Q299. Why `infinite` — performance cost of six infinite animations?

**Non-technical:** The wallpaper never stops. Six small logos moving is cheap on a laptop; it is not free on a phone battery.

**Technical:** Each animation is `transform` + `opacity` — both compositor-friendly. Six layers is a small paint cost. `infinite` means they never sleep, including off-screen tabs unless the browser throttles (often they do). No `will-change` (Q305). No pause on `document.hidden`. Combined with the JS ticker intervals, the page is never fully idle. `prefers-reduced-motion` should set `animation: none` (Q306) — not done. For a demo, six icons is acceptable; a reviewer may still ask you to pause when the tab is hidden.

```css
.fall-icon {
  animation: fall var(--t) var(--d) linear infinite;
}
```

---

### Q300. Why `html.light .fall-light { filter: invert(1); }` instead of swapping SVG fills?

**Non-technical:** White logos would vanish on a cream page. Flipping them to black keeps the silhouettes.

**Technical:** OpenAI, Ollama, and Kimi paths are white (`fill="#FFFFFF"` in the sprite) and carry `.fall-light` in HTML. `filter: invert(1)` turns white to black. Brand-colored icons (Cursor greys, Claude orange, VS Code blues) do **not** have `.fall-light` and stay as-is — invert would wreck the brand colors (Q301). Swapping fills would need either duplicate sprites, `currentColor`, or JS. Filter is a one-liner and only targets the white-filled set. Invert is not theme-token aware; it is a bitmap-style filter on the SVG box.

```css
html.light .fall-light {
  filter: invert(1);
}
```

---

### Q301. What happens to already-colored icons (Cursor greys, Claude orange, VS Code blues) if they had `fall-light`?

**Non-technical:** They would look like photo negatives — orange Claude would go cyan, VS Code blues would go yellow.

**Technical:** `invert(1)` inverts each RGB channel. Orange Claude ≈ complementary cyan; VS Code blues ≈ yellow; greys stay grey-ish. That is why HTML only puts `.fall-light` on openai, ollama, and kimi (white-filled sprites). Adding the class “for consistency” would be a visual bug in light theme. A better long-term approach is `fill="currentColor"` plus `color: var(--paper)` so all six follow the theme without invert, including brand marks restyled as silhouettes.

```css
html.light .fall-light {
  filter: invert(1);
}
```

---

### Q302. Why `@keyframes fall` goes `translateY(0)` → `translateY(110vh)` with opacity 0 → 0.45 → 0?

**Non-technical:** A logo fades in, drifts down as a ghost, fades out before the bottom, then repeats.

**Technical:** `from`/`to` plus a mid hold. Transform-only travel is compositor-friendly; `top` is not animated (animating `top` would trigger layout). 0.45 opacity keeps them behind type without competing with `--paper`. They never reach full opacity. `110vh` (Q304) sends them past the bottom so the fade-out happens off the fold. Opacity 0 at both ends hides the jump when `infinite` restarts at `from`. No `rotate` or `translateX` — a straight fall reads as wallpaper, not a particle toy.

```css
@keyframes fall {
  from {
    transform: translateY(0);
    opacity: 0;
  }
  12%,
  80% {
    opacity: 0.45;
  }
  to {
    transform: translateY(110vh);
    opacity: 0;
  }
}
```

---

### Q303. Why `12%, 80% { opacity: 0.45 }` — what does the hold do?

**Non-technical:** Most of the trip the icon stays equally see-through. Only the start and end fade.

**Technical:** One keyframe block for two offsets is a plateau: from 12% to 80% opacity stays 0.45. Fade-in occupies 0–12% of `--t`; fade-out 80–100%. For a 16s duration that is ~1.9s in, ~3.2s out, ~11s visible. Without the hold you would need extra keyframes, or interpolation between 0 and 0 at the ends would never reach 0.45 at all if you only set `from`/`to` opacity 0. The hold is the entire “ghost rain” look; remove it and the icons become a faint blink at mid-fall.

```css
  12%,
  80% {
    opacity: 0.45;
  }
```

---

### Q304. Why `110vh` not `100%`? What is `%` relative to for a `fixed` descendant?

**Non-technical:** They travel more than one screen tall so they finish below the fold.

**Technical:** Percentage `translateY` is relative to **the element being transformed**, not the viewport — `translateY(100%)` on a 1.5rem icon is only 1.5rem. That would barely move. `vh` is the viewport, so `110vh` is “a bit more than one screen.” `100vh` can leave a last sliver visible on mobile because of the URL bar (`dvh` would be more accurate; not used). `110vh` is a cheap overscan. `fixed` does not change what `%` means in `transform`.

```css
  to {
    transform: translateY(110vh);
    opacity: 0;
  }
```

---

### Q305. Why no `will-change: transform` or `transform: translateZ(0)`?

**Non-technical:** You did not force the browser to promote six extra layers “just in case.”

**Technical:** `will-change: transform` on six infinite animations would promote six compositor layers for the page lifetime — often a net negative on low-end GPUs (extra memory, sometimes blurry text). Modern engines already promote `transform`/`opacity` animations. `translateZ(0)` is the old hack and can create extra stacking contexts under the sticky header. Omitting both is the correct default. If you saw jank, profile in Performance panel first; don’t sprinkle `will-change` as folklore. The bigger battery cost is `infinite` plus no reduced-motion kill switch (Q306).

```css
.fall-icon {
  animation: fall var(--t) var(--d) linear infinite;
}
```

---

### Q306. Why no `@media (prefers-reduced-motion: reduce) { animation: none }`?

**Non-technical:** People who asked the OS to cut motion still get falling logos. That is a real accessibility miss.

**Technical:** There is **no** reduced-motion media query in this CSS file. Fall, skip-unrelated hover `translateY`, and `scroll-behavior: smooth` all ignore the user setting. JS only short-circuits the **ticker typewriter** (`prefersReducedMotion` → set full line, wait 3s). The cursor blink is dead anyway (`is-waiting` never added). Interview answer: admit the gap; the fix is one media block setting `.fall-icon { animation: none; opacity: 0; }` or `display: none` on `.fall`, plus `scroll-behavior: auto` and no button transform. Vestibular users are the audience.

```css
.fall-icon {
  animation: fall var(--t) var(--d) linear infinite;
}
```

---

### Q307. Why `.site-header` is `position: sticky; top: 0; z-index: 50`?

**Non-technical:** The name, section links, and sun/moon stay glued to the top as you read work cards.

**Technical:** `sticky` is relative until the scrollport crosses `top: 0`, then it behaves like `fixed` within its containing block (usually the viewport if no ancestor has overflow hidden). `z-index: 50` keeps it above `main` (1) and fall (0), below skip (100). `top: 0` is required; without it sticky never engages (Q309). Sticky does not remove the header from flow, so it does not overlap the start of the hero the way `fixed` would (Q308). `overflow: hidden` on a parent would kill sticky; `.fall` is a sibling, not a parent.

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--ink) 90%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}
```

---

### Q308. What happens if you use `fixed` instead of `sticky`?

**Non-technical:** The bar would overlay the hero from the first pixel. You would need extra padding under it or the name would hide under the nav.

**Technical:** `fixed` is out of flow; the hero would start at y=0 under the header. Today sticky occupies ~60px+ (20px padding × 2 + line) in normal flow, then sticks. You would add `main { padding-top: … }` or `scroll-margin-top` on `#top`. `fixed` + `width: 100%` is the older pattern; sticky is simpler for a short header. Hash links still hide headings under the sticky bar — neither `fixed` nor `sticky` adds `scroll-margin-top` (not set on `section`). That offset bug exists today.

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
}
```

---

### Q309. What happens if `top` is not `0`?

**Non-technical:** If you omit `top`, the header scrolls away like a normal block. If you set `top: 1rem`, it would stick 16px below the top edge.

**Technical:** `position: sticky` without an inset (`top` / `bottom` / `inset-block-start`) does not stick — it behaves like `relative` and scrolls away. `top: 0` is the engagement offset against the viewport. `top: 1rem` would leave a gap showing falling icons and `body` `--ink` above the bar. Negative `top` would stick the bar partly off-screen. Keep `0` unless you are stacking two sticky bars. Combined with `z-index: 50`, the bar covers the hero as soon as it sticks, which is why skip-link needs 100.

```css
.site-header {
  position: sticky;
  top: 0;
}
```

---

### Q310. Why `background: color-mix(in srgb, var(--ink) 90%, transparent)` instead of `opacity` on the whole header?

**Non-technical:** The bar is a frosted pane. The wordmark and links stay fully opaque.

**Technical:** `opacity` on `.site-header` would fade **everything**, including the wordmark and links — unreadable over a busy hero. Mixing 90% `--ink` with transparent paints only the background. `backdrop-filter: blur(8px)` then blurs content scrolling underneath (hero photo, cards, rain). Theme-safe because `--ink` swaps in `html.light`. There is no second solid fallback (Q311). 90% is almost solid, so the frost is subtle by design. `background: rgb(16 20 31 / 0.9)` would not follow light mode.

```css
.site-header {
  background: color-mix(in srgb, var(--ink) 90%, transparent);
  backdrop-filter: blur(8px);
}
```

---

### Q311. What happens if `color-mix` is unsupported?

**Non-technical:** The header background could vanish. You would see type floating on the page with only a thin line and maybe a blur.

**Technical:** If `color-mix` is invalid, the entire `background` declaration is dropped. There is **no** preceding `background: var(--ink)` and **no** `@supports`. `backdrop-filter` might still blur whatever shows through — including fall icons — without a dim plate. Evergreen 2026 browsers support `color-mix`; very old engines would fail. Honest gap: add `background: var(--ink);` then the `color-mix` line, or wrap mix+blur in `@supports`. Interviewers treat missing fallbacks as a production miss even when support is wide.

```css
.site-header {
  background: color-mix(in srgb, var(--ink) 90%, transparent);
  backdrop-filter: blur(8px);
}
```

---

### Q312. Why `backdrop-filter: blur(8px)`? What happens in Firefox without the flag, or if you remove it?

**Non-technical:** Content sliding under the nav goes slightly soft, like frosted glass.

**Technical:** Historically Firefox hid `backdrop-filter` behind `layout.css.backdrop-filter.enabled`; current Firefox ships it. If unsupported or removed, you still have the 90% `--ink` mix — a mostly opaque bar, just not glassy. Cost: `backdrop-filter` creates a stacking context and can be GPU-heavy with the six animated SVGs scrolling under it. `8px` is mild. No `-webkit-backdrop-filter` prefix; Safari has supported unprefixed for years, but older Safari wanted the prefix — another small gap.

```css
.site-header {
  backdrop-filter: blur(8px);
}
```

---

### Q313. Why `border-bottom: 1px solid var(--line)`?

**Non-technical:** A hairline separates the sticky bar from the page so it does not melt into the hero.

**Technical:** When blur and the 90% mix make the bar close to `--ink`, the border is the remaining edge cue. `--line` is 12% paper (or 12% navy in light). Without it, a fully scrolled about-section (same `--ink` as the mix) would hide the header edge and the bar would look like extra body padding. `box-shadow: 0 1px 0 var(--line)` could replace it; a 1px border is cheaper and does not create a stacking surprise. Footer uses the inverse `border-top` with the same token so the page is bookended.

```css
.site-header {
  border-bottom: 1px solid var(--line);
}
```

---

### Q314. Why `.nav-bar` has `max-width: 100vw` and `padding: 20px` instead of matching `section`’s `--max-w`?

**Non-technical:** The menu uses the full window width, not the 1100px column, and uses a 20px inset that does not match the 24px section gutter.

**Technical:** `max-width: 100vw` on a block that is already `width: auto` (100% of header) does little except invite the classic `100vw` scrollbar overflow (Q315). It does **not** center a 1100px inner nav — links are `justify-content: center` across the whole bar. `padding: 20px` is the only `px` spacing besides footer (Q388). Matching `--max-w` + `margin-inline: auto` would align the name with the h1 column; today the nav is independently centered as a pack of items. Design choice, slightly inconsistent.

```css
.nav-bar {
  max-width: 100vw;
  margin-inline: auto;
  padding: 20px;
}
```

---

### Q315. What is the difference between `100vw` and `100%` here (scrollbar gutter)?

**Non-technical:** `100vw` is “the whole screen including where the scrollbar lives,” which can be slightly wider than the visible page.

**Technical:** `100vw` includes the classic scrollbar gutter; `100%` is the parent’s content box. A child of `100vw` plus padding can overflow `html` horizontally by ~15px on Windows overlay-scrollbar-off configurations. `.nav-bar` and `.site-footer` both use `100vw`. `100%` (or omitting max-width) is safer. `100dvw` has similar issues. This is a known CSS trap; saying “I would use `100%` or `100dvw` with `overflow-x: hidden` on body” is the mature answer.

```css
.nav-bar {
  max-width: 100vw;
}

.site-footer {
  max-width: 100vw;
}
```

---

### Q316. Why `.nav-bar-menu` is `display: flex; justify-content: center; gap: 1rem` with mono `0.75rem`?

**Non-technical:** One centered row of small code-like labels: name, About, Work, Skills, Contact, theme.

**Technical:** The `ul` is the flex container; `li`s are flex items (default `flex: 0 1 auto`). No `list-style`, no `flex-wrap` (Q317). Mono 0.75rem matches the “systems” voice. Gap 1rem becomes 2.5rem at 900px (Q324). `justify-content: center` packs the group in the middle rather than spreading with `space-between` (name left, links right) — a denser, more “wordmark as one item among six” layout. There is no hamburger; CSS never hides links. JS looks up `#navToggle` which does not exist.

```css
.nav-bar-menu {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}
```

---

### Q317. What happens on a 320px screen with name + 4 links + theme button — overflow, wrap, or clip? You have no `flex-wrap`.

**Non-technical:** The row cannot wrap. On a very small phone the items can overflow sideways.

**Technical:** Default `flex-wrap: nowrap`. Six items: `Sayantan.Pal`, About, Work, Skills, Contact, ☀. At 0.75rem mono with `gap: 1rem` and 20px padding, 320px is tight. Overflow is visible (no `overflow-x: auto` on the header), so you can get horizontal page scroll. `min-width: auto` on flex items (and the button) resists shrinking (Q234). Honest: this is the mobile-nav gap. JS already contains a dead hamburger handler (`#navToggle` / `#navMenu` missing in HTML). Either wrap, shrink font, or implement a real toggle.

```css
.nav-bar-menu {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.75rem;
}
```

---

### Q318. Why `.nav-bar-menu-name-dim`, `.nav-bar-menu-items-contact`, `.nav-bar-theme` share `color: var(--signal)`?

**Non-technical:** The `.Pal` suffix, Contact, and the sun/moon are the gold/orange accents in an otherwise cream-on-navy row.

**Technical:** One grouped selector. About/Work/Skills stay `inherit` (`--paper` from body). Contact is singled out as the conversion link. The theme emoji inherits `--signal` via the button’s `color` (the glyph is `::before` content). Light mode orange applies automatically through the token. You could use a single `.is-accent` class; three BEM-ish names document intent in HTML instead. The name’s `.Pal` span is the only accent inside an otherwise `--paper` wordmark.

```css
.nav-bar-menu-name-dim,
.nav-bar-menu-items-contact,
.nav-bar-theme {
  color: var(--signal);
}
```

---

### Q319. Why `.nav-bar-theme` resets `background`, `border`, `appearance`, sets `cursor: pointer`, `max-height: 1.2em; overflow: hidden`?

**Non-technical:** It should look like a glyph, not a grey OS button, and the emoji should not spill extra line-box height.

**Technical:** UA `<button>` has border, padding (already zeroed by `*`), and `appearance`. `background: none; border: 0; appearance: none` naked-ifies it. `cursor: pointer` restores the hand (UA buttons are default cursor on some OS). `max-height: 1.2em; overflow: hidden` clips the emoji’s extra metrics (Apple emoji cells are taller than the cap-height). `line-height: 1` plus `font-size: var(--step-0)` sizes the hit target. The button is **empty in HTML** — no `aria-label`.

```css
.nav-bar-theme {
  background: none;
  border: 0;
  appearance: none;
  cursor: pointer;
  font-size: var(--step-0);
  line-height: 1;
  max-height: 1.2em;
  overflow: hidden;
}
```

---

### Q320. What happens if `overflow: hidden` is removed?

**Non-technical:** The sun/moon might make the header row taller or sit optically off-center.

**Technical:** Color-emoji glyphs have internal padding. Combined with `::before` as an inline box, they can overflow the 1.2em cap and expand the flex item’s line box, making the whole sticky bar taller and misaligning text links with the icon. `max-height` without `overflow: hidden` still limits used height in some engines but descendants can paint outside. Keep both. `text-box-trim` / `leading-trim` would be the modern alternative; not used here. This clip is also why a missing emoji font (tofu) might get cropped oddly (Q322).

```css
.nav-bar-theme {
  max-height: 1.2em;
  overflow: hidden;
}
```

---

### Q321. Why the sun/moon is `::before { content: "☀" }` and `html.light … content: "☾"` rather than HTML text or an SVG?

**Non-technical:** The empty button shows a sun in dark mode (click to go light) and a moon in light mode (click to go dark).

**Technical:** CSS `content` is not reliable accessible name. The button has no text, no `aria-label`, no `aria-pressed`. Screen readers often announce “button” or the emoji (poorly). Sun means “you are in dark, switch to light” — a metaphor, not a label. SVG + `<title>` or visually-hidden “Switch to light theme” would be the fix. `html.light` swaps content without JS touching the DOM besides the class. Emoji quality varies by OS (Q322). This is the gap listed in the index answers file.

```css
.nav-bar-theme::before {
  content: "☀";
}

html.light .nav-bar-theme::before {
  content: "☾";
}
```

---

### Q322. What happens if the emoji font is missing?

**Non-technical:** You might see a tofu box, a last-resort glyph, or nothing — and the control would look broken.

**Technical:** `content: "☀"` depends on a color-emoji font (Apple Color Emoji, Noto Emoji, Segoe UI Emoji). On a locked-down system without emoji, U+2600 / U+263E may render as monochrome text or `.notdef`. `overflow: hidden; max-height: 1.2em` could clip a fallback glyph. SVG icons with `currentColor` would follow `--signal` and never tofu. There is no `font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif` on the button.

```css
.nav-bar-theme::before {
  content: "☀";
}
```

---

### Q323. Why not `aria`-connected text that CSS hides?

**Non-technical:** A hidden “Toggle color theme” string would give the empty button a name without changing the look.

**Technical:** Pattern: `<button aria-label="Switch to light theme">` updated in JS on toggle, or a visually-hidden `<span>`. CSS `content` is not a reliable accessible name (Firefox vs Chrome differ on whether emoji content is announced). `aria-pressed` should reflect `html.light`. Current JS only toggles the class plus `localStorage` — no ARIA updates. Interview: keep the emoji if you want the look, but add `aria-label` / `aria-pressed`. CSS cannot fix the empty button alone; that is an HTML/JS gap sitting next to this CSS trick.

```css
.nav-bar-theme::before {
  content: "☀";
}
```

---

### Q324. Why `@media (min-width: 900px)` only increases `gap` and `font-size` — why 900px, not 768px?

**Non-technical:** On tablets-in-landscape and desktops the nav letters get bigger and more spread out. Phones keep the compact row.

**Technical:** 900px is this design’s “desktop” token, reused for hero grid, skills 3-col, and redundant work-grid. 768px (Bootstrap md) would fire earlier on iPad portrait (768). At 800px you still have the small 0.75rem nav and single-column hero. No container queries (Q387). Only two breakpoints in the whole sheet: 600 and 900. Mobile-nav overflow (Q317) is not solved by this media query — 900px is too late for 320–500px phones.

```css
@media (min-width: 900px) {
  .nav-bar-menu {
    gap: 2.5rem;
    font-size: 0.95rem;
  }
}
```

---

### Q325. Why `.hero` is a grid with `gap: 2.5rem` even when it is a single child `.hero-text`?

**Non-technical:** The hero is prepared to be a grid, but today it only wraps one inner block, so that gap does nothing.

**Technical:** `.hero { display: grid; gap: 2.5rem }` with a single child `.hero-text` means `gap` never applies (gap is between tracks/items). The useful parts are extra `padding-top/bottom: 4rem` (5rem at 900px) on top of `section` padding longhands. A leftover from a two-column hero (text | visual as direct children) that was later nested into `.hero-text`. Harmless dead spacing. You could drop `display: grid; gap: 2.5rem` on `.hero` without a visual change.

```css
.hero {
  display: grid;
  gap: 2.5rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
}
```

---

### Q326. Why `.section-eyebrow` is mono, `0.85rem`, `--signal`, `letter-spacing: 0.02em`?

**Non-technical:** The `// about me` style labels look like code comments above each chapter.

**Technical:** Shared across hero, about, skills, work, projects, and contact. Mono + 0.02em tracking + `--signal` is the “comment” metaphor matching HTML `// full-stack &amp; ai…`. `margin-bottom: 0.75rem` separates it from `h1`/`h2`. Not uppercase (skills `h3` is). 0.85rem sits between nav 0.75rem and body `--step-0`. Contrast of small `--signal` text on `--ink` is the pair to verify (Q252), especially gold-on-navy in dark mode. Removing this class would leave those lines as muted body paragraphs.

```css
.section-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--signal);
  letter-spacing: 0.02em;
  margin-bottom: 0.75rem;
}
```

---

### Q327. Why `.hero-text-description` is `max-width: 42ch`?

**Non-technical:** The intro sentence does not stretch across the whole 1100px column; it stays a readable measure.

**Technical:** `ch` is the width of the `0` glyph of the element’s font (IBM Plex Sans via inheritance from body, not mono). ~42 characters is a classic comfortable line length. At desktop the description sits in column 1 (1.1fr of the hero grid) which may already be narrower than 42ch; `max-width` then no-ops. On mobile it caps before the section’s 272px only when 42ch < available — often the section padding wins first (Q281). Contact lead uses 50ch (Q370). `strong` inside is recolored to `--paper` (Q329).

```css
.hero-text-description {
  max-width: 42ch;
  margin-top: 1rem;
  color: var(--muted);
}
```

---

### Q328. What is `ch` relative to, and what happens if you use `px` or `em` instead?

**Non-technical:** `ch` grows with the font. `px` would ignore zoom/typeface. `em` would follow the paragraph’s size.

**Technical:** `1ch` ≈ width of `0` in the computed font. If Google Fonts fails and Arial kicks in, 42ch changes. `px` (e.g. 420px) ignores user font-size if you were sloppy, but user zoom still scales CSS pixels in the browser — `rem`/`ch` remain the right choice for type-driven measure. `em` would be 42 × this element’s font-size (same as body here). `ch` is the most “line length” unit. It does not equal “42 characters of mixed IBM Plex” exactly because `0` is not as wide as `M`.

```css
.hero-text-description {
  max-width: 42ch;
}
```

---

### Q329. Why `strong` inside the description is recolored to `--paper`?

**Non-technical:** “Prismforce” and “Selectprism” pop as primary text inside grey copy.

**Technical:** Parent is `--muted`. `<strong>` is semantic emphasis; UA bold plus `--paper` makes company names the brightest words in the paragraph. Weight: body is 400, `strong` is 700 — IBM Plex Sans 700 is **not** in the Google Fonts URL (only 400/500). The browser synthesizes bold. Recolor still works. Work-card metrics also use `<strong>` but `.work-card p` sets color muted on the `p`, not on `strong` — those metrics inherit muted unless you add a similar rule (they rely on weight alone). Hero is the only `strong { color: var(--paper) }`.

```css
.hero-text-description strong {
  color: var(--paper);
}
```

---

### Q330. Why `.hero-text-visual` is `width: min(220px, 70%)` on small screens?

**Non-technical:** The portrait is a modest square that never exceeds 220px and never exceeds 70% of the hero column.

**Technical:** `min()` picks the smaller of `220px` and `70%` of the containing block (`.hero-text`). On a 320px-wide section (~272px content), 70% ≈ 190px, so 190px wins. On a 500px column, 220px wins. `margin-top: 1.75rem` stacks the figure under the description in the single-column flow (DOM order: description, then figure, then ticker). At 900px this is overridden to `min(100%, 380px)` and `margin-top: 0` (Q351). Using `%` of the hero, not of the viewport, is why it shrinks with the 1.5rem section padding.

```css
.hero-text-visual {
  width: min(220px, 70%);
  margin-top: 1.75rem;
}
```

---

### Q331. Why `min()` not `max()` or a fixed `220px`?

**Non-technical:** `min` is a cap: “this small, or smaller if the phone is narrow.” `max` would be a floor and could overflow.

**Technical:** `max(220px, 70%)` on a 400px parent is max(220, 280)=280, growing the image; on a 200px parent max(220, 140)=220, overflowing the column. Fixed `220px` overflows when the column is narrower than 220px plus the figure’s margin. `min()` is the correct “never bigger than either constraint.” The two-argument form `width: 70%; max-width: 220px` is the same math and is more readable to some interviewers. Either is fine; `max()` would be the wrong function here.

```css
.hero-text-visual {
  width: min(220px, 70%);
}
```

---

### Q332. Why the img has `aspect-ratio: 1; object-fit: cover; border-radius: 6px`?

**Non-technical:** The photo is a rounded square, cropped to fill, matching the 6px radius language of cards and buttons.

**Technical:** HTML is 800×800 so the ratio is already 1; `aspect-ratio: 1` plus `height: auto` and `width: 100%` still reserves a square before the image decodes — CLS insurance with the width/height attributes. `object-fit: cover` crops if a non-square asset is swapped in. `border: 1px solid var(--line)` plus radius 6px matches `.work-card`, ticker, and `.btn`. `object-fit` without a definite height does little; `aspect-ratio` supplies that height. Radius 6px on a photo is the same surface language as the terminal chip below it.

```css
.hero-text-visual img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid var(--line);
  border-radius: 6px;
}
```

---

### Q333. What happens if `object-fit` is `contain` or is removed?

**Non-technical:** `contain` would letterbox the face inside the square. Removing it uses the default `fill`, which stretches a non-square file.

**Technical:** Default `object-fit: fill` distorts. `contain` shows the whole image with possible `--ink` bars (the figure background shows through the img’s content box only if the img element is larger than the replaced content — actually bars are the image’s own empty object-position area, transparent? replaced content with contain leaves empty parts of the content box showing the image’s background, default transparent, so you’d see the figure/page through). Current JPG is square, so `cover`/`contain`/`fill` look identical **until** the asset changes. Keep `cover` as the contract for a headshot.

```css
.hero-text-visual img {
  aspect-ratio: 1;
  object-fit: cover;
}
```

---

### Q334. Why the ticker is a flex row with `min-height: 2.6em`, panel background, and radius 6px matching cards?

**Non-technical:** It looks like a tiny terminal: `$`, the pipeline text, and a block cursor on a raised chip.

**Technical:** `display: flex; align-items: flex-start` so a wrapping second line of pipeline text stays top-aligned with `$`. `min-height: 2.6em` (Q335) holds space while JS types into an empty `#tickerText`. Colors: `--signal` text, `--panel` fill, `--line` border, radius 6px — same surface language as `.work-card`. Prompt is `--muted`. No `overflow: hidden`, so long strings wrap thanks to `min-width: 0` on the line (Q336). JS reduced-motion still uses this box; it only skips type/erase, not the chrome.

```css
.hero-text-ticker {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  min-height: 2.6em;
  margin-top: 1.75rem;
  padding: 0.85rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--signal);
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 6px;
}
```

---

### Q335. Why `min-height` rather than a fixed height — related to wrapping ticker text?

**Non-technical:** One line is always at least that tall; two lines are allowed to grow so text is never clipped.

**Technical:** A 200-character pipeline would wrap (flex child with `min-width: 0`). Fixed `height: 2.6em` plus `overflow: hidden` would clip; this sheet uses `min-height` and no overflow clip. JS reduced-motion path sets the full string at once — more likely to wrap. Typewriter path grows from empty; min-height avoids the chip jumping from ~0 to one line on the first character. 2.6em ≈ one line of 0.9rem plus padding’s interaction… padding is extra, so the content box min-height is 2.6em **plus** padding from border-box? `box-sizing: border-box` means `min-height` includes padding/border — so inner content area is 2.6em − 1.7rem padding, which can be tight. Worth knowing if the first line looks cramped.

```css
.hero-text-ticker {
  min-height: 2.6em;
  padding: 0.85rem 1rem;
}
```

---

### Q336. Why `.hero-text-ticker-line { flex: 1; min-width: 0; }`?

**Non-technical:** The typed text takes the remaining row next to `$` and is allowed to shrink so it wraps instead of blowing out the chip.

**Technical:** `flex: 1` is `1 1 0%` in some browsers / `1 1 0` depending on the engine’s interpretation of `flex: 1` → `1 1 0%`. `min-width: 0` overrides the default `min-width: auto` (min-content of the long snake_case string). Without it, the flex item cannot shrink below the long unbroken string width (Q337). The inner `#tickerText` + cursor live here. Prompt does not flex.

```css
.hero-text-ticker-line {
  flex: 1;
  min-width: 0;
}
```

---

### Q337. What happens if you remove `min-width: 0` in a flex item (classic overflow bug)?

**Non-technical:** A long pipeline like `audio_stream -> deepgram_stt -> llm -> tts_response` can stretch the ticker and the whole hero, causing sideways scroll.

**Technical:** Flex items’ default `min-width: auto` is the specified/min-content size. Monospace strings with few break points (`audio_stream -> deepgram_stt -> llm -> tts_response`) are wide. The ticker’s parent then overflows `.hero-text` / `section` and can create a horizontal scrollbar on the whole page. `overflow-wrap: anywhere` or `word-break: break-all` would also help; `min-width: 0` is the standard flex fix. This is a favorite interview question — point at `.hero-text-ticker-line` as the live example in this repo.

```css
.hero-text-ticker-line {
  flex: 1;
  min-width: 0;
}
```

---

### Q338. Why `.hero-text-ticker-cursor { display: inline; }` — default already?

**Non-technical:** It does not change how the caret sits; spans are inline by default.

**Technical:** Dead-ish declaration. `span` is `display: inline` in the UA stylesheet. It documents intent (“this is not a block caret”) and would fight if you later set `span { display: block }` globally (you did not). The blink animation targets this span’s `opacity`. Could be deleted with no visual change. Adjacent to `#tickerText` with no whitespace in HTML so the `▍` sits flush after the last character. `display: inline-block` would let you size the caret; not needed for a glyph.

```css
.hero-text-ticker-cursor {
  display: inline;
}
```

---

### Q339. Why the blink animation is gated on `.is-waiting` rather than always blinking?

**Non-technical:** The design wanted a blinking caret only while the line is complete, not while characters are appearing or deleting.

**Technical:** `.hero-text-ticker.is-waiting .hero-text-ticker-cursor { animation: blink 1s step-end infinite }`. That is a state class meant to be toggled by JS around the 1800ms pause. **Current `js/main.js` never adds `is-waiting`.** It types, waits, erases — no classList. So the caret never blinks. Gating is correct design; the wire to JS is missing. Always-on blink would work without JS but would blink during type/erase too.

```css
.hero-text-ticker.is-waiting .hero-text-ticker-cursor {
  animation: blink 1s step-end infinite;
}
```

---

### Q340. Why `@keyframes blink { 50% { opacity: 0; } }` with `step-end` and `1s`?

**Non-technical:** Classic terminal caret: on for half a second, off for half, no fade.

**Technical:** `step-end` (same as `steps(1, end)`) holds the 0% value until 50%, then jumps to the 50% keyframe (`opacity: 0`), then at 100% jumps back. A `linear` 50% `{ opacity: 0 }` would fade the caret — not a terminal. 1s infinite is typical. Only applied under `.is-waiting`, which JS never adds, so this keyframe is unused on the live page (Q341). Implicit 0%/100% opacity 1 comes from the element’s computed opacity. `step-start` would invert the duty cycle (off first).

```css
@keyframes blink {
  50% {
    opacity: 0;
  }
}
```

---

### Q341. What happens if JS never adds `is-waiting`?

**Non-technical:** The block cursor stays solid. Nothing blinks. The CSS for waiting is leftover.

**Technical:** That is **today’s behavior**. `main.js` has no `classList.add('is-waiting')`. The reduced-motion path also does not add it; it swaps full lines every 3s. The rule and `@keyframes blink` are dead code. A reviewer who reads CSS then JS will catch this — same note as in `Deep-Dive-Answers.md`. Fix: add/remove the class around `await wait(1800)`, or drop the CSS. Do not claim the caret blinks in an interview without fixing the JS. The ticker still types; only the blink is missing.

```css
.hero-text-ticker.is-waiting .hero-text-ticker-cursor {
  animation: blink 1s step-end infinite;
}
```

---

### Q342. Why `.hero-text-actions` is flex with `flex-wrap: wrap`?

**Non-technical:** “View work” and “Resume” sit in a row, and on a narrow screen the second button drops under the first instead of overflowing.

**Technical:** `gap: 1rem; margin-top: 2rem`. Wrap is the mobile safety net that `.nav-bar-menu` lacks. Both CTAs are `inline-block` `.btn`s, so they size to their labels (“View work”, “Resume”). Primary + ghost stay equal height via shared padding. `flex-wrap` plus gap avoids the iOS `min-width: auto` overflow better than the nav does (Q234). On a 320px screen the second button dropping to row 2 is expected, not a bug. `flex-wrap: nowrap` here would recreate the nav overflow problem.

```css
.hero-text-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}
```

---

### Q343. Why `.btn` uses `display: inline-block`, mono font, `transition: transform 0.15s ease, background 0.15s ease`?

**Non-technical:** Links look like compact code-labels that lift and recolor quickly on hover.

**Technical:** Both CTAs are `<a class="btn">`, not `<button>` (except the form submit which is both `.btn.btn-primary` and `button`). `inline-block` lets padding apply and wrap as a unit. Mono 0.9rem. `border: 1px solid transparent` reserves the 1px so ghost vs primary don’t shift (but form `button { border: none }` fights this — Q376). Transition lists only `transform` and `background`; `border-color` on `.btn-ghost:hover` snaps. 0.15s is snappy. No `prefers-reduced-motion` disable on the transform (Q344).

```css
.btn {
  display: inline-block;
  padding: 0.75rem 1.4rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: transform 0.15s ease, background 0.15s ease;
}
```

---

### Q344. Why hover is `translateY(-2px)`? What about `prefers-reduced-motion`?

**Non-technical:** The button hops up 2 pixels. OS reduced-motion does not stop it.

**Technical:** `transform` is GPU-cheap. `:hover` does not run on most phones (no hover), so mobile is static unless a stylus is used. There is no `@media (hover: hover)` gate either, so a coarse pointer that still reports hover can flicker. Reduced-motion users on a laptop still get the hop **and** the 110vh rain. Gap: wrap the hover transform in `(prefers-reduced-motion: no-preference)` or set `transform: none` in a reduce block. 2px is a small vestibular trigger compared to the fall layer, but it is still ungated motion.

```css
.btn:hover {
  transform: translateY(-2px);
}
```

---

### Q345. Why `.btn-primary` is `--signal` on `--ink` and hover `--signal-dim`?

**Non-technical:** The main action is a filled gold/orange chip; hover darkens the fill.

**Technical:** Same pair as the skip link. Light mode: orange fill, cream label (`--ink` swapped). `--signal-dim` is `#c97d1e` in dark and `#9a3412` in light. `color: var(--ink)` must stay — it tracks the page fill token so the label stays the opposite of the page. Contrast: check gold vs navy (dark) and cream vs orange (light) at 0.9rem. Hover only changes background, not type color. The form submit reuses this class (plus the `border: none` fight in Q376).

```css
.btn-primary {
  background: var(--signal);
  color: var(--ink);
}

.btn-primary:hover {
  background: var(--signal-dim);
}
```

---

### Q346. Why `.btn-ghost` is transparent with `--line` border, hover `--signal` border?

**Non-technical:** Resume is the quieter twin: outline only, gold border on hover.

**Technical:** Background stays transparent so body `--ink` shows through. `color: var(--paper)` for the label. Hover does not use `--signal-dim` or a fill; only `border-color` changes to `--signal`. The `.btn` `transition` list is `transform, background` — **not** `border-color` — so the ghost border snaps while the lift still eases. Ghost still lifts via `.btn:hover`. Secondary hierarchy is fill vs outline, not size. Resume is the only ghost in the hero; the form uses primary only.

```css
.btn-ghost {
  border-color: var(--line);
  color: var(--paper);
}

.btn-ghost:hover {
  border-color: var(--signal);
}
```

---

### Q347. At `min-width: 900px`, why `.hero-text` becomes `grid-template-columns: 1.1fr 0.9fr`?

**Non-technical:** Text gets a slightly wider column than the photo. The portrait sits on the right.

**Technical:** Two columns, `column-gap: 2.5rem`, `align-items: center`. 1.1 / 0.9 is a soft 55/45 split, not `1fr 1fr`, so the h1 and 42ch measure keep priority over the portrait. Children placement is not auto-flow left-to-right: explicit column rules (Q348–Q350) put the figure in column 2 spanning five rows. Below 900px `.hero-text` is a normal block stack (photo between description and ticker in DOM order). Equal `1fr 1fr` would starve the name slightly on a 900px window.

```css
@media (min-width: 900px) {
  .hero-text {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    column-gap: 2.5rem;
    align-items: center;
  }
}
```

---

### Q348. Why `.hero-text > :not(.hero-text-visual) { grid-column: 1; }`?

**Non-technical:** Everything except the photo is forced into the left column.

**Technical:** Direct-child selector. The six children are: `.section-eyebrow`, `h1`, `.hero-text-description`, `figure.hero-text-visual`, `.hero-text-ticker`, `.hero-text-actions`. Five match `:not(.hero-text-visual)` and stack in column 1 in source order (five rows). Without this, auto-placement would put the figure in column 2 **row 2** (after eyebrow took 1,1 and h1 took 1,2… actually auto would fill row-first: item1 (0,0), item2 (1,0), item3 (0,1), figure (1,1), … — a mess). The `:not` rule is required for the “text stack + side portrait” layout.

```css
  .hero-text > :not(.hero-text-visual) {
    grid-column: 1;
  }
```

---

### Q349. Why `.hero-text-visual` is `grid-column: 2; grid-row: 1 / span 5`?

**Non-technical:** The photo occupies the entire right column, vertically centered against all five left-side blocks.

**Technical:** `grid-row: 1 / span 5` means start at row 1, span five rows — the same five rows created by the five non-figure siblings (eyebrow, h1, description, ticker, actions). `align-self: center; justify-self: center` then centers the figure inside that tall area. `width: min(100%, 380px); margin-top: 0` undoes the mobile top margin so it isn’t pushed down inside the span. If you add a seventh child (a second CTA row, a location line), span 5 is wrong until you bump it (Q350). The number is coupled to HTML, not a CSS constant with a comment.

```css
  .hero-text-visual {
    grid-column: 2;
    grid-row: 1 / span 5;
    align-self: center;
    justify-self: center;
    width: min(100%, 380px);
    margin-top: 0;
  }
```

---

### Q350. What happens if you `span 4` or `span 2` instead of `span 5`? Count the children: eyebrow, h1, description, figure, ticker, actions — why 5?

**Non-technical:** The photo would only line up with part of the text stack. The buttons or ticker would sit lower with empty space beside them.

**Technical:** `.hero-text` has **six** children. The figure is one of them. The other **five** each generate a grid row in column 1. Span 5 makes the visual a single cell covering rows 1–5, i.e. beside all of: eyebrow, h1, description, ticker, actions. `span 4` covers rows 1–4 (through ticker); actions sit in row 5 column 1 with an empty column 2. `span 2` only beside eyebrow+h1; description/ticker/actions stack with a hole. `span 6` would invent a sixth row and leave a trailing empty track. The magic number 5 is “non-figure siblings,” not “total children.” Adding a seventh child without updating span is a layout bug.

```css
  .hero-text-visual {
    grid-column: 2;
    grid-row: 1 / span 5;
  }
```

---

### Q351. Why `align-self: center; justify-self: center; width: min(100%, 380px); margin-top: 0` on desktop?

**Non-technical:** The portrait grows up to 380px, sits centered in the right column, and no longer has the mobile gap above it.

**Technical:** Mobile width was `min(220px, 70%)`. Desktop allows 380px but not more than the column (`100%`). `justify-self: center` centers a 380px box in a possibly wider 0.9fr column. `align-self: center` vertical-centers within the five-row span so a short image doesn’t stick to row 1. `margin-top: 0` overrides `1.75rem`. Without `min(100%, 380px)`, a fixed 380px could overflow the 0.9fr column on a 900px-wide window: 900 − 48 padding − 40 gap ≈ 812, × 0.9fr/(2fr) ≈ 365px — 380px would slightly overflow; `min(100%, 380px)` saves that.

```css
  .hero-text-visual {
    align-self: center;
    justify-self: center;
    width: min(100%, 380px);
    margin-top: 0;
  }
```

---

### Q352. What happens if this media query is removed?

**Non-technical:** Even on a desktop monitor the photo stays a 220px square in document order: under the intro, above the ticker. No side-by-side hero.

**Technical:** `.hero-text` remains a block formatting context. DOM order is eyebrow, h1, description, figure, ticker, actions — a long single column even on a 1440px monitor. The photo stays `min(220px, 70%)` with `margin-top: 1.75rem`. Nav would still enlarge at 900px (separate query). Skills would still go 3-col. Hero padding would stay 4rem, not 5rem. The span-5 grid, the 1.1fr/0.9fr split, and the 380px portrait cap all live in this one `@media (min-width: 900px)` block. Removing it is the fastest way to demo “mobile-first is the default.”

```css
@media (min-width: 900px) {
  .hero {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  /* .hero-text grid + visual span 5 */
}
```

---

### Q353. Why `.about-grid` is a 1-column grid with `gap: 1.25rem`, then `1fr 1fr` at `600px` not `900px`?

**Non-technical:** Two about paragraphs sit stacked on a phone and become two columns as soon as there is room, earlier than the hero’s 900px switch.

**Technical:** Two children only, so a 2-col grid at 600px is a straightforward split. 900px would keep them stacked on a 700px tablet for no reason — each paragraph is a short measure. `gap: 1.25rem` matches `.work-grid` gap. No `max-width` on the paragraphs; in two columns each takes ~half of 1100px (~525px), longer lines than the hero’s 42ch. That is a readability trade-off.

```css
.about-grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 600px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }
}
```

---

### Q354. Why a different breakpoint than the nav/hero/skills 900px?

**Non-technical:** About can go two-up on a large phone; the hero photo-beside-text needs more width.

**Technical:** 600px is reused for `.work-grid` two-columns. 900px is “true desktop” for nav size, hero grid, skills 3-col, and a redundant work-grid rule. Two tokens, not a scale (no 1200px). Container queries would let about columns depend on the 1100px section rather than the viewport (Q387) — if you ever put this grid in a narrow aside, 600px viewport would still force 2-col. For a full-width section it is fine. Interview: 600 = “two cards/paragraphs,” 900 = “chrome + 3 skill columns.”

```css
@media (min-width: 600px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }
}
```

---

### Q355. Why paragraphs are `--muted`?

**Non-technical:** About is supporting copy, visually quieter than the headings and than `--paper` body default.

**Technical:** `.about-grid p { color: var(--muted) }` only. The section eyebrow is `--signal`; h2 is `--paper` (inherited heading color from body). Same muted role as `.hero-text-description`, `.work-sub`, `.work-card p`, and `.contact-lead`. Light-mode `#5c6578` on cream is the pair to WCAG-check (Q252). There is no `max-width: ch` here, so muted text also has a longer measure once the 600px two-column split fires — quieter color, but wider lines than the hero intro.

```css
.about-grid p {
  color: var(--muted);
}
```

---

### Q356. Why `.skills-grid` is `gap: 2rem` and becomes `repeat(3, 1fr)` at 900px?

**Non-technical:** On desktop you get three skill columns with generous gaps. On mobile they stack.

**Technical:** Default grid is one column (implicit). At 900px, `repeat(3, 1fr)` — not 2 or 4 (Q358). Gap 2rem is larger than work’s 1.25rem because groups contain wrapping chip lists. There is no 600px step for skills (unlike about/work), so from 601–899px you still have a single column of four groups. That is an awkward tablet band: two-up about/work, still stacked skills. Four groups into three tracks then wraps Infra (Q357). A 600px `repeat(2, 1fr)` would be the missing middle.

```css
.skills-grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 900px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### Q357. There are **four** `.skills-group` children. What happens to the fourth (Infra) on a 3-column grid?

**Non-technical:** Frontend, Backend, and Database sit on row 1. Infra & Tools wraps alone onto row 2, left-aligned in the first track.

**Technical:** Auto-placement row-major: items 1–3 fill columns 1–3 of row 1; item 4 goes to row 2, column 1. Columns 2–3 of row 2 are empty. Infra does not span 3 columns unless you add `.skills-group:nth-child(4) { grid-column: 1 / -1 }` or change to `repeat(4, 1fr)` / `repeat(2, 1fr)`. This is a real layout quirk a reviewer will open DevTools to confirm. HTML groups: Frontend, Backend, Database, Infra & Tools.

```css
@media (min-width: 900px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### Q358. Why not `repeat(2, 1fr)` or `repeat(4, 1fr)` or `auto-fit`?

**Non-technical:** Two columns would pair the four groups evenly. Four columns would squeeze chips. `auto-fit` would try to pack as many as fit.

**Technical:** `repeat(2, 1fr)` at 900px: Frontend|Backend, Database|Infra — balanced, probably better. `repeat(4, 1fr)` on 1100px ≈ 250px columns, chip lists wrap a lot. `repeat(auto-fit, minmax(220px, 1fr))` would drop from 4 to 3 to 2 without a magic 3. The current 3 is likely leftover from a three-group design. Honest interview answer: four groups + three columns is a mistake; I would use 2×2 or auto-fit.

```css
@media (min-width: 900px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### Q359. Why group `h3` is uppercase, mono, muted, `letter-spacing: 0.06em`?

**Non-technical:** “FRONTEND” looks like a label on a rack, not a newspaper subhead.

**Technical:** `.skills-group h3` overrides the display-serif `h3` rule’s family, size, and color but keeps `font-weight: 700` and `margin-bottom: 0.5rem` from the global `h3`. `text-transform: uppercase` is CSS-only — the HTML stays `Frontend` for copy/paste. Some screen readers used to announce CSS caps letter-by-letter; that is less common now but still a reason some teams uppercase in HTML or skip caps. 0.06em tracking helps caps. Muted so the `--paper` chips are the emphasis, not the group title.

```css
.skills-group h3 {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```

---

### Q360. Why `.tag-list` is flex wrap with gap, and `li` looks like chips (padding, panel, border, radius 4px vs cards’ 6px)?

**Non-technical:** Skills are small tiles that wrap like tags, slightly sharper than the 6px cards.

**Technical:** `display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem`. Each `li` is a chip: panel fill, line border, mono 0.8rem, radius **4px** (cards/buttons/ticker are 6px) — a one-step tighter radius so tags feel smaller. Reused in work cards via `.tag-list.tag-list-small`. Global `ul { list-style: none }` plus `*` padding 0 is what makes this possible without extra resets. `flex-wrap` is essential; without it chips would overflow like the nav.

```css
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.tag-list li {
  padding: 0.35rem 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--paper);
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 4px;
}
```

---

### Q361. Why `.tag-list-small li { font-size: 0.72rem; }` only changes font-size?

**Non-technical:** Work-card tags are the same chips, just a bit smaller, so six cards don’t fill with huge pills.

**Technical:** Padding, radius, and colors stay from `.tag-list li`. 0.72rem vs 0.8rem is a subtle scale so six cards don’t fill with huge pills. Used as `<ul class="tag-list tag-list-small">` on experience and project cards. Specificity 0,2,1 vs 0,1,1 — wins for `font-size` only. Could also reduce padding; not done, so the chips are slightly roomy for their type. Skills section uses `.tag-list` without `-small` and stays 0.8rem. Same 4px radius in both sizes.

```css
.tag-list-small li {
  font-size: 0.72rem;
}
```

---

### Q362. Why `.work-sub` has `margin-top: -1rem`?

**Non-technical:** The role line “Associate Software Engineer · Feb 2025…” sits closer to “Prismforce” than a normal paragraph would.

**Technical:** `h2 { margin-bottom: 1.5rem }`. Negative 1rem pulls the sub up, leaving a net 0.5rem between “Prismforce” and the role line, then `.work-sub { margin-bottom: 1.5rem }` separates meta from the card grid. Coupled to the h2 margin (Q363): if that 1.5rem changes, the optical pairing breaks. Only the experience section has `.work-sub`; projects go h2 → grid. Color is `--muted`. A `h2 + .work-sub` sibling selector with a smaller positive margin would be less brittle.

```css
.work-sub {
  margin-top: -1rem;
  margin-bottom: 1.5rem;
  color: var(--muted);
}
```

---

### Q363. What happens if the h2 `margin-bottom` changes — does the negative margin still make sense?

**Non-technical:** If you enlarge the heading gap, the role line would overlap or leave an odd hole unless you retune the negative margin.

**Technical:** Net gap = `1.5rem + (-1rem) = 0.5rem`. If `h2` becomes `margin-bottom: 0.5rem`, net is −0.5rem (overlap). If `h2` becomes `2.5rem`, net is 1.5rem (the negative is pointless). Better: `h2 + .work-sub { margin-top: 0 }` and a smaller h2 margin in that section, or `h2 { margin-bottom: 0.5rem }` when followed by `.work-sub`. Negative margin is a smell but works while those two numbers stay paired.

```css
h2 {
  margin-bottom: 1.5rem;
}

.work-sub {
  margin-top: -1rem;
}
```

---

### Q364. Why `.work-grid` is 1 column, then `1fr 1fr` at 600px **and again** at 900px with the same value?

**Non-technical:** Cards go two-up from 600px up. The 900px rule says two columns again in different syntax.

**Technical:** 600px: `grid-template-columns: 1fr 1fr`. 900px: `repeat(2, 1fr)`. Identical used value — two equal columns, same gap. The 900px block does **not** go to 3 columns and does **not** change gap. Both work sections (experience 6 cards, projects 6 cards) share `.work-grid`, so the redundancy applies twice. Desktop never gets a 3×2 magazine layout (Q366). This is the cleanest “dead code” example in the sheet besides `.is-waiting`.

```css
@media (min-width: 600px) {
  .work-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 900px) {
  .work-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

### Q365. What does the 900px work-grid rule actually change? Dead code?

**Non-technical:** Nothing you can see. It is the same two columns.

**Technical:** Yes — redundant. `repeat(2, 1fr)` is the same used value as `1fr 1fr`. Cascade still “wins” at 900px with no visual change. Likely a copy-paste when skills got a 900px block. Delete the work 900px rule, or change it to `repeat(3, 1fr)` if you want a real desktop step (six cards would fill two rows). Interview: call it dead code before the reviewer does. Same honesty as the unused blink class: leftover from an earlier layout pass.

```css
@media (min-width: 900px) {
  .work-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

### Q366. Why not 3 columns on large screens for six cards?

**Non-technical:** Six cards would form two tidy rows of three. Two columns makes three rows and longer lines inside each card.

**Technical:** At `--max-w: 1100px`, 3 columns ≈ 340px content plus padding 1.5rem — still OK for a title + paragraph + tags. 2 columns ≈ 525px, easier measure for the long architecture blurb. Choice, not a bug — unlike the redundant 900px rule. `auto-fit` + `minmax(280px, 1fr)` would 1/2/3 without extra breakpoints. Six cards in 3×2 would scan faster; 2×3 keeps lines shorter inside each card. I would defend 2-col as readability, not claim the 900px rule is doing extra work.

```css
.work-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
```

---

### Q367. Why `.work-card` padding 1.5rem, panel, line border, radius 6px (same language as ticker/buttons)?

**Non-technical:** Cards, ticker, photo, and buttons share one “inset panel” look so the page feels like one system.

**Technical:** `--panel` fill, `--line` 1px, 6px radius is the surface token applied by convention, not a Sass mixin (single file, copy-paste). Padding 1.5rem is roomy; combined with 1.25rem grid gap the section is airy. No hover elevation on cards (only buttons `translateY`). No `article`-specific styles beyond the class — `<article class="work-card">` is styled as a card, not as a syndicatable article chrome. Dark vs light panel: `#171c2a` vs `#e7e3d6`. Same language as ticker and inputs so the page reads as one system.

```css
.work-card {
  padding: 1.5rem;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 6px;
}
```

---

### Q368. Why `.work-card-service` is tiny mono `--signal`?

**Non-technical:** `service: platform-architecture` is meant to look like a code identifier above the title.

**Technical:** 0.72rem mono, `margin-bottom: 0.6rem`, `color: var(--signal)`. **Specificity trap (Q369):** `.work-card p` is `0,1,1` and comes *after* `.work-card-service` (`0,1,0`). Both `color` and `margin-bottom` on the service line are overridden: you get `color: var(--muted)` and `margin-bottom: 1rem`. Font-family and font-size still apply. The “signal-colored slug” **does not win** in the cascade. Fix: `.work-card p.work-card-service` or `.work-card-service { color: var(--signal) !important }` (don’t) or `.work-card .work-card-service`. Interview gold: walk this in DevTools.

```css
.work-card-service {
  margin-bottom: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--signal);
}
```

---

### Q369. Why `.work-card p { margin-bottom: 1rem; color: var(--muted); }` — does that also hit `.work-card-service`?

**Non-technical:** Yes. The service line is a `<p>`, so the “body copy” rule restyles it.

**Technical:** HTML: `<p class="work-card-service">`. Selector `.work-card p` matches every p, including service. Specificity 0,1,1 > 0,1,0; source order later. Result: service is muted, 1rem below (not 0.6rem / signal). Card body paragraphs get the intended muted + 1rem before the tag list. `h3` is not a `p`. Tags are `li`. Honest: this is a bug relative to the author’s comments in the questions file. Tighten the body selector to `.work-card > p:not(.work-card-service)` or make service a `<p class="work-card-service">` with a more specific CSS rule.

```css
.work-card p {
  margin-bottom: 1rem;
  color: var(--muted);
}
```

---

### Q370. Why `.contact-lead` is `max-width: 50ch` (hero description was `42ch`)?

**Non-technical:** The contact blurb is allowed a slightly longer line than the hero intro.

**Technical:** 50 vs 42 is arbitrary hierarchy: hero is tighter, contact is a full sentence block under an h2 with more horizontal room (no photo column). Both `ch` relative to body sans, both `--muted`. 50ch at desktop is still less than the 1100px section, so the form (`max-width: 480px`) and the lead don’t share a width — the form is narrower than 50ch in many fonts (480px ≈ 48–50ch). Close, not matched.

```css
.contact-lead {
  max-width: 50ch;
  margin-bottom: 2rem;
  color: var(--muted);
}
```

---

### Q371. Why `.contact-form` is `display: grid; gap: 0.4rem; max-width: 480px`?

**Non-technical:** Fields stack in a modest column, not stretched to 1100px. Tight gap between a label and its input.

**Technical:** Grid with one implicit column. Children: label, input, label, input, label, textarea, button — seven rows. `gap: 0.4rem` is the small label→field spacing; **labels also have `margin-top: 0.75rem`** (Q372), so the gap between field N and label N+1 is 0.4 + 0.75. `max-width: 480px` is a typical form measure. No `grid-template-columns: 1fr 2fr` for a horizontal label layout. Netlify form does not care about CSS grid.

```css
.contact-form {
  display: grid;
  gap: 0.4rem;
  max-width: 480px;
}
```

---

### Q372. Why labels have `margin-top: 0.75rem` — how does that interact with grid gap for the first label?

**Non-technical:** Extra space appears above Name as well, not only between Email and the previous field.

**Technical:** The first child is `<label for="name">`. It gets `margin-top: 0.75rem` plus no previous gap. That is accidental top padding inside the form. `:first-child { margin-top: 0 }` would fix it. Between Message label and email input: input, then 0.4rem gap, then 0.75rem label margin. Using only `gap` and `label { margin-top: 0 }` with a larger `row-gap` on a two-row grouping would be cleaner. Mono 0.8rem muted labels match skills h3 size-ish.

```css
.contact-form label {
  margin-top: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--muted);
}
```

---

### Q373. Why inputs/textarea share padding, body font, paper color, panel background, line border?

**Non-technical:** Fields look like the cards and ticker — same panel, same hairline — with readable body type inside, not mono.

**Technical:** `font-family: var(--font-body)` overrides mono labels; users type in Plex Sans. `color: var(--paper)` for typed text; placeholder UA grey is unstyled. `background: var(--panel)` not `--ink`, so fields are visible on the page. Radius 6px. No explicit `width: 100%`; grid stretch (`justify-items: stretch` default) makes them 480px. Textarea uses the same rule (`rows="4"` in HTML). There is no `resize` CSS; UA allows vertical resize by default.

```css
.contact-form input,
.contact-form textarea {
  padding: 0.7rem;
  font-family: var(--font-body);
  color: var(--paper);
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 6px;
}
```

---

### Q374. Why no `:invalid` / `:focus` styles beyond the global `:focus-visible`?

**Non-technical:** A bad email does not turn the box red. Focus uses the same gold ring as links.

**Technical:** `:focus-visible` on `input, textarea` is the global 2px `--signal` outline. No `:user-invalid` / `:invalid { border-color: … }` — native bubble validation still runs because of HTML `required` and no `novalidate`. `:invalid` from page load would style empty required fields red immediately (bad UX); `:user-invalid` is the modern fix, unused. Dark inputs with only a gold outline can be easy to miss next to `--signal` ticker nearby. Acceptable for a demo; a product form would add error color and `aria-invalid`.

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
}
```

---

### Q375. Why `button { justify-self: start; border: none; cursor: pointer; }`?

**Non-technical:** Send message sizes to its label instead of stretching 480px, has no extra UA border, and shows a hand cursor.

**Technical:** Grid items stretch by default — without `justify-self: start` the submit would be a full-width 480px bar. `cursor: pointer` matches `.nav-bar-theme` (UA buttons are often the default arrow). `margin-top: 1.5rem` separates from the textarea more than the 0.4rem grid gap. `border: none` fights `.btn` (Q376). Selector is `.contact-form button`, not a global `button` — the theme toggle is unaffected. `type="submit"` in HTML is what actually submits; CSS only paints it.

```css
.contact-form button {
  margin-top: 1.5rem;
  justify-self: start;
  border: none;
  cursor: pointer;
}
```

---

### Q376. What happens if `border: none` fights `.btn` / `.btn-primary` border?

**Non-technical:** The submit button can be 1px smaller than the hero “View work” button and may shift layout relative to ghost buttons.

**Technical:** `.btn` sets `border: 1px solid transparent` (specificity 0,1,0). `.contact-form button` sets `border: none` (0,1,1) and wins. Primary fill is unchanged. Hero primary keeps the transparent border; form primary does not — 2px total height/width difference. Ghost is not used on the form. Remove `border: none` or set `border-color: transparent` to keep the `.btn` box model. Not a functional Netlify bug.

```css
.btn {
  border: 1px solid transparent;
}

.contact-form button {
  border: none;
}
```

---

### Q377. Why `.contact-social` is a row of `gap: 1.5rem` with no wrap?

**Non-technical:** GitHub, LinkedIn, LeetCode, Email in one row. On a 320px screen that row can overflow like the nav.

**Technical:** `display: flex; gap: 1.5rem; margin-top: 2.5rem; font-family: var(--font-mono)`. No `flex-wrap`. Four short words (GitHub, LinkedIn, LeetCode, Email) plus 4.5rem of gaps plus section padding. Usually OK at 320px — safer than the six-item nav — but `nowrap` is still a risk with 200% zoom. `ul` items are flex items; `list-style: none` already. No `justify-content`, so they start left under the 480px form, not centered like the footer. Adding a fifth link would make wrap almost mandatory.

```css
.contact-social {
  display: flex;
  gap: 1.5rem;
  margin-top: 2.5rem;
  font-family: var(--font-mono);
}
```

---

### Q378. Why social links are `--muted` and hover `--signal` — no underline still, because of the global `a` rule?

**Non-technical:** Quiet grey links that turn accent on hover. They never gain an underline.

**Technical:** Yes — `a { text-decoration: none }` is not undone here. Color-only hover (Q268) is the affordance: `--muted` at rest, `--signal` on hover. `:focus-visible` outline still applies via the global `a:focus-visible`, so keyboard users get a ring. Visited state remains indistinguishable. Light-mode muted `#5c6578` hovers to orange. No `transition` on `color`, so hover snaps. Restoring `text-decoration: underline` on `.contact-social a` would be the smallest WCAG-friendly fix without touching the nav.

```css
.contact-social a {
  color: var(--muted);
}

.contact-social a:hover {
  color: var(--signal);
}
```

---

### Q379. Why `.site-footer` has `position: relative; z-index: 1`?

**Non-technical:** The copyright bar sits above the falling icons the same way the main content does.

**Technical:** Footer is **outside** `main`, so it does not inherit `main`’s stacking context. `.fall` is `fixed; z-index: 0` covering the viewport, including the footer’s y-range. A static footer (in-flow, z-index ignored) would paint in the “in-flow” layer **under** a positioned z-index 0 sibling — rain over the copyright. `position: relative; z-index: 1` matches `main` and keeps type above icons. Header is 50, so if the footer ever overlapped the header it would lose; it doesn’t.

```css
.site-footer {
  position: relative;
  z-index: 1;
  max-width: 100vw;
  padding: 20px;
  text-align: center;
  background: var(--ink);
  border-top: 1px solid var(--line);
}
```

---

### Q380. What happens if z-index is removed — do falling icons paint over the footer?

**Non-technical:** They can. That is why z-index is there.

**Technical:** If you remove only `z-index` but keep `position: relative`, the footer is positioned with `auto`, later in the tree than `.fall` — often still on top by paint order. If you remove both, in-flow footer vs `.fall` `z-index: 0`: icons win, because positioned z-index 0 paints after in-flow blocks. Interview: the defensive pair is `relative` + `1`, same as `main`. Background `var(--ink)` would still paint, but 0.45-opacity SVGs would show on top of the copyright without the stacking lift. Don’t rely on “later sibling” luck.

```css
.site-footer {
  position: relative;
  z-index: 1;
}
```

---

### Q381. Why `max-width: 100vw` like the nav, not `--max-w`?

**Non-technical:** The footer is a full-width bar with a top hairline, not a 1100px centered caption.

**Technical:** Same `100vw` scrollbar pitfall as `.nav-bar` (Q315). `padding: 20px` matches nav, not section `1.5rem`. Text is centered so a 1100px `max-width` would look similar for a one-line copyright; full bleed is for the `border-top` spanning the viewport. `background: var(--ink)` matches body so rain is covered opaquely — unlike the translucent header. `100%` (or omitting max-width) would be safer than `100vw` and still full-bleed inside `body`.

```css
.site-footer {
  max-width: 100vw;
  padding: 20px;
  background: var(--ink);
}
```

---

### Q382. Why `text-align: center` and `border-top`?

**Non-technical:** A centered legal line with a hairline above, mirroring the header’s hairline below.

**Technical:** `border-top: 1px solid var(--line)` is the header’s `border-bottom` inverted so the page is bookended with the same hairline token. `text-align: center` on the footer centers the inner `<p>` (the p is block-level, 100% wide, text centered). No mono override — copyright uses `--font-body` at `--step-0`, quieter than the nav. No `color` override — `--paper`. Simple close. A flex footer with socials would need a different alignment; this footer is one legal line.

```css
.site-footer {
  text-align: center;
  border-top: 1px solid var(--line);
}
```

---

### Q383. Why no `@media (prefers-reduced-motion: reduce)` anywhere?

**Non-technical:** The CSS never listens to “reduce motion.” Rain, smooth scrolling, and button hops still run.

**Technical:** Confirmed: the 530-line sheet has zero `prefers-reduced-motion`. JS **does** handle it for the ticker only (`matchMedia` → full line swap every 3s, no type/erase). CSS animations (`fall`, dead `blink`) and `scroll-behavior: smooth` and `.btn:hover { transform }` are ungated. This is the highest-severity CSS a11y gap. Fix in one block: disable `.fall-icon` animation (or hide `.fall`), set `scroll-behavior: auto`, set `.btn:hover { transform: none }`. Vestibular disorders are the user story.

```css
html {
  scroll-behavior: smooth;
}

.fall-icon {
  animation: fall var(--t) var(--d) linear infinite;
}

.btn:hover {
  transform: translateY(-2px);
}
```

---

### Q384. Why theme is only class-based (`html.light`) and never `prefers-color-scheme` on first visit?

**Non-technical:** A first-time visitor with a light OS still gets the dark navy page until they click the sun.

**Technical:** `:root` is dark. `html.light` is the only override. Head script reads `localStorage.theme === "light"` only — no `matchMedia('(prefers-color-scheme: light)')`. No CSS `@media (prefers-color-scheme: light) { :root { … } }` either. Returning visitors who picked light are fine. First visit ignores OS. Combined with no `color-scheme` property (Q253), native widgets may disagree too. A respectable pattern: OS preference as default, class as override, persist in `localStorage`.

```css
:root {
  --ink: #10141f;
}

html.light {
  --ink: #f3f1ea;
}
```

---

### Q385. Why decorative emoji (sun/moon) live in CSS `content` rather than HTML?

**Non-technical:** The button looks like an icon, but the HTML is an empty `<button>`. Assistive tech gets little or no name.

**Technical:** `::before { content: "☀" }` / light `☾`. CSS `content` is decorative to many assistive-tech trees. Empty button: no accessible name (Q321–Q323). Theme state is the `light` class, not `aria-pressed`. Putting “Light mode” in HTML and swapping visibility with CSS still needs a text alternative that updates. Honest: this is a demo shortcut; production would use SVG plus `aria-label` (and `aria-pressed` from JS). The emoji also depends on a color-emoji font (Q322). Look is cheap; name is not.

```css
.nav-bar-theme::before {
  content: "☀";
}

html.light .nav-bar-theme::before {
  content: "☾";
}
```

---

### Q386. Why no print stylesheet (`@media print` hiding `.fall` and nav)?

**Non-technical:** Printing or “Save as PDF” still includes the sticky nav, gold buttons, and theoretically the rain.

**Technical:** No `@media print` and no `<link media="print">`. Print or “Save as PDF” would try to paint `fixed` rain (engines often skip animations), a sticky header repeating on each page, and `--ink` backgrounds eating toner. A 10-line print sheet: hide `.fall`, `.site-header`, `.hero-text-ticker`, `.nav-bar-theme`; set `background: white; color: black`; expand `a[href]::after { content: " (" attr(href) ")" }` for socials. Gap for a portfolio you might PDF for recruiters. Interview: I would add it before Open Graph, not instead of reduced-motion.

```css
/* no @media print in this file */
.fall {
  position: fixed;
  inset: 0;
}
```

---

### Q387. Why no container queries — only viewport breakpoints at 600 and 900?

**Non-technical:** Layout reacts to the browser window, not to “how wide is this section.”

**Technical:** `@container` is unused. Breakpoints: 600px (about 2-col, work 2-col) and 900px (nav type, hero grid, skills 3-col, redundant work 2-col). Sections are already viewport-width minus padding, so viewport ≈ container today. Container queries would matter if cards moved into a sidebar. `min(220px, 70%)` is a poor man’s container math on the figure. Honest: YAGNI for a one-column page; four skill groups in three columns is the real issue, not missing `@container`. I would not add container queries just to sound modern.

```css
@media (min-width: 600px) { /* about-grid, work-grid */ }
@media (min-width: 900px) { /* nav, hero, skills, work-grid again */ }
```

---

### Q388. Why `px` for some spacing (20px nav/footer) and `rem` everywhere else?

**Non-technical:** The header and footer inset does not grow when the user bumps the default font size; section gutters do.

**Technical:** `.nav-bar` and `.site-footer` use `padding: 20px`. Sections use `1.5rem` (24px at a 16px root). Mix is accidental inconsistency, not a 4px grid system. User font-size 20px: section padding becomes 30px, nav stays 20px — gutters diverge more. A reviewer prefers `1.25rem` on nav/footer so chrome scales with text. `px` remains reasonable for `outline: 2px`, `border: 1px`, `border-radius: 6px`/`4px`, `min(220px, 70%)`, `--max-w: 1100px`, `max-width: 480px`. The 20px pair is the one I would change.

```css
.nav-bar {
  padding: 20px;
}

section {
  padding: 4rem 1.5rem;
}

.site-footer {
  padding: 20px;
}
```

---

### Q389. Why no CSS logical properties beyond `margin-inline` (e.g. `padding-block`)?

**Non-technical:** Only centering uses the “inline axis” name. Everything else is top/left/right physical CSS.

**Technical:** `margin-inline: auto` on `section` and `.nav-bar`. Physical everywhere else: `left: -999px`, `padding-top`, `border-bottom`, `margin-top`, `grid-column`, `translateY`. `lang="en"` is LTR so it works. An Arabic translation would still park the skip link on the physical left and use `left: 1rem` on focus. Migrating to `inset-inline-start`, `padding-block`, `border-block-end` would be a consistency pass, not a user-facing bug today. Using one logical property is slightly inconsistent; I would either go all-in or keep `margin: 0 auto`.

```css
section {
  margin-inline: auto;
}

.skip-link {
  left: -999px;
}
```

---

### Q390. Why this file is a single 530-line sheet rather than split by component?

**Non-technical:** One request, no bundler, easy to read top to bottom in a vanilla demo.

**Technical:** Comments section the file: RESET, tokens, light, html/body, elements, skip, fall, nav, hero, about, skills, work, contact, footer. Splitting (`nav.css`, `hero.css`) without a bundler means many `<link>`s or `@import` (FOUC, extra RTTs). For 530 lines and a Netlify static drop, one file is the right production shape. Cost: no caching granularity, merge conflicts, and the dead bits (`is-waiting`, redundant 900px work-grid) hide in the middle. Interview close: I would keep one sheet until a build step exists; I would still delete dead rules.

```css
/* RESET */
/* GLOBAL COLOURS */
/* SKIP LINK */
/* FALL */
/* NAV-BAR */
/* HERO-TEXT */
/* ABOUT */
/* SKILLS */
/* WORK */
/* CONTACT */
/* FOOTER */
```

---
