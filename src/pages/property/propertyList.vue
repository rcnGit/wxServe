<template>
    <div class='propertyList fColorFFF'>
        <div class='headContent'>
                <p class='fSize13 p1'>总金额（元）</p>
                <p class='p2'>{{totalAsset}}</p> <!--在数字上加逗号 -->
                <p class='p3'>私募待确认：{{privateToConfirmAsset}}（元）</p><!--在数字上加逗号 -->
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
        <div class='noData' ref='nodata'>
                <img src='./img/noprop.png'/>
                <p class='fSize14'>您还没在大唐开启投资之旅哦</p>
                 <mt-button type="danger" size="large" class='next' @click='downApp ()'>去投资</mt-button>
         </div>
        <div class='proContent' ref='contant' style='display:none;'>
            <div class='proDemo'>
                <div class='proTop'>
                    <img  class='floatLeft'/>
                    <span class='floatLeft bigP'>私募</span>
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'>金额<em>{{privateTotalAsset}}</em></span>
                </div>
            </div>  <!-- proDemo -->
             <div class='proDemo'>
                <div class='proTop'>
                    <img  class='floatLeft'/>
                    <span class='floatLeft bigP'>公募</span>
                    <span class='floatRight'>更新日期：<em>{{publicDate}}</em></span>
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'>金额<em>{{publicTotalAsset}}</em></span>
                    <span class='floatRight'>最新收益<em class='red'>+{{publicYestIncome}}</em></span>
                </div>
            </div>  <!-- proDemo -->
             <div class='proDemo'>
                <div class='proTop'>
                    <img  class='floatLeft'/>
                    <span class='floatLeft bigP'>定期</span>
                    <span class='floatRight'>更新日期：<em>{{securitiesDate}}</em></span>
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'>金额<em>{{securitiesAddIncome}}</em></span>
                    <span class='floatRight'>最新收益<em class='red'>+{{securitiesYestIncome}}</em></span>
                </div>
            </div>  <!-- proDemo -->
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import axios from 'axios';
export default {
    name:'propertyList',
    data:function(){
        return{
            totalAsset:'0.00',//总资产
            privateTotalAsset:'',//私募总资产
            privateToConfirmAsset:'0.00',//私募待确认
            publicTotalAsset:'',//公募总资产
            publicYestIncome:'',//公募最新收益
            publicAddIncome:'',//公募总收益
            securitiesTotalAsset:'',//资管类总资产
            securitiesYestIncome:'',//资管类最新收益
            securitiesAddIncome:'',//资管类总收益
            publicDate:'',         //公募更新日期
            securitiesDate:''//资管更新日期
        }
    },
    components:{Button,axios},//使用mint-ui的button的组件
    methods:{
        getList:function(){
             var that=this;
                axios({
                    method:'get',
                    url:'/ning/wxservice/wxMemberInfo/getUserAsset',
                    params: {
                   // param:that.param,//系统类别
                    }
                })
                .then(function(res) {//成功之后
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode!=0){
                        console.log(retMsg);
                    }
                   console.log(res.data);
                   var d=res.data.data;
                    if(that.totalAsset=='0.00'){
                        console.log(that.$refs.contant);

                        that.$refs.contant.style.display='none';
                        that.$refs.nodata.style.display='block';
                        return;
                    }else{
                        that.$refs.contant.style.display='block';
                        that.$refs.nodata.style.display='none';
                    }
                    that.totalAsset=that.money(d.totalAsset)//总资产
                    that.privateTotalAsset=that.money(d.privateTotalAsset)//私募总资产
                    that.privateToConfirmAsset=that.money(d.privateToConfirmAsset)//私募待确认
                    that. publicTotalAsset=that.money(d.publicTotalAsset)//公募总资产
                    that.publicYestIncome=that.money(d.publicYestIncome)//公募最新收益
                    that.publicAddIncome=that.money(d.publicAddIncome)//公募总收益
                    that.securitiesTotalAsset=that.money(d.securitiesTotalAsset)//资管类总资产
                    that.securitiesYestIncome=that.money(d.securitiesYestIncome)//资管类最新收益
                    that.securitiesAddIncome=that.money(d.securitiesAddIncome)//资管类总收益
                    if(d.publicDate==''){
                        d.publicDate='--';
                    }
                    if(d.securitiesDate==''){
                        d.securitiesDate='--';
                    }
                    that.publicDate=d.publicDate//公募更新日期
                    that.securitiesDate=d.securitiesDate//资管更新日期
                   
                });
        },
        downApp:function() {
                let ua = navigator.userAgent.toLowerCase();
                //android终端
                let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
                let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
                if(false) {//isWeixinBrowser()//判断是不是微信
                   
                }else{
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    //ios
                    //this.ShowPop = !this.ShowPop;
                    //this.ShowDark = !this.ShowDark;
                    window.location='https://itunes.apple.com/cn/app/tang-guan-er-da-tang-cai-fu/id1011675066?mt=8';
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    //android
                    window.location = 'http://interface.tdyhfund.com/tgmgmt/file/apk/DTTangGuan.apk'
                }
                }
        
                function isWeixinBrowser() {
                    return (/micromessenger/.test(ua)) ? true : false;
                }
        }
    },
    created:function(){
        this.getList();
    }

}
</script>
<style>
@import 'propetry.css'; /* 引入toSign.css文件*/
.red{
    color:rgb(239,39,39);
}
.noData img{
    width:40%;
    margin:80px auto 0;
}
.noData p{
    color:rgb(197,197,197);
    margin-top:30px;
}
</style>


