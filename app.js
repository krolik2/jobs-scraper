const puppeteer = require("puppeteer");

let justJoin = "https://justjoin.it/trojmiasto/javascript/junior";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(justJoin);

  let jobsData = await page.evaluate(() => {
    let jobs = [];
    let list = Array.from(document.querySelectorAll("a.item"));
    list.map(element => {
      let jobsJson = {};
      try {
        jobsJson.name = element.innerText
        jobsJson.link = element.getAttribute("href");
      } catch (exception) {}
      jobs.push(jobsJson);
    });
    return jobs;
  });

  console.dir(jobsData);
})();

/* le data
==jj==

jjUrl = 'https://justjoin.it/trojmiasto/javascript/junior'
let list = Array.from(document.querySelectorAll('a.item'));
let names = list.map(el =>el.innerText.replace(/\n/g, " "));
let links = list.map(el => el.href);

==nfj==

nfjUrl = 'https://nofluffjobs.com/jobs/gdansk/frontend?criteria=city%3Dgdansk%20category%3Dfrontend%20seniority%3Djunior'
let list = Array.from(document.querySelectorAll('a.posting-list-item.posting-list-item--frontend'));
let names = list.map(el => el.textContent);
let links = list.map(el => el.href);

==ppl==

pplUrl = 'https://www.pracuj.pl/praca/junior%20frontend;kw/gdansk;wp'
let list = Array.from(document.querySelectorAll('.offer__click-area'));
list names = list.map(el => el.offsetParent.innerText);
let links = list.map(el => el.href);

==bj==

bjUrl = 'https://bulldogjob.pl/companies/jobs/s/city,Tr%C3%B3jmiasto/role,frontend';

no offers :(

*/
