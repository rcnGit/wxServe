<template>
    <div id='toSignOldCust'>
        <div class='content'>
            <div class='tip'>
             <span>请输入您的实名信息</span>
            </div>
            <div class='inpBox'>
                <input type='text' class='' placeholder="请输入您的姓名"/>
                <span>姓名</span>
                <em>请输入正确的实名信息</em>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''placeholder='请输入您的身份证'/>
                <span>身份证</span>
                <em>请输入正确的实名信息</em>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->             
             <div style='clear:both'></div>
             <mt-button type="danger" size="large" class='next' @click="getDescribe()">下一步</mt-button>
        </div>
        
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包

import axios from 'axios';
export default {
    name:'toSignOldCust',
   data:function(){
       return{
           param:{
            idCardNo:'13042419920209204X',//身份证号
            idCardName:'任超楠',//身份证姓名

           },
           token:''
       }
   },
    components:{Button,axios},//使用mint-ui的button的组件
    methods:{
        //Cookie设置值
    writeCookie:function  (name, value, hours)
    {
        var expire = "";
        if (hours != null)
        {
            expire = new Date ((new Date ()).getTime () + hours * 3600000);
            expire = "; expires=" + expire.toGMTString ();
        }
        document.cookie = name + "=" + escape (value) + expire;
    },
        getDescribe:function(id){//拼接跳转链接
        var that=this;
          axios({
                method:'get',
                url:'/ning/wxservice/wxMemberInfo/getFaceToken',
                params:this.param
            })
            .then(function(res) {//成功之后
               console.log(res.data.data);
                that.token=res.data.data.token;
                var bizId=res.data.data.bizId;
                localStorage.setItem('bizId',bizId);
                var bizId=localStorage.getItem('bizId');
               // that.writeCookie ("bizId", bizId, 24);
                //alert(bizId);
                if(bizId!=''){
                    window.location.href='https://api.megvii.com/faceid/lite/do?token='+that.token;
                }
                
            });
        }
    },
     mounted:function(){
        var that = this;
        return;
        axios({
            method:'get',
            url:'/api/fundDataManage/fundInfo/BasicInfo/000020',
        })
            .then(function(res) {//成功之后
            console.log(res)
                //console.log(res.data.data);
               //that.dataSource =  that.dataSource.concat(res.data.data.advertisementList);
        });
    }
}

</script>
<style>
 @import 'toSign.css'; /* 引入toSign.css文件*/
 body{
     padding-top:15px;
     background: #fff;
 }
 
 .inpBox{
    margin-bottom: 20px;
   
 }
 
 .inpBox input[type="text"]:disabled
 { 
    background-color: rgb(238,236,236);
    color:rgb(164,169,178);
 }

 
 .next{
     width:90%;
    margin: 50px auto;
 }
</style>
