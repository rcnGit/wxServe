<template>
    <div class='productSearchResult'>
            <div class='psr_1'>
                <div class='souBox'>
                    <input  name='' v-model='inputValue' placeholder="请输入完整的产品名称或代码" class='psrInput'/>
                    <img src='../../common/img/search_img@2x.png' class='psr_sou'/>
                </div>
                <div class='souText' @click="toSou()">搜索</div>
            </div>
            <div style="clear:both;"></div>
            <div class='psr_2' id='yesBelong'>
                您好，您搜索的“<span :class='blues' @click="toDetail">{{proName}}</span>”属于大唐财富或其子公司销售/提供服务的产品。
            </div>
            <div class='psr_2' id='yesBelong2'>
                您好，您搜索的“<span class='blue' @click="toDetail">{{proName}}</span>”是大唐财富关联公司唐信财富所提供服务的产品。
            </div>
            <div class='psr_2' id='noBelong'>
               <p>抱歉，未检测到您搜索的产品“{{inputName}}”，请保证输入内容为完整的产品名称或完整的产品代码。</p>
               <p style="margin-top:0.5rem;">若已输入完整信息，则该产品<span style="color:#EF2727;">不是</span>大唐财富体系下公司销售或提供服务的高端理财产品，请谨慎选择。</p>
            </div>
            <div class='psr_3'></div>
            <div class='psr_4'><img src='./img/erweima.png' class='psr_erweima'/><p class='ps_4_p1'>长按识别二维码</p><p class='ps_4_p2'>下载大唐财富APP查看更多产品信息</p></div> 
            <mt-popup v-model="popupVisible" position="center" pop-transition="popup-fade" >
            <div class='pop_contant pop_contant_A' ref='pop_contant'>
                <div class='popImgBox_A'>
                    <img :src='erweimaUrl' style='width:180px;height:180px;display: block;margin:94px auto 10px;'/>
                    <p style='color:#333;font-size:14px;text-align:center;margin: .9rem auto .1rem'>长按二维码</p>
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
    name:'productSearchResult',
    data:function(){
        return{
             clientHeight:'',//浏览器窗口的高
             paramurl: location.href.split('?')[0],
             inputValue:'',
             subscribe:'',//是否关注
             erweimaUrl:'',//关注二维码的链接
             popupVisible:false,//弹框
             proName:'',//产品名称
             proType2:'',//产品类型 020801，020802定融定投
             proType2Cn:'',//产品类型中文 020801，020802定融定投
             proType:'',//产品投向
             proTypeCn:'',//产品投向中文
             proCode:'',
             inputName:'',
             blues:'blue',
        }
    },
    methods:{
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
                console.log(res.data)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg; 
                if(retCode == 0){
                    that.subscribe=res.data.userInfo.subscribe;//是否关注
                
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=productSearchResult_'+that.inputValue+'#wechat_redirect';         
                }
                else{
                    MessageBox('', retMsg); 
                }
            })
        },
        toSou:function(){
            var that=this;
            if(!that.inputValue==false){
                if(that.subscribe!=1){//0未关注
                    that.getErweima();
                }else{
                    that.sub()
                }
            }else{
                MessageBox('   ','请输入完整的产品名称或代码');
            }
        },
        sub:function(){
            Indicator.open();
            let that = this;
            that.inputValue=decodeURIComponent(that.inputValue);
            axios({
                method:'get',
                url:'/wxservice/wxexternal/queryMatchProinfo',//
                params: {
                    param:{keywords:that.inputValue},//GD201909010
                }
            })
            .then(function(res) {//成功之后
                console.log(res.data)
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg; 
                var data=res.data.data;
                if(retCode==0){
                    that.proName=data.proName;
                    that.proType2=data.proType2;
                    that.proType2Cn=data.proType2Cn;
                    that.proType=data.proType;
                    that.proTypeCn=data.proTypeCn;
                    if(data.retCode == 0){
                        that.proCode=data.proCode;
                        if(that.proType2=='020801'||that.proType2=='020802'){//定融定投
                            $('#yesBelong2').show();
                            $('#yesBelong').hide();
                            $('#noBelong').hide();
                        }else{
                            $('#yesBelong').show();
                            $('#yesBelong2').hide();
                            $('#noBelong').hide();
                            if(that.proType == '0'||that.proType == '1'||that.proType == '2'||that.proType == '3'||that.proType == '4'||that.proType == '5'||that.proType == '14'||that.proType2.substr(0,4) == '0201'){
                                that.blues='blue'
                            }else{
                                that.blues=''
                            }
                        }
                    }else if(data.retCode == -2){//不是我公司产品
                        let obj = JSON.parse(JSON.stringify(that.inputValue));
                        that.inputName = obj
                        $('#noBelong').show();
                        $('#yesBelong2').hide();
                        $('#yesBelong').hide();
                    }else{
                        MessageBox('', decodeURIComponent(data.retMsg)); 
                    }
                }else if(retCode == 400){
                    var serbackUrl = '/wxservice/wxexternal/queryMatchProinfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=productSearchResult_'+that.inputValue+'#wechat_redirect';         
                }else{
                    MessageBox('', retMsg); 
                }
            })
            that.authentic()
        },
        toDetail:function(){
            console.log(this.blues)
            if(this.blues=='blue'){
                var urlCan = '{"prodCode":"'+this.proCode+'","source":"wx"}';
				urlCan = Base64.encode(urlCan);	
                window.location.href=this.TGhost+'/dthtml/HTML5/DTCF/html/privateRefactoring/private_product.html?paramCan='+urlCan+'&shareFlag=1'
            }
        },
        getErweima:function(){
            var that=this;
            Indicator.open();
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
        $('.productSearchResult').height(that.clientHeight);
            
    },
    created(){
        this.GasyncSDKConifg('product')
        if(!this.$route.query.actId==false){ //重定向后
            this.inputValue=this.$route.query.actId;
            this.sub();
        }else{
            if(!this.$route.query.keywords==false){
                this.inputValue=this.$route.query.keywords;
                console.log(this.inputValue)
                this.sub();
            }
        }
        
    }
}
</script>

