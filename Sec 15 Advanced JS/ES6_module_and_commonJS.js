/**
 * ============================================================================
 * 🚨 NOTE: CommonJS examples are in separate .cjs files!
 * ============================================================================
 *
 * You CANNOT use require() in this file because it's an ES6 module.
 * 
 * To see CommonJS examples, run:
 *   node testCommonJS.cjs
 *
 * ============================================================================
 */

//MODULE IMPORTS AND EXPORTS
//default export

import multiply from "./math.js";

console.log(multiply(2, 3));

//named export

import { add, subtract } from "./math.js";

console.log(add(2, 3));
console.log(subtract(2, 3));

//importing everything

import * as math from "./math.js";

console.log(math.add(2, 3));
console.log(math.subtract(2, 3));


/**
 * ============================================================================
 * 📦 ES6 MODULES vs COMMONJS - Interview Revision Guide
 * ============================================================================
 *
 * @concept Module Systems in JavaScript
 *
 * Modules are like LEGO blocks 🧱 - they help you break your code into
 * smaller, reusable pieces that can be combined to build bigger applications.
 *
 * ============================================================================
 * 🔵 COMMONJS (The Old Way - Node.js Default)
 * ============================================================================
 *
 * @what CommonJS was created for Node.js (server-side JavaScript)
 *
 * @syntax
 *   EXPORTING:
 *   ```
 *   // math.js
 *   const add = (a, b) => a + b;
 *   const subtract = (a, b) => a - b;
 *
 *   module.exports = { add, subtract };
 *   // OR
 *   exports.add = add;
 *   ```
 *
 *   IMPORTING:
 *   ```
 *   // app.js
 *   const { add, subtract } = require('./math');
 *   // OR
 *   const math = require('./math');
 *   math.add(2, 3);
 *   ```
 *
 * @keyPoints
 *   1. Uses `require()` to import
 *   2. Uses `module.exports` or `exports` to export
 *   3. SYNCHRONOUS loading (loads one file at a time, blocks execution)
 *   4. Loads modules at RUNTIME (when code runs)
 *   5. Default in Node.js (files with .js extension)
 *
 * ============================================================================
 * 🟢 ES6 MODULES (The Modern Way - Browser & Node.js)
 * ============================================================================
 *
 * @what ES6 Modules (ESM) is the official JavaScript standard (ECMAScript 2015+)
 *
 * @syntax
 *   EXPORTING:
 *   ```
 *   // math.mjs (or .js with "type": "module" in package.json)
 *
 *   // Named exports
 *   export const add = (a, b) => a + b;
 *   export const subtract = (a, b) => a - b;
 *
 *   // Default export (only ONE per file)
 *   export default function multiply(a, b) {
 *       return a * b;
 *   }
 *   ```
 *
 *   IMPORTING:
 *   ```
 *   // app.mjs
 *
 *   // Named imports (use curly braces)
 *   import { add, subtract } from './math.mjs';
 *
 *   // Default import (no curly braces, can rename)
 *   import multiply from './math.mjs';
 *   import myMultiply from './math.mjs';  // renamed!
 *
 *   // Import everything
 *   import * as math from './math.mjs';
 *   math.add(2, 3);
 *   ```
 *
 * @keyPoints
 *   1. Uses `import` and `export` keywords
 *   2. ASYNCHRONOUS loading (non-blocking, better for browsers)
 *   3. Loads modules at COMPILE TIME (static analysis possible)
 *   4. Supports TREE SHAKING (removes unused code for smaller bundles)
 *   5. Use .mjs extension OR set "type": "module" in package.json
 *
 * ============================================================================
 * ⚔️ COMPARISON TABLE (INTERVIEW FAVORITE!)
 * ============================================================================
 *
 * | Feature              | CommonJS               | ES6 Modules            |
 * |----------------------|------------------------|------------------------|
 * | Syntax               | require() / exports    | import / export        |
 * | Loading              | Synchronous            | Asynchronous           |
 * | When Parsed          | Runtime                | Compile time           |
 * | Tree Shaking         | ❌ Not supported       | ✅ Supported           |
 * | Default Export       | module.exports = ...   | export default ...     |
 * | Named Export         | exports.name = ...     | export const name      |
 * | Where Used           | Node.js (default)      | Browsers + Modern Node |
 * | File Extension       | .js                    | .mjs (or .js + config) |
 * | Dynamic Import       | require() anywhere     | import() returns Promise|
 *
 * ============================================================================
 * 📌 QUICK MEMORY TRICKS
 * ============================================================================
 *
 * CommonJS = "require" = "Request" = Older Node.js way
 * ES6 = "import/export" = Modern JavaScript standard
 *
 * Think of it like:
 * - CommonJS = Old flip phone 📱 (works, but limited)
 * - ES6 Modules = Smartphone 📲 (modern, more features)
 *
 * ============================================================================
 * 🎯 COMMON INTERVIEW QUESTIONS
 * ============================================================================
 *
 * Q1: "What's the difference between CommonJS and ES6 modules?"
 * A: CommonJS uses require/exports, loads synchronously at runtime.
 *    ES6 uses import/export, loads asynchronously at compile time,
 *    supports tree shaking.
 *
 * Q2: "Can you use both in the same project?"
 * A: Yes! But be careful:
 *    - ES6 can import CommonJS using `import`
 *    - CommonJS can import ES6 using dynamic `import()` (returns Promise)
 *
 * Q3: "What is Tree Shaking?"
 * A: Removing unused code during bundling. ES6 supports this because
 *    imports are analyzed at compile time (static analysis).
 *
 * Q4: "Why does ES6 module loading happen at compile time?"
 * A: Because `import` statements are static (must be at top level),
 *    tools can analyze which exports are used BEFORE running the code.
 *
 * Q5: "What's a default export vs named export?"
 * A: Default = ONE main thing per file, import without {}
 *    Named = Multiple things, import with {}
 *
 * ============================================================================
 * 💻 PRACTICAL EXAMPLES
 * ============================================================================
 */

