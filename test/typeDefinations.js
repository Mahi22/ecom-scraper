import test from 'ava';
import typeDefinations from '../lib/typeDefinations';

const TESTS = [
  ["check null", null, "null"],
  ["check undefined", undefined, "undefined"],
  ["check NaN", NaN, "nan"],
  ["support objects", {}, "object"],
  ["support numbers", 42, "number"],
  ["support strings", "hello", "string"],
  ["support arrays", [], "array"],
  ["support custom types", new (function() {
    function Person() {}
    return new Person();
  })(), "person"]
];

TESTS.forEach(function (c) {
  test(`should ${c[0]}`, t => {
    t.is(typeDefinations(c[1], c[2]), true);
    t.is(typeDefinations.is(c[1], c[2]), true);
    t.is(typeDefinations(c[1]), c[2]);
  });
});
