/* eslint-disable no-else-return, consistent-return */
// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

const Crawlers = new Mongo.Collection('crawlers');

// const NUMBER_RETRY = 5;

const CrawlerSchema = new SimpleSchema({
  maker: {
    type: String,
  },
  carClass: {
    type: String,
  },
  carModel: {
    type: String,
  },
  carYear: {
    type: Number,
  },
  averagePrice: {
    type: Number,
    defaultValue: 0,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    },
  },
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

Crawlers.attachSchema(CrawlerSchema);

export default Crawlers;
