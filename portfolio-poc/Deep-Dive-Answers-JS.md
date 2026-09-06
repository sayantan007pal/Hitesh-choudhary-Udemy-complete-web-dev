# Deep-dive answers — JavaScript (Q391–Q453)

Part 3 of the interview set. Source: current `js/main.js` (not the older ~60-line draft the questions describe).

Pair with [Deep-Dive-Questions.md](./Deep-Dive-Questions.md) Part 3 and `js/main.js`. Each answer has a **non-technical** take, a **technical** take, and a live snippet.

## Code drift (read this first)

The questions file was written against an older `main.js` that started at the theme toggle and was about 60 lines. **The live file is ~90 lines and does not match those line numbers or several APIs.** If a reviewer quotes the questions file, correct the record, then answer both the assumed code and the live code.

| Questions file assumes | Live `js/main.js` |
| --- | --- |
| Theme toggle is lines 1–4; no mobile-nav JS | Lines 6–23 are leftover mobile nav for `#navToggle` / `#navMenu`. Those ids are **not** in `index.html`. Guarded by `if (navToggle && navMenu)`, so it does not throw. Theme toggle is lines 25–28. |
| Pipelines: `auth_request…`, `job_description…`, `resume…`, `skill_list…` | `resume.pdf -> parse -> embed -> match`, `audio_stream -> deepgram_stt -> llm -> tts_response`, `auth_request -> rate_limiter -> captcha -> session`, `skill_list -> qlora_model -> interview_questions` |
| `tickerEl.closest(".hero-text-ticker")` | Only `document.getElementById('tickerText')`. No `closest`. |
| JS adds/removes `is-waiting` around the 1800ms pause | **Never.** CSS still has `.hero-text-ticker.is-waiting .hero-text-ticker-cursor { animation: blink … }`, so the caret never blinks. |
| No `prefers-reduced-motion` (Q450 asks why it is missing) | **Present.** `matchMedia('(prefers-reduced-motion: reduce)')`. If true: set the full line, `wait(3000)`, skip type/erase. |
| `wait(ms)` used only once with `1800` | Used twice: `1800` after typing, `3000` on the reduced-motion path. |

Other live facts a reviewer will poke:

- `themeToggle` is **not** guarded. Missing id → `null.onclick =` throws at script run, and the ticker never starts.
- `runTicker()` is called immediately at the bottom. Script is `defer` at the end of `<body>`. No `DOMContentLoaded`. No `visibilitychange` pause. No try/catch if the node is removed.
- Vanilla JS: no TypeScript, no bundler, no modules (`type="module"` is not set).

```js
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  // ...
}

document.getElementById('themeToggle').onclick = () => {
  const light = document.documentElement.classList.toggle('light');
  localStorage.theme = light ? 'light' : 'dark';
};
```

---

## Lines 25–28 — theme toggle

(The questions file labels this “lines 1–4.”)

### Q391. Why `getElementById("themeToggle")` instead of `querySelector(".nav-bar-theme")`?

**Non-technical:** The sun/moon control is one specific button. An id is a name tag on that one control. A class is a style group — more than one thing on the page could share it.

**Technical:** `getElementById` looks up a unique id and does not parse a CSS selector. `querySelector(".nav-bar-theme")` would work today because there is only one match, but it is the wrong contract: classes are for styling and can be reused; ids are for JS hooks. If a second `.nav-bar-theme` appeared, `querySelector` would silently bind the first. If the id is missing, both return `null` — and this line still throws on `.onclick =` because there is no null check (unlike the leftover nav block above it). Live HTML: `<button type="button" class="nav-bar-theme" id="themeToggle"></button>`.

```js
document.getElementById('themeToggle').onclick = () => {
  const light = document.documentElement.classList.toggle('light');
  localStorage.theme = light ? 'light' : 'dark';
};
```

### Q392. What happens if the id is missing or misspelled — when does it throw?

**Non-technical:** The theme button stops working, and so does the typing ticker, even though they look unrelated. The page still renders; only the script dies.

**Technical:** `getElementById` never throws — it returns `null`. The throw is the next property write: `null.onclick = …` → `TypeError: Cannot set properties of null (setting 'onclick')`. That happens **when `main.js` runs**, not on click. Because this statement sits **before** the ticker setup, an uncaught throw aborts the rest of the file: `runTicker()` never runs. Contrast the leftover nav: `getElementById('navToggle')` is also `null` in the live HTML, but `if (navToggle && navMenu)` short-circuits. Theme is the ungarded lookup. A reviewer-friendly fix: `const el = document.getElementById('themeToggle'); if (el) el.addEventListener('click', …)`.

```js
document.getElementById('themeToggle').onclick = () => { /* throws here if null */ };

const tickerEl = document.getElementById('tickerText'); // never reached if the line above threw
runTicker();
```

### Q393. Why `.onclick =` instead of `addEventListener("click", …)`?

**Non-technical:** One button, one job. Assigning the click handler is the shortest way to say “when this is clicked, do that.”

**Technical:** `.onclick =` is a DOM0 handler: one slot, assignment replaces whatever was there. `addEventListener` is DOM2: many listeners, `removeEventListener` with the same function reference, `{ once, passive, capture }` options. This file already uses `addEventListener` on the dead nav toggle — mixed style. For a one-off theme button, `.onclick =` works. The cost is: a later script (analytics, an extension, a second bundle) that also sets `.onclick` **wipes** this handler with no warning. Interview answer: “I’d use `addEventListener` for consistency with the nav block and so a second listener cannot clobber it.”

```js
// live theme: one slot
document.getElementById('themeToggle').onclick = () => { /* … */ };

// live leftover nav: addEventListener (never binds — ids are missing)
navToggle.addEventListener('click', () => { /* … */ });
```

### Q394. What happens if another script also assigns `onclick`?

**Non-technical:** Only the last writer wins. The first click behavior disappears.

**Technical:** `element.onclick` is a single data property. Second assignment overwrites the first function; the old function is eligible for GC if nothing else holds it. `addEventListener` would stack both. Load order matters: `main.js` is `defer` at the end of body, so a classic script in `<head>` that set `onclick` earlier would be replaced by this file; a later deferred/async script would replace this file. There is no other first-party script in this repo, so today it is safe. Extensions that rewrite `onclick` are the realistic risk.

```js
themeToggle.onclick = handlerA;
themeToggle.onclick = handlerB; // handlerA is gone; only handlerB fires
```

### Q395. Why an arrow function?

**Non-technical:** It is a short “do this” block. Nothing inside needs to talk about “this button” as `this`.

**Technical:** An arrow has lexical `this` and no `arguments` object. The handler never uses `this` — it uses `document.documentElement` and `localStorage` — so an arrow vs `function () {}` is behaviorally the same here. In a classic (non-module) script, a `function` handler’s `this` would be the button; an arrow’s `this` would be `window` (or `undefined` under `'use strict'` / `type="module"`). If someone later wrote `this.setAttribute('aria-pressed', …)`, the arrow would be the wrong shape. Interview: “I used an arrow because the body is a closure over globals, not the element. If I needed `this`, I’d use a regular function or `event.currentTarget`.”

```js
document.getElementById('themeToggle').onclick = () => {
  const light = document.documentElement.classList.toggle('light');
  localStorage.theme = light ? 'light' : 'dark';
};
```

### Q396. Why `classList.toggle("light")` and why capture its return value?

**Non-technical:** One click adds light mode if you were dark, and removes it if you were light. The return value is “are we in light mode now?” so storage can remember that.

