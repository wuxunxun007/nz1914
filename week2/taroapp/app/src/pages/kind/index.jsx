import Taro, { Component } from '@tarojs/taro'
// 为什呢 View 要单独引入，react 说明 组件的首字母一定要大写，小写被当做html标签
import { View } from '@tarojs/components'

class Index extends Component {
  render () {
    return (
      <View>
        分类
      </View>
    )
  }
}

export default Index
