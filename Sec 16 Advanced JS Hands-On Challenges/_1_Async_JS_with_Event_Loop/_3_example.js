/**
 * Challenge 3: Promise Rejection and Error Handling
 * ==================================================
 * 
 * This challenge tests your understanding of Promise rejection,
 * error handling with try/catch, and the .catch() method.
 */


// =============================================================================
// Task 1: Create a Rejecting Promise
// =============================================================================
/**
 * Create a function createRejectedPromise(errorMessage) that:
 * - Returns a Promise that immediately rejects with an Error containing the message
 * 
 * Example:
 *   createRejectedPromise("Something went wrong!")
 *     .catch(err => console.log(err.message)); // "Something went wrong!"
 */

function createRejectedPromise(errorMessage) {
    // ==================== YOUR CODE HERE ====================
    return new Promise((resolve, reject)=>{
        reject(new Error(errorMessage))
    })
    
    
    
    // ========================================================
}


// function createRejectedPromise(errorMessage) {
//     // ==================== YOUR CODE HERE ====================
//     return new Promise((resolve, reject)=>{
//         try {
            
//         } catch (errorMessage) {
//             reject(errorMessage)
//         } 
//     })
    
    
    
//     // ========================================================
// }

// =============================================================================
// Task 2: Conditional Resolve/Reject
// =============================================================================
/**
 * Create a function validateNumber(num) that:
 * - Returns a Promise
 * - If num is a positive number (> 0), resolves with "Valid number: [num]"
 * - If num is zero or negative, rejects with Error "Invalid: number must be positive"
 * - If num is not a number, rejects with Error "Invalid: not a number"
 * 
 * Examples:
 *   validateNumber(5).then(msg => console.log(msg));  // "Valid number: 5"
 *   validateNumber(-3).catch(e => console.log(e.message));  // "Invalid: number must be positive"
 *   validateNumber("abc").catch(e => console.log(e.message));  // "Invalid: not a number"
 */

function validateNumber(num) {
    // ==================== YOUR CODE HERE ====================
    return new Promise((resolve, reject) =>{
        if(num>0){
           resolve("Valid number: "+num)
        }
        else if (num === 0 || num < 0){
            reject(new Error("Invalid: number must be positive"))
        }
        else {
            reject(new Error("Invalid: not a number"))
        }
    })
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Safe Async Wrapper with Error Handling
// =============================================================================
/**
 * Create a function safeAsyncCall(asyncFn) that:
 * - Takes an async function as an argument
 * - Returns a Promise that:
 *   - Resolves with { success: true, data: result } if asyncFn succeeds
 *   - Resolves with { success: false, error: errorMessage } if asyncFn fails
 * - The wrapper should NEVER reject - it always resolves with a result object
 * 
 * This pattern is useful for handling errors gracefully without try/catch everywhere!
 * 
 * Examples:
 *   const successFn = async () => "data";
 *   const failFn = async () => { throw new Error("failed!"); };
 *   
 *   safeAsyncCall(successFn).then(r => console.log(r)); // { success: true, data: "data" }
 *   safeAsyncCall(failFn).then(r => console.log(r)); // { success: false, error: "failed!" }
 */

function safeAsyncCall(asyncFn) {
    // ==================== YOUR CODE HERE ====================
    return new Promise((resolve) => {
        asyncFn()
            .then(result => {
                resolve({ success: true, data: result })
            })
            .catch(error => {
                resolve({ success: false, error: error.message })
            })
    })
    // ========================================================
}

// ❌ FAILED ATTEMPT #3: Correct async logic, but WRONG object keys!
// This was SO CLOSE to working, but failed due to subtle bugs:
//
//     return new Promise((resolve) => {
//         asyncFn().then((result)=>{
//             resolve({"success: ":true, "data: ":result})  // ← Wrong keys!
//         }).catch((err)=>{
//             resolve({"success: ":false, "data: ":err})    // ← Wrong key + wrong value!
//         })
//     })
//
// PROBLEMS:
// ❌ 1. Key names have colons and spaces: "success: " instead of "success"
// ❌ 2. In catch block: using "data: " instead of "error"
// ❌ 3. In catch block: passing entire error object instead of err.message


// ❌ FAILED ATTEMPT #1: Using comparison logic (completely wrong approach)
// function safeAsyncCall(asyncFn) {
//     // ==================== YOUR CODE HERE ====================
//     return new Promise((resolve, reject)=>{
//         let trueFn = true
//         if(trueFn==asyncFn){
//             resolve({"success: ":true,"data: ":asyncFn})
//         }
//         else{
//             reject(new Error({"success: ":false, "error: ":asyncFn}))
//         }
//     })
//     // ========================================================
// }


// ❌ FAILED ATTEMPT #2: Using sync try/catch (wrong for async)
// function safeAsyncCall(asyncFn) {
//     return new Promise((resolve, reject)=>{
//         try {
//             asyncFn()
//             resolve({"success: ":true,"data: ":asyncFn})
//         } catch (error) {
//             resolve({"success: ":false, "error: ":error})
//         }
//     })
// }
// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createRejectedPromise,
    validateNumber,
    safeAsyncCall
};


