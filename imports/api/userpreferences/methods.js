import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import handleMethodException from '../../modules/handle-method-exception';
import UserPreferences from './userpreferences';
import { ROLES } from '../../helpers/constant';
const UserPreferenceSchema = UserPreferences.simpleSchema();
const validationContext = UserPreferenceSchema.newContext();

Meteor.methods({
  'userpreferences.insert'(preference) {
    // console.log('======userpreferences.insert========');
    const obj = { userId: this.userId, ...preference };
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        console.log('======userpreferences.insert========');
        UserPreferences.insert(obj);
        Roles.addUsersToRoles(this.userId, [ROLES.CUSTOMER]);
      } catch (exception) {
         console.log('======userpreferences.insert========', exception);
        handleMethodException(exception);
      }
    } else {
      console.log(validationContext.validationErrors());
      handleMethodException(validationContext.validationErrors());
    }
  },
  'userpreferences.update'(doc) {
    console.log('userpreferences.update: ', doc);
    const preferenceId = doc._id;
    const obj = doc;
    delete obj._id;
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        UserPreferences.update(preferenceId, { $set: obj });
      } catch (exception) {
        handleMethodException(exception);
      }
    }
  },
  'userpreferences.remove'(userPreferenceId) {
    try {
      UserPreferences.remove(userPreferenceId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});
