/* eslint-disable no-alert */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { moment } from 'meteor/momentjs:moment';
import { Bert } from 'meteor/themeteorchef:bert';
import { Roles } from 'meteor/alanning:roles';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import TradeAcceptanceCancellationForm from './TradeAcceptanceCancellationForm';
import { TRADE_REQUEST_STATUS, ROLES } from '../../../helpers/constant';
import './TradeRequestView.scss';
import './TradeRequestForm.scss';

const T = i18n.createComponent();

const handleRemove = (documentId, history) => {
  if (confirm(i18n.__('common.traderequest.are-you-sure-delete-this-trade-request'))) {
    Meteor.call('traderequests.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(i18n.__('common.traderequest.trade-request-deleted'), 'success');
        history.push('/my-trade-request');
      }
    });
  }
};

const handleAccepted = (doc, history) => {
  const obj = doc;
  obj.status = TRADE_REQUEST_STATUS.ACCEPTED;
  if (confirm(i18n.__('common.traderequest.are-you-sure-accept-this-trade-request'))) {
    Meteor.call('traderequests.update', obj, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(i18n.__('common.traderequest.trade-request-accepted'), 'success');
        history.push('/my-trade-request');
      }
    });
  }
};

const renderAction = (doc, history) => {
  if (Roles.userIsInRole(Meteor.userId(), [ROLES.DEALER])) {
    if (doc.status === TRADE_REQUEST_STATUS.OPEN) {
      return (
        <button
          className="btn btn-danger btn-delete"
          onClick={() => handleAccepted(doc, history)}
        >
          <T>common.traderequest.accept-request</T>
        </button>
      );
    } else if (doc.status === TRADE_REQUEST_STATUS.ACCEPTED) {
      return (
        <button
          className="btn btn-danger btn-delete"
          data-toggle="modal"
          data-target="#tradeAcceptanceCancellationForm"
        >
          <T>common.traderequest.cancel-request</T>
        </button>
      );
    }
  } else {
    return (
      <button
        className="btn btn-danger btn-delete"
        onClick={() => handleRemove(doc._id, history)}
      >
        <T>common.traderequest.delete-request</T>
      </button>
    );
  }
};

