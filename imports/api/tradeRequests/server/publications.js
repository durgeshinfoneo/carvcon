import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import TradeRequests from '../tradeRequests';
import { TRADE_REQUEST_STATUS, ROLES } from '../../../helpers/constant';

Meteor.publish('traderequests.list', function (filters = {}, skip = 0, limit = 10) {
  if (!this.userId) {
    return this.ready();
  }

  if (Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
    return [
      TradeRequests.find(filters, {
        skip,
        limit,
        sort: { createdAt: -1 },
      }),
      Meteor.users.find({},
        {
          fields: {
            profile: 1,
          },
        },
      ),
    ];
  } else if (Roles.userIsInRole(this.userId, [ROLES.DEALER])) {
    return TradeRequests.find({
      $or: [
        {
          status: {
            $not: {
              $in: [TRADE_REQUEST_STATUS.PENDING, TRADE_REQUEST_STATUS.DELETED],
            },
          },
          acceptedBy: null,
        },
        {
          'acceptedBy.id': this.userId,
        },
      ],
    }, {
      skip,
      limit,
      sort: { createdAt: -1 },
    });
  }
  return TradeRequests.find({
    'requester.id': this.userId,
    status: {
      $not: {
        $eq: TRADE_REQUEST_STATUS.DELETED,
      },
    },
  }, {
    skip,
    limit,
    sort: { createdAt: -1 },
  });
});
