# Deep-dive answers — DSA (Q152–Q244)

Parts 3–5. Sources: `src/types.ts`, `src/Deque.ts`, `src/Snake.ts`.

Pair with [Deep-Dive-Questions.md](./Deep-Dive-Questions.md) and the live TypeScript. `Game.ts` is quoted only where it feeds these types (HUD copy, tail-first spawn, one-slot `queuedDirection`). Each answer has a **non-technical** take, a **technical** take, and a live snippet.

High-signal items a reviewer will camp on: `GameStatus.GameOver = "Game Over"` (space) as HUD copy; linked-list deque vs `Array#unshift` vs a ring vs V8 at n ≤ 576; `cellKey` vs `Set<Position>` reference equality; constructor tail-first + `pushFront`; `setDirection` 180 ignore vs Game’s one-slot queue; `wouldCollideWithSelf` tail exception; `advance` add-then-maybe-delete; `toArray` every render; no tests.

---

# Part 3 — `src/types.ts` (lines 1–21)

## Shared types

### Q152. Why a separate `types.ts` instead of declaring these next to `Snake` / `Game`?

**Non-technical:** Direction, position, and “is the game idle or over?” are shared vocabulary. Putting them in one small file means Snake, Game, Board, and Food all speak the same language without one class owning the dictionary.

**Technical:** `Position` is imported by `Board`, `Snake`, `Food`, and `Game`. `Direction` is imported by `Snake` and `Game`. `GameStatus` is Game-only today but lives next to the others as the state-machine vocabulary. If `Position` lived on `Snake`, Board would import Snake just to name a cell — a circular or layered leak. A dedicated module is the composition-root-friendly pattern: leaf types, no class dependencies, no runtime cost (interfaces erase; string enums compile to a small IIFE in `dist/types.js`). Alternative: colocate `GameStatus` in `Game.ts` and keep `Position`/`Direction` here — slightly tighter. What you would not do is duplicate `{ x, y }` in each file.

```ts
export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

export enum GameStatus {
  Idle = "Idle",
  Running = "Running",
  Paused = "Paused",
  GameOver = "Game Over",
}
```

### Q153. Why `Position` is an `interface { x: number; y: number }` and not a `class`, a tuple `[number, number]`, or a branded type?

**Non-technical:** A cell is just a column and a row. An interface is a sticky note that says “this object has x and y,” without extra machinery.

**Technical:** Structural typing: any `{ x, y }` literal is a `Position`. `Snake.nextHeadPosition` returns fresh object literals every tick; a `class Position` would force `new Position(x, y)` and a prototype you never use. A tuple `[number, number]` is shorter and still copy-by-value-of-the-container (the array is still a reference) but `pos[0]` is worse to read than `pos.x`, and you can mix up axis order. A branded type (`type Position = { x: number; y: number } & { readonly __brand: "Position" }`) would stop accidental `{ x, y }` from other domains (canvas pixels vs grid cells) — this demo never mixes those in one object, so the brand is ceremony. `Readonly<Position>` would document that callers should not mutate a segment in place; nothing freeze-enforces it (see Q155). Interview: “Interface for readability and zero emit; I’d brand it if grid cells and CSS pixels shared a function signature.”

```ts
/** A single grid cell coordinate. */
export interface Position {
  x: number;
  y: number;
}
```

### Q154. What happens if two different object literals share `{x:0,y:0}` — are they equal with `===`?

**Non-technical:** Two sticky notes can say the same address and still be two pieces of paper. JavaScript treats them as different objects.

**Technical:** `===` on objects is reference identity. `{ x: 0, y: 0 } === { x: 0, y: 0 }` is **false**. That is why `Game.positionsEqual` compares `a.x === b.x && a.y === b.y`, and why occupancy cannot be `Set<Position>` (Q205). `Map`/`Set` use SameValueZero, which for objects is the same as `===`. Each `nextHeadPosition()` allocates a **new** object, so even “the same cell as last tick” is a new reference. Value equality is always a function (`positionsEqual` / `cellKey`).

```ts
{ x: 0, y: 0 } === { x: 0, y: 0 }; // false

private positionsEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}
```

### Q155. Why not freeze Position objects?

**Non-technical:** Nobody in this game is supposed to rewrite a segment’s x/y after it is created. Freezing would lock the sticky note. You skipped that lock because new cells are created rather than edited.

**Technical:** `Object.freeze` is runtime and shallow; TypeScript’s `Readonly<Position>` is compile-time only. Frozen objects are still compared by reference, so freeze does not fix `Set<Position>`. Mutation of a stored segment would desync the deque from `occupied` (the Set keys are strings baked at add-time; changing `pos.x` in place would leave `"3,10"` in the Set while the object now says `x: 4`). The code never mutates: `advance` pushes a new head object and pops the tail object. Freeze would catch a future `head.x++` bug at the cost of a freeze per spawn (length 3) and per tick (one new head). Honest: skip freeze at this size; if you ever mutate in place, occupancy keys would lie first.

```ts
return { x: head.x, y: head.y - 1 }; // new object, never freeze()
this.body.pushFront(newHead);
```

### Q156. Why `enum Direction` with string values `"Up"` / `"Down"` / `"Left"` / `"Right"` rather than a string union type?

**Non-technical:** The four arrow meanings are a closed list with readable names. An enum is a labeled set of those names so Game and Snake cannot invent `"North"`.

**Technical:** A string enum is both a value (runtime object) and a type. `Record<Direction, Direction>` for `OPPOSITE` and `Record<string, Direction>` for `KEY_TO_DIRECTION` need a runtime object to index. A union `type Direction = "Up" | "Down" | "Left" | "Right"` is erased; you would add `const Direction = { Up: "Up", … } as const` anyway to have values. The enum is that pair in one declaration. Cost: `dist/types.js` emits an IIFE (Q157). Union + `as const` is the usual “modern TS” alternative and tree-shakes slightly better. Numeric enums are worse here (Q158). Interview: “String enum because I index it at runtime and I want DevTools to show `'Right'`, not `3`.”

```ts
export enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

const OPPOSITE: Record<Direction, Direction> = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left,
};
```

### Q157. What is the compiled JS for a string enum vs `as const` object vs numeric enum?

**Non-technical:** TypeScript’s labels disappear or become a small lookup table in the JavaScript the browser actually runs. String names stay readable; numbers would show up as 0, 1, 2, 3.

**Technical:** Live `dist/types.js` — string enum is an IIFE that assigns **forward** only (`Direction["Up"] = "Up"`). There is no reverse map. A numeric enum compiles to the bidirectional form `Direction[Direction["Up"] = 0] = "Up"` so `Direction[0] === "Up"` — extra surface, easy to confuse with array indexes. `as const` compiles to a plain object literal, no IIFE, and you write `type Direction = typeof Direction[keyof typeof Direction]` yourself. `isolatedModules` / `verbatimModuleSyntax` also treat type-only imports differently for unions vs enums (enums are values). This project’s emit is the string-enum IIFE; `Position` vanishes entirely (interface).

```js
export var Direction;
(function (Direction) {
    Direction["Up"] = "Up";
    Direction["Down"] = "Down";
    Direction["Left"] = "Left";
    Direction["Right"] = "Right";
})(Direction || (Direction = {}));
```

### Q158. Why not numeric enums (`Up = 0`) for a smaller bundle?

**Non-technical:** Saving a few characters in the file is not worth the HUD or debugger showing a mysterious `3` instead of `Right`.

**Technical:** Numeric enum values are smaller in theory (SMI vs string) but this bundle is already tiny. Reverse mappings add **more** emit, not less. `OPPOSITE` still works with numbers. The killer: if you ever stringify a direction for logs or UI, you get `"0"`. `GameStatus` is already used as HUD text (Q160–Q161); mixing numeric `Direction` next to string `GameStatus` is inconsistent. Prefer union/`as const` if bundle shape matters; do not use numeric enums for anything a human might read.

```ts
// not used — would emit reverse mapping Direction[0] = "Up"
enum Direction { Up, Down, Left, Right }
```

### Q159. Why `enum GameStatus` rather than a discriminated union?

**Non-technical:** Idle, running, paused, and game over are four named modes. An enum is a switch with labels. A union is the same idea written as a list of strings.

**Technical:** `GameStatus` is a state machine with **no associated data** per state (no `GameOver { score }` variant). A discriminated union shines when states carry payloads: `{ kind: "running" } | { kind: "over"; score: number }`. Here score already lives on `Game`. The enum is a runtime value you can assign and `===` against (`start()` checks `GameOver` or `Idle`). A union of string literals `'Idle' | 'Running' | …` would work and would **not** force `"Game Over"` to be the display string — you would map status → copy in `updateHud` (the better UI design). Cost of the enum: HUD is coupled to the identifier’s value (next questions). Interview: “Enum because four tags, no payload. I’d split the HUD string from the tag if I did it again.”

```ts
export enum GameStatus {
  Idle = "Idle",
  Running = "Running",
  Paused = "Paused",
  GameOver = "Game Over",
}
```

### Q160. Why `GameStatus.GameOver = "Game Over"` **with a space**, when the others are single tokens `Idle` / `Running` / `Paused`?

**Non-technical:** The status chip in the HUD prints whatever the code stores. Someone chose the friendlier two-word phrase “Game Over” as the stored value itself, instead of storing `GameOver` and translating it for the screen.

**Technical:** String enums make the **member value** the runtime string. `Idle` / `Running` / `Paused` happen to be valid identifiers and readable UI. `GameOver` the identifier cannot contain a space, so they overrode the value to `"Game Over"`. That is using an enum as a localization table. Overlay copy is **different**: `Game over — score ${this.score}. …` (sentence case, em dash). So “game over” exists in two dialects. Alternatives: `GameOver = "GameOver"` plus a `STATUS_LABEL` map; or `textContent = status === GameStatus.GameOver ? "Game Over" : status`. Honest gap: the space is a display concern leaking into the domain type. Reviewers notice because Q436 in Part 12 asks it again.

```ts
export enum GameStatus {
  Idle = "Idle",
  Running = "Running",
  Paused = "Paused",
  GameOver = "Game Over",
}
```

### Q161. Who displays that string — `updateHud` writes `this.status` into `#status`. What does the HUD show on death?

**Non-technical:** On death the small Status field reads **Game Over** (two words, capital G and O). The dim overlay over the board says a longer sentence about your score. Those are not the same string.

**Technical:** `gameOver()` sets `this.status = GameStatus.GameOver` then `updateHud()`. `statusEl.textContent = this.status` uses the enum’s string coercion, which is `"Game Over"`. Initial HTML is `Idle`, matching `GameStatus.Idle`. Overlay is set separately in `setOverlay(...)` and is **not** the enum. If you grepped the repo for `"Game Over"` you would find the enum value, not the overlay (overlay uses `"Game over"`). Screen readers that land on `#status` announce “Game Over”; they do not announce the enum member name `GameOver`.

```ts
private gameOver(): void {
  this.status = GameStatus.GameOver;
  cancelAnimationFrame(this.rafHandle);
  this.setOverlay(`Game over — score ${this.score}. Press restart or any direction key to try again.`, true);
  this.updateHud();
}

private updateHud(): void {
  this.config.scoreEl.textContent = String(this.score);
  this.config.statusEl.textContent = this.status;
}
```

