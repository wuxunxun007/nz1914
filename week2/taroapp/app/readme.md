# 1.安装脚手架
```
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli
# OR 使用 yarn 安装 CLI
$ yarn global add @tarojs/cli
# OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @tarojs/cli

taro -V
// 2.0.4
```

# 2.创建项目
```
taro init myApp

**不建议在此处使用 npx 创建**
```

# 3.运行项目

## 3.1 运行到浏览器端
```
npm run dev:h5

npm run build:h5
```

## 3.2 运行微信小程序
```
npm run dev:weapp

npm run build:weapp
```

# 4.熟悉项目结构以及代码规范

**所有的自己写的代码都在src文件夹下**

# 5、创建项目的基本路由

## 5.1 创建了 页面
pages/home/index.jsx

pages/kind/index.jsx

pages/cart/index.jsx

pages/user/index.jsx

以首页为例
```
import Taro, { Component } from '@tarojs/taro'
// 为什呢 View 要单独引入，react 说明 组件的首字母一定要大写，小写被当做html标签
import { View } from '@tarojs/components'

class Index extends Component {
  render () {
    return (
      <View>
        首页
      </View>
    )
  }
}

export default Index

```

## 5.2 配置路由
```
// src/app.jsx
pages: [ // 路由
  'pages/home/index',
  'pages/kind/index',
  'pages/cart/index',
  'pages/user/index',
  'pages/index/index'
],
```

## 5.3 配置底部选项卡
key值一律不加引号

value只加单引号

key与value值之间需要冒号后加 空格

图片使用相对路径
```
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
```
## 5.4 页面的配置
参考微信小程序的页面配置，多端化的会有 兼容问题（H5和rn兼容问题居多，很多都不支持）

```
// pages/home/index.jsx中添加页面配置
config = { // 生成一个home/index.json文件 --- 页面配置
  navigationBarTitleText: 'taro-首页',
  enablePullDownRefresh: true,
  backgroundColor: '#efefef'
}
```

# 6、生命周期钩子函数

## 6.1 全局生命周期钩子函数

```
// app.jsx
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
```

## 6.2 页面级生命周期钩子函数
componentWillMount()
页面加载时触发，一个页面只会调用一次，此时页面 DOM 尚未准备好，还不能和视图层进行交互 ----- react一致 --- 一般不使用（以前的react版本支持在此处请求数据，但是现在不建议）

componentDidMount()
页面初次渲染完成时触发，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互 -   react一致 --- 请求数据、DOM操作

shouldComponentUpdate(nextProps, nextState)
页面是否需要更新，返回 false 不继续更新，否则继续走更新流程 --- react 一致  ---  提升react组件性能的关键

componentWillUpdate(nextProps, nextState)
页面即将更新  --- react一致  --- 一般不使用

componentDidUpdate(prevProps, prevState)
页面更新完毕  ----  react一致  --- 可以请求数据但是不建议，如果非要请求，必须得加判断 ---- 不能在此请求数据（错误的） -- https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate（如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求）
```
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

componentWillUnmount()
页面卸载时触发，如 redirectTo 或 navigateBack 到其他页面时 --- 小程序这块 缓存我们的页面 

componentDidShow()
页面显示/切入前台时触发  ----  onShow()

componentDidHide() --- onHide()
页面隐藏/切入后台时触发， 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等

在以上所有的生命周期方法中，都可以通过 this.$router.params 获取打开当前页面路径中的参数。


**其他的函数**
onPullDownRefresh()

onReachBottom()

onPageScroll(Object)

onShareAppMessage(Object)

## 6.3 组件生命周期 参考的就是react的生命周期