/* eslint-disable react/prefer-stateless-function */
import { Roles } from 'meteor/alanning:roles';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import DealerCard from '../components/Cards/DealerCard';
import { ROLES } from '../../helpers/constant';

const T = i18n.createComponent();

class GetStartedPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  render() {
    const { fullname, roles, userId } = this.props;
    console.log('=====fullname======: ', fullname);
    if (Roles.userIsInRole(userId, [ROLES.CUSTOMER])) {
      return (
        <Redirect to={{ pathname: '/my-trade-request' }} />
      );
    } else if (Roles.userIsInRole(userId, [ROLES.DEALER])) {
      return (
        <Redirect to={{ pathname: '/my-trade-request' }} />
      );
    } else if (Roles.userIsInRole(userId, [ROLES.ADMIN])) {
      return (
        <Redirect to={{ pathname: '/admin' }} />
      );
    }
    return (
      <Redirect to={{ pathname: '/preference' }} />
    );


    // return (
    //   <div className="dealer-page">
    //     <div className="row" style={{ marginBottom: '62px' }}>
    //       <div className="col-xs-12 col-md-offset-2 col-md-4">
    //         <p className="title">
    //           <T>common.get-started.hi</T> <b>{fullname}</b>, <T>common.get-started.lets-get-started</T>
    //         </p>
    //         <div className="subtitle">
    //           <T>common.get-started.please-let-us-know-what-you-are-looking-for</T>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col-xs-12 col-md-offset-2 col-md-3">
    //         <DealerCard
    //           cardName="buy-car"
    //           title={i18n.__('common.get-started.i-want-to-buy-sell-a-car')}
    //           url="/preference"
    //         />
    //       </div>
    //       <div className="col-md-2 col-xs-12">
    //         <p className="txt-or">
    //           <T>common.login.or</T>
    //         </p>
    //       </div>
    //       <div className="col-md-3 col-xs-12">
    //         <DealerCard
    //           cardName="become-dealer"
    //           title={i18n.__('common.get-started.i-want-to-become-a-dealer')}
    //           url="/company"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default GetStartedPage;
