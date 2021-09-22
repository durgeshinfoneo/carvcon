import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import handleMethodException from '../../modules/handle-method-exception';
import TradeRequestConfig from './tradeRequestConfig';
import { ROLES } from '../../helpers/constant';

const TradeRequestConfigSchema = TradeRequestConfig.simpleSchema();
const validationContext = TradeRequestConfigSchema.newContext();

Meteor.methods({
  'tradeRequestConfig.insert'(trc) {
    if (!this.userId) {
      throw new Meteor.Error('traderequests.insert',
        'Must be logged in');
    }

    if (!Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
      // console.log('traderequests.update errr');
      throw new Meteor.Error(403, 'Access denied');
    }

    const obj = TradeRequestConfigSchema.clean(trc);
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        TradeRequestConfig.insert(obj);
      } catch (exception) {
        handleMethodException(exception);
      }
    } else {
      console.log(validationContext.validationErrors());
      handleMethodException(validationContext.validationErrors());
    }
  },
  'tradeRequestConfig.update'(trc) {
    if (!this.userId) {
      throw new Meteor.Error('traderequests.insert',
        'Must be logged in');
    }

    if (!Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
      // console.log('traderequests.update errr');
      throw new Meteor.Error(403, 'Access denied');
    }
    const trcId = trc._id;
    let obj = trc;
    delete obj._id;
    obj = TradeRequestConfigSchema.clean(obj);
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        TradeRequestConfig.update(trcId, { $set: obj });
      } catch (exception) {
        handleMethodException(exception);
      }
    } else {
      console.log(validationContext.validationErrors());
      handleMethodException(validationContext.validationErrors());
    }
  },
});
