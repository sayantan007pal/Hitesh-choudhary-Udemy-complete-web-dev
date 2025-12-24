function* generator() {
    yield 1;
    yield 2;
    yield 3;
}

let gen = generator();
let gen2 = generator();

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());


console.log(gen2.next().value);
console.log(gen2.next().value);
console.log(gen2.next().value);
console.log(gen2.next().value);







/**
 * ============================================================================
 * 🔄 ITERATORS AND GENERATORS IN JAVASCRIPT - Interview Revision Guide
 * ============================================================================
 * 
 * @summary
 * Iterators and Generators are mechanisms for handling sequences of data
 * in a controlled, "one-at-a-time" manner. They're powerful for working with
 * large datasets, lazy evaluation, and creating custom iteration logic.
 * 
 * ============================================================================
 * 📌 PART 1: ITERATORS
 * ============================================================================
 * 
 * @definition
 * An Iterator is an object that provides a way to access elements of a 
 * collection ONE BY ONE. It follows the Iterator Protocol, which requires
 * a `next()` method that returns { value, done }.
 * 
 * @analogy
 * Think of an iterator like a BOOK BOOKMARK:
 * - The book = your collection of data (array, string, etc.)
 * - The bookmark = the iterator (keeps track of where you are)
 * - Flipping to the next page = calling next()
 * - You get the current page content (value) and know if book ended (done)
 * 
 * @structure
 * Every call to next() returns an object:
 * {
 *   value: <current element>,    // The actual data
 *   done: true/false             // true = iteration complete, false = more to come
 * }
 * 
 * @example - Manual Iterator
 * 
 *   const myArray = ['🍎', '🍌', '🍇'];
 *   const iterator = myArray[Symbol.iterator]();  // Get the iterator
 *   
 *   console.log(iterator.next()); // { value: '🍎', done: false }
 *   console.log(iterator.next()); // { value: '🍌', done: false }
 *   console.log(iterator.next()); // { value: '🍇', done: false }
 *   console.log(iterator.next()); // { value: undefined, done: true } ← FINISHED!
 * 
 * @keyPoints
 * ✅ Arrays, Strings, Maps, Sets are ITERABLE by default (have Symbol.iterator)
 * ✅ for...of loop uses iterators behind the scenes
 * ✅ Spread operator (...) uses iterators
 * 
 * ============================================================================
 * 📌 PART 2: GENERATORS
 * ============================================================================
 * 
 * @definition
 * A Generator is a SPECIAL FUNCTION that can PAUSE its execution (yield) 
 * and RESUME later. It's defined using function* syntax and uses `yield`
 * to return values one at a time.
 * 
 * @analogy
 * Think of a generator like a VENDING MACHINE:
 * - You put a coin (call next()) → Machine gives ONE snack (yield value)
 * - Machine PAUSES and waits for next coin
 * - Put another coin → Get another snack
 * - When empty → done: true
 * 
 * Unlike a regular function that gives everything at once (like dumping 
 * all snacks on the floor), a generator gives you items ON DEMAND!
 * 
 * @syntax
 * function* myGenerator() {    // Note the asterisk *
 *   yield value1;              // Pause and return value1
 *   yield value2;              // When resumed, pause and return value2
 *   return finalValue;         // Optional final return
 * }
 * 
 * @example - Basic Generator
 * 
 *   function* fruitGenerator() {
 *     yield '🍎 Apple';
 *     yield '🍌 Banana';
 *     yield '🍇 Grapes';
 *   }
 *   
 *   const fruits = fruitGenerator();  // Creates generator object (NOT executed yet!)
 *   
 *   console.log(fruits.next()); // { value: '🍎 Apple', done: false }
 *   console.log(fruits.next()); // { value: '🍌 Banana', done: false }
 *   console.log(fruits.next()); // { value: '🍇 Grapes', done: false }
 *   console.log(fruits.next()); // { value: undefined, done: true }
 * 
 * @example - Infinite Sequence (POWERFUL use case!)
 * 
 *   function* idGenerator() {
 *     let id = 1;
 *     while (true) {           // Infinite loop - but it's okay!
 *       yield id++;            // Pauses here, so no infinite loop problem
 *     }
 *   }
 *   
 *   const generateId = idGenerator();
 *   console.log(generateId.next().value); // 1
 *   console.log(generateId.next().value); // 2
 *   console.log(generateId.next().value); // 3
 *   // Call as many times as needed, never runs out!
 * 
 * ============================================================================
 * 📌 VISUAL COMPARISON
 * ============================================================================
 * 
 *   Regular Function:
 *   ┌─────────────────────────────────────────┐
 *   │  function greet() {                     │
 *   │    return "Hi";  ←── Returns & EXITS    │
 *   │  }                                      │
 *   │  // Can't resume, function is done      │
 *   └─────────────────────────────────────────┘
 * 
 *   Generator Function:
 *   ┌─────────────────────────────────────────┐
 *   │  function* greetings() {                │
 *   │    yield "Hi";   ←── Returns & PAUSES   │
 *   │    yield "Hello"; ←── Resumes here      │
 *   │    yield "Hey";   ←── Then here         │
 *   │  }                                      │
 *   │  // Can pause, resume, and remember     │
 *   │  // its state between calls!            │
 *   └─────────────────────────────────────────┘
 * 
 * ============================================================================
 * 📌 WHY USE THEM? (Interview Gold!)
 * ============================================================================
 * 
 * 1️⃣ LAZY EVALUATION
 *    - Values computed only when needed (memory efficient)
 *    - Great for large/infinite data sets
 * 
 * 2️⃣ CUSTOM ITERATION
 *    - Create your own iteration logic for complex data structures
 *    - Make any object iterable with Symbol.iterator
 * 
 * 3️⃣ ASYNC PROGRAMMING
 *    - Generators were the foundation for async/await syntax!
 *    - Used with libraries like Redux-Saga for side effects
 * 
 * 4️⃣ STATE MACHINES
 *    - Generators naturally remember their state
 *    - Perfect for step-by-step workflows
 * 
 * ============================================================================
 * 📌 KEY DIFFERENCES (CHEAT SHEET)
 * ============================================================================
 * 
 *   ┌──────────────────┬────────────────────┬──────────────────────┐
 *   │   Feature        │   Iterator         │   Generator          │
 *   ├──────────────────┼────────────────────┼──────────────────────┤
 *   │ What is it?      │ Object with next() │ Function with yield  │
 *   │ Syntax           │ { next: () => {} } │ function* () {}      │
 *   │ How to use       │ iterator.next()    │ gen.next()          │
 *   │ Created by       │ Manual or built-in │ Calling gen function │
 *   │ Memory           │ Can be memory-heavy│ Lazy, memory-light   │
 *   │ Pause/Resume     │ ❌ No              │ ✅ Yes with yield    │
 *   └──────────────────┴────────────────────┴──────────────────────┘
 * 
 * ============================================================================
 * 📌 INTERVIEW QUICK ANSWERS
 * ============================================================================
 * 
 * Q: What is an Iterator?
 * A: An object with a next() method that returns {value, done} to access
 *    elements one at a time.
 * 
 * Q: What is a Generator?
 * A: A special function (function*) that can pause (yield) and resume,
 *    returning an iterator object.
 * 
 * Q: What's the difference between return and yield?
 * A: return exits the function permanently.
 *    yield pauses it and allows resuming from that point.
 * 
 * Q: Why are generators useful?
 * A: Lazy evaluation, memory efficiency, custom iteration, async patterns.
 * 
 * Q: What makes something "iterable"?
 * A: Having a Symbol.iterator property that returns an iterator object.
 * 
 * ============================================================================
 */

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE CODE - Try these out!
// ═══════════════════════════════════════════════════════════════════════════

