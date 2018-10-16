<template>
    <div class='changephone'>
        <div class='content'>
            <div class='inpBox'>
                <input type='text' class='' maxlength='11' v-model="ipNo" ref='ph'v-on:input='phFn' placeholder="请输入手机号码"/>
                <p class='warn' ref='phwarn'>{{phwarn}}</p>
                <span>新手机号</span>
                <mt-button type="danger" size="small" class='sendCodeBtn' @click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''  ref='code'v-model="msgCode" placeholder="请输入验证码" v-on:input='codeFn'/>
                <p class='warn' ref='codewarn'>{{codewarn}}</p>
                <span>验证码</span>
             </div> <!--inpBox-->
              
             <mt-button type="danger" size="large" class='sign' @click="changeP()">确定</mt-button>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue"></getcode>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import axios from 'axios';
import getcode from './getcode'
import { isValidName,isValidMobile ,isValidverifycode} from '@/common/js/extends.js';//引入mint-ui的button组件文件包
export default {
    name:'changephone',
    data:function(){
        return{
            messType:'5',
            ipNo:'',//17184092628
            text:'发送验证码',
            msgCode:'',
            Dsiabled:false,
            codewarn:'',
            phwarn:''

        }
    },
    components:{getcode,MessageBox,Button},
    methods:{
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
               // this.$refs.code.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else if(!isValidverifycode(that.msgCode)){
                this.$refs.codewarn.style.display='block';
                this.codewarn='请输入正确的手机验证码';
                //this.$refs.code.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else{
                this.$refs.codewarn.style.display='none';
               // this.$refs.code.style='border-bottom:0.5px solid #efefef!important';
            }
        },
        getM:function(){ 
            var that=this;
            that.Dsiabled=true;
            if(that.ipNo==''){
                this.$refs.phwarn.style.display='block';
                this.phwarn='请输入手机号码';
                //this.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                that.Dsiabled=false;
                return;
            }else if(!isValidMobile(that.ipNo)){
                this.$refs.phwarn.style.display='block';
                this.phwarn='请输入正确的手机号码';
                //this.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                that.Dsiabled=false;
                return;
            }else{
                this.$refs.phwarn.style.display='none';
               // this.$refs.ph.style='border-bottom:0.5px solid #efefef!important';
            }
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
            console.log('click')
            var that=this;
            if(that.ipNo==''){
                this.$refs.phwarn.style.display='block';
                this.phwarn='请输入手机号码';
              //  this.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else if(!isValidMobile(that.ipNo)){
                this.$refs.phwarn.style.display='block';
                this.phwarn='请输入正确的手机号码';
               // this.$refs.ph.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else{
                this.$refs.phwarn.style.display='none';
               // this.$refs.ph.style='border-bottom:0.5px solid #efefef!important';
            }

             if(that.msgCode==''){//校验验证码
                this.$refs.codewarn.style.display='block';
                this.codewarn='请输入手机验证码';
               // this.$refs.code.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else if(!isValidverifycode(that.msgCode)){
                this.$refs.codewarn.style.display='block';
                this.codewarn='请输入正确的手机验证码';
               // this.$refs.code.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }else{
                this.$refs.codewarn.style.display='none';
               // this.$refs.code.style='border-bottom:0.5px solid #efefef!important';
            }
            Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/changeMobile',//
                params: {
                phone:that.ipNo,//新的手机号
                msgCode:that.msgCode//短信验证码

                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data);
                var retCode=res.data.retCode;
                if(retCode=='0'){//更改成功
                     MessageBox('提示','手机号码更改成功');
                }else if(retCode=='-2'){//验证码不正确
                     MessageBox('提示','验证码不正确');
                }else if(retCode=='-3'){//请发送验证码
                     MessageBox('提示','请发送验证码');
                }else if(retCode=='-4'){//该手机号已绑定别的账号,无法重复绑定
                     MessageBox('提示','该手机号已绑定别的账号,无法重复绑定');
                }else{
                    MessageBox('提示','系统异常');
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
</style>

