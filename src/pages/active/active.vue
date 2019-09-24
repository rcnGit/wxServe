<template>
    <div class='active'>
        <div class='act_head'>
          <div class="act_h_left" v-show="showSelect">
              <!-- <router-link to='/cityList'><span>{{pcity}}</span><img src='./img/upBtn_img@2x.png'/>
              </router-link> -->
              <div @click="toCity()" v-if='showCity'><span>{{pcity}}</span><img src='./img/upBtn_img@2x.png'/>
              </div>
              <div v-else style="overflow: hidden">
                <span  @click="selectC()" class="tiyan">{{currentTags}}</span><img  @click="selectC()" src='./img/upBtn_img@2x.png'/>
                <mt-popup v-model="popupVisible" position="bottom" pop-transition="popup-fade" :closeOnClickModal='clickfalse'>
                  
                  <mt-button @click="handConfirm" class="Tsure">确认</mt-button>
                  <mt-picker :slots="slots" @change="onValuesChange" value-key="centerName" item-height="44"> </mt-picker>
                </mt-popup>
              </div>
          </div>
          <div class="act_h_right">
            <input placeholder="请输入活动名称关键字" class='searchInput'ref='name'/>
            <img src='./img/search@2x.png' class='search_img' @click.stop='search'/>
          </div>
        </div><!--act_head-->
        
          <mt-navbar v-model="selected">
            <mt-tab-item id="1" @click.native.prevent="getData">即将举办</mt-tab-item>
            <mt-tab-item id="2" @click.native.prevent="getData2">举办中</mt-tab-item>
            <mt-tab-item id="3"  @click.native.prevent="getData3('wz')">已举办</mt-tab-item>
          </mt-navbar>
          
          <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class='noData active_nodata' ref='nodata' v-if='isShow'>
                    <img src='./img/noactive@2x.png'/>
                    <p class='fSize16' style="padding-top: 1.066667rem;color: #363636;font-weight: 500;">{{noActive1}}</p>
                    <p class='fSize16' @click="Loadpage" style="color:#DF1E1D;padding-top: .366667rem" v-show="showCheck1">先看看其他精彩活动吧>></p>
                  </div>
                  <div id='active_content' v-else>
                    <div style='height: .3rem;background:#f1f1f1;'></div>
                    <div
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="isMoreLoading"
                    :infinite-scroll-immediate-check="true"
                    infinite-scroll-distance="10"
                    v-if="selected == 1">
                      <div v-for="item in items" class="active_demo" @click='en_details($event)' :oaActId='item.oaActId' :ActName='item.actName'>
                          <div style="position:relative;">
                            <img v-if="item.cover" v-bind:src="item.cover" width='100%' style='min-height:180px;max-height:200px;'/>
                            <img v-else v-bind:src="item.bulletinPicture" width='100%' style='min-height:180px;max-height:200px;'/>
                            <div class='meng'><img src='./img/img_meng2.png'width='100%' height='100%'/></div> 
                          </div>
                        <div class='textMain'>
                          <p class='active_date' v-if="subTime(item.beginTime)==subTime(item.endTime)">活动时间：{{subTime(item.beginTime)}}</p>
                          <p class='active_date' v-else>活动时间：{{subTime(item.beginTime)}}至{{subTime(item.endTime)}}</p>
                          <p class='active_title' style='padding-bottom:8px;'>{{item.actCity}}</p>
                          <!-- <p class='active_demo_content' style='padding-bottom:10px;'>{{item.content}}</p> -->
                        </div>
                        
                        <div class='img_text'>
                            <!-- <p class='img_active_date'>活动时间:{{subTime(item.beginTime)}}</p> -->
                            <p class='img_active_title'>{{item.actName}}</p>
                            
                        </div>
                    </div> 
                  </div>
                    <div class='loading' style="font-size:18px;color:rgb(59,59,59);line-height:50px;display:none;">
                      加载中，请稍后......
                    </div>
                    <div class='loader'ref='loader' style="font-size:14px;color:#685F57;line-height:50px;display:none;">
                      已经到底了
                    </div>
                  </div><!--active_content-->
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class='noData active_nodata' ref='nodata' v-if='isShow2'>
                    <img src='./img/noactive@2x.png'/>
                    <p class='fSize16' style="padding-top: 1.066667rem;color: #363636;font-weight: 500;">{{noActive2}}</p>
                    <p class='fSize16' @click="Loadpage" style="color:#DF1E1D;padding-top: .366667rem" v-show="showCheck2">先看看其他精彩活动吧>></p>
                  </div>
                  <div id='active_content' v-else>
                    <div style='height: .3rem;background:#f1f1f1;'></div>
                    <div
                    v-infinite-scroll="loadMore2"
                    infinite-scroll-disabled="isMoreLoading2"
                    :infinite-scroll-immediate-check="true"
                    infinite-scroll-distance="10"
                    v-if="selected == 2">
                     <div v-for="item in items2" class="active_demo" @click='en_details($event)' :oaActId='item.oaActId' :ActName='item.actName'>
                         <div style="position:relative;">
                           <img v-if="item.cover" v-bind:src="item.cover" width='100%' style='min-height:180px;max-height:200px;'/>
                           <img v-else v-bind:src="item.bulletinPicture" width='100%' style='min-height:180px;max-height:200px;'/>
                           <div class='meng'><img src='./img/img_meng2.png'width='100%' height='100%'/></div> 
                         </div>
                        <div class='textMain'>
                          <p class='active_date' v-if="subTime(item.beginTime)==subTime(item.endTime)">活动时间：{{subTime(item.beginTime)}}</p>
                          <p class='active_date' v-else>活动时间：{{subTime(item.beginTime)}}至{{subTime(item.endTime)}}</p>
                          <p class='active_title' style='padding-bottom:8px;'>{{item.actCity}}</p>
                          <!-- <p class='active_demo_content' style='padding-bottom:10px;'>{{item.content}}</p> -->
                        </div>
                        
                        <div class='img_text'>
                            <!-- <p class='img_active_date'>活动时间:{{subTime(item.beginTime)}}</p> -->
                            <p class='img_active_title'>{{item.actName}}</p>
                            
                        </div>
                      </div> 
                    </div>
                    <div class='loading' style="font-size:18px;color:rgb(59,59,59);line-height:50px;display:none;">
                      加载中，请稍后......
                    </div>
                    <div class='loader'ref='loader2' style="font-size:14px;color:#685F57;line-height:50px;display:none;">
                      已经到底了
                    </div>
                  </div><!--active_content-->
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
              <div class='noData active_nodata' ref='nodata' v-if='isShow3'>
                <img src='./img/noactive@2x.png'/>
                <p class='fSize16' style="padding-top: 1.066667rem;color: #363636;font-weight: 500;">{{noActive3}}</p>
                <p class='fSize16' @click="Loadpage" style="color:#DF1E1D;padding-top: .366667rem" v-show="showCheck3">先看看其他精彩活动吧>></p>
              </div>
              <div id='active_content' v-else>
                <div style='height: .3rem;background:#f1f1f1;'></div>
                <div
                v-infinite-scroll="loadMore3"
                infinite-scroll-disabled="isMoreLoading3"
                :infinite-scroll-immediate-check="true"
                infinite-scroll-distance="10"
                v-if="selected == 3">
                 <div v-for="item in items3" class="active_demo" @click='en_details($event)' :oaActId='item.oaActId' :ActName='item.actName'>
                     <div style="position:relative;">
                       <img v-if="item.cover" v-bind:src="item.cover" width='100%' style='min-height:180px;max-height:200px;'/>
                       <img v-else v-bind:src="item.bulletinPicture" width='100%' style='min-height:180px;max-height:200px;'/>
                       <div class='meng'><img src='./img/img_meng2.png'width='100%' height='100%'/></div> 
                     </div>
                    <div class='textMain'>
                      <p class='active_date' v-if="subTime(item.beginTime)==subTime(item.endTime)">活动时间：{{subTime(item.beginTime)}}</p>
                      <p class='active_date' v-else>活动时间：{{subTime(item.beginTime)}}至{{subTime(item.endTime)}}</p>
                      <p class='active_title' style='padding-bottom:8px;'>{{item.actCity}}</p>
                      <!-- <p class='active_demo_content' style='padding-bottom:10px;'>{{item.content}}</p> -->
                    </div>
                    
                    <div class='img_text'>
                        <!-- <p class='img_active_date'>活动时间:{{subTime(item.beginTime)}}</p> -->
                        <p class='img_active_title'>{{item.actName}}</p>
                        
                    </div>
                  </div> 
                </div>
                <div class='loading' style="font-size:18px;color:rgb(59,59,59);line-height:50px;display:none;">
                  加载中，请稍后......
                </div>
                <div class='loader'ref='loader3' style="font-size:14px;color:#685F57;line-height:50px;display:none;">
                  已经到底了
                </div>
              </div><!--active_content-->
            </mt-tab-container-item>
          </mt-tab-container>
        
        <!-- <div class='noData active_nodata' ref='nodata' v-if='isShow'>
          <img src='./img/noactive@2x.png'/>
          <p class='fSize16' style="padding-top: 1.066667rem;color: #999;">暂未搜索到相关结果</p>
          <p class='fSize16' @click="Loadpage" style="color:#DF1E1D;padding-top: .366667rem">先看看其他精彩活动吧>></p>
        </div>
        <div id='active_content' v-else>
          <div style='height:20px;background:#f1f1f1;'></div>
           <div v-for="item in items" class="active_demo" @click='en_details($event)' :oaActId='item.oaActId' :ActName='item.actName'>
               <div style="position:relative;">
                 <img v-if="item.cover" v-bind:src="item.cover" width='100%' style='min-height:180px;max-height:200px;'/>
                 <img v-else v-bind:src="item.bulletinPicture" width='100%' style='min-height:180px;max-height:200px;'/>
                 <div class='meng'><img src='./img/img_meng.png'width='100%' height='100%'/></div> 
               </div>
              <div class='textMain'>
                <p class='active_title' style='padding-bottom:8px;'>{{item.location}}</p>
                <p class='active_demo_content' style='padding-bottom:10px;'>{{item.content}}</p>
              </div>
              
              <div class='img_text'>
                  <p class='img_active_date'>活动时间:{{subTime(item.beginTime)}}</p>
                  <p class='img_active_title'>{{item.actName}}</p>
                  
              </div>
          </div> 
          <div class='loading' style="font-size:18px;color:rgb(59,59,59);line-height:50px;display:none;">
            加载中，请稍后......
          </div>
          <div class='loader'ref='loader' style="font-size:14px;color:#685F57;line-height:50px;display:none;">
            已经到底了
          </div>
        </div>active_content -->
        <!-- <comfooter></comfooter> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    
