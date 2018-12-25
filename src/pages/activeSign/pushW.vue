<template>
    <div class='pushW'>
        <img src='./img/signSuc.png' width='28%'/>
        <p style="font-size:15px;margin-bottom:20px;font-weight:700;">您的参与意愿已推送给您的财富师</p> 
        <p>该活动需要您的财富师为您申请参与资格。我们已将您的意愿</p>
        <p>推送给您的财富师<span>{{Wname}}&nbsp;&nbsp;</span><span style='color:#4a90e2;'@click='toMingpian()'>联系我的财富师>></span></p>
        <div>
            <mt-button type="danger" size="large" class='sure' @click='toActiveDetail()'>确定</mt-button>
            <mt-button type="danger" size="large" class='inMinAct' @click='toActive()'>进入我的活动</mt-button>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
export default {
    name:'pushW',
    data:function(){
        return{
            Wname:'',
            isReviewSignup:'',
            activeId:'',
            belongBusiness:'',//财富师工号
            actName:'',
        }
    },
    created:function(){
        this.GasyncSDKConifg()
        // 取到路由带过来的参数 
        var that=this;
      var routerParams = that.$route.query.isReviewSignup
       that.activeId = that.$route.query.activeId
       that.actName = decodeURIComponent(that.$route.query.actName);
       that.Wname = that.$route.query.businessName;
       that.belongBusiness = that.$route.query.belongBusiness
       // var routerParams = '0'
        // 将数据放在当前组件的数据内
         window.onscroll = function(){
                return;  
            }
    },
    methods: {
      toActiveDetail:function(){
         // var that=this;
        this.$router.push({
          path:'/activeDetail',
          name:'activeDetail',
          query:{
            actId : this.activeId,
            actName: this.actName
          }
        })
      },
      toActive:function(){
        this.$router.push({
          path:'/minActive',
          name:'minActive',
          query:{
          }
        })
      },
      toMingpian:function(){
        this.trafficStatistics('008')//自定义埋点客服活动跳转到指定理财师页面的数量
        window.location.href='https://interface.tdyhfund.com/tcapi/HTML5/html/shared_card.html?userId='+this.belongBusiness;
      }
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
}
</script>
<style>
@import 'toSign.css'; /* 引入toSign.css文件*/
.pushW img{
    margin:130px auto 40px;
}
.pushW p{
    font-size: 13px;
    color:rgb(53,53,53);
    margin-bottom:10px;
}
.inMinAct{
    color:#df1e1d!important;
    border:1px solid #df1e1d!important;
    background:#fff!important;
    margin-top:30px;
}
</style>


