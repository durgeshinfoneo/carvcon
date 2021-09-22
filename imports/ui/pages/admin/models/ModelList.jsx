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
  Image,
} from 'react-bootstrap';


import Card from '../../../components/Admin/components/Card/Card.jsx';
import Loading from '../../../components/Loading/Loading';

import CarModels from '../../../../api/carmodels/carmodels';

const thArray = ['Name', 'Maker', 'Class', 'Price', 'Image'];
const paginate = new ReactiveVar({
  skip: 0,
  limit: 10,
});


class ModelListPage extends Component {
  // constructor(props) {
  //   super(props);

  //   this.handlePaginateNext = this.handlePaginateNext.bind(this);
  // }

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
                title="Models"
                category="Model List"
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
                        data.map(item => (
                          <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{`${item.maker.englishName} ${item.maker.chineseName}`}</td>
                            <td>{item.carclass.name}</td>
                            <td>{item.price}</td>
                            <td>
                              <Image style={{ width: '100px' }} src={item.image.url} thumbnail />
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

ModelListPage.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  paginate: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('carmodels.list', {}, paginate.get().skip, paginate.get().limit);

  return {
    loading: !subscription.ready(),
    data: CarModels.find({}).fetch(),
    paginate,
  };
})(ModelListPage);
