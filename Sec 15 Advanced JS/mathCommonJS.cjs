/**
 * ============================================================================
 * 📦 COMMONJS MODULE FILE (.cjs extension)
 * ============================================================================
 *
 * @note This file uses .cjs extension to tell Node.js:
 *       "This is a CommonJS file, NOT ES6 module"
 *
 * @important You CANNOT mix CommonJS and ES6 syntax in the SAME file!
 *   - CommonJS: require() / module.exports  → Use .cjs extension
 *   - ES6:      import / export             → Use .js or .mjs extension
 *
 * ============================================================================
 */

// ======================= SINGLE DEFAULT EXPORT =======================
// Way 1: Export a single function/value
// module.exports = multiplyCommonJS;  // Only use ONE module.exports per file!

function multiplyCommonJS(a, b) {
    return a * b;
}

// ======================= NAMED EXPORTS =======================
// Way 2: Export multiple functions as an object

function addCommonJS(a, b) {
    return a + b;
}

function subtractCommonJS(a, b) {
    return a - b;
}

// Export everything together
module.exports = {
    multiplyCommonJS,
    addCommonJS,
    subtractCommonJS
};

// ⚠️ NOTE: If you call module.exports twice, the SECOND one overwrites the first!
// That's why we export everything in ONE object.
