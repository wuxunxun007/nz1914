import Taro from '@tarojs/taro'
const baseUrl = 'http://daxun.kuboy.top/api'

export function request (options) {
  const { url, data, method, header } = options
  Taro.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + url,
      data: data || {},
      method: method || 'GET',
      header: header || {},
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        Taro.hideLoading()
      }
    })
  })
}