import { Meteor } from 'meteor/meteor';
import Images from '../files';

Meteor.publish('files.images.all', function () {
  return Images.find().cursor;
});
