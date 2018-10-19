<template>
    <div id='toSignNewCust'>
        <div class='content'>
            <div class='tip'>
                <span>请验证报名信息后签到</span>
              <!-- <img src='./img/left_img@2x.png' class='left_img'/>   -->
            </div>
            <div class='inpBox'>
                <input type='text' class='' :disabled="isDisabled" value="个人客户"/>
                <span>客户类别</span>
                 <!-- <img src='./img/card_img@2x.png' class='clear' style='right:33%;'/>  -->
             </div>
            <div class='inpBox'>
                <input type='text' class=''style='padding-right:100px;'maxlength='11' v-model="param.mobile" ref='mobile' :disabled="isDisabled2"  placeholder="请填写您报名时手机号"/>
                <p class='warn' ref='warnPhone' v-show='true'>{{warnPhone}}</p>
                <span>手机号</span>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class='' maxlength='11' v-model="param.verifiCode" ref='verifycode' />
                <p class='warn' ref='warnCode'v-show='true'>{{warnCode}}</p>
                <span>验证码</span>
                <mt-button type="danger" size="small" class='sendCodeBtn'@click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
             <mt-button type="danger" size="large" class='sign' @click="toSignUp()">签到</mt-button>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue" v-on:warnCodeFunction="warnCodeFunction"></getcode>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Field } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import getcode from '../wealth/getcode';
import axios from 'axios'
import { isValidMobile, isValidverifycode} from '@/common/js/extends.js'
export default {
    name:'activeCheckin',
    data:function(){
        return{
            messType:'3',
            text:'发送验证码',
            Dsiabled:false,
            warnPhone:'',
            warnCode:'',
            p:1,
            isShow:false,
            isDisabled: true,
            isDisabled2: false,
            isValid: false,
            isValid2: false,
            userPhone:'',
            authenticFlag:'',
            param:{
                actId: '',
                signInType: 0,
                custProp: 0,
                mobile: '',
                verifiCode: ''
            },
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=getUserInfo'),//接口
            paramurl: location.href.split('?')[0]
        }
    },
    methods:{
        getData:function(){
            Indicator.open(this.loadObj);
            let that = this;
            //console.log(that.param)
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取客户信息
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode == 0){
                    console.log(res.data.userInfo)
                    that.authenticFlag = res.data.userInfo.authenticFlag
                    if(!res.data.userInfo.phone == false){
                        //console.log(res.data.userInfo.phone)
                        var Tel = res.data.userInfo.phone
                        var mtel = Tel.substr(0, 3) + '****' + Tel.substr(7);
                        that.userPhone = mtel
                        that.axiosSign()
                    }else{
                        //that.isShow = true
                    }
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=activeCheckin#wechat_redirect';
                }else{
                    MessageBox('提示',retMsg);
                }
            });
        },
        phoneFn:function(){
            if(!isValidMobile(this.param.mobile)){
                this.$refs.warnPhone.style.display='block';
               // this.$refs.mobile.style='border-bottom:0.5px solid #df1e1d!important';
                this.warnPhone='请输入正确的手机号';
                this.isValid = false
            }else{
                this.$refs.warnPhone.style.display='none';
              //  this.$refs.mobile.style='border-bottom:0.5px solid #efefef!important';
                this.isValid = true
            } 
        },//验证手机号
        getM:function(){
           if(this.phoneFn()){
               this.Dsiabled = true
           }
            this.$refs.c1.getCodeFn(this.messType,this.param.mobile,this.authenticFlag);
        },
        warnCodeFunction:function(warn){
             this.warnPhone=warn;
              if(this.warnPhone!=''){
               this.$refs.warnPhone.style.display='block';
            //  this.$refs.mobile.style='border-bottom:0.5px solid #df1e1d!important';
           }else{
               this.$refs.warnPhone.style.display='none';
            //  this.$refs.mobile.style='border-bottom:0.5px solid #efefef!important';
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
               // this.$refs.verifycode.style='border-bottom:0.5px solid #df1e1d!important';
                this.warnCode='请输入正确的验证码';
                this.isValid2 = false
            }else{
                this.$refs.warnCode.style.display='none';
             //   this.$refs.verifycode.style='border-bottom:0.5px solid #efefef!important';
                this.isValid2 = true
            }
        },//验证手机验证码
        toSignUp:function(){
            if(!this.isValid || !this.isValid2){
                console.log(this.isValid)
                this.phoneFn()
                this.codeFn()
            }else{
                this.axiosSign()
            }
        },
        axiosSign:function(){
            Indicator.open(this.loadObj);
            let that = this;
            console.log(that.param)
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=towxSigned&scope=snsapi_userinfo',
                params: {
                    param:that.param,//系统类别
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode == 9){
                    var message = '您未报名该活动，需要重新报名。'
                    MessageBox.confirm('', {
                        message: message,
                        title: '',
                        showConfirmButton:true,
                        confirmButtonClass:'confirmButton',
                        confirmButtonText:'去报名',
                    }).then(action => {
                        if(action == 'confirm'){
                            that.$router.push({
                                path:'/ActiveDetail',
                                name:'ActiveDetail',
                                params:{
                                    oaActId : that.param.actId,
                                }
                            })
                        }
                    }).catch(() => {
                        //console.log(2);
                    })
                }else if(retCode == 0 || retCode == 1){   
                    console.log(retCode)
                    that.$router.push({
                        path: '/SuccCheckin',
                        name: 'SuccCheckin',
                        params:{
                            retCode: retCode,
                            activeId: that.param.actId,
                            phone: that.userPhone
                        }
                    })
                }else{
                    console.log(retMsg);
                    MessageBox('提示',retMsg);
                }
            });
        }
    },
    created(){
       Indicator.open(this.loadObj);
       console.log(this.$route.query.actId)
      this.param.actId = this.$route.query.actId
      if(this.param.actId){
        Indicator.close();
      }
        this.getData()
    },
    components:{Button,getcode,Field}//使用mint-ui的button的组件
}
</script>
<style>
 @import '../activeSign/toSign.css';  引入toSign.css文件*/
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
