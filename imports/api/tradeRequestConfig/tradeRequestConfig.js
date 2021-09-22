/* eslint-disable consistent-return  */
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const TradeRequestConfig = new Mongo.Collection('traderequestconfig');
const TradeRequestConfigSchema = new SimpleSchema({
  customerSupportEmail: {
    type: String,
  },
  noReplyEmail: {
    type: String,
  },
  adminEmail: {
    type: String,
  },
  acceptancePerDay: {
    type: SimpleSchema.Integer,
    defaultValue: 10,
  },
  tradeRequestLimit: {
    type: SimpleSchema.Integer,
    defaultValue: 5,
  },
  acceptanceCancellationLimit: {
    type: SimpleSchema.Integer,
    defaultValue: 3,
  },
}, {
  clean: {
    filter: true,
    autoConvert: true,
    removeEmptyStrings: true,
    trimStrings: true,
    getAutoValues: true,
    removeNullsFromArrays: true,
  },
});

TradeRequestConfig.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

TradeRequestConfig.attachSchema(TradeRequestConfigSchema);

export default TradeRequestConfig;
