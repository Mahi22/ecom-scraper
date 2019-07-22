const FT = require('function-tree');
const fs = require('fs');
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
// const retryWhen = Operators.retryWhen;
// const take = Operators.take;


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

    // const allTransactionUrl = ({ props: { getHistory, pageType, type, startDate, endDate, sellerId }}) => ({
    //   url: `${getHistory}?offset=8&start_date=${startDate}&end_date=${endDate}&pageType=${pageType}&type=${type}&sellerId=${sellerId}`
    // });

    const allTransactionUrl = ({ props: { getHistory, pageType, type, startDate, endDate, sellerId, settlementStatus }}) => ({
      url: `${getHistory}?offset=8&start_date=${startDate}&end_date=${endDate}&pageType=${pageType}&type=${type}&settlementStatus=${settlementStatus}&sellerId=${sellerId}`
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
        map(res => {
          console.log('**********RES***********', res)
          return {
          transactions: res.result.transactions,
          next: nextTokenUrl(res, url)
        }})
      )

      const allRqst$ = get$(url).pipe(
        expand(({ next }) => next ? get$(next).pipe(delay(1000)) : ObservableEmpty()),
        concatMap(({ transactions }) => transactions),
        catchError(console.log),
        // tap(console.log),
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
      allTransactionSequence,
      ({ props: { allTransactionRqst$ }}) => {
        return { orderTransaction$: allTransactionRqst$ };
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
      allTransactionSequence,
      ({ props: { allTransactionRqst$ }}) => {
        // storageTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { storageTransaction$: allTransactionRqst$ };
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
      allTransactionSequence,
      ({ props: { allTransactionRqst$ }}) => {
        // spfTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { spfTransaction$: allTransactionRqst$ };
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
      allTransactionSequence,
      ({ props: { allTransactionRqst$ }}) => {
        // tdsTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { tdsTransaction$: allTransactionRqst$ };
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
      allTransactionSequence,
      ({ props: { allTransactionRqst$ }}) => {
        // storageTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { adsTransaction$: allTransactionRqst$ };
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
      allTransactionSequence,
      ({ props: { allTransactionRqst$ }}) => {
        // tcsTransaction$.pipe(catchError(console.log)).subscribe(console.log);
        // console.log('done');
        return { tcsTransaction$: allTransactionRqst$ };
      }
    ]);
    
    /** All Transactions*/
    ft.run([
      parallel([
        orderTransactions
        // storageRecallTransactions,
        // spfTransactions,
        // tdsTransactions,
        // adsTransactions,
        // tcsTransactions
      ]),
      ({ props: { orderTransaction$, storageTransaction$, spfTransaction$, tdsTransaction$, adsTransaction$, tcsTransaction$ }}) => {
        const allTransaction$ = ObservableForkJoin({
          order: orderTransaction$
          // storage: storageTransaction$,
          // spf: spfTransaction$,
          // tds: tdsTransaction$,
          // ads: adsTransaction$,
          // tcs: tcsTransaction$
        });

        allTransaction$.pipe(catchError(console.log)).subscribe(result => {
          fs.writeFileSync('result.json', JSON.stringify(result), 'utf-8');
          console.log('DONE');
        });
      }
    ], {
      header: [
        'Pragma: no-cache',
        'DNT: 1',
        // 'Accept-Encoding: gzip, deflate, br',
        'Accept-Language: en-US,en;q=0.9,mr;q=0.8',
        'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
        'Accept: application/json, text/javascript, */*; q=0.01',
        'Cache-Control: no-cache',
        'X-Requested-With: XMLHttpRequest',
        'Cookie: _ga=GA1.2.1768181471.1559647536; T=SD.afb2807a-33dd-413e-8d46-aed6cc0b3ced.1559647537635; _fbp=fb.1.1559808482448.577564355; __utmz=143439159.1561186980.15.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); SESSf99cb25c7da4f47834c72b3d08d63a07=NsxT1U67KgFtsQHUD6LEpzS6Co2yWJLwe0K85JcBgkU; SESSd398554aa9ae933f1721372fd96620fd=mmNPPnnTHgA9b5hzwUD3dbKmWpl032gGtTbeogBZAMA; AMCVS_55CFEDA0570C3FA17F000101%40AdobeOrg=1; __utmc=143439159; s_cc=true; sellerId=e44shdrgmd6d0ueh; AMCVS_17EB401053DAF4840A490D4C%40AdobeOrg=1; AMCV_17EB401053DAF4840A490D4C%40AdobeOrg=-227196251%7CMCIDTS%7C18096%7CMCMID%7C20383864415458163401998425904631043573%7CMCAAMLH-1563520835%7C12%7CMCAAMB-1564039528%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1563441928s%7CNONE%7CMCAID%7CNONE; _gid=GA1.2.1359658662.1563437718; SN=2.VI887BFFB37D954E3FA0FF74C8B1B199A6.SI24286B0D2BA74E328D2737752CA86A00.VS7C3BE74F16A3456E9984499A22CD793C.1563452950; S=d1t15fjxjPy0/Pzw/PwsuPxs/P/5Mey3KZ76eRZTykCRVghRG65kIaXu79Zz2kG16J97ZxOXEZs9clSX+ulf4MrpP/w==; _gat=1; connect.sid=s%3Aw1PEdMQXcl-Usl5jO9rGGnWYQPf-_0EK.P7XNRnUkH013CShMMiXg4yq2Dy2etCgHGi%2F9cjPrxxs; __utma=143439159.1768181471.1559647536.1563257376.1563469343.43; __utmt=1; __utmb=143439159.4.9.1563469358631; is_login=true; s_ppn=seller%3A%20home%20page; s_ppvl=seller%253A%2520home%2520page%2C100%2C100%2C723%2C1440%2C723%2C1440%2C900%2C2%2CP; s_ppv=seller%253A%2520home%2520page%2C100%2C100%2C723%2C845%2C723%2C1440%2C900%2C2%2CP; s_nr=1563469370100-Repeat; s_sq=flipkartsellerprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dhttps%25253A%25252F%25252Fseller.flipkart.com%25252Findex.html%252523dashboard%25252Fpayments%25252Ftransactions%25253Ffilter%25253Dfilter%252526startDate%25253Dstart%252526endDate%25253Dend%2526link%253DTransactions%2526region%253DPayments%2526.activitymap%2526.a%2526.c; AMCV_55CFEDA0570C3FA17F000101%40AdobeOrg=-227196251%7CMCIDTS%7C18096%7CMCMID%7C74105635424132975823929931228517081500%7CMCOPTOUT-1563476570s%7CNONE%7CMCAID%7CNONE',
        'Referer: https://seller.flipkart.com/sw.js',
        'fk-csrf-token: igWrvpp5-JL9FFddwpPEeBkzKLgMuNlRnZyk'
      ],
      previousPayment: 'https://seller.flipkart.com/napi/payments/fetchPreviousPayments?offset=8&filter=filter&type=MONTHLY_VIEW',
      getAllTransactionAggregatedAmount: 'https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount',
      getAllTransactions: 'https://seller.flipkart.com/napi/payments/getAllTransactions',
      details: 'https://seller.flipkart.com/napi/payments/details',
      history: 'https://seller.flipkart.com/napi/payments/history',
      getHistory: 'https://seller.flipkart.com/napi/payments/getHistory',
      startDate: '2019-07-01',
      endDate: '2019-07-18',
      sellerId: 'e44shdrgmd6d0ueh',
      settlementStatus: 'settled'
    });

    // devtools.remove(ft);

