import test from 'ava';
import iterateobject from '../lib/iterateobject';


test('When null or not an object', t => {
  t.plan(2);

  iterateobject(null, val => {
    t.is(val, null);
  });

  iterateobject('', val => {
    t.is(val, null);
  });
});

test('When Array is passed', t => {
  const arr = [1, 2, 3];
  t.plan(arr.length);

  iterateobject(arr, function(val) {
    t.truthy(val);
  });
});

test('When Object is passed', t => {
  t.plan(2);

  const obj = {
    name: 'hello',
    hello: 'world'
  };

  iterateobject(obj, function(val) {
    t.truthy(val);
  });
});
