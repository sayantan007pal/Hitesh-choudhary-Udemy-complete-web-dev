/**
 * Test Suite for Explicit Binding with call() Challenge
 * ======================================================
 * 
 * Run this file with: node _3_test_explicit_binding_call_example.js
 */

const {
    formatEntity,
    user,
    product,
    order,
    formatMultiple,
    borrowFormatter
} = require('./_3_explicit_binding_call_example.js');

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

function assertArrayEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
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

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Explicit Binding with call() Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test object structures
    // =========================================================================
    console.log('\n📋 OBJECT STRUCTURES');
    console.log('-'.repeat(40));

    // Test 1-3: user object
    assertEqual(user.type, "User", 'user.type is "User"');
    assertEqual(user.id, 1, 'user.id is 1');
    assertEqual(user.name, "Alice", 'user.name is "Alice"');

    // Test 4-6: product object
    assertEqual(product.type, "Product", 'product.type is "Product"');
    assertEqual(product.id, 101, 'product.id is 101');
    assertEqual(product.name, "Laptop", 'product.name is "Laptop"');

    // Test 7-9: order object
    assertEqual(order.type, "Order", 'order.type is "Order"');
    assertEqual(order.id, 5001, 'order.id is 5001');
    assertEqual(order.name, "Electronics Bundle", 'order.name is "Electronics Bundle"');

    // =========================================================================
    // Test formatEntity with call()
    // =========================================================================
    console.log('\n📋 FORMAT ENTITY WITH CALL()');
    console.log('-'.repeat(40));

    // Test 10: formatEntity function exists
    assertTypeOf(formatEntity, 'function', 'formatEntity is a function');

    // Test 11: formatEntity with user
    assertEqual(
        formatEntity.call(user, "LOG", "OK"),
        "[LOG] User #1: Alice [OK]",
        'formatEntity.call(user, "LOG", "OK") works correctly'
    );

    // Test 12: formatEntity with product
    assertEqual(
        formatEntity.call(product, "DEBUG", "COMPLETE"),
        "[DEBUG] Product #101: Laptop [COMPLETE]",
        'formatEntity.call(product, "DEBUG", "COMPLETE") works correctly'
    );

    // Test 13: formatEntity with order
    assertEqual(
        formatEntity.call(order, "INFO", "PROCESSED"),
        "[INFO] Order #5001: Electronics Bundle [PROCESSED]",
        'formatEntity.call(order, "INFO", "PROCESSED") works correctly'
    );

    // =========================================================================
    // Test formatMultiple
    // =========================================================================
    console.log('\n📋 FORMAT MULTIPLE ENTITIES');
    console.log('-'.repeat(40));

    // Test 14: formatMultiple function exists
    assertTypeOf(formatMultiple, 'function', 'formatMultiple is a function');

    // Test 15: formatMultiple with all entities
    assertArrayEqual(
        formatMultiple([user, product, order]),
        [
            "[INFO] User #1: Alice [DONE]",
            "[INFO] Product #101: Laptop [DONE]",
            "[INFO] Order #5001: Electronics Bundle [DONE]"
        ],
        'formatMultiple formats all entities correctly'
    );

    // Test 16: formatMultiple with empty array
    assertArrayEqual(
        formatMultiple([]),
        [],
        'formatMultiple handles empty array'
    );

    // Test 17: formatMultiple with single entity
    assertArrayEqual(
        formatMultiple([user]),
        ["[INFO] User #1: Alice [DONE]"],
        'formatMultiple handles single entity'
    );

    // =========================================================================
    // Test borrowFormatter
    // =========================================================================
    console.log('\n📋 BORROW FORMATTER WITH CALL()');
    console.log('-'.repeat(40));

    // Test 18: borrowFormatter function exists
    assertTypeOf(borrowFormatter, 'function', 'borrowFormatter is a function');

    // Test 19: borrowFormatter with custom object
    const customEntity = { type: "Custom", id: 999, name: "Test Entity" };
    assertEqual(
        borrowFormatter(customEntity, "CUSTOM", "END"),
        "[CUSTOM] Custom #999: Test Entity [END]",
        'borrowFormatter works with custom object'
    );

    // Test 20: borrowFormatter with different prefix/suffix
    assertEqual(
        borrowFormatter(user, "START", "FINISH"),
        "[START] User #1: Alice [FINISH]",
        'borrowFormatter works with different prefix/suffix'
    );

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test 21: Empty prefix and suffix
    assertEqual(
        formatEntity.call(user, "", ""),
        "[] User #1: Alice []",
        'formatEntity handles empty prefix/suffix'
    );

    // Test 22: Special characters in prefix/suffix
    assertEqual(
        formatEntity.call(user, "🚀", "✅"),
        "[🚀] User #1: Alice [✅]",
        'formatEntity handles emoji in prefix/suffix'
    );

    // Test 23: Object with numeric name
    const numericName = { type: "Num", id: 42, name: "123" };
    assertEqual(
        borrowFormatter(numericName, "TEST", "OK"),
        "[TEST] Num #42: 123 [OK]",
        'borrowFormatter handles numeric string name'
    );

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

runTests();
