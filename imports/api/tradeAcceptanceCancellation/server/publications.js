import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import TradeAcceptanceCancellation from '../tradeAcceptanceCancellation';
import { ROLES } from '../../../helpers/constant';

Meteor.publish('tradeAcceptanceCancellation.list', function (filters = {}, skip = 0, limit = 10) {
  if (!this.userId) {
    return this.ready();
  }
  const user = Meteor.users.findOne(this.userId);
  const email = user.emails[0].address;
  if (Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
    return TradeAcceptanceCancellation.find(filters, { skip, limit });
  } else if (Roles.userIsInRole(this.userId, [ROLES.DEALER])) {
    return TradeAcceptanceCancellation.find({
      CancelledBy: email,
    }, { skip, limit });
  }
  throw new Meteor.Error(403, 'Access denied');
});
