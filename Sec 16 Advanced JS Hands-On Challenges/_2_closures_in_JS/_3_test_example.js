/**
 * Test Suite for Function Factory Pattern
 * ========================================
 * 
 * Run this file with: node _3_test_example.js
 */

const {
    createMultiplier,
    createGreeter,
    createRangeTester
} = require('./_3_example.js');

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

function assertTypeOf(value, expectedType, testName) {
    totalTests++;
    if (typeof value === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${expectedType}`);
        console.log(`   Actual type:   ${typeof value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Function Factory Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // createMultiplier Tests
    // =========================================================================
    console.log('\n📋 PART A: createMultiplier');
    console.log('-'.repeat(40));

    assertTypeOf(createMultiplier, 'function', 'createMultiplier is a function');
    
    const double = createMultiplier(2);
    assertTypeOf(double, 'function', 'createMultiplier returns a function');
    
    assertEqual(double(5), 10, 'double(5) returns 10');
    assertEqual(double(0), 0, 'double(0) returns 0');
    assertEqual(double(-3), -6, 'double(-3) returns -6');
    
    const triple = createMultiplier(3);
    assertEqual(triple(5), 15, 'triple(5) returns 15');
    
    // Independence test
    assertEqual(double(4), 8, 'double still works after creating triple');
    
    // Edge cases
    const multiplyByZero = createMultiplier(0);
    assertEqual(multiplyByZero(100), 0, 'multiply by zero returns 0');
    
    const multiplyByNegative = createMultiplier(-2);
    assertEqual(multiplyByNegative(5), -10, 'multiply by negative works');
    
    const multiplyByDecimal = createMultiplier(0.5);
    assertEqual(multiplyByDecimal(10), 5, 'multiply by decimal works');

    // =========================================================================
    // createGreeter Tests
    // =========================================================================
    console.log('\n📋 PART B: createGreeter');
    console.log('-'.repeat(40));

    assertTypeOf(createGreeter, 'function', 'createGreeter is a function');
    
    const sayHello = createGreeter("Hello");
    assertTypeOf(sayHello, 'function', 'createGreeter returns a function');
    
    assertEqual(sayHello("Alice"), "Hello, Alice!", 'sayHello("Alice") returns correct greeting');
    assertEqual(sayHello("Bob"), "Hello, Bob!", 'sayHello("Bob") returns correct greeting');
    
    const sayGoodbye = createGreeter("Goodbye");
    assertEqual(sayGoodbye("Charlie"), "Goodbye, Charlie!", 'sayGoodbye works correctly');
    
    // Independence
    assertEqual(sayHello("Dave"), "Hello, Dave!", 'sayHello still works after creating sayGoodbye');
    
    // Edge cases
    const emptyGreeter = createGreeter("");
    assertEqual(emptyGreeter("Test"), ", Test!", 'Empty greeting prefix works');
    
    const sayHi = createGreeter("Hi there");
    assertEqual(sayHi("Friend"), "Hi there, Friend!", 'Multi-word greeting works');

    // =========================================================================
    // createRangeTester Tests
    // =========================================================================
    console.log('\n📋 PART C: createRangeTester');
    console.log('-'.repeat(40));

    assertTypeOf(createRangeTester, 'function', 'createRangeTester is a function');
    
    const isTeenager = createRangeTester(13, 19);
    assertTypeOf(isTeenager, 'function', 'createRangeTester returns a function');
    
    // Within range
    assertEqual(isTeenager(15), true, '15 is a teenager');
    assertEqual(isTeenager(13), true, '13 is a teenager (inclusive min)');
    assertEqual(isTeenager(19), true, '19 is a teenager (inclusive max)');
    
    // Outside range
    assertEqual(isTeenager(12), false, '12 is not a teenager');
    assertEqual(isTeenager(20), false, '20 is not a teenager');
    assertEqual(isTeenager(5), false, '5 is not a teenager');
    
    // Different range
    const isValidPercentage = createRangeTester(0, 100);
    assertEqual(isValidPercentage(50), true, '50 is valid percentage');
    assertEqual(isValidPercentage(0), true, '0 is valid percentage (inclusive)');
    assertEqual(isValidPercentage(100), true, '100 is valid percentage (inclusive)');
    assertEqual(isValidPercentage(-1), false, '-1 is not valid percentage');
    assertEqual(isValidPercentage(101), false, '101 is not valid percentage');
    
    // Independence
    assertEqual(isTeenager(16), true, 'isTeenager still works after creating isValidPercentage');
    
    // Edge cases
    const isSingleValue = createRangeTester(5, 5);
    assertEqual(isSingleValue(5), true, 'Single value range works for that value');
    assertEqual(isSingleValue(4), false, 'Single value range fails for other values');
    
    const negativeRange = createRangeTester(-10, -5);
    assertEqual(negativeRange(-7), true, 'Negative range works');
    assertEqual(negativeRange(-3), false, 'Negative range rejects out-of-range');

    // =========================================================================
    // Final Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
