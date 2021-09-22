/* eslint-disable import/no-unresolved, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import CarRow from './CarRow';
// import Cars from '../../../api/cars/cars';
// import CarModels from '../../../api/carmodels/carmodels';

const CarList = (props) => {
  const rows = [];
  props.carmodels.map((carmodel, index) =>
    rows.push(<CarRow
      buysellcar={props.buysellcar}
      carmodel={carmodel}
      cars={props.cars}
      key={index}
      sendGA={props.sendGA}
      numberOfPreviousOwner={props.numberOfPreviousOwner}
      years={props.years}
    />));
  return (
    <div className="car-list">
      {rows}
    </div>
  );
};

CarList.propTypes = {
  buysellcar: PropTypes.string.isRequired,
  cars: PropTypes.number.isRequired,
  carmodels: PropTypes.arrayOf(Object).isRequired,
  sendGA: PropTypes.bool.isRequired,
  numberOfPreviousOwner: PropTypes.string.isRequired,
  years: PropTypes.string.isRequired,
};

export default CarList;
