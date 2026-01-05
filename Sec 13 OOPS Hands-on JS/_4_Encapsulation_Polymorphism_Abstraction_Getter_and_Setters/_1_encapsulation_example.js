/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              ENCAPSULATION IN JAVASCRIPT - CHALLENGE #1                      ║
 * ║                   🔒 Bank Account with Private Balance 🔒                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT REVIEW:
 * ━━━━━━━━━━━━━━━━━━━
 * Encapsulation is BUNDLING data and methods together while HIDING internal 
 * details. Data can only be accessed through controlled methods (getters/setters).
 * 
 * In JavaScript, we use:
 *   - # prefix for truly private fields (ES2022+)
 *   - Getters/Setters for controlled access
 *   - Private methods to hide implementation details
 * 
 * 
 * 🎯 YOUR CHALLENGE:
 * ━━━━━━━━━━━━━━━━━━━
 * Create a BankAccount class that demonstrates proper encapsulation:
 * 
 * Requirements:
 * 1. Private field #balance (starts at 0 or initial amount from constructor)
 * 2. Private field #transactionHistory (array to store all transactions)
 * 3. Private field #accountHolder (string - account holder's name)
 * 4. Private method #recordTransaction(type, amount) to log transactions
 * 
 * Public Methods:
 * - constructor(accountHolder, initialBalance = 0)
 * - deposit(amount) - adds money, returns new balance, throws if amount <= 0
 * - withdraw(amount) - removes money, returns new balance
 *                      throws if amount <= 0 or insufficient funds
 * - getBalance() - returns current balance
 * - getAccountHolder() - returns account holder name
 * - getTransactionHistory() - returns copy of transaction history (not original!)
 * - getTransactionCount() - returns number of transactions
 * 
 * Validation Rules:
 * - Cannot deposit negative or zero amounts
 * - Cannot withdraw negative or zero amounts
 * - Cannot withdraw more than available balance
 * - Account holder name cannot be empty
 * 
 * Transaction History Format:
 * { type: 'deposit' | 'withdraw', amount: number, balance: number, date: Date }
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━━
 * - Use # for private fields
 * - Return a COPY of transaction history using [...this.#transactionHistory]
 * - Throw Error objects with descriptive messages
 * - Remember to call #recordTransaction after each successful operation
 */


// =============================================================================
// YOUR IMPLEMENTATION HERE
// =============================================================================

class BankAccount {
    // Private fields
    #balance;
    #transactionHistory;
    #accountHolder;

    constructor(accountHolder, initialBalance = 0) {
        // ==================== YOUR CODE HERE ====================
        // Validate accountHolder is not empty
        // Validate initialBalance is not negative
        // Initialize private fields
        // Record initial deposit if initialBalance > 0
        
        if (!accountHolder || accountHolder.trim() === '') {
            throw new Error('Account holder name cannot be empty');
        }
        if (initialBalance < 0) {
            throw new Error('Initial balance cannot be negative');
        }
        
        this.#accountHolder = accountHolder;
        this.#balance = 0;
        this.#transactionHistory = [];
        
        if (initialBalance > 0) {
            this.#balance = initialBalance;
            this.#recordTransaction('deposit', initialBalance);
        }
        // ========================================================
    }

    // Private method to record transactions
    #recordTransaction(type, amount) {
        // ==================== YOUR CODE HERE ====================
        // Push transaction object to history
        
        this.#transactionHistory.push({
            type,
            amount,
            balance: this.#balance,
            date: new Date()
        });
        // ========================================================
    }

    deposit(amount) {
        // ==================== YOUR CODE HERE ====================
        // Validate amount > 0
        // Add to balance
        // Record transaction
        // Return new balance
        
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        
        this.#balance += amount;
        this.#recordTransaction('deposit', amount);
        return this.#balance;
        // ========================================================
    }

    withdraw(amount) {
        // ==================== YOUR CODE HERE ====================
        // Validate amount > 0
        // Check sufficient funds
        // Subtract from balance
        // Record transaction
        // Return new balance
        
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        
        this.#balance -= amount;
        this.#recordTransaction('withdraw', amount);
        return this.#balance;
        // ========================================================
    }

    getBalance() {
        // ==================== YOUR CODE HERE ====================
        return this.#balance;
        // ========================================================
    }

    getAccountHolder() {
        // ==================== YOUR CODE HERE ====================
        return this.#accountHolder;
        // ========================================================
    }

    getTransactionHistory() {
        // ==================== YOUR CODE HERE ====================
        // Return a COPY, not the original array!
        return [...this.#transactionHistory];
        // ========================================================
    }

    getTransactionCount() {
        // ==================== YOUR CODE HERE ====================
        return this.#transactionHistory.length;
        // ========================================================
    }
}


// =============================================================================
// EXPORTS (Do not modify)
// =============================================================================
module.exports = { BankAccount };
