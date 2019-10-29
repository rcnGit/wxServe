<template>
    <div class='productSearch'>
            <div class='ps_1'>
                <p class='ps_p1'>搜索产品</p>
                <p class='ps_p2'>验证产品是否由大唐财富体系下公司销售或提供服务</p>
            </div>
            <div class='ps_2'>
                <input  name='' v-model='inputValue' placeholder="请输入产品名称或代码"/>
                <img src='./img/sou.png' class='ps_sou' @click="toResult()"/>
            </div>
            <div class='ps_3'><img src='./img/tishi.png' class='ps_tishi'/><span class='ps_3_sp'>不支持模糊搜索，只有输入<span style='color:#EF2727;'>完整的</span>产品名称、代码才能搜索出正确的结果哦~</span></div>
            <div class='ps_4'><img src='./img/logo@2x.png' class='ps_logo'/></div>
            <mt-popup v-model="popupVisible" position="center" pop-transition="popup-fade" >
            <div class='pop_contant pop_contant_A' ref='pop_contant'>
                <div class='popImgBox_A'>
                    <img :src='erweimaUrl' style='width:180px;height:180px;display: block;margin:94px auto 10px;'/>
                    <p style='color:#333;font-size:14px;text-align:center;margin: 24px auto 8px;'>长按二维码</p>
                    <p style='color:#333;font-size:14px;text-align:center;'>关注大唐财富服务号后完成报名</p>
                </div>
            </div> <!--pop_contant -->
            </mt-popup> 
    
    </div>
</template>
<script>
let Base64 = require('js-base64').Base64;
import wx from 'weixin-js-sdk';
import { Popup } from 'mint-ui';//底部出来的弹框
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//   框
import { Toast } from 'mint-ui';
import { getCookie,setCookie } from '@/common/js/cookie.js'
import axios from 'axios'
import merge from 'webpack-merge'
import { Script } from 'vm';

export default{
    name:'productSearch',
    data:function(){
        return{
            clientHeight:'',//浏览器窗口的高
            inputValue:'',//输入框的文字
            subscribe:'1',//是否关注
            erweimaUrl:'',//关注二维码的链接
            popupVisible:false,//弹框
            paramurl: location.href.split('?')[0],
        }
    },
    methods:{
        toResult:function(){
            var that=this;
            console.log(that.inputValue);
            if(!that.inputValue==false){//有值
                if(that.subscribe!=1){//0未关注
                    that.getErweima();
                }else{
                    that.inputValue=encodeURIComponent(that.inputValue);
                    //跳转搜索结果页面
                     that.$router.push({
                        path:'/productSearchResult',
                        name:'productSearchResult',
                        query:{
                        inputValue:that.inputValue,
                        }
                    })
                }
            }else{
               MessageBox('   ','请输入完整的产品名称或代码');
            }
        },
        authentic:function(){
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取客户信息
                params: {
                    backUrl: that.paramurl,
                }
            })
            .then(function(res) {//成功之后
                console.log(res.data);
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg; 
                if(retCode == 0){
                    that.subscribe=res.data.userInfo.subscribe;//是否关注
                 
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=productSearch_#wechat_redirect';         
                }
                else{
                    MessageBox('', retMsg); 
                }
            })
        },
        getErweima:function(){
            var that=this;
             Indicator.open();
             if(that.businesscardShow == false){
                that.ghT =''
             }
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=cPrdSearchSQRCode',//获取二维码
                params: {
                    param:{
                         keywords:that.inputValue,
                    }
                }
            })
            .then(function(res) {
                 Indicator.close();
                 console.log(res.data)
                var retCode=res.data.retCode;
                if(retCode==0){
                    //获取二维码成功
                    var url=res.data.url;
                    that.popupVisible=true;//出现弹框
                    that.erweimaUrl=url;
                }else{
                   
                }
                })//
        },

    },
    mounted(){
        var that=this;
        that.clientHeight=window.outerHeight;
        $('.productSearch').height(that.clientHeight);
          
    },
    created(){
        var that=this;
       // that.authentic(); 
    }
}
</script>

<style>
.productSearch{
    width:100%;
    min-height:15rem;
    background:url(./img/bg.png) no-repeat fixed;
    background-size: cover;
    background-position-y:bottom;
    padding:0 .72rem;
    box-sizing: border-box;
    text-align: left;
    position: relative;
    font-family:PingFang SC;
}
.ps_1{
    padding-top: 1.786667rem;
}
.ps_p1{
    font-size: .4rem;
    font-family:PingFang SC;
    font-weight:600;
    color:rgba(42,42,42,1);
}
.ps_p2{
    font-size: .346667rem;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(42,42,42,1);
    margin-top: .12rem;
}
.ps_2{
    margin-top:1.253333rem;
    position: relative;
}
.ps_2 input{
    display: block;
    width:100%;
    border:1px solid rgba(238,238,238,1);
    background:rgba(255,255,255,1);
    border-radius:7px;
    height:1.093333rem;
    font-size: .373333rem;
    box-sizing: border-box;
    padding-left:.266667rem;
    padding-right:1rem;
    outline: none;
}

.ps_2 input::-webkit-input-placeholder{
color: #999;
}
.ps_sou{
    width:.48rem;
    position: absolute;
    top:0.3rem;
    right: .266667rem;
}
.ps_3{
    margin-top: .533333rem;
    font-size: .32rem;
    font-family:PingFang SC;
    line-height: .463333rem;
    color:rgba(99,99,99,1);
    padding:0 .1rem;
    
}
.ps_tishi{
    width:.32rem;
    margin-right:.133333rem;
    display: block;
    float: left;
    padding-top: 0.053rem;
}
.ps_3_sp{
    display: block;
    float: left;
    width: calc(100% - .5rem);
}
.ps_4{
    width:1.226667rem;
    height:1.226667rem;
    position: absolute;
    bottom: 1.386667rem;
    left:50%;
    margin-left:-0.6rem;
}
.pop_contant_A{
 background:url(../activeSign/img/weimaBg.png) no-repeat!important; 
width:280px!important;
background-size:cover!important;
height:360px!important;
}
.mint-popup.mint-popup-center{
    border-radius: 10px;
}
.popImgBox_A{
    padding: 0!important;
    width:100%;
    overflow: hidden
}
.ps_logo{
    display: block;
    width:100%;
    height:100%;
}
</style>