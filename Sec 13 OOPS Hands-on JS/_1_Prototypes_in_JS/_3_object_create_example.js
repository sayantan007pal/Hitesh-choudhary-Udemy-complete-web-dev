/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES CHALLENGE 3                                    ║
 * ║            🏗️ Object.create() - Creating Objects with Prototypes 🏗️         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * Object.create() is the MODERN and RECOMMENDED way to set up prototypes.
 * It creates a new object with the specified prototype object and properties.
 * 
 * Syntax: Object.create(proto, [propertiesObject])
 * 
 * This is cleaner than using __proto__ and is widely used in interviews!
 * 
 * 
 * 🎯 TASK: Master Object.create() usage
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a function `createVehicle(type, wheels)` that:
 *    - Returns an object using Object.create(null) - no prototype!
 *    - Adds type and wheels as own properties
 *    - This demonstrates creating objects with NO prototype chain
 * 
 * 2. Create a base object `vehicleProto` with:
 *    - A method `describe()` that returns `${this.type} with ${this.wheels} wheels`
 *    - A method `start()` that returns 'Vehicle started'
 * 
 * 3. Create a function `createCar(brand, model)` that:
 *    - Uses Object.create(vehicleProto) to create object with vehicleProto as prototype
 *    - Sets type to 'Car', wheels to 4, brand and model as own properties
 *    - Adds a method `honk()` that returns `${brand} ${model} says Beep!`
 * 
 * 4. Create a function `createBike(brand)` that:
 *    - Uses Object.create(vehicleProto) to create object with vehicleProto as prototype
 *    - Sets type to 'Bike', wheels to 2, brand as own property
 *    - Adds a method `ring()` that returns `${brand} says Ring Ring!`
 * 
 * 5. Create a function `createWithDescriptors(proto, props)` that:
 *    - Uses Object.create with property descriptors
 *    - props is an object like { name: 'John', age: 30 }
 *    - All properties should be enumerable, writable, and configurable
 *    - Returns the new object
 * 
 * 
 * 💡 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Object.create() is preferred over __proto__ because it's more explicit
 *  and allows creating objects with null prototype for dictionary-like usage."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * Creates an object with NO prototype (Object.create(null))
 * @param {string} type - The vehicle type
 * @param {number} wheels - Number of wheels
 * @returns {Object} - Object with no prototype
 */
function createVehicle(type, wheels) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Base vehicle prototype object
 * Add describe() and start() methods
 */
const vehicleProto = {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
};


/**
 * Creates a car object inheriting from vehicleProto
 * @param {string} brand - Car brand
 * @param {string} model - Car model
 * @returns {Object} - Car object with vehicleProto as prototype
 */
function createCar(brand, model) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Creates a bike object inheriting from vehicleProto
 * @param {string} brand - Bike brand
 * @returns {Object} - Bike object with vehicleProto as prototype
 */
function createBike(brand) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


/**
 * Creates object with property descriptors
 * @param {Object} proto - Prototype object
 * @param {Object} props - Properties to add {key: value}
 * @returns {Object} - New object with prototype and properties
 */
function createWithDescriptors(proto, props) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    createVehicle,
    vehicleProto,
    createCar,
    createBike,
    createWithDescriptors
};
