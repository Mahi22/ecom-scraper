const cheerio = require('cheerio');

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true;
}

/**
 * parser
 * A simple parser for html based on configuration provided
 * 
 * @param {String|Object} html  html as a string passed to the parser
 * @param {Object} configuration options passed to parser function for scarping information
 * 
 * @returns {Object} the scraped data
 */

function parser(html, configuration) {
  if (html === null || configuration === null || html === undefined || configuration === undefined) {
    return null;
  }

  if (isEmpty(configuration)) {
    return {}
  }

  let $ = null;

  if (typeof html === 'string') {
    $ = cheerio.load(html);
  }

  let handleDataObj = (data, $context) => {
    let pageData = {};

    return pageData;
  }

  return handleDataObj(configuration);
}

module.exports = parser;