</template>
<script>
import cityList from './cityList.vue'
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';//提示框
import { Navbar, TabItem, Picker, Popup} from 'mint-ui';
import { Toast } from 'mint-ui';
import axios from 'axios'
import comfooter from '../../components/footer'
import { getCookie,setCookie} from '@/common/js/cookie.js'
var arrData=[];
let pickerArray = [{centerName:'全部',groupId:''}];
export default {
  name: 'active',
  data:function(){
    return {
      clickfalse:false,
      popupVisible: false,
      checkkey:'',
      msg: '活动页面',
      allList:[],
      allList2:[],
      allList3:[],
      noActive1:'暂未搜索到相关结果',
      noActive2:'暂未搜索到相关结果',
      noActive3:'暂未搜索到相关结果',
      showCheck1:true,
      showCheck2:true,
      showCheck3:true,
      cd:true,
      load:true,
      load2:true,
      load3:true,
      ifSearch:false,
      isShow:false,
      isShow2:false,
      isShow3:false,
      isMoreLoading: true, // 加载更多中
      isMoreLoading2: true, // 加载更多中
      isMoreLoading3: true, // 加载更多中
      pcity:"全国",
      pTiyan:'杭州一部体验',
      showCity:true,
      showSelect:true,
      loadObj:{
        text: '加载中...',
        spinnerType: 'triple-bounce'
      },
      backurl: location.href.split('?')[0],
      backUrl: encodeURIComponent('https://interface.tdyhfund.com/wxservice/wxexternal?opName=getactiveinfo'),
      param:{
          pageNo:1,
          cityCode:'',
          actName:'',
          code:'',
          comefrom:'',
          //isRed: 0,
         // backUrl: location.href.split('#')[0]+'/wxservice/wxservice?opName=getactiveinfo'
         backUrl: location.href.split('?')[0],
         actStatus: '0',//根据时间筛选活动状态 0即将举办 1举办中 2已举办
          officeId: '',  //业务部门id
      },
      param2:{
          pageNo:1,
          cityCode:'',
          actName:'',
          code:'',
          comefrom:'',
          //isRed: 0,
         // backUrl: location.href.split('#')[0]+'/wxservice/wxservice?opName=getactiveinfo'
         backUrl: location.href.split('?')[0],
         actStatus: '1',//根据时间筛选活动状态 0即将举办 1举办中 2已举办
          officeId: '',  //业务部门id
      },
      param3:{
          pageNo:1,
          cityCode:'',
          actName:'',
          code:'',
          comefrom:'',
          //isRed: 0,
         // backUrl: location.href.split('#')[0]+'/wxservice/wxservice?opName=getactiveinfo'
         backUrl: location.href.split('?')[0],
         actStatus: '2',//根据时间筛选活动状态 0即将举办 1举办中 2已举办
          officeId: '',  //业务部门id
      },
      items:[],
      items2:[],
      items3:[],
      selected: '',
      slots:[{
        flex: 1,
        values: Object.keys(pickerArray),
        className: 'slot1',
        textAlign: 'center'
      }],
      pickerVal:'',
      currentTags:'全部',
      areaId:'',
      groupId:'',
      Name:'',
      more:false,
      more2:false,
      more3:false,
      haveno2:false,
      haveno:false,
    }
  },
  components:{MessageBox,comfooter,Toast, Navbar, TabItem,Picker, Popup},
  methods:{
    selectC(){
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
     // console.log(picker.values)
     // console.log(values[0].groupId)
      this.pickerVal = values
    },
    handConfirm(){
      this.popupVisible = false
      //console.log(this.pickerVal[0].groupId)
      this.currentTags = this.pickerVal[0].centerName
      this.$refs.name.value = ''
      console.log(this.groupId)
      if(this.pickerVal[0].groupId != this.groupId){
        this.groupId = this.pickerVal[0].groupId 
        if(!this.groupId == false){
        }else{
          this.groupId = this.$route.query.areaId
        }
        this.param.officeId = this.groupId;
        this.param2.officeId = this.groupId;
        this.param3.officeId = this.groupId;
        this.getData2('wz');
      }
    },
    subTime:function(time){
      time=time.substr(0,10);
      return time;
    },
    toCity:function(){
      this.$router.push({
          path:'/cityList',
          name:'cityList',
          query:{
            comefrom:this.$route.query.comefrom,//是否糖罐进入
          }
        })
    },
    en_details:function(e){
        var oaActId=event.currentTarget.getAttribute('oaactid');//绑定事件的元素
        var ActName=event.currentTarget.getAttribute('ActName');//绑定事件的元素  

        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
        var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
        if ((/micromessenger/i).test(ua)) {//isWeixinBrowser()//判断是不是微信 
            //  window.location.href=this.Host+'weixin-h5/index.html#/activeDetail?actId='+id+'&actName='+actName;
           // return
           var that=this;
        // console.log(event.target);
        // console.log(event.target.getAttribute('oaactid'))//点击到的元素
          
          that.$router.push({
              path:'/activeDetail',
              name:'activeDetail',
              query:{
                actId: oaActId,
                actName : ActName,
                comefrom:that.param.comefrom,//是否糖罐进入
              }
            })
            var huoId = oaActId;
            var huoName = ActName;
            var actObj = {'huoId': huoId, 'huoName': huoName}
            actObj = JSON.stringify(actObj)
            localStorage.setItem('activiy',actObj)
        }else{
            //window.location.href=this.Host+'weixin-h5/index.html#/activeDetail?actId='+id+'&actName='+actName+'&comefrom=tangguan';
            //return;
            if(!this.$route.query.areaId == false || !this.$route.query.groupId == false){//tcapp
              var sendstr= '{"title":"活动详情","activeId":"'+oaActId+'"}'; 				
            // alert(sendstr)
              if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                  //ios
                  window.webkit.messageHandlers.AppModel.postMessage({body: 'objc:///jumpActive:'+sendstr});
              } else if (/(Android)/i.test(navigator.userAgent)) {
                  //android
                  window.AndroidFunction.jumpActive(sendstr);
              }
            }else{//tgapp
              var that=this;
              that.$router.push({
                  path:'/activeDetail',
                  name:'activeDetail',
                  query:{
                    actId: oaActId,
                    actName : ActName,
                    comefrom:that.param.comefrom,//是否糖罐进入
                  }
                })
            }
        }
    },
    search:function(){
      this.trafficStatistics('001')//自定义埋点
      var that=this;
      var name=that.$refs.name.value;//ref的dom操作
      console.log(that.selected)
      if(!name == false){}else{
        name=''
      }
      let officeId
      if(!that.$route.query.areaId == false){
        officeId=that.$route.query.areaId
        that.groupId=officeId
      }else{
        officeId=that.groupId
      }
      console.log(that.groupId)
        that.ifSearch=true;
        Indicator.open(that.loadObj);
        if(that.selected == '1'){
          that.allList=[];
          that.param={
              pageNo:1,
              cityCode:"",
              actName:name,
              comefrom:that.param.comefrom,
              actStatus: '0',//根据时间筛选活动状态 0即将举办 1举办中 2已举办
              officeId: officeId,  //业务部门id
            }
            if(that.pcity == '全国'){
              that.getData(1,'sou');
            }else{
              that.getData('','sou');
            }
        }else if(that.selected == '2'){
          that.allList2=[];
          that.param2={
              pageNo:1,
              cityCode:"",
              actName:name,
              comefrom:that.param.comefrom,
              actStatus: '1',//根据时间筛选活动状态 0即将举办 1举办中 2已举办
              officeId: officeId,  //业务部门id
            }
            if(that.pcity == '全国'){
              that.getData2(1,'sou');
            }else{
              that.getData2('','sou');
            }
        }else if(that.selected == '3'){
          that.allList3=[];
          that.param3={
              pageNo:1,
              cityCode:"",
              actName:name,
              comefrom:that.param.comefrom,
              actStatus: '2',//根据时间筛选活动状态 0即将举办 1举办中 2已举办
              officeId: officeId,  //业务部门id
            }
            if(that.pcity == '全国'){
              that.getData3(1,'sou');
            }else{
              that.getData3('','sou');
            }
        }
      
    },
    Loadpage:function(){
      console.log(this.selected)
      Indicator.open(this.loadObj);
      this.pcity = '全国'
      this.currentTags = '全部'
      this.$refs.name.value = ''
      let officeId
      if(!this.$route.query.areaId == false){
        officeId=this.$route.query.areaId
        this.groupId=officeId
      }else{
        officeId=this.groupId
      }
      if(this.selected == '1'){
        this.param={
            pageNo:1,
            cityCode:'',
            actName:"",
            comefrom:this.param.comefrom,
            actStatus: '0',//根据时间筛选活动状态 0即将举办 1举办中 2已举办
            officeId: officeId,  //业务部门id
          }
        this.getData(1)
        this.param2.officeId = officeId;
        this.param3.officeId = officeId;
      }else if(this.selected == '2'){
        this.param2={
            pageNo:1,
            cityCode:'',
            actName:"",
            comefrom:this.param.comefrom,
            actStatus: '1',//根据时间筛选活动状态 0即将举办 1举办中 2已举办
            officeId: officeId,  //业务部门id
          }
        this.getData2(1)
        this.param.officeId = officeId;
        this.param3.officeId = officeId;
      }else if(this.selected == '3'){
        this.param3={
            pageNo:1,
            cityCode:'',
            actName:"",
            comefrom:this.param.comefrom,
            actStatus: '2',//根据时间筛选活动状态 0即将举办 1举办中 2已举办
            officeId: officeId,  //业务部门id
          }
        this.getData3(1)
        this.param2.officeId = officeId;
        this.param.officeId = officeId;
      }
      
    },
    getData:function(id,se){
      console.log(se)
      if(!this.$refs.name.value == false){
        this.param.actName = this.$refs.name.value
      }else{
        this.param.actName =''
      }
        let that = this;
        if(id == 1 || that.pcity == '全国'){
        }else{
          if(!that.$route.query.code == false){
            that.param.cityCode = that.$route.query.code
          }
        }
        console.log(that.param)
        axios({
            method:'get',
            url:'/wxservice/wxexternal?opName=getactiveinfo',
            params: {
              param:that.param,//系统类别
            }
        })
        .then(function(res) {//成功之后
            Indicator.close();
            console.log(res.data)
            var retCode=res.data.retCode
            var retMsg=res.data.retMsg;
            if(retCode == 0){
              if(that.ifSearch&&res.data.itemList.length==0){
                  //提示搜索为空
                  that.isShow=true;
                  // Toast({
                  //       message: '暂未搜索到相关结果～',
                  //       position: 'center',
                  //       duration: 3000
                  //   });
                    that.ifSearch=false;
              }
              if(res.data.itemList != '' || that.param.pageNo!=1){
                if(that.more==true){
                  that.allList=that.allList.concat(res.data.itemList);//把已获取的数据和新获取的数据合并在放入页面
                }else{
                  that.allList=res.data.itemList;//把已获取的数据和新获取的数据合并在放入页面
                }
                that.items=that.allList;
                if(that.allList.length==0||that.allList==undefined){
                  that.isShow=true;
                }else{
                  that.selected='1'
                  that.isMoreLoading = false // 设置加载更多中
                    that.isShow=false;
                }
                //console.log(that.items)
                if(res.data.itemList&&res.data.itemList.length<10){
                    that.load=false;
                    that.isMoreLoading = false
                }
              }else{
                // if(!that.$route.query.groupId == false){
                //   that.currentTags= '全部'
                // }
                console.log(id)
                if(se!='sou'){
                if(id == 'wz' || that.currentTags != '全部'){
                  if(id == 'wz'){
                    that.getData3('wz')
                  }
                  that.noActive1='暂无活动';
                  that.showCheck1=false
                  that.isShow=true;
                  that.haveno = true
                }else{
                  if(that.haveno == true){
                    that.noActive1='暂无活动';
                    that.showCheck1=false
                    that.isShow=true;
                  }else{
                    that.noActive1='暂未搜索到相关结果';
                    that.showCheck1=true
                    that.isShow=true;
                  }
                }
              }else{
                if(that.haveno == true){
                  that.noActive1='暂无活动';
                  that.showCheck1=false
                  that.isShow=true;
                }else{
                  that.noActive1='暂未搜索到相关结果';
                  that.showCheck1=true
                  that.isShow=true;
                }
              }
              if(that.haveno == true){
                that.noActive1='暂无活动';
                that.showCheck1=false
                that.isShow=true;
              }
              }
            }
            else if(retCode == 400){
              var serbackUrl = that.Host+'wxservice/wxexternal?opName=getactiveinfo'
              window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+that.APPID+'&redirect_uri='+serbackUrl+'&response_type=code&scope=snsapi_base&state=active#wechat_redirect';
            }
            else{
              //MessageBox('提示', retMsg);
              Toast({
                  message: retMsg,
                  position: 'center',
                  duration: 3000
              });
            }
        });
    },
    loadMore () { // 加载更多
      if(!this.load){
          this.$refs.loader.style.display='block';
            return;
          }
          Indicator.open(this.loadObj);
         // alert(location.href.split('#')[0])
          var pageNo=this.param.pageNo;
           pageNo++;
           this.param.pageNo=pageNo; 
           // this.pageInfo.page += 1 // 增加分页
            this.isMoreLoading = true // 设置加载更多中
           // this.isLoading = true // 加载中
           // console.log(this.pageInfo.page, this.pageInfo.totalPage)
          //  var pageNo=this.param.pageNo;
         //  pageNo++;
           //this.param.pageNo=pageNo; 
            // if (this.pageInfo.page > this.pageInfo.totalPage) { // 超过了分页
            //     this.noMore = true // 显示没有更多了
            //     this.isLoading = false // 关闭加载中
            //     return false
            // }
            // 做个缓冲
            setTimeout(() => {
              this.more=true
              this.getData();
            }, 100)
        },
        getData2:function(id,se){
          console.log(id)
          if(!this.$refs.name.value == false){
            this.param2.actName = this.$refs.name.value
          }else{
            this.param2.actName =''
          }
          let that = this;
          if(id == 1 || that.pcity == '全国'){
          }else{
            if(!that.$route.query.code == false){
              that.param2.cityCode = that.$route.query.code
            }
          }
          that.isMoreLoading2 = true
          console.log(that.param2)
          axios({
              method:'get',
              url:'/wxservice/wxexternal?opName=getactiveinfo',
              params: {
                param:that.param2,//系统类别
              }
          })
          .then(function(res) {//成功之后
              Indicator.close();
              console.log(res.data)
              var retCode=res.data.retCode
              var retMsg=res.data.retMsg;
              if(retCode == 0){
                if(that.ifSearch&&res.data.itemList.length==0){
                    //提示搜索为空
                    that.isShow2=true;
                    // Toast({
                    //       message: '暂未搜索到相关结果～',
                    //       position: 'center',
                    //       duration: 3000
                    //   });
                      that.ifSearch=false;
                }
                if(res.data.itemList != '' || that.param2.pageNo!=1){
                  if(that.more2==true){
                    that.allList2=that.allList2.concat(res.data.itemList);//把已获取的数据和新获取的数据合并在放入页面
                  }else{
                    that.allList2=res.data.itemList;//把已获取的数据和新获取的数据合并在放入页面
                  }
                  that.items2=that.allList2;
                  if(that.allList2.length==0||that.allList2==undefined){
                    that.isShow2=true;
                  }else{
                      that.selected='2'
                      that.isShow2=false;
                      that.isMoreLoading2 = false
                  }
                  //console.log(that.items)
                  if(res.data.itemList&&res.data.itemList.length<10){
                      that.load2=false;
                      that.isMoreLoading2 = false
                  }
                }else{
                  // if(!that.$route.query.groupId == false){
                  //   that.currentTags= '全部'
                  // }
                  if(se!='sou'){
                    console.log(id+'....'+that.currentTag)
                  if(id == 'wz' || that.currentTags != '全部'){
                    if(id == 'wz'){
                      that.getData('wz')
                    }
                    that.noActive2='暂无活动';
                    that.showCheck2=false
                    that.isShow2=true;
                    that.haveno2=true
                  }else{
                    that.noActive2='暂未搜索到相关结果';
                    that.showCheck2=true
                    that.isShow2=true;
                  }  
                  }else{
                    that.noActive2='暂未搜索到相关结果';
                    that.showCheck2=true
                    that.isShow2=true;
                  }
                  if(that.haveno2 == true){
                    that.noActive2='暂无活动';
                    that.showCheck2=false
                    that.isShow2=true;
                  }
                }
                
              }else{
                //MessageBox('提示', retMsg);
                Toast({
                    message: retMsg,
                    position: 'center',
                    duration: 3000
                });
              }
          });
        //   that.$nextTick(function () {
        //     window.addEventListener('scroll', that.onScroll2)
        // })
      },
      loadMore2 () { // 加载更多
      if(!this.load2){
          this.$refs.loader2.style.display='block';
            return;
          }
          Indicator.open(this.loadObj);
          var pageNo=this.param2.pageNo;
           pageNo++;
           this.param2.pageNo=pageNo; 
            this.isMoreLoading2 = true // 设置加载更多中
           
            // 做个缓冲
            setTimeout(() => {
              this.more2=true
              this.getData2();
            }, 100)
        },
        getData3:function(id,se){
          if(!this.$refs.name.value == false){
            this.param3.actName = this.$refs.name.value
          }else{
            this.param3.actName =''
          }
          let that = this;
          if(id == 1 || that.pcity == '全国'){
          }else{
            if(!that.$route.query.code == false){
              that.param3.cityCode = that.$route.query.code
            }
            if(!that.$route.query.groupId == false){
            if(that.currentTags != '全部'){
              id=''
            }
            }
          }
          that.isMoreLoading3 = true
          console.log(that.param3)
          axios({
              method:'get',
              url:'/wxservice/wxexternal?opName=getactiveinfo',
              params: {
                param:that.param3,//系统类别
              }
          })
          .then(function(res) {//成功之后
              Indicator.close();
              console.log(res.data)
              var retCode=res.data.retCode
              var retMsg=res.data.retMsg;
              if(retCode == 0){
                if(that.ifSearch&&res.data.itemList.length==1){
                    //提示搜索为空
                    that.isShow2=true;
                    // Toast({
                    //       message: '暂未搜索到相关结果～',
                    //       position: 'center',
                    //       duration: 3000
                    //   });
                      that.ifSearch=false;
                }
                if(res.data.itemList != ''|| that.param3.pageNo!=1){
                  if(that.more3==true){
                    that.allList3=that.allList3.concat(res.data.itemList);//把已获取的数据和新获取的数据合并在放入页面
                  }else{
                    that.allList3=res.data.itemList;//把已获取的数据和新获取的数据合并在放入页面
                  }
                  
                  that.items3=that.allList3;
                  if(that.allList3.length==0||that.allList3==undefined){
                      that.isShow3=true;
                  }else{
                      that.selected='3'
                      that.isShow3=false;
                      that.isMoreLoading3 = false
                  }
                  //console.log(that.items)
                  if(res.data.itemList&&res.data.itemList.length<10){
                      that.load3=false;
                      that.isMoreLoading3 = false
                  }
                }else{
                  // if(!that.$route.query.groupId == false){
                  //   that.currentTags= '全部'
                  // }
                  console.log(id+'....'+that.currentTags)
                  if(se!='sou'){
                  if(id == 'wz' && that.currentTags != '全部'){
                    that.noActive3='暂无活动';
                    that.showCheck3=false
                    that.isShow3=true;
                  }else{
                    if(id == 'wz'){
                      that.noActive3='暂无活动';
                      that.showCheck3=false
                      that.isShow3=true;
                    }else{
                      that.noActive3='暂未搜索到相关结果';
                      that.showCheck3=true
                      that.isShow3=true;
                    }
                  }
                  }else{
                    that.noActive3='暂未搜索到相关结果';
                    that.showCheck3=true
                    that.isShow3=true;
                  }
                }
                
              }else{
                //MessageBox('提示', retMsg);
                Toast({
                    message: retMsg,
                    position: 'center',
                    duration: 3000
                });
              }
          });
      },
      loadMore3 () { // 加载更多
      if(!this.load3){
        this.$refs.loader3.style.display='block';
          return;
        }
      Indicator.open(this.loadObj);
      var pageNo=this.param3.pageNo;
      pageNo++;
      this.param3.pageNo=pageNo; 
      this.isMoreLoading3 = true // 设置加载更多中
      // 做个缓冲
      setTimeout(() => {
        this.more3=true
        this.getData3();
      }, 100)
    },
    getCenterInfo:function(){
      let that = this;
      Indicator.open();
      var param=Base64.encode('{"areaId":"'+that.areaId+'","userId":"'+that.$route.query.userId+'"}');//
      axios({
          method:'get',
          url:'/olmgweb/wzApiController/getAreaAndCenterInfo',//获取大区信息及其下属体验中心信息
          params:{
              param:param,
              osFlag:'3'
          }
      })
      .then(function(res) {//成功之后
          Indicator.close();
          var data=Base64.decode(res.data);
          data=jQuery.parseJSON(data);
          console.log(data)
          var retCode=data.retCode;
          var retMsg=data.retMsg;
          if(retCode == 0){
            console.log(data.centerList)
            // var arr = []
            // for(var i=0;i<2;i++){
            //   arr.push(data.centerList[i].centerName)
            // }
            // console.log(arr)
            pickerArray = data.centerList;
            that.slots[0].values = data.centerList
          }
      })
    },
    Share:function() {
        let ua = navigator.userAgent.toLowerCase();
        //android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
        if ((/micromessenger/i).test(ua)) {//isWeixinBrowser()//判断是不是微信 
            return
        }else{
           var iconStr='[{"name":"分享","icon":"1","type":"html","module":"html_share","subMenu":""}]';	//tc
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                //ios
                window.webkit.messageHandlers.AppModel.postMessage({body: 'objc:///menuMessage:'+iconStr});
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //android
                window.AndroidFunction.menuMessage(iconStr);
            }
        }
    },
    onScroll:function(){
      let that = this;
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
          var pageNo=that.param.pageNo;
           pageNo++;
           that.param.pageNo=pageNo;  
          that.getData();
        } 
    },
    // getCode:function(){
    //  // alert(location.href.split('?')[0])
    //   //alert(this.$route.query.code)
    //   if(!this.$route.query.checkkey == false){
    //     this.param.code = this.$route.query.code;
    //     this.param.isRed = 1;
    //     this.getData()
    //   }else{
    //     this.param.code = '';
    //     this.param.isRed = 0;
    //     this.getData()
    //   }
    // },
