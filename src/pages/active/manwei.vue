<template>
  <div class='manwei'>
    <div>
     <img :src="img_url" />
    </div>
  </div>
  
</template>
<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Toast } from 'mint-ui';
export default {
name: 'manwei',
data:function(){
  return {
    img_url: 'http://file0.datangwealth.com/g1/M00/18/57/rBAeYFzANzqAP8s_AAK1p1fcXmk072.jpg?filename=%E7%BB%88%E7%A8%BF%E5%9B%BE%E7%89%87~.jpg',
  }
},
components:{MessageBox,Toast},
methods:{
  
},
mounted:function(){
  $('.manwei img').css({"min-height":document.body.scrollHeight})
},
created:function(){
  this.GasyncSDKConifg()
}
}
      

</script>
<style>
.manwei img{
  display: block;
  width: 100%;
  margin:0;
  padding: 0;
}
/* body{
  margin:0!important;
} */
</style>

