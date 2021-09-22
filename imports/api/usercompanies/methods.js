import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import handleMethodException from '../../modules/handle-method-exception';
import UserCompanies from './usercompanies';
import { ROLES } from '../../helpers/constant';

const UserCompanySchema = UserCompanies.simpleSchema();
const validationContext = UserCompanySchema.newContext();

Meteor.methods({
  'usercompanies.insert'(company) {
    // console.log('======userpreferences.insert========');
    const obj = { userId: this.userId, ...company };
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        // console.log('======userpreferences.insert========');
        UserCompanies.insert(obj);
        Roles.addUsersToRoles(this.userId, [ROLES.DEALER]);
      } catch (exception) {
        // console.log('======userpreferences.insert========', exception);
        handleMethodException(exception);
      }
    } else {
      console.log(validationContext.validationErrors());
      handleMethodException(validationContext.validationErrors());
    }
  },
  'usercompanies.update'(doc) {
    console.log('userpreferences.update: ', doc);
    const companyId = doc._id;
    const obj = doc;
    delete obj._id;
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        UserCompanies.update(companyId, { $set: doc });
      } catch (exception) {
        handleMethodException(exception);
      }
    }
  },
  'usercompanies.remove'(userCompanyId) {
    try {
      UserCompanies.remove(userCompanyId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});
