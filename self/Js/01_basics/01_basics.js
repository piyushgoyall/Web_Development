const accountId = 144553; // once assigned the value can not be changed.
let accountEmail = "temp@gmail.com"; // let & const are block scoped
var accountPassword = "12345"; // var is global scope i.e. if you change the value of the variable, it will reflect in the entire code at all places.
accountCity = "Jaipur";
let accountState; // consoling this gives undefined.

/*
Prefer not to use var
because of issue in block scope and functional scope
*/

console.log(accountId);
console.table([
  accountId,
  accountEmail,
  accountPassword,
  accountCity,
  accountState,
]);

// Data Types =>

// number => 2 to power 53
// bigint
// string => ""
// boolean => true/false
// null => standalone value
// undefined
// symbol => for uniqueness (useful in react)

// object

console.log(typeof null); // obejct
console.log(typeof undefined); // undefined
