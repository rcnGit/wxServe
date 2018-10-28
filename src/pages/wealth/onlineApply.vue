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
                <span class='inpRchoose fSize13' style='color:#4a90e2;' @click='changeP' ref='changeSP' v-if='!ifSendMa'>变更手机号>></span>
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
                <span class='inpRchoose fSize13'style='text-align:center;color:#c5c5c5;'@click='chooseAdd'>去选择<img src='../../common/img/chooseR.png' class='chooseR'/></span>
              </div> <!--inpBox-->
              
             <mt-button type="danger" size="large" class='sign'@click='onlineW()'>申请</mt-button>
             <p class='fSize13' style='color:rgb(54,54,54);line-height:50px;'>输入您的手机号和所在地，提交申请，客服会在24小时内联系您~</p>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue"></getcode>




       
        <comfooter></comfooter>
    </div>
</template>
<script>
import getcode from './getcode'
import axios from 'axios';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
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
            phWarn:'',//校验是否输入手机号的提示
            codeWarn:'',//校验是否输入手机号的提示
            provWarn:'',//校验是否输入手机号的提示
            exeTime:'',//存储申请成功后的时间戳
            Dsiabled:false,
            ifSendMa:false,//是否发送验证码
            routerCity:'',
            routerPhone:'',
            msgCode:'',
            ifdisabledPh:false,//手机号是否禁止更改fa'l'se可以更改
            param:{
                province:'',//省份
                phone:'',//电话号码
                msgCode:'',//验证码
                backUrl: location.href.split('?')[0]
            },
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/applyWealther'),//接口
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
            var p=''
           
            if(this.param.phone==''||this.param.phone==undefined){
                p=this.ipNo;
            }else{
                p=this.param.phone;
            }
            
            this.$refs.c1.getCodeFn(this.messType,p);
        },
        changeP:function(){
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
            this.param.province=this.routerCity;
            if(this.param.phone==''||this.param.phone==undefined||this.param.phone==null){
                 this.param.phone=this.ipNo;
            }
            
            if(this.param.phone==''||this.param.phone==undefined){
                this.$refs.phWarn.style.display='block';
               // this.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important'
                this.phWarn='请输入手机号';
                return;
                
            }else if(!isValidMobile(this.param.phone)){
                this.$refs.phWarn.style.display='block';
               // this.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important'
                this.phWarn='请输入正确的手机号';
                return;
            }else{
               
                this.$refs.phWarn.style.display='none';
                this.$refs.ph.style='border-bottom:0.5px solid #efefef!important';
               
            }
           
            if(that.ifSendMa){
                if(this.msgCode==''){
                    this.$refs.codeWarn.style.display='block';
                   // this.$refs.code.style='border-bottom:0.5px solid #df1e1d!important'
                    this.codeWarn='请输入验证码';
                    return;
                }else if(this.msgCode.length!=4){
                    this.$refs.codeWarn.style.display='block';
                   // this.$refs.code.style='border-bottom:0.5px solid #df1e1d!important'
                    this.codeWarn='请输入四位的验证码';
                     return;
                }else{
                    this.$refs.codeWarn.style.display='none';
                    //this.$refs.code.style='border-bottom:0.5px solid #efefef!important';
                    this.param.msgCode=this.msgCode;
                }

            }

            
            if(this.param.province==''||this.param.province==undefined){
                this.$refs.provWarn.style.display='block';
                //this.$refs.prov.style='border-bottom:0.5px solid #df1e1d!important'
                this.provWarn='请选择城市';
                return;
            }else{
                this.$refs.provWarn.style.display='none';
                //this.$refs.prov.style='border-bottom:0.5px solid #efefef!important';
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
                    
                    if(retCode==0){
                       // MessageBox('提示', '申请成功');
                       Toast({
                        message: '申请成功',
                        position: 'center',
                        duration: 3000
                    });
                    alert(res.data.data.exeTime+'===res.data.data.exeTime');
                        that.exeTime=res.data.data.exeTime
                            that.$router.push({
                            path:'/applysuc',
                            name:'applysuc',
                            query:{
                                exeTime:that.exeTime
                            }
                        })
                    }else if(retCode==-2){
                        MessageBox('提示', '验证码不正确');
                    }else if(retCode==-3){
                        MessageBox('提示', '请发送验证码');
                    }else if(retCode == 400){
                         var serbackUrl = that.Host+'wxservice/wxMemberInfo/applyWealther'
                         window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=onlineApply#wechat_redirect';
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
                    if(!res.data.userInfo.phone == false){
                        that.param.phone=res.data.userInfo.phone;
                        var Tel = that.param.phone;
                        var mtel = Tel.substr(0, 3) + '****' + Tel.substr(7);
                        that.ipNo = mtel;
                       
                        that.ifdisabledPh = true;
                        that.isShow = true
                        that.isValid = true
                    }
                   
                    
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=toSignNewCust#wechat_redirect';
                }else{
                   // MessageBox('提示',retMsg);
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
      //  MessageBox('在线申请财富师','请输入正确的验证码');
      var that=this;
      that.getData();
      if(this.$route.query.msgCode!=undefined){
           this.msgCode = this.$route.query.msgCode;
      }
     
        that.routerPhone = that.$route.query.phone;//本人已有的手机号
        if(that.param.phone==''||that.param.phone==undefined){
           that.ifSendMa=true;
             if(that.$route.query.phone2!=''&&that.$route.query.phone2!=undefined){
                that.ipNo = that.$route.query.phone2; //手输入的手机号
            }
        }/*else{
           
             that.ifSendMa=false;
            that.param.phone=that.routerPhone;//本人的手机号
            var Tel = that.routerPhone
            var mtel = Tel.substr(0, 3) + '****' + Tel.substr(7);
            that.ipNo = mtel;
           
            this.ifdisabledPh=true;
        }*/
        //this.pnFn();
       // this.codeFn()
         
          var routerCity = this.$route.query.city;
         
            if(routerCity!=''&&routerCity!=undefined){
               this.routerCity=routerCity;
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
</style>

