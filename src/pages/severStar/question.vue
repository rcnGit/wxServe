<template>
  <div class="question">
    <p class="Q_ques">1、您的专属理财经理对于理财相关的金融、法律、政策等专业知识掌握。</p>
    <div class="star-phone" @click.stop="clickRating">
      <div
        v-for="(item, index) in starNum"
        :key="index"
        :class="isRating(index)"
        :data-index="index"></div>
    </div><span class="star-text">{{rating}}星</span>
    <div style="width: 9.493333rem;height: 0.026667rem;background: #f6f6f6;margin-bottom: 0.5rem;margin-left: .50666rem;"></div>
    <p class="Q_ques">2、您的专属理财经理熟悉本公司产品，并且可以有针对性的为您推荐适合您的理财产品。</p>
    <div class="star-phone" @click.stop="clickRating2">
      <div
        v-for="(item, index) in starNum"
        :key="index"
        :class="isRating2(index)"
        :data-index="index"></div>
    </div> <span class="star-text">{{rating2}}星</span>
    <div style="width: 9.493333rem;height: 0.026667rem;background: #f6f6f6;margin-bottom: 0.5rem;margin-left: .50666rem;"></div>
    <p class="Q_ques">3、您的理财经理态度积极友好，主动为您提供产品的投后信息，公司相关信息传达的及时性等。</p>
    <div class="star-phone" @click.stop="clickRating3">
      <div
        v-for="(item, index) in starNum"
        :key="index"
        :class="isRating3(index)"
        :data-index="index"></div>
        
    </div><span class="star-text">{{rating3}}星</span>
    <div style="width: 9.493333rem;height: 0.026667rem;background: #f6f6f6;margin-bottom: 0.5rem;margin-left: .50666rem;"></div>
    <p class="Q_ques">4、您的理财经理注重倾听您的意见并能及时帮您反馈解决。</p>
    <div class="star-phone" @click.stop="clickRating4">
      <div
        v-for="(item, index) in starNum"
        :key="index"
        :class="isRating4(index)"
        :data-index="index"></div>
        
    </div><span class="star-text">{{rating4}}星</span>
    <div style="width: 9.493333rem;height: 0.026667rem;background: #f6f6f6;margin-bottom: 0.5rem;margin-left: .50666rem;"></div>
    <div>
      <p class="Q_ques" style="margin-bottom: .13rem;">5、请选择以下符合你财富师的标签（可多选）</p>
      <div class="card_term">
       <p v-for="(item, index) in card" class="card" @click="selectCard($event,index)" :index="item.dictValue" :class="item.flag?'active':''">{{item.dictValue}}</p>
     </div>
    </div>
    <div class="btn_bottom2" style="display: block;">
			<span class="buttons1" @click='submits'>提交并点亮服务之星{{businessName}}</span>
    </div>
    <div class="shade" v-show="isShareshow" @touchmove.prevent.stop>
      <img src='./img/point.png' class="point">
      <p class="shade-text">点击此处发送给朋友<br>或分享到朋友圈</p>
      <p class="shade-btn" @click='kown_btn'>我知道了</p>
    </div>
    <div class="shade" v-show="isSharesuccess">
        <img src='./img/light.png' class="light">
        <p class="share-text">您已为财富师{{businessName}}<span style="color:#ffdf80;">点亮服务之星</span></p>
        <p class="share-btn" @click='jumpSever'>我知道了</p>
    </div>
  </div>
</template>

