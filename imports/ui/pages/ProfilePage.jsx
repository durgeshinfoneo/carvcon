import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import i18n from 'meteor/universe:i18n';
import ProfileForm from '../components/ProfileForm';
import PreferenceForm from '../components/PreferenceForm';
import UserCompanyForm from '../components/UserCompanyForm';
import UserPreferences from '../../api/userpreferences/userpreferences';
import UserCompanies from '../../api/usercompanies/usercompanies';
import { ROLES } from '../../helpers/constant';
import TradableCars from '../../api/tradableCars/tradableCars'; 
const T = i18n.createComponent();

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  renderPreference() {
    const { loading, preference, history } = this.props;
    if (loading || !preference) {
      return (<div />);
    }
    return (
      <PreferenceForm
        preference={preference}
        history={history}
        isEdit
      />
    );
  }

  renderCompany() {
    const { loading, company, history } = this.props;
    if (loading || !company) {
      return (<div />);
    }
    return (
      <UserCompanyForm
        company={company}
        history={history}
        isEdit
      />
    );
  }

  renderProfile() {
    const { loading, user, history } = this.props;
    if (loading && Object.keys(user).length === 0 && user.constructor === Object) {
      return (<div />);
    }

    // console.log('=======user======:', user);
    return (
      <ProfileForm user={user} history={history} />
    );
  }

  render() {
    const { isAuthenticated, user } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect to="login" />
      );
    }
    return (
      <div>
        <div className="col-md-3 profile-tab">
          <div className="content">
            <ul className="nav nav-pills nav-stacked">
              <li role="presentation" className="active">
                <a
                  href="#personal"
                  aria-controls="personal"
                  role="tab"
                  data-toggle="pill"
                  className={'tab-item'}
                >
                  <T>common.profile.personal-information</T>
                </a>
              </li>
              {Roles.userIsInRole(user._id, [ROLES.CUSTOMER]) ? (
                <li role="presentation">
                  <a
                    href="#preference"
                    aria-controls="preference"
                    role="tab"
                    data-toggle="pill"
                    className={'tab-item'}
                  >
                    <T>common.profile.preference</T>
                  </a>
                </li>
              ) : (
                <li role="presentation">
                  <a
                    href="#company"
                    aria-controls="company"
                    role="tab"
                    data-toggle="pill"
                    className={'tab-item'}
                  >
                    <T>common.profile.company</T>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="content">
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="personal">
                <h3><T>common.profile.personal-information</T></h3>
                { this.renderProfile() }
              </div>
              <div role="tabpanel" className="tab-pane" id="preference">
                <h3><T>common.profile.preference</T></h3>
                <div className="row">
                  { this.renderPreference() }
                </div>
              </div>
              <div role="tabpanel" className="tab-pane" id="company">
                <h3><T>common.profile.company</T></h3>
                <div className="row">
                  {this.renderCompany()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

ProfilePage.defaultProps = {
  preference: null,
  company: null,
};

ProfilePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  preference: PropTypes.object,
  company: PropTypes.object,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('users.profile');
  const company = UserCompanies.findOne({ userId: Meteor.userId() });
  const preference = UserPreferences.findOne({ userId: Meteor.userId() });
   console.log('=======user=======:', Meteor.user());
  return {
    loading: !subscription.ready(),
    user: Meteor.user() || {},
    isAuthenticated: Meteor.userId() !== null,
    company,
    preference,
  };
})(ProfilePage);

// export default withTracker(() => {
//   const subscription = Meteor.subscribe('listAllTradableCars');
//  // const company = UserCompanies.findOne({ userId: Meteor.userId() });
//   const preference = TradableCars.find({ }).fetch();
//    console.log('=======user=======:', preference);
//   return {
//     loading: !subscription.ready(),
//     user: Meteor.user() || {},
//     isAuthenticated: Meteor.userId() !== null,
   
//     preference,
//   };
// })(ProfilePage);
