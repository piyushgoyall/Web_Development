function placeOrder(drink) {
  return new Promise((resolve, reject) => {
    if (drink === "coffee") {
      resolve("Oreder Placed");
    } else {
      reject("Sorry manne na bera");
    }
  });
}

// async await

(async function viva() {
  try {
    let output = await placeOrder("ColDrink");
    console.log(output);
  } catch (err) {
    console.log(err);
  }
})();
