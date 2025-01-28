//  Primitive

//  7 types : String, Number, Boolearn, null, undefined, Symbol, BigInt

const score = 100;
const scoreValue = 100.3;

const isLoggedIn = false;
const outsideTemp = null;
let userEmail;

const id = Symbol("123");
const anotherId = Symbol("123");

console.log(id === anotherId);

// const bigNumber = 3456543576654356754n

// Reference (Non primitive)

// Array, Objects, Functions

const heros = ["shaktiman", "naagraj", "doga"];
let myObj = {
  name: "hitesh",
  age: 22,
};

const myFunction = function () {
  console.log("Hello world");
};

console.log(typeof anotherId);

// * Primitive Datatypes

//      Type	        typeof Result
// 1)  Number	        number
// 2)  String	        string
// 3)  Boolean	        boolean
// 4)  BigInt	        bigint
// 5)  Symbol	        symbol
// 6)  Null	            object
// 7)  Undefined	    undefined

// * Non Primitive Datatypes

//      Type	        typeof Result
// 1)  Object	        object
// 2)  Array	        object
// 3)  Function	        function

// https://262.ecma-international.org/5.1/#sec-11.4.3
