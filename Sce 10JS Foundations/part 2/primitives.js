let number = 120;
console.log(number);

let anotherNumber = new Number(1239);
console.log(anotherNumber);
console.log(anotherNumber.valueOf())

console.log("*********************");

console.log(typeof number);
console.log(typeof anotherNumber);

console.log("*********************");
//null and undefined

let firstName = null;
console.log(firstName);
let lastName;
console.log(lastName);

console.log("*********************");
//string 

const name = "Sayantan";
console.log(name);  

const oldGreet = "Hello" + " " + name;
console.log(oldGreet);

const newGreet = `Hello ${name} !`; //string interpolation
console.log(newGreet);

const demoCompute = ` My age is ${5 * 5}`;
console.log(demoCompute);
