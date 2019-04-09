import Vue from 'vue'
import Router from 'vue-router'

import active from '@/pages/active/active'
import provinceList from '@/pages/active/provinceList'
import postInfor from '@/pages/PostInfor/PostInformation'
import minActive from '@/pages/active/minActive'
import activeDetail from '@/pages/activeSign/activeDetail'
import toSignNewCust from '@/pages/activeSign/toSignNewCust'
import faceMsg from '@/pages/activeSign/faceMsg'//人脸识别，录身份信息
import pushW from '@/pages/activeSign/pushW'//客服报名有财富师的跳转页面
import kefuSign from '@/pages/activeSign/kefuSign'//客户福利（客服）个人报名
import signSuc from '@/pages/activeSign/signSuc'
import propertyList from '@/pages/property/propertyList'
import appointW from '@/pages/wealth/appointW'//指定财富师页面
import getcode from '@/pages/wealth/getcode'//指定财富师页面
import onlineApply from '@/pages/wealth/onlineApply'//指定财富师页面
import changephone from '@/pages/wealth/changephone'//修改手机号
import bdphone from '@/pages/wealth/bdphone'//绑定手机号
import applysuc from '@/pages/wealth/applysuc'//财富师申请成功
import activeCheckin from '@/pages/activeCheckin/activeCheckin'//签到
import SuccCheckin from '@/pages/activeCheckin/SuccCheckin'//签到成功
import wealthCardD from '@/pages/wealth/wealthCardD'//没有财富师名片的，代理名片
import wchoose from '@/pages/wealth/wchoose'//没有财富师名片的，代理名片

import PrivateAsset from '@/pages/property/PrivateAsset'//我的私募
import PublicAsset from '@/pages/property/PublicAsset'//我的公募
import SecuritiesAsset from '@/pages/property/SecuritiesAsset'//资管类
import cityList from '@/pages/active/cityList'
import faceSuccess from '@/pages/activeSign/faceSuccess'//身份认证成功
import postDetail from '@/pages/PostInfor/postDetail' //投后信息详情
import addServe from '@/pages/addServe/addServe' //增值服务
import wealthCard from '@/pages/wealth/wealthCard'//财富师名片
import designatedW from '@/pages/wealth/designatedW'//指定财富师空白页
import severStar from '@/pages/severStar/severStar'//服务之星活动
import question from '@/pages/severStar/question'//服务之星活动
import shareCard from '@/pages/severStar/shareCard'//财富师名片
import severIntro from '@/pages/severStar/severIntro'//服务之星介绍
import severAppoint from '@/pages/severStar/severAppoint'//预约财富服务
import appoSuccess from '@/pages/severStar/appoSuccess'//预约成功

Vue.use(Router)

