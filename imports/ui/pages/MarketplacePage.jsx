/* eslint-disable className-methods-use-this */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import i18n from 'meteor/universe:i18n';
import FormValidator from '../components/FormValidator';
import './../css/marketplace.css';
import './../css/jquery-ui.css';
import './../js/jquery-ui.js';
import TradableCars from '../../api/tradableCars/tradableCars';
import { withTracker } from 'meteor/react-meteor-data';
const T = i18n.createComponent();

class MarketplacePage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   error: '',
    //   success: '',
    //   tradableCars: this.props.tradableCars,
    // };
  }

  componentDidMount() {

    // Meteor.call('tradableCars.remove','W8YCtTFPeEN2xbzuR',(err)=>{
    //   if(err){
    //     alert(err);
    //   }else{
    //     alert('successfully removed W8YCtTFPeEN2xbzuR');
    //   }
    // });
    // Meteor.call('tradableCars.insert',tcdata,(err)=>{
    //   if(err){
    //     alert(err);
    //   } else {
    //    // alert('success');
    //    console.log('saved');
    //   }

    // })  


    // const tradableCar = {
    //   carBrand:'Tata',
    //   model:'Jaguar',
    //   sellingPrice:'10000000',
    //   cc:5000,
    //   year:2019,
    //   hands:2,
    //   transmission:'automatic',
    //   mainPhoto:'first',
    //   shortDescription:'this is the short description',
    //   likes:10,
    //   favorite:true,
    // }
    //  Meteor.call('tradableCars.insert',tradableCar,);

    // const subscription = Meteor.subscribe('listAllTradableCars');
    //  setTimeout(()=>{
    //   const tradableCars = TradableCars.find({}).fetch();
    //  if(subscription.ready){
    //  console.log('=======user=======:',tradableCars);
    // }
    // },1000);

    //console.log('this.state',this.state.tradableCars);
    var w = window.location.href.split('?i=');
    if (w.length > 1 && w[1] == '1') {
      setTimeout(() => {
        this.props.history.push('/');
      }, 5000);
    }

    var availableTags = [
      "Hyundai",
      "Toyota",
      "KIA",
      "Mahindra",
      "Tata Motors"
    ];

    $("#txtCar").autocomplete({
      source: availableTags
    });

    $(document).on('click', 'div.link', function () {
      var ele = $(this).parent().find('ul.submenu');
      ele.toggle();
      // $(this).closest('li')
      if ($(this).parent().find('ul.submenu').is(':visible')) {
        $(this).closest('li').addClass('default').addClass('open');
      }
      else {
        $(this).closest('li').removeClass('default').removeClass('open');
      }
    })
  }
  render() {
    return (

      <section className="car_min pdg0">
        <div className="container margin_t_b">

          <div className="from_fillter">
            <div className="row">
              <div className="col-md-2">
                <div className="car_brand_box">
                  <div className="car_brand">
                    <label htmlFor="txtCar">Car Brand</label>

                    <input type="text" id="txtCar" className="form-control" name="txtCar" />

                  </div>

                </div>
              </div>
              <div className="col-md-2">
                <div className="car_brand_box">
                  <div className="car_brand">
                    <label htmlFor="email_address">Model</label>

                    <input type="text" id="email_address" className="form-control" name="email-address" />

                  </div>

                </div>
              </div>
              <div className="col-md-2">
                <div className="car_brand_box">
                  <div className="car_brand">
                    <label htmlFor="email_address">CC</label>

                    <input type="text" id="email_address" className="form-control" name="email-address" />

                  </div>

                </div>
              </div>
              <div className="col-md-2">
                <div className="car_brand_box">
                  <div className="car_brand">
                    <label htmlFor="email_address">Year</label>

                    <input type="text" id="email_address" className="form-control" name="email-address" />

                  </div>

                </div>
              </div>
              <div className="col-md-2">
                <div className="car_brand_box">
                  <div className="car_brand">
                    <label htmlFor="email_address">Others</label>

                    <input type="text" id="email_address" className="form-control" name="email-address" />

                  </div>
                </div>
              </div>
            </div>

            <div className="row mt_15" >
              <div className="col-md-8" style={{ padding: '0px' }}>
                <div className="col-md-4">
                  <div className="car_brand_box">
                    <div className="car_brand">
                      <label htmlFor="email_address">New/Used</label>

                      <select className="form-control" id="sel1">
                        <option>New</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>

                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="car_brand_box">
                    <div className="car_brand">
                      <label htmlFor="email_address">Transmission</label>

                      <select className="form-control" id="sel1">
                        <option>Manual</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>

                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="car_brand_box">
                    <div className="car_brand">
                      <label htmlFor="email_address">Status</label>

                      <select className="form-control" id="sel1">
                        <option>All</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>

                    </div>
                  </div>
                </div>

              </div>
              <div className="col-md-4">
                <div className="row" style={{ margin: '0px' }} >
                  <div className="col-md-7" style={{ padding: '0px' }}>
                    <div className="car_brand_box">
                      <div className="car_brand">
                        <label htmlFor="email_address">Price</label>

                        <input type="text" id="email_address" className="form-control car_brand2" name="email-address" />
                        <span className="hipen"> -</span>
                        <input type="text" id="email_address" className="form-control car_brand2" name="email-address" />

                      </div>
                    </div>
                  </div>
                  <div className="col-md-5" style={{ padding: '0px' }}>
                    <div className="car_brand_box">
                      <button className="SEARCH_btn2">SEARCH</button>
                      <button className="CLEAR_btn2">CLEAR</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            <div className="clearfix"></div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="post_all">
                <a href="#"> Post a New Car</a>
              </div>
            </div>

          </div>

          <div className="row">

            <div className="col-md-4">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="car-details2.html"> <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="heart_icon">
                    <a href="#">
                      <img src="https://i.ibb.co/XJ4MKS3/heart-black.png" />
                    </a>
                    <span>256</span>
                  </div>
                  <div className="clearfix"></div>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>

                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh </p>

                  <a className="approving" href="#">Approving</a>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="car-details2.html"> <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="heart_icon">
                    <a href="#">
                      <img src="https://i.ibb.co/XJ4MKS3/heart-black.png" />
                    </a>
                    <span>256</span>
                  </div>
                  <div className="clearfix"></div>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>

                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh </p>

                  <a className="approving" href="#">Approving</a>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="car-details2.html"> <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="heart_icon">
                    <a href="#">
                      <img src="https://i.ibb.co/XJ4MKS3/heart-black.png" />
                    </a>
                    <span>256</span>
                  </div>
                  <div className="clearfix"></div>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>

                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh </p>

                  <a className="approving" href="#">Approving</a>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>

          </div>

          <div className="row mt_3">

            <div className="col-md-4">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="car-details2.html"> <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="heart_icon1">
                    <a href="#">
                      <img src="https://i.ibb.co/KLyxSwf/heart-red.png" />
                    </a>
                    <span>256</span>
                  </div>
                  <div className="clearfix"></div>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>

                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh </p>

                  <a className="On_Sale" href="#">On Sale</a>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="car-details2.html"> <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="heart_icon">
                    <a href="#">
                      <img src="https://i.ibb.co/XJ4MKS3/heart-black.png" />
                    </a>
                    <span>256</span>
                  </div>
                  <div className="clearfix"></div>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>

                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh </p>

                  <a className="Deleted_opt" href="#">Deleted</a>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="car-details2.html"> <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="heart_icon">
                    <a href="#">
                      <img src="https://i.ibb.co/XJ4MKS3/heart-black.png" />
                    </a>
                    <span>256</span>
                  </div>
                  <div className="clearfix"></div>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>

                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh </p>

                  <a className="Deleted_opt" href="#">Rejected</a>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>

          </div>

          <div className="row mt_3">

            <div className="col-md-4">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="car-details2.html"> <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="heart_icon">
                    <a href="#">
                      <img src="https://i.ibb.co/XJ4MKS3/heart-black.png" />
                    </a>
                    <span>256</span>
                  </div>
                  <div className="clearfix"></div>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>

                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh </p>

                  <a className="Deleted_opt" href="#">Sold</a>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>

          </div>

        </div>
        {/* </section> */}




        {/* <div className="container margin_t_b">


          <div className="row">
            <div className="col-md-2 padg_right">
              <div className="filter_main">

                <div className="filter_box">
                  <h6 className="font-weight-bold mb-3">Filter</h6>

                  <div className="row">


                    <ul id="accordion" className="accordion">

                      <li>
                        <div className="link">CAR BRAND<i className="fa fa-chevron-down"></i></div>
                        <ul className="submenu">
                          <li>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price1" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">Ford</label>
                            </div>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price2" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">Maruti Suzuki</label>
                            </div>

                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price3" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">Tata</label>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li className="default open">
                        <div className="link">MODEL<i className="fa fa-chevron-down"></i></div>
                        <ul className="submenu">
                          <li>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price1" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">Ford</label>
                            </div>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price2" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">Maruti Suzuki</label>
                            </div>

                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price3" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">Tata</label>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div className="link">
                          SELLING PRICE
                          <i className="fa fa-chevron-down"></i>
                        </div>
                        <ul className="submenu">
                          <li>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price1" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">50000 - 100000</label>
                            </div>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price2" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">100000 - 150000</label>
                            </div>

                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price3" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">150000 - 200000</label>
                            </div>

                          </li>
                        </ul>
                      </li>
                      <li>
                        <div className="link">CC <i className="fa fa-chevron-down"></i></div>
                        <ul className="submenu">
                          <li>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price1" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">1000 </label>
                            </div>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price2" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">1200</label>
                            </div>


                          </li>
                        </ul>
                      </li>

                      <li>
                        <div className="link">YEAR <i className="fa fa-chevron-down"></i></div>
                        <ul className="submenu">
                          <li>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price1" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">2019 </label>
                            </div>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price2" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">2020</label>
                            </div>

                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price2" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">2021</label>
                            </div>
                          </li>
                        </ul>
                      </li>


                      <li>
                        <div className="link">NEW / USED <i className="fa fa-chevron-down"></i></div>
                        <ul className="submenu">
                          <li>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price1" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">1st Hand </label>
                            </div>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price2" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">2nd Hand</label>
                            </div>


                          </li>
                        </ul>
                      </li>

                      <li>
                        <div className="link">TRANMISSION <i className="fa fa-chevron-down"></i></div>
                        <ul className="submenu">
                          <li>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price1" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">AUTOMATIC </label>
                            </div>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price2" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">MANUAL</label>
                            </div>


                          </li>
                        </ul>
                      </li>

                      <li>
                        <div className="link">STATUS <i className="fa fa-chevron-down"></i></div>
                        <ul className="submenu">
                          <li>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price1" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">Under Review </label>
                            </div>
                            <div className="form-check pl-0 mb-3">
                              <input type="checkbox" className="form-check-input filled-in" id="price2" />
                              <label className="form-check-label small text-uppercase card-link-secondary small_font">Available for Sale</label>
                            </div>


                          </li>
                        </ul>
                      </li>

                    </ul>
                  </div>





                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="/marketplacedetail"> <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>
                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh and goes upto Rs. 8.56 Lakh.</p>
                  <div className="clearfix"></div>
                  <div className="like_icons">
                    <a href="#"><img src="https://i.ibb.co/Bw51kKk/like-1.png" /> <p> 2</p></a>
                  </div>

                  <div className="like_fbrat">
                    <a href="#"><img src="https://i.ibb.co/Jdn873m/heart.png" /></a>
                  </div>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="/marketplacedetail">  <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>
                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh and goes upto Rs. 8.56 Lakh.</p>
                  <div className="clearfix"></div>
                  <div className="like_icons">
                    <a href="#"><img src="https://i.ibb.co/Bw51kKk/like-1.png" /> <p> 2</p></a>
                  </div>

                  <div className="like_fbrat">
                    <a href="#"><img src="https://i.ibb.co/Jdn873m/heart.png" /></a>
                  </div>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>

            <div className="col-md-5 mt-3">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="/marketplacedetail"> <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>
                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh and goes upto Rs. 8.56 Lakh.</p>
                  <div className="clearfix"></div>
                  <div className="like_icons">
                    <a href="#"><img src="https://i.ibb.co/Bw51kKk/like-1.png" /> <p> 2</p></a>
                  </div>

                  <div className="like_fbrat">
                    <a href="#"><img src="https://i.ibb.co/Jdn873m/heart.png" /></a>
                  </div>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>

            <div className="col-md-5 mt-3">
              <div className="car_list">
                <div className="car_list_left">
                  <a href="/marketplacedetail">  <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" alt="" /></a>
                </div>
                <div className="car_list_right">
                  <h2>Maruti Swift </h2>
                  <div className="car_list_right1">
                    <p><strong>HK$888,000</strong></p>
                    <ul>
                      <li>2014#</li>
                      <li>2993cc</li>
                      <li className="border_right0">3<sup>rd</sup> Hand</li>
                    </ul>
                    <div className="clearfix"></div>
                    <p className="automatic">Automatic / Manual</p>
                  </div>

                  <p>The price of Maruti Swift starts at Rs. 5.81 Lakh and goes upto Rs. 8.56 Lakh.</p>
                  <div className="clearfix"></div>
                  <div className="like_icons">
                    <a href="#"><img src="https://i.ibb.co/Bw51kKk/like-1.png" /> <p> 2</p></a>
                  </div>

                  <div className="like_fbrat">
                    <a href="#"><img src="https://i.ibb.co/Jdn873m/heart.png" /></a>
                  </div>

                </div>
                <div className="clearfix"></div>
              </div>
            </div>



          </div>

        </div> */}
      </section>

    );
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('listAllTradableCars');
  // const preference = TradableCars.find({ 'model': 'Land rover'}).fetch();
  const preference = TradableCars.find({}).fetch();
  console.log('=======userss=======:', preference);
  return {
    loading: !subscription.ready(),
    user: Meteor.user() || {},
    isAuthenticated: Meteor.userId() !== null,

    preference,
  };
})(MarketplacePage);