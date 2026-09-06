# Deep-dive answers — Game loop (Q245–Q372)

Parts 6–9. Sources: `src/Board.ts`, `src/Food.ts`, `src/Game.ts`, `src/main.ts`.

Pair with [Deep-Dive-Questions.md](./Deep-Dive-Questions.md). Each answer has **Non-technical**, **Technical**, and a **Snippet** from this repo as it exists today.

This is a **vanilla canvas Snake**: `tsc` emits ES modules into `dist/`. `index.html` loads `dist/main.js` with `type="module"`. There is no bundler, no React, no touch, no `localStorage`.

## Honest facts before the questions

| Reviewer assumption (questions file) | What is actually in the repo |
| --- | --- |
| Space on GameOver does **not** restart; direction keys do | **Inverted.** Space hits `else this.start()` and **does** restart from GameOver. Direction keys only call `start()` when status is **Idle**, so after death they queue a heading and the loop stays dead. Overlay copy (“any direction key”) is wrong. |
| Direction key that starts the game is the first move | `start()` → `reset()` **clears** `queuedDirection`. From Idle, ArrowUp starts the game facing **Right**. |
| Restart always starts a new game | `start()` calls `reset()` only on **Idle** or **GameOver**. Restart while **Running** or **Paused** does **not** zero score or rebuild the snake. |
| Full-board is a win (Food.ts comment) | `Game` never checks `snake.length === 24 * 24` (**576**). Rejection sampling **spins forever**. |
| Crisp canvas on Retina / phones | `canvas.width = 24 * 22` (**528**) with **no** `devicePixelRatio`. CSS `#board { max-width: 100%; height: auto }` **scales the bitmap** → blur. |
| Direction buffer like classic Snake | **One slot.** Last key wins. Two 90° presses in one tick can become a 180 that `Snake.setDirection` **ignores**. |
| `KEY_TO_DIRECTION` uses `toLowerCase()` | It **duplicates** `w` and `W` (and a/s/d). |
| `setInterval(tick, 110)` | **RAF** loop; tick when `now - lastTick >= tickMs`. `lastTick = now` **drops leftover dt** (no catch-up burst). |
| Listeners cleaned up | `window` `keydown` and Restart `click` are **never** `removeEventListener`’d. |
| Module boot is injection-safe | `DOMContentLoaded` inside `type="module"` is fine for a parser-inserted end-of-body script. **`main` never runs** if the module is injected after load. |

What you would add next without changing Deque + Set / OOP split / no framework: `devicePixelRatio`, a length-2 direction queue, Restart always `reset()`, full-board win, `readyState` boot, unregister listeners, touch, speed-up, `localStorage` high score, `document.hidden` pause.

---

# Part 6 — `src/Board.ts`

## Class role and canvas size

### Q245. Why is Board “dumb” — geometry + drawing, no snake, no food, no score?

**Non-technical.** The board is graph paper and a paintbrush. It does not know the rules of Snake. That is why you can describe it in one sentence in an interview: “pixels and bounds, not gameplay.”

**Technical.** `Board` exposes `columns` / `rows` / `cellSize`, `isWithinBounds`, `clear`, `drawGridLines`, and `drawCell`. It never imports `Snake`, `Food`, or `GameStatus`. Collision *policy* (die at the wall, eat food, grow) lives in `Game.tick`. Occupancy lives in `Snake`’s `Set`. If Board owned the snake, every other grid game would drag Snake with it, and unit-testing “is (24, 0) out of bounds?” would need a fake snake. The cost: Game must orchestrate draw order (clear → grid → body → food) because Board cannot.

**Snippet** (`src/Board.ts`):

```ts
/**
 * Board owns grid geometry and drawing. It knows nothing about game rules,
 * the snake, or food — it just converts cells into pixels and paints them.
 */
export class Board {
  isWithinBounds(pos: Position): boolean { /* x/y vs columns/rows */ }
  drawCell(pos: Position, color: string, inset = 1): void { /* fillRect */ }
}
```

### Q246. Why would you reuse Board for another grid game? What would you still have to change?

**Non-technical.** Same grid, different pieces — chess, 2048, minesweeper. You keep the paper; you change what you stamp on it.

**Technical.** Reuse as-is: constructor that sizes the bitmap, half-open bounds, full-frame `clear`, fencepost grid, inset cells. You would still change (1) **colors** — `#14161a` and `rgba(255,255,255,0.05)` are Snake-dark, not tokens; (2) **`drawCell` inset** if tiles should be flush; (3) **maybe drop grid lines** for a tile game; (4) **DPR scaling** if you add it here (today it is missing); (5) extra primitives (`drawText`, sprites) that Snake does not need. `GameConfig`’s 24×24×22 is passed *into* Board, so a 16×16 2048 board is a constructor call, not a Board rewrite. Food/Snake/tickMs would be replaced entirely.

**Snippet** (`src/Board.ts` constructor):

```ts
constructor(canvas: HTMLCanvasElement, columns: number, rows: number, cellSize: number) {
  this.columns = columns;
  this.rows = rows;
  this.cellSize = cellSize;
  canvas.width = columns * cellSize;
  canvas.height = rows * cellSize;
}
```

### Q247. Why `readonly columns / rows / cellSize` after construction?

**Non-technical.** The paper size is decided when the game starts. Nothing mid-game should stretch the grid and leave the snake in mid-air.

**Technical.** TypeScript `readonly` is compile-time only (erased in `dist/Board.js`). It documents the invariant: Food’s `Math.random() * board.columns` and Game’s `floor(columns / 2)` start pose assume a stable grid. If you mutated `columns` after `canvas.width` was set, the bitmap, `isWithinBounds`, and `clear`’s `fillRect` would disagree. A setter that also resized the canvas and reset the snake would be a real API; a public writable field would be a foot-gun. Alternative: freeze a `BoardConfig` object and keep primitives on the instance.

**Snippet** (`src/Board.ts`):

```ts
export class Board {
  readonly columns: number;
  readonly rows: number;
  readonly cellSize: number;
  private ctx: CanvasRenderingContext2D;
```

### Q248. Why set `canvas.width` and `canvas.height` in the constructor rather than in HTML?

**Non-technical.** The HTML says “there is a board.” TypeScript says how many squares and how many pixels. One place owns the math `24 × 22`.

**Technical.** `index.html` is `<canvas id="board"></canvas>` with **no** width/height attributes. The default bitmap is **300×150**. Board overwrites that with `columns * cellSize` (528×528). Keeping size next to `columns`/`cellSize` means HTML cannot drift from `main.ts`’s config. Attribute `width="528"` would still be the bitmap size, but then three sources (HTML, CSS, TS) could disagree. CSS `#board { max-width: 100%; height: auto }` only scales **display**, not the backing store — that is Q251–Q252. Layout before the constructor runs is the 300×150 default (Q53 in the HTML set): a short CLS flash.

**Snippet** (`src/Board.ts`):

```ts
canvas.width = columns * cellSize;
canvas.height = rows * cellSize;
```

### Q249. What does assigning `canvas.width` do besides set the attribute — does it **reset** the drawing buffer and context state?

**Non-technical.** Changing the canvas size is not like resizing a photo in CSS. It throws away the picture and resets the brushes.

**Technical.** Per the Canvas spec, setting `HTMLCanvasElement.width` or `.height` (even to the **same** number) **recreates** the bitmap, clears it to transparent black, and **resets the 2D context** to defaults: `fillStyle`/`strokeStyle` black, `lineWidth` 1, identity transform, empty path, default compositing, shadow, font, etc. That is why Board assigns size **before** `getContext("2d")` and why `clear()` must re-set `fillStyle` every frame anyway. If you later added DPR code that assigned `canvas.width = css * dpr` every resize, you would wipe the frame and need a full redraw — this game never resizes the bitmap after construct. CSS `style.width` does **not** reset the buffer; only the element’s width/height **attributes/properties** do.

**Snippet** (`src/Board.ts`):

```ts
canvas.width = columns * cellSize;   // resets bitmap + 2d state
canvas.height = rows * cellSize;
const context = canvas.getContext("2d");
```

### Q250. Why 24 × 22 = 528 pixels, not 16×16 cells or 32px cells?

**Non-technical.** 24×24 cells is a familiar Snake density. 22-pixel cells make a board that fits a laptop without looking like a toy or a billboard.

**Technical.** `main.ts` passes `columns: 24, rows: 24, cellSize: 22` → bitmap **528×528**. Max body length is **576** cells (the rejection-sampling bomb in Q275). 16×16 = 256 cells fills too fast for a Deque demo; 32px cells × 24 = 768px, which overflows many 13" windows with HUD + legend. 22 is even, so `col * cellSize` is an integer; `+ 0.5` then lands on the crisp half-pixel (Q261). Odd `cellSize` still works but pairs less neatly with 1px strokes. None of these numbers are CSS tokens; change them only in `main.ts`.

**Snippet** (`src/main.ts`):

```ts
new Game({
  canvas,
  columns: 24,
  rows: 24,
  cellSize: 22,
  tickMs: 110,
  /* … */
});
```

### Q251. Why no `devicePixelRatio` scaling (`canvas.width = cssSize * dpr`)?

**Non-technical.** Phone and Mac screens pack more physical pixels into each CSS pixel. This game paints as if every screen were 1×, so the board looks slightly soft on a Retina laptop and worse when the CSS shrinks it.

**Technical.** The standard pattern is: CSS size 528×528, `const dpr = window.devicePixelRatio || 1`, `canvas.width = 528 * dpr`, `canvas.height = 528 * dpr`, `canvas.style.width/height = "528px"`, then `ctx.scale(dpr, dpr)` so game code still thinks in CSS pixels. **This repo does none of that.** `canvas.width = 528` is both the bitmap **and** the default layout size. On a 2× display the browser upscales a 528 buffer onto ~1056 device pixels (bilinear) → blurry grid and snake. On a 3× phone that is also CSS-downscaled (`max-width: 100%`), you get **two** resamples. There is no `image-rendering: pixelated` either (CSS Q132). Interview line: “I skipped DPR to keep Board twenty lines; I’d add it before putting this on a portfolio homepage.”

**Snippet** (`src/Board.ts` — live, no dpr):

```ts
canvas.width = columns * cellSize;
canvas.height = rows * cellSize;
```

### Q252. What does the board look like on a 2× or 3× Retina display?

**Non-technical.** Grid lines look a bit grey and fat instead of hairline. The snake’s 1px inset gutter shimmers. It is playable, not print-sharp.

**Technical.** Backing store is 528×528 real pixels. At `devicePixelRatio === 2` and unscaled CSS, the compositor stretches 1 bitmap pixel over 2×2 device pixels. The 0.5-offset 1px stroke (crisp on 1×) becomes a 2-device-pixel fuzzy band. When `#board { max-width: 100%; height: auto }` shrinks 528 CSS px to e.g. 320 on a phone, the same 528 buffer is scaled **down** then the display may scale **up** by dpr — classic canvas mush. `height: auto` keeps aspect 1:1, so it is not *stretched*, only *filtered*. Fix: DPR bitmap + optional `image-rendering: pixelated` if you want chunky cells.

**Snippet** (`style.css`):

```css
#board {
  display: block;
  max-width: 100%;
  height: auto;
}
```

### Q253. Why `getContext("2d")` and throw if null — when is it null?

**Non-technical.** If the browser cannot give you a drawing surface, the game cannot start. Crashing loudly is better than a black box with no error.

**Technical.** `HTMLCanvasElement.getContext("2d")` returns `CanvasRenderingContext2D | null`. It is **null** when: the context type is unsupported (ancient browsers); a **different** context was already created on this canvas (`webgl` then `2d` returns null — first context wins); the canvas is detached in some implementations; or a test fake is not a real canvas. It is **not** null merely because width is 0. `main.ts` does not check context (Q371) — Board does. `if (!context) throw` turns a later `this.ctx.fillRect` NPE into an explicit message. `document.createElement("canvas").getContext("2d")` is non-null in every browser this demo targets.

**Snippet** (`src/Board.ts`):

```ts
const context = canvas.getContext("2d");
if (!context) throw new Error("2D canvas context is not available in this browser");
this.ctx = context;
```

### Q254. Why store `ctx` privately rather than re-querying?

**Non-technical.** You ask for the brush once and keep it in a pocket. Asking every frame is noise.

**Technical.** `getContext("2d")` returns the **same** context object after the first successful call (unless the canvas was reset by width assignment). Caching avoids a method call per `clear`/`drawCell` (render does dozens of `drawCell`s per tick). Privacy stops Game from setting `globalAlpha` and surprising Board. Re-querying after a width reset would be required if Board resized itself later — it does not. Alternative: pass `ctx` into each draw method; worse API.

**Snippet** (`src/Board.ts`):

```ts
private ctx: CanvasRenderingContext2D;
// constructor: this.ctx = context;
clear(): void {
  this.ctx.fillStyle = "#14161a";
  this.ctx.fillRect(0, 0, this.columns * this.cellSize, this.rows * this.cellSize);
}
```

### Q255. Why `isWithinBounds` is `>= 0` and `< columns` (half-open)?

**Non-technical.** Cells are numbered 0 to 23. 24 is off the paper, like a fence that does not include the far post as a square.

