/**
 * Object.create() Deep Dive
 * ==========================
 * 
 * Understanding Object.create() for prototypal inheritance,
 * property descriptors, and creating objects with custom prototypes.
 */


// =============================================================================
// Task: Master Object.create() Patterns
// =============================================================================
/**
 * PART A: createLinkedList()
 * --------------------------
 * Create a function that returns a linked list node factory using Object.create().
 * 
 * The returned object should have methods:
 *   - createNode(value): Creates a node { value, next: null } with listNode as prototype
 *   - append(head, value): Adds new node at end, returns head
 *   - toArray(head): Converts linked list to array
 *   - find(head, value): Returns node with matching value or null
 * 
 * The listNode prototype should have:
 *   - getValue(): returns this.value
 *   - hasNext(): returns true if this.next exists
 * 
 * Example:
 *   const list = createLinkedList();
 *   let head = list.createNode(1);
 *   head = list.append(head, 2);
 *   head = list.append(head, 3);
 *   list.toArray(head);         // [1, 2, 3]
 *   head.getValue();            // 1
 *   head.hasNext();             // true
 *   list.find(head, 2).value;   // 2
 * 
 * 
 * PART B: createMixin(...sources)
 * -------------------------------
 * Create a function that takes multiple source objects and returns a new object
 * created with Object.create(null) that has all properties from all sources.
 * Later sources override earlier ones for conflicting keys.
 * 
 * Example:
 *   const mixin = createMixin(
 *     { a: 1, b: 2 },
 *     { b: 3, c: 4 }
 *   );
 *   // mixin = { a: 1, b: 3, c: 4 }
 *   // mixin has NO prototype (Object.create(null))
 * 
 * 
 * PART C: createObjectWithDescriptors(proto, props)
 * --------------------------------------------------
 * Create a function that uses Object.create with property descriptors.
 * 
 * props is an object where each key maps to { value, writable, enumerable }
 * Default values: writable: true, enumerable: true
 * 
 * Example:
 *   const base = { greet() { return "Hello"; } };
 *   const obj = createObjectWithDescriptors(base, {
 *     name: { value: "Test", writable: false },
 *     count: { value: 0, enumerable: false }
 *   });
 *   obj.greet();                    // "Hello" (inherited)
 *   obj.name = "Changed";           // Won't work, writable: false
 *   Object.keys(obj);               // [] (count not enumerable)
 */

function createLinkedList() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    
    // ========================================================
}

function createMixin(...sources) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}

function createObjectWithDescriptors(proto, props) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    // ========================================================
}


module.exports = {
    createLinkedList,
    createMixin,
    createObjectWithDescriptors
};
