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
          <AtButton disabled={ this.state.telflag || this.state.passwordflag } type= { this.state.telflag && this.state.passwordflag ? 'secondary' : 'primary'} size='normal'>登陆</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default Index
