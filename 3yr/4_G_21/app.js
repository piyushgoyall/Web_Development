const request = require("request");
const cheerio = require("cheerio");
request("https://www.worldometers.info/coronavirus/", cb);
function cb(error, response, html) {
  if (error) {
    console.log("error:", error);
  } else {
    handlehtml(html);
  }
}

function handlehtml(html) {
  let $ = cheerio.load(html);
  let contentArr = $("#maincounter-wrap span");
  // console.log(contentArr);
  for (let i = 0; i < contentArr.length; i++) {
    let data = $(contentArr[i]).text();
    console.log(data);
  }
  let totalCases = $(contentArr[0]).text();
  let deaths = $(contentArr[1]).text();
  let recovered = $(contentArr[2]).text();

  console.log(`Total Cases: ${totalCases}`);
  console.log(`Total Deaths: ${deaths}`);
  console.log(`Total Recovered: ${recovered}`);
}
