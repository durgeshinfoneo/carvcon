import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import i18n from 'meteor/universe:i18n';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Radio,
  Checkbox,
  Row,
  Col,
} from 'react-bootstrap';
import FormValidator from '../../components/FormValidator';
import FieldGroup from '../../components/Common/FieldGroup';

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
  {
    field: 'preferenceCar',
    method: 'isEmpty',
    validWhen: false,
    message: 'Preference Car is required.',
  },
  {
    field: 'clourCar',
    method: 'isEmpty',
    validWhen: false,
    message: 'Colour is required.',
  },
  {
    field: 'typeCar',
    method: 'isEmpty',
    validWhen: false,
    message: 'Type Car is required.',
  },
  {
    field: 'poweredBy',
    method: 'isEmpty',
    validWhen: false,
    message: 'Powered By is required.',
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

const T = i18n.createComponent();

class CustomerForm extends Component {
  constructor(props, context) {
    super(props, context);
    if (!this.props.isEdit) {
      this.validator = new FormValidator([...validateRules, ...validatePasswordRules]);
    } else {
      this.validator = new FormValidator(validateRules);
    }
    this.state = {
      user: this.props.user,
      preference: this.props.preference,
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

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const { user, preference } = this.state;
    if (name === 'thirdParty') {
      const checkboxValue = event.target.value;
      this.setState((preState, props) => {
        let current = preState.preference.thirdParty;
        const index = current.indexOf(checkboxValue);
        current = current.filter((_, i) => i !== index);
        if (index < 0) {
          preference[name] = [...current, checkboxValue];
        } else {
          preference[name] = current;
        }
        return {
          preference,
        };
      });
    } else if (name in user) {
      user[name] = value;
      this.setState({
        user,
      });
    } else {
      preference[name] = value;
      this.setState({
        preference,
      });
    }
  }

  handleSelect = (key) => {
    this.setState({ key });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('=============handleSubmit');
    const { user, preference } = this.state;
    const validateObj = { ...preference, ...user };
    console.log('=============handleSubmit========:', validateObj);
    const validation = this.validator.validate(validateObj);
    this.setState({ validation });
    this.submitted = true;
    if (validation.isValid) {
      const doc = {
        user,
        preference,
      };
      if (this.props.isEdit) {
        Meteor.call('users.updateCustomer', doc, (err) => {
          if (err) {
            Bert.alert(err.reason, 'danger');
          } else {
            Bert.alert('Customer was updated successfull!', 'success');
            this.props.history.push('/admin/customers');
          }
        });
      } else {
        Meteor.call('users.createCustomer', doc, (err) => {
          if (err) {
            Bert.alert(err.reason, 'danger');
          } else {
            Bert.alert('Customer was added successfull!', 'success');
            this.props.history.push('/admin/customers');
          }
        });
      }
    }
  }

  render() {
    const { preference, user } = this.state;
    const { isEdit } = this.props;
    const validateObj = { ...preference, ...user };
    const validation = this.submitted ?
      this.validator.validate(validateObj) : this.state.validation;

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>
            <T>common.profile.personal-information</T>:
          </legend>
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
            value={user.phone}
            validationState={validation.phone.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.phone.message}
          />
          { !isEdit &&
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
              value={user.age}
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

        <fieldset>
          <legend><T>common.profile.preference</T>:</legend>
          <FormGroup
            controlId="formControlsCar"
            validationState={validation.preferenceCar.isInvalid ? 'error' : null}
          >
            <ControlLabel><T>common.profile.car</T></ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="preferenceCar"
              value={preference.preferenceCar}
              onChange={this.handleInputChange}
            >
              <option value="">{i18n.__('common.profile.your-preference-on-car')}</option>
              <option value="1">{i18n.__('common.profile.brand-new')}</option>
              <option value="2">{i18n.__('common.profile.used-car-less-than-7-years-from-manufacturing-day')}</option>
              <option value="3">{i18n.__('common.profile.used-car-7-years-or-above-from-manufacturing-day')}</option>
              <option value="4">{i18n.__('common.profile.used-car-no-preference-on-car-life')}</option>
            </FormControl>
            <HelpBlock>{validation.preferenceCar.message}</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="formControlsColourCar"
            validationState={validation.clourCar.isInvalid ? 'error' : null}
          >
            <ControlLabel><T>common.profile.colour</T></ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="clourCar"
              value={preference.clourCar}
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
            </FormControl>
            <HelpBlock>{validation.clourCar.message}</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="formControlsTypeCar"
            validationState={validation.typeCar.isInvalid ? 'error' : null}
          >
            <ControlLabel><T>common.profile.car-type</T></ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="typeCar"
              value={preference.typeCar}
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
            </FormControl>
            <HelpBlock>{validation.typeCar.message}</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="formControlsPoweredBy"
            validationState={validation.poweredBy.isInvalid ? 'error' : null}
          >
            <ControlLabel><T>common.profile.powered-by</T></ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="poweredBy"
              value={preference.poweredBy}
              onChange={this.handleInputChange}
            >
              <option value="">{i18n.__('common.profile.powered-by')}</option>
              <option value="1">{i18n.__('common.profile.hybrid')}</option>
              <option value="2">{i18n.__('common.profile.electricity')}</option>
              <option value="3">{i18n.__('common.profile.petrol')}</option>
              <option value="4">{i18n.__('common.profile.diesel')}</option>
            </FormControl>
            <HelpBlock>{validation.poweredBy.message}</HelpBlock>
          </FormGroup>

          <FormGroup>
            <ControlLabel style={{ display: 'block' }}><T>common.profile.transmission</T></ControlLabel>
            <Row className="show-grid">
              <Col xs={6} md={3}>
                <Radio
                  name="transmission"
                  value="MT"
                  checked={this.state.preference.transmission === 'MT'}
                  onChange={this.handleInputChange}
                  inline
                >
                  <T>common.profile.manual</T>
                </Radio>{' '}
              </Col>
              <Col xs={6} md={3}>
                <Radio
                  name="transmission"
                  value="AT"
                  checked={this.state.preference.transmission === 'AT'}
                  onChange={this.handleInputChange}
                  inline
                >
                  <T>common.profile.automation</T>
                </Radio>{' '}
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <ControlLabel style={{ display: 'block' }}>Driving frequency</ControlLabel>
            <Row className="show-grid">
              <Col xs={6} md={3}>
                <Radio
                  name="drivingFrequency"
                  inline
                  value="1"
                  checked={this.state.preference.drivingFrequency === '1'}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.weekend-only</T>
                </Radio>{' '}
              </Col>

              <Col xs={6} md={3}>
                <Radio
                  name="drivingFrequency"
                  value="2"
                  checked={this.state.preference.drivingFrequency === '2'}
                  onChange={this.handleInputChange}
                  inline
                >
                  <T>common.profile.1-2-days-week</T>
                </Radio>{' '}
              </Col>

              <Col xs={6} md={3}>
                <Radio
                  name="drivingFrequency"
                  inline
                  value="3"
                  checked={this.state.preference.drivingFrequency === '3'}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.3-5-days-week</T>
                </Radio>{' '}
              </Col>

              <Col xs={6} md={3}>
                <Radio
                  name="drivingFrequency"
                  inline
                  value="4"
                  checked={this.state.preference.drivingFrequency === '4'}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.6-7-days-week</T>
                </Radio>{' '}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <ControlLabel style={{ display: 'block' }}>3rd party vs comprehensive insurance consideration</ControlLabel>
            <Row className="show-grid">
              <Col xs={6} md={3}>
                <Checkbox
                  inline
                  name="thirdParty"
                  value="1"
                  checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('1') >= 0}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.car-value</T>
                </Checkbox>
              </Col>
              <Col xs={6} md={3}>
                <Checkbox
                  inline
                  name="thirdParty"
                  value="2"
                  checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('2') >= 0}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.new-car-or-used-car</T>
                </Checkbox>
              </Col>
              <Col xs={6} md={3}>
                <Checkbox
                  inline
                  name="thirdParty"
                  value="3"
                  checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('3') >= 0}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.car-model</T>
                </Checkbox>
              </Col>
              <Col xs={6} md={3}>
                <Checkbox
                  inline
                  name="thirdParty"
                  value="4"
                  checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('4') >= 0}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.car-frequent-activity-area</T>
                </Checkbox>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} md={3}>
                <Checkbox
                  inline
                  name="thirdParty"
                  value="5"
                  checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('5') >= 0}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.cross-border-car</T>
                </Checkbox>
              </Col>
              <Col xs={6} md={3}>
                <Checkbox
                  inline
                  name="thirdParty"
                  value="6"
                  checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('6') >= 0}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.insurance-premium</T>
                </Checkbox>
              </Col>
              <Col xs={6} md={3}>
                <Checkbox
                  inline
                  name="thirdParty"
                  value="7"
                  checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('7') >= 0}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.driving-experience</T>
                </Checkbox>
              </Col>
              <Col xs={6} md={3}>
                <Checkbox
                  inline
                  name="thirdParty"
                  value="8"
                  checked={this.state.preference.thirdParty && this.state.preference.thirdParty.indexOf('8') >= 0}
                  onChange={this.handleInputChange}
                >
                  <T>common.profile.other-please-specific</T>
                </Checkbox>
              </Col>
            </Row>
          </FormGroup>
        </fieldset>
        <Button type="submit"><T>common.profile.submit</T></Button>
      </form>
    );
  }
}


CustomerForm.defaultProps = {
  preference: {
    preferenceCar: '',
    clourCar: '',
    typeCar: '',
    poweredBy: '',
    transmission: 'MT',
    drivingFrequency: '1',
    thirdParty: ['1'],
  },
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

CustomerForm.propTypes = {
  preference: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default CustomerForm;
