# JavaScript Functions - Practice Problems

## Function Basics
### Problem 1: Temperature Converter

```
function convertToFahrenheit(temp){
    const Fahren = temp*1.8 + 32
    return Fahren
    
}
```
### Problem 2: Calculate Rectangle Area

```
function calculateRectangleArea(len , wid){
    const rectArea = len * wid
    return rectArea
}
```
### Problem 3: Even or Odd Checker

```
function isEven(val){
    if(val%2 == 0){
        return true
    }
    else{
        return false
    }
}
```

### Problem 4: String Reverser

```
function reverseString(  value){
    reversedVal = [];
        for(let i = 0 ; i < value.length ; i++){
                reversedVal.push(value[value.length-1-i])
        }
        reversedVal.toString();
        return reversedVal.join("");
}
```

### Problem 5: Prime Number Checker

```
function isPrime( value){
    if (value <= 1) return false;
    for (let i = 2; i < value; i++) {
        if (value % i === 0) return false;
    }
    return true;

}
```

### Problem 6: Factorial Calculator

```
function fatorial(val){
    let factValue = 1
    for(let i = val; i>0 ; i--){
        factValue = factValue * i
    }
    return factValue
}
```
```
function recursiveFactorial(val){
    if(val==0){
        return 1
    }
    return recursiveFactorial(val-1)*val

}
```
```
function fatorial(val){
    let factValue = 1
    for(let i = 1; i <= val ; i++){  // Change: <= instead of <
        factValue = factValue * i
    }
    return factValue
}
```

### Problem 7: Palindrome Checker

```
function palindromeChecker(value){
    for(let i = 0; i<(value.length/2); i++){
        if(value[value.lenght -1-i]!== value[i]){
                return false
        }
    }
        return true
}
```
```
function recursivePalindrome(value){
    let cpyValue = value;
    if(cpyValue.length <= 1){
        return true
    }
    if(cpyValue[cpyValue.length-1] !== cpyValue[0]){
        return false
    }
    return recursivePalindrome(cpyValue.slice(1, -1))
}
```

### Problem 8: FizzBuzz Function

```
function fizzBuzz(num){
    if (num % 3== 0 && num % 5 == 0){
        return `FizzBuzz`
    }
    else if (num % 3== 0 ){
        return `Fizz`
    }
    else if ( num % 5 == 0){
        return `Buzz`
    }
    else{
        return ``
    }

}
```

### Problem 9: Array Statistics

```
function arrayStats(arr){
    let sum = arr.reduce((num, i)=> num +i)
    let avg = sum/arr.length
    let val = []
     val = arr.sort((a,b)=> a-b)
     let max = val[arr.length-1]
     let min = val[0]
    return {min , max , sum , avg}
}
```

```
function arrayStats(arr){
    let sum = arr.reduce((num, i)=> num +i)
    let avg = sum/arr.length
     let max = Math.max(...arr)
     let min = Math.min(...arr)
    return {min , max , sum , avg}
}
```

### Problem 10: Password Validator

```
function isValidPassword(password){
    if(password.length< 8){
        return false
    }
    if(!/[A-Z]/.test(password)){
        return false
    }
    if(!/[a-z]/.test(password)){
        return false
    }
    if(!/[0-9]/.test(password)){
        return false
    }
    return true
}

```


---

## Arrow Functions

### Problem 1: Square Numbers
```
const square = (num)=>{
    return num*num
}
```

### Problem 2: Greeting Generator

```
const greet = (name) =>{
    return `Hello ${name}, nice to meet you!`
}
```
### Problem 3: Array Doubler

```
const doubleArray = (val)=>{
    newArr = [...val]
    return newArr.map((a)=>a*2)
}
```

