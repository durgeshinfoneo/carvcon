/* eslint-disable import/no-unresolved, meteor/no-session, jsx-a11y/href-no-hash, */
import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';
// import jQuery from 'meteor/jquery';
// import { Session } from 'meteor/session';
import NewFilterForm from '../../ui/components/Home/NewFilterForm';
import FilterForm from '../../ui/components/Home/FilterForm';
import Header from '../../ui/components/Header/Header';
import Footer from '../../ui/components/Footer';


const T = i18n.createComponent();
const $ = global.$;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    // const language = Session.get('language');
    this.state = {
      isClassic: false,

    };
    // i18n.setLocale(language);
    // this.handleFilterInputchange = this.handleFilterInputchange.bind(this);
  }

  componentDidMount() {
    this._invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this._invalidate);
    const owl = $('.owl-carousel');
    owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsiveClass: true,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 3,
        },
      },
    });

  }
  componentWillUnmount() {
    // this._invalidate = () => this.forceUpdate();
    i18n.offChangeLocale(this._invalidate);
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState((prevState, props) => ({
      isClassic: !prevState.isClassic,
    }));
  }

  // handleFilterInputchange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
  //   i18n.setLocale(value);
  //   Session.setPersistent('language', value);
  //   this.setState({
  //     [name]: value,
  //   });
  // }


  render() {
    const { isClassic } = this.state;
    return (
      <div id="page-top" className="index">
        <Header {...this.props} />
        <header>
          <div className="container homesearch">
            <div className="row">
              <div className="col-lg-12 intro-text slogan">
                <p>
                  <T>common.homepage.your-best-car-trading-companion</T>
                </p>
              </div>
            </div>
            <div className="row">
              <ul className="nav nav-tabs nav-justified wrap-nav">
                <li role="presentation" className={isClassic ? 'active' : ''}>
                  <a
                    href="#"
                    onClick={this.handleClick}
                  >
                    <T>common.homepage.select-model</T>
                  </a>
                </li>
                <li role="presentation" className={isClassic ? '' : 'active'}>
                  <a
                    href="#"
                    onClick={this.handleClick}
                  >
                    <T>common.homepage.search-model</T>
                  </a>
                </li>
              </ul>
              <div className="col-lg-offset-1 col-lg-10 intro-search">
                <div className="filter-form">
                  <NewFilterForm
                    isClassic={isClassic}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>


        <section id="ourpartners">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-xs-12 text-center">
                <h2 className="section-heading"><T>common.homepage.our-partners</T></h2>
              </div>

              <div className="col-lg-12 col-xs-12 text-center">
                <div className="row">
                  <div className="col-md-9 col-xs-12">
                    <div className="owl-carousel">
                      <div>
                        <a
                          href="#"
                          className="thumbnail"
                        >
                          <img src="/images/partners/appsia.png" alt="Appsia" />
                        </a>
                        <h4 className="service-heading"><T>common.homepage.technology-partner</T></h4>
                      </div>
                      <div>
                        <a href="#" className="thumbnail">
                          <img src="/images/partners/kepler-network.jpg" alt="Kepler Network" />
                        </a>
                        <h4 className="service-heading"><T>common.homepage.technology-partner</T></h4>
                      </div>
                      <div>
                        <a
                          href="https://www.facebook.com/Benny-Workshop-1130489540379664/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="thumbnail"
                        >
                          <img src="/images/partners/EA.png" alt="European Asian" />
                        </a>
                        <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                      </div>
                      <div className="">
                        <a
                          href="#"
                          className="thumbnail"
                        >
                          <img src="/images/partners/004.png" alt="Tung Fong Motor" />
                        </a>
                        <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                      </div>
                      <div className="">
                        <a href="#" className="thumbnail">
                          <img src="/images/partners/006.png" alt="Lung Po Motor" />
                        </a>
                        <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                      </div>
                      <div className="">
                        <a
                          href="#"
                          className="thumbnail"
                        >
                          <img src="/images/partners/007.png" alt="Tung Wah Motor" />
                        </a>
                        <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                      </div>
                      <div className="">
                        <a
                          href="#"
                          className="thumbnail"
                        >
                          <img src="/images/partners/014.png" alt="Diamond Motors Centre" />
                        </a>
                        <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                      </div>
                      <div className="">
                        <a
                          href="#"
                          className="thumbnail"
                        >
                          <img src="/images/partners/zhonghwa.png" alt="Zhong Hwa Motors Co. Ltd" />
                        </a>
                        <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                      </div>
                      {/* <div className="">
                        <a
                          href="#"
                          className="thumbnail"
                        >
                          <img src="/images/partners/019_1.png" alt="" />
                        </a>
                        <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                      </div> */}
                      <div className="">
                        <a
                          href="#"
                          className="thumbnail"
                        >
                          <img src="/images/partners/019_2.png" alt="" />
                        </a>
                        <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-xs-12">
                    {i18n.getLocale() === 'zh-HK' ? (
                      <a
                        className="page-scroll btn btn-xl"
                        href="https://goo.gl/forms/bpgyK73z7jBrEsaY2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <T>common.homepage.become-our-partner</T>
                      </a>

                    ) : (

                        <a
                          className="page-scroll btn btn-xl"
                          href="https://goo.gl/forms/icFrn5uUnbrrrPaB2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <T>common.homepage.become-our-partner</T>
                        </a>

                      )
                    }


                  </div>
                </div>

              </div>
              {/* <div className="row text-center owl-carousel">
                <div className="">
                  <a
                    href="#"
                    className="thumbnail"
                  >
                    <img src="/images/partners/004.png" alt="Tung Fong Motor" />
                  </a>
                  <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                </div>
                <div className="">
                  <a href="#" className="thumbnail">
                    <img src="/images/partners/006.png" alt="Lung Po Motor" />
                  </a>
                  <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                </div>
                <div className="">
                  <a
                    href="#"
                    className="thumbnail"
                  >
                    <img src="/images/partners/007.png" alt="Tung Wah Motor" />
                  </a>
                  <h4 className="service-heading"><T>common.homepage.business-partner</T></h4>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        <section id="howitworks" className="bg-light-gray">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading"><T>common.homepage.how-it-works</T></h2>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <img src="/quote.png" alt="Quote" />
                <h4 className="service-heading"><T>common.homepage.click-get-a-quote</T></h4>
                <p className="text-muted"><T>common.homepage.step1</T></p>
              </div>
              <div className="col-md-4">
                <img src="/processing.png" alt="processing" />
                <h4 className="service-heading"><T>common.homepage.processing</T></h4>
                <p className="text-muted"><T>common.homepage.step2</T></p>
              </div>
              <div className="col-md-4">
                <img src="/driver.png" alt="driver" />
                <h4 className="service-heading"><T>common.homepage.get-your-quote</T></h4>
                <p className="text-muted"><T>common.homepage.step3</T></p>
              </div>
            </div>
          </div>
        </section>

        <section id="whyvcon">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading"><T>common.homepage.why-vcon</T></h2>
                {/* <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3> */}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 timeline-wrap">
                <ul className="timeline">
                  <li className="timeline-inverted">
                    <div className="timeline-image">
                      <p>1</p>
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4><T>common.homepage.transparent</T></h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">
                          <T>common.homepage.transparent-description</T>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-image">
                      <p>2</p>
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4><T>common.homepage.save-time</T></h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">
                          <T>common.homepage.save-time-description</T>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-image">
                      <p>3</p>
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4><T>common.homepage.the-best</T></h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">
                          <T>common.homepage.the-best-description</T>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="bg-light-gray">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading"><T>common.homepage.how-it-can-help</T></h2>
              </div>
            </div>
            {/*

            <div className="row">
                <div className="col-sm-2 col-sm-offset-4">
                    <div className="team-member">
                        <img src="/team/Userpic1.png" className="img-responsive img-circle" alt=""/>
                        <h4>Kay Garland</h4>

                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="team-member">
                        <img src="/team/Userpic2.png" className="img-responsive img-circle" alt=""/>
                        <h4>Larry Parker</h4>
                    </div>
                </div>
            </div>

            */}

            <div className="row">
              <div id="myCarousel" className="carousel slide" data-ride="carousel">

                <div className="carousel-inner">
                  <div className="item active">
                    <div className="carousel-content">
                      <p>
                        This site provides reviews and advice on vehicles from people who know about cars.
                        From buying to selling your car, vCon generates quotes from more than 500 motor models.
                        Highly recommend this site for all the car users/buyers/sellers out there!
                      </p>
                    </div>
                  </div>

                  <div className="item">
                    <div className="carousel-content">
                      <p>
                        User friendly, easy to use, everything was simple and organized well.
                        vCon leads you through the whole process from researching the right vehicle to providing the current market valuation reports.
                        No other website like this!
                      </p>
                    </div>
                  </div>

                  <div className="item">
                    <div className="carousel-content">
                      <p>
                        第一次買車, 心大心細, 朋友介紹用 vCon 做定research, 心目中已有 dream car…但不知確實價錢同邊度買最合理,
                        沒有任何收費, vCon 比我的資料十分實用, 透明度極高, 網站的數據庫搜尋了最update 既資訊, 從車價同買賣車資料都十分齊全,
                        如果你想搵一間汽車買賣一站通又質素高的網站來呢度就冇錯
                      </p>
                    </div>
                  </div>

                  <div className="item">
                    <div className="carousel-content">
                      <p>
                        幾經商討，我同老公決定換架 7人車方便日後接送小朋友，係公司有空檔就上咗偉大既Google 研究一下二手車價錢 - 見到vCon 既網站好似好新，於是來望下，本住睇下無乜所謂的心態反而有驚喜
                        一入齊資料，網站就可以馬上quote 到而家二手市場車價參考，個價仲包括咗同用家交易及車商交易，亦提供了車輛狀況作價錢參考。最正就係連買賣車既 pros and cons 都有! 好用! 真心推介。買賣車懶人包
                      </p>
                    </div>
                  </div>

                  <div className="item">
                    <div className="carousel-content">
                      <p>
                        其實雖然個網function唔多，但佢最好的地方就係比到個概念我哋，知一部車大約幾錢，唔會人哋開咩價我哋都唔知係咪市價，對於我哋普通用家好有保障
                      </p>
                    </div>
                  </div>
                </div>

                <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left" />
                  <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#myCarousel" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right" />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </section>
<p>   para</p>
        <Footer />
      </div>
    );
  }
}
// export default withTracker(() => {
//   const subscription = Meteor.subscribe('listAllTradableCars');
//   const tradableCars = TradableCars.find({}).fetch();
//   console.log('=======user=======:',tradableCars);
//   return {
//     loading: !subscription.ready(),
//     tradableCars: tradableCars || {}
//   };
// })(HomePage);
