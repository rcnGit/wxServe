<template>
  <div id="app" h='123'>
    <!-- <mt-button @click.native="handleClick">按钮</mt-button> -->
    <router-view v-wechat-title='$route.meta.title'></router-view>
  </div>
</template>
<script>
export default{
 name: 'App',
 methods: {
  handleClick: function() {
   this.$toast('Hello world!');
  }
 }
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
