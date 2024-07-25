console.log("Program Starts");

setTimeout(() => { // Goes into MICRO TASK QUEUE
  console.log("I am Set Time Out");
}, 1000);

Promise.resolve().then((val) => { // Goes into PROMISE TASK QUEUE
  console.log("Promise output");
});

console.log("Program Ends");

// PRIORITY OF PROMISE IS GREATER THAN PRIORITY OF CALLBACK. (NOBODY KNOWS WHY !!)
// SO EVENT LOOP SENDS PROMISE FIRST

///////////////////////////////////////////////////

// const PENDING = 0;
// const FULFILLED = 1;
// const REJECTED = 2;

// function customPromise(executor) {
//   let state = PENDING;
//   let value = null;
//   let handlers = [];
//   let catchers = [];

//   function resolve(result) {
//     if (state !== PENDING) return;

//     state = FULFILLED;
//     value = result;

//     handlers.forEach((h) => h(value));
//   }

//   function reject(err) {
//     if (state !== PENDING) return;

//     state = REJECTED;
//     value = err;

//     catchers.forEach((c) => c(value));
//   }

//   this.then = function (successCallback) {
//     if (state === FULFILLED) {
//       successCallback(value);
//     } else {
//       handlers.push(successCallback);
//     }
//   };

//   this.catch = function (failureCallback) {
//     if (state === REJECTED) {
//       failureCallback(value);
//     } else {
//       catchers.push(failureCallback);
//     }
//   };

//   executor(resolve, reject);
// }

// const doWork = (res, rej) => {
//   if (2 == 2) { // 2 == 1 also
//     setTimeout(() => {
//       res("Promise Resolved hello");
//     }, 1000);
//   } else {
//     setTimeout(() => {
//       rej("Promise Rejected Bye");
//     }, 1000);
//   }
// };

// let greetMsg = new customPromise(doWork);
// greetMsg.then((val) => {
//   console.log("then value", val);
// });
// greetMsg.catch((err) => {
//   console.log("catch value", err);
// });
