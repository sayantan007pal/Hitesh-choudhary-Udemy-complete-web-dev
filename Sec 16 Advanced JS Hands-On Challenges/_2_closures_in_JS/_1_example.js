/**
 * Closures in JavaScript
 * =======================
 * 
 * Closures are functions that remember and can access variables from their
 * outer (enclosing) scope, even after the outer function has finished executing.
 */


// =============================================================================
// Task 1: Creating a Counter Using Closures
// =============================================================================
/**
 * Create a function createCounter() that returns a function which increments
 * and returns a counter value each time it is called.
 * 
 * The counter should start at 0 and increment by 1 on each call.
 * 
 * Example Usage:
 *   const counter = createCounter();
 *   console.log(counter()); // 1
 *   console.log(counter()); // 2
 *   console.log(counter()); // 3
 * 
 * Each counter instance should be independent:
 *   const counter1 = createCounter();
 *   const counter2 = createCounter();
 *   console.log(counter1()); // 1
 *   console.log(counter2()); // 1 (separate counter)
 */

function createCounter() {
    // ==================== YOUR CODE HERE ====================
    let count = 0;
    function incrementCounter(){
        return ++count
    }       
    return incrementCounter     
    
    
    // ========================================================
}
const c =   createCounter()
console.log(c())
console.log(c())
console.log(c())


// =============================================================================
// Task 2: Rate Limiter Function
// =============================================================================
/**
 * Create a function rateLimiter(fn, limit) that returns a new function.
 * 
 * The returned function allows calling fn only once within a 'limit' time
 * in milliseconds. If it is called again before the limit is reached,
 * it should return "Rate limit exceeded".
 * 
 * Parameters:
 *   - fn: The function to rate limit
 *   - limit: Time in milliseconds before the function can be called again
 * 
 * Example Usage:
 *   const limitedFn = rateLimiter(() => "Success!", 1000);
 *   console.log(limitedFn()); // "Success!"
 *   console.log(limitedFn()); // "Rate limit exceeded" (if called within 1 second)
 *   // Wait 1 second...
 *   console.log(limitedFn()); // "Success!" (after 1 second)
 */

function rateLimiter(fn, limit) {
    // ==================== YOUR CODE HERE ====================
    let dateHit = 0
    return function(...args){  // Capture all arguments using rest operator in this way we can pass any number of arguments to the function
    //  and earlier we were only able to pass one argument to the function
        const dateNow = Date.now()
        if(dateNow- dateHit >= limit){
            dateHit = dateNow;
            return fn(...args) // Pass them to fn using spread operator in this way we can pass any number of arguments to the function 
            // and without it we can only pass one argument to the function
        }
        else{
            return "Rate limit exceeded"
        }
    }
    
    // ========================================================
}
const limitedFn = rateLimiter((...args) => "Success!", 1000)



// =============================================================================
// Task 3: Memoization Function
// =============================================================================
/**
 * Write a function memoize(fn) that returns a memoized version of fn.
 * 
 * The memoized function should cache the results of function calls,
 * and return the cached result if the same inputs are provided again.
 * 
 * For simplicity, assume the function takes a single argument.
 * 
 * Example Usage:
 *   const slowSquare = (n) => {
 *       console.log('Computing...');
 *       return n * n;
 *   };
 *   const memoizedSquare = memoize(slowSquare);
 *   
 *   console.log(memoizedSquare(5)); // Logs "Computing...", returns 25
 *   console.log(memoizedSquare(5)); // Returns 25 (no "Computing..." - cached!)
 *   console.log(memoizedSquare(6)); // Logs "Computing...", returns 36
 */

function memoize(fn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createCounter,
    rateLimiter,
    memoize
};


