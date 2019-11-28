const puppeteer = require("puppeteer");

const pracujURL = 'https://www.pracuj.pl/praca/junior%20frontend;kw/gdansk;wp';
const justjoinURL = "https://justjoin.it/trojmiasto/javascript/junior";
const noflURL = "https://nofluffjobs.com/jobs/gdansk/frontend?criteria=city%3Dgdansk%20category%3Dfrontend%20seniority%3Djunior";

let jobs = [];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(pracujURL, {waitUntil: 'networkidle2'});
  await page.waitForSelector('div.offer__info a.offer-details__title-link');

  let jobsData = await page.evaluate(() => {
    let list = Array.from(document.querySelectorAll('div.offer__info a.offer-details__title-link'));
    list.map(element => {
      let jobsJson = {};
      try {
        jobsJson.name = element.offsetParent.innerText.replace(/\n+/g, ' ');
        jobsJson.link = element.href
      } catch (exception) {}
      jobs.push(jobsJson);
    });
    return jobs;
  });

  console.dir(jobsData);
})();

/*

******************DONE*****************

==jj==
const puppeteer = require("puppeteer");

let justJoin = "https://justjoin.it/trojmiasto/javascript/junior";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(justJoin);

  let jobsData = await page.evaluate(() => {
    let jobs = [];
    let list = Array.from(document.querySelectorAll("a.item"));
    let filteredList = list.filter( el => el.textContent.includes('Gdańsk'))
    filteredList.map(element => {
      let jobsJson = {};
      try {
        jobsJson.name = element.innerText.replace(/\n/g, " ")
        jobsJson.link = element.href
      } catch (exception) {}
      jobs.push(jobsJson);
    });
    return jobs;
  });

  console.dir(jobsData);
})();

==nfj== 

let noFluff = "https://nofluffjobs.com/jobs/gdansk/frontend?criteria=city%3Dgdansk%20category%3Dfrontend%20seniority%3Djunior";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(noFluff, {waitUntil: 'networkidle2'});
  await page.waitForSelector('a.posting-list-item.posting-list-item--frontend')

  let jobsData = await page.evaluate(() => {
    let jobs = [];
    let list = Array.from(document.querySelectorAll('a.posting-list-item.posting-list-item--frontend'));
    list.map(element => {
      let jobsJson = {};
      try {
        jobsJson.name = element.textContent
        jobsJson.link = element.href
      } catch (exception) {}
      jobs.push(jobsJson);
    });
    return jobs;
  });

  console.dir(jobsData);
})();

==ppl==

const puppeteer = require("puppeteer");

let ppl = 'https://www.pracuj.pl/praca/junior%20frontend;kw/gdansk;wp';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(ppl, {waitUntil: 'networkidle2'});
  await page.waitForSelector('div.offer__info a.offer-details__title-link');

  let jobsData = await page.evaluate(() => {
    let jobs = [];
    let list = Array.from(document.querySelectorAll('div.offer__info a.offer-details__title-link'));
    list.map(element => {
      let jobsJson = {};
      try {
        jobsJson.name = element.offsetParent.innerText.replace(/\n+/g, ' ');
        jobsJson.link = element.href
      } catch (exception) {}
      jobs.push(jobsJson);
    });
    return jobs;
  });

  console.dir(jobsData);
})();


 le backup

document.querySelectorAll('div.offer__info a.offer-details__title-link'))
jobsJson.link = element.querySelector('.offer-details__title-link').pathname

==ppl==

pplUrl = 'https://www.pracuj.pl/praca/junior%20frontend;kw/gdansk;wp'
let list = Array.from(document.querySelectorAll('.offer__click-area'));
list names = list.map(el => el.offsetParent.innerText);
let names = Array.from(document.querySelectorAll('div.offer-details__wrapper a.offer-company__name'));
let links = list.map(el => el.href);

==bj==

bjUrl = 'https://bulldogjob.pl/companies/jobs/s/city,Tr%C3%B3jmiasto/role,frontend';

no offers :(
 

*/
