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
} from 'react-bootstrap';
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
  {
    field: 'companyName',
    method: 'isEmpty',
    validWhen: false,
    message: 'Company Name is required.',
  },
  {
    field: 'crbrNumber',
    method: 'isEmpty',
    validWhen: false,
    message: 'CR number / BR number is required.',
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
    field: 'companyEmail',
    method: 'isEmpty',
    validWhen: false,
    message: 'Email is required.',
  },
  {
    field: 'companyEmail',
    method: 'isEmail',
    validWhen: true,
    message: 'That is not a valid email.',
  },
  {
    field: 'coreBusiness',
    method: 'isEmpty',
    validWhen: false,
    message: 'Core business is required.',
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

class DealerForm extends Component {
  constructor(props, context) {
    super(props, context);
    if (!this.props.isEdit) {
      this.validator = new FormValidator([...validateRules, ...validatePasswordRules]);
    } else {
      this.validator = new FormValidator(validateRules);
    }
    this.state = {
      user: this.props.user,
      company: this.props.company,
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
    const { user, company } = this.state;
    if (name in user) {
      user[name] = value;
      this.setState({
        user,
      });
    } else {
      company[name] = value;
      this.setState({
        company,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('=============handleSubmit');
    const { user, company } = this.state;
    const validateObj = { ...company, ...user };
    console.log('=============handleSubmit========:', validateObj);
    const validation = this.validator.validate(validateObj);
    this.setState({ validation });
    this.submitted = true;
    if (validation.isValid) {
      const email = company.companyEmail;
      delete company.companyEmail;
      const name = company.companyName;
      delete company.companyName;
      const companyObj = { email, name, ...company };
      const doc = {
        user,
        company: companyObj,
      };
      if (this.props.isEdit) {
        Meteor.call('users.updateDealer', doc, (err) => {
          if (err) {
            Bert.alert(err.reason, 'danger');
          } else {
            Bert.alert('Dealer was updated successfull!', 'success');
            this.props.history.push('/admin/dealers');
          }
        });
      } else {
        Meteor.call('users.createDealer', doc, (err) => {
          if (err) {
            Bert.alert(err.reason, 'danger');
          } else {
            Bert.alert('Dealer was added successfull!', 'success');
            this.props.history.push('/admin/dealers');
          }
        });
      }
    }
  }

  render() {
    const { company, user } = this.state;
    const { isEdit } = this.props;
    const validateObj = { ...company, ...user };
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
          <legend><T>common.profile.company</T>:</legend>
          <FieldGroup
            id="formControlsCompanyName"
            type="text"
            name="companyName"
            label={i18n.__('common.profile.company-name')}
            placeholder={i18n.__('common.profile.company-name')}
            value={company.companyName}
            validationState={validation.companyName.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.companyName.message}
          />

          <FieldGroup
            id="formControlsCrbrNumber"
            type="text"
            name="crbrNumber"
            label={i18n.__('common.profile.cr-number-br-number')}
            placeholder=""
            value={company.crbrNumber}
            validationState={validation.crbrNumber.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.crbrNumber.message}
          />

          <FieldGroup
            id="formControlsCompanyAddress"
            type="text"
            name="address"
            label={i18n.__('common.profile.company-address')}
            placeholder=""
            value={company.address}
            validationState={validation.address.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.address.message}
          />

          <FieldGroup
            id="formControlsContactPerson"
            type="text"
            name="contactPerson"
            label={i18n.__('common.profile.contact-person')}
            placeholder=""
            value={company.contactPerson}
            validationState={validation.contactPerson.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.contactPerson.message}
          />

          <FieldGroup
            id="formControlsContactMobile"
            type="text"
            name="contactMobileNumber"
            label={i18n.__('common.profile.contact-mobile-number')}
            placeholder=""
            value={company.contactMobileNumber}
            validationState={validation.contactMobileNumber.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.contactMobileNumber.message}
          />

          <FieldGroup
            id="formControlsCompnayEmail"
            type="email"
            name="companyEmail"
            label={i18n.__('common.profile.company-email')}
            placeholder=""
            value={company.companyEmail}
            validationState={validation.companyEmail.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.companyEmail.message}
          />

          <FieldGroup
            id="formControlsCoreBusiness"
            type="text"
            name="coreBusiness"
            label={i18n.__('common.profile.core-business')}
            placeholder=""
            value={company.coreBusiness}
            validationState={validation.coreBusiness.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.coreBusiness.message}
          />

          <FormGroup
            controlId="formControlsSourceUsedCar"
            validationState={validation.sourceUsedCar.isInvalid ? 'error' : null}
          >
            <ControlLabel><T>common.profile.how-you-source-used-car</T></ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="sourceUsedCar"
              value={company.sourceUsedCar}
              onChange={this.handleInputChange}
            >
              <option value="">{i18n.__('common.profile.your-source-used-car')}</option>
              <option value="1">{i18n.__('common.profile.walkin-individuals')}</option>
              <option value="2">{i18n.__('common.profile.online-resource')}</option>
              <option value="3">{i18n.__('common.profile.from-other-traders')}</option>
              <option value="4">{i18n.__('common.profile.others')}</option>
            </FormControl>
            <HelpBlock>{validation.sourceUsedCar.message}</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="formControlsMarketing"
            validationState={validation.marketing.isInvalid ? 'error' : null}
          >
            <ControlLabel><T>common.profile.how-you-do-marketing</T></ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="marketing"
              value={company.marketing}
              onChange={this.handleInputChange}
            >
              <option value="">{i18n.__('common.profile.your-marketing')}</option>
              <option value="1">{i18n.__('common.profile.online-digital-marketing')}</option>
              <option value="2">{i18n.__('common.profile.television-radio-advertisements')}</option>
              <option value="3">{i18n.__('common.profile.magazines')}</option>
              <option value="4">{i18n.__('common.profile.through-other-business-partners')}</option>
              <option value="5">{i18n.__('common.profile.other-traditional-advertisements')}</option>
              <option value="6">{i18n.__('common.profile.no-marketing')}</option>
            </FormControl>
            <HelpBlock>{validation.marketing.message}</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="formControlsMostRevenues"
            validationState={validation.mostRevenues.isInvalid ? 'error' : null}
          >
            <ControlLabel><T>common.profile.which-contribute-most-revenues</T></ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="mostRevenues"
              value={company.mostRevenues}
              onChange={this.handleInputChange}
            >
              <option value="">{i18n.__('common.profile.your-revenues')}</option>
              <option value="1">{i18n.__('common.profile.used-car-trading')}</option>
              <option value="2">{i18n.__('common.profile.car-maintenance-checking')}</option>
              <option value="3">{i18n.__('common.profile.accessories-parts-trading')}</option>
              <option value="4">{i18n.__('common.profile.car-loan-insurance-referral')}</option>
              <option value="5">{i18n.__('common.profile.advertisement')}</option>
              <option value="6">{i18n.__('common.profile.others')}</option>
            </FormControl>
            <HelpBlock>{validation.marketing.message}</HelpBlock>
          </FormGroup>

          <FieldGroup
            id="formControlsMostPopular"
            type="text"
            name="mostPopular"
            label={i18n.__('common.profile.which-brand-of-car-most-popular')}
            placeholder=""
            value={company.mostPopular}
            validationState={validation.mostPopular.isInvalid ? 'error' : null}
            onChange={this.handleInputChange}
            help={validation.mostPopular.message}
          />

          <FormGroup
            controlId="formControlsNotSold"
            validationState={validation.notSold.isInvalid ? 'error' : null}
          >
            <ControlLabel><T>common.profile.how-to-dispose-used-car-which-could-not-be-sold</T></ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="notSold"
              value={company.notSold}
              onChange={this.handleInputChange}
            >
              <option value="">{i18n.__('common.profile.select')}</option>
              <option value="1">{i18n.__('common.profile.destroy')}</option>
              <option value="2">{i18n.__('common.profile.sell-to-overseas')}</option>
              <option value="3">{i18n.__('common.profile.donation')}</option>
              <option value="4">{i18n.__('common.profile.dismantle-accessories-parts-for-selling')}</option>
              <option value="5">{i18n.__('common.profile.others')}</option>
            </FormControl>
            <HelpBlock>{validation.notSold.message}</HelpBlock>
          </FormGroup>

        </fieldset>
        <Button type="submit"><T>common.profile.submit</T></Button>
      </form>
    );
  }
}


DealerForm.defaultProps = {
  company: {
    companyName: '',
    crbrNumber: '',
    address: '',
    contactPerson: '',
    contactMobileNumber: '',
    companyEmail: '',
    coreBusiness: '',
    sourceUsedCar: '',
    marketing: '',
    mostRevenues: '',
    mostPopular: '',
    notSold: '',
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

DealerForm.propTypes = {
  company: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default DealerForm;
