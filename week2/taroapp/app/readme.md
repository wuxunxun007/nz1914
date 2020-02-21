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

# 7.熟悉taro中的各种 语法

状态、属性、列表渲染、条件的渲染、事件的处理...

# 8.项目首页的相关实现

## 8.1实现首页轮播图

（轮播图状态、生命周期钩子中请求数据、修改状态、渲染数据）

### 1.状态设置
```
// constructor 写了必写 super ，要不就不写 constructor，super事关 this指向的问题   ---  es6的构造函数中的机制
  // ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

constructor (props) {
  super(props)
  // 1.设置状态
  this.state = {
    bannerlist: []
  }
}
```
### 2、请求数据

* 封装数据库的请求 src/utils/index.js
```
import Taro from '@tarojs/taro'
const baseUrl = 'http://daxun.kuboy.top/api'

export function request (options) {
  const { url, data, method, header } = options
  Taro.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + url,
      data: data || {},
      method: method || 'GET',
      header: header || {},
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        Taro.hideLoading()
      }
    })
  })
}
```

* pages/home/index.jsx 引入请求数据，修改状态
```
// 2.请求数据
import { request } from './../../utils'
componentDidMount () {
  // vue /react  axios /fetch ajax
  // wx  wx.request
  // uni uni.request
  // taro taro.request
  request({
    url: '/pro/banner'
  }).then(res => {
    console.log(res.data)
    this.setState({
      bannerlist: res.data.data
    })
  })
}
```

* 渲染数据
```
render () {
  return (
    <View>
      <Swiper indicatorDots autoplay circular>
        {
          this.state.bannerlist.map((item, index) => (
            <SwiperItem key={index}>
              <Image className="bannerimg" style={ {width: '100%'} }  mode="aspectFit" src={'http://daxun.kuboy.top' + item} />
            </SwiperItem>
          ))
        }
      </Swiper>
    </View>
  )
}
```

## 8.2 实现列表的效果

### 1.自定义一个列表组件
```
// src/components/prolist/index.jsx
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

class Index extends Taro.Component {
  render () {
    return (
      <View>
        列表
      </View>
    )
  }
}

export default Index

```

### 8.2 首页引入列表组件测试
```
import Prolist from './../../components/prolist'
render () {
  return (
    <View>
      <Swiper indicatorDots autoplay circular>
        ...
      </Swiper>
      <Prolist />
    </View>
  )
}
```

### 8.3 构建组件的样式
```
// prolist/index.jsx
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
class Index extends Taro.Component {
  render () {
    return (
      <View className="prolist">
        <View className="proitem">
          <View className="itemimg">
            <Image className='img' src=''></Image>
          </View>
          <View className="iteminfo">
            <View className="title">item.proname</View>
            <View className="title">item.sales / item.stock</View>
            <View className="price">￥item.price</View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index

// prolist/index.scss

.prolist .proitem {
  width: 100%;
  height: 100PX;
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
/* gulp */
.prolist .proitem .itemimg {
  width: 100PX;
  height: 100PX;
}
.prolist .proitem .itemimg .img{
  width: 90PX;
  height: 90PX;
  box-sizing: border-box;
  /* 如果是网页开发，需要写一个物理像素 ---- scss库  ---- 1PX边框 */
  border: 1px solid #ccc;
  margin: 5PX;
}

.prolist .proitem .iteminfo {
  flex: 1;
  padding: 3PX 5PX;
}
```

### 8.4 首页请求数据，并且传递数据给子组件
```
class Index extends Component {
  config = {
    ...
  }

  constructor (props) {
    super(props)
    // 1.设置状态
    this.state = {
      bannerlist: [],
      prolist: [] // +++++++++++++++++++++++++
    }
  }
  // 2.请求数据
  componentDidMount () {
    ...
    // +++++++++++++++++++++++
    request({
      url: '/pro'
    }).then(res => {
      console.log(res.data)
      this.setState({
        prolist: res.data.data
      })
    })
  }

  render () {
    return (
      <View>
        <Swiper indicatorDots autoplay circular>
          ...
        </Swiper>
        {/* 
          ++++++++++++++++++++++++++++
          在父组件调用子组件的地方，添加一个自定义的属性，属性的值就是要传递给子组件的值，如果值是一个变量，boolean，或者是number类，需要使用{}包裹
        */}
        <Prolist prolist={ this.state.prolist }/>
      </View>
    )
  }
}

export default Index

```

