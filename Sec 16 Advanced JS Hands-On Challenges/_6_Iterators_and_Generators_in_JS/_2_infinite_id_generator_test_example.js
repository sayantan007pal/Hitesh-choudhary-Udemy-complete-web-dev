/**
 * Test Suite for Infinite ID Generator - Challenge 2
 * ===================================================
 * 
 * Run this file with: node _2_infinite_id_generator_test_example.js
 */

const {
    infiniteCounter,
    idGeneratorWithPrefix,
    configurableIdGenerator
} = require('./_2_infinite_id_generator_example.js');

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

function assertDeepEqual(actual, expected, testName) {
    totalTests++;
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
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

function assertTrue(value, testName) {
    totalTests++;
    if (value === true) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: true`);
        console.log(`   Actual:   ${value}`);
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
        console.log(`   Expected: false`);
        console.log(`   Actual:   ${value}`);
        testsFailed++;
        return false;
    }
}

function assertStartsWith(actual, prefix, testName) {
    totalTests++;
    if (typeof actual === 'string' && actual.startsWith(prefix)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to start with: ${prefix}`);
        console.log(`   Actual:   ${actual}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Infinite ID Generator Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: infiniteCounter
    // =========================================================================
    console.log('\n📋 TASK 1: infiniteCounter');
    console.log('-'.repeat(40));

    // Test 1.1: infiniteCounter is a generator function
    assertTypeOf(infiniteCounter, 'function', 'infiniteCounter is a function');

    // Test 1.2: Returns an iterator
    const counter = infiniteCounter();
    assertTypeOf(counter.next, 'function', 'infiniteCounter() returns object with next() method');

    // Test 1.3: First value is 1
    assertEqual(counter.next().value, 1, 'First value is 1');

    // Test 1.4: Second value is 2
    assertEqual(counter.next().value, 2, 'Second value is 2');

    // Test 1.5: Third value is 3
    assertEqual(counter.next().value, 3, 'Third value is 3');

    // Test 1.6: Generator never completes (done is always false)
    const result = counter.next();
    assertEqual(result.value, 4, 'Fourth value is 4');
    assertFalse(result.done, 'Generator is never done');

    // Test 1.7: Multiple instances are independent
    const counter2 = infiniteCounter();
    assertEqual(counter2.next().value, 1, 'New instance starts at 1');
    assertEqual(counter.next().value, 5, 'Original instance continues at 5');

    // Test 1.8: Can generate many values
    const counter3 = infiniteCounter();
    for (let i = 0; i < 99; i++) counter3.next();
    assertEqual(counter3.next().value, 100, 'Can generate up to 100th value');

    // =========================================================================
    // Task 2 Tests: idGeneratorWithPrefix
    // =========================================================================
    console.log('\n📋 TASK 2: idGeneratorWithPrefix');
    console.log('-'.repeat(40));

    // Test 2.1: idGeneratorWithPrefix is a function
    assertTypeOf(idGeneratorWithPrefix, 'function', 'idGeneratorWithPrefix is a function');

    // Test 2.2: Returns an iterator
    const userIdGen = idGeneratorWithPrefix('USER');
    assertTypeOf(userIdGen.next, 'function', 'Returns object with next() method');

    // Test 2.3: First ID with USER prefix
    assertEqual(userIdGen.next().value, 'USER-1', 'First USER ID is USER-1');

    // Test 2.4: Second ID with USER prefix
    assertEqual(userIdGen.next().value, 'USER-2', 'Second USER ID is USER-2');

    // Test 2.5: Third ID with USER prefix
    assertEqual(userIdGen.next().value, 'USER-3', 'Third USER ID is USER-3');

    // Test 2.6: Different prefix works independently
    const orderIdGen = idGeneratorWithPrefix('ORDER');
    assertEqual(orderIdGen.next().value, 'ORDER-1', 'First ORDER ID is ORDER-1');
    assertEqual(orderIdGen.next().value, 'ORDER-2', 'Second ORDER ID is ORDER-2');

    // Test 2.7: Original generator continues independently
    assertEqual(userIdGen.next().value, 'USER-4', 'USER generator continues at USER-4');

    // Test 2.8: Empty string prefix
    const emptyPrefixGen = idGeneratorWithPrefix('');
    assertEqual(emptyPrefixGen.next().value, '-1', 'Empty prefix gives -1');

    // Test 2.9: Special characters in prefix
    const specialGen = idGeneratorWithPrefix('ITEM#');
    assertEqual(specialGen.next().value, 'ITEM#-1', 'Special characters work in prefix');

    // Test 2.10: Many IDs maintain sequence
    const seqGen = idGeneratorWithPrefix('SEQ');
    for (let i = 0; i < 49; i++) seqGen.next();
    assertEqual(seqGen.next().value, 'SEQ-50', '50th ID is correct');

    // =========================================================================
    // Task 3 Tests: configurableIdGenerator
    // =========================================================================
    console.log('\n📋 TASK 3: configurableIdGenerator');
    console.log('-'.repeat(40));

    // Test 3.1: configurableIdGenerator is a function
    assertTypeOf(configurableIdGenerator, 'function', 'configurableIdGenerator is a function');

    // Test 3.2: Default options work
    const defaultGen = configurableIdGenerator();
    assertEqual(defaultGen.next().value, 'ID-1', 'Default prefix is ID, starts at 1');
    assertEqual(defaultGen.next().value, 'ID-2', 'Default step is 1');

    // Test 3.3: Custom prefix
    const customPrefix = configurableIdGenerator({ prefix: 'TICKET' });
    assertEqual(customPrefix.next().value, 'TICKET-1', 'Custom prefix works');

    // Test 3.4: Custom startFrom
    const startFrom = configurableIdGenerator({ prefix: 'NUM', startFrom: 100 });
    assertEqual(startFrom.next().value, 'NUM-100', 'Starts from 100');
    assertEqual(startFrom.next().value, 'NUM-101', 'Increments correctly');

    // Test 3.5: Custom step
    const stepGen = configurableIdGenerator({ prefix: 'STEP', step: 10 });
    assertEqual(stepGen.next().value, 'STEP-1', 'Starts at default 1');
    assertEqual(stepGen.next().value, 'STEP-11', 'Increments by step of 10');
    assertEqual(stepGen.next().value, 'STEP-21', 'Continues incrementing by 10');

    // Test 3.6: Custom startFrom and step together
    const comboGen = configurableIdGenerator({ prefix: 'X', startFrom: 50, step: 5 });
    assertEqual(comboGen.next().value, 'X-50', 'Starts at 50');
    assertEqual(comboGen.next().value, 'X-55', 'Second is 55');
    assertEqual(comboGen.next().value, 'X-60', 'Third is 60');

    // Test 3.7: Zero padding
    const paddedGen = configurableIdGenerator({ prefix: 'INV', padLength: 5 });
    assertEqual(paddedGen.next().value, 'INV-00001', 'Padded to 5 digits');
    assertEqual(paddedGen.next().value, 'INV-00002', 'Second padded correctly');

    // Test 3.8: Padding with higher startFrom
    const paddedStart = configurableIdGenerator({ prefix: 'T', startFrom: 999, padLength: 6 });
    assertEqual(paddedStart.next().value, 'T-000999', 'Pads 999 to 6 digits');
    assertEqual(paddedStart.next().value, 'T-001000', 'Pads 1000 to 6 digits');

    // Test 3.9: All options together
    const allOptions = configurableIdGenerator({
        prefix: 'ORDER',
        startFrom: 1000,
        step: 100,
        padLength: 6
    });
    assertEqual(allOptions.next().value, 'ORDER-001000', 'All options: starts at 001000');
    assertEqual(allOptions.next().value, 'ORDER-001100', 'All options: second is 001100');

    // Test 3.10: Negative step (countdown)
    const countdown = configurableIdGenerator({ prefix: 'DOWN', startFrom: 10, step: -1 });
    assertEqual(countdown.next().value, 'DOWN-10', 'Countdown starts at 10');
    assertEqual(countdown.next().value, 'DOWN-9', 'Countdown goes to 9');
    assertEqual(countdown.next().value, 'DOWN-8', 'Countdown continues to 8');

    // Test 3.11: Empty options object uses defaults
    const emptyOptions = configurableIdGenerator({});
    assertEqual(emptyOptions.next().value, 'ID-1', 'Empty object uses default prefix');

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