**Technical.** Grid cells are `[0, columns)` × `[0, rows)` — standard half-open intervals, same as `Array` indices and `Math.floor(Math.random() * n)` (Q278). `x === columns` is **out**. Inclusive `<= columns - 1` is equivalent but easier to get wrong (`<= columns`). Food sampling uses the same range, so every generated cell is in-bounds by construction; only **motion** (`peekNextHead`) can step to `-1` or `24`. `Game.tick` uses this as **wall death**, not wrap.

**Snippet** (`src/Board.ts`):

```ts
isWithinBounds(pos: Position): boolean {
  return pos.x >= 0 && pos.x < this.columns && pos.y >= 0 && pos.y < this.rows;
}
```

### Q256. What happens if `pos.x === columns` — wall death or drawn off-buffer?

**Non-technical.** The snake dies at the edge. You never see a square painted past the frame.

**Technical.** `tick` checks `!this.board.isWithinBounds(nextHead)` **before** `advance` (Q337). `x === 24` → `gameOver()`, no `drawCell`. If you *did* draw `x === 24` with `cellSize` 22, `fillRect(528 + inset, …)` would start at the right edge of a 528-wide bitmap — the inset square would be **clipped** by the canvas, not drawn on the HTML overlay. Negative `x` would clip on the left. Wall death is a **Game** rule; Board would happily paint off-buffer if asked. Wrap-around (Q244 / Q358) would modulo instead of this check.

**Snippet** (`src/Game.ts`):

```ts
const nextHead = this.snake.peekNextHead();
if (!this.board.isWithinBounds(nextHead) || this.snake.wouldCollideWithSelf()) {
  this.gameOver();
  return;
}
```

### Q257. Why `clear()` fills `#14161a` instead of `clearRect` or a CSS variable?

**Non-technical.** Each frame you paint the whole board a dark grey, then draw lines and the snake on top. You do not punch a hole to whatever is behind the canvas.

**Technical.** `clearRect` sets pixels to **transparent black**. The canvas sits in `.board-frame` over `--bg` `#0c0d10`; transparent would show a slightly darker page background and any overlay bleed. An opaque fill makes the playfield a **deliberate** `#14161a` (lighter than page bg — Q258). `fillStyle` is a JS string, **not** `var(--panel)`: canvas 2D does not resolve CSS custom properties unless you `getComputedStyle`. That is the same token-drift story as `FOOD_COLOR` vs `--accent`. `clear()` is a full-frame redraw strategy (Q350), not dirty-rect.

**Snippet** (`src/Board.ts`):

```ts
clear(): void {
  this.ctx.fillStyle = "#14161a";
  this.ctx.fillRect(0, 0, this.columns * this.cellSize, this.rows * this.cellSize);
}
```

### Q258. Why is the board fill darker/lighter than `--bg` `#0c0d10`?

**Non-technical.** The page is almost black; the board is a shade up so you can see the square where you play.

**Technical.** `--bg: #0c0d10` (body). Board fill `#14161a` is a few steps lighter (more red/green/blue). `--panel: #17191d` is lighter still (HUD). The canvas is **not** `--panel` and **not** `--bg` — a third hex that cannot be themed by flipping `:root`. Grid lines `rgba(255,255,255,0.05)` assume a dark fill; a light theme would need different strokes. Interview: “hierarchy: page < board < cells.”

**Snippet** (`style.css` vs `Board.ts`):

```css
:root { --bg: #0c0d10; --panel: #17191d; }
```

```ts
this.ctx.fillStyle = "#14161a";
```

### Q259. Why `drawGridLines` at all — playability vs visual noise?

**Non-technical.** Faint graph paper helps you count squares and aim. Too strong and it fights the snake.

**Technical.** Snake on a flat fill is legal but harder to judge turns at 110ms. 5% white 1px lines are a playability aid, not a gameplay collider (collision is cell indices, not pixels). Cost: 25 vertical + 25 horizontal `beginPath`/`stroke` calls **every tick** (Q264 fencepost) on a full-frame redraw. A reviewer might call it noise on a 320px phone; `image-rendering`/DPR issues make the lines the first thing that looks cheap (Q252). Alternative: draw lines once to an offscreen canvas and `drawImage` each frame, or skip lines and rely on `drawCell` inset gutters.

**Snippet** (`src/Game.ts` `render`):

```ts
this.board.clear();
this.board.drawGridLines();
```

### Q260. Why `strokeStyle = "rgba(255, 255, 255, 0.05)"` and `lineWidth = 1`?

**Non-technical.** Hairline, almost ghost. You should notice the snake first.

**Technical.** `lineWidth = 1` in **canvas space** (not CSS px after DPR). Alpha 0.05 on white over `#14161a` yields a barely-there grey. Hex `#ffffff0d` is similar. A CSS token would not apply inside `ctx`. If you raised alpha to 0.2, the grid would dominate `BODY_COLOR` `#8a8f98`. `lineWidth` 1 plus integer coordinates would be blurry without `+ 0.5` (next questions). `lineCap` default `"butt"` is fine for axis-aligned segments.

**Snippet** (`src/Board.ts`):

```ts
this.ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
this.ctx.lineWidth = 1;
```

### Q261. Why `col * cellSize + 0.5` on each line?

**Non-technical.** You nudge the line by half a pixel so it sits in the middle of a screen pixel instead of between two.

**Technical.** Canvas strokes are **centered on the path**. A 1px-wide stroke on `x = 0` covers `[-0.5, +0.5]`, so two device pixels get anti-aliased (the classic dirty half-pixel). Adding **0.5** puts a vertical line down the center of pixel column `col * 22`. Horizontal lines use the same trick on `y`. This is the 1×-display solution. On DPR 2 without scaling, you are back to filtering (Q251). `cellSize` 22 is even, so `col * 22` is integer + 0.5 = `*.5` exactly.

**Snippet** (`src/Board.ts`):

```ts
const x = col * this.cellSize + 0.5;
this.ctx.beginPath();
this.ctx.moveTo(x, 0);
this.ctx.lineTo(x, this.rows * this.cellSize);
this.ctx.stroke();
```

### Q262. What problem do half-pixel coordinates solve for 1px canvas strokes?

**Non-technical.** Without the nudge, a “one pixel” line looks like a two-pixel smudge.

**Technical.** Rasterization covers any pixel the stroke **partials**. Centered on an integer, a 1px stroke straddles two pixels at ~50% coverage → 2px grey band. Centered at `n + 0.5`, one pixel gets ~100% coverage → crisp. This is **not** `translate(0.5, 0.5)` on the context (that would also shift `fillRect` cells). Board only offsets **strokes**. Fills use integer `pos.x * cellSize + inset` — correct for `fillRect`, which is edge-based, not center-based.

**Snippet** (`src/Board.ts`):

```ts
const y = row * this.cellSize + 0.5;
this.ctx.moveTo(0, y);
this.ctx.lineTo(this.columns * this.cellSize, y);
```

### Q263. What happens if you drop the `+ 0.5` — blurry grid?

**Non-technical.** Yes — the graph paper looks out of focus even on a 1× monitor.

**Technical.** Vertical line at `x = 22, 44, …` (integers). 1px stroke straddles adjacent pixels; alpha 0.05 × 50% coverage is even fainter **and** wider. The snake’s inset fills stay sharp, so the grid looks uniquely cheap. Some engines snap strokes; you must not rely on that. Interview demo: comment out `+ 0.5` and screenshot.

**Snippet** (`src/Board.ts` — what not to ship):

```ts
const x = col * this.cellSize; // integer → 1px stroke antialiases across 2 pixels
```

### Q264. Why loop `col <= columns` (fencepost) so the last border is drawn?

**Non-technical.** 24 cells need 25 lines — like 24 fence panels needing 25 posts.

**Technical.** `col = 0 … 24` inclusive: left edge of column 0 through **right** edge of column 23 (`24 * 22 + 0.5 = 528.5`, which clips to the last pixel column). `col < columns` would omit the right border. Same for `row <= rows`. That is 25+25 strokes per frame. The frame’s CSS `border-radius: 8px; overflow: hidden` clips the outer 0.5px of those edge strokes slightly — acceptable.

**Snippet** (`src/Board.ts`):

```ts
for (let col = 0; col <= this.columns; col++) { /* 25 lines */ }
for (let row = 0; row <= this.rows; row++) { /* 25 lines */ }
```

### Q265. Why `drawCell(..., inset = 1)` rather than filling the full cell?

**Non-technical.** Each square is a little smaller than the grid hole, so a dark gutter and the grid line stay visible around the snake.

**Technical.** `fillRect(x * 22 + 1, y * 22 + 1, 20, 20)` leaves a 1px pad on each side. Full-cell fill (`inset = 0`) would **cover** the 1px grid strokes at cell interiors (edge strokes might remain). `inset` default 1 is a JS default argument, not per-call from Game — food, head, and body all share it. The gutter is playfield `#14161a`, which reads as a crack between segments.

**Snippet** (`src/Board.ts`):

```ts
drawCell(pos: Position, color: string, inset = 1): void {
  this.ctx.fillStyle = color;
  this.ctx.fillRect(
    pos.x * this.cellSize + inset,
    pos.y * this.cellSize + inset,
    this.cellSize - inset * 2,
    this.cellSize - inset * 2
  );
}
```

### Q266. What happens if `inset` is `0` or `cellSize / 2`?

**Non-technical.** Zero: tiles kiss and hide the graph paper. Half cell: tiny dots in the middle; the snake looks like a dotted line.

**Technical.** `inset = 0`: size 22×22, flush, paints over interior grid lines. `inset = 11` (`cellSize / 2`): width `22 - 22 = 0` — **invisible** cells (or 1px crumbs if you used 10). `inset > cellSize / 2` yields **negative** width/height; spec still fills, but you get flipped/empty rects — a bug. Game never passes inset, so 1 is the only live value.

**Snippet** (`src/Game.ts`):

```ts
this.board.drawCell(segment, index === 0 ? HEAD_COLOR : BODY_COLOR);
this.board.drawCell(this.food.getPosition(), FOOD_COLOR);
```

### Q267. Why does `drawCell` not clip to bounds — whose job is that?

**Non-technical.** The painter draws whatever square you name. The referee decides you cannot walk off the map.

**Technical.** No `isWithinBounds` inside `drawCell`. Clipping to the bitmap is the canvas’s natural clip. **Logical** bounds are `Game.tick` + `Board.isWithinBounds` before `advance`. Food never asks to draw out of range because sampling uses `0 … columns-1`. Splitting “can paint” from “may move” keeps Board reusable (Q245). A defensive `if (!this.isWithinBounds(pos)) return` would hide Game bugs.

**Snippet** (`src/Board.ts`):

```ts
drawCell(pos: Position, color: string, inset = 1): void {
  this.ctx.fillStyle = color;
  this.ctx.fillRect(/* no bounds check */);
}
```

### Q268. Why not `Path2D` or one path for the whole snake?

**Non-technical.** Today each square is its own little rectangle. Batching them into one path is a speed trick this board is too small to need.

**Technical.** 576 cells max, ~dozens of `fillRect`s per 110ms tick — trivial vs 60fps. `Path2D` + one `fill` still needs **two colors** (head vs body), so at least two paths, plus food. `fillRect` is already a fast built-in. A single path would also fight per-cell inset. Interview: “I’d batch if we interpolated at 60fps or drew thousands of particles; not for 24×24 Snake.”

**Snippet** (`src/Game.ts`):

```ts
segments.forEach((segment, index) => {
  this.board.drawCell(segment, index === 0 ? HEAD_COLOR : BODY_COLOR);
});
```

### Q269. Why no `requestAnimationFrame` inside Board?

**Non-technical.** The board does not run the clock. The game does. The board only paints when asked.

**Technical.** If Board owned RAF, pause/resume/gameOver would leak into a “dumb” class, and you would get two loops if Game also scheduled (Q300). `render()` is a **synchronous** paint from `tick` and from the constructor. `loop` lives on Game as an arrow property (Q327). This is the view/controller split the README claims.

**Snippet** (`src/Game.ts`):

```ts
private loop = (now: number): void => {
  if (this.status !== GameStatus.Running) return;
  this.rafHandle = requestAnimationFrame(this.loop);
  if (now - this.lastTick >= this.config.tickMs) {
    this.lastTick = now;
    this.tick();
  }
};
```

---

# Part 7 — `src/Food.ts`

### Q270. Why is Food a class with one field rather than a `Position` on Game?

**Non-technical.** Food is a thing that knows how to jump to an empty square. That behavior is bigger than a pair of numbers sitting on Game.

**Technical.** The class wraps `position` plus `respawn` / `randomFreeCell`. Game stays an orchestrator: it does not own rejection sampling. Cost: a class for one `{x,y}` looks heavy; a pure `randomFreeCell(columns, rows, occupies)` (Q423) would be smaller and would not import Board+Snake. The OOP story of the demo is five classes — Food exists so you can say “placement is not Game’s job.” `getPosition()` returns the live object (not a copy); Game must not mutate it.

**Snippet** (`src/Food.ts`):

```ts
export class Food {
  private position: Position;
  getPosition(): Position {
    return this.position;
  }
  respawn(board: Board, snake: Snake): void {
    this.position = Food.randomFreeCell(board, snake);
  }
}
```

