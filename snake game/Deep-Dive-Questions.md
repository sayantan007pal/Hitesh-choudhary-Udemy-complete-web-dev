# Technical Demo Questions

How to use this file: keep `index.html`, `style.css`, and `src/*.ts` open beside it. Walk top to bottom. Each question is something a reviewer may ask — why you chose it, what happens if you remove it, what changes if the value changes, what the alternative is, and what breaks for accessibility, canvas, modules, DSA, OOP, or browsers.

This file is questions only. Prepare your own answers.

The compiled output in `dist/` is what the browser actually loads. If a reviewer jumps to Deque, collision, input queue, or `file://`, use Parts 4–5, 8, and 11.

---

# Part 1 — `index.html` (lines 1–45)

## Lines 1–2 — `<!DOCTYPE html>` and `<html lang="en">`

1. Why do you put `<!DOCTYPE html>` as the first line, before `<html>`?
2. What happens if you remove the doctype?
3. What rendering mode does the browser fall into without it, and how would that show up on this page (canvas, overlay, flex-centered body)?
4. Why is it written `<!DOCTYPE html>` (uppercase) rather than `<!doctype html>`? Does HTML5 care?
5. Why `lang="en"` on `<html>` and not on `<body>`?
6. What happens if you remove `lang` entirely?
7. How do screen readers use `lang` on a page whose visible copy is English but whose HUD strings (`Idle`, `Running`, `Game Over`) come from a TypeScript enum?
8. If you later add a Hindi hint line, would you change this attribute or override it locally?

## Lines 3–5 — `<head>`, charset, viewport

9. Why does charset belong in `<head>`, as early as possible?
10. What happens if charset is missing, or placed after the title?
11. Why UTF-8 and not ISO-8859-1? Point to a character on this page that would break (`—` in the title, `&middot;`, `Deque&lt;Position&gt;`).
12. Why the self-closing slash on `<meta charset="UTF-8" />` in an HTML5 document? What changes if you drop it?
13. Why is there no `http-equiv="Content-Type"` meta tag?
14. Why `width=device-width`? What happens on a phone if you remove it?
15. Why `initial-scale=1.0`? What if you set it to `1.5` or omit it?
16. Why did you not add `user-scalable=no` or `maximum-scale=1` on a canvas game where pinch-zoom might feel natural to suppress?
17. What accessibility problem does locking zoom create?
18. How does this meta tag interact with `#board { max-width: 100%; height: auto }` and a canvas bitmap of 528×528 CSS pixels?

## Line 6 — `<title>`

19. Why is the title `Snake — Deque + Set Edition` rather than just `Snake`?
20. Why put DSA (`Deque + Set`) in the tab title of a game — for you, for a reviewer, or for SEO?
21. Why an em dash (`—`) instead of a hyphen or `|`?
22. What happens if you remove `<title>`? What does the tab show?
23. Why no `meta name="description"` on a demo you might send as a link?
24. Why no `og:title`, `og:image`, `twitter:card`?
25. Why no `rel="canonical"`, `robots`, or favicon?

## Line 7 — stylesheet

26. Why `href="style.css"` relative, not `/style.css`?
27. What happens if this file is opened from a nested path or GitHub Pages project URL?
28. Why is CSS in the `<head>` and the script at the end of `<body>`?
29. What happens if you put the CSS `<link>` after the script?
30. Why no `media="print"` stylesheet?
31. Why no preload or `media="print" onload` trick — is a 168-line sheet too small to care?

## Lines 9–11 — `<body>` and `<main>` / `<h1>`

32. Why `<main class="wrap">` instead of a `<div>`?
33. What happens if there are two `<main>` elements?
34. Why is the heading `Snake` when the title tag says `Snake — Deque + Set Edition`?
35. Why `<h1 class="title">` rather than styling `h1` directly?
36. Why no skip link? Who is harmed on a page this short?

## Lines 13–23 — HUD

37. Why a wrapping `.hud` of `div`s rather than a `<ul>`, a `<dl>`, or a `<table>`?
38. Why Score and Status are each `.hud-block` with a label span + value span, not a single `<p>`?
39. Why `id="score"` and `id="status"` — who consumes those ids?
40. What happens if you rename `id="score"` but forget `getElementById("score")` in `main.ts`?
41. Why does the HTML start at `0` and `Idle` rather than empty spans?
42. What do users without JavaScript see, and is that honest?
43. Why is there no `aria-live="polite"` (or `assertive`) on the score or status?
44. What happens for a screen-reader user when the score ticks every 110ms — would live regions even be usable?
45. Why is Restart a `<button>` and not an `<a href="">`?
46. Why `type="button"`? What happens if you omit `type` inside a form vs here, not inside a form?
47. Why is there no `aria-label` on Restart? Is the visible text enough?
48. Why no `disabled` state while Idle vs Running vs Game Over?
49. Why is the button in the HUD row rather than under the canvas?

## Lines 25–28 — board frame, canvas, overlay

