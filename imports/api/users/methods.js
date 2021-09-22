import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import handleMethodException from '../../modules/handle-method-exception';
import UserPreferences from '../userpreferences/userpreferences';
import UserCompanies from '../usercompanies/usercompanies';
import { ROLES } from '../../helpers/constant';

const UserPreferenceSchema = UserPreferences.simpleSchema();
const validationContext = UserPreferenceSchema.newContext();

const UserCompanySchema = UserCompanies.simpleSchema();
const companyValidationContext = UserCompanySchema.newContext();

Meteor.methods({
  'users.updateProfile'(profile) {
    const userId = this.userId;
    Meteor.users.update(userId, {
      $set: {
        profile,
      },
    });
  },
  'users.sendVerificationEmail'() {
    return Accounts.sendVerificationEmail(this.userId);
  },
  'users.selfRemove'() {
    if (!this.userId) {
      throw new Meteor.Error('traderequests.insert',
        'Must be logged in');
    }

    try {
      Meteor.users.remove(this.userId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'users.delete'(userId) {
    if (!this.userId || !Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
      throw new Meteor.Error(403, 'Access denied');
    }

    try {
      Meteor.users.remove(userId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'users.createCustomer'(doc) {
    if (!this.userId || !Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
      throw new Meteor.Error(403, 'Access denied');
    }
    const user = doc.user;
    const preference = doc.preference;
    const userId = Accounts.createUser({
      email: user.email,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        age: user.age,
      },
      password: user.password,
    });
    console.log(user.firstName);
    const obj = { userId, ...preference };
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        UserPreferences.insert(obj); // saving userpref in db
        Roles.addUsersToRoles(userId, [ROLES.CUSTOMER]);
      } catch (exception) {
        handleMethodException(exception);
      }
    } else {
      console.log(validationContext.validationErrors());
      handleMethodException(validationContext.validationErrors());
    }
  },
  'users.updateCustomer'(doc) {
    if (!this.userId || !Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
      throw new Meteor.Error(403, 'Access denied');
    }
    const user = doc.user;
    const userId = user._id;
    const preference = doc.preference;
    Meteor.users.update(userId, {
      $set: {
        profile: {
          phone: user.phone,
          age: user.age,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
    const preferenceId = preference._id;
    const obj = preference;
    delete obj._id;
    validationContext.validate(obj);
    if (validationContext.isValid()) {
      try {
        UserPreferences.update(preferenceId, { $set: obj });
      } catch (exception) {
        handleMethodException(exception);
      }
    } else {
      console.log(companyValidationContext.validationErrors());
      handleMethodException(companyValidationContext.validationErrors());
    }
  },
  'users.createAdminUser'(doc) {
    if (!this.userId || !Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
      throw new Meteor.Error(403, 'Access denied');
    }
    const user = doc;
    const userId = Accounts.createUser({
      email: user.email,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        age: user.age,
      },
      password: user.password,
    });
    Roles.addUsersToRoles(userId, [ROLES.ADMIN]);
  },
  'users.updateAdminUser'(doc) {
    if (!this.userId || !Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
      throw new Meteor.Error(403, 'Access denied');
    }
    const user = doc;
    const userId = user._id;
    Meteor.users.update(userId, {
      $set: {
        profile: {
          phone: user.phone,
          age: user.age,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
  },
  'users.createDealer'(doc) {
    if (!this.userId || !Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
      throw new Meteor.Error(403, 'Access denied');
    }
    const user = doc.user;
    const company = doc.company;
    const userId = Accounts.createUser({
      email: user.email,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        age: user.age,
      },
      password: user.password,
    });

    const obj = { userId, ...company };
    companyValidationContext.validate(obj);
    if (companyValidationContext.isValid()) {
      try {
        UserCompanies.insert(obj);
        Roles.addUsersToRoles(userId, [ROLES.DEALER]);
      } catch (exception) {
        handleMethodException(exception);
      }
    } else {
      console.log(companyValidationContext.validationErrors());
      handleMethodException(companyValidationContext.validationErrors());
    }
  },
  'users.updateDealer'(doc) {
    if (!this.userId || !Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
      throw new Meteor.Error(403, 'Access denied');
    }
    console.log('==========updateDealer======', doc);
    const user = doc.user;
    const userId = user._id;
    const company = doc.company;
    Meteor.users.update(userId, {
      $set: {
        profile: {
          phone: user.phone,
          age: user.age,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
    const companyId = company._id;
    const obj = company;
    delete obj._id;
    companyValidationContext.validate(obj);
    if (companyValidationContext.isValid()) {
      try {
        UserCompanies.update(companyId, { $set: obj });
      } catch (exception) {
        handleMethodException(exception);
      }
    } else {
      console.log(companyValidationContext.validationErrors());
      handleMethodException(companyValidationContext.validationErrors());
    }
  },
});
