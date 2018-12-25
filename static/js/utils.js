import wx from 'weixin-js-sdk';
import axios from 'axios';
export default {
    install(Vue, options) {
        Vue.prototype.Host='https://interface.tdyhfund.com/'
        //Vue.prototype.Host="https://weixin-test-interface.tdyhfund.com/"
        Vue.prototype.APPID='wx42b6456eeafbe956'
        //Vue.prototype.APPID='wx1f686b130ea97432'
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
       
        Vue.prototype.GasyncSDKConifg = function () {
            const meatTitle = this.$route.meta.title
           const backUrl = encodeURIComponent(location.href.split('#')[0])
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
                    link:location.href.split('?')[0], // 分享链接
                    imgUrl: 'http://file0.datangwealth.com/g1/M00/0F/56/rBAeX1vYo1-AYmqbAAAIn3unB5w639.jpg?filename=share_img.jpg', // 分享图标
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
                    link: location.href.split('?')[0],
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
        
}
}
