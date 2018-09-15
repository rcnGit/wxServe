import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld/HelloWorld'
import active from '@/pages/active/active'
import provinceList from '@/pages/active/provinceList'
import postInfor from '@/pages/PostInfor/PostInformation'
import minActive from '@/pages/active/minActive'
import ActiveDetail from '@/pages/activeSign/ActiveDetail'
import toSignNewCust from '@/pages/activeSign/toSignNewCust'
import toSignOldCust from '@/pages/activeSign/toSignOldCust'
import signSuc from '@/pages/activeSign/signSuc'
import propertyList from '@/pages/property/propertyList'
import propertyListDe from '@/pages/property/propertyListDe'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/active',
      name: 'Active',
      meta: {
        title: '尊享活动'
      },
      component: active
    },
    {
      path: '/provinceList',
      name: 'provinceList',
      meta: {
        title: '省份选择'
      },
      component: provinceList//使用这个组件
    },
    {
      path: '/ActiveDetail',
      name: 'ActiveDetail',
      meta: {
        title: '活动详情'
      },
      component: ActiveDetail//使用这个组件
    },
    {
      path: '/toSignNewCust',
      name: 'toSignNewCust',
      meta: {
        title: '新客户活动报名'
      },
      component: toSignNewCust//使用这个组件
    },
    {
      path: '/toSignOldCust',
      name: 'toSignOldCust',
      meta: {
        title: '活动报名'
      },
      component: toSignOldCust//使用这个组件
    },
    {
      path: '/signSuc',
      name: 'signSuc',
      meta: {
        title: '大唐盛宴活动'
      },
      component: signSuc//使用这个组件
    },
    {
      path: '/propertyList',
      name: 'propertyList',
      meta: {
        title: '我的资产'
      },
      component: propertyList//使用这个组件
    },
    {
      path: '/propertyListDe',
      name: 'propertyListDe',
      meta: {
        title: '我的资产'
      },
      component: propertyListDe//使用这个组件
    },
    {
      path: '/minActive',
      name: 'minActive',
      meta: {
        title: '我的活动'
      },
      component: minActive//使用这个组件
    },
    {
      path: '/PostInformation',
      name: 'postInfor',
      meta: {
        title: '投后消息'
      },
      component: postInfor//使用这个组件
    }
  ]
})
