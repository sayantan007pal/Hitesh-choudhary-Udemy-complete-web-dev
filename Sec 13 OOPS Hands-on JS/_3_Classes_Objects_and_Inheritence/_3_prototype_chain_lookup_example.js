/**
 * Prototype Chain and Property Lookup
 * ====================================
 * 
 * This challenge tests your deep understanding of the prototype chain,
 * how JavaScript looks up properties, and how to manipulate prototypes.
 * 
 * 🎯 INTERVIEW IMPORTANCE: VERY HIGH
 * This is the core of JavaScript's inheritance model!
 */


// =============================================================================
// Task 1: Building a Prototype Chain Manually
// =============================================================================
/**
 * Create a prototype chain WITHOUT using classes or constructor functions.
 * 
 * Requirements:
 * 1. Create an object `animal` with:
 *    - Property: `isAlive` = true
 *    - Method: `breathe()` returns "Breathing..."
 *    - Method: `eat(food)` returns "[food] is delicious!"
 * 
 * 2. Create an object `dog` that inherits from `animal`:
 *    - Use Object.create() to set up inheritance
 *    - Property: `species` = "Canine"
 *    - Method: `bark()` returns "Woof! Woof!"
 *    - Method: `fetch(item)` returns "Fetched the [item]!"
 * 
 * 3. Create an object `goldenRetriever` that inherits from `dog`:
 *    - Property: `breed` = "Golden Retriever"
 *    - Property: `color` = "Golden"
 *    - Method: `swim()` returns "Golden Retriever loves swimming!"
 * 
 * The chain should be: goldenRetriever → dog → animal → Object.prototype → null
 * 
 * Expected Usage:
 *   goldenRetriever.breed;       // "Golden Retriever"
 *   goldenRetriever.species;     // "Canine" (from dog)
 *   goldenRetriever.isAlive;     // true (from animal)
 *   goldenRetriever.bark();      // "Woof! Woof!" (from dog)
 *   goldenRetriever.breathe();   // "Breathing..." (from animal)
 *   goldenRetriever.toString();  // Works! (from Object.prototype)
 */

// ==================== YOUR CODE HERE ====================

const animal = {
    // TODO: Add isAlive property
    
    // TODO: Add breathe() method
    
    // TODO: Add eat(food) method
};

const dog = Object.create(/* TODO: what should dog inherit from? */);
// TODO: Add species property to dog
// TODO: Add bark() method to dog
// TODO: Add fetch(item) method to dog

const goldenRetriever = Object.create(/* TODO: what should goldenRetriever inherit from? */);
// TODO: Add breed property
// TODO: Add color property
// TODO: Add swim() method

// ========================================================


// =============================================================================
// Task 2: Understanding Property Shadowing
// =============================================================================
/**
 * Property shadowing occurs when an object has a property with the same name
 * as one in its prototype chain. The object's own property "shadows" the inherited one.
 * 
 * Create a function `createShadowExample()` that:
 * 1. Creates a parent object with property `name` = "Parent"
 * 2. Creates a child object that inherits from parent
 * 3. The child should initially NOT have its own `name` property
 * 4. Returns an object with methods to demonstrate shadowing:
 *    - `getChildName()`: returns child.name
 *    - `setChildName(name)`: sets child.name (creating own property)
 *    - `deleteChildName()`: deletes child's own name property
 *    - `hasOwnName()`: returns true if child has its OWN name property
 *    - `getParentName()`: returns parent.name directly
 * 
 * Expected Usage:
 *   const example = createShadowExample();
 *   example.getChildName();     // "Parent" (inherited)
 *   example.hasOwnName();       // false
 *   example.setChildName("Child");
 *   example.getChildName();     // "Child" (own property - shadows parent)
 *   example.hasOwnName();       // true
 *   example.getParentName();    // "Parent" (parent unchanged)
 *   example.deleteChildName();
 *   example.getChildName();     // "Parent" (back to inherited)
 *   example.hasOwnName();       // false
 */

// ==================== YOUR CODE HERE ====================

function createShadowExample() {
    // TODO: Create parent object with name = "Parent"
    
    // TODO: Create child that inherits from parent
    
    // TODO: Return object with the required methods
    return {
        getChildName: function() { /* TODO */ },
        setChildName: function(name) { /* TODO */ },
        deleteChildName: function() { /* TODO */ },
        hasOwnName: function() { /* TODO */ },
        getParentName: function() { /* TODO */ }
    };
}

// ========================================================


