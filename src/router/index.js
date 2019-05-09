// import Vue from 'vue'
// import Router from 'vue-router'
import  Home from '@/views/Home'
import CloudsList from '@/views/clouds/CloudsList'
import AliCloudsEcs from "@/views/clouds/AliCloudsEcs"
import AliCloudsRds from "@/views/clouds/AliCloudsRds"
import MemberList from '@/views/member/MemberList'
import MemberActLog from '@/views/member/MemberActLog'
import OrderList from '@/views/order/OrderList'
import ChargeList from '@/views/order/OrderChargeList'
import OrderAccountLog from '@/views/order/OrderAccountLog'
import Login from '@/views/Login'
import Main from '@/views/main/Main'


// Vue.use(Router)

// export default new Router({
  const routes = [
    {
      // redirect: { path: '/clouds_list' },
      path: '/home',
      component: Home,
      name: '首页',
      icons:'fa fa-home',
      children: [
        {
          path:'/home',
          name:'首页 ',
          component:Main
        }
      ]
    },
    {
      // redirect: { path: '/clouds_list' },
      path: '/clouds',
      component: Home,
      name: '云服务器',
      icons:'fa fa-cloud',
      children: [
        {
          path:'/clouds_list',
          component:CloudsList,
          name:'高防云'
        },
        {
          path:'/clouds_ali_clouds_ECS',
          component:AliCloudsEcs,
          name:'阿里云ECS'
        },
        {
          path:'/clouds_ali_clouds_RDS',
          component:AliCloudsRds,
          name:'阿里云RDS'
        }
      ]
    },
    {
      path: '/member',
      component: Home,
      name: '会员管理',
      icons:'fa fa-cubes',
      children: [
        {
          path:'/member_list',
          component:MemberList,
          name:'会员列表'
        },
        {
          path:'/member_log',
          component:MemberActLog,
          name:'会员操作日志'
        }
      ]
    },
    {
      path: '/order',
      component: Home,
      name: '订单管理',
      icons:'fa fa-building',
      children: [
        {
          path:'/order_list',
          component:OrderList,
          name:'订单列表'
        },
        {
          path:'/order_charge_list',
          component:ChargeList,
          name:'充值列表'
        },
        {
          path:'/order_account_log',
          component:OrderAccountLog,
          name:'资金流水'
        }
      ]
    },
    {
      path:'/login',
      component: Login,
      name:'登录',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/login' }
    }

  ]
// })
export default routes;
