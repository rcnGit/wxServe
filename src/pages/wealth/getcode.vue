<template>
    <div class='getcode'></div>
</template>

<script>
import axios from 'axios'
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import cgetcod from './getcode'
export default {
    name:'getcode',
    data:function(){
        return{
            param:{
                mobileNo:'',
                messType:'',
                state:''
            },
             messText:'',
           ex:{
                time:60,
                btnDsiabled:true,
           },
           warn:'',
           
        }
    },
    methods:{
        getCodeFn:function(type,ipNo,states){
            var that=this;
            if(type==3||type=='3'){
                that.messText='活动报名';
            }else if(type==4||type=='4'){
                that.messText='活动签到';
            }else if(type==5||type=='5'){
                that.messText='无法重复绑定';
            }else if(type==6||type=='6'){
                that.messText='推送客户意愿给财富师';
            }
           // that.ex.btnDsiabled=true;//禁止点击按钮
            //手机号非空和数字校验
            var reg = /^[0-9]{11}$/;
            if(ipNo.length==0){
                that.warn='请输入手机号';
                that.$emit('warnCodeFunction', that.warn);
                that.ex.btnDsiabled=false;
                return;
            }else if(ipNo.length<11||!reg.test(ipNo)){
                that.warn='请输入正确的手机号';
                that.$emit('warnCodeFunction',that.warn);
                that.ex.btnDsiabled=false;
                return
            }else{
                that.$emit('warnCodeFunction','');
                
            }
            //ajax提交
            that.param={
                mobileNo:ipNo,
                messType:type,
                state:states
            }
            console.log(that.param);
             axios({
                method:'get',
                url:'/wxservice/wxservice?opName=send_mobile_message',
                params: {
                param:that.param,//系统类别
                }
             })
            .then(function(res) {//成功之后
                console.log(res)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode == -1){
                that.ex.btnDsiabled=false;
                  var message = retMsg;
                  that.ex.time='获取验证码';
                  that.$emit('childByValue',that.ex);//传到调用页面
                 //  MessageBox('提示',message);
                 Toast({
                        message: message,
                        position: 'center',
                        duration: 3000
                    });
                }else if(retCode == -2){
                    that.ex.time='获取验证码';
                    that.ex.btnDsiabled=false;
                    that.$emit('childByValue',that.ex);//传到调用页面
                    // var message = '该手机号已绑定其他账号，无法重复绑定。如有疑问请咨询客服：400-819-9868';
                    // // if(authenticFlag =="0"){
                    // //     var message = '该手机号已绑定其他账号，'+that.messText+'。如有疑问请咨询客服：400-819-9868'
                    // // }else if(authenticFlag =="1"){
                    // //     var message = '该手机号已绑定其他账号，'+that.messText+'，请绑定您资金的手机号如有疑问请咨询客服：400-819-9868'
                    // // }        
                    // MessageBox.confirm('', {
                    //     message: message,
                    //     title: '',
                    //     showConfirmButton:true,
                    //     confirmButtonText:'去联系',
                    //     cancelButtonText:'取消',
                    // }).then(action => {
                    //     if(action == 'confirm'){
                    //        window.location.href='tel:400-819-9868';
                    //     }
                    // }).catch(() => {
                    //    //取消按钮
                    // })
                    var message = '该手机号在大唐财富平台已绑定其他微信账号，无法重复绑定。如有疑问可在大唐财富服务号(datangwealth)内留言咨询';      
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
                }else if(retCode == 0){
                    that.subTime();
                    return;
                }else if(retCode == -3){
                    that.ex.time='获取验证码';
                    that.ex.btnDsiabled=false;
                    that.$emit('childByValue',that.ex);//传到调用页面
                    Toast({
                        message: '该手机号与当前绑定的手机号相同',
                        position: 'center',
                        duration: 3000
                    });
                    return;
                }else{
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                    that.ex.btnDsiabled=false;
                    that.$emit('childByValue',that.ex);//传到调用页面
                }
            });
        },//fn,
        subTime:function(){ 
            var that=this;
            that.ex.btnDsiabled=true;
            that.ex.time=60;
             var g=setInterval(function(){
                that.ex.time=parseInt(that.ex.time-1);
                if(that.ex.time==0){
                    clearInterval(g);
                    that.ex.time='重新发送';
                    that.ex.btnDsiabled=false;
                }else if(that.ex.time==NaN){
                    that.ex.btnDsiabled=false;
                    that.ex.time='重新发送';
                }
                that.$emit('childByValue',that.ex);
            },1000)
        }
    },
    mounted:function(){
        
    }
  // component:(getcode)
}
</script>
