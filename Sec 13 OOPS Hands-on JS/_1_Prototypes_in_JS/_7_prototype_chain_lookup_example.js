/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES CHALLENGE 7                                    ║
 * ║          🔍 Property Lookup and Shadowing in Prototype Chain 🔍             ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * When accessing a property on an object, JavaScript performs a lookup:
 * 
 * 1. Check if property exists on the object itself (own property)
 * 2. If not found, check the object's [[Prototype]]
 * 3. Continue up the chain until found or reach null
 * 
 * SHADOWING: When an own property has the same name as a prototype property,
 * the own property "shadows" (hides) the prototype property.
 * 
 * 
 * 🎯 TASK: Understand Property Lookup and Shadowing
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a function `findPropertySource(obj, propName)` that:
 *    - Finds which object in the prototype chain owns the property
 *    - Returns that object, or null if property doesn't exist anywhere
 *    - Must walk the chain manually (don't use hasOwnProperty only on obj)
 * 
 * 2. Create a function `getAllPropertyNames(obj)` that:
 *    - Returns an array of ALL property names (own + inherited)
 *    - Should include non-enumerable properties too
 *    - Should NOT include duplicates
 *    - Does NOT include properties from Object.prototype (too many!)
 * 
 * 3. Create a function `shadowProperty(obj, propName, value)` that:
 *    - Creates an own property on obj that shadows an inherited one
 *    - Returns true if there was an inherited property to shadow
 *    - Returns false if property doesn't exist in prototype chain
 *    - Always sets the own property regardless
 * 
 * 4. Create a function `unshadowProperty(obj, propName)` that:
 *    - Removes the own property from obj (if exists)
 *    - This reveals the inherited property again
 *    - Returns true if an own property was removed
 *    - Returns false if there was no own property to remove
 * 
 * 5. Create a function `getPropertyDescriptorFromChain(obj, propName)` that:
 *    - Returns the property descriptor for propName
 *    - Searches through the prototype chain
 *    - Returns undefined if not found anywhere
 * 
 * 6. Create a function `isOwnProperty(obj, propName)` that:
 *    - Returns true if propName is an own property of obj
 *    - Safe version that works even with Object.create(null) objects
 * 
 * 
 * 💡 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Property shadowing allows objects to override inherited behavior
 *  without modifying the prototype, preserving the original for other instances."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Finds which object in the prototype chain owns a property
 * @param {Object} obj - Starting object
 * @param {string} propName - Property name to find
 * @returns {Object|null} - Object that owns the property or null
 */
function findPropertySource(obj, propName) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Gets all property names from object and its prototype chain
 * @param {Object} obj - The object to inspect
 * @returns {Array} - Array of unique property names
 */
function getAllPropertyNames(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Creates an own property that shadows an inherited one
 * @param {Object} obj - The object to modify
 * @param {string} propName - Property name to shadow
 * @param {*} value - Value to set
 * @returns {boolean} - True if there was inherited property to shadow
 */
function shadowProperty(obj, propName, value) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Removes own property to reveal inherited one
 * @param {Object} obj - The object to modify
 * @param {string} propName - Property name to unshadow
 * @returns {boolean} - True if own property was removed
 */
function unshadowProperty(obj, propName) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Gets property descriptor from prototype chain
 * @param {Object} obj - Starting object
 * @param {string} propName - Property name
 * @returns {Object|undefined} - Property descriptor or undefined
 */
function getPropertyDescriptorFromChain(obj, propName) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Safely checks if property is own property (works with null-proto objects)
 * @param {Object} obj - Object to check
 * @param {string} propName - Property name
 * @returns {boolean} - True if own property
 */
function isOwnProperty(obj, propName) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    findPropertySource,
    getAllPropertyNames,
    shadowProperty,
    unshadowProperty,
    getPropertyDescriptorFromChain,
    isOwnProperty
};
