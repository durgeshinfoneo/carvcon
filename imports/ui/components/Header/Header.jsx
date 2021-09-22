/* eslint-disable jsx-a11y/href-no-hash, meteor/no-session */
import { Meteor } from 'meteor/meteor';
// import $ from 'meteor/jquery';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import i18n from 'meteor/universe:i18n';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { DEFAULT_AVATAR, ROLES } from '../../../helpers/constant';
import './Header.scss';

const $ = global.$;
const T = i18n.createComponent();

class Header extends Component {
  constructor(props) {
    super(props);
    const language = Session.get('language');
    this.state = {
      language,
      isAuthenticated: Meteor.userId() !== null,
    };
    i18n.setLocale(language);
    this.handleFilterInputchange = this.handleFilterInputchange.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
      const $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50),
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
    });
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
      target: '.navbar-fixed-top',
      offset: 51,
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function (event) {
      // event.stopPropagation();
      // alert($(this).closest('.dropdown').length);
      // alert($(this).closest('.dropdown-menu').length);
      if ($(this).closest('.dropdown').length <= 0) {
        $('.navbar-toggle:visible').click();
      } else if ($(this).closest('.dropdown-menu').length > 0) {
        $('.navbar-toggle:visible').click();
      }
    });

    // Offset for Main Navigation
    if (this.props.isHome) {
      $('#mainNav').affix({
        offset: {
          top: 100,
        },
      });
    }

    $('.carousel').carousel();


    $(document).ready(function () {
      const hash = window.location.hash;
      // console.log("$(hash).offset().top: ", $(hash).offset().top)
      if (hash !== '') {
        $('html, body').stop().animate({
          scrollTop: ($(hash).offset().top - 50),
        }, 1250, 'easeInOutExpo');
      }
    });


    $(document).on('click touchstart', function (e) {
      const mainNav = $('#mainNav');
      if (!mainNav.is(e.target) && mainNav.has(e.target).length === 0) {
        // sidebar.removeClass('active')
        const clickover = $(event.target);
        const $navbar = $('.navbar-collapse');
        const _opened = $navbar.hasClass('in');
        if (_opened === true && !clickover.hasClass('navbar-toggle')) {
          $navbar.collapse('hide');
        }
      }
    });
  }

  handleFilterInputchange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    i18n.setLocale(value);
    Session.setPersistent('language', value);
    this.setState({
      [name]: value,
    });
  }

  logout(e) {
    e.preventDefault();
    Meteor.logout((err) => {
      if (err) {
        console.log(err.reason);
      } else {
        this.props.history.push('/login');
      }
    });
  }

  render() {
    // console.log('============Header============: ', this.props);
    let cssClassNav = 'navbar navbar-default navbar-custom navbar-fixed-top';
    if (!this.props.isHome) {
      cssClassNav += ' affix';
    }
    const currentUser = this.props.currentUser;
    const userDataAvailable = (currentUser !== undefined);
    const loggedIn = (currentUser && userDataAvailable);
    let avatar = DEFAULT_AVATAR;
    if (currentUser && currentUser.profile.avatar) {
      avatar = currentUser.profile.avatar;
    }
    return (
      <nav id="mainNav" className={cssClassNav}>
        <div className="container">
          <div className="navbar-header page-scroll">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            // style={{ padding: '10px', marginTop: '15px' }}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand page-scroll" href="/">
              <img alt="Brand" src="/logo2.png" height="63px" />
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="language hidden-xs hidden-sm hidden-md">
                <select
                  name="language"
                  value={this.state.language}
                  onChange={this.handleFilterInputchange}
                >
                  <option value="en-US">English</option>
                  <option value="zh-HK">中文</option>
                </select>
              </li>
              {!this.state.isAuthenticated &&
                <div>
                  <li
                    className="visible-xs-inline-block visible-sm-inline-block visible-md-inline-block text-right"
                    style={{ margin: '0 auto', width: '50%' }}
                  >
                    <Link
                      style={{ margin: '15px' }}
                      id="login-button"
                      className="page-scroll btn btn-xl custom-btn"
                      to="/login"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.in"
                    >
                      <T>common.homepage.login</T>
                    </Link>
                  </li>

                  <li
                    className="visible-xs-inline-block visible-sm-inline-block visible-md-inline-block text-left"
                    style={{ margin: '0 auto', width: '50%' }}
                  >
                    <Link
                      id="signup-button"
                      className="page-scroll btn btn-xl custom-btn"
                      to="/signup"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.in"
                    >
                      <T>common.homepage.signup</T>
                    </Link>
                  </li>
                </div>
              }
              {this.state.isAuthenticated &&
                <li className="dropdown visible-xs-block visible-sm-block visible-md-block text-center">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={avatar}
                      alt="avatar"
                      className="img-circle"
                      width="42px"
                      height="42px"
                      style={{ marginRight: '10px' }}
                    />
                    {loggedIn ? `${currentUser.profile.firstName} ${currentUser.profile.lastName}` : ''}
                    <span className="caret" />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        to="/profile"
                      >
                        <T>common.homepage.profile</T>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/my-trade-request"
                      >
                        <T>common.homepage.trade-request</T>
                      </Link>
                    </li>
                    {Roles.userIsInRole(currentUser._id, [ROLES.ADMIN]) &&
                      <li>
                        <Link
                          to="/admin"
                        >
                          <T>common.homepage.admin</T>
                        </Link>
                      </li>
                    }
                    <li>
                      <a href="#" onClick={this.logout}>
                        <T>common.homepage.logout</T>
                      </a>
                    </li>
                  </ul>
                </li>
              }
            </ul>

            <ul className="nav navbar-nav navbar-left">
              <li className="hidden">
                <a href="#page-top" />
              </li>

              <li>
                <Link to="/about-us" target="_top"><T>common.searchform.about-us</T></Link>
              </li>
              <li>
                {this.props.isHome ? (
                  <Link
                    className="page-scroll"
                    to="#howitworks"
                  >
                    <T>common.homepage.how-it-works</T>
                  </Link>
                ) : (
                    <Link to="/#howitworks"><T>common.homepage.how-it-works</T></Link>
                  )}
              </li>
              <li>
                {this.props.isHome ? (
                  <Link
                    className="page-scroll valuation-btn"
                    to="#"
                  >
                    Valuation
                  </Link>
                ) : <Link to="#"></Link>}
              </li>
              {/* <li>
                {this.props.isHome ? (
                  <Link className="page-scroll" to="#whyvcon"><T>common.homepage.why-vcon</T></Link>
                ) : (
                  <Link to="/#whyvcon"><T>common.homepage.why-vcon</T></Link>
                )}
              </li> */}
            </ul>

            {this.state.isAuthenticated ? (
              <ul className="nav navbar-nav navbar-right">


                <li>
                  <a
                    id="quote-button"
                    className="btn btn-xl custom-btn marketplacehighlight"
                    href="/marketplace" style={{ width: 'auto', }}
                  >
                    <T>common.homepage.marketplace</T>
                  </a>
                </li>
                {this.props.isHome ? (



                  <li>
                    <a
                      id="quote-button"
                      className="btn btn-xl custom-btn"
                      href="#"
                    >
                      <T>common.homepage.get-a-quote</T>
                    </a>
                  </li>


                ) : (



                    <li>
                      <a
                        id="quote-button"
                        className="btn btn-xl custom-btn"
                        href="/#"
                      >
                        <T>common.homepage.get-a-quote</T>
                      </a>
                    </li>
                  )}

                <li>
                  <a
                    id="insurance-button"
                    className="btn btn-xl custom-btn"
                    href="https://docs.google.com/forms/d/1f5wzRu1UOfcy750pB5ER1-bSImY7buQ_bO5tLbzuAyc/edit?ts=5b7b6274"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <T>common.homepage.motor-insurance-comparison</T>
                  </a>
                </li>

                <li className="_dropdown hidden-xs hidden-sm hidden-md">
                  <div
                    className="dropbtn"
                  >
                    <img
                      src={loggedIn ? avatar : ''}
                      alt="avatar"
                      className="img-circle"
                      width="42"
                      height="42"
                      style={{ marginRight: '10px' }}
                    />
                    {loggedIn ? `${currentUser.profile.firstName} ${currentUser.profile.lastName}` : ''}
                    <span className="caret" />
                  </div>
                  <ul className="_dropdown-content">
                    <li>
                      <Link
                        to="/profile"
                      >
                        <T>common.homepage.profile</T>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/my-trade-request"
                      >
                        <T>common.homepage.trade-request</T>
                      </Link>
                    </li>
                    {Roles.userIsInRole(currentUser._id, [ROLES.ADMIN]) &&
                      <li>
                        <Link
                          to="/admin"
                        >
                          <T>common.homepage.admin</T>
                        </Link>
                      </li>
                    }
                    <li><a href="#" onClick={this.logout}>
                      <T>common.homepage.logout</T>
                    </a></li>
                  </ul>
                </li>

                <li className="language visible-xs-block visible-sm-block visible-md-block">
                  <select
                    name="language"
                    value={this.state.language}
                    onChange={this.handleFilterInputchange}
                  >
                    <option value="en-US">English</option>
                    <option value="zh-HK">中文</option>
                  </select>
                </li>

              </ul>
            ) : (
                <ul className="nav navbar-nav navbar-right">
                  {this.props.isHome ? (
                    <li>
                      <a
                        id="quote-button"
                        className="btn btn-xl custom-btn"
                        href="#"
                      >
                        <T>common.homepage.get-a-quote</T>
                      </a>
                    </li>
                  ) : (
                      <li>
                        <a
                          id="quote-button"
                          className="btn btn-xl custom-btn"
                          href="/#"
                        >
                          <T>common.homepage.get-a-quote</T>
                        </a>
                      </li>
                    )}
                  <li>
                    <a
                      id="quote-button"
                      className="btn btn-xl custom-btn marketplacehighlight"
                      href="/marketplace" style={{ width: 'auto' }}
                    >
                      <T>common.homepage.marketplace</T>
                    </a>
                  </li>
                  <li>
                    <a
                      id="insurance-button"
                      className="btn btn-xl custom-btn"
                      href="https://goo.gl/forms/v5IapHXzvxMYDmo53"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <T>common.homepage.motor-insurance-comparison</T>
                    </a>
                  </li>

                  <li className="language visible-xs-block visible-sm-block visible-md-block">
                    <select
                      name="language"
                      value={this.state.language}
                      onChange={this.handleFilterInputchange}
                    >
                      <option value="en-US">English</option>
                      <option value="zh-HK">中文</option>
                    </select>
                  </li>

                  <li>
                    <Link
                      id="signup-button"
                      className="page-scroll btn btn-xl custom-btn hidden-xs hidden-sm hidden-md"
                      to="/signup"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.in"
                    >
                      <T>common.homepage.signup</T>
                    </Link>
                  </li>
                  <li>
                    <Link
                      id="login-button"
                      className="page-scroll btn btn-xl custom-btn hidden-xs hidden-sm hidden-md"
                      to="/login"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.in"
                    >
                      <T>common.homepage.login</T>
                    </Link>
                  </li>
                </ul>
              )}
          </div>
        </div>
      </nav>
    );
  }
}

Header.defaultProps = {
  isHome: true,
};

Header.propTypes = {
  isHome: PropTypes.bool,
};

export default withTracker(() => {
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
})(Header);
