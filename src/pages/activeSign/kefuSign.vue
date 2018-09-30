<template>
    <div id='kefuSign'>
        <div class='content'>
            <div class='tip'>
                <span>联系电话录入后将做加密处理，保证您的信息安全</span>
              <!-- <img src='./img/left_img@2x.png' class='left_img'/>   -->
            </div>
            <div class='inpBox'>
                <input type='text' class=''/>
                <span>联系人姓名</span>
                 <!-- <img src='./img/card_img@2x.png' class='clear' style='right:33%;'/>  -->
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''style='padding-right:100px;'/>
                <span>联系人电话</span>
                <mt-button type="danger" size="small" class='sendCodeBtn'>发送验证码</mt-button>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->
             <div class='inpBox'>
                <input type='text' class=''/>
                <span>验证码</span>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
              </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''/>
                <span>财富师</span>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
              </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''/>
                <span>财富师工号</span>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
              </div> <!--inpBox-->
             
             <mt-button type="danger" size="large" class='sign'>下一步</mt-button>
             <p style='font-size:12px;color:rgb(153,153,153);line-height:40px;'>此页面仅供个人客户自行报名，机构客户可联系您的专属财富师为您服务</p>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
export default {
    name:'kefuSign',
    data:function(){
        return{
            param:{
                bizId:''
            }
        }
    },
    methods:{
        getDescribe:function(id){//拼接跳转链接
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
    methods:{
        getResult:function(){
            axios({
                method:'get',
                url:'/ning/wxservice/wxMemberInfo/getFaceToken', 
                params: param
            })
            .then(function(res) {
                console.log(res.data)
            })
        }
    },
    components:{Button},//使用mint-ui的button的组件
    created:function(){
         var bizId=localStorage.getItem('bizId');
         this.param.bizId=bizId;
       this.getResult();
    }

}
</script>
<style>
 @import 'toSign.css'; /* 引入toSign.css文件*/
 #kefuSign{
     padding-top:15px;
 }
 .sendCodeBtn{
     position:absolute;
     right:10px;
     top:8.5px;
     width:28%!important;
     margin-top:0;
     font-size: 13px!important;
 }
 .left_img{
     width:20px;
     float: left;
     margin-right:5px;
 }
 .sign{
     width:90%;
 }

</style>
