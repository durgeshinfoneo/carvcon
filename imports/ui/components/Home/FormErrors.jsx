/* eslint-disable import/prefer-default-export, react/no-array-index-key, react/prop-types */
import React from 'react';

export const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, index) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={index}>{fieldName} {formErrors[fieldName]}</p>
        );
      }
      return '';
    })}
  </div>
);