**Technical:** `DOMTokenList.toggle(token)` adds the token if absent and removes it if present. The return value is a **boolean: `true` if the token is now in the list**. That is the post-toggle state, not “did we add it.” Capturing it avoids a second `classList.contains('light')` read and keeps the storage write in lockstep with the class the CSS actually sees. Tokens live on `<html>` (`document.documentElement`) because the inline head script and `html.light { … }` rules in `styles.css` already use that node — toggling `body` would not flip the tokens.

```js
const light = document.documentElement.classList.toggle('light');
localStorage.theme = light ? 'light' : 'dark';
```

### Q397. What does `toggle` return when the class is added vs removed?

**Non-technical:** After the click, “is the light look on?” Yes → `true`. No → `false`.

**Technical:** Spec: `toggle` returns `true` if the class is **present after the call**, `false` if it is **absent**. First visit, no `html.light`: click adds `.light`, returns `true`, stores `'light'`. Second click removes `.light`, returns `false`, stores `'dark'`. Optional second argument `toggle('light', force)` can force add/remove; this code does not use it. Do not confuse with `classList.add`, which returns `undefined`.

```js
// dark page (no class) → add → true
document.documentElement.classList.toggle('light'); // true

// light page (class present) → remove → false
document.documentElement.classList.toggle('light'); // false
```

### Q398. Why write `localStorage.theme = light ? "light" : "dark"` rather than `setItem`?

**Non-technical:** Same shelf, shorter handwriting. The head script already reads `localStorage.theme`, so the write matches the read.

**Technical:** The `Storage` object exposes named properties for keys. `localStorage.theme = x` is equivalent to `localStorage.setItem('theme', String(x))` for a normal key. The inline head script uses property access (`localStorage.theme === "light"`), so this write stays in the same dialect. `setItem`/`getItem` are the methods you want if the key might collide with `Storage` API names (`length`, `getItem`, `key`, …) or if you want to store `null` distinctly (`setItem` stringifies `null` to `"null"`; property set of `null` also stringifies). `'theme'` is safe either way. Both throw the same `QuotaExceededError` / security errors when storage is blocked — there is still no `try/catch` here.

```js
localStorage.theme = light ? 'light' : 'dark';
// equivalent:
// localStorage.setItem('theme', light ? 'light' : 'dark');
```

### Q399. Why store `"dark"` when dark is the absence of class (the inline head script only checks `"light"`)?

**Non-technical:** The page’s default look is dark. Saving the word `"dark"` means “the user chose dark,” not “we never asked.” The boot script only needs to know whether to turn the lights on.

**Technical:** The head script is a one-way door: `if (localStorage.theme === "light") classList.add("light")`. Anything other than the string `"light"` — `"dark"`, `undefined`, `""`, `"Light"` — leaves `<html>` classless, and `:root` tokens paint dark. Storing `"dark"` is redundant for restore, but it records an explicit choice. That matters if you later add `prefers-color-scheme`: you can tell “user picked dark” from “user has never toggled, follow OS.” Today the page does **not** read `prefers-color-scheme`, so first visit is always dark regardless of OS. Honest gap: a first-time visitor with OS light mode still gets dark until they click.

```html
<script>
  if (localStorage.theme === "light")
    document.documentElement.classList.add("light");
</script>
```

```js
localStorage.theme = light ? 'light' : 'dark';
```

### Q400. What happens if you store `"dark"` then the head script runs — correct theme?

**Non-technical:** Yes. Reload stays dark. Reload after choosing light stays light.

**Technical:** The head script runs on the **next** navigation/load, before `styles.css` paints (it sits above the stylesheet link). `"dark" === "light"` is false, so `.light` is not added. `:root` tokens are the dark palette (`--ink: #10141f`, `--paper: #f3f1ea`). Correct. On the click itself the class already flipped in-place; storage is only for the next load. Edge: if some other code wrote `localStorage.theme = "Light"` (capital L), restore would fail closed to dark because of the strict `=== "light"` check — that is intentional.

```js
// next page load, head script:
if (localStorage.theme === "light") // "dark" → skip
  document.documentElement.classList.add("light");
// :root dark tokens apply → correct
```

### Q401. What happens if `localStorage` throws here (private mode) — does the class still toggle on screen?

**Non-technical:** The colors still flip for this visit. The choice may not survive a refresh. The ticker keeps running.

**Technical:** Order in the handler is (1) `classList.toggle('light')` (2) `localStorage.theme = …`. Step 1 mutates the DOM before step 2. If step 2 throws (`QuotaExceededError` in older Safari private windows, `SecurityError` if storage is disabled), the exception is **inside the click handler**. It does not unwind the class change, and it does not stop `runTicker` (already looping). There is **no `try/catch`**. Each later click still toggles visually and throws again on the write. Contrast the head script (Q23 in the HTML set): a throw **there** can abort parsing of later `<head>` nodes depending on the engine; a throw **here** is contained to the event. Interview fix: wrap only the storage write.

```js
document.getElementById('themeToggle').onclick = () => {
  const light = document.documentElement.classList.toggle('light'); // already applied
  localStorage.theme = light ? 'light' : 'dark'; // may throw; no try/catch
};
```

### Q402. Why no `aria-pressed` or `aria-label` update on click?

**Non-technical:** A screen-reader user lands on a button with no name. Sighted users see a sun or moon from CSS. Assistive tech does not get “dark mode, on/off.”

**Technical:** The live button is empty: no text, no `aria-label`, no `aria-pressed`. The glyph is `::before { content: "☀" }` / `html.light … content: "☾"`. CSS `content` on a button is **not** a reliable accessible name (support is inconsistent; many SRs ignore it). JS never updates ARIA on click, so even if you added `aria-pressed="false"` in HTML, it would go stale. Correct pattern: `aria-label="Toggle light theme"` (or two labels that swap) and `aria-pressed={light}` after toggle. The leftover nav code *does* sync `aria-expanded` — that is the model this handler should copy. This is one of the gaps listed in [Deep-Dive-Answers.md](./Deep-Dive-Answers.md).

```html
<button type="button" class="nav-bar-theme" id="themeToggle"></button>
```

```js
// live: class + storage only — no ARIA
const light = document.documentElement.classList.toggle('light');
localStorage.theme = light ? 'light' : 'dark';
```

### Q403. Why this runs at parse time of `main.js` — and how does `defer` plus end-of-body make `getElementById` safe?

**Non-technical:** The script waits until the button exists, then attaches the click. You never have to press “start.”

**Technical:** Classic scripts run top to bottom as soon as they execute. There is no `DOMContentLoaded` wrapper. Two facts make line 25 safe **in the current HTML**:

1. The tag is at the **end of `<body>`**, so the parser has already created `#themeToggle` (line 106) and `#tickerText` (line 133).
2. **`defer`** means: download in parallel, run after the document is fully parsed, in order, **before** `DOMContentLoaded`.

Either of those alone would be enough here. Together they are belt and suspenders. `const` / `let` at top level in a classic script live in the script’s lexical environment (not as `window.themeToggle`). `defer` + parser-inserted script also waits for prior deferred scripts; this page has only one.

```html
<script src="js/main.js" defer></script>
```

```js
document.getElementById('themeToggle').onclick = () => { /* runs once, at script execution */ };
```

### Q404. What happens if you remove `defer` and move this script into `<head>` without waiting for `DOMContentLoaded`?

**Non-technical:** Theme and ticker both die. The HTML still shows. The sun button does nothing.

**Technical:** Parser hits `<script src="js/main.js">` in `<head>` before `<body>`. `getElementById('themeToggle')` is `null` → throw on `.onclick`. The leftover nav `if` would still be safe. Everything after the throw — pipelines, `runTicker` — never runs. Without `defer`, a head script also **blocks HTML parsing** while it downloads and runs (FOUC/TTI hit). Fixes that work: keep `defer` in `<head>`, use `type="module"` (deferred by default), or wrap in `DOMContentLoaded` / `document.readyState` checks. Do not use `async` here: `async` can run before the body exists.

