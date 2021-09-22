/* eslint-disable  import/prefer-default-export, no-param-reassign */
import {
  Meteor
} from 'meteor/meteor';
// import cheerio from 'cheerio';
// import request from 'request';
import Future from 'fibers/future';
// import Fiber from 'fibers';
import logger from '../../lib/logger';
import Car28Crawler from '../../lib/car28crawler';
import CarComCrawler from '../../lib/carcomcrawler';

import {
  checkProxy
} from '../pageactions/methods';
import Makers from '../makers/makers';
import CarYears from '../caryears/caryears';
// import CarModels from '../carmodels/carmodels';

// type:
//     1: car28
//     2: carcom
const crawlingAndcheckProxy = (options, timeout, attempts, numberProxy, type) => {
  let result = {
    averagePrice: 0,
    numberProxy,
  };
  return new Promise((resolve, reject) => {
    logger.info('pageactions successfully:', numberProxy);
    let crawlerInstance = null;
    if (type === 1) {
      logger.info('===========28car=============:', options);
      crawlerInstance = new Car28Crawler('https://28car.com/sell_lst.php', numberProxy);
    } else {
      logger.info('===========carcom=============:', options);
      crawlerInstance = new CarComCrawler('https://car.price.com.hk/product/list', numberProxy);
    }

    crawlerInstance
      .getTotalPage(options)
      .then((data) => {
        logger.info('crawlingAndcheckProxy promise');
        result = {
          averagePrice: data,
          numberProxy,
        };
        return resolve(result);
      })
      .catch((err) => {
        const statusCode = err.statusCode;

        logger.info('crawlerInstance options', options);
        logger.info('crawlerInstance timeout', timeout);
        logger.info('crawlerInstance attempts', attempts);

        logger.info('numberProxy', numberProxy);
        logger.info('type', type);


        logger.error('crawlingAndcheckProxy err', err);
        logger.error('crawlingAndcheckProxy err', statusCode);
        if (statusCode === 504) {
          logger.info('retry request');
          if (attempts < 5) {
            attempts += 1;
            if (numberProxy < 9) {
              numberProxy += 1;
            } else {
              numberProxy = 0;
            }

            return resolve(crawlingAndcheckProxy(options, true, attempts, numberProxy));
          }
          result.numberProxy = numberProxy;
          return resolve(result);
        }
        return reject('error');
      });
  });
};

const calAveragePriceFromCar28 = (options) => {
  const numberProxy = checkProxy({
    timeout: false
  });
  const timeout = false;
  const attempts = 0;
  return crawlingAndcheckProxy(options, timeout, attempts, numberProxy, 1).then((data) => {
    logger.info('=========numberProxy==============: ', data.numberProxy);
    if (numberProxy < data.numberProxy) {
      checkProxy({
        timeout: true
      });
    }
    let averagePrice = data.averagePrice;
    if (averagePrice === 0) {
      const hsrh = options.h_srh;
      if (hsrh.indexOf(' ') !== -1) {
        options.h_srh_ty = 1;
        logger.info('crawler report unavailable:', options);
        return crawlingAndcheckProxy(options, timeout, attempts, numberProxy, 1).then((dataRetry) => {
          logger.info('=========numberProxy==============: ', data.numberProxy);
          averagePrice = dataRetry.averagePrice;
          if (numberProxy < dataRetry.numberProxy) {
            checkProxy({
              timeout: true
            });
          }
          return Promise.resolve(averagePrice);
        });
      }
      return Promise.resolve(averagePrice);
    }
    return Promise.resolve(averagePrice);
  });
  // .catch(err => console.error("=================crawler:  ",err));
};

const calAveragePriceFromCarCom = (options) => {
  const numberProxy = checkProxy({
    timeout: false
  });
  const timeout = false;
  const attempts = 0;
  if (options.q.indexOf(' ') !== -1) {
    return crawlingAndcheckProxy(options, timeout, attempts, numberProxy, 2).then((data) => {
      logger.info('=========numberProxy==============: ', data.numberProxy);
      if (numberProxy < data.numberProxy) {
        checkProxy({
          timeout: true
        });
      }
      const averagePrice = data.averagePrice;
      return Promise.resolve(averagePrice);
    });
  }
  return Promise.resolve(0);

  // .catch(err => console.error("=================crawler:  ",err));
};

export const crawler = (options, callback) => {
  calAveragePriceFromCar28(options.car28)
    .then((car28AvgPrice) => {
      logger.info('=========car28AvgPrice==============: ', car28AvgPrice);
      calAveragePriceFromCarCom(options.carcom).then((carcomAvgPrice) => {
        logger.info('=========carcomAvgPrice==============: ', carcomAvgPrice);
        if (carcomAvgPrice && car28AvgPrice) {
          const avgPrice = (carcomAvgPrice + car28AvgPrice) / 2;
          callback(null, avgPrice);
        } else if (carcomAvgPrice) {
          callback(null, carcomAvgPrice);
        } else {
          callback(null, car28AvgPrice);
        }
      });
    })
    .catch(err => console.error('=================crawler:  ', err));
};

Meteor.methods({
  'crawlers.test'() {
    crawler({}, 1);
  },
  'crawlers.cars'(options) {
    logger.info('crawlers.cars: ', options);

    const year = options.h_f_yr;
    const carYears = CarYears.findOne({
      car28Value: year
    });
    const carcomYear = carYears.carComValue;
    logger.info('carcomYear: ', carcomYear);

    const makerKey = parseInt(options.h_f_mk, 10);
    let carComMakerKey = '';
    logger.info('makerKey: ', makerKey);
    const makerModel = Makers.findOne({
      serverKey: makerKey,
      source: '28car.com'
    });
    if (makerModel) {
      const carComMaker = Makers.findOne({
        englishName: makerModel.englishName,
        source: 'car.com.hk',
      });

      if (carComMaker) {
        carComMakerKey = carComMaker.serverKey;
      }
    }
    logger.info('carComMakerKey: ', carComMakerKey);
    const carModel = options.h_srh;
    const optionsCrawler = {
      car28: options,
      carcom: {
        ptype: 1,
        filter: `${carComMakerKey},38`, // 38 custom year filter on car.price.com
        q: carModel,
        y_r: `${carcomYear},${carcomYear}`,
      },
    };
    logger.info('options: ', optionsCrawler);
    const future = new Future();
    crawler(optionsCrawler, (err, res) => {
      logger.info('crawlers.cars result: ', res);
      future.return(res);
    });
    return future.wait();
  },
});
