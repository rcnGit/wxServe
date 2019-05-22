<template>
    <div class='active'>
        <div class='act_head'>
          <div class="act_h_left">
              <!-- <router-link to='/cityList'><span>{{pcity}}</span><img src='./img/upBtn_img@2x.png'/>
              </router-link> -->
              <div @click="toCity()"><span>{{pcity}}</span><img src='./img/upBtn_img@2x.png'/>
              </div>
          </div>
          <div class="act_h_right">
            <input placeholder="请输入活动名称关键字" class='searchInput'ref='name'/>
            <img src='./img/search@2x.png' class='search_img' @click.stop='search'/>
          </div>
        </div><!--act_head-->
        <div class='noData active_nodata' ref='nodata' v-if='isShow'>
          <img src='./img/noactive@2x.png'/>
          <p class='fSize16' style="padding-top: 1.066667rem;color: #999;">暂未搜索到相关结果</p>
          <p class='fSize16' @click="Loadpage" style="color:#DF1E1D;padding-top: .366667rem">先看看其他精彩活动吧>></p>
        </div>
        <div id='active_content' v-else>
          <div style='height:20px;background:#f1f1f1;'></div>
           <div v-for="item in items" class="active_demo" @click='en_details($event)' :oaActId='item.oaActId' :ActName='item.actName'>
               <div style="position:relative;">
                 <img v-if="item.cover" v-bind:src="item.cover" width='100%' style='min-height:180px;max-height:200px;'/>
                 <img v-else v-bind:src="item.bulletinPicture" width='100%' style='min-height:180px;max-height:200px;'/>
                 <div class='meng'><img src='./img/img_meng.png'width='100%' height='100%'/></div> 
               </div>
              <div class='textMain'>
                <p class='active_title' style='padding-bottom:8px;'>{{item.location}}</p>
                <p class='active_demo_content' style='padding-bottom:10px;'>{{item.content}}</p>
              </div>
              
              <div class='img_text'>
                  <p class='img_active_date'>活动时间:{{subTime(item.beginTime)}}</p>
                  <p class='img_active_title'>{{item.actName}}</p>
                  
              </div>
          </div> 
          <div class='loading' style="font-size:18px;color:rgb(59,59,59);line-height:50px;display:none;">
            加载中，请稍后......
          </div>
          <div class='loader'ref='loader' style="font-size:14px;color:#685F57;line-height:50px;display:none;">
            已经到底了
          </div>
        </div><!--active_content-->
        <!-- <comfooter></comfooter> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    
