/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES CHALLENGE 4                                    ║
 * ║      🔧 Prototype Methods - getPrototypeOf, setPrototypeOf, isPrototypeOf 🔧 ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * JavaScript provides built-in methods to work with prototypes:
 * 
 * • Object.getPrototypeOf(obj)    → Returns the prototype of obj
 * • Object.setPrototypeOf(obj, p) → Sets prototype of obj to p
 * • proto.isPrototypeOf(obj)      → Checks if proto is in obj's chain
 * 
 * These are MODERN alternatives to using __proto__ directly!
 * 
 * 
 * 🎯 TASK: Implement utility functions using prototype methods
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a function `getDirectPrototype(obj)` that:
 *    - Returns the direct prototype of the object
 *    - If obj is null or undefined, return null
 * 
 * 2. Create a function `setNewPrototype(obj, newProto)` that:
 *    - Sets newProto as the prototype of obj
 *    - Returns true if successful, false if obj is not an object
 * 
 * 3. Create a function `isInPrototypeChain(proto, obj)` that:
 *    - Returns true if proto is anywhere in obj's prototype chain
 *    - Uses isPrototypeOf method
 * 
 * 4. Create a function `getPrototypeDepth(obj)` that:
 *    - Returns the depth of the prototype chain (number of prototypes)
 *    - Object.prototype counts as 1, null is not counted
 *    - Example: {} → Object.prototype → null = depth of 1
 *    - Example: Object.create({}) → {} → Object.prototype → null = depth of 2
 * 
 * 5. Create a function `findCommonPrototype(obj1, obj2)` that:
 *    - Returns the first common prototype in both chains
 *    - If no common prototype (both are null-proto), return null
 * 
 * 6. Create a function `cloneWithSamePrototype(obj)` that:
 *    - Creates a shallow clone of obj with the same prototype
 *    - Copies all own enumerable properties
 * 
 * 
 * 💡 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Always use Object.getPrototypeOf() and Object.setPrototypeOf() 
 *  instead of __proto__ for production code - they're more reliable."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Gets the direct prototype of an object
 * @param {Object} obj - The object to get prototype from
 * @returns {Object|null} - The prototype or null
 */
function getDirectPrototype(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Sets a new prototype for an object
 * @param {Object} obj - The object to modify
 * @param {Object} newProto - The new prototype
 * @returns {boolean} - True if successful
 */
function setNewPrototype(obj, newProto) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Checks if proto is in obj's prototype chain
 * @param {Object} proto - The potential prototype
 * @param {Object} obj - The object to check
 * @returns {boolean} - True if proto is in chain
 */
function isInPrototypeChain(proto, obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Gets the depth of the prototype chain
 * @param {Object} obj - The object to check
 * @returns {number} - Depth of prototype chain
 */
function getPrototypeDepth(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Finds the first common prototype between two objects
 * @param {Object} obj1 - First object
 * @param {Object} obj2 - Second object
 * @returns {Object|null} - Common prototype or null
 */
function findCommonPrototype(obj1, obj2) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Creates a shallow clone with the same prototype
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
function cloneWithSamePrototype(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    getDirectPrototype,
    setNewPrototype,
    isInPrototypeChain,
    getPrototypeDepth,
    findCommonPrototype,
    cloneWithSamePrototype
};
