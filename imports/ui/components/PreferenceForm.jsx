/* eslint-disable class-methods-use-this */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import FormValidator from '../components/FormValidator';
//import { Bert } from 'meteor/themeteorchef:bert';
// import i18n from 'meteor/universe:i18n';


const T = i18n.createComponent();

export default class PreferenceForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: 'preferenceCar',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.preference-car-required',
      },
      {
        field: 'colourCar',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.colour-required',
      },
      {
        field: 'typeCar',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.type-car-required',
      },
      {
        field: 'poweredBy',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.powered-by-required',
      },
    ]);
    this.state = {
      error: '',
      preference: this.props.preference,
      success: '',
      validation: this.validator.valid(),
    };
  }

  componentDidMount() {
    this._invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this._invalidate);


  }

  componentWillUnmount() {
    // this._invalidate = () => this.forceUpdate();
    i18n.offChangeLocale(this._invalidate);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.validator.validate(this.state.preference);
    this.setState({ validation });
    this.submitted = true;
    var sttimeout;
    if (validation.isValid) {
      const doc = this.state.preference;

      delete doc.error;
      if (this.props.isEdit) {
        Meteor.call('userpreferences.update', doc, (err) => {
          if (err) {
            this.setState({
              error: err.reason,
            });

          } else {

            this.setState({
              success: i18n.__('preference-updated-successfully!'),
            });
          }
        });
      } else {
        Meteor.call('userpreferences.insert', doc, (err) => {
          if (err) {
            this.setState({
              error: err.reason,

            });

          } else {
            success: i18n.__('preference-saved-successfully!');
            $('#modalPreference').modal('show');
            sttimeout = setTimeout(function () {
              window.location.href = '/';
            }, 5000);
            //this.props.history.push('/marketplace');
          }
        });
      }
    }
  }

  handleInputChange = (e) => {
    const target = e.target;
    console.log('target ', target);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const preference = this.state.preference;


    if (name === 'thirdParty') {
      const checkboxValue = target.value;

      this.setState((preState, props) => {
        let current = preState.preference.thirdParty;

        const index = current.indexOf(checkboxValue);
        current = current.filter((_, i) => i !== index);
        // console.log('======current=======', current);
        if (index < 0) {
          preference[name] = [...current, checkboxValue];
        } else {
          preference[name] = current;
        }
        return {
          preference,
        };
      });
    } else if (name == 'preferenceCar') {
      const checkboxValue = target.value;

      this.setState((preState, props) => {
        let current = preState.preference.preferenceCar;
        console.log("current value ", current);
        const index = current.indexOf(checkboxValue);
        current = current.filter((_, i) => i !== index);
        // console.log('======current=======', current);
        if (index < 0) {
          preference[name] = [...current, checkboxValue];
        } else {
          preference[name] = current;
        }
        return {
          preference,
        };
      });
    } else if (name == 'colourCar') {
      const checkboxValue = target.value;

      this.setState((preState, props) => {
        let current = preState.preference.colourCar;

        const index = current.indexOf(checkboxValue);
        current = current.filter((_, i) => i !== index);
        // console.log('======current=======', current);
        if (index < 0) {
          preference[name] = [...current, checkboxValue];
        } else {
          preference[name] = current;
        }
        return {
          preference,
        };
      });
    } else if (name == 'typeCar') {
      const checkboxValue = target.value;

      this.setState((preState, props) => {
        let current = preState.preference.typeCar;

        const index = current.indexOf(checkboxValue);
        current = current.filter((_, i) => i !== index);
        // console.log('======current=======', current);
        if (index < 0) {
          preference[name] = [...current, checkboxValue];
        } else {
          preference[name] = current;
        }
        return {
          preference,
        };
      });
    } else if (name == 'poweredBy') {
      const checkboxValue = target.value;

      this.setState((preState, props) => {
        let current = preState.preference.poweredBy;

        const index = current.indexOf(checkboxValue);
        current = current.filter((_, i) => i !== index);
        // console.log('======current=======', current);
        if (index < 0) {
          preference[name] = [...current, checkboxValue];
        } else {
          preference[name] = current;
        }
        return {
          preference,
        };
      });
    } else if (name = 'transmission') {
      const checkboxValue = target.value;

      this.setState((preState, props) => {
        let current = preState.preference.transmission;

        const index = current.indexOf(checkboxValue);
        current = current.filter((_, i) => i !== index);
        // console.log('======current=======', current);
        if (index < 0) {
          preference[name] = [...current, checkboxValue];
        } else {
          preference[name] = current;
        }
        return {
          preference,
        };
      });
    }
    else {
      preference[name] = value;
      this.setState({
        preference,
      });
    }
  }


  render() {


    const { error, success, preference } = this.state;
    console.log('=======preference========: ', preference);
    const validation = this.submitted ?
      this.validator.validate(preference) : this.state.validation;

    return (
      <div>
        <form
          id="reference-form"
          className="form col-md-12 center-block"
          onSubmit={this.handleSubmit}
        >
          {/* {error.length > 0 ?
          <div className="alert alert-danger fade in" role="alert">{error}</div>
          : ''
        } */}
          {/* {success.length > 0 ?
          <div className="alert alert-success fade in" role="alert">{success}</div>
          : ''
        } */}
          {/* <div className={validation.preferenceCar.isInvalid ? 'form-group has-error' : 'form-group'}>
          <select
            name="preferenceCar"
            className="form-control custom-select"
            value={this.state.preference.preferenceCar}
            onChange={this.handleInputChange}
          >
            <option value="">{i18n.__('common.profile.your-preference-on-car')}</option>
            <option value="1">{i18n.__('common.profile.brand-new')}</option>
            <option value="2">{i18n.__('common.profile.used-car-less-than-7-years-from-manufacturing-day')}</option>
            <option value="3">{i18n.__('common.profile.used-car-7-years-or-above-from-manufacturing-day')}</option>
            <option value="4">{i18n.__('common.profile.used-car-no-preference-on-car-life')}</option>
          </select>
          <span className="help-block"><T>{validation.preferenceCar.message}</T></span>
        </div> */}
          <div className="form-group">
            <label htmlFor="preferenceCar">
              <T>common.profile.your-preference-on-car</T>
            </label>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.brand-new</T>
                    <input
                      type="checkbox"
                      name="preferenceCar"
                      value="1"
                      checked={this.state.preference.preferenceCar && this.state.preference.preferenceCar.indexOf('1') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.used-car-less-than-7-years-from-manufacturing-day</T>
                    <input
                      type="checkbox"
                      name="preferenceCar"
                      value="2"
                      checked={this.state.preference.preferenceCar && this.state.preference.preferenceCar.indexOf('2') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.used-car-7-years-or-above-from-manufacturing-day</T>
                    <input
                      type="checkbox"
                      name="preferenceCar"
                      value="3"
                      checked={this.state.preference.preferenceCar && this.state.preference.preferenceCar.indexOf('3') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.used-car-no-preference-on-car-life</T>
                    <input
                      type="checkbox"
                      name="preferenceCar"
                      value="4"
                      checked={this.state.preference.preferenceCar && this.state.preference.preferenceCar.indexOf('4') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>


          </div>

          {/* <div className={validation.colourCar.isInvalid ? 'form-group has-error' : 'form-group'}>
          <select
            name="colourCar"
            className="form-control custom-select"
            value={this.state.preference.colourCar}
            onChange={this.handleInputChange}
          >
            <option value="">{i18n.__('common.profile.colour-of-car')}</option>
            <option value="1">{i18n.__('common.profile.black')}</option>
            <option value="2">{i18n.__('common.profile.white')}</option>
            <option value="3">{i18n.__('common.profile.silver')}</option>
            <option value="4">{i18n.__('common.profile.blue')}</option>
            <option value="5">{i18n.__('common.profile.red')}</option>
            <option value="6">{i18n.__('common.profile.yellow')}</option>
            <option value="7">{i18n.__('common.profile.metallic-grey')}</option>
            <option value="8">{i18n.__('common.profile.orange')}</option>
            <option value="9">{i18n.__('common.profile.green')}</option>
            <option value="10">{i18n.__('common.profile.others')}</option>
          </select>
          <span className="help-block"><T>{validation.colourCar.message}</T></span>
        </div> */}

          <div className="form-group">
            <label htmlFor="colourCar">
              <T>common.profile.colour-of-car</T>
            </label>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.white</T>
                    <input
                      type="checkbox"
                      name="colourCar"
                      value="1"
                      checked={this.state.preference.colourCar && this.state.preference.colourCar.indexOf('1') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.black</T>
                    <input
                      type="checkbox"
                      name="colourCar"
                      value="2"
                      checked={this.state.preference.colourCar && this.state.preference.colourCar.indexOf('2') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.orange</T>
                    <input
                      type="checkbox"
                      name="colourCar"
                      value="3"
                      checked={this.state.preference.colourCar && this.state.preference.colourCar.indexOf('3') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.silver</T>
                    <input
                      type="checkbox"
                      name="colourCar"
                      value="4"
                      checked={this.state.preference.colourCar && this.state.preference.colourCar.indexOf('4') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.blue</T>
                    <input
                      type="checkbox"
                      name="colourCar"
                      value="5"
                      checked={this.state.preference.colourCar && this.state.preference.colourCar.indexOf('5') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.red</T>
                    <input
                      type="checkbox"
                      name="colourCar"
                      value="6"
                      checked={this.state.preference.colourCar && this.state.preference.colourCar.indexOf('6') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.yellow</T>
                    <input
                      type="checkbox"
                      name="colourCar"
                      value="7"
                      checked={this.state.preference.colourCar && this.state.preference.colourCar.indexOf('7') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.metallic-grey</T>
                    <input
                      type="checkbox"
                      name="colourCar"
                      value="8"
                      checked={this.state.preference.colourCar && this.state.preference.colourCar.indexOf('8') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.green</T>
                    <input
                      type="checkbox"
                      name="colourCar"
                      value="9"
                      checked={this.state.preference.colourCar && this.state.preference.colourCar.indexOf('9') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>


              </div>


            </div>

            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.others</T>
                    <input
                      type="checkbox"
                      name="colourCar"
                      value="10"
                      checked={this.state.preference.colourCar && this.state.preference.colourCar.indexOf('10') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

              </div>
            </div>
          </div>
          {/* <div className={validation.typeCar.isInvalid ? 'form-group has-error' : 'form-group'}>
          <select
            name="typeCar"
            className="form-control custom-select"
            value={this.state.preference.typeCar}
            onChange={this.handleInputChange}
          >
            <option value="">{i18n.__('common.profile.type-of-car')}</option>
            <option value="1">{i18n.__('common.profile.sedan')}</option>
            <option value="2">{i18n.__('common.profile.suv')}</option>
            <option value="3">{i18n.__('common.profile.couple')}</option>
            <option value="4">{i18n.__('common.profile.hatchback')}</option>
            <option value="5">{i18n.__('common.profile.mpv')}</option>
            <option value="6">{i18n.__('common.profile.van')}</option>
            <option value="7">{i18n.__('common.profile.motorcycle')}</option>
          </select>
          <span className="help-block"><T>{validation.typeCar.message}</T></span>
        </div> */}
          <div className="form-group">
            <label htmlFor="typeCar">
              <T>common.profile.type-of-car</T>
            </label>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.sedan</T>
                    <input
                      type="checkbox"
                      name="typeCar"
                      value="1"
                      checked={this.state.preference.typeCar && this.state.preference.typeCar.indexOf('1') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.suv</T>
                    <input
                      type="checkbox"
                      name="typeCar"
                      value="2"
                      checked={this.state.preference.typeCar && this.state.preference.typeCar.indexOf('2') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.couple</T>
                    <input
                      type="checkbox"
                      name="typeCar"
                      value="3"
                      checked={this.state.preference.typeCar && this.state.preference.typeCar.indexOf('3') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

              </div>
            </div>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.hatchback</T>
                    <input
                      type="checkbox"
                      name="typeCar"
                      value="4"
                      checked={this.state.preference.typeCar && this.state.preference.typeCar.indexOf('4') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.mpv</T>
                    <input
                      type="checkbox"
                      name="typeCar"
                      value="5"
                      checked={this.state.preference.typeCar && this.state.preference.typeCar.indexOf('5') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.van</T>
                    <input
                      type="checkbox"
                      name="typeCar"
                      value="6"
                      checked={this.state.preference.typeCar && this.state.preference.typeCar.indexOf('6') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.motorcycle</T>
                    <input
                      type="checkbox"
                      name="typeCar"
                      value="7"
                      checked={this.state.preference.typeCar && this.state.preference.typeCar.indexOf('7') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
          </div>


          {/* <div className={validation.poweredBy.isInvalid ? 'form-group has-error' : 'form-group'}>
          <select
            name="poweredBy"
            className="form-control custom-select"
            value={this.state.preference.poweredBy}
            onChange={this.handleInputChange}
          >
            <option value="">{i18n.__('common.profile.powered-by')}</option>
            <option value="1">{i18n.__('common.profile.hybrid')}</option>
            <option value="2">{i18n.__('common.profile.electricity')}</option>
            <option value="3">{i18n.__('common.profile.petrol')}</option>
            <option value="4">{i18n.__('common.profile.diesel')}</option>
          </select>
          <span className="help-block"><T>{validation.poweredBy.message}</T></span>
        </div> */}

          <div className="form-group">
            <label htmlFor="poweredBy">
              <T>common.profile.powered-by</T>
            </label>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.hybrid</T>
                    <input
                      type="checkbox"
                      name="poweredBy"
                      value="1"
                      checked={this.state.preference.poweredBy && this.state.preference.poweredBy.indexOf('1') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.electricity</T>
                    <input
                      type="checkbox"
                      name="poweredBy"
                      value="2"
                      checked={this.state.preference.poweredBy && this.state.preference.poweredBy.indexOf('2') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.petrol</T>
                    <input
                      type="checkbox"
                      name="poweredBy"
                      value="3"
                      checked={this.state.preference.poweredBy && this.state.preference.poweredBy.indexOf('3') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.diesel</T>
                    <input
                      type="checkbox"
                      name="poweredBy"
                      value="4"
                      checked={this.state.preference.poweredBy && this.state.preference.poweredBy.indexOf('4') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>




              </div>
            </div>

          </div>

          {/* <div className="form-group transmission">
          <label htmlFor="transmission" className={'no-padding'}>
            <T>common.profile.transmission</T>
          </label>
          <div className="radio">
            <div className="radio-group">
              <input
                type="radio"
                id="option-one"
                name="transmission"
                value="MT"
                checked={this.state.preference.transmission === 'MT'}
                onChange={this.handleInputChange}
              />
              <label
                htmlFor="option-one"
              >
                <T>common.profile.manual</T>
              </label>
              <input
                type="radio"
                id="option-two"
                name="transmission"
                value="AT"
                checked={this.state.preference.transmission === 'AT'}
                onChange={this.handleInputChange}
              />
              <label
                htmlFor="option-two"
              >
                <T>common.profile.automation</T>
              </label>
            </div>
          </div>
        </div> */}

          <div className="form-group">
            <label htmlFor="transmission">
              <T>common.profile.transmission</T>
            </label>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.manual</T>
                    <input
                      type="checkbox"
                      name="transmission"
                      value="1"
                      checked={this.state.preference.transmission && this.state.preference.transmission.indexOf('1') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.automation</T>
                    <input
                      type="checkbox"
                      name="transmission"
                      value="2"
                      checked={this.state.preference.transmission && this.state.preference.transmission.indexOf('2') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="drivingFrequency">
              <T>common.profile.driving-frequency</T>
            </label>
            <div className="row">
              <div className="radio">
                <div className="col-md-4">
                  <label className="custom-radio"><T>common.profile.weekend-only</T>
                    <input
                      type="radio"
                      name="drivingFrequency"
                      value="1"
                      checked={this.state.preference.drivingFrequency === '1'}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark-radio" />
                  </label>
                </div>
                <div className="col-md-4">
                  <label className="custom-radio"><T>common.profile.1-2-days-week</T>
                    <input
                      type="radio"
                      name="drivingFrequency"
                      value="2"
                      checked={this.state.preference.drivingFrequency === '2'}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark-radio" />
                  </label>
                </div>
                <div className="col-md-4">
                  <label className="custom-radio"><T>common.profile.3-5-days-week</T>
                    <input
                      type="radio"
                      name="drivingFrequency"
                      value="3"
                      checked={this.state.preference.drivingFrequency === '3'}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark-radio" />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="radio">
                <div className="col-md-4">
                  <label className="custom-radio"><T>common.profile.6-7-days-week</T>
                    <input
                      type="radio"
                      name="drivingFrequency"
                      value="4"
                      checked={this.state.preference.drivingFrequency === '4'}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark-radio" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="thirdParty">
              <T>common.profile.3rd-party-vs-comprehensive-insurance-consideration</T>
            </label>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.car-value</T>
                    <input
                      type="checkbox"
                      name="thirdParty"
                      value="1"
                      checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('1') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.new-car-or-used-car</T>
                    <input
                      type="checkbox"
                      name="thirdParty"
                      value="2"
                      checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('2') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.car-model</T>
                    <input
                      type="checkbox"
                      name="thirdParty"
                      value="3"
                      checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('3') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.car-frequent-activity-area</T>
                    <input
                      type="checkbox"
                      name="thirdParty"
                      value="4"
                      checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('4') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.cross-border-car</T>
                    <input
                      type="checkbox"
                      name="thirdParty"
                      value="5"
                      checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('5') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.insurance-premium</T>
                    <input
                      type="checkbox"
                      name="thirdParty"
                      value="6"
                      checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('6') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="checkbox">
                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.driving-experience</T>
                    <input
                      type="checkbox"
                      name="thirdParty"
                      value="7"
                      checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('7') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="col-md-4">
                  <label className="custom-checkbox"><T>common.profile.other-please-specific</T>
                    <input
                      type="checkbox"
                      name="thirdParty"
                      value="8"
                      checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('8') >= 0}
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group" style={{ textAlign: 'right', marginTop: '77px', marginBottom: '100px' }}>
            <button type="" className="btn btn-default custom-btn btn-back"><T>common.profile.back</T></button>
            <button type="submit" className="btn btn-default custom-btn btn-save"><T>common.profile.save</T></button>
          </div>
        </form>

        <div className="modal fade" id="modalPreference" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-body">
                <div className="congratulations_pop">
                  <p>Congratulations, add preference succeed!</p>
                  <ul>
                    <li><a href="#">Get a Quote </a></li>
                    <li><a href="/marketplace">Marketplace </a></li>
                    <li><a href="#">Upload Car </a></li>
                    <li><a href="/">Home(5) </a></li>
                  </ul>
                  <div className="clearfix"></div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

PreferenceForm.defaultProps = {
  preference: {
    preferenceCar: ['1'],
    colourCar: ['1'],
    typeCar: ['1'],
    poweredBy: ['1'],
    transmission: ['1'],
    drivingFrequency: '1',
    thirdParty: ['1'],
  },
};

PreferenceForm.propTypes = {
  preference: PropTypes.object,
  history: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

