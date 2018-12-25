<template>
    <div id='appointW' class="overlayer" @touchmove.prevent>
        <div class='content'>
            <div class='tip'>
             <span>请输入财富师姓名与工号进行关联</span>
            </div>
            <div class='inpBox'>
                <input type='text' class='' maxlength='30' placeholder="请输入财富师的姓名" v-model='wName' ref='wName' />
                <P ref='warnName' class='warn'>{{warnName}}</P>
                <span>姓名</span>
                <em>请输入正确的实名信息</em>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='tel' class=''placeholder='请输入财富师工号后七位数字'maxlength='7'  v-model='gh'ref='gh'/>
                <P ref='ghw' class='warn'>{{warnGh}}</P>
                <span>工号DT</span>
                <em>请输入正确的实名信息</em>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->             
             <div style='clear:both'></div>
             <mt-button type="danger" size="large" class='next' @click='appW()'style='width:7.6rem;height:1.06rem;'>确认</mt-button>
             <div class='sendM' @click='sendWX()'>不清楚工号，给财富师发微信/短信索取工号&nbsp;&nbsp;></div>
         </div> <!--content-->
         <div style='width:100%;height:10px;background:#f9f9f9;'></div>
         <div class='content' style='padding:0;'>
             <div class='applyLine'>
                 <p>若无心仪财富师可联系客服为您推荐财富师</p>
                 <mt-button type="danger" size="large" class='next' @click='onlineApplyV()' style='background:#fff!important;color:#df1e1d;border:1px solid #df1e1d!important;width:50%!important;margin-top:20px!important;height:1rem!important;'>在线申请</mt-button>
             </div>
           
         </div>
         <mt-popup v-model="popupVisible" position="bottom" pop-transition="popup-fade">
           <div class='pop_contant' ref='pop_contant' style='display:none;'>
               <p class='pop_title'>联系财富师</p>
               <div class='popImgBox'>
                   <img src='./img/wx.png' class='floatLeft'/>
                   <img src='./img/mes.png'  class='floatRight'/>
               </div>
               <div style='clear:both;'></div>
               <div class='popTxt'>
                   <img src='./img/popBg.png' width='100%'/>
                   <div class='popTxt_contant'>
                       <textarea rows="4" id='textSms' ref='textSms' style='width:90%;border:none;outline:0;color:rgb(54,54,54);font-size:14px;padding:0.6rem 15px;line-height:20px;'>{{msg1}}{{msg2}}{{msg3}}</textarea>
                        <div style='margin-top:15%;' >
                            <mt-button type="danger" size="large" class=''@click='sendweixin()'  style='width:5.49rem!important;margin-top:0px!important;'>复制并发送微信</mt-button>
                        </div>
                        <div style='margin-top:8%;'>
                            <mt-button type="danger" size="large" class=''@click='sendMSG()' style='background:#fff!important;color:#df1e1d;border:1px solid #df1e1d!important;width:5.49rem!important;margin-top:0px!important;'>复制并发送短信</mt-button>
                        </div>
                   </div><!-- popTxt_contant  -->
                   
               </div>
           </div> <!--pop_contant -->

           <div class='pop_wealth' ref='pop_wealth'style='display:none;'>
               <img v-bind:src='srcImg' class='wimg' v-if="headimgShow"/>
               <img src='./img/w.png' class='wimg' v-else/>
               <p class="dtname">{{dtName}}</p>
               <p style="font-size:0.374rem;color:#333;">是否确定他（她）为我的专属财富师</p>
               <div style='margin-top:15%;'>
                    <mt-button type="danger" size="large" class=''@click='zhiding()' style='width:5.49rem!important;margin-top:0px!important;'>确定</mt-button>
                </div>
                <div style='margin-top:8%;'>
                    <mt-button type="danger"@click='closeB()' size="large" class='' style='background:#fff!important;color:#df1e1d;border:1px solid #df1e1d!important;width:5.49rem!important;margin-top:0px!important;'>放弃指定</mt-button>
                </div>
           </div>

           <div class='pop_wealth2' ref='pop_wealth2' style="display:none">
               <img v-bind:src='srcImg2' class='wimg' v-if="headimgShow2"/>
               <img src='./img/w.png' class='wimg' v-else/>
               <p class="dtname">{{dtName2}}</p>
               <p style="font-size:0.374rem;color:#333;">您已线下指定了专属财富师</p>
               <div style='margin-top:15%;'>
                    <mt-button type="danger" size="large" class=''@click='closeB()' style='width:5.49rem!important;margin-top:0px!important;'>确定</mt-button>
                </div>
           </div>
         </mt-popup>
         <comfooter></comfooter>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { Popup } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { isValidName } from '@/common/js/extends.js';//引入mint-ui的button组件文件包
