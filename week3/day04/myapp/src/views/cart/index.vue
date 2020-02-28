<template>
  <div class="box">
    <header class="header">购物车</header>
    <div class="content">购物车</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      loginstate: state => state.login.loginstate
    })
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // if (this.loginstate === 'ok') {
    //   next()
    // } else {
    //   this.$router.push('/login')
    // }
    next(vm => {
      if (vm.loginstate === 'ok') {
        next()
      } else {
        vm.$router.push('/login')
      }
    })
  }
}
</script>

<style lang="scss">

</style>
