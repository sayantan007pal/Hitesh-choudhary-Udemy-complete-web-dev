/**
 * Test Suite for Loop Closure Problem
 * ====================================
 * 
 * Run this file with: node _4_test_example.js
 */

const {
    createFunctionArray,
    createDelayedLoggers,
    createCountdownFunctions
} = require('./_4_example.js');

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

function assertArrayLength(arr, expectedLength, testName) {
    totalTests++;
    if (Array.isArray(arr) && arr.length === expectedLength) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected array length: ${expectedLength}`);
        console.log(`   Actual: ${Array.isArray(arr) ? arr.length : 'not an array'}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Loop Closure Tests (Classic Interview!)');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // createFunctionArray Tests
    // =========================================================================
    console.log('\n📋 PART A: createFunctionArray');
    console.log('-'.repeat(40));

    assertTypeOf(createFunctionArray, 'function', 'createFunctionArray is a function');
    
    const fns3 = createFunctionArray(3);
    assertArrayLength(fns3, 3, 'createFunctionArray(3) returns array of 3');
    
    assertTypeOf(fns3[0], 'function', 'Array contains functions');
    
    // The critical tests - each function must return its OWN index!
    assertEqual(fns3[0](), 0, 'First function returns 0 (not 3!)');
    assertEqual(fns3[1](), 1, 'Second function returns 1 (not 3!)');
    assertEqual(fns3[2](), 2, 'Third function returns 2 (not 3!)');
    
    // Test with larger array
    const fns5 = createFunctionArray(5);
    assertArrayLength(fns5, 5, 'createFunctionArray(5) returns array of 5');
    assertEqual(fns5[0](), 0, 'fns5[0]() returns 0');
    assertEqual(fns5[4](), 4, 'fns5[4]() returns 4');
    
    // Edge cases
    const fns0 = createFunctionArray(0);
    assertArrayLength(fns0, 0, 'createFunctionArray(0) returns empty array');
    
    const fns1 = createFunctionArray(1);
    assertEqual(fns1[0](), 0, 'Single function returns 0');

    // =========================================================================
    // createDelayedLoggers Tests
    // =========================================================================
    console.log('\n📋 PART B: createDelayedLoggers');
    console.log('-'.repeat(40));

    assertTypeOf(createDelayedLoggers, 'function', 'createDelayedLoggers is a function');
    
    const loggers = createDelayedLoggers(["first", "second", "third"]);
    assertArrayLength(loggers, 3, 'Returns array with same length as input');
    
    assertTypeOf(loggers[0], 'function', 'Array contains functions');
    
    assertEqual(loggers[0](), "first", 'First logger returns "first"');
    assertEqual(loggers[1](), "second", 'Second logger returns "second"');
    assertEqual(loggers[2](), "third", 'Third logger returns "third"');
    
    // Different messages
    const greetings = createDelayedLoggers(["Hello", "World"]);
    assertEqual(greetings[0](), "Hello", 'Works with different messages');
    assertEqual(greetings[1](), "World", 'Second greeting correct');
    
    // Edge cases
    const empty = createDelayedLoggers([]);
    assertArrayLength(empty, 0, 'Empty array input returns empty array');
    
    const single = createDelayedLoggers(["only"]);
    assertEqual(single[0](), "only", 'Single message works');

    // =========================================================================
    // createCountdownFunctions Tests
    // =========================================================================
    console.log('\n📋 PART C: createCountdownFunctions');
    console.log('-'.repeat(40));

    assertTypeOf(createCountdownFunctions, 'function', 'createCountdownFunctions is a function');
    
    const countdown3 = createCountdownFunctions(3);
    assertArrayLength(countdown3, 4, 'createCountdownFunctions(3) returns 4 functions');
    
    assertEqual(countdown3[0](), 3, 'countdown[0]() returns 3');
    assertEqual(countdown3[1](), 2, 'countdown[1]() returns 2');
    assertEqual(countdown3[2](), 1, 'countdown[2]() returns 1');
    assertEqual(countdown3[3](), 0, 'countdown[3]() returns 0');
    
    // Different start
    const countdown5 = createCountdownFunctions(5);
    assertArrayLength(countdown5, 6, 'createCountdownFunctions(5) returns 6 functions');
    assertEqual(countdown5[0](), 5, 'Starts at 5');
    assertEqual(countdown5[5](), 0, 'Ends at 0');
    
    // Edge case - start at 0
    const countdown0 = createCountdownFunctions(0);
    assertArrayLength(countdown0, 1, 'createCountdownFunctions(0) returns 1 function');
    assertEqual(countdown0[0](), 0, 'countdown0[0]() returns 0');

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
        console.log('💡 You\'ve mastered the classic loop closure problem!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
