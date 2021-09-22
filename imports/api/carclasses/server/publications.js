import { Meteor } from 'meteor/meteor';
import CarClasses from '../carclasses';

Meteor.publish('carclasses.list', function carClassesPubliccation(filters = {}, skip = 0, limit = 10) {
  return CarClasses.find(filters, { skip, limit });
});
