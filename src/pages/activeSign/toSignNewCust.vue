<template>
    <div id='toSignNewCust'>
        <div class='content'>
            <div class='tip'>
              <img src='./img/left_img@2x.png' class='left_img'/>  联系电话录入后将做加密处理，保证您的信息安全
            </div>
            <div class='inpBox'>
                <input type='text' class=''style='padding-right:100px;'/>
                <span>联系人电话</span>
                <mt-button type="danger" size="small" class='sendCodeBtn'>发送验证码</mt-button>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''/>
                <span>验证码</span>
             </div> <!--inpBox-->
             <div class='inpBox'>
                <input type='text' class=''/>
                <span>理财师</span>
              </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''/>
                <span>理财师工号</span>
              </div> <!--inpBox-->
             
             <mt-button type="danger" size="large" class='sign'>报名</mt-button>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
export default {
    name:'toSignNewCust',
    components:{Button}//使用mint-ui的button的组件
}
</script>
<style>
 @import 'toSign.css'; /* 引入toSign.css文件*/
 #toSignNewCust{
     padding-top:15px;
 }
 .content{
     box-sizing: border-box;
     padding:0 15px;
     border:1px solid #efefef;
     background: #fafafa;
     box-shadow: #eeeeee 0px 0px 0px 1px;
     position: relative;
 }
 .inpBox{
    margin-bottom: 20px;
   
 }
 .inpBox input{
     border:1px solid #efefef;
     border-radius: 4px;
     background:#fff;
     padding-left:30%;
    box-sizing: border-box;
    color:rgb(10,20,50);
    font-size:15px;
 }
 .inpBox input[type="text"]:disabled
 { 
    background-color: rgb(238,236,236);
    color:rgb(164,169,178);
 }
 .inpBox span{
     position:absolute;
     left:0;
     top:0;
     height:50px;
     line-height: 50px;
     width:30%;
     color:rgb(164,169,178);
     font-size: 15px;
     text-align:left;
     padding-left: 10px;
 }
 .sendCodeBtn{
     position:absolute;
     right:10px;
     top:8.5px;
 }
 .left_img{
     width:20px;
     float: left;
     margin-right:5px;
 }
 .tip{
     color:rgb(93,102,102);
     font-size: 13px;
     text-align: left;
     margin-top:20px;
     margin-bottom:20px;
     line-height: 18px;
    
 }
 .sign{
     width:90%;
     position: absolute;
     bottom: 20px;
     left:5%;
 }
</style>
