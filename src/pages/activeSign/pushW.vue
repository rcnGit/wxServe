<template>
    <div class='pushW'>
        <img src='./img/signSuc.png' width='28%'/>
        <p style="font-size:15px;margin-bottom:20px;font-weight:700;">您的参与意愿已推送给您的财富师</p> 
        <p>该活动需要您的财富师为您申请参与资格。我们已将您的</p>
        <p>推送给您的财富师<span>{{Wname}}</span><span style='color:#4a90e2;'>联系我的财富师>></span></p>
        <div>
            <mt-button type="danger" size="large" class='sure'>确定</mt-button>
            <mt-button type="danger" size="large" class='inMinAct'>进入我的活动</mt-button>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
export default {
    name:'pushW',
    data:function(){
        return{
            Wname:'王志伟'
        }
    }
}
</script>
<style>
@import 'toSign.css'; /* 引入toSign.css文件*/
.pushW img{
    margin:130px auto 40px;
}
.pushW p{
    font-size: 13px;
    color:rgb(53,53,53);
    margin-bottom:10px;
}
.inMinAct{
    color:#df1e1d!important;
    border:1px solid #df1e1d!important;
    background:#fff!important;
    margin-top:30px;
}
</style>