### Q162. What happens if you rename the enum member but keep the string (or the reverse)?

**Non-technical:** The name in the code and the words on the screen can drift independently. Change one, forget the other, and either TypeScript catches you or a player sees a weird status.

**Technical:** Rename member `GameOver` → `Dead`, keep value `"Game Over"`: every `GameStatus.GameOver` reference fails to compile until updated; HUD still shows `"Game Over"`. Reverse: keep member `GameOver`, change value to `"Dead"`: all `=== GameStatus.GameOver` checks still compile (they compare the enum member), HUD shows **Dead**, HTML still starts at `Idle` so only death looks wrong. `start()` uses `this.status === GameStatus.GameOver` — that compares the **value** (`"Game Over"` vs `"Dead"`), so behavior stays consistent with the new value. HTML/CSS never mention `"Game Over"`; only `#status` text does. The footer and overlay will not auto-update.

```ts
GameStatus.GameOver === "Game Over"; // true today
this.config.statusEl.textContent = this.status; // whatever the value is
```

### Q163. Why export all three from one module — circular-import risk?

**Non-technical:** One file of shared names is easier than scattering them. Because that file does not import Snake or Game, it cannot get stuck in a loop of files importing each other.

**Technical:** `types.ts` has **zero** imports. Cycles appear when `Game` → `Snake` → `Game`. Here `Snake` imports `Deque` + `types`; `Game` imports `Board`, `Snake`, `Food`, `types`; `Food` imports `Board` + `Snake`; `Board` imports `types` only. That is a DAG with `types` at the bottom. Putting `GameStatus` in `Game.ts` would be fine (only Game uses it). Putting `Position` in `Board.ts` would force Snake to import Board — the OOP story forbids that (README: Snake knows nothing about the board). One types module is the cycle-avoidance, not a cycle risk. ESM live bindings would still be messy if you later added `types.ts` importing `Snake` for a `SnakeState` interface — don’t.

```ts
import { Position, Direction } from "./types.js"; // Snake.ts — types imports nothing
```

### Q164. Why no `CellKey` branded string type for `"x,y"`?

**Non-technical:** Occupied cells are stored as text like `"12,7"`. A branded type would be a name for “this string is a cell, not a player name.” The code uses a plain string.

**Technical:** `occupied: Set<string>` accepts any string. A typo `occupied.add(`${x}${y}`)` (missing comma) would still typecheck and silently break uniqueness (`"12"+"3"` vs `"1"+"23"`). `type CellKey = string & { readonly __cell: unique symbol }` plus `function cellKey(pos: Position): CellKey` would make `occupied.has("foo")` a type error. Cost: ceremony, and `Set<CellKey>` is still strings at runtime. Worth it in a larger grid engine; omitted here because `cellKey` is the single writer. Interview: “I’d brand it if occupancy leaked outside Snake. It doesn’t.”

```ts
function cellKey(pos: Position): string {
  return `${pos.x},${pos.y}`;
}
private occupied: Set<string>;
```

---

# Part 4 — `src/Deque.ts` (lines 1–112)

## Lines 1–13 — `DequeNode`

### Q165. Why is `DequeNode<T>` a separate class rather than an inline object type?

**Non-technical:** Each bead on the necklace needs a value plus links to the beads on either side. Giving that bead its own class keeps those three fields in one place.

**Technical:** A class (or a factory) gives a consistent shape: `value`, `prev`, `next`. An inline `{ value, prev: null, next: null }` in `pushFront`/`pushBack` would duplicate initialization and the recursive type `prev: Node<T> | null`. A `type DequeNode<T> = { value: T; prev: DequeNode<T> | null; next: DequeNode<T> | null }` plus object literals is equivalent at runtime and slightly less emit (no constructor). The class documents “this is an internal structure with an invariant,” and the constructor assigns `value` while field initializers set `prev`/`next` to `null`. Functionally either works; the class matches the “I implemented a linked list” interview narrative.

```ts
class DequeNode<T> {
  value: T;
  prev: DequeNode<T> | null = null;
  next: DequeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
```

### Q166. Why is it **not** `export`ed?

**Non-technical:** Callers should use the deque’s public buttons (push, pop, first, last), not unscrew the beads. Hiding the node class is that rule.

**Technical:** Unexported `class DequeNode` is file-private in ESM (not on `Deque.js`’s export list). `Snake` cannot import it; even `Deque`’s public API returns `T`, never nodes. If a caller mutated `node.next`, `count` / `head` / `tail` would desync (Q167, Q189). Encapsulation is the whole point of the wrapper. Alternative: `#head` private fields (already `private head`) plus a non-exported type. Exporting “for tests” would let tests assert pointer shape — usually you test through the public API instead (and this repo has no tests anyway, Q200).

```ts
/**
 * Internal doubly linked list node. Not exported — Deque is the only thing
 * that should ever touch node internals.
 */
class DequeNode<T> { /* ... */ }
export class Deque<T> { /* ... */ }
```

### Q167. What happens if a caller got a node reference and mutated `prev` / `next`?

**Non-technical:** The necklace would have a bead secretly tied to the wrong neighbor. The deque would still *think* it had five beads, but walking them might loop forever or skip the tail.

**Technical:** `count`, `head`, and `tail` would lie. `popBack` uses `this.tail.prev`; a corrupted `prev` drops nodes (leak) or nulls `head` too soon. The iterator `while (node) { node = node.next }` could cycle if you set `next` backward — infinite `toArray()` / render freeze. `first`/`last` would still read `head.value`/`tail.value`, so the bug would show up as wrong length vs painted segments. This is why nodes are unexported and why getters return `T`, not `DequeNode<T>`. `getSegments()` returns a **copy** of values (Q220), so even mutating that array does not retie pointers.

```ts
get first(): T | undefined {
  return this.head?.value; // T, never the node
}
```

### Q168. Why `prev` and `next` default to `null` rather than `undefined`?

**Non-technical:** “No neighbor” is an explicit empty link. `null` is the usual “I know this field exists and it is empty” signal in linked-list diagrams.

**Technical:** The type is `DequeNode<T> | null`, matching classic C/Java lists and making `if (!this.head)` and `if (this.head)` the same emptiness check as `count === 0` after invariants hold. `undefined` would work with optional fields (`next?: DequeNode<T>`) but then `node.next` vs missing property vs explicit undefined is three states. JSON serialization (not used) treats `null` and omitted differently. V8: both are just empty references. Style consistency: `queuedDirection: Direction | null = null` in Game uses the same convention. Optional chaining `this.head?.value` works with `null` or `undefined`.

```ts
prev: DequeNode<T> | null = null;
next: DequeNode<T> | null = null;
private head: DequeNode<T> | null = null;
```

### Q169. Why store `value: T` on the node instead of a parallel array of values?

**Non-technical:** Each bead carries its own cargo. You do not keep cargo in a separate box that must stay lined up with the necklace.

**Technical:** A parallel `T[]` plus a node chain is two structures to keep in sync — the same class of bug Snake already accepts with `body` + `occupied`, but for no gain inside Deque. An array of values **is** the alternative deque (Q170–Q175); then you would not have nodes. Intrusive lists (value object holds prev/next) would require `Position` to know about listing — types.ts would leak DSA. Node-plus-value is the textbook doubly linked list: extra object per element (GC, pointer chasing) in exchange for O(1) splice at both ends without shifting.

```ts
constructor(value: T) {
  this.value = value;
}
```

## Lines 15–23 — why a deque at all

### Q170. Why a doubly linked list rather than a JS array?

**Non-technical:** The snake always grows a new head and, unless it just ate, drops its tail. That is “add on one end, remove on the other.” A deque is the tool whose job is exactly both ends. A plain list (array) can do it, but adding at the front makes it scoot every other square down.

**Technical:** The access pattern per tick is `pushFront(newHead)` + maybe `popBack()`. A JS array gives O(1) `push`/`pop` at the **back** and O(n) `unshift`/`shift` at the **front** (Q171). A doubly linked list makes all four end operations O(1) pointer writes. Snake never needs middle insert, random access, or sort — so you pay node allocation and lose `O(1)` index. README and the HTML footer state this as the demo’s thesis. Production alternative at n ≤ 576: array with head at the back (`push` + `shift` still O(n) on shift) or a ring buffer (Q173). Interview stance: defend the ADT, then concede V8 (Q175).

```ts
 * Why not just use a JS array? Array#unshift / Array#shift are O(n) because
 * every remaining element has to be re-indexed. A linked-list deque gives
 * true O(1) pushFront / pushBack / popFront / popBack, which is exactly the
 * access pattern the Snake needs every single tick (new head at the front,
 * old tail off the back).
```

### Q171. Why is `Array#unshift` / `Array#shift` O(n)? Walk one snake move on a 200-cell body.

**Non-technical:** Imagine 200 people standing in a numbered line. Putting a new person in spot zero means everyone else takes a new number. That “everyone moves over” is the slow part. Removing the person at zero does the same thing the other way.

**Technical:** ECMAScript arrays are (usually) contiguous indexed maps. `unshift(x)` inserts at index 0 and increments every existing index; `shift()` decrements them. That is Θ(n) writes. Walk a 200-cell move with head at `body[0]`: `body.unshift(newHead)` copies 200 pointers one slot right, then `body.pop()` drops the tail in O(1). Net Θ(200) per 110ms tick. If head lived at the end: `push` O(1) + `shift` Θ(200). Either orientation pays a linear memmove. A linked-list `pushFront` writes ~four pointers (`node.next`, old `head.prev`, `head`, `count`); `popBack` writes `tail`, maybe `head`, `count`. Independent of 200. Cache note: the 200-pointer memmove is sequential and **fast** in V8 (Q175); the Big-O story is still “unshift is linear.”

```ts
// array analogue of one move (not in repo):
body.unshift(newHead); // Θ(n) reindex
if (!growing) body.pop(); // O(1)

// live:
this.body.pushFront(newHead); // O(1) pointer writes
if (this.pendingGrowth === 0) this.body.popBack();
```

### Q172. Why not `Array#push` / `Array#shift` (queue) if the head were at the back?

**Non-technical:** You can line people up the other way so new heads join the end. Then the tail has to leave the front of the line, and everyone still renumbers.

**Technical:** A FIFO queue is `push` (enqueue) + `shift` (dequeue). If `body[body.length-1]` is the head, `advance` is `push(newHead)` + `shift()` to drop the tail. `shift` is still Θ(n). You only **moved** the linear operation to the other end. Render would also change: today `index === 0` is the head (Q351); with head-at-back, the head is `length - 1`. A circular buffer or `push` + incrementing a `headIndex` without shifting is the actual fix (Q173). So “just put the head at the back” does not salvage a dense array.

```ts
// still Θ(n) per move — not what the repo does
body.push(newHead);
if (!growing) body.shift();
```

### Q173. Why not a circular buffer / ring with a head index — O(1) without pointer chasing?

