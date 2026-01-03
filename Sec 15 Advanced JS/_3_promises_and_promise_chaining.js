let fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;  // Simulate success/failure condition
            
            if (success) {
                resolve("Data sent successfully");
            } else {
                reject("Data failed to send");
            }
        }, 5000);  // 5 seconds (50000 = 50 seconds, probably too long!)
    });
};

// Using the promise
let get_Data = fetchData()
    .then((result) => {
        console.log(result) // Data sent successfully executed after 5 seconds
        return `testing then chaining`})
    .then((result) => console.log(result)) // testing then chaining executed after 5 seconds which is then passed to the next then via result
    .catch((error) => console.log(error));

console.log(get_Data) // Promise { <pending> } as it is not resolved or rejected 









/*
╔══════════════════════════════════════════════════════════════════════════════╗
║            🎯 PROMISES & PROMISE CHAINING - INTERVIEW REVISION GUIDE         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  📚 QUICK DEFINITION:                                                        ║
║  A Promise is an object representing the eventual completion (or failure)    ║
║  of an asynchronous operation. Think of it as a "receipt" for future data!   ║
╚══════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────┐
│                          🍕 PIZZA ORDER ANALOGY                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Ordering pizza = calling an async function                                  │
│  Receipt you get = Promise                                                   │
│  Pizza arrives = Promise RESOLVED ✅                                         │
│  Kitchen on fire = Promise REJECTED ❌                                       │
│  Waiting for pizza = Promise PENDING ⏳                                      │
└─────────────────────────────────────────────────────────────────────────────┘

══════════════════════════════════════════════════════════════════════════════
                        📊 THREE STATES OF A PROMISE
══════════════════════════════════════════════════════════════════════════════
  
  ┌───────────┐         ┌────────────┐
  │  PENDING  │ ──────► │ FULFILLED  │ (success - resolved with a value)
  │  (waiting)│         └────────────┘
  └─────┬─────┘               
        │               ┌────────────┐
        └─────────────► │  REJECTED  │ (failure - rejected with an error)
                        └────────────┘

══════════════════════════════════════════════════════════════════════════════
                    🛠️ WAYS TO CREATE & USE PROMISES
══════════════════════════════════════════════════════════════════════════════

────────────────────────────────────────────────────────────────────────────────
🔹 METHOD 1: CREATING A PROMISE (Producer)
────────────────────────────────────────────────────────────────────────────────
*/

// Basic Promise creation
const myPromise = new Promise((resolve, reject) => {
    // Simulating async operation (like API call, file read, etc.)
    const success = true;
    
    if (success) {
        resolve("Operation successful! ✅");  // Promise FULFILLED
    } else {
        reject("Something went wrong! ❌");   // Promise REJECTED
    }
});

/*
────────────────────────────────────────────────────────────────────────────────
🔹 METHOD 2: CONSUMING PROMISES with .then() and .catch() (Consumer)
────────────────────────────────────────────────────────────────────────────────
  .then()  → handles successful resolution (FULFILLED state)
  .catch() → handles errors/rejections (REJECTED state)
  .finally() → runs ALWAYS, regardless of success or failure
*/

// Example: Consuming the promise
myPromise
    .then((result) => {
        console.log("Success:", result);
    })
    .catch((error) => {
        console.log("Error:", error);
    })
    .finally(() => {
        console.log("Promise settled (resolved or rejected)");
    });

/*
────────────────────────────────────────────────────────────────────────────────
🔹 METHOD 3: PROMISE CHAINING (Handling Sequential Async Operations)
────────────────────────────────────────────────────────────────────────────────

  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │ Promise 1   │────►│ .then()     │────►│ .then()     │────►│ .catch()    │
  │ (fetch user)│     │(process data)│     │(save to DB) │     │(handle err) │
  └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘

  KEY RULE: Each .then() returns a NEW promise, enabling chaining!
*/

// Simulating API calls that depend on each other
function fetchUser(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("1️⃣ User fetched");
            resolve({ id: userId, name: "Rahul" });
        }, 1000);
    });
}

function fetchUserPosts(user) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("2️⃣ Posts fetched for:", user.name);
            resolve(["Post 1", "Post 2", "Post 3"]);
        }, 1000);
    });
}

function fetchPostComments(posts) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("3️⃣ Comments fetched for", posts.length, "posts");
            resolve(["Comment A", "Comment B"]);
        }, 1000);
    });
}

// ⛓️ PROMISE CHAINING IN ACTION
// Each .then() receives the result from the previous promise
fetchUser(1)
    .then((user) => fetchUserPosts(user))       // Returns promise
    .then((posts) => fetchPostComments(posts))  // Returns promise
    .then((comments) => {
        console.log("4️⃣ Final result - Comments:", comments);
    })
    .catch((error) => {
        console.log("Error anywhere in chain:", error);
    });

/*
────────────────────────────────────────────────────────────────────────────────
🔹 METHOD 4: ASYNC/AWAIT - Modern & Clean Syntax (ES2017+)
────────────────────────────────────────────────────────────────────────────────
  - async function → automatically returns a Promise
  - await → pauses execution until Promise resolves (makes async code look sync!)
  
  SAME THING, CLEANER SYNTAX! 🧹
*/

