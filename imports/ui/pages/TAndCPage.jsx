import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';

export default class TAndCPage extends Component {
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
            <h2>vCon使用條款及免責聲明</h2>

            <h3>同意接受條款</h3>

            <p className="text-justify">
              歡迎你使用www.carvcon.com（「vCon」）的服務。以下是vCon服務條款，我們按照條款的規定，為你提供這項服務。我們會不時，因應情況及在沒有通知你的情況下，修訂任何條款。修訂的服務條款將於公開張貼當日起即時生效，並取代舊有的條款。當你使用特定的vCon服務時，我們雙方均須要遵守為特定服務而制定（並不時重新制定）的指引及規則 (如有的話，書面或口頭通知)。這些指引和規則(如有的話)均構成本服務條款的一部分。
            </p>

            <h3>服務說明</h3>

            <p className="text-justify">
              vCon為用戶提供線上估價資訊平台及其他相關的服務（「本服務」）。你明白及同意本服務可能包括廣告。你亦明白及同意本服務可能包括vCon向閣下發出的一些通訊，例如服務公告及行政信息，而這些通訊是vCon服務的一部分。除非另有其他明文規定，增加或強化目前本服務的任何新功能（包括所推出的新產品）及就任何功能的任何更改均受到本服務條款之規範。你了解也同意，本服務是依「現況」、「現有」及「過往數據」基礎提供，任何用戶通訊或個人化設定之時效、刪除、傳遞錯誤、和未予儲存，vCon均不予負責。vCon保留權利無需事先通知閣下，暫停全部或部分服務以進行維修、保養、更新或其他vCon認為適當的工作。你必須自行取得本服務，而與此有關的第三方費用（例如互聯網供應商或按時收費），包括與廣告展示或傳送有關之費用，你亦須負責。此外，你必須提供取得服務所需之一切必要裝備及為此負責。
            </p>

            <h3>你的註冊義務</h3>

            <p className="text-justify">
              為了能使用本服務，你同意以下事項(在任何需要及必要的時候)：(1)依本服務註冊表之提示提供你本人正確、精確、最新及完整的資料（「登記資料」）；(2)維持並立即更新「登記資料」，確保其為正確、精確、最新及完整。若你提供任何錯誤、不實、過時、不完整或有誤導成分的資料，或者vCon有合理的理由懷疑登記資料為錯誤、不實、過時、不完整或有誤導成分的資料，vCon有權暫停或終止你的帳戶，或 / 及拒絕你於現在和未來使用本服務之全部或一部。vCon十分關切所有使用者的安全及私隱。
            </p>

            <h3>私隱政策</h3>

            <p className="text-justify">
              為了使用本服務，閣下亦需同意「私隱政策」之條款，以保障閣下及其他用戶之個人資料，請轉至「私隱政策」一頁以閱讀有關條款。
            </p>

            <h3>會員帳戶、密碼及安全</h3>

            <p className="text-justify">
              完成本服務的登記程序之後(在有關帳戶服務開通後，任何需要及必要使用帳戶服務的時候)，你將由自己設定或收到一個密碼及帳戶。維持密碼及帳戶的機密安全，完全是閣下的責任。利用該密碼及帳戶所進行的一切行動，你將負完全的責任。你同意以下事項：(1)你的密碼或帳戶遭到未獲授權的使用，或者其他任何安全問題發生時，你將立即通知vCon；且 (2)每次連線完畢，均結束你的帳戶使用。你未能遵守本項規定所衍生之任何損失或損害，vCon無法也不予負責。
            </p>

            <h3>會員行為</h3>

            <p className="text-justify">
              你了解一切的資訊、數據、文字、軟件、音樂、聲音、照片、圖形、視訊、信息或其他資料（「內容」），無論其為公開張貼或私下傳送，均為前開「內容」提供者之責任。換言之，你經vCon或 / 及本服務上載、張貼、發送電子郵件或傳送之「內容」負完全的責任。vCon無法控制經由本服務而張貼之「內容」，因此不保証該等「內容」之正確性、完整性或品質。你了解使用本服務時，可能會接觸到令人不快、不適當、令人厭惡之「內容」。在任何情況下，vCon均不為任何「內容」負責，包含但不限於任何「內容」之任何錯誤或遺漏，以及經使用本服務、由本服務張貼、發送電子郵件或傳送而衍生之任何損失或損害。你同意不將本服務及不被允許將本服務作以下用途：
            </p>

