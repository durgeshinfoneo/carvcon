import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import FormValidator from '../FormValidator';

const $ = global.$;

export default class TradeAcceptanceCancellationForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: 'reason',
        method: 'isEmpty',
        validWhen: false,
        message: 'Reason is required.',
      },
    ]);
    this.state = {
      tradeAcceptanceCancellation: {
        requestId: this.props.tradeRequest._id,
        requester: this.props.tradeRequest.requester.email,
        cancelledBy: '',
        reason: '',
      },
      validation: this.validator.valid(),
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tradeAcceptanceCancellation } = this.state;
    const validation = this.validator.validate(tradeAcceptanceCancellation);
    this.setState({ validation });
    this.submitted = true;
    if (validation.isValid) {
      Meteor.call('tradeAcceptanceCancellations.insert', tradeAcceptanceCancellation, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Trade Request was cancelled!', 'success');
          $('#tradeAcceptanceCancellationForm').modal('hide');
        }
      });
    }
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const tradeAcceptanceCancellation = this.state.tradeAcceptanceCancellation;

    tradeAcceptanceCancellation[name] = value;
    this.setState({
      tradeAcceptanceCancellation,
    });
  }

  render() {
    const { tradeAcceptanceCancellation } = this.state;
    const validation = this.submitted ?
      this.validator.validate(tradeAcceptanceCancellation) : this.state.validation;
    return (
      <div className="modal fade" id="tradeAcceptanceCancellationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Trade Acceptance Cancellation</h4>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="requestId" className="control-label">Request Id:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="requestId"
                    disabled
                    value={tradeAcceptanceCancellation.requestId}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="requesterName" className="control-label">Requester:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="requesterName"
                    disabled
                    value={tradeAcceptanceCancellation.requester}
                  />
                </div>
                <div className={validation.reason.isInvalid ? 'form-group has-error' : 'form-group'}>
                  <label htmlFor="reasonText" className="control-label">Reason:</label>
                  <textarea
                    className="form-control"
                    id="reasonText"
                    rows="5"
                    name="reason"
                    value={tradeAcceptanceCancellation.reason}
                    onChange={this.handleInputChange}
                  />
                  <span className="help-block">{validation.reason.message}</span>
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn custom-btn btn-back" data-dismiss="modal">Close</button>
                <button type="submit" className="btn custom-btn btn-save">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

TradeAcceptanceCancellationForm.propTypes = {
  tradeRequest: PropTypes.object.isRequired,
};
