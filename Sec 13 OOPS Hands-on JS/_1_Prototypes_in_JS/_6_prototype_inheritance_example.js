/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES CHALLENGE 6                                    ║
 * ║          🔄 Prototype-Based Inheritance Patterns 🔄                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * Prototype-based inheritance is JavaScript's native inheritance mechanism.
 * There are multiple patterns to achieve this:
 * 
 * 1. Constructor Pattern: Using .prototype and new
 * 2. Object.create Pattern: Pure prototypal inheritance
 * 3. Parasitic Inheritance: Enhancing objects
 * 4. Combination Inheritance: Best of multiple patterns
 * 
 * 
 * 🎯 TASK: Implement Different Inheritance Patterns
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a base constructor `Shape` that:
 *    - Takes `name` parameter
 *    - Has prototype method `describe()` → returns `A shape called ${name}`
 * 
 * 2. Create a constructor `Rectangle` that inherits from Shape:
 *    - Takes `width` and `height`
 *    - Calls Shape constructor with name 'Rectangle'
 *    - Has prototype method `area()` → returns width * height
 *    - Has prototype method `perimeter()` → returns 2 * (width + height)
 *    - Must properly inherit from Shape
 * 
 * 3. Create a constructor `Square` that inherits from Rectangle:
 *    - Takes `side` parameter
 *    - Calls Rectangle constructor with side, side
 *    - Has prototype method `diagonal()` → returns side * Math.sqrt(2)
 *    - Must properly inherit from Rectangle (which inherits from Shape)
 * 
 * 4. Create a function `inheritPrototype(Child, Parent)` that:
 *    - Sets up proper prototype chain: Child.prototype → Parent.prototype
 *    - Maintains correct constructor reference
 *    - This is the recommended way to set up inheritance!
 * 
 * 5. Create a function `createMixin(target, ...sources)` that:
 *    - Copies all own enumerable properties from sources to target.prototype
 *    - Useful for multiple inheritance / mixins
 *    - Returns the target
 * 
 * 
 * 💡 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "The combination inheritance pattern (calling parent constructor + 
 *  Object.create for prototype) is the most robust pre-ES6 pattern."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Base Shape constructor
 * @param {string} name - Shape name
 */
function Shape(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Shape prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Rectangle constructor (inherits from Shape)
 * @param {number} width - Rectangle width
 * @param {number} height - Rectangle height
 */
function Rectangle(width, height) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Set up Rectangle inheritance and prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Square constructor (inherits from Rectangle)
 * @param {number} side - Square side length
 */
function Square(side) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Set up Square inheritance and prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Sets up proper prototype inheritance between constructors
 * @param {Function} Child - Child constructor
 * @param {Function} Parent - Parent constructor
 */
function inheritPrototype(Child, Parent) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Creates a mixin by copying properties to target's prototype
 * @param {Function} target - Target constructor
 * @param {...Object} sources - Source objects with methods to mix in
 * @returns {Function} - The target constructor
 */
function createMixin(target, ...sources) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    Shape,
    Rectangle,
    Square,
    inheritPrototype,
    createMixin
};
