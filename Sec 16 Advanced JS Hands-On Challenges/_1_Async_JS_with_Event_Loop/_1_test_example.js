/**
 * Test Suite for Async JavaScript with Event Loop Challenges
 * ===========================================================
 * 
 * Run this file with: node _1_test_example.js
 * 
 * This test file tests your implementations of:
 *   - simulateAsyncTask()
 *   - simulateMultipleTasks()
 *   - fetchDataWithCallback()
 */

const {
    simulateAsyncTask,
    simulateMultipleTasks,
    fetchDataWithCallback
} = require('./_1_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

/**
 * Captures console.log output during function execution
 */
function captureConsoleLogs(fn, duration) {
    return new Promise((resolve) => {
        const originalLog = console.log;
        const logs = [];
        
        console.log = (...args) => {
            logs.push(args.join(' '));
        };
        
        fn();
        
        setTimeout(() => {
            console.log = originalLog;
            resolve(logs);
        }, duration);
    });
}

/**
 * Asserts that two values are equal
 */
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

/**
 * Asserts that an array includes a specific value
 */
function assertIncludes(array, value, testName) {
    totalTests++;
    if (array.includes(value)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected array to include: "${value}"`);
        console.log(`   Actual array: [${array.map(v => `"${v}"`).join(', ')}]`);
        testsFailed++;
        return false;
    }
}

/**
 * Asserts array length
 */
function assertLength(array, expectedLength, testName) {
    totalTests++;
    if (array.length === expectedLength) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected length: ${expectedLength}`);
        console.log(`   Actual length: ${array.length}`);
        testsFailed++;
        return false;
    }
}

/**
 * Asserts that logs appear in a specific order
 */
