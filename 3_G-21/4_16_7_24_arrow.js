// first class citizens

// let varFunc = function fn() {
//     console.log("hello world");
// }

// let varFunc = function ()
// {
//     console.log("Hello World");
// }

// ARROW FUNCTION

// let varFunc = () => console.log("hello");

// let varFunc = () => console.log("hello");

// let varFunc = () => {
//   console.log("hello");
// }

// varFunc();
////////////////////

// function func() {
//   console.log("I am outer function");
//   return function func2() {
//     console.log("I am in a function");
//     return 1;
//   }
// }

// let varFunc = func();
// console.log(varFunc());

// console.log(this);
// in browser this gives window in return whereas in vs code it gives empty array {}

// console.log(global);

////////////////////

// function func1() {
//     console.log("i am real function")
// }
// function func1()
// {
//     console.log("i am the only real function")
// }

// func1();

////////////////////

// console.log("varName", varName);
// var varName;
// console.log("varName", varName);
// varName = "Captain America";
// console.log("varName", varName);
// fn();
// function fn() {
//   console.log("Helo from fn");
// }
// fn();

// // fnContainer();

// var fnContainer = function () {
//   console.log("I am an expression");
// };
// fnContainer();

////////////////////

// console.log("line number 1", varName);
// var varName = 10;

// function b() {
//   console.log("line number 5", varName);
// }

// console.log("line number 7", varName);

// function fn() {
//   console.log("line number 9", varName);
//   var varName = 20;
//   b();
//   console.log("line number 13", varName);
// }

// fn();

////////////////////

