"use strict";
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const parser = require('./lib/parser');
const html = fs.readFileSync('./fragrance/DeodorantsAndAntiperspirants.html', { encoding: 'utf8' });

function amazonBestSellersScraping(html) {
    const result = parser(html, {
    bestSellersProductInfo:{
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

  amazonBestSellersScraping(html);
