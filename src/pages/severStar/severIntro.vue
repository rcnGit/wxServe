<template>
    <div class='severIntro' >
        <div class='serIntroTop'>
            <div class='serIntroTopTxt'>
                <div class='intrTop_head'><img src='./img/l.png' class='img1'/><span>选出服务之星</span><img src='./img/w.png' class='img2'/><span>还有<i>惊喜相送</i></span><img src='./img/r.png' class='img3'/></div>
                <div class='intrTop_tit'>
                    活动介绍
                </div>
                <div class='intrTop_text'>
                    大唐财富服务之星评选开始啦！为更好的服务客户，提升大唐财富品牌胜任力，特此隆重推出服务之星评选活动，为你的财富师评分。排名靠前的财富师将有机会获得个人专刊宣传，与此同时转介绍成功的客户和新客均可获得精心准备的奖励。
                </div>
                <div class='intrTop_final'>服务之星荣誉之战，为你的财富师站台！</div>
            </div>
        </div>
    
        <div class='serIntroCenter'>
            <div class='serIntroCenterTxt1'>
                <div class='intrTop_tit' style='margin-bottom: .053333rem;'>
                    活动时间
                </div>
                <p class='E45 pp1'>活动评选时间</p>
                <p class='C333 pp2'>2019.4.1-2019.4.5</p>
                <p class='E45 pp1'>活动结果公布及奖项发放时间</p>
                <p class='C333 pp2'>2019.4.1-2019.4.5</p>
           </div>  <!-- serIntroCenterTxt1 -->
           <div class='serIntroCenterTxt1 serIntroCenterTxt2'>
                <div class='intrTop_tit' style='width:4rem;'>
                    活动参与人要求
                </div>
                <p class='E45 pp1'>可进行转介绍的老用户</p>
                <p class='C333 pp2'>所有线上指定服务财富师的用户</p>
                <p class='E45 pp1'>新用户</p>
                <p class='C333 pp2'>未注册用户</p>
           </div>  <!-- serIntroCenterTxt2 -->
           <div class='serIntroCenterTxt3'>
                <div class='intrTop_tit' style=''>
                    活动奖励
                </div>
                <div style='padding: 0 .6rem;'>
                    <p class='samTit'>财富师奖励</p>
                    <p class='be1'>1.综合实力奖</p>
                    <div style='margin-top: .466667rem'>
                        <img src='./img/str1.png' style='width:3.2rem'/>
                        <img src='./img/str2.png' style='width:2.45rem;margin-left: .853333rem;'/>
                    </div>
                    <p class='be1'>2.单项奖</p>
                    <img src='./img/cup.png' style='width:100%; margin-top:.5333rem;'/>
                    <div style='height: 1.08rem;background:rgba(255,249,237,1);border-radius:10px;margin-top:0.695rem; color:#A26C02;font-size:0.32rem;padding:0.213rem;text-align:left;'>
                        <img src='./img/tel.png' style='width:0.333rem;margin-right:0.2rem;display:block;float:left;'/><span style='float:right;display:block;width: 92%;line-height: 0.4rem;'>其他参与人奖励详询您的专属财富师或客服：<br/>400-819-9868</span>
                    </div>
                </div>
                
           </div>  <!-- serIntroCenterTxt3 -->
            <div class="btn_bottom" style="display:block;">
                <span class="saveImg buttons" @click='check'>查看我的服务之星</span>
                 <p style="font-size:.32rem;font-family:PingFang-SC-Regular;font-weight:400;color:rgba(122,122,122,1);margin-top:1rem;">*服务之星活动规则最终解释权归大唐财富-客服中心所有</p>
            </div>
           
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
                    return;
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
        //this.GasyncSDKConifg('wx')
        // if(!this.$route.query.actId==false){ //重定向后 
        //     var wxstr = this.$route.query.actId;
        //     this.source = wxstr
        //     this.getData() //微信
        // }else{
        //     this.source = wxstr=this.$route.query.source
        // }
    },
    components:{MessageBox,Indicator}
}
</script>
<style>
.E45{
    color:#E45349;
}
.C333{
    color:#333;
}
.serIntroTop{
    width:100%;
    min-height:18rem;
    background:url(img/intrBg.png) no-repeat;
    background-position: center;
    background-size: 100%;
    position: relative;
}
.serIntroTopTxt{
    position: absolute;
    width: 92%;
    height: 44.5%;
    /* border: 1px solid darkorange; */
    top: 53%;
    left: 4%;
}
.intrTop_head .img1,.intrTop_head .img3{
    width: .773333rem;
}
.intrTop_head .img1{
    margin-right: .4rem;
}
.intrTop_head .img3{
    margin-left: .4rem;
}
.intrTop_head .img2{
    width: .213333rem;
    margin: 0 .253333rem;
}
.intrTop_head{
    font-size: .373333rem;
    color:#333;
    margin-top: .48rem;
    font-family:PingFang-SC-Medium;
}
.intrTop_head i{
    font-style: normal;
    color: #E45349;
}
.intrTop_tit{
    width:2.693333rem;
    height:.666667rem;
    background: #E45349;
    border-radius:0px .333333rem .333333rem 0px;
    font-size: .426667rem;
    color:#fff;
    line-height:.67rem;
    margin-top: .666667rem; 
    padding-left: 0.3rem;
}
.intrTop_text{
    font-size: .386667rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height: .64rem;
    text-align: left;
    text-indent: 2em;
    padding: 0 .6rem;
    margin-top: .573333rem;
}
.intrTop_final{
    font-size:.386667rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(228,83,73,1);
    line-height:.386667rem;
    padding: 0 .6rem;
    margin-top: .493333rem;
}
.serIntroCenter{
     width:100%;
    min-height:28.6rem;
    background:url(img/intrBg2.png) no-repeat;
    background-position: center;
    background-size: 100%;
    position: relative;
}
.serIntroCenterTxt1{
    position: absolute;
    width: 92%;
    height: 18%;
    /* border: 1px solid darkorange; */
    top: 0%;
    left: 4%;
}
.serIntroCenterTxt2{
    /* border: 1px solid darkorange;  */
    top: 19.8%;

}
.serIntroCenterTxt3{
    position: absolute;
    width: 92%;
    height:47%;
    /* border: 1px solid darkorange; */
    top: 39.8%;
    left: 4%;
}
.serIntroCenterTxt1 .pp1{
    font-size: .4rem;
    font-family:PingFang-SC-Medium;
    font-weight:bold;
    margin-top: .533333rem;
    text-align: left;
    padding: 0 .6rem;
}
.serIntroCenterTxt1 .pp2{
    font-size: .4rem;
    font-family:PingFang-SC-Medium;
    margin-top: .306667rem;
    text-align: left;
    padding: 0 .6rem;
}
.samTit{
    font-size: .426667rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(228,83,73,1);
    border-left: .1rem solid #E45349;
    text-align: left;
    padding-left: 0.3rem;
    margin-top: .72rem;
}
.be1{
    font-size: .4rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top: .706667rem;
    text-align: left;
}


.btn_bottom{
     position: absolute; 
    top: 89%;
    left: 0;
    width: 100%;
    height: 1.8rem;
    box-sizing: border-box;
    padding: 0.1rem 0.6rem 0 0.6rem;
    box-sizing: border-box;
}
.buttons {
    display: inline-block;
    width: 100%;
    height: 1.04rem;
     background:linear-gradient(90deg,rgba(238,115,82,1) 0%,rgba(235,63,70,1) 100%); 
     box-shadow:0px 3px 18px 0px rgba(230,84,89,0.6);
     border-radius:.52rem;
     color: #ffffff;
    text-align: center;
    line-height: 1.04rem;
    font-weight: 500;
    font-size: .4rem;
    /* padding-top: .04rem; */
}
.xiazai{
    color:#4a90e2;
 }
</style>


