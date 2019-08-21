<template>
    <div class='propertyList fColorFFF' style='min-height:430px;background: #fff;'>
        <div class='headContent'>
                <div @click="openEye" class="open_sel" v-show='showEyes'>
                    <img src="./img/eye.png" v-if="eyeShow" class='eye'/>
                    <img src='./img/hideye.png' class='eye' v-else/> 
                </div>
                <p class='fSize13 pp1' style="padding-top:0.78rem;">总金额（元）</p>
                <p class='pp2' v-if="showAsset">{{totalAsset}}</p><p class='pp2' v-else>*****</p> <!--在数字上加逗号 -->
                <p class='p3' v-if="showAsset">待确认：{{privateToConfirmAsset}}（元）</p><p class='p3' v-else>待确认：*****</p><!--在数字上加逗号 -->
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
        <div class='noData asset_nodata' ref='nodata' style="display:none;">
                <img src='./img/noprop.png'/>
                <p class='fSize16' style="font-size: .3733rem">您还没在大唐开启投资之旅哦</p>
                 <mt-button type="danger" size="large" class='next' @click='downApp ()' style="margin-top:0.72222rem;">去投资</mt-button>
         </div>
        <div class='proContent proper_list' ref='contant' style='display:none;'>
            <div class='proDemo' >
                <div class='proTop'>
                    <!-- <img  class='floatLeft' src='./img/gLogo.png' /> -->
                    <span class='floatLeft bigP'>唐掌柜</span>
                    <!-- <span class='floatRight xindate'>更新日期：<em>{{publicDate}}</em></span> -->
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'><span class="jin_one">金额（元）</span><br><em class="smp-number money_a" v-if="showAsset">{{tangTotalAsset}}</em><em class="smp-number money_a" v-else>*****</em></span>
                    <span class='floatRight shouyi'><span class="jin_one">最新收益（{{tangDate}}）</span><br><em :class='tangC' style="line-height:0.7rem;" v-if="showAsset">{{tangYestIncome}}</em><em :class='tangC' style="line-height:0.7rem;" v-else>*****</em></span>
                </div>
            </div>  <!-- proDemo -->
            <div class='proDemo' @click="jumpPrivate">
                <div class='proTop'>
                    <!-- <img  class='floatLeft'src='./img/sLogo.png'/> -->
                    <span class='floatLeft bigP'>私募</span>
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'><span class="jin_one">金额（元）</span><br><em class="smp-number money_a" v-if="showAsset">{{privateTotalAsset}}</em><em class="smp-number money_a" v-else>*****</em></span>
                </div>
            </div>  <!-- proDemo -->
             <div class='proDemo'  @click="jumpPublic">
                <div class='proTop'>
                    <!-- <img  class='floatLeft' src='./img/gLogo.png' /> -->
                    <span class='floatLeft bigP'>公募</span>
                    <!-- <span class='floatRight xindate'>更新日期：<em>{{publicDate}}</em></span> -->
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'><span class="jin_one">金额（元）</span><br><em class="smp-number money_a" v-if="showAsset">{{publicTotalAsset}}</em><em class="smp-number money_a" v-else>*****</em></span>
                    <span class='floatRight shouyi'><span class="jin_one">最新收益（{{publicDate}}）</span><br><em :class='gC' style="line-height:0.7rem;" v-if="showAsset">{{publicYestIncome}}</em><em :class='gC' style="line-height:0.7rem;" v-else>*****</em></span>
                </div>
            </div>  <!-- proDemo -->
             <div class='proDemo' @click="jumpSecurities">
                <div class='proTop'>
                    <!-- <img  class='floatLeft'src='./img/dLogo.png'/> -->
                    <span class='floatLeft bigP'>资管理财</span>
                    <!-- <span class='floatRight xindate'>更新日期：<em>{{securitiesDate}}</em></span> -->
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'><span class="jin_one">金额（元）</span><br><em class="smp-number money_a" v-if="showAsset">{{securitiesTotalAsset}}</em><em class="smp-number money_a" v-else>*****</em></span>
                    <span class='floatRight shouyi'><span class="jin_one">最新收益（{{securitiesDate}}）</span><br><em :class='ziC' style="line-height:0.7rem;" v-if="showAsset">{{securitiesYestIncome}}</em><em :class='ziC' style="line-height:0.7rem;" v-else>*****</em></span>
                </div>
            </div>  <!-- proDemo -->
        </div>
        <div class='wz'ref='wz' style="background:#fff;display:none;" >
            <img src='../../common/img/wr.png'  style='width:27%;margin:2.8rem auto 0.5rem;'/>
            <p class='fSize16' style='color:#333'>身份认证后可查看我的资产哦~</p>
        <mt-button type="danger" size="large" class='next' @click='rz()' style='margin-top:1.4rem;'>去人脸识别身份认证</mt-button>
        </div>
        <comfooter v-if="showBottom"></comfooter>
        <div class="comfooter_a" v-else style="margin-top:0.6rem;padding-bottom: 0.34rem"><comfooter></comfooter></div>
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
import merge from 'webpack-merge'
export default {
    name:'propertyList',
    data:function(){
        return{
            eyeShow:'',
            showBottom:true,
            showEyes:false,
            showAsset:'',
            loadObj:{
                text: '加载中...',
                spinnerType: 'triple-bounce'
            },
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone:''
            },
            gC:'red',
            ziC:'red',
            tangC:'red',
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
            tangTotalAsset:'',//唐掌柜总资产
		    tangYestIncome:'',//唐掌柜最新收益
            tangAddIncome:'',//唐掌柜总收益
            tangDate:'',     //唐掌柜更新时间 
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/getUserAsset'),//接口
            paramurl: location.href.split('?')[0]
        }
    },
    components:{Button,axios,Indicator,MessageBox,comfooter},//使用mint-ui的button的组件
    methods:{
        rz:function(){//去身份认证
            this.$router.push({
                    path:'/faceMsg',
                    name:'faceMsg',
                    query:{
                        returnUrl:this.Host+'weixin-h5/index.html#/propertyList'
                    }
                })
        },
        openEye:function(){
            this.eyeShow = !this.eyeShow
            if(this.eyeShow == false){
                this.showAsset = false
            }else{
                this.showAsset = true
            }
            var that=this;
           //  Indicator.open();
                axios({
                    method:'get',
                    url:'/wxservice/wxMemberInfo/changeAssetVisibleFlag'
                })
                .then(function(res) {//成功之后
                  //  Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode==0){
                        console.log(res.data)
                       // that.getList()
                    }else if(retCode==-1){//系统异常
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });
                    }else if(retCode == 400){
                        var serbackUrl = that.Host+'wxservice/wxMemberInfo/changeAssetVisibleFlag';
                        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=propertyList#wechat_redirect';
                    }
                   
                });
        },
        getfaceId:function(){
            Indicator.open();
            this.faceparam.phone = this.$route.query.phone
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                Indicator.close();
                console.log(res.data);
                var retCode=res.data.retCode;
                //var returnUrl = that.$route.query.returnUrl;
                var returnUrl = that.Host+'weixin-h5/index.html#/propertyList'
                //修改原有参数        
                that.$router.push({
                    query:merge(that.$route.query,{'faceResult':''})
                })
               // alert(retCode)
                if(retCode == '0'){
                    that.trafficStatistics('019')
                    //MessageBox('提示','人脸识别成功');
                    Toast({
                        message: '人脸识别成功',
                        position: 'center',
                        duration: 3000
                    });
                     that.getList();
                    return;
                }else if(retCode == '-2'){
                    that.trafficStatistics('017')
                    that.trafficStatistics('020')
                    MessageBox('','该身份证已绑定其他手机号');
                    that.$refs.wz.style.display='block'; 
                    return;
                }else if(retCode == '-1'){
                    that.trafficStatistics('020')
                    //MessageBox('提示','系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                    that.$refs.wz.style.display='block';
                    return;
                }else{
                    that.trafficStatistics('020')
                   // if(!that.$route.query.idNo == false){
                        var message = '人脸识别身份认证失败，请重试。'
                        MessageBox.confirm('', {
                            message: message,
                            title: '',
                            confirmButtonText:'重新识别',
                            cancelButtonText:'取消'
                        }).then(action => {
                            if(action == 'confirm'){
                                var idCardNo=that.$route.query.idNo
                                var idCardName=decodeURIComponent(that.$route.query.name)
                                var type = that.$route.query.tp
                                var canshu=returnUrl+'?phone='+that.$route.query.phone+'&idNo='+idCardNo+'&name='+encodeURIComponent(that.$route.query.name)+'&tp='+type 
                                that.getface(idCardNo,idCardName,canshu,type)
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                that.getList();
                            }
                        })

                    // }else{
                    //     var message = '人脸识别身份认证失败，请重试。若无法完成人脸识别身份认证可'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">【下载大唐财富app】</a>'+'，通过绑卡完成身份认证后查看资产。'
                    //     MessageBox.confirm('', {
                    //         message: message,
                    //         title: '',
                    //         showConfirmButton:true,
                    //         confirmButtonClass:'confirmButton',
                    //         confirmButtonText:'重试',
                    //     }).then(action => {
                    //         if(action == 'confirm'){
                    //                 //跳转财富师名片页面
                    //             that.$router.push({
                    //                 path:'/faceMsg',
                    //                 name:'faceMsg',
                    //                 query:{
                    //                 returnUrl:returnUrl,
                    //                 }
                    //             })
                    //         }else{
                    //             //跳转财富师名片页面
                    //             that.$router.push({
                    //                 path:'/faceMsg',
                    //                 name:'faceMsg',
                    //                 query:{
                    //                 returnUrl:returnUrl,
                    //                 }
                    //             })
                    //         }
                    //     }).catch(err => {
                    //         if (err == 'cancel') {     //取消的回调
                    //             that.getList();
                    //         }
                    //     })
                    // }
                    return;
                }
                // else if(retCode == '-3'){
                //     MessageBox('提示','人脸识别未通过');
                //     that.$refs.wz.style.display='block';
                //     return;
                // }else if(retCode == '-4'){
                //     MessageBox('提示','未查询到人脸识别结果');
                //     that.$refs.wz.style.display='block';
                        
                //     return;
                // }else{
                //      MessageBox('提示','未查询到人脸识别结果');
                //     that.$refs.wz.style.display='block';
                //     return;
                // }
            })
        },
        getList:function(){
             var that=this;
             Indicator.open();
                axios({
                    method:'get',
                    url:'/wxservice/wxMemberInfo/getUserAsset?v='+(new Date()).getTime(),
                    params: {
                   // param:that.param,//系统类别
                        backUrl: that.paramurl
                    }
                })
                .then(function(res) {//成功之后
                    console.log(res.data)
                    Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode==-2){//未身份认证
                        that.totalAsset='--';
                        that.showAsset = true
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
                        var serbackUrl = that.Host+'wxservice/wxMemberInfo/getUserAsset?v='+(new Date()).getTime();
                        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=propertyList#wechat_redirect';
                    }
                    var d=res.data.data;
                    if(retCode==0){
                        that.showEyes=true
                        if(res.data.assetVisibleFlag == 0){ //客户资产是否可见0不可见 1可见
                            that.eyeShow=false
                            that.showAsset = false
                        }else{
                            that.eyeShow=true
                            that.showAsset = true
                        }
                    }
                    that.totalAsset=d.totalAsset //总资产
                    that.privateTotalAsset=d.privateTotalAsset//私募总资产
                    //that.privateToConfirmAsset=d.privateToConfirmAsset//私募待确认
                    that.privateToConfirmAsset=d.toConfirmAsset//私募待确认
                    that. publicTotalAsset=d.publicTotalAsset//公募总资产
                    if(d.publicYestIncome<0){//公募最新收益
                        that.gC='green'
                    }else{
                        that.gC='red'
                    }
                    that.publicYestIncome=d.publicYestIncome//公募最新收益
                    that.publicAddIncome=d.publicAddIncome//公募总收益
                    that.securitiesTotalAsset=d.securitiesTotalAsset//资管类总资产
                    if(d.securitiesYestIncome<0){
                            that.ziC='green';
                    }
                    that.securitiesYestIncome=d.securitiesYestIncome//资管类最新收益
                    that.securitiesAddIncome=d.securitiesAddIncome//资管类总收益
                    if(d.tangYestIncome<0){
                            that.tangC='green';
                    }
                    that.tangTotalAsset = d.tangTotalAsset//唐掌柜总资产
		            that.tangYestIncome=d.tangYestIncome//唐掌柜最新收益
                    that.tangAddIncome=d.tangAddIncome //唐掌柜总收益
                    

                    if(that.totalAsset=='0.00'&&that.privateToConfirmAsset=='0.00'){
                        that.$refs.contant.style.display='none';
                        that.$refs.nodata.style.display='block';
                        that.showBottom = true
                        //that.showAsset = true
                        if(res.data.assetVisibleFlag == 0){ //客户资产是否可见0不可见 1可见
                            that.eyeShow=false
                            that.showAsset = false
                        }else{
                            that.eyeShow=true
                            that.showAsset = true
                        }
                        return;
                    }else{
                        that.$refs.contant.style.display='block';
                        that.$refs.nodata.style.display='none';
                        that.showBottom = false
                    }
                   
                    if(d.publicDate==''){
                        d.publicDate='--';
                    }
                    if(d.securitiesDate==''){
                        d.securitiesDate='--';
                    }
                    if(d.tangDate==''){
                        d.tangDate='--';
                    }
                    that.publicDate=d.publicDate//公募更新日期
                    that.securitiesDate=d.securitiesDate//资管更新日期
                    that.tangDate=d.tangDate    //唐掌柜更新时间 
                   
                   
                });
        },
        downApp:function() {
            this.trafficStatistics('013')//自定义埋点
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
                    window.location='https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf';
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    //android
                    window.location = 'https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf'
                }
                }
        
                function isWeixinBrowser() {
                    return (/micromessenger/.test(ua)) ? true : false;
                }
        },
        jumpPrivate:function() {
            this.$router.push({
                path:'/PrivateAsset',
                name:'PrivateAsset'
            }) 
        },
        jumpPublic:function() {
            this.$router.push({
                path:'/PublicAsset',
                name:'PublicAsset'
            }) 
        },
        jumpSecurities:function() {
            this.$router.push({
                path:'/SecuritiesAsset',
                name:'SecuritiesAsset'
            }) 
        }
    },
    created:function(){
        this.GasyncSDKConifg()
        if(!this.$route.query.faceResult == false){
             //var bizId=localStorage.getItem('bizId');
            var bizId=decodeURIComponent(getCookie("bizId"));
            this.faceparam.bizId = bizId;           
            this.getfaceId();
        }else{
             this.getList();
        }
       
    }

}
</script>
<style>
@import 'propetry.css'; /* 引入toSign.css文件*/
.green{
    color:rgb(11,124,10);
}

.proper_list .proDemo{
    padding: .24rem .4rem .36rem .4rem;
}

.proper_list .shouyi{
    width: 50%;
}
.proper_list .smPi{
    width: 50%;
}
/* .noData{
    background:#fff;
}
.noData img{
    width:2.24rem;
    margin:2.5rem auto 0;
}
.noData p{
    color:#757575;
    margin-top:.373333rem;
} */
.xiazai{
    color:#4a90e2;
}
.comfooter{
    position: fixed;
    bottom: 0;
}
.open_sel{
    position: absolute;
    right: 1rem;
    top: .74rem;
}
.open_sel img{
    width: .533333rem;
}
</style>


