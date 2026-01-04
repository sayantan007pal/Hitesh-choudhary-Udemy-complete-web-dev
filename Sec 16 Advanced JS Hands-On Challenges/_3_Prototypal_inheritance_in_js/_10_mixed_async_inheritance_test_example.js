/**
 * Test Suite for Mixed Async + Inheritance
 * ==========================================
 * 
 * Run: node _10_mixed_async_inheritance_test_example.js
 */

const {
    DataService,
    UserService,
    CachedUserService,
    delay
} = require('./_10_mixed_async_inheritance_example.js');

let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
    }
}

function assertTrue(condition, testName) {
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
    }
}

function assertFalse(condition, testName) {
    if (!condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
    }
}

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Mixed Async + Inheritance Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // DataService Tests
    // =========================================================================
    console.log('\n📋 DATASERVICE TESTS');
    console.log('-'.repeat(40));

    const dataService = new DataService('https://api.test.com');
    
    assertEqual(dataService.baseUrl, 'https://api.test.com', 'Stores baseUrl');
    assertTrue(dataService.cache instanceof Map, 'Has cache Map');
    assertEqual(dataService.getCacheSize(), 0, 'Cache starts empty');

    // Fetch
    const fetchStart = Date.now();
    const fetchResult = await dataService.fetch('/endpoint');
    const fetchDuration = Date.now() - fetchStart;

    assertEqual(
        fetchResult,
        'Data from https://api.test.com/endpoint',
        'fetch returns correct data'
    );
    assertTrue(fetchDuration >= 45, 'fetch has simulated delay');

    // fetchWithCache
    const cacheResult1 = await dataService.fetchWithCache('/cached');
    assertEqual(dataService.getCacheSize(), 1, 'Cache size increases after fetch');

    const cacheStart = Date.now();
    const cacheResult2 = await dataService.fetchWithCache('/cached');
    const cacheDuration = Date.now() - cacheStart;

    assertEqual(cacheResult1, cacheResult2, 'Cached result matches original');
    assertTrue(cacheDuration < 10, 'Cached fetch is instant');

    // clearCache
    dataService.clearCache();
    assertEqual(dataService.getCacheSize(), 0, 'clearCache empties cache');

    // =========================================================================
    // UserService Tests
    // =========================================================================
    console.log('\n📋 USERSERVICE TESTS');
    console.log('-'.repeat(40));

    const userService = new UserService('https://api.test.com');
    
    assertEqual(
        userService.baseUrl,
        'https://api.test.com/users',
        'UserService appends /users to baseUrl'
    );

    // getUser
    const user = await userService.getUser(42);
    assertEqual(user.id, 42, 'getUser returns correct id');
    assertTrue(
        user.data.includes('42'),
        'getUser data includes user id'
    );

    // getUsers (parallel)
    const parallelStart = Date.now();
    const users = await userService.getUsers([1, 2, 3]);
    const parallelDuration = Date.now() - parallelStart;

    assertEqual(users.length, 3, 'getUsers returns all users');
    assertEqual(users[0].id, 1, 'First user has correct id');
    assertEqual(users[2].id, 3, 'Third user has correct id');
    assertTrue(
        parallelDuration < 150,
        `getUsers runs in parallel (took ${parallelDuration}ms)`
    );

    // getUserSequential
    const seqStart = Date.now();
    const seqUsers = await userService.getUserSequential([1, 2, 3]);
    const seqDuration = Date.now() - seqStart;

    assertEqual(seqUsers.length, 3, 'Sequential returns all users');
    assertTrue(
        seqDuration >= 140,
        `getUserSequential runs sequentially (took ${seqDuration}ms)`
    );

    // Inheritance checks
    assertTrue(userService instanceof UserService, 'Is UserService instance');
    assertTrue(userService instanceof DataService, 'Is DataService instance');
    assertEqual(typeof userService.clearCache, 'function', 'Inherits clearCache');

    // =========================================================================
    // CachedUserService Tests
    // =========================================================================
    console.log('\n📋 CACHEDUSERSERVICE TESTS');
    console.log('-'.repeat(40));

    const cachedService = new CachedUserService('https://api.test.com', 200);
    
    assertEqual(cachedService.ttlMs, 200, 'Stores TTL');
    assertTrue(cachedService.timestamps instanceof Map, 'Has timestamps Map');

    // First fetch (no cache)
    const firstFetch = await cachedService.getUser(1);
    assertEqual(firstFetch.id, 1, 'First fetch returns user');

    // Second fetch (cached, within TTL)
    const cachedStart = Date.now();
    const cachedFetch = await cachedService.getUser(1);
    const cachedDuration = Date.now() - cachedStart;

    assertEqual(cachedFetch.id, 1, 'Cached fetch returns same user');
    assertTrue(cachedDuration < 10, 'Cached fetch is instant');

    // Wait for TTL to expire
    await delay(250);
    assertTrue(cachedService.isExpired(1), 'isExpired returns true after TTL');

    // Fetch after expiry (should re-fetch)
    const expiredStart = Date.now();
    await cachedService.getUser(1);
    const expiredDuration = Date.now() - expiredStart;

    assertTrue(
        expiredDuration >= 45,
        'Expired cache triggers new fetch'
    );

    // refreshUser force-fetches
    cachedService.clearCache();
    await cachedService.getUser(5);
    assertFalse(cachedService.isExpired(5), 'Fresh cache is not expired');

    const refreshStart = Date.now();
    await cachedService.refreshUser(5);
    const refreshDuration = Date.now() - refreshStart;

    assertTrue(
        refreshDuration >= 45,
        'refreshUser force-fetches even if cached'
    );

    // Inheritance chain
    assertTrue(cachedService instanceof CachedUserService, 'Is CachedUserService');
    assertTrue(cachedService instanceof UserService, 'Is UserService');
    assertTrue(cachedService instanceof DataService, 'Is DataService');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Empty arrays
    const emptyUsers = await userService.getUsers([]);
    assertEqual(emptyUsers, [], 'getUsers handles empty array');

    const emptySeq = await userService.getUserSequential([]);
    assertEqual(emptySeq, [], 'getUserSequential handles empty array');

    // Single user
    const singleUser = await userService.getUsers([99]);
    assertEqual(singleUser.length, 1, 'getUsers works with single id');

    // =========================================================================
    // Final Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${testsPassed + testsFailed}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉\n');
        console.log('You have completed all the challenges! 🏆');
        console.log('You are now interview-ready on Promises & Prototypal Inheritance!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
