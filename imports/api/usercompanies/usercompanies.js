/* eslint-disable consistent-return  */
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const UserCompanies = new Mongo.Collection('usercompanies');
const UserCompanySchema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
  },
  crbrNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  contactMobileNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  coreBusiness: {
    type: String,
  },
  sourceUsedCar: {
    type: String,
  },
  marketing: {
    type: String,
  },
  mostRevenues: {
    type: String,
  },
  mostPopular: {
    type: String,
  },
  notSold: {
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

UserCompanies.attachSchema(UserCompanySchema);

export default UserCompanies;
