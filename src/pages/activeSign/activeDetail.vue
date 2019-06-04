<template>
    <div class='activeSign'>
        <div>
         <div class='business_Card' ref="card" v-show="businesscardShow">
            <div class='bus_L'>
                <img :src="headImgUrl" v-if="headimgShow"/>
                <img src='../wealth/img/w.png' v-else/>
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
              <div class="lines"></div>
              <div class="add_D">
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
        </div>
        <div class='actDe'>
            <div class='nodata' ref='nodata' v-if="contentShow">
                 <img src='./img/nodataImg@2x.png'/>
                 <p>暂无活动介绍</p>
            </div>
           <div v-else style="padding: 0 .4rem;"><img src='./img/detail_tit.png' class="detail_tit"/><img :src='content' class='imgEvent' width='100%'/></div>
        </div>
         <mt-button type="danger" size="large" class='toSign' @click='sign()' v-show='isShow' :disabled="isDisabled">{{actStatus}}</mt-button>
        <!-- 底部   框 -->
        <mt-popup v-model="popupVisible" position="center" pop-transition="popup-fade" >
           <div class='pop_contant pop_contant_A' ref='pop_contant'>
               <div class='popImgBox_A'>
                   <img :src='erweima' style='width:180px;height:180px;margin:94px auto 10px;'/>
                   <p style='color:#333;font-size:14px;text-align:center;margin: 24px auto 8px;'>长按二维码</p>
                   <p style='color:#333;font-size:14px;text-align:center;'>关注大唐财富服务号后完成报名</p>
               </div>
           </div> <!--pop_contant -->
         </mt-popup>  
        </div>
    </div>
