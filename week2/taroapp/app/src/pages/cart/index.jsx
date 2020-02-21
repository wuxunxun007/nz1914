import Taro, { Component } from '@tarojs/taro'
// 为什呢 View 要单独引入，react 说明 组件的首字母一定要大写，小写被当做html标签
import { View, Checkbox, CheckboxGroup, Button } from '@tarojs/components'
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
          </View>
        }
      </View>
    )
  }
}

export default Index
