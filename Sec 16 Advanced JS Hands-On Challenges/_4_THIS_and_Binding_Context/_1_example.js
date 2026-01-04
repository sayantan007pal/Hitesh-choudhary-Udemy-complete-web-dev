/**
 * THIS and Binding Context in JavaScript
 * ========================================
 * 
 * The 'this' keyword in JavaScript refers to the object that is executing
 * the current function. Its value depends on how the function is called.
 * 
 * bind(), call(), and apply() allow you to explicitly set the 'this' context.
 */


// =============================================================================
// Task 1: Bind the Correct Context
// =============================================================================
/**
 * Create an object 'person' with:
 *   - A property 'name'
 *   - A method introduce() that returns "Hi, I'm [name]"
 * 
 * Use the bind() method to ensure the method works correctly when passed
 * to another function.
 * 
 * Example:
 *   const person = { name: "Alice", introduce: function() { ... } };
 *   const boundIntroduce = person.introduce.bind(person);
 *   
 *   // This should work even when passed around:
 *   const fn = boundIntroduce;
 *   console.log(fn()); // "Hi, I'm Alice"
 * 
 * Create:
 *   1. A 'person' object with name "Alice" and introduce method
 *   2. Export a bound version called 'boundIntroduce'
 */

const person = {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
};

// Create a bound version of the introduce method
// ==================== YOUR CODE HERE ====================
const boundIntroduce = undefined; // Replace with: person.introduce.bind(person)


// ========================================================


// =============================================================================
// Task 2: Using call() to Invoke a Function with Different Contexts
// =============================================================================
/**
 * Write a function introduce() that uses the 'this' keyword to introduce
 * a person by name. The function should return "Hello, my name is [this.name]".
 * 
 * Then, use call() to invoke introduce() with different contexts (objects).
 * 
 * Example Usage:
 *   const person1 = { name: "Bob" };
 *   const person2 = { name: "Charlie" };
 *   
 *   console.log(introduce.call(person1)); // "Hello, my name is Bob"
 *   console.log(introduce.call(person2)); // "Hello, my name is Charlie"
 */

function introduce() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Using apply() to Pass Arguments with Context
// =============================================================================
/**
 * Create a function sum(a, b) that:
 *   - Takes two numbers as arguments
 *   - Uses 'this.multiplier' to multiply the sum
 *   - Returns: (a + b) * this.multiplier
 * 
 * Then, invoke sum() with different contexts using apply(),
 * passing the numbers as an array.
 * 
 * Example Usage:
 *   const context1 = { multiplier: 2 };
 *   const context2 = { multiplier: 3 };
 *   
 *   console.log(sum.apply(context1, [5, 3])); // (5 + 3) * 2 = 16
 *   console.log(sum.apply(context2, [5, 3])); // (5 + 3) * 3 = 24
 */

function sum(a, b) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    person,
    boundIntroduce,
    introduce,
    sum
};