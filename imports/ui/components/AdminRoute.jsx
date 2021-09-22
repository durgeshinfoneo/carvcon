/* eslint-disable react/prop-types */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Bert } from 'meteor/themeteorchef:bert';
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import { ROLES } from '../../helpers/constant';

const AdminRoute = ({ component: Component, name, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // console.log('===========props======:', props);
      // console.log('===========rest======:', rest);
      const userId = Meteor.userId();
      // console.log('===========userId======:', userId);
      const authenticated = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(userId, [ROLES.ADMIN]);
      // console.log('===========isAdmin======:', isAdmin);
      if (!authenticated) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      } else if (!isAdmin) {
        Bert.alert('You don\'t have permission!!!', 'danger');
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        );
      }

      return (
        <Component {...props} {...rest} />
      );
    }

    }
  />
);

export default AdminRoute;
