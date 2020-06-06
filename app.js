const puppeteer = require("puppeteer");

let pracujURL = "https://www.pracuj.pl/praca/frontend;kw/gdansk;wp";
let justjoinURL = "https://justjoin.it/trojmiasto/javascript/";
let noflURL =
  "https://nofluffjobs.com/pl/jobs/trojmiasto/frontend?criteria=city%3Dtrojmiasto%20category%3Dfrontend&page=1";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({
    width: 3840,
    height: 2160,
    deviceScaleFactor: 1,
  });
  await page.goto(pracujURL, { waitUntil: "networkidle2" });
  await page.waitForSelector("div.offer__info a.offer-details__title-link");

  let pracujData = await page.evaluate(() => {
    let jobsArr = [];
    let list = Array.from(
      document.querySelectorAll("div.offer__info a.offer-details__title-link")
    );
    list.map(element => {
      let jobs = {};
      try {
        jobs.name = element.offsetParent.innerText.replace(/\n+/g, " ");
        jobs.link = element.href;
      } catch (exception) {}
      jobsArr.push(jobs);
    });
    return jobsArr;
  });


  await page.goto(justjoinURL, { waitUntil: "networkidle2" });
  await page.waitForSelector("a.css-18rtd1e");

  let justjoinData = await page.evaluate(() => {
    let jobsArr = [];
    let list = Array.from(document.querySelectorAll("a.css-18rtd1e"));
    let filteredList = list.filter(el => el.textContent.match(/Gdańsk|Sopot|Gdynia/));
    filteredList.map(element => {
      let jobs = {};
      try {
        jobs.name = element.innerText.replace(/\n/g, " ");
        jobs.link = element.href;
      } catch (exception) {
         console.log(exception)
      }
      jobsArr.push(jobs);
    });
    return jobsArr;
  });

  await page.goto(noflURL, { waitUntil: "networkidle2" });
  await page.waitForSelector("a.posting-list-item");

  let noflData = await page.evaluate(() => {
    let jobsArr = [];
    let list = Array.from(document.querySelectorAll("a.posting-list-item"));
    list.map(element => {
      let jobs = {};
      try {
        jobs.name = element.textContent;
        jobs.link = element.href;
      } catch (exception) {}
      jobsArr.push(jobs);
    });
    return jobsArr;
  });

  console.log(pracujData, justjoinData, noflData);

  await browser.close();
})();
