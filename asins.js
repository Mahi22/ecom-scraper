const { from } = require('rxjs');
const { concatMap, map } = require('rxjs/operators');
const request = require('request');
const parser = require('./lib/parser');

const asins = ['B00MIYM0VS',
    'B00JDACK3S'];

const requestAmazon = asin => from(new Promise((resolve, reject)  => {
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
        dateFirst: {
            selector: '.bucket .content ul li',
            eq: 3
        }
    })}));

parse$.subscribe(console.log);