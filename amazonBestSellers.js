"use strict";
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const parser = require('./lib/parser');
const html = fs.readFileSync('./bestSellersIndex.html', { encoding: 'utf8' });

function amazonBestSellersScraping(html) {
    const result = parser(html, {
      productTitle: '.aok-inline-block zg-item',
      size: '#variation_size_name .selection',
      reviews: '#acrCustomerReviewText',
      mrp: '#price .priceBlockStrikePriceString',
      productPrice: '#priceblock_ourprice',
      buyBox: '#sellerProfileTriggerId',
      features: {
        selector: '#feature-bullets .a-unordered-list',
        replace:{
        regex: /\s\s+/g,
        replacement: ' '
        }
      },
      productDescription: {
        selector: '#productDescription',
        replace: {
         regex: /\s\s+/g,
         replacement: ' '
        }
      },
      variants: {
        listItem: '#variation_size_name .a-size-base'
      },
      prodDetails: {
        listItem: '#prodDetails table tbody tr',
        data: {
          label: '.label',
          value: {
            selector: '.value',
            replace: {
              regex: /\s\s+/g,
              replacement: ' '
            }
          }
        }
      },
      productDetails:{
        selector: '#detail_bullets_id table tbody tr',
        replace:{
          regex:/\s\s+/g,
          replacement:' '
        }
      },
      ratings: {
        selector: '#averageCustomerReviews',
        data: {
          total: '#acrPopover',
        }
      },
      ratingsTable: {
        listItem: 'table#histogramTable tbody tr',
        data: {
          label: {
            selector: 'td',
            eq: 0
          },
          value: {
            selector: 'td',
            eq: 2
          }
        }
      },
      featureRatings: {
        listItem: '#cr-dp-summarization-attributes > #cr-summarization-attributes-list > div > div > div',
        data: {
          label: {
            selector: 'span',
            texteq: 0
          },
          value: {
            selector: 'span',
            texteq: 1
          }
        }
      }
    });

    console.log(result);
  }

  amazonBestSellersScraping(html);
