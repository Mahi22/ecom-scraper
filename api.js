const fetch = require('node-fetch');
const request = require('request');
const zlib = require('zlib');
const fs = require('fs');
const FT = require('function-tree');
// const Devtools = require('function-tree/devtools').default;

// const curl = new (require( 'curl-request' ))();
const Curl = require('curl-request');
const Rxjs = require('rxjs');
const Operators = require('rxjs/operators');

const FunctionTree = FT.default;
const parallel = FT.parallel;
const sequence = FT.sequence;

// const Observable = Rxjs.Observable;
const ObservableFrom = Rxjs.from;
const ObservableEmpty = Rxjs.empty;
const ObservableForkJoin = Rxjs.forkJoin;
const toArray = Operators.toArray;
const map = Operators.map;
const expand = Operators.expand;
const concatMap = Operators.concatMap;
const delay = Operators.delay;
const mergeMap = Operators.mergeMap;
const catchError = Operators.catchError;
const tap = Operators.tap;
const retryWhen = Operators.retryWhen;
const take = Operators.take;

// const header = {
//   "credentials":"include",
//   "headers":{
//     "accept":"application/json,text/javascript, */*; q=0.01",
//     "accept-language":"en-US,en;q=0.9,mr;q=0.8",
//     "cache-control":"no-cache",
//     "fk-csrf-token":"C6ed4qGh-iRJXE-besPQs8yMeJIPWD_Zrs8w",
//     "pragma":"no-cache",
//     "x-requested-with":"XMLHttpRequest"
//   },
//   "referrer":"https://seller.flipkart.com/sw.js",
//   "referrerPolicy":"no-referrer-when-downgrade",
//   "body":null,
//   "method":"GET",
//   "mode":"cors"
// };

// const a  = fetch("https://seller.flipkart.com/napi/payments/getFilters?adviceId=18926182&source=transaction&type=warehouse&sellerId=9ujbcnp6ky5ruzie", header);


// All Transaction Detail
// response 
/*
{"name":"All Transaction Details","description":"Report containing details of settled & Unsettled transactions for a given date range. Includes information for Orders, PLA, TDS, SPF, Storage and Recall.","filters":[{"name":"date","display_name":"Date","data_type":"DATE","min_value":"2018-05-27","max_value":"2019-05-27","operator":"RANGE","allowed_groups":["CUSTOM"],"max_selection":31},{"name":"param","display_name":"Search Param","data_type":"NON_NUMBER","operator":"EQ"},{"name":"seller_id","display_name":"Seller ID","data_type":"NON_NUMBER","operator":"EQ"}],"file_format":"EXCEL"}
*/

// const headers1 = {
//   "credentials":"omit",
//   "headers":{
//     "accept":"application/json, text/javascript, */*; q=0.01",
//     "fk-csrf-token":"C6ed4qGh-iRJXE-besPQs8yMeJIPWD_Zrs8w",
//     "x-requested-with":"XMLHttpRequest"
//   },
//   "referrer":"https://seller.flipkart.com/index.html",
//   "referrerPolicy":"no-referrer-when-downgrade",
//   "body":null,
//   "method":"GET",
//   "mode":"cors"
// }
// const f1 = fetch("https://seller.flipkart.com/napi/metrics/bizReport/report/2/detail?reportName=All+Transaction+Details&sellerId=9ujbcnp6ky5ruzie", headers1);

// f1.then(res => {
//   console.log(res.json());
// });

// get All Transaction Aggregated Amount
/*
*/

/**
 * request URL
      https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount
 * Query String Parameters
      start_date: 2019-04-01
      end_date: 2019-04-30
      pageType: allTransaction
      type: order_item_transactions
      sellerId: 9ujbcnp6ky5ruzie
 */
// var header2 = {
//   "credentials":"include",
//   "headers": {
//     "accept":"application/json, text/javascript, */*; q=0.01",
//     "accept-language":"en-US,en;q=0.9,mr;q=0.8",
//     "cache-control":"no-cache",
//     "fk-csrf-token":"C6ed4qGh-iRJXE-besPQs8yMeJIPWD_Zrs8w",
//     "pragma":"no-cache",
//     "x-requested-with":"XMLHttpRequest"
//   },
//   "referrer":"https://seller.flipkart.com/sw.js",
//   "referrerPolicy":"no-referrer-when-downgrade",
//   "body":null,
//   "method":"GET",
//   "mode":"cors"
// };
// // var f2 = fetch("https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount?start_date=2019-04-01&end_date=2019-04-30&pageType=allTransaction&type=order_item_transactions&sellerId=9ujbcnp6ky5ruzie", header2);

// // f2.then(res => {
// //   console.log(res.headers)
// // });

// request({url: 'https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount?start_date=2019-04-01&end_date=2019-04-30&pageType=allTransaction&type=order_item_transactions&sellerId=9ujbcnp6ky5ruzi', headers: header2}, function (err, response, body) {
//   console.log(body);
// });


// curl 'https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount?start_date=2019-04-01&end_date=2019-04-30&pageType=allTransaction&type=order_item_transactions&sellerId=9ujbcnp6ky5ruzie' -H 'Pragma: no-cache' -H 'DNT: 1' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.9,mr;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Cache-Control: no-cache' -H 'X-Requested-With: XMLHttpRequest' -H 'Cookie: s_ch_list=%5B%5B%27Internal%2520Originated%27%2C%271488954573683%27%5D%5D; _mkto_trk=id:021-QVV-957&token:_mch-flipkart.com-1495949869629-70928; _ga=GA1.2.2038854975.1495909297; T=TI148890318637053625093466435150917475437830390952355761756530507217; AMCVS_17EB401053DAF4840A490D4C%40AdobeOrg=1; s_cc=true; AMCV_17EB401053DAF4840A490D4C%40AdobeOrg=-227196251%7CMCIDTS%7C18043%7CMCMID%7C37080542162887526766253199795737714834%7CMCAAMLH-1558939319%7C12%7CMCAAMB-1559474573%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCOPTOUT-1558876973s%7CNONE%7CMCAID%7CNONE; AMCVS_55CFEDA0570C3FA17F000101%40AdobeOrg=1; __utmc=143439159; __utmz=143439159.1558869795.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); sellerId=9ujbcnp6ky5ruzie; _gid=GA1.2.1161172798.1558869828; S=d1t18P05bVT8/P1pWPyt+P0w/P6RrOOhZXNDmV3flEXDD3/SjTalTyX85T1/ghUp6FjxKZv/ifWwx7x7quWmQ8ZOGZw==; SN=2.VI2D21A0104CF94D9AB0835AE69883E6BF.SI2A846B995A7945F890ADBD569E1EB237.VSB1DCBB3CBCEC47ACB48C0E20B047CBDE.1558871023; connect.sid=s%3A5kgIVzcwOA7hnf_YvG3SrfbIP3mQHHB-.ZLfMJnJyG6%2FuJsd4FypwFrh2gHLTQuLqxFgrDml8Nyg; __utma=143439159.2038854975.1495909297.1558869795.1558871079.2; is_login=true; AMCV_55CFEDA0570C3FA17F000101%40AdobeOrg=-227196251%7CMCIDTS%7C18043%7CMCMID%7C11305740583582521872941987069957610473%7CMCOPTOUT-1558941981s%7CNONE%7CMCAID%7CNONE; _gat=1; s_ppvl=seller%253A%2520home%2520page%2C100%2C100%2C1000%2C847%2C998%2C1920%2C1080%2C0.8%2CL; s_ppv=seller%253A%2520payments%2520%257C%2520transactions%2C100%2C100%2C998%2C1043%2C998%2C1920%2C1080%2C0.8%2CP; s_nr=1558935916729-Repeat; s_ppn=no%20value; s_sq=flipkart-prd%3D%2526pid%253DHomePage%2526pidt%253D1%2526oid%253Dfunction%252528%252529%25257B%25257D%2526oidt%253D2%2526ot%253DDIV' -H 'Connection: keep-alive' -H 'Referer: https://seller.flipkart.com/sw.js' -H 'fk-csrf-token: C6ed4qGh-iRJXE-besPQs8yMeJIPWD_Zrs8w' --compressed

/**
 * Get All Transaction Aggregated Amount
 * type=order_item_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount?start_date=2019-04-01&end_date=2019-04-30&pageType=allTransaction&type=order_item_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"total_amount":612051.691,"groups_amount":[{"group":"orderItem","net_amount":612051.691}]}}
 * 
 * type= storage_recall_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount?start_date=2019-04-01&end_date=2019-04-30&pageType=allTransaction&type=storage_recall_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"total_amount":-14140.23,"groups_amount":[{"group":"warehouse","net_amount":-14140.23}]}}
 * 
 * type= spf_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount?start_date=2019-04-01&end_date=2019-04-30&pageType=allTransaction&type=spf_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"total_amount":1059.84,"groups_amount":[{"group":"spf","net_amount":1059.84}]}}
 * 
 * type= tds_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount?start_date=2019-04-01&end_date=2019-04-30&pageType=allTransaction&type=tds_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"total_amount":0,"groups_amount":[{"group":"tds","net_amount":0}]}}
 * 
 * type= ads_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount?start_date=2019-04-01&end_date=2019-04-30&pageType=allTransaction&type=ads_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"total_amount":-6000,"groups_amount":[{"group":"ads","net_amount":-6000}]}}
 * 
 * type= tcs_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount?start_date=2019-04-01&end_date=2019-04-30&pageType=allTransaction&type=tcs_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"total_amount":0,"groups_amount":[{"group":"tcs","net_amount":0}]}}
 * 
 */


// curl
//   .setHeaders([
//     'Pragma: no-cache',
//     'DNT: 1',
//     'Accept-Encoding: gzip, deflate, br',
//     'Accept-Language: en-US,en;q=0.9,mr;q=0.8',
//     'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
//     'Accept: application/json, text/javascript, */*; q=0.01',
//     'Cache-Control: no-cache',
//     'X-Requested-With: XMLHttpRequest',
//     'Cookie: s_ch_list=%5B%5B%27Internal%2520Originated%27%2C%271488954573683%27%5D%5D; _mkto_trk=id:021-QVV-957&token:_mch-flipkart.com-1495949869629-70928; _ga=GA1.2.2038854975.1495909297; T=TI148890318637053625093466435150917475437830390952355761756530507217; AMCVS_17EB401053DAF4840A490D4C%40AdobeOrg=1; s_cc=true; AMCV_17EB401053DAF4840A490D4C%40AdobeOrg=-227196251%7CMCIDTS%7C18043%7CMCMID%7C37080542162887526766253199795737714834%7CMCAAMLH-1558939319%7C12%7CMCAAMB-1559474573%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCOPTOUT-1558876973s%7CNONE%7CMCAID%7CNONE; AMCVS_55CFEDA0570C3FA17F000101%40AdobeOrg=1; __utmc=143439159; __utmz=143439159.1558869795.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); sellerId=9ujbcnp6ky5ruzie; _gid=GA1.2.1161172798.1558869828; S=d1t18P05bVT8/P1pWPyt+P0w/P6RrOOhZXNDmV3flEXDD3/SjTalTyX85T1/ghUp6FjxKZv/ifWwx7x7quWmQ8ZOGZw==; SN=2.VI2D21A0104CF94D9AB0835AE69883E6BF.SI2A846B995A7945F890ADBD569E1EB237.VSB1DCBB3CBCEC47ACB48C0E20B047CBDE.1558871023; connect.sid=s%3A5kgIVzcwOA7hnf_YvG3SrfbIP3mQHHB-.ZLfMJnJyG6%2FuJsd4FypwFrh2gHLTQuLqxFgrDml8Nyg; __utma=143439159.2038854975.1495909297.1558869795.1558871079.2; is_login=true; AMCV_55CFEDA0570C3FA17F000101%40AdobeOrg=-227196251%7CMCIDTS%7C18043%7CMCMID%7C11305740583582521872941987069957610473%7CMCOPTOUT-1558941981s%7CNONE%7CMCAID%7CNONE; _gat=1; s_ppvl=seller%253A%2520home%2520page%2C100%2C100%2C1000%2C847%2C998%2C1920%2C1080%2C0.8%2CL; s_ppv=seller%253A%2520payments%2520%257C%2520transactions%2C100%2C100%2C998%2C1043%2C998%2C1920%2C1080%2C0.8%2CP; s_nr=1558935916729-Repeat; s_ppn=no%20value; s_sq=flipkart-prd%3D%2526pid%253DHomePage%2526pidt%253D1%2526oid%253Dfunction%252528%252529%25257B%25257D%2526oidt%253D2%2526ot%253DDIV',
//     'Connection: keep-alive',
//     'Referer: https://seller.flipkart.com/sw.js',
//     'fk-csrf-token: C6ed4qGh-iRJXE-besPQs8yMeJIPWD_Zrs8w'
//   ])
//   .get('https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount?start_date=2019-04-01&end_date=2019-04-30&pageType=allTransaction&type=storage_recall_transactions&sellerId=9ujbcnp6ky5ruzie')
//   .then(({ statusCode, body }) => {
//     if (statusCode === 200) {
//       console.log(body);
//     }
//   })
//   .catch(e => {
//     console.log(e)
//   });

