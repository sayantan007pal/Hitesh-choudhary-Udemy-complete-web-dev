/*
so here we are using object to store the data but remember we can change the values inside the object as 
in primitive data types we can't change the values but in non primitive data types we can change the values
*/
const person = {
    "Full Name": "Sayantan Pal",
    name: "Sayantan",
    age: 21
}
console.log(person);
console.log("*********************");
console.log(person['Full Name']);
person.surname = "Pal";
console.log(person);
console.log("*********************");
//we can also inject values into the object as well
person.gender = "Male";
console.log(person);