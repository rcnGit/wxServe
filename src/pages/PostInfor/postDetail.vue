<template>
    <div class='postDetail'>
        <div class='content_s' style='padding-left:0!important;padding-right:0!important;padding-top:0!important;'>
            <div ref='hasData'>
                <!-- <div v-for='item in items'>
                    <div class='postOne' v-bind:fileUrl='item.fileurl' @click.stop='open'>
                        <p class='title'>{{item.filename}}</p>
                        <p><span class='text'>{{item.prodName}}</span><span class='date'>{{time(item.publishtime)}}</span></p>
                        <div style='clear:both;'></div>
                    </div>   
                    <div style='width:100%;height:10px;background:#f2f2f2;'></div>
                </div> -->
                <p class="post_title">{{newstitle}}</p>
                <p style="overflow:hidden;padding: .2rem .4rem .3rem;"><span class='post_text'>{{opinfotype}}</span><span class='post_date'>{{time(publishtime)}}</span></p>
                <div class="prodect_list" v-show="showProdectlist">
                    <p class="post_title2" v-for='item in proNameList'>{{item.proName}}；</p>
                </div>
                <div class="lines"></div>
                <p class="acc_tit" v-show="showAttitle">信息附件</p>
                <div class="attachment" v-for='item in fileList'>
                    <div v-bind:fileUrl='item.fileurl' @click.stop='open'>
                        <!-- <img src='./img/attach@2x.png' class="att_icon"/> -->
                        <p class='att_name' >{{item.filename}}</p>
                    </div>
                </div>
                <div class="lines2" v-show="showAttitle"></div>
                <div class="att_text">
                    <!-- <p class="att_p1">敬的投资者：</p> -->
                    <p v-html="newscontent"></p>
                    <!-- <p class="att_p2">唐盈元一综合股权投资母基金2号的投资主体——唐盈元曦（宁波）股权投资管理合伙企业（有限合伙）已于2018年6月20日备案成功，投资者打款无需等待，即可实现对外投资。附件是唐盈元一综合股权投资母基金2号的架构图和投资主体唐盈元曦（宁波）股权投资管理合伙企业（有限合伙）的备案函，请知悉。</p> -->
                </div>
                
            </div>
            <div class='noData' ref='nodata' style='display:none;min-height:300px;text-align: center;'>
                    <img src='./img/nomsg.png' style="width: 2.24rem;margin: 2.5rem auto 0;"/>
                    <p class='fSize16'>暂无投后消息</p>
            </div>
            <div class='wz'ref='wz' style="background:#fff;display:none;min-height:300px;text-align: center;" >
                <img src='../../common/img/wr.png'  style='width:27%;margin:2.8rem auto 0.5rem;'/>
                <p class='fSize16' style='color:#333'>身份认证后可查看信息披露详情哦~</p>
            <mt-button type="danger" size="large" class='next' @click='rz()' style='margin-top:1.4rem;'>去人脸识别身份认证</mt-button>
            </div>
        </div>
        <!-- <div class="comfooter_a"><comfooter></comfooter></div> -->
    </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//  框
