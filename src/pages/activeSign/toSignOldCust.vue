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
                <img src='./img/card_img@2x.png' class='clear'/>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''placeholder='请输入您的身份证'/>
                <span>身份证</span>
                <em>请输入正确的实名信息</em>
                <img src='./img/card_img@2x.png' class='clear'/>
             </div> <!--inpBox-->             
             <div style='clear:both'></div>
             <mt-button type="danger" size="large" class='next' @click="getDescribe('nnn')">报名</mt-button>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import axios from 'axios';
export default {
    name:'toSignOldCust',
   
    components:{Button,axios},//使用mint-ui的button的组件
    methods:{
        getDescribe:function(id){//跳转链接
        console.log(id)
            this.$router.push({
                path:'/signSuc',
                name:'signSuc',
                params:{
                 id : id
                }
              })
        }
    },
     mounted:function(){
        var that = this;
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
 .content{
     box-sizing: border-box;
     padding:0 15px;
     position: relative;
 }
 .inpBox{
    margin-bottom: 20px;
   
 }
 
 .inpBox input[type="text"]:disabled
 { 
    background-color: rgb(238,236,236);
    color:rgb(164,169,178);
 }

 .tip{
     text-align: left;
     margin-top:20px;   
     margin-bottom:20px;
     line-height: 18px; 
 }
 .tip span{
     border-left:3px solid #cf432e;
     padding-left:10px;
     color:rgb(57,66,09);
     font-size: 16px;
 }
 .next{
     width:90%;
    margin: 50px auto;
 }
</style>