### Problem 4: Filter Adults
```
const filterAdults = (val) =>{
    newArr = [...val]
    return newArr.filter((a)=> a >= 18)
}
```
### Problem 5: Sum Array
```
const sumArray = (val) =>{
    newArr = [...val]
    return newArr.reduce((sum,a)=> sum +a)
}
```
### Problem 6: String Length Mapper
const getStringLengths =(val)=>{
    return val.map((a)=> a.length)
}
```

```
### Problem 7: Object Transformer
```
const createUserObjects= (arr)=>{
    let id=0;
    return arr.map((a)=>{
        id++,
        return {id:id, name:a}
    })
}
```
### Problem 8: Conditional Filter
```
const  filterByCondition=(arr, cond)=> {
    return arr.filter(cond)

}

const cond=(a)=>{
    return a.length>3
}
```
### Problem 9: Compose Simple Functions
```
const add5 =(val) =>{
    return val + 5
}
const multiply3 = (val) =>{
    return val * 3
}
const subtract2 = (val) =>{
    return val - 2
}
const composedOperation = (val)=>{
    let ad = add5(val)
    let mul = multiply3(ad)
    let sub = subtract2(mul)
    return sub
}
```
### Problem 10: Advanced Array Manipulation
```
const processData = (val) =>{
    let filt = val.filter((a)=> a>=10)
    let sqr = filt.map((a)=>a*a)
    let sum = sqr.reduce((sum, a)=> sum +a)
    return sum
}
```

## this and Context in JavaScript

### Problem 1: Object Method
```
Person = {
    firstName: 'Sayantan',
    lastName: 'Pal',
    getFullName: function(){
        return `My Full Name is ${this.firstName} ${this.lastName}.`
    }
}
```

### Problem 2: Counter Object
```
counter ={
    count:3,
    increment: function(){
         this.count+=1
         return this
    },
    decrement: function(){
        this.count-=1
        return this
    },
    getCount: function(){
        return this.count
    }
}
```

### Problem 3: Calculator Object
```
calculator={
    result :5,
    add: function(num){
         this.result += num 
        return this 
    },
    subtract: function(num){
         this.result -=num
        return this 
    },
    multiply: function(num){
         this.result *= num
        return this 
    },
    divide: function(num){
         this.result /=num
        return this 
    },
    getValue: function(){
        return this.result
    }

}
calculator.add(10).subtract(10).multiply(10).divide(10).getValue()

console.log(calculator.getValue())
```

### Problem 4: Context Loss Problem
```
person={
    name:"Sayantan",
    age:25,
    greet(){
        setTimeout(()=>{
            console.log(hi myself ${this.name} of ${this.age})
        },2000)
    }
}

```
OR USING BIND
```
person={
    name:'Sayantan',
    age:25,
    greet(){
        setTimeout(function(){
            console.log(hi myself ${this.name} of ${this.age})
        }.bind(this),2000)
    }
}
```

### Problem 5: Method Borrowing
```
car1={
    model:'Camary',
    brand:'Tyota',
    getinfo(){
        console.log(`the car is of ${this.brand} with ${this.model}`)
    }
}
car2={
    brand:'Tata',
    model:'Punch',
}

car1.getinfo.call(car2)
```

### Problem 6: Bank Account
```
bankaccount={
    balance:0,
    deposit(amount){
        return this.balance += amount
    }
    withdraw(amount){
        return this.balance -= amount
    }
    getBalance(){
        return this.balance
    }

}
```

### Problem 7: Bind Practice
```
person= {
    name: 'Sayantan Pal',
    age: 25
}
function introduce(){
    return `Hello my name is ${this.name} and age is ${this.age}`
}
const value = introduce.bind(person)
console.log(value)
```

### Problem 8: Event Handler Simulation
```
button={
    label:'RELOADING',
    click: function(){
        return `clicking this will result in ${this.label}`
    }
}
//having context
console.log(button.click())

//Regaining context
const valueWithContext = button.click.bind(button)
console.log(valueWithContext)

//losing context
const value = buttton.click
console.log(value())
```

