<template>
    <div class='propertyList fColorFFF' style='min-height:430px;background: #fff;'>
        <div class='headContent'>
                <p class='fSize13 pp1'>总金额（元）</p>
                <p class='pp2'>{{totalAsset}}</p> <!--在数字上加逗号 -->
                <p class='p3'>待确认：{{privateToConfirmAsset}}（元）</p><!--在数字上加逗号 -->
                <div style='display:none;'>
                    <div class='floatLeft w50 inc_box' style='border-right:0.5px solid #efefef;'>
                        <p class='fSize13'>最新收益（元）</p>
                        <p class='p4'>+260000</p>
                    </div>
                    <div class='floatRight w50 inc_box'>
                        <p class='fSize13'>累计收益（元）</p>
                        <p class='p4'>+260000</p>
                    </div>
                </div>
        </div>
        <div class='proContent'>   
            <div class="proDemo" v-for="(item,index) in inforList" :index='index'>
                    <div class='proTop'>
                        <!-- <img  class='floatLeft' src='./img/gLogo.png' /> -->
                        <span class='floatLeft bigP'>{{item.proName}}</span>
                        <span class='floatLeft xindate TypeValue'>{{item.proTypeValue}}</span>
                    </div>
                    <div style='clear:both'></div>
                    <div class='proBot'>
                        <span class='floatLeft smP'><span class="jin_one">金额（元）</span><br><em class="smp-number money_a">{{item.busiAmount}}</em></span>
                        <span class='floatRight shouyi'><span class="jin_one">最新净值（{{item.navDate}}）</span><br><em class="money_a">{{item.nav}}</em></span>
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
    name:'PrivateAsset',
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
            ziC:'red',
            inforList:'',
            totalAsset:'--',//总资产
            privateTotalAsset:'',//私募总资产
            privateToConfirmAsset:'--',//私募待确认
            publicTotalAsset:'',//公募总资产
            publicYestIncome:'',//公募最新收益
            publicAddIncome:'',//公募总收益
            securitiesTotalAsset:'',//资管类总资产
            securitiesYestIncome:'',//资管类最新收益
            securitiesAddIncome:'',//资管类总收益
            publicDate:'',         //公募更新日期
            securitiesDate:'',//资管更新日期
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/getUserAsset'),//接口
            paramurl: location.href.split('?')[0]
        }
    },
    components:{Button,axios,Indicator,MessageBox,comfooter},//使用mint-ui的button的组件
    methods:{
        getList:function(){
             var that=this;
             Indicator.open();
                axios({
                    method:'get',
                    url:'/wxservice/wxMemberInfo/getUserPrivateAsset',
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
                        var serbackUrl = that.Host+'/wxservice/wxMemberInfo/getUserPrivateAsset';
                      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=PrivateAsset#wechat_redirect';
                    }else if(retCode==0){
                        var d=res.data.data;
                        that.totalAsset=that.money(d.privateTotalAsset)//总资产
                        that.privateToConfirmAsset=that.money(d.privateToConfirmAsset)//私募待确认
                        that.inforList = d.prodAssetList
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
</style>


