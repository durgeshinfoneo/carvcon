import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import i18n from 'meteor/universe:i18n';
import FormValidator from '../components/FormValidator';

const T = i18n.createComponent();

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
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
    ]);
    this.state = {
      password: '',
      passwordConfirmation: '',
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

  passwordMatch = (confirmation, state) => (state.password === confirmation)

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
      const newPassword = this.state.password;
      console.log('=========props==========: ', this.props);
      const { match, history } = this.props;
      const { token } = match.params;
      Accounts.resetPassword(token, newPassword, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          history.push('/');
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
              <T>common.profile.reset-password</T>
            </h3>
            <p className={'login-subtitle'}>
              <T>common.profile.to-reset-your-password-enter-a-new-one-below-you-will-be-logged-in-with-your-new-password</T>
            </p>
            <div className={validation.password.isInvalid ? 'form-group has-error' : 'form-group'}>
              <input
                type="password"
                name="password"
                className="form-control custom-input"
                placeholder={i18n.__('common.profile.new-password')}
                onChange={this.handleInputChange}
              />
              <span className="help-block"><T>{validation.password.message}</T></span>
            </div>

            <div className={validation.passwordConfirmation.isInvalid ? 'form-group has-error' : 'form-group'}>
              <input
                type="password"
                name="passwordConfirmation"
                className="form-control custom-input"
                placeholder={i18n.__('common.profile.repeat-new-password')}
                onChange={this.handleInputChange}
              />
              <span className="help-block"><T>{validation.passwordConfirmation.message}</T></span>
            </div>

            <div className="form-group text-center">
              <input
                type="submit"
                id="login-button"
                className="btn btn-primary btn-lg btn-block"
                value={i18n.__('common.profile.reset-password-and-login')}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
