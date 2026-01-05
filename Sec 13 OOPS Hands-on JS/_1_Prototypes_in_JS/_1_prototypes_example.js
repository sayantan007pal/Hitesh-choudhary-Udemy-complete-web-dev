/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES CHALLENGE 1                                    ║
 * ║                 🔗 Prototype Chaining with Constructor Functions 🔗          ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * Prototype chaining allows objects to inherit properties and methods from other
 * objects. When using constructor functions, we can set up inheritance by linking
 * the prototype of one constructor to an instance of another.
 * 
 * 🎯 TASK: Prototype Chaining with Constructor Functions
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a constructor function `Animal` that:
 *    - Takes a `name` parameter and assigns it to `this.name`
 *    - Has a method `speak()` on its prototype that returns 'Animal speaking'
 * 
 * 2. Create a constructor function `Dog` that:
 *    - Takes `name` and `breed` parameters
 *    - Calls `Animal` constructor using `call()` to inherit the name property
 *    - Assigns `breed` to `this.breed`
 *    - Inherits from `Animal` using prototype chaining
 *    - Has a method `bark()` on its prototype that returns 'Woof!'
 * 
 * 3. Create a constructor function `Cat` that:
 *    - Takes `name` and `color` parameters
 *    - Calls `Animal` constructor using `call()` to inherit the name property
 *    - Assigns `color` to `this.color`
 *    - Inherits from `Animal` using prototype chaining
 *    - Has a method `meow()` on its prototype that returns 'Meow!'
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - Dog and Cat must properly inherit from Animal
 * - Dog instances must be able to call both bark() and speak()
 * - Cat instances must be able to call both meow() and speak()
 * - The prototype chain must be: Dog/Cat → Animal.prototype → Object.prototype → null
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - Use `ChildConstructor.prototype = Object.create(ParentConstructor.prototype)`
 * - Don't forget to reset the constructor property after setting prototype
 * - Use `ParentConstructor.call(this, args)` to call parent constructor
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

// Animal Constructor
function Animal(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Animal prototype method
// ==================== YOUR CODE HERE ====================


// ========================================================

// Dog Constructor (inherits from Animal)
function Dog(name, breed) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Set up Dog prototype chain
// ==================== YOUR CODE HERE ====================


// ========================================================

// Dog prototype method
// ==================== YOUR CODE HERE ====================


// ========================================================

// Cat Constructor (inherits from Animal)
function Cat(name, color) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Set up Cat prototype chain
// ==================== YOUR CODE HERE ====================


// ========================================================

// Cat prototype method
// ==================== YOUR CODE HERE ====================


// ========================================================


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    Animal,
    Dog,
    Cat
};