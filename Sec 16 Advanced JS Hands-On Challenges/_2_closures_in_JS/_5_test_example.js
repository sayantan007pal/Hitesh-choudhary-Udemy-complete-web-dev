/**
 * Test Suite for Event Handler State (Click Tracker)
 * ===================================================
 * 
 * Run this file with: node _5_test_example.js
 */

const { createClickTracker } = require('./_5_example.js');

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

function assertTruthy(value, testName) {
    totalTests++;
    if (value) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected truthy value, got: ${value}`);
        testsFailed++;
        return false;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// =============================================================================
// Test Cases
// =============================================================================

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Click Tracker Tests (Event Handler State)');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Basic Functionality Tests
    // =========================================================================
    console.log('\n📋 BASIC FUNCTIONALITY');
    console.log('-'.repeat(40));

    assertTypeOf(createClickTracker, 'function', 'createClickTracker is a function');
    
    const tracker = createClickTracker();
    assertTypeOf(tracker, 'object', 'createClickTracker returns an object');
    
    // Method existence
    assertTypeOf(tracker.click, 'function', 'click method exists');
    assertTypeOf(tracker.getClickCount, 'function', 'getClickCount method exists');
    assertTypeOf(tracker.getLastClickTime, 'function', 'getLastClickTime method exists');
    assertTypeOf(tracker.getTimeBetweenClicks, 'function', 'getTimeBetweenClicks method exists');
    assertTypeOf(tracker.reset, 'function', 'reset method exists');

    // =========================================================================
    // Initial State Tests
    // =========================================================================
    console.log('\n📋 INITIAL STATE');
    console.log('-'.repeat(40));

    const freshTracker = createClickTracker();
    assertEqual(freshTracker.getClickCount(), 0, 'Initial click count is 0');
    assertEqual(freshTracker.getLastClickTime(), null, 'Initial last click time is null');
    assertEqual(freshTracker.getTimeBetweenClicks(), null, 'Initial time between clicks is null');

    // =========================================================================
    // Click Recording Tests
    // =========================================================================
    console.log('\n📋 CLICK RECORDING');
    console.log('-'.repeat(40));

    const clickTracker = createClickTracker();
    
    const firstClickResult = clickTracker.click();
    assertEqual(firstClickResult, 1, 'First click returns 1');
    assertEqual(clickTracker.getClickCount(), 1, 'Click count is 1 after first click');
    
    const secondClickResult = clickTracker.click();
    assertEqual(secondClickResult, 2, 'Second click returns 2');
    
    const thirdClickResult = clickTracker.click();
    assertEqual(thirdClickResult, 3, 'Third click returns 3');
    assertEqual(clickTracker.getClickCount(), 3, 'Click count is 3 after three clicks');

    // =========================================================================
    // Timestamp Tests
    // =========================================================================
    console.log('\n📋 TIMESTAMP TRACKING');
    console.log('-'.repeat(40));

    const timeTracker = createClickTracker();
    
    const beforeClick = Date.now();
    timeTracker.click();
    const afterClick = Date.now();
    
    const lastClickTime = timeTracker.getLastClickTime();
    assertTypeOf(lastClickTime, 'number', 'Last click time is a number (timestamp)');
    assertTruthy(lastClickTime >= beforeClick, 'Timestamp is >= time before click');
    assertTruthy(lastClickTime <= afterClick, 'Timestamp is <= time after click');

    // =========================================================================
    // Time Between Clicks Tests
    // =========================================================================
    console.log('\n📋 TIME BETWEEN CLICKS');
    console.log('-'.repeat(40));

    const intervalTracker = createClickTracker();
    
    intervalTracker.click();
    assertEqual(intervalTracker.getTimeBetweenClicks(), null, 'Time between clicks is null after 1 click');
    
    await delay(50); // Wait 50ms
    intervalTracker.click();
    
    const timeBetween = intervalTracker.getTimeBetweenClicks();
    assertTypeOf(timeBetween, 'number', 'Time between clicks is a number');
    assertTruthy(timeBetween >= 40, 'Time between clicks is at least 40ms');
    assertTruthy(timeBetween <= 150, 'Time between clicks is reasonable (<150ms)');

    // =========================================================================
    // Reset Tests
    // =========================================================================
    console.log('\n📋 RESET FUNCTIONALITY');
    console.log('-'.repeat(40));

    const resetTracker = createClickTracker();
    resetTracker.click();
    resetTracker.click();
    resetTracker.click();
    
    assertEqual(resetTracker.getClickCount(), 3, 'Has 3 clicks before reset');
    
    const resetResult = resetTracker.reset();
    assertEqual(resetResult, undefined, 'reset() returns undefined');
    assertEqual(resetTracker.getClickCount(), 0, 'Click count is 0 after reset');
    assertEqual(resetTracker.getLastClickTime(), null, 'Last click time is null after reset');
    assertEqual(resetTracker.getTimeBetweenClicks(), null, 'Time between clicks is null after reset');
    
    // Can click after reset
    assertEqual(resetTracker.click(), 1, 'Can click normally after reset');

    // =========================================================================
    // Instance Independence Tests
    // =========================================================================
    console.log('\n📋 INSTANCE INDEPENDENCE');
    console.log('-'.repeat(40));

    const trackerA = createClickTracker();
    const trackerB = createClickTracker();
    
    trackerA.click();
    trackerA.click();
    trackerB.click();
    
    assertEqual(trackerA.getClickCount(), 2, 'Tracker A has 2 clicks');
    assertEqual(trackerB.getClickCount(), 1, 'Tracker B has 1 click');
    
    trackerA.reset();
    assertEqual(trackerA.getClickCount(), 0, 'Tracker A reset to 0');
    assertEqual(trackerB.getClickCount(), 1, 'Tracker B unchanged after A reset');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    const edgeTracker = createClickTracker();
    
    // Many rapid clicks
    for (let i = 0; i < 100; i++) {
        edgeTracker.click();
    }
    assertEqual(edgeTracker.getClickCount(), 100, 'Handles 100 rapid clicks');
    
    // Reset and reuse
    edgeTracker.reset();
    edgeTracker.click();
    assertEqual(edgeTracker.getClickCount(), 1, 'Works correctly after reset and new click');

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

runTests().catch(error => {
    console.error('Error running tests:', error);
    process.exit(1);
});
