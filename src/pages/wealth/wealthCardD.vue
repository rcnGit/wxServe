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
        
    </div>
</template>
<script>
import axios from 'axios';
import { MessageBox } from 'mint-ui';//提示框
import { Indicator } from 'mint-ui';
export default {
    name:'wealthCardD',
    data:function(){
        return{
            wname:'***',
            gh:'***',
        }
    },
    methods:{
        zixun:function(){
            window.location.href='tel:400-819-9868';
        }
    },
    mounted:function(){
         axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/checkApplyWealther',//
                params: {
                
                }
            })
            .then(function(res){
                var retCode=res.data.retCode;
                if(retCode!='-1'){//获取财富师信息  
                   this.$refs.picT=res.data.data.photo;
                   that.wname=res.data.data.dtName;
                   that.gh=res.data.data.dtNo;
                }else{//系统异常
                     MessageBox('提示', '系统异常');
                }
            })
    },
    components:{MessageBox,Indicator}
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
</style>


