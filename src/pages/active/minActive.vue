<template>
    <div class='minActive' style="min-height:200px;">
        <div class='mineOne' v-for="item in items" :oaActId='item.actId' :actName='item.actName' @click='en_details($event)'>
            <div class='stateB redState'v-show='!item.cancelReasonFlag&&!item.reasonFlag&&!cancelSignupReasonFlag'>{{item.statusValue}}111</div>
            <div class='stateB grayState'v-show='item.reasonFlag'>{{item.statusValue}}222</div>
            <div class='stateB grayState'v-show='item.cancelReasonFlag'>{{item.statusValue}}333</div>
            <p class='pTitle'>{{item.actName}}</p>
            <p class='pDate'>活动时间：<span class='dataSp'>{{item.beginTime}}</span></p>
            <p class='pAdd'>活动地点：<span class='addSp'>{{item.location}}</span></p>
            <p class='pState' v-if='item.applyFlag'  @click.stop='openCFScard(item.businessCode)'>活动状态：您的申请意愿已提交给财富师<span class='hrefWealth'>{{item.businessName}}</span></p>
            <p class='pState' v-if='item.businessFlag'  @click.stop='openCFScard(item.businessCode)'>邀请财富师<span class='hrefWealth'>{{item.businessName}}</span></p>           
            <p class='pState' v-show='item.reasonFlag'>失败原因：{{reason(item.reason)}}</p>
            <p class='pState' v-show='item.cancelReasonFlag' style="overflow:auto;">取消原因：{{item.cancelReason}}</p>
            <p class='pState' v-show='item.cancelSignupReasonFlag' style="overflow:auto;">取消原因：{{item.cancelSignupReason}}</p>
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

          <div class='noData' ref='nodata' v-if='isShow' style="padding-bottom:50px;">
            <img src='./img/nomessage@2x.png'/>
            <p class='fSize16'>您还没有参与活动哦~</p>
          </div>
          <div class='wz' style="background:#fff;" v-show='wzIfShow'>
            <img src='../../common/img/wr.png'  style='width:40%;margin:80px auto 30px;'/>
            <p class='fSize16' style='color:rgb(59,59,59)'>绑定手机号可查看我的活动哦~</p>
        <mt-button type="danger" size="large" class='next' @click='bd()' style='margin-top:81px;'>去绑定手机号</mt-button>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import axios from 'axios';
import { getCookie,setCookie } from '@/common/js/cookie.js'
export default {
    name:'minActive',
    data:function(){
        return{
            load:true,
            comefrom:'',
            loadObj:{
                text: '加载中...',
                spinnerType: 'triple-bounce',

            },
            iSscroll:0,
            isShow:false,
            wzIfShow:false,
            items:[],
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxMemberInfo/getCustActList'),//接口
            paramurl: location.href.split('?')[0]
        }
    },
    methods:{
        reason:function(r){
            var str;
            if(r==0){
                str='名额已满';
            }else if(r==1){
                str='不符合报名条件';
            }else if(r==2){
                str='其他';
            }
            return str;
        },
        openCFScard:function(id){
            //打开我的财富师名片
            alert(id)
            window.location.href='http://172.16.6.59:8887/tcapi/HTML5/html/shared_card.html?userId='+id;
        },
        bd:function(){//去实名认证
            this.$router.push({
                    path:'/bdphone',
                    name:'bdphone',
                    query:{
                        returnUrl:this.Host+'weixin-h5/index.html#/minActive',
                         bdfrom:'minActive'
                    }
                })
        },
        getdata:function(){
             var that=this;
             Indicator.open();
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getCustActList',//获取我的活动    、、comefrom="tangguan"
                params: {
                backUrl: that.paramurl
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                var data=res.data.data;
                if(retCode==0){
                    if(data.length>0){
                        that.items=data
                        return;
                    }else{
                        that.isShow=true;
                        return;
                    }
                }else if(retCode==-2){
                    that.wzIfShow=true;
                        return;
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxMemberInfo/getCustActList'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=minActive#wechat_redirect';
                }else{
                    that.isShow = true;
                   // MessageBox('提示', retMsg);
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                    return;
                }
                
                  
            });
        },
        en_details:function(e){
            var that=this;
            // console.log(event.target);
            // console.log(event.target.getAttribute('oaactid'))//点击到的元素
            var oaActId=event.currentTarget.getAttribute('oaActId');//绑定事件的元素
            var actName=event.currentTarget.getAttribute('actName');//绑定事件的元素
            that.$router.push({
                path:'/ActiveDetail',
                name:'ActiveDetail',
                query:{
                    oaActId:oaActId,
                    actName:actName,
                    ifCard:true,
                    comefrom:that.comefrom
                }
                })
            },
    },
    created:function(){
         let that = this;
         alert('我的活动')
          that.getdata();
        // 我的活动不用人脸识别
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
     height:15px;
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


