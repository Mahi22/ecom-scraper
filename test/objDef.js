import test from 'ava';
import objDef from '../lib/objDef';

let foo = {
  bar: 42
};

test('propert value remains, even if default', t => {
  const foo = {
    bar: 42
  };

  t.deepEqual(objDef(foo, 'bar', 7), foo);
})

test('property value is set to default, when property no exists', t => {
  const foo = {
    bar: 42
  };

  t.deepEqual(objDef(foo, 'land', 'Mars'), { bar: 42, land: 'Mars'});
});
