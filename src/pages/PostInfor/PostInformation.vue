<template>
    <div class='postInfor'>
        <div class='content_s' style='padding-left:0!important;padding-right:0!important;padding-top:0!important;'>
            <div ref='hasData'>
                <div v-for='item in items'>
                    <div class='postOne' v-bind:fileUrl='item.fileurl' @click.stop='open'>
                        <p class='title'>{{item.filename}}</p>
                        <p><span class='text'>{{item.prodName}}</span><span class='date'>{{time(item.publishtime)}}</span></p>
                        <div style='clear:both;'></div>
                    </div>   <!--postOne -->
                    <div style='width:100%;height:10px;background:#f2f2f2;'></div>
                </div>
                
            </div>
            <div class='noData' ref='nodata' style='display:none;min-height:300px;'>
                    <img src='./img/nomsg.png'/>
                    <p class='fSize16'>暂无投后消息</p>
            </div>
            <div class='wz'ref='wz' style="background:#fff;display:none;min-height:300px;" >
                <img src='../../common/img/wr.png'  style='width:27%;margin:2.8rem auto 0.5rem;'/>
                <p class='fSize16' style='color:#333'>实名认证后可查看投后消息哦~</p>
            <mt-button type="danger" size="large" class='next' @click='rz()' style='margin-top:1.4rem;'>去人脸识别实名认证</mt-button>
            </div>
        </div>
        <div class="comfooter_a"><comfooter></comfooter></div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//  框
import { Toast } from 'mint-ui';
import axios from 'axios'
import comfooter from '../../components/footer'
import { getCookie,setCookie } from '@/common/js/cookie.js'
export default {
    name:'postInfor',
    data:function(){
        return{
            items:[],
            param:{
                certNo:'',//包括个人客户的身份证号等和机构客户的机构代码
                backUrl: location.href.split('?')[0]
            },
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0]
            },
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=queryPublishInfo'),//接口
        }
    },
    components:{MessageBox,comfooter},
    methods:{
        time:function(t){
            t=t.substr(0,10);
            return t;
        },
        rz:function(){//去实名认证
            this.$router.push({
                    path:'/faceMsg',
                    name:'faceMsg',
                    query:{
                        returnUrl:this.Host+'weixin-h5/index.html#/PostInformation'
                    }
                })
        },
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
                    that.trafficStatistics('019')
                   // MessageBox('  ','人脸识别成功');
                    Toast({
                        message: '人脸识别成功',
                        position: 'center',
                        duration: 3000
                    });
                    that.getList();//获取数据
                    return;
                }else if(retCode == '-2'){
                    that.trafficStatistics('017')
                    that.trafficStatistics('020')
                    MessageBox('  ','该身份证已绑定其他手机号');
                    that.$refs.wz.style.display='block';
                    return;
                }else if(retCode == '-1'){
                    that.trafficStatistics('020')
                    //MessageBox('  ','系统异常');
                    Toast({
                        message: '系统异常',
                        position: 'center',
                        duration: 3000
                    });
                    that.$refs.wz.style.display='block';
                    return;
                }else{
                    that.trafficStatistics('020')
                    var message = '人脸识别实名认证失败，请重试。若无法完成人脸识别实名认证可'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">【下载大唐财富app】</a>'+'，通过绑卡完成实名认证后报名活动。'
                    MessageBox.confirm('', {
                        message: message,
                        title: '',
                        showConfirmButton:true,
                        confirmButtonClass:'confirmButton',
                        confirmButtonText:'重试',
                    }).then(action => {
                        if(action == 'confirm'){
                                //跳转财富师名片页面
                            that.$router.push({
                                path:'/faceMsg',
                                name:'faceMsg',
                                query:{
                                returnUrl:returnUrl,
                                }
                            })
                        }else{
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
                // else if(retCode == '-3'){
                //     MessageBox('  ','人脸识别未通过');
                //     that.$refs.wz.style.display='block';
                //     return;
                // }else if(retCode == '-4'){
                //     MessageBox('  ','未查询到人脸识别结果');
                //     that.$refs.wz.style.display='block';
                //     return;
                // }
            })
        },
        getList:function(){
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=queryPublishInfo',
                params: {
                param:that.param//系统类别
                }
            })
            .then(function(res) {//成功之后
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                 if(retCode==0){
                    if(res.data.itemList.length<1){
                        that.$refs.nodata.style.display='block';
                        that.$refs.hasData.style.display='none';
                    }else{
                        that.$refs.nodata.style.display='none';
                        that.$refs.hasData.style.display='block';
                    }
                    that.items=res.data.itemList;
                 }else if(retCode==-1){
                   // MessageBox('  ', '系统错误');
                    Toast({
                        message: '系统错误',
                        position: 'center',
                        duration: 3000
                    });
                   return;
                }else if(retCode==-2){
                    that.$refs.nodata.style.display='block';
                    that.$refs.hasData.style.display='none';
                     //MessageBox('  ','您还没有购买任何产品哦~');
                }else if(retCode==1){//未认证
                     that.$refs.wz.style.display='block';
                        return;
                }else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=queryPublishInfo'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b6456eeafbe956&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=PostInformation#wechat_redirect';
                }
            });
        },
        open:function(){
              var fileUrl=event.currentTarget.getAttribute('fileUrl');//绑定事件的元素
              fileUrl=decodeURIComponent(fileUrl)
             window.location.href=fileUrl;
        }
    },
    created:function(){
        this.GasyncSDKConifg()
        var that=this;
        var bizId=decodeURIComponent(getCookie("bizId"));
            if(!this.$route.query.faceResult == false){
                Indicator.open(that.loadObj);
                this.faceparam.bizId = bizId;
                this.getfaceId();
                 return;
            }else{
                  Indicator.open(that.loadObj);
                  that.getList();
            }
    }
}
</script>
<style>
.postInfor{
    width:100%;
    height:100%;
     background:#fff!important;
}
.postOne{
    width:100%;
    min-height:70px;
    background:#fff;
    margin-top:10px;
    padding:20px 15px 16px;
     margin-bottom:20px;
}
.title{
    width:100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color:rgb(59,59,59);
    font-size:15px;
    height:20px;
    text-align: left;
    margin-bottom:18px;
    
}
.text{
    width:70%;
    float:left;
    display: block;
    color:rgb(99,99,99);
    font-size:13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}
.date{
    font-size:12px;
    color:rgb(153,153,153);
}
.noData{
    background:#fff;
}
.noData img{
    width:2.24rem;
    margin:2.5rem auto 0;
}
.noData p{
    color:#333;
}
.xiazai{
    color:#4a90e2;
}

 .comfooter_a .comfooter{
    position: static;
     bottom: 0;
 }
</style>


