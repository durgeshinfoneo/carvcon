import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';

export default class TipsPage extends Component {
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
            <h2>二手必讀</h2>
            <p className="text-justify">香港是一個二手車交易量活躍的市場。歸根究底，是因為香港地少、相對發達完善的交通網絡，以及近年政府大力推動環保政策下，引致養車成本越加昂貴，使不少醒目的香港人近年已偏向選擇購買更為化算的二手車，作為日常代步及假日遊玩的運輸工具。這樣既可享受駕駛的樂趣、增加私人移動空間，又可節省龐大的新車折舊率，同時免除因為新車損傷造成較高維修成本的財政和心理壓力。</p>
            <p className="text-justify">香港的二手車買賣，主要分為<strong>私人交易或與二手車商交易，</strong>兩者於過程所需時間及費用其實大同小異，唯獨是車價的分野。要成功購買一架合心水的二手車，又能順利完成交易，除咗考眼光外，亦要了解清楚以下的流程和收費，以免大失預算。<strong><span style={{ textDecoration: 'underline' }}>同時在買/賣車主準備商洽前，請先在 vCon 對有關型號進行估價，使交易更得心應手!</span></strong></p>
            <h2>私人交易</h2>
            <p className="text-justify">一般來說，有意賣車但不急於套現的車主，會把自己車輛的基本資料、相片及開價等放上有信譽及可靠的網上平台兜售，而二手車準買家可利用這些平台揀選心水靚車。</p>
            <p className="text-justify">在平台上睇中心水靚車，準買家可根據車主留低的聯絡資料相約睇車、驗車。新手的準買家可考慮帶同朋友幫手睇車驗車，給予意見。出發前，若然已經有預算及計劃，並很大機會成交，應該安排好月租/時租車位，以免成交後沒有地方放置車輛。除此之外，準買家出發前亦要準備以下文件 / 物品:</p>
            <ul>
              <li>
                <p className="text-justify">駕駛執照</p>
              </li>
              <li>
                <p className="text-justify">身份證/護照</p>
              </li>
              <li>
                <p className="text-justify">兩張 P 牌咭、放於車頭車尾 (適合獲取駕駛執照 1 年以下的新手)</p>
              </li>
              <li>
                <p className="text-justify">相機、計數機(或用一部智能電話代替)</p>
              </li>
              <li>
                <p className="text-justify">紙和筆</p>
              </li>
              <li>
                <p className="text-justify">地址證明、銀行戶口資料</p>
              </li>
              <li>
                <p className="text-justify">足夠現金或支票 (一般情況，車主不接受準買家以支票付款，因為要翌日才能過數，但只要交易當天是銀行工作日，車主在交車匙給準買家之前，可先去發支票銀行即時兌票過數或提取現金。以支票付款的好處是不用手握大量現金，而經櫃員機過數又可能遇到每日交易金額限制)</p>
              </li>
            </ul>
            <p className="text-justify">由於是私人交易，準買家通常要求初步驗車。驗車前，可先目測車身表面，然後把車駛到車房檢驗，重點檢查項目為車輛有沒有被撞過、修補或非法改裝的痕跡。在可行的情況下，準買家應指定驗車車房，務求令驗車過程和結果客觀。若過程順利，驗車只需約一至兩小時，收費大約幾百至千幾蚊，視乎檢查項目數量及不同車房規模。</p>
            <p className="text-justify">驗車之後，準買家可以試揸車輛。為確保車輛性能，<span style={{ textDecoration: 'underline', color: '#ff0000' }}><strong>以下幾個項目必定要試:上斜、平路加速、入彎、落斜煞車、冷氣/音響、座椅調校、車門及車窗開關、斜路停車後手掣煞車的表現、及停車位開車後原地有無漏油情況</strong></span>。若果車檢結果合格和試車表現滿意，準買家便可以安排付款予車主購買車輛。在確定成交前，我們建議買家或賣家可在牌照事務處免費申請一份有關該車輛的<a href="http://www.td.gov.hk/filemanager/common/tdforms/td87s(2008.05).pdf">無欠繳罰款及無違例記錄證明書 (TD87(s))</a>，以證明該車輛無涉及任何未清繳罰款及停牌事件。</p>
            <p className="text-justify">為減少不必要的爭拗及保障雙方，我們建議買賣雙方使用有記錄的付款方式，即現金入銀行戶口、轉數或支票轉數。部分私人交易的雙方還自訂簡單的買賣合約，以兹證明該車牌該型號及有關牌簿指明的車輛於該日期已從賣方轉為買方，而賣方或任何其他人士亦不會及沒有保留該車輛的車匙。我們亦建議買賣雙方保留對方聯絡方法，在賣方離開前，請確保賣方已在牌簿上簽名，並填妥及簽署一份運輸署<a href="http://www.td.gov.hk/filemanager/common/td25(2016.11)_e-fillable_chi.pdf">車輛過戶通知書 (運輸署表格TD25)</a>上賣方應填的部分。雙方可協議於此時把車匙及牌簿轉手，或到運輸署辦理車輛轉戶手續後才轉手。</p>
            <p className="text-justify">之後，買賣雙方緊記在 72 小時內的辦公時間到運輸署辦理車輛轉戶手續。買家要提交上述已填妥及已簽署的<span style={{ textDecoration: 'underline' }}><strong>車輛過戶通知書正本</strong></span>，連同身分證明文件正本。而賣方則要向運輸署呈交填妥及已簽署的<strong><span style={{ textDecoration: 'underline' }}>車輛過戶通知書副本</span>。</strong>如情況許可，我們建議買賣雙方相約到運輸署一同辦理手續，然後才把車匙及牌簿轉手。請謹記，到運輸署辦理轉讓手續前，新買家必需已經為轉讓車輛購買第三方保險，生效日期為正式轉讓日(應為到運輸署辦手續當日)，並帶備臨時或正式<strong>保單</strong>到運輸署辦理上述手續。</p>
            <p className="text-justify">若申報的成交價高於車輛上次的應課稅值、免稅配件價值、非由製造商所提供的保養服務未滿期部分價值及首次登記稅的<strong><span style={{ textDecoration: 'underline' }}>總和</span></strong>，賣家要在過戶手續生效前，填妥<a href="http://www.td.gov.hk/filemanager/common/td468.pdf">運輸署批淮汽車過戶售價申請表TD468 </a>，向牌照事務處申請批淮及繳付附加稅。</p>
            <p className="text-justify">若果賣家保留原有車牌自用，賣家就要另外填妥及簽署一份"<a href="http://www.td.gov.hk/filemanager/common/td129(2017.03)_e-fillable_chi.pdf">轉移或保留車輛登記號碼申請書 TD129</a>"，以保留原有車牌及為該交易車輛申請新車牌。</p>
            <p className="text-justify">完成轉手手續後，記得要盡快處理續牌事宜。</p>
            <h2>車行交易</h2>
            <p className="text-justify">當車主比較急於放售車輛時，到車行放售是最直接可取的方法，但放售價錢一般較私人交易低。</p>
            <p className="text-justify">基本上，到車行買賣二手車的流程與私人交易大致相同，但當車主放售車輛時， 車行進行的車檢一定更加仔細。換句話說，作為準買家，到車行選購二手車的質素會較有保障 (當然，準買家在成交前亦可要求驗車)。部分車行更會提供車輛轉戶一條龍服務 (可能要額外收費)。文件上來講，大部分車行進行的交易都有合約訂明，以保障雙方。</p>
            <h2>二手車交易費用</h2>
            <p className="text-justify">二手車交易主要涉及的費用:</p>
            <ul>
              <li>
                <p className="text-justify">到車房驗車費用，約港幣 200 至千多蚊不等，視乎車房及驗車項目</p>
              </li>
              <li>
                <p className="text-justify">運輸署車輛過戶費用，電單車及機動三輪車為港幣 250、其他車輛為港幣 1,000</p>
              </li>
              <li>
                <p className="text-justify">運輸署轉移或保留車輛登記號碼港幣 560</p>
              </li>
            </ul>
            <p className="text-justify">另外，請參考運輸署就不同車輛所收的牌費，收費分為<a href="http://www.td.gov.hk/tc/public_services/fees_and_charges/index.html#account">一年收費及四個月收費</a> 。</p>
            <p className="text-justify">二手車絶不代表車輛質素差，市場上大部分二手車都保養得宜，才可以造就香港二手車的高成交量。除了實際車輛狀況，某些條件也對二手車的成交價起關鍵作用，例如年份、車輛牌子及型號、改裝情況、是否誇境車輛 (一般來講非誇境車輛市價較高)、有無撞過、成交前的手數(記錄在牌簿內，正常情況下手數越少市價越高)、配件、內櫳設計及顏色、車身顏色等。大家可在 vCon 進行估價後，以估價為基礎，與對方就上述條件洽商以訂出 Win-Win 的成交價!</p>

