import Taro, { Component } from '@tarojs/taro'
// 为什呢 View 要单独引入，react 说明 组件的首字母一定要大写，小写被当做html标签
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import Prolist from './../../components/prolist'
import { request } from './../../utils'
import './index.scss'
class Index extends Component {
  config = { // 生成一个home/index.json文件 --- 页面配置
    navigationBarTitleText: 'taro-首页',
    enablePullDownRefresh: true,
    backgroundColor: '#efefef'
  }
  // constructor 写了必写 super ，要不就不写 constructor，super事关 this指向的问题   ---  es6的构造函数中的机制
  // ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
  constructor (props) {
    super(props)
    // 1.设置状态
    this.state = {
      bannerlist: [],
      prolist: [],
      pageCode: 1
    }
  }
  // 2.请求数据
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

    request({
      url: '/pro'
    }).then(res => {
      console.log(res.data)
      this.setState({
        prolist: res.data.data
      })
    })
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

  render () {
    return (
      <View>
        <Swiper indicatorDots autoplay circular>
          {
            this.state.bannerlist.map((item, index) => (
              <SwiperItem key={index}>
                <Image className="bannerimg" style={ {width: '100%'} } mode="aspectFit" src={'http://daxun.kuboy.top' + item} />
              </SwiperItem>
            ))
          }
        </Swiper>
        {/* 
          在父组件调用子组件的地方，添加一个自定义的属性，属性的值就是要传递给子组件的值，如果值是一个变量，boolean，或者是number类，需要使用{}包裹
        */}
        <Prolist prolist={ this.state.prolist }/>
      </View>
    )
  }
}

export default Index
