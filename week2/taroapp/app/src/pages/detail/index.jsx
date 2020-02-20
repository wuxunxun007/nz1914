import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
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
