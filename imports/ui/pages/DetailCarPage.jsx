import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ImageGallery from 'react-image-gallery';

import Header from '../components/Header.jsx';
import Cars from '../../api/cars/cars';
import CarModels from '../../api/carmodels/carmodels';


class DetailCarPage extends Component {
  render() {
    const loading = this.props.loading;
    // console.log("loading: ", loading);
    if (loading) {
      // console.log("return null: ", loading);
      return null;
    }
    let newBrandPrice = 0;
    const cm = CarModels.find({ name: this.props.car.model }).fetch()[0];
    // console.log("CarModels: ", cm);
    // console.log("CarModels: ", this.props.car.model);
    if (cm) {
      newBrandPrice = cm.price;
    }

    const cars = Cars.find({
      model: this.props.car.model,
    }).fetch();
    let totalPrice = 0;
    if (cars) {
      cars.map((car) => {
        totalPrice += car.price;
      });
    }
    // console.log("totalPrice: ", totalPrice);
    // console.log("cars: ", cars);
    const avgPrice = totalPrice / cars.length;
    const individualPrice = (avgPrice * 95) / 100;
    const dealerPrice = (avgPrice * 105) / 100;
    const images = [
      {
        original: this.props.car.images[0].url,
        thumbnail: this.props.car.images[0].url,
      },
      {
        original: this.props.car.images[1].url,
        thumbnail: this.props.car.images[1].url,
      },
      {
        original: this.props.car.images[2].url,
        thumbnail: this.props.car.images[2].url,
      },
      {
        original: this.props.car.images[3].url,
        thumbnail: this.props.car.images[3].url,
      },
      {
        original: this.props.car.images[4].url,
        thumbnail: this.props.car.images[4].url,
      },
    ];
    return (
      <div className="detail-car">
        <Header />
        <div className="container">
          <div className="row">
            <ol className="breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Car</Link>
              </li>
              <li className="active">Detail Car</li>
            </ol>
            <div className="col-sm-8">
              <div className="title">
                <span>{this.props.car.nameOfTheCar}</span>
                <span className="pull-right price">HKD$ {new Intl.NumberFormat().format(this.props.car.price)}</span>
              </div>
              <div className="gallery">
                <ImageGallery
                  items={images}
                  slideInterval={2000}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  onImageLoad={this.handleImageLoad}
                />
              </div>
              <div className="full-spectification">
                <p>Full Specification</p>
                <p>{this.props.car.nameOfTheCar}</p>
                <p>{this.props.car.commentary}</p>
                <p>Contact: {this.props.car.contactInformation}</p>
              </div>
            </div>
            <div className="col-sm-4 specification">
              <p>SPECIFICATION</p>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>Numbering:</td>
                    <td className="pull-right">{this.props.car.numbering}</td>
                  </tr>
                  <tr>
                    <td>Make:</td>
                    <td className="pull-right">{this.props.car.depot}</td>
                  </tr>
                  <tr>
                    <td>Model:</td>
                    <td className="pull-right">{this.props.car.model}</td>
                  </tr>
                  <tr>
                    <td>Car Class:</td>
                    <td className="pull-right">{this.props.car.carClass}</td>
                  </tr>
                  <tr>
                    <td>Years:</td>
                    <td className="pull-right">{this.props.car.years}</td>
                  </tr>
                  <tr>
                    <td>Seat:</td>
                    <td className="pull-right">{this.props.car.seat}</td>
                  </tr>
                  <tr>
                    <td>Engine Size:</td>
                    <td className="pull-right">{this.props.car.volume}</td>
                  </tr>
                  <tr>
                    <td>Transmission:</td>
                    <td className="pull-right">{this.props.car.transmission}</td>
                  </tr>
                  <tr>
                    <td>Brand New Price:</td>
                    <td className="pull-right price">{newBrandPrice !== 0 ? `HKD$ ${new Intl.NumberFormat().format(newBrandPrice)}` : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Average Price:</td>
                    <td className="pull-right price">{avgPrice !== 0 ? `HKD$ ${new Intl.NumberFormat().format(avgPrice)}` : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Buy/Sell from Individual Price:</td>
                    <td className="pull-right price">{individualPrice !== 0 ? `HKD$ ${new Intl.NumberFormat().format(individualPrice)}` : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Buy/Sell from Dealer Price:</td>
                    <td className="pull-right price">{dealerPrice !== 0 ? `HKD$ ${new Intl.NumberFormat().format(dealerPrice)}` : 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DetailCarPage.propTypes = {
  car: PropTypes.instanceOf(Cars).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const carId = match.params.id;
  // console.log("carId", carId);
  const handle = Meteor.subscribe('cars.list', {}, 0);
  const handleCarModel = Meteor.subscribe('carmodels.list');
  // console.log("handle", handle);
  // console.log("handle", handleCarModel);
  return {
    loading: !handle.ready() || !handleCarModel.ready(),
    car: Cars.findOne(carId),
  };
})(DetailCarPage);
