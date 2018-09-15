<template>
    <div class='active'>
        <div class='act_head'>
          <div class="act_h_left">
            <router-link to='/provinceList'><span>全国</span><img src='./img/upBtn_img@2x.png'/>
            </router-link>
          </div>
          <div class="act_h_right">
            <input placeholder="活动名称" class='searchInput'/>
            <img src='./img/search_img@2x.png' class='search_img'/>
          </div>
        </div><!--act_head-->
        <div id='active_content'>
          <div v-for="item in items" class="active_demo">
              <img src='./img/bg_img@2x.png' width='100%'/>
              <div class='textMain'>
                <p class='active_title'>{{item.title}}</p>
                <p class='active_demo_content'>{{item.act_content}}</p>
              </div>
              <div class='img_text'>
                  <p class='img_active_title'>{{item.title}}</p>
                  <p class='img_active_date'>{{item.date}}</p>
              </div>
          </div><!--active_demo-->

            
        </div><!--active_content-->
    </div>
    
</template>
<script>
import provinceList from './provinceList.vue'
import axios from 'axios'
var arrData=[];
export default {
  name: 'Active',
  data:function(){
    return {
      msg: '我是活动页面，哈哈哈',
      items:[
        {'imgSrc':'./static/img/bg_img@2x.png','title':'我是标题','date':'2018-09-08','act_content':'我是新闻内容我是新闻内容我是新闻内容我是新闻内容'},
        {'imgSrc':'./static/img/bg_img@2x.png','title':'我是标题','date':'2018-09-08','act_content':'我是新闻内容我是新闻内容我是新闻内容我是新闻内容'},
        {'imgSrc':'./static/img/bg_img@2x.png','title':'我是标题','date':'2018-09-08','act_content':'我是新闻内容我是新闻内容我是新闻内容我是新闻内容'},
        {'imgSrc':'./static/img/bg_img@2x.png','title':'我是标题','date':'2018-09-08','act_content':'我是新闻内容我是新闻内容我是新闻内容我是新闻内容'}
      ]
    }
  },
  methods:{
    openProvincsList:function(){
      alert('打开省市列表');
    }
  },
   mounted:function(){  
        var that = this;
        var data="{}";
        axios({
            method:'get',
            url:'/wei/wxservice/wxservice?opName=getactiveinfo',
            params: {
              param:data,//系统类别
            }
        })
        .then(function(res) {//成功之后
            console.log(res)
                //console.log(res.data.data);
               //that.dataSource =  that.dataSource.concat(res.data.data.advertisementList);
        });
    }
}
</script>
<style>
.act_head{
  height:40px;
  box-sizing: border-box;
  padding:0 13px;
  line-height: 40px; 
  display:flex; /*父元素声明弹性盒*/
  margin-top:10px;
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
  margin-top:20px;
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
</style>