### Problem 9: Chain Methods
```
stringBuilder={
    value:'',
    append: function(str){
        this.value+=str
        return this
    }
    prepend: function(str){
        this.value = str + this.value
        return this
    }
    toString: function(){
        return this.value
    }
    clear: function(){
        return this.value=''
    }
}
```

### Problem 10: Complex Context Challenge
```
game={
    football:"RUNNING",
    player : {
        chess:"SITTING",
        futbal:game.football,
        howToPlay : function(){
            return `we can play chess while ${this.chess}, but for football we need to keep ${this.futbal}`
        }
    }
}
```

---

## Higher Order Functions and Nested Functions

### Problem 1: Function Multiplier
```
function createMultiplier(num){
    return funcion argument(val){
        return num * val
    }

}
const double = createMultiplier(3)
console.log(double(2))
```

### Problem 2: Logger Wrapper
```
function logExecutionTime(func){
    return function value(arg){
        let timeNow = performance.now()
        let result = func(arg)
        let timeEnd = performance.now()
        console.log( ` difference between start time and end time is ${(timeNow-timeEnd)} ms`)
        return result
    }
}
const value = logExecutionTime(function(arg){
    return arg*arg
})
console.log(value(2000))
```

### Problem 3: Counter Closure
```
function createCounter(){
    let count = 0;
    function increment(){
         count++
         return count
    }
    function decrement(){
         count--
         return count
    }
    function getValue(){
        return count
    }

        return {
            increment, 
            decrement,
            getValue
        }

}

//also another way 

function createCounter(){
  let count = 0;
    return {
        increment : function (){
          count++
          return count
        },
        decrement: function (){
          count --;
          return count;
        },
        getValue: function(){
          return count;
        }
    }
}
```

### Problem 4: Once Function
```
function once(func){
 let called = false
 let result 

    return function newFunc(...args){
        if(!called){

            result= func(...args) 
            called = true
        }
        return result
    }
}  

const onceFunc = once(() => {
    console.log("INITIALIZING")
    return "Initialized"
})
```

### Problem 5: Partial Application
```
function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn.apply(this, [...presetArgs, ...laterArgs]);
  };
}

const add = (a, b, c) => a + b + c;

const addFive = partial(add, 5);
console.log(addFive(3, 2)); // 5 + 3 + 2 = 10

const addFiveAndThree = partial(add, 5, 3);
console.log(addFiveAndThree(2));
```

### Problem 6: Array Filter Builder
```

```

### Problem 7: Memoization
```
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`Cache hit for: ${key}`);
      return cache.get(key);
    }

    console.log(`Computing for: ${key}`);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}


const slowFibonacci = (n) => {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
};
console.log(slowFibonacci(10))
```

### Problem 8: Function Composition
```
function compose(...fns) {
  return function (initialValue) {
    return fns.reduceRight((acc, fn) => fn(acc), initialValue);
  };
}


const addTwo = (x) => x + 2;
const multiplyByThree = (x) => x * 3;
const subtractFive = (x) => x - 5;

// compose applies right to left: subtractFive → multiplyByThree → addTwo
const composed = compose(addTwo, multiplyByThree, subtractFive);
```

### Problem 9: Rate Limiter
```
function rateLimit(fn, timeLimit) {
  let lastCallTime = 0;
  let lastResult;

  return function (...args) {
    const now = Date.now();

    if (now - lastCallTime >= timeLimit) {
      lastCallTime = now;
      lastResult = fn.apply(this, args);
      return lastResult;
    }

    // Return undefined or last result when rate limited
    return undefined;
  };
}


const expensiveOperation = (x) => {
  console.log(`Executing with ${x}`);
  return x * 2;
};

const limitedOperation = rateLimit(expensiveOperation, 1000); // 1 second limit

```

