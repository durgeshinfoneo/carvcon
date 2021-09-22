import React from 'react';
import { renderToString } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
// import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
// import i18n from 'meteor/universe:i18n';
// import { routes } from '../both/routes';
import './fixtures';
import './api';
import './email';
import './accounts';

// const T = i18n.createComponent();

onPageLoad((sink) => {
  // const context = {};
  // const App = (props) => (
  //     <StaticRouter location={props.location} context={context}>
  //         {routes}
  //     </StaticRouter>
  // );
  // App.propTypes = {
  //     location: PropTypes.object.isRequired,
  // };

  sink.renderIntoElementById('render-target', renderToString(
    <Helmet>
      <meta charSet="utf-8" />
      <title>vCon - 香港二手車估價</title>
      <meta name="description" content="vCon 係全港第一個網上二手車估價平台。你只需要提供想要嘅車款及年份，我哋會利用龐大的資料庫準確地幫你計算車價，連同其他費用，所需支出一目了然。" />
      <meta name="keywords" content="二手車, 易手車, 二手車估價, 二手車價錢, 二手車買賣, 二手車手續, 車價, 二手車交易, 二手車資料庫" />
      <link rel="canonical" href="http://mysite.com/example" />
      <meta property="og:url" content="http://www.carvcon.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="vCon - 香港二手車估價" />
      <meta property="og:description" content="vCon 係全港第一個網上二手車估價平台。你只需要提供想要嘅車款及年份，我哋會利用龐大的資料庫準確地幫你計算車價，連同其他費用，所需支出一目了然。" />
      <meta property="og:image" content="http://www.carvcon.com/logo2.png" />
    </Helmet>,
  ));
  const helmet = Helmet.renderStatic();
  // console.log("==============: ", helmet.meta.toString());
  // console.log("==============: ", helmet.title.toString());
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());
});