### 8.5 子组件接收数据并且校验数据
先行安装 prop-types 数据校验模块
> cnpm i prop-types -S
```
import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image } from '@tarojs/components'
import './index.scss'
/**
 * 子组件 使用 prop-types 进行数据的校验，校验完毕。
 * 在子组件（类组件）通过 this.props.自定义的属性名  就可以访问数据
 * 如果组件时函数式组件，通过 props.自定义的属性名  访问数据
 */
class Index extends Taro.Component {
  render () {
    return (
      <View className="prolist">
        ....
      </View>
    )
  }
}

// 校验数据格式
Index.propTypes = {
  prolist: PropTypes.array
}

export default Index

```

### 8.6 渲染列表数据
```
import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image } from '@tarojs/components'
import './index.scss'
/**
 * 子组件 使用 prop-types 进行数据的校验，校验完毕。
 * 在子组件（类组件）通过 this.props.自定义的属性名  就可以访问数据
 * 如果组件时函数式组件，通过 props.自定义的属性名  访问数据
 */
class Index extends Taro.Component {
  render () {
    return (
      <View className="prolist">
        {
          this.props.prolist.map(item => (
            <View className="proitem" key={ item.proid }>
              <View className="itemimg">
                <Image className="img" src={ item.proimg }></Image>
              </View>
              <View className="iteminfo">
                <View className="title">{ item.proname }</View>
                <View className="title">{ item.sales } / { item.stock }</View>
                <View className="price">￥{ item.price }</View>
              </View>
            </View>
          ))
        }
      </View>
    )
  }
}

// 校验数据格式
Index.propTypes = {
  prolist: PropTypes.array
}

export default Index

```

### 8.7 下拉刷新 --- 不支持 h5模式
```
constructor (props) {
  super(props)
  // 1.设置状态
  this.state = {
    bannerlist: [],
    prolist: [],
    pageCode: 1 // ++++++++++++++++++++++++++
  }
}

onPullDownRefresh () { // 不支持H5模式
  request({
    url: '/pro'
  }).then(res => {
    console.log(res.data)
    this.setState({
      prolist: res.data.data,
      pageCode: 1 // 必须重置页码
    })
    Taro.stopPullDownRefresh() // 这句话一定要加，真机测试时一直处于加载状态
  })
}
```

### 8.8 上拉加载实现
```
onReachBottom () {
  request({
    url: '/pro',
    data: {
      pageCode: this.state.pageCode
    }
  }).then(res => {
    console.log(res.data)
    if (res.data.code === '10000') {
      Taro.showToast({
        title: '没有更多数据了'
      })
    } else {
      // 获取数据  处理数据  修改状态
      let prolist = this.state.prolist
      let pageCode = this.state.pageCode

      prolist = [...prolist, ...res.data.data]
      pageCode += 1

      this.setState({
        prolist,
        pageCode
      })
    }
  })
}
```

### 8.9 返回顶部

定位一个小图标于 右下角，点击小图标时 调用 taro提供的api返回顶部即可

当滚动条滚动到一定位置时 小图标出现

```
<View className="backtop" onClick={ () => {
  console.log('1111')
  Taro.pageScrollTo({
    scrollTop: 0,
    duration: 500
  })
} }>↑</View>
// pages/home/index.scss
.backtop {
  position: fixed;
  right: 10Px;
  bottom: 60Px;
  width: 30PX;
  height: 30PX;
  background-color: rgba(0,0,0,0.4);
  color: #fff;
  text-align: center;
  line-height: 30Px;
  border-radius: 50%;
}
```

# 9.列表进入详情并且渲染

## 9.1 设计一个详情页面
```
// pages/detail/index.jsx

import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      proid: '',
      proname: '',
      proimg: '',
      price: 0
    }
  }

  render () {
    return (
      <View>
        <Image src={ this.state.proimg }></Image>
        <View>{ this.state.proname }</View>
        <View>{ this.state.price }</View>
      </View>
    )
  }
}

export default Index

// app.jsx中在pages中注册页面 ---- 修改配置文件 ---- 配置文件修改需重启服务器
config = { // 最终编译成为 app.json
  pages: [ // 路由
    'pages/home/index',
    'pages/kind/index',
    'pages/cart/index',
    'pages/user/index',
    'pages/index/index',
    'pages/detail/index' // +++++++++++++
  ],
  ...
}  
```

