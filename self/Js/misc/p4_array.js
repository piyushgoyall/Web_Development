// const numbers = [1, 2, 3, 4, 5];
// numbers.splice(2, 1, 23, 24);
// console.log(numbers);

//////////////////////

// let a = 7;

// function factorial(number) {
//   let arr = Array.from(Array(number + 1).keys());
//   let c = arr.slice(1).reduce((a, b) => a * b);
//   return c;
// }

// function facFor(number) {
//   let fac = 1;
//   for (let index = 1; index <= number; index++) {
//     fac = fac * index;
//   }
//   return fac;
// }
// console.log(factorial(a));
// console.log(facFor(a));

////////////////////

// // Initialize an empty array
// let numbers = [];

// // Function to add numbers to the array
// function addNumber() {
//   let input = prompt(
//     "Enter a number to add to the array (or type 'stop' to finish):"
//   );

//   while (input.toLowerCase() !== "stop") {
//     let num = parseFloat(input); // Convert input to a number
//     if (!isNaN(num)) {
//       // Check if the input is a valid number
//       numbers.push(num);
//     } else {
//       console.log("Invalid input, please enter a valid number.");
//     }
//     input = prompt(
//       "Enter a number to add to the array (or type 'stop' to finish):"
//     );
//   }

//   console.log("Final array:", numbers);
// }

// // Call the function to start taking inputs
// addNumber();

//////////////////////////////////////////////////////// ARRAY INPUT **********************

// // Import the readline module to handle user input in the terminal
// const readline = require("readline");

// // Create an interface for input/output
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Initialize an empty array
// let numbers = [];

// // Function to prompt the user and add numbers to the array
// function addNumber() {
//   rl.question(
//     "Enter a number to add to the array (or type 'stop' to finish): ",
//     function (input) {
//       if (input.toLowerCase() === "stop") {
//         console.log("Final array:", numbers);
//         rl.close(); // Close the readline interface
//       } else {
//         let num = parseFloat(input); // Convert input to a number
//         if (!isNaN(num)) {
//           // Check if the input is a valid number
//           numbers.push(num);
//         } else {
//           console.log("Invalid input, please enter a valid number.");
//         }
//         addNumber(); // Recursively call the function to continue taking input
//       }
//     }
//   );
// }

// // Call the function to start taking inputs
// addNumber();

////////////////////

// // Import the readline module to handle user input in the terminal
// const readline = require("readline");

// // Create an interface for input/output
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Initialize an empty array
// let numbers = [];

// // Function to prompt the user and add numbers to the array
// function addNumber() {
//   rl.question(
//     "Enter a number to add to the array (or type 0 to finish): ",
//     function (input) {
//       if (parseFloat(input) == 0) {
//         console.log("Final array:", numbers);
//         rl.close(); // Close the readline interface
//       } else {
//         let num = parseFloat(input); // Convert input to a number
//         if (!isNaN(num)) {
//           // Check if the input is a valid number
//           numbers.push(num);
//         } else {
//           console.log("Invalid input, please enter a valid number.");
//         }
//         addNumber(); // Recursively call the function to continue taking input
//       }
//     }
//   );
// }

// // Call the function to start taking inputs
// addNumber();

////////////////////////////////////////////////////////// ARRAY FUNCTIONS **********************

// Sample array
let numbers = [1, 2, 3, 4, 5];
numbers.map((num) => console.log(num));

// 1. forEach - Iterating through each element
numbers.forEach((num, index) => {
  console.log(`Element at index ${index}: ${num}`);
});

// 2. map - Creating a new array by applying a function to each element
let squaredNumbers = numbers.map((num) => num * num);
console.log("Squared Numbers:", squaredNumbers); // [1, 4, 9, 16, 25]

// 3. filter - Creating a new array with elements that pass a condition
let evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("Even Numbers:", evenNumbers); // [2, 4]

// 4. reduce - Reducing the array to a single value
let sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum of Numbers:", sum); // 15

// 5. find - Finding the first element that matches a condition
let firstEven = numbers.find((num) => num % 2 === 0);
console.log("First Even Number:", firstEven); // 2

// 6. findIndex - Finding the index of the first element that matches a condition
let firstEvenIndex = numbers.findIndex((num) => num % 2 === 0);
console.log("Index of First Even Number:", firstEvenIndex); // 1

// 7. some - Checking if at least one element matches a condition
let hasEven = numbers.some((num) => num % 2 === 0);
console.log("Has Even Numbers:", hasEven); // true

// 8. every - Checking if all elements match a condition
let allPositive = numbers.every((num) => num > 0);
console.log("All Positive Numbers:", allPositive); // true

// 9. sort - Sorting the array
let sortedNumbers = numbers.slice().sort((a, b) => b - a); // Sorting in descending order
console.log("Sorted Numbers (Descending):", sortedNumbers); // [5, 4, 3, 2, 1]

// 10. concat - Merging two or more arrays
let moreNumbers = [6, 7, 8];
let combinedNumbers = numbers.concat(moreNumbers);
console.log("Combined Numbers:", combinedNumbers); // [1, 2, 3, 4, 5, 6, 7, 8]

// 11. slice - Extracting a portion of the array
let subArray = numbers.slice(1, 4);
console.log("Sub Array:", subArray); // [2, 3, 4]

// 12. splice - Modifying the array by adding/removing elements
numbers.splice(2, 1, 10); // Removes 1 element at index 2 and adds 10
console.log("Modified Numbers:", numbers); // [1, 2, 10, 4, 5]

// 13. includes - Checking if an array contains a specific element
let containsThree = numbers.includes(3);
console.log("Contains 3:", containsThree); // false

// 14. join - Joining all elements into a string
let joinedNumbers = numbers.join("-");
console.log("Joined Numbers:", joinedNumbers); // "1-2-10-4-5"

// 15. reverse - Reversing the array
let reversedNumbers = numbers.slice().reverse();
console.log("Reversed Numbers:", reversedNumbers); // [5, 4, 10, 2, 1]
