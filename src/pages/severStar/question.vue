<template>
  <div class="question">
    <p class="Q_ques">1、您的专属理财经理对于理财相关的金融、法律、政策等专业知识掌握。</p>
    <div class="star-phone" @click.stop="clickRating">
      <div
        v-for="(item, index) in starNum"
        :key="index"
        :class="isRating(index)"
        :data-index="index"></div>
        <span>{{rating}}星</span>
    </div><br>
    <div style="width: 9.493333rem;height: 0.026667rem;background: #F5F5F5;margin-bottom: 0.5rem;margin-left: .50666rem;"></div>
    <p class="Q_ques">2、您的专属理财经理熟悉本公司产品，并且可以有针对性的为您推荐适合您的理财产品。</p>
    <div class="star-phone" @click.stop="clickRating2">
      <div
        v-for="(item, index) in starNum"
        :key="index"
        :class="isRating2(index)"
        :data-index="index"></div>
        <span>{{rating2}}星</span>
    </div>
    <div style="width: 9.493333rem;height: 0.026667rem;background: #F5F5F5;margin-bottom: 0.5rem;margin-left: .50666rem;"></div>
    <p class="Q_ques">3、您的理财经理态度积极友好，主动为您提供产品的投后信息，公司相关信息传达的及时性等。</p>
    <div class="star-phone" @click.stop="clickRating3">
      <div
        v-for="(item, index) in starNum"
        :key="index"
        :class="isRating3(index)"
        :data-index="index"></div>
        <span>{{rating3}}星</span>
    </div><br>
    <div style="width: 9.493333rem;height: 0.026667rem;background: #F5F5F5;margin-bottom: 0.5rem;margin-left: .50666rem;"></div>
    <p class="Q_ques">4、您的理财经理注重倾听您的意见并能及时帮您反馈解决。</p>
    <div class="star-phone" @click.stop="clickRating4">
      <div
        v-for="(item, index) in starNum"
        :key="index"
        :class="isRating4(index)"
        :data-index="index"></div>
        <span>{{rating4}}星</span>
    </div>
    <div style="width: 9.493333rem;height: 0.026667rem;background: #F5F5F5;margin-bottom: 0.5rem;margin-left: .50666rem;"></div>
    <div>
      <p class="Q_ques" style="margin-bottom: .13rem;">5、请选择以下符合你财富师的标签（可多选）</p>
      <div class="card_term">
       <p v-for="(item, index) in card" class="card" @click="selectCard($event,index)" :index="item.cardcon" :class="item.selected?'active':''">{{item.cardcon}}</p>
     </div>
    </div>
    <div class="btn_bottom2" style="display: block;">
			<span class="saveImg buttons" @click='submits'>提交并推荐服务之星{{businessName}}</span>
    </div>
    <div class="shade" v-show="isShareshow">
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
      isCard:'',
      tag:'',
      arr: [],
      ratArr: [],
      shareText:'',
      rating: this.defaultRating, // 用于控制点亮星星的个数
      rating2: this.defaultRating, // 用于控制点亮星星的个数
      rating3: this.defaultRating, // 用于控制点亮星星的个数
      rating4: this.defaultRating, // 用于控制点亮星星的个数
      card: [
          {cardcon:"专业胜任",selected: false},
          {cardcon:"认真负责",selected: false},
          {cardcon:"积极热情",selected: false},
          {cardcon:"合规展业",selected: false},
          {cardcon:"服务细致",selected: false},
          {cardcon:"反馈及时",selected: false},
          {cardcon:"态度端正",selected: false},
          {cardcon:"谦和可亲",selected: false},
          {cardcon:"配置高手",selected: false},
          {cardcon:"关怀备至",selected: false},
          {cardcon:"眼光独到",selected: false},
          {cardcon:"人脉达人",selected: false},
        ],
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
    },
    selectCard (index,item){
      var index=event.currentTarget.getAttribute('index');//绑定事件的元素
      if(this.card[item].selected == false){
        this.card[item].selected = true
      }else{
        this.card[item].selected = false
      }
      this.tag += index+','
      //console.log(this.tag.substr(0,this.tag.length-1))
      //localStorage.setItem("tag",this.tag);
      //var arr=new Array();
      this.arr = this.tag.split(',')
      this.arr.pop()
     // this.arr = this.unique(this.arr)
     console.log(this.arr)
      console.log(this.card.selected)
    //  console.log(this.arr.slice(0,2))
     localStorage.setItem("tag",JSON.stringify(this.card));
    },
    submits:function(){
      var arrCard = []
      var cardShare
      this.card.forEach((item, index) =>{
         // console.log(item.cardcon);
          if(item.selected == true){
            //console.log(this.card[index].cardcon);
            arrCard.push(this.card[index].cardcon)
            var arrCard2 = arrCard.slice(0,2)
            if(!arrCard[1] == false){
              cardShare = arrCard2[0]+arrCard[1]
            }else{
              cardShare = arrCard2[0]
            }
            
            //console.log(arrCard.slice(0,2));
          }
        });
      if(this.rating == 0 || this.rating2 == 0 || this.rating3 == 0 || this.rating4 == 0 || arrCard.length ==0){
        alert('去选择')
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
         console.log(maxIndex)
         var txt
         switch(maxIndex)
         {
            case 0:
            txt = '专业技能高超'
            break;
            case 1:
            txt = '了解产品，专长配资'
            break;
            case 2:
            txt = '热情主动，服务周到'
            break;
            case 3:
            txt = '用心聆听，及时反馈'
            break;
          }
        if(maxValue == 5){
          this.shareText = txt+'5星'
        }else{
          this.shareText = txt+'优秀'
        }
        console.log(this.shareText)
        alert('axios')
        
        var shareTxt = this.businessName+'财富师'+cardShare+'。是我心中的'+this.shareText+'的财富师。'
        console.log(shareTxt)
        this.Share()
        this.asyncSDKConifg(shareTxt)
        // var that=this;
        // axios({
        //     method:'get',
        //     url:'/wxservice/wxMemberInfo/getFaceResult',
        //     params: that.faceparam
        // })
        // .then(function(res){
        //     Indicator.close();
        //     console.log(res.data)
        //     var retCode=res.data.retCode;
        //     if(retCode == '0'){
        //         //去转发
        //          that.Share()
        //         return;
        //     }else{
                
        //         return;
        //     }
        // })
      }
      
  },
  kown_btn:function(){
    this.isShareshow = false;
    $('html,body').css({'overflow-y':'unset'})
  },
  jumpSever:function(){
    this.$router.push({   //服务之星页
        path:'/severStar',
        name:'severStar',
        query:{
            userId: this.$route.query.userId
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
        $('html,body').css({'overflow':'hidden','height':'100%'})
    }else{
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            //ios
           // var assignWealth_str='';
           // window.webkit.messageHandlers.AppModel.postMessage({body: 'objc:///assignWealth:'+str});
        } else if (/(Android)/i.test(navigator.userAgent)) {
            //android
          //  var assignWealth_str='';
          //  window.AndroidFunction.assignWealth(str);
        }
    }
  },
  wxshare:function() {
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
        this.shareLink = this.Host+'weixin-h5/static/html/redirect.html?app3Redirect=' + encodeURIComponent(this.Host+'weixin-h5/index.html#/severStar?userId='+this.$route.query.userId+'&userName='+this.businessName)
    } else if (/(Android)/i.test(navigator.userAgent)) {
        //android
        this.shareLink = this.Host+'weixin-h5/index.html#/severStar?userId='+this.$route.query.userId+'&userName='+encodeURIComponent(this.businessName)
    }
    }

},
  async asyncSDKConifg (shareDesc) {
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
                  that.isSharesuccess = true
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
                  that.isSharesuccess = true
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
    }
     
    if(!this.$route.query.userName == false){
      this.businessName = decodeURIComponent(this.$route.query.userName);
    }
    this.wxshare()
    this.GasyncSDKConifg()
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
  background-position: center .53rem;
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
.buttons {
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
  margin: 4.4rem 0 0 .72rem;
}
.share-text{
  position: absolute;
  top: 6.4rem;
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
  top: 10.8rem;
  left: 3.4rem;
}
</style>



