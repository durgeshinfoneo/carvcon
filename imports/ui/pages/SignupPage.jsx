/* eslint-disable class-methods-use-this, jsx-a11y/href-no-hash */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import i18n from 'meteor/universe:i18n';
import FormValidator from '../components/FormValidator';

const T = i18n.createComponent();

export default class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.email-required',
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'common.messages.invalid-email',
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.password-required',
      },
      {
        field: 'passwordConfirmation',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.password-confirmation-required',
      },
      {
        field: 'passwordConfirmation',
        method: this.passwordMatch, // notice that we are passing a custom function here
        validWhen: true,
        message: 'common.messages.password-not-match',
      },
      {
        field: 'firstName',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.firstname-required',
      },
      {
        field: 'lastName',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.lastname-required',
      },
      {
        field: 'phone',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.phone-required',
      },
      {
        field: 'age',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.age-required',
      },
    ]);
    this.state = {
      error: '',
      validation: this.validator.valid(),
      firstName: '',
      lastName: '',
      phone: '',
      age: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  componentDidMount() {
    this.invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    console.log("STATE",this.state);
    this.submitted = true;
    if (validation.isValid) {
      const { firstName, lastName, phone, age, email, password } = this.state;
      Accounts.createUser({
        email,
        profile: {
          firstName,
          lastName,
          phone,
          age,
        },
        password,
      }, (err) => {
        if (err) {
          this.setState({
            error: err.reason,
          });
          Bert.alert(err.reason, 'danger');
        } else {
          Meteor.call('users.sendVerificationEmail');
          Bert.alert(i18n.__('common.messages.welcome'), 'success');
          this.props.history.push('/preference');
        }
      });
    }
  }

  render() {
    const error = this.state.error;
    const validation = this.submitted ?
      this.validator.validate(this.state) : this.state.validation;
    return (
      <div className="col-xs-12 col-md-offset-4 col-md-4">
        <div className="content">
          { error.length > 0 ?
            <div className="alert alert-danger fade in">{error}</div>
            : ''}
          <form
            id="login-form"
            className="form col-md-12 center-block"
            onSubmit={this.handleSubmit}
          >
            <h3 className="login-title">
              <T>common.homepage.signup</T>
            </h3>
            <p>
              <T>common.profile.already-have-an-account</T>  <Link to="/login"><T>common.homepage.login</T></Link>
            </p>
            <div className={validation.firstName.isInvalid ? 'form-group has-error' : 'form-group'}>
              <input
                type="text"
                name="firstName"
                className="form-control custom-input"
                placeholder={i18n.__('common.profile.first-name')}
                onChange={this.handleInputChange}
              />
              <span className="help-block"><T>{validation.firstName.message}</T></span>
            </div>
            <div className={validation.lastName.isInvalid ? 'form-group has-error' : 'form-group'}>
              <input
                type="text"
                name="lastName"
                className="form-control custom-input"
                placeholder={i18n.__('common.profile.last-name')}
                onChange={this.handleInputChange}
              />
              <span className="help-block"><T>{validation.lastName.message}</T></span>
            </div>
            <div className={validation.email.isInvalid ? 'form-group has-error' : 'form-group'}>
              <input
                type="email"
                name="email"
                className="form-control custom-input"
                placeholder={i18n.__('common.profile.email')}
                onChange={this.handleInputChange}
              />
              <span className="help-block"><T>{validation.email.message}</T></span>
            </div>
            <div className={validation.phone.isInvalid ? 'form-group has-error' : 'form-group'}>
              <input
                type="text"
                name="phone"
                className="form-control custom-input"
                placeholder={i18n.__('common.profile.phone')}
                onChange={this.handleInputChange}
              />
              <span className="help-block"><T>{validation.phone.message}</T></span>
            </div>
            <div className={validation.password.isInvalid ? 'form-group has-error' : 'form-group'}>
              <input
                type="password"
                name="password"
                className="form-control custom-input"
                placeholder={i18n.__('common.profile.password')}
                onChange={this.handleInputChange}
              />
              <span className="help-block"><T>{validation.password.message}</T></span>
            </div>
            <div className={validation.passwordConfirmation.isInvalid ? 'form-group has-error' : 'form-group'}>
              <input
                type="password"
                name="passwordConfirmation"
                className="form-control custom-input"
                placeholder={i18n.__('common.profile.password-confirmation')}
                onChange={this.handleInputChange}
              />
              <span className="help-block"><T>{validation.passwordConfirmation.message}</T></span>
            </div>
            <div className={validation.age.isInvalid ? 'form-group has-error' : 'form-group'}>
              <select
                name="age"
                className="form-control custom-input"
                id="signup-age"
                onChange={this.handleInputChange}
              >
                <option value="">{i18n.__('common.profile.your-age')}</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-50">36-50</option>
                <option value="51-60">51-60</option>
                <option value=">60">{i18n.__('common.profile.61-or-above')}</option>
              </select>
              <span className="help-block"><T>{validation.age.message}</T></span>
            </div>
            <div className="form-group">
              <span>
                <T>common.profile.by-signing-up-you-agree-to-accept-our</T>
                <Link to="privacy-policy" target="_blank"> <T>common.searchform.privacy-policy</T></Link>
                &nbsp;<T>common.profile.and</T>
                <Link to="tc" target="_blank"> <T>common.searchform.terms-and-conditions</T></Link>.
              </span>
              <input
                type="submit"
                id="login-button"
                className="btn btn-lg btn-primary btn-block"
                value={i18n.__('common.homepage.signup')}
              />
            </div>
            <div className="line">
              <span className={'custom-text'}>{i18n.__('common.login.or')}</span>
            </div>
            <div className="form-group text-center">
              <input
                type="button"
                id="login-fb-button"
                className="btn btn-primary btn-lg btn-block"
                value={i18n.__('common.profile.sign-up-with-facebook')}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.object.isRequired,
};