### Problem 10: Advanced Closure - Private Variables
```
function createBankAccount(initialBalance = 0, accountHolder = "Anonymous") {
  // Private variables (closures)
  let balance = initialBalance;
  const transactionHistory = [];
  const createdAt = new Date();

  // Private helper function
  const addTransaction = (type, amount, success, note = "") => {
    transactionHistory.push({
      id: transactionHistory.length + 1,
      type,
      amount,
      balanceAfter: balance,
      success,
      note,
      timestamp: new Date().toISOString(),
    });
  };

  // Log initial deposit if any
  if (initialBalance > 0) {
    addTransaction("INITIAL_DEPOSIT", initialBalance, true, "Account opened");
  }

  return {
    // Get account holder name
    getAccountHolder() {
      return accountHolder;
    },

    // Get current balance
    getBalance() {
      return balance;
    },

    // Deposit money
    deposit(amount) {
      if (typeof amount !== "number" || isNaN(amount)) {
        console.log("  [ERROR] Invalid amount");
        addTransaction("DEPOSIT", amount, false, "Invalid amount type");
        return false;
      }

      if (amount <= 0) {
        console.log("  [ERROR] Deposit amount must be positive");
        addTransaction("DEPOSIT", amount, false, "Non-positive amount");
        return false;
      }

      balance += amount;
      addTransaction("DEPOSIT", amount, true);
      console.log(`  [SUCCESS] Deposited $${amount}. New balance: $${balance}`);
      return true;
    },

    // Withdraw money
    withdraw(amount) {
      if (typeof amount !== "number" || isNaN(amount)) {
        console.log("  [ERROR] Invalid amount");
        addTransaction("WITHDRAWAL", amount, false, "Invalid amount type");
        return false;
      }

      if (amount <= 0) {
        console.log("  [ERROR] Withdrawal amount must be positive");
        addTransaction("WITHDRAWAL", amount, false, "Non-positive amount");
        return false;
      }

      if (amount > balance) {
        console.log(`  [ERROR] Insufficient funds. Balance: $${balance}, Requested: $${amount}`);
        addTransaction("WITHDRAWAL", amount, false, "Insufficient funds");
        return false;
      }

      balance -= amount;
      addTransaction("WITHDRAWAL", amount, true);
      console.log(`  [SUCCESS] Withdrew $${amount}. New balance: $${balance}`);
      return true;
    },

    // Transfer to another account
    transfer(toAccount, amount) {
      if (!toAccount || typeof toAccount.deposit !== "function") {
        console.log("  [ERROR] Invalid recipient account");
        addTransaction("TRANSFER", amount, false, "Invalid recipient");
        return false;
      }

      if (amount > balance) {
        console.log(`  [ERROR] Insufficient funds for transfer`);
        addTransaction("TRANSFER", amount, false, "Insufficient funds");
        return false;
      }

      // Withdraw from this account
      balance -= amount;
      addTransaction("TRANSFER_OUT", amount, true, `To: ${toAccount.getAccountHolder()}`);

      // Deposit to recipient
      toAccount.deposit(amount);

      console.log(`  [SUCCESS] Transferred $${amount} to ${toAccount.getAccountHolder()}`);
      return true;
    },

    // Get transaction history (copy to prevent external modification)
    getTransactionHistory() {
      return [...transactionHistory];
    },

    // Get last N transactions
    getRecentTransactions(n = 5) {
      return transactionHistory.slice(-n);
    },

    // Get account summary
    getAccountSummary() {
      const deposits = transactionHistory
        .filter((t) => t.type === "DEPOSIT" && t.success)
        .reduce((sum, t) => sum + t.amount, 0);

      const withdrawals = transactionHistory
        .filter((t) => t.type === "WITHDRAWAL" && t.success)
        .reduce((sum, t) => sum + t.amount, 0);

      const transfersIn = transactionHistory
        .filter((t) => t.type === "DEPOSIT" && t.success)
        .length;

      const transfersOut = transactionHistory
        .filter((t) => t.type === "TRANSFER_OUT" && t.success)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        accountHolder,
        currentBalance: balance,
        totalDeposits: deposits,
        totalWithdrawals: withdrawals,
        totalTransfersOut: transfersOut,
        transactionCount: transactionHistory.length,
        accountAge: `${Math.floor((Date.now() - createdAt) / 1000)} seconds`,
      };
    },

  };
}


const account1 = createBankAccount(1000, "Alice");

console.log(`Account holder: ${account1.getAccountHolder()}`);
console.log(`Initial balance: $${account1.getBalance()}`);

account1.deposit(500);
account1.withdraw(200);
account1.withdraw(2000);
```

