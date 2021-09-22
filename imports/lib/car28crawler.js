/* eslint-disable no-param-reassign, no-unused-vars */
import { Meteor } from 'meteor/meteor';
import rp from 'request-promise';
import iconv from 'iconv-lite';
// import XRay from 'x-ray';
// import logger from 'winston';
// import { RateLimiter } from 'limiter';
import logger from '../lib/logger';
import BaseCrawler from './basecrawler';
import { setting } from '../helpers/constant';
import x from '../lib/xray';

const PROXY_LIST = setting.PROXY_LIST;
logger.info('========PROXY_LIST========: ', PROXY_LIST);
// const CRAWL_TIMEOUT = setting.CRAWL_TIMEOUT;
// const limiter = new RateLimiter(1, 10); // at most 1 request every 100 ms

export default class Car28Crawler extends BaseCrawler {
  getTotalPage(options) {
    logger.info('getTotalPage numberProxy: ', this.numberProxy);
    logger.info('getTotalPage current Proxy===========: ', PROXY_LIST[this.numberProxy]);
    logger.info('getTotalPage options: ', options);
    const parent = this;
    return rp
      .post(parent.siteUrl, {
        form: options,
        encoding: null,
        proxy: PROXY_LIST[this.numberProxy],
      })
      .then((body) => {
        const utf8String = iconv.decode(new Buffer(body), 'big5');
        // logger.info('getTotalPage utf8String: ', utf8String);
        return x(
          utf8String,
          'table:nth-of-type(6) table table table:nth-of-type(3) table table tr select',
        ).then((data) => {
          // logger.info("getTotalPage data: ", data);
          const totalPage = data.match(/genPage\((\d+),\s+(\d+)\);/i)[1];
          logger.info('total Page data: ', data);
          logger.info('total Page: ', totalPage);
          const pageArray = [];
          let i = 1;
          for (i = 1; i <= parseInt(totalPage, 10); i++) {
            logger.info('Page: ', i);
            // this.getCarsPerPage(options, i);
            pageArray.push(i);
          }
          let current = Promise.resolve();
          return Promise.all(
            pageArray.map((page) => {
              current = current.then(() => parent.getCarsPerPage(options, page));
              return current;
            }),
          ).then((result) => {
            logger.info('result: ', result);
            let total = 0;
            total = parent.getCalPriceAverage(result);
            return Promise.resolve(total);
          });
        });
      });
    // .catch(err => {
    //   logger.error("getTotalPage statusCode: ", err["statusCode"]);
    //   return Promise.reject(err);
    // });
  }

  getCarsPerPage(options, page) {
    const form = options;
    form.h_page = page;
    // if (page > 1){
    //
    // }
    // const form = options['h_page'] = page;
    logger.info('getCarsPerPage: ', form);
    return rp
      .post(this.siteUrl, {
        form,
        encoding: null,
        proxy: PROXY_LIST[this.numberProxy],
      })
      .then((body) => {
        const utf8String = iconv.decode(new Buffer(body), 'big5');
        // logger.info("CarCrawler: ", utf8String);
        return x(utf8String, 'table:nth-of-type(6) table table div#tch_box table tr', [
          {
            id: 'td table td@onclick | trim',
          },
        ]).then(data =>
          // logger.info("CarCrawler: ", data);
          Promise.all(
            data.map((item) => {
              const id = item.id.match(/goDsp\(((\d+),\s+(\d+),\s+('\w+'))\)/i)[3];
              return id;
            }),
          )
            .then(ids =>
              Promise.all(
                ids.map((item) => {
                  // logger.info("CarCrawler Detail: ", data);
                  const detailUrl = `http://28car.com/sell_dsp.php?h_vid=${item}&h_url_dsp_src=/sell_lst.php.php&h_vw=1`;
                  return this.getDetailCar(detailUrl, options);
                }),
              ),
            )
            .catch(error => logger.error('getCarsPerPage error: ', error)),
        );
      });
  }

