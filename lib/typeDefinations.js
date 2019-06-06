require('function.name');

/**
 * 
 * TypeDefinations
 * Gets the type of the input value and compares it
 * with provided type.
 * 
 * @name TypeDefinations
 * @function
 * @param {*} input the input value
 * @param {Constructor|String} target The target type
 * 
 * @Return {String|Boolean} It returns true if the input
 * provided type `target` (if was provided),
 * `false` if the input types does *not* HAVE THE PROVIDED TYPES
 * `target` or the stringified type of the input (always a lowercase)
 */
function TypeDefinations(input, target) {
  if (arguments.length === 2) {
    return TypeDefinations.is(input, target);
  }
  return TypeDefinations.get(input, true);
}

/**
 * TypeDefinations.is
 * Checks if the input value has a specified type.
 * 
 * @name TypeDefinations.is
 * @function
 * @param {Anything} input the input value
 * @param {Constructor|String} target the target type
 * @return {Boolean} `true`, if the input has the same type
 * with the target else `false`
 */
TypeDefinations.is = function(input, target) {
  return TypeDefinations.get(input, typeof target === "string") === target;
}

TypeDefinations.get = function(input, str) {
  if (typeof input === "string") {
    return str ? "string" : String;
  }

  if (null === input) {
    return str ? "null" : null;
  }

  if (undefined === input) {
    return str ? "undefined" : undefined;
  }

  if (input !== input) {
      return str ? "nan" : NaN;
  }

  return str ? input.constructor.name.toLowerCase() : input.constructor;
}

module.exports = TypeDefinations;
