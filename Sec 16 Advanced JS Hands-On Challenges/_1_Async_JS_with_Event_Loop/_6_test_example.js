/**
 * Test Suite for Challenge 6: Promise Combinators
 */

const {
    fastAPI, slowAPI, failingAPI, api1, api2, api3,
    fetchAllData, getFirstResponse, fetchWithStatus
} = require('./_6_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: "${expected}"\n   Actual: "${actual}"`); testsFailed++; }
}

function assertDeepEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: ${JSON.stringify(expected)}\n   Actual: ${JSON.stringify(actual)}`); testsFailed++; }
}

function assertTrue(cond, testName) {
    totalTests++;
    if (cond) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}`); testsFailed++; }
}

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Promise Combinators Tests');
    console.log('='.repeat(60) + '\n');

    // Task 1: fetchAllData
    console.log('\n📋 TASK 1: fetchAllData()');
    console.log('-'.repeat(40));
    
    assertTrue(fetchAllData() instanceof Promise, 'Returns a Promise');
    const allData = await fetchAllData();
    assertDeepEqual(allData, ["API 1", "API 2", "API 3"], 'Returns all API results');
    const start1 = Date.now();
    await fetchAllData();
    assertTrue(Date.now() - start1 < 200, 'Runs in parallel (< 200ms)');

    // Task 2: getFirstResponse
    console.log('\n📋 TASK 2: getFirstResponse()');
    console.log('-'.repeat(40));
    
    assertTrue(getFirstResponse() instanceof Promise, 'Returns a Promise');
    const firstResp = await getFirstResponse();
    assertEqual(firstResp, "Fast response", 'Returns fastest response');

    // Task 3: fetchWithStatus
    console.log('\n📋 TASK 3: fetchWithStatus()');
    console.log('-'.repeat(40));
    
    assertTrue(fetchWithStatus() instanceof Promise, 'Returns a Promise');
    const statusResults = await fetchWithStatus();
    assertTrue(Array.isArray(statusResults), 'Returns an array');
    assertEqual(statusResults.length, 3, 'Has 3 results');
    assertDeepEqual(statusResults[0], { status: "success", value: "API 1" }, 'First result is success');
    assertDeepEqual(statusResults[1], { status: "success", value: "API 2" }, 'Second result is success');
    assertDeepEqual(statusResults[2], { status: "error", reason: "API failed" }, 'Third result is error');

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log(`Total: ${totalTests} | ✅ Passed: ${testsPassed} | ❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests().catch(e => { console.error('Error:', e); process.exit(1); });
