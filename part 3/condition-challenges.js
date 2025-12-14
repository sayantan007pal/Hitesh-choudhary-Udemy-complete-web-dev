const userName1 = "12";
const userName2 = 12;

if (userName1 == userName2) {
    console.log("User names are the same");
}
else {
    console.log("User names are different");
}
 // == checks for value not type    => User names are the same

 if (userName1 === userName2) {
    console.log("User names are the same");
}
else {
    console.log("User names are different");
}
// === checks for value and type    => User names are different

//check of array is empty or not 
const arr = [1, 3];
if (arr.length== 0){
    console.log("Array is empty");
}
else{
    console.log("Array is not empty");
}