// pages/home/home.js
const app = getApp();
// console.log(app)
import { request, toast } from './../../utils/index.js'
Page({

  /**
   * 页面的初始数据 ---- vue中的data
   * 快速折叠代码 ctrl + shift [
   */
  data: {
    bannerlist: [],
    prolist: [],
    pageCode: 1 // 默认已经加载了一次数据
  },

  /**
   * 生命周期函数--监听页面加载 --- mounted --- 请求数据
   */
  onLoad: function (options) {
    // console.log('onLoad')
    // 请求轮播图数据
    this.getBannerData()
    // 请求列表数据
    this.getProlistData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('onReady')
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow')
    // 获取当前的页面栈
    console.log(getCurrentPages())
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 重新请求了第一页的数据
   * 1.page.json文件中开启下拉刷新 "enablePullDownRefresh": true
   * 2.page.js中找到onPullDownRefresh函数，请求第一页数据即可
   * 3.一定一定要切记 重置页码 *********************************
   */
  onPullDownRefresh: function () {
    // console.log('刷新当前页面')
    this.refreshData()
  },

  /**
   * 页面上拉触底事件的处理函数
   * 上拉加载 --- 分页效果 ---- 每一次的上拉页码要加1
   * 1.找到page.js文件中的onReachBottom函数
   * 2.编写业务逻辑
   *  2.1 需要一个页码的变量 --- 初始化数据中设置页码
   */
  onReachBottom: function () {
    // console.log('加载数据')
    this.requestMoreData()
  },

  /**
   * 用户点击右上角分享
   * 可以通过微信提供的api修改分享的内容
   */
  onShareAppMessage: function () {
    // console.log('你准备好分享了吗')
  },

  /**
   * 页面滚动触发事件的处理函数
   * 默认的参数就是滚动条距离顶部的距离 - options
   * 滚动到某一个位置，出现返回顶部按钮
   */
  onPageScroll(options) {
    // console.log('页面滚动起来了')
    // console.log(options)
  },

  /**
   * 当前是 tab 页时，点击 tab 时触发
   * 就是全局配置的底部选项卡
   */
  onTabItemTap () {
    // console.log('首页')
  },

  /**
   * 自定义的数据以及函数就可以写
   * 页面离不开事件 --- 自定义的函数
   */
  testfn () {
    // console.log('自定义函数')
  },
  // 请求轮播图数据
  getBannerData () {
    // 请求轮播图数据
    request({
      url: '/pro/banner'
    }).then(res => {
      // console.log(res)
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
      // console.log(res)
      this.setData({
        prolist: res.data.data
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  /**
   * 下拉刷新业务逻辑
   */
  refreshData () {
    request({
      url: '/pro',
      data: {
        pageCode: 0, // 页码默认为0
        limitNum: 10 // 每页显示合数，默认为10
      }
    }).then((res) => { // 建议使用箭头函数---this指向
      console.log(res)
      this.setData({
        prolist: res.data.data,
        pageCode: 1 // 一定要记得重置页码 ---- 没有数据的提示（上拉加载提示过后）
      })
      // 真机测试的时候，下拉刷新技术需要停止 下拉刷新的操作
      wx.stopPullDownRefresh();
    }).catch((err) => {
      console.log(err)
    })
  },

  /**
   * 请求更多数据
   */
  requestMoreData () {
    request({
      url: '/pro',
      data: {
        // vue this.pageCode
        // minpro  this.data.pageCode
        pageCode: this.data.pageCode,
        limitNum: 10
      }
    }).then(res => {
      // 请求之后 需要判断 
      // 1.判断有没有数据
      if (res.data.code === '10000') {
        // 没有更多数据了
        // 需要给用户提示信息 https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
        console.log('111111111111111111111111')
        // toast({title, icon, duration})
        toast({ title: '没有更多数据了'})
      } else {
        // 2.如果有数据 --- 之前的数据追加上现在请求的数据  数组合并
        // vue this.prolist = [...this.prolist, ...res.data.data]
        // minpro --- 修改数据的方式类似于 react
        // react 获取数据 处理数据 修改数据（状态）
        // 3.每一次请求完成页面要完成自动加1
        let arr = this.data.prolist // 获取数据
        let num = this.data.pageCode
        let list = [...arr, ...res.data.data] // 处理数据
        num += 1
        this.setData({ // 修改数据
          prolist: list,
          pageCode: num
        })
      }
    })
  },

  /**
   * 返回顶部事件
   * https://developers.weixin.qq.com/miniprogram/dev/api/ui/scroll/wx.pageScrollTo.html
   */
  backtop () {
    wx.pageScrollTo({
      scrollTop: 0 // 0表示滚动条的位置为0
    })
  },
  /**
   * 点击轮播图 预览图片
   */
  previewImage (event) {
    let arr = []; // 预留空数组
    let index = event.currentTarget.dataset.index // 获取当前点击的图片的索引
    this.data.bannerlist.map(item => { // 将处理的数据压入数组
     arr.push('http://daxun.kuboy.top' + item)
    })
    console.log(arr)
    wx.previewImage({ // 调用预览图片
      current: arr[index],
      urls: arr
    })
  }
})