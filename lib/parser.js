const cheerio = require('cheerio');
const iterateObj = require('./iterateobject');
const typeDefinations = require('./typeDefinations');
const objDef = require('./objDef');
const isEmptyObj = require('./isEmptyObj');

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

  if (isEmptyObj(configuration)) {
    return {}
  }

  let $ = null;

  if (typeof html === 'string') {
    $ = cheerio.load(html);
  }

  // if ($ === null) {
  //   return null;
  // }

  // let normalizeOpt = v => {
  //   if 
  // }

  const normalizeOpt = v => {
    // console.log('----');
    // console.log(typeDefinations(v));
    if (typeDefinations(v, String)) {
      v = { selector: v }
    }
    objDef(v, "data", {})
    objDef(v, 'how', 'text', true);
    objDef(v, "trimValue", true);
    objDef(v, "closest", "");
    if (v.attr) {
      v.how = $elm => $elm.attr(v.attr)
    }
    // console.log(v);
    return v;
  }

  const handleDataObj = (data, $context) => {
    let pageData = {};
    
    iterateObj(data, (value, key) => {
        value = normalizeOpt(value);
        value.name = key;

        let $cContext = $context === $ ? undefined : $context;

        if(!$cContext && !value.selector && !value.listItem) {
          // throw new Err("There is no element selected for the '<option.name>' field. Please provide a selector, list item or use nested object structure.", {
          //     option: cOpt,
          //     code: "NO_ELEMENT_SELECTED"
          // });
          console.log("THROW ERROR");
        }

        // console.log($cContext);

        let $elm = value.selector ? $(value.selector, $cContext) : $cContext;

        if (value.listItem) {
            let docs = pageData[value.name] = [];
            let $items = $(value.listItem, $cContext);
            let isEmpty = isEmptyObj(value.data);

            if (isEmpty) {
              value.data.___raw = {};
            }

            for(let i = 0; i < $items.length; ++i) {
              let tmpDoc = handleDataObj(value.data, $items.eq(i));
              let convert = value.convert || function (x) { return x; }
              if (value.filter) {
                value.filter(convert(tmpDoc.___raw || tmpDoc)) && docs.push(convert(tmpDoc.___raw || tmpDoc));
              } else {
                docs.push(convert(tmpDoc.___raw || tmpDoc));
              }
            }
        } else {
          if (typeDefinations(value.eq, Number)) {
            $elm = $elm.eq(value.eq);
          }

          if (typeDefinations(value.texteq, Number)) {
            let children = $elm.contents();
            let textCounter = 0;
            let found = false;

            for (let i = 0, child; child = children[i]; i++) {
              if (child.type === 'text') {
                if (textCounter === value.texteq) {
                  $elm = child;
                  found = true;
                  break;
                }
                textCounter++;
              }
            }

            if (!found) {
              $elm = cheerio.load('');
            }

            value.how = elm => elm.data;
          }

          // Handle closest
          if (value.closest) {
            $elm = $elm.closest(value.closest);
          }

          if (!isEmptyObj(value.data)) {
            pageData[value.name] = handleDataObj(value.data, $elm);
            return pageData;
          }

          // console.log(value);

          let result = typeDefinations(value.how, Function) ? value.how($elm) : $elm[value.how]()

          result = result === undefined ? '' : result;

          if (value.trimValue && typeDefinations(result, String)) {
            result = result.trim();
          }

          if (value.replace && typeDefinations(result, String)) {
            result = result.replace(value.replace.regex, value.replace.replacement || '');
          }

          if (value.convert) {
            result = value.convert(result, $elm);
          }

          

          pageData[value.name] = result;
        }
    });

    // console.log(pageData);

    return pageData;
  }

  return handleDataObj(configuration);
}

module.exports = parser;
