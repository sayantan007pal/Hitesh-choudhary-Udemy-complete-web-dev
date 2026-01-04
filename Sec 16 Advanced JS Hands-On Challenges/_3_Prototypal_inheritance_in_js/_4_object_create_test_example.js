/**
 * Test Suite for Object.create() Deep Dive
 * ==========================================
 * 
 * Run: node _4_object_create_test_example.js
 */

const {
    createLinkedList,
    createMixin,
    createObjectWithDescriptors
} = require('./_4_object_create_example.js');

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
    console.log('🧪 Running Object.create() Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // PART A: createLinkedList
    // =========================================================================
    console.log('\n📋 PART A: createLinkedList');
    console.log('-'.repeat(40));

    const list = createLinkedList();
    
    // Basic node creation
    let head = list.createNode(1);
    assertEqual(head.value, 1, 'Node stores value');
    assertEqual(head.next, null, 'Node next is initially null');
    
    // Prototype methods
    assertEqual(head.getValue(), 1, 'getValue() works');
    assertTrue(!head.hasNext(), 'hasNext() returns false for single node');
    
    // Append nodes
    head = list.append(head, 2);
    head = list.append(head, 3);
    
    assertTrue(head.hasNext(), 'hasNext() returns true after append');
    assertEqual(head.next.value, 2, 'Second node has correct value');
    
    // toArray
    assertEqual(list.toArray(head), [1, 2, 3], 'toArray converts list correctly');
    
    // find
    const found = list.find(head, 2);
    assertEqual(found.value, 2, 'find returns correct node');
    assertEqual(list.find(head, 999), null, 'find returns null for missing value');
    
    // Longer list
    head = list.append(head, 4);
    head = list.append(head, 5);
    assertEqual(list.toArray(head), [1, 2, 3, 4, 5], 'Multiple appends work');
    
    // Edge case: single node list
    const single = list.createNode(42);
    assertEqual(list.toArray(single), [42], 'Single node toArray works');
    assertEqual(list.find(single, 42).value, 42, 'Find in single node list');

    // =========================================================================
    // PART B: createMixin
    // =========================================================================
    console.log('\n📋 PART B: createMixin');
    console.log('-'.repeat(40));

    const mixin1 = createMixin({ a: 1, b: 2 }, { b: 3, c: 4 });
    assertEqual(mixin1.a, 1, 'First source property preserved');
    assertEqual(mixin1.b, 3, 'Later source overrides earlier');
    assertEqual(mixin1.c, 4, 'Second source property added');
    
    assertTrue(
        Object.getPrototypeOf(mixin1) === null,
        'Mixin has null prototype'
    );
    
    // Multiple sources
    const mixin2 = createMixin(
        { x: 1 },
        { y: 2 },
        { z: 3 },
        { x: 10 }  // Override first
    );
    assertEqual(mixin2.x, 10, 'Last source wins for x');
    assertEqual(mixin2.y, 2, 'Middle source preserved');
    assertEqual(mixin2.z, 3, 'Last source preserved');
    
    // Empty sources
    const emptyMixin = createMixin({}, { a: 1 }, {});
    assertEqual(emptyMixin.a, 1, 'Works with empty objects in chain');
    
    // No toString inherited (null prototype)
    assertTrue(
        !('toString' in mixin1),
        'No toString inherited from Object.prototype'
    );

    // =========================================================================
    // PART C: createObjectWithDescriptors
    // =========================================================================
    console.log('\n📋 PART C: createObjectWithDescriptors');
    console.log('-'.repeat(40));

    const base = { 
        greet() { return "Hello"; },
        farewell() { return "Goodbye"; }
    };
    
    const obj = createObjectWithDescriptors(base, {
        name: { value: "Test", writable: false },
        count: { value: 0, enumerable: false },
        mutable: { value: "can change", writable: true }
    });
    
    // Inheritance works
    assertEqual(obj.greet(), "Hello", 'Inherits methods from prototype');
    assertEqual(obj.farewell(), "Goodbye", 'Inherits all prototype methods');
    
    // Own properties work
    assertEqual(obj.name, "Test", 'Has own property: name');
    assertEqual(obj.count, 0, 'Has own property: count');
    
    // writable: false
    obj.name = "Changed";
    assertEqual(obj.name, "Test", 'Non-writable property cannot be changed');
    
    // writable: true
    obj.mutable = "new value";
    assertEqual(obj.mutable, "new value", 'Writable property can be changed');
    
    // enumerable: false
    assertTrue(
        !Object.keys(obj).includes('count'),
        'Non-enumerable property not in Object.keys'
    );
    
    // enumerable: true (defaults)
    assertTrue(
        Object.keys(obj).includes('name'),
        'Enumerable property appears in Object.keys'
    );
    
    // Null prototype test
    const nullProtoObj = createObjectWithDescriptors(null, {
        value: { value: 42 }
    });
    assertEqual(nullProtoObj.value, 42, 'Works with null prototype');
    assertTrue(
        Object.getPrototypeOf(nullProtoObj) === null,
        'Null prototype preserved'
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
