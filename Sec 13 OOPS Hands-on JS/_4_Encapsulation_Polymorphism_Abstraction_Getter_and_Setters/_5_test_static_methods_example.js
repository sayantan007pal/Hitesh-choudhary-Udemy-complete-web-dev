/**
 * Test Suite for Static Methods Challenge #5
 * ===========================================
 * 
 * Run this file with: node _5_test_static_methods_example.js
 * 
 * Tests your Counter, MathUtils, IdGenerator, and User implementations for:
 *   - Static method behavior
 *   - Instance tracking
 *   - Factory patterns
 *   - Utility functions
 */

const { Counter, MathUtils, IdGenerator, User } = require('./_5_static_methods_example.js');

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

function assertCloseTo(actual, expected, tolerance, testName) {
    totalTests++;
    if (Math.abs(actual - expected) <= tolerance) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expected} (±${tolerance})`);
        console.log(`   Actual:   ${actual}`);
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

function assertTrue(value, testName) {
    totalTests++;
    if (value === true) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: true, Actual: ${value}`);
        testsFailed++;
        return false;
    }
}

function assertFalse(value, testName) {
    totalTests++;
    if (value === false) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: false, Actual: ${value}`);
        testsFailed++;
        return false;
    }
}

function assertInRange(value, min, max, testName) {
    totalTests++;
    if (value >= min && value <= max) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${min} <= value <= ${max}`);
        console.log(`   Actual:   ${value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Sections
// =============================================================================

console.log('\n' + '═'.repeat(70));
console.log('  STATIC METHODS CHALLENGE #5 - TEST SUITE');
console.log('═'.repeat(70) + '\n');

// Reset state before tests
Counter.reset();
IdGenerator.reset();
User.clearAll();

// -----------------------------------------------------------------------------
// Test Section 1: Counter Instance Tracking
// -----------------------------------------------------------------------------
console.log('🔢 Section 1: Counter Instance Tracking');
console.log('─'.repeat(50));

Counter.reset();
assertEqual(Counter.count, 0, 'Counter.count should start at 0 after reset');

const counter1 = new Counter('First', 10);
const counter2 = new Counter('Second', 20);
const counter3 = new Counter('Third');

assertEqual(Counter.count, 3, 'Counter.count should be 3 after creating 3 instances');
assertEqual(Counter.getAllInstances().length, 3, 'getAllInstances should return 3 counters');

assertEqual(counter1.getName(), 'First', 'Counter should store name');
assertEqual(counter1.getValue(), 10, 'Counter should store initial value');
assertEqual(counter3.getValue(), 0, 'Default initial value should be 0');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 2: Counter Operations
// -----------------------------------------------------------------------------
console.log('➕ Section 2: Counter Operations');
console.log('─'.repeat(50));

Counter.reset();
const opCounter = new Counter('Test', 5);

assertEqual(opCounter.increment(), 6, 'increment should return new value');
assertEqual(opCounter.increment(), 7, 'increment again should return 7');
assertEqual(opCounter.decrement(), 6, 'decrement should return 6');
assertEqual(opCounter.getValue(), 6, 'getValue should return current value');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 3: Counter Static getTotal
// -----------------------------------------------------------------------------
console.log('📊 Section 3: Counter Static getTotal');
console.log('─'.repeat(50));

Counter.reset();
new Counter('A', 10);
new Counter('B', 20);
new Counter('C', 30);

assertEqual(Counter.getTotal(), 60, 'getTotal should sum all counter values');

Counter.getAllInstances()[0].increment(); // A = 11
assertEqual(Counter.getTotal(), 61, 'getTotal should reflect changes');

Counter.reset();
assertEqual(Counter.count, 0, 'reset should clear count');
assertEqual(Counter.getAllInstances().length, 0, 'reset should clear instances');
assertEqual(Counter.getTotal(), 0, 'getTotal after reset should be 0');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 4: MathUtils Static Methods
// -----------------------------------------------------------------------------
console.log('🔢 Section 4: MathUtils Static Methods');
console.log('─'.repeat(50));

// clamp
assertEqual(MathUtils.clamp(5, 0, 10), 5, 'clamp: value in range stays same');
assertEqual(MathUtils.clamp(-5, 0, 10), 0, 'clamp: value below min becomes min');
assertEqual(MathUtils.clamp(15, 0, 10), 10, 'clamp: value above max becomes max');

// lerp
assertEqual(MathUtils.lerp(0, 100, 0), 0, 'lerp: t=0 returns start');
assertEqual(MathUtils.lerp(0, 100, 1), 100, 'lerp: t=1 returns end');
assertEqual(MathUtils.lerp(0, 100, 0.5), 50, 'lerp: t=0.5 returns midpoint');

// map
assertEqual(MathUtils.map(5, 0, 10, 0, 100), 50, 'map: 5 from 0-10 to 0-100 is 50');
assertEqual(MathUtils.map(0, 0, 10, 100, 200), 100, 'map: 0 from 0-10 to 100-200 is 100');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 5: MathUtils - randomBetween
// -----------------------------------------------------------------------------
console.log('🎲 Section 5: MathUtils - randomBetween');
console.log('─'.repeat(50));

// Test multiple random values
for (let i = 0; i < 5; i++) {
    const rand = MathUtils.randomBetween(10, 20);
    assertInRange(rand, 10, 20, `randomBetween(10,20) attempt ${i+1}`);
}

console.log('');

// -----------------------------------------------------------------------------
// Test Section 6: MathUtils - factorial & isPrime
// -----------------------------------------------------------------------------
console.log('🧮 Section 6: MathUtils - factorial & isPrime');
console.log('─'.repeat(50));

// Factorial
assertEqual(MathUtils.factorial(0), 1, 'factorial(0) = 1');
assertEqual(MathUtils.factorial(1), 1, 'factorial(1) = 1');
assertEqual(MathUtils.factorial(5), 120, 'factorial(5) = 120');
assertEqual(MathUtils.factorial(10), 3628800, 'factorial(10) = 3628800');

assertThrows(
    () => MathUtils.factorial(-1),
    'Factorial not defined for negative numbers',
    'factorial of negative should throw'
);

// isPrime
assertFalse(MathUtils.isPrime(0), '0 is not prime');
assertFalse(MathUtils.isPrime(1), '1 is not prime');
assertTrue(MathUtils.isPrime(2), '2 is prime');
assertTrue(MathUtils.isPrime(3), '3 is prime');
assertFalse(MathUtils.isPrime(4), '4 is not prime');
assertTrue(MathUtils.isPrime(17), '17 is prime');
assertFalse(MathUtils.isPrime(100), '100 is not prime');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 7: MathUtils - fibonacci
// -----------------------------------------------------------------------------
console.log('🐚 Section 7: MathUtils - fibonacci');
console.log('─'.repeat(50));

assertEqual(MathUtils.fibonacci(0), 0, 'fibonacci(0) = 0');
assertEqual(MathUtils.fibonacci(1), 1, 'fibonacci(1) = 1');
assertEqual(MathUtils.fibonacci(2), 1, 'fibonacci(2) = 1');
assertEqual(MathUtils.fibonacci(5), 5, 'fibonacci(5) = 5');
assertEqual(MathUtils.fibonacci(10), 55, 'fibonacci(10) = 55');
assertEqual(MathUtils.fibonacci(20), 6765, 'fibonacci(20) = 6765');

assertThrows(
    () => MathUtils.fibonacci(-1),
    'Fibonacci not defined for negative numbers',
    'fibonacci of negative should throw'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 8: MathUtils Cannot Be Instantiated
// -----------------------------------------------------------------------------
console.log('🚫 Section 8: Static Class Instantiation Prevention');
console.log('─'.repeat(50));

assertThrows(
    () => new MathUtils(),
    'MathUtils is a static class and cannot be instantiated',
    'MathUtils should not allow instantiation'
);

assertThrows(
    () => new IdGenerator(),
    'IdGenerator is a static class and cannot be instantiated',
    'IdGenerator should not allow instantiation'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 9: IdGenerator
// -----------------------------------------------------------------------------
console.log('🆔 Section 9: IdGenerator');
console.log('─'.repeat(50));

IdGenerator.reset();
assertEqual(IdGenerator.getCount(), 0, 'Count should be 0 after reset');

const id1 = IdGenerator.generate();
assertEqual(id1, 'ID_001', 'First ID should be ID_001');

const id2 = IdGenerator.generate();
assertEqual(id2, 'ID_002', 'Second ID should be ID_002');

const customId = IdGenerator.generate('USER');
assertEqual(customId, 'USER_003', 'Custom prefix should work');

assertEqual(IdGenerator.getCount(), 3, 'Count should be 3');

IdGenerator.reset();
const afterReset = IdGenerator.generate('NEW');
assertEqual(afterReset, 'NEW_001', 'After reset, should start from 001');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 10: User Factory Methods
// -----------------------------------------------------------------------------
console.log('👥 Section 10: User Factory Methods');
console.log('─'.repeat(50));

IdGenerator.reset();
User.clearAll();

const user1 = new User('John', 'john@test.com');
assertEqual(user1.getName(), 'John', 'User should store name');
assertEqual(user1.getRole(), 'user', 'Default role should be user');
assertTrue(user1.getId().startsWith('USR_'), 'ID should start with USR_');

const admin = User.createAdmin('Admin', 'admin@test.com');
assertEqual(admin.getRole(), 'admin', 'createAdmin should set admin role');

const guest = User.createGuest();
assertEqual(guest.getRole(), 'guest', 'createGuest should set guest role');
assertEqual(guest.getName(), 'Guest', 'Guest name should be Guest');

const jsonUser = User.createFromJSON({ name: 'JSON User', email: 'json@test.com', role: 'user' });
assertEqual(jsonUser.getName(), 'JSON User', 'createFromJSON should work');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 11: User Static Query Methods
// -----------------------------------------------------------------------------
console.log('🔍 Section 11: User Static Query Methods');
console.log('─'.repeat(50));

assertEqual(User.getTotalCount(), 4, 'Should have 4 users total');
assertEqual(User.getAllUsers().length, 4, 'getAllUsers should return 4');

const foundUser = User.findByEmail('john@test.com');
assertEqual(foundUser.getName(), 'John', 'findByEmail should find user');

const notFound = User.findByEmail('nonexistent@test.com');
assertEqual(notFound, null, 'findByEmail should return null if not found');

const admins = User.getUsersByRole('admin');
assertEqual(admins.length, 1, 'Should have 1 admin');
assertEqual(admins[0].getName(), 'Admin', 'Admin should be found');

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
    console.log('You have mastered STATIC METHODS in JavaScript!');
    console.log('\n📖 Key Takeaways:');
    console.log('   • Static methods belong to the class, not instances');
    console.log('   • Call with ClassName.method(), not instance.method()');
    console.log('   • Great for utilities, factories, and tracking instances');
    console.log('   • Cannot access instance data through this\n');
} else {
    console.log('\n⚠️  Some tests failed. Review the errors above and try again!');
    console.log('💡 Tip: Remember to use the static keyword.\n');
}

process.exit(testsFailed > 0 ? 1 : 0);
