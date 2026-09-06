# Deep-dive answers — Tooling, dist, and demo gaps (Q373–Q442)

Parts 10–12.

Pair with [Deep-Dive-Questions.md](./Deep-Dive-Questions.md) Parts 10–12. Each answer has **Non-technical**, **Technical**, and a **Snippet** from this repo as it exists today.

This is a **vanilla `tsc` demo**: `"type": "module"`, scripts only `build` / `watch`, TypeScript `^5.4.0` as the sole devDependency, `private: true`. There is **no Vite**, **no test runner**, **no `netlify.toml`**, **no `.gitignore` in this folder**. The browser loads committed `dist/*.js` as native ES modules (seven HTTP requests). `file://` fails CORS; serve with `python3 -m http.server 8000`.

The interview story is: **I use React daily; this repo proves I can still ship Deque + Set, OOP, and a canvas loop without a framework.** No unit tests is a real gap — say that out loud.

What you would add next without changing Deque + Set / OOP / no framework is **Q442**.

---

# Part 10 — `package.json` and `tsconfig.json`

## `package.json`

### Q373. Why `"name": "snake-ts"` and `"private": true`?

**Non-technical.** The folder has a name so `npm` knows what this project is called. `private` means “do not publish this to the public npm registry by accident.”

**Technical.** `name` is the package identifier npm uses for workspaces, `npm pack`, and error messages. `snake-ts` is descriptive (language + game) and URL-safe. It does **not** have to match the folder name (`snake game`).

`"private": true` sets `private` in the package manifest. `npm publish` refuses to publish private packages. This is not a library: there is no `"main"`, no `"exports"`, no `"files"` allowlist. Marking it private is the honest contract. Without it, a stray `npm publish` from this directory would try to take the name `snake-ts` on the registry.

**Snippet** (`package.json`):

```json
{
  "name": "snake-ts",
  "version": "1.0.0",
  "description": "Vanilla TypeScript Snake game built to demonstrate Deque + Set based DSA and simple OOP design.",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

---

### Q374. Why `"type": "module"` — Node, `tsc`, or the browser?

**Non-technical.** It tells Node that `.js` files in this package are modern `import`/`export` files, not old `require()` files.

**Technical.** `"type": "module"` is a **Node** package flag. It makes `.js` files ESM when you run them with `node dist/main.js`. It does **not** change what `tsc` emits — emit is `"module": "ES2020"` in `tsconfig.json`. It does **not** change what the browser does — the browser only cares about `<script type="module" src="dist/main.js">`.

If you deleted `"type": "module"` and ran the compiled files under Node, Node would treat them as CommonJS and throw on `import { Game } from "./Game.js"`. The page would still work in the browser.

This project never runs under Node in production. The field is still correct: the compiled graph is ESM, and anyone who `node`-probes `dist/` gets a matching module system.

**Snippet** (`package.json` + `index.html`):

```json
"type": "module"
```

```html
<script type="module" src="dist/main.js"></script>
```

---

### Q375. Why scripts are only `"build": "tsc"` and `"watch": "tsc --watch"` — no `dev` / `start` / `serve`?

**Non-technical.** The only npm jobs are “compile once” and “compile whenever I save.” Playing the game is a separate step: a tiny local web server, documented in the README, not an npm script.

**Technical.** `build` is `tsc` with this folder’s `tsconfig.json` (`src/` → `dist/`). `watch` is the same compiler in watch mode. There is no Vite `dev` server, no `http-server` dependency, no `"start"`. That is deliberate: **zero runtime dependencies**, and the demo must stay openable without a Node toolchain (see Q413).

The cost: a reviewer who types `npm start` gets `Missing script: "start"`. The README tells them to use Python. An honest improvement that still avoids a bundler: `"start": "python3 -m http.server 8000"` (or `"npx --yes serve ."`). That is convenience, not architecture.

**Snippet** (`package.json`):

```json
"scripts": {
  "build": "tsc",
  "watch": "tsc --watch"
}
```

---

### Q376. How does a reviewer actually open the game (README’s `python3 -m http.server`)?

**Non-technical.** Do not double-click `index.html`. Start a local server in this folder, then open `http://localhost:8000` in a browser.

**Technical.** ES modules from a `file://` page are treated as opaque origins and the browser blocks the import graph (Q403–Q404). Python’s stdlib server is already on macOS/Linux:

```bash
python3 -m http.server 8000
```

That serves the current directory on port 8000 with `Content-Type` derived from file extensions (`.js` → `text/javascript` / `application/javascript`). Because `dist/` is committed, **no `npm install` and no `tsc` are required to play**. Rebuild only if you edited `src/`.

Alternatives in the same README: `npx serve .`. VS Code Live Server also works. All three exist to give the page an `http://` origin.

**Snippet** (`README.md`):

```markdown
Because `index.html` loads the compiled output as an ES module
(`<script type="module">`), browsers will block it over a bare `file://`
URL (CORS). Serve the folder locally instead, e.g.:

