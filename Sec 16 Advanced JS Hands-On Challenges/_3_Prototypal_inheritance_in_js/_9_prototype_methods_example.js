/**
 * Prototype Methods and Property Descriptors
 * ===========================================
 * 
 * Deep dive into hasOwnProperty, getOwnPropertyNames,
 * getOwnPropertyDescriptor, and prototype method resolution.
 */


// =============================================================================
// Task: Create Property Inspection Utilities
// =============================================================================
/**
 * PART A: deepCloneWithPrototype(obj)
 * -----------------------------------
 * Create a deep clone of an object that preserves the prototype chain.
 * 
 * Requirements:
 * - Clone all own enumerable AND non-enumerable properties
 * - Preserve property descriptors (writable, enumerable, configurable)
 * - Recursively clone nested objects (preserving their prototypes too)
 * - Handle arrays properly (clone as arrays)
 * - Return primitives as-is
 * 
 * Example:
 *   const parent = { inherited: true };
 *   const obj = Object.create(parent);
 *   Object.defineProperty(obj, 'hidden', { value: 'secret', enumerable: false });
 *   obj.visible = 'public';
 *   
 *   const clone = deepCloneWithPrototype(obj);
 *   clone.visible;                    // 'public'
 *   clone.hidden;                     // 'secret'
 *   clone.inherited;                  // true (via prototype)
 *   Object.getPrototypeOf(clone) === parent; // true
 * 
 * 
 * PART B: comparePrototypes(obj1, obj2)
 * -------------------------------------
 * Compare two objects' prototype chains and return analysis.
 * 
 * Return object:
 * {
 *   samePrototype: boolean,        // Direct prototypes are the same object
 *   commonAncestor: object|null,   // First shared ancestor (excluding null)
 *   chain1Length: number,          // Length of obj1's chain
 *   chain2Length: number,          // Length of obj2's chain
 *   sharedMethods: string[]        // Method names available on both
 * }
 * 
 * Example:
 *   const arr1 = [1, 2];
 *   const arr2 = [3, 4];
 *   comparePrototypes(arr1, arr2);
 *   // {
 *   //   samePrototype: true,         // Both have Array.prototype
 *   //   commonAncestor: Array.prototype,
 *   //   chain1Length: 2,
 *   //   chain2Length: 2,
 *   //   sharedMethods: ['push', 'pop', ...] // Methods both have
 *   // }
 * 
 * 
 * PART C: createPropertyProxy(target)
 * -----------------------------------
 * Create a proxy-like object that tracks all property accesses.
 * 
 * Returns object with:
 *   - get(prop): Gets property value from target (works with prototype chain)
 *   - set(prop, value): Sets property on target
 *   - getAccessLog(): Returns array of { action: 'get'|'set', property: string, timestamp: number }
 *   - getAccessCount(prop): Returns how many times property was accessed (get or set)
 *   - clearLog(): Clears the access log
 * 
 * Example:
 *   const target = { a: 1, b: 2 };
 *   const proxy = createPropertyProxy(target);
 *   
 *   proxy.get('a');           // 1
 *   proxy.get('a');           // 1
 *   proxy.set('a', 10);
 *   proxy.getAccessCount('a'); // 3
 *   proxy.getAccessLog();      // [{action:'get', property:'a', ...}, ...]
 */

function deepCloneWithPrototype(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    
    // ========================================================
}


function comparePrototypes(obj1, obj2) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    // ========================================================
}


function createPropertyProxy(target) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    
    // ========================================================
}


module.exports = {
    deepCloneWithPrototype,
    comparePrototypes,
    createPropertyProxy
};
