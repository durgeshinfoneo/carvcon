/* eslint-disable class-methods-use-this */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import i18n from 'meteor/universe:i18n';
import FormValidator from '../components/FormValidator';
import './../css/style.css';
import './../css/marketplacedetail.css';
// import './../css/carvcan.css';
import './../js/zoom-image.js';
//import { blah } from './../js/main.js';

const T = i18n.createComponent();

export default class MarketplaceDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.show').zoomImage();

    $('.show-small-img:first-of-type').css({ 'border': 'solid 1px #951b25', 'padding': '2px' })
    $('.show-small-img:first-of-type').attr('alt', 'now').siblings().removeAttr('alt')
    $('.show-small-img').click(function () {
      $('#show-img').attr('src', $(this).attr('src'))
      $('#big-img').attr('src', $(this).attr('src'))
      $(this).attr('alt', 'now').siblings().removeAttr('alt')
      $(this).css({ 'border': 'solid 1px #951b25', 'padding': '2px' }).siblings().css({ 'border': 'none', 'padding': '0' })
      if ($('#small-img-roll').children().length > 4) {
        if ($(this).index() >= 3 && $(this).index() < $('#small-img-roll').children().length - 1) {
          $('#small-img-roll').css('left', -($(this).index() - 2) * 76 + 'px')
        } else if ($(this).index() == $('#small-img-roll').children().length - 1) {
          $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
        } else {
          $('#small-img-roll').css('left', '0')
        }
      }
    })

    //Enable the next button

    $('#next-img').click(function () {
      $('#show-img').attr('src', $(".show-small-img[alt='now']").next().attr('src'))
      $('#big-img').attr('src', $(".show-small-img[alt='now']").next().attr('src'))
      $(".show-small-img[alt='now']").next().css({ 'border': 'solid 1px #951b25', 'padding': '2px' }).siblings().css({ 'border': 'none', 'padding': '0' })
      $(".show-small-img[alt='now']").next().attr('alt', 'now').siblings().removeAttr('alt')
      if ($('#small-img-roll').children().length > 4) {
        if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1) {
          $('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 76 + 'px')
        } else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
          $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
        } else {
          $('#small-img-roll').css('left', '0')
        }
      }
    })

    //Enable the previous button

    $('#prev-img').click(function () {
      $('#show-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src'))
      $('#big-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src'))
      $(".show-small-img[alt='now']").prev().css({ 'border': 'solid 1px #951b25', 'padding': '2px' }).siblings().css({ 'border': 'none', 'padding': '0' })
      $(".show-small-img[alt='now']").prev().attr('alt', 'now').siblings().removeAttr('alt')
      if ($('#small-img-roll').children().length > 4) {
        if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1) {
          $('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 76 + 'px')
        } else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
          $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
        } else {
          $('#small-img-roll').css('left', '0')
        }
      }
    })

  }
  render() {
    return (
      
      <section className="car_min pdg0">
        <div className="container margin_t_b">
          <div className="car_details">
            <div className="row">
              <div className="col-md-5">
                <div className="show" href="1.jpg">
                  <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" id="show-img" />
                </div>
                <div className="small-img">
                  <img src="images/next-icon.png" className="icon-left" alt="" id="prev-img" />
                  <div className="small-container">
                    <div id="small-img-roll">
                      <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" className="show-small-img" alt="" />
                      <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Maruti-Wagon-R/6741/1564746908438/front-left-side-47.jpg" className="show-small-img" alt="" />
                      <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" className="show-small-img" alt="" />
                      <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/8378/1614747593719/front-left-side-47.jpg" className="show-small-img" alt="" />
                    </div>
                  </div>
                  <img src="images/next-icon.png" className="icon-right" alt="" id="next-img" />
                </div>
              </div>

              <div className="col-md-7">

                <div className="car_details_right"></div>
                <h2>Maruti Swift </h2>
                <div className="car_details_right1">
                  <p><strong>HK$888,000</strong></p>
                  <ul>
                    <li>2014#</li>
                    <li>2993cc</li>
                    <li>Automatic / Manual</li>
                    <li className="border_right0">3<sup>rd</sup> Hand</li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
                <p className="Status"><strong>Status:</strong> Under Review</p>
                <button type="submit" className="btn btn-xl" href="#"><span>Book Now</span></button>
                <p>The price of Maruti Swift starts at Rs. 5.81 Lakh and goes upto Rs. 8.56 Lakh. Maruti Swift is offered in 9 variants - the base model of Swift is LXI and the top variant Maruti Swift ZXI Plus DT AMT which comes at a price tag of Rs. 8.56 Lakh.</p>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}