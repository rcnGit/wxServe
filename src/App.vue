<template>
  <div id="app" h='123'>
    <!-- <mt-button @click.native="handleClick">按钮</mt-button> -->
    <router-view v-wechat-title='$route.meta.title'></router-view>
    <comfooter></comfooter>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import comfooter from './components/footer';
export default{
 name: 'App',
 data () {
    return {
      backUrl: encodeURIComponent(location.href.split('#')[0])
    }
  },
 created () {
    this.asyncSDKConifg()
  },
  components:{comfooter},
 methods: {
  handleClick: function() {
   this.$toast('Hello world!');
  },
  /**
     * 获取config
     */
    async asyncSDKConifg () {
      return;
      //wx是引入的微信sdk
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp:'' , // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });//通过config接口注入权限验证配置

        wx.ready(function() { //通过ready接口处理成功验证
        // config信息验证成功后会执行ready方法
            wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
                title: '活动详情', // 分享标题
                desc: 'This is a test!', // 分享描述
                link: '链接', // 分享链接
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
                title: '标题', // 分享标题
                link: '链接',
                imgUrl: 'https://www.zhizhudj.com/weChat-public/spider-sign-up/static/lgoo.png?20180821', // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
        wx.error(function(res){//通过error接口处理失败验证
            // config信息验证失败会执行error函数
      });
    }
 },
 
}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: red; */
 color: #2c3e50;
}
</style>
