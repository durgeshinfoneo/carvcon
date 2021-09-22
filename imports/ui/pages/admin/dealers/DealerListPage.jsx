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
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
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
  'common.profile.company-name',
  'common.profile.contact-person',
  'common.profile.action',
];

class DealerListPage extends Component {
  componentDidMount() {
    this.invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  deleteDealer = (e, dealerId) => {
    if (confirm(i18n.__('common.profile.are-you-sure-want-to-delete-this-dealer'))) {
      // console.log('=========customerId=========:', dealerId);
      Meteor.call('users.delete', dealerId, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert(i18n.__('common.profile.dealer-was-deleted-successful'), 'success');
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
                title="Dealers"
                category="Dealer List"
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
                            <td>{user.userCompany().name}</td>
                            <td>{user.userCompany().contactPerson}</td>
                            <td className="text-right">
                              <Link
                                to={`/admin/dealers/${user._id}`}
                                className="btn btn-simple btn-warning btn-icon edit"
                              >
                                <i className="fa fa-edit" />
                              </Link>
                              <Link
                                to={'#'}
                                className="btn btn-simple btn-danger btn-icon remove"
                                onClick={e => this.deleteDealer(e, user._id)}
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

DealerListPage.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // const users = Meteor.users.find().fetch();
  const subscription = Meteor.subscribe('users.list', {});

  return {
    loading: !subscription.ready(),
    users: Meteor.users.find({ roles: ROLES.DEALER }).fetch(),
  };
})(DealerListPage);
