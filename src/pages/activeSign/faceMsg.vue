<template>
    <div id='toSignOldCust'>
        <div class='content'>
            <div class='tip'>
             <span>请输入您的实名信息</span>
            </div>
            <div class='inpBox'>
                <input type='text' class=''ref='name' placeholder="请输入您的姓名" v-on:input='nameFn' v-model="param.idCardName"/>
                <span>姓名</span>
                <p class='warn' ref='namewarn'v-show='true'>{{namewarn}}</p> 
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''placeholder='请输入您的身份证' ref='idCardNo' v-model="param.idCardNo" v-on:input='idCardNoFn'/>
                <span>身份证</span>
                <!-- <em>请输入正确的实名信息</em> -->
                <p class='warn' ref='warn'v-show='true'>{{warnIdcard}}</p>
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
import { isValidIdCardNo,isValidName} from '@/common/js/extends.js'
import axios from 'axios';
export default {
    name:'faceMsg',
    data:function(){
       return{
           warnIdcard: '',
           param:{
            idCardNo:'',//身份证号
            idCardName:'',//身份证姓名
            returnUrl:''//人脸识别后返回的Url
           },
           namewarn:'',
           token:''
       }
   },
    components:{Button,axios},//使用mint-ui的button的组件
    methods:{
    getDescribe:function(id){//拼接跳转链接
        //校验身份信息的内容；
        if(this.param.idCardNo==''){
            return;
        }else if(!isValidIdCardNo(this.param.idCardNo)){
            return;
        }

        if(this.param.idCardName==''){
            return;
        }else if(isValidName(this.param.idCardName)){
            return;
        }

        console.log(this.param)
        var that=this;
        Indicator.open();
        axios({
            method:'get',
            url:'/ning/wxservice/wxMemberInfo/getFaceToken',
            params:this.param
        })
        .then(function(res) {//成功之后
            Indicator.close();
            console.log(res.data.data);
            that.token=res.data.data.token;
            var bizId=res.data.data.bizId;
            localStorage.setItem('bizId',bizId);
            var bizId=localStorage.getItem('bizId');
            if(bizId!=''&&bizId!=undefined){
                window.location.href='https://api.megvii.com/faceid/lite/do?token='+that.token;
            }
            
        });
        },
        idCardNoFn:function(){
            if(this.param.idCardNo==''){
                return;
            }else if(!isValidIdCardNo(this.param.idCardNo)){
                this.$refs.warn.style.display='block';
                this.$refs.idCardNo.style='border-bottom:0.5px solid #df1e1d!important';
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
                this.$refs.name.style='border-bottom:0.5px solid #df1e1d!important';
                this.namewarn='请输入正确的姓名';
                return;
            }else{
                 console.log('none')
                this.$refs.namewarn.style.display='none';
                this.$refs.name.style='border-bottom:0.5px solid #efefef!important';
            }
        },
    },
    mounted:function(){
        var that = this;
       var returnUrl = this.$route.params.returnUrl;
       if(returnUrl&&returnUrl!=undefined){
           that.returnUrl=''+returnUrl;
       }
    }
}

</script>
<style>
 @import 'toSign.css'; /* 引入toSign.css文件*/
 body{
     padding-top:15px;
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
