/**
 * Explicit Binding with call() - Method Borrowing
 * ================================================
 * 
 * call() allows you to invoke a function immediately with a specified
 * `this` context and comma-separated arguments. This is powerful for
 * "borrowing" methods from one object to use on another.
 */


// =============================================================================
// Task: Implement a Universal Formatter Using call()
// =============================================================================
/**
 * You are building a logging system. Different entities (User, Product, Order)
 * need to be formatted for logging, but they all use a similar format.
 * 
 * Create:
 * 
 * 1. A standalone `formatEntity` function that:
 *    - Uses `this.type`, `this.id`, and `this.name` to format a string
 *    - Takes two additional arguments: `prefix` and `suffix`
 *    - Returns: "[prefix] {type} #{id}: {name} [suffix]"
 *    
 *    Example: formatEntity.call(user, "LOG", "OK") 
 *             → "[LOG] User #1: Alice [OK]"
 * 
 * 2. A `user` object with: type: "User", id: 1, name: "Alice"
 * 
 * 3. A `product` object with: type: "Product", id: 101, name: "Laptop"
 * 
 * 4. An `order` object with: type: "Order", id: 5001, name: "Electronics Bundle"
 * 
 * 5. A `formatMultiple` function that:
 *    - Takes an array of entities and formats them all
 *    - Uses `formatEntity` with call() for each entity
 *    - Returns an array of formatted strings
 *    - Prefix should be "INFO" and suffix should be "DONE"
 *    
 *    Example: formatMultiple([user, product]) 
 *             → ["[INFO] User #1: Alice [DONE]", "[INFO] Product #101: Laptop [DONE]"]
 * 
 * 6. A `borrowFormatter` function that:
 *    - Takes any object with {type, id, name} properties
 *    - Uses call() to borrow formatEntity
 *    - Returns the formatted string with custom prefix and suffix passed as arguments
 */

function formatEntity(prefix, suffix) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


const user = {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
};


const product = {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
};


const order = {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
};


function formatMultiple(entities) {
    // ==================== YOUR CODE HERE ====================
    // Use formatEntity with call() for each entity
    
    
    
    // ========================================================
}


function borrowFormatter(obj, prefix, suffix) {
    // ==================== YOUR CODE HERE ====================
    // Use call() to borrow formatEntity for any object
    
    
    
    // ========================================================
}


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    formatEntity,
    user,
    product,
    order,
    formatMultiple,
    borrowFormatter
};
