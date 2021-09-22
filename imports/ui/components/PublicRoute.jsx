/* eslint-disable react/prop-types */
import React from 'react';
import {
  Route,
} from 'react-router-dom';

const PubicRoute = ({ component: Component, layout: Layout, name, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // console.log('=======rest========: ', rest);
      // console.log('=======props========: ', props);
      return (
        <Layout name={name} {...props}>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default PubicRoute;
