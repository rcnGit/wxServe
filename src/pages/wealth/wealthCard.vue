<template>
    <div class='wealthCardD' >
        <div class="scroll-wrapper" style="min-height: 17.5rem">
        <iframe :src="wealthSrc" style="min-height: 17rem;" frameborder="0"  id="iframe1"></iframe>
        </div>
            <!-- <div style="height: 17.2rem">
            <object
                    
                    :data="wealthSrc"
                    type=text/html 
                    width="100%"
                    id="iframe1"
                    style="min-height: 18.2rem"
                    ></object>
                </div> -->
        <div class="btn_bottom" style="display: block;">
			<span class="saveImg buttons" @click='appointW'>指定服务</span>
        </div>
        <!-- 底部   框 -->
        <mt-popup v-model="popupVisible" position="center" pop-transition="popup-fade">
            <div class='pop_contant pop_contant_A' ref='pop_contant'>
                <div class='popImgBox_A'>
                    <img :src='erweima' style='width:180px;height:180px;margin:94px auto 10px;'/>
                    <p style='color:#333;font-size:14px;text-align:center;margin: 24px auto 8px;'>长按二维码</p>
                    <p style='color:#333;font-size:14px;text-align:center;'>关注大唐服务号后指定服务</p>
                </div>
            </div> <!--pop_contant -->
        </mt-popup>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk';
