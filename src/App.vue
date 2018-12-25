<template>
  <div id="app" h='123'>
    <!-- <mt-button @click.native="handleClick">按钮</mt-button> -->
     <!-- <router-view v-wechat-title='$route.meta.title'></router-view>  -->
    <keep-alive include="active">
        <router-view v-if="$route.meta.keepAlive" v-wechat-title='$route.meta.title'></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title='$route.meta.title'></router-view> 
    <!-- <comfooter></comfooter> -->
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import axios from 'axios';
// import comfooter from './components/footer';
export default{
 name: 'App',
 data () {
    return {
      meatTitle: this.$route.meta.title,
      backUrl: encodeURIComponent(location.href.split('#')[0]),
      // backUrl: location.href.split('#')[0],
    }
  },
 created () {
//this.asyncSDKConifg(this.meatTitle)
   //console.log(location.href.split('?')[0]+'?ifcard=1')
  },
//   components:{comfooter},
 methods: {
  handleClick: function() {
   this.$toast('Hello world!');
  },
  /**
     * 获取config
     */
      async asyncSDKConifg (meatTitle) {
      let that = this
      axios.get('/wxservice/core/getJSSDKConfigure.mm?pageUrl='+that.backUrl)
          .then(function (res) {
              console.log(res)
          wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature, // 必填，签名
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
          })
          wx.ready(function(res) { //通过ready接口处理成功验证 // config信息验证成功后会执行ready方法
            console.log(meatTitle+'====meatTitle')
            console.log(res+'===res')
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