//     setCookie: function (cname, cvalue, exdays) {
//         var d = new Date();
//         d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//         var expires = "expires=" + d.toUTCString();
//         console.info(cname + "=" + cvalue + "; " + expires);
//         document.cookie = cname + "=" + cvalue + "; " + expires;
//         console.info(document.cookie);
//       }
  },
   mounted:function(){
    window['moduleNameClick'] = (data) => {
      if(data == 'html_share'){
          let ua = navigator.userAgent.toLowerCase();
          //android终端
          let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  　　//ios终端
          let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
          if ((/micromessenger/i).test(ua)) {//isWeixinBrowser()//判断是不是微信 
              return
          }else{
              var urlstr = location.href.split('?')[0]+'?groupId='+this.groupId+'&Name='+this.Name
              var title = this.Name+'微站'
              var sendstr= '{"title":"'+title+'","content":"私人银行服务的领航者","urlstr":"'+urlstr+'"}'; 				
              //alert(sendstr)
              if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                  //ios
                  window.webkit.messageHandlers.AppModel.postMessage({body: 'objc:///shareMessage:'+sendstr});
              } else if (/(Android)/i.test(navigator.userAgent)) {
                  //android
                  window.AndroidFunction.shareMessage(sendstr);
              }
          }
      }
    }

    if(!this.$route.query.areaId == false){
      document.title ='大唐财富 · 尊享活动'
      this.showCity = false
      //this.currentTags = decodeURIComponent(this.$route.query.area)
      this.areaId = this.$route.query.areaId;
      this.param.officeId = this.areaId;
      this.param2.officeId = this.areaId;
      this.param3.officeId = this.areaId;
      this.getCenterInfo()
    }
    if(!this.$route.query.groupId == false){
      document.title ='大唐财富 · 尊享活动'
      this.showSelect = false
      this.groupId = this.$route.query.groupId;
      this.currentTags=''
      this.param.officeId = this.groupId;
      this.param2.officeId = this.groupId;
      this.param3.officeId = this.groupId;
      $('.act_head').css("padding-left","0.34rem")
      
    }
      let that = this; //这个是钩子函数mounted
      Indicator.open(that.loadObj);
    //  if(that.$route.query.comefrom=='tangguan'||that.$route.params.comefrom=='tangguan'){
    //     that.param.comefrom ='tangguan';
        
    // }
     var routerCity = that.$route.query.city;
     var routerCode = that.$route.query.code;
     if(!that.$route.query.city == false){
       that.pcity = routerCity
     }
     if(routerCity!=''&&routerCity!=undefined){
         that.allList2=[];
           that.param2={
            pageNo:1,
            cityCode:routerCode,
            actName:'',
            actStatus: '1',//根据时间筛选活动状态 0即将举办 1举办中 2已举办
          }
          that.selected='2'
         that.getData2();
         // that.$route.query.city='';
          return;
     }
     that.getData2('wz');
    // 滚动加载
      
   },
   created(){
     if(this.$route.query.comefrom=='tangguan'||this.$route.params.comefrom=='tangguan'){
        this.param.comefrom ='tangguan'; 
    }
    if(this.$route.query.comefrom=='tangchao'){
        this.param.comefrom ='tangguan'; 
        this.Name=decodeURIComponent(this.$route.query.Name)
        this.Share()
    }
     this.GasyncSDKConifg('wz')
    //  if(that.$route.path == '/active'){ //获取当前页面路由
    //  window.onscroll = function(){
       	  
    //   }
    //  }
     }
   }
        

