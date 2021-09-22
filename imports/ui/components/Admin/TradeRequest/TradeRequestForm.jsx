import React from 'react';
import PropTypes from 'prop-types';
import {
  AutoForm,
  TextField,
  SubmitField,
  ErrorsField,
  SelectField,
  RadioField,
  BoolField,
  DateField,
  NumField,
} from 'uniforms-bootstrap3';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import connectField from 'uniforms/connectField';

const Photos = ({ value, label }) => {
  const showImages = value.map(({ url }) => (
    <a href={url} target="_blank">
      <img src={url} alt="attachment" width={'200px'} style={{ padding: '10px' }} />
    </a>
  ));
  return (
    <div className="field form-group">
      <label htmlFor="unifroms-photos" className="control-label">
        {label}
      </label>
      <div className="" id="unifroms-photos">
        {showImages}
      </div>
    </div>
  );
};

const ListImageField = connectField(Photos);

const TradeRequestForm = ({ schema, onSubmit, model = {}, user = {} }) => (
  <AutoForm schema={schema} onSubmit={onSubmit} model={model}>
    <Grid fluid>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <TextField name="requester.email" label={i18n.__('common.traderequest.requester')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <TextField
            disabled
            name="acceptedBy.email"
            label={i18n.__('common.traderequest.accepted-by')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <FormGroup controlId="requesterPhone">
            <ControlLabel>{i18n.__('common.profile.phone')}</ControlLabel>
            <FormControl type="text" disabled value={user.profile ? user.profile.phone : ''} />
          </FormGroup>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <NumField
            disabled
            name="quotePrice"
            label={i18n.__('common.traderequest.quoted-price')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <RadioField name="tradeType" label={i18n.__('common.traderequest.trade-type')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <TextField name="carYear" label={i18n.__('common.traderequest.car-year')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <TextField name="carBrand" label={i18n.__('common.traderequest.car-brand')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <TextField name="carModel" label={i18n.__('common.traderequest.model')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <TextField name="carClass" label={i18n.__('common.traderequest.class')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <NumField
            name="numberOfPreviousOwner"
            label={i18n.__('common.searchform.number-of-previous-owner')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <NumField name="currentMileage" label={i18n.__('common.traderequest.currentMileage')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <DateField
            name="vehicleLicenceFeeUntil"
            label={i18n.__('common.traderequest.vehicleLicenceFeeUntil')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <BoolField
            name="dealerSoldGoodOrNon"
            label={`${i18n.__('common.traderequest.dealerSoldGood')}/${i18n.__(
              'common.traderequest.nonDealerSoldGood',
            )}`}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <NumField name="engineOutput" label={i18n.__('common.traderequest.engineOutput')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <ListImageField name="photos" label={i18n.__('common.traderequest.photosAttachment')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <SelectField
            name="wishTrade"
            label={i18n.__('common.traderequest.who-do-you-wish-to-trade-with')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <BoolField
            name="carLoanReferral"
            label={i18n.__('common.traderequest.do-you-need-car-loan-referral')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <BoolField
            name="carInsuranceReferral"
            label={i18n.__('common.traderequest.do-you-need-car-insurance-referral')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <BoolField
            name="independentCarExaminer"
            label={i18n.__('common.traderequest.do-you-need-independent-car-examiner')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <BoolField
            name="performRegistration"
            label={i18n.__(
              'common.traderequest.do-you-need-vcon-to-perform-registration-for-you-with-transport-department-and-any-other-formality',
            )}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <TextField
            name="carViewDay"
            label={i18n.__('common.traderequest.weekday-weekend-specific-day')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <TextField name="carViewTime" label={i18n.__('common.traderequest.and-time')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <TextField
            name="carViewLocation"
            label={i18n.__('common.traderequest.and-district-location')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <TextField
            name="otherThing"
            label={i18n.__('common.traderequest.any-other-things-we-can-help')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <BoolField
            name="considerBuyAnotherCar"
            label={i18n.__('common.traderequest.will-you-consider-to-buy-another-car')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <SelectField name="status" label={i18n.__('common.traderequest.status')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <NumField name="closedPrice" label={i18n.__('common.traderequest.closed-price')} />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <DateField
            required
            name="closedDate"
            label={i18n.__('common.traderequest.closed-date')}
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={8} xs={12}>
          <DateField disabled name="createdAt" label={i18n.__('common.traderequest.created-at')} />
        </Col>
      </Row>
      <Row>
        <Col md={8} xs={12}>
          <ErrorsField />
          <SubmitField value="Save" className="fluid" />
        </Col>
      </Row>
    </Grid>
  </AutoForm>
);

TradeRequestForm.defaultProps = {
  model: {},
  user: {},
};

TradeRequestForm.propTypes = {
  model: PropTypes.object,
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
};

export default TradeRequestForm;
