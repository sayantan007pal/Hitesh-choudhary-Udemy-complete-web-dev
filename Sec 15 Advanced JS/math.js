/**
 * ============================================================================
 * 📦 ES6 MODULE FILE - Example Export Module
 * ============================================================================
 *
 * This file demonstrates ES6 module exports (default + named).
 *
 * ============================================================================
 * ⚠️ IMPORTANT: Node.js Module Type Configuration
 * ============================================================================
 *
 * @problem When running ES6 modules in Node.js, you may see this warning:
 *
 *   "Warning: Module type of file is not specified and it doesn't
 *    parse as CommonJS. Reparsing as ES module..."
 *
 * @why This happens because:
 *   1. Node.js was built with CommonJS (require/exports) as DEFAULT
 *   2. ES6 modules (import/export) came LATER
 *   3. Node.js can't tell which system you're using from .js extension alone
 *   4. So it tries CommonJS first → fails → retries as ES6 = PERFORMANCE HIT
 *
 * @solutions (Two Options)
 *
 *   Option 1: Rename files to .mjs extension
 *   ─────────────────────────────────────────
 *   math.js  →  math.mjs
 *   app.js   →  app.mjs
 *
 *   Option 2: Add "type": "module" in package.json (Recommended ✅)
 *   ─────────────────────────────────────────────────────────────────
 *   Create a package.json file with:
 *   {
 *     "type": "module"
 *   }
 *
 * @interview_tip
 *   Q: "Why does Node.js need explicit module configuration?"
 *   A: Node.js defaults to CommonJS for backward compatibility.
 *      ES6 modules need explicit declaration via .mjs OR package.json config.
 *
 * @also_remember
 *   - In Node.js ES6 modules, you MUST include .js extension in imports!
 *   - ❌ Wrong:  import { add } from './math'
 *   - ✅ Correct: import { add } from './math.js'
 *
 * ============================================================================
 */


//MODULE IMPORTS AND EXPORTS

// ======================= DEFAULT EXPORT =======================
// Only ONE default export per file
// Imported WITHOUT curly braces: import multiply from './math.js'

export default function multiply(a, b) {
    return a * b;
}

// ======================= NAMED EXPORTS =======================
// Multiple named exports allowed per file
// Imported WITH curly braces: import { add, subtract } from './math.js'

export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