50. Why wrap the canvas in `.board-frame` instead of positioning the overlay on `body`?
51. Why `<canvas id="board"></canvas>` with no `width` or `height` attributes?
52. Board.ts later sets `canvas.width = 24 * 22` (528). What is the difference between the HTML attribute, the DOM property, and CSS `max-width: 100%`?
53. What layout / CLS happens before `Board`’s constructor runs?
54. Why no fallback content inside `<canvas>` for browsers without canvas?
55. Why no `role="img"` or `aria-label="Snake game board"`?
56. What does a screen reader announce when it lands on an empty canvas?
57. Why no `tabindex="0"` on the canvas? Keyboard handlers are on `window` — is that better or worse?
58. What happens if a user focuses a text field on another part of a future page — do arrow keys still steal input?
59. Why is the overlay a sibling of the canvas, not a child of `<canvas>` (canvas cannot have visible HTML children)?
60. Why `<div id="overlay" class="overlay"></div>` with **no** `hidden` attribute in the HTML?

```html
<canvas id="board"></canvas>
<div id="overlay" class="overlay"></div>
```

61. What does the user see in the 100–300ms before `dist/main.js` runs — empty overlay covering the board (FOUC)?
62. Why not start with `hidden` and let `reset()` show it?
63. Why is the overlay’s first message not in the HTML (`Press an arrow key…`) but injected by `Game.reset()`?
64. What happens if JS fails to load — overlay stays empty and covers the canvas forever?
65. Why `id="overlay"` rather than only a class?

## Line 30 — hint

66. Why is the control legend a `<p class="hint">` rather than a `<kbd>` list or `<ul>`?
67. Why `&middot;` instead of a raw `·` or `|`?
68. What happens if you write `·` unescaped — is it UTF-8-safe here?
69. Why tell people about Arrow keys / WASD / Space in HTML when Game.ts is the source of truth — what if they drift?
70. Why no mention of the Restart button in the hint?

## Lines 32–39 — footer legend

71. Why `<footer class="legend">` instead of `<aside>` or another `<section>`?
72. Why is this DSA explanation in the page, not only in `README.md`?
73. Why `<strong>Deque&lt;Position&gt;</strong>` with entities rather than a `<code>` tag?
74. What happens if you write `Deque<Position>` unescaped in HTML?
75. Why claim “doubly linked list” and “O(1)” in the footer — is that for players or for the interviewer sitting next to you?
76. Why `Set&lt;string&gt;` of occupied cells rather than mentioning `cellKey`?
77. Is this footer visible on a 320px phone without stealing the canvas?

## Line 42 — module script

```html
<script type="module" src="dist/main.js"></script>
```

78. Why `type="module"` instead of a classic script or `type="module"` plus a bundler?
79. Why is there no `defer`? Do modules already defer?
80. Why is the script at the end of `<body>` if modules are deferred anyway?
81. What happens if you move this tag into `<head>` without `defer` — for a classic script vs a module?
82. Why `src="dist/main.js"` and not `src/main.ts`?
83. What happens if `dist/main.js` is stale relative to `src/`?
84. What happens if you open `index.html` as `file://` — which error, and why?
85. Why not `importmap` or a single IIFE bundle?
86. What happens if `dist/main.js` 404s — which HTML still works?
87. Why no `nomodule` fallback script?
88. Why no `crossorigin` on the script?

---

# Part 2 — `style.css` (lines 1–168)

## Lines 1–8 — `:root` tokens

89. Why custom properties on `:root` instead of hard-coded hex in each rule?
90. Why names `--bg`, `--panel`, `--border`, `--text`, `--muted`, `--accent` rather than `--ink` / `--signal` like the portfolio?
91. Why `#0c0d10` / `#17191d` / `#2dd4bf` — how did you pick this palette?
92. Why is `--accent` teal (`#2dd4bf`) matching `FOOD_COLOR` in Game.ts, while the canvas clear color `#14161a` is **not** a token?
93. What happens if you change `--accent` in CSS but forget Game.ts `FOOD_COLOR` / `HEAD_COLOR` / `BODY_COLOR`?
94. Why no light theme / `html.light` inversion?
95. Why no `color-scheme: dark` on `html`?

## Lines 10–27 — reset, html/body, typography

96. Why `* { box-sizing: border-box; }` without `*::before, *::after`?
97. What happens if the restart `::before` (there isn’t one) needed padding later?
98. Why no `margin: 0; padding: 0` on `*` when `body` sets `margin: 0`?
99. Why `html, body { height: 100%; }`?
100. What happens if you use `min-height: 100%` or `100dvh` instead?
101. Why `body` is `display: flex; align-items: center; justify-content: center`?
102. What happens on a short mobile viewport — does the HUD + canvas overflow without `overflow-y: auto` on `body`?
103. Why `padding: 24px` on `body` in `px` not `rem`?
104. Why `font-family: "SFMono-Regular", "JetBrains Mono", Consolas, "Courier New", monospace` — and no `@font-face` / Google Fonts?
105. What happens on Windows vs macOS if JetBrains Mono is not installed?
106. Why a mono stack on a game UI rather than a sans-serif HUD?
107. Why no `-webkit-font-smoothing`?

