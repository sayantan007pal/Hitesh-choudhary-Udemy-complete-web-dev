/**
 * The `new` Binding - Constructor Functions
 * ==========================================
 * 
 * When a function is called with `new`, JavaScript:
 * 1. Creates a new empty object
 * 2. Sets `this` to that new object
 * 3. Executes the constructor
 * 4. Returns the new object (unless explicitly returning another object)
 */

// =============================================================================
// Task: Implement Constructor Functions with Proper `this` Binding
// =============================================================================
/**
 * Create:
 * 
 * 1. A `Person` constructor that:
 *    - Takes name and age
 *    - Sets this.name and this.age
 *    - Has a greet() method returning "Hi, I'm {name}"
 * 
 * 2. A `Employee` constructor that:
 *    - Takes name, age, and department
 *    - Uses Person.call(this, name, age) to inherit properties
 *    - Adds this.department
 *    - Has introduce() returning "I'm {name}, {age}yo, in {department}"
 * 
 * 3. A `createPerson` factory function (returns object, no `new` needed)
 *    that creates the same structure as Person
 * 
 * 4. A `testNewBinding` function that:
 *    - Creates a Person with new → returns person object
 *    - Creates Employee with new → returns employee object  
 *    - Calls Person without new → returns undefined (demonstrates importance of new)
 */

function Person(name, age) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

function Employee(name, age, department) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

function createPerson(name, age) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

function testNewBinding() {
    // ==================== YOUR CODE HERE ====================
    // Return { person, employee, withoutNew }
    
    
    // ========================================================
}

module.exports = { Person, Employee, createPerson, testNewBinding };
