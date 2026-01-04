/**
 * Module Pattern with Closures
 * =============================
 * 
 * Create a bank account with private state using closures.
 */

// =============================================================================
// Task: Create a Bank Account Module
// =============================================================================
/**
 * Create a function createBankAccount(initialBalance) that returns a bank
 * account object with private state and a controlled public API.
 * 
 * PRIVATE STATE (not accessible from outside):
 *   - balance: The current account balance
 *   - transactionHistory: Array of all transactions
 * 
 * PUBLIC METHODS:
 *   deposit(amount) - Adds amount to balance (if > 0), records transaction,
 *                     returns new balance. Returns unchanged if amount <= 0.
 *   
 *   withdraw(amount) - Subtracts amount (if > 0 and sufficient funds),
 *                      records transaction, returns new balance.
 *                      Returns "Insufficient funds" if balance < amount.
 *   
 *   getBalance() - Returns current balance
 *   
 *   getTransactionHistory() - Returns a COPY of transaction history
 *   
 *   getTransactionCount() - Returns total number of transactions
 * 
 * Transaction format: { type: 'deposit'/'withdraw', amount: <n>, timestamp: <Date.now()> }
 */

function createBankAccount(initialBalance) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

module.exports = { createBankAccount };