python3 -m http.server 8000
```

---

### Q377. Why TypeScript is a `devDependency` `^5.4.0` and there are **zero** runtime dependencies?

**Non-technical.** TypeScript is a compiler you use on your machine. The player’s browser only runs JavaScript. The game itself needs no npm libraries at runtime — no React, no lodash, no canvas helper.

**Technical.** `devDependencies` are install-time tools. `typescript` provides `tsc`. The caret `^5.4.0` allows `>=5.4.0 <6.0.0`. There is **no `package-lock.json`** in this folder, so `npm install` can float within that range. There are no `dependencies`. The running app is `dist/*.js` + `index.html` + `style.css`.

That is the demo’s claim: Deque + Set and five classes are enough. A runtime dep would contradict “no framework, no build tool beyond `tsc`.”

**Snippet** (`package.json`):

```json
"devDependencies": {
  "typescript": "^5.4.0"
}
```

---

### Q378. Why no test script, no `vitest` / `node:test`?

**Non-technical.** Nobody wrote automated tests. A reviewer who breaks the snake’s tail-collision rule would only find out by playing.

**Technical.** There is no `"test"` script, no `vitest.config.*`, no `*.test.ts`, no `node:test` import. `Deque` and `Snake.wouldCollideWithSelf` are the two pieces that most deserve tests (Q427–Q428). Shipping without them is a **real gap**, not a philosophy. The honest interview line: “I kept the repo to `tsc` plus the game so the DSA is readable in one sitting. If I spent another hour, tests would be first — not Vite.”

Adding `node:test` would need Node to import ESM from `dist/` or `tsx` to load `src/`. Vitest would pull Vite. Either is compatible with “no framework in the browser” if tests stay off the page. They are still missing today.

**Snippet.** `package.json` scripts are only `build` and `watch`. The folder listing has no `*.test.ts` / `*.spec.ts`.

---

### Q379. Why no `lint` / `prettier`?

**Non-technical.** Formatting and extra style rules are not wired up. The compiler’s strict flags are doing the “did you leave a mess?” job.

**Technical.** No ESLint, no Prettier, no `"lint"` script. `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, and `forceConsistentCasingInFileNames` catch unused bindings, missing returns, switch fallthrough, and case-fold import bugs. They do **not** catch formatting, `any` in JSDoc, or accessibility.

For a <400-line `src/` demo that is the trade: one toolchain (`tsc`) instead of three. A reviewer who lives in ESLint-flat-config React repos should hear: “I would add ESLint if this grew past a teaching page; I would not add it to hide the types.”

**Snippet** (`tsconfig.json` — the stand-in for lint):

```json
"strict": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"noImplicitReturns": true,
"noFallthroughCasesInSwitch": true
```

---

### Q380. Why no `engines` field?

**Non-technical.** You do not need a specific Node version to **play** the game. You only need Node if you want to recompile.

**Technical.** `"engines"` tells npm “this package expects Node ≥ x.” This package’s runtime is the browser. `tsc` 5.4 runs on current LTS Node; there is no Node API usage in `src/`. An `engines` field would over-claim that this is a Node app.

The gap: a teammate on Node 14 might fail to run TypeScript 5.4. There is also no lockfile. For a private demo, documenting “Node 18+ to rebuild” in the README would be enough; it is not there either.

**Snippet.** `package.json` has `name`, `private`, `type`, `scripts`, `devDependencies` — no `"engines"`.

---

## `tsconfig.json`

### Q381. Why `"target": "ES2020"` and `"module": "ES2020"`?

**Non-technical.** Compile to JavaScript that a 2020-era browser already understands. Use `import`/`export`, not bundled-or-transpiled-down-to-`require`.

**Technical.** `target` is the language level of **emit** (`const`, classes, optional chaining if you used it, `Promise`, `BigInt`, etc.). `module` is the **module syntax** of emit (`import`/`export`). Both `ES2020` means: native ESM, no downlevel to ES5 classes or `__awaiter` helpers.

The browser graph is `<script type="module">` plus relative `./Game.js` specifiers. ES2020 modules match that. `lib` is also `ES2020` + `DOM` (Q385), so types and emit stay aligned.

If `module` were `CommonJS`, `tsc` would emit `require()` and the browser would fail. If `target` were `ESNext` with the same module, you might emit syntax older Safari does not have, for no gain in this codebase (no private fields in emit beyond what 2020 already covers — class fields here are constructor assignments in the compiled JS).

**Snippet** (`tsconfig.json`):

```json
"target": "ES2020",
"module": "ES2020",
"moduleResolution": "Bundler",
"lib": ["ES2020", "DOM"]
```

---

### Q382. What happens if you targeted `ES5` — would class fields / generators / optional chaining survive?

**Non-technical.** The compiler would try to rewrite modern syntax into old JavaScript. The game would get larger and harder to read in `dist/`, and native `import` would no longer match.

**Technical.** `target: ES5` downlevels `class` to constructor functions + prototypes, `const`/`let` toward `var` where needed, and arrow functions toward `function`. **Optional chaining / nullish coalescing** would be rewritten to helper conditionals if present (this repo barely uses them). **Generators** (`Deque`’s `[Symbol.iterator]`) would emit a generator helper.

What would **not** magically appear: ES5 + `module: ES2020` is a mismatched pair browsers still would not load as classic scripts. You would also need a bundler or `module: AMD`/`UMD` for old browsers. Class **instance fields** in `src/` (`private queuedDirection = null`) already emit as constructor assignments in ES2020 `dist/Game.js` — they are not native public fields in the output.

There is no reason to target ES5 for a 2026 canvas demo. IE11 is not the audience.

**Snippet** (`dist/Game.js` constructor — already assignments, not ES5 classes):

```js
export class Game {
    constructor(config) {
        this.status = GameStatus.Idle;
        this.score = 0;
        this.lastTick = 0;
        this.rafHandle = 0;
        this.queuedDirection = null;
```

---

### Q383. Why `"moduleResolution": "Bundler"` when there is **no bundler**?

**Non-technical.** TypeScript has a setting named after bundlers (Vite, webpack). This project does not use those tools. The setting still type-checks `import "./Game.js"` the way modern tools do.

**Technical.** TypeScript 5.0 added `moduleResolution: "bundler"` for Vite / esbuild / webpack / Parcel: hybrid ESM+CJS lookup, `package.json` `"exports"` conditions, and **extensionless** imports allowed in type-checking. This repo has **no Vite, no esbuild, no webpack**. `tsc` emits files; the browser loads them.

That is slightly dishonest as a label. `Node16` / `NodeNext` would match “we really are native ESM” more closely. This project already writes **`.js` suffixes** on every relative import, which both Bundler and NodeNext accept, and which the browser **requires** (tsc does not rewrite `.ts` → `.js` in specifiers).

Why it still works: Bundler resolution does not block `.js` specifiers pointing at `.ts` source (TypeScript’s classic ESM mapping). Emit is still `module: ES2020`. The risk Bundler was designed to hide — extensionless imports that a bundler would rewrite — is avoided because this code never uses extensionless imports.

Interview line: “I copied a modern tsconfig. If I tightened it, I would switch to `NodeNext` and keep the `.js` specifiers, because there is no bundler.”

**Snippet** (`tsconfig.json` + `src/main.ts`):

```json
"moduleResolution": "Bundler"
```

```ts
import { Game } from "./Game.js";
```

---

### Q384. What does Bundler resolution change vs `"Node16"` / `"NodeNext"` for `./Game.js` imports?

**Non-technical.** For this repo’s `./Game.js` paths, almost nothing visible. The files still have to end in `.js` for the browser.

**Technical.**

| | Bundler | Node16 / NodeNext |
| --- | --- | --- |
| Relative `./Game.js` mapping to `Game.ts` | Allowed | Allowed (and required to use an extension) |
| Extensionless `./Game` | Allowed in typecheck | **Error** — Node ESM needs an extension |
| `package.json` `"exports"` | Bundler conditions (`import`, `default`, often `browser`) | Node’s ESM/CJS conditions; `module` must be `Node16`/`NodeNext` |
| Pairing with `"module": "ES2020"` | Legal | Illegal: `module` must be `Node16`/`NodeNext` |

This codebase would typecheck under NodeNext **if** `module` moved to `NodeNext` as well. The live combo is `module: ES2020` + `moduleResolution: Bundler`, which is the Vite-style pair used **without** Vite.

`./Game.js` in a `.ts` file is TypeScript’s ESM convention: you import the **emit** specifier. `tsc` does not create a `Game.js` import that points at TypeScript — it type-checks against `Game.ts` and emits `import … from "./Game.js"` unchanged.

**Snippet** (`src/Game.ts` graph):

```ts
import { Board } from "./Board.js";
import { Snake } from "./Snake.js";
import { Food } from "./Food.js";
import { Direction, GameStatus, Position } from "./types.js";
```

---

### Q385. Why `"lib": ["ES2020", "DOM"]`?

**Non-technical.** Teach the compiler two worlds: modern JavaScript built-ins, and browser things like `document` and `canvas`.

**Technical.** `lib` is type-only. `ES2020` types `Promise`, `Set`, `Map`, `BigInt`, etc. `DOM` types `HTMLCanvasElement`, `KeyboardEvent`, `requestAnimationFrame`, `document.getElementById`. Without `DOM`, `main.ts` would not know `document`. Without a matching ES lib, `Set<string>` and `performance.now()` typings can drift from `target`.

There is no `@types/node` and no `lib: ["DOM.Iterable"]` extra — not needed. There is no `"lib": ["ESNext"]`, which would advertise APIs this emit does not assume.

**Snippet** (`tsconfig.json`):

```json
"lib": ["ES2020", "DOM"]
```

---

### Q386. Why `"outDir": "dist"` and `"rootDir": "src"`?

**Non-technical.** TypeScript lives in `src/`. What the browser runs lives in `dist/`. Mixing them would dump `.js` next to `.ts` and make the folder unreadable.

**Technical.** `rootDir: "src"` means emit paths are relative to `src/` (`src/Game.ts` → `dist/Game.js`, not `dist/src/Game.js`). `outDir: "dist"` is the emit root. `include` is only `src/**/*.ts` (Q392). Source maps then point at `../src/main.ts` (Q390).

If you omitted `rootDir` and later imported a file outside `src/`, `tsc` would raise `rootDir` to the common ancestor and emit a surprising nested tree. Pinning both dirs is what lets README say “compiled output already in `dist/`.”

**Snippet** (`tsconfig.json`):

```json
"outDir": "dist",
"rootDir": "src"
```

---

### Q387. Why `"strict": true`?

**Non-technical.** Turn on TypeScript’s full “don’t guess” mode so `null` and sloppy types fail the build instead of failing in the browser.

**Technical.** `strict` is a bundle: `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitAny`, `noImplicitThis`, `alwaysStrict`, `useUnknownInCatchVariables` (TS 4+). That is why `snake!` / `food!` exist on `Game` — they are assigned in `reset()`, not in the constructor field list, and strict property initialization would otherwise error. `getElementById` returns `HTMLElement | null`; `main.ts` narrows with a throw.

`strict` does **not** include `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, or `noFallthroughCasesInSwitch`. Those are extra (Q388).

**Snippet** (`src/Game.ts` definite assignment + `src/main.ts` null check):

```ts
private snake!: Snake;
private food!: Food;
```

```ts
if (!canvas || !scoreEl || !statusEl || !overlayEl || !restartBtn) {
  throw new Error("Required DOM elements are missing from index.html");
}
```

---

### Q388. Why also `"noUnusedLocals"`, `"noUnusedParameters"`, `"noImplicitReturns"`, `"noFallthroughCasesInSwitch"`?

**Non-technical.** Besides strict types: no leftover variables, no ignored arguments, every code path returns, and `switch` cases cannot accidentally run into the next case.

**Technical.** These four are **not** inside `strict`.

- `noUnusedLocals` / `noUnusedParameters`: dead bindings fail `tsc`. (Prefix `_` if you must keep a signature.)
- `noImplicitReturns`: a function with a return type must return on every path. Together with the `Direction` enum, this makes `nextHeadPosition` exhaustive (Q389).
- `noFallthroughCasesInSwitch`: a non-empty `case` must `break` / `return` / `throw`. Empty stacked cases (`case 1: case 2:`) stay legal.

