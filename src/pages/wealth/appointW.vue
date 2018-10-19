<template>
    <div id='appointW'>
        <div class='content'>
            <div class='tip'>
             <span>请输入财富师姓名与工号进行关联</span>
            </div>
            <div class='inpBox'>
                <input type='text' class='' maxlength='30' placeholder="请输入您的姓名" v-model='wName' ref='wName' />
                <P ref='warnName' class='warn'>{{warnName}}</P>
                <span>姓名</span>
                <em>请输入正确的实名信息</em>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''placeholder='请输入财富师工号后七位数字'maxlength='7' v-model='gh'ref='gh'/>
                <P ref='ghw' class='warn'>{{warnGh}}</P>
                <span>工号DT</span>
                <em>请输入正确的实名信息</em>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->             
             <div style='clear:both'></div>
             <mt-button type="danger" size="large" class='next' @click='appW()'>确认</mt-button>
             <div class='sendM' @click='sendWX()'>不清楚工号，给财富师发微信/短信索取工号&nbsp;&nbsp;></div>
         </div> <!--content-->
         <div style='width:100%;height:10px;background:#f9f9f9;'></div>
         <div class='content' style='padding:0;'>
             <div class='applyLine'>
                 <p>若无心仪财富师可联系客服为您推荐财富师</p>
                 <mt-button type="danger" size="large" class='next' @click='onlineApplyV()' style='background:#fff!important;color:#df1e1d;border:1px solid #df1e1d!important;width:50%!important;margin-top:20px!important;'>在线申请</mt-button>
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
                       <textarea rows="4" id='textSms' style='width:90%;border:none;outline:0;color:rgb(54,54,54);font-size:14px;padding:25px 15px;line-height:20px;'>{{msg1}}{{msg2}}{{msg3}}</textarea>
                        <div style='margin-top:15%;' >
                            <mt-button type="danger" size="large" class=''@click='sendweixin()'  style='width:50%!important;margin-top:0px!important;'>复制并发送微信</mt-button>
                        </div>
                        <div style='margin-top:7%;'>
                            <mt-button type="danger" size="large" class=''@click='sendMSG()' style='background:#fff!important;color:#df1e1d;border:1px solid #df1e1d!important;width:50%!important;margin-top:0px!important;'>复制并发送短信</mt-button>
                        </div>
                   </div><!-- popTxt_contant  -->
                   
               </div>
           </div> <!--pop_contant -->

           <div class='pop_wealth' ref='pop_wealth'style='display:none;'>
               <img v-bind:src='srcImg' class='wimg' v-if="headimgShow"/>
               <img src='./img/w.png' class='wimg' v-else/>
               <p class="dtname">{{dtName}}</p>
               <p>是否确定他（她）为我的专属财富师</p>
               <div style='margin-top:15%;'>
                    <mt-button type="danger" size="large" class=''@click='zhiding()' style='width:50%!important;margin-top:0px!important;'>确定</mt-button>
                </div>
                <div style='margin-top:7%;'>
                    <mt-button type="danger"@click='closeB()' size="large" class='' style='background:#fff!important;color:rgb(153,153,153);border:1px solid rgb(153,153,153)!important;width:50%!important;margin-top:0px!important;'>放弃指定</mt-button>
                </div>
           </div>

           <div class='pop_wealth2' ref='pop_wealth2'>
               <img v-bind:src='srcImg2' class='wimg' v-if="headimgShow2"/>
               <img src='./img/w.png' class='wimg' v-else/>
               <p class="dtname">{{dtName2}}</p>
               <p>您已线下指定了专属财富师</p>
               <div style='margin-top:15%;'>
                    <mt-button type="danger" size="large" class=''@click='closeB()' style='width:50%!important;margin-top:0px!important;'>确定</mt-button>
                </div>
           </div>
         </mt-popup>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { Popup } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import { isValidName } from '@/common/js/extends.js';//引入mint-ui的button组件文件包
