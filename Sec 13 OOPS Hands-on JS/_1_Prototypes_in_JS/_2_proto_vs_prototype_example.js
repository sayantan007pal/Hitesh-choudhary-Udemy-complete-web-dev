/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES CHALLENGE 2                                    ║
 * ║            🔍 __proto__ vs prototype - Understanding the Difference 🔍       ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * This is one of the MOST COMMON interview questions about prototypes!
 * 
 * • __proto__ → EXISTS on every OBJECT (it's the actual link to the parent)
 * • prototype → EXISTS only on FUNCTIONS (template for objects created with `new`)
 * 
 * When you do: const obj = new Constructor()
 * Then: obj.__proto__ === Constructor.prototype  // true!
 * 
 * 
 * 🎯 TASK: Demonstrate and work with __proto__ vs prototype
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a function `getProtoChain(obj)` that:
 *    - Returns an array of all objects in the prototype chain
 *    - Starts with the object itself and goes up to null
 *    - Example: [obj, parentProto, grandparentProto, ..., null]
 * 
 * 2. Create a function `linkPrototypes(child, parent)` that:
 *    - Sets parent as the prototype of child using Object.setPrototypeOf
 *    - Returns the child object
 * 
 * 3. Create a constructor function `Person` that:
 *    - Takes `name` parameter
 *    - Has a `greet()` method on prototype that returns `Hello, I'm ${name}`
 * 
 * 4. Create a function `checkProtoRelationship(instance, Constructor)` that:
 *    - Returns true if instance.__proto__ === Constructor.prototype
 *    - Must NOT use instanceof operator
 * 
 * 5. Create a function `addMethodToPrototype(Constructor, methodName, methodFn)` that:
 *    - Adds a new method to Constructor.prototype
 *    - Returns the Constructor
 * 
 * 
 * 💡 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "__proto__ is the ACTUAL prototype link on objects.
 *  prototype is the TEMPLATE property on functions."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Returns an array of all objects in the prototype chain
 * @param {Object} obj - The starting object
 * @returns {Array} - Array of prototype chain objects ending with null
 */
function getProtoChain(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Links child object's prototype to parent object
 * @param {Object} child - The child object
 * @param {Object} parent - The parent object to set as prototype
 * @returns {Object} - The child object
 */
function linkPrototypes(child, parent) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Person constructor function
 * @param {string} name - The person's name
 */
function Person(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Person prototype method
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Checks if instance's __proto__ equals Constructor.prototype
 * @param {Object} instance - The instance to check
 * @param {Function} Constructor - The constructor function
 * @returns {boolean} - True if __proto__ matches prototype
 */
function checkProtoRelationship(instance, Constructor) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Adds a method to a constructor's prototype
 * @param {Function} Constructor - The constructor function
 * @param {string} methodName - Name of the method to add
 * @param {Function} methodFn - The method function
 * @returns {Function} - The Constructor
 */
function addMethodToPrototype(Constructor, methodName, methodFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    getProtoChain,
    linkPrototypes,
    Person,
    checkProtoRelationship,
    addMethodToPrototype
};
