/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: Factory Functions vs Constructor Functions                   ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _6_test_factory_vs_constructor_example.js
 */

const {
    UserConstructor,
    createUser,
    createUserWithPrivate,
    comparePatterns,
    whichPatternFor
} = require('./_6_factory_vs_constructor_example.js');

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

function assertUndefined(value, testName) {
    totalTests++;
    if (value === undefined) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: undefined`);
        console.log(`   Actual:   ${value}`);
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

function assertNotInstanceOf(obj, constructor, testName) {
    totalTests++;
    if (!(obj instanceof constructor)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: NOT instanceof ${constructor.name}`);
        console.log(`   Actual:   is an instance`);
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

console.log('\n🧪 Running Factory vs Constructor Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: UserConstructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('USER CONSTRUCTOR TESTS');

const constructorUser = new UserConstructor('Alice', 'alice@email.com');

// Properties
assertEqual(constructorUser.name, 'Alice', 'Constructor stores name');
assertEqual(constructorUser.email, 'alice@email.com', 'Constructor stores email');

// Methods on prototype
assertTypeOf(UserConstructor.prototype.getInfo, 'function', 'getInfo on prototype');
assertTypeOf(UserConstructor.prototype.updateEmail, 'function', 'updateEmail on prototype');

// Method functionality
assertEqual(
    constructorUser.getInfo(),
    'Name: Alice, Email: alice@email.com',
    'getInfo() returns correct format'
);

constructorUser.updateEmail('alice.new@email.com');
assertEqual(constructorUser.email, 'alice.new@email.com', 'updateEmail() updates email');

// instanceof works
assertInstanceOf(constructorUser, UserConstructor, 'Constructor supports instanceof');

// -----------------------------------------------------------------------------
// Section 2: createUser Factory Tests
// -----------------------------------------------------------------------------
printSectionHeader('CREATE USER FACTORY TESTS');

const factoryUser = createUser('Bob', 'bob@email.com');

// Properties
assertEqual(factoryUser.name, 'Bob', 'Factory stores name');
assertEqual(factoryUser.email, 'bob@email.com', 'Factory stores email');

// Methods
assertTypeOf(factoryUser.getInfo, 'function', 'Factory has getInfo method');
assertTypeOf(factoryUser.updateEmail, 'function', 'Factory has updateEmail method');

// Method functionality
assertEqual(
    factoryUser.getInfo(),
    'Name: Bob, Email: bob@email.com',
    'Factory getInfo() returns correct format'
);

factoryUser.updateEmail('bob.new@email.com');
assertEqual(factoryUser.email, 'bob.new@email.com', 'Factory updateEmail() updates email');

// Factory objects are NOT instanceof the function
assertFalse(
    factoryUser instanceof createUser,
    'Factory objects are NOT instanceof factory function'
);

// Factory was NOT called with 'new'
assertTypeOf(factoryUser, 'object', 'Factory returns plain object');

// -----------------------------------------------------------------------------
// Section 3: createUserWithPrivate Factory Tests
// -----------------------------------------------------------------------------
printSectionHeader('CREATE USER WITH PRIVATE DATA TESTS');

const privateUser = createUserWithPrivate('Charlie', 'charlie@secret.com');

// Name is public
assertEqual(privateUser.name, 'Charlie', 'Name is accessible');

// Email is PRIVATE - not directly accessible
assertUndefined(privateUser.email, 'email property is NOT directly accessible');
assertUndefined(privateUser._email, '_email is also not accessible');

// But can be accessed via method
assertTypeOf(privateUser.getEmail, 'function', 'getEmail method exists');
assertEqual(privateUser.getEmail(), 'charlie@secret.com', 'getEmail() returns private email');

// getInfo still works
assertTypeOf(privateUser.getInfo, 'function', 'getInfo method exists');
assertEqual(
    privateUser.getInfo(),
    'Name: Charlie, Email: charlie@secret.com',
    'getInfo() works with private email'
);

// Can update via method
privateUser.updateEmail('charlie.new@secret.com');
assertEqual(privateUser.getEmail(), 'charlie.new@secret.com', 'updateEmail() works');

// Email is still not directly accessible after update
assertUndefined(privateUser.email, 'email remains private after update');

// -----------------------------------------------------------------------------
// Section 4: Method Sharing Comparison
// -----------------------------------------------------------------------------
printSectionHeader('METHOD SHARING COMPARISON');

const constUser1 = new UserConstructor('User1', 'u1@test.com');
const constUser2 = new UserConstructor('User2', 'u2@test.com');

// Constructor users share prototype methods
assertTrue(
    constUser1.getInfo === constUser2.getInfo,
    'Constructor users share prototype methods (memory efficient)'
);

const factUser1 = createUser('User1', 'u1@test.com');
const factUser2 = createUser('User2', 'u2@test.com');

// Factory users have separate method copies
assertFalse(
    factUser1.getInfo === factUser2.getInfo,
    'Factory users have separate methods (not shared)'
);

// -----------------------------------------------------------------------------
// Section 5: comparePatterns Function
// -----------------------------------------------------------------------------
printSectionHeader('COMPARE PATTERNS FUNCTION');

const comparison = comparePatterns();

assertTypeOf(comparison, 'object', 'comparePatterns returns object');
assertTypeOf(comparison.constructor, 'object', 'Has constructor comparison');
assertTypeOf(comparison.factory, 'object', 'Has factory comparison');

// Constructor characteristics
assertTrue(comparison.constructor.usesNew, 'Constructor uses new');
assertTrue(comparison.constructor.hasPrototype, 'Constructor has prototype');
assertTrue(comparison.constructor.supportsInstanceOf, 'Constructor supports instanceof');

// Factory characteristics
assertFalse(comparison.factory.usesNew, 'Factory does not use new');
assertFalse(comparison.factory.hasPrototype, 'Factory does not have prototype linkage');
assertFalse(comparison.factory.supportsInstanceOf, 'Factory does not support instanceof');

// -----------------------------------------------------------------------------
// Section 6: whichPatternFor Function
// -----------------------------------------------------------------------------
printSectionHeader('WHICH PATTERN FOR SCENARIO');

assertEqual(
    whichPatternFor('need-instanceof'),
    'constructor',
    'need-instanceof -> constructor'
);

assertEqual(
    whichPatternFor('need-privacy'),
    'factory',
    'need-privacy -> factory'
);

assertEqual(
    whichPatternFor('simple-objects'),
    'factory',
    'simple-objects -> factory'
);

assertEqual(
    whichPatternFor('inheritance-heavy'),
    'constructor',
    'inheritance-heavy -> constructor'
);

// -----------------------------------------------------------------------------
// Section 7: Prototype Chain Verification
// -----------------------------------------------------------------------------
printSectionHeader('PROTOTYPE CHAIN VERIFICATION');

const cu = new UserConstructor('Test', 'test@test.com');
const fu = createUser('Test', 'test@test.com');

// Constructor user has UserConstructor.prototype
assertTrue(
    Object.getPrototypeOf(cu) === UserConstructor.prototype,
    'Constructor user prototype is UserConstructor.prototype'
);

// Factory user has Object.prototype (plain object)
assertTrue(
    Object.getPrototypeOf(fu) === Object.prototype,
    'Factory user prototype is Object.prototype'
);

// -----------------------------------------------------------------------------
// Section 8: Edge Cases
// -----------------------------------------------------------------------------
printSectionHeader('EDGE CASES');

// Empty strings
const emptyConstructor = new UserConstructor('', '');
assertEqual(emptyConstructor.getInfo(), 'Name: , Email: ', 'Constructor handles empty strings');

const emptyFactory = createUser('', '');
assertEqual(emptyFactory.getInfo(), 'Name: , Email: ', 'Factory handles empty strings');

const emptyPrivate = createUserWithPrivate('', '');
assertEqual(emptyPrivate.getEmail(), '', 'Private factory handles empty email');

// Multiple updates
const multiUpdate = createUserWithPrivate('Multi', 'first@test.com');
multiUpdate.updateEmail('second@test.com');
multiUpdate.updateEmail('third@test.com');
assertEqual(multiUpdate.getEmail(), 'third@test.com', 'Multiple updates work correctly');

// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
