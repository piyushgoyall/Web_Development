/* Create a faulty calculator using JavaScript

This faulty calculator does following:
1. It takes two numbers as input from the user
2. It perfoms wrong operations as follows:

+ ---> -
* ---> +
- ---> /
/ ---> **


It performs wrong operation 10% of the times

*/

let a = 5;
let b = 6;
let op = "+";

let x = Math.random();
console.log(x);

if (x > 0.1) {
  if (op == "+") console.log(a + b);
  else if (op == "-") console.log(a - b);
  else if (op == "*") console.log(a * b);
  else if (op == "/") console.log(a / b);
  else if (op == "**") console.log(a ** b);
} else {
  if (op == "+") console.log(a - b);
  else if (op == "-") console.log(a / b);
  else if (op == "*") console.log(a + b);
  else if (op == "/") console.log(a ** b);
}
