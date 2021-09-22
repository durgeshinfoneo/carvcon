/* eslint-disable class-methods-use-this, jsx-a11y/href-no-hash,
react/no-unescaped-entities */
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { withTracker } from 'meteor/react-meteor-data';
import i18n from 'meteor/universe:i18n';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import Makers from '../../../api/makers/makers';
import CarClasses from '../../../api/carclasses/carclasses';
import CarYears from '../../../api/caryears/caryears';
import CarModels from '../../../api/carmodels/carmodels';
import Loading from '../../components/Loading/Loading';

const T = i18n.createComponent();
const searchQuery = new ReactiveVar(null);

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <span>
    {suggestion.fullname_search()}
  </span>
);

class NewFilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carmodel: '',
      years: '',
      maker: '',
      carclass: '',
      numberOfPreviousOwner: '',
      buysellcar: '0',
    };
    this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    if (value.length >= 2) {
      this.props.searchQuery.set(value);
    }
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.props.searchQuery.set(null);
  };

  onChange = (event, { newValue }) => {
    this.setState({
      carmodel: newValue,
    });

    const model = CarModels.findOne({ name: newValue });
    if (model) {
      console.log('=======onChange==========: ', model);
      this.setState({
        maker: model.maker.id,
        carclass: model.carclass.id,
      });
    }
  };

  handleClick = (e, value) => {
    e.preventDefault();
    this.setState({
      buysellcar: value,
    });
  }

  handleFilterInputChange = (event) => {
    // console.log('handleFilterInputChange');
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  renderCarYear() {
    const caryears = CarYears.find({}, { sort: { car28Value: 1 } });
    return caryears.map(caryear => (
      <option key={caryear.car28Value} value={caryear.car28Value}>{caryear.name}</option>
    ));
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

  render() {
    const { carmodel, buysellcar } = this.state;
    const { isClassic } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: i18n.__('common.homepage.car-brand-or-model'),
      name: 'carmodel',
      value: carmodel,
      onChange: this.onChange,
      required: true,
    };
    return (
      <div>
        <ul className="nav nav-tabs nav-justified ">
          <li role="presentation" className={this.state.buysellcar === '1' ? 'active' : ''}>
            <a
              href="#"
              onClick={e => this.handleClick(e, '1')}
            >
              <T>common.homepage.i-am-a-seller</T>
            </a>
          </li>
          <li role="presentation" className={this.state.buysellcar === '0' ? 'active' : ''}>
            <a
              href="#"
              onClick={e => this.handleClick(e, '0')}
            >
              <T>common.homepage.i-am-a-buyer</T>
            </a>
          </li>
        </ul>
        <form className="form-inline" method="get" action="/search/#results">
          <input
            type="hidden"
            name="buysellcar"
            value={this.state.buysellcar}
          />
          { isClassic ? (
            <div style={{ display: 'inline' }}>
              <div className="form-group">
                <select
                  className="form-control"
                  name="maker"
                  required
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
                  required
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
                  required
                  value={this.state.carmodel}
                  disabled={!this.state.carclass || !this.state.maker}
                  onChange={this.handleFilterInputChange}
                >
                  <option value="">{i18n.__('common.searchform.model')}</option>
                  {this.renderCarModel()}
                </select>
              </div>
            </div>
          ) : (
            <div style={{ display: 'inline' }}>
              <input
                type="hidden"
                name="maker"
                value={this.state.maker}
              />

              <input
                type="hidden"
                name="carclass"
                value={this.state.carclass}
              />
              <div className="form-group">
                <label className="sr-only" htmlFor="idCarModel">Car Model</label>
                <Autosuggest
                  suggestions={this.props.result}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
              </div>
            </div>
          )}


          <div className="form-group">
            <select
              className="form-control"
              autoComplete="off"
              name="years"
              required
              value={this.state.years}
              onChange={this.handleFilterInputChange}
            >
              <option value="">{i18n.__('common.searchform.year')}</option>
              {this.renderCarYear()}
            </select>
          </div>
          { buysellcar === '1' &&
            <div className="form-group">
              <select
                className="form-control"
                autoComplete="off"
                name="numberOfPreviousOwner"
                value={this.state.numberOfPreviousOwner}
                onChange={this.handleFilterInputChange}
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

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-xl"
              href="#"
            >
              <T>common.homepage.get-a-quote</T>
            </button>
          </div>
        </form>
      </div>

    );
  }
}

NewFilterForm.propTypes = {
  // loading: PropTypes.bool.isRequired,
  result: PropTypes.array.isRequired,
  searchQuery: PropTypes.object.isRequired,
  isClassic: PropTypes.bool.isRequired,
};

export default withTracker(({ isClassic }) => {
  const subscription = Meteor.subscribe('carmodels.search', searchQuery.get(), isClassic);
  const result = CarModels.find().fetch();
  // console.log('=====withTracker=======', isClassic);
  return {
    loading: !subscription.ready(),
    result,
    searchQuery,
  };
})(NewFilterForm);
