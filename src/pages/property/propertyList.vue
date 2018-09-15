<template>
    <div class='propertyList fColorFFF'>
        <div class='headContent'>
                <p class='fSize13 p1'>总金额（元）</p>
                <p class='p2'>100000000</p> <!--在数字上加逗号 -->
                <p class='p3'>待确认：10000（元）</p><!--在数字上加逗号 -->
                <div>
                    <div class='floatLeft w50 inc_box' style='border-right:0.5px solid #efefef;'>
                        <p class='fSize13'>最新收益（元）</p>
                        <p class='p4'>+260000</p>
                    </div>
                    <div class='floatRight w50 inc_box'>
                        <p class='fSize13'>累计收益（元）</p>
                        <p class='p4'>+260000</p>
                    </div>
                </div>
        </div>
        <div class='proContent'>
            <div class='proDemo'>
                <div class='proTop'>
                    <img  class='floatLeft'/>
                    <span class='floatLeft bigP'>私募</span>
                    <span class='floatRight'>更新日期：<em>08-22</em></span>
                </div>
                <div style='clear:both'></div>
                <div class='proBot'>
                    <span class='floatLeft smP'>金额<em>0.00</em></span>
                    <span class='floatRight'>最新收益<em>+1000000</em></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import axios from 'axios';
export default {
    name:'propertyList',
    components:{Button,axios},//使用mint-ui的button的组件
}
</script>
<style>
@import 'propetry.css'; /* 引入toSign.css文件*/
</style>


