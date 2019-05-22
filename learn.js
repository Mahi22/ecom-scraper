const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const parser = require('./lib/parser');
const html = fs.readFileSync('./amazonIndex.html', { encoding: 'utf8' });

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

function testHtml() {
  const $ = cheerio.load(html);

  console.log($('#fruits > li').text());
  console.log($('.orange').closest('.apple').text());
}

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

function amazonScrapingWithParser() {
  const result = parser(html, {
    productTitle: '#productTitle',
    size: '#variation_size_name .selection',
    ratings: '#acrCustomerReviewText',
    mrp: '#price .priceBlockStrikePriceString',
    buyBox: '#sellerProfileTriggerId',
    variants: {
      listItem: '#variation_size_name .a-size-base'
    }
  });
}

amazonScrapingWithParser();