let Base64 = require('js-base64').Base64;
import axios from 'axios';
import { MessageBox } from 'mint-ui';//提示框
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Popup } from 'mint-ui';//底部出来的弹框
import merge from 'webpack-merge'
export default {
    name:'wealthCard',
    data:function(){
        return{
            wealthSrc:'',
            wname:'***',
            gh:'***',
            paramurl: location.href.split('?')[0],
            subscribe:'',
            businessName:'',
            ghT:'',
            mobile:'',
            popupVisible:false,//是否出现二维码的弹框
            erweima:'',
            backUrl: location.href.split('?')[0],
            userId:'',
            sourceModule:'',
            channel:'0', //1来自糖罐   2来自微信服务号
            mobile_switch:'',  // 0手机号开   1手机号关
            shareLink:''
        }
    },
    methods:{
        zixun:function(){
            window.location.href='tel:400-819-9868';
        },
        getWealthname:function(){ 
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
                
                console.log(res.data)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode == 0){
                   // var data=Base64.decode(res.data);
                   // data=jQuery.parseJSON(data);
                    var data=res.data
                    that.ghT=data.userId;
                    that.businessName = data.userName; //对方财富师的名字
                     that.mobile = data.mobile
                     var shareTitle = '财富师'+that.businessName+'的名片'
                     var shareDesc = '我是大唐财富认证财富管理师'+that.businessName+'，竭诚为您服务！这是我的名片，请惠存，谢谢！'
                     var shareImg = data.photo
                     window.document.title = shareTitle
                     that.Share()
                     that.asyncSDKConifg(shareTitle,shareDesc,shareImg)
                     Indicator.close();
                }else if(retCode == "-2"){
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },
        getData:function(){
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取用户信息
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                // Indicator.close();
                 var retCode=res.data.retCode;
                 var Data = res.data
                if(retCode=='0'){
                    that.subscribe=Data.userInfo.subscribe;//是否关注
                    if(!res.data.userInfo.phone==false){ 
                    }
                 
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
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=wealthCard_'+that.userId+','+that.sourceModule+','+that.channel+'#wechat_redirect';
                }
            })
        },
        appointW:function(){
            var that = this
            if(that.subscribe==0){//未关注
                //调连接扫二维码；
                that.getErweima();
                return;
            }else{
                //财富师指定页
                that.$router.push({
                    path:'/designatedW',
                    name:'designatedW',
                    query:{
                        dtNo:that.ghT,
                        mobile:that.mobile,
                        dtName:that.businessName,
                        sourceModule: that.sourceModule,
                        channel: that.channel,
                    }
                })
            }
        },
        getErweima:function(){
            var that=this;
             Indicator.open();
            // alert(that.ghT+','+that.businessName+','+that.mobile+','+that.sourceModule+','+that.channel)
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=cSignSQRCode',//获取临时二维码接口
                params: {
                    param:{
                       // actId:that.actId,
                        sign:'2',//指定财富师关注
                    // ghT:that.businessName+'（工号'+that.ghT+'）'+that.mobile,
                       ghT:that.ghT+','+that.businessName+','+that.mobile+','+that.sourceModule+','+that.channel,
                    }
                }
            })
            .then(function(res) {
                 Indicator.close();
                 console.log(res)
                var retCode=res.data.retCode;
                if(retCode==0){
                    //获取二维码成功
                    var url=res.data.url;
                    that.popupVisible=true;//出现弹框
                    that.erweima=url;
                }else{
                   
                }
            })//
        },
        Share:function() {
            var shareData = '?userId='+this.userId+'&sourceModule='+this.sourceModule  //分享不带channel
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
                $('#iframe1').css({"width":"10rem","min-height":"14rem"})
                $('#iframe1').attr('scrolling','no')
                $('.scroll-wrapper').css({"min-height":"15rem"})
                this.shareLink = this.Host+'weixin-h5/static/html/redirect.html?app3Redirect=' + encodeURIComponent(location.href.split('?')[0]+shareData)
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //android
                $('#iframe1').css({"width":"100%","min-height":"17rem"})
                $('#iframe1').attr('scrolling','auto')
                $('.scroll-wrapper').css({"min-height":"17.5rem"})
                this.shareLink = location.href.split('?')[0]+shareData
            }
            }
    
        },
        async asyncSDKConifg (shareTitle,shareDesc,shareImg) {
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
                    title: shareTitle, // 分享标题
                    desc: shareDesc, // 分享描述
                    link: that.shareLink, // 分享链接
                    imgUrl: shareImg, // 分享图标
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
                    title: shareTitle, // 分享标题
                    desc: shareDesc, // 分享描述
                    link: that.shareLink,
                    imgUrl: shareImg, // 分享图标
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
    mounted:function(){
       // Indicator.open();　
        if(!this.$route.query.dtName == false){
            this.trafficStatistics('025')//自定义埋点已有专属财富师
            var message = '您已有专属财富师'+this.$route.query.dtName+'，不可重复指定。';      
            MessageBox.confirm('', {
                message: message,
                title: '',
                showCancelButton:false,
                confirmButtonText:'我知道了',
            }).then(action => {
                if(action == 'confirm'){
                    this.$router.push({
                        query:merge(that.$route.query,{'dtName':''})
                    })
                }
            }).catch(() => {
                //取消按钮
            })
        }
        if(!this.$route.query.actId==false){ //重定向后
            var wxstr = this.$route.query.actId;
           // var wxstr =decodeURIComponent(that.$route.query.actId); 
            this.userId=wxstr.split(",")[0];
            this.sourceModule=wxstr.split(",")[1];
            this.channel=wxstr.split(",")[2] || '0';
            this.wealthSrc = this.tgHost+'?userId='+this.userId+'&sourceModule='+this.sourceModule+'&channel='+this.channel
            
        }else{
            this.userId=this.$route.query.userId
            this.sourceModule = this.$route.query.sourceModule
            this.channel=this.$route.query.channel || '0'
           // this.wealthSrc = 'https://interface.tdyhfund.com/dthtml/HTML5/DTCFS/html/shared_card.html?userId='+this.$route.query.userId
             this.wealthSrc = this.tgHost+'?userId='+this.$route.query.userId+'&sourceModule='+this.$route.query.sourceModule+'&channel='+this.channel
           //  this.wealthSrc = 'https://test-interface.tdyhfund.com:8443/dthtml/HTML5/DTCFS/html/shared_card.html?userId='+this.$route.query.userId+'&sourceModule='+this.$route.query.sourceModule
        }
        this.getWealthname()
        this.getData()
        this.Share() //动态添加iframe样式
        
    },
    components:{MessageBox,Indicator}
}
</script>
<style>
.btn_bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.8rem;
    box-sizing: border-box;
    background: #fff;
    padding-top: 0.1rem;
}
.buttons {
    display: inline-block;
    width: 8.213333rem;
    height: 1.626667rem;
    background: url(img/btn@2x.png) no-repeat;
    background-size: 8.213333rem 1.626667rem;
    color: #ffffff;
    text-align: center;
    line-height: 1.626rem;
    font-weight: 500;
    font-size: .4rem;
    padding-top: .04rem;
}
.xiazai{
    color:#4a90e2;
 }
</style>