```html
<!-- dangerous: head, no defer, no DOMContentLoaded -->
<head>
  <script src="js/main.js"></script>
  <!-- #themeToggle does not exist yet -->
</head>
```

---

## Lines 36–41 — `pipelines`

(The questions file labels this “lines 6–11.”)

### Q405. Why this data lives in JS as a `const` array of strings, not in HTML or a JSON file?

**Non-technical:** These lines are copy you change when your projects change. Keeping them next to the typing logic means one file to edit, no extra download.

**Technical:** Four strings do not justify a network fetch (`pipelines.json` would be another request, another failure mode, and you’d still need JS to render them). Putting them in HTML (`<span data-line>` or empty list items) would work without JS for the first line, but the type/erase loop would still need JS, and the markup would be noise in the hero. A `const` array is parsed with the script, tree-shakeable in a bundler (this project has none), and easy to swap in an interview. Downside: no-JS users see an empty `#tickerText` (the `$` and `▍` still show). A progressive-enhancement version would put the first pipeline in the HTML and let JS take over.

```js
const pipelines = [
  'resume.pdf -> parse -> embed -> match',
  'audio_stream -> deepgram_stt -> llm -> tts_response',
  'auth_request -> rate_limiter -> captcha -> session',
  'skill_list -> qlora_model -> interview_questions'
];
```

### Q406. Why these four strings specifically (`auth_request…`, `job_description…`, `resume…`, `skill_list…`)?

**Non-technical:** The ticker is a one-line résumé of systems you actually shipped. Each arrow chain is a pipeline on the page, not lorem ipsum.

**Technical:** The questions file assumes X: `auth_request…`, `job_description…`, `resume…`, `skill_list…`. The live file does Y — four different strings that map to work/project cards:

| Live ticker line | Story on the page |
| --- | --- |
| `resume.pdf -> parse -> embed -> match` | Resume Parsing Pipeline + AI Resume Matching Engine |
| `audio_stream -> deepgram_stt -> llm -> tts_response` | Live interview audio: speech-to-text → model → spoken reply |
| `auth_request -> rate_limiter -> captcha -> session` | Auth System Hardening (Redis rate limit, reCAPTCHA, session) |
| `skill_list -> qlora_model -> interview_questions` | QLoRA / Questionify-style question generation |

`job_description…` is **not** in the live array. If a reviewer reads the questions file aloud, say so, then walk the live four. They are marketing, not executable code — changing a string does not call Deepgram.

```js
const pipelines = [
  'resume.pdf -> parse -> embed -> match',
  'audio_stream -> deepgram_stt -> llm -> tts_response',
  'auth_request -> rate_limiter -> captcha -> session',
  'skill_list -> qlora_model -> interview_questions'
];
```

### Q407. Why snake_case and `->` — whose dialect is that?

**Non-technical:** It looks like a terminal pipeline or a data-flow diagram: noun in, noun out. Matches the `$` prompt in the hero.

**Technical:** `snake_case` is the Unix / Python / SQL identifier dialect, not JS (`camelCase`) and not CSS (`kebab-case`). `->` is the ASCII arrow used in shell examples, Hadoop-style job graphs, and this page’s `.work-card-service` flavor (`service: resume-parser`). It is visual language, not the JS `=>` fat arrow and not a function. Screen readers will say “dash greater than,” which is clumsy; a visually hidden comma-separated version would be kinder. The strings are ASCII, so `text.slice` / `eraseText` will not split surrogate pairs.

```js
'audio_stream -> deepgram_stt -> llm -> tts_response'
```

### Q408. What happens if the array is empty?

**Non-technical:** The ticker breaks. You may get a stuck empty line, the word “undefined,” or a console that spam-errors. The rest of the page is fine.

**Technical:** `runTicker` does `pipelines[i % pipelines.length]`. In JS, `n % 0` is **`NaN`** (IEEE remainder; not a throw). `pipelines[NaN]` is `undefined`. Then the two branches diverge:

- **Reduced motion:** `tickerEl.textContent = undefined` → IDL converts to the string `"undefined"`. The loop `await wait(3000)` forever, flashing the word “undefined.”
- **Type path:** `typeText(undefined)` schedules `undefined.slice(0, i)` inside `setInterval`. That throws `TypeError` **in the timer callback**. The Promise **never resolves or rejects** (exceptions in `setInterval` are uncaught; they do not reject the wrapping Promise). The interval is not cleared, so the console errors every 35ms forever. `await typeText` hangs. `i++` never runs.

Guard: `if (!pipelines.length) return;` at the top of `runTicker`.

```js
const line = pipelines[i % pipelines.length]; // length 0 → NaN index → undefined
```

### Q409. What happens if you add a 200-character line — CSS `min-height: 2.6em` and `min-width: 0`?

**Non-technical:** The box grows taller and the words wrap. Typing takes several seconds. The layout around it should not shove the photo sideways on desktop.

**Technical:** `.hero-text-ticker` is `min-height: 2.6em` (floor, not a cap) with a wrapping flex child `.hero-text-ticker-line { flex: 1; min-width: 0; }`. `min-width: 0` is the classic flex fix so the item may shrink below its content’s intrinsic width; without it, a 200-char mono string can overflow the card. Wrap + growing height: the hero grid row grows; on `min-width: 900px` the photo is `grid-row: 1 / span 5`, so extra ticker height can still unbalance the column. Timing: `typeText` is `(length + 1) * 35ms` (the extra tick is the initial `""`). 200 chars → `201 * 35 = 7035ms` to type, then 1800ms hold, then `(200 + 1) * 20 = 4020ms` to erase. Reduced-motion path still swaps the whole string in one assignment and waits 3s, so a long line is fine there. No CSS `overflow` on the ticker; wrapping is the valve.

```css
.hero-text-ticker { min-height: 2.6em; }
.hero-text-ticker-line { flex: 1; min-width: 0; }
```

---

## Lines 43–44 — ticker DOM refs

(The questions file labels this “lines 13–14” and assumes a `closest` call.)

### Q410. Why `getElementById("tickerText")` then `tickerEl.closest(".hero-text-ticker")`?

**Non-technical:** The questions file describes a two-step lookup: find the typing span, then climb to the surrounding box. The live page only finds the span.

**Technical:** The questions file assumes X: `const tickerEl = document.getElementById("tickerText")` then `tickerEl.closest(".hero-text-ticker")`, almost certainly so JS could add `is-waiting` on the **box** (the CSS selector is `.hero-text-ticker.is-waiting .hero-text-ticker-cursor`). The live file does Y: only the first lookup. There is no parent ref, and `is-waiting` is never toggled, so `closest` would be unused even if it were there. Live HTML already has `id="tickerText"` on the inner span; the box has only a class.

```js
const tickerEl = document.getElementById('tickerText');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### Q411. What does `closest` do, and what happens if the ancestor class is renamed in CSS/HTML but not here?

**Non-technical:** `closest` means “walk up the family tree until you find this class.” If you rename the box in HTML and forget JS, the climb returns nothing.

**Technical:** `Element.closest(selector)` starts at the element (inclusive) and walks `parentElement` until a match or `null`. It does not search siblings or down. If the questions-file code ran and `.hero-text-ticker` were renamed, `closest` would return `null`, and `null.classList.add('is-waiting')` would throw — **after** typing, on the first pause. Live file: this cannot happen because there is no `closest`. If you rename `#tickerText`, `getElementById` returns `null` and the first `.textContent` write inside `runTicker` / `typeText` throws instead. Prefer ids for JS, classes for CSS, so a visual rename does not break behavior.

