/**
 * instanceof and Prototype Checking
 * ==================================
 * 
 * This challenge tests your understanding of instanceof operator,
 * prototype checking methods, and type determination in JavaScript.
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 * Understanding type checking and prototype chains is essential!
 */


// =============================================================================
// Task 1: instanceof Operator Deep Dive
// =============================================================================
/**
 * Create a class hierarchy and demonstrate instanceof behavior:
 * 
 * Classes:
 * 1. Vehicle (base)
 *    - Properties: brand, year
 *    
 * 2. Car extends Vehicle
 *    - Additional: numDoors
 *    
 * 3. ElectricCar extends Car
 *    - Additional: batteryCapacity
 *    
 * 4. Motorcycle extends Vehicle
 *    - Additional: engineCC
 *    
 * 5. Bicycle (NOT extending Vehicle - standalone!)
 *    - Properties: brand, gears
 * 
 * Create a function `classifyVehicle(obj)` that returns:
 * - "ElectricCar" if obj instanceof ElectricCar
 * - "Car" if obj instanceof Car (but not ElectricCar)
 * - "Motorcycle" if obj instanceof Motorcycle
 * - "Vehicle" if obj instanceof Vehicle (but not Car or Motorcycle)
 * - "Bicycle" if obj instanceof Bicycle
 * - "Unknown" otherwise
 * 
 * Create a function `getInheritanceChain(obj)` that returns:
 * - Array of constructor names in the prototype chain
 * - e.g., ElectricCar → ["ElectricCar", "Car", "Vehicle", "Object"]
 * 
 * Expected Usage:
 *   const tesla = new ElectricCar("Tesla", 2023, 4, 100);
 *   tesla instanceof ElectricCar;  // true
 *   tesla instanceof Car;          // true
 *   tesla instanceof Vehicle;      // true
 *   tesla instanceof Motorcycle;   // false
 *   classifyVehicle(tesla);        // "ElectricCar"
 *   getInheritanceChain(tesla);    // ["ElectricCar", "Car", "Vehicle", "Object"]
 */

// ==================== YOUR CODE HERE ====================

class Vehicle {
    // TODO: Implement
}

class Car extends Vehicle {
    // TODO: Implement
}

class ElectricCar extends Car {
    // TODO: Implement
}

class Motorcycle extends Vehicle {
    // TODO: Implement
}

class Bicycle {
    // TODO: Implement (standalone, no extends)
}

function classifyVehicle(obj) {
    // TODO: Use instanceof to classify
    // Note: Check most specific types FIRST!
}

function getInheritanceChain(obj) {
    // TODO: Walk up prototype chain and collect constructor names
}

// ========================================================


// =============================================================================
// Task 2: isPrototypeOf and Object.getPrototypeOf
// =============================================================================
/**
 * Create utilities for prototype inspection:
 * 
 * Function `checkPrototypeRelationship(parent, child)`:
 * - Uses isPrototypeOf to check if parent.prototype is in child's chain
 * - Returns { isAncestor: boolean, depth: number }
 * - depth = how many levels up (0 if not ancestor)
 * 
 * Function `getPrototypeHierarchy(obj)`:
 * - Returns array of all prototypes from obj to Object.prototype
 * - Each item: { constructor: "Name", methods: [...methodNames] }
 * 
 * Function `findCommonAncestor(obj1, obj2)`:
 * - Returns the first common prototype constructor name
 * - Returns "Object" if only Object.prototype is common
 * - Returns null if no common ancestor (shouldn't happen normally)
 * 
 * Expected Usage:
 *   const tesla = new ElectricCar("Tesla", 2023, 4, 100);
 *   checkPrototypeRelationship(Vehicle, tesla);
 *   // { isAncestor: true, depth: 2 }
 *   
 *   const bike = new Motorcycle("Honda", 2022, 600);
 *   findCommonAncestor(tesla, bike);  // "Vehicle"
 *   
 *   const bicycle = new Bicycle("Trek", 21);
 *   findCommonAncestor(tesla, bicycle);  // "Object"
 */

// ==================== YOUR CODE HERE ====================

function checkPrototypeRelationship(ParentClass, childInstance) {
    // TODO: Check if ParentClass.prototype is in child's prototype chain
    // Return { isAncestor: boolean, depth: number }
}

