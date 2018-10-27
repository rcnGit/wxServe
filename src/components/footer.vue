<template>
    <div class='comfooter' ref='comfooter' v-if='dibu'>
        <p style='padding-top:13px;'>中国证监会批准的大唐官方基金销售平台</p>
        <!-- <p>销售资格证书编号：000000333</p> -->
        <p>过往业绩不代表未来，市场有风险需谨慎</p>
        <p style='padding-bottom:13px;margin-top:20px; '>
            <a href='tel:400-819-9868'><span style="margin-right:10px">客服电话</span></a>|<span style="margin-left:10px" @click='downApp()'>APP下载</span>
        </p> 
    </div>
</template>
<script>

export default {
    name:'comfooter',
    data:function(){
        return{
            dibu:false,
        }
    },
    methods:{
        downApp:function() {
            let ua = navigator.userAgent.toLowerCase();
            //android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
            if(false) {//isWeixinBrowser()//判断是不是微信
                
            }else{
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                //ios
                //this.ShowPop = !this.ShowPop;
                //this.ShowDark = !this.ShowDark;
                window.location='https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf';
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //android
                window.location = 'https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf'
            }
            }
    
            function isWeixinBrowser() {
                return (/micromessenger/.test(ua)) ? true : false;
            }
        }//down
    },
    created:function(){
        var that=this;
        if(that.$route.query.comefrom=='tangguan'||that.$route.params.comefrom=='tangguan'){
            alert('tangguan2222222222');
            that.dibu=false;
        }else{
             that.dibu=true;
        }
    }
    
}
</script>
<style>
 .comfooter{
     width: 100%;
     background:#18171D;
}
 .comfooter p{
    font-size: 13px;
    color:rgb(53,53,53);
    margin-bottom:12px;
}
.comfooter span{
    font-size: 14px;
    color:rgb(53,53,53);
} 
</style>