README mentions the first three; `noFallthroughCasesInSwitch` is in tsconfig and is the one that guards the direction `switch`.

**Snippet** (`tsconfig.json` + README):

```json
"noUnusedLocals": true,
"noUnusedParameters": true,
"noImplicitReturns": true,
"noFallthroughCasesInSwitch": true
```

```markdown
`tsc` runs in `strict` mode with `noUnusedLocals` / `noUnusedParameters` /
`noImplicitReturns` on, so the compiler will catch most mistakes.
```

---

### Q389. What would `noFallthroughCasesInSwitch` catch in `nextHeadPosition`?

**Non-technical.** If someone added a direction case, did some work, and forgot to `return`, TypeScript would refuse to compile instead of sending the snake the wrong way.

**Technical.** Live `nextHeadPosition` is already safe: every `case` **returns**. Fallthrough would look like:

```ts
case Direction.Up:
  // forgot return — would fall into Down
case Direction.Down:
  return { x: head.x, y: head.y + 1 };
```

That is TS7029 under `noFallthroughCasesInSwitch`.

A **missing** `case` after adding a fifth `Direction` is a different flag: `noImplicitReturns` (and exhaustiveness). There is no `default`. With four enum members and a `Position` return type, a new member makes “not all code paths return a value.”

So: fallthrough flag = accidental merge of two directions. Implicit-returns = incomplete enum. Both belong on this `switch`.

**Snippet** (`src/Snake.ts`):

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

---

### Q390. Why `"sourceMap": true` — for debugging in DevTools against `.ts` files?

**Non-technical.** Yes. Chrome can show you the TypeScript you wrote, even though it actually ran the JavaScript in `dist/`.

**Technical.** `sourceMap: true` emits `dist/*.js.map` beside each `.js`. Each JS file ends with `//# sourceMappingURL=….map`. DevTools maps columns back to `../src/*.ts` (`sourceRoot` is empty; `sources` is `["../src/main.ts"]` for `main.js.map`). You set breakpoints in `Game.ts`, not in the flattened constructor.

Without source maps, you debug emit: no types, comments kept but class fields reshaped. Maps are committed (Q398) so a reviewer who did not run `tsc` still gets them. They are **not** required to play (Q400).

**Snippet** (`dist/main.js` last line + map header):

```js
//# sourceMappingURL=main.js.map
```

```json
{"version":3,"file":"main.js","sourceRoot":"","sources":["../src/main.ts"]}
```

---

### Q391. Why `"forceConsistentCasingInFileNames": true` (macOS vs Linux CI)?

**Non-technical.** Your Mac does not care if a file is `Game.ts` or `game.ts`. Linux does. This flag makes the compiler care on every machine.

**Technical.** APFS/HFS+ default is case-**insensitive**. `import from "./game.js"` can resolve `Game.ts` locally. Git on Linux CI (and GitHub Actions `ubuntu-latest`) is case-**sensitive**: that import 404s at compile or at runtime. `forceConsistentCasingInFileNames` makes `tsc` error if the specifier’s case does not match the disk name.

This folder is `snake game` (space, mixed case) inside a larger course repo. The **imports** that matter are `Board.js`, `Game.js`, etc. The flag does not fix a badly named directory; it fixes `./snake.ts` vs `./Snake.ts`.

**Snippet** (`tsconfig.json`):

```json
"forceConsistentCasingInFileNames": true
```

---

### Q392. Why `"include": ["src/**/*.ts"]` only — dist not typechecked?

**Non-technical.** Only the TypeScript you edit is fed to the compiler. The generated JavaScript is output, not a second source of truth.

**Technical.** `include` is the program. `dist/**/*.js` is emit. Typechecking `dist/` would duplicate the graph, fight `rootDir`, and could pick up stale JS. Maps and comments in `dist/` are not types.

The failure mode: you edit `src/`, forget `npm run build`, and demo **stale** `dist/` (Q414). `tsc` will not warn that `dist/Game.js` disagrees with `src/Game.ts`. That is why committing `dist/` is convenient and dangerous.

**Snippet** (`tsconfig.json`):

```json
"include": ["src/**/*.ts"]
```

---

### Q393. Why no `declaration` / `declarationMap`?

**Non-technical.** This is not an npm library other people import. Nobody needs a `Game.d.ts`.

**Technical.** `"declaration": true` emits `.d.ts` next to `.js`. `"declarationMap"` adds `.d.ts.map` for Go to Definition from those types. Useful for published packages. This package is `"private": true` with no `"exports"`. Extra `.d.ts` in `dist/` would clutter the module folder a browser also serves.

If you extracted `Deque` to a shared util (Q424), that is when you would turn declarations on.

**Snippet.** `tsconfig.json` `compilerOptions` has `sourceMap` but not `declaration` or `declarationMap`.

---

### Q394. Why not Vite / esbuild / webpack for this demo?

**Non-technical.** A bundler would hide the files. The point of the demo is that you can open `dist/Game.js` and still see `import { Snake } from "./Snake.js"`.

**Technical.** Vite would: HMR, one hashed bundle (or code-split chunks), `import.meta.env`, a `dev` server that fixes `file://`. It would also add `index.html` transforms, a `node_modules/.vite` cache, and a story that looks like every React homework.

This repo’s README: “No framework, no build tool beyond `tsc`.” Seven tiny ESM files on localhost are free (Q415–Q416). Webpack would need a config longer than `Deque.ts`. esbuild could bundle in 10ms — and then the OOP file split would exist only in `src/`, not in what the Network panel shows.

Interview story: React/Vite is the day job. This page is the exception that proves you understand modules, `tsc`, and CORS without the framework absorbing them.

**Snippet** (`README.md`):

```markdown
No framework, no build tool beyond `tsc`, no
database.
```

There is no `vite.config.ts`, no `webpack.config.js`, no `esbuild` in `package.json`.

---

### Q395. Why commit compiled `dist/` instead of a `prepublish` / CI build?

**Non-technical.** A reviewer can clone (or unzip) the folder and play immediately. They should not have to know npm.

**Technical.** There is no publish, so `prepublishOnly` never runs. There is no GitHub Action in this folder. Committed `dist/` is the **static host artifact**: `index.html` points at it. That matches “works immediately without a build step” (Q413).

Costs: PRs can change `src/` without `dist/` (lie), or change `dist/` without `src/` (unreviewable emit). A CI job `npm ci && npx tsc --pretty false && git diff --exit-code dist/` would make the commit honest. That job does not exist. For a Udemy-course folder with no deploy pipeline, committing emit is the pragmatic choice.

**Snippet** (`README.md` file structure):

```
dist/                compiled output (already built, committed for convenience)
```

---

### Q396. Why is there no `.gitignore` in this folder (or does the parent repo ignore something else)?

**Non-technical.** This game folder does not list files Git should skip. If you run `npm install`, `node_modules/` is not automatically ignored here.

**Technical.** Confirmed: **no `.gitignore` under `snake game/`**. The parent course repo has `.gitignore` files inside other project folders (React/Vite apps, backends) but **no repo-root `.gitignore`** that would cover this directory. So:

- `dist/` is tracked on purpose (Q395).
- `node_modules/` after `npm install` would show up as untracked (or worse, get committed if someone `git add .`’s).
- `.DS_Store` is similarly unignored.

This is a real hygiene gap, not a feature. A five-line `.gitignore` (`node_modules/`, `.DS_Store`) would not change the Deque story. Do not ignore `dist/` unless you also add a serve-from-CI story.

**Snippet.** This folder’s tracked layout has `package.json`, `tsconfig.json`, `src/`, `dist/`, `index.html`, `style.css`, `README.md` — and no `.gitignore`.

---

# Part 11 — `dist/`, README, modules, hosting

### Q397. Why does `index.html` load `dist/main.js` rather than compiling in the browser (sucrase, esm.sh, TypeScript `transpileOnly`)?

**Non-technical.** The page loads finished JavaScript. Visitors do not download the TypeScript compiler.

**Technical.** In-browser compile (the TypeScript playground model, sucrase, `@babel/standalone`, esm.sh `?bundle`) means extra network, extra parse, and a demo that can break when a CDN hiccups. `transpileOnly` skips typechecking — the opposite of this tsconfig.

The contract is: typecheck on the author’s machine (`npm run build`), ship JS. `main.ts` is never served. Reviewers read `src/`; browsers run `dist/`.

**Snippet** (`index.html`):

```html
<script type="module" src="dist/main.js"></script>
```

