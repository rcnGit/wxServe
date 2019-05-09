<template>
    <div class='online'>
        <div class='content'>
            <div class='inpBox'>
                <input type='hidden' class=''style='padding-right:100px;'maxlength='11' v-model="param.phone" ref='phone' />
                <input type='tel' class=''style='padding-right:100px;'maxlength='11' v-model="ipNo" ref='ph' :disabled="ifdisabledPh" placeholder="请输入联系人电话" />
                <p class='warn' ref='phWarn' v-show='true'>{{phWarn}}</p>

                <!-- <input type='tel' class=''placeholder="请输入手机号码" maxlength='11' v-model="ipNo" ref='ph'v-bind:disabled='ifdisabledPh'/>
                <P ref='phWarn' class='warn'>{{phWarn}}</P> -->
                <span>手机号</span>
                <span class='inpRchoose fSize13' style='color:#4a90e2;text-align:center;' @click='changeP' ref='changeSP' v-if='!ifSendMa'>变更手机号</span>
             </div> <!--inpBox-->
              <div class='inpBox' ref='sendCode' style='' v-if='ifSendMa'>
                <input type='tel' class='' v-model="msgCode" ref='code' placeholder="请输入验证码" maxlength="4"/>
                <p ref='codeWarn' class='warn'>{{codeWarn}}</p>
                <span>验证码</span>
                 <mt-button type="danger" size="small" class='sendCodeBtn' @click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
             <div class='inpBox'>
                <input type='text' class=''v-model='routerCity'ref='prov' placeholder="请选择所在地" disabled=true style='border-bottom:1px solid #efefef;opacity: 1;background:#fff;'/>
                <p ref='provWarn' class='warn' >{{provWarn}}</p>
                <span>所在地</span>
                <span class='inpRchoose fSize13'style='text-align:center;color:#333;'@click='chooseAdd'>去选择<img src='../../common/img/chooseR.png' class='chooseR' style="top:.05rem;"/></span>
              </div> <!--inpBox-->
              
             <mt-button type="danger" size="large" class='sign'@click='onlineW()' style='margin-top:2rem'>申请</mt-button>
             <p class='fSize13' style='color:#999;line-height: .58rem;font-size: .3rem;padding: .5rem 0rem 0;'>输入您的手机号和所在地，提交申请，客服会在24小时内联系您~</p>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue"></getcode>


        <comfooter class="footers"></comfooter>
    </div>
