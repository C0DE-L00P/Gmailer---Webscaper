require("dotenv").config();
const { sendMail } = require("./sendEmail");
const { readMail } = require("./readEmail");
const axios = require("axios");
const cheerio = require("cheerio");

//Email sender

const bootstrap = async () => {
  // await sendMail();
  console.log("Now waiting for 10 seconds", new Date().toString());

  setTimeout(async () => {
    console.log("Fetching the newly send mail", new Date().toString());
    await readMail();
  }, 10000);
};


//Web scrapping

const scrapeLinks = () => {
  let url =
    "https://sites.google.com/taskrabbit.com/tasks-uk?noapp=true&utm_target=IKEA-Txt-Gsite&utm_source=email&utm_medium=iterable&utm_campaign=IKEA-triage&utm_content=tasker_en-GB&utm_term=mktg_2022-09-19_s1";
  axios
    .get(url)
    .then(({ data: html }) => {
      const $ = cheerio.load(html);
      let links = [];
      $(".fqo2vd", html).each(function () {
        let hooo = $(this).attr("href");
        links.push(hooo);
      });
      console.log("links", links);
    })
    .catch(console.log);
};

// bootstrap();
scrapeLinks()
