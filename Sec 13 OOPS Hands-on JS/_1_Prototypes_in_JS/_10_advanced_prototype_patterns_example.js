/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES CHALLENGE 10                                   ║
 * ║          🎓 Advanced Prototype Patterns - Interview Ready! 🎓               ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * This challenge covers ADVANCED prototype patterns commonly asked in 
 * senior-level JavaScript interviews:
 * 
 * 1. Method Borrowing
 * 2. Extending Built-in Prototypes (and why to avoid it!)
 * 3. Polymorphism through prototypes
 * 4. Instance type checking beyond instanceof
 * 5. Prototype-based factory patterns
 * 
 * 
 * 🎯 TASK: Master Advanced Prototype Patterns
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a function `borrowMethod(sourceObj, methodName, targetObj, ...args)` that:
 *    - Borrows a method from sourceObj and calls it with targetObj as `this`
 *    - Passes additional args to the method
 *    - Returns the result of the method call
 *    - Example: borrowMethod([1,2,3], 'join', {0:'a',1:'b',length:2}, '-') → 'a-b'
 * 
 * 2. Create a function `extendArrayPrototypeSafe(methodName, fn)` that:
 *    - Adds a method to Array.prototype ONLY if it doesn't already exist
 *    - Returns true if method was added, false if already existed
 *    - The method should be non-enumerable (so it won't show in for...in)
 * 
 * 3. Create a factory function `createShape(type, ...dimensions)` that:
 *    - Creates different shape objects based on type
 *    - Types: 'circle' (radius), 'rectangle' (width, height), 'triangle' (base, height)
 *    - Each shape has area() and describe() methods via prototype
 *    - Uses prototype-based inheritance for shared methods
 * 
 * 4. Create a function `getInstanceType(obj)` that:
 *    - Returns the constructor name of the object
 *    - Works with custom constructors, built-ins, and Object.create objects
 *    - Returns 'Object' for plain objects, 'null' for Object.create(null)
 * 
 * 5. Create a function `implementsInterface(obj, interfaceSpec)` that:
 *    - Checks if obj has all methods/properties defined in interfaceSpec
 *    - interfaceSpec is like { methodName: 'function', propName: 'string' }
 *    - Returns { valid: boolean, missing: [] }
 * 
 * 6. Create a memoization decorator using prototypes:
 *    - `createMemoizedConstructor(Constructor)` that:
 *      - Returns a new constructor that caches instances by first argument
 *      - Same first argument returns same instance (singleton per key)
 * 
 * 
 * 💡 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Prototype patterns in JS enable powerful metaprogramming. Understanding
 *  borrowing, duck typing, and prototype manipulation is key for senior roles."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Borrows a method from source and calls it on target
 * @param {Object} sourceObj - Object to borrow method from
 * @param {string} methodName - Name of method to borrow
 * @param {Object} targetObj - Object to use as `this`
 * @param {...*} args - Additional arguments
 * @returns {*} - Result of method call
 */
function borrowMethod(sourceObj, methodName, targetObj, ...args) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Safely extends Array.prototype with a new method
 * @param {string} methodName - Name of method to add
 * @param {Function} fn - The method function
 * @returns {boolean} - True if added, false if already exists
 */
function extendArrayPrototypeSafe(methodName, fn) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// Shape prototypes for factory pattern
const shapeProto = {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
};

const circleProto = Object.create(shapeProto);
// ==================== YOUR CODE HERE ====================


// ========================================================

const rectangleProto = Object.create(shapeProto);
// ==================== YOUR CODE HERE ====================


// ========================================================

const triangleProto = Object.create(shapeProto);
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Factory function to create shape objects
 * @param {string} type - 'circle', 'rectangle', or 'triangle'
 * @param {...number} dimensions - Shape dimensions
 * @returns {Object} - Shape object with area() and describe()
 */
function createShape(type, ...dimensions) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Gets the constructor/type name of an object
 * @param {Object} obj - Object to check
 * @returns {string} - Constructor name or 'null' for null-proto
 */
function getInstanceType(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Checks if object implements an interface specification
 * @param {Object} obj - Object to check
 * @param {Object} interfaceSpec - { propName: 'expectedType', ... }
 * @returns {Object} - { valid: boolean, missing: string[] }
 */
function implementsInterface(obj, interfaceSpec) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Creates a memoized version of a constructor
 * @param {Function} Constructor - Original constructor
 * @returns {Function} - Memoized constructor
 */
function createMemoizedConstructor(Constructor) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    borrowMethod,
    extendArrayPrototypeSafe,
    createShape,
    getInstanceType,
    implementsInterface,
    createMemoizedConstructor,
    shapeProto,
    circleProto,
    rectangleProto,
    triangleProto
};
