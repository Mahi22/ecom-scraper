const request = require('request');
const cheerio = require('cheerio');

const html = `
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
`;

function testHtml() {
  const $ = cheerio.load(html);

  console.log($('#fruits > li').text());
}

testHtml();