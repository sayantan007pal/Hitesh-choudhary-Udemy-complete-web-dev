/*
String
Number
BigInt
Boolean
Undefined ---> no defination
Null ---> empty
Object
Symbol
*/

// var is function-scoped (not block-scoped), can be redeclared, and is hoisted with undefined value
// Avoid using var as it can lead to unexpected behavior and pollute the global scope
var score = 100;
console.log(score);

// let is block-scoped, cannot be redeclared in the same scope, and is hoisted but not initialized (temporal dead zone)
// Preferred for variables that need to be reassigned
let score2 = 200;
console.log(score2);

// const is block-scoped, cannot be redeclared or reassigned, and is hoisted but not initialized (temporal dead zone)
// Preferred for variables that should remain constant throughout the program
const score3 = 300;
console.log(score3);


//Object

let teaTypes = ["Earl Grey", "Green", "Oolong", "Matcha"];
console.log(teaTypes);

let user = { name: "John", age: 30 };
console.log(user);


let getScore = score;