function getPrototypeHierarchy(obj) {
    // TODO: Walk prototype chain
    // Return array of { constructor, methods }
}

function findCommonAncestor(obj1, obj2) {
    // TODO: Find first common constructor in both chains
}

// ========================================================


// =============================================================================
// Task 3: Custom instanceof Implementation
// =============================================================================
/**
 * Create your own instanceof implementation:
 * 
 * Function `customInstanceof(obj, Constructor)`:
 * - Returns true if Constructor.prototype is in obj's prototype chain
 * - Should work exactly like the instanceof operator
 * - Do NOT use the instanceof operator!
 * - Use Object.getPrototypeOf to walk the chain
 * 
 * Function `implementsInterface(obj, interfaceSpec)`:
 * - interfaceSpec is an object: { methods: [...], properties: [...] }
 * - Returns true if obj has all specified methods and properties
 * - This is "duck typing" verification
 * 
 * Function `getType(value)`:
 * - Returns detailed type information for any value
 * - For primitives: "number", "string", "boolean", "undefined", "null", "symbol", "bigint"
 * - For functions: "function"
 * - For arrays: "array"
 * - For objects: constructor name or "object"
 * - For class instances: the class name
 * 
 * Expected Usage:
 *   const tesla = new ElectricCar("Tesla", 2023, 4, 100);
 *   customInstanceof(tesla, ElectricCar);  // true
 *   customInstanceof(tesla, Car);          // true
 *   customInstanceof(tesla, Vehicle);      // true
 *   customInstanceof(tesla, Bicycle);      // false
 *   customInstanceof(tesla, Object);       // true
 *   
 *   implementsInterface({ log: () => {}, save: () => {} }, 
 *       { methods: ["log", "save"], properties: [] });  // true
 *   
 *   getType(42);           // "number"
 *   getType([1, 2, 3]);    // "array"
 *   getType(tesla);        // "ElectricCar"
 *   getType(null);         // "null"
 */

// ==================== YOUR CODE HERE ====================

function customInstanceof(obj, Constructor) {
    // TODO: Implement instanceof without using instanceof
    // Hint: Walk up prototype chain using Object.getPrototypeOf
}

function implementsInterface(obj, interfaceSpec) {
    // TODO: Check if obj has all required methods and properties
    // interfaceSpec = { methods: [...], properties: [...] }
}

function getType(value) {
    // TODO: Return detailed type string for any value
}

// ========================================================


// =============================================================================
// Task 4: Symbol.hasInstance - Custom instanceof Behavior
// =============================================================================
/**
 * Create classes that customize instanceof behavior using Symbol.hasInstance:
 * 
 * 1. Class `EvenNumber`:
 *    - Has static [Symbol.hasInstance](value) method
 *    - Returns true if value is an even number
 *    - Usage: 4 instanceof EvenNumber → true
 *             5 instanceof EvenNumber → false
 * 
 * 2. Class `ArrayLike`:
 *    - Returns true for arrays AND objects with length property and numeric indices
 *    - Usage: [1,2] instanceof ArrayLike → true
 *             {0: "a", 1: "b", length: 2} instanceof ArrayLike → true
 *             {} instanceof ArrayLike → false
 * 
 * 3. Class `Truthy`:
 *    - Returns true if value is truthy
 *    - Usage: 1 instanceof Truthy → true
 *             "" instanceof Truthy → false
 *             {} instanceof Truthy → true
 * 
 * 4. Class `InRange`:
 *    - Constructor takes (min, max)
 *    - Instance [Symbol.hasInstance] checks if value is in range
 *    - Usage: const range = new InRange(1, 10);
 *             5 instanceof InRange → won't work (need static)
 *    - Create static factory: InRange.between(1, 10) returns checker class
 *    - Usage: 5 instanceof InRange.between(1, 10) → true
 * 
 * Expected Usage:
 *   4 instanceof EvenNumber;          // true
 *   5 instanceof EvenNumber;          // false
 *   
 *   [1,2,3] instanceof ArrayLike;     // true
 *   "hello" instanceof ArrayLike;     // true (strings are array-like!)
 *   
 *   "hello" instanceof Truthy;        // true
 *   0 instanceof Truthy;              // false
 *   
 *   const RangeTen = InRange.between(1, 10);
 *   5 instanceof RangeTen;            // true
 *   15 instanceof RangeTen;           // false
 */

