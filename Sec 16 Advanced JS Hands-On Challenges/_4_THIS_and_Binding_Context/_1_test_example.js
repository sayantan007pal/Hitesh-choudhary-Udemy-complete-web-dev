/**
 * Test Suite for THIS and Binding Context in JavaScript
 * ======================================================
 * 
 * Run this file with: node _1_test_example.js
 */

const {
    person,
    boundIntroduce,
    introduce,
    sum
} = require('./_1_example.js');

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
    console.log('🧪 Running THIS and Binding Context Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: bind() - person object and boundIntroduce
    // =========================================================================
    console.log('\n📋 TASK 1: bind() - Person and boundIntroduce');
    console.log('-'.repeat(40));

    // Test 1.1: person object exists
    assertTypeOf(person, 'object', 'person is an object');

    // Test 1.2: person has name property
    assertEqual(person.name, "Alice", 'person.name is "Alice"');

    // Test 1.3: person has introduce method
    assertTypeOf(person.introduce, 'function', 'person.introduce is a function');

    // Test 1.4: person.introduce() returns correct string when called on person
    assertEqual(person.introduce(), "Hi, I'm Alice", 'person.introduce() returns "Hi, I\'m Alice"');

    // Test 1.5: boundIntroduce exists and is a function
    assertTypeOf(boundIntroduce, 'function', 'boundIntroduce is a function');

    // Test 1.6: boundIntroduce works independently (context is bound)
    const fn = boundIntroduce;
    assertEqual(fn(), "Hi, I'm Alice", 'boundIntroduce works when assigned to another variable');

    // Test 1.7: boundIntroduce works when called without context
    assertEqual(boundIntroduce.call(null), "Hi, I'm Alice", 'boundIntroduce works even with null context (bind overrides)');

    // Test 1.8: boundIntroduce works when called with different context
    const otherPerson = { name: "Bob" };
    assertEqual(boundIntroduce.call(otherPerson), "Hi, I'm Alice", 'boundIntroduce ignores other contexts (bound to Alice)');

    // =========================================================================
    // Task 2 Tests: call() - introduce function
    // =========================================================================
    console.log('\n📋 TASK 2: call() - introduce function');
    console.log('-'.repeat(40));

    // Test 2.1: introduce function exists
    assertTypeOf(introduce, 'function', 'introduce is a function');

    // Test 2.2: introduce uses 'this' correctly with call()
    const person1 = { name: "Bob" };
    assertEqual(introduce.call(person1), "Hello, my name is Bob", 'introduce.call(person1) returns "Hello, my name is Bob"');

    // Test 2.3: introduce works with different context
    const person2 = { name: "Charlie" };
    assertEqual(introduce.call(person2), "Hello, my name is Charlie", 'introduce.call(person2) returns "Hello, my name is Charlie"');

    // Test 2.4: introduce works with yet another context
    const person3 = { name: "Diana" };
    assertEqual(introduce.call(person3), "Hello, my name is Diana", 'introduce.call(person3) returns "Hello, my name is Diana"');

    // Test 2.5: introduce handles empty name
    const emptyPerson = { name: "" };
    assertEqual(introduce.call(emptyPerson), "Hello, my name is ", 'introduce works with empty name');

    // Test 2.6: introduce handles special characters in name
    const specialPerson = { name: "O'Connor" };
    assertEqual(introduce.call(specialPerson), "Hello, my name is O'Connor", 'introduce works with special characters');

    // =========================================================================
    // Task 3 Tests: apply() - sum function
    // =========================================================================
    console.log('\n📋 TASK 3: apply() - sum function');
    console.log('-'.repeat(40));

    // Test 3.1: sum function exists
    assertTypeOf(sum, 'function', 'sum is a function');

    // Test 3.2: sum works with apply() - multiplier 2
    const context1 = { multiplier: 2 };
    assertEqual(sum.apply(context1, [5, 3]), 16, 'sum.apply(context1, [5, 3]) returns (5+3)*2 = 16');

    // Test 3.3: sum works with apply() - multiplier 3
    const context2 = { multiplier: 3 };
    assertEqual(sum.apply(context2, [5, 3]), 24, 'sum.apply(context2, [5, 3]) returns (5+3)*3 = 24');

    // Test 3.4: sum works with different numbers
    assertEqual(sum.apply({ multiplier: 1 }, [10, 20]), 30, 'sum.apply with multiplier 1 returns 10+20 = 30');

    // Test 3.5: sum works with multiplier 0
    const zeroContext = { multiplier: 0 };
    assertEqual(sum.apply(zeroContext, [5, 5]), 0, 'sum.apply with multiplier 0 returns 0');

    // Test 3.6: sum works with negative multiplier
    const negContext = { multiplier: -2 };
    assertEqual(sum.apply(negContext, [3, 2]), -10, 'sum.apply with negative multiplier works: (3+2)*(-2) = -10');

    // Test 3.7: sum works with negative numbers
    assertEqual(sum.apply({ multiplier: 2 }, [-5, 3]), -4, 'sum.apply with negative numbers: (-5+3)*2 = -4');

    // Test 3.8: sum works with zero arguments
    assertEqual(sum.apply({ multiplier: 5 }, [0, 0]), 0, 'sum.apply with zeros: (0+0)*5 = 0');

    // Test 3.9: sum also works with call() for flexibility
    const context3 = { multiplier: 4 };
    assertEqual(sum.call(context3, 2, 3), 20, 'sum.call also works: (2+3)*4 = 20');

    // Test 3.10: sum works with decimal multiplier
    const decContext = { multiplier: 0.5 };
    assertEqual(sum.apply(decContext, [4, 6]), 5, 'sum.apply with decimal multiplier: (4+6)*0.5 = 5');

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
