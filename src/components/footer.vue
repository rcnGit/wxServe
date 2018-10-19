<template>
    <div class='comfooter'>
        <p style='padding-top:50px;'>中国证监会批准的大唐官方基金销售平台</p>
        <!-- <p>销售资格证书编号：000000333</p> -->
        <p>过往业绩不代表未来，市场有风险需谨慎</p>
        <p style='padding-bottom:50px;margin-top:20px; '>
            <a href='tel:400-819-9868'><span style="margin-right:10px">客服电话</span></a>|<span style="margin-left:10px" @click='downApp()'>APP下载</span>
        </p> 
    </div>
</template>
<script>
export default {
    name:'comfooter',
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
                window.location='https://itunes.apple.com/cn/app/tang-guan-er-da-tang-cai-fu/id1011675066?mt=8';
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //android
                window.location = 'http://interface.tdyhfund.com/tgmgmt/file/apk/DTTangGuan.apk'
            }
            }
    
            function isWeixinBrowser() {
                return (/micromessenger/.test(ua)) ? true : false;
            }
        }//down
    }
    
}
</script>
<style>
 .comfooter{
     background:#fff;
}
 .comfooter p{
    font-size: 13px;
    color:rgb(153,153,153);
    margin-bottom:12px;
}
.comfooter span{
    font-size: 14px;
    color:rgb(53,53,53);
} 
</style>

