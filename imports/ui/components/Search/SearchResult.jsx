/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
// import ReactLoading from 'react-loading';
import CarList from './CarList';
// import Cars from '../../../api/cars/cars';
// import CarModels from '../../../api/carmodels/carmodels';
import Loading from '../../components/Loading/Loading';

const T = i18n.createComponent();

const SearchResult = (props) => {
  // console.log("SearchResult buysellcar: ", this.props.buysellcar);
  if (props.loading || props.waiting) {
    return (
      <div className="col-sm-8" id="results">
        <section>
          <article>
            <Loading />
            <div style={{ margin: '0 auto' }}>
              <p style={{ textAlign: 'center' }}>
                <T>common.searchform.please-wait</T>
              </p>
            </div>
          </article>
        </section>
      </div>
    );
  }
  return (
    <div className="col-sm-8" id="results">
      <CarList
        cars={props.cars}
        carmodels={props.carmodels}
        buysellcar={props.buysellcar}
        sendGA={props.sendGA}
        numberOfPreviousOwner={props.numberOfPreviousOwner}
        years={props.years}
      />
    </div>
  );
};

SearchResult.propTypes = {
  sendGA: PropTypes.bool.isRequired,
  numberOfPreviousOwner: PropTypes.string.isRequired,
  buysellcar: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  waiting: PropTypes.bool.isRequired,
  cars: PropTypes.number.isRequired,
  years: PropTypes.string.isRequired,
  carmodels: PropTypes.arrayOf(Object).isRequired,
};

export default SearchResult;