// =============================================================================
// Task 3: Prototype Chain Lookup Function
// =============================================================================
/**
 * Create a function `findPropertyInChain(obj, propertyName)` that:
 * - Searches for a property through the entire prototype chain
 * - Returns an object with:
 *   - `found`: boolean - whether the property exists
 *   - `value`: the property value (or undefined if not found)
 *   - `owner`: the object in the chain that actually HAS the property (or null)
 *   - `chainDepth`: how many levels up the chain (0 = own property, 1 = parent, etc.)
 * 
 * This helps visualize how JS searches up the prototype chain!
 * 
 * Expected Usage:
 *   const grandparent = { family: "Smith" };
 *   const parent = Object.create(grandparent);
 *   parent.job = "Engineer";
 *   const child = Object.create(parent);
 *   child.name = "John";
 *   
 *   findPropertyInChain(child, "name");
 *   // { found: true, value: "John", owner: child, chainDepth: 0 }
 *   
 *   findPropertyInChain(child, "job");
 *   // { found: true, value: "Engineer", owner: parent, chainDepth: 1 }
 *   
 *   findPropertyInChain(child, "family");
 *   // { found: true, value: "Smith", owner: grandparent, chainDepth: 2 }
 *   
 *   findPropertyInChain(child, "nonexistent");
 *   // { found: false, value: undefined, owner: null, chainDepth: -1 }
 */

// ==================== YOUR CODE HERE ====================

function findPropertyInChain(obj, propertyName) {
    // TODO: Walk up the prototype chain
    // Use Object.getPrototypeOf() to get parent
    // Use hasOwnProperty() to check if property is on current object
    // Track the depth as you go up
    
    // Return the result object
}

// ========================================================


// =============================================================================
// Task 4: Extending Built-in Prototypes
// =============================================================================
/**
 * Add custom methods to built-in prototypes (use with caution in real code!).
 * This is great for understanding how prototypes work.
 * 
 * Requirements:
 * 1. Add to Array.prototype:
 *    - `first()`: returns the first element
 *    - `last()`: returns the last element
 *    - `isEmpty()`: returns true if array is empty
 * 
 * 2. Add to String.prototype:
 *    - `reverse()`: returns the string reversed
 *    - `isPalindrome()`: returns true if string is same forward and backward
 *      (ignore case and spaces)
 * 
 * Expected Usage:
 *   [1, 2, 3].first();        // 1
 *   [1, 2, 3].last();         // 3
 *   [].isEmpty();             // true
 *   [1].isEmpty();            // false
 *   
 *   "hello".reverse();        // "olleh"
 *   "racecar".isPalindrome(); // true
 *   "Race Car".isPalindrome(); // true (ignore case/spaces)
 *   "hello".isPalindrome();   // false
 */

// ==================== YOUR CODE HERE ====================

// Add methods to Array.prototype
Array.prototype.first = function() {
    // TODO: Return first element
};

Array.prototype.last = function() {
    // TODO: Return last element
};

Array.prototype.isEmpty = function() {
    // TODO: Return true if empty
};

// Add methods to String.prototype
String.prototype.reverse = function() {
    // TODO: Return reversed string
};

String.prototype.isPalindrome = function() {
    // TODO: Check if palindrome (ignore case and spaces)
};

// ========================================================


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    animal,
    dog,
    goldenRetriever,
    createShadowExample,
    findPropertyInChain
    // Note: Array and String prototype methods are added globally
};


// =============================================================================
// 📚 LEARNING NOTES
// =============================================================================
/**
 * PROTOTYPE CHAIN VISUALIZATION:
 * =============================
 * 
 *   goldenRetriever
 *         │
 *         ▼ Object.getPrototypeOf()
 *        dog
 *         │
 *         ▼
 *       animal
 *         │
 *         ▼
 *   Object.prototype  (has toString, hasOwnProperty, etc.)
 *         │
 *         ▼
 *        null  (end of chain)
 * 
 * 
 * PROPERTY LOOKUP ALGORITHM:
 * =========================
 * When you access obj.property:
 * 1. Check if obj has OWN property → return it
 * 2. If not, go to obj's prototype
 * 3. Check if prototype has it → return it
 * 4. If not, go to prototype's prototype
 * 5. Repeat until reaching null
 * 6. If reached null → return undefined
 * 
 * 
 * OBJECT.CREATE VS NEW:
 * ====================
 * 
 * Object.create(proto):
 * - Creates new object with [[Prototype]] = proto
 * - No constructor function needed
 * - Clean way to set up prototype chain
 * 
 * new Constructor():
 * - Creates new object with [[Prototype]] = Constructor.prototype
 * - Runs constructor function with 'this' = new object
 * - More traditional OOP style
 * 
 * 
 * INTERVIEW TIP:
 * =============
 * "JavaScript uses prototypal inheritance, not classical inheritance.
 *  Objects inherit directly from other objects through the prototype chain.
 *  When a property isn't found on an object, JS looks up the chain until
 *  it finds it or reaches null."
 */
