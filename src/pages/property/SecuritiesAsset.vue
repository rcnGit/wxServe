<template>
    <div class='propertyList fColorFFF' style='min-height:430px;background: #fff;'>
        <div class='headContent2'>
                <p class='fSize13 pp1'>总金额（元）</p>
                <p class='pp2'>{{totalAsset}}</p> <!--在数字上加逗号 -->
                <p class='p3'>待确认：{{publicToConfirmAsset}}（元）</p><!--在数字上加逗号 -->
                <div style="overflow:hidden;padding-top: .6rem">
                    <div class='floatLeft w50 inc_box shouyi_left'>
                        <p class='fSize13'>日收益（元）</p>
                        <p class='p4'>{{publicYestIncome}}</p>
                    </div>
                    <div class='floatRight w50 inc_box'>
                        <p class='fSize13'>累计收益（元）</p>
                        <p class='p4'>{{publicAddIncome}}</p>
                    </div>
                </div>
        </div>
        <div class='proContent' >
            <div class="proDemo" v-for="(item,index) in inforList" :index='index' style="padding: .373333rem .386667rem;">
                <div class='proTop' style="padding-left:0;">
                    <!-- <img  class='floatLeft' src='./img/gLogo.png' /> -->
                    <span class='floatLeft bigP' style="padding-left:0;">{{item.fundName}} <span class='xindate'> {{item.fundCode}}</span></span>
                    
                </div>
                <div style='clear:both'></div>
                <div class='proBot asset_con'>
                    <span class='floatLeft smP'><span  class="jin_one" >金额（元）</span><br><em class="smp-number money_a">{{item.fundAsset}}</em></span>
                    <span class='floatRight shouyi rishouyi'><span  class="jin_one">持仓收益（元）</span><br><em :class='gC' class="money_b">{{getcolor(item.addIncome)}}</em></span>
                    <span class='floatRight shouyi '><span  class="jin_one">日收益<span>{{item.yesIncomeDate}}</span>（元）</span><br><em :class='gC2' class="money_b">{{getcolor2(item.yestIncome)}}</em></span>
                </div>
            </div>    
        </div>
        
        <!-- <comfooter></comfooter> -->
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
    name:'SecuritiesAsset',
    data:function(){
        return{
            loadObj:{
                text: '加载中...',
                spinnerType: 'triple-bounce'
            },
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0]
            },
            gC:'red',
            gC2:'red',
            ziC:'red',
            inforList:'',
            totalAsset:'--',//总资产
            privateTotalAsset:'',//私募总资产
            privateToConfirmAsset:'--',//私募待确认
            publicTotalAsset:'',//公募总资产
            publicToConfirmAsset:'',//公募待确认
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
        getcolor2:function(value){
            if(value.substring(0,1) == '-'){
                this.gC2='green'
            }else{
                this.gC2='red'
            }
            return value
        },
        getList:function(){
             var that=this;
             Indicator.open();
                axios({
                    method:'get',
                    url:'/wxservice/wxMemberInfo/getUserSecuritiesAsset',
                    params: {
                   // param:that.param,//系统类别
                        backUrl: that.paramurl
                    }
                })
                .then(function(res) {//成功之后
                    console.log(res)
                    Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode==-1){//系统异常
                       // MessageBox('提示', '系统异常');
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });
                    }else if(retCode == 400){
                        var serbackUrl = that.Host+'/wxservice/wxMemberInfo/getUserSecuritiesAsset';
                      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=SecuritiesAsset#wechat_redirect';
                    }else if(retCode==0){
                        var d=res.data.data;
                        that.totalAsset=that.money(d.securitiesTotalAsset)//总资产
                        that.publicToConfirmAsset=that.money(d.securitiesToConfirmAsset)//公募待确认资产
                        that.inforList = d.prodAssetList //资产列表
                        that.publicYestIncome = that.money(d.securitiesYestIncome)//公募最新总收益
                        that.publicAddIncome=that.money(d.securitiesAddIncome)//公募累计总收益
                    }
                   // var d=res.data.data;
                   // that.totalAsset=that.money(d.totalAsset)//总资产
                  //   that.totalAsset=that.money(d.privateTotalAsset)//总资产
                    //that.privateTotalAsset=that.money(d.privateTotalAsset)//私募总资产
                   //  that.privateToConfirmAsset=that.money(d.privateToConfirmAsset)//私募待确认
                    // that. publicTotalAsset=that.money(d.publicTotalAsset)//公募总资产
                    // if(d.publicYestIncome<0){//公募最新收益
                    //     that.gC='green'
                    // }else{
                    //     that.gC='red'
                    // }
                    // that.publicYestIncome=that.money(d.publicYestIncome)//公募最新收益
                    // that.publicAddIncome=that.money(d.publicAddIncome)//公募总收益
                    // that.securitiesTotalAsset=that.money(d.securitiesTotalAsset)//资管类总资产
                    // if(d.securitiesYestIncome<0){
                    //         that.zic='green';
                    // }
                    // that.securitiesYestIncome=that.money(d.securitiesYestIncome)//资管类最新收益
                    // that.securitiesAddIncome=that.money(d.securitiesAddIncome)//资管类总收益


                    // if(that.totalAsset=='0.00'&&that.privateToConfirmAsset=='0.00'){
                    //     that.$refs.contant.style.display='none';
                    //     that.$refs.nodata.style.display='block';
                    //     return;
                    // }else{
                    //     that.$refs.contant.style.display='block';
                    //     that.$refs.nodata.style.display='none';
                    // }
                   
                    // if(d.publicDate==''){
                    //     d.publicDate='--';
                    // }
                    // if(d.securitiesDate==''){
                    //     d.securitiesDate='--';
                    // }
                    // that.publicDate=d.publicDate//公募更新日期
                    // that.securitiesDate=d.securitiesDate//资管更新日期
                    
                   
                   
                });
        }
    },
    created:function(){
        this.GasyncSDKConifg()
        
        this.getList();
        
       
    }

}
</script>
<style>
@import 'propetry.css'; /* 引入toSign.css文件*/
.green{
    color:rgb(11,124,10);
}
.noData{
    background:#fff;
}
.noData img{
    width:2.24rem;
    margin:2.5rem auto 0;
}
.noData p{
    color:#757575;
    margin-top:.373333rem;
}
.xiazai{
    color:#4a90e2;
}
.comfooter{
     position: fixed;
     bottom: 0;
 }
 .headContent2{
    width:100%;
    height: 5.733333rem;
    background:url(./img/puil_bg.png) no-repeat center;
    background-size: 100%;
}
</style>

