/**
 * Test Suite for Inheritance Challenge #6
 * ========================================
 * 
 * Run this file with: node _6_test_inheritance_example.js
 * 
 * Tests your Employee hierarchy implementation for:
 *   - Proper inheritance chain
 *   - Method overriding
 *   - super() and super.method() usage
 *   - instanceof checks
 */

const { Person, Employee, Manager, Developer, Intern } = require('./_6_inheritance_example.js');

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

function assertThrows(fn, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to throw an error`);
        testsFailed++;
        return false;
    } catch (error) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
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
        console.log(`   Expected: true, Actual: ${value}`);
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
        console.log(`   Expected: false, Actual: ${value}`);
        testsFailed++;
        return false;
    }
}

function assertIncludes(str, substring, testName) {
    totalTests++;
    if (str.includes(substring)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to include: "${substring}"`);
        console.log(`   Actual: "${str}"`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Sections
// =============================================================================

console.log('\n' + '═'.repeat(70));
console.log('  INHERITANCE CHALLENGE #6 - TEST SUITE');
console.log('═'.repeat(70) + '\n');

// -----------------------------------------------------------------------------
// Test Section 1: Person Base Class
// -----------------------------------------------------------------------------
console.log('👤 Section 1: Person Base Class');
console.log('─'.repeat(50));

const person = new Person('John', 30);
assertEqual(person.getName(), 'John', 'Person should store name');
assertEqual(person.getAge(), 30, 'Person should store age');
assertEqual(person.introduce(), "Hi, I'm John and I'm 30 years old", 'introduce() format');
assertEqual(person.haveBirthday(), 31, 'haveBirthday should increment age');
assertEqual(person.getAge(), 31, 'Age should be updated after birthday');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 2: Employee extends Person
// -----------------------------------------------------------------------------
console.log('💼 Section 2: Employee extends Person');
console.log('─'.repeat(50));

const employee = new Employee('Jane', 25, 'EMP001', 'Engineering');

// Inherited properties
assertEqual(employee.getName(), 'Jane', 'Employee inherits getName()');
assertEqual(employee.getAge(), 25, 'Employee inherits getAge()');

// Own properties
assertEqual(employee.getEmployeeId(), 'EMP001', 'Employee stores employeeId');
assertEqual(employee.getDepartment(), 'Engineering', 'Employee stores department');

// Methods
assertEqual(employee.work(), 'Jane is working in Engineering', 'work() format');

// Overridden introduce
const intro = employee.introduce();
assertIncludes(intro, "Hi, I'm Jane", 'introduce() includes parent content');
assertIncludes(intro, 'I work in Engineering', 'introduce() includes department');

// instanceof checks
assertTrue(employee instanceof Employee, 'employee instanceof Employee');
assertTrue(employee instanceof Person, 'employee instanceof Person');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 3: Manager extends Employee
// -----------------------------------------------------------------------------
console.log('👔 Section 3: Manager extends Employee');
console.log('─'.repeat(50));

const manager = new Manager('Bob', 40, 'MGR001', 'Engineering', 5);

// Inherited from Person
assertEqual(manager.getName(), 'Bob', 'Manager inherits from Person');
assertEqual(manager.haveBirthday(), 41, 'Manager can have birthday');

// Inherited from Employee
assertEqual(manager.getEmployeeId(), 'MGR001', 'Manager inherits from Employee');
assertEqual(manager.getDepartment(), 'Engineering', 'Manager has department');

// Own properties
assertEqual(manager.getTeamSize(), 5, 'Manager has team size');

// work() override
const managerWork = manager.work();
assertIncludes(managerWork, 'Bob is working in Engineering', 'work() includes base');
assertIncludes(managerWork, 'managing a team of 5', 'work() includes team management');

// conductMeeting
assertEqual(
    manager.conductMeeting(),
    'Bob is conducting a meeting with 5 people',
    'conductMeeting() format'
);

// instanceof chain
assertTrue(manager instanceof Manager, 'manager instanceof Manager');
assertTrue(manager instanceof Employee, 'manager instanceof Employee');
assertTrue(manager instanceof Person, 'manager instanceof Person');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 4: Manager Team Management
// -----------------------------------------------------------------------------
console.log('👥 Section 4: Manager Team Management');
console.log('─'.repeat(50));

const teamManager = new Manager('Alice', 35, 'MGR002', 'Product', 0);
const dev1 = new Developer('Dev1', 25, 'DEV001', 'Product', ['JavaScript']);
const dev2 = new Developer('Dev2', 28, 'DEV002', 'Product', ['Python']);

assertEqual(teamManager.getTeamMembers().length, 0, 'Team starts empty');

teamManager.addTeamMember(dev1);
assertEqual(teamManager.getTeamSize(), 1, 'Team size after adding 1');

teamManager.addTeamMember(dev2);
assertEqual(teamManager.getTeamSize(), 2, 'Team size after adding 2');
assertEqual(teamManager.getTeamMembers().length, 2, 'getTeamMembers returns 2');

// Verify team members
const members = teamManager.getTeamMembers();
assertEqual(members[0].getName(), 'Dev1', 'First team member is Dev1');

// Remove team member
assertTrue(teamManager.removeTeamMember('DEV001'), 'removeTeamMember returns true on success');
assertEqual(teamManager.getTeamSize(), 1, 'Team size after removal');
assertFalse(teamManager.removeTeamMember('NONEXISTENT'), 'removeTeamMember returns false if not found');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 5: Developer extends Employee
// -----------------------------------------------------------------------------
console.log('💻 Section 5: Developer extends Employee');
console.log('─'.repeat(50));

const developer = new Developer('Charlie', 28, 'DEV003', 'Engineering', ['JavaScript', 'Python', 'Go']);

// Inherited
assertEqual(developer.getName(), 'Charlie', 'Developer inherits name');
assertEqual(developer.getDepartment(), 'Engineering', 'Developer inherits department');

// Own properties
const languages = developer.getProgrammingLanguages();
assertEqual(languages.length, 3, 'Developer has 3 languages');
assertTrue(languages.includes('JavaScript'), 'Developer knows JavaScript');

// code() method
assertEqual(
    developer.code('JavaScript'),
    'Charlie is coding in JavaScript',
    'code() with known language'
);

assertThrows(
    () => developer.code('Rust'),
    'code() with unknown language should throw'
);

// addLanguage
developer.addLanguage('Rust');
assertEqual(
    developer.code('Rust'),
    'Charlie is coding in Rust',
    'code() after adding language'
);

// work() override
const devWork = developer.work();
assertIncludes(devWork, 'Charlie is working in Engineering', 'work() includes base');
assertIncludes(devWork, 'writing code', 'work() includes coding');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 6: Intern extends Employee
// -----------------------------------------------------------------------------
console.log('🎓 Section 6: Intern extends Employee');
console.log('─'.repeat(50));

const intern = new Intern('Diana', 21, 'INT001', 'Engineering', 'Bob', '3 months');

// Inherited
assertEqual(intern.getName(), 'Diana', 'Intern inherits name');
assertEqual(intern.getDepartment(), 'Engineering', 'Intern inherits department');

// Own properties
assertEqual(intern.getMentor(), 'Bob', 'Intern has mentor');
assertEqual(intern.getInternshipDuration(), '3 months', 'Intern has duration');

// learn() method
assertEqual(
    intern.learn(),
    'Diana is learning from Bob',
    'learn() format'
);

// work() override
const internWork = intern.work();
assertIncludes(internWork, 'Diana is working in Engineering', 'work() includes base');
assertIncludes(internWork, 'as an intern', 'work() includes intern status');

// instanceof chain
assertTrue(intern instanceof Intern, 'intern instanceof Intern');
assertTrue(intern instanceof Employee, 'intern instanceof Employee');
assertTrue(intern instanceof Person, 'intern instanceof Person');
assertFalse(intern instanceof Manager, 'intern NOT instanceof Manager');
assertFalse(intern instanceof Developer, 'intern NOT instanceof Developer');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 7: Polymorphism with Inheritance
// -----------------------------------------------------------------------------
console.log('🎭 Section 7: Polymorphism with Inheritance');
console.log('─'.repeat(50));

const employees = [
    new Employee('E1', 25, 'E001', 'Sales'),
    new Manager('M1', 35, 'M001', 'Sales', 3),
    new Developer('D1', 28, 'D001', 'Engineering', ['JS']),
    new Intern('I1', 21, 'I001', 'Marketing', 'Boss', '6 months')
];

// All have work() method but different implementations
employees.forEach((emp, i) => {
    totalTests++;
    if (typeof emp.work === 'function') {
        console.log(`✅ PASS: Employee ${i + 1} has work() method`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Employee ${i + 1} missing work() method`);
        testsFailed++;
    }
});

// Each work() returns different output
const workOutputs = employees.map(e => e.work());
assertTrue(workOutputs.every(w => w.includes('is working')), 'All work() outputs include "is working"');

// But each is unique
const uniqueOutputs = new Set(workOutputs);
assertEqual(uniqueOutputs.size, 4, 'All work() outputs are different');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 8: Super Keyword Usage
// -----------------------------------------------------------------------------
console.log('⬆️ Section 8: Super Keyword Usage');
console.log('─'.repeat(50));

// Employee.introduce() extends Person.introduce()
const superTest = new Employee('Super', 30, 'SUP001', 'Testing');
const superIntro = superTest.introduce();

// Should contain both parent and child content
assertIncludes(superIntro, "Hi, I'm Super", 'Overridden method includes super content');
assertIncludes(superIntro, '30 years old', 'Overridden method includes parent age');
assertIncludes(superIntro, 'I work in Testing', 'Overridden method adds own content');

// Manager.work() extends Employee.work()
const superManager = new Manager('SuperMgr', 40, 'SMGR001', 'HR', 10);
const superWork = superManager.work();
assertIncludes(superWork, 'SuperMgr is working in HR', 'super.work() content');
assertIncludes(superWork, 'managing a team of 10', 'Extended content');

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
    console.log('You have mastered INHERITANCE in JavaScript!');
    console.log('\n📖 Key Takeaways:');
    console.log('   • extends keyword creates child classes');
    console.log('   • super() must be called first in constructor');
    console.log('   • super.method() calls parent\'s version');
    console.log('   • Child classes can override and extend methods\n');
} else {
    console.log('\n⚠️  Some tests failed. Review the errors above and try again!');
    console.log('💡 Tip: Make sure to call super() before using this.\n');
}

process.exit(testsFailed > 0 ? 1 : 0);
