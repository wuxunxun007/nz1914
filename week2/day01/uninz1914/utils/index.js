const baseUrl = "http://daxun.kuboy.top/api"

export function request (options) {
  const { url, method, data, header } = options
  uni.showLoading({
      title: '加载中'
  });
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      data: data || {},
      method: method || 'GET',
      header: header || {},
      timeout: 6000, // 请求超时时间设置
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        uni.hideLoading()
      }
    })
  })
}