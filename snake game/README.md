# Snake (vanilla TypeScript)

A dependency-free Snake game built specifically to demonstrate two things
clearly in the code: the right data structures for the job, and clean OOP
separation of concerns. No framework, no build tool beyond `tsc`, no
database.

## Run it

Because `index.html` loads the compiled output as an ES module
(`<script type="module">`), browsers will block it over a bare `file://`
URL (CORS). Serve the folder locally instead, e.g.:

```bash
# Python (already installed on most systems)
python3 -m http.server 8000

# or, if you have Node
npx serve .
```

Then open `http://localhost:8000`. The compiled JavaScript is already
included in `dist/`, so this works immediately without a build step.

## Rebuild after editing the TypeScript

```bash
npm install     # only needed once, installs TypeScript locally
npm run build   # compiles src/*.ts -> dist/*.js
# or: npm run watch
```

`tsc` runs in `strict` mode with `noUnusedLocals` / `noUnusedParameters` /
`noImplicitReturns` on, so the compiler will catch most mistakes.

## Controls

Arrow keys or WASD to steer, Space to pause/resume, Restart button (or any
direction key after game over) to start a new run.

## Where the DSA lives

**`Deque<T>` (`src/Deque.ts`)** — a generic double-ended queue backed by a
doubly linked list, with O(1) `pushFront` / `pushBack` / `popFront` /
`popBack`. A plain JS array is *not* used for the body: `Array.unshift` is
O(n) because every element has to be reindexed, which would make each
snake move cost O(n) for no reason.

**`Snake` (`src/Snake.ts`)** — the body is literally a `Deque<Position>`.
Every move is:

```ts
body.pushFront(newHead);
if (!growing) body.popBack();
```

Alongside the deque, `Snake` keeps a `Set<string>` (`occupied`) mirroring
exactly which cells the body covers, keyed as `"x,y"`. That turns
self-collision detection into a single `Set.has()` lookup — O(1) — instead
of scanning every body segment, which matters once the snake gets long.
`Food` placement reuses the same set to find a free cell.

## Where the OOP lives

| Class | Owns | Knows nothing about |
|---|---|---|
| `Deque<T>` | The linked-list node chain | Positions, game rules |
| `Snake` | Body deque, occupied-cell set, direction, growth | The board, canvas, rendering |
| `Food` | Its own position | The DOM, scoring |
| `Board` | Grid geometry, canvas context, drawing primitives | Game rules, the snake |
| `Game` | The tick loop, input handling, score, game state | Grid math, deque internals |

`Game` is the only class that talks to all the others. It reads input,
asks `Snake` where the head would go next, asks `Board` whether that's in
bounds, asks `Snake` whether it would self-collide, then tells `Snake` to
advance and `Board` to redraw. None of that logic leaks into `Board`,
`Snake`, or `Food` — each stays testable and reusable on its own.

## File structure

```
index.html          entry page, wires up DOM ids Game expects
style.css            vanilla CSS, no framework
src/
  types.ts           Position, Direction, GameStatus
  Deque.ts            generic linked-list deque
  Snake.ts            body deque + occupied-cell set, movement/collision
  Board.ts            grid geometry + canvas drawing
  Food.ts             food position + placement
  Game.ts              loop, input, scoring, orchestration
  main.ts               boots Game from the DOM
dist/                compiled output (already built, committed for convenience)
tsconfig.json
package.json
```
