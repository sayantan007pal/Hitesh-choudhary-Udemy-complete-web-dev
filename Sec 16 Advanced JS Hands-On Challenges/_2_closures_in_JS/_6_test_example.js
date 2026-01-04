/**
 * Test Suite for Bank Account Module Pattern
 * ===========================================
 * Run: node _6_test_example.js
 */

const { createBankAccount } = require('./_6_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${JSON.stringify(expected)}, Actual: ${JSON.stringify(actual)}`);
        testsFailed++;
    }
}

function assertTypeOf(value, expectedType, testName) {
    totalTests++;
    if (typeof value === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName} - Expected: ${expectedType}, Got: ${typeof value}`);
        testsFailed++;
    }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Bank Account Module Tests');
    console.log('='.repeat(60) + '\n');

    // Basic functionality
    console.log('📋 BASIC FUNCTIONALITY\n' + '-'.repeat(40));
    assertTypeOf(createBankAccount, 'function', 'createBankAccount is a function');
    
    const account = createBankAccount(100);
    assertTypeOf(account, 'object', 'Returns an object');
    assertTypeOf(account.deposit, 'function', 'deposit method exists');
    assertTypeOf(account.withdraw, 'function', 'withdraw method exists');
    assertTypeOf(account.getBalance, 'function', 'getBalance method exists');

    // Privacy tests
    console.log('\n📋 PRIVACY TESTS\n' + '-'.repeat(40));
    assertEqual(account.balance, undefined, 'balance is private');
    assertEqual(account.transactionHistory, undefined, 'transactionHistory is private');

    // Operations
    console.log('\n📋 OPERATIONS\n' + '-'.repeat(40));
    assertEqual(account.getBalance(), 100, 'Initial balance is 100');
    assertEqual(account.deposit(50), 150, 'Deposit 50 returns 150');
    assertEqual(account.getBalance(), 150, 'Balance after deposit is 150');
    assertEqual(account.withdraw(30), 120, 'Withdraw 30 returns 120');
    assertEqual(account.withdraw(200), "Insufficient funds", 'Overdraft returns error');
    assertEqual(account.getBalance(), 120, 'Balance unchanged after failed withdraw');

    // Edge cases
    console.log('\n📋 EDGE CASES\n' + '-'.repeat(40));
    assertEqual(account.deposit(0), 120, 'Deposit 0 returns unchanged balance');
    assertEqual(account.deposit(-50), 120, 'Deposit negative returns unchanged');
    assertEqual(account.withdraw(0), 120, 'Withdraw 0 returns unchanged');
    assertEqual(account.withdraw(-20), 120, 'Withdraw negative returns unchanged');

    // Transaction history
    console.log('\n📋 TRANSACTION HISTORY\n' + '-'.repeat(40));
    const newAccount = createBankAccount(500);
    newAccount.deposit(100);
    newAccount.withdraw(50);
    assertEqual(newAccount.getTransactionCount(), 2, 'Has 2 transactions');
    
    const history = newAccount.getTransactionHistory();
    assertEqual(Array.isArray(history), true, 'History is an array');
    assertEqual(history.length, 2, 'History has 2 entries');
    assertEqual(history[0].type, 'deposit', 'First transaction is deposit');
    assertEqual(history[1].type, 'withdraw', 'Second transaction is withdraw');
    
    // History is a copy
    history.push({ fake: true });
    assertEqual(newAccount.getTransactionHistory().length, 2, 'Original history unchanged');

    // Independence
    console.log('\n📋 INSTANCE INDEPENDENCE\n' + '-'.repeat(40));
    const acc1 = createBankAccount(1000);
    const acc2 = createBankAccount(500);
    acc1.withdraw(100);
    assertEqual(acc1.getBalance(), 900, 'Account 1 has 900');
    assertEqual(acc2.getBalance(), 500, 'Account 2 unchanged');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${testsPassed}/${totalTests} passed`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed!\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
