// import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import PreferenceForm from '../components/PreferenceForm';

const T = i18n.createComponent();

export default class PreferencePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  render() {
    const error = this.state.error;
    return (
      <div className="col-xs-12 col-md-offset-3 col-md-6">
        <div className="content">
          <div className="title">
            <p>
              <T>common.profile.thank-you-for-signing-up-to-carvcon</T>
              <br />
              <T>common.profile.please-fill-in-the-form-below-for-your-preference</T>
            </p>

          </div>
          {error.length > 0 ?
            <div className="alert alert-danger fade in">{error}</div>
            : ''
          }
          <div className="row">
            <PreferenceForm
              history={this.props.history}
              isEdit={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

PreferencePage.propTypes = {
  history: PropTypes.object.isRequired,
};
