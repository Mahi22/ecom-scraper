/**
 * iterateObject
 * iterates an object, Note the object field order may differ
 * 
 * @name iterateObject
 * @function
 * @param {Object} obj the input object 
 * @param {*} fn function that will be called with the current value, field name and provided object.
 */

function iterateObject(obj, fn) {
  if (obj === null || obj === undefined) {
    fn(null); 
  } else if (typeof obj !== 'object') {
    fn(null);
  }

  var i = 0;
  var keys = [];

  if (Array.isArray(obj)) {
    for (; i < obj.length; ++i) {
      if (fn(obj[i], i, obj) === false) {
        break;
      }
    }
  } else if (typeof obj === 'object' && obj !== null) {
    keys = Object.keys(obj);
    for (; i < keys.length; ++i) {
      if (fn(obj[keys[i]], keys[i], obj) === false) {
          break;
      }
    }
  }
}

module.exports = iterateObject;
