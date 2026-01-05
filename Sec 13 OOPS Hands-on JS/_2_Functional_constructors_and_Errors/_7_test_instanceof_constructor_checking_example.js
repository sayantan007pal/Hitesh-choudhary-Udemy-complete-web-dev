/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: instanceof, Constructor Property & Type Checking            ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _7_test_instanceof_constructor_checking_example.js
 */

const {
    Vehicle,
    Car,
    ElectricCar,
    checkAllTypes,
    verifyInheritance,
    getConstructorName,
    fixConstructorProperty
} = require('./_7_instanceof_constructor_checking_example.js');

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

function assertIncludes(array, value, testName) {
    totalTests++;
    if (array.includes(value)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected array to include: ${value}`);
        console.log(`   Actual array: [${array.join(', ')}]`);
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

console.log('\n🧪 Running instanceof and Constructor Checking Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: Vehicle Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('VEHICLE CONSTRUCTOR TESTS');

const vehicle = new Vehicle('generic');

assertEqual(vehicle.type, 'generic', 'Vehicle stores type');
assertTypeOf(Vehicle.prototype.getType, 'function', 'getType on prototype');
assertEqual(vehicle.getType(), 'generic', 'getType() returns type');
assertInstanceOf(vehicle, Vehicle, 'Vehicle is instanceof Vehicle');

// -----------------------------------------------------------------------------
// Section 2: Car Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('CAR CONSTRUCTOR TESTS');

const car = new Car('Toyota');

assertEqual(car.type, 'car', 'Car has type "car" from Vehicle');
assertEqual(car.brand, 'Toyota', 'Car stores brand');
assertTypeOf(Car.prototype.getBrand, 'function', 'getBrand on prototype');
assertEqual(car.getBrand(), 'Toyota', 'getBrand() returns brand');
assertEqual(car.getType(), 'car', 'Car inherits getType()');

// instanceof checks
assertInstanceOf(car, Car, 'Car is instanceof Car');
assertInstanceOf(car, Vehicle, 'Car is instanceof Vehicle');

// -----------------------------------------------------------------------------
// Section 3: ElectricCar Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('ELECTRIC CAR CONSTRUCTOR TESTS');

const tesla = new ElectricCar('Tesla', 100);

assertEqual(tesla.type, 'car', 'ElectricCar has type from Vehicle');
assertEqual(tesla.brand, 'Tesla', 'ElectricCar has brand from Car');
assertEqual(tesla.batteryCapacity, 100, 'ElectricCar stores batteryCapacity');

assertTypeOf(ElectricCar.prototype.getBatteryInfo, 'function', 'getBatteryInfo on prototype');
assertEqual(tesla.getBatteryInfo(), '100kWh', 'getBatteryInfo() returns correct format');

// Inherited methods
assertEqual(tesla.getBrand(), 'Tesla', 'ElectricCar inherits getBrand()');
assertEqual(tesla.getType(), 'car', 'ElectricCar inherits getType()');

// instanceof checks (3-level inheritance)
assertInstanceOf(tesla, ElectricCar, 'ElectricCar is instanceof ElectricCar');
assertInstanceOf(tesla, Car, 'ElectricCar is instanceof Car');
assertInstanceOf(tesla, Vehicle, 'ElectricCar is instanceof Vehicle');
assertInstanceOf(tesla, Object, 'ElectricCar is instanceof Object');

// -----------------------------------------------------------------------------
// Section 4: Constructor Properties
// -----------------------------------------------------------------------------
printSectionHeader('CONSTRUCTOR PROPERTY TESTS');

assertEqual(
    Vehicle.prototype.constructor,
    Vehicle,
    'Vehicle.prototype.constructor === Vehicle'
);

assertEqual(
    Car.prototype.constructor,
    Car,
    'Car.prototype.constructor === Car'
);

assertEqual(
    ElectricCar.prototype.constructor,
    ElectricCar,
    'ElectricCar.prototype.constructor === ElectricCar'
);

// Direct constructor property on instances
assertEqual(
    vehicle.constructor,
    Vehicle,
    'vehicle.constructor === Vehicle'
);

assertEqual(
    car.constructor,
    Car,
    'car.constructor === Car'
);

assertEqual(
    tesla.constructor,
    ElectricCar,
    'tesla.constructor === ElectricCar'
);

// -----------------------------------------------------------------------------
// Section 5: checkAllTypes Function
// -----------------------------------------------------------------------------
printSectionHeader('CHECK ALL TYPES FUNCTION');

const vehicleTypes = checkAllTypes(vehicle);
assertIncludes(vehicleTypes, 'Vehicle', 'Vehicle types includes Vehicle');
assertIncludes(vehicleTypes, 'Object', 'Vehicle types includes Object');
assertEqual(vehicleTypes.length, 2, 'Vehicle has 2 types');

const carTypes = checkAllTypes(car);
assertIncludes(carTypes, 'Car', 'Car types includes Car');
assertIncludes(carTypes, 'Vehicle', 'Car types includes Vehicle');
assertIncludes(carTypes, 'Object', 'Car types includes Object');
assertEqual(carTypes.length, 3, 'Car has 3 types');

const teslaTypes = checkAllTypes(tesla);
assertIncludes(teslaTypes, 'ElectricCar', 'Tesla types includes ElectricCar');
assertIncludes(teslaTypes, 'Car', 'Tesla types includes Car');
assertIncludes(teslaTypes, 'Vehicle', 'Tesla types includes Vehicle');
assertIncludes(teslaTypes, 'Object', 'Tesla types includes Object');
assertEqual(teslaTypes.length, 4, 'ElectricCar has 4 types');

// Order should be from most specific to least
assertEqual(teslaTypes[0], 'ElectricCar', 'First type is ElectricCar');
assertEqual(teslaTypes[teslaTypes.length - 1], 'Object', 'Last type is Object');

// -----------------------------------------------------------------------------
// Section 6: verifyInheritance Function
// -----------------------------------------------------------------------------
printSectionHeader('VERIFY INHERITANCE FUNCTION');

assertTrue(
    verifyInheritance(tesla, [ElectricCar, Car, Vehicle, Object]),
    'Tesla is instanceof all its parent constructors'
);

assertTrue(
    verifyInheritance(car, [Car, Vehicle]),
    'Car is instanceof Car and Vehicle'
);

assertFalse(
    verifyInheritance(car, [ElectricCar]),
    'Car is NOT instanceof ElectricCar'
);

assertFalse(
    verifyInheritance(vehicle, [Car, Vehicle]),
    'Vehicle is NOT instanceof Car'
);

assertTrue(
    verifyInheritance({}, [Object]),
    'Plain object is instanceof Object'
);

// -----------------------------------------------------------------------------
// Section 7: getConstructorName Function
// -----------------------------------------------------------------------------
printSectionHeader('GET CONSTRUCTOR NAME FUNCTION');

assertEqual(
    getConstructorName(vehicle),
    'Vehicle',
    'getConstructorName for vehicle is Vehicle'
);

assertEqual(
    getConstructorName(car),
    'Car',
    'getConstructorName for car is Car'
);

assertEqual(
    getConstructorName(tesla),
    'ElectricCar',
    'getConstructorName for tesla is ElectricCar'
);

assertEqual(
    getConstructorName({}),
    'Object',
    'getConstructorName for {} is Object'
);

assertEqual(
    getConstructorName([]),
    'Array',
    'getConstructorName for [] is Array'
);

// -----------------------------------------------------------------------------
// Section 8: fixConstructorProperty Function
// -----------------------------------------------------------------------------
printSectionHeader('FIX CONSTRUCTOR PROPERTY FUNCTION');

// Create a buggy setup
function Parent() {}
function Child() {}
Child.prototype = Object.create(Parent.prototype);
// Now Child.prototype.constructor === Parent (BUG!)

assertEqual(
    Child.prototype.constructor,
    Parent,
    'Before fix: Child.prototype.constructor === Parent (bug)'
);

// Fix it
fixConstructorProperty(Child, Parent);

assertEqual(
    Child.prototype.constructor,
    Child,
    'After fix: Child.prototype.constructor === Child (correct)'
);

// Verify inheritance still works
assertTrue(
    new Child() instanceof Parent,
    'Inheritance still works after fix'
);

// -----------------------------------------------------------------------------
// Section 9: Prototype Chain Verification
// -----------------------------------------------------------------------------
printSectionHeader('PROTOTYPE CHAIN VERIFICATION');

assertTrue(
    Object.getPrototypeOf(ElectricCar.prototype) === Car.prototype,
    'ElectricCar.prototype.__proto__ === Car.prototype'
);

assertTrue(
    Object.getPrototypeOf(Car.prototype) === Vehicle.prototype,
    'Car.prototype.__proto__ === Vehicle.prototype'
);

assertTrue(
    Object.getPrototypeOf(Vehicle.prototype) === Object.prototype,
    'Vehicle.prototype.__proto__ === Object.prototype'
);

assertTrue(
    Object.getPrototypeOf(Object.prototype) === null,
    'Object.prototype.__proto__ === null'
);

// -----------------------------------------------------------------------------
// Section 10: isPrototypeOf Method
// -----------------------------------------------------------------------------
printSectionHeader('IS PROTOTYPE OF METHOD');

assertTrue(
    Vehicle.prototype.isPrototypeOf(car),
    'Vehicle.prototype.isPrototypeOf(car)'
);

assertTrue(
    Vehicle.prototype.isPrototypeOf(tesla),
    'Vehicle.prototype.isPrototypeOf(tesla)'
);

assertTrue(
    Car.prototype.isPrototypeOf(tesla),
    'Car.prototype.isPrototypeOf(tesla)'
);

assertFalse(
    ElectricCar.prototype.isPrototypeOf(car),
    'ElectricCar.prototype.isPrototypeOf(car) is false'
);

// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
