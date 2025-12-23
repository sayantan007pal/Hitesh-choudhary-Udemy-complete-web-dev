/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                     CLOSURES IN JAVASCRIPT                                   ║
 * ║                 🎯 Interview Revision Guide for Beginners 🎯                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * 📖 SIMPLE DEFINITION (Learn this for interviews!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * "A closure is a function that REMEMBERS the variables from the place 
 *  where it was created, even after that outer function has finished running."
 * 
 * 
 * 🎒 EASY ANALOGY: THE BACKPACK
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Think of it like this:
 *   - You (inner function) leave your home (outer function)
 *   - You carry a backpack (closure) with items from home (outer variables)
 *   - Even when you're far away, you still have access to those items!
 * 
 * 
 * 💻 SIMPLEST EXAMPLE TO UNDERSTAND:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   function outer() {
 *       let count = 0;                    // Variable in outer function
 *       
 *       function inner() {
 *           count++;                      // Inner function uses outer's variable
 *           console.log(count);
 *       }
 *       
 *       return inner;                     // Return the inner function
 *   }
 *   
 *   const counter = outer();              // outer() runs and returns inner
 *   counter();  // Output: 1              // inner still remembers 'count'!
 *   counter();  // Output: 2              // 'count' persists between calls!
 *   counter();  // Output: 3
 * 
 *   ⬆️ Even though outer() has finished, inner() still has access to 'count'.
 *      This is a CLOSURE!
 * 
 * 
 * 🔑 THREE KEY THINGS TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 1️⃣  A closure = Inner Function + Its Outer Variables
 * 2️⃣  The inner function "carries" those variables wherever it goes
 * 3️⃣  The variables stay alive as long as the closure exists
 * 
 * 
 * ✅ WHY DO WE USE CLOSURES? (Common Interview Answer)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   • Data Privacy      → Create "private" variables that outsiders can't touch
 *   • State Persistence → Remember values between function calls (like counters)
 *   • Factory Functions → Create customized functions with preset values
 *   • Callbacks         → Keep context alive in setTimeout, event handlers, etc.
 * 
 * 
 * 🏭 PRACTICAL EXAMPLE: Private Counter
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   function createCounter() {
 *       let count = 0;                    // Private! No one can access directly
 *       
 *       return {
 *           increment: () => ++count,
 *           decrement: () => --count,
 *           getCount: () => count
 *       };
 *   }
 *   
 *   const myCounter = createCounter();
 *   myCounter.increment();    // 1
 *   myCounter.increment();    // 2
 *   console.log(myCounter.count);         // undefined ← Can't access directly!
 *   console.log(myCounter.getCount());    // 2 ← Only through closure methods
 * 
 * 
 * ⚠️ COMMON PITFALL: Loop + var (Classic Interview Question!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   // ❌ WRONG (using var)
 *   for (var i = 0; i < 3; i++) {
 *       setTimeout(() => console.log(i), 100);    // Prints: 3, 3, 3
 *   }
 *   
 *   // ✅ CORRECT (using let - creates new closure for each iteration)
 *   for (let i = 0; i < 3; i++) {
 *       setTimeout(() => console.log(i), 100);    // Prints: 0, 1, 2
 *   }
 * 
 * 
 * 📝 QUICK INTERVIEW CHEAT SHEET:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   Q: "What is a closure?"
 *   A: "A closure is when an inner function has access to variables from its 
 *       outer function, even after the outer function has returned."
 * 
 *   Q: "Why are closures useful?"
 *   A: "They help create private variables, maintain state, and work with 
 *       callbacks where we need to preserve outer scope data."
 * 
 *   Q: "Give me an example?"
 *   A: "A counter function where the count variable stays private but can 
 *       be incremented through returned methods."
 * 
 * 
 * 💡 ONE-LINER TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━
 *    "Closure = Function + Remembered Variables from where it was born"
 * 
 */