/**
 * Get All Transactions
 * 
 * type: order_item_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactions?offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"token":10,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11535037064237300","order_id":"OD115350370642373000","settled_amount":234.338,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTYUFXKPJEJEHPUM","sku":"K257-M","dispatched_date":"2019-05-03","is_clickable":true,"is_replacement":null},{"order_item_id":"11535034027346900","order_id":"OD115350340273469000","settled_amount":201.73,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTWXZRJ3PEECV1UZ","sku":"K257-S","dispatched_date":"2019-05-03","is_clickable":true,"is_replacement":null},{"order_item_id":"11535021094662500","order_id":"OD115350210946625000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTSKARHX3GLKO15O","sku":"K258-XL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534999011145100","order_id":"OD115349990111451000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTWXZRJ3PEECV1UZ","sku":"K257-S","dispatched_date":null,"is_clickable":true,"is_replacement":null},{"order_item_id":"11534996162788202","order_id":"OD115349961627882000","settled_amount":-89.41,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTJBFCFKBG4YA1YN","sku":"K255-XXL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534990663225500","order_id":"OD115349906632255000","settled_amount":209.483,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTNEPRUMJBRYQ4PI","sku":"K257-L","dispatched_date":"2019-05-03","is_clickable":true,"is_replacement":null},{"order_item_id":"11534974825126200","order_id":"OD115349748251262000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534972568354600","order_id":"OD115349725683546000","settled_amount":202.035,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTUY7TW5K2JW7SWM","sku":"K257-XL","dispatched_date":"2019-05-03","is_clickable":true,"is_replacement":null}]}}
 *
 * type: storage_recall_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactions?offset=8&start_date=2019-04-01&end_date=2019-04-30&type=storage_recall_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"token":48,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"warehouse","transactions":[{"doc_count":6,"listing_id":"LSTKTAFYWWGXF8E5S28TKGLWI","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYWWGXF8E5S28","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-11.99,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYWWGWU35GSVXZYZFV4","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYWWGWU35GSVX","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-11.99,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYWWGUMYEGAFCWOK5OH","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYWWGUMYEGAFC","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-11.918,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYWWGRHBXKAF5TNFBXW","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYWWGRHBXKAF5","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-11.918,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYWWGKNPNWTSJS9THZ3","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYWWGKNPNWTSJ","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-11.918,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYWWGJBAGFYYUB1IROP","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYWWGJBAGFYYU","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-11.918,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYWWGFQHQZ8HGYHKUTJ","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYWWGFQHQZ8HG","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-11.99,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYWWGFHABHZFPLMJVMB","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYWWGFHABHZFP","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-10.384,"unsettled_amount":0,"is_clickable":true}]}}
 * 
 * type: spf_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactions?offset=8&start_date=2019-04-01&end_date=2019-04-30&type=spf_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"token":4,"size":4,"total_count":0,"net_amount":0,"is_next":false,"total_pages":0,"max_limit_exceeded":false,"group":"spf","transactions":[{"claim_id":"20190410172234303459829","event_date":"2019-04-11","warehouse":"kol_dan_01","sku":"K340-L","fsn":"KTAF7AG8XCZGZA8R","quantity":1,"unit_price":369,"neft_ids":["NFT-190412071GN00007XXXXXXX"],"advice_ids":["19198238"],"reason":"MainProduct_WrongProductReceived","settled_amount":236.16,"unsettled_amount":0,"is_clickable":false},{"claim_id":"20190410165809507729232","event_date":"2019-04-11","warehouse":null,"sku":null,"fsn":null,"quantity":null,"unit_price":null,"neft_ids":["NFT-190412071GN00007XXXXXXX"],"advice_ids":["19198238"],"reason":"Incentive","settled_amount":236.16,"unsettled_amount":0,"is_clickable":false},{"claim_id":"20190410165642822702653","event_date":"2019-04-11","warehouse":null,"sku":null,"fsn":null,"quantity":null,"unit_price":null,"neft_ids":["NFT-190412071GN00007XXXXXXX"],"advice_ids":["19198238"],"reason":"Incentive","settled_amount":351.36,"unsettled_amount":0,"is_clickable":false},{"claim_id":"20190410162908103296675","event_date":"2019-04-11","warehouse":null,"sku":null,"fsn":null,"quantity":null,"unit_price":null,"neft_ids":["NFT-190412071GN00007XXXXXXX"],"advice_ids":["19198238"],"reason":"Incentive","settled_amount":236.16,"unsettled_amount":0,"is_clickable":false}]}}
 * 
 * type: tds_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactions?offset=8&start_date=2019-04-01&end_date=2019-04-30&type=tds_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"token":0,"size":0,"total_count":0,"net_amount":0,"is_next":false,"total_pages":0,"max_limit_exceeded":false,"group":"tds","transactions":[]}}
 * 
 * type: ads_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactions?offset=8&start_date=2019-04-01&end_date=2019-04-30&type=ads_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"token":156,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"ads","transactions":[{"txn_id":"XMZR6OMY3S05","event_date":null,"type":"redeem","neft_ids":[],"advice_ids":["19293196","19432537","19246077","19149783","19339438","19383802","19062997","19198238","19109788","19479588"],"settled_amount":0,"unsettled_amount":0,"is_clickable":true},{"txn_id":"TX201904991278664084","event_date":"2019-04-09","type":"topup","neft_ids":["NFT-190410073GN00201XXXXXXX"],"advice_ids":["19149783"],"settled_amount":-1000,"unsettled_amount":0,"is_clickable":false},{"txn_id":"TX201904924062415899","event_date":"2019-04-02","type":"topup","neft_ids":["NFT-190403069GN00236XXXXXXX"],"advice_ids":["19016560"],"settled_amount":-1000,"unsettled_amount":0,"is_clickable":false},{"txn_id":"TX201904920916788976","event_date":"2019-04-02","type":"topup","neft_ids":["NFT-190403069GN00236XXXXXXX"],"advice_ids":["19016560"],"settled_amount":-1000,"unsettled_amount":0,"is_clickable":false},{"txn_id":"TX201904910523339542","event_date":"2019-04-01","type":"topup","neft_ids":["NFT-190403069GN00236XXXXXXX"],"advice_ids":["19016560"],"settled_amount":-1000,"unsettled_amount":0,"is_clickable":false},{"txn_id":"TX2019041070665119672","event_date":"2019-04-17","type":"topup","neft_ids":["NFT-190420068GN00170XXXXXXX"],"advice_ids":["19339438"],"settled_amount":-1000,"unsettled_amount":0,"is_clickable":false},{"txn_id":"TX2019041051564925516","event_date":"2019-04-15","type":"topup","neft_ids":["NFT-190417068GN00159XXXXXXX"],"advice_ids":["19293196"],"settled_amount":-1000,"unsettled_amount":0,"is_clickable":false},{"txn_id":"OP15G5XWKOOD","event_date":null,"type":"redeem","neft_ids":[],"advice_ids":["19293196","19432537","19246077","19339438","19383802","19149783","19062997","19613114","19198238","19528587","19109788","19479588"],"settled_amount":0,"unsettled_amount":0,"is_clickable":true}]}}
 * 
 * type: tcs_transactions
 * https://seller.flipkart.com/napi/payments/getAllTransactions?offset=8&start_date=2019-04-01&end_date=2019-04-30&type=tcs_transactions&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"token":0,"size":0,"total_count":0,"net_amount":0,"is_next":false,"total_pages":0,"max_limit_exceeded":false,"group":"tcs","transactions":[]}}
 * 
 */

// curl
// .setHeaders([
//   'Pragma: no-cache',
//   'DNT: 1',
//   // 'Accept-Encoding: gzip, deflate, br',
//   'Accept-Language: en-US,en;q=0.9,mr;q=0.8',
//   'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
//   'Accept: application/json, text/javascript, */*; q=0.01',
//   'Cache-Control: no-cache',
//   'X-Requested-With: XMLHttpRequest',
//   'Cookie: s_ch_list=%5B%5B%27Internal%2520Originated%27%2C%271488954573683%27%5D%5D; _mkto_trk=id:021-QVV-957&token:_mch-flipkart.com-1495949869629-70928; _ga=GA1.2.2038854975.1495909297; T=TI148890318637053625093466435150917475437830390952355761756530507217; AMCVS_17EB401053DAF4840A490D4C%40AdobeOrg=1; s_cc=true; AMCV_17EB401053DAF4840A490D4C%40AdobeOrg=-227196251%7CMCIDTS%7C18043%7CMCMID%7C37080542162887526766253199795737714834%7CMCAAMLH-1558939319%7C12%7CMCAAMB-1559474573%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCOPTOUT-1558876973s%7CNONE%7CMCAID%7CNONE; AMCVS_55CFEDA0570C3FA17F000101%40AdobeOrg=1; __utmc=143439159; __utmz=143439159.1558869795.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); sellerId=9ujbcnp6ky5ruzie; _gid=GA1.2.1161172798.1558869828; S=d1t18P05bVT8/P1pWPyt+P0w/P6RrOOhZXNDmV3flEXDD3/SjTalTyX85T1/ghUp6FjxKZv/ifWwx7x7quWmQ8ZOGZw==; SN=2.VI2D21A0104CF94D9AB0835AE69883E6BF.SI2A846B995A7945F890ADBD569E1EB237.VSB1DCBB3CBCEC47ACB48C0E20B047CBDE.1558871023; connect.sid=s%3A5kgIVzcwOA7hnf_YvG3SrfbIP3mQHHB-.ZLfMJnJyG6%2FuJsd4FypwFrh2gHLTQuLqxFgrDml8Nyg; __utma=143439159.2038854975.1495909297.1558869795.1558871079.2; is_login=true; AMCV_55CFEDA0570C3FA17F000101%40AdobeOrg=-227196251%7CMCIDTS%7C18043%7CMCMID%7C11305740583582521872941987069957610473%7CMCOPTOUT-1558941981s%7CNONE%7CMCAID%7CNONE; _gat=1; s_ppvl=seller%253A%2520home%2520page%2C100%2C100%2C1000%2C847%2C998%2C1920%2C1080%2C0.8%2CL; s_ppv=seller%253A%2520payments%2520%257C%2520transactions%2C100%2C100%2C998%2C1043%2C998%2C1920%2C1080%2C0.8%2CP; s_nr=1558935916729-Repeat; s_ppn=no%20value; s_sq=flipkart-prd%3D%2526pid%253DHomePage%2526pidt%253D1%2526oid%253Dfunction%252528%252529%25257B%25257D%2526oidt%253D2%2526ot%253DDIV',
//   'Connection: keep-alive',
//   'Referer: https://seller.flipkart.com/sw.js',
//   'fk-csrf-token: C6ed4qGh-iRJXE-besPQs8yMeJIPWD_Zrs8w'
// ])
// .get('https://seller.flipkart.com/napi/payments/getAllTransactions?offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&sellerId=9ujbcnp6ky5ruzie')
// .then(({ statusCode, body, headers }) => {
//   console.log(body);
//   if (headers['content-encoding'] === 'gzip') {
//     var gunzip = zlib.createGunzip();
//     var json = '';
//     gunzip.on('data', function(data) {
//       json += data.toString();
//     });

//     gunzip.on('end', function() {
//       parseJSON(json);
//     });

//     body.pipe(gunzip);
//   }
// })
// .catch(e => {
//   console.log(e)
// });