</script>
<style>
.business_card{
  display:none;
}
.act_head{
  /* height:40px; */
  width: 100%;
  box-sizing: border-box;
  padding: .36667rem .173333rem .1633333rem;
  line-height: 1.05rem; 
  display:flex; /*父元素声明弹性盒*/
  position: fixed;
  top: 0;
  background:#fff;
  z-index: 999999999;
}
.act_h_left{ 
  float: left;
  line-height: 1rem;
  padding-right: .2rem;
  padding-left: .2rem;
}
.act_h_left span{
  float: left;
  font-size: .373333rem;
  overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;/*此为两行，设置行数*/
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
	max-width: 1.5rem; 
  color: #333;
  padding-top: .04rem;
  white-space: nowrap;
}
.act_h_left span.tiyan{
  max-width: 2.5rem; 
}
.act_h_left img{
  display: block;
  width: .23667rem;
  float: left;
  margin-left: .1rem;
  margin-top: .44rem
}
.act_h_right{
  flex: 1;
  float: left;
  position: relative;
  border: 1px solid rgba(230,230,230,1);
  border-radius: .133333rem;
  margin-right: 0.16rem;
}
.act_h_right .searchInput{
  width:100%;
  background:#fff;
  border-radius:30px;
  height: 100%;
  padding: 0.025rem .4rem 0rem .266667rem;
  box-sizing: border-box;
  font-size: 0.37rem;
  color:rgb(57,66,89);
  box-shadow: none;
  outline-color: invert ;
	outline-style: none ;
	outline-width: 0px ;
	text-shadow: none ;
	-webkit-appearance: none ;
	-webkit-user-select: text ;
	outline-color: transparent ;
  box-shadow: none;
  opacity: 1;

}
input::-webkit-input-placeholder { /* WebKit browsers */ 
color: #d2cfcf; 
font-size: 0.37rem;
} 
.act_h_right input:focus{
  border:0!important;
}

