/**
 * Test Suite: Chained Async Operations
 * =====================================
 * 
 * Run this file with: node _10_chained_async_operations_test_example.js
 */

const {
    fetchUser,
    fetchUserOrders,
    fetchOrderDetails,
    fetchCompleteUserData,
    fetchMultipleUsersData
} = require('./_10_chained_async_operations_example.js');

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
    console.log('🧪 Running Chained Async Operations Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test Individual Functions
    // =========================================================================
    console.log('\n📋 SECTION 1: Individual Fetch Functions');
    console.log('-'.repeat(40));

    // fetchUser
    assertTypeOf(fetchUser, 'function', 'fetchUser is a function');
    const user = await fetchUser(42);
    assertDeepEqual(user, { id: 42, name: "User_42" }, 'fetchUser returns correct user');

    // fetchUserOrders
    assertTypeOf(fetchUserOrders, 'function', 'fetchUserOrders is a function');
    const orders = await fetchUserOrders(42);
    assertEqual(Array.isArray(orders), true, 'fetchUserOrders returns array');
    assertEqual(orders.length, 2, 'fetchUserOrders returns 2 orders');
    assertEqual(orders[0].userId, 42, 'Orders have correct userId');
    assertEqual(orders[0].orderId, 1, 'First order has orderId 1');
    assertEqual(orders[1].orderId, 2, 'Second order has orderId 2');

    // fetchOrderDetails
    assertTypeOf(fetchOrderDetails, 'function', 'fetchOrderDetails is a function');
    const orderDetails = await fetchOrderDetails(1);
    assertEqual(orderDetails.orderId, 1, 'fetchOrderDetails returns correct orderId');
    assertEqual(Array.isArray(orderDetails.items), true, 'Order has items array');
    assertEqual(orderDetails.status, "shipped", 'Order has status');

    // =========================================================================
    // Test fetchCompleteUserData
    // =========================================================================
    console.log('\n📋 SECTION 2: fetchCompleteUserData');
    console.log('-'.repeat(40));

    assertTypeOf(fetchCompleteUserData, 'function', 'fetchCompleteUserData is a function');

    const completeData = await fetchCompleteUserData(99);
    
    // Check user
    assertEqual(completeData.user.id, 99, 'Complete data has correct user id');
    assertEqual(completeData.user.name, "User_99", 'Complete data has correct user name');

    // Check orders
    assertEqual(Array.isArray(completeData.orders), true, 'Complete data has orders array');
    assertEqual(completeData.orders.length, 2, 'Complete data has 2 orders');

    // Check order details are merged
    const firstOrder = completeData.orders[0];
    assertEqual(firstOrder.orderId !== undefined, true, 'Order has orderId');
    assertEqual(firstOrder.total !== undefined, true, 'Order has total');
    assertEqual(Array.isArray(firstOrder.items), true, 'Order has items from details');
    assertEqual(firstOrder.status, "shipped", 'Order has status from details');

    // =========================================================================
    // Test fetchMultipleUsersData
    // =========================================================================
    console.log('\n📋 SECTION 3: fetchMultipleUsersData');
    console.log('-'.repeat(40));

    assertTypeOf(fetchMultipleUsersData, 'function', 'fetchMultipleUsersData is a function');

    const multipleUsers = await fetchMultipleUsersData([1, 2, 3]);
    assertEqual(Array.isArray(multipleUsers), true, 'Returns array');
    assertEqual(multipleUsers.length, 3, 'Returns data for 3 users');
    assertEqual(multipleUsers[0].user.id, 1, 'First user has id 1');
    assertEqual(multipleUsers[1].user.id, 2, 'Second user has id 2');
    assertEqual(multipleUsers[2].user.id, 3, 'Third user has id 3');

    // All users have complete data
    for (let i = 0; i < multipleUsers.length; i++) {
        assertEqual(multipleUsers[i].orders.length, 2, `User ${i+1} has 2 orders`);
    }

    // =========================================================================
    // Performance Tests
    // =========================================================================
    console.log('\n📋 SECTION 4: Performance (Parallel Optimization)');
    console.log('-'.repeat(40));

    // fetchCompleteUserData should fetch order details in parallel
    // Sequential: user(50) + orders(50) + details(50*2) = 200ms
    // Parallel details: user(50) + orders(50) + details(50) = 150ms
    const singleStart = Date.now();
    await fetchCompleteUserData(1);
    const singleElapsed = Date.now() - singleStart;

    totalTests++;
    if (singleElapsed < 180) {
        console.log(`✅ PASS: Order details fetched in parallel (${singleElapsed}ms < 180ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Order details should be fetched in parallel (took ${singleElapsed}ms)`);
        console.log(`   Hint: Use Promise.all to fetch all order details at once`);
        testsFailed++;
    }

    // fetchMultipleUsersData should process users in parallel
    // Sequential: 150ms * 3 = 450ms
    // Parallel: 150ms
    const multiStart = Date.now();
    await fetchMultipleUsersData([1, 2, 3]);
    const multiElapsed = Date.now() - multiStart;

    totalTests++;
    if (multiElapsed < 300) {
        console.log(`✅ PASS: Multiple users fetched in parallel (${multiElapsed}ms < 300ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Multiple users should be parallel (took ${multiElapsed}ms)`);
        console.log(`   Hint: Use Promise.all to fetch all users at once`);
        testsFailed++;
    }

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 SECTION 5: Edge Cases');
    console.log('-'.repeat(40));

    // Single user
    const singleUserData = await fetchMultipleUsersData([42]);
    assertEqual(singleUserData.length, 1, 'Works with single user');
    assertEqual(singleUserData[0].user.id, 42, 'Single user data correct');

    // Empty array
    const emptyUsers = await fetchMultipleUsersData([]);
    assertEqual(emptyUsers.length, 0, 'Works with empty user array');

    // User with id 0
    const zeroUser = await fetchCompleteUserData(0);
    assertEqual(zeroUser.user.id, 0, 'Works with userId 0');

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
