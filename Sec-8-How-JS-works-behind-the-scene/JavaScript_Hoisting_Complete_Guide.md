# JavaScript Hoisting: Complete Interview Guide 🎯

> **For Final Year CSE Students** - A deep-dive into hoisting with analogies, code snippets, and interview-ready explanations.

---

## 📚 Table of Contents

1. [What is Hoisting?](#1-what-is-hoisting)
2. [The Librarian Analogy](#2-the-librarian-analogy)
3. [Variable Hoisting with `var`](#3-variable-hoisting-with-var)
4. [Variable Hoisting with `let` and `const`](#4-variable-hoisting-with-let-and-const)
5. [The Temporal Dead Zone (TDZ)](#5-the-temporal-dead-zone-tdz)
6. [Function Declaration Hoisting](#6-function-declaration-hoisting)
7. [Function Expression Hoisting](#7-function-expression-hoisting)
8. [Arrow Function Hoisting](#8-arrow-function-hoisting)
9. [Quick Reference Table](#9-quick-reference-table)
10. [Common Interview Questions](#10-common-interview-questions)
11. [Best Practices](#11-best-practices)

---

## 1. What is Hoisting?

**Definition:** Hoisting is JavaScript's default behavior of moving **declarations** (not initializations) to the top of their containing scope during the **creation phase** of the execution context, before the code runs.

> **MDN Definition:** "JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables, classes, or imports to the top of their scope, prior to execution of the code."

### Key Insight: Two Phases of Execution

JavaScript code execution happens in **two phases**:

1. **Creation Phase (Memory Allocation):**
   - Scans for all declarations
   - Allocates memory for variables and functions
   - This is where "hoisting" happens

2. **Execution Phase:**
   - Executes code line by line
   - Assigns values to variables

```javascript
// What you write:
console.log(greeting);
var greeting = "Hello";

// What JavaScript "sees" after hoisting (conceptually):
var greeting;          // Declaration hoisted to top
console.log(greeting); // undefined (not an error!)
greeting = "Hello";    // Assignment stays in place
```

---

## 2. The Librarian Analogy 📖

Think of the JavaScript engine as a **LIBRARIAN** preparing a reading room **BEFORE** anyone enters:

| Librarian Action | JavaScript Equivalent |
|------------------|----------------------|
| Makes a list of all reserved seats | `var` declarations → initialized to `undefined` |
| Puts complete recipe books on shelves | Function declarations → fully available |
| Creates "DO NOT TOUCH" restricted zones | `let`/`const` declarations → Temporal Dead Zone |

When code executes, it's like **readers entering the room**:
- They can use what's already prepared (hoisted declarations)
- Restricted areas throw errors until properly unlocked (TDZ)

### Visual Representation

```
SCOPE START
┌─────────────────────────────────────────────────┐
│  var declarations    → undefined (accessible)   │
│  function declarations → fully callable         │
│  let/const           → TDZ 🚫 (not accessible)  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ... actual code execution line by line ...    │
│                                                 │
│  let x = 5;  ← TDZ ends here for 'x'           │
│                                                 │
└─────────────────────────────────────────────────┘
SCOPE END
```

---

## 3. Variable Hoisting with `var`

### Behavior: Declaration Hoisted, Value Stays Put

```javascript
// Example 1: Basic var hoisting
console.log(name); // undefined (NOT an error!)
var name = "JavaScript";
console.log(name); // "JavaScript"
```

**Behind the scenes:**
```javascript
// Hoisting transforms the code conceptually to:
var name;               // Declaration hoisted
console.log(name);      // undefined
name = "JavaScript";    // Assignment NOT hoisted
console.log(name);      // "JavaScript"
```

### Key Characteristics of `var`

#### 1. Function-Scoped (NOT Block-Scoped)

```javascript
function testScope() {
    if (true) {
        var insideBlock = "I'm accessible outside the block!";
    }
    console.log(insideBlock); // Works! "I'm accessible outside..."
}
testScope();

// With let, this would throw ReferenceError
function testLetScope() {
    if (true) {
        let insideBlock = "I'm trapped in the block!";
    }
    console.log(insideBlock); // ReferenceError: insideBlock is not defined
}
```

#### 2. Loop Variable Leaking

```javascript
for (var i = 0; i < 3; i++) {
    // loop body
}
console.log(i); // 3 - var leaked outside the loop!

for (let j = 0; j < 3; j++) {
    // loop body
}
console.log(j); // ReferenceError: j is not defined
```

#### 3. Redeclaration Allowed

```javascript
var user = "Alice";
var user = "Bob";    // No error! var allows redeclaration
console.log(user);   // "Bob"

let person = "Alice";
let person = "Bob";  // SyntaxError: 'person' has already been declared
```

#### 4. Global Object Property (in browser)

```javascript
var globalVar = "I'm on window";
console.log(window.globalVar); // "I'm on window"

let globalLet = "I'm NOT on window";
console.log(window.globalLet); // undefined
```

### Interview Trap: Undefined vs Undeclared

```javascript
console.log(foo);      // undefined (var foo is hoisted)
var foo = "bar";

console.log(notDeclared); // ReferenceError: notDeclared is not defined
// This variable was never declared anywhere
```

---

## 4. Variable Hoisting with `let` and `const`

### The Key Difference: Hoisted but NOT Initialized

```javascript
// With var
console.log(varVariable); // undefined
var varVariable = "var";

// With let
console.log(letVariable); // ReferenceError: Cannot access 'letVariable' before initialization
let letVariable = "let";

// With const
console.log(constVariable); // ReferenceError: Cannot access 'constVariable' before initialization
const constVariable = "const";
```

### Proof That let/const ARE Hoisted

```javascript
const x = 1;
{
    // If const wasn't hoisted, this would print 1 from outer scope
    console.log(x); // ReferenceError: Cannot access 'x' before initialization
    const x = 2;
}
```

> **Why does this prove hoisting?** If `const x = 2` wasn't hoisted, `console.log(x)` would access the outer `x` (value 1). But since the inner `const x` is hoisted, it "shadows" the outer one, and accessing it before initialization throws an error.

### Block Scope Demonstration

```javascript
let globalLet = "global";

function scopeDemo() {
    console.log(globalLet); // "global" - accessible from outer scope
    
    if (true) {
        let blockLet = "block";
        console.log(blockLet); // "block"
    }
    
    console.log(blockLet); // ReferenceError: blockLet is not defined
}
```

### const Specific Rules

```javascript
// const MUST be initialized at declaration
const PI; // SyntaxError: Missing initializer in const declaration

// const cannot be reassigned
const PI = 3.14159;
PI = 3.14; // TypeError: Assignment to constant variable

// BUT: const objects/arrays CAN be mutated
const person = { name: "Alice" };
person.name = "Bob"; // ✅ This works!
person = {};         // ❌ TypeError: Assignment to constant variable

const numbers = [1, 2, 3];
numbers.push(4);     // ✅ This works! [1, 2, 3, 4]
numbers = [];        // ❌ TypeError
```

---

## 5. The Temporal Dead Zone (TDZ)

### Definition

The **Temporal Dead Zone (TDZ)** is the period between entering a scope and the point where a variable is declared. Accessing a `let` or `const` variable in this zone throws a `ReferenceError`.

### Visual Representation

```javascript
{
    // ══════════════════════════════════
    // ║  TDZ for 'myVariable' STARTS   ║
    // ══════════════════════════════════
    
    console.log(myVariable); // ReferenceError!
    
    let someOtherVar = "safe";
    console.log(someOtherVar); // "safe" - no TDZ issue
    
    // Still in TDZ for myVariable...
    
    let myVariable = "now accessible";
    
    // ══════════════════════════════════
    // ║  TDZ for 'myVariable' ENDS     ║
    // ══════════════════════════════════
    
    console.log(myVariable); // "now accessible" ✅
}
```

### TDZ in Function Parameters

```javascript
// Default parameters are evaluated left-to-right
function foobar(foo = bar, bar = 'bar') {
    console.log(foo);
}
foobar(); // ReferenceError: Cannot access 'bar' before initialization
// 'bar' is in its TDZ when 'foo = bar' is evaluated

// This works because 'foo' is already initialized
function foobar2(foo = 'foo', bar = foo) {
    console.log(bar);
}
foobar2(); // "foo" ✅
```

### Why TDZ Exists

1. **Catches Errors Early:** Prevents using variables before they're ready
2. **Makes Code More Predictable:** No surprise `undefined` values
3. **Encourages Better Coding Practices:** Declare before use
4. **Enables const to Work:** const can't be `undefined` then assigned

### typeof in TDZ

```javascript
// typeof on var before declaration
console.log(typeof varName); // "undefined"
var varName = "test";

// typeof on let/const before declaration
console.log(typeof letName); // ReferenceError: Cannot access 'letName' before initialization
let letName = "test";

// typeof on truly undeclared variable
console.log(typeof neverDeclared); // "undefined" (safe)
```

---

## 6. Function Declaration Hoisting

### Full Hoisting: Declaration AND Implementation

Function declarations are **fully hoisted** - you can call them before they appear in your code!

```javascript
// ✅ This works perfectly!
greet("World"); // "Hello, World!"

function greet(name) {
    console.log(`Hello, ${name}!`);
}
```

### How It Works Internally

```javascript
// What you write:
sayHello();

function sayHello() {
    console.log("Hello!");
}

// What JavaScript "sees" conceptually:
function sayHello() {    // Entire function hoisted to top
    console.log("Hello!");
}

sayHello();              // Now this call makes sense
```

### Practical Use Case: Implementation at Bottom

This pattern is useful for **readability** - put the "what" before the "how":

```javascript
// Main logic at the top - easy to understand flow
initializeApp();
loadUserData();
setupEventListeners();
startRendering();

// Implementation details at the bottom
function initializeApp() {
    console.log("Initializing...");
}

function loadUserData() {
    console.log("Loading user data...");
}

function setupEventListeners() {
    console.log("Setting up listeners...");
}

function startRendering() {
    console.log("Starting render...");
}
```

### Function Declarations Inside Blocks (Avoid This!)

```javascript
// Behavior is inconsistent across browsers!
if (true) {
    function conditionalFunc() {
        return "from if block";
    }
}

console.log(conditionalFunc()); // Unpredictable! Don't do this.

// Instead, use function expressions:
let conditionalFunc;
if (true) {
    conditionalFunc = function() {
        return "from if block";
    };
}
```

---

## 7. Function Expression Hoisting

### Critical Difference: Follows Variable Hoisting Rules

Function expressions are **NOT** hoisted like function declarations. They follow the hoisting rules of their variable declaration (`var`, `let`, or `const`).

### With `var`: TypeError

```javascript
console.log(myFunc); // undefined (var is hoisted)
myFunc();            // TypeError: myFunc is not a function

var myFunc = function() {
    console.log("I'm a function expression");
};

myFunc();            // ✅ "I'm a function expression"
```

**Explanation:**
```javascript
// Hoisting transforms this to:
var myFunc;              // Declaration hoisted, value is undefined
console.log(myFunc);     // undefined
myFunc();                // undefined() - TypeError!
myFunc = function() {    // Assignment stays in place
    console.log("I'm a function expression");
};
```

### With `let`/`const`: ReferenceError

```javascript
console.log(myLetFunc); // ReferenceError: Cannot access 'myLetFunc' before initialization
myLetFunc();            // Never reaches this line

let myLetFunc = function() {
    console.log("I'm a let function expression");
};
```

```javascript
console.log(myConstFunc); // ReferenceError: Cannot access 'myConstFunc' before initialization
myConstFunc();            // Never reaches this line

const myConstFunc = function() {
    console.log("I'm a const function expression");
};
```

### Named vs Anonymous Function Expressions

```javascript
// Anonymous function expression
const anonymous = function() {
    console.log("Anonymous");
};

// Named function expression (useful for recursion and debugging)
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // Can call itself by name 'fact'
};

console.log(factorial(5)); // 120
console.log(fact(5));      // ReferenceError: fact is not defined
                           // 'fact' is only accessible inside the function
```

---

## 8. Arrow Function Hoisting

### Arrow Functions are ALWAYS Expressions

Arrow functions can **never** be function declarations - they're always expressions. Therefore, they **always** follow variable hoisting rules.

### With `var`: TypeError

```javascript
console.log(arrowVar); // undefined
arrowVar();            // TypeError: arrowVar is not a function

var arrowVar = () => {
    console.log("Arrow with var");
};
```

### With `let`/`const`: ReferenceError (Most Common Pattern)

```javascript
// const is the preferred way to declare arrow functions
myArrow();    // ReferenceError: Cannot access 'myArrow' before initialization

const myArrow = () => {
    console.log("Arrow with const");
};

myArrow();    // ✅ "Arrow with const"
```

### Comparison: Declaration vs Arrow

```javascript
// ✅ Function declaration - fully hoisted
greetDeclaration("Alice"); // "Hello, Alice!"

function greetDeclaration(name) {
    console.log(`Hello, ${name}!`);
}

// ❌ Arrow function - NOT hoisted
greetArrow("Bob"); // ReferenceError

const greetArrow = (name) => {
    console.log(`Hello, ${name}!`);
};
```

### Real-World Scenario: Callbacks

```javascript
// Arrow functions are commonly used as callbacks
// They don't need to be hoisted because they're used inline

const numbers = [1, 2, 3, 4, 5];

// This works because the arrow function is defined inline
const doubled = numbers.map(num => num * 2);

// If you extract it to a variable, declare it first
const triple = num => num * 3;  // Declare first
const tripled = numbers.map(triple);  // Use after
```

---

## 9. Quick Reference Table

| Declaration Type | Hoisted? | Initial Value | Scope | Can Redeclare? | TDZ? |
|-----------------|----------|---------------|-------|----------------|------|
| `var` | ✅ Yes | `undefined` | Function | ✅ Yes | ❌ No |
| `let` | ✅ Yes | `<uninitialized>` | Block | ❌ No | ✅ Yes |
| `const` | ✅ Yes | `<uninitialized>` | Block | ❌ No | ✅ Yes |
| `function declaration` | ✅ Yes (fully) | Actual function | Function | ✅ Yes | ❌ No |
| `function expression (var)` | ✅ Yes | `undefined` | Function | ✅ Yes | ❌ No |
| `function expression (let/const)` | ✅ Yes | `<uninitialized>` | Block | ❌ No | ✅ Yes |
| `arrow function` | Same as variable | Same as variable | Same as variable | Same as variable | Same as variable |

### Error Types Quick Reference

| Situation | Error Type |
|-----------|------------|
| Calling `var` function expression before declaration | `TypeError: undefined is not a function` |
| Accessing `let`/`const` in TDZ | `ReferenceError: Cannot access 'x' before initialization` |
| Accessing truly undeclared variable | `ReferenceError: x is not defined` |
| Reassigning `const` | `TypeError: Assignment to constant variable` |
| Missing `const` initializer | `SyntaxError: Missing initializer in const declaration` |

---

## 10. Common Interview Questions

### Q1: What will this code output?

```javascript
console.log(a);
console.log(b);
var a = 1;
let b = 2;
```

**Answer:**
```
undefined
ReferenceError: Cannot access 'b' before initialization
```
- `var a` is hoisted with value `undefined`
- `let b` is hoisted but in TDZ, so accessing it throws ReferenceError

---

### Q2: What will this code output?

```javascript
var x = 1;
function foo() {
    console.log(x);
    var x = 2;
}
foo();
```

**Answer:** `undefined`

**Explanation:** Inside `foo()`, `var x` is hoisted to the top of the function scope, shadowing the global `x`. The local `x` is `undefined` at the time of `console.log`.

---

### Q3: What's the difference between these two?

```javascript
// Version A
function funcA() { return "A"; }

// Version B
var funcB = function() { return "B"; };
```

**Answer:**
- **Version A** (Function Declaration): Fully hoisted - can be called anywhere in the scope, even before its definition
- **Version B** (Function Expression): Only the variable `funcB` is hoisted (as `undefined`), the function assignment happens at runtime

---

### Q4: Why does this throw an error?

```javascript
const x = 10;
if (true) {
    console.log(x);
    const x = 20;
}
```

**Answer:** `ReferenceError: Cannot access 'x' before initialization`

The inner `const x` is hoisted within the block scope, creating a TDZ. The outer `x` is shadowed, so the inner `x` (which is in TDZ) is accessed, causing the error.

---

### Q5: Fix this code

```javascript
// This causes error
greet();
const greet = () => console.log("Hello!");
```

**Solution:**
```javascript
// Option 1: Use function declaration
greet();
function greet() {
    console.log("Hello!");
}

// Option 2: Declare before use (recommended for arrow functions)
const greet = () => console.log("Hello!");
greet();
```

---

### Q6: What's the output?

```javascript
console.log(typeof undeclaredVar);    // Line 1
console.log(typeof declaredLater);    // Line 2
let declaredLater = "test";
```

**Answer:**
- Line 1: `"undefined"` (typeof on undeclared variable is safe)
- Line 2: `ReferenceError` (typeof on let in TDZ still throws)

---

### Q7: Classic Interview Loop Problem

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
```

**Output:** `3, 3, 3` (all three)

**Why?** `var` is function-scoped, so there's only ONE `i` that becomes 3 after the loop. All callbacks reference the same `i`.

**Fix with let:**
```javascript
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
```

**Why it works?** `let` is block-scoped, creating a new `i` for each iteration.

---

## 11. Best Practices

### ✅ DO:

1. **Always use `const` by default**, `let` when rebinding is needed
   ```javascript
   const PI = 3.14159;
   let counter = 0;
   counter++; // Needed because value changes
   ```

2. **Declare variables at the top of their scope**
   ```javascript
   function example() {
       const maxRetries = 3;
       let attempts = 0;
       
       // ... rest of function
   }
   ```

3. **Use function declarations when hoisting behavior is beneficial**
   ```javascript
   // Main logic at top
   processData(data);
   
   // Implementation at bottom
   function processData(data) {
       // ...
   }
   ```

4. **Initialize variables when declaring them**
   ```javascript
   const items = [];
   let count = 0;
   ```

### ❌ DON'T:

1. **Don't use `var` in modern JavaScript**
   ```javascript
   // Bad
   var name = "John";
   
   // Good
   const name = "John";
   ```

2. **Don't rely on hoisting for `var` or function expressions**
   ```javascript
   // Bad - confusing
   x = 5;
   var x;
   
   // Good - clear
   let x = 5;
   ```

3. **Don't put function declarations inside blocks**
   ```javascript
   // Bad - unpredictable behavior
   if (condition) {
       function foo() { }
   }
   
   // Good
   let foo;
   if (condition) {
       foo = function() { };
   }
   ```

4. **Don't access variables before declaration**
   ```javascript
   // Bad - relies on TDZ knowledge
   console.log(name); // ReferenceError
   const name = "John";
   
   // Good
   const name = "John";
   console.log(name);
   ```

---

## 🎯 Key Takeaways for Interviews

1. **Hoisting happens during the Creation Phase** of execution context

2. **var**: Hoisted + initialized to `undefined` → function-scoped

3. **let/const**: Hoisted but NOT initialized → block-scoped → TDZ

4. **Function declarations**: Fully hoisted (declaration + body)

5. **Function expressions & Arrow functions**: Follow their variable's hoisting rules

6. **TDZ** exists to catch errors early and make `const` work properly

7. **Modern best practice**: Use `const` by default, `let` when needed, avoid `var`

---

## 📖 References

- [MDN - Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- [JavaScript.info - The old "var"](https://javascript.info/var)
- [freeCodeCamp - What is Hoisting in JavaScript](https://www.freecodecamp.org/news/what-is-hoisting-in-javascript/)
- [ECMAScript Specification](https://tc39.es/ecma262/)

---

*Last Updated: April 2026*
*Created for interview preparation - Good luck! 🚀*
