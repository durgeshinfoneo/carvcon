/* eslint-disable import/no-unresolved,
meteor/no-session, react/no-did-mount-set-state, react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import queryString from 'query-string';

import Makers from '../../api/makers/makers';
import Cars from '../../api/cars/cars';
import CarModels from '../../api/carmodels/carmodels';
import FilterableCarForm from '../../ui/components/Search/FilterableCarForm';
import SearchResult from '../../ui/components/Search/SearchResult';


// const T = i18n.createComponent();

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carmodel: '',
      years: '',
      maker: '',
      carclass: '',
      numberOfPreviousOwner: '0',
      buysellcar: '0',
      waiting: true,
      sendGA: true,
      averageCost: 0,
    };
    this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
    // this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    // console.log('componentDidMount SearchPage: ', Object.getOwnPropertyNames(parsed).length > 0);
    // console.log('=========Search Page language===============: ', Session.get('language'));
    if (typeof parsed !== 'undefined' && Object.getOwnPropertyNames(parsed).length > 0) {
      // console.log('SearchPage is not undefined: ', parsed);
      const years = parsed.years.trim();
      const maker = parsed.maker.trim();
      const model = parsed.carmodel.trim();
      const carclass = parsed.carclass.trim();
      this.setState(parsed);
      Session.set('years', years);
      Session.set('maker', maker);
      Session.set('model', model);
      Session.set('carclass', carclass);
      const options = {
        h_f_yr: parsed.years,
        h_f_mk: parsed.maker,
        h_srh: parsed.carmodel,
        h_srh_ty: 2,
        // h_f_ty: '',
        // h_f_se: '',
        // h_f_eg: '',
        // h_f_tr: '',
        // h_f_pr: '',
        // h_f_do: ''
      };
      // crawler(options);
      const filter = {
        model,
        makerId: maker,
        yearsId: years,
      };
      Meteor.call('cars.removeFilter', filter);
      Meteor.call('crawlers.cars', options, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            waiting: false,
            averageCost: res,
          });
          // console.log('componentDidMount crawler: ', res);
        }
      });
    } else {
      this.setState({
        waiting: false,
      });
    }
  }


  handleFilterInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'maker') {
      this.setState({
        carclass: '',
        carmodel: '',
        years: '',
        [name]: value,
        sendGA: false,
      });
    } else if (name === 'carclass') {
      this.setState({
        carmodel: '',
        years: '',
        [name]: value,
        sendGA: false,
      });
    } else if (name === 'carmodel') {
      this.setState({
        years: '23',
        [name]: value,
        sendGA: false,
      });
    } else if (name === 'years') {
      this.setState({
        numberOfPreviousOwner: '0',
        [name]: value,
        sendGA: false,
      });
    } else {
      this.setState({
        [name]: value,
        sendGA: false,
      });
    }
  }

  handleClick = (e, value) => {
    e.preventDefault();
    this.setState({
      buysellcar: value,
    });
  }

  render() {
    return (
      <div className="search-carvcon">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <FilterableCarForm
                onFilterInput={this.handleFilterInputChange}
                handleClick={this.handleClick}
                carmodel={this.state.carmodel}
                years={this.state.years}
                maker={this.state.maker}
                carclass={this.state.carclass}
                makers={this.props.makers}
                buysellcar={this.state.buysellcar}
                numberOfPreviousOwner={this.state.numberOfPreviousOwner}
              />
            </div>
            <SearchResult
              carmodels={this.props.carmodels}
              buysellcar={this.state.buysellcar}
              cars={this.state.averageCost}
              loading={this.props.loading}
              waiting={this.state.waiting}
              sendGA={this.state.sendGA}
              years={this.state.years}
              numberOfPreviousOwner={this.state.numberOfPreviousOwner}
            />
          </div>
        </div>

      </div>
    );
  }
}

SearchPage.propTypes = {
  // cars: PropTypes.arrayOf(Cars).isRequired,
  makers: PropTypes.arrayOf(Object).isRequired,
  carmodels: PropTypes.arrayOf(Object).isRequired,
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const limit = 20;
  const filters = {};
  const modelFilters = {};
  const years = Session.get('years', '');
  const maker = Session.get('maker', '');
  const model = Session.get('model', '');
  const carclassId = Session.get('carclass', '');
  if (model && model !== '') {
    filters.model = model;
    modelFilters.name = model;
    modelFilters['carclass.id'] = carclassId;
  }

  if (years && years !== '') {
    filters.yearsId = years;
  }

  if (maker && maker !== '') {
    filters.makerId = maker;
  }
  const handleCars = Meteor.subscribe('cars.list');
  let cars = [];
  let carmodels = [];
  if (Object.keys(filters).length !== 0 && filters.constructor === Object) {
    cars = Cars.find(filters, { sort: { updatedAt: -1 } }).fetch();
  }
  if (Object.getOwnPropertyNames(modelFilters).length > 0) {
    // console.log('=======carmodels=======: ', modelFilters);
    carmodels = CarModels.find(modelFilters, { limit }).fetch();
    // console.log('=======carmodels=======: ', carmodels);
  }
  const makers = Makers.find({}, { sort: { serverKey: 1 } }).fetch();
  // console.log('=======makers=======: ', makers);

  return {
    cars,
    makers,
    carmodels,
    loading: !handleCars.ready(),
  };
})(SearchPage);
