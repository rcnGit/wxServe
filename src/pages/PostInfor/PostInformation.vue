<template>
    <div class='postInfor'>
        <div ref='hasData'>
            <div class='postOne'v-for='item in items' v-bind:fileUrl='item.fileurl' @click='open'>
                <p class='title'>{{item.filename}}</p>
                <p><span class='text'>{{item.prodName}}prodName</span><span class='date'>{{item.publishtime}}</span></p>
            </div>   <!--postOne -->
        </div>
        <div class='noData' ref='nodata' style='display:block;'>
                <img src='./img/nomsg.png'/>
                <p class='fSize16'>暂无投后消息</p>
         </div>
         <div class='wz'ref='wz' style="background:#fff;display:none;" >
            <img src='../../common/img/wr.png'  style='width:40%;margin:80px auto 30px;'/>
            <p class='fSize16' style='color:rgb(59,59,59)'>实名认证后可查看投后消息哦~</p>
        <mt-button type="danger" size="large" class='next' @click='rz()' style='margin-top:81px;'>去人脸识别实名认证</mt-button>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import axios from 'axios'
export default {
    name:'postInfor',
    data:function(){
        return{
            items:[],
            param:{
                certNo:''//包括个人客户的身份证号等和机构客户的机构代码
            }
        }
    },
    components:{MessageBox},
    methods:{
        rz:function(){//去实名认证
            this.$router.push({
                    path:'/faceMsg',
                    name:'faceMsg',
                    params:{
                        
                    }
                })
        },
        getList:function(){
            var that=this;
            axios({
                method:'get',
                url:'/wei/wxservice/wxservice?opName=queryPublishInfo',
                params: {
                param:that.param,//系统类别
                }
            })
            .then(function(res) {//成功之后
                var retCode=res.data.retCode;
                var retMsg=res.data.retMsg;
                 console.log(res.data);
                if(retCode==-1){
                    MessageBox('提示', '系统错误');
                   return;
                }else if(retCode==-2){
                     MessageBox('提示','您还没有购买任何产品哦~');
                }else if(retCode==1){//未认证
                     that.$refs.wz.style.display='block';
                        return;
                }
                if(that.items.length<1){
                     that.$refs.nodata.style.display='block';
                     that.$refs.hasData.style.display='none';
                }
                that.items=res.data.itemList;
                Indicator.close();
            });
        },
        open:function(){
              var fileUrl=event.currentTarget.getAttribute('fileUrl');//绑定事件的元素
             location.href=fileUrl;
        }
    },
    created:function(){
        var that=this;
         Indicator.open(that.loadObj);
         that.getList();
        
    }
}
</script>
<style>
.postInfor{
    width:100%;
    height:100%;
    background:#fff;
    padding-bottom:50px;
}
.postOne{
    background:#fff;
    margin-top:10px;
    padding:20px 15px 16px;
}
.title{
    width:100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color:rgb(59,59,59);
    font-size:15px;
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
    width:40%;
    margin:80px auto 0;
}
.noData p{
    color:rgb(197,197,197);
    margin-top:20px;
}
</style>


