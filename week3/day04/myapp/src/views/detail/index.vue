<template>
  <div class="container detail">
    <div class="box">
      <header class="header">详情</header>
      <div class="content">
        <img :src="proimg" alt="">
        <h1>{{ proname }}</h1>
        <h6>{{ note }}</h6>
        <p>{{ price }}</p>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="chat"/>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="tocart"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import Vue from 'vue'
import { GoodsAction, GoodsActionIcon, GoodsActionButton, Toast } from 'vant'
import { mapState } from 'vuex'
import { getDetailData } from '@/api/detail'
import { addCart } from '@/api/cart'
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Toast)
export default {
  data () {
    return {
      proname: '',
      proimg: '',
      proid: '',
      price: '',
      note: ''
    }
  },
  computed: {
    ...mapState({
      loginstate: state => state.login.loginstate
    })
  },
  mounted () {
    const { $route: { params: { proid } } } = this
    getDetailData({
      url: '/pro/detail',
      data: {
        proid
      }
    }).then(res => {
      console.log(res)
      const { proname, proimg, price, note } = res.data.data
      this.proname = proname
      this.proid = proid
      this.price = price
      this.proimg = proimg
      this.note = note
    })
  },
  methods: {
    chat () {
      window._MEIQIA('init')
    },
    addCart () {
      if (this.loginstate === 'ok') {
        addCart({
          url: '/cart/add',
          data: {
            userid: localStorage.getItem('userid'),
            proid: this.proid,
            num: 1
          }
        }).then(res => {
          if (res.data.code === '10119') {
            Toast('还未登陆')
            this.$router.push('/login')
          } else {
            Toast('加入购物车成功')
          }
        })
      } else {
        Toast('还未登陆')
        this.$router.push('/login')
      }
    },
    tocart () {
      if (this.loginstate === 'ok') {
        this.$router.push('/cart')
      } else {
        Toast('还未登陆')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss">

</style>
