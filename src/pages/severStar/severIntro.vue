<template>
    <div class='wealthCardD' >
        <div>
            <p>
                vewijhrnvoqermdk
            </p>
        </div>
        <shareCard></shareCard>
        <!-- <div class="scroll-wrapper" style="min-height: 17.5rem">
        <iframe :src="wealthSrc" style="min-height: 17rem;" frameborder="0"  id="iframe1"></iframe>
        </div> -->
        <div class="btn_bottom" style="display: block;">
			<span class="saveImg buttons" @click='check'>查看我的服务之星</span>
        </div>
        
    </div>
</template>
<script>
import wx from 'weixin-js-sdk';
let Base64 = require('js-base64').Base64;
import axios from 'axios';
import { MessageBox } from 'mint-ui';//提示框
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Popup } from 'mint-ui';//底部出来的弹框
import merge from 'webpack-merge'
import shareCard from '@/pages/severStar/shareCard'//财富师名片
export default {
    name:'severIntro',
    data:function(){
        return{
            wealthSrc:'',
            paramurl: location.href.split('?')[0],
            subscribe:'',
            businessName:'',
            ghT:'',
            mobile:'',
            backUrl: location.href.split('?')[0],
            userId:'',
            source:'',
            shareLink:'',
            belongBusiness:'',
            btnContent:''
        }
    },
    methods:{
        getData:function(){
            Indicator.open();
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取用户信息
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                 Indicator.close();
                 var retCode=res.data.retCode;
                 var Data = res.data
                 console.log(Data)
                if(retCode=='0'){
                    if(!res.data.userInfo.belongBusiness == false){
                       // that.belongBusiness = res.data.userInfo.belongBusiness
                       that.$router.push({   //服务之星页
                            path:'/severStar',
                            name:'severStar',
                            query:{
                                userId:res.data.userInfo.belongBusiness
                            }
                        })
                    }else{
                        //财富师指定页
                        that.$router.push({
                            path:'/wchoose',
                            name:'wchoose',
                        })
                    }
                }else if(retCode=='-1'){//系统异常
                    //MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severIntro_'+that.$route.query.source+'#wechat_redirect';
                }
            })
        },
        getData_app:function(){
            Indicator.open();
            let that = this;
            var param=Base64.encode('{"userId":"'+that.$route.query.userId+'"}');//that.user.userId
            axios({
                method:'get',
                url:'/tgweb/app/ctp/CallApiServlet?api=query_user_info',//糖罐
                params:{
                    param:param,
                    osFlag:'3'
                }
            })
            .then(function(res){
                 Indicator.close();
                 var data=Base64.decode(res.data);
                 data=jQuery.parseJSON(data);
                 console.log(data)
                if(!data.belongChannel == false){
                    that.$router.push({   //服务之星页
                        path:'/severStar',
                        name:'severStar',
                        query:{
                            idCardNo:data.idCardNo,
                            userId:data.belongChannel
                        }
                    })
                }else{
                    //财富师指定页与app
                   that.assignWealth()
                }
            })
        },
        check:function(){
            if(this.source=='wx'){
                this.getData() //微信
            }else{
                this.getData_app()  //糖罐
            }
        },
        assignWealth:function() {
            let ua = navigator.userAgent.toLowerCase();
            //android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
            if(false) {//isWeixinBrowser()//判断是不是微信
                
            }else{
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    //ios
                    var assignWealth_str='';
                    window.webkit.messageHandlers.AppModel.postMessage({body: 'objc:///assignWealth:'+str});
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    //android
                    var assignWealth_str='';
                    window.AndroidFunction.assignWealth(str);
                }
            }
        },
    },
    mounted:function(){
        this.GasyncSDKConifg('wx')
        if(!this.$route.query.actId==false){ //重定向后 
            var wxstr = this.$route.query.actId;
            this.source = wxstr
            this.getData() //微信
        }else{
            this.source = wxstr=this.$route.query.source
        }
    },
    components:{MessageBox,Indicator}
}
</script>
<style>
.btn_bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.8rem;
    box-sizing: border-box;
    background: #fff;
    padding-top: 0.1rem;
}
.buttons {
    display: inline-block;
    width: 8.213333rem;
    height: 1.626667rem;
    background: url(img/btn@2x.png) no-repeat;
    background-size: 8.213333rem 1.626667rem;
    color: #ffffff;
    text-align: center;
    line-height: 1.626rem;
    font-weight: 500;
    font-size: .4rem;
    padding-top: .04rem;
}
.xiazai{
    color:#4a90e2;
 }
</style>


