/* eslint-disable consistent-return  */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const TradeRequests = new Mongo.Collection('traderequests');

const TradeRequestSchema = new SimpleSchema(
  {
    status: {
      type: String,
      allowedValues: ['PENDING', 'OPEN', 'ACCEPTED', 'COMPLETED', 'DELETED'],
      defaultValue: 'PENDING',
    },
    requester: {
      type: Object,
    },
    'requester.email': {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
    'requester.id': {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    tradeType: {
      type: String,
      allowedValues: ['BUY', 'SELL'],
    },
    carYear: {
      type: SimpleSchema.Integer,
    },
    carBrand: {
      type: String,
    },
    carClass: {
      type: String,
    },
    carModel: {
      type: String,
    },
    wishTrade: {
      type: String,
      allowedValues: ['DEALER', 'INDIVIDUAL', 'EITHER'],
      defaultValue: 'DEALER',
    },
    carLoanReferral: {
      type: Boolean,
      optional: true,
    },
    carInsuranceReferral: {
      type: Boolean,
      optional: true,
    },
    independentCarExaminer: {
      type: Boolean,
      optional: true,
    },
    performRegistration: {
      type: Boolean,
    },
    carViewDay: {
      type: String,
    },
    carViewTime: {
      type: String,
    },
    carViewLocation: {
      type: String,
    },
    otherThing: {
      type: String,
      optional: true,
    },
    considerBuyAnotherCar: {
      type: Boolean,
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
    closedDate: {
      type: Date,
      optional: true,
      custom() {
        // console.log('custom: ', this.value);
        // console.log('custom status: ', this.field('status').value);
        if (this.field('status').value === 'COMPLETED') {
          console.log('custom: ', this.value);
          if (!this.isSet || this.value === null || this.value === '') {
            return SimpleSchema.ErrorTypes.REQUIRED;
          }
        }
      },
    },
    acceptedBy: {
      type: Object,
      optional: true,
    },
    'acceptedBy.name': {
      type: String,
    },
    'acceptedBy.email': {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
    'acceptedBy.id': {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    closedPrice: {
      type: Number,
      optional: true,
      custom() {
        if (this.field('status').value === 'COMPLETED') {
          if (!this.isSet || this.value === null || this.value === '') {
            return SimpleSchema.ErrorTypes.REQUIRED;
          }
        }
      },
    },
    quotePrice: {
      type: Number,
      optional: true,
    },
    numberOfPreviousOwner: {
      type: Number,
      optional: true,
      defaultValue: 0,
    },
    carImage: {
      type: Object,
      optional: true,
    },
    'carImage.url': {
      type: String,
    },
    'carImage.title': {
      type: String,
      optional: true,
    },
    currentMileage: {
      type: Number,
      optional: true,
      defaultValue: 0,
    },
    vehicleLicenceFeeUntil: {
      type: Date,
      optional: true,
    },
    dealerSoldGoodOrNon: {
      type: Boolean,
      optional: true,
    },
    engineOutput: {
      type: Number,
      optional: true,
    },
    photos: {
      type: Array,
      minCount: 0,
      maxCount: 5,
    },
    'photos.$': Object,
    'photos.$.url': {
      type: String,
      optional: true,
    },
    'photos.$.thumbnailUrl': {
      type: String,
      optional: true,
    },
    'photos.$.id': {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
  },
  {
    clean: {
      filter: true,
      autoConvert: true,
      removeEmptyStrings: true,
      trimStrings: true,
      getAutoValues: true,
      removeNullsFromArrays: true,
    },
  },
);

TradeRequests.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

TradeRequests.attachSchema(TradeRequestSchema);

TradeRequests.helpers({
  ownerBy(userId) {
    return this.requester.id === userId;
  },
  owner() {
    return Meteor.users.findOne(this.requester.id);
  },
});

export default TradeRequests;
