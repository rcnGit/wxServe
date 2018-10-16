<template>
    <div class='online'>
        <div class='content'>
            <div class='inpBox'>
                <input type='text' class=''placeholder="请输入手机号码" v-on:input='pnFn' maxlength='11' v-model="ipNo" ref='ph'v-bind:disabled='ifdisabledPh'/>
                <P ref='phWarn' class='warn'>{{phWarn}}</P>
                <span>手机号</span>
                <span class='inpRchoose fSize13' style='color:#4a90e2;display:none;' @click='changeP' ref='changeSP'>变更手机号>></span>
             </div> <!--inpBox-->
              <div class='inpBox' ref='sendCode' style='display:none'>
                <input type='text' class='' v-model="msgCode" ref='code' placeholder="请输入验证码" v-on:input='codeFn'/>
                <p ref='codeWarn' class='warn'>{{codeWarn}}</p>
                <span>验证码</span>
                 <mt-button type="danger" size="small" class='sendCodeBtn' @click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
             <div class='inpBox'>
                <input type='text' class=''v-model='routerCity'ref='prov' placeholder="请选择所在地" disabled=true style='border-bottom:1px solid #efefef;opacity: 1;'/>
                <p ref='provWarn' class='warn' >{{provWarn}}</p>
                <span>所在地</span>
                <span class='inpRchoose fSize13'style='text-align:center;color:#c5c5c5;'@click='chooseAdd'>去选择<img src='../../common/img/chooseR.png' class='chooseR'/></span>
              </div> <!--inpBox-->
              
             <mt-button type="danger" size="large" class='sign'@click='onlineW()'>申请</mt-button>
             <p class='fSize13' style='color:rgb(54,54,54);line-height:50px;'>输入您的所在地，提交申请，客服会在24小时内联系您~</p>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue"></getcode>
    </div>
</template>
<script>
import getcode from './getcode'
import axios from 'axios';
import { MessageBox } from 'mint-ui';//提示框
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { isValidMobile,isValidverifycode } from '@/common/js/extends.js';//引入mint-ui的button组件文件包
export default {
    name:'onlineApply',
    data:function(){
        return{
            messType:'5',
            ipNo:'',
            text:'发送验证码',
            phWarn:'',//校验是否输入手机号的提示
            codeWarn:'',//校验是否输入手机号的提示
            provWarn:'',//校验是否输入手机号的提示
            exeTime:'',//存储申请成功后的时间戳
            Dsiabled:false,
            routerCity:'',
            routerPhone:'',
            msgCode:'',
            ifdisabledPh:false,//手机号是否禁止更改fa'l'se可以更改
            param:{
                province:'',//省份
                phone:'',//电话号码
                msgCode:'',//验证码

            }
        }
    },
    components:{getcode,isValidMobile,MessageBox,isValidverifycode},
    methods:{
        pnFn:function(){
           
             if(this.ipNo==''){
                return;
            }else if(!isValidMobile(this.ipNo)){
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
            this.$refs.c1.getCodeFn(this.messType,this.ipNo);
        },
        childByValue:function(v){
            //console.log(v)
            this.text=v.time;
           // console.log(v.time)
           this.Dsiabled=v.btnDsiabled;
           // console.log(this.Dsiabled);
        },
        changeP:function(){
             this.$router.push({
                path:'/changephone',
                name:'changephone',
                params:{
                }
            })
        },
        chooseAdd:function(){
            this.$router.push({
                path:'/provinceList',
                name:'provinceList',
                params:{
                    father:'onlineApply',
                    phone:this.routerPhone,
                    phone2:this.ipNo,
                    msgCode:this.msgCode,
                }
            })
        },
        onlineW:function(){
            var that=this;
            this.param.province=this.routerCity;
            this.param.phone=this.ipNo
          
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

            if(this.$refs.sendCode.style.display=='block'){
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
            console.log(this.param);
             axios({
                    method:'get',
                    url:'/wxservice/wxMemberInfo/applyWealther',//申请财富师之前校验财富师
                    params:this.param,
                })
                .then(function(res) {
                    console.log(res.data);
                    var retCode=res.data.retCode;
                    
                    if(retCode==0){
                        MessageBox('提示', '申请成功');
                        that.exeTime=res.data.data.exeTime
                            that.$router.push({
                            path:'/applysuc',
                            name:'applysuc',
                            params:{
                                exeTime:that.exeTime
                            }
                        })
                    }else if(retCode==-2){
                        MessageBox('提示', '验证码不正确');
                    }else if(retCode==-3){
                        MessageBox('提示', '请发送验证码');
                    }
                })
        }

        
    },
    mounted:function(){
      //  MessageBox('在线申请财富师','请输入正确的验证码');
      if(this.$route.params.msgCode!=undefined){
           this.msgCode = this.$route.params.msgCode;
      }
      
        this.routerPhone = this.$route.params.phone;
        if(this.$route.params.phone2!=''&&this.$route.params.phone2!=undefined){
            this.ipNo = this.$route.params.phone2;
        }
        
        if(this.routerPhone==''||this.routerPhone==undefined){
            this.$refs.sendCode.style.display='block';
            this.$refs.changeSP.style.display='none';
        }else{
            this.$refs.changeSP.style.display='block';
            this.$refs.sendCode.style.display='none';
            this.ipNo=this.routerPhone;
            this.ifdisabledPh=true;
        }
        this.pnFn();
        this.codeFn()
          var routerCity = this.$route.params.city;
            if(routerCity!=''&&routerCity!=undefined){
               this.routerCity=routerCity;
               // this.$route.params.city='';
                return;
            }
        
    }
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

