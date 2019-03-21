<template>
    <div class="addServe">
        <div class="addServe-con" >
            <div class="mall btns"><img class="mall_btn" src="./img/mall.png" @click='mallBtn("1")'/></div>
            <div class="interests btns"><img class="interests_btn" src="./img/interests.png" @click='mallBtn("2")'/></div>
        </div>
        <img src="./img/jifen.png" class="jifen" @click='jifen'/>
        <div class="footer"><img src="./img/shengtang.png"/></div>
        
        <mt-popup v-model="popupVisible" position="center" pop-transition="popup-fade" :closeOnClickModal='clickfalse'>
            <div class='pop_contant pop_contant_B' ref='pop_contant'>
                <div class='popImgBox_B'>
                    <img src="./img/jifenrules.png"  class="jifenrules"/>
                    <img src="./img/close.png"  class="closes" @click="closes"/>
                </div>
            </div> <!--pop_contant -->
          </mt-popup> 
    </div>
    
</template>
<script>
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { MessageBox } from 'mint-ui';
import { Popup } from 'mint-ui';//底部出来的弹框
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { getCookie,setCookie } from '@/common/js/cookie.js'
import axios from 'axios';
import merge from 'webpack-merge'
export default {
    name:'addServe',
    component:{Button,MessageBox,Toast,Indicator},
     data:function(){
        return{
            clickfalse:false,
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone:''
            },
            loadObj:{
                text: '加载中...',
                spinnerType:'triple-bounce'
            },
            paramurl: location.href.split('?')[0],
            isPhone:'',
            userId:'',
            popupVisible: false
        }
    },
    created(){
        this.GasyncSDKConifg()
       // Indicator.open(this.loadObj);
        var bizId=decodeURIComponent(getCookie("bizId"));
        this.faceparam.bizId = bizId
        if(!this.$route.query.faceResult == false){
           this.getfaceId()
        }else{
           // this.getData()
           if(!this.$route.query.clickSource == false){
            //绑定完手机号
                var id=this.$route.query.clickSource //1积分商城，2客户权益
                this.getData(id)
            }
            if(!this.$route.query.actId==false){ //重定向后 
                var id=this.$route.query.actId;
                this.getData(id)
            }
        }
    },
    mounted:function(){
        $('.addServe').css({"min-height":document.body.scrollHeight})
    },
    methods: {
        jifen:function(){ //积分规则
           this.popupVisible = true 
        },
        closes:function(){
            this.popupVisible = false 
        },
        mallBtn:function(id){ //点击调取授权
            this.getData(id)
        },
        getData:function(id){
            Indicator.open();
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
                if(retCode=='0'){
                    that.userId=res.data.userInfo.tgUserId //app需要的userId
                    if(res.data.userInfo.authenticFlag == 0){
                        if(!res.data.userInfo.phone==false){
                            that.isPhone='1'
                        }else{
                            that.isPhone='0'
                        }
                        var message = '为获取您的积分信息/客户权益，请先人脸识别身份认证。';      
                        MessageBox.confirm('', {
                            message: message,
                            title: '',
                            showCancelButton:false,
                            confirmButtonText:'去认证',
                        }).then(action => {
                            MessageBox.close(false)
                            if(action == 'confirm'){
                                that.$router.push({
                                    path:'/faceMsg',
                                    name:'faceMsg',
                                    query:{
                                        returnUrl:that.Host+'weixin-h5/index.html#/addServe?isPhone='+that.isPhone+'&clickSource='+id+'&userId='+that.userId,
                                    }
                                })
                            }
                        }).catch(err => {
                        //取消按钮
                            if(err == 'cancel'){  
                            }
                        })
                     
                    }else{
                        if(!res.data.userInfo.phone==false){
                            //有绑定手机号进入积分
                            //alert('userId='+that.userId)
                            window.location.href = that.tgHostSer+'/value_added.html?source=2&clickSource='+id+'&userId='+that.userId  
                        }else{
                            var message = '为顺利进行积分兑换/客户权益，请先绑定手机号。';      
                            MessageBox.confirm('', {
                                message: message,
                                title: '',
                                showCancelButton:false,
                                confirmButtonText:'去绑定',
                            }).then(action => {
                                if(action == 'confirm'){
                                    that.$router.push({
                                        path:'/bdphone',
                                        name:'bdphone',
                                        query:{
                                            returnUrl:that.Host+'weixin-h5/index.html#/addServe',
                                            bdfrom:'addServe',
                                            clickSource: id,
                                        }
                                    })
                                }
                            }).catch(() => {
                                //取消按钮
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
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=addServe_'+id+'#wechat_redirect';
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
               var returnUrl = that.Host+'weixin-h5/index.html#/addServe?phone='+that.faceparam.phone+'&clickSource='+that.$route.query.clickSource
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
                    that.getData(that.$route.query.clickSource)
                    // if(that.$route.query.isPhone == '1'){ //有绑定手机号
                    //     //跳页面
                    //     alert('userId='+that.$route.query.userId)
                    //     window.location.href='https://test-interface.tdyhfund.com:8443/dthtml/HTML5/DTCF/html/valueAddedServices/value_added.html?source=2&clickSource='+that.$route.query.clickSource+'&userId='+that.$route.query.userId 
                    // }else{
                    //     setTimeout(function(){
                    //         that.$router.push({
                    //             path:'/bdphone',
                    //             name:'bdphone',
                    //             query:{
                    //                // returnUrl:that.Host+'weixin-h5/index.html#/addSwrve?isPhone='+that.$route.query.isPhone+'&clickSource='+that.$route.query.clickSource,
                    //                 bdfrom:'addServe',
                    //                 clickSource: that.$route.query.clickSource,
                    //             }
                    //         })
                    //     },3000);
                    // }
                    
                    return;
                }else{
                    that.trafficStatistics('020')
                    //if(!that.$route.query.idNo == false){
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
                                var canshu=returnUrl+'&tp='+type+'&idNo='+idCardNo+'&name='+encodeURIComponent(that.$route.query.name)
                                that.getface(idCardNo,idCardName,canshu,type)
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                
                            }
                        })

                    // }else{
                    
                    // var message = '人脸识别身份认证失败，请重试';      
                    // MessageBox.confirm('', {
                    //     message: message,
                    //     title: '',
                    //     showCancelButton:true,
                    //     confirmButtonText:'重新认证',
                    //     cancelButtonText:'取消',
                    // }).then(action => {
                    //     if(action == 'confirm'){
                    //         that.$router.push({
                    //             path:'/faceMsg',
                    //             name:'faceMsg',
                    //             query:{
                    //                 returnUrl:that.Host+'weixin-h5/index.html#/addServe?isPhone='+that.$route.query.isPhone+'&clickSource='+that.$route.query.clickSource+'&userId='+that.$route.query.userId ,
                    //             }
                    //         })
                    //     }
                    // }).catch(err => {
                    //     //取消按钮
                    //     if(err == 'cancel'){
                            
                    //     }
                    // })
                    // return;
                    // }
                    return;
                }
            })
        },
        refash:function(){
            location.reload();
        }
    }

}
</script>
<style>
.addServe{
    width:100%;height:100%;
    padding-top: .96rem;
    box-sizing: border-box;
    background:url(./img/valueAdded.png);
    background-repeat:no-repeat;
    background-size:100% 100%;
    min-height: 16.2rem;
}
.addServe-con{width:100%;}
.mall{width: 100%;height: 5.706667rem;}
.mall img{width:100%;height: 100%;}
.interests{width:100%;height: 5.666667rem;}
.interests img{width: 100%;height: 100%;}
.jifen{width: 3rem}
.footer{width: 100%;height: 2.706667rem;margin-top: .3rem;
/* position: fixed;bottom: 0; */
}
.footer img{width: 100%;height: 100%;}
.erromsg{width: 1.68rem;margin: 4rem auto .4rem;}
.no_web{font-size: .373333rem;text-align:center;margin-bottom: .666667rem;color:#2a2a2a;}
.refashed{
    width: 4.053333rem;
    height:.96rem;
    margin:0 auto;
    border:1px solid #ffb8b8;
    border-radius: 1.066667rem;
    color:#ef2727;
    font-size:.373333rem;
    font-weight:bold;
    text-align:center;
    line-height: .96rem;
} 
.pop_contant_B{
width: 9.2rem !important;
background-size:cover!important;
height:14rem!important;
}
.mint-popup.mint-popup-center{
    border-radius: 10px;
}
.popImgBox_B{   
    background: #FEF7F4;
    padding: 0!important;
    width:100%;
    overflow: hidden;
    height: 14rem;
    overflow: auto;
    border-radius: 15px;
    position: relative;
}
.popImgBox_B .jifenrules{
    width:100%;
} 

.closes{
    position: fixed;
    top: .3rem;
    right: .6rem;
    width: .373333rem;
    height: .373333rem;
    display: block;
}
::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
}
</style>

