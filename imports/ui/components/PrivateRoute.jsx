/* eslint-disable react/prop-types */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, layout: Layout, name, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const authenticated = Meteor.userId() !== null;
      // console.log('========props=========: ', props);
      // console.log('========rest=========: ', rest);
      return (authenticated ? (
        <Layout name={name} {...props}>
          <Component {...props} {...rest} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ));
    }

    }
  />
);

export default PrivateRoute;