// =============================================================================
// 📚 DETAILED EXPLANATION: Why Task 1's First Attempt Failed
// =============================================================================
/**
 * ============================================================================
 * 🔴 THE FAILED CODE (What You First Wrote):
 * ============================================================================
 * 
 *   function createRejectedPromise(errorMessage) {
 *       return new Promise((resolve, reject) => {
 *           try {
 *               // Empty - nothing here!
 *           } catch (errorMessage) {
 *               reject(errorMessage)
 *           }
 *       })
 *   }
 * 
 * 
 * ============================================================================
 * ✅ THE CORRECT CODE (What Actually Works):
 * ============================================================================
 * 
 *   function createRejectedPromise(errorMessage) {
 *       return new Promise((resolve, reject) => {
 *           reject(new Error(errorMessage))
 *       })
 *   }
 * 
 * 
 * ============================================================================
 * 🧠 WHY DID THE FIRST CODE FAIL? - The Core Misconception
 * ============================================================================
 * 
 * You confused two completely DIFFERENT concepts:
 * 
 *   1️⃣  try/catch  → Used to CATCH errors that are THROWN accidentally
 *   2️⃣  reject()   → Used to INTENTIONALLY signal that a Promise failed
 * 
 * 
 * 🎯 THE FUNDAMENTAL PROBLEM:
 * ---------------------------
 * Your first code had:
 *   - try { } block that was EMPTY (no code that could throw an error)
 *   - catch block that was WAITING for an error that would NEVER come
 * 
 * Since nothing inside the try block threw an error, the catch block
 * NEVER executed, and reject() was NEVER called!
 * 
 * Result: The Promise stayed in "PENDING" state forever - neither resolved 
 * nor rejected. The test just hung waiting for something that never happened.
 * 
 * 
 * ============================================================================
 * 🏠 ANALOGY: The Fire Alarm System
 * ============================================================================
 * 
 * Think of it like a fire alarm system in a building:
 * 
 * 
 * ❌ YOUR FAILED APPROACH (try/catch waiting for accident):
 * --------------------------------------------------------
 * Imagine you're a security guard with instructions:
 *   "Wait for a fire to accidentally start, THEN press the alarm button"
 * 
 * But your building is completely empty - no electrical equipment, 
 * no flammable materials, nothing that could catch fire.
 * 
 *   try {
 *       // Empty building - nothing here that can catch fire!
 *   } catch (fire) {
 *       pressAlarmButton(fire)  // This NEVER runs because no fire!
 *   }
 * 
 * You'll wait forever. No fire, no alarm. The building just sits there.
 * 
 * 
 * ✅ THE CORRECT APPROACH (intentionally pressing the button):
 * ------------------------------------------------------------
 * Now imagine your JOB is to TEST the fire alarm system.
 * You don't WAIT for a real fire - you INTENTIONALLY press the alarm!
 * 
 *   pressAlarmButton("Testing: Fire drill!")  // Just press it directly!
 * 
 * That's what reject() does - it DIRECTLY and INTENTIONALLY signals failure.
 * 
 * 
 * ============================================================================
 * 📊 COMPARISON TABLE: try/catch vs reject()
 * ============================================================================
 * 
 * | Aspect              | try/catch                    | reject()                  |
 * |---------------------|------------------------------|---------------------------|
 * | When to use?        | When code MIGHT throw error  | When you WANT to fail     |
 * | Is error accidental?| YES - unexpected problems    | NO - intentional signal   |
 * | Who triggers it?    | JavaScript runtime           | YOU, the programmer       |
 * | Purpose             | Safety net for bugs          | Control flow decision     |
 * | Analogy             | Insurance for accidents      | Deliberate rejection      |
 * 
 * 
 * ============================================================================
 * 🔍 UNDER THE HOOD: What Actually Happens
 * ============================================================================
 * 
 * When you create a Promise, it starts in ONE of THREE states:
 * 
 *   ┌─────────────────────────────────────────────────────────┐
 *   │                    PROMISE STATES                       │
 *   ├─────────────────────────────────────────────────────────┤
 *   │  🟡 PENDING    →  Initial state, waiting for outcome    │
 *   │  🟢 FULFILLED  →  resolve() was called with a value     │
 *   │  🔴 REJECTED   →  reject() was called with an error     │
 *   └─────────────────────────────────────────────────────────┘
 * 
 * 
 * YOUR FIRST CODE - What happened internally:
 * -------------------------------------------
 * 
 *   new Promise((resolve, reject) => {
 *       try {
 *           // Nothing here...
 *       } catch (e) {
 *           reject(e)  // ← This line NEVER executes!
 *       }
 *   })
 * 
 *   Timeline:
 *   1. Promise created → State: 🟡 PENDING
 *   2. Executor function runs
 *   3. try block runs (does nothing)
 *   4. No error occurred, so catch is skipped
 *   5. Function ends
 *   6. Neither resolve() nor reject() was ever called!
 *   7. Promise FOREVER stays 🟡 PENDING
 *   
 *   Test result: The test framework waited for .catch() to be triggered,
 *   but the Promise never rejected, so the test just... waited... forever.
 * 
 * 
 * THE CORRECT CODE - What happens internally:
 * -------------------------------------------
 * 
 *   new Promise((resolve, reject) => {
 *       reject(new Error(errorMessage))  // ← Directly and immediately!
 *   })
 * 
 *   Timeline:
 *   1. Promise created → State: 🟡 PENDING
 *   2. Executor function runs
 *   3. reject() is called with an Error object
 *   4. Promise IMMEDIATELY transitions to 🔴 REJECTED
 *   5. Any .catch() handlers are queued to run
 *   
 *   Test result: The .catch() block receives the error and test passes! ✅
 * 
 * 
 * ============================================================================
 * 🎓 WHEN TO USE WHICH? - Interview-Ready Summary
 * ============================================================================
 * 
 * 
 * 📌 USE try/catch WHEN:
 * ----------------------
 * - You're doing something RISKY that MIGHT fail
 * - Errors are UNEXPECTED and you want to HANDLE them gracefully
 * - Examples:
 *   • Parsing JSON that might be invalid
 *   • Accessing properties that might not exist
 *   • Network calls that might timeout
 * 
 *   try {
 *       const data = JSON.parse(userInput)  // Might fail if invalid JSON!
 *   } catch (error) {
 *       reject(error)  // Now we use reject to signal the failure
 *   }
 * 
 * 
 * 📌 USE reject() DIRECTLY WHEN:
 * ------------------------------
 * - You WANT the Promise to fail (it's not an accident)
 * - You're making a DECISION that the operation should fail
 * - Examples:
 *   • Validation failed (input doesn't meet requirements)
 *   • Business logic says "no" (user not authorized, etc.)
 *   • Creating a Promise that should always reject (like this task!)
 * 
 *   if (age < 18) {
 *       reject(new Error("Must be 18+"))  // Decision-based rejection
 *   }
 * 
 * 
 * ============================================================================
 * 💡 THE KEY INSIGHT - Remember This for Interviews!
 * ============================================================================
 * 
 * 
 *   ╔════════════════════════════════════════════════════════════════════╗
 *   ║                                                                     ║
 *   ║   try/catch is a SAFETY NET - it catches unexpected problems       ║
 *   ║                                                                     ║
 *   ║   reject() is a MEGAPHONE - you deliberately announce failure      ║
 *   ║                                                                     ║
 *   ║   🔑 If you WANT a Promise to reject, just call reject()!          ║
 *   ║      Don't wait for something to go wrong - make it happen.        ║
 *   ║                                                                     ║
 *   ╚════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * Another Analogy:
 * ----------------
 * - try/catch = A catcher's mitt waiting to catch wild pitches (accidents)
 * - reject()  = The umpire yelling "You're OUT!" (intentional decision)
 * 
 * You don't wait for the baseball to hit someone in the face to call them out.
 * You DECIDE they're out and call it directly!
 * 
 * 
 * ============================================================================
 * 🚀 PRACTICAL PATTERN: When You Actually Need Both Together
 * ============================================================================
 * 
 * Here's a real-world example where you'd use BOTH try/catch AND reject():
 * 
 *   function fetchUserData(userId) {
 *       return new Promise((resolve, reject) => {
 *           
 *           // 📌 DECISION-based rejection (no try/catch needed)
 *           if (!userId) {
 *               reject(new Error("User ID is required"))
 *               return
 *           }
 *           
 *           // 📌 RISKY operation that MIGHT fail
 *           try {
 *               const data = someRiskyOperation(userId)
 *               resolve(data)
 *           } catch (error) {
 *               // Caught an unexpected error, now INTENTIONALLY reject
 *               reject(error)
 *           }
 *       })
 *   }
 * 
 * See how they work together?
 * - Direct reject() for validation (you're making a decision)
 * - try/catch around risky code (safety net)
 * - reject() inside catch to signal the failure
 * 
 * 
 * ============================================================================
 * ✏️ QUICK REVISION CARD FOR INTERVIEWS
 * ============================================================================
 * 
 * Q: "What's the difference between throwing an error and rejecting a Promise?"
 * 
 * A: "throw is synchronous and bubbles up the call stack until caught by try/catch.
 *     reject() is for Promises - it transitions the Promise to a rejected state,
 *     which is then handled by .catch() or try/catch with await.
 *     
 *     A key insight is that reject() is a deliberate decision, not an accident.
 *     You call reject() when you WANT the Promise to fail based on your logic,
 *     not when something unexpectedly goes wrong."
 * 
 * Q: "Can you give an example of when you'd use reject() directly vs. 
 *     wrapping code in try/catch?"
 * 
 * A: "Use reject() directly for validation and business logic decisions:
 *       if (password.length < 8) reject(new Error('Too short'))
 *     
 *     Use try/catch when calling code that might throw unexpectedly:
 *       try { const data = JSON.parse(input); resolve(data) }
 *       catch(e) { reject(e) }
 *     
 *     The distinction is intentional vs accidental failure."
 * 
 */


