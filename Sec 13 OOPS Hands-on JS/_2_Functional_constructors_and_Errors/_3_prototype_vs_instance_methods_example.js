/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    CONSTRUCTOR FUNCTIONS CHALLENGE 3                         ║
 * ║          📦 Prototype Methods vs Instance Methods - Memory & Usage 📦        ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * There are TWO ways to add methods to objects created by constructors:
 * 
 * 1. INSTANCE METHODS (inside constructor):
 *    - Each instance gets its OWN copy of the method
 *    - Uses MORE memory (duplicated for every object)
 *    - CAN access private variables via closure
 * 
 * 2. PROTOTYPE METHODS (on Constructor.prototype):
 *    - All instances SHARE one copy of the method
 *    - Uses LESS memory (only one function exists)
 *    - CANNOT access closure variables in constructor
 * 
 * This is a VERY common interview question!
 * 
 * 
 * 🎯 TASK: Demonstrate and Compare Both Approaches
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a constructor `BankAccountInstance` that:
 *    - Takes `owner` and initial `balance` parameters
 *    - Has INSTANCE methods (defined inside constructor):
 *      - deposit(amount): adds to balance, returns new balance
 *      - withdraw(amount): subtracts from balance, returns new balance
 *      - getBalance(): returns current balance
 *    - Balance should be truly PRIVATE (not accessible directly)
 * 
 * 2. Create a constructor `BankAccountPrototype` that:
 *    - Takes `owner` and initial `balance` parameters
 *    - Stores balance as this._balance (convention for "private")
 *    - Has PROTOTYPE methods:
 *      - deposit(amount): adds to _balance, returns new balance
 *      - withdraw(amount): subtracts from _balance, returns new balance
 *      - getBalance(): returns current _balance
 * 
 * 3. Create a function `compareMemoryUsage(n)` that:
 *    - Creates n instances of each type
 *    - Returns an object showing whether methods are shared:
 *    - { instanceMethodsShared: boolean, prototypeMethodsShared: boolean }
 * 
 * 4. Create a function `testPrivacy()` that:
 *    - Creates one of each account type with $100
 *    - Tries to access balance directly (account.balance or account._balance)
 *    - Returns { instancePrivate: boolean, prototypePrivate: boolean }
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - BankAccountInstance must use closures for true privacy
 * - BankAccountPrototype uses _ prefix convention
 * - Both should work correctly for deposits/withdrawals
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - Variables declared in constructor (not with this.) are private
 * - Prototype methods can only access this.properties
 * - Use closure to capture private variables for instance methods
 * 
 * 
 * 📝 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Use prototype methods for memory efficiency when privacy isn't needed.
 *  Use instance methods with closures when you need true private state."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * BankAccountInstance - Uses instance methods with closure for privacy
 * @param {string} owner - Account owner name
 * @param {number} balance - Initial balance
 */
function BankAccountInstance(owner, balance) {
    // ==================== YOUR CODE HERE ====================
    // Remember: 'let' or 'const' variables here are private!
    // Methods that access them must be defined here (instance methods)
    
    
    // ========================================================
}


/**
 * BankAccountPrototype - Uses prototype methods with _ convention
 * @param {string} owner - Account owner name
 * @param {number} balance - Initial balance
 */
function BankAccountPrototype(owner, balance) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// BankAccountPrototype prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Compares memory usage between instance and prototype methods
 * @param {number} n - Number of instances to create
 * @returns {Object} - { instanceMethodsShared: boolean, prototypeMethodsShared: boolean }
 */
function compareMemoryUsage(n) {
    // ==================== YOUR CODE HERE ====================
    // Create n instances of each type
    // Check if methods are the same reference across instances
    // Instance methods: each instance has own copy (different references)
    // Prototype methods: all instances share same method (same reference)
    
    
    // ========================================================
}


/**
 * Tests privacy of both approaches
 * @returns {Object} - { instancePrivate: boolean, prototypePrivate: boolean }
 */
function testPrivacy() {
    // ==================== YOUR CODE HERE ====================
    // Create accounts with initial $100
    // Check if balance can be accessed directly
    // instancePrivate: true if account.balance is undefined
    // prototypePrivate: false because account._balance is accessible
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    BankAccountInstance,
    BankAccountPrototype,
    compareMemoryUsage,
    testPrivacy
};
