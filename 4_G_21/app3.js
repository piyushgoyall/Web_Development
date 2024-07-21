const puppeteer = require("puppeteer");
let page;
console.log("Before");
const browserOpenPromise = puppeteer.launch({ headless: false });
browserOpenPromise
  .then((borwser) => {
    const pagesArrpromise = borwser.pages();
    return pagesArrpromise;
  })
  .then((browserPages) => {
    page = browserPages[0];
    return page.goto("https://www.worldometers.info/coronavirus");
  })
  .then(() => {
    let elementKaPromise = page.waitForSelector("h1");
    return console.log(elementKaPromise);
  });