**Non-technical:** You could use a fixed row of 576 slots and two bookmarks (“head starts here,” “tail starts here”) that wrap around the ends like a clock. No bead-pointers, no scooting.

**Technical:** Preallocate `cells = new Array<Position>(columns * rows)` (576). Store `headIdx`, `tailIdx`, `size`. Push front: `headIdx = (headIdx - 1 + cap) % cap; cells[headIdx] = value`. Pop back: `tailIdx = (tailIdx - 1 + cap) % cap`. All O(1), contiguous memory, one allocation for life, no per-tick `new DequeNode`. Capacity is naturally the board (a snake cannot exceed 576). This is the data structure most game engines would use. Cost vs linked list: you must handle wrap, full vs empty (`size` or a wasted slot), and `toArray` has to walk from head with modulo. This demo’s story is “I wrote a doubly linked deque,” which a ring does not photograph as well in a README.

```ts
// not in repo — ring sketch
headIdx = (headIdx - 1 + cap) % cap;
cells[headIdx] = newHead;
if (!growing) {
  cells[tailIdx] = undefined;
  tailIdx = (tailIdx - 1 + cap) % cap;
}
```

### Q174. Why not a `Uint32Array` of packed coordinates?

**Non-technical:** Instead of an object `{ x, y }` per square, pack both numbers into one integer in a typed array. Faster and smaller, uglier to read in a demo.

**Technical:** `packed = (x << 16) ^ y` or `x * rows + y` (Q202) in a `Uint32Array` ring. No object headers, no `cellKey` strings, occupancy can be a `Uint8Array[576]` bit/boolean grid. Collision and food become index checks. You give up `Position` at the boundary (Board.drawCell wants `{x,y}`) — decode on render only. Overflow: 16+16 packing needs non-negative x,y < 65536; a 24×24 board is fine. This is a perf project, not an OOP-interview project. Honest: I would not lead with `Uint32Array` unless asked “how would you make this 10× faster.”

```ts
function pack(pos: Position): number {
  return pos.x * 24 + pos.y; // 0..575 on this board
}
```

### Q175. Is a linked-list deque actually faster in V8 than a small array for n ≤ 576? When does the Big-O story win the interview vs the benchmark?

**Non-technical:** For a snake that cannot get longer than the board, a simple array is almost certainly **faster** in a real browser. The linked list is there to show you know the right abstract type and the cost of `unshift`, not because 576 items are a hot loop problem.

**Technical:** V8 packs dense arrays of pointers; `unshift` on 576 elements is a well-optimized memmove of 576 × 8 bytes (~4.5 KB) — nanoseconds to a few microseconds, once per 110ms. A `DequeNode` is a hidden class with `value`, `prev`, `next` plus the `Position` object: many heap allocations, pointer chasing across cache lines, more GC. Per-tick work today: one `new DequeNode`, one `new Position`, maybe free one node. The Big-O win appears when n is huge (replay buffers, 1e6 events) or when you must splice both ends **and** the middle. Interview script: (1) state unshift is O(n); (2) state the ADT; (3) **concede** that at n ≤ `24*24` you would accept an array or ring in production; (4) this repo is a teaching demo, and the footer says that out loud. Never pretend you benchmarked 576 nodes and the list won.

```ts
canvas.width = columns * cellSize; // 24 * 22
// max snake length = columns * rows = 576 (main.ts uses 24×24)
```

### Q176. Why claim this in the footer/README if the board max length is 576?

**Non-technical:** The page is a take-home that an interviewer will read over your shoulder. The footer is a caption under the painting: “body is a deque, collisions are a set.” It is not a player-facing hint like “arrow keys.”

**Technical:** `index.html` legend: `Deque<Position>` doubly linked list, O(1) push head / pop tail; `Set<string>` occupancy. README repeats it. Players do not need Big-O to play. The claim is **true** as an ADT statement and **overstated** as a performance necessity (Q175). Reviewer question 426 / 75 is this exact tension. Good answer: “I wrote it for the interview narrative. I know 576 does not justify pointer chasing. I would still keep the Set — occupancy as O(1) membership is the part that stays even with an array body.” Do not hide the max length; `24*24=576` is in `main.ts` config.

```html
Body is a <strong>Deque&lt;Position&gt;</strong> (doubly linked list): push a new head,
pop the tail, both O(1). Collisions are checked against a
<strong>Set&lt;string&gt;</strong> of occupied cells, O(1) per lookup instead of scanning
the body.
```

## Lines 24–46 — size / first / last

### Q177. Why keep `private count` instead of counting nodes on each `size` read?

**Non-technical:** Remembering “there are 12 beads” on a sticky note is cheaper than recounting the necklace every time the HUD asks how long the snake is.

**Technical:** `size` is read every tick (`Snake.length` → `body.size`) and after every push/pop. Walking the chain would be O(n) and would duplicate the iterator. `count++`/`count--` on the four mutators is O(1) and trivial to keep honest **if** every mutator updates it (they do; there is no `clear` or splice-middle). Drift is possible only via a future bug (Q189). Alternative: `this.size = this.toArray().length` would be a joke. C++ `std::list::size` was O(n) in old libstdc++ — this code copies the “cached size” model.

```ts
private count = 0;

get size(): number {
  return this.count;
}
```

### Q178. Why `isEmpty` as a getter rather than `size === 0` at call sites?

**Non-technical:** “Is it empty?” is a named question. Callers can say `deque.isEmpty` instead of remembering that zero means empty.

**Technical:** It is `return this.count === 0`, not a second source of truth. Snake never calls `isEmpty`; it uses `first` and throws in `getHead`. The getter is API completeness for a reusable `Deque<T>` (Q198). A method `isEmpty()` would also work; a getter reads like a property, matching `size`. Cost: one extra function in the hidden class. Call-site `size === 0` is identical and would let you drop the getter — `noUnusedLocals` does not fire on public API. Keep it as documentation of the ADT.

```ts
get isEmpty(): boolean {
  return this.count === 0;
}
```

### Q179. Why `first` / `last` return `T | undefined` rather than throwing?

**Non-technical:** Peeking at an empty queue should say “nothing there,” not crash the page. The deque is a generic toolbox; it does not know it is a snake.

**Technical:** Empty-container peeks returning `undefined` match `Array.prototype.at`, `Map.get`, and `popFront` on empty (Q187). Throwing would make `Deque` opinionated about a usage invariant that only Snake has (“body never empty”). Snake **does** throw in `getHead()` (Q181, Q219) after reading `first`. `wouldCollideWithSelf` uses `const tail = this.body.last; if (tail && cellKey(tail) === nextKey)` — optional, no throw. Split of responsibility: Deque is total and safe; Snake asserts its own invariant at the boundary that Game relies on.

```ts
get first(): T | undefined {
  return this.head?.value;
}

get last(): T | undefined {
  return this.tail?.value;
}
```

### Q180. Why optional chaining `this.head?.value`?

**Non-technical:** If there is no first bead, do not try to read a value off it. The `?.` is “read value only if the bead exists.”

**Technical:** `this.head` is `DequeNode<T> | null`. `this.head?.value` is `T | undefined`. Equivalent to `this.head === null ? undefined : this.head.value`. Without `?.`, `this.head.value` is a TypeScript error under `strict` (`null` has no `value`) and a runtime TypeError. `?.` also short-circuits on `undefined`; `head` is only ever `null` or a node. Compile target ES2020 includes optional chaining (tsconfig `"target": "ES2020"`), so `dist/Deque.js` keeps `this.head?.value`.

```ts
return this.head?.value;
```

### Q181. Snake’s `getHead()` throws if empty — why the inconsistency with Deque?

**Non-technical:** The necklace toolkit allows an empty necklace. A snake with zero body squares is a broken game, so Snake yells immediately instead of painting nothing and dying mysteriously later.

**Technical:** Different invariants. `Deque<T>` must support empty (generic). `Snake` constructor is the only writer of `body`; Game always passes three segments. After that, `advance` pushes before it pops (Q236), so length never hits 0 in normal play. `getHead()` is called from `nextHeadPosition`, `peekNextHead`, and therefore every tick — failing loud beats returning `{x:NaN,y:NaN}` or skipping a frame. The throw is not used as control flow; it is an assert. Empty `initialSegments` is the only way to hit it (Q218). Inconsistency is intentional layering, not sloppiness.

```ts
getHead(): Position {
  const head = this.body.first;
  if (!head) throw new Error("Snake has no body segments");
  return head;
}
```

## Lines 48–98 — push / pop

### Q182. Why both `pushFront` and `pushBack` when Snake only uses `pushFront` + `popBack`?

**Non-technical:** A double-ended queue that can only add on one end is just a stack with extra branding. The class is a complete deque so you can reuse it and so the README claim is honest.

**Technical:** Snake’s pattern is specifically front-insert, back-remove (head at `first`). `pushBack` is unused by Snake; `popFront` unused too (Q183). `noUnusedLocals` does not flag **methods**. Keeping both ends makes `Deque<T>` a real ADT for a util package (Q424) and for a whiteboard (“implement a deque”). Cost: more code to test (and there are no tests). Alternative: a `SinglyLinkedStack` plus tail pointer still needs `pushFront`+`popBack`, which is already a deque. Dropping `pushBack`/`popFront` would make the footer’s “double-ended” claim false.

```ts
this.body.pushFront(newHead); // Snake.advance
const removedTail = this.body.popBack();

// unused by Snake, part of the ADT:
pushBack(value: T): void
popFront(): T | undefined
```

### Q183. Why both `popFront` and `popBack`?

**Non-technical:** Same as both pushes: both ends can give items back. Snake only takes from the tail end.

**Technical:** Symmetric API. `popFront` is the operation you’d use if the snake stored head at the back (it doesn’t). Empty-pop returns `undefined` on both (Q187). Implementing only `popBack` would still serve Snake. Interview: “I implemented the four O(1) operations so I could say deque, not ‘a list I only use as a stack+queue hybrid.’” A reviewer who asks you to delete unused methods is asking you to shrink the demo; a reviewer who asks you to keep them is asking about reuse. Either is defensible if you say it.

```ts
popFront(): T | undefined { /* unused by Snake */ }
popBack(): T | undefined { /* used every non-growth tick */ }
```

### Q184. Walk `pushFront` on an empty deque: why set **both** `head` and `tail`?

**Non-technical:** The first bead is both the start and the end of the necklace. If you only mark it as the start, the “end” pointer still says “nothing,” and the next tail-removal will get confused.

**Technical:** Empty: `head === tail === null`, `count === 0`. New node: `prev`/`next` null. `if (!this.head)` branch sets `this.head = this.tail = node`. One node is the entire list; `first` and `last` must be the same value. If you only set `head`, `popBack` reads `this.tail` (still null), returns `undefined`, and **does not** decrement correctly relative to a `count++` you already did — actually you’d `count++` then `popBack` would see no tail and return undefined **without** decrementing (look at the code: `if (!node) return undefined` before decrement). Then `count === 1` with a head and no tail: iterator yields one value, `last` is undefined, next `pushFront` takes the else branch (`head` is truthy) and links `node.next = this.head` but `tail` stays null. Broken. Both pointers on the empty→one transition are the invariant.

