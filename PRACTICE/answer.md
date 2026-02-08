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
    return fucntion argument(val){
        return num * val
    }

}
cosnt double = createMultiplier(3)
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
