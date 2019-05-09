<template>
    <div class='severStar' style="padding-bottom: .3rem" >
        <div v-show="showShareCard" class="ShareCard">
            <div style="overflow:hidden">
                <p style="color:#3B3B3B;font-size: .426667rem;padding-top: .1rem;float:left">{{realName}}</p>
                <span style="color:#666666;font-size: .32rem;padding-left: .13rem;float:left;line-height:.68rem;">请您帮忙点亮服务之星<span style="color:#E11C1C">{{businessName}}</span></span>
            </div>
            <div class="sharetext" v-show="showsShareDesc"><p>{{shareShareDesc}}</p></div>
        </div>
        <shareCard ref="shareCard"></shareCard>
        <div v-show="showBTN">
        <div class="btn_Bottom" v-if="showSeverbtn" >
            <span class="Button_sever mystar" @click='myStar' >我的服务之星</span>
            <span class="Button_sever yue" @click='yuyue' >为TA点亮</span>
        </div>
        <div class="btn_Bottom1" v-else >
            <span class="Buttons" @click='openQuestion' v-if="noLight" style="line-height: 1.45rem">为{{businessName}}点亮服务之星</span>
            <span class="Buttons" @click='tuijian' v-else style="line-height: 1.45rem">点亮服务之星</span>
        </div>
        </div>
        <!-- 底部   框 -->
        <mt-popup v-model="popupVisible" position="center" pop-transition="popup-fade">
            <div class='pop_contant pop_contant_A' ref='pop_contant'>
                <div class='popImgBox_A'>
                    <img :src='erweima' style='width:180px;height:180px;margin:94px auto 10px;'/>
                    <p style='color:#333;font-size:14px;text-align:center;margin: 24px auto 8px;'>您已注册过大唐财富平台</p>
                    <p style='color:#333;font-size:14px;text-align:center;'>可直接进入大唐财富服务号指定当前财富师</p>
                </div>
            </div> <!--pop_contant -->
        </mt-popup>
        <div class="shade" v-show="isShareshow">
            <img src='./img/point.png' class="point">
            <p class="shade-text">点击此处发送给朋友<br>或分享到朋友圈</p>
            <p class="shade-btn" @click='kown_btn'>我知道了</p>
        </div>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk';