  getDetailCar(detailUrl, options) {
    // logger.info(`getDetailCar: ${data[0]}`);
    // const detailUrl = `http://28car.com/cmy_dsp.php?h_vid=${data[0]}&h_url_dsp_src=/cmy_lst.php&h_vw=1`;
    // logger.info(`detailUrl: ${detailUrl}`);
    return rp
      .get({
        uri: detailUrl,
        encoding: null,
        proxy: PROXY_LIST[this.numberProxy],
      })
      .then((data) => {
        const utf8String = iconv.decode(new Buffer(data), 'big5');

        return x(utf8String, 'table:nth-of-type(6) table table table:nth-of-type(3) table', {
          numbering: 'tr:nth-of-type(1) td:nth-of-type(2) | trim',
          carClass: 'tr:nth-of-type(2) td:nth-of-type(2) | trim',
          depot: 'tr:nth-of-type(3) td:nth-of-type(2) | trim',
          model: 'tr:nth-of-type(4) td:nth-of-type(2) | trim',
          seat: 'tr:nth-of-type(5) td:nth-of-type(2) | trim',
          volume: 'tr:nth-of-type(6) > td:nth-of-type(2) | trim',
          transmission: 'tr:nth-of-type(7) td:nth-of-type(2) | trim',
          years: 'tr:nth-of-type(8) td:nth-of-type(2) | trim',
          commentary: 'tr:nth-of-type(9) td:nth-of-type(2) | trim',
          price: 'tr:nth-of-type(10) > td:nth-of-type(2) font b font | price',
          // nameOfTheCar: 'tr:nth-of-type(11) td:nth-of-type(2) | trim',
          contactInformation: 'tr:nth-of-type(11) td:nth-of-type(2) | trim',
          updatedAt: 'tr:nth-of-type(12) td:nth-of-type(2) | trim',
          featureImage:
            'tr:nth-of-type(1) td:nth-of-type(3) table:nth-of-type(1) table img@src | trim',
          image1:
            'tr:nth-of-type(1) td:nth-of-type(3) table:nth-of-type(3) td:nth-of-type(1) img@src | trim',
          image2:
            'tr:nth-of-type(1) td:nth-of-type(3) table:nth-of-type(3) td:nth-of-type(3) img@src | trim',
          image3:
            'tr:nth-of-type(1) td:nth-of-type(3) table:nth-of-type(5) td:nth-of-type(1) img@src | trim',
          image4:
            'tr:nth-of-type(1) td:nth-of-type(3) table:nth-of-type(5) td:nth-of-type(3) img@src | trim',
        }).then((result) => {
          // logger.info("==========before=======data crawler: ", data);
          const images = [];
          if (result.featureImage) {
            result.featureImage = result.featureImage.replace('_m.jpg', '_b.jpg');
            images.push({
              url: result.featureImage,
              feature: true,
            });
          }
          if (result.image1) {
            result.image1 = result.image1.replace('_s.jpg', '_b.jpg');
            images.push({
              url: result.image1,
              feature: false,
            });
            delete result.image1;
          }
          if (result.image2) {
            result.image2 = result.image2.replace('_s.jpg', '_b.jpg');
            images.push({
              url: result.image2,
              feature: false,
            });
            delete result.image2;
          }
          if (result.image3) {
            result.image3 = result.image3.replace('_s.jpg', '_b.jpg');
            images.push({
              url: result.image3,
              feature: false,
            });
            delete result.image3;
          }
          if (result.image4) {
            result.image4 = result.image4.replace('_s.jpg', '_b.jpg');
            images.push({
              url: result.image4,
              feature: false,
            });
            delete result.image4;
          }
          if (result.model) {
            result.model = result.model.toUpperCase();
          } else {
            logger.info('============result crawler: ', result);
          }

          result.images = images;
          result.yearsId = options.h_f_yr || '';
          result.makerId = options.h_f_mk || '';

          // data.updateAt = new Date(data.updateAt);
          // logger.info("============data crawler: ", data);
          Meteor.call('cars.insert', result, (err, res) => {
            if (err) {
              logger.info('============data crawler err: ', err);
            } else {
              // logger.info("============data crawler successfully: ", res);
            }
          });
          return Promise.resolve(result.price);
        });
      })
      .catch(error => logger.error(error));
  }
}