<!-- <script type="text/ecmascript-6"> -->
<script >
import wx from 'weixin-js-sdk';
import axios from 'axios'
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { getCookie,setCookie } from '@/common/js/cookie.js'
export default {
  props: {
    starNum: {
      // 星星的个数
      type: Number,
      default: 5,
    },
    defaultRating: {
      // 默认点亮的个数
      type: Number,
      default: 0,
    },
    outIndex: {
      // 外界传进来的一个标识
      type: Number,
      default: 0,
    },
    readOnly: {
      // 是否是只读，默认不是，拥有点击功能
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      isShareshow: false,
      isSharesuccess: false,
      businessName:'',
      userId:'',
      idNo:'',
      isCard:'',
      tag:'',
      arr: [],
      ratArr: [],
      shareText:'',
      shareDesc:'',  
      backUrl: encodeURIComponent(location.href.split('#')[0]),//微信分享
      rating: this.defaultRating, // 用于控制点亮星星的个数
      rating2: this.defaultRating, // 用于控制点亮星星的个数
      rating3: this.defaultRating, // 用于控制点亮星星的个数
      rating4: this.defaultRating, // 用于控制点亮星星的个数
      card: [],
      lables: [],
      appStr:{
        title:'大唐财富点亮服务之星',
        msg:'',
        shareUrl:'',
        type: false,//文案是否可编辑 true：可编辑，false：不可编辑
        isNeedNotice:true //分享完成后是否需要通知H5：true：需要，false：不需要
      },
      tgUserId:'',
      userCard:{
        userId:'',
        idNo:''
      }
    }
  },
  methods: {
    isRating (index) {
      ++index
      return index <= this.rating ? 'star-item star-active' : 'star-item'    
    },
    isRating2 (index) {
      ++index
      return index <= this.rating2 ? 'star-item star-active' : 'star-item'    
    },
    isRating3 (index) {
      ++index
      return index <= this.rating3 ? 'star-item star-active' : 'star-item'    
    },
    isRating4 (index) {
      ++index
      return index <= this.rating4 ? 'star-item star-active' : 'star-item'
      
    },
    clickRating (ev) {
      if (this.readOnly) {
        return
      }

      let mark = parseInt(ev.target.dataset.index) + 1
      this.rating = mark
      this.$emit('starMarkChange', mark, this.outIndex)
      console.log(this.rating)
      localStorage.setItem("rating",this.rating);
      localStorage.setItem("userId",this.userId);
      localStorage.setItem("idNo",this.idNo);
    },
    clickRating2 (ev) {
      if (this.readOnly) {
        return
      }
      let mark = parseInt(ev.target.dataset.index) + 1
      this.rating2 = mark
      this.$emit('starMarkChange', mark, this.outIndex)
      console.log(this.rating2)
      localStorage.setItem("rating2",this.rating2);
      localStorage.setItem("userId",this.userId);
      localStorage.setItem("idNo",this.idNo);
    },
    clickRating3 (ev) {
      if (this.readOnly) {
        return
      }

      let mark = parseInt(ev.target.dataset.index) + 1
      this.rating3 = mark
      this.$emit('starMarkChange', mark, this.outIndex)
      console.log(this.rating3)
      localStorage.setItem("rating3",this.rating3);
      localStorage.setItem("userId",this.userId);
      localStorage.setItem("idNo",this.idNo);
    },
    clickRating4 (ev) {
      if (this.readOnly) {
        return
      }
      let mark = parseInt(ev.target.dataset.index) + 1
      this.rating4 = mark
      this.$emit('starMarkChange', mark, this.outIndex)
      console.log(this.rating4)
      localStorage.setItem("rating4",this.rating4);
      localStorage.setItem("userId",this.userId);
      localStorage.setItem("idNo",this.idNo);
    },
    selectCard (index,item){
      var index=event.currentTarget.getAttribute('index');//绑定事件的元素
      if(this.card[item].flag == false){
        this.card[item].flag = true
      }else{
        this.card[item].flag = false
      }
      this.tag += index+','
      //console.log(this.tag.substr(0,this.tag.length-1))
      //localStorage.setItem("tag",this.tag);
      //var arr=new Array();
      this.arr = this.tag.split(',')
      this.arr.pop()
     // this.arr = this.unique(this.arr)
     console.log(this.arr)
      console.log(this.card.flag)
    //  console.log(this.arr.slice(0,2))
     localStorage.setItem("tag",JSON.stringify(this.card));
     localStorage.setItem("userId",this.userId);
     localStorage.setItem("idNo",this.idNo);
    },
    submits:function(){
      var arrCard = []
      var arrLable = []
      var cardShare
      this.card.forEach((item, index) =>{
         // console.log(item.dictValue);
          if(item.flag == true){
            //var arrCard2 = arrCard.slice(0,2)
            //console.log(this.card[index].dictValue);
            arrCard.push(this.card[index].dictValue)
            arrLable.push(this.card[index].dictCode)
            if(!arrCard[1] == false){
              cardShare = arrCard[0]+'、'+arrCard[1]
            }else{
              cardShare = arrCard[0]
            }
          }
        });
        this.lables = arrLable.join(',')
        console.log(this.lables);
      if(this.rating == 0 || this.rating2 == 0 || this.rating3 == 0 || this.rating4 == 0 || arrCard.length ==0){
        Toast({
            message: '请完成全部题目',
            position: 'center',
            duration: 3000
        });
      }else{
        this.ratArr = []
        this.ratArr.push(this.rating)
        this.ratArr.push(this.rating2)
        this.ratArr.push(this.rating3)
        this.ratArr.push(this.rating4)
        console.log(this.ratArr)
       // console.log(this.ratArr.sort().reverse())
         var maxIndex = 0;
         var maxValue = this.ratArr[0];
         for (var i = 1; i < this.ratArr.length; i++) {
             if(this.ratArr[i] > maxValue){
                 //把这个元素赋值给最大值，把他对应的索引值，赋值给maxIndex
                maxValue = this.ratArr[i];
                maxIndex = i;
             }
         }
        // console.log(maxIndex)
         var txt
         switch(maxIndex)
         {
            case 0:
            txt = '专业技能高超'
            break;
            case 1:
            txt = '投顾能力极强'
            break;
            case 2:
            txt = '投后服务到位'
            break;
            case 3:
            txt = '用心聆听、及时解决问题'
            break;
          }
        if(maxValue == 5){
          this.shareText = txt+'的5星'
        }else{
          this.shareText = txt+'的优秀'
        }
       // console.log(cardShare)
        
        this.shareDesc = '财富师'+this.businessName+cardShare+'，是我心中'+this.shareText+'财富师。'
        //alert(this.shareDesc)
       // this.Share()
      
       
       var that=this;
       // console.log(that.userId+'...'+that.idNo+'...'+that.rating+'...'+that.rating2+'...'+that.rating3+'...'+that.rating4+'...'+that.lables)
        if(that.$route.query.source == 'wx'){
           that.getsubmit()
        }else{
          that.getsubmitapp()
        }
      }
      
  },
  getsubmit:function(){
   // this.appStr.msg = this.shareDesc
   // this.appStr.shareUrl = this.Host+'weixin-h5/index.html#/severStar?userId='+this.userId+'&tgUserId='+this.tgUserId+'&ifcard=1'+'&shareDesc='+encodeURIComponent(this.shareDesc)
    this.wxshare('1')
    var that=this;
        console.log(that.userId+'...'+that.idNo+'...'+that.rating+'...'+that.rating2+'...'+that.rating3+'...'+that.rating4+'...'+that.lables)
        axios({
            method:'get',
            url:'/wxservice/wxMemberInfo/saveQuestionnaireRecord',
            params:{
              flag: 1,
              dtNo: that.userId,
              idNo: that.idNo,
              problem1Score: that.rating,
              problem2Score: that.rating2,
              problem3Score: that.rating3,
              problem4Score: that.rating4,
              lables: that.lables
            }
        })
        .then(function(res){
            Indicator.close();
            console.log(res.data)
            var retCode=res.data.retCode;
            var retMsg=res.data.retMsg;
            if(retCode == '0' || retCode == '-9'){
              //去转发
              that.Share()
              that.asyncSDKConifg(that.shareDesc,'1')
              return;
            }else if(retCode == 400){
             var serbackUrl = that.Host+'wxservice/wxMemberInfo/saveQuestionnaireRecord'
             window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=question_'+that.userId+','+that.idNo+','+that.tgUserId+'#wechat_redirect';
            }else{
              // MessageBox('提示','系统异常');
              Toast({
                  message: retMsg,
                  position: 'center',
                  duration: 3000
              });
            }
        })
  },
  getsubmitapp:function(){
    this.appStr.msg = this.shareDesc
    this.appStr.shareUrl = this.Host+'weixin-h5/index.html#/severStar?userId='+this.userId+'&tgUserId='+this.tgUserId+'&ifcard=1&source=wx&shareDesc='+encodeURIComponent(this.shareDesc)
  // alert(this.appStr.shareUrl)
    this.wxshare('1')
    var that=this;
        console.log(that.userId+'...'+that.idNo+'...'+that.rating+'...'+that.rating2+'...'+that.rating3+'...'+that.rating4+'...'+that.lables)
        axios({
            method:'get',
            url:'/wxservice/wxexternal?opName=saveTGQuestionnaireRecord',
            params:{
              flag: 1,
              dtNo: that.userId,
              idNo: that.idNo,
              problem1Score: that.rating,
              problem2Score: that.rating2,
              problem3Score: that.rating3,
              problem4Score: that.rating4,
              lables: that.lables
            }
        })
        .then(function(res){
            Indicator.close();
            console.log(res.data)
            var retCode=res.data.retCode;
            var retMsg=res.data.retMsg;
            if(retCode == '0' || retCode == '-9'){

              //去转发
              that.Share()
            //  that.asyncSDKConifg(that.shareDesc,'1')
              return;
            }else{
              // MessageBox('提示','系统异常');
              Toast({
                  message: retMsg,
                  position: 'center',
                  duration: 3000
              });
            }
        })
  },
  kown_btn:function(){
    this.isShareshow = false;
   // $('html,body').css({'overflow-y':'unset'})
  },
  jumpSever:function(){
    this.$router.go(-1)
    /*
    if(!this.$route.query.source == false){
      this.$router.go(-1)
    }else{
    let ua = navigator.userAgent.toLowerCase();
    //android终端
    let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    if ((/micromessenger/i).test(ua)) {//isWeixinBrowser()//判断是不是微信 
        return
    }else{
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            //ios
            //   this.$router.push({   //服务之星页
            //     path:'/severStar',
            //     name:'severStar',
            //     query:{
            //       // userId: this.$route.query.userId,
            //       // idNo: this.$route.query.idNo
            //       tgUserId: this.$route.query.tgUserId,
            //       client:this.$route.query.client,
            //       versionNo:this.$route.query.versionNo
            //     }
            // })
            this.$router.go(-1)
        } else if (/(Android)/i.test(navigator.userAgent)) {
            //android
            this.$router.go(-1)
        }
    }
    }*/
    
  },
  getCarddata:function(id){
    let that = this;
   // alert(that.userId+'.....'+that.idNo)
    Indicator.open();
    axios({
        method:'get',
        url:'/wxservice/wxMemberInfo/getServerStar',//获取客户信息
        params: {
          dtNo: that.userId,
          idNo: that.idNo,
        }
    })
    .then(function(res) {//成功之后
        console.log(res.data)
        Indicator.close();
        var retCode=res.data.retCode;
        var retMsg=res.data.retMsg;
        if(retCode==0){
          if(id == '1'){
            that.tgUserId= res.data.data.userId
            that.wxshare()
            that.asyncSDKConifg('中国私人银行服务的领航者，诚邀您开启财富之旅','0')
          }else{
            console.log(res.data.data.lableList)
            that.card = res.data.data.lableList
          }
        }else if(retCode == 400){
            var serbackUrl = that.Host+'wxservice/wxMemberInfo/getServerStar'
            window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=question_'+that.userId+','+that.idNo+','+that.tgUserId+'#wechat_redirect';
        }else{
            MessageBox(' ',retMsg);
        }
    });
  },
  getCarddataAPP:function(id){
    let that = this;
    //alert(that.userId+'.....'+that.idNo)
    Indicator.open();
    axios({
        method:'get',
        url:'/wxservice/wxexternal?opName=getTGServerStar',//获取客户信息
        params: {
          dtNo: that.userId,
          idNo: that.idNo,
        }
    })
    .then(function(res) {//成功之后
        console.log(res.data)
        Indicator.close();
        var retCode=res.data.retCode;
        var retMsg=res.data.retMsg;
        if(retCode==0){
          if(id == '1'){
            that.tgUserId= res.data.data.userId
          }else{
            console.log(res.data.data.lableList)
            that.card = res.data.data.lableList
          }
          
        }else{
            MessageBox(' ',retMsg);
        }
    });
  },
  getbusinessName:function(){ 
    let that = this;
    Indicator.open();
    var param=Base64.encode('{"userId":"'+that.userId+'"}');//that.user.userId
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
            // data=jQuery.parseJSON(data)
            var data=res.data
            that.businessName = data.userName; //对方财富师的名字
        }else if(retCode == "-2"){
            Toast({
                message: retMsg,
                position: 'center',
                duration: 3000
            });
        }else if(retCode == 400){
            var serbackUrl = that.Host+'wxservice/wxexternal?opName=getTCmycard&versionNo=30'
            window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=question_'+that.userId+','+that.idNo+','+that.tgUserId+'#wechat_redirect';
        }
    })
},
getId:function(){
    let that = this;
    axios({
        method:'get',
        url:'/wxservice/wxservice?opName=getUserInfo',//获取用户信息
        params: {
          //  backUrl: that.paramurl
        }
    })
    .then(function(res){
        // Indicator.close();
        var retCode=res.data.retCode;
        var Data = res.data
        console.log(Data)
        if(retCode=='0'){
            that.tgUserId= res.data.userInfo.id 
          //  alert(that.tgUserId+'605GETID')  
        }else if(retCode=='-1'){//系统异常
            //MessageBox('提示', '系统异常');
            Toast({
                message: '系统异常',
                position: 'center',
                duration: 3000
            });
        }
        else if(retCode == 400){
            var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
            window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=question_'+that.userId+','+that.idNo+','+that.tgUserId+'#wechat_redirect';
        } 
    })
},
  Share:function() {
    let ua = navigator.userAgent.toLowerCase();
    //android终端
    let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    if ((/micromessenger/i).test(ua)) {//isWeixinBrowser()//判断是不是微信 
        this.isShareshow = true;
       // $('html,body').css({'overflow':'hidden','height':'100%'})
        return
    }else{
        var str = JSON.stringify(this.appStr);
       // alert(str)
        console.log(str)
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            //ios
           window.webkit.messageHandlers.AppModel.postMessage({body: 'objc:///share:'+str});
        } else if (/(Android)/i.test(navigator.userAgent)) {
            //android
          window.AndroidFunctionSetting.share(str);
        }
    }
  },
  ShareLight:function() {
    let ua = navigator.userAgent.toLowerCase();
    //android终端
    let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    if ((/micromessenger/i).test(ua)) {//isWeixinBrowser()//判断是不是微信 
        return
    }else{
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            //ios
           window.webkit.messageHandlers.AppModel.postMessage({body: 'objc:///serveStarLight:'+true});  //服务之星点亮
        } else if (/(Android)/i.test(navigator.userAgent)) {
            //android
          window.AndroidFunctionSetting.serveStarLight(true);
        }
    }
  },
  wxshare:function(type) {
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
        if(type == '1'){
          this.shareLink = this.Host+'weixin-h5/static/html/redirect.html?app3Redirect=' + encodeURIComponent(this.Host+'weixin-h5/index.html#/severStar?userId='+this.userId+'&tgUserId='+this.tgUserId+'&ifcard=1&source=wx'+'&shareDesc='+this.shareDesc)
        }else{
          this.shareLink = this.Host+'weixin-h5/static/html/redirect.html?app3Redirect=' + encodeURIComponent(this.Host+'weixin-h5/index.html#/severStar?userId='+this.userId+'&tgUserId='+this.tgUserId+'&ifcard=1&source=wx')
        }
        
    } else if (/(Android)/i.test(navigator.userAgent)) {
        //android
        if(type == '1'){
         this.shareLink =this.Host+'weixin-h5/index.html#/severStar?userId='+this.userId+'&tgUserId='+this.tgUserId+'&ifcard=1&source=wx'+'&shareDesc='+encodeURIComponent(this.shareDesc)
        }else{
          this.shareLink =this.Host+'weixin-h5/index.html#/severStar?userId='+this.userId+'&tgUserId='+this.tgUserId+'&ifcard=1&source=wx'
        }
    }
    }

},
  async asyncSDKConifg (shareDesc,result) {
      const meatTitle = this.$route.meta.title
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
              title: '大唐财富'+meatTitle, // 分享标题
              desc: shareDesc, // 分享描述
              link: that.shareLink, // 分享链接
              imgUrl: 'http://file0.datangwealth.com/g1/M00/16/50/rBAeX1ybKCiAEKkxAADvNDguF4c858.png?filename=share.png', // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function() {
                  // 用户确认分享后执行的回调函数
                  //alert('成功');
                  if(result == '1'){
                    that.shareResultWX(1)
                  }
                  
                  //that.isSharesuccess = true
              },
              cancel: function() {
                  // 用户取消分享后执行的回调函数
                  //alert('用户取消分享');
              }
              });
              wx.onMenuShareTimeline({ //分享朋友圈
              title: '大唐财富'+meatTitle, // 分享标题
              desc: shareDesc, // 分享描述
              link: that.shareLink,
              imgUrl: 'http://file0.datangwealth.com/g1/M00/16/50/rBAeX1ybKCiAEKkxAADvNDguF4c858.png?filename=share.png', // 分享图标
              success: function() {
                  // 用户确认分享后执行的回调函数
                  if(result == '1'){
                    that.shareResultWX(1)
                  }
                  //that.isSharesuccess = true
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
    },
   //wx分享成功后回调
shareResultWX:function(shareType){
  //  alert(shareType+'===shareType')
    if(shareType == '1'){ //shareType: 1:分享成功  2:分享失败  3：用户取消
      if(this.isShareshow == true){
        this.isShareshow = false
      }
      this.isSharesuccess = true
      let that=this;
    axios({
        method:'get',
        url:'/wxservice/wxMemberInfo/saveQuestionnaireRecord',
        params:{
          dtNo: that.userId,
          idNo: that.idNo,
          flag: 2
        }
    })
    .then(function(res){
        Indicator.close();
        console.log(res.data)
        var retCode=res.data.retCode;
        var retMsg=res.data.retMsg;
       // alert(retCode)
        if(retCode == '0'){
  
        }
    })
    }
  }, 
//原生分享成功后回调
shareResultCallBack:function(shareType){
    //alert(shareType+'===shareType')
    if(shareType == '1'){ //shareType: 1:分享成功  2:分享失败  3：用户取消
      if(this.isShareshow == true){
        this.isShareshow = false
      }
      this.isSharesuccess = true
      let that=this;
    axios({
        method:'get',
        url:'/wxservice/wxexternal?opName=saveTGQuestionnaireRecord',
        params:{
          dtNo: that.userId,
          idNo: that.idNo,
          flag: 2
        }
    })
    .then(function(res){
        Indicator.close();
        console.log(res.data)
        var retCode=res.data.retCode;
        var retMsg=res.data.retMsg;
        if(retCode == '0'){
            
            that.ShareLight() //服务之星点亮原生
        }
    })
    }
  },
  },
  mounted:function(){    
       // 将subscanQRCallBack方法绑定到window下面，提供给外部调用
       window['shareResult'] = (result) => {
        // alert('shareResult')
         this.shareResultCallBack(result)
       }
   },
  created(){
    if(!this.$route.query.actId==false){ //重定向后
        var wxstr =this.$route.query.actId
        this.userId=wxstr.split(",")[0];
        this.idNo=wxstr.split(",")[1];
      //  this.tgUserId=wxstr.split(",")[2];
    }else{
      this.userId = this.$route.query.userId
      this.idNo = this.$route.query.idNo
     // this.tgUserId=this.$route.query.tgUserId
    }
    if(this.$route.query.source == 'wx'){
      this.getCarddata('1') //获取用户id
    }else{
      this.getCarddataAPP('1')
    }
    if(localStorage.getItem('userId') == this.userId){
      if(localStorage.getItem('idNo') == this.idNo){
        if(!localStorage.getItem('rating') == false){
          this.rating = localStorage.getItem('rating')
        }
        if(!localStorage.getItem('rating2') == false){
          this.rating2 = localStorage.getItem('rating2')
        }
        if(!localStorage.getItem('rating3') == false){
          this.rating3 = localStorage.getItem('rating3')
        }
        if(!localStorage.getItem('rating4') == false){
          this.rating4 = localStorage.getItem('rating4')
        }
        if(!localStorage.getItem('tag') == false){
          this.card = JSON.parse(localStorage.getItem('tag'))
          console.log(this.card)
        }else{ 
          if(this.$route.query.source != 'wx'){
            this.getCarddataAPP()
          }else{
            this.getCarddata()      
          }  
        }
      }else{
        localStorage.removeItem('tag');
        localStorage.removeItem('rating4');
        localStorage.removeItem('rating3');
        localStorage.removeItem('rating2');
        localStorage.removeItem('rating')
        localStorage.removeItem('userId')
        localStorage.removeItem('idNo')
        if(this.$route.query.source != 'wx'){
          this.getCarddataAPP()
        }else{
          this.getCarddata()      
        } 
      }
    }else{
      localStorage.removeItem('tag');
      localStorage.removeItem('rating4');
      localStorage.removeItem('rating3');
      localStorage.removeItem('rating2');
      localStorage.removeItem('rating')
      localStorage.removeItem('userId')
      localStorage.removeItem('idNo')
      if(this.$route.query.source != 'wx'){
        this.getCarddataAPP()
      }else{
        this.getCarddata()      
      } 
    }
    
     
    
    this.getbusinessName()
    
    
  }
}
</script>

