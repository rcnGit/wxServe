import wx from 'weixin-js-sdk';
import axios from 'axios';
import { getCookie,setCookie } from '@/common/js/cookie.js'
import { MessageBox } from 'mint-ui';//提示框
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';

export default {
    install(Vue, options) {
        //Vue.prototype.Host='https://interface.tdyhfund.com/'
        Vue.prototype.Host="http://weixin-test-interface.tdyhfund.com/"
       // Vue.prototype.APPID='wx42b6456eeafbe956'  //生产
       Vue.prototype.APPID='wx1f686b130ea97432'
      //  Vue.prototype.tgHost="http://172.16.8.82:8888/dthtml/HTML5/DTCFS_V4.2.2_190110/html/shared_card.html" 
        Vue.prototype.tgHost="https://test-interface.tdyhfund.com:8443/dthtml/HTML5/DTCFS/html/shared_card.html"
        //Vue.prototype.tgHost='https://interface.tdyhfund.com/dthtml/HTML5/DTCFS/html/shared_card.html'   //糖罐app财富师名片页
       Vue.prototype.tgHostSer = 'https://test-interface.tdyhfund.com:8443/dthtml/HTML5/DTCF/html/valueAddedServices'  //糖罐app增值服务页
       //Vue.prototype.tgHostSer = 'https://interface.tdyhfund.com/dthtml/HTML5/DTCF/html/valueAddedServices'  //糖罐app增值服务页
        Vue.prototype.formatDuring = function (mss) {//时间格式化
            var days = parseInt(mss / (1000 * 60 * 60 * 24));
            var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = (mss % (1000 * 60)) / 1000;
            return days + " 天 " + hours + " 小时 " + minutes + " 分 " + Math.round(seconds) + " 秒 ";
        }
    
        Vue.prototype.money = function (value) {//Vue自定义过滤器格式化数字三位加一逗号
            if(!value) return '0.00';
            var intPart = parseInt(value); //获取整数部分
            var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
            var floatPart = ".00"; //预定义小数部分
            var value2Array = value.split(".");

            //=2表示数据有小数位
            if(value2Array.length == 2) {
                floatPart = value2Array[1].toString(); //拿到小数部分

                if(floatPart.length == 1) { //补0,实际上用不着
                    return intPartFormat + "." + floatPart + '0';
                } else {
                    return intPartFormat + "." + floatPart;
                }

            } else {
                return intPartFormat + floatPart;
            }

        }//
       
        Vue.prototype.GasyncSDKConifg = function (paramUrl) {
            const meatTitle = this.$route.meta.title
           const backUrl = encodeURIComponent(location.href.split('#')[0])
           if(!paramUrl == false){
                var sharelink = location.href.split('?')[0]+'?source=wx'
           }else{
                var sharelink = location.href.split('?')[0]
           }
            axios.get('/wxservice/core/getJSSDKConfigure.mm?pageUrl='+backUrl)
                .then(function (res) {
                   // console.log(res)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature, // 必填，签名
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
                })
                wx.ready(function(res) { //通过ready接口处理成功验证 // config信息验证成功后会执行ready方法
                //  console.log(meatTitle+'====meatTitle')
                //  console.log(res+'===res')
                wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
                    title: '大唐财富'+meatTitle, // 分享标题
                    desc: '中国私人银行服务的领航者，诚邀您开启财富之旅', // 分享描述
                    link: sharelink, // 分享链接
                    imgUrl: 'http://file0.datangwealth.com/g1/M00/16/50/rBAeX1ybKCiAEKkxAADvNDguF4c858.png?filename=share.png', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                    });
                    wx.onMenuShareTimeline({ //分享朋友圈
                    title: '大唐财富'+meatTitle, // 分享标题
                    link: sharelink,
                    imgUrl: 'http://file0.datangwealth.com/g1/M00/16/50/rBAeX1ybKCiAEKkxAADvNDguF4c858.png?filename=share.png', // 分享图标
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
                console.log(res)
            });
        }

        Vue.prototype.trafficStatistics = function (code) {
            axios({
                method:'get',
                url:'/wxservice/wxexternal/trafficStatistics',//按钮点击量统计接口
                params: {
                    code: code
                }
            })
            .then(function(res) {
               console.log(res) 
            })//

        }
        Vue.prototype.getface = function (idNo,name,canshu,tp) {
            var that=this;
           // alert(idNo)
           // alert(name+'.....'+tp)
           //alert(canshu)
            Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceToken',//获取face++的token
                params:{
                    idCardNo:idNo,//身份证号
                    idCardName:name,//身份证姓名
                    returnUrl:canshu+'&faceResult=1',//人脸识别后返回的Url
                    backUrl: location.href.split('?')[0],
                    type: tp
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                console.log(res.data);
                var retCode=res.data.retCode;
               // alert(retCode)
                 if(retCode == 400){
                     var serbackUrl = that.Host+'wxservice/wxMemberInfo/getFaceToken'
                     window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=faceMsg_'+that.actId+','+that.ghT+','+that.actName+','+that.$route.query.ifCard+'#wechat_redirect';
                 }else if(retCode == '-2'){
                     MessageBox(' ','身份证不合法');
                     return;
                 }else if(retCode == '-1'){
                    //MessageBox(' ','系统异常');
                     Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                     return;
                 }else if(retCode == '-3'){
                    // MessageBox(' ','未获取到token');
                    Toast({
                        message: '姓名或身份证输入有误',
                        position: 'center',
                        duration: 3000
                    });
                     return;
                 }else{
                   //  that.token=res.data.data.token;
                     var bizId=res.data.data.bizId;
                     setCookie('bizId',bizId);
                     window.location.href='https://api.megvii.com/faceid/lite/do?token='+res.data.data.token;
                
                 }
            })
        }

        Vue.prototype.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
        Vue.prototype.getCookiecode = function () { //cookie存储登录状态
            //var userId = parseInt(Math.random()*100000000);
             if( !getCookie("checkkey") == false){
                // alert('已有code')

             }else{
                this.getCode()
            }
        }
        Vue.prototype.getCode = function () { // 非静默授权，第一次有弹框
            var code = this.$route.query.code // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
            //var code = this.getUrlParam('code')
            const local = window.location.href
            if (code == null || code === '') {
                //window.location.href = 'http://weixin-test-interface.tdyhfund.com/weixin-h5/index.html#/active?code=efkmvom'
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.APPID + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
            } else {
               // alert(code)
                this.getOpenId(code) //把code传给后台获取用户信息
            }
        },
        Vue.prototype.getOpenId = function (ACCode) { // 通过code获取 openId等用户信息
           // alert('getopenid')
            //alert(code)
                axios({
                    method:'get',
                    url:'/wxservice/wxexternal/authorizedLogin',
                    params: {
                        code:ACCode
                    }
                })
                .then(function(res){
                    console.log(res.data)
                    var retCode=res.data.retCode;
                    if(retCode == '0'){
                        //setCookie('checkkey',res.data.data.checkkey)
                    }else{
                        
                    }
                })
        }
    }
}
