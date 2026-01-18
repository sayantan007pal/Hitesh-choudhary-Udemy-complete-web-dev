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
function reverseString(value){
    const reversedVal = []
    for(let i = 0; i < value.length; i++){
        reversedVal[value.length -1 -i] = value[i]
    }
    reversedVal.toString()
    return reversedVal.join('')
}
```

### Problem 5: Prime Number Checker

```
function isPrime(val){
    if(val %2== 0 || val = 0){
        return false
    }
    else {
        return true
    }
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

### Problem 10: Password Validator

```

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

```
### Problem 8: Conditional Filter
```

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

```

### Problem 5: Method Borrowing
```

```

### Problem 6: Bank Account
```

```

### Problem 7: Bind Practice
```

```

### Problem 8: Event Handler Simulation
```

```

### Problem 9: Chain Methods
```

```

### Problem 10: Complex Context Challenge
```

```

---

## Higher Order Functions and Nested Functions

### Problem 1: Function Multiplier
```

```

### Problem 2: Logger Wrapper
```

```

### Problem 3: Counter Closure
```

```

### Problem 4: Once Function
```

```

### Problem 5: Partial Application
```

```

### Problem 6: Array Filter Builder
```

```

### Problem 7: Memoization
```

```

### Problem 8: Function Composition
```

```

### Problem 9: Rate Limiter
```

```

### Problem 10: Advanced Closure - Private Variables
```

```

---

## Mixed Challenge Problems

### Problem 1: Custom Array Methods
```

```

### Problem 2: Function Pipeline
```

```

### Problem 3: Retry Logic
```

```

### Problem 4: Currying
```

```

### Problem 5: Debounce
```

```

### Problem 6: Method Chaining with Context
```

```

### Problem 7: Event Emitter
```

```

### Problem 8: Function Cache with TTL
```

```

### Problem 9: Middleware Pattern
```

```

### Problem 10: Advanced Calculator
```

```
