/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    CONSTRUCTOR FUNCTIONS CHALLENGE 1                         ║
 * ║            🏗️ Basic Constructor & Input Validation with Errors 🏗️           ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * Constructor functions are blueprints for creating objects. They are regular
 * functions that are called with the 'new' keyword. Input validation is crucial
 * to ensure objects are created with valid data, and throwing errors helps
 * catch problems early.
 * 
 * 
 * 🎯 TASK: Create a Person Constructor with Validation
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a constructor function `Person` that:
 *    - Takes `name` and `age` parameters
 *    - Validates that `name` is a non-empty string (throw TypeError if invalid)
 *    - Validates that `age` is a positive number (throw RangeError if invalid)
 *    - Assigns validated values to `this.name` and `this.age`
 * 
 * 2. Add a method `greet()` to Person.prototype that:
 *    - Returns "Hello, my name is [name] and I am [age] years old"
 * 
 * 3. Add a method `haveBirthday()` to Person.prototype that:
 *    - Increments `this.age` by 1
 *    - Returns the new age
 * 
 * 4. Add a method `isAdult()` to Person.prototype that:
 *    - Returns true if age >= 18, false otherwise
 * 
 * 5. Create a constructor function `Employee` that:
 *    - Takes `name`, `age`, and `employeeId` parameters
 *    - Calls Person constructor using `call()` to inherit name and age
 *    - Validates that `employeeId` is a non-empty string (throw TypeError if invalid)
 *    - Assigns `employeeId` to `this.employeeId`
 *    - Inherits from Person using prototype chaining
 * 
 * 6. Add a method `getEmployeeInfo()` to Employee.prototype that:
 *    - Returns "Employee [employeeId]: [name]"
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - Use TypeError for wrong type errors (name must be string, etc.)
 * - Use RangeError for out of range errors (age must be positive)
 * - Error messages should be descriptive and clear
 * - Methods should be on prototype (not inside constructor)
 * - Employee must properly inherit from Person
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - Use typeof to check for string type
 * - Use Number.isFinite() or typeof for number validation
 * - Use trim() to handle whitespace-only strings
 * - Remember to reset constructor property after prototype assignment
 * 
 * 
 * 📝 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Always validate input in constructors to ensure object integrity.
 *  Use specific error types (TypeError, RangeError) for better debugging."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Person Constructor
 * @param {string} name - The person's name (must be non-empty string)
 * @param {number} age - The person's age (must be positive number)
 * @throws {TypeError} If name is not a non-empty string
 * @throws {RangeError} If age is not a positive number
 */
function Person(name, age) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Person prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Employee Constructor (inherits from Person)
 * @param {string} name - The employee's name
 * @param {number} age - The employee's age
 * @param {string} employeeId - The employee's ID (must be non-empty string)
 * @throws {TypeError} If employeeId is not a non-empty string
 */
function Employee(name, age, employeeId) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Set up Employee prototype chain
// ==================== YOUR CODE HERE ====================


// ========================================================

// Employee prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    Person,
    Employee
};