## 9.2 列表跳转至详情 并且传递参数
// react 声明式跳转（Link, NavLink） react-router-dom
// react 编程式跳转 this.props.history .push() .replace() .goBack()
// 如果组件中 的this.props 没有history这个属性，那么如何编程式跳转
//    找到距离最近的父组件，传this.props给这个组件
//    withRouter react-router-dom

// taro 声明式跳转 ---  Navigator url指明路径 可以传递参数
```
// components/prolist/index.jsx
render () {
  return (
    <View className="prolist">
      {
        this.props.prolist.map(item => (
          <Navigator url={ '/pages/detail/index?proid=' + item.proid } className="proitem" key={ item.proid }>
            <View className="itemimg">
              <Image className="img" src={ item.proimg }></Image>
            </View>
            <View className="iteminfo">
              <View className="title">{ item.proname }</View>
              <View className="title">{ item.sales } / { item.stock }</View>
              <View className="price">￥{ item.price }</View>
            </View>
          </Navigator>
        ))
      }
    </View>
  )
}
```
### 9.3 详情页面获取数据
// react this.props 获取参数。
// taro  this.$router

```
// pages/detail/index.jsx
componentDidMount () {
  console.log(this.$router.params) // 获取参数信息
  const { proid } = this.$router.params
  request({
    url: '/pro/detail', // get请求的参数也可以放在data中
    data: {
      proid
    }
  }).then(res => {
    const { proname, proimg, price } = res.data.data
    this.setState({
      proname, proimg, price, proid
    })
    Taro.setNavigationBarTitle({// 修改详情的标题
      title: proname
    }) 
  })
}
```

### 9.4 编程式导航跳转
// react this.props.history. push replace goBack
// taro Taro.navigateTo Taro.switchTab Taro.redirectTo 

```
// components/prolist/index.jsx
class Index extends Taro.Component {
  render () {
    return (
      <View className="prolist">
        {
          this.props.prolist.map(item => (
            <View className="proitem" key={ item.proid } onClick={ () => {
              Taro.navigateTo({
                url: '/pages/detail/index?proid=' + item.proid
              })
            } }>
              <View className="itemimg">
                <Image className="img" src={ item.proimg }></Image>
              </View>
              <View className="iteminfo">
                <View className="title">{ item.proname }</View>
                <View className="title">{ item.sales } / { item.stock }</View>
                <View className="price">￥{ item.price }</View>
              </View>
            </View>
          ))
        }
      </View>
    )
  }
}

// 校验数据格式
Index.propTypes = {
  prolist: PropTypes.array
}

export default Index

```

## 10.登陆注册

### 10.1 设计登陆页面
```
// pages/login/index.jsx
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Index extends Component {
  render () {
    return (
      <View>
        登陆
      </View>
    )
  }
}

export default Index

// app.jsx 注册路由
pages: [ // 路由
  'pages/home/index',
  'pages/kind/index',
  'pages/cart/index',
  'pages/user/index',
  'pages/index/index',
  'pages/detail/index',
  'pages/login/index' // +++++++++++
],
```

### 10.2 完成登陆的表单
> cnpm i taro-ui -S

config/index.js中h5的标识处添加如下代码
```
h5: {
  esnextModules: ['taro-ui']
}
```

```
// pages/login/index.jsx
// 找到taro-ui中的需要的组件，在jsx中导入组件，在scss文件中引入 需要的样式表
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import './index.scss'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tel: '18813007814',
      password: '123456'
    }
  }
  render () {
    return (
      <View>
        <AtForm>
          <AtInput
            name='tel'
            title='手机号码为11位'
            type='text'
            placeholder='手机号码'
            value={this.state.tel}
          />
          <AtInput
            name='password'
            title='密码长度不能少于6位'
            type='password'
            placeholder='密码'
            value={this.state.password}
          />
          <AtButton type='secondary' size='normal'>登陆</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default Index

// pages/login/index.scss
@import "~taro-ui/dist/style/components/input.scss";
@import "~taro-ui/dist/style/components/icon.scss";
@import "~taro-ui/dist/style/components/button.scss";
@import "~taro-ui/dist/style/components/loading.scss";

```

