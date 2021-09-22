import { Meteor } from 'meteor/meteor';

import Images from './files';

Meteor.methods({
  'RemoveFile'(fileId) {
    Images.findOne({ _id: fileId }).remove();
  },
  'RenameFile'(fileId, name) {
    const image = Images.findOne(fileId);
    if (!image) {
      throw new Meteor.Error('file-not-found');
    }
    Images.update(fileId, { $set: { name } });
  },
});