## Lines 30–46 — `.wrap` and `.title`

108. Why `.wrap` is a column flex with `gap: 14px` and `max-width: 620px`?
109. What happens if `max-width` is `100%` or `80ch`?
110. Why `align-items: center` — does that shrink the HUD’s `width: 100%`?
111. Why `.title` is `1.4rem`, `letter-spacing: 0.08em`, `text-transform: uppercase`?
112. Why `font-weight: 600` not `700`?
113. Why `margin: 0` on `.title` when there is no global heading reset?

## Lines 48–77 — HUD blocks

114. Why `.hud` is `display: flex` with `justify-content: center` and **no** `flex-wrap`?
115. What happens on a 320px screen with two blocks + Restart — overflow, wrap, or clip?
116. Why `.hud-block` `min-width: 84px`?
117. Why label is `0.7rem` uppercase muted and value is `1.1rem` / `700` / `--accent`?
118. Why Score and Status share the same `.hud-value` color as the food?

## Lines 80–103 — restart button

119. Why `font-family: inherit` on the button?
120. Why `cursor: pointer` and a 0.15s `transition` on border and color?
121. Why hover only changes border/color, not `transform`?
122. Why both `:focus` **and** `:focus-visible`?

```css
.restart-btn:focus-visible,
.restart-btn:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

123. What happens for mouse users — do they see an outline on every click because `:focus` is included?
124. What happens if you `outline: none` with no replacement?
125. Why no `:disabled` styles?
126. Is `padding: 10px 18px` a 44px touch target? What does WCAG 2.2 say?

## Lines 105–118 — board frame and canvas

127. Why `.board-frame { position: relative; overflow: hidden; border-radius: 8px }`?
128. Why `line-height: 0` on the frame?
129. What extra gap appears under the canvas if you remove `line-height: 0` **and** `#board { display: block }`?
130. Why `#board { display: block; max-width: 100%; height: auto; }`?
131. What happens to the 528×528 bitmap when CSS shrinks it on a 360px phone — crisp or blurry?
132. Why no `image-rendering: pixelated`?
133. Why no `aspect-ratio: 1` on the frame — does `height: auto` on the canvas already preserve it?

## Lines 120–136 — overlay

134. Why `.overlay` is `position: absolute; inset: 0` rather than a sibling below the canvas?
135. Why `background: rgba(12, 13, 16, 0.82)` — hard-coded, not `color-mix` with `--bg`?
136. Why `display: flex; align-items: center; justify-content: center; text-align: center`?
137. Why `.overlay[hidden] { display: none; }` when the HTML `hidden` attribute already maps to `display: none` in the UA stylesheet?

```css
.overlay[hidden] {
  display: none;
}
```

138. What happens if you set `.overlay { display: flex }` **without** the `[hidden]` override — does `hidden` lose to author `display`?
139. Why is that override required specifically because you set `display: flex` on `.overlay`?
140. Why not `opacity: 0; pointer-events: none` instead of `hidden` (would you still need `aria-hidden`)?

## Lines 138–161 — hint and legend

141. Why `.hint` is `0.78rem` muted with `margin: 0`?
142. Why `.legend` has `border-top` and `width: 100%`?
143. Why `.legend strong` is recolored to `--text`?

## Lines 163–167 — reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .restart-btn {
    transition: none;
  }
}
```

144. Why is this the **only** reduced-motion rule in the whole project?
145. What still moves for a vestibular-sensitive user (RAF loop, 110ms ticks, overlay appearing)?
146. Why not also expose a slower `tickMs` when this media query matches?
147. Why no `@media print` hiding the canvas or overlay?
148. Why no container queries?
149. Why `px` for body padding (24px) and `rem` for type?
150. Why no CSS logical properties (`margin-inline`, `padding-block`)?
151. Why this file is a single 168-line sheet rather than split?

---

# Part 3 — `src/types.ts` (lines 1–21)

152. Why a separate `types.ts` instead of declaring these next to `Snake` / `Game`?
153. Why `Position` is an `interface { x: number; y: number }` and not a `class`, a tuple `[number, number]`, or a branded type?
154. What happens if two different object literals share `{x:0,y:0}` — are they equal with `===`?
155. Why not freeze Position objects?
156. Why `enum Direction` with string values `"Up"` / `"Down"` / `"Left"` / `"Right"` rather than a string union type?
157. What is the compiled JS for a string enum vs `as const` object vs numeric enum?
158. Why not numeric enums (`Up = 0`) for a smaller bundle?
159. Why `enum GameStatus` rather than a discriminated union?
160. Why `GameStatus.GameOver = "Game Over"` **with a space**, when the others are single tokens `Idle` / `Running` / `Paused`?

```ts
export enum GameStatus {
  Idle = "Idle",
  Running = "Running",
  Paused = "Paused",
  GameOver = "Game Over",
}
```

161. Who displays that string — `updateHud` writes `this.status` into `#status`. What does the HUD show on death?
162. What happens if you rename the enum member but keep the string (or the reverse)?
163. Why export all three from one module — circular-import risk?
164. Why no `CellKey` branded string type for `"x,y"`?

