<template>
    <div id='toSignNewCust'>
        <div class='content'>
            <div class='tip'>
                <span>手机号录入后将做加密处理，保证您的信息安全</span>
              <!-- <img src='./img/left_img@2x.png' class='left_img'/>   -->
            </div>
            <div class='inpBox'>
                <input type='text' class='' v-model="param.realName" :disabled="isDisabled" ref="realName" placeholder="请输入姓名"/>
                <p class='warn' ref='warnName' v-show='warnShow'>{{warnName}}</p>
                <span>姓名</span>
                 <!-- <img src='./img/card_img@2x.png' class='clear' style='right:33%;'/>  -->
             </div>
            <div class='inpBox'>
                <input type='hidden' class=''style='padding-right:100px;'maxlength='11' v-model="param.phone" ref='phone' />
                <input type='tel' class=''style='padding-right:100px;'maxlength='11' v-model="phone2" ref='phone2' :disabled="isDisabled2" placeholder="请输入手机号" />
                <p class='warn' ref='warnPhone' v-show='true'>{{warnPhone}}</p>
                <span>手机号</span>
                <span class='inpRchoose fSize13' style='color:#4a90e2;' @click='changeP()' v-show='isShow'>变更手机号>></span>
             </div> <!--inpBox-->
              <div class='inpBox' v-show="yanzhengmaIsShow">
                <input type='tel' class=''  maxlength='4' v-model="param.verifiCode" ref='verifycode' placeholder="请输入验证码"/>
                <p class='warn' ref='warnCode'v-show='true'>{{warnCode}}</p>
                <span>验证码</span>
                <mt-button type="danger" size="small" class='sendCodeBtn' v-on:click.stop="getM" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
             <div class='inpBox'>
                <input type='text' class='' v-model="param.businessName" :disabled="isDisabled3" ref='businessName' placeholder="非必填" @blur.prevent="changeCount($event)"/>
                <p class='warn' ref='warnbusinessName' v-show='true'>{{warnbusinessName}}</p>
                <span>财富师姓名</span>
              </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='tel' class='' v-model="gh" :disabled="isDisabled4" ref='belongBusiness' placeholder="非必填" maxlength='7' @blur.prevent="changeCount($event)"/>
                <p class='warn' ref='warnbelongBusiness' v-show='true'>{{warnbelongBusiness}}</p>
                <span>财富师工号DT</span>
              </div> <!--inpBox-->
             
             <mt-button type="danger" size="large" class='sign' @click="toSignUp()">报名</mt-button>
             <p style='font-size:13px;color:rgb(153,153,153);line-height:30px;margin-top:10px;'>此页面仅供个人客户自行报名</p>
             <p style='font-size:13px;color:rgb(153,153,153);'>机构客户可联系您的专属财富师为您服务</p>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue" v-on:warnCodeFunction="warnCodeFunction"></getcode>
       
    </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Field } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import getcode from '../wealth/getcode';
