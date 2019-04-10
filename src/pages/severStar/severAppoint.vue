<template>
    <div id='severAppoint'>
     <div v-if="showFrom">
        <img src='./img/banner@2x.png' class='server_banner'/> 
        <div class='content'>
            <div class='term'>
                <img :src="headImgUrl" v-if="headimgShow" class='headImg'/>
                <img src='./img/head_img.png' class='headImg' v-else/> 
                <p class="term_top">财富师某某某会在<span style="color: #EF2727">3</span>个工作日内联系您。为您提供财富服务</p>
            </div>
            <div class='inpdiv'>
                <img src='./img/phone.png' class='inpIcon' />
                <input type='tel' class='inpTel'style='padding-right:100px;'maxlength='11' v-model="param.phone" ref='phone2' placeholder="请输入手机号" />
                <p class='warn' ref='warnPhone' v-show='true'>{{warnPhone}}</p>
             </div> <!--inpBox-->
             <div style="height: 1px;background:#eee;width:100%;"></div>
              <div class='inpdiv'>
                <img src='./img/message.png' class='messIcon' />
                <input type='tel' class='inpTel inpMess'  maxlength='4' v-model="param.verifiCode" ref='verifycode' placeholder="短信验证码"/>
                <p class='warn' ref='warnCode'v-show='true'>{{warnCode}}</p>
                <mt-button type="danger" size="small" class='sendCodeBtn' v-on:click.stop="getM" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> 
             <div style="height: 1px;background:#eee;width:100%;"></div>
             <div class="read_term">
                 <div @click="Select" class="read_sel">
                    <img src="./img/selsect.png" v-if="selimgShow" class='selimg'/>
                    <img src='./img/select2.png' class='selimg' v-else/> 
                 </div>
                 <p class="read_text">我已阅读<span @click="openxiyi" style="color: #EF2727">《大唐财富平台注册协议》</span></p>
             </div>
             <mt-button type="danger" size="large" class='sign' @click="toAppoint()">立即预约</mt-button>
        </div>
        <div class="getWill">
            <div class="get-top">
                <span class="redline"></span>
                <p class="get-toptxt">您将获得</p>
            </div>
            <div style="height: 1px;background:#eee;width:9.733333rem;margin-left: .266667rem; "></div>
            <ul class="get_ul">
                <li>
                    <img src="./img/siren.png" alt="">
                    <p>私人定制财富计划</p>
                </li>
                <li style="padding:0 .62rem">
                    <img src="./img/gelei.png" alt="">
                    <p>各类增值服务</p>
                </li>
                <li>
                    <img src="./img/huode.png" alt="">
                    <p>获得积分兑换更多好礼</p>
                </li>
            </ul>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue" v-on:warnCodeFunction="warnCodeFunction"></getcode>
      </div>
        <div class='xieyi' v-else>
			<div class='box'>
			<p><img src='./img/select2.png' class='closexieyi' @click="closeXieyi"/></p>
			<div class="clearfix"></div>
			<div class="title">用户注册协议</div>
			<p>大唐财富应用程序APP（以下简称“大唐财富APP”）是北京唐鼎耀华基金销售有限公司(以下称“唐鼎耀华”)旗下的投资平台。在注册前请认真阅读、充分理解本协议所有条款，一经注册即视为对本协议全部条款已充分理解并完全接受，依据本协议成为大唐财富APP用户（以下简称“用户”）并使本协议立即产生法律效力。</p>
			<p class="bigP">第一章 协议的签署和修订</p>
			<p>第一条 大唐财富APP注册用户应是年满18周岁，具有完全的民事权利能力和民事行为能力的自然人，且为满足《私募投资基金监督管理暂行办法》要求的合格投资者。</p>
			<p>第二条 本协议内容包括协议全部条款及大唐财富APP已经发布的或将来可能发布的与用户有关的各类规则，所有规则均为本协议不可分割的一部分，与本协议具有同等法律效力。</p>
			<p>第三条 本协议用户一经注册即视为充分理解并全部接受本协议的全部内容，并使本协议立即产生法律效力。为避免歧义，用户不得以未签署书面协议为由否认本协议的效力。</p>
			<p>第四条 注册大唐财富APP的用户必须承诺遵守中国的各项法律规定，任何违反法律规定的行为导致的一切法律后果，由用户个人以自己的名义独立承担所有相应的法律责任。</p>
			<p>第五条 唐鼎耀华有权根据需要修改本协议或根据本协议制定、修改各类具体规则。如有任何变更，唐鼎耀华将发布公告，无需另行单独通知用户。用户在本协议及具体规则内容公告变更后继续使用本服务的，视为用户已充分阅读、理解并接受修改后的协议和具体规则内容，并接受修改后的协议和具体规则的约束。若用户不同意修改后的协议内容，应自行停止使用大唐财富APP的服务。</p>
			<p>第六条 唐鼎耀华可向其关联方转让本协议项下的全部或部分权利和义务；未经唐鼎耀华同意，用户不得转让其在本协议项下的任何权利和义务。</p>
			<p>第七条 本协议不涉及用户与用户之间的法律关系与纠纷。</p>
			<p class="bigP">第二章 服务的提供</p>
			<p>第八条 用户使用大唐财富APP的服务应直接登录唐鼎耀华官方网站或大唐财富APP，请勿通过邮件或其他网站提供的链接登录。用户拨打唐鼎耀华客服电话应以唐鼎耀华网站公布的客服电话号码为准，请勿拨打其他电话。</p>
			<p>第九条 经注册成为大唐财富APP的用户后，将生成用户的个人账户，该账户将记录用户在大唐财富APP上的所有活动，该账户是用户登录大唐财富APP的唯一账户，用户通过账户进行的一切行为均视作用户本人真实、自愿的行为。用户应妥善保管自己的账号及密码等账户信息，用户不得以账户信息被盗或其他理由否认行为的效力或不履行相关义务。</p>
			<p>第十条 大唐财富APP将向符合条件的用户提供服务：（1）大唐财富APP提供的服务包括但不限于：投资交易信息发布、提供投资交易管理服务、提供客服服务，具体详情以大唐财富APP届时提供的服务内容为准；（2）大唐财富APP提供的各种投资信息及资料仅为参考，用户应独立判断、自行决策，用户进行的交易所产生的风险由用户自行承担，唐鼎耀华不承担任何的法律责任；（3）唐鼎耀华对在大唐财富APP上进行的投资交易行为不承担任何责任，唐鼎耀华无法也没有义务保证用户能够实际投资成功，用户因前述原因导致的损失（包括但不限于投资收益、手续费、投资本金等）由用户自行承担，唐鼎耀华不承担任何责任；（4）因用户自身的原因导致大唐财富APP无法提供服务或提供服务时发生任何错误而产生的任何损失或责任，由用户自行负责，唐鼎耀华不承担任何责任。</p>
			<p>第十一条 基于运行和交易安全的需要，唐鼎耀华可以暂时停止提供、限制或改变大唐财富APP服务的部分功能，或提供新的功能。在任何功能减少、增加或者变化时，用户继续使用大唐财富APP服务的行为，视为用户同意本协议或者变更后的协议。</p>
			<p>第十二条 用户在大唐财富APP上按服务流程所确认的交易状态将成为用户本人进行相关交易或操作（包括但不限于支取款项、冻结资金、订立合同等）不可撤销的指令。大唐财富APP有权按相关指令依据本协议和有关规则对相关事项进行处理。</p>
			<p class="bigP">第三章 交易管理及费用</p>
			<p>第十三条 经成功注册后，用户可根据大唐财富APP上有关规则和说明确认签署有关协议，并经审核通过后实现投资交易。详细操作规则及方式请见有关协议及大唐财富APP相关页面的规则和说明。</p>
			<p>第十四条 唐鼎耀华将为用户的投资交易提供平台中介服务，并在服务过程中根据本协议或大唐财富APP页面的相关规则、说明等收取必要的服务费或手续费，其具体内容、比例、金额等事项请参见相关协议及大唐财富APP相关页面的规则和说明。唐鼎耀华有权调整前述服务费或手续费的类型或金额等具体事项并根据本协议和相关规则进行公告、修改。</p>
			<p class="bigP">第四章 资金管理</p>
			<p>第十五条 就用户在大唐财富APP进行的投资交易，由大唐财富APP合作的第三方机构提供“资金管理服务”，包括但不限于：银行卡认证、资金的充值、提现、代收、代付、查询等，具体详情以唐鼎耀华及第三方机构当时提供的服务内容为准。</p>
			<p>第十六条 上述充值、提现、代收、代付以及查询等服务涉及唐鼎耀华与第三方支付机构或金融机构的合作，因此：（1）受第三方机构进行资金代扣及划转行为的限制，唐鼎耀华不对前述服务的资金到账时间做任何承诺，也不承担与此相关的责任，包括但不限于由此产生的利息、货币贬值等损失；（2）一经用户使用前述服务，即表示用户不可撤销地授权唐鼎耀华或第三方机构进行相关操作，且该等操作是不可逆转的，用户不能以任何理由拒绝付款或要求取消交易；（3）用户在使用大唐财富APP服务过程中可能需要向第三方机构支付一定的费用，具体收费标准详见第三方机构网站相关页面，或大唐财富APP的提示；（4）在任何情况下，涉及由第三方机构提供相关服务的责任由该第三方机构承担，唐鼎耀华不承担任何责任。</p>
			<p>第十七条 用户承诺资金来源合法，唐鼎耀华及第三方机构有权按照包括但不限于司法机关、行政机关等的要求协助对用户账户及资金等进行查询、冻结或扣划等操作。</p>
			<p>第十八条 唐鼎耀华通过大唐财富APP有权基于交易安全等方面的考虑设定涉及交易的相关事项，包括但不限于交易限额、交易次数等，具体详情以大唐财富APP当时提供的服务内容为准。</p>
			<p>第十九条 如果唐鼎耀华发现了因系统故障或其他原因导致的处理错误，基于用户或唐鼎耀华的利益，本平台有权在根据本协议规定通知后纠正该错误。如果该错误导致用户实际收到的金额少于用户应获得的金额，则唐鼎耀华在确认该处理错误后会尽快协调第三方将应收金额与实收金额之间的差额存入用户账户；如果该错误导致实际收到的金额多于应获得的金额，用户应及时根据唐鼎耀华发出的有关纠正错误的通知的具体要求返还多收的款项或进行其他操作。因前述处理错误而多付或少付的款项均不计利息。</p>
			<p class="bigP">第五章 电子合同</p>
			<p>第二十条 在大唐财富APP进行交易而订立电子合同形式的协议，可以为一份或多份形式并且每一份具有同等法律效力。用户根据本协议及大唐财富APP上的相关规则在大唐财富APP确认签署的电子合同即视为用户本人自愿签署的合同，具有法律效力。</p>
			<p>第二十一条 用户根据本协议以及大唐财富APP的相关规则签署电子合同后，不得擅自修改该合同。大唐财富APP为用户提供相关电子合同的保管、查询、核对等服务，如对电子合同真伪或电子合同的内容有疑问，用户可通过大唐财富APP查阅有关合同并进行核对。如对相关合同内容有任何争议，应以大唐财富APP记录的合同为准。</p>
			<p class="bigP">第六章 用户信息及隐私权保护</p>
			<p>第二十二条 用户在注册时应提供真实、完整、有效的资料，并保证资料的安全性和及时更新。唐鼎耀华根据用户提供的资料无法与用户取得及时、有效的联系而导致用户在使用大唐财富APP服务的过程中遭受任何损失或增加任何费用等不利后果均由用户自行完全承担。</p>
			<p>第二十三条 唐鼎耀华可使用自公开及私人资料来源收集用户的额外资料，以更好地了解用户，并为其度身订造大唐财富的服务、解决争议和确保在大唐财富APP进行交易的安全性。唐鼎耀华仅收集唐鼎耀华认为就此目的及达成该目的所必须的关于用户的个人资料。</p>
			<p>第二十四条 唐鼎耀华可以自行或通过合作的第三方机构对用户提交或唐鼎耀华搜集的用户信息（包括但不限于用户的个人身份证信息等）进行核实，并对获得的核实结果根据本协议及有关文件进行查看、使用和留存等操作。</p>
			<p>第二十五条 唐鼎耀华可以按照用户在大唐财富上的行为自动追踪用户的其他资料。唐鼎耀华可以利用前述资料进行有关大唐财富APP用户的人口统计、兴趣及行为的内部研究，以更好地了解用户和向用户提供更好的服务。在不透露用户隐私的前提下，唐鼎耀华可以对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
			<p>第二十六条 唐鼎耀华在大唐财富应用程序APP或网站的某些网页上使用诸如“Cookies”的资料收集装置，以协助唐鼎耀华为客户提供度身订造的服务。唐鼎耀华提供的某些服务只能通过使用“Cookies”实现。</p>
			<p>第二十七条 唐鼎耀华可使用关于用户的个人资料（包括但不限于大唐财富APP持有的用户档案中的资料，及唐鼎耀华从用户在大唐财富APP上的活动所获取的其他资料）以解决争议、对纠纷进行调停、确保在大唐财富APP进行安全交易，并执行服务协议及相关规则。</p>
			<p>第二十八条 为限制在大唐财富APP上的欺诈、非法或其他刑事犯罪活动，唐鼎耀华可通过人工或自动程序对用户资料进行评价。</p>
			<p>第二十九条 唐鼎耀华可以使用用户资料以改进推广和促销工作、改善唐鼎耀华的内容和产品推广形式，并使大唐财富APP的内容、设计和服务更能符合用户的要求。唐鼎耀华可以利用用户资料与用户联络并传递用户可能感兴趣的信息。</p>
			<p>第三十条 唐鼎耀华对于用户提供的、自行收集到的、经认证的个人信息将按照本协议及有关规则予以保护、使用或者披露。唐鼎耀华将采用行业标准惯例以保护用户的个人资料，但鉴于技术限制，唐鼎耀华不能确保用户的全部私人通讯及其他个人资料不会通过本协议中未列明的途径泄露出去。</p>
			<p>第三十一条 唐鼎耀华有义务根据有关法律要求向司法机关和政府部门提供用户的个人资料。唐鼎耀华有权根据自己的判断、有关协议和规则、国家生效裁决文书或者与该笔交易有关的其他用户的合理请求披露相关用户的个人资料（包括但不限于在唐鼎耀华及互联网络上公布该用户的违法、违约行为，并将该内容记入任何与该用户相关的信用资料、档案或数据库），唐鼎耀华的前述披露不违反本协议及相关规则的隐私保护条款。</p>
			<p class="bigP">第七章 风险提示</p>
			<p>第三十二条 任何通过大唐财富APP进行的交易不能避免以下风险的产生，唐鼎耀华无法也没有义务对此承担责任：（1）宏观经济风险：因宏观经济形势变化，可能引起价格等方面的异常波动，用户有可能遭受损失；（2）政策风险：有关法律、法规及相关政策、规则发生变化，可能引起价格等方面异常波动，用户有可能遭受损失；（3）违约风险：因其他交易方无力或无意愿按时足额履约，用户有可能遭受损失；（4）利率风险：市场利率变化可能对购买或持有产品的实际收益产生影响；（5）唐鼎耀华或者涉及的第三方网站的设备系统存在缺陷、遭到黑客攻击、网络故障、电力中断、计算机病毒以及其他不可抗力因素导致的风险；（6）因用户的过错导致的任何损失，该过错包括但不限于：决策失误、操作不当、遗忘或泄露密码、密码被他人破解、用户使用的计算机、手机等其它系统被第三方侵入、用户委托他人代理交易时他人恶意或不当操作而造成的损失。</p>
			<p>第三十三条 唐鼎耀华对用户发布的信息仅进行形式审核，不绝对用户发布的信息内容的真实性、充分性、及时性、可靠性、完整性和有效性，免除任何由此引起的法律责任。唐鼎耀华及其股东、创建人、高级职员、代理人、关联公司、母公司、子公司和工作人员不对任何用户或任何交易提供任何担保或条件，不以任何明示、默示或其他法定方式对用户使用大唐财富APP服务而产生的任何形式的直接或间接损失承担法律责任，包括但不限于资金损失、利润损失、营业中断损失等。</p>
			<p>第三十四条 唐鼎耀华无法也没有义务保证第三方网站上的信息的真实性和有效性。用户应按照第三方网站的服务协议使用第三方网站。第三方网站的内容、产品、广告和其他任何信息均由用户自行判断并承担风险。</p>
			<p>第三十五条 以上条款并不能揭示用户通过大唐财富APP进行交易的全部风险及市场的全部情形。用户在做出交易决策前，应全面了解相关交易，谨慎决策，并自行承担全部风险。</p>
			<p class="bigP">第八章 使用限制</p>
			<p>第三十六条 用户应合法使用大唐财富APP提供的服务及平台上的内容，不得在大唐财富APP从事任何可能违反中国的法律、法规、规章和政府规范性文件的行为或者任何未经授权的行为，不得利用大唐财富APP的服务从事侵害他人合法权益的行为。</p>
			<p>第三十七条 唐鼎耀华有权根据法律、法规、政府要求透露、修改或者删除必要的信息，以便更好地运营大唐财富APP并保护自身及大唐财富APP其他合法用户的合法权益。</p>
			<p>第三十八条 大唐财富APP平台上的全部内容的版权均属于唐鼎耀华所有，包括但不限于文本、数据、文章、设计及其他全部信息。未经唐鼎耀华事先书面同意，用户不得以任何方式、任何形式复制、模仿、传播、公布、展示平台内容。</p>
			<p>第三十九条 用户违反本协议或任何法律、法规或侵害第三方的权利，相关的法律责任由用户全部自行承担。</p>
			<p class="bigP">第九章 协议终止及账户的暂停、注销或终止</p>
			<p>第四十条 唐鼎耀华有权终止本协议，用户有权申请唐鼎耀华终止本协议。在用户违反本协议、相关规则的情况下，或在相关法律法规、政府部门的要求下，唐鼎耀华有权通过站内信、电子邮件通知等方式终止本协议、关闭用户账户或者限制用户使用大唐财富APP。但用户依据本协议或在大唐财富产生其他协议、规则下的还未履行完毕的义务仍然有效。</p>
			<p>第四十一条 用户发现有第三人冒用或盗用其用户账户及密码，或其他任何未经合法授权的情形，应立即以有效书面方式通知唐鼎耀华，要求唐鼎耀华在合理期限内暂停相关服务。在此之前，唐鼎耀华对第三人使用该服务所导致的损失不承担任何责任；唐鼎耀华对因用户未及时、有效通知造成的一切后果不承担任何责任。</p>
			<p>第四十二条 用户不再使用账户时，应首先清偿所有应付款项（包括但不限于投资本金、利息、罚息、违约金、服务费、管理费等），再将账户中的可用款项（如有）全部提现或者向大唐财富APP发出其它合法的支付指令，并向大唐财富APP申请注销该账户，经大唐财富APP审核同意后可正式注销用户账户。</p>
			<p>第四十三条 唐鼎耀华有权基于单方独立判断，在认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止向用户提供本协议项下的全部或部分服务，而无需就此对相关用户或任何第三方承担任何责任。前述情形包括但不限于：（1）用户提供的个人资料不具有真实性、有效性或完整性；（2）存在异常交易或有疑义或有违法情形时；（3）用户的账户涉嫌洗钱、套现、传销、被冒用或其他唐鼎耀华认为有风险的情形；（4）用户违反本协议中规定的各类规则。</p>
			<p>第四十四条 唐鼎耀华P终止提供用户账户服务时，可以立即暂停、关闭或删除用户账户及该用户账户中的所有相关资料及档案，并将用户滞留在这些账户的全部合法资金退回到用户的银行账户。用户账户的暂停、中断或终止不代表用户责任的终止，用户仍应对在使用大唐财富APP服务期间的行为承担可能的违约或损害赔偿责任，同时唐鼎耀华可继续保留用户的相关信息。</p>
			<p class="bigP">第十章 通知</p>
			<p>第四十五条 本协议项下的通知如以公示方式作出，一经在大唐财富APP公示即视为已经送达。除此之外，其他向用户个人发布的具有专属性的通知将由唐鼎耀华以下列方式中的一种或几种向用户发送：（1）用户在注册时或注册后变更用户信息时向大唐财富APP提供的手机号码；（2）用户个人账户中的消息系统；（3）用户在注册后在大唐财富APP绑定的电子邮箱。通知一经发送即视为送达，请用户密切关注手机短信、系统消息、电子邮件。</p>
			<p>第四十六条 唐鼎耀华出于向用户提供服务之目的，可以向用户的手机、消息系统和电子邮箱发送有关通知或提醒；若用户不愿意接收，可在相应系统板块进行设置，用户设置了不接收有关通知或提醒，则可能收不到该等通知信息。用户不得以未收到或未阅读该等通知信息主张相关通知未送达。</p>
			<p class="bigP">第十一章 其他</p>
			<p>第四十七条本协议及大唐财富APP有关页面的相关名词可互相引用参照，如有不同理解，则以本协议条款为准。若本协议的部分条款被认定为无效或者无法执行时，本协议中的其他条款的有效性及可执行性不受影响。</p>
			<p>第四十八条 因火灾、自然灾害、意外事件、政府行为、物资或供应短缺或任何其它不可控制的不可抗力事件，导致本协议任何一方无法履行义务，不构成本协议项下的违约。</p>
			<p>第四十九条 本协议的签署、履行适用中国法律，并据之解释。</p>
			<p>第五十条 因本协议引起的或与其有关的任何争议，各方应友好协商解决；若协商不成，应向北京唐鼎耀华基金销售有限公司所在地有管辖权的人民法院提起诉讼。</p>
			
			
		</div>
		</div>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Field } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import getcode from '../wealth/getcode';