// ======================= COMMONJS EXAMPLE =======================
// File: utils.js
/*
const greet = (name) => `Hello, ${name}!`;
const farewell = (name) => `Goodbye, ${name}!`;

// Way 1: Export an object
module.exports = { greet, farewell };

// Way 2: Export individually
// exports.greet = greet;
// exports.farewell = farewell;
*/

// File: app.js
/*
const { greet, farewell } = require('./utils');
console.log(greet('Student'));    // Hello, Student!
console.log(farewell('Student')); // Goodbye, Student!
*/

// ======================= ES6 MODULE EXAMPLE =======================
// File: utils.mjs
/*
export const greet = (name) => `Hello, ${name}!`;
export const farewell = (name) => `Goodbye, ${name}!`;

// Default export
export default function welcome(name) {
    return `Welcome to JavaScript, ${name}!`;
}
*/

// File: app.mjs
/*
import welcome, { greet, farewell } from './utils.mjs';

console.log(welcome('Student'));  // Welcome to JavaScript, Student!
console.log(greet('Student'));    // Hello, Student!
console.log(farewell('Student')); // Goodbye, Student!
*/

// ======================= DYNAMIC IMPORT (ES6) =======================
/*
// Useful for code splitting and lazy loading
async function loadModule() {
    const module = await import('./utils.mjs');
    console.log(module.greet('Dynamically Loaded!'));
}
loadModule();
*/

/**
 * ============================================================================
 * 📝 KEY TAKEAWAYS (Revise These!)
 * ============================================================================
 *
 * 1. CommonJS = require() + module.exports → Synchronous, Runtime
 * 2. ES6 Modules = import + export → Asynchronous, Compile time
 * 3. ES6 enables TREE SHAKING (dead code elimination)
 * 4. Default export = 1 per file | Named export = Multiple per file
 * 5. In browsers: Always use ES6 modules (<script type="module">)
 * 6. In Node.js: Use .mjs OR add "type": "module" in package.json
 *
 * ============================================================================
 * 🚀 Pro Tip: Modern projects prefer ES6 modules. Learn it well!
 * ============================================================================
 */