---

### Q398. Why are `dist/*.js.map` committed?

**Non-technical.** So “View original TypeScript” in DevTools works on a clone that never ran `tsc`.

**Technical.** `sourceMap: true` generates seven maps next to seven JS files. Committing them keeps debugging aligned with committed JS. They are larger than the JS here; they can leak `src/` path names (not a secret). Production hardening would omit maps or serve them only on staging. This is a teaching demo — maps stay.

**Snippet.** Beside `dist/main.js` there is `dist/main.js.map` (same for `Game`, `Board`, `Snake`, `Food`, `Deque`, `types`).

---

### Q399. What does `//# sourceMappingURL=main.js.map` do in DevTools?

**Non-technical.** It is a note at the bottom of the JavaScript file that says “the map of this file is `main.js.map`.”

**Technical.** The `sourceMappingURL` pragma is a source-map spec comment. DevTools fetches `dist/main.js.map` **relative to the JS URL** (`http://localhost:8000/dist/main.js.map`). The map’s `sources` entry `../src/main.ts` is resolved relative to the map (or `sourceRoot`). Then the Sources panel can show `main.ts`.

If the comment is removed but the `.map` file remains, DevTools typically will not auto-load it. If the comment is present but the map 404s, you get a console warning and debug the JS.

**Snippet** (`dist/main.js`):

```js
document.addEventListener("DOMContentLoaded", main);
//# sourceMappingURL=main.js.map
```

---

### Q400. What happens if you deploy without the `.map` files?

**Non-technical.** The game still plays. “Open the TypeScript file in DevTools” stops working.

**Technical.** Maps are debug metadata. Module loading does not fetch them. Network for a player: `index.html`, `style.css`, seven `.js` files. Missing maps: console may log failed map requests when DevTools is open; gameplay is unchanged. Do not rely on maps for production error stack remapping unless a service (Sentry) uploads them separately.

**Snippet.** Game boot does not reference maps — only the pragma in emit does. `main.ts` has no `sourceMappingURL`.

---

### Q401. Why do compiled files still contain the block comments from Game/Snake/Deque?

**Non-technical.** The explanations you wrote above the classes are copied into the JavaScript, so a reviewer who only opens `dist/` still sees the DSA pitch.

**Technical.** `removeComments` is **off** (default `false`). `tsc` preserves JSDoc and `/* */` (and most `//`) in emit. That is why `dist/Deque.js` still argues against `Array.unshift`, and `dist/Game.js` still claims Game holds no grid math.

Turning `removeComments: true` would shrink emit and strip teaching comments. For this demo, leaving them is consistent with committing `dist/` as readable output.

**Snippet** (`dist/Deque.js`):

```js
/**
 * A minimal generic double-ended queue backed by a doubly linked list.
 *
 * Why not just use a JS array? Array#unshift / Array#shift are O(n) because
 * every remaining element has to be re-indexed.
 */
export class Deque {
```

---

### Q402. Why does `dist/main.js` drop the `HTMLCanvasElement | null` annotation but keep the throw?

**Non-technical.** Types are for the compiler. The browser never sees them. The safety check is a real `if` that still runs.

**Technical.** TypeScript erases types, `as` assertions, and type-only imports. `as HTMLCanvasElement | null` is gone in emit. `Position` is imported in `Game.ts` only as a type, so `dist/Game.js` imports `{ Direction, GameStatus }` — **not** `Position`. The runtime null check and `throw new Error(...)` are values, so they survive.

If you removed the `if` and kept the assertion, `tsc` would be satisfied (assertions do not narrow for emit) and `new Game({ canvas: null })` would explode later inside `Board`. The throw is the actual guard.

**Snippet** (`src/main.ts` vs `dist/main.js`):

```ts
const canvas = document.getElementById("board") as HTMLCanvasElement | null;
if (!canvas || !scoreEl || !statusEl || !overlayEl || !restartBtn) {
  throw new Error("Required DOM elements are missing from index.html");
}
```

```js
const canvas = document.getElementById("board");
if (!canvas || !scoreEl || !statusEl || !overlayEl || !restartBtn) {
    throw new Error("Required DOM elements are missing from index.html");
}
```

---

### Q403. README: why will `file://` fail with CORS for ES modules?

**Non-technical.** Opening the HTML file from disk is a different security box than opening a website. Browsers refuse to let that disk page import other disk JavaScript as modules.

**Technical.** A document at `file:///…/index.html` has an opaque origin. Module scripts use CORS. For `file://`, the import `dist/Game.js` is treated as a cross-origin request that cannot be CORS-satisfied (there is no HTTP server to send `Access-Control-Allow-Origin`). Chromium fails the module graph; the canvas stays empty, overlay may flash empty until `main` never runs.

Classic `<script src="dist/main.js">` without `type="module"` would run on `file://` but then `import` inside `main.js` would be a syntax error in a non-module script. The README is correct: serve HTTP.

**Snippet** (`README.md`):

```markdown
browsers will block it over a bare `file://`
URL (CORS). Serve the folder locally instead
```

---

### Q404. What is the actual browser error, and which request is cross-origin (the HTML vs `dist/Game.js`)?

**Non-technical.** The page itself may load. The extra JavaScript files it tries to pull in as modules are what get blocked.

**Technical.** `index.html` over `file://` is the document. The classic stylesheet `style.css` often still loads (non-module). `<script type="module" src="dist/main.js">` is a module; Chromium typically logs along the lines of:

`Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of ""`  
and/or  
`Access to script at 'file:///…/dist/main.js' from origin 'null' has been blocked by CORS policy`

Origin `null` is the `file://` document. `dist/main.js` is the first blocked module URL; even if `main.js` loaded, `./Game.js` would be the next. The HTML vs JS distinction: **the document is not “cross-origin to itself”; the module fetches are.**

Over `http://localhost:8000`, document and modules share `http://localhost:8000` — same origin, no CORS dance needed for relative imports.

**Snippet** (`index.html` + `dist/main.js`):

```html
<script type="module" src="dist/main.js"></script>
```

```js
import { Game } from "./Game.js";
```

---

### Q405. Why `python3 -m http.server 8000` vs `npx serve .` vs VS Code Live Server?

**Non-technical.** Three ways to get an `http://` address. Python is already on most Macs. `npx serve` uses Node if you have it. Live Server is a one-click editor button.

**Technical.**

| | Python `http.server` | `npx serve` | Live Server |
| --- | --- | --- | --- |
| Extra install | No | Downloads `serve` | VS Code extension |
| Default port | **8000** | 3000 | 5500 |
| SPA fallback | No (good: this is not an SPA) | Optional | Optional |
| MIME for `.js` | Correct for modules | Correct | Correct |

Any static file server that sets `Content-Type: text/javascript` (or `application/javascript`) on `.js` works (Q407). Python is the README’s first choice so a reviewer without Node can still play after clone — matching committed `dist/`.

**Snippet** (`README.md`):

```markdown
python3 -m http.server 8000

# or, if you have Node
npx serve .
```

---

### Q406. Why port 8000?

**Non-technical.** That is Python’s usual port for this command. Nothing in the game hard-codes 8000.

**Technical.** `python3 -m http.server` defaults to **8000** if you omit the port. Passing `8000` is explicit. `index.html` uses relative URLs (`style.css`, `dist/main.js`), so the port is irrelevant as long as you open the matching origin. Port 80 would need root; 5500 would collide with Live Server habits. 8000 is a convention, not a requirement.

**Snippet** (`README.md`): `python3 -m http.server 8000` then `http://localhost:8000`.

---

### Q407. What MIME type must `.js` be served as for modules to work?

**Non-technical.** The server must label JavaScript files as JavaScript, not as plain text.

**Technical.** HTML spec: module scripts require a JavaScript MIME type. Acceptable: `text/javascript`, `application/javascript`, `application/ecmascript`, etc. Python’s `http.server` maps `.js` via the `mimetypes` module to `text/javascript` on current Python. `text/plain` fails (Q408). `text/html` would be worse.

CSS is `text/css`; HTML is `text/html`. Source maps are often `application/json`. Wrong JS MIME is the classic “works in Live Server, fails on a naive static host.”

**Snippet.** No `netlify.toml` / `_headers` in this folder — MIME depends entirely on the static server you pick.

---

### Q408. What happens if a static host serves `dist/main.js` as `text/plain`?

**Non-technical.** The game does not start. The browser refuses to treat that file as a program.

**Technical.** Chromium: `Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/plain"`. Firefox similar. The document and CSS may still show Idle/0 overlay chrome; `Game` never constructs. Fix the host’s MIME map, do not add a bundler.

