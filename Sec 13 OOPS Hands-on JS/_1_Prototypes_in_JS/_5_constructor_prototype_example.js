/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES CHALLENGE 5                                    ║
 * ║          🏭 Constructor Functions and .prototype Property 🏭                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * When you create a constructor function, JavaScript automatically creates a
 * .prototype property on it. Objects created with `new` get this as their
 * [[Prototype]].
 * 
 * function Foo() {}
 * const f = new Foo();
 * f.__proto__ === Foo.prototype  // true!
 * Foo.prototype.constructor === Foo  // true!
 * 
 * 
 * 🎯 TASK: Master Constructor Functions and .prototype
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a constructor `Calculator` that:
 *    - Takes an initial `value` (default 0)
 *    - Has prototype methods: add(n), subtract(n), multiply(n), divide(n)
 *    - Each method modifies `this.value` and returns `this` for chaining
 *    - Has a prototype method `getValue()` that returns current value
 *    - Has a prototype method `reset()` that sets value to 0 and returns this
 * 
 * 2. Create a constructor `StringBuilder` that:
 *    - Takes an initial string (default '')
 *    - Has prototype method `append(str)` - adds to end, returns this
 *    - Has prototype method `prepend(str)` - adds to beginning, returns this
 *    - Has prototype method `toString()` - returns the built string
 *    - Has prototype method `clear()` - resets to '', returns this
 * 
 * 3. Create a constructor `Counter` that:
 *    - Has a SHARED count across all instances using prototype
 *    - Has instance method `increment()` that adds 1 to shared count
 *    - Has instance method `decrement()` that subtracts 1 from shared count
 *    - Has instance method `getCount()` that returns the shared count
 *    - Has static property `Counter.totalInstances` tracking instance count
 * 
 * 4. Create a function `fixConstructor(Constructor)` that:
 *    - Ensures Constructor.prototype.constructor points back to Constructor
 *    - This is needed after replacing a prototype object
 *    - Returns the Constructor
 * 
 * 
 * 💡 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "When using constructor functions, always put shared methods on the prototype
 *  to avoid creating duplicate functions for each instance."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Calculator constructor with chainable arithmetic methods
 * @param {number} value - Initial value (default 0)
 */
function Calculator(value) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Calculator prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * StringBuilder constructor for building strings
 * @param {string} initial - Initial string (default '')
 */
function StringBuilder(initial) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// StringBuilder prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Counter constructor with shared state across instances
 */
function Counter() {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Counter prototype (shared state) and methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Fixes the constructor property on a prototype
 * @param {Function} Constructor - The constructor function to fix
 * @returns {Function} - The Constructor
 */
function fixConstructor(Constructor) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    Calculator,
    StringBuilder,
    Counter,
    fixConstructor
};
