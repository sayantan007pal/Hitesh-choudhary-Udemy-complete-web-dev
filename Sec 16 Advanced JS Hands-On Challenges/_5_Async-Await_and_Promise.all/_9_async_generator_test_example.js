/**
 * Test Suite: Async Generators and for-await-of
 * ==============================================
 * 
 * Run this file with: node _9_async_generator_test_example.js
 */

const {
    fetchPage,
    createPageGenerator,
    collectAllPages,
    collectUntilCondition
} = require('./_9_async_generator_example.js');

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

// =============================================================================
// Test Cases
// =============================================================================

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Async Generator Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test fetchPage
    // =========================================================================
    console.log('\n📋 SECTION 1: fetchPage Function');
    console.log('-'.repeat(40));

    assertTypeOf(fetchPage, 'function', 'fetchPage is a function');

    const page1 = await fetchPage(1, 3);
    assertEqual(page1.page, 1, 'fetchPage returns correct page number');
    assertEqual(Array.isArray(page1.data), true, 'fetchPage returns data array');
    assertEqual(page1.hasMore, true, 'fetchPage: page 1 of 3 has more');

    const lastPage = await fetchPage(3, 3);
    assertEqual(lastPage.page, 3, 'Last page has correct number');
    assertEqual(lastPage.hasMore, false, 'Last page has no more');

    const singlePage = await fetchPage(1, 1);
    assertEqual(singlePage.hasMore, false, 'Single page has no more');

    // =========================================================================
    // Test createPageGenerator
    // =========================================================================
    console.log('\n📋 SECTION 2: createPageGenerator');
    console.log('-'.repeat(40));

    assertTypeOf(createPageGenerator, 'function', 'createPageGenerator is a function');

    const genFn = createPageGenerator(3);
    assertTypeOf(genFn, 'function', 'createPageGenerator returns a function');

    // Test that it's an async generator
    const genInstance = genFn();
    totalTests++;
    if (genInstance[Symbol.asyncIterator]) {
        console.log('✅ PASS: Generator is async iterable');
        testsPassed++;
    } else {
        console.log('❌ FAIL: Generator should be async iterable');
        testsFailed++;
    }

    // Manually iterate
    const pages = [];
    for await (const page of createPageGenerator(3)()) {
        pages.push(page);
    }
    assertEqual(pages.length, 3, 'Generator yields 3 pages');
    assertEqual(pages[0].page, 1, 'First yielded page is page 1');
    assertEqual(pages[2].page, 3, 'Last yielded page is page 3');
    assertEqual(pages[2].hasMore, false, 'Last page has hasMore false');

    // =========================================================================
    // Test collectAllPages
    // =========================================================================
    console.log('\n📋 SECTION 3: collectAllPages');
    console.log('-'.repeat(40));

    assertTypeOf(collectAllPages, 'function', 'collectAllPages is a function');

    const allPages = await collectAllPages(createPageGenerator(5));
    assertEqual(Array.isArray(allPages), true, 'collectAllPages returns array');
    assertEqual(allPages.length, 5, 'collectAllPages collects all 5 pages');
    assertEqual(allPages[0].page, 1, 'First collected page is page 1');
    assertEqual(allPages[4].page, 5, 'Last collected page is page 5');

    // Edge case: single page
    const singleAll = await collectAllPages(createPageGenerator(1));
    assertEqual(singleAll.length, 1, 'collectAllPages works with 1 page');

    // Edge case: zero pages
    const zeroAll = await collectAllPages(createPageGenerator(0));
    assertEqual(zeroAll.length, 0, 'collectAllPages works with 0 pages');

    // =========================================================================
    // Test collectUntilCondition
    // =========================================================================
    console.log('\n📋 SECTION 4: collectUntilCondition');
    console.log('-'.repeat(40));

    assertTypeOf(collectUntilCondition, 'function', 'collectUntilCondition is a function');

    // Stop at page 3
    const stopAt3 = await collectUntilCondition(
        createPageGenerator(10),
        (page) => page.page >= 3
    );
    assertEqual(stopAt3.length, 3, 'Stops at page 3 (includes page 3)');
    assertEqual(stopAt3[2].page, 3, 'Last collected is page 3');

    // Stop immediately
    const stopImmediate = await collectUntilCondition(
        createPageGenerator(10),
        (page) => page.page >= 1
    );
    assertEqual(stopImmediate.length, 1, 'Stops at first page');

    // Never stops (condition never true)
    const neverStop = await collectUntilCondition(
        createPageGenerator(5),
        (page) => page.page >= 100
    );
    assertEqual(neverStop.length, 5, 'Collects all if condition never true');

    // Stop based on data content
    const hasEnoughItems = await collectUntilCondition(
        createPageGenerator(10),
        (page) => !page.hasMore // Stop when no more pages
    );
    assertEqual(hasEnoughItems[hasEnoughItems.length - 1].hasMore, false, 
        'Stop condition based on hasMore works');

    // =========================================================================
    // Performance Test
    // =========================================================================
    console.log('\n📋 SECTION 5: Lazy Loading Verification');
    console.log('-'.repeat(40));

    // Verify pages are fetched lazily (one at a time)
    let fetchCount = 0;
    const trackingGen = createPageGenerator(5);
    const originalFetch = fetchPage;
    
    // Track how many we've yielded
    const lazyPages = [];
    const lazyGenFn = trackingGen();
    
    // Get just first 2 pages
    for await (const page of lazyGenFn) {
        lazyPages.push(page);
        if (lazyPages.length === 2) break;
    }

    assertEqual(lazyPages.length, 2, 'Can break out early from generator');
    assertEqual(lazyPages[1].page, 2, 'Got exactly 2 pages before break');

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
