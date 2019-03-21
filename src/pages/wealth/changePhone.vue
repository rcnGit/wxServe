<template>
    <div class='changephone'>
        <div class='content_s'>
            <div class='inpBox'>
                <input type='tel' class='' maxlength='11' v-model="ipNo" ref='ph' placeholder="请输入手机号码" />
                <p class='warn' ref='phwarn'>{{phwarn}}</p>
                <span>新手机号</span>
                <mt-button type="danger" size="small" class='sendCodeBtn' @click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='tel' class=''  ref='code'v-model="msgCode" placeholder="请输入验证码" maxlength="4" />
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
import { MessageBox } from 'mint-ui';//    框
import { Toast } from 'mint-ui';
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import axios from 'axios';
import getcode from './getcode'
import comfooter from '../../components/footer'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import { isValidName,isValidMobile ,isValidverifycode} from '@/common/js/extends.js';//引入mint-ui的button组件文件包
export default {
    name:'changephone',
    data:function(){
        return{
            messType:'5',
            ipNo:'',//17184092628
            text:'获取验证码',
            Dsiabled:false,
            codewarn:'',
            phwarn:'',
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/changeMobile'),//接口
            paramurl: location.href.split('?')[0],
            changeForm:'',//更改手机号后返回指定的页面；
            isReviewSignup:'',
            activityType:'',
            activeId:'',
            beginTime:'',
            location:'',
            actName:'',
            msgCode:'',//以下在线申请财富师页面的入参
            phone:'',
            phone2:'',
            city:'',
            isFace:'0',
            ghT:'',
            busNameT:'',
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone:''
            },
            realName:'',
            idNo:'',
            token:'',
            type: '0' //人脸识别接口参数，手机号冲突时
        }
    },
    components:{getcode,MessageBox,Button,comfooter},
    methods:{
        getData:function(){
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//判断是否有财富师
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                 Indicator.close();
                 var retCode=res.data.retCode;
                if(retCode=='0'){
                    if(!res.data.userInfo.realName == false){
                        that.realName = res.data.userInfo.realName;
                        that.idNo = res.data.userInfo.idNo;//身份证
                    }
                    if(that.$route.query.actId == 'wxser' || that.changeForm == 'wxser'){
                        if(res.data.userInfo.authenticFlag==1){
                            Indicator.open();
                            setTimeout(() => {
                            Indicator.close();
                            var message = '更换手机号需先通过人脸识别验证是本人操作'
                            MessageBox.confirm('',{
                            message: message,
                            title: '',
                            confirmButtonText:'去验证',
                            closeOnClickModal: false
                            }).then(action => {
                            if(action == 'confirm'){
                                that.face(that.idNo,that.realName);//去人脸
                            //    that.$router.push({
                            //     path:'/faceMsg',
                            //     name:'faceMsg',
                            //     query:{
                            //         returnUrl:that.Host+'weixin-h5/index.html#/changePhone?changeForm=wxser',
                            //         chForm:'fromWxser'
                            //     }
                            //  })
                            }else{
                                
                            }
                            }).catch(err => {
                                if (err == 'cancel') {     //取消的回调
                                    WeixinJSBridge.call('closeWindow'); 
                                }
                            })
                        }, 1000)
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
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=changephone_'+that.$route.query.changeForm+'#wechat_redirect';
                }
            })
        },
        face:function(memId,memName){
            //alert(memId+'姓名'+memName)
            var that=this;
            var idCardNo=memId;
            var idCardName=memName;  
            if(that.msgCode == false){
                that.msgCode=''
            } 
            if(!that.$route.query.tp == false ){
                that.type = that.$route.query.tp
            }   
            var canshu='changeForm='+that.changeForm+'&cgphone='+that.ipNo+'&idNo='+idCardNo+'&name='+encodeURIComponent(idCardName)+'&isReviewSignup='+that.isReviewSignup+'&activityType='+that.activityType+'&activeId='+that.activeId+'&actName='+encodeURIComponent(that.actName)+'&beginTime='+that.beginTime+'&location='+encodeURIComponent(that.location)+'&msgCode='+that.msgCode+'&phone='+that.phone+'&phone2='+that.phone2+'&ghT='+that.ghT+'&city='+encodeURIComponent(that.city)+'&faceResult=1'+'&tp='+that.type
            Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceToken',//ning
                params:{
                    idCardNo:idCardNo,//身份证号
                    idCardName:idCardName,//身份证姓名
                    returnUrl:that.Host+'weixin-h5/index.html#/changePhone?'+canshu,//人脸识别后返回的Url
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
                     window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=faceMsg#wechat_redirect';
                 }else if(retCode == '-2'){
                    // MessageBox('','身份证不合法');
                     MessageBox('','身份证不合法').then(action => {
                        if(action == 'confirm'){
                            if(that.bdfrom == 'wxser'){//自动回复直接打开
                                WeixinJSBridge.call('closeWindow');//关闭当前页面
                            }
                            that.$router.push({
                                path:'/'+that.bdfrom,
                                name:that.bdfrom,
                                query:{
                                    clickSource: that.$route.query.clickSource,
                                }
                            })
                            
                        }
                    }).catch(() => {
                       //取消按钮
                    })
                    return;
                 }else if(retCode == '-1'){
                    // MessageBox('提示','系统异常');
                     Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                    setTimeout(function(){
                        if(that.bdfrom == 'wxser'){//自动回复直接打开
                            WeixinJSBridge.call('closeWindow');//关闭当前页面
                        }
                        that.$router.push({
                            path:'/'+that.bdfrom,
                            name:that.bdfrom,
                            query:{
                                clickSource: that.$route.query.clickSource,
                            }
                        })
                    },3000);
                     return;
                 }else if(retCode == '-3'){
                    // MessageBox('提示','当前网络不稳定，请重试');
                    Toast({
                        message: '姓名或身份证输入有误',
                        position: 'center',
                        duration: 3000
                    });
                    setTimeout(function(){
                        if(that.bdfrom == 'wxser'){//自动回复直接打开
                            WeixinJSBridge.call('closeWindow');//关闭当前页面
                        }
                        that.$router.push({
                            path:'/'+that.bdfrom,
                            name:that.bdfrom,
                            query:{
                                clickSource: that.$route.query.clickSource,
                            }
                        })
                    },3000);
                     return;
                 }else{
                     that.token=res.data.data.token;
                     var bizId=res.data.data.bizId;
                     setCookie('bizId',bizId);
                     window.location.href='https://api.megvii.com/faceid/lite/do?token='+that.token;
                
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
            that.trafficStatistics('021')//自定义埋点
            that.$refs.c1.getCodeFn(that.messType,that.ipNo);
        },
        childByValue:function(v){
            //console.log(v)
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
            Indicator.open();
            that.changeMobile()
        },
        changeMobile:function(){
            var that = this
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/changeMobile',//变更手机号
                params: {
                    phone:that.ipNo,//新的手机号
                    msgCode:that.msgCode,//短信验证码
                    backUrl: that.paramurl
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data);
                var retCode=res.data.retCode;
                var wxfrom =decodeURIComponent(that.$route.query.actId);
                if(retCode=='0'){//更改成功
                     //MessageBox('    ','手机号码更改成功');
                    MessageBox('    ', '手机号码更改成功').then(action => {
                      if(action == 'confirm'){
                         if(wxfrom == 'wxser' || that.changeForm == 'wxser'){
                            WeixinJSBridge.call('closeWindow');
                         }
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
                                    phone:that.ipNo,
                                    city:that.city,
                                    returnUrl:that.$route.query.returnUrl,
                                }
                            })
                         
                       }else{//取消
                            if(wxfrom == 'wxser' || that.changeForm == 'wxser'){
                            WeixinJSBridge.call('closeWindow');
                         }
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
                                    phone:that.ipNo,
                                    city:that.city,
                                    returnUrl:that.$route.query.returnUrl,
                                }
                            })
                      }
                  });
                }else if(retCode=='-2'){//验证码不正确
                     MessageBox('    ','验证码不正确');
                }else if(retCode=='-3'){//请发送验证码
                     MessageBox('    ','请发送验证码');
                }else if(retCode=='-4'){//该手机号已绑定别的账号,无法重复绑定
                     //MessageBox({'    ','该手机号已绑定其他账号，无法重复绑定。如有疑问请咨询客服：400-819-9868',confirmButtonText});
                     that.trafficStatistics('022')//自定义埋点
                     MessageBox({
                        title: '',
                        //message: '该手机号已绑定其他账号，无法重复绑定。如有疑问请咨询客服：400-819-9868',
                        message: '该手机号在大唐财富平台已绑定其他账号，无法重复绑定。如有疑问可在大唐财富服务号(datangwealth)内留言咨询',
                        confirmButtonText: '我知道了'
                    });
                 }
                 else if(retCode == 400){
                     var serbackUrl = that.Host+'wxservice/wxMemberInfo/changeMobile'
                 window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=changePhone#wechat_redirect';
                 }else if(retCode=='1'){//WX未实名，用户开通APP且实名，弹出框并跳转人脸识别打通用户，绑定手机号过来的
                    var message = '该手机号已开通大唐财富账户，请人脸识别身份认证同步账户信息。';      
                    MessageBox.confirm('', {
                        message: message,
                        title: '',
                        showCancelButton:false,
                        confirmButtonText:'去同步',
                    }).then(action => {
                        if(action == 'confirm'){
                            that.type = '1' //冲突手机号通过绑定验证为1
                            var memId = res.data.memId;    //糖罐的用户身份证
                            var memName = res.data.memName;    //糖罐的用户姓名
                            that.face(memId,memName);//用APP信息去人脸
                        }
                    }).catch(() => {
                        //取消按钮
                    })
                }else{
                   // MessageBox('    ','系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },
        getfaceId:function(){
            Indicator.open();
           // this.faceparam.phone = this.$route.query.phone
           this.faceparam.phone = this.$route.query.cgphone
            var that=this;
            if(!that.$route.query.cgphone == false){
                that.ipNo = that.$route.query.cgphone  //变更手机号参数
            }
            
          //  alert(this.faceparam.phone+'faceparam.phone')
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                Indicator.close();
               // alert(retCode)
                if(retCode == '0'){
                    that.trafficStatistics('019')
                   // MessageBox('    ','人脸识别成功');
                    // Toast({
                    //     message: '人脸识别成功',
                    //     position: 'center',
                    //     duration: 3000
                    // });
                    // that.changeMobile() //变更手机号
                    if(!that.ipNo == false){
                        MessageBox('','操作成功').then(action => {
                        if(action == 'confirm'){
                            if(that.changeForm == 'wxser'){
                                WeixinJSBridge.call('closeWindow');
                            }
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
                                    phone:that.ipNo,
                                    city:that.city,
                                    returnUrl:that.$route.query.returnUrl,
                                }
                            })
                            
                        }
                    }).catch(() => {
                       //取消按钮
                    })
                    }else{
                        Toast({
                            message: '人脸识别成功',
                            position: 'center',
                            duration: 3000
                        });
                    }
                    
                    return;
                }else if(retCode == '-2'){
                    that.trafficStatistics('017')
                    that.trafficStatistics('020')
                    MessageBox('    ','该身份证已绑定其他手机号').then(action => {
                      if(action == 'confirm'){
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
                       }else{//取消
                        return false;
                      }
                  });
                    return;
                }else{
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
                               // var type = that.$route.query.tp
                              //  var canshu=that.Host+'weixin-h5/index.html#/changephone?changeForm='+that.changeForm+'&cgphone='+that.ipNo+'&idNo='+idCardNo+'&name='+encodeURIComponent(that.$route.query.name)+'&isReviewSignup='+that.isReviewSignup+'&activityType='+that.activityType+'&activeId='+that.activeId+'&actName='+encodeURIComponent(that.actName)+'&beginTime='+that.beginTime+'&location='+encodeURIComponent(that.location)+'&msgCode='+that.msgCode+'&phone='+that.phone+'&phone2='+that.phone2+'&ghT='+that.ghT+'&city='+encodeURIComponent(that.city)+'&tp='+type 
                               // that.getface(idCardNo,idCardName,canshu,type)
                               that.face(idCardNo,idCardName)
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                if(that.changeForm == 'wxser'){
                                    WeixinJSBridge.call('closeWindow');
                                }
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
            //     else if(retCode == '-1'){
            //         MessageBox('    ','系统异常').then(action => {
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
            //                 }
            //             })
            //            }else{//取消
            //             return false;
            //           }
            //       });
            //         return;
            //     }else if(retCode == '-3'){
            //         MessageBox('    ','人脸识别未通过').then(action => {
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
            //                 }
            //             })
            //            }else{//取消
            //             return false;
            //           }
            //       });
            //         return;
            //     }else if(retCode == '-4'){
            //         MessageBox('    ','未查询到人脸识别结果').then(action => {
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
            //                 }
            //             })
            //            }else{//取消
            //             return false;
            //           }
            //       });
            //         return;
            //     }
            })
            .catch(function(){
               //alert("catch")
                MessageBox('    ','获取信息失败').then(action => {
                      if(action == 'confirm'){
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
                                city:that.city
                            }
                        })
                       }else{//取消
                        return false;
                      }
                  });
            })
        },
        
    },
    created:function(){
        
        this.GasyncSDKConifg()
        //客服报名所需的参数；
        if(!this.$route.query.actId==false){ //重定向后
            this.changeForm=this.$route.query.actId;
        }else{
            this.changeForm=this.$route.query.changeForm;
        }
        this.isReviewSignup=this.$route.query.isReviewSignup;
        this.activityType=this.$route.query.activityType;
        this.activeId=this.$route.query.activeId;
        this.actName=this.$route.query.actName;
        this.beginTime = this.$route.query.beginTime;
        this.location = this.$route.query.location;
        //在线申请财富师
        if(!this.$route.query.msgCode == false){
            this.msgCode=this.$route.query.msgCode;
        }
        
        this.phone=this.$route.query.routerPhone;
        this.phone2=this.$route.query.phone2;
        this.city=this.$route.query.city;
        this.isFace=this.$route.query.isFace;
        this.ghT=this.$route.query.ghT;
        this.busNameT=this.$route.query.busNameT;
        if(this.isFace==1 || this.$route.query.faceResult == 1){//需要人脸验证结果
            Indicator.open();
            var bizId=decodeURIComponent(getCookie("bizId"));
            this.faceparam.bizId = bizId;
            this.getfaceId();
        }else{
            this.getData()
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
    padding:1rem .4rem .4rem 0.5rem;
 }
 .xiazai{
    color:#4a90e2;
}
.changephone .comfooter{
     position: relative;
     bottom: 0;
 }
</style>