/**
 * Has More for Order Transactions
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=10&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=10&sellerId=9ujbcnp6ky5ruzie
 * response - {"result":{"token":21,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534968707538400","order_id":"OD115349687075384000","settled_amount":272.796,"unsettled_amount":0,"listing_id":"LSTKRTF4TXGCGY2H3Z5OWP9EN","sku":"A88-M","dispatched_date":"2019-05-03","is_clickable":true,"is_replacement":null},{"order_item_id":"11534964765556700","order_id":"OD115349647655567000","settled_amount":243.779,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8ZARVRAG4LAGLKE","sku":"K341-S","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534956441743200","order_id":"OD115349564417432000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTYUFXKPJEJEHPUM","sku":"K257-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534936028652200","order_id":"OD115349360286522000","settled_amount":241.3,"unsettled_amount":0,"listing_id":"LSTKRTF4UMZZ6ZJYQRXSHDB4F","sku":"A275-XL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534933114548700","order_id":"OD115349331145487000","settled_amount":199.675,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTPYZHXUR2XHQAXV","sku":"K258-XXL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534931959168600","order_id":"OD115349319591686000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTXDSVHHB799HHIB","sku":"K258-m","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534917292035300","order_id":"OD115349172920353000","settled_amount":-125.08,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534902130288601","order_id":"OD115349021302886000","settled_amount":169.427,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=21&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=21&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":29,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534896334435600","order_id":"OD115348963344356000","settled_amount":189.133,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTXDSVHHB799HHIB","sku":"K258-m","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534879985252300","order_id":"OD115348799852523000","settled_amount":243.78,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTSKARHX3GLKO15O","sku":"K258-XL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534878245244000","order_id":"OD115348782452440000","settled_amount":243.779,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTJBFCFKBG4YA1YN","sku":"K255-XXL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534877418462700","order_id":"OD115348774184627000","settled_amount":199.675,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8YYRK2GGDN53NF7","sku":"K343-XXL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534876532786400","order_id":"OD115348765327864000","settled_amount":170.284,"unsettled_amount":0,"listing_id":"LSTKTAFEYZNQRBQQ8VDSDVI4E","sku":"K398-XXL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534863097393600","order_id":"OD115348630973936000","settled_amount":259.068,"unsettled_amount":0,"listing_id":"LSTKTAFB6QKSQBHUMBKUSZSJB","sku":"K376-XXL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534862482056100","order_id":"OD115348624820561000","settled_amount":201.73,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTWXZRJ3PEECV1UZ","sku":"K257-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534859260985600","order_id":"OD115348592609856000","settled_amount":259.068,"unsettled_amount":0,"listing_id":"LSTKTAFB6QKKHDZGN8GVSQS3T","sku":"K377-XXL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=29&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=29&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":42,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534855703763900","order_id":"OD115348557037639000","settled_amount":215.458,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTT7DKZUACR1J7RJ","sku":"K256-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534854568203200","order_id":"OD115348545682032000","settled_amount":190.423,"unsettled_amount":0,"listing_id":"LSTKTAFDVHNFUJ9QUXGLOUUB2","sku":"K392-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534846022611500","order_id":"OD115348460226115000","settled_amount":215.458,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTYUFXKPJEJEHPUM","sku":"K257-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534836563047100","order_id":"OD115348365630471000","settled_amount":179.693,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8FRNR3ZFWRFKZM5","sku":"K340-XXL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534829474615100","order_id":"OD115348294746151000","settled_amount":211.17,"unsettled_amount":0,"listing_id":"LSTKTAF4PGT94ZEWAP9GZI4TJ","sku":"K255-S","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534823832444000","order_id":"OD115348238324440000","settled_amount":192.596,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTJBFCFKBG4YA1YN","sku":"K255-XXL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534791863834600","order_id":"OD115347918638346000","settled_amount":188.307,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534782618537700","order_id":"OD115347826185377000","settled_amount":215.458,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTABWKWKZYGLNKBH","sku":"K257-XXL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=42&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=42&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":50,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534773975466902","order_id":"OD115347739754669000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8YJ2CZMSY9HNYKX","sku":"K342-L","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534773891612200","order_id":"OD115347738916122000","settled_amount":-103.84,"unsettled_amount":0,"listing_id":"LSTKRTF4TXGKEHVNQBGPPOLWL","sku":"A88-XL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534771909962700","order_id":"OD115347719099627000","settled_amount":250.992,"unsettled_amount":0,"listing_id":"LSTKRTEH68UCZW5ANZB7MK3HL","sku":"K89-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534767912221800","order_id":"OD115347679122218000","settled_amount":292.483,"unsettled_amount":0,"listing_id":"LSTKRTF4TXGKEHVNQBGPPOLWL","sku":"A88-XL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534767813022001","order_id":"OD115347678130220000","settled_amount":149.71,"unsettled_amount":0,"listing_id":"LSTKTAFYWWGUMYEGAFCWOK5OH","sku":"K324-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534767171651600","order_id":"OD115347671716516000","settled_amount":204.844,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTNEPRUMJBRYQ4PI","sku":"K257-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534753904094200","order_id":"OD115347539040942000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTWXZRJ3PEECV1UZ","sku":"K257-S","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534753663022700","order_id":"OD115347536630227000","settled_amount":190.082,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=50&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=50&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":62,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534749696532500","order_id":"OD115347496965325000","settled_amount":183.155,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTPXKBHEZKW6XDSZ","sku":"K256-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534745885680800","order_id":"OD115347458856808000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTJBFCFKBG4YA1YN","sku":"K255-XXL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534737285335900","order_id":"OD115347372853359000","settled_amount":201.73,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534717175767300","order_id":"OD115347171757673000","settled_amount":252.607,"unsettled_amount":0,"listing_id":"LSTKRTEH68TYWNTFYMKECGPLV","sku":"K89-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534690325445300","order_id":"OD115346903254453000","settled_amount":183.155,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTABWKWKZYGLNKBH","sku":"K257-XXL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534689868734300","order_id":"OD115346898687343000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTABWKWKZYGLNKBH","sku":"K257-XXL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534683676705502","order_id":"OD115346836767055000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTA6XFEEQHWL8ZU0","sku":"K258-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534667732442101","order_id":"OD115346677324421000","settled_amount":211.476,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8PAYYVNJC7FZBVA","sku":"K342-S","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=62&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=62&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":70,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534651711105902","order_id":"OD115346517111059000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF89WZQ8N3AHYYRHOOWO","sku":"K359-M","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534646396741700","order_id":"OD115346463967417000","settled_amount":220.61,"unsettled_amount":0,"listing_id":"LSTKTAF4PGT94ZEWAP9GZI4TJ","sku":"K255-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534641473254300","order_id":"OD115346414732543000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKRTF4UMZMQFFEZA89OSKG2","sku":"A275-M","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534623937992300","order_id":"OD115346239379923000","settled_amount":243.259,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8BQYZFFUC6SBBT2","sku":"K344-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534609409021200","order_id":"OD115346094090212000","settled_amount":333.239,"unsettled_amount":0,"listing_id":"LSTKRTEN96VQDYHYZS2LTHPJK","sku":"k162-XL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534587865362500","order_id":"OD115345878653625000","settled_amount":169.427,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534587842828100","order_id":"OD115345878428281000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8G7FGDUJN0KVQUM","sku":"K343-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534586810237900","order_id":"OD115345868102379000","settled_amount":234.338,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTNEPRUMJBRYQ4PI","sku":"K257-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=70&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=70&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":78,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534584960036400","order_id":"OD115345849600364000","settled_amount":234.338,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8BZZCM5ETH39CX0","sku":"K340-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534583187525600","order_id":"OD115345831875256000","settled_amount":-166.002,"unsettled_amount":0,"listing_id":"LSTKTAFEQMTU27FGRTP4DLVAY","sku":"K409-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534571438517100","order_id":"OD115345714385171000","settled_amount":189.133,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTUY7TW5K2JW7SWM","sku":"K257-XL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534562327855300","order_id":"OD115345623278553000","settled_amount":90.36,"unsettled_amount":0,"listing_id":"LSTKRTF4TXGEE3WKDZZ5LNC3K","sku":"A91-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534522398394000","order_id":"OD115345223983940000","settled_amount":231.978,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8BZZCM5ETH39CX0","sku":"K340-M","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534512763892100","order_id":"OD115345127638921000","settled_amount":-81.52,"unsettled_amount":0,"listing_id":"LSTKRTEH68VQ59WGRAD94AXDF","sku":"K88-XXL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534494938908600","order_id":"OD115344949389086000","settled_amount":266.084,"unsettled_amount":0,"listing_id":"LSTKRTF4UMZXAJHF5MYTIYYCV","sku":"A275-S","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534485038516800","order_id":"OD115344850385168000","settled_amount":-157.483,"unsettled_amount":0,"listing_id":"LSTKTAFDVHNKW9U2P3AD6DI2C","sku":"K392-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=78&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=78&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":87,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534474951147500","order_id":"OD115344749511475000","settled_amount":-82.55,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTJBFCFKBG4YA1YN","sku":"K255-XXL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534466011083900","order_id":"OD115344660110839000","settled_amount":239.372,"unsettled_amount":0,"listing_id":"LSTKTAF4PGT94ZEWAP9GZI4TJ","sku":"K255-S","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534430627795700","order_id":"OD115344306277957000","settled_amount":234.338,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTABWKWKZYGLNKBH","sku":"K257-XXL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534414131143800","order_id":"OD115344141311438000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKRTEH68UCZW5ANZB7MK3HL","sku":"K89-L","dispatched_date":null,"is_clickable":true,"is_replacement":null},{"order_item_id":"11534290845076200","order_id":"OD115342908450762000","settled_amount":224.899,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTXDSVHHB799HHIB","sku":"K258-m","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534254867662800","order_id":"OD115342548676628000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTYUFXKPJEJEHPUM","sku":"K257-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534240509207806","order_id":"OD115342405092078000","settled_amount":169.427,"unsettled_amount":0,"listing_id":"LSTKTAF4PGT94ZEWAP9GZI4TJ","sku":"K255-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534234461003200","order_id":"OD115342344610032000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8U5KYS4KSVRXILK","sku":"K342-XL","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=87&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=87&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":98,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534218959775100","order_id":"OD115342189597751000","settled_amount":236.203,"unsettled_amount":0,"listing_id":"LSTKRTF4UMZXAJHF5MYTIYYCV","sku":"A275-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534210390901704","order_id":"OD115342103909017000","settled_amount":185.964,"unsettled_amount":0,"listing_id":"LSTKTAFDVHNKW9U2P3AD6DI2C","sku":"K392-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534209960533700","order_id":"OD115342099605337000","settled_amount":76.28,"unsettled_amount":0,"listing_id":"LSTKTAFDVHZUPURURTJMVSI8E","sku":"K390-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534188899805900","order_id":"OD115341888998059000","settled_amount":485.502,"unsettled_amount":0,"listing_id":"LSTKTAFEQMTRCVQWW5PYMROCQ","sku":"K413-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534180272374501","order_id":"OD115341802723745000","settled_amount":230.05,"unsettled_amount":0,"listing_id":"LSTKTAF4PGT94ZEWAP9GZI4TJ","sku":"K255-S","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11534167577102500","order_id":"OD115341675771025000","settled_amount":250.992,"unsettled_amount":0,"listing_id":"LSTKRTEH68VMZHPQJAAABEQHQ","sku":"K90-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534159818936400","order_id":"OD115341598189364000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTFXE9XQWYCQBJRN","sku":"K255-XL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534138956301400","order_id":"OD115341389563014000","settled_amount":213.098,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTNEPRUMJBRYQ4PI","sku":"K257-L","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=98&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=98&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":106,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534131420110100","order_id":"OD115341314201101000","settled_amount":202.46,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTXDSVHHB799HHIB","sku":"K258-m","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11534131132655400","order_id":"OD115341311326554000","settled_amount":216.196,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTXDSVHHB799HHIB","sku":"K258-m","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11534128973348800","order_id":"OD115341289733488000","settled_amount":196.94,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTWXZRJ3PEECV1UZ","sku":"K257-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534112864911000","order_id":"OD115341128649110000","settled_amount":442.206,"unsettled_amount":0,"listing_id":"LSTKTAFDVHNWTCXKZR9OELZ14","sku":"K390-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534111757738900","order_id":"OD115341117577389000","settled_amount":215.458,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTA6XFEEQHWL8ZU0","sku":"K258-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534108214692000","order_id":"OD115341082146920000","settled_amount":243.779,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8ZPGRH8GB3QJIVM","sku":"K341-XL","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11534107721598800","order_id":"OD115341077215988000","settled_amount":234.771,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534086969211500","order_id":"OD115340869692115000","settled_amount":208.962,"unsettled_amount":0,"listing_id":"LSTKTAF4PGT94ZEWAP9GZI4TJ","sku":"K255-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=106&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=106&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":114,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534082442607800","order_id":"OD115340824426078000","settled_amount":202.035,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTUY7TW5K2JW7SWM","sku":"K257-XL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534071145692300","order_id":"OD115340711456923000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTFXE9XQWYCQBJRN","sku":"K255-XL","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11534066976270700","order_id":"OD115340669762707000","settled_amount":204.96,"unsettled_amount":0,"listing_id":"LSTKTAFEYZNQRBQQ8VDSDVI4E","sku":"K398-XXL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534065361772300","order_id":"OD115340653617723000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTJBFCFKBG4YA1YN","sku":"K255-XXL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534063832162500","order_id":"OD115340638321625000","settled_amount":198.573,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTNEPRUMJBRYQ4PI","sku":"K257-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534037891507700","order_id":"OD115340378915077000","settled_amount":267.498,"unsettled_amount":0,"listing_id":"LSTKTAFDSZPPQEGBDYNHMVJW1","sku":"K381-S","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534036239137900","order_id":"OD115340362391379000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTNEPRUMJBRYQ4PI","sku":"K257-L","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11534030294138400","order_id":"OD115340302941384000","settled_amount":-114.814,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTFGMBFFMGGDG1BU","sku":"K256-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=114&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=114&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":123,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11534024947500100","order_id":"OD115340249475001000","settled_amount":-115.711,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTUY7TW5K2JW7SWM","sku":"K257-XL","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534019641796801","order_id":"OD115340196417968000","settled_amount":29.56,"unsettled_amount":0,"listing_id":"LSTKTAF5EVVFZHCCCPUWXMFCJ","sku":"A76-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11534015984092300","order_id":"OD115340159840923000","settled_amount":-167.56,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11534005204927300","order_id":"OD115340052049273000","settled_amount":283.043,"unsettled_amount":0,"listing_id":"LSTKRTF4TXGKEHVNQBGPPOLWL","sku":"A88-XL","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533998329302500","order_id":"OD115339983293025000","settled_amount":211.17,"unsettled_amount":0,"listing_id":"LSTKTAF4PGT94ZEWAP9GZI4TJ","sku":"K255-S","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533996518987801","order_id":"OD115339965189878000","settled_amount":215.458,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTXDSVHHB799HHIB","sku":"K258-m","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11533987537318700","order_id":"OD115339875373187000","settled_amount":215.458,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTYUFXKPJEJEHPUM","sku":"K257-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11533971512612400","order_id":"OD115339715126124000","settled_amount":189.133,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTYUFXKPJEJEHPUM","sku":"K257-M","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=123&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=123&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":133,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11533966108182700","order_id":"OD115339661081827000","settled_amount":235.146,"unsettled_amount":0,"listing_id":"LSTKTAFEP5PQAYRCYUMMEXQMI","sku":"K402-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11533957857201200","order_id":"OD115339578572012000","settled_amount":231.979,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTYUFXKPJEJEHPUM","sku":"K257-M","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533925714901300","order_id":"OD115339257149013000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF7CWMPUZZPWBWHCUOAO","sku":"K345-M","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533917445616100","order_id":"OD115339174456161000","settled_amount":199.675,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8YYRK2GGDN53NF7","sku":"K343-XXL","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533914586215802","order_id":"OD115339145862158000","settled_amount":87.402,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTNEPRUMJBRYQ4PI","sku":"K257-L","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11533911510604400","order_id":"OD115339115106044000","settled_amount":335.223,"unsettled_amount":0,"listing_id":"LSTKTAF89WZCFTGKCJ3KMLCVC","sku":"K359-XXL","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533907599883900","order_id":"OD115339075998839000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8MKZ3XKZTDCPGZ1","sku":"K342-XXL","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533902536590101","order_id":"OD115339025365901000","settled_amount":216.196,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTRWFEDQNE4WDHFZ","sku":"K255-L","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=133&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=133&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":142,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11533882773431600","order_id":"OD115338827734316000","settled_amount":316.719,"unsettled_amount":0,"listing_id":"LSTKTAFYAY9MVZAMB3NMEDBR6","sku":"K296-M","dispatched_date":"2019-05-02","is_clickable":true,"is_replacement":null},{"order_item_id":"11533875390676000","order_id":"OD115338753906760000","settled_amount":231.979,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTNEPRUMJBRYQ4PI","sku":"K257-L","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533867433595502","order_id":"OD115338674335955000","settled_amount":476.06,"unsettled_amount":0,"listing_id":"LSTKTAFEQMTU5GJXQGDVAFND7","sku":"K408-M","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533845011430302","order_id":"OD115338450114303000","settled_amount":192.596,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTFXE9XQWYCQBJRN","sku":"K255-XL","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533838933958500","order_id":"OD115338389339585000","settled_amount":230.05,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533805533136500","order_id":"OD115338055331365000","settled_amount":277.948,"unsettled_amount":0,"listing_id":"LSTKTAFFYP3EAXNYFXBJZBFHT","sku":"K282-XL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533793555728401","order_id":"OD115337935557284000","settled_amount":-167.56,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTPXKBHEZKW6XDSZ","sku":"K256-M","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533787358115300","order_id":"OD115337873581153000","settled_amount":268.759,"unsettled_amount":0,"listing_id":"LSTKRTEH68UUYNT68RSU3ED0D","sku":"K88-M","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=142&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=142&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":151,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11533780754758900","order_id":"OD115337807547589000","settled_amount":198.573,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTPXKBHEZKW6XDSZ","sku":"K256-M","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533780013831600","order_id":"OD115337800138316000","settled_amount":288.508,"unsettled_amount":0,"listing_id":"LSTKRTEFS5DHMQC5FHE7S6MEG","sku":"K42-M","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533775522580400","order_id":"OD115337755225804000","settled_amount":100.347,"unsettled_amount":0,"listing_id":"LSTKTAF4PGT94ZEWAP9GZI4TJ","sku":"K255-S","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533767423076400","order_id":"OD115337674230764000","settled_amount":179.693,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTSKARHX3GLKO15O","sku":"K258-XL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533762940975802","order_id":"OD115337629409758000","settled_amount":188.307,"unsettled_amount":0,"listing_id":"LSTKTAF4PGT94ZEWAP9GZI4TJ","sku":"K255-S","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533755162872900","order_id":"OD115337551628729000","settled_amount":0,"unsettled_amount":0,"listing_id":"LSTKRTF4UMZPZU8XTJYAB8GRI","sku":"A275-L","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533748020590100","order_id":"OD115337480205901000","settled_amount":237.805,"unsettled_amount":0,"listing_id":"LSTKTAF7AG8WR2TKFBZ4RT5EU","sku":"K341-L","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533741559964400","order_id":"OD115337415599644000","settled_amount":201.73,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTPTBQJQCD6MBDF2","sku":"K256-XL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null}]}}
 * 
 * https://seller.flipkart.com/napi/payments/getAllTransactions?token=151&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=order_item_transactions&pageNo=151&sellerId=9ujbcnp6ky5ruzie
 * {"result":{"token":159,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"orderItem","transactions":[{"order_item_id":"11533728835454200","order_id":"OD115337288354542000","settled_amount":188.307,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTRWFEDQNE4WDHFZ","sku":"K255-L","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533718806631800","order_id":"OD115337188066318000","settled_amount":256.644,"unsettled_amount":0,"listing_id":"LSTKRTF4UMZZ6ZJYQRXSHDB4F","sku":"A275-XL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533716169045000","order_id":"OD115337161690450000","settled_amount":224.341,"unsettled_amount":0,"listing_id":"LSTKRTF4UMZZ6ZJYQRXSHDB4F","sku":"A275-XL","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533713446084201","order_id":"OD115337134460842000","settled_amount":169.427,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","sku":"K255-M","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533712159018000","order_id":"OD115337121590180000","settled_amount":211.17,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTUY7TW5K2JW7SWM","sku":"K257-XL","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533701421401802","order_id":"OD115337014214018000","settled_amount":190.082,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTWXZRJ3PEECV1UZ","sku":"K257-S","dispatched_date":"2019-04-30","is_clickable":true,"is_replacement":null},{"order_item_id":"11533701421401801","order_id":"OD115337014214018000","settled_amount":200.383,"unsettled_amount":0,"listing_id":"LSTKTAF4PGT94ZEWAP9GZI4TJ","sku":"K255-S","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null},{"order_item_id":"11533697271680700","order_id":"OD115336972716807000","settled_amount":211.17,"unsettled_amount":0,"listing_id":"LSTKTAF4PGTFXE9XQWYCQBJRN","sku":"K255-XL","dispatched_date":"2019-04-29","is_clickable":true,"is_replacement":null}]}}
 * 
 * 
 */

 /**
  * Has More for Storage & Recall Transactions
  * 
  * https://seller.flipkart.com/napi/payments/getAllTransactions?token=48&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=storage_recall_transactions&pageNo=48&sellerId=9ujbcnp6ky5ruzie
  * {"result":{"token":93,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"warehouse","transactions":[{"doc_count":6,"listing_id":"LSTKTAFYWWGADANKQ9PKPJCPV","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYWWGADANKQ9P","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-1401.84,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYWWG2JU8XQYZWDXPAC","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYWWG2JU8XQYZ","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-9.276,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYBFWYGUWKAZT7MVSO8","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYBFWYGUWKAZT","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-8.814,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYBFWKB2VNVTF666RCT","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYBFWKB2VNVTF","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-11.918,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYBFWHJ8TU5RQKPCYR3","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYBFWHJ8TU5RQ","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-9.712,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYBFWGHVSNFMUID5HX5","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYBFWGHVSNFMU","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-11.092,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFYBFVSTSBEASTBDNUDA","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFYBFVSTSBEAST","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-11.682,"unsettled_amount":0,"is_clickable":true},{"doc_count":3,"listing_id":"LSTKTAFB5MTF8YNRDCKXOHAYZ","recall_id":null,"state_code":"IN-KA","type":"storage","fsn":"KTAFB5MTF8YNRDCK","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-5.9,"unsettled_amount":0,"is_clickable":true}]}}
  * 
  * https://seller.flipkart.com/napi/payments/getAllTransactions?token=93&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=storage_recall_transactions&pageNo=93&sellerId=9ujbcnp6ky5ruzie
  * {"result":{"token":141,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"warehouse","transactions":[{"doc_count":6,"listing_id":"LSTKTAFAJE2ZP3RZ9ZVDL9VTV","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2ZP3RZ9ZV","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-4896.528,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2WYRTFJNEZJNXND","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2WYRTFJNE","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-35.99,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2WRBMEA8TGJNYMD","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2WRBMEA8T","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-71.98,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2UB4K82EYERCHBG","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2UB4K82EY","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-35.21,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2TYKFRWHURQK5GK","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2TYKFRWHU","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-34.574,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2TNZSM5RE0BUYIZ","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2TNZSM5RE","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-35.118,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2T2MHYZGPTFYWCS","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2T2MHYZGP","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-35.21,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2R6XQH8DXRVO5JX","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2R6XQH8DX","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-30.254,"unsettled_amount":0,"is_clickable":true}]}}
  * 
  * https://seller.flipkart.com/napi/payments/getAllTransactions?token=141&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=storage_recall_transactions&pageNo=141&sellerId=9ujbcnp6ky5ruzie
  * {"result":{"token":189,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"warehouse","transactions":[{"doc_count":6,"listing_id":"LSTKTAFAJE2Q7CGGXW5JB90QF","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2Q7CGGXW5","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-34.056,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2PTYQP4SJAGG56X","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2PTYQP4SJ","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-66.692,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2MNGATFV4HYQIZI","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2MNGATFV4","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-35.21,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2MJEXRSYHZ7OUGL","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2MJEXRSYH","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-30.562,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2MHCHGJVFL85ZJK","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2MHCHGJVF","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-33.076,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2JMYHZG3CNULW50","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2JMYHZG3C","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-35.518,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2HSRXUU4CRX5UMM","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2HSRXUU4C","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-33.902,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2HSBMFRHHKWJ4VF","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2HSBMFRHH","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-35.918,"unsettled_amount":0,"is_clickable":true}]}}
  * 
  * https://seller.flipkart.com/napi/payments/getAllTransactions?token=189&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=storage_recall_transactions&pageNo=189&sellerId=9ujbcnp6ky5ruzie
  * {"result":{"token":240,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"warehouse","transactions":[{"doc_count":9,"listing_id":"LSTKTAFAJE2GYWGWZDDR3SYWT","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2GYWGWZDD","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-33.112,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2GMHWZJ32HGUGDD","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2GMHWZJ32","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-30.962,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2GEFF6PQP0CUPKN","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2GEFF6PQP","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-34.928,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2FYUZNHKH3GOLXI","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2FYUZNHKH","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-34.882,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2FGFGY7CGSTEVDI","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2FGFGY7CG","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-31.424,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2EAC8UB6G7LTFDZ","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2EAC8UB6G","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-32.096,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE2AWRHY2QHGNINNW","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE2AWRHY2QH","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-9.05,"unsettled_amount":0,"is_clickable":true},{"doc_count":6,"listing_id":"LSTKTAFAJE28EFWR3XSUCGS8Y","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE28EFWR3XS","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-35.2,"unsettled_amount":0,"is_clickable":true}]}}
  * 
  * https://seller.flipkart.com/napi/payments/getAllTransactions?token=240&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=storage_recall_transactions&pageNo=240&sellerId=9ujbcnp6ky5ruzie
  * {"result":{"token":267,"size":8,"total_count":0,"net_amount":0,"is_next":true,"total_pages":0,"max_limit_exceeded":false,"group":"warehouse","transactions":[{"doc_count":6,"listing_id":"LSTKTAFAJE25HYHTG8ZNZZN4O","recall_id":null,"state_code":"IN-WB","type":"storage","fsn":"KTAFAJE25HYHTG8Z","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-34.974,"unsettled_amount":0,"is_clickable":true},{"doc_count":3,"listing_id":"LSTKTAFAJD3UFPGAHFDPTMZB9","recall_id":null,"state_code":"IN-KA","type":"storage","fsn":"KTAFAJD3UFPGAHFD","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-3.658,"unsettled_amount":0,"is_clickable":true},{"doc_count":3,"listing_id":"LSTKTAFAJD3QAV6CPTGAGQ4K9","recall_id":null,"state_code":"IN-KA","type":"storage","fsn":"KTAFAJD3QAV6CPTG","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-2.396,"unsettled_amount":0,"is_clickable":true},{"doc_count":3,"listing_id":"LSTKTAFAJD3PDDZQ7HHTZREH1","recall_id":null,"state_code":"IN-KA","type":"storage","fsn":"KTAFAJD3PDDZQ7HH","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-5.9,"unsettled_amount":0,"is_clickable":true},{"doc_count":3,"listing_id":"LSTKTAFAJD3J6DHH9GYM7KGR5","recall_id":null,"state_code":"IN-KA","type":"storage","fsn":"KTAFAJD3J6DHH9GY","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-5.31,"unsettled_amount":0,"is_clickable":true},{"doc_count":3,"listing_id":"LSTKTAFAJD3GFUEZWHEPCBDQQ","recall_id":null,"state_code":"IN-KA","type":"storage","fsn":"KTAFAJD3GFUEZWHE","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-5.11,"unsettled_amount":0,"is_clickable":true},{"doc_count":3,"listing_id":"LSTKTAFAGGMZFDMZNYMG2P5JK","recall_id":null,"state_code":"IN-KA","type":"storage","fsn":"KTAFAGGMZFDMZNYM","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-3.34,"unsettled_amount":0,"is_clickable":true},{"doc_count":3,"listing_id":"LSTKTAFAGGMGH7SWPDNZAWMM2","recall_id":null,"state_code":"IN-KA","type":"storage","fsn":"KTAFAGGMGH7SWPDN","neft_ids":[],"advice_ids":[],"event_date":null,"settled_amount":-3.386,"unsettled_amount":0,"is_clickable":true}]}}
  * 
  */

  /**
   * Has More for Ads Transactions
   * https://seller.flipkart.com/napi/payments/getAllTransactions?token=156&offset=8&start_date=2019-04-01&end_date=2019-04-30&type=ads_transactions&pageNo=156&sellerId=9ujbcnp6ky5ruzie
   * {"result":{"token":279,"size":2,"total_count":0,"net_amount":0,"is_next":false,"total_pages":0,"max_limit_exceeded":false,"group":"ads","transactions":[{"txn_id":"O2BRBYEU323Y","event_date":null,"type":"redeem","neft_ids":[],"advice_ids":["19293196","19432537","19246077","19383802","19149783","19339438","19062997","19198238","19613114","19528587","19109788","19479588"],"settled_amount":0,"unsettled_amount":0,"is_clickable":true},{"txn_id":"33AZJBX8WARR","event_date":null,"type":"redeem","neft_ids":[],"advice_ids":["19293196","19246077","19149783","19062997","19198238","19109788"],"settled_amount":0,"unsettled_amount":0,"is_clickable":true}]}}
   * 
   */

   /**
    * Order Items
    * Details 
    * https://seller.flipkart.com/napi/payments/details?param=11533728835454200&service_type=orderItem&sellerId=9ujbcnp6ky5ruzie
    * {"order_id":"OD115337288354542000","parent_replacement_item":null,"child_replacement_items":[],"sku":"K255-L","fsn":"KTAF4PGTRWFEDQNE","listing_id":"LSTKTAF4PGTRWFEDQNE4WDHFZ","quantity":1,"darwin_tier":"gold","vertical":"kurta","order_type":"postpaid","fulfilment_type":"FBF_LITE","product_return_status":null,"return_type":"NA","item_attributes":["STANDARD_DELIVERY"],"sale_details":{"non_gst":{"selling_price":315,"total_offer":40,"seller_share":-40,"order_item_value":315},"gst":{"selling_price":315,"total_offer":40,"seller_share":-40,"ndd_amount":0,"sdd_amount":0,"customer_shipping_amount":0,"order_item_value":315,"base_amount":376.192,"tax_group":[{"tax_group":"GST_TAX","base_amount":0,"net_amount":18.808,"net_tax_rule_value":5,"tax_detail":[{"tax_type":"CGST","tax_value":9.404,"rule_name":"%","rule_value":2.5},{"tax_type":"SGST","tax_value":9.404,"rule_name":"%","rule_value":2.5}]},{"tax_group":"TCS_TAX","base_amount":0,"net_amount":-3,"net_tax_rule_value":1,"tax_detail":[{"tax_type":"TCS_CGST","tax_value":-1.5,"rule_name":"%","rule_value":0.5},{"tax_type":"TCS_SGST","tax_value":-1.5,"rule_name":"%","rule_value":0.5}]}]}},"transactions_summary":{"sale_amount":315,"seller_share":-40,"total_offer":40,"refund_amount":0,"marketplace_fee":-104.825,"total_taxes":-18.868,"protection_fund":0,"customer_shipping_amount":0,"customer_shipping_type":"","adjustments":0,"incentives":0,"net_amount":188.307,"tcs_amount":-3},"timeline":[{"event":"order_date","event_date":"2019-04-29"},{"event":"dispatched_date","event_date":"2019-04-30"},{"event":"delivered_date","event_date":"2019-05-02"},{"event":"fwd_due_date","event_date":"2019-05-08"},{"event":"fwd_settlement_date","event_date":"2019-05-08"}],"shipped_from":"IN-RJ","shipped_to":"IN-RJ","hsn_code":"61046200","product_title":"Chichi Women Embroidered, Solid Straight Kurta","product_image":"http://img.fkcdn.com/image/100/100/jhnqcnk0/kurta/c/e/5/m-eh-258-tactic-original-imaf4pgyzvyzxnja.jpeg"}
    * 
    * History
    * https://seller.flipkart.com/napi/payments/history?param=11533728835454200&service_type=orderItem&sellerId=9ujbcnp6ky5ruzie
    * {"order_item_id":"11533728835454200","settled_settlements":[{"neft_id":"NFT-190508075GN00215XXXXXXX","advice_id":"19710660","net_amount":188.307,"payment_type":["FORWARD"],"adjustment_reason":{},"settlement_date":"2019-05-08","sale_amount":315,"total_offer":40,"seller_share":-40,"refund_amount":0,"protection_fund":0,"adjustments":0,"customer_shipping_amount":0,"customer_shipping_type":"","incentives":0,"tcs":{"tax_group":"TCS_TAX","base_amount":0,"net_amount":-3,"net_tax_rule_value":1,"tax_detail":[{"tax_type":"TCS_CGST","tax_value":-1.5,"rule_name":"%","rule_value":0.5},{"tax_type":"TCS_SGST","tax_value":-1.5,"rule_name":"%","rule_value":0.5}]},"marketplace_fee":{"commission_fee":-48.825,"collection_fee":-15,"fixed_fee":-5,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":-36,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":-104.825},"ancillary_marketplace_fee":{"LOCKIN":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0}},"lockin_type":"MY_SHARE","lockin_verbiage":"Includes customer shipping charge, which you opted in to pass on as rebate , for non F-assured orders from Flipkart Plus customers who are eligible for free shipping benefit","taxes":{"net_amount":-18.868,"tax_details":[{"fee_type":"Shipping Fee","net_tax_rule_value":18,"net_amount":-6.48,"tax_group":[{"tax_group":"GST","base_amount":-36,"net_amount":-6.48,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"SGST","tax_value":-3.24,"rule_name":"%","rule_value":9},{"tax_type":"CGST","tax_value":-3.24,"rule_name":"%","rule_value":9}]}]},{"fee_type":"Commission","net_tax_rule_value":18,"net_amount":-8.788,"tax_group":[{"tax_group":"GST","base_amount":-48.82,"net_amount":-8.788,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-8.788,"rule_name":"%","rule_value":18}]}]},{"fee_type":"Collection Fee","net_tax_rule_value":18,"net_amount":-2.7,"tax_group":[{"tax_group":"GST","base_amount":-15,"net_amount":-2.7,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-2.7,"rule_name":"%","rule_value":18}]}]},{"fee_type":"Fixed Fee","net_tax_rule_value":18,"net_amount":-0.9,"tax_group":[{"tax_group":"GST","base_amount":-5,"net_amount":-0.9,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-0.9,"rule_name":"%","rule_value":18}]}]}]},"fee_rates":null}],"upcoming_settlement":[],"total_settlement":{"neft_id":null,"advice_id":null,"net_amount":188.307,"payment_type":[],"adjustment_reason":{},"settlement_date":null,"sale_amount":315,"total_offer":40,"seller_share":-40,"refund_amount":0,"protection_fund":0,"adjustments":0,"customer_shipping_amount":0,"customer_shipping_type":"","incentives":0,"tcs":{"tax_group":"TCS_TAX","base_amount":0,"net_amount":-3,"net_tax_rule_value":1,"tax_detail":[{"tax_type":"TCS_CGST","tax_value":-1.5,"rule_name":"%","rule_value":0.5},{"tax_type":"TCS_SGST","tax_value":-1.5,"rule_name":"%","rule_value":0.5}]},"marketplace_fee":{"commission_fee":-48.825,"collection_fee":-15,"fixed_fee":-5,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":-36,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":-104.825},"ancillary_marketplace_fee":{"LOCKIN":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0}},"lockin_type":"MY_SHARE","lockin_verbiage":"Includes customer shipping charge, which you opted in to pass on as rebate , for non F-assured orders from Flipkart Plus customers who are eligible for free shipping benefit","taxes":{"net_amount":-18.868,"tax_details":[{"fee_type":"Shipping Fee","net_tax_rule_value":18,"net_amount":-6.48,"tax_group":[{"tax_group":"GST","base_amount":-36,"net_amount":-6.48,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"SGST","tax_value":-3.24,"rule_name":"%","rule_value":9},{"tax_type":"CGST","tax_value":-3.24,"rule_name":"%","rule_value":9}]}]},{"fee_type":"Commission","net_tax_rule_value":18,"net_amount":-8.788,"tax_group":[{"tax_group":"GST","base_amount":-48.82,"net_amount":-8.788,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-8.788,"rule_name":"%","rule_value":18}]}]},{"fee_type":"Collection Fee","net_tax_rule_value":18,"net_amount":-2.7,"tax_group":[{"tax_group":"GST","base_amount":-15,"net_amount":-2.7,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-2.7,"rule_name":"%","rule_value":18}]}]},{"fee_type":"Fixed Fee","net_tax_rule_value":18,"net_amount":-0.9,"tax_group":[{"tax_group":"GST","base_amount":-5,"net_amount":-0.9,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-0.9,"rule_name":"%","rule_value":18}]}]}]},"fee_rates":{"platform_fee":15.5,"payment_fee":2}},"forward_shipping_details":[{"weight_details":{"dead_weight_source":"seller","seller_dead_weight":0.2,"profiler_dead_weight":0,"max_dead_weight":0,"length":25,"breadth":15,"height":2,"volumetric_weight":0.15,"chargeable_weight_type":"Dead","chargeable_weight_slab":"0.0-0.5"},"shipping_zone":"Zonal","shipping_fee":-36,"shipment_id":null}],"reverse_shipping_details":[],"pick_pack_shipping_details":[]}
    * 
    * Details
    * https://seller.flipkart.com/napi/payments/details?param=11535034027346900&service_type=orderItem&sellerId=9ujbcnp6ky5ruzie
    * {"order_id":"OD115350340273469000","parent_replacement_item":null,"child_replacement_items":[],"sku":"K257-S","fsn":"KTAF4PGTWXZRJ3PE","listing_id":"LSTKTAF4PGTWXZRJ3PEECV1UZ","quantity":1,"darwin_tier":"gold","vertical":"kurta","order_type":"postpaid","fulfilment_type":"FBF_LITE","product_return_status":null,"return_type":"NA","item_attributes":["STANDARD_DELIVERY"],"sale_details":{"non_gst":{"selling_price":355,"total_offer":0,"seller_share":0,"order_item_value":355},"gst":{"selling_price":355,"total_offer":0,"seller_share":0,"ndd_amount":0,"sdd_amount":0,"customer_shipping_amount":0,"order_item_value":355,"base_amount":338.095,"tax_group":[{"tax_group":"GST_TAX","base_amount":0,"net_amount":16.905,"net_tax_rule_value":5,"tax_detail":[{"tax_type":"IGST","tax_value":16.905,"rule_name":"%","rule_value":5}]},{"tax_group":"TCS_TAX","base_amount":0,"net_amount":-3.381,"net_tax_rule_value":1,"tax_detail":[{"tax_type":"TCS_IGST","tax_value":-3.381,"rule_name":"%","rule_value":1}]}]}},"transactions_summary":{"sale_amount":355,"seller_share":0,"total_offer":0,"refund_amount":0,"marketplace_fee":-127.025,"total_taxes":-22.864,"protection_fund":0,"customer_shipping_amount":0,"customer_shipping_type":"","adjustments":0,"incentives":0,"net_amount":201.73,"tcs_amount":-3.381},"timeline":[{"event":"order_date","event_date":"2019-04-30"},{"event":"dispatched_date","event_date":"2019-05-03"},{"event":"delivered_date","event_date":"2019-05-08"},{"event":"fwd_settlement_date","event_date":"2019-05-10"},{"event":"fwd_due_date","event_date":"2019-05-11"}],"shipped_from":"IN-RJ","shipped_to":"IN-AP","hsn_code":"61046200","product_title":"Chichi Women Embroidered, Solid Straight Kurta","product_image":"http://img.fkcdn.com/image/100/100/jhnqcnk0/kurta/j/e/h/m-eh-258-tactic-original-imaf4pgeguyakygt.jpeg"}
    * 
    * History
    * https://seller.flipkart.com/napi/payments/history?param=11535034027346900&service_type=orderItem&sellerId=9ujbcnp6ky5ruzie
    * {"order_item_id":"11535034027346900","settled_settlements":[{"neft_id":"NFT-190510075GN00163XXXXXXX","advice_id":"19757972","net_amount":201.73,"payment_type":["FORWARD"],"adjustment_reason":{},"settlement_date":"2019-05-10","sale_amount":355,"total_offer":0,"seller_share":0,"refund_amount":0,"protection_fund":0,"adjustments":0,"customer_shipping_amount":0,"customer_shipping_type":"","incentives":0,"tcs":{"tax_group":"TCS_TAX","base_amount":0,"net_amount":-3.381,"net_tax_rule_value":1,"tax_detail":[{"tax_type":"TCS_IGST","tax_value":-3.381,"rule_name":"%","rule_value":1}]},"marketplace_fee":{"commission_fee":-55.025,"collection_fee":-15,"fixed_fee":-5,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":-52,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":-127.025},"ancillary_marketplace_fee":{"LOCKIN":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0}},"lockin_type":"NONE","lockin_verbiage":"","taxes":{"net_amount":-22.864,"tax_details":[{"fee_type":"Shipping Fee","net_tax_rule_value":18,"net_amount":-9.36,"tax_group":[{"tax_group":"GST","base_amount":-52,"net_amount":-9.36,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"SGST","tax_value":-4.68,"rule_name":"%","rule_value":9},{"tax_type":"CGST","tax_value":-4.68,"rule_name":"%","rule_value":9}]}]},{"fee_type":"Commission","net_tax_rule_value":18,"net_amount":-9.904,"tax_group":[{"tax_group":"GST","base_amount":-55.02,"net_amount":-9.904,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-9.904,"rule_name":"%","rule_value":18}]}]},{"fee_type":"Collection Fee","net_tax_rule_value":18,"net_amount":-2.7,"tax_group":[{"tax_group":"GST","base_amount":-15,"net_amount":-2.7,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-2.7,"rule_name":"%","rule_value":18}]}]},{"fee_type":"Fixed Fee","net_tax_rule_value":18,"net_amount":-0.9,"tax_group":[{"tax_group":"GST","base_amount":-5,"net_amount":-0.9,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-0.9,"rule_name":"%","rule_value":18}]}]}]},"fee_rates":null}],"upcoming_settlement":[],"total_settlement":{"neft_id":null,"advice_id":null,"net_amount":201.73,"payment_type":[],"adjustment_reason":{},"settlement_date":null,"sale_amount":355,"total_offer":0,"seller_share":0,"refund_amount":0,"protection_fund":0,"adjustments":0,"customer_shipping_amount":0,"customer_shipping_type":"","incentives":0,"tcs":{"tax_group":"TCS_TAX","base_amount":0,"net_amount":-3.381,"net_tax_rule_value":1,"tax_detail":[{"tax_type":"TCS_IGST","tax_value":-3.381,"rule_name":"%","rule_value":1}]},"marketplace_fee":{"commission_fee":-55.025,"collection_fee":-15,"fixed_fee":-5,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":-52,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":-127.025},"ancillary_marketplace_fee":{"LOCKIN":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0}},"lockin_type":"NONE","lockin_verbiage":"","taxes":{"net_amount":-22.864,"tax_details":[{"fee_type":"Shipping Fee","net_tax_rule_value":18,"net_amount":-9.36,"tax_group":[{"tax_group":"GST","base_amount":-52,"net_amount":-9.36,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"SGST","tax_value":-4.68,"rule_name":"%","rule_value":9},{"tax_type":"CGST","tax_value":-4.68,"rule_name":"%","rule_value":9}]}]},{"fee_type":"Commission","net_tax_rule_value":18,"net_amount":-9.904,"tax_group":[{"tax_group":"GST","base_amount":-55.02,"net_amount":-9.904,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-9.904,"rule_name":"%","rule_value":18}]}]},{"fee_type":"Collection Fee","net_tax_rule_value":18,"net_amount":-2.7,"tax_group":[{"tax_group":"GST","base_amount":-15,"net_amount":-2.7,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-2.7,"rule_name":"%","rule_value":18}]}]},{"fee_type":"Fixed Fee","net_tax_rule_value":18,"net_amount":-0.9,"tax_group":[{"tax_group":"GST","base_amount":-5,"net_amount":-0.9,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-0.9,"rule_name":"%","rule_value":18}]}]}]},"fee_rates":{"platform_fee":15.5,"payment_fee":2}},"forward_shipping_details":[{"weight_details":{"dead_weight_source":"seller","seller_dead_weight":0.2,"profiler_dead_weight":0,"max_dead_weight":0,"length":25,"breadth":15,"height":2,"volumetric_weight":0.15,"chargeable_weight_type":"Dead","chargeable_weight_slab":"0.0-0.5"},"shipping_zone":"National","shipping_fee":-52,"shipment_id":null}],"reverse_shipping_details":[],"pick_pack_shipping_details":[]}
    * 
    * Details
    * https://seller.flipkart.com/napi/payments/details?param=11534999011145100&service_type=orderItem&sellerId=9ujbcnp6ky5ruzie
    * {"order_id":"OD115349990111451000","parent_replacement_item":null,"child_replacement_items":[],"sku":"K257-S","fsn":"KTAF4PGTWXZRJ3PE","listing_id":"LSTKTAF4PGTWXZRJ3PEECV1UZ","quantity":1,"darwin_tier":null,"vertical":"kurta","order_type":"prepaid","fulfilment_type":"FBF_LITE","product_return_status":"Product Delivered","return_type":"courier_return","item_attributes":["STANDARD_DELIVERY"],"sale_details":{"non_gst":{"selling_price":299,"total_offer":16,"seller_share":-16,"order_item_value":299},"gst":null},"transactions_summary":{"sale_amount":299,"seller_share":0,"total_offer":0,"refund_amount":-299,"marketplace_fee":0,"total_taxes":0,"protection_fund":0,"customer_shipping_amount":0,"customer_shipping_type":"","adjustments":0,"incentives":0,"net_amount":0,"tcs_amount":0},"timeline":[{"event":"order_date","event_date":"2019-04-30"},{"event":"return_req_date","event_date":"2019-05-03"},{"event":"returned_date","event_date":"2019-05-03"},{"event":"fwd_settlement_date","event_date":"2019-05-10"},{"event":"rev_settlement_date","event_date":"2019-05-10"},{"event":"fwd_due_date","event_date":"2019-05-11"},{"event":"rev_due_date","event_date":"2019-05-11"}],"shipped_from":null,"shipped_to":null,"hsn_code":"61046200","product_title":"Chichi Women Embroidered, Solid Straight Kurta","product_image":"http://img.fkcdn.com/image/100/100/jhnqcnk0/kurta/j/e/h/m-eh-258-tactic-original-imaf4pgeguyakygt.jpeg"}
    * 
    * History
    * https://seller.flipkart.com/napi/payments/history?param=11534999011145100&service_type=orderItem&sellerId=9ujbcnp6ky5ruzie
    * {"order_item_id":"11534999011145100","settled_settlements":[{"neft_id":"NFT-190510097GN00268XXXXXXX","advice_id":"19757843","net_amount":0,"payment_type":["FORWARD","REVERSE"],"adjustment_reason":{},"settlement_date":"2019-05-10","sale_amount":299,"total_offer":0,"seller_share":0,"refund_amount":-299,"protection_fund":0,"adjustments":0,"customer_shipping_amount":0,"customer_shipping_type":"","incentives":0,"tcs":{"tax_group":"TCS_TAX","base_amount":0,"net_amount":0,"net_tax_rule_value":0,"tax_detail":[]},"marketplace_fee":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0},"ancillary_marketplace_fee":{"LOCKIN":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0}},"lockin_type":"NONE","lockin_verbiage":"","taxes":{"net_amount":0,"tax_details":[]},"fee_rates":null},{"neft_id":"NFT-190510075GN00163XXXXXXX","advice_id":"19757972","net_amount":0,"payment_type":["FORWARD","REVERSE"],"adjustment_reason":{},"settlement_date":"2019-05-10","sale_amount":0,"total_offer":0,"seller_share":0,"refund_amount":0,"protection_fund":0,"adjustments":0,"customer_shipping_amount":0,"customer_shipping_type":"","incentives":0,"tcs":{"tax_group":"TCS_TAX","base_amount":0,"net_amount":0,"net_tax_rule_value":0,"tax_detail":[]},"marketplace_fee":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0},"ancillary_marketplace_fee":{"LOCKIN":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0}},"lockin_type":"NONE","lockin_verbiage":"","taxes":{"net_amount":0,"tax_details":[]},"fee_rates":null}],"upcoming_settlement":[],"total_settlement":{"neft_id":null,"advice_id":null,"net_amount":0,"payment_type":[],"adjustment_reason":{},"settlement_date":null,"sale_amount":299,"total_offer":0,"seller_share":0,"refund_amount":-299,"protection_fund":0,"adjustments":0,"customer_shipping_amount":0,"customer_shipping_type":"","incentives":0,"tcs":{"tax_group":"TCS_TAX","base_amount":0,"net_amount":0,"net_tax_rule_value":0,"tax_detail":[]},"marketplace_fee":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0},"ancillary_marketplace_fee":{"LOCKIN":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0}},"lockin_type":"NONE","lockin_verbiage":"","taxes":{"net_amount":0,"tax_details":[]},"fee_rates":{"platform_fee":0,"payment_fee":0}},"forward_shipping_details":[],"reverse_shipping_details":[],"pick_pack_shipping_details":[]}
    * 
    * Details
    * https://seller.flipkart.com/napi/payments/details?param=11534974825126200&service_type=orderItem&sellerId=9ujbcnp6ky5ruzie
    * {"order_id":"OD115349748251262000","parent_replacement_item":null,"child_replacement_items":[],"sku":"K255-M","fsn":"KTAF4PGTCFRR5XYS","listing_id":"LSTKTAF4PGTCFRR5XYSSB5LY6","quantity":1,"darwin_tier":"gold","vertical":"kurta","order_type":"postpaid","fulfilment_type":"FBF","product_return_status":"Product Delivered","return_type":"courier_return","item_attributes":["STANDARD_DELIVERY"],"sale_details":{"non_gst":{"selling_price":355,"total_offer":0,"seller_share":0,"order_item_value":355},"gst":{"selling_price":355,"total_offer":0,"seller_share":0,"ndd_amount":0,"sdd_amount":0,"customer_shipping_amount":0,"order_item_value":355,"base_amount":338.095,"tax_group":[{"tax_group":"GST_TAX","base_amount":0,"net_amount":16.905,"net_tax_rule_value":5,"tax_detail":[{"tax_type":"IGST","tax_value":16.905,"rule_name":"%","rule_value":5}]},{"tax_group":"TCS_TAX","base_amount":0,"net_amount":-3.381,"net_tax_rule_value":1,"tax_detail":[{"tax_type":"TCS_IGST","tax_value":-3.381,"rule_name":"%","rule_value":1}]}]}},"transactions_summary":{"sale_amount":355,"seller_share":0,"total_offer":0,"refund_amount":-355,"marketplace_fee":0,"total_taxes":0,"protection_fund":0,"customer_shipping_amount":0,"customer_shipping_type":"","adjustments":0,"incentives":0,"net_amount":0,"tcs_amount":0},"timeline":[{"event":"order_date","event_date":"2019-04-30"},{"event":"dispatched_date","event_date":"2019-04-30"},{"event":"fwd_due_date","event_date":"2019-05-08"},{"event":"fwd_settlement_date","event_date":"2019-05-08"},{"event":"return_req_date","event_date":"2019-05-17"},{"event":"rev_due_date","event_date":"2019-05-18"},{"event":"rev_settlement_date","event_date":"2019-05-20"},{"event":"returned_date","event_date":"2019-05-26"}],"shipped_from":"IN-KA","shipped_to":"IN-AR","hsn_code":"61046200","product_title":"Chichi Women Embroidered, Solid Straight Kurta","product_image":"http://img.fkcdn.com/image/100/100/jhnqcnk0/kurta/c/e/5/m-eh-258-tactic-original-imaf4pgyzvyzxnja.jpeg"}
    * 
    * History
    * https://seller.flipkart.com/napi/payments/history?param=11534974825126200&service_type=orderItem&sellerId=9ujbcnp6ky5ruzie
    * {"order_item_id":"11534974825126200","settled_settlements":[{"neft_id":"NFT-190520078GN00168XXXXXXX","advice_id":"19945078","net_amount":-211.17,"payment_type":["REVERSE"],"adjustment_reason":{},"settlement_date":"2019-05-20","sale_amount":0,"total_offer":0,"seller_share":0,"refund_amount":-355,"protection_fund":0,"adjustments":0,"customer_shipping_amount":0,"customer_shipping_type":"","incentives":0,"tcs":{"tax_group":"TCS_TAX","base_amount":0,"net_amount":3.381,"net_tax_rule_value":1,"tax_detail":[{"tax_type":"TCS_IGST","tax_value":3.381,"rule_name":"%","rule_value":1}]},"marketplace_fee":{"commission_fee":55.025,"collection_fee":15,"fixed_fee":5,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":44,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":119.025},"ancillary_marketplace_fee":{"LOCKIN":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0}},"lockin_type":"NONE","lockin_verbiage":"","taxes":{"net_amount":21.424,"tax_details":[{"fee_type":"Shipping Fee","net_tax_rule_value":18,"net_amount":7.92,"tax_group":[{"tax_group":"GST","base_amount":44,"net_amount":7.92,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"SGST","tax_value":3.96,"rule_name":"%","rule_value":9},{"tax_type":"CGST","tax_value":3.96,"rule_name":"%","rule_value":9}]}]},{"fee_type":"Commission","net_tax_rule_value":18,"net_amount":9.904,"tax_group":[{"tax_group":"GST","base_amount":55.02,"net_amount":9.904,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"SGST","tax_value":4.952,"rule_name":"%","rule_value":9},{"tax_type":"CGST","tax_value":4.952,"rule_name":"%","rule_value":9}]}]},{"fee_type":"Collection Fee","net_tax_rule_value":18,"net_amount":2.7,"tax_group":[{"tax_group":"GST","base_amount":15,"net_amount":2.7,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":1.35,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":1.35,"rule_name":"%","rule_value":9}]}]},{"fee_type":"Fixed Fee","net_tax_rule_value":18,"net_amount":0.9,"tax_group":[{"tax_group":"GST","base_amount":5,"net_amount":0.9,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":0.45,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":0.45,"rule_name":"%","rule_value":9}]}]}]},"fee_rates":null},{"neft_id":"NFT-190508075GN00215XXXXXXX","advice_id":"19710660","net_amount":211.17,"payment_type":["FORWARD"],"adjustment_reason":{},"settlement_date":"2019-05-08","sale_amount":355,"total_offer":0,"seller_share":0,"refund_amount":0,"protection_fund":0,"adjustments":0,"customer_shipping_amount":0,"customer_shipping_type":"","incentives":0,"tcs":{"tax_group":"TCS_TAX","base_amount":0,"net_amount":-3.381,"net_tax_rule_value":1,"tax_detail":[{"tax_type":"TCS_IGST","tax_value":-3.381,"rule_name":"%","rule_value":1}]},"marketplace_fee":{"commission_fee":-55.025,"collection_fee":-15,"fixed_fee":-5,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":-44,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":-119.025},"ancillary_marketplace_fee":{"LOCKIN":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0}},"lockin_type":"NONE","lockin_verbiage":"","taxes":{"net_amount":-21.424,"tax_details":[{"fee_type":"Shipping Fee","net_tax_rule_value":18,"net_amount":-7.92,"tax_group":[{"tax_group":"GST","base_amount":-44,"net_amount":-7.92,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"SGST","tax_value":-3.96,"rule_name":"%","rule_value":9},{"tax_type":"CGST","tax_value":-3.96,"rule_name":"%","rule_value":9}]}]},{"fee_type":"Commission","net_tax_rule_value":18,"net_amount":-9.904,"tax_group":[{"tax_group":"GST","base_amount":-55.02,"net_amount":-9.904,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"SGST","tax_value":-4.952,"rule_name":"%","rule_value":9},{"tax_type":"CGST","tax_value":-4.952,"rule_name":"%","rule_value":9}]}]},{"fee_type":"Collection Fee","net_tax_rule_value":18,"net_amount":-2.7,"tax_group":[{"tax_group":"GST","base_amount":-15,"net_amount":-2.7,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":-1.35,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":-1.35,"rule_name":"%","rule_value":9}]}]},{"fee_type":"Fixed Fee","net_tax_rule_value":18,"net_amount":-0.9,"tax_group":[{"tax_group":"GST","base_amount":-5,"net_amount":-0.9,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":-0.45,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":-0.45,"rule_name":"%","rule_value":9}]}]}]},"fee_rates":null}],"upcoming_settlement":[],"total_settlement":{"neft_id":null,"advice_id":null,"net_amount":0,"payment_type":[],"adjustment_reason":{},"settlement_date":null,"sale_amount":355,"total_offer":0,"seller_share":0,"refund_amount":-355,"protection_fund":0,"adjustments":0,"customer_shipping_amount":0,"customer_shipping_type":"","incentives":0,"tcs":{"tax_group":"TCS_TAX","base_amount":0,"net_amount":0,"net_tax_rule_value":1,"tax_detail":[{"tax_type":"TCS_IGST","tax_value":0,"rule_name":"%","rule_value":1}]},"marketplace_fee":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0},"ancillary_marketplace_fee":{"LOCKIN":{"commission_fee":0,"collection_fee":0,"fixed_fee":0,"fee_discount":0,"cancellation_fee":0,"installation_fee":0,"uninstallation_fee":0,"no_cost_emi_fee":0,"franchise_fee":0,"uninstallation_packaging_fee":0,"tech_visit_fee":0,"forward_shipping_fee":0,"reverse_shipping_fee":0,"pick_and_pack_fee":0,"service_cancellation_fee":0,"customer_shipping_fee_amount":0,"customer_shipping_fee_type":"","net_amount":0}},"lockin_type":"NONE","lockin_verbiage":"","taxes":{"net_amount":0,"tax_details":[]},"fee_rates":{"platform_fee":15.5,"payment_fee":2}},"forward_shipping_details":[{"weight_details":{"dead_weight_source":"seller","seller_dead_weight":0.082,"profiler_dead_weight":0,"max_dead_weight":0,"length":35.18,"breadth":24.78,"height":0.5,"volumetric_weight":0.087,"chargeable_weight_type":"Volumetric","chargeable_weight_slab":"0.0-0.5"},"shipping_zone":"National","shipping_fee":0,"shipment_id":null}],"reverse_shipping_details":[],"pick_pack_shipping_details":[]}
    * 
    */

    /**
     * Storage Transaction
     * 
     * History
     * https://seller.flipkart.com/napi/payments/history?param=LSTKTAFAJE25HYHTG8ZNZZN4O&service_type=storage&state_code=IN-WB&sellerId=9ujbcnp6ky5ruzie
     * {"net_amount":-48.816,"transaction_history":[{"neft_id":"NFT-190503076GN00027XXXXXXX","settlement_date":"2019-05-03","net_amount":-10.502,"storage_details":[{"type":"Sellable Regular","units":8.9,"fee_amount":-8.9,"taxes":{"net_amount":-1.602,"tax_details":[{"fee_type":"Sellable Regular","net_tax_rule_value":18,"net_amount":-1.602,"tax_group":[{"tax_group":"GST","base_amount":-8.9,"net_amount":-1.602,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":-0.801,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":-0.801,"rule_name":"%","rule_value":9}]}]}]},"net_amount":-10.502}]},{"neft_id":"NFT-190405079GN00018XXXXXXX","settlement_date":"2019-04-05","net_amount":-18.372,"storage_details":[{"type":"Sellable Regular","units":15.57,"fee_amount":-15.57,"taxes":{"net_amount":-2.802,"tax_details":[{"fee_type":"Sellable Regular","net_tax_rule_value":18,"net_amount":-2.802,"tax_group":[{"tax_group":"GST","base_amount":-15.57,"net_amount":-2.802,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":-1.401,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":-1.401,"rule_name":"%","rule_value":9}]}]}]},"net_amount":-18.372}]},{"neft_id":"NFT-190403069GN00236XXXXXXX","settlement_date":"2019-04-03","net_amount":-16.602,"storage_details":[{"type":"Sellable Regular","units":14.07,"fee_amount":-14.07,"taxes":{"net_amount":-2.532,"tax_details":[{"fee_type":"Sellable Regular","net_tax_rule_value":18,"net_amount":-2.532,"tax_group":[{"tax_group":"GST","base_amount":-14.07,"net_amount":-2.532,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":-1.266,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":-1.266,"rule_name":"%","rule_value":9}]}]}]},"net_amount":-16.602}]},{"neft_id":"NFT-190206069GN00184XXXXXXX","settlement_date":"2019-02-06","net_amount":-3.34,"storage_details":[{"type":"Sellable Regular","units":2.83,"fee_amount":-2.83,"taxes":{"net_amount":-0.51,"tax_details":[{"fee_type":"Sellable Regular","net_tax_rule_value":18,"net_amount":-0.51,"tax_group":[{"tax_group":"GST","base_amount":-2.83,"net_amount":-0.51,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":-0.255,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":-0.255,"rule_name":"%","rule_value":9}]}]}]},"net_amount":-3.34}]}]}
     * 
     * Details
     * https://seller.flipkart.com/napi/payments/details?param=LSTKTAFAJE25HYHTG8ZNZZN4O&service_type=storage&state_code=IN-WB&sellerId=9ujbcnp6ky5ruzie
     * {"net_payable":-48.816,"storage_details":[{"type":"Sellable Regular","units":41.37,"fee_amount":-41.37,"taxes":{"net_amount":-7.446,"tax_details":[{"fee_type":"Sellable Regular","net_tax_rule_value":18,"net_amount":-7.446,"tax_group":[{"tax_group":"GST","base_amount":-41.37,"net_amount":-7.446,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":-3.723,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":-3.723,"rule_name":"%","rule_value":9}]}]}]},"net_amount":-48.816}],"weight_details":{"dead_weight_source":"N/A","seller_dead_weight":0.249,"profiler_dead_weight":0,"max_dead_weight":0,"length":20.984,"breadth":32.884,"height":1.4,"volumetric_weight":0.193,"chargeable_weight_type":null,"chargeable_weight_slab":null},"product_title":"Chichi Women Solid Straight Kurta","product_image":"http://img.fkcdn.com/image/100/100/jo0csy80/kurta/g/8/z/xl-k366-indi-chichi-original-imafag3fwhg2sksz.jpeg","sku":"K368-XXL"}
     * 
     * History
     * https://seller.flipkart.com/napi/payments/history?param=LSTKTAFAJD3UFPGAHFDPTMZB9&service_type=storage&state_code=IN-KA&sellerId=9ujbcnp6ky5ruzie
     * {"net_amount":-4.874,"transaction_history":[{"neft_id":"NFT-190503076GN00027XXXXXXX","settlement_date":"2019-05-03","net_amount":-1.216,"storage_details":[{"type":"Sellable Regular","units":1.03,"fee_amount":-1.03,"taxes":{"net_amount":-0.186,"tax_details":[{"fee_type":"Sellable Regular","net_tax_rule_value":18,"net_amount":-0.186,"tax_group":[{"tax_group":"GST","base_amount":-1.03,"net_amount":-0.186,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":-0.093,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":-0.093,"rule_name":"%","rule_value":9}]}]}]},"net_amount":-1.216}]},{"neft_id":"NFT-190405079GN00018XXXXXXX","settlement_date":"2019-04-05","net_amount":-3.658,"storage_details":[{"type":"Sellable Regular","units":3.1,"fee_amount":-3.1,"taxes":{"net_amount":-0.558,"tax_details":[{"fee_type":"Sellable Regular","net_tax_rule_value":18,"net_amount":-0.558,"tax_group":[{"tax_group":"GST","base_amount":-3.1,"net_amount":-0.558,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":-0.279,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":-0.279,"rule_name":"%","rule_value":9}]}]}]},"net_amount":-3.658}]}]}
     * 
     * Details
     * https://seller.flipkart.com/napi/payments/details?param=LSTKTAFAJD3UFPGAHFDPTMZB9&service_type=storage&state_code=IN-KA&sellerId=9ujbcnp6ky5ruzie
     * {"net_payable":-4.874,"storage_details":[{"type":"Sellable Regular","units":4.13,"fee_amount":-4.13,"taxes":{"net_amount":-0.744,"tax_details":[{"fee_type":"Sellable Regular","net_tax_rule_value":18,"net_amount":-0.744,"tax_group":[{"tax_group":"GST","base_amount":-4.13,"net_amount":-0.744,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"CGST","tax_value":-0.372,"rule_name":"%","rule_value":9},{"tax_type":"SGST","tax_value":-0.372,"rule_name":"%","rule_value":9}]}]}]},"net_amount":-4.874}],"weight_details":{"dead_weight_source":"N/A","seller_dead_weight":0.135,"profiler_dead_weight":0,"max_dead_weight":0,"length":37.084,"breadth":25.284,"height":1.139,"volumetric_weight":0.214,"chargeable_weight_type":null,"chargeable_weight_slab":null},"product_title":"Chichi Women Ikat Straight Kurta","product_image":"http://img.fkcdn.com/image/100/100/jtn9bww0/kurta/p/t/g/m-k364-indi-chichi-original-imafexxzz9bemcsy.jpeg","sku":"K364-XXL"}
     */

     /**
      * Ads Transactions
      * 
      * History
      * https://seller.flipkart.com/napi/payments/history?param=O2BRBYEU323Y&service_type=ads&sellerId=9ujbcnp6ky5ruzie
      * {"net_amount":0,"transaction_history":[{"neft_id":"NFT-190503076GN00027XXXXXXX","advice_id":"19613114","settlement_date":"2019-05-03","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-214.77,"taxes":{"net_amount":-38.66,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-38.66,"tax_group":[{"tax_group":"GST","base_amount":-214.78,"net_amount":-38.66,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-38.66,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-253.43},{"type":"Wallet Redeem Reversal","fee_amount":253.43,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":253.43}]},{"neft_id":"NFT-190429098GN00288XXXXXXX","advice_id":"19528587","settlement_date":"2019-04-29","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-211.6,"taxes":{"net_amount":-38.09,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-38.09,"tax_group":[{"tax_group":"GST","base_amount":-211.61,"net_amount":-38.09,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-38.09,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-249.69},{"type":"Wallet Redeem Reversal","fee_amount":249.69,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":249.69}]},{"neft_id":"NFT-190426076GN00142XXXXXXX","advice_id":"19479588","settlement_date":"2019-04-26","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-143.52,"taxes":{"net_amount":-25.83,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-25.83,"tax_group":[{"tax_group":"GST","base_amount":-143.5,"net_amount":-25.83,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-25.83,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-169.35},{"type":"Wallet Redeem Reversal","fee_amount":169.35,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":169.35}]},{"neft_id":"NFT-190424071GN00050XXXXXXX","advice_id":"19432537","settlement_date":"2019-04-24","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-153.64,"taxes":{"net_amount":-27.66,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-27.66,"tax_group":[{"tax_group":"GST","base_amount":-153.67,"net_amount":-27.66,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-27.66,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-181.3},{"type":"Wallet Redeem Reversal","fee_amount":181.3,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":181.3}]},{"neft_id":"NFT-190422087GN00049XXXXXXX","advice_id":"19383802","settlement_date":"2019-04-22","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-191.36,"taxes":{"net_amount":-34.44,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-34.44,"tax_group":[{"tax_group":"GST","base_amount":-191.33,"net_amount":-34.44,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-34.44,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-225.8},{"type":"Wallet Redeem Reversal","fee_amount":225.8,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":225.8}]},{"neft_id":"NFT-190420068GN00170XXXXXXX","advice_id":"19339438","settlement_date":"2019-04-19","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-81.88,"taxes":{"net_amount":-14.74,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-14.74,"tax_group":[{"tax_group":"GST","base_amount":-81.89,"net_amount":-14.74,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-14.74,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-96.62},{"type":"Wallet Redeem Reversal","fee_amount":96.62,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":96.62}]},{"neft_id":"NFT-190417068GN00159XXXXXXX","advice_id":"19293196","settlement_date":"2019-04-16","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-155.48,"taxes":{"net_amount":-27.99,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-27.99,"tax_group":[{"tax_group":"GST","base_amount":-155.5,"net_amount":-27.99,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-27.99,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-183.47},{"type":"Wallet Redeem Reversal","fee_amount":183.47,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":183.47}]},{"neft_id":"NFT-190415113GN00043XXXXXXX","advice_id":"19246077","settlement_date":"2019-04-14","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-227.24,"taxes":{"net_amount":-40.9,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-40.9,"tax_group":[{"tax_group":"GST","base_amount":-227.22,"net_amount":-40.9,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-40.9,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-268.14},{"type":"Wallet Redeem Reversal","fee_amount":268.14,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":268.14}]},{"neft_id":"NFT-190412071GN00007XXXXXXX","advice_id":"19198238","settlement_date":"2019-04-11","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-158.24,"taxes":{"net_amount":-28.49,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-28.49,"tax_group":[{"tax_group":"GST","base_amount":-158.28,"net_amount":-28.49,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-28.49,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-186.73},{"type":"Wallet Redeem Reversal","fee_amount":186.73,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":186.73}]},{"neft_id":"NFT-190410073GN00201XXXXXXX","advice_id":"19149783","settlement_date":"2019-04-09","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-154.56,"taxes":{"net_amount":-27.82,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-27.82,"tax_group":[{"tax_group":"GST","base_amount":-154.56,"net_amount":-27.82,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-27.82,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-182.38},{"type":"Wallet Redeem Reversal","fee_amount":182.38,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":182.38}]},{"neft_id":"NFT-190408093GN00181XXXXXXX","advice_id":"19109788","settlement_date":"2019-04-08","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-224.48,"taxes":{"net_amount":-40.4,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-40.4,"tax_group":[{"tax_group":"GST","base_amount":-224.44,"net_amount":-40.4,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-40.4,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-264.88},{"type":"Wallet Redeem Reversal","fee_amount":264.88,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":264.88}]},{"neft_id":"NFT-190405079GN00018XXXXXXX","advice_id":"19062997","settlement_date":"2019-04-05","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-156.4,"taxes":{"net_amount":-28.15,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-28.15,"tax_group":[{"tax_group":"GST","base_amount":-156.39,"net_amount":-28.15,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-28.15,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-184.55},{"type":"Wallet Redeem Reversal","fee_amount":184.55,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":184.55}]},{"neft_id":"NFT-190403069GN00236XXXXXXX","advice_id":"19016560","settlement_date":"2019-04-03","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-154.56,"taxes":{"net_amount":-27.82,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-27.82,"tax_group":[{"tax_group":"GST","base_amount":-154.56,"net_amount":-27.82,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-27.82,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-182.38},{"type":"Wallet Redeem Reversal","fee_amount":182.38,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":182.38}]},{"neft_id":"NFT-190402077GN00184XXXXXXX","advice_id":"18973255","settlement_date":"2019-04-01","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-232.76,"taxes":{"net_amount":-41.9,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-41.9,"tax_group":[{"tax_group":"GST","base_amount":-232.78,"net_amount":-41.9,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-41.9,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-274.66},{"type":"Wallet Redeem Reversal","fee_amount":274.66,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":274.66}]},{"neft_id":"NFT-190329095GN00051XXXXXXX","advice_id":"18925985","settlement_date":"2019-03-29","net_amount":0,"transaction_details":[{"type":"Wallet Redeem","fee_amount":-81.88,"taxes":{"net_amount":-14.74,"tax_details":[{"fee_type":"Wallet Redeem","net_tax_rule_value":18,"net_amount":-14.74,"tax_group":[{"tax_group":"GST","base_amount":-81.89,"net_amount":-14.74,"net_tax_rule_value":18,"tax_detail":[{"tax_type":"IGST","tax_value":-14.74,"rule_name":"%","rule_value":18}]}]}]},"net_amount":-96.62},{"type":"Wallet Redeem Reversal","fee_amount":96.62,"taxes":{"net_amount":0,"tax_details":[]},"net_amount":96.62}]}]}
      * 
      * Details
      * https://seller.flipkart.com/napi/payments/details?param=O2BRBYEU323Y&ignoreZulu=true&service_type=ads&sellerId=9ujbcnp6ky5ruzie
      * {"campaign_name":"Clone of K257","status":"COMPLETED","remaining_budget":2542.37,"start_date":"Mon Mar 25 00:00:00 IST 2019","end_date":"Tue Apr 30 00:00:00 IST 2019"}
      * 
      * History
      * https://seller.flipkart.com/napi/payments/history?param=O2BRBYEU323Y&service_type=ads&sellerId=9ujbcnp6ky5ruzie
     */



     /*

        Building as FT and streams for fetching flipkart transactions
     */
    const ft = new FunctionTree({});
    // const devtools = new Devtools({
    //   host: 'localhost:8808',
    //   reconnect: true,
    //   https: false
    // });

    // devtools.add(ft);

    const curlRequest$ = (header, url) =>  ObservableFrom(new Promise((res, rej) => {
      new Curl()
        .setHeaders(header)
        .get(url)
        .then(({ statusCode, body, headers }) => {
          // console.log(statusCode);
          // console.log(url);
          // console.log(JSON.parse(body));
          if (statusCode === 200) {
            res(JSON.parse(body));
          }
        })
        .catch(e => {
          console.log('Caught Error');
          rej(e);
        });
    }));

    const aggregatedAmountUrl = ({ props: { getAllTransactionAggregatedAmount, pageType, type, startDate, endDate, sellerId }}) => ({
      url: `${getAllTransactionAggregatedAmount}?start_date=${startDate}&end_date=${endDate}&pageType=${pageType}&type=${type}&sellerId=${sellerId}`
    });

    const allTransactionUrl = ({ props: { getAllTransactions, pageType, type, startDate, endDate, sellerId }}) => ({
      url: `${getAllTransactions}?offset=8&start_date=${startDate}&end_date=${endDate}&pageType=${pageType}&type=${type}&sellerId=${sellerId}`
    });

    const nextTokenUrl = (response, url) => {
      if (response.result.is_next) {
        var arr = url.split('?');
        arr.splice(1, 0, `?token=${response.result.token}&`);
        return arr.join('');
      }
      return null;
    }

    const allTransactions$ = ({ props: { header, url } }) => new Promise((resolve, reject) => {
      const get$ = (rqstUrl) => curlRequest$(header, rqstUrl).pipe(
        map(res => ({
          transactions: res.result.transactions,
          next: nextTokenUrl(res, url)
        }))
      )

      const allRqst$ = get$(url).pipe(
        expand(({ next }) => next ? get$(next).pipe(delay(1000)) : ObservableEmpty()),
        concatMap(({ transactions }) => transactions),
        catchError(console.log),
        tap(console.log),
        // toArray()
      );

      resolve({ allRqst$ });
    });

    // const previousPaymentUrl = ({ header, previousPayment, sellerId, startDate, endDate, token }) => token ?
    //   `${previousPayment}&startDate=${startDate}&endDate=${endDate}&sellerId=${sellerId}` :
    //   `${previousPayment}&token=${token}&startDate=${startDate}&endDate=${endDate}&sellerId=${sellerId}`

    const aggregatedAmountRequest$ = ({ props: { header, url }}) => ({ aggregatedAmountRequest$: curlRequest$(header, url) });

    const getUrl = ({ transaction, url, param, service_type, sellerId }) => {
      switch(param) {
        case 'listing_id':
          return `${url}?param=${transaction[param]}&service_type=${service_type}&state_code=${transaction.state_code}&sellerId=${sellerId}`;
        default:
          return `${url}?param=${transaction[param]}&service_type=${service_type}&sellerId=${sellerId}`;
      }
    }

    const allTransactionDetail$ = ({ props: { allRqst$, header, details, history, sellerId, param, service_type }}) => new Promise((resolve, reject) => {
      var allTransactionRqst$ = allRqst$.pipe(
        mergeMap(transaction => transaction.is_clickable ? ObservableForkJoin({
          basic: Promise.resolve(transaction),
          details: curlRequest$(header, getUrl({ transaction, param, service_type, sellerId, url: details })),
          history: curlRequest$(header, getUrl({ transaction, param, service_type, sellerId, url: history }))
        }) : ObservableForkJoin({
          basic: Promise.resolve(transaction)
        })),
        // tap(console.log),
        toArray(),
        catchError(console.log)
      );
      // Converting Results toArray
      // rqst$.pipe(toArray()).subscribe(transactions => {
      //   resolve({ transactions });
      // });

      // rqst$.subscribe(console.log);
      // resolve({ transactions: 'done' });
      resolve({ allTransactionRqst$ });
    });

    const aggregatedAmountSequence = sequence('Aggregated Amount', [
      aggregatedAmountUrl,
      aggregatedAmountRequest$,
    ]);

    const allTransactionSequence = sequence('All Transaction', [
      allTransactionUrl,
      allTransactions$,
      allTransactionDetail$,
    ]);

    /**
     * Order Transactions
     */

    const orderTransactionParams = () => {
      return { pageType: 'allTransaction', type: 'order_item_transactions', param: 'order_item_id', service_type: 'orderItem' }
    };
    
    const orderTransactions = sequence('Fetching Order Transactions', [
      orderTransactionParams,
      parallel([
        aggregatedAmountSequence,
        allTransactionSequence
      ]),
      ({ props: { aggregatedAmountRequest$, allTransactionRqst$ }}) => {
        var orderTransaction$ = ObservableForkJoin({
          aggregatedAmount: aggregatedAmountRequest$,
          allTransactions: allTransactionRqst$
        });

        // orderTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { orderTransaction$ };
      }
    ]);

    /**
     * Storage & Recall Transactions
     */
    const storageRecallTransactionParams = () => {
      return { pageType: 'allTransaction', type: 'storage_recall_transactions', param: 'listing_id', service_type: 'storage' }
    };


    const storageRecallTransactions = sequence('Fetching Storage Transactions', [
      storageRecallTransactionParams,
      parallel([
        aggregatedAmountSequence,
        allTransactionSequence
      ]),
      ({ props: { aggregatedAmountRequest$, allTransactionRqst$ }}) => {
        var storageTransaction$ = ObservableForkJoin({
          aggregatedAmount: aggregatedAmountRequest$,
          allTransactions: allTransactionRqst$
        });

        // storageTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { storageTransaction$ };
      }
    ]);

    /**
     * Non Order SPF Transactions
     */
    const spfTransactionParams = () => {
      return { pageType: 'allTransaction', type: 'spf_transactions' };
    }

    const spfTransactions = sequence('Fetching Non Order SPF Transactions', [
      spfTransactionParams,
      parallel([
        aggregatedAmountSequence,
        allTransactionSequence
      ]),
      ({ props: { aggregatedAmountRequest$, allTransactionRqst$ }}) => {
        var spfTransaction$ = ObservableForkJoin({
          aggregatedAmount: aggregatedAmountRequest$,
          allTransactions: allTransactionRqst$
        });

        // spfTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { spfTransaction$ };
      }
    ]);

    /**
     *  TDS Tranasctions
     */
    const tdsTransactionParams = () => {
      return { pageType: 'allTransaction', type: 'tds_transactions' };
    }

    const tdsTransactions = sequence('Fetching TDS Transactions', [
      tdsTransactionParams,
      parallel([
        aggregatedAmountSequence,
        allTransactionSequence
      ]),
      ({ props: { aggregatedAmountRequest$, allTransactionRqst$ }}) => {
        var tdsTransaction$ = ObservableForkJoin({
          aggregatedAmount: aggregatedAmountRequest$,
          allTransactions: allTransactionRqst$
        });

        // tdsTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { tdsTransaction$ };
      }
    ]);
    
    /**
     *  Ads Transactions
     */
    const adsTransactionParams = () => {
      return { pageType: 'allTransaction', type: 'ads_transactions', param: 'txn_id', service_type: 'ads' }
    };


    const adsTransactions = sequence('Fetching Ads Transactions', [
      adsTransactionParams,
      parallel([
        aggregatedAmountSequence,
        allTransactionSequence
      ]),
      ({ props: { aggregatedAmountRequest$, allTransactionRqst$ }}) => {
        var adsTransaction$ = ObservableForkJoin({
          aggregatedAmount: aggregatedAmountRequest$,
          allTransactions: allTransactionRqst$
        });

        // storageTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { adsTransaction$ };
      }
    ]);

    /**
     *  TDS Tranasctions
     */
    const tcsTransactionParams = () => {
      return { pageType: 'allTransaction', type: 'tcs_transactions' };
    }

    const tcsTransactions = sequence('Fetching TCS Transactions', [
      tcsTransactionParams,
      parallel([
        aggregatedAmountSequence,
        allTransactionSequence
      ]),
      ({ props: { aggregatedAmountRequest$, allTransactionRqst$ }}) => {
        var tcsTransaction$ = ObservableForkJoin({
          aggregatedAmount: aggregatedAmountRequest$,
          allTransactions: allTransactionRqst$
        });

        // tcsTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { tcsTransaction$ };
      }
    ]);
    
    /** All Transactions*/
    // ft.run([
    //   parallel([
    //     orderTransactions,
    //     storageRecallTransactions,
    //     spfTransactions,
    //     tdsTransactions,
    //     adsTransactions,
    //     tcsTransactions
    //   ]),
    //   ({ props: { orderTransaction$, storageTransaction$, spfTransaction$, tdsTransaction$, adsTransaction$, tcsTransaction$ }}) => {
    //     const allTransaction$ = ObservableForkJoin({
    //       order: orderTransaction$,
    //       storage: storageTransaction$,
    //       spf: spfTransaction$,
    //       tds: tdsTransaction$,
    //       ads: adsTransaction$,
    //       tcs: tcsTransaction$
    //     });

    //     // allTransaction$.pipe(catchError(console.log)).subscribe(console.log);
    //   }
    // ], {
    //   header: [
    //     'Pragma: no-cache',
    //     'DNT: 1',
    //     // 'Accept-Encoding: gzip, deflate, br',
    //     'Accept-Language: en-US,en;q=0.9,mr;q=0.8',
    //     'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
    //     'Accept: application/json, text/javascript, */*; q=0.01',
    //     'Cache-Control: no-cache',
    //     'X-Requested-With: XMLHttpRequest',
    //     'Cookie: s_ch_list=%5B%5B%27Internal%2520Originated%27%2C%271488954573683%27%5D%5D; _mkto_trk=id:021-QVV-957&token:_mch-flipkart.com-1495949869629-70928; _ga=GA1.2.2038854975.1495909297; T=TI148890318637053625093466435150917475437830390952355761756530507217; AMCVS_17EB401053DAF4840A490D4C%40AdobeOrg=1; s_cc=true; AMCV_17EB401053DAF4840A490D4C%40AdobeOrg=-227196251%7CMCIDTS%7C18043%7CMCMID%7C37080542162887526766253199795737714834%7CMCAAMLH-1558939319%7C12%7CMCAAMB-1559474573%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCOPTOUT-1558876973s%7CNONE%7CMCAID%7CNONE; AMCVS_55CFEDA0570C3FA17F000101%40AdobeOrg=1; __utmc=143439159; __utmz=143439159.1558869795.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); sellerId=9ujbcnp6ky5ruzie; _gid=GA1.2.1161172798.1558869828; S=d1t18P05bVT8/P1pWPyt+P0w/P6RrOOhZXNDmV3flEXDD3/SjTalTyX85T1/ghUp6FjxKZv/ifWwx7x7quWmQ8ZOGZw==; SN=2.VI2D21A0104CF94D9AB0835AE69883E6BF.SI2A846B995A7945F890ADBD569E1EB237.VSB1DCBB3CBCEC47ACB48C0E20B047CBDE.1558871023; connect.sid=s%3A5kgIVzcwOA7hnf_YvG3SrfbIP3mQHHB-.ZLfMJnJyG6%2FuJsd4FypwFrh2gHLTQuLqxFgrDml8Nyg; __utma=143439159.2038854975.1495909297.1558869795.1558871079.2; is_login=true; AMCV_55CFEDA0570C3FA17F000101%40AdobeOrg=-227196251%7CMCIDTS%7C18043%7CMCMID%7C11305740583582521872941987069957610473%7CMCOPTOUT-1558941981s%7CNONE%7CMCAID%7CNONE; _gat=1; s_ppvl=seller%253A%2520home%2520page%2C100%2C100%2C1000%2C847%2C998%2C1920%2C1080%2C0.8%2CL; s_ppv=seller%253A%2520payments%2520%257C%2520transactions%2C100%2C100%2C998%2C1043%2C998%2C1920%2C1080%2C0.8%2CP; s_nr=1558935916729-Repeat; s_ppn=no%20value; s_sq=flipkart-prd%3D%2526pid%253DHomePage%2526pidt%253D1%2526oid%253Dfunction%252528%252529%25257B%25257D%2526oidt%253D2%2526ot%253DDIV',
    //     'Connection: keep-alive',
    //     'Referer: https://seller.flipkart.com/sw.js',
    //     'fk-csrf-token: C6ed4qGh-iRJXE-besPQs8yMeJIPWD_Zrs8w'
    //   ],
    //   previousPayment: 'https://seller.flipkart.com/napi/payments/fetchPreviousPayments?offset=8&filter=filter&type=MONTHLY_VIEW',
    //   getAllTransactionAggregatedAmount: 'https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount',
    //   getAllTransactions: 'https://seller.flipkart.com/napi/payments/getAllTransactions',
    //   details: 'https://seller.flipkart.com/napi/payments/details',
    //   history: 'https://seller.flipkart.com/napi/payments/history',
    //   startDate: '2019-05-01',
    //   endDate: '2019-05-30',
    //   sellerId: '9ujbcnp6ky5ruzie'
    // });

    // devtools.remove(ft);

