/**
 * Test Suite for Challenge 10: Advanced Async Patterns
 */

const { retry, withTimeout, debounceAsync } = require('./_10_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: "${expected}"\n   Actual: "${actual}"`); testsFailed++; }
}

function assertTrue(cond, testName) {
    totalTests++;
    if (cond) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}`); testsFailed++; }
}

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Advanced Async Patterns Tests');
    console.log('='.repeat(60) + '\n');

    // Task 1: retry
    console.log('\n📋 TASK 1: retry()');
    console.log('-'.repeat(40));
    
    // Success on first try
    const success = await retry(async () => "success", 3);
    assertEqual(success, "success", 'Returns result on success');
    
    // Success after retries
    let attempts = 0;
    const retryResult = await retry(async () => {
        attempts++;
        if (attempts < 3) throw new Error("fail");
        return "finally!";
    }, 5);
    assertEqual(retryResult, "finally!", 'Succeeds after retries');
    assertEqual(attempts, 3, 'Retried correct number of times');
    
    // Exhausts retries
    let didThrow = false;
    try {
        await retry(async () => { throw new Error("always fails"); }, 2);
    } catch { didThrow = true; }
    assertTrue(didThrow, 'Throws after exhausting retries');

    // Task 2: withTimeout
    console.log('\n📋 TASK 2: withTimeout()');
    console.log('-'.repeat(40));
    
    // Fast promise succeeds
    const fast = await withTimeout(Promise.resolve("fast"), 100);
    assertEqual(fast, "fast", 'Returns result if fast enough');
    
    // Slow promise times out
    let timedOut = false;
    try {
        await withTimeout(new Promise(r => setTimeout(() => r("slow"), 200)), 50);
    } catch (e) {
        timedOut = e.message === "Timeout";
    }
    assertTrue(timedOut, 'Throws Timeout error if too slow');

    // Task 3: debounceAsync
    console.log('\n📋 TASK 3: debounceAsync()');
    console.log('-'.repeat(40));
    
    let callCount = 0;
    const debouncedFn = debounceAsync(async (x) => { callCount++; return x * 2; }, 50);
    
    // Multiple rapid calls
    debouncedFn(1);
    debouncedFn(2);
    const result = await debouncedFn(3);
    
    await new Promise(r => setTimeout(r, 100)); // Wait for debounce
    
    assertEqual(result, 6, 'Returns result of last call');
    assertTrue(callCount <= 1, `Only executed once (count: ${callCount})`);

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log(`Total: ${totalTests} | ✅ Passed: ${testsPassed} | ❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests().catch(e => { console.error('Error:', e); process.exit(1); });