</template>
<script>
import getcode from './getcode'
import axios from 'axios';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//  框
import { Toast } from 'mint-ui';
import { getCookie,setCookie } from '@/common/js/cookie.js'
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { isValidMobile,isValidverifycode } from '@/common/js/extends.js';//引入mint-ui的button组件文件包
import comfooter from '../../components/footer'
export default {
    name:'onlineApply',
    data:function(){
        return{
            messType:'5',
            ipNo:'',
            text:'获取验证码',
            phWarn:'',//校验是否输入手机号的  
            codeWarn:'',//校验是否输入手机号的  
            provWarn:'',//校验是否输入手机号的  
          //  exeTime:'',//存储申请成功后的时间戳
            Dsiabled:false,
            ifSendMa:false,//是否发送验证码
            routerCity:'',
            isFaceSuc:'',
            token:'',
            routerPhone:'',
            idNo:'',//身份信息
            realName:'',//真实姓名
            msgCode:'',
            ifdisabledPh:false,//手机号是否禁止更改fa'l'se可以更改
            param:{
                province:'',//省份
                phone:'',//电话号码
                msgCode:'',//验证码
                backUrl: location.href.split('?')[0]
            },
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/applyWealther'),//接口
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone:''
            }
        }
    },
    components:{getcode,isValidMobile,MessageBox,isValidverifycode,comfooter},
    methods:{
        pnFn:function(){
           
             if(this.ipNo==''&&this.param.phone==''){
                return;
            }else if(!isValidMobile(this.param.phone)||!isValidMobile(this.ipNo)){
                this.$refs.phWarn.style.display='block';
               
               // this.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important'
                this.phWarn='请输入正确的手机号';
                return;
            }else{
                this.$refs.phWarn.style.display='none';
                
               // this.$refs.ph.style='border-bottom:0.5px solid #efefef!important';
            }
        },
        codeFn:function(){
               if(this.msgCode==''){
                    return;
                }else if(!isValidverifycode(this.msgCode)){
                    this.$refs.codeWarn.style.display='block';
                    //this.$refs.code.style='border-bottom:0.5px solid #df1e1d!important'
                    this.codeWarn='请输入四位的验证码';
                     return;
                }else{
                    this.$refs.codeWarn.style.display='none';
                   // this.$refs.code.style='border-bottom:0.5px solid #efefef!important';
                }
        },
        getM:function(){
            var that=this;
            that.Dsiabled=true;
            if(that.ipNo==''){
                that.$refs.phWarn.style.display='block';
                that.phWarn='请输入手机号码';
                //that.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                that.Dsiabled=false;
                return;
            }else if(!isValidMobile(that.ipNo)){
                that.$refs.phWarn.style.display='block';
                that.phWarn='请输入正确的手机号码';
                //that.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                that.Dsiabled=false;
                return;
            }else{
                that.$refs.phWarn.style.display='none';
               // that.$refs.ph.style='border-bottom:0.5px solid #efefef!important';
            }
            that.$refs.c1.getCodeFn(that.messType,that.ipNo);
        },
        face:function(from,memId,memName){
            var that=this;
            if(from == '1'){//更换手机号之前的人脸
                var idCardNo=that.idNo;
                var idCardName=that.realName;
                var canshu='changePhone?changeForm=onlineApply&msgCode='+that.msgCode+'&name='+encodeURIComponent(idCardName)+'&idNo='+idCardNo+'&phone='+that.routerPhone+'&phone2='+that.ipNo+'&city='+that.routerCity+'&isFace=1';
            }else{
                var idCardNo=memId;
                var idCardName=memName;
                var canshu='onlineApply?msgCode='+that.msgCode+'&name='+encodeURIComponent(idCardName)+'&idNo='+idCardNo+'&phone='+that.routerPhone+'&phone2='+that.ipNo+'&city='+that.routerCity+'&isFace=1';
            }
            //alert(canshu)
            Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceToken',//ning
                params:{
                    idCardNo:idCardNo,//身份证号
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
                     window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=faceMsg#wechat_redirect';
                 }else if(retCode == '-2'){
                     MessageBox(' ','身份证不合法');
                     return;
                 }else if(retCode == '-1'){
                     MessageBox(' ','系统异常');
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
            var that=this; 
           // that.routerPhone = that.$route.query.phone;//本人已有的手机号
            if(that.$route.query.phone==''||that.param.phone==undefined){
            //that.ifSendMa=true;
                if(that.$route.query.phone2!=''&&that.$route.query.phone2!=undefined){
                    that.faceparam.phone = that.$route.query.phone2; //手输入的手机号
                    that.param.phone = that.$route.query.phone2; //手输入的手机号
                }
            }else{
                that.faceparam.phone = that.$route.query.phone
                that.param.phone = that.$route.query.phone
            }
            that.param.province=that.routerCity;
            that.param.msgCode=that.$route.query.msgCode;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                Indicator.close();
                if(retCode == '0'){
                    that.trafficStatistics('019')
                   MessageBox('    ','人脸识别成功');
                    Toast({
                        message: '人脸识别成功',  
                        position: 'center',
                        duration: 3000
                    });
                    that.getApply()//在线申请财富师
                    //账号打通，人脸成功后手机号也绑定成功。
                    // MessageBox('','操作成功').then(action => {
                    //     if(action == 'confirm'){
                    //         // if(that.bdfrom == 'wxser'){//自动回复直接打开
                    //         //     WeixinJSBridge.call('closeWindow');//关闭当前页面
                    //         // }
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
                    return;
                }
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
                                var canshu=that.Host+'weixin-h5/index.html#/onlineApply?msgCode='+that.$route.query.msgCode+'&name='+encodeURIComponent(idCardName)+'&idNo='+idCardNo+'&phone='+that.$route.query.phone+'&phone2='+that.$route.query.phon2+'&city='+that.$route.query.city+'&isFace=1'+'&tp='+type
                                that.getface(idCardNo,idCardName,canshu,type)
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                
                            }
                        })
                    return;
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
            if(that.isFaceSuc==1){
                that.tishi_changeP();//去人脸
            }else{
                this.$router.push({
                    path:'/changephone',
                    name:'changephone',
                    query:{
                        changeForm:'onlineApply',
                        msgCode:this.msgCode,
                        phone:this.routerPhone,
                        phone2:this.ipNo,
                        city:this.routerCity,
                    }
                })
            }//else
           
        },
        chooseAdd:function(){
            this.$router.push({
                path:'/provinceList',
                name:'provinceList',
                query:{
                    father:'onlineApply',
                    phone:this.param.phone,
                    phone2:this.ipNo,
                    msgCode:this.msgCode,
                }
            })
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
        onlineW:function(){
             var that=this;
            that.param.province=that.routerCity;
           /* if(that.param.phone==''||that.param.phone==undefined||that.param.phone==null){
                 that.param.phone=that.ipNo;
            }
            
            if(that.param.phone==''||that.param.phone==undefined){
                that.$refs.phWarn.style.display='block';
               // that.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important'
                that.phWarn='请输入手机号';
                return;
                
            }else if(!isValidMobile(that.param.phone)){
                that.$refs.phWarn.style.display='block';
               // that.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important'
                that.phWarn='请输入正确的手机号';
                return;
            }else{
                that.$refs.phWarn.style.display='none';
               // that.$refs.ph.style='border-bottom:0.5px solid #efefef!important';
               
            }*/
            if(that.param.phone == false){
                if(that.ipNo==''||that.ipNo==undefined||that.param.phone==null){
                    that.$refs.phWarn.style.display='block';
                // that.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important'
                    that.phWarn='请输入手机号码';
                    return;
                    
                }else if(!isValidMobile(that.ipNo)){
                    that.$refs.phWarn.style.display='block';
                // that.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important'
                    that.phWarn='请输入正确的手机号';
                    return;
                }else{
                    that.$refs.phWarn.style.display='none';
                // that.$refs.ph.style='border-bottom:0.5px solid #efefef!important';
                
                }
            }
            
            
            if(that.ifSendMa){
                if(that.msgCode==''){
                    that.$refs.codeWarn.style.display='block';
                   // that.$refs.code.style='border-bottom:0.5px solid #df1e1d!important'
                    that.codeWarn='请输入验证码';
                    return;
                }else if(that.msgCode.length!=4){
                    that.$refs.codeWarn.style.display='block';
                   // that.$refs.code.style='border-bottom:0.5px solid #df1e1d!important'
                    that.codeWarn='请输入四位的验证码';
                     return;
                }else{
                    that.$refs.codeWarn.style.display='none';
                    //that.$refs.code.style='border-bottom:0.5px solid #efefef!important';
                    that.param.msgCode=that.msgCode;
                }

            }

            
            if(that.param.province==''||that.param.province==undefined){
                that.$refs.provWarn.style.display='block';
                //that.$refs.prov.style='border-bottom:0.5px solid #df1e1d!important'
                that.provWarn='请选择城市';
                return;
            }else{
                that.$refs.provWarn.style.display='none';
                //this.$refs.prov.style='border-bottom:0.5px solid #efefef!important';
            }
           that.getApply()
            
        },
        getApply:function(){
            let that = this;
            if(that.param.phone==''||that.param.phone==undefined||that.param.phone==null){
                that.param.phone=that.ipNo;
            }
            console.log(that.param);
             axios({
                    method:'get',
                    url:'/wxservice/wxMemberInfo/applyWealther',//申请财富师之前校验财富师
                    params:that.param,
                })
                .then(function(res) {
                    console.log(res.data);
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode==0){
                       // MessageBox('  ', '申请成功');
                       Toast({
                        message: '申请成功',
                        position: 'center',
                        duration: 3000
                    });
                       // that.exeTime=res.data.data.exeTime
                            that.$router.push({
                            path:'/applysuc',
                            name:'applysuc',
                            query:{
                               // exeTime:that.exeTime
                            }
                        })
                    }else if(retCode==-2){
                        MessageBox('  ', '验证码不正确');
                    }else if(retCode==-3){
                        MessageBox('  ', '请发送验证码');
                    }else if(retCode== -4){
                        MessageBox({
                            title: '',
                            //message: '该手机号已绑定其他账号，无法重复绑定。如有疑问请咨询客服：400-819-9868',
                            message: '该手机号在大唐财富平台已绑定其他账号，无法重复绑定。如有疑问可在大唐财富服务号(datangwealth)内留言咨询',
                            confirmButtonText: '我知道了'
                        });
                    }else if(retCode == 400){
                         var serbackUrl = that.Host+'wxservice/wxMemberInfo/applyWealther'
                         window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=onlineApply#wechat_redirect';
                    }else if(retCode == -8){//实名用户电话同TG实名用户电话不一致
                        MessageBox({
                            title: '',
                            //message: '该手机号已绑定其他账号，无法重复绑定。如有疑问请咨询客服：400-819-9868',
                            message: '该手机号在大唐财富平台已绑定其他账号，无法重复绑定。如有疑问可在大唐财富服务号(datangwealth)内留言咨询。',
                            confirmButtonText: '我知道了'
                        });
                    }else{
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    }); 
                }
            })
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
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode==0){
                    that.isFaceSuc=res.data.userInfo.authenticFlag;//实名状态
                    if(!res.data.userInfo.realName == false){
                        that.realName = res.data.userInfo.realName
                        that.idNo= res.data.userInfo.idNo
                    }
                    if(!res.data.userInfo.phone == false){
                        that.ifSendMa=false;
                        that.param.phone=res.data.userInfo.phone;
                        var Tel = that.param.phone;
                        var mtel = Tel.substr(0, 3) + '****' + Tel.substr(7);
                        that.ipNo = mtel;
                        that.ifdisabledPh = true;
                        that.isShow = true
                        that.isValid = true
                    }else{
                        that.ifSendMa=true;
                    }
                   
                    
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=onlineApply#wechat_redirect';
                }else{
                   // MessageBox('  ',retMsg);
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                }
            });
        },
        
    },
    created:function(){
       this.GasyncSDKConifg()
        // var bizId=decodeURIComponent(getCookie("bizId"));
        // this.faceparam.bizId = bizId;
        //  if(!this.$route.query.faceResult == false||bizId==null){
        //     this.getfaceId();
        //  }else{
        //     this.getData()//获取客户信息
        //  }
      //  MessageBox('在线申请财富师','请输入正确的验证码');
      var that=this;
      that.getData();
      if(that.$route.query.msgCode!=undefined){
           that.msgCode = that.$route.query.msgCode;
      }
        that.routerPhone = that.$route.query.phone;//本人已有的手机号
        if(that.routerPhone==''||that.param.phone==undefined){
           that.ifSendMa=true;
             if(!that.$route.query.phone2 == false){
                that.ipNo = that.$route.query.phone2; //手输入的手机号
            }
        }
        /*else{
           
             that.ifSendMa=false;
            that.param.phone=that.routerPhone;//本人的手机号
            var Tel = that.routerPhone
            var mtel = Tel.substr(0, 3) + '****' + Tel.substr(7);
            that.ipNo = mtel;
           
            this.ifdisabledPh=true;
        }*/
        //this.pnFn();
       // this.codeFn()
         
          var routerCity = that.$route.query.city;
         
            if(routerCity!=''&&routerCity!=undefined&&routerCity!='undefined'){
               // alert(that.$route.query.city);
               that.routerCity=decodeURIComponent(routerCity);
               // this.$route.query.city='';
                return;
            }
        
    },

}
</script>

<style>
@import'../activeSign/toSign.css';
 .inpRchoose{
     width:30%;
     position: absolute;
     left:74%!important;
    color:#999;
    line-height:30px;
 }
 .footers{
     position: fixed;
     bottom: 0;
 }
</style>

