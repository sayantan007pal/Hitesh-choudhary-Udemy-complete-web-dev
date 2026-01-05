/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    CONSTRUCTOR FUNCTIONS CHALLENGE 10                        ║
 * ║              ⚠️ Custom Error Classes with Constructor Pattern ⚠️             ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT:
 * ━━━━━━━━━━━
 * JavaScript's built-in Error types (TypeError, RangeError, etc.) are great,
 * but sometimes you need CUSTOM error types for your application.
 * 
 * Creating custom errors using constructor functions requires:
 * - Calling Error.call(this, message) to initialize the error
 * - Setting the name property to the custom error name
 * - Capturing the stack trace (for better debugging)
 * - Inheriting from Error
 * 
 * This is essential for production applications!
 * 
 * 
 * 🎯 TASK: Build a Custom Error Hierarchy
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * 1. Create a constructor `AppError` that:
 *    - Inherits from Error
 *    - Takes `message` and optional `code` (default: 'UNKNOWN_ERROR')
 *    - Sets this.name to 'AppError'
 *    - Sets this.code to the error code
 *    - Sets this.timestamp to current date/time
 *    - Properly captures stack trace
 * 
 * 2. Create a constructor `ValidationError` that:
 *    - Inherits from AppError with code 'VALIDATION_ERROR'
 *    - Takes `message` and `field` (the field that failed validation)
 *    - Sets this.name to 'ValidationError'
 *    - Sets this.field to the field name
 * 
 * 3. Create a constructor `NetworkError` that:
 *    - Inherits from AppError with code 'NETWORK_ERROR'
 *    - Takes `message` and `statusCode` (HTTP status)
 *    - Sets this.name to 'NetworkError'
 *    - Sets this.statusCode to the HTTP status code
 * 
 * 4. Create a constructor `AuthenticationError` that:
 *    - Inherits from AppError with code 'AUTH_ERROR'
 *    - Takes `message` and optional `userId`
 *    - Sets this.name to 'AuthenticationError'
 *    - Sets this.userId (if provided)
 * 
 * 5. Create a function `handleError(error)` that:
 *    - Returns different response objects based on error type:
 *    - ValidationError: { handled: true, type: 'validation', field, message }
 *    - NetworkError: { handled: true, type: 'network', statusCode, message }
 *    - AuthenticationError: { handled: true, type: 'auth', message }
 *    - AppError: { handled: true, type: 'app', code, message }
 *    - Regular Error: { handled: false, type: 'unknown', message }
 * 
 * 6. Create a function `isAppError(error)` that:
 *    - Returns true if error is any type of AppError
 *    - Returns false otherwise
 * 
 * 
 * 🔑 REQUIREMENTS:
 * ━━━━━━━━━━━━━━━━
 * - All custom errors must be instanceof Error
 * - Hierarchy: Error ← AppError ← (ValidationError|NetworkError|AuthenticationError)
 * - Stack traces must be properly captured
 * - All error names must be correctly set
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━
 * - Use Error.call(this, message) to call parent
 * - Use Error.captureStackTrace if available (V8 engines)
 * - Don't forget Object.create and constructor reset for inheritance
 * - this.name should match the constructor name
 * 
 * 
 * 📝 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━
 * "Custom errors help categorize and handle different failure modes.
 *  They make error handling more precise and debugging easier."
 * 
 */

// =============================================================================
// IMPLEMENT YOUR SOLUTION BELOW
// =============================================================================

/**
 * AppError - Base custom error
 * @param {string} message - Error message
 * @param {string} code - Error code (default: 'UNKNOWN_ERROR')
 */
function AppError(message, code) {
    // ==================== YOUR CODE HERE ====================
    // Call Error constructor
    // Set name, code, timestamp
    // Capture stack trace
    
    
    // ========================================================
}

// Set up AppError inheritance from Error
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * ValidationError - For validation failures
 * @param {string} message - Error message
 * @param {string} field - Field that failed validation
 */
function ValidationError(message, field) {
    // ==================== YOUR CODE HERE ====================
    // Call AppError with appropriate code
    // Set name and field
    
    
    // ========================================================
}

// Set up ValidationError inheritance
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * NetworkError - For network failures
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
function NetworkError(message, statusCode) {
    // ==================== YOUR CODE HERE ====================
    // Call AppError with appropriate code
    // Set name and statusCode
    
    
    // ========================================================
}

// Set up NetworkError inheritance
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * AuthenticationError - For auth failures
 * @param {string} message - Error message
 * @param {string} userId - User ID (optional)
 */
function AuthenticationError(message, userId) {
    // ==================== YOUR CODE HERE ====================
    // Call AppError with appropriate code
    // Set name and userId (if provided)
    
    
    // ========================================================
}

// Set up AuthenticationError inheritance
// ==================== YOUR CODE HERE ====================


// ========================================================


/**
 * Handles different error types and returns appropriate response
 * @param {Error} error - Error to handle
 * @returns {Object} - Response object based on error type
 */
function handleError(error) {
    // ==================== YOUR CODE HERE ====================
    // Check error type using instanceof
    // Return appropriate response object
    
    
    // ========================================================
}


/**
 * Checks if an error is an AppError (or subclass)
 * @param {Error} error - Error to check
 * @returns {boolean} - True if AppError or subclass
 */
function isAppError(error) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// EXPORTS - DO NOT MODIFY
// =============================================================================
module.exports = {
    AppError,
    ValidationError,
    NetworkError,
    AuthenticationError,
    handleError,
    isAppError
};
