/**
 * Test Suite for Implicit Binding Challenge
 * ==========================================
 * 
 * Run this file with: node _2_test_implicit_binding_example.js
 */

const {
    outer,
    extractAndCall,
    safeExtractAndCall
} = require('./_2_implicit_binding_example.js');

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
    console.log('🧪 Running Implicit Binding Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test outer object structure
    // =========================================================================
    console.log('\n📋 OUTER OBJECT STRUCTURE');
    console.log('-'.repeat(40));

    // Test 1: outer object exists
    assertTypeOf(outer, 'object', 'outer is an object');

    // Test 2: outer has name property
    assertEqual(outer.name, "Outer", 'outer.name is "Outer"');

    // Test 3: outer has inner object
    assertTypeOf(outer.inner, 'object', 'outer.inner is an object');

    // Test 4: inner has name property
    assertEqual(outer.inner.name, "Inner", 'outer.inner.name is "Inner"');

    // Test 5: inner has getName method
    assertTypeOf(outer.inner.getName, 'function', 'outer.inner.getName is a function');

    // Test 6: outer has getOuterName method
    assertTypeOf(outer.getOuterName, 'function', 'outer.getOuterName is a function');

    // =========================================================================
    // Test implicit binding (left of the dot rule)
    // =========================================================================
    console.log('\n📋 IMPLICIT BINDING - Left of the Dot');
    console.log('-'.repeat(40));

    // Test 7: inner.getName() returns "Inner" (this = inner)
    assertEqual(outer.inner.getName(), "Inner", 'outer.inner.getName() returns "Inner"');

    // Test 8: outer.getOuterName() returns "Outer" (this = outer)
    assertEqual(outer.getOuterName(), "Outer", 'outer.getOuterName() returns "Outer"');

    // =========================================================================
    // Test extractAndCall (demonstrates lost this problem)
    // =========================================================================
    console.log('\n📋 EXTRACT AND CALL - Lost this Problem');
    console.log('-'.repeat(40));

    // Test 9: extractAndCall function exists
    assertTypeOf(extractAndCall, 'function', 'extractAndCall is a function');

    // Test 10: extractAndCall loses context (returns undefined for this.name)
    assertEqual(extractAndCall(outer, "inner.getName"), undefined, 'extractAndCall loses this context (returns undefined)');

    // Test 11: extractAndCall loses context for outer method too
    assertEqual(extractAndCall(outer, "getOuterName"), undefined, 'extractAndCall on outer method also loses context');

    // =========================================================================
    // Test safeExtractAndCall (properly binds context)
    // =========================================================================
    console.log('\n📋 SAFE EXTRACT AND CALL - Preserves Context');
    console.log('-'.repeat(40));

    // Test 12: safeExtractAndCall function exists
    assertTypeOf(safeExtractAndCall, 'function', 'safeExtractAndCall is a function');

    // Test 13: safeExtractAndCall preserves inner context
    assertEqual(safeExtractAndCall(outer, "inner.getName"), "Inner", 'safeExtractAndCall preserves inner context');

    // Test 14: safeExtractAndCall preserves outer context
    assertEqual(safeExtractAndCall(outer, "getOuterName"), "Outer", 'safeExtractAndCall preserves outer context');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test 15: Test with custom nested object
    const customObj = {
        name: "Custom",
        level1: {
            name: "Level1",
            level2: {
                name: "Level2",
                getName: function() { return this.name; }
            },
            getName: function() { return this.name; }
        }
    };

    assertEqual(safeExtractAndCall(customObj, "level1.getName"), "Level1", 'safeExtractAndCall works with custom object level1');
    assertEqual(safeExtractAndCall(customObj, "level1.level2.getName"), "Level2", 'safeExtractAndCall works with deeper nesting');

    // Test 16: Lost this with deeper nesting
    assertEqual(extractAndCall(customObj, "level1.level2.getName"), undefined, 'extractAndCall loses context with deep nesting');

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
