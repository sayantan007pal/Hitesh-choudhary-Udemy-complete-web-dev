/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    CONSTRUCTOR FUNCTIONS CHALLENGE 9                         ║
 * ║              🧩 Constructor Composition & Mixins Pattern 🧩                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * JavaScript only supports single inheritance. To share functionality across
 * unrelated constructors, we use COMPOSITION over inheritance:
 * 
 * MIXINS: Objects containing methods to be copied to other prototypes
 * COMPOSITION: Building objects by combining multiple sources of functionality
 * 
 * Why composition?
 * - Avoids deep inheritance hierarchies
 * - More flexible than single inheritance
 * - Promotes code reuse across unrelated types
 * 
 * 
 * 🎯 TASK: Implement Composition Patterns
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a mixin object `canFly` with:
 *    - fly(): returns "[name] is flying!"
 *    - land(): returns "[name] has landed"
 *    - Assumes `this.name` exists on target
 * 
 * 2. Create a mixin object `canSwim` with:
 *    - swim(): returns "[name] is swimming!"
 *    - dive(): returns "[name] is diving deep"
 * 
 * 3. Create a mixin object `canWalk` with:
 *    - walk(): returns "[name] is walking"
 *    - run(): returns "[name] is running!"
 * 
 * 4. Create a function `mixin(Target, ...sources)` that:
 *    - Copies all methods from source objects to Target.prototype
 *    - Does NOT overwrite existing methods on Target.prototype
 *    - Returns Target
 * 
 * 5. Create a constructor `Bird` that:
 *    - Takes `name` parameter
 *    - Uses canFly mixin
 *    - Has own method `chirp()` returning "[name] chirps!"
 * 
 * 6. Create a constructor `Duck` that:
 *    - Takes `name` parameter  
 *    - Uses BOTH canFly AND canSwim mixins
 *    - Has own method `quack()` returning "Quack!"
 * 
 * 7. Create a constructor `Penguin` that:
 *    - Takes `name` parameter
 *    - Uses canSwim AND canWalk mixins (penguins can't fly!)
 *    - Has own method `waddle()` returning "[name] waddles cutely"
 * 
 * 8. Create a function `listMixedMethods(obj)` that:
 *    - Returns array of method names that came from mixins
 *    - (Methods not defined directly on the constructor's own prototype)
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - Mixins must be plain objects (not constructors)
 * - mixin() must work with any constructor
 * - Own methods must NOT be overwritten by mixins
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - Use Object.assign() or manual copying
 * - Check if property already exists before copying
 * - Mixins assume `this` will have necessary properties
 * 
 * 
 * 📝 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Mixins provide a way to share behavior across unrelated objects.
 *  They're an alternative to inheritance when 'is-a' doesn't apply."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Mixin for flying capability
 */
const canFly = {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
};


/**
 * Mixin for swimming capability
 */
const canSwim = {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
};


/**
 * Mixin for walking capability
 */
const canWalk = {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
};


/**
 * Applies mixins to a constructor's prototype
 * @param {Function} Target - Target constructor
 * @param {...Object} sources - Source mixin objects
 * @returns {Function} - The Target constructor
 */
function mixin(Target, ...sources) {
    // ==================== YOUR CODE HERE ====================
    // Copy methods from sources to Target.prototype
    // Don't overwrite existing methods
    
    
    // ========================================================
}


/**
 * Bird Constructor - uses canFly
 * @param {string} name - Bird's name
 */
function Bird(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Bird prototype methods and mixin
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Duck Constructor - uses canFly and canSwim
 * @param {string} name - Duck's name
 */
function Duck(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Duck prototype methods and mixins
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Penguin Constructor - uses canSwim and canWalk
 * @param {string} name - Penguin's name
 */
function Penguin(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Penguin prototype methods and mixins
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Lists methods that came from mixins
 * @param {Object} obj - Object to inspect
 * @returns {Array<string>} - Array of mixin method names
 */
function listMixedMethods(obj) {
    // ==================== YOUR CODE HERE ====================
    // Return method names that were added via mixins
    // These are methods on prototype that aren't constructor's own originally
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    canFly,
    canSwim,
    canWalk,
    mixin,
    Bird,
    Duck,
    Penguin,
    listMixedMethods
};
