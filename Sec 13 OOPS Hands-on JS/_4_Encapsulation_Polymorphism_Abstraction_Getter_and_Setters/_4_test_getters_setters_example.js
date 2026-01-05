/**
 * Test Suite for Getters & Setters Challenge #4
 * ==============================================
 * 
 * Run this file with: node _4_test_getters_setters_example.js
 * 
 * Tests your UserProfile, Temperature, and SmartRectangle implementations for:
 *   - Computed properties (getters)
 *   - Validation (setters)
 *   - Property-like syntax
 */

const { UserProfile, Temperature, SmartRectangle } = require('./_4_getters_setters_example.js');

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

function assertCloseTo(actual, expected, tolerance, testName) {
    totalTests++;
    if (Math.abs(actual - expected) <= tolerance) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expected} (±${tolerance})`);
        console.log(`   Actual:   ${actual}`);
        testsFailed++;
        return false;
    }
}

function assertThrows(fn, expectedMessage, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to throw: "${expectedMessage}"`);
        testsFailed++;
        return false;
    } catch (error) {
        if (error.message === expectedMessage) {
            console.log(`✅ PASS: ${testName}`);
            testsPassed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Expected error: "${expectedMessage}"`);
            console.log(`   Actual error:   "${error.message}"`);
            testsFailed++;
            return false;
        }
    }
}

function assertTrue(value, testName) {
    totalTests++;
    if (value === true) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: true`);
        console.log(`   Actual:   ${value}`);
        testsFailed++;
        return false;
    }
}

