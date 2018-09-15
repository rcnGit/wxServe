<template>
    <div class='minActive'>
        <div class='mineOne'>
            <div class='stateB redState'>报名成功</div>
            <p class='pTitle'>唐耀高尔夫全国巡回赛-大连站报名</p>
            <p class='pDate'>活动时间：<span class='dataSp'>2018-09-16</span></p>
            <p class='pAdd'>活动地点：<span class='addSp'>大连红旗谷高尔夫俱乐部</span></p>
            <p class='pState'>活动状态：参与意愿已提交给<span class='hrefWealth'>财富师某某某</span></p>
        </div>  <!--mineOne-->
        <div class='mineOne'>
            <div class='stateB grayState'>报名成功</div>
            <p class='pTitle'>唐耀高尔夫全国巡回赛-大连站报名</p>
            <p class='pDate'>活动时间：<span>2018-09-16</span></p>
            <p class='pAdd'>活动地点：<span>大连红旗谷高尔夫俱乐部</span></p>
            <p class='pState'>活动状态：参与意愿已提交给<span>财富师某某某</span></p>
        </div>  <!--mineOne-->
        <div class='mineOne'>
            <div class='stateB redState'>报名成功</div>
            <p class='pTitle'>唐耀高尔夫全国巡回赛-大连站报名</p>
            <p class='pDate'>活动时间：<span>2018-09-16</span></p>
            <p class='pAdd'>活动地点：<span>大连红旗谷高尔夫俱乐部</span></p>
            <p class='pState'>活动状态：参与意愿已提交给<span>财富师某某某</span></p>
        </div>  <!--mineOne-->
    </div>
</template>
<script>
export default {
    name:'minActive',

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
</style>


