<template>
    <div class='activeSign'>
         <div class='business_card'>
            <div class='bus_L'><img src='./img/man_head_img@2x.png'/></div>
            <div class='bus_C'>
                <p class='position_name'>职位姓名</p>
                <p class='Invitation'>邀您参加大唐财富尊享活动</p>
            </div>
            <div class='bus_R'><img src='./img/rightBtn_img@2x.png'/></div>
         </div>  <!--business_card-->
        <div class='addressBox'>
          <div class='ad_m'>
              <p class='ad_tit'>大唐财富某某活动标题</p>
              <p class='ad_date'>2018.08.08-2018.09.09</p>
              <p class='ad_address'>北京市朝阳区东三环北路38号安联大厦22层</p>
          </div>
        </div>
        <div class='actDe'>
            <div class='nodata'>
                 <img src='./img/nodataImg@2x.png'/>
                 <p>暂无活动介绍</p>
            </div>
           
        </div>
         <mt-button type="danger" size="large" class='toSign'>我要报名</mt-button>

    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
export default {
    name:'ActiveDetail'
}
</script>
<style>
 .business_card{
    box-sizing: border-box;
    padding:0 20px;
    height:60px;
    display:flex;
    background-color:rgba(0,0,0,0.4);
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
    height:120px;
}
.ad_m{
    width:96%;
    margin:10px auto;
    padding: 0 20px 20px;
    padding-top:20px;
    text-align: left;
    background:url(./img/activeDbg@2x.png)no-repeat;
    background-size:100%;
}
.ad_tit{
    font-size: 20px;
    color:#000;
    margin-bottom:20px;
}
.ad_date{
    font-size: 14px;
    color:rgb(100, 98, 98);
    margin-bottom:10px;
}
.ad_address{
    font-size: 14px;
    color:rgb(100, 98, 98);
}
.actDe{
    width:96%;
    height:370px;
    margin:10px auto;
    border:1px solid #efefef;
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

