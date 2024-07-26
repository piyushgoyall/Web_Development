// array

let arr = [
  "G21",
  "is ",
  "the",
  "best",
  "class",
  "of",
  "chitkara",
  "university",
  "everyone",
  "knows",
  "this",
];

// let a = arr[0];
// let b = arr[1];
// let c = arr[2];
// let d = arr[3];
// let e = arr[4]; // lengthy

// INSTEAD

// let [a, b, c, d] = arr;
// console.log(a, b, c, d);

// let [a, b, , d] = arr;
// console.log(a, b, d);

// let [a, b, , d, , e] = arr;
// console.log(a, b, d, e);

///////////////////////////// OBJECTS

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

let { name: washingmachinekijai, add } = obj;
console.log(washingmachinekijai);
console.log(add);
