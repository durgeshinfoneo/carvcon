import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// this is used to create scrollbars on windows devices like the ones from apple devices
import * as Ps from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// react component that creates notifications (like some alerts with messages)
import NotificationSystem from 'react-notification-system';

import Sidebar from '../components/Admin/components/Sidebar/Sidebar';
import Header from '../components/Admin/components/Header/Header';
import Footer from '../components/Admin/components/Footer/Footer';

// style for notifications
import { style } from '../components/Admin/variables/Variables';

const AdminLayout = props => (
  <div className="wrapper wrapper-admin">
    <NotificationSystem style={style} />
    <Sidebar {...props} />
    <div className="main-panel">
      <Header {...props} />
      <Grid fluid={false}>
        <div className="row">{props.children}</div>
      </Grid>
      <Footer fluid />
    </div>
  </div>
);

AdminLayout.defaultProps = {
  name: '',
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
};

export default AdminLayout;
