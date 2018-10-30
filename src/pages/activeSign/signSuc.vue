<template>
    <div>
        <img src='./img/zwt_img@2x.png' class='ztw'/>
        <div class="Review" >
            <p class='p1'>恭喜您，{{result}}成功</p>
            <div v-if="isshow">
                <p class='p2'>活动时间：<span>{{beginTime}}</span></p>
                <p class='p3'>活动地点：{{location}}</p>
            </div>
           
        </div>
        <div class="ReviewF" v-if="!isshow">
            <p class='p4'>工作人员将在N个工作日内反馈审核结果，您可在我的活动中<span class="progress" @click='toActive()'>查看进度>></span></p>
        </div>
        <mt-button type="danger" size="large" class='sure' @click='toActiveDetail()'>确定</mt-button>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { MessageBox } from 'mint-ui';
export default {
    name:'signSun',
    components:{Button},//使用mint-ui的button的组件
     data:function(){
        return{
            isReviewSignup:'',
            isshow: true,
            activeId: '',
            beginTime:'',
            result:'报名',
            location :'',//活动地点
        }
    },
    created(){
       this.getParams()
    },
    methods: {
      getParams () {
          console.log(this.$route)
        // 取到路由带过来的参数 
       
        var isReviewSignup = this.$route.query.isReviewSignup;
        this.activeId = this.$route.query.activeId
        this.actName = decodeURIComponent(this.$route.query.actName);
        this.beginTime=this.$route.query.beginTime;
        this.location =decodeURIComponent(this.$route.query.location);
        // 将数据放在当前组件的数据内
        if(isReviewSignup == '1'){//用审核
            this.result='报名申请提交';
            this.isshow = false
            // setTimeout(() => {
            //  this.toActiveDetail()
            //  }, 3000)    现在不用跳到详情页面了
        }else{//不用审核
            this.result='报名';
             this.isshow = true;
        }
      },
      toActiveDetail:function(){
          var that=this;
        that.$router.push({
          path:'/ActiveDetail',
          name:'ActiveDetail',
          query:{
            actId:that.activeId,
            actName:that.actName
          }
        })
      },
      toActive:function(){//查看我的进度;
            this.$router.push({
            path:'/minActive',
            name:'minActive'
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

