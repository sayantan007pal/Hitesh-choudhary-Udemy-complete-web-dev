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

```

### Problem 2: Greeting Generator

```

```