// 📍 Example 1: Using Iterator on an Array
const fruits = ['🍎', '🍌', '🍇'];
const fruitIterator = fruits[Symbol.iterator]();

console.log("--- Iterator Example ---");
console.log(fruitIterator.next()); // { value: '🍎', done: false }
console.log(fruitIterator.next()); // { value: '🍌', done: false }
console.log(fruitIterator.next()); // { value: '🍇', done: false }
console.log(fruitIterator.next()); // { value: undefined, done: true }


// 📍 Example 2: Basic Generator
function* colorGenerator() {
    yield '🔴 Red';
    yield '🟢 Green';
    yield '🔵 Blue';
}

const colors = colorGenerator();

console.log("\n--- Generator Example ---");
console.log(colors.next()); // { value: '🔴 Red', done: false }
console.log(colors.next()); // { value: '🟢 Green', done: false }
console.log(colors.next()); // { value: '🔵 Blue', done: false }
console.log(colors.next()); // { value: undefined, done: true }


// 📍 Example 3: Infinite ID Generator (Practical Use Case!)
function* createIdGenerator() {
    let id = 1;
    while (true) {
        yield `USER-${id++}`;
    }
}

const generateUserId = createIdGenerator();

console.log("\n--- Infinite Generator Example ---");
console.log(generateUserId.next().value); // USER-1
console.log(generateUserId.next().value); // USER-2
console.log(generateUserId.next().value); // USER-3


// 📍 Example 4: Using for...of with Generator
function* countToThree() {
    yield 1;
    yield 2;
    yield 3;
}

console.log("\n--- for...of with Generator ---");
for (const num of countToThree()) {
    console.log(num); // 1, 2, 3
}


// 📍 Example 5: Custom Iterable Object
const customRange = {
    start: 1,
    end: 5,
    
    // Making this object iterable using a generator!
    [Symbol.iterator]: function* () {
        for (let i = this.start; i <= this.end; i++) {
            yield i;
        }
    }
};

console.log("\n--- Custom Iterable Object ---");
console.log([...customRange]); // [1, 2, 3, 4, 5]
