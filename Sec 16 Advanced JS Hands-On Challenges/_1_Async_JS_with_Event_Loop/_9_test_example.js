/**
 * Test Suite for Challenge 9: Promise Chaining & Error Propagation
 */

const { chainTransform, recoverableChain, propagatingChain } = require('./_9_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: "${expected}"\n   Actual: "${actual}"`); testsFailed++; }
}

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
    console.log('🧪 Running Promise Chaining & Error Propagation Tests');
    console.log('='.repeat(60) + '\n');

    // Task 1
    console.log('\n📋 TASK 1: chainTransform()');
    console.log('-'.repeat(40));
    
    assertTrue(chainTransform(5) instanceof Promise, 'Returns a Promise');
    assertEqual(await chainTransform(5), "Result: 20", 'chainTransform(5) = "Result: 20"');
    assertEqual(await chainTransform(10), "Result: 30", 'chainTransform(10) = "Result: 30"');
    assertEqual(await chainTransform(0), "Result: 10", 'chainTransform(0) = "Result: 10"');

    // Task 2
    console.log('\n📋 TASK 2: recoverableChain()');
    console.log('-'.repeat(40));
    
    assertTrue(recoverableChain(true) instanceof Promise, 'Returns a Promise');
    assertEqual(await recoverableChain(true), "Recovered from error", 'Recovers when shouldFail=true');
    assertEqual(await recoverableChain(false), "Success: Step 2 completed", 'Success when shouldFail=false');
    
    // Verify it never rejects
    let didReject = false;
    try { await recoverableChain(true); } catch { didReject = true; }
    assertTrue(!didReject, 'Never rejects (always recovers)');

    // Task 3
    console.log('\n📋 TASK 3: propagatingChain()');
    console.log('-'.repeat(40));
    
    const result = await propagatingChain();
    assertDeepEqual(result, { reachedStep3: false, error: "Error at step 2" }, 'Error propagates and skips step 3');

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log(`Total: ${totalTests} | ✅ Passed: ${testsPassed} | ❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests().catch(e => { console.error('Error:', e); process.exit(1); });
