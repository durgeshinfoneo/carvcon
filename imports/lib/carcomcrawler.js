/* eslint-disable no-param-reassign, no-unused-vars */
import { Meteor } from 'meteor/meteor';
import rp from 'request-promise';
import iconv from 'iconv-lite';
// import XRay from 'x-ray';
// import querystring from 'query-string';
// import { RateLimiter } from 'limiter';
import cheerio from 'cheerio';
import logger from './logger';
import BaseCrawler from './basecrawler';
import { setting } from '../helpers/constant';
import x from './xray';
import Maker from '../api/makers/makers';

const PROXY_LIST = setting.PROXY_LIST;
const USER_AGENT = 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36';
// const CRAWL_TIMEOUT = setting.CRAWL_TIMEOUT;

export default class CarComCrawler extends BaseCrawler {
  getTotalPage(options) {
    const parent = this;
    logger.info('==========CarComCrawler options==========', options);
    return rp.get({
      uri: 'https://car.price.com.hk/product/list',
      qs: options,
      headers: {
        'User-Agent': USER_AGENT,
      },
      proxy: PROXY_LIST[parent.numberProxy],
    }).then(response => x(response, 'div.pagination-bottom-center ul.pagination', ['li']).then((data) => {
      // const totalPage = 1;
      logger.info('==============data==============:', data);
      if (data.length > 1) {
        data = data.slice(2, data.length - 1);
      }
      data.splice(0, 0, '1');
      logger.info('==============data slice==============:', data);
      let current = Promise.resolve();
      return Promise.all(data.map((page) => {
        current = current.then(() => parent.getCarsPerPage(options, page));
        return current;
      })).then((result) => {
        logger.info('==============result==============:', result);
        let total = 0;
        total = parent.getCalPriceAverage(result);
        return Promise.resolve(total);
      });
    }));
  }

  getCarsPerPage(options, page) {
    options.page = page;
    const parent = this;
    return rp.get({
      uri: 'https://car.price.com.hk/product/list',
      qs: options,
      headers: {
        'User-Agent': USER_AGENT,
      },
      proxy: PROXY_LIST[parent.numberProxy],
    }).then(body => x(body,
      'div#wrapper-list div.wrapper.wrapper-product',
      [{
        model: '.wrapper.wrapper-product-name-attribute div.product-name | trim',
        year: '.wrapper.wrapper-product-name-attribute .product-attribute span:nth-of-type(7) | trim',
        price: '.wrapper.wrapper-product-price .product-price | price',
        price_original: '.wrapper.wrapper-product-price .product-price .product-price-original | price',
        updated: '.wrapper.wrapper-product-update-date span:nth-of-type(2)',
      }]).then((data) => {
      // data = data.slice(1, data.length);
      // logger.info('======================getCarPerPage: %j', data);
      const now = new Date().getTime();
      const milisecondInYear = 12 * 30 * 24 * 60 * 60 * 1000;
      const validDate = now - milisecondInYear;
      logger.info('======================getCarPerPage: %j', data);
      return Promise.all(data.map((item) => {
        const updated = new Date(item.updated);
        // logger.info('======================updated: %j', updated);
        if (updated.getTime() >= validDate) {
          if (item.price_original > 0) {
            item.price = Number(item.price.toString().replace(item.price_original, ''));
          }
          logger.info('======================item.price: %j', item.price);
          return Promise.resolve(item.price);
        }
        return Promise.resolve(0);
      }));
    }));
  }

  getAllBrand(url) {
    const parent = this;
    console.log('==========getAllBrand==========');
    const options = {
      method: 'GET',
      uri: 'https://car.price.com.hk/product/list',
      headers: {
        'User-Agent': USER_AGENT,
      },
      proxy: PROXY_LIST[parent.numberProxy],
    };
    return rp(options)
      .then(body => x(body,
        'form[name="filterform"] .unit-filter:nth-of-type(1) .filter-options.filter-options-single .filter-option',
        [{
          serverKey: 'input@value | trim',
          name: 'span',
        }]).then((data) => {
        // console.log(data);

        data.forEach((element) => {
          const serverKey = element.serverKey;
          const name = element.name;
          const arrayName = name.split(' ');
          const lName = arrayName.length;
          const chineseName = arrayName[0];
          let englishName = '';
          if (lName === 1) {
            englishName = chineseName;
          } else {
            for (let j = 1; j < lName; j++) {
              englishName += `${arrayName[j]} `;
            }
            englishName = englishName.trim();
          }

          console.log(`name: ${name} serverKey: ${serverKey}`);
          if (serverKey) {
            Maker.upsert({
              serverKey,
              source: 'car.com.hk',
            }, {
              $set: {
                chineseName,
                englishName,
              },
            }, {
              bypassCollection2: true, // https://github.com/aldeed/meteor-simple-schema/issues/175
            });
          }
        });
      }));
  }
}
