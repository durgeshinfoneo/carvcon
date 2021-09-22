import React from 'react';
import i18n from 'meteor/universe:i18n';
// import { Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const T = i18n.createComponent();

const Footer = props => (
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-md-1">
          <img className="logo-footer" src="/logo_footer.png" alt="logo" width="67px" height="67px" />
        </div>
        <div className="col-md-2">
          <div
            className="fb-share-button"
            data-href="http://www.carvcon.com"
            data-layout="button_count"
            data-size="small"
            data-mobile-iframe="true"
          >
            <a
              className="fb-xfbml-parse-ignore"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.carvcon.com%2F&amp;src=sdkpreparse"
            >
                                Share
            </a>
          </div>
        </div>
        <div className="col-md-6">
          <ul className="list-inline quicklinks">
            <li>
              <Link to="/about-us" target="_top"><T>common.searchform.about-us</T></Link>
            </li>
            <li>
              { props.isHome ? (
                <Link className="page-scroll" to="#howitworks"><T>common.homepage.how-it-works</T></Link>
              ) : (
                <Link to="/#howitworks"><T>common.homepage.how-it-works</T></Link>
              )}
            </li>
            <li>
              { props.isHome ? (
                <Link className="page-scroll" to="#whyvcon"><T>common.homepage.why-vcon</T></Link>
              ) : (
                <Link to="/#whyvcon"><T>common.homepage.why-vcon</T></Link>
              )}
            </li>
            <li>
              <Link to="/tc" target="_top"> <T>common.searchform.terms-and-conditions</T> </Link>
            </li>
            <li>
              <Link to="/privacy-policy" target="_top"><T>common.searchform.privacy-policy</T></Link>
            </li>
            <li>
              <Link to="/estimation-disclaimer" target="_top"> <T>common.searchform.estimation-disclaimer</T> </Link>
            </li>
            <li>
              <Link to="/tips" target="_top"> <T>common.searchform.tips</T> </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <ul className="list-inline social-buttons">
            <li>
              <a href="https://twitter.com/vcon_10" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter" /></a>
            </li>
            <li>
              <a href="https://facebook.com/carvcon/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" /></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/13452968/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" /></a>
            </li>
            <li>
              <a href="https://www.instagram.com/VCON_10/" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram" /></a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <span className="copyright">&copy;{new Date().getFullYear()} vCon Limited All right reserved</span>
        </div>
      </div>
    </div>
  </footer>
);

Footer.defaultProps = {
  isHome: true,
};

Footer.propTypes = {
  isHome: PropTypes.bool,
};

export default Footer;
