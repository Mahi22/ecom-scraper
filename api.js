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

  transactionRqst$.subscribe(transactions => {
    const jsonContent = JSON.stringify(transactions);
    fs.writeFile('transactions.json', jsonContent, 'utf8', function (err) {
      if (err) {
        console.log('Error while writing JSON file');
      }
      console.log('DONE file saved');
    })
  });
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
    '',
    'Connection: keep-alive',
    'Referer: https://seller.flipkart.com/sw.js',
    'fk-csrf-token:'
  ],
  startDate: '2019-05-01',
  endDate: '2019-05-30',
  sellerId: ''
})