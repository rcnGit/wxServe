<template>
    <div id='kefuSign'>
        <div class='content'>
            <div class='tip'>
                <span>联系电话录入后将做加密处理，保证您的信息安全</span>
              <!-- <img src='./img/left_img@2x.png' class='left_img'/>   -->
            </div>
            <div class='inpBox'>
                    <input type='text' class='' v-model="param.realName" :disabled="isDisabled" ref="realName"/>
                    <p class='warn' ref='warnName' v-show='true'>{{warnName}}</p>
                    <span>联系人姓名</span>
                     <!-- <img src='./img/card_img@2x.png' class='clear' style='right:33%;'/>  -->
                 </div>
                <div class='inpBox'>
                        <input type='hidden' class=''style='padding-right:100px;'maxlength='11' v-model="param.phone" ref='phone' />
                        <input type='tel'  class=''style='padding-right:100px;'maxlength='11' v-model="phone2" ref='phone2' :disabled="isDisabled2" placeholder="请输入联系人电话"/>
                    <p class='warn' ref='warnPhone' v-show='true'>{{warnPhone}}</p>
                    <span>联系人电话</span>
                    <span class='inpRchoose fSize13' style='color:#4a90e2;' @click='changeP()' v-show='isShow'>变更手机号>></span>
                 </div> <!--inpBox-->
                  <div class='inpBox'>
                    <input type='tel' class='' maxlength='4' v-model="param.verifiCode" ref='verifycode' placeholder="请输入验证码"/>
                    <p class='warn' ref='warnCode'v-show='true'>{{warnCode}}</p>
                    <span>验证码</span>
                    <mt-button type="danger" size="small" class='sendCodeBtn'@click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
                 </div> <!--inpBox-->
                 <div class='inpBox'>
                    <input type='text' class='' v-model="param.businessName" :disabled="isDisabled3" ref='businessName' placeholder="请输入理财师姓名"/>
                    <p class='warn' ref='warnbusinessName' v-show='true'>{{warnbusinessName}}</p>
                    <span>财富师</span>
                  </div> <!--inpBox-->
                  <div class='inpBox'>
                    <input type='tel' class='' v-model="gh" :disabled="isDisabled4" ref='belongBusiness'placeholder="请输入理财师工号" maxlength="7"/>
                    <p class='warn' ref='warnbelongBusiness' v-show='true'>{{warnbelongBusiness}}</p>
                    <span>理财师工号DT</span>
                  </div> <!--inpBox-->
             
             <mt-button type="danger" size="large" class='sign' @click="toSignUp()">报名</mt-button>
             <p style='font-size:12px;color:rgb(153,153,153);line-height:40px;'>此页面仅供个人客户自行报名，机构客户可联系您的专属财富师为您服务</p>
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
import getcode from '../wealth/getcode';
import axios from 'axios'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import { isValidMobile, isValidxincode, isValidverifycode, isValidName, isValidEmpNo } from '@/common/js/extends.js'
export default {
    name:'kefuSign',
    data:function(){
        return{
            messType:'3',
            text:'获取验证码',
            Dsiabled:false,
            gh:'',
            warnPhone:'',
            warnCode:'',
            warnName:'',
            warnbusinessName:'',
            warnbelongBusiness:'',
            ifCaiFu:false,//之前没有财富师
            p:1,
            idNo:'',//身份证号
            isShow:false,
            isDisabled: false,
            isDisabled2: false,
            isDisabled3: false,
            isDisabled4: false,
            isValid: false,
            isValid2: false,
            isValid3: false,
            isValid4: false,
            isValid5: false,
            userPhone: '',
            phone2: '',//显示的手机号
            param:{
                realName: '',
                phone: '',
                verifiCode: '',
                activityType: '',
                belongBusiness: '',
                businessName: '',
                activeId: '',
                actName: '',
                isReviewSignup: '',
            },
            params:{
                bizId:''
            },
            backUrl: encodeURIComponent(location.href.split('#')[0]),
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=getUserInfo'),//接口
            paramurl: location.href.split('?')[0],
            isFaceSuc:0,//未实名成功
        }
    },
    methods:{
        // getResult:function(){
        //     axios({
        //         method:'get',
        //         url:'/wxservice/wxMemberInfo/getFaceToken', 
        //         params: this.params
        //     })
        //     .then(function(res) {
        //         console.log(res.data)
        //     })
        // },
        getData:function(){
            alert('getData')
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
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
               // alert(retCode)
                if(retCode == 0){
                    that.isFaceSuc=res.data.userInfo.authenticFlag;
                   // alert(res.data.userInfo.authenticFlag+'===res.data.userInfo.authenticFlag')
                    if(!res.data.userInfo.phone == false){
                        that.userPhone = res.data.userInfo.phone
                        var Tel = that.userPhone
                        var mtel = Tel.substr(0, 3) + '****' + Tel.substr(7);
                       that.phone2 = mtel
                        that.isDisabled2 = true;
                        that.isShow = true
                        that.isValid = true
                    }
                   // alert(res.data.userInfo.realName);
                    if(!res.data.userInfo.realName == false){
                        that.param.realName = res.data.userInfo.realName;
                        that.idNo = res.data.userInfo.idNo;//身份证
                        that.isDisabled = true
                        that.isValid3 = true
                    }
                    if(!res.data.userInfo.businessName == false){
                        that.param.businessName = res.data.userInfo.businessName
                        that.isDisabled3 = true;
                        that.isValid4 = true
                        var actname = '财富师'+that.param.businessName+'邀请您参加'+that.param.actName
                        var busname = '大唐财富尊享活动'+that.param.actName+'即将举办，机会难得，邀请你一起参加'
                        that.asyncSDKConifg(actname,busname)
                    }else{
                        var businName = res.data.userInfo.nickname
                        var actname = businName+'邀请您参加'+that.param.actName
                        var busname = '大唐财富尊享活动'+that.param.actName+'即将举办，要一起参加吗？'
                        that.asyncSDKConifg(actname,busname)
                    }
                    if(!res.data.userInfo.belongBusiness == false){
                        //已经有财富师不是自己输入的
                        that.ifCaiFu=true;
                        //that.gh = res.data.userInfo.belongBusiness
                        var gh=res.data.userInfo.belongBusiness;
                        that.gh=gh.substr(2,7);
                        that.isDisabled4 = true;
                          that.isValid5 = true
                    }
                }else if(retCode == 400){
                     var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=kefuSign#wechat_redirect';
                 }else{
                    MessageBox('提示',retMsg);
                }
            });
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
               // this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid = false
            }else{
                this.$refs.warnPhone.style.display='none';
               // this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
                this.isValid = true
            }
        },//验证手机号
        getM:function(){
            this.Dsiabled = true;
            if(!this.phoneFn()){
                this.Dsiabled = false;
            }
            if(this.userPhone == ''){
                this.param.phone == this.phone2 
            }else{
                this.param.phone = this.userPhone
            }
            this.$refs.c1.getCodeFn(this.messType,this.param.phone);
        },
        warnCodeFunction:function(warn){
             this.warnPhone=warn;
              if(this.warnPhone!=''){
               this.$refs.warnPhone.style.display='block';
            //  this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
           }else{
               this.$refs.warnPhone.style.display='none';
            //  this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
           }
        },
        childByValue:function(v){
            //console.log(v)
            if(v.time!='重新发送'&&v.time!='获取验证码'){
                this.text=v.time+'s';
            }else if(v.time==NaN||v.time==undefined||v.time=='NANs'){
                this.text='重新发送';
            }else{
                this.text=v.time
            }
           // console.log(v.time)
           this.Dsiabled=v.btnDsiabled;
          
          
           
           // console.log(this.Dsiabled);
        },
        codeFn:function(){
            if(!isValidverifycode(this.param.verifiCode)){
                this.$refs.warnCode.style.display='block';
                this.warnCode='请输入正确的验证码';
              //  this.$refs.verifycode.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid2 = false
            }else{
                this.$refs.warnCode.style.display='none';
               // this.$refs.verifycode.style='border-bottom:0.5px solid #efefef!important';
                this.isValid2 = true
            }
        },//验证手机验证码
        realnameFn:function(){
            if(isValidName(this.param.realName) || this.param.realName == ""){
                this.$refs.warnName.style.display='block';
                this.warnName='请输入正确的姓名';
              //  this.$refs.realName.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid3 = false
            }else{
                this.$refs.warnName.style.display='none';
               // this.$refs.realName.style='border-bottom:0.5px solid #efefef!important';
                this.isValid3 = true
            }
        },//验证联系人姓名
        businessNameFn:function(){
            if(isValidName(this.param.businessName) || this.param.businessName == ""){
                this.$refs.warnbusinessName.style.display='block';
                this.warnbusinessName='请输入正确的财富师姓名';
                //this.$refs.businessName.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid4 = false
            }else{
                this.$refs.warnbusinessName.style.display='none';
                //this.$refs.businessName.style='border-bottom:0.5px solid #efefef!important';
                this.isValid4 = true
            }
        },//验证财富师姓名
        belongBusinessFn:function(){
            if(!isValidEmpNo(this.gh)){
                this.$refs.warnbelongBusiness.style.display='block';
                this.warnbelongBusiness='请输入正确的财富师工号';
               // this.$refs.belongBusiness.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid5 = false
            }else{
                this.$refs.warnbelongBusiness.style.display='none';
               // this.$refs.belongBusiness.style='border-bottom:0.5px solid #efefef!important';
                this.isValid5 = true
            }
        },//验证财富师工号
        changeP:function(){
            //人脸
            var that=this;
             //alert(getCookie('bizId')+'changeP');
            //var bizId=decodeURIComponent(getCookie("bizId"));
            //alert(bizId+'changeP');
            if(that.isFaceSuc==1){
                that.face();//去人脸
            }else{
                //去修改手机号；
                  this.$router.push({
                     path:'/changephone',
                     name:'changephone',
                     query:{
                         changeForm:'kefuSign',
                         isReviewSignup:this.param.isReviewSignup,
                         activityType:this.param.activityType,
                         activeId:this.param.activeId,
                         actName:this.param.actName,
                     }
                 })
            }
            
         
        },
        face:function(){
            alert('face2');
            var that=this;
            var idCardNo=that.idNo;
            var idCardName=that.param.realName;
            var canshu='changeForm=kefuSign&isReviewSignup='+that.param.isReviewSignup+'&activityType='+that.param.activityType+'&activeId='+that.param.activeId+'&actName='+encodeURIComponent(that.param.actName)+'&isFace=1';
            //alert(canshu);
            alert(idCardNo+idCardName);
            Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceToken',//ning
                params:{
                    idCardNo:idCardNo,//身份证号
                    idCardName:idCardName,//身份证姓名
                    returnUrl:that.Host+'weixin-h5/index.html#/changePhone?'+canshu,//人脸识别后返回的Url
                    backUrl: location.href.split('?')[0]
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data);
                var retCode=res.data.retCode;
                alert(retCode);
                 if(retCode == 400){
                     var serbackUrl = that.Host+'wxservice/wxMemberInfo/getFaceToken'
                     window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=faceMsg#wechat_redirect';
                 }else if(retCode == '-2'){
                     MessageBox('提示','身份证不合法');
                     return;
                 }else if(retCode == '-1'){
                     MessageBox('提示','系统异常');
                     return;
                 }else if(retCode == '-3'){
                     MessageBox('提示','未获取到token');
                     return;
                 }else{
                     that.token=res.data.data.token;
                     var bizId=res.data.data.bizId;
                     alert(bizId);
                     setCookie('bizId',bizId);
                     window.location.href='https://api.megvii.com/faceid/lite/do?token='+that.token;
                
                 }
            })
        },
        signup:function(){
            let that = this;
            if(that.ifCaiFu){//之前有财富师
                that.kefuAxio();
                return;
            }
            var message = '报名该活动需先指定财富师，是否指定'+that.param.businessName+'为您的服务财富师？您可指定一名服务理财师，并拥有更换权力。'
                MessageBox.confirm('', {
                    message: message,
                    title: ''
                }).then(action => {
                    if(action == 'confirm'){
                        that.kefuAxio();
                    }
                }).catch(() => {
                    //console.log(2);
                })//
            
        },//signup
        kefuAxio:function(){
            var that=this;
            //that.param.belongBusiness='DT'+that.param.belongBusiness;
            that.param.belongBusiness='DT'+that.gh;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=toSignUp',
                params: {
                    param:that.param,//系统类别
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;                  
                if(retCode==0){ 
                    if(that.isDisabled3 == false ){
                                that.$router.push({
                                    path: '/pushW',
                                    name: 'pushW',
                                    query:{
                                        isReviewSignup: that.param.isReviewSignup,
                                        activeId: that.param.activeId,
                                        businessName: that.param.businessName,
                                        belongBusiness:that.param.belongBusiness,
                                    }
                                })
                    }else{
                        that.$router.push({
                            path: '/pushW',
                            name: 'pushW',
                            query:{
                                isReviewSignup: that.param.isReviewSignup,
                                activeId: that.param.activeId,
                                businessName: that.param.businessName
                            }
                        })
                    }
                }else if(retCode==3){
                    var crmInfo=res.data.crmInfo;
                    if(crmInfo.retCode==1){
                         MessageBox('提示','报名失败，系统错误');
                    }else if(crmInfo.retCode==3){
                        MessageBox('提示','此活动已举办');
                    }else if(crmInfo.retCode==4){
                        MessageBox('提示','此活动已取消');
                    }else if(crmInfo.retCode==5){
                        MessageBox('提示','此活动报名已结束');
                    }else if(crmInfo.retCode==6){
                        MessageBox('提示','您已经报过名');
                    }else if(crmInfo.retCode==7){
                        MessageBox('提示','客户性质传入值错误');
                    }else if(crmInfo.retCode==8){
                        MessageBox('提示','此客户为老客户，请联系此客户专属财富师进行报名');
                    }else if(crmInfo.retCode==9){
                        MessageBox('提示','此活动已结束');
                    }else if(crmInfo.retCode==10){
                        MessageBox('提示','活动不存在');
                    }else if(crmInfo.retCode==11){
                        MessageBox('提示','此财富师不存在');
                    }
                    return;
                }else if(retCode== 1){
                    MessageBox('提示','验证码错误');
                }else if(retCode== 2){
                    MessageBox('提示','推送crm系统错误');
                }else if(retCode== -1){
                    MessageBox('提示','系统异常');  
                }else if(retCode== -2){
                    MessageBox('提示','绑定手机号出错');
                }else if(retCode== -3){
                    MessageBox('提示','已绑定线上财富师');
                }else if(retCode== -4){
                    MessageBox('提示','已绑定线下财富师');
                }else if(retCode== -5){
                    MessageBox('提示','财富师工号不存在');
                }else if(retCode== -6){
                    MessageBox('提示','财富师已离职');
                }
            });
        },//报名走的接口
        toSignUp:function(){ 
            // Indicator.open();   
            this.phoneFn()
            this.codeFn()
            this.realnameFn()
            this.businessNameFn()
            this.belongBusinessFn();//检验工号 
            if(this.isValid == false || this.isValid2 == false || this.isValid3 == false || this.isValid4 == false || this.isValid5 == false){
                 return;
            }else{
                 Indicator.open()
                this.signup();
            }
        },
        async asyncSDKConifg (actName,businessName) {
            let that = this
            axios.get('/wxservice/core/getJSSDKConfigure.mm?pageUrl=pageUrl',{params:{"url":this.backUrl}})
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
                    console.log(businessName)
            // config信息验证成功后会执行ready方法
                wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
                    title: actName, // 分享标题
                    desc: businessName, // 分享描述
                    link: location.href.split('?')[0]+'?ifcard=1', // 分享链接
                    imgUrl: 'https://www.zhizhudj.com/weChat-public/spider-sign-up/static/lgoo.png?20180821', // 分享图标
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
                    link: location.href.split('?')[0]+'?ifcard=1',
                    imgUrl: 'https://www.zhizhudj.com/weChat-public/spider-sign-up/static/lgoo.png?20180821', // 分享图标
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
    components:{Button,getcode,Field},//使用mint-ui的button的组件
    created:function(){
        var that=this;
         var bizId=decodeURIComponent(getCookie("bizId"));
         that.params.bizId=bizId;
      //this.getResult();
       Indicator.open(this.loadObj);
       alert(this.$route.query.isReviewSignup+'this.$route.query.isReviewSignup'+'====this.$route.query.activityType='+this.$route.query.activityType+'=='+this.$route.query.actName)
        this.param.isReviewSignup = this.$route.query.isReviewSignup;
        this.param.activityType = this.$route.query.activityType;
        this.param.activeId = this.$route.query.activeId;
        this.param.actName = decodeURIComponent(this.$route.query.actName);
        this.getData()
    }

}
</script>
<style>
 @import 'toSign.css'; /* 引入toSign.css文件*/
 #kefuSign{
     padding-top:15px;
 }
 .sendCodeBtn{
     position:absolute;
     right:10px;
     top:8.5px;
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
