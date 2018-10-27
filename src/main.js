// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import Loading from './pages/test/index'//loading是组件名
import utils from '../static/js/utils.js'    
import $ from 'jquery'

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(require('vue-wechat-title'))
Vue.use(MintUI)
Vue.use(Loading)//测试组件
Vue.use(utils);//使用方法this.formatDuring(currentTime);
new Vue({
  el: '#app_wei',
  router,
  components: { App},
  template: '<App/>'
})
/* router.beforeEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
  }) */
