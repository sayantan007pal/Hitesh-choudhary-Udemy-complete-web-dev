/**
 * Test Suite for bind() and Partial Application Challenge
 * ========================================================
 * 
 * Run this file with: node _5_test_bind_partial_application_example.js
 */

const {
    logger,
    infoLogger,
    errorLogger,
    debugLogger,
    authInfoLogger,
    createCustomLogger,
    createCategoryLogger
} = require('./_5_bind_partial_application_example.js');

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
    console.log('🧪 Running bind() and Partial Application Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test logger object
    // =========================================================================
    console.log('\n📋 LOGGER OBJECT');
    console.log('-'.repeat(40));

    // Test 1: logger exists
    assertTypeOf(logger, 'object', 'logger is an object');

    // Test 2: logger has prefix
    assertEqual(logger.prefix, "[APP]", 'logger.prefix is "[APP]"');

    // Test 3: logger has separator
    assertEqual(logger.separator, " | ", 'logger.separator is " | "');

    // Test 4: logger has log method
    assertTypeOf(logger.log, 'function', 'logger.log is a function');

    // Test 5: logger.log works correctly
    assertEqual(
        logger.log("INFO", "AUTH", "User logged in"),
        "[APP] | INFO | AUTH: User logged in",
        'logger.log("INFO", "AUTH", "User logged in") returns correct string'
    );

    // =========================================================================
    // Test specialized loggers with bind()
    // =========================================================================
    console.log('\n📋 SPECIALIZED LOGGERS (PARTIAL APPLICATION)');
    console.log('-'.repeat(40));

    // Test 6: infoLogger exists
    assertTypeOf(infoLogger, 'function', 'infoLogger is a function');

    // Test 7: infoLogger works correctly
    assertEqual(
        infoLogger("DB", "Connection established"),
        "[APP] | INFO | DB: Connection established",
        'infoLogger("DB", "Connection established") works correctly'
    );

    // Test 8: errorLogger exists
    assertTypeOf(errorLogger, 'function', 'errorLogger is a function');

    // Test 9: errorLogger works correctly
    assertEqual(
        errorLogger("API", "Request failed"),
        "[APP] | ERROR | API: Request failed",
        'errorLogger("API", "Request failed") works correctly'
    );

    // Test 10: debugLogger exists
    assertTypeOf(debugLogger, 'function', 'debugLogger is a function');

    // Test 11: debugLogger works correctly
    assertEqual(
        debugLogger("CACHE", "Cache hit"),
        "[APP] | DEBUG | CACHE: Cache hit",
        'debugLogger("CACHE", "Cache hit") works correctly'
    );

    // Test 12: authInfoLogger exists (pre-bound with level AND category)
    assertTypeOf(authInfoLogger, 'function', 'authInfoLogger is a function');

    // Test 13: authInfoLogger works with just message
    assertEqual(
        authInfoLogger("User logged in"),
        "[APP] | INFO | AUTH: User logged in",
        'authInfoLogger("User logged in") works with just message'
    );

    // =========================================================================
    // Test createCustomLogger
    // =========================================================================
    console.log('\n📋 CREATE CUSTOM LOGGER');
    console.log('-'.repeat(40));

    // Test 14: createCustomLogger function exists
    assertTypeOf(createCustomLogger, 'function', 'createCustomLogger is a function');

    // Test 15: createCustomLogger returns a function
    const customLog = createCustomLogger("🚀", " → ");
    assertTypeOf(customLog, 'function', 'createCustomLogger returns a function');

    // Test 16: custom logger works correctly
    assertEqual(
        customLog("INFO", "LAUNCH", "System starting"),
        "🚀 → INFO → LAUNCH: System starting",
        'customLog("INFO", "LAUNCH", "System starting") works correctly'
    );

    // Test 17: another custom logger
    const simpleLog = createCustomLogger(">>", "::");
    assertEqual(
        simpleLog("WARN", "MEMORY", "Low memory"),
        ">>::WARN::MEMORY: Low memory",
        'simpleLog with different prefix/separator works'
    );

    // =========================================================================
    // Test createCategoryLogger
    // =========================================================================
    console.log('\n📋 CREATE CATEGORY LOGGER');
    console.log('-'.repeat(40));

    // Test 18: createCategoryLogger function exists
    assertTypeOf(createCategoryLogger, 'function', 'createCategoryLogger is a function');

    // Test 19: createCategoryLogger returns a function
    const dbError = createCategoryLogger("ERROR", "DATABASE");
    assertTypeOf(dbError, 'function', 'createCategoryLogger returns a function');

    // Test 20: category logger works with just message
    assertEqual(
        dbError("Connection timeout"),
        "[APP] | ERROR | DATABASE: Connection timeout",
        'dbError("Connection timeout") works correctly'
    );

    // Test 21: another category logger
    const apiInfo = createCategoryLogger("INFO", "API");
    assertEqual(
        apiInfo("Request received"),
        "[APP] | INFO | API: Request received",
        'apiInfo("Request received") works correctly'
    );

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test 22: Empty message
    assertEqual(
        infoLogger("TEST", ""),
        "[APP] | INFO | TEST: ",
        'infoLogger handles empty message'
    );

    // Test 23: Special characters
    assertEqual(
        errorLogger("SYS", "Error: 'null' is not defined"),
        "[APP] | ERROR | SYS: Error: 'null' is not defined",
        'errorLogger handles special characters'
    );

    // Test 24: Bound loggers maintain context when passed around
    const passedLogger = infoLogger;
    assertEqual(
        passedLogger("PASS", "Still works"),
        "[APP] | INFO | PASS: Still works",
        'Bound logger works when assigned to another variable'
    );

    // Test 25: Multiple category loggers don't interfere
    const log1 = createCategoryLogger("DEBUG", "A");
    const log2 = createCategoryLogger("DEBUG", "B");
    assertEqual(log1("msg1"), "[APP] | DEBUG | A: msg1", 'First category logger independent');
    assertEqual(log2("msg2"), "[APP] | DEBUG | B: msg2", 'Second category logger independent');

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
