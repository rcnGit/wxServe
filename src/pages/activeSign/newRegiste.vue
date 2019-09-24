<template>
    <div id='newRegiste'>
        <div class='tip'>
            <span>联系电话录入后将做加密处理，保证您的信息安全</span>
        </div>
        <div class='content'>
            <div class='inpBox'>
                <input type='text' class='' v-model="param.realName" maxlength='30' :disabled="isDisabled" ref="realName" placeholder="请输入您的真实姓名"/>
                <p class='warn' ref='warnName' v-show='warnShow'>{{warnName}}</p>
                <span><img src="./img/xing.png" class="xing"> 姓名</span>
                 <!-- <img src='./img/card_img@2x.png' class='clear' style='right:33%;'/>  -->
             </div>
            <div class='inpBox'>
                <input type='tel' class=''style='padding-right:100px;'maxlength='11' v-model="param.phone" ref='phone2' :disabled="isDisabled2" placeholder="请输入您的手机号" />
                <p class='warn' ref='warnPhone' v-show='true'>{{warnPhone}}</p>
                <span><img src="./img/xing.png" class="xing"> 电话</span>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='tel' class=''  maxlength='4' v-model="param.verifiCode" ref='verifycode' placeholder="请输入验证码"/>
                <p class='warn' ref='warnCode'v-show='true'>{{warnCode}}</p>
                <span><img src="./img/xing.png" class="xing"> 验证码</span>
                <mt-button type="danger" size="small" class='sendCodeBtn' v-on:click.stop="getM" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='tel' class='' v-model="gh" :disabled="isDisabled4" ref='belongBusiness' placeholder="请输入财富师工号" maxlength='7' @blur.prevent="changeCount($event)"/>
                <p class='warn' ref='warnbelongBusiness' v-show='true'>{{warnbelongBusiness}}</p>
                <span><img src="./img/xing.png" class="xing"> DT</span>
              </div> <!--inpBox-->
             
             <mt-button type="danger" size="large" class='sign' @click="toSignUp()" style="margin-top: 1.0667rem;">注册</mt-button>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue" v-on:warnCodeFunction="warnCodeFunction"></getcode> 
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Field } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Popup } from 'mint-ui';//底部出来的弹框；
import getcode from '../wealth/getcode';
import axios from 'axios'
import { isValidMobile, isValidxincode, isValidverifycode, isValidName3, isValidEmpNo2 } from '@/common/js/extends.js'
export default {
    name:'activeCheckin',
    data:function(){
        return{
            messType:'3',
            text:'获取验证码',
            Dsiabled:false,
            warnName:'',
            warnbelongBusiness:'',
            warnPhone:'',
            warnCode:'',
            gh:'',
            isDisabled: false,
            isDisabled2: false,
            isDisabled3: false,
            isDisabled4: false,
            isDisabled6: false,
            isValid: false,
            isValid2: false,
            isValid3: false,
            isValid4: false,
            warnShow: false,
            userPhone: '',
            phone2: '',
            authenticFlag:'',
            param:{
                realName: '',
                phone: '',
                verifiCode:'',
                belongBusiness: '',
                activityType: 'YX',
                appointState: '0',//0注册默认第一次，1直接报名，2确认指定，3不指定
                activeId:'',
                actName:'',
                isReviewSignup: '',
            },
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=getUserInfo'),//接口
            paramurl: location.href.split('?')[0]
        }
    },
    methods:{
        changeCount:function(e){
            //若是由点击引起的焦点改变，捕获点击了的元素
            var ele =  e.relatedTarget
            if(ele == null){
                window.scroll(0,0);
            }  
        },
        realnameFn:function(){
            if(!isValidName3(this.param.realName) || this.param.realName == ""){
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
        phoneFn:function(){
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
               // this.$refs.verifycode.style='border-bottom:0.5px solid #df1e1d!important';
                this.warnCode='请输入正确的验证码';
                this.isValid2 = false
            }else{
                this.$refs.warnCode.style.display='none';
             //   this.$refs.verifycode.style='border-bottom:0.5px solid #efefef!important';
                this.isValid2 = true
            }
        },//验证手机验证码
        belongBusinessFn:function(){
            if(!isValidEmpNo2(this.gh)){
                this.$refs.warnbelongBusiness.style.display='block';
                this.warnbelongBusiness='请输入正确的财富师工号';
               // this.$refs.belongBusiness.style='border-bottom:0.5px solid #df1e1d!important';
                this.isValid4 = false
                return false;
            }else{
                this.$refs.warnbelongBusiness.style.display='none';
               // this.$refs.belongBusiness.style='border-bottom:0.5px solid #efefef!important';
                this.isValid4 = true
                return true

            }
        },//验证财富师工号
        toSignUp:function(){
            var that=this;
            that.phoneFn();
            that.realnameFn();
            that.codeFn()
            that.belongBusinessFn()
            if(!that.isValid || !that.isValid2 || !that.isValid3|| !that.isValid4){
                console.log(that.isValid4)
               // this.phoneFn()
               // this.codeFn()
            }else{
                that.axiosSign()
            }
        },
        axiosSign:function(){
            Indicator.open();
            let that = this;
            that.param.belongBusiness='DT'+that.gh;
            
            console.log(that.param)
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=toSignUp',
                params: {
                    param:that.param,//系统类别
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;                  
                if(retCode==0){ 
                    that.$router.push({
                        path: '/newRegSucc',
                        name: 'newRegSucc',
                        query:{
                            
                        }
                    })
                }else if(retCode== 4 || retCode == -7){
                    // MessageBox({
                    //     title: '',
                    //     //message: '该手机号已绑定其他账号，无法重复绑定。如有疑问请咨询客服：400-819-9868',
                    //     message: '该手机号在大唐财富平台已绑定其他账号，无法重复绑定。如有疑问可在大唐财富服务号(datangwealth)内留言咨询',
                    //     confirmButtonText: '我知道了'
                    // });
                    Toast({
                        message: '该手机号已存在',
                        position: 'center',
                        duration: 3000
                    });
                }else if(retCode== 1){
                    MessageBox('','验证码错误');
                }else if(retCode== 2){
                    //MessageBox('提示','系统错误');
                    Toast({
                        message: '系统错误',
                        position: 'center',
                        duration: 3000
                    });
                }else if(retCode== -1){
                    //MessageBox('提示','系统异常'); 
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    }); 
                }else if(retCode== -2){
                    MessageBox('','绑定手机号出错');
                }else if(retCode== -3){
                    MessageBox('','已绑定线上财富师');
                }else if(retCode== -4){
                    MessageBox('','已绑定线下财富师');
                }else if(retCode== -5){
                    MessageBox('','财富师工号不存在');
                }else if(retCode== -6){
                    MessageBox('','财富师已离职');
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
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'/wxservice/wxservice?opName=toSignUp';
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=newRegiste_'+that.param.activeId+','+that.param.actName+','+that.param.isReviewSignup+'#wechat_redirect';
                }else{
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                }
            });
        }
    },
    created(){
        this.GasyncSDKConifg()
        if(!this.$route.query.activeId==false){
            this.param.activeId=this.$route.query.activeId;
            this.param.actName=decodeURIComponent(this.$route.query.actName);
            this.param.isReviewSignup= this.$route.query.isReviewSignup
        }else{
            var wxstr =decodeURIComponent(this.$route.query.actId); 
            this.param.activeId=wxstr.split(",")[0];
            this.param.actName=decodeURIComponent(wxstr.split(",")[1]);
            this.param.isReviewSignup= wxstr.split(",")[2];
        }
    },
    components:{Button,getcode,Field}//使用mint-ui的button的组件
}
</script>
<style>
 @import '../activeSign/toSign.css';  引入toSign.css文件*/
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
 .pop_contant_A{
background:url(./img/weimaBg.png) no-repeat!important;
width:280px!important;
background-size:cover!important;
height:360px!important;
}
.mint-popup.mint-popup-center{
    border-radius: 10px;
}
#newRegiste .content{
    padding-top: 0;
}
#newRegiste .tip{
    background: #F9F9F9;
    padding: .29rem 0 .266667rem .533333rem;
    margin-bottom: .1rem;
}
#newRegiste .tip span{
    color: #C90302;
    font-size: .32rem;
}
.inpBox .xing{
    width: .186667rem;
    position: relative;
    top: -.1rem;
}
</style>
