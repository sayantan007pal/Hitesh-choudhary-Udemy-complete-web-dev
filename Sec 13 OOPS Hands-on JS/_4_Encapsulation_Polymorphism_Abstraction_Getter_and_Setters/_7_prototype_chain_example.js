/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              PROTOTYPE CHAIN IN JAVASCRIPT - CHALLENGE #7                    ║
 * ║                     🔗 Deep Dive into Prototypes 🔗                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT REVIEW:
 * ━━━━━━━━━━━━━━━━━━━
 * "Prototypal Chaining is how JavaScript searches for properties/methods - 
 *  it starts at the object, then climbs UP through parent objects (prototypes) 
 *  until it finds what it's looking for or reaches the end (null)."
 * 
 * Key Methods:
 *   - Object.getPrototypeOf(obj) → Get an object's prototype
 *   - Object.setPrototypeOf(obj, proto) → Set an object's prototype
 *   - Object.create(proto) → Create object with given prototype
 *   - obj.hasOwnProperty(prop) → Check if property is on obj itself
 *   - obj instanceof Constructor → Check if obj is in the chain
 * 
 * 
 * 🎯 YOUR CHALLENGE:
 * ━━━━━━━━━━━━━━━━━━━
 * 
 * PART 1: Prototype Chain with Object.create()
 * Create a prototype chain WITHOUT using classes:
 * 
 * 1. animal (base object)
 *    - eats: true
 *    - breathes: true
 *    - eat() → returns "Animal is eating"
 *    - breathe() → returns "Animal is breathing"
 * 
 * 2. mammal (prototype: animal)
 *    - hasHair: true
 *    - warmBlooded: true
 *    - nurse() → returns "Mammal is nursing"
 * 
 * 3. dog (prototype: mammal)
 *    - breed: 'Unknown'
 *    - bark() → returns "Woof!"
 *    - wagTail() → returns "Dog is wagging tail"
 * 
 * 4. createDog(name, breed) - Factory function
 *    - Creates a dog object with given name and breed
 *    - Prototype should be 'dog'
 *    - Should have greet() → returns "{name} says woof!"
 * 
 * 
 * PART 2: Constructor Functions with Prototype
 * Create a Vehicle hierarchy using constructor functions:
 * 
 * 1. Vehicle(brand, model)
 *    - Vehicle.prototype.start() → returns "{brand} {model} started"
 *    - Vehicle.prototype.stop() → returns "{brand} {model} stopped"
 *    - Vehicle.prototype.describe() → returns "Vehicle: {brand} {model}"
 * 
 * 2. Car(brand, model, doors) - inherits from Vehicle
 *    - Car.prototype.honk() → returns "Beep beep!"
 *    - Car.prototype.describe() → Override: "Car: {brand} {model} with {doors} doors"
 * 
 * 
 * PART 3: Exploring the Prototype Chain
 * Create utility functions:
 * 
 * 1. getPrototypeChain(obj) → returns array of all prototypes up to null
 * 2. getAllProperties(obj) → returns array of ALL properties (own + inherited)
 * 3. getOwnProperties(obj) → returns array of only OWN properties
 * 4. findPropertyOrigin(obj, prop) → returns the object where prop is defined
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━━
 * - Object.create(proto) creates object with proto as its [[Prototype]]
 * - Constructor.prototype is what instances inherit from
 * - Use Object.getPrototypeOf() to traverse the chain
 * - for...in loops over own AND inherited enumerable properties
 * - Object.keys() only gets own enumerable properties
 */


// =============================================================================
// PART 1: Prototype Chain with Object.create()
// =============================================================================

// Base prototype
const animal = {
    // ==================== YOUR CODE HERE ====================
    eats: true,
    breathes: true,
    eat() {
        return 'Animal is eating';
    },
    breathe() {
        return 'Animal is breathing';
    }
    // ========================================================
};

// Mammal inherits from animal
const mammal = Object.create(animal);
// ==================== YOUR CODE HERE ====================
mammal.hasHair = true;
mammal.warmBlooded = true;
mammal.nurse = function() {
    return 'Mammal is nursing';
};
// ========================================================

