// Promise

function placeOrder(drink) {
  return new Promise((resolve, reject) => {
    if (drink === "coffee") {
      resolve("Oreder Placed");
    } else {
      reject("Sorry manne na bera");
    }
  });
}

placeOrder("coffee")
  .then((orderResult) => {
    console.log(orderResult);
  })
  .catch((err) => {
    console.log(err);
  });
