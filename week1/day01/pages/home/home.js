// pages/home/home.js
const app = getApp();
console.log(app)
import { request } from './../../utils/index.js'
Page({

  /**
   * 页面的初始数据 ---- vue中的data
   */
  data: {
    bannerlist: [],
    prolist: []
  },

  /**
   * 生命周期函数--监听页面加载 --- mounted --- 请求数据
   */
  onLoad: function (options) {
    console.log('onLoad')
    // 请求轮播图数据
    this.getBannerData()
    // 请求列表数据
    this.getProlistData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
    // 获取当前的页面栈
    console.log(getCurrentPages())
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 重新请求了第一页的数据
   */
  onPullDownRefresh: function () {
    console.log('刷新当前页面')
  },

  /**
   * 页面上拉触底事件的处理函数
   * 上拉加载 --- 分页效果 ---- 每一次的上拉页码要加1
   */
  onReachBottom: function () {
    console.log('加载数据')
  },

  /**
   * 用户点击右上角分享
   * 可以通过微信提供的api修改分享的内容
   */
  onShareAppMessage: function () {
    console.log('你准备好分享了吗')
  },

  /**
   * 页面滚动触发事件的处理函数
   * 默认的参数就是滚动条距离顶部的距离 - options
   * 滚动到某一个位置，出现返回顶部按钮
   */
  onPageScroll(options) {
    // console.log('页面滚动起来了')
    console.log(options)
  },

  /**
   * 当前是 tab 页时，点击 tab 时触发
   * 就是全局配置的底部选项卡
   */
  onTabItemTap () {
    console.log('首页')
  },

  /**
   * 自定义的数据以及函数就可以写
   * 页面离不开事件 --- 自定义的函数
   */
  testfn () {
    console.log('自定义函数')
  },
  // 请求轮播图数据
  getBannerData () {
    // 请求轮播图数据
    request({
      url: '/pro/banner'
    }).then(res => {
      console.log(res)
      // vue this.bannerlist = res.data.data
      // react this.setState({bannerlist: res.data.data})
      // 小程序修改状态的方式 就是 this.setData
      this.setData({
        bannerlist: res.data.data
      })
    })
  },
  // 请求列表数据
  getProlistData () {
    request({
      url: '/pro',
      data: {}
    }).then((res) => { // 建议使用箭头函数---this指向
      console.log(res)
      this.setData({
        prolist: res.data.data
      })
    }).catch((err) => {
      console.log(err)
    })
  }
})