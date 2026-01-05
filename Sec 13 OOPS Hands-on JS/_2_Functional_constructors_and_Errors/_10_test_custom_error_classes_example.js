/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: Custom Error Classes with Constructor Pattern                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _10_test_custom_error_classes_example.js
 */

const {
    AppError,
    ValidationError,
    NetworkError,
    AuthenticationError,
    handleError,
    isAppError
} = require('./_10_custom_error_classes_example.js');

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

function assertTrue(condition, testName) {
    totalTests++;
    if (condition === true) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: true`);
        console.log(`   Actual:   ${condition}`);
        testsFailed++;
        return false;
    }
}

function assertFalse(condition, testName) {
    totalTests++;
    if (condition === false) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: false`);
        console.log(`   Actual:   ${condition}`);
        testsFailed++;
        return false;
    }
}

function assertTypeOf(value, expectedType, testName) {
    totalTests++;
    const actualType = typeof value;
    if (actualType === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${expectedType}`);
        console.log(`   Actual type:   ${actualType}`);
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
        console.log(`   Expected: instanceof ${constructor.name}`);
        console.log(`   Actual:   not an instance`);
        testsFailed++;
        return false;
    }
}

function assertDeepEqual(actual, expected, testName) {
    totalTests++;
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    if (isEqual) {
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

function assertDefined(value, testName) {
    totalTests++;
    if (value !== undefined) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: defined value`);
        console.log(`   Actual:   undefined`);
        testsFailed++;
        return false;
    }
}

function printSectionHeader(title) {
    console.log('\n' + '='.repeat(70));
    console.log(`📋 ${title}`);
    console.log('='.repeat(70));
}

function printFinalResults() {
    console.log('\n' + '═'.repeat(70));
    console.log('📊 FINAL RESULTS');
    console.log('═'.repeat(70));
    console.log(`   Total Tests:  ${totalTests}`);
    console.log(`   ✅ Passed:    ${testsPassed}`);
    console.log(`   ❌ Failed:    ${testsFailed}`);
    console.log(`   Success Rate: ${((testsPassed / totalTests) * 100).toFixed(1)}%`);
    console.log('═'.repeat(70));
    
    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉\n');
    } else {
        console.log('\n💪 Keep trying! Review the failed tests and try again.\n');
    }
}

// =============================================================================
// TEST SUITE
// =============================================================================

