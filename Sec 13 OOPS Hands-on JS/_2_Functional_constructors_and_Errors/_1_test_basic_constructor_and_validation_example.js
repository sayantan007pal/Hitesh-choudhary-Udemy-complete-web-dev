/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: Basic Constructor & Input Validation with Errors             ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _1_test_basic_constructor_and_validation_example.js
 */

const {
    Person,
    Employee
} = require('./_1_basic_constructor_and_validation_example.js');

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

function assertThrows(fn, errorType, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${errorType.name} to be thrown`);
        console.log(`   Actual:   No error thrown`);
        testsFailed++;
        return false;
    } catch (error) {
        if (error instanceof errorType) {
            console.log(`✅ PASS: ${testName}`);
            testsPassed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Expected: ${errorType.name}`);
            console.log(`   Actual:   ${error.constructor.name}: ${error.message}`);
            testsFailed++;
            return false;
        }
    }
}

function assertDoesNotThrow(fn, testName) {
    totalTests++;
    try {
        fn();
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } catch (error) {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: No error`);
        console.log(`   Actual:   ${error.constructor.name}: ${error.message}`);
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
        console.log(`   Actual:   ${obj.constructor.name}`);
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

console.log('\n🧪 Running Basic Constructor & Validation Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: Person Constructor - Valid Inputs
// -----------------------------------------------------------------------------
printSectionHeader('PERSON CONSTRUCTOR - VALID INPUTS');

assertDoesNotThrow(() => new Person('Alice', 25), 'Person constructor accepts valid name and age');

const person1 = new Person('Bob', 30);
assertEqual(person1.name, 'Bob', 'Person stores name property');
assertEqual(person1.age, 30, 'Person stores age property');

const person2 = new Person('Charlie', 0.5);
assertEqual(person2.age, 0.5, 'Person accepts fractional age (e.g., 6 months old)');

const person3 = new Person('Diana', 1);
assertEqual(person3.age, 1, 'Person accepts age of 1');

// -----------------------------------------------------------------------------
// Section 2: Person Constructor - Invalid Inputs
// -----------------------------------------------------------------------------
printSectionHeader('PERSON CONSTRUCTOR - INVALID INPUTS');

// Invalid name tests
assertThrows(() => new Person('', 25), TypeError, 'Throws TypeError for empty string name');
assertThrows(() => new Person('   ', 25), TypeError, 'Throws TypeError for whitespace-only name');
assertThrows(() => new Person(null, 25), TypeError, 'Throws TypeError for null name');
assertThrows(() => new Person(undefined, 25), TypeError, 'Throws TypeError for undefined name');
assertThrows(() => new Person(123, 25), TypeError, 'Throws TypeError for number as name');
assertThrows(() => new Person({}, 25), TypeError, 'Throws TypeError for object as name');
assertThrows(() => new Person([], 25), TypeError, 'Throws TypeError for array as name');

// Invalid age tests
assertThrows(() => new Person('Alice', -1), RangeError, 'Throws RangeError for negative age');
assertThrows(() => new Person('Alice', 0), RangeError, 'Throws RangeError for zero age');
assertThrows(() => new Person('Alice', '25'), RangeError, 'Throws RangeError for string age');
assertThrows(() => new Person('Alice', null), RangeError, 'Throws RangeError for null age');
assertThrows(() => new Person('Alice', undefined), RangeError, 'Throws RangeError for undefined age');
assertThrows(() => new Person('Alice', NaN), RangeError, 'Throws RangeError for NaN age');
assertThrows(() => new Person('Alice', Infinity), RangeError, 'Throws RangeError for Infinity age');
assertThrows(() => new Person('Alice', -Infinity), RangeError, 'Throws RangeError for -Infinity age');

// -----------------------------------------------------------------------------
// Section 3: Person Prototype Methods
// -----------------------------------------------------------------------------
printSectionHeader('PERSON PROTOTYPE METHODS');

const person4 = new Person('Eve', 25);

// greet() method
assertTypeOf(Person.prototype.greet, 'function', 'greet() exists on Person.prototype');
assertEqual(person4.greet(), 'Hello, my name is Eve and I am 25 years old', 'greet() returns correct message');

// haveBirthday() method
assertTypeOf(Person.prototype.haveBirthday, 'function', 'haveBirthday() exists on Person.prototype');
assertEqual(person4.haveBirthday(), 26, 'haveBirthday() returns new age');
assertEqual(person4.age, 26, 'haveBirthday() updates the age property');
assertEqual(person4.greet(), 'Hello, my name is Eve and I am 26 years old', 'greet() reflects updated age');

// isAdult() method
assertTypeOf(Person.prototype.isAdult, 'function', 'isAdult() exists on Person.prototype');

const child = new Person('Young Kid', 10);
assertFalse(child.isAdult(), 'isAdult() returns false for age 10');

const teenager = new Person('Teen', 17);
assertFalse(teenager.isAdult(), 'isAdult() returns false for age 17');

const adult = new Person('Adult', 18);
assertTrue(adult.isAdult(), 'isAdult() returns true for age 18');

const senior = new Person('Senior', 65);
assertTrue(senior.isAdult(), 'isAdult() returns true for age 65');

// -----------------------------------------------------------------------------
// Section 4: Employee Constructor - Valid Inputs
// -----------------------------------------------------------------------------
printSectionHeader('EMPLOYEE CONSTRUCTOR - VALID INPUTS');

assertDoesNotThrow(() => new Employee('Alice', 30, 'EMP001'), 'Employee constructor accepts valid inputs');

const emp1 = new Employee('Bob', 35, 'EMP002');
assertEqual(emp1.name, 'Bob', 'Employee stores name property (inherited)');
assertEqual(emp1.age, 35, 'Employee stores age property (inherited)');
assertEqual(emp1.employeeId, 'EMP002', 'Employee stores employeeId property');

// -----------------------------------------------------------------------------
// Section 5: Employee Constructor - Invalid Inputs
// -----------------------------------------------------------------------------
printSectionHeader('EMPLOYEE CONSTRUCTOR - INVALID INPUTS');

// Invalid employeeId tests
assertThrows(() => new Employee('Alice', 30, ''), TypeError, 'Throws TypeError for empty employeeId');
assertThrows(() => new Employee('Alice', 30, '   '), TypeError, 'Throws TypeError for whitespace-only employeeId');
assertThrows(() => new Employee('Alice', 30, null), TypeError, 'Throws TypeError for null employeeId');
assertThrows(() => new Employee('Alice', 30, undefined), TypeError, 'Throws TypeError for undefined employeeId');
assertThrows(() => new Employee('Alice', 30, 123), TypeError, 'Throws TypeError for number as employeeId');

// Inherited validation still works
assertThrows(() => new Employee('', 30, 'EMP001'), TypeError, 'Throws TypeError for invalid name (inherited)');
assertThrows(() => new Employee('Alice', -5, 'EMP001'), RangeError, 'Throws RangeError for invalid age (inherited)');

// -----------------------------------------------------------------------------
// Section 6: Employee Inheritance
// -----------------------------------------------------------------------------
printSectionHeader('EMPLOYEE INHERITANCE');

const emp2 = new Employee('Charlie', 40, 'EMP003');

// Inheritance chain
assertInstanceOf(emp2, Employee, 'Employee instance is instanceof Employee');
assertInstanceOf(emp2, Person, 'Employee instance is instanceof Person');
assertTrue(Employee.prototype instanceof Person, 'Employee.prototype is instanceof Person');
assertEqual(Employee.prototype.constructor, Employee, 'Employee.prototype.constructor is Employee');

// Inherited methods work
assertTypeOf(emp2.greet, 'function', 'Employee inherits greet() method');
assertEqual(emp2.greet(), 'Hello, my name is Charlie and I am 40 years old', 'Inherited greet() works correctly');

assertTypeOf(emp2.haveBirthday, 'function', 'Employee inherits haveBirthday() method');
assertEqual(emp2.haveBirthday(), 41, 'Inherited haveBirthday() works correctly');

assertTypeOf(emp2.isAdult, 'function', 'Employee inherits isAdult() method');
assertTrue(emp2.isAdult(), 'Inherited isAdult() works correctly');

// -----------------------------------------------------------------------------
// Section 7: Employee Own Methods
// -----------------------------------------------------------------------------
printSectionHeader('EMPLOYEE OWN METHODS');

const emp3 = new Employee('Diana', 28, 'EMP004');

// getEmployeeInfo() method
assertTypeOf(Employee.prototype.getEmployeeInfo, 'function', 'getEmployeeInfo() exists on Employee.prototype');
assertEqual(emp3.getEmployeeInfo(), 'Employee EMP004: Diana', 'getEmployeeInfo() returns correct message');

// -----------------------------------------------------------------------------
// Section 8: Prototype Chain Verification
// -----------------------------------------------------------------------------
printSectionHeader('PROTOTYPE CHAIN VERIFICATION');

const emp4 = new Employee('Frank', 50, 'EMP005');

assertTrue(
    Object.getPrototypeOf(emp4) === Employee.prototype,
    'Employee instance __proto__ is Employee.prototype'
);

assertTrue(
    Object.getPrototypeOf(Employee.prototype) === Person.prototype,
    'Employee.prototype __proto__ is Person.prototype'
);

assertTrue(
    Object.getPrototypeOf(Person.prototype) === Object.prototype,
    'Person.prototype __proto__ is Object.prototype'
);

assertTrue(
    Object.getPrototypeOf(Object.prototype) === null,
    'Object.prototype __proto__ is null'
);

// Methods are on prototype, not instance
assertFalse(emp4.hasOwnProperty('greet'), 'greet is not an own property (on prototype)');
assertFalse(emp4.hasOwnProperty('getEmployeeInfo'), 'getEmployeeInfo is not an own property (on prototype)');
assertTrue(emp4.hasOwnProperty('name'), 'name is an own property');
assertTrue(emp4.hasOwnProperty('employeeId'), 'employeeId is an own property');

// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
