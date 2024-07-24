// this in strict mode

// "use strict";
// console.log(this); // empty object

////////////

// function showThis() {
//     console.log(this)
// }
// showThis() // prints global object

//////////////

// let obj = {
//   name: "adam",
//   f: function () {
//     console.log(this);
//   }
// }
// obj.f(); // prints the object

//////////////

// let obj = {
//   name: "adam",
//   f: function () {
//     function g() {
//       console.log(this);
//     }
//     g();
//   }
// }
// obj.f(); // prints global object

/////////// using strict ode

"use strict";

// console.log(this) // empty mode

// function showThis() {
//   console.log(this);
// }
// showThis(); // undefined

//// in object

// let obj = {
//   name: "adam",
//   f: function () {
//     console.log(this);
//   },
// };
// obj.f(); // object

// in function inside function

// let obj = {
//   name: "adam",
//   f: function () {
//     function g() {
//       console.log(this);
//     }
//     g();
//   },
// };
// obj.f(); // undefined