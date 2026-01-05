/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: hasOwnProperty and Property Enumeration Challenge            ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _8_test_hasOwnProperty_enumeration_example.js
 */

const {
    categorizeProperties,
    safeHasOwnProperty,
    getEnumerableProperties,
    countPropertiesByType,
    makePropertyNonEnumerable,
    filterOwnProperties
} = require('./_8_hasOwnProperty_enumeration_example.js');

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
    const actualStr = JSON.stringify(actual, Object.keys(actual).sort());
    const expectedStr = JSON.stringify(expected, Object.keys(expected).sort());
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
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

function assertArraysEqual(actual, expected, testName) {
    totalTests++;
    const actualSorted = [...actual].sort();
    const expectedSorted = [...expected].sort();
    if (JSON.stringify(actualSorted) === JSON.stringify(expectedSorted)) {
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

console.log('\n🧪 Running hasOwnProperty and Property Enumeration Tests...\n');

// Setup test objects
const proto = { inherited1: 'i1', inherited2: 'i2' };
const child = Object.create(proto);
child.own1 = 'o1';
child.own2 = 'o2';


// -----------------------------------------------------------------------------
// Section 1: categorizeProperties Tests
// -----------------------------------------------------------------------------
printSectionHeader('CATEGORIZE PROPERTIES TESTS');

// Test 1.1: Basic categorization
const result1 = categorizeProperties(child);
assertArraysEqual(result1.own, ['own1', 'own2'], 'Identifies own properties');
assertArraysEqual(result1.inherited, ['inherited1', 'inherited2'], 'Identifies inherited properties');

// Test 1.2: Object with no inheritance (except Object.prototype)
const plainObj = { a: 1, b: 2 };
const result2 = categorizeProperties(plainObj);
assertArraysEqual(result2.own, ['a', 'b'], 'Plain object has own properties');
assertArraysEqual(result2.inherited, [], 'Plain object has no custom inherited (Object.prototype excluded)');

// Test 1.3: Empty object
const emptyObj = Object.create({ parentProp: 'test' });
const result3 = categorizeProperties(emptyObj);
assertArraysEqual(result3.own, [], 'No own properties on empty child');
assertArraysEqual(result3.inherited, ['parentProp'], 'Has inherited from parent');

// Test 1.4: Null prototype object
const nullProtoObj = Object.create(null);
nullProtoObj.myProp = 'value';
const result4 = categorizeProperties(nullProtoObj);
assertArraysEqual(result4.own, ['myProp'], 'Null-proto object has own properties');
assertArraysEqual(result4.inherited, [], 'Null-proto object has no inherited');


// -----------------------------------------------------------------------------
// Section 2: safeHasOwnProperty Tests
// -----------------------------------------------------------------------------
printSectionHeader('SAFE HAS OWN PROPERTY TESTS');

// Test 2.1: Normal object
const normalObj = { prop: 'value' };
assertTrue(safeHasOwnProperty(normalObj, 'prop'), 'Normal object - has own property');
assertFalse(safeHasOwnProperty(normalObj, 'other'), 'Normal object - does not have property');

// Test 2.2: Object with hasOwnProperty as own property
const trickyObj = { 
    hasOwnProperty: 'I broke it!',
    realProp: 'value'
};
assertTrue(safeHasOwnProperty(trickyObj, 'hasOwnProperty'), 'Works when hasOwnProperty is own prop');
assertTrue(safeHasOwnProperty(trickyObj, 'realProp'), 'Can still detect other own props');

// Test 2.3: Object.create(null) object
const nullProto = Object.create(null);
nullProto.data = 'test';
assertTrue(safeHasOwnProperty(nullProto, 'data'), 'Works with null-proto object');
assertFalse(safeHasOwnProperty(nullProto, 'other'), 'Returns false for missing on null-proto');

// Test 2.4: Inherited property
const withInherited = Object.create({ parentProp: 'parent' });
withInherited.childProp = 'child';
assertFalse(safeHasOwnProperty(withInherited, 'parentProp'), 'Returns false for inherited');
assertTrue(safeHasOwnProperty(withInherited, 'childProp'), 'Returns true for own');


// -----------------------------------------------------------------------------
// Section 3: getEnumerableProperties Tests
// -----------------------------------------------------------------------------
printSectionHeader('GET ENUMERABLE PROPERTIES TESTS');

// Test 3.1: Own only
const testProto = { inherited: 'iVal' };
const testChild = Object.create(testProto);
testChild.own = 'oVal';

const ownOnly = getEnumerableProperties(testChild, false);
assertDeepEqual(ownOnly, { own: 'oVal' }, 'Gets only own properties when false');

// Test 3.2: Including inherited
const withInheritedProps = getEnumerableProperties(testChild, true);
assertDeepEqual(withInheritedProps, { own: 'oVal', inherited: 'iVal' }, 'Includes inherited when true');

// Test 3.3: Multiple own properties
const multiOwn = { a: 1, b: 2, c: 3 };
const multiResult = getEnumerableProperties(multiOwn, false);
assertDeepEqual(multiResult, { a: 1, b: 2, c: 3 }, 'Gets multiple own properties');

// Test 3.4: Empty object
const emptyResult = getEnumerableProperties({}, false);
assertDeepEqual(emptyResult, {}, 'Returns empty object for empty input');


// -----------------------------------------------------------------------------
// Section 4: countPropertiesByType Tests
// -----------------------------------------------------------------------------
printSectionHeader('COUNT PROPERTIES BY TYPE TESTS');

// Test 4.1: Basic count
const countProto = { ip1: 'a', ip2: 'b' };
const countChild = Object.create(countProto);
countChild.own1 = 'x';
countChild.own2 = 'y';
Object.defineProperty(countChild, 'nonEnum', { value: 'hidden', enumerable: false });

const counts = countPropertiesByType(countChild);
assertEqual(counts.ownEnumerable, 2, 'Counts own enumerable properties');
assertEqual(counts.ownNonEnumerable, 1, 'Counts own non-enumerable properties');
assertEqual(counts.inherited, 2, 'Counts inherited enumerable properties');

// Test 4.2: Object with no inherited
const noInherited = { a: 1, b: 2 };
Object.defineProperty(noInherited, 'hidden', { value: 'x', enumerable: false });
const counts2 = countPropertiesByType(noInherited);
assertEqual(counts2.ownEnumerable, 2, 'Counts enum without inherited');
assertEqual(counts2.ownNonEnumerable, 1, 'Counts non-enum without inherited');
assertEqual(counts2.inherited, 0, 'Zero inherited (Object.prototype excluded)');

// Test 4.3: Empty object
const emptyCounts = countPropertiesByType({});
assertEqual(emptyCounts.ownEnumerable, 0, 'Empty has 0 enumerable');
assertEqual(emptyCounts.ownNonEnumerable, 0, 'Empty has 0 non-enumerable');
assertEqual(emptyCounts.inherited, 0, 'Empty has 0 inherited');


// -----------------------------------------------------------------------------
// Section 5: makePropertyNonEnumerable Tests
// -----------------------------------------------------------------------------
printSectionHeader('MAKE PROPERTY NON-ENUMERABLE TESTS');

// Test 5.1: Make existing property non-enumerable
const enumObj = { visible: 'yes', hidden: 'will be hidden' };
const wasModified = makePropertyNonEnumerable(enumObj, 'hidden');
assertTrue(wasModified, 'Returns true when property exists');
assertFalse(Object.keys(enumObj).includes('hidden'), 'Property no longer in Object.keys');
assertEqual(enumObj.hidden, 'will be hidden', 'Value still accessible');

// Test 5.2: Property doesn't exist
const noModify = makePropertyNonEnumerable({ a: 1 }, 'nonexistent');
assertFalse(noModify, 'Returns false when property does not exist');

// Test 5.3: Already non-enumerable
const alreadyHidden = { visible: 'yes' };
Object.defineProperty(alreadyHidden, 'hidden', { value: 'x', enumerable: false });
const modifiedAgain = makePropertyNonEnumerable(alreadyHidden, 'hidden');
assertTrue(modifiedAgain, 'Returns true even if already non-enumerable');


// -----------------------------------------------------------------------------
// Section 6: filterOwnProperties Tests
// -----------------------------------------------------------------------------
printSectionHeader('FILTER OWN PROPERTIES TESTS');

// Test 6.1: Filter by value type
const mixedObj = { 
    name: 'John', 
    age: 30, 
    active: true,
    score: 100
};
const numbersOnly = filterOwnProperties(mixedObj, (key, value) => typeof value === 'number');
assertDeepEqual(numbersOnly, { age: 30, score: 100 }, 'Filters to only numbers');

// Test 6.2: Filter by key
const keyFilter = filterOwnProperties(mixedObj, (key) => key.length > 3);
assertDeepEqual(keyFilter, { name: 'John', active: true, score: 100 }, 'Filters by key length');

// Test 6.3: Filter excludes inherited
const filterProto = { inherited: 'should not appear' };
const filterChild = Object.create(filterProto);
filterChild.own1 = 1;
filterChild.own2 = 2;
filterChild.own3 = 3;

const filtered = filterOwnProperties(filterChild, () => true);
assertDeepEqual(filtered, { own1: 1, own2: 2, own3: 3 }, 'Only includes own, not inherited');

// Test 6.4: Empty result
const allFiltered = filterOwnProperties(mixedObj, () => false);
assertDeepEqual(allFiltered, {}, 'Returns empty when all filtered out');


// -----------------------------------------------------------------------------
// Section 7: Edge Cases
// -----------------------------------------------------------------------------
printSectionHeader('EDGE CASES');

// Test 7.1: Symbol properties are NOT included (we only handle string keys)
const withSymbol = { normal: 'value' };
const sym = Symbol('test');
withSymbol[sym] = 'symbol value';
const symResult = categorizeProperties(withSymbol);
assertArraysEqual(symResult.own, ['normal'], 'Symbol properties not included in enumeration');

// Test 7.2: Deep prototype chain
const level1 = { l1: 'one' };
const level2 = Object.create(level1);
level2.l2 = 'two';
const level3 = Object.create(level2);
level3.l3 = 'three';

const deepResult = categorizeProperties(level3);
assertArraysEqual(deepResult.own, ['l3'], 'Deep chain - correct own');
assertArraysEqual(deepResult.inherited, ['l2', 'l1'], 'Deep chain - all inherited');


// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