### 10.3 表单校验
```
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import './index.scss'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tel: '18813007814',
      password: '123456',
      telflag: false,
      passwordflag: false
    }
  }
  render () {
    return (
      <View>
        <AtForm>
          <AtInput
            error={ this.state.telflag }
            name='tel'
            clear
            title='手机号码'
            type='text'
            placeholder='手机号码'
            value={this.state.tel}
            onErrorClick={ () => {
              console.log('手机号码长度为11位')
              Taro.showToast({
                title: '手机号码长度为11位',
                icon: 'none',
                duration: 5000
              })
            }}
            onChange={ (value) => {
              console.log(value)
              let telflag = this.state.telflag
              if (value.length !== 11) {
                telflag = true
              } else {
                telflag = false
              }
              this.setState({
                tel: value,
                telflag
              })
            } }
          />
          <AtInput
            error={ this.state.passwordflag}
            name='password'
            title='密码'
            clear
            type='password'
            placeholder='密码'
            value={this.state.password}
            onErrorClick={ () => {
              console.log('密码长度应该大于6')
              Taro.showToast({
                title: '密码长度应该大于6',
                icon: 'none',
                duration: 5000
              })
            }}
            onChange={ (value) => {
              // let passwordflag = this.state.passwordflag
              // if (value.length < 6) {
              //   passwordflag = true
              // } else {
              //   passwordflag = false
              // }
              let passwordflag = value.length < 6 ? true : false;
              this.setState({
                password: value,
                passwordflag
              })
            }}
          />
          {/* <AtButton disabled={ this.state.tel.length !== 11 || this.state.password.length < 6 } type='secondary' size='normal'>登陆</AtButton> */}
          {/* 推荐使用下面写法，因为你的业务逻辑可能是复杂的正则验证 */}
          <AtButton disabled={ this.state.telflag || this.state.passwordflag } type= { this.state.telflag && this.state.passwordflag ? 'secondary' : 'primary'} size='normal' >登陆</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default Index

### 10.4 登陆
```
<AtButton disabled={ this.state.telflag || this.state.passwordflag } type= { this.state.telflag && this.state.passwordflag ? 'secondary' : 'primary'} size='normal' onClick={ () => {
  request({
    url: '/users/login',
    method: 'POST',
    data: {
      tel: this.state.tel,
      password: this.state.password
    },
    // 如果实际注册现实未注册，加上头信息
    header: {'content-type': "application/json; charset=utf-8"}
  }).then(res => {
    console.log(res)
    if (res.data.code === '10006') {
      Taro.showToast({
        title: '用户未注册，请先注册',
        icon: 'none',
        duration: 3000
      })
    } else if (res.data.code === '10007') {
      Taro.showToast({
        title: '密码错误',
        icon: 'none',
        duration: 3000
      })
    } else {
      Taro.showToast({
        title: '登陆成功',
        icon: 'none',
        duration: 3000
      })

      try {
        Taro.setStorageSync('userid', res.data.data.userid)
        Taro.setStorageSync('token', res.data.data.token)
        Taro.navigateBack()
      } catch (error) {
        
      }
    }
  })
} }>登陆</AtButton>
```
## 11.购物车
vue （uniapp）直接改变数据 ---  （获取数据，处理数据、修改状态）

## 11.1 加入购物车
```
// pages/detail/index.js
addCart () {
  try {
    let userid = Taro.getStorageSync('userid')
    let token = Taro.getStorageSync('token')
    console.log(userid, token)
    if (userid && token) {
      request({
        url: '/cart/add',
        method: 'POST',
        data: {
          userid,
          token,
          proid: this.state.proid,
          num: 1
        },
        // Taro Post
        header: {'content-type': "application/json; charset=utf-8"}
      }).then( res => {
        if (res.data.code === '10119') {
          Taro.showToast({
            title: '还未登陆，请先登陆',
            icon: 'none'
          })
          Taro.navigateTo({
            url: '/pages/login/index'
          })
        } else {
          Taro.showToast({
            title: '加入购物车成功',
            icon: 'none'
          })
        }
      })
    } else {
      Taro.showToast({
        title: '还未登陆，请先登陆',
        icon: 'none'
      })
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }
  } catch (error) {
    
  }
}
render () {
  return (
    <View>
      <Image src={ this.state.proimg }></Image>
      <View>{ this.state.proname }</View>
      <View>{ this.state.price }</View>
      <Button onClick={ this.addCart.bind(this) }>加入购物车</Button>
    </View>
  )
}
```

## 11.2 查看购物车

```
import Taro, { Component } from '@tarojs/taro'
// 为什呢 View 要单独引入，react 说明 组件的首字母一定要大写，小写被当做html标签
import { View } from '@tarojs/components'
import { request } from './../../utils'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cartlist: [],
      isTrue: true,
      totalNum: 0,
      totalPrice: 0
    }
  }
  componentDidShow () {
    try {
      // 本地判断是否登陆
      let userid = Taro.getStorageSync('userid')
      let token = Taro.getStorageSync('token')
      if ( userid && token) {
        request({
          url: '/cart',
          data: {
            userid,
            token
          }
        }).then( res => {
          console.log(res.data.code)
          if (res.data.code === '10119') {
            Taro.showToast({
              title: '还未登陆，请先登陆',
              icon: 'none'
            })
            Taro.navigateTo({
              url: '/pages/login/index'
            })
          } else if (res.data.code === '10112') {
            Taro.showToast({
              title: '购物车空空如也，请加购',
              icon: 'none'
            })
            this.setState({
              isTrue: true
            })
          } else {
            res.data.data.map( item => {
              item.flag = true
            })
            this.setState({
              isTrue: false,
              cartlist: res.data.data
            })
            
          }
        })
      } else {
        Taro.showToast({
          title: '还未登陆，请先登陆',
          icon: 'none'
        })
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      }
    } catch (error) {
      
    }
  }
  render () {
    return (
      <View>
        {
          this.state.isTrue ? <View>购物车空空如也，请加购</View> : <View>
            {
              this.state.cartlist.map((item, index) => {
                return (
                  <View key={ item.proid }>
                  { item.proname } - { item.price } - 
                  <Text>减</Text>
                  { item.num }
                  <Text>加</Text>
                  </View>
                )
              })
            }
          </View>
        }
      </View>
    )
  }
}

