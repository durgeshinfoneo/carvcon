/* eslint-disable class-methods-use-this, no-unused-vars */
import logger from './logger';

export default class BaseCrawler {
  constructor(siteUrl, numberProxy) {
    this.siteUrl = siteUrl;
    this.numberProxy = parseInt(numberProxy, 10);
  }

  getTotalPage(option) {
    return null;
  }

  getCarsPerPage(options, page) {
    return null;
  }

  getDetailCar(detailUrl, options) {
    return null;
  }

  getCalPriceAverage(result) {
    logger.info('result: ', result);
    let total = 0;
    let number = 0;
    for (let j = 0; j < result.length; j++) {
      number += result[j].length;
      for (let k = 0; k < result[j].length; k++) {
        const priceOfCar = result[j][k];
        if (typeof (priceOfCar) !== 'undefined' && priceOfCar !== 0) {
          total += result[j][k];
        } else {
          number -= 1;
        }
      }
    }
    logger.info('total: ', total);
    logger.info('number: ', number);
    if (number !== 0) {
      total /= number;
    }
    return total;
  }
}