</template>
<script src=''></script>
<script>
let Base64 = require('js-base64').Base64;
import wx from 'weixin-js-sdk';
import { Popup } from 'mint-ui';//底部出来的弹框
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//   框
import { Toast } from 'mint-ui';
import { getCookie,setCookie } from '@/common/js/cookie.js'
import axios from 'axios'
import merge from 'webpack-merge'
export default {
    name:'activeDetail',
    data:function (){
        return{
            shareLink:'',
            actId:'',
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
                realName:'',
                phone: '',
                verifiCode: '',
                activityType: '',
                belongBusiness: '',
                businessName: '',
                activeId: '',
                actName:'',
                isReviewSignup: '',
                appointState: '0'
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
                backUrl: location.href.split('?')[0],
                phone:''
            },
            backUrl: encodeURIComponent(location.href.split('#')[0]),//微信分享
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=getUserInfo'),//接口
            paramurl: location.href.split('?')[0],
            token:'',
            comefrom:'',
            ifCard:''
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
                        Indicator.open();
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
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode== 1){
                    MessageBox('   ','验证码错误');
                }else if(retCode== 2){
                    MessageBox('   ','推送crm系统错误');
                }else if(retCode== -1){
                    MessageBox('   ','系统异常');  
                }else if(retCode== -2){
                    MessageBox('   ','绑定手机号出错');
                }else if(retCode== -3){
                    MessageBox('   ','已绑定线上财富师');
                }else if(retCode== -4){
                    MessageBox('   ','已绑定线下财富师');
                }else if(retCode== -5){
                    MessageBox('   ','财富师工号不存在');
                }else if(retCode== -6){
                    MessageBox('   ','财富师已离职');
                }else if(retCode == 0){
                    that.$router.push({
                        path: '/signSuc',
                        name: 'signSuc',
                        query:{
                            isReviewSignup:that.isReviewSignup,
                           // activeId:that.param.activeId,
                           // actName:that.param.actName,
                            activeId:that.actId,
                            actName:that.actName,
                            beginTime:that.beginTime,
                            location :that.location ,
                        }
                    })
                }else if(retCode == 3){
                    var crmInfo=res.data.crmInfo;
                    if(crmInfo.retCode==1){
                         MessageBox('   ','报名失败，系统错误');
                    }else if(crmInfo.retCode==3){
                        MessageBox('   ','此活动已举办');
                    }else if(crmInfo.retCode==4){
                        MessageBox('   ','此活动已取消');
                    }else if(crmInfo.retCode==5){
                        MessageBox('   ','此活动报名已结束');
                    }else if(crmInfo.retCode==6){
                        MessageBox('   ','您已经报过名');
                    }else if(crmInfo.retCode==7){
                        MessageBox('   ','客户性质传入值错误');
                    }else if(crmInfo.retCode==8){
                        MessageBox('   ','此客户为老客户，请联系此客户专属财富师进行报名');
                    }else if(crmInfo.retCode==9){
                        MessageBox('   ','此活动已结束');
                    }else if(crmInfo.retCode==10){
                        MessageBox('   ','活动不存在');
                    }else if(crmInfo.retCode==11){
                        MessageBox('   ','此财富师不存在');
                    }
                    return;
                }
             
            })
        },
        getfaceId:function(){
            this.faceparam.phone = this.$route.query.phone
            //var canshu=returnUrl
            var that=this;
            var idCardNo=that.$route.query.idNo
            var idCardName=encodeURIComponent(that.$route.query.name)
           // alert(that.faceparam.phone+'.....'+that.faceparam.bizId)
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                Indicator.close();
                console.log(res.data);
                var retCode=res.data.retCode;
               // alert(retCode)
               // var returnUrl = that.$route.query.returnUrl;
               var returnUrl = that.Host+'weixin-h5/index.html#/activeDetail?phone='+that.faceparam.phone+'&name='+idCardName+'&idNo='+idCardNo+'&ghT='+that.belongBusiness+'&actId='+that.actId+'&actName='+encodeURIComponent(that.actName)
                //修改原有参数        
                that.$router.push({
                    query:merge(that.$route.query,{'faceResult':''})
                })
                if(retCode == '0'){
                    that.trafficStatistics('019')//自定义埋点
                    Toast({
                        message: '人脸识别成功',
                        position: 'center',
                        duration: 3000
                    });
                    
                    that.authentic()
                    return;
                }else if(retCode == '-2'){
                    that.trafficStatistics('017')
                    that.trafficStatistics('020')
                    //MessageBox('   ','该身份证已绑定其他手机号');
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
                }else if(retCode == '-1'){
                    that.trafficStatistics('020')
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
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
                                var canshu=that.Host+'weixin-h5/index.html#/activeDetail?phone='+that.faceparam.phone+'&name='+encodeURIComponent(that.$route.query.name)+'&idNo='+idCardNo+'&ghT='+that.belongBusiness+'&actId='+that.actId+'&actName='+encodeURIComponent(that.actName)+'&tp='+type
                                that.getface(idCardNo,idCardName,canshu,type)
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                that.authentic()//获取客户信息
                            }
                        })

                    // }else{
                    //     var message = '人脸识别实名认证失败，请重试。若无法完成人脸识别实名认证可'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">【下载大唐财富app】</a>'+'，通过绑卡完成实名认证后报名活动。'
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
                    //             that.authentic()//获取客户信息
                    //         }
                    //     })
                    // }
                    return;
                }
                // else if(retCode == '-3'){
                //     that.trafficStatistics('020')
                //     MessageBox('   ','人脸识别未通过');
                //     return;
                // }else if(retCode == '-4'){
                //     that.trafficStatistics('020')
                //     MessageBox('   ','未查询到人脸识别结果');
                //     return;
                // }
            })
        },
        getData:function(){
             let that = this;
             that.param.activeId=that.actId;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getactiveinfo',//调取活动列表和详情的接口
                params: {
                    param:that.param,//系统类别
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode!=0){
                    MessageBox('   ', '系统错误');
                }else if(retCode == 0){
                    if(res.data.itemList.length<=0){
                    // that.$refs.nodata.style.display='block';
                    that.contentShow = true
                    }else{
                        that.contentShow = false;
                        that.activityType = res.data.itemList[0].activityType;
                        that.isReviewSignup = res.data.itemList[0].isReviewSignup;
                        that.paramOnly.isReviewSignup = res.data.itemList[0].isReviewSignup;
                        var obj=res.data.itemList[0];
                        that.actName=obj.actName;
                        that.paramOnly.actName=obj.actName;
                        that.beginTime=obj.beginTime;
                        that.endTime=obj.endTime;
                        that.location=obj.location;
                        that.content=obj.bulletinFile;
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
                                that.actStatus= '已申请';
                                that.isDisabled = true;
                            }
                        }else{
                            that.isShow = true;
                            that.actStatus= '已结束报名';
                            that.isDisabled = true;
                        }
                        
                    }
                    
                }
                
            });
        },
        getErweima:function(){
            var that=this;
             Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=cSignSQRCode',//获取客户信息
                params: {
                    param:{
                        actId:that.actId,
                        sign:'0',//报名
                        ghT:that.ghT,
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
                console.log(res.data)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg; 
                if(retCode == 0){
                    
                    if(!that.ghT==false){//对方有财富师
                        //that.businesscardShow=true
                        if(that.ghT.indexOf(",")>-1){
                        }else{
                            if(that.ghT != "undefined"){
                                that.headimgShow = true;
                                that.getPhoto()
                            }
                        }
                    }else{
                      //  that.ghT = res.data.userInfo.belongBusiness
                        //that.businesscardShow=false;
                        that.headimgShow = false;
                    }

                    that.getData();
                    that.subscribe=res.data.userInfo.subscribe;//是否关注
                    
                    that.authenticFlag = res.data.userInfo.authenticFlag//是否人脸
                    that.userphone = res.data.userInfo.phone;
                    that.realName = res.data.userInfo.realName;
                    that.paramOnly.realName=res.data.userInfo.realName;
                    that.paramOnly.phone=res.data.userInfo.phone;
                    that.paramOnly.businessName=res.data.userInfo.businessName
                    that.paramOnly.belongBusiness=res.data.userInfo.belongBusiness
                    if(!res.data.userInfo.businessName==false){//我的财富师
                        that.businessName = '财富师'+res.data.userInfo.businessName
                        // that.businesscardShow = true
                        that.belongBusiness = res.data.userInfo.belongBusiness
                        var actname = that.businessName+'邀请您参加'+that.actName
                        var busname = '大唐财富尊享活动'+that.actName+'即将举办，机会难得，邀请你一起参加';
                        var mygh = res.data.userInfo.belongBusiness
                        that.Share(mygh)
                        that.asyncSDKConifg(actname,busname)
                    }else{
                        that.Share('')
                        //that.photoT= res.data.userInfo.headImgUrl;
                        if(!res.data.userInfo.nickName==false){
                            var nickName = res.data.userInfo.nickName;
                            var actname = nickName+'邀请您参加'+that.actName;
                            var busname = '大唐财富尊享活动'+that.actName+'即将举办，要一起参加吗？'
                            that.asyncSDKConifg(actname,busname)
                        }else{
                            var nickName = ''
                        }
                    } 
                    return;
                }
                else if(retCode == 400){
                    if(that.param.comefrom =='tangguan'){
                        return;
                    }else{
                            var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=activeDetail_'+that.actId+','+that.actName+','+that.ifCard+','+that.$route.query.comefrom+','+that.ghT+'#wechat_redirect';
                    }                   
                }
                else{
                    MessageBox('   ', retMsg); 
                }
            })
        },
        Share:function(mygh) {
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
                if(mygh.length>9){
                    this.shareLink = this.Host+'weixin-h5/static/html/redirect.html?app3Redirect=' + encodeURIComponent(window.location.href+'&ghT='+mygh)
                }else{
                    this.shareLink = this.Host+'weixin-h5/static/html/redirect.html?app3Redirect=' + encodeURIComponent(window.location.href+'&ifCard=1&ghT='+mygh)
                }
                
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //android
                if(mygh.length>9){
                    this.shareLink = location.href.split('?')[0]+'?ghT='+mygh+'&actId='+this.actId+'&actName='+encodeURIComponent(this.actName)
                }else{
                    this.shareLink = location.href.split('?')[0]+'?ifCard=1&ghT='+mygh+'&actId='+this.actId+'&actName='+encodeURIComponent(this.actName)
                }
                
            }
            }
    
        },
        getPhoto:function(){ 
            let that = this;
            Indicator.open();
            
            var param=Base64.encode('{"userId":"'+that.ghT+'"}');//that.user.userId
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
                console.log(res.data)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode == 0){
                   // var data=Base64.decode(res.data);
                   // data=jQuery.parseJSON(data);
                    var data=res.data
                    that.photo = data.photo;
                    that.ghT=data.userId;
                    that.busNameT = data.userName; //对方财富师的名字
                    if(!that.photo==false){
                        that.headImgUrl = that.photo
                    }else{
                        that.headimgShow=false;
                    }
                    that.shareName=that.busNameT;//对方的财富师名字
                    // that.userphone = res.data.userInfo.userphone
                }else if(retCode == "-2"){
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },
            
        sign:function(){
            this.trafficStatistics('003')
            var that=this; 
            if(that.subscribe==0){//未关注
                //调连接扫二维码；
                that.getErweima();
                return;
            }
            that.paramOnly.activityType=that.activityType;
            if(that.activityType == 'YX'){
                if(!that.realName || !that.userphone || !that.belongBusiness){//有姓名说明已经实名
                    that.$router.push({
                        path: '/toSignNewCust',
                        name: 'toSignNewCust',
                        query:{
                            isReviewSignup: that.isReviewSignup,
                            activityType: that.activityType,
                            activeId: that.actId,
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
                that.authentic()
                if(that.authenticFlag == 0){
                    that.actName=encodeURIComponent(that.actName);
                    that.$router.push({
                        path: '/faceMsg',
                        name: 'faceMsg',
                        query:{
                            returnUrl: that.Host+'weixin-h5/index.html#/activeDetail?actId='+that.actId+'&actName='+that.actName+'&ghT='+that.belongBusiness
                        }
                    })
                }else{
                    that.$router.push({
                        path: '/kefuSign',
                        name: 'kefuSign',
                        query:{
                            isReviewSignup: that.isReviewSignup,
                            activityType: that.activityType,
                            activeId:that.actId,
                            actName: that.actName,
                            ghT:that.ghT,
                            busNameT:that.busNameT,
                        }
                    })
                }
                
            }
        },
        toBusiness:function(){
           // alert(this.paramOnly.belongBusiness)
            var urlCan='{"userId":"'+this.ghT+'","sourceModule":"2"}'
            urlCan = Base64.encode(urlCan);	
            var urlCan1='{"userId":"'+this.ghT+'","sourceModule":"0"}'
            urlCan1 = Base64.encode(urlCan1);
            this.trafficStatistics('002')
            if(this.comefrom == 'tangchao'){
                if(this.paramOnly.belongBusiness == this.ghT){
                    window.location.href=this.tgHost+'?paramCan='+urlCan1 //分享不带channel,糖巢名片
                }else{
                    window.location.href=this.Host+'weixin-h5/index.html#/wealthCard?userId='+this.ghT+'&sourceModule=0' //微信名片
                }   
            }else{
                if(this.paramOnly.belongBusiness == this.ghT){
                    window.location.href=this.tgHost+'?paramCan='+urlCan    //wx分享不带channel
                }else{
                    window.location.href=this.Host+'weixin-h5/index.html#/wealthCard?userId='+this.ghT+'&sourceModule=2'  //微信名片
                }
            }   
            //
        },
        async asyncSDKConifg (actName,businessName,mygh) {
            let that = this;
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
                wx.ready(function(res) { //通过ready接口处理成功验证
                    
                    // config信息验证成功后会执行ready方法
                    wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
                        title: actName, // 分享标题
                        desc: businessName, // 分享描述
                       // link: location.href.split('?')[0]+'?ifCard=1&ghT='+that.belongBusiness+'&actId='+that.actId+'&actName='+that.actName, // 分享链接
                       // link:'https://interface.tdyhfund.com/weixin-h5/' + 'static/html/redirect.html?app3Redirect=' + encodeURIComponent(window.location.href+'&ifCard=1'),
                        link: that.shareLink,
                       imgUrl: 'http://file0.datangwealth.com/g1/M00/16/50/rBAeX1ybKCiAEKkxAADvNDguF4c858.png?filename=share.png', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            //('chenggong')
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                            //alert('用户取消分享');
                        }
                        });
                        wx.onMenuShareTimeline({ //分享朋友圈
                            title: actName, // 分享标题
                            //link: location.href.split('?')[0]+'?ifCard=1&ghT='+that.belongBusiness+'&actId='+that.actId+'&actName='+that.actName,
                            //link:'https://interface.tdyhfund.com/weixin-h5/' + 'static/html/redirect.html?app3Redirect=' + encodeURIComponent(window.location.href+'&ifCard=1'),
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
    created(){
       // this.asyncSDKConifg();
        //是否糖罐入口
        var that=this;
        if(that.$route.query.comefrom=='tangguan'||that.$route.params.comefrom=='tangguan'){
            that.param.comefrom ='tangguan';
            that.getData();
        }
        
        document.body.scrollTop = document.documentElement.scrollTop = 0;//回到顶部；
        var bizId=decodeURIComponent(getCookie("bizId"));
        that.faceparam.bizId = bizId;
         if(!that.$route.query.faceResult == false||bizId==null){
            that.getfaceId();
         }else{
             that.authentic()//获取客户信息
         }

        var wxstr =decodeURIComponent(that.$route.query.actId); 
        var actId=wxstr.split(",")[0];
        that.actId=wxstr.split(",")[0];
        //alert(that.$route.query.actId+'===='+that.actId)
        if(!that.$route.query.ghT==false){
            that.ghT=that.$route.query.ghT;
            if(that.ghT.toString().length>9){
                that.ghT = that.ghT.toString().substr(that.ghT.toString().length-9,that.ghT.toString().length); //二次分享多拼参数截取
            }
        }else{
            
            if(that.$route.query.ghT == ''){
                that.ghT=that.$route.query.ghT; 
               
            }else{
                if(wxstr.split(",").length>5){
                    that.ghT=wxstr.split(",")[5];
                }else{
                    that.ghT=wxstr.split(",")[4];
                } 
            }
            
            
        }
        var actName =that.$route.query.actName;
        if(!that.$route.query.actName==false){
            that.actName=decodeURIComponent(that.$route.query.actName);
        }else{
            that.actName=decodeURIComponent(wxstr.split(",")[1]);
        }
        that.param.activeId=actId;
        if(!actId == true){ 
            var Activiy = localStorage.getItem('activiy')
            Activiy = JSON.parse(Activiy)
            actId = Activiy.huoId
            actName = Activiy.huoName
        }
        
        Indicator.open(that.loadObj);

        if(actId!=''&&actId!=undefined){
            that.param.activeId=actId;
            that.param.actName=actName;
            that.paramOnly.activeId=actId;
            that.paramOnly.actName=actName;
           // that.getData();
        }
       // that.actId = that.$route.query.actId


        if(!that.$route.query.ifCard==false){
            that.ifCard=that.$route.query.ifCard;
        }else{
            that.ifCard=wxstr.split(",")[2];
        }
        
         if(that.ifCard!=''&&that.ifCard!=undefined){
             console.log('ifCard==='+that.ifCard);
             that.ifCard = that.ifCard.toString().substr(that.ifCard.toString().length-1,that.ifCard.toString().length)
             if(that.ifCard==1){
                 //that.$refs.card.style.display='flex';
                 if(that.ghT == '' || that.ghT ==undefined || that.ghT =='undefined'|| that.ghT.indexOf(",")>-1){
                    that.businesscardShow=false
                 }else{
                    that.businesscardShow=true
                 }
             }
         }
         that.user.userId = that.$route.query.ghT;
         
        if(!that.$route.query.comefrom==false){
            that.comefrom=that.$route.query.comefrom;
        }else{
            that.comefrom=wxstr.split(",")[3];
        }
            
        
        
        
    },
    beforeRouteLeave(to, from, next) {
         // 设置下一个路由的 meta
        to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
        next();
    }
    //  beforeRouteLeave(to, from, next) {
    //      alert('返回');
    //      console.log(to);
    //      console.log(from);
    //      console.log(next);
    //      alert(to.path == "/active");
    //    if (to.path == "/active") {
    //      from.meta.keepAlive = true;//走缓存
    //      to.meta.keepAlive = true;
    //    } else {
    //      to.meta.keepAlive = false;
    //      from.meta.keepAlive = false;
    //    }
    //    next();
    //  }

}

 	   
</script>
<style>
.imgEvent{
    pointer-events: all;
}
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
    min-height: 4.253333rem;
    border-bottom: .333333rem solid #F9F9F9;
}
.ad_m{
    width:100%;
    height:100%;    
    text-align: left;
    
}
.ad_tit{
    padding: .533333rem .4rem 0;
    font-size: .48rem;
    color:#333;
    margin-bottom:20px;
    line-height: .72rem;
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
    width: 92%;
}
.actDe{
    width:100%;
    min-height:370px;
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
.add_D{
    padding: .453333rem .4rem;
}
.ad_d{
    overflow: hidden;
}
.add_icon{
    height: .32rem;
    margin-right: .253333rem;
    float: left;
    margin-top: 0.056rem;
}
.date_icon{
    height: .32rem;
    float: left;
    margin: 0.053rem .253333rem 0 0.03rem;
}
.pop_contant_A{
background:url(./img/weimaBg.png) no-repeat!important;
width:280px!important;
background-size:cover!important;
height:360px!important;
}
.mint-popup.mint-popup-center{
    border-radius: 10px;
}
.popImgBox_A{
    padding: 0!important;
    width:100%;
    overflow: hidden
}
.addressBox .lines{
    width: 100%;
    height: 1px;
    background: #E6E6E6;
}
.detail_tit{
    width: 4.24rem;
    height: .466667rem;
    margin: .8rem auto;
}
</style>

