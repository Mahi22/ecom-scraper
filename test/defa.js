import test from 'ava';
import defa from '../lib/defa';

test('When undefined as input with some default value', t => {
  t.is(defa(undefined, 'Hello World'), 'Hello World');
});

test('Input and default type not equal, default should be returned', t => {
  t.is(defa('Hello World', 42), 42);
  t.is(defa(42, 'Hello World'), 'Hello World');
});

test('When true is passed as options argument, input should be returned', t => {
  t.is(defa('Hello', 'World', true), 'Hello');
  t.is(defa(1, 2, true), 1);
});

test('When same types are passed as input & default, return input even if string is empty', t => {
  t.is(defa('', 'World'), '');
  t.is(defa(1, 2), 1);
});

test('When empty string passed & true argument, return default', t => {
  t.is(defa('', 'World', true), 'World');
});

test('When default is function, use first argument as input and return result', t => {
  t.is(defa('foo', function (input) {
    return input === 'foo' ? 'bar' : 'foo'
  }), 'bar');

  t.is(defa('bar', function (input) {
    return input === 'foo' ? 'bar' : 'foo'
  }), 'foo');
});