import { Toast } from 'mint-ui';
import axios from 'axios'
import comfooter from '../../components/footer'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import merge from 'webpack-merge'
export default {
    name:'postDetail',
    data:function(){
        return{
            id:'',
            items:[],
            newstitle:'',
            newscontent:'',
            publishtime:'',
            opinfotype:'',
            fileList: [],
            proNameList: [],
            showAttitle: true,
            showProdectlist:true,
            param:{
                newsId:''  //标题id
            },
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone: ''
            },
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=queryPublishInfo'),//接口
            backUrl: encodeURIComponent(location.href.split('#')[0]),//微信分享
        }
    },
    components:{MessageBox,comfooter},
    methods:{
        time:function(t){
            t=t.substr(0,10);
            return t;
        },
        rz:function(){//去身份认证
            this.$router.push({
                    path:'/faceMsg',
                    name:'faceMsg',
                    query:{
                        returnUrl:this.Host+'weixin-h5/index.html#/postDetail?id='+this.param.newsId
                    }
                })
        },
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
                console.log(res.data);
                var retCode=res.data.retCode;
                //var returnUrl = that.$route.query.returnUrl;
                var returnUrl = that.Host+'weixin-h5/index.html#/postDetail?id='+that.param.newsId
                //修改原有参数        
                that.$router.push({
                    query:merge(that.$route.query,{'faceResult':''})
                })
                if(retCode == '0'){
                    that.trafficStatistics('019')
                   // MessageBox('  ','人脸识别成功');
                    Toast({
                        message: '人脸识别成功',
                        position: 'center',
                        duration: 3000
                    });
                    that.getList();//获取数据
                    return;
                }else if(retCode == '-2'){
                    that.trafficStatistics('017')
                    that.trafficStatistics('020')
                    MessageBox('  ','该身份证已绑定其他手机号');
                    that.$refs.wz.style.display='block';
                    return;
                }else if(retCode == '-1'){
                    that.trafficStatistics('020')
                    //MessageBox('  ','系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                    that.$refs.wz.style.display='block';
                    return;
                }else{
                    that.trafficStatistics('020')
                    //if(!that.$route.query.idNo == false){
                        var message = '人脸识别身份认证失败，请重试。'
                        MessageBox.confirm('', {
                            message: message,
                            title: '',
                            confirmButtonText:'重新识别',
                            cancelButtonText:'取消'
                        }).then(action => {
                            if(action == 'confirm'){
                                var idCardNo=that.$route.query.idNo
                                var idCardName=decodeURIComponent(that.$route.query.name)
                                var type = that.$route.query.tp
                                var canshu=returnUrl+'&phone='+that.$route.query.phone+'&idNo='+idCardNo+'&name='+encodeURIComponent(that.$route.query.name)+'&tp='+type 
                                that.getface(idCardNo,idCardName,canshu,type) 
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                
                            }
                        })

                    // }else{
                    //     var message = '人脸识别身份认证失败，请重试。若无法完成人脸识别身份认证可'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">【下载大唐财富app】</a>'+'，通过绑卡完成身份认证后查看。'
                    //     MessageBox.confirm('', {
                    //         message: message,
                    //         title: '',
                    //         showConfirmButton:true,
                    //         confirmButtonClass:'confirmButton',
                    //         confirmButtonText:'重试',
                    //     }).then(action => {
                    //         if(action == 'confirm'){
                    //                 //跳转财富师名片页面
                    //             that.$router.push({
                    //                 path:'/faceMsg',
                    //                 name:'faceMsg',
                    //                 query:{
                    //                 returnUrl:returnUrl,
                    //                 }
                    //             })
                    //         }else{
                    //             //跳转财富师名片页面
                    //             that.$router.push({
                    //                 path:'/faceMsg',
                    //                 name:'faceMsg',
                    //                 query:{
                    //                 returnUrl:returnUrl,
                    //                 }
                    //             })
                    //         }
                    //     }).catch(() => {
                            
                    //     })
                    // }
                    return;
                }
            })
        },
        getList:function(){
            Indicator.open();
            var that=this;
          //  alert(that.param.newsId)
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=queryPublishDetail',
                params: {
                    newsId: that.param.newsId
                }
            })
            .then(function(res) {//成功之后
                console.log(res)
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                 if(retCode==0){
                    that.newstitle = res.data.newstitle            //新闻标题
                    that.newscontent = res.data.newscontent        //新闻内容
                    that.opinfotype = res.data.opinfotypeName      //消息类别
                    that.publishtime = res.data.publishtime        //发布时间
                    that.fileList=res.data.fileList;
                    if(res.data.fileList.length<1){
                        that.showAttitle = false
                    }
                    if(res.data.proNameList.length<1){
                        that.showProdectlist = false
                    }
                    that.proNameList = res.data.proNameList;          //关联产品
                 }else if(retCode==-1){
                   // MessageBox('  ', '系统错误');
                    Toast({
                        message: '系统错误',
                        position: 'center',
                        duration: 3000
                    });
                   return;
                }else if(retCode==-2){
                    that.$refs.nodata.style.display='block';
                    that.$refs.hasData.style.display='none';
                     //MessageBox('  ','您还没有购买任何产品哦~');
                }else if(retCode==1){//未认证
                    that.$refs.hasData.style.display='none';
                     that.$refs.wz.style.display='block';
                        return;
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=queryPublishDetail'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=postDetail_'+that.$route.query.id+'#wechat_redirect';
                }else if(retCode == -3 ){//未身份认证,
                    var message = '非公开信息，请先完成身份认证。';      
                    MessageBox.confirm('', {
                        message: message,
                        title: '',
                        showCancelButton:false,
                        confirmButtonText:'去认证',
                    }).then(action => {
                        MessageBox.close(false)
                        if(action == 'confirm'){
                            that.$router.push({
                                path:'/faceMsg',
                                name:'faceMsg',
                                query:{
                                    returnUrl:that.Host+'weixin-h5/index.html#/postDetail?id='+that.param.newsId
                                }
                            })
                        }
                    }).catch(err => {
                    //取消按钮
                        if(err == 'cancel'){  
                        }
                    })
                     
                }
            });
        },
        open:function(){
              var fileUrl=event.currentTarget.getAttribute('fileUrl');//绑定事件的元素
              fileUrl=encodeURIComponent(fileUrl)
            //  window.location.href = 'http://testpreview.datangwealth.com/onlinePreview?url='+fileUrl  //测试环境预览文件
             window.location.href = 'https://filepreview.datangwealth.com?url='+fileUrl
        },
        async asyncSDKConifg () {
            var meatTitle=this.$route.meta.title
            let that = this
            axios.get('/wxservice/core/getJSSDKConfigure.mm?pageUrl='+that.backUrl)
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
                    title: '大唐财富'+meatTitle, // 分享标题
                    desc: '中国私人银行服务的领航者，诚邀您开启财富之旅', // 分享描述
                    link:location.href, // 分享链接
                    imgUrl: 'http://file0.datangwealth.com/g1/M00/0F/56/rBAeX1vYo1-AYmqbAAAIn3unB5w639.jpg?filename=share_img.jpg', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        //alert('成功');
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        //alert('用户取消分享');
                    }
                    });
                    wx.onMenuShareTimeline({ //分享朋友圈
                    title: '大唐财富'+meatTitle, // 分享标题
                    desc: '中国私人银行服务的领航者，诚邀您开启财富之旅', // 分享描述
                    link:location.href, // 分享链接
                    imgUrl: 'http://file0.datangwealth.com/g1/M00/0F/56/rBAeX1vYo1-AYmqbAAAIn3unB5w639.jpg?filename=share_img.jpg', // 分享图标
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
    created:function(){
        this.asyncSDKConifg()
        Indicator.open();
        var bizId=decodeURIComponent(getCookie("bizId"));
        this.faceparam.bizId = bizId
        if(!this.$route.query.faceResult == false){
           // alert(this.$route.query.id)
            this.param.newsId=this.$route.query.id;
            this.getfaceId()
        }else{
            if(!this.$route.query.actId==false){ //重定向后 
                this.param.newsId= this.$route.query.actId
                this.getList()
            }else{
                this.param.newsId=this.$route.query.id;
                this.getList()
            }
        }
    },
    
    beforeRouteLeave(to, from, next) {
         // 设置下一个路由的 meta
        to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
        next();
    }
}
</script>
<style>
.postDetail{
    width:100%;
    height:100%;
     background:#fff!important;
     text-align: left;
}
.lines{
    width: 100%;
    height: .266667rem;
    background: #F6F6F6;
}
.lines2{
    width: 100%;
    height: 1px;
    background: #E5E5E5;
}
.postInfor .noData{
    background:#fff;
}
.postInfor .noData img{
    width:2.24rem;
    margin:2.5rem auto 0;
}
.postInfor .noData p{
    color:#333;
}
.xiazai{
    color:#4a90e2;
}

 .comfooter_a .comfooter{
    position: static;
     bottom: 0;
 }
 .post_text{
    /* width:70%; */
    height: .373333rem;
    float:left;
    display: block;
    color: #D0352C;
    font-size: .266667rem;
    text-align: left;
    line-height: .4rem;
    padding: 0 .2rem; 
    border: 1px solid #D0352C;
    border-radius: .2rem 0 .2rem 0;
}
 .post_title{
    font-size: .426667rem;
    color: #333;
    line-height: .64rem;
    padding: .47rem .4rem 0;
    font-weight: 500;
    word-break: break-all;
 }
 .prodect_list{
    overflow: hidden;
    padding: .333333rem .266667rem;
    background: #F6F6F6;
    margin: 0 .4rem .4rem;
 }
 .post_title2{
    font-size: .373333rem;
    color: #646262;
    line-height: .55rem;
    float: left;
 }
 .post_date{
    float: left;
    font-size: .32rem;
    color: #999;
    padding: 0 .4rem;
    line-height: .36rem;
 }
 .acc_tit{
     color: #273244;
     font-size: .346667rem;
     padding: .52rem .4rem .48rem;
 }
 .attachment{
     overflow: hidden;
     /* background: #ecf0fe;
     border-radius: .5rem; */
     padding: 0 .4rem .48rem;
     width: max-content;
 }
 .att_icon{
     float: left;
     height: .4rem;
 }
 .att_name{
     float: left;
     /* padding: .5rem 0; */
     color: #2991E8;
     font-size: .346667rem;
     max-width: 8.2rem;
    line-height: 0.4rem;
    text-decoration: underline;
 }
 .att_text{
     font-size: .426667rem;
     color: #333;
     line-height: .7rem; 
     padding: .2rem .4rem;
 }
 .att_p2{
    padding-top: .2rem;
    text-align: justify;
    text-indent: 2em;
 }
</style>

