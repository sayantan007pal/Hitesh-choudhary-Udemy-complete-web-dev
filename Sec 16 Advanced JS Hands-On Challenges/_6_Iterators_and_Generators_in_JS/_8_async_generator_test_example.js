/**
 * Test Suite for Async Generators - Challenge 8
 * ==============================================
 * Run: node _8_async_generator_test_example.js
 */

const { asyncCounter, asyncDataFetcher, asyncPaginator } = require('./_8_async_generator_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: ${JSON.stringify(expected)}\n   Actual: ${JSON.stringify(actual)}`); testsFailed++; }
}

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Async Generator Tests');
    console.log('='.repeat(60) + '\n');

    // Task 1: asyncCounter
    console.log('\n📋 TASK 1: asyncCounter\n' + '-'.repeat(40));
    const counter = asyncCounter(3, 10);
    const counterResults = [];
    for await (const num of counter) { counterResults.push(num); }
    assertEqual(counterResults, [1, 2, 3], 'Counts 1 to 3');

    const counter5 = asyncCounter(5, 5);
    const c5Results = [];
    for await (const num of counter5) { c5Results.push(num); }
    assertEqual(c5Results, [1, 2, 3, 4, 5], 'Counts 1 to 5');

    const counter0 = asyncCounter(0, 5);
    const c0Results = [];
    for await (const num of counter0) { c0Results.push(num); }
    assertEqual(c0Results, [], 'Zero max gives empty');

    // Task 2: asyncDataFetcher
    console.log('\n📋 TASK 2: asyncDataFetcher\n' + '-'.repeat(40));
    const urls = ['api/users', 'api/posts'];
    const fetcher = asyncDataFetcher(urls);
    const fetchResults = [];
    for await (const result of fetcher) { fetchResults.push(result); }
    assertEqual(fetchResults.length, 2, 'Fetches 2 URLs');
    assertEqual(fetchResults[0].url, 'api/users', 'First URL correct');
    assertEqual(fetchResults[0].data, 'Data from api/users', 'First data correct');
    assertEqual(fetchResults[1].url, 'api/posts', 'Second URL correct');

    const emptyFetcher = asyncDataFetcher([]);
    const emptyResults = [];
    for await (const r of emptyFetcher) { emptyResults.push(r); }
    assertEqual(emptyResults, [], 'Empty URLs gives empty results');

    // Task 3: asyncPaginator
    console.log('\n📋 TASK 3: asyncPaginator\n' + '-'.repeat(40));
    const items = [1, 2, 3, 4, 5, 6, 7];
    const paginator = asyncPaginator(items, 3);
    const pages = [];
    for await (const page of paginator) { pages.push(page); }
    assertEqual(pages[0], [1, 2, 3], 'First page [1,2,3]');
    assertEqual(pages[1], [4, 5, 6], 'Second page [4,5,6]');
    assertEqual(pages[2], [7], 'Third page [7]');
    assertEqual(pages.length, 3, 'Total 3 pages');

    const exactPages = asyncPaginator([1, 2, 3, 4], 2);
    const exactResults = [];
    for await (const p of exactPages) { exactResults.push(p); }
    assertEqual(exactResults, [[1, 2], [3, 4]], 'Exact division: 2 pages');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total: ${totalTests} | ✅ ${testsPassed} | ❌ ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
