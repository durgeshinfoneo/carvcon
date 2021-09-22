import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

const FieldGroup = ({ id, label, help, validationState, ...props }) => (
  <FormGroup
    controlId={id}
    validationState={validationState}
  >
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);

FieldGroup.defaultProps = {
  id: '',
  label: '',
  help: '',
  validationState: '',
};

FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  help: PropTypes.string,
  validationState: PropTypes.string,
};

export default FieldGroup;
