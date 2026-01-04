/**
 * Test Suite for Challenge 8: Microtask vs Macrotask Queue
 */

const { queueMicrotaskDemo, multiMicrotaskDemo, interleavedDemo } = require('./_8_example.js');

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
    console.log('🧪 Running Microtask vs Macrotask Queue Tests');
    console.log('='.repeat(60) + '\n');

    // Task 1
    console.log('\n📋 TASK 1: queueMicrotaskDemo()');
    console.log('-'.repeat(40));
    
    const demo1 = await queueMicrotaskDemo();
    assertTrue(Array.isArray(demo1), 'Returns an array');
    assertDeepEqual(demo1, ["sync", "micro", "macro"], 'Microtask runs before macrotask');

    // Task 2
    console.log('\n📋 TASK 2: multiMicrotaskDemo()');
    console.log('-'.repeat(40));
    
    const demo2 = await multiMicrotaskDemo();
    assertTrue(Array.isArray(demo2), 'Returns an array');
    assertDeepEqual(demo2, ["sync", "micro1", "micro2", "micro3", "macro"], 'All microtasks before macrotask');

    // Task 3
    console.log('\n📋 TASK 3: interleavedDemo()');
    console.log('-'.repeat(40));
    
    const demo3 = await interleavedDemo();
    assertTrue(Array.isArray(demo3), 'Returns an array');
    assertTrue(demo3[0] === "sync", 'Sync first');
    assertTrue(demo3.indexOf("micro1") < demo3.indexOf("macro1"), 'micro1 before macro1');
    assertTrue(demo3.indexOf("micro2") < demo3.indexOf("macro1"), 'micro2 (nested) before macro1');
    assertDeepEqual(demo3, ["sync", "micro1", "micro2", "macro1", "macro2"], 'Correct interleaved order');

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log(`Total: ${totalTests} | ✅ Passed: ${testsPassed} | ❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests().catch(e => { console.error('Error:', e); process.exit(1); });
