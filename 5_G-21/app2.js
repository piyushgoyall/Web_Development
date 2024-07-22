function humkoMarksDo(task) {
  return new Promise((resolve, reject) => {
    if (task == "padkrAoo") {
      resolve("You will get full marks");
    } else {
      reject("You will get nothing");
    }
  });
}

humkoMarksDo("kuch ni karne wale jo karna karlo")
// humkoMarksDo("padkrAoo")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