### Q271. Why does the constructor immediately pick a random free cell rather than taking a Position?

**Non-technical.** When food comes into existence, it is already somewhere legal. Game never has to remember a default apple square.

**Technical.** `new Food(board, snake)` always calls `randomFreeCell`. `reset()` constructs a new Food after a new Snake, so the apple cannot spawn on the three-segment start body. A fixed spawn (e.g. `{x: 18, y: 12}`) would be deterministic and test-friendly (Q277) but less “game-like.” There is no `Food.at(pos)` factory. If sampling hung (full board), the constructor would hang — at reset the snake is length 3, so it cannot.

**Snippet** (`src/Food.ts`):

```ts
constructor(board: Board, snake: Snake) {
  this.position = Food.randomFreeCell(board, snake);
}
```

### Q272. Why `respawn(board, snake)` instead of constructing a new `Food`?

**Non-technical.** Same apple, new square. You do not throw the object away each time you eat.

**Technical.** `respawn` mutates `this.position`. Identity stability does not matter here (nothing holds a Food reference except Game). `new Food` would also work and would match `reset()`. Reuse avoids an allocation every eat (~score/10 times per game) — irrelevant at this scale. The method still needs Board+Snake because free-cell logic is static on Food, not stored. After GameOver, food is not respawned; a new Food is created on `reset()`.

**Snippet** (`src/Game.ts`):

```ts
this.snake.advance();
if (ateFood) {
  this.food.respawn(this.board, this.snake);
}
```

### Q273. Why rejection sampling rather than building an array of free cells and picking once?

**Non-technical.** “Pick a random square; if the snake is there, try again” is three lines. Building a list of every empty square is more code for a board that is almost always mostly empty.

**Technical.** Rejection: `do { random cell } while (occupiesCell)` — expected trials `1 / (1 - L/576)` (Q274). The **failure mode** is `L === 576`: the condition is always true → **infinite loop** (Q275). The correct O(free) algorithm: collect unoccupied cells (or pick `k` in `[0, 576-L)` and walk the grid). That also makes “no free cell” a natural empty-array win. Comment in Food.ts claims a packed board is “you win anyway”; **Game never implements that**. Interview: “I used rejection because L is tiny vs 576 until the endgame, and I left a landmine.”

**Snippet** (`src/Food.ts`):

```ts
do {
  candidate = {
    x: Math.floor(Math.random() * board.columns),
    y: Math.floor(Math.random() * board.rows),
  };
} while (snake.occupiesCell(candidate));
```

### Q274. Expected retries when the snake is length 3 on a 576-cell board? When it is length 500?

**Non-technical.** At the start the apple almost always lands first try. When the snake is huge, it may guess several occupied squares before an empty one.

**Technical.** Geometric distribution: success probability `p = (576 - L) / 576`. Expected number of **trials** (not extra retries) is `1/p`. L=3: `p = 573/576 ≈ 0.995`, **E[trials] ≈ 1.005**. L=500: `p = 76/576 ≈ 0.132`, **E[trials] ≈ 7.6**. L=575: `p = 1/576`, **E ≈ 576** trials — still fine. L=576: `p = 0`, **undefined / infinite**. Variance grows as `p` shrinks; you can theoretically get unlucky streaks at L=500 but not UI-visible hangs until L is extremely close to 576.

**Snippet** (`src/Food.ts` comment vs math):

```ts
// With a board much larger than the snake this converges immediately;
// a fully-packed board is effectively a "you win" state anyway.
```

### Q275. What happens when the snake fills **every** cell — infinite loop, crash, or “you win”?

**Non-technical.** The tab locks up. There is no “you win” screen. The comment in the food file is wishful.

**Technical.** After eating the last apple, `grow(1)` then `advance()` makes `length === 576` and `occupied` has every `cellKey`. Then `respawn` → `randomFreeCell` → `while (snake.occupiesCell(candidate))` never exits. RAF is mid-`tick` on the stack; the page janks, click handlers freeze, DevTools may break. No exception, no `GameStatus` win. To hit this you need score `10 * (576 - 3) = 5730` without dying — possible in theory, not in a casual demo. **This is the Food landmine.** Fix: `if (snake.length === board.columns * board.rows) { win(); return; }` **before** respawn.

**Snippet** (`src/Food.ts`):

```ts
} while (snake.occupiesCell(candidate)); // never false when length === 576
```

### Q276. Why is there no win condition in Game when `snake.length === columns * rows`?

**Non-technical.** The project is a Deque + Set demo, not an arcade ROM. Winning by filling the board was never wired.

**Technical.** `tick` only ends on wall/self. Full-board is the one state Food cannot handle. A win branch would: skip respawn, `cancelAnimationFrame`, overlay “You win”, maybe a new `GameStatus.Won` (HUD currently uses enum strings — Q349). Leaving it out keeps the state machine four values, at the cost of Q275. Honest interview answer: “gap, not a feature.”

**Snippet** (`src/Game.ts` — no win path):

```ts
if (!this.board.isWithinBounds(nextHead) || this.snake.wouldCollideWithSelf()) {
  this.gameOver();
  return;
}
```

### Q277. Why `Math.random()` and not a seeded RNG (replays / tests)?

**Non-technical.** Each game the apple surprises you. You cannot replay the same food sequence for a bug report.

**Technical.** `Math.random()` is implementation-defined, not seedable. Tests cannot assert “food at (7,3).” A `mulberry32(seed)` passed into Food would enable replays and golden tests. This repo has **no tests** (Q200 / Q378). For a live demo, unseeded random is fine. `crypto.getRandomValues` would be slower and still unseeded.

**Snippet** (`src/Food.ts`):

```ts
x: Math.floor(Math.random() * board.columns),
y: Math.floor(Math.random() * board.rows),
```

### Q278. Why `Math.floor(Math.random() * n)` — can it ever equal `n`?

**Non-technical.** You get 0 through 23, never 24, so the apple always lands on a real cell.

**Technical.** `Math.random()` is in **`[0, 1)`** — 1 is excluded. `Math.random() * 24` is in `[0, 24)`. `floor` yields `0…23`. It **cannot** equal `n` except NaN edge cases (`n` is a positive integer here). `Math.round` **could** hit 24 and would be a wall-spawn bug. `crypto` + rejection is overkill. Pair with half-open `isWithinBounds`.

**Snippet** (`src/Food.ts`):

```ts
x: Math.floor(Math.random() * board.columns), // 0 .. columns-1
```

### Q279. Why does Food call `snake.occupiesCell` rather than Game passing a `Set`?

**Non-technical.** Food asks the snake “are you on this square?” It does not reach into the snake’s pockets.

**Technical.** `occupiesCell` is the O(1) `Set` wrapper (`cellKey`). Food depends on the **Snake class**, not on `Set<string>` or `cellKey`’s comma format. Encapsulation: if occupancy became a bitboard, Food would not change. Cost: Food imports Snake (and Board) — the leak Q422–Q423 discuss. Game passing `(pos) => snake.occupiesCell(pos)` or a `ReadonlySet` would invert the dependency. Scanning `getSegments()` would be O(L) per attempt × expected trials — worse at endgame.

**Snippet** (`src/Food.ts`):

```ts
} while (snake.occupiesCell(candidate));
```

### Q280. Why does Food know `Board` — only for `columns` / `rows`?

**Non-technical.** Food needs the paper size, not the paintbrush.

**Technical.** Only `board.columns` and `board.rows` are read. `cellSize`, `ctx`, `drawCell` are unused. The type is `Board` so you cannot pass a loose `{columns, rows}` without structural typing (you actually *could* — TypeScript structural typing would accept a duck with those fields). Importing Board couples Food to a canvas class. Cleaner: `randomFreeCell(width, height, occupied)`. Live choice is OOP-demo convenience.

**Snippet** (`src/Food.ts`):

```ts
x: Math.floor(Math.random() * board.columns),
y: Math.floor(Math.random() * board.rows),
```

### Q281. Could Food place on the cell the tail will vacate this tick if respawn ran **before** `advance`?

**Non-technical.** No — that tail square still counts as “snake” until the move happens. The dangerous square is the *new* head, which is still empty.

**Technical.** Before `advance`, `occupied` still contains the tail. `occupiesCell(tail)` is true, so rejection **will not** pick the vacating tail. It **can** pick `nextHead`, which is not occupied yet (unless that cell was already body — then you would have died on self-collision before eat). Order in a wrong `tick`: grow → respawn → advance could spawn food on the cell you are about to step onto; after `advance` the head sits on the new apple (drawn on top, Q353) but `ateFood` next tick compares **next** head to food, so you would not instantly re-eat. Still a spawn-under-head bug. Live code respawns **after** advance (Q282).

**Snippet** (`src/Food.ts` + occupancy):

```ts
} while (snake.occupiesCell(candidate)); // tail still occupied before advance()
```

### Q282. Game respawns **after** `advance` — why does that order matter?

**Non-technical.** First the snake slides (and grows), then the new apple looks at the body *including the new head*. The apple cannot appear in the snake’s mouth.

**Technical.** Eat path: `grow(1)` → `advance()` (head pushed, tail **not** popped) → `respawn`. `occupied` contains the new head, so `randomFreeCell` cannot return it. If respawn ran before `advance`, Q281’s “spawn on nextHead” hole exists. Tail-on-eat stays occupied (growth), which is correct: food must not spawn on the old tail either. This order is **load-bearing**. Do not “clean up” by respawning earlier.

**Snippet** (`src/Game.ts`):

```ts
if (ateFood) {
  this.snake.grow(1);
  this.score += 10;
}
this.snake.advance();
if (ateFood) {
  this.food.respawn(this.board, this.snake);
}
```

### Q283. Why no food types / score multipliers?

**Non-technical.** One apple, ten points. The demo is the body data structure, not a power-up design document.

**Technical.** A single `FOOD_COLOR` and `score += 10`. Types would need a Food variant enum, extra draw colors, maybe timed despawn — all in Game/Food, none of it Deque/Set. Out of story. Same bucket as no speed-up (Q356).

**Snippet** (`src/Game.ts`):

```ts
const FOOD_COLOR = "#2dd4bf";
this.score += 10;
```

---

# Part 8 — `src/Game.ts`

## Config, constants, fields

### Q284. Why a `GameConfig` interface rather than positional constructor args?

**Non-technical.** You pass a labeled bag of knobs — canvas, sizes, HUD nodes — instead of a 10-argument puzzle.

**Technical.** `new Game({ canvas, columns, rows, cellSize, tickMs, scoreEl, statusEl, overlayEl, restartBtn })` is self-documenting at the composition root (`main.ts`). Positional `constructor(canvas, 24, 24, 22, 110, …)` is easy to swap `rows`/`cellSize`. The interface is the seam for tests (fake canvas, fake buttons) even though there are no tests. All fields are required — no partial config / defaults. `tickMs` is documented on the interface (“lower is faster”).

**Snippet** (`src/Game.ts`):

```ts
export interface GameConfig {
  canvas: HTMLCanvasElement;
  columns: number;
  rows: number;
  cellSize: number;
  /** Milliseconds between moves — lower is faster. */
  tickMs: number;
  scoreEl: HTMLElement;
  statusEl: HTMLElement;
  overlayEl: HTMLElement;
  restartBtn: HTMLButtonElement;
}
```

### Q285. Why `columns: 24, rows: 24, cellSize: 22, tickMs: 110` live in `main.ts` not in Game?

**Non-technical.** Game is the engine. `main` is the place that says “this demo is 24 wide and a bit more than 100ms per step.”

**Technical.** Game stays reusable at 8×8 or 40×40 without editing `Game.ts`. Board is constructed from those numbers. The trade-off: a reviewer opening only `Game.ts` cannot see the live board size; they must open `main.ts`. HTML does not use `data-columns` (Q366). Constants are not `as const` in a `DEFAULTS` export — they are inline in `new Game({…})`.

**Snippet** (`src/main.ts`):

```ts
new Game({
  canvas,
  columns: 24,
  rows: 24,
  cellSize: 22,
  tickMs: 110,
  scoreEl,
  statusEl,
  overlayEl,
  restartBtn,
});
```

### Q286. What happens if you set `tickMs` to `16` or `400`?

**Non-technical.** 16ms: the snake becomes a blur; you cannot steer. 400ms: it crawls; anyone can play.

**Technical.** Tick fires when `now - lastTick >= tickMs` (Q331). `16` ≈ one move per display frame (60Hz) — input queue of one slot (Q324) becomes punishing; collisions feel instant. `400` is four moves per second. `tickMs: 0` would tick **every RAF** (`>= 0` always). Negative would also always tick. `prefers-reduced-motion` does **not** change `tickMs` (CSS only kills the button transition). There is no speed ramp (Q356).

**Snippet** (`src/Game.ts`):

```ts
if (now - this.lastTick >= this.config.tickMs) {
  this.lastTick = now;
  this.tick();
}
```

### Q287. Why comment “lower is faster” on `tickMs`?

**Non-technical.** People hear “tick” and think metronome speed. The comment stops someone from raising 110 to 200 thinking that means faster.

**Technical.** The unit is **period**, not frequency. `tickMs` is not FPS; RAF still runs ~60Hz and **skips** work until the period elapses. JSDoc on `GameConfig.tickMs` is the only hint; the HUD does not show speed. Alternative name: `moveIntervalMs`.

