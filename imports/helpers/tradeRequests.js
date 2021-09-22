import TradeRequests from '../api/tradeRequests/tradeRequests';
import TradeAcceptanceCancellation from '../api/tradeAcceptanceCancellation/tradeAcceptanceCancellation';
import { TRADE_REQUEST_STATUS } from './constant';

export const maxRequest = (userId, max) => {
  const numberRq = TradeRequests.find({
    'requester.id': userId,
    status: {
      $not: {
        $in: [TRADE_REQUEST_STATUS.DELETED, TRADE_REQUEST_STATUS.COMPLETED],
      },
    },
  }).count();

  if (numberRq >= max) {
    return true;
  }
  return false;
};

export const maxAccepted = (userId, max) => {
  const numberAccepted = TradeRequests.find({
    'acceptedBy.id': userId,
    status: {
      $not: {
        $eq: TRADE_REQUEST_STATUS.COMPLETED,
      },
    },
  }).count();
  if (numberAccepted >= max) {
    return true;
  }
  return false;
};

export const maxCancellation = (email, max) => {
  const now = new Date();
  let last24h = new Date();
  last24h = new Date(last24h.setDate(last24h.getDate() - 1));
  console.log('========last24h=========: ', last24h);
  console.log('========now=========: ', now);
  const numberCancellation = TradeAcceptanceCancellation.find({
    cancelledBy: email,
    createdAt: {
      $gte: last24h,
      $lt: now,
    },
  }).count();

  if (numberCancellation >= max) {
    return true;
  }
  return false;
};
