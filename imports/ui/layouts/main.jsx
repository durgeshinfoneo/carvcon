import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

const T = i18n.createComponent();

const MainLayout = ({ children, name, history }) => (
  <div id="main-layout">
    <Header isHome={false} name={name} history={history} />
    <Grid fluid>
      <div className="row">
        <div className="col-md-12 no-padding breadcrumb-fixed">
          <div className="container">
            <ol className="breadcrumb">
              {/* <li>
                <Link to="/">Home</Link>
              </li> */}
              <li className="active">
                <T>{name}</T>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Grid>
    <Grid fluid={false}>
      <div className="row main">{children}</div>
    </Grid>
    <Footer isHome={false} />
  </div>
);

MainLayout.defaultProps = {
  name: '',
  history: {},
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  history: PropTypes.object,
};

export default MainLayout;
