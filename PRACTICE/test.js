

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
// const value = new Person("Sayantan", "Pal")
// console.log(value.getFullName())