export default new Router({
  //base: '/weixin-h5/',
 // mode: 'history',
  routes: [
    {
      path: '/active',
      name: 'active',
      meta: {
        title: '尊享活动',
        keepAlive: true // 首次不需要被缓存
      },
      component: active
    },
    {
      path: '/provinceList',
      name: 'provinceList',
      meta: {
        title: '省份选择',
        keepAlive: false // 不需要缓存
      },
      component: provinceList//使用这个组件
    },
    {
      path: '/activeDetail',
      name: 'activeDetail',
      meta: {
        title: '活动详情',
        keepAlive: false // 不需要缓存
      },
      component: activeDetail//使用这个组件
    },
    {
      path: '/toSignNewCust',
      name: 'toSignNewCust',
      meta: {
        title: '活动报名',
        keepAlive: false // 不需要缓存
      },
      component: toSignNewCust//使用这个组件
    },
    {
      path: '/faceMsg',
      name: 'faceMsg',
      meta: {
        title: '身份认证',
        keepAlive: false // 不需要缓存
      },
      component: faceMsg//使用这个组件---客户福利个人报名
    },{
      path: '/pushW',
      name: 'pushW',
      meta: {
        title: '活动报名成功',
        keepAlive: false // 不需要缓存
      },
      component: pushW//使用这个组件
    },
    {
      path: '/activeCheckin',
      name: 'activeCheckin',
      meta: {
        title: '活动签到',
        keepAlive: false // 不需要缓存
      },
      component: activeCheckin//使用这个组件---客户福利个人报名
    },{
      path: '/SuccCheckin',
      name: 'SuccCheckin',
      meta: {
        title: '活动签到成功',
        keepAlive: false // 不需要缓存
      },
      component: SuccCheckin//使用这个组件
    },
    {
      path: '/kefuSign',
      name: 'kefuSign',
      meta: {
        title: '活动报名',
        keepAlive: false // 不需要缓存
      },
      component: kefuSign//使用这个组件
    },
    {
      path: '/signSuc',
      name: 'signSuc',
      meta: {
        title: '报名成功',
        keepAlive: false // 不需要缓存
      },
      component: signSuc//使用这个组件
    },
    {
      path: '/propertyList',
      name: 'propertyList',
      meta: {
        title: '我的资产',
        keepAlive: false // 不需要缓存
      },
      component: propertyList//使用这个组件
    },
    {
      path: '/minActive',
      name: 'minActive',
      meta: {
        title: '我的活动',
        keepAlive: false // 不需要缓存
      },
      component: minActive//使用这个组件
    },
    {
      path: '/PostInformation',
      name: 'postInfor',
      meta: {
        title: '信息披露',
        keepAlive: true // 不需要缓存
      },
      component: postInfor//使用这个组件
    },
    {
      path: '/postDetail',
      name: 'postDetail',
      meta: {
        title: '信息披露详情',
        keepAlive: false // 不需要缓存
      },
      component: postDetail//使用这个组件
    },
    {
      path: '/appointW',
      name: 'appointW',
      meta: {
        title: '指定财富师',
        keepAlive: false // 不需要缓存
      },
      component: appointW//使用这个组件onlineApply
    },
    {
      path: '/getcode',
      name: 'getcode',
      meta: {
        title: '获取验证码',
        keepAlive: false // 不需要缓存
      },
      component: getcode//使用这个组件
    },
    {
      path: '/onlineApply',
      name: 'onlineApply',
      meta: {
        title: '在线申请财富师',
        keepAlive: false // 不需要缓存
      },
      component: onlineApply//使用这个组件
    },
    {
      path: '/changephone',
      name: 'changephone',
      meta: {
        title: '修改手机号',
        keepAlive: false // 不需要缓存
      },
      component: changephone//使用这个组件
    },
    {
      path: '/bdphone',
      name: 'bdphone',
      meta: {
        title: '绑定手机号',
        keepAlive: false // 不需要缓存
      },
      component: bdphone//使用这个组件
    },
    {
      path: '/applysuc',
      name: 'applysuc',
      meta: {
        title: '财富师申请成功',
        keepAlive: false // 不需要缓存
      },
      component: applysuc//使用这个组件
    },
    {
      path: '/wealthCardD',
      name: 'wealthCardD',
      meta: {
        title: '财富师名片',
        keepAlive: false // 不需要缓存
      },
      component: wealthCardD//使用这个组件
    },
    {
      path: '/wchoose',
      name: 'wchoose',
      meta: {
        title: '财富师',
        keepAlive: false // 不需要缓存
      },
      component: wchoose//使用这个组件
    },
    {
      path: '/PrivateAsset',
      name: 'PrivateAsset',
      meta: {
        title: '我的私募',
        keepAlive: false // 不需要缓存
      },
      component: PrivateAsset//使用这个组件
    },
    {
      path: '/PublicAsset',
      name: 'PublicAsset',
      meta: {
        title: '我的公募',
        keepAlive: false // 不需要缓存
      },
      component: PublicAsset//使用这个组件
    },
    {
      path: '/SecuritiesAsset',
      name: 'SecuritiesAsset',
      meta: {
        title: '我的资管理财',
        keepAlive: false // 不需要缓存
      },
      component: SecuritiesAsset//使用这个组件
    },
    {
      path: '/cityList',
      name: 'cityList',
      meta: {
        title: '活动城市选择',
        keepAlive: false // 不需要缓存
      },
      component: cityList//使用这个组件
    },
    {
      path: '/faceSuccess',
      name: 'faceSuccess',
      meta: {
        title: '身份认证',
        keepAlive: false // 不需要缓存
      },
      component: faceSuccess//使用这个组件
    },
    {
      path: '/addServe',
      name: 'addServe',
      meta: {
        title: '增值服务',
        keepAlive: false // 不需要缓存
      },
      component: addServe//使用这个组件
    },
    {
      path: '/wealthCard',
      name: 'wealthCard',
      meta: {
        title: '',
        keepAlive: false // 不需要缓存
      },
      component: wealthCard//使用这个组件
    },{
      path: '/designatedW',
      name: 'designatedW',
      meta: {
        title: '',
        keepAlive: false // 不需要缓存
      },
      component: designatedW//使用这个组件
    },
    {
      path: '/severStar',
      name: 'severStar',
      meta: {
        title: '服务之星',
        keepAlive: false // 不需要缓存
      },
      component: severStar//使用这个组件
    },
    {
      path: '/question',
      name: 'question',
      meta: {
        title: '点亮服务之星',
        keepAlive: false // 不需要缓存
      },
      component: question//使用这个组件
    },
    {
      path: '/shareCard',
      name: 'shareCard',
      meta: {
        title: '',
        keepAlive: false // 不需要缓存
      },
      component: shareCard//使用这个组件
    },
    {
      path: '/severIntro',
      name: 'severIntro',
      meta: {
        title: '服务之星介绍',
        keepAlive: false // 不需要缓存
      },
      component: severIntro//使用这个组件
    },
    ,
    {
      path: '/severAppoint',
      name: 'severAppoint',
      meta: {
        title: '预约财富服务',
        keepAlive: false // 不需要缓存
      },
      component: severAppoint//使用这个组件
    },
    ,
    {
      path: '/appoSuccess',
      name: 'appoSuccess',
      meta: {
        title: '预约成功',
        keepAlive: false // 不需要缓存
      },
      component: appoSuccess//使用这个组件
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
