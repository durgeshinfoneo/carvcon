/* eslint-disable react/prefer-stateless-function, no-alert */
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Table,
  Grid, Row, Col,
} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import { Bert } from 'meteor/themeteorchef:bert';
import { Link } from 'react-router-dom';
import { ROLES } from '../../../../helpers/constant';
import Card from '../../../components/Admin/components/Card/Card.jsx';
import Loading from '../../../components/Loading/Loading';

const T = i18n.createComponent();

const thArray = [
  'common.profile.first-name',
  'common.profile.last-name',
  'common.profile.age',
  'common.profile.phone',
  'common.profile.email',
  'common.profile.action',
];

class CustomerListPage extends Component {
  deleteCustomer = (e, customerId) => {
    if (confirm(i18n.__('common.profile.are-you-sure-want-to-delete-this-customer'))) {
      // console.log('=========customerId=========:', customerId);
      Meteor.call('users.delete', customerId, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert(i18n.__('common.profile.customer-was-deleted-successful'), 'success');
        }
      });
    }
  }

  render() {
    const { users, loading } = this.props;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Customers"
                category="Customer List"
                tableFullWidth
                content={
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        {
                          thArray.map((prop, key) => (
                            <th key={key}><T>{prop}</T></th>
                          ))
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        users.map(user => (
                          <tr key={user._id}>
                            <td>{user.profile.firstName}</td>
                            <td>{user.profile.lastName}</td>
                            <td>{user.profile.age}</td>
                            <td>{user.profile.phone}</td>
                            <td>{user.emails[0].address}</td>
                            <td className="text-right">
                              <Link
                                to={`/admin/customers/${user._id}`}
                                className="btn btn-simple btn-warning btn-icon edit"
                              >
                                <i className="fa fa-edit" />
                              </Link>
                              <Link
                                to={'#'}
                                className="btn btn-simple btn-danger btn-icon remove"
                                onClick={e => this.deleteCustomer(e, user._id)}
                              >
                                <i className="fa fa-times" />
                              </Link>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

CustomerListPage.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // const users = Meteor.users.find().fetch();
  const subscription = Meteor.subscribe('users.list', { roles: ROLES.CUSTOMER });

  return {
    loading: !subscription.ready(),
    users: Meteor.users.find({ roles: ROLES.CUSTOMER }).fetch(),
  };
})(CustomerListPage);
