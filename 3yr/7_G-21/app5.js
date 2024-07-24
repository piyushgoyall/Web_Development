// // TIMEOUT

// function greet() {
//   console.log("Hello");
// }

// setTimeout(greet, 9000);

// console.log("Byeeee");

//////////// INTERVAL

// let counter = 0;
// let intervalId;

// function sayHi() {
//   counter++;
//   console.log("Hiiii");

//   if (counter >= 3) {
//     clearInterval(intervalId);
//   }
// }

// intervalId = setInterval(sayHi, 2000);

//////////////// MAKING SELF SETTIMEOUT AND SETINTERVAL
function createSetInterval() {
  let intervalId = 0;
  let intervalMap = {};

  function setIntervalPolyfill(callback, delay = 0, ...args) {
    var id = intervalId++;

    function repeat() {
      intervalMap[id] = setTimeout(() => {
        callback(...args);

        if (intervalMap[id]) {
          repeat();
        }
      }, delay);
    }

    repeat();
    return id;
  }

  function clearIntervalPolyfill(id) {
    clearTimeout(intervalMap[id]);
    delete intervalMap[id];
  }

  return {
    setIntervalPolyfill,
    clearIntervalPolyfill,
  };
}

const { setIntervalPolyfill, clearIntervalPolyfill } = createSetInterval();

let counter = 0;
let intervalId;

function greeting() {
  counter++;
  console.log("hiii");

  if (counter >= 3) {
    clearIntervalPolyfill(intervalId);
  }
}

intervalId = setIntervalPolyfill(greeting, 2000);
