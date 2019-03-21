<template>
    <div id='toSignOldCust'>
        <div class='content'>
            <div class='tip'>
             <span>请输入您的实名信息</span>
            </div>
            <div class='inpBox'>
                <input type='text' class=''ref='name' placeholder="请输入您的姓名"  v-model="param.idCardName"/>
                <span>姓名</span>
                <p class='warn' ref='namewarn'v-show='true'>{{namewarn}}</p> 
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''placeholder='请输入您的身份证号' v-on:input="shenJ()" ref='idCardNo' v-model="param.idCardNo" maxlength="20" />
                <span>身份证</span>
                <!-- <em>请输入正确的实名信息</em> -->
                <p class='warn' ref='warnIdcard'v-show='true'>{{warnIdcard}}</p>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->             
             <div style='clear:both'></div>
             <mt-button type="danger" size="large" class='next' @click="getDescribe()">下一步</mt-button>
        </div>
        
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { MessageBox } from 'mint-ui';// 框
import { Toast } from 'mint-ui';
import { isValidIdCardNo,isValidName} from '@/common/js/extends.js'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import axios from 'axios';
export default {
    name:'faceMsg',
    data:function(){
       return{
           warnIdcard: '',
           param:{
            idCardNo:'',//身份证号
            idCardName:'',//身份证姓名
            returnUrl:'',//人脸识别后返回的Url
            backUrl: location.href.split('?')[0]
           },
           faceUrl:'',
           namewarn:'',
           token:'',
           serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/getFaceToken'),
           ReturnUrl:''
       }
   },
    components:{Button,axios,Toast},//使用mint-ui的button的组件
    methods:{
        getData:function(){
            Indicator.open();
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
                    if(res.data.userInfo.authenticFlag==1){
                        Indicator.open();
                        setTimeout(() => {
                        Indicator.close();
                        MessageBox({title: '',message: '您已身份认证',closeOnClickModal: false}).then(action => {
                            if(action == 'confirm'){
                                WeixinJSBridge.call('closeWindow');   
                            }
                        }).catch(() => {
                        //取消按钮
                        })
                    }, 1000)
                    }
                }else if(retCode=='-1'){//系统异常
                    //MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }else if(retCode == 400){
                    var return_url = that.Host+'weixin-h5/index.html#/faceSuccess'
                    setCookie('facefrom',return_url);
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=faceMsg#wechat_redirect';
                }
            })
        },
        shenJ:function(){
           this.param.idCardNo=this.param.idCardNo.replace(/[\W]/g,'');
           this.param.idCardNo=this.param.idCardNo.toLocaleUpperCase();
        },
    getDescribe:function(id){//拼接跳转链接
        //校验身份信息的内容；

        if(this.param.idCardName==''){
            this.$refs.namewarn.style.display='block';
            this.namewarn='请输入姓名';
            return;
        }else if(isValidName(this.param.idCardName)){
            this.$refs.namewarn.style.display='block';
            this.namewarn='请输入正确的姓名';
            return;
        }else{
            this.$refs.namewarn.style.display='none'
        }

        if(this.param.idCardNo==''){
            this.$refs.warnIdcard.style.display='block';
            this.warnIdcard='请输入身份证';
            return;
        }else if(!isValidIdCardNo(this.param.idCardNo)){
            this.$refs.warnIdcard.style.display='block';
            this.warnIdcard='请输入正确的身份证';
            return;
        }else{
            this.$refs.warnIdcard.style.display='none'
        }
        this.trafficStatistics('016')//自定义埋点
        this.getFaceFn() //人脸识别
        
        },
        idCardNoFn:function(){
            if(this.param.idCardNo==''){
                return;
            }else if(!isValidIdCardNo(this.param.idCardNo)){
                this.$refs.warn.style.display='block';
                //this.$refs.idCardNo.style='border-bottom:0.5px solid #df1e1d!important';
                this.warnIdcard='请输入正确的身份证号';
                return;
            }else{
                this.$refs.warn.style.display='none';
                this.$refs.idCardNo.style='border-bottom:0.5px solid #efefef!important';
            }
        },//验证身份证
        nameFn:function(){
            if(this.param.idCardName==''){
                return;
            }else if(isValidName(this.param.idCardName)){
                this.$refs.namewarn.style.display='block';
               // this.$refs.name.style='border-bottom:0.5px solid #df1e1d!important';
                this.namewarn='请输入正确的姓名';
                return;
            }else{
                 console.log('none')
                this.$refs.namewarn.style.display='none';
                this.$refs.name.style='border-bottom:0.5px solid #efefef!important';
            }
        },
        getFaceFn:function(){
            console.log(this.param)
            var that=this;
            if(!that.param.idCardName == false){
                that.ReturnUrl = that.param.returnUrl
                that.param.returnUrl = that.param.returnUrl+'&idNo='+that.param.idCardNo+'&name='+encodeURIComponent(that.param.idCardName)  
            }
       // alert(that.param.returnUrl)
            Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceToken',//ning
                params:that.param
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data);
                var retCode=res.data.retCode;
               // alert(retCode)
                if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxMemberInfo/getFaceToken'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=faceMsg#wechat_redirect';
                }else if(retCode == '-2'){
                    MessageBox(' ','身份证不合法');
                    return;
                }else if(retCode == '-1'){
                // MessageBox(' ','系统异常');
                    Toast({
                        message: '系统异常', 
                        position: 'center',
                        duration: 3000
                    });
                    return;
                }else if(retCode == '-3'){//未获取到token
                    //MessageBox(' ','当前网络不稳定，请重试');
                    Toast({
                        message: '姓名或身份证输入有误',
                        position: 'center',
                        duration: 3000
                    });
                    return;
                }else if(retCode == '-4'){
                   // MessageBox(' ','您的实名信息已绑定其他微信无法重复绑定，如有疑问请拨打客服电话：400-819-9868');
                   var message = '该身份信息在大唐财富平台已绑定其他微信账号，无法重复绑定。如有疑问可在大唐财富服务号(datangwealth)内留言咨询';      
                    MessageBox.confirm('', {
                        message: message,
                        title: '',
                        showCancelButton:false,
                        confirmButtonText:'我知道了',
                    }).then(action => {
                        if(action == 'confirm'){
                        }
                    }).catch(() => {
                        //取消按钮
                    })
                    return;
                }else if(retCode == '-5'){
                  //  var tgPhone=res.data.tgPhone;
               // MessageBox(' ','手机号与已实名的手机号不一致');
                that.trafficStatistics('018')//自定义埋点
                // var message = '尊敬的客户，您当前绑定手机号与实名信息绑定手机号（尾号'+tgPhone+'）不一致，请更换一致后再进行身份认证。<br>PS：若想更换实名信息绑定手机号请去'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">大唐财富APP</a>'+'更换'
                //         MessageBox.confirm('', {
                //             message: message,
                //             title: '',
                //             showConfirmButton:true,
                //             confirmButtonClass:'confirmButton',
                //             confirmButtonText:'去更换',
                //         }).then(action => {
                //             if(action == 'confirm'){
                //                 that.$router.push({
                //                     path:'/changephone',
                //                     name:'changephone',
                //                     query:{
                //                         changeForm:'faceMsg',
                //                         //returnUrl:that.$route.query.returnUrl,
                //                         returnUrl:that.faceUrl
                //                     }
                //                 })
                //             }
                //         }).catch(() => {
                            
                //         })
                var message = '该实名信息已开通大唐账户，且绑定的手机号与当前账号所绑定的不一致。需重新绑定手机号后继续身份认证。';      
                    MessageBox.confirm('', {
                        message: message,
                        title: '',
                        showCancelButton:false,
                        confirmButtonText:'我知道了',
                    }).then(action => {
                        if(action == 'confirm'){
                            that.$router.push({
                                path:'/bdphone',
                                name:'bdphone',
                                query:{
                                    name: that.param.idCardName,
                                    idNo: that.param.idCardNo,
                                    returnUrl:that.ReturnUrl,
                                    bdfrom:'faceMsg',
                                    type: '1'
                                }
                            })
                            
                        }
                    }).catch(() => {
                        //取消按钮
                    })
                    return;
                }else if(retCode == '-6'){
                    that.trafficStatistics('018')//自定义埋点
                    var message = '您当前账户绑定的手机号已绑定其他实名信息，请更换手机号后重新认证。'
                        MessageBox.confirm('', {
                            message: message,
                            title: '',
                            showConfirmButton:true,
                            confirmButtonClass:'confirmButton',
                            confirmButtonText:'去更换',
                        }).then(action => {
                            if(action == 'confirm'){
                                that.$router.push({
                                    path:'/changephone',
                                    name:'changephone',
                                    query:{
                                        changeForm:'faceMsg',
                                        //returnUrl:that.$route.query.returnUrl,
                                        returnUrl:that.faceUrl
                                    }
                                })
                            }
                        }).catch(() => {
                            
                        })
                    return;
                }else{
                    that.token=res.data.data.token;
                    var bizId=res.data.data.bizId;
                    setCookie('bizId',bizId);
                window.location.href='https://api.megvii.com/faceid/lite/do?token='+that.token;
                
                }
            });
        }
    },
    created:function(){
       // if(this.$route.query.chForm == 'fromWxser'){//变更手机号过来不用getdata      
       // }else{
            this.getData()
       // }
      
      this.GasyncSDKConifg()
      var that = this;
      var returnUrl      
      if(!that.$route.query.returnUrl == false){   
         if(that.$route.query.returnUrl == 'faceSuccess'){
            returnUrl = that.Host+'weixin-h5/index.html#/faceSuccess'
         }else{
            returnUrl = that.$route.query.returnUrl
         }
      }else{
        // returnUrl =decodeURIComponent(that.$route.query.actId);//获取重定向_后拼的参数
        returnUrl = decodeURIComponent(getCookie("facefrom"))
      }
      that.faceUrl = returnUrl
       if(returnUrl&&returnUrl!=undefined){
           if(returnUrl.indexOf("?") != -1){
               that.param.returnUrl=returnUrl+'&faceResult=1';
           }else{
               that.param.returnUrl=returnUrl+'?faceResult=1';
           }
       }
    }
}

</script>
<style>
 @import 'toSign.css'; /* 引入toSign.css文件*/
 body{
     /* padding-top:15px; */
     background: #fff;
 }
 .mint-msgbox-message{
     text-align: left
 }
 .inpBox{
    margin-bottom: 20px;
   
 }
 
 .inpBox input[type="text"]:disabled
 { 
    background-color: rgb(238,236,236);
    color:rgb(164,169,178);
 }

 
 .next{
     width:90%;
    margin: 50px auto;
 }
 .xiazai{
    color:#4a90e2;
 }
</style>
