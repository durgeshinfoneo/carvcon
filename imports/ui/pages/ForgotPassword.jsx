import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import i18n from 'meteor/universe:i18n';
import FormValidator from '../components/FormValidator';

const T = i18n.createComponent();

export default class ForgotPassword extends Component {
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
    ]);
    this.state = {
      email: '',
      validation: this.validator.valid(),
    };
  }

  componentDidMount() {
    this.invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      const email = this.state.email;
      Accounts.forgotPassword({ email }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert(i18n.__('common.messages.check-email-for-a-reset-link', { email }), 'success');
          history.push('/login');
        }
      });
    }
  }

  render() {
    const validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
    return (
      <div className="col-xs-12 col-md-offset-4 col-md-4">
        <div className="content">
          <form
            id="login-form"
            className="form col-md-12 center-block"
            onSubmit={this.handleSubmit}
          >
            <h3 className="login-title">
              <T>common.login.forgot-password</T>
            </h3>
            <p className={'login-subtitle'}>
              <T>common.profile.we-will-send-you-a-link-to-reset-it</T>
            </p>
            <div className={validation.email.isInvalid ? 'form-group has-error' : 'form-group'}>
              <input
                type="email"
                name="email"
                className="form-control custom-input"
                placeholder={i18n.__('common.profile.registered-email')}
                onChange={this.handleInputChange}
              />
              <span className="help-block"><T>{validation.email.message}</T></span>
            </div>

            <div className="form-group text-center">
              <input
                type="submit"
                id="login-button"
                className="btn btn-primary btn-lg btn-block"
                value={i18n.__('common.profile.reset')}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
