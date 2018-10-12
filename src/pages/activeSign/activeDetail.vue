<template>
    <div class='activeSign'>
         <div class='business_Card' ref="card" v-show="businesscardShow">
            <div class='bus_L'><img :src="headImgUrl"/></div>
            <div class='bus_C'>
                <p class='position_name'>{{businessName}}</p>
                <p class='Invitation'>邀您参加大唐财富尊享活动</p>
            </div>
            <div class='bus_R' @click="toBusiness()"><img src='./img/rightBtn_img@2x.png'/></div>
         </div>  <!--business_card-->
        <div class='addressBox'>
          <div class='ad_m'>
              <p class='ad_tit'>{{actName}}</p>
              <div class="ad_d">
                <img src='./img/date@2x.png' class="add_icon"/>
                <p class='ad_date'>{{beginTime}} — {{endTime}}</p>
              </div>
              <div class="ad_d">
                <img src='./img/address@2x.png' class="date_icon"/>
                <p class='ad_address'>{{location}}</p>
              </div>
          </div>
        </div>
        <div class='actDe'>
            <div class='nodata' ref='nodata' v-if="contentShow">
                 <img src='./img/nodataImg@2x.png'/>
                 <p>暂无活动介绍</p>
            </div>
           <div v-else>{{content}}</div>
        </div>
         <mt-button type="danger" size="large" class='toSign' @click='sign()' v-show='isShow' :disabled="isDisabled">{{actStatus}}</mt-button>

    </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import axios from 'axios'
