<template>
    <div>
        <img src='./img/zwt_img@2x.png' class='ztw'/>
        <p class='p1'>恭喜您，报名申请提交成功</p>
        <p class='p2'>活动时间：<span>2018-08-28 18:00</span></p>
        <p class='p3'>活动地点：北京朝阳区泰康大厦32层</p>
        <mt-button type="danger" size="large" class='sure'>确定</mt-button>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
export default {
    name:'signSun',
    components:{Button},//使用mint-ui的button的组件
     data:function(){
        return{
            id:''
        }
    },
     created(){
       this.getParams()
    },
    methods: {
      getParams () {
          console.log(this.$route)
        // 取到路由带过来的参数 
        var routerParams = this.$route.params.id
        // 将数据放在当前组件的数据内
        alert(routerParams);
      }
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }


}
</script>
<style>
.ztw{
    width:100px;
    margin-top:118px;
    margin-bottom: 30px;

}
.p1{
    font-size: 17px;
    color:rgb(53,55,57);
    line-height: 30px;
    font-weight: 700;
    margin-bottom:20px;
}
.p2{
    font-size: 13px;
    color:rgb(53,55,57);
    line-height: 35px;
}
.sure{
     width:90%;
    margin: 65px auto 0;
}
</style>

