/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';

export default class EstimationDisclaimerPage extends Component {
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
            <ol style={{ paddingLeft: '15px' }}>
              <li>
                <p className="text-justify">
                    vCon 網上二手車估價服務乃根據本章則及條款、vCon 之使用條款及免責聲明及私隱政策聲明提供。
                </p>
              </li>
              <li>
                <p className="text-justify">
                    vCon 網上二手車估價服務提供二手車估價及有關資料或 / 及其他服務，以服務有需要人士及大眾。此二手車估價網站所載全部的資料及版權作品，均屬vCon 所有。未經 vCon 授權，嚴禁將任何版權作品及資料複製、改編、分發、傳播或提供予第三者。另外，vCon 亦嚴禁任何人士，修訂或更改網上二手車的原始碼，以便下載或複製二手車估價的資料或任何其他的資料。
                </p>
              </li>
              <li>
                <p className="text-justify">
                    網上二手車估價由估價當日起一個月內有效。
                </p>
              </li>
              <li>
                <p className="text-justify">
                    儘管有第 3 項條文之規定，網上二手車估價袛為指示性和作參考之用及對vCon 並無約束力；vCon 保留隨時對有關車輛重新估價之絕對權力。
                </p>
              </li>
              <li>
                <p className="text-justify">
                    網上二手車估價及有關服務之提供乃受以下條件限制:
                </p>
                <ol type="i">
                  <li>
                    <p className="text-justify">
                        此二手車估價網站所載全部之資料乃來自于不同汽車製造商的車輛資料、市場上有關二手車的資料及 vCon 認為可靠的來源,但是 vCon 不就其準確性、及時性或完整性作出任何明示或暗示的聲明、擔保或保證；
                    </p>
                  </li>
                  <li>
                    <p className="text-justify">
                        網上二手車估價乃以二手車現況為基礎；及
                    </p>
                  </li>
                  <li>
                    <p className="text-justify">
                       假定有關車輛並不涉及任何違反交通法例或規例事項及欠交任何罰款或費用。
                    </p>
                  </li>
                </ol>
              </li>
              <li>
                <p className="text-justify">
                    閣下明確承認及同意如閣下依賴網上二手車估價服務，其風險概由閣下負責。閣下倘因使用或依賴網上二手車估價服務而招致任何損失或損害（如有），vCon 概不接受或承擔任何責任。
                </p>
              </li>
            </ol>
          </div>
        ) : (
          <div className="content">
            <ol style={{ paddingLeft: '15px' }}>
              <li>
                <p className="text-justify" >
                    vCon online used cars valuation service (and related services) is provided by virtue of
                    this Valuation Disclaimer, vCon’s Terms and Conditions and Privacy Policy.
                </p>
              </li>
              <li>
                <p className="text-justify">
                    vCon online used cars valuation service (and related services) is provided by virtue of
                    this Valuation Disclaimer, vCon’s Terms and Conditions and Privacy Policy.
                </p>
              </li>
              <li>
                <p className="text-justify">
                    Valuations provided by vCon are valid for 1 month.
                </p>
              </li>
              <li>
                <p className="text-justify">
                    Notwithstanding clause 3, the valuations provided by vCon are for information and reference only.  vCon is not bound by the valuations and we reserve the absolute right of re-valuating any models of car, anytime.
                </p>
              </li>
              <li>
                <p className="text-justify">
                    vCon online used cars valuation and related services are provided with the following conditions:
                </p>
                <ol type="i">
                  <li>
                      <p className="text-justify">
                        The information on the website of vCon related to the online used cars valuation is sorted and computed by vCon.  However, vCon never and would not accept any responsibility and liability, assurance or guarantee on the valuations’ accuracy, timeliness or completeness;
                    </p>
                    </li>
                  <li>
                      <p className="text-justify">
                        vCon online used cars valuation is made based on the “as is” of the cars involved; and
                    </p>
                    </li>
                  <li>
                      <p className="text-justify">
                        It is assumed that the used cars are not involved in any cases of breach of traffic related law or regulation, criminal or civil investigation or litigation, and default of any fine or fee.
                    </p>
                    </li>
                </ol>
              </li>
              <li>
                <p className="text-justify">
                    You acknowledge and agree that if you rely on the online used cars valuation (and related services), you have to bear any risk involved.  If you are / will be suffered from any loss or harm (if any) because of using or relying on online used cars valuation (and related services), vCon would not accept any responsibility or liability.
                </p>
              </li>
            </ol>
          </div>
        )
        }
      </div>


    );
  }
}