            <ol>
              <li>
                <p className="text-justify">
                  上載、張貼、發送電子郵件或傳送任何非法、有害、脅迫、濫用、騷擾、侵害、中傷、粗俗、猥褻、不道德、誹謗、侵害他人私隱、種族或性別歧視或含有非法成份之內容；或使用vCon或本服務用作以上述行為為目的或促進任何以上行為；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  以任何方式傷害任何人／任何機構；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  冒充任何人或機構，包括但不限於vCon主管、論壇領袖、主持人，或以虛偽不實的方式陳述或謊稱與任何人或機構之關係；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  偽造標題或以其他方式操控識別資料，以偽裝經由本服務傳送之任何內容之來源；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  將依據任何法律或契約或信任關係（例如由於僱傭關係和依據保密合約所得知或披露之內部資料、專屬及機密資料）而無權上載、張貼或以其他方式傳送之任何內容加以上載、張貼或以其他方式傳送；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  將侵害任何人之任何專利、商標、商業秘密、版權或其他專屬權利之內容加以上載、張貼或以其他方式傳送；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  將任何廣告信函、促銷資料、垃圾郵件、濫發信件、連鎖信件、直銷或其他任何形式的勸誘資料加以上載、張貼或以其他方式傳送；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  將設計目的在於干擾、破壞或限制任何電腦軟件、硬件或通訊設備的電腦病毒，包括但不限於「木馬屠城」病毒（Trojan Horses）、蠕蟲（Worms）、「計時炸彈」(Time Bombs) 或刪除蠅（Cancelbots），或其他電腦代碼、檔案和程式之任何資料，加以上載、張貼、發送電子郵件或以其他方式傳送;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  以任何形式破壞正常使用vCon或本服務；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  干擾或破壞本服務或與本服務相連線之伺服器和網路，或不遵守於本服務連線網路之規定、程序、政策或規範；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  故意或非故意違反任何適用的本地、國家或國際法律及規則，以及任何具有法律效力之規定；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  「跟蹤」或以其他方式騷擾他人；
                </p>
              </li>


              <li>
                <p className="text-justify">
                  蒐集或儲存其他使用者之個人資料；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  利用網站作任何非法組織或活動；及
                </p>
              </li>

              <li>
                <p className="text-justify">
                  以任何形式將會員服務轉讓及售予第三方。
                </p>
              </li>
            </ol>

            <p className="text-justify">
              你了解vCon並未針對「內容」事先加以審查，但vCon及其指定人有權（但無義務）依其自行之考量，拒絕和移除可經由本服務提供之任何「內容」。在不限制前述規定之前提下，vCon及其指定人有權將違反本服務條款和令人厭惡之任何「內容」加以移除。你使用任何「內容」時，包括依賴前開「內容」之正確性、完整性或實用性之情形，你同意必須自行加以評估並承擔所有風險 (如有的話)。
            </p>

            <p className="text-justify">
              vCon對所有內容及任何留言的真實性、完整性及立場等，不負任何法律責任。而一切留言之言論只代表留言者個人意見，並非vCon之立場。(當留言服務提供使用時)由於vCon受到「即時上載留言」運作方式所規限，故不能完全監察所有留言，若用戶發現有留言出現問題，請盡快通知vCon。
            </p>

            <p className="text-justify">
              你了解並同意，vCon依據法律或規定的要求，或基於誠信為了以下目的之合理必要範圍內，認定必須將「內容」加以保存或揭露時，得加以保存及揭露：(1)遵守法律程序；(2)執行vCon或 / 及本服務條款；(3)回應任何「內容」為 / 大致為侵害第三人權利之主張；或(4)保護vCon及其人員、其使用者及公眾之權利、財產或個人安全，或就任何政府部門或公共機構提出，經vCon信納，協助任何刑事調查或 / 及有關行為(屬香港私隱法例中就使用個人資料豁免保護範圍)。
            </p>

            <p className="text-justify">
              你了解本服務之技術處理及傳送，包含你提供的「內容」，可能(1)經由各個網路加以傳送；且(2)為了符合及配合連線網路或裝置之技術要求而進行改變。
            </p>

            <h3>國際使用之特別警告</h3>
            <p className="text-justify">
              你了解網際網路的無國界性，同意遵守當地所有相關規定之網上行為及可接受「內容」之法規。你亦同意遵守關於從香港或你居住的國家或地區輸出技術性或個人資料所有相關法律。
            </p>

            <h3>於vCon張貼之公共資料</h3>
            <ol>
              <li>
                <p className="text-justify">
                  為本服務條款適用之目的，「本服務公開使用區域」是指一般公眾可以使用的區域。舉例言之，本服務可公開使用的區域包括線上估價資訊平台、二手買賣等。
                </p>
              </li>

              <li>
                <p className="text-justify">
                  你選擇於本服務任何公開使用區域張貼之「內容」，你授予vCon免權利金版稅、永久有效、不可撤銷、非專屬及可完全再授權之下述權利：在全球，使用、重製、修改、重新整理、適應化、發行、翻譯「內容」、創作衍生性著作 / 產品 / 概念 / 設計，並將前開「內容」（一部或全部）加以散佈、演示及展示，及 / 或放入利用任何現在已知和未來開發出之形式、媒體和科技之其他著作物 / 產品 / 概念 / 設計當中，並以任何形式保存。
                </p>
              </li>
            </ol>

            <h3>彌償</h3>

            <p className="text-justify">
              由於你經由本服務提供、張貼或傳送之「內容」、你使用本服務、你與本服務連線、你違反vCon或本服務條款、或你侵害其他人任何權利因而衍生或導致任何第三人提出索賠或請求，包括合理的律師費，你同意賠償vCon或 / 及其分公司、分支機構、主管、代理人、聯名廠商或其他夥伴及員工，並使其免受損失及損害。
            </p>

            <h3>服務轉售之禁止</h3>

            <p className="text-justify">
              本服務任何部分或本服務之使用或存取或保存，你同意不進行重製、拷貝、出售、轉售或作任何商業目的之使用。
            </p>

            <h3>關於使用及儲存之一般措施</h3>

