<template>
    <div class='shareCard' >
        <div class="main" id="capture">
            <div class="top_message" style="position: relative;">   
            <div v-show="isshowstar">
             <img class="star_wei" src="./img/star_wei.gif" v-if="islightStar" @click="openQuestions"> 
             <img class="star_wei" src="./img/star_yi.png" v-else > 
            </div> 
                <div class="headB">
                    <img class="headB_avatar" :src="shareImg" v-if="showShareimg">
                    <img class="headB_avatar" src='./img/header_default.png' v-else/>
                    <img class="headB_right" src="./img/card_bgright.png">
                    <p class="name">{{name}}</p>
                    <p class="level">{{jobLevelName}}</p>
                    <img class="declaration" src="./img/declaration.png" alt="">
                    <!-- <p class="office">
                        大唐财富投资管理有限公司总部/金融科技部</p> -->
                        <div class="ageLimit">
                            <p class="year">
                                <span class="yearText">{{workYears}}</span>年</p>
                                <p class="caption">从业年限</p>
                        </div>
                        <div class="assetSize">
                            <p class="asset"><span class="assetText">{{transactAmount}}</span>{{unit}}</p>
                            <p class="caption">顾问资产规模</p>
                        </div>
                        <p class="capacityLab">能力标签</p>
                        <ul class="tabs"  v-if="isshowLab">
                            <li v-for="(item,index) in capacityArr" :index='index' class="tabsList" >{{item}}</li>
                        </ul>
                        <ul class="tabs" v-else>
                            <p class="noCapacity" ><img class="noCapaImg" src="./img/noCapacity.png"/><span>暂无哦，快去打个标吧~</span></p>
                        </ul>
                        <div class="placing">
                            <i class="cardPlace cardbg"></i>
                            <p class="cardInput place">{{place}}</p>
                        </div>
                    </div>
                </div>
                <div id="contract_wrap">
                    <ul class="contact_ul">
                           <li class="contact_list phone_list" style="display: list-item;" v-show="showPhone">
                            <a class="phone" :href="'tel:' + mobiles" style="box-sizing: border-box;">	
                                <p>
                                    <img src="./img/telephone_img.png" class="contact_img"><span class="contact_telephone">电话</span>
                                </p>
                                <p class="contact_text telephone_text">{{mobiles}}</p>
                                
                            </a>
                        </li>   
                        <li class="contact_list copy_list" id="wechating" @click="copy_wechat">
                            <p>
                                <img src="./img/contact_wechat.png" class="contact_img"><span class="contact_wechat">加我微信</span>
                            </p>
                            <p class="contact_text wechat_text" id="wechat_text">{{wechat}}</p>
                        </li>
                        <li class="contact_list copy_list" id="mailing" @click="copy_email">
                            <p>
                                <img src="./img/contact_mail.png" class="contact_img"><span class="contact_mail">邮箱</span>
                            </p>
                            <p class="contact_text mail_text" id="mail_text">{{email}}</p>
                        </li>
                        <li class="contact_list copy_list" style="background-size:99% 100%;" id="dressing"  @click="copy_dress">
                            <p>
                                <img src="./img/contact_dress.png" class="contact_img"><span class="contact_dress">地址</span>
                            </p>
                            <p class="contact_text dress_text" id="dress_text">{{place}}</p>
                        </li>  
                    </ul>
                    
                </div>
                <div class="othermes">
                    <ul>
                        <li v-show="showInvite">
                            <p>好友助力</p>
                            <div class="userInviteList">
                                <section class="list_tit">
                                    <span>用户</span>
                                    <span style="padding: 0 2.4rem;">电话</span>
                                    <span>状态</span>
                                </section>
                                <p v-if="showInviteList" style="font-size: .32rem;line-height: .48rem;color: #666; padding: .5rem .4rem .3rem;font-weight:400;">
                                    您已为专属财富师点亮服务之星，暂无好友助力点亮，好友助力成功后您可获取大唐福星相关权益，快来参与吧~
                                    </p>
                                <div v-else>
                                <div v-for="(item,index) in userInviteList" :index='index' class="list_tr"  v-if="index < 5" >
                                    <span class="inv_name">{{item.userName}}</span>
                                    <span class="inv_phone">{{item.phone}}</span>
                                    <span class="inv_flag">{{item.flag}}</span>
                                    <!-- <div style="width:80%;height:2px;background: #f6f6f6;"></div> -->
                                </div>
                                
                                <div v-for="(item,index) in userInviteList" :index='index' class="list_tr"  v-if="index > 4" v-show="showmorelist">
                                    <span class="inv_name">{{item.userName}}</span>
                                    <span class="inv_phone">{{item.phone}}</span>
                                    <span class="inv_flag">{{item.flag}}</span>
                                    <!-- <div style="width:80%;height:2px;background: #f6f6f6;"></div> -->
                                </div>
                                <ul v-show="showMoreimg" @click="list_more">
                                    <img class="list_more" src="./img/more@2x.png"  v-if="showpull">
                                    <img class="list_more" src="./img/show@2x.png" v-else>
                                </ul>
                                </div>
                            </div>
                            <p style="font-size: .32rem;line-height: .48rem;color: #9C9C9C; padding-top: .533333rem;text-align: justify;font-weight: 400;">
                            您的点亮奖励将在活动结束后15个工作日内，由客服中心统一发放，如有疑问请联系您的财富师，或拨打客服电话：400-819-9868或400-819-9858
                            </p>
                        </li>
                        <li v-show='showIntroduce'><p>个人简介</p>
                            <div class="introduce" v-html="introduce"></div>
                        </li>
                        <li>
                            <p>服务内容</p>
                            <div class="servicecontent" v-html="servicecontent"></div>
                        </li>
                        <li>
                            <p>服务理念</p>
                            <div class="serviceidea" v-html="serviceidea"></div>
                        </li>
                        <li v-show='shoWealthStory'>
                            <p>财富故事</p>
                            <div class="wealthStory" v-html="wealthStory"></div>
                        </li>
                        <li v-show="isshowlabel" style="padding-bottom:.1rem;">
                            <p>客户评价</p>
                            <div class="evaluate">
                                <!-- <span class="evaluateCon">专业胜任</span>
                                <span class="evaluateCon">专业胜任</span>
                                <span class="evaluateCon">专业胜任</span>
                                <span class="evaluateCon">专业胜任</span>
                                <span class="evaluateCon">专业胜任</span>
                                <span class="evaluateCon">专业胜任</span> -->
                                <span v-for="(item,index) in labelListArr" :index='index' class="evaluateCon"  >{{item}}</span>
                            </div>
                        </li>
                        
                    </ul>
                    </div>
                </div>
                <div class="copy_success" v-show='isCopy'>
                    <img src="./img/copy_right.png" alt="">
                    <p>复制成功</p>
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
import {handleClipboard } from '@/common/js/clipboard.js'//vue 复制功能
import clip from '@/common/js/clipboard.js'//vue 复制功能
export default {
    name:'wealthCard',
    data:function(){
        return{
            isCopy:false,
            showPhone: true,
            showInvite: false,
            showInviteList:true,
            showSeverbtn: true,
            showmorelist: false,
            showMoreimg: false,
            isshowLab: false,
            showpull:true,
            isshowstar: false,
            islightStar: true,
            showShareimg: false,
            paramurl: location.href.split('?')[0],
            businessName:'',
            ghT:'',
            mobiles:'',
            backUrl: location.href.split('?')[0],
            userId:'',
            idNo:'',
            shareLink:'',
            belongBusiness:'',
            shareImg:'',
            serviceidea:'',//服务理念
            introduce:'',//个人简介
            jobLevelName:'',//级别
            servicecontent:'',//服务内容
            detailedInfo:'',//0有详细信息，1没有
            email:'暂未填写',//财富师邮箱
            name:'',
            wechat:'暂未填写',//微信号
            userInviteList: [],//推荐列表
            place:'暂未填写',
            capacityArr:[],
            workYears:'',
            isshowlabel:false,
            labelListArr:[],
            transactAmount:'',//资产规模
            unit:'万元',
            shoWealthStory:false,
            wealthStory:'',
            showIntroduce:false,
            loadObj:{
                text: '加载中...',
                spinnerType: 'triple-bounce'
            },
        }
    },
    inject:['openQuestion'],
    methods:{
        copy_wechat:function(){
           var text=this.wechat;
           this.handleCopy(text,event); 
        },
        handleCopy(text, event) {
            this.isCopy = true
            console.log(text);
           clip(text, event)
           console.log('clicp')
           setTimeout(() => {
            this.isCopy =false
            }, 3000)
        },
        copy_dress:function(){
            var text=this.place;
           this.handleCopy(text,event); 
        },
        copy_email:function(){
            var text=this.email;
           this.handleCopy(text,event); 
        },
        getWealthname:function(ifcard){ 
            let that = this;
            Indicator.open(that.loadObj);
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
                    if(ifcard == '1'){
                        if(data.mobileSwitch == '0'){//0：开，1：关闭
                            that.mobiles = data.mobile
                        }else{
                            that.showPhone = false
                        }
                    }else{
                        that.mobiles = data.mobile
                    }
                   // data.levelSwitch = 0
                    if(data.levelSwitch == '0'){//levelSwitch 职级开关：0关;1开
                        that.jobLevelName= ''
                    }else{
                        that.jobLevelName= data.jobLevelName 
                    }
                    if(data.fundSwitch == '0'){//fundSwitch 顾问资产规模开关:0开;1关
                        that.transactAmount = '****'
                        that.unit = ''
                    }else{
                        that.transactAmount = data.transactAmount
                    }
                    if(!data.photo == false){
                        that.showShareimg = true
                        that.shareImg = data.photo
                    }
                    that.serviceidea= data.serviceIdea//服务理念
                    if(!data.introduce == false){
                        that.showIntroduce = true
                        that.introduce= data.introduce//个人简介
                    }
                    
                   // that.jobLevelName= data.obLevelName//级别
                    that.servicecontent= data.serviceContent//服务内容
                    that.detailedInfo= data.detailedInfo//0有详细信息，1没有
                    if(!data.email == false){
                        that.email= data.email//财富师邮箱
                    }
                    
                    that.name= data.userName
                    
                    if(!data.weChat == false){
                        that.wechat= data.weChat//微信号
                    }
                    
                    
                    if(!data.place == false){
                        that.place = data.place //地址
                    }
                    
                    if(!data.capacityLabChn == false){
                        var capacityLab =data.capacityLabChn
                        that.isshowLab = true
                        that.capacityArr = capacityLab.split(',');
                        console.log(that.capacityArr); 
                    }else{
                        that.isshowLab = false
                    }
                    that.workYears = data.workYears;
                    if(!data.lableList == false){
                        var labelList =data.lableList;
                        that.isshowlabel = true
                        that.labelListArr = labelList.split(',');
                        console.log(that.labelListArr)
                    }else{
                        that.isshowlabel = false
                    }
                    if(!data.wealthStory == false){
                        that.shoWealthStory = true
                        that.wealthStory = data.wealthStory
                    }else{
                        that.shoWealthStory = false
                    }
                    Indicator.close();
                }else if(retCode == "-2"){
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },
        openQuestions:function(){
            //点亮服务之星页
            this.openQuestion();
        },
        getServerStar:function(){
          //  Indicator.open(this.loadObj);
            this.isshowstar = true
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getServerStar',//获取用户信息
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
                if(retCode=='0'){
                   if(Data.data.isLighten == 0){
                       that.islightStar = true
                   }else{
                     that.islightStar = false
                     that.showInvite = true
                     if(Data.data.userInviteList.length>0){
                        that.showInviteList = false
                        that.userInviteList = Data.data.userInviteList
                    //    that.userInviteList =[{flag: "已成交",
                    //     phone: "132****2121",
                    //     userName: "谢*东"},
                    //     {flag: "已成交已成交",
                    //     phone: "132****2121",
                    //     userName: "谢*东"},
                    //     {flag: "已成交",
                    //     phone: "132****2121",
                    //     userName: "谢*东"},
                    //     {flag: "已成交已成交",
                    //     phone: "132****2121",
                    //     userName: "谢*东"},
                    //     {flag: "已成交",
                    //     phone: "132****2121",
                    //     userName: "谢*东"},
                    //     {flag: "已成交已成交",
                    //     phone: "132****2121",
                    //     userName: "谢*东"},]
                        if(that.userInviteList.length>5){
                            that.showMoreimg = true
                        }
                     }
                     
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
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severStar_'+that.userId+','+that.sourceModule+','+that.channel+'#wechat_redirect';
                }
            })
        },
        getServerStarAPP:function(id){
           // Indicator.open(this.loadObj);
           if(id == 1){
            this.isshowstar = true
            let that = this;
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
                 if(retCode=='0'){
                   if(Data.data.isLighten == 0){
                       that.islightStar = true
                   }else{
                     that.islightStar = false
                     that.showInvite = true
                     if(Data.data.userInviteList.length>0){
                        that.showInviteList = false
                        that.userInviteList = Data.data.userInviteList
                        if(that.userInviteList.length>5){
                            that.showMoreimg = true
                        }
                     }
                     
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
           }
            
        },
        list_more:function(){
         this.showmorelist = !this.showmorelist
         this.showpull = !this.showpull
        },
        getdtNo:function(dtNo,idNo,ifcard,SOURCE,id){
            Indicator.open(this.loadObj);
            this.userId = dtNo
            this.idNo = idNo
            if(ifcard != 1){
                if(SOURCE == 'TG'){
                    this.getServerStarAPP(id)
                }else{
                    this.getServerStar()
                }
            }
            
            this.getWealthname(ifcard)
        }
    },
    mounted:function(){
        Indicator.open(this.loadObj);
        $('.shareCard').css({"min-height":document.body.scrollHeight})
    },
    components:{MessageBox,Indicator}
}
</script>
<style>
 @import 'css/financial_card.css';  
 @import 'css/card_blank.css';  
 .shareCard{
     text-align: left;
     background: #f9f9f9;
 }  
.xiazai{
    color:#4a90e2;
 }
 .star_wei{
    width: .76rem;
    position: absolute;
    left: .76rem;
    z-index: 9999;
    top: .41rem;
 }
.userInviteList{
    border: .026667rem solid #DFDFDF;
    border-radius: .106667rem;
    padding-bottom: .2rem;
}
.list_tr{
    /* border-bottom: .026667rem solid #f6f6f6; */
    margin: 0 .15rem; 
    height: .9rem;
    clear: both;
    line-height: .9rem !important;
    position: relative;
}
 .list_tr::before{
    content: "";
    width: 7.866667rem;
    height: .026667rem;
    background: #f6f6f6;
    position: absolute;
    top: -.22rem;
    left: .53rem;
}
.userInviteList .list_tr:first-of-type::before{
    opacity: 0;
} 
.list_tit {
    border-bottom: .026667rem solid #efefef;
    padding: .2rem .826667rem .1rem;
    line-height: 1rem !important;
    overflow: hidden;
}
.list_tit span{
    font-size: .373333rem;
    color: #2A2A2A;
    display: block;
    float: left;
}
.list_tr span{
    display: block;
    text-align: center;
    float: left;
    font-size: .373333rem;
    color: #666;
}
.inv_name{
    width: 2.25rem;
    font-size: .373333rem;
    white-space: nowrap;
    overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
    -webkit-line-clamp: 1;/*此为两行，设置行数*/
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /*! autoprefixer: on */
	max-width: 2.25rem; 
}
.inv_phone{
    width: 4.3rem;
    font-size: .373333rem;
}
.inv_flag{
    width: 2.12rem;
    font-size: .373333rem;
    white-space: nowrap;
}
.list_more{
    width: .48rem;
    margin: .433rem auto .233rem;
    display: block;
}
.copy_success {
    width: 2.66667rem;
    height: 2.66667rem;
    position: fixed;
    top: 40%;
    left: 36%;
    padding-top: .48rem;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.7);
    border-radius: .066667rem;
    font-size: .32rem;
    color: #ffffff;
    text-align: center;
    z-index: 2000;
}
.copy_success img {
    width: 1.146667rem;
}
</style>
