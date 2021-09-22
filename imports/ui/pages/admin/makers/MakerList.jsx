/* eslint-disable react/prefer-stateless-function */
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


import Card from '../../../components/Admin/components/Card/Card.jsx';
import Loading from '../../../components/Loading/Loading';

import Makers from '../../../../api/makers/makers';

const thArray = ['Server Key', 'Chinese Name', 'English Name', 'Source'];
const paginate = new ReactiveVar({
  skip: 0,
  limit: 10,
});


class MakerListPage extends Component {
  // constructor(props) {
  //   super(props);

  //   this.handlePaginateNext = this.handlePaginateNext.bind(this);
  // }

  handlePaginateNext = (e) => {
    e.preventDefault();
    const limit = this.props.paginate.get().limit;
    const skip = this.props.paginate.get().skip;
    const makers = this.props.makers;
    if (makers.length === limit) {
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
    const { makers, loading } = this.props;
    console.log('=========makers=========:', makers);
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
                title="Makers"
                category="Maker List"
                tableFullWidth
                content={
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        {
                          thArray.map((prop, key) => (
                            <th key={key}>{prop}</th>
                          ))
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        makers.map(item => (
                          <tr key={item._id}>
                            <td>{item.serverKey}</td>
                            <td>{item.chineseName}</td>
                            <td>{item.englishName}</td>
                            <td>{item.source}</td>
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

MakerListPage.propTypes = {
  makers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  paginate: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('makers.list', {}, paginate.get().skip, paginate.get().limit);

  return {
    loading: !subscription.ready(),
    makers: Makers.find({}).fetch(),
    paginate,
  };
})(MakerListPage);
