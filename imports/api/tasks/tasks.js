// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';

const Tasks = new Mongo.Collection('tasks');

export default Tasks;

