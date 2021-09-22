/* eslint-disable  import/prefer-default-export, meteor/no-session,
  react/prop-types
*/  
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import createBrowserHistory from 'history/createBrowserHistory';

// import for helpers user
import '../../api/users/users';
// import { Accounts, STATES } from 'meteor/std:accounts-ui';
import MainLayout from '../../ui/layouts/main.jsx';
import AdminLayout from '../../ui/layouts/admin.jsx';
// route components
import HomePage from '../../ui/pages/HomePage.jsx';
import LoginPage from '../../ui/pages/LoginPage.jsx';
import SignupPage from '../../ui/pages/SignupPage.jsx';

// import MarketplacePage from '../../ui/pages/MarketplacePage.jsx';
// import SignupPage from '../../ui/pages/MarketplaceDetailPage.jsx';
// import LoginForm from '../../ui/components/LoginForm.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import SearchPage from '../../ui/pages/SearchPage.jsx';
import PreferencePage from '../../ui/pages/PreferencePage.jsx';
import ProfilePage from '../../ui/pages/ProfilePage.jsx';
import CrawlerPage from '../../ui/pages/CrawlerPage.jsx';

import AboutUsPage from '../../ui/pages/AboutUsPage.jsx';
import TipsPage from '../../ui/pages/TipsPage.jsx';
import PrivacyPolicyPage from '../../ui/pages/PrivacyPolicyPage.jsx';
import TAndCPage from '../../ui/pages/TAndCPage.jsx';
import EstimationDisclaimerPage from '../../ui/pages/EstimationDisclaimerPage.jsx';
import MyTradeRequestPage from '../../ui/pages/MyTradeRequestPage';
import ViewTradeRquestPage from '../../ui/pages/ViewTradeRequestPage';
import FileUploadPage from '../../ui/pages/FileUploadPage';
import PublicRoute from '../../ui/components/PublicRoute';
import PrivateRoute from '../../ui/components/PrivateRoute';
import AdminRoute from '../../ui/components/AdminRoute';
import Dash from '../../ui/components/Admin/containers/Dash/Dash';
import VerifyEmail from '../../ui/pages/VerifyEmail';
import ForgotPassword from '../../ui/pages/ForgotPassword';
import ResetPassword from '../../ui/pages/ResetPassword';
import GetStartedPage from '../../ui/pages/GetStarted';
import UserCompanyPage from '../../ui/pages/UserCompanyPage';
import MarketplacePage from '../../ui/pages/MarketplacePage.jsx';
import MarketplaceDetailPage from '../../ui/pages/MarketplaceDetailPage.jsx';

const browserHistory = createBrowserHistory();

Session.setDefaultPersistent('language', 'zh-HK');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      afterLoginPath: null,
    };
  }

  setAfterLoginPath(afterLoginPath) {
    this.setState({ afterLoginPath });
  }

  render() {
    const { props } = this;
    if (props.loading || props.loggingIn) {
      return (
        <div />
      );
    }  
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <AdminRoute
            {...props}
            path="/admin"
            layout={AdminLayout}
            component={Dash}
          />
          <PublicRoute
            path="/signup"
            layout={MainLayout}
            component={SignupPage}
            name="common.homepage.signup"
          />
          <PublicRoute
            path="/login"
            layout={MainLayout}
            component={LoginPage}
            name="common.homepage.login"
          />
          <PublicRoute
            path="/files"
            layout={MainLayout}
            component={FileUploadPage}
          />

          <PublicRoute
            name="common.profile.verify-email"
            path="/verify-email/:token"
            layout={MainLayout}
            component={VerifyEmail}
          />

          <PublicRoute
            name="common.login.forgot-password"
            path="/forgot-password"
            layout={MainLayout}
            component={ForgotPassword}
          />

          <PublicRoute
            name="common.profile.reset-password"
            path="/reset-password/:token"
            layout={MainLayout}
            component={ResetPassword}
          />

          <PrivateRoute
            {...props}
            path="/company"
            layout={MainLayout}
            component={UserCompanyPage}
            name="common.profile.company"
          />

          <PrivateRoute
            {...props}
            path="/preference"
            layout={MainLayout}
            component={PreferencePage}
            name="common.profile.preference"
          />

          <PrivateRoute
            {...props}
            path="/get-started"
            layout={MainLayout}
            component={GetStartedPage}
            name="Get Started"
          />

          <PrivateRoute
            path="/profile"
            layout={MainLayout}
            component={ProfilePage}
            name="common.homepage.profile"
            {...props}
          />
          <PrivateRoute
            {...props}
            exact
            path="/my-trade-request"
            layout={MainLayout}
            component={MyTradeRequestPage}
            name="common.traderequest.trade-request"
          />
          <PrivateRoute
            path="/my-trade-request/:id"
            layout={MainLayout}
            component={ViewTradeRquestPage}
            name="common.traderequest.trade-request"
            {...props}
          />
          <PublicRoute
            path="/search"
            layout={MainLayout}
            component={SearchPage}
            name="common.searchform.search"
          />
          <PublicRoute
            path="/about-us"
            layout={MainLayout}
            component={AboutUsPage}
            name="common.searchform.about-us"
          />
          <PublicRoute
            path="/tips"
            layout={MainLayout}
            component={TipsPage}
            name="common.searchform.tips"
          />
          

          <PublicRoute
            path="/marketplace"
            layout={MainLayout}
            component={MarketplacePage}
            name="common.marketplace.marketplace"
          />
          <PublicRoute
            path="/marketplacedetail"
            layout={MainLayout}
            component={MarketplaceDetailPage}
            name="common.marketplace.marketplaceDetails"
          />





          <PublicRoute
            path="/privacy-policy"
            layout={MainLayout}
            component={PrivacyPolicyPage}
            name="common.searchform.privacy-policy"
          />
          <PublicRoute
            path="/tc"
            layout={MainLayout}
            component={TAndCPage}
            name="common.searchform.terms-and-conditions"
          />
          <PublicRoute
            path="/estimation-disclaimer"
            layout={MainLayout}
            component={EstimationDisclaimerPage}
            name="common.searchform.estimation-disclaimer"
          />
          <PublicRoute
            path="/crawler"
            layout={MainLayout}
            component={CrawlerPage}
          />
          <PublicRoute
            layout={MainLayout}
            component={NotFoundPage}
          />
        </Switch>

      </Router>
    );
  }
}

App.defaultProps = {
  userId: '',
  emailAddress: '',
  emailVerified: true,
};

App.propTypes = {
  // loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const emailAddress = user && user.emails && user.emails[0].address;
  const fullname = user && user.profile && user.profile.firstName;
  return {
    loggingIn,
    authenticated: !!userId && !loggingIn,
    fullname: fullname || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
    loading,
    userId,
    emailAddress,
    emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
  };
})(App);