            <p className="text-justify">
              你承認關於使用本服務vCon得訂定一般措施及限制，包含但不限於本服務將保留短消息、佈告欄內容或其他上載「內容」之最長期間、本服務一個帳戶當中可收發短消息的數量限制，以及一般特定期間內你使用本服務之次數上限(及每次使用時間之上限）。若vCon將本服務維持或傳送之任何訊息及其他通訊和其他「內容」刪除或未予儲存，你同意vCon無需承擔任何責任。你亦同意，長時間未使用的帳戶，vCon有權關閉。你也同意，vCon有權依其自行之考量，不論有否通知你，隨時變更任何一般措施及限制。
            </p>

            <h3>服務之修改</h3>

            <p className="text-justify">
              vCon有權於任何時間暫時或永久修改或終止本服務（或其任何部分），無論其通知與否。本服務任何修改、暫停或終止，你同意vCon對你和任何第三人均不承擔責任。而你在任何時間內向vCon或 / 及本服務所提供任何一切的資料，vCon有權因應實際需要，加以保存。而你一開始使用任何vCon或 / 及本服務提供的資料或存取時，你同意此條款。
            </p>

            <h3>終止</h3>

            <p className="text-justify">
              你同意vCon可因任何理由，包括但不限於缺乏使用，或vCon認為閣下已經違反本服務之服務條款的明文規定及精神，終止閣下的密碼、帳號（或其任何部分）或本服務之使用，並將本服務內任何內容加以移除並刪除而無需向閣下作出通知。vCon亦可在不作任何通知下隨時暫停或終止本服務或其任何部分。閣下亦同意若閣下被暫停或終止進入本服務，或閣下的帳戶或有關的資料和檔案被凍結或刪除時，vCon對閣下或任何第三者均不承擔任何責任。
            </p>

            <h3>與廣告商進行之交易</h3>

            <p className="text-justify">
              你於本服務或經由本服務與廣告商進行通訊或商業往來，或參與促銷活動，包含相關商品或服務之付款及交付，以及交易其他任何相關條款、條件、保証或陳述，完全為你與廣告商之間之行為。你與任何廣告商的任何交易或廣告商出現於本服務所生之任何性質的損失或損害，你同意vCon不予負責。
            </p>

            <h3>連結</h3>

            <p className="text-justify">
              本服務或第三人可提供與其他全球資訊網上之網站或資源之連結。由於vCon無法控制前開網站及資源，你了解並同意，前開外部網站或資源是否可供利用，vCon不予負責，存在或源於前開網站或資源之任何「內容」、廣告、產品或其他資料，不代表vCon對其贊同vCon亦不予負責。你進一步同意，因使用或信賴存在或經由前開任何網站或資源之任何「內容」、商品或服務所生或據稱所生之任何損害或損失，vCon不負任何責任。
            </p>

            <h3>免責聲明</h3>

            <p className="text-justify">你明確了解並同意：</p>

            <ol>
              <li>
                <p className="text-justify">
                  vCon根據本服務條款履行與服務有關的義務，只限於以合理的技能和謹慎為你提供的相關服務。服務條款並無任何內容，免除或限制vCon因vCon疏忽、欺詐或其他適用法律不能免除或限制的負責任行為，而導致的死亡或人身損害。
                </p>
              </li>

              <li>
                <p className="text-justify">
                  你使用本服務之風險由你個人負擔。本服務係依「現況」、「現有」及「過往數據」基礎提供，並且任何估價及有關資料只供參考，不等於實際或 / 及必需履行價格。vCon明示不提供任何明示或默示的擔保，包含但不限於商業適售性、特定目的之適用性及未侵害第三方的權利。
                </p>
              </li>

              <li>
                <p className="text-justify">
                  vCon不保証以下事項：(i)本服務將符合你的要求 / 期望；(ii)本服務不受干擾、及時提供、安全可靠或免於出錯；(iii)由本服務之使用而取得之結果為正確或可靠；(iv)你經由本服務購買或取得之任何產品、服務、理解或其他資料將符合你的期望；且 (v) vCon的任何應用程式或vCon提供的服務中任何錯誤都將得到更正。
                </p>
              </li>

              <li>
                <p className="text-justify">
                  是否經由本服務之使用下載或取得任何資料應由你自行考量且自負風險，因任何資料之下載而導致你電腦系統之任何損壞或資料流失，你應負完全責任。
                </p>
              </li>

              <li>
                <p className="text-justify">
                  你自vCon或經由本服務取得之建議和資訊，無論其為書面或口頭，絕不構成本服務條款未明示規定之任何保証。
                </p>
              </li>

              <li>
                <p className="text-justify">
                  vCon對於任何形式的內容、圖片、廣告及資料，不保證正確或可靠。
                </p>
              </li>

              <li>
                <p className="text-justify">
                  為提供本服務，vCon展示若干圖片、有關二手車資料及其他資訊，所有只供參考，vCon並不會為以上展示的圖片、有關二手車資料及其他資訊與事實有偏差 (如有的話) 的情況負上任何責任。
                </p>
              </li>

              <li>
                <p className="text-justify">
                  vCon有權但無義務，更改資料之錯誤部分。並保留一切權利，隨時刪增、修訂及拒絕任何內容、聲明、功能及會員資格，並不作通知。
                </p>
              </li>

              <li>
                <p className="text-justify">
                  vCon有權記錄經任何網路進入者的網路資訊及行為。
                </p>
              </li>

              <li>
                <p className="text-justify">
                  vCon有權拒絕使用者登入及瀏覽，並對經任何網路進入者作出警告。
                </p>
              </li>
            </ol>

            <h3>責任限制</h3>

            <p className="text-justify">
              你明確了解並同意，基於以下原因而造成之損失，包括但不限於利潤、商譽、使用、資料損失或其他無形損失，vCon不承擔任何直接、間接、附帶、特別、衍生性或懲罰性賠償（即使vCon已被告知任何其賠償之可能性亦然）：(1)本服務之使用或無法使用；(2)經由或透過本服務購買或取得之任何商品、資料、資訊或服務，或接收之訊息，或進行之交易所衍生之商品及服務之購買成本；(3)你的傳輸或資料遭到未獲授權的存取或變更；(4)本服務中任何第三人之聲明或行為；及 (5)本服務(在此服務條款中以其他方式明確提供的除外)其他相關事宜。
            </p>

            <h3>排除及限制</h3>

            <p className="text-justify">
              部分管轄地不允許將某些擔保責任排除，或將附帶或衍生賠償予以限制或排除。因此「免責聲明」、「責任限制」之部分限制未必適用於你。
            </p>

            <h3>通知</h3>

            <p className="text-justify">
              向你發出的通知一般經由公告或短消息。本服務條款或其他事項有所變更時，本服務亦可能將展示通知或通知之連結，但vCon有權就任何更改而不通知你。
            </p>

            <h3>著作權及著作權代理人</h3>

            <p className="text-justify">
              vCon尊重他人知識財產及設計，亦呼籲使用者同樣尊重他人之知識財產。若你認為你的著作遭到重製之情形已構成著作權之侵害，請提供以下資料予vCon：
            </p>

            <ol>
              <li>
                <p className="text-justify">
                  有權代理著作權利益所有人之電子或實體簽名；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  你主張遭到侵害之著作物描述；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  你主張遭侵害你權利之著作物於網站所在位置之敘述；
                </p>
              </li>

              <li>
                <p className="text-justify">
                  你的地址、電話號碼及電子郵件地址；及
                </p>
              </li>

              <li>
                <p className="text-justify">
                  你了解提供虛假資料或作虛假聲明之可能後果前提下，聲明你通知所載之前開資料均為正確，且你是著作權人或經授權代理著作權人為上開聲明。
                </p>
              </li>
            </ol>

            <h3>一般條款</h3>

            <p className="text-justify">
              【整份協議】本服務條款構成你與vCon之間的整份協議並規定你對本服務的使用，及取代任何以前你與vCon之間就服務所達成的協議。當你使用或購買某些vCon其他的服務、相關的服務、第三方的內容或第三方的軟件時你亦可能受到額外適用的條款及條件所限制。
            </p>

            <p className="text-justify">
              【法律管轄權】本服務條款及你與vCon的關係將受香港法律的管轄。你與vCon均同意接受香港法院的專屬司法管轄。
            </p>

            <p className="text-justify">
              【服務條款的持續有效性】 倘若一個具司法能力的法院發現本服務條款的任何條款無效，協定各方仍然同意法院應盡力使條款所反映的各方的意向生效，而本服務條款的其他條款將繼續保留完全的效力及效果。
            </p>

            <p className="text-justify">
              【無生存者取得權及非可轉讓性】你同意你的vCon帳戶是不可以轉讓，你帳戶內的任何內容權利於你的死亡時終止。如vCon得知任何用戶過身，該用戶帳戶將被終止，而帳戶內容則按實際情況或需要，而予以保留、轉移、刪除或以任何vCon認為切合可行的形式處理。
            </p>

            <p className="text-justify">
              【本服務條款】本服務條款的章節標題只爲提供方便而設，並不具任何法律或契約效力。
            </p>

            <h3>違約</h3>

            <p className="text-justify">倘發現任何違反本服務條款之情況，請通知我們。</p>
          </div>
        ) : (
          <div className="content">
            <h2>vCon Terms and Conditions, Disclaimers</h2>

            <h3>Accepted Terms and Conditions</h3>

            <p className="text-justify">
              Welcome for choosing the services provided by www.carvcon.com (vCon).  The following is the Terms and Conditions for the services provided by vCon which, by virtual of the Terms and Conditions, is committed to serve you to our best endeavor.  We may, from time to time, based on then conditions and without notification made to you, amend any Terms or Conditions.  Amended Terms or Conditions would be effective immediately on the day when the amendment(s) made, and supersede the previous version.  When you are using any service provided by vCon, both you and vCon have to adhere to applicable rule(s) and guideline(s) (if any, through written or verbal notification) set therefor (and from time to time re-set).  Those rule(s) and guideline(s) (if any) would form part of this Terms and Conditions.
            </p>

            <h3>Illustration of services</h3>

            <p className="text-justify">
              vCon provides online valuation, information platform and other related services to users (the Services).  You understand and agree that the Services may include advertisement.  You also understand and agree that there may be message(s) by vCon sending over to you, including Services notification and administration message, and those messages are part of the Services provided by vCon.  Unless there is specific requirement otherwise, adding or enhancing any feature(s) to the current Services (including any new product(s)) provided by vCon and any change(s) on any feature(s) are governed by this Terms and Conditions.  You understand and agree that the Services provided by vCon are based on “as is”, “existing situations” and “historical data”.  vCon would not accept any responsibility and liability on any effective period, deletion, transmission error and situation of anything not being saved / stored occurred by any user(s)’ communication or personal setting.  vCon reserves all the rights of not making prior notification to you for any suspension of services, wholly or partly, for the purpose of fixing, maintenance, update or any other work(s) that vCon considers suitable and necessary.  You need to acquire the Services provided by vCon by yourself and bear any third party cost (if any, for example internet service provider would charge for the usage), including any cost relating to our advertisement demonstration or transmission.  Moreover, you have to equip yourself or your device(s) so that all the necessary things are up to standard for you to acquire the Services provided by vCon.  You hold sole responsibility for this.
            </p>

            <h3>Obligation of registration</h3>

            <p className="text-justify">
              For using the Services provided by vCon, you agree the followings (at any time required and necessary): 1) providing correct, accurate, updated and complete information relating to yourself according to instruction for registration for the Services (Registered Information); 2) maintaining and updating Registered Information to ensure it is correct, accurate, up to date and complete.  If you provide any wrong, inaccurate, outdated, incomplete or misleading information, or vCon reasonably suspects that any Registered Information provided by you is wrong, inaccurate, outdated, incomplete or misleading, vCon has the full discretion to suspend or terminate your account and / or refuse you from using any Service provided by vCon, wholly or partly, in any present or future time.  vCon extremely care about users’ security and privacy.
            </p>

            <h3>Privacy Policy</h3>

            <p className="text-justify">
              For using the Services provided by vCon, you are also required to agree and adhere to our Privacy Policy, in order to protect your and other users’ private information and personal data.  Please refer to the Privacy Policy for relevant requirements and other details.
            </p>

            <h3>Users’ account, password and security</h3>

            <p className="text-justify">
              After completing the registration process (when the account registration and related services available to general public, and whenever it is required and necessary for going through account registration and related services), you should setup your own or receive a password and account ID.  It is your sole responsibility to maintain the confidentiality and security of your password and account.  You are also solely responsible for any activity by using or through your password and account.  You agree the followings: 1) when there is any unauthorized access of your password or account or any security issue, you would inform vCon as soon as possible; and 2) you would log off your account after the use of Services at vCon.  vCon would not and is not able to accept any responsibility and liability for any loss or damage you are suffering from, which is resulting from any non-compliance to the requirements in this paragraph.
            </p>

            <h3>Users’ behavior</h3>

            <p className="text-justify">
              You understand that it is the original owner’s / issuer’s / distributor’s responsibility for all the information, data, characters, software, music, audio / voice files, pictures, figures / shapes, videos, messages or any other kind of information (Contents), which is no matter publicly published or non-publicly forwarded.  In other words, you would hold full responsibility on the Contents you upload, publish, send via email or forward through vCon and / or the Services provided by vCon.  vCon is not able to control and manage any Contents published through the Services provided by vCon and thus vCon would not guarantee the accuracy, completeness or quality of such Contents.  You understand that you may come across unpleasant, inappropriate, disgusted Contents when using the Services provided by vCon.  At any time and under any circumstance, vCon would not accept any responsibility for, including but not limited to any error / mistake or omission on the Contents, and any loss or damage incurred from using the Services, publishing anything via the Services, sending anything through email or forwarding anything.  You also agree that you would not and are not allowed to use the Services provided by vCon for the following purposes:
            </p>

            <ol>
              <li>
                <p className="text-justify">
                  uploading, publishing, sending via email or forwarding any illegal, harmful, threatening, abused, harassed, offensive, slandered, vulgar, obscene, unethical, defamatory, invading others’ privacy, race or sex discriminative or illegal element contained Contents; or using vCon or the Services provided by vCon for achieving or facilitating any of the above activities;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  damaging or causing harm / loss against any other person or institution / entity;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  impersonating any person or institution / entity, including but not limited to vCon’s manager / officer, forum / platform / website leader, host or dishonestly pretending or representing any relationship with any other person or institution / entity;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  forging title or heading or manipulating any identifiable information by any means, for pretending those title or heading or identifiable information to be Contents forwarded / distributed through or from the Services provided by vCon;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  uploading, publishing or by any means forwarding / distributing any Contents which is unauthorized to be so uploaded, published or by any means forwarded / distributed, according to any law or agreement or trust (for example, any internal, exclusive and confidential information obtained or disclosed by virtue of employment relationship and any confidential contract);
                </p>
              </li>

              <li>
                <p className="text-justify">
                  uploading, publishing or by any means forwarding / distributing any Contents obtained or accessed by / through intruding any person’s patent, trademark, commercial secrecy, copyright or any other exclusive rights;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  uploading, publishing or by any means forwarding / distributing any advertisement letter / invitation, promotion information, junk email, abused issued letter / email, chain emails, direct-selling or any other kinds of inducing information;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  uploading, publishing, sending through email or by any means forwarding / distributing any information relating / connecting to or representing any computer virus, including but not limited to Trojan Horses, Worms, Time Bombs or Cancelbots, or other codes, files and programs, which are / were designed for the purpose of interfering, causing harm / loss / damage against or restraining any computer software, hardware or communication equipment;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  causing harm / loss / damage of any kind by any means against normal usage of vCon or the Services provided by vCon;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  interfering or causing harm / loss / damage against the Services provided by vCon or the server and network connected to / associated with the Services provided by vCon, or being non-compliance to any rule, procedure, policy or regulation of the network connected to / associated with the Services provided by vCon;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  deliberately or unintentionally contravening any applicable local, national or international law and regulation, and any other rule(s) with legal effect;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  tracking or by any other means harassing others;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  collecting or storing other users’ personal private information;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  making use of the website of vCon for any illegal organization or activity; and
                </p>
              </li>

              <li>
                <p className="text-justify">
                  by any means transferring and selling registered user services to any third party.
                </p>
              </li>
            </ol>

            <p className="text-justify">
              You understand that vCon would not perform any prior verification / checking on any Contents.  However, vCon and any nominated person(s) are authorized to (but not obligated), based on their consideration(s), reject and remove any Contents provided through the Services by vCon.  Without constraining the above requirements, vCon and any nominated person(s) are authorized to remove any Contents which are i) in breach of this Services Terms and Conditions; and ii) disgusted to any person.  While you are using any Contents, including under the situation of relying on the accuracy, completeness or practicability of any Contents which had been made available previously, you agree you need to assess and accept all the risk(s) (if any).
            </p>

            <p className="text-justify">
              vCon would not accept any legal responsibility and liability on the accuracy, completeness and stance / position etc. of any Contents and comments by any users.  All the comments by the users only represent such users’ personal opinion / feeling but not any stance / position of vCon.  (When service of leaving comment on vCon is provided) vCon is constrained from completely monitoring all the comments left by users because of the rule and model of “immediately uploading comments”.  If any user identifies or becomes aware of any issue about any comment, please notify vCon as soon as possible.
            </p>

            <p className="text-justify">
              You understand and agree that vCon would, based on i) any requirement of any law or regulation; or ii) acting with integrity or in good faith, store / keep / maintain and disclose any Contents whenever vCon considers the Contents are necessarily so stored / kept / maintained and disclosed, within reasonable and necessary norm for achieving the followings:
            </p>

            <ol>
              <li>
                <p className="text-justify">
                  complying with applicable legal procedure;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  executing / exercising any Terms and Conditions of vCon and / or the Services provided by vCon;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  responding to any Contents which is left for intruding any third party’s claim of right; or
                </p>
              </li>

              <li>
                <p className="text-justify">
                  protecting any right, asset or personal security of vCon (and its personnel), its users and public, or assisting any government department or public body in criminal investigation and / or investigating into related activity (it is an exemption if using / providing personal private data for criminal investigation pursuant to Personal Data (Privacy) Ordinance), upon request from such government department or public body and verification and acceptance by vCon.
                </p>
              </li>
            </ol>

            <p className="text-justify">
              You understand that any technical processing and transmission of The services provided by vCon, including any Contents provided by yourself, may be i) processed through different networks for further transmission / forwarding; and ii) changed for fulfilling and aligning with any technical requirement of networks or devices’ technology.
            </p>

            <h3>Special warning for international use</h3>

            <p className="text-justify">
              You understand that the borderless nature of internet and agree to adhere to any local applicable regulation(s) and rule(s) for internet activity / behavior and acceptance of Contents.  You also agree to adhere to any applicable law regarding exporting technology or personal private data from Hong Kong or your residential country or region.
            </p>

            <h3>Public information published in vCon</h3>

            <ol>
              <li>
                <p className="text-justify">
                  For the purpose of this Terms and Conditions for the Services provided by vCon, “publicly used area / zone for the Services provided by vCon” means such area / zone that general public could access to.  For example, publicly used area / zone of the Services provided by vCon include online used cars valuation and information platform and trading of used goods etc.
                </p>
              </li>

              <li>
                <p className="text-justify">
                  For any Contents you publish in any publicly used area / zone of the Services provided by vCon, you agree and authorize vCon to, free of right money and royalty, effective permanently, irrevocably, non-exclusively and absolutely further authorizing:- globally use, remake, modify, reorganize, adapt to, publish, translate any Contents, create / design derivative good / item / idea / design, further distribute / show / demonstrate any Contents made available previously (wholly or partly) and / or consolidate / merge with any good / item / idea / design developed in any existing and future form, media and technology, and to keep, maintain and store it.                </p>
              </li>
            </ol>

            <h3>Indemnity</h3>

            <p className="text-justify">
              For any claims, demands and requests raised or lodged by any third party, including any reasonable legal cost, incurred from / by / through 1) your providing, publishing or forwarding / distributing any Contents; 2) your use of any Services provided by vCon; 3) your connecting to any Services provided by vCon; 4) your violation of any Terms and Conditions of vCon; or 5) your intruding other’s right, you agree to indemnify / compensate vCon and / or its associated company(ies), associated organization(s), supervisor(s), agent(s), joint manufacturer(s) or any other partner(s) and employee(s) from any loss and damage.
            </p>

            <h3>Prohibition of transferring or re-selling services</h3>

            <p className="text-justify">
              For any part of the Services provided by vCon or the using or accessing or keeping / maintaining / storing of the Services provided by vCon, you agree not to remake, copy, sell, resell or make use for any business / profit running purpose.
            </p>

            <h3>Regarding general measures for using and storing</h3>

            <p className="text-justify">
              You recognize that vCon needs to develop general measures and restrictions for the using of the Services provided by vCon, including but not limited to the Services provided by vCon would keep / maintain / store / retain any “short messages”, Contents in Notification or any Contents uploaded for a longest period, limitation of “short messages” that could be received and sent for every user account under the Services provided by vCon and limitation of frequency for you to use the Services provided by vCon under any particular period (and limitation of time of using for every access).  If vCon removes or does not keep / maintain / store / retain any messages, communications and other Contents which are maintained or forwarded / distributed by / through the Services provided by vCon, you agree that vCon is not required and obligated to hold any responsibility and liability.  You also agree that vCon has the right to close / terminate any user account which has not been used / accessed to for a long period of time.  You also agree that vCon has the right to, based on its sole consideration and discretion, regardless of making any notification to you, revise / change any general measures and restrictions.
            </p>

            <h3>Change of services provided by vCon</h3>

            <p className="text-justify">
              vCon has the right of, at any time, temporarily or permanently, changing or terminating the Services provided by vCon (or any part of it), regardless of making any notification to you.  You agree that vCon holds no responsibility and liability to you and any other third party for any change, suspension or termination of the Services provided by vCon.  vCon has the right of keeping / maintaining / storing / retaining any information which is provided by you to vCon and / or the Services provided by vCon at any time, if necessary.  You agree with this term upon you start using any information or access provided by vCon and / or vCon’s Services.
            </p>

            <h3>Termination</h3>

            <p className="text-justify">
              You agree that vCon could, due to any reason including but not limited to lack of using or vCon considers you had already violated any statutory requirement and spirit of this Terms and Conditions covering the Services provided by vCon, terminate your user account, password (or any part of them) or the use of the Services provided by vCon.  vCon could also remove and delete any Contents of the Services provided by vCon without notifying you.  Moreover, vCon has the right of suspending or terminating the Services provided by vCon or any part of them in anytime without notifying you.  You further agree that vCon holds no responsibility and liability to you or any other third party if you are suspended or terminated from accessing to the Services provided by vCon, or your account or any related information and file are frozen or removed.
            </p>

            <h3>Transaction / Dealing with advertisers</h3>

            <p className="text-justify">
              For any 1) communication; 2) business dealing; or 3) participation / engagement in sales promotion activity including payment and exchange of related goods or services as well as any related terms, conditions, guarantees or representations regarding any transaction / dealing, with any advertiser you acquired from / through the Services provided by vCon, they are entire and sole activity between you and the respective advertiser.  You agree that vCon holds no responsibility and liability on any loss or damage of any kind incurred from / by / through any transaction / dealing you have with any advertiser or appearance / availability of any advertiser on the Services provided by vCon.
            </p>

            <h3>Linkage / connection</h3>

            <p className="text-justify">
              The Services provided by vCon or any third party could share linkage connecting to other global informative online website or resource.  As vCon is not able to control any other website and resource which have been made available previously, you understand and agree that vCon holds no responsibility and liability on if the external previously available website or resource is available for use.  vCon also holds no responsibility and liability, and does not necessarily agree with any Contents, advertisements, products or other information exist or originated from any previously available website or resource.  You further agree that, vCon holds no responsibility and liability on any loss or damage incurred or allegedly incurred from / by / through using or believing or relying on any Contents, products or services exist or originated from any previously available website or resource.
            </p>

            <h3>Disclaimer</h3>

            <p className="text-justify">You clearly understand and agree:</p>

            <ol>
              <li>
                <p className="text-justify">
                  vCon performs / fulfils certain Services related obligations in accordance with this Terms and Conditions, but only limiting to providing related Services to you based on reasonable technique / skill / technology of and due care / caution by vCon.  This Terms and Conditions does not bear any content to exempt / waive or restrain vCon from any legal liability (causing dead or harm against any person) which should not be exempted / waived or restrained because of any negligence, fraud or other applicable legally not exempted / waived or restrained behaviors by vCon.
                </p>
              </li>

              <li>
                <p className="text-justify">
                  You bear any risk incurring from using the Services provided by vCon.  The Services provided by vCon are based on “as is”, “existing situation” and “previous data”.  Any valuation and related information are for reference only but they are not meant to be the actual and / or necessarily executed price.  vCon expressly state not providing any kind of expressed or implied guarantee, including but not limited to business / profit running applicability, applicability for any specific purpose and not intrusive against any right of any third party.
                </p>
              </li>

              <li>
                <p className="text-justify">
                  vCon does not guarantee i) the Services provided vCon meet your requirement / expectation; ii) the Services provided by vCon are, not interfered, timely, secured and reliable, or free from error / mistake; iii) the result(s) obtained from / through using the Services provided by vCon is accurate or reliable; iv) any product, service, understanding or any other information bought or acquired from / through the Services provided by vCon meets your expectation; and v) any error / mistake found in any application of or Services provided by vCon would be fixed.
                </p>
              </li>

              <li>
                <p className="text-justify">
                  It is your consideration for downloading or obtaining any data / information through / by using the Services provided by vCon and you should bear the risk.  You accept entire and sole responsibility and liability on any damage or loss of data / information in your computer system incurred by / from / through any download of data / information.
                </p>
              </li>

              <li>
                <p className="text-justify">
                  Any suggestion and information you acquired from / through vCon or the Services provided by vCon, regardless of written or verbal, would not constitute as any assurance / guarantee for any term or condition which is not expressly stated under this Terms and Conditions.
                </p>
              </li>

              <li>
                <p className="text-justify">
                  vCon does not guarantee the accuracy or reliability of any form of Contents, picture, advertisement and information.
                </p>
              </li>

              <li>
                <p className="text-justify">
                  Various pictures, information regarding used cars and other information shown by vCon for the purpose of providing the Services are for reference only.  vCon does not accept any responsibility and liability on any deviation (if any) between such pictures, information regarding used cars and other information shown AND the fact / reality.
                </p>
              </li>

              <li>
                <p className="text-justify">
                  vCon has the right but is not obligated to correct / rectify any error / mistake of any information.  vCon reserves all the rights of deleting, adding, revising and rejecting any Contents, declarations, features / functions and membership qualifications, without making any notification.
                </p>
              </li>

              <li>
                <p className="text-justify">
                  vCon has the right of recording any online information and behavior of any accessing person through internet.
                </p>
              </li>

              <li>
                <p className="text-justify">
                  vCon has the right of rejecting any user to access to and browse the website of vCon, and administering warning to any accessing person through internet.
                </p>
              </li>
            </ol>

            <h3>Limitation of responsibility and liability</h3>

            <p className="text-justify">
              You clearly understand and agree that vCon accepts no responsibility and liability of any direct, indirect, attached, special, derivative or penalized indemnification / compensation (despite vCon had been informed in prior of there would be possibility of any such indemnification / compensation) for any loss, including but not limited to profit, goodwill, usage, loss / damage of data / information or any other intangible loss, incurred by / from / through the following reasons: 1) use or unable use of the Services provided by vCon; 2) buying or acquiring any good / product, data, information or Services, or receiving any message, or cost of buying any good / product and Services incurred by / from / through any transaction executed, originating from or through the Services provided by vCon; 3) unauthorized access or change to your transmission or information; 4) any declaration or behavior by any third party in the Services provided by vCon; and 5) any other related matter or issue of the Services provided by vCon (except those expressly stated in other form(s) under this Terms and Conditions).
            </p>

            <h3>Exclusion and limitation</h3>

            <p className="text-justify">
              It is not allowed / permitted in some jurisdictions to exclude certain responsibilities of assurance and guarantee, or restrict or exclude any attached or derivative indemnification / compensation.  Therefore, certain restriction(s) under “Disclaimer” and “Limitation of responsibility and liability” may not be applicable to you.
            </p>

            <h3>Notification</h3>

            <p className="text-justify">
              Any notification would be generally made to you through announcement or short messaging.  The Services provided by vCon may also post / display notification or link to notification of any change in this Terms and Conditions or any other matter(s).  Nevertheless, vCon has the right of not informing you of any change.
            </p>

            <h3>Copyright and copyright agency</h3>

            <p className="text-justify">
              vCon respects intellectual property and design of others, and calls on all the users to respect others’ intellectual property.  If you consider your created product / design / article is remade and such remaking has constituted intrusion(s) against your created product / design / article, please provide the following information to vCon:
            </p>

            <ol>
              <li>
                <p className="text-justify">
                  electronic or real signature of any person(s) who is authorized to be the proxy of any interest of such product / design / article;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  description of such product / design / article being intruded, claimed by you;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  description of the whereabouts in the website of such product / design / article being intruded, claimed by you;
                </p>
              </li>

              <li>
                <p className="text-justify">
                  your address, telephone number and email address; and
                </p>
              </li>

              <li>
                <p className="text-justify">
                  declaration of confirming the accuracy of the above information and you are the copyright owner or the person who is authorized to be the proxy of the copyright owner to make such declaration, on the premise that you understand there would be possible consequence(s) if you provide false information or make false declaration.
                </p>
              </li>
            </ol>

            <h3>General clauses</h3>

            <p className="text-justify">
              [Full agreement] This Terms and Conditions constitutes as the full agreement between you and vCon regulating your use of the Services provided by vCon, and it supersedes any previous agreement between you and vCon regarding the Services provided by vCon.  When you are using or purchasing certain other Services provided by vCon, related Services, Contents provided by any third party or application / software provided by any third party, additional restriction(s) under other applicable terms and conditions may be applicable to you.
            </p>

            <p className="text-justify">
              [Governing laws and jurisdiction] This Terms and Conditions and the relationship between you and vCon are governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region (HKSAR).  You and vCon agree to be governed by the jurisdiction of HKSAR courts exclusively.
            </p>

            <p className="text-justify">
              [Continuous effectiveness of the Terms and Conditions] If any law court under any jurisdiction judiciary identifies any term or condition under this Terms and Conditions is invalid, involving parties still agree that such law court should spend its best effort to make the intention of the involving parties reflected from such invalid term or condition to be effective.  Other terms and conditions under this Terms and Conditions would remain in full force and effective.
            </p>

            <p className="text-justify">
              [Access right for non-survival and non-transferability] You agree that your vCon account is not transferable.  Your right of accessing to your account and any Contents in your account would be terminated when you are deceased.  If vCon becomes aware of passing away of any user, the account(s) of that user would be terminated.  The Contents in the account would be kept / maintained / stored, transferred, removed or disposed of by any other means which vCon considers feasible and practicable, depending on then situation or necessity.
            </p>

            <p className="text-justify">
              [This Terms and Conditions] The headings / titles in this Terms and Conditions are set out for convenience and should not be treated in force under any law or contract.
            </p>

            <h3>Breach of Terms and Conditions</h3>

            <p className="text-justify">
              Please inform us of any breach of this Terms and Conditions found (if any).
            </p>
          </div>
        )}

      </div>

    );
  }
}
