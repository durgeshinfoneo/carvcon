// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

const PageActions = new Mongo.Collection('pageactions');

// class PageActionsCollection extends Mongo.Collection {
//   checkProxy(){
//     console.log("=====checkProxy=======");
//     return true;
//   }
// }

const PageActionSchema = new SimpleSchema({
  searchCount: {
    type: Number,
    min: 0,
  },
  proxyIndex: {
    type: Number,
    min: 0,
  },
});

PageActions.attachSchema(PageActionSchema);

export default PageActions;
