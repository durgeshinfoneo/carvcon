import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import UserPreferences from '../../userpreferences/userpreferences';
import UserCompanies from '../../usercompanies/usercompanies';
import { ROLES } from '../../../helpers/constant';

Meteor.publish('users.list', function(filters = {}) {
  if (!this.userId) {
    return this.ready();
  }
  // console.log('=======filters=======:', filters);
  if (Roles.userIsInRole(this.userId, [ROLES.ADMIN])) { 
    return [
      Meteor.users.find(
        filters,
        {
          fields: {
            emails: 1,
            profile: 1,
            services: 1,
            createdAt: 1,
            roles: 1,
          },
        },
      ),
      UserPreferences.find({}),
      UserCompanies.find({}),
    ];
  }
  return Meteor.users.find(
    {
      _id: this.userId,
    },
    {
      fields: {
        emails: 1,
        profile: 1,
        services: 1,
        createdAt: 1,
        roles: 1,
      },
    },
  );
});

Meteor.publish('users.profile', function () {
  if (!this.userId) {
    return this.ready();
  }
  return [
    UserPreferences.find({ userId: this.userId }),
    UserCompanies.find({ userId: this.userId }),
    Meteor.users.find(
      {
        _id: this.userId,
      },
      {
        fields: {
          emails: 1,
          profile: 1,
          services: 1,
          createdAt: 1,
          roles: 1,
        },
      },
    ),
  ];
});

Meteor.publish('users.detailAdmin', function (userId) {
  if (!this.userId || !Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
    return this.ready();
  }
  return [
    UserPreferences.find({ userId }),
    UserCompanies.find({ userId }),
    Meteor.users.find(
      {
        _id: userId,
      },
      {
        fields: {
          emails: 1,
          profile: 1,
          services: 1,
          createdAt: 1,
          roles: 1,
        },
      },
    ),
  ];
});