---

# Part 4 — `src/Deque.ts` (lines 1–112)

## Lines 1–13 — `DequeNode`

165. Why is `DequeNode<T>` a separate class rather than an inline object type?
166. Why is it **not** `export`ed?
167. What happens if a caller got a node reference and mutated `prev` / `next`?
168. Why `prev` and `next` default to `null` rather than `undefined`?
169. Why store `value: T` on the node instead of a parallel array of values?

## Lines 15–23 — why a deque at all

170. Why a doubly linked list rather than a JS array?
171. Why is `Array#unshift` / `Array#shift` O(n)? Walk one snake move on a 200-cell body.
172. Why not `Array#push` / `Array#shift` (queue) if the head were at the back?
173. Why not a circular buffer / ring with a head index — O(1) without pointer chasing?
174. Why not a `Uint32Array` of packed coordinates?
175. Is a linked-list deque actually faster in V8 than a small array for n ≤ 576? When does the Big-O story win the interview vs the benchmark?
176. Why claim this in the footer/README if the board max length is 576?

## Lines 24–46 — size / first / last

177. Why keep `private count` instead of counting nodes on each `size` read?
178. Why `isEmpty` as a getter rather than `size === 0` at call sites?
179. Why `first` / `last` return `T | undefined` rather than throwing?
180. Why optional chaining `this.head?.value`?
181. Snake’s `getHead()` throws if empty — why the inconsistency with Deque?

## Lines 48–98 — push / pop

182. Why both `pushFront` and `pushBack` when Snake only uses `pushFront` + `popBack`?
183. Why both `popFront` and `popBack`?
184. Walk `pushFront` on an empty deque: why set **both** `head` and `tail`?
185. Walk `pushFront` on a one-element deque: which pointers change?
186. Walk `popBack` on a one-element deque: why `this.head = null` as well as `this.tail`?
187. What happens if you `popFront` an empty deque — `undefined`, or a thrown error? Why that choice?
188. Why decrement `count` after detaching, not before?
189. What happens if `count` drifts from the true chain length — who would notice?
190. Why not return `this` for chaining?
191. Why no `peek` methods separate from `first` / `last`?

## Lines 100–111 — iterator and `toArray`

192. Why `[Symbol.iterator]` as a generator rather than a custom iterator object?
193. Why iterate front → back (head first)?
194. What happens if you mutate the deque while iterating?
195. Why `toArray()` is `[...this]` rather than a `while` loop pushing into a pre-sized array?
196. What is the complexity of `toArray()` and how often does `Game.render` call it?
197. Why no `at(index)` / random access — and why is that OK for Snake?

## Generics and API surface

198. Why `Deque<T>` generic if the only user is `Deque<Position>`?
199. Why no `clear()` — Game constructs a new Snake on reset instead?
200. Why no tests in this repo for empty pop, one-node pop, and round-trip pushFront/popBack?
201. What would a reviewer ask you to whiteboard: implement `pushFront` from scratch?

---

# Part 5 — `src/Snake.ts` (lines 1–149)

## Lines 1–14 — helpers

202. Why `cellKey(pos)` returns `` `${pos.x},${pos.y}` `` rather than `${x}:${y}` or a number `x * rows + y`?

```ts
function cellKey(pos: Position): string {
  return `${pos.x},${pos.y}`;
}
```

203. Why is `cellKey` a module-private function, not a `Position` method?
204. What happens if coordinates can be negative (wall check is in Board) — is `"-1,5"` still unique?
205. Why not `Set<Position>`? What does `Set` use for object equality?
206. Why not a 2D `boolean[][]` occupancy grid of size 24×24?
207. Why `OPPOSITE` as `Record<Direction, Direction>` rather than a switch?
208. What happens if you add a diagonal direction later?

## Class comment and fields

209. Why does Snake own **two** structures (`body` + `occupied`) that must stay in sync?
210. What bugs appear if `advance` updates the deque but forgets the Set (or the reverse)?
211. Why `private direction` + `pendingGrowth = 0` rather than a boolean `growing`?
212. Why not store growth as “skip the next N pops” on the Game side?

## Constructor (tail-first)

213. Why is `initialSegments` documented as **tail-first, head-last**?
214. Why `pushFront` each segment in that order so the last element becomes `body.first`?

```ts
for (const segment of initialSegments) {
  this.body.pushFront(segment);
  this.occupied.add(cellKey(segment));
}
```

215. What happens if Game passed head-first by mistake — how would the snake look and move?
216. Why not `pushBack` in tail-first order instead?
217. Why no validation that segments are adjacent and unique?
218. What happens if `initialSegments` is empty — when does `getHead()` throw?

## Getters

219. Why `getHead()` throws rather than returning `undefined`?
220. Why `getSegments()` returns a **copy** (`toArray`) rather than exposing the deque?
221. Why a `length` getter forwarding `this.body.size`?

## `setDirection`

