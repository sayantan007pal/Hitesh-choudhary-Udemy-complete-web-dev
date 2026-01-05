/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES CHALLENGE 8                                    ║
 * ║       🏠 hasOwnProperty, in operator, and Property Enumeration 🏠           ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * Understanding how to differentiate between own and inherited properties:
 * 
 * • obj.hasOwnProperty(prop) → true if prop is OWN property
 * • 'prop' in obj → true if prop is ANYWHERE in chain (own or inherited)
 * • Object.keys(obj) → returns only OWN enumerable properties
 * • for...in loop → iterates over ALL enumerable properties (own + inherited)
 * 
 * 
 * 🎯 TASK: Master Property Detection and Enumeration
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a function `categorizeProperties(obj)` that:
 *    - Returns an object with two arrays: { own: [...], inherited: [...] }
 *    - 'own' contains names of own enumerable properties
 *    - 'inherited' contains names of inherited enumerable properties
 *    - Should NOT include Object.prototype properties
 * 
 * 2. Create a function `safeHasOwnProperty(obj, prop)` that:
 *    - Works even on Object.create(null) objects
 *    - Works even if obj has hasOwnProperty as own property
 *    - Returns true if prop is own property, false otherwise
 * 
 * 3. Create a function `getEnumerableProperties(obj, includeInherited)` that:
 *    - If includeInherited is false: returns only own enumerable props
 *    - If includeInherited is true: returns all enumerable props
 *    - Returns an object with key-value pairs
 * 
 * 4. Create a function `countPropertiesByType(obj)` that:
 *    - Returns { ownEnumerable, ownNonEnumerable, inherited }
 *    - Counts properties in each category
 * 
 * 5. Create a function `makePropertyNonEnumerable(obj, prop)` that:
 *    - Makes the specified property non-enumerable
 *    - Returns true if property existed and was modified
 *    - Returns false if property didn't exist
 * 
 * 6. Create a function `filterOwnProperties(obj, predicate)` that:
 *    - Returns new object with only own properties that pass predicate
 *    - predicate(key, value) returns boolean
 *    - Does NOT include inherited properties
 * 
 * 
 * 💡 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Use hasOwnProperty to check OWN properties, 'in' operator to check
 *  entire chain. for...in includes inherited, Object.keys excludes them."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Categorizes properties into own and inherited
 * @param {Object} obj - Object to analyze
 * @returns {Object} - { own: [], inherited: [] }
 */
function categorizeProperties(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Safe hasOwnProperty that works with any object
 * @param {Object} obj - Object to check
 * @param {string} prop - Property name
 * @returns {boolean} - True if own property
 */
function safeHasOwnProperty(obj, prop) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Gets enumerable properties with values
 * @param {Object} obj - Object to get properties from
 * @param {boolean} includeInherited - Whether to include inherited
 * @returns {Object} - Object with key-value pairs
 */
function getEnumerableProperties(obj, includeInherited) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Counts properties by type
 * @param {Object} obj - Object to analyze
 * @returns {Object} - { ownEnumerable, ownNonEnumerable, inherited }
 */
function countPropertiesByType(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Makes a property non-enumerable
 * @param {Object} obj - Object to modify
 * @param {string} prop - Property to make non-enumerable
 * @returns {boolean} - True if modified, false if prop doesn't exist
 */
function makePropertyNonEnumerable(obj, prop) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Filters own properties based on predicate
 * @param {Object} obj - Object to filter
 * @param {Function} predicate - (key, value) => boolean
 * @returns {Object} - New object with filtered properties
 */
function filterOwnProperties(obj, predicate) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    categorizeProperties,
    safeHasOwnProperty,
    getEnumerableProperties,
    countPropertiesByType,
    makePropertyNonEnumerable,
    filterOwnProperties
};