```ts
pushFront(value: T): void {
  const node = new DequeNode(value);
  if (!this.head) {
    this.head = this.tail = node;
  } else {
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }
  this.count++;
}
```

### Q185. Walk `pushFront` on a one-element deque: which pointers change?

**Non-technical:** You clip a new bead onto the front. The old only-bead is now second. Its backward link points at the newcomer; the end-of-necklace bookmark does not move.

**Technical:** Start: `head === tail === A`. `pushFront(B)`: else branch. `B.next = A`; `A.prev = B`; `head = B`; `tail` remains `A`; `count` 1→2. `A.next` stays null. `B.prev` stays null. Order front→back: B, A. Snake constructor does this three times on tail-first input so the last pushed segment is head (Q214). Wrong pointer here (forgetting `A.prev = B`) would make `popBack` still work (`tail.prev` would be null, emptying the list and nulling head — you’d drop B accidentally when popping A). Forgetting to move `head` would leave first as A.

```ts
node.next = this.head;
this.head.prev = node;
this.head = node;
```

### Q186. Walk `popBack` on a one-element deque: why `this.head = null` as well as `this.tail`?

**Non-technical:** Removing the last bead must leave an empty necklace. If you only clear the “end” bookmark, the “start” bookmark still points at a bead you meant to throw away.

**Technical:** `node = tail` (the only node). `this.tail = node.prev` → `null`. `if (this.tail) this.tail.next = null; else this.head = null`. The else is the empty transition. If you skip `this.head = null`, `count` becomes 0 but `first` still returns the detached node’s value, `isEmpty` is true, iterator still walks from `head` → **yields a value**, `size` is 0. Render vs length desync. Detached node’s `prev`/`next` are not cleared (not needed; nothing references it except the soon-dropped `node` local). Symmetric: `popFront` on one element sets `this.tail = null`.

```ts
popBack(): T | undefined {
  const node = this.tail;
  if (!node) return undefined;

  this.tail = node.prev;
  if (this.tail) this.tail.next = null;
  else this.head = null;

  this.count--;
  return node.value;
}
```

### Q187. What happens if you `popFront` an empty deque — `undefined`, or a thrown error? Why that choice?

**Non-technical:** Taking from an empty queue gives you nothing, quietly. That matches arrays: `[].pop()` is `undefined`, not an exception.

**Technical:** `if (!node) return undefined` before any pointer writes or `count--`. No throw. Matches JS `Array#pop`/`shift` and keeps Deque usable without try/catch. Snake’s `advance` does `const removedTail = this.body.popBack(); if (removedTail) this.occupied.delete(...)` — the `if` is a leak guard (Q240), not expected in normal play because `pushFront` already ran. Throwing on empty pop would be a reasonable “strict deque” (Python `collections.deque.pop` throws `IndexError`). This codebase chose JS-idiomatic optional results at the Deque layer and throws only in `Snake.getHead`.

```ts
popFront(): T | undefined {
  const node = this.head;
  if (!node) return undefined;
  // ...
}
```

### Q188. Why decrement `count` after detaching, not before?

**Non-technical:** Change the necklace first, then update the “how many beads” note so a crash in the middle is less likely to leave a lying number. Here both orders are safe.

**Technical:** No code between detach and `count--` can throw. Order is style: some lists decrement first so a mid-function return still matches; this code returns `undefined` **before** any detach on empty, so empty never decrements (correct: would go negative if you decremented first without a guard). Non-empty: detach, decrement, return value. Decrement-before-detach would also be correct with the empty guard first. There is no atomicity vs reentrancy (JS is single-threaded; iterator mutation is a separate issue, Q194). Do not decrement on the empty path — the early return encodes that.

```ts
if (!node) return undefined;
this.tail = node.prev;
// ... detach ...
this.count--;
return node.value;
```

### Q189. What happens if `count` drifts from the true chain length — who would notice?

**Non-technical:** The score-like length number would lie. The snake on screen is the necklace walked bead by bead, so the picture and the number could disagree.

**Technical:** `Snake.length` is `body.size` → `count` (HUD does not show length; score is food×10). `getSegments()` / iterator **ignore** `count` and walk `next` until null. Render follows the chain. `isEmpty` follows `count`. Drift symptoms: `length` wrong vs painted cells; `isEmpty` true while `first` is defined; a future loop `for (i < deque.size)` skipping or overrunning. Who notices: a unit test comparing `size` vs `[...deque].length` (does not exist, Q200); a reviewer reading `advance`; players probably never, because HUD has no length. Food rejection sampling uses `occupiesCell` (Set), not `count`.

```ts
get size(): number {
  return this.count;
}
*[Symbol.iterator](): IterableIterator<T> {
  let node = this.head;
  while (node) {
    yield node.value;
    node = node.next;
  }
}
```

### Q190. Why not return `this` for chaining?

**Non-technical:** You could write `deque.pushFront(a).pushFront(b)`. The code does not; each call is its own sentence.

**Technical:** Mutators return `void` (pops return `T | undefined`). Chaining `pushFront` would collide with pop’s return value if you tried to unify. Snake’s constructor uses a `for` loop, not a fluent chain. Fluent APIs are nicer in builders; a deque used inside a game loop does not need them. Returning `this` from push would be a one-line change and would not break Snake. Not a gap, just YAGNI.

```ts
pushFront(value: T): void {
  // ...
  this.count++;
}
```

### Q191. Why no `peek` methods separate from `first` / `last`?

**Non-technical:** Peek means “look without taking.” `first` and `last` already mean that. Extra names would be synonyms.

**Technical:** Some libraries use `peekFront`/`peekBack` vs `front`/`back` vs `first`/`last`. This API picked getters `first`/`last` (non-throwing). A `peek()` that aliases `first` would be noise. Snake uses `body.first` via `getHead` and `body.last` in the tail exception — those *are* peeks. `peekNextHead` on Snake is a different idea: predicted **next** cell, not deque peek.

```ts
get first(): T | undefined { return this.head?.value; }
get last(): T | undefined { return this.tail?.value; }
```

## Lines 100–111 — iterator and `toArray`

### Q192. Why `[Symbol.iterator]` as a generator rather than a custom iterator object?

**Non-technical:** `for (const segment of deque)` works because the deque knows how to walk itself. A generator is the short way to say “hand out each bead, front to back.”

**Technical:** `*[Symbol.iterator]()` returns an `IterableIterator<T>` with `next`/`return` generated by TS/JS. A manual iterator is `{ next() { … } }` plus tracking a cursor; more code, easy to get `done` wrong. Generators pause at `yield`, so a `for…of` pulls one node at a time. `toArray` is `[...this]`, which uses this iterator. Downsides: generator objects allocate; `return()` on break is handled. Target ES2020 emits `function*` still. Custom iterators would not be faster in a meaningful way at n ≤ 576.

```ts
*[Symbol.iterator](): IterableIterator<T> {
  let node = this.head;
  while (node) {
    yield node.value;
    node = node.next;
  }
}
```

### Q193. Why iterate front → back (head first)?

**Non-technical:** The front of the deque is the snake’s head. Painting from head to tail matches “first square is the bright one.”

**Technical:** `Game.render` does `getSegments()` then `index === 0 ? HEAD_COLOR : BODY_COLOR`. Head-first iteration is a contract with render. Reverse (tail-first) would paint the tail as the head (Q215, Q352). `wouldCollideWithSelf` uses `last` for the tail, not the iterator. Documented on the iterator: “so `for (const x of deque)` visits head first.” Changing walk order without changing render is a silent visual bug.

```ts
/** Iterate front -> back, so `for (const x of deque)` visits head first. */
*[Symbol.iterator](): IterableIterator<T> { /* head → tail */ }

/** Ordered head -> tail, for rendering. */
getSegments(): Position[] {
  return this.body.toArray();
}
```

### Q194. What happens if you mutate the deque while iterating?

**Non-technical:** Changing the necklace while you are counting beads can skip a bead or visit one twice. This game does not do that: it walks a **copy** at paint time, after the move is finished.

**Technical:** The generator holds a `node` reference. `pushFront` during iteration: new head is **behind** the cursor if you already passed the old head — missed. `popBack`: if you have not reached the tail, the tail’s `next` is already null so the walk still ends; if the current `node` is detached, `node.next` may still walk a detached chain (nodes are not zeroed). `popFront` of the node you are on: you still follow `.next` from the detached node, which is usually still linked forward — you may yield a removed value then continue. Classic linked-list iterator invalidation. Live Game: `tick` mutates, then `render` → `toArray` → new iterator on a stable chain. Safe because mutation and iteration are sequenced, not nested.

```ts
toArray(): T[] {
  return [...this];
}
```

### Q195. Why `toArray()` is `[...this]` rather than a `while` loop pushing into a pre-sized array?

**Non-technical:** “Turn this necklace into a normal list” in one expression. It reuses the walk you already wrote.

**Technical:** Spread calls the iterator; allocates an array that grows (typically geometric resize). A `new Array(this.count)` + index fill would be one allocation of exact size and would **use `count`**, catching drift if you also asserted `i === count` at the end. `[...this]` trusts the chain, not `count` (Q189). Micro-optimizing 576 spreads is irrelevant. Pre-sized is what I’d write in a hot path after a profiler said render allocate showed up — it hasn’t.

```ts
toArray(): T[] {
  return [...this];
}
```

### Q196. What is the complexity of `toArray()` and how often does `Game.render` call it?

**Non-technical:** Every time the snake moves, the game copies the whole body to draw it. Copying 10 squares is nothing; copying 576 is still tiny next to painting them.

**Technical:** `toArray` is Θ(n) time and Θ(n) extra memory, n = snake length. `Game.render` calls `this.snake.getSegments()` **once per tick** (and once from the constructor’s initial `render()`). Ticks are every `tickMs` (110). It does **not** call it on RAF frames that do not tick. Pause: no ticks, so no copies. Alternative: `for (const segment of this.snake.body)` would require exposing the deque or a `forEachSegment` callback to avoid the array. Dirty-rect rendering would avoid redrawing n cells but that is Board-level (Q350). Interview: “O(n) per tick, n ≤ 576, called from render after each move. I would iterate without copying if allocation showed up in a profile.”

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

### Q197. Why no `at(index)` / random access — and why is that OK for Snake?

**Non-technical:** Linked necklaces are bad at “give me bead number 17.” Snake never asks that. It asks for the first, the last, or all of them in order.

**Technical:** Index lookup in a doubly linked list is Θ(k) from the nearer end. Snake needs: head (`first`), tail (`last`), membership (the Set, not the list), and ordered paint (`toArray`). No binary search, no “second segment,” no physics on segment i. Adding `at` would invite O(n) use in a hot path. Arrays win if you need `body[i]`. OK because the game’s queries match deque + set, not a vector.

```ts
getHead(): Position { /* first */ }
// wouldCollideWithSelf uses this.body.last
getSegments(): Position[] { return this.body.toArray(); }
```

## Generics and API surface

### Q198. Why `Deque<T>` generic if the only user is `Deque<Position>`?

**Non-technical:** The necklace does not care whether beads are map cells or numbers. Making it generic is saying “this is a real queue class,” which is the point of the file.

