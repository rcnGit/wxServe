<template>
    <div id='toSignOldCust'>
        <div class='content'>
            <div class='tip'>
             <span>请输入您的实名信息</span>
            </div>
            <div class='inpBox'>
                <input type='text' class=''ref='name' placeholder="请输入您的姓名"  v-model="param.idCardName"/>
                <span>姓名</span>
                <p class='warn' ref='namewarn'v-show='true'>{{namewarn}}</p> 
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''placeholder='请输入您的身份证号' v-on:input="shenJ()" ref='idCardNo' v-model="param.idCardNo" maxlength="20" />
                <span>身份证</span>
                <!-- <em>请输入正确的实名信息</em> -->
                <p class='warn' ref='warnIdcard'v-show='true'>{{warnIdcard}}</p>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->             
             <div style='clear:both'></div>
             <mt-button type="danger" size="large" class='next' @click="getDescribe()">下一步</mt-button>
        </div>
        
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { MessageBox } from 'mint-ui';//提示框
import { isValidIdCardNo,isValidName} from '@/common/js/extends.js'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import axios from 'axios';
export default {
    name:'faceMsg',
    data:function(){
       return{
           warnIdcard: '',
           param:{
            idCardNo:'',//身份证号
            idCardName:'',//身份证姓名
            returnUrl:'',//人脸识别后返回的Url
            backUrl: location.href.split('?')[0]
           },
           namewarn:'',
           token:'',
           serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/getFaceToken')
       }
   },
    components:{Button,axios},//使用mint-ui的button的组件
    methods:{
        shenJ:function(){
           this.param.idCardNo=this.param.idCardNo.replace(/[\W]/g,'');
           this.param.idCardNo=this.param.idCardNo.toLocaleUpperCase();
        },
    getDescribe:function(id){//拼接跳转链接
        //校验身份信息的内容；

        if(this.param.idCardName==''){
            this.$refs.namewarn.style.display='block';
            this.namewarn='请输入姓名';
            return;
        }else if(isValidName(this.param.idCardName)){
            this.$refs.namewarn.style.display='block';
            this.namewarn='请输入正确的姓名';
            return;
        }else{
            this.$refs.namewarn.style.display='none'
        }

        if(this.param.idCardNo==''){
            this.$refs.warnIdcard.style.display='block';
            this.warnIdcard='请输入身份证';
            return;
        }else if(!isValidIdCardNo(this.param.idCardNo)){
            this.$refs.warnIdcard.style.display='block';
            this.warnIdcard='请输入正确的身份证';
            return;
        }else{
            this.$refs.warnIdcard.style.display='none'
        }

        console.log(this.param)
        var that=this;
        Indicator.open();
        alert(that.param.returnUrl);
        axios({
            method:'get',
            url:'/wxservice/wxMemberInfo/getFaceToken',//ning
            params:that.param
        })
        .then(function(res) {//成功之后
            Indicator.close();
            console.log(res.data);
            var retCode=res.data.retCode;
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
                MessageBox('提示','当前网络不稳定，请重试');
                return;
            }else if(retCode == '-4'){
                MessageBox('提示','您的实名信息已绑定其他微信无法重复绑定，如有疑问请拨打客服电话：400-819-9868');
                return;
            }else if(retCode == '-5'){
                MessageBox('提示','手机号与已实名的手机号不一致');
                return;
            }else{
                that.token=res.data.data.token;
                var bizId=res.data.data.bizId;
                alert(bizId+'成功');
                setCookie('bizId',bizId);
               window.location.href='https://api.megvii.com/faceid/lite/do?token='+that.token;
               
            }
        });
        },
        idCardNoFn:function(){
            if(this.param.idCardNo==''){
                return;
            }else if(!isValidIdCardNo(this.param.idCardNo)){
                this.$refs.warn.style.display='block';
                //this.$refs.idCardNo.style='border-bottom:0.5px solid #df1e1d!important';
                this.warnIdcard='请输入正确的身份证号';
                return;
            }else{
                this.$refs.warn.style.display='none';
                this.$refs.idCardNo.style='border-bottom:0.5px solid #efefef!important';
            }
        },//验证身份证
        nameFn:function(){
            if(this.param.idCardName==''){
                return;
            }else if(isValidName(this.param.idCardName)){
                this.$refs.namewarn.style.display='block';
               // this.$refs.name.style='border-bottom:0.5px solid #df1e1d!important';
                this.namewarn='请输入正确的姓名';
                return;
            }else{
                 console.log('none')
                this.$refs.namewarn.style.display='none';
                this.$refs.name.style='border-bottom:0.5px solid #efefef!important';
            }
        },
    },
    created:function(){
       var that = this;
      var returnUrl = that.$route.query.returnUrl;
      alert(returnUrl+'开始')
       if(returnUrl&&returnUrl!=undefined){
           if(returnUrl.indexOf("?") != -1){
               that.param.returnUrl=returnUrl+'&faceResult=1';
           }else{
               that.param.returnUrl=returnUrl+'?faceResult=1';
           }
           
           
       }
    }
}

</script>
<style>
 @import 'toSign.css'; /* 引入toSign.css文件*/
 body{
     /* padding-top:15px; */
     background: #fff;
 }
 
 .inpBox{
    margin-bottom: 20px;
   
 }
 
 .inpBox input[type="text"]:disabled
 { 
    background-color: rgb(238,236,236);
    color:rgb(164,169,178);
 }

 
 .next{
     width:90%;
    margin: 50px auto;
 }
</style>