export default Index

```

### 11.3 计算总价和总数
```
import Taro, { Component } from '@tarojs/taro'
// 为什呢 View 要单独引入，react 说明 组件的首字母一定要大写，小写被当做html标签
import { View } from '@tarojs/components'
import { request } from './../../utils'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cartlist: [],
      isTrue: true,
      totalNum: 0,
      totalPrice: 0
    }
  }
  componentDidShow () {
    try {
      // 本地判断是否登陆
      let userid = Taro.getStorageSync('userid')
      let token = Taro.getStorageSync('token')
      if ( userid && token) {
        request({
          url: '/cart',
          data: {
            userid,
            token
          }
        }).then( res => {
          console.log(res.data.code)
          if (res.data.code === '10119') {
            Taro.showToast({
              title: '还未登陆，请先登陆',
              icon: 'none'
            })
            Taro.navigateTo({
              url: '/pages/login/index'
            })
          } else if (res.data.code === '10112') {
            Taro.showToast({
              title: '购物车空空如也，请加购',
              icon: 'none'
            })
            this.setState({
              isTrue: true
            })
          } else {
            res.data.data.map( item => {
              item.flag = true
            })
            this.setState({
              isTrue: false,
              cartlist: res.data.data
            }, () => {
              this.count() // 用来计算总价和总数
            })
            
          }
        })
      } else {
        Taro.showToast({
          title: '还未登陆，请先登陆',
          icon: 'none'
        })
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      }
    } catch (error) {
      
    }
  }
  count () {
    console.log(this.state.cartlist)
    let num = 0
    let price = 0
    this.state.cartlist.map( item => {
      num += item.num
      price += item.num * item.price
    })

    this.setState({
      totalNum: num,
      totalPrice: price
    })
  }
  render () {
    return (
      <View>
        {
          this.state.isTrue ? <View>购物车空空如也，请加购</View> : <View>
            {
              this.state.cartlist.map((item, index) => {
                return (
                  <View key={ item.proid }>
                  { item.proname } - { item.price } - 
                  <Text>减</Text>
                  { item.num }
                  <Text>加</Text>
                  </View>
                )
              })
            }
            <View>
              总数： { this.state.totalNum }
            </View>
            <View>
              总价： { this.state.totalPrice }
            </View>
          </View>
        }
      </View>
    )
  }
}

