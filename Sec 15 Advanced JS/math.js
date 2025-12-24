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