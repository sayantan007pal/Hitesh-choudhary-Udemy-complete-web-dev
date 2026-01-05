/**
 * Test Suite for Prototype Chain and Property Lookup
 * ===================================================
 * 
 * Run this file with: node _3_test_prototype_chain_lookup_example.js
 */

const {
    animal,
    dog,
    goldenRetriever,
    createShadowExample,
    findPropertyInChain
} = require('./_3_prototype_chain_lookup_example.js');

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

function assertStrictEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expected}`);
        console.log(`   Actual:   ${actual}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Prototype Chain Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: Building a Prototype Chain Manually
    // =========================================================================
    console.log('\n📋 TASK 1: Prototype Chain (animal → dog → goldenRetriever)');
    console.log('-'.repeat(40));

    // Test 1.1: animal object exists and has properties
    assertTrue(typeof animal === 'object', 'animal is an object');
    assertEqual(animal.isAlive, true, 'animal.isAlive is true');

    // Test 1.2: animal methods work
    assertEqual(animal.breathe(), "Breathing...", 'animal.breathe() works');
    assertEqual(animal.eat("Pizza"), "Pizza is delicious!", 'animal.eat("Pizza") works');

    // Test 1.3: dog inherits from animal
    assertTrue(
        Object.getPrototypeOf(dog) === animal,
        'dog prototype is animal'
    );

    // Test 1.4: dog has own properties
    assertEqual(dog.species, "Canine", 'dog.species is "Canine"');

    // Test 1.5: dog methods work
    assertEqual(dog.bark(), "Woof! Woof!", 'dog.bark() works');
    assertEqual(dog.fetch("ball"), "Fetched the ball!", 'dog.fetch("ball") works');

    // Test 1.6: dog inherits from animal
    assertEqual(dog.isAlive, true, 'dog.isAlive inherited from animal');
    assertEqual(dog.breathe(), "Breathing...", 'dog.breathe() inherited from animal');

    // Test 1.7: goldenRetriever inherits from dog
    assertTrue(
        Object.getPrototypeOf(goldenRetriever) === dog,
        'goldenRetriever prototype is dog'
    );

    // Test 1.8: goldenRetriever has own properties
    assertEqual(goldenRetriever.breed, "Golden Retriever", 'goldenRetriever.breed');
    assertEqual(goldenRetriever.color, "Golden", 'goldenRetriever.color');

    // Test 1.9: goldenRetriever methods work
    assertEqual(
        goldenRetriever.swim(),
        "Golden Retriever loves swimming!",
        'goldenRetriever.swim() works'
    );

    // Test 1.10: goldenRetriever inherits from dog
    assertEqual(goldenRetriever.species, "Canine", 'goldenRetriever.species from dog');
    assertEqual(goldenRetriever.bark(), "Woof! Woof!", 'goldenRetriever.bark() from dog');

    // Test 1.11: goldenRetriever inherits from animal (2 levels up)
    assertEqual(goldenRetriever.isAlive, true, 'goldenRetriever.isAlive from animal');
    assertEqual(
        goldenRetriever.breathe(),
        "Breathing...",
        'goldenRetriever.breathe() from animal'
    );

    // Test 1.12: Full prototype chain
    assertTrue(
        Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(goldenRetriever))) === Object.prototype,
        'Full chain: goldenRetriever → dog → animal → Object.prototype'
    );

    // Test 1.13: End of chain
    assertTrue(
        Object.getPrototypeOf(Object.prototype) === null,
        'Object.prototype.__proto__ is null (end of chain)'
    );

    // =========================================================================
    // Task 2 Tests: Property Shadowing
    // =========================================================================
    console.log('\n📋 TASK 2: Property Shadowing');
    console.log('-'.repeat(40));

    const shadow = createShadowExample();

    // Test 2.1: Initially gets parent's name
    assertEqual(
        shadow.getChildName(),
        "Parent",
        'Initially child.name is "Parent" (inherited)'
    );

    // Test 2.2: Child doesn't have own name initially
    assertFalse(shadow.hasOwnName(), 'Child does not have own name initially');

    // Test 2.3: Parent's name is accessible
    assertEqual(shadow.getParentName(), "Parent", 'Parent name is "Parent"');

    // Test 2.4: Set child's own name (shadowing)
    shadow.setChildName("Child");
    assertEqual(
        shadow.getChildName(),
        "Child",
        'After setting, child.name is "Child" (shadows parent)'
    );

    // Test 2.5: Child now has own name
    assertTrue(shadow.hasOwnName(), 'Child now has own name property');

    // Test 2.6: Parent unchanged after shadowing
    assertEqual(
        shadow.getParentName(),
        "Parent",
        'Parent name unchanged after child shadowing'
    );

    // Test 2.7: Delete child's own name
    shadow.deleteChildName();
    assertEqual(
        shadow.getChildName(),
        "Parent",
        'After delete, child.name is "Parent" again (inherited)'
    );

    // Test 2.8: Child no longer has own name
    assertFalse(shadow.hasOwnName(), 'Child no longer has own name after delete');

    // =========================================================================
    // Task 3 Tests: findPropertyInChain
    // =========================================================================
    console.log('\n📋 TASK 3: findPropertyInChain Function');
    console.log('-'.repeat(40));

    // Set up test objects
    const grandparent = { family: "Smith", legacy: "proud" };
    const parent = Object.create(grandparent);
    parent.job = "Engineer";
    parent.age = 45;
    const child = Object.create(parent);
    child.name = "John";
    child.hobby = "coding";

    // Test 3.1: Find own property (depth 0)
    let result = findPropertyInChain(child, "name");
    assertTrue(result.found, 'findPropertyInChain finds own property');
    assertEqual(result.value, "John", 'Own property value is correct');
    assertStrictEqual(result.owner, child, 'Owner is child object');
    assertEqual(result.chainDepth, 0, 'Chain depth is 0 for own property');

    // Test 3.2: Find parent property (depth 1)
    result = findPropertyInChain(child, "job");
    assertTrue(result.found, 'findPropertyInChain finds parent property');
    assertEqual(result.value, "Engineer", 'Parent property value is correct');
    assertStrictEqual(result.owner, parent, 'Owner is parent object');
    assertEqual(result.chainDepth, 1, 'Chain depth is 1 for parent property');

    // Test 3.3: Find grandparent property (depth 2)
    result = findPropertyInChain(child, "family");
    assertTrue(result.found, 'findPropertyInChain finds grandparent property');
    assertEqual(result.value, "Smith", 'Grandparent property value is correct');
    assertStrictEqual(result.owner, grandparent, 'Owner is grandparent object');
    assertEqual(result.chainDepth, 2, 'Chain depth is 2 for grandparent property');

    // Test 3.4: Property not found
    result = findPropertyInChain(child, "nonexistent");
    assertFalse(result.found, 'Returns found=false for nonexistent property');
    assertEqual(result.value, undefined, 'Value is undefined for nonexistent');
    assertEqual(result.owner, null, 'Owner is null for nonexistent');
    assertEqual(result.chainDepth, -1, 'Chain depth is -1 for nonexistent');

    // Test 3.5: Find method from Object.prototype
    result = findPropertyInChain(child, "hasOwnProperty");
    assertTrue(result.found, 'Finds hasOwnProperty from Object.prototype');
    assertStrictEqual(result.owner, Object.prototype, 'Owner is Object.prototype');

    // =========================================================================
    // Task 4 Tests: Extending Built-in Prototypes
    // =========================================================================
    console.log('\n📋 TASK 4: Array and String Prototype Extensions');
    console.log('-'.repeat(40));

    // Test 4.1: Array.first()
    assertEqual([1, 2, 3].first(), 1, '[1,2,3].first() returns 1');
    assertEqual(["a", "b"].first(), "a", '["a","b"].first() returns "a"');
    assertEqual([].first(), undefined, '[].first() returns undefined');

    // Test 4.2: Array.last()
    assertEqual([1, 2, 3].last(), 3, '[1,2,3].last() returns 3');
    assertEqual(["x", "y", "z"].last(), "z", '["x","y","z"].last() returns "z"');
    assertEqual([].last(), undefined, '[].last() returns undefined');

    // Test 4.3: Array.isEmpty()
    assertTrue([].isEmpty(), '[].isEmpty() returns true');
    assertFalse([1].isEmpty(), '[1].isEmpty() returns false');
    assertFalse([1, 2, 3].isEmpty(), '[1,2,3].isEmpty() returns false');

    // Test 4.4: String.reverse()
    assertEqual("hello".reverse(), "olleh", '"hello".reverse() returns "olleh"');
    assertEqual("a".reverse(), "a", '"a".reverse() returns "a"');
    assertEqual("".reverse(), "", '"".reverse() returns ""');
    assertEqual("12345".reverse(), "54321", '"12345".reverse() returns "54321"');

    // Test 4.5: String.isPalindrome()
    assertTrue("racecar".isPalindrome(), '"racecar" is palindrome');
    assertTrue("madam".isPalindrome(), '"madam" is palindrome');
    assertTrue("a".isPalindrome(), '"a" is palindrome');
    assertTrue("".isPalindrome(), '"" is palindrome');
    assertFalse("hello".isPalindrome(), '"hello" is not palindrome');

    // Test 4.6: isPalindrome ignores case
    assertTrue("RaceCar".isPalindrome(), '"RaceCar" is palindrome (ignore case)');
    assertTrue("Madam".isPalindrome(), '"Madam" is palindrome (ignore case)');

    // Test 4.7: isPalindrome ignores spaces
    assertTrue("race car".isPalindrome(), '"race car" is palindrome (ignore spaces)');
    assertTrue("A man a plan a canal Panama".isPalindrome(), 'Complex palindrome works');
    assertTrue("Was it a car or a cat I saw".isPalindrome(), 'Another complex palindrome');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test E1: Object with null prototype
    const nullProtoObj = Object.create(null);
    nullProtoObj.test = "value";
    const nullResult = findPropertyInChain(nullProtoObj, "test");
    assertTrue(nullResult.found, 'Works with null prototype object');
    assertEqual(nullResult.chainDepth, 0, 'Null prototype: own prop at depth 0');

    // Test E2: null prototype has no Object.prototype methods
    const noToString = findPropertyInChain(nullProtoObj, "toString");
    assertFalse(noToString.found, 'Null prototype object has no toString');

    // Test E3: Prototype chain with same property at multiple levels
    const level0 = { shared: "level0" };
    const level1 = Object.create(level0);
    level1.shared = "level1";  // Shadows level0
    const level2 = Object.create(level1);
    
    const sharedResult = findPropertyInChain(level2, "shared");
    assertEqual(sharedResult.value, "level1", 'Finds closest shadowed property');
    assertEqual(sharedResult.chainDepth, 1, 'Shadowed property at correct depth');

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
        console.log('You have mastered the Prototype Chain!\n');
    } else {
        console.log('\n💪 Keep going! Review the failed tests and try again.\n');
    }
}

// Run the tests
runTests();
