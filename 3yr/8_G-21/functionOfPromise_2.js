// Promise.all (Teeno ko chalaega aur agar koi reject ho gya to usse print karega)

// let p1 = new Promise(function (resolve, reject) {
//   resolve("Promise 1 is resolved");
// });

// let p2 = new Promise(function (resolve, reject) {
//   reject("Promise 2 is rejected");
//   //   resolve("Promise 2 is rejected");
// });

// let p3 = new Promise(function (resolve, reject) {
//   resolve("Promise 3 is resolved");
// });

// let promiseAll = Promise.all([p1, p2, p3]); // ismai ye cheez bhi hoti hai ki agar ek promise bhi reject hota hai toh reject msg mil jayega or baki koi bhi promise resolve ni hoga
// promiseAll
//   .then((PromiseArr) => {
//     console.log(PromiseArr);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//// Promise.race (jo pehle ho jaae reject ya resolve)

// let p1 = new Promise(function (resolve, reject) {
//   resolve("Promise 1 is resolved");
// });

// let p2 = new Promise(function (resolve, reject) {
//   resolve("Promise 2 is resolved");
// });

// let p3 = new Promise(function (resolve, reject) {
//   resolve("Promise 3 is resolved");
// });

// Promise.race([p1, p2, p3])
//   .then((val) => {
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//

// let p1 = new Promise(function (resolve, reject) {
//   resolve("Promise 1 is resolved");
// });

// let p2 = new Promise(function (resolve, reject) {
//   reject("Promise 2 is rejected");
// });

// let p3 = new Promise(function (resolve, reject) {
//   resolve("Promise 3 is resolved");
// });

// Promise.race([p1, p2, p3])
//   .then((val) => {
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//

// let p1 = new Promise(function (resolve, reject) {
//   reject("Promise 1 is rejected");
// });

// let p2 = new Promise(function (resolve, reject) {
//   reject("Promise 2 is rejected");
// });

// let p3 = new Promise(function (resolve, reject) {
//   resolve("Promise 3 is resolved");
// });

// Promise.race([p1, p2, p3])
//   .then((val) => {
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

/////////////////////////  AllSettled (sabka status bataega eihter rejected or resolved)

// let p1 = new Promise(function (resolve, reject) {
//   resolve("Promise 1 is resolved");
// });

// let p2 = new Promise(function (resolve, reject) {
//   resolve("Promise 2 is resolved");
// });

// let p3 = new Promise(function (resolve, reject) {
//   resolve("Promise 3 is resolved");
// });

// Promise.allSettled([p1, p2, p3])
//   .then((val) => {
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//

// let p1 = new Promise(function (resolve, reject) {
//   resolve("Promise 1 is resolved");
// });

// let p2 = new Promise(function (resolve, reject) {
//   reject("Promise 2 is rejected");
// });

// let p3 = new Promise(function (resolve, reject) {
//   resolve("Promise 3 is resolved");
// });

// Promise.allSettled([p1, p2, p3])
//   .then((val) => {
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

///////////////// Finally (finally vale part ko chalna he chalna hai)

// function test() {
//   let a = 1 + 1;
//   // let a = 1 + 1 + 1;

//   return new Promise(function (resolve, reject) {
//     if (a === 2) {
//       resolve("Promise Resolved");
//     } else {
//       reject("Promise Rejected");
//     }
//   });
// }

// test()
//   .then((val) => {
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//

// function test() {
//   let a = 1 + 1;
//   // let a = 1 + 1 + 1;

//   return new Promise(function (resolve, reject) {
//     if (a === 2) {
//       resolve("Promise Resolved");
//     } else {
//       reject("Promise Rejected");
//     }
//   });
// }

// test()
//   .then((val) => {
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log("Experiment Completed");
//   });


///////////////////////

