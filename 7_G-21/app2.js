// Prototypal Inheritance

// let person = {
//   name: "Steve",
//   age: 25,

//   showDetails: function () {
//     console.log(this.name + " " + this.age);
//   },
// };

// console.log(person);

///////////////////////////

// PROTOTYPAL INHERITANCE

let person = {
  name: "Steve",
  age: 25,

  showDetails: function () {
    console.log(this.name + " " + this.age);
  },
};

let person2 = {
  name: "Steve",
};

// person2.showDetails(); // error
console.log("before", person2);

person2.__proto__ = person; // gives all the properties of person to person2 but since it happened as an inheritance by a prototype so it is called prtotypal inheritance.

console.log("After Prototype ", person2);

console.log(person2.name + " " + person2.age);

console.log(person2.showDetails);
