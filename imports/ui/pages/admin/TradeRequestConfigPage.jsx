import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import Loading from '../../components/Loading/Loading';
import SimpleForm from '../../components/SimpleForm';
import TradeRequestConfig from '../../../api/tradeRequestConfig/tradeRequestConfig';

const TradeRequestConfigSchema = TradeRequestConfig.simpleSchema();

class TradeRequestConfigPage extends Component {
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
    this.setState({ modalData: data });
    Meteor.call('tradeRequestConfig.update', data, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Trade Request updated!', 'success');
      }
    });
  };

  render() {
    const { loading, tradeRequestConfig } = this.props;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            <h2>Trade Request Config</h2>
            <SimpleForm
              schema={TradeRequestConfigSchema}
              onSubmit={this.onSubmit}
              model={tradeRequestConfig}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

TradeRequestConfigPage.defaultProps = {
  tradeRequestConfig: null,
};

TradeRequestConfigPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  tradeRequestConfig: PropTypes.object,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('tradeRequestConfig.list');
  return {
    loading: !subscription.ready(),
    tradeRequestConfig: TradeRequestConfig.findOne(),
  };
})(TradeRequestConfigPage);