**Technical:** Zero extra runtime cost (T is erased). `new Deque<Position>()` in Snake is the only instantiation. Generic keeps Deque from importing `types.ts` (no `Position` in Deque.ts) — important OOP: Deque knows nothing about the game (README table). If it were `Deque` of `Position` only, the class would sit in Snake.ts or import types, weakening the “reusable util” story (Q424). Interview: “Generic because the structure is domain-agnostic. The only monomorphization is in Snake.”

```ts
export class Deque<T> { /* ... */ }
this.body = new Deque<Position>();
```

### Q199. Why no `clear()` — Game constructs a new Snake on reset instead?

**Non-technical:** Restart throws the old snake away and builds a new one. You do not empty the old necklace to reuse it.

**Technical:** `reset()` does `this.snake = new Snake(initialSegments, Direction.Right)`. Old `Snake`, `Deque` nodes, and `Set` become unreachable and GC’d. `clear()` would null `head`/`tail`, zero `count`, and should clear `occupied` on Snake too — two-level reset. New object graph is simpler and avoids stale `pendingGrowth` / `direction`. Cost: allocations on each Restart (tiny). A `clear` is useful in pools; this game does not pool. Gap only if you later reset 60 times a second.

```ts
this.snake = new Snake(initialSegments, Direction.Right);
this.food = new Food(this.board, this.snake);
this.queuedDirection = null;
```

### Q200. Why no tests in this repo for empty pop, one-node pop, and round-trip `pushFront`/`popBack`?

**Non-technical:** The project proves structures by playing the game, not by a test command. That is a real hole: the fiddly empty and one-bead cases are exactly what tests are for.

**Technical:** `package.json` scripts are `build` and `watch` only. No vitest/`node:test`. Untested contracts: empty `pop*` → `undefined`; one-node pop nulls both ends; `pushFront` then `popBack` FIFO-from-the-other-end (head inserted, tail removed — for a 1-length list that is identity); `size` vs `[...d].length`; iterator order. The **dangerous** game logic tests are not even in Deque: tail-cell exception and add-then-delete occupancy (Q230, Q238). Reviewer Q427–Q428. Honest answer: “Interview demo; I would add Deque round-trips and `wouldCollideWithSelf` table tests first. I have not run them.” Do not claim TDD.

```json
"scripts": {
  "build": "tsc",
  "watch": "tsc --watch"
}
```

### Q201. What would a reviewer ask you to whiteboard: implement `pushFront` from scratch?

**Non-technical:** They will hand you a marker and say “add a bead to the front.” You draw the empty case and the non-empty case. Both are in the file.

**Technical:** State the representation: `head`, `tail`, `count`, node `{value, prev, next}`. Algorithm: allocate node. If `head` is null, `head = tail = node`. Else splice: `node.next = head`, `head.prev = node`, `head = node`. Increment `count`. Mention `prev`/`next` default null. Then they ask `popBack` on one node (`head = null` when `tail.prev` is null). Then Snake: why `pushFront` not `pushBack` (Q214). Sketch:

```
empty:      head/tail ──► null
pushFront A: head/tail ──► [A]
pushFront B: head ──► [B] ⇄ [A] ◄── tail
```

Live code is the answer key; write it without looking, including `count++`.

```ts
pushFront(value: T): void {
  const node = new DequeNode(value);
  if (!this.head) {
    this.head = this.tail = node;
  } else {
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }
  this.count++;
}
```

---

# Part 5 — `src/Snake.ts` (lines 1–149)

## Lines 1–14 — helpers

### Q202. Why `cellKey(pos)` returns `` `${pos.x},${pos.y}` `` rather than `${x}:${y}` or a number `x * rows + y`?

**Non-technical:** Each square needs a name for the “occupied squares” set. `"7,3"` is readable in the debugger. A colon would also work. A single number is faster but needs to know the board width.

**Technical:** Comma-separated decimals are unambiguous: `"1,23"` ≠ `"12,3"`. Concatenation without a separator is not (`""+1+23` vs `12+3`). Colon vs comma is cosmetic (neither appears in `number`’s default tostring for integers). Packed `x * columns + y` is O(1), no string alloc, but Snake does not import Board and does not know `columns` (Q233). Negative coords: `"x,y"` stays unique (`"-1,5"`); `x * columns + y` with x = -1 needs a defined modulus policy. Strings allocate per `cellKey` call (several per tick: add, maybe delete, collision, occupies). At 576 max keys, `Set<string>` is fine. Interview: “Readable keys, no Board dependency. Packed ints if this were a 1000×1000 sim.”

```ts
function cellKey(pos: Position): string {
  return `${pos.x},${pos.y}`;
}
```

### Q203. Why is `cellKey` a module-private function, not a `Position` method?

**Non-technical:** Positions are dumb coordinates. Encoding them for a set is Snake’s occupancy trick, not something every `{x,y}` in the program should know.

**Technical:** `Position` is an interface — no methods unless you use a class or a helper module. A method would require a class or `function cellKey` in `types.ts` (then Board/Food could key too). Only Snake’s `occupied` Set uses this format; `Game.positionsEqual` compares fields. Keeping `cellKey` private means Food asks `snake.occupiesCell(pos)` instead of reimplementing the encoding (Q234, Q279). If two modules hashed differently, occupancy would lie. Unexported `function` in the ES module is the right visibility.

```ts
function cellKey(pos: Position): string {
  return `${pos.x},${pos.y}`;
}
```

### Q204. What happens if coordinates can be negative (wall check is in Board) — is `"-1,5"` still unique?

**Non-technical:** Off the left edge the name becomes `"-1,5"`. That is still a different name from `"1,5"` or `"0,5"`, so the set will not confuse it with a real square.

**Technical:** `wouldCollideWithSelf` can run on an out-of-bounds `nextHead` if Game called it without a wall check — Game short-circuits `!isWithinBounds(nextHead) || wouldCollideWithSelf()` so walls win first, but the Set lookup would still be well-defined. `"-1,5"`, `"1,-5"`, `"-1,-5"` are distinct strings. Ambiguity would require a separator that appears in the number format (e.g. concatenating without comma). Unary minus is part of the string, not a second separator. Board never stores negative cells in the deque in normal play because `advance` is skipped on wall death. Unique: yes.

```ts
if (!this.board.isWithinBounds(nextHead) || this.snake.wouldCollideWithSelf()) {
  this.gameOver();
  return;
}
```

### Q205. Why not `Set<Position>`? What does `Set` use for object equality?

**Non-technical:** JavaScript’s set treats two identical-looking coordinate objects as different because they are two objects. The snake would never “see” that it ran into itself unless you passed the exact same object back in.

**Technical:** `Set`/`Map` keys use SameValueZero: for objects, **reference identity** (Q154). Every `nextHeadPosition()` returns a new literal, so `occupied.has(nextHead)` would be false even if a body segment sits on that cell. You would have to keep the same object instances and look up with those references — `advance` cannot ask “is this cell taken?” with a freshly computed neighbor. `Set<string>` + `cellKey` is value equality on coordinates. `WeakSet<Position>` would be worse (no iteration, still identity). This is the highest-signal Set question in the file; pair it with `cellKey` and the footer’s `Set<string>`.

```ts
occupied.has({ x: 3, y: 4 }); // false even if a segment is {x:3,y:4}
this.occupied.has(cellKey(pos)); // true if any segment shares x,y
```

### Q206. Why not a 2D `boolean[][]` occupancy grid of size 24×24?

**Non-technical:** A checkerboard of true/false, one per square, is the other obvious “is this cell taken?” structure. It needs to know the board size. The Set does not.

**Technical:** `boolean[24][24]` (or `Uint8Array(576)`) is true O(1), no hashing, no string keys, great locality, fixed memory. Snake would need `columns`/`rows` (import Board or take dimensions in the constructor), breaking “Snake knows nothing about the board.” Initialization and `reset` must fill false. Growth beyond 24×24 means realloc. The Set grows with length, not board size, and supports the theoretical out-of-bounds key (Q204). For this game a grid is excellent and maybe simpler than hashing strings. The demo chose Set because the README’s second thesis is `Set<string>` of occupied cells.

```ts
private occupied: Set<string>;
occupiesCell(pos: Position): boolean {
  return this.occupied.has(cellKey(pos));
}
```

### Q207. Why `OPPOSITE` as `Record<Direction, Direction>` rather than a switch?

**Non-technical:** “What is the reverse of Right? Left.” A lookup table is that dictionary. A switch is four `case`s that say the same thing.

**Technical:** `Record<Direction, Direction>` is exhaustive: if you add `Direction.UpLeft`, TypeScript errors until `OPPOSITE` gets a key (`strict` + missing-key check on the object literal). A `switch` with `noImplicitReturns` also forces coverage. Table is data, one line per pair, and `setDirection` reads `OPPOSITE[this.direction] === next`. Switch would be a function `isOpposite(a,b)`. Either is O(1). Table cannot express “length === 1 allows reverse” without extra logic in `setDirection` (Q226).

```ts
const OPPOSITE: Record<Direction, Direction> = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left,
};
```

### Q208. What happens if you add a diagonal direction later?

**Non-technical:** You would teach the snake a fifth move, teach “what is opposite a diagonal,” and teach the HUD keys. Nothing in the table auto-invents that.

**Technical:** Touch list: `Direction` enum; `OPPOSITE` (diagonal opposite is the other diagonal); `nextHeadPosition` switch (x and y both change); `KEY_TO_DIRECTION`; maybe prevent 180 on the diagonal axis; drawing unchanged. `Record<Direction, Direction>` fails compile until complete. `noFallthroughCasesInSwitch` / `noImplicitReturns` fail if the switch omits the new case (Q243). Self-collision and deque are direction-agnostic. Diagonals also make “two 90s in one tick” a different design (you might want 45° steps). Honest: this engine is 4-way on purpose.

```ts
switch (this.direction) {
  case Direction.Up:
    return { x: head.x, y: head.y - 1 };
  // new diagonal: return { x: head.x + 1, y: head.y - 1 };
}
```

## Class comment and fields

### Q209. Why does Snake own **two** structures (`body` + `occupied`) that must stay in sync?

**Non-technical:** The necklace is the truth about order (what is head, what is tail, what to paint). The set is a fast checklist of “which squares are covered?” One structure is bad at the other’s job.

**Technical:** Deque: O(1) end updates, O(n) membership, ordered. Set: O(1) average membership, no order, no tail identity except by storing `last`. Duplicating occupancy is denormalization for speed, same idea as a DB index. Invariant: `occupied` equals `{ cellKey(p) | p in body }` **except** the add-then-delete tail-overlap hole (Q238). Comments in Snake.ts state the pair. Alternative: only deque and scan for collision (O(n), fine at 576) — then you do not need sync. Alternative: only a grid (Q206) plus a deque for order. The demo keeps both to show Deque **and** Set.

```ts
 *  - `body`: a Deque<Position>, head at the front, tail at the back.
 *  - `occupied`: a Set<string> mirroring every cell the body currently
 *    covers.
private body: Deque<Position>;
private occupied: Set<string>;
```

