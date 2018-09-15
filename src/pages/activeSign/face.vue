<template>
    <div class='faceDiv'></div>
</template>
<script>
import axios from 'axios';
export default {
    name:'faceDiv',
    mounted:function(){
        var that = this;
        axios({
            method:'get',
            url:'/faceVerify/faceid/lite/get_token',
            params: {
              api_key:3,//调用此API的api_key；
              api_secret:0,//调用此API的api_key的secret；
              return_url:'baidu.com',//用户完成或取消验证后网页跳转的目标URL
              biz_no:123,//客户业务流水号，该号必须唯一.并会在notify和return时原封不动的返回给您的服务器
              comparison_type:1,//有源比对”（取值“1”）或“无源比对”（取值“0”）
              idcard_mode:1,//有源比对时必选，0：不拍摄身份证、1：仅拍摄身份证人像面，、2： 拍摄身份证人像面和身份证国徽面、3：不拍摄身份证，但会要求用户在界面上输入身份证号和姓名。
              
            }
        })
            .then(function(res) {//成功之后
            console.log(res)
                //console.log(res.data.data);
               //that.dataSource =  that.dataSource.concat(res.data.data.advertisementList);
        });
    }
}
</script>

