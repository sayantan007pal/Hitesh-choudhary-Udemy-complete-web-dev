/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              TEST SUITE: Prototype Chaining Challenge                        ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _1_test_prototypes_example.js
 * 
 * Tests your implementation of:
 *   - Animal constructor and prototype
 *   - Dog constructor with inheritance from Animal
 *   - Cat constructor with inheritance from Animal
 *   - Proper prototype chain setup
 */

const { Animal, Dog, Cat } = require('./_1_prototypes_example.js');

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

console.log('\n🧪 Running Prototype Chaining Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: Animal Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('ANIMAL CONSTRUCTOR TESTS');

// Test 1.1: Animal constructor creates instance with name
const animal1 = new Animal('Generic');
assertEqual(animal1.name, 'Generic', 'Animal constructor assigns name property');

// Test 1.2: Animal has speak method on prototype
assertTypeOf(Animal.prototype.speak, 'function', 'Animal.prototype has speak method');

// Test 1.3: Animal speak method returns correct value
assertEqual(animal1.speak(), 'Animal speaking', 'Animal.speak() returns "Animal speaking"');

// Test 1.4: Animal instance is instance of Animal
assertTrue(animal1 instanceof Animal, 'Animal instance is instanceof Animal');

// Test 1.5: Animal instance is instance of Object
assertTrue(animal1 instanceof Object, 'Animal instance is instanceof Object');


// -----------------------------------------------------------------------------
// Section 2: Dog Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('DOG CONSTRUCTOR TESTS');

// Test 2.1: Dog constructor creates instance with name and breed
const dog1 = new Dog('Buddy', 'Golden Retriever');
assertEqual(dog1.name, 'Buddy', 'Dog constructor assigns name property');
assertEqual(dog1.breed, 'Golden Retriever', 'Dog constructor assigns breed property');

// Test 2.2: Dog has bark method on prototype
assertTypeOf(Dog.prototype.bark, 'function', 'Dog.prototype has bark method');

// Test 2.3: Dog bark method returns correct value
assertEqual(dog1.bark(), 'Woof!', 'Dog.bark() returns "Woof!"');

// Test 2.4: Dog inherits speak method from Animal
assertTypeOf(dog1.speak, 'function', 'Dog instance has access to speak method');
assertEqual(dog1.speak(), 'Animal speaking', 'Dog can use inherited speak() method');

// Test 2.5: Dog instance is instanceof Dog
assertTrue(dog1 instanceof Dog, 'Dog instance is instanceof Dog');

// Test 2.6: Dog instance is instanceof Animal (inheritance check)
assertTrue(dog1 instanceof Animal, 'Dog instance is instanceof Animal');

// Test 2.7: Dog instance is instanceof Object
assertTrue(dog1 instanceof Object, 'Dog instance is instanceof Object');

// Test 2.8: Dog constructor property is correctly set
assertEqual(Dog.prototype.constructor, Dog, 'Dog.prototype.constructor is Dog');


// -----------------------------------------------------------------------------
// Section 3: Cat Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('CAT CONSTRUCTOR TESTS');

// Test 3.1: Cat constructor creates instance with name and color
const cat1 = new Cat('Whiskers', 'Orange');
assertEqual(cat1.name, 'Whiskers', 'Cat constructor assigns name property');
assertEqual(cat1.color, 'Orange', 'Cat constructor assigns color property');

// Test 3.2: Cat has meow method on prototype
assertTypeOf(Cat.prototype.meow, 'function', 'Cat.prototype has meow method');

// Test 3.3: Cat meow method returns correct value
assertEqual(cat1.meow(), 'Meow!', 'Cat.meow() returns "Meow!"');

// Test 3.4: Cat inherits speak method from Animal
assertTypeOf(cat1.speak, 'function', 'Cat instance has access to speak method');
assertEqual(cat1.speak(), 'Animal speaking', 'Cat can use inherited speak() method');

// Test 3.5: Cat instance is instanceof Cat
assertTrue(cat1 instanceof Cat, 'Cat instance is instanceof Cat');

// Test 3.6: Cat instance is instanceof Animal (inheritance check)
assertTrue(cat1 instanceof Animal, 'Cat instance is instanceof Animal');

// Test 3.7: Cat instance is instanceof Object
assertTrue(cat1 instanceof Object, 'Cat instance is instanceof Object');

// Test 3.8: Cat constructor property is correctly set
assertEqual(Cat.prototype.constructor, Cat, 'Cat.prototype.constructor is Cat');


// -----------------------------------------------------------------------------
// Section 4: Prototype Chain Verification Tests
// -----------------------------------------------------------------------------
printSectionHeader('PROTOTYPE CHAIN VERIFICATION');

// Test 4.1: Dog prototype's prototype is Animal.prototype
assertEqual(
    Object.getPrototypeOf(Dog.prototype),
    Animal.prototype,
    'Dog.prototype[[Prototype]] is Animal.prototype'
);

// Test 4.2: Cat prototype's prototype is Animal.prototype
assertEqual(
    Object.getPrototypeOf(Cat.prototype),
    Animal.prototype,
    'Cat.prototype[[Prototype]] is Animal.prototype'
);

// Test 4.3: Animal prototype's prototype is Object.prototype
assertEqual(
    Object.getPrototypeOf(Animal.prototype),
    Object.prototype,
    'Animal.prototype[[Prototype]] is Object.prototype'
);

// Test 4.4: Object prototype's prototype is null (end of chain)
assertEqual(
    Object.getPrototypeOf(Object.prototype),
    null,
    'Object.prototype[[Prototype]] is null (end of chain)'
);


// -----------------------------------------------------------------------------
// Section 5: Edge Cases and Advanced Tests
// -----------------------------------------------------------------------------
printSectionHeader('EDGE CASES AND ADVANCED TESTS');

// Test 5.1: Dog does not share Cat's methods
assertEqual(dog1.meow, undefined, 'Dog does not have meow method');

// Test 5.2: Cat does not share Dog's methods
assertEqual(cat1.bark, undefined, 'Cat does not have bark method');

// Test 5.3: Own properties vs inherited properties
assertTrue(dog1.hasOwnProperty('name'), 'name is own property on Dog instance');
assertTrue(dog1.hasOwnProperty('breed'), 'breed is own property on Dog instance');
assertFalse(dog1.hasOwnProperty('speak'), 'speak is NOT own property (inherited)');
assertFalse(dog1.hasOwnProperty('bark'), 'bark is NOT own property (on prototype)');

// Test 5.4: Multiple instances don't share instance properties
const dog2 = new Dog('Max', 'Labrador');
assertEqual(dog1.name, 'Buddy', 'First dog keeps its name');
assertEqual(dog2.name, 'Max', 'Second dog has different name');
assertEqual(dog1.breed, 'Golden Retriever', 'First dog keeps its breed');
assertEqual(dog2.breed, 'Labrador', 'Second dog has different breed');

// Test 5.5: Modifying one instance doesn't affect others
dog1.age = 5;
assertEqual(dog1.age, 5, 'Can add property to instance');
assertEqual(dog2.age, undefined, 'New property does not affect other instances');

// Test 5.6: Dog is not instanceof Cat
assertFalse(dog1 instanceof Cat, 'Dog is NOT instanceof Cat');

// Test 5.7: Cat is not instanceof Dog
assertFalse(cat1 instanceof Dog, 'Cat is NOT instanceof Dog');

// Test 5.8: Both methods exist on prototype, not instance
assertFalse(dog1.hasOwnProperty('bark'), 'bark method is on prototype, not instance');
assertTrue(Dog.prototype.hasOwnProperty('bark'), 'bark method exists on Dog.prototype');


// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