/** NEFT BASED TRANSACTIONS */

const fetchPreviousTransactions = ({ header, startDate, endDate, sellerId }) => {

  const previousPaymentURL = 'https://seller.flipkart.com/napi/payments/fetchPreviousPayments?offset=8&filter=filter&type=MONTHLY_VIEW';
  const transactionAggregatedAmount = 'https://seller.flipkart.com/napi/payments/getTransactionAggregatedAmount';
  const transactionHistoryURL = 'https://seller.flipkart.com/napi/payments/getHistory?offset=8';
  const detailsURL = 'https://seller.flipkart.com/napi/payments/details';
  const historyURL = 'https://seller.flipkart.com/napi/payments/history';

  const paymentAggregatedAmountUrl = ({ payment, type, sellerId }) =>
  `${transactionAggregatedAmount}?transactionType=${payment.settlement_type.toLowerCase()}&adviceId=${payment.advice_id}&pageType=otherTransaction&type=${type}&sellerId=${sellerId}`

  const nextPayementTokenUrl = ({ response, url, sellerId, startDate, endDate }) => {
    if (response.show_more) {
      return `${url}&token=${response.token}&startDate=${startDate}&endDate=${endDate}&sellerId=${sellerId}`
    }
    return null;
  }
  const getPayment$ = (rqstHeader, rqstUrl) => curlRequest$(rqstHeader, rqstUrl).pipe(
    map(response => ({
      data: response.data,
      next: nextPayementTokenUrl({ response, url: previousPaymentURL, sellerId, startDate, endDate })
    }))
  );

  const paymentRqst$ = getPayment$(header, `${previousPaymentURL}&startDate=${startDate}&endDate=${endDate}&sellerId=${sellerId}`).pipe(
    expand(({ next }) => next ? getPayment$(header, next).pipe(delay(1000)) : ObservableEmpty()),
    concatMap(({ data }) => data),
    catchError(console.log),
  );

  const nextPayementHistoryTokenUrl = ({ response, url, sellerId, payment, type }) => {
    if (response.result.is_next) {
      return `${url}&token=${response.result.token}&pageNo=${response.result.token}&transactionType=${payment.settlement_type.toLowerCase()}&adviceId=${payment.advice_id}&type=${type}&sellerId=${sellerId}`
    }
    return null;
  }

  const getPaymentHistory$ = (rqstHeader, rqstUrl, payment, type) => curlRequest$(rqstHeader, rqstUrl).pipe(
    // tap(res => {
    //   console.log(rqstUrl);
    //   console.log(res);
    // }),
    map(response => {
      if (response.result) {
        return ({
          transactions: response.result.transactions,
          next: nextPayementHistoryTokenUrl({ response, url: transactionHistoryURL, sellerId, payment, type })
        });
      } else {
        throw new Error('Error!');
      }
    }),
    retryWhen(err => err.pipe(delay(1000), take(3)))
  );

  const paymentHistoryRqst$ = (payment, type) => getPaymentHistory$(header, `${transactionHistoryURL}&transactionType=${payment.settlement_type.toLowerCase()}&adviceId=${payment.advice_id}&type=${type}&sellerId=${sellerId}`, payment, type).pipe(
    expand(({ next }) => next ? getPaymentHistory$(header, next, payment, type).pipe(delay(1000)) : ObservableEmpty()),
    concatMap(({ transactions }) => transactions),
    // toArray(),
    // tap(console.log),
    catchError(console.log),
  );

  const getTransactionsHistoryDetails$ = (payment, type, param, service_type) => paymentHistoryRqst$(payment, type).pipe(
    mergeMap(transaction => transaction.is_clickable ? ObservableForkJoin({
      basic: Promise.resolve(transaction),
      details: curlRequest$(header, getUrl({ transaction, param, service_type, sellerId, url: detailsURL })),
      history: curlRequest$(header, getUrl({ transaction, param, service_type, sellerId, url: historyURL }))
    }) : ObservableForkJoin({
      basic: Promise.resolve(transaction)
    })),
    // tap(console.log),
    toArray(),
    catchError(console.log)
  );
  
  const transactionRqst$ = paymentRqst$.pipe(
    mergeMap(payment => ObservableForkJoin({
      payment: Promise.resolve(payment),
      order: ObservableForkJoin({
        aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'order_item_transactions' })),
        transactions: getTransactionsHistoryDetails$(payment, 'order_item_transactions', 'order_item_id', 'orderItem' )
      }),
      storage: ObservableForkJoin({
        aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'storage_recall_transactions' })),
        transactions: getTransactionsHistoryDetails$(payment, 'storage_recall_transactions', 'listing_id', 'storage' )
      }),
      spf: ObservableForkJoin({
        aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'spf_transactions' })),
        transactions: getTransactionsHistoryDetails$(payment, 'spf_transactions')
      }),
      tds: ObservableForkJoin({
        aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'tds_transactions' })),
        transactions: getTransactionsHistoryDetails$(payment, 'tds_transactions')
      }),
      ads: ObservableForkJoin({
        aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'ads_transactions' })),
        transactions: paymentHistoryRqst$(payment, 'ads_transactions', 'txn_id', 'ads')
      }),
      tcs: ObservableForkJoin({
        aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'tcs_transactions' })),
        transactions: getTransactionsHistoryDetails$(payment, 'tcs_transactions')
      })
    }))
  );

  // const getPaymentHistory$ = (rqstHeader, rqstUrl) => curlRequest$(rqstHeader, rqstUrl).pipe(
  //   map(response => ({
  //     result: response.result,
  //     next: nextPayementTokenUrl({ response, previousPayment, sellerId, startDate, endDate })
  //   }))
  // );
  
  // const transactionRqst$ = paymentRqst$.pipe(
  //   mergeMap(payment => ObservableForkJoin({
  //     payment: Promise.resolve(payment),
  //     order: ObservableForkJoin({
  //       aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'order_item_transactions' })),
  //     }),
  //     storage: ObservableForkJoin({
  //       aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'storage_recall_transactions' })),
  //     }),
  //     spf: ObservableForkJoin({
  //       aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'spf_transactions' })),
  //     }),
  //     tds: ObservableForkJoin({
  //       aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'tds_transactions' })),
  //     }),
  //     ads: ObservableForkJoin({
  //       aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'ads_transactions' })),
  //     }),
  //     tcs: ObservableForkJoin({
  //       aggregatedAmount: curlRequest$(header, paymentAggregatedAmountUrl({ payment, sellerId, type: 'tcs_transactions' })),
  //     })
  //   }))
  // );

  transactionRqst$.subscribe(transactions => {
    const jsonContent = JSON.stringify(transactions);
    fs.writeFile('transactions.json', jsonContent, 'utf8', function (err) {
      if (err) {
        console.log('Error while writing JSON file');
      }
      console.log('DONE file saved');
    })
  });
  // const ur = 'https://seller.flipkart.com/napi/payments/getTransactionAggregatedAmount?transactionType=prepaid&adviceId=20094805&pageType=otherTransaction&type=order_item_transactions&sellerId=9ujbcnp6ky5ruzie';
  // const ur = 'https://seller.flipkart.com/napi/payments/getHistory?offset=8&token=135&pageNo=135&transactionType=prepaid&adviceId=19945102&type=order_item_transactions&sellerId=9ujbcnp6ky5ruzie';
  // curlRequest$(header, ur)
  //   .subscribe(console.log)
}

