<template>
    <div id='toSignNewCust'>
        <div class='content'>
            <div class='tip'>
                <span>联系电话录入后将做加密处理，保证您的信息安全</span>
              <!-- <img src='./img/left_img@2x.png' class='left_img'/>   -->
            </div>
            <div class='inpBox'>
                <input type='text' class=''style='padding-right:100px;'maxlength='11' v-model="ipNo" ref='phone' v-on:input='phoneFn'/>
                <p class='warn' ref='warnPhone'v-show='true'>{{warnPhone}}</p>
                <span>联系人电话</span>
                <mt-button type="danger" size="small" class='sendCodeBtn'@click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class='' maxlength='11' v-model="codeNo" ref='verifycode' v-on:input='codeFn'/>
                <p class='warn' ref='warnCode'v-show='true'>{{warnCode}}</p>
                <span>验证码</span>
             </div> <!--inpBox-->
             <div class='inpBox'>
                <input type='text' class=''/>
                <span>理财师</span>
              </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''/>
                <span>理财师工号</span>
              </div> <!--inpBox-->
             
             <mt-button type="danger" size="large" class='sign'>下一步</mt-button>
             <p style='font-size:12px;color:rgb(153,153,153);line-height:40px;'>此页面仅供个人客户自行报名，机构客户可联系您的专属财富师为您服务</p>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue" v-on:warnCodeFunction="warnCodeFunction"></getcode>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Field } from 'mint-ui';
import getcode from '../wealth/getcode'
import { isValidMobile, isValidxincode, isValidverifycode } from '@/common/js/extends.js'
export default {
    name:'toSignNewCust',
    data:function(){
        return{
            messType:'5',
            text:'发送验证码',
            Dsiabled:false,
            ipNo:'',
            warnPhone:'',
            codeNo:'',
            warnCode:'',
            p:1,
        }
    },
    methods:{
        phoneFn:function(){
            if(!isValidMobile(this.ipNo)){
                this.$refs.warnPhone.style.display='block';
                this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
                this.warnPhone='请输入正确的手机号';
            }else{
                this.$refs.warnPhone.style.display='none';
                this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
            }
        },//验证手机号
        getDescribe:function(id){//拼接跳转链接
        console.log(id)
            this.$router.push({
                path:'/signSuc',
                name:'signSuc',
                params:{
                 id : id
                }
              })
        },
        getM:function(){
            this.$refs.c1.getCodeFn(this.messType,this.ipNo);
        },
        warnCodeFunction:function(warn){
             this.warnPhone=warn;
              if(this.warnPhone!=''){
               this.$refs.warnPhone.style.display='block';
              this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
           }else{
               this.$refs.warnPhone.style.display='none';
              this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
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
            if(!isValidverifycode(this.codeNo)){
                this.$refs.warnCode.style.display='block';
                this.$refs.verifycode.style='border-bottom:0.5px solid #df1e1d!important';
                this.warnCode='请输入正确的验证码';
            }else{
                this.$refs.warnCode.style.display='none';
                this.$refs.verifycode.style='border-bottom:0.5px solid #efefef!important';
            }
        },//验证手机验证码
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

</style>
