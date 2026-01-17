```markdown
# JavaScript Functions - Practice Problems

## Function Basics

### Problem 1: Temperature Converter
Write a function `convertToFahrenheit` that takes a temperature in Celsius and returns the temperature in Fahrenheit.

### Problem 2: Calculate Rectangle Area
Create a function `calculateRectangleArea` that takes two parameters (length and width) and returns the area of the rectangle.

### Problem 3: Even or Odd Checker
Write a function `isEven` that takes a number as input and returns `true` if the number is even, `false` otherwise.

### Problem 4: String Reverser
Create a function `reverseString` that takes a string as input and returns the reversed string.

### Problem 5: Prime Number Checker
Write a function `isPrime` that takes a number and returns `true` if it's a prime number, `false` otherwise.

### Problem 6: Factorial Calculator
Create a function `factorial` that calculates and returns the factorial of a given number.

### Problem 7: Palindrome Checker
Write a function `isPalindrome` that checks if a given string is a palindrome (reads the same forwards and backwards).

### Problem 8: FizzBuzz Function
Create a function `fizzBuzz` that takes a number `n` and returns an array of strings from 1 to n, where:
- Multiples of 3 are replaced with "Fizz"
- Multiples of 5 are replaced with "Buzz"
- Multiples of both 3 and 5 are replaced with "FizzBuzz"

### Problem 9: Array Statistics
Write a function `arrayStats` that takes an array of numbers and returns an object containing the minimum, maximum, sum, and average of the array.

### Problem 10: Password Validator
Create a function `isValidPassword` that takes a password string and returns `true` if it meets these criteria:
- At least 8 characters long
- Contains at least one uppercase letter
- Contains at least one lowercase letter
- Contains at least one number

---

## Arrow Functions

### Problem 1: Square Numbers
Convert the following function to an arrow function: Create `square` that takes a number and returns its square.

### Problem 2: Greeting Generator
Write an arrow function `greet` that takes a name and returns a greeting message.

### Problem 3: Array Doubler
Create an arrow function `doubleArray` that takes an array of numbers and returns a new array with all values doubled using `map`.

### Problem 4: Filter Adults
Write an arrow function `filterAdults` that takes an array of ages and returns only ages 18 and above using `filter`.

### Problem 5: Sum Array
Create an arrow function `sumArray` that takes an array of numbers and returns the sum using `reduce`.

### Problem 6: String Length Mapper
Write an arrow function `getStringLengths` that takes an array of strings and returns an array of their lengths.

### Problem 7: Object Transformer
Create an arrow function `createUserObjects` that takes an array of names and returns an array of user objects with `id` (index) and `name` properties.

### Problem 8: Conditional Filter
Write an arrow function `filterByCondition` that takes an array and a condition function, and returns filtered results.

### Problem 9: Compose Simple Functions
Create arrow functions `add5`, `multiply3`, and `subtract2`. Then create a function `composedOperation` that applies all three operations in sequence to a number.

### Problem 10: Advanced Array Manipulation
Write an arrow function `processData` that takes an array of numbers and:
- Filters out numbers less than 10
- Squares the remaining numbers
- Returns the sum of squared numbers

---

## this and Context in JavaScript

### Problem 1: Object Method
Create an object `person` with properties `firstName`, `lastName`, and a method `getFullName` that returns the full name using `this`.

### Problem 2: Counter Object
Create a `counter` object with a `count` property and methods `increment`, `decrement`, and `getCount` that use `this` to manage the count.

### Problem 3: Calculator Object
Build a `calculator` object with methods `add`, `subtract`, `multiply`, `divide` and a `result` property. Each method should update `this.result`.

### Problem 4: Context Loss Problem
Create an object with a method that uses `setTimeout`. Fix the context loss issue so `this` refers to the correct object inside the timeout callback.

### Problem 5: Method Borrowing
Create two objects: `car1` and `car2`, each with `brand` and `model` properties. Create a `getInfo` method on `car1` and call it in the context of `car2` using `call` or `apply`.

### Problem 6: Bank Account
Create a `bankAccount` object with `balance`, `deposit(amount)`, `withdraw(amount)`, and `getBalance()` methods. Ensure all methods properly use `this`.

### Problem 7: Bind Practice
Create a function `introduce` that uses `this.name` and `this.age`. Create a person object and use `bind` to create a bound version of the function.

### Problem 8: Event Handler Simulation
Create a `button` object with a `label` property and a `click` method. Simulate calling this method in a way that loses context, then fix it using an arrow function or `bind`.

### Problem 9: Chain Methods
Create an object `stringBuilder` with methods `append(str)`, `prepend(str)`, `clear()`, and `toString()`. Make methods chainable by returning `this`.

### Problem 10: Complex Context Challenge
Create a `game` object with nested objects and methods. Implement a `player` object inside `game` with methods that correctly reference both the player's properties and the game's properties.

---

## Higher Order Functions and Nested Functions

### Problem 1: Function Multiplier
Write a higher-order function `createMultiplier` that takes a number and returns a function that multiplies its argument by that number.

### Problem 2: Logger Wrapper
Create a higher-order function `logExecutionTime` that takes a function as input and returns a new function that logs how long the original function took to execute.

### Problem 3: Counter Closure
Write a function `createCounter` that returns an object with `increment`, `decrement`, and `getValue` methods, using closures to keep the count private.

### Problem 4: Once Function
Create a higher-order function `once` that takes a function and returns a new function that can only be called once. Subsequent calls should return the result of the first call.

### Problem 5: Partial Application
Write a function `partial` that takes a function and some arguments, and returns a new function that when called, combines the pre-filled arguments with new ones.

### Problem 6: Array Filter Builder
Create a function `createFilter` that takes a condition string ('even', 'odd', 'positive', 'negative') and returns an appropriate filter function for arrays.

### Problem 7: Memoization
Write a higher-order function `memoize` that takes a function and returns a memoized version that caches results for previously seen arguments.

### Problem 8: Function Composition
Create a function `compose` that takes multiple functions as arguments and returns a new function that applies them from right to left.

### Problem 9: Rate Limiter
Write a higher-order function `rateLimit` that takes a function and a time limit, returning a new function that can only be called once per time period.

### Problem 10: Advanced Closure - Private Variables
Create a function `createBankAccount` that returns an object with methods to deposit, withdraw, and check balance. The balance should be private and only accessible through the methods. Include transaction history that's also private but can be retrieved through a method.

---

## Mixed Challenge Problems

### Problem 1: Custom Array Methods
Implement your own versions of `map`, `filter`, and `reduce` as standalone functions (not on Array.prototype).

### Problem 2: Function Pipeline
Create a `pipe` function that takes multiple functions and returns a function that passes its argument through all functions from left to right.

### Problem 3: Retry Logic
Write a higher-order function `retry` that takes a function and a number of attempts, returning a new function that retries the original function if it throws an error.

### Problem 4: Currying
Create a `curry` function that converts a function of multiple arguments into a sequence of functions each taking a single argument.

### Problem 5: Debounce
Implement a `debounce` function that delays the execution of a function until after a specified time has passed since it was last called.

### Problem 6: Method Chaining with Context
Create a `Query` constructor function that allows chaining methods like `where`, `orderBy`, `limit` and `execute`, maintaining proper context throughout.

### Problem 7: Event Emitter
Build a simple event emitter using closures with `on`, `off`, and `emit` methods.

### Problem 8: Function Cache with TTL
Create a memoization function that caches results but expires them after a specified time-to-live (TTL).

### Problem 9: Middleware Pattern
Implement a simple middleware system where functions can be composed and executed in sequence, with the ability to pass data between them or stop execution.

### Problem 10: Advanced Calculator
Create a calculator using closures and higher-order functions that supports chaining operations, undo/redo functionality, and maintains a history of all operations.
```