let Base64 = require('js-base64').Base64;
import axios from 'axios';
import { MessageBox } from 'mint-ui';//提示框
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Popup } from 'mint-ui';//底部出来的弹框
import merge from 'webpack-merge'
import shareCard from '@/pages/severStar/shareCard'//财富师名片
import { getCookie,setCookie } from '@/common/js/cookie.js'
export default {
    name:'wealthCard',
    data:function(){
        return{
            showBTN:false,
            showsShareDesc: false,
            isShareshow:false,
            showShareCard:false,
            showSeverbtn: true,
            idNo :'',
            id: '',
            tgid:'',
            paramurl: location.href.split('?')[0],
            businessName:'',
            ghT:'',
            mobile:'',
            popupVisible:false,//是否出现二维码的弹框
            erweima:'',
            backUrl: location.href.split('?')[0],
            userId:'',
            shareLink:'',
            realName:'',
            belongBusiness:'',
            noLight: true,
            ifcard:'',
            shareDesc:'',
            shareShareDesc:'',
            appStr:{
                title:'大唐财富服务之星',
                msg:'',
                shareUrl:'',
                type: false,
                isNeedNotice:true
            },
            tgUserId:'',
            labelListArr:[],
            shareFrom:'',
            Name:'',
            starShare:'',
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone:''
            },
            loadObj:{
                text: '加载中...',
                spinnerType: 'triple-bounce'
            },
        }
    },
    provide(){
      return{
        openQuestion:this.openQuestion
      }
  },
    methods:{
        getId:function(){
           // Indicator.open()
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取用户信息
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
              //  Indicator.close();
                var retCode=res.data.retCode;
                var Data = res.data
                console.log(Data)
                if(retCode=='0'){
                    that.id = Data.userInfo.id 
                   // that.realName = res.data.userInfo.realName
                   // that.getRealname()
                }else if(retCode=='-1'){//系统异常
                    //MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severStar_'+that.userId+','+that.$route.query.ifcard+','+that.source+','+that.idNo+','+that.shareShareDesc+','+that.id+',,'+that.shareFrom+','+that.starShare+'#wechat_redirect';
                } 
            })
        },
        zixun:function(){
            window.location.href='tel:400-819-9868';
        },
        getWealthname:function(){ 
            let that = this;
            Indicator.open();
            var param=Base64.encode('{"userId":"'+that.userId+'"}');//that.user.userId
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=getTCmycard&versionNo=30',//获取客户信息
                params:{
                    param:param,
                    osFlag:'3'
                }
            })
            .then(function(res) {//成功之后
                
                console.log(res.data)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode == 0){
                   // var data=Base64.decode(res.data);
                   // data=jQuery.parseJSON(data);
                    var data=res.data
                    that.ghT=data.userId;
                    that.businessName = data.userName; //对方财富师的名字
                    that.mobile = data.mobile
                    if(!data.lableList == false){
                        var labelList =data.lableList;
                        that.labelListArr = labelList.split(',');
                        console.log(that.labelListArr)
                    }
                    if(that.starShare == 1){
                        that.showsShareDesc = false
                    }else{
                      //  that.showsShareDesc = true
                            
                    if(!that.shareShareDesc == false){
                        if(!that.shareFrom == false){
                            that.showsShareDesc = false
                        }else{
                            that.showsShareDesc =true
                        }
                    }else{
                        if(!data.lableList == false){
                            that.showsShareDesc = true
                            
                         
                        //var labelListArr = labelList.split(',');
                       // console.log(labelListArr); 
                        if(!that.labelListArr[1] == false){
                            that.shareShareDesc = '我的财富师'+that.businessName+'，'+that.labelListArr[0]+'、'+that.labelListArr[1]+'，是我心中的金牌服务之星。'
                        }else{
                            that.shareShareDesc = '我的财富师'+that.businessName+'，'+that.labelListArr[0]+'是我心中的金牌服务之星。'
                        }
                       
                       // that.shareDesc = '我的财富师'+that.businessName+'，'+that.labelListArr[0]+'、'+that.labelListArr[1]+'，是我心中的金牌服务之星。您要不要也来了解一下他/她？'
                    }else{
                        that.showsShareDesc = false
                       // that.shareDesc = that.realName+'向你推荐服务之星'+that.businessName
                    }
                    }
                    }
                    
                    if(that.ifcard != 1){
                        if(that.source == 'wx'){
                            that.getServerStar()
                        }else{
                          //  that.getServerStarApp()
                        }
                        
                    }
                    
                 //   Indicator.close();
                }else if(retCode == "-2"){
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },
        getData1:function(id){
           // Indicator.open();
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取用户信息
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                // Indicator.close();
                 var retCode=res.data.retCode;
                 var Data = res.data
                 console.log(Data)
                 if(id == '2'){
                    if(retCode=='0'){
                        that.idNo = res.data.userInfo.idNo   
                    }else if(retCode=='-1'){//系统异常
                        //MessageBox('提示', '系统异常');
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });
                    }
                    else if(retCode == 400){
                        var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severStar_'+that.userId+','+that.$route.query.ifcard+','+that.source+','+that.idNo+','+that.shareShareDesc+',,'+that.shareFrom+','+that.starShare+'#wechat_redirect';
                    }
                 }else{
                    if(retCode=='0'){
                    if(!res.data.userInfo.belongBusiness == false){
                        that.userId = res.data.userInfo.belongBusiness
                        that.idNo = res.data.userInfo.idNo
                        that.id= res.data.userInfo.id
                        that.getRealname()
                        that.getWealthname()
                        Indicator.open();
                        that.$refs.shareCard.getdtNo(res.data.userInfo.belongBusiness,res.data.userInfo.idNo,that.ifcard);
                        that.getServerStar()
                       
                    }else{
                        //财富师指定页 
                        that.$router.push({
                            path:'/wchoose',
                            name:'wchoose',
                            query:{
                                reform: '2'//服务之星
                            }
                        })
                    }
                    }else if(retCode=='-1'){//系统异常
                        //MessageBox('提示', '系统异常');
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });
                    }
                    else if(retCode == 400){
                        var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severStar_'+that.userId+','+that.$route.query.ifcard+','+that.source+','+that.idNo+','+that.shareShareDesc+',,'+that.shareFrom+','+that.starShare+'#wechat_redirect';
                    }
                }   
            })
        },
        getData_app:function(id){
            //Indicator.open();
            let that = this;
            var param=Base64.encode('{"userId":"'+that.tgUserId+'"}');//that.user.userId
            axios({
                method:'get',
                url:'/tgweb/app/ctp/CallApiServlet?api=query_user_info',//糖罐
                params:{
                    param:param,
                    osFlag:'3'
                }
            })
            .then(function(res){
                // Indicator.close();
                 var data=Base64.decode(res.data);
                 data=jQuery.parseJSON(data);
                 console.log(data)
                that.realName = data.userName
                that.Name = data.userName
                that.idNo=data.idCardNo
                that.userId=data.belongChannel
                //that.tgUserId=that.$route.query.userId
                Indicator.open(that.loadObj);
                that.$refs.shareCard.getdtNo(that.userId,that.idNo,that.ifcard,'TG',id);
                that.businessName = data.channelName          
                that.getWealthname() 
                if(id == '1'){
                    if(that.ifcard != 1){
                        that.getServerStarApp()
                    }
                }
                
            })
        },
        yuyue:function(){
            //this.getData('yue')
            Indicator.open();
            this.trafficStatistics('037')//自定义埋点
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getReservation',//获取用户信息
                params: {
                    dtNo: that.userId
                }
            })
            .then(function(res){
                 Indicator.close();
                 var retCode=res.data.retCode;
                 var Data = res.data
                 console.log(Data)
                if(retCode=='0'){ 
                    //预约财富服务页面
                    that.$router.push({
                        path:'/severAppoint',
                        name:'severAppoint',
                        query:{
                            userId: that.userId,
                            tgUserId: that.id
                        }
                    })
                    
                }else if(retCode=='-2'){
                    that.showSeverbtn = false
                   
                    that.$router.push({   //服务之星页
                        path:'/severStar',
                        name:'severStar',
                        query:{
                            //userId:res.data.userInfo.belongBusiness
                            source:'wx'
                        }
                    })
                    window.scroll(0,0);
                    location.reload()
                }else if(retCode=='-3'){
                    that.showSeverbtn = false
                   
                    that.$router.push({   //服务之星页
                        path:'/severStar',
                        name:'severStar',
                        query:{
                            //userId:res.data.userInfo.belongBusiness
                            source:'wx'
                        }
                    })
                    window.scroll(0,0);
                    location.reload()
                }else if(retCode=='-4'){
                    var message = '您已有专属财富师'+res.data.date.dtName+'，暂不支持为他人点亮。'
                    MessageBox.confirm('', {
                        message: message,
                        title: '',
                        confirmButtonText:'我的服务之星',
                        cancelButtonText:'取消',
                        closeOnClickModal: false
                    }).then(action => {
                        if(action == 'confirm'){
                            that.myStar()
                        }
                    }).catch(err => {
                        if (err == 'cancel') {     //取消的回调
                            
                        }
                    })
                }else if(retCode=='-5'){
                    that.getErweima()
                }else if(retCode=='-1'){
                    //MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxMemberInfo/getReservation'
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severStar_'+that.userId+','+that.$route.query.ifcard+','+that.source+','+that.idNo+','+that.shareShareDesc+','+that.id+',yue#wechat_redirect';
                }
            })
        },
        myStar:function(){
           // this.getData('my')
           Indicator.open();
           this.trafficStatistics('038')//自定义埋点
           let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getMyServiceStar',//获取用户信息
                params: {
                    dtNo: that.userId
                }
            })
            .then(function(res){
                 Indicator.close();
                 var retCode=res.data.retCode;
                 var Data = res.data
                 console.log(Data)
                if(retCode=='0'){ 
                    //预约财富服务页面
                    that.$router.push({
                        path:'/severAppoint',
                        name:'severAppoint',
                        query:{
                            userId: that.userId,
                            tgUserId: that.id
                        }
                    })
                }else if(retCode=='-2'){
                    that.$router.push({   //服务之星页
                        path:'/severStar',
                        name:'severStar',
                        query:{
                            //userId:res.data.userInfo.belongBusiness
                            source:'wx'
                        }
                    })
                    window.scroll(0,0);
                    location.reload()
                   // that.showSeverbtn = false
                   // that.noLight = true
                    //that.btnContent = '为'+that.businessName+'点亮服务之星' //未点亮
                }else if(retCode=='-3'){
                    that.$router.push({   //服务之星页
                        path:'/severStar',
                        name:'severStar',
                        query:{
                            //userId:res.data.userInfo.belongBusiness
                            source:'wx'
                        }
                    })
                    window.scroll(0,0);
                    location.reload()
                   // that.showSeverbtn = false
                    //that.noLight = false
                   // that.btnContent = '推荐服务之星'+that.businessName //已点亮
                }else if(retCode=='-4'){
                    //跳转至用户自己的服务之星页面
                    that.$router.push({   //服务之星页
                        path:'/severStar',
                        name:'severStar',
                        query:{
                            //userId:res.data.userInfo.belongBusiness
                            source:'wx'
                        }
                    })
                    window.scroll(0,0);
                    location.reload()
                }else if(retCode=='-5'){
                    var message = '您暂无服务之星，可为当前财富师点亮服务之星。'
                    MessageBox.confirm('', {
                        message: message,
                        title: '',
                        confirmButtonText:'为TA点亮',
                        cancelButtonText:'取消',
                        closeOnClickModal: false
                    }).then(action => {
                        if(action == 'confirm'){
                            that.yuyue()
                        }
                    }).catch(err => {
                        if (err == 'cancel') {     //取消的回调
                            
                        }
                    })
                }else if(retCode=='-6'){
                    var message = '若您已指定专属财富师(服务之星），请完成实名认证同步财富师信息，若未指定，您可为当前财富师点亮服务之星。'
                    MessageBox.confirm('', {
                        message: message,
                        title: '',
                        confirmButtonText:'实名认证',
                        cancelButtonText:'为TA点亮',
                        closeOnClickModal: false
                    }).then(action => {
                        if(action == 'confirm'){
                            that.$router.push({
                                path:'/faceMsg',
                                name:'faceMsg',
                                query:{
                                    returnUrl:that.Host+'weixin-h5/index.html#/severStar'+'?userId='+that.userId+'&ifCard='+that.ifcard
                                }
                            })
                        }
                    }).catch(err => {
                        if (err == 'cancel') {     //取消的回调
                            that.yuyue()
                        }
                    })
                }else if(retCode=='-1'){
                    //MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxMemberInfo/getMyServiceStar'
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severStar_'+that.userId+','+that.$route.query.ifcard+','+that.source+','+that.idNo+','+that.shareShareDesc+','+that.id+',my#wechat_redirect';
                }
            })
        },
        openQuestion:function(){
            //点亮服务之星页
            if(this.source == 'wx'){
                this.getData1('2')
                this.tgUserId = this.id
            }
            
          //  alert(this.idNo)
            this.$router.push({
                path:'/question',
                name:'question',
                query:{
                   // userName:this.businessName,
                    userId: this.userId,
                    idNo: this.idNo,
                    tgUserId: this.tgUserId,
                    source:this.source
                }
            })
        },
        getErweima:function(){
            var that=this;
             Indicator.open();
            // alert(that.ghT+','+that.businessName+','+that.mobile+',2,2')
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=cSignSQRCode',//获取临时二维码接口
                params: {
                    param:{
                       // actId:that.actId,
                        sign:'2',//指定财富师关注
                    // ghT:that.businessName+'（工号'+that.ghT+'）'+that.mobile,
                     ghT:that.ghT+','+that.businessName+','+that.mobile+',2,2',
                    }
                }
            })
            .then(function(res) {
                 Indicator.close();
                 console.log(res)
                var retCode=res.data.retCode;
                if(retCode==0){
                    //获取二维码成功
                    var url=res.data.url;
                    that.popupVisible=true;//出现弹框
                    that.erweima=url;
                }else{
                   
                }
            })//
        },
        getServerStar:function(){
           // Indicator.open();
            let that = this;
            //alert( that.userId+'getServerStar'+that.idNo)
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getServerStar',//获取用户信息
                params: {
                    dtNo: that.userId,
                    idNo: that.idNo,
                }
            })
            .then(function(res){
                // Indicator.close();
                 var retCode=res.data.retCode;
                 var Data = res.data
                 console.log(Data)
                if(retCode=='0'){
                    that.showBTN = true
                    that.id= Data.data.userId
                   if(Data.data.isLighten == 0){
                         that.showSeverbtn = false
                         that.noLight = true
                       // that.btnContent = '为'+that.businessName+'点亮服务之星' //未点亮
                   }else{
                        that.showSeverbtn = false
                        that.noLight = false
                        //that.btnContent = '推荐服务之星'+that.businessName //已点亮
                        that.wxshare()
                        that.asyncSDKConifg(that.shareDesc)
                   }
                }else if(retCode=='-1'){//系统异常
                    //MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice//wxMemberInfo/getServerStar'
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severStar_'+that.userId+','+that.$route.query.ifcard+','+that.source+','+that.idNo+','+that.shareShareDesc+','+that.id+',,'+that.shareFrom+','+that.starShare+'#wechat_redirect';
                }
            })
        },
        getServerStarApp:function(){
           // Indicator.open();
            let that = this;
           // alert( that.userId+'getServerStarAPP'+that.idNo)
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=getTGServerStar',//获取用户信息
                params: {
                    dtNo: that.userId,
                    idNo: that.idNo,
                }
            })
            .then(function(res){
               //  Indicator.close();
                 var retCode=res.data.retCode;
                 var Data = res.data
                 console.log(Data)
                // alert(retCode+'705')
                that.tgid= Data.data.userId
                if(retCode=='0'){
                    that.showBTN = true
                   if(Data.data.isLighten == 0){
                         that.showSeverbtn = false
                         that.noLight = true
                       // that.btnContent = '为'+that.businessName+'点亮服务之星' //未点亮
                   }else{
                        that.showSeverbtn = false
                        that.noLight = false
                        //that.btnContent = '推荐服务之星'+that.businessName //已点亮
                        
                        that.wxshare()
                        that.asyncSDKConifg(that.shareDesc)
                   }
                }else if(retCode=='-1'){//系统异常
                    //MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },
        getRealname:function(){
           // this.getId() 
            let that = this;
           // Indicator.open();
           // alert(that.id+'fffff')
            axios({
                method:'get',
                url:'/wxservice/wxexternal/getServerStarInvite',//获取客户信息
                params: {
                    userId: that.id,
                }
            })
            .then(function(res) {//成功之后
                console.log(res.data)
               // Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                //alert(retCode+'1111111111111749')
                if(retCode==0){
                    that.realName = res.data.data.realName
                    that.Name = res.data.data.realName
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxexternal/getServerStarInvite'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severStar_'+that.userId+','+that.$route.query.ifcard+','+that.source+','+that.idNo+','+that.shareShareDesc+','+that.id+',,'+that.shareFrom+','+that.starShare+'#wechat_redirect';
                }else{
                    MessageBox(' ',retMsg);
                }
            });
        },
        kown_btn:function(){
            this.isShareshow = false;
            //$('html,body').css({'overflow-y':'scroll'})
        },
        getfaceId:function(){
            Indicator.open();
           // this.faceparam.phone = this.$route.query.phone
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                Indicator.close();
                var retCode=res.data.retCode;
               // var returnUrl = that.$route.query.returnUrl;
                var returnUrl = that.Host+'weixin-h5/index.html#/severStar'+'?userId='+that.userId+'&source=wx&ifCard='+that.ifcard
                //修改原有参数        
                that.$router.push({
                    query:merge(that.$route.query,{'faceResult':''})
                })
                if(retCode == '0'){
                    that.trafficStatistics('019')
                   // MessageBox('提示','人脸识别成功');
                    Toast({
                        message: '人脸识别成功',
                        position: 'center',
                        duration: 3000
                    });
                    setTimeout(() => {
                        that.$router.push({   //服务之星页
                            path:'/severStar',
                            name:'severStar',
                            query:{
                                //userId:res.data.userInfo.belongBusiness
                                source:'wx'
                            }
                        })
                       window.scroll(0,0);
                       location.reload()
                    }, 3300)
                   
                    return;
                }else if(retCode == '-2'){
                    that.trafficStatistics('017')
                    that.trafficStatistics('020')
                    MessageBox('','该身份证已绑定其他手机号').then(action => {
                      if(action == 'confirm'){
                       //跳转财富师名片页面
                        that.$router.push({
                            path:'/faceMsg',
                            name:'faceMsg',
                            query:{
                            returnUrl:returnUrl,
                            }
                        })
                      }else{//取消
                        console.log('查看订单')
                      }
                  });//提示信息
                    return;
                }else{
                    that.trafficStatistics('020')
                   // if(!that.$route.query.idNo == false){
                        var message = '人脸识别身份认证失败，请重试。'
                        MessageBox.confirm('', {
                            message: message,
                            title: '',
                            confirmButtonText:'重新识别',
                           // cancelButtonText:'取消'
                        }).then(action => {
                            if(action == 'confirm'){
                                that.$router.push({
                                    path:'/faceMsg',
                                    name:'faceMsg',
                                    query:{
                                    returnUrl:returnUrl,
                                    }
                                })
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                // that.$router.push({
                                //     path:'/wchoose',
                                //     name:'wchoose'
                                // })
                            }
                        })

                    return;
                }
            
            })
        },
        tuijian:function(){
            this.wxshare()
            let ua = navigator.userAgent.toLowerCase();
            //android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
            if ((/micromessenger/i).test(ua)) {//isWeixinBrowser()//判断是不是微信 
                this.isShareshow = true;
               // $('html,body').css({'overflow':'hidden','height':'100%'})
                return
            }else{
                var str = JSON.stringify(this.appStr);
                console.log(str)
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    //ios
                window.webkit.messageHandlers.AppModel.postMessage({body: 'objc:///share:'+str});
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    //android
                window.AndroidFunctionSetting.share(str);
                }
            }
        },
        VersionAPP:function(versionNo){
           /* let ua = navigator.userAgent.toLowerCase();
            //android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
            if ((/micromessenger/i).test(ua)) {//isWeixinBrowser()//判断是不是微信 
            }else{
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    //ios
                    this.Version(versionNo,'4.2.4')
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    //android
                    if(versionNo<66){//旧版本
                        console.log(versionNo);
                        this.getData_app()
                    }else{
                        //新版本
                        this.getData_app('1')
                    } 
                }

            }*/
            if(!this.$route.query.client == false){
                if(this.$route.query.client == 'IOS'){
                    this.Version(versionNo,'4.2.5')
                }else if(this.$route.query.client == 'Android'){
                    if(versionNo<66){//旧版本
                        this.getData_app()
                        var message = '将您的大唐财富APP更新至V4.2.5版本，即可参与服务之星活动，为您的财富师助力，并赢取丰厚奖励。'
                        MessageBox.confirm('', {
                            message: message,
                            title: '',
                            confirmButtonText:'立即更新',
                            cancelButtonText:'取消',
                            closeOnClickModal: false
                        }).then(action => {
                            if(action == 'confirm'){
                                window.location.href='https://interface.tdyhfund.com/launcher/html/DTCF_Download.html'
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                
                            }
                        })
                    }else{
                        //新版本
                        this.getData_app('1')
                    } 
                }
            }else{
                var message = '将您的大唐财富APP更新至V4.2.5版本，即可参与服务之星活动，为您的财富师助力，并赢取丰厚奖励。'
                MessageBox.confirm('', {
                    message: message,
                    title: '',
                    confirmButtonText:'确定',
                    // cancelButtonText:'取消'
                }).then(action => {
                    if(action == 'confirm'){
                      //  window.location.href='https://interface.tdyhfund.com/launcher/html/DTCF_Download.html'
                    }
                }).catch(err => {
                    if (err == 'cancel') {     //取消的回调
                        
                    }
                })
                this.getData_app()
            }
            
        },
        Version:function(curV,reqV){
            console.log(curV);
            console.log(reqV);
            var arr1=curV.split('.');
            console.log(arr1)
            var arr2=reqV.split('.');
            console.log(arr2)
            //将两个版本号拆成数字 
            var minL= Math.min(arr1.length,arr2.length);  
            var pos=0;        //当前比较位
            var diff=0;        //当前为位比较是否相等
                            
            //逐个比较如果当前位相等则继续比较下一位
            while(pos<minL){
                diff=parseInt(arr1[pos])-parseInt(arr2[pos]);  
                if(diff!=0){  
                    break;  
                } 
                pos++;                  
            }
            if(diff<0){
                this.getData_app()
                var message = '将您的大唐财富APP更新至V4.2.5版本，即可参与服务之星活动，为您的财富师助力，并赢取丰厚奖励。'
                MessageBox.confirm('', {
                    message: message,
                    title: '',
                    confirmButtonText:'确定',
                    // cancelButtonText:'取消'
                }).then(action => {
                    if(action == 'confirm'){
                      //  window.location.href='https://interface.tdyhfund.com/launcher/html/DTCF_Download.html'
                    }
                }).catch(err => {
                    if (err == 'cancel') {     //取消的回调
                        
                    }
                })         
            }else{
                console.log("新版本");
                this.getData_app('1')
            }
        },
        wxshare:function() {
            if(this.noLight == true){
                this.shareDesc = this.Name+'向你推荐服务之星'+this.businessName
            }else{
                if(this.labelListArr.length >0){
                // this.shareShareDesc = '我的财富师'+this.businessName+'，'+this.labelListArr[0]+'、'+this.labelListArr[1]+'，是我心中的金牌服务之星。'
                    if(!this.labelListArr[1] == false){
                        this.shareDesc = '我的财富师'+this.businessName+'，'+this.labelListArr[0]+'、'+this.labelListArr[1]+'，是我心中的金牌服务之星，请您帮TA点亮。'
                    }else{
                        this.shareDesc = '我的财富师'+this.businessName+'，'+this.labelListArr[0]+'是我心中的金牌服务之星，请您帮TA点亮。'
                    }
                
                }else{
                    this.shareDesc = this.Name+'向你推荐服务之星'+this.businessName
                }
            }
            this.appStr.msg = this.shareDesc
           // alert(this.appStr.msg)
            this.appStr.shareUrl = location.href.split('?')[0]+'?userId='+this.userId+'&tgUserId='+this.tgid+'&ifcard=1&share=2&source=wx'+'&shareDesc='+encodeURIComponent(this.shareDesc)
            //alert(this.shareDesc)
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
                this.shareLink = this.Host+'weixin-h5/static/html/redirect.html?app3Redirect=' + encodeURIComponent(location.href.split('?')[0]+'?userId='+this.userId+'&tgUserId='+this.id+'&ifcard=1&source=wx&share=2'+'&shareDesc='+this.shareDesc)
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //android
                this.shareLink =location.href.split('?')[0]+'?userId='+this.userId+'&tgUserId='+this.id+'&ifcard=1&source=wx&share=2'+'&shareDesc='+encodeURIComponent(this.shareDesc)
            }
            }

        },
        async asyncSDKConifg (shareDesc) {
        const meatTitle = this.$route.meta.title
        let that = this
        axios.get('/wxservice/core/getJSSDKConfigure.mm?pageUrl='+that.backUrl)
            .then(function (res) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature, // 必填，签名
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
            })
            wx.ready(function() { //通过ready接口处理成功验证
                // console.log(businessName)
        // config信息验证成功后会执行ready方法
            wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
                title: '大唐财富'+meatTitle, // 分享标题
                desc: shareDesc, // 分享描述
                link: that.shareLink, // 分享链接
                imgUrl: 'http://file0.datangwealth.com/g1/M00/16/50/rBAeX1ybKCiAEKkxAADvNDguF4c858.png?filename=share.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                    //alert('用户取消分享');
                }
                });
                wx.onMenuShareTimeline({ //分享朋友圈
                title: '大唐财富'+meatTitle, // 分享标题
                desc: shareDesc, // 分享描述
                link: that.shareLink,
                imgUrl: 'http://file0.datangwealth.com/g1/M00/16/50/rBAeX1ybKCiAEKkxAADvNDguF4c858.png?filename=share.png', // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
            // end
        })
        wx.error(function(res){//通过error接口处理失败验证
            // config信息验证失败会执行error函数
        });
        }
    },
    mounted:function(){
        Indicator.open(this.loadObj);
        var bizId=decodeURIComponent(getCookie("bizId"));
        this.faceparam.bizId = bizId
        if(!this.$route.query.faceResult == false){
           this.getfaceId()
        }else{
       if(!this.$route.query.actId==false){ //重定向后
            var wxstr = this.$route.query.actId;
            this.userId=wxstr.split(",")[0];
            this.ifcard = wxstr.split(",")[1]
            this.source= wxstr.split(",")[2]
            var shareDesc = decodeURIComponent(wxstr.split(",")[4])
            this.shareFrom = wxstr.split(",")[7]
            this.starShare = wxstr.split(",")[8]
            this.idNo=wxstr.split(",")[3]
            if(this.ifcard == 1){
              //  this.getId()
              this.showBTN = true
              this.id = wxstr.split(",")[5]
             this.tgUserId = wxstr.split(",")[5]
                var btnid = wxstr.split(",")[6]
                this.showShareCard = true
                this.shareShareDesc = decodeURIComponent(shareDesc)
              //  this.getRealname()
               // this.yuyue()
               if(btnid == 'yue'){
                  this.yuyue()
               }else{
                  this.myStar()
               }
               if(this.source == 'wx'){
                 if(!this.id == false){
                    this.getRealname()//用户姓名
                    this.getWealthname()
                    Indicator.open();
                    this.$refs.shareCard.getdtNo(this.userId,this.idNo,this.ifcard);
                   }
                 
               }else{
                //    if(this.ifcard != 1){
                //     this.getData_app()
                //     if(!this.userId == false){
                //         this.getWealthname()
                //     }
                //    }
                    
               }
            }else{
                if(this.source == 'wx'){
                    this.getData1()
                }else{
                    this.VersionAPP(this.$route.query.versionNo)//判断App版本
                    //this.getData_app('1')
                }
            } 
            
        }else{
            this.userId=this.$route.query.userId
            this.idNo=this.$route.query.idNo
            this.source=this.$route.query.source
            this.ifcard=this.$route.query.ifcard
            this.tgUserId = this.$route.query.tgUserId
            this.id = this.$route.query.tgUserId
            this.shareFrom = this.$route.query.shareFrom
            this.starShare = this.$route.query.starShare
            if(this.ifcard == 1){
                this.showBTN = true
               // this.getRealname()
            //   this.getWealthname()
               // this.getRealname() //用户姓名
                this.showShareCard = true
                this.shareShareDesc = decodeURIComponent(this.$route.query.shareDesc)
                if(this.source == 'wx' ){
                  if(!this.id == false){ 
                    this.getRealname()//用户姓名
                    this.getWealthname()
                    Indicator.open();
                    this.$refs.shareCard.getdtNo(this.userId,this.idNo,this.ifcard);
                  }
               }else{
               // this.VersionAPP(this.$route.query.versionNo)//判断App版本
                    this.getData_app('1')
                    if(!this.userId == false){
                    this.getWealthname()
                }
               }
            }else{
                if(this.source == 'wx'){
                    this.getData1()
                }else{
                    this.VersionAPP(this.$route.query.versionNo)//判断App版本
                   // this.getData_app('1')
                }
                // if(!this.userId ==false){
                //     this.$refs.shareCard.getdtNo(this.userId,this.$route.query.idNo);
                //     this.getWealthname()
                // }
            }
         }
        }
        
    },
    updated() {
        if(this.source == 'wx'){
            this.wxshare()
            this.asyncSDKConifg(this.shareDesc)
        }
        if(!this.shareShareDesc == false){
            var sharestr = this.realName+'向你推荐服务之星'+this.businessName
            if(this.shareShareDesc == sharestr){
                this.showsShareDesc = false
            }
            if(this.shareShareDesc == 'undefined' || this.shareShareDesc == undefined){
                this.showsShareDesc = false
            }
        }else{
            this.showsShareDesc = false
        }
    },
    components:{MessageBox,Indicator,shareCard}
}
</script>
<style>
.btn_Bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.6rem;
    box-sizing: border-box;
    background: #fff;
    padding-top: .26rem; 
}
.btn_Bottom1{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    /* height: 1.8rem; */
    box-sizing: border-box;
    background: #fff;
    padding: .24rem 0 0; 
}
.Buttons {
    display: inline-block;
    width: 8.213333rem;
    height: 1.626667rem;
    background: url(img/btn@2x.png) no-repeat;
    background-size: 8.213333rem 1.626667rem;
    color: #ffffff;
    text-align: center;
    line-height: 1.3rem;
    font-weight: 500;
    font-size: .4rem;
    padding-top: .04rem;
}
.Button_sever{
    display: inline-block;
    width: 3.92rem;
    height: 1.013333rem;
    color: #ffffff;
    text-align: center;
    line-height: 1.013333rem;
    font-weight: 500;
    font-size: .4rem;
    border-radius: .506667rem
}
.btn_Bottom .mystar{ 
    background:rgba(255,255,255,1);
    border: .0266667rem solid rgba(255,123,123,1);
    box-shadow:0px 0.08rem 0.16rem rgba(242,103,103,0.16);
    color:#E11C1C;
}
.btn_Bottom .yue{
    background:rgba(201,3,2,1);
    box-shadow:0px 0.08rem 0.16rem rgba(242,103,103,0.16);
    margin-left: 0.32rem;
}
.xiazai{
    color:#4a90e2;
 }
