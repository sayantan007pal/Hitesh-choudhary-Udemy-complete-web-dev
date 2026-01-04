/**
 * Test Suite for Challenge 7: Event Loop & Execution Order
 */

const { predictOrder, demonstrateEventLoop, nestedAsyncOrder } = require('./_7_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertDeepEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) { 
        console.log(`✅ PASS: ${testName}`); testsPassed++; 
    } else { 
        console.log(`❌ FAIL: ${testName}\n   Expected: ${JSON.stringify(expected)}\n   Actual: ${JSON.stringify(actual)}`); 
        testsFailed++; 
    }
}

function assertTrue(cond, testName) {
    totalTests++;
    if (cond) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}`); testsFailed++; }
}

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Event Loop & Execution Order Tests');
    console.log('='.repeat(60) + '\n');

    // Task 1: predictOrder
    console.log('\n📋 TASK 1: predictOrder()');
    console.log('-'.repeat(40));
    
    const order = predictOrder();
    assertTrue(Array.isArray(order), 'Returns an array');
    assertDeepEqual(order, ["1", "4", "3", "2"], 'Correct execution order: sync→sync→microtask→macrotask');

    // Task 2: demonstrateEventLoop
    console.log('\n📋 TASK 2: demonstrateEventLoop()');
    console.log('-'.repeat(40));
    
    const demo = await demonstrateEventLoop();
    assertTrue(Array.isArray(demo), 'Returns an array');
    assertDeepEqual(demo, ["sync1", "sync2", "microtask", "macrotask"], 'Demonstrates correct event loop order');

    // Task 3: nestedAsyncOrder
    console.log('\n📋 TASK 3: nestedAsyncOrder()');
    console.log('-'.repeat(40));
    
    const nested = await nestedAsyncOrder();
    assertTrue(Array.isArray(nested), 'Returns an array');
    assertTrue(nested[0] === "sync", 'Sync runs first');
    assertTrue(nested.includes("promise1"), 'Promise1 runs');
    assertTrue(nested.includes("nestedPromise"), 'Nested promise runs');
    assertTrue(nested[nested.length - 1] === "setTimeout", 'setTimeout runs last');

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log(`Total: ${totalTests} | ✅ Passed: ${testsPassed} | ❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests().catch(e => { console.error('Error:', e); process.exit(1); });