// Dog inherits from mammal
const dog = Object.create(mammal);
// ==================== YOUR CODE HERE ====================
dog.breed = 'Unknown';
dog.bark = function() {
    return 'Woof!';
};
dog.wagTail = function() {
    return 'Dog is wagging tail';
};
// ========================================================

// Factory function to create specific dogs
function createDog(name, breed) {
    // ==================== YOUR CODE HERE ====================
    const newDog = Object.create(dog);
    newDog.name = name;
    newDog.breed = breed;
    newDog.greet = function() {
        return `${this.name} says woof!`;
    };
    return newDog;
    // ========================================================
}


// =============================================================================
// PART 2: Constructor Functions with Prototype
// =============================================================================

function Vehicle(brand, model) {
    // ==================== YOUR CODE HERE ====================
    this.brand = brand;
    this.model = model;
    // ========================================================
}

// Add methods to Vehicle.prototype
// ==================== YOUR CODE HERE ====================
Vehicle.prototype.start = function() {
    return `${this.brand} ${this.model} started`;
};

Vehicle.prototype.stop = function() {
    return `${this.brand} ${this.model} stopped`;
};

Vehicle.prototype.describe = function() {
    return `Vehicle: ${this.brand} ${this.model}`;
};
// ========================================================


function Car(brand, model, doors) {
    // ==================== YOUR CODE HERE ====================
    // Call parent constructor
    Vehicle.call(this, brand, model);
    this.doors = doors;
    // ========================================================
}

// Set up prototype chain: Car.prototype -> Vehicle.prototype
// ==================== YOUR CODE HERE ====================
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.honk = function() {
    return 'Beep beep!';
};

Car.prototype.describe = function() {
    return `Car: ${this.brand} ${this.model} with ${this.doors} doors`;
};
// ========================================================


// =============================================================================
// PART 3: Prototype Chain Utilities
// =============================================================================

function getPrototypeChain(obj) {
    // ==================== YOUR CODE HERE ====================
    // Returns array of all prototypes from obj up to (but not including) null
    const chain = [];
    let current = Object.getPrototypeOf(obj);
    while (current !== null) {
        chain.push(current);
        current = Object.getPrototypeOf(current);
    }
    return chain;
    // ========================================================
}

function getAllProperties(obj) {
    // ==================== YOUR CODE HERE ====================
    // Returns array of ALL property names (own + inherited)
    const props = new Set();
    for (let prop in obj) {
        props.add(prop);
    }
    return Array.from(props);
    // ========================================================
}

function getOwnProperties(obj) {
    // ==================== YOUR CODE HERE ====================
    // Returns array of only OWN property names
    return Object.keys(obj);
    // ========================================================
}

function findPropertyOrigin(obj, prop) {
    // ==================== YOUR CODE HERE ====================
    // Returns the object in the chain where the property is defined
    // Returns null if not found
    let current = obj;
    while (current !== null) {
        if (current.hasOwnProperty(prop)) {
            return current;
        }
        current = Object.getPrototypeOf(current);
    }
    return null;
    // ========================================================
}


// =============================================================================
// BONUS: Extend Built-in Prototypes (Use with Caution!)
// =============================================================================

// Add a method to all arrays
if (!Array.prototype.first) {
    Array.prototype.first = function() {
        return this.length > 0 ? this[0] : undefined;
    };
}

if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this.length > 0 ? this[this.length - 1] : undefined;
    };
}

// Add a method to all strings
if (!String.prototype.reverse) {
    String.prototype.reverse = function() {
        return this.split('').reverse().join('');
    };
}


// =============================================================================
// EXPORTS (Do not modify)
// =============================================================================
module.exports = {
    animal,
    mammal,
    dog,
    createDog,
    Vehicle,
    Car,
    getPrototypeChain,
    getAllProperties,
    getOwnProperties,
    findPropertyOrigin
};
