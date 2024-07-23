// In Case Of Browser

alert("Kaise ho")

// console.log(this); // window object

//////////

// function showThis() {
//     console.log(this)
// }
// showThis() // prints window object

/////////////

// let obj = {
//   name: "adam",
//   f: function () {
//     console.log(this);
//   }
// }
// obj.f(); // prints the object

/////////////

// let obj = {
//   name: "adam",
//   f: function () {
//     function g() {
//       console.log(this);
//     }
//     g();
//   },
// };
// obj.f(); // window object


// strict mode
"use strict"

// console.log(this); // window object

//////

// function showThis() {
//     console.log(this)
// }
// showThis() // undefined

//////////

// let obj = {
//   name: "adam",
//   f: function () {
//     console.log(this);
//   }
// }
// obj.f(); // prints the object

///////////

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