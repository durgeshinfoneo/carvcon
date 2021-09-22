// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

const Makers = new Mongo.Collection('makers');

const MakerSchema = new SimpleSchema({
  serverKey: { type: Number },
  chineseName: {
    type: String,
    optional: true,
  },
  englishName: {
    type: String,
    optional: true,
  },
  source: {
    type: String,
    defaultValue: '28car.com',
  },
});

Makers.attachSchema(MakerSchema);

export default Makers;
