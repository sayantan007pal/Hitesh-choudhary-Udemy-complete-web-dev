/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: Constructor Composition & Mixins Pattern                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _9_test_constructor_composition_mixins_example.js
 */

const {
    canFly,
    canSwim,
    canWalk,
    mixin,
    Bird,
    Duck,
    Penguin,
    listMixedMethods
} = require('./_9_constructor_composition_mixins_example.js');

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

function assertNotIncludes(array, value, testName) {
    totalTests++;
    if (!array.includes(value)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected array to NOT include: ${value}`);
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

console.log('\n🧪 Running Constructor Composition & Mixins Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: Mixin Objects Structure
// -----------------------------------------------------------------------------
printSectionHeader('MIXIN OBJECTS STRUCTURE');

// canFly mixin
assertTypeOf(canFly, 'object', 'canFly is an object');
assertTypeOf(canFly.fly, 'function', 'canFly has fly method');
assertTypeOf(canFly.land, 'function', 'canFly has land method');

// canSwim mixin
assertTypeOf(canSwim, 'object', 'canSwim is an object');
assertTypeOf(canSwim.swim, 'function', 'canSwim has swim method');
assertTypeOf(canSwim.dive, 'function', 'canSwim has dive method');

// canWalk mixin
assertTypeOf(canWalk, 'object', 'canWalk is an object');
assertTypeOf(canWalk.walk, 'function', 'canWalk has walk method');
assertTypeOf(canWalk.run, 'function', 'canWalk has run method');

// -----------------------------------------------------------------------------
// Section 2: Bird Tests (canFly mixin)
// -----------------------------------------------------------------------------
printSectionHeader('BIRD TESTS (canFly MIXIN)');

const bird = new Bird('Tweety');

assertEqual(bird.name, 'Tweety', 'Bird stores name');

// Own method
assertTypeOf(bird.chirp, 'function', 'Bird has chirp method');
assertEqual(bird.chirp(), 'Tweety chirps!', 'chirp() returns correct string');

// Mixin methods
assertTypeOf(bird.fly, 'function', 'Bird has fly method from mixin');
assertTypeOf(bird.land, 'function', 'Bird has land method from mixin');
assertEqual(bird.fly(), 'Tweety is flying!', 'fly() returns correct string');
assertEqual(bird.land(), 'Tweety has landed', 'land() returns correct string');

// -----------------------------------------------------------------------------
// Section 3: Duck Tests (canFly AND canSwim mixins)
// -----------------------------------------------------------------------------
printSectionHeader('DUCK TESTS (canFly AND canSwim MIXINS)');

const duck = new Duck('Donald');

assertEqual(duck.name, 'Donald', 'Duck stores name');

// Own method
assertTypeOf(duck.quack, 'function', 'Duck has quack method');
assertEqual(duck.quack(), 'Quack!', 'quack() returns correct string');

// canFly mixin methods
assertTypeOf(duck.fly, 'function', 'Duck has fly method from mixin');
assertTypeOf(duck.land, 'function', 'Duck has land method from mixin');
assertEqual(duck.fly(), 'Donald is flying!', 'fly() works for duck');
assertEqual(duck.land(), 'Donald has landed', 'land() works for duck');

// canSwim mixin methods
assertTypeOf(duck.swim, 'function', 'Duck has swim method from mixin');
assertTypeOf(duck.dive, 'function', 'Duck has dive method from mixin');
assertEqual(duck.swim(), 'Donald is swimming!', 'swim() works for duck');
assertEqual(duck.dive(), 'Donald is diving deep', 'dive() works for duck');

// -----------------------------------------------------------------------------
// Section 4: Penguin Tests (canSwim AND canWalk mixins, NOT canFly)
// -----------------------------------------------------------------------------
printSectionHeader('PENGUIN TESTS (canSwim AND canWalk, NO canFly)');

const penguin = new Penguin('Pingu');

assertEqual(penguin.name, 'Pingu', 'Penguin stores name');

// Own method
assertTypeOf(penguin.waddle, 'function', 'Penguin has waddle method');
assertEqual(penguin.waddle(), 'Pingu waddles cutely', 'waddle() returns correct string');

// canSwim mixin methods
assertTypeOf(penguin.swim, 'function', 'Penguin has swim method');
assertTypeOf(penguin.dive, 'function', 'Penguin has dive method');
assertEqual(penguin.swim(), 'Pingu is swimming!', 'swim() works for penguin');

// canWalk mixin methods
assertTypeOf(penguin.walk, 'function', 'Penguin has walk method');
assertTypeOf(penguin.run, 'function', 'Penguin has run method');
assertEqual(penguin.walk(), 'Pingu is walking', 'walk() works for penguin');
assertEqual(penguin.run(), 'Pingu is running!', 'run() works for penguin');

// Penguin CANNOT fly
assertEqual(penguin.fly, undefined, 'Penguin does NOT have fly method');
assertEqual(penguin.land, undefined, 'Penguin does NOT have land method');

// -----------------------------------------------------------------------------
// Section 5: mixin Function Tests
// -----------------------------------------------------------------------------
printSectionHeader('MIXIN FUNCTION TESTS');

function Robot(name) {
    this.name = name;
}
Robot.prototype.beep = function() {
    return this.name + ' beeps!';
};

// Apply canWalk mixin
const result = mixin(Robot, canWalk);

assertEqual(result, Robot, 'mixin returns the Target constructor');

const robot = new Robot('R2D2');

// Original method still works
assertEqual(robot.beep(), 'R2D2 beeps!', 'Original method still works');

// Mixin methods work
assertEqual(robot.walk(), 'R2D2 is walking', 'Mixin method works');
assertEqual(robot.run(), 'R2D2 is running!', 'Mixin method works');

// -----------------------------------------------------------------------------
// Section 6: mixin Does Not Overwrite
// -----------------------------------------------------------------------------
printSectionHeader('MIXIN DOES NOT OVERWRITE EXISTING');

function CustomFlyer(name) {
    this.name = name;
}
// Define own fly method BEFORE mixin
CustomFlyer.prototype.fly = function() {
    return this.name + ' custom flies!';
};

mixin(CustomFlyer, canFly);

const customFlyer = new CustomFlyer('Custom');

// Own fly method should NOT be overwritten
assertEqual(
    customFlyer.fly(),
    'Custom custom flies!',
    'Own method is NOT overwritten by mixin'
);

// But land should be added from mixin
assertEqual(
    customFlyer.land(),
    'Custom has landed',
    'Non-conflicting mixin method is added'
);

// -----------------------------------------------------------------------------
// Section 7: Multiple Mixins
// -----------------------------------------------------------------------------
printSectionHeader('MULTIPLE MIXINS');

function SuperCreature(name) {
    this.name = name;
}

mixin(SuperCreature, canFly, canSwim, canWalk);

const superCreature = new SuperCreature('Phoenix');

// Has all mixin methods
assertTypeOf(superCreature.fly, 'function', 'Has fly from canFly');
assertTypeOf(superCreature.swim, 'function', 'Has swim from canSwim');
assertTypeOf(superCreature.walk, 'function', 'Has walk from canWalk');

// All work correctly
assertEqual(superCreature.fly(), 'Phoenix is flying!', 'fly works');
assertEqual(superCreature.swim(), 'Phoenix is swimming!', 'swim works');
assertEqual(superCreature.walk(), 'Phoenix is walking', 'walk works');

// -----------------------------------------------------------------------------
// Section 8: listMixedMethods Function
// -----------------------------------------------------------------------------
printSectionHeader('LIST MIXED METHODS FUNCTION');

const duckMethods = listMixedMethods(duck);

// Should include mixin methods
assertIncludes(duckMethods, 'fly', 'Duck mixed methods includes fly');
assertIncludes(duckMethods, 'land', 'Duck mixed methods includes land');
assertIncludes(duckMethods, 'swim', 'Duck mixed methods includes swim');
assertIncludes(duckMethods, 'dive', 'Duck mixed methods includes dive');

// Should NOT include own method
assertNotIncludes(duckMethods, 'quack', 'Duck mixed methods does NOT include quack');

const penguinMethods = listMixedMethods(penguin);

// Penguin has swim, dive, walk, run but NOT fly
assertIncludes(penguinMethods, 'swim', 'Penguin mixed methods includes swim');
assertIncludes(penguinMethods, 'walk', 'Penguin mixed methods includes walk');
assertNotIncludes(penguinMethods, 'fly', 'Penguin mixed methods does NOT include fly');
assertNotIncludes(penguinMethods, 'waddle', 'Penguin mixed methods does NOT include waddle');

// -----------------------------------------------------------------------------
// Section 9: Different Instances Same Prototype
// -----------------------------------------------------------------------------
printSectionHeader('PROTOTYPE METHOD SHARING');

const duck1 = new Duck('Duck1');
const duck2 = new Duck('Duck2');

// Different instances produce different results (use this.name)
assertEqual(duck1.fly(), 'Duck1 is flying!', 'Duck1 flies with own name');
assertEqual(duck2.fly(), 'Duck2 is flying!', 'Duck2 flies with own name');

// But share the same method reference
assertTrue(
    duck1.fly === duck2.fly,
    'Different instances share same prototype methods'
);

// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
