const puppeteer = require("puppeteer");

let pracujURL = "https://www.pracuj.pl/praca/junior%20frontend;kw/gdansk;wp";
let justjoinURL = "https://justjoin.it/trojmiasto/javascript/junior";
let noflURL =
  "https://nofluffjobs.com/jobs/gdansk/frontend?criteria=city%3Dgdansk%20category%3Dfrontend%20seniority%3Djunior";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
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
  await page.waitForSelector("a.item");

  let justjoinData = await page.evaluate(() => {
    let jobsArr = [];
    let list = Array.from(document.querySelectorAll("a.item"));
    let filteredList = list.filter(el => el.textContent.includes("Gdańsk"));
    filteredList.map(element => {
      let jobs = {};
      try {
        jobs.name = element.innerText.replace(/\n/g, " ");
        jobs.link = element.href;
      } catch (exception) {}
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
