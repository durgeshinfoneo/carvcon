import React, { Component } from 'react';
// import { Grid, Segment, Menu, Modal, Header } from 'semantic-ui-react';
import { Grid, Col, Row } from 'react-bootstrap';

import SimpleForm from '../../components/SimpleForm';
// import CarYears from '../../api/caryears/caryears';
import UserPreferences from '../../../api/userpreferences/userpreferences';

// const CarYearSchema = CarYears.simpleSchema();
const UserPreferenceSchema = UserPreferences.simpleSchema();

export default class SimplePage extends Component {
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
  };

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            <h2>Simple uniforms demo</h2>
            <SimpleForm schema={UserPreferenceSchema} onSubmit={this.onSubmit} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
