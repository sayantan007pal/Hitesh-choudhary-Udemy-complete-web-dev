/**
 * Test Suite for Encapsulation Challenge #1
 * ==========================================
 * 
 * Run this file with: node _1_test_encapsulation_example.js
 * 
 * Tests your BankAccount implementation for:
 *   - Private field protection
 *   - Proper encapsulation
 *   - Validation logic
 *   - Transaction history management
 */

const { BankAccount } = require('./_1_encapsulation_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${JSON.stringify(expected)}`);
        console.log(`   Actual:   ${JSON.stringify(actual)}`);
        testsFailed++;
        return false;
    }
}

function assertThrows(fn, expectedMessage, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to throw: "${expectedMessage}"`);
        console.log(`   But no error was thrown`);
        testsFailed++;
        return false;
    } catch (error) {
        if (error.message === expectedMessage) {
            console.log(`✅ PASS: ${testName}`);
            testsPassed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Expected error: "${expectedMessage}"`);
            console.log(`   Actual error:   "${error.message}"`);
            testsFailed++;
            return false;
        }
    }
}

function assertDoesNotThrow(fn, testName) {
    totalTests++;
    try {
        fn();
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } catch (error) {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Unexpected error: "${error.message}"`);
        testsFailed++;
        return false;
    }
}

function assertArrayLength(array, expectedLength, testName) {
    totalTests++;
    if (array.length === expectedLength) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected length: ${expectedLength}`);
        console.log(`   Actual length:   ${array.length}`);
        testsFailed++;
        return false;
    }
}

