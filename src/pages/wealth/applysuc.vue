<template>
    <div class='applysuc'>
        <div style='height:1px;width:100%;'></div>
        <div class='t1'>
           
            <img src='./img/signSuc.png'style='width:22%;margin-top:40px;margin-bottom:18px;'/>
            <p style='margin-bottom:7px;'>您的在线申请已提交</p>
            <p style='margin-bottom:7px;margin-top:5px;'>我们会在2个工作日内联系您</p>
            <p style='padding-bottom:30px;'>感谢您的信任</p>
        </div>
        <div class='t2'>
            <p style="padding-top:30px;color:#333;font-size:15px;">您还可以</p>
            <p style='margin:10px 0 30px;font-size:15px;'>立即拨打客服电话申请专属财富师</p>
            <img src='./img/kefu.png' style='width:22%;padding-bottom:15px;'/>
            <p style='font-size:16px;margin-bottom:3px;color:#333;margin-bottom:7px;'>400-819-9868</p>
            <p style='padding-bottom:20px;color:#999'>8:30 - 17:30</p>
        </div>
        <comfooter></comfooter>
    </div>
</template>
<script>
import comfooter from '../../components/footer'
export default {
    name:'applysuc',
    data:function(){
        return{
            exeTime:''
        }
    },
    components:{comfooter},
    methods:{

    },
    mounted:function(){
       // this.exeTime = this.$route.query.exeTime;
        console.log(this.exeTime);
    }
}
</script>
<style>
.applysuc{
    width:100%;
    height:100%;
    background:#f2f2f2;
}
.t1,.t2{
    width:100%;
    min-height:100px;
    background:#fff;
    margin-top:10px;
}
.t1 p,.t2 p{
    font-size: 14px;
}
.t1{
    color:#333;
}
.t2{
    color:#333;
}
.applysuc .comfooter{
     position: fixed;
     bottom: 0;
 }
</style>

