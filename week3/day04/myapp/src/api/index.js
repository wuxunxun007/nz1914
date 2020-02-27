import axios from 'axios'

// 1.通过当前的运行命令判断出当前的运行环境，切换请求地址
// 开发环境 + 测试环境 + 生产环境
const isDev = process.env.NODE_ENV === 'development'
// isDev  ---  true   ----  开发环境  ----  npm run serve
// isDev  ---- false   ----  生产环境  ----  npm run build

// 如果是开发环境，服务器可能是本地的，也可能是服务器上的
const baseUrl = isDev ? 'http://daxun.kuboy.top/api' : 'http://daxun.kuboy.top/api'

// 2.自定义axios,添加axios拦截器
const instance = axios.create({
  baseURL: baseUrl
})

// 在实例已创建后修改默认值，比如请求时需要拿到token值
// instance.defaults.headers.common['token'] = token
// 自定义超时时间
instance.defaults.timeout = 6000

// 每一次发送请求前都需要经过这里 - 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么 -- 显示loading动画,携带token信息
  const token = localStorage.getItem('token')
  config.headers.common.token = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 每一次拿到数据都需要经过这里 - 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么 --- 关闭loading动画
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
