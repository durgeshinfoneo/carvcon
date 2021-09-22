/* eslint-disable class-methods-use-this, jsx-a11y/href-no-hash */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import i18n from 'meteor/universe:i18n';

import CarYears from '../../../api/caryears/caryears';
import Makers from '../../../api/makers/makers';
// import Cars from '../../../api/cars/cars';
import CarModels from '../../../api/carmodels/carmodels';
import CarClasses from '../../../api/carclasses/carclasses';

const T = i18n.createComponent();

class FilterableCarForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     buysellcar: this.props.buysellcar,
  //   };
  // }

  componentDidMount() {
    this._invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this._invalidate);
  }

  componentWillUnmount() {
    this._invalidate = () => this.forceUpdate();
    i18n.offChangeLocale(this._invalidate);
  }

  // handleSubmit(event) {
  // }

  renderMakers() {
    // console.log("renderMakers: ", this.props.makers);
    const makers = this.props.makers;
    return makers.map(maker => (
      <option
        key={maker._id}
        value={maker.serverKey}
      >
        {maker.englishName} {maker.chineseName}
      </option>
    ));
  }

  renderCarClass() {
    // console.log("renderCarClass: ", this.props.maker);
    const maker = this.props.maker;
    const carclasses = CarClasses.find({ 'maker.id': maker }, { sort: { name: 1 } }).fetch();
    return carclasses.map(carclass => (
      <option key={carclass._id} value={carclass._id}>{carclass.name}</option>
    ));
  }

  renderCarModel() {
    // console.log("renderCarModel: ", this.props.carclass);
    const carclass = this.props.carclass;
    const carmodels = CarModels.find({ 'carclass.id': carclass }, { sort: { name: 1 } }).fetch();
    return carmodels.map(carmodel => (
      <option key={carmodel._id} value={carmodel.name}>{carmodel.name}</option>
    ));
  }

  renderCarYear() {
    const caryears = CarYears.find({}, { sort: { car28Value: 1 } });
    return caryears.map(caryear => (
      <option key={caryear.car28Value} value={caryear.car28Value}>{caryear.name}</option>
    ));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} action="/search/#results" method="get">
        <div className="form-group">
          <input type="hidden" name="buysellcar" value={this.props.buysellcar} />
          <ul className="nav nav-tabs nav-justified ">
            <li role="presentation" className={this.props.buysellcar === '1' ? 'active' : ''}>
              <a
                href="#"
                onClick={e => this.props.handleClick(e, '1')}
              >
                <T>common.homepage.i-am-a-seller</T>
              </a>
            </li>
            <li role="presentation" className={this.props.buysellcar === '0' ? 'active' : ''}>
              <a
                href="#"
                onClick={e => this.props.handleClick(e, '0')}
              >
                <T>common.homepage.i-am-a-buyer</T>
              </a>
            </li>
          </ul>
        </div>
        <div className="form-group">
          <select
            className="form-control"
            name="maker"
            // ref="makerSelect"
            value={this.props.maker}
            onChange={this.props.onFilterInput}
          >
            <option value="">{i18n.__('common.searchform.maker')}</option>
            {this.renderMakers()}
          </select>
        </div>
        <div className="form-group">
          <select
            className="form-control"
            name="carclass"
            // ref="carClassesSelect"
            value={this.props.carclass}
            disabled={!this.props.maker}
            onChange={this.props.onFilterInput}
          >
            <option value="">{i18n.__('common.searchform.class')}</option>
            {this.renderCarClass()}
          </select>
        </div>
        <div className="form-group">
          <select
            className="form-control"
            name="carmodel"
            // ref="makerSelect"
            value={this.props.carmodel}
            disabled={!this.props.carclass || !this.props.maker}
            onChange={this.props.onFilterInput}
          >
            <option value="">{i18n.__('common.searchform.model')}</option>
            {this.renderCarModel()}
          </select>
        </div>
        <div className="form-group">
          <select
            className="form-control"
            // ref="yearSelect"
            name="years"
            value={this.props.years}
            disabled={!this.props.carmodel || !this.props.carclass || !this.props.maker}
            onChange={this.props.onFilterInput}
          >
            <option value="">{i18n.__('common.searchform.year')}</option>
            {this.renderCarYear()}
          </select>
        </div>
        {this.props.buysellcar === '1' &&
        <div className="form-group">
          <select
            className="form-control"
            name="numberOfPreviousOwner"
            value={this.props.numberOfPreviousOwner}
            onChange={this.props.onFilterInput}
            disabled={!this.props.years}
          >
            <option>{i18n.__('common.searchform.number-of-previous-owner')}</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">{i18n.__('common.searchform.5-or-above')}</option>
          </select>
        </div>
        }
        <button
          type="submit"
          disabled={!this.props.carmodel}
          className="btn btn-lg btn-block btn-search"
        >
          {i18n.__('common.searchform.search')}
        </button>
      </form>
    );
  }
}

FilterableCarForm.propTypes = {
  // loading: PropTypes.bool.isRequired,
  buysellcar: PropTypes.string.isRequired,
  numberOfPreviousOwner: PropTypes.string.isRequired,
  carmodel: PropTypes.instanceOf(CarModels).isRequired,
  maker: PropTypes.string.isRequired,
  onFilterInput: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  years: PropTypes.string.isRequired,
  carclass: PropTypes.instanceOf(CarClasses).isRequired,
  makers: PropTypes.arrayOf(Object).isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('cars.list');
  return {
    loading: !subscription.ready(),
  };
})(FilterableCarForm);