// =============================================================================
// 📚 DETAILED EXPLANATION: Why Task 3's Failed Attempts Didn't Work
// =============================================================================
/**
 * ============================================================================
 * 🔴 FAILED ATTEMPT #1: Using Comparison Logic (Completely Wrong)
 * ============================================================================
 * 
 *   function safeAsyncCall(asyncFn) {
 *       return new Promise((resolve, reject) => {
 *           let trueFn = true
 *           if (trueFn == asyncFn) {          // ← Comparing boolean to function???
 *               resolve({"success: ":true, "data: ":asyncFn})
 *           }
 *           else {
 *               reject(new Error({"success: ":false, "error: ":asyncFn}))
 *           }
 *       })
 *   }
 * 
 * 
 * PROBLEMS WITH THIS CODE:
 * ------------------------
 * 
 * ❌ Problem 1: Comparing a boolean to a function
 *    - `true == asyncFn` is ALWAYS FALSE (unless asyncFn is truthy, but it's a function!)
 *    - Functions are truthy in JavaScript, so `true == asyncFn` → `true == true` → might be true
 *    - But this is logically meaningless - you're not running the function at all!
 * 
 * ❌ Problem 2: Never calling the async function
 *    - `asyncFn` is the function itself, not its result
 *    - You need to CALL it with `asyncFn()` to execute it
 * 
 * ❌ Problem 3: Wrong object key syntax
 *    - `"success: "` has a space and colon IN the key name
 *    - Should be just `"success"` or `success`
 * 
 * ❌ Problem 4: Using reject() - the spec says NEVER reject
 *    - The function should ALWAYS resolve, even on failure
 *    - Failure should be signaled via `{ success: false, error: ... }`
 * 
 * 
 * ============================================================================
 * 🔴 FAILED ATTEMPT #2: Using Sync try/catch for Async Code
 * ============================================================================
 * 
 *   function safeAsyncCall(asyncFn) {
 *       return new Promise((resolve, reject) => {
 *           try {
 *               asyncFn()                      // ← Called but not awaited!
 *               resolve({"success: ":true, "data: ":asyncFn})
 *           } catch (error) {
 *               resolve({"success: ":false, "error: ":error})
 *           }
 *       })
 *   }
 * 
 * 
 * THIS IS THE MOST IMPORTANT CONCEPT TO UNDERSTAND!
 * ==================================================
 * 
 * The KEY insight: try/catch ONLY catches SYNCHRONOUS errors!
 * 
 * 
 * 🎯 WHY DOESN'T try/catch WORK FOR async FUNCTIONS?
 * --------------------------------------------------
 * 
 * When you call `asyncFn()`, it:
 *   1. Starts executing the async function
 *   2. IMMEDIATELY returns a Promise (without waiting for completion)
 *   3. The try block finishes BEFORE the async operation completes
 *   4. Any error that happens INSIDE the async function gets "trapped" in the Promise
 *   5. The catch block NEVER sees the error!
 * 
 * 
 * ============================================================================
 * 🏠 ANALOGY: The Restaurant Kitchen
 * ============================================================================
 * 
 * Think of it like ordering food at a restaurant:
 * 
 * 
 * ❌ SYNC try/catch for ASYNC code (Your failed approach):
 * --------------------------------------------------------
 * 
 * Imagine you're at a restaurant:
 * 
 *   try {
 *       // You: "I'd like to order a steak"
 *       placeOrder("steak")  // Waiter says "order received!" and walks away
 *       
 *       // You immediately think: "Great! Success!"
 *       resolve({ success: true, data: "steak" })  // But you haven't eaten yet!
 *   } catch (error) {
 *       // This only catches problems with PLACING the order
 *       // Like if the waiter slipped and fell RIGHT NOW
 *   }
 *   
 *   // 20 minutes later, kitchen discovers they're out of steak
 *   // But you've already left the restaurant thinking you succeeded!
 * 
 * The problem: You didn't WAIT for the food to arrive. You left after placing
 * the order, assuming success. Any problems in the kitchen happen AFTER 
 * you've already declared success.
 * 
 * 
 * ✅ USING .then()/.catch() (The correct approach):
 * -------------------------------------------------
 * 
 *   placeOrder("steak")
 *       .then(food => {
 *           // Waiter ACTUALLY brings the food to your table
 *           resolve({ success: true, data: food })
 *       })
 *       .catch(problem => {
 *           // Kitchen calls to say "sorry, no steak"
 *           resolve({ success: false, error: problem.message })
 *       })
 * 
 * Now you WAIT for the actual result before deciding success or failure!
 * 
 * 
 * ============================================================================
 * 🔍 UNDER THE HOOD: Sync vs Async Error Handling
 * ============================================================================
 * 
 * SYNCHRONOUS Code (try/catch works):
 * ------------------------------------
 * 
 *   function syncFunction() {
 *       throw new Error("Boom!")  // Error thrown IMMEDIATELY
 *   }
 * 
 *   try {
 *       syncFunction()  // Error happens RIGHT HERE, RIGHT NOW
 *   } catch (e) {
 *       console.log(e)  // ✅ Caught! We're still in the same "execution tick"
 *   }
 * 
 *   Timeline:
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  Time 0ms:  try block starts                             │
 *   │  Time 0ms:  syncFunction() is called                     │
 *   │  Time 0ms:  Error is thrown IMMEDIATELY                  │
 *   │  Time 0ms:  catch block catches it                       │
 *   │  Time 0ms:  console.log runs                             │
 *   └──────────────────────────────────────────────────────────┘
 *   Everything happens in ONE synchronous flow!
 * 
 * 
 * ASYNCHRONOUS Code (try/catch FAILS):
 * ------------------------------------
 * 
 *   async function asyncFunction() {
 *       await someDelay()
 *       throw new Error("Boom!")  // Error thrown LATER
 *   }
 * 
 *   try {
 *       asyncFunction()  // Returns Promise immediately, function continues in background
 *   } catch (e) {
 *       console.log(e)  // ❌ NEVER runs - catch block already finished!
 *   }
 * 
 *   Timeline:
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  Time 0ms:    try block starts                           │
 *   │  Time 0ms:    asyncFunction() is called                  │
 *   │  Time 0ms:    Function starts, hits 'await', PAUSES      │
 *   │  Time 0ms:    Promise returned immediately               │
 *   │  Time 0ms:    try block completes (no error occurred!)   │
 *   │  Time 0ms:    Code moves on past the try/catch           │
 *   │  ...                                                     │
 *   │  Time 100ms:  await completes, function resumes          │
 *   │  Time 100ms:  throw new Error("Boom!")                   │
 *   │  Time 100ms:  Error has nowhere to go! catch already done│
 *   │  Time 100ms:  Error becomes an unhandled Promise rejection│
 *   └──────────────────────────────────────────────────────────┘
 * 
 * 
 * ============================================================================
 * ✅ THE CORRECT SOLUTION: Using .then()/.catch()
 * ============================================================================
 * 
 *   function safeAsyncCall(asyncFn) {
 *       return new Promise((resolve) => {
 *           asyncFn()
 *               .then(result => {
 *                   // Async function succeeded - we have the actual result!
 *                   resolve({ success: true, data: result })
 *               })
 *               .catch(error => {
 *                   // Async function failed - we caught the async error!
 *                   resolve({ success: false, error: error.message })
 *               })
 *       })
 *   }
 * 
 * 
 * WHY THIS WORKS:
 * ---------------
 * 1. `asyncFn()` returns a Promise
 * 2. We attach `.then()` to handle the SUCCESS case
 * 3. We attach `.catch()` to handle the FAILURE case
 * 4. No matter what happens, we call `resolve()` (never reject)
 * 5. We wait for the ACTUAL result before deciding success/failure
 * 
 * 
 * ============================================================================
 * 🚀 ALTERNATIVE: Using async/await (Even Cleaner!)
 * ============================================================================
 * 
 * You can also write this using async/await, which DOES allow try/catch:
 * 
 *   async function safeAsyncCall(asyncFn) {
 *       try {
 *           const result = await asyncFn()  // WAIT for it!
 *           return { success: true, data: result }
 *       } catch (error) {
 *           return { success: false, error: error.message }
 *       }
 *   }
 * 
 * The key is the `await` keyword - it actually WAITS for the Promise to settle!
 * This transforms the asynchronous code back into something that "looks" synchronous,
 * so try/catch works again.
 * 
 * 
 * ============================================================================
 * 📊 COMPARISON TABLE: Handling Async Errors
 * ============================================================================
 * 
 * | Method                          | Works? | Why                              |
 * |---------------------------------|--------|----------------------------------|
 * | try/catch without await         | ❌ NO  | Catch finishes before error      |
 * | try/catch with await            | ✅ YES | await pauses until result        |
 * | .then()/.catch()                | ✅ YES | Handlers run when Promise settles|
 * | Promise constructor + .catch()  | ✅ YES | Chains properly catch async error|
 * 
 * 
 * ============================================================================
 * 💡 THE KEY INSIGHT - Remember This for Interviews!
 * ============================================================================
 * 
 *   ╔════════════════════════════════════════════════════════════════════════╗
 *   ║                                                                         ║
 *   ║   🔑 SYNCHRONOUS try/catch is like a safety net that's UP for 1 second ║
 *   ║      If an acrobat falls LATER, the net is already packed up!          ║
 *   ║                                                                         ║
 *   ║   🔑 .then()/.catch() is like giving the acrobat your phone number     ║
 *   ║      "Call me WHENEVER you land, good or bad, even if it's tomorrow"   ║
 *   ║                                                                         ║
 *   ║   🔑 await is like actually STAYING to watch the whole performance     ║
 *   ║      You don't leave until you see the landing                          ║
 *   ║                                                                         ║
 *   ╚════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * ============================================================================
 * ✏️ QUICK REVISION CARD FOR INTERVIEWS
 * ============================================================================
 * 
 * Q: "Why doesn't try/catch work with async functions?"
 * 
 * A: "try/catch is synchronous - it catches errors that happen IMMEDIATELY.
 *     When you call an async function, it returns a Promise right away and
 *     continues running in the background. By the time the async error occurs,
 *     the try/catch block has already finished executing.
 *     
 *     To catch async errors, you need to either:
 *     1. Use .catch() on the Promise
 *     2. Use 'await' to pause until the Promise settles, THEN try/catch works
 *     
 *     Think of it like this: try/catch is a net that's only up for a moment.
 *     Async errors are like balls thrown later - the net's already down!"
 * 
 * Q: "What is the Result/Either pattern shown in safeAsyncCall?"
 * 
 * A: "It's a pattern where instead of throwing errors, you return an object
 *     that indicates success or failure:
 *       { success: true, data: result }  or
 *       { success: false, error: message }
 *     
 *     This makes error handling more predictable because you always get a
 *     value to work with, never an exception. It's commonly used in
 *     functional programming and makes code easier to compose."
 * 
 */