**Snippet.** Same `<script type="module" src="dist/main.js">` — success is 100% server metadata, not TypeScript.

---

### Q409. Why relative paths `style.css` and `dist/main.js` — subdirectory hosting?

**Non-technical.** Links are “next to this HTML file,” not “at the root of the whole website.” That way the demo still works in a subfolder.

**Technical.** `href="style.css"` and `src="dist/main.js"` resolve against the document URL. Hosted at `https://example.com/snake/` they become `/snake/style.css` and `/snake/dist/main.js`. An absolute `/style.css` would break on GitHub Pages project sites (`https://user.github.io/repo/`) by requesting `https://user.github.io/style.css`.

Relative also works on `http://localhost:8000/` (document is `/` or `/index.html`). Nested paths: if you opened `http://localhost:8000/snake%20game/` the same relatives still work. See also Q27 in the HTML set.

**Snippet** (`index.html`):

```html
<link rel="stylesheet" href="style.css" />
<script type="module" src="dist/main.js"></script>
```

---

### Q410. Why no GitHub Pages / Netlify config in this folder?

**Non-technical.** There is no deploy recipe here. Hosting is “serve this directory somehow.”

**Technical.** Confirmed: **no `netlify.toml`**, no `_headers`, no `_redirects`, no `.github/workflows`, no `CNAME`. GitHub Pages would work as a static publish of this folder (must serve MIME correctly; project pages need relative URLs — already true). Netlify drop-deploy of the folder would also work without config because there is no SPA redirect to invent.

Absence is honest: this is course-repo demo, not a product URL. A `netlify.toml` with `publish = "."` would not change Deque + Set.

**Snippet.** Folder listing: `index.html`, `style.css`, `src/`, `dist/`, `package.json`, `tsconfig.json`, `README.md` — no hosting config.

---

### Q411. What breaks if `src/` is deployed without `dist/`?

**Non-technical.** You shipped the recipe but not the meal. The browser asks for `dist/main.js` and gets 404.

**Technical.** `index.html` does not load `.ts`. Without `dist/main.js`, module script fails; `main()` never runs; HUD stays the HTML defaults (`0`, `Idle`); overlay stays an **empty** covering `div` because `hidden` is not in the HTML (Q430). A host that publishes only `src/` is unplayable.

**Snippet:**

```html
<script type="module" src="dist/main.js"></script>
<canvas id="board"></canvas>
<div id="overlay" class="overlay"></div>
```

---

### Q412. What breaks if `dist/` is deployed without `index.html` / `style.css`?

**Non-technical.** You shipped the engine with no page and no paint for the chrome.

**Technical.** Hitting `/dist/main.js` directly shows source (or download). There is no document to provide `#board`, `#score`, etc. Even if you loaded `main.js` from some other HTML missing those ids, `main.ts` throws `Required DOM elements are missing from index.html`. Without `style.css`, a correct `index.html` would still run the game unstyled (default canvas inline, overlay not themed).

**Snippet** (`src/main.ts`):

```ts
if (!canvas || !scoreEl || !statusEl || !overlayEl || !restartBtn) {
  throw new Error("Required DOM elements are missing from index.html");
}
```

---

### Q413. Why does README say the compiled JS is “already included so this works immediately without a build step”?

**Non-technical.** Clone, serve, play. Do not require `npm install` just to see the snake.

**Technical.** `dist/*.js` is in git. `python3 -m http.server` does not use Node. TypeScript is only needed after editing `src/`. That is the whole point of Q395. The lie appears when `src/` is newer than `dist/` (Q414).

**Snippet** (`README.md`):

```markdown
The compiled JavaScript is already
included in `dist/`, so this works immediately without a build step.
```

---

### Q414. How do you keep `dist/` from lying when you edited `src/` and forgot `npm run build`?

**Non-technical.** You cannot, today, except by remembering to build — or by watching the compiler.

**Technical.** There is no CI `git diff --exit-code dist/`, no `pre-commit` hook, no `npm start` that runs `tsc`. `npm run watch` is the human-sized fix while editing. A reviewer should `npm install && npm run build` before trusting a dirty tree.

Heavier fixes: do not commit `dist/` and generate it in CI (fights Q413), or add a tiny script that compares mtimes. Interview: “Committed emit is a demo convenience. I would not do this in a team app without a check.”

**Snippet** (`package.json`):

```json
"build": "tsc",
"watch": "tsc --watch"
```

---

### Q415. Why import paths in `dist/Game.js` still say `./Board.js` — sibling modules, how many HTTP requests on first load (main, Game, Board, Snake, Food, Deque, types)?

**Non-technical.** Each TypeScript file becomes its own JavaScript file. The browser fetches them one by one the first time, then caches them.

**Technical.** `tsc` does **not** bundle. Specifiers are copied. First-load module graph:

1. `dist/main.js` (from HTML)
2. `dist/Game.js` (from main)
3. `dist/Board.js`, `dist/Snake.js`, `dist/Food.js`, `dist/types.js` (from Game)
4. `dist/Deque.js` (from Snake)

`Food.js` also imports `Board.js`, `Snake.js`, `types.js` — **cache hits**, not extra files. `Board.js` / `Snake.js` import `types.js` — cache hits.

**Seven HTTP module requests:** `main`, `Game`, `Board`, `Snake`, `Food`, `Deque`, `types`. Plus `index.html` and `style.css`. Maps only if DevTools is open.

**Snippet** (`dist/Game.js` + `dist/main.js`):

```js
import { Board } from "./Board.js";
import { Snake } from "./Snake.js";
import { Food } from "./Food.js";
import { Direction, GameStatus } from "./types.js";
```

```js
import { Game } from "./Game.js";
```

---

### Q416. Why not one concatenated file to avoid 7 module round-trips?

**Non-technical.** Seven tiny files on your laptop’s server are instant. One big file would hide the class split the Network panel currently proves.

**Technical.** HTTP/1.1 localhost latency is ~0. HTTP/2 multiplexing makes seven files cheap on a real host too. Concatenation (or Vite `build.lib`) would need a bundler, fight Q394, and collapse the OOP story into one blob. The teaching value of seven requests **is** the graph: Game orchestrates; Deque does not import Snake.

If this shipped to a 3G phone as a product, you might bundle. As an interview demo, keep the graph.

**Snippet.** Seven `dist/*.js` files: `main.js`, `Game.js`, `Board.js`, `Snake.js`, `Food.js`, `Deque.js`, `types.js`.

---

### Q417. Why no `Content-Security-Policy` (inline? there is none) or canvas-taint discussion?

**Non-technical.** There is no extra lock on what scripts can run. The canvas only paints squares from code, not photos from other websites.

**Technical.** `index.html` has no `<meta http-equiv="Content-Security-Policy">`. No inline `<script>`, no `onclick=` attributes, no `eval`. A strict CSP `default-src 'self'; script-src 'self'` would match this page. Absence is a gap for a public origin, acceptable for a local demo.

Canvas taint: `getImageData` / `toBlob` throw if the bitmap pulled cross-origin image pixels without CORS. `Board` only `fillRect` / `stroke` with hex/rgba strings. Nothing is tainted. `drawImage` is unused.

**Snippet** (`src/Board.ts`):

```ts
this.ctx.fillStyle = color;
this.ctx.fillRect(
  pos.x * this.cellSize + inset,
  pos.y * this.cellSize + inset,
  this.cellSize - inset * 2,
  this.cellSize - inset * 2
);
```

---

### Q418. Why no service worker / PWA / install-as-app?

**Non-technical.** This is not an installable phone app. There is no offline cache, no home-screen icon.

**Technical.** No `manifest.webmanifest`, no `serviceWorker.register`, no `sw.js`. A SW would cache `dist/` and could serve a stale snake after you rebuild — the same lie as Q414, plus cache-busting homework. Out of scope for Deque + Set.

**Snippet.** `index.html` `<head>` is charset, viewport, title, stylesheet — no manifest link.

---

# Part 12 — OOP story, DSA story, and gaps a reviewer will probe

### Q419. Why vanilla canvas + `tsc` in a demo when you claim React / Next.js daily — what are you proving that React would hide?

**Non-technical.** React would wrap this in components and a bundler. You would talk about hooks, not about why the body is a deque.

**Technical.** React daily work hides: native ESM CORS, `tsc` emit vs bundler, canvas backing-store pixels, a raw `requestAnimationFrame` game loop, and the exact bytes of `Set.has`. A `<SnakeCanvas />` with Zustand would still *use* a deque if you wrote one, but the interview would drift to “why not use a library.”

