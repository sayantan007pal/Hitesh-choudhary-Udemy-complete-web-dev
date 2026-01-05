/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    CONSTRUCTOR FUNCTIONS CHALLENGE 5                         ║
 * ║                 🛡️ new.target and Constructor Safety 🛡️                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * A common bug is calling a constructor function without 'new'. This causes:
 * - 'this' to be undefined (strict mode) or global object (non-strict)
 * - Properties get assigned to wrong object or cause errors
 * 
 * new.target is a meta-property that:
 * - Is undefined if function called normally
 * - References the constructor if called with 'new'
 * 
 * This enables SAFE constructors that protect against misuse!
 * 
 * 
 * 🎯 TASK: Build Safe Constructors
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a constructor `StrictPerson` that:
 *    - Takes `name` parameter
 *    - THROWS an Error if called without 'new'
 *    - Uses new.target for detection
 *    - Error message: "StrictPerson must be called with 'new'"
 * 
 * 2. Create a constructor `FlexiblePerson` that:
 *    - Takes `name` parameter
 *    - AUTO-CORRECTS if called without 'new' (returns new instance anyway)
 *    - Uses new.target for detection
 *    - Works correctly with or without 'new'
 * 
 * 3. Create a constructor `AbstractShape` that:
 *    - Cannot be instantiated directly (throws Error if new.target === AbstractShape)
 *    - Takes `type` parameter
 *    - Only allows instantiation through child constructors
 *    - Error message: "AbstractShape cannot be instantiated directly"
 * 
 * 4. Create a constructor `ConcreteSquare` that:
 *    - Inherits from AbstractShape
 *    - Takes `size` parameter
 *    - Calls AbstractShape with type='square'
 *    - Has getArea() method returning size * size
 * 
 * 5. Create a function `detectCallingMethod(fn, ...args)` that:
 *    - Returns 'with-new' if fn is meant to be called with new
 *    - Returns 'without-new' if fn works without new
 *    - Returns 'both' if fn works both ways
 *    - Test by trying both methods and checking results
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - Must use new.target (not other methods like this instanceof)
 * - StrictPerson must throw, FlexiblePerson must auto-correct
 * - AbstractShape pattern must prevent direct instantiation
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - new.target === undefined means called without 'new'
 * - new.target === Constructor means 'new Constructor()'
 * - In inheritance, new.target is the ACTUAL constructor used
 * - Abstract pattern: if (new.target === AbstractClass) throw Error
 * 
 * 
 * 📝 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "new.target is ES6 and is the standard way to detect if a function
 *  was called as a constructor. It also helps implement abstract classes."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * StrictPerson - THROWS if called without 'new'
 * @param {string} name - Person's name
 * @throws {Error} If called without 'new'
 */
function StrictPerson(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * FlexiblePerson - AUTO-CORRECTS if called without 'new'
 * @param {string} name - Person's name
 * @returns {FlexiblePerson} Instance (whether or not 'new' was used)
 */
function FlexiblePerson(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * AbstractShape - Cannot be instantiated directly
 * @param {string} type - Shape type
 * @throws {Error} If instantiated directly (not through child)
 */
function AbstractShape(type) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// AbstractShape prototype methods (if any)
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * ConcreteSquare - Inherits from AbstractShape
 * @param {number} size - Side length
 */
function ConcreteSquare(size) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Set up ConcreteSquare inheritance
// ==================== YOUR CODE HERE ====================


// ========================================================

// ConcreteSquare prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Detects how a constructor can be called
 * @param {Function} fn - The constructor to test
 * @param {...any} args - Arguments to pass
 * @returns {string} - 'with-new', 'without-new', or 'both'
 */
function detectCallingMethod(fn, ...args) {
    // ==================== YOUR CODE HERE ====================
    // Try calling with 'new' and without
    // Return based on what works
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    StrictPerson,
    FlexiblePerson,
    AbstractShape,
    ConcreteSquare,
    detectCallingMethod
};