**Snippet** (`src/Game.ts`):

```ts
/** Milliseconds between moves — lower is faster. */
tickMs: number;
```

### Q288. Why `KEY_TO_DIRECTION` maps both `w` and `W` (and a,s,d) instead of `event.key.toLowerCase()`?

**Non-technical.** Caps Lock should still move. The table lists both sizes of WASD instead of normalizing the key.

**Technical.** `event.key` for letters is **case-sensitive** and reflects Caps Lock / Shift. Without `W`, Caps Lock would make WASD dead while arrows still worked. `toLowerCase()` on a **copy** of `event.key` would collapse the table to four letters **but** would also lowercase `ArrowUp` → `"arrowup"`, which is **not** in the map — so you must only lower-case length-1 keys, or look up `event.key` then `event.key.toLowerCase()`. Live code duplicates eight WASD entries. `ArrowUp` has no case twin. This is the high-signal “duplicates w and W” point.

**Snippet** (`src/Game.ts`):

```ts
const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: Direction.Up,
  ArrowDown: Direction.Down,
  ArrowLeft: Direction.Left,
  ArrowRight: Direction.Right,
  w: Direction.Up,
  s: Direction.Down,
  a: Direction.Left,
  d: Direction.Right,
  W: Direction.Up,
  S: Direction.Down,
  A: Direction.Left,
  D: Direction.Right,
};
```

### Q289. What happens with `event.key` vs `event.code` on a non-US layout (WASD physically elsewhere)?

**Non-technical.** The letters W,A,S,D follow the printed character, not the physical keys in the WASD cluster. On AZERTY, the key where QWERTY’s W lives is Z.

**Technical.** `event.key` is the **character** produced (after layout). `event.code` is the **physical** key (`KeyW`, `KeyA`, …) independent of layout. This game uses `event.key`, so French AZERTY players must press the keys that *type* A/Z/S/Q (AZERTY’s WASD-equivalent cluster is ZQSD). Arrows are layout-stable (`ArrowUp`). Interview: “I’d bind `event.code` for WASD-as-positions and keep `event.key` for Space; or offer both.”

**Snippet** (`src/Game.ts`):

```ts
const direction = KEY_TO_DIRECTION[event.key];
if (!direction) return;
```

### Q290. Why Arrow keys **and** WASD?

**Non-technical.** Some people play with one hand on arrows, some on WASD from other games. The hint line in HTML advertises both.

**Technical.** Two input dialects map to the same `Direction` enum. Space is pause, not a direction. There is no vim `hjkl`. Duplicate mappings increase the one-slot queue collisions if a player mashes both (last key wins). HTML hint must stay in sync (questions Part 1 Q69). No `preventDefault` on letters except when they hit the map — `w` will preventDefault and **won’t** type in a future focused input (Q58 / Q320).

**Snippet** (`index.html`):

```html
<p class="hint">Arrow keys / WASD to move &middot; Space to pause</p>
```

### Q291. Why `HEAD_COLOR` / `BODY_COLOR` / `FOOD_COLOR` in Game.ts, not CSS, not Board?

**Non-technical.** The engine decides what color the head, body, and apple are when it stamps them. CSS styles the chrome around the canvas, not the pixels inside it.

**Technical.** Canvas 2D fill styles are strings set in JS. CSS `--accent: #2dd4bf` **matches** `FOOD_COLOR` by convention only — change one, the other drifts (portfolio-style token bug). Board stays color-agnostic (`drawCell(pos, color)`). Putting hex in Board would make Board Snake-specific (Q245). `BODY_COLOR` `#8a8f98` equals `--muted`. `HEAD_COLOR` `#f5f5f4` is not `--text` (`#e4e4e7`). No `getComputedStyle(document.documentElement).getPropertyValue('--accent')`.

**Snippet** (`src/Game.ts`):

```ts
const HEAD_COLOR = "#f5f5f4";
const BODY_COLOR = "#8a8f98";
const FOOD_COLOR = "#2dd4bf";
```

### Q292. Why head `#f5f5f4` and body `#8a8f98` (muted) — how do you know which cell is the head?

**Non-technical.** The head is almost white; the body is grey. You always see which end is steering.

**Technical.** Contrast, not a sprite. `render` paints `index === 0` as head because `getSegments()` is **head-first** (Q351–Q352). If those hexes were too close, a long snake would be unreadable at 22px. Food teal vs grey body is the second contrast channel. Colorblind risk: teal vs grey is mostly lightness; not as bad as red/green, but there is no pattern/shape distinction.

**Snippet** (`src/Game.ts`):

```ts
segments.forEach((segment, index) => {
  this.board.drawCell(segment, index === 0 ? HEAD_COLOR : BODY_COLOR);
});
```

### Q293. Why `private snake!: Snake` definite assignment instead of initializing in the field list?

**Non-technical.** TypeScript is told “I will assign snake before anyone reads it.” The constructor’s `reset()` is that assignment.

**Technical.** `!` is the definite assignment assertion: fields are not initialized at declaration because `reset()` creates them (and **re**-creates on each new game). Without `!`, `strict` + `strictPropertyInitialization` errors. `reset()` is called from the constructor **before** `render()`, which reads `this.snake`. If someone later called `render()` from a subclass constructor before `reset()`, `snake!` would be a lie → runtime throw. Alternative: `snake: Snake | null` and guards — noisier. Same pattern on `food!`.

**Snippet** (`src/Game.ts`):

```ts
private snake!: Snake;
private food!: Food;

constructor(config: GameConfig) {
  /* … */
  this.reset();
  this.render();
}
```

### Q294. Why `queuedDirection: Direction | null = null` — a **single** slot, not a queue?

**Non-technical.** The game remembers at most one “next turn.” If you press two directions before the snake steps, only the last press counts.

**Technical.** Classic Snake often keeps a **length-2** FIFO so Up then Left in one tick becomes two legal 90° turns on two ticks. This field is overwritten: `this.queuedDirection = direction`. Combined with `setDirection` ignoring 180s vs the **already applied** heading (not vs the queue), two 90s can collapse into an ignored 180 (Q324). `null` means “keep current heading.” Cleared every tick after apply, and on `reset()`. High-signal limitation.

**Snippet** (`src/Game.ts`):

```ts
private queuedDirection: Direction | null = null;
this.queuedDirection = direction; // last key wins
```

### Q295. Why `rafHandle = 0` and `lastTick = 0`?

**Non-technical.** Zero means “no animation frame booked yet” and “we have not started the clock.”

**Technical.** `requestAnimationFrame` returns a non-zero `long`. `cancelAnimationFrame(0)` is a spec’d no-op, so `start()` can `cancelAnimationFrame(this.rafHandle)` before the first request without a flag. `lastTick = 0` would make the first `now - 0 >= 110` immediately true, but `start()`/`resume()` set `lastTick = performance.now()` **before** the next frame, so the snake waits one period after start (no instant step). Using `0` as sentinel beats `-1` or `undefined` because the field type is `number`.

**Snippet** (`src/Game.ts`):

```ts
private lastTick = 0;
private rafHandle = 0;
```

## Constructor

### Q296. Why construct `Board` first, then `reset()`, then `render()`?

**Non-technical.** Stretch the canvas, place snake and food, then paint so the first thing you see is a real frame, not a 300×150 blank.

**Technical.** Board’s constructor assigns `canvas.width` (resets buffer — Q249). `reset()` needs `this.board.columns/rows` for the start pose and `new Food(this.board, this.snake)`. `render()` needs snake + food. Listeners are bound **before** `reset` so a hyper-fast click is still handled (Restart during construct is unlikely). Order swap `render` before `reset` would throw on `this.snake`. Overlay text comes from `reset` → `setOverlay`, not from `render`.

**Snippet** (`src/Game.ts`):

```ts
this.board = new Board(config.canvas, config.columns, config.rows, config.cellSize);
config.restartBtn.addEventListener("click", () => this.start());
window.addEventListener("keydown", (event) => this.handleKeydown(event));
this.reset();
this.render();
```

### Q297. Why `restartBtn.addEventListener("click", () => this.start())` rather than `bind`?

**Non-technical.** The arrow means “when clicked, start *this* game,” not some lost `this`.

**Technical.** Arrow lexical `this` is the Game instance. `this.start.bind(this)` is equivalent but allocates a named bound function you *could* remove later — they never remove (Q299). A raw `this.start` as listener would call `start` with `this === restartBtn` (or `undefined` in strict) → explode on `this.status`. The Restart **label** vs `start()` semantics is Q308–Q310.

**Snippet** (`src/Game.ts`):

```ts
config.restartBtn.addEventListener("click", () => this.start());
```

### Q298. Why `window.addEventListener("keydown", ...)` rather than `canvas` or `document`?

**Non-technical.** You do not have to click the board first. Arrows work as soon as the window is focused.

**Technical.** `canvas` is not in the tab order (`tabindex` missing — HTML Q57). A canvas listener would require focus on the canvas. `document` would miss keys if focus were in another document (iframe); `window` is the usual game-global sink. Cost: arrows/WASD/`Space` steal scrolling and type into **any** focused control on a future bigger page (Q58, Q320). `window` vs `document` is nearly identical for a single-document demo. Capture phase is not used.

**Snippet** (`src/Game.ts`):

```ts
window.addEventListener("keydown", (event) => this.handleKeydown(event));
```

### Q299. Why are these listeners **never** removed (`removeEventListener`)?

**Non-technical.** The page is the game. There is no “leave the game” that should stop listening.

**Technical.** Anonymous arrows cannot be removed without storing the function reference. One `Game` per page load → no leak in production. If `main()` ran twice (Q369 console / Q300), you would stack handlers. A SPA unmount would leak RAF + keydown. Interview fix: store `this.onKey = (e) => this.handleKeydown(e)`, `destroy()` cancels RAF and removes both listeners. **High-signal gap.**

**Snippet** (`src/Game.ts`):

```ts
config.restartBtn.addEventListener("click", () => this.start());
window.addEventListener("keydown", (event) => this.handleKeydown(event));
// no removeEventListener, no destroy()
```

### Q300. What happens if you constructed two `Game` instances — double ticks, double key handlers?

**Non-technical.** Two brains, one board. Keys fire twice; the snake jumps extra steps; the HUD fights itself.

**Technical.** Two Boards both set `canvas.width` (each assignment **clears** the bitmap — flicker). Two `keydown` listeners: one key queues direction on **both** Games (last listener still sequential, both set their own `queuedDirection`). Two RAF loops call `tick` ~2× per period if both Running — double speed / double death checks writing one canvas. Score elements are the same DOM nodes — last `updateHud` wins per frame. `main` only constructs one. No singleton guard.

**Snippet** (`src/main.ts`):

```ts
new Game({ /* … */ }); // once
```

### Q301. Why call `reset()` in the constructor if status is already Idle?

**Non-technical.** Idle is a label. `reset()` is the work: build a snake, spawn food, zero score, show the overlay text.

**Technical.** Field initializer `status = Idle` does not create `snake`/`food`. `reset()` assigns those, `queuedDirection = null`, overlay copy, HUD. Constructor `status` is overwritten with Idle again — redundant but cheap. Skipping `reset()` would leave `snake!` unassigned until first `start()`; `render()` would throw. `start()` from Idle calls `reset()` **again** (Q307) — double reset on first key.

**Snippet** (`src/Game.ts`):

```ts
private status: GameStatus = GameStatus.Idle;
constructor(config: GameConfig) {
  /* … */
  this.reset();
  this.render();
}
```

## `reset`

### Q302. Why start at `floor(columns/2), floor(rows/2)` with three segments to the left, facing Right?

**Non-technical.** The snake appears in the middle, pointing right, with a short tail to the left — the textbook opening.

**Technical.** `startX = startY = floor(24/2) = 12`. Segments tail-first: `(10,12), (11,12), (12,12)` + `Direction.Right` (Snake constructor: last segment is head). Facing Right with the body to the west means the first move is toward empty space, not into itself. `startX - 2 >= 0` requires `columns >= 3`. A 2-wide board would spawn `x = -1` — no validation (Snake Q217). Symmetric and independent of odd/even except Q303.

**Snippet** (`src/Game.ts`):

```ts
const startX = Math.floor(this.board.columns / 2);
const startY = Math.floor(this.board.rows / 2);
const initialSegments: Position[] = [
  { x: startX - 2, y: startY },
  { x: startX - 1, y: startY },
  { x: startX, y: startY },
];
this.snake = new Snake(initialSegments, Direction.Right);
```

### Q303. What happens on an odd vs even grid?

**Non-technical.** Even: there is no single center cell, so you pick the lower-right of the four-center. Odd: you sit on the exact middle cell.

**Technical.** 24 is even → center is between 11 and 12; `floor` picks **12**. 25 would pick 12 as true center. Visual offset is half a cell on even grids — invisible in play. Spawn still has 10 cells of padding to the right wall (`12` → `23`). `floor` vs `ceil` only shifts by one cell.

**Snippet** (`src/Game.ts`):

```ts
const startX = Math.floor(this.board.columns / 2); // 24 → 12, not 11.5
```

### Q304. Why length 3, not 1?

