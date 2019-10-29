<template>
    <div class='productSearchResult'>
            <div class='psr_1'>
                <div class='souBox'>
                    <input  name='' v-model='inputValue' placeholder="请输入产品名称或代码" class='psrInput'/>
                    <img src='../../common/img/search_img@2x.png' class='psr_sou'/>
                </div>
                <div class='souText' @click="toSou()">搜索</div>
            </div>
            <div style="clear:both;"></div>
            <div class='psr_2' id='yesBelong'>
                您好，您搜索的“<span class='blue'>{{proName}}</span>”属于大唐财富或其子公司销售/提供服务的产品。
            </div>
            <div class='psr_2' id='yesBelong2'>
                您好，您搜索的“<span class='blue'>{{proName}}</span>”是大唐财富关联公司唐信财富所提供服务的产品。
            </div>
            <div class='psr_2' id='noBelong'>
               <p>抱歉，未检测到您搜索的产品“{{inputValue}}”，请保证输入内容为完整的产品名称或完整的产品代码。</p>
               <p style="margin-top:0.5rem;">若已输入完整信息，则该产品<span style="color:#EF2727;">不是</span>大唐财富体系下公司销售或提供服务的产品，请谨慎选择。</p>
            </div>
            <div class='psr_3'></div>
            <div class='psr_4'><img src='./img/erweima.png' class='psr_erweima'/><p class='ps_4_p1'>长按识别二维码</p><p class='ps_4_p2'>下载大唐财富APP查看更多产品信息</p></div> 
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
             proName:'',//产品名称
             proType2:'',//产品类型 020801，020802定融定投
             proType2Cn:'',//产品类型中文 020801，020802定融定投
             proType:'',//产品投向
             proTypeCn:'',//产品投向中文
             
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
                        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=productSearchResult_'+that.inputValue+','+that.actName+','+that.ifCard+','+that.comefrom+','+that.recordId+','+Base64.encode(that.openId)+','+that.ghT+'#wechat_redirect';         
                    }
                    else{
                        MessageBox('', retMsg); 
                    }
                })
            },
            toSou:function(){
                var that=this;
                if(!that.inputValue==false){
                    that.sub();
                }else{
                    MessageBox('   ','请输入完整的产品名称或代码');
                }
            },
            sub:function(){
                    let that = this;
                    axios({
                        method:'get',
                        url:'/wxservice/wxexternal/queryMatchProinfo',//获取客户信息
                        params: {
                            param:{keywords:that.inputValue},//GD201909010
                        }
                    })
                    .then(function(res) {//成功之后
                        console.log(res.data)
                        var retCode=res.data.retCode;
                        var retMsg=res.data.retMsg; 
                        var data=res.data.data;
                        that.proName=data.proName;
                        that.proType2=data.proType2;
                        that.proType2Cn=data.proType2Cn;
                        that.proType=data.proType;
                        that.proTypeCn=data.proTypeCn;
                        if(retCode==0){
                               if(data.retCode == 0){
                                    if(that.proType2=='020801'||that.proType2=='020802'){//定融定投
                                        $('#yesBelong2').show();
                                    }else{
                                        $('#yesBelong').show();
                                    }
                                    
                                
                                }else if(data.retCode == -2){//不是我公司产品
                                    $('#noBelong').show();
                                }
                                else if(data.retCode == 400){
                                    // var serbackUrl = that.Host+'wxservice/wxservice?opName=queryMatchProinfo'
                                    // window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=productSearchResult_'+that.inputValue+','+that.actName+','+that.ifCard+','+that.comefrom+','+that.recordId+','+Base64.encode(that.openId)+','+that.ghT+'#wechat_redirect';         
                                }
                                else{
                                    MessageBox('', decodeURIComponent(data.retMsg)); 
                                }
                        }//0
                        else{
                            MessageBox('', retMsg); 
                        }
                    })
            },
    },
    mounted(){
        var that=this;
        that.clientHeight=window.outerHeight;
        $('.productSearchResult').height(that.clientHeight);
            
    },
    created(){
        var that=this;
        if(!that.$route.query.keywords==false){
            that.inputValue=that.$route.query.keywords;
            console.log(that.inputValue)
            that.sub();
        }else{
             that.inputValue=decodeURIComponent(that.$route.query.inputValue);
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
}
.blue{
    color:#0478EC;
}
/* .ps_2 input::-webkit-input-placeholder{
color: #999;
} */

.psr_4{
    width:5.5rem;
    height:5rem;
    position: absolute;
    bottom: 1.386667rem;
    left:50%;
    margin-left:-2.75rem;
    text-align: center;
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