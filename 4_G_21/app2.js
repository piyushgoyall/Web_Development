const fs = require("fs");
// console.log("Before");

// // Synchronous function
// try {
//   let buffer = fs.readFileSync("./webd_temp/4_G_21/f1.txt"); // Updated relative path
//   console.log(buffer.toString());
// } catch (err) {
//   console.error("Error reading file synchronously:", err);
// }

// console.log("After synchronous reading");

// // Asynchronous function
// fs.readFile("./webd_temp/4_G_21/f1.txt", (err, data) => {
//   // Updated relative path
//   if (err) {
//     console.error("Error reading file asynchronously:", err);
//     return;
//   }
//   console.log(data.toString());
// });

// console.log("After asynchronous reading");


let promise = fs.promise.readFile("f1.txt");
console.log(promise)
promis.then((data) => {
    console.log(" " + err);
})
promise.catch((err) => {
    console.log(" " + err);
})