/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    CONSTRUCTOR FUNCTIONS CHALLENGE 7                         ║
 * ║             🔍 instanceof, Constructor Property & Type Checking 🔍           ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * JavaScript provides several ways to check object types:
 * 
 * 1. instanceof operator:
 *    - Checks if Constructor.prototype exists in object's prototype chain
 *    - obj instanceof Constructor
 * 
 * 2. constructor property:
 *    - Every object has a constructor property pointing to its constructor
 *    - obj.constructor === Constructor
 * 
 * 3. Object.prototype.isPrototypeOf():
 *    - Constructor.prototype.isPrototypeOf(obj)
 * 
 * Understanding these is CRUCIAL for debugging and type safety!
 * 
 * 
 * 🎯 TASK: Master Type Checking Techniques
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a constructor `Vehicle` that:
 *    - Takes `type` parameter (e.g., 'car', 'bike')
 *    - Has prototype method `getType()` returning the type
 * 
 * 2. Create a constructor `Car` that:
 *    - Inherits from Vehicle with type='car'
 *    - Takes `brand` parameter
 *    - Has prototype method `getBrand()` returning brand
 * 
 * 3. Create a constructor `ElectricCar` that:
 *    - Inherits from Car
 *    - Takes `brand` and `batteryCapacity` parameters
 *    - Has prototype method `getBatteryInfo()` returning "[batteryCapacity]kWh"
 * 
 * 4. Create a function `checkAllTypes(obj)` that:
 *    - Returns an array of ALL constructor names the object is an instance of
 *    - For ElectricCar instance: ['ElectricCar', 'Car', 'Vehicle', 'Object']
 * 
 * 5. Create a function `verifyInheritance(obj, constructorList)` that:
 *    - Takes an object and array of constructor functions
 *    - Returns true if object is instanceof ALL of them
 *    - Returns false otherwise
 * 
 * 6. Create a function `getConstructorName(obj)` that:
 *    - Returns the name of the object's direct constructor
 *    - Uses constructor.name property
 * 
 * 7. Create a function `fixConstructorProperty(Child, Parent)` that:
 *    - Fixes a common bug where Child.prototype.constructor is wrong
 *    - After Object.create(Parent.prototype), constructor points to Parent
 *    - This function should fix it to point to Child
 *    - Returns the Child
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - Proper 3-level inheritance: ElectricCar → Car → Vehicle
 * - All constructor properties must be correctly set
 * - checkAllTypes must traverse entire prototype chain
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - Use Object.getPrototypeOf() to walk the chain
 * - Every prototype has a constructor property
 * - Stop when you hit null (end of chain)
 * 
 * 
 * 📝 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "instanceof checks the entire prototype chain, while constructor.name
 *  gives you the direct constructor. Know when to use each!"
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Vehicle Constructor (Base)
 * @param {string} type - Vehicle type
 */
function Vehicle(type) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Vehicle prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Car Constructor (inherits from Vehicle)
 * @param {string} brand - Car brand
 */
function Car(brand) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Set up Car inheritance
// ==================== YOUR CODE HERE ====================


// ========================================================

// Car prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * ElectricCar Constructor (inherits from Car)
 * @param {string} brand - Car brand
 * @param {number} batteryCapacity - Battery capacity in kWh
 */
function ElectricCar(brand, batteryCapacity) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Set up ElectricCar inheritance
// ==================== YOUR CODE HERE ====================


// ========================================================

// ElectricCar prototype methods
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Returns array of all constructor names in prototype chain
 * @param {Object} obj - Object to check
 * @returns {Array<string>} - Array of constructor names
 */
function checkAllTypes(obj) {
    // ==================== YOUR CODE HERE ====================
    // Walk the prototype chain and collect constructor names
    // Should include 'Object' at the end
    
    
    // ========================================================
}


/**
 * Verifies object is instanceof all provided constructors
 * @param {Object} obj - Object to verify
 * @param {Array<Function>} constructorList - List of constructors
 * @returns {boolean} - True if instanceof all
 */
function verifyInheritance(obj, constructorList) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Gets the direct constructor name of an object
 * @param {Object} obj - Object to check
 * @returns {string} - Constructor name
 */
function getConstructorName(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Fixes constructor property after prototype assignment
 * @param {Function} Child - Child constructor
 * @param {Function} Parent - Parent constructor (used to verify)
 * @returns {Function} - The Child constructor
 */
function fixConstructorProperty(Child, Parent) {
    // ==================== YOUR CODE HERE ====================
    // Child.prototype.constructor should point to Child, not Parent
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    Vehicle,
    Car,
    ElectricCar,
    checkAllTypes,
    verifyInheritance,
    getConstructorName,
    fixConstructorProperty
};
