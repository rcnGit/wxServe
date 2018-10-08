<template>
    <div class='getcode'></div>
</template>

<script>
import axios from 'axios'
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
        getCodeFn:function(type,ipNo){
            //手机号非空和数字校验
            var that=this;
            var reg = /^[0-9]{11}$/;
            if(ipNo.length==0){
                that.warn='请输入手机号';
                that.$emit('warnCodeFunction', that.warn);
            }else if(ipNo.length<11||!reg.test(ipNo)){
                that.warn='请输入正确的手机号';
                that.$emit('warnCodeFunction', that.warn);
            }else{
                that.$emit('warnCodeFunction', '');
                that.subTime()
            }

            return;
            //ajax提交
            var that=this;
            that.param={
                mobileNo:ipNo,
                messType:type
            }
             axios({
                method:'get',
                url:'/wei/wxservice/wxexternal?opName=send_mobile_message',
                params: {
                param:that.param,//系统类别
                }
             })
            .then(function(res) {//成功之后
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode!=0){
                    alert(retMsg);
                }
                that.subTime(); 
                console.log(res.data)
            });
        },//fn,
        subTime:function(){
            var that=this;
            that.ex.btnDsiabled=true;
            that.ex.time=180;
            var g=setInterval(function(){
                that.ex.time=parseInt(that.ex.time-1);
                if(that.ex.time==0){
                    clearInterval(g);
                    that.ex.time='重新发送';
                   that.ex.btnDsiabled=false;
                }
                that.$emit('childByValue', that.ex);
              //  console.log(that.time);
            },1000)
        }
    },
  // component:(getcode)
}
</script>
