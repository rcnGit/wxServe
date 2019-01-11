<template>
    <div class='postDetail'>
        <div class='content_s' style='padding-left:0!important;padding-right:0!important;padding-top:0!important;'>
            <div ref='hasData'>
                <!-- <div v-for='item in items'>
                    <div class='postOne' v-bind:fileUrl='item.fileurl' @click.stop='open'>
                        <p class='title'>{{item.filename}}</p>
                        <p><span class='text'>{{item.prodName}}</span><span class='date'>{{time(item.publishtime)}}</span></p>
                        <div style='clear:both;'></div>
                    </div>   
                    <div style='width:100%;height:10px;background:#f2f2f2;'></div>
                </div> -->
                <p class="post_title">唐盈元一综合股权投资母基金2号的投资主体已完成备案</p>
                <p class="post_title2">大唐元一长安大健康母基金1号；唐诚1号私募股权基金；润合珍宝唐诚1号私募投资基金 </p>
                <p class="post_date">2018-08-21</p>
                <div class="lines"></div>
                <div class="attachment">
                    <img src='./img/attach@2x.png' class="att_icon"/>
                    <p class='att_name'>唐盈元一综合股权投资母基金2号架构图pdf</p>
                </div>
                <div class="attachment">
                    <img src='./img/attach@2x.png' class="att_icon"/>
                    <p class='att_name'>唐盈元一综构图pdf</p>
                </div>
                <div class="att_text">
                    <p class="att_p1">敬的投资者：</p>
                    <p class="att_p2">唐盈元一综合股权投资母基金2号的投资主体——唐盈元曦（宁波）股权投资管理合伙企业（有限合伙）已于2018年6月20日备案成功，投资者打款无需等待，即可实现对外投资。附件是唐盈元一综合股权投资母基金2号的架构图和投资主体唐盈元曦（宁波）股权投资管理合伙企业（有限合伙）的备案函，请知悉。</p>
                </div>
                
            </div>
            <div class='noData' ref='nodata' style='display:none;min-height:300px;'>
                    <img src='./img/nomsg.png'/>
                    <p class='fSize16'>暂无投后消息</p>
            </div>
            <div class='wz'ref='wz' style="background:#fff;display:none;min-height:300px;" >
                <img src='../../common/img/wr.png'  style='width:27%;margin:2.8rem auto 0.5rem;'/>
                <p class='fSize16' style='color:#333'>身份认证后可查看投后消息哦~</p>
            <mt-button type="danger" size="large" class='next' @click='rz()' style='margin-top:1.4rem;'>去人脸识别身份认证</mt-button>
            </div>
        </div>
        <!-- <div class="comfooter_a"><comfooter></comfooter></div> -->
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//  框
import { Toast } from 'mint-ui';
import axios from 'axios'
import comfooter from '../../components/footer'
import { getCookie,setCookie } from '@/common/js/cookie.js'
import merge from 'webpack-merge'
export default {
    name:'postDetail',
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
        rz:function(){//去身份认证
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
                //修改原有参数        
                that.$router.push({
                    query:merge(that.$route.query,{'faceResult':''})
                })
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
                    var message = '人脸识别身份认证失败，请重试。若无法完成人脸识别身份认证可'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">【下载大唐财富app】</a>'+'，通过绑卡完成身份认证后报名活动。'
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
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=PostInformation#wechat_redirect';
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
      //  this.GasyncSDKConifg()
        var that=this;
        // var bizId=decodeURIComponent(getCookie("bizId"));
        //     if(!this.$route.query.faceResult == false){
        //         Indicator.open(that.loadObj);
        //         this.faceparam.bizId = bizId;
        //         this.getfaceId();
        //          return;
        //     }else{
        //           Indicator.open(that.loadObj);
        //           that.getList();
        //     }
    }
}
</script>
<style>
.postDetail{
    width:100%;
    height:100%;
     background:#fff!important;
     text-align: left;
}
.lines{
    width: 100%;
    height: 1px;
    background: #E6E6E6;
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
    line-height: .4rem;
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
    line-height: .4rem;
}
.date{
    font-size:12px;
    color:rgb(153,153,153);
}
.postInfor .noData{
    background:#fff;
}
.postInfor .noData img{
    width:2.24rem;
    margin:2.5rem auto 0;
}
.postInfor .noData p{
    color:#333;
}
.xiazai{
    color:#4a90e2;
}

 .comfooter_a .comfooter{
    position: static;
     bottom: 0;
 }
 .post_title{
    font-size: .48rem;
    color: #333;
    line-height: .64rem;
    padding: .7rem .4rem .36rem;
    font-weight: 600;
 }
 .post_title2{
    font-size: .373333rem;
    color: #646262;
    line-height: .55rem;
    padding: 0 .4rem;
 }
 .post_date{
    font-size: .373333rem;
    color: #646262;
    line-height: .5rem;
    padding: 0.2rem .4rem;
 }
 .attachment{
     overflow: hidden;
     background: #E6E6E6;
     border-radius: .5rem;
     padding: .2rem .4rem;
     margin: .4rem;
     width: max-content;
 }
 .att_icon{
     float: left;
     height: .4rem;
 }
 .att_name{
     float: left;
     padding: .051rem .2rem;
     color: #4a90e2;
     font-size: .346667rem;
 }
 .att_text{
     font-size: .426667rem;
     color: #333;
     line-height: .7rem; 
     padding: .2rem .4rem;
 }
 .att_p2{
    padding-top: .2rem;
    text-align: justify;
    text-indent: 2em;
 }
</style>
