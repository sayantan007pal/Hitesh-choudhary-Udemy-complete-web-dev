/**
 * bind() and Partial Application
 * ===============================
 * 
 * bind() returns a NEW function with `this` permanently set.
 * It also allows "partial application" - pre-filling some arguments
 * to create specialized functions from general ones.
 * 
 * This is a powerful pattern for creating reusable utilities!
 */


// =============================================================================
// Task: Build a Configurable Logger with Partial Application
// =============================================================================
/**
 * Create a flexible logging system using bind() for partial application.
 * 
 * Create:
 * 
 * 1. A `logger` object with:
 *    - A property `prefix` set to "[APP]"
 *    - A property `separator` set to " | "
 *    - A method `log(level, category, message)` that returns:
 *      "{this.prefix}{separator}{level}{separator}{category}: {message}"
 *      
 *    Example: logger.log("INFO", "AUTH", "User logged in")
 *             → "[APP] | INFO | AUTH: User logged in"
 * 
 * 2. Create specialized loggers using bind():
 *    
 *    a) `infoLogger` - pre-bound with level="INFO"
 *       Example: infoLogger("DB", "Connection established")
 *                → "[APP] | INFO | DB: Connection established"
 *    
 *    b) `errorLogger` - pre-bound with level="ERROR"
 *    
 *    c) `debugLogger` - pre-bound with level="DEBUG"
 *    
 *    d) `authInfoLogger` - pre-bound with level="INFO" AND category="AUTH"
 *       Example: authInfoLogger("User logged in")
 *                → "[APP] | INFO | AUTH: User logged in"
 * 
 * 3. A function `createCustomLogger(prefix, separator)` that:
 *    - Returns a new logger function with custom prefix and separator
 *    - The returned function should take (level, category, message)
 *    - Uses bind to create this new logger
 *    
 *    Example: const customLog = createCustomLogger("🚀", " → ");
 *             customLog("INFO", "LAUNCH", "System starting")
 *             → "🚀 → INFO → LAUNCH: System starting"
 * 
 * 4. A function `createCategoryLogger(level, category)` that:
 *    - Uses the main logger object
 *    - Pre-binds both level and category
 *    - Returns a function that only needs the message
 *    
 *    Example: const dbError = createCategoryLogger("ERROR", "DATABASE");
 *             dbError("Connection timeout")
 *             → "[APP] | ERROR | DATABASE: Connection timeout"
 */

const logger = {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
};


// Create specialized loggers using bind()
// ==================== YOUR CODE HERE ====================
const infoLogger = undefined;    // Replace with: logger.log.bind(logger, "INFO")
const errorLogger = undefined;   // Replace with appropriate bind
const debugLogger = undefined;   // Replace with appropriate bind
const authInfoLogger = undefined; // Replace with appropriate bind (pre-fill level AND category)

// ========================================================


function createCustomLogger(prefix, separator) {
    // ==================== YOUR CODE HERE ====================
    // Return a function with custom prefix and separator
    
    
    
    // ========================================================
}


function createCategoryLogger(level, category) {
    // ==================== YOUR CODE HERE ====================
    // Use logger and bind to pre-fill level and category
    
    
    
    // ========================================================
}


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    logger,
    infoLogger,
    errorLogger,
    debugLogger,
    authInfoLogger,
    createCustomLogger,
    createCategoryLogger
};