import axios from 'axios'
import { isValidMobile, isValidxincode, isValidverifycode } from '@/common/js/extends.js'
import merge from 'webpack-merge'
export default {
    name:'severAppoint',
    data:function(){
        return{
            shareLink:'',
            ghT:'',//对方财富师工号
            busNameT:'',//对方财富师姓名
            photo:'',
            messType:'3',
            text:'获取',
            Dsiabled:false,
            warnPhone:'',
            warnCode:'',
            headImgUrl:'',
            headimgShow:true,
            selimgShow:true,
            showFrom:true,
            gh:'',
            gongH:'',
            isShow:false,
            isDisabled: false,
            isDisabled2: false,
            isDisabled3: false,
            isValid: false,
            isValid2: false,
            isValid3: false,
            warnShow: false,
            isFaceSuc:'0',//是否人脸识别成功
            param:{
                phone: '',
                verifiCode:'',
            },
            user:{
                userId: "",
                osFlag: 3
            },
            backUrl: encodeURIComponent(location.href.split('#')[0]),//微信分享
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=getUserInfo'),//接口
            paramurl: location.href.split('?')[0],
        }
    },
    methods:{
        Select:function(){
            this.selimgShow = !this.selimgShow
        },
        openxiyi:function(){
           this.showFrom = false
        },
        closeXieyi:function(){
            this.showFrom = true
        },
        changeCount:function(e){
            //若是由点击引起的焦点改变，捕获点击了的元素
            var ele =  e.relatedTarget
            console.log(ele)
            if(ele == null){
                window.scroll(0,0);
            }  
        },
        getData:function(){
            let that = this;
            //console.log(that.param)
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取客户信息
                params: {
                    scope: 'snsapi_userinfo',
                    backUrl: that.paramurl
                }
            })
            .then(function(res) {//成功之后
               console.log(res.data)
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode==0){
                    console.log(res.data.userInfo)
                    console.log(res.data.userInfo.isNewRecord)
                    that.isFaceSuc=res.data.userInfo.authenticFlag;//实名状态
                    if(!res.data.userInfo.phone == false){
                        that.userPhone = res.data.userInfo.phone
                    }else{
                         that.yanzhengmaIsShow=true;//显示验证码
                    }
                    if(!res.data.userInfo.realName == false){
                        that.param.realName = res.data.userInfo.realName
                        that.idNo= res.data.userInfo.idNo
                        that.isDisabled = true
                    }
                    
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severAppoint_'+that.ghT+'#wechat_redirect';
            }
                else{
                    MessageBox(' ',retMsg);
                }
            });
        },
        getPhoto:function(){ 
            let that = this;
            Indicator.open();
            var param=Base64.encode('{"userId":"'+that.ghT+'"}');//that.user.userId
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=getTCmycard&versionNo=30',//获取客户信息
                params:{
                    param:param,
                    osFlag:'3'
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode == 0){
                  //  var data=Base64.decode(res.data);
                   // data=jQuery.parseJSON(data);
                    that.photo = data.photo;
                    var data=res.data
                    that.ghT=data.userId;
                    that.busNameT = data.userName; //对方财富师的名字
                    that.param.businessName = data.userName
                    if(!that.photo==false){
                        that.headImgUrl = that.photo
                    }else{
                        that.headimgShow=false;
                    }
                }else if(retCode == "-2"){
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },
        phoneFn:function(){
            if(this.userPhone == ''){
                this.param.phone = this.phone2 
            }else{
                this.param.phone = this.userPhone
            }
            if(!isValidMobile(this.param.phone)){
                this.$refs.warnPhone.style.display='block';
                this.warnPhone='请输入正确的手机号';
              //  this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid = false;
               return false;
            }else{
                this.$refs.warnPhone.style.display='none';
               
               // this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
                this.isValid = true
                return true;
            } 
        },//验证手机号
        getM:function(){
            this.Dsiabled = true;//禁止点击
            if(this.phoneFn()){
               this.Dsiabled = true
            }else{
                this.Dsiabled = false//放开
               // alert(this.Dsiabled+'1');
                return;
            }

            if(this.userPhone == ''){
                this.param.phone == this.phone2 
            }else{
                this.param.phone = this.userPhone
            }
            this.trafficStatistics('004')//自定义埋点获取验证码
            this.$refs.c1.getCodeFn(this.messType,this.param.phone);
        },
        warnCodeFunction:function(warn){
             this.warnPhone=warn;
              if(this.warnPhone!=''){
               this.$refs.warnPhone.style.display='block';
             // this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
           }else{
               this.$refs.warnPhone.style.display='none';
             // this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
           }
        },
         childByValue:function(v){
            if(v.time!='重新发送'&&v.time!='获取验证码'){
                this.text=v.time+'s';
            }else if(v.time==NaN||v.time==undefined||v.time=='NANs' || v.time=='NAN'){
                this.text='重新发送';
            }else{
                this.text=v.time
            }
           this.Dsiabled=v.btnDsiabled;
          return
           
           // console.log(this.Dsiabled);
        },
        codeFn:function(){
            if(!isValidverifycode(this.param.verifiCode)){
                this.$refs.warnCode.style.display='block';
                this.warnCode='请输入正确的验证码';
                //this.$refs.verifycode.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid2 = false
                this.Dsiabled=false;
            }else{
                this.$refs.warnCode.style.display='none';
                //this.$refs.verifycode.style='border-bottom:0.5px solid #efefef!important';
                this.isValid2 = true
            }
        },
        toAppoint:function(){
            let that = this;
            console.log(that.param)
            Indicator.open();
            axios({
                    method:'get',
                  //  url:'/wxservice/wxservice?opName=toSignUp',
                    params: {
                        param:that.param,//系统类别
                    }
                })
                .then(function(res) {//成功之后
                    console.log(res)
                    Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    that.Dsiabled=false;
                    if(retCode== 1){
                        MessageBox(' ','验证码错误');
                    }else if(retCode== -1){
                       // MessageBox(' ','系统异常');
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });   
                    }else if(retCode== -2){
                        MessageBox(' ','绑定手机号出错');
                    }else if(retCode== 6){
                        MessageBox('','您已经报过名');
                    }else if(retCode == 0){ 
                        that.$router.push({
                            path: '/signSuc',//
                            name: 'signSuc',
                            query:{
                                isReviewSignup:that.param.isReviewSignup,
                                activeId:that.param.activeId,
                                actName:encodeURIComponent(that.param.actName),
                                beginTime:that.beginTime,
                                location :encodeURIComponent(that.location),
                            }
                        })
                    }
                    // Indicator.close();
                });
        },
        Share:function(mygh) {
            //var shareData = '?ghT='+this.$route.query.ghT+'&isReviewSignup='+this.param.isReviewSignup+'&activityType='+this.param.activityType+'&activeId='+this.param.activeId+'&actName='+encodeURIComponent(this.param.actName)+'&beginTime='+this.beginTime+'&location='+encodeURIComponent(this.location)+'&busNameT='+encodeURIComponent(this.param.businessName);
            var shareData = '?ghT='+mygh+'&isReviewSignup='+this.param.isReviewSignup+'&activityType='+this.param.activityType+'&activeId='+this.param.activeId+'&actName='+encodeURIComponent(this.param.actName)+'&beginTime='+this.beginTime+'&location='+encodeURIComponent(this.location);
            let ua = navigator.userAgent.toLowerCase();
            //android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
            if(false) {//isWeixinBrowser()//判断是不是微信
                
            }else{
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                //ios
                //this.ShowPop = !this.ShowPop;
                //this.ShowDark = !this.ShowDark;
                this.shareLink = this.Host+'weixin-h5/static/html/redirect.html?app3Redirect=' + encodeURIComponent(location.href.split('?')[0]+shareData)
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //android
                this.shareLink = window.location.href+'&ghT='+mygh
                //this.shareLink = encodeURIComponent(location.href.split('?')[0]+shareData)
                //this.shareLink = location.href.split('?')[0]+shareData
            }
            }
    
        },
        async asyncSDKConifg (actName,businessName) {
            let that = this
            axios.get('/wxservice/core/getJSSDKConfigure.mm?pageUrl='+that.backUrl)
                .then(function (res) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature, // 必填，签名
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
                })
                wx.ready(function() { //通过ready接口处理成功验证
                   // console.log(businessName)
            // config信息验证成功后会执行ready方法
                wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
                    title: actName, // 分享标题
                    desc: businessName, // 分享描述
                   // link: window.location.href, // 分享链接
                    link: that.shareLink,
                    imgUrl: 'http://file0.datangwealth.com/g1/M00/16/50/rBAeX1ybKCiAEKkxAADvNDguF4c858.png?filename=share.png', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        //alert('成功');
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        //alert('用户取消分享');
                    }
                    });
                    wx.onMenuShareTimeline({ //分享朋友圈
                    title: actName, // 分享标题
                    desc: businessName, // 分享描述
                    link: that.shareLink,
                    imgUrl: 'http://file0.datangwealth.com/g1/M00/16/50/rBAeX1ybKCiAEKkxAADvNDguF4c858.png?filename=share.png', // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
                // end
            })
            wx.error(function(res){//通过error接口处理失败验证
                // config信息验证失败会执行error函数
            });
        }
    },
    created(){                   
        Indicator.open();
        if(!this.$route.query.actId==false){ //重定向后
            var wxstr =this.$route.query.actId
            this.ghT=wxstr.split(",")[0];
            
        }else{
            this.ghT=this.$route.query.userId
           
        }
        this.getPhoto()
    },
    components:{Button,getcode,Field}//使用mint-ui的button的组件
}
</script>
<style>
#severAppoint .sendCodeBtn{
     position:absolute;
     right:10px;
     top: .61rem;
     width: 1.12rem!important;
     margin-top:0;
     height: .533333rem!important;
     font-size: .266667rem!important;
     padding: 0;
 }
 .headImg{
     width: 1.173333rem;
     height: 1.2rem;
     float: left;
     display: block;
 }
 .sign{
     width:90%;
     margin-top: .8rem;
 }
