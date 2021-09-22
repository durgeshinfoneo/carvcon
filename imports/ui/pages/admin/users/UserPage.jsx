import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
// import { Bert } from 'meteor/themeteorchef:bert';

import Loading from '../../../components/Loading/Loading';
import UserForm from '../../../components/User/UserForm';

const T = i18n.createComponent();

export class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalData: {},
    };
  }

  onSubmit = (data) => {
    // You can do anything with this data,
    // send it to the server using Meteor.call, invoke GraphQL mutation or
    // just display in a modal :)

    // Meteor.call('users.update', data, (error) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     Bert.alert('Trade Request updated!', 'success');
    //   }
    // });
    this.setState({ modalData: data });
  };

  render() {
    const { loading, user, history, isEdit } = this.props;

    if (loading) {
      return <Loading />;
    }
    let userInfo = {};
    if (user) {
      userInfo = {
        _id: user._id,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        email: user.emails[0].address,
        phone: user.profile.phone,
        age: user.profile.age,
      };
    }

    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            <h2>
              <T>common.profile.user-form</T>
            </h2>
            {isEdit ? (
              <UserForm history={history} user={userInfo} isEdit />
            ) : (
              <UserForm history={history} isEdit={false} />
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

UserPage.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    age: '',
  },
};

UserPage.propTypes = {
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  isEdit: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const id = match.params.id;
  const subscription = Meteor.subscribe('users.detailAdmin', id);
  let isEdit = false;
  let user = null;
  if (id) {
    user = Meteor.users.findOne(id);
    isEdit = true;
  }
  return {
    loading: !subscription.ready(),
    user,
    isEdit,
  };
})(UserPage);
