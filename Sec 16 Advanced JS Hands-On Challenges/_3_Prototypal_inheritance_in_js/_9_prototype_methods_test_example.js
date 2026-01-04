/**
 * Test Suite for Prototype Methods
 * ==================================
 * 
 * Run: node _9_prototype_methods_test_example.js
 */

const {
    deepCloneWithPrototype,
    comparePrototypes,
    createPropertyProxy
} = require('./_9_prototype_methods_example.js');

let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
    }
}

function assertTrue(condition, testName) {
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
    }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Prototype Methods Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // PART A: deepCloneWithPrototype
    // =========================================================================
    console.log('\n📋 PART A: deepCloneWithPrototype');
    console.log('-'.repeat(40));

    // Basic cloning
    const simple = { a: 1, b: 2 };
    const simpleClone = deepCloneWithPrototype(simple);
    assertEqual(simpleClone.a, 1, 'Clones simple properties');
    assertTrue(simpleClone !== simple, 'Creates new object');

    // Prototype preservation
    const parent = { inherited: 'from parent' };
    const child = Object.create(parent);
    child.own = 'own property';
    
    const childClone = deepCloneWithPrototype(child);
    assertEqual(childClone.own, 'own property', 'Clones own properties');
    assertEqual(childClone.inherited, 'from parent', 'Preserves prototype chain');
    assertTrue(
        Object.getPrototypeOf(childClone) === parent,
        'Prototype is same object'
    );

    // Non-enumerable properties
    const withHidden = { visible: 'yes' };
    Object.defineProperty(withHidden, 'hidden', { 
        value: 'secret', 
        enumerable: false,
        writable: true 
    });
    
    const hiddenClone = deepCloneWithPrototype(withHidden);
    assertEqual(hiddenClone.hidden, 'secret', 'Clones non-enumerable properties');
    assertTrue(
        !Object.keys(hiddenClone).includes('hidden'),
        'Preserves enumerable: false'
    );

    // Deep nested objects
    const nested = {
        level1: {
            level2: {
                value: 'deep'
            }
        }
    };
    const nestedClone = deepCloneWithPrototype(nested);
    assertEqual(nestedClone.level1.level2.value, 'deep', 'Deep clone works');
    nestedClone.level1.level2.value = 'modified';
    assertEqual(nested.level1.level2.value, 'deep', 'Mutation does not affect original');

    // Array cloning
    const arr = [1, [2, 3], { a: 4 }];
    const arrClone = deepCloneWithPrototype(arr);
    assertTrue(Array.isArray(arrClone), 'Arrays stay as arrays');
    assertEqual(arrClone[1][0], 2, 'Nested array values preserved');
    arrClone[1].push(99);
    assertEqual(arr[1].length, 2, 'Original array not affected');

    // Primitives returned as-is
    assertEqual(deepCloneWithPrototype(5), 5, 'Numbers returned as-is');
    assertEqual(deepCloneWithPrototype('str'), 'str', 'Strings returned as-is');
    assertEqual(deepCloneWithPrototype(null), null, 'null returned as-is');

    // =========================================================================
    // PART B: comparePrototypes
    // =========================================================================
    console.log('\n📋 PART B: comparePrototypes');
    console.log('-'.repeat(40));

    // Same prototype (arrays)
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const arrComparison = comparePrototypes(arr1, arr2);
    
    assertTrue(arrComparison.samePrototype, 'Arrays have same prototype');
    assertTrue(
        arrComparison.commonAncestor === Array.prototype,
        'Common ancestor is Array.prototype'
    );
    assertEqual(arrComparison.chain1Length, 2, 'Array chain length is 2');
    assertTrue(
        arrComparison.sharedMethods.includes('push'),
        'Shared methods includes push'
    );

    // Different prototypes, common ancestor
    const customParent = { sharedMethod: () => {} };
    const child1 = Object.create(customParent);
    const child2 = Object.create(customParent);
    
    const siblingComparison = comparePrototypes(child1, child2);
    assertTrue(siblingComparison.samePrototype, 'Siblings have same prototype');
    assertTrue(
        siblingComparison.commonAncestor === customParent,
        'Common ancestor found'
    );

    // Plain objects
    const plain1 = { x: 1 };
    const plain2 = { y: 2 };
    const plainComparison = comparePrototypes(plain1, plain2);
    
    assertTrue(plainComparison.samePrototype, 'Plain objects share Object.prototype');
    assertEqual(plainComparison.chain1Length, 1, 'Plain object chain length');

    // =========================================================================
    // PART C: createPropertyProxy
    // =========================================================================
    console.log('\n📋 PART C: createPropertyProxy');
    console.log('-'.repeat(40));

    const target = { a: 1, b: 2 };
    const proxy = createPropertyProxy(target);

    // Basic get
    assertEqual(proxy.get('a'), 1, 'Get returns correct value');
    assertEqual(proxy.get('b'), 2, 'Get works for different properties');

    // Set
    proxy.set('a', 100);
    assertEqual(proxy.get('a'), 100, 'Set updates value');
    assertEqual(target.a, 100, 'Set affects original target');

    // Access counting
    proxy.get('a');
    proxy.get('a');
    assertEqual(proxy.getAccessCount('a'), 4, 'Access count tracks all accesses');
    assertEqual(proxy.getAccessCount('b'), 1, 'Separate count per property');

    // Access log
    const log = proxy.getAccessLog();
    assertTrue(log.length >= 5, 'Log contains all accesses');
    assertTrue(log[0].hasOwnProperty('action'), 'Log entry has action');
    assertTrue(log[0].hasOwnProperty('property'), 'Log entry has property');
    assertTrue(log[0].hasOwnProperty('timestamp'), 'Log entry has timestamp');

    // Clear log
    proxy.clearLog();
    assertEqual(proxy.getAccessLog().length, 0, 'Clear log works');
    assertEqual(proxy.getAccessCount('a'), 0, 'Clear resets counts');

    // Non-existent property
    assertEqual(proxy.get('nonExistent'), undefined, 'Get undefined property');

    // Prototype chain access
    const protoTarget = Object.create({ inherited: 'from proto' });
    protoTarget.own = 'own';
    const protoProxy = createPropertyProxy(protoTarget);
    
    assertEqual(
        protoProxy.get('inherited'), 
        'from proto', 
        'Get works with prototype chain'
    );

    // =========================================================================
    // Final Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${testsPassed + testsFailed}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
