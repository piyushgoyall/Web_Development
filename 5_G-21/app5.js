// // imperative function

// const x = 5;
// const xSq = x * x;

// let isEven;
// if (xSq % 2 == 0) {
//   isEven = true;
// } else {
//   isEven = false;
// }
// console.log(isEven);

// Declerative function
const isSqEven = (x) => ((x * x) % 2 == 0 ? true : false); // fat arrow function
console.log(isSqEven(4));
