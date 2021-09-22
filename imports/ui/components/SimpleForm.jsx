import React from 'react';
import PropTypes from 'prop-types';
import { AutoForm } from 'uniforms-bootstrap3';

const SimpleForm = ({ schema, onSubmit, model = {} }) => (
  <AutoForm
    schema={schema}
    onSubmit={onSubmit}
    model={model}
  />
);

SimpleForm.defaultProps = {
  model: {},
};

SimpleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  model: PropTypes.object,
};

export default SimpleForm;
