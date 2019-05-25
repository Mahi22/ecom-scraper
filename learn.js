"use strict";
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const parser = require('./lib/parser');
const html = fs.readFileSync('./flipkartIndex.html', { encoding: 'utf8' });

/* const html = `
<div id="root">
  <ul id="fruits">
    <li class="apple">Apple</li>
    <li class="orange">Orange</li>
    <li class="pear">Pear</li>
  </ul>
  <ul id="fruits1">
    <li class="apple">Apple 1</li>
    <li class="orange">Orange 1</li>
    <li class="pear">Pear 1</li>
  </ul>
  <ul id="fruits2">
    <li class="apple">Apple 2</li>
    <li class="pear">Pear 2</li>
    <li class="orange">Orange 2</li>
    <li class="grape">Grape</li>
  </ul>
</div>
`; */

/* function testHtml() {
  const $ = cheerio.load(html);

  console.log($('#fruits > li').text());
  console.log($('.orange').closest('.apple').text());
} */

function amazonScrapingWithCheerio(){
  const $ = cheerio.load(html);

/* console.log($('#fruits > li').text());
console.log($('.orange').closest('.apple').text()); */
console.log('Product Title = '+$('#productTitle').text().replace(/\s\s+/g,''));

console.log('Product variation = '+$('#a-autoid-13').text().replace(/\s\s+/g,''));

console.log('Product variations = '+$('#a-autoid-14').text().replace(/\s\s+/g,''));

console.log('Product variations = '+$('#a-autoid-15').text().replace(/\s\s+/g,''));

console.log('Product variations = '+$('#a-autoid-12').text().replace(/\s\s+/g,''));
console.log('Product variations = '+$('#a-autoid-17').text().replace(/\s\s+/g,''));
console.log('Product Price = '+$('#priceblock_ourprice').text().replace(/\s\s+/g,''));

console.log('Product Brand Name = '+$('#bylineInfo').text().replace(/\s\s+/g,''));
console.log('Product M.R.P = '+$('#mbc-price-2').text().replace(/\s\s+/g,''));

console.log('Seller rank = '+$('#SalesRank').text().replace(/\s\s+/g,''));
$('#feature-bullets').each((i,el) =>{
  const productFeatures = $(el).text().replace(/\s\s+/g,'');
  console.log('\nProduct Features ='+'\n'+productFeatures);
})

$('#histogramTable').each((i,el) =>{
  const ratingsTable = $(el).text().replace(/\s\s+/g,'');
  console.log("\nProduct Ratings ="+ratingsTable);
})
console.log('\nProduct Seller Name = '+$('#merchant-info').text().replace(/\s\s+/g,''));
}
// amazonScrapingWithCheerio();
//testHtml();

function amazonScrapingWithParser(html) {
  const result = parser(html, {
    productTitle: '#productTitle',
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

// amazonScrapingWithParser(html);

function fetchAmazonAsin(asin) {
  request(`https://www.amazon.in/dp/${asin}`, function request(error, response, html) {
    if (!error && response.statusCode === 200) {
      amazonScrapingWithParser(html);
    }
  })
}

function mapAsins(asins) {
  asins.forEach(fetchAmazonAsin);
}

var asins = [
  'B00I0RQM0W',
  'B00I3A25CA',
  'B00I3EX8RW',
  'B00I0RSY3K',
  'B00I3EV0YA',
  'B00LVKUNJG',
  'B00I2NK69C',
  'B00I2NKJTE',
  'B00I3A2BVA',
  'B00I2MOGTY',
  'B00I2NL45C',
  'B00I3EV45U',
  'B00I3X8FPI'
];

// mapAsins(asins);

function flipkartScrapingWithParser(html){
  const result = parser(html, {
    productTitle: '._35KyD6',
    productPriceDetails: {
      listItem: '._2i1QSc ._1uv9Cb > div ',
      data:{
        productPrice: {
            texteq: 0
        },
        productMrp: {
            texteq: 1
        }
      }
    },
    sellerName: '#sellerName',
    reviewsAndRatings: {
      listItem: '._38sUEc > span',
      data:{
        ratings:{
          selector: 'span',
          texteq:0
        },
        reviews: {
          selector: 'span',
          texteq: 2
        }
      }
    },
    detailsReviewsAndRatings: {
      listItem: '._1n1j36 < div < div'
    },
    productDescription: '._3cpW1u > div',
    productSpecifications: {
      listItem: '._2RngUh table tbody tr',
      data: {
        label: {
          selector: 'td',
          eq: 0
        },
        value: {
          selector: 'td',
          eq: 1
        }
      }
    },
  mostSearchedProducts: {
    listItem: '._1XtOOW > div'
  }
  });
  console.log(result);
}

flipkartScrapingWithParser(html);