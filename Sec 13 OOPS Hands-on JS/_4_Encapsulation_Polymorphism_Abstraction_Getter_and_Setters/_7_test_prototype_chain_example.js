/**
 * Test Suite for Prototype Chain Challenge #7
 * ============================================
 * 
 * Run this file with: node _7_test_prototype_chain_example.js
 * 
 * Tests your prototype chain implementation for:
 *   - Object.create() usage
 *   - Constructor function prototypes
 *   - Prototype chain traversal
 *   - Property lookup
 */

const {
    animal,
    mammal,
    dog,
    createDog,
    Vehicle,
    Car,
    getPrototypeChain,
    getAllProperties,
    getOwnProperties,
    findPropertyOrigin
} = require('./_7_prototype_chain_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
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

function assertIncludes(arr, value, testName) {
    totalTests++;
    if (arr.includes(value)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected array to include: ${value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Sections
// =============================================================================

console.log('\n' + '═'.repeat(70));
console.log('  PROTOTYPE CHAIN CHALLENGE #7 - TEST SUITE');
console.log('═'.repeat(70) + '\n');

// -----------------------------------------------------------------------------
// Test Section 1: Animal Base Object
// -----------------------------------------------------------------------------
console.log('🦁 Section 1: Animal Base Object');
console.log('─'.repeat(50));

assertTrue(animal.eats, 'animal.eats should be true');
assertTrue(animal.breathes, 'animal.breathes should be true');
assertEqual(animal.eat(), 'Animal is eating', 'animal.eat() method');
assertEqual(animal.breathe(), 'Animal is breathing', 'animal.breathe() method');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 2: Mammal Inherits from Animal
// -----------------------------------------------------------------------------
console.log('🐕 Section 2: Mammal Inherits from Animal');
console.log('─'.repeat(50));

// Own properties
assertTrue(mammal.hasHair, 'mammal.hasHair should be true');
assertTrue(mammal.warmBlooded, 'mammal.warmBlooded should be true');
assertEqual(mammal.nurse(), 'Mammal is nursing', 'mammal.nurse() method');

// Inherited properties
assertTrue(mammal.eats, 'mammal should inherit eats');
assertTrue(mammal.breathes, 'mammal should inherit breathes');
assertEqual(mammal.eat(), 'Animal is eating', 'mammal inherits eat()');

// Prototype check
assertEqual(Object.getPrototypeOf(mammal), animal, 'mammal prototype should be animal');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 3: Dog Inherits from Mammal
// -----------------------------------------------------------------------------
console.log('🐶 Section 3: Dog Inherits from Mammal');
console.log('─'.repeat(50));

// Own properties
assertEqual(dog.breed, 'Unknown', 'dog.breed default');
assertEqual(dog.bark(), 'Woof!', 'dog.bark() method');
assertEqual(dog.wagTail(), 'Dog is wagging tail', 'dog.wagTail() method');

// Inherited from mammal
assertTrue(dog.hasHair, 'dog inherits hasHair from mammal');
assertEqual(dog.nurse(), 'Mammal is nursing', 'dog inherits nurse() from mammal');

// Inherited from animal
assertTrue(dog.eats, 'dog inherits eats from animal');
assertEqual(dog.eat(), 'Animal is eating', 'dog inherits eat() from animal');

// Prototype chain check
assertEqual(Object.getPrototypeOf(dog), mammal, 'dog prototype should be mammal');
assertEqual(Object.getPrototypeOf(mammal), animal, 'mammal prototype should be animal');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 4: createDog Factory Function
// -----------------------------------------------------------------------------
console.log('🏭 Section 4: createDog Factory Function');
console.log('─'.repeat(50));

const rex = createDog('Rex', 'German Shepherd');
const buddy = createDog('Buddy', 'Golden Retriever');

// Own properties
assertEqual(rex.name, 'Rex', 'Rex should have name');
assertEqual(rex.breed, 'German Shepherd', 'Rex should have breed');
assertEqual(rex.greet(), 'Rex says woof!', 'Rex greet() method');

// Different instances
assertEqual(buddy.name, 'Buddy', 'Buddy has different name');
assertEqual(buddy.breed, 'Golden Retriever', 'Buddy has different breed');

// Inherited from dog
assertEqual(rex.bark(), 'Woof!', 'Rex inherits bark()');
assertEqual(rex.wagTail(), 'Dog is wagging tail', 'Rex inherits wagTail()');

// Deep inheritance
assertTrue(rex.hasHair, 'Rex inherits hasHair from mammal chain');
assertTrue(rex.eats, 'Rex inherits eats from animal chain');

// Prototype check
assertEqual(Object.getPrototypeOf(rex), dog, 'Rex prototype should be dog');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 5: Vehicle Constructor Function
// -----------------------------------------------------------------------------
console.log('🚗 Section 5: Vehicle Constructor Function');
console.log('─'.repeat(50));

const vehicle = new Vehicle('Toyota', 'Camry');

assertEqual(vehicle.brand, 'Toyota', 'Vehicle stores brand');
assertEqual(vehicle.model, 'Camry', 'Vehicle stores model');
assertEqual(vehicle.start(), 'Toyota Camry started', 'start() method');
assertEqual(vehicle.stop(), 'Toyota Camry stopped', 'stop() method');
assertEqual(vehicle.describe(), 'Vehicle: Toyota Camry', 'describe() method');

assertTrue(vehicle instanceof Vehicle, 'vehicle instanceof Vehicle');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 6: Car Inherits from Vehicle
// -----------------------------------------------------------------------------
console.log('🚙 Section 6: Car Inherits from Vehicle');
console.log('─'.repeat(50));

const car = new Car('Honda', 'Civic', 4);

// Own properties
assertEqual(car.brand, 'Honda', 'Car has brand');
assertEqual(car.model, 'Civic', 'Car has model');
assertEqual(car.doors, 4, 'Car has doors');
assertEqual(car.honk(), 'Beep beep!', 'Car honk() method');

// Inherited methods
assertEqual(car.start(), 'Honda Civic started', 'Car inherits start()');
assertEqual(car.stop(), 'Honda Civic stopped', 'Car inherits stop()');

// Overridden method
assertEqual(car.describe(), 'Car: Honda Civic with 4 doors', 'Car overrides describe()');

// instanceof chain
assertTrue(car instanceof Car, 'car instanceof Car');
assertTrue(car instanceof Vehicle, 'car instanceof Vehicle');

// Constructor reference
assertEqual(car.constructor, Car, 'car.constructor should be Car');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 7: getPrototypeChain Utility
// -----------------------------------------------------------------------------
console.log('🔗 Section 7: getPrototypeChain Utility');
console.log('─'.repeat(50));

const rexChain = getPrototypeChain(rex);
assertEqual(rexChain[0], dog, 'First prototype is dog');
assertEqual(rexChain[1], mammal, 'Second prototype is mammal');
assertEqual(rexChain[2], animal, 'Third prototype is animal');
assertEqual(rexChain[3], Object.prototype, 'Fourth prototype is Object.prototype');
assertEqual(rexChain.length, 4, 'Chain should have 4 prototypes before null');

const carChain = getPrototypeChain(car);
assertEqual(carChain[0], Car.prototype, 'Car chain starts with Car.prototype');
assertEqual(carChain[1], Vehicle.prototype, 'Then Vehicle.prototype');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 8: getAllProperties & getOwnProperties
// -----------------------------------------------------------------------------
console.log('📋 Section 8: getAllProperties & getOwnProperties');
console.log('─'.repeat(50));

const rexOwn = getOwnProperties(rex);
assertIncludes(rexOwn, 'name', 'Rex own properties include name');
assertIncludes(rexOwn, 'breed', 'Rex own properties include breed');
assertIncludes(rexOwn, 'greet', 'Rex own properties include greet');
assertEqual(rexOwn.length, 3, 'Rex has 3 own properties');

const rexAll = getAllProperties(rex);
assertIncludes(rexAll, 'name', 'Rex all properties include name');
assertIncludes(rexAll, 'bark', 'Rex all properties include inherited bark');
assertIncludes(rexAll, 'hasHair', 'Rex all properties include inherited hasHair');
assertIncludes(rexAll, 'eats', 'Rex all properties include inherited eats');
assertTrue(rexAll.length > rexOwn.length, 'All properties should be more than own');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 9: findPropertyOrigin
// -----------------------------------------------------------------------------
console.log('🔍 Section 9: findPropertyOrigin');
console.log('─'.repeat(50));

assertEqual(findPropertyOrigin(rex, 'name'), rex, 'name is on rex');
assertEqual(findPropertyOrigin(rex, 'bark'), dog, 'bark is on dog');
assertEqual(findPropertyOrigin(rex, 'hasHair'), mammal, 'hasHair is on mammal');
assertEqual(findPropertyOrigin(rex, 'eats'), animal, 'eats is on animal');
assertEqual(findPropertyOrigin(rex, 'nonexistent'), null, 'nonexistent returns null');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 10: hasOwnProperty vs Inherited
// -----------------------------------------------------------------------------
console.log('🔐 Section 10: hasOwnProperty vs Inherited');
console.log('─'.repeat(50));

assertTrue(rex.hasOwnProperty('name'), 'Rex hasOwnProperty name');
assertFalse(rex.hasOwnProperty('bark'), 'Rex does NOT hasOwnProperty bark');
assertFalse(rex.hasOwnProperty('eats'), 'Rex does NOT hasOwnProperty eats');

assertTrue(dog.hasOwnProperty('bark'), 'dog hasOwnProperty bark');
assertFalse(dog.hasOwnProperty('hasHair'), 'dog does NOT hasOwnProperty hasHair');

assertTrue(animal.hasOwnProperty('eats'), 'animal hasOwnProperty eats');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 11: Extended Array/String Prototypes
// -----------------------------------------------------------------------------
console.log('🧪 Section 11: Extended Array/String Prototypes');
console.log('─'.repeat(50));

const arr = [1, 2, 3, 4, 5];
assertEqual(arr.first(), 1, 'Array.first() returns first element');
assertEqual(arr.last(), 5, 'Array.last() returns last element');

const emptyArr = [];
assertEqual(emptyArr.first(), undefined, 'Empty array first() returns undefined');
assertEqual(emptyArr.last(), undefined, 'Empty array last() returns undefined');

const str = 'hello';
assertEqual(str.reverse(), 'olleh', 'String.reverse() works');
assertEqual('racecar'.reverse(), 'racecar', 'Palindrome reverse equals itself');

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
    console.log('You have mastered the PROTOTYPE CHAIN in JavaScript!');
    console.log('\n📖 Key Takeaways:');
    console.log('   • Object.create(proto) sets up prototype inheritance');
    console.log('   • Properties are looked up the chain until found');
    console.log('   • hasOwnProperty distinguishes own vs inherited');
    console.log('   • Constructor.prototype defines shared methods\n');
} else {
    console.log('\n⚠️  Some tests failed. Review the errors above and try again!');
    console.log('💡 Tip: Use Object.getPrototypeOf() to verify the chain.\n');
}

process.exit(testsFailed > 0 ? 1 : 0);
