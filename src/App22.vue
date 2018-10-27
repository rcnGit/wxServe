<template>
  <div id="app" h='123'>
    <!-- <mt-button @click.native="handleClick">按钮</mt-button> -->
    <router-view v-wechat-title='$route.meta.title'></router-view>
    <comfooter></comfooter>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import axios from 'axios';
import comfooter from './components/footer';
export default{
 name: 'App',
 data () {
    return {
     
    }
  },
 created () {
    
  // this.asyncSDKConifg(this.meatTitle)
   //console.log(location.href.split('?')[0]+'?ifcard=1')
  },
  components:{comfooter},
 methods: {
  handleClick: function() {
   this.$toast('Hello world!');
  },

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
