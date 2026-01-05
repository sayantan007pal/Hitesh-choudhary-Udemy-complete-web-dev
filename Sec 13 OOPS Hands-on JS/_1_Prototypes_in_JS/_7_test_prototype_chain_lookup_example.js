/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║       TEST SUITE: Property Lookup and Shadowing Challenge                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _7_test_prototype_chain_lookup_example.js
 */

const {
    findPropertySource,
    getAllPropertyNames,
    shadowProperty,
    unshadowProperty,
    getPropertyDescriptorFromChain,
    isOwnProperty
} = require('./_7_prototype_chain_lookup_example.js');

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

function assertIncludes(array, value, testName) {
    totalTests++;
    if (Array.isArray(array) && array.includes(value)) {
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
    if (Array.isArray(array) && !array.includes(value)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected array to NOT include: ${value}`);
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

console.log('\n🧪 Running Property Lookup and Shadowing Tests...\n');

// Setup: Create test objects
const grandparent = { ancestral: 'old', shared: 'grandparent' };
const parent = Object.create(grandparent);
parent.parentProp = 'middle';
parent.shared = 'parent';  // Shadows grandparent.shared

const child = Object.create(parent);
child.childProp = 'young';


// -----------------------------------------------------------------------------
// Section 1: findPropertySource Tests
// -----------------------------------------------------------------------------
printSectionHeader('FIND PROPERTY SOURCE TESTS');

// Test 1.1: Own property
assertEqual(findPropertySource(child, 'childProp'), child, 'Finds own property on object itself');

// Test 1.2: Parent property
assertEqual(findPropertySource(child, 'parentProp'), parent, 'Finds property on parent');

// Test 1.3: Grandparent property
assertEqual(findPropertySource(child, 'ancestral'), grandparent, 'Finds property on grandparent');

// Test 1.4: Shadowed property returns closest
assertEqual(findPropertySource(child, 'shared'), parent, 'Finds closest shadowed property');

// Test 1.5: Non-existent property
assertEqual(findPropertySource(child, 'nonexistent'), null, 'Returns null for non-existent property');

// Test 1.6: Object.prototype methods
assertEqual(findPropertySource(child, 'toString'), Object.prototype, 'Finds toString on Object.prototype');


// -----------------------------------------------------------------------------
// Section 2: getAllPropertyNames Tests
// -----------------------------------------------------------------------------
printSectionHeader('GET ALL PROPERTY NAMES TESTS');

const allNames = getAllPropertyNames(child);

// Test 2.1: Contains own properties
assertIncludes(allNames, 'childProp', 'Includes own property');

// Test 2.2: Contains parent properties
assertIncludes(allNames, 'parentProp', 'Includes parent property');

// Test 2.3: Contains grandparent properties
assertIncludes(allNames, 'ancestral', 'Includes grandparent property');
assertIncludes(allNames, 'shared', 'Includes shared property');

// Test 2.4: Does NOT include Object.prototype properties
assertNotIncludes(allNames, 'toString', 'Does NOT include Object.prototype properties');
assertNotIncludes(allNames, 'hasOwnProperty', 'Does NOT include hasOwnProperty');

// Test 2.5: No duplicates
const uniqueNames = [...new Set(allNames)];
assertEqual(allNames.length, uniqueNames.length, 'No duplicate property names');

// Test 2.6: Works with object with methods
const withMethods = Object.create({ 
    method: function() {},
    value: 42 
});
withMethods.own = 'test';
const methodNames = getAllPropertyNames(withMethods);
assertIncludes(methodNames, 'method', 'Includes inherited method');
assertIncludes(methodNames, 'value', 'Includes inherited value');
assertIncludes(methodNames, 'own', 'Includes own property');


// -----------------------------------------------------------------------------
// Section 3: shadowProperty Tests
// -----------------------------------------------------------------------------
printSectionHeader('SHADOW PROPERTY TESTS');

// Test 3.1: Shadow an inherited property
const testObj1 = Object.create({ inherited: 'original' });
const hadInherited = shadowProperty(testObj1, 'inherited', 'shadowed');
assertTrue(hadInherited, 'Returns true when shadowing inherited property');
assertEqual(testObj1.inherited, 'shadowed', 'Property is now shadowed');
assertTrue(testObj1.hasOwnProperty('inherited'), 'Shadowed property is own property');

// Test 3.2: Shadow non-existent property
const testObj2 = Object.create({ other: 'value' });
const hadNonExistent = shadowProperty(testObj2, 'newProp', 'created');
assertFalse(hadNonExistent, 'Returns false when no inherited property');
assertEqual(testObj2.newProp, 'created', 'Property is still created');

// Test 3.3: Original prototype property unchanged
const proto = { original: 'untouched' };
const testObj3 = Object.create(proto);
shadowProperty(testObj3, 'original', 'touched');
assertEqual(proto.original, 'untouched', 'Prototype property unchanged');


// -----------------------------------------------------------------------------
// Section 4: unshadowProperty Tests
// -----------------------------------------------------------------------------
printSectionHeader('UNSHADOW PROPERTY TESTS');

// Test 4.1: Remove shadowing
const proto4 = { shadowed: 'original' };
const testObj4 = Object.create(proto4);
testObj4.shadowed = 'shadow';

assertEqual(testObj4.shadowed, 'shadow', 'Before: sees shadow');
const wasRemoved = unshadowProperty(testObj4, 'shadowed');
assertTrue(wasRemoved, 'Returns true when property removed');
assertEqual(testObj4.shadowed, 'original', 'After: sees original');
assertFalse(testObj4.hasOwnProperty('shadowed'), 'No longer has own property');

// Test 4.2: Try to unshadow non-own property
const testObj5 = Object.create({ inherited: 'value' });
const wasRemoved2 = unshadowProperty(testObj5, 'inherited');
assertFalse(wasRemoved2, 'Returns false when no own property');
assertEqual(testObj5.inherited, 'value', 'Inherited property still accessible');

// Test 4.3: Try to unshadow non-existent property
const testObj6 = {};
const wasRemoved3 = unshadowProperty(testObj6, 'nothing');
assertFalse(wasRemoved3, 'Returns false for non-existent property');


// -----------------------------------------------------------------------------
// Section 5: getPropertyDescriptorFromChain Tests
// -----------------------------------------------------------------------------
printSectionHeader('GET PROPERTY DESCRIPTOR FROM CHAIN TESTS');

// Test 5.1: Own property descriptor
const testObj7 = { ownProp: 42 };
const desc1 = getPropertyDescriptorFromChain(testObj7, 'ownProp');
assertEqual(desc1.value, 42, 'Gets own property value');
assertTrue(desc1.writable, 'Own property is writable');
assertTrue(desc1.enumerable, 'Own property is enumerable');

// Test 5.2: Inherited property descriptor
const proto8 = { inheritedProp: 'test' };
const testObj8 = Object.create(proto8);
const desc2 = getPropertyDescriptorFromChain(testObj8, 'inheritedProp');
assertEqual(desc2.value, 'test', 'Gets inherited property value');

// Test 5.3: Non-enumerable inherited property
const desc3 = getPropertyDescriptorFromChain([], 'length');
assertEqual(desc3.value, 0, 'Gets length property from array');
assertFalse(desc3.enumerable, 'length is non-enumerable');

// Test 5.4: Non-existent property
const desc4 = getPropertyDescriptorFromChain({}, 'nonexistent');
assertEqual(desc4, undefined, 'Returns undefined for non-existent');


// -----------------------------------------------------------------------------
// Section 6: isOwnProperty Tests
// -----------------------------------------------------------------------------
printSectionHeader('IS OWN PROPERTY TESTS');

// Test 6.1: Normal own property
const testObj9 = { myProp: 'value' };
assertTrue(isOwnProperty(testObj9, 'myProp'), 'Identifies own property');

// Test 6.2: Inherited property
const testObj10 = Object.create({ inherited: 'value' });
assertFalse(isOwnProperty(testObj10, 'inherited'), 'Inherited is not own');

// Test 6.3: Non-existent property
assertFalse(isOwnProperty(testObj10, 'nothing'), 'Non-existent is not own');

// Test 6.4: Works with Object.create(null)
const nullProto = Object.create(null);
nullProto.safeProp = 'safe';
assertTrue(isOwnProperty(nullProto, 'safeProp'), 'Works with null-proto object');
assertFalse(isOwnProperty(nullProto, 'hasOwnProperty'), 'hasOwnProperty not own on null-proto');

// Test 6.5: Object with hasOwnProperty as own property
const trickyObj = { hasOwnProperty: 'gotcha' };
assertTrue(isOwnProperty(trickyObj, 'hasOwnProperty'), 'Works even when hasOwnProperty is own prop');


// -----------------------------------------------------------------------------
// Section 7: Edge Cases
// -----------------------------------------------------------------------------
printSectionHeader('EDGE CASES');

// Test 7.1: Deep chain lookup
const level1 = { l1: 'one' };
const level2 = Object.create(level1);
level2.l2 = 'two';
const level3 = Object.create(level2);
level3.l3 = 'three';
const level4 = Object.create(level3);
level4.l4 = 'four';

assertEqual(findPropertySource(level4, 'l1'), level1, 'Deep chain finds property on level1');
assertEqual(findPropertySource(level4, 'l2'), level2, 'Deep chain finds property on level2');

// Test 7.2: Shadowing and unshadowing cycle
const cycleProto = { value: 'proto' };
const cycleObj = Object.create(cycleProto);
assertEqual(cycleObj.value, 'proto', 'Start: inherited value');

shadowProperty(cycleObj, 'value', 'shadowed');
assertEqual(cycleObj.value, 'shadowed', 'Middle: shadowed value');

unshadowProperty(cycleObj, 'value');
assertEqual(cycleObj.value, 'proto', 'End: back to inherited');


// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