This repo proves: you can choose `Deque<T>` + `Set<string>`, keep Board dumb, keep Game as orchestrator, and ship without Node at runtime. That is a different axis from “I can wire Next.js auth.” Say both. Do not pretend this replaces production React — it is the complementary artifact.

**Snippet** (`README.md`):

```markdown
A dependency-free Snake game built specifically to demonstrate two things
clearly in the code: the right data structures for the job, and clean OOP
separation of concerns.
```

---

### Q420. Why five classes (Deque, Snake, Food, Board, Game) plus `main` — is that teaching OOP or over-abstracting Snake?

**Non-technical.** Five named boxes, each with one job. `main` only finds the HTML pieces and presses “go.”

**Technical.** It is teaching OOP **boundaries**, not Enterprise Fizzbuzz. A one-file snake would mix pixels, input, and O(1) occupancy. The split:

| Class | Owns | Must not own |
| --- | --- | --- |
| `Deque<T>` | Linked-list nodes | Positions, rendering |
| `Snake` | Deque + occupied Set + heading | Canvas, score |
| `Food` | One cell + respawn | Tick loop |
| `Board` | Grid size + `CanvasRenderingContext2D` | Collision policy |
| `Game` | Status machine, rAF, keys, score | How a deque splices |

`main` is not a class: it is the composition root. Over-abstraction would be `ISnakeMovementStrategy`. This is below that line and above a 200-line `index.ts`. Interview: “I would not add a sixth class without a sixth reason.”

**Snippet** (`README.md` table + `src/main.ts`):

```markdown
| Class | Owns | Knows nothing about |
| `Game` | The tick loop, input handling, score, game state | Grid math, deque internals |
```

```ts
document.addEventListener("DOMContentLoaded", main);
```

---

### Q421. README says Game “holds no grid math and no data-structure logic.” Point to a place Game still does geometry-ish work (`positionsEqual`, render colors, start position math).

**Non-technical.** The README slightly oversells the purity. Game still decides where the snake starts, whether head equals food, and which colours to paint.

**Technical.** Live leaks:

1. **Start pose:** `Math.floor(this.board.columns / 2)` and a three-cell tail-left pattern — that is grid arithmetic.
2. **`positionsEqual`** — coordinate compare for eating; could live on `Position` or Board.
3. **`HEAD_COLOR` / `BODY_COLOR` / `FOOD_COLOR`** — presentation tokens inside the orchestrator; Board only receives a string.
4. Comment vs code: the file’s own JSDoc repeats the README claim.

None of this is deque logic. It is still “geometry-ish.” Honest answer: Game is allowed to **compose** grid facts; it must not **reimplement** `isWithinBounds` or `occupiesCell`. Tighten the README to “no occupancy Set, no pixel conversion.”

**Snippet** (`src/Game.ts`):

```ts
/**
 * Game itself holds no grid
 * math and no data-structure logic — that separation is the point.
 */
private reset(): void {
  const startX = Math.floor(this.board.columns / 2);
  const startY = Math.floor(this.board.rows / 2);
  const initialSegments: Position[] = [
    { x: startX - 2, y: startY },
    { x: startX - 1, y: startY },
    { x: startX, y: startY },
  ];
}

private positionsEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}
```

```ts
const HEAD_COLOR = "#f5f5f4";
const BODY_COLOR = "#8a8f98";
const FOOD_COLOR = "#2dd4bf";
```

---

### Q422. Why can Snake not import Board, but Food **does** import Board and Snake?

**Non-technical.** The snake should not know how big the picture is. Food has to ask the board for size and the snake for “is this cell free?”

**Technical.** `Snake.ts` imports only `Deque` and `types`. Bounds checks are `Board.isWithinBounds` called from **Game** (`tick`). That keeps Snake unit-testable with fake coordinates.

`Food.randomFreeCell` reads `board.columns` / `board.rows` and `snake.occupiesCell`. So Food is coupled to both concrete classes. Game already owns Board and Snake; Food’s constructor `(board, snake)` is convenient and is a **layering leak** (Q423).

Snake importing Board would pull canvas/`getContext` into the DSA module — the thing README says not to do.

**Snippet** (`src/Snake.ts` vs `src/Food.ts`):

```ts
import { Deque } from "./Deque.js";
import { Position, Direction } from "./types.js";
```

```ts
import { Position } from "./types.js";
import { Board } from "./Board.js";
import { Snake } from "./Snake.js";
```

---

### Q423. Is Food’s dependency on Board a leak? Could `randomFreeCell(columns, rows, occupies)` be a pure function?

**Non-technical.** Yes, it is a little leak. Food only needs width, height, and a yes/no “filled?” function — not the whole board object.

**Technical.** `Board` is a canvas owner. Food never calls `drawCell`. A pure helper:

```ts
function randomFreeCell(
  columns: number,
  rows: number,
  occupies: (p: Position) => boolean
): Position
```

would let tests pass a stub `occupies` without constructing a canvas. Live `Food` is an OOP façade over rejection sampling. The leak is **acceptable for the demo**, not ideal for testing. Full-board win still missing (Q435) either way.

**Snippet** (`src/Food.ts`):

```ts
private static randomFreeCell(board: Board, snake: Snake): Position {
  let candidate: Position;
  do {
    candidate = {
      x: Math.floor(Math.random() * board.columns),
      y: Math.floor(Math.random() * board.rows),
    };
  } while (snake.occupiesCell(candidate));
  return candidate;
}
```

---

### Q424. Why is Deque reusable while Snake is Snake-specific — would you put Deque in a shared util package?

**Non-technical.** Deque is a queue that works on any item type. Snake is the game of Snake.

**Technical.** `Deque<T>` has no `Position`, no `Direction`, no canvas. You could drop it into a BFS or an undo stack. `Snake` hard-codes `cellKey`, `OPPOSITE`, growth, self-collision-with-tail exception. Publishing Deque: then you **would** add `declaration: true`, `moduleResolution: NodeNext`, tests, and not `Bundler` (TS 5.0 note: Bundler is a poor default for libraries).

Would I extract it **today**? No — one consumer. After a second game in the course repo, yes, as `packages/deque`. Until then, colocating `src/Deque.ts` is the right size.

**Snippet** (`src/Deque.ts`):

```ts
export class Deque<T> {
  private head: DequeNode<T> | null = null;
  private tail: DequeNode<T> | null = null;
  private count = 0;
```

---

### Q425. Why is the occupied `Set` inside Snake rather than a `Grid` class Board owns?

**Non-technical.** The snake is the thing that occupies cells. The board is the thing that draws them. Keeping the occupancy list on the snake means one owner for “where is my body?”

**Technical.** `occupied` must stay **in lockstep** with `body` on every `pushFront`/`popBack`. If Board owned a `Grid` occupancy map, every `advance()` would need a callback into Board, or Game would dual-write. Dual-write is how occupancy bugs are born.

Board owning occupancy also tempts Food and Snake to query the canvas class for physics. Current design: Snake answers `occupiesCell` / `wouldCollideWithSelf` in O(1); Board answers `isWithinBounds` and pixels. Game asks both.

A `Grid` class that is **not** Board (pure occupancy, no canvas) is a valid sixth type. It would steal the Set from Snake and need the same sync protocol. For one snake, keep the Set on Snake.

**Snippet** (`src/Snake.ts`):

```ts
this.body.pushFront(newHead);
this.occupied.add(cellKey(newHead));
if (this.pendingGrowth > 0) {
  this.pendingGrowth--;
} else {
  const removedTail = this.body.popBack();
  if (removedTail) this.occupied.delete(cellKey(removedTail));
}
```

---

### Q426. If a reviewer says “just use an array,” what do you defend, and what do you concede (n ≤ 576, V8, interview narrative)?

**Non-technical.** Defend: a linked deque matches “add head, drop tail” in constant time. Concede: on a 24×24 board the snake is at most 576 cells, and JavaScript arrays are fast enough that players would not feel the difference.

**Technical.** Defend:

- `Array.unshift` / `shift` are O(n) reindex. This move pattern is exactly unshift + pop (or push + shift if you stored tail-at-end).
- `Deque` makes the complexity **visible** in the type and the README.
- Occupancy is already O(1) via `Set`; the body structure should not be the accidental O(n) part.

Concede:

- n ≤ `24 * 24 = 576`. V8’s `unshift` on 576 objects is microseconds, not frames.
- A ring buffer (`head`/`tail` indices on a preallocated array) is also O(1) and more cache-friendly.
- Interview narrative is a **valid** reason to write the list: you are demonstrating you know why textbooks use deques.

