// // synchronous callback

// function greet(personName, age, callback, callback2) {
//   let msg = "Hello " + personName;
//   let ageOfPerson = age;

//   callback(msg);
//   callback2(ageOfPerson);
// }

// function logGreeting(greeting) {
//   console.log(greeting);
// }

// function showAge(age) {
//   console.log(age);
// }

// greet("Steve", 25, logGreeting, showAge);

////////////////////// Async Callback

console.log("Hello");

setTimeout(function st1() {
  console.log("I am ST1");
}, 2000);

setTimeout(function st2() {
  console.log("I am ST2");
}, 1000);

function sayBye() {
  console.log("bye");
}

sayBye();
