/**
 * Prototype Chain - Deep Understanding
 * =====================================
 * 
 * Understanding how JavaScript looks up properties through the prototype chain.
 * Key concepts: __proto__, Object.getPrototypeOf, prototype chain traversal.
 */


// =============================================================================
// Task: Implement Prototype Chain Utilities
// =============================================================================
/**
 * PART A: getPrototypeChainLength(obj)
 * ------------------------------------
 * Return the number of objects in the prototype chain (excluding null).
 * 
 * Example:
 *   const obj = {};
 *   getPrototypeChainLength(obj); // 1 (just Object.prototype)
 *   
 *   const arr = [];
 *   getPrototypeChainLength(arr); // 2 (Array.prototype -> Object.prototype)
 * 
 * 
 * PART B: getOwnAndInheritedKeys(obj)
 * -----------------------------------
 * Return an object with two arrays:
 *   - own: array of obj's own enumerable property keys
 *   - inherited: array of inherited enumerable property keys from prototype chain
 * 
 * Example:
 *   const parent = { inherited: 1 };
 *   const child = Object.create(parent);
 *   child.own = 2;
 *   
 *   getOwnAndInheritedKeys(child);
 *   // { own: ['own'], inherited: ['inherited'] }
 * 
 * 
 * PART C: findPropertyOrigin(obj, propName)
 * -----------------------------------------
 * Return the object in the prototype chain where the property is defined.
 * Return null if property doesn't exist anywhere in the chain.
 * 
 * Example:
 *   const arr = [1, 2, 3];
 *   findPropertyOrigin(arr, 'length');    // returns arr itself
 *   findPropertyOrigin(arr, 'push');      // returns Array.prototype
 *   findPropertyOrigin(arr, 'toString');  // returns Object.prototype
 *   findPropertyOrigin(arr, 'notExist');  // returns null
 */

function getPrototypeChainLength(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}

function getOwnAndInheritedKeys(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

function findPropertyOrigin(obj, propName) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


module.exports = {
    getPrototypeChainLength,
    getOwnAndInheritedKeys,
    findPropertyOrigin
};