222. Why ignore a request where `OPPOSITE[this.direction] === next`?
223. What classic Snake bug does that prevent?
224. Why compare against `this.direction` (already applied) and **not** against `queuedDirection` in Game?
225. If the snake is going Right and the player hits Up then Left in the **same** tick, what happens? (Game keeps one queued key; Left is opposite of Right — ignored.)
226. Why not allow 180 when length === 1?

## Growth, peek, collision

227. Why `grow(amount = 1)` adds to `pendingGrowth` instead of immediately inserting a dummy segment?
228. Why `peekNextHead()` exists instead of Game computing `head + direction`?
229. Why `wouldCollideWithSelf` uses the Set, not a scan of `getSegments()`?
230. Walk the tail exception: if `pendingGrowth === 0` and `nextKey` equals the current tail, why is that **legal**?

```ts
wouldCollideWithSelf(): boolean {
  const nextKey = cellKey(this.nextHeadPosition());
  if (!this.occupied.has(nextKey)) return false;
  if (this.pendingGrowth === 0) {
    const tail = this.body.last;
    if (tail && cellKey(tail) === nextKey) return false;
  }
  return true;
}
```

231. What happens if you remove the tail exception — can the snake die by walking onto its own tail?
232. What happens if you are growing (`pendingGrowth > 0`) and the next cell **is** the tail — should that die?
233. Why is wall collision **not** in this method (it lives in `Board.isWithinBounds`)?
234. Why `occupiesCell` for Food rather than letting Food scan the body?
235. Complexity: `occupiesCell` and `wouldCollideWithSelf` are O(1) average. What is the worst case of a JS `Set` of strings?

## `advance`

236. Why push the new head **before** popping the tail?
237. Why `occupied.add` the new head before `occupied.delete` of the tail?
238. What happens if the new head cell equals the old tail cell in the same move — add then delete — does the Set still contain the cell?
239. Why decrement `pendingGrowth` on a growth move instead of popping nothing without a counter?
240. What happens if `popBack` returned `undefined` while `pendingGrowth === 0` — could the Set leak keys?
241. Why return `newHead` from `advance` if Game ignores the return value?
242. Why is `nextHeadPosition` a private switch rather than a `DIR_VECTOR` map?
243. What happens if `switch (this.direction)` lost a case — `noFallthroughCasesInSwitch` / implicit `undefined` return?
244. Why no wrap-around walls (pac-man edges) as an option?

---

# Part 6 — `src/Board.ts` (lines 1–67)

245. Why is Board “dumb” — geometry + drawing, no snake, no food, no score?
246. Why would you reuse Board for another grid game? What would you still have to change?
247. Why `readonly columns / rows / cellSize` after construction?
248. Why set `canvas.width` and `canvas.height` in the constructor rather than in HTML?

```ts
canvas.width = columns * cellSize;
canvas.height = rows * cellSize;
```

249. What does assigning `canvas.width` do besides set the attribute — does it **reset** the drawing buffer and context state?
250. Why 24 × 22 = 528 pixels, not 16×16 cells or 32px cells?
251. Why no `devicePixelRatio` scaling (`canvas.width = cssSize * dpr`)?
252. What does the board look like on a 2× or 3× Retina display?
253. Why `getContext("2d")` and throw if null — when is it null?
254. Why store `ctx` privately rather than re-querying?
255. Why `isWithinBounds` is `>= 0` and `< columns` (half-open)?
256. What happens if `pos.x === columns` — wall death or drawn off-buffer?
257. Why `clear()` fills `#14161a` instead of `clearRect` or a CSS variable?
258. Why is the board fill darker/lighter than `--bg` `#0c0d10`?
259. Why `drawGridLines` at all — playability vs visual noise?
260. Why `strokeStyle = "rgba(255, 255, 255, 0.05)"` and `lineWidth = 1`?
261. Why `col * cellSize + 0.5` on each line?

```ts
const x = col * this.cellSize + 0.5;
```

262. What problem do half-pixel coordinates solve for 1px canvas strokes?
263. What happens if you drop the `+ 0.5` — blurry grid?
264. Why loop `col <= columns` (fencepost) so the last border is drawn?
265. Why `drawCell(..., inset = 1)` rather than filling the full cell?
266. What happens if `inset` is `0` or `cellSize / 2`?
267. Why does `drawCell` not clip to bounds — whose job is that?
268. Why not `Path2D` or one path for the whole snake?
269. Why no `requestAnimationFrame` inside Board?

---

# Part 7 — `src/Food.ts` (lines 1–38)

270. Why is Food a class with one field rather than a `Position` on Game?
271. Why does the constructor immediately pick a random free cell rather than taking a Position?
272. Why `respawn(board, snake)` instead of constructing a new `Food`?
273. Why rejection sampling rather than building an array of free cells and picking once?

```ts
do {
  candidate = {
    x: Math.floor(Math.random() * board.columns),
    y: Math.floor(Math.random() * board.rows),
  };
} while (snake.occupiesCell(candidate));
```

