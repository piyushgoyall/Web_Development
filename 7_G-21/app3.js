// Object of class

// class Person {
//   constructor(name, age) {
//     // constructor function
//     this.name = name;
//     this.age = age;
//   }
//   showDetails() {
//     return this.name;
//   }
// }

// // let person = new Person();
// // console.log(person);

// let person = new Person("Adam", 23);
// // console.log(person);

// console.log(person.showDetails());

///////// INHERITANCE NORMAL

class Person {
  constructor(name, age) {
    // constructor function
    this.name = name;
    this.age = age;
  }
  showDetails() {
    return this.name;
  }
}

class PersonChild extends Person {
  constructor() {
    super("G21", 87);
  }
}

let Person1 = new PersonChild();
console.log(Person1);
