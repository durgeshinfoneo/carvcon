/* eslint-disable  import/prefer-default-export */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import PageActions from './pageactions';
import logger from '../../lib/logger';

const NUMBER_REQUEST_PER_PROXY = 15 ; //50
const PageActionSchema = PageActions.simpleSchema();

export const checkProxy = (options) => {
  const timeout = options.timeout;
  const pageAction = PageActions.findOne();
  let searchCount = pageAction.searchCount;
  let proxyIndex = pageAction.proxyIndex;


  if (searchCount % NUMBER_REQUEST_PER_PROXY === 0) {
    proxyIndex += 1;
    //proxyIndex %= 25;
  } else if (timeout) {
    proxyIndex += 1;
    //proxyIndex %= 25;
  }
    proxyIndex %= 22;
  searchCount += 1;
  pageAction.searchCount = searchCount;
  PageActions.update(pageAction._id, { $set: { searchCount, proxyIndex } });
logger.info("=============proxyIndex",proxyIndex);
   logger.info("=========searchCount",searchCount);   
    logger.info("=========NUMBER_REQUEST_PER_PROXY",NUMBER_REQUEST_PER_PROXY);
 
  return proxyIndex;
};

Meteor.methods({
  'pageactions.insert'(pageaction) {
    const validationContext = PageActionSchema.newContext();
    if (validationContext.isValid()) {
      PageActions.insert(pageaction);
    }
  },
  'pageactions.remove'(pageActionId) {
    check(pageActionId, String);

    const pageAction = PageActions.findOne(pageActionId);

    if (pageAction) {
      PageActions.remove(pageActionId);
    }
  },
  'pageactions.update'(pageActionId, pageaction) {
    check(pageActionId, String);
    check(pageaction, Object);

    const pageAction = PageActions.findOne(pageActionId);

    if (pageAction) {
      PageActions.update(pageActionId, { $set: pageaction });
    }
  },
  'pageactions.checkProxy'(options) {
    check(options, Object);
    return checkProxy(options);
  },
});