```js
// questions file (not live):
tickerEl.closest(".hero-text-ticker"); // null if class renamed → later .classList throws

// live: no closest
const tickerEl = document.getElementById('tickerText');
```

### Q412. Why not give the ticker box its own id?

**Non-technical:** You only write into the words, not the frame. One id on the words is enough.

**Technical:** Live JS never needs the box. An id on `.hero-text-ticker` would be the right hook **if** you added `is-waiting` (clearer than `closest`, survives markup rearrangements as long as the id moves with the box). Today that would be dead API. The cursor and `$` prompt stay in HTML; JS only mutates `#tickerText`. That split is correct: static chrome in markup, changing copy in JS.

```html
<div class="hero-text-ticker">
  <span class="hero-text-ticker-prompt">$</span>
  <span class="hero-text-ticker-line">
    <span class="hero-text-ticker-text" id="tickerText"></span
    ><span class="hero-text-ticker-cursor">▍</span>
  </span>
</div>
```

### Q413. What happens if `#tickerText` is missing — which line throws first, 13 or 14?

**Non-technical:** Theme still works. The ticker never types. The console shows a TypeError once the loop tries to put text in a missing box.

**Technical:** The questions file assumes X: line 13 `getElementById` then line 14 `closest` — `closest` would throw first (`null.closest is not a function`), because `getElementById` returning `null` is silent. The live file does Y: there is **no line 14 `closest`**. Line 43 `const tickerEl = document.getElementById('tickerText')` does **not** throw. Line 44 `matchMedia` does not use `tickerEl`. The first throw is later, when `runTicker()` actually writes:

- reduced motion: `tickerEl.textContent = line` immediately
- otherwise: `typeText`’s first interval tick (`tickerEl.textContent = text.slice(0, i)`), 35ms after start

`Cannot set properties of null (setting 'textContent')`. Theme toggle already ran successfully (it is earlier and has its own id). Interview correction: “Neither 13 nor 14 in the live file throws; lookup is silent; the write throws.”

```js
const tickerEl = document.getElementById('tickerText'); // null, no throw
runTicker(); // first tickerEl.textContent = … throws
```

### Q414. Why are these `const` at module (script) scope?

**Non-technical:** One shared handle to the ticker, reused by type, erase, and the loop. You are not allowed to accidentally point it at something else later.

**Technical:** This file is a **classic script**, not `type="module"`. Top-level `const` / `let` still create a **lexical binding** in the script scope — they are **not** `window.tickerEl`. `var` at top level would be. `const` prevents reassignment (`tickerEl = document.body` would throw). All three functions close over the same node. Cost: the node is never released; if you `remove()` it from the DOM, the loop still holds it and keeps writing to a detached element (see Q452). A module would give a real module scope and `'use strict'` by default; this page does not use one.