// ==================== YOUR CODE HERE ====================

class EvenNumber {
    // TODO: Static [Symbol.hasInstance](value)
}

class ArrayLike {
    // TODO: Static [Symbol.hasInstance](value)
}

class Truthy {
    // TODO: Static [Symbol.hasInstance](value)
}

class InRange {
    // TODO: Constructor and static between(min, max) factory
    
    // Static factory that returns a class with custom [Symbol.hasInstance]
    static between(min, max) {
        // TODO: Return a class that checks if value is in range
    }
}

// ========================================================


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    // Task 1
    Vehicle,
    Car,
    ElectricCar,
    Motorcycle,
    Bicycle,
    classifyVehicle,
    getInheritanceChain,
    // Task 2
    checkPrototypeRelationship,
    getPrototypeHierarchy,
    findCommonAncestor,
    // Task 3
    customInstanceof,
    implementsInterface,
    getType,
    // Task 4
    EvenNumber,
    ArrayLike,
    Truthy,
    InRange
};


// =============================================================================
// 📚 LEARNING NOTES
// =============================================================================
/**
 * INSTANCEOF OPERATOR:
 * ===================
 * 
 * obj instanceof Constructor
 * → Checks if Constructor.prototype is in obj's prototype chain
 * 
 * const arr = [1, 2, 3];
 * arr instanceof Array;   // true
 * arr instanceof Object;  // true (Array inherits from Object)
 * arr instanceof String;  // false
 * 
 * 
 * HOW INSTANCEOF WORKS:
 * ====================
 * 
 * function customInstanceof(obj, Constructor) {
 *     let proto = Object.getPrototypeOf(obj);
 *     while (proto !== null) {
 *         if (proto === Constructor.prototype) return true;
 *         proto = Object.getPrototypeOf(proto);
 *     }
 *     return false;
 * }
 * 
 * 
 * PROTOTYPE CHECKING METHODS:
 * ==========================
 * 
 * Object.getPrototypeOf(obj)     // Returns obj's prototype
 * proto.isPrototypeOf(obj)       // Returns true if proto is in obj's chain
 * obj.hasOwnProperty(prop)       // Returns true if prop is own property
 * prop in obj                    // Returns true if prop exists (own or inherited)
 * 
 * 
 * INHERITANCE CHAIN EXAMPLE:
 * =========================
 * 
 * class Animal {}
 * class Dog extends Animal {}
 * 
 * const dog = new Dog();
 * 
 * Object.getPrototypeOf(dog)             → Dog.prototype
 * Object.getPrototypeOf(Dog.prototype)   → Animal.prototype
 * Object.getPrototypeOf(Animal.prototype)→ Object.prototype
 * Object.getPrototypeOf(Object.prototype)→ null
 * 
 * 
 * SYMBOL.HASINSTANCE:
 * ==================
 * 
 * class EvenNumber {
 *     static [Symbol.hasInstance](value) {
 *         return typeof value === 'number' && value % 2 === 0;
 *     }
 * }
 * 
 * 4 instanceof EvenNumber;  // true (calls EvenNumber[Symbol.hasInstance](4))
 * 5 instanceof EvenNumber;  // false
 * 
 * 
 * TYPE CHECKING BEST PRACTICES:
 * ============================
 * 
 * // For primitives:
 * typeof value === 'string'
 * typeof value === 'number'
 * 
 * // For arrays:
 * Array.isArray(value)
 * 
 * // For objects/classes:
 * value instanceof MyClass
 * 
 * // For null:
 * value === null
 * 
 * // For undefined:
 * value === undefined
 * 
 * // For any type:
 * Object.prototype.toString.call(value)
 * // → "[object Array]", "[object Object]", "[object Null]", etc.
 * 
 * 
 * INTERVIEW TIP:
 * =============
 * "The instanceof operator checks the prototype chain, not the constructor.
 *  It returns true if Constructor.prototype appears anywhere in the object's
 *  prototype chain. This can be customized using Symbol.hasInstance for
 *  special type-checking behavior. For reliable type checking:
 *  - Use typeof for primitives
 *  - Use Array.isArray for arrays
 *  - Use instanceof for class instances
 *  - Use Object.prototype.toString.call for the most reliable check"
 */
