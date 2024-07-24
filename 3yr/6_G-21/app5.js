// FUNCTION CURRING

// function currying using bind

// function add(a, b) {
//   console.log(a + b);
// }

// let addwith2 = add.bind(this, 2); //this add function ko refer kr ra hai and 2 a ki value ko
// addwith2(5);

////////////////

// function add(a, b) {
//   console.log(a + b);
// }

// let addwith2 = add.bind(this);
// addwith2(2, 4);

/////////////

// function add(a, b) {
//   console.log(a + b);
// }

// let addwith2 = add.bind(this, 2, 5); // uses only default values
// addwith2();

///////////////////

// function add(x) {
//   return function (y) {
//     console.log(x + y);
//   };
// }

// let addWith2 = add(2);
// addWith2(3);

///////////

// function kyaKrnaHai() {
//   let a = 2;
//   return function () {
//     console.log(a);
//   };
// }
// let rVal = kyaKrnaHai();
// rVal();

//////////

// let person1 = {
//   name: "Adam",
//   age: 25,
// };

// let showDetails = function () {
//   console.log(this.name + " " + this.age);
// };

// let showDetailsBind = showDetails.bind(person1);
// showDetailsBind();

//////////

// let person1 = {
//   name: "Adam",
//   age: 25,
// };

// let showDetails = function (city, state) {
//   console.log(this.name + " " + this.age + " " + city + " " + state);
// };

// let showDetailsBind = showDetails.bind(person1, "Noida");
// showDetailsBind("UP");

// Function.prototype.myBind = function (...args) {
//   let obj = this;
//   params = args.slice(1);
//   return function (...args2) {
//     obj.apply(args[0], [...params, ...args2]);
//   };
// };

// let showDetailsMyBind = showDetails.myBind(person1, "Lucknow");
// showDetailsMyBind("UP");

//////////

Function.prototype.myBind = function (...args) {
  // ... represnt whatever function we pass fill be stored as first, second and third value (ASKED FOR SDE2 ROLE)
  let obj = this;
  params = args.slice(1);
  return function (...args2) {
    obj.apply(args[0], [...params, ...args2]); // inside array ... means -> copy karne ka ek tareeka arr1 = [1,2,3] and arr2 = arr1, this means array 2 points to arr1 address but ... creates a new copy EX.
    // let arr = [1, 2, 3];
    // let arr2 = arr;
    // arr2.meraname = "Kyu batao";
    // console.log(arr);
    // console.log(arr2);

    // SPREAD OPERATOR
    // let arr2 = [...arr];
    // arr2.meraname = "KyuBatao";
    // console.log(arr);
    // console.log(arr2);
  };
};
