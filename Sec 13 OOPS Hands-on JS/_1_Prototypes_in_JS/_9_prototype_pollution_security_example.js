/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES CHALLENGE 9                                    ║
 * ║          ⚠️ Prototype Pollution and Security Concerns ⚠️                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * Prototype Pollution is a SECURITY VULNERABILITY where an attacker can
 * modify Object.prototype (or other prototypes), affecting ALL objects!
 * 
 * Example attack:
 *   {}.__proto__.isAdmin = true;  // Now ALL objects have isAdmin = true!
 * 
 * This is a REAL interview topic and important security concern!
 * 
 * 
 * 🎯 TASK: Understand and Prevent Prototype Pollution
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a function `isPrototypePolluted(obj, key)` that:
 *    - Returns true if accessing obj[key] would return a value from prototype
 *    - Returns false if obj has its own key or key doesn't exist anywhere
 *    - Helps detect potential pollution issues
 * 
 * 2. Create a function `safeObjectMerge(target, source)` that:
 *    - Merges source properties into target (shallow merge)
 *    - BLOCKS merging of __proto__, prototype, constructor keys
 *    - Returns the modified target
 *    - This prevents prototype pollution attacks
 * 
 * 3. Create a function `deepSafeMerge(target, source)` that:
 *    - Deep merges source into target
 *    - BLOCKS dangerous keys at ALL levels (__proto__, prototype, constructor)
 *    - Returns the modified target
 * 
 * 4. Create a function `freezePrototype(Constructor)` that:
 *    - Freezes the prototype of a constructor function
 *    - Prevents any modifications to the prototype
 *    - Returns the Constructor
 * 
 * 5. Create a function `createSecureObject(props)` that:
 *    - Creates an object with null prototype (immune to prototype pollution)
 *    - Adds all props as own properties
 *    - Returns the secure object
 * 
 * 6. Create a function `sanitizeKey(key)` that:
 *    - Returns true if key is safe (not __proto__, prototype, constructor)
 *    - Returns false if key is dangerous
 * 
 * 
 * 💡 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Prototype pollution occurs when untrusted input modifies Object.prototype.
 *  Prevent it by: validating keys, using Object.create(null), freezing prototypes."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Checks if a key's value comes from the prototype
 * @param {Object} obj - Object to check
 * @param {string} key - Key to check
 * @returns {boolean} - True if value comes from prototype
 */
function isPrototypePolluted(obj, key) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Safely merges source into target, blocking dangerous keys
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} - Modified target
 */
function safeObjectMerge(target, source) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Deep merges source into target, blocking dangerous keys at all levels
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} - Modified target
 */
function deepSafeMerge(target, source) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Freezes a constructor's prototype
 * @param {Function} Constructor - Constructor function
 * @returns {Function} - The Constructor
 */
function freezePrototype(Constructor) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Creates a secure object with null prototype
 * @param {Object} props - Properties to add
 * @returns {Object} - Secure object with null prototype
 */
function createSecureObject(props) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Checks if a key is safe (not a dangerous prototype key)
 * @param {string} key - Key to validate
 * @returns {boolean} - True if safe, false if dangerous
 */
function sanitizeKey(key) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    isPrototypePolluted,
    safeObjectMerge,
    deepSafeMerge,
    freezePrototype,
    createSecureObject,
    sanitizeKey
};
