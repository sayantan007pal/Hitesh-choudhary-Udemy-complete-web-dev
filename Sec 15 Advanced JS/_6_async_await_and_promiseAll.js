const fetchPostData1 = () =>{
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve(`Post data fetched successfully`)
        },2000)
    })
}

const fetchCommentData1 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Comment data fetched successfully`);
        }, 5000);
    });
};

// using await which fetches data one by one
// await pauses the function until the promise resolves
// await is only used inside async functions
const getBlogPost = async ()=> {
    try {
        console.log(`beginning to fetch data`)
        const post1 = await fetchPostData1()
        const comment1 = await fetchCommentData1()
        console.log(post1)
        console.log(comment1)
        console.log(`blog's posts :${post1} and blog's comments :${comment1}`)
        console.log(`all data fetched successfully`)
    } catch (err) {
        console.error(err)
    }
}
// fetchCommentData1()
// fetchPostData1()
getBlogPost()




// using Promise.all instead of await
// Promise.all runs multiple promises in parallel
// Promise.all returns an array of resolved values
const getBlogPost2 = async ()=> {
    try {
        console.log(`beginning to fetch data`)
        const [post1,comment1] = await Promise.all([fetchPostData1(),fetchCommentData1()])
        console.log(post1)
        console.log(comment1)
        console.log(`blog's posts :${post1} and blog's comments :${comment1}`)
        console.log(`all data fetched successfully`)
    } catch (err) {
        console.error(err)
    }
}
// fetchCommentData1()
// fetchPostData1()
getBlogPost2()



















/**
 * ============================================================================
 * 🚀 ASYNC/AWAIT + PROMISE.ALL + TRY-CATCH - Interview Revision Guide
 * ============================================================================
 * 
 * @concept What is async/await?
 * ─────────────────────────────
 * • `async` - A keyword that makes a function return a Promise automatically
 * • `await` - A keyword that PAUSES the function until a Promise resolves
 * • Together, they make asynchronous code look like synchronous code! ✨
 * 
 * 
 * @analogy Think of it like ordering food at a restaurant:
 * ─────────────────────────────────────────────────────────
 * 
 *   WITHOUT async/await (Callback Hell):
 *   "Order pizza, then when pizza comes, order drink, then when drink comes, order dessert..."
 *   → Nested, messy, hard to read! 😵
 * 
 *   WITH async/await:
 *   "await orderPizza(), await orderDrink(), await orderDessert()"
 *   → Clean, sequential, easy to read! 😊
 * 
 * 
 * ============================================================================
 * @concept What is Promise.all?
 * ============================================================================
 * 
 * Promise.all() runs MULTIPLE promises IN PARALLEL (at the same time)!
 * 
 * @analogy Restaurant Example:
 * ────────────────────────────
 *   SEQUENTIAL (one by one):     PARALLEL (Promise.all):
 *   ┌─────────────────────┐      ┌─────────────────────┐
 *   │ Order Pizza (5 min) │      │ Order Pizza ─┐      │
 *   │        ↓            │      │ Order Drink ─┼── All at once!
 *   │ Order Drink (2 min) │      │ Order Dessert┘      │
 *   │        ↓            │      │                     │
 *   │ Order Dessert(3min) │      │ Total: 5 min (max)  │
 *   │                     │      │                     │
 *   │ Total: 10 minutes   │      │ 🚀 Much Faster!     │
 *   └─────────────────────┘      └─────────────────────┘
 * 
 * 
 * ============================================================================
 * @concept Why try-catch with async/await?
 * ============================================================================
 * 
 * ⚠️ Promises can FAIL (reject)! try-catch catches those errors gracefully.
 * 
 *   Without try-catch: App crashes if any promise fails! 💥
 *   With try-catch:    Error is caught, app continues! ✅
 * 
 * 
 * ============================================================================
 * 📝 CODE EXAMPLES
 * ============================================================================
 */

// 🔹 Example 1: Basic async/await with try-catch
// ───────────────────────────────────────────────
async function fetchUserData() {
    try {
        // await PAUSES here until the promise resolves
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        console.log('User:', data);
        return data;
    } catch (error) {
        // If ANYTHING fails above, we land here
        console.error('Failed to fetch user:', error.message);
    }
}


// 🔹 Example 2: Promise.all - Running multiple promises in PARALLEL
// ──────────────────────────────────────────────────────────────────
async function fetchAllData() {
    try {
        // All 3 API calls start at the SAME TIME! ⚡
        const [users, posts, comments] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json()),
            fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json()),
            fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
        ]);

        console.log('Users:', users);
        console.log('Posts:', posts);
        console.log('Comments:', comments);
        
    } catch (error) {
        // ⚠️ If ANY ONE promise fails, ALL of Promise.all fails!
        console.error('One of the requests failed:', error.message);
    }
}


// 🔹 Example 3: Sequential vs Parallel - See the difference!
// ──────────────────────────────────────────────────────────

// Simulating API calls with delays
const fetchUser = () => new Promise(resolve => 
    setTimeout(() => resolve({ name: 'John' }), 2000)  // Takes 2 seconds
);

const fetchOrders = () => new Promise(resolve => 
    setTimeout(() => resolve(['Order1', 'Order2']), 1500)  // Takes 1.5 seconds
);

const fetchProducts = () => new Promise(resolve => 
    setTimeout(() => resolve(['Product1', 'Product2']), 1000)  // Takes 1 second
);

// ❌ SEQUENTIAL - Total time: 2 + 1.5 + 1 = 4.5 seconds
async function fetchSequentially() {
    console.time('Sequential');
    try {
        const user = await fetchUser();       // Wait 2 sec
        const orders = await fetchOrders();   // Then wait 1.5 sec
        const products = await fetchProducts(); // Then wait 1 sec
        console.log({ user, orders, products });
    } catch (error) {
        console.error(error);
    }
    console.timeEnd('Sequential'); // ~4.5 seconds
}

// ✅ PARALLEL - Total time: max(2, 1.5, 1) = 2 seconds only!
async function fetchInParallel() {
    console.time('Parallel');
    try {
        // All start at the same time!
        const [user, orders, products] = await Promise.all([
            fetchUser(),
            fetchOrders(),
            fetchProducts()
        ]);
        console.log({ user, orders, products });
    } catch (error) {
        console.error(error);
    }
    console.timeEnd('Parallel'); // ~2 seconds (much faster!)
}


/**
 * ============================================================================
 * 🎯 INTERVIEW CHEAT SHEET
 * ============================================================================
 * 
 * Q1: What does `async` keyword do?
 * A: Makes a function return a Promise automatically. Allows use of `await` inside.
 * 
 * Q2: What does `await` keyword do?
 * A: Pauses async function execution until the Promise settles (resolves/rejects).
 *    Can ONLY be used inside an async function!
 * 
 * Q3: Why use try-catch with async/await?
 * A: To handle errors gracefully. If a Promise rejects, the error is caught
 *    in the catch block instead of crashing the app.
 * 
 * Q4: What is Promise.all?
 * A: Runs multiple promises in parallel and waits for ALL to complete.
 *    Returns an array of results in the same order as promises.
 * 
 * Q5: What happens if one Promise fails in Promise.all?
 * A: The ENTIRE Promise.all fails immediately (fail-fast behavior).
 *    Use Promise.allSettled() if you want results even when some fail.
 * 
 * Q6: When to use sequential await vs Promise.all?
 * A: - Sequential: When promises DEPEND on each other (need result of first for second)
 *    - Promise.all: When promises are INDEPENDENT (can run at same time)
 * 
 * 
 * ============================================================================
 * 🔑 KEY SYNTAX PATTERNS TO REMEMBER
 * ============================================================================
 * 
 *   // Pattern 1: Basic async/await with try-catch
 *   async function myFunction() {
 *       try {
 *           const result = await someAsyncOperation();
 *           return result;
 *       } catch (error) {
 *           console.error(error);
 *       }
 *   }
 * 
 *   // Pattern 2: Promise.all with array destructuring
 *   const [a, b, c] = await Promise.all([promiseA(), promiseB(), promiseC()]);
 * 
 *   // Pattern 3: Arrow function version
 *   const fetchData = async () => {
 *       try {
 *           const data = await fetch(url);
 *           return data.json();
 *       } catch (err) {
 *           throw err;
 *       }
 *   };
 * 
 * 
 * ============================================================================
 * ⚠️ COMMON MISTAKES TO AVOID
 * ============================================================================
 * 
 * ❌ Using await outside async function:
 *    const data = await fetch(url);  // SyntaxError!
 * 
 * ❌ Forgetting try-catch (unhandled rejection):
 *    async function bad() {
 *        const data = await mightFail();  // If this fails, app crashes!
 *    }
 * 
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  ⚠️⚠️⚠️ VERY IMPORTANT - COMMON INTERVIEW QUESTION ⚠️⚠️⚠️                  ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  ❌ Using await in a loop when you could use Promise.all:                 ║
 * ║     for (const id of ids) {                                               ║
 * ║         await fetch(id);  // SLOW! Each waits for previous                ║
 * ║     }                                                                     ║
 * ║                                                                           ║
 * ║  ✅ BETTER: await Promise.all(ids.map(id => fetch(id))); 
 * or
 * ║          await Promise.all(ids.map(id=> fetch(id).then(res=> res.json())))                                                                 ║
 * ║  💡 This is a MAJOR performance optimization!                             ║
 * ║     → Loop with await: O(n) time (sequential)                             ║
 * ║     → Promise.all: O(1) time complexity (parallel)                        ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * ============================================================================
 */

// 🚀 Run the examples to see the difference!
// fetchSequentially();   // Uncomment to test
// fetchInParallel();     // Uncomment to test
