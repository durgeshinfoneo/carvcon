import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import handleMethodException from '../../modules/handle-method-exception';
import sendMail from '../../modules/server/sendMail';
import { ROLES, TRADE_REQUEST_STATUS, EMAIL_FROM } from '../../helpers/constant';
import { maxCancellation } from '../../helpers/tradeRequests';

import TradeAcceptanceCancellation from './tradeAcceptanceCancellation';
import TradeRequest from '../tradeRequests/tradeRequests';
import TradeRequestConfig from '../tradeRequestConfig/tradeRequestConfig';

const TradeAcceptanceCancellationSchema = TradeAcceptanceCancellation.simpleSchema();
const validationContext = TradeAcceptanceCancellationSchema.newContext();

Meteor.methods({
  'tradeAcceptanceCancellations.insert'(doc) {
    if (!this.userId) {
      throw new Meteor.Error('tradeAcceptanceCancellation.insert.not-logged-in',
        'Must be logged in to cancel trade request.');
    }

    if (!Roles.userIsInRole(this.userId, [ROLES.DEALER])) {
      throw new Meteor.Error(403, 'Access denied');
    }

    const user = Meteor.users.findOne(this.userId);
    const cancelledBy = user.emails[0].address;
    const tradeRequestConfig = TradeRequestConfig.findOne();
    let acceptanceCancellationLimit = 3;
    let to = 'minhuyendo@gmail.com';
    let from = EMAIL_FROM;
    if (tradeRequestConfig) {
      acceptanceCancellationLimit = tradeRequestConfig.acceptanceCancellationLimit;
      to = tradeRequestConfig.adminEmail;
      from = tradeRequestConfig.noReplyEmail;
    }
    if (maxCancellation(cancelledBy, acceptanceCancellationLimit)) {
      throw new Meteor.Error('tradeAcceptanceCancellations.insert.limit-reached',
        'Trade request acceptance cancellation has reached limit');
    }
    let obj = {
      ...doc,
      cancelledBy,
    };
    obj = TradeAcceptanceCancellationSchema.clean(obj);
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        TradeAcceptanceCancellation.insert(obj);
        TradeRequest.update(obj.requestId, {
          $set: {
            status: TRADE_REQUEST_STATUS.OPEN,
            acceptedBy: null,
          },
        });
        const tradeRequestId = obj.requestId;
        const reason = obj.reason;
        const subject = '[Carvcon] Trade Request Cancalled';
        sendMail({
          to: [to, obj.requester],
          from,
          subject,
          template: 'trade-request-acceptance-cancellation',
          templateVars: {
            tradeRequestLink: Meteor.absoluteUrl(`admin/traderequests/${tradeRequestId}`),
            reasonCancel: reason,
            cancelledBy,
          },
        });
      } catch (exception) {
        handleMethodException(exception);
      }
    } else {
      console.log(validationContext.validationErrors());
      handleMethodException(validationContext.validationErrors());
    }
  },
});