**Non-technical.** A one-pixel worm does not look like Snake, and turning around would not mean anything.

**Technical.** Length 1: `setDirection`’s 180 ignore is unnecessary (no neck). Length 2: a 180 is instant death without the ignore. Length 3 is the classic “there is a neck” demo for `OPPOSITE` and for Deque `pushFront`/`popBack`. Occupies 3 cells so Food’s first sample has 573 free cells. HTML/README story matches.

**Snippet** (`src/Game.ts`):

```ts
// Tail-first list: three segments extending left of center, head on the right.
```

### Q305. Why set `status = Idle` and overlay “Press an arrow key…” rather than auto-running?

**Non-technical.** The game waits for you. A snake already crawling when the page loads would die before you found the keys.

**Technical.** Auto-run would need a default direction (Right) and RAF in the constructor — hostile. Idle + overlay is the tutorial. Space on Idle also `start()` (Q318). Direction on Idle `start()` **after** queueing, but `reset()` inside `start()` **drops** that direction (Q326). Overlay is not in the HTML (HTML Q63); JS-less users see an empty overlay covering the canvas.

**Snippet** (`src/Game.ts`):

```ts
this.status = GameStatus.Idle;
this.setOverlay("Press an arrow key or WASD to start. Space pauses.", true);
```

### Q306. Why `queuedDirection = null` on reset?

**Non-technical.** A new game should not inherit the last key you mashed while dying.

**Technical.** Clears the one-slot buffer so tick 1 uses `Direction.Right` from the new Snake. Combined with `start()` calling `reset()` on Idle, this is exactly why the **start key is ignored** (Q326). On GameOver, a direction key sets `queuedDirection` but does **not** `start()`; if you then click Restart, `start()` → `reset()` clears that key too. Correct for “don’t replay death input”; accidental for “start with Up.”

**Snippet** (`src/Game.ts`):

```ts
this.queuedDirection = null;
this.status = GameStatus.Idle;
```

## `start` / `pause` / `resume` — high-signal

### Q307. Why does `start()` only call `reset()` when status is GameOver or Idle?

**Non-technical.** The author wired “begin playing” for the two states where there is no active run. They reused that method for the Restart **button**, which is the bug.

**Technical.** Predicate: rebuild world only if you were Idle (first start / post-reset) or dead. Running/Paused skip `reset()`, then **unconditionally** set `Running`, hide overlay, stamp `lastTick`, cancel+request RAF. That is a **resume-or-kick-the-loop** function named in a way Restart cannot honor. Space on Idle/GameOver also uses this (Q318). Direction on Idle uses this and then `reset()` wipes the just-queued key.

**Snippet** (`src/Game.ts`):

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

### Q308. What happens if you click Restart **while Running** — new game, or just restart the RAF loop without resetting score/snake?

**Non-technical.** Not a new game. Score, snake, and food stay. The button lies.

**Technical.** Status is Running → skip `reset()`. Then `status = Running` (no-op), overlay hidden (already), `lastTick = now` (**delays** the next move by up to 110ms), `cancelAnimationFrame` + new RAF (guards double-loop — Q311). Play continues. High-signal **bug vs label**.

**Snippet** (`src/Game.ts`):

```ts
config.restartBtn.addEventListener("click", () => this.start());
// Running → start() does not call reset()
```

### Q309. What happens if you click Restart **while Paused** — reset, or resume in place?

**Non-technical.** It unpauses. Same snake, same score. Overlay “Paused…” vanishes.

**Technical.** Paused is neither GameOver nor Idle → no `reset()`. Then Running, overlay off, `lastTick = now` (Q314-style, no catch-up), RAF requested. Equivalent to `resume()` plus a cancel/request. Space would have called `resume()` instead; Restart from pause is a second, unlabeled resume.

**Snippet** (`src/Game.ts`):

```ts
if (this.status === GameStatus.GameOver || this.status === GameStatus.Idle) {
  this.reset();
}
this.status = GameStatus.Running; // Paused falls through to here
```

### Q310. Is that a bug or a feature? What would a reviewer expect a button labeled Restart to do?

**Non-technical.** A reviewer expects a new game: score 0, snake in the middle, Idle or immediately Running. This is a **bug** relative to the label, not a documented “resume” feature.

**Technical.** Feature-interpretation is weak: you already have Space to pause/resume. Restart should `reset()` **always**, then either stay Idle or `start()` for real. Fix:

```ts
startFresh(): void {
  this.reset();
  this.status = GameStatus.Running;
  /* overlay, lastTick, RAF */
}
```

Button → `startFresh()`. Space on Idle/GameOver can call the same. Do not reuse `start()` for Running. **High-signal.**

**Snippet** (`index.html`):

```html
<button id="restart" class="restart-btn" type="button">Restart</button>
```

### Q311. Why `cancelAnimationFrame` before requesting another — double-loop guard?

**Non-technical.** If a loop was already booked, cancel it before booking a new one, so you do not get two clocks.

**Technical.** `start()` can run while an RAF is pending (Running click, or Idle Space while… none pending). Without cancel, two `loop` chains could run (each reschedules itself — Q329) → double `tick` rate. `cancelAnimationFrame` with the last stored id drops the pending frame; the new request starts a single chain. `resume()` does **not** cancel first (pause already cancelled). `gameOver` cancels and does not request. `rafHandle` is overwritten after request.

**Snippet** (`src/Game.ts`):

```ts
cancelAnimationFrame(this.rafHandle);
this.rafHandle = requestAnimationFrame(this.loop);
```

### Q312. Why `pause()` no-ops unless Running?

**Non-technical.** You can only pause a live game. Pausing Idle or Game Over would be meaningless.

**Technical.** Guard: `if (this.status !== Running) return`. Space on Idle/GameOver does not call `pause()`; it `start()`s (Q318). Calling `pause()` twice is safe. Without the guard, Idle + pause would set Paused + overlay “Press space to resume” with no RAF — confusing. `resume` has the symmetric Paused guard.

**Snippet** (`src/Game.ts`):

```ts
private pause(): void {
  if (this.status !== GameStatus.Running) return;
  this.status = GameStatus.Paused;
  cancelAnimationFrame(this.rafHandle);
  this.setOverlay("Paused. Press space to resume.", true);
  this.updateHud();
}
```

### Q313. Why `pause()` cancels RAF rather than leaving the loop running with a status check?

**Non-technical.** When you pause, the animation subscription stops. The browser does not keep asking 60 times a second for nothing.

**Technical.** `loop` already returns immediately if not Running **before** rescheduling — so a single extra frame after pause would **die** even without cancel. Cancel makes pause take effect **now**, not on the next vsync, and avoids that leftover callback. Leaving the loop running with the check **after** `requestAnimationFrame` would spin at 60Hz forever while paused (battery). Live order (check, then reschedule) means “leave it running” would self-stop anyway; cancel is still the right explicit API.

**Snippet** (`src/Game.ts`):

```ts
private loop = (now: number): void => {
  if (this.status !== GameStatus.Running) return; // would not reschedule
  this.rafHandle = requestAnimationFrame(this.loop);
```

### Q314. Why `resume()` sets `lastTick = performance.now()` — what would happen if you kept the old `lastTick` (catch-up ticks / teleport)?

**Non-technical.** After a coffee break, the snake should take one step on the old rhythm, not jump across the board to “make up” lost time.

**Technical.** Live tick uses `lastTick = now` (drop leftover — Q333), **one** tick per overdue frame. If you **kept** old `lastTick` across a 10s pause: first `loop` after resume sees `now - lastTick >= 110` and ticks **once** (because leftover is dropped, not accumulated). **Teleport** would need `while (lag >= tickMs) { tick(); lag -= tickMs; }` (Q332). So even *without* resetting `lastTick`, this game would only **one-step**, then wait — unless the first `now` is huge *and* they switched to an accumulator. Resetting `lastTick` still matters: it **starts a fresh 110ms** so you do not immediately step on the resume frame. Better feel.

**Snippet** (`src/Game.ts`):

```ts
private resume(): void {
  if (this.status !== GameStatus.Paused) return;
  this.status = GameStatus.Running;
  this.setOverlay("", false);
  this.lastTick = performance.now();
  this.rafHandle = requestAnimationFrame(this.loop);
}
```

### Q315. Why overlay text “Paused. Press space to resume.” while Restart also exists?

**Non-technical.** The pause screen teaches Space. It does not mention Restart, which from pause **also** continues the game (Q309) instead of resetting.

**Technical.** Copy is incomplete and, given Q309, dangerous: a user who hits Restart expecting a new game unpauses. Overlay is `textContent` (Q347). GameOver copy mentions Restart **and** direction keys (direction keys do not work — honest-facts table). Pause copy should mention Restart only after Restart always `reset()`s.

**Snippet** (`src/Game.ts`):

```ts
this.setOverlay("Paused. Press space to resume.", true);
```

## `handleKeydown`

### Q316. Why handle Space first, before the direction map?

**Non-technical.** Space is pause/start, not a movement. You check that special key before asking “is this an arrow?”

**Technical.** `" "` is not in `KEY_TO_DIRECTION`. If you mapped it accidentally, Space would queue a direction. Early return after Space handling avoids the map lookup. `event.key === " "` is the character; `event.code === "Space"` would also catch Space with different layouts and ignore IME oddities. `Spacebar` is old IE. Order is readability, not a bug.

**Snippet** (`src/Game.ts`):

```ts
if (event.key === " ") {
  event.preventDefault();
  if (this.status === GameStatus.Running) this.pause();
  else if (this.status === GameStatus.Paused) this.resume();
  else this.start();
  return;
}
```

### Q317. Why `event.preventDefault()` on Space — what native behavior are you stopping (page scroll)?

**Non-technical.** Space in a browser usually scrolls the page down. That would yank the board away while you pause.

**Technical.** Default action of Space (when focus is not a button/input) is **page down**. This page may not overflow on desktop but will on mobile (HUD + 528 canvas). Restart is a `<button>`: if **Restart is focused**, Space would **activate the button** (click → `start()`) **and** `handleKeydown` still fires (button activation vs keydown order is element-dependent). They preventDefault on window listener — may or may not stop the button’s click depending on browser; messy. Focus on Restart + Space can double-fire `start()`. Arrows similarly preventDefault (Q320).

**Snippet** (`src/Game.ts`):

```ts
if (event.key === " ") {
  event.preventDefault();
```

### Q318. Why Space on Idle calls `start()`, on Running `pause()`, on Paused `resume()` — and **not** GameOver?

**Non-technical.** The questions file thinks Space does nothing when you are dead. **Live code disagrees:** dead + Space starts a new game.

**Technical.** The `else this.start()` branch is Idle **and** GameOver **and** any future status. There is no `GameOver` exclusion. `start()` **does** `reset()` on GameOver. Overlay GameOver text omits Space but Space works. **Correct the interviewer** if they quote Q318 as written. The *intent* may have been `else if (Idle) start()` so GameOver is button-only; that is not what shipped.

**Snippet** (`src/Game.ts`):

```ts
if (this.status === GameStatus.Running) this.pause();
else if (this.status === GameStatus.Paused) this.resume();
else this.start(); // Idle *and* GameOver
```

### Q319. How do you start after GameOver from the keyboard if Space doesn’t restart — direction keys?

**Non-technical.** Questions file: use arrows. Live game: **Space works; arrows do not.** The overlay is wrong.

**Technical.** Direction path: `queuedDirection = direction` then `if (this.status === Idle) this.start()`. After death status is **GameOver**, so `start()` is **not** called. RAF is cancelled. The queued heading sits unused until something calls `start()` (Space or Restart), which `reset()`s and **clears** the queue. Overlay: “Press restart or any direction key to try again.” Direction keys only `preventDefault` (stop scroll) and lie. Keyboard recover: **Space** or **Restart**.

**Snippet** (`src/Game.ts`):

```ts
this.queuedDirection = direction;
if (this.status === GameStatus.Idle) this.start();
// GameOver: no start()
this.setOverlay(`Game over — score ${this.score}. Press restart or any direction key to try again.`, true);
```

### Q320. Why `preventDefault` on Arrow keys — scroll again?

**Non-technical.** Arrows also scroll the page (and some browsers move focus). The game eats them so the board does not slide.

**Technical.** `ArrowUp`/`ArrowDown` default to scroll; `ArrowLeft`/`Right` can scroll horizontally or move caret. `preventDefault` only runs when the key **is** in the map (after the `if (!direction) return`). Focus in the URL bar: the window listener still fires for some keys depending on whether the address bar is in-page focus (usually **not** — chrome UI keys may not reach the page). In-page, arrows never reach spatial navigation. WASD preventDefault too — cannot type `w` in a hypothetical chat.

**Snippet** (`src/Game.ts`):

```ts
const direction = KEY_TO_DIRECTION[event.key];
if (!direction) return;
event.preventDefault();
```

### Q321. Why unknown keys `return` without preventDefault (so they still type/shortcut)?

**Non-technical.** The game only steals keys it understands. Refresh, tab, letters other than WASD still work.

**Technical.** Early `return` before `preventDefault` preserves F5, `Cmd+R`, `Tab`, `l` for live reload, browser search, etc. Space and mapped keys are the only prevented set. `event.metaKey` combos like `Cmd+D` bookmark: if you pressed `d`/`D`, this game **still prevents** and queues Right — **Cmd+D is broken** while the game is open. A better guard: `if (event.metaKey || event.ctrlKey || event.altKey) return`. Not live.