            <div className="col-sm-12 col-lg-12">
              <img className="img-responsive" src="/tips_flowchart.png" alt="Flow chart" />
            </div>
          </div>
        ) : (
          <div className="content">
            <h2>Tips</h2>
            <p className="text-justify">Hong Kong is an active used cars trading market and several reasons lead to this, including, i) Hong Kong does not have many lands; ii) the well-developed public transportation network in Hong Kong; and iii) government&rsquo;s promoting environmental protection policies resulting in higher cost for keeping a private car, making more smart Hong Kong-ers to drive used cars for daily rides and holiday transportations (rather than brand new cars). Acquiring a used car could also benefit drivers in enjoying the driving time, having moving storing chamber and avoiding suffering from the big depreciation of buying a brand new car. The repairing / maintenance cost of used cars is also comparatively lower than that of brand new cars making lesser pressure for drivers.</p>
            <p className="text-justify">In Hong Kong, used cars trading could be made with individuals or traders. Time taken and fees spent are similar for trading with either parties. However, the price of a used car traded with the two parties is different. To acquire a best-suited used car and complete the transaction smoothly, the selection and judgement by buyers are ways to achieve the objectives. Moreover, both the seller and buyer should read through the process and respective charges below with a view to understanding more to avoid anything unexpected happening. <span style={{ textDecoration: 'underline' }}><strong>You should also perform valuation at vCon for cars you are going to trade because this would help you in closing your deal smartly.</strong></span></p>
            <h2>Trade with individuals</h2>
            <p className="text-justify">If a car owner wants to sell his car but not hurry in encashing, he would normally upload his car&rsquo;s data, photo and trading price to reputable and reliable online platforms for selling. Potential buyers could look for and select used cars through those online platforms.</p>
            <p className="text-justify">When a potential buyer decides to acquire a car selected through trading platforms, he would need to contact the seller for viewing and examining the car. Used car buyers with less or nil experience could ask for company by friends with relevant knowledge or experience to help in testing or examining the car. If the potential buyer has been well planning to close a deal, prior to meeting the car seller, he should ensure he has a car parking space (monthly or hourly rented) for parking the car which would be purchased. Apart from that, the potential buyer should also prepare / bring along the following documents and items:</p>
            <ul>
              <li>
                <p className="text-justify">valid driving licence;</p>
              </li>
              <li>
                <p className="text-justify">HKID card or passport;</p>
              </li>
              <li>
                <p className="text-justify">2 &ldquo;P&rdquo; plates (each of them is required to be displayed at the front and rear of the car, applicable for drivers holding probationary driving licence and are not yet eligible for applying a full licence);</p>
              </li>
              <li>
                <p className="text-justify">camera and calculator (or just simply a smart phone);</p>
              </li>
              <li>
                <p className="text-justify">paper and pen;</p>
              </li>
              <li>
                <p className="text-justify">address proof and bank account information; and</p>
              </li>
              <li>
                <p className="text-justify">adequate cash or cheque or cashier order (generally, car sellers would not accept cheque payment by buyers because the cheque would only be cleared in the next day; but if the trading day is a bank business day, buyers could go to the cheque issuing bank to make cheque transfer (only available for accounts held with same bank) or withdraw cash for settling the car payment / deposit; the advantage of paying cashier order or cheque is to avoid possessing much cash, and making bank transfer through ATM could likely encounter a daily transfer limit)</p>
              </li>
            </ul>
            <p className="text-justify">As this is trading among individuals, buyers would normally ask for examining the car. Before the examination, buyers should look at the car body to find if there is any damage. Buyers could then (together with sellers) drive the car to vehicle repairing / maintenance centre for examination. We suggest certain items shall be checked, including any mark of i) collision; ii) mending; or iii) illegal modification. If possible, buyers should request examining the car by vehicle repairing / maintenance centre(s) appointed by them. This would help ensuring the examination and process are fair and objective. The whole process would normally take around 1 to 2 hours costing from several hundred to a thousand odd dollars. It depends on the items checked and varied from different maintenance centres.</p>
            <p className="text-justify">After car examination, buyers should test and drive the car and we suggest the following core items shall be tested / checked:</p>
            <ol type="i">
              <li>
                <p className="text-justify"><span style={{ textDecoration: 'underline' }}><span style={{ color: '#ff0000', textDecoration: 'underline' }}>climbing up slope;</span></span></p>
              </li>
              <li>
                <p className="text-justify"><span style={{ textDecoration: 'underline' }}><span style={{ color: '#ff0000', textDecoration: 'underline' }}>acceleration on flat road;</span></span></p>
              </li>
              <li>
                <p className="text-justify"><span style={{ textDecoration: 'underline' }}><span style={{ color: '#ff0000', textDecoration: 'underline' }}>cornering;</span></span></p>
              </li>
              <li>
                <p className="text-justify"><span style={{ textDecoration: 'underline' }}><span style={{ color: '#ff0000', textDecoration: 'underline' }}>braking while driving down slope;</span></span></p>
              </li>
              <li>
                <p className="text-justify"><span style={{ textDecoration: 'underline' }}><span style={{ color: '#ff0000', textDecoration: 'underline' }}>air-conditioner and hi-fi;</span></span></p>
              </li>
              <li>
                <p className="text-justify"><span style={{ textDecoration: 'underline' }}><span style={{ color: '#ff0000', textDecoration: 'underline' }}>seats adjustment;</span></span></p>
              </li>
              <li>
                <p className="text-justify"><span style={{ textDecoration: 'underline' }}><span style={{ color: '#ff0000', textDecoration: 'underline' }}>doors and windows opening / closing;</span></span></p>
              </li>
              <li>
                <p className="text-justify"><span style={{ textDecoration: 'underline' }}><span style={{ color: '#ff0000', textDecoration: 'underline' }}>hand brake performance on slope; and</span></span></p>
              </li>
              <li>
                <p className="text-justify"><span style={{ textDecoration: 'underline' }}><span style={{ color: '#ff0000', textDecoration: 'underline' }}>any leakage of fuel, by checking the car parking space to see if there is any petrol on the ground.</span></span></p>
              </li>
            </ol>
            <p className="text-justify">If the buyer is satisfied with the car performance and examination report, he / she could arrange making payment to seller to complete the transaction. Before confirming the deal, we suggest the buyer or seller to apply for a <a href="http://www.td.gov.hk/filemanager/common/tdforms/td87s(2008.05).pdf">Certificate of Clearance (TD87(s)) </a> from Transport Department Licensing Offices (free of charge) to evidence the car being traded does not bear any outstanding fine, penalty, lawsuit and other issue.</p>
            <p className="text-justify">To avoid dispute and to protect both the parties, we also suggest the parties using payment methods with accounting record, such as depositing cash to seller&rsquo;s bank account, bank transfer or cheque transfer. Some individuals would also draft brief contract for the car trading, to document i) the ownership of the car concerned bearing the registration mark and vehicle registration document is changed from the seller to buyer on the trading day; and ii) the seller or any other person does not keep any car key of the car. It is also recommended that the both parties retain each other&rsquo;s contacts.</p>
            <p className="text-justify">Before seller&rsquo;s leaving, the buyer should ensure the vehicle registration document is signed by the seller. The seller should also be asked to fill and sign on the relevant parts for seller on a <a href="http://www.td.gov.hk/filemanager/common/td25(2016.11)_e-fillable_eng.pdf"> Notice of Transfer (TD25)</a>. Both the parties could exchange car key and vehicle registration document at this moment OR complete this step after going through ownership transfer process in Transport Department.</p>
            <p className="text-justify">Both the seller and buyer are required to go to Transport Department during business hours for ownership transfer process, within 72 hours of the trading. Buyer needs to complete and submit a signed Notice of Transfer, together with identity document (HKID or passport). The seller is required to submit photocopy of the Notice of Transfer to Transport Department. If possible, we suggest both the parties meeting at Transport Department to go through the process, and exchanging car key and vehicle registration document after that. Please be reminded that before going to Transport Department for documentation, the car buyer should possess a valid third party risk insurance policy for the car concerned with effective day of the final car trading date (should be the day when going through ownership transfer process at Transport Department). Either the Cover Note or policy of the third party risk insurance must be brought to the Transport Department for processing.</p>
            <p className="text-justify">If the declared transaction price is greater than the last taxable value, the value of exempted accessories (if any), the value of unexpired portion of a warranty other than a manufacturer's warranty (if any) plus the first registration tax paid, the former owner should apply to the Hong Kong Licensing Office on application form <a href="http://www.td.gov.hk/filemanager/common/td468.pdf">(Application for Approval of The Selling Price of a Motor Vehicle Upon Transfer of Ownership TD468) </a> for approval and should pay the additional tax before the transfer of ownership is effected.</p>
            <p className="text-justify">If the seller wishes to retain the registration mark, he / she needs to sign and submit <a href="http://www.td.gov.hk/filemanager/common/td129(2016.03)_e-fill_eng_type%201.pdf"> Application to Transfer or Retain a Vehicle Registration Mark TD129 </a> for retaining it and applying for a new registration mark for the car being traded.</p>
            <p className="text-justify">Having completed the transfer of ownership process, the buyer should arrange renewing the vehicle licence as soon as possible.</p>
            <h2>Trade with traders</h2>
            <p className="text-justify">When car owners want to sell their cars urgently, trading with car traders is the most efficient way. However, the selling price to car traders is generally lower than that of trading with individuals.</p>
            <p className="text-justify">Generally, the process of trading with traders and individuals is similar. When car owners are selling their cars to car traders, the examination on the cars by the car traders would be more comprehensive, than what individuals would be doing. In other words, the quality of cars acquired by traders for selling subsequently should be better (before buying cars from traders, buyers should also conduct examination on the car). Some traders would also provide all the necessary services for helping buyers or sellers in completing the process of transfer of ownership (with extra charges). There would also be contract signed for each transaction with car traders, on most occasion and it is for protecting trading parties.</p>
            <h2>Costs of second-hand cars trading</h2>
            <p className="text-justify">There are certain common charges involved in second-hand cars trading:</p>
            <ul>
              <li>
                <p className="text-justify">car examination charge, ranging from HKD200 to HKD1,000 odd, depending on examination centre and examination items involved</p>
              </li>
              <li>
                <p className="text-justify">car transfer fee paying Transport Department: HKD250 for motor cycle and motor tricycle; HKD1,000 for other kinds of car</p>
              </li>
              <li>
                <p className="text-justify">fee of HKD560 to Transport Department for transferring or retaining registration mark</p>
              </li>
            </ul>
            <p className="text-justify">Moreover, please refer to <a href="http://www.td.gov.hk/en/public_services/fees_and_charges/index.html">vehicle licence fee paying annually or in 4-month</a>.</p>
            <p className="text-justify">Second-hand car is not substandard or in poor condition. Many second-hand cars in the market are in good quality leading to the high turnover of second-hand cars in Hong Kong. Apart from the car conditions, certain factors could also substantially affect the trading price, including year of manufacturing, brand and model, modification of cars, cross-border vehicles (higher value for non-cross-border vehicles), any previous collision, number of previous owner (recorded in vehicle registration document, higher value if fewer previous owners), accessories, car interior design and color and car body color etc. We strongly recommend you to make use of the valuation provided by vCon to negotiate a best Win-Win trading price (to you and your trading counterparts).</p>

            <div className="col-sm-12 col-lg-12">
              <img className="img-responsive" src="/tips_flowchart_en.png" alt="Flow chart" />
            </div>
          </div>
        )
        }
      </div>


    );
  }
}
