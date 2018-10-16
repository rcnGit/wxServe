<template>
    <div id='toSignNewCust'>
        <div class='content'>
            <div class='tip'>
                <span>联系电话录入后将做加密处理，保证您的信息安全</span>
              <!-- <img src='./img/left_img@2x.png' class='left_img'/>   -->
            </div>
            <div class='inpBox'>
                <input type='text' class='' v-model="param.realName" :disabled="isDisabled" ref="realName" v-on:input='realnameFn'/>
                <p class='warn' ref='warnName' v-show='warnShow'>{{warnName}}</p>
                <span>联系人姓名</span>
                 <!-- <img src='./img/card_img@2x.png' class='clear' style='right:33%;'/>  -->
             </div>
            <div class='inpBox'>
                <input type='hidden' class=''style='padding-right:100px;'maxlength='11' v-model="param.phone" ref='phone' />
                <input type='text' class=''style='padding-right:100px;'maxlength='11' v-model="phone2" ref='phone2' :disabled="isDisabled2" v-on:input='phoneFn'/>
                <p class='warn' ref='warnPhone' v-show='true'>{{warnPhone}}</p>
                <span>联系人电话</span>
                <span class='inpRchoose fSize13' style='color:#4a90e2;' @click='changeP' v-show='isShow'>变更手机号>></span>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class='' maxlength='11' v-model="param.verifiCode" ref='verifycode' v-on:input='codeFn'/>
                <p class='warn' ref='warnCode'v-show='true'>{{warnCode}}</p>
                <span>验证码</span>
                <mt-button type="danger" size="small" class='sendCodeBtn'@click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
             <div class='inpBox'>
                <input type='text' class='' v-model="param.businessName" :disabled="isDisabled3" ref='businessName' v-on:input='businessNameFn'/>
                <p class='warn' ref='warnbusinessName' v-show='true'>{{warnbusinessName}}</p>
                <span>理财师</span>
              </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class='' v-model="param.belongBusiness" :disabled="isDisabled4" ref='belongBusiness' v-on:input='belongBusinessFn'/>
                <p class='warn' ref='warnbelongBusiness' v-show='true'>{{warnbelongBusiness}}</p>
                <span>理财师工号</span>
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
import { isValidMobile, isValidxincode, isValidverifycode, isValidName, isValidEmpNo } from '@/common/js/extends.js'
export default {
    name:'toSignNewCust',
    data:function(){
        return{
            messType:'3',
            text:'发送验证码',
            Dsiabled:false,
            warnPhone:'',
            warnCode:'',
            warnName:'',
            warnbusinessName:'',
            warnbelongBusiness:'',
            p:1,
            isShow:false,
            isDisabled: false,
            isDisabled2: false,
            isDisabled3: false,
            isDisabled4: false,
            isDisabled6: false,
            isValid: false,
            isValid2: false,
            isValid3: false,
            warnShow: false,
            userPhone: '',
            phone2: '',
            param:{
                realName: '',
                phone: '',
                verifiCode: '',
                activityType: '',
                belongBusiness: '',
                businessName: '',
                activeId: '',
                actName:'',
                isReviewSignup: '',
            },
            backUrl: encodeURIComponent(location.href.split('#')[0])
        }
    },
    methods:{
        getData:function(){
            let that = this;
            //console.log(that.param)
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo&scope=snsapi_userinfo'//获取客户信息
            })
            .then(function(res) {//成功之后
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode!=0){
                    MessageBox('提示',retMsg);
                }else if(retCode == 0){
                    console.log(res.data.userInfo)
                    console.log(res.data.userInfo.isNewRecord)
                    if(!res.data.userInfo.phone == false){
                        that.userPhone = res.data.userInfo.phone
                        var Tel = that.userPhone
                        var mtel = Tel.substr(0, 3) + '****' + Tel.substr(7);
                        that.phone2 = mtel
                        that.isDisabled2 = true;
                        that.isShow = true
                        that.isValid = true
                    }
                    if(!res.data.userInfo.realName == false){
                        that.param.realName = res.data.userInfo.realName
                        that.isDisabled = true
                    }
                    if(!res.data.userInfo.businessName == false){
                        that.param.businessName = res.data.userInfo.businessName
                        that.isDisabled3 = true;
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
                        that.param.belongBusiness = res.data.userInfo.belongBusiness
                        that.isDisabled4 = true;
                    }
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
              //  this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid = false
            }else{
                this.$refs.warnPhone.style.display='none';
               // this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
                this.isValid = true
            } 
        },//验证手机号
        getM:function(){
            if(this.phoneFn()){
               this.Dsiabled = true
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
             // this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
           }else{
               this.$refs.warnPhone.style.display='none';
             // this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
           }
        },
         childByValue:function(v){
            //console.log(v)
            this.text=v.time;
           // console.log(v.time)
           this.Dsiabled=v.btnDsiabled;
          
          
           
           // console.log(this.Dsiabled);
        },
        codeFn:function(){
            if(!isValidverifycode(this.param.verifiCode)){
                this.$refs.warnCode.style.display='block';
                this.warnCode='请输入正确的验证码';
                //this.$refs.verifycode.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid2 = false
            }else{
                this.$refs.warnCode.style.display='none';
                //this.$refs.verifycode.style='border-bottom:0.5px solid #efefef!important';
                this.isValid2 = true
            }
        },//验证手机验证码
        realnameFn:function(){
            if(isValidName(this.param.realName) || this.param.realName == ""){
                this.$refs.warnName.style.display='block';
                this.warnName='请输入正确的姓名';
               // this.$refs.realName.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid3 = false
            }else{
                this.$refs.warnName.style.display='none';
                //this.$refs.realName.style='border-bottom:0.5px solid #efefef!important';
                this.isValid3 = true
            }
        },//验证联系人姓名
        businessNameFn:function(){
            if(isValidName(this.param.businessName) || this.param.businessName == ""){
                this.$refs.warnbusinessName.style.display='block';
                this.warnbusinessName='请输入正确的财富师姓名';
               // this.$refs.businessName.style='border-bottom:0.5px solid #df1e1d!important';
            }else{
                this.$refs.warnbusinessName.style.display='none';
                //this.$refs.businessName.style='border-bottom:0.5px solid #efefef!important';
            }
        },//验证财富师姓名
        belongBusinessFn:function(){
            if(!isValidEmpNo(this.param.belongBusiness)){
                this.$refs.warnbelongBusiness.style.display='block';
                this.warnbelongBusiness='请输入正确的财富师工号';
                //this.$refs.belongBusiness.style='border-bottom:0.5px solid #df1e1d!important';
            }else{
                this.$refs.warnbelongBusiness.style.display='none';
                //this.$refs.belongBusiness.style='border-bottom:0.5px solid #efefef!important';
            }
        },//验证财富师工号
        changeP:function(){
             this.$router.push({
                path:'/changephone',
                name:'changephone',
                params:{
                }
            })
        },
        toSignUp:function(){
            if(!this.isValid || !this.isValid2 || !this.isValid3){
                console.log(this.isValid)
              this.phoneFn();
              this.realnameFn();
                this.codeFn();
            }else{
                Indicator.open(this.loadObj);
                let that = this;
                console.log(that.param)
                axios({
                    method:'get',
                    url:'/wxservice/wxservice?opName=toSignUp',
                    params: {
                        param:that.param,//系统类别
                    }
                })
                .then(function(res) {//成功之后
                    Indicator.close();
                    console.log(res.data)
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode != 0){
                        console.log(retMsg);
                        MessageBox('提示',retMsg);
                    }else if(retCode == 0){   
                        console.log(that.param.isReviewSignup)
                        that.$router.push({
                            path: '/signSuc',
                            name: 'signSuc',
                            params:{
                                isReviewSignup: that.param.isReviewSignup,
                                activeId: that.param.activeId
                            }
                        })
                    }
                    
                    // Indicator.close();
                });
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
    created(){
        Indicator.open(this.loadObj);
        this.param.isReviewSignup = this.$route.params.isReviewSignup;
        this.param.activityType = this.$route.params.activityType;
        this.param.activeId = this.$route.params.activeId;
        this.param.actName = this.$route.params.actName;
        this.getData()
    },
    components:{Button,getcode,Field}//使用mint-ui的button的组件
}
</script>
<style>
 @import 'toSign.css';  引入toSign.css文件*/
 #toSignNewCust{
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
