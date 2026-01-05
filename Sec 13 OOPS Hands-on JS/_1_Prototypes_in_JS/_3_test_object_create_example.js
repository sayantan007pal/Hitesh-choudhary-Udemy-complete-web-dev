/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║            TEST SUITE: Object.create() Challenge                             ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _3_test_object_create_example.js
 */

const {
    createVehicle,
    vehicleProto,
    createCar,
    createBike,
    createWithDescriptors
} = require('./_3_object_create_example.js');

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

console.log('\n🧪 Running Object.create() Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: createVehicle (null prototype) Tests
// -----------------------------------------------------------------------------
printSectionHeader('CREATE VEHICLE (NULL PROTOTYPE) TESTS');

// Test 1.1: createVehicle creates object with correct properties
const vehicle1 = createVehicle('Skateboard', 4);
assertEqual(vehicle1.type, 'Skateboard', 'Vehicle has correct type');
assertEqual(vehicle1.wheels, 4, 'Vehicle has correct wheels');

// Test 1.2: Vehicle has NO prototype (null)
assertEqual(Object.getPrototypeOf(vehicle1), null, 'Vehicle has null prototype');

// Test 1.3: Vehicle does NOT have toString (no Object.prototype)
assertEqual(vehicle1.toString, undefined, 'Vehicle has no toString (no Object.prototype)');

// Test 1.4: Vehicle does NOT have hasOwnProperty
assertEqual(vehicle1.hasOwnProperty, undefined, 'Vehicle has no hasOwnProperty');

// Test 1.5: Can still check own properties using Object methods
assertTrue(
    Object.prototype.hasOwnProperty.call(vehicle1, 'type'),
    'Can use Object.prototype.hasOwnProperty.call() for null-proto objects'
);


// -----------------------------------------------------------------------------
// Section 2: vehicleProto Object Tests
// -----------------------------------------------------------------------------
printSectionHeader('VEHICLE PROTO OBJECT TESTS');

// Test 2.1: vehicleProto has describe method
assertTypeOf(vehicleProto.describe, 'function', 'vehicleProto has describe method');

// Test 2.2: vehicleProto has start method
assertTypeOf(vehicleProto.start, 'function', 'vehicleProto has start method');

// Test 2.3: start method returns correct value
assertEqual(vehicleProto.start(), 'Vehicle started', 'start() returns correct message');

// Test 2.4: describe uses this correctly
const testVehicle = Object.create(vehicleProto);
testVehicle.type = 'Truck';
testVehicle.wheels = 18;
assertEqual(
    testVehicle.describe(),
    'Truck with 18 wheels',
    'describe() uses this.type and this.wheels correctly'
);


// -----------------------------------------------------------------------------
// Section 3: createCar Tests
// -----------------------------------------------------------------------------
printSectionHeader('CREATE CAR TESTS');

// Test 3.1: createCar creates object with correct properties
const car1 = createCar('Toyota', 'Camry');
assertEqual(car1.type, 'Car', 'Car has type "Car"');
assertEqual(car1.wheels, 4, 'Car has 4 wheels');
assertEqual(car1.brand, 'Toyota', 'Car has correct brand');
assertEqual(car1.model, 'Camry', 'Car has correct model');

// Test 3.2: Car has honk method
assertTypeOf(car1.honk, 'function', 'Car has honk method');
assertEqual(car1.honk(), 'Toyota Camry says Beep!', 'honk() returns correct message');

// Test 3.3: Car inherits from vehicleProto
assertEqual(Object.getPrototypeOf(car1), vehicleProto, 'Car prototype is vehicleProto');

// Test 3.4: Car can use inherited methods
assertEqual(car1.describe(), 'Car with 4 wheels', 'Car can use inherited describe()');
assertEqual(car1.start(), 'Vehicle started', 'Car can use inherited start()');

// Test 3.5: Different cars have different properties
const car2 = createCar('Honda', 'Civic');
assertEqual(car2.honk(), 'Honda Civic says Beep!', 'Different car has different honk');
assertEqual(car1.honk(), 'Toyota Camry says Beep!', 'Original car unaffected');


// -----------------------------------------------------------------------------
// Section 4: createBike Tests
// -----------------------------------------------------------------------------
printSectionHeader('CREATE BIKE TESTS');

// Test 4.1: createBike creates object with correct properties
const bike1 = createBike('Schwinn');
assertEqual(bike1.type, 'Bike', 'Bike has type "Bike"');
assertEqual(bike1.wheels, 2, 'Bike has 2 wheels');
assertEqual(bike1.brand, 'Schwinn', 'Bike has correct brand');

// Test 4.2: Bike has ring method
assertTypeOf(bike1.ring, 'function', 'Bike has ring method');
assertEqual(bike1.ring(), 'Schwinn says Ring Ring!', 'ring() returns correct message');

// Test 4.3: Bike inherits from vehicleProto
assertEqual(Object.getPrototypeOf(bike1), vehicleProto, 'Bike prototype is vehicleProto');

// Test 4.4: Bike can use inherited methods
assertEqual(bike1.describe(), 'Bike with 2 wheels', 'Bike can use inherited describe()');
assertEqual(bike1.start(), 'Vehicle started', 'Bike can use inherited start()');


// -----------------------------------------------------------------------------
// Section 5: createWithDescriptors Tests
// -----------------------------------------------------------------------------
printSectionHeader('CREATE WITH DESCRIPTORS TESTS');

// Test 5.1: Creates object with correct prototype
const proto = { greet: function() { return 'Hello'; } };
const obj1 = createWithDescriptors(proto, { name: 'John', age: 30 });

assertEqual(Object.getPrototypeOf(obj1), proto, 'Object has correct prototype');

// Test 5.2: Has correct properties
assertEqual(obj1.name, 'John', 'Object has name property');
assertEqual(obj1.age, 30, 'Object has age property');

// Test 5.3: Can use inherited method
assertEqual(obj1.greet(), 'Hello', 'Object can use inherited method');

// Test 5.4: Properties are enumerable
const keys = Object.keys(obj1);
assertTrue(keys.includes('name'), 'name is enumerable');
assertTrue(keys.includes('age'), 'age is enumerable');

// Test 5.5: Properties are writable
obj1.name = 'Jane';
assertEqual(obj1.name, 'Jane', 'Properties are writable');

// Test 5.6: Properties are configurable
delete obj1.age;
assertEqual(obj1.age, undefined, 'Properties are configurable (can be deleted)');

// Test 5.7: Works with null prototype
const nullProtoObj = createWithDescriptors(null, { key: 'value' });
assertEqual(Object.getPrototypeOf(nullProtoObj), null, 'Works with null prototype');
assertEqual(nullProtoObj.key, 'value', 'Has correct property with null proto');


// -----------------------------------------------------------------------------
// Section 6: Edge Cases and Advanced Tests
// -----------------------------------------------------------------------------
printSectionHeader('EDGE CASES AND ADVANCED TESTS');

// Test 6.1: Car and Bike share the same vehicleProto
assertEqual(
    Object.getPrototypeOf(car1),
    Object.getPrototypeOf(bike1),
    'Car and Bike share same prototype'
);

// Test 6.2: Modifying vehicleProto affects all children
vehicleProto.honkHorn = function() { return 'HONK!'; };
assertEqual(car1.honkHorn(), 'HONK!', 'Car gets new method from vehicleProto');
assertEqual(bike1.honkHorn(), 'HONK!', 'Bike gets new method from vehicleProto');

// Test 6.3: Own properties override inherited ones
car1.start = function() { return 'Car engine started'; };
assertEqual(car1.start(), 'Car engine started', 'Own property overrides inherited');
assertEqual(bike1.start(), 'Vehicle started', 'Other objects unaffected');

// Test 6.4: Car does not have Bike's ring method
assertEqual(car1.ring, undefined, 'Car does not have ring method');

// Test 6.5: Bike does not have Car's honk method
assertEqual(bike1.honk, undefined, 'Bike does not have honk method');


// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
