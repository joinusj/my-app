// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import '../static/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})


/* 配置elementUI 按需引入  start*/
/* 本项目中首页用的组件较多,所以在这里引用了较多的组件*/
import {
  Autocomplete,
  // Menu,
  // Submenu,
  // MenuItem,
  // MenuItemGroup,
  Row,
  Col,
  Carousel,
  CarouselItem,
  Pagination,
  Message,
  MessageBox,
  Loading,
  // Rate,
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  Progress,
  Form,
  FormItem,
  Input,
  InputNumber,
  Checkbox,
  Select,
  Option,
  Table,
  TableColumn,
  Switch,
  Radio,
  DatePicker,
  Popover,
  Menu,
  MenuItem
} from 'element-ui';
let arr = [
  Autocomplete,
  // Menu,
  // Submenu,
  // MenuItem,
  // MenuItemGroup,
  Row,
  Col,
  Carousel,
  CarouselItem,
  Pagination,
  Loading,
  // Rate,
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  Progress,
  Form,
  FormItem,
  Input,
  InputNumber,
  Checkbox,
  Select,
  Option,
  Table,
  TableColumn,
  Switch,
  Radio,
  DatePicker,
  Popover,
  Menu,
  MenuItem
];
arr.forEach(function(e) {
  Vue.use(e);
});
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
/* 配置elementUI 按需引入  end*/
















//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.status == -9){
      router.push({
        path:"/login",
        // querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)





router.beforeEach((to, from, next) => {
  //NProgress.start();
  // if(to.path=='/login'){
  //   sessionStorage.removeItem('token')
  //   sessionStorage.removeItem('zoneList')
  //   sessionStorage.removeItem('config')
  //   sessionStorage.removeItem('purviewStr')
  //   sessionStorage.removeItem('userName')
  // }
  // let user = sessionStorage.getItem('token');
  // if (!user && to.path != '/login') {
  //   next({ path: '/login'})
  // } else {
    next()
  // }
})

//时间戳
Vue.filter('dataFormat', function (value, fmt) {
  if(value==0||!value){
    return '-'
  }
  let getDate = new Date(value*1000);
  let o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'H+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt;
});

// 地址
Vue.filter('address',function (val) {
  let addressArr=JSON.parse(sessionStorage.getItem('addressInfo'))
  if(!val){
    return '-'
  }
  if(val.length==0){
    return '-'
  }else{
    let add=''
    for(let i=0;i<val.length;i++){
      for(let j=0;j<addressArr.length;j++){
        if(val[i]===addressArr[j].id){
          add+=addressArr[j].name
        }
      }
    }
    return add
  }
})

//地域--地区
Vue.filter('territory',function (val) {
  let zoneList=JSON.parse(sessionStorage.getItem('zoneList'))
  let terr=''
  zoneList.map(function (item) {
    if(item.zone_code==val){
      return terr=item.zone_name
    }
  })
  return terr


})
//地域--集群
Vue.filter('cluster',function (val1,val2) {
    let zoneList=JSON.parse(sessionStorage.getItem('zoneList'))
    let terr=[],clu=''
    zoneList.map(function (item) {
      if(item.zone_code==val2){
        terr=item.cluster
       for(let val in terr){
          if(val===val1){
            return clu=terr[val].cluster_name
          }
       }
      }
    })
  return clu
})
//网络类型
Vue.filter("config_isp",function(inform){
  if(JSON.parse(sessionStorage.getItem('config'))){
    let config=JSON.parse(sessionStorage.getItem('config')).data_config_isp
    if(config[inform]){
      return config[inform]
    }else{
      return ''
    }
  }else{
    return ''
  }
});

// 状态
Vue.filter('status',function (state) {
  let config=JSON.parse(sessionStorage.getItem('config')).data_config_ecs_status
  if(config[state]){
    return config[state]
  }else{
    return
  }

})


// 订单类型
Vue.filter('order_type',function (type) {
  switch(type){
    case '0':
      return '新购买'
    break;
    case '1':
      return '续费'
      break;
    case '2':
      return '规格升级'
      break;
    case '3':
      return '升级带宽'
      break;
    case '4':
      return '升级磁盘'
      break;
    case '5':
      return '新增磁盘'
      break;
    case '6':
      return 'ddos防护升级'
      break;
    case '7':
      return '新增IP'
      break;
    default: return '-'
  }

})

// 订单状态
Vue.filter('order_status',function (type) {//-3 ~-1灰色 1蓝色  2~4绿色 5~6橙色
  switch(type){
    case '-3':
    case '-2':
    case '-1':
      return '已失效'
      break;
    case '1':
      return '待支付'
      break;
    case '2':
      return '已支付'
      break;
    case '3':
      return '发货中'
      break;
    case '4':
      return '已发货'
      break;
    case '5':
      return '退款中'
      break;
    case '6':
      return '已退款'
      break;
    default: return '-'
  }

})

//用户所属部门
Vue.filter('user_depart',function (num) {
  let departObj=JSON.parse(sessionStorage.getItem('config')).data_config_depart
  if(departObj[num]){
    return departObj[num]
  }else{
    return '-'
  }
})

// //搜索关键字高亮
// Vue.filter('brightenKeyword',function (val,keyword) {
//   console.log(val,keyword)
//   return val
// })




/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