import {handleClipboard } from '@/common/js/clipboard.js'//vue 复制功能
import clip from '@/common/js/clipboard.js'//vue 复制功能
import { getCookie,setCookie } from '@/common/js/cookie.js'
import comfooter from '../../components/footer'
import axios from 'axios';
import merge from 'webpack-merge'
export default {
    name:'appointW',
    data:function(){
        return{
            wName:'',
            gh:'',
            headimgShow: false,
            isApplyWealther:0,//是否正在申请财富师
            headimgShow2:false,
            warnGh:'',//工号的校验提醒
            actions:'',
            warnName:'',//姓名校验的提示
            popupVisible:false,
            srcImg:'',//财富师头像
            inputData:"你好",//复制的参数
            srcImg2:'',//线下制定的财富师头像财富师头像
            dtName:'',
            dtName2:'',
            msg1:'我是',
            msg2:'任超楠',
            msg3:'，我正在指定你为我的专属财富师，请回复姓名全称与DT开头的工号，谢谢！',
            param:{
                dtNo:'',
                dtName:'',
                mobile:""//财富师手机号
            },
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0]
            },
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=getUserInfo'),//接口
            paramurl: location.href.split('?')[0]

        }
        
    },
    component:{Button,axios,Popup,MessageBox,comfooter,Toast},
    created:function(){
        this.GasyncSDKConifg()
        var bizId=decodeURIComponent(getCookie("bizId"));
        this.faceparam.bizId = bizId
        if(!this.$route.query.faceResult == false){
           this.getfaceId()
        }else{
            this.getuserName();//获取用户姓名
        }
        
    },
    methods:{
        handleCopy(text, event) {
            console.log(event);
           clip(text, event)
           console.log('clicp')
         },
        copy:function(){
           var text=this.$refs.textSms.value;
           this.handleCopy(text,event); 
        },
        getfaceId:function(){
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                var retCode=res.data.retCode;
                var returnUrl = that.$route.query.returnUrl;
                //修改原有参数        
                that.$router.push({
                    query:merge(that.$route.query,{'faceResult':''})
                })
                if(retCode == '0'){
                    that.trafficStatistics('019')
                   // MessageBox('提示','人脸识别成功');
                    Toast({
                        message: '人脸识别成功',
                        position: 'center',
                        duration: 3000
                    });
                    that.getuserName();//获取用户姓名
                    return;
                }else if(retCode == '-2'){
                    that.trafficStatistics('017')
                    that.trafficStatistics('020')
                    MessageBox('','该身份证已绑定其他手机号').then(action => {
                      if(action == 'confirm'){
                       //跳转财富师名片页面
                        that.$router.push({
                            path:'/faceMsg',
                            name:'faceMsg',
                            query:{
                            returnUrl:returnUrl,
                            }
                        })
                      }else{//取消
                        console.log('查看订单')
                      }
                  });//提示信息
                    return;
                }else{
                    that.trafficStatistics('020')
                    var message = '人脸识别实名认证失败，请重试。若无法完成人脸识别实名认证可'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">【下载大唐财富app】</a>'+'，通过绑卡完成实名认证后报名活动。'
                    MessageBox('', message).then(action => {
                        if(action == 'confirm'){
                                //跳转财富师名片页面
                            that.$router.push({
                                path:'/faceMsg',
                                name:'faceMsg',
                                query:{
                                returnUrl:returnUrl,
                                }
                            })
                        }
                    }).catch(() => {
                        
                    })
                    return;
                }
            //     else if(retCode == '-3'){
            //         MessageBox('提示','人脸识别未通过').then(action => {
            //           if(action == 'confirm'){
            //            //跳转财富师名片页面
            //             that.$router.push({
            //                 path:'/faceMsg',
            //                 name:'faceMsg',
            //                 query:{
            //                 returnUrl:returnUrl,
            //                 }
            //             })
            //           }else{//取消
            //             console.log('查看订单')
            //           }
            //       });//提示信息
            //         return;
            //     }else if(retCode == '-4'){
            //         MessageBox('提示','未查询到人脸识别结果').then(action => {
            //           if(action == 'confirm'){
            //            //跳转财富师名片页面
            //             that.$router.push({
            //                 path:'/faceMsg',
            //                 name:'faceMsg',
            //                 query:{
            //                 returnUrl:returnUrl,
            //                 }
            //             })
            //           }else{//取消
            //             console.log('查看订单')
            //           }
            //       });//提示信息
            //         return;
            //     }else{
            //         MessageBox('提示','请重新进行人脸识别').then(action => {
            //           if(action == 'confirm'){
            //            //跳转财富师名片页面
            //             that.$router.push({
            //                 path:'/faceMsg',
            //                 name:'faceMsg',
            //                 query:{
            //                 returnUrl:returnUrl,
            //                 }
            //             })
            //           }else{//取消
            //             console.log('查看订单')
            //           }
            //       });//提示信息
            //         return;
            //     }
            })
        },
        getuserName:function(){
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取我的活动和客户信息
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                that.isApplyWealther=res.data.isApplyWealther;
                if(retCode == 0){
                    var userInfo=res.data.userInfo;
                    that.msg2=userInfo.realName;
                    if(userInfo.belongBusiness!=''&&userInfo.belongBusiness!=null&&userInfo.belongBusiness!=undefined){
                        //打开财富师页面
                         window.location.href='https://interface.tdyhfund.com/tcapi/HTML5/html/shared_card.html?userId='+userInfo.belongBusiness;
                    }
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=appointW_wxser#wechat_redirect';
                }
                else{
                  // MessageBox('提示',retMsg);
                    Toast({
                        message: retMsg,
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },
        sendMSG:function(){
            this.trafficStatistics('012')//自定义埋点
            var that=this;
            let ua = navigator.userAgent.toLowerCase();
            //android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
            if(false) {//isWeixinBrowser()//判断是不是微信
                
            }else{
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                        that.copy();
                        window.location.href='sms:';

                    
                }else if (/(Android)/i.test(navigator.userAgent)) {
                    //android
                    var str=this.$refs.textSms.value;
                    window.location.href='sms:?body='+str;
                }
            }
    
            function isWeixinBrowser() {
                return (/micromessenger/.test(ua)) ? true : false;
            }
           
            
        },//send
        sendweixin:function(){
            this.trafficStatistics('012')//自定义埋点
           // alert('已复制，请找到财富师微信并粘贴内容');
            Toast({
                message: '已复制，请找到财富师微信并粘贴内容',
                position: 'center',
                duration: 3000
            });
            this.copy();
           // MessageBox('提示', '已复制，立即发给您想指定的财富师吧~');
        },
        wNameFn:function(){
            var that=this;
            if(isValidName(that.wName)){
                that.$refs.warnName.style.display='block';
                that.warnName='请输入正确的姓名';
               // that.$refs.wName.style='border-bottom:0.5px solid #df1e1d!important';
            }else{
                that.$refs.warnName.style.display='none'
                //that.$refs.wName.style='border-bottom:0.5px solid #efefef!important';
            }
        },
        ghFn:function(){
            if(this.gh==''){
                //this.$refs.ghw.style.display='none';
                //this.$refs.gh.style='border-bottom:0.5px solid #df1e1d!important';
                return;
            }
            if(!/^[0-9]{7}$/.test(this.gh)){
                this.$refs.ghw.style.display='block';
                this.warnGh='请输入正确的财富师工号';
                //this.$refs.gh.style='border-bottom:0.5px solid #df1e1d!important';
            }else{
                this.$refs.ghw.style.display='none';
                //this.$refs.gh.style='border-bottom:0.5px solid #efefef!important';
            }
        },
        sendWX:function(){
            this.$refs.pop_wealth.style.display='none';
            this.$refs.pop_wealth2.style.display='none';
            this.$refs.pop_contant.style.display='block';
            var that=this;
            that.popupVisible=true;
        },
        closeB:function(){
            var that=this;
            that.popupVisible=false;
        },
        appW:function(){
            if(this.wName==''){
                this.$refs.warnName.style.display='block';
                this.warnName='请输入财富师姓名';
               // this.$refs.wName.style='border-bottom:0.5px solid #df1e1d!important';
                 return;
            }else if(isValidName(this.wName)){
                console.log('请输入正确的财富师姓名');
                this.$refs.warnName.style.display='block';
                this.warnName='请输入正确的姓名';
                //this.$refs.wName.style='border-bottom:0.5px solid #df1e1d!important';
                 return;
            }else{
                this.$refs.warnName.style.display='none'
                //this.$refs.wName.style='border-bottom:0.5px solid #efefef!important';
            }
            //判断工号
             if(this.gh==''){
               this.$refs.ghw.style.display='block';
                this.warnGh='请输入财富师工号';
                //this.$refs.gh.style='border-bottom:0.5px solid #df1e1d!important';
                 return;
            }else if(!/^\+?[1-9][0-9]*$/.test(this.gh)){
                this.$refs.ghw.style.display='block';
                this.warnGh='请输入正确的财富师工号';
                //this.$refs.gh.style= 'border-bottom:0.5px solid #df1e1d!important';
                return;
               
            }else{
                this.$refs.ghw.style.display='none';
                //this.$refs.gh.style='border-bottom:0.5px solid #efefef!important';
            }
            this.param.dtNo='DT'+this.gh;
            this.param.dtName=this.wName;       
            this.trafficStatistics('009')//自行输入姓名、财富师工号绑定财富师的用户数
            this.valiW();
        },
        valiW:function(){
            Indicator.open();
            var that=this;
            console.log(that.param);
            axios({
            method:'get',
            url:'/wxservice/wxMemberInfo/checkWealther',//指定之前校验财富师
            params:that.param,
        })
        .then(function(res) {//成功之后
            Indicator.close();
              var retCode=res.data.retCode;
              var retMsg=res.data.retMsg;
               console.log(res.data);
               var data=res.data.data;
              if(retCode==0){//指定成功
                that.$refs.pop_wealth.style.display='block';
                that.$refs.pop_wealth2.style.display='none';
                that.$refs.pop_contant.style.display='none';
                if(!data.photo == false){
                    that.srcImg=data.photo;
                    that.headimgShow=true
                }else{
                    that.headimgShow = false
                }
                that.dtName=data.dtName;
                that.popupVisible=true;
                that.param.mobile=data.mobile;
              }else if(retCode==-4){//已绑定线下财富师,并且展示绑定的财富师的信息
                that.$refs.pop_wealth2.style.display='block';
                that.$refs.pop_wealth.style.display='none';
                that.$refs.pop_contant.style.display='none';
                if(!data.photo == false){
                    that.srcImg2=data.photo;
                    that.headimgShow2=true
                }else{
                    that.headimgShow2 = false
                }
                that.dtName2=data.dtName;
                that.popupVisible=true;
              }else if(retCode==-2){//未认证，跳转人脸识别页面
                   that.$router.push({
                    path:'/faceMsg',
                    name:'faceMsg',
                    query:{
                        returnUrl:that.Host+'weixin-h5/index.html#/appointW'
                    }
                    })
              }else if(retCode==-5){
                  MessageBox('','财富师姓名或工号输入有误');
              }else if(retCode==-6){
                  MessageBox('','财富师已离职');
              }else if(retCode==-3){
                  MessageBox('','您已绑定财富师');
              }else if(retCode==-1){
                 // MessageBox('提示','系统错误');
                  Toast({
                        message: '系统错误',
                        position: 'center',
                        duration: 3000
                    });
                  
              }
              
               Indicator.close();
        });
        },
        zhiding:function(){
            Indicator.open();
            var that=this;
            console.log(that.param);
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/bindWealther',//客户确认指定财富师
                params:that.param,//系统类别
                
            })
            .then(function(res) {//成功之后
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                console.log(res.data);
                var data=res.data.data;
                var wxfrom =decodeURIComponent(that.$route.query.actId);
                if(retCode==0){//指定成功    跳转财富师名片页面
                   MessageBox('', '指定财富师成功').then(action => {
                  if(action == 'confirm'){
                    if(wxfrom == 'wxser' || that.$route.query.appointForm == 'wxser'){
                        WeixinJSBridge.call('closeWindow');
                    }
                        //跳转财富师名片页面
                        window.location.href='https://interface.tdyhfund.com/tcapi/HTML5/html/shared_card.html?userId='+that.param.dtNo;
                    
                  }else{//取消
                    console.log('查看订单')
                  }
              });
                }else if(retCode==-1){
                   // MessageBox('提示', '系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                }
                
                //  Indicator.close();
            });
        },
        onlineApplyV:function(){
            this.trafficStatistics('011')//自定义埋点在线申请
            var that=this;
             if(that.isApplyWealther==1){//正在申请的状态
                    that.$router.push({//跳入本地名片代理页面
                             path:'/applysuc',
                             name:'applysuc',
                            
                          })
                          return;
                }
            Indicator.open();
               axios({
                    method:'get',
                    url:'/wxservice/wxMemberInfo/checkApplyWealther',//申请财富师之前校验财富师
                })
                .then(function(res) {//成功之后
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    Indicator.close();
                    var data=res.data.data;
                    if(retCode==0){//0-可以申请（data为客户手机号）   //跳转在线申请页面    
                        that.$router.push({
                            path:'/onlineApply',
                            name:'onlineApply',
                            query:{
                                phone:data.phone,
                            }
                         })
                    }else if(retCode==-1){//-1-系统异常
                        MessageBox.confirm('系统异常，请联系客服', '');
                    }else if(retCode==-3){//-3-已绑定线上财富师
                         MessageBox('', '已绑定线上财富师');
                    }else if(retCode==-4){//-4-已绑定线下财富师（data为已绑定的财富是信息）
                       that.$refs.pop_wealth2.style.display='block';
                       that.$refs.pop_wealth.style.display='none';
                       that.$refs.pop_contant.style.display='none';
                       if(!data.photo == false){
                            that.srcImg2=data.photo;
                            that.headimgShow2=true
                        }else{
                            that.headimgShow2 = false
                        }
                        that.dtName2=data.dtName;
                        that.popupVisible=true;
                    }else if(retCode==-2){//-2未认证,跳转人脸识别的页面
                          that.$router.push({
                            path:'/faceMsg',
                            name:'faceMsg',
                            query:{
                                returnUrl:that.Host+'weixin-h5/index.html#/appointW' 
                            }
                         })
                    }else if(retCode==-5){// -5-已购买过私募资产，请联系客服确定财富师
                         MessageBox.confirm('',
                            {  message: '请拨打客服电话400-819-9868联系客服确定财富师', 
                               title: '',  
                                confirmButtonText: '立即拨打', 
                              cancelButtonText: '取消' 
                             }).then(action => {  
                                if (action == 'confirm') {   
                                  //确认的回调
                                window.location.href="tel:400-819-9868"
                                 } }).catch(err => { 
                                 if (err == 'cancel') {   
                                  //取消的回调 
                                console.log(2); 
                                }  
                            });//confirm结束
                    }
                    
                    //  Indicator.close();
                });
        }
    },
    
}
</script>
<style>
@import '../activeSign/toSign.css'; /* 引入toSign.css文件*/
.overlayer{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:10;
}
.mint-popup{
    width:100%;
    background:none;
}
 .pop_contant,.pop_wealth,.pop_wealth2{height:75%;background:#fff;width:92%;margin:0 auto 20px;border-radius: 10px;} 
.pop_wealth,.pop_wealth2{
    width:8.13rem;
    height:9.6rem;
    background:url(./img/wbg.png) no-repeat;
    background-size:cover;
}
.sendM{
    color:#757575;
    font-size:0.35rem;
    height:35px;
    margin-top:5px;
    line-height:1rem;
}
.applyLine{
    width:100%;
    height:112px;
    background:url(img/meng@2x.png) no-repeat;
    background-size:100%;
}
.applyLine p{
    color:#757575;
    font-size: 14px;
    padding-top:28px;
}
.pop_title{
    color:rgb(59,59,59);
    font-size: 0.42rem;
    padding-top:0.62rem;
    font-weight: 700;
}
.popImgBox{
    width:100%;
    padding:.4rem 2.40rem 0!important;
    overflow: hidden;
}
.popImgBox img{
    width:62px;
}
.popTxt{
    width:90%;
    margin:20px auto 0;
    position: relative;
    padding-bottom:20px;
}
.popTxt_contant{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
}
.dtname{
    line-height: 22px;
}
.wimg{
    width:2.67rem;
    margin:0.987rem auto 0.53rem;
}
.xiazai{
    color:#4a90e2;
}
.appointW .comfooter{
     position: fixed;
     bottom: 0;
 } 
</style>