274. Expected retries when the snake is length 3 on a 576-cell board? When it is length 500?
275. What happens when the snake fills **every** cell — infinite loop, crash, or “you win”?
276. Why is there no win condition in Game when `snake.length === columns * rows`?
277. Why `Math.random()` and not a seeded RNG (replays / tests)?
278. Why `Math.floor(Math.random() * n)` — can it ever equal `n`?
279. Why does Food call `snake.occupiesCell` rather than Game passing a `Set`?
280. Why does Food know `Board` — only for `columns` / `rows`?
281. Could Food place on the cell the tail will vacate this tick if respawn ran **before** `advance`?
282. Game respawns **after** `advance` — why does that order matter?
283. Why no food types / score multipliers?

---

# Part 8 — `src/Game.ts` (lines 1–206)

## Config, constants, fields

284. Why a `GameConfig` interface rather than positional constructor args?
285. Why `columns: 24, rows: 24, cellSize: 22, tickMs: 110` live in `main.ts` not in Game?
286. What happens if you set `tickMs` to `16` or `400`?
287. Why comment “lower is faster” on `tickMs`?
288. Why `KEY_TO_DIRECTION` maps both `w` and `W` (and a,s,d) instead of `event.key.toLowerCase()`?

```ts
const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: Direction.Up,
  /* ... */
  w: Direction.Up,
  W: Direction.Up,
};
```

289. What happens with `event.key` vs `event.code` on a non-US layout (WASD physically elsewhere)?
290. Why Arrow keys **and** WASD?
291. Why `HEAD_COLOR` / `BODY_COLOR` / `FOOD_COLOR` in Game.ts, not CSS, not Board?
292. Why head `#f5f5f4` and body `#8a8f98` (muted) — how do you know which cell is the head?
293. Why `private snake!: Snake` definite assignment instead of initializing in the field list?
294. Why `queuedDirection: Direction | null = null` — a **single** slot, not a queue?
295. Why `rafHandle = 0` and `lastTick = 0`?

## Constructor

296. Why construct `Board` first, then `reset()`, then `render()`?
297. Why `restartBtn.addEventListener("click", () => this.start())` rather than `bind`?
298. Why `window.addEventListener("keydown", ...)` rather than `canvas` or `document`?
299. Why are these listeners **never** removed (`removeEventListener`)?
300. What happens if you constructed two `Game` instances — double ticks, double key handlers?
301. Why call `reset()` in the constructor if status is already Idle?

## `reset`

302. Why start at `floor(columns/2), floor(rows/2)` with three segments to the left, facing Right?
303. What happens on an odd vs even grid?
304. Why length 3, not 1?
305. Why set `status = Idle` and overlay “Press an arrow key…” rather than auto-running?
306. Why `queuedDirection = null` on reset?

## `start` / `pause` / `resume` — high-signal

```ts
start(): void {
  if (this.status === GameStatus.GameOver || this.status === GameStatus.Idle) {
    this.reset();
  }
  this.status = GameStatus.Running;
  this.setOverlay("", false);
  this.lastTick = performance.now();
  cancelAnimationFrame(this.rafHandle);
  this.rafHandle = requestAnimationFrame(this.loop);
}
```

307. Why does `start()` only call `reset()` when status is GameOver or Idle?
308. What happens if you click Restart **while Running** — new game, or just restart the RAF loop without resetting score/snake?
309. What happens if you click Restart **while Paused** — reset, or resume in place?
310. Is that a bug or a feature? What would a reviewer expect a button labeled Restart to do?
311. Why `cancelAnimationFrame` before requesting another — double-loop guard?
312. Why `pause()` no-ops unless Running?
313. Why `pause()` cancels RAF rather than leaving the loop running with a status check?
314. Why `resume()` sets `lastTick = performance.now()` — what would happen if you kept the old `lastTick` (catch-up ticks / teleport)?
315. Why overlay text “Paused. Press space to resume.” while Restart also exists?

## `handleKeydown`

316. Why handle Space first, before the direction map?
317. Why `event.preventDefault()` on Space — what native behavior are you stopping (page scroll)?
318. Why Space on Idle calls `start()`, on Running `pause()`, on Paused `resume()` — and **not** GameOver?
319. How do you start after GameOver from the keyboard if Space doesn’t restart — direction keys?
320. Why `preventDefault` on Arrow keys — scroll again?
321. Why unknown keys `return` without preventDefault (so they still type/shortcut)?
322. Why assign `this.queuedDirection = direction` rather than calling `snake.setDirection` immediately?
323. What problem does “queue until next tick” solve (same-tick 180)?
324. What problem does a **one-slot** queue **not** solve (two 90° turns in one tick collapsed to a 180 that `setDirection` ignores)?
325. Why not a real queue of length 2 (classic Snake)?
326. Why `if (this.status === Idle) this.start()` after queueing a direction?

## Loop and tick