import axios from 'axios';
export default {
    name:'appointW',
    data:function(){
        return{
            wName:'',
            gh:'',
            headimgShow: false,
            headimgShow2:false,
            warnGh:'',//工号的校验提醒
            actions:'',
            warnName:'',//姓名校验的提示
            popupVisible:false,
            srcImg:'',//财富师头像
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
    component:{Button,axios,Popup,MessageBox},
    created:function(){ 
        var bizId=localStorage.getItem('bizId');
        this.faceparam.bizId = bizId
        if(!this.$route.query.faceResult == false){
           this.getfaceId()
        }
        this.getuserName();//获取用户姓名
    },
    methods:{
        getfaceId:function(){
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                if(retCode == '0'){
                    MessageBox('提示','人脸识别成功');
                    return;
                }else if(retCode == '-2'){
                    MessageBox('提示','该身份证已绑定其他手机号');
                    return;
                }else if(retCode == '-1'){
                    MessageBox('提示','系统异常');
                    return;
                }else if(retCode == '-3'){
                    MessageBox('提示','人脸识别未通过');
                    return;
                }else if(retCode == '-4'){
                    MessageBox('提示','未查询到人脸识别结果');
                    return;
                }
            })
        },
        getuserName:function(){
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//获取我的活动
                params: {
                    backUrl: that.paramurl
                }
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                if(retCode == 0){
                    var userInfo=res.data.userInfo;
                    that.msg2=userInfo.realName;
                }
                else if(retCode == 400){
                    return;
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=getUserInfo'
                  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=appointW#wechat_redirect';
                }
                else{
                    MessageBox('提示',retMsg);
                }
            })
        },
        sendMSG:function(){
            let ua = navigator.userAgent.toLowerCase();
            //android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
            if(false) {//isWeixinBrowser()//判断是不是微信
                
            }else{
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                //ios
                var Url2=document.getElementById("textSms");
                 Url2.select(); // 选择对象
                 document.execCommand("Copy"); // 执行浏览器复制命令
               window.location.href='sms:';
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //android
                var str=this.msg1+this.msg2+this.msg3;
                window.location.href='sms:?body='+str;
            }
            }
    
            function isWeixinBrowser() {
                return (/micromessenger/.test(ua)) ? true : false;
            }
           
            
        },//send
        sendweixin:function(){
            MessageBox('提示', '已复制，立即发给您想指定的财富师吧~');
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
            if(!/^\+?[1-9][0-9]*$/.test(this.gh)){
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
            alert('appw');
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
            Indicator.open();
            this.valiW();
        },
        valiW:function(){
            alert('valiw');
            var that=this;
            console.log(that.param);
            axios({
            method:'get',
            url:'/wxservice/wxMemberInfo/checkWealther',//指定之前校验财富师
            params:that.param,
        })
        .then(function(res) {//成功之后
            Indicator.close();
            alert(retCode)
              var retCode=res.data.retCode;
              var retMsg=res.data.retMsg;
               console.log(res.data);
               var data=res.data.data;
              if(retCode==0){//指定成功
                that.$refs.pop_wealth.style.display='block';
                that.$refs.pop_wealth2.style.display='none';
                that.$refs.pop_contant.style.display='none';
               // alert(data.photo)
                if(!data.photo == false){
                    that.srcImg=data.photo;
                    that.headimgShow=true
                }else{
                    that.headimgShow = false
                }
                alert(data.dtName)
                that.dtName=data.dtName;
                that.popupVisible=true;
                that.param.mobile=data.mobile;
              }else if(retCode==-4){//已绑定线下财富师,并且展示绑定的财富师的信息
                that.$refs.pop_wealth2.style.display='block';
                that.$refs.pop_wealth.style.display='none';
                that.$refs.pop_contant.style.display='none';
                //alert(data.photo+'1111111')
                if(!data.photo == false){
                    that.srcImg2=data.photo;
                    that.headimgShow2=true
                }else{
                    that.headimgShow2 = false
                }
                alert(data.dtName)
                that.dtName2=data.dtName;
                that.popupVisible=true;
              }else if(retCode==-2){//未认证，跳转人脸识别页面
                   that.$router.push({
                    path:'/faceMsg',
                    name:'faceMsg',
                    params:{
                        returnUrl:that.Host+'weixin-h5/index.html#/appointW'
                    }
                    })
              }else if(retCode==-5){
                  MessageBox('提示','财富师工号不存在');
              }else if(retCode==-6){
                  MessageBox('提示','财富师已离职');
              }else if(retCode==-3){
                  MessageBox('提示','您已绑定财富师');
              }else if(retCode==-1){
                  MessageBox('提示','系统错误');
                  
              }
              
             //  Indicator.close();
        });
        },
        zhiding:function(){
            var that=this;
            console.log(that.param);
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/bindWealther',//客户确认指定财富师
                params:that.param,//系统类别
                
            })
            .then(function(res) {//成功之后
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                console.log(res.data);
                var data=res.data.data;
                if(retCode==0){//指定成功    跳转财富师名片页面
                   MessageBox('提示', '指定财富师成功').then(action => {
                  if(action == 'confirm'){
                   //跳转财富师名片页面
                    window.location.href='https://test-interface.tdyhfund.com/tcapi/HTML5/html/shared_card.html?userId='+that.param.dtNo;
                  }else{//取消
                    console.log('查看订单')
                  }
              });
                }else if(retCode==-1){
                    MessageBox('提示', '系统异常');
                }
                
                //  Indicator.close();
            });
        },
        onlineApplyV:function(){
            var that=this;
            console.log('onlineApplyV');
               axios({
                    method:'get',
                    url:'/wxservice/wxMemberInfo/checkApplyWealther',//申请财富师之前校验财富师
                })
                .then(function(res) {//成功之后
                    var retCode=res.data.retCode;
                    var retMsg=res.data.retMsg;
                    console.log(res.data);
                    var data=res.data.data;
                    if(retCode==0){//0-可以申请（data为客户手机号）   //跳转在线申请页面    
                        that.$router.push({
                            path:'/onlineApply',
                            name:'onlineApply',
                            params:{
                                phone:data.phone,
                            }
                         })
                    }else if(retCode==-1){//-1-系统异常
                        MessageBox.confirm('系统异常，请联系客服', '');
                    }else if(retCode==-3){//-3-已绑定线上财富师
                         MessageBox('提示', '已绑定线上财富师');
                    }else if(retCode==-4){//-4-已绑定线下财富师（data为已绑定的财富是信息）
                       that.$refs.pop_wealth2.style.display='block';
                       that.$refs.pop_wealth.style.display='none';
                       that.$refs.pop_contant.style.display='none';
                       //alert(data.photo+'222')
                       if(!data.photo == false){
                            that.srcImg2=data.photo;
                            that.headimgShow2=true
                        }else{
                            that.headimgShow2 = false
                        }
                        alert(data.dtName)
                        that.dtName2=data.dtName;
                        that.popupVisible=true;
                    }else if(retCode==-2){//-2未认证,跳转人脸识别的页面
                          that.$router.push({
                            path:'/faceMsg',
                            name:'faceMsg',
                            params:{
                                returnUrl:that.Host+'weixin-h5/index.html#/appointW' 
                            }
                         })
                    }else if(retCode==-5){// -5-已购买过私募资产，请联系客服确定财富师
                         MessageBox.confirm('',
                            {  message: '您已经已购买过私募资产，请拨打客服电话400-110联系客服确定财富师', 
                               title: '提示',  
                                confirmButtonText: '立即拨打', 
                              cancelButtonText: '取消' 
                             }).then(action => {  
                                if (action == 'confirm') {   
                                  //确认的回调
                                window.location.href="tel:17184092628"
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
.mint-popup{
    width:100%;
    background:none;
}
 .pop_contant,.pop_wealth,.pop_wealth2{height:530px;background:#fff;width:92%;margin:0 auto 20px;border-radius: 10px;} 
.sendM{
    color:#7a7a7a;
    font-size: 12px;
    height:35px;
    margin-top:5px;
    line-height: 35px;
}
.applyLine{
    width:100%;
    height:112px;
    background:url(img/meng@2x.png) no-repeat;
    background-size:100%;
}
.applyLine p{
    color:#595959;
    font-size: 13px;
    padding-top:28px;
}
.pop_title{
    color:rgb(59,59,59);
    font-size: 16px;
    padding-top:20px;
}
.popImgBox{
    width:100%;
    padding:30px 20% 0;
}
.popImgBox img{
    width:62px;
}
.popTxt{
    width:90%;
    margin:20px auto 0;
    position: relative;
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
    width:35%;
    margin:50px auto 30px;
}
</style>

