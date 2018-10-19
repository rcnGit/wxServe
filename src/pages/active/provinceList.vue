<template>
    <div class='provinceList'>
      <mt-index-list>
        <mt-index-section index="A">
          <mt-cell title="安徽省" @click.native="provFn('安徽省')"></mt-cell>
          <mt-cell title="澳门特别行政区"  @click.native="provFn('澳门特别行政区')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="B">
          <mt-cell title="北京市" @click.native="provFn('北京市')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="C">
          <mt-cell title="重庆市" @click.native="provFn('重庆市')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="F">
          <mt-cell title="福建省" @click.native="provFn('福建省')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="G">
            <mt-cell title="甘肃省" @click.native="provFn('甘肃省')"></mt-cell>
            <mt-cell title="广东省" @click.native="provFn('广东省')"></mt-cell>
            <mt-cell title="广西壮族" @click.native="provFn('广西壮族')"></mt-cell>
            <mt-cell title="贵州省" @click.native="provFn('贵州省')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="H">
            <mt-cell title="海南省" @click.native="provFn('海南省')"></mt-cell>
            <mt-cell title="河北省" @click.native="provFn('河北省')"></mt-cell>
            <mt-cell title="河南省" @click.native="provFn('河南省')"></mt-cell>
            <mt-cell title="黑龙江省" @click.native="provFn('黑龙江省')"></mt-cell>
            <mt-cell title="湖北省" @click.native="provFn('湖北省')"></mt-cell>
            <mt-cell title="湖南省" @click.native="provFn('湖南省')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="J">
          <mt-cell title="吉林省" @click.native="provFn('吉林省')"></mt-cell>
          <mt-cell title="江苏省" @click.native="provFn('江苏省')"></mt-cell>
          <mt-cell title="江西省" @click.native="provFn('江西省')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="L">
          <mt-cell title="辽宁省" @click.native="provFn('辽宁省')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="N">
          <mt-cell title="内蒙古" @click.native="provFn('内蒙古')"></mt-cell>
          <mt-cell title="宁夏回族" @click.native="provFn('宁夏回族')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="Q">
          <mt-cell title="青海省" @click.native="provFn('青海省')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="S">
          <mt-cell title="山东省" @click.native="provFn('山东省')"></mt-cell>
          <mt-cell title="山西省" @click.native="provFn('山西省')"></mt-cell>
          <mt-cell title="陕西省" @click.native="provFn('陕西省')"></mt-cell>
          <mt-cell title="上海市" @click.native="provFn('上海市')"></mt-cell>
          <mt-cell title="四川省" @click.native="provFn('四川省')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="T">
            <mt-cell title="天津市" @click.native="provFn('天津市')"></mt-cell>
            <mt-cell title="台湾省" @click.native="provFn('台湾省')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="X">
          <mt-cell title="西藏" @click.native="provFn()"></mt-cell>
          <mt-cell title="新疆维吾尔" @click.native="provFn('新疆维吾尔')"></mt-cell>
          <mt-cell title="香港特别行政区" @click.native="provFn('香港特别行政区')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="Y">
          <mt-cell title="云南省" @click.native="provFn('云南省')"></mt-cell>
        </mt-index-section>
        <mt-index-section index="Z">
          <mt-cell title="浙江省"@click.native="provFn('浙江省')"></mt-cell>
        </mt-index-section>
    </mt-index-list>
    </div>
    
</template>
<script>
import { IndexList, IndexSection } from 'mint-ui';//导入我要使用的这些组件
export default {
  name: 'provinceList',
  data () {
    return {
      msg: '我是活动页面，哈哈哈',
      src:{
        path:'/active',
        name:'active'
      },
      routerPhone:'',
      routerPhone2:'',
      msgCode:'',
    }
  },
  components: {//本页我要使用这些组件
      IndexList,
      IndexSection
    },
  methods:{
    provFn:function(val){
        this.$router.push({
          path:this.src.path,
          name:this.src.name,
          params:{
            city : val,
            phone:this.routerPhone,
            phone2:this.routerPhone2,
            msgCode:this.msgCode
          }
        })
    }
  },
  created:function(){
     var father = this.$route.params.father;
      var phone = this.$route.params.phone;
      var phone2 = this.$route.params.phone2;
      this.msgCode = this.$route.params.msgCode;
     if(father=='onlineApply'){
        this.src.path='/onlineApply';
        this.src.name='onlineApply';
     }
     if(phone==''||phone!=undefined){
        this.routerPhone=phone;
     }
     if(phone2==''||phone2!=undefined){
        this.routerPhone2=phone2;
     }
  }
}

</script>
<style>
.mint-indexsection-index{
  text-align: left;
  color:rgb(134,142,158);
  font-size: 13px;
}
.mint-indexlist-navitem{
  color:rgb(93,102,122);
  font-size: 12px;
}
.mint-cell-title{
  text-align: left;
  color:rgb(18,28,50);
  font-size: 14px;
}
</style>