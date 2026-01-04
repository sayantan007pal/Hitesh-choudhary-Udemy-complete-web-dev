/**
 * Test Suite for Secret Holder - Data Privacy with Closures
 * ==========================================================
 * 
 * Run this file with: node _2_test_example.js
 */

const { createSecretHolder } = require('./_2_example.js');

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
    console.log('🧪 Running Secret Holder Tests (Data Privacy)');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Basic Functionality Tests
    // =========================================================================
    console.log('\n📋 BASIC FUNCTIONALITY');
    console.log('-'.repeat(40));

    // Test 1: Function exists
    assertTypeOf(createSecretHolder, 'function', 'createSecretHolder is a function');

    // Test 2: Returns an object
    const holder = createSecretHolder("test");
    assertTypeOf(holder, 'object', 'createSecretHolder returns an object');

    // Test 3: getSecret method exists
    assertTypeOf(holder.getSecret, 'function', 'getSecret method exists');

    // Test 4: setSecret method exists
    assertTypeOf(holder.setSecret, 'function', 'setSecret method exists');

    // Test 5: getSecret returns initial value
    const holder1 = createSecretHolder("myPassword");
    assertEqual(holder1.getSecret(), "myPassword", 'getSecret returns initial secret');

    // Test 6: setSecret changes the value
    holder1.setSecret("newPassword");
    assertEqual(holder1.getSecret(), "newPassword", 'setSecret updates the secret');

    // =========================================================================
    // Privacy Tests (Critical for Interview!)
    // =========================================================================
    console.log('\n📋 PRIVACY TESTS (Critical!)');
    console.log('-'.repeat(40));

    // Test 7: Direct access to secret is undefined
    const holder2 = createSecretHolder("privateData");
    assertEqual(holder2.secret, undefined, 'Direct .secret access returns undefined (truly private)');

    // Test 8: Cannot find secret in object keys
    const keys = Object.keys(holder2);
    const hasSecretKey = keys.includes('secret') || keys.includes('_secret') || keys.includes('initialSecret');
    assertEqual(hasSecretKey, false, 'Secret is not exposed as object property');

    // =========================================================================
    // Independence Tests
    // =========================================================================
    console.log('\n📋 INSTANCE INDEPENDENCE');
    console.log('-'.repeat(40));

    // Test 9: Multiple instances are independent
    const holderA = createSecretHolder("secretA");
    const holderB = createSecretHolder("secretB");
    assertEqual(holderA.getSecret(), "secretA", 'Instance A has its own secret');
    assertEqual(holderB.getSecret(), "secretB", 'Instance B has its own secret');

    // Test 10: Modifying one doesn't affect the other
    holderA.setSecret("modifiedA");
    assertEqual(holderA.getSecret(), "modifiedA", 'Instance A updated');
    assertEqual(holderB.getSecret(), "secretB", 'Instance B unchanged after A modified');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test 11: Works with numbers
    const numHolder = createSecretHolder(42);
    assertEqual(numHolder.getSecret(), 42, 'Works with number secrets');

    // Test 12: Works with empty string
    const emptyHolder = createSecretHolder("");
    assertEqual(emptyHolder.getSecret(), "", 'Works with empty string');

    // Test 13: Works with null
    const nullHolder = createSecretHolder(null);
    assertEqual(nullHolder.getSecret(), null, 'Works with null');

    // Test 14: Works with undefined
    const undefinedHolder = createSecretHolder(undefined);
    assertEqual(undefinedHolder.getSecret(), undefined, 'Works with undefined');

    // Test 15: Works with object
    const objHolder = createSecretHolder({ key: "value" });
    assertEqual(objHolder.getSecret().key, "value", 'Works with object secrets');

    // Test 16: Works with array
    const arrHolder = createSecretHolder([1, 2, 3]);
    assertEqual(arrHolder.getSecret()[0], 1, 'Works with array secrets');

    // Test 17: Can update multiple times
    const multiHolder = createSecretHolder("first");
    multiHolder.setSecret("second");
    multiHolder.setSecret("third");
    multiHolder.setSecret("fourth");
    assertEqual(multiHolder.getSecret(), "fourth", 'Multiple updates work correctly');

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