export default {
    name:'ActiveDetail',
    data:function (){
        return{
            actName:'',
            beginTime:'',
            endTime:'',
            location:'',
            content:'',
            isReviewSignup:'',
            activityType: '',
            authenticFlag: '',
            actStatus:'',
            isShow: true,//按钮是否显示
            isDisabled: false,
            businesscardShow: false,
            realname:'',
            userphone:'',
            businessName: '',
            belongBusiness:'',
            headImgUrl: '',
            contentShow:true,
            param:{
                activeId:'',
                actName:'',
                pageNo:1
            },
            loadObj:{
                text: '加载中...',
                spinnerType:'triple-bounce'
            },
            backUrl: encodeURIComponent(location.href.split('#')[0])
        }
       
    },
    methods:{
           getData:function(){
                let that = this;
                console.log(that.param)
                axios({
                    method:'get',
                    url:'/wei/wxservice/wxservice?opName=getactiveinfo',//调取活动列表和详情的接口
                    params: {
                        param:that.param,//系统类别
                    }
                })
                .then(function(res) {//成功之后
                    console.log(res)
                    Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode!=0){
                        MessageBox('提示', '系统错误');
                    }else if(retCode == 0){
                        if(res.data.itemList.length<=0){
                       // that.$refs.nodata.style.display='block';
                        that.contentShow = true
                        }else{
                            that.contentShow = false
                            that.activityType = res.data.itemList[0].activityType;
                            that.isReviewSignup = res.data.itemList[0].isReviewSignup;
                            var obj=res.data.itemList[0];
                            that.actName=obj.actName;
                            that.beginTime=obj.beginTime;
                            that.endTime=obj.endTime;
                            that.location=obj.location;
                            that.content=obj.content;
                            if(res.data.canSignUp == '0'){
                                that.actStatus= '我要报名';
                            }else if(res.data.canSignUp == '1'){
                                that.actStatus= '已报名';
                                that.isDisabled = true;
                            }else{
                                that.isShow = false
                            }
                            
                        }
                       
                    }
                    
                });
            },
            authentic:function(){
                let that = this;
                axios({
                    method:'get',
                    url:'/wei/wxservice/wxservice?opName=getUserInfo'//获取客户信息
                })
                .then(function(res) {//成功之后
                    Indicator.close();
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode!=0){
                        MessageBox('提示', retMsg);
                    }else if(retCode == 0){
                        console.log(res.data);
                        that.authenticFlag = res.data.userInfo.authenticFlag
                        that.headImgUrl = res.data.userInfo.headImgUrl
                        that.userphone = res.data.userInfo.userphone
                        that.realname = res.data.userInfo.realname
                        if(res.data.userInfo.businessName != null){
                            that.businessName = '财富师'+res.data.userInfo.businessName
                            that.businesscardShow = true
                            that.belongBusiness = res.data.userInfo.belongBusiness
                        }else{
                            that.businessName = res.data.userInfo.nickname
                            that.businesscardShow = false
                        }
                        
                    }
                });
            },
            sign:function(){ 
                if(this.activityType == 'YX'){
                    console.log(this.actName)
                    if(!this.realname && !this.userphone && !this.businessName){
                        this.$router.push({
                            path: '/toSignNewCust',
                            name: 'toSignNewCust',
                            params:{
                                isReviewSignup: this.isReviewSignup,
                                activityType: this.activityType,
                                activeId: this.param.activeId,
                                actName: this.actName
                            }
                        })
                    }else{
                        var message = '您确定报名此活动？'
                        MessageBox.confirm('', {
                            message: message,
                            title: '',
                        }).then(action => {
                            if(action == 'confirm'){
                                this.$router.push({
                                    path: '/signSuc',
                                    name: 'signSuc',
                                    params:{
                                        isReviewSignup: this.isReviewSignup,
                                        activeId: this.param.activeId
                                    }
                                })
                            }
                        }).catch(() => {
                            //console.log(2);
                        })
                    }  
                }else if(this.activityType == 'KF'){
                    this.authentic()
                    if(this.authenticFlag == 0){
                        this.$router.push({
                            path: '/faceMsg',
                            name: 'faceMsg',
                            params:{
                                returnUrl: 'http://172.16.6.124:8099/#/ActiveDetail'
                            }
                        })
                    }else{
                        this.$router.push({
                            path: '/kefuSign',
                            name: 'kefuSign',
                            params:{
                                isReviewSignup: this.isReviewSignup,
                                activityType: this.activityType,
                                activeId: this.param.activeId,
                                actName: this.actName
                            }
                        })
                    }
                    
                }
            },
            toBusiness:function(){
                window.location.href='https://test-interface.tdyhfund.com/tcapi/HTML5/html/shared_card.html?userId='+this.belongBusiness;
            },
            async asyncSDKConifg () {
            let that = this
            axios.get('/wei/wxservice/core/getJSSDKConfigure.mm?pageUrl=pageUrl',{params:{"url":this.backUrl}})
                .then(function (res) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature, // 必填，签名
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
                })
                wx.ready(function() { //通过ready接口处理成功验证
            // config信息验证成功后会执行ready方法
                wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
                    title: '大唐财富', // 分享标题
                    desc: '中国私人银行服务的领航者，诚邀您开启财富之旅', // 分享描述
                    link: 'http://172.16.6.124:8099/#/ActiveDetail?ifcard=1', // 分享链接
                    imgUrl: 'https://www.zhizhudj.com/weChat-public/spider-sign-up/static/lgoo.png?20180821', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        alert('成功');
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        alert('用户取消分享');
                    }
                    });
                    wx.onMenuShareTimeline({ //分享朋友圈
                    title: '大唐财富', // 分享标题
                    link: 'http://172.16.6.124:8099/#/ActiveDetail',
                    imgUrl: 'https://www.zhizhudj.com/weChat-public/spider-sign-up/static/lgoo.png?20180821', // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
                // end
            })
            wx.error(function(res){//通过error接口处理失败验证
                // config信息验证失败会执行error函数
            });
        }
    },
    created(){
        if(this.$route.query.ifcard == 1){
            this.businesscardShow = true
        }else{
            this.businesscardShow = false
        }
        this.asyncSDKConifg()//微信分享函数；
        this.authentic()//获取客户信息；
         var oaActId =this.$route.params.oaActId; 
         var actName =this.$route.params.actName; 
         var comefrom =this.$route.params.comefrom;
         let that = this; //这个是钩子函数mounted
         if(comefrom=='tangguan'){
             that.isShow=false;
         }else{

         }  
        Indicator.open(that.loadObj);
        var ifCard=this.$route.params.ifCard;
        // if(ifCard!=''&&ifCard!=undefined){
        //     console.log('ifCard==='+ifCard);
        //     if(ifCard){
        //         this.$refs.card.style.display='flex';
        //     }
        // }
        if(oaActId!=''&&oaActId!=undefined){
            that.param.activeId=oaActId;
            that.param.actName=actName;
            console.log(that.param.activeId);
            that.getData();
        }
    } 

}

 	   
</script>
<style>
 .business_Card{
    box-sizing: border-box;
    padding:0 20px;
    height:60px;
    display:flex;
    background-color:rgba(0,0,0,0.4);
}
.business_Card .bus_L{
    width:45px;
    height:100%;
    float: left;
}
.bus_L img{
    width:50px;
    margin-top:6px;
}
.business_Card .bus_C{
    height:100%;
     flex: 1; 
     box-sizing: border-box;
     padding: 14px 0 0px 15px;
} 
.business_Card .bus_R{
    width:20px;
    height:100%;
    float: right;
} 
.bus_R img{
    width:14px;
    margin-top:14px;
    float:right;
}
.position_name{
    font-size: 15px;
    color:#fff;
    margin-bottom:8px;
}
.Invitation{
    font-size: 13px;
    color:#fff;
}
.addressBox{
    width:100%;
    height:149px;
}
.ad_m{
    width:96%;
    margin:10px auto;
    height:100%;    
    padding: 0 20px 0px;
    padding-top:20px;
    text-align: left;
    background:url(./img/activeDbg@2x.png)no-repeat;
    background-size:cover;
}
.ad_tit{
    font-size: 18px;
    color:#000;
    margin-bottom:20px;
    line-height:23px;
     overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
}
.ad_date{
    font-size: 14px;
    color:rgb(100, 98, 98);
    margin-bottom:7px;
    float: left;
    line-height: 20px;
}
.ad_address{
    font-size: 14px;
    color:rgb(100, 98, 98);
    line-height:18px;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
    float: left;
    line-height: 20px;
}
.actDe{
    width:96%;
    height:370px;
    margin:10px auto;
    border:1px solid #efefef;
    padding: 10px;
}
.toSign{
    width:90%;
    margin:22px auto 0;
}
.nodata img{
    width:150px;
    margin:50px auto 0;
}
.nodata p{
    font-size: 16px;
    color:rgb(57,66,89);
}
.ad_d{
    overflow: hidden;
}
.add_icon{
    width:18px;
    height:18px;
    margin-right: 7px;
    float: left;
}
.date_icon{
    width:15px;
    height:18px;
    margin-right: 7px;
    float: left;
}
</style>

