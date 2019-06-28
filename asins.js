const { from } = require('rxjs');
const { concatMap, map, toArray, tap } = require('rxjs/operators');
const request = require('request');
const parser = require('./lib/parser');

const asins = ['B00MIYM0VS',
    'B00JDACK3S',
    'B01MA1JLOM',
    'B01LYBZX6Y',
    'B00Y6EHHQ6',
    'B00N3L0T90',
    'B00N3L0Z9E',
    'B00O52UQDA'];
var counter = 0
const requestAmazon = asin => from(new Promise((resolve, reject)  => {
    console.log(`Scraping ${++counter} of ${asins.length}`)
    request(`https://amazon.in/dp/${asin}`, function (err, response, body) {
        if (err){reject(err)}

        if(response.statusCode === 200){
            resolve(body)
        }
    });
}))

const amazonRobot$ = from(asins)
    .pipe(concatMap(requestAmazon));

const parse$ = amazonRobot$.pipe(map(html => {
    return parser(html, {
        dateFirstGlobal: {
            listItem: '.bucket .content ul li',
            filter: x => x.includes('Date')
        },
        dateFirstIndia: {
            selector: '.date-first-available .value'
        }
    })}), map(obj => ({ dateFirst: obj.dateFirstGlobal.length === 0 ? obj.dateFirstIndia : obj.dateFirstGlobal[0].split(':')[1], belongs: obj.dateFirstGlobal.length === 0 ? 'India' : 'Outside'})), tap(console.log), toArray());

parse$.subscribe(console.log);