### Q210. What bugs appear if `advance` updates the deque but forgets the Set (or the reverse)?

**Non-technical:** The picture (deque) and the checklist (set) would disagree. Food could spawn on the snake, or the snake could pass through itself, or die on an empty square.

**Technical:** Deque updated, Set forgot **add** of new head: `occupiesCell(head)` false → food can spawn on the head; `wouldCollideWithSelf` misses the neck later. Forgot **delete** of tail: ghost occupancy → false self-death on the vacated cell; food never respawns there. Set updated, deque forgot **push**: collision/food think the cell is taken, render does not show it. Forgot **pop**: snake looks longer than occupancy, tail is a ghost you can pass through. Constructor could also desync (loop adds both today). This is why tests should compare `[...body].map(cellKey)` as a set to `[...occupied]`.

```ts
this.body.pushFront(newHead);
this.occupied.add(cellKey(newHead));
// ...
const removedTail = this.body.popBack();
if (removedTail) this.occupied.delete(cellKey(removedTail));
```

### Q211. Why `private direction` + `pendingGrowth = 0` rather than a boolean `growing`?

**Non-technical:** Direction is which way the head faces. Growth is “how many upcoming slithers should leave the tail in place?” A counter can be 2 if you ever eat a bigger fruit; a yes/no flag can only skip one slither.

**Technical:** `grow(amount = 1)` does `pendingGrowth += amount`, so two eats in two ticks stack (eat, grow pending 1, advance decrements to 0, …). A boolean `growing = true` would collapse two eats in one tick (if that could happen) to one segment. Game calls `grow(1)` at most once per tick, so a boolean would match today’s rules. The counter is the right model for “skip the next N pops” (Q212) and for bonus food later. `direction` is the applied heading `setDirection` writes; it is not a queue (Game owns `queuedDirection`).

```ts
private direction: Direction;
private pendingGrowth = 0;

grow(amount = 1): void {
  this.pendingGrowth += amount;
}
```

### Q212. Why not store growth as “skip the next N pops” on the Game side?

**Non-technical:** Growing is a fact about the snake’s body, not about the scorekeeper. Game already says “you ate, grow by one.” Snake decides how that changes the next moves.

**Technical:** If Game skipped pops, it would call a hypothetical `advance({ grow: true })` or `advance` vs `advanceAndGrow`, leaking body mechanics into the orchestrator. README: Game holds no data-structure logic. `pendingGrowth` stays private; `wouldCollideWithSelf` **must** know whether the tail will vacate (Q230). That knowledge cannot live only in Game without Snake asking Game “are we growing?” — inverted dependency. Game’s job is `grow(1)` then `advance()` in that order (Q340–Q341).

```ts
if (ateFood) {
  this.snake.grow(1);
  this.score += 10;
}
this.snake.advance();
```

## Constructor (tail-first)

### Q213. Why is `initialSegments` documented as **tail-first, head-last**?

**Non-technical:** The spawn list is written left-to-right as the snake lies on the grid: tip of the tail first, head last. That matches how you would read a drawing of a horizontal snake facing right.

**Technical:** JSDoc: `@param initialSegments body cells listed tail-first, head-last (e.g. [tail, ..., head])`. Game builds exactly that: `startX-2`, `startX-1`, `startX`, facing `Right`. Combined with `pushFront` each (Q214), the last array element becomes `body.first`. Documenting the order is mandatory because the opposite order silently inverts the snake (Q215). Alternative docs: “head-first, we `pushBack`” (Q216). There is no runtime check (Q217).

```ts
/**
 * @param initialSegments body cells listed tail-first, head-last
 *                         (e.g. [tail, ..., head]).
 * @param initialDirection direction the snake starts moving in.
 */
```

### Q214. Why `pushFront` each segment in that order so the last element becomes `body.first`?

**Non-technical:** You drop each square onto the front of the necklace. The first square you drop (the tail) ends up at the back. The last square you drop (the head) sits at the front. That is the trick.

**Technical:** Tail-first array `[T, M, H]`:
1. `pushFront(T)` → deque `[T]`
2. `pushFront(M)` → `[M, T]`
3. `pushFront(H)` → `[H, M, T]`
`getHead()` is H, `last` is T, iterator paints H then M then T. Occupied keys all three. This is easier to mismatch than `pushBack` on a head-first array, so the comment restates it. Interview: draw the three snapshots. If you `pushBack` on the same tail-first array you get `[T, M, H]` and the tail is painted as the head.

```ts
for (const segment of initialSegments) {
  this.body.pushFront(segment);
  this.occupied.add(cellKey(segment));
}
```

```ts
const initialSegments: Position[] = [
  { x: startX - 2, y: startY },
  { x: startX - 1, y: startY },
  { x: startX, y: startY },
];
this.snake = new Snake(initialSegments, Direction.Right);
```

### Q215. What happens if Game passed head-first by mistake — how would the snake look and move?

**Non-technical:** The bright head cell would be the left tip, the snake would immediately try to crawl through its own body, and the first tick would usually be game over.

**Technical:** Head-first `[H, M, T]` with `pushFront` yields deque `[T, M, H]` — `first` is T (left cell), `last` is H (right cell), facing Right. `peekNextHead` is left-cell + (1,0) = **M**, which is occupied and is not the tail (tail is H). `wouldCollideWithSelf` → true on tick 1 → `gameOver` before `advance`. Render would have painted T as `HEAD_COLOR` (index 0) during Idle, so the player already sees a reversed snake. Instant death on the first move is the runtime symptom. This is why the comment and Game’s array order are a paired contract.

```ts
// wrong: head-first with pushFront
[{ x: startX, y: startY }, { x: startX - 1, y: startY }, { x: startX - 2, y: startY }]
// after loop, first = left cell, next Right lands on mid → self-hit
```

### Q216. Why not `pushBack` in tail-first order instead?

**Non-technical:** You could clip squares onto the other end. Then tail-first input would put the tail at the front — the wrong end — unless you also reversed the list.

**Technical:** Tail-first + `pushBack`: deque `[T, M, H]`, first = T. Same bug as Q215. Head-first + `pushBack`: `[H, M, T]`, correct. So there are two consistent pairings:

| Array order | Mutator | Result `first` |
| --- | --- | --- |
| tail → head | `pushFront` | head (live) |
| head → tail | `pushBack` | head |
| tail → head | `pushBack` | tail (bug) |
| head → tail | `pushFront` | tail (bug) |

Live code picked row 1 because Game’s comment reads the snake left-to-right as tail then head. Either consistent pairing is fine; mixing is instant death.

```ts
// equivalent correct scheme (not live):
// for (const segment of headFirst) this.body.pushBack(segment);
```

### Q217. Why no validation that segments are adjacent and unique?

**Non-technical:** The constructor trusts Game to pass a real snake: no gaps, no doubled squares. A bad list would spawn a ghost or a knot.

**Technical:** No check that Manhattan distance between consecutive segments is 1, no check that `occupied.size === initialSegments.length` (duplicate cells would collapse the Set and desync). Cost of validation: O(n) at spawn, once. Worth it in a public API; this constructor is only called from `reset` with a literal of three collinear cells. Empty array is also unvalidated (Q218). Interview: “I’d assert adjacency in debug builds. I don’t at this call volume.” Duplicate keys: `Set.add` is a no-op; deque still has two nodes on one cell — collision and paint disagree.

```ts
for (const segment of initialSegments) {
  this.body.pushFront(segment);
  this.occupied.add(cellKey(segment));
}
```

### Q218. What happens if `initialSegments` is empty — when does `getHead()` throw?

**Non-technical:** You would build a snakeless snake. The crash happens when something asks “where is the head?” — the first move or peek — not inside the constructor.

**Technical:** Constructor succeeds: empty deque, empty Set, `direction` set. `getHead()` throws `"Snake has no body segments"` when `tick` → `peekNextHead` → `nextHeadPosition` → `getHead`. Constructor’s `render()` → `getSegments()` → `[]` paints no snake; food still spawns (all cells free). Idle looks like an empty board with overlay. First direction key starts the loop, first tick throws inside RAF (uncaught, game stuck). `wouldCollideWithSelf` would also throw via `nextHeadPosition`. Fail-fast is delayed until the invariant is used, not when it is broken.

```ts
constructor(initialSegments: Position[], initialDirection: Direction) {
  this.body = new Deque<Position>();
  this.occupied = new Set<string>();
  this.direction = initialDirection;
  for (const segment of initialSegments) { /* never runs if empty */ }
}
```

## Getters

### Q219. Why `getHead()` throws rather than returning `undefined`?

**Non-technical:** Every real snake has a head. Returning “maybe a head” would force Game to handle a case that means the game is already corrupted.

**Technical:** Narrows `Position` for `nextHeadPosition` arithmetic. `undefined` would require `head!` or early returns in four methods. Throw is an assertion error, not a player-facing overlay. Contrast Deque `first` (Q181). Alternative: `Position | undefined` plus Game treating it as game over — that would hide constructor bugs as random deaths.

```ts
getHead(): Position {
  const head = this.body.first;
  if (!head) throw new Error("Snake has no body segments");
  return head;
}
```

### Q220. Why `getSegments()` returns a **copy** (`toArray`) rather than exposing the deque?

**Non-technical:** Game gets a snapshot list to paint. It cannot retie the necklace or pop the tail from the render loop.

**Technical:** Encapsulation: `body` is private. Returning `Deque<Position>` would let Game `popBack` during render. Returning the internal array of a hypothetical array-body would let `segments[0] = …` mutate storage (and not the Set). `toArray` allocates (Q196). Mutating the copy’s objects **would** still mutate live `Position`s because the copy is shallow — `segments[0].x++` desyncs keys (Q155). Freeze-on-return would stop that. Live risk is low: Game only reads for `drawCell`. Interview: “Shallow copy of references. True isolation would clone coordinates or freeze.”

```ts
getSegments(): Position[] {
  return this.body.toArray();
}
```

### Q221. Why a `length` getter forwarding `this.body.size`?

**Non-technical:** `snake.length` is the obvious name. It is the deque’s count, not a recount of painted squares.

**Technical:** O(1) vs `getSegments().length` which is O(n) + alloc. Unused by Game today (score ≠ length; win-by-fill is missing, Q276). Food does not check `length === columns * rows`. The getter is the hook for a future win condition and for tests. `noUnusedLocals` does not apply to public members. Forwarding keeps Snake from leaking `body`.

```ts
get length(): number {
  return this.body.size;
}
```

## `setDirection`

### Q222. Why ignore a request where `OPPOSITE[this.direction] === next`?

**Non-technical:** You cannot instantly turn from right to left. That would make the head step into the neck and die. Those keypresses are thrown away.

**Technical:** Classic 180° guard. `setDirection` compares against **already applied** `this.direction`, not against a queued key (Q224). No-op `return` leaves heading unchanged. Does not distinguish length (Q226). Combined with Game’s one-slot queue, this also drops **legal** two-step 180s that classic Snake would allow across two ticks (Q225, Q324). The ignore is correct for a **single** reverse relative to current heading; it is not a full input-buffer design.

