/* eslint-disable consistent-return  */
import { Meteor } from 'meteor/meteor';

import SimpleSchema from 'simpl-schema';
import UserCompanies from '../usercompanies/usercompanies';
import UserPreferences from '../userpreferences/userpreferences';

const Schema = {};

Schema.UserPreference = new SimpleSchema({
  preferenceCar: {
    type: Array,
    optional: true,
  },
  'preferenceCar.$': {
    type: String,
  },
  colourCar: {
    type: Array,
    optional: true,
  },
  'colourCar.$': {
    type: String,
  },

  typeCar: {
    type: Array,
    optional: true,
  },
  'typeCar.$': {
    type: String,
  },
  
  poweredBy: {
    type: Array,
    optional: true,
  },
  
  'poweredBy.$': {
    type: String,
  },
 transmission: {
    type: Array,
    optional: true,
  },
  'transmission.$': {
    type: String,
  },
  
  drivingFrequency: {
    type: String,
    optional: true,
  },
 
  thirdParty: {
    type: Array,
    optional: true,
  },
  'thirdParty.$': {
    type: String,
  },
});

Schema.UserCompany = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  crbrNumber: {
    type: String,
    optional: true,
  },
  address: {
    type: String,
    optional: true,
  },
  contactPerson: {
    type: String,
    optional: true,
  },
  contactMobileNumber: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
    optional: true,
  },
  coreBusiness: {
    type: String,
    optional: true,
  },
  sourceUsedCar: {
    type: String,
    optional: true,
  },
  marketing: {
    type: String,
    optional: true,
  },
  mostRevenues: {
    type: String,
    optional: true,
  },
  brandMostPopular: {
    type: String,
    optional: true,
  },
  carNotSold: {
    type: String,
    optional: true,
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
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
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
  },
});

Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    optional: true,
  },
  lastName: {
    type: String,
    optional: true,
  },
  avatar: {
    type: String,
    optional: true,
  },
  age: {
    type: String,
    optional: true,
  },
  phone: {
    type: String,
    optional: true,
  },
});
 
Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true,
  },
  emails: {
    type: Array,
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  profile: {
    type: Schema.UserProfile,
    optional: true,
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  roles: {
    type: Array,
    optional: true,
  },
  'roles.$': {
    type: String,
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  },
});

Meteor.users.attachSchema(Schema.User);

Meteor.users.helpers({
  userCompany() {
    return UserCompanies.findOne({ userId: this._id });
  },
  userPreference() {
    return UserPreferences.findOne({ userId: this._id });
  },
});

export default Schema.User;
