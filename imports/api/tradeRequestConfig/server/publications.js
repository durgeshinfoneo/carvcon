import { Meteor } from 'meteor/meteor';
import TradeRequestConfig from '../tradeRequestConfig';

Meteor.publish('tradeRequestConfig.list', function () {
  return TradeRequestConfig.find();
});
