// pages/detail/detail.js
import { request } from './../../utils/index.js'
var WxParse = require('./../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proid: '', // 加入购物车时肯定需要（userid， proid， num）
    proname: '', // 显示详情的名称 ---- 修改头部的标题文字
    proimg: '', // 展示图片
    detail: '', // 产品的详情
    price: '' // 产品价格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options) // 保证产品的id是唯一的 使用的是 uuid 
    // 1. 获取了产品的唯一值 proid
    const { proid } = options
    // 2. 请求数据 ---  先引入数据请求模块
    request({
      // url: '/pro/detail?proid=' + proid
      url: `/pro/detail?proid=${proid}`
    }).then(res => {
      // 如果详情页面的数据处理特别庞大，建议抽离代码
      // 轮播图数据+ 产品的基本数据+优惠信息+详情+评论+猜你喜欢.... --- 产品id关联
      this.getDetailData(res, proid)
    })
  },
  getDetailData(res, proid) {
    // console.log(res.data);
    // 解构赋值 --- 装AC之间用的
    // const { proname, proimg, detail, price } = res.data.data
    // const { data: { proname, proimg, detail, price } } = res.data
    const { data: { data: { proname, proimg, detail, price } } } = res
    /**
     * const { data } = res.data
     * const { proname, proimg, detail, price } = data
     */
    // 修改状态
    this.setData({
      proid, // 不需要从 响应数据中拿取，但是可以从那拿（可以拿，但不需要）
      proname,
      proimg,
      detail,
      price
    })
    var article = detail;
    WxParse.wxParse('article', 'html', article, this, 5);
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
    // 减一为自己，减二为上一页
    console.log(getCurrentPages()[getCurrentPages().length - 1])
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