<template>
    <div class='active'>
        <div class='act_head'>
          <div class="act_h_left">
          </div>
          <div class="act_h_right">
            <input placeholder="请输入活动名称关键字" class='searchInput'ref='name'/>
            <img src='./img/search_img.png' class='search_img' @click.stop='search'/>
          </div>
        </div><!--act_head-->
        <div class='noData' ref='nodata' v-if='isShow'>
          <img src='./img/nomessage@2x.png'/>
          <p class='fSize16'>现在还没有活动哦</p>
        </div>
        <div id='active_content'>
          <div style='height:20px;background:#f8f8f8;'></div>
           <div v-for="item in items" class="active_demo" @click='en_details($event)' :oaActId='item.oaActId' :ActName='item.actName'>
               <div style="position:relative;">
                 <img v-bind:src="item.bulletinPicture" width='100%' style='min-height:180px;max-height:200px;'/>
                 <div class='meng'><img src='./img/img_meng.png'width='100%' height='100%'/></div> 
               </div>
              <div class='textMain'>
                <p class='active_title' style='padding-bottom:15px;'>{{item.location}}</p>
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
        
    </div>
    
</template>
<script>
import provinceList from './provinceList.vue'
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
import axios from 'axios'
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
      isShow:false,
      loadObj:{
        text: '加载中...',
        spinnerType: 'triple-bounce'
      },
      backurl: location.href.split('?')[0],
      backUrl: encodeURIComponent('https://weixin-test-interface.tdyhfund.com/wxservice/wxexternal?opName=getactiveinfo'),
      param:{
          pageNo:1,
          city:'',
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
  methods:{
    openProvincsList:function(){
      alert('打开省市列表');
    },
    subTime:function(time){
      time=time.substr(0,10);
      return time;
    },
    en_details:function(e){
       var that=this;
     // console.log(event.target);
     // console.log(event.target.getAttribute('oaactid'))//点击到的元素
       var oaActId=event.currentTarget.getAttribute('oaactid');//绑定事件的元素
       var ActName=event.currentTarget.getAttribute('ActName');//绑定事件的元素
       this.$router.push({
          path:'/ActiveDetail',
          name:'ActiveDetail',
          query:{
            oaActId : oaActId,
            actName : ActName,
            comefrom:that.param.comefrom,//是否糖罐进入
          }
        })
        var huoId = oaActId;
        var huoName = ActName;
        var actObj = {'huoId': huoId, 'huoName': huoName}
        actObj = JSON.stringify(actObj)
        localStorage.setItem('activiy',actObj)
    },
    search:function(){
      var that=this;
       Indicator.open(that.loadObj);
      var name=that.$refs.name.value;//ref的dom操作
      that.allList=[];
      this.param={
          pageNo:1,
          city:'',
          actName:name,
          comefrom:that.param.comefrom
        }
     this.getData();
    },
    getData:function(){
        let that = this;
        axios({
            method:'get',
            url:'/wxservice/wxexternal?opName=getactiveinfo',
            params: {
              param:that.param,//系统类别
            }
        })
        .then(function(res) {//成功之后
            Indicator.close();
            var retCode=res.data.retCode
            var retMsg=res.data.retMsg;
            alert(retMsg);
            if(retCode == 0){
              if(res.data.itemList != ''){
               // alert(that.allList.length);
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
                this.isShow = true;
              }
            }else if(retCode == 400){
              var serbackUrl = that.Host+'wxservice/wxexternal?opName=getactiveinfo'
              window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=active#wechat_redirect';
            }else{
              //MessageBox('提示', retMsg);
              Toast({
                  message: retMsg,
                  position: 'center',
                  duration: 3000
              });
            }
        });
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
     if(that.$route.query.comefrom=='tangguan'||that.$route.params.comefrom=='tangguan'){
        that.param.comefrom ='tangguan';
        alert('tangguan');
        
    }
     var routerCity = this.$route.query.city;
     if(routerCity!=''&&routerCity!=undefined){
         that.allList=[];
           that.param={
            pageNo:1,
            city:routerCity,
            actName:''
          }
         that.getData();
          this.$route.query.city='';
          return;
     }
     
     that.getData();
   },
   created(){
     let that = this;
     window.onscroll = function(){
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
          var pageNo=that.param.pageNo;
           pageNo++;
           that.param.pageNo=pageNo;  
          that.getData();
        }   
      }
       
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
  padding:20px 13px 10px;
  line-height: 40px; 
  display:flex; /*父元素声明弹性盒*/
  position: fixed;
  top: 0;
  background:#f8f8f8;
  z-index: 999999999;
}
.act_h_left{
  /* width:60px; */
  float: left;
}
.act_h_left span{
  float: left;
  font-size:14px;
}
.act_h_left img{
  display: block;
  width:14px;
  float: left;
  margin-left:5px;
  margin-top:17px;
}
.act_h_right{
  flex: 1;
  float: left;
  position: relative;
}
.act_h_right .searchInput{
  width:100%;
  height:100%;
  border:1px solid #e4e5e7;
  background:#fff;
  border-radius: 4px;
  padding:3px 30px 3px 10px;
  box-sizing: border-box;
  font-size: 14px;
  color:rgb(57,66,89);
  box-shadow: none;
  outline-color: invert ;
	outline-style: none ;
	outline-width: 0px ;
	border: none ;
	border-style: none ;
	text-shadow: none ;
	-webkit-appearance: none ;
	-webkit-user-select: text ;
	outline-color: transparent ;
  box-shadow: none;
  opacity: 1;
}
input::-webkit-input-placeholder { /* WebKit browsers */ 
color: #808080; 
} 


.search_img{
  width:20px;
  position: absolute;
  top:10px;
  right:10px;
}
#active_content{
  background:#f8f8f8;
  margin-top:55px;
  padding: 0 10px;
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
  font-size: 20px;
  margin-top: 8%;
}
.img_active_date{
  font-size: 15px;
  letter-spacing: 1px;
}
.active_title{
  font-size: 15px;
  color:rgb(18,28,50);
  text-align: left;
  margin:15px 0 10px;
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
.noData{
  background:#fff;
}
.noData img{
    width:40%;
    margin:80px auto 0;
}
.noData p{
    color:rgb(197,197,197);
    margin-top:30px;
}
</style>

