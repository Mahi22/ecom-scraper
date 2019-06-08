const { RxHR } = require('@akanass/rx-http-request');

console.log(RxHR);
var a = [
    {
    id: 1,
    url: "https://www.amazon.in/dp/B000Z3R8GQ"
    },
    {
    id: 2,
    url: "https://www.amazon.in/dp/B0000C6ZFH"
    },
    {
    id: 3,
    url: "https://www.amazon.in/dp/B07BHH72CK"
    },
    {
    id: 4,
    url: "https://www.amazon.in/dp/B00NZVRVZI"
    },
    {
    id: 5,
    url: "https://www.amazon.in/dp/B01MS1POLF"
    },
    {
    id: 6,
    url: "https://www.amazon.in/dp/B00F07M3NU"
    },
    {
    id: 7,
    url: "https://www.amazon.in/dp/B00LOAUGUE"
    },
    {
    id: 8,
    url: "https://www.amazon.in/dp/B07DFF3HKJ"
    }
];

/**
  RxHR.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
      encoding: 'utf8'
    }
  });
 */

RxHR.get('https://www.amazon.in/dp/B000Z3R8GQ', {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
    encoding: 'utf8'
  }
}).subscribe(console.log);