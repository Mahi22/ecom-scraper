"use strict";
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const parser = require('./lib/parser');
const html = fs.readFileSync('./bestSellersIndex.html', { encoding: 'utf8' });
const $ = cheerio.load(html);
var href = $(this).attr('href');
function amazonBestSellersScraping(html) {
    const result = parser(html, {
    bestSellersProductInfo:{
      productLink,
      listItem: '.a-list-item',
      data:{
        productTitle:{
            selector: '.p13n-sc-truncated',
        },
        productPrice: {
            selector: '.p13n-sc-price'
        },
        totalRatings:{
            selector: 'div',
            eq : 4,
            replace: {
                regex: /\s\s+/g,
                replacement: ' '
              }
        },
        ranking:{
            selector: 'span',
            texteq: 0
        }
      }
    }
    });
    console.log(result);
  }

  var productLink = $('a.a-link-normal').each(function(){
    console.log(( this.href )) // alerts http://currentdomain.com/www.google.com
    console.log(( $(this).attr('href') )) // alerts www.google.com
})

  amazonBestSellersScraping(html);
