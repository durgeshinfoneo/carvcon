/* eslint-disable  import/prefer-default-export */
// import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
  // Switch,  
  Route,
} from 'react-router-dom';

import MainLayout from '../../ui/layouts/main.jsx';
// route components
import HomePage from '../../ui/pages/HomePage.jsx';
// import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import SearchPage from '../../ui/pages/SearchPage.jsx';
// import DetailCarPage from '../../ui/pages/DetailCarPage.jsx';
import CrawlerPage from '../../ui/pages/CrawlerPage.jsx';

import AboutUsPage from '../../ui/pages/AboutUsPage.jsx';
import TipsPage from '../../ui/pages/TipsPage.jsx';
import PrivacyPolicyPage from '../../ui/pages/PrivacyPolicyPage.jsx';
import TAndCPage from '../../ui/pages/TAndCPage.jsx';
import EstimationDisclaimerPage from '../../ui/pages/EstimationDisclaimerPage.jsx';

export const routers = () => (
  <div>
    <Route exact path="/" component={HomePage} />
    <MainLayout>
      <Route path="/search" component={SearchPage} />
      <Route path="/about-us" component={AboutUsPage} />
      <Route path="/tips" component={TipsPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/tc" component={TAndCPage} />
      <Route path="/estimation-disclaimer" component={EstimationDisclaimerPage} />
      <Route path="/crawler" component={CrawlerPage} />
    </MainLayout>
  </div>
);
