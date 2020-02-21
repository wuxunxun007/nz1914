import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { request } from './../../utils'
class Index extends Component {
  componentDidShow () {
    try {
      let token = Taro.getStorageSync('token')
      request({
        url: '/order/detail',
        data: {
          token,
          orderid: this.$router.params.id
        }
      }).then(res => {
        console.log(res.data.data)
      })
    } catch (error) {
      
    }
  }
  render () {
    return (
      <View>
        确认订单页面
        <View>地址确认</View>
        <View>商品列表确认</View>
        <View>支付方式确认</View>
      </View>
    )
  }
}

export default Index
