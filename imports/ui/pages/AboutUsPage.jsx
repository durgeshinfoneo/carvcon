/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';

export default class AboutUsPage extends Component {
  componentDidMount() {
    this._invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this._invalidate);
  }

  componentWillUnmount() {
    this._invalidate = () => this.forceUpdate();
    i18n.offChangeLocale(this._invalidate);
  }

  render() {
    return (
      <div className="col-xs-12">
        { i18n.getLocale() === 'zh-HK' ? (
          <div className="content">
            <h2>關於 vCon</h2>
            <p className="text-justify">
            我們相信vCon 能為香港帶來一點點的不同 - 能為買車換車的您，儲起更多金錢和時間！
            </p>
            <p className="text-justify">
            香港現時登記私家車總數約600,000輛，而全新車輛首次登記數目維持每月2,000至3,000輛。
            </p>
            <p className="text-justify">
            以現今科技及汽車業多年的經驗及技術，一輛私家車由出廠起計，一般可以在路上行駛及符合安全
            標準約十年，甚至更長。而以發達地區的成熟汽車市場統計資料顯示，二手車交易量與新車銷售的
            比例約為2.5:1，換句話說，香港每月的二手車交易量可能達到5,000至7,500輛。汽車工業技術的不斷
            進步，再加上更合符經濟及環保效益的大前題下，造就香港及其他成熟汽車市場的高二手車交易量
            。
            </p>
            <p className="text-justify">
            在香港，一般人會到二手車商或直接與二手車賣家接洽選購二手車。不過，相對其他地區及市場，
            香港的二手車交易&quot;基建&quot;還遠遠落後，包括沒有定期二手車拍賣平台、二手車交易資料的流通、二
            手車交易前的安全 / 狀況驗證及一個公平完善的二手車估價系統，以提供買賣雙方一個合理價格參
            考。
            </p>
            <p className="text-justify">
            我們相信，一個有參考性的二手車估價系統，能夠大大保障買賣雙方的最大利益。而我們vCon 的
            估價乃根據詳細計算，對買賣雙方都可節省時間去比較。雙方更可參考分別與車行及個人交易的利
            弊、詳細估價等資訊。長遠來講，我們十分期待vCon 能夠為香港人在買賣及比較二手車方面作出
            貢獻，提升市場質素從而帶動行業的增值發展。
            </p>

            <h2>向車行放盤</h2>

            <p className="text-justify">好處：放盤快，節省轉手前的養車成本。</p>
            <p className="text-justify">不足：收車價會略低。</p>

            <h2>向個人放盤</h2>

            <p className="text-justify">好處：成交價一般會略高，彈性亦會較高。</p>
            <p className="text-justify">不足：需要時間及成本較長，急於放車之人未必適用。</p>

            <h2>向車行選購</h2>

            <p className="text-justify">
            好處：現貨選擇較多，足夠試車機會，亦不需要自行搜集車盤資料；比向個人選購較有保障。
            </p>
            <p className="text-justify">
            不足：價錢一般較貴。
            </p>

            <h2>向個人選購</h2>
            <p className="text-justify">好處：價錢一般較便宜，轉手安排較彈性。</p>
            <p className="text-justify">不足：需要時間搜集車盤及資料，以及自行安排驗車，較沒有保障。</p>
          </div>
        ) : (
          <div className="content">
            <h2>About vCon</h2>

            <p className="text-justify">
            We are vCon, deeply believing that through our tool, you would experience an impressive
            and a new idea of car trading. By differentiating from traditional time-consuming and
            inefficient trading steps, this new path enables you to save more resources and time.
            This is our commitment to you and Hong Kong.
            </p>

            <p className="text-justify">
            In Hong Kong, there are about 600,000 registered private cars. The figure keeps
            increasing by 2,000 to 3,000 brand new private cars registered in every month.
            </p>

            <p className="text-justify">
            With nowadays advanced technology and years accumulated car manufacturing
            experience, a private car can be used for ten years or longer meeting the safety standard,
            from the day of selling by manufacturer. According to statistics of some well-established
            car trading markets in various developed regions, the trading volume ratio of used cars to
            brand new cars is about 2.5:1. In other words, there are around 5,000 to 7,500 used cars
            transactions per month in Hong Kong. Contributed by the advancing manufacturing
            technology, and public’s upholding awareness of wastage avoidance and environmental
            protection, the turnover of used cars trading is keeping at a high level, in Hong Kong and
            other developed markets.
            </p>

            <p className="text-justify">
            In Hong Kong, potential car buyers or sellers would arrange trading either with used cars
            traders or individuals. However, comparing to other markets, the “infrastructure” of used
            cars trading in Hong Kong is far behind, because we are lacking of:
            </p>

            <ol type="i">
              <li>
              regular used cars trading auction platform;
              </li>
              <li>
              circulation of used cars transactions information;
              </li>
              <li>
              pre-trading authentication on used cars’ safety / conditions; and
              </li>
              <li>
              a fair and reputable used cars valuation system to provide a
              reasonable price range to both sides of trading for referencing.
              </li>
            </ol>

            <p className="text-justify">
            We believe in a reliable used cars valuation system can largely protect the best interests of
            buyers and sellers. The valuations provided by vCon are calculated by virtue of
            comprehensive calculations. This helps both the buyers and sellers to save time in making
            comparisons. Potential trading parties could also learn from vCon about the pros and
            cons of making trades with traders and individuals as well as detailed valuations about
            respective trading counterparts. Aligning with our forward-looking strategy, we are
            expecting vCon to contribute to Hong Kong-ers in making used cars trading. Moreover,
            we are hoping to improve the quality of tradings to drive a continuous value adding
            process and development for the used cars trading industry.
            </p>

            <h2>Sell to Dealership</h2>

            <p className="text-justify">
            Advantage: Time saving and efficient, to help in minimizing costs incurred for keeping
            the car.
            </p>

            <p className="text-justify">
            Insufficiency: Selling price would be comparatively lower.
            </p>

            <h2>Sell to Individual</h2>

            <p className="text-justify">
            Advantage: Selling price would be comparatively higher, with more flexibility.
            </p>

            <p className="text-justify">
            Insufficiency: It is time-consuming and not efficient enough, not recommending for
            those who are rushing to sell the car.
            </p>

            <h2>Buy from Dealership</h2>

            <p className="text-justify">
            Advantage: Dealers use to have more selling cars for potential buyers to view, test and
            select. Potential buyers don’t need to do much researches on car models. Trading with
            dealership would be more protective than with individuals.
            </p>

            <p className="text-justify">
            Insufficiency: Buying price would be comparatively higher.
            </p>

            <h2>Buy from Individual</h2>
            <p className="text-justify">
            Advantage: Buying price would be comparatively lower, with more flexibility.
            </p>
            <p className="text-justify">
            Insufficiency: Taking more time for researches on car models and relevant information.
            Potential buyers need to spend more effort on inspecting cars conditions and there could
            be higher risk posed to them.
            </p>
          </div>
        )
        }
      </div>
    );
  }
}
