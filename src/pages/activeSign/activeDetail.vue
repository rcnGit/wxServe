<template>
    <div class='activeSign'>
         <div class='business_card' ref="card">
            <div class='bus_L'><img src='./img/man_head_img@2x.png'/></div>
            <div class='bus_C'>
                <p class='position_name'>职位姓名</p>
                <p class='Invitation'>邀您参加大唐财富尊享活动</p>
            </div>
            <div class='bus_R'><img src='./img/rightBtn_img@2x.png'/></div>
         </div>  <!--business_card-->
        <div class='addressBox'>
          <div class='ad_m'>
              <p class='ad_tit'>{{actName}}</p>
              <p class='ad_date'>{{beginTime}}——{{endTime}}</p>
              <p class='ad_address'>{{location}}</p>
          </div>
        </div>
        <div class='actDe'>
            <div class='nodata' style='display:none;' ref='nodata'>
                 <img src='./img/nodataImg@2x.png'/>
                 <p>暂无活动介绍</p>
            </div>
           <div>{{content}}</div>
        </div>
         <mt-button type="danger" size="large" class='toSign'@click='sign()'>我要报名</mt-button>

    </div>
</template>
<script>

import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { Indicator } from 'mint-ui';
import axios from 'axios'
export default {
    name:'ActiveDetail',
    data:function (){
        return{
            actName:'',
            beginTime:'',
            endTime:'',
            location:'',
            content:'',
             param:{
                 activeId:'',
                  pageNo:1
             },
            loadObj:{
                text: '加载中...',
                spinnerType:'triple-bounce'
            }
        }
       
    },
    methods:{
           getData:function(){
                let that = this;
                //console.log(that.param)
                axios({
                    method:'get',
                    url:'/wei/wxservice/wxservice?opName=getactiveinfo',
                    params: {
                        param:that.param,//系统类别
                    }
                })
                .then(function(res) {//成功之后
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    if(retCode!=0){
                        alert(retCode);
                    }
                    if(res.data.itemList.length<=0){
                        that.$refs.nodata.style.display='block';
                    }else{
                        var obj=res.data.itemList[0];
                       that.actName=obj.actName;
                       that.beginTime=obj.beginTime;
                        that.endTime=obj.endTime;
                        that.location=obj.location;
                        that.content=obj.content;
                    }
                   console.log(res.data.itemList[0]);  
                    Indicator.close();
                });
            },
            sign:function(){
                alert('我要报名');
            }
    },
    created(){
         var oaActId =this.$route.params.oaActId; 
         console.log(oaActId);
         let that = this; //这个是钩子函数mounted
        Indicator.open(that.loadObj);
        var ifCard=this.$route.params.ifCard;
        // if(ifCard!=''&&ifCard!=undefined){
        //     console.log('ifCard==='+ifCard);
        //     if(ifCard){
        //         this.$refs.card.style.display='flex';
        //     }
        // }
        if(oaActId!=''&&oaActId!=undefined){
            that.param.activeId=oaActId;
            console.log(that.param);
            that.getData();
        }
    } 

}

 	   
</script>
<style>
 .business_card{
    box-sizing: border-box;
    padding:0 20px;
    height:60px;
    display:flex;
    background-color:rgba(0,0,0,0.4);
    display: none;
}
.business_card .bus_L{
    width:45px;
    height:100%;
    float: left;
}
.bus_L img{
    width:50px;
    margin-top:6px;
}
.business_card .bus_C{
    height:100%;
     flex: 1; 
     box-sizing: border-box;
     padding: 14px 0 0px 15px;
} 
.business_card .bus_R{
    width:45px;
    height:100%;
    float: right;
} 
.bus_R img{
    width:14px;
    margin-top:14px;
    float:right;
}
.position_name{
    font-size: 15px;
    color:#fff;
    margin-bottom:8px;
}
.Invitation{
    font-size: 13px;
    color:#fff;
}
.addressBox{
    width:100%;
    height:149px;
}
.ad_m{
    width:96%;
    margin:10px auto;
    height:100%;    
    padding: 0 20px 0px;
    padding-top:20px;
    text-align: left;
    background:url(./img/activeDbg@2x.png)no-repeat;
    background-size:cover;
}
.ad_tit{
    font-size: 18px;
    color:#000;
    margin-bottom:20px;
    line-height:23px;
     overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
}
.ad_date{
    font-size: 14px;
    color:rgb(100, 98, 98);
    margin-bottom:7px;
}
.ad_address{
    font-size: 14px;
    color:rgb(100, 98, 98);
    line-height:18px;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
}
.actDe{
    width:96%;
    height:370px;
    margin:10px auto;
    border:1px solid #efefef;
    padding: 10px;
}
.toSign{
    width:90%;
    margin:22px auto 0;
}
.nodata img{
    width:150px;
    margin:50px auto 0;
}
.nodata p{
    font-size: 16px;
    color:rgb(57,66,89);
}
</style>

