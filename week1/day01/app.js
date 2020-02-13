//app.js
// 注册小程序 ---- 仅在app.js（全局的逻辑文件）调用，仅能调用一次
// 生命周期钩子函数 不建议写成 箭头函数
/**
 * new Vue({
 *  mounted () {
 *  },
 *  created: () => { // 如果不使用this，可以使用箭头函数
 *  
 *  }
 * })
 */
App({
  // 生命周期回调——监听小程序初始化。
  onLaunch: function () {
    // 获取设备的信息
    this.getDeviceInfoFn()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  getDeviceInfoFn () {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        // 修改全局数据
        this.globalData.deviceinfo = res
      }
    })
  },
  // 生命周期回调——监听小程序启动或切前台。
  onShow () {
    console.log('show')
  },
  // 生命周期回调——监听小程序切后台。
  onHide () {
    console.log('hide')
  },
  // 错误监听函数
  onError () {
    console.log('error')
  },
  // 404 
  onPageNotFound () {
    console.log('onPageNotFound')
  },
  // 自定义的全局的变量，可以是任何的数据类型 --- 状态管理器
  globalData: {
    userInfo: null,
    deviceinfo: null
  },
  fn () {
    console.log('全局逻辑自定义函数')
  }
})