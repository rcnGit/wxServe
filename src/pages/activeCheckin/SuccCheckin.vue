<template>
    <div>
        <div class="Review" v-if="isshow">
            <img src='./img/signSuc.png' class='ztw'/> 
            <p class='p1'>签到成功</p>
        </div>
        <div class="ReviewF" v-else>
            <img src='./img/signFail@2x.png' class='ztw'/>
            <p class='p1'>签到失败</p>
            <p class='p4'>您在大唐财富平台绑定的手机号<span class="phone">{{phone}}</span>未报名该活动，请先报名</p>
            <mt-button type="danger" size="large" class='sure' @click='toActiveDetail()'>去报名</mt-button>
        </div>    
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
export default {
    name:'SuccCheckin',
    components:{Button},//使用mint-ui的button的组件
     data:function(){
        return{
            retCode:'',
            isshow: true,
            activeId: '',
            phone:''
        }
    },
    created(){
       this.getParams()
    },
    methods: {
      getParams () {
          console.log(this.$route)
        // 取到路由带过来的参数 
        var routerParams = this.$route.query.retCode
       this.activeId = this.$route.query.activeId
       this.phone = this.$route.query.phone
       // var routerParams = '1'
        // 将数据放在当前组件的数据内
       console.log(routerParams);
       console.log(this.activeId);
       if(routerParams == '0'){
           this.isshow = true
           setTimeout(() => {
            this.toActiveDetail()
            }, 3000)
       }else{
            this.isshow = false 
       }
      },
      toActiveDetail:function(){
        this.$router.push({
          path:'/ActiveDetail',
          name:'ActiveDetail',
          params:{
            oaActId : this.activeId
          }
        })
      },
      toActive:function(){
        this.$router.push({
          path:'/Active',
          name:'Active'
        })
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
.p4{
    font-size: 13px;
    color:rgb(53,55,57);
    line-height: 22px;
    padding: 0 40px;
    text-align: left;
}
.progress{
    color: #08c;
}
.sure{
     width:90%;
    margin: 65px auto 0;
}
</style>