```js
const tickerEl = document.getElementById('tickerText');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

---

## Lines 46–63 — `runTicker`

(The questions file labels this “lines 16–28.”)

### Q415. Why `async function runTicker` instead of a recursive `setTimeout` chain?

**Non-technical:** The story is “type this, pause, erase, next line, forever.” `async`/`await` lets you write that story top to bottom instead of nesting timers inside timers.

**Technical:** `typeText`, `eraseText`, and `wait` each return Promises. `await` sequences them without callback pyramid. A recursive `setTimeout` version would re-enter `runTicker` (or a step function) from each `resolve`. That works, but cancellation, error handling, and reading the code are worse. `async` + `while (true)` is still just Promises: each `await` yields to the event loop, so this is **not** a busy spin. Alternative: a single `requestAnimationFrame` state machine (`'type' | 'hold' | 'erase'`). Heavier than this demo needs.

```js
async function runTicker() {
  let i = 0;
  while (true) {
    const line = pipelines[i % pipelines.length];
    if (prefersReducedMotion) {
      tickerEl.textContent = line;
      await wait(3000);
    } else {
      await typeText(line);
      await wait(1800);
      await eraseText();
    }
    i++;
  }
}
```

### Q416. Why `while (true)`? When does this loop ever stop?

**Non-technical:** It is a marquee. It is supposed to run until you leave the page.

**Technical:** There is no `break`, no max iteration, no `AbortController`. It stops when: the document is torn down (navigation, tab close), the script context dies, or an awaited Promise **rejects** / a tick **throws** (empty `pipelines` on the type path, `tickerEl` null, etc.). An uncaught throw in an `async` function rejects its implicit Promise; **nothing awaits `runTicker()`**, so that becomes an unhandled rejection and the loop is done. `while (true)` with `await` is the idiomatic infinite async iterator here. `for (;;)` would be the same.

```js
async function runTicker() {
  let i = 0;
  while (true) {
    // … awaits … then i++
  }
}
runTicker(); // return value discarded; rejection = unhandled
```

### Q417. What happens to CPU/battery with an infinite async loop of intervals?

**Non-technical:** It is a small, repeating timer, not a tight loop that pins a core. It still wakes the phone more often than a static heading would.

**Technical:** Between awaits the stack is empty. Cost is the active interval:

| Phase | Timer | Cadence |
| --- | --- | --- |
| Type | `setInterval` | 35ms |
| Hold | `setTimeout` (`wait`) | 1800ms once |
| Erase | `setInterval` | 20ms |
| Reduced motion | `setTimeout` | 3000ms once |

Background tabs: browsers throttle `setTimeout`/`setInterval` (often to ≥1000ms in Chrome). `requestAnimationFrame` pauses harder; this code does not use it. There is **no `visibilitychange` pause** (Q451), so hidden tabs still pay throttled timer wakeups. Six CSS `fall` animations are a bigger paint cost than this JS. Reduced-motion users skip the 20/35ms intervals entirely — better for vestibular needs and for battery.

```js
}, 35); // typeText
}, 20); // eraseText
await wait(1800); // hold
await wait(3000); // reduced-motion swap
```

### Q418. Why `i % pipelines.length` instead of resetting `i` to 0?

**Non-technical:** After the last line, start over. The remainder operator is the wrap.

**Technical:** `i` is an integer that only increases. `i % n` maps it into `[0, n)`. Resetting (`if (i === pipelines.length) i = 0`) is equivalent and avoids theoretically growing `i` toward `Number.MAX_SAFE_INTEGER` (9e15). At four lines and several seconds per cycle, overflow is not a real risk. `%` also works if `i` is ever set to a large number; a reset-only version needs `i` to hit `length` exactly. Empty array: `% 0` is `NaN` (Q408 / Q419) — a reset version would also need a length check.

```js
const line = pipelines[i % pipelines.length];
i++;
```

### Q419. What happens if `pipelines.length` is 0 (modulo by zero)?

**Non-technical:** JavaScript does not crash with “division by zero” here. You get a broken ticker (see Q408).

**Technical:** Remainder with a zero divisor yields **`NaN`** for finite numbers (`1 % 0 === NaN`). It does **not** throw. `pipelines[NaN]` is `undefined` (the index is canonicalized; there is no `"NaN"` own property). Then: reduced motion writes `"undefined"`; `typeText` throws inside the interval and hangs the `await` (Q408). Interview trap: people quote IEEE “division by zero is Infinity”; remainder is a different operation (`n - d * trunc(n/d)`), and JS’s `%` with 0 is NaN.

```js
0 % 0; // NaN
1 % 0; // NaN
pipelines[1 % 0]; // pipelines[NaN] → undefined
```

### Q420. Why `await typeText(line)` then add `is-waiting`, `await wait(1800)`, remove class, `await eraseText()`?

**Non-technical:** The questions file wants a blinking caret while the finished line sits there, then a delete. The live page pauses, but the caret never blinks.

**Technical:** The questions file assumes X:

```js
await typeText(line);
box.classList.add("is-waiting");
await wait(1800);
box.classList.remove("is-waiting");
await eraseText();
```

The live file does Y:

```js
await typeText(line);
await wait(1800);
await eraseText();
```

No add, no remove. CSS still gates blink on `.hero-text-ticker.is-waiting`. Result: the 1800ms readable pause **does** happen; the caret stays solid (`▍` always visible). Q339–Q341 in the CSS set is the same bug from the other side. Reduced-motion branch skips type, wait-1800, and erase entirely (full string + 3000ms).

```css
.hero-text-ticker.is-waiting .hero-text-ticker-cursor {
  animation: blink 1s step-end infinite;
}
```

### Q421. Why 1800ms specifically?

**Non-technical:** Long enough to read a one-line pipeline, short enough that the hero still feels alive.

**Technical:** Arbitrary UX constant — not derived from string length. Longest live line is 51 chars; at ~12–16 chars/sec reading speed, ~3–4s would be more comfortable, so 1800ms is a bit snappy (especially on `audio_stream -> deepgram_stt -> llm -> tts_response`). It is independent of type/erase rates (35ms / 20ms). Reduced motion uses **3000ms** instead, so the two paths do not even share the hold duration. No `prefers-reduced-motion` media in CSS changes this number; only the JS boolean switches the whole algorithm. Easy interview tweak: `const HOLD_MS = 1800`.

```js
await typeText(line);
await wait(1800);
await eraseText();
```

### Q422. What happens if you forget to `remove` `is-waiting` before erase — cursor still blinking while deleting?

**Non-technical:** In the old design, yes — the caret would keep flashing while letters disappear, which looks like “still idle.” Live code cannot forget a remove it never does.

**Technical:** Questions file assumes X: `is-waiting` on the box during the hold. Forgetting `classList.remove` would leave the CSS animation running through `eraseText` and the next `typeText` until something else removed the class (nothing would). Live file does Y: the class is never added, so there is nothing to forget; blink CSS is dead. If you implement the intended design, remove the class **before** `eraseText` (or use `is-waiting` only for the hold state machine).

```js
// live: no class to forget
await typeText(line);
await wait(1800);
await eraseText();
```

### Q423. Why is `is-waiting` a CSS class name that JS must know — coupling?

**Non-technical:** The stylesheet and the script agreed on a secret handshake. One side walked away. The handshake is still written on the CSS wall.

**Technical:** Class names shared across CSS and JS are an API. The questions file assumes JS owns that API. Live JS **does not mention** `is-waiting`. Live CSS still does. That is leftover coupling: a rename in CSS would change nothing in behavior today; adding the JS later would have to rediscover the exact string. Better contracts: `data-state="waiting"` (CSS `[data-state="waiting"]`), or a CSS variable `--cursor-blink: 1` set from JS. Honest answer: “The blink is specified, not wired. I’d either delete the CSS or add the class toggles.”

```css
.hero-text-ticker.is-waiting .hero-text-ticker-cursor {
  animation: blink 1s step-end infinite;
}
```

### Q424. Why `i++` at the end rather than at the start?

**Non-technical:** Start at line zero, show it, then move to the next. Incrementing first would skip the first line unless you started at `-1`.

**Technical:** `let i = 0`; read `pipelines[i % length]`; after the awaits, `i++`. First iteration is index 0. Increment-at-start needs `let i = -1` or a `do/while`. Putting `i++` after the awaits also means a throw mid-iteration does **not** advance `i` — retry would show the same line (there is no retry). Using `%` at read time means you never assign `i = 0` on wrap; `i` is a monotonically increasing counter.

```js
let i = 0;
while (true) {
  const line = pipelines[i % pipelines.length];
  // … await work …
  i++;
}
```

### Q425. Why not `for await` or a generator?

**Non-technical:** A generator that yields lines forever is elegant and more code than four strings need.

**Technical:** `for await (const line of cycle(pipelines))` would need an async generator that `yield`s each string (and maybe the delays). `while (true)` + index is fewer moving parts and easier to step through in DevTools. `for await` of a **sync** array does not loop forever — it ends after four items. You would still wrap with an infinite iterator. This demo’s audience is “can you sequence Promises,” not “can you write `Symbol.asyncIterator`.” Valid refactor if the ticker gains pause/resume: a generator you can `break` from.

```js
async function runTicker() {
  let i = 0;
  while (true) {
    const line = pipelines[i % pipelines.length];
    // …
    i++;
  }
}
```

---

## Lines 65–74 — `typeText`

(The questions file labels this “lines 30–42.”)

### Q426. Why return a `Promise` wrapping `setInterval`?

**Non-technical:** `setInterval` is an old alarm clock. `await` needs a Promise. This function is the adapter: ring until the word is done, then tell `runTicker` it may continue.

**Technical:** `setInterval` is callback-based and does not return a Promise. The constructor `new Promise(resolve => { … resolve() })` is the standard promisify. `resolve` is called once, after `clearInterval`. There is no `reject` path (a throw in the tick is an uncaught timer error, **not** a rejection — Q408). `runTicker` can then `await typeText(line)` and be sure `#tickerText` holds the full string (see Q430) before `wait(1800)`. Alternative: promisified `setTimeout` recursion (`await wait(35); write next char`) — easier to cancel, one extra function call per char.

```js
function typeText(text) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      tickerEl.textContent = text.slice(0, i);
      i++;
      if (i > text.length) { clearInterval(interval); resolve(); }
    }, 35);
  });
}
```

### Q427. Why `let i = 0` and `text.slice(0, i)` then `i++`?

**Non-technical:** Counter of “how many letters are visible.” Each alarm tick shows one more.

**Technical:** `slice(0, i)` is a new string of the prefix; it does not mutate `text`. Order is write-then-increment-then-check. Combined with `i` starting at 0, the first write is `slice(0, 0) === ""` (Q428). Using `substring` would be the same for these non-negative indexes. Closing over `text` means a later change to `pipelines[i]` would not affect an in-flight type (arrays of strings are copied by value into `line` already). `i` here **shadows** `runTicker`’s `i` — they are separate bindings. That is fine; in an interview, naming this `n` or `shown` avoids confusion.

```js
let i = 0;
const interval = setInterval(() => {
  tickerEl.textContent = text.slice(0, i);
  i++;
  if (i > text.length) { clearInterval(interval); resolve(); }
}, 35);
```

### Q428. On the first tick, `i` is 0 so you write `""` — is that an off-by-one wasted tick?

**Non-technical:** Yes. The first alarm clears the line (it was usually already empty) and only then does typing start. You pay 35ms of nothing.

**Technical:** `setInterval` fires **after** the first 35ms, not immediately. Tick 1: write `""`, `i` becomes 1. That is redundant after `eraseText` (already empty) and on first load (HTML `#tickerText` is empty). It **is** useful if you ever called `typeText` while leftover text was present — you blank once, then type. Cost: one extra interval = 35ms, and `ticks = length + 1`. Fix options: start `i` at 1 and write `slice(0, 1)` first; or `setTimeout` a recursive function that writes then schedules; or assign the first character synchronously before starting the interval. Honest interview line: “It is a wasted tick. I would start at 1.”

```js
let i = 0;
// first fire: slice(0, 0) → ""
tickerEl.textContent = text.slice(0, i);
i++;
```

### Q429. Why `if (i > text.length)` and not `i === text.length`?

**Non-technical:** Because the counter is bumped **after** the write. Equality with the length would miss the stop and loop forever.

