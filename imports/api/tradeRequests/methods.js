import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import handleMethodException from '../../modules/handle-method-exception';
import sendMail from '../../modules/server/sendMail';
import TradeRequests from './tradeRequests';
import { ROLES, TRADE_REQUEST_STATUS, EMAIL_FROM } from '../../helpers/constant';
import { maxRequest, maxAccepted } from '../../helpers/tradeRequests';
import TradeRequestConfig from '../../api/tradeRequestConfig/tradeRequestConfig';
import Images from '../../api/files/files';

const TradeRequestsSchema = TradeRequests.simpleSchema();
const validationContext = TradeRequestsSchema.newContext();

Meteor.methods({
  'traderequests.insert'(tradeRequest) {
    if (!this.userId) {
      throw new Meteor.Error(
        'tradeRequests-insert-not-logged-in',
        'Must be logged in to create trade request.',
      );
    }

    if (!Roles.userIsInRole(this.userId, [ROLES.CUSTOMER, ROLES.ADMIN])) {
      throw new Meteor.Error(
        'tradeRequest-insert-unauthorized',
        'Only Customer and Admin can create trade request!',
      );
    }

    const tradeRequestConfig = TradeRequestConfig.findOne();
    let tradeRequestLimit = 5;
    let to = [];
    let from = EMAIL_FROM;
    if (tradeRequestConfig) {
      tradeRequestLimit = tradeRequestConfig.tradeRequestLimit;
      // to = tradeRequestConfig.adminEmail;
      from = tradeRequestConfig.noReplyEmail;
    }
    const adminUsers = Meteor.users.find({ roles: ROLES.ADMIN });
    to = adminUsers.map(admin => admin.emails[0].address);
    // console.log('===============to emails:', to);
    if (maxRequest(this.userId, tradeRequestLimit)) {
      throw new Meteor.Error(
        'tradeRequest-insert-limit-reached',
        'Trade request has reached limit!',
      );
    }

    const user = Meteor.users.findOne(this.userId);
    const requester = {
      id: user._id,
      email: user.emails[0].address,
    };
    const photos = tradeRequest.photos;
    const photosObj = photos.map((value) => {
      console.log('========photo=id==========', value.id);
      let link = '';
      const photo = Images.findOne({ _id: value.id });

      if (photo) {
        link = photo.link();
        console.log('========photo=link==========', link);
      }
      return {
        id: value.id,
        url: link,
      };
    });

    console.log('========photosObj=========', photosObj);

    let obj = { requester, ...tradeRequest, photos: photosObj };

    obj = TradeRequestsSchema.clean(obj);
    console.log('========obj=========', obj);
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        const tradeRequestId = TradeRequests.insert(obj);
        let subject = '[Carvcon] New Trade Request';
        sendMail({
          to,
          from,
          subject,
          template: 'new-trade-request',
          templateVars: {
            tradeRequestLink: Meteor.absoluteUrl(`admin/traderequests/${tradeRequestId}`),
          },
        });

        subject = '[Carvcon] 我們已收到你的服務要求 Service Acknowledgement';
        sendMail({
          to: obj.requester.email,
          from,
          subject,
          template: 'trade-request-open',
          templateVars: {},
        });
      } catch (exception) {
        handleMethodException(exception);
      }
    } else {
      console.log(validationContext.validationErrors());
      handleMethodException(validationContext.validationErrors());
    }
  },
  // 'traderequests.updateStatus'(doc) {

  // },
  'traderequests.update'(doc) {
    const tradeRequestId = doc._id;
    let obj = doc;
    delete obj._id;
    if (!this.userId) {
      throw new Meteor.Error(
        'tradeRequests-update-unauthorized',
        'Must be logged in to update trade request',
      );
    }

    if (!Roles.userIsInRole(this.userId, [ROLES.ADMIN, ROLES.DEALER])) {
      // console.log('traderequests.update errr');
      throw new Meteor.Error(403, 'Access denied');
    }

    // console.log('traderequests.update update');
    const tradeRequestConfig = TradeRequestConfig.findOne();
    // const tradeRequest = TradeRequests.findOne(tradeRequestId);
    let to = 'minhuyendo@gmail.com';
    let from = EMAIL_FROM;
    let acceptancePerDay = 12;
    if (tradeRequestConfig) {
      acceptancePerDay = tradeRequestConfig.acceptancePerDay;
      // to = tradeRequestConfig.adminEmail;
      from = tradeRequestConfig.noReplyEmail;
    }
    const adminUsers = Meteor.users.find({ roles: ROLES.ADMIN });
    to = adminUsers.map(admin => admin.emails[0].address);
    // save dealer accepted request
    if (doc.status === TRADE_REQUEST_STATUS.ACCEPTED) {
      if (maxAccepted(this.userId, acceptancePerDay)) {
        throw new Meteor.Error(
          'tradeRequests-update-trade-acceptance-limit',
          'Trade Acceptance has reached limit',
        );
      }
      const user = Meteor.users.findOne(this.userId);
      const acceptedBy = {
        id: user._id,
        email: user.emails[0].address,
        name: `${user.profile.firstName} ${user.profile.lastName}`,
      };
      obj = { ...obj, acceptedBy };
      const subject = '[Carvcon] Trade Request Accepted';
      sendMail({
        to,
        from,
        subject,
        template: 'trade-request-accepted',
        templateVars: {
          tradeRequestLink: Meteor.absoluteUrl(`admin/traderequests/${tradeRequestId}`),
          acceptedBy: acceptedBy.email,
          tradeRequestId,
        },
      });
    } else if (
      !Roles.userIsInRole(this.userId, [ROLES.ADMIN]) &&
      doc.status === TRADE_REQUEST_STATUS.OPEN
    ) {
      throw new Meteor.Error(403, 'Access denied');
    } else if (doc.status === TRADE_REQUEST_STATUS.COMPLETED) {
      if (!Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
        throw new Meteor.Error(403, 'Access denied');
      }
    } else if (doc.status === TRADE_REQUEST_STATUS.OPEN) {
      obj = { ...obj, acceptedBy: null };
      // if (tradeRequest.status === TRADE_REQUEST_STATUS.PENDING) {
      //   const subject = '[Carvcon] 我們已收到你的服務要求 Service Acknowledgement';
      //   sendMail({
      //     to: tradeRequest.requester.email,
      //     from,
      //     subject,
      //     template: 'trade-request-open',
      //     templateVars: {
      //     },
      //   });
      // }
    }

    obj = TradeRequestsSchema.clean(obj);
    console.log('=========obj========: ', obj);
    // if (obj.closedDate) {
    //   obj.closedDate = new Date(obj.closedDate);
    // }
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        TradeRequests.update(tradeRequestId, { $set: obj });
      } catch (exception) {
        handleMethodException(exception);
      }
    } else {
      console.log(validationContext.validationErrors());
      handleMethodException(validationContext.validationErrors());
    }
  },
  'traderequests.remove'(tradeRequestId) {
    if (!this.userId) {
      throw new Meteor.Error(
        'tradeRequests-delete-not-logged-in',
        'Must be logged in to delete trade request',
      );
    }

    try {
      if (Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
        // TradeRequests.remove(tradeRequestId);
        TradeRequests.update(tradeRequestId, {
          $set: {
            status: TRADE_REQUEST_STATUS.DELETED,
          },
        });
      } else {
        const tradeRequest = TradeRequests.findOne(tradeRequestId);
        if (tradeRequest && tradeRequest.ownerBy(this.userId)) {
          TradeRequests.update(tradeRequestId, {
            $set: {
              status: TRADE_REQUEST_STATUS.DELETED,
            },
          });
        } else {
          throw new Meteor.Error(
            'tradeRequests-delete-unauthorized',
            'Only trade request owners can delete.',
          );
        }
      }
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});
