/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import i18n from 'meteor/universe:i18n';

import Makers from '../../api/makers/makers';
import CarModels from '../../api/carmodels/carmodels';
import CarClasses from '../../api/carclasses/carclasses';

import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

const T = i18n.createComponent();
// App component - represents the whole app
class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carmodel: '',
      years: '',
      carclass: '',
      maker: '',
      language: 'en',
    };
    this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
  }

  componentDidMount() {
    this._invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this._invalidate);
  }

  componentWillUnmount() {
    i18n.off(this._invalidate);
  }

  handleSubmit(event) {
    // event.preventDefault();
    console.log('submit form home page');
  }

  handleClick() {
    console.log('click home page');
  }

  handleFilterInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'carmodel') {
      this.setState({
        years: '23',
        [name]: value,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  renderMakers() {
    const makers = this.props.makers;
    return makers.map(maker => (
      <option key={maker.serverKey} value={maker.serverKey}>{maker.englishName}</option>
    ));
  }

  renderCarClass() {
    const maker = this.state.maker;
    const carclasses = CarClasses.find({ makerId: maker }, { sort: { name: 1 } }).fetch();
    return carclasses.map(carclass => (
      <option key={carclass._id} value={carclass._id}>{carclass.name}</option>
    ));
  }

  renderCarModel() {
    const carclass = this.state.carclass;
    const carmodels = CarModels.find({ carclassId: carclass }, { sort: { name: 1 } }).fetch();
    return carmodels.map(carmodel => (
      <option key={carmodel._id} value={carmodel.name}>{carmodel.name}</option>
    ));
  }

  render() {
    return (
      <div className="container-fluid bg">
        <div>
          <img className="logo" src="logo.png" alt="Logo" />
        </div>
        <div className="inner">
          <form
            className="form-inline"
            action="/search"
            method="get"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <div className="input-group">
              {/* <div className="form-group">
                <input name="carmodel" type="text" className="form-control search"
                  placeholder="Car model"
                  aria-describedby="basic-addon2" style={{width: '300px'}}/>
              </div> */}

              <div className="form-group">
                <select
                  name="maker"
                  className="form-control search-input search"
                  value={this.state.maker}
                  onChange={this.handleFilterInputChange}
                >
                  <option value="">{i18n.__('common.searchform.maker')}</option>
                  {this.renderMakers()}
                </select>
              </div>
              <div className="form-group">
                <select
                  name="carclass"
                  className="form-control search-input search"
                  value={this.state.carclass}
                  onChange={this.handleFilterInputChange}
                >
                  <option value="">{i18n.__('common.searchform.class')}</option>
                  {this.renderCarClass()}
                </select>
              </div>
              <div className="form-group">
                <select
                  name="carmodel"
                  className="form-control search-input search"
                  value={this.state.carmodel}
                  onChange={this.handleFilterInputChange}
                >
                  <option value="">{i18n.__('common.searchform.model')}</option>
                  {this.renderCarModel()}
                </select>
              </div>

              <div className="form-group">
                <select
                  name="years"
                  value={this.state.years}
                  onChange={this.handleFilterInputChange}
                  className="form-control search-input search"
                >
                  <option value="">{i18n.__('common.searchform.year')}</option>
                  <option value="23">2018</option>
                  <option value="24">2017</option>
                  <option value="25">2016</option>
                  <option value="26">2015</option>
                  <option value="27">2014</option>
                  <option value="28">2013</option>
                  <option value="29">2012</option>
                  <option value="30">2011</option>
                  <option value="31">2010</option>
                  <option value="32">2009</option>
                  <option value="33">2008</option>
                  <option value="34">2007</option>
                  <option value="35">2006</option>
                  <option value="36">2005</option>
                  <option value="37">2004</option>
                  <option value="38">2003</option>
                  <option value="39">2002</option>
                  <option value="40">2001</option>
                  <option value="41">2000</option>
                  <option value="42">1999</option>
                  <option value="43">1998</option>
                </select>
              </div>



              <span className="input-group-btn">
                <button
                  className="btn btn-warning search"
                  type="submit"
                  onClick={this.handleClick.bind(this)}
                >
                  {i18n.__('common.searchform.search')}
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>

    );
  }
}


AppComponent.propTypes = {
  loading: PropTypes.bool,
  makers: PropTypes.array.isRequired,
  carmodels: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const handleMakers = Meteor.subscribe('makers.list');
  const handleCarModels = Meteor.subscribe('carmodels.list', {});
  const handleCarClass = Meteor.subscribe('carclasses.list');
  return {
    makers: Makers.find({}, { sort: { serverKey: 1 } }).fetch(),
    carmodels: CarModels.find({}).fetch(),
    loading: !handleMakers.ready() || !handleCarModels.ready() || !handleCarClass.ready(),
  };
})(AppComponent);
