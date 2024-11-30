// var a = 5;

// {
//   a = 6;
//   console.log(a);
// }

// console.log(a);

///////////////////////

// let x = 5;

// {
//   x = 7;
//   console.log(x);
// }
// x = 5;

// console.log(x);

///////////////////////

// const p = 5;
// // {
// //   p = 4;
// //   console.log(p);
// // }

// console.log(p);

//////////

// st = "Hello";
// st = st + 5;
// console.log(st);
// console.log(typeof st);

//////////

// const obj = {
//   a: 1,
//   b: 2,
//   c: 3,
// };

// // obj[a] = 5;
// console.log(obj);

///////

// ___ = "Hello";
// console.log(___);

//////

// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Please enter your name: ", function (name) {
//   console.log("Hello, " + name + "!");
//   rl.close(); // Close the interface after receiving input
// });

/////////

const readlineSync = require("readline-sync");

const name = readlineSync.question("Please enter your name: ");
console.log("Hello, " + name + "!");

/////////////////////////////////////////////////////////////////

// obj = {
//   a: 78,
//   b: 100,
//   c: 82,
//   d: 55,
// };

// for (let x in obj) console.log(obj[x]);

// for (let value of Object.values(obj)) {
//   console.log(value);
// }

// console.log();

// for (let key of Object.keys(obj)) {
//   console.log(obj[key]);
// }

// console.log();

// for (let [key, value] of Object.entries(obj)) {
//   console.log(`${key}: ${value}`);
// }

/////////

// let i = 0;
// const interval = setInterval(() => {
//   process.stdout.write(`Progress: ${i}%\r`);
//   i += 10;
//   if (i > 100) {
//     clearInterval(interval);
//     console.log("Done!");
//   }
// }, 500);
