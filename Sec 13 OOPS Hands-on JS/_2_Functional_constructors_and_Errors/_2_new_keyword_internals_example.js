/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    CONSTRUCTOR FUNCTIONS CHALLENGE 2                         ║
 * ║               🔧 Understanding the 'new' Keyword Internals 🔧                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * The 'new' keyword does 4 things behind the scenes:
 *   1. Creates a new empty object {}
 *   2. Sets the object's __proto__ to Constructor.prototype
 *   3. Executes the constructor with 'this' bound to the new object
 *   4. Returns the object (unless constructor returns a different object)
 * 
 * Understanding this is CRUCIAL for interviews!
 * 
 * 
 * 🎯 TASK: Implement Your Own 'new' Operator
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a function `customNew(Constructor, ...args)` that:
 *    - Mimics exactly what the 'new' keyword does
 *    - Creates a new object with the correct prototype
 *    - Calls the constructor with the provided arguments
 *    - Returns the correct value (handles explicit returns properly)
 * 
 * 2. Create a constructor function `Car` that:
 *    - Takes `brand` and `model` parameters
 *    - Assigns them to this.brand and this.model
 *    - Has a `getInfo()` method on prototype that returns "[brand] [model]"
 * 
 * 3. Create a constructor function `SpecialCar` that:
 *    - Takes `brand` parameter
 *    - Returns a CUSTOM object { type: 'special', brand: brand }
 *    - (This tests the edge case where constructor returns an object)
 * 
 * 4. Create a function `whatNewDoes(Constructor, args)` that:
 *    - Returns an object describing the 4 steps the 'new' keyword performs
 *    - Format: { step1: "...", step2: "...", step3: "...", step4: "..." }
 * 
 * 5. Create a function `compareNewVsNoNew(Constructor, ...args)` that:
 *    - Returns { withNew: result1, withoutNew: result2 }
 *    - result1 is the object created with 'new'
 *    - result2 is what happens when calling without 'new' (wrapped in try-catch)
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - customNew must work exactly like the built-in 'new' operator
 * - Must handle constructors that return objects differently
 * - Must properly set up the prototype chain
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - Use Object.create() to create an object with specific prototype
 * - Use Function.prototype.apply() or call() to invoke constructor
 * - Check if constructor returns an object (and it's not null)
 * 
 * 
 * 📝 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Being able to implement your own 'new' operator demonstrates deep 
 *  understanding of JavaScript's object creation mechanism."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Custom implementation of the 'new' operator
 * @param {Function} Constructor - The constructor function
 * @param {...any} args - Arguments to pass to the constructor
 * @returns {Object} - The newly created instance
 */
function customNew(Constructor, ...args) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Car Constructor
 * @param {string} brand - The car brand
 * @param {string} model - The car model
 */
function Car(brand, model) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Car prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * SpecialCar Constructor - Returns a custom object
 * @param {string} brand - The car brand
 * @returns {Object} - Custom object instead of 'this'
 */
function SpecialCar(brand) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Describes what the 'new' keyword does in 4 steps
 * @param {Function} Constructor - The constructor function
 * @param {Array} args - Array of arguments
 * @returns {Object} - Object with step1, step2, step3, step4 descriptions
 */
function whatNewDoes(Constructor, args) {
    // ==================== YOUR CODE HERE ====================
    // Return an object with step1, step2, step3, step4 string descriptions
    // Example:
    // return {
    //     step1: "Creates empty object {}",
    //     step2: "Sets obj.__proto__ to Constructor.prototype",
    //     step3: "Calls Constructor with 'this' bound to new object",
    //     step4: "Returns the object (or explicit return if object)"
    // };
    
    
    // ========================================================
}


/**
 * Compares calling a constructor with and without 'new'
 * @param {Function} Constructor - The constructor function
 * @param {...any} args - Arguments to pass
 * @returns {Object} - { withNew: result, withoutNew: result or error }
 */
function compareNewVsNoNew(Constructor, ...args) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    customNew,
    Car,
    SpecialCar,
    whatNewDoes,
    compareNewVsNoNew
};