export default Index

```

### 11.4 加减数量
```
<Text onClick={ () => {
  let num = item.num > 1 ? item.num - 1 : 1
  if (num === item.num) { // 截止 不去找服务器
    Taro.showToast({
      title: '你还要我怎样，就剩1个了',
      icon: 'none'
    })
    // 代码不继续往下执行
    return
  }
  let cartid = item.cartid
  try {
    let token = Taro.getStorageSync('token')
    // 省略判断
    request({
      url: '/cart/update',
      data: {
        num,
        cartid,
        token
      }
    }).then( res => {
      if (res.data.code === '10119') {
        Taro.showToast({
          title: '还未登陆，请先登陆',
          icon: 'none'
        })
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      } else {
        Taro.showToast({
          title: '数量减少成功',
          icon: 'none'
        })
        // 获取数据  处理数据  修改状态
        let list = this.state.cartlist
        list[index].num = num
        this.setState({
          cartlist: list
        }, () => { // 重新计算总价和总数
          this.count()
        })
      }
    })
  } catch (error) {
    
  }
} }>减</Text>
{ item.num }
<Text onClick= { () => {
  let num = item.num + 1
  let cartid = item.cartid
  try {
    let token = Taro.getStorageSync('token')
    // 省略判断
    request({
      url: '/cart/update',
      data: {
        num,
        cartid,
        token
      }
    }).then( res => {
      if (res.data.code === '10119') {
        Taro.showToast({
          title: '还未登陆，请先登陆',
          icon: 'none'
        })
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      } else {
        Taro.showToast({
          title: '数量增加成功',
          icon: 'none'
        })
        // 获取数据  处理数据  修改状态
        let list = this.state.cartlist
        list[index].num = num
        this.setState({
          cartlist: list
        }, () => { // 重新计算总价和总数
          this.count()
        })
      }
    })
  } catch (error) {
    
  }
} }>加</Text>
```

### 11.5 全选和单选
```
import Taro, { Component } from '@tarojs/taro'
// 为什呢 View 要单独引入，react 说明 组件的首字母一定要大写，小写被当做html标签
import { View, Checkbox, CheckboxGroup } from '@tarojs/components'
import { request } from './../../utils'
import './index.scss'
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cartlist: [],
      isTrue: true,
      totalNum: 0,
      totalPrice: 0,
      allSelected: true
    }
  }
  componentDidShow () {
    try {
      // 本地判断是否登陆
      let userid = Taro.getStorageSync('userid')
      let token = Taro.getStorageSync('token')
      if ( userid && token) {
        request({
          url: '/cart',
          data: {
            userid,
            token
          }
        }).then( res => {
          console.log(res.data.code)
          if (res.data.code === '10119') {
            Taro.showToast({
              title: '还未登陆，请先登陆',
              icon: 'none'
            })
            Taro.navigateTo({
              url: '/pages/login/index'
            })
          } else if (res.data.code === '10112') {
            Taro.showToast({
              title: '购物车空空如也，请加购',
              icon: 'none'
            })
            this.setState({
              isTrue: true
            })
          } else {
            res.data.data.map( item => {
              item.flag = true
            })
            this.setState({
              isTrue: false,
              cartlist: res.data.data
            }, () => {
              this.count() // 用来计算总价和总数
            })
            
          }
        })
      } else {
        Taro.showToast({
          title: '还未登陆，请先登陆',
          icon: 'none'
        })
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      }
    } catch (error) {
      
    }
  }
  count () {
    console.log(this.state.cartlist)
    let num = 0
    let price = 0
    this.state.cartlist.map( item => { // 选中才会计算
      item.flag ? num += item.num : num += 0
      item.flag ? price += item.num * item.price : price += 0
    })

    this.setState({
      totalNum: num,
      totalPrice: price
    })
  }
  render () {
    const { cartlist= [] } = this.state
    return (
      <View>
        {
          this.state.isTrue ? <View>购物车空空如也，请加购</View> : <View>
            <CheckboxGroup onChange={
              (event) => {
                console.log(event.detail)
                // 获取长度  表明是否被选中
                let len = event.detail.value.length
                console.log(len)
                // 通过长度获取到 选中和不选中变量
                let flag = len === 1 ? true : false
                // 获取列表数据
                let list = this.state.cartlist
                // 处理数据
                list.map(item => {
                  flag ? item.flag = true : item.flag = false
                })
                // 修改状态
                this.setState({
                  allSelected: flag,
                  cartlist: list
                }, () => { // 计算总价和总数
                  this.count()
                })
              }
            }>
              <Checkbox checked={ this.state.allSelected } />全选
            </CheckboxGroup>
            {
              cartlist.map((item, index) => {
                return (
                  <View key={ item.proid }>
                  <CheckboxGroup onChange={
                    (event) => {
                      // console.log(event.detail.value)
                      // 根据选中的数组的长度判断是否被选中
                      let len = event.detail.value.length
                      // console.log(len)
                      // console.log('index', index)
                      // 设置标识 表明当前的这个是不是被选中
                      let flag = len === 1 ? true : false
                      // 获取数据 准备处理以及修改数据用
                      let list = this.state.cartlist
                      // list[index].flag = flag
                      console.log('flag', flag)
                      // 如果当前的数据被选中
                      if (flag === true) {
                        // console.log('111', list[index].flag)
                        // 处理当前的数据源中的标识为选中状态
                        list[index].flag = true
                        // 检测其他的选项是否都是选中状态
                        let test = list.every(val => {
                          console.log('val', val.flag)
                          return val.flag === true
                        })
                        // console.log('test', test)
                        // 如果都被选中
                        if (test) {
                          // 全选设置为选中状态，更新状态，计算总价总数
                          this.setState({
                            allSelected: true,
                            cartlist: list
                          }, () => {
                            this.count()
                          })
                        } else {
                          // 其余项有没被选中，更新状态，计算总价总数
                          this.setState({
                            allSelected: false,
                            cartlist: list
                          }, () => {
                            this.count()
                          })
                        }
                      } else {
                        // 点击当前未被选中，需要将当前的数据值为 false
                        list[index].flag = false
                        // 更新状态，计算总价总数
                        this.setState({
                          allSelected: false,
                          cartlist: list
                        }, () => {
                          this.count()
                        })
                      }
                    }
                  }>
                    <Checkbox checked={item.flag}/>
                  </CheckboxGroup>
                  
                  { item.proname } - { item.price } - 
                  ...
                  </View>
                )
              })
            }
            <View>
              总数： { this.state.totalNum }
            </View>
            <View>
              总价： { this.state.totalPrice }
            </View>
          </View>
        }
      </View>
    )
  }
}

