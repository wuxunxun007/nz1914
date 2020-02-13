// components/prolist/prolist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    prolist: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail (event) {
      console.log('去详情', event)
      // const { proid } = event.currentTarget.dataset
      const { currentTarget: { dataset: { proid } } } = event
      // 编程式导航
      // 如果跳转的是tab页面，可以使用 switchTab 或者 reLaunch
      // 如果跳转的是非tab页面，可以使用 redirectTo 或者 navigateTo 或者 reLaunch
      wx.navigateTo({
        url: `/pages/detail/detail?proid=${proid}`
      })
      // wx.redirectTo({
      //   url: `/pages/detail/detail?proid=${proid}`
      // })
      // wx.reLaunch({
      //   url: `/pages/detail/detail?proid=${proid}`
      // })
    }
  }
})
