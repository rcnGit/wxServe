<template>
    <div>
        <img src='./img/registesucc.png' class='registesucc_img'/>
        <div class="Review" >
            <p class='registe_p1'>注册成功</p>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { MessageBox } from 'mint-ui';
export default {
    name:'signSun',
    components:{Button},//使用mint-ui的button的组件
     data:function(){
        return{
        }
    },
    created(){
        this.GasyncSDKConifg()
    },
     


}
</script>
<style>
.registesucc_img{
    width: 3.36rem;
    margin-top: 3.893333rem;
    margin-bottom: .533333rem;

}
.registe_p1{
    font-size: .426667rem;
    color:#363636;
    line-height: .586667rem;
    font-weight: 600;
}

</style>

