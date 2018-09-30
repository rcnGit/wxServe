<<template>
    <div id='appointW'>
        <div class='content'>
            <div class='tip'>
             <span>请输入财富师姓名与工号进行关联</span>
            </div>
            <div class='inpBox'>
                <input type='text' class='' placeholder="请输入您的姓名"/>
                <span>姓名</span>
                <em>请输入正确的实名信息</em>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->
              <div class='inpBox'>
                <input type='text' class=''placeholder='请输入财富师工号后七位数字'/>
                <span>工号DT</span>
                <em>请输入正确的实名信息</em>
                <!-- <img src='./img/card_img@2x.png' class='clear'/> -->
             </div> <!--inpBox-->             
             <div style='clear:both'></div>
             <mt-button type="danger" size="large" class='next'>确认</mt-button>
             <div class='sendM' @click='sendWX()'>不清楚工号，给财富师发微信/短信索取工号&nbsp;&nbsp;></div>
         </div> <!--content-->
         <div style='width:100%;height:10px;background:#f9f9f9;'></div>
         <div class='content' style='padding:0;'>
             <div class='applyLine'>
                 <p>若无心仪财富师可联系客服为您推荐财富师</p>
                 <mt-button type="danger" size="large" class='next' style='background:#fff!important;color:#df1e1d;border:1px solid #df1e1d!important;width:50%!important;margin-top:20px!important;'>在线申请</mt-button>
             </div>
           
         </div>
         <mt-popup v-model="popupVisible" position="bottom" pop-transition="popup-fade">
           <div class='pop_contant'>
               <p class='pop_title'>联系财富师</p>
               <div class='popImgBox'>
                   <img src='./img/wx.png' class='floatLeft'/>
                   <img src='./img/mes.png'  class='floatRight'/>
               </div>
               <div style='clear:both;'></div>
               <div class='popTxt'>
                   <img src='./img/popBg.png' width='100%'/>
                   <div class='popTxt_contant'>
                       <textarea rows="4" style='width:90%;border:none;outline:0;color:rgb(54,54,54);font-size:14px;padding:25px 15px;line-height:20px;'>{{msg1}}{{msg2}}{{msg3}}</textarea>
                        <div style='margin-top:15%;'>
                            <mt-button type="danger" size="large" class='' style='width:50%!important;margin-top:0px!important;'>复制并打开微信</mt-button>
                        </div>
                        <div style='margin-top:7%;'>
                            <mt-button type="danger" size="large" class='' style='background:#fff!important;color:#df1e1d;border:1px solid #df1e1d!important;width:50%!important;margin-top:0px!important;'>发送短信</mt-button>
                        </div>
                   </div><!-- popTxt_contant  -->
                   
               </div>
           </div> <!--pop_contant -->
         </mt-popup>
    </div>
</template>
<script>
import { Popup } from 'mint-ui';
import { Button } from 'mint-ui';//引入mint-ui的button组件文件包
import axios from 'axios';
export default {
    name:'appointW',
    data:function(){
        return{
            actions:'',
            popupVisible:true,
            msg1:'我是',
            msg2:'任超楠',
            msg3:'，我正在指定你为我的专属财富师，请回复姓名全程与DT开头的工号，谢谢！'

        }
        
    },
    methods:{
        sendWX:function(){
            var that=this;
            that.popupVisible=true;
        }
    },
    component:{Button,axios,Popup},

}
</script>
<style>
@import '../activeSign/toSign.css'; /* 引入toSign.css文件*/
.mint-popup{
    width:100%;
    background:none;
}
 .pop_contant{height:530px;background:#fff;width:92%;margin:0 auto 20px;border-radius: 10px;} 
.sendM{
    color:#7a7a7a;
    font-size: 12px;
    height:35px;
    margin-top:5px;
    line-height: 35px;
}
.applyLine{
    width:100%;
    height:112px;
    background:url(img/meng@2x.png) no-repeat;
    background-size:100%;
}
.applyLine p{
    color:#595959;
    font-size: 13px;
    padding-top:28px;
}
.pop_title{
    color:rgb(59,59,59);
    font-size: 16px;
    padding-top:20px;
}
.popImgBox{
    width:100%;
    padding:30px 20% 0;
}
.popImgBox img{
    width:62px;
}
.popTxt{
    width:90%;
    margin:20px auto 0;
    position: relative;
}
.popTxt_contant{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
}
</style>