**Snippet** (`src/Game.ts`):

```ts
if (!direction) return;
event.preventDefault();
```

### Q322. Why assign `this.queuedDirection = direction` rather than calling `snake.setDirection` immediately?

**Non-technical.** The snake only turns when it **steps**, not in the middle of a 110ms wait. Your key waits on a hook until the next step.

**Technical.** Immediate `setDirection` would apply mid-interval; the next `advance` would use the new heading — that actually *would* work for a **single** key. The queue exists to (1) start from Idle after assigning, (2) collapse multiple keys in one window to one heading, (3) avoid applying a 180 against a heading that will already change this tick — but they compare 180 to **current** `this.direction`, not to the queue (Q224 in Part 5). Immediate apply + 180 guard is the classic “cannot reverse into yourself this instant”; the one-slot queue is a weaker, bug-prone version of a 2-queue.

**Snippet** (`src/Game.ts`):

```ts
this.queuedDirection = direction;
if (this.status === GameStatus.Idle) this.start();
```

### Q323. What problem does “queue until next tick” solve (same-tick 180)?

**Non-technical.** If you could reverse instantly into your neck, you would die for pressing Down while going Up. Buffering until the step applies the 180 rule once per move.

**Technical.** Naive: heading Right, player hits Left before the next `advance` → next head is the neck → death. `setDirection` ignores `OPPOSITE[this.direction]`. If you applied Left immediately, it would be ignored — **safe**. If you applied two keys immediately (Right snake, Up then Left in 10ms): first Up succeeds (`direction = Up`), then Left succeeds (`OPPOSITE[Up] is Down`, Left is allowed) → heading Left = 180 from original Right → next advance dies into the neck. **Immediate apply of two keys is the 180 bug.** A queue of 2 would apply Up on tick N and Left on tick N+1 (two 90s). A **one-slot** queue stores only Left; `setDirection(Left)` vs still-Right → **ignored** (Q324). So the one-slot queue “solves” same-tick 180 by **dropping** the input, not by sequencing 90s.

**Snippet** (`src/Snake.ts`):

```ts
setDirection(next: Direction): void {
  if (OPPOSITE[this.direction] === next) return;
  this.direction = next;
}
```

### Q324. What problem does a **one-slot** queue **not** solve (two 90° turns in one tick collapsed to a 180 that `setDirection` ignores)?

**Non-technical.** You press Up then Left quickly while moving Right. You wanted a corner. The game only remembers Left, treats it as a U-turn, and ignores it. You keep going Right.

**Technical.** Start `direction = Right`. Keys: Up (slot=Up), Left (slot=Left). Tick: `setDirection(Left)` → `OPPOSITE[Right] === Left` → **return**. Player intent was Right→Up→Left. Live result: still Right. This is the high-signal input bug. Classic fix: `queue: Direction[]` with max length 2, push if last queued (or current if empty) is not opposite, shift one per tick. **Do not** overwrite a single field.

**Snippet** (`src/Game.ts`):

```ts
this.queuedDirection = direction; // overwrite, not push
// tick:
if (this.queuedDirection) {
  this.snake.setDirection(this.queuedDirection);
  this.queuedDirection = null;
}
```

### Q325. Why not a real queue of length 2 (classic Snake)?

**Non-technical.** That is the version players expect from Nokia-style games. This demo favored a one-line buffer.

**Technical.** Length 2 is enough because you cannot usefully pre-plan more than one extra turn at 110ms without playing as a pianist. Implementation: array shift/push O(1) at n=2; or two fields `next`/`after`. Interacts with `setDirection` 180 vs **the heading that will be active when that command applies**, not vs the heading now. Out of scope for a Deque tutorial, but it is the first gameplay fix a reviewer will demand. Honest: “I would add it next.”

**Snippet** (`src/Game.ts` — live, not a deque of keys):

```ts
private queuedDirection: Direction | null = null;
```

### Q326. Why `if (this.status === Idle) this.start()` after queueing a direction?

**Non-technical.** Pressing an arrow is how you leave the title overlay. The first move key is supposed to mean “go.”

**Technical.** Idle-only, not GameOver (Q319). `start()` → `reset()` because Idle → **`queuedDirection = null`** → snake faces Right regardless of which key started the game. The `start()` call is correct; the `reset()` inside `start()` for Idle is the foot-gun (constructor already reset). Fix: `start()` should not `reset()` when Idle (world already built), only when GameOver; or apply queued direction **after** reset; or `start()` from Idle should skip `reset()`. High-signal when combined with Q307.

**Snippet** (`src/Game.ts`):

```ts
this.queuedDirection = direction;
if (this.status === GameStatus.Idle) this.start();
// start() → reset() → queuedDirection = null
```

## Loop and tick

### Q327. Why `private loop = (now: number) => { ... }` as an arrow property rather than a method?

**Non-technical.** The animation callback must still talk to *this* game. An arrow remembers that. A normal method would forget.

**Technical.** Class field arrow: created per instance, lexical `this`. `requestAnimationFrame(this.loop)` passes the function; RAF invokes it as a bare function. A prototype method would get `this === window` (or `undefined` in module strict) → cannot read `this.status`. Alternatives: `requestAnimationFrame((n) => this.loop(n))`, or `this.loop = this.loop.bind(this)` in the constructor. The arrow-on-class-field is the live choice and allocates one closure per Game (fine).

**Snippet** (`src/Game.ts`):

```ts
private loop = (now: number): void => {
  if (this.status !== GameStatus.Running) return;
  this.rafHandle = requestAnimationFrame(this.loop);
  /* … */
};
```

### Q328. What would `requestAnimationFrame(this.loop)` do if `loop` were a prototype method (losing `this`)?

**Non-technical.** The animation frame would run “unemployed” — no game object — and crash or silently do nothing useful.

**Technical.** RAF’s callback `this` is `window` in browsers (or `undefined` in strict). `this.status` would be `undefined !== Running` → **return immediately** without throwing if you used optional logic… actually `this.status` on `window` is undefined, `undefined !== Running` is true, **return** — loop dies after one call if you still scheduled… wait: the `return` is **before** reschedule. First frame: `this` wrong, status undefined, return, **RAF chain never continues**. If the check were inverted you would throw. Strict mode modules: `this` is `undefined` → **TypeError** reading `.status`. Either dead loop or throw. Arrow field prevents that.

**Snippet** (`src/Game.ts`):

```ts
this.rafHandle = requestAnimationFrame(this.loop);
```

### Q329. Why re-schedule RAF at the **top** of `loop` even if this frame does not tick?

**Non-technical.** The clock keeps ticking at display refresh. Most frames only ask “has 110ms passed?” If you only booked the next frame when the snake moved, the clock would stop between moves.

**Technical.** Pattern: always `requestAnimationFrame(this.loop)` after the Running guard, **then** maybe `tick()`. Frames at 60Hz, ticks at ~9Hz. If you scheduled only inside the `if (elapsed >= tickMs)` branch, a frame that does not tick would **end the chain**. Alternative: `setTimeout(loop, tickMs)` (Q331) would not need per-frame reschedule. Scheduling at the **bottom** is equivalent unless `tick()` throws — top means a throw in `tick` still left a next frame booked (maybe good, maybe a zombie loop after a bug). Live: top.

**Snippet** (`src/Game.ts`):

```ts
this.rafHandle = requestAnimationFrame(this.loop);
if (now - this.lastTick >= this.config.tickMs) {
  this.lastTick = now;
  this.tick();
}
```

### Q330. Why `if (this.status !== Running) return` at the start of `loop`?

**Non-technical.** If we are not playing, this callback is a no-op. Pause and game over already cancelled the booking; this is a seatbelt.

**Technical.** Race: a callback already queued can run after `pause`/`gameOver` cancel — actually cancel **prevents** the queued callback. The guard still covers: status flipped to Paused without cancel (future code); `start` cancelled and replaced; GameOver then a stale frame. Returning **before** reschedule is what stops a paused leftover callback from resurrecting the loop (Q313). HUD/status could be Paused while a frame runs — guard is the source of truth.

**Snippet** (`src/Game.ts`):

```ts
if (this.status !== GameStatus.Running) return;
```

### Q331. Why `now - this.lastTick >= this.config.tickMs` rather than a fixed `setInterval(tick, 110)`?

**Non-technical.** The game uses the browser’s animation heartbeat and only moves the snake when enough time has passed. It does not use a separate interval timer.

**Technical.** RAF: pauses in background tabs (mostly), syncs to refresh, gives a `DOMHighResTimeStamp`. `setInterval(fn, 110)`: can stack (clamping), not vsync-aligned, still runs in background more aggressively, `this` binding issues, no `now` argument (you’d `performance.now()` anyway). RAF+gate = “render loop with a coarse tick.” `tick()` also `render()`s, so they **skip drawing** between moves (no interpolation — Q354). Interval would still need a Running check and pause/cancel (`clearInterval`).

**Snippet** (`src/Game.ts`):

```ts
if (now - this.lastTick >= this.config.tickMs) {
  this.lastTick = now;
  this.tick();
}
```

### Q332. Trade-offs: RAF vs `setInterval` vs `setTimeout` chain vs a fixed-timestep accumulator (`while (lag >= tickMs)`)?

**Non-technical.** Four clocks: animation frames, repeating interval, timeout-that-reschedules, or “owe the snake several steps if the tab stalled.”

**Technical.**

| Clock | Pros | Cons in *this* game |
| --- | --- | --- |
| RAF + gate (live) | Vsync, tab throttle, one `this.loop` | No draw between ticks; depends on `lastTick` policy |
| `setInterval(110)` | Simple | Drift, background behavior, not vsync |
| `setTimeout` chain | Can compensate (`delay - overrun`) | Jank still misses; need handle to cancel |
| Accumulator `lag += dt; while (lag >= tickMs) { tick(); lag -= tickMs }` | Deterministic steps; catch-up | **Teleport** after a stall (Q314, Q334) unless you cap iterations |

Live choice: RAF + **drop leftover** (next Q). Interview: “I’d cap catch-up at 2 ticks to avoid death warps.”

**Snippet** (`src/Game.ts` — not an accumulator):

```ts
this.lastTick = now; // not lastTick += tickMs
this.tick();         // at most once per frame
```

### Q333. Why `this.lastTick = now` (drop leftover dt) rather than `this.lastTick += tickMs` (catch up)?

**Non-technical.** If a frame is late, extra leftover milliseconds are thrown away. The snake does not take a burst of extra steps.

**Technical.** Example: `tickMs = 110`, elapsed = 150. `lastTick = now` discards 40ms — effective period slightly **slower** under load. `lastTick += 110` keeps 40ms in the debt; the next frame more easily exceeds 110 — closer to 9.09 Hz **average**. Accumulator with while-loop would tick **once** here (150 < 220) anyway; a 500ms stall would tick 4 times with `+=` + while, or **once** with `= now`. Live `= now` **and** single `tick()` per frame: a 500ms hitch → **one** step (Q334). High-signal.

**Snippet** (`src/Game.ts`):

```ts
this.lastTick = now;
this.tick();
```

### Q334. What happens if a frame is delayed 500ms — skip ticks or burst?

**Non-technical.** Skip. The snake jumps one square, not four. You may notice a stutter, not a teleport through a wall of death.

**Technical.** One RAF callback, `500 >= 110`, `lastTick = now`, `tick()` **once**. Four missed logical moves are gone. Safer for collision (you do not fast-forward into a wall without input). Worse for “simulation determinism.” Combined with no `document.hidden` pause (Q335): returning to the tab after RAF freeze often looks like one step then normal 110ms.

**Snippet** (`src/Game.ts`):

```ts
if (now - this.lastTick >= this.config.tickMs) {
  this.lastTick = now;
  this.tick(); // never a while-loop
}
```

### Q335. Why not pause the loop when `document.hidden`?

**Non-technical.** Switching tabs does not show the Paused overlay. The browser mostly freezes animation for you; coming back can feel like a delayed step.

**Technical.** No `visibilitychange` listener. Background: Chrome throttles RAF to ~1fps or pauses it. With `lastTick = now`, you do not burst (Q334). You **do** waste a little battery if RAF continues, and you do not set `GameStatus.Paused`, so the HUD still says Running. A hidden tab + `setInterval` would be worse. Fix: `document.addEventListener("visibilitychange", () => { if (document.hidden) this.pause(); })` — but auto-pause might annoy if you wanted it to crawl. Honest gap.

**Snippet** (`src/Game.ts`):

```ts
// no document.hidden / visibilitychange handling
```

### Q336. Tick order: apply queued direction → `peekNextHead` → wall or self → maybe eat/grow/score → `advance` → maybe respawn → HUD → render. Why this order?

**Non-technical.** Turn, look at the next square, die if needed, eat if needed, then slide, then new apple, then update the numbers and the picture.

**Technical.** Direction first so peek/collision/eat all use the **new** heading. Collision **before** mutate (Q337). Eat uses `nextHead` vs food **before** the body moves — correct, because food is eaten by stepping onto it. `grow` before `advance` (Q340). Respawn after `advance` (Q282). HUD/render last so death `return`s early without moving, but `gameOver` still updates HUD+overlay; it does **not** re-render (last live frame remains — Q345). Reordering eat after advance would require comparing **current** head to food.

