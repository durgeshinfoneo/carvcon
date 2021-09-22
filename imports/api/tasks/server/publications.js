import { Meteor } from 'meteor/meteor';
import Tasks from '../tasks';

// This code only runs on the server
// Only publish tasks that are public or belong to the current user
Meteor.publish('tasks', function tasksPublication() {
  return Tasks.find({
    $or: [
      { private: { $ne: true } },
      { owner: this.userId },
    ],
  });
});
