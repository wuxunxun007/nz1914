// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 拍照
   */
  chooseImage () {
    wx.chooseImage({
      success: (res) => {
        console.log(res)
        /**
         * tempFilePaths	Array.<string>	图片的本地临时文件路径列表 (本地路径)
            tempFiles	Array.<Object>	图片的本地临时文件列表
            tempFilePaths可以直接作为 图片的src 
         */
        this.setData({
          imglist: res.tempFilePaths
        })
      },
    })
  },
  /**
   * 打开操作表  模拟真机的拍照
   */
  showActionSheet () {
    wx.showActionSheet({
      itemList: ['拍照', '从手机相册选取'],
      success(res) {
        console.log(res.tapIndex)
        switch (res.tapIndex) {
          case 0: 
            console.log('调用拍照')
            break;
          case 1:
            console.log('从手机相册选取')
            break;
          default: 
            console.log('选择了其中一个')
        }
      },
      fail () {
        console.log('你点击去了取消按钮')
      }
    })
  }
})