<template>
    <div id='toSignNewCust'>
        <div class='content'>
            <div class='tip'>
                <span>联系电话录入后将做加密处理，保证您的信息安全</span>
              <!-- <img src='./img/left_img@2x.png' class='left_img'/>   -->
            </div>
            <div class='inpBox'>
                <input type='text' class='' v-model="param.realName" :disabled="isDisabled"/>
                <span>联系人姓名</span>
                 <!-- <img src='./img/card_img@2x.png' class='clear' style='right:33%;'/>  -->
             </div>
            <div class='inpBox'>
                <input type='text' class=''style='padding-right:100px;'maxlength='11' v-model="param.phone" ref='phone' v-on:input='phoneFn' :disabled="isDisabled2"/>
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
                <input type='text' class='' v-model="param.businessName" :disabled="isDisabled3"/>
                <span>理财师</span>
              </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class='' v-model="param.belongBusiness" :disabled="isDisabled4"/>
                <span>理财师工号</span>
              </div> <!--inpBox-->
             
             <mt-button type="danger" size="large" class='sign' @click="toSignUp()">报名</mt-button>
             <p style='font-size:12px;color:rgb(153,153,153);line-height:40px;'>此页面仅供个人客户自行报名，机构客户可联系您的专属财富师为您服务</p>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue" v-on:warnCodeFunction="warnCodeFunction"></getcode>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Field } from 'mint-ui';
import { Indicator } from 'mint-ui';
import getcode from '../wealth/getcode';
import axios from 'axios'
import { isValidMobile, isValidxincode, isValidverifycode } from '@/common/js/extends.js'
export default {
    name:'toSignNewCust',
    data:function(){
        return{
            messType:'5',
            text:'发送验证码',
            Dsiabled:false,
            warnPhone:'',
            warnCode:'',
            p:1,
            isShow:false,
            isDisabled: false,
            isDisabled2: false,
            isDisabled3: false,
            isDisabled4: false,
            isValid: false,
            isValid2: false,
            param:{
                realName: '',
                phone: '',
                verifiCode: '',
                activityType: '',
                belongBusiness: '',
                businessName: '',
                isReviewSignup: '',
            }
        }
    },
    methods:{
        getData:function(){
            let that = this;
            //console.log(that.param)
            axios({
                method:'get',
                url:'/wei/wxservice/wxservice?opName=getUserInfo'//获取客户信息
            })
            .then(function(res) {//成功之后
                Indicator.close();
                var retCode=res.data.retCode;
                if(retCode!=0){
                    alert(retCode);
                }else if(retCode == 0){
                    console.log(res.data.userInfo)
                    if(res.data.userInfo.phone != null){
                        var Tel = res.data.userInfo.phone
                        //var Tel = '13245782323'
                        var mtel = Tel.substr(0, 3) + '****' + Tel.substr(7);
                        that.param.phone = mtel
                        that.isDisabled2 = true;
                        that.isShow = true
                    }
                    if(res.data.userInfo.realName != null){
                        that.param.realName = res.data.userInfo.realName
                        that.isDisabled = true
                    }
                    if(res.data.userInfo.businessName != null){
                        that.param.businessName = res.data.userInfo.businessName
                        that.isDisabled3 = true;
                    }
                    if(res.data.userInfo.belongBusiness != null){
                        that.param.belongBusiness = res.data.userInfo.belongBusiness
                        that.isDisabled4 = true;
                    }
                }
            });
        },
        phoneFn:function(){
            if(!isValidMobile(this.param.phone)){
                this.$refs.warnPhone.style.display='block';
                this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
                this.warnPhone='请输入正确的手机号';
                this.isValid = false
            }else{
                this.$refs.warnPhone.style.display='none';
                this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
                this.isValid = true
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
            this.$refs.c1.getCodeFn(this.messType,this.param.phone);
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
            if(!isValidverifycode(this.param.verifiCode)){
                this.$refs.warnCode.style.display='block';
                this.$refs.verifycode.style='border-bottom:0.5px solid #df1e1d!important';
                this.warnCode='请输入正确的验证码';
                this.isValid2 = false
            }else{
                this.$refs.warnCode.style.display='none';
                this.$refs.verifycode.style='border-bottom:0.5px solid #efefef!important';
                this.isValid2 = true
            }
        },//验证手机验证码
        changeP:function(){
             this.$router.push({
                path:'/changephone',
                name:'changephone',
                params:{
                }
            })
        },
        toSignUp:function(){
            if(this.isValid == false || this.isValid2 == false){
                this.phoneFn()
                this.codeFn()
            }else{
                let that = this;
                console.log(that.param)
                axios({
                    method:'get',
                    url:'/wei/wxservice/wxservice?opName=toSignUp',
                    params: {
                        param:that.param,//系统类别
                    }
                })
                .then(function(res) {//成功之后
                    console.log(res)
                    // var retCode=res.data.retCode;
                    // var retMsg=res.data.retMsg;
                    // if(retCode!=0){
                    //     console.log(retMsg);
                    // }
                    // that.allList=that.allList.concat(res.data.itemList);//把已获取的数据和新获取的数据合并在放入页面
                    // that.items=that.allList
                    // //console.log(that.items)
                    // if(res.data.itemList&&res.data.itemList.length<10){
                    //     that.load=false;
                    // }
                    // Indicator.close();
                });
            }
            
            
        }
    },
    created(){
        Indicator.open(this.loadObj);
        this.param.isReviewSignup = this.$route.params.isReviewSignup;
        console.log(this.param.isReviewSignup)
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
