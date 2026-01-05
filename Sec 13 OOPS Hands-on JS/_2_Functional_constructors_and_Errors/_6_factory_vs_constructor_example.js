/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    CONSTRUCTOR FUNCTIONS CHALLENGE 6                         ║
 * ║              🏭 Factory Functions vs Constructor Functions 🏭                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * There are TWO common patterns for creating objects in JavaScript:
 * 
 * CONSTRUCTOR FUNCTION:
 * - Called with 'new' keyword
 * - Uses 'this' to attach properties
 * - Creates objects linked to Constructor.prototype
 * - Supports instanceof checks
 * 
 * FACTORY FUNCTION:
 * - Called like a regular function (no 'new')
 * - Returns a new object literal
 * - No prototype linkage (unless you add it)
 * - More flexible, easier to understand
 * - Better for composition over inheritance
 * 
 * 
 * 🎯 TASK: Implement Both Patterns and Compare
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a CONSTRUCTOR function `UserConstructor` that:
 *    - Takes `name` and `email` parameters
 *    - Has prototype method `getInfo()` returning "Name: [name], Email: [email]"
 *    - Has prototype method `updateEmail(newEmail)` that updates email
 * 
 * 2. Create a FACTORY function `createUser` that:
 *    - Takes `name` and `email` parameters
 *    - Returns an object with name, email properties
 *    - Has methods `getInfo()` and `updateEmail(newEmail)`
 *    - Uses closure for any "private" implementation
 * 
 * 3. Create a FACTORY function `createUserWithPrivate` that:
 *    - Takes `name` and `email` parameters
 *    - Keeps email PRIVATE (not directly accessible)
 *    - Has methods: getInfo(), getEmail(), updateEmail(newEmail)
 *    - Uses closure for true privacy
 * 
 * 4. Create a function `comparePatterns()` that returns:
 *    {
 *      constructor: { usesNew: boolean, hasPrototype: boolean, supportsInstanceOf: boolean },
 *      factory: { usesNew: boolean, hasPrototype: boolean, supportsInstanceOf: boolean }
 *    }
 * 
 * 5. Create a function `whichPatternFor(scenario)` that:
 *    - Takes a scenario description string
 *    - Returns 'constructor' or 'factory' based on best practice
 *    - Scenarios: 'need-instanceof', 'need-privacy', 'simple-objects', 'inheritance-heavy'
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - Constructor must work with 'new' and use prototype
 * - Factory must NOT use 'new' or 'this'
 * - Privacy factory must truly hide email (not accessible via dot notation)
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - Factory functions just return object literals
 * - Closures in factories provide true privacy
 * - Constructors are better for instanceof and inheritance
 * - Factories are better for composition and privacy
 * 
 * 
 * 📝 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Use constructors when you need instanceof checks or prototype inheritance.
 *  Use factories when you need simplicity, privacy, or composition."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * UserConstructor - Constructor function pattern
 * @param {string} name - User's name
 * @param {string} email - User's email
 */
function UserConstructor(name, email) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// UserConstructor prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * createUser - Factory function pattern
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @returns {Object} - User object
 */
function createUser(name, email) {
    // ==================== YOUR CODE HERE ====================
    // Return an object literal with properties and methods
    
    
    // ========================================================
}


/**
 * createUserWithPrivate - Factory with private data
 * @param {string} name - User's name  
 * @param {string} email - User's email (will be private)
 * @returns {Object} - User object with private email
 */
function createUserWithPrivate(name, email) {
    // ==================== YOUR CODE HERE ====================
    // Use closure to keep email private
    // Return object with methods to access/modify email
    
    
    // ========================================================
}


/**
 * Compares constructor and factory patterns
 * @returns {Object} - Comparison object
 */
function comparePatterns() {
    // ==================== YOUR CODE HERE ====================
    // Return object comparing both patterns
    
    
    // ========================================================
}


/**
 * Recommends which pattern to use for a scenario
 * @param {string} scenario - The scenario description
 * @returns {string} - 'constructor' or 'factory'
 */
function whichPatternFor(scenario) {
    // ==================== YOUR CODE HERE ====================
    // 'need-instanceof' -> constructor
    // 'need-privacy' -> factory
    // 'simple-objects' -> factory
    // 'inheritance-heavy' -> constructor
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    UserConstructor,
    createUser,
    createUserWithPrivate,
    comparePatterns,
    whichPatternFor
};
