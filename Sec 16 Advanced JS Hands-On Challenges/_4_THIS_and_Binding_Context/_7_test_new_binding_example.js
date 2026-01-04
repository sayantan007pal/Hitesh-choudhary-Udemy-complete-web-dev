/**
 * Test Suite for `new` Binding Challenge
 * =======================================
 * Run: node _7_test_new_binding_example.js
 */

const { Person, Employee, createPerson, testNewBinding } = require('./_7_new_binding_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: ${expected}\n   Actual: ${actual}`); testsFailed++; }
}
function assertTypeOf(value, type, testName) {
    totalTests++;
    if (typeof value === type) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}`); testsFailed++; }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running new Binding Tests');
    console.log('='.repeat(60) + '\n');

    // Person tests
    console.log('\n📋 PERSON CONSTRUCTOR');
    console.log('-'.repeat(40));
    const alice = new Person("Alice", 25);
    assertEqual(alice.name, "Alice", 'Person name is set');
    assertEqual(alice.age, 25, 'Person age is set');
    assertEqual(alice.greet(), "Hi, I'm Alice", 'greet() works');
    
    const bob = new Person("Bob", 30);
    assertEqual(bob.greet(), "Hi, I'm Bob", 'Different person greets correctly');

    // Employee tests
    console.log('\n📋 EMPLOYEE CONSTRUCTOR (INHERITANCE)');
    console.log('-'.repeat(40));
    const emp = new Employee("Charlie", 28, "Engineering");
    assertEqual(emp.name, "Charlie", 'Employee inherits name');
    assertEqual(emp.age, 28, 'Employee inherits age');
    assertEqual(emp.department, "Engineering", 'Employee has department');
    assertEqual(emp.introduce(), "I'm Charlie, 28yo, in Engineering", 'introduce() works');

    // Factory function tests
    console.log('\n📋 CREATE PERSON FACTORY');
    console.log('-'.repeat(40));
    const factoryPerson = createPerson("Diana", 22);
    assertEqual(factoryPerson.name, "Diana", 'Factory creates name');
    assertEqual(factoryPerson.age, 22, 'Factory creates age');
    assertEqual(factoryPerson.greet(), "Hi, I'm Diana", 'Factory greet works');

    // testNewBinding tests
    console.log('\n📋 TEST NEW BINDING');
    console.log('-'.repeat(40));
    const result = testNewBinding();
    assertTypeOf(result.person, 'object', 'person is an object');
    assertEqual(result.person.name !== undefined, true, 'person has name');
    assertTypeOf(result.employee, 'object', 'employee is an object');
    assertEqual(result.employee.department !== undefined, true, 'employee has department');
    assertEqual(result.withoutNew, undefined, 'Without new returns undefined');

    // Edge cases
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));
    const emptyPerson = new Person("", 0);
    assertEqual(emptyPerson.greet(), "Hi, I'm ", 'Handles empty name');
    
    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total: ${totalTests} | ✅ Passed: ${testsPassed} | ❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}
runTests();