```ts
setDirection(next: Direction): void {
  if (OPPOSITE[this.direction] === next) return;
  this.direction = next;
}
```

### Q223. What classic Snake bug does that prevent?

**Non-technical:** The “I pressed the opposite arrow and instantly crashed into myself” bug. Players think they turned around; the head moved backward into the second square.

**Technical:** Length ≥ 2: reverse would set `nextHead` to the neck cell. That cell is in `occupied` and is **not** the tail, so `wouldCollideWithSelf` is true → game over. Some naive ports apply the key immediately on `keydown` (not queued) **and** allow 180, so a tap kills you even before the next paint. This function prevents applying that heading. It does **not** prevent death if you reverse by two 90° turns on **two** ticks (legal) or if you fold into a later segment. Length 1 would not die on reverse (no neck); still ignored (Q226).

```ts
if (OPPOSITE[this.direction] === next) return;
```

### Q224. Why compare against `this.direction` (already applied) and **not** against `queuedDirection` in Game?

**Non-technical:** Snake only knows the way it is facing now. It does not know about the one extra key Game is holding for the next slither. So it can only refuse “straight backward from here.”

**Technical:** Layering: Snake has no `queuedDirection` field. Game applies the queue at the **start** of `tick`: `if (this.queuedDirection) { this.snake.setDirection(...); this.queuedDirection = null; }`. Keys during the 110ms window overwrite one slot; Snake never sees the discarded ones. If Snake compared against a passed-in “pending” heading, you could allow Right → queue Up → second key Left to mean “Left is opposite of Right but not of Up.” That is a length-2 queue (Q325), and the 180 check should run against the **last accepted heading in the buffer**, not only `this.direction`. Live design: 180 check is local and naive; buffering is Game’s job and is only one slot, so they do not compose into classic Snake feel.

```ts
private queuedDirection: Direction | null = null;

// tick:
if (this.queuedDirection) {
  this.snake.setDirection(this.queuedDirection);
  this.queuedDirection = null;
}

// keydown:
this.queuedDirection = direction;
```

### Q225. If the snake is going Right and the player hits Up then Left in the **same** tick, what happens? (Game keeps one queued key; Left is opposite of Right — ignored.)

**Non-technical:** You meant “turn up, then turn left” — a U-turn in two steps, which most Snake games allow if both keys happen before the next slither. This game keeps only the **last** key. That last key is Left, which is the illegal reverse of Right, so it throws the turn away and you keep going right. Up is lost.

**Technical:** This is the highest-signal input bug.

1. `direction === Right`.
2. `keydown` Up → `queuedDirection = Up`.
3. `keydown` Left → `queuedDirection = Left` (slot overwrite, not a queue).
4. `tick` → `setDirection(Left)` → `OPPOSITE[Right] === Left` → **return**.
5. Snake still faces Right. Self-collision guard “worked,” player intent did not.

If the order is Left then Up: queue ends as Up; `setDirection(Up)` succeeds; Left is lost but you at least turn. Classic fix: queue of length 2, each 90° validated against the previous **queued** heading so Right+Up+Left becomes Right→Up then Up→Left on the next two ticks (or same buffer drained one per tick). Live comments in `handleKeydown` claim the slot prevents same-tick 180; they do not mention that two 90s collapse **into** a 180 that `setDirection` ignores. Reviewer Q324 / Q433.

```ts
// Queue the direction rather than applying it immediately: two key
// presses in the same tick window can't cause a same-tick 180 reversal.
this.queuedDirection = direction;
```

### Q226. Why not allow 180 when length === 1?

**Non-technical:** A single square has no neck to run into. Reversing would be safe. The code still forbids it. You never see a length-1 snake here anyway: spawn is length 3 and it only grows.

**Technical:** `setDirection` has no `this.body.size` check. Allowing reverse at length 1 is a common polish. Live max/min length: min 3 (reset), min never decreases. The branch is dead in production play. Still worth writing if you later add shrink or a “tiny snake” mode. Cost of allowing it: one `if`. Cost of not: none for this config. Interview: “I’d allow it for correctness of the rule; I didn’t because length ≥ 3 always.”

```ts
setDirection(next: Direction): void {
  if (OPPOSITE[this.direction] === next) return;
  this.direction = next;
}
```

## Growth, peek, collision

### Q227. Why `grow(amount = 1)` adds to `pendingGrowth` instead of immediately inserting a dummy segment?

**Non-technical:** Eating should make you longer on the **coming** slithers, not teleport a fake square onto the tail right now. A dummy cell would sit on a square you do not really occupy yet, or stack on the tail.

**Technical:** Immediate insert needs a cell: usually a copy of the tail (two deque nodes, one `cellKey`). Occupancy would already contain that key — Set no-op, deque length +1, **desync** (`size` 4, `occupied.size` 3) until you special-case Set. A dummy off-board cell would break render/bounds. Queueing “skip next N `popBack`s” grows into the cell you **leave**, which is the authentic Snake rule: after eating, the tail stays put for N moves. `grow` before `advance` on the eat tick (Q340) means **this** move already skips the pop, so you grow as you step onto food.

```ts
grow(amount = 1): void {
  this.pendingGrowth += amount;
}
```

### Q228. Why `peekNextHead()` exists instead of Game computing `head + direction`?

**Non-technical:** Game asks the snake “if you slither now, where does your nose land?” Game should not reimplement Up/Down/Left/Right math.

**Technical:** `peekNextHead` is a public wrapper over private `nextHeadPosition`. Game uses it for wall checks and food equality **before** `advance`. If Game added direction vectors, it would duplicate the switch and could drift. Encapsulation: direction lives on Snake. Extra call: `wouldCollideWithSelf` computes `nextHeadPosition()` **again** (Q338) — two allocations per tick of the same cell. Could pass `nextHead` in; live code does not. Peek vs advance: peek is pure (aside from `getHead` throw); advance mutates.

```ts
peekNextHead(): Position {
  return this.nextHeadPosition();
}

const nextHead = this.snake.peekNextHead();
if (!this.board.isWithinBounds(nextHead) || this.snake.wouldCollideWithSelf()) {
```

### Q229. Why `wouldCollideWithSelf` uses the Set, not a scan of `getSegments()`?

**Non-technical:** Checking “is that square already on the snake?” should be a dictionary lookup, not walking every body square. That is the Set’s whole job.

**Technical:** `occupied.has(nextKey)` is O(1) average vs O(n) scan. At n ≤ 576 the scan is still cheap (and would avoid the add/delete bug by reading the deque). The demo’s thesis needs the Set path. Scan of `getSegments()` would allocate (Q196) unless you iterate the deque privately. Tail exception still needed with a scan: the tail segment is in the list, so a naive `segments.some(positionsEqual)` would false-positive on tail-chasing (Q230). Set or scan, the exception stays.

```ts
wouldCollideWithSelf(): boolean {
  const nextKey = cellKey(this.nextHeadPosition());
  if (!this.occupied.has(nextKey)) return false;
  // ...
}
```

### Q230. Walk the tail exception: if `pendingGrowth === 0` and `nextKey` equals the current tail, why is that **legal**?

**Non-technical:** The tail is about to lift off that square in the same slither that the head enters it. Like two people swapping through a doorway at once — at the end of the step, only the head is there. Standard Snake allows chasing your tail.

**Technical:** Highest-signal collision question. Occupancy still lists the tail **before** `advance`. Without the exception, `occupied.has(tailCell)` is true → death while doing a legal move. Conditions:

- `pendingGrowth === 0` → this tick **will** `popBack`, vacating the tail.
- `cellKey(tail) === nextKey` → the landing cell **is** that vacating cell.
- Minimum geometry: head adjacent to tail, which for an orthogonal connected snake means a loop of length ≥ 4 (length 2 is a 180 into the neck, already ignored; length 3 head–tail Manhattan distance is 2).

If those hold, return `false` (no collision). Then `advance` runs. **See Q238**: Set add-then-delete can drop that key even though the new head lives there. The exception is the correct **rule**; the Set update order is a follow-on footgun. `if (tail && …)` guards empty deque.

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

### Q231. What happens if you remove the tail exception — can the snake die by walking onto its own tail?

**Non-technical:** Yes. Looping after your tail, which every Snake player does in tight spaces, would count as hitting yourself and end the run. It feels like a bug because the tail is leaving.

**Technical:** `occupied.has(nextKey)` true → fall through to `return true` → `gameOver()`. Repro: grow to length ≥ 4, coil until head’s next cell is the tail, no food this tick. This is the easiest off-by-one in the project (Q427). Tests: body a 2×2 cycle, `pendingGrowth === 0`, assert `wouldCollideWithSelf() === false`; with `grow(1)` first, assert `true` (Q232).

```ts
if (!this.occupied.has(nextKey)) return false;
return true; // naive: tail chase is death
```

### Q232. What happens if you are growing (`pendingGrowth > 0`) and the next cell **is** the tail — should that die?

**Non-technical:** If you just ate, the tail **stays**. The square is still snake. Walking onto it is a real crash. The code treats that as death. Correct.

**Technical:** `pendingGrowth === 0` is false, so the exception is skipped; `return true`. Next `advance` will decrement growth and **not** pop. Head and tail would occupy the same cell as two deque nodes; Set would have one key. Playable only if you eat on the exact tick you’d step onto the tail — rare but defined. Some games allow it (tail stays but they still treat the step as vacate-then-grow visually); this engine is strict: growing means tail is solid.

```ts
if (this.pendingGrowth === 0) {
  const tail = this.body.last;
  if (tail && cellKey(tail) === nextKey) return false;
}
return true;
```

### Q233. Why is wall collision **not** in this method (it lives in `Board.isWithinBounds`)?

**Non-technical:** Snake does not know how wide the yard is. The board owns the fence. Hitting a wall is “that square is not on the board,” not “that square is my body.”

**Technical:** README OOP table: Snake knows nothing about the board. `nextHead` can be `x === -1` or `x === columns`. `wouldCollideWithSelf` would need dimensions or a callback. Game composes: `!board.isWithinBounds(nextHead) || snake.wouldCollideWithSelf()`. Short-circuit skips the Set lookup on walls (Q204). Wrap-around (Q244) would replace the wall check, still not belong inside self-collision. `occupiesCell` similarly does not clamp.

```ts
isWithinBounds(pos: Position): boolean {
  return pos.x >= 0 && pos.x < this.columns && pos.y >= 0 && pos.y < this.rows;
}
```

### Q234. Why `occupiesCell` for Food rather than letting Food scan the body?

**Non-technical:** Food asks the snake “is this square taken?” It should not walk the necklace or know about `"x,y"` strings.

**Technical:** `Food.respawn` rejection-samples random `{x,y}` until `!snake.occupiesCell(candidate)`. Scan would be O(n) per try, and expected tries grow as the board fills (Q274). Encapsulation: key format stays in Snake. Food still imports Snake (and Board) — a remaining OOP leak vs a `isOccupied(pos)` interface, but better than Food importing Deque. Game passing the Set would leak `Set<string>` and `cellKey` to Food (Q279).

```ts
occupiesCell(pos: Position): boolean {
  return this.occupied.has(cellKey(pos));
}
```

