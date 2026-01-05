/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: Private Data with Closures in Constructors                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _8_test_private_data_closures_example.js
 */

const {
    SecureCounter,
    SecureUser,
    SecureWallet,
    isPrivateImplementation
} = require('./_8_private_data_closures_example.js');

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

function assertTrue(condition, testName) {
    totalTests++;
    if (condition === true) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: true`);
        console.log(`   Actual:   ${condition}`);
        testsFailed++;
        return false;
    }
}

function assertFalse(condition, testName) {
    totalTests++;
    if (condition === false) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: false`);
        console.log(`   Actual:   ${condition}`);
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

function assertTypeOf(value, expectedType, testName) {
    totalTests++;
    const actualType = typeof value;
    if (actualType === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${expectedType}`);
        console.log(`   Actual type:   ${actualType}`);
        testsFailed++;
        return false;
    }
}

function assertDeepEqual(actual, expected, testName) {
    totalTests++;
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    if (isEqual) {
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

function printSectionHeader(title) {
    console.log('\n' + '='.repeat(70));
    console.log(`📋 ${title}`);
    console.log('='.repeat(70));
}

function printFinalResults() {
    console.log('\n' + '═'.repeat(70));
    console.log('📊 FINAL RESULTS');
    console.log('═'.repeat(70));
    console.log(`   Total Tests:  ${totalTests}`);
    console.log(`   ✅ Passed:    ${testsPassed}`);
    console.log(`   ❌ Failed:    ${testsFailed}`);
    console.log(`   Success Rate: ${((testsPassed / totalTests) * 100).toFixed(1)}%`);
    console.log('═'.repeat(70));
    
    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉\n');
    } else {
        console.log('\n💪 Keep trying! Review the failed tests and try again.\n');
    }
}

// =============================================================================
// TEST SUITE
// =============================================================================

console.log('\n🧪 Running Private Data with Closures Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: SecureCounter Basic Functionality
// -----------------------------------------------------------------------------
printSectionHeader('SECURE COUNTER - BASIC FUNCTIONALITY');

const counter1 = new SecureCounter();

// Check methods exist
assertTypeOf(counter1.increment, 'function', 'SecureCounter has increment method');
assertTypeOf(counter1.decrement, 'function', 'SecureCounter has decrement method');
assertTypeOf(counter1.getCount, 'function', 'SecureCounter has getCount method');
assertTypeOf(counter1.reset, 'function', 'SecureCounter has reset method');

// Check functionality
assertEqual(counter1.getCount(), 0, 'Initial count is 0');
counter1.increment();
assertEqual(counter1.getCount(), 1, 'Count is 1 after increment');
counter1.increment();
counter1.increment();
assertEqual(counter1.getCount(), 3, 'Count is 3 after 3 increments');
counter1.decrement();
assertEqual(counter1.getCount(), 2, 'Count is 2 after decrement');
counter1.reset();
assertEqual(counter1.getCount(), 0, 'Count is 0 after reset');

// -----------------------------------------------------------------------------
// Section 2: SecureCounter Privacy
// -----------------------------------------------------------------------------
printSectionHeader('SECURE COUNTER - PRIVACY');

const counter2 = new SecureCounter();
counter2.increment();
counter2.increment();

// count should NOT be accessible
assertUndefined(counter2.count, 'count is not directly accessible');
assertUndefined(counter2._count, '_count is not accessible');
assertUndefined(counter2.__count, '__count is not accessible');

// Trying to set count directly should NOT affect actual count
counter2.count = 999;
assertEqual(counter2.getCount(), 2, 'Direct assignment does not affect private count');

// -----------------------------------------------------------------------------
// Section 3: SecureUser Functionality
// -----------------------------------------------------------------------------
printSectionHeader('SECURE USER - FUNCTIONALITY');

const user1 = new SecureUser('alice', 'secret123');

// Username is public
assertEqual(user1.username, 'alice', 'Username is publicly accessible');

// Check methods
assertTypeOf(user1.validatePassword, 'function', 'SecureUser has validatePassword method');
assertTypeOf(user1.changePassword, 'function', 'SecureUser has changePassword method');

// Password validation
assertTrue(user1.validatePassword('secret123'), 'Correct password validates');
assertFalse(user1.validatePassword('wrongpass'), 'Wrong password does not validate');
assertFalse(user1.validatePassword(''), 'Empty password does not validate');

// Change password
assertTrue(user1.changePassword('secret123', 'newpass456'), 'Password change succeeds with correct old password');
assertTrue(user1.validatePassword('newpass456'), 'New password validates');
assertFalse(user1.validatePassword('secret123'), 'Old password no longer validates');

// Failed password change
assertFalse(user1.changePassword('wrongpass', 'anotherpass'), 'Password change fails with wrong old password');
assertTrue(user1.validatePassword('newpass456'), 'Password unchanged after failed change');

// -----------------------------------------------------------------------------
// Section 4: SecureUser Privacy
// -----------------------------------------------------------------------------
printSectionHeader('SECURE USER - PRIVACY');

const user2 = new SecureUser('bob', 'bobspassword');

// Password should NOT be accessible
assertUndefined(user2.password, 'password is not directly accessible');
assertUndefined(user2._password, '_password is not accessible');

// Trying to set password directly should NOT work
user2.password = 'hacked';
assertTrue(user2.validatePassword('bobspassword'), 'Direct assignment does not affect private password');

// -----------------------------------------------------------------------------
// Section 5: SecureWallet Functionality
// -----------------------------------------------------------------------------
printSectionHeader('SECURE WALLET - FUNCTIONALITY');

const wallet1 = new SecureWallet(100);

// Check methods
assertTypeOf(wallet1.deposit, 'function', 'SecureWallet has deposit method');
assertTypeOf(wallet1.withdraw, 'function', 'SecureWallet has withdraw method');
assertTypeOf(wallet1.getBalance, 'function', 'SecureWallet has getBalance method');
assertTypeOf(wallet1.getTransactionCount, 'function', 'SecureWallet has getTransactionCount method');
assertTypeOf(wallet1.getLastTransaction, 'function', 'SecureWallet has getLastTransaction method');

// Initial state
assertEqual(wallet1.getBalance(), 100, 'Initial balance is correct');
assertEqual(wallet1.getTransactionCount(), 0, 'Initial transaction count is 0');

// Deposit
wallet1.deposit(50);
assertEqual(wallet1.getBalance(), 150, 'Balance after deposit');
assertEqual(wallet1.getTransactionCount(), 1, 'Transaction count after deposit');
assertDeepEqual(wallet1.getLastTransaction(), { type: 'deposit', amount: 50 }, 'Last transaction is deposit');

// Withdraw success
assertTrue(wallet1.withdraw(30), 'Withdraw succeeds with sufficient funds');
assertEqual(wallet1.getBalance(), 120, 'Balance after withdraw');
assertEqual(wallet1.getTransactionCount(), 2, 'Transaction count after withdraw');
assertDeepEqual(wallet1.getLastTransaction(), { type: 'withdraw', amount: 30 }, 'Last transaction is withdraw');

// Withdraw failure (insufficient funds)
assertFalse(wallet1.withdraw(200), 'Withdraw fails with insufficient funds');
assertEqual(wallet1.getBalance(), 120, 'Balance unchanged after failed withdraw');
assertEqual(wallet1.getTransactionCount(), 2, 'Transaction count unchanged after failed withdraw');

// -----------------------------------------------------------------------------
// Section 6: SecureWallet Privacy
// -----------------------------------------------------------------------------
printSectionHeader('SECURE WALLET - PRIVACY');

const wallet2 = new SecureWallet(500);

// Balance should NOT be accessible
assertUndefined(wallet2.balance, 'balance is not directly accessible');
assertUndefined(wallet2._balance, '_balance is not accessible');

// Transactions should NOT be accessible
assertUndefined(wallet2.transactions, 'transactions is not directly accessible');
assertUndefined(wallet2._transactions, '_transactions is not accessible');

// Direct assignment should NOT work
wallet2.balance = 999999;
assertEqual(wallet2.getBalance(), 500, 'Direct assignment does not affect private balance');

// -----------------------------------------------------------------------------
// Section 7: Multiple Instances Independence
// -----------------------------------------------------------------------------
printSectionHeader('MULTIPLE INSTANCES INDEPENDENCE');

const counterA = new SecureCounter();
const counterB = new SecureCounter();

counterA.increment();
counterA.increment();
counterB.increment();

assertEqual(counterA.getCount(), 2, 'Counter A has count 2');
assertEqual(counterB.getCount(), 1, 'Counter B has count 1 (independent)');

const walletA = new SecureWallet(100);
const walletB = new SecureWallet(200);

walletA.deposit(50);

assertEqual(walletA.getBalance(), 150, 'Wallet A balance is 150');
assertEqual(walletB.getBalance(), 200, 'Wallet B balance unchanged (independent)');

// -----------------------------------------------------------------------------
// Section 8: isPrivateImplementation Function
// -----------------------------------------------------------------------------
printSectionHeader('IS PRIVATE IMPLEMENTATION FUNCTION');

assertTrue(
    isPrivateImplementation(SecureCounter),
    'SecureCounter uses private implementation'
);

assertTrue(
    isPrivateImplementation(SecureUser),
    'SecureUser uses private implementation'
);

assertTrue(
    isPrivateImplementation(SecureWallet),
    'SecureWallet uses private implementation'
);

// Test with a non-private constructor
function PublicCounter() {
    this.count = 0;
    this.increment = function() { this.count++; };
    this.getCount = function() { return this.count; };
}

assertFalse(
    isPrivateImplementation(PublicCounter),
    'PublicCounter does NOT use private implementation'
);

// -----------------------------------------------------------------------------
// Section 9: Edge Cases
// -----------------------------------------------------------------------------
printSectionHeader('EDGE CASES');

// Counter can go negative
const negCounter = new SecureCounter();
negCounter.decrement();
negCounter.decrement();
assertEqual(negCounter.getCount(), -2, 'Counter can go negative');

// Wallet with zero initial balance
const emptyWallet = new SecureWallet(0);
assertEqual(emptyWallet.getBalance(), 0, 'Wallet can start with 0');
assertFalse(emptyWallet.withdraw(1), 'Cannot withdraw from empty wallet');
emptyWallet.deposit(10);
assertEqual(emptyWallet.getBalance(), 10, 'Can deposit to empty wallet');

// Empty password
const emptyPassUser = new SecureUser('test', '');
assertTrue(emptyPassUser.validatePassword(''), 'Empty password validates with empty');
assertFalse(emptyPassUser.validatePassword('something'), 'Non-empty does not match empty');

// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
