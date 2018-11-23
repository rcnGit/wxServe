<template>
    <div class='provinceList'>
        <div class="hotcity">
            <p style="color:#636363;font-size: .37333rem;text-align:left;">热门城市</p>
            <div class="city_ul">
                <div class="city_li city_one" @click="provFn('')">
                    <p class="city_tit">全国</p>
                    <p class="city_con">National</p>
                </div>
                <div class="city_li city_two" @click="provFn('北京')">
                    <p class="city_tit">北京</p>
                    <p class="city_con">Beijing</p>
                </div>
                <div class="city_li city_three" @click="provFn('哈尔滨')">
                    <p class="city_tit">哈尔滨</p>
                    <p class="city_con">Harbin</p>
                </div>
            </div>
            <div class="city_ul">
                <div class="city_li city_four" @click="provFn('成都')">
                    <p class="city_tit">成都</p>
                    <p class="city_con">Chengdu</p>
                </div>
                <div class="city_li city_five" @click="provFn('沈阳')">
                    <p class="city_tit">沈阳</p>
                    <p class="city_con">Shenyang</p>
                </div>
                <div class="city_li city_six" @click="provFn('南京')">
                    <p class="city_tit">南京</p>
                    <p class="city_con">Nanjing</p>
                </div>
            </div>
        </div>
      <mt-index-list>
          <mt-index-section  v-for="(item,index) in cityObj" :key='index' :index="item.code">
            <mt-cell :title="item1" v-for="(item1,index1) in item.name" :key='index1' @click.native="provFn(item1)"></mt-cell>
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
      cityObj:
    [{
        "code": "A",
        "name": ["阿坝藏族羌族自治州", "阿克苏地区", "阿拉善盟", "阿勒泰地区", "阿里地区", "鞍山市", "安康市", "安庆市", "安顺市", "安阳市"]
        }, {
        "code": "B",
        "name": ["巴彦淖尔市", "巴音郭楞蒙古自治州", "巴中市", "白城市", "白山市", "白银市", "百色市", "蚌埠市", "包头市", "保定市", "保山市", "宝鸡市", "北海市", "本溪市", "毕节地区", "滨州市", "博尔塔拉蒙古自治州"]
        }, {
        "code": "C",
        "name": ["沧州市", "昌都地区", "昌吉回族自治州", "常德市", "常州市", "长春市", "长沙市", "长治市", "朝阳市", "潮州市", "巢湖市", "郴州市", "成都市", "承德市", "池州市", "赤峰市", "崇左市", "滁州市", "楚雄彝族自治州"]
        }, {
        "code": "D",
        "name": ["达州市", "大理白族自治州", "大连市", "大庆市", "大同市", "大兴安岭地区", "丹东市", "德宏傣族景颇族自治州", "德阳市", "德州市", "迪庆藏族自治州", "定西市", "东营市", "东莞市"]
        }, {
        "code": "E",
        "name": ["鄂尔多斯市", "鄂州市", "恩施土家族苗族自治州"]
        }, {
        "code": "F",
        "name": ["防城港市", "佛山市", "福州市", "抚顺市", "抚州市", "阜新市", "阜阳市"]
        }, {
        "code": "G",
        "name": ["甘南藏族自治州", "甘孜藏族自治州", "赣州市", "高雄市", "固原市", "广安市", "广元市", "广州市", "桂林市", "贵港市", "贵阳市", "果洛藏族自治州"]
        }, {
        "code": "H",
        "name": ["哈尔滨市", "哈密地区", "海北藏族自治州", "海东地区", "海口市", "海南藏族自治州", "海西蒙古族藏族自治州", "邯郸市", "汉中市", "杭州市", "菏泽市", "和田地区", "合肥市", "河池市", "河源市", "鹤壁市", "鹤岗市", "贺州市", "黑河市", "衡水市", "衡阳市", "红河哈尼族彝族自治州", "呼和浩特市", "呼伦贝尔市", "葫芦岛市", "湖州市", "怀化市", "淮安市", "淮北市", "淮南市", "黄冈市", "黄南藏族自治州", "黄山市", "黄石市", "惠州市", "亳州市"]
        }, {
        "code": "J",
        "name": ["鸡西市", "吉安市", "吉林市", "济南市", "济宁市", "嘉兴市", "嘉峪关市", "佳木斯市", "江门市", "焦作市", "揭阳市", "金昌市", "金华市", "锦州市", "晋城市", "晋中市", "荆门市", "荆州市", "景德镇市", "九江市", "酒泉市"]
        }, {
        "code": "K",
        "name": ["喀什地区", "开封市", "克拉玛依市", "克孜勒苏柯尔克孜自治州", "昆明市"]
        }, {
        "code": "L",
        "name": ["拉萨市", "莱芜市", "来宾市", "兰州市", "廊坊市", "乐山市", "丽江市", "丽水市", "连云港市", "凉山彝族自治州", "聊城市", "辽阳市", "辽源市", "林芝地区", "临沧市", "临汾市", "临夏回族自治州", "临沂市", "柳州市", "六安市", "六盘水市", "龙岩市", "陇南市", "娄底市", "吕梁市", "洛阳市", "泸州市", "漯河市"]
        }, {
        "code": "M",
        "name": ["马鞍山市", "茂名市", "梅州市", "眉山市", "绵阳市", "牡丹江市"]
        }, {
        "code": "N",
        "name": ["那曲地区", "南昌市", "南充市", "南京市", "南宁市", "南平市", "南通市", "南阳市", "内江市", "宁波市", "宁德市", "怒江傈僳族自治州"]
        }, {
        "code": "P",
        "name": ["攀枝花市", "盘锦市", "萍乡市", "平顶山市", "平凉市", "莆田市", "濮阳市"]
        }, {
        "code": "Q",
        "name": ["七台河市", "齐齐哈尔市", "黔东南苗族侗族自治州", "黔南布依族苗族自治州", "黔西南布依族苗族自治州", "钦州市", "秦皇岛市", "青岛市", "清远市", "庆阳市", "曲靖市", "泉州市", "衢州市"]
        }, {
        "code": "R",
        "name": ["日喀则地区", "日照市"]
        }, {
        "code": "S",
        "name": ["三门峡市", "三明市", "三亚市", "山南地区", "汕头市", "汕尾市", "商洛市", "商丘市", "上饶市", "韶关市", "邵阳市", "绍兴市", "深圳市", "沈阳市", "十堰市", "石家庄市", "石嘴山市", "双鸭山市", "朔州市", "思茅市", "四平市", "松原市", "苏州市", "宿迁市", "宿州市", "随州市", "绥化市", "遂宁市"]
        }, {
        "code": "T",
        "name": ["塔城地区", "台北市", "台南市", "台中市", "台州市", "泰安市", "泰州市", "太原市", "唐山市", "桃园市", "天水市", "铁岭市", "通化市", "通辽市", "铜川市", "铜陵市", "铜仁地区", "吐鲁番地区"]
        }, {
        "code": "W",
        "name": ["威海市", "潍坊市", "渭南市", "温州市", "文山壮族苗族自治州", "乌海市", "乌兰察布市", "乌鲁木齐市", "无锡市", "芜湖市", "梧州市", "吴忠市", "武汉市", "武威市"]
        }, {
        "code": "X",
        "name": ["西安市", "西宁市", "西双版纳傣族自治州", "锡林郭勒盟", "厦门市", "咸宁市", "咸阳市", "襄樊市", "湘潭市", "湘西土家族苗族自治州", "孝感市", "新北市", "新乡市", "新余市", "忻州市", "信阳市", "兴安盟", "邢台市", "徐州市", "许昌市", "宣城市"]
        }, {
        "code": "Y",
        "name": ["雅安市", "烟台市", "盐城市", "延安市", "延边朝鲜族自治州", "扬州市", "阳江市", "阳泉市", "伊春市", "伊犁哈萨克自治州", "宜宾市", "宜昌市", "宜春市", "益阳市", "银川市", "鹰潭市", "营口市", "永州市", "榆林市", "玉林市", "玉树藏族自治州", "玉溪市", "岳阳市", "云浮市", "运城市"]
        }, {
        "code": "Z",
        "name": ["枣庄市", "湛江市", "漳州市", "张家界市", "张家口市", "张掖市", "昭通市", "肇庆市", "镇江市", "郑州市", "中山市", "中卫市", "舟山市", "周口市", "珠海市", "株洲市", "驻马店市", "资阳市", "淄博市", "自贡市", "遵义市"]
        }]
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
          query:{
            city : val,
            phone:this.routerPhone,
            phone2:this.routerPhone2,
            msgCode:this.msgCode
          }
        })
    }
  },
  created:function(){
     var father = this.$route.query.father;
      var phone = this.$route.query.phone;
      var phone2 = this.$route.query.phone2;
      this.msgCode = this.$route.query.msgCode;
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
  color:#999;
  font-size: .32rem;
  padding-top: .08667rem;
}
.mint-cell-title{
  text-align: left;
  color:rgb(18,28,50);
  font-size: 14px;
}
.hotcity{
    padding: .4rem .533333rem;
    background: #F0F0F0;
}
.hotcity .city_ul{
    overflow: hidden;
}
.hotcity .city_li{
    float: left;
    width: 2.746667rem;
    height:  2.133333rem;
    margin: .346667rem .346667rem 0 0;
    padding: .186667rem 0 0 .253333rem;
}
.hotcity .city_li:nth-of-type(3){
    margin-right: 0;
}
.city_one{
    background: url(./img/natiay.png) no-repeat;
    background-size: 2.746667rem 2.133333rem;  
}
.city_li p{
    color: #fff;
    text-align: left;
}
.city_li .city_tit{
    font-size: .373333rem;
}
.city_li .city_con{
    font-size: .32rem;
    padding-top: .16rem;
}
.city_two{
    background: url(./img/img_beijing.png) no-repeat;
    background-size: 2.746667rem 2.133333rem;  
}
.city_three{
    background: url(./img/img_haerbin.png) no-repeat;
    background-size: 2.746667rem 2.133333rem;  
}
.city_four{
    background: url(./img/img_chengdu.png) no-repeat;
    background-size: 2.746667rem 2.133333rem;  
}
.city_five{
    background: url(./img/img_shenyang.png) no-repeat;
    background-size: 2.746667rem 2.133333rem;  
}
.city_six{
    background: url(./img/img_nan.png) no-repeat;
    background-size: 2.746667rem 2.133333rem;  
}
</style>