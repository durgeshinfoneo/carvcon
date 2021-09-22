import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import FormValidator from '../../components/FormValidator';
import FieldGroup from '../../components/Common/FieldGroup';

const T = i18n.createComponent();

const passwordMatch = (confirmation, state) => (state.password === confirmation);
const validateRules = [
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
    field: 'firstName',
    method: 'isEmpty',
    validWhen: false,
    message: 'FirstName is required.',
  },
  {
    field: 'lastName',
    method: 'isEmpty',
    validWhen: false,
    message: 'LastName is required.',
  },
  {
    field: 'phone',
    method: 'isEmpty',
    validWhen: false,
    message: 'Phone is required.',
  },
  {
    field: 'age',
    method: 'isEmpty',
    validWhen: false,
    message: 'Age is required.',
  },
];

const validatePasswordRules = [
  {
    field: 'password',
    method: 'isEmpty',
    validWhen: false,
    message: 'Password is required.',
  },
  {
    field: 'passwordConfirmation',
    method: 'isEmpty',
    validWhen: false,
    message: 'Password confirmation is required.',
  },
  {
    field: 'passwordConfirmation',
    method: passwordMatch, // notice that we are passing a custom function here
    validWhen: true,
    message: 'Password and password confirmation do not match.',
  },
];

class UserForm extends Component {
  constructor(props, context) {
    super(props, context);
    if (!this.props.isEdit) {
      this.validator = new FormValidator([...validateRules, ...validatePasswordRules]);
    } else {
      this.validator = new FormValidator(validateRules);
    }
    this.state = {
      user: this.props.user,
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

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const { user } = this.state;
    user[name] = value;
    this.setState({
      user,
    });
  }

  handleSelect = (key) => {
    this.setState({ key });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('=============handleSubmit');
    const { user } = this.state;
    const validateObj = user;
    console.log('=============handleSubmit========:', validateObj);
    const validation = this.validator.validate(validateObj);
    this.setState({ validation });
    this.submitted = true;
    if (validation.isValid) {
      const doc = user;
      if (this.props.isEdit) {
        Meteor.call('users.updateAdminUser', doc, (err) => {
          if (err) {
            Bert.alert(err.reason, 'danger');
          } else {
            Bert.alert(i18n.__('admin-user-was-updated-successfull'), 'success');
            this.props.history.push('/admin/users');
          }
        });
      } else {
        Meteor.call('users.createAdminUser', doc, (err) => {
          if (err) {
            Bert.alert(err.reason, 'danger');
          } else {
            Bert.alert(i18n.__('admin-user-was-added-successfull'), 'success');
            this.props.history.push('/admin/users');
          }
        });
      }
    }
  }

  render() {
    const { user } = this.state;
    const { isEdit } = this.props;
    const validateObj = user;
    const validation = this.submitted ?
      this.validator.validate(validateObj) : this.state.validation;

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend><T>common.admin.personal-information</T>:</legend>
          <FieldGroup
            id="formControlsFirstName"
            type="text"
            name="firstName"
            label={i18n.__('common.profile.first-name')}
            placeholder={i18n.__('common.profile.first-name')}
            value={user.firstName}
            validationState={validation.firstName.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.firstName.message}
          />
          <FieldGroup
            id="formControlsLastName"
            type="text"
            name="lastName"
            label={i18n.__('common.profile.last-name')}
            placeholder={i18n.__('common.profile.last-name')}
            value={user.lastName}
            validationState={validation.lastName.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.lastName.message}
          />
          <FieldGroup
            id="formControlsEmail"
            type="email"
            name="email"
            label={i18n.__('common.profile.email')}
            placeholder={i18n.__('common.profile.email')}
            value={user.email}
            validationState={validation.email.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.email.message}
          />
          <FieldGroup
            id="formControlsPhone"
            type="tel"
            name="phone"
            label={i18n.__('common.profile.phone')}
            placeholder={i18n.__('common.profile.phone')}
            value={user.phone || ''}
            validationState={validation.phone.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.phone.message}
          />
          {!isEdit &&
            <FieldGroup
              id="formControlsPassword"
              type="password"
              name="password"
              label={i18n.__('common.profile.password')}
              placeholder={i18n.__('common.profile.password')}
              validationState={validation.password.isInvalid ? 'error' : null}
              onChange={this.handleInputChange}
              help={validation.password.message}
            />
          }
          {!isEdit &&
            <FieldGroup
              id="formControlsPasswordConfirmation"
              type="password"
              name="passwordConfirmation"
              label={i18n.__('common.profile.password-confirmation')}
              placeholder={i18n.__('common.profile.password-confirmation')}
              validationState={validation.passwordConfirmation.isInvalid ? 'error' : null}
              onChange={this.handleInputChange}
              help={validation.passwordConfirmation.message}
            />
          }
          <FormGroup
            controlId="formControlsAge"
            validationState={validation.age.isInvalid ? 'error' : null}
          >
            <ControlLabel><T>common.profile.age</T></ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="age"
              value={user.age || ''}
              onChange={this.handleInputChange}
            >
              <option value="">{i18n.__('common.profile.your-age')}</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-50">36-50</option>
              <option value="51-60">51-60</option>
              <option value=">60">{i18n.__('common.profile.61-or-above')}</option>
            </FormControl>
            <HelpBlock>{validation.age.message}</HelpBlock>
          </FormGroup>
        </fieldset>

        <Button type="submit"><T>common.profile.submit</T></Button>
      </form>
    );
  }
}


UserForm.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    age: '',
  },
};

UserForm.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default UserForm;
