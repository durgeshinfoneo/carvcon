/* eslint-disable  class-methods-use-this, no-underscore-dangle,
react/sort-comp, jsx-a11y/href-no-hash */
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

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carmodel: '',
      years: '',
      maker: '',
      carclass: '',
      numberOfPreviousOwner: '',
      buysellcar: '0',
      formErrors: {
        years: '',
        carmodel: '',
        maker: '',
        carclass: '',
        numberOfPreviousOwner: '',
      },
      yearValid: false,
      carmodelValid: false,
      makerValid: false,
      carclassValid: false,
      numberOfPreviousOwnerValid: false,
      formValid: false,
    };
    this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    this.invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  renderMakers() {
    // console.log("renderMakers: ", this.props.makers);
    const makers = Makers.find({}, { sort: { serverKey: 1 } }).fetch();
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
    const maker = this.state.maker;
    const carclasses = CarClasses.find({ 'maker.id': maker }, { sort: { name: 1 } }).fetch();
    return carclasses.map(carclass => (
      <option
        key={carclass._id}
        value={carclass._id}
      >
        {carclass.name}
      </option>
    ));
  }

  renderCarModel() {
    // console.log("renderCarModel: ", this.props.carclass);
    const carclass = this.state.carclass;
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

  handleSubmit(event) {
  }

  handleButtonClick(event, value) {
    this.setState({
      buysellcar: value,
    });
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let yearValid = this.state.yearValid;
    let carclassValid = this.state.carclassValid;
    let carmodelValid = this.state.carmodelValid;
    let makerValid = this.state.makerValid;
    let numberOfPreviousOwnerValid = this.state.numberOfPreviousOwnerValid;
    switch (fieldName) {
      case 'years':
        yearValid = value !== '';
        fieldValidationErrors.years = yearValid ? '' : 'is invalid';
        break;
      case 'carmodel':
        carmodelValid = value !== '';
        fieldValidationErrors.carmodel = carmodelValid ? '' : 'is invalid';
        break;
      case 'maker':
        makerValid = value !== '';
        fieldValidationErrors.maker = makerValid ? '' : 'is invalid';
        break;
      case 'carclass':
        carclassValid = value !== '';
        fieldValidationErrors.carclass = carclassValid ? '' : 'is invalid';
        break;
      case 'numberOfPreviousOwner':
        numberOfPreviousOwnerValid = value !== '';
        fieldValidationErrors.numberOfPreviousOwner = numberOfPreviousOwnerValid ? '' : 'is invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      yearValid,
      carmodelValid,
      makerValid,
      carclassValid,
      numberOfPreviousOwnerValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.yearValid && this.state.carmodelValid && this.state.makerValid && this.state.carclassValid && this.state.numberOfPreviousOwnerValid,
    });
  }

  handleFilterInputChange(event) {
    console.log('handleFilterInputChange');
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('====name=====: ', name);
    console.log('====value====:', value);
    if (name === 'maker') {
      this.setState({
        carclass: '',
        carmodel: '',
        years: '',
        [name]: value,
      }, () => { this.validateField(name, value); });
    } else if (name === 'carclass') {
      this.setState({
        carmodel: '',
        years: '',
        [name]: value,
      }, () => { this.validateField(name, value); });
    } else if (name === 'carmodel') {
      this.setState({
        years: '23',
        yearValid: true,
        numberOfPreviousOwnerValid: true,
        [name]: value,
      }, () => {
        this.validateField(name, value);
      });
    } else if (name === 'years') {
      this.setState({
        numberOfPreviousOwner: '0',
        [name]: value,
      }, () => {
        this.validateField(name, value);
      });
    } else {
      this.setState({
        [name]: value,
      }, () => { this.validateField(name, value); });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} action="/search/#results" method="get">

        <p className="title"><T>common.homepage.i-want-to</T></p>

        <input
          type="hidden"
          name="buysellcar"
          value={this.state.buysellcar}
        />

        <div className="form-group">
          <button
            type="button"
            name="buysellbtn"
            value="0"
            onClick={e => this.handleButtonClick(e, '0')}
            className={`btn btn-pc ${this.state.buysellcar === '0' ? 'active' : ''}`}
          >
            <T>common.homepage.buy</T>
          </button>

          <button
            type="button"
            name="buysellbtnn"
            value="1"
            onClick={e => this.handleButtonClick(e, '1')}
            className={`btn btn-pc ${this.state.buysellcar !== '0' ? 'active' : ''}`}
          >
            <T>common.homepage.sell</T>
          </button>
        </div>

        <div className="form-group">
          <select
            className="form-control"
            name="maker"
            // ref="makerSelect"
            value={this.state.maker}
            onChange={this.handleFilterInputChange}
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
            value={this.state.carclass}
            disabled={!this.state.maker}
            onChange={this.handleFilterInputChange}
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
            value={this.state.carmodel}
            disabled={!this.state.carclass || !this.state.maker}
            onChange={this.handleFilterInputChange}
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
            value={this.state.years}
            disabled={!this.state.carmodel || !this.state.carclass || !this.state.maker}
            onChange={this.handleFilterInputChange}
          >
            <option value="">{i18n.__('common.searchform.year')}</option>
            {this.renderCarYear()}
          </select>
        </div>

        {this.state.buysellcar === '1' &&
        <div className="form-group">
          <select
            className="form-control"
            name="numberOfPreviousOwner"
            value={this.state.numberOfPreviousOwner}
            onChange={this.handleFilterInputChange}
            disabled={!this.state.years}
          >
            <option value="">{i18n.__('common.searchform.number-of-previous-owner')}</option>
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
          disabled={!this.state.formValid}
          className="btn btn-lg btn-block btn-search"
        >
          {i18n.__('common.searchform.search')}
        </button>

        <a
          style={{ padding: '10px' }}
          href="#"
          onClick={this.props.handleClickUI}
        >
          <T>common.homepage.simple</T>
        </a>
      </form>
    );
  }
}

FilterForm.PropTypes = {
  loading: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('cars.list');
  return {
    loading: !subscription.ready(),
  };
})(FilterForm);
