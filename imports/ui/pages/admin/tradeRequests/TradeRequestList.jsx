/* eslint-disable react/prefer-stateless-function, no-alert */
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Table,
  Grid,
  Row,
  Col,
  Pager,
} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';
import { moment } from 'meteor/momentjs:moment';


import Card from '../../../components/Admin/components/Card/Card.jsx';
import Loading from '../../../components/Loading/Loading';

import TradeRequests from '../../../../api/tradeRequests/tradeRequests';

const T = i18n.createComponent();

const thArray = [
  'common.traderequest.id',
  'common.traderequest.request',
  'common.traderequest.trade-type',
  'common.traderequest.created-at',
  'common.traderequest.accepted-by',
  'common.traderequest.status',
];
const paginate = new ReactiveVar({
  skip: 0,
  limit: 10,
});


class TradeRequestListPage extends Component {
  // constructor(props) {
  //   super(props);

  //   this.handlePaginateNext = this.handlePaginateNext.bind(this);
  // }

  componentDidMount() {
    this.invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this.invalidate);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.invalidate);
  }

  deleteDealer = (e, tradeRequestId) => {
    if (confirm(i18n.__('common.traderequest.are-you-sure-want-to-delete-this-trade-request'))) {
      // console.log('=========customerId=========:', dealerId);
      Meteor.call('traderequests.remove', tradeRequestId, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert(i18n.__('common.traderequest.trade-request-was-deleted-successful'), 'success');
        }
      });
    }
  }

  handlePaginateNext = (e) => {
    e.preventDefault();
    const limit = this.props.paginate.get().limit;
    const skip = this.props.paginate.get().skip;
    const data = this.props.data;
    if (data.length === limit) {
      const obj = {
        limit,
        skip: skip + limit,
      };
      this.props.paginate.set(obj);
    }
  }

  handlePaginatePrevious = (e) => {
    e.preventDefault();
    const limit = this.props.paginate.get().limit;
    const skip = this.props.paginate.get().skip;
    if (skip >= limit) {
      const obj = {
        limit,
        skip: skip - limit,
      };
      this.props.paginate.set(obj);
    }
  }

  render() {
    const { data, loading } = this.props;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Trade Request"
                category="Trade Request List"
                tableFullWidth
                content={
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        {
                          thArray.map((prop, key) => (
                            <th key={key}><T>{prop}</T></th>
                          ))
                        }
                        <th className="disabled-sorting text-right">
                          <T>common.profile.action</T>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.map(item => (
                          <tr key={item._id}>
                            <td>
                              <Link to={`/admin/traderequests/${item._id}`}>
                                {item._id}
                              </Link>
                            </td>
                            <td>{`${item.carYear} ${item.carBrand} ${item.carClass} ${item.carModel}`}</td>
                            <td>{item.tradeType}</td>
                            <td>{moment(item.createdAt).format('YYYY MMM DD')}</td>
                            <td>{item.acceptedBy && item.acceptedBy.name ? item.acceptedBy.name : ''}</td>
                            <td>
                              <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                            </td>
                            <td className="text-right">
                              <Link
                                to={`/admin/traderequests/${item._id}`}
                                className="btn btn-simple btn-warning btn-icon edit"
                              >
                                <i className="fa fa-edit" />
                              </Link>
                              <Link
                                to={'#'}
                                className="btn btn-simple btn-danger btn-icon remove"
                                onClick={e => this.deleteDealer(e, item._id)}
                              >
                                <i className="fa fa-times" />
                              </Link>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
          <Row>
            {/* <Col sm={5}>
              <div role="status">Showing 1 to 10 of 40 entrie</div>
            </Col> */}
            <Col sm={12}>
              <Pager>
                <Pager.Item previous href="#" onClick={this.handlePaginatePrevious}>
                  &larr; Previous Page
                </Pager.Item>
                <Pager.Item next href="#" onClick={this.handlePaginateNext} >
                  Next Page &rarr;
                </Pager.Item>
              </Pager>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

TradeRequestListPage.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  paginate: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('traderequests.list', {}, paginate.get().skip, paginate.get().limit);

  return {
    loading: !subscription.ready(),
    data: TradeRequests.find({}).fetch(),
    paginate,
  };
})(TradeRequestListPage);
