import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { moment } from 'meteor/momentjs:moment';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

const TradeRequestRow = ({ tradeRequest }) => (
  // <tr>
  //   <td>
  //     <Link to={`/my-trade-request/${tradeRequest._id}`}>
  //       {tradeRequest._id}
  //     </Link>
  //   </td>
  //   <td>{`${tradeRequest.carYear} ${tradeRequest.carBrand} ${tradeRequest.carClass} ${tradeRequest.carModel}`}</td>
  //   <td>{tradeRequest.tradeType}</td>
  //   <td>{moment(tradeRequest.createdAt).format('YYYY MMM DD')}</td>
  //   <td>{tradeRequest.acceptedBy && tradeRequest.acceptedBy.name ? tradeRequest.acceptedBy.name : ''}</td>
  //   <td>
  //     <span className={`status ${tradeRequest.status.toLowerCase()}`}>{tradeRequest.status}</span>
  //   </td>
  // </tr>
  <div className="row wrap-traderequest">
    <div className="col-md-4 col-sm-6 col-xs-12">
      <Link to={`/my-trade-request/${tradeRequest._id}`}>
        <img
          className="img-thumbnail"
          src={tradeRequest.carImage ? tradeRequest.carImage.url : '/no-image-available.png'}
          alt={tradeRequest.carImage ? tradeRequest.carImage.title : ''}
        />
      </Link>
    </div>
    <div className="col-md-8 col-sm-6 col-xs-12">
      <div className="row">
        <div className="col-md-3 col-sm-5 col-xs-5">
          <T>common.traderequest.request-id</T>
        </div>
        <div className="col-md-3 col-sm-7 col-xs-7">
          <Link to={`/my-trade-request/${tradeRequest._id}`}>
            {tradeRequest._id}
          </Link>
        </div>
        <div className="col-md-3 col-sm-5 col-xs-5">
          <T>common.traderequest.created-date</T>
        </div>
        <div className="col-md-3 col-sm-7 col-xs-7">
          {moment(tradeRequest.createdAt).format('YYYY MMM DD')}
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-sm-5 col-xs-5">
          <T>common.traderequest.request</T>
        </div>
        <div className="col-md-3 col-sm-7 col-xs-7">
          {`${tradeRequest.carYear} ${tradeRequest.carBrand} ${tradeRequest.carClass} ${tradeRequest.carModel}`}
        </div>
        <div className="col-md-3 col-sm-5 col-xs-5">
          <T>common.traderequest.quoted-price</T>
        </div>
        <div className="col-md-3 col-sm-7 col-xs-7">
          {tradeRequest.quotePrice ? `HKD$ ${new Intl.NumberFormat().format(tradeRequest.quotePrice)}` : ''}
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-sm-5 col-xs-5">
          <T>common.traderequest.type</T>
        </div>
        <div className="col-md-3 col-sm-7 col-xs-7">
          {tradeRequest.tradeType}
        </div>
        <div className="col-md-3 col-sm-5 col-xs-5">
          <T>common.traderequest.status</T>
        </div>
        <div className="col-md-3 col-sm-7 col-xs-7">
          <span className={`status ${tradeRequest.status.toLowerCase()}`}>{tradeRequest.status}</span>
        </div>
      </div>
    </div>
    <div className="col-md-12 col-sm-12 col-xs-12">
      <hr className="divider" />
    </div>

  </div>
);

TradeRequestRow.propTypes = {
  tradeRequest: PropTypes.object.isRequired,
};

export default TradeRequestRow;
