/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';
// import { Link } from 'react-router-dom';
// import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import CarYears from '../../../api/caryears/caryears';
import Makers from '../../../api/makers/makers';
import CarClasses from '../../../api/carclasses/carclasses';
import CarModels from '../../../api/carmodels/carmodels';
import Cars from '../../../api/cars/cars';
import BuySellCar from './BuySellCar';
// import logger from '../../../lib/logger';
// import TradeRequestForm from '../../components/TradeRequest/TradeRequestForm';

const $ = global.$;
const T = i18n.createComponent();

export default class CarRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      images: [],
    };
  }

  componentDidMount() {
    this.invalidate = () => {
      this.forceUpdate();
    };
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  handleClick = (e) => {
    // alert('button click');
    if (!Meteor.userId()) {
      e.preventDefault();
      this.setState({
        redirect: true,
      });
    } else {
      $('#tradeRequestModal').modal('show');
    }
  }

  render() {
    const { carmodel, years } = this.props;
    // console.log('=====CarRow=======', images);
    const carClass = CarClasses.findOne(carmodel.carclass.id);

    const maker = Makers.findOne({ serverKey: parseInt(carClass.maker.id, 10) });
    // console.log('=====CarRow=======', images.length);

    let year = 2018;
    const carYear = CarYears.findOne({ car28Value: years });
    if (carYear) {
      year = carYear.name;
    }
    year = parseInt(year, 10);

    if (this.state.redirect) {
      return (
        <Redirect to={{ pathname: '/login' }} />
      );
    }

    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="thumbnail">
            <img
              src={this.props.carmodel.image ? this.props.carmodel.image.url : '/no-image-available.png'}
              alt="..."
            />
          </div>
        </div>
        <div className="col-sm-12">
          <button
            className="btn btn-lg btn-trade-request"
            type="button"
            // data-toggle="modal"
            // data-target="#tradeRequestModal"
            onClick={this.handleClick}
          >
            <T>common.traderequest.trade-request</T>
          </button>
          <BuySellCar
            carImage={this.props.carmodel.image ? this.props.carmodel.image.url : '/no-image-available.png'}
            buysellcar={this.props.buysellcar}
            cars={this.props.cars}
            carmodel={this.props.carmodel}
            year={year}
            maker={maker}
            sendGA={this.props.sendGA}
            numberOfPreviousOwner={this.props.numberOfPreviousOwner}
            handleTradeRequest={this.handleClick}
          />
          <button
            className="btn btn-lg btn-trade-request"
            type="button"
            onClick={this.handleClick}
          >
            <T>common.traderequest.trade-request</T>
          </button>

        </div>
      </div>
    );
  }
}

CarRow.propTypes = {
  numberOfPreviousOwner: PropTypes.string.isRequired,
  sendGA: PropTypes.bool.isRequired,
  carmodel: PropTypes.instanceOf(CarModels).isRequired,
  buysellcar: PropTypes.string.isRequired,
  years: PropTypes.string.isRequired,
  cars: PropTypes.instanceOf(Cars).isRequired,
};
