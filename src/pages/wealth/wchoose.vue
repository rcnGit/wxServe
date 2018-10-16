<template>
    <div class='wealthCardD'>
        <div class='bg'>
            <p style='font-size:16px;color:rgb(53,53,53);padding-top:20px;font-weight:700;'>专属财富师</p>
            <p style='font-size:13px;color:rgb(99,99,99);margin: 20px auto 0;'>您还未指定财富师，立即指定，尊享贴身服务</p>
            <img src="./img/w.png" class='wImg' ref='pic'/>
                <div style='margin:24px auto 20px;'>
                    
                    <p class='intr'><span>优选产品</span><span class='int_gg'>|</span><span>财富师动态</span><span class='int_gg'>|</span><span>专属活动</span></p>
                 </div>
                  
         </div>        
                
           
            <mt-button type="danger" size="large" class=''@click='zhid()' style='width:53%!important;margin-top:50px!important;'>立即指定您的专属财富师</mt-button>
        
    </div>
</template>
<script>
import axios from 'axios';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
export default {
    name:'wealthCardD',
    data:function(){
        return{
            wname:'李悦',
            cgh:'',
            authenticFlag:'',//是否需要实名认证
           
        }
    },
    methods:{
        zhid:function(){
            if(that.authenticFlag==0){//未认证
                that.$router.push({
                    path:'/faceMsg',
                    name:'faceMsg',
                    params:{
                        
                    }
                })
            }else{//已认证
                that.$router.push({
                    path:'/appointW',
                    name:'appointW',
                    params:{
                        
                    }
                })
            }
            
           
        },
        pming:function(){
            var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxMemberInfo/checkApplyWealther',//获取我的活动
                params: {
                    
                }
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                if(retCode=='-1'){//系统异常
                    MessageBox('提示', '系统异常');
                }else{
                    var mployment=res.data.data.mployment;
                    that.$refs.pic.src='res.data.data.photo'//财富师头像
                    // if(mployment==0){//有名片
                         window.location.href='https://test-interface.tdyhfund.com/tcapi/HTML5/html/shared_card.html?userId='+that.cgh;
                    // }else{//没有名片
                    //     that.$router.push({//跳入本地名片代理页面
                    //         path:'/wealthCardD',
                    //         name:'wealthCardD',
                    //         params:{
                    //             gh:that.gh
                    //         }
                    //      })
                    // }
                }
            })
        }

    },
    mounted:function(){
          var that=this;
            axios({
                method:'get',
                url:'/wxservice/wxservice?opName=getUserInfo',//判断是否有财富师
                params: {
                
                }
            })
            .then(function(res){
                console.log(res.data);
                var retCode=res.data.retCode;
                if(retCode=='0'){
                    var belongBusiness=res.data.userInfo.belongBusiness;
                    that.cgh=belongBusiness;//财富师工号
                    if(!belongBusiness||belongBusiness==''||belongBusiness==undefined){//没有财富师
                        that.authenticFlag=res.data.userInfo.authenticFlag;
                        return;
                       
                    }else{
                        //有财富师
                        that.wname=res.data.userInfo.businessName;
                        that.pming();//去判断有没有财富师名片
                    }
                }else if(retCode=='-1'){//系统异常
                    MessageBox('提示', '系统异常');
                }else if(retCode=='-2'){//此客户未购买任何产品

                }
            })
    },
    components:{Indicator,MessageBox}
}
</script>
<style>
html{
      background:#fff;  
}
.wealthCardD{
     background:#fff; 
     padding-bottom:30px;
}
.bg{
      background:url(./img/bg_new@2x.png)no-repeat;
      background-size:100%;
      padding-bottom:20px;
}
.wImg{
    width:28%;
    padding-top:50px;
}
.wname{
    font-size: 16px;
    color:rgb(59,59,59);
    margin:0 28px;
}
.intr{
    margin-top:20px;
     font-size: 14px;
    color:#986a3c;
}
.int_gg{
    margin:0 20px;
    color:#707070;
}
</style>


