<template>
    <div class='wealthCardD'>
        <div class='bg'>
            <img src='./img/w.png' class='wImg' ref='picT'/>
                <div style='margin:24px auto 20px;'>
                    <img src='./img/lred.png'/> 
                    <span class='wname'> {{wname}}</span>
                    <img src='./img/rred.png' />
                    <p class='gh'>{{gh}}</p>
                 </div>
                  <p style='font-size:13px;color:rgb(99,99,99);margin: 20px auto 0;'>尽心尽力，提供您最贴心的服务，一同成长</p>
         </div>        
                
           
            <mt-button type="danger" size="large" class=''@click='zixun()' style='width:50%!important;margin-top:50px!important;'>电话咨询</mt-button>
            <comfooter></comfooter>
    </div>
</template>
<script>
import axios from 'axios';
import { MessageBox } from 'mint-ui';//提示框
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import comfooter from '../../components/footer'
export default {
    name:'wealthCardD',
    data:function(){
        return{
            wname:'***',
            gh:'***',
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/checkApplyWealther'),//接口
            paramurl: location.href.split('?')[0]
        }
    },
    methods:{
        zixun:function(){
            window.location.href='tel:400-819-9868';
        }
    },
    mounted:function(){
        this.GasyncSDKConifg()
        var that=this;
         axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/checkApplyWealther',//申请财富师之前校验财富师
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode =='0'){//获取财富师信息  
                   that.$refs.picT=res.data.data.photo;
                   that.wname=res.data.data.dtName;
                   that.gh=res.data.data.dtNo;
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxMemberInfo/checkApplyWealther'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=wealthCardD#wechat_redirect';
                }else{//系统异常
                    // MessageBox('提示', retMsg);
                     Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                }
            })
    },
    components:{MessageBox,Indicator,comfooter}
}
</script>
<style>
html{
     /* background:#fff;  */
}
.wealthCardD{
     background:#fff; 
     padding-bottom:30px;
}
.bg{
      background:url(./img/bg_new@2x.png)no-repeat;
      padding-bottom:20px;
}
.wImg{
    width:28%;
    padding-top:50px;
}
.wname{
    font-size: 16px;
    color:rgb(59,59,59);
    margin:0 28px;
}
.gh{
    margin-top:20px;
     font-size: 14px;
    color:rgb(59,59,59);
}
/* .comfooter{
     position: fixed;
     bottom: 0;
 } */
</style>