console.log('\n🧪 Running Custom Error Classes Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: AppError Tests
// -----------------------------------------------------------------------------
printSectionHeader('APP ERROR TESTS');

const appError = new AppError('Something went wrong', 'CUSTOM_CODE');

assertInstanceOf(appError, Error, 'AppError is instanceof Error');
assertInstanceOf(appError, AppError, 'AppError is instanceof AppError');

assertEqual(appError.name, 'AppError', 'AppError has correct name');
assertEqual(appError.message, 'Something went wrong', 'AppError stores message');
assertEqual(appError.code, 'CUSTOM_CODE', 'AppError stores custom code');

assertDefined(appError.timestamp, 'AppError has timestamp');
assertTrue(appError.timestamp instanceof Date, 'Timestamp is a Date object');

assertDefined(appError.stack, 'AppError has stack trace');
assertTrue(appError.stack.includes('AppError'), 'Stack trace contains error name');

// Default code
const defaultError = new AppError('Default code test');
assertEqual(defaultError.code, 'UNKNOWN_ERROR', 'AppError uses default code');

// -----------------------------------------------------------------------------
// Section 2: ValidationError Tests
// -----------------------------------------------------------------------------
printSectionHeader('VALIDATION ERROR TESTS');

const validationError = new ValidationError('Email is required', 'email');

// Inheritance chain
assertInstanceOf(validationError, Error, 'ValidationError is instanceof Error');
assertInstanceOf(validationError, AppError, 'ValidationError is instanceof AppError');
assertInstanceOf(validationError, ValidationError, 'ValidationError is instanceof ValidationError');

// Properties
assertEqual(validationError.name, 'ValidationError', 'ValidationError has correct name');
assertEqual(validationError.message, 'Email is required', 'ValidationError stores message');
assertEqual(validationError.code, 'VALIDATION_ERROR', 'ValidationError has correct code');
assertEqual(validationError.field, 'email', 'ValidationError stores field');

assertDefined(validationError.timestamp, 'ValidationError has timestamp');
assertDefined(validationError.stack, 'ValidationError has stack trace');

// -----------------------------------------------------------------------------
// Section 3: NetworkError Tests
// -----------------------------------------------------------------------------
printSectionHeader('NETWORK ERROR TESTS');

const networkError = new NetworkError('Server unavailable', 503);

// Inheritance chain
assertInstanceOf(networkError, Error, 'NetworkError is instanceof Error');
assertInstanceOf(networkError, AppError, 'NetworkError is instanceof AppError');
assertInstanceOf(networkError, NetworkError, 'NetworkError is instanceof NetworkError');

// Properties
assertEqual(networkError.name, 'NetworkError', 'NetworkError has correct name');
assertEqual(networkError.message, 'Server unavailable', 'NetworkError stores message');
assertEqual(networkError.code, 'NETWORK_ERROR', 'NetworkError has correct code');
assertEqual(networkError.statusCode, 503, 'NetworkError stores statusCode');

assertDefined(networkError.timestamp, 'NetworkError has timestamp');

// Different status codes
const notFoundError = new NetworkError('Not found', 404);
assertEqual(notFoundError.statusCode, 404, 'NetworkError handles 404');

const serverError = new NetworkError('Internal error', 500);
assertEqual(serverError.statusCode, 500, 'NetworkError handles 500');

// -----------------------------------------------------------------------------
// Section 4: AuthenticationError Tests
// -----------------------------------------------------------------------------
printSectionHeader('AUTHENTICATION ERROR TESTS');

const authError = new AuthenticationError('Invalid credentials', 'user123');

// Inheritance chain
assertInstanceOf(authError, Error, 'AuthenticationError is instanceof Error');
assertInstanceOf(authError, AppError, 'AuthenticationError is instanceof AppError');
assertInstanceOf(authError, AuthenticationError, 'AuthenticationError is instanceof AuthenticationError');

// Properties
assertEqual(authError.name, 'AuthenticationError', 'AuthenticationError has correct name');
assertEqual(authError.message, 'Invalid credentials', 'AuthenticationError stores message');
assertEqual(authError.code, 'AUTH_ERROR', 'AuthenticationError has correct code');
assertEqual(authError.userId, 'user123', 'AuthenticationError stores userId');

// Without userId
const authErrorNoUser = new AuthenticationError('Session expired');
assertEqual(authErrorNoUser.message, 'Session expired', 'AuthError without userId stores message');
assertEqual(authErrorNoUser.userId, undefined, 'AuthError without userId has undefined userId');

// -----------------------------------------------------------------------------
// Section 5: handleError Function Tests
// -----------------------------------------------------------------------------
printSectionHeader('HANDLE ERROR FUNCTION TESTS');

// ValidationError handling
const valResult = handleError(new ValidationError('Name required', 'name'));
assertDeepEqual(valResult, {
    handled: true,
    type: 'validation',
    field: 'name',
    message: 'Name required'
}, 'handleError handles ValidationError');

// NetworkError handling
const netResult = handleError(new NetworkError('Timeout', 408));
assertDeepEqual(netResult, {
    handled: true,
    type: 'network',
    statusCode: 408,
    message: 'Timeout'
}, 'handleError handles NetworkError');

// AuthenticationError handling
const authResult = handleError(new AuthenticationError('Unauthorized'));
assertDeepEqual(authResult, {
    handled: true,
    type: 'auth',
    message: 'Unauthorized'
}, 'handleError handles AuthenticationError');

// AppError handling (not a subclass)
const appResult = handleError(new AppError('App error', 'SOME_CODE'));
assertDeepEqual(appResult, {
    handled: true,
    type: 'app',
    code: 'SOME_CODE',
    message: 'App error'
}, 'handleError handles AppError');

// Regular Error handling
const regularResult = handleError(new Error('Regular error'));
assertDeepEqual(regularResult, {
    handled: false,
    type: 'unknown',
    message: 'Regular error'
}, 'handleError handles regular Error');

// TypeError handling (regular error)
const typeResult = handleError(new TypeError('Type error'));
assertEqual(typeResult.handled, false, 'handleError treats TypeError as unhandled');
assertEqual(typeResult.type, 'unknown', 'TypeError is unknown type');

// -----------------------------------------------------------------------------
// Section 6: isAppError Function Tests
// -----------------------------------------------------------------------------
printSectionHeader('IS APP ERROR FUNCTION TESTS');

assertTrue(isAppError(new AppError('test')), 'isAppError returns true for AppError');
assertTrue(isAppError(new ValidationError('test', 'field')), 'isAppError returns true for ValidationError');
assertTrue(isAppError(new NetworkError('test', 500)), 'isAppError returns true for NetworkError');
assertTrue(isAppError(new AuthenticationError('test')), 'isAppError returns true for AuthenticationError');

assertFalse(isAppError(new Error('regular')), 'isAppError returns false for Error');
assertFalse(isAppError(new TypeError('type')), 'isAppError returns false for TypeError');
assertFalse(isAppError(new RangeError('range')), 'isAppError returns false for RangeError');
assertFalse(isAppError({}), 'isAppError returns false for plain object');
assertFalse(isAppError(null), 'isAppError returns false for null');
assertFalse(isAppError(undefined), 'isAppError returns false for undefined');

// -----------------------------------------------------------------------------
// Section 7: Error Can Be Thrown and Caught
// -----------------------------------------------------------------------------
printSectionHeader('THROW AND CATCH TESTS');

let caughtError = null;

try {
    throw new ValidationError('Test throw', 'testField');
} catch (e) {
    caughtError = e;
}

assertInstanceOf(caughtError, ValidationError, 'ValidationError can be thrown and caught');
assertEqual(caughtError.field, 'testField', 'Caught error has field property');

// Can be caught as Error
try {
    throw new NetworkError('Network fail', 502);
} catch (e) {
    assertInstanceOf(e, Error, 'NetworkError caught as Error');
}

// -----------------------------------------------------------------------------
// Section 8: Prototype Chain Verification
// -----------------------------------------------------------------------------
printSectionHeader('PROTOTYPE CHAIN VERIFICATION');

assertTrue(
    Object.getPrototypeOf(ValidationError.prototype) === AppError.prototype,
    'ValidationError.prototype.__proto__ === AppError.prototype'
);

assertTrue(
    Object.getPrototypeOf(NetworkError.prototype) === AppError.prototype,
    'NetworkError.prototype.__proto__ === AppError.prototype'
);

assertTrue(
    Object.getPrototypeOf(AuthenticationError.prototype) === AppError.prototype,
    'AuthenticationError.prototype.__proto__ === AppError.prototype'
);

assertTrue(
    Object.getPrototypeOf(AppError.prototype) === Error.prototype,
    'AppError.prototype.__proto__ === Error.prototype'
);

// Constructor properties
assertEqual(
    ValidationError.prototype.constructor,
    ValidationError,
    'ValidationError.prototype.constructor is ValidationError'
);

assertEqual(
    AppError.prototype.constructor,
    AppError,
    'AppError.prototype.constructor is AppError'
);

// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
