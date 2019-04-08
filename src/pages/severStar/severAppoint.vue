<template>
    <div id='toSignNewCust'>
        <div class='content'>
            <div class='tip'>
                <span>财富师某某某会在1个工作日内联系您。为您提供财富服务</span>
              <!-- <img src='./img/left_img@2x.png' class='left_img'/>   -->
            </div>
            <div class='inpBox'>
                <input type='tel' class=''style='padding-right:100px;'maxlength='11' v-model="param.phone" ref='phone2' placeholder="请输入联系人电话" />
                <p class='warn' ref='warnPhone' v-show='true'>{{warnPhone}}</p>
                <span>电话</span>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='tel' class=''  maxlength='4' v-model="param.verifiCode" ref='verifycode' placeholder="请输入验证码"/>
                <p class='warn' ref='warnCode'v-show='true'>{{warnCode}}</p>
                <span>验证码</span>
                <mt-button type="danger" size="small" class='sendCodeBtn' v-on:click.stop="getM" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> 
             
             <mt-button type="danger" size="large" class='sign' @click="toAppoint()">立即预约</mt-button>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue" v-on:warnCodeFunction="warnCodeFunction"></getcode>
       
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
            text:'获取验证码',
            Dsiabled:false,
            warnPhone:'',
            warnCode:'',
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
                    // if(!that.photo==false){
                    //     that.headImgUrl = that.photo
                    // }else{
                    //     that.headimgShow=false;
                    // }
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
 /*@import 'toSign.css';  引入toSign.css文件*/
 #toSignNewCust{
     padding-top:15px;
 }
 .sendCodeBtn{
     position:absolute;
     right:10px;
     top:6px;
     width:28%!important;
     margin-top:0;
     font-size: 13px!important;
 }
 .left_img{
     width:20px;
     float: left;
     margin-right:5px;
 }
 .sign{
     width:90%;
 }
 .inpRchoose{
     width:30%;
     position: absolute;
     left:74%!important;
    color:#999;
    line-height:30px;
 }
 
</style>
