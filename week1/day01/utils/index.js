// 接口地址 http://daxun.kuboy.top/apidoc
const baseUrl = 'http://daxun.kuboy.top/api'
/**
 * 封装数据请求的方法
 * https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
 * axios
 * 
 * 组件其实就是含有了 视图的 模块
 */

export function request (options) {
  // 解构赋值 ---  获取用户传递的参数信息
  const { url, data, method } = options;
  // 加载动画 https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html
  wx.showLoading({
    title: '加载中',
  })
  // 核心点 异步 A方法请求，B方法调用
  // 回调函数、promise、generator + yield、async+await
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      data: data || {},
      method: method || 'GET',
      success: (res) => {
        // 异步操作成功调用resolve
        resolve(res)
      },
      fail: (err) => {
        // 异步操作失败调用reject
        reject(err)
      },
      complete: () => {
        // 成功也好，失败也罢，都是已完成
        wx.hideLoading()
      }
    })
  })
}

/**
 * 封装toast显示
 * https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
 */
export function toast (options) {
  const { title, icon, duration } = options
  wx.showToast({
    title,
    icon: icon || 'none', // success loading
    duration: duration || 2000
  })
}