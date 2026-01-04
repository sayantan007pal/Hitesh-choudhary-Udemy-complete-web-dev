/**
 * Constructor Function Inheritance
 * =================================
 * 
 * Classic JavaScript inheritance using constructor functions,
 * .call() for invoking parent constructor, and prototype chain setup.
 */


// =============================================================================
// Task: Build a Vehicle Hierarchy with Constructor Functions
// =============================================================================
/**
 * Create three constructor functions: Vehicle, Car, and ElectricCar
 * 
 * Vehicle(make, year):
 *   - Properties: make, year, isRunning (default: false)
 *   - Methods on prototype:
 *     - start(): sets isRunning to true, returns "Vehicle started"
 *     - stop(): sets isRunning to false, returns "Vehicle stopped"
 *     - getAge(currentYear): returns currentYear - this.year
 * 
 * Car(make, year, numDoors):
 *   - Inherits from Vehicle
 *   - Additional property: numDoors
 *   - Methods on prototype:
 *     - honk(): returns "Beep beep!"
 *     - getInfo(): returns "Make: {make}, Year: {year}, Doors: {numDoors}"
 * 
 * ElectricCar(make, year, numDoors, batteryCapacity):
 *   - Inherits from Car
 *   - Additional properties: batteryCapacity, batteryLevel (default: 100)
 *   - Methods on prototype:
 *     - charge(): sets batteryLevel to 100, returns "Fully charged!"
 *     - drive(km): reduces batteryLevel by (km * 0.2), returns remaining %
 *                  (minimum 0, cannot go negative)
 *     - getBatteryStatus(): returns "Battery: {batteryLevel}%"
 * 
 * 
 * Example Usage:
 *   const tesla = new ElectricCar("Tesla", 2023, 4, 75);
 *   tesla.start();            // "Vehicle started" (inherited)
 *   tesla.honk();             // "Beep beep!" (inherited from Car)
 *   tesla.drive(100);         // 80 (100 - 100*0.2)
 *   tesla.getBatteryStatus(); // "Battery: 80%"
 *   tesla.getAge(2025);       // 2
 *   
 *   console.log(tesla instanceof ElectricCar); // true
 *   console.log(tesla instanceof Car);         // true
 *   console.log(tesla instanceof Vehicle);     // true
 */

function Vehicle(make, year) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

// Vehicle prototype methods
// ==================== YOUR CODE HERE ====================




// ========================================================


function Car(make, year, numDoors) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Use Vehicle.call(this, ...) to call parent constructor
    
    
    
    // ========================================================
}

// Set up Car.prototype to inherit from Vehicle.prototype
// ==================== YOUR CODE HERE ====================



// ========================================================

// Car prototype methods
// ==================== YOUR CODE HERE ====================




// ========================================================


function ElectricCar(make, year, numDoors, batteryCapacity) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}

// Set up ElectricCar.prototype to inherit from Car.prototype
// ==================== YOUR CODE HERE ====================



// ========================================================

// ElectricCar prototype methods
// ==================== YOUR CODE HERE ====================




// ========================================================


module.exports = { Vehicle, Car, ElectricCar };
