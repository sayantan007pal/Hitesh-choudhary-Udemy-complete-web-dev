/**
 * Test Suite for instanceof and Prototype Checking
 * =================================================
 * 
 * Run this file with: node _9_test_instanceof_prototype_check_example.js
 */

const {
    Vehicle,
    Car,
    ElectricCar,
    Motorcycle,
    Bicycle,
    classifyVehicle,
    getInheritanceChain,
    checkPrototypeRelationship,
    getPrototypeHierarchy,
    findCommonAncestor,
    customInstanceof,
    implementsInterface,
    getType,
    EvenNumber,
    ArrayLike,
    Truthy,
    InRange
} = require('./_9_instanceof_prototype_check_example.js');

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
        console.log(`   Expected: "${expected}"`);
        console.log(`   Actual:   "${actual}"`);
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

function assertArrayEqual(actual, expected, testName) {
    totalTests++;
    const isEqual = actual.length === expected.length && 
                    actual.every((v, i) => v === expected[i]);
    if (isEqual) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: [${expected.join(', ')}]`);
        console.log(`   Actual:   [${actual.join(', ')}]`);
        testsFailed++;
        return false;
    }
}

function assertIncludes(str, substring, testName) {
    totalTests++;
    if (str && str.includes && str.includes(substring)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to include: "${substring}"`);
        console.log(`   Actual:   "${str}"`);
        testsFailed++;
        return false;
    }
}

