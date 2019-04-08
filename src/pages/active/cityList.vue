<template>
    <div class='provinceList'>
      <mt-index-list>
            <mt-index-section index="热门" style="font-size: .14rem">
                <div class="hotcity">
                    <p style="color:#636363;font-size: .37333rem;text-align:left;">热门城市</p>
                    <div class="city_ul">
                        <div class="city_li city_one" @click="provFn('','')">
                            <p class="city_tit">全国</p>
                            <p class="city_con">National</p>
                        </div>
                        <div class="city_li city_two" @click="provFn('北京市','110000')">
                            <p class="city_tit">北京</p>
                            <p class="city_con">Beijing</p>
                        </div>
                        <div class="city_li city_three" @click="provFn('哈尔滨市','230100')">
                            <p class="city_tit">哈尔滨</p>
                            <p class="city_con">Harbin</p>
                        </div>
                    </div>
                    <div class="city_ul">
                        <div class="city_li city_four" @click="provFn('成都市','510100')">
                            <p class="city_tit">成都</p>
                            <p class="city_con">Chengdu</p>
                        </div>
                        <div class="city_li city_five" @click="provFn('沈阳市','210100')">
                            <p class="city_tit">沈阳</p>
                            <p class="city_con">Shenyang</p>
                        </div>
                        <div class="city_li city_six" @click="provFn('南京市','320100')">
                            <p class="city_tit">南京</p>
                            <p class="city_con">Nanjing</p>
                        </div>
                    </div>
                </div>
            </mt-index-section>
          <mt-index-section  v-for="(item,index) in cityObj" :key='index' :index="item.code" class="section_list">
            <mt-cell :title="item1.cityName" v-for="(item1,index1) in item.name" :key='index1' @click.native="provFn(item1.cityName,item1.cityCode)"></mt-cell>
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
    comefrom: '',
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
        "name": [
            {"cityName":"阿坝藏族羌族自治州","cityCode":"513200"},
            {"cityName":"阿克苏地区","cityCode":"652900"},
            {"cityName":"阿拉善盟","cityCode":"152900"},
            {"cityName":"阿勒泰地区","cityCode":"654300"},
            {"cityName":"阿里地区","cityCode":"542500"},
            {"cityName":"安徽省","cityCode":"340000"},
            {"cityName":"安康市","cityCode":"610900"},
            {"cityName":"安庆市","cityCode":"340800"},
            {"cityName":"安顺市","cityCode":"520400"},
            {"cityName":"安阳市","cityCode":"410500"},
            {"cityName":"鞍山市","cityCode":"210300"},
            {"cityName":"澳门特别行政区","cityCode":"820000"}
            ]
        }, {
        "code": "B",
        "name": [
                {"cityName":"巴彦淖尔市","cityCode":"150800"},
                {"cityName":"巴音郭楞蒙古自治州","cityCode":"652800"},
                {"cityName":"巴中市","cityCode":"511900"},
                {"cityName":"白城市","cityCode":"220800"},
                {"cityName":"白山市","cityCode":"220600"},
                {"cityName":"白银市","cityCode":"620400"},
                {"cityName":"百色市","cityCode":"451000"},
                {"cityName":"蚌埠市","cityCode":"340300"},
                {"cityName":"包头市","cityCode":"150200"},
                {"cityName":"宝鸡市","cityCode":"610300"},
                {"cityName":"保定市","cityCode":"130600"},
                {"cityName":"保山市","cityCode":"530500"},
                {"cityName":"北海市","cityCode":"450500"},
                {"cityName":"北京市","cityCode":"110000"},
                {"cityName":"本溪市","cityCode":"210500"},
                {"cityName":"滨州市","cityCode":"371600"},
                {"cityName":"亳州市","cityCode":"341600"},
                {"cityName":"博尔塔拉蒙古自治州","cityCode":"652700"}
            ]
        }, {
        "code": "C",
        "name": [
                {"cityName":"沧州市","cityCode":"130900"},
                {"cityName":"昌都地区","cityCode":"542100"},
                {"cityName":"昌吉回族自治州","cityCode":"652300"},
                {"cityName":"常德市","cityCode":"430700"},
                {"cityName":"常州市","cityCode":"320400"},
                {"cityName":"巢湖市","cityCode":"341400"},
                {"cityName":"朝阳市","cityCode":"211300"},
                {"cityName":"潮州市","cityCode":"445100"},
                {"cityName":"郴州市","cityCode":"431000"},
                {"cityName":"成都市","cityCode":"510100"},
                {"cityName":"承德市","cityCode":"130800"},
                {"cityName":"池州市","cityCode":"341700"},
                {"cityName":"赤峰市","cityCode":"150400"},
                {"cityName":"崇左市","cityCode":"451400"},
                {"cityName":"滁州市","cityCode":"341100"},
                {"cityName":"楚雄彝族自治州","cityCode":"532300"}
            ]
        }, {
        "code": "D",
        "name": [
                {"cityName":"达州市","cityCode":"511700"},
                {"cityName":"大理白族自治州","cityCode":"532900"},
                {"cityName":"大连市","cityCode":"210200"},
                {"cityName":"大庆市","cityCode":"230600"},
                {"cityName":"大同市","cityCode":"140200"},
                {"cityName":"大兴安岭地区","cityCode":"232700"},
                {"cityName":"丹东市","cityCode":"210600"},
                {"cityName":"德宏傣族景颇族自治州","cityCode":"533100"},
                {"cityName":"德阳市","cityCode":"510600"},
                {"cityName":"德州市","cityCode":"371400"},
                {"cityName":"迪庆藏族自治州","cityCode":"533400"},
                {"cityName":"定西市","cityCode":"621100"},
                {"cityName":"东莞市","cityCode":"441900"},
                {"cityName":"东营市","cityCode":"370500"}
            ]
        }, {
        "code": "E",
        "name": [
                {"cityName":"鄂尔多斯市","cityCode":"150600"},
                {"cityName":"鄂州市","cityCode":"420700"},
                {"cityName":"恩施土家族苗族自治州","cityCode":"422800"}
            ]
        }, {
        "code": "F",
        "name": [
                {"cityName":"防城港市","cityCode":"450600"},
                {"cityName":"佛山市","cityCode":"440600"},
                {"cityName":"福建省","cityCode":"350000"},
                {"cityName":"福州市","cityCode":"350100"},
                {"cityName":"抚顺市","cityCode":"210400"},
                {"cityName":"抚州市","cityCode":"361000"},
                {"cityName":"阜新市","cityCode":"210900"},
                {"cityName":"阜阳市","cityCode":"341200"}
            ]
        }, {
        "code": "G",
        "name": [
            {"cityName":"甘南藏族自治州","cityCode":"623000"},
            {"cityName":"甘肃省","cityCode":"620000"},
            {"cityName":"甘孜藏族自治州","cityCode":"513300"},
            {"cityName":"赣州市","cityCode":"360700"},
            {"cityName":"高雄市","cityCode":"710600"},
            {"cityName":"固原市","cityCode":"640400"},
            {"cityName":"广安市","cityCode":"511600"},
            {"cityName":"广东省","cityCode":"440000"},
            {"cityName":"广西壮族自治区","cityCode":"450000"},
            {"cityName":"广元市","cityCode":"510800"},
            {"cityName":"广州市","cityCode":"440100"},
            {"cityName":"贵港市","cityCode":"450800"},
            {"cityName":"贵阳市","cityCode":"520100"},
            {"cityName":"贵州省","cityCode":"520000"},
            {"cityName":"贵州省毕节地区","cityCode":"522400"},
            {"cityName":"桂林市","cityCode":"450300"},
            {"cityName":"果洛藏族自治州","cityCode":"632600"}
            ]
        }, {
        "code": "H",
        "name": [
            {"cityName":"哈尔滨市","cityCode":"230100"},
            {"cityName":"哈密地区","cityCode":"652200"},
            {"cityName":"海北藏族自治州","cityCode":"632200"},
            {"cityName":"海东地区","cityCode":"632100"},
            {"cityName":"海口市","cityCode":"460100"},
            {"cityName":"海南藏族自治州","cityCode":"632500"},
            {"cityName":"海南省","cityCode":"460000"},
            {"cityName":"海南省省直辖县级行政区划","cityCode":"469000"},
            {"cityName":"海西蒙古族藏族自治州","cityCode":"632800"},
            {"cityName":"邯郸市","cityCode":"130400"},
            {"cityName":"汉中市","cityCode":"610700"},
            {"cityName":"杭州市","cityCode":"330100"},
            {"cityName":"合肥市","cityCode":"340100"},
            {"cityName":"和田地区","cityCode":"653200"},
            {"cityName":"河北省","cityCode":"130000"},
            {"cityName":"河池市","cityCode":"451200"},
            {"cityName":"河南省","cityCode":"410000"},
            {"cityName":"河南省省直辖县级行政区划","cityCode":"419000"},
            {"cityName":"河源市","cityCode":"441600"},
            {"cityName":"菏泽市","cityCode":"371700"},
            {"cityName":"贺州市","cityCode":"451100"},
            {"cityName":"鹤壁市","cityCode":"410600"},
            {"cityName":"鹤岗市","cityCode":"230400"},
            {"cityName":"黑河市","cityCode":"231100"},
            {"cityName":"黑龙江省","cityCode":"230000"},
            {"cityName":"衡水市","cityCode":"131100"},
            {"cityName":"衡阳市","cityCode":"430400"},
            {"cityName":"红河哈尼族彝族自治州","cityCode":"532500"},
            {"cityName":"呼和浩特市","cityCode":"150100"},
            {"cityName":"呼伦贝尔市","cityCode":"150700"},
            {"cityName":"葫芦岛市","cityCode":"211400"},
            {"cityName":"湖北省","cityCode":"420000"},
            {"cityName":"湖北省省直辖县级行政区划","cityCode":"429000"},
            {"cityName":"湖南省","cityCode":"430000"},
            {"cityName":"湖州市","cityCode":"330500"},
            {"cityName":"怀化市","cityCode":"431200"},
            {"cityName":"淮安市","cityCode":"320800"},
            {"cityName":"淮北市","cityCode":"340600"},
            {"cityName":"淮南市","cityCode":"340400"},
            {"cityName":"黄冈市","cityCode":"421100"},
            {"cityName":"黄南藏族自治州","cityCode":"632300"},
            {"cityName":"黄山市","cityCode":"341000"},
            {"cityName":"黄石市","cityCode":"420200"},
            {"cityName":"惠州市","cityCode":"441300"}
            ]
        }, {
        "code": "J",
        "name": [
            {"cityName":"鸡西市","cityCode":"230300"},
            {"cityName":"吉安市","cityCode":"360800"},
            {"cityName":"吉林省","cityCode":"220000"},
            {"cityName":"吉林市","cityCode":"220200"},
            {"cityName":"济南市","cityCode":"370100"},
            {"cityName":"济宁市","cityCode":"370800"},
            {"cityName":"佳木斯市","cityCode":"230800"},
            {"cityName":"嘉兴市","cityCode":"330400"},
            {"cityName":"嘉峪关市","cityCode":"620200"},
            {"cityName":"江门市","cityCode":"440700"},
            {"cityName":"江苏省","cityCode":"320000"},
            {"cityName":"江西省","cityCode":"360000"},
            {"cityName":"焦作市","cityCode":"410800"},
            {"cityName":"揭阳市","cityCode":"445200"},
            {"cityName":"金昌市","cityCode":"620300"},
            {"cityName":"金华市","cityCode":"330700"},
            {"cityName":"锦州市","cityCode":"210700"},
            {"cityName":"晋城市","cityCode":"140500"},
            {"cityName":"晋中市","cityCode":"140700"},
            {"cityName":"荆门市","cityCode":"420800"},
            {"cityName":"荆州市","cityCode":"421000"},
            {"cityName":"景德镇市","cityCode":"360200"},
            {"cityName":"九江市","cityCode":"360400"},
            {"cityName":"酒泉市","cityCode":"620900"}
            ]
        }, {
        "code": "K",
        "name": [
            {"cityName":"喀什地区","cityCode":"653100"},
            {"cityName":"开封市","cityCode":"410200"},
            {"cityName":"克拉玛依市","cityCode":"650200"},
            {"cityName":"克孜勒苏柯尔克孜自治州","cityCode":"653000"},
            {"cityName":"昆明市","cityCode":"530100"}
            ]
        }, {
        "code": "L",
        "name": [
            {"cityName":"拉萨市","cityCode":"540100"},
            {"cityName":"来宾市","cityCode":"451300"},
            {"cityName":"莱芜市","cityCode":"371200"},
            {"cityName":"兰州市","cityCode":"620100"},
            {"cityName":"廊坊市","cityCode":"131000"},
            {"cityName":"乐山市","cityCode":"511100"},
            {"cityName":"丽江市","cityCode":"530700"},
            {"cityName":"丽水市","cityCode":"331100"},
            {"cityName":"连云港市","cityCode":"320700"},
            {"cityName":"凉山彝族自治州","cityCode":"513400"},
            {"cityName":"辽宁省","cityCode":"210000"},
            {"cityName":"辽阳市","cityCode":"211000"},
            {"cityName":"辽源市","cityCode":"220400"},
            {"cityName":"聊城市","cityCode":"371500"},
            {"cityName":"林芝地区","cityCode":"542600"},
            {"cityName":"临沧市","cityCode":"530900"},
            {"cityName":"临汾市","cityCode":"141000"},
            {"cityName":"临夏回族自治州","cityCode":"622900"},
            {"cityName":"临沂市","cityCode":"371300"},
            {"cityName":"柳州市","cityCode":"450200"},
            {"cityName":"六安市","cityCode":"341500"},
            {"cityName":"六盘水市","cityCode":"520200"},
            {"cityName":"龙岩市","cityCode":"350800"},
            {"cityName":"陇南市","cityCode":"621200"},
            {"cityName":"娄底市","cityCode":"431300"},
            {"cityName":"泸州市","cityCode":"510500"},
            {"cityName":"洛阳市","cityCode":"410300"},
            {"cityName":"漯河市","cityCode":"411100"},
            {"cityName":"吕梁市","cityCode":"141100"}
            ]
        }, {
        "code": "M",
        "name": [
            {"cityName":"马鞍山市","cityCode":"340500"},
            {"cityName":"茂名市","cityCode":"440900"},
            {"cityName":"眉山市","cityCode":"511400"},
            {"cityName":"梅州市","cityCode":"441400"},
            {"cityName":"绵阳市","cityCode":"510700"},
            {"cityName":"牡丹江市","cityCode":"231000"}
            ]
        }, {
        "code": "N",
        "name": [
            {"cityName":"那曲地区","cityCode":"542400"},
            {"cityName":"南昌市","cityCode":"360100"},
            {"cityName":"南充市","cityCode":"511300"},
            {"cityName":"南京市","cityCode":"320100"},
            {"cityName":"南宁市","cityCode":"450100"},
            {"cityName":"南平市","cityCode":"350700"},
            {"cityName":"南通市","cityCode":"320600"},
            {"cityName":"南阳市","cityCode":"411300"},
            {"cityName":"内江市","cityCode":"511000"},
            {"cityName":"内蒙古自治区","cityCode":"150000"},
            {"cityName":"宁波市","cityCode":"330200"},
            {"cityName":"宁德市","cityCode":"350900"},
            {"cityName":"宁夏回族自治区","cityCode":"640000"},
            {"cityName":"怒江傈僳族自治州","cityCode":"533300"}
            ]
        }, {
        "code": "P",
        "name": [
            {"cityName":"攀枝花市","cityCode":"510400"},
            {"cityName":"盘锦市","cityCode":"211100"},
            {"cityName":"平顶山市","cityCode":"410400"},
            {"cityName":"平凉市","cityCode":"620800"},
            {"cityName":"萍乡市","cityCode":"360300"},
            {"cityName":"莆田市","cityCode":"350300"},
            {"cityName":"濮阳市","cityCode":"410900"},
            {"cityName":"普洱市","cityCode":"530800"}
            ]
        }, {
        "code": "Q",
        "name": [
            {"cityName":"七台河市","cityCode":"230900"},
            {"cityName":"齐齐哈尔市","cityCode":"230200"},
            {"cityName":"黔东南苗族侗族自治州","cityCode":"522600"},
            {"cityName":"黔南布依族苗族自治州","cityCode":"522700"},
            {"cityName":"黔西南布依族苗族自治州","cityCode":"522300"},
            {"cityName":"钦州市","cityCode":"450700"},
            {"cityName":"秦皇岛市","cityCode":"130300"},
            {"cityName":"青岛市","cityCode":"370200"},
            {"cityName":"青海省","cityCode":"630000"},
            {"cityName":"清远市","cityCode":"441800"},
            {"cityName":"庆阳市","cityCode":"621000"},
            {"cityName":"衢州市","cityCode":"330800"},
            {"cityName":"曲靖市","cityCode":"530300"},
            {"cityName":"泉州市","cityCode":"350500"}
            ]
        }, {
        "code": "R",
        "name": [
            {"cityName":"日喀则地区","cityCode":"542300"},
            {"cityName":"日照市","cityCode":"371100"}
            ]
        }, {
        "code": "S",
        "name": [
            {"cityName":"三门峡市","cityCode":"411200"},
            {"cityName":"三明市","cityCode":"350400"},
            {"cityName":"三亚市","cityCode":"460200"},
            {"cityName":"厦门市","cityCode":"350200"},
            {"cityName":"山东省","cityCode":"370000"},
            {"cityName":"山南地区","cityCode":"542200"},
            {"cityName":"山西省","cityCode":"140000"},
            {"cityName":"陕西省","cityCode":"610000"},
            {"cityName":"汕头市","cityCode":"440500"},
            {"cityName":"汕尾市","cityCode":"441500"},
            {"cityName":"商洛市","cityCode":"611000"},
            {"cityName":"商丘市","cityCode":"411400"},
            {"cityName":"上海市","cityCode":"310000"},
            {"cityName":"上饶市","cityCode":"361100"},
            {"cityName":"韶关市","cityCode":"440200"},
            {"cityName":"邵阳市","cityCode":"430500"},
            {"cityName":"绍兴市","cityCode":"330600"},
            {"cityName":"深圳市","cityCode":"440300"},
            {"cityName":"沈阳市","cityCode":"210100"},
            {"cityName":"十堰市","cityCode":"420300"},
            {"cityName":"石家庄市","cityCode":"130100"},
            {"cityName":"石嘴山市","cityCode":"640200"},
            {"cityName":"双鸭山市","cityCode":"230500"},
            {"cityName":"朔州市","cityCode":"140600"},
            {"cityName":"四川省","cityCode":"510000"},
            {"cityName":"四平市","cityCode":"220300"},
            {"cityName":"松原市","cityCode":"220700"},
            {"cityName":"苏州市","cityCode":"320500"},
            {"cityName":"绥化市","cityCode":"231200"},
            {"cityName":"随州市","cityCode":"421300"},
            {"cityName":"遂宁市","cityCode":"510900"}
            ]
        }, {
        "code": "T",
        "name": [
            {"cityName":"塔城地区","cityCode":"654200"},
            {"cityName":"台北市","cityCode":"710100"},
            {"cityName":"台南市","cityCode":"710500"},
            {"cityName":"台湾省","cityCode":"710000"},
            {"cityName":"台中市","cityCode":"710400"},
            {"cityName":"台州市","cityCode":"331000"},
            {"cityName":"太原市","cityCode":"140100"},
            {"cityName":"泰安市","cityCode":"370900"},
            {"cityName":"泰州市","cityCode":"321200"},
            {"cityName":"唐山市","cityCode":"130200"},
            {"cityName":"桃园市","cityCode":"710300"},
            {"cityName":"天津市","cityCode":"120000"},
            {"cityName":"天水市","cityCode":"620500"},
            {"cityName":"铁岭市","cityCode":"211200"},
            {"cityName":"通化市","cityCode":"220500"},
            {"cityName":"通辽市","cityCode":"150500"},
            {"cityName":"铜川市","cityCode":"610200"},
            {"cityName":"铜陵市","cityCode":"340700"},
            {"cityName":"铜仁地区","cityCode":"522200"},
            {"cityName":"吐鲁番地区","cityCode":"652100"}
            ]
        }, {
        "code": "W",
        "name": [
            {"cityName":"威海市","cityCode":"371000"},
            {"cityName":"潍坊市","cityCode":"370700"},
            {"cityName":"渭南市","cityCode":"610500"},
            {"cityName":"温州市","cityCode":"330300"},
            {"cityName":"文山壮族苗族自治州","cityCode":"532600"},
            {"cityName":"乌海市","cityCode":"150300"},
            {"cityName":"乌兰察布市","cityCode":"150900"},
            {"cityName":"乌鲁木齐市","cityCode":"650100"},
            {"cityName":"无锡市","cityCode":"320200"},
            {"cityName":"芜湖市","cityCode":"340200"},
            {"cityName":"吴忠市","cityCode":"640300"},
            {"cityName":"梧州市","cityCode":"450400"},
            {"cityName":"武汉市","cityCode":"420100"},
            {"cityName":"武威市","cityCode":"620600"}
            ]
        }, {
        "code": "X",
        "name": [
            {"cityName":"西安市","cityCode":"610100"},
            {"cityName":"西藏自治区","cityCode":"540000"},
            {"cityName":"西宁市","cityCode":"630100"},
            {"cityName":"西双版纳傣族自治州","cityCode":"532800"},
            {"cityName":"锡林郭勒盟","cityCode":"152500"},
            {"cityName":"咸宁市","cityCode":"421200"},
            {"cityName":"咸阳市","cityCode":"610400"},
            {"cityName":"香港特别行政区","cityCode":"810000"},
            {"cityName":"湘潭市","cityCode":"430300"},
            {"cityName":"湘西土家族苗族自治州","cityCode":"433100"},
            {"cityName":"襄樊市","cityCode":"420600"},
            {"cityName":"孝感市","cityCode":"420900"},
            {"cityName":"忻州市","cityCode":"140900"},
            {"cityName":"新北市","cityCode":"710200"},
            {"cityName":"新疆维吾尔自治区","cityCode":"650000"},
            {"cityName":"新疆维吾尔自治区自治区直辖县级行政区划","cityCode":"659000"},
            {"cityName":"新乡市","cityCode":"410700"},
            {"cityName":"新余市","cityCode":"360500"},
            {"cityName":"信阳市","cityCode":"411500"},
            {"cityName":"邢台市","cityCode":"130500"},
            {"cityName":"兴安盟","cityCode":"152200"},
            {"cityName":"宿迁市","cityCode":"321300"},
            {"cityName":"宿州市","cityCode":"341300"},
            {"cityName":"徐州市","cityCode":"320300"},
            {"cityName":"许昌市","cityCode":"411000"},
            {"cityName":"宣城市","cityCode":"341800"}
            ]
        }, {
        "code": "Y",
        "name": [
            {"cityName":"雅安市","cityCode":"511800"},
            {"cityName":"烟台市","cityCode":"370600"},
            {"cityName":"延安市","cityCode":"610600"},
            {"cityName":"延边朝鲜族自治州","cityCode":"222400"},
            {"cityName":"盐城市","cityCode":"320900"},
            {"cityName":"扬州市","cityCode":"321000"},
            {"cityName":"阳江市","cityCode":"441700"},
            {"cityName":"阳泉市","cityCode":"140300"},
            {"cityName":"伊春市","cityCode":"230700"},
            {"cityName":"伊犁哈萨克自治州","cityCode":"654000"},
            {"cityName":"宜宾市","cityCode":"511500"},
            {"cityName":"宜昌市","cityCode":"420500"},
            {"cityName":"宜春市","cityCode":"360900"},
            {"cityName":"益阳市","cityCode":"430900"},
            {"cityName":"银川市","cityCode":"640100"},
            {"cityName":"鹰潭市","cityCode":"360600"},
            {"cityName":"营口市","cityCode":"210800"},
            {"cityName":"永州市","cityCode":"431100"},
            {"cityName":"榆林市","cityCode":"610800"},
            {"cityName":"玉林市","cityCode":"450900"},
            {"cityName":"玉树藏族自治州","cityCode":"632700"},
            {"cityName":"玉溪市","cityCode":"530400"},
            {"cityName":"岳阳市","cityCode":"430600"},
            {"cityName":"云浮市","cityCode":"445300"},
            {"cityName":"云南省","cityCode":"530000"},
            {"cityName":"运城市","cityCode":"140800"}
            ]
        }, {
        "code": "Z",
        "name": [
            {"cityName":"枣庄市","cityCode":"370400"},
            {"cityName":"湛江市","cityCode":"440800"},
            {"cityName":"张家界市","cityCode":"430800"},
            {"cityName":"张家口市","cityCode":"130700"},
            {"cityName":"张掖市","cityCode":"620700"},
            {"cityName":"漳州市","cityCode":"350600"},
            {"cityName":"长春市","cityCode":"220100"},
            {"cityName":"长沙市","cityCode":"430100"},
            {"cityName":"长治市","cityCode":"140400"},
            {"cityName":"昭通市","cityCode":"530600"},
            {"cityName":"肇庆市","cityCode":"441200"},
            {"cityName":"浙江省","cityCode":"330000"},
            {"cityName":"镇江市","cityCode":"321100"},
            {"cityName":"郑州市","cityCode":"410100"},
            {"cityName":"中国","cityCode":"CN"},
            {"cityName":"中山市","cityCode":"442000"},
            {"cityName":"中卫市","cityCode":"640500"},
            {"cityName":"重庆市","cityCode":"500000"},
            {"cityName":"舟山市","cityCode":"330900"},
            {"cityName":"周口市","cityCode":"411600"},
            {"cityName":"珠海市","cityCode":"440400"},
            {"cityName":"株洲市","cityCode":"430200"},
            {"cityName":"驻马店市","cityCode":"411700"},
            {"cityName":"资阳市","cityCode":"512000"},
            {"cityName":"淄博市","cityCode":"370300"},
            {"cityName":"自贡市","cityCode":"510300"},
            {"cityName":"遵义市","cityCode":"520300"}
            ]
        }]
    }
  },
  components: {//本页我要使用这些组件
      IndexList,
      IndexSection
    },
  methods:{
    provFn:function(cityName,cityCode){
        this.$router.push({
          path:this.src.path,
          name:this.src.name,
          query:{
            city: cityName,
            code: cityCode,
            comefrom:this.comefrom,//是否糖罐进入
           // phone:this.routerPhone,
           // phone2:this.routerPhone2,
           // msgCode:this.msgCode
          }
        })
    }
  },
  created:function(){
    if(this.$route.query.comefrom=='tangguan'||this.$route.params.comefrom=='tangguan'){
        this.comefrom ='tangguan'; 
    }
    //  var father = this.$route.query.father;
    //   var phone = this.$route.query.phone;
    //   var phone2 = this.$route.query.phone2;
    //   this.msgCode = this.$route.query.msgCode;
    //  if(father=='onlineApply'){
    //     this.src.path='/onlineApply';
    //     this.src.name='onlineApply';
    //  }
    //  if(phone==''||phone!=undefined){
    //     this.routerPhone=phone;
    //  }
    //  if(phone2==''||phone2!=undefined){
    //     this.routerPhone2=phone2;
    //  }
  },
  beforeRouteLeave(to, from, next) {
      console.log(to)
      console.log(from)
        // 设置下一个路由的 meta
        to.meta.keepAlive = false; // 让 A 不缓存，即刷新
        next();
    }
}

</script>
<style>
::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
}
.mint-cell-wrapper{
    padding-left: .4rem!important;
}
.mint-indexlist-content{
    margin-right: 0!important;    
    min-height: 670px; 
    
}
.mint-indexlist ul li:nth-of-type(1) .mint-indexsection-index{
    display: none;
}
.section_list{
    padding-right: .48rem;
}
.mint-indexsection-index{
  text-align: left;
  color:rgb(134,142,158);
  font-size: 13px;
}
.mint-indexlist-nav{
    border: 0;
    background-color: transparent;
    position: fixed;
    top: 15%;
}
.mint-indexlist-navitem{
  color:#999;
  font-size: .32rem;
  padding: .18rem 0 0 0.08rem;
  font-weight: 500;
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
    width: 2.71667rem;
    height:  2.133333rem;
    margin: .326667rem .316667rem 0 0;
    padding: .186667rem 0 0 .253333rem;
    border-radius: .06rem;
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