<template>
    <div class='active'>
        <div class='act_head'>
          <div class="act_h_left">
            <router-link to='/provinceList'><span>全国</span><img src='./img/upBtn_img@2x.png'/>
            </router-link>
          </div>
          <div class="act_h_right">
            <input placeholder="活动名称" class='searchInput'ref='name'/>
            <img src='./img/search_img@2x.png' class='search_img' @click='search()'/>
          </div>
        </div><!--act_head-->
        <div class='noData' ref='nodata' v-if='isShow'>
          <img src='./img/nomessage@2x.png'/>
          <p class='fSize16'>现在还没有活动哦</p>
        </div>
        <div id='active_content'>
           <div v-for="item in items" class="active_demo" @click='en_details($event)' :oaActId='item.oaActId' :ActName='item.actName'>
               <img v-bind:src="item.bulletinPicture" width='100%' style='min-height:100px;max-height:150px;'/>
              <div class='textMain'>
                <p class='active_title'>{{item.actName}}</p>
                <p class='active_demo_content'>{{item.content}}</p>
              </div> 
              <div class='img_text'>
                  <p class='img_active_title'>{{item.actName}}</p>
                  <p class='img_active_date'>{{item.beginTime}}</p>
              </div>
          </div> 
          <div class='loading' style="font-size:18px;color:rgb(59,59,59);line-height:50px;display:none;">
            加载中，请稍后......
          </div>
          <div class='loader'ref='loader' style="font-size:18px;color:rgb(59,59,59);line-height:50px;display:none;">
            已经到底了
          </div>

            
        </div><!--active_content-->
    </div>
    
</template>
<script>
import provinceList from './provinceList.vue'
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import axios from 'axios'
var arrData=[];
export default {
  name: 'Active',
  data:function(){
    return {
      msg: '我是活动页面，哈哈哈',
      allList:[],
      load:true,
      isShow:false,
      loadObj:{
        text: '加载中...',
        spinnerType: 'triple-bounce'
      },
      param:{
          pageNo:1,
          city:'',
          actName:''
      },
      items:[]
    }
  },
  methods:{
    openProvincsList:function(){
      alert('打开省市列表');
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
          params:{
            oaActId : oaActId,
            actName : ActName
          }
        })
    },
    search:function(){
      var that=this;
       Indicator.open(that.loadObj);
      var name=that.$refs.name.value;//ref的dom操作
      that.allList=[];
      this.param={
          pageNo:1,
          city:'',
          actName:name
        }
     this.getData();
    },
    getData:function(){
        let that = this;
        //console.log(that.param)
        axios({
            method:'get',
            url:'/wxservice/wxservice?opName=getactiveinfo',
            params: {
              param:that.param,//系统类别
            }
        })
        .then(function(res) {//成功之后
          console.log(res.data)
            Indicator.close();
            var retCode=res.data.retCode;
            var retMsg=res.data.retMsg;
            if(retCode!=0){
              MessageBox('提示', retMsg);
            }else{
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
                this.isShow = true;
              }
            }
        });
    }
    
  },
   mounted:function(){
      let that = this; //这个是钩子函数mounted
     Indicator.open(that.loadObj);
     var routerCity = this.$route.params.city;
     if(routerCity!=''&&routerCity!=undefined){
         that.allList=[];
           that.param={
            pageNo:1,
            city:routerCity,
            actName:''
          }
          that.getData();
          this.$route.params.city='';
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
body{
  background: #fff;
}
.business_card{
  display:none;
}
.act_head{
  /* height:40px; */
  width: 100%;
  box-sizing: border-box;
  padding:10px 13px 5px;
  line-height: 40px; 
  display:flex; /*父元素声明弹性盒*/
  position: fixed;
  top: 0;
  z-index: 999999999;
  background: #fff;
}
.act_h_left{
  width:60px;
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
  background:rgb(248,248,248);
  border-radius: 4px;
  padding:3px 30px 3px 10px;
  box-sizing: border-box;
  font-size: 14px;
  color:rgb(57,66,89);
}
input::-webkit-input-placeholder { /* WebKit browsers */ 
color: #d7d6d6; 
} 


.search_img{
  width:20px;
  position: absolute;
  top:9px;
  right:10px;
}
#active_content{
  background:#f8f8f8;
  margin-top:55px;
  margin-bottom:50px;
}
.textMain{
  padding:0 13px;
}
.active_demo{
  border-bottom: 1px solid #efefef;
  margin-bottom:20px;
  background: #fff;
  position: relative;
}
.img_text{
  width:100%;
  min-height:86px;
  position: absolute;
  bottom:88px;
  left:0;
  color:#fff;
}
.img_active_title{
  font-size: 20px;
  line-height: 50px;
  border-bottom: 1px solid #fff;
}
.img_active_date{
  font-size: 15px;
  margin-top:15px;
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