async function getUserData() {
    try {
        const user = await fetchUser(1);            // Wait for user
        const posts = await fetchUserPosts(user);   // Wait for posts
        const comments = await fetchPostComments(posts); // Wait for comments
        
        console.log("Got all data:", comments);
        return comments;
    } catch (error) {
        console.log("Error:", error);
    } finally {
        console.log("Async operation complete!");
    }
}

// Call the async function
getUserData();

/*
────────────────────────────────────────────────────────────────────────────────
🔹 METHOD 5: PROMISE STATIC METHODS (Handle Multiple Promises)
────────────────────────────────────────────────────────────────────────────────
*/

const promise1 = Promise.resolve("First");
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Second"), 1000));
const promise3 = new Promise((resolve) => setTimeout(() => resolve("Third"), 500));

// 📌 Promise.all() - Wait for ALL to complete (fails fast if any rejects)
Promise.all([promise1, promise2, promise3])
    .then((results) => console.log("All resolved:", results))
    .catch((error) => console.log("One failed:", error));
// Output: ["First", "Second", "Third"] - In order of array, NOT completion time!

// 📌 Promise.allSettled() - Wait for ALL, get status of each (no fail fast)
Promise.allSettled([promise1, promise2, Promise.reject("Failed!")])
    .then((results) => console.log("All settled:", results));
// Returns: [{status: 'fulfilled', value: 'First'}, ..., {status: 'rejected', reason: 'Failed!'}]

// 📌 Promise.race() - First to complete wins (resolve OR reject)
Promise.race([promise2, promise3])
    .then((winner) => console.log("Race winner:", winner));
// Output: "Third" (because it resolves in 500ms, before promise2's 1000ms)

// 📌 Promise.any() - First to RESOLVE wins (ignores rejections until all reject)
Promise.any([Promise.reject("Error1"), promise3, promise2])
    .then((winner) => console.log("Any winner:", winner));
// Output: "Third" (first successful resolution)

/*
══════════════════════════════════════════════════════════════════════════════
                    🎯 INTERVIEW CHEAT SHEET - KEY POINTS
══════════════════════════════════════════════════════════════════════════════

┌────────────────────────────────────────────────────────────────────────────┐
│                          MUST-KNOW CONCEPTS                                 │
├────────────────────────────────────────────────────────────────────────────┤
│ 1. Promise has 3 states: PENDING → FULFILLED or REJECTED                   │
│ 2. .then() handles success, .catch() handles errors                        │
│ 3. Each .then() returns a NEW promise (enables chaining)                   │
│ 4. async/await is syntactic sugar over promises (cleaner code)             │
│ 5. Always use try/catch with async/await for error handling                │
│ 6. Promise.all() fails fast; Promise.allSettled() waits for all            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                    COMMON INTERVIEW QUESTIONS                               │
├────────────────────────────────────────────────────────────────────────────┤
│ Q: Difference between callback and promise?                                 │
│ A: Promises avoid "callback hell", provide .catch() for errors, and        │
│    allow chaining. Callbacks can lead to nested, hard-to-read code.        │
│                                                                             │
│ Q: Can you use await outside async function?                                │
│ A: Only in ES modules with top-level await (Node 14.8+), otherwise NO.     │
│                                                                             │
│ Q: Difference between Promise.all() vs Promise.race()?                      │
│ A: .all() waits for ALL, .race() returns first to settle (resolve/reject)  │
│                                                                             │
│ Q: What happens if you don't handle a rejected promise?                     │
│ A: UnhandledPromiseRejection warning/error. Always use .catch()!           │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                      COMPARISON: THEN/CATCH VS ASYNC/AWAIT                  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  // Using .then()/.catch()              // Using async/await                │
│  fetchUser(1)                           async function getData() {         │
│    .then(user => fetchPosts(user))        try {                            │
│    .then(posts => console.log(posts))       const user = await fetchUser(1)│
│    .catch(err => console.log(err));         const posts = await fetchPosts(user);       │
│                                             console.log(posts);            │
│                                           } catch(err) {                   │
│                                             console.log(err);              │
│                                           }                                │
│                                         }                                  │
│                                                                             │
│  Both do the SAME thing! async/await is just cleaner to read. 🧹          │
└────────────────────────────────────────────────────────────────────────────┘

══════════════════════════════════════════════════════════════════════════════
                    ⚠️ COMMON MISTAKES TO AVOID
══════════════════════════════════════════════════════════════════════════════

❌ MISTAKE 1: Forgetting to return in .then() chain
   .then(user => fetchPosts(user))  ✅ Correct (implicit return)
   .then(user => { fetchPosts(user) })  ❌ Wrong! No return statement!

❌ MISTAKE 2: Not handling promise rejections
   Always add .catch() or use try/catch with async/await!

❌ MISTAKE 3: Using await without async
   const data = await fetch(url);  ❌ Error if not inside async function!

❌ MISTAKE 4: Treating async function like sync
   const result = asyncFunc();  ❌ result is a Promise, not the value!
   const result = await asyncFunc();  ✅ Now result is the actual value!

══════════════════════════════════════════════════════════════════════════════
*/

// 🧪 Practice: Try running this file with: node promises_and_promise_chaining.js
