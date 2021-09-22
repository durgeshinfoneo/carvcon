/* eslint-disable class-methods-use-this */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import FormValidator from '../components/FormValidator';

const T = i18n.createComponent();

export default class UserCompanyForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Name is required.',
      },
      {
        field: 'crbrNumber',
        method: 'isEmpty',
        validWhen: false,
        message: 'CR/BR Number is required.',
      },
      {
        field: 'address',
        method: 'isEmpty',
        validWhen: false,
        message: 'Address is required.',
      },
      {
        field: 'contactPerson',
        method: 'isEmpty',
        validWhen: false,
        message: 'Contact Person is required.',
      },
      {
        field: 'contactMobileNumber',
        method: 'isEmpty',
        validWhen: false,
        message: 'Contact Mobile Number is required.',
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Email is required.',
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'That is not a valid email.',
      },
      {
        field: 'coreBusiness',
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required.',
      },
      {
        field: 'sourceUsedCar',
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required.',
      },
      {
        field: 'marketing',
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required.',
      },
      {
        field: 'mostRevenues',
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required.',
      },
      {
        field: 'mostPopular',
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required.',
      },
      {
        field: 'notSold',
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required.',
      },
    ]);
    this.state = {
      error: '',
      company: this.props.company,
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
    const { company } = this.state;
    const validation = this.validator.validate(company);
    // console.log('=====handleSubmit=validation=========: ', validation);
    this.setState({ validation });
    this.submitted = true;
    if (validation.isValid) {
      const doc = company;
      delete doc.error;
      delete doc.allow_display_name;
      delete doc.allow_utf8_local_part;
      delete doc.require_display_name;
      delete doc.require_tld;
      if (this.props.isEdit) {
        Meteor.call('usercompanies.update', doc, (err) => {
          if (err) {
            this.setState({
              error: err.reason,
            });
          } else {
            this.setState({
              success: 'Company updated successful!',
            });
          }
        });
      } else {
        Meteor.call('usercompanies.insert', doc, (err) => {
          if (err) {
            this.setState({
              error: err.reason,
            });
          } else {
            this.props.history.push('/');
          }
        });
      }
    }
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const company = this.state.company;
    console.log('name: ', name);
    console.log('value: ', value);
    company[name] = value;
    this.setState({
      company,
    });
  }

  render() {
    const { error, success, company } = this.state;
    // console.log('=======company========: ', company);
    const validation = this.submitted ?
      this.validator.validate(company) : this.state.validation;
    // console.log('========validation========', validation);
    return (
      <form
        id="company-form"
        className="dealer-form"
        onSubmit={this.handleSubmit}
      >
        {error.length > 0 ?
          <div className="alert alert-danger fade in" role="alert">{error}</div>
          : ''
        }
        {success.length > 0 ?
          <div className="alert alert-success fade in" role="alert">{success}</div>
          : ''
        }
        <div className={validation.name.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.company-name</T>
              </label>
            </div>

            <div className="col-md-8">
              <input
                name="name"
                type="text"
                className="form-control"
                value={this.state.company.name}
                onChange={this.handleInputChange}
              />
              <span className="help-block">{validation.name.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.crbrNumber.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.cr-number-br-number</T>
              </label>
            </div>

            <div className="col-md-8">
              <input
                name="crbrNumber"
                type="text"
                className="form-control"
                value={this.state.company.crbrNumber}
                onChange={this.handleInputChange}
              />
              <span className="help-block">{validation.crbrNumber.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.address.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.company-address</T>
              </label>
            </div>

            <div className="col-md-8">
              <input
                name="address"
                type="text"
                className="form-control"
                value={this.state.company.address}
                onChange={this.handleInputChange}
              />
              <span className="help-block">{validation.address.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.contactPerson.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.contact-person</T>
              </label>
            </div>

            <div className="col-md-8">
              <input
                name="contactPerson"
                type="text"
                className="form-control"
                value={this.state.company.contactPerson}
                onChange={this.handleInputChange}
              />
              <span className="help-block">{validation.contactPerson.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.contactMobileNumber.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.contact-mobile-number</T>
              </label>
            </div>

            <div className="col-md-8">
              <input
                name="contactMobileNumber"
                type="text"
                className="form-control"
                value={this.state.company.contactMobileNumber}
                onChange={this.handleInputChange}
              />
              <span className="help-block">{validation.contactMobileNumber.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.email.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.email</T>
              </label>
            </div>

            <div className="col-md-8">
              <input
                name="email"
                type="email"
                className="form-control"
                value={this.state.company.email}
                onChange={this.handleInputChange}
              />
              <span className="help-block">{validation.email.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.coreBusiness.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.core-business</T>
              </label>
            </div>

            <div className="col-md-8">
              <input
                name="coreBusiness"
                type="text"
                className="form-control"
                value={this.state.company.coreBusiness}
                onChange={this.handleInputChange}
              />
              <span className="help-block">{validation.coreBusiness.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.sourceUsedCar.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.how-you-source-used-car</T>
              </label>
            </div>

            <div className="col-md-8">
              <select
                name="sourceUsedCar"
                className="form-control custom-select"
                value={this.state.company.sourceUsedCar}
                onChange={this.handleInputChange}
              >
                <option value="">{i18n.__('common.profile.your-source-used-car')}</option>
                <option value="1">{i18n.__('common.profile.walkin-individuals')}</option>
                <option value="2">{i18n.__('common.profile.online-resource')}</option>
                <option value="3">{i18n.__('common.profile.from-other-traders')}</option>
                <option value="4">{i18n.__('common.profile.others')}</option>
              </select>
              <span className="help-block">{validation.sourceUsedCar.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.marketing.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.how-you-do-marketing</T>
              </label>
            </div>

            <div className="col-md-8">
              <select
                name="marketing"
                className="form-control custom-select"
                value={this.state.company.marketing}
                onChange={this.handleInputChange}
              >
                <option value="">{i18n.__('common.profile.your-marketing')}</option>
                <option value="1">{i18n.__('common.profile.online-digital-marketing')}</option>
                <option value="2">{i18n.__('common.profile.television-radio-advertisements')}</option>
                <option value="3">{i18n.__('common.profile.magazines')}</option>
                <option value="4">{i18n.__('common.profile.through-other-business-partners')}</option>
                <option value="5">{i18n.__('common.profile.other-traditional-advertisements')}</option>
                <option value="6">{i18n.__('common.profile.no-marketing')}</option>
              </select>
              <span className="help-block">{validation.marketing.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.mostRevenues.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.which-contribute-most-revenues</T>
              </label>
            </div>

            <div className="col-md-8">
              <select
                name="mostRevenues"
                className="form-control custom-select"
                value={this.state.company.mostRevenues}
                onChange={this.handleInputChange}
              >
                <option value="">{i18n.__('common.profile.your-revenues')}</option>
                <option value="1">{i18n.__('common.profile.used-car-trading')}</option>
                <option value="2">{i18n.__('common.profile.car-maintenance-checking')}</option>
                <option value="3">{i18n.__('common.profile.accessories-parts-trading')}</option>
                <option value="4">{i18n.__('common.profile.car-loan-insurance-referral')}</option>
                <option value="5">{i18n.__('common.profile.advertisement')}</option>
                <option value="6">{i18n.__('common.profile.others')}</option>
              </select>
              <span className="help-block">{validation.mostRevenues.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.mostPopular.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.which-brand-of-car-most-popular</T>
              </label>
            </div>

            <div className="col-md-8">
              <input
                name="mostPopular"
                type="text"
                className="form-control"
                value={this.state.company.mostPopular}
                onChange={this.handleInputChange}
              />
              <span className="help-block">{validation.mostPopular.message}</span>
            </div>
          </div>
        </div>

        <div className={validation.notSold.isInvalid ? 'form-group has-error' : 'form-group'}>
          <div className="row">
            <div className="col-md-4">
              <label className="dealer-form-label">
                <T>common.profile.how-to-dispose-used-car-which-could-not-be-sold</T>
              </label>
            </div>

            <div className="col-md-8">
              <select
                name="notSold"
                className="form-control custom-select"
                value={this.state.company.notSold}
                onChange={this.handleInputChange}
              >
                <option value="">{i18n.__('common.profile.select')}</option>
                <option value="1">{i18n.__('common.profile.destroy')}</option>
                <option value="2">{i18n.__('common.profile.sell-to-overseas')}</option>
                <option value="3">{i18n.__('common.profile.donation')}</option>
                <option value="4">{i18n.__('common.profile.dismantle-accessories-parts-for-selling')}</option>
                <option value="5">{i18n.__('common.profile.others')}</option>
              </select>
              <span className="help-block">{validation.notSold.message}</span>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ textAlign: 'right' }}>
          <button className="btn btn-default custom-btn btn-back">
            <T>common.profile.back</T>
          </button>
          <button type="submit" className=" ">
            <T>common.profile.save</T>
          </button>
        </div>
      </form>
    );
  }
}

UserCompanyForm.defaultProps = {
  company: {
    name: '',
    crbrNumber: '',
    address: '',
    contactPerson: '',
    contactMobileNumber: '',
    email: '',
    coreBusiness: '',
    sourceUsedCar: '',
    marketing: '',
    mostRevenues: '',
    mostPopular: '',
    notSold: '',
  },
};

UserCompanyForm.propTypes = {
  company: PropTypes.object,
  history: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

