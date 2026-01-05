/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    CONSTRUCTOR FUNCTIONS CHALLENGE 4                         ║
 * ║             🔗 Constructor Inheritance with call() and apply() 🔗            ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * In JavaScript, inheritance between constructor functions requires TWO steps:
 * 
 * 1. PROPERTY INHERITANCE: Call parent constructor with call/apply
 *    Parent.call(this, arg1, arg2)  OR  Parent.apply(this, [args])
 * 
 * 2. METHOD INHERITANCE: Set up prototype chain
 *    Child.prototype = Object.create(Parent.prototype)
 *    Child.prototype.constructor = Child
 * 
 * Understanding call() vs apply():
 *   - call(thisArg, arg1, arg2, ...) - arguments passed individually
 *   - apply(thisArg, [arg1, arg2, ...]) - arguments passed as array
 * 
 * 
 * 🎯 TASK: Build an Inheritance Hierarchy
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a constructor `Shape` that:
 *    - Takes `color` parameter and assigns to this.color
 *    - Has prototype method `getColor()` returning the color
 *    - Has prototype method `describe()` returning "A [color] shape"
 * 
 * 2. Create a constructor `Rectangle` that:
 *    - Takes `color`, `width`, `height` parameters
 *    - Calls Shape using call() to inherit color
 *    - Assigns width and height
 *    - Inherits from Shape
 *    - Has prototype method `getArea()` returning width * height
 *    - OVERRIDES `describe()` to return "A [color] rectangle [width]x[height]"
 * 
 * 3. Create a constructor `Circle` that:
 *    - Takes `color`, `radius` parameters
 *    - Calls Shape using apply() to inherit color
 *    - Assigns radius
 *    - Inherits from Shape
 *    - Has prototype method `getArea()` returning π * radius²
 *    - OVERRIDES `describe()` to return "A [color] circle with radius [radius]"
 * 
 * 4. Create a function `inheritFrom(Child, Parent)` that:
 *    - Sets up proper prototype inheritance
 *    - Resets constructor property
 *    - Returns Child
 * 
 * 5. Create a function `callVsApplyDemo(Constructor, context, ...args)` that:
 *    - Returns object showing how to call Constructor with both call and apply
 *    - { usingCall: how to use call, usingApply: how to use apply }
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - Rectangle must use call() for parent constructor
 * - Circle must use apply() for parent constructor
 * - All shapes must be instanceof their own constructor AND Shape
 * - Child methods should override parent methods properly
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - call() is used when you know the arguments
 * - apply() is useful when arguments are in an array
 * - Use Math.PI for π
 * - Always reset constructor after Object.create
 * 
 * 
 * 📝 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "call() and apply() both invoke functions with custom 'this', 
 *  differing only in how arguments are passed."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Shape Constructor (Base class)
 * @param {string} color - The shape's color
 */
function Shape(color) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Shape prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Rectangle Constructor (inherits from Shape)
 * @param {string} color - The rectangle's color
 * @param {number} width - The rectangle's width
 * @param {number} height - The rectangle's height
 */
function Rectangle(color, width, height) {
    // ==================== YOUR CODE HERE ====================
    // Use call() to inherit from Shape
    
    
    // ========================================================
}

// Set up Rectangle inheritance
// ==================== YOUR CODE HERE ====================


// ========================================================

// Rectangle prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Circle Constructor (inherits from Shape)
 * @param {string} color - The circle's color
 * @param {number} radius - The circle's radius
 */
function Circle(color, radius) {
    // ==================== YOUR CODE HERE ====================
    // Use apply() to inherit from Shape
    
    
    // ========================================================
}

// Set up Circle inheritance
// ==================== YOUR CODE HERE ====================


// ========================================================

// Circle prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Sets up proper prototype inheritance between Child and Parent
 * @param {Function} Child - Child constructor
 * @param {Function} Parent - Parent constructor
 * @returns {Function} - Child constructor
 */
function inheritFrom(Child, Parent) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Demonstrates how call() and apply() differ
 * @param {Function} Constructor - The constructor to use
 * @param {Object} context - The 'this' context
 * @param {...any} args - Arguments to pass
 * @returns {Object} - { usingCall: string, usingApply: string }
 */
function callVsApplyDemo(Constructor, context, ...args) {
    // ==================== YOUR CODE HERE ====================
    // Return strings showing syntax for call and apply
    // Example output:
    // {
    //   usingCall: "Constructor.call(context, arg1, arg2, ...)",
    //   usingApply: "Constructor.apply(context, [arg1, arg2, ...])"
    // }
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    Shape,
    Rectangle,
    Circle,
    inheritFrom,
    callVsApplyDemo
};
