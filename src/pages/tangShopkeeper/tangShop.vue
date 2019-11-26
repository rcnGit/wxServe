<template>
<div>
    <div class="noBonds" v-if="haveBonds">
        <img class="shopkeeper" src="./img/shopkeeper.png">
        <p class="infor">唐掌柜是大唐财富推出的一款投资优选货币基金的理财工具</p>
        <div class="income">
            <p class="rate">{{TzgfundSumNet}}</p>
            <p class="description">七日年化收益率</p>
        </div>
        <p class="openBtn" @click="openBtn">开启唐掌柜理财</p>
    </div>
    <div class="Bonds" v-else>
       <div class='BondsContent'>
            <p class='BondsZong'>总金额（元）</p>
            <p class='BondAsset'>{{tzgTotalAsset}}</p>
            <p class='p3'>日收益（元）{{tzgIncomeDate}}：{{tzgYestIncome}}</p>
            <div style="overflow:hidden;padding-top: .4rem">
                <div class='bonds_li bonds_line' @click="toAccIncome">
                    <p class='bonds_p1'>累计收益（元）</p>
                    <p class='bonds_p2'>{{totalProfit}}</p>
                </div>
                <div class='bonds_li bonds_line'  @click="toUnitNet">
                    <p class='bonds_p1'>万份收益（元）</p>
                    <p class='bonds_p2'>{{unitNet}}</p>
                </div>
                <div class='bonds_li'  @click="tofundSumNet">
                    <p class='bonds_p1'>七日年化（%）</p>
                    <p class='bonds_p2'>{{fundSumNet}}</p>
                </div>
            </div>
        </div>
        <img class="TangBanner" src="./img/TangBanner.png" @click="toIntro">
        <div class="get-top">
            <span class="redline"></span>
            <p class="get-toptxt">可直接购买公募产品</p>
        </div>
        <div class="publicPro" v-for="(item,index) in publicList" :index='index' @click="toPublicDetail(item.fundCode)">
            <div class="public_card">公募</div>
            <p class="s_name"><span class="s_name_p">{{item.fundName}}</span><span class="pubType" :style="'color: '+item.prodTypeJson.text+';border-color:'+item.prodTypeJson.text">{{item.prodTypeJson.prodType}}</span></p>
            <div style="overflow: hidden;">
                <div class="sim_left">
                    <p class="gm_left_top Red" v-if="cut(item.json1.value)>=0">{{cut(item.json1.value)}}<span class="gm_top_let">%</span></p>
                    <p class="gm_left_top Green" v-else>{{cut(item.json1.value)}}<span class="gm_top_let">%</span></p>
                    <p class="gm_left_bot">{{item.json1.title}}</p>
                </div>
                <div class="sim_right">
                    <p class="gm_right_top">{{item.json2.title}}</p>
                    <p class="gm_right_bot">{{item.json2.value}}</p>
                </div>
            </div>
        </div>
        <p class="openBtn" @click="downloadBtn">下载大唐财富APP转入/转出唐掌柜</p>
    </div>
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
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Popup } from 'mint-ui';//底部出来的弹框
import { Toast } from 'mint-ui';
import comfooter from '../../components/footer'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import axios from 'axios';
import merge from 'webpack-merge'
export default {
    name:'tangShop',
    data:function(){
        return{
            haveBonds: true,
            loadObj:{
                text: '加载中...',
                spinnerType: 'triple-bounce'
            },
            subscribe:'',//是否关注
            erweimaUrl:'',//关注二维码的链接
            popupVisible:false,//弹框
            gC:'red',
            ziC:'red',
            tangC:'red',
            totalProfit:'',//【累计收益】
            unitNet:'',//【万分收益】
            fundSumNet:'',//【七日年化】
            startAmount:'',//【起投金额】（带入转入唐掌柜页）
            tzgTotalAsset:'',//【总金额】
            tzgYestIncome:'',//【昨日收益】
            tzgIncomeDate:'',
            trasactionAccountIdStr:'',//【交易账号字符串拼接】
            tzgAddIncomeUrl:'', //【唐掌柜累计收益url】
            tzgWanIncomeUrl:'', //【唐掌柜万份收益url】
            tzgSevenYearUrl:'',//【唐掌柜七日年化url】
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/getUserAsset'),//接口
            paramurl: location.href.split('?')[0],
            qiRate:'',
            publicList:[],
            isHoldPosition:'',
            TzgfundSumNet:'',//【七日年化】
        }
    },
    components:{Button,axios,Indicator,MessageBox,comfooter},//使用mint-ui的button的组件
    methods:{
        cut:function(str){
            if(str=='--'){

            }else{
                str = str.substr(0,str.length-1)
            }
            return str
        },
        cutStr:function(str){
            if(str=='--'){

            }else{
                str = str.substr(0,str.length-2)
            }
            return str
        },
        openBtn:function(){
            if(this.subscribe!=1){//0未关注
                this.getErweima();
            }else{
                if(this.isHoldPosition == 'N'){   //是否有持仓 Y-有  N-无
                    window.location='https://interface.tdyhfund.com/launcher/html/DTCF_Download.html';//跳转至大唐财富APP下载页面
                }else if(this.isHoldPosition == 'Y'){
                    this.haveBonds=false
                }
            }
        },
        downloadBtn:function(){
            if(this.subscribe!=1){//0未关注
                this.getErweima();
            }else{
                window.location='https://interface.tdyhfund.com/launcher/html/DTCF_Download.html';//跳转至大唐财富APP下载页面
            }
        },
        toIntro:function(){
           this.haveBonds=true
        },
        getUserInfo:function(){
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
                    if(!res.data.userInfo.tgUserId == false){
                        that.tgUserId=res.data.userInfo.tgUserId;//糖罐userID
                        that.getList()//获取是否有持仓
                    }else{
                        that.haveBonds = true
                    }
                    
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=tangShop#wechat_redirect';         
                }else{
                    MessageBox('', retMsg); 
                }
            })
        },
        getErweima:function(){
            var that=this;
            Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=cAppDownloadTzgSQRCode',//下载大唐财富APP二维码（交易唐掌柜）
                params: {
                    param:{
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
        getList:function(){
             var that=this;
             Indicator.open();
                axios({
                    method:'get',
                    url:'/wxservice/wxMemberInfo/getUserAsset',
                    params: {
                    }
                })
                .then(function(res) {//成功之后
                    console.log(res.data)
                    Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode==-2){//未身份认证
                        that.haveBonds = true
                    }else if(retCode==-1){//系统异常
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });
                    }else if(retCode == 400){
                        var serbackUrl = that.Host+'wxservice/wxMemberInfo/getUserAsset'
                        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=tangShop#wechat_redirect';
                    }else if(retCode == 0){
                        var d=res.data.data;
                        that.isHoldPosition=d.isHoldPosition
                        if(that.isHoldPosition == 'Y'){   //是否有持仓 Y-有  N-无
                            that.haveBonds = false
                            that.getTzgAssetInfo()//获取唐掌柜资产详情
                            that.getProductPublic()//公募列表
                        }else{
                            that.haveBonds = true
                        }
                    }
                    
                });
        },
        getTzgfundSumNet:function(){
             var that=this;
             var param=Base64.encode('{"fundCode":"003075"}');
             Indicator.open();
                axios({
                    method:'get',
                    url:'/csapp/tzg/queryTzgProductInfoByFundcode',//获取唐掌柜首页七日年化
                    params: {
                        param:param,
                        osFlag:'3'
                    }
                })
                .then(function(res) {//成功之后
                    var data=Base64.decode(res.data);
                    data=jQuery.parseJSON(data);
                    console.log(data)
                    Indicator.close();
                    var retCode=data.retCode;
                    var retMsg=data.retMsg;
                    if(retCode == 0){
                        that.TzgfundSumNet = data.data.fundSumNet
                    }else if(retCode==-1){//系统异常
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });
                    }
                    
                });
        },
        getTzgAssetInfo:function(){
             var that=this;
             Indicator.open();
                axios({
                    method:'get',
                    url:'/csapp/tzg/queryTzgAssetInfo',//查询唐掌柜资产详情tg20.7
                    params: {
                        userId:that.tgUserId,
                      //  userId:'c6d6867ae2ae49c7b74a2a54fe06020e',
                        osFlag:'3'
                    }
                })
                .then(function(res) {//成功之后
                    var data=Base64.decode(res.data);
                    data=jQuery.parseJSON(data);
                    console.log(data)
                    Indicator.close();
                    var retCode=data.retCode;
                    var retMsg=data.retMsg;
                    if(retCode == 0){
                        that.fundSumNet=data.data.fundSumNet;//【七日年化】
                        that.totalProfit=data.data.totalProfit;  //【累计收益】
                        that.unitNet=data.data.unitNet;  //【万分收益】
                        that.startAmount=data.data.startAmount; //【起投金额】（带入转入唐掌柜页）
                        that.tzgTotalAsset=data.data.tzgTotalAsset; //【总金额】
                        that.tzgYestIncome=data.data.tzgYestIncome; //【昨日收益】
                        that.tzgIncomeDate=data.data.tzgIncomeDate; 
                        that.trasactionAccountIdStr=data.data.trasactionAccountIdStr; //【交易账号字符串拼接】
                        that.tzgAddIncomeUrl=data.data.tzgAddIncomeUrl; //【唐掌柜累计收益url】
                        that.tzgWanIncomeUrl=data.data.tzgWanIncomeUrl; //【唐掌柜万份收益url】
                        that.tzgSevenYearUrl=data.data.tzgSevenYearUrl; //【唐掌柜七日年化url】
                    }else if(retCode==-1){//系统异常
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });
                    }
                    
                });
        },
        getProductPublic:function(){
             var that=this;
             var param=Base64.encode('{"fundType":"6"}');
             Indicator.open();
                axios({
                    method:'get',
                    url:'/olmgweb/tgApi/getProductPublic',//产品推荐-公募中台1.2
                    params: {
                        param:param,
                        osFlag:'3'
                    }
                })
                .then(function(res) {//成功之后
                    var data=Base64.decode(res.data);
                    data=jQuery.parseJSON(data);
                    console.log(data)
                    Indicator.close();
                    var retCode=data.retCode;
                    var retMsg=data.retMsg;
                    if(retCode == 0){
                        that.publicList = data.list6
                    }else if(retCode==-1){//系统异常
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });
                    }
                    
                });
        },
        toAccIncome:function() {
            // this.$router.push({
            //     path:'/accIncome',
            //     name:'accIncome',
            //     query:{
            //         traStr:this.trasactionAccountIdStr//交易账号拼接
            //     }
            // }) 
           // window.location.href=this.tzgAddIncomeUrl+"&fundCode=003075&userId="+this.tgUserId+"&trasactionAccountIdStr="+this.trasactionAccountIdStr+"&totalProfit"+this.totalProfit
            window.location.href=this.tzgAddIncomeUrl
        },
        toUnitNet:function() {
            window.location.href=this.tzgWanIncomeUrl
        },
        tofundSumNet:function() {
            window.location.href=this.tzgSevenYearUrl
        },
        toPublicDetail:function(fundCode){
            var urlCan = '{"fundCode":"'+fundCode+'"}';
				urlCan = Base64.encode(urlCan);	
			window.location.href=this.TGhost+'/dthtml/HTML5/DTCF/html/public_product_Revision/fund_details.html?paramCan='+urlCan+'&shareFlag=1'
        }
    },
    created:function(){
        this.GasyncSDKConifg()
        this.getUserInfo()
        this.getTzgfundSumNet()//获取七日年化
    }

}
</script>
<style>
.shopkeeper{width:100%;position:relative;}
.noBonds .infor{width:100%;height: .64rem;position:absolute;top:0;left:0;box-sizing:border-box;color:#FDF1D6;line-height: .64rem;font-size: .32rem;padding-top: .213333rem;}
.noBonds .income{ width: 100%;position:absolute;top:7%;left:0;text-align: center;color:#ffffff;/* font-weight:bold; */}
.noBonds .rate{font-size: 1.2rem;}
.noBonds .description{font-size: .346667rem;font-weight:normal;padding-top: .2rem;}
.openBtn{
    width:100%;height: 1.546667rem;
    position: fixed;
    bottom: 0;
    background: #DF3F3F;
    color: #fff;
    font-size: .453333rem;
    font-weight: 500;
    line-height: 1.546667rem;
}
.noBonds{
    padding-bottom: 1.546667rem;
}
.BondsContent{
    background:linear-gradient(90deg,rgba(223,63,63,1) 0%,rgba(231,77,77,1) 44%,rgba(241,94,94,1) 100%);
    width: 100%;
    color: #fff;
    padding: .466667rem 0 0;
}
.BondsZong{
    font-size: .346667rem;
    color: #FFC3C3;
}
.BondAsset{
    font-size: .693333rem;
    font-weight:500;
    line-height: .986667rem;
    padding-top: .1rem;
}
.Bonds{
    padding-bottom: 1.6rem;
}
.Bonds .p3{
    font-size: .346667rem;
    line-height: .48rem;
}
.bonds_li{
    float: left;
    width: 33.33%;
    text-align: center;
    position: relative;
    padding: .15rem 0;
}
.bonds_line:after {
    content: "";
    width: 1px;
    height: 1.2rem;
    background: #FC8B8B;
    position: absolute;
    top: .1rem;
    left: 100%;
}
.bonds_p1{
    color: #FFC3C3;
    font-size: .32rem;
}
.bonds_p2{
    color: #FFF;
    font-size: .373333rem;
    padding: .3rem 0 .2rem;
    font-weight: 400;
}
.TangBanner{
    width: 9.2rem;
    height: 2.56rem;
    margin: .4rem auto;
}
.get-top{
    overflow: hidden;
    padding: .4rem 0 .533333rem .426667rem;
}
.redline{
    width: .106667rem;
    height: .426667rem;
    background:rgba(241,42,42,1);
    border: .026667rem solid rgba(241,42,42,1);
    border-radius: .053333rem;
    float: left;
}
.get-toptxt{
    float: left;
    color: #2A2A2A;
    font-size: .373333rem;
    line-height: .486667rem;
    /* font-weight: 600; */
    padding-left: .24rem;
}
.publicPro{
    width: 9.6rem;
    height: 3.04rem;
    background: url(./img/productBg.png) no-repeat;
    background-size: 9.6rem 3.04rem;
    border-radius: .106667rem;
    margin: -.1rem .2rem 0rem .163333rem;
    padding: .5rem .666667rem .3rem;
    position: relative;
}
.s_name{
    text-align: left;
    position: relative;
}
.s_name_p{
    font-size: .373333rem;
    font-weight:500;
    line-height: .426667rem;
    color:rgba(59,59,59,1);
}
.pubType{
    border: .022rem solid rgba(251,213,170,1);
    color: rgba(251,213,170,1);
    border-radius: .053333rem;
    font-size: .266667rem;
    font-weight:400;
    padding: .08rem .15rem .03rem;
    margin-left: .24rem;
    position: absolute;
    top: -.02rem;
}
.sim_left{
    float: left;
    text-align: left;
}
.gm_left_top{
    font-size: .64rem;
    font-weight:500;
    padding-top: .3rem;
}
.gm_left_bot{
    font-size: .293333rem;
    font-weight:400;
    line-height: .426667rem;
    color:rgba(122,122,122,1);
    padding-top: .1rem;
}
.Red{
    color:#EF2727;
}
.Green{
    color:rgb(11,124,10);
}
.sim_right{
    float: right;
    text-align: left;
    width:28%;
}
.gm_right_top{
    font-size: .48rem;
    color:rgba(152,106,60,1);
    padding-top: .32rem;
}
.gm_right_bot{
    font-size: .453333rem;
    color:rgba(122,122,122,1);
    padding-top: .14rem;
}
.public_card{
    width: 1.173333rem;
    height: .453333rem;
    font-size: .266667rem;
    line-height:.453333rem;
    color:rgba(255,255,255,1);
    background:rgba(225,28,28,1);
    position: absolute;
    right: .22rem;
    top: .19rem;
    border-radius: 0 .2rem 0 .2rem;
    padding-top: .02rem;
}
.gm_top_let{
    font-size: .4rem;
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
</style>


