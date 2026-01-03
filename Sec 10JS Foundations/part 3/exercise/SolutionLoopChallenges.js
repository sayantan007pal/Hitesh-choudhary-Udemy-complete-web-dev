//challenge 1
let i = 0;
let sum = 0;
while (i<=5){
    sum+=i;
    i++;
}
console.log(sum);

//challenge 2

let j =5;
let countdown = []
while (j>0){
    countdown.push(j);
    j--;
}
console.log(countdown);


//challenge 3. //GO TO BROWSER FOR EXECUTION
// let teaCollection = [];
// let tea;
// do {
//     tea = prompt("Enter your favorite tea")
//     if (tea !=="stop"){
//         teaCollection.push(tea)
//     }
// } while (tea !== "stop");
// console.log(teaCollection)

//challenge 4

let total =0;
let il= 1;
do {
    total+=il;
    il++;

} while (il<=3);
console.log(total);


//challenge 5
let k =0;
let val = [2, 4, 6];
let multipliedNumbers = []
for (k=0; k<val.length; k++){
    multipliedNumbers.push(val[k]*2)

}
console.log(multipliedNumbers);


//chalenge 6

cities = ["Paris", "New York", "Tokyo", "London"]
let cityList = []
for (let i = 0; i<cities.length; i++){
    cityList.push(cities[i])
}
console.log(cityList)