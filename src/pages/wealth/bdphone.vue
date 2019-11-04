<template>
    <div class='changephone'>
        <div class='content_s'>
            <div class='tip'>
                    <span style='line-height:20px;'>该手机号将作为您在大唐财富的注册手机号，号码在系统中将加密以保障号码安全，请输入您的常用手机号</span>
                </div>
            <div class='inpBox'>
                <input type='tel' class='' maxlength='11' v-model="ipNo" ref='ph' placeholder="请输入手机号码"/>
                <p class='warn' ref='phwarn'>{{phwarn}}</p>
                <span>手机号</span>
                <mt-button type="danger" size="small" class='sendCodeBtn' @click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='tel' class=''  ref='code'v-model="msgCode" placeholder="请输入验证码"  maxlength="4"/>
                <p class='warn' ref='codewarn'>{{codewarn}}</p>
                <span>验证码</span>
             </div> <!--inpBox-->
              
             <mt-button type="danger" size="large" class='sign' @click="changeP()">确定</mt-button>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue"></getcode>
        <comfooter></comfooter>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import axios from 'axios';
import getcode from './getcode'
import comfooter from '../../components/footer'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import { isValidName,isValidMobile ,isValidverifycode} from '@/common/js/extends.js';//引入mint-ui的button组件文件包
export default {
    name:'bdphone',
    data:function(){
        return{
            messType:'5',
            ipNo:'',//17184092628
            text:'获取验证码',
            msgCode:'',
            idCardNo:'',
            Dsiabled:false,
            codewarn:'',
            phwarn:'',
            bdfrom:'',
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/changeMobile'),//接口
            paramurl: location.href.split('?')[0],
            iptype: '0',
            token:'',
            type: '0',
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone:''
            },
            state:'',
            reportId:'',
            activityType:'',
            userId:'',//报告介绍页糖巢分享的带名片
            fswitch:'',//是否显示名片:0是显示，1是不显示
        }
    },
    components:{getcode,MessageBox,Button,comfooter},
    created:function(){
        var that=this;
        if(!that.$route.query.actId==false){ //重定向后 
            var wxstr = that.$route.query.actId; 
            that.bdfrom=wxstr.split(",")[0];
            that.reportId=wxstr.split(",")[1];
            that.userId =wxstr.split(",")[2];
            that.fswitch =wxstr.split(",")[3];
        }else{
            that.bdfrom =that.$route.query.bdfrom;
            that.reportId =that.$route.query.reportId;
            that.userId =that.$route.query.userId;
            that.fswitch =that.$route.query.fswitch;
        }  
    },
    mounted:function(){
        this.GasyncSDKConifg()
        var bizId=decodeURIComponent(getCookie("bizId"));
        this.faceparam.bizId = bizId;
         if(!this.$route.query.faceResult == false||bizId==null){
            this.getfaceId();
         }else{
            this.getData()//获取客户信息
         }
    },
    methods:{
        getData:function(){
            Indicator.open();
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取用户信息
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                 Indicator.close();
                 var retCode=res.data.retCode;
                if(retCode=='0'){
                    if(!that.$route.query.type == false){//实名认证 WX和app手机号不一致
                       
                    }else{
                        if(!res.data.userInfo.phone==false){
                            Indicator.open();
                        setTimeout(() => {
                            Indicator.close();
                            MessageBox({title: '',message: '您已绑定手机号',closeOnClickModal: false}).then(action => {
                                if(action == 'confirm'){
                                    WeixinJSBridge.call('closeWindow');
                                }
                            }).catch(() => {
                            //取消按钮
                            })
                        }, 3000)
                        }
                    }
                }else if(retCode=='-1'){//系统异常
                    //MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=bdphone_'+that.bdfrom+','+that.reportId+','+that.userId+','+that.fswitch+'#wechat_redirect';
                }
            })
        },
        phFn:function(){//实时校验手机号
            if(this.ipNo==''){
                //this.$refs.phwarn.style.display='none';
                //this.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else if(!isValidMobile(this.ipNo)){
                this.$refs.phwarn.style.display='block';
                this.phwarn='请输入正确的手机号码';
               // this.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else{
                this.$refs.phwarn.style.display='none';
                //this.$refs.ph.style='border-bottom:0.5px solid #efefef!important';
            }
        },
        codeFn:function(){//实时校验验证码
            var that=this;
            if(that.msgCode==''){//校验验证码
               // that.$refs.code.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else if(!isValidverifycode(that.msgCode)){
                that.$refs.codewarn.style.display='block';
                that.codewarn='请输入正确的手机验证码';
                //that.$refs.code.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else{
                that.$refs.codewarn.style.display='none';
               // that.$refs.code.style='border-bottom:0.5px solid #efefef!important';
            }
        },
        getM:function(){ 
            var that=this;
            that.Dsiabled=true;
            if(that.ipNo==''){
                that.$refs.phwarn.style.display='block';
                that.phwarn='请输入手机号码';
                //that.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                that.Dsiabled=false;
                return;
            }else if(!isValidMobile(that.ipNo)){
                that.$refs.phwarn.style.display='block';
                that.phwarn='请输入正确的手机号码';
                //that.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                that.Dsiabled=false;
                return;
            }else{
                that.$refs.phwarn.style.display='none';
               // that.$refs.ph.style='border-bottom:0.5px solid #efefef!important';
            }
            if(!that.$route.query.type == false){//实名认证 WX和app手机号不一致，获取验证码多传state参数
                   that.state = 0    
            }
            that.$refs.c1.getCodeFn(that.messType,that.ipNo,that.state);
        },
        childByValue:function(v){
            if(v.time!='重新发送'&&v.time!='获取验证码'){
                this.text=v.time+'s';
            }else if(v.time==NaN||v.time==undefined||v.time=='NANs'){
                this.text='重新发送';
            }else{
                this.text=v.time
            }
           this.Dsiabled=v.btnDsiabled;
           // console.log(this.Dsiabled);
        },
        changeP:function(){
            console.log('click')
            var that=this;
            if(that.ipNo==''){
                that.$refs.phwarn.style.display='block';
                that.phwarn='请输入手机号码';
              //  that.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else if(!isValidMobile(that.ipNo)){
                that.$refs.phwarn.style.display='block';
                that.phwarn='请输入正确的手机号码';
               // that.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else{
                that.$refs.phwarn.style.display='none';
               // this.$refs.ph.style='border-bottom:0.5px solid #efefef!important';
            }

             if(that.msgCode==''){//校验验证码
                that.$refs.codewarn.style.display='block';
                that.codewarn='请输入手机验证码';
               // that.$refs.code.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else if(!isValidverifycode(that.msgCode)){
                that.$refs.codewarn.style.display='block';
                that.codewarn='请输入正确的手机验证码';
               // that.$refs.code.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else{
                that.$refs.codewarn.style.display='none';
               // that.$refs.code.style='border-bottom:0.5px solid #efefef!important';
            }
            that.bdphoneFn()
        },
        bdphoneFn:function(){
            var that = this
            if(that.$route.query.type == '1'){
                that.iptype = '1'
                that.idCardNo = that.$route.query.idNo
            }
            if(!that.bdfrom == false){
                that.activityType=1
            }
            if(!that.reportId == false){
            }else{
                that.reportId=''
            }
            Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/changeMobile',//
                params: {
                    phone:that.ipNo,//新的手机号
                    msgCode:that.msgCode,//短信验证码
                    backUrl:that.paramurl,
                    type: that.iptype, //0，默认，1验证标记
                    idCardNo: that.idCardNo,   //人脸识别到绑定手机号的身份证号
                    activityType:that.activityType, //从大类的传1//客户来源-活动类型 1-大类资产 (大类资产需求添加,统计转换率用)
                    reportId:that.reportId,
                }
            })
            .then(function(res) {//成功之后
                console.log(res)
                Indicator.close();
                var retCode=res.data.retCode;
                var wxfrom =decodeURIComponent(that.$route.query.actId);
                //console.log(wxfrom)
                if(retCode=='0'){//更改成功
                    window.scroll(0,0);
                    //    MessageBox('','手机号绑定成功').then(action => {
                    //     alert(action)
                    //     if(action == 'confirm'){
                    //         alert(that.bdfrom)
                    //         if(that.bdfrom == 'wxser'){//自动回复直接打开
                    //             alert(11111)
                    //             WeixinJSBridge.call('closeWindow');//关闭当前页面
                    //         }
                    //         that.$router.push({
                    //             path:'/'+that.bdfrom,
                    //             name:that.bdfrom,
                    //             query:{
                    //                 clickSource: that.$route.query.clickSource,
                    //             }
                    //         })
                            
                    //     }else{
                    //         alert(that.bdfrom)
                    //         if(that.bdfrom == 'wxser'){//自动回复直接打开
                    //             alert(11111)
                    //             WeixinJSBridge.call('closeWindow');//关闭当前页面
                    //         }
                    //         that.$router.push({
                    //             path:'/'+that.bdfrom,
                    //             name:that.bdfrom,
                    //             query:{
                    //                 clickSource: that.$route.query.clickSource,
                    //             }
                    //         })
                    //     }
                    // }).catch(() => {
                    //    //取消按钮
                    // })
                    MessageBox('    ', '手机号绑定成功').then(action => {
                      if(action == 'confirm'){
                         if(wxfrom == 'wxser' || that.bdfrom == 'wxser'){
                            WeixinJSBridge.call('closeWindow');
                         }else if(wxfrom == '1' || that.bdfrom == '1'){
                            window.location.href=that.Host+'weixin-h5/DTCF/html/report/tgconfig_report_Intro.html?bdfrom=1'
                         }else if(wxfrom == '2' || that.bdfrom == '2'){
                            window.location.href=that.Host+'weixin-h5/DTCF/html/report/question.html?bdfrom=2'
                        }else if(wxfrom == '3' || that.bdfrom == '3'){
                            window.location.href=that.Host+'weixin-h5/DTCF/html/report/configurationReport.html?bdfrom=3&reportId='+that.reportId
                        }else if(wxfrom == '4' ||that.bdfrom == '4'){
                            window.location.href=that.Host+'weixin-h5/DTCF/html/report/myReport.html?bdfrom=4'
                        }else if(wxfrom == '5' ||that.bdfrom == '5'){
                            window.location.href=that.Host+'weixin-h5/DTCFS/html/report/shareReportHome.html?bdfrom=5&userId='+that.userId+'&forward_switch='+that.fswitch
                        }else if(wxfrom == '6' ||that.bdfrom == '6'){
                            window.location.href=that.Host+'weixin-h5/DTCF/html/report/myReport.html'
                        }else{
                            if(!that.$route.query.bdfrom1 == false){
                                that.$router.push({
                                    path:'/'+that.bdfrom,
                                    name:that.bdfrom,
                                    query:{
                                    // clickSource: that.$route.query.clickSource,
                                     bdfrom: that.$route.query.bdfrom1,
                                     fswitch:that.fswitch,
                                     userId:that.userId,
                                     reportId:that.reportId
                                    }
                                })
                            }else{
                                that.$router.push({
                                    path:'/'+that.bdfrom,
                                    name:that.bdfrom,
                                    query:{
                                    // clickSource: that.$route.query.clickSource,
                                    }
                                })
                            }
                            
                        }
                       }else{//取消
                            if(wxfrom == 'wxser' || that.bdfrom == 'wxser'){
                                WeixinJSBridge.call('closeWindow');
                            }else if(wxfrom == '1' || that.bdfrom == '1'){
                                window.location.href=that.Host+'weixin-h5/DTCF/html/report/tgconfig_report_Intro.html?bdfrom=1'
                            }else if(wxfrom == '2' || that.bdfrom == '2'){
                                window.location.href=that.Host+'weixin-h5/DTCF/html/report/question.html?bdfrom=2'
                            }else if(wxfrom == '3' || that.bdfrom == '3'){
                                window.location.href=that.Host+'weixin-h5/DTCF/html/report/configurationReport.html?bdfrom=3&reportId='+that.reportId
                            }else if(wxfrom == '4' ||that.bdfrom == '4'){
                                window.location.href=that.Host+'weixin-h5/DTCF/html/report/myReport.html?bdfrom=4'
                            }else if(wxfrom == '5' ||that.bdfrom == '5'){
                                window.location.href=that.Host+'weixin-h5/DTCFS/html/report/shareReportHome.html?bdfrom=5&userId='+that.userId+'&forward_switch='+that.fswitch
                            }else if(wxfrom == '6' ||that.bdfrom == '6'){
                                window.location.href=that.Host+'weixin-h5/DTCF/html/report/myReport.html'
                            }else{
                                if(!that.$route.query.bdfrom1 == false){
                                    that.$router.push({
                                        path:'/'+that.bdfrom,
                                        name:that.bdfrom,
                                        query:{
                                        // clickSource: that.$route.query.clickSource,
                                        bdfrom: that.$route.query.bdfrom1,
                                        fswitch:that.fswitch,
                                        userId:that.userId,
                                        reportId:that.reportId
                                        }
                                    })
                                }else{
                                    that.$router.push({
                                        path:'/'+that.bdfrom,
                                        name:that.bdfrom,
                                        query:{
                                        // clickSource: that.$route.query.clickSource,
                                        }
                                    })
                                }
                            }
                      }
                  });
                }else if(retCode=='-2'){//验证码不正确
                    MessageBox('','验证码不正确');
                }else if(retCode=='-3'){//请发送验证码
                     MessageBox('','请发送验证码');
                }else if(retCode=='-4'){//该手机号已绑定别的账号,无法重复绑定
                   // MessageBox('提示','该手机号已绑定别的账号,无法重复绑定');
                   MessageBox({
                        title: '',
                        //message: '该手机号已绑定其他账号，无法重复绑定。如有疑问请咨询客服：400-819-9868',
                        message: '该手机号在大唐财富平台已绑定其他账号，无法重复绑定。如有疑问可在大唐财富服务号(datangwealth)内留言咨询',
                        confirmButtonText: '我知道了'
                    });
                }else if(retCode == 400){
                   var serbackUrl = that.Host+'wxservice/wxMemberInfo/changeMobile'
                   window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=bdphone_'+that.bdfrom+','+that.reportId+','+that.userId+','+that.fswitch+'#wechat_redirect';
                }else if(retCode=='-1'){
                   // MessageBox('提示','系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }else if(retCode=='1'){//WX未实名，用户开通APP且实名，弹出框并跳转人脸识别打通用户，绑定手机号过来的
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
                            that.face('1',memId,memName);//用APP信息去人脸
                        }
                    }).catch(() => {
                        //取消按钮
                    })
                }else if(retCode=='2'){ //有验证标记用户手机通过验证,人脸，实名认证过来的
                    that.type = '1' //冲突手机号通过绑定验证为1
                    that.face();
                }else if(retCode=='-5'){
                   // MessageBox('提示','系统异常');
                    Toast({
                        message: '手机号与已实名手机号不一致',
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },
        face:function(id,memId,memName){
            var that=this;
            if(id == '1'){
                var idCardNo=memId
                var idCardName=memName
                if(that.bdfrom == 3){
                    var canshu=that.Host+'weixin-h5/index.html#/bdphone?bdfrom='+that.bdfrom+'&name='+encodeURIComponent(idCardName)+'&idNo='+idCardNo+'&faceResult=1&reportId='+that.reportId 
                }else{
                    var canshu=that.Host+'weixin-h5/index.html#/bdphone?bdfrom='+that.bdfrom+'&name='+encodeURIComponent(idCardName)+'&idNo='+idCardNo+'&faceResult=1'
                }
               
            }else{
                var idCardNo=that.$route.query.idNo
                var idCardName=decodeURIComponent(that.$route.query.name)
                if(!that.$route.query.bdfrom1 == false){
                    if(that.$route.query.bdfrom1 == '1'){
                        var canshu=that.Host+'weixin-h5/DTCF/html/report/tgconfig_report_Intro.html?faceResult=1&bdfrom=1&phone='+that.ipNo+'&name='+encodeURIComponent(that.$route.query.name)+'&idNo='+idCardNo+'&tp='+that.type
                    }else if(that.$route.query.bdfrom1 == '2'){
                        var canshu=that.Host+'weixin-h5/DTCF/html/report/question.html?faceResult=1&bdfrom=2&phone='+that.ipNo+'&name='+encodeURIComponent(that.$route.query.name)+'&idNo='+idCardNo+'&tp='+that.type
                    }else if(that.$route.query.bdfrom1 == '3'){
                        var canshu=that.Host+'weixin-h5/DTCF/html/report/configurationReport.html?faceResult=1&bdfrom=3&reportId='+that.reportId+'&phone='+that.ipNo+'&name='+encodeURIComponent(that.$route.query.name)+'&idNo='+idCardNo+'&tp='+that.type+'&rePhone='+that.$route.query.rePhone
                    }else if(that.$route.query.bdfrom1 == '4'){
                        var canshu=that.Host+'weixin-h5/DTCF/html/report/myReport.html?faceResult=1&bdfrom=4&phone='+that.ipNo+'&name='+encodeURIComponent(that.$route.query.name)+'&idNo='+idCardNo+'&tp='+that.type
                    }else if(that.$route.query.bdfrom1 == '5'){
                        var canshu=that.Host+'weixin-h5/DTCFS/html/report/shareReportHome.html?faceResult=1&bdfrom=5&userId='+that.userId+'&forward_switch='+that.fswitch+'&phone='+that.ipNo+'&name='+encodeURIComponent(that.$route.query.name)+'&idNo='+idCardNo+'&tp='+that.type
                    } 
                }else{
                    var canshu=that.$route.query.returnUrl+'&phone='+that.ipNo+'&name='+encodeURIComponent(that.$route.query.name)+'&idNo='+idCardNo+'&tp='+that.type
                }
                
            }
            Indicator.open();
           // alert(canshu)
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceToken',//ning
                params:{
                    idCardNo:idCardNo,//身份证号
                    idCardName:idCardName,//身份证姓名
                    returnUrl:canshu,//人脸识别后返回的Url
                    backUrl: location.href.split('?')[0],
                    type: that.type   //默认为0，冲突手机号通过绑定验证为1
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data);
                var retCode=res.data.retCode;
                 if(retCode == 400){
                     var serbackUrl = that.Host+'wxservice/wxMemberInfo/getFaceToken'
                     window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=bdphone#wechat_redirect';
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
                console.log(res.data);
                var retCode=res.data.retCode;
                Indicator.close();
                //alert(retCode)
                if(retCode == '0'){
                    that.trafficStatistics('019')
                   // MessageBox('    ','人脸识别成功');
                    // Toast({
                    //     message: '人脸识别成功',  
                    //     position: 'center',
                    //     duration: 3000
                    // });
                    //账号打通，人脸成功后手机号也绑定成功。
                    MessageBox('','操作成功').then(action => {
                        if(action == 'confirm'){
                            if(that.bdfrom == 'wxser'){//自动回复直接打开
                                WeixinJSBridge.call('closeWindow');//关闭当前页面
                            }else if( that.bdfrom == '1'){
                                window.location.href=that.Host+'weixin-h5/DTCF/html/report/tgconfig_report_Intro.html?bdfrom=1'
                            }else if( that.bdfrom == '2'){
                                window.location.href=that.Host+'weixin-h5/DTCF/html/report/question.html?bdfrom=2'
                            }else if( that.bdfrom == '3'){
                                window.location.href=that.Host+'weixin-h5/DTCF/html/report/configurationReport.html?bdfrom=3&reportId='+that.reportId
                            }else if(that.bdfrom == '4'){
                                window.location.href=that.Host+'weixin-h5/DTCF/html/report/myReport.html?bdfrom=4'
                            }else if(that.bdfrom == '5'){
                                window.location.href=that.Host+'weixin-h5/DTCFS/html/report/shareReportHome.html?bdfrom=5&userId='+that.userId+'&forward_switch='+that.fswitch
                            }else if(wxfrom == '6' ||that.bdfrom == '6'){
                                window.location.href=that.Host+'weixin-h5/DTCF/html/report/myReport.html'
                            }else{
                                that.$router.push({
                                    path:'/'+that.bdfrom,
                                    name:that.bdfrom,
                                    query:{
                                        clickSource: that.$route.query.clickSource,
                                    }
                                })
                            }
                            
                        }
                    }).catch(() => {
                       //取消按钮
                    })
                    return;
                }
            //     else if(retCode == '-2'){
            //         that.trafficStatistics('017')
            //         that.trafficStatistics('020')
            //         MessageBox('    ','该身份证已绑定其他手机号').then(action => {
            //           if(action == 'confirm'){
            //             that.$router.push({
            //                 path:'/'+that.changeForm,
            //                 name:that.changeForm,
            //                 query:{
            //                     changeForm:that.changeForm,
            //                     isReviewSignup:that.isReviewSignup,
            //                     activityType:that.activityType,
            //                     activeId:that.activeId,
            //                     actName:that.actName,
            //                     beginTime:that.beginTime,
            //                     location:that.location,
            //                     ghT:that.ghT,
            //                     busNameT:that.busNameT,
            //                 }
            //             })
            //            }else{//取消
            //             return false;
            //           }
            //       });
            //         return;
            //     }
                else{
                    that.trafficStatistics('020')
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
                                if(that.bdfrom == 3){
                                    var canshu=that.Host+'weixin-h5/index.html#/bdphone?bdfrom='+that.bdfrom+'&idNo='+idCardNo+'&name='+encodeURIComponent(that.$route.query.name)+'&tp='+type+'&reportId='+that.reportId 
                                }else{
                                    var canshu=that.Host+'weixin-h5/index.html#/bdphone?bdfrom='+that.bdfrom+'&idNo='+idCardNo+'&name='+encodeURIComponent(that.$route.query.name)+'&tp='+type
                                }
                                
                                that.getface(idCardNo,idCardName,canshu,type)
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                
                            }
                        })
                   /* var message = '人脸识别身份认证失败，请重试。'
                    MessageBox('', message).then(action => {
                        if(action == 'confirm'){
                                //跳转财富师名片页面
                            that.$router.push({
                            path:'/'+that.changeForm,
                            name:that.changeForm,
                            query:{
                                changeForm:that.changeForm,
                                isReviewSignup:that.isReviewSignup,
                                activityType:that.activityType,
                                activeId:that.activeId,
                                actName:that.actName,
                                beginTime:that.beginTime,
                                location:that.location,
                                ghT:that.ghT,
                                busNameT:that.busNameT,
                            }
                        })
                        }
                    }).catch(() => {
                        
                    })*/
                    return;
                }
            })
            
        }
    }
}
</script>

<style>
@import'../activeSign/toSign.css';
 .inpRchoose{
     width:30%;
     position: absolute;
     left:78%!important;
    color:#999;
    line-height:30px;
 }
 .content_s{
     min-height: 13rem;
     background: #fff;
    padding:1rem .4rem .4rem 0.5rem;
 }
.changephone .comfooter{
     position: relative;
     bottom: 0;
 }
</style>

