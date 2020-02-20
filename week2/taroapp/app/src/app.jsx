import Taro, { Component } from '@tarojs/taro'
// import React, { Component } from 'react
import { Provider } from '@tarojs/redux'
// import { Provider } from 'react-redux'
// import { Provider } from 'mobx-react'

import Index from './pages/index' // 首页代码

import configStore from './store' // 状态管理器

import './app.scss' // 编译成为全局的app.wxss文件

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore() // 创建仓库

class App extends Component {

  config = { // 最终编译成为 app.json
    pages: [ // 路由
      'pages/home/index',
      'pages/kind/index',
      'pages/cart/index',
      'pages/user/index',
      'pages/index/index',
      'pages/detail/index',
      'pages/login/index'
    ],
    window: { // 窗口表现
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#f66',
      navigationBarTitleText: 'taro项目',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#333',
      selectedColor: '#f66',
      backgroundColor: '#efefef',
      borderStyle: 'white',
      list: [ // 图片资源必须使用  相对路径
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: './resources/home.png',
          selectedIconPath: './resources/home_active.png'
        },
        {
          pagePath: 'pages/kind/index',
          text: '分类',
          iconPath: './resources/kind.png',
          selectedIconPath: './resources/kind_active.png'
        },
        {
          pagePath: 'pages/cart/index',
          text: '购物车',
          iconPath: './resources/cart.png',
          selectedIconPath: './resources/cart_active.png'
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: './resources/user.png',
          selectedIconPath: './resources/user_active.png'
        }
      ]
    }
  }
  // onLaunch 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 app 的 onLaunch
  componentWillMount() {}
  // onLaunch 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 app 的 onLaunch，在 componentWillMount 后执行
  componentDidMount () {}
  // onShow
  componentDidShow () {}
  // onHide
  componentDidHide () {}
  // onError
  componentDidCatchError () {}
  // onPageNotFound 404
  componentDidNotFound () {}
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

// ReactDOM.render()
Taro.render(<App />, document.getElementById('app'))
