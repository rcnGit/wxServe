<template>
    <div class='designatedW' >
        
    </div>
</template>
<script>
import axios from 'axios';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
import comfooter from '../../components/footer'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import merge from 'webpack-merge'
export default {
    name:'designatedW',
    data:function(){
        return{
            wname:'李悦',
            cgh:'',
            authenticFlag:'',//是否需要身份认证
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=getUserInfo'),//接口
            paramurl: location.href.split('?')[0],
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone:''
            },
             ifCardShow:false,
             dtName:'',
             dtNo:'',
             mobile:'',
             sourceModule:'',
             channel:'', //1来自糖罐   2来自微信服务号
        }
    },
    methods:{
        getData:function(){
            let that = this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取用户信息
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                 Indicator.close();
                 var retCode=res.data.retCode;
                 var Data = res.data
                if(retCode=='0'){
                    //alert(that.dtNo+'&mobile='+that.mobile+'&dtName='+that.dtName)
                    if(res.data.userInfo.authenticFlag == 0){
                        that.$router.push({
                            path:'/faceMsg',
                            name:'faceMsg',
                            query:{
                                returnUrl:that.Host+'weixin-h5/index.html#/designatedW?dtNo='+that.dtNo+'&mobile='+that.mobile+'&dtName='+that.dtName+'&sourceModule='+that.sourceModule+'&channel='+that.channel,
                            }
                        })   
                    }else{
                        if(!res.data.userInfo.businessName==false){//我的财富师
                            that.$router.push({
                                path:'/wealthCard',
                                name:'wealthCard',
                                query:{
                                    dtName: res.data.userInfo.businessName,
                                    userId: that.dtNo,
                                    sourceModule: that.sourceModule,
                                    channel: that.channel,
                                }
                            })
                        }else{
                            that.$router.push({
                                path:'/appointW',
                                name:'appointW',
                                query:{
                                    dtNo:that.dtNo,
                                    mobile:that.mobile,
                                    dtName:that.dtName
                                }
                            })
                        }
                    }
                 
                }else if(retCode=='-1'){//系统异常
                    //MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=designatedW_'+that.dtNo+','+that.mobile+','+that.dtName+','+that.sourceModule+','+that.channel+'#wechat_redirect';
                }
            })
        },
        getfaceId:function(){
            this.faceparam.phone = this.$route.query.phone
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                Indicator.close();
                var retCode=res.data.retCode;
               // var returnUrl = that.$route.query.returnUrl;
               var returnUrl = that.Host+'weixin-h5/index.html#/designatedW?dtNo='+that.$route.query.dtNo+'&mobile='+that.$route.query.mobile+'&dtName='+encodeURIComponent(that.$route.query.dtName)+'&sourceModule='+that.$route.query.sourceModule+'&channel='+that.$route.query.channel
               //修改原有参数        
                that.$router.push({
                    query:merge(that.$route.query,{'faceResult':''})
                })
                if(retCode == '0'){
                    that.trafficStatistics('019')
                    Toast({
                        message: '人脸识别成功',
                        position: 'center',
                        duration: 3000
                    });
                    setTimeout(function(){
                        that.dtNo=that.$route.query.dtNo
                        that.mobile=that.$route.query.mobile
                        that.dtName=encodeURIComponent(that.$route.query.dtName);
                        that.getData()
                    },3000);
                    return;
                }else{
                    that.trafficStatistics('020')
                   // if(!that.$route.query.idNo == false){
                        var message = '人脸识别身份认证失败，请重试。'
                        MessageBox.confirm('', {
                            message: message,
                            title: '',
                            confirmButtonText:'重新识别',
                            cancelButtonText:'取消'
                        }).then(action => {
                            if(action == 'confirm'){
                                var idCardNo=that.$route.query.idNo
                                var idCardName=decodeURIComponent(that.$route.query.name)
                                var type = that.$route.query.tp
                                var canshu=returnUrl+'&phone='+that.$route.query.phone+'&idNo='+idCardNo+'&name='+encodeURIComponent(that.$route.query.name)+'&tp='+type 
                                that.getface(idCardNo,idCardName,canshu,type)
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                WeixinJSBridge.call('closeWindow'); 
                            }
                        })

                //     }else{
                //     var message = '人脸识别身份认证失败，请重试';      
                //     MessageBox.confirm('', {
                //         message: message,
                //         title: '',
                //         showCancelButton:true,
                //         confirmButtonText:'重新认证',
                //         cancelButtonText:'取消',
                //     }).then(action => {
                //         if(action == 'confirm'){
                //             that.$router.push({
                //                 path:'/faceMsg',
                //                 name:'faceMsg',
                //                 query:{
                //                     returnUrl:that.Host+'weixin-h5/index.html#/designatedW?dtNo='+that.$route.query.dtNo+'&mobile='+that.$route.query.mobile+'&dtName='+encodeURIComponent(that.$route.query.dtName)+'&sourceModule='+that.$route.query.sourceModule+'&channel='+that.$route.query.channel,
                //                 }
                //             })
                //         }
                //     }).catch(err => {
                //         //取消按钮
                //         if(err == 'cancel'){
                            
                //         }
                //     })
                //     
                // }
                return;
                }
            })
        },

    },
    created:function(){
        this.GasyncSDKConifg()
           Indicator.open();
           var bizId=decodeURIComponent(getCookie("bizId"));
            this.faceparam.bizId = bizId
            if(!this.$route.query.faceResult == false){
                this.getfaceId();
            }else{
                if(!this.$route.query.actId==false){ //重定向后
                    var wxstr = this.$route.query.actId;
                 //var wxstr =decodeURIComponent(that.$route.query.actId);
                // alert(wxstr) 
                    this.dtNo=wxstr.split(",")[0];
                    this.mobile=wxstr.split(",")[1];
                    this.dtName=encodeURIComponent(wxstr.split(",")[2]);
                    this.sourceModule=wxstr.split(",")[3];
                    this.channel=wxstr.split(",")[4];
                }else{
                    this.dtNo=this.$route.query.dtNo
                    this.mobile=this.$route.query.mobile
                    this.dtName=encodeURIComponent(this.$route.query.dtName);
                    this.sourceModule = this.$route.query.sourceModule
                    this.channel=this.$route.query.channel
                }
                this.getData()
            }


    },
    components:{Indicator,MessageBox,comfooter}
}
</script>
<style>
/* .comfooter{
    display: none!important;
} */
html{
      background:#fff;  
}
.wealthCardD{
     min-height:300px;
     background:#fff; 
     padding-bottom:30px;
}
.bg{
      background:url(./img/bg_new@2x.png)no-repeat;
      background-size:100%;
}
.wImg{
    width:2.67rem;
    padding-top:1.17rem;
}
.wname{
    font-size: 16px;
    color:rgb(59,59,59);
    margin:0 28px;
}
.intr{
    margin-top:0.83rem;
     font-size: 14px;
    color:#999;
}
.int_gg{
    margin:0 20px;
    color:#707070;
}
.wealthCardD .comfooter{
     position: fixed;
     bottom: 0;
 } 
</style>


