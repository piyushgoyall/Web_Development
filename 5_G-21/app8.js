// // Closures

// function calculate(a, b) {
//   let result = a + b;
//   return result;
// }

// console.log(result);

// //lexical scope
// function add() {
//   let a = 4;

//   function addChild() {
//     console.log(a + 5);
//   }

//   addChild();
// }

// add();

// //closure

function add() {
  let a = 4;

  function addChild() {
    console.log(a + 5);
  }

  return addChild;
}

let catchAdd = add();
console.log(catchAdd);

catchAdd();
