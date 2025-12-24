/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 WHY `Promise { <pending> }` APPEARS - EXPLAINED WITH ANALOGY!
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * YOUR QUESTION:
 * ──────────────
 * Why does getUserData1() print the data correctly,
 * but `let myData1 = getUserData1(); console.log(myData1);` shows Promise { <pending> }?
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  🍕 ANALOGY: Think of it like ordering a PIZZA!                            │
 * │                                                                             │
 * │  getUserData1() is like placing a pizza order.                             │
 * │  fetchUserData1() is like the kitchen making the pizza (takes 3 seconds). │
 * │                                                                             │
 * │  SCENARIO 1: getUserData1()                                                 │
 * │  ─────────────────────────────────────────────────────────────────────────  │
 * │  You: "Order pizza please!"                                                 │
 * │  Staff: "Sure! Here's your ORDER TOKEN" (Promise)                          │
 * │  You: Don't care about the token, just wait...                             │
 * │  (After 3 seconds, pizza is ready and console.log INSIDE the function runs)│
 * │  Output: { name: 'Sayantan Pal', url: '...' } ✅                            │
 * │                                                                             │
 * │  SCENARIO 2: let myData1 = getUserData1(); console.log(myData1)            │
 * │  ─────────────────────────────────────────────────────────────────────────  │
 * │  You: "Order pizza please!"                                                 │
 * │  Staff: "Sure! Here's your ORDER TOKEN" (Promise)                          │
 * │  You: "What's in my hand?" → console.log(myData1)                          │
 * │  You see: ORDER TOKEN (Promise { <pending> }) ❌                           │
 * │  (Pizza is still being made! You checked too early!)                       │
 * │                                                                             │
 * │  ...3 seconds later...                                                      │
 * │  (Pizza is ready, console.log INSIDE the function runs)                    │
 * │  Output: { name: 'Sayantan Pal', url: '...' }                               │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔑 THE GOLDEN RULE TO REMEMBER:
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 *   📌 An `async` function ALWAYS returns a PROMISE immediately!
 *   📌 Even if you use `await` INSIDE, the OUTSIDE world gets a Promise!
 *   📌 The `await` only pauses things INSIDE the async function, not outside!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📊 STEP-BY-STEP EXECUTION BREAKDOWN:
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * When you run your code, here's EXACTLY what happens:
 * 
 *   TIME     │  CODE LINE                           │  WHAT HAPPENS
 *   ─────────┼──────────────────────────────────────┼───────────────────────────────
 *   0ms      │ getUserData1()                       │ Starts executing, returns Promise
 *            │                                      │ (goes to background kitchen 🍕)
 *   ─────────┼──────────────────────────────────────┼───────────────────────────────
 *   0ms      │ let myData1 = getUserData1()         │ Gets Promise { <pending> }
 *   ─────────┼──────────────────────────────────────┼───────────────────────────────
 *   0ms      │ console.log(myData1)                 │ Prints: Promise { <pending> }
 *            │                                      │ (Pizza not ready yet!)
 *   ─────────┼──────────────────────────────────────┼───────────────────────────────
 *   3000ms   │ (Inside getUserData1())              │ fetchUserData1() resolves!
 *            │ console.log(fetchedData)             │ Prints: { name: 'Sayantan...'}
 *   ─────────┼──────────────────────────────────────┼───────────────────────────────
 *   3000ms   │ (2nd call also completes)            │ Prints: { name: 'Sayantan...'}
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * ✅ HOW TO FIX IT - GET THE ACTUAL DATA!
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * OPTION 1: Use .then() (Promise way)
 * ────────────────────────────────────
 *   getUserData1().then((data) => {
 *       console.log(data);  // Now you get the actual data!
 *   });
 * 
 * OPTION 2: Use await (must be inside another async function!)
 * ─────────────────────────────────────────────────────────────
 *   const main = async () => {
 *       let myData1 = await getUserData1();  // ← await here!
 *       console.log(myData1);  // Now you get the actual data!
 *   };
 *   main();
 * 
 * OPTION 3: Use IIFE (Immediately Invoked Function Expression)
 * ─────────────────────────────────────────────────────────────
 *   (async () => {
 *       let myData1 = await getUserData1();
 *       console.log(myData1);  // Now you get the actual data!
 *   })();
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎓 INTERVIEW ONE-LINER:
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 *   "An async function ALWAYS returns a Promise immediately. The await keyword
 *    only pauses execution INSIDE the async function, not the code that called it.
 *    To get the resolved value outside, you must use .then() or await it in
 *    another async context."
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📋 QUICK CHEAT SHEET:
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 *   ┌─────────────────────────────────────┬────────────────────────────────────┐
 *   │ What you write                      │ What you get                       │
 *   ├─────────────────────────────────────┼────────────────────────────────────┤
 *   │ let x = asyncFunc()                 │ Promise { <pending> }              │
 *   │ let x = await asyncFunc()           │ Actual resolved value ✅            │
 *   │ asyncFunc().then(x => console.log)  │ Actual resolved value ✅            │
 *   └─────────────────────────────────────┴────────────────────────────────────┘
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

