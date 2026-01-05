/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    CONSTRUCTOR FUNCTIONS CHALLENGE 8                         ║
 * ║              🔐 Private Data with Closures in Constructors 🔐                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * JavaScript didn't have true private class fields until ES2022 (#privateField).
 * Before that, developers used CLOSURES in constructors to create private data.
 * 
 * Pattern:
 * - Declare variables with let/const inside constructor (not this.xxx)
 * - Create privileged methods (this.xxx = function) that access those variables
 * - Variables are captured in closure, inaccessible from outside
 * 
 * Trade-off: These methods can't be on prototype (they need closure access)
 * 
 * 
 * 🎯 TASK: Implement Private Data Patterns
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a constructor `SecureCounter` that:
 *    - Has PRIVATE count variable (starting at 0)
 *    - Has methods: increment(), decrement(), getCount(), reset()
 *    - count should NOT be accessible via this.count or any property
 * 
 * 2. Create a constructor `SecureUser` that:
 *    - Takes `username` and `password` parameters
 *    - username is PUBLIC (this.username)
 *    - password is PRIVATE (cannot be accessed directly)
 *    - Has methods:
 *      - validatePassword(attempt): returns true if attempt matches password
 *      - changePassword(oldPass, newPass): changes password if oldPass is correct
 *        - Returns true if successful, false if oldPass is wrong
 * 
 * 3. Create a constructor `SecureWallet` that:
 *    - Takes initial `balance` (must be non-negative)
 *    - Has PRIVATE balance and transaction history
 *    - Has methods:
 *      - deposit(amount): adds to balance, records transaction
 *      - withdraw(amount): subtracts if sufficient funds, records transaction
 *        - Returns true if successful, false if insufficient
 *      - getBalance(): returns current balance
 *      - getTransactionCount(): returns number of transactions
 *      - getLastTransaction(): returns last transaction object {type, amount}
 * 
 * 4. Create a function `isPrivateImplementation(Constructor)` that:
 *    - Tests if a constructor uses closure-based privacy
 *    - Returns true if certain expected properties are undefined on instance
 *    - Returns false if they're accessible
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - Private data must be truly inaccessible from outside
 * - Cannot use ES2022 # private fields (use closure pattern)
 * - Methods that access private data must be instance methods
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - let/const in constructor creates closure variables
 * - this.method = function() {} creates privileged method with closure access
 * - Don't use this.xxx for private data
 * - Transaction can be { type: 'deposit'|'withdraw', amount: number }
 * 
 * 
 * 📝 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Closure-based privacy was the standard pattern before private fields.
 *  The trade-off is memory efficiency - methods can't be shared on prototype."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * SecureCounter - Counter with private count
 */
function SecureCounter() {
    // ==================== YOUR CODE HERE ====================
    // Declare private count variable
    // Create privileged methods that access it
    
    
    // ========================================================
}


/**
 * SecureUser - User with private password
 * @param {string} username - Public username
 * @param {string} password - Private password
 */
function SecureUser(username, password) {
    // ==================== YOUR CODE HERE ====================
    // username is public (this.username)
    // password is private (closure variable)
    
    
    // ========================================================
}


/**
 * SecureWallet - Wallet with private balance and history
 * @param {number} balance - Initial balance (must be >= 0)
 */
function SecureWallet(balance) {
    // ==================== YOUR CODE HERE ====================
    // Private balance and transactions array
    // Methods for deposit, withdraw, getBalance, etc.
    
    
    // ========================================================
}


/**
 * Tests if a constructor uses closure-based privacy
 * @param {Function} Constructor - Constructor to test
 * @returns {boolean} - True if uses closure privacy
 */
function isPrivateImplementation(Constructor) {
    // ==================== YOUR CODE HERE ====================
    // Create an instance and check if expected "private" properties are undefined
    // For SecureCounter: instance.count should be undefined
    // For SecureUser: instance.password should be undefined
    // For SecureWallet: instance.balance and instance.transactions should be undefined
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    SecureCounter,
    SecureUser,
    SecureWallet,
    isPrivateImplementation
};
