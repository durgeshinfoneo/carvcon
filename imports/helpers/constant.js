/* eslint-disable  import/prefer-default-export */
export const setting = {
  PROXY_LIST: [
'http://192.126.161.93:3128',
'http://23.254.78.26:3128',
'http://192.126.157.128:3128',
'http://104.140.208.107:3128',
'http://104.140.208.254:3128',
'http://104.140.208.32:3128',
'http://192.126.161.135:3128',
'http://192.126.161.197:3128',
'http://196.18.88.181:3128',
'http://192.126.163.104:3128',
'http://23.254.78.25:3128',
'http://192.126.161.219:3128',
'http://23.254.78.173:3128',
'http://192.126.163.138:3128',
'http://104.140.208.191:3128',
'http://192.126.157.226:3128',
'http://192.126.157.153:3128',
'http://196.18.88.83:3128',
'http://192.126.157.181:3128',
'http://192.126.163.205:3128',
'http://196.18.88.186:3128',
'http://192.126.157.12:3128',
],
  CRAWL_TIMEOUT: 6 * 1000,
}; 
//4 'http://192.126.163.233:3128',
// 'http://23.254.78.156:3128',
// 'http://196.18.88.216:3128',

export const ROLES = {
  ADMIN: 'admin',
  DEALER: 'dealer',
  CUSTOMER: 'customer',
};

export const TRADE_REQUEST_STATUS = {
  PENDING: 'PENDING',
  OPEN: 'OPEN',
  ACCEPTED: 'ACCEPTED',
  COMPLETED: 'COMPLETED',
  DELETED: 'DELETED',
};

export const TR_WORKLOW_STATUS = {
  PENDING: 'OPEN',
  OPEN: 'ACCEPTED',
  ACCEPTED: 'COMPLETED',
};

export const EMAIL_FROM = 'Carvcon <no-reply@freegrapik.com>';
export const DEFAULT_AVATAR = '/images/profiles/generic_avatar.png';
