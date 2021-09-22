import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const CarClasses = new Mongo.Collection('carclasses');

const CarClassSchema = new SimpleSchema({
  name: { type: String },
  maker: {
    type: Object,
  },
  'maker.id': {
    type: String,
  },
  'maker.chineseName': {
    type: String,
  },
  'maker.englishName': {
    type: String,
  },
});

CarClasses.attachSchema(CarClassSchema);

export default CarClasses;