Do not claim the array version would drop FPS on this board. Claim the deque is the right *model* and a fair teaching artifact.

**Snippet** (`src/Deque.ts` comment):

```ts
 * Why not just use a JS array? Array#unshift / Array#shift are O(n) because
 * every remaining element has to be re-indexed. A linked-list deque gives
 * true O(1) pushFront / pushBack / popFront / popBack
```

---

### Q427. Why is there **no unit test** for the tail-cell exception — the easiest off-by-one in the project?

**Non-technical.** The trickiest collision rule (“sliding into the square your tail is leaving is allowed”) is only proven by playing, not by a test file.

**Technical.** `wouldCollideWithSelf`: if `occupied.has(next)` but `pendingGrowth === 0` and `next` is the tail key, return **false**. Get this wrong and you die when the snake chases its tail, or you pass through your own neck. It is a one-screen test:

- body occupying `(2,0)(1,0)(0,0)`, heading left, not growing → next `(-1,0)` or wrap-free `(0,0)` tail case on a straight line.
- Classic: length 4 looping onto current tail.

There is no test runner (Q378). This is the **highest-value missing test**. Agree with the reviewer.

**Snippet** (`src/Snake.ts`):

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

---

### Q428. Why no test that deque `pushFront` + `popBack` matches a reference array?

**Non-technical.** Nobody checks the queue against a simple list of numbers automatically.

**Technical.** A golden test: start empty, `pushFront` 1,2,3, `toArray()` equals `[3,2,1]`, `popBack()` yields 1, size 2. Repeat with `pushBack`/`popFront`. Plus empty `popFront` → `undefined`, iterator order, `first`/`last` after one element.

That would lock the linked-list pointer updates (`head.prev`, `tail.next`, empty both-null). It does not need canvas or jsdom. Missing tests are a **real gap**; “the file is short” is not a substitute.

**Snippet** (`src/Deque.ts`):

```ts
pushFront(value: T): void { /* … */ }
popBack(): T | undefined { /* … */ }
```

---

### Q429. Why keyboard-only on a phone — is this demo desktop-interview-first?

**Non-technical.** Yes. On a phone there are no arrow keys, and there are no on-screen d-pad buttons.

**Technical.** Input is `window` `keydown` plus a Restart **click**. No `pointerdown`, no swipe, no `tabIndex` on a virtual pad. README: “Arrow keys or WASD.” The viewport meta exists so the canvas scales (`max-width: 100%`), but you cannot steer. Desktop-interview-first is the honest product choice. Touch is on the Q442 list, not in the code.

**Snippet** (`src/Game.ts`):

```ts
window.addEventListener("keydown", (event) => this.handleKeydown(event));
config.restartBtn.addEventListener("click", () => this.start());
```

---

### Q430. Why no `aria-live` on score, no `aria-label` on canvas, overlay not `hidden` in HTML?

**Non-technical.** Screen-reader users do not get a named game board, do not hear the score tick, and may hit a blank covering layer before JavaScript runs.

**Technical.** Three separate gaps:

1. **Canvas:** `<canvas id="board">` has no `aria-label`, no `role="img"`, no fallback text. It is an empty bitmap to AT.
2. **Score/status:** `#score` / `#status` are updated in `updateHud()` with no `aria-live`. Politely announcing every +10 every 110ms would be noisy (HTML Q43–Q44); a live region on **status** changes (Idle → Running → Game Over) is the reasonable fix.
3. **Overlay:** HTML is `<div id="overlay" class="overlay"></div>` **without** `hidden`. CSS `.overlay { display: flex }` covers the canvas until `reset()` sets `overlayEl.hidden = !visible`. If JS fails or is slow, an empty dark cover sits on the board.

`setOverlay` does use the `hidden` attribute at runtime. The gap is the **initial HTML**.

**Snippet** (`index.html` + `src/Game.ts`):

```html
<canvas id="board"></canvas>
<div id="overlay" class="overlay"></div>
<span id="score" class="hud-value">0</span>
```

```ts
this.config.overlayEl.hidden = !visible;
this.config.scoreEl.textContent = String(this.score);
this.config.statusEl.textContent = this.status;
```

---

### Q431. Why no `prefers-reduced-motion` slowing `tickMs` or freezing the snake?

**Non-technical.** The OS “reduce motion” setting only kills the Restart button’s colour fade. The snake still lurches every 110ms.

**Technical.** CSS:

```css
@media (prefers-reduced-motion: reduce) {
  .restart-btn { transition: none; }
}
```

`tickMs: 110` is a JS constant in `main.ts`. The rAF loop does not read `matchMedia("(prefers-reduced-motion: reduce)")`. Reduced-motion users still get a fast animation. Fixes that keep the story: raise `tickMs` (e.g. 220–300) when the media query matches, or pause auto-run and step on keypress. Freezing entirely would change the game; slowing is the Q442 item.

**Snippet** (`src/main.ts` + `style.css`):

```ts
tickMs: 110,
```

```css
@media (prefers-reduced-motion: reduce) {
  .restart-btn {
    transition: none;
  }
}
```

---

### Q432. Why no `devicePixelRatio`?

**Non-technical.** On a Retina screen the grid can look slightly soft because the game draws 528 CSS pixels onto a 528-device-pixel bitmap.

**Technical.** `Board` sets `canvas.width = columns * cellSize` (24×22 = **528**) and the CSS `#board { max-width: 100%; height: auto }` sizes the element. On `devicePixelRatio === 2`, the backing store should be 1056×1056 and `ctx.scale(dpr, dpr)` (or multiply all draws). Live code does not read `devicePixelRatio`. Grid lines use `+ 0.5` for 1× crispness, which is the wrong trick at 2× if you also scale.

This is a known canvas interview beat. Fixing it does not touch Deque + Set.

**Snippet** (`src/Board.ts`):

```ts
canvas.width = columns * cellSize;
canvas.height = rows * cellSize;
```

---

### Q433. Why a one-slot `queuedDirection` instead of a length-2 queue?

**Non-technical.** You can stash only one “next turn.” Two quick taps in the same beat can collapse into a U-turn the game then ignores.

**Technical.** `queuedDirection` is `Direction | null`. Every key overwrites the slot. `setDirection` **drops** 180° reversals. Classic failure: heading Right, tap Up then Left inside one 110ms tick → slot is Left → opposite of Right → ignored → snake continues Right. A length-2 queue (standard Snake) applies Up on this tick (now heading Up) and Left on the next (legal). The comment in `handleKeydown` claims the one-slot queue prevents same-tick 180; it prevents **instant** 180 on the *current* heading, but it also **drops** a valid two-step corner.

Interview: defend one-slot as simplicity; concede length-2 is the correct feel. Q442.

**Snippet** (`src/Game.ts`):

```ts
private queuedDirection: Direction | null = null;

this.queuedDirection = direction;

if (this.queuedDirection) {
  this.snake.setDirection(this.queuedDirection);
  this.queuedDirection = null;
}
```

---

### Q434. Why Restart does not reset while Running/Paused?

**Non-technical.** The button is labelled Restart but during a run it does not start a new game. It only really resets after you die or before you have started.

**Technical.** `start()`:

```ts
if (this.status === GameStatus.GameOver || this.status === GameStatus.Idle) {
  this.reset();
}
this.status = GameStatus.Running;
```

Click while **Running**: skip `reset()`, keep snake/score, restart rAF (already running). Click while **Paused**: skip `reset()`, set Running, clear overlay — i.e. **Resume**, not Restart. That is a UX bug. Fix: always `this.reset()` in the button handler, or rename the button to “Resume” when paused. Overlay copy says “Press restart” on game over, which *does* reset.

**Snippet** (`src/Game.ts`):

```ts
config.restartBtn.addEventListener("click", () => this.start());

start(): void {
  if (this.status === GameStatus.GameOver || this.status === GameStatus.Idle) {
    this.reset();
  }
  this.status = GameStatus.Running;
  this.setOverlay("", false);
  // …
}
```

---

### Q435. Why rejection sampling with no full-board win?

**Non-technical.** Food is placed by guessing random squares until one is empty. If the snake ever filled the entire 24×24 grid, that guess loop would never finish and the tab would freeze.

**Technical.** `do { … } while (snake.occupiesCell(candidate))` has no attempt cap and no `if (snake.length === columns * rows) win()`. Comment admits a packed board is “you win” but **does not implement it**. Probability of starvation is tiny until late game; the last few cells can retry many times (still fine). The last cell is the infinite-loop bomb.

Fix: if `snake.length === board.columns * board.rows`, set a Win status (or GameOver with a win overlay) **before** `respawn`. Optional: sample from a list of free cells when occupancy is high.

