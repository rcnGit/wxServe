<template>
    <div class='activeSign'>
         <div class='business_Card' ref="card" v-show="businesscardShow">
            <div class='bus_L'>
                <img :src="headImgUrl" v-if="headimgShow"/>
                <img src='./img/man_head_img@2x.png' v-else/>
            </div>
            <div class='bus_C'>
                <p class='position_name'>财富师{{shareName}}</p>
                <p class='Invitation'>邀您参加大唐财富尊享活动</p>
            </div>
            <div class='bus_R' @click="toBusiness()"><img src='./img/rightBtn_img@2x.png'/></div>
         </div>  <!--business_card-->
        <div class='addressBox'>
          <div class='ad_m'>
              <p class='ad_tit'>{{actName}}</p>
              <div class="ad_d">
                <img src='./img/date@2x.png' class="add_icon"/>
                <p class='ad_date'>{{beginTime}} — {{endTime}}</p>
              </div>
              <div class="ad_d">
                <img src='./img/address@2x.png' class="date_icon"/>
                <p class='ad_address'>{{location}}</p>
              </div>
          </div>
        </div>
        <div class='actDe'>
            <div class='nodata' ref='nodata' v-if="contentShow">
                 <img src='./img/nodataImg@2x.png'/>
                 <p>暂无活动介绍</p>
            </div>
           <div v-else>{{content}}</div>
        </div>
         <mt-button type="danger" size="large" class='toSign' @click='sign()' v-show='isShow' :disabled="isDisabled">{{actStatus}}</mt-button>
        <!-- 底部提示框 -->
        <mt-popup v-model="popupVisible" position="center" pop-transition="popup-fade">
           <div class='pop_contant' ref='pop_contant'>
               <p class='pop_title'>大唐财富服务号</p>
               <div class='popImgBox'>
                   <img :src='erweima' style='width:80%;margin:20px auto 10px;'/>
                   <p style='color:rgb(59,59,59);font-size:14px;line-height:20px;margin-bottom:20px;text-align:center;'>扫码关注大唐财富服务号后完成报名</p>
               </div>
           </div> <!--pop_contant -->
         </mt-popup>  
        
    </div>
