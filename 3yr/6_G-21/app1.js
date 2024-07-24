// Prototypes (when we make a polyfill we just write the function but it is not added to the fuctions in array which are predefined like push pop etc but when we write a prototype our function gets added to the Array functions and all Array function are defines in prototype)

// Array.prototype.g21IsTheBestClass = () => {
//   //   console.log("this");
//   //   console.log(this);
//   console.log("g21 is the best class");
// };

// let arr = [1, 2, 3, 4, 5];
// arr.g21IsTheBestClass();

/////////////////////////////
// Array.prototype.myMap = function (cb) {
//   let newArr = [];
//   for (let i = 0; i < this.length; i++) {
//     newArr.push(cb(this[i]));
//   }
//   return newArr;
// };

// function square(x) {
//   return x * x;
// }

// let arr = [1, 2, 3, 4];
// let newerArr = arr.myMap(square);

// console.log(newerArr);

/////////////////// Prototype of filter

Array.prototype.myFilter = function (cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i])) {
      newArr.push(this[i]);
    }
  }
  return newArr;
};

function isEven(x) {
  return x % 2 === 0;
}

let arr = [1, 2, 3, 4];
let newerArr = arr.myFilter(isEven);

console.log(newerArr);
