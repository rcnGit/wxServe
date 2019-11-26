<template>
    <div class='Income'>
        <div class="wrapTop">
            <p class="newest"><span class="newestData"></span>元</p>
            <p class="tips">周末及节假日不更新收益，期间的收益会在周末及节假日后第一个交易日更新展示。</p>
        </div>
        <ul class="period">
                <li class="periodList">
                <!--  <div class="processRun clearfix">
                        <span class="date">2019-02-01</span>
                        <span class="runNum">23.67</span>
                    </div> -->
            </li>	
        
        </ul>
        <p class="referenceOnly">收益数据仅供参考<br />展示为近30天的收益明细</p>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
import comfooter from '../../components/footer'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import axios from 'axios';
export default {
    name:'PublicAsset',
    data:function(){
        return{
            showBottom:true,
            if_tishi:false,//是否显示提示
            loadObj:{
                text: '加载中...',
                spinnerType: 'triple-bounce'
            },
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone:''
            },
            showPublic:false,
            gC:'red',
            gC2:'red',
            ziC:'red',
            kong:'',
            inforList:'',
            totalAsset:'--',//总资产
            privateTotalAsset:'',//私募总资产
            privateToConfirmAsset:'--',//私募待确认
            publicTotalAsset:'',//公募总资产
            publicToConfirmAsset:'--',//公募待确认
            publicYestIncome:'',//公募最新收益
            publicAddIncome:'',//公募总收益
            securitiesTotalAsset:'',//资管类总资产
            securitiesYestIncome:'',//资管类最新收益
            securitiesAddIncome:'',//资管类总收益
            publicDate:'',         //公募更新日期
            securitiesDate:'',//资管更新日期
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/getUserPublicAsset'),//接口
            paramurl: location.href.split('?')[0]
        }
    },
    components:{Button,axios,Indicator,MessageBox,comfooter},//使用mint-ui的button的组件
    methods:{
        getcolor:function(value){
            if(value.substring(0,1) == '-'){
                this.gC='green'
            }else{
                this.gC='red'
            }
            return value
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
                    that.tgUserId=res.data.userInfo.tgUserId;//糖罐userID
                    that.getTotalIncome()//
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=tangShop#wechat_redirect';         
                }else{
                    MessageBox('', retMsg); 
                }
            })
        },
        getTotalIncome:function(){
             var that=this;
             var str='{"fundCode":"003075","trasactionAccountIdStr":"'+that.trasactionAccountIdStr+'","userId":"'+that.tgUserId+'"}';
             var param=Base64.encode(str);
             Indicator.open();
                axios({
                    method:'get',
                    url:'/csapp/tzg/tzgTotalIncome',//唐掌柜累计收益
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
        getList:function(){
             var that=this;
             Indicator.open();
                axios({
                    method:'get',
                    url:'/wxservice/wxMemberInfo/getUserPublicAsset'
                })
                .then(function(res) {//成功之后
                    console.log(res)
                    Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode==-2){//未身份认证
                        that.totalAsset='--';
                        that.$refs.wz.style.display='block';
                        return;
                    }else if(retCode==-1){//系统异常
                       // MessageBox('提示', '系统异常');
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });
                    }else if(retCode == 400){
                        var serbackUrl = that.Host+'/wxservice/wxMemberInfo/getUserPublicAsset';
                      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=PublicAsset#wechat_redirect';
                    }else if(retCode==0){
                        var d=res.data.data;
                        //console.log(d.prodAssetList[0].yestIncome)
                     //   d.prodAssetList[0].yestIncome = '-2,222'
                        that.totalAsset=d.publicTotalAsset//总资产
                        that.publicToConfirmAsset=d.publicToConfirmAsset//公募待确认资产
                        
                        that.publicYestIncome = d.publicYestIncome//公募最新总收益
                        that.publicAddIncome=d.publicAddIncome//公募累计总收益
                        if(d.prodAssetList != ''){
                            that.inforList = d.prodAssetList //资产列表
                            that.showPublic = false
                            if(d.prodAssetList.length>3){
                                that.showBottom = false
                            }else{
                                that.showBottom = true
                            }
                        }else{
                            that.showPublic = true;
                            that.showBottom = true
                        }
                        
                    }
                   
                   
                   
                });
        },
    },
    created:function(){
        // this.GasyncSDKConifg()
        // if(!this.$route.query.faceResult == false){
        //      //var bizId=localStorage.getItem('bizId');
        //     var bizId=decodeURIComponent(getCookie("bizId"));
        //     this.faceparam.bizId = bizId;           
        //     this.getfaceId();
        // }else{
        //      this.getList();
        // }
    }

}
</script>
<style>
.Income{padding-bottom: .4rem;box-sizing:border-box;}
.wrapTop{background-color:#ffffff;padding:0 .266667rem;box-sizing:border-box;padding-bottom: .586667rem;}
.newest{padding: .666667rem 0 .533333rem 0;text-align:center;color:#EF2727;font-weight:bold;font-size:0.4rem;}
.newestData{font-weight:500;font-size: .96rem;}
.tips{background-color:#F6F6F6;padding:.346667rem .32rem .346667rem .346667rem;box-sizing:border-box;border-radius: .106667rem;line-height:1.5;text-align: center;font-size:.32rem;color:#656565;}
.gap{height:.266667rem;background-color:#F9F9F9;margin-left: -0.4rem; margin-right: -0.4rem;}
.period{/* padding-top:0.56rem;padding-bottom:1.04rem; */padding:.266667rem .266667rem 1.386667rem .266667rem;box-sizing:border-box;}
.periodList{height: .746667rem;background-color:#ffffff;margin-bottom:.266667rem;position:relative;}
.processRun{width:100%;height:100%;position:absolute;top:0;left:0;padding:0 .266667rem;box-sizing:border-box;color:#ffffff;font-size: .293333rem;line-height: .746667rem;}
.date{float:left;}
.runNum{float:right;}
.noMoney{text-align:center;}
.noMoney img{width: 1.893333rem;margin: 4rem auto .666667rem;}
.noMoney p{color:#363636;font-size:0.32rem;}
.referenceOnly{width:100%;color:#bbbbbb;font-size:.32rem;text-align:center;}
</style>