**Snippet** (`src/Game.ts` `tick`):

```ts
if (this.queuedDirection) { this.snake.setDirection(this.queuedDirection); this.queuedDirection = null; }
const nextHead = this.snake.peekNextHead();
if (!this.board.isWithinBounds(nextHead) || this.snake.wouldCollideWithSelf()) { this.gameOver(); return; }
const ateFood = this.positionsEqual(nextHead, this.food.getPosition());
if (ateFood) { this.snake.grow(1); this.score += 10; }
this.snake.advance();
if (ateFood) { this.food.respawn(this.board, this.snake); }
this.updateHud();
this.render();
```

### Q337. Why check collisions **before** `advance` rather than after?

**Non-technical.** You do not move into the wall and then take it back. You refuse the move and die on the last legal picture.

**Technical.** After-advance death would put the head at `x = 24` (or on the neck), require drawing out of bounds or overlapping, then undo — messy with the Set (you would add then delete). Peek + `wouldCollideWithSelf` is **speculative**. Tail exception in Snake is defined on the *upcoming* move (Part 5 Q230). `gameOver` returns without `advance`, so the dead snake is the last living pose (Q345).

**Snippet** (`src/Game.ts`):

```ts
if (!this.board.isWithinBounds(nextHead) || this.snake.wouldCollideWithSelf()) {
  this.gameOver();
  return;
}
```

### Q338. Why `wouldCollideWithSelf()` does not take `nextHead` as an argument even though you already computed `nextHead`?

**Non-technical.** The snake can answer “would I hit myself?” using its own heading. Game already peeked, so the work is duplicated.

**Technical.** `wouldCollideWithSelf` calls `nextHeadPosition()` again — same as `peekNextHead()` if `direction` did not change (it cannot between those lines). Duplicate `getHead()` + switch. Passing `nextHead` would avoid that and keep Game as the single peek site. Encapsulation argument: Snake should not trust a Position Game passed. Live: small waste, no bug, slightly worse API for testing.

**Snippet** (`src/Snake.ts`):

```ts
wouldCollideWithSelf(): boolean {
  const nextKey = cellKey(this.nextHeadPosition());
  /* … */
}
```

### Q339. Why `positionsEqual` is a private method rather than `cellKey(a) === cellKey(b)`?

**Non-technical.** Two squares match if their x and y match. Game does not use the snake’s string keys.

**Technical.** `cellKey` is **module-private** in `Snake.ts`, not exported. Game should not depend on `"x,y"` format. `a === b` would be **reference** equality (Position objects are new literals) — always false for peek vs food. `positionsEqual` is the correct value equality. Could be a one-liner inline; a method is testable/readable. Could live on `types.ts` as `export function positionsEqual`.

**Snippet** (`src/Game.ts`):

```ts
private positionsEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}
```

### Q340. Why `grow(1)` **before** `advance` on eat?

**Non-technical.** You tell the snake “you are digesting” *then* it steps, so it does not pull its tail up on that step. Eating makes it longer immediately.

**Technical.** `grow` increments `pendingGrowth`. `advance`: if `pendingGrowth > 0`, skip `popBack` and decrement. Eat-tick length becomes L+1 with head on the former food cell. **High-signal.** Opposite order is Q341.

**Snippet** (`src/Game.ts`):

```ts
if (ateFood) {
  this.snake.grow(1);
  this.score += 10;
}
this.snake.advance();
```

### Q341. What happens if you `advance` first then `grow` — does the tail pop on the eating move (food not “consumed” as length)?

**Non-technical.** Yes. You would step onto the apple and stay the same length; you would grow on the *next* step instead. It feels like the apple did nothing for a beat.

**Technical.** `advance` with `pendingGrowth === 0` always `popBack`. Then `grow(1)` sets pending for the **following** tick. Length stays L on eat, L+1 on the next move. Score would still `+= 10` if you left that line. Classic off-by-one. The live order is the correct Snake rule.

**Snippet** (`src/Snake.ts`):

```ts
if (this.pendingGrowth > 0) {
  this.pendingGrowth--;
} else {
  const removedTail = this.body.popBack();
  if (removedTail) this.occupied.delete(cellKey(removedTail));
}
```

### Q342. Why `score += 10` hard-coded?

**Non-technical.** Every apple is ten points. There is no combo, no banana worth 50.

**Technical.** Magic number, not `this.config.pointsPerFood`. HUD is `String(this.score)`. Win score if you filled the board would be `10 * (576 - 3) = 5730`. No combo, no speed-from-score (Q356). Fine for a demo; a reviewer may shrug.

**Snippet** (`src/Game.ts`):

```ts
this.score += 10;
```

### Q343. Why respawn food only if `ateFood`, and **after** advance?

**Non-technical.** The apple stays put until you eat it. Then it jumps, looking at the snake after the slither.

**Technical.** Covered in Q282. `ateFood` is computed pre-advance; using the flag after mutate is correct. Unconditional respawn every tick would teleport food and break playing. Respawn on death is not needed.

**Snippet** (`src/Game.ts`):

```ts
if (ateFood) {
  this.food.respawn(this.board, this.snake);
}
```

### Q344. Why `updateHud` + `render` every tick even if nothing visual changed besides snake/food?

**Non-technical.** Each step, rewrite the score/status and repaint the whole board. Simpler than guessing what changed.

**Technical.** Every successful tick **does** change snake pixels (and maybe food/score). Status string is often unchanged (`Running`). Still writes `textContent` every time (minor DOM cost). `render` is full-frame (Q350). Skipping HUD when `!ateFood && status unchanged` is micro-optimization. Death path: `gameOver` updates HUD **without** `render` (snake already drawn from last tick). Constructor `render` after `reset`/`updateHud` paints the initial Idle board under the overlay.

**Snippet** (`src/Game.ts`):

```ts
this.updateHud();
this.render();
```

## Game over, overlay, HUD, render

### Q345. Why `gameOver` cancels RAF and leaves the last frame drawn (dead snake still visible under overlay)?

**Non-technical.** You see how you died, under a dark glass with the score. The snake does not vanish.

**Technical.** Collision `return`s before `advance` **and** before `render`. The pixels are from the previous tick’s living pose (head next to the wall, not through it). Overlay `hidden = false` with `rgba(12,13,16,0.82)` (CSS). `cancelAnimationFrame` stops further ticks. No “death animation.” If they `render()` after death you would still see the same cells unless you painted a crash color.

**Snippet** (`src/Game.ts`):

```ts
private gameOver(): void {
  this.status = GameStatus.GameOver;
  cancelAnimationFrame(this.rafHandle);
  this.setOverlay(`Game over — score ${this.score}. Press restart or any direction key to try again.`, true);
  this.updateHud();
}
```

### Q346. Why overlay string interpolates `score` rather than reading the HUD?

**Non-technical.** The message uses the game’s own score number, not whatever text happens to sit in the Score box.

**Technical.** `this.score` is the source of truth. `#score` could be stale if `updateHud` had not run; `gameOver` calls `updateHud` after the overlay anyway. Reading HUD would parse `textContent` back to a number — silly. Template string is `textContent`-safe (Q347).

**Snippet** (`src/Game.ts`):

```ts
this.setOverlay(`Game over — score ${this.score}. Press restart or any direction key to try again.`, true);
```

### Q347. Why `setOverlay(message, visible)` uses `textContent` not `innerHTML`?

**Non-technical.** You put words on the overlay, not HTML. Even if a score were weird, it cannot inject a tag.

**Technical.** `textContent` does not parse markup — XSS-safe if message ever included user input (it does not today). `innerHTML` would be a foot-gun for a future `"<em>nice</em>"`. Score interpolation is a number. Empty string `""` with `visible false` still clears the node.

**Snippet** (`src/Game.ts`):

```ts
private setOverlay(message: string, visible: boolean): void {
  this.config.overlayEl.textContent = message;
  this.config.overlayEl.hidden = !visible;
}
```

### Q348. Why `overlayEl.hidden = !visible` rather than toggling a class?

**Non-technical.** The HTML `hidden` attribute is the built-in “do not show this.”

**Technical.** `.overlay { display: flex }` **overrides** the UA `hidden { display: none }` unless `.overlay[hidden] { display: none }` exists — it does in `style.css` (CSS Q137–Q139). Class `.is-open` would also work; `hidden` is semantic + a11y (removed from a11y tree when hidden). Initial HTML has **no** `hidden` (empty overlay covers the board until `reset()` — HTML Q60–Q64). Constructor `reset()` sets `hidden` false with a message — overlay **shown** at Idle. Running: `hidden` true.

**Snippet** (`src/Game.ts` + `style.css`):

```ts
this.config.overlayEl.hidden = !visible;
```

```css
.overlay[hidden] { display: none; }
```

### Q349. Why `updateHud` writes `String(this.score)` and `this.status` (enum → string)?

**Non-technical.** Score is a number turned into digits. Status is the word Idle / Running / Paused / Game Over copied into the HUD.

**Technical.** String enum `GameStatus.GameOver = "Game Over"` **includes a space** — HUD shows `Game Over`, not `GameOver`. That is UI copy living in `types.ts` (Part 3 Q160–Q161). `String(0)` is `"0"`. No i18n. `textContent` again. Every tick (Q344).

**Snippet** (`src/Game.ts`):

```ts
private updateHud(): void {
  this.config.scoreEl.textContent = String(this.score);
  this.config.statusEl.textContent = this.status;
}
```

### Q350. Why render clears + grid + snake + food every tick instead of dirty-rect erasing the tail?

**Non-technical.** Throw away the picture and draw it again. Easier than erasing only the tail square and drawing only the new head.

**Technical.** Dirty-rect: fill tail cell with board color, draw new head, maybe redraw food. Must handle growth (no tail erase), food move, grid line repair under the tail. 24×24 full redraw is cheap. Cost: Q251 blur still applies. No interpolation (Q354) so 60Hz RAF does **not** redraw 60 times — only on tick (~9Hz). That is why motion looks stepped, not smooth.

**Snippet** (`src/Game.ts`):

```ts
private render(): void {
  this.board.clear();
  this.board.drawGridLines();
  const segments = this.snake.getSegments();
  segments.forEach((segment, index) => {
    this.board.drawCell(segment, index === 0 ? HEAD_COLOR : BODY_COLOR);
  });
  this.board.drawCell(this.food.getPosition(), FOOD_COLOR);
}
```

### Q351. Why `segments.forEach((segment, index) => drawCell(..., index === 0 ? HEAD_COLOR : BODY_COLOR))`?

**Non-technical.** First square in the list is the head (bright). The rest are body (grey).

**Technical.** `getSegments()` is `toArray()` head→tail (Deque iterator front first). `index === 0` is O(1) color pick. Could `drawCell(head)` then loop `i=1…`. `forEach` allocates a callback per tick — irrelevant. Length 0 cannot happen after `reset`.

**Snippet** (`src/Game.ts`):

```ts
segments.forEach((segment, index) => {
  this.board.drawCell(segment, index === 0 ? HEAD_COLOR : BODY_COLOR);
});
```

### Q352. What happens if `getSegments()` were tail-first — wrong cell painted as head?

**Non-technical.** The bright square would be the tail. You would steer the dim end. It would look like a bug even if movement were correct.

**Technical.** `index === 0` would be tail. Gameplay uses Deque `first` as head independently — only paint would lie. Snake constructor documents tail-first **input**, head at deque front. A reviewer swapping `toArray` reverse would hit this.

**Snippet** (`src/Snake.ts`):

```ts
/** Ordered head -> tail, for rendering. */
getSegments(): Position[] {
  return this.body.toArray();
}
```

### Q353. Why draw food after the snake (food on top if they overlapped — should they ever)?

**Non-technical.** Apple last, so it sits on top. They should never share a cell except for a one-tick glitch.

**Technical.** Legal states: food ∉ occupied. Overlap would mean spawn bug (respawn before advance — Q281) or eat frame if you rendered **before** advance while nextHead is food — live `render` is **after** advance+respawn, so the eaten cell is snake and food is elsewhere. Painter’s algorithm: food on top is a safety belt. If they overlapped, teal would hide the head at that cell.

**Snippet** (`src/Game.ts`):

```ts
this.board.drawCell(this.food.getPosition(), FOOD_COLOR);
```

### Q354. Why no interpolation / sub-cell animation between ticks?

**Non-technical.** The snake jumps cell to cell, like old phones, not like a smooth cartoon.

**Technical.** Matches the Deque story (discrete cells) and avoids lerp math, sprite offsets, and drawing off-grid. RAF runs at 60Hz but `render` only on tick (Q331) — you would need **render every RAF** with `alpha = (now - lastTick) / tickMs` to interpolate, plus DPR. `prefers-reduced-motion` would then actually matter. Out of demo scope. Motion-sensitive users still see discrete jumps every 110ms (CSS Q145).

**Snippet** (`src/Game.ts`):

```ts
if (now - this.lastTick >= this.config.tickMs) {
  this.lastTick = now;
  this.tick(); // includes render(); no in-between frames painted
}
```