const TradeRequestView = (props) => {
  const { loading, tradeRequest, history } = props;
  if (loading) {
    return (
      <Loading />
    );
  }
  return (
    <div className="col-md-12 trade-request-view">
      <div className="row">
        <div className="col-md-9">
          <h2><T>common.traderequest.request-id</T>: #{tradeRequest._id}</h2>
        </div>
        <div className="col-md-3">
          <p className="status-title">
            <T>common.traderequest.status</T>: <span className={`status ${tradeRequest.status.toLowerCase()}`}>{tradeRequest.status}
            </span>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 col-sm-6 col-xs-12">
          <Link to={`/my-trade-request/${tradeRequest._id}`}>
            <img
              className="img-thumbnail"
              src={tradeRequest.carImage ? tradeRequest.carImage.url : '/no-image-available.png'}
              alt={tradeRequest.carImage ? tradeRequest.carImage.title : ''}
            />
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 col-xs-6">
          <label htmlFor="createDate"><T>common.traderequest.created-date</T></label>
          <p>{moment(tradeRequest.createdAt).format('YYYY MMM DD')}</p>
        </div>
        <div className="col-md-3 col-xs-6">
          <label htmlFor="createDate"><T>common.traderequest.closed-date</T></label>
          <p>{tradeRequest.closedDate ? moment(tradeRequest.closedDate).format('YYYY MMM DD') : 'N/A'}</p>
        </div>
        {tradeRequest.tradeType === 'SELL' &&
          <div className="col-md-3 col-xs-6">
            <label htmlFor="createDate"><T>common.searchform.number-of-previous-owner</T></label>
            <p>{tradeRequest.numberOfPreviousOwner}</p>
          </div>
        }
      </div>
      <hr />
      <div className="row">
        <div className="col-md-3 col-xs-6">
          <label htmlFor="tradeType"><T>common.traderequest.trade-type</T></label>
          <p>{tradeRequest.tradeType}</p>
        </div>
        <div className="col-md-3 col-xs-6">
          <label htmlFor="quotedPrice"><T>common.traderequest.quoted-price</T></label>
          <p>{tradeRequest.quotePrice ? `HKD$ ${new Intl.NumberFormat().format(tradeRequest.quotePrice)}` : ''}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-xs-6">
          <label htmlFor="carYear"><T>common.traderequest.car-year</T></label>
          <p>{tradeRequest.carYear}</p>
        </div>
        <div className="col-md-3 col-xs-6">
          <label htmlFor="carBrand"><T>common.traderequest.car-brand</T></label>
          <p>{tradeRequest.carBrand}</p>
        </div>
        <div className="col-md-3 col-xs-6">
          <label htmlFor="carClass"><T>common.traderequest.class</T></label>
          <p>{tradeRequest.carClass}</p>
        </div>
        <div className="col-md-3 col-xs-6">
          <label htmlFor="carModel"><T>common.traderequest.model</T></label>
          <p>{tradeRequest.carModel}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-9 col-md-9">
          <p className="question"><T>common.traderequest.who-do-you-wish-to-trade-with</T></p>
        </div>
        <div className="col-xs-3 col-md-3">
          <p className="question">{tradeRequest.wishTrade}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-9 col-md-9">
          <p className="question">
            <T>common.traderequest.do-you-need-car-loan-referral</T>
          </p>
        </div>
        <div className=" col-xs-3 col-md-3">
          <p className="question">{tradeRequest.carLoanReferral ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-9 col-md-9">
          <p className="question">
            <T>common.traderequest.do-you-need-car-insurance-referral</T>
          </p>
        </div>
        <div className="col-xs-3 col-md-3">
          <p className="question">{tradeRequest.carLoanReferral ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-9 col-md-9">
          <p className="question">
            <T>common.traderequest.do-you-need-independent-car-examiner</T>
          </p>
        </div>
        <div className="col-xs-3 col-md-3">
          <p className="question">{tradeRequest.independentCarExaminer ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-9 col-md-9">
          <p className="question">
            <T>common.traderequest.do-you-need-vcon-to-perform-registration-for-you-with-transport-department-and-any-other-formality</T>
          </p>
        </div>
        <div className="col-xs-3 col-md-3">
          <p className="question">{tradeRequest.performRegistration ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-9 col-md-9">
          <p className="question">
            <T>common.traderequest.what-is-your-availability-for-car-viewing</T>
          </p>
        </div>
        <div className="col-xs-3 col-md-3">
          <p className="question">
            {`${tradeRequest.carViewDay} ${tradeRequest.carViewTime}  ${tradeRequest.carViewLocation}`}
          </p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-9 col-md-9">
          <p className="question">
            <T>common.traderequest.any-other-thing-we-can-help</T>
          </p>
        </div>
        <div className="col-xs-3 col-md-3">
          <p className="question">{tradeRequest.otherThing ? tradeRequest.otherThing : 'N/A'}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-9 col-md-9">
          <p className="question">
            <T>common.traderequest.will-you-consider-to-buy-another-car</T>
          </p>
        </div>
        <div className="col-xs-3 col-md-3">
          <p className="question">{tradeRequest.considerBuyAnotherCar ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-12 col-md-12">
          { renderAction(tradeRequest, history) }
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12">
          <TradeAcceptanceCancellationForm
            tradeRequest={tradeRequest}
          />
        </div>
      </div>
    </div>
  );
};

TradeRequestView.defaultProps = {
  tradeRequest: null,
};

TradeRequestView.propTypes = {
  loading: PropTypes.bool.isRequired,
  tradeRequest: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default TradeRequestView;