// =============================================================================
// 📚 DETAILED EXPLANATION: Why Failed Attempt #3 Was SO CLOSE But Still Failed
// =============================================================================
/**
 * ============================================================================
 * 🔴 FAILED ATTEMPT #3: Correct Logic, Wrong Syntax
 * ============================================================================
 * 
 *   return new Promise((resolve) => {
 *       asyncFn().then((result) => {
 *           resolve({"success: ":true, "data: ":result})   // ← Wrong!
 *       }).catch((err) => {
 *           resolve({"success: ":false, "data: ":err})     // ← Wrong!
 *       })
 *   })
 * 
 * 
 * You were SOOO close! The async logic was 100% correct! But you made 
 * THREE subtle but CRITICAL mistakes:
 * 
 * 
 * ============================================================================
 * ❌ MISTAKE 1: Object Key Syntax
 * ============================================================================
 * 
 * WHAT YOU WROTE:
 *   { "success: ": true, "data: ": result }
 * 
 * WHAT IT SHOULD BE:
 *   { success: true, data: result }
 *   // OR
 *   { "success": true, "data": result }
 * 
 * 
 * THE PROBLEM:
 * ------------
 * In JavaScript, when you write:
 *   { "success: ": true }
 * 
 * The KEY of the object is literally the string "success: " (with colon and space!)
 * 
 * So when the test checks for `result.success`, it gets `undefined`
 * because the actual key is `result["success: "]` not `result.success`!
 * 
 * 
 * SIDE-BY-SIDE COMPARISON:
 * ------------------------
 * 
 *   // YOUR CODE - Wrong
 *   const obj1 = { "success: ": true }
 *   console.log(obj1.success)       // undefined ❌
 *   console.log(obj1["success: "])  // true ✅ (but tests don't use this!)
 *   console.log(JSON.stringify(obj1)) // {"success: ":true}
 * 
 *   // CORRECT CODE
 *   const obj2 = { success: true }
 *   console.log(obj2.success)       // true ✅
 *   console.log(JSON.stringify(obj2)) // {"success":true}
 * 
 * 
 * 🏠 ANALOGY: Hotel Room Keys
 * ---------------------------
 * Think of object keys like hotel room numbers:
 * 
 *   - You booked room "101: "  (with colon and space)
 *   - Guest arrives and asks for room "101"
 *   - Front desk says: "Sorry, no room 101. We have room '101: ' though!"
 *   - Guest is confused, thinks room doesn't exist
 * 
 * Your object has keys with extra characters, so lookups fail!
 * 
 * 
 * ============================================================================
 * ❌ MISTAKE 2: Wrong Key in Catch Block
 * ============================================================================
 * 
 * WHAT YOU WROTE:
 *   .catch((err) => {
 *       resolve({"success: ":false, "data: ":err})  // Using "data: "
 *   })
 * 
 * WHAT IT SHOULD BE:
 *   .catch((error) => {
 *       resolve({ success: false, error: error.message })  // Using "error"
 *   })
 * 
 * 
 * THE PROBLEM:
 * ------------
 * According to the specification, failed cases should return:
 *   { success: false, error: errorMessage }
 *               ^^^^^
 *               NOT "data"!
 * 
 * The tests expect the error message to be in a property called `error`,
 * not `data`. Using `data` for errors makes no semantic sense anyway -
 * data is for successful results!
 * 
 * 
 * ============================================================================
 * ❌ MISTAKE 3: Passing Error Object Instead of Message
 * ============================================================================
 * 
 * WHAT YOU WROTE:
 *   resolve({"success: ":false, "data: ":err})  // Passing the whole error object
 * 
 * WHAT IT SHOULD BE:
 *   resolve({ success: false, error: err.message })  // Extracting just the message
 * 
 * 
 * THE PROBLEM:
 * ------------
 * JavaScript Error objects have many properties:
 * 
 *   const err = new Error("oops")
 *   console.log(err)          // Error: oops
 *   console.log(err.message)  // "oops"      ← Just the message string
 *   console.log(err.stack)    // Full stack trace
 *   console.log(err.name)     // "Error"
 * 
 * When you pass the whole error object, JSON.stringify converts it to `{}`
 * because Error objects don't serialize nicely:
 * 
 *   JSON.stringify(new Error("oops"))  // "{}"  ← Empty object!
 * 
 * That's why your test showed: `"data: ":{}` - the error became empty!
 * 
 * 
 * ============================================================================
 * ✅ THE CORRECT VERSION
 * ============================================================================
 * 
 *   return new Promise((resolve) => {
 *       asyncFn()
 *           .then(result => {
 *               resolve({ success: true, data: result })
 *           //           ↑ No quotes   ↑ No colon/space in key
 *           })
 *           .catch(error => {
 *               resolve({ success: false, error: error.message })
 *           //                            ↑ "error" not "data"
 *           //                                    ↑ .message not whole object
 *           })
 *   })
 * 
 * 
 * ============================================================================
 * 📊 Visual Diff: Your Code vs Correct Code
 * ============================================================================
 * 
 *   YOUR CODE:
 *   ┌─────────────────────────────────────────────────────────────────┐
 *   │ resolve({"success: ":true, "data: ":result})                    │
 *   │          ↑ Wrong    ↑ Wrong                                     │
 *   │ resolve({"success: ":false, "data: ":err})                      │
 *   │          ↑ Wrong     ↑ Should be "error"  ↑ Should be .message  │
 *   └─────────────────────────────────────────────────────────────────┘
 * 
 *   CORRECT CODE:
 *   ┌─────────────────────────────────────────────────────────────────┐
 *   │ resolve({ success: true, data: result })                        │
 *   │           ↑ Clean key                                           │
 *   │ resolve({ success: false, error: error.message })               │
 *   │                           ↑ Right key   ↑ Extract message       │
 *   └─────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ============================================================================
 * 💡 KEY LESSONS - Remember These!
 * ============================================================================
 * 
 *   ╔════════════════════════════════════════════════════════════════════════╗
 *   ║                                                                         ║
 *   ║   🔑 Object keys should be clean identifiers (no colons/spaces inside) ║
 *   ║      { success: true }  NOT  { "success: ": true }                     ║
 *   ║                                                                         ║
 *   ║   🔑 Match the specification exactly - if it says "error", use "error" ║
 *   ║      Don't use "data" for error cases!                                 ║
 *   ║                                                                         ║
 *   ║   🔑 Error objects don't serialize well - extract .message first       ║
 *   ║      JSON.stringify(error) → "{}"  😱                                  ║
 *   ║      JSON.stringify({error: error.message}) → '{"error":"oops"}' ✅    ║
 *   ║                                                                         ║
 *   ╚════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * ============================================================================
 * ✏️ INTERVIEW TIP: Object Key Syntax in JavaScript
 * ============================================================================
 * 
 * Q: "What are valid object key syntaxes in JavaScript?"
 * 
 * A: "There are three ways to define object keys:
 * 
 *     1. IDENTIFIER syntax (preferred for clean keys):
 *        { name: 'John', age: 30 }
 * 
 *     2. STRING syntax (for keys with special characters):
 *        { 'first-name': 'John', '123': 'numeric key' }
 * 
 *     3. COMPUTED syntax (for dynamic keys):
 *        const key = 'name'
 *        { [key]: 'John' }  // Same as { name: 'John' }
 * 
 *     The key insight is that the STRING you put in quotes becomes the
 *     LITERAL key. So { 'success: ': true } creates a key that literally
 *     has a colon and space in it - probably not what you want!"
 * 
 */
