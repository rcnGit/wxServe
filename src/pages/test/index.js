// 引入组件
import Test from './test.vue'
const Loading2={
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install:function(Vue){
        Vue.component('Loading',Test)//注册组件
    }
}
// 导出
export default Loading2//Loading2是导出对象名