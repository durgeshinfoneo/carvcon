import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
// import { Tracker } from 'meteor/tracker';
// import { Session } from 'meteor/session';
// import { Helmet } from 'react-helmet';
// import { renderToString } from 'react-dom/server';
// import { onPageLoad } from 'meteor/server-render';
// import 'semantic-ui-css/semantic.min.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/owl.carousel.min.js';

import '../imports/startup/accounts-config.js';
import App from '../imports/startup/client';

// import 'react-image-gallery/styles/css/image-gallery.css';
// import '../client/css/agency.css';

// Session.setDefaultPersistent("language", "zh-HK");
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
  // Tracker.autorun(() => {
  //   let lang;
  //   lang = Session.get('language');
  //   console.log('==========startup language===========: ', lang);
  // });
});

// onPageLoad((sink) => {
//   render(<App />, document.getElementById('render-target'));
// });