fetchPreviousTransactions({
  header: [
    'Pragma: no-cache',
    'DNT: 1',
    // 'Accept-Encoding: gzip, deflate, br',
    'Accept-Language: en-US,en;q=0.9,mr;q=0.8',
    'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
    'Accept: application/json, text/javascript, */*; q=0.01',
    'Cache-Control: no-cache',
    'X-Requested-With: XMLHttpRequest',
    'Cookie: s_ch_list=%5B%5B%27Internal%2520Originated%27%2C%271488954573683%27%5D%5D; _mkto_trk=id:021-QVV-957&token:_mch-flipkart.com-1495949869629-70928; _ga=GA1.2.2038854975.1495909297; T=TI148890318637053625093466435150917475437830390952355761756530507217; AMCVS_17EB401053DAF4840A490D4C%40AdobeOrg=1; s_cc=true; AMCV_17EB401053DAF4840A490D4C%40AdobeOrg=-227196251%7CMCIDTS%7C18043%7CMCMID%7C37080542162887526766253199795737714834%7CMCAAMLH-1558939319%7C12%7CMCAAMB-1559474573%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCOPTOUT-1558876973s%7CNONE%7CMCAID%7CNONE; AMCVS_55CFEDA0570C3FA17F000101%40AdobeOrg=1; __utmc=143439159; __utmz=143439159.1558869795.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); sellerId=9ujbcnp6ky5ruzie; _gid=GA1.2.1161172798.1558869828; S=d1t18P05bVT8/P1pWPyt+P0w/P6RrOOhZXNDmV3flEXDD3/SjTalTyX85T1/ghUp6FjxKZv/ifWwx7x7quWmQ8ZOGZw==; SN=2.VI2D21A0104CF94D9AB0835AE69883E6BF.SI2A846B995A7945F890ADBD569E1EB237.VSB1DCBB3CBCEC47ACB48C0E20B047CBDE.1558871023; connect.sid=s%3A5kgIVzcwOA7hnf_YvG3SrfbIP3mQHHB-.ZLfMJnJyG6%2FuJsd4FypwFrh2gHLTQuLqxFgrDml8Nyg; __utma=143439159.2038854975.1495909297.1558869795.1558871079.2; is_login=true; AMCV_55CFEDA0570C3FA17F000101%40AdobeOrg=-227196251%7CMCIDTS%7C18043%7CMCMID%7C11305740583582521872941987069957610473%7CMCOPTOUT-1558941981s%7CNONE%7CMCAID%7CNONE; _gat=1; s_ppvl=seller%253A%2520home%2520page%2C100%2C100%2C1000%2C847%2C998%2C1920%2C1080%2C0.8%2CL; s_ppv=seller%253A%2520payments%2520%257C%2520transactions%2C100%2C100%2C998%2C1043%2C998%2C1920%2C1080%2C0.8%2CP; s_nr=1558935916729-Repeat; s_ppn=no%20value; s_sq=flipkart-prd%3D%2526pid%253DHomePage%2526pidt%253D1%2526oid%253Dfunction%252528%252529%25257B%25257D%2526oidt%253D2%2526ot%253DDIV',
    'Connection: keep-alive',
    'Referer: https://seller.flipkart.com/sw.js',
    'fk-csrf-token: C6ed4qGh-iRJXE-besPQs8yMeJIPWD_Zrs8w'
  ],
  startDate: '2019-05-01',
  endDate: '2019-05-30',
  sellerId: '9ujbcnp6ky5ruzie'
})