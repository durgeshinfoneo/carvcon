import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import rp from 'request-promise';
// import csv from 'fast-csv';
// import fs from 'fs';
// import path from 'path';
 
// import CarClasses from '../carclasses/carclasses';
SimpleSchema.extendOptions(['index', 'unique', 'denyInsert', 'denyUpdate']);

const CarModels = new Mongo.Collection('carmodels');

const ImageSchema = new SimpleSchema({
  url: {
    type: String,
  },
  feature: {
    type: Boolean,
    optional: true,
  },
});

const CarModelSchema = new SimpleSchema({
  name: {
    type: String,
  },
  fullname: {
    type: String,
    index: 'text',
  },
  carclass: {
    type: Object,
  },
  'carclass.id': {
    type: String,
  },
  'carclass.name': {
    type: String,
  },
  maker: {
    type: Object,
  },
  'maker.id': {
    type: String,
  },
  'maker.englishName': {
    type: String,
  },
  'maker.chineseName': {
    type: String,
  },
  price: {
    type: Number,
    min: 0,
  },
  image: {
    type: ImageSchema,
    optional: true,
  },
  photos: {
    type: Array,
    optional: true,
    defaultValue: [],
  },
  'photos.$': {
    type: String,
  },
  referenceNumberBuy: {
    type: String,
  },
  referenceNumberSell: {
    type: String,
  },
});

CarModels.attachSchema(CarModelSchema);

CarModels.helpers({
  fullname_search() {
    return `${this.maker.englishName} - ${this.carclass.name} - ${this.name}`;
  },
  images_from_google(year) {
    console.log('=====year=======', year);
    const CUSTOM_SEARCH_GOOGLE_API_KEY = Meteor.settings.public.CUSTOM_SEARCH_GOOGLE_API_KEY;
    const SEACH_ENGINE_ID = Meteor.settings.public.SEACH_ENGINE_ID;
    const querySearch = `${this.maker.englishName} ${this.name} ${year} car`;
    console.log('=====CUSTOM_SEARCH_GOOGLE_API_KEY=======', CUSTOM_SEARCH_GOOGLE_API_KEY);
    console.log('=====SEACH_ENGINE_ID=======', SEACH_ENGINE_ID);
    console.log('=====querySearch=======', querySearch);
    const options = {
      method: 'GET',
      uri: 'https://www.googleapis.com/customsearch/v1',
      qs: {
        key: CUSTOM_SEARCH_GOOGLE_API_KEY,
        cx: SEACH_ENGINE_ID,
        searchType: 'image',
        imgSize: 'xlarge',
        gl: 'hk',
        // exactTerms: querySearch,
        q: querySearch,
        num: 5,
        safe: 'active',
      },
      json: true,
    };
    return rp(options)
      .then((data) => {
        console.log('=====data=====', data.items);
        const items = data.items;
        const images = items.map(i => i.link);
        console.log('=====images=====', images);
        return images;
      })
      .catch((err) => {
        console.log('==err==', err);
        return [self.image.url];
      });
  },
});

export default CarModels;
