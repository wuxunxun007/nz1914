<template>
  <div class="box">
    <header class="header">登陆</header>
    <div class="content">
      <van-form validate-first @submit="onSubmit" @failed="onFailed">
        <van-field clearable v-model="tel" name="tel" label="手机号" :rules="telRules" />
        <van-field clearable  type="password" v-model="password" name="password" label="密码" :rules="passwordRules" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            登陆
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field, Button, Toast } from 'vant'
import { mapMutations } from 'vuex'
import { login } from '@/api/user'
Vue.use(Field)
Vue.use(Button)
Vue.use(Form)
Vue.use(Toast)
export default {
  data () {
    this.telRules = [
      { required: true, message: '请输入手机号' },
      { validator: this.telValidator, message: '手机号格式错误' }
    ]
    this.passwordRules = [
      { required: true, message: '请输入验证码' },
      { validator: this.passwordValidator, message: '密码格式错误' }
    ]
    return {
      password: '123456',
      tel: '18813007814'
    }
  },
  methods: {
    ...mapMutations({
      changeLoginState: 'login/changeLoginState'
    }),
    // 校验函数返回 true 表示校验通过，false 表示不通过
    telValidator (val) {
      return /1\d{10}/.test(val)
    },
    passwordValidator (val) {
      return val.length >= 6
    },
    onSubmit (values) {
      console.log('values', values)
      login({
        url: '/users/login',
        data: values
      }).then(res => {
        if (res.data.code === '10007') {
          Toast('密码错误')
        } else if (res.data.code === '10006') {
          Toast('该用户未注册')
        } else {
          Toast('登陆成功')
          // 保存相关信息至本地 userid token
          // 保存登陆状态至状态管理器
          // data: { token: '', userid: '', username: ''}
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('userid', res.data.data.userid)
          localStorage.setItem('loginstate', 'ok')
          // 同时将状态管理器中的登陆状态修改
          this.changeLoginState('ok')
          this.$router.back()
        }
      })
    },
    onFailed (errorInfo) {
      console.log(errorInfo)
    }
  }
}
</script>

<style lang="scss">

</style>