**Technical:** After writing `slice(0, i)` with `i === text.length` (full string), the next line is `i++`, so `i === text.length + 1`. The check is `i > text.length`, which is true, so it stops on the **same** tick as the full write. If you used `i === text.length` **after** the increment, it would be `length + 1 === length` → false. Next ticks: `slice(0, length + 1)` is still the full string (`slice` clamps), `i` keeps growing, equality never holds → **infinite interval**, `resolve` never called, `runTicker` stuck after the first line, CPU wakes every 35ms. `i === text.length + 1` would work with this order. `i >= text.length` **before** increment would stop one character short. The `>` test matches write-then-increment. Empty string: first tick writes `""`, `i` becomes 1, `1 > 0`, resolve — one wasted tick, then hold/erase.

```js
tickerEl.textContent = text.slice(0, i);
i++;
if (i > text.length) { clearInterval(interval); resolve(); }
```

### Q430. What is the last `textContent` assigned before resolve — full string or one past?

**Non-technical:** The full line. You never write a “character after the end.”

**Technical:** When `i === text.length`, assignment is `text.slice(0, text.length)` → the complete string. Then `i` becomes `length + 1` and the function resolves. There is no `slice(0, length + 1)` assignment. (`slice` would have returned the same full string anyway.) After resolve, `runTicker` `await wait(1800)` with the full line visible — that is the hold the missing `is-waiting` class was meant to decorate.

```js
// i === text.length
tickerEl.textContent = text.slice(0, i); // full string
i++;                                     // length + 1
if (i > text.length) resolve();          // stop; no further writes
```

### Q431. Why `clearInterval(interval)` before `resolve()`?

**Non-technical:** Stop the alarm, then tell the loop it can continue. If you only say “continue,” the alarm keeps ringing.

**Technical:** `clearInterval` and `resolve` are both in the same `if`. Order: clear first, then resolve. Clearing first avoids a second tick sneaking in if the microtask of `resolve` took long enough (it will not, but it is the right habit). `resolve()` does not stop the interval by itself. If `resolve` ran first and `runTicker` started `eraseText` on the next microtask, a already-queued interval callback could still fire and rewrite the prefix — a race. Same-tick `clearInterval` prevents that. Calling `resolve` twice is a no-op on a settled Promise; a leaked interval would be the real bug (Q432).

```js
if (i > text.length) { clearInterval(interval); resolve(); }
```

### Q432. What happens if you resolve without clearing — leaked interval?

**Non-technical:** The typewriter never clocks out. It keeps rewriting the line while the eraser tries to delete it. The ticker looks possessed.

**Technical:** The Promise resolves, `runTicker` proceeds to `wait(1800)` then `eraseText` (a **second** `setInterval` on the same node). The leaked type interval still assigns `text.slice(0, i)` every 35ms with `i` already `> length` (always the full string, because `slice` clamps). Erase deletes a character; ~35ms later type slams the full string back. Result: flicker, erase Promise may never see `current.length === 0` (Q444), `while (true)` never advances. Memory: one extra timer until the page dies. Always `clearInterval`/`clearTimeout` on the path that settles the Promise.

```js
if (i > text.length) {
  resolve(); // BAD if you skip clearInterval
}
```

### Q433. Why 35ms per character? How many ms for the longest pipeline string?

**Non-technical:** Fast enough to feel like typing, slow enough to read. The longest line takes a bit under two seconds to appear.

**Technical:** 35ms ≈ 28.6 characters/second. Live lengths and wall time (`(length + 1) * 35` because of the empty first tick):

| Line | chars | type | erase `(n+1)*20` |
| --- | ---: | ---: | ---: |
| `resume.pdf -> parse -> embed -> match` | 37 | 1330ms | 760ms |
| `audio_stream -> deepgram_stt -> llm -> tts_response` | **51** | **1820ms** | 1040ms |
| `auth_request -> rate_limiter -> captcha -> session` | 50 | 1785ms | 1020ms |
| `skill_list -> qlora_model -> interview_questions` | 48 | 1715ms | 980ms |

Longest is the Deepgram line: **1820ms** to type. Plus 1800ms hold plus ~1040ms erase ≈ 4.7s on screen for that cycle. 35ms is not synced to 60Hz (16.67ms); it will alias against frames. Below ~16ms the eye cannot see per-character steps.

```js
}, 35);
```

### Q434. Why `setInterval` rather than `requestAnimationFrame`?

**Non-technical:** You want “every so many milliseconds,” not “every screen refresh.”

**Technical:** `rAF` fires once per frame while the tab is visible (~16.7ms at 60Hz, vsync). Driving a typewriter from `rAF` means accumulating `deltaTime` until ≥35ms, then advancing one char — more code, pauses when the tab is hidden (usually desired), and couples to refresh rate (120Hz would need the same accumulator). `setInterval(fn, 35)` is the straightforward cadence. Downsides vs `rAF`: not aligned to paint (can write between frames), clamped in background tabs, `setInterval` can drift. For 90 lines of portfolio JS, interval is the honest tool. CSS animations (the unused blink, the fall icons) already use the compositor; this is DOM text and must hit JS.

```js
const interval = setInterval(() => { /* write prefix */ }, 35);
```

### Q435. What happens if `typeText` is called again before the previous Promise resolves (it isn’t, but if it were)?

**Non-technical:** Two typewriters on one line. Letters from both strings fight.

**Technical:** Each call starts its own `setInterval` closing over its own `text` and `i`, but **both write `tickerEl.textContent`**. Last tick wins that 35ms. Promises resolve independently when each `i` exceeds its own `text.length`. `runTicker` `await`s, so this does not happen on the happy path. It would happen if you also called `typeText` from a second `runTicker()`, a click, or a hot-reload. Fix: keep an `intervalId` at script scope and `clearInterval` at the start of `typeText`/`eraseText`, or an `AbortController`. `eraseText` + leaked `typeText` is the same class of bug as Q432.

```js
await typeText(line); // runTicker waits; no overlap
// overlapping calls would share tickerEl, not the interval handle
```

### Q436. Why mutate `tickerEl.textContent` instead of `innerHTML` or appending a text node?

**Non-technical:** You are putting plain words on screen, not HTML. `textContent` is the “just text” knob.

**Technical:** `textContent` sets the text node, no parser, no layout-of-markup, no XSS if a string ever became user-controlled. `innerHTML` would parse every tick (`->` is fine; a future `<` in a pipeline would become a tag). Appending a `Text` node per character would require not using `slice` of the whole prefix (or you’d duplicate). Replacing `textContent` each tick discards the old text node and creates a new one — cheap at 51 chars. It also **destroys** any child elements inside `#tickerText`; live HTML has none (the cursor is a sibling). Do not use `innerText` here: it is style-aware and slower. `document.createTextNode` + `replaceChildren` is equivalent and more verbose.

```js
tickerEl.textContent = text.slice(0, i);
```

---

## Lines 76–84 — `eraseText`

(The questions file labels this “lines 44–55.”)

### Q437. Why a separate function instead of `typeText` in reverse with a shared helper?

**Non-technical:** Typing knows the target word. Deleting just backspaces whatever is on screen. Two small tools, two speeds.

**Technical:** `typeText(text)` is source-driven (`slice` of the argument). `eraseText()` is view-driven (`textContent` each tick). Speeds differ (35 vs 20). A shared `animateText({ from, to, ms })` or `typeText(text, direction)` is the refactor if a third motion appears. Today two functions keep the Promise+interval boilerplate duplicated (~10 lines). Reverse-`typeText` would need the original string and an index; it would **not** notice if the DOM had diverged. Separate erase is the more defensive of the two designs (Q438).

