/**
 * Test Suite: Async Error Propagation
 * ====================================
 * 
 * Run this file with: node _7_async_error_propagation_test_example.js
 */

const {
    FetchError,
    ProcessError,
    SaveError,
    fetchData,
    processData,
    saveData,
    executeWithErrorInfo,
    executeWithRecovery
} = require('./_7_async_error_propagation_example.js');

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

function assertInstanceOf(obj, constructor, testName) {
    totalTests++;
    if (obj instanceof constructor) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected instance of: ${constructor.name}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Async Error Propagation Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test Custom Error Classes
    // =========================================================================
    console.log('\n📋 SECTION 1: Custom Error Classes');
    console.log('-'.repeat(40));

    const fetchErr = new FetchError("test");
    assertInstanceOf(fetchErr, Error, 'FetchError extends Error');
    assertEqual(fetchErr.name, 'FetchError', 'FetchError has correct name');

    const processErr = new ProcessError("test");
    assertInstanceOf(processErr, Error, 'ProcessError extends Error');
    assertEqual(processErr.name, 'ProcessError', 'ProcessError has correct name');

    const saveErr = new SaveError("test");
    assertInstanceOf(saveErr, Error, 'SaveError extends Error');
    assertEqual(saveErr.name, 'SaveError', 'SaveError has correct name');

    // =========================================================================
    // Test Individual Functions
    // =========================================================================
    console.log('\n📋 SECTION 2: Individual Async Functions');
    console.log('-'.repeat(40));

    // fetchData
    const fetchSuccess = await fetchData(false);
    assertDeepEqual(fetchSuccess, { raw: "fetched data" }, 'fetchData returns correct data on success');
    
    try {
        await fetchData(true);
        totalTests++;
        console.log('❌ FAIL: fetchData should throw on failure');
        testsFailed++;
    } catch (error) {
        assertInstanceOf(error, FetchError, 'fetchData throws FetchError');
        assertEqual(error.message, "Network error", 'FetchError has correct message');
    }

    // processData
    const processSuccess = await processData({ raw: "data" }, false);
    assertDeepEqual(processSuccess, { raw: "data", processed: true }, 'processData adds processed flag');
    
    try {
        await processData({ raw: "data" }, true);
        totalTests++;
        console.log('❌ FAIL: processData should throw on failure');
        testsFailed++;
    } catch (error) {
        assertInstanceOf(error, ProcessError, 'processData throws ProcessError');
        assertEqual(error.message, "Processing failed", 'ProcessError has correct message');
    }

    // saveData
    const saveSuccess = await saveData({ raw: "data", processed: true }, false);
    assertDeepEqual(saveSuccess, { 
        raw: "data", 
        processed: true, 
        saved: true, 
        id: 123 
    }, 'saveData adds saved flag and id');
    
    try {
        await saveData({ raw: "data" }, true);
        totalTests++;
        console.log('❌ FAIL: saveData should throw on failure');
        testsFailed++;
    } catch (error) {
        assertInstanceOf(error, SaveError, 'saveData throws SaveError');
        assertEqual(error.message, "Save failed", 'SaveError has correct message');
    }

    // =========================================================================
    // Test executeWithErrorInfo
    // =========================================================================
    console.log('\n📋 SECTION 3: executeWithErrorInfo');
    console.log('-'.repeat(40));

    // All succeed
    const allSuccess = await executeWithErrorInfo(false, false, false);
    assertEqual(allSuccess.success, true, 'All success: success is true');
    assertEqual(allSuccess.data.raw, "fetched data", 'All success: has fetched data');
    assertEqual(allSuccess.data.processed, true, 'All success: is processed');
    assertEqual(allSuccess.data.saved, true, 'All success: is saved');
    assertEqual(allSuccess.data.id, 123, 'All success: has id');

    // Fetch fails
    const fetchFails = await executeWithErrorInfo(true, false, false);
    assertEqual(fetchFails.success, false, 'Fetch fail: success is false');
    assertEqual(fetchFails.stage, "fetch", 'Fetch fail: stage is fetch');
    assertEqual(fetchFails.error, "Network error", 'Fetch fail: correct error message');

    // Process fails
    const processFails = await executeWithErrorInfo(false, true, false);
    assertEqual(processFails.success, false, 'Process fail: success is false');
    assertEqual(processFails.stage, "process", 'Process fail: stage is process');
    assertEqual(processFails.error, "Processing failed", 'Process fail: correct error message');

    // Save fails
    const saveFails = await executeWithErrorInfo(false, false, true);
    assertEqual(saveFails.success, false, 'Save fail: success is false');
    assertEqual(saveFails.stage, "save", 'Save fail: stage is save');
    assertEqual(saveFails.error, "Save failed", 'Save fail: correct error message');

    // =========================================================================
    // Test executeWithRecovery
    // =========================================================================
    console.log('\n📋 SECTION 4: executeWithRecovery (Graceful Degradation)');
    console.log('-'.repeat(40));

    // All succeed
    const recoveryAllSuccess = await executeWithRecovery(false, false, false);
    assertEqual(recoveryAllSuccess.raw, "fetched data", 'Recovery all success: normal data');
    assertEqual(recoveryAllSuccess.processed, true, 'Recovery all success: processed');
    assertEqual(recoveryAllSuccess.saved, true, 'Recovery all success: saved');

    // Fetch fails → use fallback
    const recoveryFetchFail = await executeWithRecovery(true, false, false);
    assertEqual(recoveryFetchFail.raw, "fallback data", 'Recovery fetch fail: uses fallback data');
    assertEqual(recoveryFetchFail.processed, true, 'Recovery fetch fail: still processed');
    assertEqual(recoveryFetchFail.saved, true, 'Recovery fetch fail: still saved');

    // Process fails → skip processing
    const recoveryProcessFail = await executeWithRecovery(false, true, false);
    assertEqual(recoveryProcessFail.raw, "fetched data", 'Recovery process fail: has original data');
    assertEqual(recoveryProcessFail.processed, undefined, 'Recovery process fail: not processed');
    assertEqual(recoveryProcessFail.saved, true, 'Recovery process fail: still saved');

    // Save fails → mark as unsaved
    const recoverySaveFail = await executeWithRecovery(false, false, true);
    assertEqual(recoverySaveFail.raw, "fetched data", 'Recovery save fail: has data');
    assertEqual(recoverySaveFail.processed, true, 'Recovery save fail: processed');
    assertEqual(recoverySaveFail.saved, false, 'Recovery save fail: marked not saved');

    // All fail → still returns something
    const recoveryAllFail = await executeWithRecovery(true, true, true);
    totalTests++;
    if (recoveryAllFail !== null && recoveryAllFail !== undefined) {
        console.log('✅ PASS: Recovery all fail: still returns a result');
        testsPassed++;
    } else {
        console.log('❌ FAIL: Recovery should always return something');
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

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests().catch(error => {
    console.error('Error running tests:', error);
    process.exit(1);
});
