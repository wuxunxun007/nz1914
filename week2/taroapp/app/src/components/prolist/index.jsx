import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image, Navigator } from '@tarojs/components'
import './index.scss'
/**
 * 子组件 使用 prop-types 进行数据的校验，校验完毕。
 * 在子组件（类组件）通过 this.props.自定义的属性名  就可以访问数据
 * 如果组件时函数式组件，通过 props.自定义的属性名  访问数据
 */
class Index extends Taro.Component {
  render () {
    // Cannot read property 'map' of undefined
    let { prolist=[] } = this.props
    if (!prolist) {
      return (
        <View>还未获取到列表</View>
      )
    }
    return (
      <View className="prolist">
        {
          prolist.map(item => (
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
