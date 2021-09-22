/* eslint-disable consistent-return  */
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const UserPreferences = new Mongo.Collection('userpreferences');
const UserPreferenceSchema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  preferenceCar: { type: Array },
  'preferenceCar.$': {
    type: String,
  },
  colourCar: { type: Array }, 
   'colourCar.$': {
    type: String,
  },
  typeCar: {
    type: Array,
  },
  'typeCar.$': {
    type: String,
  },
  poweredBy: {
    type: Array,
    // allowedValues: ['HYBRID', 'ELECTRICITY', 'PETROL', 'DIESEL'],
  },
  'poweredBy.$': {
    type: String,
  },
  transmission: {
    type: Array,
  //  allowedValues: ['MT', 'AT'],
  },
  'transmission.$': {
    type: String,
  },

  drivingFrequency: { type: String },
  thirdParty: {
    type: Array,
  },
  'thirdParty.$': { type: String },
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

UserPreferences.attachSchema(UserPreferenceSchema);

export default UserPreferences;