327. Why `private loop = (now: number) => { ... }` as an arrow property rather than a method?
328. What would `requestAnimationFrame(this.loop)` do if `loop` were a prototype method (losing `this`)?
329. Why re-schedule RAF at the **top** of `loop` even if this frame does not tick?
330. Why `if (this.status !== Running) return` at the start of `loop`?
331. Why `now - this.lastTick >= this.config.tickMs` rather than a fixed `setInterval(tick, 110)`?
332. Trade-offs: RAF vs `setInterval` vs `setTimeout` chain vs a fixed-timestep accumulator (`while (lag >= tickMs)`)?
333. Why `this.lastTick = now` (drop leftover dt) rather than `this.lastTick += tickMs` (catch up)?
334. What happens if a frame is delayed 500ms — skip ticks or burst?
335. Why not pause the loop when `document.hidden`?

336. Tick order: apply queued direction → `peekNextHead` → wall or self → maybe eat/grow/score → `advance` → maybe respawn → HUD → render. Why this order?
337. Why check collisions **before** `advance` rather than after?
338. Why `wouldCollideWithSelf()` does not take `nextHead` as an argument even though you already computed `nextHead`?
339. Why `positionsEqual` is a private method rather than `cellKey(a) === cellKey(b)`?
340. Why `grow(1)` **before** `advance` on eat?
341. What happens if you `advance` first then `grow` — does the tail pop on the eating move (food not “consumed” as length)?
342. Why `score += 10` hard-coded?
343. Why respawn food only if `ateFood`, and **after** advance?
344. Why `updateHud` + `render` every tick even if nothing visual changed besides snake/food?

## Game over, overlay, HUD, render

345. Why `gameOver` cancels RAF and leaves the last frame drawn (dead snake still visible under overlay)?
346. Why overlay string interpolates `score` rather than reading the HUD?
347. Why `setOverlay(message, visible)` uses `textContent` not `innerHTML`?
348. Why `overlayEl.hidden = !visible` rather than toggling a class?
349. Why `updateHud` writes `String(this.score)` and `this.status` (enum → string)?
350. Why render clears + grid + snake + food every tick instead of dirty-rect erasing the tail?
351. Why `segments.forEach((segment, index) => drawCell(..., index === 0 ? HEAD_COLOR : BODY_COLOR))`?
352. What happens if `getSegments()` were tail-first — wrong cell painted as head?
353. Why draw food after the snake (food on top if they overlapped — should they ever)?
354. Why no interpolation / sub-cell animation between ticks?
355. Why no touch / swipe / on-screen D-pad?
356. Why no speed increase as score grows?
357. Why no high score in `localStorage`?
358. Why no wrap, walls-only, or mazes?
359. Why is Game the only class that imports Board, Snake, and Food?

---

# Part 9 — `src/main.ts` (lines 1–27)

360. Why a `main()` function rather than top-level side effects?
361. Why `import { Game } from "./Game.js"` with a **`.js` extension** in a `.ts` file?

```ts
import { Game } from "./Game.js";
```

362. What happens at compile time vs at runtime in the browser if you imported `"./Game"` with no extension?
363. Why `getElementById("board") as HTMLCanvasElement | null` rather than `HTMLCanvasElement` or a type guard function?
364. Why check all five nodes then `throw new Error("Required DOM elements are missing from index.html")`?
365. What happens if overlay is missing — blank page, throw, or game with no messages?
366. Why pass `columns`, `rows`, `cellSize`, `tickMs` here rather than `data-*` attributes on the canvas?
367. Why `document.addEventListener("DOMContentLoaded", main)` when the script is already `type="module"` (deferred)?

```ts
document.addEventListener("DOMContentLoaded", main);
```

368. Modules run after the document is parsed, **before** `DOMContentLoaded` in the normal defer pipeline — so is this listener still correct?
369. What happens if you later load this module with `async`, inject it after load, or call it from the console — would `main` never run because `DOMContentLoaded` already fired?
370. Why not `main()` immediately, or `if (document.readyState === "loading") ... else main()`?
371. Why no `canvas.getContext` check here (Board throws instead)?
372. Why is this the composition root — good OOP, or a missing DI container for a 200-line game?

---

# Part 10 — `package.json` and `tsconfig.json`

## `package.json`

373. Why `"name": "snake-ts"` and `"private": true`?
374. Why `"type": "module"` — Node, `tsc`, or the browser?
375. Why scripts are only `"build": "tsc"` and `"watch": "tsc --watch"` — no `dev` / `start` / `serve`?
376. How does a reviewer actually open the game (README’s `python3 -m http.server`)?
377. Why TypeScript is a `devDependency` `^5.4.0` and there are **zero** runtime dependencies?
378. Why no test script, no `vitest` / `node:test`?
379. Why no `lint` / `prettier`?
380. Why no `engines` field?

## `tsconfig.json`

