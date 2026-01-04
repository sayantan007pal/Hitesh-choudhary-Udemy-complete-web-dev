/**
 * Test Suite for Generator Return vs Yield - Challenge 4
 * =======================================================
 * 
 * Run this file with: node _4_generator_with_return_test_example.js
 */

const {
    countdownWithMessage,
    resourceGenerator,
    processItems
} = require('./_4_generator_with_return_example.js');

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

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Generator Return vs Yield Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: countdownWithMessage
    // =========================================================================
    console.log('\n📋 TASK 1: countdownWithMessage');
    console.log('-'.repeat(40));

    // Test 1.1: countdownWithMessage is a generator function
    assertTypeOf(countdownWithMessage, 'function', 'countdownWithMessage is a function');

    // Test 1.2: Returns an iterator
    const countdown = countdownWithMessage(3);
    assertTypeOf(countdown.next, 'function', 'Returns object with next() method');

    // Test 1.3: First yield is start value
    const first = countdown.next();
    assertEqual(first.value, 3, 'First value is 3');
    assertFalse(first.done, 'First result done is false');

    // Test 1.4: Second yield is 2
    const second = countdown.next();
    assertEqual(second.value, 2, 'Second value is 2');
    assertFalse(second.done, 'Second result done is false');

    // Test 1.5: Third yield is 1
    const third = countdown.next();
    assertEqual(third.value, 1, 'Third value is 1');
    assertFalse(third.done, 'Third result done is false');

    // Test 1.6: Return value on completion
    const final = countdown.next();
    assertEqual(final.value, 'Liftoff! 🚀', 'Return value is "Liftoff! 🚀"');
    assertTrue(final.done, 'Final result done is true');

    // Test 1.7: Countdown from 5
    const countdown5 = countdownWithMessage(5);
    assertEqual(countdown5.next().value, 5, 'Countdown(5) starts at 5');
    countdown5.next(); countdown5.next(); countdown5.next();
    assertEqual(countdown5.next().value, 1, 'Countdown(5) ends at 1');
    assertEqual(countdown5.next().value, 'Liftoff! 🚀', 'Returns message after 5');

    // Test 1.8: Countdown from 1
    const countdown1 = countdownWithMessage(1);
    assertEqual(countdown1.next().value, 1, 'Countdown(1) yields 1');
    const done1 = countdown1.next();
    assertEqual(done1.value, 'Liftoff! 🚀', 'Countdown(1) returns message');
    assertTrue(done1.done, 'Countdown(1) is done');

    // Test 1.9: Spread operator captures yields but not return
    const spreadCountdown = [...countdownWithMessage(3)];
    assertDeepEqual(spreadCountdown, [3, 2, 1], 'Spread captures yields: [3, 2, 1]');

    // =========================================================================
    // Task 2 Tests: resourceGenerator
    // =========================================================================
    console.log('\n📋 TASK 2: resourceGenerator');
    console.log('-'.repeat(40));

    // Test 2.1: resourceGenerator is a function
    assertTypeOf(resourceGenerator, 'function', 'resourceGenerator is a function');

    // Test 2.2: Returns an iterator
    const resources = resourceGenerator();
    assertTypeOf(resources.next, 'function', 'Returns object with next() method');

    // Test 2.3: First resource
    assertEqual(resources.next().value, 'Resource 1', 'First yields "Resource 1"');

    // Test 2.4: Second resource
    assertEqual(resources.next().value, 'Resource 2', 'Second yields "Resource 2"');

    // Test 2.5: Early termination with .return()
    const earlyReturn = resources.return('Stopped');
    assertEqual(earlyReturn.value, 'Cleanup complete', '.return() triggers cleanup');

    // Test 2.6: After cleanup, generator is done
    const afterReturn = resources.next();
    assertTrue(afterReturn.done, 'Generator is done after .return()');

    // Test 2.7: New generator works independently
    const resources2 = resourceGenerator();
    assertEqual(resources2.next().value, 'Resource 1', 'New generator starts fresh');
    assertEqual(resources2.next().value, 'Resource 2', 'Continues independently');
    assertEqual(resources2.next().value, 'Resource 3', 'Third resource');

    // Test 2.8: Immediate return
    const immediateReturn = resourceGenerator();
    const immResult = immediateReturn.return('Immediate');
    assertEqual(immResult.value, 'Cleanup complete', 'Immediate return still triggers cleanup');

    // =========================================================================
    // Task 3 Tests: processItems
    // =========================================================================
    console.log('\n📋 TASK 3: processItems');
    console.log('-'.repeat(40));

    // Test 3.1: processItems is a function
    assertTypeOf(processItems, 'function', 'processItems is a function');

    // Test 3.2: Returns an iterator
    const processor = processItems([1, 2, 3], () => false);
    assertTypeOf(processor.next, 'function', 'Returns object with next() method');

    // Test 3.3: Yields items
    assertEqual(processItems([1, 2, 3], () => false).next().value, 1, 'First item yielded');

    // Test 3.4: Stops when shouldStop returns true
    const stopAt3 = processItems([1, 2, 3, 4, 5], (item) => item === 3);
    assertEqual(stopAt3.next().value, 1, 'Yields 1');
    assertEqual(stopAt3.next().value, 2, 'Yields 2');
    const stopped = stopAt3.next();
    assertEqual(stopped.value, 'Stopped at: 3', 'Returns "Stopped at: 3"');
    assertTrue(stopped.done, 'done is true when stopped');

    // Test 3.5: All items processed when never stopped
    const neverStop = processItems(['a', 'b', 'c'], () => false);
    assertEqual(neverStop.next().value, 'a', 'Yields a');
    assertEqual(neverStop.next().value, 'b', 'Yields b');
    assertEqual(neverStop.next().value, 'c', 'Yields c');
    const allDone = neverStop.next();
    assertEqual(allDone.value, 'All items processed', 'Returns completion message');
    assertTrue(allDone.done, 'done is true after all items');

    // Test 3.6: Stop at first item
    const stopFirst = processItems([1, 2, 3], (item) => item === 1);
    const firstStop = stopFirst.next();
    assertEqual(firstStop.value, 'Stopped at: 1', 'Stops at first item');
    assertTrue(firstStop.done, 'done is true');

    // Test 3.7: Empty array
    const empty = processItems([], () => false);
    const emptyResult = empty.next();
    assertEqual(emptyResult.value, 'All items processed', 'Empty array returns completion');
    assertTrue(emptyResult.done, 'done is true for empty');

    // Test 3.8: Spread captures yields before stop
    const spreadStop = [...processItems([1, 2, 3, 4], (item) => item === 3)];
    assertDeepEqual(spreadStop, [1, 2], 'Spread captures [1, 2] before stop');

    // Test 3.9: Complex stop condition
    const complexStop = processItems(
        ['apple', 'banana', 'cherry', 'date'],
        (item) => item.startsWith('c')
    );
    assertEqual(complexStop.next().value, 'apple', 'Yields apple');
    assertEqual(complexStop.next().value, 'banana', 'Yields banana');
    assertEqual(complexStop.next().value, 'Stopped at: cherry', 'Stops at cherry');

    // Test 3.10: Stop at last item
    const stopLast = processItems([1, 2, 3], (item) => item === 3);
    stopLast.next(); stopLast.next();
    const lastStop = stopLast.next();
    assertEqual(lastStop.value, 'Stopped at: 3', 'Stops at last item');

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
