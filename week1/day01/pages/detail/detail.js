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
    
    //模拟富文本编辑器提交的数据
    var data = `<p><span style="font-size: 24px;"><strong><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">在奥运资格赛第三阶段结束后</span></strong></span><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">，国际篮联公布了世界女篮最新排名。有趣的是，以三连胜战绩晋级东京奥运会的中国女篮排名竟然从第8名下滑到
了第9名！不过这并不影响中国女篮仍然力压日本，<span style="font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255); color: rgb(255, 0, 0);"><em>居于亚洲排名的首位</em></span>。</span></p><p></p><p><strong><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);"><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">比利时队成为了最大的赢家</span></span></strong><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);"><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">，她们从
第9位连升两位，跃居至第7位，除了中国、塞尔维亚和比利时外，世界排名前6名的位次和原先保持不变。现世界排名前10的球队分别是：1.美国、2.澳大利亚、3.西班牙、4.加拿大、5.法国、6.土耳其、7.比利时、8.塞尔维亚、9.中国、10.日本。</span></span></p><p><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);"><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);"><br/></span></span></p><ul class=" list-paddingleft-2" style="list-style-type: disc;"><li><p><span style="color:
rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);"><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">111</span></span></p></li><li><p><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);"><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">2222</span></span></p></li><li><p><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);"><span style="color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">33333<br/></span></span></p></li></ul>`;
    // 修改状态
    this.setData({
      proid, // 不需要从 响应数据中拿取，但是可以从那拿（可以拿，但不需要）
      proname,
      proimg,
      detail: data,
      price
    })
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    // WxParse.wxParse('article', 'html', data, this, 5);
    wx.setNavigationBarTitle({
      title: proname,
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