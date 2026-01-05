/**
 * Test Suite for Constructor Functions and the 'new' Keyword
 * ===========================================================
 * 
 * Run this file with: node _2_test_constructor_new_keyword_example.js
 */

const {
    BankAccount,
    SafeUser,
    AutoFixUser,
    customNew,
    Counter
} = require('./_2_constructor_new_keyword_example.js');

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
        console.log(`   Expected: "${expected}"`);
        console.log(`   Actual:   "${actual}"`);
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

function assertThrows(fn, expectedMessage, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected function to throw an error`);
        testsFailed++;
        return false;
    } catch (e) {
        if (expectedMessage && e.message !== expectedMessage) {
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Expected message: "${expectedMessage}"`);
            console.log(`   Actual message:   "${e.message}"`);
            testsFailed++;
            return false;
        }
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    }
}

function assertDoesNotThrow(fn, testName) {
    totalTests++;
    try {
        fn();
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } catch (e) {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected no error, but got: "${e.message}"`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Constructor Functions & new Keyword Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: BankAccount Constructor Function
    // =========================================================================
    console.log('\n📋 TASK 1: BankAccount Constructor Function');
    console.log('-'.repeat(40));

    // Test 1.1: BankAccount is a function (constructor)
    assertTrue(typeof BankAccount === 'function', 'BankAccount is a function');

    // Test 1.2: Create instance with new
    const account1 = new BankAccount("John Doe", 1000);
    assertTrue(account1 instanceof BankAccount, 'account1 is instanceof BankAccount');

    // Test 1.3: Properties are set correctly
    assertEqual(account1.accountHolder, "John Doe", 'accountHolder is set correctly');
    assertEqual(account1.getBalance(), 1000, 'initial balance is 1000');

    // Test 1.4: deposit() works
    assertEqual(account1.deposit(500), 1500, 'deposit(500) returns 1500');
    assertEqual(account1.getBalance(), 1500, 'balance after deposit is 1500');

    // Test 1.5: withdraw() works
    assertEqual(account1.withdraw(200), 1300, 'withdraw(200) returns 1300');
    assertEqual(account1.getBalance(), 1300, 'balance after withdraw is 1300');

    // Test 1.6: withdraw() with insufficient funds
    assertEqual(
        account1.withdraw(5000),
        "Insufficient funds",
        'withdraw(5000) returns "Insufficient funds"'
    );
    assertEqual(account1.getBalance(), 1300, 'balance unchanged after failed withdraw');

    // Test 1.7: Multiple deposits and withdrawals
    account1.deposit(700);  // 2000
    account1.withdraw(500); // 1500
    assertEqual(account1.getBalance(), 1500, 'Multiple operations work correctly');

    // Test 1.8: Withdraw exact balance
    const account2 = new BankAccount("Jane", 100);
    assertEqual(account2.withdraw(100), 0, 'Can withdraw exact balance');
    assertEqual(account2.getBalance(), 0, 'Balance is 0 after withdrawing all');

    // Test 1.9: Withdraw more than 0 balance
    assertEqual(account2.withdraw(1), "Insufficient funds", 'Cannot withdraw from 0 balance');

    // =========================================================================
    // Task 2 Tests: new.target Safety
    // =========================================================================
    console.log('\n📋 TASK 2: new.target Safety (SafeUser & AutoFixUser)');
    console.log('-'.repeat(40));

    // Test 2.1: SafeUser works with new
    assertDoesNotThrow(() => {
        new SafeUser("john", "john@test.com");
    }, 'SafeUser works when called with new');

    // Test 2.2: SafeUser creates correct properties
    const safeUser = new SafeUser("john", "john@test.com");
    assertEqual(safeUser.username, "john", 'SafeUser.username is correct');
    assertEqual(safeUser.email, "john@test.com", 'SafeUser.email is correct');

    // Test 2.3: SafeUser throws without new
    assertThrows(
        () => { SafeUser("jane", "jane@test.com"); },
        "SafeUser must be called with 'new'",
        'SafeUser throws when called without new'
    );

    // Test 2.4: AutoFixUser works with new
    const autoUser1 = new AutoFixUser("bob", "bob@test.com");
    assertEqual(autoUser1.username, "bob", 'AutoFixUser with new: username correct');
    assertEqual(autoUser1.email, "bob@test.com", 'AutoFixUser with new: email correct');

    // Test 2.5: AutoFixUser works WITHOUT new (auto-fixes)
    const autoUser2 = AutoFixUser("alice", "alice@test.com");
    assertTrue(autoUser2 instanceof AutoFixUser, 'AutoFixUser without new: returns instance');
    assertEqual(autoUser2.username, "alice", 'AutoFixUser without new: username correct');
    assertEqual(autoUser2.email, "alice@test.com", 'AutoFixUser without new: email correct');

    // =========================================================================
    // Task 3 Tests: customNew Implementation
    // =========================================================================
    console.log('\n📋 TASK 3: customNew Implementation');
    console.log('-'.repeat(40));

    // Create a test constructor
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.greet = function() {
        return `Hi, I'm ${this.name}`;
    };
    Person.prototype.getAge = function() {
        return this.age;
    };

    // Test 3.1: customNew creates object with correct properties
    const person1 = customNew(Person, "John", 25);
    assertEqual(person1.name, "John", 'customNew: name property is correct');
    assertEqual(person1.age, 25, 'customNew: age property is correct');

    // Test 3.2: customNew object has prototype methods
    assertEqual(person1.greet(), "Hi, I'm John", 'customNew: prototype method works');
    assertEqual(person1.getAge(), 25, 'customNew: getAge() works');

    // Test 3.3: customNew object is instanceof constructor
    assertTrue(person1 instanceof Person, 'customNew: object is instanceof Person');

    // Test 3.4: customNew object's prototype is correct
    assertTrue(
        Object.getPrototypeOf(person1) === Person.prototype,
        'customNew: prototype chain is correct'
    );

    // Test 3.5: customNew with constructor that returns an object
    function ReturningConstructor(value) {
        this.value = value;
        return { overridden: true };  // Explicit return
    }
    const returned = customNew(ReturningConstructor, 42);
    assertTrue(
        returned.overridden === true,
        'customNew: respects explicit object return from constructor'
    );

    // Test 3.6: customNew with constructor that returns primitive (should ignore)
    function PrimitiveReturn(value) {
        this.value = value;
        return 123;  // Primitive return is ignored
    }
    const primitiveResult = customNew(PrimitiveReturn, 42);
    assertEqual(primitiveResult.value, 42, 'customNew: ignores primitive return');

    // Test 3.7: Compare with native new
    const nativeInstance = new Person("Jane", 30);
    const customInstance = customNew(Person, "Jane", 30);
    assertEqual(nativeInstance.name, customInstance.name, 'customNew matches native new: name');
    assertEqual(nativeInstance.greet(), customInstance.greet(), 'customNew matches native new: methods');

    // =========================================================================
    // Task 4 Tests: Counter - Prototype vs Instance Methods
    // =========================================================================
    console.log('\n📋 TASK 4: Counter (Prototype vs Instance Methods)');
    console.log('-'.repeat(40));

    // Test 4.1: Counter is a function
    assertTrue(typeof Counter === 'function', 'Counter is a function');

    // Test 4.2: Create counter with start value
    const counter1 = new Counter("A", 10);
    assertEqual(counter1.getValue(), 10, 'Counter starts at startValue (10)');
    assertEqual(counter1.name, "A", 'Counter name is set');

    // Test 4.3: increment works
    assertEqual(counter1.increment(), 11, 'increment() returns 11');
    assertEqual(counter1.increment(), 12, 'increment() returns 12');

    // Test 4.4: decrement works
    assertEqual(counter1.decrement(), 11, 'decrement() returns 11');

    // Test 4.5: getValue works
    assertEqual(counter1.getValue(), 11, 'getValue() returns current value');

    // Test 4.6: reset works
    counter1.reset();
    assertEqual(counter1.getValue(), 10, 'reset() sets value back to startValue');

    // Test 4.7: Default startValue is 0
    const counter2 = new Counter("B");
    assertEqual(counter2.getValue(), 0, 'Default startValue is 0');

    // Test 4.8: incrementFast works
    const fastValue = counter2.incrementFast();
    assertEqual(fastValue, 1, 'incrementFast() returns 1');

    // Test 4.9: Prototype methods are shared (same reference)
    assertTrue(
        counter1.increment === counter2.increment,
        'Prototype method increment is SHARED (same reference)'
    );
    assertTrue(
        counter1.decrement === counter2.decrement,
        'Prototype method decrement is SHARED'
    );
    assertTrue(
        counter1.getValue === counter2.getValue,
        'Prototype method getValue is SHARED'
    );

    // Test 4.10: Instance methods are NOT shared (different references)
    assertFalse(
        counter1.incrementFast === counter2.incrementFast,
        'Instance method incrementFast is NOT shared (different functions)'
    );

    // Test 4.11: Methods exist on prototype
    assertTrue(
        Counter.prototype.hasOwnProperty('increment'),
        'increment is on Counter.prototype'
    );
    assertTrue(
        Counter.prototype.hasOwnProperty('decrement'),
        'decrement is on Counter.prototype'
    );

    // Test 4.12: incrementFast is own property of instance
    assertTrue(
        counter1.hasOwnProperty('incrementFast'),
        'incrementFast is own property of instance (not on prototype)'
    );
    assertFalse(
        Counter.prototype.hasOwnProperty('incrementFast'),
        'incrementFast is NOT on prototype'
    );

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test E1: BankAccount with 0 balance
    const zeroAccount = new BankAccount("Zero", 0);
    assertEqual(zeroAccount.getBalance(), 0, 'BankAccount handles 0 initial balance');
    assertEqual(zeroAccount.withdraw(1), "Insufficient funds", 'Cannot withdraw from 0');

    // Test E2: Negative deposit (edge case - depends on implementation)
    // Most implementations allow negative deposits (which act as withdrawals)
    // But this is a design choice

    // Test E3: Counter with negative start value
    const negCounter = new Counter("Neg", -5);
    assertEqual(negCounter.getValue(), -5, 'Counter handles negative start value');
    assertEqual(negCounter.increment(), -4, 'Increment from negative works');

    // =========================================================================
    // Print Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉');
        console.log('You have mastered Constructor Functions and the new keyword!\n');
    } else {
        console.log('\n💪 Keep going! Review the failed tests and try again.\n');
    }
}

// Run the tests
runTests();
