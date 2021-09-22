/* eslint-disable class-methods-use-this, no-alert */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { moment } from 'meteor/momentjs:moment';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

export default class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      success: '',
      user: this.props.user,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const user = this.state.user;
    user.profile[name] = value;
    this.setState({
      user,
    });
  }

  deleteAccount = (e) => {
    e.preventDefault();
    if (confirm(i18n.__('common.profile.are-you-sure-to-delete-your-account'))) {
      Meteor.call('users.selfRemove', (error) => {
        if (error) {
          this.setState({
            error: error.reason,
          });
        } else {
          this.setState({
            success: i18n.__('common.profile.account-was-deleted-successfully'),
          });
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const profile = this.state.user.profile;
    Meteor.call('users.updateProfile', profile, (error) => {
      if (error) {
        this.setState({
          error: error.reason,
        });
      } else {
        this.setState({
          success: i18n.__('common.profile.profile-was-updated-successfully'),
        });
      }
    });
  }

  render() {
    const { error, success } = this.state;
    // console.log('=========user==========:', this.state.user);
    // const createdAt = new Date(this.state.user.createdAt).toLocaleString();
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        { error.length > 0 ?
          <div className="alert alert-danger fade in" role="alert">{error}</div>
          : ''
        }
        { success.length > 0 ?
          <div className="alert alert-success fade in" role="alert">{success}</div>
          : ''
        }

        <div className="form-group">
          <label htmlFor="inputFirstName" className="col-sm-2 control-label">
            <T>common.profile.first-name</T>
          </label>

          <div className="col-sm-10">
            <input
              name="firstName"
              type="text"
              className="form-control"
              id="inputFirstName"
              placeholder="First Name"
              value={this.state.user.profile.firstName}
              onChange={this.handleInputChange}
            />
            
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputLastName" className="col-sm-2 control-label">
            <T>common.profile.last-name</T>
          </label>
          <div className="col-sm-10">
            <input
              name="lastName"
              type="text"
              className="form-control"
              id="inputLastName"
              placeholder="Last Name"
              value={this.state.user.profile.lastName}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="col-sm-2 control-label">
            <T>common.profile.email</T>
          </label>
          <div className="col-sm-10">
            <p className="form-control-static">{this.state.user.emails[0].address}</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputPhone" className="col-sm-2 control-label">
            <T>common.profile.phone</T>
          </label>
          <div className="col-sm-10">
            <input
              name="phone"
              type="text"
              className="form-control"
              id="inputPhone"
              placeholder="Phone"
              value={this.state.user.profile.phone}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAge" className="col-sm-2 control-label">
            <T>common.profile.age</T>
          </label>
          <div className="col-sm-10">
            <select
              name="age"
              className="form-control"
              value={this.state.user.profile.age}
              onChange={this.handleInputChange}
            >
              <option value="">{i18n.__('common.profile.age')}</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-50">36-50</option>
              <option value="51-60">51-60</option>
              <option value=">60"> {i18n.__('common.profile.61-or-above')}</option>
            </select>
          </div>
        </div>
        {/* <div className="form-group">
          <label htmlFor="inputRegisteredDate" className="col-sm-2 control-label">Registered Date</label>
          <div className="col-sm-10">
            <p className="form-control-static">{moment(createdAt).format('YYYY MMM DD')}</p>
          </div>
        </div> */}
        <div className="form-group">
          <label htmlFor="inputPassword" className="col-sm-2 control-label">
            <T>common.profile.password</T>
          </label>
          <div className="col-sm-10">
            <p className="form-control-static">********</p>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10" style={{ textAlign: 'right' }}>
            <button
              type="button"
              className="btn btn-default custom-btn btn-delete"
              onClick={this.deleteAccount}
            >
              <T>common.profile.delete</T>
            </button>
            <button type="submit" className="btn btn-default custom-btn btn-save">
              <T>common.profile.save</T>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
};