381. Why `"target": "ES2020"` and `"module": "ES2020"`?
382. What happens if you targeted `ES5` — would class fields / generators / optional chaining survive?
383. Why `"moduleResolution": "Bundler"` when there is **no bundler**?
384. What does Bundler resolution change vs `"Node16"` / `"NodeNext"` for `./Game.js` imports?
385. Why `"lib": ["ES2020", "DOM"]`?
386. Why `"outDir": "dist"` and `"rootDir": "src"`?
387. Why `"strict": true`?
388. Why also `"noUnusedLocals"`, `"noUnusedParameters"`, `"noImplicitReturns"`, `"noFallthroughCasesInSwitch"`?
389. What would `noFallthroughCasesInSwitch` catch in `nextHeadPosition`?
390. Why `"sourceMap": true` — for debugging in DevTools against `.ts` files?
391. Why `"forceConsistentCasingInFileNames": true` (macOS vs Linux CI)?
392. Why `"include": ["src/**/*.ts"]` only — dist not typechecked?
393. Why no `declaration` / `declarationMap`?
394. Why not Vite / esbuild / webpack for this demo?
395. Why commit compiled `dist/` instead of a `prepublish` / CI build?
396. Why is there no `.gitignore` in this folder (or does the parent repo ignore something else)?

---

# Part 11 — `dist/`, README, modules, hosting

397. Why does `index.html` load `dist/main.js` rather than compiling in the browser (sucrase, esm.sh, TypeScript `transpileOnly`)?
398. Why are `dist/*.js.map` committed?
399. What does `//# sourceMappingURL=main.js.map` do in DevTools?
400. What happens if you deploy without the `.map` files?
401. Why do compiled files still contain the block comments from Game/Snake/Deque?
402. Why does `dist/main.js` drop the `HTMLCanvasElement | null` annotation but keep the throw?
403. README: why will `file://` fail with CORS for ES modules?
404. What is the actual browser error, and which request is cross-origin (the HTML vs `dist/Game.js`)?
405. Why `python3 -m http.server 8000` vs `npx serve .` vs VS Code Live Server?
406. Why port 8000?
407. What MIME type must `.js` be served as for modules to work?
408. What happens if a static host serves `dist/main.js` as `text/plain`?
409. Why relative paths `style.css` and `dist/main.js` — subdirectory hosting?
410. Why no GitHub Pages / Netlify config in this folder?
411. What breaks if `src/` is deployed without `dist/`?
412. What breaks if `dist/` is deployed without `index.html` / `style.css`?
413. Why does README say the compiled JS is “already included so this works immediately without a build step”?
414. How do you keep `dist/` from lying when you edited `src/` and forgot `npm run build`?
415. Why import paths in `dist/Game.js` still say `./Board.js` — sibling modules, how many HTTP requests on first load (main, Game, Board, Snake, Food, Deque, types)?
416. Why not one concatenated file to avoid 7 module round-trips?
417. Why no `Content-Security-Policy` (inline? there is none) or canvas-taint discussion?
418. Why no service worker / PWA / install-as-app?

---

# Part 12 — OOP story, DSA story, and gaps a reviewer will probe

419. Why vanilla canvas + `tsc` in a demo when you claim React / Next.js daily — what are you proving that React would hide?
420. Why five classes (Deque, Snake, Food, Board, Game) plus `main` — is that teaching OOP or over-abstracting Snake?
421. README says Game “holds no grid math and no data-structure logic.” Point to a place Game still does geometry-ish work (`positionsEqual`, render colors, start position math).
422. Why can Snake not import Board, but Food **does** import Board and Snake?
423. Is Food’s dependency on Board a leak? Could `randomFreeCell(columns, rows, occupies)` be a pure function?
424. Why is Deque reusable while Snake is Snake-specific — would you put Deque in a shared util package?
425. Why is the occupied `Set` inside Snake rather than a `Grid` class Board owns?
426. If a reviewer says “just use an array,” what do you defend, and what do you concede (n ≤ 576, V8, interview narrative)?
427. Why is there **no unit test** for the tail-cell exception — the easiest off-by-one in the project?
428. Why no test that deque `pushFront` + `popBack` matches a reference array?
429. Why keyboard-only on a phone — is this demo desktop-interview-first?
430. Why no `aria-live` on score, no `aria-label` on canvas, overlay not `hidden` in HTML?
431. Why no `prefers-reduced-motion` slowing `tickMs` or freezing the snake?
432. Why no `devicePixelRatio`?
433. Why a one-slot `queuedDirection` instead of a length-2 queue?
434. Why Restart does not reset while Running/Paused?
435. Why rejection sampling with no full-board win?
436. Why HUD status shows `"Game Over"` with a space — enum as UI copy?
437. Why canvas colors and CSS tokens can drift?
438. Why window keydown is never unregistered?
439. Why Space on GameOver does not restart (only direction / Restart button)?
440. Why no `tabindex` / focus trap — can the game steal arrow keys from the URL bar?
441. Why no pause when the tab is in the background?
442. If a reviewer asks “what would you add next **without** changing the story of the page (Deque + Set, OOP split, no framework)?”, what is still missing: tests, DPR, direction queue of 2, Restart always `reset()`, overlay `hidden` in HTML, `aria-label` on canvas, `aria-live` on score, full-board win, touch controls, reduced-motion `tickMs`, `readyState` boot, one-file serve or a documented static server only?

---

End of questions. Walk HTML → CSS → types → Deque → Snake → Board → Food → Game → main → tooling → dist. If a reviewer jumps to DSA, input queue, canvas blur, or `file://`, use Parts 4–5, 8, and 11.
