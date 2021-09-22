import { Meteor } from 'meteor/meteor';
import UserPreferences from '../userpreferences';

Meteor.publish('userpreference.profile', function() {
  if (!this.userId) {
    return this.ready();
  }
  return [
    UserPreferences.find({ userId: this.userId }),
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
