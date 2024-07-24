const request = require("request");
const cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595", cb);
function cb(error, response, html) {
  console.error("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', html); // Print the HTML for the Google homepage.
  handlehtml(html);
}

function handlehtml(html) {
  let $ = cheerio.load(html);
  // let contentArr= $(".ds-p-4");
  // let contentArr= $(".ds-p-4 ds-border-y ds-border-line");
  //let contentArr= $(".ds-flex ds-flex-col ds-mt-2 ds-mb-2");
  let contentArr = $(
    ".ds-text-compact-s.ds-text-typo.ds-text-right.ds-whitespace-nowrap > strong"
  );

  console.log(contentArr);
  // for(let i=0;i<contentArr.length;i++){
  //   let data=$(contentArr[i]).text()
  //   console.log(data);
  // }
}
