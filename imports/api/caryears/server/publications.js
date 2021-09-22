import { Meteor } from 'meteor/meteor';
import CarYears from '../caryears';

Meteor.publish('caryears.list', function() {
  return CarYears.find({});
});
