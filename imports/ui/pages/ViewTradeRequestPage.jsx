import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import TradeRequests from '../../api/tradeRequests/tradeRequests';
import TradeRequestView from '../components/TradeRequest/TradeRequestView';

export default withTracker(({ match }) => {
  const subscription = Meteor.subscribe('traderequests.list');
  const id = match.params.id;
  return {
    loading: !subscription.ready(),
    tradeRequest: TradeRequests.findOne(id),
  };
})(TradeRequestView);