<style>
.productSearchResult{
    width:100%;
    background:#fff;
    box-sizing: border-box;
    text-align: left;
    position: relative;
    font-family:PingFang SC;
}
.souBox{
    width:calc(100% - 1.52rem);
    float: left;
    height: .8rem;
    position: relative;
    padding:0 0 0 .48rem;
    box-sizing: border-box;
    margin-top: .48rem;
}
.psrInput{
    display: block;
    width:100%;
    border:1px solid rgba(238,238,238,1);
    background:#F6F6F6;
    border-radius:.533333rem;
    height:.8rem;
    font-size: .32rem;
    box-sizing: border-box;
    padding-left:.8rem;
    outline: none;
    color:#3B3B3B;
    box-shadow: none;
    outline-color: invert ;
	outline-style: none ;
	outline-width: 0px ;
	text-shadow: none ;
	-webkit-appearance: none ;
	-webkit-user-select: text ;
	outline-color: transparent ;
    box-shadow: none;
    opacity: 1;
}
.souText{
    width:20%;
    float: left;
    font-size:.346667rem;
    font-weight:500;
    color:rgba(59,59,59,1);
    text-align: center;
    line-height:.8rem;
    width:1.52rem;
    margin-top: .48rem;
}

.psr_sou{
    width:.373333rem;
    position: absolute;
    left: .75rem;
    top:0.2rem;
}
.psr_2{
    margin-top:1.333333rem;
    font-size:.373333rem;
    font-weight:400;
    line-height:.533333rem;
    color:rgba(54,54,54,1);
    padding:0 .693333rem;
    display: none;
    position: absolute;
}
.blue{
    color:#0478EC;
}
.psrInput::-webkit-input-placeholder{
    color: #d2cfcf; 
    font-size: .32rem;
    margin-top: -0.05rem;
} 

.psr_4{
    width:5.5rem;
    height:5rem;
    /* position: fixed;
    bottom: 1.386667rem;
    left:50%; 
    margin-left:-2.75rem;*/
    text-align: center;
    margin: 8rem auto 0;
}
.ps_4_p1{
    font-size: .32rem;
    color:#666666;
    margin-top:.533333rem;
}
.ps_4_p2{
    font-size: .32rem;
    color:#666666;
    margin-top:.133333rem;
}
.psr_erweima{
    display: block;
    width:3.626667rem;
    margin:0 auto;
}
</style>