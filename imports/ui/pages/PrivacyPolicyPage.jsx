import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';

export default class PrivacyPolicyPage extends Component {
  componentDidMount() {
    this._invalidate = () => this.forceUpdate();
    i18n.onChangeLocale(this._invalidate);
  }

  componentWillUnmount() {
    // this._invalidate = () => this.forceUpdate();
    i18n.offChangeLocale(this._invalidate);
  }

  render() {
    return (
      <div className="col-xs-12">
        {i18n.getLocale() === 'zh-HK' ? (
          <div className="content">

            <p className="text-justify">
              vCon對車款及車價的深入調查大大增加估價的參考價值。與物業估價情況相類似，實際成交價要視乎市場實際情況同車款受歡迎程度等的因素。不過，作為香港二手車估價的嚮導，我們長遠最大的目標係為大家提供免費、準確的參考價，令買賣雙方一齊贏，買賣二手車更有效率，更有質素，更慳時間。
            </p>

            <p className="text-justify">
              我們是車檔有限公司(下稱為「我們」、「本公司」或「車檔」)，且我們擁有及經營網站 www.carvcon.com (下稱為「本網站」或「carvcon.com」 )。我們的網站透過互聯網 （包括透過使用應用程式） 提供線上汽車估價，並提供二手車買賣平台服務及其他有關服務（「服務」）。我們重視閣下的私隱權，並竭力維護閣下個人資料得到保密。此私隱政策適用於我們及相關聯公司提供的所有產品及服務，說明我們可如何收集、使用及披露閣下的個人資料。本私隱政策受《個人資料（私隱）條例》（香港法例第486章）（以下簡稱「私隱條例」）規管並奉行其有關規定。
            </p>

            <h2>本公司政策</h2>
            <p className="text-justify">
              閣下毋須提供任何個人資料以瀏覽本網頁。當閣下登記使用我們的任何服務，我們會收集閣下的個人資料以便我們能夠為閣下提供服務。閣下可拒絕向我們提供個人資料，但在此情況下，我們可能無法為閣下提供服務 / 只能夠為閣下提供有限度服務。閣下提供個人資料，即代表閣下同意我們按本私隱政策聲明使用閣下的個人資料。
            </p>

            <h2>所收集的個人資料類別</h2>

            <p className="text-justify">
              車檔或會要求閣下提供下列的個人資料，以便就閣下的服務進行登記及管理。倘若沒有此等資料，便不可能滿足閣下的服務要求。此類資料包括但不限於：
              (i) 姓名；及 (ii) 聯絡詳情，包括聯絡人、電話號碼、電郵地址、聯絡地址、付款資料等。
            </p>

            <p className="text-justify">
              在某些情況下，閣下或需按要求提供若干其他資料，好讓我們改善我們的產品及服務，為閣下提供切合期望及需要的資訊及服務。在大部分情況下，閣下可選擇不提供此類資料。然而，若有關的服務是按個人所需而設，或產品或服務的供應是需要閣下提供所有要求的資料，不提供此等資料會令本公司不能提供所需的產品或服務。此類資料包括但不限於：
            </p>

            <p className="text-justify">
              (i) 性別；(ii) 興趣及公餘活動；(iii) 登記車輛資料及圖片; (iv) 車輛、其他商品及服務的個人喜好及要求；及 (v) 任何其他vCon認為需要的資料。
            </p>

            <p className="text-justify">
              本公司的網頁伺服器亦會收集有關閣下接駁互聯網期間的資料，以不記名方式作為伺服器使用量的綜合統計之用，藉以加強服務，更能滿足到訪本公司網頁人士的需要及期望。此類資料包括但不限於：
            </p>
            <p className="text-justify">
              (i) 瀏覽器類型及版本；(ii) 操作系統；(iii) 瀏覽喜好及習慣; 及 (iv) 網際網絡協定位址 (IP Address) 及／或網域名稱。
            </p>

            <h2>個人資料的使用</h2>

            <p className="text-justify">
              車檔從閣下收集所得的個人資料可能會用於，包括但不限於，以下用途：
            </p>

            <ol>
              <li>為閣下提供有關的產品或服務；</li>

              <li>核實閣下的帳戶身份；</li>

              <li>為閣下處理與產品或服務有關的付款指示或追收應繳款項或其他要求；</li>

              <li>就為閣下提供有關產品或服務而分析、核實及／或檢查閣下的信用、付款及／或狀況；</li>

              <li>為閣下設計符合閣下期望及需要的產品或服務；</li>

              <li>為閣下提供客戶服務；</li>

              <li>進行市場研究、統計及行為分析；</li>

              <li>審核；</li>

              <li>按適用法律、規則及規例的規定作出披露；及</li>

              <li>直接促銷本公司及相關聯公司的產品及服務。</li>
            </ol>

            <h2>直接促銷</h2>

            <p className="text-justify">
              如閣下已提供您的可辨識個人身份的資料給我們，您便可能會不時收到我們或我們相關聯公司的直接推廣電話、電郵或郵件。若閣下想轉為收取或不收取本公司或本公司相關聯公司的直銷促銷資料，請聯絡我們處理 – info@carvcon.com。
            </p>

            <h2>資料的保存</h2>

            <p className="text-justify">
              閣下與我們進行業務往來之時，我們將保存您的網上瀏覽記錄、賬戶記錄、喜好設定及交易紀錄等以作任何合理預期與業務有關之用。我們的一般政策是將有關資料保存一段合理時間。我們並不提供設施或工具供閣下刪除我們所持之個人資料。
            </p>

            <h2>查閱及更正資料</h2>

            <p className="text-justify">
              如閣下希望查閱及／或更正您提供給我們的可識辨個人身份的資料及其他任何資料，請致函我們：
            </p>

            <i>電郵：info@carvcon.com</i>

            <h2>資料披露</h2>

            <p className="text-justify">
              閣下向我們提供的所有個人資料將妥為存置於網站及伺服器內，只有獲授權人士方可查閱。
            </p>

            <h2>「Cookies」的使用</h2>

            <p className="text-justify">
              當閣下瀏覽本公司網站時，除非另有說明，否則本公司會記下閣下曾經到訪，而不會收集任何其他個人資料。本網站任何部分所使用的Cookies(如有)，並非用於收集可辨識個人身份的資料。Cookies是儲存於上網人士的電腦內的電腦檔案，用於獲取配置資料以及分析上網人士的瀏覽習慣。Cookies可免除您每次瀏覽網站時重新登記的麻煩，並通常用於追蹤您喜歡選擇的網頁主題。閣下有權選擇不接受Cookies，但這樣的話有可能使您無法使用或啟動本公司網站的若干功能。
            </p>

            <h2>適用範圍</h2>

            <p className="text-justify">
              本私隱政策聲明適用於本公司、相關聯公司的網頁及所提供的服務過程。我們有關網頁可能載有通往其他網址及網頁的連線點。 每當閣下啟動任何此等連線網址，例如點選任何廣告客戶的連線欄目，閣下即已離開了我們的網址；而閣下在離開我們網址後向任何其他人或組織提供的任何個人資料或任何其他資料，一概不在本公司的管控範圍內。閣下須承擔一切瀏覽或使用其他網址的風險。
            </p>

            <h2>查詢</h2>
            <p className="text-justify">
              如閣下對車檔之私隱政策有任何疑問，閣下可按下列電郵地址以書面方式通知我們: info@carvcon.com
            </p>

            <h2>修改私隱政策</h2>
            <p className="text-justify">
              我們可不時修改本私隱政策，並於我們網頁（www.carvcon.com）公佈。我們不會直接特別通知你所作的任何修改。閣下可不時瀏覽本私隱政策，以確保您得悉最新版本。
            </p>
          </div>
        ) : (
          <div className="content">
            <p className="text-justify">
              vCon is committed to conduct researches into car models and car prices to help in
              improving the referential value and reliability of our used cars valuation. Similar to
              properties valuation, the actual closing prices are subject to certain factors including the
              market circumstances and popularity of the particular car models etc. Nevertheless,
              being the leader of Hong Kong used cars valuation, our long-term biggest goal is to
              provide free and accurate valuations for reference, driving to a win-win situation for
              buyers and sellers and making used car trading to be more efficient, higher quality and
              time saving.
            </p>

            <p className="text-justify">
              We are vCon Limited (“we”, “the Company” or “vCon”) owning and running the
              website of www.carvcon.com (“the Website” or “carvcon.com”). The Website
              provides online cars valuation, used cars trading platform and other related services
              (“Services”) through internet (including through applications). We care and value your
              privacy right, and always spend our utmost effort to protect the confidentiality of your
              personal data. This Privacy Policy applies to all the products and Services provided by
              vCon and vCon’s associated company(ies) illustrating how we collect, use and disclose
              your personal data. This Privacy Policy is governed by “Personal Data (Privacy)
              Ordinance” (Cap. 486) (“Privacy Ordinance”) and consistent to its requirements.
            </p>

            <h2>The Company’s policy</h2>
            <p className="text-justify">
              You are not required to provide any personal data for browsing the Website. When you
              register for any of our Services, we would collect your personal data for vCon to provide
              Services to you. You could refuse to provide your personal data to vCon but, under this
              circumstance, we may not be able to provide Services / only be able to provide limited
              Services to you. Upon your providing your personal data, it represents you agree with
              vCon to use your personal data in accordance with this Privacy Policy.
            </p>

            <h2>Types of personal data collected</h2>
            <p className="text-justify">
              vCon may request you to provide the following personal data for the purposes of
              Services registration and management. vCon would not be able to provide Services to
              you upon your satisfaction if we do not have such personal data. Such personal data is,
              including but not limited to: i) name; and ii) contacts details, including contacting person,
              telephone number, email address, mailing address, payment information etc. Under
              certain circumstances, you may be required to provide further data / information for
              vCon to improve our products and Services in order to provide you with data,
              information and Services meeting your expectations and requirements. In most
              situations, you could choose not to provide such further data / information. However, if
              any of the Services is provided based on your expectations, preferences and
              requirements, or the provision of products or Services requires such further data /
              information from you, we would not be able to provide such products or Services if you
              decide not to provide such further data / information. Such further data / information
              is, including but not limited to:
            </p>

            <ol>
              <li>
                gender;
              </li>
              <li>
                hobbies and leisure activities;
              </li>
              <li>
                registered cars information and pictures;
              </li>
              <li>
                preferences and required conditions for cars and other goods and Services; and
              </li>
              <li>
                any other data / information that vCon considers necessary.
              </li>
            </ol>

            <p className="text-justify">
              The server of the Website would also collect data / information regarding your
              connection to internet for general purpose of statistic recording sever usage volume in
              anonymous form. This would help vCon in enhancing our Services making we are more

              able to satisfy any person’s expectations and requirements when visiting the Website of
              vCon. Such data / information is, including but not limited to:
            </p>

            <ol>
              <li>
                type and version of browsers;
              </li>
              <li>
                operating systems;
              </li>
              <li>
                favorites and habits of browsing; and
              </li>
              <li>
                Internet Protocol Address (IP Address) and / or Domain Name.
              </li>
            </ol>

            <h2>Use of personal data</h2>
            <p className="text-justify">
              The personal data collected from you may be used for the following purposes, including
              but not limited to:
            </p>

            <ol type="i">
              <li>
                Providing related products or Services;
              </li>

              <li>
                Identifying and verifying your account and identity;
              </li>

              <li>
                Processing payment instruction regarding products or Services for you, or chasing
                payable payment, or any other requests;
              </li>

              <li>
                Performing analysis regarding the products or Services provided to you, verifying
                and / or conducting examination into your credit, payment and / or condition;
              </li>

              <li>
                designing products or Services meeting your expectations and requirements;
              </li>

              <li>
                providing customer services to you;
              </li>

              <li>
                conducting market research, statistic and behaviors analysis;
              </li>

              <li>
                auditing;
              </li>
              <li>
                making disclosure in accordance with requirement(s) under applicable laws,
                regulations and rules; and
              </li>
              <li>
                performing direct promotions / sales of products and Services for vCon and other
                associated company(ies).
              </li>
            </ol>

            <h2>Direct promotions / sales</h2>
            <p className="text-justify">
              If you had provided your identifiable personal data to vCon, you may from time to time receive our or vCon’s associated company(ies)’ direct promotions / sales telephone, email or mail.  If you prefer to receive or not receive vCon’s or vCon’s associated company(ies)’ direct promotions / sales information, please contact us – info@carvcon.com.
            </p>

            <h2>Data / information keeping</h2>

            <p className="text-justify">
              When you are having business dealing with vCon, vCon would store and keep your online browsing record, account record, favorite settings and transaction record etc. for any business related purposes reasonably expected.  Our general policy is to keep / retain such data / information for a reasonable period of time.  vCon does not provide any facility or tool for you to remove any personal data in our custody.
            </p>

            <h2>Accessing to and revising personal data</h2>

            <p className="text-justify">
              If you wish to access to and / or revise your identifiable personal data and any other information provided to vCon, please contact vCon – info@carvcon.com.
            </p>

            <h2>Disclosure of data</h2>
            <p className="text-justify">
              All the personal data you provided to vCon would be stored and kept in the Website and server properly and would only be accessed by authorized person(s).
            </p>

            <h2>Use of “Cookies”</h2>
            <p className="text-justify">
              When you are browsing the Website of vCon, unless otherwise indicated, vCon would record the fact that you had visited the Website, without collecting any other personal data.  The Cookies (if any) used in any part of the Website of vCon are not for collecting identifiable personal data.  Cookies are stored in computer file(s) of the computer used by the person(s) who accesses to internet for obtaining configuration and analyzing the browsing favorites of the person(s) who accesses to internet.  Cookies provide convenience of avoiding repeated registration upon a new browsing on internet and are commonly used to trace your favorites of different themes of website.  You have the right of not accepting Cookies but you may then not be able to access to or activate some functions on the Website of vCon.
            </p>

            <h2>Applicability</h2>
            <p className="text-justify">
              This Privacy Policy is applicable to vCon’s, vCon’s associated company(ies)’ website(s) and the process of providing Services.  Our related website(s) may have connecting link(s) to other website(s) and webpage(s).  When you activate any of such connecting link(s), including clicking on any connecting button to advertisement, it means you had already left our related website(s).  After your leaving from our related website(s), and if you provide any personal data or any other information to any other person or organization, it is beyond vCon’s control and coverage.  You have to accept the risk(s) of browsing or accessing to other website(s).
            </p>

            <h2>Enquiry</h2>
            <p className="text-justify">
              If you have any question about this Privacy Policy published by vCon, please contact us in writing via info@carvcon.com.
            </p>

            <h2>Change of Privacy Policy</h2>
            <p className="text-justify">
              vCon may change this Privacy Policy anytime and then publish on the Website (www.carvcon.com).  We would not make any direct notification to you of any such change.  You could from time to time read the Privacy Policy in order to access to the most updated version.
            </p>
          </div>
        )
        }
      </div>
    );
  }
}
