/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: Prototype Methods vs Instance Methods                        ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _3_test_prototype_vs_instance_methods_example.js
 */

const {
    BankAccountInstance,
    BankAccountPrototype,
    compareMemoryUsage,
    testPrivacy
} = require('./_3_prototype_vs_instance_methods_example.js');

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

console.log('\n🧪 Running Prototype vs Instance Methods Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: BankAccountInstance Basic Tests
// -----------------------------------------------------------------------------
printSectionHeader('BANK ACCOUNT INSTANCE - BASIC FUNCTIONALITY');

const instAccount1 = new BankAccountInstance('Alice', 100);

// Check methods exist
assertTypeOf(instAccount1.deposit, 'function', 'BankAccountInstance has deposit method');
assertTypeOf(instAccount1.withdraw, 'function', 'BankAccountInstance has withdraw method');
assertTypeOf(instAccount1.getBalance, 'function', 'BankAccountInstance has getBalance method');

// Check functionality
assertEqual(instAccount1.getBalance(), 100, 'Initial balance is correct');
assertEqual(instAccount1.deposit(50), 150, 'Deposit returns new balance');
assertEqual(instAccount1.getBalance(), 150, 'Balance updated after deposit');
assertEqual(instAccount1.withdraw(30), 120, 'Withdraw returns new balance');
assertEqual(instAccount1.getBalance(), 120, 'Balance updated after withdrawal');

// Check owner
assertEqual(instAccount1.owner, 'Alice', 'Owner is stored correctly');

// -----------------------------------------------------------------------------
// Section 2: BankAccountInstance Privacy Test
// -----------------------------------------------------------------------------
printSectionHeader('BANK ACCOUNT INSTANCE - PRIVACY');

const instAccount2 = new BankAccountInstance('Bob', 500);

// Balance should NOT be directly accessible
assertUndefined(instAccount2.balance, 'balance property is not directly accessible');
assertUndefined(instAccount2._balance, '_balance property is not accessible');

// But getBalance should work
assertEqual(instAccount2.getBalance(), 500, 'getBalance() still works');

// Cannot manipulate balance directly
instAccount2.balance = 999999;
assertEqual(instAccount2.getBalance(), 500, 'Direct assignment does not affect real balance');

// -----------------------------------------------------------------------------
// Section 3: BankAccountPrototype Basic Tests
// -----------------------------------------------------------------------------
printSectionHeader('BANK ACCOUNT PROTOTYPE - BASIC FUNCTIONALITY');

const protoAccount1 = new BankAccountPrototype('Charlie', 200);

// Check methods exist on prototype
assertTypeOf(BankAccountPrototype.prototype.deposit, 'function', 'deposit is on prototype');
assertTypeOf(BankAccountPrototype.prototype.withdraw, 'function', 'withdraw is on prototype');
assertTypeOf(BankAccountPrototype.prototype.getBalance, 'function', 'getBalance is on prototype');

// Check functionality
assertEqual(protoAccount1.getBalance(), 200, 'Initial balance is correct');
assertEqual(protoAccount1.deposit(100), 300, 'Deposit returns new balance');
assertEqual(protoAccount1.getBalance(), 300, 'Balance updated after deposit');
assertEqual(protoAccount1.withdraw(50), 250, 'Withdraw returns new balance');
assertEqual(protoAccount1.getBalance(), 250, 'Balance updated after withdrawal');

// Check owner
assertEqual(protoAccount1.owner, 'Charlie', 'Owner is stored correctly');

// -----------------------------------------------------------------------------
// Section 4: BankAccountPrototype Privacy Test (Convention Only)
// -----------------------------------------------------------------------------
printSectionHeader('BANK ACCOUNT PROTOTYPE - PRIVACY (CONVENTION)');

const protoAccount2 = new BankAccountPrototype('Diana', 300);

// _balance IS accessible (just convention, not truly private)
assertEqual(protoAccount2._balance, 300, '_balance is accessible (convention only)');

// Can be directly modified (this is the downside!)
protoAccount2._balance = 999;
assertEqual(protoAccount2.getBalance(), 999, '_balance can be modified directly');

// -----------------------------------------------------------------------------
// Section 5: Method Sharing Comparison
// -----------------------------------------------------------------------------
printSectionHeader('METHOD SHARING - INSTANCE VS PROTOTYPE');

const inst1 = new BankAccountInstance('Test1', 100);
const inst2 = new BankAccountInstance('Test2', 100);

// Instance methods are NOT shared (different function references)
assertFalse(
    inst1.deposit === inst2.deposit,
    'Instance methods are NOT shared (different references)'
);

const proto1 = new BankAccountPrototype('Test1', 100);
const proto2 = new BankAccountPrototype('Test2', 100);

// Prototype methods ARE shared (same function reference)
assertTrue(
    proto1.deposit === proto2.deposit,
    'Prototype methods ARE shared (same reference)'
);

assertTrue(
    proto1.deposit === BankAccountPrototype.prototype.deposit,
    'Prototype method equals Constructor.prototype method'
);

// -----------------------------------------------------------------------------
// Section 6: compareMemoryUsage Function
// -----------------------------------------------------------------------------
printSectionHeader('COMPARE MEMORY USAGE FUNCTION');

const memoryComparison = compareMemoryUsage(5);

assertTypeOf(memoryComparison, 'object', 'compareMemoryUsage returns an object');

assertFalse(
    memoryComparison.instanceMethodsShared,
    'instanceMethodsShared is false (each instance has own copy)'
);

assertTrue(
    memoryComparison.prototypeMethodsShared,
    'prototypeMethodsShared is true (all instances share)'
);

// -----------------------------------------------------------------------------
// Section 7: testPrivacy Function
// -----------------------------------------------------------------------------
printSectionHeader('TEST PRIVACY FUNCTION');

const privacyTest = testPrivacy();

assertTypeOf(privacyTest, 'object', 'testPrivacy returns an object');

assertTrue(
    privacyTest.instancePrivate,
    'instancePrivate is true (closure provides real privacy)'
);

assertFalse(
    privacyTest.prototypePrivate,
    'prototypePrivate is false (_balance is accessible)'
);

// -----------------------------------------------------------------------------
// Section 8: Multiple Operations
// -----------------------------------------------------------------------------
printSectionHeader('MULTIPLE OPERATIONS TEST');

const account = new BankAccountInstance('Eve', 1000);

// Chain of operations
account.deposit(500);
account.deposit(250);
account.withdraw(100);
account.withdraw(50);
assertEqual(account.getBalance(), 1600, 'Multiple operations work correctly');

const protoAcc = new BankAccountPrototype('Frank', 1000);

protoAcc.deposit(500);
protoAcc.deposit(250);
protoAcc.withdraw(100);
protoAcc.withdraw(50);
assertEqual(protoAcc.getBalance(), 1600, 'Multiple operations work on prototype version');

// -----------------------------------------------------------------------------
// Section 9: hasOwnProperty Tests
// -----------------------------------------------------------------------------
printSectionHeader('HAS OWN PROPERTY TESTS');

const instAcc = new BankAccountInstance('Test', 100);
const protoAcc2 = new BankAccountPrototype('Test', 100);

// Instance methods are own properties
assertTrue(
    instAcc.hasOwnProperty('deposit'),
    'Instance methods are own properties of the object'
);

// Prototype methods are NOT own properties
assertFalse(
    protoAcc2.hasOwnProperty('deposit'),
    'Prototype methods are NOT own properties (on prototype)'
);

assertTrue(
    BankAccountPrototype.prototype.hasOwnProperty('deposit'),
    'Prototype methods are own properties of the prototype'
);

// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
