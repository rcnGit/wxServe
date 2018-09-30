<template>
    <div class='online'>
        <div class='content'>
            <div class='inpBox'>
                <input type='text' class='' maxlength='11' v-model="ipNo"/>
                <span>手机号</span>
                <span class='inpRchoose fSize13' style='color:#4a90e2;' @click='changeP'>变更手机号>></span>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''  />
                <span>验证码</span>
                 <mt-button type="danger" size="small" class='sendCodeBtn' @click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
             <div class='inpBox'>
                <input type='text' class=''/>
                <span>所在地</span>
                <span class='inpRchoose fSize13'style='text-align:center;color:#c5c5c5;'@click='chooseAdd'>去选择<img src='../../common/img/chooseR.png' class='chooseR'/></span>
              </div> <!--inpBox-->
              
             <mt-button type="danger" size="large" class='sign'>报名</mt-button>
             <p class='fSize13' style='color:rgb(54,54,54);line-height:50px;'>输入您的所在地，提交申请，客服会在24小时内联系您~</p>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue"></getcode>
    </div>
</template>
<script>
import getcode from './getcode'
export default {
    name:'onlineApply',
    data:function(){
        return{
            messType:'5',
            ipNo:'',
            text:'发送验证码',
            Dsiabled:false,
            routerCity:''
        }
    },
    components:{'getcode': getcode},
    methods:{
        getM:function(){
            this.$refs.c1.getCodeFn(this.messType,this.ipNo);
        },
        childByValue:function(v){
            //console.log(v)
            this.text=v.time;
           // console.log(v.time)
           this.Dsiabled=v.btnDsiabled;
           // console.log(this.Dsiabled);
        },
        changeP:function(){
             this.$router.push({
                path:'/changephone',
                name:'changephone',
                params:{
                }
            })
        },
        chooseAdd:function(){
            this.$router.push({
                path:'/provinceList',
                name:'provinceList',
                params:{
                    father:'onlineApply'
                }
            })
        }
        
    },
    created:function(){
          var routerCity = this.$route.params.city;
            if(routerCity!=''&&routerCity!=undefined){
               this.routerCity=routerCity;
               // this.$route.params.city='';
              // alert(routerCity);
                return;
            }
    }
}
</script>

<style>
@import'../activeSign/toSign.css';
 .inpRchoose{
     width:30%;
     position: absolute;
     left:74%!important;
    color:#999;
    line-height:30px;
 }
</style>

