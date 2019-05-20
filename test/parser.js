import test from 'ava';
import fs from 'fs';

import parser from '../lib/parser';
// import lein from 'lien';

// const port = 9000
//     , HOST = "http://localhost"
//     , URL = HOST + ":" + port
//     ;

// test.before(t => {
//   t.context.server = new lein({
//     port,
//     public: `${__dirname}/public`
//   })
//   .on('load', err => {
//     if (err) {
//       console.log('Error for starting server');
//     }
//   });
// });

const html = fs.readFileSync(`${__dirname}/public/index.html`, { encoding: 'utf8' });

test('Testing if ava is working', t => {
  t.pass();
});

test('When no html or options passed', t => {
  t.plan(3);

  const result = parser(null, null);
  t.is(result, null);

  const result1 = parser(html, null);
  t.is(result1, null);

  const result2 = parser(null, {});
  t.is(result2, null);
});

test('When configuration is just {}', t => {
  const result = parser(html, {});
  t.deepEqual(result, {});
});

test('When empty string for html', t => {
  const result = parser('', {
    title: '.title'
  });
  t.deepEqual(result, { title: '' });
});

test('Scrape simple data', t => {
  const result = parser(html, {
    title: 'h1.title',
    description: '.description',
    date: {
      selector: '.date',
      convert: x => new Date(x)
    }
  });

  t.deepEqual(result, {
    title: 'Title',
    description: 'Lorem ipsum',
    date: new Date("1988-01-01")
  });
});
