const defa = require('./defa');

/**
 * objDef
 * Easily set default fields in object
 *
 * @name objDef
 * @function
 * @param {Object}    obj       The input object.
 * @param {String}    field     The field name.
 * @param {Anything}  defValue  The efault value.
 * @param {Object}    opts      defa options
 */

function objDef(obj, field, defValue, opts) {
  var tmpObj = obj;
  tmpObj[field] = defa(obj[field], defValue, opts);
  return Object.assign({}, tmpObj);
}

module.exports = objDef;
