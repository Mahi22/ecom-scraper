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

// Need to update the same Object so as to preserve the added values *** need to work on this further 
function objDef(obj, field, defValue, opts) {
  obj[field] = defa(obj[field], defValue, opts);
  return obj;
}

module.exports = objDef;