function assertUndefined(value, testName) {
    totalTests++;
    if (value === undefined) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: undefined`);
        console.log(`   Actual:   ${value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Sections
// =============================================================================

console.log('\n' + '═'.repeat(70));
console.log('  ENCAPSULATION CHALLENGE #1 - TEST SUITE');
console.log('═'.repeat(70) + '\n');

// -----------------------------------------------------------------------------
// Test Section 1: Constructor and Basic Initialization
// -----------------------------------------------------------------------------
console.log('📦 Section 1: Constructor and Basic Initialization');
console.log('─'.repeat(50));

const account1 = new BankAccount('John Doe', 1000);
assertEqual(account1.getBalance(), 1000, 'Initial balance should be 1000');
assertEqual(account1.getAccountHolder(), 'John Doe', 'Account holder should be John Doe');

const account2 = new BankAccount('Jane Smith');
assertEqual(account2.getBalance(), 0, 'Default initial balance should be 0');

assertThrows(
    () => new BankAccount('', 100),
    'Account holder name cannot be empty',
    'Should throw for empty account holder name'
);

assertThrows(
    () => new BankAccount('   ', 100),
    'Account holder name cannot be empty',
    'Should throw for whitespace-only account holder name'
);

assertThrows(
    () => new BankAccount('Test User', -100),
    'Initial balance cannot be negative',
    'Should throw for negative initial balance'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 2: Deposit Functionality
// -----------------------------------------------------------------------------
console.log('💰 Section 2: Deposit Functionality');
console.log('─'.repeat(50));

const depositAccount = new BankAccount('Deposit Tester', 100);

const newBalance1 = depositAccount.deposit(50);
assertEqual(newBalance1, 150, 'Deposit should return new balance');
assertEqual(depositAccount.getBalance(), 150, 'Balance should be updated after deposit');

const newBalance2 = depositAccount.deposit(0.50);
assertEqual(newBalance2, 150.50, 'Should handle decimal deposits');

assertThrows(
    () => depositAccount.deposit(0),
    'Deposit amount must be positive',
    'Should throw for zero deposit'
);

assertThrows(
    () => depositAccount.deposit(-50),
    'Deposit amount must be positive',
    'Should throw for negative deposit'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 3: Withdraw Functionality
// -----------------------------------------------------------------------------
console.log('💸 Section 3: Withdraw Functionality');
console.log('─'.repeat(50));

const withdrawAccount = new BankAccount('Withdraw Tester', 500);

const afterWithdraw1 = withdrawAccount.withdraw(100);
assertEqual(afterWithdraw1, 400, 'Withdraw should return new balance');
assertEqual(withdrawAccount.getBalance(), 400, 'Balance should be updated after withdrawal');

const afterWithdraw2 = withdrawAccount.withdraw(400);
assertEqual(afterWithdraw2, 0, 'Should be able to withdraw entire balance');

assertThrows(
    () => withdrawAccount.withdraw(1),
    'Insufficient funds',
    'Should throw for insufficient funds'
);

const richAccount = new BankAccount('Rich Person', 1000);
assertThrows(
    () => richAccount.withdraw(0),
    'Withdrawal amount must be positive',
    'Should throw for zero withdrawal'
);

assertThrows(
    () => richAccount.withdraw(-100),
    'Withdrawal amount must be positive',
    'Should throw for negative withdrawal'
);

assertThrows(
    () => richAccount.withdraw(2000),
    'Insufficient funds',
    'Should throw when withdrawal exceeds balance'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 4: Transaction History
// -----------------------------------------------------------------------------
console.log('📜 Section 4: Transaction History');
console.log('─'.repeat(50));

const historyAccount = new BankAccount('History Tester', 500);
historyAccount.deposit(200);
historyAccount.withdraw(100);
historyAccount.deposit(50);

const history = historyAccount.getTransactionHistory();
assertArrayLength(history, 4, 'Should have 4 transactions (initial + 3 operations)');

assertEqual(history[0].type, 'deposit', 'First transaction should be initial deposit');
assertEqual(history[0].amount, 500, 'Initial deposit amount should be 500');

assertEqual(history[1].type, 'deposit', 'Second transaction should be deposit');
assertEqual(history[1].amount, 200, 'Deposit amount should be 200');

assertEqual(history[2].type, 'withdraw', 'Third transaction should be withdrawal');
assertEqual(history[2].amount, 100, 'Withdrawal amount should be 100');

assertEqual(history[3].type, 'deposit', 'Fourth transaction should be deposit');
assertEqual(history[3].amount, 50, 'Deposit amount should be 50');

assertEqual(historyAccount.getTransactionCount(), 4, 'Transaction count should be 4');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 5: Encapsulation - Private Field Protection
// -----------------------------------------------------------------------------
console.log('🔒 Section 5: Private Field Protection (Encapsulation)');
console.log('─'.repeat(50));

const privateAccount = new BankAccount('Private Tester', 1000);

// Attempting to access private fields should return undefined
assertUndefined(privateAccount.balance, 'balance should not be directly accessible');
assertUndefined(privateAccount._balance, '_balance should not be accessible');
assertUndefined(privateAccount.transactionHistory, 'transactionHistory should not be accessible');
assertUndefined(privateAccount.accountHolder, 'accountHolder should not be accessible');

// Verify that returned history is a copy, not the original
const historyRef1 = privateAccount.getTransactionHistory();
const historyRef2 = privateAccount.getTransactionHistory();

totalTests++;
if (historyRef1 !== historyRef2) {
    console.log('✅ PASS: getTransactionHistory returns a copy, not the original');
    testsPassed++;
} else {
    console.log('❌ FAIL: getTransactionHistory should return a new array each time');
    testsFailed++;
}

// Modify the returned array and verify original is unchanged
historyRef1.push({ type: 'fake', amount: 999 });
assertEqual(
    privateAccount.getTransactionHistory().length,
    1,
    'Original transaction history should not be modified'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 6: Edge Cases
// -----------------------------------------------------------------------------
console.log('🔍 Section 6: Edge Cases');
console.log('─'.repeat(50));

// Test with zero initial balance (no initial deposit recorded)
const zeroAccount = new BankAccount('Zero Starter');
assertEqual(zeroAccount.getTransactionCount(), 0, 'Zero initial balance should not record transaction');

// Test multiple operations in sequence
const sequenceAccount = new BankAccount('Sequence Tester', 1000);
sequenceAccount.deposit(500);
sequenceAccount.withdraw(200);
sequenceAccount.deposit(100);
sequenceAccount.withdraw(900);
assertEqual(sequenceAccount.getBalance(), 500, 'Balance after multiple operations should be 500');

// Test very small amounts
const smallAccount = new BankAccount('Small Tester', 0.01);
smallAccount.deposit(0.01);
assertEqual(smallAccount.getBalance(), 0.02, 'Should handle very small amounts');

console.log('');

// =============================================================================
// Test Results Summary
// =============================================================================

console.log('═'.repeat(70));
console.log('  TEST RESULTS SUMMARY');
console.log('═'.repeat(70));
console.log(`  Total Tests: ${totalTests}`);
console.log(`  ✅ Passed:   ${testsPassed}`);
console.log(`  ❌ Failed:   ${testsFailed}`);
console.log('═'.repeat(70));

if (testsFailed === 0) {
    console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉');
    console.log('You have successfully demonstrated ENCAPSULATION in JavaScript!');
    console.log('\n📖 Key Takeaways:');
    console.log('   • Private fields (#) protect internal state');
    console.log('   • Public methods provide controlled access');
    console.log('   • Validation ensures data integrity');
    console.log('   • Returning copies prevents external modification\n');
} else {
    console.log('\n⚠️  Some tests failed. Review the errors above and try again!');
    console.log('💡 Tip: Check your validation logic and private field declarations.\n');
}

process.exit(testsFailed > 0 ? 1 : 0);