/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  📚 CLOSURE COUNTER PATTERN - INTERVIEW REVISION NOTES (CSE 1st Year)    ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  🎯 WHAT IS A CLOSURE?                                                      │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 *   A closure is when a function "remembers" variables from its birthplace
 *   (outer scope), even after the outer function has finished running.
 * 
 *   🏠 ANALOGY - The Backpack:
 *   ────────────────────────────
 *   Imagine `incrementCounter` is a child going to school. When it leaves home
 *   (`createCounter`), it takes a "backpack" containing `count`. Even though the
 *   child left home, it still has access to everything inside its backpack!
 * 
 *   📦 Memory Visualization:
 *   ────────────────────────────
 *   ┌─────────────────────────────────────────┐
 *   │ createCounter() Execution Context       │
 *   │   ┌─────────────────────────────────┐   │
 *   │   │  count = 0  (lives here)        │   │
 *   │   │                                 │   │
 *   │   │  incrementCounter() ────────────┼───┼──→ has access to `count`
 *   │   │    (closure carries reference)  │   │     via closure!
 *   │   └─────────────────────────────────┘   │
 *   └─────────────────────────────────────────┘
 *         ↓ After createCounter() returns:
 *   ┌─────────────────────────────────────────┐
 *   │  c = incrementCounter (with backpack)   │
 *   │      🎒 backpack contains: count        │
 *   └─────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  ❌ COMMON MISTAKE #1: return incrementCounter() vs return incrementCounter │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 *   ✅ CORRECT:   return incrementCounter     (return the function itself)
 *   ❌ WRONG:     return incrementCounter()   (return the RESULT of calling it)
 * 
 *   🎁 ANALOGY - Gift Wrapping:
 *   ────────────────────────────
 *   - `incrementCounter` = giving someone a wrapped gift box (they can open it later)
 *   - `incrementCounter()` = opening the gift yourself and giving them what's inside
 * 
 *   📊 What happens with WRONG approach:
 *   ────────────────────────────────────
 *   return incrementCounter()  
 *     → Calls function immediately
 *     → count becomes 1
 *     → Returns the NUMBER 1
 *     → c = 1 (a number, NOT a function!)
 *     → c() throws ERROR: "c is not a function"
 * 
 *   📊 What happens with CORRECT approach:
 *   ────────────────────────────────────────
 *   return incrementCounter
 *     → Returns the FUNCTION REFERENCE
 *     → c = [Function] (the function itself!)
 *     → c() works perfectly, returns 1, 2, 3...
 * 
 *   💡 Rule: Adding () after a function name EXECUTES it.
 *            Without () you get a REFERENCE to the function.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  ❌ COMMON MISTAKE #2: new createCounter() vs createCounter()               │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 *   ✅ CORRECT:   const c = createCounter()       (Factory Function pattern)
 *   ❌ WRONG:     const c = new createCounter()   (Constructor Function pattern)
 * 
 *   🏭 ANALOGY - Factory vs Workshop:
 *   ──────────────────────────────────
 *   - FACTORY FUNCTION (without `new`): Like a vending machine.
 *     You press a button, it GIVES YOU exactly what it promised (via `return`).
 *   
 *   - CONSTRUCTOR FUNCTION (with `new`): Like ordering a custom pizza.
 *     A new "blank pizza" is created, and you add toppings (via `this`).
 * 
 *   📊 What happens with `new`:
 *   ───────────────────────────
 *   new createCounter()
 *     → JavaScript creates an empty object {}
 *     → Sets `this` to point to that empty object
 *     → IGNORES your `return incrementCounter` (for non-object returns)
 *     → Returns the empty object {}
 *     → c = {} (an empty object, NOT a function!)
 *     → c() throws ERROR: "c is not a function"
 * 
 *   💡 Rule: Use `new` ONLY with constructor functions that use `this`.
 *            Factory functions use `return` and don't need `new`.
 * 
 *   // Constructor Pattern (uses `this` and `new`):
 *   function Counter() {
 *       this.count = 0;
 *       this.increment = function() { return ++this.count; };
 *   }
 *   const c = new Counter();  // ✅ Correct for constructors
 *   c.increment();            // returns 1
 * 
 *   // Factory Pattern (uses `return`, NO `new`):
 *   function createCounter() {
 *       let count = 0;
 *       return function() { return ++count; };
 *   }
 *   const c = createCounter();  // ✅ Correct for factories
 *   c();                        // returns 1
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  ❌ COMMON MISTAKE #3: console.log(c) vs console.log(c())                   │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 *   ✅ CORRECT:   console.log(c())   (call the function, log its RESULT)
 *   ❌ WRONG:     console.log(c)     (log the function DEFINITION itself)
 * 
 *   📞 ANALOGY - Making a Phone Call:
 *   ──────────────────────────────────
 *   - `c` = holding the phone (you have it, but not making a call)
 *   - `c()` = actually dialing and talking (executing the action)
 * 
 *   📊 Output Comparison:
 *   ─────────────────────
 *   console.log(c)   → [Function: incrementCounter]  (shows function code)
 *   console.log(c()) → 1                             (shows returned value)
 *   console.log(c()) → 2                             (count persists via closure!)
 *   console.log(c()) → 3
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  🧠 UNDER THE HOOD: HOW CLOSURES WORK IN MEMORY                             │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 *   STEP-BY-STEP EXECUTION:
 *   ────────────────────────
 * 
 *   1️⃣ const c = createCounter()
 *      - createCounter() gets called
 *      - New execution context created for createCounter
 *      - `count = 0` stored in this context
 *      - `incrementCounter` function is created
 *      - incrementCounter gets a hidden [[Scope]] property pointing to parent's variables
 *      - `return incrementCounter` → c now holds this function
 *      - createCounter finishes, BUT `count` is NOT garbage collected!
 *        (because incrementCounter's [[Scope]] still references it)
 * 
 *   2️⃣ c() - First call
 *      - JavaScript looks for `count` in incrementCounter's scope → not found
 *      - Looks in [[Scope]] (closure) → FOUND! count = 0
 *      - ++count → count becomes 1
 *      - Returns 1
 * 
 *   3️⃣ c() - Second call
 *      - Same `count` variable (still alive via closure)
 *      - ++count → count becomes 2
 *      - Returns 2
 * 
 *   🔐 WHY IS THIS USEFUL? (Interview Gold!)
 *   ─────────────────────────────────────────
 *   1. DATA PRIVACY: `count` cannot be accessed directly from outside.
 *      There's no `c.count` or global `count`. It's ENCAPSULATED!
 *   
 *   2. STATE PERSISTENCE: The counter "remembers" its value between calls.
 *      Without closures, `count` would reset to 0 every time.
 *   
 *   3. FUNCTION FACTORIES: One `createCounter()` can create MULTIPLE independent counters:
 *      const counter1 = createCounter();  // Its own `count`
 *      const counter2 = createCounter();  // Separate `count`
 *      counter1(); // 1
 *      counter2(); // 1 (not 2! they're independent)
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  🎤 INTERVIEW ANSWER TEMPLATE                                               │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 *   "A closure is formed when a function retains access to its lexical scope
 *   even after the outer function has returned. In this counter example,
 *   `incrementCounter` closes over the `count` variable, allowing it to persist
 *   and increment across multiple calls while keeping `count` private and
 *   inaccessible from outside."
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  📝 QUICK CHEATSHEET                                                        │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 *   | Expression              | What it means                                   |
 *   |-------------------------|-------------------------------------------------|
 *   | return fn               | Return the function itself (a reference)        |
 *   | return fn()             | Call fn, then return its result                 |
 *   | const c = factory()     | Factory pattern: c = whatever factory returns   |
 *   | const c = new Constr()  | Constructor pattern: c = new object with `this` |
 *   | console.log(fn)         | Print the function definition                   |
 *   | console.log(fn())       | Call fn, then print its return value            |
 * 
 *   💡 REMEMBER: Parentheses () = EXECUTE/CALL. No parentheses = REFERENCE.
 * 
 */
