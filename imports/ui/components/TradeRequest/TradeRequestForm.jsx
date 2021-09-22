/* eslint-disable jsx-a11y/label-has-for */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import i18n from 'meteor/universe:i18n';
import './TradeRequestForm.scss';
import FormValidator from '../FormValidator';
import Images from '../../../api/files/files';

const $ = global.$;
const T = i18n.createComponent();

const photosAttachmentRules = (value, state) => {
  console.log('=======selectedFile=====', state.selectedFile);
  if (state.selectedFile) {
    return state.selectedFile.length <= 5;
  }
  return true;
};

export default class TradeRequestForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: 'tradeType',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.trade-type-required',
      },
      {
        field: 'carYear',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.car-year-required',
      },
      {
        field: 'carBrand',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.car-brand-required',
      },
      {
        field: 'carModel',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.car-model-required',
      },
      {
        field: 'carClass',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.car-class-required',
      },
      {
        field: 'carViewDay',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.trade-type-required',
      },
      {
        field: 'carViewTime',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.this-field-is-required',
      },
      {
        field: 'carViewLocation',
        method: 'isEmpty',
        validWhen: false,
        message: 'common.messages.this-field-is-required',
      },
      {
        field: 'currentMileage',
        method: 'isInt',
        validWhen: true,
        message: 'common.message.this-field-must-be-a-number',
      },
      {
        field: 'vehicleLicenceFeeUntil',
        method: 'isISO8601',
        validWhen: true,
        message: 'common.message.this-field-must-be-a-date',
      },
      {
        field: 'engineOutput',
        method: 'isInt',
        validWhen: true,
        message: 'common.message.this-field-must-be-a-number',
      },
      {
        field: 'photos',
        method: photosAttachmentRules,
        validWhen: true,
        message: 'please select up to 5 files',
      },
    ]);
    this.state = {
      tradeRequest: {
        numberOfPreviousOwner: this.props.numberOfPreviousOwner,
        tradeType: this.props.tradeType,
        carYear: this.props.year,
        carBrand: this.props.carmodel.maker.englishName,
        carModel: this.props.carmodel.name,
        carClass: this.props.carmodel.carclass.name,
        wishTrade: 'DEALER',
        carLoanReferral: false,
        carInsuranceReferral: false,
        independentCarExaminer: false,
        performRegistration: false,
        carViewDay: '',
        carViewTime: '',
        carViewLocation: '',
        otherThing: '',
        considerBuyAnotherCar: false,
        carImage: {
          url: this.props.carImage,
          title: this.props.carmodel.name,
        },
        quotePrice: this.props.quotePrice,
        currentMileage: 0,
        vehicleLicenceFeeUntil: '2020-01-01',
        dealerSoldGoodOrNon: true,
        engineOutput: 0,
        photos: [],
        selectedFile: null,
      },
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

  handleSelectedFile = (e) => {
    console.log('=======e========', e.currentTarget.files);
    const tradeRequest = this.state.tradeRequest;

    tradeRequest.selectedFile = e.currentTarget.files;
    this.setState({
      tradeRequest,
    });
  };
 
  handleSubmit = (e) => {
    e.preventDefault();
    const self = this;
    const validation = this.validator.validate(this.state.tradeRequest);
    this.setState({ validation });
    this.submitted = true;
    if (validation.isValid) {
      console.log('=========handleSubmit===current=====', e.currentTarget.files);
      console.log('=========handleSubmit========', e.target.files);
      if (this.state.tradeRequest.selectedFile && this.state.tradeRequest.selectedFile.length > 0) {
        const files = this.state.tradeRequest.selectedFile;
        const total = files.length;
        const photos = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const uploadInstance = Images.insert(
            {
              file,
              meta: {
                userId: Meteor.userId(),
              },
              streams: 'dynamic',
              chunkSize: 'dynamic',
              allowWebWorkers: true,
            },
            false,
          );

          // These are the event functions, don't need most of them,
          // it shows where we are in the process
          uploadInstance.on('start', function() {
            console.log('Starting');
          });

          uploadInstance.on('end', function(error, fileObj) {
            if (error) {
              console.log('========upload error================', error);
            } else {
              photos.push({
                id: fileObj._id,
              });
              if (photos.length === total) {
                console.log('===========paths=======', photos);
                const { tradeRequest } = self.state;
                tradeRequest.photos = photos;
                console.log('========trade request=========', tradeRequest);
                Meteor.call('traderequests.insert', tradeRequest, (err) => {
                  if (err) {
                    console.log('=========error===========', err);
                    Bert.alert(i18n.__(`common.messages.${err.error}`), 'danger');
                  } else {
                    Bert.alert(
                      i18n.__('common.messages.trade-request-added-successfully'),
                      'success',
                    );
                    $('#tradeRequestModal').modal('hide');
                  }
                });
              }
            }
          });

          // uploadInstance.on('uploaded', function(error, fileObj) {
          //   console.log('uploaded: ', fileObj);
          // });

          // uploadInstance.on('error', function(error, fileObj) {
          //   console.log(`Error during upload: ${error}`);
          // });

          // uploadInstance.on('progress', function(progress, fileObj) {
          //   console.log(`Upload Percentage: ${progress}`);
          //   // Update our progress bar
          //   self.setState({
          //     progress,
          //   });
          // });

          uploadInstance.start(); // Must manually start the upload
        }
      } else {
        const { tradeRequest } = self.state;
        Meteor.call('traderequests.insert', tradeRequest, (err) => {
          if (err) {
            console.log('=========error===========', err);
            Bert.alert(i18n.__(`common.messages.${err.error}`), 'danger');
          } else {
            Bert.alert(i18n.__('common.messages.trade-request-added-successfully'), 'success');
            $('#tradeRequestModal').modal('hide');
          }
        });
      }
    }
  };

  handleInputChange = (e) => {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const tradeRequest = this.state.tradeRequest;

    if (target.type === 'radio') {
      if (value === 'on') {
        value = true;
      } else if (value === 'off') {
        value = false;
      }
    }

    tradeRequest[name] = value;
    this.setState({
      tradeRequest,
    });
  };

  render() {
    // const userId = Meteor.userId();
    // if (!userId) {
    //   return (
    //     <Redirect to={{ pathname: '/login' }} />
    //   );
    // }
    const { tradeRequest } = this.state;
    const validation = this.submitted
      ? this.validator.validate(tradeRequest)
      : this.state.validation;
    return (
      <div
        className="modal fade"
        id="tradeRequestModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                <T>common.traderequest.trade-request</T>
              </h4>
            </div>
            <div className="modal-body">
              <div className="col-sm-12 col-xs-12" style={{ padding: 0 }}>
                <p>
                  <T>common.traderequest.description</T>
                </p>
              </div>
              <form className="form-horizontal">
                <div className="form-group">
                  <div className="col-sm-6 col-xs-12 transmission">
                    <label htmlFor="inputTradeType" className="control-label">
                      <T>common.traderequest.trade-type</T>
                    </label>
                    <div>
                      <div className="radio">
                        <div className="radio-group">
                          <input
                            type="radio"
                            id="option-one"
                            name="tradeType"
                            value="SELL"
                            checked={this.state.tradeRequest.tradeType === 'SELL'}
                            onChange={this.handleInputChange}
                          />
                          <label htmlFor="option-one">
                            <T>common.traderequest.sell</T>
                          </label>
                          <input
                            type="radio"
                            id="option-two"
                            name="tradeType"
                            value="BUY"
                            checked={this.state.tradeRequest.tradeType === 'BUY'}
                            onChange={this.handleInputChange}
                          />
                          <label htmlFor="option-two">
                            <T>common.traderequest.buy</T>
                          </label>
                        </div>
                      </div>
                      <span className="help-block">
                        <T>{validation.tradeType.message}</T>
                      </span>
                    </div>
                  </div>
                  <span
                    className="col-sm-6 col-xs-12 has-float-label"
                    style={{ marginTop: '20px' }}
                  >
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      id="inputQuotePrice"
                      placeholder={i18n.__('common.traderequest.quoted-price')}
                      name="quotePriceView"
                      value={`HKD$ ${new Intl.NumberFormat().format(
                        this.state.tradeRequest.quotePrice,
                      )}`}
                      // onChange={this.handleInputChange}
                    />
                    <label htmlFor="inputQuotePrice">
                      <T>common.traderequest.quoted-price</T>
                    </label>
                    {/* <span className="help-block"><T>{validation.carYear.message}</T></span> */}
                  </span>
                </div>
                <div className="form-group">
                  <span
                    className={
                      validation.carYear.isInvalid
                        ? 'col-sm-6 col-xs-12 has-float-label has-error'
                        : 'col-sm-6 col-xs-12 has-float-label'
                    }
                  >
                    <input
                      type="text"
                      className="form-control"
                      id="inputCarYear"
                      placeholder={i18n.__('common.traderequest.car-year')}
                      name="carYear"
                      value={this.state.tradeRequest.carYear}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="inputCarYear">
                      <T>common.traderequest.car-year</T>
                    </label>
                    <span className="help-block">
                      <T>{validation.carYear.message}</T>
                    </span>
                  </span>
                  <span
                    className={
                      validation.carBrand.isInvalid
                        ? 'col-sm-6 col-xs-12 has-float-label has-error'
                        : 'col-sm-6 col-xs-12 has-float-label'
                    }
                  >
                    <input
                      type="text"
                      className="form-control"
                      id="inputCarYear"
                      placeholder={i18n.__('common.traderequest.car-brand')}
                      name="carBrand"
                      value={this.state.tradeRequest.carBrand}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="inputCarYear">
                      <T>common.traderequest.car-brand</T>
                    </label>
                    <span className="help-block">
                      <T>{validation.carBrand.message}</T>
                    </span>
                  </span>
                </div>
                <div className="form-group">
                  <span
                    className={
                      validation.carClass.isInvalid
                        ? 'col-sm-6 col-xs-12 has-float-label has-error'
                        : 'col-sm-6 col-xs-12 has-float-label'
                    }
                  >
                    <input
                      type="text"
                      className="form-control"
                      id="inputCarYear"
                      placeholder="Class"
                      name="carClass"
                      value={this.state.tradeRequest.carClass}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="inputCarYear">
                      <T>common.traderequest.class</T>
                    </label>
                    <span className="help-block">
                      <T>{validation.carClass.message}</T>
                    </span>
                  </span>
                  <span
                    className={
                      validation.carModel.isInvalid
                        ? 'col-sm-6 col-xs-12 has-float-label has-error'
                        : 'col-sm-6 col-xs-12 has-float-label'
                    }
                  >
                    <input
                      type="text"
                      className="form-control"
                      id="inputCarYear"
                      placeholder="Model"
                      name="carModel"
                      value={this.state.tradeRequest.carModel}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="inputCarYear">
                      <T>common.traderequest.model</T>
                    </label>
                    <span className="help-block">
                      <T>{validation.carModel.message}</T>
                    </span>
                  </span>
                </div>
                <div className="form-group">
                  <span className="col-sm-6 col-xs-12 has-float-label">
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      id="inputNumberOfPreviousOwner"
                      placeholder="number Of Previous Owner"
                      name="numberOfPreviousOwner"
                      value={this.state.tradeRequest.numberOfPreviousOwner}
                      // onChange={this.handleInputChange}
                    />
                    <label htmlFor="inputCarYear">
                      <T>common.searchform.number-of-previous-owner</T>
                    </label>
                    {/* <span className="help-block"><T>{validation.carClass.message}</T></span> */}
                  </span>
                </div>
                {this.state.tradeRequest.tradeType === 'SELL' && (
                  <div>
                    <div className="form-group">
                      <span
                        className={
                          validation.currentMileage.isInvalid
                            ? 'col-sm-6 col-xs-12 has-float-label has-error'
                            : 'col-sm-6 col-xs-12 has-float-label'
                        }
                      >
                        <input
                          type="number"
                          className="form-control"
                          id="inputCurrentMileager"
                          placeholder=""
                          name="currentMileage"
                          value={this.state.tradeRequest.currentMileage}
                          onChange={this.handleInputChange}
                        />
                        <label htmlFor="inputCurrentMileager">
                          <T>common.traderequest.currentMileage</T>
                        </label>
                        <span className="help-block">
                          <T>{validation.currentMileage.message}</T>
                        </span>
                      </span>
                      <span
                        className={
                          validation.vehicleLicenceFeeUntil.isInvalid
                            ? 'col-sm-6 col-xs-12 has-float-label has-error'
                            : 'col-sm-6 col-xs-12 has-float-label'
                        }
                      >
                        <input
                          type="date"
                          className="form-control"
                          id="inputVehicleLicenceFeeUntil"
                          placeholder=""
                          name="vehicleLicenceFeeUntil"
                          style={{ lineHeight: '60px' }}
                          value={this.state.tradeRequest.vehicleLicenceFeeUntil}
                          onChange={this.handleInputChange}
                        />
                        <label htmlFor="inputVehicleLicenceFeeUntil">
                          <T>common.traderequest.vehicleLicenceFeeUntil</T>
                        </label>
                        <span className="help-block">
                          <T>{validation.vehicleLicenceFeeUntil.message}</T>
                        </span>
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputDealerSoldGoodOrNon" className="col-sm-12 col-xs-12 control-label">
                        <T>common.traderequest.dealerSoldGood</T>/
                        <T>common.traderequest.nonDealerSoldGood</T>
                      </label>
                      <div className="col-sm-12 col-xs-12">
                        <div className="">
                          <label className="col-sm-6 col-xs-5 radio-inline">
                            <input
                              type="radio"
                              name="dealerSoldGoodOrNon"
                              value="on"
                              checked={this.state.tradeRequest.dealerSoldGoodOrNon}
                              onChange={this.handleInputChange}
                            />
                            <T>common.traderequest.dealerSoldGood</T>
                          </label>
                          <label className="col-sm-6 col-xs-6 radio-inline">
                            <input
                              type="radio"
                              name="dealerSoldGoodOrNon"
                              value="off"
                              checked={!this.state.tradeRequest.dealerSoldGoodOrNon}
                              onChange={this.handleInputChange}
                            />
                            <T>common.traderequest.nonDealerSoldGood</T>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <span
                        className={
                          validation.engineOutput.isInvalid
                            ? 'col-sm-6 col-xs-12 has-float-label has-error'
                            : 'col-sm-6 col-xs-12 has-float-label'
                        }
                      >
                        <input
                          type="number"
                          className="form-control"
                          id="inputEngineOutput"
                          placeholder=""
                          name="engineOutput"
                          value={this.state.tradeRequest.engineOutput}
                          onChange={this.handleInputChange}
                        />
                        <label htmlFor="inputEngineOutput">
                          <T>common.traderequest.engineOutput</T>
                        </label>
                        <span className="help-block">
                          <T>{validation.engineOutput.message}</T>
                        </span>
                      </span>
                    </div>
                    <div className="form-group">
                      <span
                        className={
                          validation.photos.isInvalid
                            ? 'col-sm-6 col-xs-12 has-float-label has-error'
                            : 'col-sm-6 col-xs-12 has-float-label'
                        }
                      >
                        <input
                          type="file"
                          multiple
                          className="form-control"
                          id="inputPhotos"
                          placeholder=""
                          name="photos"
                          // value={this.state.tradeRequest.photos}
                          onChange={this.handleSelectedFile}
                        />
                        <label htmlFor="inputPhotos">
                          <T>common.traderequest.photosAttachment</T>
                        </label>
                        <span className="help-block">
                          <T>{validation.engineOutput.message}</T>
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="inputTradeType" className="col-sm-6 control-label">
                    <T>common.traderequest.who-do-you-wish-to-trade-with</T>
                  </label>
                  <div className="col-sm-6">
                    <div className="">
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="wishTrade"
                          value="DEALER"
                          checked={this.state.tradeRequest.wishTrade === 'DEALER'}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.dealer</T>
                      </label>
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="wishTrade"
                          value="INDIVIDUAL"
                          checked={this.state.tradeRequest.wishTrade === 'INDIVIDUAL'}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.individual</T>
                      </label>
                      <label className="col-sm-3 radio-inline">
                        <input
                          type="radio"
                          name="wishTrade"
                          value="EITHER"
                          checked={this.state.tradeRequest.wishTrade === 'EITHER'}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.either</T>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputTradeType" className="col-sm-6 control-label">
                    <T>common.traderequest.do-you-need-car-loan-referral</T>
                  </label>
                  <div className="col-sm-6">
                    <div className="">
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="carLoanReferral"
                          value="on"
                          checked={this.state.tradeRequest.carLoanReferral}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.yes</T>
                      </label>
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="carLoanReferral"
                          value="off"
                          checked={!this.state.tradeRequest.carLoanReferral}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.no</T>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputTradeType" className="col-sm-6 control-label">
                    <T>common.traderequest.do-you-need-car-insurance-referral</T>
                  </label>
                  <div className="col-sm-6">
                    <div className="">
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="carInsuranceReferral"
                          value="on"
                          checked={this.state.tradeRequest.carInsuranceReferral}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.yes</T>
                      </label>
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="carInsuranceReferral"
                          value="off"
                          checked={!this.state.tradeRequest.carInsuranceReferral}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.no</T>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputTradeType" className="col-sm-6 control-label">
                    <T>common.traderequest.do-you-need-independent-car-examiner</T>
                  </label>
                  <div className="col-sm-6">
                    <div className="">
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="independentCarExaminer"
                          value="on"
                          checked={this.state.tradeRequest.independentCarExaminer}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.yes</T>
                      </label>
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="independentCarExaminer"
                          value="off"
                          checked={!this.state.tradeRequest.independentCarExaminer}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.no</T>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputTradeType" className="col-sm-6 control-label">
                    <T>
                      common.traderequest.do-you-need-vcon-to-perform-registration-for-you-with-transport-department-and-any-other-formality
                    </T>
                  </label>
                  <div className="col-sm-6">
                    <div className="">
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="performRegistration"
                          value="on"
                          checked={this.state.tradeRequest.performRegistration}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.yes</T>
                      </label>
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="performRegistration"
                          value="off"
                          checked={!this.state.tradeRequest.performRegistration}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.no</T>
                      </label>
                    </div>
                  </div>
                </div>
                <p className="title">
                  <T>common.traderequest.what-is-your-availability-for-car-viewing</T>
                  {/* <T>common.traderequest.please-include</T> */}
                </p>
                <div
                  className={
                    validation.carViewDay.isInvalid ? 'form-group has-error' : 'form-group'
                  }
                >
                  <label htmlFor="inputCarYear" className="col-sm-6 control-label">
                    <T>common.traderequest.weekday-weekend-specific-day</T>
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCarYear"
                      placeholder=""
                      required
                      name="carViewDay"
                      value={this.state.tradeRequest.carViewDay}
                      onChange={this.handleInputChange}
                    />
                    <span className="help-block">
                      <T>{validation.carViewDay.message}</T>
                    </span>
                  </div>
                </div>
                <div
                  className={
                    validation.carViewTime.isInvalid ? 'form-group has-error' : 'form-group'
                  }
                >
                  <label htmlFor="inputCarYear" className="col-sm-6 control-label">
                    <T>common.traderequest.and-time</T>
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCarYear"
                      placeholder=""
                      required
                      name="carViewTime"
                      value={this.state.tradeRequest.carViewTime}
                      onChange={this.handleInputChange}
                    />
                    <span className="help-block">
                      <T>{validation.carViewTime.message}</T>
                    </span>
                  </div>
                </div>
                <div
                  className={
                    validation.carViewLocation.isInvalid ? 'form-group has-error' : 'form-group'
                  }
                >
                  <label htmlFor="inputCarYear" className="col-sm-6 control-label">
                    <T>common.traderequest.and-district-location</T>
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCarYear"
                      placeholder=""
                      required
                      name="carViewLocation"
                      value={this.state.tradeRequest.carViewLocation}
                      onChange={this.handleInputChange}
                    />
                    <span className="help-block">
                      <T>{validation.carViewLocation.message}</T>
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputCarYear" className="col-sm-6 control-label">
                    <T>common.traderequest.any-other-things-we-can-help</T>
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCarYear"
                      placeholder=""
                      name="otherThing"
                      value={this.state.tradeRequest.otherThing}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                {this.state.tradeRequest.tradeType === 'SELL' && (
                  <div className="form-group">
                    <label htmlFor="inputTradeType" className="col-sm-6 control-label">
                      <T>common.traderequest.will-you-consider-to-buy-another-car</T>
                    </label>
                    <div className="col-sm-6">
                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="considerBuyAnotherCar"
                          value="on"
                          checked={this.state.tradeRequest.considerBuyAnotherCar}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.yes</T>
                      </label>

                      <label className="col-sm-4 radio-inline">
                        <input
                          type="radio"
                          name="considerBuyAnotherCar"
                          value="off"
                          checked={!this.state.tradeRequest.considerBuyAnotherCar}
                          onChange={this.handleInputChange}
                        />
                        <T>common.traderequest.no</T>
                      </label>
                    </div>
                  </div>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn custom-btn btn-back" data-dismiss="modal">
                <T>common.traderequest.close</T>
              </button>
              <button type="button" className="btn custom-btn btn-save" onClick={this.handleSubmit}>
                <T>common.traderequest.submit</T>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TradeRequestForm.defaultProps = {
  tradeRequest: {
    tradeType: 'SELL',
    carYear: '',
    carBrand: '',
    carModel: '',
    carClass: '',
    wishTrade: 'DEALER',
    carLoanReferral: false,
    carInsuranceReferral: false,
    independentCarExaminer: false,
    performRegistration: false,
    carViewDay: '',
    carViewTime: '',
    carViewLocation: '',
    otherThing: '',
    considerBuyAnotherCar: false,
    carImage: '',
    quotePrice: '',
  },
};

TradeRequestForm.propTypes = {
  // tradeRequest: PropTypes.object,
  numberOfPreviousOwner: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  carmodel: PropTypes.object.isRequired,
  carImage: PropTypes.string.isRequired,
  quotePrice: PropTypes.number.isRequired,
  tradeType: PropTypes.string.isRequired,
};