### Q355. Why no touch / swipe / on-screen D-pad?

**Non-technical.** This is a desktop interview demo. A phone user sees a board and cannot play.

**Technical.** No `touchstart`/`pointer` swipe-to-direction, no on-canvas buttons. Restart is the only touch target (padding may be under 44px — CSS Q126). `window` keydown does nothing for taps. High-signal gap: **keyboard-only**. Adding swipe without changing OOP: `pointerdown/up` → delta → map to `Direction` → same `queuedDirection`. HTML hint would need an update.

**Snippet** (`src/Game.ts`):

```ts
window.addEventListener("keydown", (event) => this.handleKeydown(event));
// no touch / pointer / d-pad
```

### Q356. Why no speed increase as score grows?

**Non-technical.** The snake never gets faster. Beginners do not get punished; experts do not get a rush.

**Technical.** `tickMs` is constant from `main.ts`. Classic Snake shortens the period as you eat. Would be `this.config.tickMs * (0.97 ** foodsEaten)` or a step table, clamped, and should respect `prefers-reduced-motion`. Would **not** require Board/Snake changes. Out of story; call it a gap if asked “what would you add.”

**Snippet** (`src/main.ts`):

```ts
tickMs: 110,
```

### Q357. Why no high score in `localStorage`?

**Non-technical.** Refresh and the best score is gone. This is not an arcade cabinet.

**Technical.** No `localStorage.getItem("snake-high")`. Would be a few lines in `gameOver`/`updateHud`, plus a HUD node. Privacy/storage in `file://` vs http, quota, and SSR are irrelevant here. Skipping it keeps zero runtime dependencies and no persistence story. High-signal “not a product.”

**Snippet** (`src/Game.ts`):

```ts
this.score = 0; // reset() always; nothing persisted
```

### Q358. Why no wrap, walls-only, or mazes?

**Non-technical.** Hit the edge, you die. No Pac-Man tunnels, no extra walls.

**Technical.** Wrap would be `nextHead.x = (x + columns) % columns` instead of `isWithinBounds` death. Mazes would need Board occupancy besides the snake — a second Set or grid, Food rejection against both, draw walls. That dilutes “Snake owns occupied.” Walls-only is already the live mode. Q244 in Part 5 asked the same of Snake.

**Snippet** (`src/Game.ts`):

```ts
if (!this.board.isWithinBounds(nextHead) || this.snake.wouldCollideWithSelf()) {
  this.gameOver();
```

### Q359. Why is Game the only class that imports Board, Snake, and Food?

**Non-technical.** Game is the conductor. The players do not import each other except Food asking Board size and Snake occupancy.

**Technical.** `Game.ts` imports Board, Snake, Food, types. Board imports only `Position`. Snake: Deque + types. Food: types + Board + Snake (the leak). `main` imports only Game. That is the composition: one orchestrator. Circular risk is low; Food→Snake is one-way. A DI container (Q372) would inject the same graph.

**Snippet** (`src/Game.ts`):

```ts
import { Board } from "./Board.js";
import { Snake } from "./Snake.js";
import { Food } from "./Food.js";
import { Direction, GameStatus, Position } from "./types.js";
```

---

# Part 9 — `src/main.ts`

### Q360. Why a `main()` function rather than top-level side effects?

**Non-technical.** Startup is a named recipe: find the DOM, build the Game. You can call it when the document is ready.

**Technical.** Top-level `new Game(...)` in a module would run on import — fine at end of body, bad if imported by a test or if `DOMContentLoaded` has not happened. Wrapping lets the listener call `main` (and would let `readyState` else-branch call it — Q370, not live). `main` is not exported. Side effects still exist: the listener registration at line 27 is top-level.

**Snippet** (`src/main.ts`):

```ts
function main(): void {
  const canvas = document.getElementById("board") as HTMLCanvasElement | null;
  /* … */
  new Game({ /* … */ });
}
document.addEventListener("DOMContentLoaded", main);
```

### Q361. Why `import { Game } from "./Game.js"` with a **`.js` extension** in a `.ts` file?

**Non-technical.** The browser will load a JavaScript file next to this one after TypeScript compiles. You write the name the browser will actually fetch.

**Technical.** `tsc` does **not** rewrite specifiers. `module` is `ES2020`. Native ESM in the browser requires a resolvable URL: `./Game.js` exists in `dist/` after emit (`Game.ts` → `Game.js`). Importing `./Game.ts` would 404 in the browser. Importing `./Game` fails in browsers (no extension negotiation). `moduleResolution: Bundler` **allows** the `.js` extension in a `.ts` import (Node16 would too). **High-signal ESM.**

**Snippet** (`src/main.ts`):

```ts
import { Game } from "./Game.js";
```

### Q362. What happens at compile time vs at runtime in the browser if you imported `"./Game"` with no extension?

**Non-technical.** TypeScript might still compile. The browser would then fail to fetch the module.

**Technical.** Compile time: with `moduleResolution: Bundler`, extensionless `./Game` often **typechecks** (it maps to `Game.ts`). Emit still writes `from "./Game"` in `dist/main.js`. Runtime: browser GET `…/dist/Game` with no MIME/extension — **404** (or HTML fallback) → `Failed to load module script`. Node ESM would also fail without `extensions` sugar. The `.js` in the `.ts` source is the compatibility trick.

**Snippet** (`src/main.ts` — live, with extension):

```ts
import { Game } from "./Game.js";
```

### Q363. Why `getElementById("board") as HTMLCanvasElement | null` rather than `HTMLCanvasElement` or a type guard function?

**Non-technical.** You tell TypeScript “this might be missing, but if it is there it is a canvas,” then you check all the pieces together.

**Technical.** `getElementById` returns `HTMLElement | null`. A bare `as HTMLCanvasElement` would lie when null and skip the check. `as HTMLCanvasElement | null` keeps null and claims canvas when present — **not** verified at runtime (`<div id="board">` would pass the `!canvas` check and blow up in `Board`/`getContext`). A type guard `function isCanvas(el): el is HTMLCanvasElement { return el instanceof HTMLCanvasElement }` is the honest runtime check. Live: assertion + bundled null check (Q364). `restart` is the same pattern.

**Snippet** (`src/main.ts`):

```ts
const canvas = document.getElementById("board") as HTMLCanvasElement | null;
const restartBtn = document.getElementById("restart") as HTMLButtonElement | null;
```

### Q364. Why check all five nodes then `throw new Error("Required DOM elements are missing from index.html")`?

**Non-technical.** If the HTML ids drift from the script, fail immediately with one sentence, not a mysterious blank board.

**Technical.** One `if` for canvas, score, status, overlay, restart. Fail-fast vs optional chaining everywhere. The message does not say **which** id is missing — slightly weaker DX. Throw happens in `main` on `DOMContentLoaded`; uncaught → console error, no Game. Matches Board’s throw on missing 2d context. `scoreEl` is typed `HTMLElement | null` without assertion because Game only needs `HTMLElement`.

**Snippet** (`src/main.ts`):

```ts
if (!canvas || !scoreEl || !statusEl || !overlayEl || !restartBtn) {
  throw new Error("Required DOM elements are missing from index.html");
}
```

### Q365. What happens if overlay is missing — blank page, throw, or game with no messages?

**Non-technical.** Throw. The game does not start. You do not get a silent snake with no pause text.

**Technical.** `!overlayEl` trips Q364 **before** `new Game`. No partial HUD. If they had only checked canvas, Game would throw later on `overlayEl.textContent` in `reset()`. HTML without overlay would also leave the canvas uncovered (no dark glass) — but live main never gets that far.

**Snippet** (`src/main.ts`):

```ts
const overlayEl = document.getElementById("overlay");
if (!canvas || !scoreEl || !statusEl || !overlayEl || !restartBtn) {
  throw new Error("Required DOM elements are missing from index.html");
}
```

### Q366. Why pass `columns`, `rows`, `cellSize`, `tickMs` here rather than `data-*` attributes on the canvas?

**Non-technical.** The numbers live in TypeScript next to `new Game`, not as HTML data attributes a designer might edit without a rebuild.

**Technical.** `data-columns="24"` would be strings, need `Number()` and NaN checks, and would duplicate `main.ts` / comments. HTML-first config is nicer for no-compile tweaks; this project already requires `tsc` for logic. Canvas attributes `width`/`height` are the bitmap (Board overwrites them). Live: TS is the single source.

**Snippet** (`src/main.ts`):

```ts
columns: 24,
rows: 24,
cellSize: 22,
tickMs: 110,
```

### Q367. Why `document.addEventListener("DOMContentLoaded", main)` when the script is already `type="module"` (deferred)?

**Non-technical.** “Wait until the HTML is ready, then start.” Modules already wait until parse finishes, so this is a belt-and-suspenders listener.

**Technical.** Classic scripts at end of body can run immediately; modules are **deferred** (HTML Q79): run after document parse, before `DOMContentLoaded`. So when `main.ts`’s compiled form executes, the five ids **already exist**. Registering `DOMContentLoaded` still works because that event has **not** fired yet in the normal pipeline (Q368). It is redundant but correct **for parser-inserted modules**. High-signal with Q369–Q370 for the failure mode.

**Snippet** (`index.html` + `src/main.ts`):

```html
<script type="module" src="dist/main.js"></script>
```

```ts
document.addEventListener("DOMContentLoaded", main);
```

### Q368. Modules run after the document is parsed, **before** `DOMContentLoaded` in the normal defer pipeline — so is this listener still correct?

**Non-technical.** Yes for the usual “script tag at the bottom of the HTML file” setup. The listener is registered just in time, then the browser fires the event, then `main` runs.

**Technical.** HTML spec order (simplified): finish parsing → run deferred classic scripts → run module scripts (after their graph loads) → fire `DOMContentLoaded`. This module’s last line **registers** the listener during the module-script step; the event fires **after**. `main` runs with a complete DOM. Still correct. The canvas default 300×150 exists until `main` → Board (CLS). Overlay empty until `reset` inside `Game`.

**Snippet** (`src/main.ts`):

```ts
document.addEventListener("DOMContentLoaded", main);
```

### Q369. What happens if you later load this module with `async`, inject it after load, or call it from the console — would `main` never run because `DOMContentLoaded` already fired?

**Non-technical.** Yes — if the party already ended, adding a “tell me when the party starts” listener does nothing. The game never boots.

**Technical.** `DOMContentLoaded` does **not** fire twice. `script type="module" async` can run after `load`. Dynamic `import()` from DevTools after load: listener registered too late → **no Game**, no throw, blank overlay forever. Console `main()` cannot work — `main` is not global (module scope). High-signal boot bug. Fix is Q370.

**Snippet** (`src/main.ts`):

```ts
document.addEventListener("DOMContentLoaded", main);
// if readyState is already "interactive" | "complete", main never runs
```

### Q370. Why not `main()` immediately, or `if (document.readyState === "loading") ... else main()`?

**Non-technical.** The robust pattern: if the HTML is still loading, wait; if it is already there, start now.

**Technical.** End-of-body module: `readyState` is already `"interactive"` **while** the deferred module runs? Actually during deferred/module execution after parse, `readyState` is `"interactive"` and `DOMContentLoaded` has **not** fired yet. Immediate `main()` at the bottom of this file would **work** (DOM is parsed). The `readyState === "loading"` else `main()` pattern handles **both** early `<head>` modules and late injection. Live code only handles the “event still coming” path. Interview: that `if` is what you write in production.

**Snippet** (not live — what to write):

```ts
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
```

### Q371. Why no `canvas.getContext` check here (Board throws instead)?

**Non-technical.** `main` checks that the canvas **element** exists. Board checks that drawing works.

**Technical.** Separation: composition root validates DOM ids; Board validates the 2d API (Q253). Duplicating `getContext` in `main` would require creating a context before Board, then Board’s `getContext` returns the same object — messy. If `main` passed a non-canvas HTMLElement that slipped the assertion, Board’s `canvas.width =` might still “work” on a canvas-like, or throw. `instanceof HTMLCanvasElement` in `main` would be the extra runtime guard (Q363).

**Snippet** (`src/Board.ts`):

```ts
const context = canvas.getContext("2d");
if (!context) throw new Error("2D canvas context is not available in this browser");
```

### Q372. Why is this the composition root — good OOP, or a missing DI container for a 200-line game?

**Non-technical.** `main` is the only place that knows the HTML ids and the 24×24×110 knobs. It wires one Game and steps back. A giant “injector” framework would be theater.

**Technical.** Composition root: the unique function that **new**s the object graph from the outside world (DOM, literals). Game then **new**s Board/Snake/Food. That is textbook OOP for a small app. A DI container (Inversify, Angular-style) would map `GameConfig` tokens for **zero** test benefit today (no tests). If you later swapped Food for a seeded FakeFood, you’d pass it into `Game` — still no container required. Honest closer: “composition root yes; DI container no.”

**Snippet** (`src/main.ts`):

```ts
new Game({
  canvas,
  columns: 24,
  rows: 24,
  cellSize: 22,
  tickMs: 110,
  scoreEl,
  statusEl,
  overlayEl,
  restartBtn,
});
```

---

## Coverage

Q245–Q372 inclusive = **128** questions. All present above. Path: `snake game/Deep-Dive-Answers-Game.md`.
