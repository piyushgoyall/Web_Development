// // Polyfills (making something is called polyfill)

// let myArr = [1, 2, 3, 4, 5];
// // let newArr = myArr.map((i) => i * i);
// // console.log(newArr);

// // to create a map you need a function and a callback

// function myPolyFillMap(arr, cb) {
//   let newArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     newArr.push(cb(arr[i]));
//   }
//   return newArr;
// }

// function cb(arrElement) {
//   return arrElement * arrElement;
// }

// let newerArr = myPolyFillMap(myArr, cb);
// console.log(newerArr);


//////// POLYFILL OF FILTER FUNCTION

function myPolyFillFilter(arr, cb) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (cb(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function cb(arrElement) {
  return arrElement % 2 === 0;
}

let myArr = [1, 2, 3, 4, 5, 6];

let newerArr = myPolyFillFilter(myArr, cb);
console.log(newerArr);
