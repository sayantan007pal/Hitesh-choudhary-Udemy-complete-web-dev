//example 1 by me
//in document.querySelector(#id) used for ids
//in document.querySelector(.class) used for classes


// console.log(document.querySelector("#changeTextButton").id)


let hold = document.getElementById("changeTextButton")
let changeOnCLick = hold.addEventListener("click", function(){
    console.log(this)//this will show the element on which we clicked
    let para = document.getElementById("myParagraph")
    console.log(para) //this will show the element on which we clicked
    let changingText = para.textContent = "the paragraph is changed"
    console.log(changingText) //this will show the text content of the element
})
// console.log(hold)

/*Q. why here we not use arrow function 
and have to use normal function like this "let changeOnCLick = hold.addEventListener("click", function(){
    console.log(this)
})"?
*/




//example 2 by  me 

let gettingCityNames = document.getElementById("highlightFirstCity")
let highlightOnClickButton = gettingCityNames.addEventListener("click", function(){
  let grabCities = document.getElementById("citiesList")
  let getFirstCity = grabCities.firstElementChild
  let highlightByClasssName = getFirstCity.classList.add("highlight")
})



/*Q. How DOM is different from HTML?
*/


//example 3 by me 

document.getElementById("changeOrder").addEventListener("click", function(){
  document.getElementById("coffeeType").textContent = "Espresso"
})



document.getElementById("addNewItem").addEventListener("click", function(){
  let addedItem = document.createElement("li")     // this will create a new element of type li
  addedItem.textContent= "eggs"
  
  document.getElementById("shoppingList").appendChild(addedItem) // this will add the element to the list
})

/**
 * why when i gave "document.getElementById("addNewItem").addEventListener("click", function(){
  let addedItem = document.createElement("li").textContent= "eggs"
  
  document.getElementById("shoppingList").appendChild(addedItem)" this, i got this error "script.js:54 Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
    at HTMLButtonElement.<anonymous> (script.js:54:43)"
    but 
    on correcting that to "
document.getElementById("addNewItem").addEventListener("click", function(){
  let addedItem = document.createElement("li")
  addedItem.textContent= "eggs"
  
  document.getElementById("shoppingList").appendChild(addedItem)
})" i got eggs added to the list???
 */






//example 5 by me 

document.getElementById("removeLastTask").addEventListener("click", function(){
  let grabTaskList = document.getElementById("taskList")
  let getLastTask = grabTaskList.lastElementChild //this will get the last element of the list
  getLastTask.remove()
})











// //example 1

// document
//   .getElementById("changeTextButton")
//   .addEventListener("click", function () {
//     let paragraph = document.getElementById("myParagraph");
//     paragraph.textContent = "the paragraph is changed";
//   });

// //example 2

// document
//   .getElementById("highlightFirstCity")
//   .addEventListener("click", function () {
//     let citiesList = document.getElementById("citiesList");
//     citiesList.firstElementChild.classList.add("highlight");
//   });

// //example 3

// document.getElementById("changeOrder").addEventListener("click", function () {
//   let coffeeType = document.getElementById("coffeeType");
//   coffeeType.textContent = "Espresso";
//   coffeeType.style.backgroundColor = "brown";
//   coffeeType.style.padding = "5px";
// });

// //example 4
// document.getElementById("addNewItem").addEventListener("click", function () {
//   let newItem = document.createElement("li");
//   newItem.textContent = "Eggs";

//   document.getElementById("shoppingList").appendChild(newItem);
// });

// //example 5
// document
//   .getElementById("removeLastTask")
//   .addEventListener("click", function () {
//     let taskList = document.getElementById("taskList");
//     taskList.lastElementChild.remove();
//   });

// // example 6

// document
//   .getElementById("clickMeButton")
//   .addEventListener("dblclick", function () {
//     alert("chaicode");
//   });

// // example 7

// document.getElementById("teaList").addEventListener("click", function (event) {
//   if (event.target && event.target.matches(".teaItem")) {
//     alert("You selected: " + event.target.textContent);
//   }
// });

// //example 8

// document
//   .getElementById("feedbackForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     let feedback = document.getElementById("feedbackInput").value;
//     console.log(feedback);
//     document.getElementById(
//       "feedbackDisplay"
//     ).textContent = `Feedback is: ${feedback}`;
//   });

// //example 9

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("domStatus").textContent = "DOM fully loaded";
// });

// //example 10
// document
//   .getElementById("toggleHighlight")
//   .addEventListener("click", function () {
//     let descriptionText = document.getElementById("descriptionText");
//     descriptionText.classList.toggle("highlight");
//   });
