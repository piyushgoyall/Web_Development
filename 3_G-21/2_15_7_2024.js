// array

// let arr = [];
let arr = [1, 2, 3, 4, 5];
// console.log(arr);
// console.log(arr.length);

let i = 0;
while (i < arr.length) {
  console.log("Element at index ", i, " is ", arr[i]);
  i++;
}

arr.push("last value");
console.log(arr);

arr.unshift("First value");
console.log(arr);

arr.shift();
console.log(arr);

let partArray = arr.slice(2);
console.log(partArray);
console.log(arr);

arr.splice(2, 3);
console.log(arr);

// // if else

// let age = 12;
// if (age < 12) console.log("Child");
// else if (age >= 12 && age <= 19) console.log("Teenager");
// else console.log("Adult");
