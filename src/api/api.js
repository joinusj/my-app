import axios from 'axios';
import Qs from 'qs'
/* eslint-disable */
const APP_HOST = window.location.host || document.domain || 'localhost'
const API_ROOT = document.location.protocol+'//' + APP_HOST + '/apiv2'
const API_ROOT_DEV = '/localapi'

/* eslint-enable */
axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? API_ROOT : API_ROOT_DEV)

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem('token')
  config.headers['Authorization'] = token
  return config
}, function (error) {
  return Promise.reject(error)
})





export function post(url, params) {
  return axios({
    url: url,
    method: 'post',
    data: Qs.stringify(params)
  }).then(res=>res.data)
}

export function get(url,params) {
    return axios({
      url:url,
      method:'get',
      data:params,
    }).then(res=>res.data)
}


//用户登录
export function requestLogin(params) {
  return post('/agent.account/agent_login',params)
}

// 获取用户个人信息
export function getUserInfo() {
  return get('/agent.ucenter/get_user_info')
}

//获取地址资源
export function getAdress() {
  return get('agent.ucenter/get_address')
}

//获取区域资源
export function getZone() {
  return get('agent.ecs/get_zone')
}

//获取配置信息
export function getConf() {
  return get('/misc/conf')
}

//获取搜索资源
export function getSearch() {
  return get('/agent.ecs/get_search')
}


//获取用户列表
export function getUserList(params) {
  return post('/agent.user/get_user_list',params)
}

//获取用户详情
export function getUserDetail(params) {
  return post('/agent.user/get_user_details',params)
}


//获取用户云主机列表
export function getCloudslist(params) {
  return post('/agent.user/get_user_ecs_list',params)
}

//获取用户云主机订单列表--会员管理
export function getCloudsOrder(params) {
  return post('/agent.user/get_order_list',params)
}

//获取云主机详情
export function getCloudsDetail(params) {
  return post('/agent.ecs/get_vm_details',params)
}


//获取云主机列表
export function getEcsList(params) {
  return post('/agent.ecs/get_vm_list',params)
}


//获取用户充值订单列表
export function getUserChargeList(params) {
  return post('/agent.user/get_user_charge_list',params)
}

//获取登录日志
export function getLoginLog(params) {
  return post('/agent.user/get_user_login_log',params)
}

//获取用户操作日志
export function getOperationLog(params) {
  return post('/agent.user/get_user_operation_log',params)
}


// 获取云主机订单列表--订单信息-agent/ecs/get_order_list