function assertArrayIncludes(arr, item, testName) {
    totalTests++;
    if (arr && arr.includes && arr.includes(item)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected array to include: "${item}"`);
        console.log(`   Actual:   [${arr ? arr.join(', ') : 'undefined'}]`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running instanceof & Prototype Checking Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: instanceof Deep Dive
    // =========================================================================
    console.log('\n📋 TASK 1: instanceof Deep Dive');
    console.log('-'.repeat(40));

    // Create instances
    const baseVehicle = new Vehicle("Generic", 2020);
    const car = new Car("Toyota", 2021, 4);
    const tesla = new ElectricCar("Tesla", 2023, 4, 100);
    const harley = new Motorcycle("Harley", 2022, 1200);
    const trek = new Bicycle("Trek", 21);

    // Test 1.1: ElectricCar instanceof checks
    assertTrue(tesla instanceof ElectricCar, 'tesla instanceof ElectricCar');
    assertTrue(tesla instanceof Car, 'tesla instanceof Car');
    assertTrue(tesla instanceof Vehicle, 'tesla instanceof Vehicle');
    assertTrue(tesla instanceof Object, 'tesla instanceof Object');
    assertFalse(tesla instanceof Motorcycle, 'tesla NOT instanceof Motorcycle');
    assertFalse(tesla instanceof Bicycle, 'tesla NOT instanceof Bicycle');

    // Test 1.2: Car instanceof checks
    assertTrue(car instanceof Car, 'car instanceof Car');
    assertTrue(car instanceof Vehicle, 'car instanceof Vehicle');
    assertFalse(car instanceof ElectricCar, 'car NOT instanceof ElectricCar');

    // Test 1.3: Motorcycle instanceof checks
    assertTrue(harley instanceof Motorcycle, 'harley instanceof Motorcycle');
    assertTrue(harley instanceof Vehicle, 'harley instanceof Vehicle');
    assertFalse(harley instanceof Car, 'harley NOT instanceof Car');

    // Test 1.4: Bicycle is standalone
    assertTrue(trek instanceof Bicycle, 'trek instanceof Bicycle');
    assertFalse(trek instanceof Vehicle, 'trek NOT instanceof Vehicle');
    assertTrue(trek instanceof Object, 'trek instanceof Object');

    // Test 1.5: classifyVehicle
    assertEqual(classifyVehicle(tesla), "ElectricCar", 'classifyVehicle(tesla)');
    assertEqual(classifyVehicle(car), "Car", 'classifyVehicle(car)');
    assertEqual(classifyVehicle(harley), "Motorcycle", 'classifyVehicle(harley)');
    assertEqual(classifyVehicle(baseVehicle), "Vehicle", 'classifyVehicle(baseVehicle)');
    assertEqual(classifyVehicle(trek), "Bicycle", 'classifyVehicle(trek)');
    assertEqual(classifyVehicle({}), "Unknown", 'classifyVehicle({})');
    assertEqual(classifyVehicle(42), "Unknown", 'classifyVehicle(42)');

    // Test 1.6: getInheritanceChain
    const teslaChain = getInheritanceChain(tesla);
    assertArrayIncludes(teslaChain, "ElectricCar", 'Chain includes ElectricCar');
    assertArrayIncludes(teslaChain, "Car", 'Chain includes Car');
    assertArrayIncludes(teslaChain, "Vehicle", 'Chain includes Vehicle');
    assertArrayIncludes(teslaChain, "Object", 'Chain includes Object');

    const trekChain = getInheritanceChain(trek);
    assertArrayIncludes(trekChain, "Bicycle", 'Bicycle chain includes Bicycle');
    assertArrayIncludes(trekChain, "Object", 'Bicycle chain includes Object');

    // =========================================================================
    // Task 2 Tests: Prototype Relationship
    // =========================================================================
    console.log('\n📋 TASK 2: Prototype Relationship');
    console.log('-'.repeat(40));

    // Test 2.1: checkPrototypeRelationship
    const teslaVehicleRel = checkPrototypeRelationship(Vehicle, tesla);
    assertEqual(teslaVehicleRel.isAncestor, true, 'Vehicle is ancestor of tesla');
    assertEqual(teslaVehicleRel.depth, 2, 'Vehicle is 2 levels up from ElectricCar');

    const teslaCarRel = checkPrototypeRelationship(Car, tesla);
    assertEqual(teslaCarRel.isAncestor, true, 'Car is ancestor of tesla');
    assertEqual(teslaCarRel.depth, 1, 'Car is 1 level up from ElectricCar');

    const teslaBikeRel = checkPrototypeRelationship(Bicycle, tesla);
    assertEqual(teslaBikeRel.isAncestor, false, 'Bicycle is NOT ancestor of tesla');
    assertEqual(teslaBikeRel.depth, 0, 'Depth is 0 for non-ancestor');

    // Test 2.2: getPrototypeHierarchy
    const teslaHierarchy = getPrototypeHierarchy(tesla);
    assertTrue(Array.isArray(teslaHierarchy), 'getPrototypeHierarchy returns array');
    assertTrue(teslaHierarchy.length >= 3, 'Hierarchy has at least 3 levels');
    assertTrue(
        teslaHierarchy.some(h => h.constructor === "ElectricCar"),
        'Hierarchy includes ElectricCar'
    );

    // Test 2.3: findCommonAncestor
    assertEqual(
        findCommonAncestor(tesla, harley),
        "Vehicle",
        'Common ancestor of tesla and harley is Vehicle'
    );
    assertEqual(
        findCommonAncestor(tesla, car),
        "Car",
        'Common ancestor of tesla and car is Car'
    );
    assertEqual(
        findCommonAncestor(tesla, trek),
        "Object",
        'Common ancestor of tesla and trek is Object'
    );

    // =========================================================================
    // Task 3 Tests: Custom instanceof
    // =========================================================================
    console.log('\n📋 TASK 3: Custom instanceof Implementation');
    console.log('-'.repeat(40));

    // Test 3.1: customInstanceof matches instanceof
    assertTrue(customInstanceof(tesla, ElectricCar), 'customInstanceof(tesla, ElectricCar)');
    assertTrue(customInstanceof(tesla, Car), 'customInstanceof(tesla, Car)');
    assertTrue(customInstanceof(tesla, Vehicle), 'customInstanceof(tesla, Vehicle)');
    assertTrue(customInstanceof(tesla, Object), 'customInstanceof(tesla, Object)');
    assertFalse(customInstanceof(tesla, Motorcycle), 'customInstanceof(tesla, Motorcycle) = false');
    assertFalse(customInstanceof(tesla, Bicycle), 'customInstanceof(tesla, Bicycle) = false');

    // Test 3.2: customInstanceof with arrays
    assertTrue(customInstanceof([], Array), 'customInstanceof([], Array)');
    assertTrue(customInstanceof([], Object), 'customInstanceof([], Object)');
    assertFalse(customInstanceof([], String), 'customInstanceof([], String) = false');

    // Test 3.3: customInstanceof edge cases
    assertFalse(customInstanceof(null, Object), 'customInstanceof(null, Object) = false');
    assertFalse(customInstanceof(undefined, Object), 'customInstanceof(undefined, Object) = false');

    // Test 3.4: implementsInterface
    const loggable = { log: () => {}, save: () => {} };
    assertTrue(
        implementsInterface(loggable, { methods: ["log", "save"], properties: [] }),
        'loggable implements log and save methods'
    );
    assertFalse(
        implementsInterface(loggable, { methods: ["log", "delete"], properties: [] }),
        'loggable does NOT implement delete'
    );
    assertTrue(
        implementsInterface({ name: "Test", getValue: () => 5 }, 
            { methods: ["getValue"], properties: ["name"] }),
        'Object implements getValue method and name property'
    );

    // Test 3.5: getType
    assertEqual(getType(42), "number", 'getType(42) = number');
    assertEqual(getType("hello"), "string", 'getType("hello") = string');
    assertEqual(getType(true), "boolean", 'getType(true) = boolean');
    assertEqual(getType(undefined), "undefined", 'getType(undefined) = undefined');
    assertEqual(getType(null), "null", 'getType(null) = null');
    assertEqual(getType(Symbol()), "symbol", 'getType(Symbol()) = symbol');
    assertEqual(getType(() => {}), "function", 'getType(fn) = function');
    assertEqual(getType([1, 2]), "array", 'getType([]) = array');
    assertEqual(getType(tesla), "ElectricCar", 'getType(tesla) = ElectricCar');
    assertEqual(getType({}), "Object", 'getType({}) = Object');

    // =========================================================================
    // Task 4 Tests: Symbol.hasInstance
    // =========================================================================
    console.log('\n📋 TASK 4: Symbol.hasInstance');
    console.log('-'.repeat(40));

    // Test 4.1: EvenNumber
    assertTrue(4 instanceof EvenNumber, '4 instanceof EvenNumber');
    assertTrue(0 instanceof EvenNumber, '0 instanceof EvenNumber');
    assertTrue(-2 instanceof EvenNumber, '-2 instanceof EvenNumber');
    assertFalse(5 instanceof EvenNumber, '5 NOT instanceof EvenNumber');
    assertFalse(1 instanceof EvenNumber, '1 NOT instanceof EvenNumber');
    assertFalse("4" instanceof EvenNumber, '"4" NOT instanceof EvenNumber (string)');

    // Test 4.2: ArrayLike
    assertTrue([1, 2, 3] instanceof ArrayLike, 'Array instanceof ArrayLike');
    assertTrue({ 0: "a", 1: "b", length: 2 } instanceof ArrayLike, 'ArrayLike object passes');
    assertTrue("hello" instanceof ArrayLike, 'String instanceof ArrayLike');
    assertFalse({} instanceof ArrayLike, 'Empty object NOT instanceof ArrayLike');
    assertFalse(42 instanceof ArrayLike, 'Number NOT instanceof ArrayLike');

    // Test 4.3: Truthy
    assertTrue(1 instanceof Truthy, '1 instanceof Truthy');
    assertTrue("hello" instanceof Truthy, '"hello" instanceof Truthy');
    assertTrue({} instanceof Truthy, '{} instanceof Truthy');
    assertTrue([] instanceof Truthy, '[] instanceof Truthy');
    assertFalse(0 instanceof Truthy, '0 NOT instanceof Truthy');
    assertFalse("" instanceof Truthy, '"" NOT instanceof Truthy');
    assertFalse(null instanceof Truthy, 'null NOT instanceof Truthy');

    // Test 4.4: InRange.between
    const Range1to10 = InRange.between(1, 10);
    assertTrue(5 instanceof Range1to10, '5 instanceof InRange.between(1, 10)');
    assertTrue(1 instanceof Range1to10, '1 instanceof InRange.between(1, 10)');
    assertTrue(10 instanceof Range1to10, '10 instanceof InRange.between(1, 10)');
    assertFalse(0 instanceof Range1to10, '0 NOT instanceof InRange.between(1, 10)');
    assertFalse(11 instanceof Range1to10, '11 NOT instanceof InRange.between(1, 10)');

    const Range100to200 = InRange.between(100, 200);
    assertTrue(150 instanceof Range100to200, '150 instanceof InRange.between(100, 200)');
    assertFalse(50 instanceof Range100to200, '50 NOT instanceof InRange.between(100, 200)');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test E1: Prototype chain terminates at null
    const objChain = getInheritanceChain({});
    assertArrayIncludes(objChain, "Object", 'Plain object chain includes Object');

    // Test E2: Functions have prototype chains too
    assertTrue(function() {} instanceof Function, 'Function instanceof Function');
    assertTrue(function() {} instanceof Object, 'Function instanceof Object');

    // Test E3: Class expressions
    const AnonymousClass = class {};
    const anon = new AnonymousClass();
    assertTrue(anon instanceof AnonymousClass, 'Instance of anonymous class');

    // Test E4: getType for BigInt
    if (typeof BigInt !== 'undefined') {
        assertEqual(getType(BigInt(123)), "bigint", 'getType(BigInt) = bigint');
    }

    // =========================================================================
    // Print Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉');
        console.log('You have mastered instanceof and Prototype Checking!\n');
    } else {
        console.log('\n💪 Keep going! Review the failed tests and try again.\n');
    }
}

// Run the tests
runTests();
