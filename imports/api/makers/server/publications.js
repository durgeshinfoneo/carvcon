/* eslint-disable no-unused-vars */
import { Meteor } from 'meteor/meteor';
import Makers from '../makers';

Meteor.publish('makers.list', function makersPublication(filters = {}, skip = 0, limit = 10) {
  return Makers.find(filters, { skip, limit, sort: { serverKey: 1 } });
});
