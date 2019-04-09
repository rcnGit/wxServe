<template>
    <div class="faceSuccess">
        <div class="" v-show="successShow">
            <img src='./img/yuesuccess.png' class='ztw'/>
            <div class="Review" >
                <p class='p1'>恭喜您，身份认证成功</p>
                
            </div>
        </div>
        <div class="" v-show="failShow">
            <!-- <img src='./img/facefail.png' class='ztw2'/> -->
            <div class="Review" >
                <p class='p1'>身份认证失败</p>
                <p class='fail_text'>人脸识别身份认证失败，请重试</p>
                <p class='fail_text'>若无法完成人脸识别可下载大唐财富APP</p>
                <p class='fail_text'>通过绑卡完成身份认证后报名活动</p>
            </div>
            <mt-button type="danger" size="large" class='sure' @click='tofacemsg()'>重新认证</mt-button>
            <mt-button type="danger" size="large" class='downapp' @click='todownApp()'>下载大唐财富APP</mt-button>
        </div>

    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { getCookie,setCookie } from '@/common/js/cookie.js'
import axios from 'axios';
export default {
    name:'appoSuccess',
    component:{Button,MessageBox,Toast,Indicator},
        data:function(){
        return{
            failShow: false,
            successShow: false,
            faceparam:{
                bizId: '',
                phone:''
            },
            loadObj:{
                text: '加载中...',
                spinnerType:'triple-bounce'
            }
        }
    },
    created(){
       // Indicator.open(this.loadObj);
       // this.getfaceId()
    },
    methods: {
        getfaceId:function(){
            this.faceparam.phone = this.$route.query.phone
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                Indicator.close();
                var retCode=res.data.retCode;
                // var returnUrl = that.$route.query.returnUrl;
                if(retCode == '0'){
                    that.trafficStatistics('019')
                    that.successShow = true
                    setTimeout(function(){
                        WeixinJSBridge.call('closeWindow');
                    },3000);
                    return;
                }else{
                    that.trafficStatistics('020')
                    that.failShow = true
                    // var message = '人脸识别身份认证失败，请重试。若无法完成人脸识别身份认证可'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">【下载大唐财富app】</a>'+'，通过绑卡完成身份认证后报名活动。'
                    // MessageBox('', message).then(action => {
                    //     if(action == 'confirm'){
                    //             //跳转财富师名片页面
                    //         that.$router.push({
                    //             path:'/faceMsg',
                    //             name:'faceMsg',
                    //             query:{
                    //             returnUrl:returnUrl,
                    //             }
                    //         })
                    //     }
                    // }).catch(() => {
                        
                    // })
                    return;
                }
            })
        },
        tofacemsg:function(){
            this.$router.push({
                path:'/faceMsg',
                name:'faceMsg',
                query:{
                    returnUrl:this.Host+'weixin-h5/index.html#/faceSuccess'
                }
            })
        },
        todownApp:function(){
            window.location.href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf"
        }
    }

}
</script>
<style>
.ztw{
    width: 2.793333rem;
    margin-top: 4.053333rem;
    margin-bottom: 30px;

}
.ztw2{
    width: 2.493333rem;
    margin-top: 2.53333rem;
    margin-bottom: .3333rem;

}
.p1{
    font-size: .4rem;
    color:#333;
    line-height: .586667rem;
    font-weight: 700;
    margin-bottom: .77rem;
}
.p2{
    font-size: 13px;
    color:rgb(53,55,57);
    line-height: 35px;
}
.fail_text{
    font-size: .346667rem;
    color: #707070;
    line-height: .64rem;
}
.p4{
    font-size: 13px;
    color:rgb(53,55,57);
    line-height: 22px;
    padding: 0 40px;
    text-align: left;
}
.progress{
    color: #08c;
}
.sure{
    width:90%;
    margin: 2.173333rem auto 0;
}
.downapp{
    margin-top: .493333rem;
    background: #fff!important;
    border: 1px solid #df1e1d!important;
    color: #df1e1d!important;
}
</style>
    
    