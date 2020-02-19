import Taro, { Component } from '@tarojs/taro'
// 为什呢 View 要单独引入，react 说明 组件的首字母一定要大写，小写被当做html标签
import { View } from '@tarojs/components'
import './index.scss'
class Index extends Component {
  config = { // 生成一个home/index.json文件 --- 页面配置
    navigationBarTitleText: 'taro-首页',
    enablePullDownRefresh: true,
    backgroundColor: '#efefef'
  }
  render () {
    return (
      <View>
        首页
      </View>
    )
  }
}

export default Index
