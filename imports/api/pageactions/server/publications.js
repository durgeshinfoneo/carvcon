import { Meteor } from 'meteor/meteor';
import PageActions from '../pageactions';

Meteor.publish('pageactions.list', () => PageActions.find());