---

## Mixed Challenge Problems

### Problem 1: Custom Array Methods
```
function customMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

function customFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

function customReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;
  
  // If no initial value provided, use first element as accumulator
  if (accumulator === undefined) {
    if (array.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = array[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  
  return accumulator;
}

```

### Problem 2: Function Pipeline
```
function logExecutionTime(fn) {
  return function (...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`Function "${fn.name || 'anonymous'}" took ${(end - start).toFixed(4)} ms to execute`);
    return result;
  };
}

function slowSum(n) {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
}


const timedSlowSum = logExecutionTime(slowSum);


```

### Problem 3: Retry Logic
```
function retry(fn, attempts) {
  return function (...args) {
    let lastError;
    for (let i = 1; i <= attempts; i++) {
      try {
        console.log(`Attempt ${i}...`);
        return fn(...args);
      } catch (error) {
        lastError = error;
        console.log(`Attempt ${i} failed: ${error.message}`);
      }
    }
    throw new Error(`All ${attempts} attempts failed. Last error: ${lastError.message}`);
  };
}

let callCount = 0;
function unreliableFunction(value) {
  callCount++;
  if (callCount < 3) {
    throw new Error("Random failure!");
  }
  return `Success with value: ${value}`;
}


const reliableFunction = retry(unreliableFunction, 5);

```

### Problem 4: Currying
```
function curry(fn) {
  return function curried(...args) {
    // If we have enough arguments, call the original function
    if (args.length >= fn.length) {
      return fn(...args);
    }
    // Otherwise, return a function that collects more arguments
    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };
  };
}


function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
```

### Problem 5: Debounce
```
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    // Clear any existing timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function search(query) {
  console.log(`Searching for: "${query}" at ${new Date().toLocaleTimeString()}`);
}

// Create debounced version (waits 500ms after last call)
const debouncedSearch = debounce(search, 500);
```

### Problem 6: Method Chaining with Context
```
function Query(data) {
  this.data = data;
  this.filters = [];
  this.sortField = null;
  this.sortOrder = "asc";
  this.limitCount = null;
}

// Add a filter condition
Query.prototype.where = function (field, operator, value) {
  this.filters.push({ field, operator, value });
  return this; // Enable chaining
};

// Set sorting options
Query.prototype.orderBy = function (field, order = "asc") {
  this.sortField = field;
  this.sortOrder = order;
  return this; // Enable chaining
};

// Set limit on results
Query.prototype.limit = function (count) {
  this.limitCount = count;
  return this; // Enable chaining
};

// Execute the query and return results
Query.prototype.execute = function () {
  let result = [...this.data];

  // Apply filters
  for (const filter of this.filters) {
    result = result.filter((item) => {
      const itemValue = item[filter.field];
      switch (filter.operator) {
        case "===":
        case "==":
          return itemValue === filter.value;
        case "!==":
        case "!=":
          return itemValue !== filter.value;
        case ">":
          return itemValue > filter.value;
        case ">=":
          return itemValue >= filter.value;
        case "<":
          return itemValue < filter.value;
        case "<=":
          return itemValue <= filter.value;
        case "includes":
          return itemValue.includes(filter.value);
        case "startsWith":
          return itemValue.startsWith(filter.value);
        default:
          return true;
      }
    });
  }

  // Apply sorting
  if (this.sortField) {
    result.sort((a, b) => {
      if (a[this.sortField] < b[this.sortField])
        return this.sortOrder === "asc" ? -1 : 1;
      if (a[this.sortField] > b[this.sortField])
        return this.sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Apply limit
  if (this.limitCount !== null) {
    result = result.slice(0, this.limitCount);
  }

  return result;
};


const users = [
  { id: 1, name: "Alice", age: 30, city: "New York" }
]

const newYorkUsers = new Query(users).where("city", "===", "New York").execute();
```