let fetchUserData1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: "Sayantan Pal",
                url: "https://www.google.com"
            });
        }, 3000);
    });
};

const getUserData1 = async () => {
    try {
        let fetchedData = await fetchUserData1();
        console.log(fetchedData);
        
    } catch (err) {
        console.error(err.message)
    }

};
getUserData1() //output: after 3 seconds it will print the data { name: 'Sayantan Pal', url: 'https://www.google.com' }

let myData1 = getUserData1();
console.log(myData1);
//output: Promise { <pending> } 
// after 3 seconds it will print the data 
// { name: 'Sayantan Pal', url: 'https://www.google.com' }









/**
 * ============================================================================
 *                    🚀 ASYNC/AWAIT IN JAVASCRIPT 🚀
 *                   (Interview Revision for Beginners)
 * ============================================================================
 *
 * @concept What is Async/Await?
 * 
 * Async/Await is syntactic sugar over Promises that makes asynchronous code
 * look and behave like synchronous code. It was introduced in ES2017 (ES8).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 🎯 SIMPLE ANALOGY - The Restaurant Order
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * Imagine you're at a restaurant:
 * 
 * ❌ SYNCHRONOUS (Blocking):
 *    You order food → You STAND at the counter waiting → Food arrives → You eat
 *    (You can't do ANYTHING else while waiting!)
 * 
 * ✅ ASYNCHRONOUS with Async/Await:
 *    You order food → Waiter says "I'll bring it when ready" → 
 *    You sit down, chat with friends (do other things) →
 *    Waiter brings food when ready → You eat
 * 
 * The `await` keyword is like telling JavaScript: 
 * "Wait for this task to complete before moving to the next line,
 *  BUT don't block other operations in the program!"
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 📚 KEY CONCEPTS TO REMEMBER
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * 1️⃣ `async` KEYWORD:
 *    - Put before a function to make it return a Promise automatically
 *    - Allows you to use `await` inside that function
 * 
 * 2️⃣ `await` KEYWORD:
 *    - Pauses execution INSIDE the async function until Promise resolves
 *    - Can ONLY be used inside an async function (or top-level in modules)
 *    - Returns the resolved value of the Promise
 * 
 * 3️⃣ ERROR HANDLING:
 *    - Use try...catch blocks (just like synchronous code!)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 💻 CODE EXAMPLES
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 1: Basic Async/Await Syntax
// ─────────────────────────────────────────────────────────────────

// Simulating an API call that takes 2 seconds
function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "Sayatan", age: 20, college: "IIT" });
        }, 2000);
    });
}

// Using async/await
async function displayUser() {
    console.log("Fetching user data...");
    
    const user = await fetchUserData();  // Waits here until Promise resolves
    
    console.log("User:", user);  // This runs AFTER fetchUserData completes
    return user;
}

// displayUser();

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 2: Comparing Promises vs Async/Await
// ─────────────────────────────────────────────────────────────────

// ❌ Using Promises (Callback-style, can get messy)
function getDataWithPromise() {
    fetchUserData()
        .then((user) => {
            console.log("Promise way:", user);
            return user;
        })
        .catch((error) => {
            console.log("Error:", error);
        });
}

// ✅ Using Async/Await (Cleaner, more readable!)
async function getDataWithAsyncAwait() {
    try {
        const user = await fetchUserData();
        console.log("Async/Await way:", user);
        return user;
    } catch (error) {
        console.log("Error:", error);
    }
}

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 3: Error Handling with Try...Catch
// ─────────────────────────────────────────────────────────────────

function mightFail() {
    return new Promise((resolve, reject) => {
        const random = Math.random();
        if (random > 0.5) {
            resolve("Success! ✅");
        } else {
            reject(new Error("Failed! ❌"));
        }
    });
}

async function handleErrors() {
    try {
        const result = await mightFail();
        console.log(result);
    } catch (error) {
        console.log("Caught error:", error.message);
    } finally {
        console.log("This always runs!");
    }
}

// handleErrors();

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 4: Multiple Awaits (Sequential vs Parallel)
// ─────────────────────────────────────────────────────────────────

function task1() {
    return new Promise(resolve => setTimeout(() => resolve("Task 1 done"), 1000));
}

function task2() {
    return new Promise(resolve => setTimeout(() => resolve("Task 2 done"), 1000));
}

// ❌ SEQUENTIAL: Takes 2 seconds (1s + 1s)
async function sequentialTasks() {
    const result1 = await task1();  // Wait 1 second
    const result2 = await task2();  // Then wait another 1 second
    console.log(result1, result2);
}

// ✅ PARALLEL: Takes only 1 second (both run together!)
async function parallelTasks() {
    const [result1, result2] = await Promise.all([task1(), task2()]);
    console.log(result1, result2);
}

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 5: Real-World API Fetch Example
// ─────────────────────────────────────────────────────────────────

async function fetchGitHubUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error(`User not found: ${response.status}`);
        }
        
        const data = await response.json();  // await again for JSON parsing
        console.log("GitHub User:", data.login, "- Followers:", data.followers);
        return data;
    } catch (error) {
        console.log("Error fetching user:", error.message);
    }
}

// fetchGitHubUser("sayantan007pal");

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * 🧠 INTERVIEW CHEAT SHEET
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * Q1: What is async/await?
 * A:  Syntactic sugar over Promises that makes async code look synchronous.
 *     - `async` makes a function return a Promise
 *     - `await` pauses execution until Promise resolves
 * 
 * Q2: Can we use await without async?
 * A:  No! `await` can ONLY be used inside an `async` function 
 *     (except top-level await in ES modules).
 * 
 * Q3: How do you handle errors in async/await?
 * A:  Use try...catch blocks (just like normal synchronous code!)
 * 
 * Q4: What does an async function return?
 * A:  ALWAYS returns a Promise, even if you return a regular value.
 *     Example: async function foo() { return 5; } 
 *              // Returns Promise that resolves to 5
 * 
 * Q5: Async/Await vs Promises?
 * A:  Same functionality, but async/await is:
 *     - More readable (no .then() chains)
 *     - Easier error handling (try...catch)
 *     - Easier debugging (line-by-line execution)
 * 
 * Q6: How to run async operations in parallel?
 * A:  Use Promise.all([promise1, promise2, ...])
 *     Example: await Promise.all([fetch(url1), fetch(url2)])
 * 
 * Q7: What happens if you forget to await?
 * A:  You get the Promise object itself, NOT the resolved value!
 *     The code continues without waiting for completion.
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 📊 VISUAL FLOW
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 *    async function example() {
 *        console.log("1");        // Runs immediately
 *        
 *        await somePromise();     // ⏸️ PAUSES here until Promise resolves
 *                                 // (Other code outside this function can run!)
 *        
 *        console.log("2");        // Runs AFTER Promise resolves
 *    }
 * 
 *    example();
 *    console.log("3");            // This runs BEFORE "2" (non-blocking!)
 * 
 *    OUTPUT: 1, 3, 2  (Not 1, 2, 3!)
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ COMMON MISTAKES TO AVOID
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * 1. Forgetting await → Gets Promise object instead of value
 * 2. Using await in regular function → SyntaxError!
 * 3. Not handling errors → Unhandled Promise rejection
 * 4. Sequential awaits when parallel is possible → Slower performance
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🎓 KEY TAKEAWAYS FOR INTERVIEWS
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * ✅ async/await = cleaner way to work with Promises
 * ✅ async function ALWAYS returns a Promise
 * ✅ await pauses function, NOT the entire program
 * ✅ Use try...catch for error handling
 * ✅ Use Promise.all() for parallel operations
 * ✅ Don't forget to await, or you'll get the Promise object!
 * 
 * ============================================================================
 */

