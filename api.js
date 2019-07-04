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

    const allTransactionUrl = ({ props: { getHistory, pageType, type, startDate, endDate, sellerId }}) => ({
      url: `${getHistory}?offset=8&start_date=${startDate}&end_date=${endDate}&pageType=${pageType}&type=${type}&sellerId=${sellerId}`
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
        // tap(console.log),
        toArray()
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
        orderTransactions,
        storageRecallTransactions,
        spfTransactions,
        tdsTransactions,
        adsTransactions,
        tcsTransactions
      ]),
      ({ props: { orderTransaction$, storageTransaction$, spfTransaction$, tdsTransaction$, adsTransaction$, tcsTransaction$ }}) => {
        const allTransaction$ = ObservableForkJoin({
          order: orderTransaction$,
          storage: storageTransaction$,
          spf: spfTransaction$,
          tds: tdsTransaction$,
          ads: adsTransaction$,
          tcs: tcsTransaction$
        });

        allTransaction$.pipe(catchError(console.log)).subscribe(console.log);
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
        'Cookie: s_ch_list=%5B%5B%27Internal%2520Originated%27%2C%271488954573683%27%5D%5D; _mkto_trk=id:021-QVV-957&token:_mch-flipkart.com-1495949869629-70928; _ga=GA1.2.2038854975.1495909297; T=TI148890318637053625093466435150917475437830390952355761756530507217; __utmz=143439159.1558869795.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); connect.sid=s%3ApYDh3nzLi_kI0muIt1ZfRplO0GAcrL6U.I9MqGrHTlaavOekVxS%2FqMqyrQs5fgXPQ%2FCczqiHcagA; AMCVS_55CFEDA0570C3FA17F000101%40AdobeOrg=1; __utmc=143439159; __utma=143439159.2038854975.1495909297.1562153628.1562153628.7; sellerId=9ujbcnp6ky5ruzie; is_login=true; s_cc=true; _gid=GA1.2.1852333366.1562169537; SN=2.VI2D21A0104CF94D9AB0835AE69883E6BF.SI2A846B995A7945F890ADBD569E1EB237.VSB1DCBB3CBCEC47ACB48C0E20B047CBDE.1562230358; AMCVS_17EB401053DAF4840A490D4C%40AdobeOrg=1; AMCV_17EB401053DAF4840A490D4C%40AdobeOrg=-227196251%7CMCIDTS%7C18082%7CMCMID%7C37080542162887526766253199795737714834%7CMCAAMLH-1562835161%7C12%7CMCAAMB-1562835161%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCOPTOUT-1562237561s%7CNONE%7CMCAID%7CNONE; S=d1t18Rz8hJVMcMz8/Pz9bP1AtXmtCZDgKIKRPNlezOcKY5GnDdB/pVh3h2+O4XFZaMTOW+YO64vsqzjhWJkxopaquNg==; gpv_pn=HomePage; gpv_pn_t=FLIPKART%3AHomePage; AMCV_55CFEDA0570C3FA17F000101%40AdobeOrg=-227196251%7CMCIDTS%7C18081%7CMCMID%7C11305740583582521872941987069957610473%7CMCOPTOUT-1562237630s%7CNONE%7CMCAID%7CNONE; s_sq=%5B%5BB%5D%5D; s_ppvl=seller%253A%2520home%2520page%2C100%2C100%2C783%2C1600%2C783%2C1280%2C800%2C1.6%2CP; s_ppv=seller%253A%2520payments%2520%257C%2520transactions%2C100%2C100%2C783%2C945%2C783%2C1280%2C800%2C1.6%2CP; _gat=1; s_nr=1562230602736-Repeat; s_ppn=no%20value',
        'Connection: keep-alive',
        'Referer: https://seller.flipkart.com/sw.js',
        'fk-csrf-token: WRtG1XkW-XrHVysPKo0H4rAtxM62Glb5ozOg'
      ],
      previousPayment: 'https://seller.flipkart.com/napi/payments/fetchPreviousPayments?offset=8&filter=filter&type=MONTHLY_VIEW',
      getAllTransactionAggregatedAmount: 'https://seller.flipkart.com/napi/payments/getAllTransactionAggregatedAmount',
      getAllTransactions: 'https://seller.flipkart.com/napi/payments/getAllTransactions',
      details: 'https://seller.flipkart.com/napi/payments/details',
      history: 'https://seller.flipkart.com/napi/payments/history',
      getHistory: 'https://seller.flipkart.com/napi/payments/getHistory',
      startDate: '2019-05-01',
      endDate: '2019-05-30',
      sellerId: '9ujbcnp6ky5ruzie'
    });

    // devtools.remove(ft);

