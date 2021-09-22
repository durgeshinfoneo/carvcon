/* eslint-disable consistent-return  */
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const TradeAcceptanceCancellations = new Mongo.Collection('tradeacceptancecancellations');
const TradeAcceptanceCancellationSchema = new SimpleSchema({
  requestId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  requester: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  cancelledBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  reason: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
      this.unset();
    },
    optional: true,
  },
});

TradeAcceptanceCancellations.attachSchema(TradeAcceptanceCancellationSchema);

export default TradeAcceptanceCancellations;

