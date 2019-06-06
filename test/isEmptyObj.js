import test from 'ava';
import isEmptyObj from '../lib/isEmptyObj';

test('When {} is passed, expect true', t => {
  t.truthy(isEmptyObj({}));
});

test('When [] is passed, expect true', t => {
  t.truthy(isEmptyObj([]));
});

test('When array with element passed, expect false', t => {
  t.falsy(isEmptyObj([42]));
});

test('When obj with property passed, expect false', t => {
  t.falsy(isEmptyObj({ locaion: 'mars' }));
});