function assertOrder(logs, expected, testName) {
    totalTests++;
    const indices = expected.map(item => logs.indexOf(item));
    const allFound = indices.every(i => i !== -1);
    const inOrder = indices.every((val, i, arr) => i === 0 || val > arr[i - 1]);
    
    if (allFound && inOrder) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected order: [${expected.map(v => `"${v}"`).join(', ')}]`);
        console.log(`   Actual logs: [${logs.map(v => `"${v}"`).join(', ')}]`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Async JavaScript with Event Loop Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: simulateAsyncTask()
    // =========================================================================
    console.log('\n📋 TASK 1: simulateAsyncTask()');
    console.log('-'.repeat(40));

    // Test 1.1: Check if function exists and is callable
    totalTests++;
    if (typeof simulateAsyncTask === 'function') {
        console.log('✅ PASS: simulateAsyncTask is a function');
        testsPassed++;
    } else {
        console.log('❌ FAIL: simulateAsyncTask is not a function');
        testsFailed++;
    }

    // Test 1.2: Check if "Task started" is logged immediately AND "Task finished" is NOT
    // (Combined test to avoid timeout pollution)
    const task1LogsImmediate = await captureConsoleLogs(simulateAsyncTask, 100);
    assertIncludes(task1LogsImmediate, 'Task started', 'Logs "Task started" immediately');
    
    totalTests++;
    if (!task1LogsImmediate.includes('Task finished')) {
        console.log('✅ PASS: "Task finished" is NOT logged immediately (async behavior)');
        testsPassed++;
    } else {
        console.log('❌ FAIL: "Task finished" should not be logged immediately');
        testsFailed++;
    }

    // Wait for previous timeout to complete before next test
    await new Promise(resolve => setTimeout(resolve, 2100));

    // Test 1.3: Check if "Task finished" is logged after 2 seconds (fresh call)
    const task1LogsFull = await captureConsoleLogs(simulateAsyncTask, 2100);
    assertIncludes(task1LogsFull, 'Task finished', 'Logs "Task finished" after 2 seconds');

    // Test 1.4: Verify both messages are present (from the same fresh call)
    assertLength(task1LogsFull, 2, 'Logs exactly 2 messages');

    // =========================================================================
    // Task 2 Tests: simulateMultipleTasks()
    // =========================================================================
    console.log('\n📋 TASK 2: simulateMultipleTasks()');
    console.log('-'.repeat(40));

    // Test 2.1: Check if function exists and is callable
    totalTests++;
    if (typeof simulateMultipleTasks === 'function') {
        console.log('✅ PASS: simulateMultipleTasks is a function');
        testsPassed++;
    } else {
        console.log('❌ FAIL: simulateMultipleTasks is not a function');
        testsFailed++;
    }

    // Test 2.2: Check that Task 1 finishes first (after ~1 second)
    const task2Logs1s = await captureConsoleLogs(simulateMultipleTasks, 1100);
    assertIncludes(task2Logs1s, 'Task 1 finished', 'Task 1 finishes after ~1 second');

    // Test 2.3: Check that Task 2 finishes second (after ~2 seconds)
    const task2Logs2s = await captureConsoleLogs(simulateMultipleTasks, 2100);
    assertIncludes(task2Logs2s, 'Task 2 finished', 'Task 2 finishes after ~2 seconds');

    // Test 2.4: Check that Task 3 finishes third (after ~3 seconds)
    const task2Logs3s = await captureConsoleLogs(simulateMultipleTasks, 3100);
    assertIncludes(task2Logs3s, 'Task 3 finished', 'Task 3 finishes after ~3 seconds');

    // Test 2.5: Verify correct order of tasks
    assertOrder(
        task2Logs3s,
        ['Task 1 finished', 'Task 2 finished', 'Task 3 finished'],
        'Tasks complete in correct order (1, 2, 3)'
    );

    // Test 2.6: Verify all three messages are present
    assertLength(task2Logs3s, 3, 'Logs exactly 3 messages');

    // =========================================================================
    // Task 3 Tests: fetchDataWithCallback()
    // =========================================================================
    console.log('\n📋 TASK 3: fetchDataWithCallback()');
    console.log('-'.repeat(40));

    // Test 3.1: Check if function exists and is callable
    totalTests++;
    if (typeof fetchDataWithCallback === 'function') {
        console.log('✅ PASS: fetchDataWithCallback is a function');
        testsPassed++;
    } else {
        console.log('❌ FAIL: fetchDataWithCallback is not a function');
        testsFailed++;
    }

    // Test 3.2: Check that callback is NOT called immediately
    let callbackCalledImmediately = false;
    fetchDataWithCallback(() => {
        callbackCalledImmediately = true;
    });
    
    await new Promise(resolve => setTimeout(resolve, 100));
    totalTests++;
    if (!callbackCalledImmediately) {
        console.log('✅ PASS: Callback is NOT called immediately (async behavior)');
        testsPassed++;
    } else {
        console.log('❌ FAIL: Callback should not be called immediately');
        testsFailed++;
    }

    // Test 3.3: Check that callback receives "Fetched data" after ~2 seconds
    const callbackResult = await new Promise((resolve) => {
        fetchDataWithCallback((data) => {
            resolve(data);
        });
        
        // Timeout in case callback is never called
        setTimeout(() => resolve(null), 2500);
    });

    assertEqual(callbackResult, 'Fetched data', 'Callback receives "Fetched data" as argument');

    // Test 3.4: Check timing - callback should be called around 2 seconds
    const startTime = Date.now();
    await new Promise((resolve) => {
        fetchDataWithCallback(() => {
            resolve();
        });
    });
    const elapsedTime = Date.now() - startTime;
    
    totalTests++;
    if (elapsedTime >= 1900 && elapsedTime <= 2500) {
        console.log(`✅ PASS: Callback called after ~2 seconds (actual: ${elapsedTime}ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Callback timing incorrect`);
        console.log(`   Expected: ~2000ms`);
        console.log(`   Actual: ${elapsedTime}ms`);
        testsFailed++;
    }

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

    // Exit with appropriate code
    process.exit(testsFailed > 0 ? 1 : 0);
}

// Run the tests
runTests().catch(error => {
    console.error('Error running tests:', error);
    process.exit(1);
});