.ShareCard{
    padding: .533333rem .48rem 0;
    text-align: left;
}
.sharetext{
    margin-top: .346667rem;
    width: 9.04rem;
    height: 2.026667rem;
    background: url(img/card_bg2.png) no-repeat;
    background-size: 9.04rem 2.026667rem;
    padding: .533333rem .48rem 0 .586667rem;
}
.sharetext p{
    font-size: .346667rem;
    line-height: .48rem;
    color: #404040;
}
.shade{
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,0.6);
  z-index: 99999;
}
.shade-text{
  color: #fff;
  font-size: .533333rem;
  line-height: .8rem;
  text-align: center;
  padding-top: .346667rem;
}
.shade-btn{
  width: 5.493333rem;
  height: 1.013333rem;
  border: .026667rem solid #fff;
  color: #fff;
  font-size: .4rem;
  line-height: 1.013333rem;
  border-radius: 1.066667rem;
  text-align: center;
  margin: 2.4rem auto;
}
.point{
  width: 2.64rem;
  margin: .9rem 0 0 6.73333rem;
}
.share-text{
  position: absolute;
  top: 6.4rem;
  left: 2.53rem;
  color: #fff;
  font-size: .346667rem;
  text-align: center;
}
.share-btn{
  width: 3.466667rem;
  height: .853333rem;
  background: #fff2f2;
  border: .026667rem solid #fff;
  color: #c90320;
  font-size: .346667rem;
  line-height: .853333rem;
  border-radius: 1.066667rem;
  text-align: center;
  position: absolute;
  top: 10.8rem;
  left: 3.4rem;
}
</style>

