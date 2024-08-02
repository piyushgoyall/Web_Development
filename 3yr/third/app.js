// synchronous function - jab tak file nhi banegi the code will not proceed

// const fs = require("fs");
// fs.readFileSync("f1.txt",cb); // cb = call back (when file gets created call back is called)

const fs = require("fs");
// fs.writeFileSync("dostkoudhaarnado.txt","thruth");

fs.writeFile("tumhariFileKyuNhiBanti", "data daalna mat bhulo", cb);

function cb(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("File created successfully");
  }
}