<style scoped>
.star-phone {
  position: relative;
  display: inline-block;
  line-height: .533333rem;
  -webkit-tap-highlight-color:transparent;
  margin: .16rem 0 .5rem .533333rem;;
}
.star-item {
  display: inline-block;
  width: .9rem;
  height: .533333rem;
  background-image: url('img/star.png');
  background-size: .533333rem 1.066667rem;
  background-clip: content-box;
  background-position: center 0;
  background-repeat: repeat-y;
  cursor: pointer;
  vertical-align: bottom;
  white-space: nowrap;
}
.star-item:last-child {
  padding-right: 0;
}
.star-active {
  background-position: center .5333333rem;
}
.question{
  padding-top: .4rem;
  text-align: left;
}  
.question .card{
  width: 1.866667rem;
  height: .586667rem;
  float: left;
  color: #767676;
  font-size: .32rem;
  border: 1px solid #DFDFDF;
  background: #F5F5F5;
  text-align: center;
  border-radius: .35rem;
  line-height: .586rem;
  margin: .32rem .106667rem 0;
}
.btn_bottom2{
    /* position: fixed;
    bottom: 0;
    left: 0; */
    width: 100%;
    height: 1.8rem;
    box-sizing: border-box;
    background: #fff;
    padding-top: 0.6rem;
    text-align: center;
}
.buttons1 {
    display: inline-block;
    width: 8.213333rem;
    height: 1.506667rem;
    background: url(img/btn@2x.png) no-repeat;
    background-size: 8.213333rem 1.626667rem;
    color: #ffffff;
    text-align: center;
    line-height: 1.46rem;
    font-weight: 500;
    font-size: .4rem;
    padding-top: .04rem;
}
.Q_ques{
  font-size: .373333rem;
  color: #404040;
  line-height: .56rem;
  word-spacing: .266667rem;
  padding-left: 0.533333rem;
}
.card_term{
  padding-left: 0.58rem;
  overflow: hidden;
}
.star-text{
  color: #999;
  margin-left: .1rem;
  line-height: .6rem;
}
.star-phone span{
  color: #999;
  font-size: .32rem;
}
.question .active{
  color: #EB5353;
  border: 1px solid #FFBFBF;
  background: #FEF6F6;
}
.shade{
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,0.6);
}
.shade-text{
  color: #fff;
  font-size: .533333rem;
  line-height: .8rem;
  text-align: center;
  padding-top: .346667rem;
}
.shade-btn{
  width: 5.493333rem;
  height: 1.013333rem;
  border: .026667rem solid #fff;
  color: #fff;
  font-size: .4rem;
  line-height: 1.013333rem;
  border-radius: 1.066667rem;
  text-align: center;
  margin: 2.4rem auto;
}
.point{
  width: 2.64rem;
  margin: .9rem 0 0 6.73333rem;
}
.light{
  width: 8.72rem;
  margin: 4rem 0 0 .72rem;
}
.share-text{
  position: absolute;
  top: 6rem;
  left: 2.53rem;
  color: #fff;
  font-size: .346667rem;
  text-align: center;
}
.share-btn{
  width: 3.466667rem;
  height: .853333rem;
  background: #fff2f2;
  border: .026667rem solid #fff;
  color: #c90320;
  font-size: .346667rem;
  line-height: .853333rem;
  border-radius: 1.066667rem;
  text-align: center;
  position: absolute;
  top: 10.4rem;
  left: 3.4rem;
}
</style>



