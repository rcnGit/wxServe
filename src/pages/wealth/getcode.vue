<template>
    <div class='getcode'></div>
</template>

<script>
import axios from 'axios'
import { MessageBox } from 'mint-ui';
import cgetcod from './getcode'
export default {
    name:'getcode',
    data:function(){
        return{
            param:{
                mobileNo:'',
                messType:'',
            },
           ex:{
                time:180,
                btnDsiabled:true,
           },
           warn:''
        }
    },
    methods:{
        getCodeFn:function(type,ipNo,authenticFlag){
            var that=this;
            that.ex.btnDsiabled=true;//禁止点击按钮
            //手机号非空和数字校验
            var that=this;
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
                that.subTime()
            }
            //ajax提交
            var that=this;
            that.param={
                mobileNo:ipNo,
                messType:type
            }
            console.log(that.param);
             axios({
                method:'get',
                url:'/wei/wxservice/wxservice?opName=send_mobile_message',
                params: {
                param:that.param,//系统类别
                }
             })
            .then(function(res) {//成功之后
                var retCode=res.data.retCode;
                //var retCode= -2;
                var retMsg=res.data.retMsg;
                if(retCode == -1){
                    MessageBox('提示',retMsg);
                }else if(retCode == -2){
                    console.log(authenticFlag)
                    if(authenticFlag =="0"){
                        var message = '该手机号已绑定其他账号，您无法通过该号码签到活动。如有疑问请咨询客服：400-819-9868'
                    }else if(authenticFlag =="1"){
                        var message = '该手机号已绑定其他账号，您无法通过该号码签到活动，请绑定您资金的手机号如有疑问请咨询客服：400-819-9868'
                    }        
                    MessageBox.alert('', {
                        message: message,
                        title: '',
                        showConfirmButton:true,
                        confirmButtonClass:'confirmButton',
                        confirmButtonText:'我知道了',
                    }).then(action => {
                        if(action == 'confirm'){
                            
                        }
                    })
                }
            });
        },//fn,
        subTime:function(){ 
            var that=this;
            that.ex.time=180;
             var g=setInterval(function(){
                that.ex.time=parseInt(that.ex.time-1);
                if(that.ex.time==0){
                    clearInterval(g);
                    that.ex.time='重新发送';
                    that.ex.btnDsiabled=false;
                }
                that.$emit('childByValue',that.ex);
              //  console.log(that.time);
            },1000)
        }
    },
  // component:(getcode)
}
</script>
