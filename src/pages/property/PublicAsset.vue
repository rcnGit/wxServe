<template>
    <div class='propertyList fColorFFF' style='min-height:430px;background: #fff;'>
        <div class='headContent2'>
                <p class='fSize13 pp1'>总金额（元）</p>
                <p class='pp2'>{{totalAsset}}</p> <!--在数字上加逗号 -->
                <p class='p3'>待确认：{{publicToConfirmAsset}}（元）<img src='./img/wenhao.png' class='wenhao' @click="toTishi()"/></p><!--在数字上加逗号 -->
                <div style="overflow:hidden;padding-top: .6rem">
                    <div class='floatLeft w50 inc_box shouyi_left'>
                        <p class='fSize13'>日收益（元）</p>
                        <p class='M_num'>{{publicYestIncome}}</p>
                    </div>
                    <div class='floatRight w50 inc_box'>
                        <p class='fSize13'>累计收益（元）</p>
                        <p class='M_num'>{{publicAddIncome}}</p>
                    </div>
                </div>
        </div>
        <div class='proContent' >
            <div class="proDemo" v-for="(item,index) in inforList" :index='index' style="padding: .33333rem .386667rem;">
                <div class='proTop' style="padding-left:0;">
                    <!-- <img  class='floatLeft' src='./img/gLogo.png' /> -->
                    <span class='floatLeft bigP' style="padding-left:0;">{{item.fundName}} <span class='xindate'> {{item.fundCode}}</span></span>
                    
                </div>
                <div style='clear:both'></div>
                <div class='proBot asset_con'>
                    <span class='floatLeft smP'><span  class="jin_one" >金额（元）</span><br><em class="smp-number money_a">{{item.fundAsset}}</em></span>
                    <span class='floatRight shouyi rishouyi'><span  class="jin_one">持仓收益（元）</span><br><em class="money_b red" >{{item.addIncome.replace(',', '')>=0?item.addIncome:kong}}</em><em class="money_b green" >{{item.addIncome.replace(',', '')<0?item.addIncome:kong}}</em></span>
                    <span class='floatRight shouyi '><span  class="jin_one">日收益<span>{{item.yesIncomeDate}}</span>（元）</span><br><em class="money_b red" >{{item.yestIncome.replace(',', '')>=0?item.yestIncome:kong}}</em><em class="money_b green" >{{item.yestIncome.replace(',', '')<0?item.yestIncome:kong}}</em></span>
                </div>
            </div>    
        </div>
        <div class='noData asset_nodata' v-show="showPublic">
            <img src='./img/noprop.png'/>
            <p class='fSize16' style="font-size: .3733rem">您还没持有公募基金哦</p>
             <mt-button type="danger" size="large" class='next' @click='downApp ()' style="margin-top:0.72222rem;">去投资</mt-button>
        </div>
        <div class='wz'ref='wz' style="background:#fff;display:none;" >
            <img src='../../common/img/wr.png'  style='width:27%;margin:2.8rem auto 0.5rem;'/>
            <p class='fSize16' style='color:#333'>身份认证后可查看我的资产哦~</p>
        <mt-button type="danger" size="large" class='next' @click='rz()' style='margin-top:1.4rem;'>去人脸识别身份认证</mt-button>
        </div>
        <!-- <comfooter></comfooter> -->
        <div class='tishi_Cover' v-show='if_tishi'>
            <div class='tishiBox'>
                <h3>公募待确认<img src='./img/tishiClose.png' class='tishiClose' @click="tishiClose()"/></h3>
                <div>已成功提交申请，待基金管理人确认份额后将计入总资产</div>
            </div>
        </div>
        <div v-if="showBottom" class="Bottom">
            <P class="p1_bot">基金销售服务由北京唐鼎耀华基金销售有限公司提供</P>
            <P class="p2_bot">收益数据仅供参考，实际收益以基金公司计算为准</P>
        </div>
        <div class="Bottom2" v-else style="margin-top:0.6rem;padding-bottom: 0.34rem">
            <P class="p1_bot">基金销售服务由北京唐鼎耀华基金销售有限公司提供</P>
            <P class="p2_bot">收益数据仅供参考，实际收益以基金公司计算为准</P>
        </div>
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
        tishiClose:function(){
            this.if_tishi=false;
        },
        toTishi:function(){
            this.if_tishi=true;
        },
        getcolor:function(value){
            if(value.substring(0,1) == '-'){
                this.gC='green'
            }else{
                this.gC='red'
            }
            return value
        },
        rz:function(){//去身份认证
            this.$router.push({
                    path:'/faceMsg',
                    name:'faceMsg',
                    query:{
                        returnUrl:this.Host+'weixin-h5/index.html#/PublicAsset'
                    }
                })
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
        },
        getfaceId:function(){
            this.faceparam.phone = this.$route.query.phone
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                //var returnUrl = that.$route.query.returnUrl;
                var returnUrl = that.Host+'weixin-h5/index.html#/PublicAsset'
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
                    //if(!that.$route.query.idNo == false){
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
            })
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
    color:#06B24A;
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