import axios from 'axios'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import { isValidMobile, isValidxincode, isValidverifycode, isValidName, isValidEmpNo,isValidName2 } from '@/common/js/extends.js'
import merge from 'webpack-merge'
export default {
    name:'toSignNewCust',
    data:function(){
        return{
            shareLink:'',
            ghT:'',//对方财富师工号
          // busNameT:'',//对方财富师姓名
            messType:'3',
            text:'获取验证码',
            Dsiabled:false,
            warnPhone:'',
            warnCode:'',
            yanzhengmaIsShow:false,
            gh:'',
            gongH:'',
            warnName:'',
            warnbusinessName:'',
            warnbelongBusiness:'',
            idNo:'',//身份证
            p:1,
            beginTime:'',
            location:'',
            isShow:false,
            isDisabled: false,
            isDisabled2: false,
            isDisabled3: false,
            isDisabled4: false,
            isDisabled6: false,
            isValid: false,
            isValid2: false,
            isValid3: false,
            warnShow: false,
            userPhone: '',
            phone2: '',
            isFaceSuc:'0',//是否人脸识别成功
            ifCaiFu:false,//之前没有财富师
            param:{
                realName: '',
                phone: '',
                verifiCode:'',
                activityType:'',
                belongBusiness: '',
                businessName: '',
                activeId: '',
                actName:'',
                isReviewSignup: '',
                appointState: ''
            },
            user:{
                userId: "",
                osFlag: 3
            },
            backUrl: encodeURIComponent(location.href.split('#')[0]),//微信分享
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=getUserInfo'),//接口
            paramurl: location.href.split('?')[0],
            token:'',
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone:''
            },
        }
    },
    methods:{
        changeCount:function(e){
            //若是由点击引起的焦点改变，捕获点击了的元素
            var ele =  e.relatedTarget
            console.log(ele)
            if(ele == null){
                window.scroll(0,0);
            }  
        },
        getData:function(){
            let that = this;
            //console.log(that.param)
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取客户信息
                params: {
                    scope: 'snsapi_userinfo',
                    backUrl: that.paramurl
                }
            })
            .then(function(res) {//成功之后
               console.log(res.data)
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode==0){
                    console.log(res.data.userInfo)
                    console.log(res.data.userInfo.isNewRecord)
                    that.isFaceSuc=res.data.userInfo.authenticFlag;//实名状态
                    if(!res.data.userInfo.phone == false){
                        that.userPhone = res.data.userInfo.phone
                        var Tel = that.userPhone
                        var mtel = Tel.substr(0, 3) + '****' + Tel.substr(7);
                        that.phone2 = mtel
                        that.isDisabled2 = true;
                        that.yanzhengmaIsShow=false;//隐藏验证码
                        that.isShow = true
                        that.isValid = true
                    }else{
                         that.yanzhengmaIsShow=true;//显示验证码
                    }
                    if(!res.data.userInfo.realName == false){
                        that.param.realName = res.data.userInfo.realName
                        that.idNo= res.data.userInfo.idNo
                        that.isDisabled = true
                    }
                    if(!res.data.userInfo.businessName == false){
                        that.param.businessName = res.data.userInfo.businessName//赋值自己财富师名字
                        that.isDisabled3 = true;
                        var actname = '财富师'+that.param.businessName+'邀请您参加'+that.param.actName
                        var busname = '大唐财富尊享活动'+that.param.actName+'即将举办，机会难得，邀请你一起参加' 
                        var mygh = res.data.userInfo.belongBusiness
                        that.Share(mygh)                     
                        that.asyncSDKConifg(actname,busname)
                    }else{
                        if(res.data.userInfo.nickName =='' || res.data.userInfo.nickName==undefined || res.data.userInfo.nickName=='undefined'){
                            var businName = ''
                        }else{
                            var businName = res.data.userInfo.nickName
                            var actname = businName+'邀请您参加'+that.param.actName
                            var busname = '大唐财富尊享活动'+that.param.actName+'即将举办，要一起参加吗？'
                            that.Share()
                            that.asyncSDKConifg(actname,busname)
                            
                        }
                    }
                    if(!res.data.userInfo.belongBusiness == false){
                        //已经有财富师不是自己输入的
                        that.ifCaiFu=true;
                        that.gongH=res.data.userInfo.belongBusiness;
                        that.gh=that.gongH.substr(2,7);
                        that.isDisabled4 = true;
                        that.ghT = res.data.userInfo.belongBusiness;
                    }else{
                        if(!that.ghT == false){
                            if(that.ghT != "undefined" && that.ghT != "null"){
                            that.gh=that.ghT.substr(2,7);
                            that.getPhoto()
                         }
                        }
                        
                    }
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=toSignNewCust_'+that.param.activeId+','+that.ghT+','+that.param.activityType+','+that.param.isReviewSignup+'#wechat_redirect';
            }
                else{
                    MessageBox(' ',retMsg);
                }
            });
        },
        getactName:function(){
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getactiveinfo',//调取活动列表和详情的接口
                params: {
                    param:{
                        activeId: that.param.activeId,
                        actName:'',
                        pageNo:1,
                        comefrom:'',
                    },
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
                    }else{
                        var obj=res.data.itemList[0];
                        that.param.actName=obj.actName;
                        that.beginTime=obj.beginTime;
                        that.location=obj.location;
                    }
                }
                
            });
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
                  //  var data=Base64.decode(res.data);
                   // data=jQuery.parseJSON(data);
                   // that.photo = data.photo;
                   var data=res.data
                    that.ghT=data.userId;
                  //  that.busNameT = data.userName; //对方财富师的名字
                    that.param.businessName = data.userName
                    // if(!that.photo==false){
                    //     that.headImgUrl = that.photo
                    // }else{
                    //     that.headimgShow=false;
                    // }
                    //that.shareName=that.busNameT;//对方的财富师名字
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
        phoneFn:function(){
            if(this.userPhone == ''){
                this.param.phone = this.phone2 
            }else{
                this.param.phone = this.userPhone
            }
            if(!isValidMobile(this.param.phone)){
                this.$refs.warnPhone.style.display='block';
                this.warnPhone='请输入正确的手机号';
              //  this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid = false;
               return false;
            }else{
                this.$refs.warnPhone.style.display='none';
               
               // this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
                this.isValid = true
                return true;
            } 
        },//验证手机号
        getM:function(){
            this.Dsiabled = true;//禁止点击
            if(this.phoneFn()){
               this.Dsiabled = true
            }else{
                this.Dsiabled = false//放开
               // alert(this.Dsiabled+'1');
                return;
            }

            if(this.userPhone == ''){
                this.param.phone == this.phone2 
            }else{
                this.param.phone = this.userPhone
            }
            this.trafficStatistics('004')//自定义埋点获取验证码
            this.$refs.c1.getCodeFn(this.messType,this.param.phone);
        },
        warnCodeFunction:function(warn){
             this.warnPhone=warn;
              if(this.warnPhone!=''){
               this.$refs.warnPhone.style.display='block';
             // this.$refs.phone.style='border-bottom:0.5px solid #df1e1d!important';
           }else{
               this.$refs.warnPhone.style.display='none';
             // this.$refs.phone.style='border-bottom:0.5px solid #efefef!important';
           }
        },
         childByValue:function(v){
            if(v.time!='重新发送'&&v.time!='获取验证码'){
                this.text=v.time+'s';
            }else if(v.time==NaN||v.time==undefined||v.time=='NANs' || v.time=='NAN'){
                this.text='重新发送';
            }else{
                this.text=v.time
            }
           this.Dsiabled=v.btnDsiabled;
          return
           
           // console.log(this.Dsiabled);
        },
        codeFn:function(){
            if(!isValidverifycode(this.param.verifiCode)){
                this.$refs.warnCode.style.display='block';
                this.warnCode='请输入正确的验证码';
                //this.$refs.verifycode.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid2 = false
                this.Dsiabled=false;
            }else{
                this.$refs.warnCode.style.display='none';
                //this.$refs.verifycode.style='border-bottom:0.5px solid #efefef!important';
                this.isValid2 = true
            }
        },//验证手机验证码
        realnameFn:function(){
            if(isValidName(this.param.realName) || this.param.realName == ""){
                this.$refs.warnName.style.display='block';
                this.warnName='请输入正确的姓名';
               // this.$refs.realName.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid3 = false
                return false
            }else{
                this.$refs.warnName.style.display='none';
                //this.$refs.realName.style='border-bottom:0.5px solid #efefef!important';
                this.isValid3 = true
                return true
            }
        },//验证联系人姓名
        businessNameFn:function(){
            if(isValidName2(this.param.businessName) || this.param.businessName == ""){
                this.$refs.warnbusinessName.style.display='block';
                this.warnbusinessName='请输入正确的财富师姓名';
               // this.$refs.businessName.style='border-bottom:0.5px solid #df1e1d!important';
               return false;
            }else{
                this.$refs.warnbusinessName.style.display='none';
                //this.$refs.businessName.style='border-bottom:0.5px solid #efefef!important';
                return true
            }
        },//验证财富师姓名
        belongBusinessFn:function(){
            if(!isValidEmpNo(this.gh)){
                this.$refs.warnbelongBusiness.style.display='block';
                this.warnbelongBusiness='请输入正确的财富师工号';
                //this.$refs.belongBusiness.style='border-bottom:0.5px solid #df1e1d!important';
                return false;
            }else{
                this.$refs.warnbelongBusiness.style.display='none';
                //this.$refs.belongBusiness.style='border-bottom:0.5px solid #efefef!important';
                return true
            }
        },//验证财富师工号
        face:function(from,memId,memName){
            var that=this;
            var idCardno,idCardName
            if(from == '1'){//更换手机号之前的人脸
                idCardno=that.idNo;
                idCardName=that.param.realName;
                var canshu='changePhone?changeForm=toSignNewCust&isReviewSignup='+that.param.isReviewSignup+'&name='+encodeURIComponent(idCardName)+'&idNo='+idCardno+'&activityType='+that.param.activityType+'&activeId='+that.param.activeId+'&actName='+encodeURIComponent(that.param.actName)+'&isFace=1&beginTime='+that.beginTime+'&location='+encodeURIComponent(that.location);
            }
            if(from == '2'){
                idCardno=memId;
                idCardName=memName;
                var canshu='toSignNewCust?isReviewSignup='+that.param.isReviewSignup+'&name='+encodeURIComponent(idCardName)+'&idNo='+idCardno+'&activityType='+that.param.activityType+'&activeId='+that.param.activeId+'&actName='+encodeURIComponent(that.param.actName)+'&faceResult=1&beginTime='+that.beginTime+'&location='+encodeURIComponent(that.location)+'&businessName='+encodeURIComponent(that.param.businessName)+'&phone2='+that.param.phone+'&verifiCode='+that.param.verifiCode+'&belongBusiness='+that.param.belongBusiness;
            }
            Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceToken',//获取face++的token
                params:{
                    idCardNo:idCardno,//身份证号
                    idCardName:idCardName,//身份证姓名
                    returnUrl:that.Host+'weixin-h5/index.html#/'+canshu,//人脸识别后返回的Url
                    backUrl: location.href.split('?')[0]
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data);
                var retCode=res.data.retCode;
                 if(retCode == 400){
                     var serbackUrl = that.Host+'wxservice/wxMemberInfo/getFaceToken'
                     window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=faceMsg_'+that.actId+','+that.ghT+','+that.actName+','+that.$route.query.ifCard+'#wechat_redirect';
                 }else if(retCode == '-2'){
                     MessageBox(' ','身份证不合法');
                     return;
                 }else if(retCode == '-1'){
                    //MessageBox(' ','系统异常');
                     Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                     return;
                 }else if(retCode == '-3'){
                    // MessageBox(' ','未获取到token');
                    Toast({
                        message: '姓名或身份证输入有误',
                        position: 'center',
                        duration: 3000
                    });
                     return;
                 }else{
                     that.token=res.data.data.token;
                     var bizId=res.data.data.bizId;
                     setCookie('bizId',bizId);
                     window.location.href='https://api.megvii.com/faceid/lite/do?token='+that.token;
                
                 }
            })
        },
        tishi_changeP:function(){
            var that=this;
             var message = '更换手机号需先通过人脸识别验证是本人操作'
                    MessageBox.confirm('',{
                    message: message,
                    title: '',
                    confirmButtonText:'去验证',
                    }).then(action => {
                    if(action == 'confirm'){
                        that.face('1');//去人脸
                    }else{
                        
                    }
                    }).catch(() => {
                   
                    })
        },
        changeP:function(){
            var that=this;
            //人脸
            if(that.isFaceSuc==1){
                that.tishi_changeP();//去人脸
            }else{
                //去修改手机号；
                this.$router.push({
                    path:'/changephone',
                    name:'changephone',
                    query:{
                        changeForm:'toSignNewCust',
                        isReviewSignup : that.param.isReviewSignup,//是否需要审核
                        activityType : that.param.activityType,
                        activeId : that.param.activeId,
                        actName : that.param.actName,
                        beginTime:that.beginTime,
                        location :that.location,
                        ghT:that.$route.query.ghT,
                        busNameT:that.$route.query.busNameT,
                    }
                })
            }
           
        },
        toSignUp:function(){
            console.log(this.param.actName)
            var that=this;
            that.phoneFn();
            that.realnameFn();
            if(that.yanzhengmaIsShow){
                that.codeFn();
            }else{
                that.isValid2=true;
            }
            if(!that.isValid || !that.isValid2 || !that.isValid3){
                return;
            }else{
                Indicator.open();
                if(that.ifCaiFu){//之前有财富师
                    that.param.appointState = ''
                }else{
                    that.param.appointState = '0'
                }
                console.log(that.param);
                if(!that.gh==false){
                    that.param.belongBusiness='DT'+that.gh;
                }else{
                    that.param.belongBusiness=that.gh;
                }
                that.trafficStatistics('005')//自定义埋点
                that.belongFnaxios()
            }
        },
        belongFnaxios:function(){
            let that = this;
            console.log(that.param)
            Indicator.open();
            axios({
                    method:'get',
                    url:'/wxservice/wxservice?opName=toSignUp',
                    params: {
                        param:that.param,//系统类别
                    }
                })
                .then(function(res) {//成功之后
                    console.log(res)
                    Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    that.Dsiabled=false;
                    if(retCode== 1){
                        MessageBox(' ','验证码错误');
                    }else if(retCode== 2){
                        MessageBox(' ','推送crm系统错误');
                    }else if(retCode== -1){
                       // MessageBox(' ','系统异常');
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        });   
                    }else if(retCode== -2){
                        MessageBox(' ','绑定手机号出错');
                    }else if(retCode== 6){
                        MessageBox('','您已经报过名');
                    }else if(retCode== 4){
                        MessageBox({
                            title: '',
                            //message: '该手机号已绑定其他账号，无法重复绑定。如有疑问请咨询客服：400-819-9868',
                            message: '该手机号在大唐财富平台已绑定其他账号，无法重复绑定。如有疑问可在大唐财富服务号(datangwealth)内留言咨询',
                            confirmButtonText: '我知道了'
                        });
                    }
                    // else if(retCode== -3){
                    //     MessageBox(' ','已绑定线上财富师');
                    // }else if(retCode== -4){
                    //     MessageBox(' ','已绑定线下财富师');
                    // }else if(retCode== -5){
                    //     MessageBox(' ','财富师工号不存在');
                    // }else if(retCode== -6){
                    //     MessageBox(' ','财富师已离职');
                    // }
                    else if(retCode==3){
                            var crmInfo=res.data.crmInfo;
                            if(crmInfo.retCode==1){
                                MessageBox(' ','报名失败，系统错误');
                            }else if(crmInfo.retCode==3){
                                MessageBox(' ','此活动已举办');
                            }else if(crmInfo.retCode==4){
                                MessageBox(' ','此活动已取消');
                            }else if(crmInfo.retCode==5){
                                MessageBox(' ','此活动报名已结束');
                            }else if(crmInfo.retCode==6){
                                MessageBox(' ','您已经报过名');
                            }else if(crmInfo.retCode==7){
                                MessageBox(' ','客户性质传入值错误');
                            }else if(crmInfo.retCode==8){
                                MessageBox(' ','此客户为老客户，请联系此客户专属财富师进行报名');
                            }else if(crmInfo.retCode==9){
                                MessageBox(' ','此活动已结束');
                            }else if(crmInfo.retCode==10){
                                MessageBox(' ','活动不存在');
                            }else if(crmInfo.retCode==11){
                                MessageBox(' ','此财富师不存在');
                            }
                            return;
                    }else if(retCode == 0){ 
                        that.$router.push({
                            path: '/signSuc',//
                            name: 'signSuc',
                            query:{
                                isReviewSignup:that.param.isReviewSignup,
                                activeId:that.param.activeId,
                                actName:encodeURIComponent(that.param.actName),
                                beginTime:that.beginTime,
                                location :encodeURIComponent(that.location),
                            }
                        })
                    }else if(retCode == 12){
                        var message = '是否指定'+that.param.businessName+'为您的专属财富师？您可指定一名专属财富师，并拥有更换权力。'
                        MessageBox.confirm('', {
                            message: message,
                            title: '',
                            confirmButtonText:'指定并报名',
                            cancelButtonText:'仅报名'
                        }).then(action => {
                            if(action == 'confirm'){
                                that.param.appointState = "2";
                                that.Axiosign()
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                that.param.appointState = "3";
                                that.Axiosign()
                            }
                        })//
                        }else if(retCode == -3 || retCode == -4 || retCode == -5 || retCode == -6) {
                            var message = '财富师姓名或工号输入有误，请点击重新输入，或以无财富师状态直接报名。'
                            MessageBox.confirm('', {
                                message: message,
                                title: '',
                                confirmButtonText:'重新输入',
                                cancelButtonText:'直接报名'
                            }).then(action => {
                                if(action == 'confirm'){
                                    console.log('重新输入')
                                }else{
                                    
                                }
                            }).catch(err => {
                                if (err == 'cancel') {     //取消的回调
                                    that.param.appointState = "1";
                                    that.Axiosign()
                                }
                            })
                        }else if(retCode == -7){//提示并调人脸识别打通账户（WX未实名，APP实名且手机号相同）
                            window.scroll(0,0);
                            var message = '该手机号已开通大唐财富账户，请人脸识别身份认证同步账户信息。';      
                            MessageBox.confirm('', {
                                message: message,
                                title: '',
                                showCancelButton:false,
                                confirmButtonText:'去同步',
                            }).then(action => {
                                if(action == 'confirm'){
                                    var memId = res.data.memId;    //糖罐的用户身份证
                                    var memName = res.data.memName;    //糖罐的用户姓名
                                    that.face('2',memId,memName);//用APP信息去人脸
                                }
                            }).catch(() => {
                                //取消按钮
                            })
                        }else if(retCode == -8){//实名用户电话同TG实名用户电话不一致
                            window.scroll(0,0);
                            MessageBox({
                                title: '',
                                //message: '该手机号已绑定其他账号，无法重复绑定。如有疑问请咨询客服：400-819-9868',
                                message: '该手机号在大唐财富平台已绑定其他账号，无法重复绑定。如有疑问可在大唐财富服务号(datangwealth)内留言咨询。',
                                confirmButtonText: '我知道了'
                            });
                        }
                    // Indicator.close();
                });
        },
        Axiosign:function(){
            Indicator.open();
            let that = this;
            console.log(that.param)
            axios({
                    method:'get',
                    url:'/wxservice/wxservice?opName=toSignUp',
                    params: {
                        param:that.param,//系统类别
                    }
                })
                .then(function(res) {//成功之后
                    console.log(res)
                    Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    that.Dsiabled=false;
                    if(retCode== 1){
                        MessageBox(' ','验证码错误');
                    }else if(retCode== 2){
                        MessageBox(' ','推送crm系统错误');
                    }else if(retCode== -1){
                       // MessageBox(' ','系统异常'); 
                        Toast({
                            message: '系统异常',
                            position: 'center',
                            duration: 3000
                        }); 
                    }else if(retCode== -2){
                        MessageBox(' ','绑定手机号出错');
                    }else if(retCode== -3){
                        MessageBox(' ','已绑定线上财富师');
                    }else if(retCode== -4){
                        MessageBox(' ','已绑定线下财富师');
                    }else if(retCode== -5){
                        MessageBox(' ','财富师工号不存在');
                    }else if(retCode== -6){
                        MessageBox(' ','财富师已离职');
                    }else if(retCode==3){
                            var crmInfo=res.data.crmInfo;
                            if(crmInfo.retCode==1){
                                MessageBox(' ','报名失败，系统错误');
                            }else if(crmInfo.retCode==3){
                                MessageBox(' ','此活动已举办');
                            }else if(crmInfo.retCode==4){
                                MessageBox(' ','此活动已取消');
                            }else if(crmInfo.retCode==5){
                                MessageBox(' ','此活动报名已结束');
                            }else if(crmInfo.retCode==6){
                                MessageBox(' ','您已经报过名');
                            }else if(crmInfo.retCode==7){
                                MessageBox(' ','客户性质传入值错误');
                            }else if(crmInfo.retCode==8){
                                MessageBox(' ','此客户为老客户，请联系此客户专属财富师进行报名');
                            }else if(crmInfo.retCode==9){
                                MessageBox(' ','此活动已结束');
                            }else if(crmInfo.retCode==10){
                                MessageBox(' ','活动不存在');
                            }else if(crmInfo.retCode==11){
                                MessageBox(' ','此财富师不存在');
                            }
                            return;
                    }else if(retCode == 0){ 
                        that.$router.push({
                            path: '/signSuc',//
                            name: 'signSuc',
                            query:{
                                isReviewSignup:that.param.isReviewSignup,
                                activeId:that.param.activeId,
                                actName:encodeURIComponent(that.param.actName),
                                beginTime:that.beginTime,
                                location :encodeURIComponent(that.location),
                            }
                        })
                    }else if(retCode == -7){//提示并调人脸识别打通账户（WX未实名，APP实名且手机号相同）
                            window.scroll(0,0);
                            var message = '该手机号已开通大唐财富账户，请人脸识别身份认证同步账户信息。';      
                            MessageBox.confirm('', {
                                message: message,
                                title: '',
                                showCancelButton:false,
                                confirmButtonText:'去同步',
                            }).then(action => {
                                if(action == 'confirm'){
                                    var memId = res.data.memId;    //糖罐的用户身份证
                                    var memName = res.data.memName;    //糖罐的用户姓名
                                    that.face('2',memId,memName);//用APP信息去人脸
                                }
                            }).catch(() => {
                                //取消按钮
                            })
                        }else if(retCode == -8){//实名用户电话同TG实名用户电话不一致
                            window.scroll(0,0);
                            MessageBox({
                                title: '',
                                //message: '该手机号已绑定其他账号，无法重复绑定。如有疑问请咨询客服：400-819-9868',
                                message: '该手机号在大唐财富平台已绑定其他账号，无法重复绑定。如有疑问可在大唐财富服务号(datangwealth)内留言咨询。',
                                confirmButtonText: '我知道了'
                            });
                        }
                    
                    // Indicator.close();
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
               // var returnUrl = that.$route.query.returnUrl;
                var returnUrl = that.Host+'weixin-h5/index.html#/toSignNewCust?phone='+that.faceparam.phone+'&isReviewSignup='+that.param.isReviewSignup+'&activityType='+that.param.activityType+'&activeId='+that.param.activeId+'&actName='+encodeURIComponent(that.param.actName)+'&isFace=1&beginTime='+that.beginTime+'&location='+encodeURIComponent(that.location)+'&businessName='+encodeURIComponent(that.param.businessName)+'&phone2='+that.param.phone+'&verifiCode='+that.param.verifiCode+'&belongBusiness='+that.param.belongBusiness;
                //修改原有参数        
                that.$router.push({
                    query:merge(that.$route.query,{'faceResult':''})
                })
               // alert(retCode)
                if(retCode == '0'){
                    that.trafficStatistics('019')//自定义埋点
                    Toast({
                        message: '人脸识别成功',
                        position: 'center',
                        duration: 3000
                    });
                    
                    that.belongFnaxios()
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
                                var canshu=returnUrl+'&tp='+type+'&idNo='+idCardNo+'&name='+encodeURIComponent(that.$route.query.name)
                                that.getface(idCardNo,idCardName,canshu,type)
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                that.getData()//获取客户信息
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
                    //     }).catch(() => {
                            
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
        Share:function(mygh) {
            //var shareData = '?ghT='+this.$route.query.ghT+'&isReviewSignup='+this.param.isReviewSignup+'&activityType='+this.param.activityType+'&activeId='+this.param.activeId+'&actName='+encodeURIComponent(this.param.actName)+'&beginTime='+this.beginTime+'&location='+encodeURIComponent(this.location)+'&busNameT='+encodeURIComponent(this.param.businessName);
            var shareData = '?ghT='+mygh+'&isReviewSignup='+this.param.isReviewSignup+'&activityType='+this.param.activityType+'&activeId='+this.param.activeId+'&actName='+encodeURIComponent(this.param.actName)+'&beginTime='+this.beginTime+'&location='+encodeURIComponent(this.location);
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
                this.shareLink = this.Host+'weixin-h5/static/html/redirect.html?app3Redirect=' + encodeURIComponent(location.href.split('?')[0]+shareData)
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //android
                this.shareLink = window.location.href+'&ghT='+mygh
                //this.shareLink = encodeURIComponent(location.href.split('?')[0]+shareData)
                //this.shareLink = location.href.split('?')[0]+shareData
            }
            }
    
        },
        async asyncSDKConifg (actName,businessName) {
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
                    title: actName, // 分享标题
                    desc: businessName, // 分享描述
                   // link: window.location.href, // 分享链接
                    link: that.shareLink,
                    imgUrl: 'http://file0.datangwealth.com/g1/M00/16/50/rBAeX1ybKCiAEKkxAADvNDguF4c858.png?filename=share.png', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        //alert('成功');
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        //alert('用户取消分享');
                    }
                    });
                    wx.onMenuShareTimeline({ //分享朋友圈
                    title: actName, // 分享标题
                    desc: businessName, // 分享描述
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
        Indicator.open();
        //this.user.userId = this.$route.query.ghT;
        if(!this.$route.query.ghT==false){
            this.ghT=this.$route.query.ghT;
        }else{
           // this.ghT=wxstr.split(",")[1];
        }
        var bizId=decodeURIComponent(getCookie("bizId"));
        this.faceparam.bizId = bizId;
         if(!this.$route.query.faceResult == false||bizId==null){
            this.getfaceId();
         }else{
            this.getData()//获取客户信息
         }
        // if(!this.$route.query.ghT==false){
        //     if(this.$route.query.ghT=='undefined,' || this.$route.query.ghT=='undefined'){   
        //     }else{
                // if(res.data.userInfo.belongBusiness=='undefined'){   
                // }else{
                    // this.gh = this.$route.query.ghT;
                    // this.gh=this.gh.substr(2,7);
                    // this.param.businessName = decodeURIComponent(this.$route.query.busNameT);
               // }
        //     }
            
        //  }  
        if(!this.$route.query.activityType==false){
            this.param.isReviewSignup = this.$route.query.isReviewSignup;
            this.param.activityType = this.$route.query.activityType;
            this.param.activeId = this.$route.query.activeId;
            this.param.actName = decodeURIComponent(this.$route.query.actName);
            this.beginTime = this.$route.query.beginTime;
            this.location = decodeURIComponent(this.$route.query.location);
           // this.ghT=this.$route.query.ghT;
           if(!this.$route.query.phone2==false){
            this.param.realName = decodeURIComponent(this.$route.query.name)
           this.param.phone =this.$route.query.phone2;
           this.phone2 = this.$route.query.phone2
           this.param.verifiCode=this.$route.query.verifiCode;
           this.param.belongBusiness = this.$route.query.belongBusiness;
           this.param.businessName = decodeURIComponent(this.$route.query.businessName)
           this.gh=this.param.belongBusiness.substr(2,7);
           }
           
        }else{
            var wxstr =decodeURIComponent(this.$route.query.actId); 
            this.param.activeId=wxstr.split(",")[0];
            this.ghT=wxstr.split(",")[1];
            this.param.isReviewSignup = wxstr.split(",")[3];
            this.param.activityType = wxstr.split(",")[2];
           // this.param.actName = decodeURIComponent(wxstr.split(",")[2]);
            this.getactName()
        }
        
    },
    components:{Button,getcode,Field}//使用mint-ui的button的组件
}
</script>
<style>
 @import 'toSign.css';  引入toSign.css文件*/
 #toSignNewCust{
     padding-top:15px;
 }
 .sendCodeBtn{
     position:absolute;
     right:10px;
     top:6px;
     width:28%!important;
     margin-top:0;
     font-size: 13px!important;
 }
 .left_img{
     width:20px;
     float: left;
     margin-right:5px;
 }
 .sign{
     width:90%;
 }
 .inpRchoose{
     width:30%;
     position: absolute;
     left:74%!important;
    color:#999;
    line-height:30px;
 }
 
</style>
