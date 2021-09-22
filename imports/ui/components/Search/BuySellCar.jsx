import React, { Component } from 'react';
import ReactGA from 'react-ga';
import i18n from 'meteor/universe:i18n';
import CarClasses from '../../../api/carclasses/carclasses';
import TradeRequestForm from '../../components/TradeRequest/TradeRequestForm';

const T = i18n.createComponent();

ReactGA.initialize('UA-104110357-1', { debug: true });
// const ga = ReactGA.ga();

if (!global.Intl) {
  import Intl from 'intl';

  global.Intl = Intl;
}

export default class BuySellCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendGA: false,
    };
  }

  render() {
    const props = this.props;
    const buySellCar = props.buysellcar;
    const cars = props.cars;
    const now = new Date();
    const currentYear = now.getFullYear();
    console.log('===============BuySellCar cars: ', cars);
    // console.log("buySellCar: ", buySellCar);
    // const totalPrice = 0;
    let avgPrice = 0;

    let individualBuyPrice = 0;
    let dealerBuyPrice = 0;
    let individualSellPrice = 0;
    let dealerSellPrice = 0;
    const newBrandPrice = props.carmodel.price;
    const carClassId = props.carmodel.carclass.id;
    let averageCost = newBrandPrice;
    const selectedYear = props.year;
    const diffYear = currentYear - selectedYear;
    const percentExcellent = 1.06;
    const percentFair = 0.94;

    const carclass = CarClasses.findOne(carClassId);
    avgPrice = cars;
    averageCost = avgPrice;

    if (avgPrice !== 0 && newBrandPrice !== 0) {
      if (diffYear === 0) {
        averageCost = (avgPrice + (newBrandPrice * 0.83)) / 2;
      } else if (diffYear === 1) {
        averageCost = (avgPrice + (newBrandPrice * 0.8)) / 2;
      } else if (diffYear === 2) {
        averageCost = (avgPrice + (newBrandPrice * 0.7)) / 2;
      } else if (diffYear === 3) {
        averageCost = (avgPrice + (newBrandPrice * 0.6)) / 2;
      } else if (diffYear === 4) {
        averageCost = (avgPrice + (newBrandPrice * 0.5)) / 2;
      } else if (diffYear === 5) {
        averageCost = (avgPrice + (newBrandPrice * 0.4)) / 2;
      } else if (diffYear === 6) {
        averageCost = (avgPrice + (newBrandPrice * 0.3)) / 2;
      } else {
        averageCost = (avgPrice + (newBrandPrice * 0.18)) / 2;
      }
    } else if (avgPrice === 0) {
      if (diffYear === 0) {
        averageCost = newBrandPrice * 0.83;
      } else if (diffYear === 1) {
        averageCost = newBrandPrice * 0.8;
      } else if (diffYear === 2) {
        averageCost = newBrandPrice * 0.7;
      } else if (diffYear === 3) {
        averageCost = newBrandPrice * 0.6;
      } else if (diffYear === 4) {
        averageCost = newBrandPrice * 0.5;
      } else if (diffYear === 5) {
        averageCost = newBrandPrice * 0.4;
      } else if (diffYear === 6) {
        averageCost = newBrandPrice * 0.3;
      } else {
        averageCost = newBrandPrice * 0.18;
      }
    } else if (newBrandPrice === 0) {
      averageCost = avgPrice;
    }

    const numberOfPreviousOwner = parseInt(props.numberOfPreviousOwner, 10);
    if (buySellCar === '1') {
      if (numberOfPreviousOwner <= 2) {
        averageCost *= 1;
      } else if (numberOfPreviousOwner === 3) {
        averageCost *= 0.95;
      } else if (numberOfPreviousOwner === 4) {
        averageCost *= 0.9;
      } else {
        averageCost *= 0.85;
      }
    }

    individualBuyPrice = (averageCost * 95) / 100;
    individualSellPrice = (averageCost * 105) / 100;

    dealerBuyPrice = (averageCost * 120) / 100;
    dealerSellPrice = (averageCost * 70) / 100;

    const individualBuyPriceExcellentFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(individualBuyPrice * percentExcellent))}`;
    const individualSellPriceExcellentFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(individualSellPrice * percentExcellent))}`;

    const individualBuyPriceFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(individualBuyPrice))}`;
    const individualSellPriceFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(individualSellPrice))}`;

    const individualBuyPriceFairFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(individualBuyPrice * percentFair))}`;
    const individualSellPriceFairFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(individualSellPrice * percentFair))}`;

    const dealerBuyPriceExcellentFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(dealerBuyPrice * percentExcellent))}`;
    const dealerBuyPriceGoodFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(dealerBuyPrice))}`;
    const dealerBuyPriceFairFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(dealerBuyPrice * percentFair))}`;

    const dealerSellPriceExcellentFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(dealerSellPrice * percentExcellent))}`;
    const dealerSellPriceGoodFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(dealerSellPrice))}`;
    const dealerSellPriceFairFormat = `HKD$ ${new Intl.NumberFormat().format(Math.round(dealerSellPrice * percentFair))}`;

    const fromIndividualExcellentFormat = `${individualBuyPriceExcellentFormat} - ${individualSellPriceExcellentFormat}`;
    const fromIndividualGoodFormat = `${individualBuyPriceFormat} - ${individualSellPriceFormat}`;
    const fromIndividualFairFormat = `${individualBuyPriceFairFormat} - ${individualSellPriceFairFormat}`;

    const quoteReferenceNumberBuy = `${props.carmodel.referenceNumberBuy}-${new Date().getTime()}`;
    const quoteReferenceNumberSell = `${props.carmodel.referenceNumberSell}-${new Date().getTime()}`;


    const valuation = new Intl.NumberFormat().format(Math.round(averageCost));
    let labelObj = `maker:${props.maker.englishName},model:${props.carmodel.name
    },year:${selectedYear},valuation:${valuation
    },class:${carclass.name}`;


    if (buySellCar === '0') {
      labelObj += `,quote reference number buy:${quoteReferenceNumberBuy
      },from individual price excellent:${fromIndividualExcellentFormat
      },from individual price good:${fromIndividualGoodFormat
      },from individual price fair:${fromIndividualFairFormat
      },from dealer price excellent:${dealerBuyPriceExcellentFormat
      },from dealer price good:${dealerBuyPriceGoodFormat
      },from dealer price fair:${dealerBuyPriceFairFormat}`;
    } else {
      labelObj += `,quote reference number sell:${quoteReferenceNumberSell
      },number of previous owner:${numberOfPreviousOwner
      },sell to individual price excellent:${fromIndividualExcellentFormat
      },sell to individual price good:${fromIndividualGoodFormat
      },sell to individual price fair:${fromIndividualFairFormat
      },sell to dealership price excellent:${dealerSellPriceExcellentFormat
      },sell to dealership price good:${dealerSellPriceGoodFormat
      },sell to dealership price fair:${dealerSellPriceFairFormat}`;
    }
    if (averageCost === 0) {
      labelObj = `maker:${props.maker.englishName
      },model:${props.carmodel.name
      },year:${selectedYear
      },class:${carclass.name}`;
      if (props.sendGA) {
        ReactGA.event({
          category: 'carvcon',
          action: 'unavailable-report',
          label: labelObj,
        });
      }

      return (
        <h2><T>common.searchform.report-unavailable</T></h2>
      );
    }
    if (props.sendGA) {
      ReactGA.event({
        category: 'carvcon',
        action: 'report',
        label: labelObj,
      });
    }


    // Buy option
    if (buySellCar === '0') {
      return (
        <div>
          <TradeRequestForm
            year={this.props.year}
            tradeType="BUY"
            carmodel={this.props.carmodel}
            carImage={this.props.carImage}
            quotePrice={Math.round(averageCost)}
            numberOfPreviousOwner={this.props.numberOfPreviousOwner}
          />
          <table className="table">
            <thead>
              <tr>
                <th><T>common.searchform.maker</T></th>
                <th><T>common.searchform.model</T></th>
                <th width="33%"><T>common.searchform.year</T></th>
                <th><T>common.searchform.valuation</T></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.maker.englishName} {props.maker.chineseName}</td>
                <td>{props.carmodel.name}</td>
                <td>{selectedYear}</td>
                <td>HKD$ {new Intl.NumberFormat().format(Math.round(averageCost))}</td>
              </tr>
            </tbody>
          </table>
          <h1><T>common.searchform.purchase-value</T></h1>
          <table className="table">
            <thead>
              <tr>
                <th width="40%"><T>common.searchform.cars-condition</T></th>
                <th width="30%"><T>common.searchform.from-individual</T></th>
                <th width="30%"><T>common.searchform.from-dealer</T></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><T>common.searchform.excellent</T></td>
                <td>{fromIndividualExcellentFormat}</td>
                <td>{dealerBuyPriceExcellentFormat}</td>
              </tr>
              <tr>
                <td><T>common.searchform.good</T></td>
                <td>{fromIndividualGoodFormat}</td>
                <td>{dealerBuyPriceGoodFormat}</td>
              </tr>
              <tr>
                <td><T>common.searchform.fair</T></td>
                <td>{fromIndividualFairFormat}</td>
                <td>{dealerBuyPriceFairFormat}</td>
              </tr>
            </tbody>
          </table>
          { newBrandPrice > 0 &&
            <p>
              <T>common.searchform.brand-new-model-price</T>
              &nbsp;HKD${new Intl.NumberFormat().format(Math.round(newBrandPrice))}
            </p>
          }
          <p>
            <T>common.searchform.quote-reference-number</T> {quoteReferenceNumberBuy}
          </p>

          <p>
            {/* <a href="mailto:info@carvcon.com" style={{ fontWeight: 'bold', color: 'blue', textDecoration: 'none' }}> <T>common.searchform.contact</T> </a> */}
            <button
              className="btn btn-lg btn-trade-request"
              type="button"
              onClick={this.props.handleTradeRequest}
            >
              <T>common.traderequest.trade-request</T>
            </button>
          </p>
          { i18n.getLocale() === 'en-US' ? (
            <div>
              <p>Buy from Dealership</p>
              <p>Pros:</p>
              <p>
                - Dealers used to have more variety of cars for potential buyers to view,
                test and select in one place.
              </p>
              <p>
                - Saves time for buyer to do researches on car models
              </p>
              <p>
                - More secure to trade with well-known dealers than with individuals
              </p>
              <p>Cons:</p>
              <p>
                - Price would be comparatively higher, less room to negotiate
              </p>
              <br />
              <br />
              <p>Buy from Individual</p>
              <p>Pros:</p>
              <p>
                - Buying price would be comparatively lower, with more flexibility
              </p>
              <p>Cons:</p>
              <p>
                - Involve more effort on car model researches and comparison,
                arranging meetup and car condition inspection
              </p>
              <p>
                - Transaction with individual is not well protected
              </p>
            </div>
          ) : (
            <div>
              <p>向車行選購</p>
              <p>好處：</p>
              <p>
                - 車場現貨選擇較多，足夠試車機會
              </p>
              <p>
                - 省卻自行搜集車盤資料時間
              </p>
              <p>
                - 向出名車行購買比向個人交易較有保障
              </p>
              <p>不足：</p>
              <p>
                - 價錢一般較貴，亦較少議價空間
              </p>
              <br />
              <br />
              <p>向個人選購</p>
              <p>好處：</p>
              <p>
                價錢一般較便宜，轉手安排較彈性。
              </p>
              <p>不足：</p>
              <p>
                - 需要時間搜集車盤及資料，以及自行安排驗車
              </p>
              <p>
                - 與個人交易較沒有保障
              </p>
            </div>
          )}
        </div>
      );
    }
    return (
      <div>
        <TradeRequestForm
          year={this.props.year}
          tradeType="SELL"
          carmodel={this.props.carmodel}
          carImage={this.props.carImage}
          quotePrice={Math.round(averageCost)}
          numberOfPreviousOwner={this.props.numberOfPreviousOwner}
        />
        <table className="table">
          <thead>
            <tr>
              <th><T>common.searchform.maker</T></th>
              <th><T>common.searchform.model</T></th>
              <th width="33%"><T>common.searchform.year</T></th>
              <th><T>common.searchform.valuation</T></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.maker.englishName} {props.maker.chineseName}</td>
              <td>{props.carmodel.name}</td>
              <td>{selectedYear}</td>
              <td>HKD$ {new Intl.NumberFormat().format(Math.round(averageCost))}</td>
            </tr>
          </tbody>
        </table>
        <h1><T>common.searchform.selling-value</T></h1>
        <table className="table">
          <thead>
            <tr>
              <th width="40%"><T>common.searchform.cars-condition</T></th>
              <th width="30%"><T>common.searchform.sell-to-individual</T></th>
              <th width="30%"><T>common.searchform.sell-to-dealership</T></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><T>common.searchform.excellent</T></td>
              <td>{fromIndividualExcellentFormat}</td>
              <td>{dealerSellPriceExcellentFormat}</td>
            </tr>
            <tr>
              <td><T>common.searchform.good</T></td>
              <td>{fromIndividualGoodFormat}</td>
              <td>{dealerSellPriceGoodFormat}</td>
            </tr>
            <tr>
              <td><T>common.searchform.fair</T></td>
              <td>{fromIndividualFairFormat}</td>
              <td>{dealerSellPriceFairFormat}</td>
            </tr>
          </tbody>
        </table>
        { newBrandPrice > 0 &&
        <p>
          <T>common.searchform.brand-new-model-price</T>
          HKD${new Intl.NumberFormat().format(Math.round(newBrandPrice))}
        </p>
        }
        <p>
          <T>common.searchform.quote-reference-number</T> {quoteReferenceNumberSell}
        </p>

        <p>
          {/* <a href="mailto:info@carvcon.com" style={{ fontWeight: 'bold', color: 'blue', textDecoration: 'none' }}> <T>common.searchform.contact</T> </a> */}
          <button
            className="btn btn-lg btn-trade-request"
            type="button"
            onClick={this.props.handleTradeRequest}
          >
            <T>common.traderequest.trade-request</T>
          </button>
        </p>
        {i18n.getLocale() === 'en-US' ? (
          <div>
            <p>Sell to Dealership</p>
            <p>
              Pros: Time saving and efficient,
              to help in minimizing costs incurred for keeping the car.
            </p>
            <p>
                Cons: Selling price would be comparatively lower.
            </p>
            <br />
            <br />
            <p>
                Sell to Individual
            </p>
            <p>
                Pros: Selling price would be comparatively higher, with more flexibility.
            </p>
            <p>
                Cons: It is time-consuming and not efficient enough,
                not recommending for those who are rushing to sell the car.
            </p>
          </div>
        ) : (
          <div>
            <p>向車行放盤</p>
            <p>好處：放盤快，節省轉手前的養車成本。</p>
            <p>不足：收車價會略低。</p>
            <br />
            <br />
            <p>向個人放盤</p>
            <p>好處：成交價一般會略高，彈性亦會較高。</p>
            <p>不足：需要時間及成本較長，急於放車之人未必適用。</p>
          </div>
        )}
      </div>
    );
  }
}
