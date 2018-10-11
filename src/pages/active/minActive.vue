<template>
    <div class='minActive' style="min-height:200px;">
        <div class='mineOne' v-for="item in items" :oaActId='item.actId' :actName='item.actName' @click='en_details($event)'>
            <div class='stateB redState'v-show='!item.reasonFlag'>{{item.statusValue}}</div>
            <div class='stateB grayState'v-show='item.reasonFlag'>{{item.statusValue}}</div>
            <p class='pTitle'>{{item.actName}}</p>
            <p class='pDate'>活动时间：<span class='dataSp'>{{item.beginTime}}</span></p>
            <p class='pAdd'>活动地点：<span class='addSp'>{{item.location}}</span></p>
            <p class='pState hrefWealth' v-if='item.businessFlag'>邀请财富师{{item.businessName}}</p>
            <p class='pState' v-show='item.reasonFlag'>失败原因：{{item.reason}}</p>
        </div>  <!--mineOne-->
        <!-- <div class='mineOne'>
            <div class='stateB grayState'>报名成功</div>
            <p class='pTitle'>唐耀高尔夫全国巡回赛-大连站报名</p>
            <p class='pDate'>活动时间：<span>2018-09-16</span></p>
            <p class='pAdd'>活动地点：<span>大连红旗谷高尔夫俱乐部</span></p>
            <p class='pState'>活动状态：参与意愿已提交给<span class='hrefWealth'>财富师某某某</span></p>
        </div>  
        <div class='mineOne'>
            <div class='stateB redState'>报名成功</div>
            <p class='pTitle'>唐耀高尔夫全国巡回赛-大连站报名</p>
            <p class='pDate'>活动时间：<span>2018-09-16</span></p>
            <p class='pAdd'>活动地点：<span>大连红旗谷高尔夫俱乐部</span></p>
            <p class='pState'>活动状态：参与意愿已提交给<span>财富师某某某</span></p>
        </div>   -->
        <div class='loading' style="font-size:18px;color:rgb(59,59,59);line-height:50px;display:none;">
            加载中，请稍后......
          </div>
          <div class='loader'ref='loader' style="font-size:18px;color:rgb(59,59,59);line-height:50px;display:none;">
            已经到底了
          </div>

          <div class='noData' ref='nodata' v-if='isShow'>
            <img src='./img/nomessage@2x.png'/>
            <p class='fSize16'>您还没有参与活动哦~</p>
          </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import axios from 'axios';
export default {
    name:'minActive',
    data:function(){
        return{
            allList:[],
            load:true,
            loadObj:{
                text: '加载中...',
                spinnerType: 'triple-bounce',

            },
            isShow:false,
            items:[],
            rowId:0,
        }
    },
    methods:{
        getdata:function(){
             var that=this;
             Indicator.open(that.loadObj);
            axios({
                method:'get',
                url:'/ning/wxservice/wxMemberInfo/getCustActList',//获取我的活动comefrom="tangguan"
                params: {
                rowId:that.rowId,//系统类别
                }
            })
            .then(function(res) {//成功之后
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                console.log(res.data);
                var data=res.data.data;
                if(retCode==0){//指定成功
                    Indicator.close();
                    //that.items=data.actList;
                    that.rowId=data.rowId;
                    if(res.data.actList != ''){
                        that.allList=that.allList.concat(data.actList);//把已获取的数据和新获取的数据合并在放入页面
                        
                        if(that.allList.length==0||that.allList==undefined){//
                            that.isShow=true;
                            //console.log(that.isShow);
                            return;
                        }else{
                            that.isShow=false;
                        }
                        that.items=that.allList
                        if(data.actList&&data.actList.length<10){
                            that.load=false;
                        }
                    }else{
                        that.isShow = true;
                    }
                }else{
                    MessageBox('提示', retMsg);
                }
                
                  
            });
        },
        en_details:function(e){
            var that=this;
            // console.log(event.target);
            // console.log(event.target.getAttribute('oaactid'))//点击到的元素
            var oaActId=event.currentTarget.getAttribute('oaActId');//绑定事件的元素
            var actName=event.currentTarget.getAttribute('actName');//绑定事件的元素
            this.$router.push({
                path:'/ActiveDetail',
                name:'ActiveDetail',
                params:{
                    oaActId : oaActId,
                    actName:actName,
                    ifCard:true
                }
                })
            },
    },
    mounted:function(){
        var that=this;
         that.getdata();
    },
    created:function(){
          let that = this;
            window.onscroll = function(){
                
                //变量scrollTop是滚动条滚动时，距离顶部的距离
                var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
                //变量windowHeight是可视区的高度
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
                //滚动条到底部的条件
                console.log(scrollTop+windowHeight==scrollHeight)
                if(scrollTop+windowHeight==scrollHeight){//有问题
                //写后台加载数据的函数
                console.log('到底了'+!that.load)
                    if(!that.load){
                        
                    that.$refs.loader.style.display='block';
                    return;
                    }
                Indicator.open(that.loadObj);
                that.getdata();
                }   
            }
    }

}
</script>
<style>
body{
    width:100%;
    background:#f2f2f2;
}
.mineOne{
    width:100%;
    min-height:100px;
    background:#fff;
    margin-top:10px;
    padding:20px 14px;
    text-align: left!important;
    position: relative;
}
.pTitle{
    font-size: 15px;
    color:rgb(59,59,59);
}
.pDate,.pAdd,.pState{
     font-size: 13px;
    color:rgb(99,99,99);
}
.pDate{
    margin-top:15px;
}
.pAdd{
    margin-top:10px;
}
.pState{
    margin-top:10px;
}
.stateB{
    position: absolute;
    width:75px;
    height: 20px;
    right:0;
    top:0px;
    line-height: 20px;
    font-size: 12px;
    color:#fff;
    text-align: center
}
.redState{
    background: url(./img/red_img@2x.png) no-repeat;
    background-size: 100%;
}
.grayState{
    background: url(./img/gray_img@2x.png) no-repeat;
    background-size: 100%;
}
.hrefWealth{
    color:rgb(76,136,255);
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