### Problem 7: Event Emitter
```
function createEventEmitter() {
  // Private events storage (closure)
  const events = {};

  return {
    // Subscribe to an event
    on(eventName, callback) {
      if (!events[eventName]) {
        events[eventName] = [];
      }
      events[eventName].push(callback);
      console.log(`Subscribed to "${eventName}"`);
    },

    // Unsubscribe from an event
    off(eventName, callback) {
      if (!events[eventName]) {
        console.log(`No listeners for "${eventName}"`);
        return;
      }

      const index = events[eventName].indexOf(callback);
      if (index !== -1) {
        events[eventName].splice(index, 1);
        console.log(`Unsubscribed from "${eventName}"`);
      } else {
        console.log(`Callback not found for "${eventName}"`);
      }
    },

    // Emit an event with optional data
    emit(eventName, ...args) {
      if (!events[eventName] || events[eventName].length === 0) {
        console.log(`No listeners for "${eventName}"`);
        return;
      }

      console.log(`Emitting "${eventName}" to ${events[eventName].length} listener(s)`);
      events[eventName].forEach((callback) => {
        callback(...args);
      });
    },

    // Get listener count for an event (useful for debugging)
    listenerCount(eventName) {
      return events[eventName] ? events[eventName].length : 0;
    },

    // Remove all listeners for an event
    removeAllListeners(eventName) {
      if (eventName) {
        delete events[eventName];
        console.log(`Removed all listeners for "${eventName}"`);
      } else {
        Object.keys(events).forEach((key) => delete events[key]);
        console.log("Removed all listeners");
      }
    },
  };
}



```

### Problem 8: Function Cache with TTL
```
function memoizeWithTTL(fn, ttl) {
  // Private cache storage (closure)
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    const now = Date.now();

    // Check if cached value exists and is still valid
    if (cache.has(key)) {
      const { value, expiry } = cache.get(key);
      if (now < expiry) {
        console.log(`  [CACHE HIT] Key: ${key}`);
        return value;
      }
      // Cache expired, remove it
      console.log(`  [CACHE EXPIRED] Key: ${key}`);
      cache.delete(key);
    }

    // Cache miss - compute the result
    console.log(`  [CACHE MISS] Computing for key: ${key}`);
    const result = fn.apply(this, args);

    // Store in cache with expiry time
    cache.set(key, {
      value: result,
      expiry: now + ttl,
    });

    return result;
  };
}

function expensiveCalculation(n) {
  console.log(`    (Computing factorial of ${n}...)`);
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

const cachedFactorial = memoizeWithTTL(expensiveCalculation, 2000);
```

### Problem 9: Middleware Pattern
```
function createExpressStyleMiddleware() {
  const middlewares = [];

  return {
    use(fn) {
      middlewares.push(fn);
      return this;
    },

    handle(req, res) {
      let index = 0;

      const next = (error) => {
        if (error) {
          console.log(`  [ERROR] ${error.message}`);
          res.error = error;
          return;
        }

        if (index >= middlewares.length) {
          return;
        }

        const middleware = middlewares[index++];
        try {
          middleware(req, res, next);
        } catch (err) {
          next(err);
        }
      };

      next();
      return res;
    },
  };
}


const app = createExpressStyleMiddleware();

// Logger middleware
app.use((req, res, next) => {
  console.log(`  [LOG] ${req.method} ${req.url}`);
  req.startTime = Date.now();
  next();
});

// Auth middleware
app.use((req, res, next) => {
  if (req.headers?.authorization) {
    console.log("  [AUTH] User authenticated");
    req.user = { id: 1, name: "Admin" };
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});

```

### Problem 10: Advanced Calculator
```

```