</template>
<script>
import cityList from './cityList.vue'
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
import axios from 'axios'
import comfooter from '../../components/footer'
import { getCookie,setCookie} from '@/common/js/cookie.js'
var arrData=[];
export default {
  name: 'active',
  data:function(){
    return {
      checkkey:'',
      msg: '活动页面',
      allList:[],
      cd:true,
      load:true,
      ifSearch:false,
      isShow:false,
      pcity:"全国",
      loadObj:{
        text: '加载中...',
        spinnerType: 'triple-bounce'
      },
      backurl: location.href.split('?')[0],
      backUrl: encodeURIComponent('https://interface.tdyhfund.com/wxservice/wxexternal?opName=getactiveinfo'),
      param:{
          pageNo:1,
          cityCode:'',
          actName:'',
          code:'',
          comefrom:'',
          //isRed: 0,
         // backUrl: location.href.split('#')[0]+'/wxservice/wxservice?opName=getactiveinfo'
         backUrl: location.href.split('?')[0]
      },
      items:[]
    }
  },
  components:{MessageBox,comfooter,Toast},
  methods:{
    subTime:function(time){
      time=time.substr(0,10);
      return time;
    },
    toCity:function(){
      this.$router.push({
          path:'/cityList',
          name:'cityList',
          query:{
            comefrom:this.$route.query.comefrom,//是否糖罐进入
          }
        })
    },
    en_details:function(e){
       var that=this;
     // console.log(event.target);
     // console.log(event.target.getAttribute('oaactid'))//点击到的元素
       var oaActId=event.currentTarget.getAttribute('oaactid');//绑定事件的元素
       var ActName=event.currentTarget.getAttribute('ActName');//绑定事件的元素   
       that.$router.push({
          path:'/activeDetail',
          name:'activeDetail',
          query:{
            actId: oaActId,
            actName : ActName,
            comefrom:that.$route.query.comefrom,//是否糖罐进入
          }
        })
        var huoId = oaActId;
        var huoName = ActName;
        var actObj = {'huoId': huoId, 'huoName': huoName}
        actObj = JSON.stringify(actObj)
        localStorage.setItem('activiy',actObj)
    },
    search:function(){
      this.trafficStatistics('001')//自定义埋点
      var that=this;
      that.ifSearch=true;
       Indicator.open(that.loadObj);
      var name=that.$refs.name.value;//ref的dom操作
      that.allList=[];
      that.param={
          pageNo:1,
          cityCode:that.$route.query.code,
          actName:name,
          comefrom:that.param.comefrom
        }
     that.getData();
    },
    Loadpage:function(){
      Indicator.open(this.loadObj);
      this.pcity = '全国'
      this.$refs.name.value = ''
      this.param={
          pageNo:1,
          cityCode:'',
          actName:"",
          comefrom:this.param.comefrom
        }
      this.getData()
    },
    getData:function(){
        let that = this;
        console.log(that.param)
        axios({
            method:'get',
            url:'/wxservice/wxexternal?opName=getactiveinfo',
            params: {
              param:that.param,//系统类别
            }
        })
        .then(function(res) {//成功之后
            Indicator.close();
            console.log(res.data)
            var retCode=res.data.retCode
            var retMsg=res.data.retMsg;
            if(retCode == 0){
              if(that.ifSearch&&res.data.itemList.length==0){
                  //提示搜索为空
                  that.isShow=true;
                  // Toast({
                  //       message: '暂未搜索到相关结果～',
                  //       position: 'center',
                  //       duration: 3000
                  //   });
                    that.ifSearch=false;
              }
              if(res.data.itemList != ''){
                that.allList=that.allList.concat(res.data.itemList);//把已获取的数据和新获取的数据合并在放入页面
                that.items=that.allList;
                if(that.allList.length==0||that.allList==undefined){
                    that.isShow=true;
                }else{
                    that.isShow=false;
                }
                //console.log(that.items)
                if(res.data.itemList&&res.data.itemList.length<10){
                    that.load=false;
                }
              }else{
                that.isShow = true;
              }
            }
            else if(retCode == 400){
              var serbackUrl = that.Host+'wxservice/wxexternal?opName=getactiveinfo'
              window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=active#wechat_redirect';
            }
            else{
              //MessageBox('提示', retMsg);
              Toast({
                  message: retMsg,
                  position: 'center',
                  duration: 3000
              });
            }
        });
    },
    onScroll:function(){
      let that = this;
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
        if(scrollTop+windowHeight==scrollHeight){
          //写后台加载数据的函数
          console.log('到底了')
         	  if(!that.load){
              that.$refs.loader.style.display='block';
               return;
             }
          Indicator.open(that.loadObj);
         // alert(location.href.split('#')[0])
          var pageNo=that.param.pageNo;
           pageNo++;
           that.param.pageNo=pageNo;  
          that.getData();
        } 
    }
    // getCode:function(){
    //  // alert(location.href.split('?')[0])
    //   //alert(this.$route.query.code)
    //   if(!this.$route.query.checkkey == false){
    //     this.param.code = this.$route.query.code;
    //     this.param.isRed = 1;
    //     this.getData()
    //   }else{
    //     this.param.code = '';
    //     this.param.isRed = 0;
    //     this.getData()
    //   }
    // },
//     setCookie: function (cname, cvalue, exdays) {
//         var d = new Date();
//         d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//         var expires = "expires=" + d.toUTCString();
//         console.info(cname + "=" + cvalue + "; " + expires);
//         document.cookie = cname + "=" + cvalue + "; " + expires;
//         console.info(document.cookie);
//       }
  },
   mounted:function(){
     
      let that = this; //这个是钩子函数mounted
      Indicator.open(that.loadObj);
    //  if(that.$route.query.comefrom=='tangguan'||that.$route.params.comefrom=='tangguan'){
    //     that.param.comefrom ='tangguan';
        
    // }
     var routerCity = that.$route.query.city;
     var routerCode = that.$route.query.code;
     if(!that.$route.query.city == false){
       that.pcity = routerCity
     }
     if(routerCity!=''&&routerCity!=undefined){
         that.allList=[];
           that.param={
            pageNo:1,
            cityCode:routerCode,
            actName:''
          }
         that.getData();
         // that.$route.query.city='';
          return;
     }
     that.getData();
    // 滚动加载
      that.$nextTick(function () {
          window.addEventListener('scroll', that.onScroll)
      })
   },
   created(){
     if(this.$route.query.comefrom=='tangguan'||this.$route.params.comefrom=='tangguan'){
        this.param.comefrom ='tangguan'; 
    }
     this.GasyncSDKConifg()
    //  if(that.$route.path == '/active'){ //获取当前页面路由
    //  window.onscroll = function(){
       	  
    //   }
    //  }
     }
   }
        

