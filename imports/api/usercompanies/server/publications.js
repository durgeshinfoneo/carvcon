import { Meteor } from 'meteor/meteor';
import UserCompanies from '../usercompanies';

Meteor.publish('usercompanies.profile', function() {
  if (!this.userId) {
    return this.ready();
  }
  return [
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
        },
      },
    ),
  ];
});
