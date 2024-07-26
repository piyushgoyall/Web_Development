// Object

let obj = {
  name: "Badobadi",
  add: {
    country: "pakistan",
    state: {
      code: "Karachi",
      pin: "05444",
    },
  },
};

// let obj2 = obj;

// obj2.name = "gumnam";

// console.log(obj);
// console.log(obj2);

// let obj2 = { ...obj };
// obj2.name = "khadobaddi";

// console.log(obj);
// console.log(obj2); //

// obj2.add.country = "lahore";
// console.log(obj);
// console.log(obj2); // this is shallow copy

//////////////

// to change every object

let obj2 = JSON.parse(JSON.stringify(obj));
obj.name = "kahli";
obj.add.country = "India";
obj.add.state.code = "IN";

console.log(obj2);
console.log(obj);