/**
 * ============================================================================
 * 🚨 CRITICAL INTERVIEW POINT: Cannot Mix Module Systems!
 * ============================================================================
 *
 * @problem What happens if you try to mix them?
 *
 *   If you write this in an ES6 module file:
 *   ┌────────────────────────────────────────────────────────┐
 *   │ export const add = (a, b) => a + b;  // ES6 syntax     │
 *   │ module.exports = { add };            // CommonJS       │
 *   └────────────────────────────────────────────────────────┘
 *
 *   You get this error:
 *   ┌────────────────────────────────────────────────────────┐
 *   │ ReferenceError: module is not defined in ES module     │
 *   │ scope. This file is being treated as an ES module      │
 *   │ because it has a '.js' file extension and package.json │
 *   │ contains "type": "module".                             │
 *   └────────────────────────────────────────────────────────┘
 *
 * @why_this_happens
 *
 *   CommonJS and ES6 are COMPLETELY DIFFERENT module systems:
 *
 *   ┌─────────────────┬────────────────────────────────────────┐
 *   │   CommonJS      │   ES6 Modules                          │
 *   ├─────────────────┼────────────────────────────────────────┤
 *   │ `module` object │ NO `module` object exists!             │
 *   │ `exports` object│ NO `exports` object exists!            │
 *   │ `require()` fn  │ NO `require()` function exists!        │
 *   │ __filename      │ Use import.meta.url instead            │
 *   │ __dirname       │ Use import.meta.dirname (Node 20.11+)  │
 *   └─────────────────┴────────────────────────────────────────┘
 *
 *   When Node.js runs a file as ES6 module, it doesn't create
 *   the CommonJS globals (`module`, `exports`, `require`).
 *   That's why you get "module is not defined"!
 *
 * @analogy Think of it like languages:
 *
 *   CommonJS = Speaking English 🇬🇧
 *   ES6 = Speaking French 🇫🇷
 *
 *   You can't mix English and French words randomly in one sentence
 *   and expect everyone to understand. Same with module systems!
 *
 * ============================================================================
 * 📁 FILE EXTENSIONS IN NODE.JS (Super Important!)
 * ============================================================================
 *
 *   Extension │ Module Type                │ When to Use
 *   ──────────┼────────────────────────────┼──────────────────────────
 *   .js       │ Depends on package.json    │ Default choice
 *             │ "type" field               │
 *             │ - "module" → ES6           │
 *             │ - "commonjs" or none → CJS │
 *   ──────────┼────────────────────────────┼──────────────────────────
 *   .mjs      │ ALWAYS ES6 module          │ When you want ES6 without
 *             │ (ignores package.json)     │ changing package.json
 *   ──────────┼────────────────────────────┼──────────────────────────
 *   .cjs      │ ALWAYS CommonJS            │ When package.json has
 *             │ (ignores package.json)     │ "type": "module" but you
 *             │                            │ need a CommonJS file
 *   ──────────┴────────────────────────────┴──────────────────────────
 *
 * @visual_diagram
 *
 *   Your Current Setup:
 *   ┌─────────────────────────────────────────────────────────┐
 *   │  package.json: { "type": "module" }                     │
 *   └────────────────────────┬────────────────────────────────┘
 *                            │
 *            ┌───────────────┴───────────────┐
 *            ▼                               ▼
 *   ┌─────────────────────┐       ┌─────────────────────┐
 *   │  math.js            │       │  mathCommonJS.cjs   │
 *   │  (Treated as ES6)   │       │  (Treated as CJS)   │
 *   │                     │       │                     │
 *   │  ✅ import/export   │       │  ✅ require/exports │
 *   │  ❌ require/exports │       │  ❌ import/export   │
 *   └─────────────────────┘       └─────────────────────┘
 *
 * ============================================================================
 * 🎯 INTERVIEW Q&A - Mix Module Systems
 * ============================================================================
 *
 * Q1: "Can you use require() in an ES6 module?"
 * ─────────────────────────────────────────────
 * A: No! `require` is not defined in ES6 module scope.
 *    Use `import` instead, or convert to dynamic import:
 *
 *    // Dynamic import (returns a Promise)
 *    const module = await import('./someModule.js');
 *
 * Q2: "Can you use import in a CommonJS file?"
 * ─────────────────────────────────────────────
 * A: Not the static `import` at the top level.
 *    But you CAN use dynamic `import()` which returns a Promise:
 *
 *    // In a .cjs file
 *    import('./esModule.mjs').then(module => {
 *        console.log(module.default);
 *    });
 *
 * Q3: "How do you use an ES6 module from CommonJS?"
 * ─────────────────────────────────────────────────
 * A: Use dynamic import() since it returns a Promise:
 *    (async () => {
 *        const esModule = await import('./module.mjs');
 *        esModule.someFunction();
 *    })();
 *
 * Q4: "How do you use a CommonJS module from ES6?"
 * ─────────────────────────────────────────────────
 * A: Just import it normally! ES6 can import CommonJS:
 *    import pkg from './package.cjs';  // Gets module.exports
 *
 * Q5: "What's the best practice for new projects?"
 * ─────────────────────────────────────────────────
 * A: Use ES6 modules ("type": "module" in package.json).
 *    They're the JavaScript standard and support tree shaking.
 *    Only use CommonJS (.cjs) when you must use legacy packages.
 *
 * ============================================================================
 * 💡 QUICK REFERENCE TABLE
 * ============================================================================
 *
 *   Need to...                        │ Do this...
 *   ──────────────────────────────────┼─────────────────────────────────────
 *   Use ES6 in "type": "module" proj  │ Just use .js extension
 *   Use CJS in "type": "module" proj  │ Use .cjs extension
 *   Use ES6 in "type": "commonjs" proj│ Use .mjs extension
 *   Use ES6 without package.json      │ Use .mjs extension
 *   Import CJS from ES6               │ import pkg from './file.cjs'
 *   Import ES6 from CJS               │ await import('./file.mjs')
 *   ──────────────────────────────────┴─────────────────────────────────────
 *
 * ============================================================================
 * 💾 FILES IN THIS FOLDER
 * ============================================================================
 *
 *   📄 ES6 Module Files (.js - because "type": "module"):
 *      - math.js                  → ES6 exports demo
 *      - ES6_module_and_commonJS.js → ES6 imports demo
 *
 *   � CommonJS Files (.cjs):
 *      - mathCommonJS.cjs         → CommonJS exports demo
 *      - testCommonJS.cjs         → CommonJS imports demo
 *
 *   Run ES6:     node ES6_module_and_commonJS.js
 *   Run CommonJS: node testCommonJS.cjs
 *
 * ============================================================================
 */