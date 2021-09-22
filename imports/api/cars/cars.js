// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
// import CarYears from '../caryears/caryears';
// import Makers from '../makers/makers';
// import CarModels from '../carmodels/carmodels';
// import CarClasses from '../carclasses/carclasses';

const Cars = new Mongo.Collection('cars');
// SimpleSchema.extendOptions(['index', 'unique', 'denyInsert', 'denyUpdate']);

const ImageSchema = new SimpleSchema({
  url: {
    type: String,
  },
  feature: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
});

const CarSchema = new SimpleSchema({
  numbering: { type: String },
  carClass: { type: String },
  depot: { type: String },
  makerId: { type: String },
  model: { type: String, index: 'text' },
  seat: { type: String },
  volume: { type: String, optional: true },
  transmission: { type: String },
  years: { type: String, optional: true },
  yearsId: { type: String },
  commentary: { type: String },
  price: { type: Number },
  nameOfTheCar: { type: String, optional: true },
  contactInformation: { type: String },
  updatedAt: { type: Date },
  featureImage: { type: String },
  images: {
    type: Array,
    minCount: 1,
  },
  'images.$': {
    type: ImageSchema,
  },
});

Cars.attachSchema(CarSchema);

export default Cars;