```js
function eraseText() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const current = tickerEl.textContent;
      tickerEl.textContent = current.slice(0, -1);
      if (current.length === 0) { clearInterval(interval); resolve(); }
    }, 20);
  });
}
```

### Q438. Why read `tickerEl.textContent` every tick instead of closing over the original string and an index?

**Non-technical:** Each tick looks at what is actually on screen and deletes one character. It does not assume memory matches the screen.

**Technical:** View-driven erase survives a mismatch (user selection cannot edit this span, but another function could). Cost: a DOM read every 20ms (`textContent` getter serializes child text). For a single text node this is cheap. Source-driven (`let n = line.length; slice(0, n--)`) would avoid the extra empty tick (Q441) and be slightly faster. Surrogate pairs / emoji: `slice(0, -1)` is UTF-16 code **units**, so it can split an emoji; live pipelines are ASCII, so this is fine. Closing over `line` from `runTicker` would also freeze the string even if `pipelines` mutated mid-erase.

```js
const current = tickerEl.textContent;
tickerEl.textContent = current.slice(0, -1);
```

### Q439. Why `current.slice(0, -1)`?

**Non-technical:** Drop the last character. Same as backspace.

**Technical:** `slice(0, -1)` is `slice(0, current.length - 1)`. For length 0, `slice(0, -1)` returns `""` (not an error). For length 1, returns `""`. It returns a new string; `current` is unchanged, which is why the later `current.length === 0` test still sees the **pre-slice** length (Q440). `current.slice(0, current.length - 1)` is equivalent. `current.substring(0, current.length - 1)` on empty: `substring(0, -1)` coerces `-1` to 0 → `""`. `pad`/`pop` on a `[...current]` array would be slower and still UTF-16.

```js
tickerEl.textContent = current.slice(0, -1);
```

### Q440. Why `if (current.length === 0)` — you already sliced; is this checking the **pre-slice** length?

**Non-technical:** Yes. It looks at the word **before** the backspace. When that word was already empty, stop.

**Technical:** `const current = tickerEl.textContent` then write `slice`, then test **`current`.length**, not `tickerEl.textContent.length`. That is the length **before** this tick’s delete. So: when `current` is `"a"`, you write `""` and do **not** stop (`1 !== 0`). Next tick `current` is `""`, you write `""` again, then stop. The stop condition is “we observed empty,” not “we just produced empty.” Checking post-slice (`tickerEl.textContent.length === 0` after the write) would resolve on the tick that deleted the last character and skip the extra empty tick. Live code checks pre-slice.

```js
const current = tickerEl.textContent;          // pre-slice
tickerEl.textContent = current.slice(0, -1);  // may now be ""
if (current.length === 0) { /* stop */ }      // still the old length
```

### Q441. Walk through the last two ticks: when `current` is `"a"` vs `""` — do you call `setInterval` one extra time?

**Non-technical:** Yes. The last letter disappears, then one more alarm fires on an already blank line, then it stops.

**Technical:** Suppose the remaining text is `"a"`:

1. Tick: `current === "a"` (length 1). Write `"".slice` → `""`. Check `current.length === 0` → false. Interval stays.
2. Tick (20ms later): `current === ""` (length 0). Write `"".slice(0, -1)` → `""`. Check `current.length === 0` → true. `clearInterval`, `resolve`.

`setInterval` always waits 20ms before the **first** tick as well, so even a one-character erase is 40ms (two ticks) plus the initial delay pattern: actually first tick at 20ms deletes `"a"`, second at 40ms observes `""`. Extra tick: **yes**. Combined with `typeText`’s extra leading `""` write, both ends waste one interval. Interview: “I’d stop when post-slice length is 0, on the tick that deleted the last char.”

```js
// current "a" → write "" → do not stop
// current ""  → write "" → stop
if (current.length === 0) { clearInterval(interval); resolve(); }
```

### Q442. Why 20ms (faster than type’s 35ms)?

**Non-technical:** Deleting should feel quicker than typing. People read the finished line; they do not need to watch every backspace at the same pace.

**Technical:** 20ms ≈ 50 chars/sec, 1.75× the type rate. Longest line (51): erase wall time `(51 + 1) * 20 = 1040ms` vs 1820ms type. Common typewriter UX (VS Code-like demos, movie terminals) erases faster than it types. 20ms is near one frame at 60Hz; still not `rAF`. If both were 35ms, a full cycle of the long line would add ~765ms of watching delete. Reduced-motion users never hit this interval.

```js
}, 20);
```

### Q443. What happens if `textContent` is already empty when `eraseText` starts?

**Non-technical:** It shrugs and finishes after one short wait. It does not hang.

**Technical:** First interval fire (after 20ms): `current === ""`, write `""`, `current.length === 0`, clear + resolve. The Promise settles; `runTicker` increments `i` and types the next line. This is the path after a no-op type of `""`, or if something else cleared the node during the 1800ms hold. It is **not** instant: you still pay the first 20ms delay because `setInterval` does not run `fn` immediately (`setTimeout(fn, 0)` / invoking once synchronously would). Empty start does not infinite-loop.

```js
const current = tickerEl.textContent; // ""
tickerEl.textContent = current.slice(0, -1);
if (current.length === 0) { clearInterval(interval); resolve(); }
```

### Q444. Could `eraseText` run forever if `textContent` never becomes empty?

**Non-technical:** Only if something else keeps putting characters back while this function deletes them.

**Technical:** The stop condition is `current.length === 0` on a read. If a leaked `typeText` interval (Q432) or another writer restores text every tick, `current` may never be empty → interval runs until the tab dies. If `tickerEl` is `null`, the getter throws on the first tick (`Cannot read properties of null`); the Promise hangs (same timer-exception trap as Q408); the interval keeps throwing. If the node is **detached** but the JS reference remains, `textContent` still shrinks to `""` and the function **does** finish — you just cannot see it. Unicode: a string of ZWSP / combining marks still has `length > 0` until sliced away; it will finish. Practical answer: “Not on the happy path. A competing writer can make it immortal.”

```js
if (current.length === 0) { clearInterval(interval); resolve(); }
// no max-tick guard, no AbortController
```

---

## Lines 86–90 — `wait` and `runTicker()`

(The questions file labels this “lines 57–60.”)

### Q445. Why wrap `setTimeout` in a Promise instead of using a raw timeout inside `runTicker`?

**Non-technical:** So you can write `await wait(1800)` in the story instead of nesting another callback.

**Technical:** `await wait(ms)` pauses the `async` function without blocking the thread. A raw `setTimeout(() => { eraseText().then(…) }, 1800)` inside `runTicker` would destroy the linear `while` loop. `wait` is the standard promisify of `setTimeout`. It never rejects (unless you add `AbortSignal`). `setTimeout` delay is clamped (minimum 4ms nested, 1000ms in background tabs). `wait(0)` still defers to a macrotask, useful to yield; this file never uses 0.

```js
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### Q446. Why a generic `wait(ms)` used only once with `1800`?

**Non-technical:** The questions file thought there was a single pause. The live file pauses in two different places with two different times, so a tiny helper earns its keep.

**Technical:** The questions file assumes X: `wait` is only `await wait(1800)` after typing. The live file does Y: **two** call sites — `await wait(1800)` on the type/erase path and `await wait(3000)` on the reduced-motion path. A one-off `await new Promise(r => setTimeout(r, 1800))` inlined twice would be noisier. Named helper also gives one place to later add `AbortSignal` or logging. Magic numbers 1800 / 3000 are still unexplained constants (Q421).

```js
if (prefersReducedMotion) {
  tickerEl.textContent = line;
  await wait(3000);
} else {
  await typeText(line);
  await wait(1800);
  await eraseText();
}
```

### Q447. Why `runTicker()` is invoked immediately at the bottom?

**Non-technical:** Opening the page starts the ticker. There is no “play” button.

**Technical:** Side effect at script evaluation. Because of `defer` + end of body, the DOM nodes exist (Q403). The call is not inside `requestIdleCallback`, `window.onload`, or `matchMedia` listeners. `prefersReducedMotion` was already sampled **above** this call, so the first branch choice is fixed before the first `await`. The returned Promise is discarded (Q416). Moving this call into a `DOMContentLoaded` listener would be redundant today and would delay start until after deferred scripts + the event. If `#tickerText` is missing, this is the moment the async function is **entered**; the throw happens on the first write (sync for reduced motion, 35ms later for type).

