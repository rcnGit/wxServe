<template>
    <div class='propertyList fColorFFF' style='min-height:430px;'>
        <div class='headContent'>
                <p class='fSize13 pp1'>总金额（元）</p>
                <p class='pp2'>{{totalAsset}}</p> <!--在数字上加逗号 -->
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
        <div class='noData' ref='nodata' style="display:none;">
                <img src='./img/noprop.png'/>
                <p class='fSize16'>您还没在大唐开启投资之旅哦</p>
                 <mt-button type="danger" size="large" class='next' @click='downApp ()'>去投资</mt-button>
         </div>
        <div class='proContent' ref='contant' style='display:none;'>
            <div class='proDemo'>
                <div class='proTop'>
                    <img  class='floatLeft'src='./img/sLogo.png'/>
                    <span class='floatLeft bigP'>私募</span>
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'>金额&nbsp;<em>{{privateTotalAsset}}</em></span>
                </div>
            </div>  <!-- proDemo -->
             <div class='proDemo'>
                <div class='proTop'>
                    <img  class='floatLeft' src='./img/gLogo.png' />
                    <span class='floatLeft bigP'>公募</span>
                    <span class='floatRight'>更新日期：<em>{{publicDate}}</em></span>
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'>金额&nbsp;<em>{{publicTotalAsset}}</em></span>
                    <span class='floatRight'>最新收益<em :class='gC'>{{publicYestIncome}}</em></span>
                </div>
            </div>  <!-- proDemo -->
             <div class='proDemo'>
                <div class='proTop'>
                    <img  class='floatLeft'src='./img/dLogo.png'/>
                    <span class='floatLeft bigP'>资管理财</span>
                    <span class='floatRight'>更新日期：<em>{{securitiesDate}}</em></span>
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'>金额&nbsp;<em>{{securitiesAddIncome}}</em></span>
                    <span class='floatRight'>最新收益<em :class='ziC'>{{securitiesYestIncome}}</em></span>
                </div>
            </div>  <!-- proDemo -->
        </div>
        <div class='wz'ref='wz' style="background:#fff;display:none;" >
            <img src='../../common/img/wr.png'  style='width:40%;margin:80px auto 30px;'/>
            <p class='fSize16' style='color:rgb(59,59,59)'>实名认证后可查看我的资产哦~</p>
        <mt-button type="danger" size="large" class='next' @click='rz()' style='margin-top:81px;'>去人脸识别实名认证</mt-button>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
import { getCookie,setCookie } from '@/common/js/cookie.js'
import axios from 'axios';
export default {
    name:'propertyList',
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
    components:{Button,axios,Indicator,MessageBox},//使用mint-ui的button的组件
    methods:{
        rz:function(){//去实名认证
            this.$router.push({
                    path:'/faceMsg',
                    name:'faceMsg',
                    query:{
                        returnUrl:this.Host+'weixin-h5/index.html#/propertyList'
                    }
                })
        },
        getfaceId:function(){
            alert('getfaceId');
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                alert(retCode);
                if(retCode == '0'){
                    //MessageBox('提示','人脸识别成功');
                    Toast({
                        message: '人脸识别成功',
                        position: 'center',
                        duration: 3000
                    });
                     that.getList();
                    return;
                }else if(retCode == '-2'){
                    MessageBox('提示','该身份证已绑定其他手机号');
                    that.$refs.wz.style.display='block'; 
                    return;
                }else if(retCode == '-1'){
                    //MessageBox('提示','系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                    that.$refs.wz.style.display='block';
                    return;
                }else{
                    var message = '人脸识别实名认证失败，请重试。若无法完成人脸识别实名认证可'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">【下载大唐财富app】</a>'+'，通过绑卡完成实名认证后报名活动。'
                    MessageBox.confirm('', {
                        message: message,
                        title: '',
                        showConfirmButton:true,
                        confirmButtonClass:'confirmButton',
                        confirmButtonText:'重试',
                    }).then(action => {
                        if(action == 'confirm'){
                                //跳转财富师名片页面
                            that.$router.push({
                                path:'/faceMsg',
                                name:'faceMsg',
                                query:{
                                returnUrl:returnUrl,
                                }
                            })
                        }
                    }).catch(() => {
                        
                    })
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
                    Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode==-2){//未实名认证
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
                        var serbackUrl = that.Host+'wxservice/wxMemberInfo/getUserAsset?v='+(new Date()).getTime();
                      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=propertyList#wechat_redirect';
                    }
                   var d=res.data.data;
                    that.totalAsset=that.money(d.totalAsset)//总资产
                    that.privateTotalAsset=that.money(d.privateTotalAsset)//私募总资产
                    that.privateToConfirmAsset=that.money(d.privateToConfirmAsset)//私募待确认
                    that. publicTotalAsset=that.money(d.publicTotalAsset)//公募总资产
                    if(d.publicYestIncome<0){//公募最新收益
                        that.gC='green'
                    }else{
                        that.gC='red'
                    }
                    that.publicYestIncome=that.money(d.publicYestIncome)//公募最新收益
                    that.publicAddIncome=that.money(d.publicAddIncome)//公募总收益
                    that.securitiesTotalAsset=that.money(d.securitiesTotalAsset)//资管类总资产
                    if(d.securitiesYestIncome<0){
                            that.zic='green';
                    }
                    that.securitiesYestIncome=that.money(d.securitiesYestIncome)//资管类最新收益
                    that.securitiesAddIncome=that.money(d.securitiesAddIncome)//资管类总收益


                    if(that.totalAsset=='0.00'&&that.privateToConfirmAsset=='0.00'){
                        that.$refs.contant.style.display='none';
                        that.$refs.nodata.style.display='block';
                        return;
                    }else{
                        that.$refs.contant.style.display='block';
                        that.$refs.nodata.style.display='none';
                    }
                   
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
.red{
    color:rgb(239,39,39);
}
.green{
    color:rgb(11,124,10);
}
.noData{
    background:#fff;
}
.noData img{
    width:40%;
    margin:80px auto 0;
}
.noData p{
    color:rgb(197,197,197);
    margin-top:30px;
}
.xiazai{
    color:#4a90e2;
}
</style>


