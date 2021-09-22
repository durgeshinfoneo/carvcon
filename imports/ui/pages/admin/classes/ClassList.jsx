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

import CarClasses from '../../../../api/carclasses/carclasses';

const thArray = ['Name', 'Maker'];
const paginate = new ReactiveVar({
  skip: 0,
  limit: 10,
});


class ClassListPage extends Component {
  // constructor(props) {
  //   super(props);

  //   this.handlePaginateNext = this.handlePaginateNext.bind(this);
  // }

  handlePaginateNext = (e) => {
    e.preventDefault();
    const limit = this.props.paginate.get().limit;
    const skip = this.props.paginate.get().skip;
    const carclasses = this.props.carclasses;
    if (carclasses.length === limit) {
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
    const { carclasses, loading } = this.props;
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
                title="Classes"
                category="Class List"
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
                        carclasses.map(item => (
                          <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{`${item.maker.englishName} ${item.maker.chineseName}`}</td>
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

ClassListPage.propTypes = {
  carclasses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  paginate: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('carclasses.list', {}, paginate.get().skip, paginate.get().limit);

  return {
    loading: !subscription.ready(),
    carclasses: CarClasses.find({}).fetch(),
    paginate,
  };
})(ClassListPage);
