/**
 * Closures for Data Privacy
 * ==========================
 * 
 * This challenge tests your understanding of using closures to create
 * truly PRIVATE data that cannot be accessed or modified from outside.
 * 
 * This is one of the most common interview questions about closures!
 */


// =============================================================================
// Task: Secret Holder with Private Data
// =============================================================================
/**
 * Create a function createSecretHolder(initialSecret) that stores a secret
 * value that CANNOT be accessed directly from outside.
 * 
 * The function should return an object with these methods:
 *   - getSecret(): Returns the current secret
 *   - setSecret(newSecret): Changes the secret to newSecret
 * 
 * IMPORTANT: The secret must be truly private!
 *   - There should be NO way to access the secret except through getSecret()
 *   - Direct property access like holder.secret should return undefined
 * 
 * Parameters:
 *   - initialSecret: The initial secret value (can be any type)
 * 
 * Example Usage:
 *   const holder = createSecretHolder("myPassword123");
 *   
 *   console.log(holder.getSecret());     // "myPassword123"
 *   console.log(holder.secret);          // undefined (private!)
 *   
 *   holder.setSecret("newPassword456");
 *   console.log(holder.getSecret());     // "newPassword456"
 *   
 *   // Each instance has its own private secret
 *   const holder1 = createSecretHolder("secret1");
 *   const holder2 = createSecretHolder("secret2");
 *   console.log(holder1.getSecret());    // "secret1"
 *   console.log(holder2.getSecret());    // "secret2"
 * 
 * 
 * 💡 Interview Tip:
 *    This demonstrates how closures enable the "Module Pattern" -
 *    creating objects with private state, similar to private class fields.
 */

function createSecretHolder(initialSecret) {
    // ==================== YOUR CODE HERE ====================
     let secret = 0;
     function setSecret(newSecret){
         secret = initialSecret
         return secret
        
     }
     function getSecret(){
        return secret
     }

    return {getSecret(); setSecret()}
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createSecretHolder
};
