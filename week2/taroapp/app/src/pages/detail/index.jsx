import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { request } from './../../utils'
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      proid: '',
      proname: '详情',
      proimg: '',
      price: 0
    }
  }

  componentDidMount () {
    console.log(this.$router.params)
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
      Taro.setNavigationBarTitle({
        title: proname
      })
    })
  }
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
}

export default Index