</template>
<script src=''></script>
<script>
let Base64 = require('js-base64').Base64;
import wx from 'weixin-js-sdk';
import { Popup } from 'mint-ui';//底部出来的弹框；
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { getCookie,setCookie } from '@/common/js/cookie.js'
import axios from 'axios'
export default {
    name:'ActiveDetail',
    data:function (){
        return{
            OaActId:'',
            actName:'',
            actStatus:'',
            beginTime:'',
            endTime:'',
            location:'',//活动地点
            subscribe:'',//是否关注
            erweima:'',
            popupVisible:false,//是否出现二维码的弹框
            content:'',
            isReviewSignup:'',
            activityType: '',
            authenticFlag: '',
            actStatusCode:'',
            isShow: false,//按钮是否显示
            isDisabled: false,
            businesscardShow: false,
            realName:'',
            userphone:'',
            businessName: '',
            belongBusiness:'',
            ghT:'',//分享者的财富师工号
            busNameT:'',//分享者财富师的名字,
            shareName:'',
            nameT:'',//分享者的名字
            headImgUrl: '',
            photoT:'',//对方的头像
            headimgShow: false,
            contentShow:true,
            photo: '',
            param:{
                activeId:'',
                actName:'',
                pageNo:1,
                comefrom:'',
            },
             paramOnly:{
                 name:'haha',
                realName:'',
                phone: '',
                verifiCode: '',
                activityType: '',
                belongBusiness: '',
                businessName: '',
                activeId: '',
                actName:'',
                isReviewSignup: '',
            },
            user:{
                userId: "",
                osFlag: 3
            },
            loadObj:{
                text: '加载中...',
                spinnerType:'triple-bounce'
            },
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0]
            },
            backUrl: location.href.split('#')[0],//微信分享
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=getUserInfo'),//接口
            paramurl: location.href.split('?')[0]
        }
       
    },
    methods:{
        zhijieSign:function(){
            var that=this;
             var message = '您确定报名此活动？'
                    MessageBox.confirm('',{
                    message: message,
                    title: '',
                    }).then(action => {
                    if(action == 'confirm'){
                        that.zhijieAjax();
                    }else{
                        
                    }
                    }).catch(() => {
                   
                    })


              
        },
        zhijieAjax:function(){
            var that=this;
             axios({
                method:'get',
                url:'/wxservice/wxservice?opName=toSignUp',
                params:{
                    param:that.paramOnly,
                }
            })
            .then(function(res){
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode== 1){
                    MessageBox('提示','验证码错误');
                }else if(retCode== 2){
                    MessageBox('提示','推送crm系统错误');
                }else if(retCode== -1){
                    MessageBox('提示','系统异常');  
                }else if(retCode== -2){
                    MessageBox('提示','绑定手机号出错');
                }else if(retCode== -3){
                    MessageBox('提示','已绑定线上财富师');
                }else if(retCode== -4){
                    MessageBox('提示','已绑定线下财富师');
                }else if(retCode== -5){
                    MessageBox('提示','财富师工号不存在');
                }else if(retCode== -6){
                    MessageBox('提示','财富师已离职');
                }else if(retCode == 0){
                    that.$router.push({
                        path: '/signSuc',
                        name: 'signSuc',
                        query:{
                            isReviewSignup:that.isReviewSignup,
                            activeId:that.param.activeId,
                            actName:that.param.actName,
                            beginTime:that.beginTime,
                            location :that.location ,
                        }
                    })
                }else if(retCode == 3){
                    var crmInfo=res.data.crmInfo;
                    if(crmInfo.retCode==1){
                         MessageBox('提示','报名失败，系统错误');
                    }else if(crmInfo.retCode==3){
                        MessageBox('提示','此活动已举办');
                    }else if(crmInfo.retCode==4){
                        MessageBox('提示','此活动已取消');
                    }else if(crmInfo.retCode==5){
                        MessageBox('提示','此活动报名已结束');
                    }else if(crmInfo.retCode==6){
                        MessageBox('提示','您已经报过名');
                    }else if(crmInfo.retCode==7){
                        MessageBox('提示','客户性质传入值错误');
                    }else if(crmInfo.retCode==8){
                        MessageBox('提示','此客户为老客户，请联系此客户专属财富师进行报名');
                    }else if(crmInfo.retCode==9){
                        MessageBox('提示','此活动已结束');
                    }else if(crmInfo.retCode==10){
                        MessageBox('提示','活动不存在');
                    }else if(crmInfo.retCode==11){
                        MessageBox('提示','此财富师不存在');
                    }
                    return;
                }//状态为三；
             
            })
        },
        getfaceId:function(){
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                if(retCode == '0'){
                    MessageBox('提示','人脸识别成功');
                    that.authentic()
                    return;
                }else if(retCode == '-2'){
                    MessageBox('提示','该身份证已绑定其他手机号');
                    return;
                }else if(retCode == '-1'){
                    //MessageBox('提示','系统异常');
                    return;
                }else if(retCode == '-3'){
                    MessageBox('提示','人脸识别未通过');
                    return;
                }else if(retCode == '-4'){
                    MessageBox('提示','未查询到人脸识别结果');
                    return;
                }
            })
        },
        getData:function(){
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getactiveinfo',//调取活动列表和详情的接口
                params: {
                    param:that.param,//系统类别
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode!=0){
                    MessageBox('提示', '系统错误');
                }else if(retCode == 0){
                    if(res.data.itemList.length<=0){
                    // that.$refs.nodata.style.display='block';
                    that.contentShow = true
                    }else{
                        that.contentShow = false;
                        that.activityType = res.data.itemList[0].activityType;
                        that.isReviewSignup = res.data.itemList[0].isReviewSignup;
                        var obj=res.data.itemList[0];
                        that.actName=obj.actName;
                        that.beginTime=obj.beginTime;
                        that.endTime=obj.endTime;
                        that.location=obj.location;
                        that.content=obj.content;
                        that.actStatusCode=obj.actStatus;
                        if(that.param.comefrom=='tangguan'){
                            that.isShow=false;
                            return;
                        }
                        if(res.data.actCanSignUp==1){//that.actStatusCode == '进行中' || that.actStatusCode == '延期中'
                            
                            if(res.data.canSignUp == '0'){
                                that.isShow = true
                                that.actStatus= '我要报名';
                            }else if(res.data.canSignUp == '1'){
                                that.isShow = true;
                                that.actStatus= '已报名';
                                that.isDisabled = true;
                            }
                        }else{
                            that.isShow = false
                        }
                        
                    }
                    
                }
                
            });
        },
        getErweima:function(){
             Indicator.open();
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=cSignSQRCode',//获取客户信息
                params: {
                    param:{
                        actId:that.OaActId,
                        sign:0,//报名
                    }
                }
            })
            .then(function(res) {
                 Indicator.close();
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
        authentic:function(){
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取客户信息
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode == 0){
                    that.subscribe=res.data.userInfo.subscribe;//是否关注
                    if(that.subscribe==0){//未关注
                        //调连接扫二维码；
                        that.getErweima();
                    }
                    that.authenticFlag = res.data.userInfo.authenticFlag//是否人脸
                    that.userphone = res.data.userInfo.phone;
                    that.realName = res.data.userInfo.realName;
                    that.paramOnly.realName=res.data.userInfo.realName;
                    if(!res.data.userInfo.businessName==false){//我的财富师
                        that.businessName = '财富师'+res.data.userInfo.businessName
                        // that.businesscardShow = true
                        that.belongBusiness = res.data.userInfo.belongBusiness
                        var actname = that.businessName+'邀请您参加'+that.actName
                        var busname = '大唐财富尊享活动'+that.actName+'即将举办，机会难得，邀请你一起参加';
                        that.asyncSDKConifg(actname,busname)
                    }else{
                        //that.photoT= res.data.userInfo.headImgUrl;
                        var nickName = res.data.userInfo.nickName;
                        var actname = nickName+'邀请您参加'+that.actName;
                        var busname = '大唐财富尊享活动'+that.actName+'即将举办，要一起参加吗？'
                        that.asyncSDKConifg(actname,busname)
                    } 
                    return;
                }else if(retCode == 400){
                    if(that.param.comefrom =='tangguan'){
                        return;
                    }else{
                            var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=activeDetail#wechat_redirect';
                    }
                    
                }else{
                    MessageBox('提示', retMsg); 
                }
            })
        },
        getPhoto:function(){
            let that = this;
            alert(that.$route.query.ghT+'=that.$route.query.ghT222222222');
            var param=Base64.encode("{'userId':'DT1603225'}");//that.user.userId
            alert(param);
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=getTCmycard&versionNo=30',//获取客户信息
                params:{
                    param:param,
                    osFlag:'3'
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                var data=Base64.decode(res.data);
                alert(data)
                data=jQuery.parseJSON(data);
                that.photo = data.photo;
                that.ghT=data.userId;
                alert(data.userId)
                that.busNameT = data.userName; //对方财富师的名字
                alert(that.busNameT);
                that.headImgUrl = that.photo
                that.shareName=that.busNameT;//对方的财富师名字
                // that.userphone = res.data.userInfo.userphone
                    
                
            })
        },
            
        sign:function(){
            var that=this; 
            that.paramOnly.activityType=that.activityType;
            if(that.activityType == 'YX'){
                if(!that.realName || !that.userphone || !that.belongBusiness){
                    that.$router.push({
                        path: '/toSignNewCust',
                        name: 'toSignNewCust',
                        query:{
                            isReviewSignup: that.isReviewSignup,
                            activityType: that.activityType,
                            activeId: that.param.activeId,
                            actName: that.actName,
                            beginTime:that.beginTime,
                            location :that.location,
                            ghT:that.ghT,
                            busNameT:that.busNameT,
                        }
                    })
                }else{
                    that.zhijieSign();
                }  //直接报名
            }else if(that.activityType == 'KF'){
                alert(that.activityType);
                that.authentic()
                if(that.authenticFlag == 0){
                    alert(that.authenticFlag)
                    that.actName=encodeURIComponent(that.actName);
                    that.$router.push({
                        path: '/faceMsg',
                        name: 'faceMsg',
                        query:{
                            returnUrl: that.Host+'weixin-h5/index.html#/ActiveDetail?oaActId='+that.OaActId+'&actName='+that.actName
                        }
                    })
                }else{
                    this.$router.push({
                        path: '/kefuSign',
                        name: 'kefuSign',
                        query:{
                            isReviewSignup: this.isReviewSignup,
                            activityType: this.activityType,
                            activeId: this.param.activeId,
                            actName: this.actName,
                            ghT:that.ghT,
                            busNameT:that.busNameT,
                        }
                    })
                }
                
            }
        },
        toBusiness:function(){
            window.location.href='https://test-interface.tdyhfund.com/tcapi/HTML5/html/shared_card.html?userId='+this.belongBusiness;
        },
        async asyncSDKConifg (actName,businessName) {
            let that = this;
            alert(actName+businessName);
            axios.get('/wxservice/core/getJSSDKConfigure.mm?pageUrl='+this.backUrl)
                .then(function (res) {
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature, // 必填，签名
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
                })
                wx.ready(function(res) { //通过ready接口处理成功验证
                    console.log(businessName)
                    // config信息验证成功后会执行ready方法
                    wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
                        title: actName, // 分享标题
                        desc: businessName, // 分享描述
                        link: location.href.split('?')[0]+'?ghT='+that.belongBusiness, // 分享链接
                        //link:window.location.href.split('#')[0] + 'static/html/redirect.html?app3Redirect=' + encodeURIComponent(window.location.href),
                        imgUrl: 'https://www.zhizhudj.com/weChat-public/spider-sign-up/static/lgoo.png?20180821', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            alert('chenggong')
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                            //alert('用户取消分享');
                        }
                        });
                        wx.onMenuShareTimeline({ //分享朋友圈
                            title: actName, // 分享标题
                            link: location.href.split('?')[0]+'?ifcard=1',
                            imgUrl: 'https://www.zhizhudj.com/weChat-public/spider-sign-up/static/lgoo.png?20180821', // 分享图标
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
    created(){
        //this.asyncSDKConifg();
        //是否糖罐入口
        var that=this;
        if(that.$route.query.comefrom=='tangguan'||that.$route.params.comefrom=='tangguan'){
            that.param.comefrom ='tangguan';
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;//回到顶部；
        var bizId=decodeURIComponent(getCookie("bizId"));
        that.faceparam.bizId = bizId;
         if(!this.$route.query.faceResult == false||bizId==null){
            that.getfaceId();
         }else{
             that.authentic()//获取客户信息
         }
         //================
        var oaActId =this.$route.params.oaActId || this.$route.query.oaActId; 
        var actName =this.$route.params.actName || this.$route.query.actName;
        if(!oaActId == true){ 
            var Activiy = localStorage.getItem('activiy')
            Activiy = JSON.parse(Activiy)
            oaActId = Activiy.huoId
            actName = Activiy.huoName
        }else{
           
        }
        this.OaActId = oaActId
        this.actName = decodeURIComponent(actName);
        Indicator.open(that.loadObj);
        var ifCard=this.$route.query.ifCard;
         if(ifCard!=''&&ifCard!=undefined){
             console.log('ifCard==='+ifCard);
             if(ifCard==1){
                 this.$refs.card.style.display='flex';
             }
         }
         that.user.userId = that.$route.query.ghT;
         if(!that.user.userId==false){//对方有财富师
            that.businesscardShow=true
             that.headimgShow = true;
              that.getPhoto()
              
         }else{
             that.businesscardShow=false;
             that.headimgShow = false;
         }
            
       





        if(oaActId!=''&&oaActId!=undefined){
            that.param.activeId=oaActId;
            that.param.actName=actName;
            that.paramOnly.activeId=oaActId;
            that.paramOnly.actName=actName;
            console.log(that.param.activeId);
            that.getData();
        }
        
        
    } 

}

 	   
</script>
<style>
    .activeSign{
        padding-bottom:50px;
    }
 .business_Card{
    box-sizing: border-box;
    padding:0 20px;
    height:60px;
    display:flex;
    background-color:rgba(0,0,0,0.4);
}
.business_Card .bus_L{
    width:45px;
    height:100%;
    float: left;
    padding-right:20px;
}
.bus_L img{
    width:50px;
    height:50px;
    margin-top:6px;
    border-radius: 100%;
}
.business_Card .bus_C{
    height:100%;
     flex: 1; 
     box-sizing: border-box;
     padding: 14px 0 0px 15px;
     text-align: left;
} 
.business_Card .bus_R{
    width:20px;
    height:100%;
    float: right;
} 
.bus_R img{
    width:14px;
    margin-top:14px;
    float:right;
}
.position_name{
    font-size: 15px;
    color:#fff;
    margin-bottom:8px;
}
.Invitation{
    font-size: 13px;
    color:#fff;
}
.addressBox{
    width:100%;
    height:149px;
}
.ad_m{
    width:96%;
    margin:10px auto;
    height:100%;    
    padding: 0 20px 0px;
    padding-top:20px;
    text-align: left;
    background:url(./img/activeDbg@2x.png)no-repeat;
    background-size:cover;
}
.ad_tit{
    font-size: 18px;
    color:#000;
    margin-bottom:20px;
    line-height:23px;
     overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
}
.ad_date{
    font-size: 14px;
    color:rgb(100, 98, 98);
    margin-bottom:7px;
    float: left;
    line-height: 20px;
}
.ad_address{
    font-size: 14px;
    color:rgb(100, 98, 98);
    line-height:18px;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
    float: left;
    line-height: 20px;
}
.actDe{
    width:96%;
    height:370px;
    margin:10px auto;
    border:1px solid #efefef;
    padding: 10px;
}
.toSign{
    width:90%;
    margin:22px auto 0;
    position: fixed;
    bottom:13px;
    left:50%;
    transform: translateX(-50%);
}
.nodata img{
    width:150px;
    margin:50px auto 0;
}
.nodata p{
    font-size: 16px;
    color:rgb(57,66,89);
}
.ad_d{
    overflow: hidden;
}
.add_icon{
    width:18px;
    height:18px;
    margin-right: 7px;
    float: left;
}
.date_icon{
    width:15px;
    height:18px;
    margin-right: 7px;
    float: left;
}
</style>

