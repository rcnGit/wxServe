<template>
    <div class='applysuc'>
        <div class='t1'>
            <img src='../../common/img/suc.png'style='width:28%;margin-top:20px;margin-bottom:20px;'/>
            <p>您的在线申请已提交，我们会在24小时内</p>
            <p style='margin-bottom:14px;margin-top:5px;'>({{exeTime}}前)联系您</p>
            <p style='padding-bottom:50px;'>感谢您的信任</p>
        </div>
        <div class='t2'>
            <p style="padding-top:30px;">您还可以</p>
            <p style='margin:10px 0 20px;'>立即拨打客服电话申请专属财富师</p>
            <img src='./img/kefu.png' style='width:28%;padding-bottom:14px;'/>
            <p style='font-size:15px;margin-bottom:3px;'>400-819-9868</p>
            <p style='padding-bottom:50px;'>8:30 - 17:30</p>
        </div>
    </div>
</template>
<script>
import comfooter from './components/footer';
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
        this.exeTime = this.$route.params.exeTime;
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
    font-size: 13px;
    color:rgb(153,153,153);
}
</style>