export default Index

```

### 11.6 提交订单
// 大勋接口中的list应该是一个 数组组成字符串
// 相应数据 res.data.data 是本次的订单号
```
<Button onClick={ () => {
  let list = []
  // 过滤器 array.filter
  this.state.cartlist.map( itm => {
    if (itm.flag) {
      list.push(itm)
    }
  })
  try {
    let userid = Taro.getStorageSync('userid')
    let token = Taro.getStorageSync('token')
    console.log({
      userid,
      token,
      list
    })
    request({
      url: '/order/add',
      method: 'POST',
      data: {
        userid,
        token,
        list: JSON.stringify(list)
      },
      header: {'content-type': "application/json; charset=utf-8"}
    }).then( res => {
      console.log(res.data)
      // 购物车提交到订单后，购物车的数据会自动清空
      if (res.data.code === '10119') {
        Taro.showToast({
          title: '还未登陆，请先登陆',
          icon: 'none'
        })
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      } else {
        Taro.navigateTo({
          url: '/pages/order/index?id=' + res.data.data
        })
      }
    })
  } catch (error) {
    
  }
}}>提交订单</Button>
```

### 11.7 确认订单页面获取数据（地址信息，列表信息、.....）
```
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
        <View>地址确认,点击地址可以去到地址管理页面，页面可添加删除以及修改</View>
        <View>商品列表确认</View>
        <View>支付方式确认</View>
      </View>
    )
  }
}

export default Index

```