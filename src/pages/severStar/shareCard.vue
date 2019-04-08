<template>
    <div class='shareCard' >
        <div>
            <p>
                vewijhrnvoqermdk
                {{mobile}}
            </p>
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
export default {
    name:'wealthCard',
    data:function(){
        return{
            showSeverbtn: true,
            wealthSrc:'',
            wname:'***',
            gh:'***',
            paramurl: location.href.split('?')[0],
            subscribe:'',
            businessName:'',
            ghT:'',
            mobile:'',
            popupVisible:false,//是否出现二维码的弹框
            erweima:'',
            backUrl: location.href.split('?')[0],
            userId:'',
            sourceModule:'',
            channel:'0', //1来自糖罐   2来自微信服务号
            mobile_switch:'',  // 0手机号开   1手机号关
            shareLink:'',
            name:'刘啊安啊',
            belongBusiness:'',
            btnContent:''
        }
    },
    methods:{
        zixun:function(){
            window.location.href='tel:400-819-9868';
        },
        getWealthname:function(){ 
            let that = this;
            Indicator.open();
            var param=Base64.encode('{"userId":"'+that.userId+'"}');//that.user.userId
            axios({
                method:'get',
                url:'/wxservice/wxexternal?opName=getTCmycard&versionNo=30',//获取客户信息
                params:{
                    param:param,
                    osFlag:'3'
                }
            })
            .then(function(res) {//成功之后
                
                console.log(res.data)
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode == 0){
                   // var data=Base64.decode(res.data);
                   // data=jQuery.parseJSON(data);
                    var data=res.data
                    that.ghT=data.userId;
                    that.businessName = data.userName; //对方财富师的名字
                     that.mobile = data.mobile
                     var shareTitle = '财富师'+that.businessName+'的名片'
                     var shareDesc = '我是大唐财富认证财富管理师'+that.businessName+'，竭诚为您服务！这是我的名片，请惠存，谢谢！'
                     var shareImg = data.photo
                   //  window.document.title = shareTitle
                    // that.Share()
                    // that.asyncSDKConifg(shareTitle,shareDesc,shareImg)
                     Indicator.close();
                }else if(retCode == "-2"){
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },
        getData:function(){
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取用户信息
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                // Indicator.close();
                 var retCode=res.data.retCode;
                 var Data = res.data
                 console.log(Data)
                if(retCode=='0'){
                    that.subscribe=Data.userInfo.subscribe;//是否关注
                    
                    if(!res.data.userInfo.belongBusiness == false){
                        that.userId = res.data.userInfo.belongBusiness
                        that.getWealthname()
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
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=severStar_'+that.userId+','+that.sourceModule+','+that.channel+'#wechat_redirect';
                }
            })
        }
    },
    mounted:function(){
        if(this.name.length<=2){
            var mtel = this.name.substr(0, 1) + '*' 
        }else{
            var mtel = this.name.substr(0, 1) + '*' + this.name.substr(this.name.length-1);
        }
        
       // alert(mtel)
        
       // Indicator.open();　
        
        if(!this.$route.query.actId==false){ //重定向后
            var wxstr = this.$route.query.actId;
           // var wxstr =decodeURIComponent(that.$route.query.actId); 
            this.userId=wxstr.split(",")[0];
            this.sourceModule=wxstr.split(",")[1];
            this.channel=wxstr.split(",")[2] || '0';
            this.wealthSrc = this.tgHost+'?userId='+this.userId+'&sourceModule='+this.sourceModule+'&channel='+this.channel
            
        }else{
            this.userId=this.$route.query.userId
            this.sourceModule = this.$route.query.sourceModule
            this.channel=this.$route.query.channel || '0'
           // this.wealthSrc = 'https://interface.tdyhfund.com/dthtml/HTML5/DTCFS/html/shared_card.html?userId='+this.$route.query.userId
             this.wealthSrc = this.tgHost+'?userId='+this.$route.query.userId+'&sourceModule='+this.$route.query.sourceModule+'&channel='+this.channel
           //  this.wealthSrc = 'https://test-interface.tdyhfund.com:8443/dthtml/HTML5/DTCFS/html/shared_card.html?userId='+this.$route.query.userId+'&sourceModule='+this.$route.query.sourceModule
        }
        this.getWealthname()
      //  this.getData()
        
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


