import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
// import { Bert } from 'meteor/themeteorchef:bert';

// import UserSchema from '../../../../api/users/users';
import Loading from '../../../components/Loading/Loading';
import CustomerForm from '../../../components/User/CustomerForm';
import UserPreference from '../../../../api/userpreferences/userpreferences';

const T = i18n.createComponent();

export class CustomerPage extends Component {
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
    const { loading, user, history, preference, isEdit } = this.props;

    if (loading) {
      return (
        <Loading />
      );
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
            <h2><T>common.profile.customer-form</T></h2>
            { isEdit ? (
              <CustomerForm
                history={history}
                user={userInfo}
                preference={preference}
                isEdit
              />
            ) : (
              <CustomerForm
                history={history}
                isEdit={false}
              />
            )}

          </Col>
        </Row>
      </Grid>
    );
  }
}

CustomerPage.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    age: '',
  },
  preference: {
    preferenceCar: '',
    clourCar: '',
    typeCar: '',
    poweredBy: '',
    transmission: 'MT',
    drivingFrequency: '1',
    thirdParty: ['1'],
  },
};

CustomerPage.propTypes = {
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  preference: PropTypes.object,
  isEdit: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const id = match.params.id;
  const subscription = Meteor.subscribe('users.detailAdmin', id);
  let isEdit = false;
  let user = null;
  let preference = null;
  if (id) {
    user = Meteor.users.findOne(id);
    preference = UserPreference.findOne({ userId: id });
    isEdit = true;
  }
  return {
    loading: !subscription.ready(),
    user,
    preference,
    isEdit,
  };
})(CustomerPage);
