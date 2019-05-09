<template>
    <div class='wealthCardD' >
        <div v-if="ifCardShow">
            <div class='bg'>
                <!-- <p style='font-size:16px;color:rgb(53,53,53);padding-top:20px;font-weight:700;'>专属财富师</p> -->
                <p style='font-size:0.37rem;color:#333;padding-top: 1.1rem;text-align:center;'>您还未指定财富师，立即指定，尊享贴身服务</p>
                <img src="./img/w.png" class='wImg' ref='pic'/>
                    <div style='margin:24px auto 20px;'>
                        
                        <p class='intr'><span>优选产品</span><span class='int_gg'>|</span><span>财富师动态</span><span class='int_gg'>|</span><span>专属活动</span></p>
                    </div>
                    
            </div>        
                    
            
                <mt-button type="danger" size="large" class=''@click='zhid()' style='width:7.6rem!important;margin-top:1.33rem!important;'>立即指定您的专属财富师</mt-button>
         </div>  <!--show-->
         <comfooter></comfooter>
    </div>
</template>
<script>
let Base64 = require('js-base64').Base64;
import axios from 'axios';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
import comfooter from '../../components/footer'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import merge from 'webpack-merge'
export default {
    name:'wchoose',
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
        }
    },
    methods:{

        zhid:function(){
            var that=this;
            if(that.authenticFlag==0){//未认证
                that.$router.push({
                    path:'/faceMsg',
                    name:'faceMsg',
                    query:{
                        returnUrl:that.Host+'weixin-h5/index.html#/appointW?reform='+that.$route.query.reform,
                    }
                })
            }else{//已认证
                that.$router.push({
                    path:'/appointW',
                    name:'appointW',
                    query:{
                        reform: that.$route.query.reform
                    }
                })
            }
            
           
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
                console.log(res.data);
                 Indicator.close();
                var retCode=res.data.retCode;
                //var returnUrl = that.$route.query.returnUrl;
                var returnUrl = that.Host+'weixin-h5/index.html#/wchoose'
                //修改原有参数        
                that.$router.push({
                    query:merge(that.$route.query,{'faceResult':''})
                })
                if(retCode == '0'){
                    that.trafficStatistics('019')
                    //MessageBox('提示','人脸识别成功');
                    Toast({
                        message: '人脸识别成功',
                        position: 'center',
                        duration: 3000
                    });
                    return;
                }else if(retCode == '-2'){
                    that.trafficStatistics('017')
                    that.trafficStatistics('020')
                   MessageBox('','该身份证已绑定其他手机号');
                    return;
                }else if(retCode == '-1'){
                    that.trafficStatistics('020')
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });                    
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
                                var canshu=returnUrl+'?phone='+that.$route.query.phone+'&idNo='+idCardNo+'&name='+encodeURIComponent(that.$route.query.name)+'&tp='+type 
                                that.getface(idCardNo,idCardName,canshu,type)
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                
                            }
                        })

                    // }else{
                    //     var message = '人脸识别身份认证失败，请重试。若无法完成人脸识别身份认证可'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">【下载大唐财富app】</a>'+'，通过绑卡完成身份认证后指定财富师。'
                    //     MessageBox.confirm('', {
                    //         message: message,
                    //         title: '',
                    //         showConfirmButton:true,
                    //         confirmButtonClass:'confirmButton',
                    //         confirmButtonText:'重试',
                    //     }).then(action => {
                    //         if(action == 'confirm'){
                    //                 //跳转财富师名片页面
                    //             that.$router.push({
                    //                 path:'/faceMsg',
                    //                 name:'faceMsg',
                    //                 query:{
                    //                 returnUrl:returnUrl,
                    //                 }
                    //             })
                    //         }else{
                    //             //跳转财富师名片页面
                    //             that.$router.push({
                    //                 path:'/faceMsg',
                    //                 name:'faceMsg',
                    //                 query:{
                    //                 returnUrl:returnUrl,
                    //                 }
                    //             })
                    //         }
                    //     }).catch(() => {
                            
                    //     })
                    // }
                    return;
                }
                // else if(retCode == '-3'){
                //     that.trafficStatistics('020')
                //     MessageBox('','人脸识别未通过');
                //     return;
                // }else if(retCode == '-4'){
                //     that.trafficStatistics('020')
                //     MessageBox('','未查询到人脸识别结果');
                //     return;
                // }
            })
        },
        pming:function(){
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/checkApplyWealther',//判断有没有名片
                params: {
                    
                }
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                if(retCode=='-1'){//系统异常
                   // MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }else{
                    var mployment=res.data.data.mployment;
                    that.$refs.pic.src='res.data.data.photo'//财富师头像
                     if(mployment==0){//有名片
                        var urlCan='{"userId":"'+that.cgh+'","sourceModule":"2","channel":"2"}'
                        urlCan = Base64.encode(urlCan);	
                        //打开我的财富师名片
                        window.location.href=that.tgHost+'?paramCan='+urlCan
                      //   window.location.href=that.tgHost+'?userId='+that.cgh+'&sourceModule=2&channel=2';
                        // window.location.href=that.Host+'weixin-h5/index.html#/wealthCard?userId='+that.cgh+'&sourceModule=2&channel=2&mobile_switch='
                        }else{//没有名片
                         that.$router.push({//跳入本地名片代理页面
                             path:'/wealthCardD',
                             name:'wealthCardD',
                             query:{
                                 gh:that.gh
                             }
                          })
                     }
                }
            })
        }

    },
    created:function(){
        this.GasyncSDKConifg()
          var that=this;

           Indicator.open();
           var bizId=decodeURIComponent(getCookie("bizId"));
            this.faceparam.bizId = bizId
            if(!this.$route.query.faceResult == false){
            this.getfaceId();
            }


            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//判断是否有财富师
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                var retCode=res.data.retCode;
                var isApplyWealther=res.data.isApplyWealther;
                 Indicator.close();
               /* if(isApplyWealther==1){//正在申请的状态
                    that.$router.push({//跳入本地名片代理页面
                             path:'/applysuc',
                             name:'applysuc',
                             query:{
                                 gh:that.gh
                             }
                          })
                }*/
                if(retCode=='0'){
                    var belongBusiness=res.data.userInfo.belongBusiness;
                    that.cgh=belongBusiness;//财富师工号
                    if(!belongBusiness||belongBusiness==''||belongBusiness==undefined){//没有财富师
                        that.authenticFlag=res.data.userInfo.authenticFlag;
                       that.ifCardShow=true;
                      
                        return;
                       
                    }else{
                        //有财富师
                         that.ifCardShow=false;
                        that.wname=res.data.userInfo.businessName;
                       // that.pming();
                       var urlCan='{"userId":"'+belongBusiness+'","sourceModule":"2","channel":"2"}'
                        urlCan = Base64.encode(urlCan);	
                        //打开我的财富师名片
                        window.location.href=that.tgHost+'?paramCan='+urlCan
                      // window.location.href=that.tgHost+'?userId='+belongBusiness+'&sourceModule=2&channel=2';
                      // window.location.href=that.Host+'weixin-h5/index.html#/wealthCard?userId='+belongBusiness+'&sourceModule=2&channel=2&mobile_switch='
                    }
                }else if(retCode=='-1'){//系统异常
                    //MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }else if(retCode=='-2'){//此客户未购买任何产品

                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=wchoose#wechat_redirect';
                }
            })
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


