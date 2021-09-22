// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const CarYears = new Mongo.Collection('caryears');

const CarYearSchema = new SimpleSchema({
  name: {
    type: String,
  },
  car28Value: {
    type: String,
  },
  carComValue: {
    type: String,
  },
});

CarYears.attachSchema(CarYearSchema);

export default CarYears;
