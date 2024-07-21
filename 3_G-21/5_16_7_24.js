let arr = [1, 2, 3]; // 0,1,2
arr.myValue = 12;

console.log(arr);
console.log(arr.myValue);

////////////////////////////

// function fn() {
//   let a = 2;
//   console.log(a);
// }
// fn.myVal = 2;
// console.log(fn);

// // the above shows that functions are also objects

////////////////////////////

// // in js everything is an object

// // let arr = [1, 2, 3];
// // here 1,2 and 3 are mapped with their index

// let arr = [1, 2, , , , , , , , , , , , , , , , , 3];
// arr.myValue = 12;
// console.log(arr);

////////////////////////////

// variable shadowing: does by const and let
// the inside function overwrites the global valueof the variable

// let a = 2;

// function fn() {
//   let a = 5;
//   console.log(a);
// }

// fn();

////////////////////////////

// {
//   let a = 2;
//   let a = 5;
// }
// the above code throws error (also in case of const)
// the below does not throw error

// function fn() {
//   var a = 1;
//   var a = 90;
//   console.log(a);
// }
// fn();

////////////////////////////

// var a = 10;
// console.log("line number 2", a);
// function fn()
// {
//     console.log("line number 4", a);
//     var a = 20;
//     a++;
//     console.log("line number 7", a);
//     if (a)
//     {
//         var a = 30;
//         a++;
//         console.log("line number 11", a);
//     }
//     console.log("line number 13", a);
// }
// fn();
// console.log("line number 2", a);

// // // output
// // line number 2 10
// // line number 4 undefined
// // line number 7 21
// // line number 11 31
// // line number 13 31
// // line number 2 10

//////////////////////////////

// console.log("line number 1", varName);
// var varName = 10;

// function b()
// {
//     console.log("line number 8", varName);
// }

// console.log("line number 3", varName);
// function fn()
// {
//     console.log("line number 5", varName);
//     var varName = 20;
//     b();
//     console.log(varName);
// }
// fn();

// // OUTPUT

// // line number 1 undefined
// // line number 3 10
// // line number 5 undefined
// // line number 8 10
// // 20

// ///////// lexical scope: b ko call kiy ahai tab varName ki value function ke around dekhenge na ki function call ke
