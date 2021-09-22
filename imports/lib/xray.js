import XRay from 'x-ray';
import { setting } from '../helpers/constant';

const xray = XRay({
  filters: {
    trim (value) {
      return typeof value === 'string' ? value.trim() : value;
    },
    reverse (value) {
      return typeof value === 'string' ? value.split('').reverse().join('') : value;
    },
    slice (value, start, end) {
      return typeof value === 'string' ? value.slice(start, end) : value;
    },
    price(value) {
      return typeof value === 'string' ? Number(value.replace(/[^0-9.]+/g, '')) : 0;
    },
    date(value) {
      return typeof value === 'string' ? Date(value) : new Date();
    },
  },
}).timeout(setting.CRAWL_TIMEOUT);


const x = (url, scope, selector) => new Promise((resolve, reject) => {
  try {
    xray(url, scope, selector)((error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  } catch (err) {
    reject(err);
  }
});

export default x;