function assertFalse(value, testName) {
    totalTests++;
    if (value === false) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: false`);
        console.log(`   Actual:   ${value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Sections
// =============================================================================

console.log('\n' + '═'.repeat(70));
console.log('  GETTERS & SETTERS CHALLENGE #4 - TEST SUITE');
console.log('═'.repeat(70) + '\n');

// -----------------------------------------------------------------------------
// Test Section 1: UserProfile Basic Getters
// -----------------------------------------------------------------------------
console.log('👤 Section 1: UserProfile Basic Getters');
console.log('─'.repeat(50));

const user = new UserProfile('John', 'Doe', 'john@example.com', 25, 'password123');

assertEqual(user.fullName, 'John Doe', 'fullName getter should return full name');
assertEqual(user.age, 25, 'age getter should return age');
assertTrue(user.isAdult, 'isAdult should be true for age 25');

// Test masked email
assertEqual(user.email, 'j***@example.com', 'email getter should mask email');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 2: UserProfile Setters with Validation
// -----------------------------------------------------------------------------
console.log('✏️ Section 2: UserProfile Setters with Validation');
console.log('─'.repeat(50));

const editableUser = new UserProfile('Jane', 'Smith', 'jane@test.com', 30, 'securepassword');

// Test fullName setter
editableUser.fullName = 'Alice Johnson';
assertEqual(editableUser.fullName, 'Alice Johnson', 'fullName setter should update name');

// Test fullName with single name
editableUser.fullName = 'Madonna';
assertEqual(editableUser.fullName, 'Madonna', 'fullName setter should handle single name');

// Test email validation
assertThrows(
    () => { editableUser.email = 'invalid-email'; },
    'Invalid email format',
    'Should throw for invalid email'
);

assertThrows(
    () => { editableUser.email = 'no-at-sign.com'; },
    'Invalid email format',
    'Should throw for email without @'
);

// Test age validation
assertThrows(
    () => { editableUser.age = -5; },
    'Age must be a positive number less than 150',
    'Should throw for negative age'
);

assertThrows(
    () => { editableUser.age = 200; },
    'Age must be a positive number less than 150',
    'Should throw for age >= 150'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 3: Password Strength & Verification
// -----------------------------------------------------------------------------
console.log('🔐 Section 3: Password Strength & Verification');
console.log('─'.repeat(50));

const weakUser = new UserProfile('Test', 'User', 'test@test.com', 20, 'short123');
assertEqual(weakUser.passwordStrength, 'weak', 'Short password should be weak');

const mediumUser = new UserProfile('Test', 'User', 'test@test.com', 20, 'mediumpass12');
assertEqual(mediumUser.passwordStrength, 'medium', '10-14 char password should be medium');

const strongUser = new UserProfile('Test', 'User', 'test@test.com', 20, 'verystrongpassword123');
assertEqual(strongUser.passwordStrength, 'strong', '15+ char password should be strong');

// Password verification
assertTrue(weakUser.verifyPassword('short123'), 'Correct password should verify');
assertFalse(weakUser.verifyPassword('wrongpass'), 'Wrong password should not verify');

// Password validation
assertThrows(
    () => new UserProfile('Test', 'User', 'test@test.com', 20, '1234567'),
    'Password must be at least 8 characters',
    'Should throw for short password'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 4: isAdult Computed Property
// -----------------------------------------------------------------------------
console.log('🎂 Section 4: isAdult Computed Property');
console.log('─'.repeat(50));

const child = new UserProfile('Kid', 'Test', 'kid@test.com', 10, 'password123');
assertFalse(child.isAdult, 'Age 10 should not be adult');

const teen = new UserProfile('Teen', 'Test', 'teen@test.com', 17, 'password123');
assertFalse(teen.isAdult, 'Age 17 should not be adult');

const adult18 = new UserProfile('Adult', 'Test', 'adult@test.com', 18, 'password123');
assertTrue(adult18.isAdult, 'Age 18 should be adult');

const senior = new UserProfile('Senior', 'Test', 'senior@test.com', 65, 'password123');
assertTrue(senior.isAdult, 'Age 65 should be adult');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 5: Temperature Class
// -----------------------------------------------------------------------------
console.log('🌡️ Section 5: Temperature Class');
console.log('─'.repeat(50));

const temp = new Temperature(0);
assertEqual(temp.celsius, 0, 'Celsius should be 0');
assertEqual(temp.fahrenheit, 32, '0°C should be 32°F');
assertCloseTo(temp.kelvin, 273.15, 0.01, '0°C should be 273.15K');

// Test boiling point
const boiling = new Temperature(100);
assertEqual(boiling.fahrenheit, 212, '100°C should be 212°F');
assertCloseTo(boiling.kelvin, 373.15, 0.01, '100°C should be 373.15K');

// Test setting Fahrenheit
const tempF = new Temperature();
tempF.fahrenheit = 68;
assertCloseTo(tempF.celsius, 20, 0.01, '68°F should be 20°C');

// Test setting Kelvin
const tempK = new Temperature();
tempK.kelvin = 300;
assertCloseTo(tempK.celsius, 26.85, 0.01, '300K should be 26.85°C');

// Test negative Kelvin validation
assertThrows(
    () => { tempK.kelvin = -10; },
    'Kelvin cannot be negative',
    'Should throw for negative Kelvin'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 6: Temperature Conversions
// -----------------------------------------------------------------------------
console.log('🔄 Section 6: Temperature Conversions');
console.log('─'.repeat(50));

// Freezing point
const freezing = new Temperature();
freezing.fahrenheit = 32;
assertEqual(freezing.celsius, 0, '32°F should convert to 0°C');

// Body temperature
const body = new Temperature(37);
assertCloseTo(body.fahrenheit, 98.6, 0.1, '37°C should be ~98.6°F');

// Absolute zero
const absoluteZero = new Temperature();
absoluteZero.kelvin = 0;
assertCloseTo(absoluteZero.celsius, -273.15, 0.01, '0K should be -273.15°C');
assertCloseTo(absoluteZero.fahrenheit, -459.67, 0.1, '0K should be ~-459.67°F');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 7: SmartRectangle Computed Properties
// -----------------------------------------------------------------------------
console.log('📐 Section 7: SmartRectangle Computed Properties');
console.log('─'.repeat(50));

const rect = new SmartRectangle(4, 3);
assertEqual(rect.area, 12, 'Area of 4×3 should be 12');
assertEqual(rect.perimeter, 14, 'Perimeter of 4×3 should be 14');
assertEqual(rect.diagonal, 5, 'Diagonal of 3-4-5 triangle should be 5');
assertFalse(rect.isSquare, '4×3 should not be square');

const square = new SmartRectangle(5, 5);
assertEqual(square.area, 25, 'Area of 5×5 should be 25');
assertTrue(square.isSquare, '5×5 should be square');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 8: SmartRectangle Area Setter
// -----------------------------------------------------------------------------
console.log('📏 Section 8: SmartRectangle Area Setter');
console.log('─'.repeat(50));

const resizable = new SmartRectangle(10, 5);
const originalRatio = resizable.width / resizable.height;

resizable.area = 200;
assertCloseTo(resizable.area, 200, 0.01, 'Area should be set to 200');
assertCloseTo(resizable.width / resizable.height, originalRatio, 0.01, 'Aspect ratio should be maintained');

// Validation
assertThrows(
    () => { resizable.area = -100; },
    'Area must be a positive number',
    'Should throw for negative area'
);

assertThrows(
    () => new SmartRectangle(-5, 10),
    'Width must be a positive number',
    'Should throw for negative width'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 9: Edge Cases
// -----------------------------------------------------------------------------
console.log('🔍 Section 9: Edge Cases');
console.log('─'.repeat(50));

// Email with short local part
const shortEmail = new UserProfile('A', 'B', 'a@b.com', 20, 'password123');
assertEqual(shortEmail.email, 'a@b.com', 'Single char email local part should not mask');

// Full name with multiple spaces/names
const longName = new UserProfile('A', 'B', 'test@test.com', 20, 'password123');
longName.fullName = 'John Jacob Jingleheimer Schmidt';
assertEqual(longName.fullName, 'John Jacob Jingleheimer Schmidt', 'Should handle multiple names');

// Age edge case at boundary
const exactly18 = new UserProfile('Boundary', 'Test', 'b@t.com', 18, 'password123');
assertTrue(exactly18.isAdult, 'Exactly 18 should be adult');

// Temperature negative
const negative = new Temperature(-40);
assertEqual(negative.fahrenheit, -40, '-40°C should equal -40°F');

console.log('');

// =============================================================================
// Test Results Summary
// =============================================================================

console.log('═'.repeat(70));
console.log('  TEST RESULTS SUMMARY');
console.log('═'.repeat(70));
console.log(`  Total Tests: ${totalTests}`);
console.log(`  ✅ Passed:   ${testsPassed}`);
console.log(`  ❌ Failed:   ${testsFailed}`);
console.log('═'.repeat(70));

if (testsFailed === 0) {
    console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉');
    console.log('You have mastered GETTERS & SETTERS in JavaScript!');
    console.log('\n📖 Key Takeaways:');
    console.log('   • Getters compute values on access (obj.property)');
    console.log('   • Setters validate before assignment (obj.property = value)');
    console.log('   • Property syntax is cleaner than method calls');
    console.log('   • Computed properties derive values from other data\n');
} else {
    console.log('\n⚠️  Some tests failed. Review the errors above and try again!');
    console.log('💡 Tip: Remember to use get/set keywords, not regular methods.\n');
}

process.exit(testsFailed > 0 ? 1 : 0);