</script>
<style>
.business_card{
  display:none;
}
.act_head{
  /* height:40px; */
  width: 100%;
  box-sizing: border-box;
  padding: .36667rem .173333rem .1633333rem;
  line-height: 1rem; 
  display:flex; /*父元素声明弹性盒*/
  position: fixed;
  top: 0;
  background:#fff;
  z-index: 999999999;
}
.act_h_left{ 
  float: left;
  line-height: 1rem;
  padding-right: .2rem;
  padding-left: .2rem;
}
.act_h_left span{
  float: left;
  font-size: .373333rem;
  overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;/*此为两行，设置行数*/
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
	max-width: 1.5rem; 
  color: #333;
  padding-top: .04rem;
  white-space: nowrap;
}
.act_h_left img{
  display: block;
  width: .23667rem;
  float: left;
  margin-left: .1rem;
  margin-top: .44rem
}
.act_h_right{
  flex: 1;
  float: left;
  position: relative;
  border: 1px solid rgba(230,230,230,1);
  border-radius: .133333rem;
  margin-right: 0.16rem;
}
.act_h_right .searchInput{
  width:100%;
  background:#fff;
  border-radius:30px;
  height: 100%;
  padding: 0rem .4rem 0rem .266667rem;
  box-sizing: border-box;
  font-size: 0.37rem;
  color:rgb(57,66,89);
  box-shadow: none;
  outline-color: invert ;
	outline-style: none ;
	outline-width: 0px ;
	text-shadow: none ;
	-webkit-appearance: none ;
	-webkit-user-select: text ;
	outline-color: transparent ;
  box-shadow: none;
  opacity: 1;

}
input::-webkit-input-placeholder { /* WebKit browsers */ 
color: #d2cfcf; 
font-size: 0.37rem;
} 
.act_h_right input:focus{
  border:0!important;
}

.search_img{
  width:0.45rem;
  position: absolute;
  top:0.25rem;
  right:14px;
}
#active_content{
  background:#f1f1f1;
  margin-top:55px;
  padding: 0 10px;
  min-height:16.8rem;
  /* margin-bottom:50px; */
}
.textMain{
  padding:0 13px;
}
.active_demo{
  margin-bottom:16px;
  background: #fff;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
}
.meng{
  /* background:rgba(0,0,0,0.4); */
  position: absolute;
    width: 88%;
    position: absolute;
    left: 6%;
    height: 68%;
    top: 16%;
}
.img_text{
  width:100%;
  min-height:86px;
  position: absolute;
  bottom:53%;
  left:0;
  color:#fff;
  padding-top:3%;
}
.img_active_title{
  display: inline-block;
  max-width:80%;
  margin:0 auto;
  white-space: nowrap;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: .53333rem;
  line-height: .58rem;
  margin-top: 8%;
}
.img_active_date{
  font-size: .4rem;
  letter-spacing: 1px;
}
.active_title{
  font-size: .4rem;
  line-height: .5rem;
  color:rgb(18,28,50);
  text-align: left;
  margin:13px 0 8px;
   white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.active_demo_content{
  font-size: 13px;
  color:rgb(93,102,122);
  text-align: left;
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: none;
}
.active_nodata{
  background:#fff;
  padding-top: 4.773333rem
}
.active_nodata img{
    width: 2.493333rem;
    margin:0 auto;
}
.active_nodata p{
    font-size: .4rem;
}
input::-webkit-input-placeholder {
  color: #999;
}
</style>

