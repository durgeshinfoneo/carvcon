import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';
import UserCompanyForm from '../components/UserCompanyForm';

const T = i18n.createComponent();

class UserCompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  render() {
    const error = this.state.error;
    return (
      <div className="dealer-page">
        <div className="row" style={{ marginBottom: '62px' }}>
          <div className="col-xs-12 col-md-offset-3 col-md-4">
            <div className="title">
              <p>
                <T>common.profile.thank-you-for-signing-up-to-carvcon</T>
                <br />
                <T>common.profile.please-fill-in-the-form-below-for-your-company</T>
              </p>

            </div>
            {error.length > 0 ?
              <div className="alert alert-danger fade in">{error}</div>
              : ''
            }
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-offset-3 col-md-6">
            <UserCompanyForm
              history={this.props.history}
              isEdit={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserCompanyPage;
