// const axios = require("axios");

// axios.get('https://www.worldometers.info/coronavirus/')
//     .then(function (response) {
//     console.log(response);
// })
//     .catch(function (error) {
//         console.log(error);
// })

// const request = require("request");
// request("https://www.worldometers.info/coronavirus/", function (error, response, body) {
//   console.error("error:", error); // Print the error if one occurred
//   console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
//   console.log("body:", body); // Print the HTML for the Google homepage.
// });

const request = require("request");
const cheerio = require("cheerio");

request("https://www.worldometers.info/coronavirus/",cb);

function cb(error, response, html) {
  console.error("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  //   console.log("body:", html); // Print the HTML for the Google homepage.
  handlehtml(html);
}

function handlehtml(html) {
  const $ = cheerio.load(html);
    //   let h1s = $("h1");
    let covidCase = $(".maincounter-number span")
    let myData = covidCase.text();
    console.log(myData.split(" "));
}