### Q235. Complexity: `occupiesCell` and `wouldCollideWithSelf` are O(1) average. What is the worst case of a JS `Set` of strings?

**Non-technical:** Usually a set lookup is one hop. In a bad case, many names hash to the same bucket and the engine walks a little chain. With a few hundred cells it will not matter.

**Technical:** Spec: `Set.prototype.has` is average O(1), worst O(n) if every key collides in the hash table. V8 uses a hash table (and may switch representation); string hashes are good; keys `"x,y"` for small ints are well distributed. Adversarial keys are not a concern for `Math.random` food and player input. Compare: deque scan worst O(n) always. Interview: “Average O(1), pathological O(n); n ≤ 576; I don’t treat HashDoS as a game threat.” `boolean[][]` worst case is true O(1).

```ts
return this.occupied.has(cellKey(pos));
```

## `advance`

### Q236. Why push the new head **before** popping the tail?

**Non-technical:** Grow the nose first, then maybe lift the tail. If you lift the tail first on a very short snake you could have a moment with no squares at all.

**Technical:** Order matches the mental model and the growth branch: if `pendingGrowth > 0`, skip pop — length increases by one, which **requires** the push to have happened. Pop-first on a growth move would shrink then you’d still need to push (net same) but `getHead` mid-function would be wrong if anyone peeked. Pop-first on length 1: empty deque in the middle; `count` 0; you must not call `getHead`. Push-first: length is always ≥ 1 after spawn. Occupancy order is a **separate** choice (Q237–Q238). Linked-list: `pushFront` does not care that the tail node still exists.

```ts
advance(): Position {
  const newHead = this.nextHeadPosition();

  this.body.pushFront(newHead);
  this.occupied.add(cellKey(newHead));

  if (this.pendingGrowth > 0) {
    this.pendingGrowth--;
  } else {
    const removedTail = this.body.popBack();
    if (removedTail) this.occupied.delete(cellKey(removedTail));
  }

  return newHead;
}
```

### Q237. Why `occupied.add` the new head before `occupied.delete` of the tail?

**Non-technical:** They tried to update the checklist in the same order as the necklace: mark the new nose, then unmark the old tail if it moved.

**Technical:** Intended story: lockstep with deque (push then pop). For **distinct** cells this is correct: Set gains head, loses tail. For **the same** cell (legal tail chase, Q230) SameValueZero `add` is a no-op (key already present), then `delete` **removes** the key while the new head still sits there (Q238). Correct Set order for that case is delete tail **only if** `cellKey(removed) !== cellKey(newHead)`, or pop/delete first then add. Live order is the textbook bug that unit tests on a 4-cycle would catch. Interview: name the intended lockstep, then **volunteer** the overlap hole — that is senior-level.

```ts
this.occupied.add(cellKey(newHead));
// ...
if (removedTail) this.occupied.delete(cellKey(removedTail));
```

### Q238. What happens if the new head cell equals the old tail cell in the same move — add then delete — does the Set still contain the cell?

**Non-technical:** No. The checklist adds “I’m on 3,4” (already there) then deletes “the tail left 3,4,” and forgets the head is still on 3,4. The necklace is right; the checklist is wrong.

**Technical:** Highest-signal occupancy bug.

1. `wouldCollideWithSelf` allows the move (`pendingGrowth === 0`, key is tail).
2. `pushFront(newHead)` — two nodes share `{x,y}` of the old tail (new object at head, old object at tail until pop).
3. `occupied.add(sameKey)` — no size change.
4. `popBack` — removes the old tail node; deque is consistent (head remains on that cell).
5. `occupied.delete(sameKey)` — **key gone**.

Aftermath: `occupiesCell(head)` is **false**. Food can spawn on the head. Later self-collision against that segment misses (`has` false) → you can phase through that one cell until something `add`s it again. The deque/`getSegments` still draw the segment. This is denormalization without an equality guard. Fix:

```ts
const newKey = cellKey(newHead);
this.body.pushFront(newHead);
this.occupied.add(newKey);
if (this.pendingGrowth > 0) {
  this.pendingGrowth--;
} else {
  const removedTail = this.body.popBack();
  if (removedTail && cellKey(removedTail) !== newKey) {
    this.occupied.delete(cellKey(removedTail));
  }
}
```

Do not claim the live Set is always in sync. Q200/Q427 exist because this was untested.

```ts
this.occupied.add(cellKey(newHead));
const removedTail = this.body.popBack();
if (removedTail) this.occupied.delete(cellKey(removedTail));
// if keys equal, delete wins → occupancy hole
```

### Q239. Why decrement `pendingGrowth` on a growth move instead of popping nothing without a counter?

**Non-technical:** Each slither after a meal “digests” one skipped tail-lift. The number counts down. No counter would mean you need some other way to remember how many meals are waiting.

**Technical:** The `if (pendingGrowth > 0) pendingGrowth--; else popBack()` **is** “pop nothing, with a counter.” Alternatives: boolean (Q211); a queue of growth events; inserting tail clones (Q227). Decrement on the growth path is how N meals become N skipped pops. Forgetting to decrement: infinite growth, snake never pops, fills the board, Food’s `do/while` livelocks (Q275). Decrementing **and** popping would cancel the eat. Game must `grow` before `advance` on the eat tick or the eat move would pop (Q341).

```ts
if (this.pendingGrowth > 0) {
  this.pendingGrowth--;
} else {
  const removedTail = this.body.popBack();
  if (removedTail) this.occupied.delete(cellKey(removedTail));
}
```

### Q240. What happens if `popBack` returned `undefined` while `pendingGrowth === 0` — could the Set leak keys?

**Non-technical:** That means the necklace was empty when you tried to lift a tail. You would have added a head key (if push ran) and then not deleted anything — leftover checklist marks — or, if the snake was empty, you added then… still messy.

**Technical:** After `pushFront`, the deque has at least one node, so `popBack` returns that node if it was the only one — **not** `undefined`. `undefined` requires empty deque at pop time, i.e. `pushFront` was skipped or you popped twice. Live `advance` cannot hit it unless `Deque` is broken. The `if (removedTail)` is defensive: if it **did** happen after a successful `add`, the new head key stays (correct) and no tail key is deleted (none to delete). Leak of a **tail** key cannot happen on undefined pop — there was no tail. Leak of a **stale** key would be from a previous desync. Empty snake: `nextHeadPosition` already threw in `getHead` before push. The guard is for Deque’s optional pop, not a known live path.

```ts
const removedTail = this.body.popBack();
if (removedTail) this.occupied.delete(cellKey(removedTail));
```

### Q241. Why return `newHead` from `advance` if Game ignores the return value?

**Non-technical:** The function still hands back where the nose went, for tests or a future caller. Game already asked `peekNextHead` before moving, so it does not use the return.

**Technical:** `tick` uses `peekNextHead` for walls, self, and food, then `advance()` as a statement. Return is API completeness (mirrors `push`+result). Tests could `assert.deepEqual(snake.advance(), {x,y})` without exposing `body.first`. Harmless extra. Alternative: `void` return would match Game. Keeping the return is nicer for a test suite you do not have.

```ts
this.snake.advance(); // return ignored
return newHead;       // still returned
```

### Q242. Why is `nextHeadPosition` a private switch rather than a `DIR_VECTOR` map?

**Non-technical:** Four cases: up minus y, down plus y, left minus x, right plus x. A switch reads like those four sentences. A map of `{x,y}` steps is the data-driven twin.

**Technical:** Switch + `noImplicitReturns` + `noFallthroughCasesInSwitch` is exhaustiveness for a string enum (Q243). A map:

```ts
const DIR_VECTOR: Record<Direction, Position> = {
  [Direction.Up]: { x: 0, y: -1 },
  /* ... */
};
return { x: head.x + DIR_VECTOR[this.direction].x, y: head.y + DIR_VECTOR[this.direction].y };
```

is prettier if many directions exist and is one source with `OPPOSITE`. Today you must update **both** `OPPOSITE` and the switch. Map vectors must not be mutated (shared objects). Switch allocates a new `Position` per call either way. Style choice; neither is wrong. Private so Game cannot skip `peekNextHead`.

```ts
private nextHeadPosition(): Position {
  const head = this.getHead();
  switch (this.direction) {
    case Direction.Up:
      return { x: head.x, y: head.y - 1 };
    case Direction.Down:
      return { x: head.x, y: head.y + 1 };
    case Direction.Left:
      return { x: head.x - 1, y: head.y };
    case Direction.Right:
      return { x: head.x + 1, y: head.y };
  }
}
```

### Q243. What happens if `switch (this.direction)` lost a case — `noFallthroughCasesInSwitch` / implicit `undefined` return?

**Non-technical:** If you added a direction and forgot the math, TypeScript should refuse to compile rather than move the head to “nowhere.”

**Technical:** `noFallthroughCasesInSwitch` catches missing `break` in case A falling into B — these cases all `return`, so fallthrough is already impossible. The actual safety net is **`noImplicitReturns`** (and `strict`): if `Direction.Right` is omitted, not every path returns `Position`; `tsc` errors. String enums are not as exhaustively narrowed as unions; without `noImplicitReturns` the function could return `undefined` at runtime (`head` would become `undefined.x` later or paint NaN). `noFallthroughCasesInSwitch` still matters if someone writes `case Up: case Down: return …` incorrectly. Live `tsconfig` has both flags. A `default: const _exhaustive: never = this.direction` is the belt-and-suspenders pattern for unions; unused here because the four returns satisfy the checker.

```json
"noImplicitReturns": true,
"noFallthroughCasesInSwitch": true
```

### Q244. Why no wrap-around walls (pac-man edges) as an option?

**Non-technical:** Hitting the edge kills you, like many classic Snake ports. Going through the left side and coming out the right would be a different mode, and Snake would need to know the board size or Game would wrap the coordinate before asking about collisions.

**Technical:** Wrap is `x = (x + columns) % columns` (careful with negatives: `((x % c) + c) % c`). That math needs `columns`/`rows`, which Snake refuses to own (Q233). Natural place: Game after `peekNextHead`, or `Board.wrap(pos)`. Self-collision and occupancy stay the same. Food and render already modulo-unaware. Demo thesis is Deque + Set + OOP split, not variants; README does not mention wrap. Adding it without changing the story: a `GameConfig.wrap: boolean` and wrap in Game before bounds/self checks; if wrap, skip `isWithinBounds` death. Walls-only keeps `isWithinBounds` meaningful. Honest: “Not in scope; I’d wrap in Game, not in Snake.”

```ts
if (!this.board.isWithinBounds(nextHead) || this.snake.wouldCollideWithSelf()) {
  this.gameOver();
  return;
}
```

---

End of Q152–Q244 (93 questions). Parts 3–5 only. For Board / Food / Game / main see later answer files; for HTML/CSS see those files. The occupancy add-then-delete hole (Q238), the one-slot 180 collapse (Q225), HUD `"Game Over"` (Q160–Q161), V8 vs Big-O at n ≤ 576 (Q175), and the missing Deque/tail-exception tests (Q200) are the answers to volunteer before the reviewer asks.
