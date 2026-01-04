/**
 * ES6 Classes and Extends
 * ========================
 * 
 * Modern JavaScript inheritance using ES6 class syntax,
 * extends keyword, super(), static methods, and getters/setters.
 */


// =============================================================================
// Task: Build a User Management System with ES6 Classes
// =============================================================================
/**
 * Create a class hierarchy for user management:
 * 
 * User (Base Class):
 *   - Constructor: (username, email)
 *   - Properties: username, email, createdAt (Date.now())
 *   - Instance Methods:
 *     - getInfo(): returns "User: {username} ({email})"
 *     - isActive(): returns true (base implementation)
 *   - Static Methods:
 *     - validateEmail(email): returns true if email contains '@' and '.'
 *   - Getter:
 *     - joinDate: returns createdAt formatted as ISO string (toISOString())
 * 
 * 
 * Admin (extends User):
 *   - Constructor: (username, email, accessLevel)
 *   - Additional Properties: accessLevel (number 1-5), permissions (empty array)
 *   - Instance Methods (override or add):
 *     - getInfo(): returns "Admin: {username} ({email}) [Level {accessLevel}]"
 *     - addPermission(perm): adds permission to array, returns this for chaining
 *     - hasPermission(perm): returns true if permission exists
 *     - canAccess(requiredLevel): returns true if accessLevel >= requiredLevel
 *   - Static Methods:
 *     - createSuperAdmin(username, email): returns Admin with accessLevel 5
 * 
 * 
 * Guest (extends User):
 *   - Constructor: (sessionId) - generates username as "guest_{sessionId}"
 *                  email defaults to null
 *   - Additional Properties: sessionId, expiresAt (Date.now() + 3600000 = 1 hour)
 *   - Instance Methods:
 *     - getInfo(): returns "Guest: {username} (Session: {sessionId})"
 *     - isActive(): returns true only if Date.now() < expiresAt
 *     - extendSession(ms): adds ms to expiresAt
 *   - Getter:
 *     - remainingTime: returns expiresAt - Date.now() (in ms, min 0)
 * 
 * 
 * Example Usage:
 *   const user = new User("john", "john@example.com");
 *   user.getInfo();            // "User: john (john@example.com)"
 *   User.validateEmail("bad"); // false
 * 
 *   const admin = new Admin("sarah", "sarah@admin.com", 3);
 *   admin.addPermission("delete").addPermission("edit");
 *   admin.hasPermission("delete"); // true
 *   admin.canAccess(2);            // true
 * 
 *   const guest = new Guest("abc123");
 *   guest.getInfo();           // "Guest: guest_abc123 (Session: abc123)"
 *   guest.isActive();          // true (if within 1 hour)
 */

class User {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    // ========================================================
}


class Admin extends User {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    // ========================================================
}


class Guest extends User {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    // ========================================================
}


module.exports = { User, Admin, Guest };
