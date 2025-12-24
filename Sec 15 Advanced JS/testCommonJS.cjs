/**
 * ============================================================================
 * 🧪 TESTING COMMONJS IMPORTS (.cjs file)
 * ============================================================================
 *
 * Run this file with: node testCommonJS.cjs
 *
 * ============================================================================
 */

// ======================= COMMONJS IMPORTS =======================
// Using require() - the CommonJS way

// Import everything
const math = require("./mathCommonJS.cjs");

console.log("=== CommonJS Imports Demo ===");
console.log("multiply(2, 3):", math.multiplyCommonJS(2, 3));  // 6
console.log("add(2, 3):", math.addCommonJS(2, 3));            // 5
console.log("subtract(2, 3):", math.subtractCommonJS(2, 3));  // -1

// Destructuring import (like named imports)
const { addCommonJS, subtractCommonJS } = require("./mathCommonJS.cjs");

console.log("\n=== Destructured Imports ===");
console.log("add(10, 5):", addCommonJS(10, 5));        // 15
console.log("subtract(10, 5):", subtractCommonJS(10, 5)); // 5
