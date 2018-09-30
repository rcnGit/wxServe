<template>
    <div class='changephone'>
        <div class='content'>
            <div class='inpBox'>
                <input type='text' class='' maxlength='11' v-model="ipNo"/>
                <span>新手机号</span>
                <mt-button type="danger" size="small" class='sendCodeBtn' @click="getM()" v-bind:disabled='Dsiabled'>{{text}}</mt-button>
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''  />
                <span>验证码</span>
             </div> <!--inpBox-->
              
             <mt-button type="danger" size="large" class='sign'>确定</mt-button>
        </div>
        <getcode ref='c1' v-on:childByValue="childByValue"></getcode>
    </div>
</template>
<script>
import getcode from './getcode'
export default {
    name:'changephone',
    data:function(){
        return{
            messType:'5',
            ipNo:'',
            text:'发送验证码',
            Dsiabled:false
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
        }
        
    }
}
</script>

<style>
@import'../activeSign/toSign.css';
 .inpRchoose{
     width:30%;
     position: absolute;
     left:78%!important;
    color:#999;
    line-height:30px;
 }
</style>

