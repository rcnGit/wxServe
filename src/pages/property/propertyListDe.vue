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
            <div class='noData'>
                <img src='../activeSign/img/nodataImg@2x.png'/>
                <p class='fSize14'>您还没在大唐开启投资之旅哦</p>
                 <mt-button type="danger" size="large" class='next' @click="dd()">去投资</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import axios from 'axios';
export default {
    name:'propertyListDe',
    components:{Button,axios},//使用mint-ui的button的组件
    methods:{
        dd:function(){
           alert(this.money('10000000.123445'));
        }
    }
    
}
</script>
<style>
@import 'propetry.css'; /* 引入toSign.css文件*/
.noData img{
    width:40%;
    margin:80px auto 0;
}
.noData p{
    color:rgb(197,197,197);
    margin-top:30px;
}
</style>


