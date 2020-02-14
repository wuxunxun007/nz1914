// pages/kind/kind.js
import { request } from './../../utils/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 2, // 当前是哪一个tab被选中
    titles: [], // tab的名称
    brandlist: [], // tab下的分类的列表
    kindlist: [] // 大分类下的品牌下的数据列表
  },
  /**
   * 顶部选项卡切换
   */
  onChange(event) {
    console.log(event)
    const { index, name, title } = event.detail
    this.setData({
      active: index
    })
    // 请求大分类下的品牌 -----  第一个要选中  --- 请求大分类成功时调用函数
    this.requestCategoryToBrand(title)
  },
  // 获取分类列表数据
  getKindlist (event) {
    const { brand } = event.currentTarget.dataset
    console.log(this.data.titles[this.data.active])
    request({
      url: '/kind/categorylist',
      data: {
        // type: '女装', // 作业  将其设置为动态
        type: this.data.titles[this.data.active],
        brand: brand
      }
    }).then(res => {
      this.setData({
        kindlist: res.data.data
      })
    })
  },
  requestCategoryToBrand (title) {
    request({
      url: '/kind/categorybrand',
      data: {
        type: title
      }
    }).then( res => {
      this.setData({
        brandlist: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取顶部的标签分类数据 --- 大分类
    this.loadTopCategory()
  },
  loadTopCategory () {
    request({
      url: '/kind/category',
      data: {
        type: 'type'
      }
    }).then( res => {
      this.setData({
        titles: res.data.data
      })
      // 默认请求的应该是  你默认选中的哪一项
      // this.data.titles ---- 大分类的数组
      // this.data.active  ---- 选中的索引
      this.requestCategoryToBrand(this.data.titles[this.data.active])
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})