const parser = require('../lib/parser.js');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('./amazonIndex.html', { encoding: 'utf8' });


function amazonScraping(){
    const $ = cheerio.load(html);

  /* console.log($('#fruits > li').text());
  console.log($('.orange').closest('.apple').text()); */
  console.log($('#productTitle').text());
}

amazonScraping();