let fs = require("fs");

// // file read

// let buffer = fs.readFileSync("abc.js");
// console.log(buffer + " ");

// // create
// // fs.openSync("filekanameisbaar.txt", "w");

// // fs.writeFileSync("abc2.txt", "Hi");

// // fs.writeFileSync("abc2.txt", "Hello")

// // append function

// // line

///////////////////////// folder creation
// fs.mkdirSync("First")

// addition of content

// fs.writeFileSync("First/one.txt","google")

// let content = fs.readdirSync("First");
// console.log(content);

//////// make 10 folders and 10 files in each

// for (let i = 0; i < 10; i++) {
//   fs.mkdirSync("First"+i);
// }

// for (let i = 0; i < 10; i++) {
//   fs.mkdirSync('First-${i}');
// }


for (let i = 0; i < 10; i++)
{
    fs.mkdirSync(`folder-${i}`);
    fs.writeFileSync(`folder-${i}` + "\\" + `DontMakeNoise-${i}`,"zindagi",{recursive:true});
}