<template>
    <div class="appoSuccess">
        <div class="yuesuccess" >
            <img src='./img/yuesuccess.png' class='yuesucc_img'/>
            <p class='yue_p1'>点亮成功</p>
            <p class='yue_p2'>财富师{{userName}}感谢您的点亮</p>
        </div>
        <div class="yueCode" >
            <div class="Review" >
                <p class='yueCode_p1'>扫码指定专属财富师，TA将为您奉上全年资产配置报告</p>
                <img :src='yuecodeImg' class='yueCode_img'/>
                <p class='yueCode_text'>长按扫码并关注服务号</p>
            </div>
        </div>

    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import axios from 'axios';
export default {
    name:'appoSuccess',
    component:{Button,MessageBox,Toast,Indicator},
        data:function(){
        return{
            userName:'',
            loadObj:{
                text: '加载中...',
                spinnerType:'triple-bounce'
            },
            yuecodeImg:'',
            mobile:''
        }
    },
    created(){
        this.userName = decodeURIComponent(this.$route.query.userName)
        this.userId = this.$route.query.userId
        this.getErweima()
    },
    methods: {
        getErweima:function(){
            var that=this;
             Indicator.open();
            // alert(that.userId+','+that.userName+','+that.$route.query.mobile)
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=cSignSQRCode',//获取临时二维码接口
                params: {
                    param:{
                       // actId:that.actId,
                        sign:'2',//指定财富师关注
                    // ghT:that.userName+'（工号'+that.ghT+'）'+that.mobile,
                        ghT:that.userId+','+that.userName+','+that.$route.query.mobile+',2,2',
                    }
                }
            })
            .then(function(res) {
                 Indicator.close();
                 console.log(res)
                var retCode=res.data.retCode;
                if(retCode==0){
                    //获取二维码成功
                    var url=res.data.url;
                    //that.popupVisible=true;//出现弹框
                    that.yuecodeImg=url;
                }else{
                   
                }
            })//
        },
    },    
    mounted:function(){
        $('.appoSuccess').css({"min-height":document.body.scrollHeight})
    },

}
</script>
<style>
.appoSuccess{
    background: #F9F9F9;
}
.yuesuccess{
    border-bottom: .266667rem solid #F9F9F9;
    border-top: .266667rem solid #F9F9F9;
    background: #fff;
}
.yuesucc_img{
    width: 2.493333rem;
    margin-top: 1.333333rem;
    margin-bottom: 30px;

}
.yue_p1{
    font-size: .426667rem;
    color:#363636;
    line-height: .586667rem;
    margin-bottom: .52rem;
}
.yue_p2{
    font-size: .346667rem;
    color:#999;
    line-height: .48rem;
    margin-bottom: .77rem;
}
.yueCode_p1{
    color: #636363;
    font-size: .373333rem;
    padding-top: 1.093333rem;
}
.yueCode{
    height: 7.84rem;
    background: url(./img/yuesuccbg.png) no-repeat;
    background-size: 10rem 7.84rem;
}
.yueCode_img{
    width: 3.5rem;
    height: 3.5rem;
    /* border: .026667rem solid #FFB8B8; */
    margin-top: .7rem;
}
.yueCode_text{
    font-size: .346667rem;
    color:#999;
    line-height: .48rem;
    padding-top: .72rem;
}
</style>
    
    