<template>
    <div class='postInfor'>
        <div class='content_s' style='padding-left:0!important;padding-right:0!important;padding-top:0!important;'>
            <div ref='hasData'>
                <div v-for='item in items'>
                    <!-- <div class='postOne' v-bind:fileUrl='item.fileurl' @click.stop='open'> 
                        <p class='title'>{{item.filename}}</p>
                        <p><span class='text'>{{item.prodName}}</span><span class='date'>{{time(item.publishtime)}}</span></p>
                        <div style='clear:both;'></div>
                    </div>   -->
                    <!-- <div class='postOne' @click="toPostDetail(item.newsId)">
                        <p class='title'>你花奴牛农民</p>
                        <p><span class='text'>就差你人</span><span class='date'>2018-11-21</span></p>
                        <div style='clear:both;'></div>
                    </div> -->
                    <div class='postOne' @click="toPostDetail(item.newsId)">
                        <p class='title'>{{item.newstitle}}</p>
                        <p style="overflow:hidden"><span class='text'>{{item.opinfotypeName}}</span><span class='date'>{{time(item.publishtime)}}</span></p>
                        <div style='clear:both;'></div>
                    </div> <!--postOne新 -->
                    <div style='width:100%;height:10px;background:#f2f2f2;'></div>
                </div>
                <div class='loading' style="font-size:18px;color:rgb(59,59,59);line-height:50px;display:none;">
                    下滑加载更多
                </div>
                <div class='loader'ref='loader' style="font-size:14px;color:#685F57;line-height:50px;display:none;">
                    已经到底了
                </div>
            </div>
            <div class='noData' ref='nodata' style='display:none;min-height:300px;padding-top: 1.2rem;'>
                    <img src='./img/nomsg.png'/>
                    <p class='fSize16' style="padding-top: .2rem;">暂无信息披露</p>
            </div>
            <div class='wz'ref='wz' style="background:#fff;display:none;min-height:300px;" >
                <img src='../../common/img/wr.png'  style='width:27%;margin:2.8rem auto 0.5rem;'/>
                <p class='fSize16' style='color:#333'>身份认证后可查看信息披露哦~</p>
            <mt-button type="danger" size="large" class='next' @click='rz()' style='margin-top:1.4rem;'>去人脸识别身份认证</mt-button>
            </div>
        </div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
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
import merge from 'webpack-merge'
export default {
    name:'postInfor',
    data:function(){
        return{
            items:[],
            load:true,
            loadObj:{
                text: '加载中...',
                spinnerType: 'triple-bounce'
            },
            param:{
                certNo:'',//包括个人客户的身份证号等和机构客户的机构代码
                backUrl: location.href.split('?')[0]
            },
            faceparam:{
                bizId: '',
                backUrl: location.href.split('?')[0],
                phone:''
            },
            paramdata:{
                beginNum: '1',
                endNum: '20'
            },
            serbackUrl: encodeURIComponent(window.location.host+'/wxservice/wxservice?opName=queryPublishInfo'),//接口
        }
    },
    components:{MessageBox,comfooter},
    methods:{
        toPostDetail:function(fileid){
           // alert(fileid)
            this.$router.push({
                path:'/postDetail',
                name:'postDetail',
                query:{
                    id: fileid
                }
            })
        },
        time:function(t){
            t=t.substr(0,16);
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
            this.faceparam.phone = this.$route.query.phone
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/getFaceResult',
                params: that.faceparam
            })
            .then(function(res){
                Indicator.close();
                console.log(res.data);
                var retCode=res.data.retCode;
                //var returnUrl = that.$route.query.returnUrl;
                var returnUrl = that.Host+'weixin-h5/index.html#/PostInformation'
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
                    that.getDataList();//获取数据
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
                                var canshu=returnUrl+'?phone='+that.$route.query.phone+'&idNo='+idCardNo+'&name='+encodeURIComponent(that.$route.query.name)+'&tp='+type 
                                that.getface(idCardNo,idCardName,canshu,type)
                            }
                        }).catch(err => {
                            if (err == 'cancel') {     //取消的回调
                                that.getDataList();
                            }
                        })

                    // }else{
                    //     var message = '人脸识别身份认证失败，请重试。若无法完成人脸识别身份认证可'+'<a class="xiazai" href="https://interface.tdyhfund.com/launcher/download.html?channel=app&name=dtcf">【下载大唐财富app】</a>'+'，通过绑卡完成身份认证后查看。'
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
                    //     }).catch(err => {
                    //         if (err == 'cancel') {     //取消的回调
                    //             that.getDataList();
                    //         }
                    //     })
                    // }
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
        getDataList:function(){
            Indicator.open(this.loadObj);
            var that=this;
           // alert(that.paramdata.endNum+'FFFFFF'+that.paramdata.beginNum)
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=queryPublishList',//获取信息披露列表接口新
                params: {
                    beginNum: that.paramdata.beginNum,
                    endNum: that.paramdata.endNum
                }
            })
            .then(function(res) {//成功之后
                console.log(res)
                Indicator.close();
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                 if(retCode==0){
                    if(res.data.dataList.length<1){
                        if(that.paramdata.beginNum == '1'){
                            that.$refs.nodata.style.display='block';
                            that.$refs.hasData.style.display='none';
                        }
                    }else{
                        that.$refs.nodata.style.display='none';
                        that.$refs.hasData.style.display='block';
                        that.paramdata.beginNum = 20+Number(that.paramdata.beginNum)
                        that.paramdata.endNum = 20+Number(that.paramdata.endNum)
                    }
                    
                    if(res.data.dataList.length<1 && that.paramdata.beginNum != '1'){
                      //  alert(that.paramdata.endNum)
                        that.$refs.loader.style.display='block';
                        that.load=false;
                    }
                    that.items=that.items.concat(res.data.dataList);//把已获取的数据和新获取的数据合并在放入页面
                   // that.items=that.allList;
                    //that.items=res.data.dataList;
                 }else if(retCode==-1){
                   // MessageBox('  ', '系统错误');
                    Toast({
                        message: '系统错误',
                        position: 'center',
                        duration: 3000
                    });
                   return;
                }else if(retCode==1){//未认证
                     that.$refs.wz.style.display='block';
                        return;
                }
                else if(retCode == 400){
                    var serbackUrl = that.Host+'wxservice/wxservice?opName=queryPublishList'
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_userinfo&state=PostInformation#wechat_redirect';
                }
            });
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
                    if(res.data.itemList&&res.data.itemList.length<20){
                        that.load=false;
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
        },
        onScroll:function() {
            var that=this;
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
            //滚动条到底部的条件
            if(scrollTop+windowHeight==scrollHeight){
            //写后台加载数据的函数
            console.log('到底了')
                if(!that.load){
                that.$refs.loader.style.display='block';
                return;
                }
            Indicator.open(that.loadObj);
            // alert(location.href.split('#')[0])
        //  var pageNo=that.param.pageNo;
            // pageNo++;
            // that.param.pageNo=pageNo;  
            that.getDataList();
            } 
        }
    },
    created:function(){
        Indicator.open(this.loadObj);
        this.GasyncSDKConifg()
        var that=this;
        var bizId=decodeURIComponent(getCookie("bizId"));
        if(!that.$route.query.faceResult == false){
            that.faceparam.bizId = bizId;
            that.getfaceId();
                return;
        }else{  
             that.getDataList();
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            window.addEventListener('scroll', this.onScroll)
        })
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
    min-height: 2.186667rem;
    background:#fff;
    padding: .5rem .4rem .5rem;
}
.title{
    width:100%;
    white-space: normal;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp:2;
   /*! autoprefixer:off; */
    -webkit-box-orient:vertical;
    /* autoprefixer: on; */
    color:#333;
    font-size: .4rem;
    /* height:20px; */
    text-align: left;
    margin-bottom: .29rem;
    line-height: .6rem;
    word-break: break-all;
}
.text{
    /* width:70%; */
    height: .373333rem;
    float:left;
    display: block;
    color: #D0352C;
    font-size: .266667rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    line-height: .4rem;
    /* background: url(./img/kuang.png) no-repeat;
    background-size: cover;*/
    padding: 0 .2rem; 
    border: 1px solid #D0352C;
    border-radius: .2rem 0 .2rem 0;
}
.date{
    font-size: .32rem;
    color:#999;
    float: right;
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
</style>


