/* eslint-disable jsx-a11y/href-no-hash */
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import i18n from 'meteor/universe:i18n';

import { TRADE_REQUEST_STATUS, ROLES } from '../../helpers/constant';
import TradeRequests from '../../api/tradeRequests/tradeRequests';
import TradeRequestRow from '../components/TradeRequest/TradeRequestRow';

const currentStatus = new ReactiveVar(TRADE_REQUEST_STATUS.OPEN);
const T = i18n.createComponent();

class MyTradeRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'OPEN',
    };
  }

  updateStatus = (e, value) => {
    this.props.currentStatus.set(value);
  }

  render() {
    const { loading, tradeRequests } = this.props;
    // console.log('MyTradeRequest==============:', tradeRequests);
    // console.log('loading==============:', loading);
    if (loading) {
      return (
        <div />
      );
    }
    const rows = [];
    tradeRequests.forEach((tradeRequest) => {
      rows.push(
        <TradeRequestRow
          tradeRequest={tradeRequest}
          key={tradeRequest._id}
        />,
      );
    });

    return (
      <div className="col-md-12 my-trade-request">

        { Roles.userIsInRole(Meteor.userId(), [ROLES.DEALER]) ? (
          <ul className="nav nav-pills" role="tablist">
            <li role="presentation" className="active">
              <a
                href="#request"
                aria-controls="request"
                role="tab"
                data-toggle="tab"
                onClick={e => this.updateStatus(e, TRADE_REQUEST_STATUS.OPEN)}
              >
                <T>common.traderequest.open-request</T>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#request"
                aria-controls="request"
                role="tab"
                data-toggle="tab"
                onClick={e => this.updateStatus(e, TRADE_REQUEST_STATUS.ACCEPTED)}
              >
                <T>common.traderequest.accepted-request</T>
              </a>
            </li>
          </ul>
        ) : (
          <ul className="nav nav-pills" role="tablist">
            <li role="presentation" className="active">
              <a
                href="#request"
                aria-controls="request"
                role="tab"
                data-toggle="tab"
                onClick={e => this.updateStatus(e, TRADE_REQUEST_STATUS.OPEN)}
              >
                <T>common.traderequest.current-request</T>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#request"
                aria-controls="request"
                role="tab"
                data-toggle="tab"
                onClick={e => this.updateStatus(e, TRADE_REQUEST_STATUS.COMPLETED)}
              >
                <T>common.traderequest.completed-request</T>
              </a>
            </li>
          </ul>
        ) }
        <div className="wrap-content">
          {rows}
        </div>
      </div>
    );
  }
}

MyTradeRequestPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  tradeRequests: PropTypes.array.isRequired,
  currentStatus: PropTypes.func.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('traderequests.list', {}, 0, 0);
  let tradeRequests = TradeRequests.find({ status: currentStatus.get() }).fetch();

  if (currentStatus.get() === TRADE_REQUEST_STATUS.OPEN) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.DEALER])) {
      tradeRequests = TradeRequests.find({
        status: TRADE_REQUEST_STATUS.OPEN,
      }).fetch();
    } else {
      tradeRequests = TradeRequests.find({
        status: {
          $not: { $eq: TRADE_REQUEST_STATUS.COMPLETED },
        },
      }).fetch();
    }
  }
  return {
    loading: !subscription.ready(),
    tradeRequests,
    currentStatus,
  };
})(MyTradeRequestPage);
