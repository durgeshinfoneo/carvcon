/* eslint-disable class-methods-use-this */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import i18n from 'meteor/universe:i18n';
import FormValidator from '../components/FormValidator';

const T = i18n.createComponent();

export default class LoginPage extends Component {
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
    ]);

    this.state = {
      error: '',
      isAuthenticated: Meteor.userId() !== null,
      email: '',
      password: '',
      validation: this.validator.valid(),
    };

    this.submitted = false;
  }

  componentDidMount() {
    this.invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const validation = this.validator.validate(this.state);
    
    this.setState({ validation });
   
    this.submitted = true;

    if (validation.isValid) {
      const { email, password } = this.state;
      console.log("===========",email);
      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          this.setState({
            error: err.reason,
          });
          Bert.alert(err.reason, 'danger');
        } else {
          this.setState({
            isAuthenticated: true,
          });
           console.log('========user========: ', Meteor.userId());
          // this.props.history.push('/get-started');
          // this.setState({ isAuthenticated: true });
        }
      });
    }
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  facebookLogin = (e) => {
    e.preventDefault();
    Meteor.loginWithFacebook({
      requestPermissions: ['public_profile', 'email'],
    }, (err) => {
      if (err) {
        this.setState({
          error: err.reason,
        });
      } else {
        this.setState({
          isAuthenticated: true,
        });
        // this.props.history.push('/get-started');
      }
    });
  }

  render() {
    const error = this.state.error;
    const validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
    const { from } = this.props.location.state || { from: { pathname: '/get-started' } };
    // console.log('========from===========:', from);
    const { isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }
    return (
      <div className="col-xs-12 col-md-offset-4 col-md-4">
        <div className="content">
          {error.length > 0 ?
            <div className="alert alert-danger fade in">
              {error}
            </div>
            : ''
          }
          <form
            id="login-form"
            className="form col-md-12 center-block"
            onSubmit={this.handleSubmit}
          >
            <h3 className="login-title">
              <T>common.homepage.login</T>
            </h3>
            <p className={'login-subtitle'}>
              <T>common.login.do-not-have-an-account</T> <Link to="/signup"><T>common.homepage.signup</T></Link>
            </p>
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

            <div className="form-group">
              <div className="col-lg-6 col-xs-6 text-left">
                <label className="custom-checkbox"><T>common.login.remember-me</T>
                  <input type="checkbox" />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="col-lg-6 col-xs-6 text-right">
                <Link className="forgotpw" to="/forgot-password"><T>common.login.forgot-password</T></Link>
              </div>
            </div>
            <div style={{ marginTop: '35px', height: '1px' }} />
            <div className="form-group text-center">
              <input
                type="submit"
                id="login-button"
                className="btn btn-primary btn-lg btn-block"
                value={i18n.__('common.homepage.login')}
              />
            </div>
            {/* <p className="text-center">OR</p> */}
            <div className="line">
              <span className={'custom-text'}><T>common.login.or</T></span>
            </div>
            <div className="form-group text-center">
              <input
                type="button"
                id="login-fb-button"
                className="btn btn-primary btn-lg btn-block"
                value={i18n.__('common.login.log-in-with-facebook')}
                onClick={this.facebookLogin}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