```js
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

runTicker();
```

### Q448. What happens if you don’t call it — ticker stays empty forever?

**Non-technical:** Yes. You see `$` and a solid block caret, no pipeline text. Theme still works.

**Technical:** `#tickerText` is empty in HTML by design (Q150 in the HTML set). Functions `typeText` / `eraseText` / `wait` / `runTicker` would still be defined but unused (classic-script `function` declarations are local to the script scope, not `window.runTicker`). No other file calls them. Reduced-motion users would also see empty — the swap lives inside `runTicker`. Dead functions are fair game for tree-shaking in a bundler; this project has none, so the bytes still download. Theme toggle is independent.

```html
<span class="hero-text-ticker-text" id="tickerText"></span>
```

```js
runTicker(); // omit this → empty span forever
```

### Q449. Why no `DOMContentLoaded` listener?

**Non-technical:** The script already waits until the page’s HTML exists. A second “wait until ready” would be waiting for a bus that already arrived.

**Technical:** Spec order for a deferred parser-inserted script: document parsed → deferred scripts run **in order** → then `DOMContentLoaded` fires. So when `main.js` runs, the tree is complete **and** `DOMContentLoaded` has **not** necessarily fired yet — you do not need it, and if you only listened for it you would still run (the event fires after you). End-of-body **without** `defer` also sees all previous siblings. You **would** need `DOMContentLoaded` (or `defer` / `type="module"` / `readyState !== 'loading'`) if this script moved to `<head>` without `defer` (Q404). `window.onload` would wait for the photo and fonts — worse LCP for no benefit.

```html
<script src="js/main.js" defer></script>
```

```js
runTicker(); // no DOMContentLoaded wrapper
```

### Q450. Why no `prefers-reduced-motion` check that would set the full text once and skip animation?

**Non-technical:** The questions file thinks you ignored motion-sickness settings. The live file does respect them for the ticker: instant full line, swap every three seconds, no type/erase.

**Technical:** The questions file assumes X: no check (the question is phrased as a gap). The live file does Y:

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

If `true`, skip `typeText` / `eraseText`, assign `tickerEl.textContent = line`, `await wait(3000)`. Caveats a strong candidate names:

1. **Sampled once** at script run — no `media.addEventListener('change', …)`. Toggling OS “reduce motion” mid-visit does not switch paths until reload.
2. **JS only.** CSS still has no `@media (prefers-reduced-motion: reduce)` for `.fall-icon` animation, `scroll-behavior: smooth`, or `.btn:hover { transform }`. Those keep moving.
3. Reduced-motion users still get a **3s infinite swap** — some people want freeze-on-first-line. This is a compromise, not `animation: none`.
4. `matchMedia` is supported in every browser this static site cares about; no fallback if it threw (it will not).

```js
if (prefersReducedMotion) {
  tickerEl.textContent = line;
  await wait(3000);
} else {
  await typeText(line);
  await wait(1800);
  await eraseText();
}
```

### Q451. Why no pause when the tab is hidden (`document.hidden` / `visibilitychange`)?

**Non-technical:** Walk away, come back, the ticker may be mid-word. It did not politely freeze while you were in another tab.

**Technical:** Hidden-tab timers are **throttled**, not stopped. You can return to a half-typed line or a long jump (many 1000ms ticks batched oddly). There is no `document.addEventListener('visibilitychange', …)` to `clearInterval` and resume. Cost: extra battery on mobile if the browser does not throttle hard; some do. Pause design: store `paused` flag, `clearInterval` on hide, on show call `runTicker` again **or** continue the same Promise (harder — you’d need abortable `wait`/`typeText`). For a decorative hero, pause is a polish item, not a correctness bug. Pair it with Page Visibility if you add Web Audio later; not needed for `textContent`.

```js
async function runTicker() {
  while (true) {
    // no document.hidden check
  }
}
```

### Q452. Why no error handling if the ticker node is removed mid-animation?

**Non-technical:** Nobody rips that line out of the page in production. If they did, the script would keep talking to a ghost or blow up, and nobody would catch it.

**Technical:** `tickerEl` is a `const` reference to a node. `element.remove()` **does not** null your variable. Writes to `textContent` on a detached node succeed; the user sees nothing; the loop wastes timers until navigation. `tickerEl = null` cannot happen (`const`). Replacing the span in HTML (`innerHTML` on a parent) **orphans** the referenced node the same way. A **new** `#tickerText` would not be used. If `tickerEl` were null from the start, writes throw, `typeText`’s interval exceptions do not reject the Promise (Q408), `runTicker` hangs. There is no `try/catch` around the `while` body, no `AbortController`, no `isConnected` check (`tickerEl.isConnected`). Honest fix: `if (!tickerEl?.isConnected) return;` at the top of each tick.

```js
const tickerEl = document.getElementById('tickerText');
async function runTicker() {
  while (true) {
    tickerEl.textContent = line; // detached node: succeeds silently
  }
}
```

### Q453. Why vanilla JS — no TypeScript, no bundler, no framework — for this file specifically, in a demo where you claim React/Next daily?

**Non-technical:** This page is a business card, not the product you ship at work. A framework would be a costume. Reviewers should see you can still drive the browser yourself.

**Technical:** `main.js` is ~90 lines, three features (dead nav, theme, ticker), zero dependencies, served as a static file on Netlify with **no build**. Adding React/Next would mean a toolchain, hydration, and a JS payload larger than the feature. TypeScript would need `tsc` or a bundler; the only types you’d add are `string[]` and `HTMLElement | null` — useful, but then `themeToggle`’s missing-null bug would be a compile error you’d still have to handle. `type="module"` would give strict mode and deferred loading without the `defer` attribute; this file does not use imports, so a classic script is enough. Interview reconciliation (also Q487 in hosting): **SelectPrism is React/Next; this repo is the HTML/CSS/JS platform those tools compile to.** You demonstrate both layers. If the ticker grew pause, reduced-motion listeners, and tests, that is when you graduate this file to a module + TS.

```js
// classic script, no import/export, no bundler
const tickerEl = document.getElementById('tickerText');
runTicker();
```

```html
<script src="js/main.js" defer></script>
```

---

## Coverage

| Range | Topic | Status |
| --- | --- | --- |
| Q391–Q404 | Theme toggle (`#themeToggle`, `classList.toggle`, `localStorage`) | All present |
| Q405–Q409 | `pipelines` array | All present |
| Q410–Q414 | Ticker refs (`#tickerText`, no `closest`) | All present |
| Q415–Q425 | `runTicker` (async `while (true)`, no `is-waiting`, reduced motion) | All present |
| Q426–Q436 | `typeText` (35ms, slice, extra leading `""`) | All present |
| Q437–Q444 | `eraseText` (20ms, pre-slice empty check) | All present |
| Q445–Q453 | `wait`, boot, a11y/perf gaps, vanilla choice | All present |

**Q391 through Q453: 63/63.** Output: `portfolio-poc/Deep-Dive-Answers-JS.md`.