**Snippet** (`src/Food.ts`):

```ts
// Rejection sampling: pick a random cell, retry if the snake is there.
// With a board much larger than the snake this converges immediately;
// a fully-packed board is effectively a "you win" state anyway.
do {
  candidate = {
    x: Math.floor(Math.random() * board.columns),
    y: Math.floor(Math.random() * board.rows),
  };
} while (snake.occupiesCell(candidate));
```

---

### Q436. Why HUD status shows `"Game Over"` with a space — enum as UI copy?

**Non-technical.** The status text is not a separate translation. It is the internal state name, including the space in “Game Over.”

**Technical.** `GameStatus.GameOver = "Game Over"` (string enum). `updateHud` does `statusEl.textContent = this.status`. Idle/Running/Paused match nice labels by accident. Overlay messages are separate English sentences (`setOverlay`). If you ever want `"GAMEOVER"` as a code value and `"Game over"` as copy, split enum vs i18n map. Today, renaming the enum member string **is** a UI change.

**Snippet** (`src/types.ts` + `src/Game.ts`):

```ts
export enum GameStatus {
  Idle = "Idle",
  Running = "Running",
  Paused = "Paused",
  GameOver = "Game Over",
}
```

```ts
this.config.statusEl.textContent = this.status;
```

---

### Q437. Why canvas colors and CSS tokens can drift?

**Non-technical.** The webpage chrome and the snake pixels each have their own colour list. They happen to match today for food/accent, but nothing forces them to stay in sync.

**Technical.** CSS `:root` has `--accent: #2dd4bf`, `--muted: #8a8f98`, `--text: #e4e4e7`, `--bg: #0c0d10`, `--panel: #17191d`. Canvas: `FOOD_COLOR = "#2dd4bf"` (matches accent), `BODY_COLOR = "#8a8f98"` (matches muted), `HEAD_COLOR = "#f5f5f4"` (**not** `--text`), `clear()` `#14161a` (**not** `--panel` / `--bg`). Changing `--accent` restyles the HUD and Restart hover; the apple stays `#2dd4bf` until someone edits `Game.ts`.

Fix without a framework: CSS variables read from JS (`getComputedStyle(document.documentElement).getPropertyValue("--accent")`) or a tiny shared `theme.ts` imported nowhere from CSS (document in README). Dual hex is the drift.

**Snippet:**

```css
--accent: #2dd4bf;
--muted: #8a8f98;
--text: #e4e4e7;
```

```ts
const HEAD_COLOR = "#f5f5f4";
const BODY_COLOR = "#8a8f98";
const FOOD_COLOR = "#2dd4bf";
```

```ts
this.ctx.fillStyle = "#14161a";
```

---

### Q438. Why window keydown is never unregistered?

**Non-technical.** The game listens to the whole window for keys until you close the tab. There is no “destroy the game” that turns the listener off.

**Technical.** `addEventListener("keydown", …)` in the constructor uses an anonymous arrow — you **cannot** `removeEventListener` the same function. `restartBtn` click is the same. For a page whose lifetime **is** the game, leaks do not matter. If this class were mounted twice (React wrapper, hot reload), you would stack listeners and `preventDefault` arrows twice.

Fix: store `this.onKey = (e) => this.handleKeydown(e)` and expose `destroy()`. Out of scope for `main.ts` one-shot. Still worth saying so a React interviewer knows you know.

**Snippet** (`src/Game.ts`):

```ts
config.restartBtn.addEventListener("click", () => this.start());
window.addEventListener("keydown", (event) => this.handleKeydown(event));
```

---

### Q439. Why Space on GameOver does not restart (only direction / Restart button)?

**Non-technical.** The overlay tells you to press Restart or a direction key. It does not mention Space.

**Technical.** **The question’s premise does not match live `handleKeydown`.** Space:

```ts
if (this.status === GameStatus.Running) this.pause();
else if (this.status === GameStatus.Paused) this.resume();
else this.start();
```

`GameOver` is neither Running nor Paused, so Space calls `start()`, and `start()` **does** `reset()` because `status === GameOver`. Space **does** restart after death.

What *is* true: overlay copy and README omit Space (`Press restart or any direction key`, “Restart button (or any direction key after game over)”). Idle + Space also starts a run (empty `else`). If a reviewer quotes this question, correct them, then mention the copy/code mismatch.

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

```ts
this.setOverlay(`Game over — score ${this.score}. Press restart or any direction key to try again.`, true);
```

---

### Q440. Why no `tabindex` / focus trap — can the game steal arrow keys from the URL bar?

**Non-technical.** There is no special “focus jail.” If you are typing in the address bar, the game does not take those keys. If you clicked the page, arrows steer the snake instead of scrolling.

**Technical.** Listeners are on `window`, not on a `tabIndex={0}` canvas. Browser chrome (omnibox, DevTools) has its own focus: those key events **do not** hit the page. When the document is focused, `handleKeydown` `preventDefault()`s Space and mapped arrows/WASD — that **does** steal page-scroll and it **does** steal caret movement if a hidden/contenteditable existed (none does). There is no modal, so no focus trap is required; a trap without a dialog would be hostile.

Missing `tabindex="0"` + `aria-label` on the canvas means keyboard users who tab through the page hit Restart then leave; arrows still work globally anyway because of `window`. That global grab is the actual “steal” — from **page** scrolling, not from the URL bar.

**Snippet** (`src/Game.ts`):

```ts
const direction = KEY_TO_DIRECTION[event.key];
if (!direction) return;
event.preventDefault();
```

```html
<canvas id="board"></canvas>
```

---

### Q441. Why no pause when the tab is in the background?

**Non-technical.** Switching to another tab does not put the HUD in Paused. The browser mostly freezes the animation; coming back can apply one sudden step.

**Technical.** No `document.addEventListener("visibilitychange", …)`. Background tabs throttle `requestAnimationFrame`. `loop` does `if (now - lastTick >= tickMs) { lastTick = now; tick(); }` — **one** tick after a long gap, not a catch-up storm. So you will not get 50 death-steps, but you may move once the moment you return, and `status` stays `Running`.

Fix: on `document.hidden`, call `pause()` (or a silent pause that does not show “Paused”). Reset `lastTick` on resume (already done in `resume()`). Q335 in the Game questions is the same beat.

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

### Q442. If a reviewer asks “what would you add next **without** changing the story of the page (Deque + Set, OOP split, no framework)?”, what is still missing?

**Non-technical.** Keep the snake, the five classes, and no React. Fill in the product holes: tests, sharper canvas, fairer controls, accessibility, a real win, phones, motion, and a safer boot.

**Technical.** Stay off Vite/React. Do not replace `Deque` with an array. Add, in roughly this order:

1. **Tests** — `node:test` or Vitest-in-Node against `Deque` and `wouldCollideWithSelf` (Q427–Q428). Biggest credibility gap.
2. **`devicePixelRatio`** — scale the canvas backing store (Q432).
3. **Direction queue of length 2** — classic Snake buffering (Q433).
4. **Restart always `reset()`** — button matches the label while Running/Paused (Q434).
5. **Overlay `hidden` in HTML** — no empty cover before `reset()` (Q430).
6. **`aria-label` on the canvas** — name the bitmap for AT (Q430).
7. **`aria-live` on score/status** — prefer status; be careful with 110ms score spam (Q430).
8. **Full-board win** — stop rejection sampling when `length === 24*24` (Q435).
9. **Touch** — on-screen d-pad or swipe (Q429).
10. **Reduced-motion `tickMs`** — `matchMedia` slows the loop; CSS already only kills a button transition (Q431).
11. **`readyState` boot** — `DOMContentLoaded` works today because `type="module"` is deferred and the event has not fired yet; `if (document.readyState === "loading") addEventListener else main()` is the robust composition root if the script is ever loaded after load (Q397 / `main.ts`).
12. **Serve story only** — keep seven modules; do **not** concatenate. Document `python3 -m http.server 8000` (already in README). Optional `"start"` script. Optional `.gitignore` for `node_modules`. No Netlify/GitHub Pages config required for the story.

That list is the close. Vanilla `tsc` vs React daily is the narrative; **no unit tests** is the gap you volunteer before they poke Deque.

**Snippet** (`src/main.ts` boot today):

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

document.addEventListener("DOMContentLoaded", main);
```

---

End of Q373–Q442 (70 questions). HTML → CSS → types → Deque → Snake → Board → Food → Game → main → tooling → dist. If a reviewer jumps to `file://`, the seven-module graph, or “why not Vite,” this file is Parts 10–12.