#severAppoint .content{
    padding: .8rem .72rem .746667rem .746667rem;
    border-bottom: .266667rem solid #F9F9F9;
}
#severAppoint .warn{
    top: 63px!important;
}
.term{
    overflow: hidden;
    margin-bottom: .3rem;
}
.term_top{
    width: 7rem;
    float: left;
    font-size: .373333rem;
    color: #6A6A6A;
    line-height: .533333rem;
    text-align: left;
    padding: .1rem 0 0 .32rem;
}
.server_banner{
    width: 100%;
    height: 2.933333rem;
    border-bottom: .266667rem solid #F9F9F9;
}
.inpdiv{
    /* overflow: hidden; */
    height: 1.6rem;
    position: relative;
    padding-top: .27rem;
}
.inpIcon{
    float: left;
    width: .32rem;
    height: .48rem;
    margin: .41rem 0 0 .213333rem;
}
.messIcon{
    float: left;
    width: .386667rem;
    height: .426667rem;
    margin: .41rem 0 0 .213333rem;
}
.inpTel{
    color: #999999;
    font-size: .373333rem;
    padding-top: .38rem;
    float: left;
    padding-left: .293333rem;
    outline: 0;
}
.read_term{
    overflow: hidden;
    margin-top: .586667rem;
}
.read_text{
    color: #636363;
    font-size: .346667rem;
    float: left;
    padding: .076rem 0 0 .16rem;
}
.read_sel{
    float: left;
}
.read_sel img{
    width: .426667rem;
}
.get-top{
    overflow: hidden;
    padding: .4rem 0 .333333rem .426667rem;
}
.redline{
    width: .106667rem;
    height: .426667rem;
    background:rgba(241,42,42,1);
    border: .026667rem solid rgba(241,42,42,1);
    border-radius: .053333rem;
    float: left;
}
.get-toptxt{
    float: left;
    color: #2A2A2A;
    font-size: .373333rem;
    line-height: .486667rem;
    font-weight: 600;
    padding-left: .24rem;
}
.get_ul{
    overflow: hidden;
    padding: .533333rem;
}
.get_ul li{
    float: left;
}
.get_ul li img{
    width: 1.28rem;
}
.get_ul li p{
    color:#5A5A5A;
    font-size: .32rem;
    padding-top: .32rem;
}
.xieyi{
	width:100%;
	/* height:10rem; */
	/* overflow: scroll; */
	font-size: 14px;
	color:#333;
	line-height: 24px;
	background-color: #f9f9f9;
    padding: 46px 20px 16px;
    box-sizing: border-box;
	padding-bottom: 50px;
	position: absolute;
	top:-2%;
	left:0; 
}
.xieyi p{
    text-indent: 2em;
    text-align: justify;
}
.box{
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 0px 5px 5px rgba(100,100,100,0.1);
    padding:0px 15px 5px;
}
.box .title{
    font-size: 0.36rem;
    color:#B70005;
    text-align: center;
    margin-bottom: 20px;
}
.bigP{
    margin-top: 20px;
    font-weight: 700;
}
.closexieyi{
    padding-left: 6.3rem;
}
</style>
