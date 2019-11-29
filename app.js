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
    let jobs = [];
    let list = Array.from(
      document.querySelectorAll("div.offer__info a.offer-details__title-link")
    );
    list.map(element => {
      let jobsJson = {};
      try {
        jobsJson.name = element.offsetParent.innerText.replace(/\n+/g, " ");
        jobsJson.link = element.href;
      } catch (exception) {}
      jobs.push(jobsJson);
    });
    return jobs;
  });
  
  console.dir(pracujData);
})();

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(justjoinURL, { waitUntil: "networkidle2" });
  await page.waitForSelector("a.item");

  let justjoinData = await page.evaluate(() => {
    let jobs = [];
    let list = Array.from(document.querySelectorAll("a.item"));
    let filteredList = list.filter(el => el.textContent.includes("Gdańsk"));
    filteredList.map(element => {
      let jobsJson = {};
      try {
        jobsJson.name = element.innerText.replace(/\n/g, " ");
        jobsJson.link = element.href;
      } catch (exception) {}
      jobs.push(jobsJson);
    });
    return jobs;
  });

  console.dir(justjoinData);
})();

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(noflURL, { waitUntil: "networkidle2" });
  await page.waitForSelector("a.posting-list-item.posting-list-item--frontend");
  let noflData = await page.evaluate(() => {
    let jobs = [];
    let list = Array.from(
      document.querySelectorAll(
        "a.posting-list-item.posting-list-item--frontend"
      )
    );
    list.map(element => {
      let jobsJson = {};
      try {
        jobsJson.name = element.textContent;
        jobsJson.link = element.href;
      } catch (exception) {}
      jobs.push(jobsJson);
    });
    return jobs;
  });

  console.dir(noflData);
})();
