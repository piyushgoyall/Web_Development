// High Order Function (map, filter, reduce)

let myArr = [1, 2, 3, 4, 5];

// Square every value
// for (let i = 0; i < myArr.length; i++) {
//   myArr[i] = myArr[i] * myArr[i];
// }

// for (let i = 0; i < myArr.length; i++) {
//   console.log(myArr[i]);
// }

// Shorter Method USING MAP
// let newArr = myArr.map((myArr) => myArr * myArr);
// console.log(newArr);

// //filter

// let filterArr = myArr.filter((x) => {
//   return x % 2 === 0;
// });

// console.log(filterArr);

//reduce

let sumArr = myArr.reduce((accumulator, x) => {
  return accumulator + x;
}, 0);

console.log(sumArr);
