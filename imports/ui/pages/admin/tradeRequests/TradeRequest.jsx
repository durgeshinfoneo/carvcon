import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import i18n from 'meteor/universe:i18n';
// import SimpleForm from '../../../components/SimpleForm';
import TradeRequests from '../../../../api/tradeRequests/tradeRequests';
import Loading from '../../../components/Loading/Loading';
import TradeRequestForm from '../../../components/Admin/TradeRequest/TradeRequestForm';

const TradeRequestSchema = TradeRequests.simpleSchema();

const T = i18n.createComponent();

export class TradeRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalData: {},
    };
  }

  componentDidMount() {
    this.invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  onSubmit = (data) => {
    // You can do anything with this data,
    // send it to the server using Meteor.call, invoke GraphQL mutation or
    // just display in a modal :)
    const { isEdit } = this.props;
    if (isEdit) {
      Meteor.call('traderequests.update', data, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Trade Request is updated!', 'success');
        }
      });
    } else {
      Meteor.call('traderequests.insert', data, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Trade Request is inserted!', 'success');
        }
      });
    }

    this.setState({ modalData: data });
  };

  render() {
    const { loading, tradeRequest, isEdit } = this.props;
    // console.log('======tradeRequest=====:', tradeRequest);
    // console.log('=========================:', tradeRequest.owner());
    let model = tradeRequest;
    if (loading) {
      return <Loading />;
    }
    let user = null;
    if (isEdit) {
      user = tradeRequest.owner();
    } else {
      user = Meteor.user();
      model = {
        requester: {
          id: user._id,
          email: user.emails[0].address,
        },
      };
    }
    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            <h2>
              <T>common.traderequest.trade-request</T>
            </h2>

            <TradeRequestForm
              schema={TradeRequestSchema}
              onSubmit={this.onSubmit}
              model={model}
              user={user}
              isEdit={isEdit}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

TradeRequestPage.defaultProps = {
  tradeRequest: {},
};

TradeRequestPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  tradeRequest: PropTypes.object,
  isEdit: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const subscription = Meteor.subscribe('traderequests.list', {}, 0, 0);
  let isEdit = false;
  let tradeRequest = {};
  const id = match.params.id;
  if (id) {
    isEdit = true;
    tradeRequest = TradeRequests.findOne(id);
  }
  return {
    loading: !subscription.ready(),
    isEdit,
    tradeRequest,
  };
})(TradeRequestPage);