.search_img{
  width:0.45rem;
  position: absolute;
  top:0.27rem;
  right:14px;
}
#active_content{
  background:#f1f1f1;
  /* margin-top: 2.67rem; */
  margin-top: .06rem;
  padding: 0 .4rem;
  min-height:16.8rem;
  /* margin-bottom:50px; */
}
.textMain{
  padding:0 .213333rem;
  overflow: hidden;
}
.active_demo{
  margin-bottom:16px;
  background: #fff;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
}
.meng{
  /* background:rgba(0,0,0,0.4); */
  position: absolute;
  width: 88%;
  left: 6%;
  height: 68%;
  top: 16%;
}
.img_text{
  width:100%;
  min-height:86px;
  position: absolute;
  bottom:53%;
  left:0;
  color:#fff;
  padding-top:3%;
}
.img_active_title{
  display: inline-block;
  max-width:80%;
  margin:0 auto;
  white-space: nowrap;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: .53333rem;
  line-height: .58rem;
  margin-top: 14%;
}
.img_active_date{
  font-size: .4rem;
  letter-spacing: 1px;
}
.active_title{
  font-size: .32rem;
  line-height: .62rem;
  color:#415478;
  text-align: left;
  margin: .23rem 0 .06rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  float: right;
}
.active_demo_content{
  font-size: 13px;
  color:rgb(93,102,122);
  text-align: left;
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: none;
}
.active_nodata{
  background:#fff;
  padding-top: 3.8rem;
}
.active_nodata img{
    width: 2.493333rem;
    margin:0 auto;
}
.active_nodata p{
    font-size: .4rem;
}
input::-webkit-input-placeholder {
  color: #999;
}
.active{
  background: #f1f1f1;
}
.active_date{
  float: left;
  color: #585858;
  font-size: .32rem;
  margin: .23rem 0 .06rem;
  line-height: .62rem;
}
.mint-navbar{
  margin-top: 1.4rem;
  /* position: fixed;
  height: 1.05rem;
  z-index: 9999;
  width: 100%; */
}
.mint-navbar .mint-tab-item{
  color: #222121;
  font-weight: 500;
  padding: .5rem 0 .33rem 0;
}
.mint-tab-item-label{
  font-size: .373333rem!important;
}
.mint-navbar .mint-tab-item.is-selected{
  color: #222121;
  border: 0;
  position: relative;
}
.mint-navbar .mint-tab-item.is-selected::after{
  display:block; 
  clear:both;
  content:"";
  position:absolute;
  width: .533333rem;
  height: .106667rem;
  background:#D5343B;
  left: 1.4rem;
  bottom: 0.08rem;
  border-radius: .08rem;
}
.picker{
  width: 10rem;
}
.Tsure{
  position: absolute;
  top: 0.1rem;
  right:.3rem;
  z-index: 2005;
}
.act_h_left .mint-popup{
  background: #fff;
}
.act_h_left .mint-button-text{
  font-size: .426667rem;
  color: #D5343B;
  font-weight: 500;
}
.act_h_left .mint-button{
  /* background: transparent; */
  box-shadow:none;
}
.picker-center-highlight:before, .picker-center-highlight:after {
  background-color: #F6F6F6;
}
/* .picker-slot-wrapper{
  background: #fbfbfb;
} */
</style>

